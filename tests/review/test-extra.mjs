// Two side checks: (1) with a NON-superuser owner (as on Supabase, where postgres owns the
// tables), the hardened adm_teachers policy does not recurse; (2) the incidents numbering
// bug in updates-2026-11-03-incidents.sql (not run yet).
import { makeDb, as, read } from './current.mjs'
import { SEED, ID } from './seed.mjs'
let pass = 0, fail = 0
const ok = (l, c, x = '') => { c ? pass++ : fail++; console.log(`${c ? 'ok  ' : 'FAIL'} ${l}${x ? ' — ' + x : ''}`) }
const db = await makeDb({ later: true })
await db.exec(SEED(true))
await db.exec(read('C:/Users/sbowe/learn/supabase/current-hardening.sql'))
await db.exec(`create role owner_role nologin; grant usage on schema public to owner_role; grant usage on schema auth to owner_role;
  alter table adm_teachers owner to owner_role; alter table adm_students owner to owner_role;
  alter function adm_is_report_staff() owner to owner_role; alter function adm_is_head() owner to owner_role;
  alter function adm_is_staff() owner to owner_role; alter function adm_role() owner to owner_role; alter function adm_email() owner to owner_role;`)
const r1 = await as(db, { email: 'kiu@pra.edu.vn', app_metadata: { role: 'teacher' } }, 'select count(*)::int n from adm_teachers')
ok('owner without superuser: a teacher reads the teachers list, no recursion', r1.ok && r1.rows[0].n > 5, r1.err)
const r2 = await as(db, { email: 'otter27@learn.pra.edu.vn', app_metadata: { role: 'student' } }, 'select count(*)::int n from adm_teachers')
ok('owner without superuser: a student reads none', r2.ok && r2.rows[0].n === 0, r2.err)
const r3 = await as(db, { email: 'kiu@pra.edu.vn', app_metadata: { role: 'teacher' } }, 'select count(*)::int n from adm_students')
ok('owner without superuser: a teacher still reads students', r3.ok && r3.rows[0].n > 3, r3.err)
// (2) incidents: a staff incident (office only) holds the highest number; a teacher files a student incident.
const r4 = await as(db, { email: 'kiu@pra.edu.vn', app_metadata: { role: 'teacher' } },
  `insert into adm_incidents (kind, type, happened_on, student_ids) values ('student', 'injury', '2026-11-04', array['${ID.s5a}'::uuid]) returning number`)
// Fixed 5 Nov (adm_incident_next_number); full checks in test-incidents-number.mjs.
ok('FIXED in updates-2026-11-03-incidents.sql: a teacher files an incident after an office-only incident has the top number', r4.ok && r4.rows[0].number === 3, r4.err || JSON.stringify(r4.rows))
console.log(`\n${pass} passed, ${fail} failed`)
