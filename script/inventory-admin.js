import { supabase, supabaseConfigured } from './supabase-client.js';

// Clear any stale Supabase auth data from localStorage (old persistence)
// This runs once on load to migrate from localStorage -> sessionStorage
if (typeof window !== 'undefined') {
  const keysToRemove = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith('supabase.auth.')) {
      keysToRemove.push(key);
    }
  }
  keysToRemove.forEach(key => localStorage.removeItem(key));
}

// ============ DOM ELEMENTS ============
const adminLoginPage = document.getElementById('adminLoginPage');
const adminDashboard = document.getElementById('adminDashboard');
const setupNotice = document.getElementById('setupNotice');
const setupNoticeDashboard = document.getElementById('setupNoticeDashboard');
const loginForm = document.getElementById('adminLoginForm');
const loginMessage = document.getElementById('adminLoginMessage');
const adminLogout = document.getElementById('adminLogout');
const adminUserEmail = document.getElementById('adminUserEmail');
const customerViewLink = document.querySelector('.admin-login-link');

// Sidebar navigation
const adminSidebar = document.getElementById('adminSidebar');
const navButtons = document.querySelectorAll('.admin-nav-btn');
const inventoryPanel = document.getElementById('inventoryPanel');
const ordersPanel = document.getElementById('ordersPanel');
const notificationsPanel = document.getElementById('notificationsPanel');
const orderNotificationBadge = document.getElementById('orderNotificationBadge');
const notificationBadge = document.getElementById('notificationBadge');

// Inventory elements
const inventoryStatus = document.getElementById('inventoryStatus');
const tableBody = document.getElementById('inventoryRows');
const addForm = document.getElementById('addProductForm');
const refreshInventoryBtn = document.getElementById('refreshInventory');

// Order elements
const ordersStatus = document.getElementById('ordersStatus');
const ordersRows = document.getElementById('ordersRows');
const orderStatusFilter = document.getElementById('orderStatusFilter');
const refreshOrdersBtn = document.getElementById('refreshOrders');

// Notification elements
const notificationsStatus = document.getElementById('notificationsStatus');
const notificationsList = document.getElementById('notificationsList');
const clearNotificationsBtn = document.getElementById('clearNotifications');
const soundNotificationsCheckbox = document.getElementById('soundNotifications');

// Dialogs
const detailsDialog = document.getElementById('productDetailsDialog');
const detailsForm = document.getElementById('productDetailsForm');
const closeProductDetails = document.getElementById('closeProductDetails');
const orderDetailsDialog = document.getElementById('orderDetailsDialog');
const orderDetailsContent = document.getElementById('orderDetailsContent');
const closeOrderDetails = document.getElementById('closeOrderDetails');

// ============ STATE ============
let productById = new Map();
let adminActive = false;
let verifying = false;
let liveChannels = { inventory: null, orders: null };
let notifications = [];
let unreadCount = 0;
let soundEnabled = true;
let currentOrderFilter = '';

// Sound for notifications
const notificationSound = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUrek7e8hQ');

function playNotificationSound() {
  if (soundEnabled) {
    notificationSound.currentTime = 0;
    notificationSound.play().catch(() => {}); // Ignore autoplay restrictions
  }
}

// ============ UTILITIES ============
function setMessage(element, message, isError = false) {
  element.textContent = message;
  element.classList.toggle('is-error', isError);
}

function showTab(tabName) {
  // Update nav buttons
  navButtons.forEach(btn => {
    btn.classList.toggle('active', btn.dataset.tab === tabName);
  });

  // Show/hide panels
  inventoryPanel.hidden = tabName !== 'inventory';
  ordersPanel.hidden = tabName !== 'orders';
  notificationsPanel.hidden = tabName !== 'notifications';

  // Load data when switching tabs
  if (tabName === 'orders' && adminActive) loadOrders();
  if (tabName === 'notifications' && adminActive) renderNotifications();
}

function formatCurrency(amount, currency = 'USD') {
  const symbol = currency === 'PHP' ? '₱' : '$';
  return symbol + Number(amount).toFixed(2);
}

function formatDate(dateStr) {
  if (!dateStr) return '—';
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' });
}

