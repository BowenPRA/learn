// content/y7-science/U03_coffee/slides.js
// Year 7 Science · Unit 3.2 Maths Modelling: Coffee, Carbon and Stars.
// One 50-minute period, after 3.2 (formation of the Solar System), which gave
// the second meaning of "model": one that uses maths to work out what nobody
// could see. Here that model is the half-life.
//
// ENGLISH AND FRENCH ONLY, like every Year 7 deck from Unit 4 / 15 October:
// every string has an …Fr twin and no …Vn twin. The diagrams stay in English.
//
// THE ARC (plan.js has the timings):
//   Coffee   when is Mr Bowen's 7 a.m. caffeine all gone? It halves every
//            5 hours: half-life. Bedtime, read from the pattern. Is it ever
//            all gone? (The model says never; molecules say two weeks.)
//   Carbon   what happens next? No coffee the next morning; delirious, Mr
//            Bowen stumbles into a block of ice; thousands of years later,
//            scientists find him: how long was he in the ice?
//            Carbon-14, a clock ten million times slower than caffeine; the
//            carbon clock; carbon dating; Mr Bowen's own answer. Last Atom
//            Standing, every game kept as a trial and graphed together.
//            Does carbon-14 ever run out? The dinosaur: too old for carbon.
//   Stars    the Sun is too old for carbon and nobody can take a piece: it is
//            a hydrogen clock. The model Sun. Then all three side by side:
//            different speeds, the same maths. And the carbon in the coffee
//            that was made in a star.
//
// The goals slide (2) and the checklist (23) say the same three things, so
// the lesson ends where it said it would.
//
// WRITING RULE (the 2.5 density): one hook line, short sentences, and the body
// never repeats the write note, a label or the caption.

import { DIAGRAMS } from './diagrams.js'
import { CoffeeClock, CarbonClock, LastAtom, AtomTrials } from './dating.jsx'
import { SunModel } from './sun.jsx'
import { StoryStrip } from './story.jsx'

const TEAL = '#0087a8'
const PURPLE = '#5c2483'
const ORANGE = '#c25e12'
const GREEN = '#4a8b23'
const BLUE = '#1a5fa8'

