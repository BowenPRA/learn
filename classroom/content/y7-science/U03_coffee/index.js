// content/y7-science/U03_coffee/index.js
// A lesson module: default-exports { meta, slides, plan }. The registry
// auto-discovers this file (content/<course>/<unit>/index.js).
//
// Unit 3.2 Maths Modelling: Coffee, Carbon and Stars — one period on the
// half-life, told through Mr Bowen and his coffee, carbon dating, and the Sun
// as a hydrogen clock. It was Part 2 of Models: Space and Time until it became
// a deck of its own (order 16.6, after Models: Space). How Old Is the Earth?
// (U03_earth) carries on from it. English and French only, like every Year 7
// deck from 15 October.
import { slides } from './slides.js'
import { plan } from './plan.js'

export default {
  meta: {
    course: 'y7-science',
    unit: 'Models',
    id: 'U03_COFFEE',
    title: 'Coffee, Carbon and Stars',
    subtitle: 'Half-life, carbon dating and the Sun’s age: different speeds, the same maths',
    objective:
      'Use a half-life to find how much is left and how long ago something started; explain carbon dating and why it ' +
      'cannot date a dinosaur; explain how a model Sun gives the Sun’s age; and see that caffeine, carbon-14 and the ' +
      'Sun’s hydrogen each disappear at a rate maths can model: measure what is left, work out how long.',
    order: 16.6,
    french: true,
    vietnamese: false,
  },
  slides,
  plan,
}
