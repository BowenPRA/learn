// content/y7-math/U06_1/slides.js
// Year 7 Mathematics · 6.1 Conducting an investigation. One 50-minute period,
// the first of Unit 6 Collecting data, straight after 5.3. Source: Workbook
// Unit 6, Section 6.1 (pp. 73–76); there is no Learner's Book for this unit.
// Every number used in class is original, so Exercise 6.1 is unspent. No
// homework slide.
//
// ENGLISH AND FRENCH ONLY, like every Year 7 deck from Unit 4 / 15 October:
// every string has an …Fr twin and no …Vn twin. The diagrams stay in English.
//
// THE ARC (the shape of Coffee, Carbon and Stars, 3.4 Tides, 5.2 and 5.3):
//   Data        how do most of us come to school? (a guess, kept for later).
//               Mr Bowen's bag, one fact a press: a word, a count or a
//               measure. The three key words; a vote on shoe size; stairs and
//               a ramp (discrete and continuous as English); a standing game.
//   Questions   What happens next? Mr Bowen asks the canteen an open question
//               and draws 30 bars of 1. Give choices; a vote on boxes that
//               overlap; the Workbook's words (critique, suggest, evidence);
//               whiteboards.
//   Our data    everyone measures their hand span; the class survey, one
//               question of each kind, tallied and charted; back to the
//               starter (a prediction); why continuous data goes in groups;
//               is there evidence? The five steps of an investigation, drawn.
//               Three deadpan word problems.
//
// The goals slide (2) and the checklist (23) say the same three things — sort
// data, ask a good question, test a guess — and the starter comes back on
// slide 16.
//
// COPY-DOWN: 5 written panels — three kinds of data (4), a good survey
// question (9), critique and suggest (11), prediction (16), grouped frequency
// table (17) — and 1 drawing: the five steps (19).
//
// WRITING RULE (the 2.5 density): one hook line, short sentences, and the body
// never repeats the write note, a label or the caption.
import { DIAGRAMS } from './diagrams.js'
import { BagStepper } from './bag.jsx'
import { WordCountMeasure } from './game.jsx'
import { SurveyStory } from './story.jsx'
import { OurSurvey } from './survey.jsx'

const TEAL = '#0087a8'
const PURPLE = '#5c2483'
const ORANGE = '#c25e12'
const GREEN = '#4a8b23'
const BLUE = '#1a5fa8'

