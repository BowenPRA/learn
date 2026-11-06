/**
 * Where Did It Go? (ENERGY_SPLIT, Year 7 Science 3.7) — the engine's tables.
 * utils/energySplit.js derives every stage, answer and named slip from them;
 * utils/energySplitCheck.js proves them in the validator.
 *
 *   ENERGIES  3.5's eight, by id. The chips show the English word (the deck's
 *             diagrams stay in English) with the French one small underneath.
 *   DEVICES   one entry per device or process:
 *     en, fr       its name, as the round's heading
 *     the          { en, fr } — "the candle" / "la bougie" (the chase options)
 *     from         the energy that goes in; `source` says where it comes from
 *     fromWrong    the other source a student might pick (one of `decoys`)
 *     useful       the chips we want; `wasted` the chips we do not
 *     where        a chip's place when one energy is both useful and wasted:
 *                  'thermal:water' / 'thermal:around' (the kettle, the fire)
 *     want         the device's own "what we want" line — the `want` slip's message
 *     decoys       chips the device does NOT make, each with its own why
 *     pct          the useful percentage, where there is a number to use:
 *                  the book's (motorbike 25, lamp A 15, lamp B 50, page 118),
 *                  3.6's bouncing ball (55), and rounded real values (kettle 90,
 *                  cycling 25, stairs 20, a wood fire 10). Devices whose real
 *                  value is tiny or unknown (candle, radio, toaster, fan,
 *                  charger) have none, and no item counts them.
 *   CHASE     the two chase questions and their options; every wrong option
 *             is a named slip with its own message.
 */

export const ENERGIES = {
  chemical: { en: 'chemical', fr: 'chimique' },
  electrical: { en: 'electrical', fr: 'électrique' },
  kinetic: { en: 'kinetic', fr: 'cinétique' },
  thermal: { en: 'thermal', fr: 'thermique' },
  light: { en: 'light', fr: 'lumineuse' },
  sound: { en: 'sound', fr: 'sonore' },
  gpe: { en: 'gravitational potential', fr: 'potentielle de pesanteur' },
  elastic: { en: 'elastic potential', fr: 'potentielle élastique' },
};

const SOCKET = { en: 'the socket', fr: 'la prise' };
const FOOD = { en: 'the food you ate', fr: 'la nourriture que tu as mangée' };
const plugged = (en, fr) => ({ en: `${en} is plugged in: its energy comes from the socket, as electrical energy.`, fr: `${fr} est branché(e) : son énergie vient de la prise, sous forme d’énergie électrique.` });
const NOTHING_MOVES = { en: 'Nothing moves here.', fr: 'Rien ne bouge ici.' };
const NOTHING_STRETCHED = { en: 'Nothing is stretched or squashed.', fr: 'Rien n’est étiré ni écrasé.' };
const NOTHING_HIGHER = { en: 'Nothing gets any higher.', fr: 'Rien ne monte plus haut.' };

