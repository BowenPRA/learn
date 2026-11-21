// A lesson module: default-exports { meta, slides, plan }. The registry
// auto-discovers this file (content/<course>/<unit>/index.js).
//
// Upper Secondary English Unit 2, The Verb in Every Sentence: the class deck for the
// Unit 2 notes (/unit/#/UPPER_ENG/U02/lesson), 16 slides in about 30 minutes. English only.
import { slides } from './slides.js'
import { plan } from './plan.js'

export default {
  meta: {
    course: 'upper-english',
    unit: '2',
    id: 'U02',
    title: 'The Verb in Every Sentence',
    subtitle: 'Be, present and past simple, the -s of he / she / it, and there is / there are',
    objective:
      'Find the verb, use “be” where English needs it, put the -s on he / she / it verbs, ' +
      'use the past simple for the past, and write “there is / there are”.',
    order: 2,
    vietnamese: false,
  },
  slides,
  plan,
}
