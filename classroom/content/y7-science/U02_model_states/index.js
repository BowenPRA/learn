// content/y7-science/U02_model_states/index.js
// A standalone science-track model, discovered by the registry exactly like a
// lesson. One slide, one interactive: change the temperature and watch a
// substance move through all three states, with the particles shown beside it.
// It is the companion to 2.2 (U02_2a Changes of State, U02_2b Measuring), so it
// sits right after them (order 8.5).
import { slides } from './slides.js'
import { plan } from './plan.js'

export default {
  meta: {
    course: 'y7-science',
    unit: 'Model',
    id: 'U02_MODEL',
    title: 'Heating & Cooling: A Particle Model',
    objective: 'An interactive model for section 2.2: change the temperature of ice, mercury, oxygen or iron and watch it melt, evaporate, boil, condense and freeze — with the particle arrangement shown beside the beaker, and every transition temperature marked on a temperature axis.',
    order: 8.5,
    // The self-study twin on the Dashboard (src/lib/dashboardLink.js).
    dashboard: { track: 'Y7_SCI', unit: 'U02_2' },
  },
  slides,
  plan,
}