export const DEVICES = {
  candle: {
    en: 'A candle in a power cut', fr: 'Une bougie pendant une coupure de courant',
    the: { en: 'the candle', fr: 'la bougie' },
    from: 'chemical', source: { en: 'the wax', fr: 'la cire' }, fromWrong: 'electrical',
    useful: ['light'], wasted: ['thermal'],
    want: { en: 'We want to see in the dark.', fr: 'On veut voir dans le noir.' },
    decoys: [
      { chip: 'electrical', en: 'A candle is not plugged in: its energy comes from the wax.', fr: 'Une bougie n’est pas branchée : son énergie vient de la cire.' },
      { chip: 'kinetic', ...NOTHING_MOVES },
    ],
  },
  radio: {
    en: 'A radio', fr: 'Une radio',
    the: { en: 'the radio', fr: 'la radio' },
    from: 'electrical', source: SOCKET, fromWrong: 'chemical',
    useful: ['sound'], wasted: ['thermal'],
    want: { en: 'We want to hear the music.', fr: 'On veut entendre la musique.' },
    decoys: [
      { chip: 'chemical', ...plugged('This radio', 'Cette radio') },
      { chip: 'gpe', ...NOTHING_HIGHER },
    ],
  },
  motorbike: {
    en: 'Mr Bowen’s motorbike', fr: 'La moto de M. Bowen',
    the: { en: 'the motorbike', fr: 'la moto' },
    from: 'chemical', source: { en: 'the petrol', fr: 'l’essence' }, fromWrong: 'electrical',
    useful: ['kinetic'], wasted: ['thermal', 'sound'], pct: 25,
    want: { en: 'We want to get to school.', fr: 'On veut aller à l’école.' },
    decoys: [
      { chip: 'electrical', en: 'A motorbike is not plugged in: its energy comes from the petrol.', fr: 'Une moto n’est pas branchée : son énergie vient de l’essence.' },
      { chip: 'elastic', ...NOTHING_STRETCHED },
    ],
  },
  lampA: {
    en: 'Lamp A, an old filament lamp', fr: 'La lampe A, une vieille lampe à filament',
    the: { en: 'lamp A', fr: 'la lampe A' },
    from: 'electrical', source: SOCKET, fromWrong: 'chemical',
    useful: ['light'], wasted: ['thermal'], pct: 15,
    want: { en: 'We want to see.', fr: 'On veut voir.' },
    decoys: [
      { chip: 'chemical', ...plugged('A lamp', 'Une lampe') },
      { chip: 'sound', en: 'A lamp is silent: it makes no sound.', fr: 'Une lampe est silencieuse : elle ne fait pas de son.' },
    ],
  },
  lampB: {
    en: 'Lamp B, an energy-saving lamp', fr: 'La lampe B, une lampe basse consommation',
    the: { en: 'lamp B', fr: 'la lampe B' },
    from: 'electrical', source: SOCKET, fromWrong: 'chemical',
    useful: ['light'], wasted: ['thermal'], pct: 50,
    want: { en: 'We want to see.', fr: 'On veut voir.' },
    decoys: [
      { chip: 'chemical', ...plugged('A lamp', 'Une lampe') },
      { chip: 'kinetic', ...NOTHING_MOVES },
    ],
  },
  toaster: {
    en: 'A toaster', fr: 'Un grille-pain',
    the: { en: 'the toaster', fr: 'le grille-pain' },
    from: 'electrical', source: SOCKET, fromWrong: 'chemical',
    useful: ['thermal'], wasted: ['light'],
    want: { en: 'We want hot toast.', fr: 'On veut du pain grillé.' },
    decoys: [
      { chip: 'chemical', ...plugged('A toaster', 'Un grille-pain') },
    ],
  },
  charger: {
    en: 'A phone charging', fr: 'Un téléphone qui charge',
    the: { en: 'the charger', fr: 'le chargeur' },
    from: 'electrical', source: SOCKET, fromWrong: 'kinetic',
    useful: ['chemical'], wasted: ['thermal'],
    want: { en: 'We want a full battery: chemical energy stored in it.', fr: 'On veut une batterie pleine : de l’énergie chimique stockée dedans.' },
    decoys: [
      { chip: 'kinetic', ...NOTHING_MOVES },
      { chip: 'gpe', ...NOTHING_HIGHER },
    ],
  },
  cyclist: {
    en: 'Cycling on a flat road', fr: 'Rouler à vélo sur une route plate',
    the: { en: 'the cyclist', fr: 'le cycliste' },
    from: 'chemical', source: FOOD, fromWrong: 'electrical',
    useful: ['kinetic'], wasted: ['thermal', 'sound'], pct: 25,
    want: { en: 'We want to move along the road.', fr: 'On veut avancer sur la route.' },
    decoys: [
      { chip: 'gpe', en: 'A flat road: you do not get any higher, so there is no gravitational potential energy.', fr: 'Une route plate : tu ne montes pas, donc il n’y a pas d’énergie potentielle de pesanteur.' },
      { chip: 'electrical', en: 'A bicycle is not plugged in: the energy comes from the food you ate.', fr: 'Un vélo n’est pas branché : l’énergie vient de la nourriture que tu as mangée.' },
    ],
  },
  kettle: {
    en: 'An electric kettle', fr: 'Une bouilloire électrique',
    the: { en: 'the kettle', fr: 'la bouilloire' },
    from: 'electrical', source: SOCKET, fromWrong: 'chemical',
    useful: ['thermal:water'], wasted: ['thermal:around', 'sound'], pct: 90,
    where: {
      'thermal:water': { en: 'the water', fr: 'l’eau' },
      'thermal:around': { en: 'the kettle and the air', fr: 'la bouilloire et l’air' },
    },
    want: { en: 'We want hot water.', fr: 'On veut de l’eau chaude.' },
    decoys: [
      { chip: 'chemical', ...plugged('A kettle', 'Une bouilloire') },
      { chip: 'elastic', ...NOTHING_STRETCHED },
    ],
  },
  stairs: {
    en: 'Walking up the stairs', fr: 'Monter les escaliers',
    the: { en: 'you', fr: 'toi' },
    from: 'chemical', source: FOOD, fromWrong: 'electrical',
    useful: ['gpe'], wasted: ['thermal'], pct: 20,
    want: { en: 'We want to get to the top floor: higher up.', fr: 'On veut arriver au dernier étage : plus haut.' },
    decoys: [
      { chip: 'electrical', en: 'You are not plugged in: the energy comes from the food you ate.', fr: 'Tu n’es pas branché(e) : l’énergie vient de la nourriture que tu as mangée.' },
      { chip: 'light', en: 'You do not glow!', fr: 'Tu ne brilles pas !' },
    ],
  },
  fire: {
    en: 'Cooking on a wood fire', fr: 'Cuisiner sur un feu de bois',
    the: { en: 'the fire', fr: 'le feu' },
    from: 'chemical', source: { en: 'the wood', fr: 'le bois' }, fromWrong: 'electrical',
    useful: ['thermal:water'], wasted: ['thermal:around', 'light'], pct: 10,
    where: {
      'thermal:water': { en: 'the water', fr: 'l’eau' },
      'thermal:around': { en: 'the pot, the stands, the air', fr: 'la marmite, les supports, l’air' },
    },
    want: { en: 'We want hot water to cook the food.', fr: 'On veut de l’eau chaude pour cuire les aliments.' },
    decoys: [
      { chip: 'electrical', en: 'A fire is not plugged in: its energy comes from the wood.', fr: 'Un feu n’est pas branché : son énergie vient du bois.' },
      { chip: 'elastic', ...NOTHING_STRETCHED },
    ],
  },
  fan: {
    en: 'An electric fan', fr: 'Un ventilateur électrique',
    the: { en: 'the fan', fr: 'le ventilateur' },
    from: 'electrical', source: SOCKET, fromWrong: 'chemical',
    useful: ['kinetic'], wasted: ['thermal', 'sound'],
    want: { en: 'We want moving air, to cool us down.', fr: 'On veut de l’air qui bouge, pour nous rafraîchir.' },
    decoys: [
      { chip: 'chemical', ...plugged('A fan', 'Un ventilateur') },
      { chip: 'light', en: 'A fan does not glow.', fr: 'Un ventilateur ne brille pas.' },
    ],
  },
  ball: {
    en: '3.6’s bouncing ball', fr: 'La balle qui rebondit (3.6)',
    the: { en: 'the ball and the floor', fr: 'la balle et le sol' },
    backIn: { en: 'the ball, ready for the next bounce', fr: 'la balle, prête pour le prochain rebond' },
    from: 'gpe', source: { en: 'its height', fr: 'sa hauteur' }, fromWrong: 'chemical',
    useful: ['gpe:up'], wasted: ['sound', 'thermal'], pct: 55,
    where: { 'gpe:up': { en: 'back up', fr: 'elle remonte' } },
    want: { en: 'We want it to bounce back up.', fr: 'On veut qu’elle remonte.' },
    decoys: [
      { chip: 'chemical', en: 'Nothing burns, and nothing is eaten.', fr: 'Rien ne brûle, et rien n’est mangé.' },
    ],
  },
};

