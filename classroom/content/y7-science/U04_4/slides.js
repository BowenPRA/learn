// content/y7-science/U04_4/slides.js
// Year 7 Science · 4.4 Using keys. One 50-minute period, after 4.3 (What is a
// species?). Source: Learner's Book pages 138–142.
//
// ENGLISH AND FRENCH ONLY, like every Year 7 deck from 15 October: every
// string has an …Fr twin and no …Vn twin. The diagrams stay in English: they
// are the book's keys, and the class writes its keys in English.
//
// THE ARC (the shape of Coffee, Carbon and Stars and 3.4 Tides; plan.js has
// the timings). Three goals in everyday words, the same three on the
// checklist:
//   Ask      about a million kinds of insect: how many yes-or-no questions to
//            find one name? (the starter, a guess). Guess Mr Bowen's animal:
//            eight photographs, one question a press, half go grey. Key.
//            Back to the starter: 3 questions for 8 animals, 20 for a million.
//   Follow   dichotomous key (say it: dy-KOT-o-mus). How many wings does a
//            housefly have? (vote, before the key asks it) Two: real
//            photographs. The key on page 139 with a real photograph at every
//            name. What happens next? Mr Bowen follows the key, correctly, on
//            a cat: a housefly called Buzz. A key only names what is in it
//            (the saola, Vietnam, 1992). Four fish (Think like a scientist), one step a press. Yes or
//            No?, the whole class standing.
//   Rewrite  the same key as a numbered key (page 140), lit in both at once;
//            a question becomes two sentences (English check); the class
//            writes the fish key as a numbered key (Question 2) and checks
//            it; which style is easier? (a vote with no right answer).
//
// The starter's question comes back on slide 5; the page 139 key runs from
// slide 9 to the exit question (20), which uses its numbered version.
//
// COPY-DOWN: 4 written panels — key (4), dichotomous key (6), a key's limit
// (11), a question becomes two sentences (15) — and 1 key the student writes:
// the fish key, numbered (16, started by two orange lines). Each panel is the
// definition only; a fact that goes with it sits underneath, to read.
//
// WRITING RULE (the 2.5 density): one hook line, short sentences, and the body
// never repeats the write note, a label or the caption.

import { DIAGRAMS } from './diagrams.js'
import { GuessMyAnimal } from './guess.jsx'
import { GardenStory } from './story.jsx'
import { FourFish } from './fish.jsx'
import { YesOrNo } from './game.jsx'
import { TwoStyles } from './styles.jsx'

const TEAL = '#0087a8'
const PURPLE = '#5c2483'
const ORANGE = '#c25e12'
const GREEN = '#4a8b23'
const BLUE = '#1a5fa8'

