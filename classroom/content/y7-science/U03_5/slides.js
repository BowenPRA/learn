// content/y7-science/U03_5/slides.js
// Year 7 Science · 3.5 Energy. One 50-minute period, after 3.4 (Tides).
// Source: Learner's Book pages 105–110 (Unit 3 Forces and energy).
//
// ENGLISH AND FRENCH ONLY, like every Year 7 deck from Unit 4 / 15 October:
// every string has an …Fr twin and no …Vn twin. The diagrams stay in English.
//
// THE ARC (the shape of Coffee, Carbon and Stars and 3.4; plan.js has the
// timings). Three questions, one for each part:
//   How much?   one kettle of water: how many floors of stairs? Mr Bowen's
//               morning in joules, said before each press: 6 000, 10 000,
//               20 000, then the kettle's 400 000 J (11 times all the rest)
//               zooms the chart out. Back to the starter: 200 floors. Energy
//               (runners). The joule: 1 J lifts an apple 1 metre.
//   What kind?  a book on a high shelf: does it have energy? (vote) Yes: lifted
//               from the floor, its energy is stored. Energy store; the five
//               stores (the book's table). How does energy get from a battery
//               to a bulb? Energy transfer (arrows on the wire); the three
//               transfers. An action for each of the eight (the
//               book's "how will you remember them?"), then Name That Energy,
//               everyone standing. The bus going uphill: name each energy
//               (a leader points at the clue, a "?" waits for the word), then
//               copy it. A rocket launch: how many can you find?
//   How long?   what happens next? Mr Bowen's coffee goes cold while 30
//               students ask questions. Hot coffee or banana: which has more
//               energy? (vote) The banana, and it keeps it. Will it last a
//               year? (six photographs, thumbs up or down). Which stores last.
//
// The goals slide (2) and the checklist (21) say the same three things, so
// the lesson ends where it said it would; the starter's kettle comes back on
// slide 4, and Mr Bowen's coffee runs through all three parts.
//
// COPY-DOWN: 5 written panels — energy (5), joule (6), energy store (8),
// energy transfer (10), which stores last (20) — and 1 drawing: the bus with
// its 8 labels (14). Each panel is the definition only; the line under it is
// read, not copied. The other key words (the eight, fuel, luminous) are
// taught by the table, the actions, the game and the bus, not copied one by
// one.
//
// WRITING RULE (the 2.5 density): one hook line, short sentences, and the body
// never repeats the write note, a label or the caption.

import { DIAGRAMS } from './diagrams.js'
import { MorningJoules } from './morning.jsx'
import { NameThatEnergy, BusEnergies } from './kinds.jsx'
import { CoffeeStory } from './story.jsx'
import { LastsAYear, RocketFilm } from './lasting.jsx'

const TEAL = '#0087a8'
const PURPLE = '#5c2483'
const ORANGE = '#c25e12'
const GREEN = '#4a8b23'
const BLUE = '#1a5fa8'
const RED = '#c8102e'

