// content/y7-science/U03_6/slides.js
// Year 7 Science · 3.6 Changes in energy. One 50-minute period, after 3.5
// (Energy). Source: Learner's Book pages 111–116 (Unit 3 Forces and energy).
//
// ENGLISH AND FRENCH ONLY, like every Year 7 deck from Unit 4 / 15 October:
// every string has an …Fr twin and no …Vn twin. The diagrams stay in English.
//
// THE ARC (the shape of Coffee, Carbon and Stars, 3.4 and 3.5; plan.js has
// the timings). Three short commands, one for each part:
//   Change it   how high will a tennis ball bounce, dropped from 2 m? The
//               bouncing ball, said before each press: gravitational, kinetic,
//               elastic, kinetic, gravitational — 1.1 m, not 2. Why not? Some
//               went to sound and heat. Energy changes (Question 1). An event
//               (a book falls) or a process (wood burns).
//   Draw it     the book's three diagrams: boxes and arrows. Rub your hands:
//               kinetic to thermal. Charging a phone: which way? (vote) Into
//               the battery. From… To…, everyone standing, with 3.5's eight
//               actions. Questions 2–3 on whiteboards. The gas power station:
//               four boxes, three arrows (the drawing).
//   Follow it   the same wind, useful (Bạc Liêu) or dangerous (Typhoon Yagi in
//               Hà Nội). What happens next? Mr Bowen heats his coffee with a
//               candle. The book's candle experiment: where did the energy go?
//               Freezing water: does cold go in, or heat come out? (vote, the
//               book's Activity) Heat moves from hotter to colder.
//
// The goals slide (2) and the checklist (19) say the same three things, so
// the lesson ends where it said it would; the starter's ball comes back on
// slide 4, and its lost energy is the question 3.7 answers.
//
// COPY-DOWN: 5 written panels — energy changes (5), event and process (6),
// energy-change diagram (7), useful energy change (14), hotter to colder (18)
// — and 1 drawing: the gas power station's four boxes (13). Each panel is the
// definition only; the line under it is read, not copied.
//
// WRITING RULE (the 2.5 density): one hook line, short sentences, and the body
// never repeats the write note, a label or the caption.

import { DIAGRAMS } from './diagrams.js'
import { BouncingBall } from './bounce.jsx'
import { FromTo } from './fromto.jsx'
import { CandleStory } from './story.jsx'
import { BallFilm } from './film.jsx'

const TEAL = '#0087a8'
const PURPLE = '#5c2483'
const ORANGE = '#c25e12'
const GREEN = '#4a8b23'
const BLUE = '#1a5fa8'

