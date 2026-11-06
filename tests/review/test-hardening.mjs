// Check 1: the same access checks against The Current BEFORE and AFTER
// C:\Users\sbowe\learn\supabase\current-hardening.sql, for every kind of caller.
// Staff, the triage login, the website forms and the mailer must come out the same;
// anon helper calls, strangers and students may only get tighter.
//   node test-hardening.mjs [hardening-file]
import { makeDb, as, read } from './current.mjs'
import { SEED, ID } from './seed.mjs'

const HARDENING = process.argv[2] || 'C:/Users/sbowe/learn/supabase/current-hardening.sql'

const WHO = {
  super_admin: { email: 'bowen@pra.edu.vn', app_metadata: { role: 'super_admin' } },
  head: { email: 'seth@pra.edu.vn', app_metadata: { role: 'head' } },
  office: { email: 'hien.c@pra.edu.vn', app_metadata: { role: 'admin' } },
  office_teacher: { email: 'duyen.n@pra.edu.vn', app_metadata: { role: 'admin' } },
  teacher: { email: 'kiu@pra.edu.vn', app_metadata: { role: 'teacher' } },
  teacher_david: { email: 'david@pra.edu.vn', app_metadata: { role: 'teacher' } },
  teacher_norole: { email: 'tham.v@pra.edu.vn', app_metadata: {} },
  triage: { email: 'triage@pra.edu.vn', app_metadata: { role: 'triage' } },
  anon: null,
  stranger: { email: 'someone@gmail.com', app_metadata: {} },
  coach_typed_row: { email: 'coach@gmail.com', app_metadata: {} },
  eca_outsider: { email: 'coach.eca@gmail.com', app_metadata: {} },
  teacher_left: { email: 'left@pra.edu.vn', app_metadata: { role: 'teacher' } },
  student: { email: 'otter27@learn.pra.edu.vn', app_metadata: { role: 'student' } },
  student_typed_row: { email: 'mango41@learn.pra.edu.vn', app_metadata: { role: 'student' } },
  student_no_role: { email: 'mango41@learn.pra.edu.vn', app_metadata: {} },
}

const FORM = JSON.stringify({
  submission_id: 'f0000000-0000-4000-8000-00000000f0f0', lang: 'en', website: '', applying_for: 'Academic Year 26-27',
  photo_consent: 'total', terms: true, student: { first: 'Zz', last: 'Webform', dob: '2018-02-03', gender: 'female' },
  parents: [{ first: 'P', last: 'Webform', email: 'webform@example.com', phone: '1' }], files: [],
})
const MAILFORM = JSON.stringify({ want: 'question', name: 'Web Test', email: 'webtest@example.com', message: 'hello' })

