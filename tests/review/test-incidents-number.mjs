// Finding 3: incident numbers in updates-2026-11-03-incidents.sql come from
// adm_incident_next_number() (security definer, advisory lock, staff only), so a teacher
// can file a student incident after an office-only incident took the top number.
// Run from C:\Users\sbowe\learn:  node tests/review/test-incidents-number.mjs
import { makeDb, as } from './current.mjs'
import { SEED, ID } from './seed.mjs'

let pass = 0, fail = 0
const ok = (l, c, x = '') => { c ? pass++ : fail++; console.log(`${c ? 'ok  ' : 'FAIL'} ${l}${x ? ' — ' + x : ''}`) }

const KIU = { email: 'kiu@pra.edu.vn', app_metadata: { role: 'teacher' } }
const NOROLE = { email: 'tham.v@pra.edu.vn' }       // a teacher made with Create login (no role)
const HIEN = { email: 'hien.c@pra.edu.vn', app_metadata: { role: 'admin' } }
const STRANGER = { email: 'someone@gmail.com', sub: '00000000-0000-4000-8000-0000000000bb' }
const STUDENT = { email: 'otter27@learn.pra.edu.vn', app_metadata: { role: 'student' } }

/** Several statements as one caller, in one transaction, rolled back. */
async function asMany(db, claims, steps) {
  await db.exec('begin')
  try {
    const c = { role: 'authenticated', sub: claims.sub || '00000000-0000-4000-8000-0000000000aa', ...claims }
    await db.query(`select set_config('request.jwt.claims', $1, true)`, [JSON.stringify(c)])
    await db.exec('set local role authenticated')
    const out = []
    for (const s of steps) out.push((await db.query(s)).rows)
    return { ok: true, out }
  } catch (e) {
    return { ok: false, err: e.message }
  } finally {
    await db.exec('rollback')
  }
}

const ins = (kind, extra = '') =>
  `insert into adm_incidents (kind, type, happened_on, student_ids${extra ? ', number' : ''})
   values ('${kind}', 'injury', '2026-11-04', ${kind === 'student' ? `array['${ID.s5a}'::uuid]` : `'{}'`}${extra ? ', ' + extra : ''})
   returning number`

const db = await makeDb({ later: true })
await db.exec(SEED(true))
// The seed (as the database owner, no login) made a student incident (1) and an office-only one (2).
const top = await db.query(`select number, kind from adm_incidents order by number`)
ok('seed: the office-only incident holds the top number', top.rows.at(-1)?.kind === 'staff' && top.rows.at(-1)?.number === 2,
  JSON.stringify(top.rows))

const sees = await as(db, KIU, 'select count(*)::int n, coalesce(max(number), 0) m from adm_incidents')
ok('the teacher cannot see the office-only incident', sees.ok && sees.rows[0].m === 1, sees.err || JSON.stringify(sees.rows))

const r1 = await as(db, KIU, ins('student'))
ok('a teacher files a student incident after an office-only one: number 3', r1.ok && r1.rows[0].number === 3, r1.err || JSON.stringify(r1.rows))

const r1b = await as(db, NOROLE, ins('student'))
ok('a Create-login teacher (no role, on the Teachers list) too: number 3', r1b.ok && r1b.rows[0].number === 3, r1b.err || JSON.stringify(r1b.rows))

const r2 = await asMany(db, KIU, [ins('student'), ins('student')])
ok('two incidents in one go each get their own number (3, 4)',
  r2.ok && r2.out[0][0].number === 3 && r2.out[1][0].number === 4, r2.err || JSON.stringify(r2.out))

const r3 = await asMany(db, KIU, [ins('student'),
  `select count(*)::int n from pg_locks where locktype = 'advisory' and pid = pg_backend_pid() and granted`])
ok('the number lock is held until the incident is saved (two at once take turns)',
  r3.ok && r3.out[1][0].n >= 1, r3.err || JSON.stringify(r3.out))

const r4 = await as(db, KIU, ins('student', '99'))
ok('a teacher cannot choose the number', r4.ok && r4.rows[0].number === 3, r4.err || JSON.stringify(r4.rows))

const r5 = await as(db, HIEN, ins('staff', '50'))
ok('an office account may bring a number (an import)', r5.ok && r5.rows[0].number === 50, r5.err || JSON.stringify(r5.rows))

const r6 = await asMany(db, HIEN, [ins('staff'), ins('student')])
ok('office: a staff then a student incident, 3 then 4', r6.ok && r6.out[0][0].number === 3 && r6.out[1][0].number === 4,
  r6.err || JSON.stringify(r6.out))

const r7 = await as(db, STRANGER, 'select adm_incident_next_number() n')
ok('a stranger from open sign-up is refused the number', !r7.ok && /Only staff/.test(r7.err), r7.err || JSON.stringify(r7.rows))

const r8 = await as(db, STRANGER, ins('student'))
ok('a stranger cannot add an incident', !r8.ok, r8.err || JSON.stringify(r8.rows))

const r9 = await as(db, STUDENT, 'select adm_incident_next_number() n')
ok('a student login is refused the number', !r9.ok, r9.err || JSON.stringify(r9.rows))

const r10 = await as(db, null, 'select adm_incident_next_number() n')
ok('anon cannot call it', !r10.ok && /permission denied/.test(r10.err), r10.err || JSON.stringify(r10.rows))

const r11 = await as(db, KIU, `update adm_incidents set number = 77, description = 'x' where id = '${ID.inc}' returning number`)
ok('the number never changes on an update', r11.ok && r11.rows[0]?.number === 1, r11.err || JSON.stringify(r11.rows))

const r12 = await as(db, KIU, `select count(*)::int n from adm_incidents where kind = 'staff'`)
ok('the teacher still sees no office-only incident', r12.ok && r12.rows[0].n === 0, r12.err)

console.log(`\n${pass} passed, ${fail} failed`)
if (fail) process.exitCode = 1
