// content/y7-science/U02_4/index.js
// A lesson module: default-exports { meta, slides, plan }. The registry
// auto-discovers this file (content/<course>/<unit>/index.js).
//
// Section 2.4 was left out when Unit 2 was taught in order — 2.5, 2.6 and 2.7
// each reserved order 10 for it — and is taught here after 2.7. Nothing in
// 2.5–2.7 is needed for it; what it leans on is 2.2 (the five changes of state)
// and 2.3 (explaining them with particles).
import { slides } from './slides.js'
import { plan } from './plan.js'

export default {
  meta: {
    course: 'y7-science',
    unit: '2.4',
    id: 'U02_4',
    title: 'The Water Cycle',
    objective:
      'Describe the water cycle with the eight key words — atmosphere, water vapour, ' +
      'transpiration, precipitation, open water, surface run-off, groundwater and the ' +
      'cycle itself — explain each stage with particle theory, and know that water ' +
      'vapour is an invisible gas.',
    // The slot 2.5, 2.6 and 2.7 kept free for it.
    order: 10,
    french: true,
    // The self-study twin on the Dashboard (src/lib/dashboardLink.js).
    dashboard: { track: 'Y7_SCI', unit: 'U02_4' },
  },
  slides,
  plan,
}
