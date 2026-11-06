/**
 * Orbit Lab (ORBIT_LAB, Y7 Science 3.3 Movement in Space) — the tables for
 * the `pull` and `coast` kinds. The graph sets are in orbitLabSets.js; the
 * engine that derives every answer and slip from them is orbitLab.js.
 *
 * Words carry {placeholders} filled per scene by orbitLab.fill():
 *   {obj} {Obj}       the thing going round        "the Earth" / "The Earth"
 *   {force} {Force}   what pulls it                 "the Sun’s gravity"
 *   {toward}          "towards the Sun"   {awayFrom} "away from the Sun"
 *   {into}            "into the Sun"      {without}  "Without gravity"
 * English and French only (the unit is meta.vietnamese: false).
 */

// ── The things that go round (`pull`) ─────────────────────────────────────
export const ORBITERS = {
  earth: { en: 'the Earth', fr: 'la Terre', label: { en: 'Earth', fr: 'Terre' }, fill: '#4f8fbf' },
  mars: { en: 'Mars', fr: 'Mars', label: { en: 'Mars', fr: 'Mars' }, fill: '#d0643b' },
  venus: { en: 'Venus', fr: 'Vénus', label: { en: 'Venus', fr: 'Vénus' }, fill: '#e8c27a' },
  moon: { en: 'the Moon', fr: 'la Lune', label: { en: 'Moon', fr: 'Lune' }, fill: '#c9c9c9' },
  ball: { en: 'the ball', fr: 'la balle', label: { en: 'ball', fr: 'balle' }, fill: '#f08b82' },
  comet: { en: 'the comet', fr: 'la comète', label: { en: 'comet', fr: 'comète' }, fill: '#b9e3f5' },
  uranus: { en: 'Uranus', fr: 'Uranus', label: { en: 'Uranus', fr: 'Uranus' }, fill: '#9fd8e0' },
};

// ── The five pictures (`pull`) ────────────────────────────────────────────
// `orbiters`: who may go round in this picture. `traps`: the wrong reasons
// offered at Why (the ball is in a room, so "in space nothing slows it" does
// not apply to it). Neptune pulls Uranus outwards: only its Pull is asked.
const SUN_WORDS = {
  centre: { en: 'Sun', fr: 'Soleil' },
  force: { en: 'the Sun’s gravity', fr: 'la gravité du Soleil' },
  toward: { en: 'towards the Sun', fr: 'vers le Soleil' },
  awayFrom: { en: 'away from the Sun', fr: 'à l’opposé du Soleil' },
  into: { en: 'into the Sun', fr: 'sur le Soleil' },
  without: { en: 'Without gravity', fr: 'Sans gravité' },
  release: { en: 'Now the Sun’s gravity switches off.', fr: 'Maintenant, la gravité du Soleil s’arrête.' },
};
export const PULL_SCENES = {
  sun: { ...SUN_WORDS, shape: 'circle', orbiters: ['earth', 'mars', 'venus'], traps: ['fling', 'push', 'fall'] },
  comet: { ...SUN_WORDS, shape: 'comet', orbiters: ['comet'], traps: ['fling', 'push', 'fall'] },
  moon: {
    shape: 'circle', orbiters: ['moon'], traps: ['fling', 'push', 'fall'],
    centre: { en: 'Earth', fr: 'Terre' },
    force: { en: 'the Earth’s gravity', fr: 'la gravité de la Terre' },
    toward: { en: 'towards the Earth', fr: 'vers la Terre' },
    awayFrom: { en: 'away from the Earth', fr: 'à l’opposé de la Terre' },
    into: { en: 'onto the Earth', fr: 'sur la Terre' },
    without: { en: 'Without gravity', fr: 'Sans gravité' },
    release: { en: 'Now the Earth’s gravity switches off.', fr: 'Maintenant, la gravité de la Terre s’arrête.' },
  },
  string: {
    shape: 'circle', orbiters: ['ball'], traps: ['fling', 'fall'],
    centre: { en: 'hand', fr: 'main' },
    force: { en: 'the string', fr: 'la ficelle' },
    toward: { en: 'towards his hand', fr: 'vers sa main' },
    awayFrom: { en: 'away from his hand', fr: 'à l’opposé de sa main' },
    into: { en: 'back into his hand', fr: 'dans sa main' },
    without: { en: 'Without the string', fr: 'Sans la ficelle' },
    release: { en: 'Now Mr Bowen lets go of the string.', fr: 'Maintenant, M. Bowen lâche la ficelle.' },
  },
  neptune: {
    shape: 'neptune', orbiters: ['uranus'], traps: [], onlyPull: true,
    centre: { en: 'Sun', fr: 'Soleil' },
    force: { en: 'Neptune’s gravity', fr: 'la gravité de Neptune' },
    toward: { en: 'towards Neptune', fr: 'vers Neptune' },
    awayFrom: { en: 'away from Neptune', fr: 'à l’opposé de Neptune' },
    into: { en: 'into Neptune', fr: 'sur Neptune' },
    without: { en: 'Without gravity', fr: 'Sans gravité' },
    release: { en: '', fr: '' },
  },
};

