// content/y7-science/U03_models/slides.js
// Year 7 Science · Models: Space. A Unit 3 modelling deck, taught after 3.2
// (formation of the Solar System) and before 3.3 (movement in space).
//
// ENGLISH AND FRENCH ONLY, like every Year 7 deck from Unit 4 / 15 October:
// every string has an …Fr twin and no …Vn twin. The diagrams stay in English.
//
// ONE PERIOD (plan.js has the timings): how big (the football Sun, asked as a
// size vote first); the two kinds of model from 3.2; the Solar System, with
// 3.2's words and 3.3's question left open; the plane, reviewed; the working
// Solar System model; limitations (Cambridge asks for them); then the nebula,
// reviewed from 3.2, and the formation model.
//
// It used to have a Part 2 on time. That is now two decks of its own:
// Coffee, Carbon and Stars (U03_coffee) and How Old Is the Earth? (U03_earth).
//
// THE THREAD IS MODELLING. Both meanings from 3.2 are used — a model that
// represents (the globe, the football Sun, the formation model) and a model
// that uses maths to work out what nobody could see (÷ 6.3 billion). Limitations
// come once, just before the class judges the Solar System model, and are used
// again for the formation model.
//
// WRITING RULE (the 2.5 density): one hook line, short sentences, and the body
// never repeats the write note, a label or the caption.

import { DIAGRAMS } from './diagrams.js'
import { SolarSystem } from './solar.jsx'
import { PlanetSizes, ScaleShrink } from './sizes.jsx'
import { Formation } from './formation.jsx'

const TEAL = '#0087a8'
const PURPLE = '#5c2483'
const ORANGE = '#c25e12'
const GREEN = '#4a8b23'
const BLUE = '#1a5fa8'

