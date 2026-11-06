/**
 * From… To… (ENERGY_CHANGE, Y7 Science 3.6) — the tables. The science lives
 * here: the eight kinds of energy, and every event or process the engine asks
 * about, with its energy-change diagram. utils/energyChange.js derives the
 * stages, the answers and every named slip from these; energyChangeCheck.js
 * proves them. English and French.
 *
 * A scene's diagram is `slots` (the energies, in order) and `chain` (how many
 * of them, from the start, are a line A → B → C). The rest are OUTPUTS: one
 * arrow each, all from the last box of the line. So
 *   a kettle       slots [electrical, thermal]            chain 2   (one change)
 *   a television   slots [electrical, sound, light]       chain 1   (two arrows from one box)
 *   a power station slots [chemical, thermal, kinetic, electrical]  chain 4
 *   a phone in use slots [chemical, electrical, light, sound]       chain 2   (a line, then two arrows)
 * `side`: energies it really does give out but is not FOR (a kettle's sound) —
 * the `notTheJob` slip. `traps`: one scene's own misconception, at one box
 * (`at`: a box index, or 'outputs'), with the reason it is wrong. `backWhy`
 * replaces the generic "the wrong way round" when the scene has its own.
 * `heat` scenes are two things at two temperatures instead.
 */

export const ENERGIES = {
  chemical: { en: 'chemical', fr: 'chimique' },
  kinetic: { en: 'kinetic', fr: 'cinétique' },
  gravitational: { en: 'gravitational potential', fr: 'potentielle de pesanteur' },
  elastic: { en: 'elastic potential', fr: 'potentielle élastique' },
  thermal: { en: 'thermal', fr: 'thermique' },
  electrical: { en: 'electrical', fr: 'électrique' },
  sound: { en: 'sound', fr: 'sonore' },
  light: { en: 'light', fr: 'lumineuse' },
};
export const ENERGY_IDS = Object.keys(ENERGIES);

export const HAPPENS = {
  event: { en: 'An event: it happens once, and it is over quickly', fr: 'Un événement : il arrive une fois, et c’est vite fini' },
  process: { en: 'A process: it keeps going', fr: 'Un processus : il continue' },
};

