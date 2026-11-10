// content/y7-science/U03_5/index.js
// A lesson module: default-exports { meta, slides, plan }. The registry
// auto-discovers this file (content/<course>/<unit>/index.js).
//
// Science 3.5 Energy, one period, built on the shape of Coffee, Carbon and
// Stars and 3.4 Tides: a starter question, three goals (how much, what kind,
// how long), a stepper to say first, two votes, a game for the whole class
// standing, Mr Bowen's coffee story, real photographs and a launch, and a
// checklist that ticks off the goals. English and French only, like every
// Year 7 deck from 15 October 2026.
import { slides } from './slides.js'
import { plan } from './plan.js'

export default {
  meta: {
    course: 'y7-science',
    unit: '3.5',
    id: 'U03_5',
    title: 'Energy',
    subtitle: 'How much, what kind, how long: joules, the five stores and three transfers, and which stores last',
    objective:
      'Say what energy is and measure it in joules; recall and describe the five energy stores (kinetic, chemical, thermal, ' +
      'elastic potential, gravitational potential) and the three transfers (electrical, sound, light — thermal is both), with an ' +
      'example of each; and explain why chemical and gravitational potential stores last a long time while thermal and kinetic stores do not.',
    order: 19,
    french: true,
    vietnamese: false,
    // The self-study twin on the Dashboard (src/lib/dashboardLink.js).
    dashboard: { track: 'Y7_SCI', unit: 'U03_5' },
  },
  slides,
  plan,
}
