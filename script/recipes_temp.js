// --- Recipes Module ---
// Filipino recipes with cost estimation

export const recipes = [
  {
    id: 'adobo',
    name: 'Chicken Adobo',
    origin: 'National Dish (Tagalog region)',
    tags: ['Main Course', 'Dinner', 'Popular'],
    image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=400&h=300&fit=crop',
    description: 'The unofficial national dish of the Philippines. Chicken braised in vinegar, soy sauce, garlic, and bay leaves until tender and flavorful.',
    ingredients: [
      { productId: 'chicken', name: 'Chicken thighs', amount: '1.5', unit: 'kg' },
      { productId: 'soy-sauce', name: 'Soy sauce', amount: '1/2', unit: 'cup' },
      { productId: 'vinegar', name: 'Cane vinegar', amount: '1/2', unit: 'cup' },
      { productId: 'garlic', name: 'Garlic', amount: '6', unit: 'cloves' },
      { productId: 'bay-leaves', name: 'Bay leaves', amount: '3', unit: 'pcs' },
      { productId: 'peppercorns', name: 'Whole peppercorns', amount: '1', unit: 'tsp' },
      { productId: 'onion', name: 'Onion', amount: '1', unit: 'large' }
    ]
  },
  {
    id: 'sinigang',
    name: 'Sinigang na Baboy',
    origin: 'Tagalog region',
    tags: ['Soup', 'Sour', 'Comfort Food'],
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&h=300&fit=crop',
    description: 'A sour tamarind-based soup with pork, tomatoes, and vegetables. The perfect balance of sour and savory.',
    ingredients: [
      { productId: 'pork-ribs', name: 'Pork ribs', amount: '1', unit: 'kg' },
      { productId: 'tamarind', name: 'Tamarind mix/sampalok', amount: '40', unit: 'g' },
      { productId: 'tomatoes', name: 'Tomatoes', amount: '3', unit: 'pcs' },
      { productId: 'radish', name: 'Radish (labanos)', amount: '1', unit: 'bunch' },
      { productId: 'eggplant', name: 'Eggplant', amount: '2', unit: 'pcs' },
      { productId: 'kangkong', name: 'Kangkong (water spinach)', amount: '1', unit: 'bunch' },
      { productId: 'string-beans', name: 'String beans (sitaw)', amount: '200', unit: 'g' },
      { productId: 'onion', name: 'Onion', amount: '1', unit: 'large' },
      { productId: 'fish-sauce', name: 'Fish sauce (patis)', amount: '2', unit: 'tbsp' }
    ]
  },
  {
    id: 'kare-kare',
    name: 'Kare-Kare',
    origin: 'Pampanga',
    tags: ['Stew', 'Peanut Sauce', 'Special Occasion'],
    image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=400&h=300&fit=crop',
    description: 'Rich oxtail stew in thick peanut sauce, served with bagoong (fermented shrimp paste). A Pampanga classic.',
    ingredients: [
      { productId: 'oxtail', name: 'Oxtail', amount: '1.5', unit: 'kg' },
      { productId: 'peanut-butter', name: 'Peanut butter', amount: '1/2', unit: 'cup' },
      { productId: 'ground-rice', name: 'Toasted ground rice', amount: '1/4', unit: 'cup' },
      { productId: 'eggplant', name: 'Eggplant', amount: '2', unit: 'pcs' },
      { productId: 'pechay', name: 'Pechay (bok choy)', amount: '1', unit: 'bunch' },
      { productId: 'string-beans', name: 'String beans (sitaw)', amount: '200', unit: 'g' },
      { productId: 'banana-blossom', name: 'Banana blossom', amount: '1', unit: 'pcs' },
      { productId: 'onion', name: 'Onion', amount: '1', unit: 'large' },
      { productId: 'garlic', name: 'Garlic', amount: '6', unit: 'cloves' },
      { productId: 'annatto', name: 'Annatto powder', amount: '1', unit: 'tbsp' },
      { productId: 'bagoong', name: 'Bagoong (shrimp paste)', amount: '1/4', unit: 'cup' }
    ]
  },
  {
    id: 'lechon-kawali',
    name: 'Lechon Kawali',
    origin: 'Ilocos/Tagalog',
    tags: ['Crispy Pork', 'Appetizer', 'Party Food'],
    image: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=400&h=300&fit=crop',
    description: 'Crispy deep-fried pork belly with crackling skin. Served with liver sauce or vinegar dipping sauce.',
    ingredients: [
      { productId: 'pork-belly', name: 'Pork belly', amount: '1', unit: 'kg' },
      { productId: 'bay-leaves', name: 'Bay leaves', amount: '3', unit: 'pcs' },
      { productId: 'peppercorns', name: 'Whole peppercorns', amount: '1', unit: 'tbsp' },
      { productId: 'salt', name: 'Salt', amount: '2', unit: 'tbsp' },
      { productId: 'vinegar', name: 'Vinegar (for dipping)', amount: '1/2', unit: 'cup' },
      { productId: 'garlic', name: 'Garlic (for dipping)', amount: '4', unit: 'cloves' },
      { productId: 'onion', name: 'Onion (for dipping)', amount: '1', unit: 'pcs' }
    ]
  },
  {
    id: 'pancit-canton',
    name: 'Pancit Canton',
    origin: 'Chinese-Filipino',
    tags: ['Noodles', 'Celebration', 'Birthday'],
    image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=400&h=300&fit=crop',
    description: 'Stir-fried egg noodles with vegetables, meat, and seafood. Symbolizes long life in Filipino celebrations.',
    ingredients: [
      { productId: 'pancit-noodles', name: 'Pancit Canton noodles', amount: '500', unit: 'g' },
      { productId: 'chicken', name: 'Chicken breast', amount: '200', unit: 'g' },
      { productId: 'shrimp', name: 'Shrimp', amount: '150', unit: 'g' },
      { productId: 'cabbage', name: 'Cabbage', amount: '1/2', unit: 'head' },
      { productId: 'carrots', name: 'Carrots', amount: '2', unit: 'pcs' },
      { productId: 'snow-peas', name: 'Snow peas (chicharo)', amount: '150', unit: 'g' },
      { productId: 'soy-sauce', name: 'Soy sauce', amount: '3', unit: 'tbsp' },
      { productId: 'oyster-sauce', name: 'Oyster sauce', amount: '2', unit: 'tbsp' },
      { productId: 'garlic', name: 'Garlic', amount: '4', unit: 'cloves' },
      { productId: 'onion', name: 'Onion', amount: '1', unit: 'large' }
    ]
  },
  {
    id: 'lumpia-shanghai',
    name: 'Lumpiang Shanghai',
    origin: 'Chinese-Filipino',
    tags: ['Spring Rolls', 'Appetizer', 'Party Food'],
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=300&fit=crop',
    description: 'Crispy fried spring rolls filled with ground pork, vegetables, and seasonings. Best with sweet chili sauce.',
    ingredients: [
      { productId: 'ground-pork', name: 'Ground pork', amount: '500', unit: 'g' },
      { productId: 'carrots', name: 'Carrots', amount: '1', unit: 'large' },
      { productId: 'onion', name: 'Onion', amount: '1', unit: 'medium' },
      { productId: 'garlic', name: 'Garlic', amount: '3', unit: 'cloves' },
      { productId: 'green-onions', name: 'Green onions', amount: '1/4', unit: 'cup' },
      { productId: 'egg', name: 'Egg', amount: '1', unit: 'pcs' },
      { productId: 'lumpia-wrapper', name: 'Lumpia wrappers', amount: '1', unit: 'pack' },
      { productId: 'soy-sauce', name: 'Soy sauce', amount: '1', unit: 'tbsp' },
      { productId: 'black-pepper', name: 'Black pepper', amount: '1/2', unit: 'tsp' }
    ]
  },
  {
    id: 'bicol-express',
    name: 'Bicol Express',
    origin: 'Bicol Region',
    tags: ['Spicy', 'Coconut Milk', 'Pork'],
    image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&h=300&fit=crop',
    description: 'Spicy pork stew in coconut milk with chili peppers and shrimp paste. A fiery Bicolano specialty.',
    ingredients: [
      { productId: 'pork-belly', name: 'Pork belly', amount: '500', unit: 'g' },
      { productId: 'coconut-milk', name: 'Coconut milk (kakang gata)', amount: '2', unit: 'cups' },
      { productId: 'shrimp-paste', name: 'Shrimp paste (bagoong alamang)', amount: '3', unit: 'tbsp' },
      { productId: 'green-chili', name: 'Green chili (siling haba)', amount: '6', unit: 'pcs' },
      { productId: 'red-chili', name: 'Red chili (siling labuyo)', amount: '10', unit: 'pcs' },
      { productId: 'garlic', name: 'Garlic', amount: '5', unit: 'cloves' },
      { productId: 'onion', name: 'Onion', amount: '1', unit: 'large' },
      { productId: 'ginger', name: 'Ginger', amount: '1', unit: 'inch' }
    ]
  },
  {
    id: 'pinakbet',
    name: 'Pinakbet',
    origin: 'Ilocos Region',
    tags: ['Vegetable Stew', 'Bagoong', 'Healthy'],
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=300&fit=crop',
    description: 'Mixed vegetable stew with bitter melon, eggplant, okra, and squash in fermented shrimp paste sauce.',
    ingredients: [
      { productId: 'bitter-melon', name: 'Bitter melon (ampalaya)', amount: '2', unit: 'pcs' },
      { productId: 'eggplant', name: 'Eggplant', amount: '3', unit: 'pcs' },
      { productId: 'okra', name: 'Okra', amount: '200', unit: 'g' },
      { productId: 'squash', name: 'Squash (kalabasa)', amount: '300', unit: 'g' },
      { productId: 'string-beans', name: 'String beans (sitaw)', amount: '150', unit: 'g' },
      { productId: 'tomatoes', name: 'Tomatoes', amount: '3', unit: 'pcs' },
      { productId: 'pork', name: 'Pork (optional)', amount: '200', unit: 'g' },
      { productId: 'bagoong', name: 'Bagoong (shrimp paste)', amount: '2', unit: 'tbsp' },
      { productId: 'onion', name: 'Onion', amount: '1', unit: 'large' },
      { productId: 'garlic', name: 'Garlic', amount: '4', unit: 'cloves' }
    ]
  },
  {
    id: 'tinola',
    name: 'Tinolang Manok',
    origin: 'Tagalog region',
    tags: ['Soup', 'Chicken', 'Ginger', 'Comfort Food'],
    image: 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=400&h=300&fit=crop',
    description: 'Clear chicken soup with ginger, green papaya, and chili leaves. Light, comforting, and nourishing.',
    ingredients: [
      { productId: 'chicken', name: 'Chicken (native/whole cut)', amount: '1', unit: 'kg' },
      { productId: 'green-papaya', name: 'Green papaya', amount: '1', unit: 'small' },
      { productId: 'chili-leaves', name: 'Chili leaves (dahon ng sili)', amount: '1', unit: 'cup' },
      { productId: 'ginger', name: 'Ginger', amount: '2', unit: 'inches' },
      { productId: 'onion', name: 'Onion', amount: '1', unit: 'large' },
      { productId: 'fish-sauce', name: 'Fish sauce (patis)', amount: '2', unit: 'tbsp' },
      { productId: 'black-pepper', name: 'Black pepper', amount: '1/2', unit: 'tsp' }
    ]
  },
  {
    id: 'pork-sisig',
    name: 'Pork Sisig',
    origin: 'Pampanga',
    tags: ['Sizzling', 'Appetizer', 'Pulutan'],
    image: 'https://images.unsplash.com/photo-1606787366850-de6330128bfc?w=400&h=300&fit=crop',
    description: 'Sizzling chopped pig face and ears with onions, chili, and calamansi. The ultimate beer companion.',
    ingredients: [
      { productId: 'pig-face', name: 'Pig face/ears (maskara)', amount: '1', unit: 'kg' },
      { productId: 'chicken-liver', name: 'Chicken liver', amount: '100', unit: 'g' },
      { productId: 'onion', name: 'Onion (red)', amount: '2', unit: 'large' },
      { productId: 'green-chili', name: 'Green chili', amount: '4', unit: 'pcs' },
      { productId: 'calamansi', name: 'Calamansi', amount: '6', unit: 'pcs' },
      { productId: 'soy-sauce', name: 'Soy sauce', amount: '2', unit: 'tbsp' },
      { productId: 'mayonnaise', name: 'Mayonnaise', amount: '2', unit: 'tbsp' },
      { productId: 'egg', name: 'Egg (for topping)', amount: '1', unit: 'pcs' }
    ]
  },
  {
    id: 'chicken-inasal',
    name: 'Chicken Inasal',
    origin: 'Bacolod (Visayas)',
    tags: ['Grilled Chicken', 'Annatto', 'Street Food'],
    image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=400&h=300&fit=crop',
    description: 'Bacolod-style grilled chicken marinated in annatto, lemongrass, and calamansi. Served with garlic rice.',
    ingredients: [
      { productId: 'chicken', name: 'Chicken leg quarters', amount: '1', unit: 'kg' },
      { productId: 'lemongrass', name: 'Lemongrass', amount: '3', unit: 'stalks' },
      { productId: 'annatto', name: 'Annatto oil/powder', amount: '2', unit: 'tbsp' },
      { productId: 'calamansi', name: 'Calamansi', amount: '6', unit: 'pcs' },
      { productId: 'garlic', name: 'Garlic', amount: '6', unit: 'cloves' },
      { productId: 'vinegar', name: 'Vinegar', amount: '1/4', unit: 'cup' },
      { productId: 'brown-sugar', name: 'Brown sugar', amount: '1', unit: 'tbsp' },
      { productId: 'salt', name: 'Salt', amount: '1', unit: 'tbsp' },
      { productId: 'black-pepper', name: 'Black pepper', amount: '1', unit: 'tsp' }
    ]
  },
  {
    id: 'kinilaw',
    name: 'Kinilaw (Ceviche)',
    origin: 'Visayas/Mindanao',
    tags: ['Raw Fish', 'Vinegar', 'Appetizer'],
    image: 'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=400&h=300&fit=crop',
    description: 'Fresh raw fish cured in vinegar with ginger, chili, and coconut milk. The Filipino ceviche.',
    ingredients: [
      { productId: 'tuna', name: 'Fresh tuna (sashimi grade)', amount: '300', unit: 'g' },
      { productId: 'vinegar', name: 'Coconut vinegar', amount: '1/2', unit: 'cup' },
      { productId: 'coconut-milk', name: 'Coconut milk', amount: '1/2', unit: 'cup' },
      { productId: 'ginger', name: 'Ginger', amount: '1', unit: 'inch' },
      { productId: 'red-chili', name: 'Red chili', amount: '3', unit: 'pcs' },
      { productId: 'red-onion', name: 'Red onion', amount: '1', unit: 'medium' },
      { productId: 'cucumber', name: 'Cucumber', amount: '1/2', unit: 'pcs' },
      { productId: 'salt', name: 'Salt', amount: '1', unit: 'tsp' }
    ]
  }
];

