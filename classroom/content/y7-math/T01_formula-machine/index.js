// content/y7-math/T01_formula-machine/index.js
// A lesson module: default-exports { meta, slides, plan }. The registry
// auto-discovers this file (content/<course>/<unit>/index.js).
//
// `unit` is rendered inside a small circular badge on the course page, so it
// has to stay short — hence 'T1' rather than 'Task 1'.
import { slides } from './slides.js'
import { plan } from './plan.js'

export default {
  meta: {
    course: 'y7-math',
    unit: 'T1',
    id: 'T01',
    title: 'Task: The Formula Machine',
    objective:
      'A standalone task following 2.2. Students take one formula at a time and run six different sets of values through it, with the diagram redrawing for every set: perimeter of a rectangle, ' +
      'area of a triangle (where the height is the dashed line and never the slanted side), Celsius to Fahrenheit, and the distance to a storm from the seconds between the flash and the bang. ' +
      'Every problem is worked in three lines — write the formula, put the numbers in, work it out — because the middle line is where the marks and the mistakes both live. ' +
      'Part 2 turns the question round: water is poured from one tank into another with a different base, and the depth it reaches is the letter that was NOT given. ' +
      'The way in is counting centimetre cubes — how many altogether, how many in one layer, divide — not rearranging a formula.',
    order: 8.1, // taught after 2.2, so it sits there in the newest-first list
  },
  slides,
  plan,
}
