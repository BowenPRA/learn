// unit/src/utils/fracFill.js — the `fill` notes question (Maths 7.1): fraction sentences
// with boxes to type into. The validator must prove every line, so a wrong answer key
// cannot ship, and the marking must accept what a student would type.
//
//   npm test
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { parseFillLine, boxesOf, fillModel, markFill, fillHint, checkFillActivity } from '../unit/src/utils/fracFill.js'

test('a line reads into numbers, fractions, mixed numbers and signs', () => {
  const boxes = boxesOf(parseFillLine('23/6 = [3] [5]/6'))
  assert.deepEqual(boxes.map((b) => [b.kind, b.answer]), [['num', '3'], ['num', '5']])
  assert.deepEqual(boxesOf(parseFillLine('5/6 {>} 7/9')).map((b) => [b.kind, b.answer]), [['sign', '>']])
  assert.throws(() => parseFillLine('3/5 = = 6/10'))
  assert.throws(() => parseFillLine('3/5 ='))
})

test('the validator proves every line', () => {
  const ok = { lines: ['3/5 = [12]/20', '3 2/5 = [17]/5', '23/6 = [3] [5]/6', '3/4 {=} 9/12', '2/5 {≠} 3/6', '5/6 {>} 7/9'] }
  assert.deepEqual(checkFillActivity(ok), [])
  assert.match(checkFillActivity({ lines: ['3/5 = [10]/20'] }).join(), /not true/)
  assert.match(checkFillActivity({ lines: ['2/5 {=} 3/6'] }).join(), /not true/)
  assert.match(checkFillActivity({ lines: ['3/5 = 12/20'] }).join(), /no box/)
  // 9/4 is 1 5/4 too, but that is not a mixed number
  assert.match(checkFillActivity({ lines: ['9/4 = [1] [5]/4'] }).join(), /not a mixed number/)
})

test('marking: right, wrong, blank and the first wrong line', () => {
  const m = fillModel({ lines: ['9/4 = [2] [1]/4', '3 1/2 = [7]/2'] })
  assert.deepEqual(markFill(m, { '0.0': '2', '0.1': '1', '1.0': ' 7 ' }), { marks: { '0.0': 'good', '0.1': 'good', '1.0': 'good' }, blank: false, firstBad: null })
  const wrong = markFill(m, { '0.0': '2', '0.1': '1', '1.0': '6' })
  assert.equal(wrong.firstBad, 1)
  assert.equal(wrong.marks['1.0'], 'bad')
  assert.equal(markFill(m, { '0.0': '2' }).blank, true)
})

test('a hint never gives the answer', () => {
  for (const [line, answer] of [['3/5 = [12]/20', '12'], ['23/6 = [3] [5]/6', '5'], ['3 2/5 = [17]/5', '17']]) {
    const h = fillHint(fillModel({ lines: [line] }).lines[0])
    assert.ok(!new RegExp(`\b${answer}\b`).test(h.en), `${line}: ${h.en}`)
    assert.ok(h.fr)
  }
})

// Upper Secondary Maths Unit 1 (21 November 2026): an equation to solve, "x = [ ]".
test('a solve line works out its own answer and marks negatives and fractions', () => {
  const m = fillModel({ lines: [{ solve: '3x + 7 = 22' }, { solve: '2x + 9 = 1' }, { solve: '2x = 5' }, { solve: 'x/3 = 4', tex: '\dfrac{x}{3} = 4' }] })
  assert.deepEqual(m.lines.map((l) => l.boxes[0].answer), ['5', '-4', '5/2', '12'])
  assert.equal(m.split, 4, 'equations take one column')
  assert.equal(m.lines[3].tex, '\dfrac{x}{3} = 4')
  const ok = markFill(m, { '0.0': '5', '1.0': '−4', '2.0': '2.5', '3.0': '12' })
  assert.equal(ok.firstBad, null)
  assert.equal(markFill(m, { '0.0': '5', '1.0': '4', '2.0': '5/2', '3.0': '12' }).firstBad, 1)
})

test('the validator refuses a solve line with no single answer', () => {
  assert.deepEqual(checkFillActivity({ lines: [{ solve: '4(x - 3) = 20' }, { solve: '10 - x = 4' }] }), [])
  assert.match(checkFillActivity({ lines: [{ solve: '2x + 1 = 2x + 3' }] }).join(), /no single answer/)
  assert.match(checkFillActivity({ lines: [{ solve: 'x + 1 < 4' }] }).join(), /needs an = sign/)
})

test('a solve hint names the move, never the answer', () => {
  const hint = (solve) => fillHint(fillModel({ lines: [{ solve }] }).lines[0]).en
  assert.match(hint('5x + 3 = 2x + 18'), /smaller x term/)
  assert.match(hint('4x - 3 = 25'), /\+ or − first/)
  assert.match(hint('6x = 42'), /× or ÷/)
  assert.ok(!/\b7\b/.test(hint('6x = 42')))
})
