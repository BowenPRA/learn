/**
 * Storyboard (SOLAR_STORY, Y7 Science 3.2) — the tables. utils/solarStory.js
 * derives every round, answer and slip from these; nothing here is per item.
 *
 * The story is the Formation model's seven steps, named as the model names them
 * (Cloud, Collapse, Disc, Sun, Clumps, Planets, Today), and each step after the
 * first has ONE cause: why the story gets there. A trap is a wrong cause that
 * sounds right — a misconception — and fits one step; its `why` is the one or
 * two plain sentences the student sees when they choose it. English and French.
 */

export const STEP_IDS = ['cloud', 'collapse', 'disc', 'sun', 'clumps', 'planets', 'today'];

/** Each step: its name (as in the Formation model) and what the frame shows. */
export const STEPS = {
  cloud: {
    en: 'Cloud', fr: 'Nuage',
    says: 'A nebula: a huge, cold cloud of dust and gas, turning very slowly.',
    saysFr: 'Une nébuleuse : un énorme nuage froid de poussière et de gaz, qui tourne très lentement.',
  },
  collapse: {
    en: 'Collapse', fr: 'Effondrement',
    says: 'The cloud shrinks. Its middle gets denser and hotter.',
    saysFr: 'Le nuage rétrécit. Son centre devient plus dense et plus chaud.',
  },
  disc: {
    en: 'Disc', fr: 'Disque',
    says: 'It spins faster and goes flat: a spinning disc.',
    saysFr: 'Il tourne plus vite et s’aplatit : un disque qui tourne.',
  },
  sun: {
    en: 'Sun', fr: 'Soleil',
    says: 'The hot middle lights up as a star: the Sun.',
    saysFr: 'Le centre chaud s’allume : une étoile, le Soleil.',
  },
  clumps: {
    en: 'Clumps', fr: 'Amas',
    says: 'In the disc, dust sticks together into clumps that grow.',
    saysFr: 'Dans le disque, la poussière se colle en amas qui grossissent.',
  },
  planets: {
    en: 'Planets', fr: 'Planètes',
    says: 'The clumps become planets: small rocky ones near the Sun, giants far out.',
    saysFr: 'Les amas deviennent des planètes : de petites planètes rocheuses près du Soleil, des géantes plus loin.',
  },
  today: {
    en: 'Today', fr: 'Aujourd’hui',
    says: 'The planets still orbit the Sun the same way, in one flat plane.',
    saysFr: 'Les planètes tournent encore autour du Soleil dans le même sens, dans un seul plan.',
  },
};

/** Why the story reaches each step (worded as the deck's panels word it). */
export const CAUSES = {
  collapse: {
    en: 'Gravity: every bit of dust and gas pulls on every other bit.',
    fr: 'La gravité : chaque grain de poussière et de gaz attire tous les autres.',
  },
  disc: {
    en: 'A spinning cloud spins faster as it shrinks, and the spin flattens it.',
    fr: 'Un nuage qui tourne tourne plus vite en rétrécissant, et la rotation l’aplatit.',
  },
  sun: {
    en: 'Gravity pulled most of the mass into the middle, until it was hot enough to shine.',
    fr: 'La gravité a rassemblé presque toute la masse au centre, jusqu’à ce qu’il soit assez chaud pour briller.',
  },
  clumps: {
    en: 'Grains that touch stick. More mass gives stronger gravity, so a clump pulls in even more.',
    fr: 'Les grains qui se touchent se collent. Plus de masse donne une gravité plus forte, donc un amas attire encore plus.',
  },
  planets: {
    en: 'Near the Sun it was too hot for ice, so only rock and metal could clump. Far out, ice made big cores that pulled in gas.',
    fr: 'Près du Soleil, il faisait trop chaud pour la glace : seuls la roche et le métal pouvaient se coller. Plus loin, la glace a fait de gros noyaux qui ont attiré du gaz.',
  },
  today: {
    en: 'The disc was spinning one way, so everything made from it still goes round that way.',
    fr: 'Le disque tournait dans un sens, donc tout ce qui en est sorti tourne encore dans ce sens.',
  },
};

