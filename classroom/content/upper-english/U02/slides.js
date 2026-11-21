// content/upper-english/U02/slides.js
// Upper Secondary English · Unit 2 · The Verb in Every Sentence. The class version of
// the Unit 2 notes (/unit/#/UPPER_ENG/U02/lesson), taught from the projector in about
// 30 minutes. Staff only, like Unit 1's: the class follows along on the notes.
// Bowen, 21 November 2026: yes to a class deck like Unit 1's (16 slides or less, based
// on the notes, not over-designed).
//
// ENGLISH ONLY: the course sets bilingual: false, so there is no language switch and
// no …Vn / …Fr twins.
//
// THE ARC: starter ("In my town have a big market. It very busy on Saturdays." Two
// mistakes) → find the verb → be, and where it goes missing → present simple and the -s
// → don't / doesn't / does → past simple and didn't → there is / there are → back to the
// starter → checklist → exit question. The notes' six questions are here as two votes
// (C options dropped to make them A or B) and four answer boxes.
//
// COPY-DOWN: 5 written items, the same 5 as the notes, numbered on their badges:
// slides 3, 6, 8, 10 and 13.
//
// EXAMPLES: a wrong sentence is a red note with a ✗; a right one is a green note with a
// ✓. Bold marks the mistake or the fix. There is no italic in the decks (TRAPS.md).

