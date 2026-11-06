// The teacher's "Common slips": learn_save keeps the slip keys the step engine reports
// (never what a child typed) and learn_pack_misses counts them per item and says which
// children hit each one. PGlite, with the same stand-ins as pg.test.mjs.
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
    await tx.query(`select set_config('request.jwt.claims', $1, true)`, [JSON.stringify(claims)])
    await tx.exec('set local role authenticated')
    return fn(async (sql, params) => (await tx.query(sql, params)).rows)
  })
}
const student = (key) => ({ sub: ids[`u_${key}`], role: 'authenticated', email: `${key}@learn.pra.edu.vn`, app_metadata: { role: 'student', student_id: ids[key] } })
const DAVID = { sub: crypto.randomUUID(), role: 'authenticated', email: 'david@pra.edu.vn', app_metadata: { role: 'teacher' } }
const STRANGER = { sub: crypto.randomUUID(), role: 'authenticated', email: 'someone@gmail.com', app_metadata: {} }

const PACK = JSON.stringify({ format: 'pra-learn-pack/1', parts: [
  { id: 'practice', kind: 'practice', set: { items: [{ id: 'p1', level: 'focus', steps: [] }, { id: 'p2', level: 'focus', steps: [] }] } },
] })

before(async () => {
  db = new PGlite()
  await db.exec(read('./sql/stubs.sql'))
  await db.exec(read('../supabase/current-hardening.sql'))
  await db.exec(read('../supabase/learn-schema.sql'))
  const one = async (sql, params) => (await db.query(sql, params)).rows[0]
  for (const key of ['ana', 'ben', 'cat']) {
    ids[key] = (await one(`insert into adm_students (full_name, nickname, level, status, active) values ($1, $1, 'Year 5', 'active', true) returning id`, [`Learner ${key}`])).id
    ids[`u_${key}`] = crypto.randomUUID()
    await db.query(`insert into auth.users (id, email, last_sign_in_at) values ($1, $2, now())`, [ids[`u_${key}`], `${key}@learn.pra.edu.vn`])
    await db.query(`insert into learn_accounts (user_id, student_id, username, active) values ($1, $2, $3, true)`, [ids[`u_${key}`], ids[key], `${key}word11`])
  }
  await db.exec(`insert into adm_teachers (email, name, title, role, subjects, homeroom_groups) values
    ('david@pra.edu.vn', 'David', 'Mr.', 'teacher', array['math:Year 5'], array[]::text[])`)
  ids.pack = (await one(`insert into learn_packs (slug, class_key, title, content, status) values ('slips', 'math:Year 5', 'Slips', $1, 'published') returning id`, [PACK])).id
})

test('slip keys are saved, typed answers are dropped', async () => {
  const save = (key, items, done) => as(student(key), (q) => q(`select (learn_save($1, 'practice', $2, $3)).items`, [ids.pack, JSON.stringify(items), done]))
  const [r] = await save('ana', {
    p1: { ok: false, tries: 3, shown: true, slips: ['s2.1', 'neg-sign', 'I typed 13!', '<b>x</b>'] },
    p2: { ok: true, tries: 1, slips: [] },
  }, true)
  assert.deepEqual(r.items.p1.slips, ['s2.1', 'neg-sign'])
  assert.equal(r.items.p1.tries, 3)
  await save('ben', { p1: { ok: false, tries: 2, slips: ['s2.1'] }, p2: { ok: false, tries: 2, slips: ['s1.1'] } }, true)
  await save('cat', { p1: { ok: true, tries: 2, slips: ['s2.1'] } }, false)   // a wrong turn put right, run not finished
})

test('learn_pack_misses counts each slip and names the children', async () => {
  const [m] = await as(DAVID, (q) => q('select learn_pack_misses($1) as m', [ids.pack]))
  const p1 = m.m.find((x) => x.part === 'practice' && x.id === 'p1')
  assert.equal(p1.asked, 3)
  assert.equal(p1.wrong_first, 2)
  assert.deepEqual(p1.slips, { 's2.1': 3, 'neg-sign': 1 })
  assert.deepEqual([...p1.slip_who['s2.1']].sort(), [ids.ana, ids.ben, ids.cat].sort())
  assert.deepEqual(p1.slip_who['neg-sign'], [ids.ana])
  const p2 = m.m.find((x) => x.id === 'p2')
  assert.deepEqual(p2.slips, { 's1.1': 1 })
  assert.deepEqual(p2.slip_who, { 's1.1': [ids.ben] })
})

test('only the class\'s teachers see the slips', async () => {
  let err = null
  try { await as(STRANGER, (q) => q('select learn_pack_misses($1)', [ids.pack])) } catch (e) { err = e }
  assert.match(err?.message || '', /cannot see/)
})
