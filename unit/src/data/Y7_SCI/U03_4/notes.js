// src/data/Y7_SCI/U03_4/notes.js
// 3.4 Tides — the self-study deck. TWO classroom decks reduced to ONE (pairing
// rule 10): y7-science/U03_4 (Tides, 24 slides, Learner's Book pp. 97–104) and
// y7-science/U03_tidelab (The River Tide Lab, 21 slides). 24 slides, 15 scored:
// 6 predict, 1 hotspot, 2 sort, 6 checks. Plan, with every cut and why:
// docs/y7-science/plans/U03_4.md.
//
// FOUR PARTS, AS THE HERO SAYS: the sea (what a tide is, from Mr Bowen's
// harbour), the Moon (two bulges, the far side, 50 minutes later), the Sun (pull
// and stretch, the biggest tides) and our river (the lab: read the pole, coming
// in or going out). The deck ends on the two predictions Tide Lab tests.
//
// For a student alone: the hand votes are `predict` activities, the whiteboard
// questions are checks, the Draw This is a hotspot, the standing game and the
// three students are gone (their point is in the drawings), and nothing says
// "on paper". House notes: a slide's `check:` or `activity:` is its LAST key and
// no slide carries both; activity items use name/explain, never text.
import { DIAGRAMS } from './diagrams.js';
import { DIAGRAMS_LAB } from './diagramsLab.js';
import { HarbourClock, TideFilm, SpinEarth } from './tides.jsx';
import { LineThemUp } from './moon.jsx';
import { BoatStory } from './story.jsx';
import { RiverStory } from './riverStory.jsx';
import { assetUrl } from '../../../utils/assetPaths';

const img = (f) => assetUrl(`images/Y7_SCI/U03_4/${f}`);

const TEAL = '#0087a8';
const PURPLE = '#5c2483';
const ORANGE = '#c25e12';
const GREEN = '#4a8b23';
const BLUE = '#1a5fa8';

// The classroom's orange "write" panel, with a badge a self-study student can act on.
const keyWord = (text, textFr) => ({ tone: 'write', badge: 'Key word', badgeFr: 'Mot clé', icon: 'BookOpen', text, textFr });
const panel = (badge, badgeFr, text, textFr) => ({ tone: 'write', badge, badgeFr, icon: 'BookOpen', text, textFr });

