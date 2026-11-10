// content/y7-math/U01_2/index.js
// A lesson module: default-exports { meta, slides, plan }. The registry
// auto-discovers this file (content/<course>/<unit>/index.js).
import { slides } from './slides.js'
import { plan } from './plan.js'

export default {
  meta: {
    course: 'y7-math',
    unit: '1.2',
    id: 'U01_2',
    title: 'Multiplying & Dividing Integers',
    objective: 'Multiply and divide integers using the four sign rules, and know why "two negatives make a positive" is true for × and ÷ but not for +.',
    order: 2,
    french: true,
    // The self-study twin on the Dashboard (src/lib/dashboardLink.js).
    dashboard: { track: 'Y7_MATH', unit: 'U01_2' },
  },
  slides,
  plan,
}
