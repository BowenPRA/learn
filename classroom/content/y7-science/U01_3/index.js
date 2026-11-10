// content/y7-science/U01_3/index.js
// A lesson module: default-exports { meta, slides, plan }. The registry
// auto-discovers this file (content/<course>/<unit>/index.js).
import { slides } from './slides.js'
import { plan } from './plan.js'

export default {
  meta: {
    course: 'y7-science',
    unit: '1.3',
    id: 'U01_3',
    title: 'Specialised Cells: Built for the Job',
    objective: 'Name three specialised animal cells and two specialised plant cells, and explain how the structure of each is adapted to carry out its function — the idea that a cell\'s shape fits its job.',
    order: 3,
    french: true,
    // The self-study twin on the Dashboard (src/lib/dashboardLink.js).
    dashboard: { track: 'Y7_SCI', unit: 'U01_3' },
  },
  slides,
  plan,
}
