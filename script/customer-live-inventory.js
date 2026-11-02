async function checkAuthAndLoad() {
  if (!supabaseConfigured) { window.culineProducts = []; window.culineInventoryError = true; return; }
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) { window.culineProducts = []; window.culineInventoryError = true; return; }
  await loadInventory();
}

async function loadInventory() {
  window.culineProducts = null; window.culineInventoryError = false;
  const grid = document.querySelector('.produce-grid');
  const heading = document.getElementById('marketHeading');
  const marketLink = document.getElementById('seeFullMarket');
  const status = document.getElementById('inventorySyncStatus');
  let products = []; let fullMarket = false;

  function createCard(product) { /* ...same as before... */ }
  function renderProducts() { /* ...same as before... */ }
  async function loadProducts() { /* ...same as before... */ }

  document.addEventListener('click', event => { /* ...same as before... */ }, true);
  supabase.channel('customer-inventory-live').on('postgres_changes', { event: '*', schema: 'public', table: 'products' }, loadProducts).subscribe();
  loadProducts();
}
checkAuthAndLoad();
supabase.auth.onAuthStateChange((event, session) => {
  if (event === 'SIGNED_IN' && session) loadInventory();
  else if (event === 'SIGNED_OUT') { window.culineProducts = []; window.culineInventoryError = true; const g=document.querySelector('.produce-grid'); if(g)g.replaceChildren(); }
});
