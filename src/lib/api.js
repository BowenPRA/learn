// Which backend the portal talks to. Demo mode (sample data in this browser) when
// the build has no Supabase settings, or when the address has ?demo in it, so the
// live site can still show the demo to staff without anyone's data.
import { hasSupabase } from './supabase.js'
import { live } from './live.js'
import { demo } from './demo/backend.js'

const asked = typeof window !== 'undefined' && /[?&]demo(=|&|$)/.test(window.location.search)
export const DEMO = !hasSupabase || asked
export const api = DEMO ? demo : live
