// A lesson module: default-exports { meta, slides, plan }. The registry
// auto-discovers this file (content/<course>/<unit>/index.js).
//
// Upper Secondary English Unit 1, Complete Sentences: the class deck for the Unit 1
// notes (/unit/#/UPPER_ENG/U01/lesson), 16 slides in about 30 minutes. English only.
import { slides } from './slides.js'
import { plan } from './plan.js'

export default {
  meta: {
    course: 'upper-english',
    unit: '1',
    id: 'U01',
    title: 'Complete Sentences',
    subtitle: 'Fragments, run-ons and comma splices, and four ways to fix them',
    objective:
      'Know what a complete sentence needs, spot a fragment, a run-on and a comma splice, ' +
      'and fix each one four different ways.',
    order: 1,
    vietnamese: false,
  },
  slides,
  plan,
}
