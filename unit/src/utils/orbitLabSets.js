/**
 * Orbit Lab (ORBIT_LAB) — the four data sets for the `graph` kind: the book's
 * Activity table (p. 94), and three more systems where the same pattern holds.
 * Real orbit speeds, rounded to whole km/s (the planets are the book's own
 * values); `d` is the distance from the centre, used only to put the rows in
 * order and to place the object to predict (planets: million km; moons:
 * thousand km; things round the Earth: km above the ground).
 *
 * `per`: km/s in one big square; small lines are 1 km/s, so a bar can reach
 * every whole value. `reasons`: the right one first, then traps, each refuted
 * from that set's own numbers (orbitLabCheck proves the `size` trap is only
 * offered where the set does refute it: never for the Earth's set, where the
 * Moon is both the biggest and the slowest).
 */
const WEAKER = (en, fr) => ({ id: 'weaker', ok: true, en, fr });
const PATH = (things, thingsFr) => ({
  id: 'path',
  en: `The far ${things} have further to go, so they are slower.`,
  fr: `Les ${thingsFr} lointaines ont plus de chemin à faire, donc elles sont plus lentes.`,
  why: 'A longer path makes a longer year, not a lower speed. Speed is the km it goes every second.',
  whyFr: 'Un chemin plus long donne une année plus longue, pas une vitesse plus faible. La vitesse, ce sont les km parcourus chaque seconde.',
});

