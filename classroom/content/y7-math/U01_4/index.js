// content/y7-math/U01_4/index.js
// A lesson module: default-exports { meta, slides, plan }. The registry
// auto-discovers this file (content/<course>/<unit>/index.js).
import { slides } from './slides.js'
import { plan } from './plan.js'

export default {
  meta: {
    course: 'y7-math',
    unit: '1.4',
    id: 'U01_4',
    title: 'Highest Common Factors',
    objective: 'Find the common factors and the highest common factor (HCF) of two numbers by listing, tell a factor apart from a multiple, and know why the book asks for the highest factor but the lowest multiple — one list stops and the other never does.',
    order: 4,
    french: true,
    // The self-study twin on the Dashboard (src/lib/dashboardLink.js).
    dashboard: { track: 'Y7_MATH', unit: 'U01_4' },
  },
  slides,
  plan,
}
