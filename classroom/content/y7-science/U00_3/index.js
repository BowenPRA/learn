// content/y7-science/U00_3/index.js
// A lesson module: default-exports { meta, slides, plan }. The registry
// auto-discovers this file (content/<course>/<unit>/index.js).
//
// A short hands-on building project — not part of the Cambridge 1.1–1.4
// Cells sequence, so it uses the same non-curriculum "U00" prefix as Day One
// (U00_1) and the Accuracy and Precision lab (U00_2).
import { slides } from './slides.js'
import { plan } from './plan.js'

export default {
  meta: {
    course: 'y7-science',
    unit: 'P1',
    id: 'U00_3',
    title: 'Hanging Window Planters',
    subtitle: 'A tiny recycled-cup garden for the classroom window',
    objective:
      'Turn a used cup into a hanging planter: punch drainage and hanging holes, fill it with soil, plant a seed, and hang it in the window to grow.',
    order: 4.6,
  },
  slides,
  plan,
}