export const GRAPH_SETS = {
  planets: {
    title: { en: 'The planets', fr: 'Les planètes' },
    centre: { en: 'the Sun', fr: 'le Soleil', distFr: 'au Soleil', fromFr: 'du Soleil' },
    per: 5, max: 50,
    rows: [
      { id: 'mercury', en: 'Mercury', fr: 'Mercure', v: 48, d: 58, size: 4879 },
      { id: 'venus', en: 'Venus', fr: 'Vénus', v: 35, d: 108, size: 12104 },
      { id: 'earth', en: 'Earth', fr: 'Terre', v: 30, d: 150, size: 12756 },
      { id: 'mars', en: 'Mars', fr: 'Mars', v: 24, d: 228, size: 6792 },
      { id: 'jupiter', en: 'Jupiter', fr: 'Jupiter', v: 13, d: 778, size: 142984 },
      { id: 'saturn', en: 'Saturn', fr: 'Saturne', v: 10, d: 1430, size: 120536 },
      { id: 'uranus', en: 'Uranus', fr: 'Uranus', v: 7, d: 2870, size: 51118 },
      { id: 'neptune', en: 'Neptune', fr: 'Neptune', v: 5, d: 4500, size: 49528 },
    ],
    reasons: [
      WEAKER('The Sun’s pull is weaker far from the Sun.', 'L’attraction du Soleil est plus faible loin du Soleil.'),
      {
        id: 'size', en: 'The far planets are bigger, so they move more slowly.', fr: 'Les planètes lointaines sont plus grosses, donc elles vont moins vite.',
        why: 'Jupiter is the biggest planet, and it is faster than Saturn, Uranus and Neptune. Size is not the reason.',
        whyFr: 'Jupiter est la plus grosse planète, et elle va plus vite que Saturne, Uranus et Neptune. La taille n’est pas la raison.',
      },
      PATH('planets', 'planètes'),
      {
        id: 'cold', en: 'It is colder far from the Sun, so the planets slow down.', fr: 'Il fait plus froid loin du Soleil, donc les planètes ralentissent.',
        why: 'Cold does not slow a planet down. Its speed comes from the pull of the Sun’s gravity.',
        whyFr: 'Le froid ne ralentit pas une planète. Sa vitesse dépend de l’attraction de la gravité du Soleil.',
      },
    ],
  },
  jupiter: {
    title: { en: 'Jupiter’s four big moons', fr: 'Les quatre grandes lunes de Jupiter' },
    centre: { en: 'Jupiter', fr: 'Jupiter', distFr: 'à Jupiter', fromFr: 'de Jupiter' },
    per: 2, max: 20,
    rows: [
      { id: 'io', en: 'Io', fr: 'Io', v: 17, d: 422, size: 3643 },
      { id: 'europa', en: 'Europa', fr: 'Europe', v: 14, d: 671, size: 3122 },
      { id: 'ganymede', en: 'Ganymede', fr: 'Ganymède', v: 11, d: 1070, size: 5268 },
      { id: 'callisto', en: 'Callisto', fr: 'Callisto', v: 8, d: 1883, size: 4821 },
    ],
    reasons: [
      WEAKER('Jupiter’s pull is weaker far from Jupiter.', 'L’attraction de Jupiter est plus faible loin de Jupiter.'),
      {
        id: 'size', en: 'The far moons are bigger, so they move more slowly.', fr: 'Les lunes lointaines sont plus grosses, donc elles vont moins vite.',
        why: 'Ganymede is bigger than Callisto, and it is faster. Size is not the reason.',
        whyFr: 'Ganymède est plus grosse que Callisto, et elle va plus vite. La taille n’est pas la raison.',
      },
      PATH('moons', 'lunes'),
      {
        id: 'air', en: 'There is more air far from Jupiter, so the far moons are slowed down.', fr: 'Il y a plus d’air loin de Jupiter, donc les lunes lointaines sont freinées.',
        why: 'There is no air out there: space is a vacuum. Nothing slows the moons down.',
        whyFr: 'Il n’y a pas d’air là-bas : l’espace est un vide. Rien ne freine les lunes.',
      },
    ],
  },
  saturn: {
    title: { en: 'Seven of Saturn’s moons', fr: 'Sept lunes de Saturne' },
    centre: { en: 'Saturn', fr: 'Saturne', distFr: 'à Saturne', fromFr: 'de Saturne' },
    per: 2, max: 16,
    rows: [
      { id: 'mimas', en: 'Mimas', fr: 'Mimas', v: 14, d: 186, size: 396 },
      { id: 'enceladus', en: 'Enceladus', fr: 'Encelade', v: 13, d: 238, size: 504 },
      { id: 'tethys', en: 'Tethys', fr: 'Téthys', v: 11, d: 295, size: 1062 },
      { id: 'dione', en: 'Dione', fr: 'Dioné', v: 10, d: 377, size: 1123 },
      { id: 'rhea', en: 'Rhea', fr: 'Rhéa', v: 8, d: 527, size: 1527 },
      { id: 'titan', en: 'Titan', fr: 'Titan', v: 6, d: 1222, size: 5150 },
      { id: 'iapetus', en: 'Iapetus', fr: 'Japet', v: 3, d: 3561, size: 1469 },
    ],
    // Hyperion really orbits between Titan and Iapetus, at 5.1 km/s.
    predict: { id: 'hyperion', en: 'Hyperion', fr: 'Hypérion', d: 1481, v: 5, of: { en: 'a moon of Saturn', fr: 'une lune de Saturne' }, pronFr: 'Elle' },
    reasons: [
      WEAKER('Saturn’s pull is weaker far from Saturn.', 'L’attraction de Saturne est plus faible loin de Saturne.'),
      PATH('moons', 'lunes'),
      {
        id: 'air', en: 'There is more air far from Saturn, so the far moons are slowed down.', fr: 'Il y a plus d’air loin de Saturne, donc les lunes lointaines sont freinées.',
        why: 'There is no air out there: space is a vacuum. Nothing slows the moons down.',
        whyFr: 'Il n’y a pas d’air là-bas : l’espace est un vide. Rien ne freine les lunes.',
      },
    ],
  },
  earth: {
    title: { en: 'Things that orbit the Earth', fr: 'Ce qui tourne autour de la Terre' },
    centre: { en: 'the Earth', fr: 'la Terre', distFr: 'à la Terre', fromFr: 'de la Terre' },
    per: 1, max: 10,
    rows: [
      { id: 'iss', en: 'Space station', fr: 'Station spatiale', say: { en: 'the space station', fr: 'la station spatiale' }, v: 8, d: 400, size: 109 },
      { id: 'gps', en: 'GPS satellite', fr: 'Satellite GPS', say: { en: 'a GPS satellite', fr: 'un satellite GPS' }, v: 4, d: 20200, size: 5 },
      { id: 'tv', en: 'TV satellite', fr: 'Satellite télé', say: { en: 'a TV satellite', fr: 'un satellite télé' }, v: 3, d: 35800, size: 7 },
      { id: 'moon', en: 'The Moon', fr: 'La Lune', say: { en: 'the Moon', fr: 'la Lune' }, v: 1, d: 384000, size: 3475000 },
    ],
    // A weather satellite on a polar orbit about 830 km up goes 7.4 km/s.
    predict: { id: 'weather', en: 'A weather satellite', fr: 'Un satellite météo', d: 830, v: 7, of: null, pronFr: 'Il' },
    reasons: [
      WEAKER('The Earth’s pull is weaker far from the Earth.', 'L’attraction de la Terre est plus faible loin de la Terre.'),
      {
        id: 'path', en: 'The far ones have further to go, so they are slower.', fr: 'Les plus lointains ont plus de chemin à faire, donc ils sont plus lents.',
        why: 'A longer path makes a longer trip round, not a lower speed. Speed is the km it goes every second.',
        whyFr: 'Un chemin plus long donne un tour plus long, pas une vitesse plus faible. La vitesse, ce sont les km parcourus chaque seconde.',
      },
      {
        id: 'engines', en: 'The close satellites have bigger engines pushing them.', fr: 'Les satellites proches ont de plus gros moteurs qui les poussent.',
        why: 'Nothing in orbit needs an engine to keep going: the Earth’s gravity keeps it in orbit. The Moon has no engine at all.',
        whyFr: 'Rien en orbite n’a besoin d’un moteur pour continuer : la gravité de la Terre le garde en orbite. La Lune n’a aucun moteur.',
      },
      {
        id: 'air', en: 'There is more air higher up, so the far ones are slowed down.', fr: 'Il y a plus d’air plus haut, donc les plus lointains sont freinés.',
        why: 'Higher up there is less air, not more, and above the air there is none.',
        whyFr: 'Plus haut, il y a moins d’air, pas plus, et au-dessus de l’air, il n’y en a plus du tout.',
      },
    ],
  },
};

// The pattern sentence's three endings.
export const PATTERNS = {
  up: { en: 'increases', fr: 'augmente' },
  down: { en: 'decreases', fr: 'diminue' },
  same: { en: 'stays the same', fr: 'reste la même' },
};
export const PATTERN_IDS = ['up', 'down', 'same'];
