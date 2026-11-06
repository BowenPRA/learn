// Check 3: C:\Users\sbowe\admin\supabase\updates-2026-11-05-enrollment-guard.sql on the
// real schema. Anonymous (and non-office) enrollment forms never modify or attach to
// existing rows; the office's "Add pending student" still links as before.
// Runs every case on a database WITHOUT the guard too, to show the test sees the bug.
import { makeDb, read } from './current.mjs'
import { SEED, ID } from './seed.mjs'

const GUARD = 'C:/Users/sbowe/admin/supabase/updates-2026-11-05-enrollment-guard.sql'
let pass = 0, fail = 0
const ok = (label, cond, extra = '') => { cond ? pass++ : fail++; console.log(`${cond ? 'ok  ' : 'FAIL'} ${label}${extra ? ' — ' + extra : ''}`) }

const sql = read(GUARD)
const code = sql.replace(/--[^\n]*/g, '')
const bare = [...code.matchAll(/\b(update\s+[a-z_.]+\s+(?:\w+\s+)?set|delete\s+from)\b[^;]*;/gi)].filter((m) => !/\bwhere\b/i.test(m[0]))
ok('every UPDATE/DELETE in the guard file has a WHERE (pg-safeupdate)', bare.length === 0, bare.map((m) => m[0].slice(0, 50)).join(' | '))
ok('the guard file never says school/report card/grades', !/\bschool\b|report card|\bgrades?\b/i.test(sql.replace(/previous schools?|school_language|schools/gi, '')))

const ANON = { role: 'anon' }
const STUDENT = { role: 'authenticated', sub: 'f1000000-0000-4000-8000-000000000001', email: 'otter27@learn.pra.edu.vn', app_metadata: { role: 'student' } }
const STRANGER = { role: 'authenticated', sub: 'f1000000-0000-4000-8000-000000000009', email: 'someone@gmail.com', app_metadata: {} }
const TEACHER = { role: 'authenticated', email: 'kiu@pra.edu.vn', app_metadata: { role: 'teacher' } }
const OFFICE = { role: 'authenticated', email: 'hien.c@pra.edu.vn', app_metadata: { role: 'admin' } }
const SUPER = { role: 'authenticated', email: 'bowen@pra.edu.vn', app_metadata: { role: 'super_admin' } }

let n = 0
const form = (first, last, dob, email, extra = {}) => ({
  submission_id: `f0000000-0000-4000-8000-${String(++n).padStart(12, '0')}`, lang: 'en', website: '', terms: true,
  applying_for: 'Academic Year 26-27', photo_consent: 'total',
  student: { first, last, dob, gender: 'female', address: { line1: '9 Stranger Road', city: 'Hoi An' }, start_date: '2026-11-20' },
  parents: [{ first: 'Zz', last: 'Stranger', email, phone: '+84 000 000 009' }], health: { allergies: 'made up' }, files: [], ...extra,
})
async function call(db, claims, fn, args, commit = false) {
  await db.exec('begin')
  try {
    await db.query(`select set_config('request.jwt.claims', $1, true)`, [JSON.stringify(claims)])
    await db.exec(`set local role ${claims.role === 'anon' ? 'anon' : 'authenticated'}`)
    const r = await db.query(`select ${fn} as v`, args)
    await db.exec(commit ? 'commit' : 'commit')
    return { ok: true, v: r.rows[0]?.v }
  } catch (e) { await db.exec('rollback'); return { ok: false, err: e.message } }
}
const snapshot = async (db) => (await db.query(`
  select (select jsonb_agg(row_to_json(s) order by s.id) from adm_students s) st,
         (select jsonb_agg(row_to_json(f) order by f.id) from adm_families f) fa,
         (select jsonb_agg(row_to_json(l) order by l.id) from adm_leads l) le`)).rows[0]
