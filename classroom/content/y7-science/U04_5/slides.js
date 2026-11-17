// content/y7-science/U04_5/slides.js
// Year 7 Science · 4.5 Constructing keys. One 50-minute period, after 4.4
// (Using keys). Source: Learner's Book pages 143–146. Shorter than 4.4 on
// purpose (14 slides, not 20): the time goes on writing and testing a key.
//
// ENGLISH AND FRENCH ONLY, like every Year 7 deck from 15 October: every
// string has an …Fr twin and no …Vn twin. The diagrams stay in English: the
// class writes its keys in English.
//
// THE ARC (plan.js has the timings). Three goals in everyday words, the same
// three on the checklist:
//   Choose  which two plant questions are bad for a key? (the starter). Is
//           Mr Bowen tall? (a vote that splits the room: that is the point).
//           A good key question: everyone gives the same answer. Back to the
//           starter. English check: tall → taller than 1 metre. Good
//           Question or Bad?, the whole class standing.
//  Build    four fruits from a market in Vietnam, one split a press (page
//           144's steps). How to build a key.
//  Test     What happens next? Mr Bowen's key asks "Is it cute?"; three
//           friends test it on a spider. Four cats (Think like a scientist,
//           page 146): each student writes a key. Swap, test, feedback, fix.
//           One cat key that works.
//
// COPY-DOWN: 4 written panels — a good key question (4), -er than + a number
// (5), how to build a key (8), feedback (11) — and 1 key the student writes:
// the four cats (10). Each panel is the definition only; a fact that goes
// with it sits underneath, to read.
//
// WRITING RULE (the 2.5 density): one hook line, short sentences, and the body
// never repeats the write note, a label or the caption.

import { DIAGRAMS } from './diagrams.js'
import { GoodOrBad } from './game.jsx'
import { BuildAKey } from './fruit.jsx'
import { KeyStory } from './story.jsx'

const TEAL = '#0087a8'
const PURPLE = '#5c2483'
const ORANGE = '#c25e12'
const GREEN = '#4a8b23'
const BLUE = '#1a5fa8'

