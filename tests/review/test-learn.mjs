// Check 2: PRA Learn's tables and functions on top of the REAL schema of The Current
// (every file in C:\Users\sbowe\admin\supabase, then current-hardening.sql, then
// learn-schema.sql), seeded with rows in every adm_* table and bucket.
//   node test-learn.mjs [learn-schema.sql]
import { makeDb, as, read } from './current.mjs'
import { SEED, ID } from './seed.mjs'

const SCHEMA = process.argv[2] || 'C:/Users/sbowe/learn/supabase/learn-schema.sql'
let pass = 0, fail = 0
const ok = (label, cond, extra = '') => { cond ? pass++ : fail++; console.log(`${cond ? 'ok  ' : 'FAIL'} ${label}${extra ? ' — ' + extra : ''}`) }

const db = await makeDb({ later: true })
await db.exec(SEED(true))
await db.exec(read('C:/Users/sbowe/learn/supabase/current-hardening.sql'))
for (const run of [1, 2]) {
  try { const r = await db.exec(read(SCHEMA)); ok(`learn-schema.sql runs on the real schema, self-test passes (run ${run})`, /PRA Learn is set up/.test(r.at(-1).rows[0]?.result || '')) }
  catch (e) { ok(`learn-schema.sql runs (run ${run})`, false, e.message); process.exit(1) }
}
ok('packs are tied to Lessons requests (foreign key added because adm_lesson_requests exists)',
  (await db.query(`select 1 from pg_constraint where conname = 'learn_packs_request_fk'`)).rows.length === 1)

// Students: Minh Anh (Year 5, active), Bảo Châu (Year 5, pending trial), Gia Huy (Year 7), Old (inactive).
const U = { anh: 'f1000000-0000-4000-8000-000000000001', chau: 'f1000000-0000-4000-8000-000000000002', huy: 'f1000000-0000-4000-8000-000000000003',
  old: 'f1000000-0000-4000-8000-000000000004', orphan: 'f1000000-0000-4000-8000-000000000005' }
const pack = (parts) => JSON.stringify({ format: 'pra-learn-pack/1', parts })
const REVIEW = { id: 'review', kind: 'review', slides: [
  { layout: 'statement', text: 'One', check: { id: 'c1', q: '?', options: [{ val: 'A', text: 'a' }], correct: 'A' } },
  { layout: 'statement', text: 'Two', check: { id: 'c2', q: '?', options: [{ val: 'A', text: 'a' }], correct: 'A' } }] }
const PRACTICE = { id: 'practice', kind: 'practice', set: { items: [{ id: 'p1', level: 'focus', steps: [] }] } }
await db.exec(`insert into auth.users (id, email) values
  ('${U.anh}', 'otter27@learn.pra.edu.vn'), ('${U.chau}', 'mango41@learn.pra.edu.vn'), ('${U.huy}', 'rocket08@learn.pra.edu.vn'),
  ('${U.old}', 'kiwi22@learn.pra.edu.vn'), ('${U.orphan}', 'lemon33@learn.pra.edu.vn');
insert into learn_accounts (user_id, student_id, username) values
  ('${U.anh}', '${ID.s5a}', 'otter27'), ('${U.chau}', '${ID.s5p}', 'mango41'), ('${U.huy}', '${ID.s7}', 'rocket08'), ('${U.old}', '${ID.sold}', 'kiwi22');`)
const P = {}
for (const [slug, cls, status, opens] of [['y5-math-open', 'math:Year 5', 'published', null], ['y5-math-draft', 'math:Year 5', 'draft', null],
  ['y5-math-later', 'math:Year 5', 'published', '2099-01-01'], ['y5-math-hidden', 'math:Year 5', 'hidden', null],
  ['y5-eng-open', 'english:Year 5', 'published', null], ['y7-math-open', 'math:Year 7', 'published', null]]) {
  P[slug] = (await db.query(`insert into learn_packs (slug, class_key, title, content, status, opens_on, request_id) values ($1, $2, $1, $3, $4, $5, $6) returning id`,
    [slug, cls, pack([REVIEW, PRACTICE]), status, opens, slug === 'y5-eng-open' ? ID.req : null])).rows[0].id
}
await db.query(`insert into storage.objects (bucket_id, name) values ('learn-packs', $1), ('learn-packs', $2), ('learn-packs', $3)`,
  [`${P['y5-math-open']}/a.webp`, `${P['y5-math-draft']}/b.webp`, `${P['y7-math-open']}/c.webp`])