/** Wrong causes that sound right. `fits`: the step it is a wrong reason for. */
export const TRAPS = {
  heat: {
    fits: 'collapse',
    en: 'The Sun’s heat pulled the dust together.', fr: 'La chaleur du Soleil a rassemblé la poussière.',
    why: 'There was no Sun yet. And heat does not pull things together: gravity does.',
    whyFr: 'Il n’y avait pas encore de Soleil. Et la chaleur n’attire rien : c’est la gravité.',
  },
  magnet: {
    fits: 'collapse',
    en: 'Magnetism pulled the dust and gas together.', fr: 'Le magnétisme a rassemblé la poussière et le gaz.',
    why: 'Most dust and gas is not magnetic. Gravity pulls on everything that has mass.',
    whyFr: 'La plupart de la poussière et du gaz n’est pas magnétique. La gravité attire tout ce qui a une masse.',
  },
  slower: {
    fits: 'disc',
    en: 'It spun more slowly as it shrank.', fr: 'Il a tourné plus lentement en rétrécissant.',
    why: 'It is the other way round. A shrinking cloud spins faster, like a skater pulling in her arms.',
    whyFr: 'C’est l’inverse. Un nuage qui rétrécit tourne plus vite, comme une patineuse qui ramène ses bras.',
  },
  ball: {
    fits: 'disc',
    en: 'Spinning made it into a round ball.', fr: 'La rotation en a fait une boule ronde.',
    why: 'Spinning makes it go flat, like pizza dough: a disc, not a ball.',
    whyFr: 'La rotation l’aplatit, comme une pâte à pizza : un disque, pas une boule.',
  },
  fire: {
    fits: 'sun',
    en: 'Something set the middle on fire.', fr: 'Quelque chose a mis le feu au centre.',
    why: 'Nothing was burning. Gravity squeezed so much mass into the middle that it got hot enough to shine.',
    whyFr: 'Rien ne brûlait. La gravité a serré tant de masse au centre qu’il est devenu assez chaud pour briller.',
  },
  anyClump: {
    fits: 'sun',
    en: 'Every clump becomes a star if you wait long enough.', fr: 'Tout amas devient une étoile si on attend assez longtemps.',
    why: 'Only a clump with enough mass gets hot enough. Jupiter would need about 80 times more mass.',
    whyFr: 'Seul un amas avec assez de masse devient assez chaud. Jupiter aurait besoin d’environ 80 fois plus de masse.',
  },
  time: {
    fits: 'clumps',
    en: 'Gravity gets stronger as time goes on.', fr: 'La gravité devient plus forte avec le temps.',
    why: 'Gravity gets stronger with more mass, not with more time.',
    whyFr: 'La gravité devient plus forte avec plus de masse, pas avec plus de temps.',
  },
  small: {
    fits: 'clumps',
    en: 'Small clumps pull harder than big ones.', fr: 'Les petits amas attirent plus fort que les gros.',
    why: 'It is the other way round. More mass means stronger gravity, so the biggest clump pulls hardest.',
    whyFr: 'C’est l’inverse. Plus de masse veut dire une gravité plus forte, donc le plus gros amas attire le plus.',
  },
  sank: {
    fits: 'planets',
    en: 'Heavy rock sank towards the Sun, and light gas floated away.', fr: 'La roche lourde a coulé vers le Soleil, et le gaz léger s’est envolé.',
    why: 'Nothing sinks or floats in space. Near the Sun it was too hot for ice, so only rock and metal were left to clump.',
    whyFr: 'Rien ne coule ni ne flotte dans l’espace. Près du Soleil, il faisait trop chaud pour la glace : il ne restait que la roche et le métal.',
  },
  sunPull: {
    fits: 'today',
    en: 'The Sun’s gravity pulls them all round the same way.', fr: 'La gravité du Soleil les fait toutes tourner dans le même sens.',
    why: 'Gravity pulls towards the Sun. It does not choose a direction: that came from the spinning disc.',
    whyFr: 'La gravité attire vers le Soleil. Elle ne choisit pas un sens : il vient du disque qui tournait.',
  },
  luck: {
    fits: 'today',
    en: 'It is just luck.', fr: 'C’est juste un hasard.',
    why: 'Eight planets, all the same way, all in one plane, is not luck. They all came from one spinning disc.',
    whyFr: 'Huit planètes, toutes dans le même sens, dans un seul plan : ce n’est pas un hasard. Elles viennent toutes d’un seul disque qui tournait.',
  },
};
