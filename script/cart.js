$cart = Get-Content "$root\script\cart.js" -Raw
$cart = $cart -replace '^const CART_KEY', "export const USD_TO_PHP_RATE = 63.76;\nexport function getCurrency() { return localStorage.getItem('culine_currency') || 'USD'; }\nexport function formatCurrency(amount) { const c=getCurrency(); const s=c==='PHP'?'P':'$'; let a=amount; if(c==='PHP') a*=USD_TO_PHP_RATE; return s+a.toFixed(2); }\n\nconst CART_KEY"
$cart | Set-Content "$root\script\cart.js" -Encoding UTF8

function getCurrency() {
  return localStorage.getItem(CURRENCY_KEY) || 'USD';
}

function formatCurrency(amount) {
  const currency = getCurrency();
  const symbol = currency === 'PHP' ? 'P ' : '$';
  let displayAmount = amount;
  if (currency === 'PHP') {
    displayAmount = amount * USD_TO_PHP_RATE;
  }
  return symbol + displayAmount.toFixed(2);
}

// Toast notification system
function showToast(message, type = "success") {
  // Remove any existing toast
  const existing = document.querySelector(".cart-toast");
  if (existing) existing.remove();

  const toast = document.createElement("div");
  toast.className = "cart-toast " + type;
  toast.textContent = message;
  toast.style.cssText = `
    position: fixed;
    bottom: 2rem;
    left: 50%;
    transform: translateX(-50%);
    padding: 0.875rem 1.5rem;
    border-radius: 8px;
    background: var(--green-deep);
    color: #fff;
    font-family: var(--font-body);
    font-size: 0.9rem;
    font-weight: 500;
    box-shadow: 0 10px 30px rgba(35, 32, 24, 0.25);
    z-index: 1000;
    opacity: 0;
    transition: opacity 0.2s ease, transform 0.2s ease;
    pointer-events: none;
  `;
  if (type === "error") {
    toast.style.background = "var(--tomato)";
  }

  document.body.appendChild(toast);
  
  // Trigger animation
  requestAnimationFrame(() => {
    toast.style.opacity = "1";
    toast.style.transform = "translateX(-50%) translateY(0)";
  });

  // Remove after 2 seconds
  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateX(-50%) translateY(1rem)";
    setTimeout(() => toast.remove(), 200);
  }, 2000);
}

const dialog = document.getElementById('cartDialog');
const grid = document.querySelector('.produce-grid');
const countLabel = document.getElementById('cartItemCount');
const subtotalLabel = document.getElementById('cartSubtotal');
const dialogSubtotal = document.getElementById('cartDialogSubtotal');
const rows = document.getElementById('cartItems');
let cart = [];
try {
  const saved = JSON.parse(localStorage.getItem(CART_KEY) || '[]');
  if (Array.isArray(saved)) cart = saved;
} catch {}

function idFor(card) {
  return card.dataset.productId || card.querySelector('h3').textContent.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-');
}

function persist() {
  try { localStorage.setItem(CART_KEY, JSON.stringify(cart)); } catch {}
  render();
}

function addProductToCart(product) {
  if (product.availability === 'unavailable' || Number(product.stock_quantity ?? product.stock) <= 0) return false;
  const id = String(product.id);
  const existing = cart.find(entry => entry.id === id);
  const stock = Number(product.stock_quantity ?? product.stock);
  const values = {
    name: product.name,
    vendor: product.vendor || '',
    price: Number(product.price),
    unit: product.unit || '',
    stock: Number.isFinite(stock) ? stock : null,
    availability: product.availability || 'available'
  };
  if (existing) {
    if (Number.isFinite(stock) && existing.quantity >= stock) return false;
    existing.quantity++;
    Object.assign(existing, values);
  } else {
    cart.push({ id, ...values, quantity: 1 });
  }
  persist();
  return true;
}

window.addProductToCart = addProductToCart;

