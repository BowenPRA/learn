// The subject's colour on the unit and course pages, as on the Dashboard: maths orange,
// science green. `face` and `edge` are a banner's colour and the darker edge under it,
// `ink` the colour of text on white.
import { splitClass } from '../../src/data/subjects.js'

const THEMES = {
  math: { face: '#f97316', edge: '#c2410c', ink: '#ea580c' },
  science: { face: '#10b981', edge: '#047857', ink: '#059669' },
  other: { face: '#0ea5e9', edge: '#0369a1', ink: '#0284c7' },
}

/** The theme of a class key ('math:Year 7'). */
export const themeOf = (classKey) => THEMES[splitClass(classKey)[0]] || THEMES.other
