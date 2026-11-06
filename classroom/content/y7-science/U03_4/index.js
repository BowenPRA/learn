// content/y7-science/U03_4/index.js
// A lesson module: default-exports { meta, slides, plan }. The registry
// auto-discovers this file (content/<course>/<unit>/index.js).
//
// Science 3.4 Tides, one period, built on the shape of Coffee, Carbon and
// Stars: a starter question, three goals (the sea, the Moon, the Sun), a
// stepped model to say first, Mr Bowen's story, votes, a game for the whole
// class, and a checklist that ticks off the goals. English and French only,
// like every Year 7 deck from 15 October 2026.
import { slides } from './slides.js'
import { plan } from './plan.js'

export default {
  meta: {
    course: 'y7-science',
    unit: '3.4',
    id: 'U03_4',
    title: 'Tides',
    subtitle: 'The Moon pulls, the Earth spins, the Sun helps: why the sea goes up and down twice a day',
    objective:
      'Describe a tide and the tidal range; explain how the Moon’s tidal force stretches the oceans into two bulges, so a coast ' +
      'has two high tides and two low tides a day; explain why the biggest tides come at full moon and new moon; and give ' +
      'effects of tides on the sea and on the land.',
    order: 18,
    french: true,
    vietnamese: false,
    // The self-study twin on the Dashboard (src/lib/dashboardLink.js).
    dashboard: { track: 'Y7_SCI', unit: 'U03_4' },
  },
  slides,
  plan,
}