export const slides = [
  // ════════════════════════════════════════════════════════════════════════
  // CHOOSE — good questions and bad ones
  // ════════════════════════════════════════════════════════════════════════

  // 1. Hero + starter: which two questions are bad for a key? (slide 4)
  {
    layout: 'hero',
    color: GREEN,
    icon: 'PenLine',
    brand: 'Year 7 Science',
    brandFr: 'Sciences 7e année',
    eyebrow: '4.5 · Grouping and identifying organisms',
    eyebrowFr: '4.5 · Classer et identifier le vivant',
    title: 'Constructing Keys',
    titleFr: 'Construire une clé',
    card: {
      icon: 'HelpCircle',
      badge: 'Starter · write 2 letters',
      badgeFr: 'Pour commencer · écris 2 lettres',
      text: 'Which **two** are **bad** questions for a plant key? **A** Is it tall? **B** Do its flowers have 5 or more petals? **C** Are its leaves dark green? **D** Are its leaves darker on top than underneath?',
      textFr: 'Quelles **deux** questions sont **mauvaises** pour une clé des plantes ? **A** Est-elle grande ? **B** Ses fleurs ont-elles 5 pétales ou plus ? **C** Ses feuilles sont-elles vert foncé ? **D** Sont-elles plus foncées dessus que dessous ?',
    },
  },

  // 2. Today's goals (the checklist on slide 13 ticks off the same three)
  {
    layout: 'compare',
    accent: TEAL,
    icon: 'Target',
    eyebrow: 'Today',
    eyebrowFr: 'Aujourd’hui',
    title: 'Today You Will…',
    titleFr: 'Aujourd’hui, tu vas…',
    text: 'Write a key that **works** for someone else.',
    textFr: 'Écrire une clé qui **marche** pour quelqu’un d’autre.',
    columns: [
      {
        heading: 'Choose',
        headingFr: 'Choisir',
        accent: GREEN,
        icon: 'HelpCircle',
        inlineSvg: DIAGRAMS.PIC_CHOOSE,
        caption: 'Ask questions with one clear answer.',
        captionFr: 'Poser des questions à réponse claire.',
      },
      {
        heading: 'Build',
        headingFr: 'Construire',
        accent: ORANGE,
        icon: 'PenLine',
        inlineSvg: DIAGRAMS.PIC_BUILD,
        caption: 'Split a group in two, again and again.',
        captionFr: 'Couper un groupe en deux, encore et encore.',
      },
      {
        heading: 'Test and fix',
        headingFr: 'Tester et corriger',
        accent: PURPLE,
        icon: 'CheckCircle2',
        inlineSvg: DIAGRAMS.PIC_TEST,
        caption: 'Swap keys, test them, make them better.',
        captionFr: 'Échanger les clés, les tester, les améliorer.',
      },
    ],
  },

  // 3. Vote: is Mr Bowen tall? (no right answer: the split is the point)
  {
    layout: 'compare',
    accent: PURPLE,
    icon: 'Hand',
    eyebrow: 'Vote with one hand',
    eyebrowFr: 'Vote avec une main',
    title: 'Is Mr Bowen Tall?',
    titleFr: 'M. Bowen est-il grand ?',
    text: 'Is **Mr Bowen** **tall**?',
    textFr: '**M. Bowen** est-il **grand** ?',
    columns: [
      { heading: 'A · left hand up', headingFr: 'A · main gauche levée', accent: BLUE, icon: 'Hand', inlineSvg: DIAGRAMS.ANS_YES },
      { heading: 'B · right hand up', headingFr: 'B · main droite levée', accent: ORANGE, icon: 'Hand', inlineSvg: DIAGRAMS.ANS_NO },
    ],
  },

  // 4. A good key question (write); back to the starter
  {
    layout: 'split',
    accent: TEAL,
    icon: 'CheckCircle2',
    eyebrow: 'Back to the starter',
    eyebrowFr: 'Retour au début',
    title: 'A Good Key Question',
    titleFr: 'Une bonne question de clé',
    ratio: 40,
    inlineSvg: DIAGRAMS.STARTER,
    content: 'Tall next to you. Short next to a giraffe.',
    contentFr: 'Grand à côté de toi. Petit à côté d’une girafe.',
    notes: [
      {
        tone: 'write',
        text: '**A good key question:** everyone gives the **same answer**. Ask about what you can **count**, **measure** or **see**.',
        textFr: '**Une bonne question de clé :** tout le monde donne la **même réponse**. Demande ce qu’on peut **compter**, **mesurer** ou **voir**.',
      },
    ],
  },

  // 5. English check: a word + -er than + a number (write)
  {
    layout: 'split',
    accent: PURPLE,
    icon: 'Languages',
    eyebrow: 'English check',
    eyebrowFr: 'Point d’anglais',
    title: 'Make It a Good Question',
    titleFr: 'Améliorer une question',
    ratio: 45,
    inlineSvg: DIAGRAMS.TALLER,
    notes: [
      {
        tone: 'write',
        text: '**A bad question made good:** a word + **-er than** + a **number**.\nmany → **more than** + a number',
        textFr: '**Améliorer une question :** un mot + **-er than** + un **nombre**.\nmany → **more than** + un nombre (plus de)',
      },
    ],
    reveal: {
      prompt: 'Your turn: Is it heavy? Is it old? Is it short?',
      promptFr: 'À toi : Is it heavy? Is it old? Is it short?',
      label: 'Answer',
      labelFr: 'Réponse',
      answer: 'Is it **heavier than 5 kg**? Is it **older than 10 years**? Is it **shorter than 1 metre**?\nAny sensible number works.',
      answerFr: 'Is it **heavier than 5 kg**? Is it **older than 10 years**? Is it **shorter than 1 metre**?\nTout nombre logique marche.',
    },
  },

  // 6. Good Question or Bad? The whole class, standing
  {
    layout: 'showcase',
    accent: GREEN,
    icon: 'Trophy',
    eyebrow: 'A game · everyone stands',
    eyebrowFr: 'Un jeu · tout le monde debout',
    title: 'Good Question or Bad?',
    titleFr: 'Bonne ou mauvaise question ?',
    widget: GoodOrBad,
    caption: 'The last ones standing win a **prize ticket**!',
    captionFr: 'Les derniers debout gagnent un **ticket** !',
  },

  // ════════════════════════════════════════════════════════════════════════
  // BUILD — split in two, again and again
  // ════════════════════════════════════════════════════════════════════════

  // 7. The stepper: four fruits, one split a press
  {
    layout: 'showcase',
    accent: ORANGE,
    icon: 'PenLine',
    eyebrow: 'Say it first · page 144',
    eyebrowFr: 'Dis-le d’abord · page 144',
    title: 'Build a Key: Four Fruits',
    titleFr: 'Construire une clé : quatre fruits',
    widget: BuildAKey,
    caption: 'Before each press, find a question that splits the group in **two**.',
    captionFr: 'Avant chaque clic, trouve une question qui coupe le groupe en **deux**.',
  },

  // 8. How to build a key (write), beside the finished fruit key
  {
    layout: 'split',
    accent: TEAL,
    icon: 'ListOrdered',
    eyebrow: 'Page 144',
    eyebrowFr: 'Page 144',
    title: 'How to Build a Key',
    titleFr: 'Construire une clé, étape par étape',
    ratio: 40,
    inlineSvg: DIAGRAMS.FRUIT_STEPS,
    notes: [
      {
        tone: 'write',
        text: '**To build a key:**\n**1** Split the organisms into two groups.\n**2** Split each group into two again.\n**3** Stop when each one has its own name.',
        textFr: '**Pour construire une clé :**\n**1** Coupe les organismes en deux groupes.\n**2** Coupe encore chaque groupe en deux.\n**3** Arrête quand chacun a son nom.',
      },
    ],
  },

  // ════════════════════════════════════════════════════════════════════════
  // TEST AND FIX — a key someone else can use
  // ════════════════════════════════════════════════════════════════════════

  // 9. What happens next? Mr Bowen's key asks "Is it cute?" (deadpan)
  {
    layout: 'showcase',
    accent: BLUE,
    icon: 'MessageSquare',
    eyebrow: 'What happens next?',
    eyebrowFr: 'Que se passe-t-il ensuite ?',
    title: 'Mr Bowen’s Key',
    titleFr: 'La clé de M. Bowen',
    widget: KeyStory,
    caption: 'Before each press, **predict** what happens.',
    captionFr: 'Avant chaque clic, **prédis** la suite.',
  },

  // 10. Think like a scientist: four cats, a key in every notebook
  {
    layout: 'showcase',
    accent: PURPLE,
    icon: 'PenLine',
    eyebrow: 'Think like a scientist · page 146',
    eyebrowFr: 'Pense en scientifique · page 146',
    title: 'Your Turn: Four Cats',
    titleFr: 'À toi : quatre chats',
    inlineSvg: DIAGRAMS.CATS,
    caption: 'In your notebook, write a key for the four cats: **branching** or **numbered**.',
    captionFr: 'Dans ton cahier, écris une clé pour les quatre chats : **en arbre** ou **numérotée**.',
  },

  // 11. Swap and test: feedback (write)
  {
    layout: 'split',
    accent: PURPLE,
    icon: 'Users',
    eyebrow: 'Swap and test',
    eyebrowFr: 'Échange et teste',
    title: 'Test Your Partner’s Key',
    titleFr: 'Teste la clé de ton voisin',
    ratio: 50,
    inlineSvg: DIAGRAMS.SWAP,
    content: 'Use it on each cat. Check:\n**1** Each cat gets its own name.\n**2** Each question is easy to answer.\n**3** Three questions or fewer.',
    contentFr: 'Utilise-la sur chaque chat. Vérifie :\n**1** Chaque chat a son propre nom.\n**2** Chaque question est facile.\n**3** Trois questions au plus.',
    notes: [
      {
        tone: 'write',
        text: '**Feedback:** what a user tells you, so you can make your work better.',
        textFr: '**Feedback (un retour) :** ce qu’un utilisateur te dit pour améliorer ton travail.',
      },
      {
        tone: 'task',
        badge: 'Say it, then fix it',
        badgeFr: 'Dis-le, puis corrige',
        text: '**Question … is hard because …**',
        textFr: '**Question … is hard because …** (La question … est difficile parce que …)',
      },
    ],
  },

  // 12. One cat key that works
  {
    layout: 'showcase',
    accent: ORANGE,
    icon: 'CheckCircle2',
    eyebrow: 'One key that works',
    eyebrowFr: 'Une clé qui marche',
    title: 'Check: The Cat Key',
    titleFr: 'Vérifie : la clé des chats',
    inlineSvg: DIAGRAMS.CAT_KEY,
    caption: 'Your questions can be different. Your key must still **work**.',
    captionFr: 'Tes questions peuvent changer. Ta clé doit quand même **marcher**.',
  },

  // 13. Checklist: slide 2's goals, ticked off
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
    content: '> Check your notebook: **4 written panels** and **1 key you wrote**.',
    contentFr: '> Vérifie ton cahier : **4 encadrés recopiés** et **1 clé écrite par toi**.',
    items: [
      { text: 'Say what makes a **good key question**.', textFr: 'Dire ce qui fait une **bonne question de clé**.' },
      { text: 'Make a bad question good: **taller than** 1 metre.', textFr: 'Améliorer une question : **taller than** 1 metre.' },
      { text: '**Build** a key: split in two, again and again.', textFr: '**Construire** une clé : couper en deux, encore et encore.' },
      { text: '**Test** a key, then fix it after **feedback**.', textFr: '**Tester** une clé, puis la corriger après un **retour**.' },
    ],
  },

  // 14. Exit: one good question for a tiger and a leopard
  {
    layout: 'hero',
    color: GREEN,
    icon: 'Target',
    brand: 'Year 7 Science',
    brandFr: 'Sciences 7e année',
    eyebrow: 'Exit question',
    eyebrowFr: 'Question de sortie',
    title: 'Tiger or Leopard?',
    titleFr: 'Tigre ou léopard ?',
    subtitle: 'Write **one good question** that splits a **tiger** from a **leopard**. Why is it good?',
    subtitleFr: 'Écris **une bonne question** qui sépare un **tigre** d’un **léopard**. Pourquoi est-elle bonne ?',
    reveal: {
      label: 'Answer',
      labelFr: 'Réponse',
      answer: '**Does it have stripes?** (or spots). Everyone who looks gives the **same answer**.',
      answerFr: '**Does it have stripes?** (ou spots). Tout le monde donne la **même réponse**.',
    },
  },
]
