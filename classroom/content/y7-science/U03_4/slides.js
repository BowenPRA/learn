// content/y7-science/U03_4/slides.js
// Year 7 Science · 3.4 Tides. One 50-minute period, after 3.3 (Movement in
// Space): gravity keeps the Moon in orbit, and now the Moon's gravity pulls
// back. Source: Learner's Book pages 97–104 (Unit 3 Forces and energy).
//
// ENGLISH AND FRENCH ONLY, like every Year 7 deck from Unit 4 / 15 October:
// every string has an …Fr twin and no …Vn twin. The diagrams stay in English.
//
// THE ARC (the shape of Coffee, Carbon and Stars; plan.js has the timings):
//   The sea    how many times a day is the sea at its highest? A day at Mr
//              Bowen's harbour, three hours a press: 6, 4, 2, 4, 6 m. Twice a
//              day. Tide (the road to Holy Island going under the sea), the
//              same harbour six hours apart, tidal range, the book's
//              Question 6 (not 7.0 m).
//   The Moon   what happens next? Mr Bowen ties up his boat, very tight, and
//              it is left hanging from the wall: where does the sea go? The
//              Moon's gravity: tidal force. One high tide or two? (vote) Three
//              students show why two: the Earth is stretched. Spin the Earth
//              through the two bulges and its graph is the harbour's graph.
//              Draw it (page 99). High tide or low tide? Arms up, arms down,
//              the whole class standing. And 50 minutes later every day.
//   The Sun    the Sun has the strongest gravity: so its tides are bigger?
//              (vote) No: it pulls harder, but it stretches the Earth less, and
//              tides come from the stretch. Line up the Sun and the Moon: the
//              biggest tides at full moon and new moon.
//              What tides do (harbours, floods, food, electricity), and the
//              land's own tide. The Moon pulls, the Earth spins, the Sun helps.
//
// The goals slide (2) and the checklist (23) say the same three things — the
// sea, the Moon, the Sun — so the lesson ends where it said it would; the
// starter's question comes back on slide 4 and the harbour runs through it.
//
// COPY-DOWN: 5 written panels — tide (5), tidal range (7), tidal force (10),
// earth tide (21), put it together (22) — and 1 drawing (14). Each panel is
// the definition only; a fact that goes with it sits underneath, to read.
//
// WRITING RULE (the 2.5 density): one hook line, short sentences, and the body
// never repeats the write note, a label or the caption.

import { DIAGRAMS } from './diagrams.js'
import { HarbourClock, TideFilm, SpinEarth, HighOrLow } from './tides.jsx'
import { LineThemUp } from './moon.jsx'
import { BoatStory } from './story.jsx'

const TEAL = '#0087a8'
const PURPLE = '#5c2483'
const ORANGE = '#c25e12'
const GREEN = '#4a8b23'
const BLUE = '#1a5fa8'