const submit = (db, who, f) => call(db, who, 'adm_enroll_submit($1::jsonb)', [JSON.stringify(f)])
const KNOWN = new Set(Object.values(ID))
const summary = async (db, f, before) => {
  const row = await formRow(db, f)
  const after = await snapshot(db)
  const changed = []
  for (const k of ['st', 'fa', 'le']) for (const b of before[k] || []) {
    const a = (after[k] || []).find((x) => x.id === b.id)
    for (const c of Object.keys(b)) if (!['updated_at', 'updated_by'].includes(c) && JSON.stringify(a?.[c]) !== JSON.stringify(b[c])) changed.push(`${k}.${KNOWN.has(b.id) ? b.id.slice(0, 2) : 'new'}.${c}`)
  }
  const tag = (v) => (v == null ? null : KNOWN.has(v) ? v : 'new')
  return JSON.stringify({ made: row.made_student, student: tag(row.student_id), family: tag(row.family_id), lead: tag(row.lead_id), changed: changed.sort() })
}
const formRow = async (db, f) => (await db.query(`select * from adm_enrollments where submission_id = $1`, [f.submission_id])).rows[0]

async function build(guard) {
  const db = await makeDb()
  await db.exec(SEED(false))
  // HARDENED=1: run current-hardening.sql first, to check the two files together.
  if (process.env.HARDENED) await db.exec(read('C:/Users/sbowe/learn/supabase/current-hardening.sql'))
  if (guard) {
    for (const run of [1, 2]) {
      const r = await db.exec(sql)
      ok(`guard file runs, its own test passes (run ${run})`, /changes nothing already in The Current/.test(r.at(-1).rows[0]?.result || ''))
    }
  }
  return db
}

