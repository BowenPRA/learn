// content/y7-science/U04_3/slides.js
// Year 7 Science · 4.3 What is a species? One 50-minute period, after 4.2
// (Viruses). Source: Learner's Book pages 134–137.
//
// ENGLISH AND FRENCH ONLY, like every Year 7 deck from 15 October: every
// string has an …Fr twin and no …Vn twin. The diagrams stay in English.
//
// THE ARC (the shape of Coffee, Carbon and Stars and 3.4 Tides; plan.js has
// the timings). Three short commands, one for each part:
//   Compare  three small birds, three colours: the same kind? (the starter,
//            in words only, answered on slide 6 with page 134). Activity 4.3.1: two elephants, what is the
//            same, then one difference a press. Species: one kind of living
//            organism. The English: identical or similar? Back to the birds:
//            one species. Variation, and your partner's hand.
//   Test     how can scientists be sure? (vote: B, see if they can have
//            babies) Offspring and fertile. Mr Bowen's new pets: a horse, a
//            donkey, a mule, a second mule, ten years, no baby mules.
//            Infertile. The book's liger (page 136): one species or two?
//            (vote: B) The better definition: fertile offspring.
//   Use it   the species test, two questions and a thumb for each; Same
//            Species or Different?, the whole class standing; two specimens
//            (Think like a scientist, page 137); the test drawn twice.
//
// The goals slide (2) and the checklist (19) say the same three things, so
// the lesson ends where it said it would; the exit question (20) is the
// liger's argument again, with a zebra and a donkey.
//
// COPY-DOWN: 5 written panels — species (4), variation (7), offspring and
// fertile (9), infertile (11), species again (14) — and 1 drawing (18). Each
// panel is the definition only; a fact that goes with it sits underneath, to
// read.
//
// WRITING RULE (the 2.5 density): one hook line, short sentences, and the body
// never repeats the write note, a label or the caption.

import { DIAGRAMS } from './diagrams.js'
import { TwoElephants } from './elephants.jsx'
import { MuleStory } from './story.jsx'
import { SpeciesTest } from './test.jsx'
import { SameOrDifferent } from './game.jsx'

const TEAL = '#0087a8'
const PURPLE = '#5c2483'
const ORANGE = '#c25e12'
const GREEN = '#4a8b23'
const BLUE = '#1a5fa8'