export const slides = [
  // ════════════════════════════════════════════════════════════════════════
  // ASK — questions with two answers
  // ════════════════════════════════════════════════════════════════════════

  // 1. Hero + starter: a million insects, how many questions? (slide 5)
  {
    layout: 'hero',
    color: GREEN,
    icon: 'Bug',
    brand: 'Year 7 Science',
    brandFr: 'Sciences 7e année',
    eyebrow: '4.4 · Grouping and identifying organisms',
    eyebrowFr: '4.4 · Classer et identifier le vivant',
    date: '16 Nov 2026',
    title: 'Using Keys',
    titleFr: 'Utiliser une clé',
    card: {
      icon: 'HelpCircle',
      badge: 'Starter',
      badgeFr: 'Pour commencer',
      text: 'Scientists know about **1 million** kinds of insect. Mr Bowen finds one he has never seen. How many **yes or no** questions does he need to find its **name**? **Guess a number** and write it down.',
      textFr: 'On connaît environ **1 million** de sortes d’insectes. M. Bowen en trouve un qu’il n’a jamais vu. Combien de questions à **oui ou non** pour trouver son **nom** ? **Devine un nombre** et écris-le.',
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
    text: 'Find the **name** of an animal you have never seen.',
    textFr: 'Trouver le **nom** d’un animal que tu n’as jamais vu.',
    columns: [
      {
        heading: 'Ask',
        headingFr: 'Demander',
        accent: GREEN,
        icon: 'HelpCircle',
        inlineSvg: DIAGRAMS.PIC_ASK,
        caption: 'Ask questions with two answers.',
        captionFr: 'Poser des questions à deux réponses.',
      },
      {
        heading: 'Follow',
        headingFr: 'Suivre',
        accent: ORANGE,
        icon: 'ArrowDown',
        inlineSvg: DIAGRAMS.PIC_FOLLOW,
        caption: 'Follow the lines to a name.',
        captionFr: 'Suivre les lignes jusqu’à un nom.',
      },
      {
        heading: 'Rewrite',
        headingFr: 'Réécrire',
        accent: PURPLE,
        icon: 'ListOrdered',
        inlineSvg: DIAGRAMS.PIC_REWRITE,
        caption: 'Write the same questions a new way.',
        captionFr: 'Écrire les questions autrement.',
      },
    ],
  },

  // 3. The stepper: Mr Bowen's animal, one question a press
  {
    layout: 'showcase',
    accent: GREEN,
    icon: 'HelpCircle',
    eyebrow: 'Say it first',
    eyebrowFr: 'Dis-le d’abord',
    title: 'Guess Mr Bowen’s Animal',
    titleFr: 'Devine l’animal de M. Bowen',
    widget: GuessMyAnimal,
    caption: 'Before each press, say which animals answer **yes**.',
    captionFr: 'Avant chaque clic, dis quels animaux répondent **oui**.',
  },

  // 4. Key (write), beside the gecko's three questions
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Search',
    eyebrow: 'Key word',
    eyebrowFr: 'Mot clé',
    title: 'A Key',
    titleFr: 'Une clé',
    ratio: 45,
    inlineSvg: DIAGRAMS.KEY_PATH,
    content: 'A **key** opens a door. This key opens a **name**.',
    contentFr: 'Une **clé** ouvre une porte. Cette clé-ci ouvre un **nom**.',
    notes: [
      {
        tone: 'write',
        text: '**Key:** a set of questions that helps you **identify** an organism (find its name).',
        textFr: '**Clé (key) :** une série de questions qui aide à **identifier** un organisme (trouver son nom).',
      },
    ],
  },

  // 5. Back to the starter: 3 questions for 8 animals, 20 for a million
  {
    layout: 'statement',
    accent: PURPLE,
    eyebrow: 'Back to the starter · whiteboards',
    eyebrowFr: 'Retour au début · ardoises',
    title: 'A Million Insects',
    titleFr: 'Un million d’insectes',
    text: 'How many questions for **1 million** insects?',

    textFr: 'Combien de questions pour **1 million** d’insectes ?',

    sub: '1 question: 2 animals · 2 questions: 4 · 3 questions: 8',
    subFr: '1 question : 2 animaux · 2 questions : 4 · 3 questions : 8',
    reveal: {
      label: 'Answer',
      labelFr: 'Réponse',
      answer: '**20.** Double 20 times: **1 048 576**, more than a million.\nA real key needs more: its questions do not split the animals exactly in half.',
      answerFr: '**20.** Double 20 fois : **1 048 576**, plus d’un million.\nUne vraie clé en demande plus : ses questions ne coupent pas les animaux exactement en deux.',
    },
  },

  // ════════════════════════════════════════════════════════════════════════
  // FOLLOW — the dichotomous key on page 139
  // ════════════════════════════════════════════════════════════════════════

  // 6. Dichotomous key (write), beside one question and its two answers
  {
    layout: 'split',
    accent: TEAL,
    icon: 'ArrowDown',
    eyebrow: 'Key word · page 139',
    eyebrowFr: 'Mot clé · page 139',
    title: 'Dichotomous Key',
    titleFr: 'La clé dichotomique',
    ratio: 45,
    inlineSvg: DIAGRAMS.ONE_QUESTION,
    content: 'Say it: **dy-KOT-o-mus**.',
    contentFr: 'En anglais, on dit : **dy-KOT-o-mus**.',
    notes: [
      {
        tone: 'write',
        text: '**Dichotomous key:** a key where every question has **two** answers.\n**Dichotomous:** branching into two.',
        textFr: '**Clé dichotomique (dichotomous key) :** une clé où chaque question a **deux** réponses.\n**Dichotomique :** qui se divise en deux.',
      },
    ],
  },

  // 7. Vote: how many wings does a housefly have? (before the key, which asks it)
  {
    layout: 'compare',
    accent: PURPLE,
    icon: 'Hand',
    eyebrow: 'Vote with one hand',
    eyebrowFr: 'Vote avec une main',
    title: 'How Many Wings?',
    titleFr: 'Combien d’ailes ?',
    text: 'How many **wings** does a **housefly** have?',
    textFr: 'Combien d’**ailes** a une **mouche** ?',
    columns: [
      { heading: 'A · left hand up', headingFr: 'A · main gauche levée', accent: BLUE, icon: 'Hand', inlineSvg: DIAGRAMS.ANS_FOUR },
      { heading: 'B · right hand up', headingFr: 'B · main droite levée', accent: ORANGE, icon: 'Hand', inlineSvg: DIAGRAMS.ANS_TWO },
    ],
  },

  // 8. Answer B: a dragonfly and a housefly, as real photographs
  {
    layout: 'showcase',
    accent: BLUE,
    icon: 'ScanEye',
    eyebrow: 'Answer: B · real photos',
    eyebrowFr: 'Réponse : B · vraies photos',
    title: 'Four Wings or Two?',
    titleFr: 'Quatre ailes ou deux ?',
    inlineSvg: DIAGRAMS.WINGS,
    caption: 'The key on page 139 will ask: **Does it have four wings?**',
    captionFr: 'La clé de la page 139 va demander : **A-t-il quatre ailes ?**',
  },

  // 9. The key on page 139, with a real photograph at every name
  {
    layout: 'showcase',
    accent: TEAL,
    icon: 'ScanEye',
    eyebrow: 'Page 139 · real photos',
    eyebrowFr: 'Page 139 · vraies photos',
    title: 'The Key on Page 139',
    titleFr: 'La clé de la page 139',
    inlineSvg: DIAGRAMS.KEY_BOOK,
    caption: 'Start at the **top**. Find the **dragonfly**: say each question and its answer.',
    captionFr: 'Commence en **haut**. Trouve la **libellule** : dis chaque question et sa réponse.',
  },

  // 10. What happens next? Mr Bowen uses the key on a cat (deadpan)
  {
    layout: 'showcase',
    accent: BLUE,
    icon: 'MessageSquare',
    eyebrow: 'What happens next?',
    eyebrowFr: 'Que se passe-t-il ensuite ?',
    title: 'Something in the Garden',
    titleFr: 'Quelque chose dans le jardin',
    widget: GardenStory,
    caption: 'Before each step, **predict**: what does the key ask next?',
    captionFr: 'Avant chaque étape, **prédis** : que demande la clé ensuite ?',
  },

  // 11. What a key cannot do (write), beside the saola
  {
    layout: 'split',
    accent: TEAL,
    icon: 'AlertTriangle',
    eyebrow: 'What went wrong?',
    eyebrowFr: 'Qu’est-ce qui n’a pas marché ?',
    title: 'Only Five Names',
    titleFr: 'Seulement cinq noms',
    ratio: 45,
    inlineSvg: DIAGRAMS.SAOLA,
    notes: [
      {
        tone: 'write',
        text: 'A key can only identify the organisms that are **in** it.',
        textFr: 'Une clé peut seulement identifier les organismes qui sont **dedans**.',
      },
      {
        tone: 'info',
        badge: false,
        text: 'No key had the **saola**: it matched **no** animal scientists knew. It was a **new species**.',
        textFr: 'Aucune clé n’avait le **saola** : il ne ressemblait à **aucun** animal connu. C’était une **nouvelle espèce**.',
      },
    ],
    reveal: {
      prompt: 'A spider: what does the key on page 139 call it?',
      promptFr: 'Une araignée : comment la clé de la page 139 l’appelle-t-elle ?',
      label: 'Answer',
      labelFr: 'Réponse',
      answer: '**A crab!** It has more than six legs.',
      answerFr: '**Un crabe !** Elle a plus de six pattes.',
    },
  },

  // 12. Four fish (Think like a scientist), one step a press
  {
    layout: 'showcase',
    accent: PURPLE,
    icon: 'Search',
    eyebrow: 'Think like a scientist · page 141',
    eyebrowFr: 'Pense en scientifique · page 141',
    title: 'Four Fish',
    titleFr: 'Quatre poissons',
    widget: FourFish,
    caption: 'Pairs: name all **four** on a whiteboard. Then check, one step a press.',
    captionFr: 'À deux : nomme les **quatre** sur une ardoise. Puis vérifie, une étape par clic.',
  },

  // 13. Yes or No? The whole class, standing
  {
    layout: 'showcase',
    accent: GREEN,
    icon: 'Trophy',
    eyebrow: 'A game · everyone stands',
    eyebrowFr: 'Un jeu · tout le monde debout',
    title: 'Yes or No?',
    titleFr: 'Oui ou non ?',
    widget: YesOrNo,
    caption: 'The last ones standing win a **prize ticket**!',
    captionFr: 'Les derniers debout gagnent un **ticket** !',
  },

  // ════════════════════════════════════════════════════════════════════════
  // REWRITE — the same key, numbered
  // ════════════════════════════════════════════════════════════════════════

  // 14. The same key, another way (page 140): a step lights in both
  {
    layout: 'showcase',
    accent: TEAL,
    icon: 'ListOrdered',
    eyebrow: 'Page 140 · say it first',
    eyebrowFr: 'Page 140 · dis-le d’abord',
    title: 'The Same Key, Another Way',
    titleFr: 'La même clé, autrement',
    widget: TwoStyles,
    caption: 'Say the next step (**1a**, **2b**…) before each press.',
    captionFr: 'Dis l’étape suivante (**1a**, **2b**…) avant chaque clic.',
  },

  // 15. English check: a question becomes two sentences (write)
  {
    layout: 'split',
    accent: PURPLE,
    icon: 'Languages',
    eyebrow: 'English check',
    eyebrowFr: 'Point d’anglais',
    title: 'One Question, Two Sentences',
    titleFr: 'Une question, deux phrases',
    ratio: 45,
    inlineSvg: DIAGRAMS.STATEMENTS,
    notes: [
      {
        tone: 'write',
        text: '**Does** it **have** legs?\n**a** It **has** legs.\n**b** It **does not have** legs.',
        textFr: '**Does** it **have** legs? (A-t-il des pattes ?)\n**a** It **has** legs.\n**b** It **does not have** legs.',
      },
    ],
    reveal: {
      prompt: 'Your turn: Does it have fur? Is it longer than 1 metre?',
      promptFr: 'À toi : Does it have fur? Is it longer than 1 metre?',
      label: 'Answer',
      labelFr: 'Réponse',
      answer: '**a** It has fur. **b** It does not have fur.\n**a** It is longer than 1 metre. **b** It is not longer than 1 metre.',
      answerFr: '**a** It has fur. **b** It does not have fur.\n**a** It is longer than 1 metre. **b** It is not longer than 1 metre.',
    },
  },

  // 16. Put it together: write the fish key as a numbered key (Question 2)
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'PenLine',
    eyebrow: 'Put it together · Question 2',
    eyebrowFr: 'En résumé · Question 2',
    title: 'Your Turn: The Fish Key',
    titleFr: 'À toi : la clé des poissons',
    ratio: 45,
    inlineSvg: DIAGRAMS.FISH_KEY,
    content: 'Write this key as a **numbered** key. Start like this:\n> **1a** The fish has stripes. → go to 2\n> **1b** The fish does not have stripes. → horn shark',
    contentFr: 'Écris cette clé en clé **numérotée**. Commence ainsi :\n> **1a** The fish has stripes. → go to 2\n> **1b** The fish does not have stripes. → horn shark',
    notes: [
      {
        tone: 'task',
        badge: 'Your notebook',
        badgeFr: 'Ton cahier',
        text: 'Then write the rest yourself: **2a**, **2b**, **3a** and **3b**.',
        textFr: 'Puis écris toi-même la suite : **2a**, **2b**, **3a** et **3b**.',
      },
    ],
  },

  // 17. Check your key
  {
    layout: 'showcase',
    accent: ORANGE,
    icon: 'CheckCircle2',
    eyebrow: 'Check your key',
    eyebrowFr: 'Vérifie ta clé',
    title: 'The Fish Key, Numbered',
    titleFr: 'La clé des poissons, numérotée',
    inlineSvg: DIAGRAMS.FISH_NUMBERED,
    caption: 'Tick each line. Your words can be different, but the **steps** must be the same.',
    captionFr: 'Coche chaque ligne. Tes mots peuvent changer, mais les **étapes** doivent être les mêmes.',
  },

  // 18. Vote: which style is easier? (no right answer: say why)
  {
    layout: 'compare',
    accent: PURPLE,
    icon: 'Hand',
    eyebrow: 'Vote with one hand · then say why',
    eyebrowFr: 'Vote avec une main · puis explique',
    title: 'Which Is Easier?',
    titleFr: 'Laquelle est plus facile ?',
    text: 'Which key is **easier** to use? Then finish: **The … key is easier because …**',
    textFr: 'Quelle clé est la plus **facile** ? Puis termine : **The … key is easier because …**',
    columns: [
      { heading: 'A · left hand up', headingFr: 'A · main gauche levée', accent: BLUE, icon: 'Hand', inlineSvg: DIAGRAMS.ANS_TREE },
      { heading: 'B · right hand up', headingFr: 'B · main droite levée', accent: ORANGE, icon: 'Hand', inlineSvg: DIAGRAMS.ANS_LIST },
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
    content: '> Check your notebook: **4 written panels** and **1 key you wrote**.',
    contentFr: '> Vérifie ton cahier : **4 encadrés recopiés** et **1 clé écrite par toi**.',
    items: [
      { text: 'Say what a **key** is, and why it is **dichotomous**.', textFr: 'Dire ce qu’est une **clé**, et pourquoi elle est **dichotomique**.' },
      { text: 'Use a key to **identify** an organism.', textFr: 'Utiliser une clé pour **identifier** un organisme.' },
      { text: 'Rewrite a key as a **numbered** key.', textFr: 'Réécrire une clé en clé **numérotée**.' },
      { text: 'Say what a key **cannot** do.', textFr: 'Dire ce qu’une clé **ne peut pas** faire.' },
    ],
  },

  // 20. Exit: the numbered key on page 140
  {
    layout: 'hero',
    color: GREEN,
    icon: 'Target',
    brand: 'Year 7 Science',
    brandFr: 'Sciences 7e année',
    eyebrow: 'Exit question',
    eyebrowFr: 'Question de sortie',
    title: 'Six Legs, Two Wings',
    titleFr: 'Six pattes, deux ailes',
    subtitle: 'Use the **numbered** key on page 140. An animal has **6 legs** and **2 wings**. Write its **steps** and its **name**.',
    subtitleFr: 'Utilise la clé **numérotée** de la page 140. Un animal a **6 pattes** et **2 ailes**. Écris ses **étapes** et son **nom**.',
    reveal: {
      label: 'Answer',
      labelFr: 'Réponse',
      answer: '**1a, 2a, 4b:** a **housefly**.',
      answerFr: '**1a, 2a, 4b :** une **mouche** (housefly).',
    },
  },
]