// The two chase questions. `{the}` and `{back}` are filled from the device
// (`the`, and `backIn` or `source`) by utils/energySplit.js.
export const CHASE = {
  where: {
    en: 'An hour later, where is the wasted energy?',
    fr: 'Une heure plus tard, où est l’énergie gaspillée ?',
    right: 'spread',
    options: [
      { id: 'spread', en: 'Spread out in the air all around, too thin to use', fr: 'Étalée dans l’air tout autour, trop dispersée pour servir' },
      { id: 'gone', en: 'Gone: it was used up', fr: 'Disparue : elle a été utilisée' },
      { id: 'stays', en: 'Still in {the}', fr: 'Toujours dans {the}' },
      { id: 'back', en: 'Back in {back}', fr: 'De retour dans {back}' },
    ],
  },
  recover: {
    en: 'Can the wasted energy be gathered back and used again?',
    fr: 'Peut-on rassembler l’énergie gaspillée et l’utiliser de nouveau ?',
    right: 'never',
    options: [
      { id: 'never', en: 'No: it has spread out, and it can never be recovered', fr: 'Non : elle s’est étalée, et on ne peut jamais la récupérer' },
      { id: 'bag', en: 'Yes: catch it in a bag and keep it', fr: 'Oui : on l’attrape dans un sac et on la garde' },
      { id: 'destroyed', en: 'No: it was destroyed', fr: 'Non : elle a été détruite' },
      { id: 'wait', en: 'Yes: wait, and it gathers back by itself', fr: 'Oui : on attend, et elle se rassemble toute seule' },
    ],
  },
};

