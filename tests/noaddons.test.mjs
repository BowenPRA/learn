// Writing add-ons kept out of the timed writing (unit/app/writing/noAddOns.js).
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { NO_ADDONS, addNames, addOnsOn } from '../unit/app/writing/noAddOns.js'

// A writing box as far as addOnsOn looks at one.
const box = (attrs = {}, spellcheck = false) => ({
  spellcheck,
  hasAttribute: (n) => n in attrs,
  getAttribute: (n) => (n in attrs ? attrs[n] : null),
})
const page = (...tags) => ({ querySelector: (sel) => (sel.split(',').some((s) => tags.includes(s.trim())) ? {} : null) })
const ASKED = { 'data-gramm': 'false', 'data-lt-active': 'false' }

test('every box asks the add-ons and the browser to stay out', () => {
  assert.equal(NO_ADDONS.spellCheck, false)
  assert.equal(NO_ADDONS.autoCorrect, 'off')
  assert.equal(NO_ADDONS.autoCapitalize, 'off')
  for (const k of ['data-gramm', 'data-gramm_editor', 'data-enable-grammarly', 'data-lt-active', 'writingsuggestions']) {
    assert.equal(NO_ADDONS[k], 'false', k)
  }
})

test('a box left alone shows no add-on', () => {
  assert.deepEqual(addOnsOn(box(ASKED), page()), [])
  assert.deepEqual(addOnsOn(null, page()), [])
})

test('Grammarly working in the box is seen', () => {
  assert.deepEqual(addOnsOn(box({ ...ASKED, 'data-gramm_id': 'abc' }), page()), ['Grammarly'])
  assert.deepEqual(addOnsOn(box({ ...ASKED, 'data-gramm': 'true' }), page()), ['Grammarly'])
  assert.deepEqual(addOnsOn(box(ASKED), page('grammarly-extension')), ['Grammarly'])
})

test('Grammarly merely installed is not counted', () => {
  assert.deepEqual(addOnsOn(box(ASKED), page('grammarly-desktop-integration')), [])
})

test('LanguageTool and a switched-on spell check are seen', () => {
  assert.deepEqual(addOnsOn(box({ ...ASKED, 'data-lt-tmp-id': 'lt-1' }), page()), ['LanguageTool'])
  assert.deepEqual(addOnsOn(box(ASKED), page('lt-highlighter')), ['LanguageTool'])
  assert.deepEqual(addOnsOn(box(ASKED, true), page()), ['spell check'])
})

test('names are added once and the list stays the same object when nothing is new', () => {
  const known = ['Grammarly']
  assert.equal(addNames(known, ['Grammarly']), known)
  assert.deepEqual(addNames(known, ['LanguageTool', 'Grammarly']), ['Grammarly', 'LanguageTool'])
  assert.deepEqual(addNames(undefined, ['spell check']), ['spell check'])
})