export const recipeIngredientMap = {
  'chicken': 'free-range-eggs',
  'soy-sauce': 'wildflower-honey',
  'vinegar': 'wildflower-honey',
  'garlic': 'cilantro',
  'bay-leaves': 'fresh-basil',
  'peppercorns': 'poblano-peppers',
  'onion': 'poblano-peppers',
  'pork-ribs': 'grass-fed-beef',
  'tamarind': 'delicata-squash',
  'tomatoes': 'heirloom-tomatoes',
  'radish': 'cilantro',
  'eggplant': 'cilantro',
  'kangkong': 'baby-spinach',
  'string-beans': 'poblano-peppers',
  'fish-sauce': 'wildflower-honey',
  'oxtail': 'grass-fed-beef',
  'peanut-butter': 'wildflower-honey',
  'ground-rice': 'delicata-squash',
  'pechay': 'baby-spinach',
  'banana-blossom': 'delicata-squash',
  'annatto': 'poblano-peppers',
  'bagoong': 'wildflower-honey',
  'pork-belly': 'grass-fed-beef',
  'pancit-noodles': 'whole-wheat-bread',
  'shrimp': 'free-range-eggs',
  'cabbage': 'baby-spinach',
  'carrots': 'delicata-squash',
  'snow-peas': 'poblano-peppers',
  'oyster-sauce': 'wildflower-honey',
  'ground-pork': 'grass-fed-beef',
  'green-onions': 'cilantro',
  'lumpia-wrapper': 'whole-wheat-bread',
  'black-pepper': 'poblano-peppers',
  'coconut-milk': 'oat-milk',
  'shrimp-paste': 'wildflower-honey',
  'green-chili': 'poblano-peppers',
  'red-chili': 'poblano-peppers',
  'bitter-melon': 'poblano-peppers',
  'okra': 'cilantro',
  'squash': 'delicata-squash',
  'green-papaya': 'delicata-squash',
  'chili-leaves': 'baby-spinach',
  'pig-face': 'grass-fed-beef',
  'chicken-liver': 'free-range-eggs',
  'calamansi': 'poblano-peppers',
  'mayonnaise': 'wildflower-honey',
  'lemongrass': 'cilantro',
  'brown-sugar': 'wildflower-honey',
  'tuna': 'free-range-eggs',
  'red-onion': 'poblano-peppers',
  'cucumber': 'delicata-squash',
  'salt': 'wildflower-honey'
};

