// Finding 8: Reset PIN and Disable sign a student login out on every device.
// Runs the real learn-accounts index.ts (fake client, as test-function.mjs) on the real
// schema, with stand-ins for Supabase's auth.sessions and auth.refresh_tokens, which the
// review harness does not have. Their shape follows Supabase's auth schema (Nov 2026):
// sessions.user_id uuid; refresh_tokens.user_id varchar (the id as text) and
// refresh_tokens.session_id -> sessions(id) on delete cascade.
//   node tests/review/fn/test-sessions.mjs      (from C:\Users\sbowe\learn)
import { makeDb, read } from '../current.mjs'
import { SEED, ID } from '../seed.mjs'
import { state, fakeJwt } from './fake-supabase.mjs'
import { readFileSync, writeFileSync, mkdtempSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { pathToFileURL, fileURLToPath } from 'node:url'

let pass = 0, fail = 0
const ok = (label, cond, extra = '') => { cond ? pass++ : fail++; realLog(`${cond ? 'ok  ' : 'FAIL'} ${label}${extra ? ' — ' + extra : ''}`) }
const realLog = console.log

state.db = await makeDb({ later: true })
await state.db.exec(SEED(true))
await state.db.exec(read('C:/Users/sbowe/learn/supabase/current-hardening.sql'))
await state.db.exec(read('C:/Users/sbowe/learn/supabase/learn-schema.sql'))
await state.db.exec(`create unique index auth_users_email on auth.users (email);
create table auth.sessions (id uuid primary key, user_id uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz default now(), updated_at timestamptz, aal text, not_after timestamptz);
create table auth.refresh_tokens (id bigserial primary key, token varchar(255) unique, user_id varchar(255),
  revoked boolean default false, created_at timestamptz default now(), updated_at timestamptz, parent varchar(255),
  session_id uuid references auth.sessions(id) on delete cascade);`)

let handler
const env = { SUPABASE_URL: 'http://fake', SUPABASE_SERVICE_ROLE_KEY: state.SERVICE, SUPABASE_ANON_KEY: 'anon-key' }
globalThis.Deno = { serve: (h) => { handler = h }, env: { get: (k) => env[k] } }
const logs = []
const here = fileURLToPath(new URL('.', import.meta.url))
const src = readFileSync(join(here, '../../../supabase/functions/learn-accounts/index.ts'), 'utf8')
  .replace("from 'npm:@supabase/supabase-js@2'", `from '${pathToFileURL(join(here, 'fake-supabase.mjs')).href}'`)
  .replace("from './lib.js'", `from '${pathToFileURL(join(here, '../../../supabase/functions/learn-accounts/lib.js')).href}'`)
const gen = join(mkdtempSync(join(tmpdir(), 'learn-accounts-')), 'index.ts')
writeFileSync(gen, src)
await import(pathToFileURL(gen).href)

const who = (email, role, sub = crypto.randomUUID()) => ({ sub, role: 'authenticated', email, app_metadata: role ? { role } : {} })
const DAVID = who('david@pra.edu.vn', 'teacher'), OFFICE = who('hien.c@pra.edu.vn', 'admin'), STRANGER = who('someone@gmail.com', null)
async function call(claims, body) {
  const headers = { 'content-type': 'application/json', apikey: 'anon-key', origin: 'https://learn.pra.edu.vn', Authorization: `Bearer ${fakeJwt(claims)}` }
  console.log = (...a) => { logs.push(a.join(' ')) }
  try {
    const res = await handler(new Request('http://fake/functions/v1/learn-accounts', { method: 'POST', headers, body: JSON.stringify(body) }))
    return { status: res.status, body: await res.json() }
  } finally { console.log = realLog }
}
const q = async (sql, p = []) => (await state.db.query(sql, p)).rows
const n = async (sql, p = []) => Number((await q(sql, p))[0].n)

// Logins for Year 5 Maths, then two devices signed in for each, plus an old-style
// refresh token with no session, and a staff login with a session of its own.
let r = await call(DAVID, { action: 'make', class_key: 'math:Year 5' })
ok('setup: logins made', r.status === 200 && r.body.made.length >= 2, JSON.stringify(r.body).slice(0, 160))
const logins = await q(`select user_id, student_id from learn_accounts`)
const signIn = async (uid) => {
  const sid = crypto.randomUUID()
  await state.db.query(`insert into auth.sessions (id, user_id) values ($1, $2)`, [sid, uid])
  await state.db.query(`insert into auth.refresh_tokens (token, user_id, session_id) values ($1, $2, $3)`, [crypto.randomUUID(), uid, sid])
  return sid
}
for (const l of logins) { await signIn(l.user_id); await signIn(l.user_id) }
const anh = logins.find((l) => l.student_id === ID.s5a).user_id
const other = logins.find((l) => l.student_id !== ID.s5a).user_id
await state.db.query(`insert into auth.refresh_tokens (token, user_id, session_id) values ('legacy-token', $1, null)`, [anh])
const staffId = crypto.randomUUID()
await state.db.exec(`insert into auth.users (id, email) values ('${staffId}', 'kiu@pra.edu.vn')`)
await signIn(staffId)
const sessionsOf = (uid) => n(`select count(*) n from auth.sessions where user_id = $1`, [uid])
const tokensOf = (uid) => n(`select count(*) n from auth.refresh_tokens where user_id = $1`, [String(uid)])

// Reset code
r = await call(DAVID, { action: 'reset', student_id: ID.s5a })
ok('reset: the code comes back', r.status === 200 && /^\d{3,}$/.test(r.body.pin), JSON.stringify(r.body))
ok('reset: reply says signed out, 2 sessions ended, no warning', r.body.signed_out === true && r.body.sessions_ended === 2 && !r.body.warning, JSON.stringify(r.body))
ok('reset: the student has no sessions left', await sessionsOf(anh) === 0)
ok('reset: no refresh tokens left (incl. one with no session)', await tokensOf(anh) === 0)
ok('reset: other students keep their sessions', await sessionsOf(other) === 2 && await tokensOf(other) === 2)
ok('reset: the staff login keeps its session', await sessionsOf(staffId) === 1)

// Disable, then enable: the old device does not come back.
const sid = await signIn(anh)
r = await call(DAVID, { action: 'disable', student_id: ID.s5a })
ok('disable: blocked, inactive, signed out', r.status === 200 && r.body.active === false && r.body.signed_out === true && r.body.sessions_ended === 1
  && state.bans.get(anh) === '876000h', JSON.stringify(r.body))
ok('disable: the device\'s session and refresh token are gone', await n(`select count(*) n from auth.sessions where id = $1`, [sid]) === 0 && await tokensOf(anh) === 0)
r = await call(DAVID, { action: 'enable', student_id: ID.s5a })
ok('enable: active again, and no old session came back', r.status === 200 && r.body.active === true && await sessionsOf(anh) === 0, JSON.stringify(r.body))
r = await call(OFFICE, { action: 'reset', student_id: ID.s5a })
ok('reset with nothing signed in: signed out, 0 ended', r.status === 200 && r.body.signed_out === true && r.body.sessions_ended === 0, JSON.stringify(r.body))

// Refused callers never reach it.
const before = await sessionsOf(other)
r = await call(STRANGER, { action: 'reset', student_id: logins.find((l) => l.user_id === other).student_id })
ok('a stranger\'s reset: 403, sessions untouched', r.status === 403 && await sessionsOf(other) === before)

// The helper itself: service role only, student logins only.
const asRole = async (role, claims, sql, p = []) => {
  await state.db.exec('begin')
  try {
    await state.db.query(`select set_config('request.jwt.claims', $1, true)`, [JSON.stringify(claims)])
    await state.db.exec(`set local role ${role}`)
    return { ok: true, rows: (await state.db.query(sql, p)).rows }
  } catch (e) { return { ok: false, err: e.message } } finally { await state.db.exec('rollback') }
}
let x = await asRole('authenticated', { ...OFFICE }, `select learn_end_sessions($1)`, [other])
ok('office signed in cannot call learn_end_sessions directly', !x.ok && /permission denied/.test(x.err), x.err)
x = await asRole('authenticated', { sub: other, role: 'authenticated', email: 'x@learn.pra.edu.vn', app_metadata: { role: 'student' } }, `select learn_end_sessions($1)`, [other])
ok('a student cannot call it', !x.ok && /permission denied/.test(x.err), x.err)
x = await asRole('anon', { role: 'anon' }, `select learn_end_sessions($1)`, [other])
ok('anon cannot call it', !x.ok && /permission denied/.test(x.err), x.err)
x = await asRole('service_role', { role: 'service_role' }, `select learn_end_sessions($1)`, [staffId])
ok('service role cannot sign out a staff login with it', !x.ok && /Only a PRA Learn student login/.test(x.err) && await sessionsOf(staffId) === 1, x.err)
x = await asRole('service_role', { role: 'service_role' }, `select learn_end_sessions($1) n`, [other])
ok('service role signs out a student login', x.ok && x.rows[0].n === 2, x.err || JSON.stringify(x.rows))

// If Supabase refuses the delete (or the tables are elsewhere), the code still comes back, with a warning.
await state.db.exec(`alter table auth.sessions rename to sessions_hidden`)
r = await call(DAVID, { action: 'reset', student_id: ID.s5a })
ok('sign-out fails: the code still comes back, signed_out false, a warning', r.status === 200 && /^\d{3,}$/.test(r.body.pin)
  && r.body.signed_out === false && /not signed out/.test(r.body.warning), JSON.stringify(r.body))
r = await call(DAVID, { action: 'disable', student_id: ID.s5a })
ok('sign-out fails on disable: still blocked, with a warning', r.status === 200 && r.body.active === false && r.body.signed_out === false && /not signed out/.test(r.body.warning), JSON.stringify(r.body))
await state.db.exec(`alter table auth.sessions_hidden rename to sessions`)

ok('nothing logged holds a code, a user id or an error text', !/\d{3,}-learn/.test(logs.join('\n')) && !logs.join('\n').includes(anh)
  && !/relation|does not exist/.test(logs.join('\n')), logs.join(' | '))

realLog(`\n${pass} passed, ${fail} failed`)
process.exit(fail ? 1 : 0)