function checks(later, key, buckets, tables) {
  const c = []
  const add = (label, sql, params = []) => c.push([label, sql, params])
  for (const t of tables) add(`read ${t}`, `select count(*)::int as n from ${t}`)
  add('own teachers row (AuthContext)', `select count(*)::int as n from adm_teachers where lower(email) = adm_email_raw()`)
  for (const b of buckets) add(`storage read ${b}`, `select count(*)::int as n from storage.objects where bucket_id = $1`, [b])
  const helpers = ['adm_role()', 'adm_email()', 'adm_is_staff()', 'adm_is_head()', 'adm_is_report_staff()', "adm_can_subject('math', 'Year 5')",
    "adm_can_homeroom('Year 5')", "adm_can_attendance('Year 5')", 'adm_newsletter_office()', 'adm_can_send_lang()', 'adm_can_upper_secondary()',
    `adm_can_eca('${ID.ecaK}')`, `adm_can_travel('${ID.s5a}')`, "adm_can_signature('kiu@pra.edu.vn')", `adm_can_subject_in_report('english', '${ID.r5}')`]
  if (later) helpers.push('adm_lessons_manager()', "adm_teaches('english:Year 5')", "adm_lesson_mine('kiu@pra.edu.vn', null)",
    `adm_can_incident('student', null, array['${ID.s5a}'::uuid])`, `adm_can_incident_folder('${ID.inc}')`)
  for (const h of helpers) add(`helper ${h}`, `select ${h} as v`)
  // Writes (each rolled back)
  add('students insert', `insert into adm_students (full_name, level) values ('X', 'Year 5') returning id`)
  add('students update', `update adm_students set notes = 'x' where id = $1 returning id`, [ID.s5a])
  add('teachers insert', `insert into adm_teachers (email, name) values ('new.t@pra.edu.vn', 'New') returning email`)
  add('teachers update no-login row', `update adm_teachers set subjects = array['movement:Year 3', 'movement:Year 4'] where email = 'no-login:chien' returning email`)
  add('teachers insert no-login row', `insert into adm_teachers (email, name) values ('no-login:new', 'New') returning email`)
  add('teachers insert blank email', `insert into adm_teachers (email, name) values ('', 'Blank') returning email`)
  add('teachers insert learn address', `insert into adm_teachers (email, name) values ('kiwi22@learn.pra.edu.vn', 'K') returning email`)
  add('section english Y5 (Kiu)', `update adm_report_sections set comment = 'x' where report_id = $1 and subject_key = 'english' returning subject_key`, [ID.r5])
  add('section math Y5 (David)', `update adm_report_sections set comment = 'x' where report_id = $1 and subject_key = 'math' returning subject_key`, [ID.r5])
  add('section insert Y5 science', `insert into adm_report_sections (report_id, subject_key) values ($1, 'science') returning subject_key`, [ID.r5])
  add('section published Y7', `update adm_report_sections set comment = 'x' where report_id = $1 returning subject_key`, [ID.r7])
  add('report homeroom Y5', `update adm_reports set glance = 'x' where id = $1 returning id`, [ID.r5])
  add('report insert', `insert into adm_reports (student_id, school_year, period_label, year_group) values ($1, '2026-2027', 'Quarter 2', 'Year 5') returning id`, [ID.s5a])
  add('report delete', `delete from adm_reports where id = $1 returning id`, [ID.r5])
  add('course note insert', `insert into adm_course_notes (school_year, period_label, year_group, subject_key, description) values ('2026-2027', 'Quarter 2', 'Year 5', 'english', 'x') returning id`)
  add('attendance insert Y5', `insert into adm_attendance (student_id, date, status, year_group) values ($1, '2026-11-04', 'present', 'Year 5') returning id`, [ID.s5a])
  add('travel insert', `insert into adm_travel (student_id, from_date, to_date) values ($1, '2027-01-01', '2027-01-02') returning id`, [ID.s5a])
  add('settings fees write', `update adm_settings set value = value where key = 'fees' returning key`)
  add('settings reports write', `update adm_settings set value = value where key = 'reports' returning key`)
  add('invoice update', `update adm_invoices set notes = 'x' where id = $1 returning id`, [ID.inv])
  add('todo insert', `insert into adm_todos (title) values ('x') returning title`)
  add('todo add note', `select (adm_todo_add_update($1, 'note')).title as t`, [ID.todo])
  add('todo delete', `delete from adm_todos where id = $1 returning id`, [ID.todo])
  add('lead insert', `insert into adm_leads (family, email) values ('F', 'f@example.com') returning family`)
  add('lead update', `update adm_leads set notes = 'x' where id = $1 returning id`, [ID.l1])
  add('web message done', `update adm_web_messages set done_at = now() where id = $1 returning id`, [ID.web])
  add('enrollment checked', `update adm_enrollments set checked_at = now() where id = $1 returning id`, [ID.e1])
  add('enrollment make student', `select adm_enrollment_make_student($1) is not null as v`, [ID.e1])
  add('enrollment delete', `delete from adm_enrollments where id = $1 returning id`, [ID.e1])
  add('parent groups', `select jsonb_array_length(adm_parent_groups() -> 'students') as v`)
  add('photos event update', `update adm_photo_events set description = 'x' where id = $1 returning id`, [ID.ev])
  add('newsletter class corner edit', `select adm_newsletter_edit($1, array['note'], '"b"'::jsonb) is not null as v`, [ID.nlpClass])
  add('newsletter opening edit', `select adm_newsletter_edit($1, array['text'], '"b"'::jsonb) is not null as v`, [ID.nlpOpen])
  add('newsletter setting', `select adm_newsletter_setting($1, 'k', '1'::jsonb) as v`, [ID.nl])
  add('newsletter schedule', `select (adm_newsletter_schedule($1, now() + interval '1 hour', '{"subject":"S","html":"<p>h</p>"}'::jsonb)).status as v`, [ID.nl])
  add('newsletter send test', `select (adm_newsletter_send_test($1, null, '{"subject":"S","html":"<body>h</body>"}'::jsonb)).kind as v`, [ID.nl])
  add('mail retry', `select (adm_mail_retry($1)).status as v`, [ID.mailFail])
  add('mailer status', `select adm_mailer_status() is not null as v`)
  add('mail template change', `update adm_mail_templates set data = data where key = 'office' returning key`)
  add('drive link hide', `update adm_drive_doc_links set hidden = true where file_id = 'drv1' returning id`)
  add('eca member add (Kiu activity)', `insert into adm_eca_members (activity_id, student_id) values ($1, $2) returning id`, [ID.ecaK, ID.s5a])
  add('eca member add (outsider activity)', `insert into adm_eca_members (activity_id, student_id) values ($1, $2) returning id`, [ID.ecaOut, ID.s5a])
  add('eca register', `insert into adm_eca_attendance (activity_id, student_id, date) values ($1, $2, '2026-11-10') returning id`, [ID.ecaK, ID.s7])
  add('eca term insert', `insert into adm_eca_terms (name, from_date, to_date) values ('T', '2027-01-01', '2027-02-01') returning id`)
  add('ey answer insert', `insert into adm_ey_answers (school_year, quarter, week, class_key, question, answer) values ('2026-2027', 2, 9, 'nursery', 'focus.1', 'x') returning id`)
  add('signature own', `insert into adm_signatures (person, name, image) values (adm_email_raw(), 'Me', 'data:image/png;base64,AA') on conflict (person) do update set name = excluded.name returning person`)
  add('signature other', `update adm_signatures set name = 'x' where person = 'kiu@pra.edu.vn' returning person`)
  add('upper secondary comment', `update adm_upper_secondary set homeroom_comment = 'x' where student_id = $1 returning homeroom_comment`, [ID.sus])
  add('report send lang', `update adm_report_send set lang = 'vi' where report_id = $1 returning lang`, [ID.r5])
  const objName = { 'adm-incidents': `${ID.inc}/x.jpg`, 'adm-lessons': `${ID.req}/x.jpg`, 'adm-enrollment': 'f0000000-0000-4000-8000-00000000ab12/1-x.pdf' }
  for (const b of buckets) {
    add(`storage add ${b}`, `insert into storage.objects (bucket_id, name) values ($1, $2) returning name`, [b, objName[b] || `review/x.jpg`])
    add(`storage remove ${b}`, `delete from storage.objects where bucket_id = $1 returning name`, [b])
  }
  if (later) {
    add('incident add (student)', `insert into adm_incidents (kind, type, happened_on, student_ids) values ('student', 'injury', '2026-11-04', array['${ID.s5a}'::uuid]) returning kind`)
    add('incident add (student, numbered)', `insert into adm_incidents (number, kind, type, happened_on, student_ids) values (99, 'student', 'injury', '2026-11-04', array['${ID.s5a}'::uuid]) returning kind`)
    add('incident add (staff)', `insert into adm_incidents (kind, type, happened_on) values ('staff', 'other', '2026-11-04') returning kind`)
    add('incident update', `update adm_incidents set follow_up = 'x' where id = $1 returning id`, [ID.inc])
    add('lesson request add (own)', `insert into adm_lesson_requests (class_key, teacher_email, source) values ('english:Year 5', adm_email_raw(), '{"topic":"x"}') returning class_key`)
    add('lesson note', `select (adm_lesson_add_update($1, 'hi')).class_key as v`, [ID.req])
    add('lesson next number', `select adm_lesson_next_number() as v`)
    add('lesson status (triage)', `update adm_lesson_requests set status = 'building' where id = $1 returning status`, [ID.req])
    add('class profile change', `update adm_class_profiles set profile = '{"a":1}' where class_key = 'english:Year 5' returning class_key`)
    add('source upsert', `insert into adm_sources (id, title, kind) values ('wb-y5-eng', 'Y5 Eng', 'workbook') on conflict (id) do update set title = excluded.title returning id`)
  }
  // The website and the mailer (anon + key) - run for everyone; they must not change.
  add('website contact form', `select adm_web_submit($1::jsonb) is null as v`, [MAILFORM])
  add('website enrollment form', `select adm_enroll_submit($1::jsonb) is null as v`, [FORM])
  add('website upload check', `select adm_enroll_upload_ok('f0000000-0000-4000-8000-00000000ab12/1-x.pdf') as v`)
  add('website newsletters', `select count(*)::int as n from adm_newsletters_public()`)
  add('website newsletter seen', `select adm_newsletter_seen('post-2026-10-30', 'en', 'email', '') is null as v`)
  add('mailer ok', `select adm_mailer_ok($1) as v`, [key])
  add('mailer due', `select jsonb_typeof(adm_mailer_due($1)) as v`, [key])
  add('mailer claim', `select adm_mailer_claim($1, $2) as v`, [key, ID.mailFail])
  add('mailer done', `select adm_mailer_done($1, $2, true) is null as v`, [key, ID.mailFail])
  add('mailer build', `select adm_mailer_build($1, true) is null as v`, [key])
  add('mailer wrong key', `select adm_mailer_due($1) as v`, ['x' + key])
  return c
}