function formatDateShort(dateStr) {
  if (!dateStr) return '—';
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
}

function escapeHtml(str) {
  if (!str) return '';
  const map = { '&': '&', '<': '<', '>': '>', '"': '"', "'": '&apos;' };
  return String(str).replace(/[&<>"']/g, c => map[c]);
}

// ============ NOTIFICATION SYSTEM ============
function addNotification(type, title, message, data = {}) {
  const notification = {
    id: Date.now() + Math.random(),
    type,
    title,
    message,
    data,
    timestamp: new Date().toISOString(),
    read: false
  };

  notifications.unshift(notification);
  if (notifications.length > 100) notifications.pop();

  if (!notification.read) {
    unreadCount++;
    updateNotificationBadges();
  }

  renderNotifications();
  playNotificationSound();

  // Browser notification (if permission granted)
  if (Notification.permission === 'granted' && document.hidden) {
    new Notification(title, { body: message, icon: '/favicon.ico' });
  }
}

function updateNotificationBadges() {
  const showBadge = unreadCount > 0;
  orderNotificationBadge.hidden = !showBadge;
  notificationBadge.hidden = !showBadge;
  orderNotificationBadge.textContent = unreadCount;
  notificationBadge.textContent = unreadCount;
}

function markNotificationRead(id) {
  const notif = notifications.find(n => n.id === id);
  if (notif && !notif.read) {
    notif.read = true;
    unreadCount = Math.max(0, unreadCount - 1);
    updateNotificationBadges();
    renderNotifications();
  }
}

function clearAllNotifications() {
  notifications = [];
  unreadCount = 0;
  updateNotificationBadges();
  renderNotifications();
}

function renderNotifications() {
  if (!notifications.length) {
    notificationsList.innerHTML = '<p class="notifications-empty">No notifications yet. Waiting for customer activity...</p>';
    return;
  }

  notificationsList.innerHTML = notifications.map(n => `
    <div class="notification-item ${n.read ? 'read' : 'unread'}" data-id="${n.id}">
      <div class="notification-icon ${n.type}">${getNotificationIcon(n.type)}</div>
      <div class="notification-content">
        <div class="notification-title">${escapeHtml(n.title)}</div>
        <div class="notification-message">${escapeHtml(n.message)}</div>
        <div class="notification-time">${formatDate(n.timestamp)}</div>
      </div>
      ${!n.read ? '<button class="notification-mark-read" type="button" aria-label="Mark as read">✓</button>' : ''}
    </div>
  `).join('');

  // Add click handlers
  notificationsList.querySelectorAll('.notification-item').forEach(item => {
    item.addEventListener('click', (e) => {
      if (e.target.closest('.notification-mark-read')) return;
      const id = parseFloat(item.dataset.id);
      markNotificationRead(id);
      // If it's an order notification, switch to orders tab
      const notif = notifications.find(n => n.id === id);
      if (notif?.data?.orderId) {
        showTab('orders');
        setTimeout(() => highlightOrder(notif.data.orderId), 100);
      }
    });
    item.querySelector('.notification-mark-read')?.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = parseFloat(item.dataset.id);
      markNotificationRead(id);
    });
  });
}

function getNotificationIcon(type) {
  const icons = {
    new_order: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>',
    order_cancelled: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>',
    order_delivered: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>',
    order_updated: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"></circle><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"></path></svg>'
  };
  return icons[type] || icons.order_updated;
}

function highlightOrder(orderId) {
  const row = ordersRows.querySelector(`tr[data-order-id="${orderId}"]`);
  if (row) {
    row.scrollIntoView({ behavior: 'smooth', block: 'center' });
    row.classList.add('highlight');
    setTimeout(() => row.classList.remove('highlight'), 3000);
  }
}

