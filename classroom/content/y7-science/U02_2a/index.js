// content/y7-science/U02_2a/index.js
// A lesson module: default-exports { meta, slides, plan }. The registry
// auto-discovers this file (content/<course>/<unit>/index.js).
//
// Section 2.2 of the Learner's Book is six pages (35-40) and is taught over two
// periods: 2.2a is pages 35-36 (the five change words and the English that
// carries them), 2.2b is pages 37-40 (measuring, and the heating-water
// investigation). See U02_2b.
import { slides } from './slides.js'
import { plan } from './plan.js'

export default {
  meta: {
    course: 'y7-science',
    unit: '2.2a',
    id: 'U02_2a',
    title: 'Changes of State',
    objective: 'Name the five changes of state (melting, freezing, evaporation, boiling and condensation), say each as a journey from one state to another, use the doing word (verb) and naming word (noun) for each, distinguish evaporating from boiling, and give the melting point and boiling point of water.',
    order: 7,
    french: true,
    // The self-study twin on the Dashboard (src/lib/dashboardLink.js).
    dashboard: { track: 'Y7_SCI', unit: 'U02_2' },
  },
  slides,
  plan,
}
