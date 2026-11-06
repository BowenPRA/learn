// Runs the real learn-accounts index.ts (imports swapped for fake-supabase.mjs) in Node
// against the real schema: The Current's files + current-hardening.sql + learn-schema.sql.
//   node test-function.mjs
import { makeDb, read } from '../current.mjs'
import { SEED, ID } from '../seed.mjs'
import { state, fakeJwt } from './fake-supabase.mjs'

let pass = 0, fail = 0
const ok = (label, cond, extra = '') => { cond ? pass++ : fail++; console.log(`${cond ? 'ok  ' : 'FAIL'} ${label}${extra ? ' — ' + extra : ''}`) }

state.db = await makeDb({ later: true })
await state.db.exec(SEED(true))
await state.db.exec(read('C:/Users/sbowe/learn/supabase/current-hardening.sql'))
await state.db.exec(read('C:/Users/sbowe/learn/supabase/learn-schema.sql'))
await state.db.exec('create unique index auth_users_email on auth.users (email)')
// Two more Year 5 students so a class has several.
await state.db.exec(`insert into adm_students (full_name, level, status, active, student_code) values
  ('Zz Year Five A', 'Year 5', 'active', true, 'S9101'), ('Zz Year Five B', 'Year 5', 'active', true, 'S9102')`)

let handler
const env = { SUPABASE_URL: 'http://fake', SUPABASE_SERVICE_ROLE_KEY: state.SERVICE, SUPABASE_ANON_KEY: 'anon-key' }
globalThis.Deno = { serve: (h) => { handler = h }, env: { get: (k) => env[k] } }
const logs = []
const realLog = console.log
console.log = (...a) => { logs.push(a.join(' ')); }
// The real index.ts with its two imports pointed at the fake client and lib.js, written to a temp file.
const { readFileSync, writeFileSync, mkdtempSync } = await import('node:fs')
const { tmpdir } = await import('node:os')
const { join } = await import('node:path')
const { pathToFileURL, fileURLToPath } = await import('node:url')
const here = fileURLToPath(new URL('.', import.meta.url))
const src = readFileSync(join(here, '../../../supabase/functions/learn-accounts/index.ts'), 'utf8')
  .replace("from 'npm:@supabase/supabase-js@2'", `from '${pathToFileURL(join(here, 'fake-supabase.mjs')).href}'`)
  .replace("from './lib.js'", `from '${pathToFileURL(join(here, '../../../supabase/functions/learn-accounts/lib.js')).href}'`)
const gen = join(mkdtempSync(join(tmpdir(), 'learn-accounts-')), 'index.ts')
writeFileSync(gen, src)
await import(pathToFileURL(gen).href)
console.log = realLog

const who = (email, role, sub = crypto.randomUUID()) => ({ sub, role: 'authenticated', email, app_metadata: role ? { role } : {} })
const DAVID = who('david@pra.edu.vn', 'teacher'), KIU = who('kiu@pra.edu.vn', 'teacher'), THAMV = who('tham.v@pra.edu.vn', null)
const OFFICE = who('hien.c@pra.edu.vn', 'admin'), STRANGER = who('someone@gmail.com', null), TRIAGE = who('triage@pra.edu.vn', 'triage')
async function call(claims, body, { auth = true, origin = 'https://learn.pra.edu.vn' } = {}) {
  const headers = { 'content-type': 'application/json', apikey: 'anon-key', origin }
  if (auth && claims) headers.Authorization = `Bearer ${fakeJwt(claims)}`
  console.log = (...a) => { logs.push(a.join(' ')) }
  try {
    const res = await handler(new Request('http://fake/functions/v1/learn-accounts', { method: 'POST', headers, body: JSON.stringify(body) }))
    return { status: res.status, body: await res.json(), cors: res.headers.get('access-control-allow-origin') }
  } finally { console.log = realLog }
}
const count = async (sql) => Number((await state.db.query(sql)).rows[0].n)

let r = await call(null, { action: 'make', class_key: 'math:Year 5' }, { auth: false })
ok('no sign-in: 401', r.status === 401)
r = await call({ sub: '', email: 'x' }, { action: 'make', class_key: 'math:Year 5' })
ok('a token with no user: 401', r.status === 401)
for (const [name, c] of [['stranger', STRANGER], ['teacher of another class (Kiu)', KIU], ['teacher of other year groups (Tham V)', THAMV], ['triage', TRIAGE]]) {
  r = await call(c, { action: 'make', class_key: 'math:Year 5' })
  ok(`${name} cannot make Year 5 Maths logins: 403`, r.status === 403, JSON.stringify(r.body))
}
ok('nothing was made by refused calls', await count(`select count(*) n from learn_accounts`) === 0)

r = await call(DAVID, { action: 'make', class_key: 'math:Year 5' })
const made = r.body.made || []
ok('the class\'s teacher makes logins for every enrolled Year 5 student (Pending included, Inactive not)', r.status === 200 && made.length === 4 && r.body.failed.length === 0, JSON.stringify(r.body).slice(0, 200))
ok('usernames are unique and fit the database rule', new Set(made.map((m) => m.username)).size === made.length && made.every((m) => /^[a-z]{3,10}[0-9]{2}$/.test(m.username)))
ok('PINs are 4 digits', made.every((m) => /^\d{4}$/.test(m.pin)))
const users = (await state.db.query(`select u.id, u.email, u.raw_app_meta_data m, a.username, a.student_id from auth.users u join learn_accounts a on a.user_id = u.id`)).rows
ok('each login: <username>@learn.pra.edu.vn, role student, its student id, PIN + "-learn" as password, email confirmed',
  users.length === 4 && users.every((u) => u.email === `${u.username}@learn.pra.edu.vn` && u.m.role === 'student' && u.m.student_id === u.student_id
    && state.passwords.get(u.id).password === made.find((m) => m.username === u.username).pin + '-learn' && state.passwords.get(u.id).email_confirm === true))
