// A lesson module: default-exports { meta, slides, plan }. The registry
// auto-discovers this file (content/<course>/<unit>/index.js).
import { slides } from './slides.js'
import { plan } from './plan.js'

export default {
  meta: {
    course: 'y7-math',
    unit: '2.6',
    id: 'U02_6',
    title: 'Inequalities',
    objective:
      'Read < and > aloud as "is less than" and "is greater than", and recognise the other words a word problem uses; ' +
      'say what an inequality and an integer are, and know that an inequality can have many answers; ' +
      'show an inequality on a number line with an open circle and an arrow, and write the inequality a number line shows; ' +
      'and give the smallest or largest integer that works, so x > 3 gives 4 and t < −2 gives −3, −4, −5, …',
    order: 12,
    french: true,
    // The self-study twin on the Dashboard (src/lib/dashboardLink.js).
    dashboard: { track: 'Y7_MATH', unit: 'U02_6' },
  },
  slides,
  plan,
}
