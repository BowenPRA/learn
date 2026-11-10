// content/y7-science/U03_7/slides.js
// Year 7 Science · 3.7 Where does energy go? One 50-minute period, after 3.6
// (Changes in energy). Source: Learner's Book pages 117–119 (Unit 3 Forces
// and energy). The rest of the section (page 120 on) was not seen.
//
// ENGLISH AND FRENCH ONLY, like every Year 7 deck from Unit 4 / 15 October:
// every string has an …Fr twin and no …Vn twin. The diagrams stay in English.
//
// THE ARC (the shape of Coffee, Carbon and Stars, 3.4, 3.5 and 3.6; plan.js
// has the timings). Three short commands, one for each part:
//   Sort it    how much of 100 000 đồng of petrol moves Mr Bowen's motorbike?
//              The petrol, 25 000 đ a press, a thumb before each: only one
//              block moves the bike. Useful and wasted energy (the book's
//              motorbike, page 118). Getting started's three processes, a row a
//              press. Useful or Wasted?, everyone standing, with real traps.
//   Count it   two lamps, the same light: which wastes more? (vote) A, seen
//              through a heat camera. Lamp A: 85% heat. Draw both. Feel the
//              projector. How many joules does lamp B need for the same light?
//   Chase it   what happens next? Mr Bowen catches his engine's heat in a
//              bag. Watch the coffee's heat spread out, and never come back.
//              What does "dissipated" mean? (vote, Question 1) Dissipated; it
//              cannot be recovered. The pot on the wood fire (page 119): even
//              wanted heat is partly wasted. Which can be dissipated?
//              (Question 2, standing) Put it together: 3.6's ball and candle.
//
// The goals slide (2) and the checklist (20) say the same three things, so
// the lesson ends where it said it would; the starter's petrol comes back on
// slide 4, and 3.6's two open questions (the ball, the candle) on slide 19.
//
// COPY-DOWN: 3 written panels — useful and wasted energy (5), dissipated
// (16), always dissipated (19) — and 1 drawing: the two lamps (10). Each panel
// is the definition only; the line under it is read, not copied.
//
// WRITING RULE (the 2.5 density): one hook line, short sentences, and the body
// never repeats the write note, a label or the caption.

import { DIAGRAMS } from './diagrams.js'
import { PetrolStepper } from './petrol.jsx'
import { ThreeProcesses } from './jobs.jsx'
import { UsefulOrWasted } from './game.jsx'
import { BagStory } from './story.jsx'
import { HeatSpread } from './spread.jsx'

const TEAL = '#0087a8'
const PURPLE = '#5c2483'
const ORANGE = '#c25e12'
const GREEN = '#4a8b23'
const BLUE = '#1a5fa8'

