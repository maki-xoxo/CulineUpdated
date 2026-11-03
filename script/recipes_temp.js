// --- Recipes Module ---
// Filipino recipes with cost estimation

import { USD_TO_PHP_RATE, getCurrency } from './cart.js';

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
      { productId: 'vinegar-dipping', name: 'Vinegar (for dipping)', amount: '1/2', unit: 'cup' },
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
      { productId: 'chicken-breast', name: 'Chicken breast', amount: '200', unit: 'g' },
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
      { productId: 'pork-pinakbet', name: 'Pork (optional)', amount: '200', unit: 'g' },
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
      { productId: 'chicken-native', name: 'Chicken (native/whole cut)', amount: '1', unit: 'kg' },
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
      { productId: 'chicken-legs', name: 'Chicken leg quarters', amount: '1', unit: 'kg' },
      { productId: 'lemongrass', name: 'Lemongrass', amount: '3', unit: 'stalks' },
      { productId: 'annatto-powder', name: 'Annatto oil/powder', amount: '2', unit: 'tbsp' },
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
      { productId: 'coconut-vinegar', name: 'Coconut vinegar', amount: '1/2', unit: 'cup' },
      { productId: 'coconut-milk-regular', name: 'Coconut milk', amount: '1/2', unit: 'cup' },
      { productId: 'ginger', name: 'Ginger', amount: '1', unit: 'inch' },
      { productId: 'red-chili', name: 'Red chili', amount: '3', unit: 'pcs' },
      { productId: 'red-onion', name: 'Red onion', amount: '1', unit: 'medium' },
      { productId: 'cucumber', name: 'Cucumber', amount: '1/2', unit: 'pcs' },
      { productId: 'salt', name: 'Salt', amount: '1', unit: 'tsp' }
    ]
  },

  // ============ MORE RECIPES FROM ALL REGIONS ============

  // Tagalog / National Favorites
  {
    id: 'beef-caldereta',
    name: 'Beef Caldereta',
    origin: 'Tagalog region',
    tags: ['Stew', 'Beef', 'Special Occasion', 'Tomato-based'],
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop',
    description: 'Hearty beef stew in tomato sauce with liver spread, olives, and bell peppers. A fiesta favorite.',
    ingredients: [
      { productId: 'beef-shank', name: 'Beef shank', amount: '1', unit: 'kg' },
      { productId: 'tomato-sauce', name: 'Tomato sauce', amount: '2', unit: 'cups' },
      { productId: 'liver-spread', name: 'Liver spread', amount: '85', unit: 'g' },
      { productId: 'potatoes', name: 'Potatoes', amount: '3', unit: 'pcs' },
      { productId: 'carrots', name: 'Carrots', amount: '2', unit: 'pcs' },
      { productId: 'red-bell-pepper', name: 'Red bell pepper', amount: '1', unit: 'pcs' },
      { productId: 'green-bell-pepper', name: 'Green bell pepper', amount: '1', unit: 'pcs' },
      { productId: 'olives', name: 'Green olives', amount: '1/2', unit: 'cup' },
      { productId: 'garlic', name: 'Garlic', amount: '6', unit: 'cloves' },
      { productId: 'onion', name: 'Onion', amount: '2', unit: 'large' },
      { productId: 'bay-leaves', name: 'Bay leaves', amount: '3', unit: 'pcs' },
      { productId: 'soy-sauce', name: 'Soy sauce', amount: '3', unit: 'tbsp' },
      { productId: 'cheese', name: 'Cheddar cheese', amount: '50', unit: 'g' }
    ]
  },
  {
    id: 'chicken-afritada',
    name: 'Chicken Afritada',
    origin: 'Tagalog region',
    tags: ['Stew', 'Chicken', 'Tomato-based', 'Family Meal'],
    image: 'https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=400&h=300&fit=crop',
    description: 'Chicken braised in tomato sauce with potatoes, carrots, and bell peppers. Simple and comforting.',
    ingredients: [
      { productId: 'chicken', name: 'Chicken thighs', amount: '1', unit: 'kg' },
      { productId: 'tomato-sauce', name: 'Tomato sauce', amount: '2', unit: 'cups' },
      { productId: 'potatoes', name: 'Potatoes', amount: '3', unit: 'pcs' },
      { productId: 'carrots', name: 'Carrots', amount: '2', unit: 'pcs' },
      { productId: 'red-bell-pepper', name: 'Red bell pepper', amount: '1', unit: 'pcs' },
      { productId: 'green-bell-pepper', name: 'Green bell pepper', amount: '1', unit: 'pcs' },
      { productId: 'garlic', name: 'Garlic', amount: '5', unit: 'cloves' },
      { productId: 'onion', name: 'Onion', amount: '1', unit: 'large' },
      { productId: 'bay-leaves', name: 'Bay leaves', amount: '2', unit: 'pcs' },
      { productId: 'fish-sauce', name: 'Fish sauce (patis)', amount: '2', unit: 'tbsp' }
    ]
  },
  {
    id: 'pork-menudo',
    name: 'Pork Menudo',
    origin: 'Tagalog region',
    tags: ['Stew', 'Pork', 'Tomato-based', 'Fiesta'],
    image: 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?w=400&h=300&fit=crop',
    description: 'Cuban-inspired Filipino pork stew with liver, potatoes, carrots, and raisins in tomato sauce.',
    ingredients: [
      { productId: 'pork-belly', name: 'Pork belly', amount: '500', unit: 'g' },
      { productId: 'pork-liver', name: 'Pork liver', amount: '150', unit: 'g' },
      { productId: 'tomato-sauce', name: 'Tomato sauce', amount: '2', unit: 'cups' },
      { productId: 'potatoes', name: 'Potatoes', amount: '2', unit: 'pcs' },
      { productId: 'carrots', name: 'Carrots', amount: '2', unit: 'pcs' },
      { productId: 'raisins', name: 'Raisins', amount: '1/4', unit: 'cup' },
      { productId: 'garlic', name: 'Garlic', amount: '5', unit: 'cloves' },
      { productId: 'onion', name: 'Onion', amount: '1', unit: 'large' },
      { productId: 'soy-sauce', name: 'Soy sauce', amount: '3', unit: 'tbsp' },
      { productId: 'bay-leaves', name: 'Bay leaves', amount: '2', unit: 'pcs' }
    ]
  },
  {
    id: 'beef-mechado',
    name: 'Beef Mechado',
    origin: 'Tagalog region',
    tags: ['Stew', 'Beef', 'Larded', 'Special Occasion'],
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop',
    description: 'Larded beef in tomato sauce with soy sauce, calamansi, and vegetables. Rich and savory.',
    ingredients: [
      { productId: 'beef-shank', name: 'Beef shank', amount: '1', unit: 'kg' },
      { productId: 'pork-fat', name: 'Pork fat (for larding)', amount: '100', unit: 'g' },
      { productId: 'tomato-sauce', name: 'Tomato sauce', amount: '2', unit: 'cups' },
      { productId: 'soy-sauce', name: 'Soy sauce', amount: '1/4', unit: 'cup' },
      { productId: 'calamansi', name: 'Calamansi', amount: '4', unit: 'pcs' },
      { productId: 'potatoes', name: 'Potatoes', amount: '3', unit: 'pcs' },
      { productId: 'carrots', name: 'Carrots', amount: '2', unit: 'pcs' },
      { productId: 'garlic', name: 'Garlic', amount: '6', unit: 'cloves' },
      { productId: 'onion', name: 'Onion', amount: '2', unit: 'large' },
      { productId: 'bay-leaves', name: 'Bay leaves', amount: '3', unit: 'pcs' }
    ]
  },
  {
    id: 'nilagang-baka',
    name: 'Nilagang Baka',
    origin: 'Tagalog region',
    tags: ['Soup', 'Beef', 'Clear Broth', 'Comfort Food'],
    image: 'https://images.unsplash.com/photo-1603105037880-880cd4edfb0d?w=400&h=300&fit=crop',
    description: 'Clear beef soup with cabbage, potatoes, and pechay. Simple, nourishing, and perfect for rainy days.',
    ingredients: [
      { productId: 'beef-shank', name: 'Beef shank', amount: '1', unit: 'kg' },
      { productId: 'cabbage', name: 'Cabbage', amount: '1/2', unit: 'head' },
      { productId: 'potatoes', name: 'Potatoes', amount: '4', unit: 'pcs' },
      { productId: 'pechay', name: 'Pechay (bok choy)', amount: '2', unit: 'bunch' },
      { productId: 'onion', name: 'Onion', amount: '2', unit: 'large' },
      { productId: 'fish-sauce', name: 'Fish sauce (patis)', amount: '3', unit: 'tbsp' },
      { productId: 'peppercorns', name: 'Whole peppercorns', amount: '1', unit: 'tbsp' }
    ]
  },
  {
    id: 'bulalo',
    name: 'Bulalo (Beef Marrow Soup)',
    origin: 'Batangas (Tagalog)',
    tags: ['Soup', 'Beef', 'Bone Marrow', 'Weekend Treat'],
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&h=300&fit=crop',
    description: 'Rich beef shank soup with corn, cabbage, and bone marrow. Batangas specialty best eaten with patis and calamansi.',
    ingredients: [
      { productId: 'beef-shank', name: 'Beef shank (with marrow)', amount: '1.5', unit: 'kg' },
      { productId: 'corn', name: 'Sweet corn', amount: '4', unit: 'pcs' },
      { productId: 'cabbage', name: 'Cabbage', amount: '1/2', unit: 'head' },
      { productId: 'pechay', name: 'Pechay (bok choy)', amount: '2', unit: 'bunch' },
      { productId: 'onion', name: 'Onion', amount: '2', unit: 'large' },
      { productId: 'fish-sauce', name: 'Fish sauce (patis)', amount: '3', unit: 'tbsp' },
      { productId: 'peppercorns', name: 'Whole peppercorns', amount: '1', unit: 'tbsp' },
      { productId: 'calamansi', name: 'Calamansi', amount: '4', unit: 'pcs' }
    ]
  },

  // Visayas
  {
    id: 'batchoy',
    name: 'La Paz Batchoy',
    origin: 'Iloilo (Visayas)',
    tags: ['Noodle Soup', 'Pork', 'Organ Meats', 'Breakfast'],
    image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&h=300&fit=crop',
    description: 'Rich pork broth with miki noodles, pork organs, chicharon, and garlic. Iloilo\'s famous breakfast soup.',
    ingredients: [
      { productId: 'pork-belly', name: 'Pork belly', amount: '300', unit: 'g' },
      { productId: 'pork-liver', name: 'Pork liver', amount: '100', unit: 'g' },
      { productId: 'pork-heart', name: 'Pork heart', amount: '100', unit: 'g' },
      { productId: 'pork-kidney', name: 'Pork kidney', amount: '100', unit: 'g' },
      { productId: 'miki-noodles', name: 'Fresh miki noodles', amount: '500', unit: 'g' },
      { productId: 'chicharon', name: 'Chicharon', amount: '50', unit: 'g' },
      { productId: 'garlic', name: 'Garlic', amount: '6', unit: 'cloves' },
      { productId: 'onion', name: 'Onion', amount: '1', unit: 'large' },
      { productId: 'soy-sauce', name: 'Soy sauce', amount: '2', unit: 'tbsp' },
      { productId: 'fish-sauce', name: 'Fish sauce (patis)', amount: '2', unit: 'tbsp' },
      { productId: 'egg', name: 'Egg', amount: '1', unit: 'pcs' },
      { productId: 'green-onions', name: 'Green onions', amount: '1/4', unit: 'cup' }
    ]
  },
  {
    id: 'chicken-binakol',
    name: 'Chicken Binakol',
    origin: 'Aklan/Visayas',
    tags: ['Soup', 'Chicken', 'Coconut Water', 'Native Chicken'],
    image: 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=400&h=300&fit=crop',
    description: 'Native chicken simmered in coconut water with lemongrass and papaya. Sweet, savory, and refreshing.',
    ingredients: [
      { productId: 'chicken-native', name: 'Chicken (native/whole cut)', amount: '1', unit: 'kg' },
      { productId: 'coconut-water', name: 'Fresh coconut water', amount: '4', unit: 'cups' },
      { productId: 'coconut-meat', name: 'Young coconut meat', amount: '1', unit: 'cup' },
      { productId: 'lemongrass', name: 'Lemongrass', amount: '3', unit: 'stalks' },
      { productId: 'green-papaya', name: 'Green papaya', amount: '1', unit: 'small' },
      { productId: 'chili-leaves', name: 'Chili leaves (dahon ng sili)', amount: '1', unit: 'cup' },
      { productId: 'ginger', name: 'Ginger', amount: '2', unit: 'inches' },
      { productId: 'onion', name: 'Onion', amount: '1', unit: 'large' },
      { productId: 'fish-sauce', name: 'Fish sauce (patis)', amount: '2', unit: 'tbsp' }
    ]
  },
  {
    id: 'pancit-molo',
    name: 'Pancit Molo',
    origin: 'Iloilo (Visayas)',
    tags: ['Dumpling Soup', 'Pork', 'Shrimp', 'Wonton'],
    image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&h=300&fit=crop',
    description: 'Wonton-style soup with pork and shrimp dumplings in clear broth. Named after Molo district in Iloilo.',
    ingredients: [
      { productId: 'ground-pork', name: 'Ground pork', amount: '300', unit: 'g' },
      { productId: 'shrimp', name: 'Shrimp', amount: '150', unit: 'g' },
      { productId: 'molo-wrapper', name: 'Molo/wonton wrappers', amount: '1', unit: 'pack' },
      { productId: 'egg', name: 'Egg', amount: '1', unit: 'pcs' },
      { productId: 'green-onions', name: 'Green onions', amount: '1/4', unit: 'cup' },
      { productId: 'garlic', name: 'Garlic', amount: '4', unit: 'cloves' },
      { productId: 'onion', name: 'Onion', amount: '1', unit: 'medium' },
      { productId: 'soy-sauce', name: 'Soy sauce', amount: '1', unit: 'tbsp' },
      { productId: 'chicken-broth', name: 'Chicken broth', amount: '8', unit: 'cups' },
      { productId: 'fish-sauce', name: 'Fish sauce (patis)', amount: '2', unit: 'tbsp' }
    ]
  },

  // Mindanao
  {
    id: 'piaparan',
    name: 'Piaparan (Maranao Chicken)',
    origin: 'Lanao del Sur (Mindanao)',
    tags: ['Chicken', 'Coconut Milk', 'Turmeric', 'Maranao'],
    image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&h=300&fit=crop',
    description: 'Maranao chicken in coconut milk with turmeric, palapa (spicy condiment), and grated coconut. Distinctive yellow color.',
    ingredients: [
      { productId: 'chicken-native', name: 'Chicken (native/whole cut)', amount: '1', unit: 'kg' },
      { productId: 'coconut-milk', name: 'Coconut milk (kakang gata)', amount: '3', unit: 'cups' },
      { productId: 'grated-coconut', name: 'Grated coconut (toasted)', amount: '1', unit: 'cup' },
      { productId: 'turmeric', name: 'Turmeric powder', amount: '2', unit: 'tbsp' },
      { productId: 'palapa', name: 'Palapa (Maranao condiment)', amount: '3', unit: 'tbsp' },
      { productId: 'lemongrass', name: 'Lemongrass', amount: '2', unit: 'stalks' },
      { productId: 'garlic', name: 'Garlic', amount: '5', unit: 'cloves' },
      { productId: 'onion', name: 'Onion', amount: '1', unit: 'large' },
      { productId: 'ginger', name: 'Ginger', amount: '1', unit: 'inch' },
      { productId: 'salt', name: 'Salt', amount: '1', unit: 'tbsp' }
    ]
  },
  {
    id: 'tiyula-itum',
    name: 'Tiyula Itum (Black Soup)',
    origin: 'Sulu/Tawi-Tawi (Mindanao)',
    tags: ['Beef', 'Burnt Coconut', 'Tausug', 'Special Occasion'],
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&h=300&fit=crop',
    description: 'Tausug beef soup darkened with burnt coconut meat. Rich, smoky, and aromatic with spices.',
    ingredients: [
      { productId: 'beef-shank', name: 'Beef shank', amount: '1', unit: 'kg' },
      { productId: 'burnt-coconut', name: 'Burnt coconut meat', amount: '1', unit: 'cup' },
      { productId: 'lemongrass', name: 'Lemongrass', amount: '3', unit: 'stalks' },
      { productId: 'garlic', name: 'Garlic', amount: '6', unit: 'cloves' },
      { productId: 'onion', name: 'Onion', amount: '2', unit: 'large' },
      { productId: 'ginger', name: 'Ginger', amount: '2', unit: 'inches' },
      { productId: 'turmeric', name: 'Turmeric powder', amount: '1', unit: 'tbsp' },
      { productId: 'green-chili', name: 'Green chili (siling haba)', amount: '4', unit: 'pcs' },
      { productId: 'salt', name: 'Salt', amount: '1', unit: 'tbsp' }
    ]
  },
  {
    id: 'pastil',
    name: 'Pastil (Magdalena)',
    origin: 'Maguindanao (Mindanao)',
    tags: ['Rice Meal', 'Shredded Chicken', 'Banana Leaf', 'Muslim'],
    image: 'https://images.unsplash.com/photo-1516684732162-798a0062be99?w=400&h=300&fit=crop',
    description: 'Steamed rice topped with shredded chicken adobo, wrapped in banana leaf. Portable Maguindanao breakfast.',
    ingredients: [
      { productId: 'rice', name: 'White rice', amount: '2', unit: 'cups' },
      { productId: 'chicken', name: 'Chicken thighs', amount: '500', unit: 'g' },
      { productId: 'soy-sauce', name: 'Soy sauce', amount: '1/4', unit: 'cup' },
      { productId: 'vinegar', name: 'Cane vinegar', amount: '1/4', unit: 'cup' },
      { productId: 'garlic', name: 'Garlic', amount: '5', unit: 'cloves' },
      { productId: 'onion', name: 'Onion', amount: '1', unit: 'large' },
      { productId: 'bay-leaves', name: 'Bay leaves', amount: '2', unit: 'pcs' },
      { productId: 'banana-leaves', name: 'Banana leaves', amount: '4', unit: 'pcs' },
      { productId: 'turmeric', name: 'Turmeric powder', amount: '1', unit: 'tsp' }
    ]
  },
  {
    id: 'rendang',
    name: 'Beef Rendang (Filipino Style)',
    origin: 'Mindanao (Maranao/Maguindanao)',
    tags: ['Beef', 'Coconut Milk', 'Spicy', 'Dry Curry'],
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop',
    description: 'Slow-cooked beef in coconut milk and spices until dry and caramelized. Mindanao\'s version of the Indonesian classic.',
    ingredients: [
      { productId: 'beef-shank', name: 'Beef shank', amount: '1', unit: 'kg' },
      { productId: 'coconut-milk', name: 'Coconut milk (kakang gata)', amount: '4', unit: 'cups' },
      { productId: 'lemongrass', name: 'Lemongrass', amount: '3', unit: 'stalks' },
      { productId: 'galangal', name: 'Galangal', amount: '2', unit: 'inches' },
      { productId: 'turmeric', name: 'Turmeric powder', amount: '2', unit: 'tbsp' },
      { productId: 'garlic', name: 'Garlic', amount: '6', unit: 'cloves' },
      { productId: 'onion', name: 'Onion', amount: '2', unit: 'large' },
      { productId: 'ginger', name: 'Ginger', amount: '2', unit: 'inches' },
      { productId: 'red-chili', name: 'Red chili (siling labuyo)', amount: '10', unit: 'pcs' },
      { productId: 'coconut-sugar', name: 'Coconut sugar', amount: '2', unit: 'tbsp' },
      { productId: 'salt', name: 'Salt', amount: '1', unit: 'tbsp' }
    ]
  },

  // Ilocos
  {
    id: 'dinengdeng',
    name: 'Dinengdeng',
    origin: 'Ilocos Region',
    tags: ['Vegetable Soup', 'Bagoong', 'Grilled Fish', 'Healthy'],
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&h=300&fit=crop',
    description: 'Light vegetable soup with bagoong, grilled fish, and whatever vegetables are in season. Simpler than pinakbet.',
    ingredients: [
      { productId: 'bagoong', name: 'Bagoong (shrimp paste)', amount: '2', unit: 'tbsp' },
      { productId: 'grilled-fish', name: 'Grilled fish (tilapia/bangus)', amount: '2', unit: 'pcs' },
      { productId: 'saluyot', name: 'Saluyot (jute leaves)', amount: '1', unit: 'bunch' },
      { productId: 'okra', name: 'Okra', amount: '100', unit: 'g' },
      { productId: 'eggplant', name: 'Eggplant', amount: '2', unit: 'pcs' },
      { productId: 'squash', name: 'Squash (kalabasa)', amount: '200', unit: 'g' },
      { productId: 'string-beans', name: 'String beans (sitaw)', amount: '100', unit: 'g' },
      { productId: 'tomatoes', name: 'Tomatoes', amount: '2', unit: 'pcs' },
      { productId: 'onion', name: 'Onion', amount: '1', unit: 'large' },
      { productId: 'garlic', name: 'Garlic', amount: '3', unit: 'cloves' }
    ]
  },
  {
    id: 'poqui-poqui',
    name: 'Poqui-poqui',
    origin: 'Ilocos Region',
    tags: ['Eggplant', 'Egg', 'Vegetarian', 'Simple'],
    image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=400&h=300&fit=crop',
    description: 'Grilled eggplant scrambled with eggs, tomatoes, and onions. Smoky, savory, and Ilocano simple.',
    ingredients: [
      { productId: 'eggplant', name: 'Eggplant', amount: '4', unit: 'pcs' },
      { productId: 'egg', name: 'Egg', amount: '4', unit: 'pcs' },
      { productId: 'tomatoes', name: 'Tomatoes', amount: '2', unit: 'pcs' },
      { productId: 'onion', name: 'Onion', amount: '1', unit: 'large' },
      { productId: 'garlic', name: 'Garlic', amount: '3', unit: 'cloves' },
      { productId: 'fish-sauce', name: 'Fish sauce (patis)', amount: '1', unit: 'tbsp' }
    ]
  },

  // Pampanga / Kapampangan
  {
    id: 'betute',
    name: 'Betute (Stuffed Frog)',
    origin: 'Pampanga',
    tags: ['Exotic', 'Frog', 'Stuffed', 'Kapampangan'],
    image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&h=300&fit=crop',
    description: 'Frog stuffed with minced pork and spices, then fried. A Kapampangan delicacy for adventurous eaters.',
    ingredients: [
      { productId: 'frog-legs', name: 'Frog legs', amount: '1', unit: 'kg' },
      { productId: 'ground-pork', name: 'Ground pork', amount: '300', unit: 'g' },
      { productId: 'garlic', name: 'Garlic', amount: '5', unit: 'cloves' },
      { productId: 'onion', name: 'Onion', amount: '1', unit: 'large' },
      { productId: 'soy-sauce', name: 'Soy sauce', amount: '2', unit: 'tbsp' },
      { productId: 'black-pepper', name: 'Black pepper', amount: '1', unit: 'tsp' },
      { productId: 'egg', name: 'Egg', amount: '1', unit: 'pcs' },
      { productId: 'flour', name: 'All-purpose flour', amount: '1', unit: 'cup' }
    ]
  },
  {
    id: 'camaru',
    name: 'Camaru (Mole Crickets)',
    origin: 'Pampanga',
    tags: ['Exotic', 'Insects', 'Fried', 'Kapampangan'],
    image: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=400&h=300&fit=crop',
    description: 'Mole crickets sautéed in garlic, onions, and tomatoes. Crunchy Kapampangan delicacy.',
    ingredients: [
      { productId: 'mole-crickets', name: 'Mole crickets (camaru)', amount: '500', unit: 'g' },
      { productId: 'garlic', name: 'Garlic', amount: '5', unit: 'cloves' },
      { productId: 'onion', name: 'Onion', amount: '1', unit: 'large' },
      { productId: 'tomatoes', name: 'Tomatoes', amount: '2', unit: 'pcs' },
      { productId: 'soy-sauce', name: 'Soy sauce', amount: '2', unit: 'tbsp' },
      { productId: 'vinegar', name: 'Cane vinegar', amount: '1', unit: 'tbsp' },
      { productId: 'salt', name: 'Salt', amount: '1', unit: 'tsp' }
    ]
  },
  {
    id: 'tocino',
    name: 'Pork Tocino',
    origin: 'Pampanga',
    tags: ['Breakfast', 'Cured Pork', 'Sweet', 'Silog'],
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=300&fit=crop',
    description: 'Sweet cured pork slices, fried until caramelized. The P in Pampanga\'s famous "Tocilog" breakfast.',
    ingredients: [
      { productId: 'pork-belly', name: 'Pork belly (thinly sliced)', amount: '1', unit: 'kg' },
      { productId: 'sugar', name: 'White sugar', amount: '1', unit: 'cup' },
      { productId: 'salt', name: 'Salt', amount: '2', unit: 'tbsp' },
      { productId: 'garlic', name: 'Garlic', amount: '6', unit: 'cloves' },
      { productId: 'pineapple-juice', name: 'Pineapple juice', amount: '1/2', unit: 'cup' },
      { productId: 'red-food-color', name: 'Red food coloring', amount: '1', unit: 'tsp' },
      { productId: 'salting-salt', name: 'Salting salt (pang-asin)', amount: '1', unit: 'tbsp' }
    ]
  },

  // Bicol
  {
    id: 'laing',
    name: 'Laing (Taro Leaves in Coconut Milk)',
    origin: 'Bicol Region',
    tags: ['Vegetable', 'Coconut Milk', 'Spicy', 'Taro Leaves'],
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=300&fit=crop',
    description: 'Dried taro leaves simmered in coconut milk with chili and pork. Creamy, spicy, and distinctly Bicolano.',
    ingredients: [
      { productId: 'dried-gabi', name: 'Dried taro leaves (gabi)', amount: '100', unit: 'g' },
      { productId: 'pork-belly', name: 'Pork belly', amount: '200', unit: 'g' },
      { productId: 'coconut-milk', name: 'Coconut milk (kakang gata)', amount: '3', unit: 'cups' },
      { productId: 'shrimp-paste', name: 'Shrimp paste (bagoong alamang)', amount: '2', unit: 'tbsp' },
      { productId: 'green-chili', name: 'Green chili (siling haba)', amount: '6', unit: 'pcs' },
      { productId: 'red-chili', name: 'Red chili (siling labuyo)', amount: '5', unit: 'pcs' },
      { productId: 'garlic', name: 'Garlic', amount: '5', unit: 'cloves' },
      { productId: 'onion', name: 'Onion', amount: '1', unit: 'large' },
      { productId: 'ginger', name: 'Ginger', amount: '1', unit: 'inch' }
    ]
  },

  // Breakfast / Comfort Food
  {
    id: 'arroz-caldo',
    name: 'Arroz Caldo',
    origin: 'Chinese-Filipino',
    tags: ['Rice Porridge', 'Chicken', 'Ginger', 'Breakfast', 'Comfort Food'],
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&h=300&fit=crop',
    description: 'Filipino chicken rice porridge with ginger, garlic, and topped with fried garlic, green onions, and boiled egg. Ultimate comfort food.',
    ingredients: [
      { productId: 'rice', name: 'White rice (glutinous/regular mix)', amount: '1', unit: 'cup' },
      { productId: 'chicken', name: 'Chicken thighs (bone-in)', amount: '500', unit: 'g' },
      { productId: 'ginger', name: 'Ginger', amount: '2', unit: 'inches' },
      { productId: 'garlic', name: 'Garlic', amount: '6', unit: 'cloves' },
      { productId: 'onion', name: 'Onion', amount: '1', unit: 'large' },
      { productId: 'fish-sauce', name: 'Fish sauce (patis)', amount: '3', unit: 'tbsp' },
      { productId: 'black-pepper', name: 'Black pepper', amount: '1', unit: 'tsp' },
      { productId: 'green-onions', name: 'Green onions', amount: '1/4', unit: 'cup' },
      { productId: 'fried-garlic', name: 'Fried garlic', amount: '2', unit: 'tbsp' },
      { productId: 'egg', name: 'Boiled egg', amount: '2', unit: 'pcs' },
      { productId: 'calamansi', name: 'Calamansi', amount: '2', unit: 'pcs' }
    ]
  },
  {
    id: 'champorado',
    name: 'Champorado',
    origin: 'Mexican-Filipino',
    tags: ['Chocolate Rice Porridge', 'Breakfast', 'Sweet', 'Tsokolate'],
    image: 'https://images.unsplash.com/photo-1541783245831-57d6fb0926d3?w=400&h=300&fit=crop',
    description: 'Sweet chocolate rice porridge made with tablea (cacao tablets). Best served with tuyo (dried fish) and evaporated milk.',
    ingredients: [
      { productId: 'rice', name: 'Glutinous rice (malagkit)', amount: '1', unit: 'cup' },
      { productId: 'tablea', name: 'Cacao tablea', amount: '4', unit: 'pcs' },
      { productId: 'sugar', name: 'Brown sugar', amount: '1/2', unit: 'cup' },
      { productId: 'water', name: 'Water', amount: '4', unit: 'cups' },
      { productId: 'evaporated-milk', name: 'Evaporated milk', amount: '1/2', unit: 'cup' },
      { productId: 'tuyo', name: 'Dried fish (tuyo)', amount: '4', unit: 'pcs' }
    ]
  },
  {
    id: 'torta',
    name: 'Torta (Filipino Omelette)',
    origin: 'Visayas/Tagalog',
    tags: ['Egg', 'Breakfast', 'Ground Meat', 'Quick Meal'],
    image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400&h=300&fit=crop',
    description: 'Filipino-style omelette with ground meat, potatoes, and vegetables. Hearty breakfast or quick dinner.',
    ingredients: [
      { productId: 'egg', name: 'Egg', amount: '4', unit: 'pcs' },
      { productId: 'ground-pork', name: 'Ground pork', amount: '200', unit: 'g' },
      { productId: 'potatoes', name: 'Potatoes (diced)', amount: '1', unit: 'pcs' },
      { productId: 'onion', name: 'Onion', amount: '1', unit: 'large' },
      { productId: 'garlic', name: 'Garlic', amount: '3', unit: 'cloves' },
      { productId: 'tomatoes', name: 'Tomatoes', amount: '1', unit: 'pcs' },
      { productId: 'soy-sauce', name: 'Soy sauce', amount: '1', unit: 'tbsp' },
      { productId: 'fish-sauce', name: 'Fish sauce (patis)', amount: '1', unit: 'tbsp' }
    ]
  }
];