const USD_TO_PHP_RATE = 63.76;

export function calculateRecipeCost(recipe) {
  let totalUsd = 0;
  let ingredientDetails = [];
  
  recipe.ingredients.forEach(ing => {
    const productId = recipeIngredientMap[ing.productId];
    if (productId) {
      const card = document.querySelector('[data-product-id="' + productId + '"]');
      if (card) {
        const priceText = card.querySelector('.produce-price').textContent;
        const price = Number(priceText.replace(/[^\d.]/g, '')) || Number(card.dataset.price) || 0;
        
        let amount = ing.amount;
        if (amount.includes('/')) {
          const parts = amount.split('/');
          amount = parseFloat(parts[0]) / parseFloat(parts[1]);
        } else {
          amount = parseFloat(amount);
        }
        
        const itemCost = price * amount;
        totalUsd += itemCost;
        ingredientDetails.push({
          name: ing.name,
          amount: ing.amount,
          unit: ing.unit,
          unitPrice: price,
          totalPrice: itemCost
        });
      }
    }
  });
  
  const totalPhp = totalUsd * USD_TO_PHP_RATE;
  return { usd: totalUsd, php: totalPhp, details: ingredientDetails };
}

export function formatPrice(usd, php) {
  return '\$' + usd.toFixed(2) + ' | P' + php.toFixed(2);
}

