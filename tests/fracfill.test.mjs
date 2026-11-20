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