const student = (k, email, extra = {}) => ({ sub: U[k], email, app_metadata: { role: 'student', ...extra } })
const ANH = student('anh', 'otter27@learn.pra.edu.vn'), CHAU = student('chau', 'mango41@learn.pra.edu.vn'), HUY = student('huy', 'rocket08@learn.pra.edu.vn')
const OLD = student('old', 'kiwi22@learn.pra.edu.vn'), ORPHAN = student('orphan', 'lemon33@learn.pra.edu.vn')
const ANH_NOROLE = { sub: U.anh, email: 'otter27@learn.pra.edu.vn', app_metadata: {} }
const KIU = { email: 'kiu@pra.edu.vn', app_metadata: { role: 'teacher' } }              // english:Year 5, science:Year 5
const DAVID = { email: 'david@pra.edu.vn', app_metadata: { role: 'teacher' } }          // math:Year 5, english:Year 7
const THAMV = { email: 'tham.v@pra.edu.vn', app_metadata: {} }                         // technology Years 2-5, no role
const OFFICE = { email: 'hien.c@pra.edu.vn', app_metadata: { role: 'admin' } }
const HEAD = { email: 'seth@pra.edu.vn', app_metadata: { role: 'head' } }
const SUPER = { email: 'bowen@pra.edu.vn', app_metadata: { role: 'super_admin' } }
const TRIAGE = { email: 'triage@pra.edu.vn', app_metadata: { role: 'triage' } }
const STRANGER = { email: 'someone@gmail.com', app_metadata: {} }
const COACH = { email: 'coach@gmail.com', app_metadata: {} }                            // a Teachers row typed by mistake
const q = (who, sql, p) => as(db, who, sql, p)
const slugs = async (who) => ((await q(who, 'select slug from learn_packs order by slug')).rows || []).map((r) => r.slug).join(',')

// --- Students
ok('student sees only their class\'s published, open packs', await slugs(ANH) === 'y5-eng-open,y5-math-open', await slugs(ANH))
ok('pending (trial) student sees the same', await slugs(CHAU) === 'y5-eng-open,y5-math-open')
ok('Year 7 student sees only Year 7', await slugs(HUY) === 'y7-math-open')
ok('inactive student sees nothing', await slugs(OLD) === '')
ok('student login with no learn_accounts row sees nothing', await slugs(ORPHAN) === '')
ok('a student-domain login without the student role sees nothing', await slugs(ANH_NOROLE) === '')
const tables = (await db.query(`select tablename from pg_tables where schemaname = 'public' and tablename like 'adm\\_%' order by 1`)).rows.map((r) => r.tablename)
for (const who of [['student', ANH], ['student with no role', ANH_NOROLE], ['orphan student', ORPHAN]]) {
  const seen = []
  for (const t of tables) { const r = await q(who[1], `select count(*)::int n from ${t}`); if ((!r.ok && !/permission denied/.test(r.err)) || (r.ok && r.rows[0].n > 0)) seen.push(`${t}:${r.ok ? r.rows[0].n : r.err.slice(0, 30)}`) }
  ok(`${who[0]} reads nothing in any of the ${tables.length} adm_* tables`, seen.length === 0, seen.join(' '))
  const objs = await q(who[1], `select bucket_id, count(*)::int n from storage.objects group by 1 order by 1`)
  const names = (objs.rows || []).map((r) => `${r.bucket_id}:${r.n}`).join(',')
  ok(`${who[0]} sees no file in any adm bucket`, objs.ok && !/adm-|newsletter/.test(names), names)
}
let r = await q(ANH, `select name from storage.objects where bucket_id = 'learn-packs'`)
ok('student reads pictures of visible packs only', r.ok && r.rows.length === 1 && r.rows[0].name.startsWith(P['y5-math-open']), JSON.stringify(r.rows))
r = await q(ANH, `insert into storage.objects (bucket_id, name) values ('learn-packs', $1) returning 1`, [`${P['y5-math-open']}/x.png`])
ok('student cannot add a picture', !r.ok)
r = await q(ANH, 'select username from learn_accounts')
ok('student reads only their own login row', r.ok && r.rows.length === 1 && r.rows[0].username === 'otter27')
const helpers = await q(ANH, `select adm_email() e, adm_is_report_staff() rs, adm_is_head() h, adm_is_staff() s, adm_can_attendance('Year 5') a,
  adm_newsletter_office() n, learn_staff_login() l, learn_is_office() o, learn_teaches('math:Year 5') t, learn_can_manage_class('math:Year 5') m,
  learn_can_manage_student('${ID.s5a}') ms`)