export const notes = [
  // 1 ─ Hero ────────────────────────────────────────────────────────────────
  {
    layout: 'hero',
    color: BLUE,
    icon: 'Waves',
    brand: 'Year 7 Science',
    brandFr: 'Sciences 7e année',
    eyebrow: 'Unit 3 · 3.4 · Forces and energy',
    eyebrowFr: 'Unité 3 · 3.4 · Forces et énergie',
    title: 'Tides',
    titleFr: 'Les marées',
    objective: 'Describe a tide and the tidal range; explain two high tides a day, and why the biggest come at new and full moon; read a river’s water level and test these ideas on it.',
    objectiveFr: 'Décrire une marée et le marnage ; expliquer les deux marées hautes par jour, et pourquoi les plus grandes arrivent à la nouvelle et à la pleine lune ; lire le niveau d’une rivière et y tester ces idées.',
    card: {
      icon: 'MousePointerClick',
      badge: 'In this lesson',
      badgeFr: 'Dans cette leçon',
      text: '**The sea**, **the Moon**, **the Sun** and **our river**. Predict before each model runs. **15 things are scored**: the first is on the next slide.',
      textFr: '**La mer**, **la Lune**, **le Soleil** et **notre rivière**. Prédis avant chaque modèle. **15 activités sont notées** : la première est sur la diapo suivante.',
    },
  },

  // 2 ─ Starter: PREDICT — how many times a day? (+ the harbour clock) ──────
  {
    layout: 'showcase',
    accent: BLUE,
    icon: 'Waves',
    eyebrow: 'Start here · predict',
    eyebrowFr: 'Pour commencer · prédis',
    title: 'Mr Bowen’s Harbour',
    titleFr: 'Le port de M. Bowen',
    widget: HarbourClock,
    caption: 'At the beach, the sea goes **up** and **down**. One press = **3 hours**. Say the next depth **before** it is shown.',
    captionFr: 'À la plage, la mer **monte** et **descend**. Un clic = **3 heures**. Dis la profondeur suivante **avant** qu’elle s’affiche.',
    activity: {
      id: 'act_how_many',
      type: 'predict',
      prompt: 'How many times a day is the water at its highest?',
      promptFr: 'Combien de fois par jour l’eau est-elle au plus haut ?',
      options: [
        { val: 'one', name: 'Once', nameFr: 'Une fois' },
        { val: 'two', name: 'Twice', nameFr: 'Deux fois' },
        { val: 'three', name: 'Three times', nameFr: 'Trois fois' },
        { val: 'four', name: 'Four times', nameFr: 'Quatre fois' },
      ],
      correct: 'two',
      explain: '**Twice.** Press through the day: the water is 6 m deep at **6 a.m.** and again at **6 p.m.** — that is **high tide**. The shallowest water, **low tide**, comes twice too: at 12 noon and at midnight. High to low takes about **6 hours**; high to high about **12 hours**.',
      explainFr: '**Deux fois.** Avance dans la journée : l’eau a 6 m de profondeur à **6 h** et encore à **18 h** — c’est la **marée haute**. L’eau la moins profonde, la **marée basse**, arrive deux fois aussi : à midi et à minuit. De haute à basse : environ **6 heures** ; de haute à haute : environ **12 heures**.',
    },
  },

  // 3 ─ Tide (key word), beside the real thing ──────────────────────────────
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
    content: 'Holy Island, England: the sea covers this road **twice a day**. Drivers who forget the tide times get stuck.',
    contentFr: 'Holy Island, en Angleterre : la mer couvre cette route **deux fois par jour**. Les conducteurs qui oublient l’heure des marées restent bloqués.',
    notes: [
      keyWord(
        '**Tide:** the change in the **depth** of the sea during the day.\n**High tide:** the deepest water. **Low tide:** the shallowest.',
        '**Marée (tide) :** le changement de **profondeur** de la mer pendant la journée.\n**Marée haute (high tide) :** l’eau la plus profonde. **Marée basse (low tide) :** la moins profonde.',
      ),
    ],
  },

  // 4 ─ Tidal range (key word): the book's photo pair, page 98 ──────────────
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Ruler',
    eyebrow: 'Key word · page 98',
    eyebrowFr: 'Mot clé · page 98',
    title: 'Tidal Range',
    titleFr: 'Le marnage',
    ratio: 55,
    inlineSvg: DIAGRAMS.TIDE_PHOTOS,
    content: 'The same harbour in Canada, six hours apart. In Mr Bowen’s harbour, high tide is 6 m deep and low tide 2 m: the range is 6 − 2 = **4 m**.',
    contentFr: 'Le même port au Canada, à six heures d’écart. Dans le port de M. Bowen, la marée haute a 6 m de profondeur et la marée basse 2 m : le marnage est de 6 − 2 = **4 m**.',
    notes: [
      keyWord(
        '**Tidal range:** the difference in depth between high tide and low tide.',
        '**Marnage (tidal range) :** la différence de profondeur entre la marée haute et la marée basse.',
      ),
      {
        tone: 'info',
        badge: false,
        text: 'The Bay of Fundy, Canada: **16.3 m**, the biggest in the world. The Mediterranean Sea: **less than 1 m**.',
        textFr: 'La baie de Fundy, au Canada : **16.3 m**, le plus grand du monde. La mer Méditerranée : **moins de 1 m**.',
      },
    ],
  },

  // 5 ─ The book's Question 6 + CHECK: the trap is 7.0 m ────────────────────
  {
    layout: 'split',
    accent: PURPLE,
    icon: 'Ruler',
    eyebrow: 'Question 6 · page 100',
    eyebrowFr: 'Question 6 · page 100',
    title: 'The Deepest Water',
    titleFr: 'L’eau la plus profonde',
    ratio: 45,
    inlineSvg: DIAGRAMS.RANGE,
    content: 'In Mr Bowen’s harbour the water is **4 m** deep on average: halfway between 6 m and 2 m.\n\nAnother harbour: average depth **5.0 m**, tidal range **2.0 m**.',
    contentFr: 'Dans le port de M. Bowen, l’eau a **4 m** de profondeur en moyenne : à mi-chemin entre 6 m et 2 m.\n\nUn autre port : profondeur moyenne **5.0 m**, marnage **2.0 m**.',
    check: {
      id: 'chk_deepest',
      q: 'What is the maximum depth of the water in that harbour?',
      qFr: 'Quelle est la profondeur maximale de l’eau dans ce port ?',
      options: [
        { val: 'A', text: '7.0 m', textFr: '7.0 m' },
        { val: 'B', text: '6.0 m', textFr: '6.0 m' },
        { val: 'C', text: '4.0 m', textFr: '4.0 m' },
        { val: 'D', text: '3.0 m', textFr: '3.0 m' },
      ],
      correct: 'B',
      expEn: '**6.0 m.** A range of 2.0 m means the water goes **1.0 m above** the average and **1.0 m below** it: 5.0 + 1.0 = 6.0 m. 7.0 m adds the whole range to the average (A); 4.0 m is the **minimum**, at low tide (C); and 3.0 m is 5.0 − 2.0 (D).',
      expFr: '**6.0 m.** Un marnage de 2.0 m veut dire que l’eau monte de **1.0 m au-dessus** de la moyenne et descend de **1.0 m en dessous** : 5.0 + 1.0 = 6.0 m. 7.0 m ajoute tout le marnage à la moyenne (A) ; 4.0 m est le **minimum**, à marée basse (C) ; et 3.0 m, c’est 5.0 − 2.0 (D).',
    },
  },

  // 6 ─ PREDICT: Mr Bowen's boat (deadpan, one panel per press) ──────────────
  {
    layout: 'showcase',
    accent: BLUE,
    icon: 'Clapperboard',
    eyebrow: 'What happens next?',
    eyebrowFr: 'Que se passe-t-il ensuite ?',
    title: 'Mr Bowen’s Boat',
    titleFr: 'Le bateau de M. Bowen',
    widget: BoatStory,
    caption: 'Predict first. Then press **What happens next?** one panel at a time.',
    captionFr: 'Prédis d’abord. Puis appuie sur **Et ensuite ?**, une image à la fois.',
    activity: {
      id: 'act_boat',
      type: 'predict',
      prompt: '6 a.m., high tide: Mr Bowen ties up his boat. Very tight. What will he find at 12 noon?',
      promptFr: '6 h, marée haute : M. Bowen attache son bateau. Très serré. Que va-t-il trouver à midi ?',
      options: [
        { val: 'float', name: 'His boat, floating where he left it', nameFr: 'Son bateau, qui flotte là où il l’a laissé' },
        { val: 'hang', name: 'His boat, hanging from the wall', nameFr: 'Son bateau, qui pend au mur' },
        { val: 'away', name: 'Nothing: it floated away', nameFr: 'Rien : il est parti à la dérive' },
        { val: 'under', name: 'His boat, under the water', nameFr: 'Son bateau, sous l’eau' },
      ],
      correct: 'hang',
      explain: '**Hanging from the wall.** Six hours after high tide is **low tide**: the water went down 4 m, and the short rope did not. Press on to see the rest of his day. Sailors tie up with a **long** rope.',
      explainFr: '**Il pend au mur.** Six heures après la marée haute, c’est la **marée basse** : l’eau a baissé de 4 m, mais pas la corde courte. Continue pour voir la suite de sa journée. Les marins attachent leur bateau avec une corde **longue**.',
    },
  },

  // 7 ─ Tidal force (key word): where does the sea go? ───────────────────────
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
    content: 'Where does the sea go? Gravity keeps the **Moon** in its orbit (3.3). But the Moon has gravity too: it pulls on the Earth. Water moves easily; land hardly moves.',
    contentFr: 'Où va la mer ? La gravité garde la **Lune** en orbite (3.3). Mais la Lune a aussi une gravité : elle tire sur la Terre. L’eau bouge facilement ; la terre ne bouge presque pas.',
    notes: [
      keyWord(
        '**Tidal force:** the pull of the Moon’s gravity on the oceans.',
        '**Force de marée (tidal force) :** l’attraction de la gravité de la Lune sur les océans.',
      ),
    ],
  },

  // 8 ─ PREDICT (the classroom's vote): one high tide or two? ─────────────────
  {
    layout: 'compare',
    accent: PURPLE,
    icon: 'HelpCircle',
    eyebrow: 'Predict',
    eyebrowFr: 'Prédis',
    title: 'How Many High Tides?',
    titleFr: 'Combien de marées hautes ?',
    text: 'The Moon pulls the oceans. How many **high tides** does the Earth have **at the same time**?',
    textFr: 'La Lune tire les océans. Combien de **marées hautes** la Terre a-t-elle **en même temps** ?',
    columns: [
      { heading: 'A · Only the Moon’s side', headingFr: 'A · Seulement du côté de la Lune', accent: BLUE, inlineSvg: DIAGRAMS.ANS_ONE },
      { heading: 'B · Both sides', headingFr: 'B · Des deux côtés', accent: ORANGE, inlineSvg: DIAGRAMS.ANS_TWO },
    ],
    activity: {
      id: 'act_bulges',
      type: 'predict',
      prompt: 'How many high tides at the same time?',
      promptFr: 'Combien de marées hautes en même temps ?',
      options: [
        { val: 'one', name: 'A · One, on the side facing the Moon', nameFr: 'A · Une, du côté face à la Lune' },
        { val: 'two', name: 'B · Two, on both sides', nameFr: 'B · Deux, des deux côtés' },
      ],
      correct: 'two',
      explain: '**Two.** Most people choose one. The Moon pulls the **near** side of the Earth hardest and the **far** side least, so the Earth is **stretched**, and the water piles up on **both** sides. The next slide shows how.',
      explainFr: '**Deux.** La plupart des gens choisissent une. La Lune tire le côté **proche** de la Terre le plus fort et le côté **éloigné** le moins, donc la Terre est **étirée**, et l’eau s’accumule des **deux** côtés. La diapo suivante montre comment.',
    },
  },

  // 9 ─ The Earth is stretched (the three students, drawn) ───────────────────
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Users',
    eyebrow: 'Answer: B',
    eyebrowFr: 'Réponse : B',
    title: 'The Earth Is Stretched',
    titleFr: 'La Terre est étirée',
    ratio: 45,
    inlineSvg: DIAGRAMS.STRETCH,
    content: 'Imagine three people in a line, facing the Moon. It pulls the **near** one 3 steps, the **middle** one (the Earth) 2 steps and the **far** one 1 step. They end up **further apart**: stretched.\n\nSo the water makes a **bulge** on **both** sides: two high tides at once.',
    contentFr: 'Imagine trois personnes en ligne, face à la Lune. Elle tire celle du côté **proche** de 3 pas, celle du **milieu** (la Terre) de 2 pas et celle du côté **éloigné** de 1 pas. Elles finissent **plus écartées** : étirées.\n\nDonc l’eau fait une **bosse** (bulge) des **deux** côtés : deux marées hautes en même temps.',
  },

  // 10 ─ Spin the Earth + PREDICT: the far side at 6 p.m. ────────────────────
  {
    layout: 'showcase',
    accent: BLUE,
    icon: 'RotateCcw',
    eyebrow: 'A model · predict',
    eyebrowFr: 'Un modèle · prédis',
    title: 'Spin the Earth',
    titleFr: 'Fais tourner la Terre',
    widget: SpinEarth,
    caption: 'One press = **6 hours**, a quarter turn. Before each press: high tide or low tide at the harbour?',
    captionFr: 'Un clic = **6 heures**, un quart de tour. Avant chaque clic : marée haute ou marée basse au port ?',
    activity: {
      id: 'act_far_side',
      type: 'predict',
      prompt: 'At 6 p.m. the Earth has turned halfway: the harbour is on the far side, away from the Moon. High tide or low tide?',
      promptFr: 'À 18 h, la Terre a fait un demi-tour : le port est du côté éloigné, loin de la Lune. Marée haute ou marée basse ?',
      options: [
        { val: 'high', name: 'High tide', nameFr: 'Marée haute' },
        { val: 'low', name: 'Low tide', nameFr: 'Marée basse' },
        { val: 'half', name: 'Halfway: neither', nameFr: 'À mi-chemin : ni l’une ni l’autre' },
      ],
      correct: 'high',
      explain: '**High tide.** The far side has a bulge too. As the Earth **spins**, the harbour passes through **both** bulges: high tide at 6 a.m. and at 6 p.m., low tide in between. Press Play the day: the graph is the harbour clock’s graph.',
      explainFr: '**Marée haute.** Le côté éloigné a aussi une bosse. Quand la Terre **tourne**, le port passe dans les **deux** bosses : marée haute à 6 h et à 18 h, marée basse entre les deux. Appuie sur Jouer la journée : le graphique est celui de l’horloge du port.',
    },
  },

  // 11 ─ Two high tides a day (the classroom's Draw This) + HOTSPOT ─────────
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'Waves',
    eyebrow: 'Page 99 · find it',
    eyebrowFr: 'Page 99 · trouve-la',
    title: 'Two High Tides a Day',
    titleFr: 'Deux marées hautes par jour',
    ratio: 45,
    inlineSvg: DIAGRAMS.TWO_TIDES_BLANK,
    content: 'The Earth seen from above the **North Pole**. As it spins, every coast passes through **2 high tides** and **2 low tides** a day.',
    contentFr: 'La Terre vue du dessus du **pôle Nord**. Quand elle tourne, chaque côte passe par **2 marées hautes** et **2 marées basses** par jour.',
    activity: {
      id: 'act_other_tide',
      type: 'hotspot',
      prompt: 'One high tide faces the Moon. Tap the OTHER high tide.',
      promptFr: 'Une marée haute est face à la Lune. Touche l’AUTRE marée haute.',
      svg: DIAGRAMS.TWO_TIDES_BLANK,
      viewBox: '0 0 840 560',
      targets: [
        { id: 'far', x: 150, y: 280, r: 42, name: 'The bulge on the far side', nameFr: 'La bosse du côté éloigné' },
        { id: 'near', x: 492, y: 280, r: 36, name: 'The bulge facing the Moon', nameFr: 'La bosse face à la Lune' },
        { id: 'top', x: 320, y: 144, r: 30, name: 'The water at the top', nameFr: 'L’eau en haut' },
        { id: 'bottom', x: 320, y: 416, r: 30, name: 'The water at the bottom', nameFr: 'L’eau en bas' },
        { id: 'moon', x: 760, y: 280, r: 44, name: 'The Moon', nameFr: 'La Lune' },
      ],
      correct: 'far',
      explain: '**The far side**, away from the Moon. The two narrow parts, at the top and the bottom, are the **low tides**. Two high tides and two low tides, all at once — and the Earth spins through them.',
      explainFr: '**Le côté éloigné**, loin de la Lune. Les deux parties étroites, en haut et en bas, sont les **marées basses**. Deux marées hautes et deux marées basses en même temps — et la Terre tourne à travers elles.',
    },
  },

  // 12 ─ The same time tomorrow? (Activity Question 5) + CHECK ──────────────
  {
    layout: 'split',
    accent: PURPLE,
    icon: 'Timer',
    eyebrow: 'Think',
    eyebrowFr: 'Réfléchis',
    title: 'The Same Time Tomorrow?',
    titleFr: 'À la même heure demain ?',
    ratio: 45,
    inlineSvg: DIAGRAMS.MOON_MOVES,
    content: 'The Moon goes round the Earth once in about **29 days**, the same way as the Earth spins. So after one turn (24 hours), the harbour must turn **a little more** to face the Moon again.',
    contentFr: 'La Lune fait le tour de la Terre en environ **29 jours**, dans le même sens que la Terre tourne. Donc après un tour (24 heures), le port doit tourner **un peu plus** pour être de nouveau face à la Lune.',
    check: {
      id: 'chk_tomorrow',
      q: 'High tide is at 6:00 a.m. today. When is high tide tomorrow morning?',
      qFr: 'La marée haute est à 6 h 00 aujourd’hui. Quand sera-t-elle demain matin ?',
      options: [
        { val: 'A', text: '6:00 a.m. again', textFr: 'Encore à 6 h 00' },
        { val: 'B', text: 'About 5:10 a.m.', textFr: 'Vers 5 h 10' },
        { val: 'C', text: 'About 6:50 a.m.', textFr: 'Vers 6 h 50' },
        { val: 'D', text: '6:00 p.m.', textFr: '18 h 00' },
      ],
      correct: 'C',
      expEn: '**About 6:50 a.m.** — about 50 minutes later (24 hours ÷ 29 ≈ 50 minutes). Not the same time (A): the Moon has moved on. Not earlier (B): the Earth must turn **more**, not less. And 6:00 p.m. (D) is today’s **second** high tide, 12 hours later.',
      expFr: '**Vers 6 h 50** — environ 50 minutes plus tard (24 heures ÷ 29 ≈ 50 minutes). Pas à la même heure (A) : la Lune a avancé. Pas plus tôt (B) : la Terre doit tourner **plus**, pas moins. Et 18 h 00 (D), c’est la **deuxième** marée haute d’aujourd’hui, 12 heures plus tard.',
    },
  },

  // 13 ─ PREDICT (the classroom's vote): the Sun or the Moon? ────────────────
  {
    layout: 'compare',
    accent: PURPLE,
    icon: 'HelpCircle',
    eyebrow: 'Predict',
    eyebrowFr: 'Prédis',
    title: 'The Sun or the Moon?',
    titleFr: 'Le Soleil ou la Lune ?',
    text: 'The Sun has the **strongest gravity** in the Solar System. Which makes **bigger** tides on the Earth?',
    textFr: 'Le Soleil a la **gravité la plus forte** du système solaire. Lequel fait les **plus grandes** marées sur la Terre ?',
    columns: [
      { heading: 'A · The Sun', headingFr: 'A · Le Soleil', accent: ORANGE, inlineSvg: DIAGRAMS.ANS_SUN },
      { heading: 'B · The Moon', headingFr: 'B · La Lune', accent: BLUE, inlineSvg: DIAGRAMS.ANS_MOON },
    ],
    activity: {
      id: 'act_sun_moon',
      type: 'predict',
      prompt: 'Which makes bigger tides?',
      promptFr: 'Lequel fait les plus grandes marées ?',
      options: [
        { val: 'sun', name: 'A · The Sun', nameFr: 'A · Le Soleil' },
        { val: 'moon', name: 'B · The Moon', nameFr: 'B · La Lune' },
      ],
      correct: 'moon',
      explain: '**The Moon.** The Sun pulls the whole Earth much harder — but tides do not come from the pull. They come from the **stretch**, and the Sun is too far away to stretch the Earth much. The next slide shows it.',
      explainFr: '**La Lune.** Le Soleil tire beaucoup plus fort sur toute la Terre — mais les marées ne viennent pas de l’attraction. Elles viennent de l’**étirement**, et le Soleil est trop loin pour beaucoup étirer la Terre. La diapo suivante le montre.',
    },
  },

  // 14 ─ Pull and stretch ─────────────────────────────────────────────────────
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Sun',
    eyebrow: 'Answer: B',
    eyebrowFr: 'Réponse : B',
    title: 'Pull and Stretch',
    titleFr: 'Tirer et étirer',
    ratio: 45,
    inlineSvg: DIAGRAMS.SUN_FAR,
    content: 'The Sun **pulls** the Earth about 180 times harder than the Moon does. But it is **390 times** further away, so it pulls the near side and the far side almost the same: it **stretches** the Earth less.',
    contentFr: 'Le Soleil **tire** sur la Terre environ 180 fois plus fort que la Lune. Mais il est **390 fois** plus loin, donc il tire presque pareil sur le côté proche et le côté éloigné : il **étire** moins la Terre.',
    notes: [
      {
        tone: 'info',
        badge: false,
        text: 'The Sun’s tidal force is about **half** the Moon’s.',
        textFr: 'La force de marée du Soleil est environ la **moitié** de celle de la Lune.',
      },
    ],
  },

  // 15 ─ Line them up (Activity Part 3) + CHECK: the biggest tides ───────────
  {
    layout: 'showcase',
    accent: ORANGE,
    icon: 'Sun',
    eyebrow: 'A model · one month',
    eyebrowFr: 'Un modèle · un mois',
    title: 'Line Them Up',
    titleFr: 'Aligne-les',
    widget: LineThemUp,
    caption: 'One month, from new moon to new moon. Drag the day, or play the month, and watch the **tidal range**. What does the Moon look like when it is biggest?',
    captionFr: 'Un mois, d’une nouvelle lune à la suivante. Fais glisser le jour, ou joue le mois, et regarde le **marnage**. À quoi ressemble la Lune quand il est le plus grand ?',
    check: {
      id: 'chk_biggest',
      q: 'Which days have the biggest tides?',
      qFr: 'Quels jours ont les plus grandes marées ?',
      options: [
        { val: 'A', text: 'Full moon only', textFr: 'Seulement la pleine lune' },
        { val: 'B', text: 'The two half moons', textFr: 'Les deux demi-lunes' },
        { val: 'C', text: 'Every day is the same', textFr: 'Tous les jours pareil' },
        { val: 'D', text: 'New moon and full moon', textFr: 'La nouvelle lune et la pleine lune' },
      ],
      correct: 'D',
      expEn: '**New moon and full moon.** Then the Sun, the Moon and the Earth are in a **line**, so the Sun’s bulges add to the Moon’s: 6 m. New moon counts too, even though we cannot see it (A). At the half moons they are at **right angles**, and the range is only 2 m (B). And the range changes all month (C).',
      expFr: '**La nouvelle lune et la pleine lune.** Alors le Soleil, la Lune et la Terre sont **alignés**, donc les bosses du Soleil s’ajoutent à celles de la Lune : 6 m. La nouvelle lune compte aussi, même si on ne la voit pas (A). Aux demi-lunes, ils sont **à angle droit**, et le marnage n’est que de 2 m (B). Et le marnage change tout le mois (C).',
    },
  },

  // 16 ─ What tides do (page 100) + SORT: high tide or low tide? ─────────────
  {
    layout: 'showcase',
    accent: GREEN,
    icon: 'Waves',
    eyebrow: 'Effects of tides · page 100',
    eyebrowFr: 'Les effets des marées · page 100',
    title: 'What Tides Do',
    titleFr: 'Ce que font les marées',
    inlineSvg: DIAGRAMS.EFFECTS,
    caption: 'Tides matter to boats, to cities by the sea, to birds — and they can make **electricity**.',
    captionFr: 'Les marées comptent pour les bateaux, pour les villes au bord de la mer, pour les oiseaux — et elles peuvent produire de l’**électricité**.',
    activity: {
      id: 'act_effects',
      type: 'sort',
      prompt: 'High tide or low tide? Sort the four.',
      promptFr: 'Marée haute ou basse ? Trie les quatre.',
      bins: [
        { id: 'high', name: 'At high tide', nameFr: 'À marée haute' },
        { id: 'low', name: 'At low tide', nameFr: 'À marée basse' },
      ],
      cards: [
        { id: 'mud', name: 'Boats sit on the mud', nameFr: 'Bateaux posés sur la vase', bin: 'low' },
        { id: 'venice', name: 'Venice floods (with a strong wind)', nameFr: 'Venise inondée (avec du vent)', bin: 'high' },
        { id: 'birds', name: 'Birds find shellfish on the sand', nameFr: 'Coquillages pour les oiseaux', bin: 'low' },
        { id: 'road', name: 'The Holy Island road is under the sea', nameFr: 'Route de Holy Island sous l’eau', bin: 'high' },
      ],
      explain: 'Low water leaves boats on the mud, Mr Bowen’s boat on its rope, and shellfish on the sand for the birds. High water covers the Holy Island road, and with a strong wind it floods Venice. The Rance power station in France makes **electricity** from the moving water, coming in **and** going out.',
      explainFr: 'L’eau basse laisse les bateaux sur la vase, le bateau de M. Bowen au bout de sa corde, et des coquillages sur le sable pour les oiseaux. L’eau haute couvre la route de Holy Island, et avec un vent fort elle inonde Venise. La centrale de la Rance, en France, produit de l’**électricité** avec l’eau qui bouge, quand elle monte **et** quand elle descend.',
    },
  },

  // 17 ─ PREDICT: what happened here? (the lab's Bến Tre king tide) ─────────
  {
    layout: 'split',
    accent: PURPLE,
    icon: 'HelpCircle',
    eyebrow: 'Think · Vietnam',
    eyebrowFr: 'Réfléchis · Viêt Nam',
    title: 'What Happened Here?',
    titleFr: 'Que s’est-il passé ici ?',
    ratio: 45,
    image: img('king-tide.jpg'),
    content: 'Bến Tre, Vietnam, **26 October 2011**. A street under water. Where did all this water come from?',
    contentFr: 'Bến Tre, Viêt Nam, **26 octobre 2011**. Une rue sous l’eau. D’où vient toute cette eau ?',
    activity: {
      id: 'act_king_tide',
      type: 'predict',
      prompt: 'Where did the water come from?',
      promptFr: 'D’où vient l’eau ?',
      options: [
        { val: 'rain', name: 'Heavy rain', nameFr: 'Une grosse pluie' },
        { val: 'river', name: 'The river, at a very high tide', nameFr: 'La rivière, à une très grande marée' },
        { val: 'pipe', name: 'A broken water pipe', nameFr: 'Un tuyau d’eau cassé' },
        { val: 'tsunami', name: 'A tsunami', nameFr: 'Un tsunami' },
      ],
      correct: 'river',
      explain: '**The river, at a very high tide.** Near the sea, rivers have **tides** too. In October and November the south of Vietnam has the highest tides of the year: **triều cường** (a king tide). Next: an earth tide, then our own river.',
      explainFr: '**La rivière, à une très grande marée.** Près de la mer, les rivières ont aussi des **marées**. En octobre et en novembre, le sud du Viêt Nam a les plus grandes marées de l’année : **triều cường** (une très grande marée). Ensuite : la marée terrestre, puis notre rivière.',
    },
  },

  // 18 ─ Earth tide (key word) + reveal ───────────────────────────────────────
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
      keyWord(
        '**Earth tide:** the land going up and down because of tidal forces.',
        '**Marée terrestre (earth tide) :** la terre qui monte et descend à cause des forces de marée.',
      ),
    ],
    reveal: {
      prompt: 'Why don’t we feel it?',
      promptFr: 'Pourquoi ne le sent-on pas ?',
      label: 'Answer',
      labelFr: 'Réponse',
      answer: 'Everything goes up **together**: the ground, the buildings and you, slowly, over six hours. Scientists study earth tides to help predict **earthquakes** and **volcanoes**.',
      answerFr: 'Tout monte **ensemble** : le sol, les bâtiments et toi, lentement, en six heures. Les scientifiques étudient les marées terrestres pour aider à prévoir les **séismes** et les **volcans**.',
    },
  },

  // ═══ OUR RIVER — the River Tide Lab ════════════════════════════════════════

  // 19 ─ Water level (key word) + CHECK: read pole C ─────────────────────────
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Ruler',
    eyebrow: 'Our river · key word',
    eyebrowFr: 'Notre rivière · mot clé',
    title: 'Water Level',
    titleFr: 'Le niveau de l’eau',
    ratio: 45,
    inlineSvg: DIAGRAMS_LAB.POLE_READ,
    content: 'In the River Tide Lab we read a **bamboo pole** in our river, marked in **cm**: a mark every **10 cm**, a number every **20 cm**. Find where the water **touches** the pole. Pole A: 60 cm. Pole B: 130 cm.',
    contentFr: 'Dans l’expérience de la rivière, on lit une **perche en bambou** dans notre rivière, graduée en **cm** : un trait tous les **10 cm**, un nombre tous les **20 cm**. Trouve où l’eau **touche** la perche. Perche A : 60 cm. Perche B : 130 cm.',
    notes: [
      keyWord(
        '**Water level:** how high the water is.',
        '**Niveau de l’eau (water level) :** la hauteur de l’eau.',
      ),
    ],
    check: {
      id: 'chk_pole_c',
      q: 'What is the water level on pole C?',
      qFr: 'Quel est le niveau de l’eau sur la perche C ?',
      options: [
        { val: 'A', text: '85 cm', textFr: '85 cm' },
        { val: 'B', text: '80 cm', textFr: '80 cm' },
        { val: 'C', text: '90 cm', textFr: '90 cm' },
      ],
      correct: 'A',
      expEn: '**85 cm.** The water is **halfway** between the 80 cm mark and the 90 cm mark. 80 cm (B) and 90 cm (C) are the marks on either side of it.',
      expFr: '**85 cm.** L’eau est **à mi-chemin** entre le trait de 80 cm et celui de 90 cm. 80 cm (B) et 90 cm (C) sont les traits de chaque côté.',
    },
  },

  // 20 ─ What went wrong? Mr Bowen measures the river + SORT ────────────────
  {
    layout: 'showcase',
    accent: BLUE,
    icon: 'Search',
    eyebrow: 'What went wrong?',
    eyebrowFr: 'Où est l’erreur ?',
    title: 'Mr Bowen Measures the River',
    titleFr: 'M. Bowen mesure la rivière',
    widget: RiverStory,
    caption: 'Press **What next?** for each picture. What did he do **wrong** each time?',
    captionFr: 'Appuie sur **Et ensuite ?** pour chaque image. Quelle est son **erreur** à chaque fois ?',
    activity: {
      id: 'act_river_rules',
      type: 'sort',
      prompt: 'Which rule did he break each time?',
      promptFr: 'Quelle règle n’a-t-il pas suivie à chaque fois ?',
      bins: [
        { id: 'close', name: 'Go close, eyes level', nameFr: 'De près, les yeux au niveau' },
        { id: 'middle', name: 'Waves? Read the middle', nameFr: 'Vagues ? Lis le milieu' },
        { id: 'time', name: 'Read it on time', nameFr: 'Lis-la à l’heure' },
        { id: 'unit', name: 'Write the unit (cm)', nameFr: 'Écris l’unité (cm)' },
      ],
      cards: [
        { id: 'window', name: '8:30 — from his window', nameFr: '8 h 30 — depuis sa fenêtre', bin: 'close' },
        { id: 'splash', name: '10:30 — the top of a splash', nameFr: '10 h 30 — le haut d’une vague', bin: 'middle' },
        { id: 'lunch', name: '12:30 — he reads it at 1:15', nameFr: '12 h 30 — il la lit à 13 h 15', bin: 'time' },
        { id: 'seventy', name: '2:30 — he writes “75”', nameFr: '14 h 30 — il écrit « 75 »', bin: 'unit' },
      ],
      explain: 'One mistake in every reading, so we can use **none** of his four: too far, a splash, late, and no unit. The next slide is how to do it right.',
      explainFr: 'Une erreur dans chaque mesure, donc on ne peut en utiliser **aucune** des quatre : trop loin, une vague, en retard, et sans unité. La diapo suivante montre comment bien faire.',
    },
  },

  // 21 ─ Read it like a scientist (the method) ───────────────────────────────
  {
    layout: 'split',
    accent: TEAL,
    icon: 'ScanEye',
    eyebrow: 'Our river · the method',
    eyebrowFr: 'Notre rivière · la méthode',
    title: 'Read It Like a Scientist',
    titleFr: 'Lis comme un scientifique',
    ratio: 45,
    inlineSvg: DIAGRAMS_LAB.METHOD,
    content: 'Every reading is taken the same way, so the readings can be compared.',
    contentFr: 'Chaque mesure est prise de la même façon, pour pouvoir comparer les mesures.',
    notes: [
      panel(
        'The method', 'La méthode',
        '**Reading the pole:** go close, with your eyes **level** with the water. Waves? Read the **middle**. Read it **on time**. Write the unit: **cm**.',
        '**Lire la perche :** approche-toi, les yeux au **niveau** de l’eau. Des vagues ? Lis le **milieu**. Lis-la **à l’heure**. Écris l’unité : **cm**.',
      ),
    ],
  },

  // 22 ─ Coming in or going out? (key words) + CHECK (the lab's exit) ────────
  {
    layout: 'split',
    accent: TEAL,
    icon: 'ArrowDownUp',
    eyebrow: 'Key words',
    eyebrowFr: 'Mots clés',
    title: 'Coming In or Going Out?',
    titleFr: 'Elle monte ou elle descend ?',
    ratio: 45,
    inlineSvg: DIAGRAMS_LAB.COMING_IN,
    content: 'Read a graph from **left** to **right**, like a sentence.',
    contentFr: 'Lis un graphique de **gauche** à **droite**, comme une phrase.',
    notes: [
      keyWord(
        '**The tide is coming in:** the water level is going **up**.\n**The tide is going out:** the water level is going **down**.',
        '**La marée monte (coming in) :** le niveau de l’eau **monte**.\n**La marée descend (going out) :** le niveau de l’eau **baisse**.',
      ),
    ],
    check: {
      id: 'chk_coming_in',
      q: 'At 10:30 the water level is 85 cm. At 12:30 it is 120 cm. What is the tide doing?',
      qFr: 'À 10 h 30, le niveau de l’eau est de 85 cm. À 12 h 30, il est de 120 cm. Que fait la marée ?',
      options: [
        { val: 'A', text: 'Going out', textFr: 'Elle descend' },
        { val: 'B', text: 'It is at high tide', textFr: 'C’est la marée haute' },
        { val: 'C', text: 'It is at low tide', textFr: 'C’est la marée basse' },
        { val: 'D', text: 'Coming in', textFr: 'Elle monte' },
      ],
      correct: 'D',
      expEn: '**Coming in:** the water went **up** 35 cm (120 − 85). Going out (A) is down. High tide and low tide (B, C) are the turns, where the water stops going one way and starts going the other.',
      expFr: '**Elle monte :** l’eau est **montée** de 35 cm (120 − 85). Descendre (A), c’est baisser. La marée haute et la marée basse (B, C) sont les moments où l’eau s’arrête et repart dans l’autre sens.',
    },
  },

  // 23 ─ Put it together + the two predictions Tide Lab tests ────────────────
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'Waves',
    eyebrow: 'Put it together',
    eyebrowFr: 'En résumé',
    title: 'The Moon Pulls, the Earth Spins',
    titleFr: 'La Lune tire, la Terre tourne',
    ratio: 66,
    inlineSvg: DIAGRAMS.SUMMARY,
    notes: [
      panel(
        'Put it together', 'En résumé',
        'The **Moon’s tidal force** pulls the oceans into **2 bulges**. The Earth **spins** through them: **2 high tides** a day. Tides are **biggest** when the Sun, the Moon and the Earth are in a **line**: at **full** and **new moon**.',
        'La **force de marée de la Lune** tire les océans en **2 bosses**. La Terre **tourne** à travers elles : **2 marées hautes** par jour. Les marées sont les **plus grandes** quand le Soleil, la Lune et la Terre sont **alignés** : à la **pleine lune** et à la **nouvelle lune**.',
      ),
      {
        tone: 'task',
        badge: false,
        text: '**Two predictions to test:** high tide comes about **50 minutes later** every day; the tides are **biggest** near **new** and **full moon**.',
        textFr: '**Deux prédictions à tester :** la marée haute arrive environ **50 minutes plus tard** chaque jour ; les marées sont les **plus grandes** vers la **nouvelle** et la **pleine lune**.',
      },
    ],
    reveal: {
      label: 'Who worked it out?',
      labelFr: 'Qui l’a découvert ?',
      answer: 'In **330 BCE**, Pytheas, a Greek sailor from **Marseille**, saw that the tides follow the Moon. In **1687**, Newton explained why: **gravity**.',
      answerFr: 'En **330 av. J.-C.**, Pythéas, un marin grec de **Marseille**, a vu que les marées suivent la Lune. En **1687**, Newton a expliqué pourquoi : la **gravité**.',
    },
  },

  // 24 ─ Checklist (both lessons') + the exit question as a CHECK ────────────
  {
    layout: 'stack',
    variant: 'checklist',
    accent: TEAL,
    icon: 'CheckCircle2',
    columns: 2,
    eyebrow: 'Before you go on',
    eyebrowFr: 'Avant de continuer',
    title: 'Can You Do These?',
    titleFr: 'Sais-tu le faire ?',
    content: 'Next: the Vocab, then **Tide Lab**.',
    contentFr: 'Ensuite : le vocabulaire, puis le **labo des marées**.',
    items: [
      { text: 'Explain a **tide** and the **tidal range**.', textFr: 'Expliquer la **marée** et le **marnage**.' },
      { text: 'Explain **2 high tides** a day (**tidal force**).', textFr: 'Expliquer **2 marées hautes** par jour (**force de marée**).' },
      { text: 'Explain the **biggest** tides at **full** and **new moon**.', textFr: 'Expliquer les **plus grandes** marées (**pleine** et **nouvelle lune**).' },
      { text: 'Give **effects** of tides on the **sea** and the **land**.', textFr: 'Donner des **effets** des marées sur la **mer** et la **terre**.' },
      { text: 'Read a **water level**, and test the **two predictions**.', textFr: 'Lire un **niveau d’eau**, et tester les **deux prédictions**.' },
    ],
    check: {
      id: 'chk_exit_full_moon',
      q: 'Exit question: it is full moon, and high tide is at 7 a.m. When is the next high tide, and will the tides be big or small?',
      qFr: 'Question de sortie : c’est la pleine lune, et la marée haute est à 7 h. Quand est la prochaine marée haute, et les marées seront-elles grandes ou petites ?',
      options: [
        { val: 'A', text: 'About 7 p.m., and small', textFr: 'Vers 19 h, et petites' },
        { val: 'B', text: 'About 7 p.m., and big', textFr: 'Vers 19 h, et grandes' },
        { val: 'C', text: 'About 1 p.m., and big', textFr: 'Vers 13 h, et grandes' },
        { val: 'D', text: 'About 7:50 a.m. tomorrow, and big', textFr: 'Vers 7 h 50 demain, et grandes' },
      ],
      correct: 'B',
      expEn: '**About 7 p.m., and big.** The next high tide comes about 12 hours later, when the harbour reaches the far-side bulge. About 1 p.m. (C) is low tide, 6 hours later. Tomorrow at 7:50 (D) is the morning after: tonight’s high tide comes first. And at full moon the Sun, the Moon and the Earth are in a line, so the tides are big, not small (A).',
      expFr: '**Vers 19 h, et grandes.** La prochaine marée haute arrive environ 12 heures plus tard, quand le port atteint la bosse du côté éloigné. Vers 13 h (C), c’est la marée basse, 6 heures plus tard. Demain à 7 h 50 (D), c’est le lendemain matin : la marée haute de ce soir vient d’abord. Et à la pleine lune, le Soleil, la Lune et la Terre sont alignés, donc les marées sont grandes, pas petites (A).',
    },
  },
];
