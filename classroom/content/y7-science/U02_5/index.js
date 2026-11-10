import { slides } from './slides.js'
import { plan } from './plan.js'

export default {
  meta: {
    course: 'y7-science',
    unit: '2.5',
    id: 'U02_5',
    title: 'Atoms, Elements and the Periodic Table',
    objective:
      'Explain what an atom and an element are, describe how atoms join together, ' +
      'find periods, groups, metals and non-metals in the first 20 elements of the ' +
      'Periodic Table, and write element symbols correctly.',
    // 2.3 is 9; 10 is left free for 2.4 The water cycle.
    order: 11,
    french: true,
    // The self-study twin on the Dashboard (src/lib/dashboardLink.js).
    dashboard: { track: 'Y7_SCI', unit: 'U02_5' },
  },
  slides,
  plan,
}
