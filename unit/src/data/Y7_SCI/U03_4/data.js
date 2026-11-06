// src/data/Y7_SCI/U03_4/data.js
// 3.4 Tides — Year 7 Science self-study unit. Two classroom decks reduced to
// ONE (pairing rule 10): y7-science/U03_4 (Learner's Book pp. 97–104) and
// y7-science/U03_tidelab (The River Tide Lab, launched 29 October 2026).
// Plan: docs/y7-science/plans/U03_4.md.
//
// The leaner shape (October 2026): the interactive deck, the key words, ONE
// flagship task — Tide Lab (TIDE_LAB, p88), the lab done at home and marked:
// read the pole, graph a day, and test 3.4's two predictions on a river the
// Moon model makes fresh each time — four reasoning questions, the quiz and the
// arcade. 105 XP, capped at 100. English and French only (meta.vietnamese: false).
//
// Module properties written in full (`notes: notes,`) — a shorthand right after
// realWords makes the audio generator skip all word audio.
import { notes } from './notes.js';
import { assessment } from './assessment.js';
import { games } from './games.js';
import { tideLab } from './tideLab.js';

export const U03_4_DATA = {
  meta: {
    id: 'U03_4',
    title: 'Tides',
    desc: 'Why the sea goes up and down twice a day: the Moon pulls, the Earth spins, the Sun helps. Then our river: read the pole, graph a day, and test two predictions on its readings.',
    track: 'Y7_SCI',
    icon: 'Droplets',
    vietnamese: false,
    classroom: [
      { course: 'y7-science', slug: 'U03_4', title: 'Science 3.4 · Tides' },
      { course: 'y7-science', slug: 'U03_tidelab', title: 'Science 3.4 · The River Tide Lab' },
    ],
  },
  phases: [
    {
      id: 'concept',
      title: 'Phase 0: Lesson',
      threshold: 0,
      tasks: [
        { id: 'NOTES', dbKey: 'p10', maxXP: 25 },
        { id: 'WORD_REC', dbKey: 'p1', maxXP: 10 },
      ],
    },
    {
      // 25 of the 35 XP before it (71%): the deck alone opens practice.
      id: 'practice',
      title: 'Phase 1: Practice',
      threshold: 25,
      tasks: [
        { id: 'TIDE_LAB', dbKey: 'p88', maxXP: 30 },
        { id: 'SHORT_ANSWERS', dbKey: 'p6', maxXP: 20 },
      ],
    },
    {
      // The quiz gate is 65 of the 85 XP before it (76%), as in 3.2: with one
      // flagship task only 85 XP comes before the quiz, and the 80% rule
      // (phase-gate-80-percent-rule) needs at least 100 before an 80 gate.
      // Finishing is unchanged: 80+ XP with the quiz sat (isUnitComplete).
      id: 'mastery',
      title: 'Phase 2: Quiz & Arcade',
      threshold: 65,
      tasks: [
        { id: 'ASSESSMENT', dbKey: 'p9', maxXP: 20 },
        { id: 'GAMES', dbKey: 'p12', maxXP: 0 },
      ],
    },
  ],

  // Tide Lab (utils/tideLab.js): twelve items, six levels.
  tideLab: tideLab,

  // The words the explanations are written in: the book's key words (tide,
  // tidal range, tidal force, earth tide), the lab's (water level), and the
  // everyday words the English of the slides leans on.
  realWords: [
    {
      word: 'Tide', fr: 'Marée',
      def: 'The change in the depth of the sea during the day.',
      frDef: 'Le changement de profondeur de la mer pendant la journée.',
      sent: 'The tide covers the road to Holy Island twice a day.',
      frSent: 'La marée couvre la route de Holy Island deux fois par jour.',
      isReal: true,
    },
    {
      word: 'Depth', fr: 'Profondeur',
      def: 'How far it is from the top of the water to the bottom.',
      frDef: 'La distance entre le haut de l’eau et le fond.',
      sent: 'At high tide the depth of the water in the harbour is 6 metres.',
      frSent: 'À marée haute, la profondeur de l’eau dans le port est de 6 mètres.',
      isReal: true,
    },
    {
      word: 'Tidal range', fr: 'Marnage',
      def: 'The difference in depth between high tide and low tide.',
      frDef: 'La différence de profondeur entre la marée haute et la marée basse.',
      sent: 'The Bay of Fundy has the biggest tidal range in the world.',
      frSent: 'La baie de Fundy a le plus grand marnage du monde.',
      isReal: true,
    },
    {
      word: 'Harbour', fr: 'Port',
      def: 'A place by the sea where boats stay, load and unload.',
      frDef: 'Un endroit au bord de la mer où les bateaux restent, chargent et déchargent.',
      sent: 'Some harbours cannot be used at low tide.',
      frSent: 'Certains ports ne peuvent pas être utilisés à marée basse.',
      isReal: true,
    },
    {
      word: 'Tidal force', fr: 'Force de marée',
      def: 'The pull of the Moon’s gravity on the oceans.',
      frDef: 'L’attraction de la gravité de la Lune sur les océans.',
      sent: 'The Moon’s tidal force stretches the oceans into two bulges.',
      frSent: 'La force de marée de la Lune étire les océans en deux bosses.',
      isReal: true,
    },
    {
      word: 'Bulge', fr: 'Bosse',
      def: 'A place where something sticks out. Here: where the water piles up.',
      frDef: 'Un endroit qui dépasse. Ici : là où l’eau s’accumule.',
      sent: 'There is a bulge of water on the side of the Earth facing away from the Moon too.',
      frSent: 'Il y a aussi une bosse d’eau du côté de la Terre qui ne fait pas face à la Lune.',
      isReal: true,
    },
    {
      word: 'Earth tide', fr: 'Marée terrestre',
      def: 'The land going up and down because of tidal forces.',
      frDef: 'La terre qui monte et descend à cause des forces de marée.',
      sent: 'We do not feel the earth tide, because everything goes up together.',
      frSent: 'On ne sent pas la marée terrestre, parce que tout monte ensemble.',
      isReal: true,
    },
    {
      word: 'Water level', fr: 'Niveau de l’eau',
      def: 'How high the water is.',
      frDef: 'La hauteur de l’eau.',
      sent: 'We read the water level on the pole in centimetres.',
      frSent: 'On lit le niveau de l’eau sur la perche en centimètres.',
      isReal: true,
    },
    {
      word: 'New moon', fr: 'Nouvelle lune',
      def: 'When the Moon is between the Earth and the Sun, and we cannot see it.',
      frDef: 'Quand la Lune est entre la Terre et le Soleil, et qu’on ne la voit pas.',
      sent: 'The tides are big at new moon, even though we cannot see the Moon.',
      frSent: 'Les marées sont grandes à la nouvelle lune, même si on ne voit pas la Lune.',
      isReal: true,
    },
    {
      word: 'Full moon', fr: 'Pleine lune',
      def: 'When the Moon is on the far side of the Earth from the Sun, and all of it is lit up.',
      frDef: 'Quand la Lune est de l’autre côté de la Terre par rapport au Soleil, et qu’elle est toute éclairée.',
      sent: 'At full moon the Sun, the Moon and the Earth are in a line.',
      frSent: 'À la pleine lune, le Soleil, la Lune et la Terre sont alignés.',
      isReal: true,
    },
  ],

  // Four reasoning questions, marked on the mark scheme alone (no English
  // score): one tickable point per line, two lines each. Three are the
  // checklist's "explain" lines; the fourth is the book's Activity Q5.
  // Suggested words are vocabulary to use, never the answer.
  shortQA: [
    {
      id: 'sq1',
      question: 'Most coasts have two high tides a day. Explain why.',
      frTranslation: 'La plupart des côtes ont deux marées hautes par jour. Explique pourquoi.',
      suggestedWords: [['tidal force', 'gravity'], ['bulge'], ['spins', 'turns']],
      scienceMaxMarks: 2,
      markScheme: [
        '1 mark for saying the Moon’s gravity (tidal force) stretches the oceans into two bulges: one on the side facing the Moon and one on the far side.',
        '1 mark for saying the Earth spins once a day, so a coast passes through both bulges, giving two high tides a day.',
      ],
      modelAnswer: 'The Moon’s tidal force stretches the Earth, so the oceans make two bulges: one on the side facing the Moon and one on the far side. The Earth spins once a day, so every coast passes through both bulges. That gives two high tides a day.',
    },
    {
      id: 'sq2',
      question: 'The Sun pulls on the Earth much harder than the Moon does, but the Sun’s tides are smaller. Explain why.',
      frTranslation: 'Le Soleil tire sur la Terre beaucoup plus fort que la Lune, mais les marées du Soleil sont plus petites. Explique pourquoi.',
      suggestedWords: [['stretch', 'stretches'], ['distance', 'far'], ['tidal force']],
      scienceMaxMarks: 2,
      markScheme: [
        '1 mark for saying tides come from the stretch: the difference between the pull on the near side and on the far side of the Earth.',
        '1 mark for saying the Sun is much further away (about 390 times), so its pull is almost the same on both sides, and it stretches the Earth less.',
      ],
      modelAnswer: 'Tides do not come from the pull itself but from the stretch: the near side of the Earth is pulled more than the far side. The Sun is about 390 times further away than the Moon, so it pulls both sides of the Earth almost the same. It stretches the Earth less, so its tides are smaller.',
    },
    {
      id: 'sq3',
      question: 'Explain why the biggest tides come at new moon and at full moon.',
      frTranslation: 'Explique pourquoi les plus grandes marées arrivent à la nouvelle lune et à la pleine lune.',
      suggestedWords: [['line', 'lined up'], ['tidal range'], ['bulges']],
      scienceMaxMarks: 2,
      markScheme: [
        '1 mark for saying the Sun, the Moon and the Earth are in a line at new moon and at full moon.',
        '1 mark for saying the Sun’s tide then adds to the Moon’s (their bulges add up), so the high tides are higher and the tidal range is biggest.',
      ],
      modelAnswer: 'At new moon and at full moon, the Sun, the Moon and the Earth are in a line. Then the Sun’s bulges of water are in the same places as the Moon’s, so they add up. The high tides are higher and the low tides are lower: the tidal range is the biggest.',
    },
    {
      id: 'sq4',
      question: 'At a harbour, high tide is at 6 a.m. today. Explain why it will not be at 6 a.m. tomorrow.',
      frTranslation: 'Dans un port, la marée haute est à 6 h aujourd’hui. Explique pourquoi elle ne sera pas à 6 h demain.',
      suggestedWords: [['orbit'], ['spins', 'turns'], ['face', 'facing']],
      scienceMaxMarks: 2,
      markScheme: [
        '1 mark for saying the Moon moves along its orbit (the same way as the Earth spins) while the Earth turns once.',
        '1 mark for saying the Earth must turn a little more to face the Moon again, so high tide comes later, about 50 minutes later.',
      ],
      modelAnswer: 'While the Earth spins once in 24 hours, the Moon moves on a little along its orbit, the same way. So after one turn the harbour is not yet facing the Moon: the Earth has to turn a little more. High tide comes about 50 minutes later, at about 6:50 a.m.',
    },
  ],

  notes: notes,
  assessment: assessment,
  games: games,
};
