// src/data/Y7_MATH/U07_1/data.js
// Maths 7.1 Ordering fractions (Bowen, 20 November 2026: "base this a lot on the
// workbook problems"). Five tasks (src/data/units.js): the lesson notes; Mixed ↔
// improper and Which is bigger?, step sets in the Workbook's question types
// (unit/content/Y7_MATH/U07_1/); Fractions to decimals, the Bus Stop task on an open
// board; the quiz. Every number is new: no Workbook question is copied.
//
// English and French only (meta.vietnamese: false), like the classroom deck.
// Module properties written in full (`notes: notes,`), as in 5.3.
import { notes } from './notes.js';
import { assessment } from './assessment.js';

export const U07_1_DATA = {
  meta: {
    id: 'U07_1',
    title: 'Ordering Fractions',
    desc: 'Equivalent fractions; improper fractions and mixed numbers, both ways; which fraction is bigger (change it first, then a common denominator); fractions as decimals by bus stop division; order of size.',
    track: 'Y7_MATH',
    icon: 'LayoutGrid',
    vietnamese: false,
    audio: false,
    classroom: [{ course: 'y7-math', slug: 'U07_1a', title: 'Maths 7.1 · Fractions and Mixed Numbers' }],
  },

  // The Workbook's 7.1 key words and the words its questions are written in. Not a
  // task in this unit (Bowen chose the five tasks); the Arcade quizzes on them.
  realWords: [
    {
      word: 'Equivalent fractions', fr: 'Fractions équivalentes',
      def: 'Fractions that show the same amount, like 1/2 and 3/6.',
      frDef: 'Des fractions qui montrent la même quantité, comme 1/2 et 3/6.',
      sent: 'Multiply the top and the bottom by 3 to make an equivalent fraction.',
      frSent: 'Multiplie le haut et le bas par 3 pour faire une fraction équivalente.',
      isReal: true,
    },
    {
      word: 'Improper fraction', fr: 'Fraction impropre',
      def: 'A fraction whose top number is bigger than its bottom number, like 7/3.',
      frDef: 'Une fraction dont le nombre du haut est plus grand que celui du bas, comme 7/3.',
      sent: 'An improper fraction is more than one whole.',
      frSent: 'Une fraction impropre vaut plus d’un entier.',
      isReal: true,
    },
    {
      word: 'Mixed number', fr: 'Nombre mixte',
      def: 'A whole number and a fraction together, like 2 1/3.',
      frDef: 'Un nombre entier et une fraction ensemble, comme 2 1/3.',
      sent: 'Write 7/3 as a mixed number: 2 1/3.',
      frSent: 'Écris 7/3 en nombre mixte : 2 1/3.',
      isReal: true,
    },
    {
      word: 'Common denominator', fr: 'Dénominateur commun',
      def: 'The same bottom number for two fractions, so they can be compared.',
      frDef: 'Le même nombre en bas pour deux fractions, pour pouvoir les comparer.',
      sent: '10 is a common denominator for 1/2 and 2/5.',
      frSent: '10 est un dénominateur commun pour 1/2 et 2/5.',
      isReal: true,
    },
    {
      word: 'Remainder', fr: 'Reste',
      def: 'What is left over after dividing.',
      frDef: 'Ce qui reste après une division.',
      sent: '17 ÷ 5 = 3 remainder 2.',
      frSent: '17 ÷ 5 = 3 reste 2.',
      isReal: true,
    },
    {
      word: 'Order of size', fr: 'Ordre de grandeur',
      def: 'A list from the smallest to the largest, or the largest to the smallest.',
      frDef: 'Une liste du plus petit au plus grand, ou du plus grand au plus petit.',
      sent: 'Write the decimals in order of size, starting with the smallest.',
      frSent: 'Range les décimaux par ordre de grandeur, en commençant par le plus petit.',
      isReal: true,
    },
  ],

  notes: notes,
  assessment: assessment,

  // Fractions to decimals (the Bus Stop task, unit/src/tasks/ShortDivision.jsx): the
  // whole fraction divided on the bus stop (13 ÷ 8), not split into a mixed number
  // first. Redesigned 20 November 2026 (Bowen: "I don't like the initial intros as they
  // will just do spam clicks. it looks over scaffolded"): no worked examples to press
  // through and no times table; the whole bus stop is open from the first problem, with
  // help only on request or after a mistake. New ids (the first design's w1–r2 were
  // live a few hours). The how-to is the notes' slide 14.
  //   1 Tops smaller than the bottom   0.25, 0.625, 0.6, 0.875
  //   2 Bigger tops                    1.75, 2.4, 1.625, 3.625
  //   3 Decimals that never stop       rounded to 3 decimal places
  shortDiv: {
    title: 'Fractions to decimals',
    titleFr: 'Fractions en décimaux',
    levels: {
      1: { en: 'The top is smaller than the bottom', fr: 'Le haut est plus petit que le bas' },
      2: { en: 'Bigger tops', fr: 'Des hauts plus grands' },
      3: { en: 'Decimals that never stop', fr: 'Des décimaux sans fin' },
    },
    items: [
      { id: 'd1', level: 1, fraction: true, dividend: '1', divisor: 4 },
      { id: 'd2', level: 1, fraction: true, dividend: '5', divisor: 8 },
      { id: 'd3', level: 1, fraction: true, dividend: '3', divisor: 5 },
      { id: 'd4', level: 1, fraction: true, dividend: '7', divisor: 8 },
      { id: 'd5', level: 2, fraction: true, dividend: '7', divisor: 4 },
      { id: 'd6', level: 2, fraction: true, dividend: '12', divisor: 5 },
      { id: 'd7', level: 2, fraction: true, dividend: '13', divisor: 8 },
      { id: 'd8', level: 2, fraction: true, dividend: '29', divisor: 8 },
      { id: 'd9', level: 3, fraction: true, dividend: '2', divisor: 3, dp: 3 },
      { id: 'd10', level: 3, fraction: true, dividend: '10', divisor: 7, dp: 3 },
    ],
  },
};