export const recipeIngredientMap = {
  // Meat & Poultry
  'chicken': 'Chicken thighs',
  'pork-ribs': 'Pork ribs',
  'pork-belly': 'Pork belly',
  'oxtail': 'Oxtail',
  'ground-pork': 'Ground pork',
  'chicken-breast': 'Chicken breast',
  'chicken-legs': 'Chicken leg quarters',
  'chicken-native': 'Chicken (native/whole cut)',
  'pig-face': 'Pig face/ears (maskara)',
  'chicken-liver': 'Chicken liver',
  'shrimp': 'Shrimp',
  'tuna': 'Fresh tuna (sashimi grade)',
  'pork-pinakbet': 'Pork (for pinakbet)',
  'beef-shank': 'Beef shank',
  'pork-liver': 'Pork liver',
  'pork-heart': 'Pork heart',
  'pork-kidney': 'Pork kidney',
  'pork-fat': 'Pork fat (for larding)',
  'grilled-fish': 'Grilled fish (tilapia/bangus)',
  'frog-legs': 'Frog legs',
  'mole-crickets': 'Mole crickets (camaru)',

  // Seafood
  'shrimp': 'Shrimp',
  'tuna': 'Fresh tuna (sashimi grade)',

  // Sauces & Condiments
  'soy-sauce': 'Soy sauce',
  'cane-vinegar': 'Cane vinegar',
  'vinegar': 'Cane vinegar',
  'coconut-vinegar': 'Coconut vinegar',
  'fish-sauce': 'Fish sauce (patis)',
  'oyster-sauce': 'Oyster sauce',
  'shrimp-paste': 'Shrimp paste (bagoong alamang)',
  'bagoong': 'Bagoong (shrimp paste)',
  'mayonnaise': 'Mayonnaise',
  'vinegar-dipping': 'Vinegar (for dipping)',
  'tomato-sauce': 'Tomato sauce',
  'liver-spread': 'Liver spread',
  'palapa': 'Palapa (Maranao condiment)',

  // Dry Goods
  'tamarind': 'Tamarind mix/sampalok',
  'peanut-butter': 'Peanut butter',
  'ground-rice': 'Toasted ground rice',
  'annatto-powder': 'Annatto powder',
  'annatto': 'Annatto oil',
  'pancit-noodles': 'Pancit Canton noodles',
  'miki-noodles': 'Fresh miki noodles',
  'molo-wrapper': 'Molo/wonton wrappers',
  'lumpia-wrapper': 'Lumpia wrappers',
  'brown-sugar': 'Brown sugar',
  'coconut-sugar': 'Coconut sugar',
  'sugar': 'White sugar',
  'salt': 'Salt',
  'salting-salt': 'Salting salt (pang-asin)',
  'black-pepper': 'Black pepper',
  'peppercorns': 'Whole peppercorns',
  'raisins': 'Raisins',
  'olives': 'Green olives',
  'flour': 'All-purpose flour',
  'tablea': 'Cacao tablea',

  // Coconut Products
  'coconut-milk': 'Coconut milk (kakang gata)',
  'coconut-milk-regular': 'Coconut milk (regular)',
  'coconut-water': 'Fresh coconut water',
  'coconut-meat': 'Young coconut meat',
  'grated-coconut': 'Grated coconut (toasted)',
  'burnt-coconut': 'Burnt coconut meat',
  'coconut-vinegar': 'Coconut vinegar',

  // Vegetables & Herbs
  'garlic': 'Garlic',
  'garlic-cloves': 'Garlic cloves',
  'onion': 'Onion (yellow)',
  'red-onion': 'Onion (red)',
  'onion-large': 'Onion (large)',
  'tomatoes': 'Tomatoes',
  'radish': 'Radish (labanos)',
  'eggplant': 'Eggplant',
  'kangkong': 'Kangkong (water spinach)',
  'string-beans': 'String beans (sitaw)',
  'pechay': 'Pechay (bok choy)',
  'banana-blossom': 'Banana blossom',
  'green-chili': 'Green chili (siling haba)',
  'red-chili': 'Red chili (siling labuyo)',
  'bitter-melon': 'Bitter melon (ampalaya)',
  'okra': 'Okra',
  'squash': 'Squash (kalabasa)',
  'green-papaya': 'Green papaya',
  'chili-leaves': 'Chili leaves (dahon ng sili)',
  'carrots': 'Carrots',
  'snow-peas': 'Snow peas (chicharo)',
  'cabbage': 'Cabbage',
  'cucumber': 'Cucumber',
  'green-onions': 'Green onions',
  'lemongrass': 'Lemongrass',
  'ginger': 'Ginger',
  'bay-leaves': 'Bay leaves',
  'calamansi': 'Calamansi',
  'potatoes': 'Potatoes',
  'red-bell-pepper': 'Red bell pepper',
  'green-bell-pepper': 'Green bell pepper',
  'saluyot': 'Saluyot (jute leaves)',
  'dried-gabi': 'Dried taro leaves (gabi)',
  'turmeric': 'Turmeric powder',
  'galangal': 'Galangal',
  'fried-garlic': 'Fried garlic',
  'banana-leaves': 'Banana leaves',
  'corn': 'Sweet corn',
  'pineapple-juice': 'Pineapple juice',
  'red-food-color': 'Red food coloring',

  // Eggs & Dairy
  'egg': 'Egg',
  'cheese': 'Cheddar cheese',
  'evaporated-milk': 'Evaporated milk',

  // Snacks & Others
  'chicharon': 'Chicharon',
  'tuyo': 'Dried fish (tuyo)',

  // Rice & Grains
  'rice': 'White rice',
  'glutinous-rice': 'Glutinous rice (malagkit)',
  // Water (free - tap water)
  'water': 'Water (tap)',

  // Broths
  'chicken-broth': 'Chicken broth',

  // Legacy mappings for existing hardcoded products in index.html
  'heirloom-tomatoes': 'Heirloom tomatoes',
  'baby-spinach': 'Baby spinach',
  'free-range-eggs': 'Free-range eggs',
  'wildflower-honey': 'Wildflower honey',
  'delicata-squash': 'Delicata squash',
  'grass-fed-beef': 'Grass-fed ground beef',
  'oat-milk': 'Oat milk',
  'whole-wheat-bread': 'Whole wheat bread',
  'poblano-peppers': 'Poblano peppers',
  'butternut-squash': 'Butternut squash',
  'fresh-basil': 'Fresh basil',
  'cilantro': 'Cilantro'
};

