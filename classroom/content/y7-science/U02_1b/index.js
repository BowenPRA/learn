// content/y7-science/U02_1b/index.js
// A lesson module: default-exports { meta, slides, plan }. The registry
// auto-discovers this file (content/<course>/<unit>/index.js).
//
// The second half of Learner's Book section 2.1: pages 31-34. 2.1a (U02_1a) is
// pages 28-30 and must be taught first — this deck refers to its syringes, its
// table and its unanswered question by name.
import { slides } from './slides.js'
import { plan } from './plan.js'

export default {
  meta: {
    course: 'y7-science',
    unit: '2.1b',
    id: 'U02_1b',
    title: 'Particle Theory',
    objective: 'Describe how particles are arranged in solids, liquids and gases, and use that one idea to explain why a liquid pours and a solid does not, why only a gas can be compressed, and what a vacuum is — then find a real weakness in the theory.',
    order: 6,
    french: true,
    // The self-study twin on the Dashboard (src/lib/dashboardLink.js).
    dashboard: { track: 'Y7_SCI', unit: 'U02_1' },
  },
  slides,
  plan,
}
