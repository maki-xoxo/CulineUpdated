// Culine Configuration
// INSTRUCTIONS:
// 1. Copy this file to config.local.js in the same folder
// 2. Fill in your actual Supabase credentials in config.local.js
// 3. config.local.js is gitignored (won't be committed)
// 4. OR edit the values below directly for quick testing (not for production)

// Default empty config - will be overridden by config.local.js if it exists
window.CULINE_CONFIG = {
  SUPABASE_URL: 'https://vmdoojppbolonlmjgxtk.supabase.co',
  SUPABASE_KEY: 'sb_publishable_4tkr-ghFSw6ItmNEhV38qQ_Z7k92y9c',
  UNSPLASH_KEY: 'I6E7saHiJiJ5grW9SsG3F81UqEAAaadwm-GT18OveN0'
};

// NOTE: For file:// protocol (opening HTML directly in browser),
// you MUST edit the values above directly or use a local HTTP server.
// CORS prevents loading config.local.js via file:// protocol.

// If using a local server (e.g., `npx serve` or `python -m http.server`),
// create config.local.js with:
/*
window.CULINE_CONFIG = {
  SUPABASE_URL: 'https://your-project.supabase.co',
  SUPABASE_KEY: 'your-anon-key',
  UNSPLASH_KEY: 'your-unsplash-key'
};
*/