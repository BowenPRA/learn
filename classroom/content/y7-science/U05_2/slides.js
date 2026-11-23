// content/y7-science/U05_2/slides.js
// Year 7 Science · 5.2 Comparing metals and non-metals. One 50-minute period,
// after 5.1 (Metals and non-metals), which taught every property word. Source:
// Learner's Book pages 157–160; Workbook Exercises 5.2A–C; Teacher's Resource
// Worksheets 5.2A–F and Templates 1–2.
//
// ENGLISH AND FRENCH ONLY, like every Year 7 deck from 15 October: every
// string has an …Fr twin and no …Vn twin. The diagrams stay in English.
//
// THE ARC (plan.js has the timings). Three goals in everyday words, the same
// three on the checklist:
//   Compare   the book's Getting started (ductile, sonorous, malleable,
//             brittle: a cartoon each), then back to it. Opposites: the table
//             on page 158 built a row a press, the class saying the
//             non-metal side. Whereas. The market (Question 1).
//   Test      examine and distinguish. Examine your desk: the record table of
//             Investigating materials (page 159). What happens next? Mr
//             Bowen's lamp says everything is a non-metal. Contact. Draw the
//             test circuit. Lamp on or off? Eight desk things, a press each,
//             ending on pencil lead. Is pencil lead a metal? (vote) Graphite.
//             All or most? (Question 3) The odd ones out: mercury and
//             graphite. True or False? with the whole class standing.
//   Clues     melting point and boiling point; how to say −183 °C. Solid,
//             liquid or gas at 25 °C? Two mystery substances (the question of
//             Workbook 5.2C, with our own substances). Exit: Question 4.
//
// COPY-DOWN: 5 written panels — whereas (5), examine and distinguish (7),
// contact (10), mercury and graphite (16), melting point and boiling point
// (18) — 1 table (8) and 1 drawing (11). Each panel is the definition only; a
// line that goes with it sits underneath, to read.
//
// WRITING RULE (the 2.5 density): one hook line, short sentences, and the body
// never repeats the write note, a label or the caption.

import { DIAGRAMS } from './diagrams.js'
import { DIAGRAMS as D51 } from '../U05_1/diagrams.js'
import { Opposites } from './opposites.jsx'
import { LampStory } from './story.jsx'
import { TestCircuit } from './circuit.jsx'
import { TrueOrFalse } from './game.jsx'
import { SolidLiquidGas } from './states.jsx'

const TEAL = '#0087a8'
const PURPLE = '#5c2483'
const ORANGE = '#c25e12'
const GREEN = '#4a8b23'
const BLUE = '#1a5fa8'

