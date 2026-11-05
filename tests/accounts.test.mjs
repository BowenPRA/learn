// The learn-accounts Edge Function's network-free parts (supabase/functions/learn-accounts/lib.js).
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { WORDS, makeUsername, makePin, easyPin, parseRequest, toMake, loginEmail, passwordFor, corsFor, MAX_MAKE } from '../supabase/functions/learn-accounts/lib.js'

const USERNAME_RE = /^[a-z]{3,10}[2-9]{2}$/ // the database allows [0-9]; the function uses 2-9 only

test('usernames: a word and two digits, unique, in the database\'s shape', () => {
  const taken = new Set()
  for (let i = 0; i < 2000; i += 1) {
    const u = makeUsername(taken)
    assert.match(u, USERNAME_RE)
    assert.ok(!taken.has(u))
    taken.add(u)
  }
  for (const w of WORDS) assert.match(w, /^[a-z]{3,8}$/, w)
  assert.equal(new Set(WORDS).size, WORDS.length, 'no word twice')
})

test('usernames: gives up rather than loop forever when every name is taken', () => {
  const always = () => 0
  const taken = new Set([makeUsername(new Set(), always)])
  assert.throws(() => makeUsername(taken, always), /free username/)
})

test('PINs: four digits, never easy', () => {
  for (let i = 0; i < 5000; i += 1) {
    const p = makePin()
    assert.match(p, /^\d{4}$/)
    assert.ok(!easyPin(p), p)
  }
  for (const p of ['0000', '7777', '1234', '4321', '7890', '0987', '1212', '9090']) assert.ok(easyPin(p), p)
  for (const p of ['4821', '1203', '5592']) assert.ok(!easyPin(p), p)
  assert.match(makePin(6), /^\d{6}$/)
})

test('the login email and password', () => {
  assert.equal(loginEmail('otter27'), 'otter27@learn.pra.edu.vn')
  assert.ok(passwordFor('4821').length >= 6, 'Supabase wants 6 characters or more')
})

test('requests are checked before anything happens', () => {
  assert.deepEqual(parseRequest({ action: 'make', class_key: 'math:Year 5' }), { action: 'make', classKey: 'math:Year 5', studentIds: null })
  const id = '0b7c2f7e-1d1a-4c1e-9a55-2a8f3c9d0e11'
  assert.deepEqual(parseRequest({ action: 'reset', student_id: id }), { action: 'reset', studentId: id })
  assert.throws(() => parseRequest({ action: 'make', class_key: "math:Year 5'; drop table x" }), /class_key/)
  assert.throws(() => parseRequest({ action: 'make', class_key: 'math:Year 5', student_ids: ['nope'] }), /student_ids/)
  assert.throws(() => parseRequest({ action: 'make', class_key: 'math:Year 5', student_ids: Array(MAX_MAKE + 1).fill(id) }), /At most/)
  assert.throws(() => parseRequest({ action: 'reset' }), /student_id/)
  assert.throws(() => parseRequest({ action: 'delete', student_id: id }), /Unknown action/)
  assert.throws(() => parseRequest(null), /Unknown action/)
})

test('make: only students without a login, and only the ones listed', () => {
  const s = [
    { student_id: 'a', name: 'A', username: null },
    { student_id: 'b', name: 'B', username: 'owl22' },
    { student_id: 'c', name: 'C', username: null },
  ]
  assert.deepEqual(toMake(s).map((x) => x.student_id), ['a', 'c'])
  assert.deepEqual(toMake(s, ['c', 'b']).map((x) => x.student_id), ['c'])
})

test('CORS: PRA\'s sites and the dev server only', () => {
  assert.equal(corsFor('https://learn.pra.edu.vn')['Access-Control-Allow-Origin'], 'https://learn.pra.edu.vn')
  assert.equal(corsFor('http://localhost:5201')['Access-Control-Allow-Origin'], 'http://localhost:5201')
  assert.equal(corsFor('https://evil.example')['Access-Control-Allow-Origin'], 'https://learn.pra.edu.vn')
})