export const SCENES = {
  kettle: {
    en: 'A kettle boils water', fr: 'Une bouilloire fait bouillir de l’eau', name: 'a kettle', nameFr: 'une bouilloire',
    happens: 'process', slots: ['electrical', 'thermal'], chain: 2, side: ['sound'],
    note: 'Plugged in, it heats the water. It hums a little too, but sound is not what we use a kettle for.',
    noteFr: 'Branchée, elle chauffe l’eau. Elle fait aussi un peu de bruit, mais on ne s’en sert pas pour le son.',
  },
  apple: {
    en: 'An apple falls from a tree', fr: 'Une pomme tombe d’un arbre', name: 'a falling apple', nameFr: 'une pomme qui tombe',
    happens: 'event', slots: ['gravitational', 'kinetic'], chain: 2, side: ['sound'],
    note: 'High up, the apple has gravitational potential energy. As it falls, it moves faster and faster: kinetic.',
    noteFr: 'En haut, la pomme a de l’énergie potentielle de pesanteur. En tombant, elle va de plus en plus vite : cinétique.',
  },
  candle: {
    en: 'A candle lights a dark room', fr: 'Une bougie éclaire une pièce sombre', name: 'a candle', nameFr: 'une bougie',
    happens: 'process', slots: ['chemical', 'light'], chain: 2,
    traps: [{ id: 'warm', at: 1, pick: 'thermal',
      why: 'A candle does warm the air, but here we want to SEE. Its useful change is chemical to light. (When we want heat, it is chemical to thermal.)',
      whyFr: 'Une bougie chauffe aussi l’air, mais ici on veut VOIR. Son changement utile : chimique en lumineuse. (Quand on veut de la chaleur, c’est chimique en thermique.)' }],
    note: 'The wax is a chemical store. As it burns, the candle gives out light — what we want in a dark room.',
    noteFr: 'La cire est une réserve chimique. En brûlant, la bougie donne de la lumière — ce qu’on veut dans une pièce sombre.',
  },
  bow: {
    en: 'A bow shoots an arrow', fr: 'Un arc tire une flèche', name: 'a bow', nameFr: 'un arc',
    happens: 'event', slots: ['elastic', 'kinetic'], chain: 2, side: ['sound'],
    traps: [{ id: 'muscles', at: 0, pick: 'chemical',
      why: 'Your muscles’ chemical energy stretched the bow before. As it SHOOTS, the energy starts in the stretched bow: elastic potential.',
      whyFr: 'L’énergie chimique de tes muscles a tendu l’arc avant. Quand il TIRE, l’énergie part de l’arc tendu : potentielle élastique.' }],
    note: 'The stretched bow stores elastic potential energy. Let go, and the arrow flies: kinetic.',
    noteFr: 'L’arc tendu stocke de l’énergie potentielle élastique. On lâche, et la flèche part : cinétique.',
  },
  charging: {
    en: 'A phone is charging', fr: 'Un téléphone est en charge', name: 'a phone charging', nameFr: 'un téléphone en charge',
    happens: 'process', slots: ['electrical', 'chemical'], chain: 2, side: ['thermal'],
    backWhy: 'The wrong way round. A phone battery is a chemical store, not an electrical one: charging puts energy INTO it. Electrical to chemical.',
    backWhyFr: 'C’est à l’envers. Une batterie de téléphone est une réserve chimique, pas électrique : la charge y FAIT ENTRER l’énergie. Électrique en chimique.',
    note: 'Electricity comes in through the wire and is stored in the battery as chemical energy. Using the phone runs it down again.',
    noteFr: 'L’électricité arrive par le fil et est stockée dans la batterie sous forme chimique. Utiliser le téléphone la vide.',
  },
  solar: {
    en: 'A solar panel in the sunshine', fr: 'Un panneau solaire au soleil', name: 'a solar panel', nameFr: 'un panneau solaire',
    happens: 'process', slots: ['light', 'electrical'], chain: 2,
    traps: [{ id: 'heat', at: 0, pick: 'thermal',
      why: 'A solar panel uses the Sun’s LIGHT, not its heat. It works on a cold, bright day, and not at night.',
      whyFr: 'Un panneau solaire utilise la LUMIÈRE du Soleil, pas sa chaleur. Il marche par un jour froid et clair, et pas la nuit.' }],
    note: 'Sunlight falls on the panel, and wires carry the electricity away.',
    noteFr: 'La lumière du Soleil tombe sur le panneau, et des fils emportent l’électricité.',
  },
  drum: {
    en: 'A drum is hit', fr: 'On frappe un tambour', name: 'a drum', nameFr: 'un tambour',
    happens: 'event', slots: ['kinetic', 'sound'], chain: 2,
    note: 'The moving stick hits the drum, and the drum gives out sound.',
    noteFr: 'Le bâton en mouvement frappe le tambour, et le tambour donne un son.',
  },
  book: {
    en: 'A book falls off a shelf', fr: 'Un livre tombe d’une étagère', name: 'a falling book', nameFr: 'un livre qui tombe',
    happens: 'event', slots: ['gravitational', 'kinetic'], chain: 2, side: ['sound'],
    note: 'On the high shelf the book has gravitational potential energy; falling, it is kinetic.',
    noteFr: 'Sur l’étagère, le livre a de l’énergie potentielle de pesanteur ; en tombant, elle devient cinétique.',
  },
  bird: {
    en: 'A bird uses its movement to fly higher', fr: 'Un oiseau utilise son mouvement pour monter', name: 'a bird flying higher', nameFr: 'un oiseau qui monte',
    happens: 'process', slots: ['kinetic', 'gravitational'], chain: 2,
    traps: [{ id: 'food', at: 0, pick: 'chemical',
      why: 'That happens first, in its muscles (its food). Here the bird uses its MOVEMENT to go higher: kinetic to gravitational potential.',
      whyFr: 'Ça arrive d’abord, dans ses muscles (sa nourriture). Ici l’oiseau utilise son MOUVEMENT pour monter : cinétique en potentielle de pesanteur.' }],
    note: 'Going up, its movement becomes height: kinetic to gravitational potential — a falling apple the other way round.',
    noteFr: 'En montant, son mouvement devient de la hauteur : cinétique en potentielle de pesanteur — la pomme qui tombe, à l’envers.',
  },
  tv: {
    en: 'A television is on', fr: 'Une télévision est allumée', name: 'a television', nameFr: 'une télévision',
    happens: 'process', slots: ['electrical', 'sound', 'light'], chain: 1, side: ['thermal'],
    note: 'Three boxes, two arrows, both from electrical: the TV makes sound AND light. Sound does not turn into light.',
    noteFr: 'Trois cases, deux flèches, toutes les deux depuis électrique : la télé donne du son ET de la lumière. Le son ne devient pas de la lumière.',
  },
  hairdryer: {
    en: 'A hair dryer blows hot air', fr: 'Un sèche-cheveux souffle de l’air chaud', name: 'a hair dryer', nameFr: 'un sèche-cheveux',
    happens: 'process', slots: ['electrical', 'thermal', 'kinetic'], chain: 1, side: ['sound'],
    note: 'It heats the air AND blows it: two arrows from electrical. Its noise is sound, but we do not use it for that.',
    noteFr: 'Il chauffe l’air ET le souffle : deux flèches depuis électrique. Son bruit est sonore, mais on ne s’en sert pas pour ça.',
  },
  firework: {
    en: 'A Tết firework bursts', fr: 'Un feu d’artifice du Têt éclate', name: 'a firework', nameFr: 'un feu d’artifice',
    happens: 'event', slots: ['chemical', 'light', 'sound', 'thermal', 'kinetic'], chain: 1,
    note: 'Four arrows from one box: the chemicals burst into light, sound, heat and flying sparks.',
    noteFr: 'Quatre flèches depuis une case : les produits chimiques éclatent en lumière, son, chaleur et étincelles qui volent.',
  },
  powerStation: {
    en: 'A gas power station', fr: 'Une centrale à gaz', name: 'a gas power station', nameFr: 'une centrale à gaz',
    happens: 'process', slots: ['chemical', 'thermal', 'kinetic', 'electrical'], chain: 4,
    traps: [{ id: 'wind', at: 0, pick: 'kinetic',
      why: 'There is no wind here. The energy starts in the gas, a chemical store. The spinning wheel is the generator inside, pushed round by the hot gas.',
      whyFr: 'Il n’y a pas de vent ici. L’énergie part du gaz, une réserve chimique. La roue qui tourne est le générateur, à l’intérieur, poussé par le gaz chaud.' }],
    note: 'The gas burns (chemical to thermal), the hot gas spins the generators (thermal to kinetic), and they make electricity for the wires.',
    noteFr: 'Le gaz brûle (chimique en thermique), le gaz chaud fait tourner les générateurs (thermique en cinétique), et ils font l’électricité des fils.',
  },
  dam: {
    en: 'A hydroelectric dam', fr: 'Un barrage hydroélectrique', name: 'a dam', nameFr: 'un barrage',
    happens: 'process', slots: ['gravitational', 'kinetic', 'electrical'], chain: 3,
    traps: [{ id: 'still', at: 0, pick: 'kinetic',
      why: 'Behind the dam the water is held up high and hardly moves. It starts as gravitational potential, and becomes kinetic as it falls.',
      whyFr: 'Derrière le barrage, l’eau est retenue en hauteur et bouge à peine. Elle commence en potentielle de pesanteur, et devient cinétique en tombant.' }],
    note: 'Water held up high falls through the dam (gravitational potential to kinetic) and spins a generator (kinetic to electrical).',
    noteFr: 'L’eau retenue en hauteur tombe dans le barrage (potentielle de pesanteur en cinétique) et fait tourner un générateur (cinétique en électrique).',
  },
  windLamp: {
    en: 'A wind turbine lights a lamp', fr: 'Une éolienne allume une lampe', name: 'a wind turbine and a lamp', nameFr: 'une éolienne et une lampe',
    happens: 'process', slots: ['kinetic', 'electrical', 'light'], chain: 3, side: ['thermal'],
    note: 'The moving air turns the blades (kinetic to electrical), and the wire takes the electricity to the lamp (electrical to light).',
    noteFr: 'L’air en mouvement fait tourner les pales (cinétique en électrique), et le fil emmène l’électricité à la lampe (électrique en lumineuse).',
  },
  phone: {
    en: 'A phone in use: a video with sound', fr: 'Un téléphone allumé : une vidéo avec du son', name: 'a phone in use', nameFr: 'un téléphone allumé',
    happens: 'process', slots: ['chemical', 'electrical', 'light', 'sound'], chain: 2, side: ['thermal'],
    backWhy: 'The wrong way round: that is charging. In use, the battery’s chemical energy comes OUT as electrical, then light and sound.',
    backWhyFr: 'C’est à l’envers : ça, c’est la charge. Quand on l’utilise, l’énergie chimique de la batterie SORT en électrique, puis en lumière et en son.',
    note: 'A line, then two arrows: the battery (chemical) makes electrical energy, and that becomes the screen’s light and the sound.',
    noteFr: 'Une ligne, puis deux flèches : la batterie (chimique) donne de l’énergie électrique, qui devient la lumière de l’écran et le son.',
  },
  hands: {
    en: 'You rub your hands together, fast', fr: 'Tu te frottes les mains, vite', name: 'rubbing your hands', nameFr: 'se frotter les mains',
    happens: 'process', slots: ['kinetic', 'thermal'], chain: 2, side: ['sound'],
    note: 'Rubbing changes the movement into heat: kinetic to thermal. That is why your hands get warm.',
    noteFr: 'Frotter change le mouvement en chaleur : cinétique en thermique. C’est pour ça que tes mains chauffent.',
  },
  // Heat moves from hotter to colder: two things, two temperatures.
  iceHand: {
    en: 'An ice cube in your hand', fr: 'Un glaçon dans ta main', name: 'an ice cube in your hand', nameFr: 'un glaçon dans ta main',
    heat: [{ en: 'your hand', fr: 'ta main', t: 35 }, { en: 'the ice cube', fr: 'le glaçon', t: 0 }],
    note: 'That is why your hand feels cold: it is LOSING thermal energy to the ice. Cold does not move into it.',
    noteFr: 'C’est pour ça que ta main a froid : elle PERD de l’énergie thermique vers le glaçon. Le froid n’y entre pas.',
  },
  soup: {
    en: 'A bowl of hot soup in a cool kitchen', fr: 'Un bol de soupe chaude dans une cuisine fraîche', name: 'hot soup', nameFr: 'une soupe chaude',
    heat: [{ en: 'the kitchen air', fr: 'l’air de la cuisine', t: 22 }, { en: 'the soup', fr: 'la soupe', t: 70 }],
    note: 'The soup cools down because its thermal energy moves out into the colder air — until they are the same temperature.',
    noteFr: 'La soupe refroidit parce que son énergie thermique part dans l’air plus froid — jusqu’à ce qu’ils aient la même température.',
  },
};

/** The shapes a diagram can take, for the Shape stage. */
export const SHAPES = {
  chain: { en: 'In a line: each energy changes into the next', fr: 'En ligne : chaque énergie devient la suivante' },
  branch: { en: 'One box, with an arrow to each of the others', fr: 'Une case, avec une flèche vers chacune des autres' },
  mixed: { en: 'A line, then two arrows from the second box', fr: 'Une ligne, puis deux flèches depuis la deuxième case' },
};