// Unit conversion helpers
const UNIT_CONVERSIONS = {
  // Weight: convert to kg (product base unit for most solids)
  'g': { to: 'kg', factor: 0.001 },
  'kg': { to: 'kg', factor: 1 },
  // Volume: convert to L (product base unit for most liquids)
  'ml': { to: 'L', factor: 0.001 },
  'l': { to: 'L', factor: 1 },
  'L': { to: 'L', factor: 1 },
  'cup': { to: 'L', factor: 0.25 },      // 1 cup = 250ml
  'cups': { to: 'L', factor: 0.25 },
  'tbsp': { to: 'L', factor: 0.015 },    // 1 tbsp = 15ml
  'tablespoon': { to: 'L', factor: 0.015 },
  'tsp': { to: 'L', factor: 0.005 },     // 1 tsp = 5ml
  'teaspoon': { to: 'L', factor: 0.005 },
  // Count-based: estimate weight per piece (rough averages for Filipino ingredients)
  'clove': { to: 'kg', factor: 0.003 },      // 1 garlic clove ≈ 3g
  'cloves': { to: 'kg', factor: 0.003 },
  'pcs': { to: 'kg', factor: 0.15 },         // generic piece ≈ 150g (onion, tomato, etc.)
  'pc': { to: 'kg', factor: 0.15 },
  'piece': { to: 'kg', factor: 0.15 },
  'pieces': { to: 'kg', factor: 0.15 },
  'bunch': { to: 'kg', factor: 0.2 },        // leafy greens bunch ≈ 200g
  'stalks': { to: 'kg', factor: 0.05 },      // lemongrass stalk ≈ 50g
  'inch': { to: 'kg', factor: 0.01 },        // ginger inch ≈ 10g
  'inches': { to: 'kg', factor: 0.01 },
  // Pack/jar/bottle/can - these are per-package units, need product-specific conversions
  // Handled via PRODUCT_PACKAGE_CONVERSIONS below
  'pack': { to: 'pack', factor: 1 },
  'packs': { to: 'pack', factor: 1 },
  'jar': { to: 'jar', factor: 1 },
  'jars': { to: 'jar', factor: 1 },
  'bottle': { to: 'bottle', factor: 1 },
  'bottles': { to: 'bottle', factor: 1 },
  'can': { to: 'can', factor: 1 },
  'cans': { to: 'can', factor: 1 },
};

