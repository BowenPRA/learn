// content/y7-science/U04_1/index.js
// A lesson module: default-exports { meta, slides, plan }. The registry
// auto-discovers this file (content/<course>/<unit>/index.js).
//
// Science 4.1 Characteristics of living organisms, one period, on the shape of
// Coffee, Carbon and Stars and 3.4–3.7: a starter from the book's Getting
// started, three goals (spot it, name them, test it), the book's polar bears a
// letter a press (MRS GREN), a vote on respiration, an English check on
// "sensitive" and a film of the sensitive plant, Mr Bowen's pet rock, a game
// for the whole class standing, the book's car activity checked against the
// seven, Questions 1–7, and a checklist that ticks off the goals. Built from
// Learner's Book pages 127–129. English and French only, like every Year 7
// deck from 15 October 2026.
import { slides } from './slides.js'
import { plan } from './plan.js'

export default {
  meta: {
    course: 'y7-science',
    unit: '4.1',
    id: 'U04_1',
    title: 'Characteristics of Living Organisms',
    subtitle: 'Is it alive? Spot it, name them, test it: organisms, the seven characteristics (MRS GREN) in a polar bear and a plant, and why a car is not alive',
    objective:
      'Say whether something is a living organism; list the seven characteristics of living organisms — movement, respiration, sensitivity, growth, ' +
      'reproduction, excretion and nutrition — and say what each means; explain that a living organism does all seven, so a car, fire or a rock is not alive.',
    order: 22,
    french: true,
    vietnamese: false,
  },
  slides,
  plan,
}
