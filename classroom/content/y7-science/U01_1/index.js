// content/y7-science/U01_1/index.js
// A lesson module: default-exports { meta, slides, plan }. The registry
// auto-discovers this file (content/<course>/<unit>/index.js).
import { slides } from './slides.js'
import { plan } from './plan.js'

export default {
  meta: {
    course: 'y7-science',
    unit: '1.1',
    id: 'U01_1',
    title: 'Cells: The Building Blocks of Life',
    objective: 'Define a cell and its organelles, compare animal and plant cells, and explain how microscopes let us see them.',
    order: 1,
    french: true,
    // The self-study twin on the Dashboard (src/lib/dashboardLink.js).
    dashboard: { track: 'Y7_SCI', unit: 'U01_1' },
  },
  slides,
  plan,
}
