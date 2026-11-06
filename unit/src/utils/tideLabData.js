/**
 * Tide Lab (TIDE_LAB, Y7 Science 3.4) — the engine's words, English and French:
 * times, days, the Moon's phases, the verdicts, the two reason banks and every
 * named slip. utils/tideLab.js derives the rounds and picks from these tables;
 * utils/tideLabCheck.js proves every entry has its French.
 */

// The lab's four readings a day: the class reads the clock as 8:30 … 2:30.
export const SLOTS = [
  { h: 8.5, en: '8:30', fr: '8 h 30' },
  { h: 10.5, en: '10:30', fr: '10 h 30' },
  { h: 12.5, en: '12:30', fr: '12 h 30' },
  { h: 14.5, en: '2:30', fr: '14 h 30' },
];

export const DAYS = [
  { en: 'Mon', fr: 'lun.', long: 'Monday', longFr: 'lundi' },
  { en: 'Tue', fr: 'mar.', long: 'Tuesday', longFr: 'mardi' },
  { en: 'Wed', fr: 'mer.', long: 'Wednesday', longFr: 'mercredi' },
  { en: 'Thu', fr: 'jeu.', long: 'Thursday', longFr: 'jeudi' },
  { en: 'Fri', fr: 'ven.', long: 'Friday', longFr: 'vendredi' },
];

export const MOONS = {
  new: { en: 'New moon', fr: 'Nouvelle lune' },
  half: { en: 'Half moon', fr: 'Demi-lune' },
  full: { en: 'Full moon', fr: 'Pleine lune' },
};
export const MOON_IDS = ['new', 'half', 'full'];

export const DIRS = {
  in: { en: 'Coming in (going up)', fr: 'Elle monte (coming in)' },
  out: { en: 'Going out (going down)', fr: 'Elle descend (going out)' },
};

export const VERDICTS = {
  supports: { en: 'It supports the prediction', fr: 'Elles confirment la prédiction' },
  contradicts: { en: 'It contradicts the prediction', fr: 'Elles contredisent la prédiction' },
  proves: { en: 'It proves the prediction is true for every river', fr: 'Elles prouvent que la prédiction est vraie pour toutes les rivières' },
};
export const VERDICT_IDS = ['supports', 'contradicts', 'proves'];

export const PREDICTIONS = {
  later: { en: 'Prediction 1: high tide comes about 50 minutes later every day.', fr: 'Prédiction 1 : la marée haute arrive environ 50 minutes plus tard chaque jour.' },
  biggest: { en: 'Prediction 2: the tides are biggest near new moon and full moon.', fr: 'Prédiction 2 : les marées sont les plus grandes vers la nouvelle lune et la pleine lune.' },
};

// Why does a prediction come true? The right reason, and the traps that sound
// right to a Year 7 student, each with why it is wrong.
export const REASONS = {
  later: {
    right: {
      id: 'moon',
      en: 'The Moon moves on along its orbit every day, so the Earth must turn a little more to face it again.',
      fr: 'La Lune avance sur son orbite chaque jour, donc la Terre doit tourner un peu plus pour être de nouveau face à elle.',
    },
    traps: [
      { id: 'slowspin', en: 'The Earth spins a little more slowly every day.', fr: 'La Terre tourne un peu plus lentement chaque jour.',
        why: 'The Earth turns once every 24 hours, every day. It is the Moon that moves on.',
        whyFr: 'La Terre fait un tour toutes les 24 heures, chaque jour. C’est la Lune qui avance.' },
      { id: 'sunback', en: 'The Sun holds the water back a little more every day.', fr: 'Le Soleil retient l’eau un peu plus chaque jour.',
        why: 'The Sun does not make the tide late. High tide follows the Moon, and the Moon moves on round its orbit.',
        whyFr: 'Le Soleil ne retarde pas la marée. La marée haute suit la Lune, et la Lune avance sur son orbite.' },
      { id: 'river', en: 'The river flows a little more slowly every day.', fr: 'La rivière coule un peu plus lentement chaque jour.',
        why: 'The river does not make the tide late every day. The tide follows the Moon, at the coast and in the river.',
        whyFr: 'La rivière ne retarde pas la marée chaque jour. La marée suit la Lune, sur la côte comme dans la rivière.' },
    ],
  },
  biggest: {
    right: {
      id: 'inline',
      en: 'The Sun, the Moon and the Earth are in a line, so the Sun’s tide adds to the Moon’s.',
      fr: 'Le Soleil, la Lune et la Terre sont alignés, donc la marée du Soleil s’ajoute à celle de la Lune.',
    },
    traps: [
      { id: 'closer', en: 'The Moon is closer to the Earth at full moon.', fr: 'La Lune est plus proche de la Terre à la pleine lune.',
        why: 'The Moon is about the same distance away all month. What changes is where it is compared with the Sun.',
        whyFr: 'La Lune est à peu près à la même distance tout le mois. Ce qui change, c’est sa place par rapport au Soleil.' },
      { id: 'stronger', en: 'A new moon has stronger gravity.', fr: 'Une nouvelle lune a une gravité plus forte.',
        why: 'The Moon’s gravity does not change with its shape. The shape is only how much of its lit side we can see.',
        whyFr: 'La gravité de la Lune ne change pas avec sa forme. La forme, c’est seulement la partie éclairée que l’on voit.' },
      { id: 'sunharder', en: 'The Sun pulls harder at new moon.', fr: 'Le Soleil tire plus fort à la nouvelle lune.',
        why: 'The Sun pulls the same all month. At new moon and full moon its tide lines up with the Moon’s, so they add.',
        whyFr: 'Le Soleil tire pareil tout le mois. À la nouvelle et à la pleine lune, sa marée s’aligne avec celle de la Lune, donc elles s’ajoutent.' },
      { id: 'seeit', en: 'We can see the full moon, so it pulls more.', fr: 'On voit la pleine lune, donc elle tire plus.',
        why: 'Seeing the Moon does not change its pull: the new moon, which we cannot see, makes big tides too.',
        whyFr: 'Voir la Lune ne change pas son attraction : la nouvelle lune, qu’on ne voit pas, fait aussi de grandes marées.' },
    ],
  },
};
