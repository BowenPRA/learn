// content/y7-science/U03_2/slides.js
// Year 7 Science · 3.2 Formation of the Solar System. Tuesday 20 October 2026,
// one period.
// Source: Learner's Book pages 85–90 (Unit 3 Forces and energy).
//
// ENGLISH AND FRENCH ONLY (meta.vietnamese: false): every string has an …Fr
// twin and no …Vn twin. French typography: a no-break space before ? ! : ;
// and inside « » (typed as the character itself, inside the quotes).
//
// ONE QUESTION HOLDS IT TOGETHER: NOBODY WAS THERE — SO HOW DO WE KNOW?
//   The book opens with it (p. 86), and its eleven key words are mostly the
//   words of the answer: observe, evidence, support, contradict, model. So the
//   deck teaches those words first, on something everyday — Mr Bowen's cake,
//   a hypothesis (the cat ate it) and three clues, voted on one at a time —
//   and then does the science the same way: the FACTS (orbit and spin acted
//   out, the same plane found at the desk, then drawn), the HYPOTHESIS (a
//   nebula; a model the class watches clump into a star; NASA's film; a real
//   young star with a flat disc; the model again with spin), and the two facts
//   that seem to CONTRADICT it (Venus, Uranus), which are the cake's "locked
//   outside". The book's Think like a scientist questions on models are asked
//   where they fit, and the class's own dust model is the model they judge.
//
// THE MOVES, SO THE DECK IS NOT 3.1 AGAIN: vote with one hand (Getting
// started, the cake, Venus and Uranus), act it out (four planets round Mr
// Bowen), a desk test at eye level, a real spacecraft photo, a model that
// moves (twice: still, then spinning), a film in three parts with a
// prediction between, a real photo of a young star, a four-finger vote and an
// English check (error / mistake / limitation / strength), whiteboards.
//
// COPY-DOWN: 4 short write panels and 1 drawing —
//   evidence + hypothesis + support/contradict (slide 6) · the facts and the
//   orbit/spin/axis drawing (10) · model (13) · nebula + more mass → stronger
//   gravity (15). "Formed" and "observe" are glossed on slide 4, not copied.
//   The book's storyboard Activity is NOT in this period: it is an extension
//   in plan.js for a spare lesson (the group A3 version, with its
//   self-assessment).
//
// WRITING RULE (the 2.5 density): short sentences, one idea each, and the body
// text never repeats the write note, a label or the caption.

import { DIAGRAMS } from './diagrams.js'
import { StarBirth, StillCloud, SpinningCloud } from './widgets.jsx'
import orion from './images/orion.jpg'
import hltau from './images/hltau.jpg'

const TEAL = '#0087a8'
const PURPLE = '#5c2483'
const ORANGE = '#c25e12'
const GREEN = '#4a8b23'
const BLUE = '#1a5fa8'

