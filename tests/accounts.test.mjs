// The learn-accounts Edge Function's network-free parts (supabase/functions/learn-accounts/lib.js).
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { USERNAME_RE, foldName, usernameFor, codeFor, parseRequest, toMake, loginEmail, passwordFor, corsFor, MAX_MAKE } from '../supabase/functions/learn-accounts/lib.js'

// Logins as on the old Dashboard (Bowen, 6 November 2026): nickname + student number.
test('login names: the nickname folded to plain lower-case letters and digits', () => {
  assert.equal(foldName('Nấm'), 'nam')
  assert.equal(foldName('Maïron'), 'mairon')
  assert.equal(foldName('Đức'), 'duc')
  assert.equal(foldName('Anh Thư'), 'anhthu')
  assert.equal(foldName('  GB '), 'gb')
  assert.equal(foldName('Mary-Jane O\'Neil'), 'maryjaneoneil')
  assert.equal(foldName(null), '')
  // The sign-in page folds what the child types the same way, so these all reach one login.
  for (const typed of ['Nam', 'nam', 'Nấm', ' NAM ', 'Nấm']) assert.equal(foldName(typed), 'nam')
})

test('login names: nickname first, then first name, then full name; the database\'s shape', () => {
  assert.equal(usernameFor({ nickname: 'Goku', first_name: 'Minh', full_name: 'Tran Minh' }), 'goku')
  assert.equal(usernameFor({ nickname: '  ', first_name: 'Khôi', full_name: 'Le Khoi' }), 'khoi')
  assert.equal(usernameFor({ nickname: null, first_name: null, full_name: 'Learner A' }), 'learnera')
  assert.equal(usernameFor(null), '')
  for (const ok of ['su', 'goku', 'penelope', 'learner12']) assert.match(ok, USERNAME_RE)
  for (const bad of ['', 'a', 'x'.repeat(21), 'Goku', 'an na']) assert.doesNotMatch(bad, USERNAME_RE)
})

test('secret codes: the student number padded to 3 digits', () => {
  assert.equal(codeFor('S0006'), '006')
  assert.equal(codeFor('S0024'), '024')
  assert.equal(codeFor('S0140'), '140')
  assert.equal(codeFor('s0024'), '024')
  assert.equal(codeFor('BLE0055'), '055')
  assert.equal(codeFor('S1203'), '1203')
  assert.equal(codeFor(''), null)
  assert.equal(codeFor(null), null)
  assert.equal(codeFor('PAL'), null)
})

test('the login email and password', () => {
  assert.equal(loginEmail('goku'), 'goku@learn.pra.edu.vn')
  assert.equal(passwordFor('024'), '024-learn')
  assert.ok(passwordFor('006').length >= 6, 'Supabase wants 6 characters or more')
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