ok('student passes no staff check (adm_* and learn_*)', helpers.ok && Object.values(helpers.rows[0]).every((v) => v === false || v === ''), JSON.stringify(helpers.rows?.[0]))
for (const [fn, sql] of [['learn_class_overview', `select learn_class_overview('math:Year 5')`], ['learn_pack_misses', `select learn_pack_misses('${P['y5-math-open']}')`],
  ['learn_class_students', `select * from learn_class_students('math:Year 5')`], ['adm_parent_groups', 'select adm_parent_groups()'],
  ['adm_enrollment_make_student', `select adm_enrollment_make_student('${ID.e1}')`], ['adm_lesson_next_number', 'select adm_lesson_next_number()']]) {
  r = await q(ANH, sql)
  ok(`student cannot use ${fn}`, !r.ok, r.ok ? JSON.stringify(r.rows).slice(0, 80) : '')
}
r = await q(ANH, `select learn_request_results('${ID.req}') r`)
ok('student gets no Lessons results', r.ok && r.rows[0].r.packs.length === 0)
r = await q(ANH, `select learn_my_classes() c`)
ok('student has no classes', r.ok && JSON.stringify(r.rows[0].c) === '[]')
for (const [what, sql] of [['insert progress', `insert into learn_progress (student_id, pack_id, part) values ('${ID.s5a}', '${P['y5-math-open']}', 'review')`],
  ['update own login', `update learn_accounts set extra_classes = '{math:Year 7}' where user_id = '${U.anh}' returning 1`],
  ['add a pack', `insert into learn_packs (slug, class_key, title, content) values ('x-pack', 'math:Year 5', 'x', '${pack([])}') returning 1`]]) {
  r = await q(ANH, sql)
  ok(`student cannot ${what}`, !r.ok || r.rows.length === 0, r.err || '')
}
r = await q(ANH, `update learn_packs set due_on = '2030-01-01' where id = '${P['y5-math-open']}' returning 1`)
ok('student cannot change a pack', r.ok && r.rows.length === 0)

// --- learn_save
const save = (who, slug, part, items, done = false) => q(who, `select (learn_save($1, $2, $3::jsonb, $4)).*`, [P[slug], part, JSON.stringify(items), done])
r = await save(ANH, 'y5-math-open', 'review', { c1: { ok: true, tries: 1 }, c2: { ok: false, tries: 999, hints: -4, slips: ['c2:1'] }, zz: { ok: true } }, true)
ok('learn_save writes the caller\'s own row, scores 1 of 2, drops unknown ids, clamps tries/hints',
  r.ok && r.rows[0].student_id === ID.s5a && Number(r.rows[0].score) === 0.5 && !('zz' in r.rows[0].items) && r.rows[0].items.c2.tries === 99 && r.rows[0].items.c2.hints === 0, r.err || JSON.stringify(r.rows?.[0]?.items))
r = await save(ANH, 'y5-math-open', 'review', { c1: { ok: true }, c2: { ok: true, slips: ['Ms Kiu is <b>rude</b> www.x.com', 'ok-key_1'] } }, true)
ok('slips keep only key-shaped values, never free text', r.ok && JSON.stringify(r.rows[0].items.c2.slips) === '["ok-key_1"]', JSON.stringify(r.rows?.[0]?.items?.c2))
r = await save(ANH, 'y5-math-open', 'review', { c1: { ok: true }, c2: { ok: true } }, true)
ok('a forged all-correct save is capped at 1 (the design accepts self-reported answers)', r.ok && Number(r.rows[0].score) === 1)
for (const [what, who, slug, part] of [['another class\'s pack', ANH, 'y7-math-open', 'review'], ['a draft', ANH, 'y5-math-draft', 'review'],
  ['a pack that opens later', ANH, 'y5-math-later', 'review'], ['a hidden pack', ANH, 'y5-math-hidden', 'review'], ['a part that does not exist', ANH, 'y5-math-open', 'nope'],
  ['an inactive student', OLD, 'y5-math-open', 'review'], ['a login without a learn_accounts row', ORPHAN, 'y5-math-open', 'review'],
  ['a student address with no student role', ANH_NOROLE, 'y5-math-open', 'review'], ['a teacher', DAVID, 'y5-math-open', 'review'], ['a stranger', STRANGER, 'y5-math-open', 'review']]) {
  r = await save(who, slug, part, { c1: { ok: true } }, true)
  ok(`learn_save refuses ${what}`, !r.ok, r.ok ? 'saved!' : '')
}
r = await q(null, `select learn_save('${P['y5-math-open']}', 'review', '{}'::jsonb, false)`)
ok('learn_save refuses anon', !r.ok)
// keep one save for the teacher views
await db.exec('begin')
await db.query(`select set_config('request.jwt.claims', $1, true)`, [JSON.stringify({ role: 'authenticated', ...ANH })])
await db.exec('set local role authenticated')
await db.query(`select learn_save($1, 'review', '{"c1":{"ok":true},"c2":{"ok":false}}'::jsonb, true)`, [P['y5-math-open']])
await db.exec('commit')
await db.exec('reset role')
r = await q(CHAU, 'select count(*)::int n from learn_progress')
ok('another student cannot see that progress', r.ok && r.rows[0].n === 0)
await db.exec(`update learn_accounts set active = false where user_id = '${U.anh}'`)
r = await save(ANH, 'y5-math-open', 'review', { c1: { ok: true } })
ok('a blocked login cannot save or read', !r.ok && (await slugs(ANH)) === '')
await db.exec(`update learn_accounts set active = true where user_id = '${U.anh}'`)

