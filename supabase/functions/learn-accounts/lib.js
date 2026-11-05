// The parts of learn-accounts that need no network: usernames, PINs, the login
// email and password, and reading a request. Plain JavaScript so the Edge Function
// (Deno) and the tests (Node, tests/accounts.test.mjs) share one copy.

export const LOGIN_DOMAIN = 'learn.pra.edu.vn'
export const PIN_LENGTH = 4
export const PASSWORD_SUFFIX = '-learn' // public; only there because Supabase wants 6 characters or more
export const MAX_MAKE = 60

// Easy English nouns a child of 8 can read and spell: animals, fruit, weather,
// space, things at home. 3 to 8 letters, no names, nothing that reads as a word
// for a person.
export const WORDS = [
  'ant', 'bat', 'bear', 'bee', 'bird', 'cat', 'crab', 'cow', 'deer', 'dog', 'duck', 'eagle', 'eel', 'fish', 'fox',
  'frog', 'goat', 'goose', 'hen', 'horse', 'koala', 'lamb', 'lion', 'llama', 'mole', 'moose', 'moth', 'mouse', 'newt',
  'otter', 'owl', 'panda', 'parrot', 'pig', 'pony', 'puffin', 'rabbit', 'robin', 'seal', 'shark', 'sheep', 'snail',
  'squid', 'swan', 'tiger', 'toad', 'turtle', 'whale', 'wolf', 'yak', 'zebra', 'gecko', 'lizard', 'beetle', 'camel',
  'apple', 'banana', 'cherry', 'coconut', 'grape', 'guava', 'kiwi', 'lemon', 'lime', 'mango', 'melon', 'olive',
  'orange', 'papaya', 'peach', 'pear', 'plum', 'lychee', 'carrot', 'pepper', 'potato', 'tomato', 'pumpkin', 'bean',
  'cloud', 'rain', 'snow', 'storm', 'wind', 'sun', 'moon', 'star', 'comet', 'planet', 'rocket', 'meteor', 'orbit',
  'river', 'ocean', 'island', 'forest', 'hill', 'lake', 'leaf', 'tree', 'flower', 'seed', 'shell', 'stone', 'sand',
  'kite', 'drum', 'bell', 'boat', 'bus', 'train', 'bike', 'ship', 'lamp', 'clock', 'cup', 'spoon', 'brush', 'pencil',
  'paper', 'book', 'chair', 'table', 'window', 'door', 'key', 'box', 'ball', 'button', 'candle', 'basket', 'ladder',
  'bridge', 'castle', 'tower', 'garden', 'lantern', 'paddle', 'anchor', 'compass', 'magnet', 'robot', 'violin', 'piano',
]
// 2 to 9 only: no 0 to mistake for O, no 1 to mistake for l.
const DIGITS = '23456789'

/** A random whole number from 0 to n - 1, from the platform's secure random source. */
export function randomBelow(n) {
  const max = Math.floor(0x100000000 / n) * n
  const buf = new Uint32Array(1)
  for (;;) {
    globalThis.crypto.getRandomValues(buf)
    if (buf[0] < max) return buf[0] % n
  }
}

/** 'otter27': a word and two digits, not in `taken` (a Set of usernames already used). */
export function makeUsername(taken = new Set(), rand = randomBelow) {
  for (let i = 0; i < 200; i += 1) {
    const name = WORDS[rand(WORDS.length)] + DIGITS[rand(DIGITS.length)] + DIGITS[rand(DIGITS.length)]
    if (!taken.has(name)) return name
  }
  throw new Error('Could not find a free username.')
}

/** Whether a PIN is too easy to guess: one digit repeated, a run up or down, or a pair repeated (1212). */
export function easyPin(pin) {
  const d = [...pin].map(Number)
  if (d.every((x) => x === d[0])) return true
  const up = d.every((x, i) => i === 0 || x === (d[i - 1] + 1) % 10)
  const down = d.every((x, i) => i === 0 || x === (d[i - 1] + 9) % 10)
  if (up || down) return true
  if (d.length === 4 && d[0] === d[2] && d[1] === d[3]) return true
  return false
}

/** A random PIN of `length` digits that is not easy to guess. */
export function makePin(length = PIN_LENGTH, rand = randomBelow) {
  for (;;) {
    let pin = ''
    for (let i = 0; i < length; i += 1) pin += String(rand(10))
    if (!easyPin(pin)) return pin
  }
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