// Product-specific package conversions: how much base unit (kg, L, or pcs) is in one package
// This allows converting from recipe units (cups, tbsp, pcs) to product price units (pack, jar, bottle, can)
const PRODUCT_PACKAGE_CONVERSIONS = {
  // Format: 'Product Name': { packageUnit: 'pack', baseUnit: 'kg|L|pcs', factor: X }
  // Where factor = amount of baseUnit in one packageUnit

  // Dry goods - packs
  'Tamarind mix/sampalok': { packageUnit: 'pack', baseUnit: 'g', factor: 40 },        // 40g per pack
  'Toasted ground rice': { packageUnit: 'pack', baseUnit: 'g', factor: 50 },          // 50g per pack
  'Annatto powder': { packageUnit: 'pack', baseUnit: 'g', factor: 10 },               // 10g per pack
  'Pancit Canton noodles': { packageUnit: 'pack', baseUnit: 'g', factor: 500 },       // 500g per pack
  'Lumpia wrappers': { packageUnit: 'pack', baseUnit: 'pcs', factor: 30 },            // 30 pieces per pack
  'Brown sugar': { packageUnit: 'kg', baseUnit: 'kg', factor: 1 },                    // sold by kg
  'Salt': { packageUnit: 'kg', baseUnit: 'kg', factor: 1 },                           // sold by kg

  // Jars
  'Peanut butter': { packageUnit: 'jar', baseUnit: 'g', factor: 340 },                // 340g per jar
  'Shrimp paste (bagoong alamang)': { packageUnit: 'jar', baseUnit: 'g', factor: 250 }, // 250g per jar
  'Bagoong (shrimp paste)': { packageUnit: 'jar', baseUnit: 'g', factor: 250 },       // 250g per jar
  'Mayonnaise': { packageUnit: 'jar', baseUnit: 'g', factor: 470 },                   // 470g per jar
  'Black pepper': { packageUnit: 'jar', baseUnit: 'g', factor: 50 },                  // 50g per jar
  'Whole peppercorns': { packageUnit: 'jar', baseUnit: 'g', factor: 50 },             // 50g per jar

  // Bottles (liquids - convert to L)
  'Soy sauce': { packageUnit: 'bottle', baseUnit: 'L', factor: 1 },                   // 1L per bottle
  'Cane vinegar': { packageUnit: 'bottle', baseUnit: 'L', factor: 1 },                // 1L per bottle
  'Coconut vinegar': { packageUnit: 'bottle', baseUnit: 'L', factor: 1 },             // 1L per bottle
  'Fish sauce (patis)': { packageUnit: 'bottle', baseUnit: 'L', factor: 1 },          // 1L per bottle
  'Oyster sauce': { packageUnit: 'bottle', baseUnit: 'L', factor: 0.35 },             // 350ml per bottle
  'Vinegar (for dipping)': { packageUnit: 'bottle', baseUnit: 'L', factor: 1 },       // 1L per bottle
  'Annatto oil': { packageUnit: 'bottle', baseUnit: 'L', factor: 0.1 },               // 100ml per bottle

  // Cans
  'Coconut milk (kakang gata)': { packageUnit: 'can', baseUnit: 'L', factor: 0.4 },   // 400ml per can
  'Coconut milk (regular)': { packageUnit: 'can', baseUnit: 'L', factor: 0.4 },       // 400ml per can

  // Pack items (count-based)
  'Bay leaves': { packageUnit: 'pack', baseUnit: 'pcs', factor: 50 },                 // ~50 leaves per pack

  // New products - packs
  'Molo/wonton wrappers': { packageUnit: 'pack', baseUnit: 'pcs', factor: 40 },       // 40 pieces per pack
  'Lumpia wrappers': { packageUnit: 'pack', baseUnit: 'pcs', factor: 30 },            // 30 pieces per pack
  'Fresh miki noodles': { packageUnit: 'pack', baseUnit: 'g', factor: 500 },          // 500g per pack
  'Pancit Canton noodles': { packageUnit: 'pack', baseUnit: 'g', factor: 500 },       // 500g per pack
  'Chicharon': { packageUnit: 'pack', baseUnit: 'g', factor: 100 },                   // 100g per pack
  'Dried taro leaves (gabi)': { packageUnit: 'pack', baseUnit: 'g', factor: 50 },     // 50g per pack
  'Cacao tablea': { packageUnit: 'pack', baseUnit: 'pcs', factor: 12 },               // 12 tablets per pack
  'Green olives': { packageUnit: 'jar', baseUnit: 'g', factor: 150 },                 // 150g per jar
  'Raisins': { packageUnit: 'pack', baseUnit: 'g', factor: 100 },                     // 100g per pack
  'Banana leaves': { packageUnit: 'pack', baseUnit: 'pcs', factor: 10 },              // 10 leaves per pack
  'All-purpose flour': { packageUnit: 'pack', baseUnit: 'kg', factor: 1 },            // 1kg per pack
  'White sugar': { packageUnit: 'kg', baseUnit: 'kg', factor: 1 },                    // sold by kg
  'Coconut sugar': { packageUnit: 'pack', baseUnit: 'g', factor: 250 },               // 250g per pack
  'Brown sugar': { packageUnit: 'kg', baseUnit: 'kg', factor: 1 },                    // sold by kg
  'Salting salt (pang-asin)': { packageUnit: 'pack', baseUnit: 'kg', factor: 1 },     // 1kg per pack
  'Turmeric powder': { packageUnit: 'pack', baseUnit: 'g', factor: 50 },              // 50g per pack
  'Red food coloring': { packageUnit: 'bottle', baseUnit: 'ml', factor: 30 },         // 30ml per bottle
  'Pineapple juice': { packageUnit: 'bottle', baseUnit: 'L', factor: 1 },             // 1L per bottle
  'White rice': { packageUnit: 'kg', baseUnit: 'kg', factor: 1 },                     // sold by kg
  'Glutinous rice (malagkit)': { packageUnit: 'kg', baseUnit: 'kg', factor: 1 },      // sold by kg

  // Jars
  'Liver spread': { packageUnit: 'jar', baseUnit: 'g', factor: 85 },                  // 85g per jar
  'Cheddar cheese': { packageUnit: 'pack', baseUnit: 'g', factor: 170 },              // 170g per pack
  'Evaporated milk': { packageUnit: 'can', baseUnit: 'L', factor: 0.38 },             // 380ml per can
  'Tomato sauce': { packageUnit: 'pack', baseUnit: 'g', factor: 250 },                // 250g per pack
  'Palapa (Maranao condiment)': { packageUnit: 'jar', baseUnit: 'g', factor: 100 },   // 100g per jar

  // Cans
  'Coconut milk (kakang gata)': { packageUnit: 'can', baseUnit: 'L', factor: 0.4 },   // 400ml per can
  'Coconut milk (regular)': { packageUnit: 'can', baseUnit: 'L', factor: 0.4 },       // 400ml per can

  // Pack items (count-based)
  'Bay leaves': { packageUnit: 'pack', baseUnit: 'pcs', factor: 50 },                 // ~50 leaves per pack
  'Mole crickets (camaru)': { packageUnit: 'pack', baseUnit: 'g', factor: 100 },      // 100g per pack
  'Young coconut meat': { packageUnit: 'pack', baseUnit: 'g', factor: 300 },          // ~300g per pack (meat from 1 coconut)
  'Grated coconut (toasted)': { packageUnit: 'pack', baseUnit: 'g', factor: 100 },    // 100g per pack
  'Burnt coconut meat': { packageUnit: 'pack', baseUnit: 'g', factor: 200 },          // 200g per pack
  'Fried garlic': { packageUnit: 'jar', baseUnit: 'g', factor: 100 },                 // 100g per jar
  'Dried fish (tuyo)': { packageUnit: 'pack', baseUnit: 'pcs', factor: 12 },          // 12 pieces per pack
};

