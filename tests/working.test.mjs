// unit/src/utils/working.js — the notebook working on a lesson slide (Upper Secondary
// Maths 1, 22 November 2026): each move under the term it undoes, x terms and numbers
// apart, the words for each move, and the check. Every line is worked out, so the tests
// pin down what a student reads.
//
//   npm test
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { parseMove, moveText, moveWords, workingModel, groupModel, checkWorking, checkLine } from '../unit/src/utils/working.js'
import { parseEquation, fr } from '../unit/src/utils/linearEquation.js'

const table = (m) => m.rows.map((r) => [r.cells.left.x, r.cells.left.c, r.cells.right.x, r.cells.right.c, r.moveText || ''].join('|'))

test('a move reads as Bowen writes it: +9, -9, -2x, /3, ÷ −1', () => {
  assert.deepEqual(parseMove('-9'), { kind: 'sub', amount: fr(9), onX: false })
  assert.deepEqual(parseMove('- 2x'), { kind: 'sub', amount: fr(2), onX: true })
  assert.equal(moveText(parseMove('/3')), '÷ 3')
  assert.equal(moveText(parseMove('/-1')), '÷ (−1)')
  assert.equal(moveWords(parseMove('-9')), 'take 9 from both sides')
  assert.equal(moveWords(parseMove('/3')), 'divide both sides by 3')
  assert.throws(() => parseMove('*2x'))
  assert.throws(() => parseMove('nine'))
})

test('the −9 goes under the +9 and under the 14', () => {
  const m = workingModel({ eq: 'x + 9 = 14', moves: ['-9'] })
  // the constant cells carry the move; the x cells stay empty
  assert.deepEqual(table(m), ['x|+ 9||14|− 9', 'x|||5|'])
  assert.equal(m.rows[0].move.onX, false)
  assert.equal(m.check, '5 + 9 = 14')
  assert.equal(m.answer, 'x = 5')
})

test('x on both sides: x terms go left, numbers go right', () => {
  const m = workingModel({ eq: '5x + 3 = 2x + 18', moves: ['-2x', '-3', '/3'], say: ['x terms to the left'] })
  assert.deepEqual(table(m), ['5x|+ 3|2x|+ 18|− 2x', '3x|+ 3||18|− 3', '3x|||15|÷ 3', 'x|||5|'])
  assert.equal(m.rows[0].say, 'x terms to the left')
  assert.equal(m.rows[1].say, 'take 3 from both sides')
  assert.equal(m.check, '5(5) + 3 = 28 and 2(5) + 18 = 28')
})

test('the line as written comes first, and the check uses it', () => {
  const m = workingModel({ eq: '3x + 12 = 27', written: '3(x + 4) = 27', writtenSay: 'multiply out the bracket', moves: ['-12', '/3'] })
  assert.deepEqual(m.written, { left: '3(x + 4)', right: '27' })
  assert.equal(m.writtenSay, 'multiply out the bracket')
  assert.equal(m.check, '3(5 + 4) = 27')
  const neg = workingModel({ eq: '-x + 4 = 9', written: '4 - x = 9', moves: ['-4', '/-1'] })
  assert.equal(neg.answer, 'x = −5')
  assert.equal(neg.check, '4 − (−5) = 9')
})

test('grouping: x terms with x terms, numbers with numbers', () => {
  const g = groupModel('5x + 7 + 2x - 3')
  assert.deepEqual(g.terms.map((t) => [t.text, t.kind]), [['5x', 'x'], ['+ 7', 'n'], ['+ 2x', 'x'], ['− 3', 'n']])
  assert.equal(g.xSum, '5x + 2x = 7x')
  assert.equal(g.nSum, '7 − 3 = 4')
  assert.equal(g.tidy, '7x + 4')
  assert.equal(groupModel('4x - 5 + 9 - x').tidy, '3x + 4')
  assert.throws(() => groupModel('3(x + 4)'))
})

test('the checker refuses moves that do not finish and a written line that differs', () => {
  assert.deepEqual(checkWorking({ eq: '3x + 7 = 22', moves: ['-7', '/3'] }), [])
  assert.match(checkWorking({ eq: '3x + 7 = 22', moves: ['-7'] }).join(), /do not end with x on its own/)
  assert.match(checkWorking({ eq: '3x + 12 = 27', written: '3(x + 5) = 27', moves: ['-12', '/3'] }).join(), /not the same equation/)
  assert.match(checkWorking({ eq: '3x = 6', moves: ['/0x'] }).join(), /work:/)
})

test('a check line puts a negative or a fraction in brackets', () => {
  assert.equal(checkLine('2x + 11 = 5', parseEquation('2x + 11 = 5'), fr(-3)), '2(−3) + 11 = 5')
  assert.equal(checkLine('x - 4 = 10', parseEquation('x - 4 = 10'), fr(14)), '14 − 4 = 10')
})
