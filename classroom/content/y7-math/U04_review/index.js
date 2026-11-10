// A lesson module: default-exports { meta, slides, plan }. The registry
// auto-discovers this file (content/<course>/<unit>/index.js).
//
// The optional third decimal day: what the 4.1–4.4 speed run skipped, and a
// review of the whole unit. English and French only.
import { slides } from './slides.js'
import { plan } from './plan.js'

export default {
  meta: {
    course: 'y7-math',
    unit: '4 Review',
    id: 'U04_review',
    title: 'Bigger Numbers, Real Problems',
    subtitle: 'Unit 4 consolidation — × and ÷ by 2-digit numbers, money, the mean',
    objective:
      'Multiply a decimal by a 2-digit number and place the point with an estimate; divide a decimal by a ' +
      '2-digit number by writing its times table first; write money to 2 decimal places; make a conjecture ' +
      'and test it with a mean; and use all of Unit 4 in multi-step word problems.',
    order: 16,
    french: true,
    vietnamese: false,
    // Not a section of its own: its × and ÷ by a 2-digit number and its
    // money problems went into the Dashboard's 4.3 and 4.4 units. The link
    // names 4.3; 4.4 is the next card down.
    dashboard: { track: 'Y7_MATH', unit: 'U04_3' },
  },
  slides,
  plan,
}