// --- Staff
ok('David (math:Year 5) sees his class\'s packs, drafts included, not English or Year 7', await slugs(DAVID) === 'y5-math-draft,y5-math-hidden,y5-math-later,y5-math-open')
ok('Kiu (english:Year 5) sees only English Year 5', await slugs(KIU) === 'y5-eng-open')
ok('a teacher with no role, of other classes, sees no packs', await slugs(THAMV) === '')
r = await q(DAVID, `select learn_class_overview('math:Year 5') o`)
ok('David\'s class page lists Year 5 (pending included) and the progress', r.ok && r.rows[0].o.students.length === 2 && r.rows[0].o.progress.length === 1, r.err || JSON.stringify(r.rows[0].o.students.map((s) => s.name)))
r = await q(DAVID, `select learn_class_overview('english:Year 5') o`)
ok('David cannot open Kiu\'s class page', !r.ok)
r = await q(KIU, 'select count(*)::int n from learn_progress')
ok('Kiu cannot see progress on David\'s packs', r.ok && r.rows[0].n === 0)
r = await q(DAVID, `update learn_packs set status = 'published', due_on = '2030-01-01', content = $2, class_key = 'math:Year 7', title = 'X' where id = $1 returning status, class_key, title, version`, [P['y5-math-draft'], pack([])])
ok('teacher opens and dates a pack but cannot change content, class or title', r.ok && r.rows[0].status === 'published' && r.rows[0].class_key === 'math:Year 5' && r.rows[0].title === 'y5-math-draft' && r.rows[0].version === 1, r.err || JSON.stringify(r.rows))
r = await q(DAVID, `update learn_packs set status = 'published' where id = $1 returning 1`, [P['y7-math-open']])
ok('teacher cannot touch another class\'s pack', r.ok && r.rows.length === 0)
r = await q(DAVID, `delete from learn_packs where id = $1 returning 1`, [P['y5-math-draft']])
ok('teacher cannot delete a pack', r.ok && r.rows.length === 0)
r = await q(DAVID, `select username from learn_accounts order by 1`)
ok('David reads the logins of Year 5 and Year 7 students (his year groups)', r.ok && r.rows.map((x) => x.username).join(',') === 'mango41,otter27,rocket08', JSON.stringify(r.rows))
r = await q(DAVID, `select learn_can_manage_class('math:Year 5') a, learn_can_manage_class('english:Year 5') b, learn_can_manage_student('${ID.s5a}') c, learn_can_manage_student('${ID.sus}') d`)
ok('learn-accounts checks for a teacher: own class yes, other class no', r.ok && JSON.stringify(r.rows[0]) === '{"a":true,"b":false,"c":true,"d":false}', JSON.stringify(r.rows?.[0]))
r = await q(COACH, `select learn_can_manage_class('movement:Year 5') a, learn_can_manage_student('${ID.s5a}') b`)
ok('KNOWN GAP (not new): a non-staff login whose address is typed on the Teachers page counts as that class\'s teacher', r.ok && r.rows[0].a === true, JSON.stringify(r.rows?.[0]))
for (const [name, who] of [['office (admin)', OFFICE], ['head', HEAD], ['super admin', SUPER]]) {
  ok(`${name} sees every pack`, (await slugs(who)).split(',').length === 6)
  r = await q(who, `select learn_can_manage_class('math:Year 5') a, learn_can_manage_student('${ID.sus}') b, jsonb_array_length(learn_my_classes()) > 3 c`)
  ok(`${name} may manage any class`, r.ok && r.rows[0].a && r.rows[0].b && r.rows[0].c, JSON.stringify(r.rows?.[0]))
}
r = await q(OFFICE, `delete from learn_packs where id = $1 returning 1`, [P['y5-math-hidden']])
ok('office (admin) cannot delete a pack', r.ok && r.rows.length === 0)
r = await q(HEAD, `delete from learn_packs where id = $1 returning 1`, [P['y5-math-hidden']])
ok('head deletes a pack', r.ok && r.rows.length === 1)
r = await q(OFFICE, `select learn_request_results('${ID.req}') r`)
ok('office reads the Lessons request results (The Current calls this)', r.ok && r.rows[0].r.packs.length === 1)
r = await q(KIU, `select learn_request_results('${ID.req}') r`)
ok('the class\'s teacher reads them too', r.ok && r.rows[0].r.packs.length === 1)
r = await q(DAVID, `select learn_request_results('${ID.req}') r`)
ok('a teacher of another class gets none', r.ok && r.rows[0].r.packs.length === 0)

