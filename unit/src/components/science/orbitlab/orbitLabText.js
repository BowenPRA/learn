// The Orbit Lab screen's own words, English and French (ORBIT_LAB, Y7
// Science 3.3). The pictures' words, the slips and the reasons are the
// engine's tables (utils/orbitLabData.js, utils/orbitLabSets.js).
import { fill, sayOf } from '../../../utils/orbitLab';
import { PULL_SCENES, SPEED_REASONS, FORCE_CHIPS } from '../../../utils/orbitLabData';
import { PATTERNS } from '../../../utils/orbitLabSets';

export const T = {
  en: {
    title: 'Orbit Lab',
    check: 'Check', stuck: 'Show me', next: 'Next', finish: 'Finish', level: 'Level', solved: 'done',
    clean: 'Right first time.',
    slipped: 'Done: one wrong turn, and you found the way.',
    helped: 'Done, with some help.',
    heads: { pull: 'Draw the arrows', graph: 'Find the pattern', coast: 'What slows it down?' },
    stages: { pull: 'Pull', path: 'Let go', why: 'Why?', both: 'Both arrows', draw: 'Draw', pattern: 'Pattern', predict: 'Predict', forces: 'Forces', speed: 'Speed', coastBoth: 'Both' },
    pull: 'Which way does {force} pull {obj}? Tap an arrow.',
    pullHint: 'Look at where the pull comes from.',
    path: '{release} Which way does {obj} go? Tap an arrow.',
    pathHint: 'The arrows on the orbit show which way it is moving.',
    why: 'Why does it go that way?',
    both: 'Tap two arrows: first the pull of {force} (red), then the way {obj} goes if the pull stops (blue).',
    placePull: 'Pull', placePath: 'No pull',
    draw: 'Draw the bar graph. Drag each bar up to its speed, or tap a bar and use ▲ ▼.',
    scale: 'One big square = {per} km/s. Each small line = 1 km/s.',
    given: 'drawn for you', bar: 'Bar:',
    patternLead: 'As the distance from {centre} increases, the speed of orbit…',
    graphWhy: 'Why?',
    predictAbout: 'about {v} km/s',
    predictEnd: 'Predict its speed.',
    forces: 'Which forces act against its movement? Tap every one, or Nothing.',
    speed: 'What happens to its speed, and why?',
    movement: 'movement',
    rightArrow: 'Right.', rightChoice: 'Right.', rightGraph: 'Right: every bar is the right height.', rightForces: 'Right.', rightCoast: 'Right, both of them.',
    filled: 'It is filled in for you.',
    shown: 'Here it is. Read it, then carry on.',
    rule: 'The rule', pattern: 'The pattern', because: 'because',
    ruleWithout: '{without}, {obj} goes straight on, the way it was moving.',
    rulePull: '{Force} pulls {obj} {toward}.',
    noItems: 'No questions yet', back: 'Return to Dashboard',
  },
  fr: {
    title: 'Labo des orbites',
    check: 'Vérifier', stuck: 'Montre-moi', next: 'Suivant', finish: 'Terminer', level: 'Niveau', solved: 'faits',
    clean: 'Juste du premier coup.',
    slipped: 'Fait : une erreur, et tu as trouvé le chemin.',
    helped: 'Fait, avec un peu d’aide.',
    heads: { pull: 'Trace les flèches', graph: 'Trouve la tendance', coast: 'Qu’est-ce qui le ralentit ?' },
    stages: { pull: 'Attraction', path: 'Lâcher', why: 'Pourquoi ?', both: 'Deux flèches', draw: 'Tracer', pattern: 'Tendance', predict: 'Prédire', forces: 'Forces', speed: 'Vitesse', coastBoth: 'Les deux' },
    pull: 'Dans quel sens {force} tire-t-elle {obj} ? Touche une flèche.',
    pullHint: 'Regarde d’où vient l’attraction.',
    path: '{release} Par où part {obj} ? Touche une flèche.',
    pathHint: 'Les flèches sur l’orbite montrent le sens du mouvement.',
    why: 'Pourquoi dans ce sens ?',
    both: 'Touche deux flèches : d’abord le sens où tire {force} (rouge), puis le sens où part {obj} si l’attraction s’arrête (bleu).',
    placePull: 'Attraction', placePath: 'Sans attraction',
    draw: 'Trace le diagramme en barres. Tire chaque barre jusqu’à sa vitesse, ou touche une barre et utilise ▲ ▼.',
    scale: 'Un grand carreau = {per} km/s. Chaque petite ligne = 1 km/s.',
    given: 'déjà tracée', bar: 'Barre :',
    patternLead: 'Quand la distance {centre} augmente, la vitesse en orbite…',
    graphWhy: 'Pourquoi ?',
    predictAbout: 'environ {v} km/s',
    predictEnd: 'Prédis sa vitesse.',
    forces: 'Quelles forces agissent contre son mouvement ? Touche-les toutes, ou Rien.',
    speed: 'Que devient sa vitesse, et pourquoi ?',
    movement: 'mouvement',
    rightArrow: 'Juste.', rightChoice: 'Juste.', rightGraph: 'Juste : chaque barre a la bonne hauteur.', rightForces: 'Juste.', rightCoast: 'Juste, les deux.',
    filled: 'C’est rempli pour toi.',
    shown: 'Le voici. Lis-le, puis continue.',
    rule: 'La règle', pattern: 'La tendance', because: 'parce que',
    ruleWithout: '{without}, {obj} continue tout droit, dans le même sens qu’avant.',
    rulePull: '{Force} tire {obj} {toward}.',
    noItems: 'Pas encore de questions', back: 'Retour au tableau de bord',
  },
};

