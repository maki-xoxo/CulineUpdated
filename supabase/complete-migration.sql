-- ============================================================
-- CULINE COMPLETE DATABASE MIGRATION (Philippine Market Prices)
-- Run this ENTIRE FILE in Supabase SQL Editor (in order)
-- Prices are in USD (PHP price / 63.76) for internal conversion
-- ============================================================

-- ------------------------------------------------------------
-- 0. EXTENSIONS
-- ------------------------------------------------------------
create extension if not exists pgcrypto;

-- ============================================================
-- 1. PRODUCTS TABLE (core market inventory)
-- ============================================================
create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  vendor text not null,
  price numeric(10,2) not null check (price >= 0),
  unit text not null,
  stock_quantity integer not null default 0 check (stock_quantity >= 0),
  availability text not null default 'available' check (availability in ('available', 'unavailable')),
  is_featured boolean not null default false,
  created_at timestamptz not null default now()
);

-- Extended product details (for barcode scanner & produce info)
alter table public.products add column if not exists barcode text;
alter table public.products add column if not exists health_info text not null default '';
alter table public.products add column if not exists growing_location text not null default '';
alter table public.products add column if not exists market_location text not null default '';
alter table public.products add column if not exists dish_ideas text not null default '';

-- Unique barcode index (partial: only for non-empty barcodes)
create unique index if not exists products_barcode_unique
  on public.products (barcode)
  where barcode is not null and barcode <> '';

-- ------------------------------------------------------------
-- 2. INVENTORY ADMINS (role-based access)
-- ------------------------------------------------------------
create table if not exists public.inventory_admins (
  user_id uuid primary key references auth.users(id) on delete cascade
);

-- ============================================================
-- 3. USER PROFILES (display names, avatars)
-- ============================================================
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text unique,
  display_name text,
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

revoke all on public.profiles from anon, authenticated;
grant select on public.profiles to anon, authenticated;
grant insert, update on public.profiles to authenticated;

create policy "Profiles are publicly readable"
  on public.profiles for select to anon, authenticated
  using (true);

create policy "Users can insert own profile"
  on public.profiles for insert to authenticated
  with check (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update to authenticated
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- Auto-create profile on user signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, username, display_name)
  values (
    new.id,
    new.raw_user_meta_data->>'username',
    coalesce(new.raw_user_meta_data->>'username', split_part(new.email, '@', 1))
  );
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Auto-update updated_at timestamp
create or replace function public.update_updated_at()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger update_profiles_updated_at
  before update on public.profiles
  for each row execute function public.update_updated_at();

-- ============================================================
-- 3b. ORDERS TABLE (customer checkout history)
-- ============================================================
create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  status text not null default 'pending' check (status in ('pending', 'confirmed', 'shipped', 'delivered', 'cancelled')),
  subtotal numeric(10,2) not null check (subtotal >= 0),
  delivery_fee numeric(10,2) not null default 0 check (delivery_fee >= 0),
  total numeric(10,2) not null check (total >= 0),
  currency text not null default 'PHP' check (currency in ('USD', 'PHP')),
  delivery_address text,
  estimated_delivery_date date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  product_id uuid not null references public.products(id) on delete restrict,
  product_name text not null,
  vendor text,
  price numeric(10,2) not null,
  unit text,
  quantity integer not null check (quantity > 0),
  line_total numeric(10,2) not null
);

alter table public.orders enable row level security;
alter table public.order_items enable row level security;

-- Orders policies
revoke all on public.orders from anon, authenticated;
grant select, insert, update on public.orders to authenticated;

create policy "Users can view own orders"
  on public.orders for select to authenticated
  using (auth.uid() = user_id);

create policy "Users can create own orders"
  on public.orders for insert to authenticated
  with check (auth.uid() = user_id);

create policy "Users can update own orders"
  on public.orders for update to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- Order items policies
revoke all on public.order_items from anon, authenticated;
grant select, insert on public.order_items to authenticated;

