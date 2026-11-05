import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || import.meta.env.VITE_SUPABASE_ANON_KEY

export const hasSupabase = Boolean(url && key)

// "This is a shared computer": the sign-in is kept for the open tab only
// (sessionStorage); otherwise the device stays signed in (localStorage).
const SHARED = 'learn-shared-device'
export const setSharedDevice = (on) => { try { if (on) localStorage.setItem(SHARED, '1'); else localStorage.removeItem(SHARED) } catch { /* ignore */ } }
const store = () => { try { return localStorage.getItem(SHARED) === '1' ? sessionStorage : localStorage } catch { return null } }
const storage = {
  getItem: (k) => { try { return store()?.getItem(k) ?? null } catch { return null } },
  setItem: (k, v) => { try { store()?.setItem(k, v) } catch { /* ignore */ } },
  removeItem: (k) => { try { localStorage.removeItem(k); sessionStorage.removeItem(k) } catch { /* ignore */ } },
}

export const supabase = hasSupabase ? createClient(url, key, { auth: { storage, storageKey: 'pra-learn-auth' } }) : null
