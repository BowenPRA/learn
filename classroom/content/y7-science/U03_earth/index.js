// content/y7-science/U03_earth/index.js
// A lesson module: default-exports { meta, slides, plan }. The registry
// auto-discovers this file (content/<course>/<unit>/index.js).
//
// Unit 3.2 Maths Modelling: How Old Is the Earth? — the follow-up to Coffee,
// Carbon and Stars (order 16.7): longer clocks, zircons, meteorites, Clair
// Patterson, three methods for the Sun's age, and Earth's history as a year.
// It was the second period of the old Models: Space and Time Part 2. English
// and French only, like every Year 7 deck from 15 October.
import { slides } from './slides.js'
import { plan } from './plan.js'

export default {
  meta: {
    course: 'y7-science',
    unit: 'Models',
    id: 'U03_EARTH',
    title: 'How Old Is the Earth?',
    subtitle: 'Longer clocks: crystals, meteorites, and three methods that agree',
    objective:
      'Explain why a clock for billions of years needs a long half-life; date a fossil from the ash around it; explain how ' +
      'zircon crystals and meteorites give the age of the Earth; and explain why scientists trust the Sun’s age.',
    order: 16.7,
    french: true,
    vietnamese: false,
  },
  slides,
  plan,
}