export const slides = [
  // ════════════════════════════════════════════════════════════════════════
  // THE SEA — what a tide is, from Mr Bowen's harbour
  // ════════════════════════════════════════════════════════════════════════

  // 1. Hero + starter: how many times a day?
  {
    layout: 'hero',
    color: BLUE,
    icon: 'Waves',
    brand: 'Year 7 Science',
    brandFr: 'Sciences 7e année',
    eyebrow: '3.4 · Forces and energy',
    eyebrowFr: '3.4 · Forces et énergie',
    title: 'Tides',
    titleFr: 'Les marées',
    card: {
      icon: 'Waves',
      badge: 'Starter',
      badgeFr: 'Pour commencer',
      text: 'At the beach, the sea goes **up** and **down**. How many times a day is the water at its **highest**? **Guess a number** and write it down.',
      textFr: 'À la plage, la mer **monte** et **descend**. Combien de fois par jour l’eau est-elle au plus **haut** ? **Devine un nombre** et écris-le.',
    },
  },

  // 2. Today's goals (the checklist on slide 23 ticks off the same three)
  {
    layout: 'compare',
    accent: TEAL,
    icon: 'Target',
    eyebrow: 'Today',
    eyebrowFr: 'Aujourd’hui',
    title: 'Today You Will…',
    titleFr: 'Aujourd’hui, tu vas…',
    text: 'Find out why the sea goes **up** and **down** every day.',
    textFr: 'Découvrir pourquoi la mer **monte** et **descend** chaque jour.',
    columns: [
      {
        heading: 'The sea',
        headingFr: 'La mer',
        accent: BLUE,
        icon: 'Waves',
        inlineSvg: DIAGRAMS.PIC_SEA,
        caption: 'See how high and low the sea goes.',
        captionFr: 'Voir jusqu’où la mer monte et descend.',
      },
      {
        heading: 'The Moon',
        headingFr: 'La Lune',
        accent: TEAL,
        icon: 'Moon',
        inlineSvg: DIAGRAMS.PIC_MOON,
        caption: 'Find out how the Moon pulls the sea.',
        captionFr: 'Découvrir comment la Lune tire la mer.',
      },
      {
        heading: 'The Sun',
        headingFr: 'Le Soleil',
        accent: ORANGE,
        icon: 'Sun',
        inlineSvg: DIAGRAMS.PIC_SUN,
        caption: 'Find out when the sea goes highest.',
        captionFr: 'Trouver quand la mer monte le plus.',
      },
    ],
  },

  // 3. The harbour stepper
  {
    layout: 'showcase',
    accent: BLUE,
    icon: 'Waves',
    eyebrow: 'Say it first',
    eyebrowFr: 'Dis-le d’abord',
    title: 'Mr Bowen’s Harbour',
    titleFr: 'Le port de M. Bowen',
    widget: HarbourClock,
    caption: 'One press = **3 hours**. Say the next depth **before** it is shown.',
    captionFr: 'Un clic = **3 heures**. Dis la profondeur suivante **avant** qu’elle s’affiche.',
  },

  // 4. Back to the starter
  {
    layout: 'statement',
    accent: PURPLE,
    eyebrow: 'Back to the starter',
    eyebrowFr: 'Retour au début',
    title: 'How Many a Day?',
    titleFr: 'Combien par jour ?',
    text: 'How many times a day is Mr Bowen’s harbour at **high tide**?',
    textFr: 'Combien de fois par jour le port de M. Bowen est-il à **marée haute** ?',
    reveal: {
      label: 'Answer',
      labelFr: 'Réponse',
      answer: '**Twice:** 6 a.m. and 6 p.m. And **low tide** twice: 12 noon and midnight.\nHigh to low: **6 hours**. High to high: **12 hours**.',
      answerFr: '**Deux fois :** 6 h et 18 h. Et **marée basse** deux fois : midi et minuit.\nDe haute à basse : **6 heures**. De haute à haute : **12 heures**.',
    },
  },

  // 5. Tide (write), beside the real thing
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Waves',
    eyebrow: 'Key word',
    eyebrowFr: 'Mot clé',
    title: 'Tide',
    titleFr: 'La marée',
    ratio: 45,
    widget: TideFilm,
    content: '**high tide** · **low tide** · the **depth**',
    contentFr: '**high tide** (la marée haute) · **low tide** (la marée basse) · the **depth** (la profondeur)',
    notes: [
      {
        tone: 'write',
        text: '**Tide:** the change in the **depth** of the sea during the day.',
        textFr: '**Marée (tide) :** le changement de **profondeur** de la mer pendant la journée.',
      },
      {
        tone: 'info',
        badge: false,
        text: 'Holy Island, England: the sea covers this road **twice a day**.',
        textFr: 'Holy Island, en Angleterre : la mer couvre cette route **deux fois par jour**.',
      },
    ],
  },

  // 6. The book's photo pair, as real photographs
  {
    layout: 'showcase',
    accent: BLUE,
    icon: 'ScanEye',
    eyebrow: 'Page 98 · real photos',
    eyebrowFr: 'Page 98 · vraies photos',
    title: 'The Same Harbour, Six Hours Apart',
    titleFr: 'Le même port, six heures plus tard',
    inlineSvg: DIAGRAMS.TIDE_PHOTOS,
    caption: 'The Bay of Fundy, Canada: the **biggest** tides in the world. What changed?',
    captionFr: 'La baie de Fundy, au Canada : les **plus grandes** marées du monde. Qu’est-ce qui a changé ?',
  },

  // 7. Tidal range (write)
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Ruler',
    eyebrow: 'Key word',
    eyebrowFr: 'Mot clé',
    title: 'Tidal Range',
    titleFr: 'Le marnage',
    ratio: 45,
    inlineSvg: DIAGRAMS.RANGE,
    content: 'Mr Bowen’s harbour: 6 m − 2 m = **4 m**.',
    contentFr: 'Le port de M. Bowen : 6 m − 2 m = **4 m**.',
    notes: [
      {
        tone: 'write',
        text: '**Tidal range:** the difference in depth between high tide and low tide.',
        textFr: '**Marnage (tidal range) :** la différence de profondeur entre la marée haute et la marée basse.',
      },
      {
        tone: 'info',
        badge: false,
        text: 'The Bay of Fundy: **16.3 m**. The Mediterranean Sea: **less than 1 m**.',
        textFr: 'La baie de Fundy : **16.3 m**. La mer Méditerranée : **moins de 1 m**.',
      },
    ],
  },

  // 8. The book's Question 6: the trap is 7.0 m
  {
    layout: 'statement',
    accent: PURPLE,
    eyebrow: 'Question 6 · whiteboards',
    eyebrowFr: 'Question 6 · ardoises',
    title: 'The Deepest Water',
    titleFr: 'L’eau la plus profonde',
    text: 'Average depth: **5.0 m**. Tidal range: **2.0 m**. What is the **maximum** depth?',
    textFr: 'Profondeur moyenne : **5.0 m**. Marnage : **2.0 m**. Quelle est la profondeur **maximale** ?',
    reveal: {
      label: 'Answer',
      labelFr: 'Réponse',
      answer: 'Not 7.0 m! The water goes **1.0 m** above the average and **1.0 m** below. Maximum: 5.0 + 1.0 = **6.0 m**.',
      answerFr: 'Pas 7.0 m ! L’eau monte de **1.0 m** au-dessus de la moyenne et descend de **1.0 m** en dessous. Maximum : 5.0 + 1.0 = **6.0 m**.',
    },
  },

  // ════════════════════════════════════════════════════════════════════════
  // THE MOON — what pulls the sea, and why twice a day
  // ════════════════════════════════════════════════════════════════════════

  // 9. What happens next? Mr Bowen's boat, one panel per press (deadpan)
  {
    layout: 'showcase',
    accent: BLUE,
    icon: 'Anchor',
    eyebrow: 'What happens next?',
    eyebrowFr: 'Que se passe-t-il ensuite ?',
    title: 'Mr Bowen’s Boat',
    titleFr: 'Le bateau de M. Bowen',
    widget: BoatStory,
    caption: 'Before each step, **predict**: what happens next?',
    captionFr: 'Avant chaque étape, **prédis** : que se passe-t-il ensuite ?',
  },

  // 10. Tidal force (write)
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Moon',
    eyebrow: 'Key word',
    eyebrowFr: 'Mot clé',
    title: 'Tidal Force',
    titleFr: 'La force de marée',
    ratio: 45,
    inlineSvg: DIAGRAMS.MOON_PULL,
    content: 'Gravity keeps the **Moon** in orbit (3.3). But the Moon has gravity too: it pulls on the Earth.',
    contentFr: 'La gravité garde la **Lune** en orbite (3.3). Mais la Lune a aussi une gravité : elle tire sur la Terre.',
    notes: [
      {
        tone: 'write',
        text: '**Tidal force:** the pull of the Moon’s gravity on the oceans.',
        textFr: '**Force de marée (tidal force) :** l’attraction de la gravité de la Lune sur les océans.',
      },
    ],
  },

  // 11. Vote: one high tide or two?
  {
    layout: 'compare',
    accent: PURPLE,
    icon: 'Hand',
    eyebrow: 'Vote with one hand',
    eyebrowFr: 'Vote avec une main',
    title: 'How Many High Tides?',
    titleFr: 'Combien de marées hautes ?',
    text: 'The Moon pulls the oceans. How many **high tides** does the Earth have **at the same time**?',
    textFr: 'La Lune tire les océans. Combien de **marées hautes** la Terre a-t-elle **en même temps** ?',
    columns: [
      { heading: 'A · left hand up', headingFr: 'A · main gauche levée', accent: BLUE, icon: 'Hand', inlineSvg: DIAGRAMS.ANS_ONE },
      { heading: 'B · right hand up', headingFr: 'B · main droite levée', accent: ORANGE, icon: 'Hand', inlineSvg: DIAGRAMS.ANS_TWO },
    ],
  },

  // 12. Answer B, shown with three students
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Users',
    eyebrow: 'Answer: B · try it',
    eyebrowFr: 'Réponse : B · essaie',
    title: 'The Earth Is Stretched',
    titleFr: 'La Terre est étirée',
    ratio: 45,
    inlineSvg: DIAGRAMS.STRETCH,
    content: 'The **near** side moves most. The **far** side is left behind. So the water makes a bulge on **both** sides.',
    contentFr: 'Le côté **proche** bouge le plus. Le côté **éloigné** reste en arrière. Donc l’eau fait une bosse des **deux** côtés.',
    notes: [
      {
        tone: 'task',
        badge: 'Try it',
        badgeFr: 'Essaie',
        text: 'Three students in a line, facing the Moon. Near side: **3 steps**. Middle: **2 steps**. Far side: **1 step**.',
        textFr: 'Trois élèves en ligne, face à la Lune. Côté proche : **3 pas**. Milieu : **2 pas**. Côté éloigné : **1 pas**.',
      },
    ],
  },

  // 13. The model: spin the Earth through the two bulges
  {
    layout: 'showcase',
    accent: BLUE,
    icon: 'RotateCcw',
    eyebrow: 'A model',
    eyebrowFr: 'Un modèle',
    title: 'Spin the Earth',
    titleFr: 'Fais tourner la Terre',
    widget: SpinEarth,
    caption: 'Before each press: will the harbour be at **high tide** or **low tide**?',
    captionFr: 'Avant chaque clic : le port sera-t-il à **marée haute** ou à **marée basse** ?',
  },

  // 14. Draw This (page 99)
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'Pencil',
    eyebrow: 'Draw this · page 99',
    eyebrowFr: 'À dessiner · page 99',
    title: 'Two High Tides a Day',
    titleFr: 'Deux marées hautes par jour',
    ratio: 45,
    inlineSvg: DIAGRAMS.TWO_TIDES,
    drawThis: true,
    content: 'Copy the drawing and its labels: the Earth, seen from above the **North Pole**.',
    contentFr: 'Recopie le dessin et ses légendes : la Terre, vue du dessus du **pôle Nord**.',
    notes: [
      {
        tone: 'info',
        badge: false,
        text: 'As the Earth **spins**, every coast passes through **2 high tides** and **2 low tides** a day.',
        textFr: 'Quand la Terre **tourne**, chaque côte passe par **2 marées hautes** et **2 marées basses** par jour.',
      },
    ],
  },

  // 15. High tide or low tide? The whole class, standing
  {
    layout: 'showcase',
    accent: GREEN,
    icon: 'Trophy',
    eyebrow: 'A game · everyone stands',
    eyebrowFr: 'Un jeu · tout le monde debout',
    title: 'High Tide or Low Tide?',
    titleFr: 'Marée haute ou marée basse ?',
    widget: HighOrLow,
    caption: '**Arms up:** high tide. **Arms down:** low tide. The last ones standing win a prize ticket!',
    captionFr: '**Bras en haut :** marée haute. **Bras en bas :** marée basse. Les derniers debout gagnent un ticket !',
  },

  // 16. The same time tomorrow? (Activity Question 5) The picture is the clue:
  // after one turn the harbour must turn a little more to face the Moon again.
  {
    layout: 'split',
    accent: PURPLE,
    icon: 'Timer',
    eyebrow: 'Think · whiteboards',
    eyebrowFr: 'Réfléchis · ardoises',
    title: 'The Same Time Tomorrow?',
    titleFr: 'À la même heure demain ?',
    ratio: 45,
    inlineSvg: DIAGRAMS.MOON_MOVES,
    content: 'High tide is at **6 a.m.** today. But the Moon moves on a little every day. Is high tide at 6 a.m. **tomorrow**?',
    contentFr: 'La marée haute est à **6 h** aujourd’hui. Mais la Lune avance un peu chaque jour. La marée haute sera-t-elle à 6 h **demain** ?',
    reveal: {
      label: 'Answer',
      labelFr: 'Réponse',
      answer: '**No: about 50 minutes later.** After one turn, the Earth must turn a little more to face the Moon again: 24 hours ÷ 29 ≈ 50 minutes.',
      answerFr: '**Non : environ 50 minutes plus tard.** Après un tour, la Terre doit tourner encore un peu pour être face à la Lune : 24 heures ÷ 29 ≈ 50 minutes.',
    },
  },

  // ════════════════════════════════════════════════════════════════════════
  // THE SUN — when the tides are biggest, and what tides do
  // ════════════════════════════════════════════════════════════════════════

  // 17. Vote: the Sun or the Moon?
  {
    layout: 'compare',
    accent: PURPLE,
    icon: 'Hand',
    eyebrow: 'Vote with one hand',
    eyebrowFr: 'Vote avec une main',
    title: 'The Sun or the Moon?',
    titleFr: 'Le Soleil ou la Lune ?',
    text: 'The Sun has the **strongest gravity** in the Solar System. Which makes **bigger** tides?',
    textFr: 'Le Soleil a la **gravité la plus forte** du système solaire. Lequel fait les **plus grandes** marées ?',
    columns: [
      { heading: 'A · left hand up', headingFr: 'A · main gauche levée', accent: BLUE, icon: 'Hand', inlineSvg: DIAGRAMS.ANS_SUN },
      { heading: 'B · right hand up', headingFr: 'B · main droite levée', accent: ORANGE, icon: 'Hand', inlineSvg: DIAGRAMS.ANS_MOON },
    ],
  },

  // 18. Answer B: the Sun is too far away to stretch the Earth much
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Sun',
    eyebrow: 'Answer: B · the Moon',
    eyebrowFr: 'Réponse : B · la Lune',
    title: 'Pull and Stretch',
    titleFr: 'Tirer et étirer',
    ratio: 45,
    inlineSvg: DIAGRAMS.SUN_FAR,
    content: 'The Sun **pulls** the Earth harder. But it is **390 times** further away, so it **stretches** the Earth less.',
    contentFr: 'Le Soleil **tire** plus fort sur la Terre. Mais il est **390 fois** plus loin, donc il l’**étire** moins.',
    notes: [
      {
        tone: 'info',
        badge: false,
        text: 'The Sun’s tidal force is about **half** the Moon’s.',
        textFr: 'La force de marée du Soleil est environ la **moitié** de celle de la Lune.',
      },
    ],
  },

  // 19. The model: line up the Sun and the Moon (Activity Part 3)
  {
    layout: 'showcase',
    accent: ORANGE,
    icon: 'Sun',
    eyebrow: 'A model · one month',
    eyebrowFr: 'Un modèle · un mois',
    title: 'Line Them Up',
    titleFr: 'Aligne-les',
    widget: LineThemUp,
    caption: 'Find the days with the **biggest** tides. What does the Moon look like then?',
    captionFr: 'Trouve les jours où les marées sont les **plus grandes**. À quoi ressemble la Lune ces jours-là ?',
  },

  // 20. What tides do (page 100)
  {
    layout: 'showcase',
    accent: GREEN,
    icon: 'Anchor',
    eyebrow: 'Effects of tides · page 100',
    eyebrowFr: 'Les effets des marées · page 100',
    title: 'What Tides Do',
    titleFr: 'Ce que font les marées',
    inlineSvg: DIAGRAMS.EFFECTS,
    caption: 'Which one happened to Mr Bowen’s boat?',
    captionFr: 'Lequel est arrivé au bateau de M. Bowen ?',
  },

  // 21. Earth tide (write)
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Building2',
    eyebrow: 'Key word',
    eyebrowFr: 'Mot clé',
    title: 'Earth Tide',
    titleFr: 'La marée terrestre',
    ratio: 45,
    inlineSvg: DIAGRAMS.EARTH_TIDE,
    content: 'The **land** has tides too. Hanoi goes up and down about **30 cm**, twice a day.',
    contentFr: 'La **terre** aussi a des marées. Hanoi monte et descend d’environ **30 cm**, deux fois par jour.',
    notes: [
      {
        tone: 'write',
        text: '**Earth tide:** the land going up and down because of tidal forces.',
        textFr: '**Marée terrestre (earth tide) :** la terre qui monte et descend à cause des forces de marée.',
      },
    ],
    reveal: {
      prompt: 'Why don’t we feel it?',
      promptFr: 'Pourquoi ne le sent-on pas ?',
      label: 'Answer',
      labelFr: 'Réponse',
      answer: 'Everything goes up **together**: the ground, the buildings and you. Scientists study it to help predict **earthquakes** and **volcanoes**.',
      answerFr: 'Tout monte **ensemble** : le sol, les bâtiments et toi. Les scientifiques l’étudient pour aider à prévoir les **séismes** et les **volcans**.',
    },
  },

  // 22. The Moon pulls, the Earth spins, the Sun helps (write)
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'Waves',
    eyebrow: 'Put it together',
    eyebrowFr: 'En résumé',
    title: 'The Moon Pulls, the Earth Spins',
    titleFr: 'La Lune tire, la Terre tourne',
    ratio: 50,
    inlineSvg: DIAGRAMS.SUMMARY,
    notes: [
      {
        tone: 'write',
        text: 'The **Moon’s tidal force** pulls the oceans into **2 bulges**. The Earth **spins** through them: **2 high tides** a day. Tides are **biggest** when the Sun, the Moon and the Earth are in a **line**: at **full moon** and **new moon**.',
        textFr: 'La **force de marée de la Lune** tire les océans en **2 bosses**. La Terre **tourne** à travers elles : **2 marées hautes** par jour. Les marées sont les **plus grandes** quand le Soleil, la Lune et la Terre sont **alignés** : à la **pleine lune** et à la **nouvelle lune**.',
      },
    ],
    reveal: {
      label: 'Who worked it out?',
      labelFr: 'Qui l’a découvert ?',
      answer: 'In **330 BCE**, a Greek sailor from **Marseille** saw that the tides follow the Moon. In **1687**, Newton explained why: **gravity**.',
      answerFr: 'En **330 av. J.-C.**, un marin grec de **Marseille** a vu que les marées suivent la Lune. En **1687**, Newton a expliqué pourquoi : la **gravité**.',
    },
  },

  // 23. Checklist: slide 2's goals, ticked off
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
      { text: 'Explain what a **tide** and the **tidal range** are.', textFr: 'Expliquer ce que sont la **marée** et le **marnage**.' },
      { text: 'Explain how the Moon’s **tidal force** gives **2 high tides** a day.', textFr: 'Expliquer comment la **force de marée** de la Lune donne **2 marées hautes** par jour.' },
      { text: 'Explain why the **biggest** tides come at **full moon** and **new moon**.', textFr: 'Expliquer pourquoi les **plus grandes** marées arrivent à la **pleine lune** et à la **nouvelle lune**.' },
      { text: 'Give **effects** of tides on the **sea** and on the **land**.', textFr: 'Donner des **effets** des marées sur la **mer** et sur la **terre**.' },
    ],
  },

  // 24. Exit
  {
    layout: 'hero',
    color: BLUE,
    icon: 'Target',
    brand: 'Year 7 Science',
    brandFr: 'Sciences 7e année',
    eyebrow: 'Exit question',
    eyebrowFr: 'Question de sortie',
    title: 'A Full Moon',
    titleFr: 'Une pleine lune',
    subtitle: 'High tide is at **7 a.m.** When is the **next** high tide? Will the tides be **big** or **small**?',
    subtitleFr: 'La marée haute est à **7 h**. Quand est la **prochaine** ? Grandes ou petites marées ?',
    reveal: {
      label: 'Answer',
      labelFr: 'Réponse',
      answer: 'About **7 p.m.**, 12 hours later. **Big:** at full moon, the Sun, the Moon and the Earth are in a line.',
      answerFr: 'Vers **19 h**, 12 heures plus tard. **Grandes :** le Soleil, la Lune et la Terre sont alignés.',
    },
  },
]