export function renderRecipes() {
  const recipesGrid = document.getElementById('recipesGrid');
  if (!recipesGrid) return;
  recipesGrid.innerHTML = '';
  
  recipes.forEach(recipe => {
    const card = document.createElement('article');
    card.className = 'recipe-card';
    card.dataset.recipeId = recipe.id;
    
    const cost = calculateRecipeCost(recipe);
    const costHtml = formatPrice(cost.usd, cost.php);
    
    const tagsHtml = recipe.tags.map(tag => '<span class=\"recipe-tag\">' + tag + '</span>').join('');
    
    card.innerHTML = 
      '<img class=\"recipe-image\" src=\"' + recipe.image + '\" alt=\"' + recipe.name + '\" loading=\"lazy\">' +
      '<div class=\"recipe-card-body\">' +
        '<h3>' + recipe.name + '</h3>' +
        '<p class=\"recipe-origin\">' + recipe.origin + '</p>' +
        '<div class=\"recipe-tags\">' + tagsHtml + '</div>' +
        '<p class=\"recipe-preview\">' + recipe.description + '</p>' +
        '<p class=\"recipe-cost\"><strong>Est. Cost:</strong> ' + costHtml + '</p>' +
      '</div>';
    
    card.addEventListener('click', () => showRecipeDetail(recipe));
    recipesGrid.appendChild(card);
  });
}

