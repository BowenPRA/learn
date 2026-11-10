// A lesson module: default-exports { meta, slides, plan }. The registry
// auto-discovers this file (content/<course>/<unit>/index.js).
//
// 5.1 A sum of 360°: angles on a straight line, round a point and in a
// quadrilateral, plus the English of the Workbook questions. One period.
// English and French only.
import { slides } from './slides.js'
import { plan } from './plan.js'

export default {
  meta: {
    course: 'y7-math',
    unit: '5.1',
    id: 'U05_1',
    title: 'A Sum of 360°',
    subtitle: 'Angles on a line, round a point and in a quadrilateral',
    objective:
      'Use angles on a straight line (180°), angles around a point (360°) and angles in a quadrilateral ' +
      '(360°) to find missing angles; know the key words sum and quadrilateral; use the opposite angles of ' +
      'a parallelogram; and read the instruction words of a Workbook angle question.',
    order: 17,
    french: true,
    vietnamese: false,
    // The self-study twin on the Dashboard (src/lib/dashboardLink.js).
    dashboard: { track: 'Y7_MATH', unit: 'U05_1' },
  },
  slides,
  plan,
}