// ============ INVENTORY FUNCTIONS ============
async function loadProducts() {
  setMessage(inventoryStatus, 'Loading inventory...');
  const { data, error } = await supabase
    .from('products')
    .select('id,name,vendor,price,unit,stock_quantity,availability,is_featured,barcode,health_info,growing_location,market_location,dish_ideas')
    .order('name');

  if (error) {
    setMessage(inventoryStatus, 'Could not load inventory: ' + error.message, true);
    return;
  }

  productById = new Map((data || []).map(product => [String(product.id), product]));
  tableBody.replaceChildren();
  (data || []).forEach(product => {
    const row = document.createElement('tr');
    row.dataset.productId = product.id;

    const name = document.createElement('td');
    name.textContent = product.name;
    const vendor = document.createElement('td');
    vendor.textContent = product.vendor;
    const price = document.createElement('td');
    price.textContent = '$' + Number(product.price).toFixed(2) + ' / ' + product.unit;

    const barcodeCell = document.createElement('td');
    const barcodeInput = document.createElement('input');
    barcodeInput.type = 'text';
    barcodeInput.inputMode = 'numeric';
    barcodeInput.value = product.barcode || '';
    barcodeInput.placeholder = 'UPC / EAN';
    barcodeInput.setAttribute('aria-label', 'Barcode for ' + product.name);
    barcodeInput.dataset.field = 'barcode';
    barcodeCell.appendChild(barcodeInput);

    const stockCell = document.createElement('td');
    const stockInput = document.createElement('input');
    stockInput.type = 'number';
    stockInput.min = '0';
    stockInput.step = '1';
    stockInput.value = product.stock_quantity;
    stockInput.setAttribute('aria-label', 'Stock quantity for ' + product.name);
    stockInput.dataset.field = 'stock';
    stockCell.appendChild(stockInput);

    const availabilityCell = document.createElement('td');
    const availability = document.createElement('select');
    availability.setAttribute('aria-label', 'Availability for ' + product.name);
    availability.dataset.field = 'availability';
    [['available', 'Available'], ['unavailable', 'Unavailable']].forEach(([value, label]) => {
      const option = document.createElement('option');
      option.value = value;
      option.textContent = label;
      availability.appendChild(option);
    });
    availability.value = product.availability;
    availabilityCell.appendChild(availability);

    const featuredCell = document.createElement('td');
    const featured = document.createElement('input');
    featured.type = 'checkbox';
    featured.checked = product.is_featured;
    featured.setAttribute('aria-label', 'Feature ' + product.name);
    featured.dataset.field = 'featured';
    featuredCell.appendChild(featured);

    const actionCell = document.createElement('td');
    const details = document.createElement('button');
    details.type = 'button';
    details.className = 'admin-secondary-btn';
    details.textContent = 'Details';
    details.dataset.detailsId = product.id;
    actionCell.appendChild(details);
    const save = document.createElement('button');
    save.type = 'button';
    save.className = 'admin-save-btn';
    save.textContent = 'Save';
    save.dataset.saveId = product.id;
    actionCell.appendChild(save);

    row.append(name, vendor, price, barcodeCell, stockCell, availabilityCell, featuredCell, actionCell);
    tableBody.appendChild(row);
  });
  setMessage(inventoryStatus, `${data?.length || 0} products loaded.`);
}

// ============ ORDERS FUNCTIONS ============
async function loadOrders() {
  setMessage(ordersStatus, 'Loading orders...');
  let query = supabase
    .from('orders')
    .select('*, order_items(*)')
    .order('created_at', { ascending: false });

  if (currentOrderFilter) {
    query = query.eq('status', currentOrderFilter);
  }

  const { data, error } = await query;

  if (error) {
    setMessage(ordersStatus, 'Could not load orders: ' + error.message, true);
    return;
  }

  ordersRows.replaceChildren();
  (data || []).forEach(order => {
    const row = document.createElement('tr');
    row.dataset.orderId = order.id;

    const itemCount = order.order_items?.length || 0;
    const itemsHtml = order.order_items?.map(item =>
      `${item.product_name} × ${item.quantity}`
    ).join(', ') || '—';

    const currency = order.currency || 'USD';
    const statusClass = `status-${order.status}`;

    row.innerHTML = `
      <td><code>${order.id.slice(0, 8)}</code></td>
      <td>${escapeHtml(order.user_id?.slice(0, 8))}</td>
      <td>${formatDateShort(order.created_at)}</td>
      <td><span class="order-status ${statusClass}">${order.status}</span></td>
      <td title="${escapeHtml(itemsHtml)}">${itemCount} item${itemCount !== 1 ? 's' : ''}</td>
      <td>${formatCurrency(order.subtotal, currency)}</td>
      <td>${formatCurrency(order.delivery_fee, currency)}</td>
      <td><strong>${formatCurrency(order.total, currency)}</strong></td>
      <td>${escapeHtml(order.estimated_delivery_date || '—')}</td>
      <td>
        <button class="admin-secondary-btn view-order-btn" data-order-id="${order.id}" type="button">View</button>
      </td>
    `;

    ordersRows.appendChild(row);
  });

  // Add view button handlers
  ordersRows.querySelectorAll('.view-order-btn').forEach(btn => {
    btn.addEventListener('click', () => showOrderDetails(btn.dataset.orderId, data));
  });

  setMessage(ordersStatus, `${data?.length || 0} orders loaded.`);
}