create policy "Users can view own order items"
  on public.order_items for select to authenticated
  using (
    exists (select 1 from public.orders where id = order_id and user_id = auth.uid())
  );

create policy "Users can create own order items"
  on public.order_items for insert to authenticated
  with check (
    exists (select 1 from public.orders where id = order_id and user_id = auth.uid())
  );

-- Auto-update updated_at for orders
create trigger update_orders_updated_at
  before update on public.orders
  for each row execute function public.update_updated_at();

-- Add to realtime
do $$
begin
  alter publication supabase_realtime add table public.orders;
exception when duplicate_object then null;
end;
$$;

do $$
begin
  alter publication supabase_realtime add table public.order_items;
exception when duplicate_object then null;
end;
$$;

-- ============================================================
-- 4. ROW LEVEL SECURITY & POLICIES (products)
-- ============================================================
alter table public.products enable row level security;
alter table public.inventory_admins enable row level security;

revoke all on public.products from anon, authenticated;
grant select on public.products to anon, authenticated;
grant insert, update on public.products to authenticated;
revoke all on public.inventory_admins from anon, authenticated;

-- Admin check function
create or replace function public.is_inventory_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.inventory_admins where user_id = (select auth.uid())
  );
$$;

revoke all on function public.is_inventory_admin() from public;
grant execute on function public.is_inventory_admin() to authenticated;

-- Product policies
drop policy if exists "Products are publicly readable" on public.products;
create policy "Products are publicly readable"
  on public.products for select to anon, authenticated
  using (true);

drop policy if exists "Admins can add products" on public.products;
create policy "Admins can add products"
  on public.products for insert to authenticated
  with check ((select public.is_inventory_admin()));

drop policy if exists "Admins can update products" on public.products;
create policy "Admins can update products"
  on public.products for update to authenticated
  using ((select public.is_inventory_admin()))
  with check ((select public.is_inventory_admin()));

-- ============================================================
-- 5. REALTIME PUBLICATIONS (live updates)
-- ============================================================
do $$
begin
  alter publication supabase_realtime add table public.products;
exception when duplicate_object then null;
end;
$$;

do $$
begin
  alter publication supabase_realtime add table public.profiles;
exception when duplicate_object then null;
end;
$$;

