// The parts of learn-accounts that need no network: the login name, the secret
// code, the login email and password, and reading a request. Plain JavaScript so
// the Edge Function (Deno), the sign-in page and the tests (Node,
// tests/accounts.test.mjs) share one copy.
//
// Logins work like the old Dashboard's (Bowen, 6 November 2026): a student types
// their nickname (accents, spaces and punctuation ignored: a nickname typed with or
// without its accents is the same login) and a secret code, their PRA student number padded to 3 digits
// (S0024 -> 024).

export const LOGIN_DOMAIN = 'learn.pra.edu.vn'
export const CODE_LENGTH = 3
export const PASSWORD_SUFFIX = '-learn' // public; only there because Supabase wants 6 characters or more
export const MAX_MAKE = 60
// The login name: lower-case letters and digits, 2 to 20 of them. The database
// checks the same rule (learn_accounts_username_check).
export const USERNAME_RE = /^[a-z0-9]{2,20}$/

/** Lower-case ASCII letters and digits only: accents dropped, d-stroke -> d, spaces and punctuation gone ('Anh Thu' -> 'anhthu'). */
export function foldName(text) {
  return String(text || '')
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[\u0111\u0110]/g, 'd')
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '')
}

/** The login name for a student row: the nickname, else the first name, else the full name. */
export function usernameFor(student) {
  const s = student || {}
  const from = [s.nickname, s.first_name, s.full_name, s.name].find((x) => String(x || '').trim())
  return foldName(from)
}

/** The secret code from a student number: 'S0024' -> '024', 'S0140' -> '140', 'S1203' -> '1203'. Null without digits. */
export function codeFor(studentCode) {
  const digits = String(studentCode || '').replace(/\D/g, '')
  if (!digits) return null
  return String(Number(digits)).padStart(CODE_LENGTH, '0')
}

export const loginEmail = (username) => `${username}@${LOGIN_DOMAIN}`
export const passwordFor = (pin) => `${pin}${PASSWORD_SUFFIX}`

export class Problem extends Error {
  constructor(message, status = 400) { super(message); this.status = status }
}

const CLASS_RE = /^[a-z_]+:[A-Za-z0-9 ]+$/
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

/** Read and check a request body: { action, class_key?, student_ids?, student_id? }. */
export function parseRequest(body) {
  const b = body && typeof body === 'object' ? body : {}
  const action = String(b.action || '')
  if (action === 'make') {
    const classKey = String(b.class_key || '')
    if (!CLASS_RE.test(classKey)) throw new Problem('Say which class: class_key like "math:Year 5".')
    let ids = null
    if (b.student_ids != null) {
      if (!Array.isArray(b.student_ids) || !b.student_ids.every((x) => UUID_RE.test(String(x)))) throw new Problem('student_ids must be a list of student ids.')
      if (b.student_ids.length > MAX_MAKE) throw new Problem(`At most ${MAX_MAKE} logins at a time.`)
      ids = [...new Set(b.student_ids.map(String))]
    }
    return { action, classKey, studentIds: ids }
  }
  if (['reset', 'disable', 'enable'].includes(action)) {
    const id = String(b.student_id || '')
    if (!UUID_RE.test(id)) throw new Problem('Say which student: student_id.')
    return { action, studentId: id }
  }
  throw new Problem('Unknown action. Use make, reset, disable or enable.')
}

/** The students `make` should make logins for: enrolled, without a login, and listed (when a list is given). */
export function toMake(students, studentIds = null) {
  const wanted = studentIds ? new Set(studentIds) : null
  return students.filter((s) => !s.username && (!wanted || wanted.has(s.student_id)))
}

/** CORS headers for a request from `origin`: only PRA's sites and the dev server. */
export const ORIGINS = ['https://learn.pra.edu.vn', 'https://current.pra.edu.vn', 'http://localhost:5201']
export function corsFor(origin) {
  return {
    'Access-Control-Allow-Origin': ORIGINS.includes(origin) ? origin : ORIGINS[0],
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    Vary: 'Origin',
  }
}
