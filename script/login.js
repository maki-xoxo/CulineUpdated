import { supabase, supabaseConfigured } from "./supabase-client.js";

if (!supabaseConfigured) {
  console.warn("Supabase not configured — registration will not work");
}

// ---------- Rate limit handling ----------
const RATE_LIMIT_KEYS = { register: "culine_register_ratelimit", login: "culine_login_ratelimit" };
const RATE_LIMIT_COOLDOWN_MS = 5 * 60 * 1000; // 5 minutes

function getRateLimitRemaining(scope = "register") {
  try {
    const stored = localStorage.getItem(RATE_LIMIT_KEYS[scope]);
    if (!stored) return 0;
    const { timestamp } = JSON.parse(stored);
    return Math.max(0, RATE_LIMIT_COOLDOWN_MS - (Date.now() - timestamp));
  } catch {
    return 0;
  }
}

function setRateLimit(scope = "register") {
  localStorage.setItem(RATE_LIMIT_KEYS[scope], JSON.stringify({ timestamp: Date.now() }));
}

function clearRateLimit(scope = "register") {
  localStorage.removeItem(RATE_LIMIT_KEYS[scope]);
}

function showRateLimitMessage(errorEl, remainingMs) {
  const minutes = Math.ceil(remainingMs / 60000);
  errorEl.textContent = "Too many attempts. Please wait " + minutes + " minute" + (minutes !== 1 ? "s" : "") + " before trying again.";
  errorEl.classList.add("is-error");
}