function showOrderDetails(orderId, ordersData) {
  const order = ordersData.find(o => o.id === orderId);
  if (!order) return;

  const currency = order.currency || 'USD';
  const itemsHtml = (order.order_items || []).map(item => `
    <tr>
      <td>${escapeHtml(item.product_name)}</td>
      <td>${item.quantity}</td>
      <td>${formatCurrency(item.price, currency)}</td>
      <td>${formatCurrency(item.line_total, currency)}</td>
    </tr>
  `).join('');

  orderDetailsContent.innerHTML = `
    <div class="order-detail-header">
      <div class="detail-row"><strong>Order ID:</strong> <code>${order.id}</code></div>
      <div class="detail-row"><strong>Customer:</strong> ${escapeHtml(order.user_id)}</div>
      <div class="detail-row"><strong>Date:</strong> ${formatDate(order.created_at)}</div>
      <div class="detail-row"><strong>Status:</strong> <span class="order-status status-${order.status}">${order.status}</span></div>
      <div class="detail-row"><strong>Est. Delivery:</strong> ${escapeHtml(order.estimated_delivery_date || '—')}</div>
      <div class="detail-row"><strong>Address:</strong> ${escapeHtml(order.delivery_address || 'Not provided')}</div>
    </div>
    <table class="order-items-table">
      <thead><tr><th>Product</th><th>Qty</th><th>Price</th><th>Total</th></tr></thead>
      <tbody>${itemsHtml}</tbody>
    </table>
    <div class="order-totals">
      <div class="total-row"><span>Subtotal</span><span>${formatCurrency(order.subtotal, currency)}</span></div>
      <div class="total-row"><span>Delivery Fee</span><span>${formatCurrency(order.delivery_fee, currency)}</span></div>
      <div class="total-row total-final"><span>Total</span><span>${formatCurrency(order.total, currency)}</span></div>
    </div>
  `;
  orderDetailsDialog.showModal();
}

// ============ REALTIME SUBSCRIPTIONS ============
function setupRealtimeSubscriptions() {
  // Clean up existing channels
  if (liveChannels.inventory) supabase.removeChannel(liveChannels.inventory);
  if (liveChannels.orders) supabase.removeChannel(liveChannels.orders);

  // Inventory changes (existing functionality)
  liveChannels.inventory = supabase
    .channel('admin-inventory-live')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'products' }, loadProducts)
    .subscribe();

  // Orders changes - NEW!
  liveChannels.orders = supabase
    .channel('admin-orders-live')
    .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'orders' }, payload => {
      const order = payload.new;
      addNotification('new_order', 'New Order Received', `Order ${order.id.slice(0, 8)} placed for ${formatCurrency(order.total, order.currency)}`, { orderId: order.id });
      if (!ordersPanel.hidden) loadOrders();
    })
    .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'orders' }, payload => {
      const order = payload.new;
      const oldOrder = payload.old;

      if (order.status !== oldOrder.status) {
        if (order.status === 'cancelled') {
          addNotification('order_cancelled', 'Order Cancelled', `Order ${order.id.slice(0, 8)} was cancelled`, { orderId: order.id });
        } else if (order.status === 'delivered') {
          addNotification('order_delivered', 'Order Delivered', `Order ${order.id.slice(0, 8)} marked as delivered`, { orderId: order.id });
        } else {
          addNotification('order_updated', 'Order Updated', `Order ${order.id.slice(0, 8)} status: ${order.status}`, { orderId: order.id });
        }
      }
      if (!ordersPanel.hidden) loadOrders();
    })
    .subscribe();
}

