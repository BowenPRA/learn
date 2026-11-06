// Demo mode: the same methods as live.js, with made-up data kept in this browser.
// No real student is in here: the class is "Learner A" to "Learner L" with made-up
// usernames. Mr. David is the teacher, as in the pilot.
import { PACK_Y5_NEGATIVES, PACK_Y5_ORDERING, PACK_Y5_WORDS } from './packY5Negatives.js'
// Mr. David's real lesson, made by scripts/deck-to-pack.mjs from the classroom deck
// (packs/y5-math-u5-below-zero: overlay.mjs is the input, pack.json + assets/ the output).
import PACK_Y5_BELOW_ZERO from '../../../packs/y5-math-u5-below-zero/pack.json'
import { partIds, partSummary, partsOf, scoreOf } from '../../pack/model.js'
import { slipsByKey } from '../../stepPractice/model.js'
import { makePin, makeUsername } from '../../../supabase/functions/learn-accounts/lib.js'
import { problem } from '../problem.js'

const KEY = 'learn-demo-v4'
const WHO = 'learn-demo-who'
const ME = 'demo-s-A'
const DAY = 86400000
const iso = (d) => new Date(d).toISOString()
const dayIso = (offset) => {
  const d = new Date(Date.now() + offset * DAY)
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

const CONTENT = { 'demo-p-ord': PACK_Y5_ORDERING, 'demo-p-neg': PACK_Y5_NEGATIVES, 'demo-p-zero': PACK_Y5_BELOW_ZERO, 'demo-p-words': PACK_Y5_WORDS }
// A pack's pictures: in demo mode they are served from the repo (Vite gives each a link).
const ASSET_URLS = Object.fromEntries(Object.entries(import.meta.glob('../../../packs/*/assets/*', { eager: true, query: '?url', import: 'default' }))
  .map(([path, url]) => { const [, slug, file] = /packs\/([^/]+)\/assets\/(.+)$/.exec(path); return [`${slug}/${file}`, url] }))
const USERNAMES = ['otter27', 'mango43', 'rocket58', 'panda36', 'kiwi72', 'comet49', 'lemon83', 'turtle65', 'seal24', 'kite97', 'robin38', null]

/** The slip keys of one practice item, as the step engine reports them. */
function slipKeysOf(content, partId, itemId) {
  const part = partsOf(content).find((p) => p.id === partId)
  if (part?.kind !== 'practice') return []
  return Object.keys(slipsByKey(part.set?.items?.find((it) => it.id === itemId)))
}

// A small fixed random source, so the demo class looks the same every time.
function rng(seed) {
  let h = seed >>> 0
  return () => { h = Math.imul(h ^ (h >>> 15), 2246822507) >>> 0; h = Math.imul(h ^ (h >>> 13), 3266489909) >>> 0; return ((h ^= h >>> 16) >>> 0) / 4294967296 }
}

function seed() {
  const r = rng(20261105)
  const students = 'ABCDEFGHIJKL'.split('').map((c, i) => ({
    id: `demo-s-${c}`, name: `Learner ${c}`, full_name: `Learner ${c}`, username: USERNAMES[i],
    login: USERNAMES[i] ? (c === 'K' ? 'off' : 'on') : 'none',
    last_seen: USERNAMES[i] && c !== 'K' ? iso(Date.now() - (1 + Math.floor(r() * 70)) * 3600000) : null,
  }))
  const packs = [
    { id: 'demo-p-ord', status: 'published', opens_on: null, due_on: dayIso(-6), published_at: iso(Date.now() - 9 * DAY), version: 1 },
    { id: 'demo-p-neg', status: 'published', opens_on: null, due_on: dayIso(-1), published_at: iso(Date.now() - 4 * DAY), version: 1 },
    { id: 'demo-p-zero', status: 'published', opens_on: null, due_on: dayIso(4), published_at: iso(Date.now() - 1 * DAY), version: 1 },
    { id: 'demo-p-words', status: 'draft', opens_on: null, due_on: null, published_at: null, version: 1 },
  ]
  // How hard each question was for this made-up class (chance of a wrong first answer).
  const hard = { o1: 0.1, o2: 0.35, o3: 0.05, c1: 0.05, c2: 0.2, c3: 0.4, c4: 0.6, c5: 0.3, c6: 0.35, c7: 0.45, c9: 0.3, c10: 0.2, c13: 0.5, c15: 0.55, c17: 0.35, c19: 0.25, c23: 0.3 }
  const progress = []
  const run = (sid, packId, part, howFar, skill) => {
    const content = CONTENT[packId]
    const ids = partIds(content, part)
    const n = Math.round(ids.length * howFar)
    const items = {}
    for (const id of ids.slice(0, n)) {
      const miss = r() < (hard[id] ?? 0.3) * (1.4 - skill)
      const item = { ok: !miss, tries: miss ? 2 : 1, hints: miss && r() < 0.5 ? 1 : 0, shown: part === 'practice' && miss, slips: [] }
      // Practice: most misses come from a slip the item names (the first one most often),
      // and now and then a clean finish had a wrong turn on the way.
      const keys = slipKeysOf(content, part, id)
      if (keys.length && (miss ? r() < 0.85 : r() < 0.15)) {
        item.slips.push(r() < 0.55 ? keys[0] : keys[Math.floor(r() * keys.length)])
        if (miss && keys.length > 1 && r() < 0.2) item.slips = [...new Set([...item.slips, keys[Math.floor(r() * keys.length)]])]
        if (!miss) item.tries = 2
      }
      items[id] = item
    }
    const done = n === ids.length
    const score = scoreOf(content, part, items)
    progress.push({
      student_id: sid, pack_id: packId, part, items, first_items: done ? items : null, done, run_open: !done,
      score, first_score: done ? score : null, best_score: done ? score : null, runs: done ? 1 : 0,
      updated_at: iso(Date.now() - Math.floor(r() * 48) * 3600000),
    })
  }
  const skills = { B: 0.9, C: 0.7, D: 0.5, E: 0.8, F: 0.6, G: 0.4, H: 0.75, I: 0.55, J: 0.65, K: 0.5 }
  for (const [c, skill] of Object.entries(skills)) run(`demo-s-${c}`, 'demo-p-ord', 'review', c === 'K' ? 0.34 : 1, skill)
  run(ME, 'demo-p-ord', 'review', 1, 0.6)
  for (const c of 'BCDEFG') run(`demo-s-${c}`, 'demo-p-neg', 'review', 1, skills[c])
  run('demo-s-H', 'demo-p-neg', 'review', 0.5, skills.H)
  run('demo-s-B', 'demo-p-neg', 'practice', 1, skills.B)
  run('demo-s-C', 'demo-p-neg', 'practice', 1, skills.C)
  run('demo-s-E', 'demo-p-neg', 'practice', 0.4, skills.E)
  // Mr. David's lesson, opened yesterday: some of the class has started.
  for (const c of 'BCDEF') run(`demo-s-${c}`, 'demo-p-zero', 'review', 1, skills[c])
  run('demo-s-G', 'demo-p-zero', 'review', 0.4, skills.G)
  for (const c of 'BCE') run(`demo-s-${c}`, 'demo-p-zero', 'practice', c === 'E' ? 0.5 : 1, skills[c])
  run('demo-s-B', 'demo-p-zero', 'words', 1, skills.B)
  run('demo-s-C', 'demo-p-zero', 'words', 0.6, skills.C)
  // More of the class on the practice parts, so the teacher's "Common slips" has something to say.
  for (const c of 'DFGIJ') run(`demo-s-${c}`, 'demo-p-neg', 'practice', c === 'J' ? 0.5 : 1, skills[c])
  for (const c of 'DFH') run(`demo-s-${c}`, 'demo-p-zero', 'practice', c === 'H' ? 0.6 : 1, skills[c])
  for (const c of 'EF') run(`demo-s-${c}`, 'demo-p-zero', 'words', 1, skills[c])
  return { students, packs, progress }
}

let db = null
const load = () => {
  if (db) return db
  try { db = JSON.parse(localStorage.getItem(KEY) || 'null') } catch { db = null }
  if (!db?.students) db = seed()
  return db
}
const persist = () => { try { localStorage.setItem(KEY, JSON.stringify(db)) } catch { /* private window: memory only */ } }
const who = () => { try { return sessionStorage.getItem(WHO) || '' } catch { return '' } }
const listeners = new Set()
const tell = () => { const s = sessionOf(); for (const cb of listeners) cb(s) }
const sessionOf = () => {
  const w = who()
  return w ? { user: { id: w === 'student' ? 'demo-user-A' : 'demo-user-david', app_metadata: { role: w === 'student' ? 'student' : 'teacher' } } } : null
}
const fullPack = (meta) => {
  const c = CONTENT[meta.id]
  return { ...meta, slug: c.slug, class_key: c.class_key, title: c.title, title_vn: c.titleVn, content: c, request_id: null }
}
const wait = (v) => new Promise((resolve) => setTimeout(() => resolve(v), 120))

export const demo = {
  demo: true,
  async session() { return sessionOf() },
  onChange(cb) { listeners.add(cb); return () => listeners.delete(cb) },

  async signInStudent(username, pin) {
    load()
    if (String(username).trim().toLowerCase() !== 'otter27' || String(pin).trim() !== '4821') throw problem('wrong')
    try { sessionStorage.setItem(WHO, 'student') } catch { /* ignore */ }
    tell()
  },
  async signInStaff() {
    try { sessionStorage.setItem(WHO, 'teacher') } catch { /* ignore */ }
    tell()
  },
  async signInAs(kind) {
    try { sessionStorage.setItem(WHO, kind) } catch { /* ignore */ }
    tell()
  },
  async signOut() {
    try { sessionStorage.removeItem(WHO) } catch { /* ignore */ }
    tell()
  },
  reset() { db = seed(); persist() },

  async me(session) {
    if (!session) return null
    load()
    if (who() === 'student') return { kind: 'student', student_id: ME, name: 'Learner A', year_group: 'Year 5', username: 'otter27' }
    return { kind: 'staff', name: 'Mr. David', classes: await this.classes() }
  },

  async myPacks() {
    load()
    const packs = db.packs.filter((p) => p.status === 'published').map(fullPack)
      .sort((a, b) => String(b.published_at).localeCompare(String(a.published_at)))
    return wait({ packs, progress: db.progress.filter((g) => g.student_id === ME) })
  },

  async pack(slug) {
    load()
    const meta = db.packs.find((p) => CONTENT[p.id].slug === slug)
    if (!meta) return null
    if (who() === 'student' && meta.status !== 'published') return null
    const progress = who() === 'student' ? db.progress.filter((g) => g.pack_id === meta.id && g.student_id === ME) : []
    return wait({ pack: fullPack(meta), progress })
  },

  async save(packId, part, items, done) {
    load()
    if (who() !== 'student') throw problem('server', 'Only a student login can save progress.')
    const content = CONTENT[packId]
    const ids = new Set(partIds(content, part))
    const clean = Object.fromEntries(Object.entries(items || {}).filter(([k]) => ids.has(k)))
    const score = scoreOf(content, part, clean)
    let row = db.progress.find((g) => g.student_id === ME && g.pack_id === packId && g.part === part)
    if (!row) {
      row = { student_id: ME, pack_id: packId, part, items: clean, first_items: null, done: false, run_open: true, score, first_score: null, best_score: null, runs: 0 }
      db.progress.push(row)
    }
    const finishing = done && row.run_open
    Object.assign(row, {
      items: clean, score, done: row.done || !!done, updated_at: iso(Date.now()),
      runs: row.runs + (finishing ? 1 : 0),
      first_items: row.first_items || (done ? clean : null),
      first_score: row.first_score ?? (done ? score : null),
      best_score: finishing ? Math.max(row.best_score || 0, score) : row.best_score,
      run_open: !done,
    })
    persist()
    return wait({ ...row })
  },

  async classes() {
    load()
    const logins = db.students.filter((s) => s.login === 'on').length
    return [
      { class_key: 'math:Year 5', packs: db.packs.length, students: db.students.length, logins },
      { class_key: 'english:Year 7', packs: 0, students: 9, logins: 0 },
    ]
  },

  async classOverview(classKey) {
    load()
    if (classKey !== 'math:Year 5') return { class_key: classKey, students: [], packs: [], progress: [] }
    return wait({
      class_key: classKey,
      students: db.students.map((s) => ({ ...s })),
      packs: db.packs.map((m) => { const p = fullPack(m); return { id: p.id, slug: p.slug, title: p.title, title_vn: p.title_vn, status: p.status, opens_on: p.opens_on, due_on: p.due_on, version: p.version, published_at: p.published_at, parts: partSummary(p.content) } })
        .sort((a, b) => String(b.published_at || '9').localeCompare(String(a.published_at || '9'))),
      progress: db.progress.map((g) => ({ ...g })),
    })
  },

  async misses(packId) {
    load()
    const by = new Map()
    for (const g of db.progress.filter((x) => x.pack_id === packId)) {
      for (const [id, v] of Object.entries(g.first_items || g.items || {})) {
        const k = `${g.part}|${id}`
        const m = by.get(k) || { part: g.part, id, asked: 0, wrong_first: 0, slips: {}, slip_who: {} }
        m.asked += 1
        if (!v.ok) m.wrong_first += 1
        for (const s of v.slips || []) {
          m.slips[s] = (m.slips[s] || 0) + 1
          m.slip_who[s] = [...(m.slip_who[s] || []), g.student_id]
        }
        by.set(k, m)
      }
    }
    return wait([...by.values()].sort((a, b) => a.part.localeCompare(b.part) || b.wrong_first - a.wrong_first))
  },

  async updatePack(packId, patch) {
    load()
    const meta = db.packs.find((p) => p.id === packId)
    for (const k of ['status', 'opens_on', 'due_on']) if (k in patch) meta[k] = patch[k] || null
    if (patch.status === 'published' && !meta.published_at) meta.published_at = iso(Date.now())
    persist()
    return wait({ id: meta.id, status: meta.status, opens_on: meta.opens_on, due_on: meta.due_on })
  },

  async accounts(body) {
    load()
    const taken = new Set(db.students.map((s) => s.username).filter(Boolean))
    if (body.action === 'make') {
      const made = []
      for (const s of db.students.filter((x) => !x.username && (!body.student_ids || body.student_ids.includes(x.id)))) {
        s.username = makeUsername(taken)
        taken.add(s.username)
        s.login = 'on'
        made.push({ student_id: s.id, name: s.name, username: s.username, pin: makePin() })
      }
      persist()
      return wait({ made, failed: [] })
    }
    const s = db.students.find((x) => x.id === body.student_id)
    if (!s?.username) throw problem('server', 'This student has no login yet. Make one first.')
    if (body.action === 'reset') return wait({ student_id: s.id, username: s.username, pin: makePin() })
    s.login = body.action === 'disable' ? 'off' : 'on'
    persist()
    return wait({ student_id: s.id, active: s.login === 'on' })
  },

  async assetUrls(packId, files) {
    const slug = CONTENT[packId]?.slug
    return Object.fromEntries((files || []).map((f) => [f, ASSET_URLS[`${slug}/${f}`]]).filter(([, u]) => u))
  },
}
