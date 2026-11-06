// src/lib/remote/client.js
// The one Supabase client in this site. It belongs to The Current (Palm River
// Academy's admin app, current.pra.edu.vn): Guess Who reads students through it
// after a staff sign-in (src/guess-who/school.js), and both phone remotes — the
// Guess Who board's and the slide decks' — use its realtime broadcast, which
// needs no sign-in. The URL and publishable key are public by design; the same
// pair ships in The Current's own bundle.
//
// Only ever loaded with a dynamic import() (the Guess Who route, or a deck's
// "Phone remote" button), so a student opening a lesson never downloads it.
import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://gpfycuxltrjeeyxnnktu.supabase.co'
const SUPABASE_KEY = 'sb_publishable_PnbUt3hda2bKjMnW__il0w_7aR3lqhe'

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: {
    // bowenpra.github.io also serves the Dashboard, which keeps its students'
    // Supabase sessions in this origin's localStorage. A key of our own means a
    // staff sign-in here never replaces a student's session there. (Named for
    // Guess Who, which signs in; renaming it would sign Mr Bowen out.)
    storageKey: 'classroom:guess-who-auth',
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: false,
  },
})