// Density conversions (g per ml) for volume-to-weight conversions
// Used when recipe uses volume (cup, tbsp, tsp) but product is sold by weight (g, kg)
const PRODUCT_DENSITY = {
  'Peanut butter': 1.1,        // ~1.1 g/ml
  'Shrimp paste (bagoong alamang)': 1.2,  // ~1.2 g/ml
  'Bagoong (shrimp paste)': 1.2,
  'Mayonnaise': 0.95,
  'Black pepper': 0.5,         // peppercorns are light
  'Whole peppercorns': 0.5,
  'Oyster sauce': 1.2,
  'Annatto oil': 0.92,
  'Annatto powder': 0.5,
  'Toasted ground rice': 0.8,
  'Brown sugar': 0.85,
  'Salt': 1.2,
  'Coconut sugar': 0.85,
  'White sugar': 0.85,
  'Flour': 0.55,
  'Tomato sauce': 1.15,
  'Liver spread': 1.0,
  'Cheddar cheese': 1.1,
  'Evaporated milk': 1.05,
  'Coconut milk (kakang gata)': 1.0,
  'Coconut milk (regular)': 1.0,
  'Coconut vinegar': 1.0,
  'Fish sauce (patis)': 1.2,
  'Soy sauce': 1.2,
  'Oyster sauce': 1.2,
  'Vinegar (for dipping)': 1.0,
  'Cane vinegar': 1.0,
  'Pineapple juice': 1.05,
  'Palapa (Maranao condiment)': 1.1,
  // New products for volume-to-weight conversions
  'Young coconut meat': 0.9,        // young coconut meat ~0.9 g/ml
  'Grated coconut (toasted)': 0.5,  // toasted grated coconut is light
  'Burnt coconut meat': 0.6,        // burnt coconut denser
  'Fried garlic': 0.4,              // fried garlic very light
  'Dried fish (tuyo)': 0.8,         // dried fish
};