-- ============================================================
-- 6. SEED DATA: Featured Market Products (Philippine Prices)
-- ============================================================
-- Prices converted: PHP ÷ 63.76 = USD for DB storage
insert into public.products (name, vendor, price, unit, stock_quantity, is_featured) values
  -- Featured (Fresh Today)
  ('Heirloom tomatoes', 'Hollow Creek Farm', 0.63, 'kg', 18, true),           -- ₱40/kg
  ('Baby spinach', 'Riverside Growers', 1.10, 'bunch', 14, true),              -- ₱70/bunch
  ('Sourdough loaf', 'Millhouse Bakery', 1.57, 'loaf', 8, true),               -- ₱100/loaf
  ('Free-range eggs', 'Blue Barn Poultry', 0.11, 'pcs', 60, true),             -- ₱7/egg
  ('Wildflower honey', 'Cedar Row Apiary', 3.14, 'jar', 7, true),              -- ₱200/jar
  ('Delicata squash', 'Hollow Creek Farm', 0.78, 'kg', 16, true),              -- ₱50/kg
  -- Non-featured produce
  ('Rainbow carrots', 'Meadow Lane Farm', 0.78, 'kg', 12, false),              -- ₱50/kg
  ('French breakfast radishes', 'Riverside Growers', 0.94, 'bunch', 12, false), -- ₱60/bunch
  ('English cucumbers', 'Hollow Creek Farm', 0.47, 'pcs', 12, false),          -- ₱30/pc
  ('Sweet corn', 'Sunfield Acres', 0.24, 'pcs', 24, false),                    -- ₱15/pc
  ('Japanese eggplant', 'Meadow Lane Farm', 0.78, 'kg', 10, false),            -- ₱50/kg
  ('Red bell peppers', 'Sunfield Acres', 1.10, 'kg', 12, false),               -- ₱70/kg
  ('Green bell peppers', 'Sunfield Acres', 0.94, 'kg', 12, false),             -- ₱60/kg
  ('Zucchini', 'Riverside Growers', 0.78, 'kg', 14, false),                    -- ₱50/kg
  ('Persian cucumbers', 'Hollow Creek Farm', 1.10, 'kg', 10, false),           -- ₱70/kg
  ('Rainbow chard', 'Riverside Growers', 0.94, 'bunch', 9, false),             -- ₱60/bunch
  ('Kale', 'Meadow Lane Farm', 0.94, 'bunch', 12, false),                      -- ₱60/bunch
  ('Butter lettuce', 'Hollow Creek Farm', 0.78, 'head', 10, false),            -- ₱50/head
  ('Green cabbage', 'Sunfield Acres', 0.47, 'kg', 12, false),                  -- ₱30/kg
  ('Cauliflower', 'Riverside Growers', 1.10, 'head', 8, false),                -- ₱70/head
  ('Broccoli crowns', 'Meadow Lane Farm', 1.10, 'kg', 10, false),              -- ₱70/kg
  ('Red onions', 'Sunfield Acres', 0.78, 'kg', 16, false),                     -- ₱50/kg
  ('Golden beets', 'Hollow Creek Farm', 0.94, 'kg', 10, false),                -- ₱60/kg
  ('French green beans', 'Meadow Lane Farm', 1.10, 'kg', 9, false),            -- ₱70/kg
  ('Sugar snap peas', 'Riverside Growers', 1.57, 'kg', 8, false),              -- ₱100/kg
  ('Cherry tomatoes', 'Hollow Creek Farm', 1.57, 'kg', 10, false),             -- ₱100/kg
  ('Poblano peppers', 'Sunfield Acres', 1.10, 'kg', 10, false),                -- ₱70/kg
  ('Butternut squash', 'Meadow Lane Farm', 0.63, 'kg', 12, false),             -- ₱40/kg
  ('Fresh basil', 'Riverside Growers', 0.78, 'bunch', 15, false),              -- ₱50/bunch
  ('Cilantro', 'Hollow Creek Farm', 0.63, 'bunch', 12, false),                 -- ₱40/bunch
  -- Additional Filipino produce
  ('Rainier cherries', 'Sunfield Acres', 2.35, 'kg', 18, false),               -- ₱150/kg
  ('Hass avocado', 'Meadow Lane Farm', 0.94, 'pcs', 60, false),                -- ₱60/pc
  ('Grass-fed ground beef', 'Green Pastures Ranch', 4.70, 'kg', 12, false),    -- ₱300/kg
  ('Oat milk', 'Pure Pour Dairy', 1.25, 'liter', 22, false),                   -- ₱80/L
  ('Whole wheat bread', 'Millhouse Bakery', 0.78, 'loaf', 15, false),          -- ₱50/loaf
  ('Fresh goat cheese', 'Blue Barn Poultry', 3.14, 'pack', 20, false)         -- ₱200/pack
on conflict (name) do nothing;

-- ============================================================
-- 7. RECIPE INGREDIENT PRODUCTS (Philippine Prices)
-- ============================================================