export const slides = [
  // ════════════════════════════════════════════════════════════════════════
  // COFFEE — half-life, from something Mr Bowen drinks
  // ════════════════════════════════════════════════════════════════════════

  // 1. Hero + starter: when is the caffeine gone?
  {
    layout: 'hero',
    color: PURPLE,
    icon: 'Hourglass',
    brand: 'Year 7 Science',
    brandFr: 'Sciences 7e année',
    eyebrow: 'Unit 3.2 · Maths Modelling',
    eyebrowFr: 'Unité 3.2 · Modélisation mathématique',
    title: 'Coffee, Carbon and Stars',
    titleFr: 'Café, carbone et étoiles',
    card: {
      icon: 'Coffee',
      badge: 'Starter',
      badgeFr: 'Pour commencer',
      text: 'Mr Bowen drinks a coffee at **7 a.m.** When is the caffeine **all gone** from his body? **Guess a time** and write it down.',
      textFr: 'M. Bowen boit un café à **7 h**. Quand la caféine a-t-elle **complètement disparu** de son corps ? **Devine une heure** et écris-la.',
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
    text: 'Use **maths** to find **how long ago** something happened.',
    textFr: 'Utiliser les **maths** pour trouver **il y a combien de temps** quelque chose s’est passé.',
    columns: [
      {
        heading: 'Coffee',
        headingFr: 'Le café',
        accent: ORANGE,
        icon: 'Coffee',
        inlineSvg: DIAGRAMS.PIC_COFFEE,
        caption: 'Find how long caffeine stays in you.',
        captionFr: 'Trouver combien de temps la caféine reste.',
      },
      {
        heading: 'Carbon',
        headingFr: 'Le carbone',
        accent: TEAL,
        icon: 'Atom',
        inlineSvg: DIAGRAMS.PIC_CARBON,
        caption: 'Use carbon to find when things died.',
        captionFr: 'Dater une mort grâce au carbone.',
      },
      {
        heading: 'Stars',
        headingFr: 'Les étoiles',
        accent: PURPLE,
        icon: 'Sun',
        inlineSvg: DIAGRAMS.PIC_SUN,
        caption: 'Use a model Sun to find the Sun’s age.',
        captionFr: 'Utiliser un Soleil modèle pour trouver l’âge du Soleil.',
      },
    ],
  },

  // 3. The coffee stepper
  {
    layout: 'showcase',
    accent: ORANGE,
    icon: 'Coffee',
    eyebrow: 'Say it first',
    eyebrowFr: 'Dis-le d’abord',
    title: 'Mr Bowen’s Coffee',
    titleFr: 'Le café de M. Bowen',
    widget: CoffeeClock,
    caption: 'A cup of coffee: about **100 mg** of caffeine. Say the next number **before** it is shown.',
    captionFr: 'Une tasse de café : environ **100 mg** de caféine. Dis le nombre suivant **avant** qu’il s’affiche.',
  },

  // 4. Half-life (write)
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Hourglass',
    eyebrow: 'Key word',
    eyebrowFr: 'Mot clé',
    title: 'Half-Life',
    titleFr: 'La demi-vie',
    ratio: 45,
    inlineSvg: DIAGRAMS.HALVING,
    content: '**half** · to **halve** · a **half-life**',
    contentFr: '**half** (la moitié) · to **halve** (diviser par deux) · a **half-life** (la demi-vie)',
    notes: [
      {
        tone: 'write',
        text: '**Half-life:** the time it takes for half of something to disappear.',
        textFr: '**Demi-vie (half-life) :** le temps qu’il faut pour que la moitié de quelque chose disparaisse.',
      },
      {
        tone: 'info',
        badge: false,
        text: 'Caffeine’s half-life is about **5 hours**.',
        textFr: 'La demi-vie de la caféine est d’environ **5 heures**.',
      },
    ],
  },

  // 5. Bedtime: estimate between two points
  {
    layout: 'statement',
    accent: PURPLE,
    eyebrow: 'Estimate · whiteboards',
    eyebrowFr: 'Estime · ardoises',
    title: 'Bedtime',
    titleFr: 'L’heure du coucher',
    text: 'Mr Bowen goes to bed at **8 p.m.** How much caffeine is left in his body?',
    textFr: 'M. Bowen se couche à **20 h**. Combien de caféine lui reste-t-il ?',
    sub: 'He drank **100 mg** at 7 a.m.',
    subFr: 'Il en a bu **100 mg** à 7 h.',
    reveal: {
      label: 'Answer',
      labelFr: 'Réponse',
      answer: '5 p.m.: **25 mg**. 10 p.m.: **12.5 mg**. So 8 p.m.: about **16 mg**.',
      answerFr: '17 h : **25 mg**. 22 h : **12.5 mg**. Donc 20 h : environ **16 mg**.',
    },
  },

  // 6. Back to the starter: is it ever all gone?
  {
    layout: 'statement',
    accent: PURPLE,
    eyebrow: 'Back to the starter',
    eyebrowFr: 'Retour au début',
    title: 'Does It Ever Run Out?',
    titleFr: 'Est-ce qu’elle disparaît un jour ?',
    text: 'Is Mr Bowen’s caffeine **ever** all gone?',
    textFr: 'La caféine de M. Bowen disparaît-elle **un jour** ?',
    reveal: {
      label: 'Answer',
      labelFr: 'Réponse',
      answer: '**The maths model says no:** it halves for ever.\n**But** caffeine is molecules. The last one goes after about **2 weeks**. That is a **limitation** of the model.',
      answerFr: '**Le modèle dit non :** elle est divisée par deux pour toujours.\n**Mais** la caféine, ce sont des molécules. La dernière part après environ **2 semaines**. C’est une **limite** du modèle.',
    },
  },

  // ════════════════════════════════════════════════════════════════════════
  // CARBON — Mr Bowen, tragically without his coffee
  // ════════════════════════════════════════════════════════════════════════

  // 7. What happens next? Mr Bowen's sad day, one panel per press (deadpan)
  {
    layout: 'showcase',
    accent: BLUE,
    icon: 'Snowflake',
    eyebrow: 'What happens next?',
    eyebrowFr: 'Que se passe-t-il ensuite ?',
    title: 'Mr Bowen’s Sad Day',
    titleFr: 'Le triste jour de M. Bowen',
    widget: StoryStrip,
    caption: 'Before each step, **predict**: what happens next?',
    captionFr: 'Avant chaque étape, **prédis** : que se passe-t-il ensuite ?',
  },

  // 8. Carbon-14 (write)
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Atom',
    eyebrow: 'Key word',
    eyebrowFr: 'Mot clé',
    title: 'Carbon-14',
    titleFr: 'Le carbone 14',
    ratio: 45,
    inlineSvg: DIAGRAMS.CARBON_TWO,
    content: 'You are full of **carbon** atoms (2.5). A tiny few are a special kind.',
    contentFr: 'Tu es plein d’atomes de **carbone** (2.5). Quelques-uns sont d’un type spécial.',
    notes: [
      {
        tone: 'write',
        text: '**Carbon-14:** a rare kind of carbon that slowly breaks down into nitrogen.',
        textFr: '**Carbone 14 (carbon-14) :** un type rare de carbone qui se transforme lentement en azote.',
      },
      {
        tone: 'info',
        badge: false,
        text: 'Carbon-14’s half-life is **5 700 years**.',
        textFr: 'La demi-vie du carbone 14 est de **5 700 ans**.',
      },
    ],
  },

  // 9. The link: caffeine and carbon-14 are the same maths at two speeds
  {
    layout: 'compare',
    accent: ORANGE,
    icon: 'Timer',
    eyebrow: 'Two half-lives',
    eyebrowFr: 'Deux demi-vies',
    title: 'Ten Million Times Slower',
    titleFr: 'Dix millions de fois plus lent',
    text: 'Caffeine halves in **5 hours**. Carbon-14 halves in **5 700 years**.',
    textFr: 'La caféine est divisée par deux en **5 heures**. Le carbone 14, en **5 700 ans**.',
    columns: [
      {
        heading: 'Caffeine: a fast clock',
        headingFr: 'La caféine : une horloge rapide',
        accent: ORANGE,
        icon: 'Coffee',
        inlineSvg: DIAGRAMS.PIC_COFFEE,
        caption: 'Gone from the body in about **2 weeks**.',
        captionFr: 'Partie du corps en environ **2 semaines**.',
      },
      {
        heading: 'Carbon-14: a very slow clock',
        headingFr: 'Le carbone 14 : une horloge très lente',
        accent: TEAL,
        icon: 'Atom',
        inlineSvg: DIAGRAMS.PIC_CARBON,
        caption: 'Lasts for **thousands** of years.',
        captionFr: 'Dure des **milliers** d’années.',
      },
    ],
  },

  // 10. Where it comes from
  {
    layout: 'showcase',
    accent: GREEN,
    icon: 'Leaf',
    eyebrow: 'From the air to Mr Bowen',
    eyebrowFr: 'De l’air jusqu’à M. Bowen',
    title: 'Where Does Carbon-14 Come From?',
    titleFr: 'D’où vient le carbone 14 ?',
    inlineSvg: DIAGRAMS.C14_CYCLE,
    caption: 'While you are alive, food and drink keep **topping up** your carbon-14. Even coffee.',
    captionFr: 'Tant que tu es vivant, la nourriture et les boissons **rechargent** ton carbone 14. Même le café.',
  },

  // 11. The carbon clock model
  {
    layout: 'showcase',
    accent: ORANGE,
    icon: 'Timer',
    eyebrow: 'A model',
    eyebrowFr: 'Un modèle',
    title: 'Mr Bowen’s Carbon Clock',
    titleFr: 'L’horloge à carbone de M. Bowen',
    widget: CarbonClock,
    caption: 'Before each half-life, guess: how many atoms will be left?',
    captionFr: 'Avant chaque demi-vie, devine : combien d’atomes resteront ?',
  },

  // 12. Carbon dating (write + Draw This)
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'Pencil',
    eyebrow: 'Draw this',
    eyebrowFr: 'À dessiner',
    title: 'Carbon Dating',
    titleFr: 'La datation au carbone 14',
    ratio: 45,
    inlineSvg: DIAGRAMS.DECAY_CURVE,
    drawThis: true,
    content: 'Less carbon-14 left means **older**.',
    contentFr: 'Moins il reste de carbone 14, plus c’est **vieux**.',
    notes: [
      {
        tone: 'write',
        text: '**Carbon dating:** finding the age of something that was once alive by measuring how much carbon-14 is left.',
        textFr: '**Datation au carbone 14 (carbon dating) :** trouver l’âge de quelque chose qui a été vivant en mesurant le carbone 14 qui reste.',
      },
    ],
  },

  // 13. Mr Bowen's answer (slide 7's question)
  {
    layout: 'statement',
    accent: PURPLE,
    eyebrow: 'Work it out · whiteboards',
    eyebrowFr: 'Calcule · ardoises',
    title: 'How Long in the Ice?',
    titleFr: 'Combien de temps dans la glace ?',
    text: 'Mr Bowen has **25%** of his carbon-14 left.',
    textFr: 'Il reste à M. Bowen **25 %** de son carbone 14.',
    sub: 'Carbon-14’s half-life is 5 700 years. How long has he been in the ice?',
    subFr: 'La demi-vie du carbone 14 est de 5 700 ans. Depuis combien de temps est-il dans la glace ?',
    reveal: {
      label: 'Answer',
      labelFr: 'Réponse',
      answer: '100% → 50% → 25%: **2 half-lives**.\n2 × 5 700 = **11 400 years**.',
      answerFr: '100 % → 50 % → 25 % : **2 demi-vies**.\n2 × 5 700 = **11 400 ans**.',
    },
  },

  // 14. Last Atom Standing — each game is a trial
  {
    layout: 'showcase',
    accent: GREEN,
    icon: 'Coins',
    eyebrow: 'A game · 5 coins each',
    eyebrowFr: 'Un jeu · 5 pièces chacun',
    title: 'Last Atom Standing',
    titleFr: 'Le dernier atome debout',
    widget: LastAtom,
    caption: 'Flip all your coins each round. **Tails:** that atom broke down. The last student with a **head** wins a prize ticket!',
    captionFr: 'Lance toutes tes pièces à chaque tour. **Pile :** cet atome s’est désintégré. Le dernier élève avec une **face** gagne un ticket !',
  },

  // 15. Every trial, on one graph
  {
    layout: 'showcase',
    accent: GREEN,
    icon: 'Table',
    eyebrow: 'Our results',
    eyebrowFr: 'Nos résultats',
    title: 'Our Trials',
    titleFr: 'Nos essais',
    widget: AtomTrials,
    caption: 'Is every trial **different**? Does every trial still **halve**?',
    captionFr: 'Chaque essai est-il **différent** ? Chaque essai est-il quand même **divisé par deux** ?',
  },

  // 16. Random or predictable?
  {
    layout: 'statement',
    accent: PURPLE,
    icon: 'HelpCircle',
    eyebrow: 'Think',
    eyebrowFr: 'Réfléchis',
    title: 'Random or Predictable?',
    titleFr: 'Hasard ou prévisible ?',
    text: 'Could anyone say **who** would win before we started?',
    textFr: 'Pouvait-on dire **qui** allait gagner avant de commencer ?',
    reveal: {
      label: 'Answer',
      labelFr: 'Réponse',
      answer: '**No.** Each atom breaks down at a **random** moment.\nBut **half** of a big group always goes in one half-life.',
      answerFr: '**Non.** Chaque atome se désintègre à un moment **au hasard**.\nMais la **moitié** d’un grand groupe part toujours en une demi-vie.',
    },
  },

  // 17. Does carbon-14 ever run out? (slide 6's question again)
  {
    layout: 'statement',
    accent: PURPLE,
    eyebrow: 'Like the caffeine',
    eyebrowFr: 'Comme la caféine',
    title: 'Does It Ever Run Out?',
    titleFr: 'Est-ce qu’il disparaît un jour ?',
    text: 'Is Mr Bowen’s carbon-14 **ever** all gone?',
    textFr: 'Le carbone 14 de M. Bowen disparaît-il **un jour** ?',
    reveal: {
      label: 'Answer',
      labelFr: 'Réponse',
      answer: '**Yes**, like our coins. He has about **900 trillion** carbon-14 atoms.\nAfter about **280 000 years**, the last one breaks down.',
      answerFr: '**Oui**, comme nos pièces. Il a environ **900 000 milliards** d’atomes de carbone 14.\nAprès environ **280 000 ans**, le dernier se désintègre.',
    },
  },

  // 18. Vote: the dinosaur
  {
    layout: 'compare',
    accent: PURPLE,
    icon: 'Hand',
    eyebrow: 'Vote with one hand',
    eyebrowFr: 'Vote avec une main',
    title: 'A Dinosaur Bone',
    titleFr: 'Un os de dinosaure',
    text: 'Can carbon dating tell us how old a **dinosaur** bone is?',
    textFr: 'La datation au carbone 14 peut-elle donner l’âge d’un os de **dinosaure** ?',
    columns: [
      { heading: 'A · left hand up', headingFr: 'A · main gauche levée', accent: BLUE, icon: 'Hand', inlineSvg: DIAGRAMS.ANS_DINO_YES },
      { heading: 'B · right hand up', headingFr: 'B · main droite levée', accent: ORANGE, icon: 'Hand', inlineSvg: DIAGRAMS.ANS_DINO_NO },
    ],
  },

  // 19. Too old for carbon: the clock's limitation (write)
  {
    layout: 'split',
    accent: TEAL,
    icon: 'AlertTriangle',
    eyebrow: 'Answer: B · a limitation',
    eyebrowFr: 'Réponse : B · une limite',
    title: 'Too Old for Carbon',
    titleFr: 'Trop vieux pour le carbone 14',
    ratio: 45,
    inlineSvg: DIAGRAMS.TOO_OLD,
    content: 'Dinosaurs died out **66 million years** ago. That is over **11 000** half-lives. No carbon-14 is left.',
    contentFr: 'Les dinosaures ont disparu il y a **66 millions d’années**. C’est plus de **11 000** demi-vies. Il ne reste plus de carbone 14.',
    notes: [
      {
        tone: 'write',
        text: 'Carbon dating only works for things that were **alive**, up to about **50 000 years** old.',
        textFr: 'La datation au carbone 14 ne marche que pour ce qui a été **vivant**, jusqu’à environ **50 000 ans**.',
      },
    ],
  },

  // ════════════════════════════════════════════════════════════════════════
  // STARS — the Sun is a hydrogen clock
  // ════════════════════════════════════════════════════════════════════════

  // 20. The Sun: the question
  {
    layout: 'statement',
    accent: ORANGE,
    eyebrow: 'Think',
    eyebrowFr: 'Réfléchis',
    title: 'How Old Is the Sun?',
    titleFr: 'Quel âge a le Soleil ?',
    text: 'Nobody can take a piece of the Sun.',
    textFr: 'Personne ne peut prendre un morceau du Soleil.',
    sub: 'It is far too old for carbon. So how can we find its age?',
    subFr: 'Il est bien trop vieux pour le carbone 14. Alors comment trouver son âge ?',
    reveal: {
      label: 'A clue',
      labelFr: 'Un indice',
      answer: 'The Sun is a **clock** too. It uses up **hydrogen**.',
      answerFr: 'Le Soleil est aussi une **horloge**. Il consomme de l’**hydrogène**.',
    },
  },

  // 21. The model Sun
  {
    layout: 'showcase',
    accent: ORANGE,
    icon: 'Sun',
    eyebrow: 'A maths model',
    eyebrowFr: 'Un modèle mathématique',
    title: 'Build a Sun, Then Let It Age',
    titleFr: 'Construis un Soleil, puis fais-le vieillir',
    widget: SunModel,
    caption: 'The Sun turns **hydrogen** into **helium**. Slide until the model matches what we measure.',
    captionFr: 'Le Soleil transforme l’**hydrogène** en **hélium**. Fais glisser jusqu’à ce que le modèle corresponde aux mesures.',
  },

  // 22. Coffee, carbon and stars: different speeds, the same maths (write)
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'Timer',
    eyebrow: 'Put it together',
    eyebrowFr: 'En résumé',
    title: 'Coffee, Carbon and Stars',
    titleFr: 'Café, carbone et étoiles',
    ratio: 50,
    inlineSvg: DIAGRAMS.THREE_CLOCKS,
    content: 'Different speeds. The same maths.',
    contentFr: 'Des vitesses différentes. Les mêmes maths.',
    notes: [
      {
        tone: 'write',
        text: '**Caffeine**, **carbon-14** and the **Sun’s hydrogen** all disappear at a rate we can **model with maths**. Measure what is **left** to find **how long** it has been. The Sun is about **4.6 billion years** old.',
        textFr: 'La **caféine**, le **carbone 14** et l’**hydrogène du Soleil** disparaissent tous à un rythme que les **maths** peuvent modéliser. Mesure ce qui **reste** pour trouver **depuis combien de temps**. Le Soleil a environ **4.6 milliards d’années**.',
      },
    ],
    reveal: {
      label: 'One more link',
      labelFr: 'Encore un lien',
      answer: 'Caffeine is made of **carbon** and **hydrogen** atoms. That carbon was made inside a **star**, long before the Sun.',
      answerFr: 'La caféine est faite d’atomes de **carbone** et d’**hydrogène**. Ce carbone a été fabriqué dans une **étoile**, bien avant le Soleil.',
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
      { text: 'Use a **half-life** to work out how long caffeine stays.', textFr: 'Utiliser une **demi-vie** pour trouver combien de temps la caféine reste.' },
      { text: 'Explain how **carbon dating** shows when something died.', textFr: 'Expliquer comment la **datation au carbone 14** date une mort.' },
      { text: 'Give a **limitation** of carbon dating.', textFr: 'Donner une **limite** de la datation au carbone 14.' },
      { text: 'Use a **model Sun** to find the Sun’s age.', textFr: 'Utiliser un **Soleil modèle** pour trouver l’âge du Soleil.' },
    ],
  },

  // 24. Exit
  {
    layout: 'hero',
    color: PURPLE,
    icon: 'Target',
    brand: 'Year 7 Science',
    brandFr: 'Sciences 7e année',
    eyebrow: 'Exit question',
    eyebrowFr: 'Question de sortie',
    title: 'A Wooden Spear',
    titleFr: 'Une lance en bois',
    subtitle: 'A wooden spear has **6.25%** of its carbon-14 left. How old is it?',
    subtitleFr: 'Une lance en bois a encore **6.25 %** de son carbone 14. Quel âge a-t-elle ?',
    reveal: {
      label: 'Answer',
      labelFr: 'Réponse',
      answer: '100 → 50 → 25 → 12.5 → 6.25: **4 half-lives**.\n4 × 5 700 = **22 800 years** old.',
      answerFr: '100 → 50 → 25 → 12.5 → 6.25 : **4 demi-vies**.\n4 × 5 700 = **22 800 ans**.',
    },
  },
]
