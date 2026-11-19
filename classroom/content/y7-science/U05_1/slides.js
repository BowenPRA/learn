// content/y7-science/U05_1/slides.js
// Year 7 Science · 5.1 Metals and non-metals. One 50-minute period, the first
// lesson of Unit 5 (Properties of materials). Source: Learner's Book pages
// 151–156. The class met metals and non-metals as yellow and blue boxes of the
// Periodic Table in 2.5; this lesson is what they are LIKE, and what we use
// them for.
//
// ENGLISH AND FRENCH ONLY, like every Year 7 deck from 15 October: every
// string has an …Fr twin and no …Vn twin. The diagrams stay in English.
//
// THE ARC (plan.js has the timings). Three goals in everyday words, the same
// three on the checklist:
//   Metals      find 5 metal things in this room (the starter). Mr Bowen's
//               test bench: copper, iron and sulfur, one test a press. Back to
//               the starter: material. Malleable and ductile; shiny and
//               sonorous. A glass bottle rings: is it a metal? (vote) One clue
//               is not enough. What happens next? Mr Bowen's all-metal pan.
//               Conductor and insulator. English: conduct → a conductor.
//               Will a magnet pick up an aluminium can? (vote) Only some
//               metals are magnetic; most are hard to melt.
//   Non-metals  brittle: sulfur shatters. Six non-metals at work. Metals on
//               the left of the Periodic Table, or the right? (vote), then 2.5's
//               table.
//   The job     Why This Material? with the whole class standing. Item |
//               Metal | Useful property (Think like a scientist). 10 metals
//               and 5 non-metals in two minutes. Put it together.
//
// COPY-DOWN: 5 written panels — malleable and ductile (5), shiny and sonorous
// (6), conductor and insulator (10), brittle and shatter (14), metals and
// non-metals (21) — and 1 table (19). Each panel is the definition only; a
// fact that goes with it sits underneath, to read.
//
// WRITING RULE (the 2.5 density): one hook line, short sentences, and the body
// never repeats the write note, a label or the caption.

import { DIAGRAMS } from './diagrams.js'
import { TestBench } from './bench.jsx'
import { PanStory } from './story.jsx'
import { WhyThisMaterial } from './game.jsx'
import { TableMetals } from '../U02_5/widgets.jsx'

const TEAL = '#0087a8'
const PURPLE = '#5c2483'
const ORANGE = '#c25e12'
const GREEN = '#4a8b23'
const BLUE = '#1a5fa8'

