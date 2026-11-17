// content/y7-science/U04_5/index.js
// A lesson module: default-exports { meta, slides, plan }. The registry
// auto-discovers this file (content/<course>/<unit>/index.js).
//
// Science 4.5 Constructing keys, one period, shorter than 4.4 (14 slides): a
// starter in words (which plant questions are bad for a key?), three goals
// (choose, build, test and fix), a vote that splits the room (is Mr Bowen
// tall?), a good key question, -er than + a number, Good Question or Bad?
// with the whole class standing, a key for four market fruits built one split
// a press, how to build a key, Mr Bowen's "Is it cute?" key tested by three
// friends, each student's own key for four cats, swap-test-fix with feedback,
// one cat key that works, and a checklist that ticks off the goals. Built
// from Learner's Book pages 143–146. English and French only, like every
// Year 7 deck from 15 October 2026.
import { slides } from './slides.js'
import { plan } from './plan.js'

export default {
  meta: {
    course: 'y7-science',
    unit: '4.5',
    id: 'U04_5',
    title: 'Constructing Keys',
    subtitle: 'Choose, build, test and fix: good key questions, splitting in two, and a key for four cats that a partner tests',
    objective:
      'Write a dichotomous key for four organisms, choosing questions everyone answers the same way and splitting the group in two until each has its own name; ' +
      'test a partner’s key and use feedback to make your own key work better.',
    order: 26,
    french: true,
    vietnamese: false,
  },
  slides,
  plan,
}
