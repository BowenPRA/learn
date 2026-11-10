// content/y7-math/U05_2/slides.js
// Year 7 Mathematics · 5.2 Intersecting lines. One 50-minute period, straight
// after 5.1 A sum of 360° (Monday 26 October), whose straight-line fact (180°)
// and two-step method it keeps using. Source: Workbook Unit 5, Section 5.2
// (pp. 68–70); there is no Learner's Book for this unit. Every number used in
// class is original, so Exercise 5.2 is still unspent. No homework slide.
//
// ENGLISH AND FRENCH ONLY, like every Year 7 deck from Unit 4 / 15 October:
// every string has an …Fr twin and no …Vn twin. The diagrams stay in English.
//
// THE ARC (the shape of Coffee, Carbon and Stars and 3.4 Tides; plan.js has
// the timings):
//   Two lines   Mr Bowen opens his scissors: the blades make 30°, what do the
//               handles make? Opening them 15° a press: the handles copy the
//               blades, a side is 180° minus them, and at 90° all four are
//               right angles. Vertically opposite (real scissors), the English
//               of a reason (because), parallel and perpendicular (a level
//               crossing from above, then arms), how to read a diagram
//               (number, letter, small square, arrows), whiteboards.
//   Parallel    What happens next? Mr Bowen's bookshelf, put up by eye. Two
//               votes settled by pictures: the same place (slide it down: it
//               fits, an F) and between the lines (the same place, then
//               opposite: a Z). Students act it out with rulers; the model
//               turns the line, slides it, and bends a track; the class stands
//               for Equal or Not?, with a trap round. X, F and Z, drawn.
//   The book    the Workbook's question words, then practice in them: x, y, z;
//               back to Mr Bowen's shelves (explain why); which statement is
//               correct (no arrows). Three deadpan word problems, each sillier.
//
// The goals slide (2) and the checklist (25) say the same three things —
// scissors, railway tracks, a road across the tracks — so the lesson ends
// where it said it would; the starter comes back on slide 4 and the story on
// slide 20.
//
// COPY-DOWN: 5 written panels — vertically opposite (5), parallel and
// perpendicular (7), corresponding (12), alternate (15), give a reason (17) —
// and 1 drawing: X, F and Z (17). Each panel is the fact only; a line that goes
// with it sits underneath, to read.
//
// WRITING RULE (the 2.5 density): one hook line, short sentences, and the body
// never repeats the write note, a label or the caption.
import { DIAGRAMS } from './diagrams.js'
import { ScissorsStepper } from './scissors.jsx'
import { ShelfStory } from './story.jsx'
import { CrossTracks, EqualOrNot } from './tracks.jsx'

const TEAL = '#0087a8'
const PURPLE = '#5c2483'
const ORANGE = '#c25e12'
const GREEN = '#4a8b23'
const BLUE = '#1a5fa8'

