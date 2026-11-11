// content/y7-science/U04_3/index.js
// A lesson module: default-exports { meta, slides, plan }. The registry
// auto-discovers this file (content/<course>/<unit>/index.js).
//
// Science 4.3 What is a species?, one period, on the shape of Coffee, Carbon
// and Stars and 3.4 Tides: a starter in words (three small birds, three colours), three
// goals (compare, name, test), the book's two elephants compared one
// difference a press, species, identical and similar, variation, a vote on
// how scientists can be sure, offspring and fertile, Mr Bowen's new pets (a
// horse, a donkey and two mules), infertile, the liger and a second vote, the
// book's full definition, the species test a thumb at a time, Same Species or
// Different? with the whole class standing, two specimens, the test drawn
// twice, and a checklist that ticks off the goals. Built from Learner's Book
// pages 134–137. English and French only, like every Year 7 deck from
// 15 October 2026.
import { slides } from './slides.js'
import { plan } from './plan.js'

export default {
  meta: {
    course: 'y7-science',
    unit: '4.3',
    id: 'U04_3',
    title: 'What Is a Species?',
    subtitle: 'Compare, name, test: two elephants, species and variation, and why a lion and a tiger are two species (fertile offspring)',
    objective:
      'Compare two species of organism, listing similarities and differences; say what a species is — a group of organisms that can reproduce together to produce fertile offspring — ' +
      'and what variation is; explain how scientists decide whether two organisms belong to the same species, using lions, tigers and the infertile liger.',
    order: 24,
    french: true,
    vietnamese: false,
  },
  slides,
  plan,
}