// ── What each wrong arrow says (`pull`) ───────────────────────────────────
// Pull: the arrow for the pull of the force. Path: where it goes once the
// pull stops. Codes are derived from the geometry (orbitLab.arrowCodes).
export const PULL_SLIPS = {
  pull: {
    away: { en: 'That arrow points {awayFrom}. {Force} pulls {obj} {toward}.', fr: 'Cette flèche pointe {awayFrom}. {Force} tire {obj} {toward}.' },
    along: { en: 'That is the way {obj} is moving. {Force} does not push it round: it pulls {toward}.', fr: 'C’est le sens dans lequel avance {obj}. {Force} ne pousse pas {obj} en avant : elle tire {toward}.' },
    against: { en: 'That points backwards along the orbit. {Force} pulls {obj} {toward}.', fr: 'Cette flèche va en arrière sur l’orbite. {Force} tire {obj} {toward}.' },
    middle: { en: 'That points at the middle of the orbit. The pull comes from the Sun, so it points at the Sun, wherever the Sun is.', fr: 'Cette flèche vise le milieu de l’orbite. L’attraction vient du Soleil : elle vise donc le Soleil, où qu’il soit.' },
    sun: { en: 'That is the Sun’s pull. This question is about Neptune’s gravity: it pulls Uranus towards Neptune.', fr: 'Ça, c’est l’attraction du Soleil. La question porte sur la gravité de Neptune : elle tire Uranus vers Neptune.' },
    off: { en: 'Close, but not quite. {Force} pulls straight {toward}.', fr: 'Presque, mais pas tout à fait. {Force} tire tout droit {toward}.' },
  },
  path: {
    away: { en: 'Straight out, {awayFrom}? Nothing throws {obj} outwards. It goes straight on, the way it was moving.', fr: 'Tout droit, {awayFrom} ? Rien ne lance {obj} vers l’extérieur. {Obj} continue tout droit, dans le même sens qu’avant.' },
    inward: { en: '{without}, nothing pulls {obj} {toward} any more, so it cannot fall in.', fr: '{without}, plus rien ne tire {obj} {toward}, donc pas de chute.' },
    backwards: { en: 'That is backwards. Look at the arrows on the orbit: {obj} keeps going the way it was moving.', fr: 'C’est en arrière. Regarde les flèches sur l’orbite : {obj} continue dans le même sens qu’avant.' },
    off: { en: 'Not quite. {Obj} goes straight on, along the edge of its orbit, the way it was moving at that moment.', fr: 'Pas tout à fait. {Obj} continue tout droit, le long du bord de son orbite, dans le sens de son mouvement à ce moment-là.' },
  },
};

