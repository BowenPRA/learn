// The pack format: the demo packs pass the validator, broken packs do not, and the
// JS scoring matches the database's rules (learn_part_ids / learn_save).
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { validatePack } from '../src/pack/validate.js'
import { partIds, partSummary, scoreOf, starsFor } from '../src/pack/model.js'
import { PACK_Y5_NEGATIVES, PACK_Y5_ORDERING, PACK_Y5_WORDS } from '../src/lib/demo/packY5Negatives.js'

test('the demo packs are valid and plain JSON', () => {
  for (const p of [PACK_Y5_NEGATIVES, PACK_Y5_ORDERING, PACK_Y5_WORDS]) {
    const { errors } = validatePack(p)
    assert.deepEqual(errors, [], p.slug)
    assert.deepEqual(JSON.parse(JSON.stringify(p)), p, `${p.slug} survives JSON`)
  }
})

test('the main demo pack: 6 checks in the review, the 12-item step-practice set', () => {
  assert.deepEqual(partSummary(PACK_Y5_NEGATIVES), [{ id: 'review', kind: 'review', total: 6 }, { id: 'practice', kind: 'practice', total: 12 }])
  const levels = PACK_Y5_NEGATIVES.parts[1].set.items.map((i) => i.level)
  for (const lv of ['focus', 'practice', 'challenge']) assert.ok(levels.includes(lv), lv)
})

test('broken packs are refused', () => {
  const base = JSON.parse(JSON.stringify(PACK_Y5_ORDERING))
  const bad = (mut, re) => {
    const p = JSON.parse(JSON.stringify(base))
    mut(p)
    const { errors } = validatePack(p)
    assert.ok(errors.some((e) => re.test(e)), `${re} in ${JSON.stringify(errors)}`)
  }
  bad((p) => { p.format = 'x' }, /format/)
  bad((p) => { p.slug = 'Bad Slug' }, /slug/)
  bad((p) => { p.class_key = 'Year 5' }, /class_key/)
  bad((p) => { p.parts[0].slides[0].layout = 'game' }, /layout/)
  bad((p) => { p.parts[0].slides[0].widget = 'Lift' }, /widget/)
  bad((p) => { p.parts[0].slides[0].check.correct = 'Z' }, /correct answer/)
  bad((p) => { p.parts[0].slides[1].check.id = 'o1' }, /repeated/)
  bad((p) => { p.parts[0].slides[0].image = 'https://example.com/x.png' }, /asset:/)
  bad((p) => { p.parts[0].slides[0].image = 'asset:x.png' }, /not listed/)
  bad((p) => { p.parts[0].slides[1].inlineSvg = '<div>' }, /must start with <svg/)
  bad((p) => { p.parts.push({ id: 'practice', kind: 'practice', set: { items: [{ id: 'a', level: 'focus', prompt: 'x', steps: [] }] } }) }, /1–8 steps/)
  bad((p) => { p.parts[0].kind = 'quiz' }, /kind/)
})

test('scores match the database: right first time over the part\'s ids', () => {
  assert.deepEqual(partIds(PACK_Y5_ORDERING, 'review'), ['o1', 'o2', 'o3'])
  assert.equal(scoreOf(PACK_Y5_ORDERING, 'review', { o1: { ok: true }, o2: { ok: false }, o3: { ok: 'yes' }, zz: { ok: true } }), 0.3333)
  assert.equal(starsFor(0.95), 3)
  assert.equal(starsFor(0.6), 2)
  assert.equal(starsFor(0.2), 1)
  assert.equal(starsFor(0.9, false), 0)
})
