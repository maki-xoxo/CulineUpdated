-- Recipe Ingredients Migration
-- Run this in Supabase SQL Editor after the main setup.sql
-- Adds all products needed for Filipino recipe cost calculations

-- Meat & Poultry
insert into public.products (name, vendor, price, unit, stock_quantity, is_featured, barcode) values
  ('Chicken thighs', 'Local Poultry Farm', 3.50, 'kg', 50, false, '4800100100101'),
  ('Pork ribs', 'Green Pastures Ranch', 7.80, 'kg', 30, false, '4800100100102'),
  ('Pork belly', 'Green Pastures Ranch', 8.50, 'kg', 25, false, '4800100100103'),
  ('Oxtail', 'Green Pastures Ranch', 12.00, 'kg', 15, false, '4800100100104'),
  ('Ground pork', 'Green Pastures Ranch', 6.50, 'kg', 40, false, '4800100100105'),
  ('Chicken breast', 'Local Poultry Farm', 4.20, 'kg', 35, false, '4800100100106'),
  ('Chicken leg quarters', 'Local Poultry Farm', 3.80, 'kg', 40, false, '4800100100107'),
  ('Chicken (native/whole cut)', 'Local Poultry Farm', 4.00, 'kg', 30, false, '4800100100108'),
  ('Pig face/ears (maskara)', 'Green Pastures Ranch', 5.50, 'kg', 10, false, '4800100100109'),
  ('Chicken liver', 'Local Poultry Farm', 2.80, 'kg', 20, false, '4800100100110'),
  ('Shrimp', 'Coastal Catch', 15.00, 'kg', 20, false, '4800100100111'),
  ('Fresh tuna (sashimi grade)', 'Coastal Catch', 25.00, 'kg', 10, false, '4800100100112'),
  ('Pork (for pinakbet)', 'Green Pastures Ranch', 7.00, 'kg', 30, false, '4800100100113')
on conflict (name) do nothing;

-- Seafood
insert into public.products (name, vendor, price, unit, stock_quantity, is_featured, barcode) values
  ('Shrimp (for pancit)', 'Coastal Catch', 15.00, 'kg', 20, false, '4800100100114')
on conflict (name) do nothing;

-- Pantry - Sauces & Condiments
insert into public.products (name, vendor, price, unit, stock_quantity, is_featured, barcode) values
  ('Soy sauce', 'Silver Swan', 1.80, 'liter', 100, false, '4800100200101'),
  ('Cane vinegar', 'Datu Puti', 1.50, 'liter', 100, false, '4800100200102'),
  ('Coconut vinegar', 'Datu Puti', 1.60, 'liter', 80, false, '4800100200103'),
  ('Fish sauce (patis)', 'Rufina', 2.20, 'liter', 100, false, '4800100200104'),
  ('Oyster sauce', 'Mega', 2.50, 'bottle', 80, false, '4800100200105'),
  ('Shrimp paste (bagoong alamang)', 'Navotas', 3.00, 'jar', 60, false, '4800100200106'),
  ('Bagoong (shrimp paste)', 'Navotas', 3.50, 'jar', 60, false, '4800100200107'),
  ('Mayonnaise', 'Lady''s Choice', 3.20, 'jar', 80, false, '4800100200108'),
  ('Vinegar (for dipping)', 'Datu Puti', 1.50, 'liter', 100, false, '4800100200109')
on conflict (name) do nothing;

-- Pantry - Dry Goods
insert into public.products (name, vendor, price, unit, stock_quantity, is_featured, barcode) values
  ('Tamarind mix/sampalok', 'Knorr', 0.80, 'pack', 200, false, '4800100300101'),
  ('Peanut butter', 'Lily', 3.50, 'jar', 80, false, '4800100300102'),
  ('Toasted ground rice', 'Local Mill', 2.00, 'cup', 100, false, '4800100300103'),
  ('Annatto powder', 'Mama Sita', 1.20, 'pack', 100, false, '4800100300104'),
  ('Annatto oil', 'Mama Sita', 2.00, 'bottle', 60, false, '4800100300105'),
  ('Pancit Canton noodles', 'Lucky Me', 1.50, 'pack', 200, false, '4800100300106'),
  ('Lumpia wrappers', 'Spring Home', 2.80, 'pack', 100, false, '4800100300107'),
  ('Brown sugar', 'Bale', 1.80, 'kg', 100, false, '4800100300108'),
  ('Salt', 'Fino', 0.50, 'kg', 200, false, '4800100300109'),
  ('Black pepper', 'McCormick', 4.00, 'jar', 60, false, '4800100300110'),
  ('Whole peppercorns', 'Local Spice', 3.50, 'jar', 60, false, '4800100300111')
