// tests/game-words.test.mjs
// Guess the Teacher's team-name filter (classroom/content/games/G06_guess-the-teacher/words.js):
// rude names are caught through the usual disguises, and innocent names that
// look close are left alone.
import test from 'node:test'
import assert from 'node:assert/strict'
import { isRude } from '../classroom/content/games/G06_guess-the-teacher/words.js'
import { fresh, reduce } from '../classroom/content/games/G06_guess-the-teacher/rules.js'

const RUDE = [
  'fuck', 'FUCK', 'Fuuuuck', 'f u c k', 'f.u.c.k', 'fuckface', 'Mother Fuckers', 'sh1t', '$hit', 'bullshit', 'Bitch Please',
  'b1tch', '@ss', 'Kiss my ass', 'asss', 'dick', 'Big Dick', 'cock', 'pussy', 'porn star', 'sexy team', 'cum', 'tits',
  'nazi', 'wtf', 'dumbass', 'son of a bitch',
  'Địt mẹ', 'ĐỊT', 'địtmẹ', 'lồn', 'Mặt lồn', 'cặc', 'đéo', 'đụ má', 'Đù má', 'con đĩ', 'chó đẻ', 'Óc chó', 'cứt', 'mẹ mày',
  'dit me', 'du ma', 'dm', 'DCM', 'vcl', 'vl', 'clm', 'loz', 'djt',
]

const FINE = [
  'Minh & Mẹ', 'An & Bố', 'Bảo Ngọc', 'Team Rocket', 'Peacock', 'Hancock', 'Class 3B', 'Bass', 'Assassins', 'Titan', 'Grape',
  'Cucumber', 'Hello Kitty', 'Kung Fu Panda', 'Push it', 'Analytical', 'Dickens', 'Cocktail', 'The Nguyens', 'Team 1', '4 Fun',
  'Minh lớn', 'Đĩa bay', 'Các bạn', 'Buổi sáng', 'Đeo kính', 'Đi chơi', 'Cắt tóc', 'Phúc & Bố', 'Dũng', 'Đức', 'Thắm',
  'C & L', 'D M', 'V & L', 'Vy và Linh', 'Mèo con', 'Con chó nhỏ', 'Lon bia', 'Dương', 'Cường', 'Hiếu', '', '   ',
]

test('rude team names are caught, however they are typed', () => {
  const missed = RUDE.filter((n) => !isRude(n))
  assert.deepEqual(missed, [])
})

test('innocent team names that look close are fine', () => {
  const caught = FINE.filter((n) => isRude(n))
  assert.deepEqual(caught, [])
})

test('the TV never lets a rude name join, even from a phone that skipped the check', () => {
  const g = fresh()
  assert.equal(reduce(g, { type: 'hello', pid: 'a', name: 'Sh1t Team', avatar: '🦊', now: 1 }), g)
  const ok = reduce(g, { type: 'hello', pid: 'b', name: 'Minh & Mẹ', avatar: '🦊', now: 1 })
  assert.equal(ok.players.length, 1)
  // Nor rename a team that joined with a fine name.
  assert.equal(reduce(ok, { type: 'hello', pid: 'b', name: 'đụ má', avatar: '🦊', now: 2 }), ok)
})
