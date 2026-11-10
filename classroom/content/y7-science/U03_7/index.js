// content/y7-science/U03_7/index.js
// A lesson module: default-exports { meta, slides, plan }. The registry
// auto-discovers this file (content/<course>/<unit>/index.js).
//
// Science 3.7 Where does energy go?, one period, on the shape of Coffee,
// Carbon and Stars, 3.4, 3.5 and 3.6: a starter question, three goals (sort
// it, count it, chase it), a stepper to say first, two votes, a game for the
// whole class standing, Mr Bowen's bag of heat, a model of heat spreading
// out, real photographs, and a checklist that ticks off the goals. Built from
// Learner's Book pages 117–119 only. English and French only, like every
// Year 7 deck from 15 October 2026.
import { slides } from './slides.js'
import { plan } from './plan.js'

export default {
  meta: {
    course: 'y7-science',
    unit: '3.7',
    id: 'U03_7',
    title: 'Where Does Energy Go?',
    subtitle: 'Sort it, count it, chase it: useful and wasted energy, the two lamps, and energy that spreads out for good',
    objective:
      'Sort the energy from a change into useful and wasted energy; compare how much two lamps waste using percentages; ' +
      'explain that wasted energy is dissipated — it spreads out where there is no use for it and can never be recovered — ' +
      'and that some energy is dissipated every time energy is changed or transferred.',
    order: 21,
    french: true,
    vietnamese: false,
    // The self-study twin on the Dashboard (src/lib/dashboardLink.js).
    dashboard: { track: 'Y7_SCI', unit: 'U03_7' },
  },
  slides,
  plan,
}
