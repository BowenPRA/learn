// The database side of PRA Learn, in PGlite (an in-memory Postgres), with stand-ins
// for Supabase and The Current (tests/sql/stubs.sql). Loads current-hardening.sql
// and learn-schema.sql exactly as Bowen would run them (their own self-tests run
// too), then signs in as students, teachers, office, the operator, a stranger and
// anon, and checks what each can read and change.
//
//   npm test
import { test, before } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { PGlite } from '@electric-sql/pglite'

const read = (p) => readFileSync(new URL(p, import.meta.url), 'utf8')
const STUBS = read('./sql/stubs.sql')
const HARDENING = read('../supabase/current-hardening.sql')
const SCHEMA = read('../supabase/learn-schema.sql')

let db
const ids = {}

// Each query runs in a savepoint, so one that is meant to fail does not end the transaction.
const runner = (tx) => async (sql, params) => {
  await tx.exec('savepoint q')
  try {
    const rows = (await tx.query(sql, params)).rows
    await tx.exec('release savepoint q')
    return rows
  } catch (e) {
    await tx.exec('rollback to savepoint q')
    throw e
  }
}
// Run `fn(q)` as a signed-in user (claims) or as anon (claims = null), rolled back after.
async function as(claims, fn, keep = false) {
  return db.transaction(async (tx) => {
    await tx.query(`select set_config('request.jwt.claims', $1, true)`, [claims ? JSON.stringify(claims) : ''])
    await tx.exec(`set local role ${claims ? 'authenticated' : 'anon'}`)
    try { return await fn(runner(tx)) } finally { if (!keep) await tx.rollback() }
  })
}
// The same, but kept (for writes the next checks depend on).
const asKeep = (claims, fn) => as(claims, fn, true)
const fails = async (p, re) => {
  let err = null
  try { await p } catch (e) { err = e }
  assert.ok(err, 'expected an error')
  if (re) assert.match(err.message, re)
}

const student = (key) => ({ sub: ids[`u_${key}`], role: 'authenticated', email: `${key}@learn.pra.edu.vn`, app_metadata: { role: 'student', student_id: ids[key] } })
const staff = (email, role) => ({ sub: crypto.randomUUID(), role: 'authenticated', email, app_metadata: role ? { role } : {} })
const DAVID = staff('david@pra.edu.vn', 'teacher')
const KIU = staff('kiu@pra.edu.vn') // a Create-login teacher: no role
const OFFICE = staff('yvonne@pra.edu.vn', 'admin')
const HEAD = staff('seth@pra.edu.vn', 'head')
const TRIAGE = staff('triage@pra.edu.vn', 'triage')
const STRANGER = staff('someone@gmail.com')

const pack = (parts) => JSON.stringify({ format: 'pra-learn-pack/1', parts })
const REVIEW = { id: 'review', kind: 'review', slides: [
  { layout: 'statement', text: 'One', check: { id: 'c1', q: '?', options: [{ val: 'A', text: 'a' }], correct: 'A' } },
  { layout: 'statement', text: 'No check' },
  { layout: 'statement', text: 'Two', check: { id: 'c2', q: '?', options: [{ val: 'A', text: 'a' }], correct: 'A' } },
  { layout: 'statement', text: 'Three', check: { id: 'c3', q: '?', options: [{ val: 'A', text: 'a' }], correct: 'A' } },
] }
const PRACTICE = { id: 'practice', kind: 'practice', set: { items: [{ id: 'p1', level: 'focus', steps: [] }, { id: 'p2', level: 'focus', steps: [] }] } }

