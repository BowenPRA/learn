// A lesson module: default-exports { meta, slides, plan }. The registry
// auto-discovers this file (content/<course>/<unit>/index.js).
//
// 5.3 Drawing lines and quadrilaterals: reading and using a protractor,
// right angles and squares, the perpendicular from a point, parallel lines
// (the same angle), a quadrilateral from a sketch, and checking a drawing with
// 360°. A practical period after 5.2, on the same shape. English and French.
import { slides } from './slides.js'
import { plan } from './plan.js'

export default {
  meta: {
    course: 'y7-math',
    unit: '5.3',
    id: 'U05_3',
    title: 'Drawing Lines and Quadrilaterals',
    subtitle: 'A protractor, a ruler and a set square: right angles, parallel lines and four-sided shapes, drawn and checked',
    objective:
      'Read and use a protractor (start at 0 on the line); draw a right angle and a square; draw the perpendicular from a point ' +
      'to a line; draw a parallel line by making the same angle; draw a quadrilateral from a sketch; measure lengths to the nearest ' +
      'millimetre and angles to the nearest degree; and check a drawing with an angle fact (360°).',
    order: 19,
    french: true,
    vietnamese: false,
    // The self-study twin on the Dashboard (src/lib/dashboardLink.js).
    dashboard: { track: 'Y7_MATH', unit: 'U05_3' },
  },
  slides,
  plan,
}
