// content/y7-math/U01_5/index.js
// A lesson module: default-exports { meta, slides, plan }. The registry
// auto-discovers this file (content/<course>/<unit>/index.js).
import { slides } from './slides.js'
import { plan } from './plan.js'

export default {
  meta: {
    course: 'y7-math',
    unit: '1.5',
    id: 'U01_5',
    title: 'Tests for Divisibility',
    objective: 'Use a quick test to decide whether a number divides exactly by 2, 3, 4, 5, 6, 8, 9, 10 or 11 without doing the division, know that "divisible by", "factor of" and "multiple of" are three sentences for one fact, and know that 7 has no easy test.',
    order: 5,
    french: true,
    // The self-study twin on the Dashboard (src/lib/dashboardLink.js).
    dashboard: { track: 'Y7_MATH', unit: 'U01_5' },
  },
  slides,
  plan,
}
