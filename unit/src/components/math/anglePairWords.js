/**
 * The words of X, F or Z? (Year 7 Maths 5.2) in English and French, and the two
 * helpers that build the question and the stage heading from an item's model.
 * Shared by tasks/AnglePairs.jsx and notes/AnglePairActivity.jsx.
 */
const ASK = {
  opp: ['vertically opposite', 'opposé par le sommet'],
  corr: ['corresponding', 'correspondant'],
  alt: ['alternate', 'alterne-interne'],
};
export const AP_T = {
  en: {
    title: 'X, F or Z?',
    stages: { tap: 'Tap', pair: 'Name the pair', size: 'Size', stone: 'First angle', stoneSize: 'First angle', line: 'Which line', convert: 'Same place', reason: 'Why' },
    spot: (ask, g) => `Tap the angle that is ${ASK[ask][0]} to the ${g}°.`,
    find: (ls) => (ls.length === 1 ? `Find ${ls[0]}. Give a reason.` : `Find ${ls[0]} and ${ls[1]}. Give a reason for each.`),
    steps: (z) => `Find ${z}. You can’t get there in one step.`,
    which: 'Which line is not parallel to the other two?',
    tap: 'Tap the angle in the picture.',
    pair: (a, b) => `${a} and ${b}: which pair are they?`,
    size: (l) => `How big is ${l}?`, sizeSub: 'Type the size in degrees.', sameAs: (v) => `the same size as ${v}°`,
    tapTitle: 'Tap the angle', tapHint: 'Tap it in the picture.', lineHint: 'Tap the line in the picture.', whichTitle: 'Which line is not parallel?',
    how: ['Name the pair', 'Find the size', 'Write it with “because”'],
    stone: (z) => `Tap an angle you can find first, on the way to ${z}.`,
    stoneSize: 'How big is w, the angle you tapped?',
    line: 'Tap the line that is not parallel to the other two.',
    convert: (n) => `Move line ${n}’s angle to the same place as the others’. How big is it there?`,
    reason: 'Why is it not parallel?',
    reasons: { same: 'Its angle in the same place is different', perp: 'It does not meet the line across at 90°', eye: 'It looks tilted' },
    write: 'Write it like this', check: 'Check', stuck: 'Show me', next: 'Next', finish: 'Finish',
    clean: 'Seen it, first time.', slipped: 'Done — one wrong turn, and you found it yourself.', helped: 'Done — with a step shown to you.',
    level: 'Level', solved: 'done', tryAgain: 'Try again', noItems: 'No questions yet', back: 'Return to Dashboard',
  },
  fr: {
    title: 'X, F ou Z ?',
    stages: { tap: 'Touche', pair: 'Nomme la paire', size: 'Taille', stone: 'Premier angle', stoneSize: 'Premier angle', line: 'Quelle droite', convert: 'Même place', reason: 'Pourquoi' },
    spot: (ask, g) => `Touche l’angle ${ASK[ask][1]} à l’angle de ${g}°.`,
    find: (ls) => (ls.length === 1 ? `Trouve ${ls[0]}. Donne une raison.` : `Trouve ${ls[0]} et ${ls[1]}. Donne une raison pour chacun.`),
    steps: (z) => `Trouve ${z}. On n’y arrive pas en une étape.`,
    which: 'Quelle droite n’est pas parallèle aux deux autres ?',
    tap: 'Touche l’angle sur le dessin.',
    pair: (a, b) => `${a} et ${b} : quelle paire forment-ils ?`,
    size: (l) => `Combien mesure ${l} ?`, sizeSub: 'Écris la taille en degrés.', sameAs: (v) => `la même taille que ${v}°`,
    tapTitle: 'Touche l’angle', tapHint: 'Touche-le sur le dessin.', lineHint: 'Touche la droite sur le dessin.', whichTitle: 'Quelle droite n’est pas parallèle ?',
    how: ['Nomme la paire', 'Trouve la taille', 'Écris-le avec « because »'],
    stone: (z) => `Touche un angle que tu peux trouver d’abord, sur le chemin de ${z}.`,
    stoneSize: 'Combien mesure w, l’angle que tu as touché ?',
    line: 'Touche la droite qui n’est pas parallèle aux deux autres.',
    convert: (n) => `Ramène l’angle de la droite ${n} à la même place que les autres. Combien mesure-t-il là ?`,
    reason: 'Pourquoi n’est-elle pas parallèle ?',
    reasons: { same: 'Son angle à la même place est différent', perp: 'Elle ne fait pas 90° avec la sécante', eye: 'Elle a l’air penchée' },
    write: 'Écris-le comme ceci', check: 'Vérifier', stuck: 'Montre-moi', next: 'Suivant', finish: 'Terminer',
    clean: 'Vu du premier coup.', slipped: 'Fini — une erreur, et tu l’as trouvée toi-même.', helped: 'Fini — avec une étape montrée.',
    level: 'Niveau', solved: 'faites', tryAgain: 'Réessaie', noItems: 'Pas encore de questions', back: 'Retour au tableau de bord',
  },
};
export const apT = (lang) => AP_T[lang] || AP_T.en;

/** The question an item asks, in words. */
export function questionOf(m, lang, context) {
  const t = apT(lang);
  if (m.kind === 'spot') return t.spot(m.ask, m.given.size);
  if (m.kind === 'find') return t.find(m.targets.map((x) => x.letter));
  if (m.kind === 'steps') return t.steps(m.target.letter);
  return [context, t.which].filter(Boolean).join(' ');
}

/** The heading of the current stage. */
export function stageTitle(run, lang) {
  const t = apT(lang);
  const { m, kind, target, convertLine } = run;
  if (kind === 'tap') return t.tap;
  if (kind === 'pair') return t.pair(target.letter, m.kind === 'steps' ? 'w' : `${m.given.size}°`);
  if (kind === 'size') return t.size(target.letter);
  if (kind === 'stone') return t.stone(m.target.letter);
  if (kind === 'stoneSize') return t.stoneSize;
  if (kind === 'line') return t.line;
  if (kind === 'convert') return t.convert(m.lines[convertLine].name);
  return t.reason;
}
