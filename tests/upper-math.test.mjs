// Upper Secondary Maths Unit 1 (21 November 2026): every Balance equation solves in its
// target number of moves with the engine's own "Show me", every step set passes its
// checker, and every typed lesson question has one answer.
//
//   npm test
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { parseEquation, parSteps, suggestMove, applyMove, isSolved } from '../unit/src/utils/linearEquation.js'
import { checkStepPractice } from '../unit/src/stepPractice/check.js'
import { checkFillActivity } from '../unit/src/utils/fracFill.js'
import { checkActivity } from '../unit/src/utils/activity.js'
import { checkWorking } from '../unit/src/utils/working.js'
import { U01_DATA } from '../unit/src/data/UPPER_MATH/U01/data.js'
import working from '../unit/content/UPPER_MATH/U01/working.js'
import mistake from '../unit/content/UPPER_MATH/U01/mistake.js'
import story from '../unit/content/UPPER_MATH/U01/story.js'
import { UNITS, unitXP } from '../src/data/units.js'

test('Balance: every equation solves by Show me in its target moves', () => {
  for (const b of U01_DATA.balance) {
    let eq = parseEquation(b.equation)
    const par = parSteps(eq)
    let n = 0
    while (!isSolved(eq) && n < 10) { eq = applyMove(eq, suggestMove(eq)); n += 1 }
    assert.ok(isSolved(eq), `${b.id} ${b.equation} is not solved`)
    assert.equal(n, par, `${b.id} ${b.equation}`)
  }
})

test('the three step sets pass their checker (warnings only)', () => {
  for (const set of [working, mistake, story]) {
    const problems = checkStepPractice(set).filter((p) => !p.startsWith('warning'))
    assert.deepEqual(problems, [], set.title)
  }
})

test('the lesson: every question and every worked example proves, the counts are on the title slide', () => {
  const fills = U01_DATA.notes.filter((s) => s.activity?.type === 'fill')
  assert.equal(fills.length, 4)
  for (const s of fills) assert.deepEqual(checkFillActivity(s.activity), [], s.title)
  for (const s of U01_DATA.notes.filter((x) => x.activity)) assert.deepEqual(checkActivity(s.activity, { bilingual: false }), [], s.title)
  // 22 November 2026: every worked example is a notebook working that ends with x on its own
  const works = U01_DATA.notes.filter((s) => s.layout === 'work' && s.work)
  assert.equal(works.length, 6)
  for (const s of works) assert.deepEqual(checkWorking(s.work), [], s.title)
  assert.equal(U01_DATA.notes.length, 16)
  assert.ok(U01_DATA.notes.every((s) => !/\$[^$]*\$[^$]*\$/.test(s.title || '')), 'no stray $ in titles')
  assert.match(U01_DATA.notes[0].chips[0].text, /^9 things/)
  assert.match(U01_DATA.notes[0].chips[1].text, /^11 questions/)
})

test('the unit offers 135 XP and stops at 100', () => {
  const u = UNITS.find((x) => x.track === 'UPPER_MATH' && x.unit === 'U01')
  assert.equal(u.classKey, 'math:Upper Secondary')
  const full = Object.fromEntries(u.tasks.map((t) => [t.id, { best: 1, runs: 1 }]))
  assert.deepEqual(unitXP(u, full), { xp: 100, offer: 135, done: true })
  // 80 XP with the quiz done finishes it; 80 without the quiz does not
  const part = { lesson: { best: 1, runs: 1 }, words: { best: 1, runs: 1 }, balance: { best: 1, runs: 1 }, working: { best: 1, runs: 1 } }
  assert.equal(unitXP(u, part).done, false)
  assert.equal(unitXP(u, { ...part, quiz: { best: 0, runs: 1 } }).done, true)
})