// Initialize after DOM is ready
function init() {
  const tabRegister = document.getElementById("tabRegister");
  const goLogin = document.getElementById("goLogin");
  const loginForm = document.getElementById("loginForm");
  const registerForm = document.getElementById("registerForm");
  const loginDivider = document.getElementById("loginDivider");
  const footRegister = document.getElementById("footRegister");

  // Debug: check if elements exist
  if (!tabRegister || !goLogin || !loginForm || !registerForm || !loginDivider || !footRegister) {
    console.error("Login elements not found:", { tabRegister, goLogin, loginForm, registerForm, loginDivider, footRegister });
    return;
  }

  // ---------- Switching between sign-in and register ----------

  function showLogin() {
    loginForm.hidden = false;
    loginDivider.hidden = false;
    tabRegister.hidden = false;
    registerForm.hidden = true;
    footRegister.hidden = true;
  }

  function showRegister() {
    loginForm.hidden = true;
    loginDivider.hidden = true;
    tabRegister.hidden = true;
    registerForm.hidden = false;
    footRegister.hidden = false;
  }

  tabRegister.addEventListener("click", showRegister);
  goLogin.addEventListener("click", (e) => { e.preventDefault(); showLogin(); });

  // ---------- Forgot Password Dialog ----------
  const forgotLink = document.getElementById("forgotLink");
  const forgotDialog = document.getElementById("forgotDialog");
  const forgotForm = document.getElementById("forgotForm");
  const forgotCloseBtn = document.querySelector(".forgot-close-btn");
  const backToLogin = document.getElementById("backToLogin");
  const forgotError = document.getElementById("forgotError");

  if (forgotLink && forgotDialog && forgotForm) {
    forgotLink.addEventListener("click", (e) => {
      e.preventDefault();
      forgotDialog.showModal();
      forgotForm.reset();
      forgotError.textContent = "";
    });

    if (forgotCloseBtn) forgotCloseBtn.addEventListener("click", () => forgotDialog.close());
    if (backToLogin) backToLogin.addEventListener("click", (e) => { e.preventDefault(); forgotDialog.close(); });

    forgotDialog.addEventListener("click", (e) => { if (e.target === forgotDialog) forgotDialog.close(); });

    forgotForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const email = document.getElementById("forgotEmail").value.trim();
      const submitBtn = forgotForm.querySelector("button[type=\"submit\"]");

      if (!email) {
        forgotError.textContent = "Please enter your email.";
        return;
      }

      if (!supabaseConfigured) {
        forgotError.textContent = "Supabase is not configured.";
        return;
      }

      submitBtn.disabled = true;
      forgotError.textContent = "Sending reset link…";

      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: window.location.origin + window.location.pathname.replace("login.html", "reset-password.html")
      });

      if (error) {
        forgotError.textContent = error.message;
        submitBtn.disabled = false;
        return;
      }

      forgotError.textContent = "Reset link sent! Check your email.";
      forgotError.classList.remove("is-error");
      submitBtn.disabled = false;

      setTimeout(() => {
        forgotDialog.close();
      }, 2000);
    });
  }

  // ---------- Registration ----------

  async function handleRegister(event) {
    event.preventDefault();

    const email = document.getElementById("registerEmail").value.trim();
    const username = document.getElementById("registerUsername").value.trim();
    const password = document.getElementById("registerPassword").value;
    const confirmPassword = document.getElementById("registerConfirmPassword").value;
    const error = document.getElementById("registerError");
    const submitBtn = registerForm.querySelector("button[type=\"submit\"]");

    if (password !== confirmPassword) {
      error.textContent = "Passwords don\'t match.";
      return;
    }

    // Check local rate limit cooldown
    const remaining = getRateLimitRemaining();
    if (remaining > 0) {
      showRateLimitMessage(error, remaining);
      submitBtn.disabled = true;
      setTimeout(() => { submitBtn.disabled = false; }, remaining);
      return;
    }

    error.textContent = "";
    submitBtn.disabled = true;
    error.textContent = "Creating account…";

    if (!supabaseConfigured) {
      error.textContent = "Supabase is not configured. Check supabase-client.js";
      submitBtn.disabled = false;
      return;
    }

    const { error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { username } }
    });

    if (signUpError) {
      // Handle rate limit error specifically
      if (signUpError.message.includes("rate limit") || signUpError.message.includes("Rate limit") || signUpError.status === 429) {
        setRateLimit();
        showRateLimitMessage(error, RATE_LIMIT_COOLDOWN_MS);
        submitBtn.disabled = true;
        setTimeout(() => { submitBtn.disabled = false; }, RATE_LIMIT_COOLDOWN_MS);
      } else {
        error.textContent = signUpError.message;
        submitBtn.disabled = false;
      }
      return;
    }

    // Success - clear any previous rate limit
    clearRateLimit();
    error.textContent = "Account created successfully! Please sign in.";
    error.classList.remove("is-error");

    setTimeout(() => {
      window.location.href = "login.html";
    }, 1500);
  }

  registerForm.addEventListener("submit", handleRegister);

  // ---------- Sign-in ----------

  async function handleLogin(event) {
    event.preventDefault();

    const identifier = document.getElementById("loginIdentifier").value.trim();
    const password = document.getElementById("loginPassword").value;
    const error = document.getElementById("loginError");
    const submitBtn = loginForm.querySelector("button[type=\"submit\"]");

    if (!supabaseConfigured) {
      error.textContent = "Supabase is not configured. Check supabase-client.js";
      return;
    }

    const remaining = getRateLimitRemaining("login");
    if (remaining > 0) {
      showRateLimitMessage(error, remaining);
      submitBtn.disabled = true;
      setTimeout(() => { submitBtn.disabled = false; }, remaining);
      return;
    }

    error.textContent = "Signing in…";
    submitBtn.disabled = true;

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: identifier,
      password
    });

    if (signInError) {
      // Handle rate limit on login too
      if (signInError.message.includes("rate limit") || signInError.message.includes("Rate limit") || signInError.status === 429) {
        showRateLimitMessage(error, RATE_LIMIT_COOLDOWN_MS);
        setRateLimit("login");
        setTimeout(() => { submitBtn.disabled = false; }, RATE_LIMIT_COOLDOWN_MS);
      } else {
        error.textContent = signInError.message;
        submitBtn.disabled = false;
      }
      return;
    }

    clearRateLimit("login");

    // Successful sign-in — session is set by Supabase
    window.location.href = "index.html";
  }

  loginForm.addEventListener("submit", handleLogin);

  // Re-apply any active cooldown on page load
  [["register", "registerError", registerForm], ["login", "loginError", loginForm]].forEach(([scope, errorId, form]) => {
    const remaining = getRateLimitRemaining(scope);
    if (remaining <= 0) return;
    const errorEl = document.getElementById(errorId);
    const btn = form.querySelector("button[type=\"submit\"]");
    showRateLimitMessage(errorEl, remaining);
    btn.disabled = true;
    setTimeout(() => { btn.disabled = false; }, remaining);
  });
}

// Run init when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}