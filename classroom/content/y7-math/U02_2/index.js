// A lesson module: default-exports { meta, slides, plan }. The registry
// auto-discovers this file (content/<course>/<unit>/index.js).
import { slides } from './slides.js'
import { plan } from './plan.js'

export default {
  meta: {
    course: 'y7-math',
    unit: '2.2',
    id: 'U02_2',
    title: 'Using Expressions and Formulae',
    objective:
      'Substitute a number in place of a letter and give the value; know that 3n with n = 4 is 12 and never 34, because the times sign was only ever hidden; keep the order of operations after substituting, so 3x + 2 with x = 4 is 14 and not 18; say what a formula is and why — unlike an expression — it has an = sign; substitute into a formula with two letters such as A = lw; carry a minus sign into the expression with the number it belongs to, using brackets; and recognise that a formula stops being true when the situation it describes does.',
    order: 8,
    french: true,
    // The self-study twin on the Dashboard (src/lib/dashboardLink.js).
    dashboard: { track: 'Y7_MATH', unit: 'U02_2' },
  },
  slides,
  plan,
}