function render() {
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  countLabel.textContent = count;
  subtotalLabel.textContent = "$" + subtotal.toFixed(2) + " subtotal | View cart";
  dialogSubtotal.textContent = "$" + subtotal.toFixed(2);
  rows.replaceChildren();

  if (!cart.length) {
    const empty = document.createElement('p');
    empty.className = 'cart-empty';
    empty.textContent = 'Your cart is empty. Add produce from the market to see it here.';
    rows.appendChild(empty);
  }

  cart.forEach(item => {
    const row = document.createElement('article');
    row.className = 'cart-item';
    const info = document.createElement('div');
    info.className = 'cart-item-details';
    const name = document.createElement('h3');
    name.textContent = item.name;
    const vendor = document.createElement('p');
    vendor.textContent = item.vendor || 'Local market';
    const price = document.createElement('p');
    price.className = 'cart-item-price';
    const unitPrice = "$" + item.price.toFixed(2);
    const totalPrice = "$" + (item.price * item.quantity).toFixed(2);
    price.textContent = unitPrice + ' / ' + item.unit + ' | ' + totalPrice;
    info.append(name, vendor, price);

    const controls = document.createElement('div');
    controls.className = 'cart-item-controls';
    [['decrease', '\u2212'], ['increase', '+'], ['remove', 'Remove']].forEach(([action, label]) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.textContent = label;
      button.dataset.cartAction = action;
      button.dataset.cartId = item.id;
      button.setAttribute('aria-label', action === 'remove' ? 'Remove ' + item.name : action + ' ' + item.name);
      if (action === 'remove') button.className = 'cart-remove-btn';
      if (action === 'increase' && (item.availability === 'unavailable' || (Number.isFinite(item.stock) && item.quantity >= item.stock))) button.disabled = true;
      controls.appendChild(button);
      if (action === 'decrease') {
        const qty = document.createElement('span');
        qty.textContent = item.quantity;
        controls.appendChild(qty);
      }
    });
    row.append(info, controls);
    rows.appendChild(row);
  });

  if (grid) {
    grid.querySelectorAll('.produce-card').forEach(card => {
      const button = card.querySelector('.add-btn');
      const item = cart.find(entry => entry.id === idFor(card));
      const unavailable = card.dataset.availability === 'unavailable';
      const stock = card.dataset.stock === undefined ? null : Number(card.dataset.stock);
      const out = stock !== null && stock <= 0;
      const limit = stock !== null && item && item.quantity >= stock;
      button.disabled = unavailable || out || Boolean(limit);
      button.textContent = unavailable ? 'Unavailable' : out ? 'Out of stock' : limit ? 'In cart' : 'Add';
    });
  }
}

document.addEventListener('click', event => {
  if (event.target.closest('#cartTrigger')) {
    dialog.showModal();
    return;
  }
  if (event.target.closest('#cartClose')) {
    dialog.close();
    return;
  }
  const add = event.target.closest('.add-btn');
  if (add && !add.disabled) {
    const card = add.closest('.produce-card');
    const priceText = card.querySelector('.produce-price').textContent;
    const itemId = idFor(card);
    const price = Number(priceText.replace(/[^\d.]/g, '')) || Number(card.dataset.price) || 0;
    const product = {
      id: itemId,
      name: card.querySelector('h3').textContent.trim(),
      vendor: card.querySelector('.produce-vendor')?.textContent.trim() || '',
      price,
      unit: card.dataset.unit || priceText.split('/').slice(1).join('/').trim(),
      stock: card.dataset.stock === undefined ? null : Number(card.dataset.stock),
      availability: card.dataset.availability || 'available'
    };
    const added = addProductToCart(product);
    if (added) {
      showToast(product.name + " added to cart");
    }
    return;
  }

  const control = event.target.closest('[data-cart-action]');
  if (!control) return;
  const item = cart.find(entry => entry.id === control.dataset.cartId);
  if (!item) return;
  if (control.dataset.cartAction === 'remove') cart = cart.filter(entry => entry.id !== item.id);
  if (control.dataset.cartAction === 'decrease') {
    item.quantity--;
    if (item.quantity <= 0) cart = cart.filter(entry => entry.id !== item.id);
  }
  if (control.dataset.cartAction === 'increase' &&
      item.availability !== 'unavailable' &&
      (!Number.isFinite(item.stock) || item.quantity < item.stock)) item.quantity++;
  persist();
});