function normalizeUnit(unit) {
  if (!unit) return 'kg';
  const u = unit.toLowerCase().trim();
  // Handle plurals and variations
  return u;
}

function convertAmount(amount, fromUnit, toUnit, productName = null) {
  const fromNorm = normalizeUnit(fromUnit);
  const toNorm = normalizeUnit(toUnit);

  // Same unit - no conversion
  if (fromNorm === toNorm) return amount;

  // Check if we have a product-specific package conversion
  if (productName && PRODUCT_PACKAGE_CONVERSIONS[productName]) {
    const pkgConv = PRODUCT_PACKAGE_CONVERSIONS[productName];
    const pkgUnit = pkgConv.packageUnit;
    const baseUnit = pkgConv.baseUnit;
    const pkgFactor = pkgConv.factor;

    // If recipe uses baseUnit (kg, L, g, pcs) and product uses packageUnit (pack, jar, bottle, can)
    // Convert recipe amount to baseUnit, then to packageUnit
    const fromConv = UNIT_CONVERSIONS[fromNorm];
    const toConv = UNIT_CONVERSIONS[toNorm];

    // Case 1: fromUnit converts to baseUnit (kg, L, g, pcs), toUnit is packageUnit
    if (fromConv && fromConv.to === baseUnit && toNorm === pkgUnit) {
      const baseAmount = amount * fromConv.factor;
      return baseAmount / pkgFactor;
    }

    // Case 1b: fromUnit is volume (converts to L), baseUnit is weight (g/kg) - use density
    if (fromConv && fromConv.to === 'L' && (baseUnit === 'g' || baseUnit === 'kg') && toNorm === pkgUnit) {
      const density = PRODUCT_DENSITY[productName];
      if (density) {
        const volumeL = amount * fromConv.factor;  // Convert to liters
        const weightG = volumeL * 1000 * density;  // Convert to grams using density
        const baseAmount = baseUnit === 'g' ? weightG : weightG / 1000;  // Convert to baseUnit
        return baseAmount / pkgFactor;
      }
    }

    // Case 2: fromUnit is packageUnit, toUnit converts to baseUnit
    if (fromNorm === pkgUnit && toConv && toConv.to === baseUnit) {
      const baseAmount = amount * pkgFactor;
      return baseAmount / toConv.factor;
    }

    // Case 2b: fromUnit is packageUnit, toUnit is volume, baseUnit is weight - use density
    if (fromNorm === pkgUnit && toConv && toConv.to === 'L' && (baseUnit === 'g' || baseUnit === 'kg')) {
      const density = PRODUCT_DENSITY[productName];
      if (density) {
        const baseAmount = amount * pkgFactor;  // Amount in baseUnit (g or kg)
        const weightG = baseUnit === 'g' ? baseAmount : baseAmount * 1000;
        const volumeL = weightG / (1000 * density);  // Convert to liters
        return volumeL / toConv.factor;
      }
    }

    // Case 3: both are package units (shouldn't happen normally, but handle it)
    if (fromNorm === pkgUnit && toNorm === pkgUnit) {
      return amount;
    }
  }

  // Check if we have a conversion for fromUnit (standard conversions)
  const fromConv = UNIT_CONVERSIONS[fromNorm];
  const toConv = UNIT_CONVERSIONS[toNorm];

  if (fromConv && toConv && fromConv.to === toConv.to) {
    // Both convert to same base unit (e.g., both to kg or both to L)
    const baseAmount = amount * fromConv.factor;
    return baseAmount / toConv.factor;
  }

  // No conversion available - return original (will be inaccurate but won't crash)
  console.warn(`[calculateRecipeCost] No conversion from "${fromUnit}" to "${toUnit}" for product "${productName}", using raw amount`);
  return amount;
}