-- Meat & Poultry
insert into public.products (name, vendor, price, unit, stock_quantity, is_featured, barcode) values
  ('Chicken thighs', 'Local Poultry Farm', 2.82, 'kg', 50, false, '4800100100101'),       -- ₱180/kg
  ('Pork ribs', 'Green Pastures Ranch', 4.70, 'kg', 30, false, '4800100100102'),          -- ₱300/kg
  ('Pork belly', 'Green Pastures Ranch', 5.49, 'kg', 25, false, '4800100100103'),         -- ₱350/kg
  ('Oxtail', 'Green Pastures Ranch', 7.84, 'kg', 15, false, '4800100100104'),             -- ₱500/kg
  ('Ground pork', 'Green Pastures Ranch', 3.92, 'kg', 40, false, '4800100100105'),        -- ₱250/kg
  ('Chicken breast', 'Local Poultry Farm', 3.14, 'kg', 35, false, '4800100100106'),       -- ₱200/kg
  ('Chicken leg quarters', 'Local Poultry Farm', 2.35, 'kg', 40, false, '4800100100107'),  -- ₱150/kg
  ('Chicken (native/whole cut)', 'Local Poultry Farm', 3.14, 'kg', 30, false, '4800100100108'), -- ₱200/kg
  ('Pig face/ears (maskara)', 'Green Pastures Ranch', 2.35, 'kg', 10, false, '4800100100109'), -- ₱150/kg
  ('Chicken liver', 'Local Poultry Farm', 1.57, 'kg', 20, false, '4800100100110'),        -- ₱100/kg
  ('Shrimp', 'Coastal Catch', 7.84, 'kg', 20, false, '4800100100111'),                    -- ₱500/kg
  ('Fresh tuna (sashimi grade)', 'Coastal Catch', 12.55, 'kg', 10, false, '4800100100112'), -- ₱800/kg
  ('Pork (for pinakbet)', 'Green Pastures Ranch', 3.92, 'kg', 30, false, '4800100100113') -- ₱250/kg
on conflict (name) do nothing;

-- Sauces & Condiments
insert into public.products (name, vendor, price, unit, stock_quantity, is_featured, barcode) values
  ('Soy sauce', 'Silver Swan', 1.25, 'liter', 100, false, '4800100200101'),                -- ₱80/L
  ('Cane vinegar', 'Datu Puti', 0.94, 'liter', 100, false, '4800100200102'),               -- ₱60/L
  ('Coconut vinegar', 'Datu Puti', 1.02, 'liter', 80, false, '4800100200103'),             -- ₱65/L
  ('Fish sauce (patis)', 'Rufina', 1.41, 'liter', 100, false, '4800100200104'),            -- ₱90/L
  ('Oyster sauce', 'Mega', 2.35, 'bottle', 80, false, '4800100200105'),                    -- ₱150/bottle
  ('Shrimp paste (bagoong alamang)', 'Navotas', 2.35, 'jar', 60, false, '4800100200106'),   -- ₱150/jar
  ('Bagoong (shrimp paste)', 'Navotas', 2.35, 'jar', 60, false, '4800100200107'),          -- ₱150/jar
  ('Mayonnaise', 'Lady''s Choice', 2.35, 'jar', 80, false, '4800100200108'),               -- ₱150/jar
  ('Vinegar (for dipping)', 'Datu Puti', 0.94, 'liter', 100, false, '4800100200109')       -- ₱60/L
on conflict (name) do nothing;

-- Dry Goods
insert into public.products (name, vendor, price, unit, stock_quantity, is_featured, barcode) values
  ('Tamarind mix/sampalok', 'Knorr', 0.31, 'pack', 200, false, '4800100300101'),           -- ₱20/pack
  ('Peanut butter', 'Lily', 2.35, 'jar', 80, false, '4800100300102'),                      -- ₱150/jar
  ('Toasted ground rice', 'Local Mill', 0.78, 'pack', 100, false, '4800100300103'),         -- ₱50/pack
  ('Annatto powder', 'Mama Sita', 0.31, 'pack', 100, false, '4800100300104'),              -- ₱20/pack
  ('Annatto oil', 'Mama Sita', 0.78, 'bottle', 60, false, '4800100300105'),                -- ₱50/bottle
  ('Pancit Canton noodles', 'Lucky Me', 0.39, 'pack', 200, false, '4800100300106'),        -- ₱25/pack
  ('Lumpia wrappers', 'Spring Home', 0.78, 'pack', 100, false, '4800100300107'),           -- ₱50/pack
  ('Brown sugar', 'Bale', 0.78, 'kg', 100, false, '4800100300108'),                        -- ₱50/kg
  ('Salt', 'Fino', 0.16, 'kg', 200, false, '4800100300109'),                               -- ₱10/kg
  ('Black pepper', 'McCormick', 1.57, 'jar', 60, false, '4800100300110'),                  -- ₱100/jar
  ('Whole peppercorns', 'Local Spice', 1.25, 'jar', 60, false, '4800100300111')            -- ₱80/jar