before(async () => {
  db = new PGlite()
  await db.exec(STUBS)
  // Both files end with a self-test that raises if anything is wrong.
  await db.exec(HARDENING)
  await db.exec(SCHEMA)

  const one = async (sql, params) => (await db.query(sql, params)).rows[0]
  for (const [key, level, status, active] of [
    ['ana', 'Year 5', 'active', true], ['ben', 'Year 5', 'active', true], ['cat', 'Year 5', 'pending', false],
    ['dan', 'Year 6', 'active', true], ['eve', 'Year 5', 'inactive', false], ['fay', 'Year 5', 'active', true],
  ]) {
    ids[key] = (await one(`insert into adm_students (full_name, nickname, level, status, active, allergies)
                           values ($1, $2, $3, $4, $5, 'peanuts') returning id`, [`Learner ${key}`, key, level, status, active])).id
  }
  await db.exec(`insert into adm_teachers (email, name, title, role, subjects, homeroom_groups) values
    ('david@pra.edu.vn', 'David', 'Mr.', 'teacher', array['math:Year 5', 'english:Year 7'], array['Upper Secondary']),
    ('kiu@pra.edu.vn', 'Kiu', 'Ms.', 'teacher', array['english:Year 5', 'science:Year 5'], array['Year 5']),
    ('seth@pra.edu.vn', 'Seth', 'Mr.', 'head', array['cooking:Year 5'], array['*'])`)
  // Logins for everyone but fay; dan's has an extra class (Year 5 maths); ben's is blocked.
  for (const key of ['ana', 'ben', 'cat', 'dan', 'eve']) {
    ids[`u_${key}`] = crypto.randomUUID()
    await db.query(`insert into auth.users (id, email, last_sign_in_at) values ($1, $2, now())`, [ids[`u_${key}`], `${key}@learn.pra.edu.vn`])
    await db.query(`insert into learn_accounts (user_id, student_id, username, active, extra_classes) values ($1, $2, $3, $4, $5)`,
      [ids[`u_${key}`], ids[key], `${key}word${key === 'dan' ? '22' : '11'}`, key !== 'ben', key === 'dan' ? ['math:Year 5'] : []])
  }
  ids.request = crypto.randomUUID()
  const mk = async (slug, cls, status, opens = null) =>
    (await one(`insert into learn_packs (slug, class_key, title, content, status, opens_on, request_id)
                values ($1, $2, $3, $4, $5, $6, $7) returning id`, [slug, cls, slug, pack([REVIEW, PRACTICE]), status, opens, slug === 'maths-open' ? ids.request : null])).id
  ids.mathsOpen = await mk('maths-open', 'math:Year 5', 'published')
  ids.mathsDraft = await mk('maths-draft', 'math:Year 5', 'draft')
  ids.mathsLater = await mk('maths-later', 'math:Year 5', 'published', '2099-01-01')
  ids.englishOpen = await mk('english-open', 'english:Year 5', 'published')
  ids.year6 = await mk('year6-open', 'math:Year 6', 'published')
  await db.query(`insert into storage.objects (bucket_id, name) values ('learn-packs', $1), ('learn-packs', $2)`,
    [`${ids.mathsOpen}/lift.webp`, `${ids.mathsDraft}/secret.webp`])
})

test('a student sees only their class\'s published, open packs', async () => {
  const slugs = await as(student('ana'), async (q) => (await q('select slug from learn_packs order by slug')).map((r) => r.slug))
  assert.deepEqual(slugs, ['english-open', 'maths-open'])
})

test('an extra class lets a student into another year group\'s pack', async () => {
  const slugs = await as(student('dan'), async (q) => (await q('select slug from learn_packs order by slug')).map((r) => r.slug))
  assert.deepEqual(slugs, ['maths-open', 'year6-open'])
})

test('a blocked login, an inactive student and a pending (trial) student', async () => {
  assert.equal((await as(student('ben'), (q) => q('select * from learn_packs'))).length, 0, 'blocked login')
  assert.equal((await as(student('eve'), (q) => q('select * from learn_packs'))).length, 0, 'inactive student')
  assert.equal((await as(student('cat'), (q) => q('select * from learn_packs'))).length, 2, 'pending student')
})

test('a student reads nothing in adm_* and passes no staff check', async () => {
  await as(student('ana'), async (q) => {
    assert.equal((await q('select * from adm_students')).length, 0)
    assert.equal((await q('select * from adm_teachers')).length, 0)
    const [h] = await q(`select adm_email() as e, adm_is_report_staff() as r, adm_is_head() as h, adm_can_attendance('Year 5') as a,
                                adm_can_subject('math', 'Year 5') as s, learn_staff_login() as l`)
    assert.deepEqual(h, { e: '', r: false, h: false, a: false, s: false, l: false })
  })
})

