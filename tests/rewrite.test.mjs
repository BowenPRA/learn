// "Fix it your way" (Upper Secondary English Unit 1): the checker that judges a typed
// rewrite (unit/app/tasks/rewrite.js) and the unit's own items.
//
//   npm test
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { checkRewrite, checkRewriteItems, fixName } from '../unit/app/tasks/rewrite.js'
import { U01_DATA } from '../unit/src/data/UPPER_ENG/U01/data.js'

const item = (id) => U01_DATA.rewrite.find((r) => r.id === id)
const ok = (id, text) => {
  const r = checkRewrite(item(id), text)
  assert.equal(r.ok, true, `${id}: "${text}" should be right, got: ${r.hint}`)
  return r
}
const no = (id, text, hint) => {
  const r = checkRewrite(item(id), text)
  assert.equal(r.ok, false, `${id}: "${text}" should be wrong`)
  if (hint) assert.match(r.hint, hint, `${id}: "${text}"`)
}

test('every item in the unit: its answers pass its own checker, its faulty sentence does not', () => {
  assert.deepEqual(checkRewriteItems(U01_DATA.rewrite), [])
  assert.equal(U01_DATA.rewrite.length, 11)
})

test('a comma splice: each wrong answer is named, each of the four fixes passes', () => {
  no('rw1', 'My phone battery died, I could not call you.', /comma splice/i)
  no('rw1', 'My phone battery died I could not call you.', /run-on/i)
  no('rw1', 'My phone battery died, then I could not call you.', /not one of the seven/i)
  no('rw1', 'My phone battery died, but I could not call you.', /does not fit the meaning/i)
  no('rw1', 'My phone battery died, so I could not call you', /full stop/i)
  no('rw1', 'My phone battery died. i could not call you.', /capital/i)
  no('rw1', 'my phone battery died. I could not call you.', /capital/i)
  no('rw1', 'Because my phone battery died I could not call you.', /comma after/i)
  no('rw1', 'Because my phone battery died. I could not call you.', /fragment/i)
  no('rw1', 'Although my phone battery died, I could not call you.', /does not fit the meaning/i)
  no('rw1', 'Because I could not call you, my phone battery died.', /goes in front of the other idea: "because my phone battery died"/)
  no('rw1', 'My phone battery died because I could not call you.', /goes in front of the other idea/)
  no('rw1', 'My phone died, so I could not call you.', /Keep the words of both ideas/i)
  no('rw1', '', /Type/i)
  ok('rw1', 'My phone battery died. I could not call you.')
  ok('rw1', 'My phone battery died; I could not call you.')
  ok('rw1', 'My phone battery died, so I could not call you.')
  ok('rw1', 'Because my phone battery died, I could not call you.')
  ok('rw1', 'I could not call you because my phone battery died.')
  ok('rw1', 'I could not call you, because my phone battery died.')
})

test('a correct sentence is never marked wrong: a weaker joining word passes with a note', () => {
  const r = ok('rw1', 'My phone battery died, and I could not call you.')
  assert.match(r.note, /"so"/)
  assert.equal(ok('rw1', 'My phone battery died, so I could not call you.').note, '')
  assert.match(ok('rw7', 'I was late for class, and the traffic was terrible.').note, /"because"/)
  ok('rw5', 'The library opens at nine, but it closes at five.')
  ok('rw5', 'The library opens at nine and closes at five.')
  ok('rw9', 'She finished her homework before she watched a film.')
  ok('rw9', 'She finished her homework, and then she watched a film.')
  ok('rw10', 'The meeting will start after everyone arrives.')
  // a contrast is not a weaker "and"
  no('rw3', 'The test was hard, and most students passed.', /does not fit the meaning/i)
})

test('so and for follow the order of the ideas', () => {
  no('rw1', 'I could not call you, so my phone battery died.', /does not fit the meaning/i)
  ok('rw1', 'I could not call you, for my phone battery died.')
  ok('rw7', 'The traffic was terrible, so I was late for class.')
  no('rw7', 'I was late for class, so the traffic was terrible.', /does not fit the meaning/i)
})

