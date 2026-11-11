// content/y7-science/U04_2/slides.js
// Year 7 Science · 4.2 Viruses. One 50-minute period, after 4.1
// (Characteristics of living organisms): the seven characteristics are the
// tool for this lesson's question, is a virus alive?
// Source: Learner's Book pages 130–133.
//
// ENGLISH AND FRENCH ONLY, like every Year 7 deck from Unit 4 / 15 October:
// every string has an …Fr twin and no …Vn twin. The diagrams stay in English.
//
// THE ARC (the shape of Coffee, Carbon and Stars, 3.4 Tides and 4.1; plan.js
// has the timings). Three short commands, one for each part:
//   Look inside  is a virus alive? (the starter, answered at the end). The
//                other six of the seven (Getting started). Zoom into Mr
//                Bowen's nose: cells at ×1000, flu viruses at ×100 000, and
//                only an electron microscope sees them. Made of cells? (vote)
//                No: a cell beside a real flu virus. Draw it: protein coat,
//                pegs, RNA.
//   Follow it    who makes the new viruses? (vote: A, the cell) Act it out: the class are
//                the cells, copying the virus's instructions until they die.
//                The flu virus a press at a time: stick, get in, open, copy,
//                burst out. Replication, and real viruses leaving a cell.
//                SARS-CoV-2: the spikes are the pegs; the virus and the
//                illness have different names. Mr Bowen's next pet is a virus
//                in a jar; he adds a plant.
//   Decide       Activity 4.2.1 in threes. The virus against the seven, a row a
//                press. The reasons on both sides. Back to the starter.
//
// The goals slide (2) and the checklist (19) say the same three things, so
// the lesson ends where it said it would; the starter's question comes back
// on 18 and the exit question (20) asks for four of the model's steps in order.
//
// COPY-DOWN: 5 written panels — electron microscope (5), virus (7),
// replication (12), not alive / alive (17, one panel each side) — and 1
// drawing, the virus (8). Each panel is the definition only; a fact that goes
// with it sits underneath, to read.
//
// WRITING RULE (the 2.5 density): one hook line, short sentences, and the body
// never repeats the write note, a label or the caption.

import { DIAGRAMS } from './diagrams.js'
import { NoseZoom } from './zoom.jsx'
import { FluFollow } from './flu.jsx'
import { PetVirus } from './story.jsx'
import { VirusSeven } from './check.jsx'

const TEAL = '#0087a8'
const PURPLE = '#5c2483'
const ORANGE = '#c25e12'
const GREEN = '#4a8b23'
const BLUE = '#1a5fa8'
const RED = '#d83a2e'