export function calculateRecipeCost(recipe, priceMap = {}, productMap = {}) {
  let totalUsd = 0;
  let ingredientDetails = [];

  recipe.ingredients.forEach(ing => {
    const productName = recipeIngredientMap[ing.productId];
    if (productName && priceMap[productName] !== undefined) {
      const price = priceMap[productName];
      // Get full product data to know its unit
      const productData = productMap[productName];

      let amount = ing.amount;
      if (amount.includes('/')) {
        const parts = amount.split('/');
        amount = parseFloat(parts[0]) / parseFloat(parts[1]);
      } else {
        amount = parseFloat(amount);
      }

      // Convert recipe amount to product's pricing unit
      const recipeUnit = ing.unit || '';
      const productUnit = productData?.unit || '';
      const convertedAmount = convertAmount(amount, recipeUnit, productUnit, productName);

      const itemCost = price * convertedAmount;
      totalUsd += itemCost;
      ingredientDetails.push({
        name: ing.name,
        amount: ing.amount,
        unit: ing.unit,
        productUnit: productUnit,
        convertedAmount: Number(convertedAmount.toFixed(4)),
        unitPrice: price,
        totalPrice: itemCost
      });
    }
  });

  const totalPhp = totalUsd * USD_TO_PHP_RATE;
  return { usd: totalUsd, php: totalPhp, details: ingredientDetails };
}

