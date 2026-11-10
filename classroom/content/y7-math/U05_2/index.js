// A lesson module: default-exports { meta, slides, plan }. The registry
// auto-discovers this file (content/<course>/<unit>/index.js).
//
// 5.2 Intersecting lines: vertically opposite angles, parallel and
// perpendicular lines, and corresponding and alternate angles where a line
// crosses two parallel lines, each with its reason said as an English
// sentence. One period, built on the shape of Coffee, Carbon and Stars and
// 3.4 Tides. English and French only.
import { slides } from './slides.js'
import { plan } from './plan.js'

export default {
  meta: {
    course: 'y7-math',
    unit: '5.2',
    id: 'U05_2',
    title: 'Intersecting Lines',
    subtitle: 'X, F and Z: vertically opposite, corresponding and alternate angles',
    objective:
      'Find vertically opposite angles where two straight lines cross; say what parallel and perpendicular lines are; ' +
      'use corresponding and alternate angles where a line crosses two parallel lines; and give each reason as a sentence ' +
      '(“a = 70° because they are alternate angles”), in the words the Workbook uses.',
    order: 18,
    french: true,
    vietnamese: false,
    // The self-study twin on the Dashboard (src/lib/dashboardLink.js).
    dashboard: { track: 'Y7_MATH', unit: 'U05_2' },
  },
  slides,
  plan,
}
