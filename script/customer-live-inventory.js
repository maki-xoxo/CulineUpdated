import { supabase, supabaseConfigured } from './supabase-client.js';
import { USD_TO_PHP_RATE, getCurrency, formatCurrency } from './cart.js';

// formatCurrency already returns only the selected currency

// Category mapping based on product name/vendor
const CATEGORY_MAP = {
  // Produce
  'Produce': [
    'Heirloom tomatoes', 'Baby spinach', 'Rainbow carrots', 'French breakfast radishes',
    'English cucumbers', 'Sweet corn', 'Japanese eggplant', 'Red bell peppers',
    'Green bell peppers', 'Zucchini', 'Persian cucumbers', 'Rainbow chard',
    'Kale', 'Butter lettuce', 'Green cabbage', 'Cauliflower', 'Broccoli crowns',
    'Red onions', 'Golden beets', 'French green beans', 'Sugar snap peas',
    'Cherry tomatoes', 'Poblano peppers', 'Butternut squash', 'Fresh basil',
    'Cilantro', 'Delicata squash', 'Rainier cherries', 'Hass avocado',
    'Garlic', 'Onion (yellow)', 'Onion (red)', 'Onion (large)', 'Garlic cloves',
    'Tomatoes', 'Radish (labanos)', 'Eggplant', 'Kangkong (water spinach)',
    'String beans (sitaw)', 'Pechay (bok choy)', 'Banana blossom',
    'Green chili (siling haba)', 'Red chili (siling labuyo)', 'Bitter melon (ampalaya)',
    'Okra', 'Squash (kalabasa)', 'Green papaya', 'Chili leaves (dahon ng sili)',
    'Carrots', 'Snow peas (chicharo)', 'Cabbage', 'Cucumber', 'Green onions',
    'Lemongrass', 'Ginger', 'Bay leaves', 'Calamansi',
    // New produce items
    'Red bell pepper', 'Green bell pepper', 'Saluyot (jute leaves)',
    'Potatoes', 'Corn (sweet)', 'White rice', 'Glutinous rice (malagkit)',
    'Fresh coconut water', 'Young coconut meat', 'Green onions'
  ],
  // Dairy & Eggs
  'Dairy & Eggs': [
    'Sourdough loaf', 'Free-range eggs', 'Wildflower honey', 'Oat milk',
    'Whole wheat bread', 'Fresh goat cheese',
    'Egg', 'Coconut milk (kakang gata)', 'Coconut milk (regular)',
    'Evaporated milk', 'Cheddar cheese'
  ],
  // Bakery
  'Bakery': [
    'Sourdough loaf', 'Whole wheat bread', 'Pancit Canton noodles', 'Lumpia wrappers',
    'Fresh miki noodles', 'Molo/wonton wrappers', 'All-purpose flour',
    'White sugar', 'Brown sugar', 'Coconut sugar'
  ],
  // Meat & Fish
  'Meat & Fish': [
    'Grass-fed ground beef', 'Chicken thighs', 'Pork ribs', 'Pork belly',
    'Oxtail', 'Ground pork', 'Chicken breast', 'Chicken leg quarters',
    'Chicken (native/whole cut)', 'Pig face/ears (maskara)', 'Chicken liver',
    'Shrimp', 'Fresh tuna (sashimi grade)', 'Pork (for pinakbet)',
    'Beef shank', 'Pork liver', 'Pork heart', 'Pork kidney',
    'Grilled fish (tilapia/bangus)', 'Frog legs', 'Mole crickets (camaru)',
    'Pork fat (for larding)'
  ],
  // Pantry
  'Pantry': [
    'Wildflower honey', 'Soy sauce', 'Cane vinegar', 'Coconut vinegar',
    'Fish sauce (patis)', 'Oyster sauce', 'Shrimp paste (bagoong alamang)',
    'Bagoong (shrimp paste)', 'Mayonnaise', 'Vinegar (for dipping)',
    'Tamarind mix/sampalok', 'Peanut butter', 'Toasted ground rice',
    'Annatto powder', 'Annatto oil', 'Brown sugar', 'Salt', 'Black pepper',
    'Whole peppercorns', 'Coconut milk (kakang gata)', 'Coconut milk (regular)',
    'Liver spread', 'Tomato sauce', 'Green olives', 'Raisins', 'Chicharon',
    'Dried fish (tuyo)', 'Chicken broth', 'Cacao tablea', 'Fried garlic',
    'Banana leaves', 'Salting salt (pang-asin)', 'Red food coloring',
    'Pineapple juice', 'Palapa (Maranao condiment)', 'Turmeric powder', 'Galangal'
  ]
};

