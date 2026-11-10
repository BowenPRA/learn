// A lesson module: default-exports { meta, slides, plan }. The registry
// auto-discovers this file (content/<course>/<unit>/index.js).
//
// The second decimal day, after the 4.1–4.4 speed run. English and French only.
import { slides } from './slides.js'
import { plan } from './plan.js'

export default {
  meta: {
    course: 'y7-math',
    unit: '4.5',
    id: 'U04_5',
    title: 'Making Calculations Easier',
    subtitle: 'Same answer, less work',
    objective:
      'Write a decimal as an equivalent fraction; multiply by a decimal by dividing by 10 or 100 first, ' +
      'and know that multiplying by a decimal less than 1 makes a number smaller; use half of, a quarter ' +
      'of and a tenth of for × 0.5, × 0.25 and × 0.1; work out × 9 and × 11 from × 10; and partition a ' +
      'decimal to multiply it in parts.',
    order: 15,
    french: true,
    vietnamese: false,
    // The self-study twin on the Dashboard (src/lib/dashboardLink.js).
    dashboard: { track: 'Y7_MATH', unit: 'U04_5' },
  },
  slides,
  plan,
}
