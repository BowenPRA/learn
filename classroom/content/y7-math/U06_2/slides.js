// content/y7-math/U06_2/slides.js
// Year 7 Mathematics · 6.2 Taking a sample. One 50-minute period, the second
// and last of Unit 6 Collecting data, straight after 6.1 (whose canteen survey,
// "how do you come to school?" and Workbook words it keeps using, but not its
// stored data). Source: Workbook Unit 6, Section 6.2 (pp. 76–79); there is no
// Learner's Book for this unit. Every number used in class is original, so
// Exercise 6.2 is unspent. No homework slide.
//
// ENGLISH AND FRENCH ONLY, like every Year 7 deck from Unit 4 / 15 October:
// every string has an …Fr twin and no …Vn twin. The diagrams stay in English.
//
// THE ARC (the shape of Coffee, Carbon and Stars, 3.4 Tides, 5.2, 5.3, 6.1):
//   Words    5 students said yes: is it 80% of the school? (a guess, kept for
//            later). Everyone or a sample? one card a press. Population,
//            sample, sample size; a sample in everyday English (a free sample,
//            a blood sample); whiteboards.
//   Fair     What happens next? Mr Bowen salts the phở and does not stir. Stir
//            the pot: a fair sample. A vote: every 10th name, or the first 30
//            at the gate? At random.
//   Size     Small sample, big sample: real random samples of 5 and 50 from 200
//            students, one dot a press. A large sample is better (but not all
//            200). Back to the starter. The class samples itself with the
//            Class list button. The Workbook's words; whiteboards; dice means;
//            population to sample, drawn. Three deadpan word problems.
//
// The goals slide (2) and the checklist (22) say the same three things — ask
// some, choose fairly, how many — and the starter comes back on slide 13.
//
// COPY-DOWN: 4 written panels — population, sample, sample size (4), a fair
// sample (8), at random (10), a large sample (12) — and 1 drawing: population
// to sample (18).
//
// WRITING RULE (the 2.5 density): one hook line, short sentences, and the body
// never repeats the write note, a label or the caption.
import { DIAGRAMS } from './diagrams.js'
import { EveryoneOrSample } from './everyone.jsx'
import { PhoStory } from './story.jsx'
import { SampleSizes } from './sampler.jsx'

const TEAL = '#0087a8'
const PURPLE = '#5c2483'
const ORANGE = '#c25e12'
const GREEN = '#4a8b23'
const BLUE = '#1a5fa8'