const norm = (r) => r.ok
  ? `ok ${JSON.stringify(r.rows.map((x) => Object.values(x).map((v) => (typeof v === 'string' && /^[0-9a-f-]{36}$/.test(v) ? '<id>' : v)))).slice(0, 120)}`
  : `ERR ${r.err.replace(/[0-9a-f]{8}-[0-9a-f-]{27}/g, '<id>').slice(0, 140)}`

async function build(later, harden) {
  const db = await makeDb({ later })
  await db.exec(SEED(later))
  // A helper for the checks only: the raw sign-in email, whatever adm_email() says.
  await db.exec(`create function adm_email_raw() returns text language sql stable as $$ select lower(coalesce(auth.jwt() ->> 'email', '')) $$;
                 grant execute on function adm_email_raw() to anon, authenticated;`)
  if (harden) await db.exec(read(HARDENING))
  return db
}

// Deferred triggers (form emails) fire at COMMIT, outside the website's function, so
// run the two forms for real as anon and count what the outbox got.
async function committedForms(db) {
  const out = {}
  for (const [label, sql, p] of [['contact', 'select adm_web_submit($1::jsonb)', MAILFORM.replace('webtest@', 'commit@')],
                                  ['enroll', 'select adm_enroll_submit($1::jsonb)', FORM.replace('f0f0', 'c0c0').replace('webform@', 'commit@')]]) {
    try {
      await db.exec('begin')
      await db.query(`select set_config('request.jwt.claims', '{"role":"anon"}', true)`)
      await db.exec('set local role anon')
      await db.query(sql, [p])
      await db.exec('commit')
      out[label] = 'ok'
    } catch (e) { out[label] = 'ERR ' + e.message; await db.exec('rollback').catch(() => {}) }
  }
  out.mail = (await db.query(`select kind, status from adm_mail_queue where to_addr like '%commit@%' or subject like '%Zz Webform%' or subject like '%Web Test%' order by kind`)).rows
    .map((r) => `${r.kind}:${r.status}`).join(',')
  return out
}

