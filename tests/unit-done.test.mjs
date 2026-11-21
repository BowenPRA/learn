// When a unit counts as finished (src/data/units.js unitXP): the usual rule, and a unit
// that names tasks in `mustFinish` (Upper Secondary English: the quiz and the timed writing).
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { UNITS, mustFinishOf, unitXP } from '../src/data/units.js'

const english = UNITS.find((u) => u.track === 'UPPER_ENG' && u.unit === 'U01')
const full = { best: 1, runs: 1 }
const all = (unit, except = []) => Object.fromEntries(unit.tasks.filter((t) => !except.includes(t.id)).map((t) => [t.id, full]))

test('English 1 has no One paragraph task and must finish the quiz and the timed writing', () => {
  assert.equal(english.tasks.some((t) => t.id === 'paragraph'), false)
  assert.deepEqual(mustFinishOf(english).map((t) => t.id), ['quiz', 'writing'])
})

test('English 1 is not finished without the timed writing, even at 100 XP', () => {
  const sum = unitXP(english, all(english, ['writing']))
  assert.equal(sum.xp, 90)
  assert.equal(sum.done, false)
  const boosted = { ...all(english, ['writing']), writing: { best: 0.4, runs: 0 } } // started, never handed in
  assert.equal(unitXP(english, boosted).xp, 100)
  assert.equal(unitXP(english, boosted).done, false)
})

test('English 1 is not finished without the quiz', () => {
  assert.equal(unitXP(english, all(english, ['quiz'])).done, false)
})

test('English 1 is finished with both done and 80 XP', () => {
  const recs = { quiz: full, writing: full, edit: full, findfix: full } // 15 + 30 + 20 + 15
  assert.equal(unitXP(english, recs).xp, 80)
  assert.equal(unitXP(english, recs).done, true)
  assert.equal(unitXP(english, { quiz: full, writing: full }).done, false) // 45 XP
})

test('a unit without mustFinish keeps the old rule', () => {
  const other = UNITS.find((u) => !u.mustFinish && u.tasks.some((t) => t.kind === 'quiz'))
  const quiz = other.tasks.find((t) => t.kind === 'quiz')
  assert.equal(unitXP(other, all(other)).done, true)
  const noQuiz = all(other, [quiz.id])
  assert.equal(unitXP(other, noQuiz).done, unitXP(other, noQuiz).xp >= 100)
})

// Unit 2 (21 November 2026): Unit 1's tasks and XP, and a reading task that is not
// needed to finish.
const english2 = UNITS.find((u) => u.track === 'UPPER_ENG' && u.unit === 'U02')

test('English 2 offers 130 XP with a reading task, and must finish the quiz and the timed writing', () => {
  assert.deepEqual(english2.tasks.map((t) => t.id), ['lesson', 'words', 'edit', 'findfix', 'rewrite', 'reading', 'quiz', 'writing'])
  assert.equal(unitXP(english2, {}).offer, 130)
  assert.deepEqual(mustFinishOf(english2).map((t) => t.id), ['quiz', 'writing'])
  assert.equal(unitXP(english2, all(english2, ['writing'])).done, false)
  assert.equal(unitXP(english2, all(english2, ['reading'])).done, true)
})

// Unit 3 (21 November 2026): the same tasks and XP as Unit 2.
const english3 = UNITS.find((u) => u.track === 'UPPER_ENG' && u.unit === 'U03')

test('English 3 offers 130 XP with a reading task, and must finish the quiz and the timed writing', () => {
  assert.deepEqual(english3.tasks.map((t) => t.id), ['lesson', 'words', 'edit', 'findfix', 'rewrite', 'reading', 'quiz', 'writing'])
  assert.equal(unitXP(english3, {}).offer, 130)
  assert.deepEqual(mustFinishOf(english3).map((t) => t.id), ['quiz', 'writing'])
  assert.equal(unitXP(english3, all(english3, ['writing'])).done, false)
  assert.equal(unitXP(english3, all(english3, ['reading'])).done, true)
})