let currentRecipe = null;
const recipeDetailDialog = document.getElementById('recipeDetailDialog');
const recipeDetailTitle = document.getElementById('recipeDetailTitle');
const recipeDetailContent = document.getElementById('recipeDetailContent');
const recipeDetailClose = document.getElementById('recipeDetailClose');
const recipeCloseBtn = document.getElementById('recipeCloseBtn');
const recipeAddAllBtn = document.getElementById('recipeAddAllBtn');

export function showRecipeDetail(recipe) {
  currentRecipe = recipe;
  recipeDetailTitle.textContent = recipe.name;
  
  const cost = calculateRecipeCost(recipe);
  const costHtml = formatPrice(cost.usd, cost.php);
  
  let ingredientsHtml = recipe.ingredients.map((ing, index) => {
    const productId = recipeIngredientMap[ing.productId] || '';
    return (
      '<div class=\"ingredient-item\" data-ingredient-index=\"' + index + '\">' +
        '<div class=\"ingredient-info\">' +
          '<span class=\"ingredient-name\">' + ing.name + '</span>' +
          '<span class=\"ingredient-amount\">' + ing.amount + ' ' + ing.unit + '</span>' +
        '</div>' +
        '<button type=\"button\" class=\"ingredient-add-btn\" data-product-id=\"' + productId + '\" data-ingredient-name=\"' + ing.name + '\" ' + (!productId ? 'disabled' : '') + '>' +
          (productId ? 'Add' : 'Not available') +
        '</button>' +
      '</div>'
    );
  }).join('');
  
  const tagsHtml = recipe.tags.map(tag => '<span class=\"recipe-tag\">' + tag + '</span>').join('');
  
  recipeDetailContent.innerHTML = 
    '<div class=\"recipe-detail\">' +
      '<div class=\"recipe-detail-header\">' +
        '<img class=\"recipe-detail-image\" src=\"' + recipe.image + '\" alt=\"' + recipe.name + '\">' +
        '<div class=\"recipe-detail-info\">' +
          '<h3>' + recipe.name + '</h3>' +
          '<p class=\"recipe-detail-origin\">' + recipe.origin + '</p>' +
          '<div class=\"recipe-detail-tags\">' + tagsHtml + '</div>' +
        '</div>' +
      '</div>' +
      '<div class=\"recipe-detail-ingredients\">' +
        '<h4>Ingredients</h4>' +
        '<div class=\"ingredient-list\">' + ingredientsHtml + '</div>' +
        '<div class=\"recipe-detail-cost\"><strong>Est. Total Cost:</strong> ' + costHtml + '</div>' +
      '</div>' +
    '</div>';
  
  recipeDetailDialog.showModal();
  
  recipeDetailContent.querySelectorAll('.ingredient-add-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const productId = btn.dataset.productId;
      const ingredientName = btn.dataset.ingredientName;
      if (productId && window.addProductToCart) {
        const card = document.querySelector('[data-product-id="' + productId + '"]');
        if (card) {
          const priceText = card.querySelector('.produce-price').textContent;
          const price = Number(priceText.replace(/[^\d.]/g, '')) || Number(card.dataset.price) || 0;
          const product = {
            id: productId,
            name: card.querySelector('h3').textContent.trim(),
            vendor: card.querySelector('.produce-vendor')?.textContent.trim() || '',
            price,
            unit: card.dataset.unit || '',
            stock: card.dataset.stock === undefined ? null : Number(card.dataset.stock),
            availability: card.dataset.availability || 'available'
          };
          const added = window.addProductToCart(product);
          if (added) {
            btn.textContent = 'Added';
            btn.classList.add('added');
            btn.disabled = true;
            setTimeout(() => {
              btn.textContent = 'Add';
              btn.classList.remove('added');
              btn.disabled = false;
            }, 1500);
          }
        }
      }
    });
  });
}

