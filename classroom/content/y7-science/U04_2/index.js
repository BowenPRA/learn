// content/y7-science/U04_2/index.js
// A lesson module: default-exports { meta, slides, plan }. The registry
// auto-discovers this file (content/<course>/<unit>/index.js).
//
// Science 4.2 Viruses, one period, on the shape of Coffee, Carbon and Stars,
// 3.4 Tides and 4.1: a starter that asks whether a virus is alive, three goals
// (look inside, follow it, decide), a zoom into Mr Bowen's nose to flu viruses
// at ×100 000, the electron microscope, a cell beside a real flu virus, the
// book's virus drawn (protein coat, pegs, RNA), two votes, the class acting
// as cells that copy a virus, the flu virus a step a press, real viruses
// leaving a cell, SARS-CoV-2, Mr Bowen's next pet, Activity 4.2.1, the virus
// against the seven, and a checklist that ticks off the goals. Built from
// Learner's Book pages 130–133. English and French only, like every Year 7
// deck from 15 October 2026.
import { slides } from './slides.js'
import { plan } from './plan.js'

export default {
  meta: {
    course: 'y7-science',
    unit: '4.2',
    id: 'U04_2',
    title: 'Viruses',
    subtitle: 'Is a virus alive? Look inside (protein coat, pegs, RNA, seen with an electron microscope), follow a flu virus into a cell (replication), and decide with the seven characteristics',
    objective:
      'Describe a virus — a very small particle, not made of cells, with a protein coat, pegs and RNA inside, seen only with an electron microscope; explain how a virus replicates ' +
      '(it sticks to a cell, gets inside and makes the cell copy its RNA and build new viruses, and the cell dies); and give reasons for classifying viruses as living or non-living.',
    order: 23,
    french: true,
    vietnamese: false,
  },
  slides,
  plan,
}
