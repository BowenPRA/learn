// content/y7-science/U04_4/keys.js
// The keys the widgets walk, as data: each question is [English, French], each
// branch is { yes, no }, and a branch ends in a name. The diagrams draw the
// same keys with their <text> written out literally (diagrams.js), so a
// change here is a change there too.
//
//   BOOK   the key on page 139: crab, dragonfly, housefly, earthworm, slug.
//          Its numbered version (page 140) keeps the book's numbers, so the
//          dragonfly is 1a, 2a, 4a and the earthworm 1b, 3a (Question 1).
//   FISH   the key in Think like a scientist (page 142): A horn shark,
//          B dragon fish (a lionfish), C zebra fish, D clown fish.

export const NAMES = {
  crab: ['crab', 'crabe'],
  dragonfly: ['dragonfly', 'libellule'],
  housefly: ['housefly', 'mouche'],
  earthworm: ['earthworm', 'ver de terre'],
  slug: ['slug', 'limace'],
  hornShark: ['horn shark', 'requin dormeur'],
  dragonFish: ['dragon fish', 'poisson-dragon'],
  zebraFish: ['zebra fish', 'poisson-zèbre'],
  clownFish: ['clown fish', 'poisson-clown'],
}

// The book's key, question by question. `path` gives each animal's answers.
export const BOOK = {
  q: {
    legs: ['Does it have legs?', 'A-t-il des pattes ?'],
    six: ['Does it have more than six legs?', 'A-t-il plus de six pattes ?'],
    wings: ['Does it have four wings?', 'A-t-il quatre ailes ?'],
    rings: ['Is its body made up of rings?', 'Son corps est-il fait d’anneaux ?'],
  },
  // question -> [where yes goes, where no goes]
  tree: {
    legs: ['six', 'rings'],
    six: ['crab', 'wings'],
    wings: ['dragonfly', 'housefly'],
    rings: ['earthworm', 'slug'],
  },
  root: 'legs',
}

// The numbered key (page 140): four pairs. Each line: [English, French, where it goes].
// A number means "go to"; a word is a name.
export const NUMBERED = [
  { n: 1, a: ['It has legs.', 'Il a des pattes.', 2], b: ['It does not have legs.', 'Il n’a pas de pattes.', 3] },
  { n: 2, a: ['It has exactly six legs.', 'Il a exactement six pattes.', 4], b: ['It has more than six legs.', 'Il a plus de six pattes.', 'crab'] },
  { n: 3, a: ['Its body is made up of rings.', 'Son corps est fait d’anneaux.', 'earthworm'], b: ['Its body is not made up of rings.', 'Son corps n’est pas fait d’anneaux.', 'slug'] },
  { n: 4, a: ['It has four wings.', 'Il a quatre ailes.', 'dragonfly'], b: ['It has two wings.', 'Il a deux ailes.', 'housefly'] },
]

// Each animal's way through both styles: the questions it meets with its
// answers (branching), and the lines it reads (numbered).
export const ROUTES = {
  dragonfly: { branch: [['legs', true], ['six', false], ['wings', true]], steps: ['1a', '2a', '4a'] },
  earthworm: { branch: [['legs', false], ['rings', true]], steps: ['1b', '3a'] },
  crab: { branch: [['legs', true], ['six', true]], steps: ['1a', '2b'] },
  slug: { branch: [['legs', false], ['rings', false]], steps: ['1b', '3b'] },
  housefly: { branch: [['legs', true], ['six', false], ['wings', false]], steps: ['1a', '2a', '4b'] },
}

export const FISH = {
  q: {
    stripes: ['Does it have stripes?', 'A-t-il des rayures ?'],
    vertical: ['Are the stripes vertical?', 'Rayures verticales ?'],
    spines: ['Do the fins have spines?', 'Nageoires à épines ?'],
  },
  tree: {
    stripes: ['vertical', 'hornShark'],
    vertical: ['spines', 'zebraFish'],
    spines: ['dragonFish', 'clownFish'],
  },
  root: 'stripes',
  // the four fish in the book's order, A to D, with their answers
  fish: [
    { letter: 'A', name: 'hornShark', branch: [['stripes', false]] },
    { letter: 'B', name: 'dragonFish', branch: [['stripes', true], ['vertical', true], ['spines', true]] },
    { letter: 'C', name: 'zebraFish', branch: [['stripes', true], ['vertical', false]] },
    { letter: 'D', name: 'clownFish', branch: [['stripes', true], ['vertical', true], ['spines', false]] },
  ],
}
