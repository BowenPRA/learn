// content/y7-science/U04_classkey/index.js
// A lesson module: default-exports { meta, slides, plan }. The registry
// auto-discovers this file (content/<course>/<unit>/index.js).
//
// Our Class Key, a short practical after 4.5: a starter (one question that
// splits the class), good or bad for our class, the class key built one split
// at a time from the names in Pick on the classroom computer, tested on
// classmates, copied as a numbered key, and an exit question. English and
// French only, like every Year 7 deck from 15 October 2026.
import { slides } from './slides.js'
import { plan } from './plan.js'

export default {
  meta: {
    course: 'y7-science',
    unit: '4.5+',
    id: 'U04_classkey',
    title: 'Our Class Key',
    subtitle: 'Build, test and copy a dichotomous key for the people in our class',
    objective:
      'Construct a dichotomous key for the people in our class with questions everyone answers the same way; ' +
      'test it on a classmate and write it as a numbered key.',
    order: 27,
    french: true,
    vietnamese: false,
  },
  slides,
  plan,
}