test('a student login with a teacher\'s email (a mistake on the Teachers page) still passes no staff check', async () => {
  const claims = { ...student('ana'), email: 'david@pra.edu.vn' }
  await as(claims, async (q) => {
    assert.equal((await q('select * from adm_students')).length, 0)
    const [r] = await q(`select adm_is_report_staff() as r, learn_can_teach('math:Year 5') as t`)
    assert.deepEqual(r, { r: false, t: false })
  })
})

test('a student reads only their own login and progress', async () => {
  await asKeep(student('ben'), async () => {}) // nothing to save for ben (blocked)
  await asKeep(student('dan'), async (q) => {
    await q(`select learn_save($1, 'review', '{"c1": {"ok": true}}', false)`, [ids.mathsOpen])
  })
  await as(student('ana'), async (q) => {
    const acc = await q('select username from learn_accounts')
    assert.deepEqual(acc.map((r) => r.username), ['anaword11'])
    assert.equal((await q('select * from learn_progress')).length, 0, 'dan\'s progress is not ana\'s')
  })
})

test('a student cannot write to the tables directly', async () => {
  await as(student('ana'), async (q) => {
    await fails(q(`insert into learn_progress (student_id, pack_id, part) values ($1, $2, 'review')`, [ids.ana, ids.mathsOpen]), /permission denied/)
    await fails(q(`update learn_accounts set extra_classes = '{math:Year 6}' where student_id = $1`, [ids.ana]), /permission denied/)
    await fails(q(`insert into learn_packs (slug, class_key, title, content) values ('x-pack', 'math:Year 5', 'x', $1)`, [pack([])]), /row-level security/)
    const changed = await q(`update learn_packs set due_on = '2030-01-01' where id = $1 returning id`, [ids.mathsOpen])
    assert.equal(changed.length, 0)
  })
})

test('learn_save scores right-first-time and keeps runs', async () => {
  await asKeep(student('ana'), async (q) => {
    let [r] = await q(`select (learn_save($1, 'review', $2, true)).*`, [ids.mathsOpen,
      JSON.stringify({ c1: { ok: true, tries: 1 }, c2: { ok: false, tries: 3, slips: ['s1', 's2'], hints: 1 }, c3: { ok: 'yes' }, bogus: { ok: true } })])
    assert.equal(Number(r.score), 0.3333)
    assert.equal(r.runs, 1)
    assert.equal(Number(r.first_score), 0.3333)
    assert.ok(!('bogus' in r.items), 'unknown ids are dropped')
    assert.equal(r.items.c3.ok, false, 'only a real true counts')
    assert.deepEqual(r.items.c2, { ok: false, tries: 3, hints: 1, shown: false, slips: ['s1', 's2'] });
    [r] = await q(`select (learn_save($1, 'review', $2, false)).*`, [ids.mathsOpen, JSON.stringify({ c1: { ok: true } })]);
    [r] = await q(`select (learn_save($1, 'review', $2, true)).*`, [ids.mathsOpen, JSON.stringify({ c1: { ok: true }, c2: { ok: true }, c3: { ok: true } })])
    assert.equal(r.runs, 2)
    assert.equal(Number(r.best_score), 1)
    assert.equal(Number(r.first_score), 0.3333, 'the first run is kept for the teacher')
    await fails(q(`select learn_save($1, 'review', '{}', false)`, [ids.mathsDraft]), /not open/)
    await fails(q(`select learn_save($1, 'review', '{}', false)`, [ids.mathsLater]), /not open/)
    await fails(q(`select learn_save($1, 'review', '{}', false)`, [ids.year6]), /not open/)
    await fails(q(`select learn_save($1, 'nope', '{}', false)`, [ids.mathsOpen]), /no part/)
    await fails(q(`select learn_save($1, 'review', '[1]', false)`, [ids.mathsOpen]), /right shape/)
  })
})

test('a student cannot use the staff functions', async () => {
  await as(student('ana'), async (q) => {
    await fails(q(`select learn_class_overview('math:Year 5')`), /does not teach/)
    await fails(q(`select learn_pack_misses($1)`, [ids.mathsOpen]), /cannot see/)
    const [r] = await q(`select learn_request_results($1) as r`, [ids.request])
    assert.deepEqual(r.r.packs, [])
    const [c] = await q(`select learn_my_classes() as c`)
    assert.deepEqual(c.c, [])
    const [m] = await q(`select learn_me_info() as m`)
    assert.equal(m.m.name, 'ana')
    assert.equal(m.m.year_group, 'Year 5')
    await fails(q(`select * from learn_class_students('math:Year 5')`), /permission denied/)
  })
})