export const slides = [
  // ════════════════════════════════════════════════════════════════════════
  // SORT IT — useful and wasted energy
  // ════════════════════════════════════════════════════════════════════════

  // 1. Hero + starter: how much of the petrol moves the bike?
  {
    layout: 'hero',
    color: PURPLE,
    icon: 'Wind',
    brand: 'Year 7 Science',
    brandFr: 'Sciences 7e année',
    eyebrow: '3.7 · Forces and energy',
    eyebrowFr: '3.7 · Forces et énergie',
    title: 'Where Does Energy Go?',
    titleFr: 'Où va l’énergie ?',
    card: {
      icon: 'Coins',
      badge: 'Starter',
      badgeFr: 'Pour commencer',
      text: 'Mr Bowen buys **100 000 đồng** of petrol for his motorbike. How much of it **moves** the bike? **Guess** in đồng and write it down.',
      textFr: 'M. Bowen achète **100 000 đồng** d’essence pour sa moto. Combien en **fait avancer** la moto ? **Devine** en đồng et écris-le.',
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
    text: 'Find out where energy **goes** when we use it.',
    textFr: 'Découvrir où **va** l’énergie quand on l’utilise.',
    columns: [
      {
        heading: 'Sort it',
        headingFr: 'La trier',
        accent: ORANGE,
        icon: 'Scale',
        inlineSvg: DIAGRAMS.PIC_SORT_IT,
        caption: 'Find the part of the energy we want.',
        captionFr: 'Trouver l’énergie que l’on veut.',
      },
      {
        heading: 'Count it',
        headingFr: 'La compter',
        accent: TEAL,
        icon: 'Calculator',
        inlineSvg: DIAGRAMS.PIC_COUNT_IT,
        caption: 'Find which lamp is better, and why.',
        captionFr: 'Trouver la meilleure lampe, et pourquoi.',
      },
      {
        heading: 'Chase it',
        headingFr: 'La poursuivre',
        accent: PURPLE,
        icon: 'Wind',
        inlineSvg: DIAGRAMS.PIC_CHASE_IT,
        caption: 'Find where the lost energy goes.',
        captionFr: 'Trouver où va l’énergie perdue.',
      },
    ],
  },

  // 3. The stepper: the petrol, a block a press
  {
    layout: 'showcase',
    accent: ORANGE,
    icon: 'Coins',
    eyebrow: 'Say it first',
    eyebrowFr: 'Dis-le d’abord',
    title: 'Mr Bowen’s Petrol',
    titleFr: 'L’essence de M. Bowen',
    widget: PetrolStepper,
    caption: 'Before each press: **thumbs up** if it moves the bike, **thumbs down** if not.',
    captionFr: 'Avant chaque clic : **pouce en haut** si ça fait avancer la moto, **pouce en bas** sinon.',
  },

  // 4. Back to the starter
  {
    layout: 'statement',
    accent: PURPLE,
    eyebrow: 'Back to the starter',
    eyebrowFr: 'Retour au début',
    title: 'How Much Moves the Bike?',
    titleFr: 'Combien fait avancer la moto ?',
    text: 'Mr Bowen pays **100 000 đồng**. How much of it **moves** the bike?',
    textFr: 'M. Bowen paie **100 000 đồng**. Combien en **fait avancer** la moto ?',
    reveal: {
      label: 'Answer',
      labelFr: 'Réponse',
      answer: 'About **25 000 đồng**: a quarter, or **25%**. The other **75%** heats the engine and the air, and makes noise.',
      answerFr: 'Environ **25 000 đồng** : un quart, ou **25 %**. Les autres **75 %** chauffent le moteur et l’air, et font du bruit.',
    },
  },

  // 5. Useful and wasted energy (write): the book's motorbike, page 118
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Scale',
    eyebrow: 'Key words · page 118',
    eyebrowFr: 'Mots clés · page 118',
    title: 'Useful and Wasted',
    titleFr: 'Utile et gaspillée',
    ratio: 40,
    inlineSvg: DIAGRAMS.MOTO_PUMP,
    content: 'Wasted energy does not **disappear**. It goes where we do not want it.',
    contentFr: 'L’énergie gaspillée ne **disparaît** pas. Elle va là où on ne la veut pas.',
    notes: [
      {
        tone: 'write',
        text: '**Useful energy:** energy changed into the kind we want.\n**Wasted energy:** energy changed into kinds we do not want.',
        textFr: '**Énergie utile (useful energy) :** l’énergie transformée en la forme que l’on veut.\n**Énergie gaspillée (wasted energy) :** l’énergie transformée en formes que l’on ne veut pas.',
      },
    ],
  },

  // 6. Getting started (page 117): three processes, a row a press
  {
    layout: 'showcase',
    accent: ORANGE,
    icon: 'Users',
    eyebrow: 'Getting started · pairs',
    eyebrowFr: 'Pour démarrer · en binôme',
    title: 'Three Processes',
    titleFr: 'Trois processus',
    widget: ThreeProcesses,
    caption: 'With a partner, say each **?** before it is shown.',
    captionFr: 'Avec ton binôme, dis chaque **?** avant qu’il s’affiche.',
  },

  // 7. Useful or Wasted?: the whole class, standing
  {
    layout: 'showcase',
    accent: GREEN,
    icon: 'Trophy',
    eyebrow: 'A game · everyone stands',
    eyebrowFr: 'Un jeu · tout le monde debout',
    title: 'Useful or Wasted?',
    titleFr: 'Utile ou gaspillée ?',
    widget: UsefulOrWasted,
    caption: '**Arms up:** useful. **Arms down:** wasted. The last ones standing win a prize ticket!',
    captionFr: '**Bras en haut :** utile. **Bras en bas :** gaspillée. Les derniers debout gagnent un ticket !',
  },

  // ════════════════════════════════════════════════════════════════════════
  // COUNT IT — how much is wasted
  // ════════════════════════════════════════════════════════════════════════

  // 8. Vote: the book's two lamps (page 118)
  {
    layout: 'compare',
    accent: PURPLE,
    icon: 'Hand',
    eyebrow: 'Vote with one hand',
    eyebrowFr: 'Vote avec une main',
    title: 'Two Lamps',
    titleFr: 'Deux lampes',
    text: 'Lamps A and B give the **same light**. Which one **wastes** more energy?',
    textFr: 'Les lampes A et B donnent la **même lumière**. Laquelle **gaspille** le plus d’énergie ?',
    columns: [
      { heading: 'A · left hand up', headingFr: 'A · main gauche levée', accent: BLUE, icon: 'Hand', inlineSvg: DIAGRAMS.ANS_LAMP_A },
      { heading: 'B · right hand up', headingFr: 'B · main droite levée', accent: ORANGE, icon: 'Hand', inlineSvg: DIAGRAMS.ANS_LAMP_B },
    ],
  },

  // 9. Answer A, seen through a heat camera
  {
    layout: 'showcase',
    accent: TEAL,
    icon: 'Thermometer',
    eyebrow: 'Answer: A · real photos',
    eyebrowFr: 'Réponse : A · vraies photos',
    title: 'What a Heat Camera Sees',
    titleFr: 'Ce que voit une caméra thermique',
    inlineSvg: DIAGRAMS.HEAT_CAMERA,
    caption: 'The **same light**, but lamp A is much **hotter**. That heat is **wasted**.',
    captionFr: 'La **même lumière**, mais la lampe A est bien plus **chaude**. Cette chaleur est **gaspillée**.',
  },

  // 10. The drawing: both lamps' energy-change diagrams (page 118)
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'Pencil',
    eyebrow: 'Draw this · page 118',
    eyebrowFr: 'À dessiner · page 118',
    title: 'Lamp A Wastes More',
    titleFr: 'La lampe A gaspille plus',
    ratio: 40,
    inlineSvg: DIAGRAMS.LAMPS,
    drawThis: true,
    content: 'Copy the boxes, the arrows and the numbers. Not the lamps.',
    contentFr: 'Recopie les cases, les flèches et les nombres. Pas les lampes.',
    notes: [
      {
        tone: 'info',
        badge: false,
        text: 'A is an old **filament** lamp. B is an **energy-saving** lamp.',
        textFr: 'A est une vieille lampe **à filament**. B est une lampe **basse consommation**.',
      },
    ],
  },

  // 11. Try it: the projector's warm air
  {
    layout: 'statement',
    accent: PURPLE,
    eyebrow: 'Try it · one volunteer',
    eyebrowFr: 'Essaie · un volontaire',
    title: 'Feel the Projector',
    titleFr: 'Sens le projecteur',
    text: 'Hold your hand near the **projector**’s air vent. What do you **feel**?',
    textFr: 'Mets ta main près de la grille d’aération du **projecteur**. Que **sens**-tu ?',
    reveal: {
      label: 'Why?',
      labelFr: 'Pourquoi ?',
      answer: '**Warm air.** Its lamp makes light, and **wasted heat**. A fan blows the heat out.',
      answerFr: '**De l’air chaud.** Sa lampe fait de la lumière, et de la **chaleur gaspillée**. Un ventilateur la souffle dehors.',
    },
  },

  // 12. Whiteboards: the same light, how many joules?
  {
    layout: 'statement',
    accent: PURPLE,
    eyebrow: 'Work it out · whiteboards',
    eyebrowFr: 'Calcule · ardoises',
    title: 'The Same Light',
    titleFr: 'La même lumière',
    text: 'Lamp B gives **15 J** of light. **Half** of its energy becomes light. How many joules go **in**?',
    textFr: 'Lampe B : **15 J** de lumière, la **moitié** de son énergie. Combien de joules **entrent** ?',
    reveal: {
      label: 'Answer',
      labelFr: 'Réponse',
      answer: '**30 J** (half is 15 J). Lamp A needs **100 J** for the same light.',
      answerFr: '**30 J** (la moitié fait 15 J). La lampe A, pour la même lumière : **100 J**.',
    },
  },

  // ════════════════════════════════════════════════════════════════════════
  // CHASE IT — where the wasted energy goes
  // ════════════════════════════════════════════════════════════════════════

  // 13. What happens next? Mr Bowen's bag of heat (deadpan)
  {
    layout: 'showcase',
    accent: BLUE,
    icon: 'Coffee',
    eyebrow: 'What happens next?',
    eyebrowFr: 'Que se passe-t-il ensuite ?',
    title: 'Mr Bowen’s Bag of Heat',
    titleFr: 'Le sac de chaleur de M. Bowen',
    widget: BagStory,
    caption: 'Before each step, **predict**: what happens next?',
    captionFr: 'Avant chaque étape, **prédis** : que se passe-t-il ensuite ?',
  },

  // 14. A model: watch the heat spread, and never come back
  {
    layout: 'showcase',
    accent: BLUE,
    icon: 'Thermometer',
    eyebrow: 'A model',
    eyebrowFr: 'Un modèle',
    title: 'Watch the Heat',
    titleFr: 'Regarde la chaleur',
    widget: HeatSpread,
    caption: 'Before each press: where will the **red dots** be?',
    captionFr: 'Avant chaque clic : où seront les **points rouges** ?',
  },

  // 15. Vote: what does "dissipated" mean? (Question 1)
  {
    layout: 'compare',
    accent: PURPLE,
    icon: 'Hand',
    eyebrow: 'Vote with one hand · Question 1',
    eyebrowFr: 'Vote avec une main · Question 1',
    title: 'What Does Dissipated Mean?',
    titleFr: 'Que veut dire « dissipée » ?',
    text: 'The heat spread out. Scientists say it is **dissipated**. What does that mean?',
    textFr: 'La chaleur s’est étalée. Les scientifiques disent qu’elle est **dissipée**. Qu’est-ce que ça veut dire ?',
    columns: [
      { heading: 'A · left hand up', headingFr: 'A · main gauche levée', accent: BLUE, icon: 'Hand', inlineSvg: DIAGRAMS.ANS_SPREADS },
      { heading: 'B · right hand up', headingFr: 'B · main droite levée', accent: ORANGE, icon: 'Hand', inlineSvg: DIAGRAMS.ANS_STORED },
    ],
  },

  // 16. Answer A: dissipated, and never recovered (write)
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Wind',
    eyebrow: 'Answer: A · key words',
    eyebrowFr: 'Réponse : A · mots clés',
    title: 'Dissipated',
    titleFr: 'Dissipée',
    ratio: 45,
    inlineSvg: DIAGRAMS.SPREAD,
    content: '**Recover** = get back. Mr Bowen lost his phone, then **recovered** it.',
    contentFr: '**Recover** = récupérer. M. Bowen a perdu son téléphone, puis l’a **récupéré**.',
    notes: [
      {
        tone: 'write',
        text: '**Dissipated energy:** energy that spreads out, where there is no use for it. It can **never** be **recovered**.',
        textFr: '**Énergie dissipée (dissipated) :** énergie qui s’étale, là où elle ne sert à rien. On ne peut **jamais** la **récupérer** (recovered).',
      },
    ],
  },

  // 17. The book's pot on a wood fire (page 119)
  {
    layout: 'split',
    accent: PURPLE,
    icon: 'Flame',
    eyebrow: 'Page 119 · pairs',
    eyebrowFr: 'Page 119 · en binôme',
    title: 'Cooking on a Wood Fire',
    titleFr: 'Cuisiner sur un feu de bois',
    ratio: 45,
    inlineSvg: DIAGRAMS.WOOD_FIRE,
    content: 'Here we **want** heat: **chemical → thermal**.',
    contentFr: 'Ici, on **veut** de la chaleur : **chemical → thermal**.',
    reveal: {
      prompt: 'Is any heat wasted? Where does it go?',
      promptFr: 'De la chaleur est-elle gaspillée ? Où va-t-elle ?',
      label: 'Answer',
      labelFr: 'Réponse',
      answer: '**Yes.** It heats the **pots**, their **stands** and the **air**. **Steam** carries heat away. And the fire makes **light**.',
      answerFr: '**Oui.** Elle chauffe les **marmites**, leurs **supports** et l’**air**. La **vapeur** emporte de la chaleur. Et le feu fait de la **lumière**.',
    },
  },

  // 18. Question 2, standing: which can be dissipated?
  {
    layout: 'statement',
    accent: GREEN,
    eyebrow: 'Question 2 · stand up',
    eyebrowFr: 'Question 2 · debout',
    title: 'Which Can Be Dissipated?',
    titleFr: 'Lesquelles peuvent se dissiper ?',
    text: '**chemical**, **thermal**, **light**, **sound**, **elastic**',
    textFr: '**chemical**, **thermal**, **light**, **sound**, **elastic**',
    sub: 'Mr Bowen says one word. Stand up if it can be dissipated.',
    subFr: 'M. Bowen dit un mot. Lève-toi s’il peut se dissiper.',
    reveal: {
      label: 'Answer',
      labelFr: 'Réponse',
      answer: '**Thermal**, **light** and **sound**: they spread out. **Chemical** and **elastic** energy stay in their store.',
      answerFr: '**Thermal**, **light** et **sound** : elles s’étalent. Les énergies **chemical** et **elastic** restent dans leur réserve.',
    },
  },

  // 19. Put it together: 3.6's ball and candle, and the motorbike (write)
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'Repeat',
    eyebrow: 'Put it together',
    eyebrowFr: 'En résumé',
    title: 'Where the Energy Went',
    titleFr: 'Où est partie l’énergie',
    ratio: 40,
    inlineSvg: DIAGRAMS.ALWAYS,
    content: 'Remember last lesson’s **ball** and **candle**?',
    contentFr: 'Tu te souviens de la **balle** et de la **bougie** de la dernière leçon ?',
    notes: [
      {
        tone: 'write',
        text: 'Every time energy is changed or transferred, some of it is **dissipated**.',
        textFr: 'Chaque fois que l’énergie est transformée ou transférée, une partie est **dissipée**.',
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
    content: '> Check your notebook: **3 written panels** and **1 drawing**.',
    contentFr: '> Vérifie ton cahier : **3 encadrés recopiés** et **1 dessin**.',
    items: [
      { text: 'Sort energy into **useful** and **wasted**.', textFr: 'Trier l’énergie en **utile** et **gaspillée**.' },
      { text: 'Use **percentages** to say which lamp wastes more.', textFr: 'Dire avec des **pourcentages** quelle lampe gaspille le plus.' },
      { text: 'Say what **dissipated** means, and that it cannot be **recovered**.', textFr: 'Dire ce que veut dire **dissipée**, et qu’on ne peut pas la **récupérer**.' },
      { text: 'Explain why some energy is **always** dissipated.', textFr: 'Expliquer pourquoi une partie de l’énergie est **toujours** dissipée.' },
    ],
  },

  // 21. Exit: an electric fan (Question 3c)
  {
    layout: 'hero',
    color: PURPLE,
    icon: 'Target',
    brand: 'Year 7 Science',
    brandFr: 'Sciences 7e année',
    eyebrow: 'Exit question',
    eyebrowFr: 'Question de sortie',
    title: 'An Electric Fan',
    titleFr: 'Un ventilateur électrique',
    subtitle: 'Name its **useful** energy and its **wasted** energy.',
    subtitleFr: 'Nomme son énergie **utile** et son énergie **gaspillée**.',
    reveal: {
      label: 'Answer',
      labelFr: 'Réponse',
      answer: 'Useful: **kinetic** (the moving air). Wasted: **thermal** (the motor gets warm) and **sound** (the hum).',
      answerFr: 'Utile : **kinetic** (l’air qui bouge). Gaspillée : **thermal** (le moteur chauffe) et **sound** (le bourdonnement).',
    },
  },
]
