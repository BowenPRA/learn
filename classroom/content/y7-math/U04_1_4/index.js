// A lesson module: default-exports { meta, slides, plan }. The registry
// auto-discovers this file (content/<course>/<unit>/index.js).
//
// One deck, four workbook sections, one period: a speed run of Unit 4, the
// first of two or three decimal days. English and French only — from Unit 4
// the Year 7 lessons drop Vietnamese, so the deck's switch reads EN / FR.
import { slides } from './slides.js'
import { plan } from './plan.js'

export default {
  meta: {
    course: 'y7-math',
    unit: '4.1–4.4',
    id: 'U04_1_4',
    title: 'Decimals',
    subtitle: 'Compare, add, subtract, multiply and divide — and where the point goes',
    objective:
      'Read a decimal aloud digit by digit; compare decimals by filling with zeros; add and subtract by ' +
      'lining up the points; tell a mental method from a written method; multiply a decimal by a whole ' +
      'number by taking the point out and putting it back, checking with an estimate; divide a decimal ' +
      'by a whole number with the point straight up and a 0 where a digit does not divide, checking with ' +
      'the inverse; and turn "change" and "share equally" into the right operation.',
    order: 14,
    french: true,
    vietnamese: false,
    // The self-study twin on the Dashboard (src/lib/dashboardLink.js). This one
    // deck is four Dashboard units, U04_1 to U04_4 (one per section); the link
    // names the first, and the rest are the next cards down.
    dashboard: { track: 'Y7_MATH', unit: 'U04_1' },
  },
  slides,
  plan,
}