// Why each wrong chase option is wrong (and the right ones' confirmations).
export const CHASE_WHY = {
  spread: { en: 'Yes. It spread out into the air around: it is dissipated.', fr: 'Oui. Elle s’est étalée dans l’air autour : elle est dissipée.' },
  never: { en: 'Yes. Dissipated energy can never be recovered.', fr: 'Oui. L’énergie dissipée ne peut jamais être récupérée.' },
  gone: { en: 'Energy is never used up. The wasted energy went somewhere: out into the air, which got a tiny bit warmer.', fr: 'L’énergie n’est jamais « utilisée jusqu’au bout ». L’énergie gaspillée est allée quelque part : dans l’air, qui s’est un tout petit peu réchauffé.' },
  stays: { en: 'Heat moves from hotter things to colder things, so it moved out into the colder air around. It did not stay.', fr: 'La chaleur va des choses chaudes vers les choses froides, donc elle est sortie dans l’air plus froid autour. Elle n’est pas restée.' },
  back: { en: 'It never goes back by itself. Once energy has spread out, it stays spread out.', fr: 'Elle ne revient jamais toute seule. Une fois étalée, l’énergie reste étalée.' },
  bag: { en: 'That was Mr Bowen’s idea, and his bag went cold. The heat spread out of the bag into the air, and it cannot be gathered back.', fr: 'C’était l’idée de M. Bowen, et son sac est devenu froid. La chaleur est sortie du sac dans l’air, et on ne peut pas la rassembler.' },
  destroyed: { en: 'Energy is not destroyed. It is still there, spread out where it is no use to anyone.', fr: 'L’énergie n’est pas détruite. Elle est toujours là, étalée là où elle ne sert à personne.' },
  wait: { en: 'Spread-out energy never gathers back by itself. That is what dissipated means.', fr: 'L’énergie étalée ne se rassemble jamais toute seule. C’est ce que veut dire « dissipée ».' },
};
