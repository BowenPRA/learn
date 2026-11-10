// A lesson module: default-exports { meta, slides, plan }. The registry
// auto-discovers this file (content/<course>/<unit>/index.js).
//
// The first lesson of Unit 3 Forces and energy, and the first Year 7 science
// deck in English and French only — from 15 October the Year 7 lessons drop
// Vietnamese, so the deck's switch reads EN / FR. One deck, two periods: Part 1
// is 15 October, Part 2 the lesson after.
import { slides } from './slides.js'
import { plan } from './plan.js'

export default {
  meta: {
    course: 'y7-science',
    unit: '3.1',
    id: 'U03_1',
    title: 'Gravity, Weight and Mass',
    subtitle: 'Do heavy things fall faster? Galileo, the Moon, and the newton',
    objective:
      'Explain that gravity pulls objects towards each other and acts towards the centre of the Earth; ' +
      'describe weight as the force of gravity on an object, measured in newtons, and the contact force ' +
      'that balances it; describe mass as the quantity of matter, measured in kilograms; calculate weight ' +
      'with W = m × 10 and on other planets; and explain why a falling object accelerates and why heavy and ' +
      'light objects fall together.',
    order: 15,
    french: true,
    vietnamese: false,
    // The self-study twin on the Dashboard (src/lib/dashboardLink.js).
    dashboard: { track: 'Y7_SCI', unit: 'U03_1' },
  },
  slides,
  plan,
}
