// content/upper-english/U03/slides.js
// Upper Secondary English · Unit 3 · Nouns and Articles. The class version of the Unit 3
// notes (/unit/#/UPPER_ENG/U03/lesson), taught from the projector in about 30 minutes.
// Staff only, like Units 1 and 2: the class follows along on the notes.
// Bowen, 21 November 2026: plan and content approved ("Yes, build it"), with a class deck
// like Unit 2's (16 slides or less, based on the notes, not over-designed).
//
// ENGLISH ONLY: the course sets bilingual: false, so there is no language switch and
// no …Vn / …Fr twins.
//
// THE ARC: starter ("I need an advice. My brother is teacher, and he has three child."
// Three mistakes) → one or more → spelling plurals → count it or not → a or an → one thing
// needs a word in front → a, then the → no article for things in general → try it → back
// to the starter → checklist → exit question. The notes' six questions are here as three
// votes, two answer boxes and one whiteboard round.
//
// COPY-DOWN: 5 written items, the same 5 as the notes, numbered on their badges:
// slides 3, 5, 9, 10 and 11.
//
// EXAMPLES: a wrong sentence is a red note with a ✗; a right one is a green note with a
// ✓. Bold marks the mistake or the fix. There is no italic in the decks (TRAPS.md).
// At most four notes on a slide, and no answer box on a stack slide (it has none): Unit
// 2's deck ran over at 1440×900 until both were true.

const TEAL = '#0d9488'
const SKY = '#0087a8'
const NAVY = '#1a5fa8'
const ORANGE = '#c25e12'
const ROSE = '#e11d48'
const GREEN = '#4a8b23'
const PURPLE = '#7c3aed'

const wrong = (text) => ({ tone: 'homework', badge: false, text: `✗ ${text}` })
const right = (text) => ({ tone: 'plant', badge: false, text: `✓ ${text}` })
const write = (n, text) => ({ tone: 'write', badge: `Write This Down · ${n} of 5`, text })
const tip = (text) => ({ tone: 'theory', badge: false, text })

