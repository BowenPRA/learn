// content/games/G05_guess-who/boards.js
// The two boards. Each card is { id, name: [English, French], pic | emoji }.
//
//   animals    36 animals in openly licensed photographs (images/CREDITS.json):
//              the 21 of Science 4.4 Using keys (from y7-science/U04_4/images/),
//              and 15 more already in PRA Learn (Jeopardy's images, Science 4.1
//              and 4.3), each copied with its credit entry. A round deals 24 of
//              them at random. `has` lists what a key asks about, so the ideas
//              under the question box are the key's own questions, offered only
//              while they split the animals still up (questions.js). It never
//              answers anything: Mr Bowen does, on his phone. `fact` is the line
//              under the secret animal on the reveal.
//   monsters   the Halloween carnival's 24 emoji monsters, built in. Every one
//              differs in something a player can ask about.
import ant from './images/ant.jpg'
import bee from './images/bee.jpg'
import butterfly from './images/butterfly.jpg'
import chicken from './images/chicken.jpg'
import crab from './images/crab.jpg'
import dragonfly from './images/dragonfly.jpg'
import earthworm from './images/earthworm.jpg'
import carp from './images/fish.jpg'
import clownfish from './images/fish-clownfish.jpg'
import hornShark from './images/fish-horn-shark.jpg'
import lionfish from './images/fish-lionfish.jpg'
import zebrafish from './images/fish-zebrafish.jpg'
import gecko from './images/gecko.jpg'
import housefly from './images/housefly.jpg'
import hoverfly from './images/hoverfly.jpg'
import ladybird from './images/ladybird.jpg'
import saola from './images/saola.jpg'
import slug from './images/slug.jpg'
import snail from './images/snail.jpg'
import snake from './images/snake.jpg'
import spider from './images/spider.jpg'
import lion from './images/lion.jpg'
import tiger from './images/tiger.jpg'
import elephant from './images/elephant.jpg'
import giraffe from './images/giraffe.jpg'
import hippo from './images/hippo.jpg'
import horse from './images/horse.jpg'
import cow from './images/cow.jpg'
import dog from './images/dog.jpg'
import polarBear from './images/polar-bears.jpg'
import blueWhale from './images/blue-whale.jpg'
import penguin from './images/penguin.jpg'
import duck from './images/duck.jpg'
import falcon from './images/peregrine-falcon.jpg'
import turtle from './images/turtle.jpg'
import octopus from './images/octopus.jpg'