// The attacks: each from anon, a PRA Learn student login and a stranger's login.
const ATTACKS = [
  ['a form naming an existing Pending child (name + birthday) with the attacker\'s email', () => form('Bảo Châu', 'Trần', '2015-06-07', 'attacker@example.com')],
  ['a made-up child with a real family\'s email (family email)', () => form('Zzmadeup', 'Nguyen', '2016-01-01', 'parent1@example.com')],
  ['a made-up child with a parent contact\'s email (family contacts)', () => form('Zzmadeup', 'Two', '2016-01-02', 'mai@example.com')],
  ['a made-up child with a lead\'s email', () => form('Zzmadeup', 'Lead', '2016-01-03', 'lead1@example.com')],
  ['a made-up child with an archived lead\'s email', () => form('Zzmadeup', 'Archived', '2016-01-04', 'lead2@example.com')],
  ['a form naming the lead\'s Pending child with no birthday match', () => form('Bảo Châu', 'Trần', '2015-06-08', 'lead1@example.com')],
]
const todaySummaries = []
const anonForms = []
for (const guard of [false, true]) {
  const tag = guard ? 'WITH guard' : 'without guard (today)'
  const db = await build(guard)
  for (const [who, claims] of [['anon', ANON], ['student login', STUDENT], ['stranger login', STRANGER], ['teacher login', TEACHER]]) {
    for (const [what, mk] of ATTACKS) {
      const before = await snapshot(db)
      const f = mk()
      const r = await submit(db, claims, f)
      if (who === 'anon' && !guard) todaySummaries.push(await summary(db, f, before))
      if (who === 'anon' && guard) anonForms.push(f)
      const after = await snapshot(db)
      const row = await formRow(db, f)
      const same = JSON.stringify(before) === JSON.stringify(after)
      const unlinked = row && !row.student_id && !row.family_id && !row.lead_id
      if (guard) ok(`${tag} | ${who}: ${what} — saved, changes nothing, links nothing`, r.ok && same && unlinked, r.err || `same=${same} linked=${!unlinked}`)
      else if (who === 'anon') console.log(`info ${tag} | ${who}: ${what} — existing rows changed or attached: ${!same || !unlinked}`)
    }
    // The form's own flood limits (6 an hour per address, 30 overall): age the test forms between callers.
    await db.exec(`select set_config('adm.enrollment_save', '1', false); update adm_enrollments set created_at = created_at - interval '2 hours' where source = 'website'; select set_config('adm.enrollment_save', '', false);`)
  }
  // A family nobody knows still gets a Pending child straight away.
  const fresh = form('Zzbrand', 'Zznew', '2019-02-03', 'brand.new@example.com')
  const r = await submit(db, ANON, fresh)
  const row = await formRow(db, fresh)
  const st = row?.student_id && (await db.query('select * from adm_students where id = $1', [row.student_id])).rows[0]
  ok(`${tag} | a new family's form still adds a Pending child in a new family`, r.ok && row.made_student && st?.status === 'pending' && ![ID.f1, ID.f2].includes(st.family_id), r.err)

  if (guard) {
    // The office presses "Add pending student" on each held anonymous form, in the order they came:
    // the result must be exactly what the website did by itself before the guard.
    const officeSummaries = []
    for (const f of anonForms) {
      const before = await snapshot(db)
      const m = await call(db, OFFICE, 'adm_enrollment_make_student($1)', [(await formRow(db, f)).id])
      officeSummaries.push(m.ok ? await summary(db, f, before) : 'ERR ' + m.err)
    }
    for (let i = 0; i < ATTACKS.length; i++) {
      ok(`office's Add pending student = what the form did by itself before: ${ATTACKS[i][0]}`, officeSummaries[i] === todaySummaries[i], `${officeSummaries[i]} vs ${todaySummaries[i]}`)
    }
    if (process.env.SHOW) console.log(officeSummaries.join(' / '))
  }
  if (guard) {
    const held = (await db.query(`select id from adm_enrollments where student_id is null and source = 'website' order by created_at`)).rows
    let m = await call(db, TEACHER, 'adm_enrollment_make_student($1)', [held[held.length - 1].id])
    ok('a teacher still cannot press Add pending student', !m.ok)
    // Old forms brought in by the super admin still link (link_only keeps the child off the list).
    m = await call(db, SUPER, 'adm_enrollment_import($1::jsonb)', [JSON.stringify({ submission_id: 'jotform-1', link_only: true,
      student: { full_name: 'Nguyễn Gia Huy', first_name: 'Gia Huy', dob: '2013-05-06' }, parents: [{ email: 'parent1@example.com' }] })])
    const imp = (await db.query(`select * from adm_enrollments where submission_id = 'jotform-1'`)).rows[0]
    ok('super admin import still links an old form to the child already on the list', m.ok && imp.student_id === ID.s7, m.err)
    // An office account sending the website function itself is trusted, as before.
    const fo = form('Zzoffice', 'Sent', '2017-07-07', 'parent2@example.com')
    m = await submit(db, OFFICE, fo)
    const ro = await formRow(db, fo)
    ok('an office account calling the website function places the form as before', m.ok && ro.family_id === ID.f2, m.err)
    // The emails: a held form still gets its thank-you and the office alert, which says it has no student yet.
    const fm = form('Zzmail', 'Held', '2016-03-03', 'parent2@example.com')
    await db.exec('begin')
    await db.query(`select set_config('request.jwt.claims', '{"role":"anon"}', true)`)
    await db.exec('set local role anon')
    await db.query('select adm_enroll_submit($1::jsonb)', [JSON.stringify(fm)])
    await db.exec('commit')
    const er = await formRow(db, fm)
    const mails = (await db.query(`select kind, status, body from adm_mail_queue where ref_id = $1 order by kind`, [er.id])).rows
    ok('a held form still writes the family thank-you and the office alert', mails.length === 2 && mails.some((x) => x.kind === 'enroll_family') && mails.some((x) => x.kind === 'enroll_office'), JSON.stringify(mails.map((x) => x.kind + ':' + x.status)))
    ok('the office alert says the form is not linked to a student yet', mails.some((x) => x.kind === 'enroll_office' && /not linked to a student yet/.test(x.body)))
  }
}

console.log(`\n${pass} passed, ${fail} failed`)
process.exit(fail ? 1 : 0)
