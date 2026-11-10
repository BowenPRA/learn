// content/y7-science/U03_lab/index.js
// A lesson module: default-exports { meta, slides, plan }. The registry
// auto-discovers this file (content/<course>/<unit>/index.js).
//
// Designing a Lab: the end of 3.1 (speeding up, the Drop Race, planning the
// test, the ruler catch) as its own lesson, ahead of the lab itself. It reuses
// 3.1's diagrams, photo and DropRace, and adds RulerCatch. English and French.
import { slides } from './slides.js'
import { plan } from './plan.js'

export default {
  meta: {
    course: 'y7-science',
    unit: '3.1 Lab',
    id: 'U03_LAB',
    title: 'Designing a Lab',
    subtitle: 'Do heavy things fall faster? How do you time a fall?',
    objective:
      'Explain that a falling object accelerates and why heavy and light objects fall together; ' +
      'plan a fair test of whether heavy things fall faster; measure reaction time with a falling ruler, ' +
      'and explain why a stopwatch is too slow to time a short fall.',
    order: 15.5,
    french: true,
    vietnamese: false,
  },
  slides,
  plan,
}
