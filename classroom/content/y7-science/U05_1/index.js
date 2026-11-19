// content/y7-science/U05_1/index.js
// A lesson module: default-exports { meta, slides, plan }. The registry
// auto-discovers this file (content/<course>/<unit>/index.js).
//
// Science 5.1 Metals and non-metals, the first lesson of Unit 5 (Properties of
// materials), one period, 23 slides: a starter in words (find 5 metal things
// in this room), three goals (metals, non-metals, the right job), Mr Bowen's
// test bench (copper, iron and sulfur, one test a press), malleable and
// ductile, shiny and sonorous, a glass-bottle vote and the book's three
// warnings, Mr Bowen's all-metal pan, conductor and insulator, conduct →
// conductor, a magnet-and-can vote, magnetic and hard to melt, brittle, six
// non-metals at work, a left-or-right vote and 2.5's Periodic Table, Why This Material? with the whole
// class standing, the Item | Metal | Useful property table, 10 metals and 5
// non-metals, a summary and a checklist. Built from Learner's Book pages
// 151–156. English and French only, like every Year 7 deck from 15 October
// 2026.
import { slides } from './slides.js'
import { plan } from './plan.js'

export default {
  meta: {
    course: 'y7-science',
    unit: '5.1',
    id: 'U05_1',
    title: 'Metals and Non-metals',
    subtitle: 'Test, name and use: what metals can do, how non-metals are different, and the right material for a job',
    objective:
      'Describe the properties of metals (shiny, strong, malleable, ductile, sonorous, good conductors of heat and electricity, high melting points, some magnetic) and of non-metals (dull, brittle, insulators, many gases); ' +
      'choose a material for a job and give the property that makes it right; name ten metals and five non-metals.',
    order: 28,
    french: true,
    vietnamese: false,
  },
  slides,
  plan,
}
