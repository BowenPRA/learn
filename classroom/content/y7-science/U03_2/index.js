// A lesson module: default-exports { meta, slides, plan }. The registry
// auto-discovers this file (content/<course>/<unit>/index.js).
//
// Science 3.2, one period. English and French only — from Unit 4 the Year 7
// lessons drop Vietnamese, so the deck's switch reads EN / FR.
import { slides } from './slides.js'
import { plan } from './plan.js'

export default {
  meta: {
    course: 'y7-science',
    unit: '3.2',
    id: 'U03_2',
    title: 'Formation of the Solar System',
    subtitle: 'Nobody was there — so how do we know? A cloud of dust, gravity, and one spinning disc',
    objective:
      'Recall that there are clouds of dust and gas (nebulas) in space and that stars and planets form from them; ' +
      'explain that gravity pulls dust and gas together, and that as a clump gains mass its gravity grows, so it pulls in ' +
      'even more; describe how a star and planets form, and why the planets orbit the Sun in the same direction and in ' +
      'one plane; and use the words observe, evidence, hypothesis, support, contradict and model to say how scientists ' +
      'test an idea nobody could watch happen.',
    order: 16,
    french: true,
    vietnamese: false,
    // The self-study twin on the Dashboard (src/lib/dashboardLink.js).
    dashboard: { track: 'Y7_SCI', unit: 'U03_2' },
  },
  slides,
  plan,
}
