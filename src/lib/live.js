// The real backend: The Current's Supabase project, through row level security and
// the learn_* functions in supabase/learn-schema.sql. Every method here has the
// same shape in the demo backend (demo/backend.js).
import { supabase, setSharedDevice } from './supabase.js'
import { CODE_LENGTH, LOGIN_DOMAIN, PASSWORD_SUFFIX, USERNAME_RE, foldName } from '../../supabase/functions/learn-accounts/lib.js'

const PACK_FIELDS = 'id, slug, class_key, title, title_vn, content, status, opens_on, due_on, version, published_at, request_id'
import { problem } from './problem.js'
const offline = (e) => /fetch|network|failed to/i.test(e?.message || '')
const must = ({ data, error }) => {
  if (error) throw problem(offline(error) ? 'offline' : 'server', error.message)
  return data
}

export const live = {
  demo: false,

  async session() {
    const { data } = await supabase.auth.getSession()
    return data.session
  },
  onChange(cb) {
    const { data } = supabase.auth.onAuthStateChange((_event, session) => cb(session))
    return () => data.subscription.unsubscribe()
  },

  /** Nickname + secret code (the student number, 3 digits), as on the old Dashboard. */
  async signInStudent(username, pin, shared) {
    const u = foldName(username)
    const p = String(pin || '').replace(/\D/g, '')
    if (!USERNAME_RE.test(u) || p.length < CODE_LENGTH) throw problem('wrong')
    setSharedDevice(!!shared)
    const { data, error } = await supabase.auth.signInWithPassword({ email: `${u}@${LOGIN_DOMAIN}`, password: `${p}${PASSWORD_SUFFIX}` })
    if (error) throw problem(error.status === 400 ? 'wrong' : 'offline', error.message)
    if (data.user?.app_metadata?.role !== 'student') {
      await supabase.auth.signOut({ scope: 'local' })
      throw problem('notStudent')
    }
  },

  /** The Current's login: email + password, or a short name mapped as The Current maps it. */
  async signInStaff(identifier, password) {
    let email = String(identifier || '').trim()
    let pw = String(password || '')
    if (!email.includes('@')) { email = `${email.toLowerCase()}@science.local`; pw = `${pw.trim()}-y8s` }
    setSharedDevice(false)
    const { error } = await supabase.auth.signInWithPassword({ email, password: pw })
    if (error) throw problem(error.status === 400 ? 'wrong' : 'offline', error.message)
  },

  // This device only: Supabase's default signs the person out everywhere.
  async signOut() {
    await supabase.auth.signOut({ scope: 'local' })
    setSharedDevice(false)
  },

  /** Who is signed in: { kind: 'student', name, year_group, username } | { kind: 'staff', name, classes } | { kind: 'none' }. */
  async me(session) {
    if (!session) return null
    if (session.user?.app_metadata?.role === 'student') {
      const info = must(await supabase.rpc('learn_me_info'))
      return info ? { kind: 'student', ...info } : { kind: 'none' }
    }
    const [classes, name] = await Promise.all([supabase.rpc('learn_my_classes'), supabase.rpc('learn_who')])
    const list = must(classes) || []
    return list.length ? { kind: 'staff', name: must(name) || '', classes: list } : { kind: 'none' }
  },

  /** A student's open packs (row level security leaves only theirs) and their progress. */
  async myPacks() {
    const [packs, progress] = await Promise.all([
      supabase.from('learn_packs').select(PACK_FIELDS).eq('status', 'published').order('published_at', { ascending: false }),
      supabase.from('learn_progress').select('*'),
    ])
    return { packs: must(packs) || [], progress: must(progress) || [] }
  },

  /** One pack by its link, with the signed-in student's progress on it (none for staff). */
  async pack(slug) {
    const row = must(await supabase.from('learn_packs').select(PACK_FIELDS).eq('slug', slug).maybeSingle())
    if (!row) return null
    const progress = must(await supabase.from('learn_progress').select('*').eq('pack_id', row.id))
    return { pack: row, progress: progress || [] }
  },

  async save(packId, part, items, done) {
    return must(await supabase.rpc('learn_save', { p_pack: packId, p_part: part, p_items: items, p_done: !!done }))
  },

  async classes() { return must(await supabase.rpc('learn_my_classes')) || [] },
  async classOverview(classKey) { return must(await supabase.rpc('learn_class_overview', { p_class: classKey })) },
  async misses(packId) { return must(await supabase.rpc('learn_pack_misses', { p_pack: packId })) || [] },

  /** Open, hide or date a pack (a teacher of the class may change only these). */
  async updatePack(packId, patch) {
    const allowed = Object.fromEntries(Object.entries(patch).filter(([k]) => ['status', 'opens_on', 'due_on'].includes(k)))
    return must(await supabase.from('learn_packs').update(allowed).eq('id', packId).select('id, status, opens_on, due_on').single())
  },

  /** The learn-accounts Edge Function: make / reset / disable / enable. */
  async accounts(body) {
    const { data, error } = await supabase.functions.invoke('learn-accounts', { body })
    if (error) {
      let msg = error.message
      try { msg = (await error.context?.json())?.error || msg } catch { /* not JSON */ }
      throw problem('server', msg)
    }
    return data
  },

  /** Signed links (an hour) for a pack's pictures: { 'lift.webp': 'https://…' }. */
  async assetUrls(packId, names) {
    if (!names.length) return {}
    const { data, error } = await supabase.storage.from('learn-packs').createSignedUrls(names.map((n) => `${packId}/${n}`), 3600)
    if (error) return {}
    return Object.fromEntries((data || []).filter((d) => d.signedUrl).map((d) => [d.path.split('/').slice(1).join('/'), d.signedUrl]))
  },
}