export const slides = [
  // ════════════════════════════════════════════════════════════════════════
  // COMPARE — the same and different; species; variation
  // ════════════════════════════════════════════════════════════════════════

  // 1. Hero + starter (Getting started, page 134), answered on slide 6
  {
    layout: 'hero',
    color: GREEN,
    icon: 'Dna',
    brand: 'Year 7 Science',
    brandFr: 'Sciences 7e année',
    eyebrow: '4.3 · Grouping and identifying organisms',
    eyebrowFr: '4.3 · Classer et identifier le vivant',
    title: 'What Is a Species?',
    titleFr: 'Qu’est-ce qu’une espèce ?',
    card: {
      icon: 'HelpCircle',
      badge: 'Starter',
      badgeFr: 'Pour commencer',
      text: 'Three small birds: one **yellow**, one **green**, one **blue**. Same size, same shape. Are they the **same kind** of bird? Write **yes** or **no**, and **one reason**.',
      textFr: 'Trois petits oiseaux : un **jaune**, un **vert**, un **bleu**. Même taille, même forme. Est-ce la **même sorte** d’oiseau ? Écris **oui** ou **non**, et **une raison**.',
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
    text: 'How do scientists put living things into **groups**?',
    textFr: 'Comment les scientifiques classent-ils les êtres vivants en **groupes** ?',
    columns: [
      {
        heading: 'Compare',
        headingFr: 'Comparer',
        accent: GREEN,
        icon: 'Search',
        inlineSvg: DIAGRAMS.PIC_COMPARE,
        caption: 'Find what is the same and different.',
        captionFr: 'Trouver ce qui est pareil ou différent.',
      },
      {
        heading: 'Name',
        headingFr: 'Nommer',
        accent: ORANGE,
        icon: 'Languages',
        inlineSvg: DIAGRAMS.PIC_NAME,
        caption: 'Learn what scientists call one kind.',
        captionFr: 'Apprendre le nom d’une « sorte ».',
      },
      {
        heading: 'Test',
        headingFr: 'Tester',
        accent: PURPLE,
        icon: 'Scale',
        inlineSvg: DIAGRAMS.PIC_TEST,
        caption: 'Test if two animals are one kind.',
        captionFr: 'Tester : la même sorte, ou non ?',
      },
    ],
  },

  // 3. The stepper: Activity 4.3.1 (page 135), one difference a press
  {
    layout: 'showcase',
    accent: GREEN,
    icon: 'Search',
    eyebrow: 'Activity 4.3.1 · say it first',
    eyebrowFr: 'Activité 4.3.1 · dis-le d’abord',
    title: 'Two Elephants',
    titleFr: 'Deux éléphants',
    widget: TwoElephants,
    caption: 'Say it **before** each press.',
    captionFr: 'Dis-le **avant** chaque clic.',
  },

  // 4. Species (write), beside an Indian elephant in Vietnam
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Dna',
    eyebrow: 'Key word',
    eyebrowFr: 'Mot clé',
    title: 'Species',
    titleFr: 'Une espèce',
    ratio: 45,
    inlineSvg: DIAGRAMS.SPECIES_VN,
    content: 'The Indian elephant and the African elephant are **two** species.',
    contentFr: 'L’éléphant d’Inde et l’éléphant d’Afrique sont **deux** espèces.',
    notes: [
      {
        tone: 'write',
        text: '**Species:** one kind of living organism.',
        textFr: '**Espèce (species) :** une sorte d’organisme vivant.',
      },
      {
        tone: 'info',
        badge: false,
        text: 'English: **one species**, **two species**. The **s** always stays.',
        textFr: 'En anglais : **one species**, **two species**. Le **s** reste toujours.',
      },
    ],
  },

  // 5. English check: identical is not similar (key word: identical)
  {
    layout: 'compare',
    accent: PURPLE,
    icon: 'Languages',
    eyebrow: 'English check',
    eyebrowFr: 'Point d’anglais',
    title: 'Identical or Similar?',
    titleFr: 'Identical ou similar ?',
    text: 'Two Indian elephants: are they **identical**, or only **similar**?',
    textFr: 'Deux éléphants d’Inde : sont-ils **identical**, ou seulement **similar** ?',
    columns: [
      {
        heading: 'identical',
        headingFr: 'identical · identiques',
        accent: BLUE,
        icon: 'Equal',
        inlineSvg: DIAGRAMS.PIC_IDENTICAL,
        caption: '**Exactly** the same.',
        captionFr: '**Exactement** pareils.',
      },
      {
        heading: 'similar',
        headingFr: 'similar · semblables',
        accent: ORANGE,
        icon: 'Scale',
        inlineSvg: DIAGRAMS.PIC_SIMILAR,
        caption: '**Nearly** the same, but not exactly.',
        captionFr: '**Presque** pareils, mais pas exactement.',
      },
    ],
  },

  // 6. Back to the starter: the three birds are one species
  {
    layout: 'statement',
    accent: PURPLE,
    eyebrow: 'Back to the starter',
    eyebrowFr: 'Retour au début',
    title: 'Three Birds',
    titleFr: 'Trois oiseaux',
    text: 'A yellow bird, a green bird and a blue bird: same size, same shape. How many **species**?',
    textFr: 'Un oiseau jaune, un vert, un bleu : même taille, même forme. Combien d’**espèces** ?',
    reveal: {
      label: 'Answer',
      labelFr: 'Réponse',
      answer: '**One.** They are all **budgerigars**, the birds on page 134.',
      answerFr: '**Une seule.** Ce sont des **perruches ondulées** (budgerigars) : page 134.',
    },
  },

  // 7. Variation (write), beside real budgerigars; a pair test at the desk
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Users',
    eyebrow: 'Key word',
    eyebrowFr: 'Mot clé',
    title: 'Variation',
    titleFr: 'La variation',
    ratio: 45,
    inlineSvg: DIAGRAMS.BUDGIES,
    notes: [
      {
        tone: 'write',
        text: '**Variation:** the differences between organisms of one species.\n**Identical:** exactly the same.',
        textFr: '**Variation :** les différences entre les organismes d’une même espèce.\n**Identique (identical) :** exactement pareil.',
      },
      {
        tone: 'task',
        badge: 'Try it',
        badgeFr: 'Essaie',
        text: 'Look at your partner’s **hand**, then yours. Find **2 differences**: similar, not identical.',
        textFr: 'Regarde la **main** de ton voisin, puis la tienne. Trouve **2 différences** : semblables, pas identiques.',
      },
    ],
  },

  // ════════════════════════════════════════════════════════════════════════
  // TEST — how scientists decide: fertile offspring
  // ════════════════════════════════════════════════════════════════════════

  // 8. Vote: how can scientists be sure? (Getting started's question)
  {
    layout: 'compare',
    accent: PURPLE,
    icon: 'Hand',
    eyebrow: 'Vote with one hand',
    eyebrowFr: 'Vote avec une main',
    title: 'How Can They Be Sure?',
    titleFr: 'Comment être sûr ?',
    text: 'Two animals look **similar**. How can scientists be **sure** they are one species?',
    textFr: 'Deux animaux se **ressemblent**. Comment être **sûr** que c’est une seule espèce ?',
    columns: [
      { heading: 'A · left hand up', headingFr: 'A · main gauche levée', accent: BLUE, icon: 'Hand', inlineSvg: DIAGRAMS.ANS_LOOK },
      { heading: 'B · right hand up', headingFr: 'B · main droite levée', accent: ORANGE, icon: 'Hand', inlineSvg: DIAGRAMS.ANS_OFFSPRING },
    ],
  },

  // 9. Answer B: offspring and fertile (write), beside a parent and its calf
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Sprout',
    eyebrow: 'Answer: B · key words',
    eyebrowFr: 'Réponse : B · mots clés',
    title: 'Offspring and Fertile',
    titleFr: 'Descendants et fertile',
    ratio: 45,
    inlineSvg: DIAGRAMS.OFFSPRING,
    content: 'Indian elephants **reproduce** only with other Indian elephants.',
    contentFr: 'Les éléphants d’Inde se **reproduisent** seulement entre eux.',
    notes: [
      {
        tone: 'write',
        text: '**Offspring:** the young (children) of an organism.\n**Fertile:** able to have offspring.',
        textFr: '**Descendants (offspring) :** les petits (enfants) d’un organisme.\n**Fertile :** capable d’avoir des descendants.',
      },
      {
        tone: 'info',
        badge: false,
        text: 'This calf will grow up and have calves too: it is **fertile**.',
        textFr: 'Cet éléphanteau grandira et aura des petits à son tour : il est **fertile**.',
      },
    ],
  },

  // 10. What happens next? Mr Bowen's new pets (deadpan)
  {
    layout: 'showcase',
    accent: BLUE,
    icon: 'MessageSquare',
    eyebrow: 'What happens next?',
    eyebrowFr: 'Que se passe-t-il ensuite ?',
    title: 'Mr Bowen’s New Pets',
    titleFr: 'Les nouveaux animaux de M. Bowen',
    widget: MuleStory,
    caption: 'Before each step, **predict**: what happens next?',
    captionFr: 'Avant chaque étape, **prédis** : que se passe-t-il ensuite ?',
  },

  // 11. Infertile (write), beside a real horse, donkey and mule
  {
    layout: 'split',
    accent: TEAL,
    icon: 'CircleSlash',
    eyebrow: 'Key word',
    eyebrowFr: 'Mot clé',
    title: 'Infertile',
    titleFr: 'Infertile',
    ratio: 45,
    inlineSvg: DIAGRAMS.MULE_PHOTOS,
    content: 'A mule is strong and healthy. But two mules never have a baby.',
    contentFr: 'Un mulet est fort et en bonne santé. Mais deux mulets n’ont jamais de petit.',
    notes: [
      {
        tone: 'write',
        text: '**Infertile:** not able to have offspring.',
        textFr: '**Infertile :** incapable d’avoir des descendants.',
      },
    ],
  },

  // 12. The book's three photos (page 136), as real photographs
  {
    layout: 'showcase',
    accent: BLUE,
    icon: 'ScanEye',
    eyebrow: 'Page 136 · in a zoo',
    eyebrowFr: 'Page 136 · dans un zoo',
    title: 'A Liger',
    titleFr: 'Un ligre',
    inlineSvg: DIAGRAMS.LIGER,
    caption: 'In a zoo, a lion and a tiger sometimes have offspring: a **liger**.',
    captionFr: 'Dans un zoo, un lion et une tigresse ont parfois un petit : un **ligre**.',
  },

  // 13. Vote: are lions and tigers one species? (the book's Question 2)
  {
    layout: 'compare',
    accent: PURPLE,
    icon: 'Hand',
    eyebrow: 'Vote with one hand',
    eyebrowFr: 'Vote avec une main',
    title: 'One Species or Two?',
    titleFr: 'Une espèce ou deux ?',
    text: 'A lion and a tiger **can** have offspring. Are they the **same species**?',
    textFr: 'Un lion et une tigresse **peuvent** avoir un petit. Sont-ils de la **même espèce** ?',
    columns: [
      { heading: 'A · left hand up', headingFr: 'A · main gauche levée', accent: BLUE, icon: 'Hand', inlineSvg: DIAGRAMS.ANS_SAME },
      { heading: 'B · right hand up', headingFr: 'B · main droite levée', accent: ORANGE, icon: 'Hand', inlineSvg: DIAGRAMS.ANS_DIFFERENT },
    ],
  },

  // 14. Answer B: the better definition (write)
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Dna',
    eyebrow: 'Answer: B · key word',
    eyebrowFr: 'Réponse : B · mot clé',
    title: 'A Better Definition',
    titleFr: 'Une meilleure définition',
    ratio: 45,
    inlineSvg: DIAGRAMS.NO_OFFSPRING,
    content: 'A liger is healthy. But it is **infertile**, like a mule.',
    contentFr: 'Un ligre est en bonne santé. Mais il est **infertile**, comme un mulet.',
    notes: [
      {
        tone: 'write',
        text: '**Species:** a group of organisms that can reproduce together to produce **fertile offspring**.',
        textFr: '**Espèce (species) :** un groupe d’organismes qui peuvent se reproduire ensemble et avoir des **descendants fertiles**.',
      },
    ],
  },

  // ════════════════════════════════════════════════════════════════════════
  // USE IT — the test on new organisms
  // ════════════════════════════════════════════════════════════════════════

  // 15. The model: two questions, one answer a press
  {
    layout: 'showcase',
    accent: TEAL,
    icon: 'ListChecks',
    eyebrow: 'A model · thumbs',
    eyebrowFr: 'Un modèle · avec le pouce',
    title: 'The Species Test',
    titleFr: 'Le test de l’espèce',
    widget: SpeciesTest,
    caption: 'Answer each question with your **thumb** before the press.',
    captionFr: 'Réponds à chaque question avec ton **pouce** avant le clic.',
  },

  // 16. Same species or different? The whole class, standing
  {
    layout: 'showcase',
    accent: GREEN,
    icon: 'Trophy',
    eyebrow: 'A game · everyone stands',
    eyebrowFr: 'Un jeu · tout le monde debout',
    title: 'Same Species or Different?',
    titleFr: 'Même espèce ou non ?',
    widget: SameOrDifferent,
    caption: 'The last ones standing win a **prize ticket**!',
    captionFr: 'Les derniers debout gagnent un **ticket** !',
  },

  // 17. Think like a scientist (page 137): two specimens
  {
    layout: 'split',
    accent: PURPLE,
    icon: 'Leaf',
    eyebrow: 'Think like a scientist · page 137',
    eyebrowFr: 'Pense en scientifique · page 137',
    title: 'Two Specimens',
    titleFr: 'Deux spécimens',
    ratio: 45,
    inlineSvg: DIAGRAMS.SPECIMENS,
    content: 'A **specimen** is one organism, or a part of one, to study.',
    contentFr: 'Un **spécimen** (specimen) est un organisme, ou une partie d’un organisme, à étudier.',
    notes: [
      {
        tone: 'task',
        badge: 'Pairs',
        badgeFr: 'À deux',
        text: 'Two leaves from two species. On a whiteboard: **3 similarities** and **2 differences**.',
        textFr: 'Deux feuilles de deux espèces. Sur une ardoise : **3 ressemblances** et **2 différences**.',
      },
    ],
    reveal: {
      prompt: 'How could a scientist be sure they are two species?',
      promptFr: 'Comment un scientifique peut-il être sûr que ce sont deux espèces ?',
      label: 'Answer',
      labelFr: 'Réponse',
      answer: 'See if the two plants can **reproduce** together and have **fertile offspring**.',
      answerFr: 'Voir si les deux plantes peuvent se **reproduire** ensemble et avoir des **descendants fertiles**.',
    },
  },

  // 18. Put it together: draw the test, twice
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'Pencil',
    eyebrow: 'Put it together · draw this',
    eyebrowFr: 'En résumé · à dessiner',
    title: 'The Test, Twice',
    titleFr: 'Le test, deux fois',
    ratio: 40,
    inlineSvg: DIAGRAMS.DRAW_SPECIES,
    drawThis: true,
    content: 'Copy both rows: the boxes, the **+**, the arrow and the words under.',
    contentFr: 'Recopie les deux lignes : les cases, le **+**, la flèche et les mots en dessous.',
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
    content: '> Check your notebook: **5 written panels** and **1 drawing**.',
    contentFr: '> Vérifie ton cahier : **5 encadrés recopiés** et **1 dessin**.',
    items: [
      { text: 'Compare two species: **similarities** and **differences**.', textFr: 'Comparer deux espèces : **ressemblances** et **différences**.' },
      { text: 'Say what a **species** is, and what **variation** means.', textFr: 'Dire ce qu’est une **espèce**, et ce que veut dire **variation**.' },
      { text: 'Explain the scientists’ test: **fertile offspring**.', textFr: 'Expliquer le test des scientifiques : des **descendants fertiles**.' },
      { text: 'Explain why lions and tigers are **two** species.', textFr: 'Expliquer pourquoi le lion et le tigre sont **deux** espèces.' },
    ],
  },

  // 20. Exit: the liger's argument, with a zebra and a donkey
  {
    layout: 'hero',
    color: GREEN,
    icon: 'Target',
    brand: 'Year 7 Science',
    brandFr: 'Sciences 7e année',
    eyebrow: 'Exit question',
    eyebrowFr: 'Question de sortie',
    title: 'A Zonkey',
    titleFr: 'Un zébrâne',
    subtitle: 'A zebra and a donkey can have offspring: a **zonkey**. A zonkey is **infertile**. Are zebras and donkeys the same species? **Explain.**',
    subtitleFr: 'Un zèbre et un âne peuvent avoir un petit : un **zébrâne**, **infertile**. Sont-ils de la même espèce ? **Explique.**',
    reveal: {
      label: 'Answer',
      labelFr: 'Réponse',
      answer: '**No: two different species.** Their offspring is not fertile.',
      answerFr: '**Non : deux espèces.** Leur descendant n’est pas fertile.',
    },
  },
]