// ============ ADMIN VERIFICATION ============
async function verifyAdmin() {
  if (adminActive || verifying) return adminActive;
  verifying = true;
  try {
    const { data, error } = await supabase.rpc('is_inventory_admin');
    if (error || data !== true) {
      console.error('Admin verification failed:', error || 'Not an admin');
      await supabase.auth.signOut();
      adminLoginPage.hidden = false;
      adminDashboard.hidden = true;
      if (customerViewLink) customerViewLink.hidden = false;
      setMessage(loginMessage, 'This account is not authorized for inventory management.', true);
      return false;
    }
    adminActive = true;
    adminLoginPage.hidden = true;
    adminDashboard.hidden = false;
    if (customerViewLink) customerViewLink.hidden = true;

    // Get user email
    const { data: { session } } = await supabase.auth.getSession();
    if (session?.user?.email) {
      adminUserEmail.textContent = session.user.email;
    }

    await loadProducts();
    setupRealtimeSubscriptions();
    return true;
  } finally {
    verifying = false;
  }
}

// ============ EVENT LISTENERS ============
// Sidebar navigation
navButtons.forEach(btn => {
  btn.addEventListener('click', () => showTab(btn.dataset.tab));
});

// Login
if (!supabaseConfigured) {
  setupNotice.hidden = false;
  loginForm.querySelectorAll('input,button').forEach(control => { control.disabled = true; });
} else {
  loginForm.addEventListener('submit', async event => {
    event.preventDefault();
    setMessage(loginMessage, 'Signing in…');
    const form = new FormData(loginForm);
    const { error } = await supabase.auth.signInWithPassword({
      email: form.get('email'),
      password: form.get('password')
    });
    if (error) {
      setMessage(loginMessage, 'Sign in failed. Check your credentials.', true);
      return;
    }
    await verifyAdmin();
  });
}

adminLogout.addEventListener('click', async () => {
  await supabase.auth.signOut();
  adminActive = false;
  adminDashboard.hidden = true;
  adminLoginPage.hidden = false;
  if (customerViewLink) customerViewLink.hidden = false;
  loginForm.reset();
  setMessage(loginMessage, '');
  if (liveChannels.inventory) { supabase.removeChannel(liveChannels.inventory); liveChannels.inventory = null; }
  if (liveChannels.orders) { supabase.removeChannel(liveChannels.orders); liveChannels.orders = null; }
});

// Inventory table actions
tableBody.addEventListener('click', async event => {
  const detailsButton = event.target.closest('[data-details-id]');
  if (detailsButton) {
    const product = productById.get(detailsButton.dataset.detailsId);
    if (!product) return;
    detailsForm.elements.namedItem('id').value = product.id;
    detailsForm.elements.health_info.value = product.health_info || '';
    detailsForm.elements.growing_location.value = product.growing_location || '';
    detailsForm.elements.market_location.value = product.market_location || '';
    detailsForm.elements.dish_ideas.value = product.dish_ideas || '';
    detailsDialog.showModal();
    return;
  }
  const button = event.target.closest('[data-save-id]');
  if (!button) return;
  const row = button.closest('tr');
  const stockQuantity = Number(row.querySelector('[data-field="stock"]').value);
  if (!Number.isInteger(stockQuantity) || stockQuantity < 0) {
    setMessage(inventoryStatus, 'Stock must be a whole number of zero or more.', true);
    return;
  }
  button.disabled = true;
  console.log('[Inventory] Saving changes for product:', button.dataset.saveId);
  const { error } = await supabase.from('products').update({
    stock_quantity: stockQuantity,
    availability: row.querySelector('[data-field="availability"]').value,
    is_featured: row.querySelector('[data-field="featured"]').checked,
    barcode: row.querySelector('[data-field="barcode"]').value.trim() || null
  }).eq('id', button.dataset.saveId);
  button.disabled = false;
  if (error) {
    console.error('[Inventory] Save error:', error);
    setMessage(inventoryStatus, 'Could not save changes: ' + error.message, true);
  } else {
    console.log('[Inventory] Save successful');
    setMessage(inventoryStatus, 'Stock updated. Customers will see the change live.');
  }
});