let pass = 0, fail = 0
const ok = (label, cond, extra = '') => { cond ? pass++ : fail++; console.log(`${cond ? 'ok  ' : 'FAIL'} ${label}${extra ? ' — ' + extra : ''}`) }
// Who may come out differently, and how (anything else is a failure).
const MAY_TIGHTEN = new Set(['anon', 'stranger', 'student', 'student_typed_row', 'student_no_role', 'teacher_left', 'coach_typed_row', 'eca_outsider'])

for (const later of [false, true]) {
  const tag = later ? 'with incidents + lessons' : 'live (through 27 Oct)'
  const before = await build(later, false)
  const after = await build(later, true)
  const key = (await before.query('select key from adm_mailer_key where id = 1')).rows[0].key
  await after.query('update adm_mailer_key set key = $1 where id = 1', [key])
  const tables = (await before.query(`select tablename from pg_tables where schemaname = 'public' and tablename like 'adm\\_%' order by 1`)).rows.map((r) => r.tablename)
  const buckets = (await before.query(`select id from storage.buckets order by id`)).rows.map((r) => r.id)
  const list = checks(later, key, buckets, tables)
  console.log(`\n=== ${tag}: ${list.length} checks x ${Object.keys(WHO).length} callers`)
  const diffs = {}
  for (const [who, claims] of Object.entries(WHO)) {
    for (const [label, sql, params] of list) {
      const b = norm(await as(before, claims, sql.replace(/adm_email_raw\(\)/g, 'adm_email_raw()'), params))
      const a = norm(await as(after, claims, sql, params))
      if (a !== b) (diffs[who] ||= []).push({ label, before: b, after: a })
    }
  }
  for (const who of Object.keys(WHO)) {
    const d = diffs[who] || []
    // Intended: the new CHECK refuses a blank or @learn.pra.edu.vn address on the Teachers page.
    const EXPECTED = new Set(['teachers insert blank email', 'teachers insert learn address'])
    for (const x of d.filter((x) => EXPECTED.has(x.label))) console.log(`      ${who} | expected: ${x.label}: ${x.before}  ->  ${x.after}`)
    d.splice(0, d.length, ...d.filter((x) => !EXPECTED.has(x.label) || MAY_TIGHTEN.has(who)))
    if (!MAY_TIGHTEN.has(who)) {
      ok(`${tag}: ${who} behaves the same (${list.length} checks)`, d.length === 0, d.map((x) => `\n      ${x.label}: ${x.before}  ->  ${x.after}`).join(''))
    } else {
      // Tighter only: nothing that failed before may work after, and no new rows may show.
      const looser = d.filter((x) => x.after.startsWith('ok') && (x.before.startsWith('ERR') || (/^ok \[\[(\d+)\]\]$/.test(x.after) && /^ok \[\[(\d+)\]\]$/.test(x.before)
        && Number(x.after.match(/\d+/)[0]) > Number(x.before.match(/\d+/)[0]))))
      ok(`${tag}: ${who} gets no new access (${d.length} changed)`, looser.length === 0, looser.map((x) => `${x.label}: ${x.before} -> ${x.after}`).join('; '))
      for (const x of d) console.log(`      ${who} | ${x.label}: ${x.before}  ->  ${x.after}`)
    }
  }
  const fb = await committedForms(before), fa = await committedForms(after)
  ok(`${tag}: website forms committed as anon write the same emails`, JSON.stringify(fb) === JSON.stringify(fa), `${JSON.stringify(fb)} / ${JSON.stringify(fa)}`)
  ok(`${tag}: website forms still save and email after the hardening`, fa.contact === 'ok' && fa.enroll === 'ok' && /enroll_family/.test(fa.mail) && /web_office/.test(fa.mail), JSON.stringify(fa))
}

console.log(`\n${pass} passed, ${fail} failed`)
process.exit(fail ? 1 : 0)
