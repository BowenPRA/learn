// content/y7-science/U02_8/index.js
// A lesson module: default-exports { meta, slides, plan }. The registry
// auto-discovers this file (content/<course>/<unit>/index.js).
//
// Unit 2 of the Learner's Book ends at 2.7, so this section has no book pages
// behind it. It is built to the Cambridge Lower Secondary Stage 7 chemistry
// content instead — acids, alkalis, indicators, the pH scale and
// neutralisation — and it leans on 2.5 (elements) and 2.7 (mixtures) only for
// the habit of naming a substance, never for their content.
import { slides } from './slides.js'
import { plan } from './plan.js'

export default {
  meta: {
    course: 'y7-science',
    unit: '2.8',
    id: 'U02_8',
    title: 'Acids and Bases',
    objective:
      'Recognise acids and bases from everyday examples; use an indicator ' +
      '(litmus and universal indicator) to test a liquid; read the pH scale and ' +
      'say whether something is acid, neutral or alkali; and explain what ' +
      'neutralisation does and where it is already used.',
    // 2.7 is 13; 10 was the slot left free for 2.4 and is now filled.
    order: 14,
    french: true,
    // The self-study twin on the Dashboard (src/lib/dashboardLink.js).
    dashboard: { track: 'Y7_SCI', unit: 'U02_8' },
  },
  slides,
  plan,
}
