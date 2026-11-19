// supabase/learn-games.sql in PGlite: a classroom game's list (Guess the Teacher's
// teachers) is read and saved by staff logins only, through the two functions; a
// student, a stranger and a visitor with no login get nothing.
//
//   npm test
import { test, before } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { PGlite } from '@electric-sql/pglite'

const read = (p) => readFileSync(new URL(p, import.meta.url), 'utf8')
let db

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
const DAVID = { sub: crypto.randomUUID(), role: 'authenticated', email: 'david@pra.edu.vn', app_metadata: { role: 'teacher' } }
const OFFICE = { sub: crypto.randomUUID(), role: 'authenticated', email: 'admin@palmriveracademy.edu.vn', app_metadata: { role: 'admin' } }
const STUDENT = { sub: crypto.randomUUID(), role: 'authenticated', email: 'ana@learn.pra.edu.vn', app_metadata: { role: 'student' } }
// Signed in, no role, not on the Teachers page.
const STRANGER = { sub: crypto.randomUUID(), role: 'authenticated', email: 'someone@gmail.com', app_metadata: {} }
const LIST = { v: 1, shuffle: false, teachers: [{ id: 'a1', emojis: ['🏠', '📞'], name: 'Ms. Hien', also: [], on: true }] }

before(async () => {
  db = new PGlite()
  await db.exec(read('./sql/stubs.sql'))
  await db.exec(read('../supabase/current-hardening.sql'))
  await db.exec(read('../supabase/learn-schema.sql'))
  await db.exec(`insert into adm_teachers (email, name, title, role, subjects, homeroom_groups) values
    ('david@pra.edu.vn', 'David', 'Mr.', 'teacher', array['math:Year 7'], array[]::text[])`)
  const sql = read('../supabase/learn-games.sql')
  await db.exec(sql)
  await db.exec(sql) // safe to run again
})

test('nothing saved yet: a staff login reads null', async () => {
  await as(DAVID, async (q) => {
    assert.equal((await q(`select learn_game_set('guess-the-teacher') as row`))[0].row, null)
  })
})

test('the office login saves the list, and a teacher reads it back with who saved it', async () => {
  await as(OFFICE, (q) => q(`select learn_save_game_set('guess-the-teacher', $1::jsonb)`, [JSON.stringify(LIST)]))
  await as(DAVID, async (q) => {
    const row = (await q(`select learn_game_set('guess-the-teacher') as row`))[0].row
    assert.deepEqual(row.data, LIST)
    assert.equal(row.updated_by, 'admin@palmriveracademy.edu.vn')
  })
  // A second save replaces the first.
  const next = { ...LIST, shuffle: true }
  await as(DAVID, (q) => q(`select learn_save_game_set('guess-the-teacher', $1::jsonb)`, [JSON.stringify(next)]))
  await as(OFFICE, async (q) => {
    const row = (await q(`select learn_game_set('guess-the-teacher') as row`))[0].row
    assert.equal(row.data.shuffle, true)
    assert.equal(row.updated_by, 'david@pra.edu.vn')
  })
})

test('a student or a stranger reads nothing and cannot save', async () => {
  for (const who of [STUDENT, STRANGER]) {
    await as(who, async (q) => {
      assert.equal((await q(`select learn_game_set('guess-the-teacher') as row`))[0].row, null)
      await fails(q(`select learn_save_game_set('guess-the-teacher', '{}'::jsonb)`), /Staff only/)
      await fails(q(`select * from learn_game_sets`), /permission denied/)
    })
  }
})

test('no login at all (a player\'s phone) cannot even call the functions', async () => {
  await as(null, async (q) => {
    await fails(q(`select learn_game_set('guess-the-teacher')`), /permission denied/)
    await fails(q(`select learn_save_game_set('guess-the-teacher', '{}'::jsonb)`), /permission denied/)
  })
})

test('a bad game name or a list that is not an object is refused', async () => {
  await as(DAVID, async (q) => {
    await fails(q(`select learn_save_game_set('Guess The Teacher!', '{}'::jsonb)`), /check constraint/)
    await fails(q(`select learn_save_game_set('guess-the-teacher', '[1,2]'::jsonb)`), /check constraint/)
  })
})