// --- Operator (triage)
r = await q(TRIAGE, `insert into learn_packs (slug, class_key, title, content) values ('y5-math-u5', 'math:Year 5', 'U5', $1)
  on conflict (slug) do update set content = excluded.content, title = excluded.title returning version, created_by, status`, [pack([REVIEW])])
ok('operator adds a pack as a draft (upsert on slug)', r.ok && r.rows[0].created_by === 'Lesson builder' && r.rows[0].status === 'draft', r.err)
r = await q(TRIAGE, `insert into learn_packs (slug, class_key, title, content) values ('y5-math-open', 'math:Year 5', 'New title', $1)
  on conflict (slug) do update set content = excluded.content, title = excluded.title returning version, title`, [pack([REVIEW, PRACTICE, { id: 'extra', kind: 'practice', set: { items: [] } }])])
ok('operator re-publishes over an existing slug: content changes, version goes up', r.ok && r.rows[0].version === 2 && r.rows[0].title === 'New title', r.err)
r = await q(TRIAGE, `insert into storage.objects (bucket_id, name) values ('learn-packs', $1) returning 1`, [`${P['y5-math-open']}/new.webp`])
ok('operator uploads pictures', r.ok, r.err)
r = await q(TRIAGE, `select count(*)::int n from adm_students`)
ok('operator still reads no student list', r.ok && r.rows[0].n === 0)
r = await q(TRIAGE, `update adm_lesson_requests set outputs = '{"review":"https://learn.pra.edu.vn/#/p/y5-math-u5/review"}', status = 'ready' where id = $1 returning status`, [ID.req])
ok('operator writes the portal links on the Lessons request', r.ok && r.rows[0]?.status === 'ready', r.err)
r = await q(TRIAGE, `delete from learn_packs where id = $1 returning 1`, [P['y5-math-open']])
ok('operator cannot delete a pack', r.ok && r.rows.length === 0)

// --- Strangers and anon
ok('stranger sees no packs', await slugs(STRANGER) === '')
r = await q(STRANGER, 'select (select count(*) from learn_accounts) + (select count(*) from learn_progress) n')
ok('stranger sees no logins or progress', r.ok && Number(r.rows[0].n) === 0)
r = await q(COACH, 'select count(*)::int n from learn_accounts')
ok('KNOWN GAP (not new): that typed-in coach also reads the Year 5 logins (usernames, not PINs)', r.ok && r.rows[0].n === 2, JSON.stringify(r.rows))
for (const sql of ['select * from learn_packs', 'select * from learn_accounts', 'select * from learn_progress', 'select learn_me_info()', 'select learn_who()']) {
  r = await q(null, sql)
  ok(`anon: ${sql} refused`, !r.ok)
}

// pg-safeupdate: every UPDATE/DELETE in the file has a WHERE
const code = read(SCHEMA).replace(/--[^\n]*/g, '')
const bare = [...code.matchAll(/\b(update\s+[a-z_.]+\s+(?:as\s+\w+\s+)?set|delete\s+from)\b[^;]*;/gi)].filter((m) => !/\bwhere\b/i.test(m[0]) && !/do\s+update\s+set/i.test(code.slice(Math.max(0, m.index - 12), m.index + 20)))
ok('every UPDATE and DELETE in learn-schema.sql has a WHERE', bare.length === 0, bare.map((m) => m[0].slice(0, 60)).join(' | '))

console.log(`\n${pass} passed, ${fail} failed`)
process.exit(fail ? 1 : 0)
