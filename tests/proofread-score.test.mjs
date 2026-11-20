// Find & Fix marks (unit/src/utils/proofread.js): one mistake missed across the whole
// task still earns full marks, once there are enough mistakes to find.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { ONE_MISS_FROM, proofreadScore } from '../unit/src/utils/proofread.js'

test('every mistake fixed is full marks', () => {
  assert.equal(proofreadScore(23, 23), 10)
})

test('one mistake missed is still full marks, at any task size', () => {
  assert.equal(proofreadScore(22, 23), 10)
  assert.equal(proofreadScore(17, 18), 10) // rounding alone would give 9
  assert.equal(proofreadScore(ONE_MISS_FROM - 1, ONE_MISS_FROM), 10)
})

test('two missed is marked as before', () => {
  assert.equal(proofreadScore(21, 23), 9)
  assert.equal(proofreadScore(16, 18), 9)
  assert.equal(proofreadScore(0, 23), 0)
})

test('a tiny task gets no free miss', () => {
  assert.equal(proofreadScore(2, 3), 7)
  assert.equal(proofreadScore(0, 1), 0)
  assert.equal(proofreadScore(0, 0), 0)
})