export const slides = [
  // ════════════════════════════════════════════════════════════════════════
  // TWO LINES CROSS — Mr Bowen's scissors
  // ════════════════════════════════════════════════════════════════════════

  // 1. Hero + starter: the handles
  {
    layout: 'hero',
    color: PURPLE,
    icon: 'Hash',
    brand: 'Year 7 Mathematics',
    brandFr: 'Maths 7e année',
    eyebrow: 'Unit 5 · 5.2',
    eyebrowFr: 'Unité 5 · 5.2',
    title: 'Intersecting Lines',
    titleFr: 'Les droites sécantes',
    card: {
      icon: 'Pencil',
      badge: 'Starter',
      badgeFr: 'Pour commencer',
      text: 'Mr Bowen opens his scissors. The **blades** make an angle of **30°**. What angle do the **handles** make? **Guess** and write it down.',
      textFr: 'M. Bowen ouvre ses ciseaux. Les **lames** font un angle de **30°**. Quel angle font les **poignées** ? **Devine** et écris-le.',
    },
  },

  // 2. Today's goals (the checklist on slide 25 ticks off the same three)
  {
    layout: 'compare',
    accent: TEAL,
    icon: 'Target',
    eyebrow: 'Today',
    eyebrowFr: 'Aujourd’hui',
    title: 'Today You Will…',
    titleFr: 'Aujourd’hui, tu vas…',
    text: 'Find angles where lines **cross**. Then say **why**.',
    textFr: 'Trouver les angles là où des droites se **croisent**. Puis dire **pourquoi**.',
    columns: [
      {
        heading: 'Scissors',
        headingFr: 'Les ciseaux',
        accent: TEAL,
        icon: 'X',
        inlineSvg: DIAGRAMS.PIC_X,
        caption: 'Find all four angles from one.',
        captionFr: 'Avec un angle, trouver les trois autres.',
      },
      {
        heading: 'Railway tracks',
        headingFr: 'Les rails',
        accent: BLUE,
        icon: 'Equal',
        inlineSvg: DIAGRAMS.PIC_TRACKS,
        caption: 'Spot lines that never meet.',
        captionFr: 'Repérer des droites qui ne se coupent pas.',
      },
      {
        heading: 'A road across the tracks',
        headingFr: 'Une route sur les rails',
        accent: ORANGE,
        icon: 'Hash',
        inlineSvg: DIAGRAMS.PIC_ROAD,
        caption: 'Use one angle to find seven more.',
        captionFr: 'Avec un angle, trouver les sept autres.',
      },
    ],
  },

  // 3. The scissors stepper: say it first
  {
    layout: 'showcase',
    accent: TEAL,
    icon: 'X',
    eyebrow: 'Say it first',
    eyebrowFr: 'Dis-le d’abord',
    title: 'Mr Bowen’s Scissors',
    titleFr: 'Les ciseaux de M. Bowen',
    widget: ScissorsStepper,
    caption: 'One press = **15°** wider. Say the **handles** and each **side** first.',
    captionFr: 'Un clic = **15°** de plus. Dis d’abord les **poignées** et chaque **côté**.',
  },

  // 4. Back to the starter
  {
    layout: 'statement',
    accent: PURPLE,
    eyebrow: 'Back to the starter',
    eyebrowFr: 'Retour au début',
    title: 'The Handles',
    titleFr: 'Les poignées',
    text: 'The blades make **30°**. What angle do the **handles** make?',
    textFr: 'Les lames font **30°**. Quel angle font les **poignées** ?',
    reveal: {
      label: 'Answer',
      labelFr: 'Réponse',
      answer: '**30°**, the same. They are **opposite** each other.\nEach side: 180° − 30° = **150°**.',
      answerFr: '**30°**, pareil. Elles sont **opposées**.\nChaque côté : 180° − 30° = **150°**.',
    },
  },

  // 5. Vertically opposite angles (write), on real scissors
  {
    layout: 'split',
    accent: TEAL,
    icon: 'X',
    eyebrow: 'Key word',
    eyebrowFr: 'Mot clé',
    title: 'Vertically Opposite Angles',
    titleFr: 'Angles opposés par le sommet',
    ratio: 45,
    inlineSvg: DIAGRAMS.SCISSORS_PHOTO,
    content: '**Vertically** here is not “up and down”. It means at the **vertex**: the point where the lines cross.',
    contentFr: '**Vertically** ne veut pas dire « de haut en bas ». Il veut dire au **sommet** (vertex) : le point où les droites se croisent.',
    notes: [
      {
        tone: 'write',
        text: '**Vertically opposite angles** are equal.',
        textFr: '**Les angles opposés par le sommet (vertically opposite angles)** sont égaux.',
      },
      {
        tone: 'info',
        badge: false,
        text: 'Angles **next to** each other make a straight line: **180°** together.',
        textFr: 'Des angles **côte à côte** font une ligne droite : **180°** ensemble.',
      },
    ],
  },

  // 6. English check: the answer, because, the reason
  {
    layout: 'showcase',
    accent: PURPLE,
    icon: 'MessageSquare',
    eyebrow: 'English check',
    eyebrowFr: 'Point d’anglais',
    title: 'Say Why',
    titleFr: 'Dis pourquoi',
    inlineSvg: DIAGRAMS.SAY_WHY,
    caption: 'Read both sentences out loud.',
    captionFr: 'Lis les deux phrases à voix haute. **Because** = parce que.',
  },

  // 7. Parallel and perpendicular (write), from above a level crossing
  {
    layout: 'split',
    accent: BLUE,
    icon: 'Equal',
    eyebrow: 'Key words',
    eyebrowFr: 'Mots clés',
    title: 'Parallel and Perpendicular',
    titleFr: 'Parallèles et perpendiculaires',
    ratio: 45,
    inlineSvg: DIAGRAMS.TRACKS_PHOTO,
    notes: [
      {
        tone: 'write',
        text: '**Parallel lines:** always the same distance apart. They never meet.\n**Perpendicular lines:** meet at a **right angle** (90°).',
        textFr: '**Droites parallèles (parallel) :** toujours à la même distance. Elles ne se coupent jamais.\n**Droites perpendiculaires (perpendicular) :** se coupent à **angle droit** (90°).',
      },
      {
        tone: 'task',
        badge: 'Try it',
        badgeFr: 'Essaie',
        text: 'Show me with your arms! Both up: **parallel**. One up, one out: **perpendicular**.',
        textFr: 'Montre avec tes bras ! Les deux en haut : **parallèles**. Un en haut, un sur le côté : **perpendiculaires**.',
      },
    ],
  },

  // 8. How to read the diagram: number, letter, small square, arrows
  {
    layout: 'showcase',
    accent: PURPLE,
    icon: 'ScanEye',
    eyebrow: 'Read the picture',
    eyebrowFr: 'Lis le dessin',
    title: 'How to Read the Diagram',
    titleFr: 'Comment lire le dessin',
    inlineSvg: DIAGRAMS.READ,
    caption: '**No arrows?** Then do **not** guess that the lines are parallel.',
    captionFr: '**Pas de flèches ?** Alors ne **devine** pas que les droites sont parallèles.',
  },

  // 9. Whiteboards: two lines cross
  {
    layout: 'split',
    accent: GREEN,
    icon: 'PenLine',
    eyebrow: 'Whiteboards · say why',
    eyebrowFr: 'Ardoises · dis pourquoi',
    title: 'Find a, b and c',
    titleFr: 'Trouve a, b et c',
    ratio: 40,
    inlineSvg: DIAGRAMS.CROSS_Q,
    content: 'Give a **reason** for each.',
    contentFr: 'Donne une **raison** pour chacun.',
    reveal: {
      label: 'Check your answers',
      labelFr: 'Vérifie tes réponses',
      answer: '**a = 115°** because they are vertically opposite angles.\n**b = 180° − 115° = 65°** because angles on a straight line add up to 180°.\n**c = 65°** because b and c are vertically opposite.',
      answerFr: '**a = 115°** car ce sont des angles opposés par le sommet.\n**b = 180° − 115° = 65°** car les angles sur une ligne droite font 180°.\n**c = 65°** car b et c sont opposés par le sommet.',
    },
  },

  // ════════════════════════════════════════════════════════════════════════
  // A LINE ACROSS PARALLEL LINES — Mr Bowen's bookshelf
  // ════════════════════════════════════════════════════════════════════════

  // 10. What happens next? Mr Bowen's bookshelf, one panel per press (deadpan)
  {
    layout: 'showcase',
    accent: BLUE,
    icon: 'BookOpen',
    eyebrow: 'What happens next?',
    eyebrowFr: 'Que se passe-t-il ensuite ?',
    title: 'Mr Bowen’s Bookshelf',
    titleFr: 'Les étagères de M. Bowen',
    widget: ShelfStory,
    caption: 'Before each step, **predict**: what happens next?',
    captionFr: 'Avant chaque étape, **prédis** : que se passe-t-il ensuite ?',
  },

  // 11. Vote: the same place, or the mirror?
  {
    layout: 'compare',
    accent: PURPLE,
    icon: 'Hand',
    eyebrow: 'Vote with one hand',
    eyebrowFr: 'Vote avec une main',
    title: 'Which Angle Is 70°?',
    titleFr: 'Quel angle fait 70° ?',
    text: 'The two lines are **parallel**. Which angle at the bottom is **also 70°**?',
    textFr: 'Les deux droites sont **parallèles**. Quel angle, en bas, fait **aussi 70°** ?',
    columns: [
      { heading: 'A · left hand up', headingFr: 'A · main gauche levée', accent: BLUE, icon: 'Hand', inlineSvg: DIAGRAMS.ANS_F_A },
      { heading: 'B · right hand up', headingFr: 'B · main droite levée', accent: ORANGE, icon: 'Hand', inlineSvg: DIAGRAMS.ANS_F_B },
    ],
  },

  // 12. Answer A: slide it down and it fits (write); act it out with rulers
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Users',
    eyebrow: 'Answer: A · try it',
    eyebrowFr: 'Réponse : A · essaie',
    title: 'Corresponding Angles',
    titleFr: 'Les angles correspondants',
    ratio: 45,
    inlineSvg: DIAGRAMS.SLIDE_DOWN,
    notes: [
      {
        tone: 'write',
        text: 'Where a line crosses two **parallel** lines, **corresponding angles** are equal.',
        textFr: 'Quand une droite coupe deux droites **parallèles**, les **angles correspondants (corresponding angles)** sont égaux.',
      },
      {
        tone: 'task',
        badge: 'Try it',
        badgeFr: 'Essaie',
        text: 'Two students hold rulers **parallel**. A third holds a ruler **across** both. Turn it: are the two angles still the same? Now tilt one ruler.',
        textFr: 'Deux élèves tiennent des règles **parallèles**. Un troisième tient une règle **en travers** des deux. Tourne-la : les deux angles sont-ils toujours pareils ? Maintenant, penche une règle.',
      },
    ],
  },

  // 13. The model: turn the line, slide it down, bend a track
  {
    layout: 'showcase',
    accent: BLUE,
    icon: 'RotateCcw',
    eyebrow: 'A model',
    eyebrowFr: 'Un modèle',
    title: 'Cross the Tracks',
    titleFr: 'Traverse les rails',
    widget: CrossTracks,
    caption: 'Say the **bottom** angles first. Then slide it down to check.',
    captionFr: 'Dis d’abord les angles du **bas**. Puis fais-la glisser pour vérifier.',
  },

  // 14. Vote: between the lines
  {
    layout: 'compare',
    accent: PURPLE,
    icon: 'Hand',
    eyebrow: 'Vote with one hand',
    eyebrowFr: 'Vote avec une main',
    title: 'Between the Lines',
    titleFr: 'Entre les droites',
    text: 'The lines are **parallel**. Between them, which angle is **also 70°**?',
    textFr: 'Les droites sont **parallèles**. Entre elles, quel angle fait **aussi 70°** ?',
    columns: [
      { heading: 'A · left hand up', headingFr: 'A · main gauche levée', accent: BLUE, icon: 'Hand', inlineSvg: DIAGRAMS.ANS_Z_A },
      { heading: 'B · right hand up', headingFr: 'B · main droite levée', accent: ORANGE, icon: 'Hand', inlineSvg: DIAGRAMS.ANS_Z_B },
    ],
  },

  // 15. Answer A: the same place, then opposite — a Z (write)
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Zap',
    eyebrow: 'Answer: A',
    eyebrowFr: 'Réponse : A',
    title: 'Alternate Angles',
    titleFr: 'Les angles alternes-internes',
    ratio: 45,
    inlineSvg: DIAGRAMS.Z_PROOF,
    notes: [
      {
        tone: 'write',
        text: 'Where a line crosses two **parallel** lines, **alternate angles** are equal.',
        textFr: 'Quand une droite coupe deux droites **parallèles**, les **angles alternes-internes (alternate angles)** sont égaux.',
      },
      {
        tone: 'info',
        badge: false,
        text: 'B is **110°**: the two angles between the lines on the **same side** make 180°.',
        textFr: 'B fait **110°** : les deux angles entre les droites, du **même côté**, font 180°.',
      },
    ],
  },

  // 16. Equal or Not? The whole class, standing
  {
    layout: 'showcase',
    accent: GREEN,
    icon: 'Trophy',
    eyebrow: 'A game · everyone stands',
    eyebrowFr: 'Un jeu · tout le monde debout',
    title: 'Equal or Not?',
    titleFr: 'Égaux ou pas ?',
    widget: EqualOrNot,
    caption: '**Arms up:** equal. **Arms down:** not equal. The last ones standing win a prize ticket!',
    captionFr: '**Bras en haut :** égaux. **Bras en bas :** pas égaux. Les derniers debout gagnent un ticket !',
  },

  // 17. X, F and Z: put it together (write + Draw This)
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'Pencil',
    eyebrow: 'Put it together · draw this',
    eyebrowFr: 'En résumé · à dessiner',
    title: 'X, F and Z',
    titleFr: 'X, F et Z',
    ratio: 50,
    inlineSvg: DIAGRAMS.XFZ,
    drawThis: true,
    content: 'Copy the **X**, the **F** and the **Z**, with their names. Mark the equal angles.',
    contentFr: 'Recopie le **X**, le **F** et le **Z**, avec leurs noms. Marque les angles égaux.',
    notes: [
      {
        tone: 'write',
        text: '**Give a reason:** write the angle fact after **because**.',
        textFr: '**Donne une raison (give a reason) :** écris la propriété après **because** (parce que).',
      },
      {
        tone: 'info',
        badge: false,
        text: '**b = 70° because they are alternate angles.**',
        textFr: '**b = 70° because they are alternate angles.** (car ce sont des angles alternes-internes)',
      },
    ],
  },

  // ════════════════════════════════════════════════════════════════════════
  // THE WORKBOOK'S ENGLISH — then three word problems
  // ════════════════════════════════════════════════════════════════════════

  // 18. The Workbook's question words
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

  // 19. Whiteboards, in the Workbook's words: two steps, then two Zs
  {
    layout: 'split',
    accent: GREEN,
    icon: 'CheckCircle2',
    eyebrow: 'Whiteboards · Workbook words',
    eyebrowFr: 'Ardoises · mots du cahier',
    title: 'Calculate x, y and z',
    titleFr: 'Calcule x, y et z',
    ratio: 40,
    inlineSvg: DIAGRAMS.PRACTICE,
    content: 'Calculate the size of the angles that have letters.\n\nGive a reason for each.',
    contentFr: 'Calculate the size of the angles that have letters : calcule les angles qui ont une lettre.\n\nDonne une raison pour chacun.',
    reveal: {
      label: 'Check your answers',
      labelFr: 'Vérifie tes réponses',
      answer: '**x:** 48° + 75° = 123°, then 180° − 123° = **57°** because angles on a straight line add up to 180°.\n**y = 48°** because they are alternate angles.\n**z = 57°** because z and x are alternate angles.',
      answerFr: '**x :** 48° + 75° = 123°, puis 180° − 123° = **57°** car les angles sur une ligne droite font 180°.\n**y = 48°** car ce sont des angles alternes-internes.\n**z = 57°** car z et x sont alternes-internes.',
    },
  },

  // 20. Back to the bookshelf: explain why
  {
    layout: 'split',
    accent: BLUE,
    icon: 'BookOpen',
    eyebrow: 'Back to the bookshelf · explain why',
    eyebrowFr: 'Retour aux étagères · explique pourquoi',
    title: 'Which Shelf?',
    titleFr: 'Quelle étagère ?',
    ratio: 45,
    inlineSvg: DIAGRAMS.SHELVES,
    content: 'Mr Bowen measures the angle where each shelf meets the side.\n\nWhich shelf is **not** parallel to the others? **Explain why.**',
    contentFr: 'M. Bowen mesure l’angle entre chaque étagère et le montant.\n\nQuelle étagère n’est **pas** parallèle aux autres ? **Explain why** (explique pourquoi).',
    reveal: {
      label: 'Answer',
      labelFr: 'Réponse',
      answer: '**B.** A and C meet the side at **90°**, B at **82°**. These are corresponding angles, and they are not equal. So B is **not** parallel.',
      answerFr: '**B.** A et C font **90°** avec le montant, B fait **82°**. Ce sont des angles correspondants, et ils ne sont pas égaux. Donc B n’est **pas** parallèle.',
    },
  },

  // 21. Which statement is correct? (no arrows)
  {
    layout: 'split',
    accent: PURPLE,
    icon: 'HelpCircle',
    eyebrow: 'Workbook words',
    eyebrowFr: 'Mots du cahier',
    title: 'Which Statement Is Correct?',
    titleFr: 'Quelle phrase est correcte ?',
    ratio: 45,
    inlineSvg: DIAGRAMS.STATEMENTS,
    content: 'Which statement, **A**, **B** or **C**, is correct? Give a reason.\n\n**A** x = 65°\n**B** x = 115°\n**C** You need more information.',
    contentFr: 'Quelle phrase, **A**, **B** ou **C**, est correcte ? Donne une raison.\n\n**A** x = 65°\n**B** x = 115°\n**C** You need more information (il faut plus d’informations).',
    reveal: {
      label: 'Answer',
      labelFr: 'Réponse',
      answer: '**C.** There are no arrows, so we do not know if the lines are parallel.',
      answerFr: '**C.** Il n’y a pas de flèches, donc on ne sait pas si les droites sont parallèles.',
    },
  },

  // 22. Word problem: the ladder (the 6 steps do not matter)
  {
    layout: 'split',
    accent: GREEN,
    icon: 'PenLine',
    eyebrow: 'Word problem',
    eyebrowFr: 'Problème',
    title: 'Mr Bowen’s Ladder',
    titleFr: 'L’échelle de M. Bowen',
    ratio: 45,
    inlineSvg: DIAGRAMS.LADDER,
    content: 'Mr Bowen’s ladder has **6** steps. The steps are **parallel**.\n\nThe side meets the bottom step at **87°**. What angle does it make with the **top** step? Give a reason.',
    contentFr: 'L’échelle de M. Bowen a **6** barreaux. Les barreaux sont **parallèles**.\n\nLe montant fait **87°** avec le barreau du bas. Quel angle fait-il avec le barreau du **haut** ? Donne une raison.',
    reveal: {
      label: 'Check your answer',
      labelFr: 'Vérifie ta réponse',
      answer: '**87°** because they are corresponding angles. (All 6 steps: 87°.)',
      answerFr: '**87°** car ce sont des angles correspondants. (Les 6 barreaux : 87°.)',
    },
  },

  // 23. Word problem: the pizza
  {
    layout: 'split',
    accent: GREEN,
    icon: 'PenLine',
    eyebrow: 'Word problem',
    eyebrowFr: 'Problème',
    title: 'Mr Bowen’s Pizza',
    titleFr: 'La pizza de M. Bowen',
    ratio: 45,
    inlineSvg: DIAGRAMS.PIZZA,
    content: 'Mr Bowen cuts a pizza with **two straight cuts**. One slice is **50°**.\n\nHe eats the **two biggest** slices. He shares the rest between **25** students. What angle does each student get?',
    contentFr: 'M. Bowen coupe une pizza avec **deux coupes droites**. Une part fait **50°**.\n\nIl mange les **deux plus grosses** parts. Il partage le reste entre **25** élèves. Quel angle reçoit chaque élève ?',
    reveal: {
      label: 'Check your answer',
      labelFr: 'Vérifie ta réponse',
      answer: 'Each big slice: 180° − 50° = **130°**. Left: 50° + 50° = **100°**.\n100° ÷ 25 = **4°** each.',
      answerFr: 'Chaque grosse part : 180° − 50° = **130°**. Il reste 50° + 50° = **100°**.\n100° ÷ 25 = **4°** chacun.',
    },
  },

  // 24. Word problem: the walk
  {
    layout: 'callout',
    accent: GREEN,
    icon: 'PenLine',
    eyebrow: 'Word problem',
    eyebrowFr: 'Problème',
    title: 'Mr Bowen’s Walk',
    titleFr: 'La promenade de M. Bowen',
    content:
      'Two railway rails are **parallel**. They are **1.4 m** apart.\n\n' +
      'Mr Bowen walks beside them for **300 km**, to find where they meet. How far apart are they at the end?',
    contentFr:
      'Deux rails sont **parallèles**. Ils sont à **1.4 m** l’un de l’autre.\n\n' +
      'M. Bowen marche à côté sur **300 km**, pour trouver où ils se rejoignent. Quelle distance les sépare à la fin ?',
    reveal: {
      label: 'Check your answer',
      labelFr: 'Vérifie ta réponse',
      answer: '**1.4 m.** Parallel lines never meet. He is still walking.',
      answerFr: '**1.4 m.** Des droites parallèles ne se rejoignent jamais. Il marche encore.',
    },
  },

  // ── CLOSE ─────────────────────────────────────────────────────────────────
  // 25. Checklist: slide 2's goals, with the key words
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
      { text: 'Find **vertically opposite** angles where two lines cross.', textFr: 'Trouver des angles **opposés par le sommet**.' },
      { text: 'Say what **parallel** and **perpendicular** lines are.', textFr: 'Dire ce que sont des droites **parallèles** et **perpendiculaires**.' },
      { text: 'Use **corresponding** and **alternate** angles on parallel lines.', textFr: 'Utiliser les angles **correspondants** et **alternes-internes**.' },
      { text: 'Give a **reason**: “… **because** they are … angles.”', textFr: 'Donner une **raison** : « … **because** they are … angles. »' },
    ],
  },

  // 26. Exit
  {
    layout: 'hero',
    color: PURPLE,
    icon: 'Target',
    brand: 'Year 7 Mathematics',
    brandFr: 'Maths 7e année',
    eyebrow: 'Exit question',
    eyebrowFr: 'Question de sortie',
    title: 'Across Parallel Lines',
    titleFr: 'Sur deux parallèles',
    subtitle: 'A line crosses two **parallel** lines. One angle is **65°**. What is its **corresponding** angle? Its **alternate** angle? The angle **next to it**?',
    subtitleFr: 'Un angle fait **65°**. Son angle **correspondant** ? Son angle **alterne-interne** ? L’angle **à côté** ?',
    reveal: {
      label: 'Answer',
      labelFr: 'Réponse',
      answer: 'Corresponding: **65°**. Alternate: **65°**. Next to it: 180° − 65° = **115°**.',
      answerFr: 'Correspondant : **65°**. Alterne-interne : **65°**. À côté : 180° − 65° = **115°**.',
    },
  },
]