export const slides = [
  // 1. Hero + starter: a size guess, nothing else
  {
    layout: 'hero',
    color: TEAL,
    icon: 'Telescope',
    brand: 'Year 7 Science',
    brandFr: 'Sciences 7e année',
    eyebrow: 'Unit 3 · Models',
    eyebrowFr: 'Unité 3 · Modèles',
    title: 'Models: Space',
    titleFr: 'Modèles : l’espace',
    card: {
      icon: 'Pencil',
      badge: 'Starter',
      badgeFr: 'Pour commencer',
      text: 'The Sun is the size of a **football**. How big is the **Earth**? Write: **I think … because …**',
      textFr: 'Le Soleil a la taille d’un **ballon de foot**. Quelle taille a la **Terre** ? Écris : **I think … because …**',
    },
  },

  // 2. Vote: the size of the Earth
  {
    layout: 'compare',
    accent: PURPLE,
    icon: 'Hand',
    eyebrow: 'Vote with one hand',
    eyebrowFr: 'Vote avec une main',
    title: 'The Sun Is a Football',
    titleFr: 'Le Soleil est un ballon de foot',
    text: 'If the Sun were a football, the Earth would be …',
    textFr: 'Si le Soleil était un ballon de foot, la Terre serait …',
    columns: [
      { heading: 'A · left hand up', headingFr: 'A · main gauche levée', accent: BLUE, icon: 'Hand', inlineSvg: DIAGRAMS.ANS_TENNIS },
      { heading: 'B · right hand up', headingFr: 'B · main droite levée', accent: ORANGE, icon: 'Hand', inlineSvg: DIAGRAMS.ANS_PIN },
    ],
  },

  // 3. The football model, one object at a time
  {
    layout: 'showcase',
    accent: TEAL,
    icon: 'Ruler',
    eyebrow: 'A scale model',
    eyebrowFr: 'Un modèle à l’échelle',
    title: 'Shrink the Solar System',
    titleFr: 'Réduis le système solaire',
    widget: ScaleShrink,
    caption: 'Answer: **B**, a pinhead. Now guess how **far** away, **before** each one is shown.',
    captionFr: 'Réponse : **B**, une tête d’épingle. Devine maintenant à quelle **distance**, **avant** chaque réponse.',
  },

  // 4. True sizes, then the Sun
  {
    layout: 'showcase',
    accent: TEAL,
    icon: 'Globe',
    eyebrow: 'All to the same scale',
    eyebrowFr: 'Tout à la même échelle',
    title: 'How Big Are the Planets?',
    titleFr: 'Quelle taille ont les planètes ?',
    widget: PlanetSizes,
    caption: 'Click a planet. Then add the **Sun**.',
    captionFr: 'Clique sur une planète. Puis ajoute le **Soleil**.',
  },

  // 5. The two meanings of "model" from 3.2
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Boxes',
    eyebrow: 'Review · 3.2',
    eyebrowFr: 'Révision · 3.2',
    title: 'Two Kinds of Model',
    titleFr: 'Deux sortes de modèles',
    ratio: 45,
    inlineSvg: DIAGRAMS.MODEL_TWO,
    content: 'You just used **both** kinds.',
    contentFr: 'Tu viens d’utiliser les **deux** sortes.',
    notes: [
      {
        tone: 'info',
        badge: 'From 3.2',
        badgeFr: 'Vu en 3.2',
        text: '**1 · A model represents something.** It shows something that is hard to observe directly. The football Sun is one.',
        textFr: '**1 · Un modèle représente quelque chose.** Il montre ce qu’on ne peut pas bien observer directement. Le Soleil-ballon en est un.',
      },
      {
        tone: 'info',
        badge: 'From 3.2',
        badgeFr: 'Vu en 3.2',
        text: '**2 · A model can use maths** to work out something we could never see. Dividing by 6 300 000 000 told us the Earth is a pinhead.',
        textFr: '**2 · Un modèle peut utiliser les maths** pour trouver ce qu’on ne pourra jamais voir. Diviser par 6 300 000 000 nous a dit que la Terre est une tête d’épingle.',
      },
    ],
  },

  // 6. The Solar System: 3.2's words, and 3.3's question
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Sun',
    eyebrow: 'Key word',
    eyebrowFr: 'Mot clé',
    title: 'The Solar System',
    titleFr: 'Le système solaire',
    ratio: 45,
    inlineSvg: DIAGRAMS.ORBIT,
    content: 'Words from 3.2: **orbit** · **spin** · **axis** · **plane**',
    contentFr: 'Mots vus en 3.2 : **orbit** (orbite) · **spin** (tourner) · **axis** (axe) · **plane** (plan)',
    notes: [
      {
        tone: 'write',
        text: '**Solar System:** the Sun and everything that orbits it: 8 planets, their moons, dwarf planets, asteroids and comets.',
        textFr: '**Système solaire (Solar System) :** le Soleil et tout ce qui tourne autour : 8 planètes, leurs lunes, des planètes naines, des astéroïdes et des comètes.',
      },
      {
        tone: 'theory',
        badge: 'Coming up in 3.3',
        badgeFr: 'À venir en 3.3',
        text: 'Why don’t the planets **fall into the Sun**? Why do they **keep going round**? We answer that in 3.3.',
        textFr: 'Pourquoi les planètes ne **tombent-elles pas sur le Soleil** ? Pourquoi **continuent-elles de tourner** ? On répond en 3.3.',
      },
    ],
  },

  // 7. Vote, as a 3.2 review: ball or plate?
  {
    layout: 'compare',
    accent: PURPLE,
    icon: 'Hand',
    eyebrow: 'Review · 3.2 · vote with one hand',
    eyebrowFr: 'Révision · 3.2 · vote avec une main',
    title: 'Ball or Plate?',
    titleFr: 'Boule ou assiette ?',
    text: 'Remember 3.2: from the **side**, all the orbits are …',
    textFr: 'Souviens-toi de 3.2 : vues **de côté**, toutes les orbites sont …',
    columns: [
      { heading: 'A · left hand up', headingFr: 'A · main gauche levée', accent: BLUE, icon: 'Hand', inlineSvg: DIAGRAMS.ANS_BALL },
      { heading: 'B · right hand up', headingFr: 'B · main droite levée', accent: ORANGE, icon: 'Hand', inlineSvg: DIAGRAMS.ANS_PLATE },
    ],
  },

  // 8. The working model (full slide)
  {
    layout: 'game',
    title: 'A Working Model of the Solar System',
    titleFr: 'Un modèle du système solaire qui fonctionne',
    widget: SolarSystem,
  },

  // 9. A model they know: what does a globe get wrong? (pairs)
  {
    layout: 'split',
    accent: PURPLE,
    icon: 'Globe',
    eyebrow: 'Pairs · 2 minutes',
    eyebrowFr: 'En binôme · 2 minutes',
    title: 'What Does a Globe Get Wrong?',
    titleFr: 'Qu’est-ce qu’un globe a de faux ?',
    ratio: 50,
    inlineSvg: DIAGRAMS.GLOBE,
    content: 'A globe is a **model** of the Earth. Find **three** things it gets wrong.',
    contentFr: 'Un globe est un **modèle** de la Terre. Trouve **trois** choses fausses.',
    reveal: {
      label: 'Some answers',
      labelFr: 'Quelques réponses',
      answer: 'It is about **40 million times** too small.\nIt does not **spin** by itself.\nNo clouds, no weather, no night.\nThe mountains are **flat**.',
      answerFr: 'Il est environ **40 millions de fois** trop petit.\nIl ne **tourne** pas tout seul.\nPas de nuages, pas de météo, pas de nuit.\nLes montagnes sont **plates**.',
    },
  },

  // 10. Limitation (write): the word for what they just found
  {
    layout: 'stack',
    accent: PURPLE,
    icon: 'Search',
    columns: 2,
    eyebrow: 'Key word',
    eyebrowFr: 'Mot clé',
    title: 'Limitation',
    titleFr: 'La limite',
    content: 'Scientists have a word for what a model gets wrong.',
    contentFr: 'Les scientifiques ont un mot pour ce qu’un modèle a de faux.',
    notes: [
      {
        tone: 'write',
        text: '**Limitation:** something a model cannot do, gets wrong or leaves out. Every model has limitations.',
        textFr: '**Limite (limitation) :** ce qu’un modèle ne peut pas faire, montre mal ou oublie. Tous les modèles ont des limites.',
      },
      {
        tone: 'theory',
        badge: 'Exam tip',
        badgeFr: 'Conseil pour l’examen',
        text: 'Cambridge **loves** this question: “Give one limitation of this model.”',
        textFr: 'Cambridge **adore** cette question : « Give one limitation of this model. » (Donne une limite de ce modèle.)',
      },
    ],
  },

  // 11. What does our computer model get wrong?
  {
    layout: 'statement',
    accent: PURPLE,
    eyebrow: 'Think like a scientist',
    eyebrowFr: 'Pense comme un scientifique',
    title: 'Is Our Model Right?',
    titleFr: 'Notre modèle est-il juste ?',
    text: 'Name **one** thing our model gets right, and **one** limitation.',
    textFr: 'Cite **une** chose juste dans notre modèle, et **une** limite.',
    reveal: {
      label: 'Some answers',
      labelFr: 'Quelques réponses',
      answer: '**Right:** where the planets are, their speeds, the distances, the flat plane.\n**Limitations:** planets drawn too big ("Enlarged"), time millions of times too fast, most moons missing.',
      answerFr: '**Juste :** la position des planètes, leurs vitesses, les distances, le plan.\n**Limites :** planètes trop grandes (« Agrandies »), temps des millions de fois trop rapide, presque pas de lunes.',
    },
  },

  // 12. Before the Sun — a 3.2 review
  {
    layout: 'statement',
    accent: BLUE,
    eyebrow: '4.6 billion years ago',
    eyebrowFr: 'Il y a 4.6 milliards d’années',
    title: 'Before the Sun',
    titleFr: 'Avant le Soleil',
    label: 'Review · 3.2',
    labelFr: 'Révision · 3.2',
    labelIcon: 'Repeat',
    text: 'There was no Sun and no Earth. Only a huge **cloud** of gas and dust: a **nebula**.',
    textFr: 'Il n’y avait ni Soleil ni Terre. Seulement un énorme **nuage** de gaz et de poussière : une **nébuleuse**.',
    sub: 'How do you make a Sun and 8 planets from a cloud?',
    subFr: 'Comment faire un Soleil et 8 planètes avec un nuage ?',
  },

  // 13. The formation model (full slide)
  {
    layout: 'game',
    title: 'How the Solar System Formed',
    titleFr: 'Comment le système solaire s’est formé',
    widget: Formation,
  },

  // 14. Why it spun faster and went flat
  {
    layout: 'showcase',
    accent: GREEN,
    icon: 'RotateCcw',
    eyebrow: 'Two things you can try',
    eyebrowFr: 'Deux choses à essayer',
    title: 'Spin Faster, Go Flat',
    titleFr: 'Tourner plus vite, s’aplatir',
    inlineSvg: DIAGRAMS.SPIN_FLAT,
    caption: 'The shrinking cloud did **both**. That is why the planets are flat and all go the **same way**.',
    captionFr: 'Le nuage qui rétrécit a fait **les deux**. Voilà pourquoi les planètes sont dans un plan et tournent toutes dans le **même sens**.',
  },

  // 15. The four steps (write + Draw This)
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'Pencil',
    eyebrow: 'Draw this',
    eyebrowFr: 'À dessiner',
    title: 'How the Solar System Formed',
    titleFr: 'Comment le système solaire s’est formé',
    ratio: 50,
    inlineSvg: DIAGRAMS.NEBULA_STEPS,
    drawThis: true,
    notes: [
      {
        tone: 'write',
        text: '1. Gravity pulls the nebula together. It spins faster.\n2. It flattens into a spinning disc.\n3. The hot middle becomes the Sun.\n4. Dust sticks together and grows into planets.',
        textFr: '1. La gravité rassemble la nébuleuse. Elle tourne plus vite.\n2. Elle s’aplatit en un disque qui tourne.\n3. Le centre chaud devient le Soleil.\n4. La poussière s’agglomère et forme des planètes.',
      },
    ],
  },

  // 16. Rocky or giant: the frost line
  {
    layout: 'compare',
    accent: TEAL,
    icon: 'Thermometer',
    eyebrow: 'Step 4 of the model',
    eyebrowFr: 'Étape 4 du modèle',
    title: 'Rocky or Giant?',
    titleFr: 'Rocheuse ou géante ?',
    columns: [
      {
        heading: 'Near the Sun: hot',
        headingFr: 'Près du Soleil : chaud',
        accent: ORANGE,
        icon: 'Flame',
        inlineSvg: DIAGRAMS.ROCKY,
        caption: 'Too hot for ice. Only **rock and metal**, so small **rocky** planets: Mercury, Venus, Earth, Mars.',
        captionFr: 'Trop chaud pour la glace. Seulement **roche et métal**, donc de petites planètes **rocheuses** : Mercure, Vénus, la Terre, Mars.',
      },
      {
        heading: 'Far away: cold',
        headingFr: 'Loin : froid',
        accent: BLUE,
        icon: 'Snowflake',
        inlineSvg: DIAGRAMS.GIANT,
        caption: '**Ice** too: big cores pull in **gas**, so **giants**: Jupiter, Saturn, Uranus, Neptune.',
        captionFr: 'De la **glace** aussi : de gros noyaux attirent du **gaz**, donc des **géantes** : Jupiter, Saturne, Uranus, Neptune.',
      },
    ],
  },

  // 17. Evidence: HL Tauri again, now as a check on the model
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Telescope',
    eyebrow: 'Evidence · you saw it in 3.2',
    eyebrowFr: 'Une preuve · vue en 3.2',
    title: 'We Can See It Happening',
    titleFr: 'On peut le voir en ce moment',
    ratio: 45,
    inlineSvg: DIAGRAMS.HL_TAU,
    content: 'A model must match what we **see**.\nHL Tauri is a young star with a dusty disc **today**. The dark gaps are where planets are growing.',
    contentFr: 'Un modèle doit correspondre à ce qu’on **voit**.\nHL Tauri est une jeune étoile entourée d’un disque de poussière, **aujourd’hui**. Les espaces sombres sont là où des planètes grandissent.',
  },

  // 18. Limitations of the formation model
  {
    layout: 'statement',
    accent: PURPLE,
    eyebrow: 'Think like a scientist',
    eyebrowFr: 'Pense comme un scientifique',
    title: 'What Does Our Model Get Wrong?',
    titleFr: 'Qu’est-ce que notre modèle a de faux ?',
    text: 'Give **two** limitations of the formation model.',
    textFr: 'Donne **deux** limites du modèle de formation.',
    reveal: {
      label: 'Some answers',
      labelFr: 'Quelques réponses',
      answer: 'Distances are **squashed**.\n100 million years take **one minute**.\nAbout 5 000 grains, and no real **gravity**.',
      answerFr: 'Les distances sont **écrasées**.\n100 millions d’années durent **une minute**.\nEnviron 5 000 grains, et pas de vraie **gravité**.',
    },
  },

  // 19. Checklist
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
    content: '> Check your notebook: **3 written panels** and **1 drawing**.',
    contentFr: '> Vérifie ton cahier : **3 encadrés recopiés** et **1 dessin**.',
    items: [
      { text: 'Give the **two** kinds of model, and one **limitation**.', textFr: 'Donner les **deux** sortes de modèles, et une **limite**.' },
      { text: 'Use a scale model to compare **sizes**.', textFr: 'Utiliser un modèle à l’échelle pour comparer des **tailles**.' },
      { text: 'Describe how a **nebula** became the Solar System.', textFr: 'Décrire comment une **nébuleuse** est devenue le système solaire.' },
      { text: 'Say why the planets near the Sun are **rocky**.', textFr: 'Dire pourquoi les planètes près du Soleil sont **rocheuses**.' },
    ],
  },

  // 20. Exit
  {
    layout: 'hero',
    color: TEAL,
    icon: 'Target',
    brand: 'Year 7 Science',
    brandFr: 'Sciences 7e année',
    eyebrow: 'Exit question',
    eyebrowFr: 'Question de sortie',
    title: 'One Spinning Disc',
    titleFr: 'Un seul disque qui tourne',
    subtitle: 'Why do all the planets go round the Sun the **same way**?',
    subtitleFr: 'Pourquoi les planètes tournent-elles toutes dans le **même sens** ?',
    reveal: {
      label: 'Answer',
      labelFr: 'Réponse',
      answer: 'They all formed from **one spinning disc** of gas and dust.\nThey still go round the way the disc was spinning.',
      answerFr: 'Elles se sont toutes formées dans **un seul disque** qui tournait.\nElles tournent toujours dans le même sens que lui.',
    },
  },
]
