// The words and colours of Find It, Say Why's stage panel (AngleSumStage.jsx),
// kept apart so that file exports components only.
export const INK = '#5c2483';

export const ST = {
  en: {
    stages: { first: 'Which first', decide: 'Which fact', add: 'Add', subtract: 'Take away', share: 'Share', calc: 'Opposite', why: 'Say why', total: 'Add', quick: 'Answer' },
    first: 'Which letter can you find first?', firstSub: 'Choose the letter that is the only angle you do not know in its fact.',
    findAll: (ls) => `Find ${ls.length > 1 ? `${ls.slice(0, -1).join(', ')} and ${ls[ls.length - 1]}` : ls[0]}`,
    decide: (L) => `Which fact finds ${L}?`,
    add: 'Add the angles you know.', addFig: 'Tap each angle you know in the picture (a small square is 90°).',
    addChips: 'Tap each angle you know.', tapFirst: 'tap the angles',
    subtract: (S, T) => `Take ${S}° away from ${T}°.`,
    share: (R, n) => `Share ${R}° between the ${n} equal angles.`,
    calc: (L, v) => `${L} is opposite the ${v}° corner. How big is ${L}?`,
    why: 'Finish the sentence.',
    total: 'Add the angles at the point.', straight: 'Is XY a straight line?', straightWhy: 'Choose the answer.',
    quick: (L) => `Work out ${L}, and say why.`, quickSub: 'A wrong answer opens the steps.',
    because: 'because', small: 'small square', working: 'Your working',
  },
  fr: {
    stages: { first: 'Lequel d’abord', decide: 'Quelle propriété', add: 'Additionne', subtract: 'Soustrais', share: 'Partage', calc: 'Opposé', why: 'Justifie', total: 'Additionne', quick: 'Réponse' },
    first: 'Quelle lettre peux-tu trouver d’abord ?', firstSub: 'Choisis la lettre qui est le seul angle inconnu de sa propriété.',
    findAll: (ls) => `Trouve ${ls.length > 1 ? `${ls.slice(0, -1).join(', ')} et ${ls[ls.length - 1]}` : ls[0]}`,
    decide: (L) => `Quelle propriété donne ${L} ?`,
    add: 'Additionne les angles que tu connais.', addFig: 'Touche sur le dessin chaque angle que tu connais (un petit carré fait 90°).',
    addChips: 'Touche chaque angle que tu connais.', tapFirst: 'touche les angles',
    subtract: (S, T) => `Enlève ${S}° de ${T}°.`,
    share: (R, n) => `Partage ${R}° entre les ${n} angles égaux.`,
    calc: (L, v) => `${L} est opposé au coin de ${v}°. Combien mesure ${L} ?`,
    why: 'Termine la phrase.',
    total: 'Additionne les angles au point.', straight: 'XY est-elle une ligne droite ?', straightWhy: 'Choisis la réponse.',
    quick: (L) => `Calcule ${L}, et dis pourquoi.`, quickSub: 'Une réponse fausse ouvre les étapes.',
    because: 'car', small: 'petit carré', working: 'Ton travail',
  },
};