on conflict (name) do nothing;

-- Coconut Products
insert into public.products (name, vendor, price, unit, stock_quantity, is_featured, barcode) values
  ('Coconut milk (kakang gata)', 'Kara', 0.78, 'can', 100, false, '4800100400101'),        -- ₱50/can
  ('Coconut milk (regular)', 'Kara', 0.55, 'can', 150, false, '4800100400102')             -- ₱35/can
on conflict (name) do nothing;

-- Vegetables & Herbs
insert into public.products (name, vendor, price, unit, stock_quantity, is_featured, barcode) values
  ('Garlic', 'Baguio Farmers', 1.88, 'kg', 100, false, '4800100500101'),                   -- ₱120/kg
  ('Onion (yellow)', 'Baguio Farmers', 0.94, 'kg', 100, false, '4800100500102'),           -- ₱60/kg
  ('Onion (red)', 'Baguio Farmers', 1.10, 'kg', 80, false, '4800100500103'),              -- ₱70/kg
  ('Onion (large)', 'Baguio Farmers', 0.94, 'kg', 100, false, '4800100500104'),           -- ₱60/kg
  ('Garlic cloves', 'Baguio Farmers', 1.88, 'kg', 100, false, '4800100500105'),           -- ₱120/kg
  ('Tomatoes', 'Sunfield Acres', 0.78, 'kg', 80, false, '4800100500106'),                  -- ₱50/kg
  ('Radish (labanos)', 'Baguio Farmers', 0.63, 'kg', 60, false, '4800100500107'),         -- ₱40/kg
  ('Eggplant', 'Meadow Lane Farm', 0.78, 'kg', 80, false, '4800100500108'),               -- ₱50/kg
  ('Kangkong (water spinach)', 'Riverside Growers', 0.47, 'bunch', 100, false, '4800100500109'), -- ₱30/bunch
  ('String beans (sitaw)', 'Riverside Growers', 1.10, 'kg', 80, false, '4800100500110'),   -- ₱70/kg
  ('Pechay (bok choy)', 'Riverside Growers', 0.47, 'bunch', 100, false, '4800100500111'), -- ₱30/bunch
  ('Banana blossom', 'Local Market', 0.16, 'pcs', 30, false, '4800100500112'),            -- ₱10/pc
  ('Green chili (siling haba)', 'Sunfield Acres', 1.10, 'kg', 50, false, '4800100500113'), -- ₱70/kg
  ('Red chili (siling labuyo)', 'Sunfield Acres', 3.14, 'kg', 30, false, '4800100500114'), -- ₱200/kg
  ('Bitter melon (ampalaya)', 'Meadow Lane Farm', 0.94, 'kg', 40, false, '4800100500115'), -- ₱60/kg
  ('Okra', 'Meadow Lane Farm', 0.94, 'kg', 60, false, '4800100500116'),                   -- ₱60/kg
  ('Squash (kalabasa)', 'Meadow Lane Farm', 0.47, 'kg', 80, false, '4800100500117'),      -- ₱30/kg
  ('Green papaya', 'Meadow Lane Farm', 0.63, 'kg', 40, false, '4800100500118'),           -- ₱40/kg
  ('Chili leaves (dahon ng sili)', 'Riverside Growers', 0.31, 'bunch', 50, false, '4800100500119'), -- ₱20/bunch
  ('Carrots', 'Meadow Lane Farm', 0.78, 'kg', 80, false, '4800100500120'),                -- ₱50/kg
  ('Snow peas (chicharo)', 'Riverside Growers', 1.57, 'kg', 30, false, '4800100500121'),  -- ₱100/kg
  ('Cabbage', 'Sunfield Acres', 0.47, 'head', 60, false, '4800100500122'),                -- ₱30/head
  ('Cucumber', 'Hollow Creek Farm', 0.47, 'pcs', 80, false, '4800100500123'),             -- ₱30/pc
  ('Green onions', 'Riverside Growers', 0.47, 'bunch', 100, false, '4800100500124'),      -- ₱30/bunch
  ('Lemongrass', 'Riverside Growers', 0.47, 'stalk', 100, false, '4800100500125'),        -- ₱30/stalk
  ('Ginger', 'Baguio Farmers', 1.57, 'kg', 60, false, '4800100500126'),                   -- ₱100/kg
  ('Bay leaves', 'Local Herb', 0.16, 'pack', 200, false, '4800100500127'),                -- ₱10/pack
  ('Calamansi', 'Sunfield Acres', 0.78, 'kg', 80, false, '4800100500128')                 -- ₱50/kg
