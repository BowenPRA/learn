// content/y7-science/U04_classkey/slides.js
// Year 7 Science · Our Class Key. A short practical after 4.5 (Constructing
// keys): the class builds one dichotomous key for its own members, tests it,
// and copies it. Six slides on purpose: the period goes on the class key.
//
// ENGLISH AND FRENCH ONLY, like every Year 7 deck from 15 October: every
// string has an …Fr twin and no …Vn twin. The key stays in English: the class
// writes its questions in English.
//
// NAMES. The repo is public and holds no names. The widget reads the class
// list from the random-student picker on the classroom computer (Class list,
// or R) and saves the key there only; anyone else sees eleven sample animals.
//
// THE ARC (plan.js has the timings):
//   1  starter: one question that splits our class in two
//   2  good or bad for our class? arms up or down, then the answer
//   3  BUILD our class key, one split at a time
//   4  TEST it: a student thinks of a classmate and answers
//   5  the key, numbered: copy it
//   6  exit: how many questions did 11 people need?
//
// COPY-DOWN: the class key, numbered (slide 5). Nothing else is new.

import { DIAGRAMS } from './diagrams.js'
import { BuildClassKey, TestClassKey, NumberedClassKey } from './classkey.jsx'

const TEAL = '#0087a8'
const PURPLE = '#5c2483'
const ORANGE = '#c25e12'
const GREEN = '#4a8b23'
const BLUE = '#1a5fa8'

export const slides = [
  // 1. Hero + starter
  {
    layout: 'hero',
    color: GREEN,
    icon: 'Users',
    brand: 'Year 7 Science',
    brandFr: 'Sciences 7e année',
    eyebrow: 'Unit 4 · Grouping and identifying organisms',
    eyebrowFr: 'Unité 4 · Classer et identifier le vivant',
    title: 'Our Class Key',
    titleFr: 'La clé de notre classe',
    card: {
      icon: 'HelpCircle',
      badge: 'Starter · write 1 question',
      badgeFr: 'Pour commencer · écris 1 question',
      text: 'Write **one** yes-or-no question that splits **our class** into **two** groups.',
      textFr: 'Écris **une** question oui-ou-non qui coupe **notre classe** en **deux** groupes.',
    },
  },

  // 2. Good or bad for our class? Arms up or down, then the answer
  {
    layout: 'split',
    accent: PURPLE,
    icon: 'Hand',
    eyebrow: 'Arms up or down',
    eyebrowFr: 'Bras en haut ou en bas',
    title: 'Good for Our Class?',
    titleFr: 'Bonne pour notre classe ?',
    ratio: 40,
    inlineSvg: DIAGRAMS.FOUR_QS,
    content: 'Arms **up**: a good question.\nArms **down**: a bad question.',
    contentFr: 'Bras **en haut** : une bonne question.\nBras **en bas** : une mauvaise question.',
    notes: [
      {
        tone: 'info',
        badge: 'From 4.5',
        badgeFr: 'Vu en 4.5',
        text: '**A good key question:** everyone gives the **same answer**.',
        textFr: '**Une bonne question de clé :** tout le monde donne la **même réponse**.',
      },
    ],
    reveal: {
      label: 'Answer',
      labelFr: 'Réponse',
      answer: '**Good:** B and D. Look, and everyone agrees.\n**Bad:** A and C. Nice? Long? People answer differently.',
      answerFr: '**Bonnes :** B et D. On regarde, tout le monde est d’accord.\n**Mauvaises :** A et C. Nice ? Long ? Les réponses changent.',
    },
  },

  // 3. Build our class key
  {
    layout: 'showcase',
    accent: ORANGE,
    icon: 'PenLine',
    eyebrow: 'Split in two, again and again',
    eyebrowFr: 'Couper en deux, encore et encore',
    title: 'Build Our Class Key',
    titleFr: 'Construire la clé de la classe',
    widget: BuildClassKey,
    caption: 'Before each split, agree on a **good** question.',
    captionFr: 'Avant chaque partage, mettez-vous d’accord sur une **bonne** question.',
  },

  // 4. Test it
  {
    layout: 'showcase',
    accent: BLUE,
    icon: 'CheckCircle2',
    eyebrow: 'Does it work?',
    eyebrowFr: 'Est-ce qu’elle marche ?',
    title: 'Test Our Class Key',
    titleFr: 'Tester la clé de la classe',
    widget: TestClassKey,
    caption: 'Think of a classmate. Don’t say the name! Answer each question.',
    captionFr: 'Pense à un camarade. Ne dis pas son nom ! Réponds à chaque question.',
  },

  // 5. The key, numbered: copy it
  {
    layout: 'showcase',
    accent: TEAL,
    icon: 'ListOrdered',
    eyebrow: 'Copy it down',
    eyebrowFr: 'Recopie-la',
    title: 'Our Class Key, Numbered',
    titleFr: 'Notre clé, numérotée',
    widget: NumberedClassKey,
    caption: 'Copy **our class key** into your notebook.',
    captionFr: 'Recopie **la clé de la classe** dans ton cahier.',
  },

  // 6. Exit: how many questions?
  {
    layout: 'hero',
    color: GREEN,
    icon: 'Target',
    brand: 'Year 7 Science',
    brandFr: 'Sciences 7e année',
    eyebrow: 'Exit question',
    eyebrowFr: 'Question de sortie',
    title: 'How Many Questions?',
    titleFr: 'Combien de questions ?',
    subtitle: 'Our key has **11** people. How many **questions** does it need? Why?',
    subtitleFr: 'Notre clé a **11** personnes. Combien de **questions** faut-il ? Pourquoi ?',
    reveal: {
      label: 'Answer',
      labelFr: 'Réponse',
      answer: '**10.** Each question splits one group in two: one more group each time.',
      answerFr: '**10.** Chaque question coupe un groupe en deux : un groupe de plus à chaque fois.',
    },
  },
]
