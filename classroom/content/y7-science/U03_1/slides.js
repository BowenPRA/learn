// content/y7-science/U03_1/slides.js
// Year 7 Science · 3.1 Gravity, weight and mass. Thursday 15 October 2026.
// Source: Learner's Book pages 75–84 (Unit 3 Forces and energy).
//
// ENGLISH AND FRENCH ONLY. From 15 October the Year 7 lessons drop Vietnamese
// (meta.vietnamese: false), so every string has an …Fr twin and no …Vn twin.
//
// TWO PERIODS, ONE DECK. Part 1 (slides 1–22) is taught on 15 October and ends
// on its own exit slide; Part 2 (23–45) opens with its own starter.
//
// ONE QUESTION HOLDS IT TOGETHER: DO HEAVY THINGS FALL FASTER?
//   The starter asks it (bowling ball or football) and the class votes. Pairs
//   test it at their desks (book and eraser, then paper), the BBC's vacuum
//   chamber and Apollo 15 settle it, and Galileo gets his story. Then the
//   book's 3.1 in its own order — gravity, weight, contact force, mass,
//   W = m × 10, other planets — and the deck comes back to the question at the
//   end: falling things ACCELERATE, and a heavy ball is pulled harder but is
//   harder to speed up, so the two land together. Last, the class plans next
//   week's lab: how do you time something that falls in half a second?
//
// LESS COPYING THAN BEFORE, ON PURPOSE: 8 short write panels and 2 small
// drawings across both periods. Everything else is something to DO — drop,
// listen, point, vote, hold an apple, catch a ruler, calculate on whiteboards.
//
// WRITING RULE (the 2.5 density): short sentences, one idea each, and the body
// text never repeats the write note, a label or the caption.

import { DIAGRAMS } from './diagrams.js'
import { VacuumClip, Apollo15Clip, MoonJumpClip, DropRace, PlanetScales, MassOrWeight } from './widgets.jsx'
import weightlifter from './images/weightlifter.jpg'
import scales from './images/scales.jpg'
import strobe from './images/strobe.jpg'

const TEAL = '#0087a8'
const PURPLE = '#5c2483'
const ORANGE = '#c25e12'
const GREEN = '#4a8b23'
const BLUE = '#1a5fa8'