test('pictures: a student reads only the folders of packs they can see', async () => {
  const names = await as(student('ana'), async (q) => (await q(`select name from storage.objects where bucket_id = 'learn-packs'`)).map((r) => r.name))
  assert.deepEqual(names, [`${ids.mathsOpen}/lift.webp`])
  await as(student('ana'), async (q) => {
    await fails(q(`insert into storage.objects (bucket_id, name) values ('learn-packs', $1)`, [`${ids.mathsOpen}/x.png`]), /row-level security/)
  })
})

test('anon can do nothing', async () => {
  await as(null, async (q) => {
    await fails(q('select * from learn_packs'), /permission denied/)
    await fails(q('select * from learn_accounts'), /permission denied/)
    await fails(q(`select learn_save($1, 'review', '{}', false)`, [ids.mathsOpen]), /permission denied/)
    await fails(q(`select learn_my_classes()`), /permission denied/)
    await fails(q(`select adm_is_report_staff()`), /permission denied/)
  })
})

test('a stranger from an open sign-up sees nothing', async () => {
  await as(STRANGER, async (q) => {
    assert.equal((await q('select * from learn_packs')).length, 0)
    assert.equal((await q('select * from learn_accounts')).length, 0)
    assert.equal((await q('select * from learn_progress')).length, 0)
    assert.equal((await q('select * from adm_teachers')).length, 0, 'the teachers list is staff only after the hardening')
    assert.deepEqual((await q('select learn_my_classes() as c'))[0].c, [])
    await fails(q(`select learn_class_overview('math:Year 5')`), /does not teach/)
  })
})

test('a teacher sees their classes, opens and dates packs, but cannot change the content', async () => {
  await as(DAVID, async (q) => {
    const slugs = (await q('select slug from learn_packs order by slug')).map((r) => r.slug)
    assert.deepEqual(slugs, ['maths-draft', 'maths-later', 'maths-open'])
    const [o] = await q(`select learn_class_overview('math:Year 5') as o`)
    const names = o.o.students.map((s) => s.name).sort()
    assert.deepEqual(names, ['ana', 'ben', 'cat', 'dan', 'fay'], 'Year 5 enrolled (pending included) plus dan\'s extra class')
    assert.equal(o.o.students.find((s) => s.name === 'fay').login, 'none')
    assert.equal(o.o.students.find((s) => s.name === 'ben').login, 'off')
    assert.equal(o.o.packs.length, 3)
    assert.deepEqual(o.o.packs.find((p) => p.slug === 'maths-open').parts, [{ id: 'review', kind: 'review', total: 3 }, { id: 'practice', kind: 'practice', total: 2 }])
    await fails(q(`select learn_class_overview('english:Year 5')`), /does not teach/)
    const accounts = (await q('select username from learn_accounts order by username')).map((r) => r.username)
    assert.deepEqual(accounts, ['anaword11', 'benword11', 'catword11', 'danword22', 'eveword11'], 'logins in his year group (a leaver included, so it can be blocked) and dan (extra class)')
    const [row] = await q(`update learn_packs set status = 'published', due_on = '2030-02-01', content = $2, title = 'Hacked'
                           where id = $1 returning status, due_on, title, version, published_by`, [ids.mathsDraft, pack([])])
    assert.equal(row.status, 'published')
    assert.equal(row.title, 'maths-draft', 'the title is kept')
    assert.equal(row.version, 1, 'the content is kept')
    assert.equal(row.published_by, 'Mr. David')
    const del = await q(`delete from learn_packs where id = $1 returning id`, [ids.mathsDraft])
    assert.equal(del.length, 0, 'only a head teacher deletes')
    assert.equal((await q('select * from adm_teachers')).length, 3, 'staff still read the teachers list')
    assert.equal((await q('select * from adm_students')).length, 6, 'and the students')
  })
})

test('a teacher with no role (made with Create login) still counts', async () => {
  await as(KIU, async (q) => {
    const [o] = await q(`select learn_class_overview('english:Year 5') as o`)
    assert.equal(o.o.packs.length, 1)
    const [c] = await q(`select learn_my_classes() as c`)
    assert.deepEqual(c.c.map((x) => x.class_key), ['english:Year 5', 'science:Year 5'])
    assert.equal((await q('select * from adm_students')).length, 6)
  })
})

