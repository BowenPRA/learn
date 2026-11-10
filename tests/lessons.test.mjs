// The classroom lessons: src/data/classroomLessons.js and the folders under
// classroom/content/y7-* agree (scripts/check-lessons.mjs), and the check catches
// a missing folder, a missing entry and a title that has drifted from the deck.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { checkLessons, loadList, readMeta } from '../scripts/check-lessons.mjs'

test('every classroom lesson has its folder, and the list says what the deck says', async () => {
  assert.deepEqual(await checkLessons(), [])
})

test('the check catches a missing folder, a missing entry, drift and a doubled entry', async () => {
  const list = await loadList()
  const tides = list.find((l) => l.slug === 'U03_4')
  const changed = [
    ...list.filter((l) => l.slug !== 'U05_3' && l !== tides),
    { ...tides, title: 'Tides!', subtitle: '', unit: '3.4b' },
    { ...tides, course: 'y7-science', slug: 'U99_9' },
    list[0],
  ]
  const problems = (await checkLessons({ lessons: changed })).join('\n')
  assert.match(problems, /y7-math\/U05_3 has a folder .* but no entry/)
  assert.match(problems, /y7-science\/U99_9 is in .* but there is no classroom\/content\/y7-science\/U99_9\/index\.js/)
  assert.match(problems, /y7-science\/U03_4 title: the deck says 'Tides', .* says 'Tides!'/)
  assert.match(problems, /y7-science\/U03_4 subtitle: the deck says 'The Moon pulls/)
  assert.match(problems, /y7-science\/U03_4 unit: the deck says '3\.4', .* says '3\.4b'/)
  assert.match(problems, /y7-math\/U01_1 is listed twice/)
  const noCourse = (await checkLessons({ courses: [{ id: 'y7-math' }] })).join('\n')
  assert.match(noCourse, /course y7-science is not in classroom\/content\/courses\.js/)
})

test('meta is read from the file text, braces in strings and comments included', () => {
  const src = `import { slides } from './slides.js'
export default {
  meta: {
    course: 'y7-math', // not { a brace }
    unit: "1.1",
    /* } */ title: 'Curly } and \\'quotes\\'',
    subtitle: 'Two ' +
      'lines',
    dashboard: { track: 'Y7_MATH', unit: 'U01_1' },
    objective: SOMETHING_IMPORTED,
  },
  slides,
}`
  const meta = readMeta(src)
  assert.equal(meta.course, 'y7-math')
  assert.equal(meta.unit, '1.1')
  assert.equal(meta.title, "Curly } and 'quotes'")
  assert.equal(meta.subtitle, 'Two lines')
  assert.equal(meta.dashboard.unit, 'U01_1')
  assert.equal(meta.objective, undefined)
})