export const slides = [
  // ════════════════════════════════════════════════════════════════════════
  // PART 1 — 15 October: falling, gravity, weight, contact force
  // ════════════════════════════════════════════════════════════════════════

  // 1. Hero + starter: the question the whole lesson answers
  {
    layout: 'hero',
    color: TEAL,
    icon: 'Globe',
    brand: 'Year 7 Science',
    brandFr: 'Sciences 7e année',
    date: '15 Oct 2026',
    eyebrow: '3.1 · Forces and energy',
    eyebrowFr: '3.1 · Forces et énergie',
    title: 'Gravity, Weight and Mass',
    titleFr: 'Gravité, poids et masse',
    card: {
      icon: 'Pencil',
      badge: 'Starter',
      badgeFr: 'Pour commencer',
      text: 'Mr Bowen drops a **bowling ball** and a **football** at the same time. Which one hits the ground **first**? Write: **I think … because …**',
      textFr: 'M. Bowen lâche une **boule de bowling** et un **ballon de foot** en même temps. Lequel touche le sol **en premier** ? Écris : **I think … because …**',
    },
  },

  // ── DO HEAVY THINGS FALL FASTER? ────────────────────────────────────────
  // 2. Vote: everyone at once, no answer on the slide
  {
    layout: 'compare',
    accent: PURPLE,
    icon: 'Hand',
    eyebrow: 'Vote with one hand',
    eyebrowFr: 'Vote avec une main',
    title: 'Which Lands First?',
    titleFr: 'Lequel arrive en premier ?',
    text: 'Which one hits the ground first?',
    textFr: 'Lequel touche le sol en premier ?',
    columns: [
      {
        heading: 'A · left hand up',
        headingFr: 'A · main gauche levée',
        accent: BLUE,
        icon: 'Hand',
        inlineSvg: DIAGRAMS.ANS_HEAVY,
      },
      {
        heading: 'B · right hand up',
        headingFr: 'B · main droite levée',
        accent: ORANGE,
        icon: 'Hand',
        inlineSvg: DIAGRAMS.ANS_SAME,
      },
    ],
  },

  // 3. Test it at the desk
  {
    layout: 'statement',
    accent: GREEN,
    eyebrow: 'Try it with a partner',
    eyebrowFr: 'Essaie avec un camarade',
    title: 'One Bang or Two?',
    titleFr: 'Un bruit ou deux ?',
    text: 'Hold your **book** and an **eraser** at the same height.',
    textFr: 'Tiens ton **livre** et une **gomme** à la même hauteur.',
    sub: 'Let go together and listen: **one bang** or **two**?',
    subFr: 'Lâche-les ensemble et écoute : **un bruit** ou **deux** ?',
    reveal: {
      label: 'What did you hear?',
      labelFr: 'Qu’as-tu entendu ?',
      answer: '**One bang.** The heavy book and the light eraser land at the same time.',
      answerFr: '**Un seul bruit.** Le livre lourd et la gomme légère touchent le sol en même temps.',
    },
  },

  // 4. The twist: paper
  {
    layout: 'statement',
    accent: GREEN,
    eyebrow: 'Try it again',
    eyebrowFr: 'Recommence',
    title: 'Now Try Paper',
    titleFr: 'Maintenant, du papier',
    text: 'Now drop your book and a **flat sheet of paper**.',
    textFr: 'Lâche maintenant ton livre et une **feuille de papier à plat**.',
    sub: 'Then crumple the paper into a **ball** and try again. What changed? The paper is **not** heavier.',
    subFr: 'Puis froisse le papier en **boule** et recommence. Qu’est-ce qui change ? Le papier n’est **pas** plus lourd.',
    reveal: {
      label: 'Why?',
      labelFr: 'Pourquoi ?',
      answer: 'Flat paper: the **air** pushes up on it and slows it down.\nA paper ball: the air cannot slow it much.',
      answerFr: 'Papier à plat : l’**air** pousse dessous et le ralentit.\nBoule de papier : l’air ne peut presque pas la ralentir.',
    },
  },

  // 5. The BBC's vacuum chamber — predict between the two buttons
  {
    layout: 'showcase',
    accent: TEAL,
    icon: 'Clapperboard',
    eyebrow: 'A vacuum: no air at all',
    eyebrowFr: 'Le vide : pas d’air du tout',
    title: 'What If There Is No Air?',
    titleFr: 'Et s’il n’y a pas d’air ?',
    widget: VacuumClip,
    caption: 'Play **1**. Predict: what happens with **no air**? Then play **2**.',
    captionFr: 'Lance **1**. Devine : que se passe-t-il **sans air** ? Puis lance **2**.',
  },

  // 6. The story, after the class has found it out themselves
  {
    layout: 'showcase',
    accent: TEAL,
    icon: 'Building2',
    eyebrow: 'Over 400 years ago',
    eyebrowFr: 'Il y a plus de 400 ans',
    title: 'Galileo and the Tower of Pisa',
    titleFr: 'Galilée et la tour de Pise',
    inlineSvg: DIAGRAMS.FALL_STORY,
    caption: 'The story: Galileo dropped a heavy ball and a light ball from the top.',
    captionFr: 'L’histoire : Galilée a lâché une balle lourde et une balle légère du haut de la tour.',
  },

  // 7. Apollo 15: Galileo, tested on the Moon
  {
    layout: 'showcase',
    accent: TEAL,
    icon: 'Clapperboard',
    eyebrow: 'The Moon, 1971',
    eyebrowFr: 'La Lune, 1971',
    title: 'A Hammer and a Feather',
    titleFr: 'Un marteau et une plume',
    widget: Apollo15Clip,
    caption: 'The Moon has **no air**. Astronaut David Scott tests Galileo’s idea.',
    captionFr: 'Sur la Lune, il n’y a **pas d’air**. L’astronaute David Scott teste l’idée de Galilée.',
  },

  // 8. Stop for the English: the verbs of an experiment
  {
    layout: 'showcase',
    accent: PURPLE,
    icon: 'MessageSquare',
    eyebrow: 'English check',
    eyebrowFr: 'Point d’anglais',
    title: 'Drop, Fall, Land',
    titleFr: 'Drop, fall, land',
    inlineSvg: DIAGRAMS.DROP_WORDS,
    caption: '**You** drop it. **It** falls. Then it lands.',
    captionFr: '**Tu** le lâches (drop). **Il** tombe (fall). Puis il touche le sol (land).',
  },

  // ── GRAVITY ─────────────────────────────────────────────────────────────
  // 9. Question first
  {
    layout: 'statement',
    accent: PURPLE,
    eyebrow: 'Think',
    eyebrowFr: 'Réfléchis',
    title: 'What Pulls It Down?',
    titleFr: 'Qu’est-ce qui la tire vers le bas ?',
    text: 'You drop a ball. It falls to the ground.',
    textFr: 'Tu lâches une balle. Elle tombe par terre.',
    sub: 'What **pulls** it down?',
    subFr: 'Qu’est-ce qui la **tire** vers le bas ?',
    reveal: {
      label: 'Answer',
      labelFr: 'Réponse',
      answer: '**The Earth.** Its gravity pulls everything towards it.',
      answerFr: '**La Terre.** Sa gravité attire tout vers elle.',
    },
  },

  // 10. Gravity (write)
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Globe',
    eyebrow: 'Key word',
    eyebrowFr: 'Mot clé',
    title: 'Gravity',
    titleFr: 'La gravité',
    ratio: 45,
    inlineSvg: DIAGRAMS.EARTH_PULL,
    content: '**Everything** pulls on everything else. Even two pencils!',
    contentFr: '**Tout** attire tout. Même deux crayons !',
    notes: [
      {
        tone: 'write',
        text: '**Gravity:** a force that pulls objects towards each other.\nObjects with a large **mass**, like the Earth, have strong gravity.',
        textFr: '**Gravité (gravity) :** une force qui attire les objets les uns vers les autres.\nLes objets de grande **masse**, comme la Terre, ont une gravité forte.',
      },
    ],
  },

  // 11. Question 3, with arms
  {
    layout: 'showcase',
    accent: PURPLE,
    icon: 'Globe',
    eyebrow: 'Question 3 · point with your arm',
    eyebrowFr: 'Question 3 · montre avec ton bras',
    title: 'Which Way Is Down?',
    titleFr: 'Où est le bas ?',
    inlineSvg: DIAGRAMS.EARTH_ABCD,
    caption: 'A ball is dropped at **A**, **B**, **C** and **D**. Point the way each one falls.',
    captionFr: 'On lâche une balle en **A**, **B**, **C** et **D**. Montre dans quel sens chacune tombe.',
  },

  // 12. Draw This: towards the centre (Questions 1 and 2)
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'Pencil',
    eyebrow: 'Draw this · Questions 1 and 2',
    eyebrowFr: 'À dessiner · Questions 1 et 2',
    title: 'Towards the Centre',
    titleFr: 'Vers le centre',
    ratio: 40,
    inlineSvg: DIAGRAMS.EARTH_ARROWS,
    drawThis: true,
    content: 'So people at the **South Pole** do not fall off!',
    contentFr: 'Alors les gens au **pôle Sud** ne tombent pas !',
    notes: [
      {
        tone: 'write',
        text: 'The force of gravity acts **towards the centre** of the Earth.',
        textFr: 'La force de gravité agit **vers le centre** de la Terre.',
      },
    ],
  },

  // 13. Further away, weaker
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Telescope',
    eyebrow: 'Further away',
    eyebrowFr: 'Plus loin',
    title: 'Weaker Far Away',
    titleFr: 'Plus faible au loin',
    ratio: 40,
    inlineSvg: DIAGRAMS.FURTHER_WEAKER,
    content: 'Fly away from the Earth. Its gravity pulls on you **less and less**.',
    contentFr: 'Éloigne-toi de la Terre. Sa gravité t’attire **de moins en moins**.',
  },

  // 14. Question 4
  {
    layout: 'statement',
    accent: PURPLE,
    eyebrow: 'Question 4',
    eyebrowFr: 'Question 4',
    title: 'Gravity on the Moon?',
    titleFr: 'De la gravité sur la Lune ?',
    text: 'Some people say there is **no gravity** on the Moon.',
    textFr: 'Certains disent qu’il n’y a **pas de gravité** sur la Lune.',
    sub: 'The Moon’s mass is 70 000 000 000 000 000 000 000 kg. Are they right?',
    subFr: 'La masse de la Lune est de 70 000 000 000 000 000 000 000 kg. Ont-ils raison ?',
    reveal: {
      label: 'Answer',
      labelFr: 'Réponse',
      answer: '**No.** The Moon has a big mass, so it has gravity. You saw the hammer fall!',
      answerFr: '**Non.** La Lune a une grande masse, donc elle a une gravité. Tu as vu le marteau tomber !',
    },
  },

  // ── WEIGHT ──────────────────────────────────────────────────────────────
  // 15. Weight (write)
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Scale',
    eyebrow: 'Key word',
    eyebrowFr: 'Mot clé',
    title: 'Weight',
    titleFr: 'Le poids',
    ratio: 45,
    image: weightlifter,
    content: 'Lifting is hard: gravity pulls the bar **down**, towards the centre of the Earth.',
    contentFr: 'Soulever, c’est dur : la gravité tire la barre vers le **bas**, vers le centre de la Terre.',
    notes: [
      {
        tone: 'write',
        text: '**Weight:** the force of gravity on an object.\nWeight is measured in **newtons (N)**.',
        textFr: '**Poids (weight) :** la force de gravité sur un objet.\nLe poids se mesure en **newtons (N)**.',
      },
    ],
  },

  // 16. Feel a newton
  {
    layout: 'showcase',
    accent: TEAL,
    icon: 'Scale',
    eyebrow: 'Hold an apple',
    eyebrowFr: 'Tiens une pomme',
    title: 'How Big Is a Newton?',
    titleFr: 'Combien pèse un newton ?',
    inlineSvg: DIAGRAMS.NEWTON_LADDER,
    caption: 'An apple weighs about **1 N**. Hold one: that is 1 newton.',
    captionFr: 'Une pomme pèse environ **1 N**. Tiens-en une : c’est 1 newton.',
  },

  // ── CONTACT FORCE ───────────────────────────────────────────────────────
  // 17. Question first (the book's own question)
  {
    layout: 'statement',
    accent: PURPLE,
    icon: 'HelpCircle',
    eyebrow: 'Think',
    eyebrowFr: 'Réfléchis',
    title: 'Why Doesn’t It Fall?',
    titleFr: 'Pourquoi ne tombe-t-il pas ?',
    text: 'Gravity pulls a book down with **5 N**.',
    textFr: 'La gravité tire un livre vers le bas avec **5 N**.',
    sub: 'So why doesn’t it move down **through** the desk?',
    subFr: 'Alors pourquoi ne passe-t-il pas **à travers** la table ?',
  },

  // 18. Draw This: contact force (Question 5)
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'Pencil',
    eyebrow: 'Draw this · Question 5',
    eyebrowFr: 'À dessiner · Question 5',
    title: 'Contact Force',
    titleFr: 'La force de contact',
    ratio: 40,
    inlineSvg: DIAGRAMS.CONTACT_BOX,
    drawThis: true,
    content: 'The desk **pushes back up** with 5 N.',
    contentFr: 'La table **repousse vers le haut** avec 5 N.',
    notes: [
      {
        tone: 'write',
        text: '**Contact force:** the push from a surface that holds an object up.\nIf nothing moves, contact force = weight.',
        textFr: '**Force de contact (contact force) :** la poussée d’une surface qui soutient un objet.\nSi rien ne bouge, force de contact = poids.',
      },
    ],
  },

  // 19. When the surface loses
  {
    layout: 'split',
    accent: TEAL,
    icon: 'AlertTriangle',
    eyebrow: 'When the push is too small',
    eyebrowFr: 'Quand la poussée est trop faible',
    title: 'Sinking',
    titleFr: 'Ça s’enfonce',
    ratio: 40,
    inlineSvg: DIAGRAMS.SAND_CAR,
    content: 'The car’s weight is **bigger** than the contact force from the mud. So it sinks.',
    contentFr: 'Le poids de la voiture est **plus grand** que la force de contact de la boue. Alors elle s’enfonce.',
    reveal: {
      prompt: 'Other examples? Ask a partner.',
      promptFr: 'D’autres exemples ? Demande à ton voisin.',
      label: 'Ideas',
      labelFr: 'Des idées',
      answer: 'Thin ice that breaks · a chair that breaks · your feet in wet sand',
      answerFr: 'De la glace fine qui casse · une chaise qui casse · tes pieds dans le sable mouillé',
    },
  },

  // 20. Questions 6 and 7
  {
    layout: 'callout',
    accent: GREEN,
    icon: 'PenLine',
    eyebrow: 'Whiteboards · page 79',
    eyebrowFr: 'Ardoises · page 79',
    title: 'Questions 6 and 7',
    titleFr: 'Questions 6 et 7',
    content:
      '**6.** A rock rests on the ground. Its weight is 8000 N. What is the contact force from the ground?\n\n' +
      '**7.** An elephant stands on 4 feet. Its weight, 40 000 N, is shared equally. What is the contact force on **each foot**?',
    contentFr:
      '**6.** Un rocher est posé sur le sol. Son poids est de 8000 N. Quelle est la force de contact du sol ?\n\n' +
      '**7.** Un éléphant est debout sur 4 pattes. Son poids, 40 000 N, est partagé également. Quelle est la force de contact sur **chaque patte** ?',
    reveal: {
      label: 'Check your answers',
      labelFr: 'Vérifie tes réponses',
      answer: '**6.** 8000 N\n**7.** 40 000 ÷ 4 = **10 000 N**',
      answerFr: '**6.** 8000 N\n**7.** 40 000 ÷ 4 = **10 000 N**',
    },
  },

  // 21. Question 8
  {
    layout: 'callout',
    accent: GREEN,
    icon: 'PenLine',
    eyebrow: 'Whiteboards · page 79',
    eyebrowFr: 'Ardoises · page 79',
    title: 'Question 8',
    titleFr: 'Question 8',
    content:
      'A car drives into soft mud. Each wheel needs a contact force of **24 000 N**.\n\n' +
      '**a** At first, the mud pushes up with only 2000 N. Why does the wheel sink?\n\n' +
      '**b** The deeper it sinks, the harder the mud pushes. When does it stop?',
    contentFr:
      'Une voiture roule dans de la boue molle. Chaque roue a besoin d’une force de contact de **24 000 N**.\n\n' +
      '**a** Au début, la boue ne pousse qu’avec 2000 N. Pourquoi la roue s’enfonce-t-elle ?\n\n' +
      '**b** Plus elle s’enfonce, plus la boue pousse fort. Quand s’arrête-t-elle ?',
    reveal: {
      label: 'Check your answers',
      labelFr: 'Vérifie tes réponses',
      answer: '**a** 2000 N is less than 24 000 N. The weight wins, so it sinks.\n**b** When the mud pushes up with 24 000 N: the forces are equal.',
      answerFr: '**a** 2000 N, c’est moins que 24 000 N : le poids gagne, elle s’enfonce.\n**b** Quand la boue pousse avec 24 000 N : forces égales.',
    },
  },

  // 22. End of Part 1
  {
    layout: 'hero',
    color: TEAL,
    icon: 'CheckCircle2',
    brand: 'Year 7 Science',
    brandFr: 'Sciences 7e année',
    title: 'End of Part 1',
    titleFr: 'Fin de la partie 1',
    subtitle: 'Exit question: your bag weighs **30 N**. It sits on the floor. What is the **contact force** from the floor?',
    subtitleFr: 'Question de sortie : ton sac pèse **30 N**. Il est posé par terre. Quelle est la **force de contact** du sol ?',
  },

  // ════════════════════════════════════════════════════════════════════════
  // PART 2 — mass, W = m × 10, other planets, speeding up, the lab plan
  // ════════════════════════════════════════════════════════════════════════

  // 23. Hero + the book's Getting Started
  {
    layout: 'hero',
    color: TEAL,
    icon: 'Scale',
    brand: 'Year 7 Science',
    brandFr: 'Sciences 7e année',
    eyebrow: '3.1 · Part 2',
    eyebrowFr: '3.1 · Partie 2',
    title: 'Weight and Mass',
    titleFr: 'Poids et masse',
    card: {
      icon: 'Pencil',
      badge: 'Starter',
      badgeFr: 'Pour commencer',
      text: 'Choose from **length, mass, volume, weight**. The newton (N) is a unit of … The kilogram (kg) is a unit of …',
      textFr: 'Choisis parmi **length, mass, volume, weight**. Le newton (N) est une unité de … Le kilogramme (kg) est une unité de …',
    },
  },

  // ── MASS ────────────────────────────────────────────────────────────────
  // 24. Vote: the everyday sentence against the science one
  {
    layout: 'compare',
    accent: PURPLE,
    icon: 'Hand',
    eyebrow: 'Vote with one hand',
    eyebrowFr: 'Vote avec une main',
    title: 'Which Is Right?',
    titleFr: 'Laquelle est juste ?',
    text: 'Which sentence is right in science?',
    textFr: 'Quelle phrase est juste en sciences ?',
    columns: [
      {
        heading: 'A · left hand up',
        headingFr: 'A · main gauche levée',
        accent: BLUE,
        icon: 'Hand',
        inlineSvg: DIAGRAMS.ANS_W10,
      },
      {
        heading: 'B · right hand up',
        headingFr: 'B · main droite levée',
        accent: ORANGE,
        icon: 'Hand',
        inlineSvg: DIAGRAMS.ANS_M10,
      },
    ],
  },

  // 25. Mass (write)
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Boxes',
    eyebrow: 'Key word',
    eyebrowFr: 'Mot clé',
    title: 'Mass',
    titleFr: 'La masse',
    ratio: 45,
    inlineSvg: DIAGRAMS.MASS_STUFF,
    content: '**B is right.** Kilograms measure **mass**. Newtons measure **weight**.',
    contentFr: '**B est juste.** Les kilogrammes mesurent la **masse**. Les newtons mesurent le **poids**.',
    notes: [
      {
        tone: 'write',
        text: '**Mass:** the quantity (amount) of matter in an object.\nMass is measured in **kilograms (kg)**.',
        textFr: '**Masse (mass) :** la quantité de matière dans un objet.\nLa masse se mesure en **kilogrammes (kg)**.',
      },
    ],
  },

  // 26. Question 11
  {
    layout: 'split',
    accent: PURPLE,
    icon: 'HelpCircle',
    eyebrow: 'Question 11',
    eyebrowFr: 'Question 11',
    title: 'What Do Scales Measure?',
    titleFr: 'Que mesure une balance ?',
    ratio: 50,
    image: scales,
    content: 'Scales show your **mass** in kg.\n\nBut what **pushes down** on the scales: your mass, or your weight?',
    contentFr: 'Une balance affiche ta **masse** en kg.\n\nMais qu’est-ce qui **appuie** sur la balance : ta masse ou ton poids ?',
    reveal: {
      label: 'Answer',
      labelFr: 'Réponse',
      answer: 'Your **weight** pushes down. The scales divide it by 10 and show kg.',
      answerFr: 'C’est ton **poids** qui appuie. La balance le divise par 10 et affiche des kg.',
    },
  },

  // ── WEIGHT = MASS × 10 ──────────────────────────────────────────────────
  // 27. The formula (write)
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'Triangle',
    eyebrow: 'The formula',
    eyebrowFr: 'La formule',
    title: 'Weight = Mass × 10',
    titleFr: 'Poids = masse × 10',
    ratio: 45,
    inlineSvg: DIAGRAMS.TRIANGLE,
    content: 'On Earth, gravity pulls **10 N** on every **1 kg**.\n\nSay "10 newtons **per** kilogram". **Per** means **for every**.',
    contentFr: 'Sur Terre, la gravité tire **10 N** sur chaque **1 kg**.\n\nDis « 10 newtons **par** kilogramme ». **Per** veut dire **pour chaque**.',
    notes: [
      {
        tone: 'write',
        text: '**weight (N) = mass (kg) × 10**\n$W = m × 10$\nOn Earth, the strength of gravity is **10 N/kg**.',
        textFr: '**poids (N) = masse (kg) × 10**\n$W = m × 10$\nSur Terre, l’intensité de la gravité est de **10 N/kg**.',
      },
    ],
  },

  // 28. The formula triangle, two worked examples
  {
    layout: 'showcase',
    accent: ORANGE,
    icon: 'Triangle',
    eyebrow: 'Cover what you want to find',
    eyebrowFr: 'Cache ce que tu cherches',
    title: 'The Formula Triangle',
    titleFr: 'Le triangle de formule',
    inlineSvg: DIAGRAMS.TRIANGLE_USE,
    caption: 'Cover the letter you want. What is left tells you what to do.',
    captionFr: 'Cache la lettre que tu cherches. Ce qui reste te dit quoi faire.',
  },

  // 29. Question 9
  {
    layout: 'callout',
    accent: GREEN,
    icon: 'PenLine',
    eyebrow: 'Whiteboards · page 80',
    eyebrowFr: 'Ardoises · page 80',
    title: 'Question 9',
    titleFr: 'Question 9',
    content:
      '**a** Calculate the weight of an adult with a mass of 75 kg.\n\n' +
      '**b** Calculate the mass of a car with a weight of 8500 N.',
    contentFr:
      '**a** Calcule le poids d’un adulte de masse 75 kg.\n\n' +
      '**b** Calcule la masse d’une voiture de poids 8500 N.',
    reveal: {
      label: 'Check your answers',
      labelFr: 'Vérifie tes réponses',
      answer: '**a** 75 × 10 = **750 N**\n**b** 8500 ÷ 10 = **850 kg**',
      answerFr: '**a** 75 × 10 = **750 N**\n**b** 8500 ÷ 10 = **850 kg**',
    },
  },

  // 30. Deadpan practice
  {
    layout: 'callout',
    accent: GREEN,
    icon: 'PenLine',
    eyebrow: 'Whiteboards',
    eyebrowFr: 'Ardoises',
    title: 'Mr Bowen’s Bag',
    titleFr: 'Le sac de M. Bowen',
    content:
      '**1.** Mr Bowen’s bag has a mass of 6 kg. What is its weight?\n\n' +
      '**2.** He takes the bag to the Moon. What is its mass there?\n\n' +
      '**3.** His cat (4 kg) sits on his homework. What is the contact force from the homework?',
    contentFr:
      '**1.** Le sac de M. Bowen a une masse de 6 kg. Quel est son poids ?\n\n' +
      '**2.** Il emporte le sac sur la Lune. Quelle est sa masse là-bas ?\n\n' +
      '**3.** Son chat (4 kg) s’assoit sur ses devoirs. Quelle est la force de contact des devoirs ?',
    reveal: {
      label: 'Check your answers',
      labelFr: 'Vérifie tes réponses',
      answer: '**1.** **60 N** · **2.** Still **6 kg**: mass does not change.\n**3.** 4 × 10 = **40 N**. The homework is fine.',
      answerFr: '**1.** **60 N** · **2.** Toujours **6 kg** : la masse ne change pas.\n**3.** 4 × 10 = **40 N**. Les devoirs vont bien.',
    },
  },

  // ── OTHER PLANETS ───────────────────────────────────────────────────────
  // 31. Planet Scales: calculate, then tap
  {
    layout: 'showcase',
    accent: TEAL,
    icon: 'Telescope',
    eyebrow: 'Other planets',
    eyebrowFr: 'D’autres planètes',
    title: 'Mr Bowen in Space',
    titleFr: 'M. Bowen dans l’espace',
    widget: PlanetScales,
    caption: 'Tap a planet. Work out his weight **first**: mass × strength of gravity.',
    captionFr: 'Touche une planète. Calcule son poids **d’abord** : masse × intensité de la gravité.',
  },

  // 32. Same mass, less weight (write) — Apollo 16
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Clapperboard',
    eyebrow: 'Apollo 16, 1972',
    eyebrowFr: 'Apollo 16, 1972',
    title: 'Same Mass, Less Weight',
    titleFr: 'Même masse, moins de poids',
    ratio: 45,
    widget: MoonJumpClip,
    content: 'On the Moon, an astronaut’s weight is **6 times smaller**. So he can bounce, even in a heavy suit.',
    contentFr: 'Sur la Lune, le poids d’un astronaute est **6 fois plus petit**. Alors il peut bondir, même avec une combinaison lourde.',
    notes: [
      {
        tone: 'write',
        text: 'Mass **does not change**. Weight changes when the strength of gravity changes.',
        textFr: 'La masse **ne change pas**. Le poids change quand l’intensité de la gravité change.',
      },
    ],
  },

  // 33. Question 10
  {
    layout: 'split',
    accent: PURPLE,
    icon: 'HelpCircle',
    eyebrow: 'Whiteboards · page 81',
    eyebrowFr: 'Ardoises · page 81',
    title: 'Question 10',
    titleFr: 'Question 10',
    ratio: 50,
    inlineSvg: DIAGRAMS.PLANET_TABLE,
    content:
      '**a** Where would your weight be greatest?\n' +
      '**b** Which planet gives the same weight as Earth?\n' +
      '**c** Calculate the weight of a 25 kg mass on Mars.\n' +
      '**d** Is your mass on Mercury the same as on Earth?',
    contentFr:
      '**a** Où ton poids serait-il le plus grand ?\n' +
      '**b** Quelle planète donne le même poids que la Terre ?\n' +
      '**c** Calcule le poids d’une masse de 25 kg sur Mars.\n' +
      '**d** Ta masse sur Mercure est-elle la même que sur Terre ?',
    reveal: {
      label: 'Check your answers',
      labelFr: 'Vérifie tes réponses',
      answer: '**a** Jupiter · **b** Saturn · **c** 25 × 3.7 = **92.5 N** · **d** Yes: mass does not change.',
      answerFr: '**a** Jupiter · **b** Saturne · **c** 25 × 3.7 = **92.5 N** · **d** Oui : la masse ne change pas.',
    },
  },

  // 34. Question 12
  {
    layout: 'statement',
    accent: PURPLE,
    eyebrow: 'Question 12',
    eyebrowFr: 'Question 12',
    title: 'Earth to Moon, and Back',
    titleFr: 'De la Terre à la Lune, et retour',
    text: 'Leaving **Earth** takes a bigger force than leaving the **Moon**.',
    textFr: 'Quitter la **Terre** demande plus de force que quitter la **Lune**.',
    sub: 'The spacecraft’s mass is the same both ways. So why?',
    subFr: 'La masse de la fusée est la même dans les deux sens. Alors pourquoi ?',
    reveal: {
      label: 'Answer',
      labelFr: 'Réponse',
      answer: 'Gravity is **stronger on Earth**: 10 N/kg, not 1.6 N/kg. So the spacecraft’s **weight** is bigger there.',
      answerFr: 'La gravité est **plus forte sur Terre** : 10 N/kg, pas 1.6 N/kg. Donc le **poids** de la fusée y est plus grand.',
    },
  },

  // 35. Game: the book's Activity
  {
    layout: 'game',
    title: 'Mass or Weight?',
    titleFr: 'Masse ou poids ?',
    widget: MassOrWeight,
  },

  // ── SPEEDING UP ─────────────────────────────────────────────────────────
  // 36. Question first
  {
    layout: 'statement',
    accent: PURPLE,
    icon: 'Gauge',
    eyebrow: 'Think',
    eyebrowFr: 'Réfléchis',
    title: 'Same Speed All the Way?',
    titleFr: 'Même vitesse jusqu’en bas ?',
    text: 'A ball falls from the top of a tall building.',
    textFr: 'Une balle tombe du haut d’un grand immeuble.',
    sub: 'Does it fall at the **same speed** all the way down?',
    subFr: 'Tombe-t-elle à la **même vitesse** jusqu’en bas ?',
  },

  // 37. Accelerate (write), with the real multi-flash photo
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Gauge',
    eyebrow: 'Key word',
    eyebrowFr: 'Mot clé',
    title: 'Accelerate',
    titleFr: 'Accélérer',
    ratio: 60,
    image: strobe,
    content: 'One photo, a flash **20 times** a second. The gaps get **bigger**: the ball goes further each time.',
    contentFr: 'Une photo, un flash **20 fois** par seconde. Les écarts **grandissent** : la balle va plus loin à chaque fois.',
    notes: [
      {
        tone: 'write',
        text: '**Accelerate:** to speed up.\nA **force** makes an object accelerate. Gravity makes falling objects accelerate.',
        textFr: '**Accélérer (accelerate) :** aller de plus en plus vite.\nUne **force** fait accélérer un objet. La gravité fait accélérer les objets qui tombent.',
      },
    ],
  },

  // 38. How fast, second by second
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Building2',
    eyebrow: 'Every second, faster',
    eyebrowFr: 'Chaque seconde, plus vite',
    title: 'Faster and Faster',
    titleFr: 'De plus en plus vite',
    ratio: 40,
    inlineSvg: DIAGRAMS.SPEED_FALL,
    content: 'Every second, a falling ball gets **36 km/h** faster.\n\nAfter only 3 seconds, it is as fast as a car on a motorway.',
    contentFr: 'Chaque seconde, une balle qui tombe gagne **36 km/h**.\n\nAprès 3 secondes seulement, elle va aussi vite qu’une voiture sur l’autoroute.',
  },

  // 39. Back to the starter: why they land together
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Lightbulb',
    eyebrow: 'Back to the starter',
    eyebrowFr: 'Retour au départ',
    title: 'Why Do They Land Together?',
    titleFr: 'Pourquoi arrivent-elles ensemble ?',
    ratio: 45,
    inlineSvg: DIAGRAMS.PULL_VS_MASS,
    content: 'Gravity pulls the heavy ball **harder**.\n\nBut a heavy ball is also **harder to speed up**, like a full shopping trolley. The two cancel out.',
    contentFr: 'La gravité tire **plus fort** sur la balle lourde.\n\nMais une balle lourde est aussi **plus dure à accélérer**, comme un chariot plein. Les deux s’annulent.',
  },

  // 40. Drop Race: Earth and Moon, side by side
  {
    layout: 'showcase',
    accent: TEAL,
    icon: 'Timer',
    eyebrow: 'Earth and Moon, from 5 m',
    eyebrowFr: 'Terre et Lune, de 5 m',
    title: 'Drop Race',
    titleFr: 'Course de chute',
    widget: DropRace,
    caption: 'Predict first: how much longer will the Moon take? Then press **Drop**.',
    captionFr: 'Devine d’abord : combien de temps de plus sur la Lune ? Puis appuie sur **Lâcher**.',
  },

  // ── NEXT WEEK: THE LAB ──────────────────────────────────────────────────
  // 41. Plan it
  {
    layout: 'callout',
    accent: PURPLE,
    icon: 'FlaskConical',
    eyebrow: 'Next week: the lab',
    eyebrowFr: 'La semaine prochaine : le labo',
    title: 'How Could We Test It?',
    titleFr: 'Comment le tester ?',
    content:
      'Does a heavy thing fall faster than a light thing? Plan a test with a partner.\n\n' +
      '**1.** What will you drop?\n' +
      '**2.** From how high?\n' +
      '**3.** How will you know which lands first?\n' +
      '**4.** How will you keep everyone safe?',
    contentFr:
      'Un objet lourd tombe-t-il plus vite qu’un objet léger ? Prépare un test avec ton voisin.\n\n' +
      '**1.** Que vas-tu lâcher ?\n' +
      '**2.** De quelle hauteur ?\n' +
      '**3.** Comment sauras-tu lequel arrive en premier ?\n' +
      '**4.** Comment protéger tout le monde ?',
  },

  // 42. Catch the ruler: gravity measures your reaction time
  {
    layout: 'split',
    accent: GREEN,
    icon: 'Ruler',
    eyebrow: 'Try it: catch the ruler',
    eyebrowFr: 'Essaie : attrape la règle',
    title: 'How Fast Are You?',
    titleFr: 'Es-tu rapide ?',
    ratio: 40,
    inlineSvg: DIAGRAMS.RULER_CATCH,
    content: 'Your partner holds a 30 cm ruler. Your fingers wait at **0**. They let go: catch it!\n\nFind your time in the table.',
    contentFr: 'Ton voisin tient une règle de 30 cm. Tes doigts attendent au **0**. Il lâche : attrape-la !\n\nTrouve ton temps dans le tableau.',
  },

  // 43. The timing problem, and some answers
  {
    layout: 'callout',
    accent: PURPLE,
    icon: 'Timer',
    eyebrow: 'The problem',
    eyebrowFr: 'Le problème',
    title: 'Too Fast to Time',
    titleFr: 'Trop rapide à chronométrer',
    content:
      'From 1 m, a fall takes less than **half a second**. Your reaction time is about **0.2 s**.\n\n' +
      'How could we time a fall fairly?',
    contentFr:
      'D’un mètre, une chute dure moins d’une **demi-seconde**. Ton temps de réaction est d’environ **0.2 s**.\n\n' +
      'Comment chronométrer une chute de façon juste ?',
    reveal: {
      label: 'Mr Bowen’s ideas',
      labelFr: 'Les idées de M. Bowen',
      answer:
        '**Listen:** one bang or two?\n' +
        '**Film it** in slow motion and count the frames.\n' +
        '**Go higher:** from the second floor, a fall takes about 1 s.\n' +
        '**Slow it down:** roll balls down a ramp, like Galileo.',
      answerFr:
        '**Écoute :** un bruit ou deux ?\n' +
        '**Filme** au ralenti et compte les images.\n' +
        '**Plus haut :** du 2e étage, une chute dure environ 1 s.\n' +
        '**Ralentis :** fais rouler des balles sur une pente, comme Galilée.',
    },
  },

  // ── CLOSE ───────────────────────────────────────────────────────────────
  // 44. Checklist (the book's summary checklist, plus accelerate)
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
    content: '> Check your notebook: **8 written panels** and **2 drawings**.',
    contentFr: '> Vérifie ton cahier : **8 encadrés recopiés** et **2 dessins**.',
    items: [
      { text: 'Say why planets have **gravity**.', textFr: 'Dire pourquoi les planètes ont une **gravité**.' },
      { text: 'Show which way gravity acts around the **Earth**.', textFr: 'Montrer dans quel sens la gravité agit autour de la **Terre**.' },
      { text: 'Describe **weight** and **mass**, and the difference.', textFr: 'Décrire le **poids** et la **masse**, et leur différence.' },
      { text: 'Explain the **contact force** from a desk.', textFr: 'Expliquer la **force de contact** d’une table.' },
      { text: 'Calculate a weight: $W = m × 10$.', textFr: 'Calculer un poids : $W = m × 10$.' },
      { text: 'Explain why falling objects **accelerate**.', textFr: 'Expliquer pourquoi les objets qui tombent **accélèrent**.' },
    ],
  },

  // 45. Exit question
  {
    layout: 'hero',
    color: TEAL,
    icon: 'CheckCircle2',
    brand: 'Year 7 Science',
    brandFr: 'Sciences 7e année',
    title: 'Lesson Complete!',
    titleFr: 'Leçon terminée !',
    subtitle: 'Exit question: a suitcase has a mass of **20 kg**. What is its weight on **Earth**? On **Jupiter**?',
    subtitleFr: 'Question de sortie : une valise a une masse de **20 kg**. Quel est son poids sur **Terre** ? Sur **Jupiter** ?',
  },
]
