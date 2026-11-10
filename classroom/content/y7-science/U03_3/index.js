// A lesson module: default-exports { meta, slides, plan }. The registry
// auto-discovers this file (content/<course>/<unit>/index.js).
//
// Science 3.3, one period: what keeps the planets in orbit, why the close ones
// are fast, and why nothing in space slows down. English and French only, like
// every Year 7 deck from 15 October 2026.
import { slides } from './slides.js'
import { plan } from './plan.js'

export default {
  meta: {
    course: 'y7-science',
    unit: '3.3',
    id: 'U03_3',
    title: 'Movement in Space',
    subtitle: 'Let go of the string: what keeps the planets going round, and why nothing slows them down',
    objective:
      'Explain that the Sun’s gravity keeps the planets in orbit and always pulls towards the Sun; ' +
      'show from a bar graph that planets further from the Sun move more slowly, and say why; ' +
      'describe air resistance and a vacuum, and explain why objects moving in space do not slow down.',
    order: 17,
    french: true,
    vietnamese: false,
    // The self-study twin on the Dashboard (src/lib/dashboardLink.js).
    dashboard: { track: 'Y7_SCI', unit: 'U03_3' },
  },
  slides,
  plan,
}