test('common misses and the Lessons request results', async () => {
  await as(DAVID, async (q) => {
    const [m] = await q(`select learn_pack_misses($1) as m`, [ids.mathsOpen])
    const c2 = m.m.find((x) => x.id === 'c2')
    assert.equal(c2.asked, 1)
    assert.equal(c2.wrong_first, 1)
    assert.deepEqual(c2.slips, { s1: 1, s2: 1 })
    const [r] = await q(`select learn_request_results($1) as r`, [ids.request])
    assert.equal(r.r.packs.length, 1)
    const p = r.r.packs[0]
    assert.equal(p.links.review, 'https://learn.pra.edu.vn/#/p/maths-open/review')
    assert.equal(p.students, 4, 'enrolled Year 5 students')
    const review = p.parts.find((x) => x.id === 'review')
    assert.equal(review.started, 2)
    assert.equal(review.finished, 1)
    assert.equal(Number(review.avg_first_score), 0.33)
    assert.ok(p.misses.length >= 1)
  })
  await as(KIU, async (q) => {
    const [r] = await q(`select learn_request_results($1) as r`, [ids.request])
    assert.deepEqual(r.r.packs, [], 'a teacher of another class sees no results')
  })
})

test('the operator adds and changes packs; office sees every class; the head deletes', async () => {
  await as(TRIAGE, async (q) => {
    const [p] = await q(`insert into learn_packs (slug, class_key, title, content) values ('new-pack', 'science:Year 5', 'New', $1) returning id, version, created_by`, [pack([REVIEW])])
    assert.equal(p.created_by, 'Lesson builder')
    const [u] = await q(`update learn_packs set content = $2 where id = $1 returning version`, [p.id, pack([REVIEW, PRACTICE])])
    assert.equal(u.version, 2)
    await q(`insert into storage.objects (bucket_id, name) values ('learn-packs', $1)`, [`${p.id}/a.png`])
  })
  await as(OFFICE, async (q) => {
    const [c] = await q(`select learn_my_classes() as c`)
    assert.deepEqual(c.c.map((x) => x.class_key), ['cooking:Year 5', 'english:Year 5', 'math:Year 5', 'science:Year 5', 'english:Year 7'])
    const [o] = await q(`select learn_class_overview('english:Year 7') as o`)
    assert.equal(o.o.students.length, 0)
    const del = await q(`delete from learn_packs where id = $1 returning id`, [ids.year6])
    assert.equal(del.length, 0, 'office (admin) is not a head teacher')
  })
  await as(HEAD, async (q) => {
    const del = await q(`delete from learn_packs where id = $1 returning id`, [ids.year6])
    assert.equal(del.length, 1)
  })
})

test('the learn-accounts checks, asked as the caller', async () => {
  await as(DAVID, async (q) => {
    const [r] = await q(`select learn_can_manage_class('math:Year 5') a, learn_can_manage_class('english:Year 5') b,
                                learn_can_manage_student($1) c, learn_can_manage_student($2) d`, [ids.ana, ids.dan])
    assert.deepEqual(r, { a: true, b: false, c: true, d: true })
  })
  await as(student('ana'), async (q) => {
    const [r] = await q(`select learn_can_manage_class('math:Year 5') a, learn_can_manage_student($1) b`, [ids.ana])
    assert.deepEqual(r, { a: false, b: false })
  })
})

test('every UPDATE and DELETE in the SQL files has a WHERE (pg-safeupdate)', () => {
  for (const [name, sql] of [['learn-schema.sql', SCHEMA], ['current-hardening.sql', HARDENING]]) {
    const code = sql.replace(/--[^\n]*/g, '')
    for (const m of code.matchAll(/\b(update\s+[a-z_.]+\s+(?:as\s+\w+\s+)?set|delete\s+from)\b/gi)) {
      if (/do\s+update\s+set/i.test(code.slice(Math.max(0, m.index - 12), m.index + m[0].length))) continue
      const rest = code.slice(m.index, code.indexOf(';', m.index))
      assert.match(rest, /\bwhere\b/i, `${name}: "${rest.slice(0, 80)}" has no WHERE`)
    }
  }
})
