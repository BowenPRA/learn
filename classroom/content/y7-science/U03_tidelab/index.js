// content/y7-science/U03_tidelab/index.js
// A lesson module: default-exports { meta, slides, plan }. The registry
// auto-discovers this file (content/<course>/<unit>/index.js).
//
// The River Tide Lab, after 3.4 Tides: a labelled bamboo pole in our river,
// read at 8:30, 10:30, 12:30 and 2:30 every school day from Thursday
// 29 October to Thursday 12 November 2026. One launch period on the shape of
// 3.4, plus the results table (slide 11) and graph (slide 14) that the class
// comes back to every day; the readings stay in this browser (lab.js).
// English and French only, like every Year 7 deck from 15 October 2026.
import { slides } from './slides.js'
import { plan } from './plan.js'

export default {
  meta: {
    course: 'y7-science',
    unit: '3.4 Lab',
    id: 'U03_TIDELAB',
    title: 'The River Tide Lab',
    subtitle: 'Two weeks of our river: read the pole, fill in the table, graph the tide',
    objective:
      'Read the water level on a marked pole accurately and on time; record 44 readings in a results table with the unit ' +
      'in the heading; describe a tide as coming in or going out; and use 3.4 to predict that high tide comes about ' +
      '50 minutes later each day and that the biggest tides come near the new moon, then test it on a line graph.',
    order: 21.5,
    french: true,
    vietnamese: false,
    // The self-study twin on the Dashboard (src/lib/dashboardLink.js): 3.4 Tides absorbs this lab.
    dashboard: { track: 'Y7_SCI', unit: 'U03_4' },
  },
  slides,
  plan,
}
