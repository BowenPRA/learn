// content/y7-science/U05_2/index.js
// A lesson module: default-exports { meta, slides, plan }. The registry
// auto-discovers this file (content/<course>/<unit>/index.js).
//
// Science 5.2 Comparing metals and non-metals, after 5.1 Metals and
// non-metals, one period, 22 slides: the book's starter (four words, four
// cartoons), three goals (compare, test, clues), the table on page 158 built
// a row a press, whereas, the market (Question 1), examine and distinguish,
// the record table of Investigating materials, Mr Bowen's broken lamp,
// contact, the test circuit drawn and then eight desk things tested in it,
// a pencil-lead vote and graphite, all or most (Question 3), mercury and
// graphite, True or False? with the whole class standing, melting point and
// boiling point, solid, liquid or gas at 25 °C, two mystery substances, a
// checklist and Question 4. Built from Learner's Book pages 157–160, Workbook
// Exercises 5.2A–C and the Teacher's Resource for 5.2. English and French
// only, like every Year 7 deck from 15 October 2026.
import { slides } from './slides.js'
import { plan } from './plan.js'

export default {
  meta: {
    course: 'y7-science',
    unit: '5.2',
    id: 'U05_2',
    title: 'Comparing Metals and Non-metals',
    subtitle: 'Compare, test and use clues: the two sides of the table, a test circuit, the odd ones out, and melting and boiling points',
    objective:
      'Compare the properties of metals and non-metals in sentences with whereas; examine materials and distinguish metals from non-metals, testing for electrical conduction with good contact; ' +
      'name the exceptions mercury and graphite; and use melting and boiling points to say whether a substance is a solid, a liquid or a gas at room temperature.',
    order: 29,
    french: true,
    vietnamese: false,
  },
  slides,
  plan,
}
