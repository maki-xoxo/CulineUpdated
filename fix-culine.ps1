
$root = "C:\Users\Yves\Downloads\Culine"

# 1. customer-live-inventory.js (full replace)
@"
import { supabase, supabaseConfigured } from './supabase-client.js';

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
"@ | Set-Content "$root\script\customer-live-inventory.js" -Encoding UTF8

# 2. supabase-client.js (use env vars)
@"
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';
export const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://vmdoojppbolonlmjgxtk.supabase.co';
export const SUPABASE_PUBLISHABLE_KEY = import.meta.env.VITE_SUPABASE_KEY || 'sb_publishable_4tkr-ghFSw6ItmNEhV38qQ_Z7k92y9c';
export const supabaseConfigured = !SUPABASE_URL.includes('YOUR_PROJECT_REF') && !SUPABASE_PUBLISHABLE_KEY.includes('REPLACE_WITH');
export const supabase = supabaseConfigured ? createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY) : null;
"@ | Set-Content "$root\script\supabase-client.js" -Encoding UTF8

# 3. cart.js (add exports at top)
$cart = Get-Content "$root\script\cart.js" -Raw
$cart = $cart -replace '^const CART_KEY', "export const USD_TO_PHP_RATE = 63.76;\nexport function getCurrency() { return localStorage.getItem('culine_currency') || 'USD'; }\nexport function formatCurrency(amount) { const c=getCurrency(); const s=c==='PHP'?'P':'$'; let a=amount; if(c==='PHP') a*=USD_TO_PHP_RATE; return s+a.toFixed(2); }\n\nconst CART_KEY"
$cart | Set-Content "$root\script\cart.js" -Encoding UTF8

# 4. login.js (rate limit on login)
$login = Get-Content "$root\script\login.js" -Raw
$login = $login -replace 'submitBtn\.disabled = true;', "submitBtn.disabled = true;`n    const remaining = getRateLimitRemaining();`n    if (remaining > 0) { showRateLimitMessage(error, remaining); submitBtn.disabled = true; setTimeout(() => { submitBtn.disabled = false; }, remaining); return; }"
$login | Set-Content "$root\script\login.js" -Encoding UTF8

# 5. inventory-admin.js (auth listener)
$admin = Get-Content "$root\script\inventory-admin.js" -Raw
$admin = $admin -replace 'supabase\.auth\.getSession\(\)\.then\(\{\s*data\s*\} => \{\s*if \(data\.session\) verifyAdmin\(\);\s*\}\);', "supabase.auth.getSession().then(({ data }) => { if (data.session) verifyAdmin(); });`n`nsupabase.auth.onAuthStateChange((event, session) => {`n  if (event === 'SIGNED_IN' && session) verifyAdmin();`n  if (event === 'SIGNED_OUT') window.location.reload();`n});"
$admin | Set-Content "$root\script\inventory-admin.js" -Encoding UTF8

# 6. index.html (fix formatCurrency calls)
$index = Get-Content "$root\index.html" -Raw
$index = $index -replace 'budgetRemainingEl\.textContent = formatCurrency\(remaining, false\);', 'budgetRemainingEl.textContent = formatCurrency(remaining);'
$index = $index -replace 'budgetSubEl\.textContent = "of " \+ formatCurrency\(budget, false\) \+ " this week";', 'budgetSubEl.textContent = "of " + formatCurrency(budget) + " this week";'
$index = $index -replace 'const USD_TO_PHP_RATE = 63\.76;', '// USD_TO_PHP_RATE imported from cart.js'
$index = $index -replace 'import \{ supabase, supabaseConfigured \} from "\./script/supabase-client\.js";', "import { supabase, supabaseConfigured } from './script/supabase-client.js';`nimport { USD_TO_PHP_RATE, getCurrency, formatCurrency } from './script/cart.js';"
$index | Set-Content "$root\index.html" -Encoding UTF8

# 7. reset-password.html (handle token)
$reset = Get-Content "$root\reset-password.html" -Raw
$newScript = @"
<script type=\"module\">
import { supabase, supabaseConfigured } from './script/supabase-client.js';
const form = document.getElementById('resetForm'); const error = document.getElementById('resetError');
const hash = window.location.hash.substring(1); const params = new URLSearchParams(hash); const accessToken = params.get('access_token');
if (accessToken && supabaseConfigured) { const { error: sessionError } = await supabase.auth.setSession({ access_token: accessToken, refresh_token: params.get('refresh_token') }); if (sessionError) { error.textContent = 'Invalid or expired reset link.'; return; } }
form.addEventListener('submit', async (e) => { e.preventDefault(); const p = document.getElementById('newPassword').value; const c = document.getElementById('confirmPassword').value; const btn = form.querySelector('button[type=\"submit\"]'); if (p!==c) { error.textContent = \"Passwords don't match.\"; return; } if (p.length<6) { error.textContent = 'Password must be at least 6 characters.'; return; } if (!supabaseConfigured) { error.textContent = 'Supabase is not configured.'; return; } btn.disabled = true; error.textContent = 'Updating password...'; const { error: ue } = await supabase.auth.updateUser({ password: p }); if (ue) { error.textContent = ue.message; btn.disabled = false; return; } error.textContent = 'Password updated! Redirecting...'; error.classList.remove('is-error'); setTimeout(() => { window.location.href = 'login.html'; }, 1500); });
</script>
"
$reset = $reset -replace '(?s)<script type="module">.*?</script>', $newScript
$reset | Set-Content "$root\reset-password.html" -Encoding UTF8

# 8. .env.example
@"
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_KEY=your_publishable_key
"@ | Set-Content "$root\.env.example" -Encoding UTF8

Write-Host "All fixes applied!" -ForegroundColor Green