export function formatPrice(usd, php) {
  const currency = typeof getCurrency === 'function' ? getCurrency() : 'PHP';
  return currency === 'PHP' ? '₱' + php.toFixed(2) : '$' + usd.toFixed(2);
}

export function renderRecipes(searchQuery = '') {
  const recipesGrid = document.getElementById('recipesGrid');
  if (!recipesGrid) return;
  recipesGrid.innerHTML = '';

  // Build priceMap and productMap from Supabase products (window.culineProducts) if available,
  // otherwise fall back to DOM produce cards
  const priceMap = {};
  const productMap = {};
  if (window.culineProducts && Array.isArray(window.culineProducts)) {
    window.culineProducts.forEach(p => {
      if (p.name && p.price !== undefined) {
        priceMap[p.name] = Number(p.price);
        productMap[p.name] = p;
      }
    });
  } else {
    document.querySelectorAll('.produce-card').forEach(card => {
      const nameEl = card.querySelector('h3');
      const price = Number(card.dataset.price);
      if (nameEl && !isNaN(price)) {
        const name = nameEl.textContent.trim();
        priceMap[name] = price;
        productMap[name] = {
          unit: card.dataset.unit || '',
          price: price
        };
      }
    });
  }

  // Filter recipes by search query (case-insensitive)
  const query = searchQuery.toLowerCase().trim();
  const filteredRecipes = recipes.filter(recipe => {
    if (!query) return true;
    const searchableText = [
      recipe.name,
      recipe.origin,
      recipe.description,
      ...recipe.tags
    ].join(' ').toLowerCase();
    return searchableText.includes(query);
  });

  filteredRecipes.forEach(recipe => {
    const card = document.createElement('article');
    card.className = 'recipe-card';
    card.dataset.recipeId = recipe.id;

    const tagsHtml = recipe.tags.map(tag => '<span class=\"recipe-tag\">' + tag + '</span>').join('');

    card.innerHTML =
      '<img class=\"recipe-image\" src=\"' + recipe.image + '\" alt=\"' + recipe.name + '\" loading=\"lazy\">' +
      '<div class=\"recipe-card-body\">' +
        '<h3>' + recipe.name + '</h3>' +
        '<p class=\"recipe-origin\">' + recipe.origin + '</p>' +
        '<div class=\"recipe-tags\">' + tagsHtml + '</div>' +
        '<p class=\"recipe-preview\">' + recipe.description + '</p>' +
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

  // Build priceMap and productMap from Supabase products (window.culineProducts) if available,
  // otherwise fall back to DOM produce cards
  const priceMap = {};
  const productMap = {};
  if (window.culineProducts && Array.isArray(window.culineProducts)) {
    window.culineProducts.forEach(p => {
      if (p.name && p.price !== undefined) {
        priceMap[p.name] = Number(p.price);
        productMap[p.name] = p;
      }
    });
  } else {
    document.querySelectorAll('.produce-card').forEach(card => {
      const nameEl = card.querySelector('h3');
      const price = Number(card.dataset.price);
      if (nameEl && !isNaN(price)) {
        const name = nameEl.textContent.trim();
        priceMap[name] = price;
        productMap[name] = {
          unit: card.dataset.unit || '',
          price: price
        };
      }
    });
  }

  const cost = calculateRecipeCost(recipe, priceMap, productMap);
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
      const productName = btn.dataset.productId;
      const ingredientName = btn.dataset.ingredientName;
      if (productName && window.addProductToCart) {
        // Find product from Supabase data (window.culineProducts) instead of DOM
        const productData = (window.culineProducts || []).find(p => p.name === productName);
        if (productData) {
          const product = {
            id: productData.id,
            name: productData.name,
            vendor: productData.vendor || '',
            price: Number(productData.price),
            unit: productData.unit || '',
            stock: productData.stock_quantity !== undefined ? Number(productData.stock_quantity) : null,
            availability: productData.availability || 'available'
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
    const productName = recipeIngredientMap[ing.productId];
    if (productName && window.addProductToCart) {
      // Find product from Supabase data
      const productData = (window.culineProducts || []).find(p => p.name === productName);
      if (productData) {
        const product = {
          id: productData.id,
          name: productData.name,
          vendor: productData.vendor || '',
          price: Number(productData.price),
          unit: productData.unit || '',
          stock: productData.stock_quantity !== undefined ? Number(productData.stock_quantity) : null,
          availability: productData.availability || 'available'
        };
        if (window.addProductToCart(product)) addedCount++;
      }
    }
  });
  if (addedCount > 0) {
    showToast(addedCount + ' ingredients added to cart');
  }
});


