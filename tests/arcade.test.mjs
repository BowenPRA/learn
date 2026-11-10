// supabase/learn-arcade.sql in PGlite: a student pays for plays and banks scores through
// the functions only, the leaderboard shows their own year group by login-card name,
// and nobody else gets a row.
//
//   npm test
import { test, before } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { PGlite } from '@electric-sql/pglite'

const read = (p) => readFileSync(new URL(p, import.meta.url), 'utf8')
let db
const ids = {}

async function as(claims, fn) {
  return db.transaction(async (tx) => {
    await tx.query(`select set_config('request.jwt.claims', $1, true)`, [claims ? JSON.stringify(claims) : ''])
    await tx.exec(`set local role ${claims ? 'authenticated' : 'anon'}`)
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
const student = (key) => ({ sub: ids[`u_${key}`], role: 'authenticated', email: `${key}@learn.pra.edu.vn`, app_metadata: { role: 'student', student_id: ids[key] } })
const DAVID = { sub: crypto.randomUUID(), role: 'authenticated', email: 'david@pra.edu.vn', app_metadata: { role: 'teacher' } }
const STRANGER = { sub: crypto.randomUUID(), role: 'authenticated', email: 'someone@gmail.com', app_metadata: {} }

before(async () => {
  db = new PGlite()
  await db.exec(read('./sql/stubs.sql'))
  await db.exec(read('../supabase/current-hardening.sql'))
  await db.exec(read('../supabase/learn-schema.sql'))
  for (const [key, level] of [['ana', 'Year 7'], ['ben', 'Year 7'], ['dan', 'Year 8']]) {
    ids[key] = (await db.query(`insert into adm_students (full_name, nickname, level, status, active) values ($1, $2, $3, 'active', true) returning id`, [`Learner ${key}`, key, level])).rows[0].id
    ids[`u_${key}`] = crypto.randomUUID()
    await db.query(`insert into auth.users (id, email, last_sign_in_at) values ($1, $2, now())`, [ids[`u_${key}`], `${key}@learn.pra.edu.vn`])
    await db.query(`insert into learn_accounts (user_id, student_id, username, active) values ($1, $2, $3, true)`, [ids[`u_${key}`], ids[key], `${key}word11`])
  }
  await db.exec(`insert into adm_teachers (email, name, title, role, subjects, homeroom_groups) values
    ('david@pra.edu.vn', 'David', 'Mr.', 'teacher', array['math:Year 7'], array[]::text[])`)
  const sql = read('../supabase/learn-arcade.sql')
  await db.exec(sql)
  await db.exec(sql) // safe to run again
})

test('a student pays for plays; the total spent adds up; a silly price is refused', async () => {
  await as(student('ana'), async (q) => {
    assert.equal((await q(`select learn_arcade_spend(25) as spent`))[0].spent, 25)
    assert.equal((await q(`select learn_arcade_spend(25) as spent`))[0].spent, 50)
    await fails(q(`select learn_arcade_spend(-500)`), /Not a price/)
    await fails(q(`select learn_arcade_spend(100000)`), /Not a price/)
    assert.deepEqual(await q(`select spent from learn_arcade_wallet`), [{ spent: 50 }])
  })
})

test('a score is banked as the best so far; bad levels, games and scores are refused', async () => {
  await as(student('ana'), async (q) => {
    assert.equal((await q(`select learn_arcade_score('ARC_1', 'td', 4200) as best`))[0].best, 4200)
    assert.equal((await q(`select learn_arcade_score('ARC_1', 'td', 900) as best`))[0].best, 4200)
    await fails(q(`select learn_arcade_score('ARC 1; drop', 'td', 10)`), /Not a level/)
    await fails(q(`select learn_arcade_score('ARC_1', 'chess', 10)`), /Not a game/)
    await fails(q(`select learn_arcade_score('ARC_1', 'td', -5)`), /Not a score/)
  })
  await as(student('ben'), (q) => q(`select learn_arcade_score('ARC_1', 'td', 6100)`))
  await as(student('dan'), (q) => q(`select learn_arcade_score('ARC_1', 'td', 99000)`))
})

test('a student cannot write the tables directly, and reads only their own rows', async () => {
  await as(student('ana'), async (q) => {
    await fails(q(`update learn_arcade_wallet set spent = 0 where student_id = $1`, [ids.ana]), /permission denied/)
    await fails(q(`insert into learn_arcade_scores (student_id, level, game, best) values ($1, 'ARC_1', 'td', 999999)`, [ids.ana]), /permission denied/)
    assert.equal((await q(`select count(*)::int as n from learn_arcade_scores`))[0].n, 1)
  })
})

test('the leaderboard shows the caller\'s year group by login-card name, best first', async () => {
  const board = await as(student('ana'), (q) => q(`select name, score from learn_arcade_board('ARC_1', 'td')`))
  assert.deepEqual(board, [{ name: 'ben', score: 6100 }, { name: 'ana', score: 4200 }])
  const year8 = await as(student('dan'), (q) => q(`select name, score from learn_arcade_board('ARC_1', 'td')`))
  assert.deepEqual(year8, [{ name: 'dan', score: 99000 }])
  assert.deepEqual(await as(student('ana'), (q) => q(`select * from learn_arcade_board('ARC_1', 'survivor')`)), [])
})

test('staff see every year group on the board and save nothing; a stranger and anon get nothing', async () => {
  await as(DAVID, async (q) => {
    assert.equal((await q(`select * from learn_arcade_board('ARC_1', 'td')`)).length, 3)
    assert.equal((await q(`select learn_arcade_spend(25) as spent`))[0].spent, null)
    assert.equal((await q(`select learn_arcade_score('ARC_1', 'td', 5) as best`))[0].best, null)
  })
  assert.deepEqual(await as(STRANGER, (q) => q(`select * from learn_arcade_board('ARC_1', 'td')`)), [])
  await fails(as(null, (q) => q(`select * from learn_arcade_board('ARC_1', 'td')`)), /permission denied/)
})
