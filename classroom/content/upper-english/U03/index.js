// A lesson module: default-exports { meta, slides, plan }. The registry
// auto-discovers this file (content/<course>/<unit>/index.js).
//
// Upper Secondary English Unit 3, Nouns and Articles: the class deck for the Unit 3 notes
// (/unit/#/UPPER_ENG/U03/lesson), 16 slides in about 30 minutes. English only.
import { slides } from './slides.js'
import { plan } from './plan.js'

export default {
  meta: {
    course: 'upper-english',
    unit: '3',
    id: 'U03',
    title: 'Nouns and Articles',
    subtitle: 'One or more, count it or not, and a / an / the or nothing',
    objective:
      'Make plurals, tell the things you can count from the things you cannot, ' +
      'and choose a, an, the or no article at all.',
    order: 3,
    vietnamese: false,
  },
  slides,
  plan,
}
