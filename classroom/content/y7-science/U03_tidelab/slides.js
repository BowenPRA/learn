// content/y7-science/U03_tidelab/slides.js
// Year 7 Science · The River Tide Lab, after 3.4 Tides. Launched Thursday
// 29 October 2026; the readings run to Thursday 12 November.
//
// ENGLISH AND FRENCH ONLY (meta.vietnamese: false): every string has an …Fr
// twin and no …Vn twin. The diagrams stay in English.
//
// THE LAB: a labelled bamboo pole stands in our river. The class reads the
// water on it at 8:30, 10:30, 12:30 and 2:30 every school day for two weeks,
// 44 readings in cm, typed into the results table on slide 11 and drawn as
// a graph on slide 14. Both keep the class's numbers in this browser until
// Clear all (lab.js) — slide 11 is where the deck is opened every day.
//
// THE ARC (the shape of Coffee, Carbon and Stars and 3.4; plan.js has times):
//   The pole     when will the river be highest today? (guess) A flooded
//                street in Bến Tre: rivers have tides too. Water level, on a
//                real gauge. Read three poles. Mr Bowen measures the river,
//                badly, four times — so: how to read it.
//   The table    two weeks, 44 readings. Draw the table. Stay safe at the
//                river. Our results.
//   The graph    coming in, going out. Sketch today's guess, then our graph.
//                Two votes from 3.4 — the same time tomorrow? which week has
//                the biggest tides? — become our two predictions, which the
//                graph will test. How to draw a line graph.
//
// COPY-DOWN: 5 written panels — water level (4), reading the pole (7), coming
// in / going out (12), our predictions (18), line graph (19) — and 1 table
// (9), which the class then fills in for two weeks.
//
// WRITING RULE (the 2.5 density): one hook line, short sentences, and the body
// never repeats the write note, a label or the caption.

import { DIAGRAMS } from './diagrams.js'
import { DIAGRAMS as TIDES } from '../U03_4/diagrams.js'
import { TideTable, TideGraph } from './results.jsx'
import { RiverStory } from './story.jsx'
import kingTide from './images/king-tide.jpg'
import gauge from './images/gauge.jpg'

const TEAL = '#0087a8'
const PURPLE = '#5c2483'
const ORANGE = '#c25e12'
const BLUE = '#1a5fa8'
const RED = '#c8102e'

// 3.4's "the Moon moves on" diagram, with its red dot named for our river.
const MOON_MOVES = TIDES.MOON_MOVES.replace('>the harbour<', '>our river<')

