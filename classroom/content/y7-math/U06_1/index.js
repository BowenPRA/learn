// A lesson module: default-exports { meta, slides, plan }. The registry
// auto-discovers this file (content/<course>/<unit>/index.js).
//
// 6.1 Conducting an investigation: the first section of Unit 6 Collecting
// data. Three kinds of data (categorical, discrete, continuous), a good survey
// question (critique it, suggest a better one), the class's own survey with
// tallies and a grouped frequency table, and testing a prediction with data.
// One period, on the shape of 5.2 and 5.3. English and French.
import { slides } from './slides.js'
import { plan } from './plan.js'

export default {
  meta: {
    course: 'y7-math',
    unit: '6.1',
    id: 'U06_1',
    title: 'Conducting an Investigation',
    subtitle: 'Words, counts and measures: ask a good question, collect the class’s answers, and test a prediction',
    objective:
      'Sort data into categorical (a word), discrete (you count it) and continuous (you measure it); critique a survey question and ' +
      'suggest a better one (clear words, a box for every answer, no answer in two boxes); collect the class’s own data in a frequency ' +
      'table, grouping continuous data into equal groups; and test a prediction with data, giving a reason with the numbers.',
    order: 20,
    french: true,
    vietnamese: false,
  },
  slides,
  plan,
}