const BLUE = '#2563eb'
const TEAL = '#0087a8'
const NAVY = '#1a5fa8'
const ORANGE = '#c25e12'
const RED = '#c8102e'
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
    color: BLUE,
    icon: 'Zap',
    brand: 'Upper Secondary English',
    eyebrow: 'Unit 2',
    title: 'The Verb in Every Sentence',
    card: {
      icon: 'Pencil',
      badge: 'Starter',
      text: '**In my town have a big market. It very busy on Saturdays.** There are two mistakes. Write both sentences correctly.',
    },
  },

  // 2. Find the verb
  {
    layout: 'split',
    icon: 'Search',
    accent: TEAL,
    title: 'Find the Verb',
    content: 'No verb, no sentence.',
    notes: [
      wrong('She very tired.'),
      right('She **is** very tired.'),
    ],
    reveal: {
      label: 'Answer',
      prompt: '“The pharmacy opens at eight.” Which word is the verb?',
      answer: '**opens:** what the pharmacy does. “The pharmacy” is the subject.',
    },
  },

  // 3. The verb be
  {
    layout: 'split',
    icon: 'Equal',
    accent: TEAL,
    title: 'The Verb Be',
    content: 'When nothing happens, the verb is **be**.',
    notes: [
      right('I **am** hungry. The shop **is** closed. My parents **are** at work.'),
      right('The film **was** long. The roads **were** busy.'),
      write(1, '**be** now: I am · he / she / it is · you / we / they are\n**be** then: I / he / she / it was · you / we / they were'),
    ],
  },

  // 4. Where be goes missing
  {
    layout: 'split',
    icon: 'Ban',
    accent: ORANGE,
    title: 'Where Be Goes Missing',
    content: '**be** goes before a describing word, a place or a noun.',
    notes: [
      wrong('My brother hungry.'),
      right('My brother **is** hungry.'),
      right('The keys **are** in the car.'),
      right('She **is** a nurse.'),
      tip('**From Unit 1:** an -ing word needs be too. They **are** waiting.'),
    ],
  },

  // 5. Vote
  {
    layout: 'callout',
    accent: NAVY,
    icon: 'Hand',
    eyebrow: 'Left hand A · right hand B',
    title: 'Which One Is Correct?',
    content: '**A** · Our teacher from Canada.\n\n**B** · Our teacher is from Canada.',
    reveal: {
      label: 'Answer',
      answer: '**B.** Nothing happens, so the sentence needs be. A has no verb.',
    },
  },

  // 6. Present simple
  {
    layout: 'split',
    icon: 'Repeat',
    accent: NAVY,
    eyebrow: 'Now: habits and facts',
    title: 'Present Simple',
    content: 'For what happens every day, always or never, and for facts.',
    notes: [
      wrong('My father **work** in a bank.'),
      right('My father **works** in a bank.'),
      right('My parents **work** in a bank.'),
      write(2, '**he / she / it** + verb-s: she works, it opens.\nI / you / we / they: no -s.'),
    ],
  },

  // 7. Spelling the -s (a split, not a stack: the stack layout has no answer box)
  {
    layout: 'split',
    icon: 'SpellCheck',
    accent: NAVY,
    title: 'Spelling the -s',
    // Plain lines, not four cards: the cards and the answer box ran 114 px off at 1440×900.
    content: '**+ s** (most verbs): work → works · play → plays\n**+ es** (after s, sh, ch, x, o): watch → watches · go → goes\n**y → ies** (after a consonant): study → studies\n**have → has**',
    reveal: {
      label: 'Answer',
      prompt: '“Every evening my uncle ______ the dishes.” wash, washs or washes?',
      answer: '**washes.** My uncle = he, and wash ends in sh.',
    },
  },

  // 8. Don't, doesn't, does
  {
    layout: 'compare',
    icon: 'HelpCircle',
    accent: PURPLE,
    title: 'Don’t, Doesn’t, Does',
    text: 'With not or in a question, the -s moves to **does**.',
    columns: [
      {
        heading: 'he / she / it → does',
        accent: RED,
        icon: 'Ban',
        notes: [
          wrong('He **don’t** eat meat.'),
          right('He **doesn’t** eat meat.'),
          write(3, 'he / she / it: **does / doesn’t** + base verb. I / you / we / they: **do / don’t** + base verb.'),
        ],
      },
      {
        heading: 'Only one -s',
        accent: GREEN,
        icon: 'CheckCircle2',
        notes: [
          wrong('She doesn’t **likes** tea.'),
          right('She doesn’t **like** tea.'),
          right('**Does** she **like** tea?'),
        ],
      },
    ],
  },

  // 9. Whiteboards
  {
    layout: 'callout',
    accent: PURPLE,
    icon: 'PenLine',
    eyebrow: 'Whiteboards',
    title: 'Not, Then a Question',
    content: '**My cousin plays the piano.**\nWrite it with **not**. Then write it as a **question**.',
    reveal: {
      label: 'Answers',
      answer: 'My cousin **doesn’t play** the piano.\n**Does** my cousin **play** the piano?',
    },
  },

  // 10. Past simple
  {
    layout: 'split',
    icon: 'Clock',
    accent: ROSE,
    eyebrow: 'Then: finished actions',
    title: 'Past Simple',
    content: '**yesterday · last week · ago** → past.',
    notes: [
      wrong('Yesterday I **go** to the market.'),
      right('Yesterday I **went** to the market.'),
      write(4, 'Regular: + **-ed** (walk → walked).\nTen irregular: was / were · had · went · did · made · got · saw · came · took · said'),
      tip('The past has no -s: I went, she went.'),
    ],
  },

  // 11. Vote
  {
    layout: 'callout',
    accent: NAVY,
    icon: 'Hand',
    eyebrow: 'Left hand A · right hand B',
    title: '“Last summer my cousins ______ to the mountains.”',
    content: '**A** · go\n\n**B** · went',
    reveal: {
      label: 'Answer',
      answer: '**B.** Last summer is finished, so the past. Go → went.',
    },
  },

  // 12. Didn't + base verb
  {
    layout: 'split',
    icon: 'Ban',
    accent: ROSE,
    title: 'Didn’t + Base Verb',
    content: '**didn’t** already says past.',
    notes: [
      wrong('I didn’t **went** to the party.'),
      right('I didn’t **go** to the party. **Did** you **see** the news?'),
    ],
    reveal: {
      label: 'Answer',
      prompt: '“We didn’t ______ the alarm.” hear or heard?',
      answer: '**hear.** After didn’t, the base verb.',
    },
  },

  // 13. There is, there are
  {
    layout: 'split',
    icon: 'MapPin',
    accent: GREEN,
    title: 'There Is, There Are',
    content: 'Something is in a place → start with **there**. Not have.',
    notes: [
      wrong('In my town **have** a market.'),
      right('**There is** a market in my town. **There are** two banks.'),
      write(5, '**there is** + one thing · **there are** + more than one. Past: **there was / there were**.'),
    ],
    reveal: {
      label: 'Answer',
      prompt: '“______ three hotels near the airport.” There is or there are?',
      answer: '**There are.** Three hotels is more than one.',
    },
  },

  // 14. Back to the starter
  {
    layout: 'callout',
    accent: BLUE,
    icon: 'PenLine',
    eyebrow: 'Back to the starter · whiteboards',
    title: 'Fix Both Sentences',
    content: '**In my town have a big market. It very busy on Saturdays.**',
    reveal: {
      label: 'Answer',
      answer: '**There is** a big market in my town. It **is** very busy on Saturdays.',
    },
  },

  // 15. Checklist
  {
    layout: 'stack',
    variant: 'checklist',
    columns: 1,
    icon: 'ListChecks',
    accent: BLUE,
    title: 'Check Every Verb',
    content: 'Your notebook should now have **5** written notes.',
    items: [
      { text: 'Every sentence has a **verb**. Nothing happens? Use **am / is / are / was / were**.' },
      { text: '**he / she / it**: -s, or **does / doesn’t** + the base verb.' },
      { text: 'Finished? The **past**. After **didn’t**, the base verb.' },
      { text: 'Something in a place? **There is / there are**, not have.' },
    ],
  },

  // 16. Exit question
  {
    layout: 'callout',
    accent: BLUE,
    icon: 'HelpCircle',
    eyebrow: 'Exit question',
    title: 'Fix the Two Verbs',
    content: '**My sister work in a hotel. Last week she meet a famous singer.**',
    reveal: {
      label: 'Answer',
      answer: 'My sister **works** in a hotel. Last week she **met** a famous singer.',
    },
  },
]
