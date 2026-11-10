// content/y7-science/U03_lab/slides.js
// Year 7 Science · Designing a Lab. The end of 3.1, as its own lesson.
//
// ENGLISH AND FRENCH ONLY (meta.vietnamese: false): every string has an …Fr
// twin and no …Vn twin.
//
// THE ARC: falling things speed up (photo, numbers, Drop Race), so a fall is
// over in half a second. Pairs plan the test, then find out how slow THEY are:
// the ruler catch, first animated (how a ruler can be a clock), then done for
// real. Last, the problem the lab has to solve: too fast for a stopwatch.

import { DIAGRAMS } from '../U03_1/diagrams.js'
import { DropRace } from '../U03_1/widgets.jsx'
import { RulerCatch } from './widgets.jsx'
import strobe from '../U03_1/images/strobe.jpg'

const TEAL = '#0087a8'
const PURPLE = '#5c2483'
const GREEN = '#4a8b23'

export const slides = [
  // 1. Hero
  {
    layout: 'hero',
    color: TEAL,
    icon: 'FlaskConical',
    brand: 'Year 7 Science',
    brandFr: 'Sciences 7e année',
    eyebrow: '3.1 · Forces and energy',
    eyebrowFr: '3.1 · Forces et énergie',
    title: 'Designing a Lab',
    titleFr: 'Concevoir une expérience',
    subtitle: 'Do heavy things fall **faster**? Today you plan the test.',
    subtitleFr: 'Les objets lourds tombent-ils **plus vite** ? Aujourd’hui, tu prépares le test.',
  },

  // ── SPEEDING UP ─────────────────────────────────────────────────────────
  // 2. Question first
  {
    layout: 'statement',
    accent: PURPLE,
    icon: 'Gauge',
    eyebrow: 'Think',
    eyebrowFr: 'Réfléchis',
    title: 'Same Speed All the Way?',
    titleFr: 'Même vitesse jusqu’en bas ?',
    text: 'A ball falls from the top of a tall building.',
    textFr: 'Une balle tombe du haut d’un grand immeuble.',
    sub: 'Does it fall at the **same speed** all the way down?',
    subFr: 'Tombe-t-elle à la **même vitesse** jusqu’en bas ?',
  },

  // 3. Accelerate (write), with the real multi-flash photo
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Gauge',
    eyebrow: 'Key word',
    eyebrowFr: 'Mot clé',
    title: 'Accelerate',
    titleFr: 'Accélérer',
    ratio: 60,
    image: strobe,
    content: 'One photo, a flash **20 times** a second. The gaps get **bigger**: the ball goes further each time.',
    contentFr: 'Une photo, un flash **20 fois** par seconde. Les écarts **grandissent** : la balle va plus loin à chaque fois.',
    notes: [
      {
        tone: 'write',
        text: '**Accelerate:** to speed up.\nA **force** makes an object accelerate. Gravity makes falling objects accelerate.',
        textFr: '**Accélérer (accelerate) :** aller de plus en plus vite.\nUne **force** fait accélérer un objet. La gravité fait accélérer les objets qui tombent.',
      },
    ],
  },

  // 4. How fast, second by second
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Building2',
    eyebrow: 'Every second, faster',
    eyebrowFr: 'Chaque seconde, plus vite',
    title: 'Faster and Faster',
    titleFr: 'De plus en plus vite',
    ratio: 40,
    inlineSvg: DIAGRAMS.SPEED_FALL,
    content: 'Every second, a falling ball gets **36 km/h** faster.\n\nAfter only 3 seconds, it is as fast as a car on a motorway.',
    contentFr: 'Chaque seconde, une balle qui tombe gagne **36 km/h**.\n\nAprès 3 secondes seulement, elle va aussi vite qu’une voiture sur l’autoroute.',
  },

  // 5. Why they land together
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Lightbulb',
    eyebrow: 'Heavy and light',
    eyebrowFr: 'Lourd et léger',
    title: 'Why Do They Land Together?',
    titleFr: 'Pourquoi arrivent-elles ensemble ?',
    ratio: 45,
    inlineSvg: DIAGRAMS.PULL_VS_MASS,
    content: 'Gravity pulls the heavy ball **harder**.\n\nBut a heavy ball is also **harder to speed up**, like a full shopping trolley. The two cancel out.',
    contentFr: 'La gravité tire **plus fort** sur la balle lourde.\n\nMais une balle lourde est aussi **plus dure à accélérer**, comme un chariot plein. Les deux s’annulent.',
  },

  // 6. Drop Race: Earth and Moon, side by side
  {
    layout: 'showcase',
    accent: TEAL,
    icon: 'Timer',
    eyebrow: 'Earth and Moon, from 5 m',
    eyebrowFr: 'Terre et Lune, de 5 m',
    title: 'Drop Race',
    titleFr: 'Course de chute',
    widget: DropRace,
    caption: 'Predict first: how much longer will the Moon take? Then press **Drop**.',
    captionFr: 'Devine d’abord : combien de temps de plus sur la Lune ? Puis appuie sur **Lâcher**.',
  },

  // ── DESIGN THE LAB ──────────────────────────────────────────────────────
  // 7. Plan it
  {
    layout: 'callout',
    accent: PURPLE,
    icon: 'FlaskConical',
    eyebrow: 'Design the lab',
    eyebrowFr: 'Conçois l’expérience',
    title: 'How Could We Test It?',
    titleFr: 'Comment le tester ?',
    content:
      'Does a heavy thing fall faster than a light thing? Plan a test with a partner.\n\n' +
      '**1.** What will you drop?\n' +
      '**2.** From how high?\n' +
      '**3.** How will you know which lands first?\n' +
      '**4.** How will you keep everyone safe?',
    contentFr:
      'Un objet lourd tombe-t-il plus vite qu’un objet léger ? Prépare un test avec ton voisin.\n\n' +
      '**1.** Que vas-tu lâcher ?\n' +
      '**2.** De quelle hauteur ?\n' +
      '**3.** Comment sauras-tu lequel arrive en premier ?\n' +
      '**4.** Comment protéger tout le monde ?',
  },

  // 8. Question first: a ruler as a clock
  {
    layout: 'statement',
    accent: PURPLE,
    icon: 'Ruler',
    eyebrow: 'Think',
    eyebrowFr: 'Réfléchis',
    title: 'Can a Ruler Tell the Time?',
    titleFr: 'Une règle peut-elle mesurer le temps ?',
    text: 'Your partner drops a ruler. You catch it.',
    textFr: 'Ton voisin lâche une règle. Tu l’attrapes.',
    sub: 'How can the ruler tell you **how fast** you are?',
    subFr: 'Comment la règle peut-elle dire **à quelle vitesse** tu réagis ?',
  },

  // 9. Ruler Catch: how catching works
  {
    layout: 'showcase',
    accent: GREEN,
    icon: 'Ruler',
    eyebrow: 'How catching works',
    eyebrowFr: 'Comment on attrape',
    title: 'Ruler Catch',
    titleFr: 'Attrape la règle',
    widget: RulerCatch,
    caption: 'The slower you are, the **further** it falls. Press **Drop**, then **Slow motion**.',
    captionFr: 'Plus tu es lent, plus elle tombe **loin**. Appuie sur **Lâcher**, puis **Ralenti**.',
  },

  // 10. Catch the ruler for real
  {
    layout: 'split',
    accent: GREEN,
    icon: 'Ruler',
    eyebrow: 'Try it: catch the ruler',
    eyebrowFr: 'Essaie : attrape la règle',
    title: 'How Fast Are You?',
    titleFr: 'Es-tu rapide ?',
    ratio: 40,
    inlineSvg: DIAGRAMS.RULER_CATCH,
    content: 'Your partner holds a 30 cm ruler. Your fingers wait at **0**. They let go: catch it!\n\nFind your time in the table.',
    contentFr: 'Ton voisin tient une règle de 30 cm. Tes doigts attendent au **0**. Il lâche : attrape-la !\n\nTrouve ton temps dans le tableau.',
  },

  // 11. The timing problem, and some answers
  {
    layout: 'callout',
    accent: PURPLE,
    icon: 'Timer',
    eyebrow: 'The problem',
    eyebrowFr: 'Le problème',
    title: 'Too Fast to Time',
    titleFr: 'Trop rapide à chronométrer',
    content:
      'From 1 m, a fall takes less than **half a second**. Your reaction time is about **0.2 s**.\n\n' +
      'How could we time a fall fairly?',
    contentFr:
      'D’un mètre, une chute dure moins d’une **demi-seconde**. Ton temps de réaction est d’environ **0.2 s**.\n\n' +
      'Comment chronométrer une chute de façon juste ?',
    reveal: {
      label: 'Mr Bowen’s ideas',
      labelFr: 'Les idées de M. Bowen',
      answer:
        '**Listen:** one bang or two?\n' +
        '**Film it** in slow motion and count the frames.\n' +
        '**Go higher:** from the second floor, a fall takes about 1 s.\n' +
        '**Slow it down:** roll balls down a ramp, like Galileo.',
      answerFr:
        '**Écoute :** un bruit ou deux ?\n' +
        '**Filme** au ralenti et compte les images.\n' +
        '**Plus haut :** du 2e étage, une chute dure environ 1 s.\n' +
        '**Ralentis :** fais rouler des balles sur une pente, comme Galilée.',
    },
  },

  // 12. Exit question
  {
    layout: 'hero',
    color: TEAL,
    icon: 'CheckCircle2',
    brand: 'Year 7 Science',
    brandFr: 'Sciences 7e année',
    title: 'Lab Designed!',
    titleFr: 'Expérience conçue !',
    subtitle: 'Exit question: you catch the ruler at **20 cm**. What is your reaction time?',
    subtitleFr: 'Question de sortie : tu attrapes la règle à **20 cm**. Quel est ton temps de réaction ?',
  },
]