// legs and wings are counts; everything else is there (1) or not. `flies`:
// it can fly; `big`: bigger than a person. `at`: where the photo is cropped
// from, when the middle is not the animal.
export const ANIMALS = [
  {
    id: 'ant', name: ['Ant', 'Fourmi'], pic: ant, has: { legs: 6, insect: 1 },
    fact: ['An ant has six legs and two feelers. It is an insect.', 'Une fourmi a six pattes et deux antennes. C’est un insecte.'],
  },
  {
    id: 'bee', name: ['Bee', 'Abeille'], pic: bee, has: { legs: 6, wings: 4, insect: 1, stripes: 1, flies: 1 },
    fact: ['A bee has four wings. They hook together when it flies.', 'Une abeille a quatre ailes. Elles s’accrochent quand elle vole.'],
  },
  {
    id: 'butterfly', name: ['Butterfly', 'Papillon'], pic: butterfly, has: { legs: 6, wings: 4, insect: 1, flies: 1 },
    fact: ['A butterfly tastes with its feet.', 'Un papillon goûte avec ses pattes.'],
  },
  {
    id: 'chicken', name: ['Chicken', 'Poule'], pic: chicken, has: { legs: 2, wings: 2, feathers: 1 },
    fact: ['A chicken has wings and feathers, but it can hardly fly.', 'Une poule a des ailes et des plumes, mais elle vole à peine.'],
  },
  {
    id: 'crab', name: ['Crab', 'Crabe'], pic: crab, has: { legs: 10, shell: 1, water: 1 },
    fact: ['A crab has ten legs. Two of them are claws.', 'Un crabe a dix pattes. Deux sont des pinces.'],
  },
  {
    id: 'dragonfly', name: ['Dragonfly', 'Libellule'], pic: dragonfly, has: { legs: 6, wings: 4, insect: 1, flies: 1 },
    fact: ['A dragonfly has four wings and can fly backwards.', 'Une libellule a quatre ailes et peut voler en arrière.'],
  },
  {
    id: 'earthworm', name: ['Earthworm', 'Ver de terre'], pic: earthworm, has: { rings: 1 },
    fact: ['An earthworm’s body is made of more than 100 rings.', 'Le corps d’un ver de terre a plus de 100 anneaux.'],
  },
  {
    id: 'carp', name: ['Carp', 'Carpe'], pic: carp, has: { fins: 1, scales: 1, water: 1, fish: 1 },
    fact: ['A carp has no teeth in its mouth. They are in its throat.', 'La carpe n’a pas de dents dans la bouche. Elles sont dans sa gorge.'],
  },
  {
    id: 'clownfish', name: ['Clown fish', 'Poisson-clown'], pic: clownfish, has: { fins: 1, scales: 1, water: 1, fish: 1, stripes: 1 },
    fact: ['A clown fish lives in a sea anemone, which stings other fish.', 'Le poisson-clown vit dans une anémone de mer, qui pique les autres poissons.'],
  },
  {
    id: 'hornshark', name: ['Horn shark', 'Requin dormeur'], pic: hornShark, has: { fins: 1, scales: 1, water: 1, fish: 1, spots: 1 },
    fact: ['A shark is a fish. A horn shark has a sharp spine on each back fin.', 'Un requin est un poisson. Le requin dormeur a une épine sur chaque nageoire du dos.'],
  },
  {
    id: 'lionfish', name: ['Lionfish', 'Poisson-lion'], pic: lionfish, has: { fins: 1, scales: 1, water: 1, fish: 1, stripes: 1 },
    fact: ['A lionfish has venom in its spines.', 'Le poisson-lion a du venin dans ses épines.'],
  },
  {
    id: 'zebrafish', name: ['Zebra fish', 'Poisson-zèbre'], pic: zebrafish, has: { fins: 1, scales: 1, water: 1, fish: 1, stripes: 1 },
    fact: ['A zebra fish’s stripes go along its body, not up and down.', 'Les rayures du poisson-zèbre vont le long du corps, pas de haut en bas.'],
  },
  {
    id: 'gecko', name: ['Gecko', 'Gecko'], pic: gecko, has: { legs: 4, scales: 1 },
    fact: ['A gecko can walk up a wall and across a ceiling.', 'Un gecko peut marcher sur un mur et au plafond.'],
  },
  {
    id: 'housefly', name: ['Housefly', 'Mouche'], pic: housefly, has: { legs: 6, wings: 2, insect: 1, flies: 1 },
    fact: ['A housefly has only two wings.', 'Une mouche n’a que deux ailes.'],
  },
  {
    id: 'hoverfly', name: ['Hoverfly', 'Syrphe'], pic: hoverfly, has: { legs: 6, wings: 2, insect: 1, stripes: 1, flies: 1 },
    fact: ['A hoverfly looks like a bee, but it has two wings: it is a fly.', 'Le syrphe ressemble à une abeille, mais il a deux ailes : c’est une mouche.'],
  },
  {
    id: 'ladybird', name: ['Ladybird', 'Coccinelle'], pic: ladybird, has: { legs: 6, wings: 4, insect: 1, spots: 1, flies: 1 },
    fact: ['A ladybird has four wings: two hard red ones and two thin ones.', 'Une coccinelle a quatre ailes : deux dures et rouges, deux fines.'],
  },
  {
    id: 'saola', name: ['Saola', 'Saola'], pic: saola, at: '50% 30%', has: { legs: 4, fur: 1, horns: 1 },
    fact: ['The saola lives in the mountains of Vietnam and Laos. Very few people have seen one.', 'Le saola vit dans les montagnes du Vietnam et du Laos. Très peu de gens en ont vu un.'],
  },
  {
    id: 'slug', name: ['Slug', 'Limace'], pic: slug, has: {},
    fact: ['A slug is like a snail with no shell.', 'Une limace est comme un escargot sans coquille.'],
  },
  {
    id: 'snail', name: ['Snail', 'Escargot'], pic: snail, has: { shell: 1 },
    fact: ['A snail has no legs. It moves on one big foot.', 'Un escargot n’a pas de pattes. Il avance sur un grand pied.'],
  },
  {
    id: 'snake', name: ['Snake', 'Serpent'], pic: snake, has: { scales: 1 },
    fact: ['A snake has no legs. It smells with its tongue.', 'Un serpent n’a pas de pattes. Il sent avec sa langue.'],
  },
  {
    id: 'spider', name: ['Spider', 'Araignée'], pic: spider, has: { legs: 8 },
    fact: ['A spider has eight legs, so it is not an insect.', 'Une araignée a huit pattes : ce n’est pas un insecte.'],
  },
  {
    id: 'lion', name: ['Lion', 'Lion'], pic: lion, has: { legs: 4, fur: 1, big: 1 },
    fact: ['A lion sleeps up to 20 hours a day.', 'Un lion dort jusqu’à 20 heures par jour.'],
  },
  {
    id: 'tiger', name: ['Tiger', 'Tigre'], pic: tiger, has: { legs: 4, fur: 1, stripes: 1, big: 1 },
    fact: ['No two tigers have the same stripes.', 'Il n’y a pas deux tigres avec les mêmes rayures.'],
  },
  {
    id: 'elephant', name: ['Elephant', 'Éléphant'], pic: elephant, has: { legs: 4, big: 1 },
    fact: ['An elephant is the biggest animal that lives on land.', 'L’éléphant est le plus grand animal qui vit sur la terre ferme.'],
  },
  {
    id: 'giraffe', name: ['Giraffe', 'Girafe'], pic: giraffe, has: { legs: 4, fur: 1, spots: 1, big: 1 },
    fact: ['A giraffe has seven bones in its neck, the same as you.', 'Une girafe a sept os dans le cou, comme toi.'],
  },
  {
    // A soft hyphen, so a narrow card breaks it as Hippo-potame.
    id: 'hippo', name: ['Hippo', 'Hippo­potame'], pic: hippo, has: { legs: 4, big: 1, water: 1 },
    fact: ['A hippo spends the day in water, but it cannot swim.', 'Un hippopotame passe la journée dans l’eau, mais il ne sait pas nager.'],
  },
  {
    id: 'horse', name: ['Horse', 'Cheval'], pic: horse, has: { legs: 4, fur: 1, big: 1 },
    fact: ['A horse can sleep standing up.', 'Un cheval peut dormir debout.'],
  },
  {
    id: 'cow', name: ['Cow', 'Vache'], pic: cow, has: { legs: 4, fur: 1, big: 1 },
    fact: ['A cow’s stomach has four parts.', 'L’estomac d’une vache a quatre parties.'],
  },
  {
    id: 'dog', name: ['Dog', 'Chien'], pic: dog, has: { legs: 4, fur: 1 },
    fact: ['Every dog has a different nose print, like your fingerprint.', 'Chaque chien a une truffe unique, comme ton empreinte digitale.'],
  },
  {
    id: 'polarbear', name: ['Polar bear', 'Ours polaire'], pic: polarBear, at: '25% 50%', has: { legs: 4, fur: 1, big: 1 },
    fact: ['A polar bear’s fur looks white, but its skin is black.', 'La fourrure de l’ours polaire paraît blanche, mais sa peau est noire.'],
  },
  {
    id: 'bluewhale', name: ['Blue whale', 'Baleine bleue'], pic: blueWhale, has: { fins: 1, water: 1, big: 1 },
    fact: ['A whale lives in water and has fins, but it is not a fish. It breathes air.', 'La baleine vit dans l’eau et a des nageoires, mais ce n’est pas un poisson. Elle respire de l’air.'],
  },
  {
    id: 'penguin', name: ['Penguin', 'Manchot'], pic: penguin, has: { legs: 2, wings: 2, feathers: 1, water: 1 },
    fact: ['A penguin has wings and feathers, but it cannot fly. It swims.', 'Un manchot a des ailes et des plumes, mais il ne vole pas. Il nage.'],
  },
  {
    id: 'duck', name: ['Duck', 'Canard'], pic: duck, has: { legs: 2, wings: 2, feathers: 1, water: 1, flies: 1 },
    fact: ['A duck’s feathers stay dry in water.', 'Les plumes du canard restent sèches dans l’eau.'],
  },
  {
    id: 'falcon', name: ['Falcon', 'Faucon'], pic: falcon, has: { legs: 2, wings: 2, feathers: 1, flies: 1 },
    fact: ['A falcon diving for food is the fastest animal in the world.', 'Un faucon qui plonge est l’animal le plus rapide du monde.'],
  },
  {
    id: 'turtle', name: ['Sea turtle', 'Tortue de mer'], pic: turtle, has: { legs: 4, shell: 1, scales: 1, water: 1 },
    fact: ['A sea turtle’s legs are flippers. It cannot come out of its shell.', 'Les pattes de la tortue de mer sont des nageoires. Elle ne peut pas sortir de sa carapace.'],
  },
  {
    id: 'octopus', name: ['Octopus', 'Pieuvre'], pic: octopus, has: { water: 1 },
    fact: ['An octopus has eight arms, no legs and three hearts.', 'Une pieuvre a huit bras, pas de pattes et trois cœurs.'],
  },
].map((a) => ({ ...a, id: `animal-${a.id}`, at: a.at || null }))