test('however, therefore and then: right after a semicolon or a full stop, a splice after a comma', () => {
  ok('rw3', 'The test was hard; however, most students passed.')
  ok('rw3', 'The test was hard. However, most students passed.')
  ok('rw1', 'My phone battery died; therefore, I could not call you.')
  ok('rw9', 'She finished her homework. Then she watched a film.')
  no('rw3', 'The test was hard, however most students passed.', /semicolon before it \("; however,"\)/)
  no('rw3', 'The test was hard. However most students passed.', /comma after "However"/)
  no('rw3', 'The test was hard; However, most students passed.', /no capital/)
  no('rw3', 'The test was hard; therefore, most students passed.', /does not fit the meaning/i)
  no('rw9', 'She finished her homework, then she watched a film.', /not one of the seven/i)
})

test('near misses are named', () => {
  no('rw3', 'The test was hard but most students passed.', /comma before "but"/)
  no('rw1', 'My phone battery died. So I could not call you.', /Do not start a new sentence with "So"/)
  no('rw3', 'The test was hard, but Most students passed.', /"Most" does not need a capital/)
  no('rw6', 'Although he lives by the sea my brother cannot swim.', /needs a comma after it/)
})

test('what a right answer used is named', () => {
  assert.equal(fixName(checkRewrite(item('rw1'), 'My phone battery died. I could not call you.')), 'a full stop')
  assert.equal(fixName(checkRewrite(item('rw1'), 'My phone battery died, so I could not call you.')), 'a comma and "so"')
  assert.equal(fixName(checkRewrite(item('rw3'), 'Although the test was hard, most students passed.')), '"although"')
  assert.equal(fixName(checkRewrite(item('rw5'), 'The library opens at nine; it closes at five.')), 'a semicolon')
  assert.equal(fixName(checkRewrite(item('rw3'), 'The test was hard; however, most students passed.')), 'a semicolon and "however"')
  assert.equal(fixName(checkRewrite(item('rw5'), 'The library opens at nine and closes at five.')), '')
  assert.equal(fixName({ ok: false }), '')
})

test('a fragment has to be joined, with its word kept', () => {
  no('rw2', 'We stayed inside. The storm was getting worse.', /drops "because"/)
  no('rw2', 'We stayed inside; the storm was getting worse.', /drops "because"/)
  no('rw2', 'We stayed inside. Because the storm was getting worse.', /fragment/i)
  no('rw10', 'The meeting will start. When everyone arrives.', /fragment/i)
  ok('rw2', 'We stayed inside because the storm was getting worse.')
  ok('rw2', 'Because the storm was getting worse, we stayed inside.')
  ok('rw10', 'As soon as everyone arrives, the meeting will start.')
  ok('rw10', 'The meeting will start once everyone arrives.')
  no('rw6', 'My brother cannot swim because he lives by the sea.', /does not fit the meaning/i)
})

test('the joining word has to fit the meaning', () => {
  ok('rw3', 'The test was hard, but most students passed.')
  ok('rw3', 'The test was hard, yet most students passed.')
  no('rw3', 'The test was hard, so most students passed.', /does not fit the meaning/i)
  ok('rw7', 'I was late for class, for the traffic was terrible.')
  ok('rw9', 'She watched a film after she finished her homework.')
  no('rw5', 'The library opens at nine, so it closes at five.', /does not fit the meaning/i)
})

test('a missing verb: the right sentences pass, the original and near misses do not', () => {
  ok('rw4', 'My cousin works at the airport.')
  ok('rw4', 'My cousin is working at the airport.')
  ok('rw4', 'My cousin has worked at the airport.')
  no('rw4', 'My cousin working at the airport.', /still the original/i)
  no('rw4', 'My cousin is working at the airport', /punctuation/i)
  no('rw4', 'My cousin work at the airport.', /in front of "working"/)
  ok('rw8', 'The students are waiting outside the library.')
  ok('rw11', 'There is a small shop on the corner of our street.')
  ok('rw11', 'A small shop is on the corner of our street.')
  no('rw11', 'A small shop on the corner of our street.', /still the original/i)
  no('rw11', 'A small shop in the corner of our street.', /There is/)
})