// ── Why does it go that way? (`pull`) ─────────────────────────────────────
export const PULL_REASONS = {
  keeps: {
    en: 'Nothing pulls {obj} {toward} any more, so it keeps going the way it was moving.',
    fr: 'Plus rien ne tire {obj} {toward} : rien ne change sa direction, donc tout droit.',
  },
  fling: {
    en: 'A force throws {obj} outwards, {awayFrom}.',
    fr: 'Une force lance {obj} vers l’extérieur, {awayFrom}.',
    why: 'No force pushes it outwards. When the pull stops, the turning stops, that is all.',
    whyFr: 'Aucune force ne pousse vers l’extérieur. Quand l’attraction s’arrête, le virage s’arrête, c’est tout.',
  },
  push: {
    en: '{Force} was pushing {obj} along. Now it slows down and stops.',
    fr: '{Force} poussait {obj} en avant. Maintenant, {obj} ralentit et s’arrête.',
    why: '{Force} never pushed it along: it pulled {toward}. And in space, nothing slows it down.',
    whyFr: '{Force} ne poussait pas en avant : elle tirait {toward}. Et dans l’espace, rien ne ralentit.',
  },
  fall: {
    en: 'It falls {into}.',
    fr: '{Obj} tombe {into}.',
    why: 'Falling {into} needs a pull {toward}. That pull has stopped.',
    whyFr: 'Pour tomber {into}, il faut une attraction {toward}. Cette attraction s’est arrêtée.',
  },
};

// ── What slows it down? (`coast`) ─────────────────────────────────────────
// `where`: space (nothing acts against it) or road (air resistance and
// friction do). The answer to "which forces act against its movement" is
// derived from `where` alone (orbitLab.coastAnswer).
export const COAST_SCENES = {
  probe: {
    where: 'space', icon: 'probe',
    en: 'A space probe drifts far from every star and planet. Its engine is off.',
    fr: 'Une sonde spatiale dérive loin de toutes les étoiles et de toutes les planètes. Son moteur est éteint.',
    gravity: { en: 'So far from every star and planet, gravity is almost nothing, and nothing pulls it backwards.', fr: 'Si loin des étoiles et des planètes, la gravité est presque nulle, et rien ne la tire en arrière.' },
  },
  moon: {
    where: 'space', icon: 'moon',
    en: 'The Moon goes round the Earth, as it has done for 4.5 billion years.',
    fr: 'La Lune tourne autour de la Terre, comme depuis 4.5 milliards d’années.',
    gravity: { en: 'The Earth’s gravity pulls the Moon sideways, towards the Earth. That turns its path; it does not slow it down.', fr: 'La gravité de la Terre tire la Lune sur le côté, vers la Terre. Elle courbe son chemin ; elle ne la ralentit pas.' },
  },
  bike: {
    where: 'road', icon: 'bike',
    en: 'A bicycle rolls along a flat road. Nobody is pedalling.',
    fr: 'Un vélo roule sur une route plate. Personne ne pédale.',
  },
  plane: {
    where: 'road', icon: 'plane',
    en: 'A plane has just landed. Its engines are not pushing it any more, and it rolls along the runway.',
    fr: 'Un avion vient d’atterrir. Ses moteurs ne le poussent plus, et il roule sur la piste.',
  },
};

export const FORCE_CHIPS = {
  air: { en: 'Air resistance', fr: 'Résistance de l’air' },
  friction: { en: 'Friction', fr: 'Frottement' },
  gravity: { en: 'Gravity', fr: 'Gravité' },
  none: { en: 'Nothing', fr: 'Rien' },
};
export const FORCE_CHIP_IDS = ['air', 'friction', 'gravity', 'none'];