on conflict (name) do nothing;

-- Eggs
insert into public.products (name, vendor, price, unit, stock_quantity, is_featured) values
  ('Egg', 'Blue Barn Poultry', 0.11, 'pcs', 500, false)                  -- ₱7/egg
on conflict (name) do nothing;

-- ============================================================
-- ADDITIONAL PRODUCTS FOR FILIPINO RECIPES (Philippine Prices)
-- ============================================================

-- Meat & Poultry (Additional)
insert into public.products (name, vendor, price, unit, stock_quantity, is_featured) values
  ('Beef shank', 'Green Pastures Ranch', 5.49, 'kg', 20, false),           -- ₱350/kg
  ('Pork liver', 'Local Poultry Farm', 1.57, 'kg', 25, false),             -- ₱100/kg
  ('Pork heart', 'Green Pastures Ranch', 1.57, 'kg', 15, false),           -- ₱100/kg
  ('Pork kidney', 'Green Pastures Ranch', 1.57, 'kg', 15, false),          -- ₱100/kg
  ('Pork fat (for larding)', 'Green Pastures Ranch', 0.78, 'kg', 20, false), -- ₱50/kg
  ('Grilled fish (tilapia/bangus)', 'Coastal Catch', 2.35, 'pcs', 30, false), -- ₱150/pc
  ('Frog legs', 'Exotic Meats', 4.70, 'kg', 10, false),                    -- ₱300/kg
  ('Mole crickets (camaru)', 'Pampanga Farm', 3.14, 'pack', 20, false)      -- ₱200/pack
on conflict (name) do nothing;

-- Noodles & Wrappers
insert into public.products (name, vendor, price, unit, stock_quantity, is_featured) values
  ('Fresh miki noodles', 'Local Noodle Maker', 0.78, 'pack', 50, false),   -- ₱50/pack
  ('Molo/wonton wrappers', 'Spring Home', 0.78, 'pack', 100, false)        -- ₱50/pack
on conflict (name) do nothing;

-- Coconut Products (Additional)
insert into public.products (name, vendor, price, unit, stock_quantity, is_featured) values
  ('Fresh coconut water', 'Local Market', 0.31, 'liter', 50, false),       -- ₱20/L
  ('Young coconut meat', 'Local Market', 0.47, 'pack', 40, false),         -- ₱30/pack
  ('Grated coconut (toasted)', 'Local Market', 0.31, 'pack', 50, false),   -- ₱20/pack
  ('Burnt coconut meat', 'Local Market', 0.47, 'pack', 30, false)          -- ₱30/pack
on conflict (name) do nothing;

