// content/y7-science/U03_models/index.js
// A lesson module: default-exports { meta, slides, plan }. The registry
// auto-discovers this file (content/<course>/<unit>/index.js).
//
// A Unit 3 modelling deck, taught after 3.2 Formation of the Solar System and
// before 3.3 Movement in Space (order 16.5): the Solar System as a working
// scale model, the two kinds of model, limitations and the nebula model.
// Its old Part 2 on time is now two decks of its own: Coffee, Carbon and Stars
// (U03_coffee, 16.6) and How Old Is the Earth? (U03_earth, 16.7), which borrow
// this folder's shared pieces (data.js, ui.jsx, space.js). English and French
// only, like every Year 7 deck from 15 October.
import { slides } from './slides.js'
import { plan } from './plan.js'

export default {
  meta: {
    course: 'y7-science',
    unit: 'Models',
    id: 'U03_MODELS',
    title: 'Models: Space',
    subtitle: 'The Solar System to scale, and how it formed',
    objective:
      'Explain the two kinds of model and name their limitations; describe the sizes and distances in the Solar System with a ' +
      'scale model, and that the planets orbit the same way in almost one flat plane; and describe how the Solar System ' +
      'formed from a spinning nebula.',
    order: 16.5,
    french: true,
    vietnamese: false,
    // The self-study twin on the Dashboard (src/lib/dashboardLink.js). Science 3.2 absorbs this deck.
    dashboard: { track: 'Y7_SCI', unit: 'U03_2' },
  },
  slides,
  plan,
}
