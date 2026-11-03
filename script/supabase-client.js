import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

// Get config from window.CULINE_CONFIG (set by config.js or config.local.js)
// Falls back to import.meta.env for Vite builds
const SUPABASE_URL = (typeof window !== 'undefined' && window.CULINE_CONFIG?.SUPABASE_URL)
  || (typeof import.meta !== 'undefined' && import.meta.env?.VITE_SUPABASE_URL)
  || '';

const SUPABASE_KEY = (typeof window !== 'undefined' && window.CULINE_CONFIG?.SUPABASE_KEY)
  || (typeof import.meta !== 'undefined' && import.meta.env?.VITE_SUPABASE_KEY)
  || '';

const UNSPLASH_KEY = (typeof window !== 'undefined' && window.CULINE_CONFIG?.UNSPLASH_KEY)
  || (typeof import.meta !== 'undefined' && import.meta.env?.VITE_UNSPLASH_KEY)
  || '';

export const supabaseConfigured = Boolean(SUPABASE_URL && SUPABASE_KEY);
export const supabase = supabaseConfigured ? createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: {
    storage: typeof window !== 'undefined' ? window.sessionStorage : undefined,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
}) : null;

// Export keys for other modules that need them
export { SUPABASE_URL, SUPABASE_KEY, UNSPLASH_KEY };