export const slides = [
  // ════════════════════════════════════════════════════════════════════════
  // CHANGE IT — energy changes when something happens
  // ════════════════════════════════════════════════════════════════════════

  // 1. Hero + starter: how high will it bounce?
  {
    layout: 'hero',
    color: ORANGE,
    icon: 'Repeat',
    brand: 'Year 7 Science',
    brandFr: 'Sciences 7e année',
    eyebrow: '3.6 · Forces and energy',
    eyebrowFr: '3.6 · Forces et énergie',
    title: 'Changes in Energy',
    titleFr: 'L’énergie change',
    card: {
      icon: 'ArrowDown',
      badge: 'Starter',
      badgeFr: 'Pour commencer',
      text: 'Mr Bowen drops a tennis ball from **2 m**. How high will it **bounce**? **Guess** in centimetres and write it down.',
      textFr: 'M. Bowen lâche une balle de tennis de **2 m**. À quelle hauteur va-t-elle **rebondir** ? **Devine** en centimètres et écris-le.',
    },
  },

  // 2. Today's goals (the checklist on slide 19 ticks off the same three)
  {
    layout: 'compare',
    accent: TEAL,
    icon: 'Target',
    eyebrow: 'Today',
    eyebrowFr: 'Aujourd’hui',
    title: 'Today You Will…',
    titleFr: 'Aujourd’hui, tu vas…',
    text: 'Learn how **energy** changes when things **happen**.',
    textFr: 'Apprendre comment l’**énergie** change quand il se **passe** quelque chose.',
    columns: [
      {
        heading: 'Change it',
        headingFr: 'La transformer',
        accent: ORANGE,
        icon: 'Repeat',
        inlineSvg: DIAGRAMS.PIC_CHANGE_IT,
        caption: 'See energy change as a ball bounces.',
        captionFr: 'Voir l’énergie d’une balle changer.',
      },
      {
        heading: 'Draw it',
        headingFr: 'La dessiner',
        accent: TEAL,
        icon: 'PenLine',
        inlineSvg: DIAGRAMS.PIC_DRAW_IT,
        caption: 'Draw energy changes with arrows.',
        captionFr: 'Dessiner les changements en flèches.',
      },
      {
        heading: 'Follow it',
        headingFr: 'La suivre',
        accent: PURPLE,
        icon: 'MoveRight',
        inlineSvg: DIAGRAMS.PIC_FOLLOW_IT,
        caption: 'Follow where the energy goes.',
        captionFr: 'Suivre où va l’énergie.',
      },
    ],
  },

  // 3. The stepper: the bouncing ball
  {
    layout: 'showcase',
    accent: ORANGE,
    icon: 'ArrowDown',
    eyebrow: 'Say it first',
    eyebrowFr: 'Dis-le d’abord',
    title: 'The Bouncing Ball',
    titleFr: 'La balle qui rebondit',
    widget: BouncingBall,
    caption: 'Before each press, say which **store** will be **biggest**.',
    captionFr: 'Avant chaque clic, dis quelle **réserve** sera la **plus grande**.',
  },

  // 4. Back to the starter: why not 2 m?
  {
    layout: 'statement',
    accent: PURPLE,
    eyebrow: 'Back to the starter',
    eyebrowFr: 'Retour au début',
    title: 'Why Not 2 m?',
    titleFr: 'Pourquoi pas 2 m ?',
    text: 'It bounced to about **1.1 m**. Why not back to **2 m**?',
    textFr: 'Elle a rebondi à environ **1.1 m**. Pourquoi pas jusqu’à **2 m** ?',
    sub: 'Try it: watch Mr Bowen drop a real ball from 2 m.',
    subFr: 'Essaie : regarde M. Bowen lâcher une vraie balle de 2 m.',
    reveal: {
      label: 'Answer',
      labelFr: 'Réponse',
      answer: 'At the bounce, some energy changed to **sound** and **heat**. It cannot lift the ball.',
      answerFr: 'Au rebond, une partie de l’énergie est devenue du **son** et de la **chaleur**. Elle ne peut plus soulever la balle.',
    },
  },

  // 5. Energy changes (write): the book's Question 1
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Repeat',
    eyebrow: 'Key word · Question 1',
    eyebrowFr: 'Mot clé · Question 1',
    title: 'Energy Changes',
    titleFr: 'L’énergie se transforme',
    ratio: 45,
    widget: BallFilm,
    content: 'A big gym ball, slowed down: the bottom goes **flat**, then round again.',
    contentFr: 'Un gros ballon de gym, au ralenti : le bas s’**aplatit**, puis redevient rond.',
    notes: [
      {
        tone: 'write',
        text: 'When something **happens**, energy is **changed** or **transferred**.',
        textFr: 'Quand quelque chose se **passe**, l’énergie est **transformée** ou **transférée**.',
      },
      {
        tone: 'info',
        badge: false,
        text: 'The bounce: **kinetic** → **elastic potential** → **kinetic**.',
        textFr: 'Le rebond : **cinétique** → **élastique** → **cinétique**.',
      },
    ],
  },

  // 6. Event and process (write)
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Flame',
    eyebrow: 'Key words · page 113',
    eyebrowFr: 'Mots clés · page 113',
    title: 'An Event or a Process',
    titleFr: 'Événement ou processus',
    ratio: 45,
    inlineSvg: DIAGRAMS.EVENT_PROCESS,
    content: 'A ball **bounces**. A candle **burns**. Event or process?',
    contentFr: 'Une balle **rebondit**. Une bougie **brûle**. Événement ou processus ?',
    notes: [
      {
        tone: 'write',
        text: '**Event:** something that happens once, like a book falling.\n**Process:** something that keeps going, like burning.',
        textFr: '**Événement (event) :** quelque chose qui arrive une fois, comme un livre qui tombe.\n**Processus (process) :** quelque chose qui continue, comme une combustion.',
      },
    ],
  },

  // ════════════════════════════════════════════════════════════════════════
  // DRAW IT — energy-change diagrams
  // ════════════════════════════════════════════════════════════════════════

  // 7. Energy-change diagrams (write): the book's three
  {
    layout: 'split',
    accent: TEAL,
    icon: 'PenLine',
    eyebrow: 'Key word · page 113',
    eyebrowFr: 'Mot clé · page 113',
    title: 'Energy-Change Diagrams',
    titleFr: 'Les schémas de transformation',
    ratio: 45,
    inlineSvg: DIAGRAMS.BOOK_DIAGRAMS,
    content: 'A television: **two** arrows from **one** box.',
    contentFr: 'Une télévision : **deux** flèches depuis **une** case.',
    notes: [
      {
        tone: 'write',
        text: '**Energy-change diagram:** a box for each kind of energy, and an arrow for each change.',
        textFr: '**Schéma de transformation (energy-change diagram) :** une case pour chaque forme d’énergie, et une flèche pour chaque changement.',
      },
      {
        tone: 'info',
        badge: false,
        text: 'Read each arrow as **“to”**: chemical **to** thermal.',
        textFr: 'Lis chaque flèche comme **« to »** (en) : chemical **to** thermal.',
      },
    ],
  },

  // 8. Rub your hands: kinetic to thermal
  {
    layout: 'statement',
    accent: PURPLE,
    eyebrow: 'Try it · everyone',
    eyebrowFr: 'Essaie · tout le monde',
    title: 'Rub Your Hands',
    titleFr: 'Frotte-toi les mains',
    text: 'Rub your hands together, **fast**, for 10 seconds. What do you **feel**?',
    textFr: 'Frotte-toi les mains, **vite**, pendant 10 secondes. Que **sens**-tu ?',
    reveal: {
      label: 'The change',
      labelFr: 'Le changement',
      answer: 'They get **warm**: **kinetic → thermal**.',
      answerFr: 'Elles **chauffent** : **kinetic → thermal** (cinétique en thermique).',
    },
  },

  // 9. Vote: charging a phone
  {
    layout: 'compare',
    accent: PURPLE,
    icon: 'Hand',
    eyebrow: 'Vote with one hand',
    eyebrowFr: 'Vote avec une main',
    title: 'Charging a Phone',
    titleFr: 'Charger un téléphone',
    text: 'Mr Bowen **charges** his phone. Which energy change?',
    textFr: 'M. Bowen **charge** son téléphone. Quel changement d’énergie ?',
    columns: [
      { heading: 'A · left hand up', headingFr: 'A · main gauche levée', accent: BLUE, icon: 'Hand', inlineSvg: DIAGRAMS.ANS_CHARGE_IN },
      { heading: 'B · right hand up', headingFr: 'B · main droite levée', accent: ORANGE, icon: 'Hand', inlineSvg: DIAGRAMS.ANS_CHARGE_OUT },
    ],
  },

  // 10. Answer A: into the battery
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Zap',
    eyebrow: 'Answer: A',
    eyebrowFr: 'Réponse : A',
    title: 'Into the Battery',
    titleFr: 'Dans la batterie',
    ratio: 45,
    inlineSvg: DIAGRAMS.CHARGING,
    content: 'A phone battery is a **chemical** store, not an electrical one.',
    contentFr: 'Une batterie de téléphone est une réserve **chimique**, pas électrique.',
  },

  // 11. From… To…: the whole class, standing
  {
    layout: 'showcase',
    accent: GREEN,
    icon: 'Trophy',
    eyebrow: 'A game · everyone stands',
    eyebrowFr: 'Un jeu · tout le monde debout',
    title: 'From… To…',
    titleFr: 'De… À…',
    widget: FromTo,
    caption: '**From!** Do the first action. **To!** Do the second. The last ones standing win a prize ticket!',
    captionFr: '**De !** Fais le premier geste. **À !** Fais le second. Les derniers debout gagnent un ticket !',
  },

  // 12. Questions 2–3 on whiteboards
  {
    layout: 'statement',
    accent: PURPLE,
    eyebrow: 'Questions 2–3 · whiteboards',
    eyebrowFr: 'Questions 2–3 · ardoises',
    title: 'Draw These',
    titleFr: 'Dessine-les',
    text: 'Draw the energy change: a **radio**, a **bus**, a **ball rolling down a hill**.',
    textFr: 'Dessine les changements : une **radio**, un **bus**, une **balle qui descend une pente**.',
    reveal: {
      label: 'Answers',
      labelFr: 'Réponses',
      answer: 'Radio: **electrical → sound**. Bus: **chemical → kinetic**. Ball: **gravitational potential → kinetic**.',
      answerFr: 'Radio : **electrical → sound**. Bus : **chemical → kinetic**. Balle : **gravitational potential → kinetic**.',
    },
  },

  // 13. Draw This: the gas power station (page 113)
  {
    layout: 'showcase',
    accent: ORANGE,
    icon: 'Pencil',
    eyebrow: 'Draw this · page 113',
    eyebrowFr: 'À dessiner · page 113',
    title: 'A Gas Power Station',
    titleFr: 'Une centrale à gaz',
    inlineSvg: DIAGRAMS.POWER_STATION,
    drawThis: true,
    caption: 'Copy the **four boxes** and **three arrows**. Then: where do the wires take the energy **next**?',
    captionFr: 'Recopie les **quatre cases** et les **trois flèches**. Puis : où les fils emmènent-ils l’énergie **ensuite** ?',
  },

  // ════════════════════════════════════════════════════════════════════════
  // FOLLOW IT — where the energy goes
  // ════════════════════════════════════════════════════════════════════════

  // 14. Useful or dangerous? (write)
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Wind',
    eyebrow: 'Key word · page 113',
    eyebrowFr: 'Mot clé · page 113',
    title: 'Useful or Dangerous?',
    titleFr: 'Utile ou dangereux ?',
    ratio: 45,
    inlineSvg: DIAGRAMS.USEFUL_DANGER,
    content: 'The same moving air can light a city, or knock down a tree.',
    contentFr: 'Le même air en mouvement peut éclairer une ville, ou abattre un arbre.',
    notes: [
      {
        tone: 'write',
        text: '**Useful energy change:** a change that does what we want.',
        textFr: '**Changement utile (useful energy change) :** un changement qui fait ce que l’on veut.',
      },
      {
        tone: 'info',
        badge: false,
        text: 'A candle’s useful change: **chemical to light**.',
        textFr: 'Le changement utile d’une bougie : **chemical to light** (chimique en lumineuse).',
      },
    ],
  },

  // 15. What happens next? Mr Bowen's candle coffee (deadpan)
  {
    layout: 'showcase',
    accent: BLUE,
    icon: 'Coffee',
    eyebrow: 'What happens next?',
    eyebrowFr: 'Que se passe-t-il ensuite ?',
    title: 'Mr Bowen’s Candle',
    titleFr: 'La bougie de M. Bowen',
    widget: CandleStory,
    caption: 'Before each step, **predict**: what happens next?',
    captionFr: 'Avant chaque étape, **prédis** : que se passe-t-il ensuite ?',
  },

  // 16. The book's candle experiment (page 115)
  {
    layout: 'split',
    accent: PURPLE,
    icon: 'FlaskConical',
    eyebrow: 'Think like a scientist · page 115',
    eyebrowFr: 'Pense comme un scientifique · page 115',
    title: 'The Candle Experiment',
    titleFr: 'L’expérience de la bougie',
    ratio: 45,
    inlineSvg: DIAGRAMS.CANDLE,
    content: 'A candle heats some cooking oil. This time we want **heat**: **chemical → thermal**.',
    contentFr: 'Une bougie chauffe de l’huile. Cette fois, on veut de la **chaleur** : **chemical → thermal**.',
    reveal: {
      prompt: 'Where did the candle’s energy go?',
      promptFr: 'Où est partie l’énergie de la bougie ?',
      label: 'Answer',
      labelFr: 'Réponse',
      answer: 'Some heated the **oil**. The rest heated the **glass**, the **tripod** and the **air**.',
      answerFr: 'Une partie a chauffé l’**huile**. Le reste a chauffé le **verre**, le **trépied** et l’**air**.',
    },
  },

  // 17. Vote: freezing water (the book's Activity, page 114)
  {
    layout: 'compare',
    accent: PURPLE,
    icon: 'Hand',
    eyebrow: 'Vote with one hand',
    eyebrowFr: 'Vote avec une main',
    title: 'Freezing Water',
    titleFr: 'L’eau qui gèle',
    text: 'Water turns to **ice** in the freezer. What moves?',
    textFr: 'L’eau devient de la **glace** au congélateur. Qu’est-ce qui bouge ?',
    columns: [
      { heading: 'A · left hand up', headingFr: 'A · main gauche levée', accent: BLUE, icon: 'Hand', inlineSvg: DIAGRAMS.ANS_COLD_IN },
      { heading: 'B · right hand up', headingFr: 'B · main droite levée', accent: ORANGE, icon: 'Hand', inlineSvg: DIAGRAMS.ANS_HEAT_OUT },
    ],
  },

  // 18. Answer B: heat comes out (write)
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Snowflake',
    eyebrow: 'Answer: B · page 114',
    eyebrowFr: 'Réponse : B · page 114',
    title: 'Heat Comes Out',
    titleFr: 'La chaleur sort',
    ratio: 45,
    inlineSvg: DIAGRAMS.FREEZER,
    content: 'Cold does not move. **Heat** moves.',
    contentFr: 'Le froid ne bouge pas. La **chaleur** bouge.',
    notes: [
      {
        tone: 'write',
        text: '**Thermal** energy moves from **hotter** things to **colder** things.',
        textFr: 'L’énergie **thermique** passe des choses plus **chaudes** aux choses plus **froides**.',
      },
      {
        tone: 'info',
        badge: false,
        text: 'Feel the back of a freezer: it is warm. The freezer **pumps** the heat out there.',
        textFr: 'Touche l’arrière d’un congélateur : c’est chaud. Il y **pompe** la chaleur.',
      },
    ],
  },

  // 19. Checklist: slide 2's goals, ticked off
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
      { text: 'Say how energy **changes** in an **event** or a **process**.', textFr: 'Dire comment l’énergie **change** dans un **événement** ou un **processus**.' },
      { text: 'Draw an **energy-change diagram** with boxes and arrows.', textFr: 'Dessiner un **schéma de transformation** avec des cases et des flèches.' },
      { text: 'Give a **useful** energy change, and a dangerous one.', textFr: 'Donner un changement **utile**, et un dangereux.' },
      { text: 'Say where **heat** goes: from **hotter** to **colder**.', textFr: 'Dire où va la **chaleur** : du plus **chaud** au plus **froid**.' },
    ],
  },

  // 20. Exit
  {
    layout: 'hero',
    color: ORANGE,
    icon: 'Target',
    brand: 'Year 7 Science',
    brandFr: 'Sciences 7e année',
    eyebrow: 'Exit question',
    eyebrowFr: 'Question de sortie',
    title: 'Tết Fireworks',
    titleFr: 'Les feux d’artifice du Têt',
    subtitle: 'Draw the **energy-change diagram** for a firework.',
    subtitleFr: 'Dessine le **schéma de transformation** d’un feu d’artifice.',
    reveal: {
      label: 'Answer',
      labelFr: 'Réponse',
      answer: '**Chemical** → **light**, **sound**, **thermal** and **kinetic**. Four arrows from one box.',
      answerFr: '**Chemical** → **light**, **sound**, **thermal** et **kinetic**. Quatre flèches depuis une case.',
    },
  },
]