/** A line of T, filled with the round's words, in the screen's language. */
export function say(lang, key, words = {}) {
  const t = T[lang] || T.en;
  return fill(t[key], words, lang === 'fr' ? 'fr' : 'en');
}

/** The pull picture's words, with what happens when the pull stops. */
export function pullSayWords(m) {
  return { ...m.words, release: PULL_SCENES[m.scene].release };
}

/** The graph's centre, in the form each sentence wants. */
export function centreWords(m, lang) {
  return { centre: lang === 'fr' ? m.centre.distFr : m.centre.en };
}

/** The prediction's question, built from its two neighbours. */
export function predictQuestion(m, lang) {
  const p = m.predict;
  const a = sayOf(p.above);
  const b = sayOf(p.below);
  if (lang === 'fr') {
    const vowel = (s) => /^[aeiouyéèêhAEIOUYÉ]/.test(s);
    const que = (s) => (vowel(s) ? `qu’${s}` : `que ${s}`);
    const lead = p.of ? `${p.fr} est ${p.of.fr}. ${p.pronFr} est` : `${p.fr} est`;
    return `${lead} plus loin ${m.centre.fromFr} ${que(a.fr)}, mais plus proche ${que(b.fr)}. ${T.fr.predictEnd}`;
  }
  const lead = p.of ? `${p.en} is ${p.of.en}. It is` : `${p.en} is`;
  return `${lead} further from ${m.centre.en} than ${a.en}, but closer than ${b.en}. ${T.en.predictEnd}`;
}

const pickL = (lang, o) => (lang === 'fr' ? o.fr || o.en : o.en);

/** The rule an item ends on, as one or two sentences. */
export function ruleLines(m, lang) {
  const L = lang === 'fr' ? 'fr' : 'en';
  if (m.kind === 'pull') {
    const lines = [fill(T[L].rulePull, m.words, L)];
    if (m.ask.includes('path')) lines.push(fill(T[L].ruleWithout, m.words, L));
    return lines;
  }
  if (m.kind === 'graph') {
    const lead = say(L, 'patternLead', centreWords(m, L)).replace(/…$/, '');
    return [`${lead} ${pickL(L, PATTERNS.down)}.`, pickL(L, m.reasonTable[0])];
  }
  const right = Object.values(SPEED_REASONS[m.where]).find((r) => r.ok);
  const against = m.answer.includes('none') ? pickL(L, FORCE_CHIPS.none) : m.answer.map((f) => pickL(L, FORCE_CHIPS[f])).join(' + ');
  return [L === 'fr' ? `Contre son mouvement : ${against}.` : `Against its movement: ${against}.`, pickL(L, right)];
}
