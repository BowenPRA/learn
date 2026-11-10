// content/y7-math/T02_girl-math/index.js
// A lesson module: default-exports { meta, slides, plan }. The registry
// auto-discovers this file (content/<course>/<unit>/index.js).
//
// `unit` is rendered inside a small circular badge on the course page, so it
// has to stay short — hence 'T2' rather than 'Task 2'.
import { slides } from './slides.js'
import { plan } from './plan.js'

export default {
  meta: {
    course: 'y7-math',
    unit: 'T2',
    id: 'T02',
    title: 'Girl Math',
    objective:
      'A standalone task: a set of girls share a number of pieces of rice paper under rules like "Carrot gets twice as many as Erica" and "Nam gets 3 more than Su", and students find every share before the clock runs out. ' +
      'The route in is a box, drawn first and then named n — so "twice as many" is 2n and "3 more than" is n + 3. Every share is written as an expression, all of them are added up and set equal to the total, that equation is tidied and solved down to n, and n goes back in to give each girl her number. ' +
      'Ten rounds, from two girls and one rule up to all eight in an arithmetic staircase, each worth more rolls than the last. ' +
      'The three phrases the whole task turns on are "twice as many as", "more than" and "fewer than" — this is a reading task with algebra attached, which is exactly the difficulty this class actually has.',
    order: 8.2, // the same week as T1
  },
  slides,
  plan,
}