export const slides = [
  // ════════════════════════════════════════════════════════════════════════
  // METALS — what all metals can do
  // ════════════════════════════════════════════════════════════════════════

  // 1. Hero + starter: five metal things in this room (page 151)
  {
    layout: 'hero',
    color: TEAL,
    icon: 'Hammer',
    brand: 'Year 7 Science',
    brandFr: 'Sciences 7e année',
    eyebrow: '5.1 · Properties of materials',
    eyebrowFr: '5.1 · Propriétés des matériaux',
    title: 'Metals and Non-metals',
    titleFr: 'Métaux et non-métaux',
    card: {
      icon: 'Search',
      badge: 'Starter · write 5 things',
      badgeFr: 'Pour commencer · écris 5 choses',
      text: 'Look around this room. Find **5 things** made of **metal**. How do you **know** they are metal?',
      textFr: 'Regarde autour de toi dans la salle. Trouve **5 objets** en **métal**. Comment **sais-tu** que c’est du métal ?',
    },
  },

  // 2. Today's goals (the checklist on slide 22 ticks off the same three)
  {
    layout: 'compare',
    accent: TEAL,
    icon: 'Target',
    eyebrow: 'Today',
    eyebrowFr: 'Aujourd’hui',
    title: 'Today You Will…',
    titleFr: 'Aujourd’hui, tu vas…',
    text: 'Find out what **metals** and **non-metals** are like, and what we **use** them for.',
    textFr: 'Découvrir comment sont les **métaux** et les **non-métaux**, et à quoi ils **servent**.',
    columns: [
      {
        heading: 'Metals',
        headingFr: 'Les métaux',
        accent: TEAL,
        icon: 'Hammer',
        inlineSvg: DIAGRAMS.PIC_METALS,
        caption: 'Test what all metals can do.',
        captionFr: 'Tester ce que font tous les métaux.',
      },
      {
        heading: 'Non-metals',
        headingFr: 'Les non-métaux',
        accent: ORANGE,
        icon: 'Wind',
        inlineSvg: DIAGRAMS.PIC_NONMETALS,
        caption: 'See how non-metals are different.',
        captionFr: 'Voir en quoi les non-métaux diffèrent.',
      },
      {
        heading: 'The right job',
        headingFr: 'Le bon usage',
        accent: GREEN,
        icon: 'CheckCircle2',
        inlineSvg: DIAGRAMS.PIC_JOB,
        caption: 'Choose the best material for a job.',
        captionFr: 'Choisir le bon matériau pour un usage.',
      },
    ],
  },

  // 3. The test bench stepper: one test a press
  {
    layout: 'showcase',
    accent: ORANGE,
    icon: 'Hammer',
    eyebrow: 'Say it first',
    eyebrowFr: 'Dis-le d’abord',
    title: 'Mr Bowen’s Test Bench',
    titleFr: 'L’atelier de M. Bowen',
    widget: TestBench,
    caption: 'Before each test, **predict** all three. Copper and iron are metals. Sulfur is a **non-metal**.',
    captionFr: 'Avant chaque test, **prédis** les trois. Le cuivre et le fer sont des métaux. Le soufre est un **non-métal**.',
  },

  // 4. Back to the starter; material
  {
    layout: 'split',
    accent: PURPLE,
    icon: 'Search',
    eyebrow: 'Back to the starter',
    eyebrowFr: 'Retour au début',
    title: 'How Do You Know It Is Metal?',
    titleFr: 'Comment sais-tu que c’est du métal ?',
    ratio: 45,
    inlineSvg: DIAGRAMS.BRIDGE,
    content: 'Read your 5 things. How did you know?',
    contentFr: 'Lis tes 5 objets. Comment as-tu su ?',
    notes: [
      {
        tone: 'info',
        badge: false,
        text: 'Metal is a **material**: what an object is made of. Wood, glass and plastic are materials too.',
        textFr: 'Le métal est un **matériau (material)** : ce dont un objet est fait. Le bois, le verre et le plastique aussi.',
      },
    ],
    reveal: {
      label: 'Some clues',
      labelFr: 'Des indices',
      answer: 'It is **shiny**. It feels **cold**. It **rings** when you tap it. It is **strong**: think of the Dragon Bridge.',
      answerFr: 'Il **brille**. Il est **froid** au toucher. Il **sonne** quand on le tapote. Il est **solide** : pense au pont du Dragon.',
    },
  },

  // 5. Malleable and ductile (write)
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Hammer',
    eyebrow: 'Key words',
    eyebrowFr: 'Mots clés',
    title: 'Malleable and Ductile',
    titleFr: 'Malléable et ductile',
    ratio: 45,
    inlineSvg: DIAGRAMS.HAMMER_WIRE,
    content: 'On the test bench, the hammer made copper and iron **flat**. They did not break.',
    contentFr: 'Sur l’atelier, le marteau a **aplati** le cuivre et le fer. Ils ne se sont pas cassés.',
    notes: [
      {
        tone: 'write',
        text: '**Malleable:** can be hammered into shape.\n**Ductile:** can be pulled out into wires.',
        textFr: '**Malléable (malleable) :** peut être mis en forme au marteau.\n**Ductile (ductile) :** peut être étiré en fils.',
      },
      {
        tone: 'info',
        badge: false,
        text: '**1 gram** of gold can be hammered into a sheet of about **1 square metre**.',
        textFr: '**1 gramme** d’or peut être martelé en une feuille d’environ **1 mètre carré**.',
      },
    ],
  },

  // 6. Shiny and sonorous (write)
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Sparkles',
    eyebrow: 'Key words',
    eyebrowFr: 'Mots clés',
    title: 'Shiny and Sonorous',
    titleFr: 'Brillant et sonore',
    ratio: 45,
    inlineSvg: DIAGRAMS.RING_GONG,
    content: 'Vietnam’s **gongs** (cồng chiêng) are made of bronze, a metal.',
    contentFr: 'Les **gongs** du Vietnam (cồng chiêng) sont en bronze, un métal.',
    notes: [
      {
        tone: 'write',
        text: '**Shiny:** reflects light, when new or polished.\n**Sonorous:** rings like a bell when you hit it.',
        textFr: '**Brillant (shiny) :** reflète la lumière, quand il est neuf ou poli.\n**Sonore (sonorous) :** sonne comme une cloche quand on le frappe.',
      },
    ],
  },

  // 7. Vote: a glass bottle rings. Is it a metal?
  {
    layout: 'compare',
    accent: PURPLE,
    icon: 'Hand',
    eyebrow: 'Vote with one hand',
    eyebrowFr: 'Vote avec une main',
    title: 'Is the Bottle a Metal?',
    titleFr: 'La bouteille est-elle un métal ?',
    text: 'Tap a **glass bottle** with a spoon. It **rings**. Is it a **metal**?',
    textFr: 'Tapote une **bouteille en verre** avec une cuillère. Elle **sonne**. Est-ce un **métal** ?',
    columns: [
      { heading: 'A · left hand up', headingFr: 'A · main gauche levée', accent: BLUE, icon: 'Hand', inlineSvg: DIAGRAMS.ANS_YES },
      { heading: 'B · right hand up', headingFr: 'B · main droite levée', accent: ORANGE, icon: 'Hand', inlineSvg: DIAGRAMS.ANS_NO },
    ],
  },

  // 8. Answer B: one clue is not enough (the book's three warnings, page 154)
  {
    layout: 'split',
    accent: TEAL,
    icon: 'AlertTriangle',
    eyebrow: 'Answer: B · no',
    eyebrowFr: 'Réponse : B · non',
    title: 'One Clue Is Not Enough',
    titleFr: 'Un seul indice ne suffit pas',
    ratio: 40,
    inlineSvg: DIAGRAMS.ONE_CLUE,
    content: 'One test can fool you. Check **more than one** clue.',
    contentFr: 'Un seul test peut te tromper. Vérifie **plus d’un** indice.',
  },

  // 9. What happens next? Mr Bowen's new pan, one panel per press (deadpan)
  {
    layout: 'showcase',
    accent: BLUE,
    icon: 'Soup',
    eyebrow: 'What happens next?',
    eyebrowFr: 'Que se passe-t-il ensuite ?',
    title: 'Mr Bowen’s New Pan',
    titleFr: 'La poêle neuve de M. Bowen',
    widget: PanStory,
    caption: 'Before each press, **predict** what happens.',
    captionFr: 'Avant chaque clic, **prédis** la suite.',
  },

  // 10. Conductor and insulator (write)
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Zap',
    eyebrow: 'Key words',
    eyebrowFr: 'Mots clés',
    title: 'Conductor and Insulator',
    titleFr: 'Conducteur et isolant',
    ratio: 45,
    inlineSvg: DIAGRAMS.CONDUCT,
    content: 'Metal feels **cold**: it carries heat **away** from your hand.',
    contentFr: 'Le métal semble **froid** : il emporte la chaleur de ta main.',
    notes: [
      {
        tone: 'write',
        text: '**Conductor:** lets heat or electricity pass through it.\n**Insulator:** does not let heat or electricity pass through it.',
        textFr: '**Conducteur (conductor) :** laisse passer la chaleur ou l’électricité.\n**Isolant (insulator) :** ne laisse pas passer la chaleur ou l’électricité.',
      },
    ],
    reveal: {
      prompt: 'How can Mr Bowen fix his pan?',
      promptFr: 'Comment M. Bowen peut-il réparer sa poêle ?',
      label: 'Answer',
      labelFr: 'Réponse',
      answer: 'A handle made of **wood** or **plastic**. They are **insulators**.',
      answerFr: 'Un manche en **bois** ou en **plastique**. Ce sont des **isolants**.',
    },
  },

  // 11. English check: conduct → a conductor
  {
    layout: 'split',
    accent: PURPLE,
    icon: 'Languages',
    eyebrow: 'English check',
    eyebrowFr: 'Point d’anglais',
    title: 'Conduct or Conductor?',
    titleFr: 'Conduct ou conductor ?',
    ratio: 45,
    inlineSvg: DIAGRAMS.ENGLISH,
    content: 'Copper **conducts** electricity.\nCopper is a good **conductor**.',
    contentFr: 'Copper **conducts** electricity. (Le cuivre **conduit** l’électricité.)\nCopper is a good **conductor**. (C’est un bon **conducteur**.)',
    reveal: {
      prompt: 'Your turn: Plastic does not … electricity. Plastic is an …',
      promptFr: 'À toi : Plastic does not … electricity. Plastic is an …',
      label: 'Answer',
      labelFr: 'Réponse',
      answer: 'Plastic does not **conduct** electricity. Plastic is an **insulator**.',
      answerFr: 'Plastic does not **conduct** electricity. Plastic is an **insulator**. (Le plastique est un **isolant**.)',
    },
  },

  // 12. Vote: will a magnet pick up an aluminium can?
  {
    layout: 'compare',
    accent: PURPLE,
    icon: 'Hand',
    eyebrow: 'Vote with one hand',
    eyebrowFr: 'Vote avec une main',
    title: 'The Magnet and the Can',
    titleFr: 'L’aimant et la canette',
    text: 'Aluminium is a **metal**. Will a **magnet** pick up an **aluminium can**?',
    textFr: 'L’aluminium est un **métal**. Un **aimant** peut-il soulever une **canette en aluminium** ?',
    columns: [
      { heading: 'A · left hand up', headingFr: 'A · main gauche levée', accent: BLUE, icon: 'Hand', inlineSvg: DIAGRAMS.ANS_CAN_YES },
      { heading: 'B · right hand up', headingFr: 'B · main droite levée', accent: ORANGE, icon: 'Hand', inlineSvg: DIAGRAMS.ANS_CAN_NO },
    ],
  },

  // 13. Answer B: only some metals are magnetic; most are hard to melt
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Thermometer',
    eyebrow: 'Answer: B · no',
    eyebrowFr: 'Réponse : B · non',
    title: 'Magnetic, and Hard to Melt',
    titleFr: 'Magnétique, et difficile à fondre',
    ratio: 45,
    inlineSvg: DIAGRAMS.MAGNET_MELT,
    content: 'Only **iron**, **steel**, **nickel** and **cobalt** are **magnetic**. Aluminium and copper are not.\n\nMost metals have a **high melting point**: iron melts at about **1500 °C**. **Mercury** is the only metal that is liquid at room temperature.',
    contentFr: 'Seuls le **fer**, l’**acier**, le **nickel** et le **cobalt** sont **magnétiques**. Pas l’aluminium, pas le cuivre.\n\nLa plupart des métaux ont un **point de fusion élevé** : le fer fond vers **1500 °C**. Le **mercure** est le seul métal liquide à température ambiante.',
  },

  // ════════════════════════════════════════════════════════════════════════
  // NON-METALS — how they are different
  // ════════════════════════════════════════════════════════════════════════

  // 14. Brittle and shatter (write)
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'Box',
    eyebrow: 'Key words · non-metals',
    eyebrowFr: 'Mots clés · non-métaux',
    title: 'Brittle',
    titleFr: 'Cassant',
    ratio: 45,
    inlineSvg: DIAGRAMS.SULFUR,
    content: 'On the test bench, sulfur was **dull**, it **broke**, and the bulb **stayed off**.',
    contentFr: 'Sur l’atelier, le soufre était **terne**, il s’est **cassé**, et l’ampoule est **restée éteinte**.',
    notes: [
      {
        tone: 'write',
        text: '**Brittle:** breaks easily when you hit it or drop it.\n**Shatter:** break into many small pieces.',
        textFr: '**Cassant (brittle) :** se casse facilement quand on le frappe ou qu’on le fait tomber.\n**Se briser (shatter) :** se casser en beaucoup de petits morceaux.',
      },
      {
        tone: 'info',
        badge: false,
        text: 'Most non-metals are **dull**, **brittle** and **insulators**.',
        textFr: 'La plupart des non-métaux sont **ternes**, **cassants** et **isolants**.',
      },
    ],
  },

  // 15. Six non-metals at work (page 155)
  {
    layout: 'showcase',
    accent: ORANGE,
    icon: 'Wind',
    eyebrow: 'Page 155 · real photos',
    eyebrowFr: 'Page 155 · vraies photos',
    title: 'Non-metals at Work',
    titleFr: 'Les non-métaux au travail',
    inlineSvg: DIAGRAMS.NONMETALS,
    caption: 'Many non-metals are **gases**: oxygen, helium and chlorine. Gases melt and boil at **low** temperatures.',
    captionFr: 'Beaucoup de non-métaux sont des **gaz** : l’oxygène, l’hélium et le chlore. Les gaz fondent et bouillent à **basse** température.',
  },

  // 16. Vote: in the Periodic Table, are the metals on the left or the right?
  {
    layout: 'compare',
    accent: PURPLE,
    icon: 'Hand',
    eyebrow: 'Vote with one hand · 2.5',
    eyebrowFr: 'Vote avec une main · 2.5',
    title: 'Left or Right?',
    titleFr: 'À gauche ou à droite ?',
    text: 'In the **Periodic Table**, are most **metals** on the **left** or on the **right**?',
    textFr: 'Dans le **tableau périodique**, la plupart des **métaux** sont-ils à **gauche** ou à **droite** ?',
    columns: [
      { heading: 'A · left hand up', headingFr: 'A · main gauche levée', accent: BLUE, icon: 'Hand', inlineSvg: DIAGRAMS.ANS_LEFT },
      { heading: 'B · right hand up', headingFr: 'B · main droite levée', accent: ORANGE, icon: 'Hand', inlineSvg: DIAGRAMS.ANS_RIGHT },
    ],
  },

  // 17. Answer A: 2.5's Periodic Table, metals yellow, non-metals blue
  {
    layout: 'showcase',
    accent: TEAL,
    icon: 'Grid3x3',
    eyebrow: 'Answer: A · the left',
    eyebrowFr: 'Réponse : A · à gauche',
    title: 'Metals Left, Non-metals Right',
    titleFr: 'Métaux à gauche, non-métaux à droite',
    widget: TableMetals,
    caption: 'Press **Next**: metals are **yellow**, non-metals are **blue**.',
    captionFr: 'Appuie sur **Suivant** : les métaux sont en **jaune**, les non-métaux en **bleu**.',
  },

  // ════════════════════════════════════════════════════════════════════════
  // THE RIGHT JOB — choose a material for its properties
  // ════════════════════════════════════════════════════════════════════════

  // 18. Why This Material? The whole class, standing
  {
    layout: 'showcase',
    accent: GREEN,
    icon: 'Trophy',
    eyebrow: 'A game · everyone stands',
    eyebrowFr: 'Un jeu · tout le monde debout',
    title: 'Why This Material?',
    titleFr: 'Pourquoi ce matériau ?',
    widget: WhyThisMaterial,
    caption: 'The last ones standing win a **prize ticket**!',
    captionFr: 'Les derniers debout gagnent un **ticket** !',
  },

  // 19. Think like a scientist: the table (page 154)
  {
    layout: 'showcase',
    accent: PURPLE,
    icon: 'Table',
    eyebrow: 'Think like a scientist · page 154',
    eyebrowFr: 'Pense en scientifique · page 154',
    title: 'Your Turn: Metals at Work',
    titleFr: 'À toi : les métaux au travail',
    inlineSvg: DIAGRAMS.TABLE,
    drawThis: true,
    caption: 'Copy the table. Fill **3 rows** with metal things from the starter.',
    captionFr: 'Recopie le tableau. Remplis **3 lignes** avec des objets en métal du début.',
  },

  // 20. Whiteboards: 10 metals and 5 non-metals
  {
    layout: 'statement',
    accent: PURPLE,
    eyebrow: 'Whiteboards · 2 minutes',
    eyebrowFr: 'Ardoises · 2 minutes',
    title: 'Name Them',
    titleFr: 'Nomme-les',
    text: '**10 metals**, **5 non-metals**',
    textFr: '**10 métaux**, **5 non-métaux**',
    reveal: {
      label: 'Answer',
      labelFr: 'Réponse',
      answer: '**Metals:** iron, copper, aluminium, gold, silver, zinc, tin, lead, nickel, magnesium, sodium, mercury…\n**Non-metals:** oxygen, carbon, sulfur, nitrogen, hydrogen, helium, chlorine, neon…',
      answerFr: '**Métaux :** fer, cuivre, aluminium, or, argent, zinc, étain, plomb, nickel, magnésium, sodium, mercure…\n**Non-métaux :** oxygène, carbone, soufre, azote, hydrogène, hélium, chlore, néon…',
    },
  },

  // 21. Put it together (write)
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'Layers',
    eyebrow: 'Put it together',
    eyebrowFr: 'En résumé',
    title: 'Metals and Non-metals Side by Side',
    titleFr: 'Métaux et non-métaux côte à côte',
    ratio: 50,
    inlineSvg: DIAGRAMS.SUMMARY,
    notes: [
      {
        tone: 'write',
        text: '**Metals:** shiny, strong, malleable, ductile, sonorous, good **conductors**, high melting points. Some are magnetic.\n**Non-metals:** dull, brittle, **insulators**, low melting points. Many are gases.',
        textFr: '**Métaux :** brillants, solides, malléables, ductiles, sonores, bons **conducteurs**, points de fusion élevés. Certains sont magnétiques.\n**Non-métaux :** ternes, cassants, **isolants**, points de fusion bas. Beaucoup sont des gaz.',
      },
    ],
  },

  // 22. Checklist: slide 2's goals, ticked off
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
    content: '> Check your notebook: **5 written panels** and **1 table**.',
    contentFr: '> Vérifie ton cahier : **5 encadrés recopiés** et **1 tableau**.',
    items: [
      { text: 'Say what **metals** are like: **malleable**, **ductile**, **sonorous**, good **conductors**.', textFr: 'Dire comment sont les **métaux** : **malléables**, **ductiles**, **sonores**, bons **conducteurs**.' },
      { text: 'Say what **non-metals** are like: dull, **brittle**, **insulators**.', textFr: 'Dire comment sont les **non-métaux** : ternes, **cassants**, **isolants**.' },
      { text: 'Choose a material for a job, and give the **property** that makes it right.', textFr: 'Choisir un matériau pour un usage, et donner la **propriété** qui convient.' },
      { text: 'Name **10 metals** and **5 non-metals**.', textFr: 'Nommer **10 métaux** et **5 non-métaux**.' },
    ],
  },

  // 23. Exit: mystery material X
  {
    layout: 'hero',
    color: TEAL,
    icon: 'Target',
    brand: 'Year 7 Science',
    brandFr: 'Sciences 7e année',
    eyebrow: 'Exit question',
    eyebrowFr: 'Question de sortie',
    title: 'Material X',
    titleFr: 'Le matériau X',
    subtitle: 'Material X is **dull**. It **breaks** when you drop it. The bulb **stays off**. Metal or non-metal? Why?',
    subtitleFr: 'Le matériau X est **terne**. Il se **casse** en tombant. L’ampoule **reste éteinte**. Métal ou non-métal ? Pourquoi ?',
    reveal: {
      label: 'Answer',
      labelFr: 'Réponse',
      answer: '**A non-metal:** dull, brittle and an insulator.',
      answerFr: '**Un non-métal :** terne, cassant et isolant.',
    },
  },
]