export const slides = [
  // 1. Starter
  {
    layout: 'hero',
    color: TEAL,
    icon: 'Boxes',
    brand: 'Upper Secondary English',
    eyebrow: 'Unit 3',
    title: 'Nouns and Articles',
    card: {
      icon: 'Pencil',
      badge: 'Starter',
      text: '**I need an advice. My brother is teacher, and he has three child.** There are three mistakes. Write it correctly.',
    },
  },

  // 2. One or more?
  {
    layout: 'split',
    icon: 'Layers',
    accent: SKY,
    title: 'One or More?',
    content: 'More than one → **-s**.',
    notes: [
      wrong('I have two **brother**.'),
      right('I have two **brothers**.'),
      tip('**two, three, many, a few, all** come before a plural.'),
    ],
    reveal: {
      label: 'Answer',
      prompt: '“Three cup of tea” or “three cups of tea”?',
      answer: '**Three cups.** Three is more than one.',
    },
  },

  // 3. Spelling plurals
  {
    layout: 'split',
    icon: 'PenTool',
    accent: SKY,
    title: 'Spelling Plurals',
    content: '**+ s**: book → books\n**+ es** (after s, sh, ch, x): bus → buses · box → boxes\n**y → ies** (after a consonant): city → cities\n**f → ves**: knife → knives · leaf → leaves',
    notes: [
      write(1, 'Irregular: man → **men** · woman → **women** · child → **children** · person → **people** · tooth → **teeth** · foot → **feet**'),
    ],
  },

  // 4. Vote
  {
    layout: 'callout',
    accent: NAVY,
    icon: 'Hand',
    eyebrow: 'Left hand A · right hand B',
    title: 'One Child, Two ______',
    content: '**A** · childs\n\n**B** · children',
    reveal: {
      label: 'Answer',
      answer: '**B.** Child is irregular. Children is already plural: never childrens.',
    },
  },

  // 5. Count it or not?
  {
    layout: 'split',
    icon: 'Droplet',
    accent: ORANGE,
    title: 'Count It or Not?',
    content: 'Some things cannot be counted: **no a / an, no -s**.',
    notes: [
      wrong('some **informations** · **an advice**'),
      right('some **information** · **some advice** · **a piece of** advice'),
      write(2, 'Cannot count: information · advice · homework · furniture · news · money · water · rice'),
      tip('**many** + count (many books) · **much** + not count (much money) · **a lot of** + both'),
    ],
  },

  // 6. Vote
  {
    layout: 'callout',
    accent: NAVY,
    icon: 'Hand',
    eyebrow: 'Left hand A · right hand B',
    title: '“My teacher gave me some great ______.”',
    content: '**A** · advices\n\n**B** · advice',
    reveal: {
      label: 'Answer',
      answer: '**B.** Advice cannot be counted: no -s. To count it: a piece of advice.',
    },
  },

  // 7. A or an?
  {
    layout: 'compare',
    icon: 'MessageSquare',
    accent: PURPLE,
    title: 'A or An?',
    text: 'Listen to the first **sound**, not the first letter.',
    columns: [
      {
        heading: 'a + consonant sound',
        accent: NAVY,
        icon: 'CheckCircle2',
        notes: [right('**a** book · **a** university')],
      },
      {
        heading: 'an + vowel sound',
        accent: GREEN,
        icon: 'CheckCircle2',
        notes: [right('**an** apple · **an** hour')],
      },
    ],
  },

  // 8. Whiteboards
  {
    layout: 'callout',
    accent: PURPLE,
    icon: 'PenLine',
    eyebrow: 'Whiteboards',
    title: 'Five Words: A or An?',
    content: '**___ orange · ___ uniform · ___ hour · ___ egg · ___ one-way ticket**',
    reveal: {
      label: 'Answers',
      answer: '**an** orange · **a** uniform (“you”) · **an** hour (silent h) · **an** egg · **a** one-way ticket (“won”)',
    },
  },

  // 9. One thing needs a word in front
  {
    layout: 'split',
    icon: 'CircleSlash',
    accent: ROSE,
    title: 'One Thing Needs a Word in Front',
    content: 'One thing you can count never stands alone. Jobs too.',
    notes: [
      wrong('I have **car**. She is **teacher**.'),
      right('I have **a** car. She is **a** teacher.'),
      write(3, 'One thing you can count needs **a / an / the / my / this** in front.'),
    ],
  },

  // 10. A, then the
  {
    layout: 'split',
    icon: 'ScanEye',
    accent: NAVY,
    title: 'A, Then The',
    content: '**a / an** the first time. **the** when the reader knows which one.',
    notes: [
      right('I bought **a** jacket and **a** hat. **The** jacket was cheap.'),
      right('**the** sun · **the** internet · close **the** door'),
      write(4, '**a / an**: the reader does not know which one yet. **the**: the reader knows which one.'),
    ],
    reveal: {
      label: 'Answer',
      prompt: '“I saw ___ dog in the street. ___ dog was very thin.”',
      answer: '**a … The.** First time a; after that the reader knows which dog.',
    },
  },

  // 11. No article: things in general
  {
    layout: 'split',
    icon: 'Globe',
    accent: GREEN,
    eyebrow: 'All of them, not some',
    title: 'No Article: Things in General',
    notes: [
      wrong('**The** dogs need exercise. (meaning all dogs)'),
      right('**Dogs** need exercise. **Water** boils at 100 °C.'),
      write(5, 'Things in general: plural or cannot-count noun, **no article**. **Dogs** are loyal. **Rice** is cheap.'),
    ],
  },

  // 12. Vote
  {
    layout: 'callout',
    accent: NAVY,
    icon: 'Hand',
    eyebrow: 'Left hand A · right hand B',
    title: '“Doctors say that ______ is good for everyone.”',
    content: '**A** · the exercise\n\n**B** · exercise',
    reveal: {
      label: 'Answer',
      answer: '**B.** Exercise in general, not one particular exercise: no article.',
    },
  },

  // 13. Try it
  {
    layout: 'callout',
    accent: TEAL,
    icon: 'PenLine',
    eyebrow: 'Whiteboards',
    title: 'Four Noun Mistakes',
    content: '**My uncle is farmer. He grows rices and vegetable on a small farm. He always gives me good advices.**',
    reveal: {
      label: 'Answer',
      answer: 'My uncle is **a** farmer. He grows **rice** and **vegetables** on a small farm. He always gives me good **advice**.',
    },
  },

  // 14. Back to the starter
  {
    layout: 'callout',
    accent: TEAL,
    icon: 'PenLine',
    eyebrow: 'Back to the starter',
    title: 'Fix It Now',
    content: '**I need an advice. My brother is teacher, and he has three child.**',
    reveal: {
      label: 'Answer',
      answer: 'I need **some advice** (or **a piece of** advice). My brother is **a** teacher, and he has three **children**.',
    },
  },

  // 15. Checklist
  {
    layout: 'stack',
    variant: 'checklist',
    columns: 1,
    icon: 'ListChecks',
    accent: TEAL,
    title: 'Check Every Noun',
    content: 'Your notebook should now have **5** written notes.',
    items: [
      { text: '**One or more?** -s, or the irregular form: children, people.' },
      { text: '**Can I count it?** If not: no a / an, no -s.' },
      { text: '**One thing?** a / an / the / my in front. a or an by the sound.' },
      { text: '**Which one?** The reader knows → the. In general → nothing.' },
    ],
  },

  // 16. Exit question
  {
    layout: 'callout',
    accent: TEAL,
    icon: 'HelpCircle',
    eyebrow: 'Exit question',
    title: 'Fix the Three Nouns',
    content: '**We need two loaf of bread and a milk from an shop.**',
    reveal: {
      label: 'Answer',
      answer: 'We need two **loaves** of bread and **some** milk from **the** shop (or **a** shop).',
    },
  },
]