export const slides = [
  // ════════════════════════════════════════════════════════════════════════
  // COMPARE — the two sides of the table
  // ════════════════════════════════════════════════════════════════════════

  // 1. Hero + starter: the book's Getting started (page 157)
  {
    layout: 'hero',
    color: PURPLE,
    icon: 'Scale',
    brand: 'Year 7 Science',
    brandFr: 'Sciences 7e année',
    date: '23 Nov 2026',
    eyebrow: '5.2 · Properties of materials',
    eyebrowFr: '5.2 · Propriétés des matériaux',
    title: 'Comparing Metals and Non‑metals',
    titleFr: 'Comparer métaux et non‑métaux',
    card: {
      icon: 'Pencil',
      badge: 'Starter · 4 words, 4 cartoons',
      badgeFr: 'Pour commencer · 4 mots, 4 dessins',
      text: 'What do they mean? **ductile** · **sonorous** · **malleable** · **brittle**. Draw a **cartoon** for each.',
      textFr: 'Que veulent dire **ductile** · **sonorous** · **malleable** · **brittle** ? Un **dessin** pour chacun.',
    },
  },

  // 2. Today's goals (the checklist on slide 21 ticks off the same three)
  {
    layout: 'compare',
    accent: TEAL,
    icon: 'Target',
    eyebrow: 'Today',
    eyebrowFr: 'Aujourd’hui',
    title: 'Today You Will…',
    titleFr: 'Aujourd’hui, tu vas…',
    text: 'Compare **metals** and **non-metals**, and **test** a material to find out which it is.',
    textFr: 'Comparer les **métaux** et les **non-métaux**, et **tester** un matériau pour savoir ce qu’il est.',
    columns: [
      {
        heading: 'Compare',
        headingFr: 'Comparer',
        accent: TEAL,
        icon: 'Scale',
        inlineSvg: DIAGRAMS.PIC_COMPARE,
        caption: 'Say how metals and non-metals differ.',
        captionFr: 'Dire en quoi métaux et non-métaux diffèrent.',
      },
      {
        heading: 'Test',
        headingFr: 'Tester',
        accent: ORANGE,
        icon: 'Zap',
        inlineSvg: DIAGRAMS.PIC_TEST,
        caption: 'Test a thing: metal or non-metal?',
        captionFr: 'Tester un objet : métal ou non-métal ?',
      },
      {
        heading: 'Clues',
        headingFr: 'Indices',
        accent: GREEN,
        icon: 'Search',
        inlineSvg: DIAGRAMS.PIC_CLUES,
        caption: 'Name a mystery substance from clues.',
        captionFr: 'Trouver une substance mystère.',
      },
    ],
  },

  // 3. Back to the starter: the four words, a cartoon each
  {
    layout: 'showcase',
    accent: PURPLE,
    icon: 'Search',
    eyebrow: 'Back to the starter',
    eyebrowFr: 'Retour au début',
    title: 'Four Words, Four Cartoons',
    titleFr: 'Quatre mots, quatre dessins',
    inlineSvg: DIAGRAMS.CARTOONS,
    caption: 'Compare with your partner. **Three** words are about **metals**. Which one is about **non-metals**?',
    captionFr: 'Compare avec ton voisin. **Trois** mots parlent des **métaux**. Lequel parle des **non-métaux** ?',
  },

  // 4. Opposites: the table on page 158, a row a press
  {
    layout: 'showcase',
    accent: ORANGE,
    icon: 'ArrowLeftRight',
    eyebrow: 'Say it first',
    eyebrowFr: 'Dis-le d’abord',
    title: 'Opposites',
    titleFr: 'Les contraires',
    widget: Opposites,
    caption: 'The table on **page 158**, one row a press.',
    captionFr: 'Le tableau de la **page 158**, une ligne par clic.',
  },

  // 5. Whereas (write): the book's word for comparing (page 160)
  {
    layout: 'split',
    accent: PURPLE,
    icon: 'Languages',
    eyebrow: 'English · page 160',
    eyebrowFr: 'Anglais · page 160',
    title: 'Whereas',
    titleFr: 'Whereas (alors que)',
    ratio: 45,
    inlineSvg: DIAGRAMS.WHEREAS,
    notes: [
      {
        tone: 'write',
        text: '**Whereas:** joins two facts that are different.\nMetals are shiny, **whereas** non-metals are dull.',
        textFr: '**Whereas (alors que) :** relie deux faits différents.\nMetals are shiny, **whereas** non-metals are dull.',
      },
    ],
    reveal: {
      prompt: 'Your turn: rows 3 and 5 of the table, with whereas.',
      promptFr: 'À toi : les lignes 3 et 5 du tableau, avec whereas.',
      label: 'Answer',
      labelFr: 'Réponse',
      answer: 'Metals do not shatter, **whereas** non-metals are **brittle**.\nMetals conduct electricity, **whereas** most non-metals **do not**.',
      answerFr: 'Metals do not shatter, **whereas** non-metals are **brittle**.\nMetals conduct electricity, **whereas** most non-metals **do not**.',
    },
  },

  // 6. The market (Question 1, page 158)
  {
    layout: 'showcase',
    accent: GREEN,
    icon: 'Search',
    eyebrow: 'Question 1 · pairs',
    eyebrowFr: 'Question 1 · en binôme',
    title: 'At the Market',
    titleFr: 'Au marché',
    inlineSvg: DIAGRAMS.MARKET,
    caption: 'A market stall in Kolkata, India. List **5** things made of **metal** and **5** made of **non-metals**.',
    captionFr: 'Un étal de marché à Calcutta, en Inde. Note **5** objets en **métal** et **5** en **non-métaux**.',
  },

  // ════════════════════════════════════════════════════════════════════════
  // TEST — Investigating materials (page 159)
  // ════════════════════════════════════════════════════════════════════════

  // 7. Examine and distinguish (write)
  {
    layout: 'split',
    accent: TEAL,
    icon: 'ScanEye',
    eyebrow: 'Key words · page 159',
    eyebrowFr: 'Mots clés · page 159',
    title: 'Examine and Distinguish',
    titleFr: 'Examiner et distinguer',
    ratio: 45,
    inlineSvg: DIAGRAMS.EXAMINE,
    notes: [
      {
        tone: 'write',
        text: '**Examine:** look at something closely, and test it.\n**Distinguish:** see the difference, and say which is which.',
        textFr: '**Examiner (examine) :** regarder quelque chose de près, et le tester.\n**Distinguer (distinguish) :** voir la différence, et dire qui est qui.',
      },
    ],
  },

  // 8. Think like a scientist: the record table (Template 1)
  {
    layout: 'showcase',
    accent: PURPLE,
    icon: 'Table',
    eyebrow: 'Think like a scientist · page 159',
    eyebrowFr: 'Pense en scientifique · page 159',
    title: 'Examine Your Desk',
    titleFr: 'Examine ta table',
    inlineSvg: DIAGRAMS.TABLE,
    drawThis: true,
    caption: 'Copy the table. Examine **4** of these: a paper clip, an eraser, a coin, a ruler, a pencil, a key.',
    captionFr: 'Recopie le tableau. Examine **4** de ces objets : un trombone, une gomme, une pièce, une règle, un crayon, une clé.',
  },

  // 9. What happens next? Mr Bowen's lamp, one panel per press (deadpan)
  {
    layout: 'showcase',
    accent: BLUE,
    icon: 'Lightbulb',
    eyebrow: 'What happens next?',
    eyebrowFr: 'Que se passe-t-il ensuite ?',
    title: 'Mr Bowen’s Big Discovery',
    titleFr: 'La grande découverte de M. Bowen',
    widget: LampStory,
    caption: 'Before each press, **predict** what happens.',
    captionFr: 'Avant chaque clic, **prédis** la suite.',
  },

  // 10. Contact (write): check the lamp first
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Zap',
    eyebrow: 'Key word · page 159',
    eyebrowFr: 'Mot clé · page 159',
    title: 'Good Contact',
    titleFr: 'Un bon contact',
    ratio: 45,
    inlineSvg: DIAGRAMS.CONTACT,
    content: 'Mr Bowen’s lamp was **broken**. Always check it **first**.',
    contentFr: 'La lampe de M. Bowen était **cassée**. Vérifie-la toujours **d’abord**.',
    notes: [
      {
        tone: 'write',
        text: '**Contact:** touching. The clips must make **good contact** with the material.',
        textFr: '**Contact (contact) :** le fait de toucher. Les pinces doivent faire un **bon contact** avec le matériau.',
      },
    ],
    reveal: {
      prompt: 'A rusty nail: the lamp stays off. Why?',
      promptFr: 'Un clou rouillé : la lampe reste éteinte. Pourquoi ?',
      label: 'Answer',
      labelFr: 'Réponse',
      answer: 'The clips touch the **rust**, not the iron. Rub it clean: **good contact**, and the lamp lights.',
      answerFr: 'Les pinces touchent la **rouille**, pas le fer. Frotte-le : **bon contact**, et la lampe s’allume.',
    },
  },

  // 11. Draw this: the test circuit (page 159)
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'Pencil',
    eyebrow: 'Draw this · page 159',
    eyebrowFr: 'À dessiner · page 159',
    title: 'The Test Circuit',
    titleFr: 'Le circuit de test',
    ratio: 45,
    inlineSvg: DIAGRAMS.CIRCUIT,
    drawThis: true,
    content: 'Copy the circuit and its **4 labels**.',
    contentFr: 'Recopie le circuit et ses **4 légendes**.',
    notes: [
      {
        tone: 'info',
        badge: false,
        text: 'Lamp **on**: the material **conducts** electricity. Lamp **off**: it does not.',
        textFr: 'Lampe **allumée** : le matériau **conduit** l’électricité. Lampe **éteinte** : il ne conduit pas.',
      },
    ],
  },

  // 12. The model: eight desk things, one press each
  {
    layout: 'showcase',
    accent: ORANGE,
    icon: 'Lightbulb',
    eyebrow: 'A model · say it first',
    eyebrowFr: 'Un modèle · dis-le d’abord',
    title: 'Lamp On or Off?',
    titleFr: 'Allumée ou éteinte ?',
    widget: TestCircuit,
    caption: 'Fill in **Lamp on?** in your table as we go.',
    captionFr: 'Remplis la colonne **Lamp on?** de ton tableau au fur et à mesure.',
  },

  // 13. Vote: pencil lead lit the lamp. Is it a metal?
  {
    layout: 'compare',
    accent: PURPLE,
    icon: 'Hand',
    eyebrow: 'Vote with one hand',
    eyebrowFr: 'Vote avec une main',
    title: 'Pencil Lead',
    titleFr: 'La mine de crayon',
    text: 'Pencil lead **lights the lamp**. Is it a **metal**?',
    textFr: 'La mine de crayon **allume la lampe**. Est-ce un **métal** ?',
    columns: [
      { heading: 'A · left hand up', headingFr: 'A · main gauche levée', accent: BLUE, icon: 'Hand', inlineSvg: D51.ANS_YES },
      { heading: 'B · right hand up', headingFr: 'B · main droite levée', accent: ORANGE, icon: 'Hand', inlineSvg: D51.ANS_NO },
    ],
  },

  // 14. Answer B: graphite, a non-metal that conducts
  {
    layout: 'split',
    accent: TEAL,
    icon: 'PenLine',
    eyebrow: 'Answer: B · no',
    eyebrowFr: 'Réponse : B · non',
    title: 'Graphite',
    titleFr: 'Le graphite',
    ratio: 45,
    inlineSvg: DIAGRAMS.GRAPHITE,
    content: 'Pencil lead is **graphite**, a kind of **carbon**. Carbon is a **non-metal**. But graphite **conducts** electricity.',
    contentFr: 'La mine de crayon, c’est du **graphite**, une sorte de **carbone**. Le carbone est un **non-métal**. Mais le graphite **conduit** l’électricité.',
    notes: [
      {
        tone: 'info',
        badge: false,
        text: 'Examine it: it is dark, **soft** and **brittle**. One test is not enough.',
        textFr: 'Examine-le : il est sombre, **tendre** et **cassant**. Un seul test ne suffit pas.',
      },
    ],
    reveal: {
      label: 'Is there lead in it?',
      labelFr: 'Y a-t-il du plomb dedans ?',
      answer: 'No. **Lead** is a metal. Long ago, people thought graphite was lead, and the name stayed.',
      answerFr: 'Non. **Lead** (le plomb) est un métal. Autrefois, on croyait que le graphite était du plomb, et le nom est resté.',
    },
  },

  // 15. All or most? (Question 3)
  {
    layout: 'statement',
    accent: PURPLE,
    eyebrow: 'English · Question 3',
    eyebrowFr: 'Anglais · Question 3',
    title: 'All or Most?',
    titleFr: 'All ou most ?',
    text: 'Page 158 says **most** metals are solid. Why not **all**?',
    textFr: 'La page 158 dit : **most** metals are solid. Pourquoi pas **all** ?',
    sub: 'all: every one · most: nearly all · some: a few',
    subFr: 'all : tous · most : presque tous · some : quelques-uns',
    reveal: {
      label: 'Answer',
      labelFr: 'Réponse',
      answer: '**Mercury** is a metal, and it is a **liquid**.',
      answerFr: 'Le **mercure** est un métal, et il est **liquide**.',
    },
  },

  // 16. The odd ones out (write)
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'AlertTriangle',
    eyebrow: 'Odd ones out',
    eyebrowFr: 'Les exceptions',
    title: 'Mercury and Graphite',
    titleFr: 'Le mercure et le graphite',
    ratio: 45,
    inlineSvg: DIAGRAMS.ODD_ONES,
    content: 'Two odd ones out: they do not follow the table.',
    contentFr: 'Deux exceptions : ils ne suivent pas le tableau.',
    notes: [
      {
        tone: 'write',
        text: '**Mercury:** a metal that is a **liquid**.\n**Graphite:** a non-metal that **conducts** electricity.',
        textFr: '**Mercure (mercury) :** un métal **liquide**.\n**Graphite (graphite) :** un non-métal qui **conduit** l’électricité.',
      },
    ],
  },

  // 17. True or False? The whole class, standing
  {
    layout: 'showcase',
    accent: GREEN,
    icon: 'Trophy',
    eyebrow: 'A game · everyone stands',
    eyebrowFr: 'Un jeu · tout le monde debout',
    title: 'True or False?',
    titleFr: 'Vrai ou faux ?',
    widget: TrueOrFalse,
    caption: 'The last ones standing win a **prize ticket**!',
    captionFr: 'Les derniers debout gagnent un **ticket** !',
  },

  // ════════════════════════════════════════════════════════════════════════
  // CLUES — melting points, boiling points and mystery substances
  // ════════════════════════════════════════════════════════════════════════

  // 18. Melting point and boiling point (write)
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Thermometer',
    eyebrow: 'Key words',
    eyebrowFr: 'Mots clés',
    title: 'Melting Point and Boiling Point',
    titleFr: 'Point de fusion, point d’ébullition',
    ratio: 45,
    inlineSvg: DIAGRAMS.MELT_BOIL,
    content: 'How do you say **−183 °C**?',
    contentFr: 'Comment dit-on **−183 °C** en anglais ?',
    notes: [
      {
        tone: 'write',
        text: '**Melting point:** the temperature where a solid melts into a liquid.\n**Boiling point:** the temperature where a liquid boils into a gas.',
        textFr: '**Point de fusion (melting point) :** la température où un solide devient liquide.\n**Point d’ébullition (boiling point) :** la température où un liquide devient gaz.',
      },
    ],
    reveal: {
      label: 'Answer',
      labelFr: 'Réponse',
      answer: '**Minus** one hundred and eighty-three **degrees Celsius**: 183 degrees **below zero**.',
      answerFr: '**Minus** one hundred and eighty-three **degrees Celsius** : 183 degrés **sous zéro**.',
    },
  },

  // 19. The model: solid, liquid or gas at 25 °C?
  {
    layout: 'showcase',
    accent: BLUE,
    icon: 'Thermometer',
    eyebrow: 'A model · say it first',
    eyebrowFr: 'Un modèle · dis-le d’abord',
    title: 'Solid, Liquid or Gas?',
    titleFr: 'Solide, liquide ou gaz ?',
    widget: SolidLiquidGas,
    caption: 'This room is about **25 °C**. Before each press, say **solid**, **liquid** or **gas**.',
    captionFr: 'La salle est à environ **25 °C**. Avant chaque clic, dis **solide**, **liquide** ou **gaz**.',
  },

  // 20. Put it together: two mystery substances (the question of Workbook 5.2C)
  {
    layout: 'split',
    accent: PURPLE,
    icon: 'Search',
    eyebrow: 'Put it together · whiteboards',
    eyebrowFr: 'En résumé · ardoises',
    title: 'Two Mystery Substances',
    titleFr: 'Deux substances mystère',
    ratio: 45,
    inlineSvg: DIAGRAMS.MYSTERY,
    content: 'For each one: **metal** or **non-metal**? Give **two reasons**. Then name it.',
    contentFr: 'Pour chacune : **métal** ou **non-métal** ? Donne **deux raisons**. Puis nomme-la.',
    reveal: {
      label: 'Answer',
      labelFr: 'Réponse',
      answer: '**P, a metal:** shiny, it bends, it conducts, a high melting point. It is **silver**.\n**Q, a non-metal:** a gas that does not conduct. It is **neon**.',
      answerFr: '**P, un métal :** brillant, il plie, il conduit, un point de fusion élevé. C’est l’**argent** (silver).\n**Q, un non-métal :** un gaz qui ne conduit pas. C’est le **néon** (neon).',
    },
  },

  // 21. Checklist: slide 2's goals, ticked off
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
    content: '> Check your notebook: **5 written panels**, **1 table** and **1 drawing**.',
    contentFr: '> Vérifie ton cahier : **5 encadrés recopiés**, **1 tableau** et **1 dessin**.',
    items: [
      { text: '**Compare** metals and non-metals, using **whereas**.', textFr: '**Comparer** métaux et non-métaux avec **whereas**.' },
      { text: '**Examine** a material and **distinguish**: metal or non-metal? Test it with **good contact**.', textFr: '**Examiner** un matériau et **distinguer** : métal ou non-métal ? Le tester avec un **bon contact**.' },
      { text: 'Name the two odd ones out: **mercury** and **graphite**.', textFr: 'Nommer les deux exceptions : le **mercure** et le **graphite**.' },
      { text: 'Use the **melting point** and **boiling point** to say solid, liquid or gas.', textFr: 'Utiliser le **point de fusion** et le **point d’ébullition** pour dire solide, liquide ou gaz.' },
    ],
  },

  // 22. Exit: Question 4
  {
    layout: 'hero',
    color: PURPLE,
    icon: 'Target',
    brand: 'Year 7 Science',
    brandFr: 'Sciences 7e année',
    eyebrow: 'Exit question · Question 4',
    eyebrowFr: 'Question de sortie · Question 4',
    title: 'What Metals Do Better',
    titleFr: 'Ce que les métaux font mieux',
    subtitle: 'Write **two** things a **metal** can do **better** than a non-metal.',
    subtitleFr: 'Écris **deux** choses qu’un **métal** fait **mieux** qu’un non-métal.',
    reveal: {
      label: 'Answer',
      labelFr: 'Réponse',
      answer: '**Conduct heat** and **conduct electricity**. Also: bend or be hammered into shape without breaking, and ring like a bell.',
      answerFr: '**Conduire la chaleur** et **conduire l’électricité**. Aussi : plier ou prendre forme au marteau sans casser, et sonner comme une cloche.',
    },
  },
]
