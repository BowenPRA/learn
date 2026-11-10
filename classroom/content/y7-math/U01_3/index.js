// content/y7-math/U01_3/index.js
// A lesson module: default-exports { meta, slides, plan }. The registry
// auto-discovers this file (content/<course>/<unit>/index.js).
import { slides } from './slides.js'
import { plan } from './plan.js'

export default {
  meta: {
    course: 'y7-math',
    unit: '1.3',
    id: 'U01_3',
    title: 'Lowest Common Multiples',
    objective: 'Find the common multiples and the lowest common multiple (LCM) of two numbers by listing, and know that "common" in maths means shared, not ordinary — and that the LCM is usually smaller than the two numbers multiplied together.',
    order: 3,
    french: true,
    // The self-study twin on the Dashboard (src/lib/dashboardLink.js).
    dashboard: { track: 'Y7_MATH', unit: 'U01_3' },
  },
  slides,
  plan,
}
