// The subject's colour on the unit and course pages, as on the Dashboard: maths orange,
// science green (src/data/subjects.js holds them, for the home pages too). `face` and
// `edge` are a banner's colour and the darker edge under it, `ink` the colour of text on white.
import { splitClass, subjectLook } from '../../src/data/subjects.js'

/** The theme of a class key ('math:Year 7'). */
export const themeOf = (classKey) => subjectLook(splitClass(classKey)[0])