-- Specialty Condiments & Spices
insert into public.products (name, vendor, price, unit, stock_quantity, is_featured) values
  ('Palapa (Maranao condiment)', 'Maranao Kitchen', 1.57, 'jar', 30, false), -- ₱100/jar
  ('Turmeric powder', 'Local Spice', 0.78, 'pack', 100, false),             -- ₱50/pack
  ('Galangal', 'Baguio Farmers', 2.35, 'kg', 30, false),                    -- ₱150/kg
  ('Coconut sugar', 'Local Producer', 1.57, 'pack', 50, false)              -- ₱100/pack
on conflict (name) do nothing;

-- Vegetables & Herbs (Additional)
insert into public.products (name, vendor, price, unit, stock_quantity, is_featured) values
  ('Dried taro leaves (gabi)', 'Bicol Market', 0.31, 'pack', 50, false),    -- ₱20/pack
  ('Red bell pepper', 'Sunfield Acres', 1.10, 'kg', 20, false),             -- ₱70/kg
  ('Green bell pepper', 'Sunfield Acres', 0.94, 'kg', 20, false),           -- ₱60/kg
  ('Saluyot (jute leaves)', 'Ilocos Farm', 0.47, 'bunch', 40, false),       -- ₱30/bunch
  ('Potatoes', 'Baguio Farmers', 0.63, 'kg', 100, false),                   -- ₱40/kg
  ('Corn (sweet)', 'Sunfield Acres', 0.24, 'pcs', 50, false),               -- ₱15/pc
  ('White rice', 'Local Mill', 0.78, 'kg', 500, false),                     -- ₱50/kg
  ('Glutinous rice (malagkit)', 'Local Mill', 0.94, 'kg', 200, false)       -- ₱60/kg
on conflict (name) do nothing;

-- Canned & Packaged Goods
insert into public.products (name, vendor, price, unit, stock_quantity, is_featured) values
  ('Liver spread', 'Reno', 0.63, 'jar', 100, false),                       -- ₱40/jar
  ('Cheddar cheese', 'Kraft', 1.57, 'pack', 50, false),                    -- ₱100/pack
  ('Evaporated milk', 'Alaska', 0.55, 'can', 200, false),                  -- ₱35/can
  ('Tomato sauce', 'Del Monte', 0.39, 'pack', 200, false),                 -- ₱25/pack
  ('Green olives', 'Imported', 1.57, 'jar', 40, false),                    -- ₱100/jar
  ('Raisins', 'Sun-Maid', 0.78, 'pack', 100, false),                       -- ₱50/pack
  ('Chicharon', 'Local Maker', 1.10, 'pack', 80, false),                   -- ₱70/pack
  ('Dried fish (tuyo)', 'Coastal Catch', 0.31, 'pack', 100, false),        -- ₱20/pack
  ('Chicken broth', 'Knorr', 0.31, 'pack', 150, false)                     -- ₱20/pack
on conflict (name) do nothing;

-- Baking & Specialty Ingredients
insert into public.products (name, vendor, price, unit, stock_quantity, is_featured) values
  ('Cacao tablea', 'Local Cacao', 0.78, 'pack', 80, false),                -- ₱50/pack
  ('Fried garlic', 'Local Market', 0.78, 'jar', 50, false),                -- ₱50/jar
  ('Banana leaves', 'Local Market', 0.16, 'pack', 50, false),              -- ₱10/pack
  ('Salting salt (pang-asin)', 'Local Producer', 0.16, 'kg', 100, false),  -- ₱10/kg
  ('Red food coloring', 'McCormick', 0.78, 'bottle', 50, false),           -- ₱50/bottle
  ('Pineapple juice', 'Del Monte', 0.78, 'liter', 80, false),              -- ₱50/L
  ('White sugar', 'Bale', 0.78, 'kg', 200, false),                         -- ₱50/kg
  ('All-purpose flour', 'Maya', 0.63, 'pack', 150, false)                  -- ₱40/pack
on conflict (name) do nothing;

-- ============================================================
-- DONE! All tables, policies, triggers, and seed data created.
-- ============================================================