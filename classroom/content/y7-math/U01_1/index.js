// content/y7-math/U01_1/index.js
// A lesson module: default-exports { meta, slides, plan }. The registry
// auto-discovers this file (content/<course>/<unit>/index.js).
import { slides } from './slides.js'
import { plan } from './plan.js'

export default {
  meta: {
    course: 'y7-math',
    unit: '1.1',
    id: 'U01_1',
    title: 'Adding & Subtracting Integers',
    objective: 'Add and subtract integers on a number line, and turn an English sentence into a calculation.',
    order: 1,
    french: true,
    // The self-study twin on the Dashboard (src/lib/dashboardLink.js).
    dashboard: { track: 'Y7_MATH', unit: 'U01_1' },
  },
  slides,
  plan,
}
