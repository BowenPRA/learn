// content/y7-science/U03_earth/slides.js
// Year 7 Science · Unit 3.2 Maths Modelling: How Old Is the Earth?
// The follow-up to Coffee, Carbon and Stars, which ended on carbon dating's
// limit (about 50 000 years) and the model Sun. Here: longer clocks, the
// dinosaur between two layers of ash, why the oldest rock is not enough,
// zircon crystals and meteorites, Clair Patterson, three methods that agree
// on the Sun, and Earth's history squeezed into one year.
//
// ENGLISH AND FRENCH ONLY, like every Year 7 deck from Unit 4 / 15 October:
// every string has an …Fr twin and no …Vn twin. The diagrams stay in English.
//
// WRITING RULE (the 2.5 density): one hook line, short sentences, and the body
// never repeats the write note, a label or the caption.

import { DIAGRAMS } from './diagrams.js'
import { EarthYear } from './earthyear.jsx'

const TEAL = '#0087a8'
const PURPLE = '#5c2483'
const ORANGE = '#c25e12'
const GREEN = '#4a8b23'
const INDIGO = '#3949ab'

export const slides = [
  // 1. Hero + starter: a clock for billions of years?
  {
    layout: 'hero',
    color: INDIGO,
    icon: 'Globe',
    brand: 'Year 7 Science',
    brandFr: 'Sciences 7e année',
    eyebrow: 'Unit 3.2 · Maths Modelling',
    eyebrowFr: 'Unité 3.2 · Modélisation mathématique',
    title: 'How Old Is the Earth?',
    titleFr: 'Quel âge a la Terre ?',
    card: {
      icon: 'Timer',
      badge: 'Starter',
      badgeFr: 'Pour commencer',
      text: 'Carbon-14 is a clock for **50 000 years**. What would a clock for **4 billion years** need?',
      textFr: 'Le carbone 14 est une horloge pour **50 000 ans**. De quoi aurait besoin une horloge pour **4 milliards d’années** ?',
    },
  },

  // 2. Three clocks — the starter's answer: a much longer half-life
  {
    layout: 'showcase',
    accent: INDIGO,
    icon: 'Timer',
    eyebrow: 'The right clock for the job',
    eyebrowFr: 'La bonne horloge pour le travail',
    title: 'Three Clocks',
    titleFr: 'Trois horloges',
    inlineSvg: DIAGRAMS.CLOCKS,
    caption: 'You do not time a 100 m race with a calendar. Choose the clock with the right **half-life**.',
    captionFr: 'On ne chronomètre pas un 100 m avec un calendrier. Choisis l’horloge avec la bonne **demi-vie**.',
  },

  // 3. Dating a dinosaur
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Layers',
    eyebrow: 'Back to the dinosaur',
    eyebrowFr: 'Retour au dinosaure',
    title: 'Dating a Dinosaur',
    titleFr: 'Dater un dinosaure',
    ratio: 45,
    inlineSvg: DIAGRAMS.DINO_LAYERS,
    content: 'We do not date the bone. We date the **volcanic ash** above it and below it.',
    contentFr: 'On ne date pas l’os. On date les **cendres volcaniques** au-dessus et en dessous.',
    reveal: {
      label: 'How old is the dinosaur?',
      labelFr: 'Quel âge a le dinosaure ?',
      answer: 'Older than the ash above it, younger than the ash below it.\nSo it lived **between 66 and 68 million years ago**.',
      answerFr: 'Plus vieux que la cendre au-dessus, plus jeune que la cendre en dessous.\nIl a donc vécu **il y a entre 66 et 68 millions d’années**.',
    },
  },

  // 4. Why not the oldest rock?
  {
    layout: 'statement',
    accent: PURPLE,
    eyebrow: 'Think',
    eyebrowFr: 'Réfléchis',
    title: 'Why Not the Oldest Rock?',
    titleFr: 'Pourquoi pas la plus vieille roche ?',
    text: 'Why can’t we just find the **oldest rock**?',
    textFr: 'Pourquoi ne pas simplement trouver la **roche la plus vieille** ?',
    reveal: {
      label: 'Answer',
      labelFr: 'Réponse',
      answer: 'The Earth **recycles** its rocks. Volcanoes melt them, rain wears them away, and they sink back inside.\nThe oldest rocks are about **4 billion** years old (Canada). The oldest crystal is **4.4 billion** years old (Australia).',
      answerFr: 'La Terre **recycle** ses roches. Les volcans les font fondre, la pluie les use, et elles replongent à l’intérieur.\nLes plus vieilles roches ont environ **4 milliards** d’années (Canada). Le plus vieux cristal a **4.4 milliards** d’années (Australie).',
    },
  },

  // 5. A clock inside a crystal
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Gauge',
    eyebrow: 'A clock inside a crystal',
    eyebrowFr: 'Une horloge dans un cristal',
    title: 'Zircon Crystals',
    titleFr: 'Les cristaux de zircon',
    ratio: 45,
    inlineSvg: DIAGRAMS.ZIRCON,
    content: 'A new zircon crystal takes in **uranium**, but **no lead**.\nSo all the lead inside came from uranium breaking down. The clock starts at zero.',
    contentFr: 'Un cristal de zircon neuf contient de l’**uranium**, mais **pas de plomb**.\nTout le plomb à l’intérieur vient donc de l’uranium qui s’est désintégré. L’horloge part de zéro.',
    notes: [
      {
        tone: 'theory',
        text: 'Uranium-238’s half-life is **4.5 billion years**. More lead, less uranium: an **older** crystal.',
        textFr: 'La demi-vie de l’uranium 238 est de **4.5 milliards d’années**. Plus de plomb, moins d’uranium : un cristal plus **vieux**.',
      },
    ],
  },

  // 6. Meteorites
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Sparkles',
    eyebrow: 'Rocks from space',
    eyebrowFr: 'Des roches venues de l’espace',
    title: 'Meteorites',
    titleFr: 'Les météorites',
    ratio: 45,
    inlineSvg: DIAGRAMS.METEORITE,
    content: 'Meteorites are **leftover** building blocks of the planets (the formation model, step 7). They were **never** melted or recycled.',
    contentFr: 'Les météorites sont des **restes** des briques qui ont fait les planètes (le modèle de formation, étape 7). Elles n’ont **jamais** fondu ni été recyclées.',
    notes: [
      {
        tone: 'info',
        text: 'The white specks are the oldest solids in the Solar System. The Allende meteorite fell in Mexico in **1969**.',
        textFr: 'Les taches blanches sont les plus vieux solides du système solaire. La météorite d’Allende est tombée au Mexique en **1969**.',
      },
    ],
  },

  // 7. Work it out: one half-life
  {
    layout: 'statement',
    accent: PURPLE,
    eyebrow: 'Work it out',
    eyebrowFr: 'Calcule',
    title: 'Half Is Gone',
    titleFr: 'La moitié est partie',
    text: 'In the oldest meteorites, **half** the uranium-238 is now lead.',
    textFr: 'Dans les plus vieilles météorites, la **moitié** de l’uranium est du plomb.',
    sub: 'Its half-life is 4.5 billion years. How old are they?',
    subFr: 'Demi-vie : 4.5 milliards d’années. Quel âge ont-elles ?',
    reveal: {
      label: 'Answer',
      labelFr: 'Réponse',
      answer: 'Half gone = **one half-life** = about **4.5 billion years**.',
      answerFr: 'Moitié partie = **une demi-vie** = **4.5 milliards d’années**.',
    },
  },

  // 8. Clair Patterson
  {
    layout: 'callout',
    accent: GREEN,
    icon: 'FlaskConical',
    eyebrow: 'A true story',
    eyebrowFr: 'Une histoire vraie',
    title: 'The Man Who Measured the Earth',
    titleFr: 'L’homme qui a mesuré l’âge de la Terre',
    content: 'In 1953, **Clair Patterson** measured the lead in meteorites. The Earth was **4.55 billion years** old.\nBut lead from car petrol was everywhere, even in his lab. So he built one of the first **super-clean** labs.\nThen he fought for years to stop **leaded petrol**. The whole world stopped selling it for cars in **2021**.',
    contentFr: 'En 1953, **Clair Patterson** a mesuré le plomb des météorites. La Terre avait **4.55 milliards d’années**.\nMais le plomb de l’essence des voitures était partout, même dans son labo. Il a donc construit l’un des premiers labos **ultra-propres**.\nPuis il s’est battu pendant des années contre l’**essence au plomb**. Le monde entier a arrêté de la vendre pour les voitures en **2021**.',
  },

  // 9. The age of the Earth (write)
  {
    layout: 'statement',
    accent: TEAL,
    eyebrow: 'Put it together',
    eyebrowFr: 'En résumé',
    title: 'The Age of the Earth',
    titleFr: 'L’âge de la Terre',
    text: 'The Earth is about **4.5 billion years** old.',
    textFr: 'La Terre a environ **4.5 milliards d’années**.',
    notes: [
      {
        tone: 'write',
        text: 'We know the Earth’s age from **radioactive dating** of the oldest rocks, crystals and meteorites. Different clocks give the **same answer**.',
        textFr: 'On connaît l’âge de la Terre grâce à la **datation radioactive** des plus vieilles roches, des cristaux et des météorites. Des horloges différentes donnent la **même réponse**.',
      },
    ],
  },

  // 10. Three methods, one answer: the Sun (write)
  {
    layout: 'stack',
    accent: ORANGE,
    icon: 'CheckCircle2',
    columns: 2,
    eyebrow: 'Why scientists trust it',
    eyebrowFr: 'Pourquoi les scientifiques y croient',
    title: 'Three Methods, One Answer',
    titleFr: 'Trois méthodes, une réponse',
    notes: [
      {
        tone: 'info',
        badge: 'Meteorites',
        badgeFr: 'Les météorites',
        text: '**4.57 billion years**: the oldest bits of the Solar System.',
        textFr: '**4.57 milliards d’années** : les plus vieux morceaux du système solaire.',
      },
      {
        tone: 'info',
        badge: 'A model Sun',
        badgeFr: 'Un Soleil modèle',
        text: '**About 4.6 billion years**: you matched it last lesson.',
        textFr: '**Environ 4.6 milliards d’années** : tu l’as trouvé au dernier cours.',
      },
      {
        tone: 'info',
        badge: 'The Sun’s vibrations',
        badgeFr: 'Les vibrations du Soleil',
        text: '**4.57 billion years**: waves inside the Sun show how much hydrogen is left.',
        textFr: '**4.57 milliards d’années** : les ondes dans le Soleil montrent combien d’hydrogène il reste.',
      },
      {
        tone: 'write',
        text: 'When different methods **agree**, scientists trust the answer. The Sun and the Earth formed together, about **4.6 billion years** ago.',
        textFr: 'Quand des méthodes différentes sont **d’accord**, les scientifiques font confiance à la réponse. Le Soleil et la Terre se sont formés ensemble, il y a environ **4.6 milliards d’années**.',
      },
    ],
  },

  // 11. All of Earth's history in one year
  {
    layout: 'showcase',
    accent: TEAL,
    icon: 'Timer',
    eyebrow: 'A scale model of time',
    eyebrowFr: 'Un modèle du temps à l’échelle',
    title: 'Earth’s History in One Year',
    titleFr: 'L’histoire de la Terre en un an',
    widget: EarthYear,
    caption: 'Guess the **date** of each event before it is shown.',
    captionFr: 'Devine la **date** de chaque événement avant qu’elle s’affiche.',
  },

  // 12. Checklist
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
    content: '> Check your notebook: **2 written panels**.',
    contentFr: '> Vérifie ton cahier : **2 encadrés recopiés**.',
    items: [
      { text: 'Choose the right **clock** for the job.', textFr: 'Choisir la bonne **horloge** pour le travail.' },
      { text: 'Date a dinosaur from the **ash** around it.', textFr: 'Dater un dinosaure grâce aux **cendres** autour.' },
      { text: 'Say how **crystals** and **meteorites** give the Earth’s age.', textFr: 'Dire comment les **cristaux** et les **météorites** donnent l’âge de la Terre.' },
      { text: 'Say why scientists **trust** the Sun’s age.', textFr: 'Dire pourquoi les scientifiques **croient** l’âge du Soleil.' },
    ],
  },

  // 13. Exit
  {
    layout: 'hero',
    color: INDIGO,
    icon: 'Target',
    brand: 'Year 7 Science',
    brandFr: 'Sciences 7e année',
    eyebrow: 'Exit question',
    eyebrowFr: 'Question de sortie',
    title: 'The Wrong Clock',
    titleFr: 'La mauvaise horloge',
    subtitle: 'Why can’t carbon-14 tell us the age of the **Earth**?',
    subtitleFr: 'Pourquoi le carbone 14 ne donne-t-il pas l’âge de la **Terre** ?',
    reveal: {
      label: 'Answer',
      labelFr: 'Réponse',
      answer: 'The Earth is **far too old** for carbon-14.\nWe need a much **longer half-life**: uranium-238.',
      answerFr: 'La Terre est **bien trop vieille** pour le carbone 14.\nIl faut une **demi-vie** plus **longue** : l’uranium 238.',
    },
  },
]