export const MONSTERS = [
  ['vampire', 'Vampire', 'Vampire', '🧛'],
  ['zombie', 'Zombie', 'Zombie', '🧟'],
  ['witch', 'Witch', 'Sorcière', '🧙‍♀️'],
  ['wizard', 'Wizard', 'Magicien', '🧙‍♂️'],
  ['ghost', 'Ghost', 'Fantôme', '👻'],
  ['pumpkin', 'Pumpkin', 'Citrouille', '🎃'],
  ['bat', 'Bat', 'Chauve-souris', '🦇'],
  ['spider', 'Spider', 'Araignée', '🕷️'],
  ['skull', 'Skull', 'Crâne', '💀'],
  // A soft hyphen, so a narrow card breaks it as Extra-terrestre.
  ['alien', 'Alien', 'Extra­terrestre', '👽'],
  ['robot', 'Robot', 'Robot', '🤖'],
  ['wolf', 'Wolf', 'Loup', '🐺'],
  ['genie', 'Genie', 'Génie', '🧞'],
  ['mermaid', 'Mermaid', 'Sirène', '🧜‍♀️'],
  ['fairy', 'Fairy', 'Fée', '🧚'],
  ['owl', 'Owl', 'Hibou', '🦉'],
  ['cat', 'Black cat', 'Chat noir', '🐈‍⬛'],
  ['troll', 'Troll', 'Troll', '🧌'],
  ['ogre', 'Ogre', 'Ogre', '👹'],
  ['goblin', 'Goblin', 'Gobelin', '👺'],
  ['clown', 'Clown', 'Clown', '🤡'],
  ['dragon', 'Dragon', 'Dragon', '🐉'],
  ['ninja', 'Ninja', 'Ninja', '🥷'],
  ['elf', 'Elf', 'Elfe', '🧝'],
].map(([id, en, fr, emoji]) => ({ id: `monster-${id}`, name: [en, fr], emoji }))

// `thing`: what the player is looking for, singular and plural, for the
// board's own sentences ("Mr Bowen is choosing a secret animal").
export const BOARDS = {
  animals: {
    id: 'animals',
    title: ['Animals', 'Animaux'],
    cards: ANIMALS,
    thing: [['animal', 'animals'], ['animal', 'animaux']],
  },
  monsters: {
    id: 'monsters',
    title: ['Monsters', 'Monstres'],
    cards: MONSTERS,
    thing: [['monster', 'monsters'], ['monstre', 'monstres']],
  },
}

export const BOARD_IDS = ['animals', 'monsters']

/** A card's name in the deck's language ('fr', else English). */
export const nameOf = (card, lang) => (card ? card.name[lang === 'fr' ? 1 : 0] : '')
