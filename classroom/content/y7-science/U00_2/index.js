// content/y7-science/U00_2/index.js
// A lesson module: default-exports { meta, slides, plan }. The registry
// auto-discovers this file (content/<course>/<unit>/index.js).
//
// A standalone scientific-enquiry lab on accuracy and precision — not part of
// the Cambridge 1.1–1.4 Cells sequence, so it uses the same non-curriculum
// "U00" prefix as Day One (U00_1) rather than a Cells unit number.
import { slides } from './slides.js'
import { plan } from './plan.js'

export default {
  meta: {
    course: 'y7-science',
    unit: 'Lab 1',
    id: 'U00_2',
    title: 'Accuracy and Precision',
    subtitle: 'Scientific Enquiry — 3 stations, 20 minutes each',
    objective:
      'Work in a group to predict, then take careful, repeated measurements at three stations — a perimeter, a folded stack of paper, and a ramp race — and see how repeating a measurement changes how much you can trust it.',
    order: 4.5,
  },
  slides,
  plan,
}