export const slides = [
  // ════════════════════════════════════════════════════════════════════════
  // THE POLE — what we measure, and how
  // ════════════════════════════════════════════════════════════════════════

  // 1. Hero + starter: when is the river highest today?
  {
    layout: 'hero',
    color: BLUE,
    icon: 'Waves',
    brand: 'Year 7 Science',
    brandFr: 'Sciences 7e année',
    eyebrow: '3.4 Tides · Lab',
    eyebrowFr: '3.4 Les marées · Expérience',
    title: 'The River Tide Lab',
    titleFr: 'La marée de la rivière',
    date: '29 Oct 2026',
    card: {
      icon: 'Waves',
      badge: 'Starter',
      badgeFr: 'Pour commencer',
      text: 'We measure our river at **8:30**, **10:30**, **12:30** and **2:30**. When will the water be **highest** today? **Guess** and write it down.',
      textFr: 'Nous mesurons notre rivière à **8 h 30**, **10 h 30**, **12 h 30** et **14 h 30**. Quand l’eau sera-t-elle au plus **haut** aujourd’hui ? **Devine** et écris-le.',
    },
  },

  // 2. Today's goals (the checklist on slide 20 ticks off the same three)
  {
    layout: 'compare',
    accent: TEAL,
    icon: 'Target',
    eyebrow: 'Today',
    eyebrowFr: 'Aujourd’hui',
    title: 'Today You Will…',
    titleFr: 'Aujourd’hui, tu vas…',
    text: 'Watch our river go **up** and **down** for two weeks.',
    textFr: 'Regarder notre rivière **monter** et **descendre** pendant deux semaines.',
    columns: [
      {
        heading: 'The pole',
        headingFr: 'La perche',
        accent: BLUE,
        icon: 'Ruler',
        inlineSvg: DIAGRAMS.PIC_POLE,
        caption: 'Read the water on our pole.',
        captionFr: 'Lire l’eau sur notre perche.',
      },
      {
        heading: 'The table',
        headingFr: 'Le tableau',
        accent: TEAL,
        icon: 'Table',
        inlineSvg: DIAGRAMS.PIC_TABLE,
        caption: 'Write each number in a table.',
        captionFr: 'Noter chaque nombre dans un tableau.',
      },
      {
        heading: 'The graph',
        headingFr: 'Le graphique',
        accent: ORANGE,
        icon: 'TrendingUp',
        inlineSvg: DIAGRAMS.PIC_GRAPH,
        caption: 'See how our river changes.',
        captionFr: 'Voir comment la rivière change.',
      },
    ],
  },

  // 3. The real thing: a king tide in Bến Tre
  {
    layout: 'split',
    accent: PURPLE,
    icon: 'Waves',
    eyebrow: 'Think',
    eyebrowFr: 'Réfléchis',
    title: 'What Happened Here?',
    titleFr: 'Que s’est-il passé ici ?',
    ratio: 40,
    image: kingTide,
    content: 'Bến Tre, Vietnam, **26 October 2011**. Where did this water come from?',
    contentFr: 'Bến Tre, Viêt Nam, **26 octobre 2011**. D’où vient cette eau ?',
    reveal: {
      label: 'Answer',
      labelFr: 'Réponse',
      answer: 'From the **river**. Near the sea, rivers have **tides** too. This was a very high one: **triều cường**.',
      answerFr: 'De la **rivière**. Près de la mer, les rivières ont aussi des **marées**. Celle-ci était très haute : **triều cường**.',
    },
  },

  // 4. Water level (write), on a real gauge
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Ruler',
    eyebrow: 'Key word',
    eyebrowFr: 'Mot clé',
    title: 'Water Level',
    titleFr: 'Le niveau de l’eau',
    ratio: 45,
    image: gauge,
    content: 'Rivers have poles like this one. **Ours** is bamboo, marked in **cm**.',
    contentFr: 'Les rivières ont des perches comme celle-ci. La **nôtre** est en bambou, graduée en **cm**.',
    notes: [
      {
        tone: 'write',
        text: '**Water level:** how high the water is.',
        textFr: '**Niveau de l’eau (water level) :** la hauteur de l’eau.',
      },
    ],
  },

  // 5. Read three poles (whiteboards)
  {
    layout: 'split',
    accent: PURPLE,
    icon: 'Ruler',
    eyebrow: 'Whiteboards',
    eyebrowFr: 'Ardoises',
    title: 'Read the Pole',
    titleFr: 'Lis la perche',
    ratio: 40,
    inlineSvg: DIAGRAMS.POLE_READ,
    content: 'Find where the water **touches** the pole. Write the water level of **A**, **B** and **C**.',
    contentFr: 'Trouve où l’eau **touche** la perche. Écris le niveau de l’eau de **A**, **B** et **C**.',
    reveal: {
      label: 'Answer',
      labelFr: 'Réponse',
      answer: '**A:** 60 cm. **B:** 130 cm. **C:** 85 cm, halfway between two marks.',
      answerFr: '**A :** 60 cm. **B :** 130 cm. **C :** 85 cm, entre deux traits.',
    },
  },

  // 6. What went wrong? Mr Bowen measures the river, one panel per press
  {
    layout: 'showcase',
    accent: BLUE,
    icon: 'Search',
    eyebrow: 'What went wrong?',
    eyebrowFr: 'Où est l’erreur ?',
    title: 'Mr Bowen Measures the River',
    titleFr: 'M. Bowen mesure la rivière',
    widget: RiverStory,
    caption: 'After each picture: what did he do **wrong**?',
    captionFr: 'Après chaque image : quelle est son **erreur** ?',
  },

  // 7. How to read it (write): the answer to the strip
  {
    layout: 'split',
    accent: TEAL,
    icon: 'ScanEye',
    eyebrow: 'Answer: none of them',
    eyebrowFr: 'Réponse : aucune',
    title: 'Read It Like a Scientist',
    titleFr: 'Lis comme un scientifique',
    ratio: 45,
    inlineSvg: DIAGRAMS.METHOD,
    notes: [
      {
        tone: 'write',
        text: '**Reading the pole:** go close, with your eyes **level** with the water. Waves? Read the **middle**. Read it **on time**. Write the unit: **cm**.',
        textFr: '**Lire la perche :** approche-toi, les yeux au **niveau** de l’eau. Des vagues ? Lis le **milieu**. Lis-la **à l’heure**. Écris l’unité : **cm**.',
      },
      {
        tone: 'info',
        badge: false,
        text: 'Mr Bowen: too far, a splash, late, and no unit.',
        textFr: 'M. Bowen : trop loin, une vague, en retard, et sans unité.',
      },
    ],
  },

  // ════════════════════════════════════════════════════════════════════════
  // THE TABLE — two weeks of readings
  // ════════════════════════════════════════════════════════════════════════

  // 8. When we measure: count the readings
  {
    layout: 'split',
    accent: BLUE,
    icon: 'Timer',
    eyebrow: 'Two weeks',
    eyebrowFr: 'Deux semaines',
    title: 'When We Measure',
    titleFr: 'Quand on mesure',
    ratio: 40,
    inlineSvg: DIAGRAMS.CALENDAR,
    content: 'Every school day, **four times** a day.',
    contentFr: 'Chaque jour d’école, **quatre fois** par jour.',
    reveal: {
      prompt: 'How many readings will we take?',
      promptFr: 'Combien de mesures allons-nous faire ?',
      label: 'Answer',
      labelFr: 'Réponse',
      answer: '**11** school days × **4** a day = **44** readings.',
      answerFr: '**11** jours d’école × **4** par jour = **44** mesures.',
    },
  },

  // 9. Draw This: the results table
  {
    layout: 'showcase',
    accent: ORANGE,
    icon: 'Pencil',
    eyebrow: 'Draw this',
    eyebrowFr: 'À dessiner',
    title: 'Draw the Table',
    titleFr: 'Dessine le tableau',
    inlineSvg: DIAGRAMS.TABLE_BLANK,
    drawThis: true,
    caption: 'Turn your book **sideways**. Draw this table with a **ruler**.',
    captionFr: 'Tourne ton cahier sur le **côté**. Dessine ce tableau avec une **règle**.',
  },

  // 10. Safety at the river
  {
    layout: 'callout',
    accent: RED,
    icon: 'AlertTriangle',
    eyebrow: 'Stay safe',
    eyebrowFr: 'Sécurité',
    title: 'At the River',
    titleFr: 'Au bord de la rivière',
    content:
      '**1.** Always go with an **adult**.\n' +
      '**2.** Stay on the **bank**. Never step into the water.\n' +
      '**3.** Do not lean over the edge.\n' +
      '**4.** Wash your hands after.',
    contentFr:
      '**1.** Va toujours avec un **adulte**.\n' +
      '**2.** Reste sur la **rive**. N’entre jamais dans l’eau.\n' +
      '**3.** Ne te penche pas au-dessus du bord.\n' +
      '**4.** Lave-toi les mains après.',
  },

  // 11. Our results: typed in, kept on this computer
  {
    layout: 'showcase',
    accent: TEAL,
    icon: 'Table',
    eyebrow: 'Our class data',
    eyebrowFr: 'Les données de la classe',
    title: 'Our Results',
    titleFr: 'Nos résultats',
    widget: TideTable,
    caption: 'Copy each new reading into **your** table.',
    captionFr: 'Recopie chaque nouvelle mesure dans **ton** tableau.',
  },

  // ════════════════════════════════════════════════════════════════════════
  // THE GRAPH — read it, predict it, draw it
  // ════════════════════════════════════════════════════════════════════════

  // 12. Coming in, going out (write)
  {
    layout: 'split',
    accent: TEAL,
    icon: 'ArrowDownUp',
    eyebrow: 'Key words',
    eyebrowFr: 'Mots clés',
    title: 'Coming In or Going Out?',
    titleFr: 'Elle monte ou elle descend ?',
    ratio: 45,
    inlineSvg: DIAGRAMS.COMING_IN,
    content: 'Read a graph from **left** to **right**.',
    contentFr: 'Lis un graphique de **gauche** à **droite**.',
    notes: [
      {
        tone: 'write',
        text: '**The tide is coming in:** the water level is going **up**.\n**The tide is going out:** the water level is going **down**.',
        textFr: '**La marée monte (coming in) :** le niveau de l’eau **monte**.\n**La marée descend (going out) :** le niveau de l’eau **baisse**.',
      },
    ],
  },

  // 13. Predict today's graph (whiteboards)
  {
    layout: 'split',
    accent: PURPLE,
    icon: 'PenLine',
    eyebrow: 'Predict · whiteboards',
    eyebrowFr: 'Prédis · ardoises',
    title: 'Sketch Today’s Graph',
    titleFr: 'Dessine le graphique du jour',
    ratio: 40,
    inlineSvg: DIAGRAMS.AXES_BLANK,
    content: 'What will our river do today? Put a **dot** at each time, then join the dots.',
    contentFr: 'Que va faire notre rivière aujourd’hui ? Mets un **point** à chaque heure, puis relie les points.',
  },

  // 14. Our graph, from the results table
  {
    layout: 'showcase',
    accent: BLUE,
    icon: 'TrendingUp',
    eyebrow: 'Back to the starter',
    eyebrowFr: 'Retour au début',
    title: 'Our Tide Graph',
    titleFr: 'Notre graphique des marées',
    widget: TideGraph,
    caption: 'When was the water **highest** today? Is the tide **coming in** or **going out**?',
    captionFr: 'Quand l’eau était-elle au plus **haut** aujourd’hui ? La marée **monte**-t-elle ou **descend**-elle ?',
  },

  // 15. Vote: high tide tomorrow, the same time?
  {
    layout: 'compare',
    accent: PURPLE,
    icon: 'Hand',
    eyebrow: 'Vote with one hand',
    eyebrowFr: 'Vote avec une main',
    title: 'High Tide Tomorrow?',
    titleFr: 'La marée haute demain ?',
    text: 'Today, high tide is at **11:00**. When is high tide **tomorrow**?',
    textFr: 'Aujourd’hui, la marée haute est à **11 h 00**. Quand sera-t-elle **demain** ?',
    columns: [
      { heading: 'A · left hand up', headingFr: 'A · main gauche levée', accent: BLUE, icon: 'Hand', inlineSvg: DIAGRAMS.ANS_SAME },
      { heading: 'B · right hand up', headingFr: 'B · main droite levée', accent: ORANGE, icon: 'Hand', inlineSvg: DIAGRAMS.ANS_LATER },
    ],
  },

  // 16. Answer B, from 3.4: the Moon moves on
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Moon',
    eyebrow: 'Answer: B · from 3.4',
    eyebrowFr: 'Réponse : B · vu en 3.4',
    title: 'About 50 Minutes Later',
    titleFr: 'Environ 50 minutes plus tard',
    ratio: 45,
    inlineSvg: MOON_MOVES,
    content: 'The Moon moves on a little every day. So high tide comes about **50 minutes later** every day.',
    contentFr: 'La Lune avance un peu chaque jour. Donc la marée haute arrive environ **50 minutes plus tard** chaque jour.',
    notes: [
      {
        tone: 'info',
        badge: false,
        text: 'On our graph, find the **highest dot** each day. Does it come **later**?',
        textFr: 'Sur notre graphique, trouve le **point le plus haut** de chaque jour. Arrive-t-il **plus tard** ?',
      },
    ],
  },

  // 17. Vote: which week has the biggest tides?
  {
    layout: 'compare',
    accent: PURPLE,
    icon: 'Hand',
    eyebrow: 'Vote with one hand',
    eyebrowFr: 'Vote avec une main',
    title: 'Which Week?',
    titleFr: 'Quelle semaine ?',
    text: 'Which week will have the **biggest** tides?',
    textFr: 'Quelle semaine aura les **plus grandes** marées ?',
    columns: [
      { heading: 'A · left hand up', headingFr: 'A · main gauche levée', accent: BLUE, icon: 'Hand', inlineSvg: DIAGRAMS.ANS_WEEK1 },
      { heading: 'B · right hand up', headingFr: 'B · main droite levée', accent: ORANGE, icon: 'Hand', inlineSvg: DIAGRAMS.ANS_WEEK2 },
    ],
  },

  // 18. Answer B, and our two predictions (write)
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'Moon',
    eyebrow: 'Answer: B · our predictions',
    eyebrowFr: 'Réponse : B · nos prédictions',
    title: 'Our Predictions',
    titleFr: 'Nos prédictions',
    ratio: 45,
    inlineSvg: DIAGRAMS.CALENDAR_MOON,
    content: 'At **new moon**, the Sun, the Moon and the Earth are in a **line** (3.4).',
    contentFr: 'À la **nouvelle lune**, le Soleil, la Lune et la Terre sont **alignés** (3.4).',
    notes: [
      {
        tone: 'write',
        text: '**Prediction 1:** high tide comes about **50 minutes later** every day.\n**Prediction 2:** the tides are **biggest** near the new moon, from **9 November**.',
        textFr: '**Prédiction 1 :** la marée haute arrive environ **50 minutes plus tard** chaque jour.\n**Prédiction 2 :** les marées sont les **plus grandes** vers la nouvelle lune, à partir du **9 novembre**.',
      },
    ],
  },

  // 19. How to draw it by hand (write), for the end of the lab
  {
    layout: 'split',
    accent: TEAL,
    icon: 'TrendingUp',
    eyebrow: 'For 12 November',
    eyebrowFr: 'Pour le 12 novembre',
    title: 'Draw a Line Graph',
    titleFr: 'Trace un graphique',
    ratio: 45,
    inlineSvg: DIAGRAMS.LINE_GRAPH,
    notes: [
      {
        tone: 'write',
        text: '**Line graph:** time along the **bottom**, water level up the **side**. Mark each reading with a **×**, then join the crosses with a **ruler**.',
        textFr: '**Graphique (line graph) :** le temps en **bas**, le niveau de l’eau sur le **côté**. Marque chaque mesure d’une **×**, puis relie les croix avec une **règle**.',
      },
    ],
  },

  // 20. Checklist: slide 2's goals, ticked off
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
      { text: 'Read the **water level** on our pole, in **cm**.', textFr: 'Lire le **niveau de l’eau** sur notre perche, en **cm**.' },
      { text: 'Write each reading in our **results table**.', textFr: 'Noter chaque mesure dans notre **tableau de résultats**.' },
      { text: 'Say if the tide is **coming in** or **going out**.', textFr: 'Dire si la marée **monte** ou **descend**.' },
      { text: 'Give our **two predictions**, and why.', textFr: 'Donner nos **deux prédictions**, et pourquoi.' },
    ],
  },

  // 21. Exit
  {
    layout: 'hero',
    color: BLUE,
    icon: 'Target',
    brand: 'Year 7 Science',
    brandFr: 'Sciences 7e année',
    eyebrow: 'Exit question',
    eyebrowFr: 'Question de sortie',
    title: 'Read the River',
    titleFr: 'Lis la rivière',
    subtitle: 'At 10:30 the water level is **85 cm**. At 12:30 it is **120 cm**. Is the tide **coming in** or **going out**?',
    subtitleFr: 'À 10 h 30, le niveau de l’eau est de **85 cm**. À 12 h 30, il est de **120 cm**. La marée **monte**-t-elle ou **descend**-elle ?',
    reveal: {
      label: 'Answer',
      labelFr: 'Réponse',
      answer: '**Coming in:** the water level went **up** 35 cm.',
      answerFr: '**Elle monte :** le niveau de l’eau a **monté** de 35 cm.',
    },
  },
]