function closeRecipeDetail() {
  recipeDetailDialog.close();
  currentRecipe = null;
}

recipeDetailClose?.addEventListener('click', closeRecipeDetail);
recipeCloseBtn?.addEventListener('click', closeRecipeDetail);
recipeDetailDialog?.addEventListener('click', (e) => { if (e.target === recipeDetailDialog) closeRecipeDetail(); });

recipeAddAllBtn?.addEventListener('click', () => {
  if (!currentRecipe) return;
  let addedCount = 0;
  currentRecipe.ingredients.forEach(ing => {
    const productId = recipeIngredientMap[ing.productId];
    if (productId && window.addProductToCart) {
      const card = document.querySelector('[data-product-id="' + productId + '"]');
      if (card) {
        const priceText = card.querySelector('.produce-price').textContent;
        const price = Number(priceText.replace(/[^\d.]/g, '')) || Number(card.dataset.price) || 0;
        const product = {
          id: productId,
          name: card.querySelector('h3').textContent.trim(),
          vendor: card.querySelector('.produce-vendor')?.textContent.trim() || '',
          price,
          unit: card.dataset.unit || '',
          stock: card.dataset.stock === undefined ? null : Number(card.dataset.stock),
          availability: card.dataset.availability || 'available'
        };
        if (window.addProductToCart(product)) addedCount++;
      }
    }
  });
  if (addedCount > 0) {
    showToast(addedCount + ' ingredients added to cart');
  }
});