on conflict (name) do nothing;

-- Coconut Products
insert into public.products (name, vendor, price, unit, stock_quantity, is_featured, barcode) values
  ('Coconut milk (kakang gata)', 'Kara', 1.50, 'can', 100, false, '4800100400101'),
  ('Coconut milk (regular)', 'Kara', 1.20, 'can', 150, false, '4800100400102')
on conflict (name) do nothing;

-- Vegetables & Herbs
insert into public.products (name, vendor, price, unit, stock_quantity, is_featured, barcode) values
  ('Garlic', 'Baguio Farmers', 4.00, 'kg', 100, false, '4800100500101'),
  ('Onion (yellow)', 'Baguio Farmers', 2.50, 'kg', 100, false, '4800100500102'),
  ('Onion (red)', 'Baguio Farmers', 3.00, 'kg', 80, false, '4800100500103'),
  ('Onion (large)', 'Baguio Farmers', 2.50, 'kg', 100, false, '4800100500104'),
  ('Garlic cloves', 'Baguio Farmers', 4.00, 'kg', 100, false, '4800100500105'),
  ('Tomatoes', 'Sunfield Acres', 3.00, 'kg', 80, false, '4800100500106'),
  ('Radish (labanos)', 'Baguio Farmers', 2.00, 'kg', 60, false, '4800100500107'),
  ('Eggplant', 'Meadow Lane Farm', 2.80, 'kg', 80, false, '4800100500108'),
  ('Kangkong (water spinach)', 'Riverside Growers', 1.50, 'bunch', 100, false, '4800100500109'),
  ('String beans (sitaw)', 'Riverside Growers', 3.00, 'kg', 80, false, '4800100500110'),
  ('Pechay (bok choy)', 'Riverside Growers', 2.00, 'bunch', 100, false, '4800100500111'),
  ('Banana blossom', 'Local Market', 1.00, 'pcs', 30, false, '4800100500112'),
  ('Green chili (siling haba)', 'Sunfield Acres', 4.00, 'kg', 50, false, '4800100500113'),
  ('Red chili (siling labuyo)', 'Sunfield Acres', 8.00, 'kg', 30, false, '4800100500114'),
  ('Bitter melon (ampalaya)', 'Meadow Lane Farm', 3.50, 'kg', 40, false, '4800100500115'),
  ('Okra', 'Meadow Lane Farm', 3.00, 'kg', 60, false, '4800100500116'),
  ('Squash (kalabasa)', 'Meadow Lane Farm', 2.00, 'kg', 80, false, '4800100500117'),
  ('Green papaya', 'Meadow Lane Farm', 2.50, 'kg', 40, false, '4800100500118'),
  ('Chili leaves (dahon ng sili)', 'Riverside Growers', 1.00, 'bunch', 50, false, '4800100500119'),
  ('Carrots', 'Meadow Lane Farm', 2.50, 'kg', 80, false, '4800100500120'),
  ('Snow peas (chicharo)', 'Riverside Growers', 5.00, 'kg', 30, false, '4800100500121'),
  ('Cabbage', 'Sunfield Acres', 2.00, 'head', 60, false, '4800100500122'),
  ('Cucumber', 'Hollow Creek Farm', 1.80, 'pcs', 80, false, '4800100500123'),
  ('Green onions', 'Riverside Growers', 1.50, 'bunch', 100, false, '4800100500124'),
  ('Lemongrass', 'Riverside Growers', 2.00, 'stalk', 100, false, '4800100500125'),
  ('Ginger', 'Baguio Farmers', 5.00, 'kg', 60, false, '4800100500126'),
  ('Bay leaves', 'Local Herb', 1.00, 'pack', 200, false, '4800100500127'),
  ('Calamansi', 'Sunfield Acres', 3.00, 'kg', 80, false, '4800100500128')
on conflict (name) do nothing;

-- Eggs & Dairy
insert into public.products (name, vendor, price, unit, stock_quantity, is_featured, barcode) values
  ('Egg', 'Blue Barn Poultry', 0.15, 'pcs', 500, false, '4800100600101')
on conflict (name) do nothing;