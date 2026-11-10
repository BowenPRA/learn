// A lesson module: default-exports { meta, slides, plan }. The registry
// auto-discovers this file (content/<course>/<unit>/index.js).
import { slides } from './slides.js'
import { plan } from './plan.js'

export default {
  meta: {
    course: 'y7-math',
    unit: '2.1',
    id: 'U02_1',
    title: 'Constructing Expressions',
    objective:
      'Choose a letter to represent a number you cannot count, leave an expression such as c − 50 unfinished without thinking it is wrong, write 3 × s as 3s, and read the English that decides the answer — "h less than t" is written t − h, "subtract 4" is not "subtract from 4", and "subtract the result from 25" is 25 − 3n.',
    order: 7,
    french: true,
    // The self-study twin on the Dashboard (src/lib/dashboardLink.js).
    dashboard: { track: 'Y7_MATH', unit: 'U02_1' },
  },
  slides,
  plan,
}
