// content/y7-math/U01_6/index.js
// A lesson module: default-exports { meta, slides, plan }. The registry
// auto-discovers this file (content/<course>/<unit>/index.js).
import { slides } from './slides.js'
import { plan } from './plan.js'

export default {
  meta: {
    course: 'y7-math',
    unit: '1.6',
    id: 'U01_6',
    title: 'Square Roots & Cube Roots',
    objective: 'Square and cube a number, find square roots and cube roots from a learned list, and know that rooting is squaring or cubing run backwards — one idea, taught twice — plus the word "consecutive", which the exercise uses without ever explaining it.',
    order: 6,
    french: true,
    // The self-study twin on the Dashboard (src/lib/dashboardLink.js).
    dashboard: { track: 'Y7_MATH', unit: 'U01_6' },
  },
  slides,
  plan,
}
