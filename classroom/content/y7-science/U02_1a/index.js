// content/y7-science/U02_1a/index.js
// A lesson module: default-exports { meta, slides, plan }. The registry
// auto-discovers this file (content/<course>/<unit>/index.js).
//
// Section 2.1 of the Learner's Book is seven pages and is taught over two
// periods: 2.1a is pages 28-30 (the states and their properties), 2.1b is
// pages 31-34 (particle theory). See U02_1b.
import { slides } from './slides.js'
import { plan } from './plan.js'

export default {
  meta: {
    course: 'y7-science',
    unit: '2.1a',
    id: 'U02_1a',
    title: 'Solids, Liquids and Gases',
    objective: 'Sort any substance into solid, liquid or gas by testing its properties rather than by how it looks, list the properties of each state, and use the words hypothesis and theory the way a scientist does.',
    order: 5,
    french: true,
    // The self-study twin on the Dashboard (src/lib/dashboardLink.js).
    dashboard: { track: 'Y7_SCI', unit: 'U02_1' },
  },
  slides,
  plan,
}