export const slides = [
  // ════════════════════════════════════════════════════════════════════════
  // DATA — words, counts and measures
  // ════════════════════════════════════════════════════════════════════════

  // 1. Hero + starter: how do most of us come to school? (back on slide 16)
  {
    layout: 'hero',
    color: PURPLE,
    icon: 'Search',
    brand: 'Year 7 Mathematics',
    brandFr: 'Maths 7e année',
    eyebrow: 'Unit 6 · 6.1',
    eyebrowFr: 'Unité 6 · 6.1',
    title: 'Conducting an Investigation',
    titleFr: 'Mener une enquête',
    card: {
      icon: 'Pencil',
      badge: 'Starter',
      badgeFr: 'Pour commencer',
      text: 'How do **most** students in this class come to school? **Guess** and write it down.',
      textFr: 'Comment **la plupart** des élèves de la classe viennent-ils à l’école ? **Devine** et écris-le.',
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
    text: 'Ask a question. **Collect** the answers. **Test** your guess.',
    textFr: 'Pose une question. **Recueille** les réponses. **Teste** ton idée.',
    columns: [
      {
        heading: 'Three kinds',
        headingFr: 'Trois genres',
        accent: PURPLE,
        icon: 'Layers',
        inlineSvg: DIAGRAMS.PIC_KINDS,
        caption: 'Sort facts into three kinds.',
        captionFr: 'Trier des faits en trois genres.',
      },
      {
        heading: 'Good questions',
        headingFr: 'Bonnes questions',
        accent: BLUE,
        icon: 'ListChecks',
        inlineSvg: DIAGRAMS.PIC_FORM,
        caption: 'Write a clear survey question.',
        captionFr: 'Écrire une question claire.',
      },
      {
        heading: 'Our class data',
        headingFr: 'Nos données',
        accent: GREEN,
        icon: 'Users',
        inlineSvg: DIAGRAMS.PIC_CHART,
        caption: 'Test a guess with our answers.',
        captionFr: 'Tester une idée avec nos réponses.',
      },
    ],
  },

  // 3. Say it first: Mr Bowen's bag, one fact a press
  {
    layout: 'showcase',
    accent: TEAL,
    icon: 'Boxes',
    eyebrow: 'Say it first',
    eyebrowFr: 'Dis-le d’abord',
    title: 'Mr Bowen’s Bag',
    titleFr: 'Le sac de M. Bowen',
    widget: BagStepper,
    caption: 'Guess each answer first. A **word**? A number you **count**? Or one you **measure**?',
    captionFr: 'Devine chaque réponse d’abord. Un **mot** ? Un nombre qu’on **compte** ? Ou qu’on **mesure** ?',
  },

  // 4. The three kinds of data (write)
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'Layers',
    eyebrow: 'Key words',
    eyebrowFr: 'Mots clés',
    title: 'Three Kinds of Data',
    titleFr: 'Trois genres de données',
    ratio: 45,
    inlineSvg: DIAGRAMS.KINDS,
    notes: [
      {
        tone: 'write',
        text: '**Data:** facts we collect.\n**Categorical:** a word or a name.\n**Discrete:** you **count** it: 1, 2, 3, nothing between.\n**Continuous:** you **measure** it: any value.',
        textFr: '**Données (data) :** des faits qu’on recueille.\n**Catégorielles (categorical) :** un mot ou un nom.\n**Discrètes (discrete) :** on les **compte** : 1, 2, 3, rien entre.\n**Continues (continuous) :** on les **mesure** : toute valeur.',
      },
      {
        tone: 'info',
        badge: false,
        text: 'A **category** is a group: colours, sports, fruit.',
        textFr: 'Une **catégorie** (category) est un groupe : couleurs, sports, fruits.',
      },
    ],
  },

  // 5. Vote: shoe size
  {
    layout: 'compare',
    accent: PURPLE,
    icon: 'Hand',
    eyebrow: 'Vote with one hand',
    eyebrowFr: 'Vote avec une main',
    title: 'Shoe Size',
    titleFr: 'La pointure',
    text: 'Shoe sizes: **36, 37, 38, 39**… Is shoe size **discrete** or **continuous** data?',
    textFr: 'Les pointures : **36, 37, 38, 39**… La pointure, ce sont des données **discrètes** ou **continues** ?',
    columns: [
      { heading: 'A · left hand up', headingFr: 'A · main gauche levée', accent: BLUE, icon: 'Hand', inlineSvg: DIAGRAMS.ANS_DISCRETE },
      { heading: 'B · right hand up', headingFr: 'B · main droite levée', accent: ORANGE, icon: 'Hand', inlineSvg: DIAGRAMS.ANS_CONTINUOUS },
    ],
  },

  // 6. Answer A: stairs and a ramp (the English of discrete and continuous)
  {
    layout: 'showcase',
    accent: TEAL,
    icon: 'TrendingUp',
    eyebrow: 'Answer: A · English check',
    eyebrowFr: 'Réponse : A · point d’anglais',
    title: 'Stairs and a Ramp',
    titleFr: 'Un escalier et une rampe',
    inlineSvg: DIAGRAMS.STAIRS_RAMP,
    caption: 'On stairs, you stand on a **step**. On a ramp, you can stop **anywhere**.',
    captionFr: 'Dans un escalier, on est sur une **marche**. Sur une rampe, on peut s’arrêter **n’importe où**.',
  },

  // 7. Word, Count or Measure? The whole class, standing
  {
    layout: 'showcase',
    accent: GREEN,
    icon: 'Trophy',
    eyebrow: 'A game · everyone stands',
    eyebrowFr: 'Un jeu · tout le monde debout',
    title: 'Word, Count or Measure?',
    titleFr: 'Mot, compter ou mesurer ?',
    widget: WordCountMeasure,
    caption: 'Everyone shows at once. Wrong? Sit down. The last ones standing win a prize ticket!',
    captionFr: 'Tout le monde montre en même temps. Faux ? Assieds-toi. Les derniers debout gagnent un ticket !',
  },

  // ════════════════════════════════════════════════════════════════════════
  // A GOOD QUESTION — Mr Bowen's canteen survey
  // ════════════════════════════════════════════════════════════════════════

  // 8. What happens next? Mr Bowen's survey (deadpan)
  {
    layout: 'showcase',
    accent: BLUE,
    icon: 'Soup',
    eyebrow: 'What happens next?',
    eyebrowFr: 'Que se passe-t-il ensuite ?',
    title: 'Mr Bowen’s Survey',
    titleFr: 'Le sondage de M. Bowen',
    widget: SurveyStory,
    caption: 'Before each step, **predict**: what happens next?',
    captionFr: 'Avant chaque étape, **prédis** : que se passe-t-il ensuite ?',
  },

  // 9. The answer: give choices (write)
  {
    layout: 'split',
    accent: TEAL,
    icon: 'ListChecks',
    eyebrow: 'The answer',
    eyebrowFr: 'La réponse',
    title: 'Give Choices',
    titleFr: 'Propose des choix',
    ratio: 45,
    inlineSvg: DIAGRAMS.GIVE_CHOICES,
    content: 'Every answer was **different**, so every bar was 1.',
    contentFr: 'Chaque réponse était **différente** : chaque barre valait 1.',
    notes: [
      {
        tone: 'write',
        text: 'A good **survey question** is clear and gives **choices**.',
        textFr: 'Une bonne **question de sondage** (survey question) est claire et propose des **choix**.',
      },
    ],
  },

  // 10. Vote: good question or bad question?
  {
    layout: 'compare',
    accent: PURPLE,
    icon: 'Hand',
    eyebrow: 'Vote with one hand',
    eyebrowFr: 'Vote avec une main',
    title: 'Good Question?',
    titleFr: 'Bonne question ?',
    text: '“How many times a week do you play sport? **0–2**, **2–4** or **4–6**.” A good question?',
    textFr: '« Combien de fois par semaine fais-tu du sport ? **0–2**, **2–4** ou **4–6**. » Une bonne question ?',
    columns: [
      { heading: 'A · left hand up', headingFr: 'A · main gauche levée', accent: BLUE, icon: 'Hand', inlineSvg: DIAGRAMS.ANS_GOOD },
      { heading: 'B · right hand up', headingFr: 'B · main droite levée', accent: ORANGE, icon: 'Hand', inlineSvg: DIAGRAMS.ANS_BAD },
    ],
  },

  // 11. Answer B: what is wrong — critique and suggest (write)
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'MessageSquare',
    eyebrow: 'Answer: B · Workbook words',
    eyebrowFr: 'Réponse : B · mots du cahier',
    title: 'What Is Wrong?',
    titleFr: 'Qu’est-ce qui ne va pas ?',
    ratio: 45,
    inlineSvg: DIAGRAMS.WHAT_WRONG,
    notes: [
      {
        tone: 'write',
        text: '**Critique:** say what is wrong, and why.\n**Suggest:** say how to make it better.',
        textFr: '**Critique (critique) :** dis ce qui ne va pas, et pourquoi.\n**Suggest (suggère) :** dis comment l’améliorer.',
      },
      {
        tone: 'info',
        badge: false,
        text: 'It is not a good question **because**… A better question is…',
        textFr: 'It is not a good question **because**… (parce que) A better question is… (une meilleure question est)',
      },
    ],
    reveal: {
      label: 'A better question',
      labelFr: 'Une meilleure question',
      answer: 'Tick one: **0–1**, **2–3**, **4–5**, **6 or more**. Every answer has **one** box.',
      answerFr: 'Coche une case : **0–1**, **2–3**, **4–5**, **6 ou plus**. Chaque réponse a **une** case.',
    },
  },

  // 12. The Workbook's question words
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

  // 13. Whiteboards: critique and suggest
  {
    layout: 'split',
    accent: GREEN,
    icon: 'PenLine',
    eyebrow: 'Whiteboards · Workbook words',
    eyebrowFr: 'Ardoises · mots du cahier',
    title: 'Critique and Suggest',
    titleFr: 'Critique et suggère',
    ratio: 40,
    inlineSvg: DIAGRAMS.CRITIQUE_Q,
    content: 'Critique each question. Suggest a better one.',
    contentFr: 'Critique chaque question. Propose une meilleure question.',
    reveal: {
      label: 'Check your answers',
      labelFr: 'Vérifie tes réponses',
      answer: '**a** “Often” is not clear. Give choices: **0**, **1–2**, **3–4**, **5 or more** times a week.\n**b** It pushes you to say **yes**. Ask “Which subject do you like best?” and give choices.',
      answerFr: '**a** « Often » (souvent) n’est pas clair. Donne des choix : **0**, **1–2**, **3–4**, **5 ou plus** fois par semaine.\n**b** Elle pousse à dire **oui**. Demande « Quelle matière préfères-tu ? » et donne des choix.',
    },
  },

  // ════════════════════════════════════════════════════════════════════════
  // OUR DATA — the class survey, a prediction, groups, evidence
  // ════════════════════════════════════════════════════════════════════════

  // 14. Everyone measures their hand span
  {
    layout: 'split',
    accent: GREEN,
    icon: 'Ruler',
    eyebrow: 'Try it · everyone',
    eyebrowFr: 'Essaie · tout le monde',
    title: 'Measure Your Hand Span',
    titleFr: 'Mesure ton empan',
    ratio: 45,
    inlineSvg: DIAGRAMS.HAND_SPAN,
    content: 'Spread your hand flat on a ruler. Measure from your **thumb** to your **little finger**, to the nearest **mm**.',
    contentFr: 'Pose ta main bien ouverte sur une règle. Mesure de ton **pouce** à ton **petit doigt**, au **mm** près.',
    notes: [
      {
        tone: 'task',
        badge: 'Whiteboards',
        badgeFr: 'Ardoises',
        text: 'Write your hand span, like **16.8 cm**.',
        textFr: 'Écris ton empan, par exemple **16.8 cm**.',
      },
    ],
  },

  // 15. Our class survey: one question of each kind
  {
    layout: 'showcase',
    accent: GREEN,
    icon: 'Users',
    eyebrow: 'Our data',
    eyebrowFr: 'Nos données',
    title: 'Our Class Survey',
    titleFr: 'Le sondage de la classe',
    widget: OurSurvey,
    caption: 'Hands up for your answer. Count the hands. Before each question: **what kind of data**?',
    captionFr: 'Lève la main pour ta réponse. Compte les mains. Avant chaque question : **quel genre de données** ?',
  },

  // 16. Back to the starter: a prediction (write)
  {
    layout: 'split',
    accent: PURPLE,
    icon: 'Lightbulb',
    eyebrow: 'Back to the starter',
    eyebrowFr: 'Retour au début',
    title: 'Your Prediction',
    titleFr: 'Ta prédiction',
    ratio: 45,
    inlineSvg: DIAGRAMS.SCHOOL_RUN,
    content: 'How do **most** of us come to school? Your starter guess was a **prediction**.',
    contentFr: 'Comment **la plupart** d’entre nous viennent-ils à l’école ? Ta réponse du début était une **prédiction**.',
    notes: [
      {
        tone: 'write',
        text: '**Prediction:** what you think the data will show. Test it with data.',
        textFr: '**Prédiction (prediction) :** ce que tu penses que les données vont montrer. On la teste avec des données.',
      },
      {
        tone: 'info',
        badge: false,
        text: 'My prediction was **correct** / **not correct**, because ___ out of ___ students…',
        textFr: 'My prediction was **correct** / **not correct**, because ___ out of ___ students… (ma prédiction était juste / fausse, car…)',
      },
    ],
  },

  // 17. Why group continuous data? (write)
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'Table',
    eyebrow: 'Key words',
    eyebrowFr: 'Mots clés',
    title: 'Why Group?',
    titleFr: 'Pourquoi des groupes ?',
    ratio: 40,
    inlineSvg: DIAGRAMS.GROUP_IT,
    content: 'Hand spans are **continuous**. Almost every one is different.',
    contentFr: 'Les empans sont **continus**. Presque tous sont différents.',
    notes: [
      {
        tone: 'write',
        text: '**Grouped frequency table:** continuous data in **equal groups**, like 16.0–16.9 cm.',
        textFr: '**Tableau d’effectifs par classes (grouped frequency table) :** des données continues en **groupes égaux**, comme 16.0–16.9 cm.',
      },
    ],
  },

  // 18. Whiteboards: is there evidence? (two steps)
  {
    layout: 'split',
    accent: GREEN,
    icon: 'Search',
    eyebrow: 'Whiteboards · Workbook words',
    eyebrowFr: 'Ardoises · mots du cahier',
    title: 'Is There Evidence?',
    titleFr: 'Y a-t-il une preuve ?',
    ratio: 40,
    inlineSvg: DIAGRAMS.LIBRARY,
    content: 'Mr Bowen predicts: most students like the new library (a score of 4 or 5).\n\n**a** How many students answered?\n\n**b** Is there evidence that most students like it? Give a reason.',
    contentFr: 'M. Bowen prédit : la plupart des élèves aiment la nouvelle bibliothèque (une note de 4 ou 5).\n\n**a** Combien d’élèves ont répondu ?\n\n**b** Y a-t-il une preuve (evidence) que la plupart l’aiment ? Donne une raison.',
    reveal: {
      label: 'Check your answers',
      labelFr: 'Vérifie tes réponses',
      answer: '**a** 3 + 5 + 8 + 14 + 10 = **40** students.\n**b** **Yes.** 14 + 10 = **24** out of 40 chose 4 or 5. That is more than half.',
      answerFr: '**a** 3 + 5 + 8 + 14 + 10 = **40** élèves.\n**b** **Oui.** 14 + 10 = **24** sur 40 ont choisi 4 ou 5. C’est plus de la moitié.',
    },
  },

  // 19. Put it together: the five steps (Draw This)
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'Pencil',
    eyebrow: 'Put it together · draw this',
    eyebrowFr: 'En résumé · à dessiner',
    title: 'Five Steps of an Investigation',
    titleFr: 'Les cinq étapes d’une enquête',
    ratio: 40,
    inlineSvg: DIAGRAMS.INVESTIGATE,
    drawThis: true,
    content: 'Copy the **five steps** and the arrows, with a small picture for each.\n\nToday we did all five.',
    contentFr: 'Recopie les **cinq étapes** et les flèches, avec un petit dessin pour chacune.\n\nAujourd’hui, on a fait les cinq.',
  },

  // ════════════════════════════════════════════════════════════════════════
  // THREE WORD PROBLEMS
  // ════════════════════════════════════════════════════════════════════════

  // 20. Word problem: the joke survey (no box for "not funny")
  {
    layout: 'split',
    accent: GREEN,
    icon: 'PenLine',
    eyebrow: 'Word problem',
    eyebrowFr: 'Problème',
    title: 'Mr Bowen’s Jokes',
    titleFr: 'Les blagues de M. Bowen',
    ratio: 45,
    inlineSvg: DIAGRAMS.JOKES,
    content: 'All 28 students tick a box. Mr Bowen says: “There is **evidence** that my jokes are funny.”\n\nCritique his question.',
    contentFr: 'Les 28 élèves cochent une case. M. Bowen dit : « Il y a une **preuve** que mes blagues sont drôles. »\n\nCritique sa question.',
    reveal: {
      label: 'Check your answer',
      labelFr: 'Vérifie ta réponse',
      answer: 'There is no box for **not funny**, so it is **not** evidence. Better: “Score my jokes from 1 (not funny) to 5 (very funny).”',
      answerFr: 'Il n’y a pas de case **pas drôle**, donc ce n’est **pas** une preuve. Mieux : « Note mes blagues de 1 (pas drôle) à 5 (très drôle). »',
    },
  },

  // 21. Word problem: 26.8 students
  {
    layout: 'callout',
    accent: GREEN,
    icon: 'PenLine',
    eyebrow: 'Word problem',
    eyebrowFr: 'Problème',
    title: 'Mr Bowen’s Class',
    titleFr: 'La classe de M. Bowen',
    content:
      'Mr Bowen counts his class: **27** students. He wants a more accurate answer, so he weighs everyone. Now he says there are **26.8** students.\n\n' +
      'Is the number of students discrete or continuous? Which answer is right?',
    contentFr:
      'M. Bowen compte sa classe : **27** élèves. Il veut une réponse plus précise, alors il pèse tout le monde. Maintenant, il dit qu’il y a **26.8** élèves.\n\n' +
      'Le nombre d’élèves est-il discret ou continu ? Quelle réponse est juste ?',
    reveal: {
      label: 'Check your answer',
      labelFr: 'Vérifie ta réponse',
      answer: '**Discrete:** you count students. **27** is right. Nobody is 0.8 of a student.',
      answerFr: '**Discret :** on compte les élèves. **27** est juste. Personne n’est 0.8 élève.',
    },
  },

  // 22. Word problem: the cat
  {
    layout: 'callout',
    accent: GREEN,
    icon: 'PenLine',
    eyebrow: 'Word problem',
    eyebrowFr: 'Problème',
    title: 'Mr Bowen’s Cat',
    titleFr: 'Le chat de M. Bowen',
    content:
      'Mr Bowen weighs his cat every morning: **4.2 kg**, **4.3 kg**, **4.2 kg**.\n\n' +
      'He says: “This is discrete data, because I have **one** cat.” Is he right?',
    contentFr:
      'M. Bowen pèse son chat chaque matin : **4.2 kg**, **4.3 kg**, **4.2 kg**.\n\n' +
      'Il dit : « Ce sont des données discrètes, car j’ai **un** chat. » A-t-il raison ?',
    reveal: {
      label: 'Check your answer',
      labelFr: 'Vérifie ta réponse',
      answer: '**No.** Mass is **measured**, so it is continuous. The number of cats (1) is discrete.',
      answerFr: '**Non.** La masse se **mesure** : elle est continue. Le nombre de chats (1) est discret.',
    },
  },

  // ── CLOSE ─────────────────────────────────────────────────────────────────
  // 23. Checklist: slide 2's goals, with the key words
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
      { text: 'Sort data: **categorical**, **discrete** or **continuous**.', textFr: 'Trier des données : **catégorielles**, **discrètes** ou **continues**.' },
      { text: '**Critique** a survey question, and **suggest** a better one.', textFr: '**Critiquer** une question de sondage, et en **suggérer** une meilleure.' },
      { text: 'Put continuous data in a **grouped frequency table**.', textFr: 'Mettre des données continues dans un **tableau par classes**.' },
      { text: 'Test a **prediction** with data: **is there evidence?**', textFr: 'Tester une **prédiction** avec des données : **y a-t-il une preuve ?**' },
    ],
  },

  // 24. Exit
  {
    layout: 'hero',
    color: PURPLE,
    icon: 'Target',
    brand: 'Year 7 Mathematics',
    brandFr: 'Maths 7e année',
    eyebrow: 'Exit question',
    eyebrowFr: 'Question de sortie',
    title: 'How Long?',
    titleFr: 'Combien de temps ?',
    subtitle: 'Time spent on homework: what **kind of data**? Write a **survey question** for it, with boxes.',
    subtitleFr: 'Le temps des devoirs : quel **genre de données** ? Écris une **question** avec des cases.',
    reveal: {
      label: 'Answer',
      labelFr: 'Réponse',
      answer: '**Continuous:** time is measured. Boxes: **under 30**, **30–59**, **60–89**, **90 or more** minutes.',
      answerFr: '**Continues :** le temps se mesure. Cases : **moins de 30**, **30–59**, **60–89**, **90 ou plus** minutes.',
    },
  },
]
