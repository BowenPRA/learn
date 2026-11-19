// tests/game-points.test.mjs
// Guess the Teacher's points (classroom/content/games/G06_guess-the-teacher/protocol.js):
// 1000 with the whole round to go, falling evenly to 300 with one second left,
// 300 through the last second, doubled in the last round.
import test from 'node:test'
import assert from 'node:assert/strict'
import { markAt, pointsFor, pointsShare, tierOf } from '../classroom/content/games/G06_guess-the-teacher/protocol.js'

test('1000 at the start, 300 with one second left, whatever the round length', () => {
  for (const round of [15000, 35000, 60000, 120000]) {
    assert.equal(pointsFor(round, false, round), 1000)
    assert.equal(pointsFor(1000, false, round), 300)
    assert.equal(pointsFor(round + 10000, false, round), 1000, '+10 s never pays more than 1000')
  }
})

test('the last second and the buzzer still pay 300', () => {
  assert.equal(pointsFor(999, false, 35000), 300)
  assert.equal(pointsFor(400, false, 35000), 300)
  assert.equal(pointsFor(0, false, 35000), 300)
})

test('points fall evenly between, in tens', () => {
  // 35 s round: 700 points over 34 s; halfway (18 s left) is 650.
  assert.equal(pointsFor(18000, false, 35000), 650)
  assert.equal(pointsFor(2000, false, 35000), Math.round((300 + 700 / 34) / 10) * 10)
  for (let left = 0; left <= 35000; left += 250) assert.equal(pointsFor(left, false, 35000) % 10, 0)
  let last = Infinity
  for (let left = 35000; left >= 0; left -= 100) {
    const p = pointsFor(left, false, 35000)
    assert.ok(p <= last, 'never goes up as time runs out')
    last = p
  }
})

test('the last round doubles: 2000 down to 600', () => {
  assert.equal(pointsFor(35000, true, 35000), 2000)
  assert.equal(pointsFor(1000, true, 35000), 600)
  assert.equal(pointsFor(18000, true, 35000), 1300)
})

test('the meter and the colours use the same scale', () => {
  assert.equal(pointsShare(35000, 35000), 1)
  assert.equal(pointsShare(1000, 35000), 0)
  assert.equal(markAt(1000), 1)
  assert.equal(markAt(300), 0)
  assert.equal(tierOf(1000), 'hi')
  assert.equal(tierOf(770), 'hi')
  assert.equal(tierOf(760), 'mid')
  assert.equal(tierOf(540), 'mid')
  assert.equal(tierOf(530), 'lo')
  assert.equal(tierOf(300), 'lo')
  assert.equal(tierOf(1540, true), 'hi')
  assert.equal(tierOf(600, true), 'lo')
})
