// content/y7-science/U01_2/index.js
// A lesson module: default-exports { meta, slides, plan }. The registry
// auto-discovers this file (content/<course>/<unit>/index.js).
import { slides } from './slides.js'
import { plan } from './plan.js'

export default {
  meta: {
    course: 'y7-science',
    unit: '1.2',
    id: 'U01_2',
    title: 'Animal Cells: What You Are Made Of',
    objective: 'Name the parts of an animal cell, describe how animal cells differ from plant cells, and follow the method for looking at your own cells under a microscope.',
    order: 2,
    french: true,
    // The self-study twin on the Dashboard (src/lib/dashboardLink.js).
    dashboard: { track: 'Y7_SCI', unit: 'U01_2' },
  },
  slides,
  plan,
}
