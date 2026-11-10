// A lesson module: default-exports { meta, slides, plan }. The registry
// auto-discovers this file (content/<course>/<unit>/index.js).
import { slides } from './slides.js'
import { plan } from './plan.js'

export default {
  meta: {
    course: 'y7-math',
    unit: '2.4',
    id: 'U02_4',
    title: 'Expanding Brackets',
    objective:
      'Say what brackets are and what expand and multiply out mean; know that 4(10 + 6) means 4 × (10 + 6); ' +
      'use the grid to multiply every term inside the brackets by the number outside, so 5(a + 3) = 5a + 15; ' +
      'take the sign in with its term, so 3(x − 2) = 3x − 6; multiply the numbers and keep the letter, so 5 × 2p = 10p; ' +
      'stop at 12 − 4c because 12 and 4c are not like terms; and expand and simplify in that order, ' +
      'so 3(x + 2) + 4x = 7x + 6.',
    order: 10,
    french: true,
    // The self-study twin on the Dashboard (src/lib/dashboardLink.js).
    dashboard: { track: 'Y7_MATH', unit: 'U02_4' },
  },
  slides,
  plan,
}