closeProductDetails.addEventListener('click', () => detailsDialog.close());
detailsDialog.addEventListener('click', event => { if (event.target === detailsDialog) detailsDialog.close(); });

detailsForm.addEventListener('submit', async event => {
  event.preventDefault();
  const values = new FormData(detailsForm);
  const { error } = await supabase.from('products').update({
    health_info: String(values.get('health_info')).trim(),
    growing_location: String(values.get('growing_location')).trim(),
    market_location: String(values.get('market_location')).trim(),
    dish_ideas: String(values.get('dish_ideas')).trim()
  }).eq('id', values.get('id'));
  if (error) {
    setMessage(inventoryStatus, 'Could not save produce details: ' + error.message, true);
    return;
  }
  detailsDialog.close();
  setMessage(inventoryStatus, 'Produce details saved. Customers can see them after a barcode match.');
  await loadProducts();
});

// Add product form
addForm.addEventListener('submit', async event => {
  event.preventDefault();
  const form = new FormData(addForm);
  const stockQuantity = Number(form.get('stock_quantity'));
  const price = Number(form.get('price'));
  if (!Number.isInteger(stockQuantity) || stockQuantity < 0 || !Number.isFinite(price) || price < 0) {
    setMessage(inventoryStatus, 'Enter a valid price and a whole stock quantity of zero or more.', true);
    return;
  }
  console.log('[Inventory] Adding new product:', form.get('name'));
  const { error } = await supabase.from('products').insert({
    name: String(form.get('name')).trim(),
    vendor: String(form.get('vendor')).trim(),
    price,
    unit: String(form.get('unit')).trim(),
    stock_quantity: stockQuantity,
    availability: form.get('availability'),
    is_featured: form.get('is_featured') === 'on',
    barcode: String(form.get('barcode') || '').trim() || null,
    health_info: String(form.get('health_info') || '').trim(),
    growing_location: String(form.get('growing_location') || '').trim(),
    market_location: String(form.get('market_location') || '').trim(),
    dish_ideas: String(form.get('dish_ideas') || '').trim()
  });
  if (error) {
    console.error('[Inventory] Add product error:', error);
    setMessage(inventoryStatus, 'Could not add product: ' + error.message, true);
  } else {
    console.log('[Inventory] Add product successful');
    addForm.reset();
    setMessage(inventoryStatus, 'Product added to the live market.');
    await loadProducts();
  }
});

refreshInventoryBtn.addEventListener('click', loadProducts);

// Orders tab
orderStatusFilter.addEventListener('change', () => {
  currentOrderFilter = orderStatusFilter.value;
  loadOrders();
});
refreshOrdersBtn.addEventListener('click', loadOrders);

// Order details dialog
closeOrderDetails.addEventListener('click', () => orderDetailsDialog.close());
orderDetailsDialog.addEventListener('click', event => { if (event.target === orderDetailsDialog) orderDetailsDialog.close(); });

// Notifications tab
clearNotificationsBtn.addEventListener('click', clearAllNotifications);
soundNotificationsCheckbox.addEventListener('change', () => {
  soundEnabled = soundNotificationsCheckbox.checked;
});

// Auth state
supabase.auth.getSession().then(({ data }) => {
  if (data.session) verifyAdmin();
});

supabase.auth.onAuthStateChange((event, session) => {
  if (event === 'SIGNED_IN' && session) setTimeout(verifyAdmin, 0);
  else if (event === 'SIGNED_OUT' && adminActive) {
    adminActive = false;
    adminDashboard.hidden = true;
    adminLoginPage.hidden = false;
    if (customerViewLink) customerViewLink.hidden = false;
    if (liveChannels.inventory) { supabase.removeChannel(liveChannels.inventory); liveChannels.inventory = null; }
    if (liveChannels.orders) { supabase.removeChannel(liveChannels.orders); liveChannels.orders = null; }
  }
});

// Auto sign-out when leaving admin page (close tab, navigate away, refresh)
window.addEventListener('pagehide', () => {
  if (adminActive) {
    supabase.auth.signOut();
  }
});

// Request notification permission
if (Notification.permission === 'default') {
  Notification.requestPermission();
}