// content/y7-science/U01_4/index.js
// A lesson module: default-exports { meta, slides, plan }. The registry
// auto-discovers this file (content/<course>/<unit>/index.js).
import { slides } from './slides.js'
import { plan } from './plan.js'

export default {
  meta: {
    course: 'y7-science',
    unit: '1.4',
    id: 'U01_4',
    title: 'Cells, Tissues and Organs',
    objective: 'Explain the words tissue, organ, organ system and organism, and put a real example on every rung of the ladder from a single cell up to a whole living thing.',
    order: 4,
    french: true,
    // The self-study twin on the Dashboard (src/lib/dashboardLink.js).
    dashboard: { track: 'Y7_SCI', unit: 'U01_4' },
  },
  slides,
  plan,
}
