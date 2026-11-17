// A lesson module: default-exports { meta, slides, plan }. The registry
// auto-discovers this file (content/<course>/<unit>/index.js).
//
// 7.1 Ordering fractions, Part 1: Fractions and Mixed Numbers. The first
// section of Unit 7 Fractions, taught slowly over two periods at Mr Bowen's
// request (16 November 2026); this is the first. Numerator and denominator,
// saying fractions in English, equivalent fractions (multiply, never add), and
// improper fractions as mixed numbers and back. Part 2 (U07_1b, ordering) is
// the next period. English and French.
import { slides } from './slides.js'
import { plan } from './plan.js'

export default {
  meta: {
    course: 'y7-math',
    unit: '7.1a',
    id: 'U07_1a',
    title: 'Fractions and Mixed Numbers',
    subtitle: 'Say it, cut it, count the wholes: equivalent fractions, improper fractions and mixed numbers',
    objective:
      'Name the numerator and denominator and say a fraction in English; make equivalent fractions by multiplying or dividing the top and the bottom ' +
      'by the same number (never adding); change an improper fraction to a mixed number by dividing, and back by multiplying and adding; ' +
      'and compare an improper fraction with a mixed number by changing it first.',
    order: 22,
    french: true,
    vietnamese: false,
  },
  slides,
  plan,
}
