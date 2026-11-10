// content/y7-science/U00_1/index.js
// A lesson module: default-exports { meta, slides, plan }. The registry
// auto-discovers this file (content/<course>/<unit>/index.js).
//
// Day One covers homeroom and the science period of Tue 4 Aug 2026. The maths
// period that day is the Stage 6 diagnostic, which needs no slides.
// `order: 0` keeps this ahead of Unit 1.1.
import { slides } from './slides.js'
import { plan } from './plan.js'

export default {
  meta: {
    course: 'y7-science',
    unit: 'Day 1',
    id: 'U00_1',
    title: 'Day One: Welcome to Year 7',
    subtitle: 'Homeroom · Science — Tue 4 Aug 2026',
    objective:
      'Get to know the class, walk through the expectation letter, and set up binders and named Learner\'s Books.',
    order: 0,
    // Delisted — Day One is taught and done. It no longer shows on the home
    // page or the Science course page, but nothing is deleted: the deck still
    // opens at #/lesson/y7-science/U00_1. Remove this line to bring it back.
    hidden: true,
  },
  slides,
  plan,
}