document.getElementById('cartClose').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
// Watch card additions/removals only; descendant text changes from render() would loop.
if (grid) new MutationObserver(render).observe(grid, { childList: true });
render();



; let a=amount; if(c==='PHP') a*=USD_TO_PHP_RATE; return s+a.toFixed(2); }\n\nconst CART_KEY = 'culineShoppingCart';
const CURRENCY_KEY = 'culine_currency';
const USD_TO_PHP_RATE = 63.76;

function getCurrency() {
  return localStorage.getItem(CURRENCY_KEY) || 'USD';
}

function formatCurrency(amount) {
  const currency = getCurrency();
  const symbol = currency === 'PHP' ? 'P ' : '$';
  let displayAmount = amount;
  if (currency === 'PHP') {
    displayAmount = amount * USD_TO_PHP_RATE;
  }
  return symbol + displayAmount.toFixed(2);
}

// Toast notification system
function showToast(message, type = "success") {
  // Remove any existing toast
  const existing = document.querySelector(".cart-toast");
  if (existing) existing.remove();

  const toast = document.createElement("div");
  toast.className = "cart-toast " + type;
  toast.textContent = message;
  toast.style.cssText = `
    position: fixed;
    bottom: 2rem;
    left: 50%;
    transform: translateX(-50%);
    padding: 0.875rem 1.5rem;
    border-radius: 8px;
    background: var(--green-deep);
    color: #fff;
    font-family: var(--font-body);
    font-size: 0.9rem;
    font-weight: 500;
    box-shadow: 0 10px 30px rgba(35, 32, 24, 0.25);
    z-index: 1000;
    opacity: 0;
    transition: opacity 0.2s ease, transform 0.2s ease;
    pointer-events: none;
  `;
  if (type === "error") {
    toast.style.background = "var(--tomato)";
  }

  document.body.appendChild(toast);
  
  // Trigger animation
  requestAnimationFrame(() => {
    toast.style.opacity = "1";
    toast.style.transform = "translateX(-50%) translateY(0)";
  });

  // Remove after 2 seconds
  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateX(-50%) translateY(1rem)";
    setTimeout(() => toast.remove(), 200);
  }, 2000);
}

const dialog = document.getElementById('cartDialog');
const grid = document.querySelector('.produce-grid');
const countLabel = document.getElementById('cartItemCount');
const subtotalLabel = document.getElementById('cartSubtotal');
const dialogSubtotal = document.getElementById('cartDialogSubtotal');
const rows = document.getElementById('cartItems');
let cart = [];
try {
  const saved = JSON.parse(localStorage.getItem(CART_KEY) || '[]');
  if (Array.isArray(saved)) cart = saved;
} catch {}

function idFor(card) {
  return card.dataset.productId || card.querySelector('h3').textContent.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-');
}

function persist() {
  try { localStorage.setItem(CART_KEY, JSON.stringify(cart)); } catch {}
  render();
}

function addProductToCart(product) {
  if (product.availability === 'unavailable' || Number(product.stock_quantity ?? product.stock) <= 0) return false;
  const id = String(product.id);
  const existing = cart.find(entry => entry.id === id);
  const stock = Number(product.stock_quantity ?? product.stock);
  const values = {
    name: product.name,
    vendor: product.vendor || '',
    price: Number(product.price),
    unit: product.unit || '',
    stock: Number.isFinite(stock) ? stock : null,
    availability: product.availability || 'available'
  };
  if (existing) {
    if (Number.isFinite(stock) && existing.quantity >= stock) return false;
    existing.quantity++;
    Object.assign(existing, values);
  } else {
    cart.push({ id, ...values, quantity: 1 });
  }
  persist();
  return true;
}

window.addProductToCart = addProductToCart;

