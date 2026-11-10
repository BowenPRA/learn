// content/y7-science/U03_6/index.js
// A lesson module: default-exports { meta, slides, plan }. The registry
// auto-discovers this file (content/<course>/<unit>/index.js).
//
// Science 3.6 Changes in energy, one period, on the shape of Coffee, Carbon
// and Stars, 3.4 and 3.5: a starter question, three goals (change it, draw it,
// follow it), a stepper to say first, two votes, a game for the whole class
// standing with 3.5's eight actions, Mr Bowen's candle story, real photographs
// and film, and a checklist that ticks off the goals. English and French
// only, like every Year 7 deck from 15 October 2026.
import { slides } from './slides.js'
import { plan } from './plan.js'

export default {
  meta: {
    course: 'y7-science',
    unit: '3.6',
    id: 'U03_6',
    title: 'Changes in Energy',
    subtitle: 'Change it, draw it, follow it: events and processes, energy-change diagrams, and where the heat goes',
    objective:
      'Explain that when something happens — an event or a process — energy is changed or transferred; draw energy-change ' +
      'diagrams with boxes and arrows, including chains (a power station) and one box with two arrows (a television); give ' +
      'useful and dangerous energy changes; and say where thermal energy goes: from hotter things to colder things.',
    order: 20,
    french: true,
    vietnamese: false,
    // The self-study twin on the Dashboard (src/lib/dashboardLink.js).
    dashboard: { track: 'Y7_SCI', unit: 'U03_6' },
  },
  slides,
  plan,
}