export const slides = [
  // ════════════════════════════════════════════════════════════════════════
  // LOOK INSIDE — how small a virus is, and what it is made of
  // ════════════════════════════════════════════════════════════════════════

  // 1. Hero + starter: the lesson's question, answered on slide 18
  {
    layout: 'hero',
    color: GREEN,
    icon: 'Bug',
    brand: 'Year 7 Science',
    brandFr: 'Sciences 7e année',
    eyebrow: '4.2 · Grouping and identifying organisms',
    eyebrowFr: '4.2 · Classer et identifier le vivant',
    title: 'Viruses',
    titleFr: 'Les virus',
    card: {
      icon: 'HelpCircle',
      badge: 'Starter',
      badgeFr: 'Pour commencer',
      text: 'Flu comes from a **virus**. Is a virus **alive**? Write **yes** or **no**, and **one reason**.',
      textFr: 'La grippe vient d’un **virus**. Un virus est-il **vivant** ? Écris **oui** ou **non**, et **une raison**.',
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
    text: 'What is a **virus**, and is it **alive**?',
    textFr: 'Qu’est-ce qu’un **virus**, et est-il **vivant** ?',
    columns: [
      {
        heading: 'Look inside',
        headingFr: 'Regarder dedans',
        accent: GREEN,
        icon: 'Search',
        inlineSvg: DIAGRAMS.PIC_LOOK,
        caption: 'See what a virus is made of.',
        captionFr: 'Voir de quoi est fait un virus.',
      },
      {
        heading: 'Follow it',
        headingFr: 'Le suivre',
        accent: ORANGE,
        icon: 'Repeat',
        inlineSvg: DIAGRAMS.PIC_FOLLOW,
        caption: 'Follow a virus into a cell.',
        captionFr: 'Suivre un virus dans une cellule.',
      },
      {
        heading: 'Decide',
        headingFr: 'Décider',
        accent: PURPLE,
        icon: 'Scale',
        inlineSvg: DIAGRAMS.PIC_DECIDE,
        caption: 'Decide if a virus is alive.',
        captionFr: 'Décider si un virus est vivant.',
      },
    ],
  },

  // 3. Getting started (page 130): pairs list the other six of 4.1's seven
  {
    layout: 'split',
    accent: PURPLE,
    icon: 'ListOrdered',
    eyebrow: 'Getting started · pairs',
    eyebrowFr: 'Pour démarrer · en binôme',
    title: 'The Other Six',
    titleFr: 'Les six autres',
    ratio: 45,
    inlineSvg: DIAGRAMS.SEVEN_ICONS,
    content: '**Respiration** is one of the seven. Write the other **six**. Say what each one means.',
    contentFr: 'La **respiration** est l’une des sept. Écris les **six** autres. Dis ce que chacune veut dire.',
    reveal: {
      label: 'Answer',
      labelFr: 'Réponse',
      answer: '**Movement**, **sensitivity**, **growth**, **reproduction**, **excretion**, **nutrition**. Mrs Gren!',
      answerFr: '**Movement** (mouvement), **sensitivity** (sensibilité), **growth** (croissance), **reproduction**, **excretion** (excrétion), **nutrition**. Mrs Gren !',
    },
  },

  // 4. The stepper: zoom into Mr Bowen's nose (page 131: very, very small)
  {
    layout: 'showcase',
    accent: BLUE,
    icon: 'ScanEye',
    eyebrow: 'Say it first',
    eyebrowFr: 'Dis-le d’abord',
    title: 'Inside Mr Bowen’s Nose',
    titleFr: 'Dans le nez de M. Bowen',
    widget: NoseZoom,
    caption: 'How small is a **virus**?',
    captionFr: 'Quelle est la taille d’un **virus** ?',
  },

  // 5. Electron microscope (write), beside the real thing (page 131)
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Microscope',
    eyebrow: 'Key word · page 131',
    eyebrowFr: 'Mot clé · page 131',
    title: 'Electron Microscope',
    titleFr: 'Le microscope électronique',
    ratio: 45,
    inlineSvg: DIAGRAMS.EM_PHOTOS,
    notes: [
      {
        tone: 'write',
        text: '**Electron microscope:** a special microscope that can see things as small as a virus.',
        textFr: '**Microscope électronique (electron microscope) :** un microscope spécial qui peut voir des choses aussi petites qu’un virus.',
      },
      {
        tone: 'info',
        badge: false,
        text: '**10 000** flu viruses in a line: about **1 mm** long.',
        textFr: '**10 000** virus de la grippe en ligne : environ **1 mm** de long.',
      },
    ],
  },

  // 6. Vote: is a virus made of cells?
  {
    layout: 'compare',
    accent: PURPLE,
    icon: 'Hand',
    eyebrow: 'Vote with one hand',
    eyebrowFr: 'Vote avec une main',
    title: 'Made of Cells?',
    titleFr: 'Fait de cellules ?',
    text: 'You are made of **cells**. Is a **virus** made of cells?',
    textFr: 'Tu es fait de **cellules**. Un **virus** est-il fait de cellules ?',
    columns: [
      { heading: 'A · left hand up', headingFr: 'A · main gauche levée', accent: BLUE, icon: 'Hand', inlineSvg: DIAGRAMS.ANS_CELLS },
      { heading: 'B · right hand up', headingFr: 'B · main droite levée', accent: ORANGE, icon: 'Hand', inlineSvg: DIAGRAMS.ANS_NO_CELLS },
    ],
  },

  // 7. Answer B: virus (write) — a cell, named, beside a real flu virus
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Bug',
    eyebrow: 'Answer: B · key word',
    eyebrowFr: 'Réponse : B · mot clé',
    title: 'What Is a Virus?',
    titleFr: 'Qu’est-ce qu’un virus ?',
    ratio: 45,
    inlineSvg: DIAGRAMS.REAL_FLU,
    content: 'Look at the cell, then the virus. What is **missing**?',
    contentFr: 'Regarde la cellule, puis le virus. Qu’est-ce qui **manque** ?',
    notes: [
      {
        tone: 'write',
        text: '**Virus:** a very small particle, much smaller than a cell. It is **not** made of cells.',
        textFr: '**Virus :** une très petite particule, bien plus petite qu’une cellule. Il n’est **pas** fait de cellules.',
      },
    ],
    reveal: {
      label: 'Answer',
      labelFr: 'Réponse',
      answer: 'No **membrane**, no **cytoplasm**, no **nucleus**. Just a **coat**, with **instructions** inside.',
      answerFr: 'Pas de **membrane**, pas de **cytoplasme**, pas de **noyau**. Juste une **enveloppe**, avec des **instructions** dedans.',
    },
  },

  // 8. Draw this (page 131): protein coat, pegs, RNA
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'Pencil',
    eyebrow: 'Draw this · page 131',
    eyebrowFr: 'À dessiner · page 131',
    title: 'Inside a Virus',
    titleFr: 'L’intérieur d’un virus',
    ratio: 45,
    inlineSvg: DIAGRAMS.DRAW_VIRUS,
    drawThis: true,
    content: 'Copy the drawing and its **three** labels.',
    contentFr: 'Recopie le dessin et ses **trois** légendes.',
    notes: [
      {
        tone: 'info',
        badge: false,
        text: '**Protein** is in your hair and your nails too.',
        textFr: 'Il y a aussi des **protéines** (protein) dans tes cheveux et tes ongles.',
      },
    ],
  },

  // ════════════════════════════════════════════════════════════════════════
  // FOLLOW IT — how a virus makes copies of itself
  // ════════════════════════════════════════════════════════════════════════

  // 9. Vote: who makes the new viruses?
  {
    layout: 'compare',
    accent: PURPLE,
    icon: 'Hand',
    eyebrow: 'Vote with one hand',
    eyebrowFr: 'Vote avec une main',
    title: 'Who Makes the New Viruses?',
    titleFr: 'Qui fabrique les nouveaux virus ?',
    text: 'One virus gets into your body. Soon there are **millions**. Who makes them?',
    textFr: 'Un virus entre dans ton corps. Bientôt, il y en a des **millions**. Qui les fabrique ?',
    columns: [
      { heading: 'A · left hand up', headingFr: 'A · main gauche levée', accent: BLUE, icon: 'Hand', inlineSvg: DIAGRAMS.ANS_CELL },
      { heading: 'B · right hand up', headingFr: 'B · main droite levée', accent: ORANGE, icon: 'Hand', inlineSvg: DIAGRAMS.ANS_VIRUS },
    ],
  },

  // 10. Act it out: the class are the cells
  {
    layout: 'split',
    accent: PURPLE,
    icon: 'Users',
    eyebrow: 'Act it out · everyone',
    eyebrowFr: 'Joue la scène · tout le monde',
    title: 'Be the Cell',
    titleFr: 'Sois la cellule',
    ratio: 45,
    inlineSvg: DIAGRAMS.BE_THE_CELL,
    notes: [
      {
        tone: 'task',
        badge: 'The rules',
        badgeFr: 'Les règles',
        text: '1 · Mr Bowen is the **virus**. He gives a desk his **instructions**.\n2 · That desk is a **cell**: copy his virus drawing, fast. **20 seconds**.\n3 · Your cell **dies**: heads down. Pass your copies on.',
        textFr: '1 · M. Bowen est le **virus**. Il donne ses **instructions** à une table.\n2 · Cette table est une **cellule** : copie son dessin de virus, vite. **20 secondes**.\n3 · Ta cellule **meurt** : tête baissée. Fais passer tes copies.',
      },
    ],
    reveal: {
      prompt: 'Who made all the copies?',
      promptFr: 'Qui a fait toutes les copies ?',
      label: 'Answer',
      labelFr: 'Réponse',
      answer: '**The cells: you!** The virus only brought its **instructions**. The vote’s answer is **A**.',
      answerFr: '**Les cellules : toi !** Le virus a seulement apporté ses **instructions**. La réponse du vote est **A**.',
    },
  },

  // 11. The model: the flu virus a step a press (page 132)
  {
    layout: 'showcase',
    accent: BLUE,
    icon: 'Repeat',
    eyebrow: 'A model · page 132',
    eyebrowFr: 'Un modèle · page 132',
    title: 'Follow the Flu Virus',
    titleFr: 'Suis le virus de la grippe',
    widget: FluFollow,
    caption: '**Flu** is short for **influenza**.',
    captionFr: '**Flu**, c’est **influenza** en plus court : la grippe.',
  },

  // 12. Replication (write), and real viruses leaving a cell
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Repeat',
    eyebrow: 'Key word',
    eyebrowFr: 'Mot clé',
    title: 'Replication',
    titleFr: 'La réplication',
    ratio: 45,
    inlineSvg: DIAGRAMS.REPLICATION,
    content: 'To **replicate** means to make copies.',
    contentFr: '**Replicate** (se répliquer), c’est faire des copies.',
    notes: [
      {
        tone: 'write',
        text: '**Replication:** a virus gets into a living cell and makes it build copies of the virus.',
        textFr: '**Réplication (replication) :** un virus entre dans une cellule vivante et lui fait fabriquer des copies du virus.',
      },
      {
        tone: 'info',
        badge: false,
        text: 'Your cells die, so you feel **ill**.',
        textFr: 'Tes cellules meurent, alors tu te sens **malade**.',
      },
    ],
  },

  // 13. SARS-CoV-2 (page 133): the spikes are the pegs; virus and illness
  {
    layout: 'split',
    accent: BLUE,
    icon: 'Globe',
    eyebrow: 'Page 133',
    eyebrowFr: 'Page 133',
    title: 'A Virus You Know',
    titleFr: 'Un virus que tu connais',
    ratio: 45,
    inlineSvg: DIAGRAMS.COVID,
    content: '**SARS-CoV-2** is the **virus**. **Covid-19** is the **illness** it causes.',
    contentFr: '**SARS-CoV-2**, c’est le **virus**. Le **Covid-19**, c’est la **maladie** qu’il provoque.',
    notes: [
      {
        tone: 'info',
        badge: false,
        text: '**CO**rona**VI**rus **D**isease 20**19**. Corona means **crown**.',
        textFr: '**CO**rona**VI**rus **D**isease 20**19** : la maladie à coronavirus de 2019. Corona veut dire **couronne**.',
      },
    ],
    reveal: {
      prompt: 'What do the red spikes do? Which part of your drawing are they?',
      promptFr: 'À quoi servent les pointes rouges ? Quelle partie de ton dessin sont-elles ?',
      label: 'Answer',
      labelFr: 'Réponse',
      answer: 'They are the **pegs**. They **stick** to your cells and help the virus **get inside**.',
      answerFr: 'Ce sont les **picots** (pegs). Ils se **collent** à tes cellules et aident le virus à **entrer**.',
    },
  },

  // 14. What happens next? Mr Bowen's next pet, after 4.1's rock (deadpan)
  {
    layout: 'showcase',
    accent: BLUE,
    icon: 'MessageSquare',
    eyebrow: 'What happens next?',
    eyebrowFr: 'Que se passe-t-il ensuite ?',
    title: 'Mr Bowen’s Next Pet',
    titleFr: 'Le prochain animal de M. Bowen',
    widget: PetVirus,
    caption: 'Before each step, **predict**: what happens next?',
    captionFr: 'Avant chaque étape, **prédis** : que se passe-t-il ensuite ?',
  },

  // ════════════════════════════════════════════════════════════════════════
  // DECIDE — is a virus alive?
  // ════════════════════════════════════════════════════════════════════════

  // 15. Activity 4.2.1 (page 133): groups of three
  {
    layout: 'split',
    accent: PURPLE,
    icon: 'Users',
    eyebrow: 'Activity 4.2.1 · groups of three',
    eyebrowFr: 'Activité 4.2.1 · par trois',
    title: 'Are Viruses Alive?',
    titleFr: 'Les virus sont-ils vivants ?',
    ratio: 45,
    inlineSvg: DIAGRAMS.ACTIVITY,
    content: 'Some scientists say **yes**. Others say **no**.',
    contentFr: 'Certains scientifiques disent **oui**. D’autres disent **non**.',
    notes: [
      {
        tone: 'task',
        badge: false,
        text: 'List your **reasons**. Start: “I think a virus **is / is not** alive **because** …”',
        textFr: 'Listez vos **raisons**. En anglais : “I think a virus **is / is not** alive **because** …”',
      },
    ],
  },

  // 16. The virus checked against the seven, a row a press
  {
    layout: 'showcase',
    accent: TEAL,
    icon: 'ListChecks',
    eyebrow: 'Check it',
    eyebrowFr: 'Vérifie',
    title: 'The Virus and the Seven',
    titleFr: 'Le virus et les sept',
    widget: VirusSeven,
    caption: 'Which of the seven does a virus do **on its own**?',
    captionFr: 'Lesquelles des sept un virus fait-il **tout seul** ?',
  },

  // 17. Put it together: the reasons on both sides (write)
  {
    layout: 'compare',
    accent: ORANGE,
    icon: 'Scale',
    eyebrow: 'Put it together',
    eyebrowFr: 'En résumé',
    title: 'Alive or Not Alive?',
    titleFr: 'Vivant ou pas vivant ?',
    text: 'Scientists **disagree**. Copy both sides.',
    textFr: 'Les scientifiques ne sont **pas d’accord**. Recopie les deux côtés.',
    columns: [
      {
        heading: 'Not alive',
        headingFr: 'Pas vivant',
        accent: RED,
        icon: 'X',
        notes: [
          {
            tone: 'write',
            text: 'A virus is **not made of cells**. On its own, it does **none** of the seven.',
            textFr: 'Un virus n’est **pas fait de cellules**. Tout seul, il ne fait **aucune** des sept.',
          },
        ],
      },
      {
        heading: 'Alive',
        headingFr: 'Vivant',
        accent: GREEN,
        icon: 'Sprout',
        notes: [
          {
            tone: 'write',
            text: 'A virus has **instructions** (RNA) for making more viruses. Inside a cell, it **replicates**.',
            textFr: 'Un virus a des **instructions** (ARN) pour faire d’autres virus. Dans une cellule, il se **réplique**.',
          },
        ],
      },
    ],
  },

  // 18. Back to the starter
  {
    layout: 'statement',
    accent: PURPLE,
    eyebrow: 'Back to the starter',
    eyebrowFr: 'Retour au début',
    title: 'Your Answer',
    titleFr: 'Ta réponse',
    text: 'Look at your answer from the start. Do you **still agree** with it?',
    textFr: 'Regarde ta réponse du début. Es-tu **toujours d’accord** ?',
    reveal: {
      label: 'A good answer',
      labelFr: 'Une bonne réponse',
      answer: '**Yes** and **no** can both be right. A good answer picks a side and gives a **reason**.',
      answerFr: '**Oui** et **non** peuvent être justes. Une bonne réponse choisit un côté et donne une **raison**.',
    },
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
      { text: 'Say what a **virus** is, and what an **electron microscope** is for.', textFr: 'Dire ce qu’est un **virus**, et à quoi sert un **microscope électronique**.' },
      { text: 'Draw a virus: its **protein** coat, pegs and **RNA**.', textFr: 'Dessiner un virus : son enveloppe de **protéines**, ses picots et son **ARN**.' },
      { text: 'Explain **replication**, step by step.', textFr: 'Expliquer la **réplication**, étape par étape.' },
      { text: 'Give a **reason** a virus is alive, and one it is not.', textFr: 'Donner une **raison** pour dire qu’un virus est vivant, et une pour dire qu’il ne l’est pas.' },
    ],
  },

  // 20. Exit: the four steps in order
  {
    layout: 'hero',
    color: GREEN,
    icon: 'Target',
    brand: 'Year 7 Science',
    brandFr: 'Sciences 7e année',
    eyebrow: 'Exit question',
    eyebrowFr: 'Question de sortie',
    title: 'Flu in Your Nose',
    titleFr: 'La grippe dans ton nez',
    subtitle: 'Put these in order: **A** the cell dies **B** the pegs stick **C** the cell copies the RNA **D** the virus gets in',
    subtitleFr: 'Remets dans l’ordre : **A** la cellule meurt **B** les picots se collent **C** la cellule copie l’ARN **D** le virus entre',
    reveal: {
      label: 'Answer',
      labelFr: 'Réponse',
      answer: '**B, D, C, A**: stick, get in, copy, burst out.',
      answerFr: '**B, D, C, A** : se coller, entrer, copier, éclater.',
    },
  },
]