export const slides = [
  // ════════════════════════════════════════════════════════════════════════
  // WORDS — population, sample, sample size
  // ════════════════════════════════════════════════════════════════════════

  // 1. Hero + starter: 4 out of 5 (back on slide 13)
  {
    layout: 'hero',
    color: PURPLE,
    icon: 'Users',
    brand: 'Year 7 Mathematics',
    brandFr: 'Maths 7e année',
    eyebrow: 'Unit 6 · 6.2',
    eyebrowFr: 'Unité 6 · 6.2',
    title: 'Taking a Sample',
    titleFr: 'Prendre un échantillon',
    card: {
      icon: 'Pencil',
      badge: 'Starter',
      badgeFr: 'Pour commencer',
      text: 'Mr Bowen asks **5** students. **4** like the new canteen menu. He says: “**80%** of the school like it!” Do you agree? Write **yes** or **no**.',
      textFr: 'M. Bowen demande à **5** élèves. **4** aiment le nouveau menu de la cantine. Il dit : « **80%** de l’école l’aiment ! » Es-tu d’accord ? Écris **oui** ou **non**.',
    },
  },

  // 2. Today's goals (the checklist on slide 22 ticks off the same three)
  {
    layout: 'compare',
    accent: TEAL,
    icon: 'Target',
    eyebrow: 'Today',
    eyebrowFr: 'Aujourd’hui',
    title: 'Today You Will…',
    titleFr: 'Aujourd’hui, tu vas…',
    text: 'Ask **some** people. Learn about **everyone**.',
    textFr: 'Demande à **quelques** élèves. Apprends sur **toute** l’école.',
    columns: [
      {
        heading: 'A small part',
        headingFr: 'Une petite partie',
        accent: ORANGE,
        icon: 'Soup',
        inlineSvg: DIAGRAMS.PIC_SOME,
        caption: 'Learn about all by asking some.',
        captionFr: 'Tout savoir en demandant à peu.',
      },
      {
        heading: 'Fair',
        headingFr: 'Équitable',
        accent: GREEN,
        icon: 'Scale',
        inlineSvg: DIAGRAMS.PIC_FAIR,
        caption: 'Choose who to ask, fairly.',
        captionFr: 'Choisir qui interroger, sans tricher.',
      },
      {
        heading: 'How many?',
        headingFr: 'Combien ?',
        accent: BLUE,
        icon: 'Users',
        inlineSvg: DIAGRAMS.PIC_MORE,
        caption: 'See why more answers are better.',
        captionFr: 'Voir pourquoi plus, c’est mieux.',
      },
    ],
  },

  // 3. Say it first: everyone or a sample? One card a press
  {
    layout: 'showcase',
    accent: TEAL,
    icon: 'HelpCircle',
    eyebrow: 'Say it first',
    eyebrowFr: 'Dis-le d’abord',
    title: 'Everyone or a Sample?',
    titleFr: 'Tout le monde ou un échantillon ?',
    widget: EveryoneOrSample,
    caption: 'Before each press, say: **ask everyone** or **take a sample**? Why?',
    captionFr: 'Avant chaque clic, dis : **demander à tous** ou **prendre un échantillon** ? Pourquoi ?',
  },

  // 4. Population, sample, sample size (write)
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'Users',
    eyebrow: 'Key words',
    eyebrowFr: 'Mots clés',
    title: 'Population and Sample',
    titleFr: 'Population et échantillon',
    ratio: 45,
    inlineSvg: DIAGRAMS.SCHOOL,
    notes: [
      {
        tone: 'write',
        text: '**Population:** everyone you want to know about.\n**Sample:** the ones you ask.\n**Sample size:** how many you ask.',
        textFr: '**Population (population) :** tous ceux que tu veux connaître.\n**Échantillon (sample) :** ceux que tu interroges.\n**Taille de l’échantillon (sample size) :** combien tu en interroges.',
      },
    ],
  },

  // 5. English check: a sample, every day
  {
    layout: 'showcase',
    accent: PURPLE,
    icon: 'MessageSquare',
    eyebrow: 'English check',
    eyebrowFr: 'Point d’anglais',
    title: 'A Sample, Every Day',
    titleFr: 'Un échantillon, tous les jours',
    inlineSvg: DIAGRAMS.EVERYDAY,
    caption: 'Each one is a **small part** that tells you about the **whole**.',
    captionFr: 'Chacun est une **petite partie** qui parle du **tout**. **Sample** = échantillon.',
  },

  // 6. Whiteboards: name the population, sample and sample size
  {
    layout: 'split',
    accent: GREEN,
    icon: 'PenLine',
    eyebrow: 'Whiteboards',
    eyebrowFr: 'Ardoises',
    title: 'Name Them',
    titleFr: 'Nomme-les',
    ratio: 40,
    inlineSvg: DIAGRAMS.NAME_THEM,
    content: 'For **a** and **b**, write the **population**, the **sample** and the **sample size**.',
    contentFr: 'Pour **a** et **b**, écris la **population**, l’**échantillon** et la **taille de l’échantillon**.',
    reveal: {
      label: 'Check your answers',
      labelFr: 'Vérifie tes réponses',
      answer: '**a** Population: all 120 Year 7 students. Sample: the 30 he asks. Sample size: **30**.\n**b** Population: the 5000 phones. Sample: the 50 tested. Sample size: **50**.',
      answerFr: '**a** Population : les 120 élèves de Year 7. Échantillon : les 30 interrogés. Taille : **30**.\n**b** Population : les 5000 téléphones. Échantillon : les 50 testés. Taille : **50**.',
    },
  },

  // ════════════════════════════════════════════════════════════════════════
  // FAIR — Mr Bowen's phở
  // ════════════════════════════════════════════════════════════════════════

  // 7. What happens next? Mr Bowen's phở (deadpan)
  {
    layout: 'showcase',
    accent: BLUE,
    icon: 'Soup',
    eyebrow: 'What happens next?',
    eyebrowFr: 'Que se passe-t-il ensuite ?',
    title: 'Mr Bowen’s Phở',
    titleFr: 'Le phở de M. Bowen',
    widget: PhoStory,
    caption: 'Before each step, **predict**: what happens next?',
    captionFr: 'Avant chaque étape, **prédis** : que se passe-t-il ensuite ?',
  },

  // 8. The answer: stir the pot — a fair sample (write)
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Soup',
    eyebrow: 'The answer',
    eyebrowFr: 'La réponse',
    title: 'Stir the Pot',
    titleFr: 'Remue la marmite',
    ratio: 45,
    inlineSvg: DIAGRAMS.STIR_IT,
    content: 'His spoon tasted only the **top**, where the salt was.',
    contentFr: 'Sa cuillère n’a goûté que le **dessus**, là où était le sel.',
    notes: [
      {
        tone: 'write',
        text: '**Fair sample:** a sample that is like the whole population.',
        textFr: '**Échantillon équitable (fair sample) :** un échantillon qui ressemble à toute la population.',
      },
      {
        tone: 'info',
        badge: false,
        text: 'The Workbook says **representative**. It means fair.',
        textFr: 'Le cahier dit **representative** (représentatif). Ça veut dire équitable.',
      },
    ],
  },

  // 9. Vote: which sample is fair?
  {
    layout: 'compare',
    accent: PURPLE,
    icon: 'Hand',
    eyebrow: 'Vote with one hand',
    eyebrowFr: 'Vote avec une main',
    title: 'Which Sample Is Fair?',
    titleFr: 'Quel échantillon est équitable ?',
    text: 'Mr Bowen wants to know how students come to school. He asks **30** students. Which sample is **fair**?',
    textFr: 'M. Bowen veut savoir comment les élèves viennent à l’école. Il interroge **30** élèves. Quel échantillon est **équitable** ?',
    columns: [
      { heading: 'A · left hand up', headingFr: 'A · main gauche levée', accent: BLUE, icon: 'Hand', inlineSvg: DIAGRAMS.ANS_LIST },
      { heading: 'B · right hand up', headingFr: 'B · main droite levée', accent: ORANGE, icon: 'Hand', inlineSvg: DIAGRAMS.ANS_GATE },
    ],
  },

  // 10. Answer A: at random (write)
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'ListChecks',
    eyebrow: 'Answer: A · key words',
    eyebrowFr: 'Réponse : A · mots clés',
    title: 'At Random',
    titleFr: 'Au hasard',
    ratio: 45,
    inlineSvg: DIAGRAMS.RANDOM,
    content: 'The first 30 at the gate all came **early**: maybe all by car.',
    contentFr: 'Les 30 premiers au portail sont tous venus **tôt** : peut-être tous en voiture.',
    notes: [
      {
        tone: 'write',
        text: '**At random:** everyone has the **same chance** to be chosen.',
        textFr: '**Au hasard (at random) :** chacun a la **même chance** d’être choisi.',
      },
    ],
  },

  // ════════════════════════════════════════════════════════════════════════
  // HOW MANY? — small samples jump, large ones settle
  // ════════════════════════════════════════════════════════════════════════

  // 11. The model: random samples of 5 and 50
  {
    layout: 'showcase',
    accent: BLUE,
    icon: 'Users',
    eyebrow: 'A model · predict each press',
    eyebrowFr: 'Un modèle · prédis chaque clic',
    title: 'Small Sample, Big Sample',
    titleFr: 'Petit et grand échantillon',
    widget: SampleSizes,
    caption: 'Before each press: will this answer be close to the **last** one? At the end: what will **everyone** say?',
    captionFr: 'Avant chaque clic : la réponse sera-t-elle proche de la **dernière** ? À la fin : que diront **tous** les élèves ?',
  },

  // 12. A large sample is better, but not everyone (write)
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'Scale',
    eyebrow: 'Key idea',
    eyebrowFr: 'Idée clé',
    title: 'How Many to Ask?',
    titleFr: 'Combien interroger ?',
    ratio: 45,
    inlineSvg: DIAGRAMS.ENOUGH,
    notes: [
      {
        tone: 'write',
        text: 'A **large** sample is better than a small one.',
        textFr: 'Un **grand** échantillon vaut mieux qu’un petit.',
      },
      {
        tone: 'info',
        badge: false,
        text: 'Large enough to be **steady**. Small enough to be **quick**.',
        textFr: 'Assez grand pour être **stable**. Assez petit pour être **rapide**.',
      },
    ],
  },

  // 13. Back to the starter
  {
    layout: 'statement',
    accent: PURPLE,
    eyebrow: 'Back to the starter',
    eyebrowFr: 'Retour au début',
    title: '4 out of 5',
    titleFr: '4 sur 5',
    text: 'Can **5** students tell him “**80%** of the school”?',
    textFr: '**5** élèves peuvent-ils lui dire « **80%** de l’école » ?',
    notes: [
      {
        tone: 'info',
        badge: false,
        text: 'I disagree, **because** the sample is too **small**.',
        textFr: 'I disagree, **because** the sample is too **small**. (trop petit)',
      },
    ],
    reveal: {
      label: 'Answer',
      labelFr: 'Réponse',
      answer: '**No.** Our samples of 5 jumped about. And were the 5 chosen at random?',
      answerFr: '**Non.** Nos échantillons de 5 sautaient partout. Et pris au hasard ?',
    },
  },

  // 14. The class samples itself
  {
    layout: 'split',
    accent: GREEN,
    icon: 'Users',
    eyebrow: 'Try it · our class',
    eyebrowFr: 'Essaie · notre classe',
    title: 'Sample Our Class',
    titleFr: 'Échantillonne la classe',
    ratio: 40,
    inlineSvg: DIAGRAMS.CLASS_TABLE,
    content: 'Our class is the **population**. Mr Bowen presses **Class list** to pick names at **random**.\n\nA: 4 names. B: 4 more. C: 12 names. Then everyone, hands up.',
    contentFr: 'Notre classe est la **population**. M. Bowen clique sur **Liste de la classe** pour tirer des noms **au hasard**.\n\nA : 4 noms. B : 4 autres. C : 12 noms. Puis tout le monde, mains levées.',
    notes: [
      {
        tone: 'task',
        badge: 'Whiteboards',
        badgeFr: 'Ardoises',
        text: 'Which sample is closest to **everyone**?',
        textFr: 'Quel échantillon est le plus proche de **tout le monde** ?',
      },
    ],
  },

  // ════════════════════════════════════════════════════════════════════════
  // THE WORKBOOK'S WORDS — then three word problems
  // ════════════════════════════════════════════════════════════════════════

  // 15. The Workbook's question words
  {
    layout: 'showcase',
    accent: PURPLE,
    icon: 'MessageSquare',
    eyebrow: 'English check · the Workbook',
    eyebrowFr: 'Point d’anglais · le cahier',
    title: 'Read the Question',
    titleFr: 'Lis la question',
    inlineSvg: DIAGRAMS.PHRASES,
    caption: 'Read each question out loud. Then say what it means.',
    captionFr: 'Lis chaque question à voix haute. Puis dis ce qu’elle veut dire.',
  },

  // 16. Whiteboards in the Workbook's words: the zoo
  {
    layout: 'split',
    accent: GREEN,
    icon: 'PenLine',
    eyebrow: 'Whiteboards · Workbook words',
    eyebrowFr: 'Ardoises · mots du cahier',
    title: 'Is This a Good Way?',
    titleFr: 'Est-ce une bonne façon ?',
    ratio: 40,
    inlineSvg: DIAGRAMS.ZOO,
    content: '**a** What is the sample size?\n\n**b** Is this a good way to choose a sample? Give **two** reasons.\n\n**c** Suggest a better way.',
    contentFr: '**a** Quelle est la taille de l’échantillon ?\n\n**b** Est-ce une bonne façon de choisir un échantillon ? Donne **deux** raisons.\n\n**c** Propose une meilleure façon.',
    reveal: {
      label: 'Check your answers',
      labelFr: 'Vérifie tes réponses',
      answer: '**a** 15. **b** No: 15 out of 3000 is too small, and the first visitors at 10:00 are not like everyone. **c** Ask every 20th visitor at the exit, all day.',
      answerFr: '**a** 15. **b** Non : 15 sur 3000, c’est trop petit, et les premiers à 10:00 ne ressemblent pas à tous. **c** Interroger un visiteur sur 20 à la sortie, toute la journée.',
    },
  },

  // 17. Whiteboards: the mean of a sample
  {
    layout: 'split',
    accent: GREEN,
    icon: 'Calculator',
    eyebrow: 'Whiteboards',
    eyebrowFr: 'Ardoises',
    title: 'Mean of a Sample',
    titleFr: 'Moyenne d’un échantillon',
    ratio: 40,
    inlineSvg: DIAGRAMS.DICE,
    content: 'Find the **mean** of each sample.\n\nThe mean of **all** rolls of a dice is **3.5**. Which sample is closest?',
    contentFr: 'Calcule la **moyenne** de chaque échantillon.\n\nLa moyenne de **tous** les lancers d’un dé est **3.5**. Quel échantillon en est le plus proche ?',
    reveal: {
      label: 'Check your answers',
      labelFr: 'Vérifie tes réponses',
      answer: '**A** 18 ÷ 4 = **4.5**. **B** 8 ÷ 4 = **2**. **C** 44 ÷ 12 ≈ **3.7**. C, the **largest** sample, is closest.',
      answerFr: '**A** 18 ÷ 4 = **4.5**. **B** 8 ÷ 4 = **2**. **C** 44 ÷ 12 ≈ **3.7**. C, le **plus grand** échantillon, est le plus proche.',
    },
  },

  // 18. Put it together: population to sample (Draw This)
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'Pencil',
    eyebrow: 'Put it together · draw this',
    eyebrowFr: 'En résumé · à dessiner',
    title: 'From Population to Sample',
    titleFr: 'De la population à l’échantillon',
    ratio: 40,
    inlineSvg: DIAGRAMS.POP_SAMPLE,
    drawThis: true,
    content: 'Copy the drawing: the **population**, the **sample** and the two arrows.',
    contentFr: 'Recopie le dessin : la **population**, l’**échantillon** et les deux flèches.',
  },

  // 19. Word problem: the matches
  {
    layout: 'callout',
    accent: GREEN,
    icon: 'PenLine',
    eyebrow: 'Word problem',
    eyebrowFr: 'Problème',
    title: 'Mr Bowen’s Matches',
    titleFr: 'Les allumettes de M. Bowen',
    content:
      'Mr Bowen buys a box of **50** matches. To check that they work, he lights all 50. They all work.\n\n' +
      'Is this a good way to choose a sample?',
    contentFr:
      'M. Bowen achète une boîte de **50** allumettes. Pour vérifier qu’elles marchent, il les allume toutes. Elles marchent toutes.\n\n' +
      'Est-ce une bonne façon de choisir un échantillon ?',
    reveal: {
      label: 'Check your answer',
      labelFr: 'Vérifie ta réponse',
      answer: '**No.** He tested the whole population. Now he has no matches. Test a small sample, like **3**.',
      answerFr: '**Non.** Il a testé toute la population. Maintenant, il n’a plus d’allumettes. Teste un petit échantillon, par exemple **3**.',
    },
  },

  // 20. Word problem: the basketball team
  {
    layout: 'callout',
    accent: GREEN,
    icon: 'PenLine',
    eyebrow: 'Word problem',
    eyebrowFr: 'Problème',
    title: 'Mr Bowen’s Basketball Team',
    titleFr: 'L’équipe de basket de M. Bowen',
    content:
      'Mr Bowen wants to know the mean height of Year 7 students. He measures the school basketball team: **172 cm**.\n\n' +
      'Is this a good way to choose a sample?',
    contentFr:
      'M. Bowen veut connaître la taille moyenne des élèves de Year 7. Il mesure l’équipe de basket de l’école : **172 cm**.\n\n' +
      'Est-ce une bonne façon de choisir un échantillon ?',
    reveal: {
      label: 'Check your answer',
      labelFr: 'Vérifie ta réponse',
      answer: '**No:** not fair. Basketball players are **taller** than most students, and the team is not all Year 7.',
      answerFr: '**Non :** pas équitable. Les joueurs de basket sont **plus grands** que la plupart des élèves, et l’équipe n’est pas que des Year 7.',
    },
  },

  // 21. Word problem: the whole pot
  {
    layout: 'callout',
    accent: GREEN,
    icon: 'PenLine',
    eyebrow: 'Word problem',
    eyebrowFr: 'Problème',
    title: 'Mr Bowen Checks the Phở',
    titleFr: 'M. Bowen vérifie le phở',
    content:
      'Mr Bowen stirs the phở and tastes one spoon. It is perfect. To be sure, he eats the whole pot.\n\n' +
      'What is his sample size now?',
    contentFr:
      'M. Bowen remue le phở et goûte une cuillère. C’est parfait. Pour être sûr, il mange toute la marmite.\n\n' +
      'Quelle est maintenant la taille de son échantillon ?',
    reveal: {
      label: 'Check your answer',
      labelFr: 'Vérifie ta réponse',
      answer: 'It is not a sample now: he ate the whole **population**. One spoon from a stirred pot was enough.',
      answerFr: 'Ce n’est plus un échantillon : il a mangé toute la **population**. Une cuillère d’une marmite remuée suffisait.',
    },
  },

  // ── CLOSE ─────────────────────────────────────────────────────────────────
  // 22. Checklist: slide 2's goals, with the key words
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
      { text: 'Name the **population**, the **sample** and the **sample size**.', textFr: 'Nommer la **population**, l’**échantillon** et sa **taille**.' },
      { text: 'Choose a **fair** sample, at **random**.', textFr: 'Choisir un échantillon **équitable**, **au hasard**.' },
      { text: 'Explain why a **large** sample is better than a small one.', textFr: 'Expliquer pourquoi un **grand** échantillon vaut mieux qu’un petit.' },
      { text: 'Answer: “**Is this a good way to choose a sample?**”', textFr: 'Répondre : « **Is this a good way to choose a sample?** »' },
    ],
  },

  // 23. Exit
  {
    layout: 'hero',
    color: PURPLE,
    icon: 'Target',
    brand: 'Year 7 Mathematics',
    brandFr: 'Maths 7e année',
    eyebrow: 'Exit question',
    eyebrowFr: 'Question de sortie',
    title: 'Who Will You Ask?',
    titleFr: 'Qui vas-tu interroger ?',
    subtitle: '**600** students. Plan a **sample** to ask about the library: how many, and how?',
    subtitleFr: '**600** élèves. Ton **échantillon** pour la bibliothèque : combien, et comment ?',
    reveal: {
      label: 'Answer',
      labelFr: 'Réponse',
      answer: '**60** names from a hat, from every year. Not 5, not your friends.',
      answerFr: '**60** noms tirés au hasard, dans chaque niveau. Pas 5, pas tes amis.',
    },
  },
]