export const COAST_SLIPS = {
  air: { en: 'There is no air in space: it is a vacuum. So there is no air resistance.', fr: 'Il n’y a pas d’air dans l’espace : c’est un vide. Donc pas de résistance de l’air.' },
  friction: { en: 'Friction needs two things rubbing together. Out here, nothing touches it.', fr: 'Le frottement, c’est deux choses qui frottent l’une contre l’autre. Ici, rien ne la touche.' },
  nothing: { en: 'On Earth there is air, and the wheels touch the ground. Something does act against its movement.', fr: 'Sur Terre, il y a de l’air, et les roues touchent le sol. Quelque chose agit bien contre son mouvement.' },
  roadGravity: { en: 'Gravity pulls it down, onto the road, not backwards. It does not slow it down.', fr: 'La gravité le tire vers le bas, sur la route, pas en arrière. Elle ne le ralentit pas.' },
  noair: { en: 'One is missing: the air pushes against it as it moves. That is air resistance.', fr: 'Il en manque une : l’air pousse contre lui quand il avance. C’est la résistance de l’air.' },
  nofriction: { en: 'One is missing: the wheels rub on the ground, and that slows it. That is friction.', fr: 'Il en manque une : les roues frottent sur le sol, et ça le ralentit. C’est le frottement.' },
};

// What happens to its speed, and why — the result and the reason together.
export const SPEED_REASONS = {
  space: {
    keeps: { ok: true, en: 'It keeps the same speed: nothing pushes against its movement.', fr: 'Elle garde la même vitesse : rien ne pousse contre son mouvement.' },
    push: {
      en: 'It slows down and stops: nothing pushes it forwards any more.', fr: 'Elle ralentit et s’arrête : plus rien ne la pousse en avant.',
      why: 'A moving thing does not need a push to keep moving. It only slows down if a force acts against it.',
      whyFr: 'Un objet en mouvement n’a pas besoin d’être poussé pour continuer. Il ralentit seulement si une force agit contre lui.',
    },
    nogravity: {
      en: 'It keeps the same speed, because there is no gravity in space.', fr: 'Elle garde la même vitesse, parce qu’il n’y a pas de gravité dans l’espace.',
      why: 'The right result for the wrong reason: there IS gravity in space. What space does not have is air.',
      whyFr: 'Bon résultat, mauvaise raison : il y a de la gravité dans l’espace. Ce qui manque dans l’espace, c’est l’air.',
    },
    air: {
      en: 'It slows down: air resistance pushes against it.', fr: 'Elle ralentit : la résistance de l’air pousse contre elle.',
      why: 'Space is a vacuum: no particles, so no air resistance.',
      whyFr: 'L’espace est un vide : pas de particules, donc pas de résistance de l’air.',
    },
  },
  road: {
    slows: { ok: true, en: 'It slows down: air resistance and friction act against its movement.', fr: 'Il ralentit : la résistance de l’air et le frottement agissent contre son mouvement.' },
    noforce: {
      en: 'It keeps the same speed: nothing pushes it backwards.', fr: 'Il garde la même vitesse : rien ne le pousse en arrière.',
      why: 'Air resistance and friction act against it, so it slows down and stops.',
      whyFr: 'La résistance de l’air et le frottement agissent contre lui, donc il ralentit et s’arrête.',
    },
    gravity: {
      en: 'It slows down because gravity pulls it backwards.', fr: 'Il ralentit parce que la gravité le tire en arrière.',
      why: 'Gravity pulls it down onto the road, not backwards. Air resistance and friction slow it.',
      whyFr: 'La gravité le tire vers le bas, pas en arrière. Ce sont la résistance de l’air et le frottement qui le ralentissent.',
    },
    runout: {
      en: 'It slows down because the push it was given runs out.', fr: 'Il ralentit parce que la poussée qu’on lui a donnée s’épuise.',
      why: 'The right result for the wrong reason. A push does not run out: the forces against its movement slow it.',
      whyFr: 'Bon résultat, mauvaise raison. Une poussée ne s’épuise pas : ce sont les forces contre son mouvement qui le ralentissent.',
    },
  },
};
