// content/upper-english/U01/slides.js
// Upper Secondary English · Unit 1 · Complete Sentences. The class version of the
// Unit 1 notes (/unit/#/UPPER_ENG/U01/lesson), taught from the projector in about
// 30 minutes; students open the same deck from "Lessons from class" and click along.
// Bowen, 20 November 2026: 16 slides or less, based on the notes, not over-designed.
//
// ENGLISH ONLY: the course sets bilingual: false, so there is no language switch and
// no …Vn / …Fr twins (the English track is a normal English class, not an ESL one).
//
// THE ARC: starter (is "The bus was late, we missed the meeting." correct?) → what a
// sentence needs → independent vs dependent → two kinds of fragment → run-on vs comma
// splice (back to the starter: no) → the four fixes → whiteboards → joining ideas and
// picking the joiner → checklist → exit question. Four left-hand / right-hand votes
// carry the notes' check questions (C options dropped to make them A or B).
//
// COPY-DOWN: 7 written items, the same 7 as the notes, numbered on their badges:
// slides 2, 4, 6, 7, 9, 10 (an orange bumper) and 14. No drawings.
//
// EXAMPLES: a wrong sentence is a red note with no strip and a ✗; a right one is a
// green note with a ✓. Bold marks the mistake or the fix. There is no italic in the
// decks (TRAPS.md).

const ROSE = '#e11d48'
const TEAL = '#0087a8'
const BLUE = '#1a5fa8'
const ORANGE = '#c25e12'
const RED = '#c8102e'
const GREEN = '#4a8b23'
const PURPLE = '#5c2483'

const wrong = (text) => ({ tone: 'homework', badge: false, text: `✗ ${text}` })
const right = (text) => ({ tone: 'plant', badge: false, text: `✓ ${text}` })
const write = (n, text) => ({ tone: 'write', badge: `Write This Down · ${n} of 7`, text })
const tip = (badge, text) => ({ tone: 'theory', badge, icon: 'Lightbulb', text })