export const slides = [
  // ════════════════════════════════════════════════════════════════════════
  // HOW MUCH? — energy, measured in joules
  // ════════════════════════════════════════════════════════════════════════

  // 1. Hero + starter: one kettle, how many floors?
  {
    layout: 'hero',
    color: RED,
    icon: 'Zap',
    brand: 'Year 7 Science',
    brandFr: 'Sciences 7e année',
    eyebrow: '3.5 · Forces and energy',
    eyebrowFr: '3.5 · Forces et énergie',
    title: 'Energy',
    titleFr: 'L’énergie',
    card: {
      icon: 'Coffee',
      badge: 'Starter',
      badgeFr: 'Pour commencer',
      text: 'Mr Bowen boils **1 litre** of water for his coffee. With the **same energy**, how many **floors** of stairs could he climb? **Guess a number** and write it down.',
      textFr: 'M. Bowen fait bouillir **1 litre** d’eau pour son café. Avec la **même énergie**, combien d’**étages** pourrait-il monter ? **Devine un nombre** et écris-le.',
    },
  },

  // 2. Today's goals (the checklist on slide 21 ticks off the same three)
  {
    layout: 'compare',
    accent: TEAL,
    icon: 'Target',
    eyebrow: 'Today',
    eyebrowFr: 'Aujourd’hui',
    title: 'Today You Will…',
    titleFr: 'Aujourd’hui, tu vas…',
    text: 'Find out what **energy** is, and how long it **lasts**.',
    textFr: 'Découvrir ce qu’est l’**énergie**, et combien de temps elle **dure**.',
    columns: [
      {
        heading: 'How much?',
        headingFr: 'Combien ?',
        accent: ORANGE,
        icon: 'Gauge',
        inlineSvg: DIAGRAMS.PIC_HOW_MUCH,
        caption: 'Measure the energy Mr Bowen uses.',
        captionFr: 'Mesurer l’énergie de M. Bowen.',
      },
      {
        heading: 'What kind?',
        headingFr: 'Quel type ?',
        accent: TEAL,
        icon: 'Search',
        inlineSvg: DIAGRAMS.PIC_WHAT_KIND,
        caption: 'Spot 8 kinds of energy around you.',
        captionFr: 'Repérer 8 types d’énergie.',
      },
      {
        heading: 'How long?',
        headingFr: 'Combien de temps ?',
        accent: PURPLE,
        icon: 'Timer',
        inlineSvg: DIAGRAMS.PIC_HOW_LONG,
        caption: 'Find which energy lasts longest.',
        captionFr: 'Trouver l’énergie qui dure le plus.',
      },
    ],
  },

  // 3. The stepper: Mr Bowen's morning in joules
  {
    layout: 'showcase',
    accent: ORANGE,
    icon: 'Gauge',
    eyebrow: 'Say it first',
    eyebrowFr: 'Dis-le d’abord',
    title: 'Mr Bowen’s Morning',
    titleFr: 'La matinée de M. Bowen',
    widget: MorningJoules,
    caption: 'Work out the **joules (J)** for each step **before** they are shown.',
    captionFr: 'Calcule les **joules (J)** de chaque étape **avant** qu’ils s’affichent.',
  },

  // 4. Back to the starter
  {
    layout: 'statement',
    accent: PURPLE,
    eyebrow: 'Back to the starter · whiteboards',
    eyebrowFr: 'Retour au début · ardoises',
    title: 'How Many Floors?',
    titleFr: 'Combien d’étages ?',
    text: '**One kettle** of water: how many **floors** of stairs?',
    textFr: '**Une bouilloire** d’eau : combien d’**étages** ?',
    sub: 'Boil 1 litre: 400 000 J. One floor of stairs: 2 000 J.',
    subFr: 'Bouillir 1 litre : 400 000 J. Un étage : 2 000 J.',
    reveal: {
      label: 'Answer',
      labelFr: 'Réponse',
      answer: '400 000 ÷ 2 000 = **200 floors**.\nThe tallest building in Vietnam, Landmark 81, has **81**.',
      answerFr: '400 000 ÷ 2 000 = **200 étages**.\nLe plus haut immeuble du Vietnam, le Landmark 81, en a **81**.',
    },
  },

  // 5. Energy (write), beside the real thing
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Zap',
    eyebrow: 'Key word · page 106',
    eyebrowFr: 'Mot clé · page 106',
    title: 'What Is Energy?',
    titleFr: 'Qu’est-ce que l’énergie ?',
    ratio: 45,
    inlineSvg: DIAGRAMS.RUNNERS,
    content: 'Climbing, running, boiling water: they all need **energy**.',
    contentFr: 'Monter, courir, faire bouillir de l’eau : tout cela demande de l’**énergie**.',
    notes: [
      {
        tone: 'write',
        text: '**Energy:** something that must be changed or **transferred** to make anything happen.',
        textFr: '**Énergie (energy) :** ce qui doit être transformé ou **transféré** pour que quelque chose se passe.',
      },
      {
        tone: 'info',
        badge: false,
        text: 'These runners have **kinetic** energy: they are moving.',
        textFr: 'Ces coureurs ont de l’énergie **cinétique** (kinetic) : ils bougent.',
      },
    ],
  },

  // 6. The joule (write): the book's three numbers
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Gauge',
    eyebrow: 'Key word · page 106',
    eyebrowFr: 'Mot clé · page 106',
    title: 'The Joule',
    titleFr: 'Le joule',
    ratio: 45,
    inlineSvg: DIAGRAMS.JOULES,
    content: '**metres** for length · **kilograms** for mass · **joules** for energy',
    contentFr: 'les **mètres** pour la longueur · les **kilogrammes** pour la masse · les **joules** pour l’énergie',
    notes: [
      {
        tone: 'write',
        text: '**Joule (J):** the unit for measuring energy.',
        textFr: '**Joule (J) :** l’unité qui sert à mesurer l’énergie.',
      },
      {
        tone: 'info',
        badge: false,
        text: 'It is named after **James Joule**, an English scientist (1818–1889).',
        textFr: 'Son nom vient de **James Joule**, un scientifique anglais (1818–1889).',
      },
    ],
  },

  // ════════════════════════════════════════════════════════════════════════
  // WHAT KIND? — stores and transfers
  // ════════════════════════════════════════════════════════════════════════

  // 7. Vote: a book on a shelf
  {
    layout: 'compare',
    accent: PURPLE,
    icon: 'Hand',
    eyebrow: 'Vote with one hand',
    eyebrowFr: 'Vote avec une main',
    title: 'A Book on a Shelf',
    titleFr: 'Un livre sur une étagère',
    text: 'Mr Bowen’s book is on a **high shelf**. It is **not moving**. Does it have **energy**?',
    textFr: 'Le livre de M. Bowen est sur une **étagère haute**. Il **ne bouge pas**. A-t-il de l’**énergie** ?',
    columns: [
      { heading: 'A · left hand up', headingFr: 'A · main gauche levée', accent: BLUE, icon: 'Hand', inlineSvg: DIAGRAMS.ANS_NO },
      { heading: 'B · right hand up', headingFr: 'B · main droite levée', accent: ORANGE, icon: 'Hand', inlineSvg: DIAGRAMS.ANS_YES },
    ],
  },

  // 8. Answer B: energy store (write)
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Boxes',
    eyebrow: 'Answer: B · key word',
    eyebrowFr: 'Réponse : B · mot clé',
    title: 'Energy Store',
    titleFr: 'La réserve d’énergie',
    ratio: 45,
    inlineSvg: DIAGRAMS.SHELF,
    content: '**Yes.** Mr Bowen used energy to lift it. The book **keeps** that energy until it falls.',
    contentFr: '**Oui.** M. Bowen a utilisé de l’énergie pour le soulever. Le livre **garde** cette énergie jusqu’à ce qu’il tombe.',
    notes: [
      {
        tone: 'write',
        text: '**Energy store:** a way that energy is kept until it is used.',
        textFr: '**Réserve d’énergie (energy store) :** une façon de garder l’énergie jusqu’à ce qu’on l’utilise.',
      },
      {
        tone: 'info',
        badge: false,
        text: 'The book has a **gravitational potential** store.',
        textFr: 'Le livre a une réserve **potentielle de pesanteur** (gravitational potential).',
      },
    ],
  },

  // 9. The book's table, part 1: five stores
  {
    layout: 'showcase',
    accent: TEAL,
    icon: 'Boxes',
    eyebrow: 'Page 107 · the table',
    eyebrowFr: 'Page 107 · le tableau',
    title: 'Five Energy Stores',
    titleFr: 'Cinq réserves d’énergie',
    inlineSvg: DIAGRAMS.STORES,
    caption: 'Read them together. Then find **one of each** in this room.',
    captionFr: 'Lisez-les ensemble. Puis trouve **un exemple de chacune** dans la salle.',
  },

  // 10. Energy transfer (write): the book's Question 1
  {
    layout: 'split',
    accent: PURPLE,
    icon: 'ArrowRight',
    eyebrow: 'Key word · Question 1',
    eyebrowFr: 'Mot clé · Question 1',
    title: 'Energy Transfer',
    titleFr: 'Le transfert d’énergie',
    ratio: 45,
    inlineSvg: DIAGRAMS.CIRCUIT,
    content: 'How does energy get from the **battery** to the **bulb**?',
    contentFr: 'Comment l’énergie va-t-elle de la **pile** à l’**ampoule** ?',
    notes: [
      {
        tone: 'write',
        text: '**Energy transfer:** a way that energy moves from one place to another.',
        textFr: '**Transfert d’énergie (energy transfer) :** une façon dont l’énergie passe d’un endroit à un autre.',
      },
    ],
  },

  // 11. The book's table, part 2: three transfers (and thermal, which is both)
  {
    layout: 'showcase',
    accent: PURPLE,
    icon: 'ArrowRight',
    eyebrow: 'Page 107 · the table',
    eyebrowFr: 'Page 107 · le tableau',
    title: 'Three Energy Transfers',
    titleFr: 'Trois transferts d’énergie',
    inlineSvg: DIAGRAMS.TRANSFERS,
    caption: '**Thermal** is on both lists: a hot drink **stores** heat, and **transfers** it to the air.',
    captionFr: 'Le **thermique** est sur les deux listes : une boisson chaude **stocke** la chaleur et la **transfère** à l’air.',
  },

  // 12. How will you remember them? An action each (page 107)
  {
    layout: 'showcase',
    accent: GREEN,
    icon: 'Users',
    eyebrow: 'Remember them · page 107',
    eyebrowFr: 'Les retenir · page 107',
    title: 'An Action for Each One',
    titleFr: 'Un geste pour chacune',
    inlineSvg: DIAGRAMS.ACTIONS,
    caption: 'How will you remember all eight? **Stand up:** say each word and do its action.',
    captionFr: 'Comment retenir les huit ? **Debout :** dis chaque mot et fais son geste.',
  },

  // 13. Name That Energy: the whole class, standing
  {
    layout: 'showcase',
    accent: GREEN,
    icon: 'Trophy',
    eyebrow: 'A game · everyone stands',
    eyebrowFr: 'Un jeu · tout le monde debout',
    title: 'Name That Energy',
    titleFr: 'Quelle énergie ?',
    widget: NameThatEnergy,
    caption: '**3, 2, 1:** everyone does the action at once. Wrong? Sit down. The last ones standing win a prize ticket!',
    captionFr: '**3, 2, 1 :** tout le monde fait le geste en même temps. Faux ? Assieds-toi. Les derniers debout gagnent un ticket !',
  },

  // 14. Draw This: the bus going uphill (page 107)
  {
    layout: 'showcase',
    accent: ORANGE,
    icon: 'Pencil',
    eyebrow: 'Draw this · page 107',
    eyebrowFr: 'À dessiner · page 107',
    title: 'The Bus Going Uphill',
    titleFr: 'Le bus qui monte',
    widget: BusEnergies,
    drawThis: true,
    caption: 'Name the energy at each **?** before it is shown. Then copy the bus and its **8** labels.',
    captionFr: 'Nomme l’énergie à chaque **?** avant qu’elle s’affiche. Puis recopie le bus et ses **8** légendes.',
  },

  // 15. A rocket launch: how many can you find?
  {
    layout: 'showcase',
    accent: BLUE,
    icon: 'Clapperboard',
    eyebrow: 'Watch and listen · pairs',
    eyebrowFr: 'Regarde et écoute · en binôme',
    title: 'How Many Can You Find?',
    titleFr: 'Combien en trouves-tu ?',
    widget: RocketFilm,
    caption: 'A real launch (NASA). List every **store** and **transfer** you see or hear.',
    captionFr: 'Un vrai lancement (NASA). Note chaque **réserve** et chaque **transfert** que tu vois ou entends.',
  },

  // ════════════════════════════════════════════════════════════════════════
  // HOW LONG? — storing energy
  // ════════════════════════════════════════════════════════════════════════

  // 16. What happens next? Mr Bowen's coffee, one panel per press (deadpan)
  {
    layout: 'showcase',
    accent: BLUE,
    icon: 'Coffee',
    eyebrow: 'What happens next?',
    eyebrowFr: 'Que se passe-t-il ensuite ?',
    title: 'Mr Bowen’s Coffee',
    titleFr: 'Le café de M. Bowen',
    widget: CoffeeStory,
    caption: 'Before each step, **predict**: what happens next?',
    captionFr: 'Avant chaque étape, **prédis** : que se passe-t-il ensuite ?',
  },

  // 17. Vote: hot coffee or banana?
  {
    layout: 'compare',
    accent: PURPLE,
    icon: 'Hand',
    eyebrow: 'Vote with one hand',
    eyebrowFr: 'Vote avec une main',
    title: 'Coffee or Banana?',
    titleFr: 'Café ou banane ?',
    text: 'A **hot coffee** or a **banana**: which has more **energy**?',
    textFr: 'Un **café chaud** ou une **banane** : lequel a le plus d’**énergie** ?',
    columns: [
      { heading: 'A · left hand up', headingFr: 'A · main gauche levée', accent: BLUE, icon: 'Hand', inlineSvg: DIAGRAMS.ANS_COFFEE },
      { heading: 'B · right hand up', headingFr: 'B · main droite levée', accent: ORANGE, icon: 'Hand', inlineSvg: DIAGRAMS.ANS_BANANA },
    ],
  },

  // 18. Answer B: the banana, and it keeps its energy
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Scale',
    eyebrow: 'Answer: B · the banana',
    eyebrowFr: 'Réponse : B · la banane',
    title: 'The Banana Wins',
    titleFr: 'La banane gagne',
    ratio: 45,
    inlineSvg: DIAGRAMS.BANANA,
    content: 'The coffee’s **thermal** store goes into the room in an hour. The banana’s **chemical** store lasts for days.',
    contentFr: 'La réserve **thermique** du café part dans la pièce en une heure. La réserve **chimique** de la banane dure des jours.',
    reveal: {
      label: 'And the caffeine?',
      labelFr: 'Et la caféine ?',
      answer: 'Caffeine gives you almost **no** energy. It only stops you feeling tired.',
      answerFr: 'La caféine ne donne presque **pas** d’énergie. Elle t’empêche seulement de te sentir fatigué.',
    },
  },

  // 19. Will it last a year? Six photographs, thumbs up or down
  {
    layout: 'showcase',
    accent: GREEN,
    icon: 'Timer',
    eyebrow: 'Thumbs up or down',
    eyebrowFr: 'Pouce en haut ou en bas',
    title: 'Will It Last a Year?',
    titleFr: 'Ça dure un an ?',
    widget: LastsAYear,
    caption: '**Thumbs up:** it keeps its energy for a year. **Thumbs down:** it does not. Then press the photo.',
    captionFr: '**Pouce en haut :** il garde son énergie un an. **Pouce en bas :** non. Puis clique sur la photo.',
  },

  // 20. Which stores last (write)
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Timer',
    eyebrow: 'Storing energy · page 108',
    eyebrowFr: 'Stocker l’énergie · page 108',
    title: 'Which Stores Last?',
    titleFr: 'Quelles réserves durent ?',
    ratio: 45,
    inlineSvg: DIAGRAMS.LASTING,
    notes: [
      {
        tone: 'write',
        text: '**Chemical** and **gravitational potential** stores can last a long time. **Thermal** and **kinetic** stores do not.',
        textFr: 'Les réserves **chimiques** et **potentielles de pesanteur** peuvent durer longtemps. Les réserves **thermiques** et **cinétiques**, non.',
      },
      {
        tone: 'info',
        badge: false,
        text: 'Coal and oil formed **millions of years** ago, and still hold their energy.',
        textFr: 'Le charbon et le pétrole se sont formés il y a des **millions d’années**, et gardent encore leur énergie.',
      },
    ],
  },

  // 21. Checklist: slide 2's goals, ticked off
  {
    layout: 'stack',
    variant: 'checklist',
    accent: TEAL,
    icon: 'CheckCircle2',
    columns: 2,
    eyebrow: 'Before you leave',
    eyebrowFr: 'Avant de partir',
    title: 'Can You Do These?',
    titleFr: 'Sais-tu faire ceci ?',
    content: '> Check your notebook: **5 written panels** and **1 drawing**.',
    contentFr: '> Vérifie ton cahier : **5 encadrés recopiés** et **1 dessin**.',
    items: [
      { text: 'Say what **energy** is, and measure it in **joules**.', textFr: 'Dire ce qu’est l’**énergie**, et la mesurer en **joules**.' },
      { text: 'Name the 5 energy **stores** and the 3 **transfers**.', textFr: 'Nommer les 5 **réserves** d’énergie et les 3 **transferts**.' },
      { text: 'Give an **example** of each store and transfer.', textFr: 'Donner un **exemple** de chaque réserve et de chaque transfert.' },
      { text: 'Say which **stores** last a long time, and which do not.', textFr: 'Dire quelles **réserves** durent longtemps, et lesquelles non.' },
    ],
  },

  // 22. Exit
  {
    layout: 'hero',
    color: RED,
    icon: 'Target',
    brand: 'Year 7 Science',
    brandFr: 'Sciences 7e année',
    eyebrow: 'Exit question',
    eyebrowFr: 'Question de sortie',
    title: 'A Falling Rock',
    titleFr: 'Un rocher qui tombe',
    subtitle: 'A rock is **falling** off a cliff. Name **two** energy stores it has.',
    subtitleFr: 'Un rocher **tombe** d’une falaise. Nomme **deux** réserves d’énergie qu’il a.',
    reveal: {
      label: 'Answer',
      labelFr: 'Réponse',
      answer: '**Kinetic:** it is moving. **Gravitational potential:** it is still high up.',
      answerFr: '**Cinétique :** il bouge. **Potentielle de pesanteur :** il est encore en hauteur.',
    },
  },
]
