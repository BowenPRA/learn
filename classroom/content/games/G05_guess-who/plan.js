// content/games/G05_guess-who/plan.js
// How to run Guess Who with a class, rendered by src/pages/Plan.jsx.
export const plan = {
  duration: '10–15 minutes as a warm-up (three or four rounds), or 25 minutes with teams',
  objective:
    'Students ask yes-or-no questions in English and decide what each answer rules out. On the Animals board this is Science 4.4 '
    + 'again (a key is a set of yes-or-no questions, and each answer splits the animals in two) and the start of 4.5 Constructing '
    + 'keys: the top prize only comes from questions that split the animals still up into two even groups.',
  materials: [
    'Projector, in Project mode',
    'Your phone: press Phone remote on the deck and scan the QR code. The secret is chosen and every answer is given there',
    'Optional: mini whiteboards, one per team, for "which animals go down?"',
  ],
  vocab: [
    { term: 'Does it have ___?', def: 'the question frame for the Animals board: legs, wings, scales, fins, a shell, feathers.' },
    { term: 'more than / exactly', def: '"more than six legs" and "exactly six legs" are different questions. A spider has more than six; an ant has exactly six.' },
    { term: 'It can\'t be the ___, because ___', def: 'the sentence for putting a card down. Make the class say it before the card goes down.' },
    { term: 'split', def: 'a good question splits the animals into two groups of about the same size.' },
  ],
  timeline: [
    { time: 'Before class', phase: 'Phone', detail: 'Open the game, press Phone remote and scan the QR code. Choose Animals or Monsters on the phone or on the start screen.' },
    { time: '0–2 min', phase: 'Rules', detail: 'Read the three steps on the start screen. Mr Bowen can only say YES or NO. One guess. Fewer questions, more Riverbucks (3 for 4 questions or fewer, 2 for 7, 1 for 9; change them on the phone).' },
    { time: 'each round', phase: 'Pick', detail: 'Press Deal the cards. Tap the secret on your phone (or Random). The projector never shows it.' },
    { time: 'each round', phase: 'Ask', detail: 'A team agrees on one question. Either they say it and you tap YES or NO, or one student types it and presses send. Three ideas sit under the box: ask "Which of these splits the animals best?" before anyone taps one.' },
    { time: 'each answer', phase: 'Put cards down', detail: 'After YES or NO, the class says which cards go down ("It can\'t be the snail, because a snail has no legs") and the student at the laptop taps them. The board never does it for them.' },
    { time: 'end of round', phase: 'Guess', detail: 'Final guess, tap one card, confirm. The phone warns you when they are about to guess and shows which card they tapped. Then Next round, for the next team.' },
  ],
  answers: [
    { q: 'Animals board: the 36 animals', a: 'The 21 from 4.4, in the same photographs: ant, bee, butterfly, chicken, crab, dragonfly, earthworm, carp, clown fish, horn shark, lionfish, zebra fish, gecko, housefly, hoverfly, ladybird, saola, slug, snail, snake, spider. And 15 more: lion, tiger, elephant, giraffe, hippo, horse, cow, dog, polar bear, blue whale, penguin, duck, falcon, sea turtle, octopus. Each round deals 24 at random. The reveal shows one fact about the secret animal.' },
    { q: 'The new traps', a: 'Blue whale: lives in water and has fins, but is not a fish (it breathes air). Penguin: wings and feathers, but cannot fly. Octopus: eight arms, no legs. Sea turtle: legs that are flippers, and a shell.' },
    { q: 'The traps from 4.4', a: 'Spider: more than six legs (8). Ant: exactly six. Bee and ladybird: four wings. Hoverfly and housefly: two. Snail and slug: no legs. Earthworm: body made of rings. Crab: more than six legs and a shell.' },
    { q: 'Why five questions is "perfect"', a: 'Each perfect question halves the animals: 24 → 12 → 6 → 3 → 2 → 1. So four questions needs luck, and the top prize rewards a class that keeps choosing the most even split.' },
    { q: 'A question that is not yes-or-no', a: 'Tap Reword on the phone. The question goes back into the box with "Try again!" and does not count.' },
    { q: 'You tapped the wrong answer', a: 'Tap the answer in the list on the phone: make it YES, make it NO, or take it out. The projector says what changed, so the class can put cards back up.' },
  ],
}