// Reverse lookup: product name -> category
const PRODUCT_TO_CATEGORY = {};
Object.entries(CATEGORY_MAP).forEach(([category, products]) => {
  products.forEach(p => { PRODUCT_TO_CATEGORY[p] = category; });
});

// Default category for unknown products
function getProductCategory(productName) {
  return PRODUCT_TO_CATEGORY[productName] || 'Pantry';
}

// Store channel reference to prevent duplicate subscriptions
let inventoryChannel = null;

async function checkAuthAndLoad() {
  if (!supabaseConfigured) { window.culineProducts = []; window.culineInventoryError = true; return; }
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) { window.culineProducts = []; window.culineInventoryError = true; return; }
  await loadInventory();
}

async function loadInventory() {
  window.culineProducts = null;
  window.culineInventoryError = false;

  const grids = {
    produce: document.getElementById('grid-produce'),
    'dairy-eggs': document.getElementById('grid-dairy-eggs'),
    bakery: document.getElementById('grid-bakery'),
    'meat-fish': document.getElementById('grid-meat-fish'),
    pantry: document.getElementById('grid-pantry')
  };
  const heading = document.getElementById('marketHeading');
  const marketLink = document.getElementById('seeFullMarket');
  const status = document.getElementById('inventorySyncStatus');
  const searchInput = document.querySelector('.search input');

  let products = [];
  let fullMarket = true; // Show all products by default
  let searchQuery = '';

  // Category sections for hiding/showing
  const categorySections = {
    produce: document.getElementById('category-produce'),
    'dairy-eggs': document.getElementById('category-dairy-eggs'),
    bakery: document.getElementById('category-bakery'),
    'meat-fish': document.getElementById('category-meat-fish'),
    pantry: document.getElementById('category-pantry')
  };

  function createCard(product) {
    const card = document.createElement('article');
    card.className = 'produce-card';
    card.dataset.productId = product.id;
    card.dataset.price = product.price;
    card.dataset.unit = product.unit;
    card.dataset.stock = product.stock_quantity;
    card.dataset.availability = product.availability;

    const swatch = document.createElement('div');
    swatch.className = 'produce-swatch';
    const colors = ['#E27A54', '#7FA06A', '#D8B27C', '#EAD9A8', '#E3A93B', '#C97A3E', '#D14A4A', '#5D8A4B', '#B8473E', '#F5F0E6', '#D4A87A', '#FDF8F0', '#588453', '#D28B45', '#5B8B50', '#6C9B5B'];
    const colorIndex = product.name.split('').reduce((a, b) => a + b.charCodeAt(0), 0) % colors.length;
    swatch.style.backgroundColor = colors[colorIndex];

    const body = document.createElement('div');
    body.className = 'produce-body';

    const title = document.createElement('h3');
    title.textContent = product.name;

    const farm = document.createElement('p');
    farm.className = 'produce-vendor';
    farm.textContent = product.vendor;

    const row = document.createElement('div');
    row.className = 'produce-row';

    const priceLabel = document.createElement('span');
    priceLabel.className = 'produce-price';
    priceLabel.textContent = formatCurrency(product.price) + ' / ' + product.unit;

    const addButton = document.createElement('button');
    addButton.className = 'add-btn';
    addButton.type = 'button';
    addButton.textContent = product.availability === 'available' ? 'Add' : 'Unavailable';
    if (product.availability !== 'available' || product.stock_quantity <= 0) {
      addButton.disabled = true;
      addButton.style.opacity = '0.5';
    }

    row.append(priceLabel, addButton);
    body.append(title, farm, row);
    card.append(swatch, body);
    return card;
  }

  function renderProducts() {
    if (!grids.produce) return;

    // Filter products by search query
    let filteredProducts = products;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      filteredProducts = filteredProducts.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.vendor.toLowerCase().includes(q) ||
        (p.unit && p.unit.toLowerCase().includes(q))
      );
    }

    // Group by category
    const byCategory = {
      produce: [],
      'dairy-eggs': [],
      bakery: [],
      'meat-fish': [],
      pantry: []
    };

    filteredProducts.forEach(p => {
      const cat = getProductCategory(p.name);
      // Map category name to grid key
      const catKey = cat.toLowerCase().replace(/[&]/g, '').replace(/\s+/g, '-').replace(/[^a-z-]/g, '');
      if (byCategory[catKey] !== undefined) {
        byCategory[catKey].push(p);
      } else {
        byCategory.pantry.push(p); // fallback
      }
    });

    // Render each category
    let totalCount = 0;
    Object.keys(grids).forEach(catKey => {
      const grid = grids[catKey];
      const section = categorySections[catKey];
      const catProducts = fullMarket ? byCategory[catKey] : byCategory[catKey].filter(p => p.is_featured);

      if (catProducts.length > 0) {
        grid.replaceChildren(...catProducts.map(createCard));
        if (section) section.style.display = '';
        totalCount += catProducts.length;
      } else {
        grid.replaceChildren();
        if (section) section.style.display = 'none';
      }
    });

    // Update heading
    heading.textContent = fullMarket ? `Full market (${totalCount} items)` : 'Fresh today';
    if (searchQuery) heading.textContent += ` — filtered by "${searchQuery}"`;

    // Update "See full market" link
    marketLink.textContent = fullMarket ? 'Back to featured' : 'See full market';
    marketLink.setAttribute('aria-expanded', fullMarket.toString());

    if (window.applyProducePhotos) window.applyProducePhotos();
  }

  // Expose search function for universal search bar (called from index.html)
  window.setMarketSearch = function(query) {
    searchQuery = query || '';
    if (searchInput) searchInput.value = searchQuery;
    renderProducts();
  };

  // Also expose renderProducts for manual refresh if needed
  window.renderMarketProducts = renderProducts;

  async function loadProducts() {
    if (!supabaseConfigured) return;
    try {
      status.textContent = 'Syncing with market…';
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('availability', 'available')
        .order('is_featured', { ascending: false })
        .order('name');
      if (error) throw error;
      products = data || [];
      window.culineProducts = products;
      window.culineInventoryError = false;
      status.textContent = products.length ? 'Inventory live' : 'No products available';
      renderProducts();
    } catch (err) {
      console.error('[customer-live-inventory] Failed to load products:', err);
      window.culineInventoryError = true;
      status.textContent = 'Failed to load inventory';
    }
  }

  // Toggle between featured and full market
  if (marketLink) {
    marketLink.addEventListener('click', (e) => {
      e.preventDefault();
      fullMarket = !fullMarket;
      renderProducts();
    });
  }

  // Realtime subscription
  if (supabaseConfigured) {
    // Unsubscribe existing channel if any
    if (inventoryChannel) {
      supabase.removeChannel(inventoryChannel);
    }
    inventoryChannel = supabase.channel('customer-inventory-live')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'products' }, loadProducts)
      .subscribe();
  }

  // Initial load
  await loadProducts();
}

checkAuthAndLoad();

supabase.auth.onAuthStateChange((event, session) => {
  if (event === 'SIGNED_IN' && session) loadInventory();
  else if (event === 'SIGNED_OUT') {
    window.culineProducts = [];
    window.culineInventoryError = true;
    Object.values(grids).forEach(g => { if (g) g.replaceChildren(); });
    Object.values(categorySections).forEach(s => { if (s) s.style.display = 'none'; });
    // Clean up realtime channel
    if (inventoryChannel) {
      supabase.removeChannel(inventoryChannel);
      inventoryChannel = null;
    }
  }
});