import { slides } from './slides.js'
import { plan } from './plan.js'

export default {
  meta: {
    course: 'y7-science',
    unit: '2.7',
    id: 'U02_7',
    title: 'Compounds and Mixtures',
    objective:
      'Tell a compound from a mixture and explain the difference, using iron and ' +
      'sulfur stirred and then heated; give air, mineral water and tap water as ' +
      'examples of mixtures.',
    // 2.6 is 12; 10 is still free for 2.4 The water cycle.
    order: 13,
    french: true,
    // The self-study twin on the Dashboard (src/lib/dashboardLink.js).
    dashboard: { track: 'Y7_SCI', unit: 'U02_7' },
  },
  slides,
  plan,
}