ok('learn_accounts.created_by is a name, not an email', (await state.db.query(`select distinct created_by from learn_accounts`)).rows.every((x) => x.created_by === 'Mr. David'))
const allLogs = () => logs.join('\n')
ok('nothing logged holds a PIN or a username', made.every((m) => !allLogs().includes(m.pin + '-learn') && !new RegExp(`\\b${m.pin}\\b`).test(allLogs()) && !allLogs().includes(m.username)), allLogs())

r = await call(DAVID, { action: 'make', class_key: 'math:Year 5' })
ok('calling make again makes nothing new', r.status === 200 && r.body.made.length === 0 && await count(`select count(*) n from learn_accounts`) === 4)
r = await call(DAVID, { action: 'make', class_key: 'math:Year 5', student_ids: [ID.sus, ID.s7] })
ok('student_ids outside the class are ignored', r.status === 200 && r.body.made.length === 0 && await count(`select count(*) n from learn_accounts`) === 4)

// Two make calls at the same moment for the same class (Year 7: one student).
const [a, b] = await Promise.all([call(OFFICE, { action: 'make', class_key: 'english:Year 7' }), call(OFFICE, { action: 'make', class_key: 'english:Year 7' })])
const y7 = await count(`select count(*) n from learn_accounts where student_id = '${ID.s7}'`)
const orphans = await count(`select count(*) n from auth.users u where u.email like '%@learn.pra.edu.vn' and not exists (select 1 from learn_accounts a where a.user_id = u.id)`)
ok('two make calls at once: one login for the student, no orphan auth user', y7 === 1 && orphans === 0, `logins ${y7}, orphans ${orphans}`)
ok('two make calls at once: the second reports the student as already done, not a raw database error',
  [a, b].every((x) => x.status === 200) && [...a.body.failed, ...b.body.failed].every((f) => !/duplicate key|violates/.test(f.reason)),
  JSON.stringify([a.body.failed, b.body.failed]))

// A username already taken in auth (an orphan from a crash): the function picks another.
let calls = 0
const realRandom = crypto.getRandomValues.bind(crypto)
crypto.getRandomValues = (buf) => { if (calls < 3) { calls++; buf.fill(0); return buf } return realRandom(buf) }
await state.db.exec(`insert into auth.users (id, email) values ('${crypto.randomUUID()}', 'ant22@learn.pra.edu.vn')`)
r = await call(OFFICE, { action: 'make', class_key: 'english:Upper Secondary' })
crypto.getRandomValues = realRandom
ok('a username whose address is already in auth is skipped for another', r.status === 200 && r.body.made.length === 1 && r.body.made[0].username !== 'ant22', JSON.stringify(r.body))

// reset / disable / enable
const anh = made.find((m) => m.student_id === ID.s5a)
r = await call(KIU, { action: 'reset', student_id: ID.s5a })
ok('reset by a teacher of the student\'s year group (Kiu, Year 5 English)', r.status === 200 && r.body.username === anh.username && /^\d{4}$/.test(r.body.pin), JSON.stringify(r.body))
const uid = (await state.db.query(`select user_id from learn_accounts where student_id = $1`, [ID.s5a])).rows[0].user_id
ok('the new PIN is the password', state.passwords.get(uid).password === r.body.pin + '-learn')
r = await call(STRANGER, { action: 'reset', student_id: ID.s5a })
ok('reset by a stranger: 403', r.status === 403)
r = await call(who(`${anh.username}@learn.pra.edu.vn`, 'student', uid), { action: 'reset', student_id: ID.s5a })
ok('reset by the student themselves: 403', r.status === 403)
r = await call(OFFICE, { action: 'reset', student_id: ID.sold })
ok('reset for a student with no login: 404', r.status === 404)
r = await call(DAVID, { action: 'disable', student_id: ID.s5a })
ok('disable: banned and marked inactive', r.status === 200 && state.bans.get(uid) === '876000h' && (await state.db.query(`select active from learn_accounts where user_id = $1`, [uid])).rows[0].active === false)
r = await call(DAVID, { action: 'enable', student_id: ID.s5a })
ok('enable: unbanned and active', r.status === 200 && state.bans.get(uid) === 'none' && (await state.db.query(`select active from learn_accounts where user_id = $1`, [uid])).rows[0].active === true)
r = await call(DAVID, { action: 'nope' })
ok('unknown action: 400', r.status === 400)
r = await call(DAVID, { action: 'make', class_key: "math:Year 5'; drop table x" })
ok('a bad class key: 400', r.status === 400)
r = await call(DAVID, { action: 'make', class_key: 'math:Year 5' }, { origin: 'https://evil.example' })
ok('CORS never echoes another site', r.cors === 'https://learn.pra.edu.vn')
ok('nothing logged across all calls holds a PIN', !/\d{4}-learn/.test(allLogs()))

console.log(`\n${pass} passed, ${fail} failed`)
process.exit(fail ? 1 : 0)
