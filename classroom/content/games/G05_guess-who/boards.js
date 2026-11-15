// content/games/G05_guess-who/boards.js
// The two boards. Each card is { id, name: [English, French], pic | emoji }.
//
//   animals    the 21 animals of Science 4.4 Using keys, in the same openly
//              licensed photographs (images/CREDITS.json, copied from
//              y7-science/U04_4/images/ with its entries). `has` lists what a
//              key asks about, so the ideas under the question box are the
//              key's own questions, offered only while they split the animals
//              still up (questions.js). It never answers anything: Mr Bowen
//              does, on his phone.
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

// legs and wings are counts; everything else is there (1) or not.
// `at`: where the photo is cropped from, when the middle is not the animal.
export const ANIMALS = [
  ['ant', 'Ant', 'Fourmi', ant, { legs: 6, insect: 1 }],
  ['bee', 'Bee', 'Abeille', bee, { legs: 6, wings: 4, insect: 1, stripes: 1 }],
  ['butterfly', 'Butterfly', 'Papillon', butterfly, { legs: 6, wings: 4, insect: 1 }],
  ['chicken', 'Chicken', 'Poule', chicken, { legs: 2, wings: 2, feathers: 1 }],
  ['crab', 'Crab', 'Crabe', crab, { legs: 10, shell: 1, water: 1 }],
  ['dragonfly', 'Dragonfly', 'Libellule', dragonfly, { legs: 6, wings: 4, insect: 1 }],
  ['earthworm', 'Earthworm', 'Ver de terre', earthworm, { rings: 1 }],
  ['carp', 'Carp', 'Carpe', carp, { fins: 1, scales: 1, water: 1, fish: 1 }],
  ['clownfish', 'Clown fish', 'Poisson-clown', clownfish, { fins: 1, scales: 1, water: 1, fish: 1, stripes: 1 }],
  ['hornshark', 'Horn shark', 'Requin dormeur', hornShark, { fins: 1, scales: 1, water: 1, fish: 1, spots: 1 }],
  ['lionfish', 'Lionfish', 'Poisson-lion', lionfish, { fins: 1, scales: 1, water: 1, fish: 1, stripes: 1 }],
  ['zebrafish', 'Zebra fish', 'Poisson-zèbre', zebrafish, { fins: 1, scales: 1, water: 1, fish: 1, stripes: 1 }],
  ['gecko', 'Gecko', 'Gecko', gecko, { legs: 4, scales: 1 }],
  ['housefly', 'Housefly', 'Mouche', housefly, { legs: 6, wings: 2, insect: 1 }],
  ['hoverfly', 'Hoverfly', 'Syrphe', hoverfly, { legs: 6, wings: 2, insect: 1, stripes: 1 }],
  ['ladybird', 'Ladybird', 'Coccinelle', ladybird, { legs: 6, wings: 4, insect: 1, spots: 1 }],
  ['saola', 'Saola', 'Saola', saola, { legs: 4, fur: 1, horns: 1 }, '50% 30%'],
  ['slug', 'Slug', 'Limace', slug, {}],
  ['snail', 'Snail', 'Escargot', snail, { shell: 1 }],
  ['snake', 'Snake', 'Serpent', snake, { scales: 1 }],
  ['spider', 'Spider', 'Araignée', spider, { legs: 8 }],
].map(([id, en, fr, pic, has, at = null]) => ({ id: `animal-${id}`, name: [en, fr], pic, at, has }))

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