function render() {
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  countLabel.textContent = count;
  subtotalLabel.textContent = "$" + subtotal.toFixed(2) + " subtotal | View cart";
  dialogSubtotal.textContent = "$" + subtotal.toFixed(2);
  rows.replaceChildren();

  if (!cart.length) {
    const empty = document.createElement('p');
    empty.className = 'cart-empty';
    empty.textContent = 'Your cart is empty. Add produce from the market to see it here.';
    rows.appendChild(empty);
  }

  cart.forEach(item => {
    const row = document.createElement('article');
    row.className = 'cart-item';
    const info = document.createElement('div');
    info.className = 'cart-item-details';
    const name = document.createElement('h3');
    name.textContent = item.name;
    const vendor = document.createElement('p');
    vendor.textContent = item.vendor || 'Local market';
    const price = document.createElement('p');
    price.className = 'cart-item-price';
    const unitPrice = "$" + item.price.toFixed(2);
    const totalPrice = "$" + (item.price * item.quantity).toFixed(2);
    price.textContent = unitPrice + ' / ' + item.unit + ' | ' + totalPrice;
    info.append(name, vendor, price);

    const controls = document.createElement('div');
    controls.className = 'cart-item-controls';
    [['decrease', '\u2212'], ['increase', '+'], ['remove', 'Remove']].forEach(([action, label]) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.textContent = label;
      button.dataset.cartAction = action;
      button.dataset.cartId = item.id;
      button.setAttribute('aria-label', action === 'remove' ? 'Remove ' + item.name : action + ' ' + item.name);
      if (action === 'remove') button.className = 'cart-remove-btn';
      if (action === 'increase' && (item.availability === 'unavailable' || (Number.isFinite(item.stock) && item.quantity >= item.stock))) button.disabled = true;
      controls.appendChild(button);
      if (action === 'decrease') {
        const qty = document.createElement('span');
        qty.textContent = item.quantity;
        controls.appendChild(qty);
      }
    });
    row.append(info, controls);
    rows.appendChild(row);
  });

  if (grid) {
    grid.querySelectorAll('.produce-card').forEach(card => {
      const button = card.querySelector('.add-btn');
      const item = cart.find(entry => entry.id === idFor(card));
      const unavailable = card.dataset.availability === 'unavailable';
      const stock = card.dataset.stock === undefined ? null : Number(card.dataset.stock);
      const out = stock !== null && stock <= 0;
      const limit = stock !== null && item && item.quantity >= stock;
      button.disabled = unavailable || out || Boolean(limit);
      button.textContent = unavailable ? 'Unavailable' : out ? 'Out of stock' : limit ? 'In cart' : 'Add';
    });
  }
}

document.addEventListener('click', event => {
  if (event.target.closest('#cartTrigger')) {
    dialog.showModal();
    return;
  }
  if (event.target.closest('#cartClose')) {
    dialog.close();
    return;
  }
  const add = event.target.closest('.add-btn');
  if (add && !add.disabled) {
    const card = add.closest('.produce-card');
    const priceText = card.querySelector('.produce-price').textContent;
    const itemId = idFor(card);
    const price = Number(priceText.replace(/[^\d.]/g, '')) || Number(card.dataset.price) || 0;
    const product = {
      id: itemId,
      name: card.querySelector('h3').textContent.trim(),
      vendor: card.querySelector('.produce-vendor')?.textContent.trim() || '',
      price,
      unit: card.dataset.unit || priceText.split('/').slice(1).join('/').trim(),
      stock: card.dataset.stock === undefined ? null : Number(card.dataset.stock),
      availability: card.dataset.availability || 'available'
    };
    const added = addProductToCart(product);
    if (added) {
      showToast(product.name + " added to cart");
    }
    return;
  }

  const control = event.target.closest('[data-cart-action]');
  if (!control) return;
  const item = cart.find(entry => entry.id === control.dataset.cartId);
  if (!item) return;
  if (control.dataset.cartAction === 'remove') cart = cart.filter(entry => entry.id !== item.id);
  if (control.dataset.cartAction === 'decrease') {
    item.quantity--;
    if (item.quantity <= 0) cart = cart.filter(entry => entry.id !== item.id);
  }
  if (control.dataset.cartAction === 'increase' &&
      item.availability !== 'unavailable' &&
      (!Number.isFinite(item.stock) || item.quantity < item.stock)) item.quantity++;
  persist();
});

document.getElementById('cartClose').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
// Watch card additions/removals only; descendant text changes from render() would loop.
if (grid) new MutationObserver(render).observe(grid, { childList: true });
render();




