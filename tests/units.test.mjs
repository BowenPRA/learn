// supabase/learn-units.sql in PGlite: a database that ran the first version of the file
// (five fixed part names) is brought up to date by the current one, nothing saved is
// lost, and a student can then save a task under the unit's own task id.
//
//   npm test
import { test, before } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { PGlite } from '@electric-sql/pglite'

const read = (p) => readFileSync(new URL(p, import.meta.url), 'utf8')
let db
const ids = {}

// Run `fn(q)` as a signed-in user, kept; each query in a savepoint so a failure is not final.
async function as(claims, fn) {
  return db.transaction(async (tx) => {
    await tx.query(`select set_config('request.jwt.claims', $1, true)`, [JSON.stringify(claims)])
    await tx.exec('set local role authenticated')
    return fn(async (sql, params) => {
      await tx.exec('savepoint q')
      try {
        const rows = (await tx.query(sql, params)).rows
        await tx.exec('release savepoint q')
        return rows
      } catch (e) {
        await tx.exec('rollback to savepoint q')
        throw e
      }
    })
  })
}
const fails = async (p, re) => {
  let err = null
  try { await p } catch (e) { err = e }
  assert.ok(err, 'expected an error')
  assert.match(err.message, re)
}
const ana = () => ({ sub: ids.user, role: 'authenticated', email: 'ana@learn.pra.edu.vn', app_metadata: { role: 'student', student_id: ids.ana } })
const DAVID = { sub: crypto.randomUUID(), role: 'authenticated', email: 'david@pra.edu.vn', app_metadata: { role: 'teacher' } }
const SAVE = `select * from learn_unit_save($1, $2, $3, $4, false, $5, $6)`

before(async () => {
  db = new PGlite()
  await db.exec(read('./sql/stubs.sql'))
  await db.exec(read('../supabase/current-hardening.sql'))
  await db.exec(read('../supabase/learn-schema.sql'))
  ids.ana = (await db.query(`insert into adm_students (full_name, nickname, level, status, active) values ('Learner ana', 'ana', 'Year 7', 'active', true) returning id`)).rows[0].id
  ids.user = crypto.randomUUID()
  await db.query(`insert into auth.users (id, email, last_sign_in_at) values ($1, 'ana@learn.pra.edu.vn', now())`, [ids.user])
  await db.query(`insert into learn_accounts (user_id, student_id, username, active) values ($1, $2, 'anaword11', true)`, [ids.user, ids.ana])
  await db.exec(`insert into adm_teachers (email, name, title, role, subjects, homeroom_groups) values
    ('david@pra.edu.vn', 'David', 'Mr.', 'teacher', array['science:Year 7'], array[]::text[])`)

  // The live database as it was: the first version, with a lesson already saved.
  await db.exec(read('./sql/learn-units-v1.sql'))
  await as(ana(), (q) => q(SAVE, ['Y7_SCI/U03_4', 'lesson', 0.6, true, null, 'science:Year 7']))
})

test('the first version refuses a task id of the unit\'s own', async () => {
  await fails(as(ana(), (q) => q(SAVE, ['Y7_MATH/U05_3', 'protractor', 0.5, false, null, 'math:Year 7'])), /Not a part/)
})

test('the current file upgrades it, twice over, and keeps what was saved', async () => {
  const sql = read('../supabase/learn-units.sql')
  await db.exec(sql)
  await db.exec(sql)
  const rows = (await db.query(`select part, best, runs from learn_unit_progress`)).rows
  assert.deepEqual(rows.map((r) => [r.part, Number(r.best), r.runs]), [['lesson', 0.6, 1]])
})

test('a student saves a task under its own id; the best score is kept', async () => {
  await as(ana(), async (q) => {
    const [first] = await q(SAVE, ['Y7_MATH/U05_3', 'protractor', 0.75, false, JSON.stringify({ m1: 1 }), 'math:Year 7'])
    assert.equal(Number(first.best), 0.75)
    const [second] = await q(SAVE, ['Y7_MATH/U05_3', 'protractor', 0.5, true, null, 'math:Year 7'])
    assert.deepEqual([Number(second.best), Number(second.last), second.runs, second.saved], [0.75, 0.5, 1, { m1: 1 }])
    const mine = await q(`select unit_key, part from learn_unit_progress order by unit_key`)
    assert.deepEqual(mine.map((r) => `${r.unit_key}/${r.part}`), ['Y7_MATH/U05_3/protractor', 'Y7_SCI/U03_4/lesson'])
  })
})

test('a task id of the wrong shape, another class\'s unit and a direct write are refused', async () => {
  await as(ana(), async (q) => {
    await fails(q(SAVE, ['Y7_MATH/U05_3', 'Protractor!', 1, true, null, 'math:Year 7']), /Not a task/)
    await fails(q(SAVE, ['Y5_MATH/U01', 'lesson', 1, true, null, 'math:Year 5']), /not for your class/)
    await fails(q(`insert into learn_unit_progress (student_id, unit_key, class_key, part) values ($1, 'Y7_MATH/U05_3', 'math:Year 7', 'quads')`, [ids.ana]), /permission denied/)
    await fails(q(`update learn_unit_progress set best = 1 where student_id = $1`, [ids.ana]), /permission denied/)
  })
})

test('a teacher reads the rows of a class they teach, and saves nothing', async () => {
  await as(DAVID, async (q) => {
    const rows = await q(`select unit_key, part from learn_unit_progress`)
    assert.deepEqual(rows.map((r) => `${r.unit_key}/${r.part}`), ['Y7_SCI/U03_4/lesson'])
    const [saved] = await q(SAVE, ['Y7_SCI/U03_4', 'lesson', 1, true, null, 'science:Year 7'])
    assert.equal(saved.student_id, null)
  })
})
