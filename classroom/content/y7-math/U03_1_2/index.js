// A lesson module: default-exports { meta, slides, plan }. The registry
// auto-discovers this file (content/<course>/<unit>/index.js).
//
// One deck, two workbook sections, two periods. Slide 17 is the hinge.
import { slides } from './slides.js'
import { plan } from './plan.js'

export default {
  meta: {
    course: 'y7-math',
    unit: '3.1–3.2',
    id: 'U03_1_2',
    title: 'Place Value and Rounding',
    subtitle: 'Powers of 10, and how exact an answer has to be',
    objective:
      'Say what a power is and read 10³ aloud; know the power counts the zeros; multiply and divide by ' +
      'powers of 10 by moving the digits rather than adding zeros; convert mg, g, kg and t; count decimal ' +
      'places from the point; round using the next digit; keep the trailing zero, so 34.9892 to 1 d.p. is ' +
      '35.0; and work one place further before rounding, so 58 ÷ 7 to 3 d.p. is 8.286.',
    order: 13,
    french: true,
    // The self-study twin on the Dashboard (src/lib/dashboardLink.js). This one
    // deck is two Dashboard units, split at the hinge slide: U03_1 (powers of
    // 10) and U03_2 (rounding, plus short division). The link opens the first;
    // the second is the next card down.
    dashboard: { track: 'Y7_MATH', unit: 'U03_1' },
  },
  slides,
  plan,
}
