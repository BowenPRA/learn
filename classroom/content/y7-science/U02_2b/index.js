// content/y7-science/U02_2b/index.js
// A lesson module: default-exports { meta, slides, plan }. The registry
// auto-discovers this file (content/<course>/<unit>/index.js).
//
// The second half of Learner's Book section 2.2: pages 37-40. 2.2a (U02_2a) is
// pages 35-36 and must be taught first — this deck uses the change words from it
// when the heated water reaches its boiling point and stops getting hotter.
import { slides } from './slides.js'
import { plan } from './plan.js'

export default {
  meta: {
    course: 'y7-science',
    unit: '2.2b',
    id: 'U02_2b',
    title: 'Measuring, and Heating Water',
    objective: 'Measure the volume of a liquid with a measuring cylinder (read the bottom of the meniscus at eye level) and a temperature with a thermometer (read the top of the liquid at eye level); plan and carry out the heating-water investigation safely; plot temperature against time; and describe the result — the temperature rises, then stays the same at the boiling point.',
    order: 8,
    french: true,
    // The self-study twin on the Dashboard (src/lib/dashboardLink.js).
    dashboard: { track: 'Y7_SCI', unit: 'U02_2' },
  },
  slides,
  plan,
}
