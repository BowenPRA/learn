// src/data/Y7_SCI/U03_4/tideLab.js
// Tide Lab (TIDE_LAB, p88): the River Tide Lab, at home. Twelve items, six
// levels. Every river is new each attempt (utils/tideLab.js); the stage lists
// are where the scaffold fades — levels 1–2 walk every stage, later items take
// two or three actions. Plan: docs/y7-science/plans/U03_4.md.
export const tideLab = {
  title: 'Tide Lab',
  titleFr: 'Le labo des marées',
  intro: 'The River Tide Lab, at home: read the pole, graph a day, then test the two predictions from 3.4 on a river’s readings. Every river is new each time.',
  introFr: 'L’expérience de la rivière, à la maison : lis la perche, trace une journée, puis teste les deux prédictions de 3.4 sur les mesures d’une rivière. La rivière change à chaque fois.',
  levels: {
    1: { en: 'Read the pole', fr: 'Lis la perche' },
    2: { en: 'Between the marks, and a graph', fr: 'Entre les traits, et un graphique' },
    3: { en: 'A day’s tide', fr: 'La marée d’une journée' },
    4: { en: 'Waves, and the end of the day', fr: 'Des vagues, et la fin de la journée' },
    5: { en: 'Prediction 1: about 50 minutes later', fr: 'Prédiction 1 : environ 50 minutes plus tard' },
    6: { en: 'Prediction 2: the biggest tides', fr: 'Prédiction 2 : les plus grandes marées' },
  },
  items: [
    { id: 'p1', level: 1, kind: 'pole', mark: 'numbered' },
    { id: 'p2', level: 1, kind: 'pole', mark: 'unnumbered' },
    { id: 'p3', level: 2, kind: 'pole', mark: 'half' },
    { id: 'd1', level: 2, kind: 'day', stages: ['plot', 'inout', 'highest'] },
    { id: 'd2', level: 3, kind: 'day', stages: ['inout', 'highest', 'change'] },
    { id: 'd3', level: 3, kind: 'day', stages: ['highest', 'change'] },
    { id: 'p4', level: 4, kind: 'pole', mark: 'waves' },
    { id: 'd4', level: 4, kind: 'day', stages: ['change', 'inout'], pair: 'end' },
    { id: 'l1', level: 5, kind: 'later', stages: ['tomorrow', 'test', 'verdict', 'why'] },
    { id: 'l2', level: 5, kind: 'later', stages: ['test', 'why'] },
    { id: 'b1', level: 6, kind: 'biggest', stages: ['change', 'week', 'moon', 'verdict', 'why'] },
    { id: 'b2', level: 6, kind: 'biggest', stages: ['week', 'why'] },
  ],
};