export const slides = [
  // 1. Starter
  {
    layout: 'hero',
    color: ROSE,
    icon: 'PenLine',
    brand: 'Upper Secondary English',
    eyebrow: 'Unit 1',
    title: 'Complete Sentences',
    card: {
      icon: 'Pencil',
      badge: 'Starter',
      text: '**The bus was late, we missed the meeting.** Is this sentence correct? Write **yes** or **no**, and why.',
    },
  },

  // 2. The rule
  {
    layout: 'statement',
    accent: TEAL,
    title: 'What a Sentence Needs',
    text: 'Subject + verb + a complete idea.',
    sub: '“The bus **was** late.” Who? the bus. What happened? was late. Finished? **Yes.**',
    notes: [
      write(1, '**Subject:** who or what the sentence is about. **Verb:** what they do or are. A real verb, not just an -ing word.'),
    ],
  },

  // 3. Vote
  {
    layout: 'callout',
    accent: BLUE,
    icon: 'Hand',
    eyebrow: 'Left hand A · right hand B',
    title: 'Which One Is a Complete Sentence?',
    content: '**A** · Waiting for the bus in the rain.\n\n**B** · The bus was late again.',
    // The test from the notes' rule slide, here where the class uses it (it ran
    // slide 2 off the projector at 1366×768).
    notes: [{ tone: 'theory', badge: false, text: '**Test it:** read each one alone. Does the reader wait for more? Then it is not complete.' }],
    reveal: {
      label: 'Answer',
      answer: '**B.** A subject (the bus), a real verb (was) and a finished idea.\n**A** has no subject and no real verb.',
    },
  },

  // 4. Independent vs dependent
  {
    layout: 'compare',
    icon: 'Layers',
    accent: TEAL,
    title: 'Independent vs Dependent',
    columns: [
      {
        heading: 'Independent clause',
        accent: GREEN,
        icon: 'CheckCircle2',
        content: 'Subject + verb + complete idea. It **can stand alone**.',
        notes: [
          right('The bus was late.'),
          write(2, 'Every complete sentence has **at least one** independent clause.'),
        ],
      },
      {
        heading: 'Dependent clause',
        accent: RED,
        icon: 'CircleSlash',
        content: 'Subject + verb, but it starts with a **subordinator**, so it **cannot stand alone**.',
        notes: [
          wrong('**Because** the bus was late … (and then?)'),
          tip('Subordinators', 'because, although, when, while, if, since, until, after, before, unless'),
        ],
      },
    ],
  },

  // 5. Vote
  {
    layout: 'callout',
    accent: BLUE,
    icon: 'Hand',
    eyebrow: 'Left hand A · right hand B',
    title: '“Although the shop was open.”',
    content: '**A** · A complete sentence. It has a subject and a verb.\n\n**B** · A dependent clause on its own: a fragment.',
    reveal: {
      label: 'Answer',
      answer: '**B.** “Although” is a subordinator. The idea it waits for never comes.',
    },
  },

  // 6. Fragment 1
  {
    layout: 'split',
    icon: 'CircleSlash',
    accent: ORANGE,
    eyebrow: 'Fragment 1 of 2',
    title: 'Dependent-Clause Fragment',
    content: 'A dependent clause alone. **Fix:** join it to the sentence it belongs to.',
    notes: [
      wrong('We missed the meeting. **Because the bus was late.**'),
      right('We missed the meeting **because** the bus was late.'),
      right('**Because** the bus was late**,** we missed the meeting.'),
      write(3, 'Dependent clause **first** → comma after it. Dependent clause **second** → no comma.'),
    ],
  },

  // 7. Fragment 2
  {
    layout: 'split',
    icon: 'CircleSlash',
    accent: ORANGE,
    eyebrow: 'Fragment 2 of 2',
    title: 'Missing-Verb Fragment',
    notes: [
      wrong('My brother **working** at the port.'),
      right('My brother **works** at the port.'),
      wrong('The manager, **a tall woman with a loud voice.**'),
      right('The manager **is** a tall woman with a loud voice.'),
      write(4, 'An **-ing** word alone is not a verb. It needs is / was / are, or change it: working → works.'),
    ],
  },

  // 8. Vote
  {
    layout: 'callout',
    accent: BLUE,
    icon: 'Hand',
    eyebrow: 'Left hand A · right hand B',
    title: 'The Best Fix?',
    content: '“The nurses checking every patient at midnight.”\n\n**A** · The nurses check every patient at midnight.\n\n**B** · The nurses, checking every patient at midnight.',
    reveal: {
      label: 'Answer',
      answer: '**A.** “Check” is a real verb. B only adds a comma: still no verb.',
    },
  },

  // 9. Run-on vs comma splice (back to the starter)
  {
    layout: 'compare',
    icon: 'AlertTriangle',
    accent: ROSE,
    eyebrow: 'Back to the starter',
    title: 'Run-On vs Comma Splice',
    text: 'The starter: **no**. It is a comma splice.',
    columns: [
      {
        heading: 'Run-on',
        accent: RED,
        icon: 'Repeat',
        content: 'Two complete sentences with **nothing** between them.',
        notes: [
          wrong('The bus was late **we** missed the meeting.'),
          write(5, 'Find where a **new subject** starts a **new idea**. That spot needs a boundary.'),
        ],
      },
      {
        heading: 'Comma splice',
        accent: ROSE,
        icon: 'AlertTriangle',
        content: 'Two complete sentences with **only a comma** between them.',
        notes: [
          wrong('The bus was late**,** we missed the meeting.'),
          { tone: 'homework', badge: 'Watch Out', icon: 'AlertTriangle', text: 'A comma is **not** a boundary. Neither is then, however or also after a comma.' },
        ],
      },
    ],
  },

  // 10. The four fixes
  // A stack of four cards, not `steps`: four step rows and the bumper ran 148 px
  // off the slide, and the player's steps layout has no compact setting.
  {
    layout: 'stack',
    columns: 2,
    icon: 'Hammer',
    accent: GREEN,
    title: 'The Four Fixes',
    content: 'Start: **The bus was late, we missed the meeting.**\n> **Write This Down · 6 of 7.** Four fixes: full stop · semicolon · comma + FANBOYS (for, and, nor, but, or, yet, so) · subordinator (because, although, when …).',
    notes: [
      { tone: 'plant', badge: '1 · Full stop', icon: 'CheckCircle2', text: 'The bus was late**.** **W**e missed the meeting.' },
      { tone: 'plant', badge: '2 · Semicolon: ideas closely linked', icon: 'CheckCircle2', text: 'The bus was late**;** we missed the meeting.' },
      { tone: 'plant', badge: '3 · Comma + FANBOYS', icon: 'CheckCircle2', text: 'The bus was late**, so** we missed the meeting.' },
      { tone: 'plant', badge: '4 · Subordinator', icon: 'CheckCircle2', text: '**Because** the bus was late, we missed the meeting.' },
    ],
  },

  // 11. Whiteboards
  {
    layout: 'callout',
    accent: GREEN,
    icon: 'PenLine',
    eyebrow: 'Whiteboards',
    title: 'Fix It Two Ways',
    content: '**The shop was closed, we went home.**',
    reveal: {
      label: 'Four answers',
      answer: 'The shop was closed**, so** we went home.\n**Because** the shop was closed, we went home.\nThe shop was closed**;** we went home.\nThe shop was closed**.** **W**e went home.',
    },
  },

  // 12. Vote
  {
    layout: 'callout',
    accent: BLUE,
    icon: 'Hand',
    eyebrow: 'Left hand A · right hand B',
    title: 'Which Version Is Correct?',
    content: '**A** · It rained all day, the match was cancelled.\n\n**B** · It rained all day, so the match was cancelled.',
    reveal: {
      label: 'Answer',
      answer: '**B.** A comma + so joins two complete sentences. A is a comma splice.',
    },
  },

  // 13. Join your ideas
  {
    layout: 'compare',
    icon: 'Plus',
    accent: PURPLE,
    title: 'Join Your Ideas',
    text: 'Join short sentences. Never with a comma alone.',
    columns: [
      {
        heading: 'Coordination',
        accent: ORANGE,
        icon: 'Equal',
        content: 'Two **equal** ideas → comma + **FANBOYS**.',
        notes: [right('The plan saves money**, but** it costs jobs.')],
      },
      {
        heading: 'Subordination',
        accent: BLUE,
        icon: 'Layers',
        content: 'One idea **depends** on the other → a **subordinator**.',
        notes: [right('**Although** the plan saves money, it costs jobs.')],
      },
    ],
  },

  // 14. Pick the joiner by meaning
  {
    layout: 'split',
    icon: 'Scale',
    accent: PURPLE,
    title: 'Pick the Joiner by Meaning',
    notes: [
      write(7, '**because** = reason\n**although / but** = contrast\n**so** = result\n**when / while** = time'),
    ],
    reveal: {
      label: 'Answer',
      prompt: '“______ the clinic opens at eight, the queue starts at seven.” Which joiner?',
      answer: '**Although.** Opening at eight and a queue at seven is a contrast.',
    },
  },

  // 15. Checklist
  {
    layout: 'stack',
    variant: 'checklist',
    columns: 1,
    icon: 'ListChecks',
    accent: ROSE,
    title: 'Can You Do These?',
    content: 'Your notebook should now have **7** written notes.',
    items: [
      { text: 'Say what a sentence needs: a **subject**, a **real verb** and a **complete idea**.' },
      { text: 'Spot a **fragment** and fix it.' },
      { text: 'Spot a **run-on** and a **comma splice**.' },
      { text: 'Fix them **four ways**, and pick the joiner by **meaning**.' },
    ],
  },

  // 16. Exit question: a callout, not a hero, so the four answers fit the
  // projector (the hero's big icon ran them 60 px off at 1366×768).
  {
    layout: 'callout',
    accent: ROSE,
    icon: 'HelpCircle',
    eyebrow: 'Exit question',
    title: 'Fix This Sentence Two Ways',
    content: '**My sister loves music, she plays the guitar every day.**',
    reveal: {
      label: 'Answers',
      answer: 'My sister loves music**, so** she plays the guitar every day.\n**Because** my sister loves music, she plays the guitar every day.\nMy sister loves music**;** she plays the guitar every day.\nMy sister loves music**.** **S**he plays the guitar every day.',
    },
  },
]