export const slides = [
  // ── STARTER: the book's Getting started ─────────────────────────────────
  // 1. Hero + starter
  {
    layout: 'hero',
    color: TEAL,
    icon: 'Sun',
    brand: 'Year 7 Science',
    brandFr: 'Sciences 7e année',
    date: '20 Oct 2026',
    eyebrow: '3.2 · Forces and energy',
    eyebrowFr: '3.2 · Forces et énergie',
    title: 'Formation of the Solar System',
    titleFr: 'La formation du système solaire',
    card: {
      icon: 'Pencil',
      badge: 'Starter',
      badgeFr: 'Pour commencer',
      text: 'Book page 85, **Getting started**: answer questions **1**, **2** and **3**.',
      textFr: 'Livre page 85, **Getting started** : réponds aux questions **1**, **2** et **3**.',
    },
  },

  // 2. Question 1 as a vote: everyone at once, no answer on the slide
  {
    layout: 'compare',
    accent: PURPLE,
    icon: 'Hand',
    eyebrow: 'Question 1 · page 85 · vote with one hand',
    eyebrowFr: 'Question 1 · page 85 · vote avec une main',
    title: 'Strong Gravity',
    titleFr: 'Une gravité forte',
    text: 'An object has a **strong** force of gravity. What must it have?',
    textFr: 'Un objet a une force de gravité **forte**. Que doit-il avoir ? (size = taille, mass = masse)',
    columns: [
      {
        heading: 'A · left hand up',
        headingFr: 'A · main gauche levée',
        accent: BLUE,
        icon: 'Hand',
        inlineSvg: DIAGRAMS.ANS_SIZE,
      },
      {
        heading: 'B · right hand up',
        headingFr: 'B · main droite levée',
        accent: ORANGE,
        icon: 'Hand',
        inlineSvg: DIAGRAMS.ANS_MASS,
      },
    ],
  },

  // 3. The answer, then Questions 2 and 3
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Sun',
    eyebrow: 'Questions 2 and 3 · page 85',
    eyebrowFr: 'Questions 2 et 3 · page 85',
    title: 'The Biggest Mass',
    titleFr: 'La plus grande masse',
    ratio: 45,
    inlineSvg: DIAGRAMS.OPTIONS,
    content:
      '**B: a large mass**, like in 3.1.\n\n' +
      '**2.** Which has the **largest mass** in the Solar System?\n' +
      '**3.** Which is at the **centre** of the Solar System?',
    contentFr:
      '**B : une grande masse**, comme en 3.1.\n\n' +
      '**2.** Lequel a la **plus grande masse** du système solaire ?\n' +
      '**3.** Lequel est au **centre** du système solaire ?',
    reveal: {
      label: 'Answers',
      labelFr: 'Réponses',
      answer: '**The Sun**, both times. It has **99.8%** of all the mass in the Solar System.',
      answerFr: '**Le Soleil**, les deux fois. Il a **99.8%** de toute la masse du système solaire.',
    },
  },

  // ── NOBODY WAS THERE: HOW CAN WE KNOW? ─────────────────────────────────
  // 4. The book's own problem, asked and left open: the question is the big line
  {
    layout: 'statement',
    accent: PURPLE,
    eyebrow: 'Think with a partner',
    eyebrowFr: 'Réfléchis avec ton voisin',
    title: 'Nobody Was There',
    titleFr: 'Personne n’était là',
    text: 'Nobody was there to **observe** (watch) it. So how do we know?',
    textFr: 'Personne n’était là pour l’**observer** (observe). Alors comment le savoir ?',
    sub: 'The Solar System **formed** (was made) 4.6 billion years ago.',
    subFr: 'Le système solaire s’est **formé** (formed) il y a 4.6 milliards d’années.',
  },

  // 5. The same problem, everyday: a hypothesis and three clues, the key on the picture
  {
    layout: 'showcase',
    accent: PURPLE,
    icon: 'Search',
    eyebrow: 'Vote on each clue',
    eyebrowFr: 'Vote pour chaque indice',
    title: 'Who Ate the Cake?',
    titleFr: 'Qui a mangé le gâteau ?',
    inlineSvg: DIAGRAMS.CAKE_CLUES,
    caption: 'Does each clue **support** the hypothesis, or **contradict** it?',
    captionFr: 'Chaque indice **confirme**-t-il (supports) l’hypothèse, ou la **contredit**-il (contradicts) ?',
  },

  // 6. The verdict, and the words (write)
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Search',
    eyebrow: 'Key words',
    eyebrowFr: 'Mots clés',
    title: 'Evidence',
    titleFr: 'Les preuves (evidence)',
    ratio: 45,
    inlineSvg: DIAGRAMS.CAKE_VERDICT,
    notes: [
      {
        tone: 'write',
        text:
          '**Evidence:** facts from observations or experiments.\n' +
          '**Hypothesis:** an idea that can be tested.\n' +
          'Evidence can **support** (agree with) or **contradict** (go against) a hypothesis.',
        textFr:
          '**Preuves (evidence, pas « évidence ») :** des faits tirés d’observations ou d’expériences.\n' +
          '**Hypothèse (hypothesis) :** une idée qu’on peut tester.\n' +
          'Les preuves peuvent **confirmer** (support) ou **contredire** (contradict) une hypothèse.',
      },
    ],
    reveal: {
      label: 'So is the hypothesis wrong?',
      labelFr: 'Alors, l’hypothèse est-elle fausse ?',
      answer: 'Not yet. Two clues support it. Check again: was a window open?',
      answerFr: 'Pas encore. Deux indices la confirment. On vérifie : une fenêtre était-elle ouverte ?',
    },
  },

  // ── THE FACTS: OUR EVIDENCE ────────────────────────────────────────────
  // 7. The book's diagram (p. 86): look first
  {
    layout: 'showcase',
    accent: TEAL,
    icon: 'ScanEye',
    eyebrow: 'The facts · page 86',
    eyebrowFr: 'Les faits · page 86',
    title: 'Look Closely',
    titleFr: 'Regarde bien',
    inlineSvg: DIAGRAMS.SOLAR_SYSTEM,
    caption: 'Find **two things** that are the same for every planet.',
    captionFr: 'Trouve **deux choses** qui sont pareilles pour toutes les planètes.',
  },

  // 8. Orbit and spin, with bodies: four planets, one floor
  {
    layout: 'statement',
    accent: GREEN,
    eyebrow: 'Act it out',
    eyebrowFr: 'Joue la scène',
    title: 'Be a Planet',
    titleFr: 'Sois une planète',
    text: 'Mr Bowen is the **Sun**. Walk round him: **orbit**. Turn on the spot: **spin**.',
    textFr: 'M. Bowen est le **Soleil**. Marche autour de lui : **orbit**. Tourne sur place : **spin**.',
    sub: 'Four planets: all the same way round, all on one floor.',
    subFr: 'Quatre planètes : toutes dans le même sens, sur le même sol.',
    reveal: {
      label: 'Now be Venus',
      labelFr: 'Maintenant, sois Vénus',
      answer: 'Orbit the **same** way, but spin the **opposite** way.',
      answerFr: 'Orbite dans le **même** sens, mais tourne dans le sens **opposé**.',
    },
  },

  // 9. Question 2: the same plane, at the desk and from a spacecraft (asked before the panel defines it)
  {
    layout: 'split',
    accent: TEAL,
    icon: 'ScanEye',
    eyebrow: 'Question 2 · page 88 · try it',
    eyebrowFr: 'Question 2 · page 88 · essaie',
    title: 'The Same Plane',
    titleFr: 'Le même plan',
    ratio: 45,
    inlineSvg: DIAGRAMS.SIDE_VIEW,
    content:
      'What does "the same **plane**" mean? (Not an aeroplane!)\n\n' +
      'Lay your pen, eraser and ruler **flat** on the desk. Look along the desk, at eye level.',
    contentFr:
      'Que veut dire « the same **plane** » (le même plan) ? Pas un avion !\n\n' +
      'Pose ton stylo, ta gomme et ta règle **à plat** sur la table. Regarde le long de la table, à hauteur des yeux.',
    reveal: {
      label: 'Answer',
      labelFr: 'Réponse',
      answer: 'They could all lie on **one flat surface**. From the side, they make a **line**, like the planets in the photo.',
      answerFr: 'Ils pourraient tous être posés sur **une seule surface plate**. De côté, ils forment une **ligne**, comme les planètes sur la photo.',
    },
  },

  // 10. Draw This: orbit, spin, axis — and the facts (write)
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'Pencil',
    eyebrow: 'Draw this · the facts',
    eyebrowFr: 'À dessiner · les faits',
    title: 'Orbit, Spin, Axis',
    titleFr: 'Orbite, rotation, axe',
    ratio: 40,
    inlineSvg: DIAGRAMS.ORBIT_SPIN,
    drawThis: true,
    content: 'These facts are our **evidence**. The Sun spins the same way too, and most moons orbit the same way.',
    contentFr: 'Ces faits sont nos **preuves** (evidence). Le Soleil tourne aussi dans ce sens, et la plupart des lunes aussi.',
    notes: [
      {
        tone: 'write',
        text:
          'All the planets **orbit** the Sun in the same direction, in the same **plane** (one flat surface).\n' +
          'Most planets **spin** on their **axes** in the same direction too.',
        textFr:
          'Toutes les planètes **orbitent** autour du Soleil dans le même sens, dans le même **plan** (plane : une seule surface plate).\n' +
          'La plupart des planètes **tournent** sur leur **axe** (axis, pluriel axes) dans le même sens aussi.',
      },
    ],
  },

  // ── THE HYPOTHESIS: HOW IT FORMED ──────────────────────────────────────
  // 11. Question first
  {
    layout: 'statement',
    accent: PURPLE,
    icon: 'HelpCircle',
    eyebrow: 'Think',
    eyebrowFr: 'Réfléchis',
    title: 'Why the Same Way?',
    titleFr: 'Pourquoi le même sens ?',
    text: 'Eight planets. All go round the Sun the **same way**, in **one flat plane**.',
    textFr: 'Huit planètes. Toutes tournent autour du Soleil dans le **même sens**, dans **un seul plan**.',
    sub: 'Just luck? Or did something make it happen?',
    subFr: 'Un hasard ? Ou est-ce que quelque chose l’a causé ?',
  },

  // 12. A nebula, the book's own photo, sharper (defined in slide 15's panel)
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Sparkles',
    eyebrow: 'Key word · page 87',
    eyebrowFr: 'Mot clé · page 87',
    title: 'Nebula',
    titleFr: 'La nébuleuse',
    ratio: 45,
    image: orion,
    content: 'The **Orion Nebula**: a cloud of dust and gas where new stars are forming. Seen by the Hubble telescope.',
    contentFr: 'La **nébuleuse d’Orion** : un nuage de poussière et de gaz où naissent des étoiles. Vue par le télescope Hubble.',
    reveal: {
      label: 'Can I see it?',
      labelFr: 'Puis-je la voir ?',
      answer: 'Yes! On a dark January evening, find **Orion’s belt**: three stars in a row. The fuzzy patch just below it is this cloud.',
      answerFr: 'Oui ! Un soir de janvier, loin des lumières, cherche la **ceinture d’Orion** : trois étoiles en ligne. La tache floue juste en dessous, c’est ce nuage.',
    },
  },

  // 13. Model (write) + Think like a scientist Question 1: the book's p. 87 order, just before one
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Lightbulb',
    eyebrow: 'Key word · page 87',
    eyebrowFr: 'Mot clé · page 87',
    title: 'Model',
    titleFr: 'Le modèle',
    ratio: 45,
    inlineSvg: DIAGRAMS.MODEL_REAL,
    content: 'Nobody can watch a star form. So scientists make a **model**.',
    contentFr: 'Personne ne peut voir une étoile se former. Alors les scientifiques font un **modèle**.',
    notes: [
      {
        tone: 'write',
        text: '**Model:** a way of showing something that is hard to observe directly.',
        textFr: '**Modèle (model) :** une façon de montrer quelque chose qu’on ne peut pas bien observer directement.',
      },
    ],
    reveal: {
      prompt: '**Question 1 (page 90):** a model speeds up millions of years. Suggest **one other** reason to use one.',
      promptFr: '**Question 1 (page 90) :** un modèle accélère des millions d’années. Donne **une autre** raison.',
      label: 'Ideas',
      labelFr: 'Des idées',
      answer: 'Nobody can watch it happen · too big for a lab · you can change the cloud and run it again',
      answerFr: 'Personne ne peut le voir se faire · trop grand pour un labo · on peut changer le nuage et recommencer',
    },
  },

  // 14. The model, still: Question 4 asked, then predict and watch
  {
    layout: 'showcase',
    accent: TEAL,
    icon: 'Atom',
    eyebrow: 'A model · Question 4, page 88',
    eyebrowFr: 'Un modèle · Question 4, page 88',
    title: 'From Dust to a Star',
    titleFr: 'De la poussière à une étoile',
    widget: StillCloud,
    caption: '**Question 4:** which force pulls the grains together? Predict: will the biggest clump grow **steadily**, or **faster and faster**?',
    captionFr: '**Question 4 :** quelle force rassemble les grains ? Devine : le plus gros amas va-t-il grossir **régulièrement** ou **de plus en plus vite** ?',
  },

  // 15. Question 4 answered, and the book's chain (write: nebula + gravity)
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'Repeat',
    eyebrow: 'Question 4 · page 88',
    eyebrowFr: 'Question 4 · page 88',
    title: 'More Mass, More Pull',
    titleFr: 'Plus de masse, plus d’attraction',
    ratio: 45,
    inlineSvg: DIAGRAMS.LOOP,
    content: 'The clump grew **faster and faster**. Why?',
    contentFr: 'L’amas a grossi **de plus en plus vite**. Pourquoi ?',
    notes: [
      {
        tone: 'write',
        text: '**Nebula:** a cloud of dust and gas in space.\n**Gravity** pulls it together: more mass → stronger gravity → it pulls in even more.',
        textFr: '**Nébuleuse (nebula) :** un nuage de poussière et de gaz dans l’espace.\nLa **gravité** le rassemble : plus de masse → gravité plus forte → elle attire encore plus.',
      },
    ],
  },

  // 16. Star or planet (p. 88), the Sun and Jupiter to scale
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Sun',
    eyebrow: 'Page 88',
    eyebrowFr: 'Page 88',
    title: 'Star or Planet?',
    titleFr: 'Étoile ou planète ?',
    ratio: 45,
    inlineSvg: DIAGRAMS.STAR_PLANET,
    content:
      'A clump grows into a ball. Big enough, and it gets **hot**: a **star**. If not: a **planet**.\n\n' +
      'It takes **millions of years**.',
    contentFr:
      'Un amas devient une boule. Assez grosse, elle devient **chaude** : une **étoile**. Sinon : une **planète**.\n\n' +
      'Cela prend **des millions d’années**.',
    reveal: {
      label: 'Jupiter: almost a star?',
      labelFr: 'Jupiter : presque une étoile ?',
      answer: 'It is the biggest planet. To be a star, it would need about **80 times** more mass.',
      answerFr: 'C’est la plus grosse planète. Pour être une étoile, il lui faudrait environ **80 fois** plus de masse.',
    },
  },

  // 17. NASA's film in three parts, a prediction between each, NASA's captions on
  {
    layout: 'showcase',
    accent: TEAL,
    icon: 'Clapperboard',
    eyebrow: 'Film · NASA',
    eyebrowFr: 'Film · NASA',
    title: 'How Stars and Planets Form',
    titleFr: 'Comment naissent les étoiles et les planètes',
    widget: StarBirth,
    caption: 'Play one part at a time. Before each part, predict: **what happens next?**',
    captionFr: 'Lance une partie à la fois. Avant chaque partie, devine : **que va-t-il se passer ?**',
  },

  // 18. The real thing: a young star with a flat disc (p. 87)
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Telescope',
    eyebrow: 'A real photo, 2014',
    eyebrowFr: 'Une vraie photo, 2014',
    title: 'A Young Star: HL Tauri',
    titleFr: 'Une jeune étoile : HL Tauri',
    ratio: 45,
    image: hltau,
    content:
      'A young star with a **flat disc** of dust round it, like in the film.\n\n' +
      'The dark rings may be where new **planets** are sweeping up the dust.',
    contentFr:
      'Une jeune étoile entourée d’un **disque plat** de poussière, comme dans le film.\n\n' +
      'Les anneaux sombres sont peut-être là où de nouvelles **planètes** ramassent la poussière.',
  },

  // 19. The model again, spinning: answers slide 11. It ends on a star and four planets.
  {
    layout: 'showcase',
    accent: TEAL,
    icon: 'RotateCcw',
    eyebrow: 'The model again · predict',
    eyebrowFr: 'Encore le modèle · devine',
    title: 'Now the Cloud Spins',
    titleFr: 'Maintenant, le nuage tourne',
    widget: SpinningCloud,
    caption: 'Predict: will the planets go round **different ways**, or **the same way**?',
    captionFr: 'Devine : les planètes vont-elles tourner dans des **sens différents** ou dans le **même sens** ?',
  },

  // 20. The hypothesis, said plainly
  {
    layout: 'statement',
    accent: TEAL,
    eyebrow: 'Back to the question',
    eyebrowFr: 'Retour à la question',
    title: 'The Hypothesis',
    titleFr: 'L’hypothèse',
    text: 'The Sun and planets formed from **one spinning cloud**.',
    textFr: 'Le Soleil et les planètes viennent d’**un seul nuage qui tournait**.',
    sub: 'So they all still go round **the same way**.',
    subFr: 'Alors ils tournent tous encore dans le **même sens**.',
    reveal: {
      label: 'Why is it flat?',
      labelFr: 'Pourquoi est-ce plat ?',
      answer: 'A spinning cloud **flattens**, like spun pizza dough.',
      answerFr: 'Un nuage qui tourne **s’aplatit**, comme une pâte à pizza.',
    },
  },

  // ── EVIDENCE THAT CONTRADICTS ──────────────────────────────────────────
  // 21. Venus and Uranus: vote, the key on the picture, no answer on the slide
  {
    layout: 'showcase',
    accent: PURPLE,
    icon: 'Hand',
    eyebrow: 'Question 3 · page 90 · vote with one hand',
    eyebrowFr: 'Question 3 · page 90 · vote avec une main',
    title: 'Two Odd Ones Out',
    titleFr: 'Deux exceptions',
    inlineSvg: DIAGRAMS.SPIN_ODD,
    caption: 'Do these two facts **support** the hypothesis, or **contradict** it?',
    captionFr: 'Ces deux faits **confirment**-ils l’hypothèse, ou la **contredisent**-ils ?',
  },

  // 22. Question 3: the answer, and 3b asked before it is told
  {
    layout: 'statement',
    accent: PURPLE,
    eyebrow: 'Question 3 · page 90',
    eyebrowFr: 'Question 3 · page 90',
    title: 'They Seem to Contradict It',
    titleFr: 'Seem to contradict : sembler contredire',
    text: 'Venus and Uranus **seem to contradict** the hypothesis.',
    textFr: 'Vénus et Uranus **semblent contredire** l’hypothèse.',
    sub: 'Why? (Question 3b)',
    subFr: 'Pourquoi ? (Question 3b)',
    reveal: {
      label: 'Answer',
      labelFr: 'Réponse',
      answer: 'One spinning cloud should make them all spin the same way.',
      answerFr: 'Un seul nuage qui tourne devrait toutes les faire tourner pareil.',
    },
  },

  // ── THINK LIKE A SCIENTIST: MODELS ─────────────────────────────────────
  // 23. Question 2: four words, four fingers
  {
    layout: 'showcase',
    accent: PURPLE,
    icon: 'Hand',
    eyebrow: 'Question 2 · page 90 · show with your fingers',
    eyebrowFr: 'Question 2 · page 90 · montre avec tes doigts',
    title: 'Which Word?',
    titleFr: 'Quel mot ?',
    inlineSvg: DIAGRAMS.FOUR_WORDS,
    caption: 'Hold up **1, 2, 3 or 4** fingers. Everyone at once.',
    captionFr: 'Les modèles ne sont pas réels : ils peuvent être imprécis (not accurate). Lève **1, 2, 3 ou 4** doigts, tous ensemble.',
  },

  // 24. The answer, and the English of it
  {
    layout: 'statement',
    accent: PURPLE,
    eyebrow: 'English check',
    eyebrowFr: 'Point d’anglais',
    title: 'A Limitation',
    titleFr: 'Une limite (a limitation)',
    text: '**3 · a limitation:** something a model **cannot** do.',
    textFr: '**3 · a limitation :** ce qu’un modèle **ne peut pas** faire.',
    sub: 'An **error** = a **mistake**: someone got it wrong. A **strength**: a good point.',
    subFr: '**An error** = **a mistake** : une erreur. **A strength** : un point fort.',
    reveal: {
      label: 'Our dust model',
      labelFr: 'Notre modèle de poussière',
      answer: '**Limitations:** flat, only 240 grains, no gas or heat. **A strength:** millions of years in a few seconds.',
      answerFr: '**Limites :** plat, 240 grains seulement, ni gaz ni chaleur. **Un point fort :** des millions d’années en quelques secondes.',
    },
  },

  // 25. Question 4: two statements, and "most, but not all" brings back the cake
  {
    layout: 'callout',
    accent: GREEN,
    icon: 'PenLine',
    eyebrow: 'Question 4 · page 90 · whiteboards',
    eyebrowFr: 'Question 4 · page 90 · ardoises',
    title: 'Which Two?',
    titleFr: 'Lesquelles ?',
    content:
      'Which **two** statements describe the hypothesis?\n\n' +
      '**a** It has been proven to be correct.\n' +
      '**b** Most, but not all, of the evidence supports it.\n' +
      '**c** The model that is used has limitations.\n' +
      '**d** It can be fully tested by experiments.',
    contentFr:
      'Quelles **deux** phrases décrivent l’hypothèse ?\n\n' +
      '**a** On a prouvé qu’elle est juste.\n' +
      '**b** La plupart des preuves, mais pas toutes, la confirment.\n' +
      '**c** Le modèle utilisé a des limites.\n' +
      '**d** On peut la tester entièrement par des expériences.',
    reveal: {
      label: 'Check your answers',
      labelFr: 'Vérifie tes réponses',
      answer: '**b** and **c**. Most evidence supports it, but not Venus and Uranus. It cannot be proven: nobody was there.',
      answerFr: '**b** et **c**. La plupart des preuves la confirment, mais pas Vénus et Uranus. On ne peut pas la prouver : personne n’était là.',
    },
  },

  // ── CLOSE ──────────────────────────────────────────────────────────────
  // 26. Checklist (the book's summary checklist, p. 90)
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
    content: '> Check your notebook: **4 written panels** and **1 drawing**.',
    contentFr: '> Vérifie ton cahier : **4 encadrés recopiés** et **1 dessin**.',
    items: [
      { text: 'Say what a **nebula** is.', textFr: 'Dire ce qu’est une **nébuleuse**.' },
      { text: 'Recall that stars and planets **form** from dust and gas.', textFr: 'Savoir que les étoiles et les planètes se **forment** à partir de poussière et de gaz.' },
      { text: 'Explain how **gravity** pulls dust and gas together.', textFr: 'Expliquer comment la **gravité** rassemble la poussière et le gaz.' },
      { text: 'Describe how a **star** and **planets** form.', textFr: 'Décrire comment se forment une **étoile** et des **planètes**.' },
      { text: 'Say if a fact **supports** or **contradicts** a hypothesis.', textFr: 'Dire si un fait **confirme** ou **contredit** une hypothèse.' },
      { text: 'Say how scientists use a **model**.', textFr: 'Dire comment les scientifiques utilisent un **modèle**.' },
    ],
  },

  // 27. Exit question
  {
    layout: 'hero',
    color: TEAL,
    icon: 'CheckCircle2',
    brand: 'Year 7 Science',
    brandFr: 'Sciences 7e année',
    title: 'Lesson Complete!',
    titleFr: 'Leçon terminée !',
    subtitle: 'Exit question: why do all the planets orbit the Sun in the **same direction**?',
    subtitleFr: 'Question de sortie : pourquoi toutes les planètes tournent-elles autour du Soleil dans le **même sens** ?',
  },
]
