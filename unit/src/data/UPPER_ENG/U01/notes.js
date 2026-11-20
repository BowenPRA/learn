// unit/src/data/UPPER_ENG/U01/notes.js
// Upper Secondary English Unit 1 — Complete Sentences (from the Dashboard's GED
// Grammar Foundations 4, Sentence Boundaries), on the layout system. The whole deck is
// one idea: a comma cannot hold two sentences together. Checks on five slides.
//
// How it reads (reworked 20 November 2026 so students can follow it on their own):
// - A line starting ✗ or ✓ is an example sentence and gets a red or green strip;
//   **bold** in it marks the mistake (✗) or the fix (✓); " | tag" adds a label.
//   Never wrap a strip in *italics*: the formatter cannot nest bold inside them.
// - One orange "Write this down" box per slide at most, numbered across the deck
//   by `numbered()` below. "Watch out" (homework tone) is only for a real trap;
//   lists and tips use the quiet blue `tip` tone.
// - Nothing scrolls at 1366×768: a slide that does is two slides.
// Twelve slides; a save made on the old ten-slide deck starts the notes afresh
// (restoreNotes drops a blob whose `total` differs), and the best score stays.

const slides = [
  {
    layout: "hero",
    color: "#e11d48",
    icon: "Scissors",
    eyebrow: "Unit 1",
    title: "Complete Sentences",
    compact: true,
    objective: "Know what a complete sentence needs, spot a fragment, a run-on and a comma splice, and fix each one four different ways.",
    // chips: filled in by numbered() — how many notes to write and questions to answer.
    card: {
      icon: "Scissors",
      badge: "The big idea",
      text: "A comma **cannot** hold two sentences together. Every complete idea needs its own **boundary**: a full stop, a semicolon, or a joining word.",
    },
  },
  {
    layout: "statement",
    accent: "#0087a8",
    title: "What a Sentence Needs",
    text: "Subject + verb + a complete idea.",
    sub: "\"The bus **was** late.\" — who? *the bus* · what happened? *was late* · finished? **yes**.",
    notes: [
      { tone: "write", text: "**Subject** = who or what the sentence is about. **Verb** = what they do or are. A real verb, not just an *-ing* word." },
      { tone: "tip", badge: false, text: "**Test it:** read it alone. Does the reader wait for more? Then it is **not complete**." },
    ],
    check: {
      id: "chk_complete",
      q: "Which one is a complete sentence?",
      options: [
        { val: "A", text: "Waiting for the bus in the rain." },
        { val: "B", text: "The bus was late again." },
        { val: "C", text: "Because the bus was late again." },
      ],
      correct: "B",
      expEn: "B has a subject (the bus), a real verb (was) and a finished idea. A has no subject and no real verb; C starts with \"because\", so the reader waits for the rest.",
    },
  },
  {
    layout: "compare",
    icon: "Layers",
    accent: "#0087a8",
    title: "Independent vs Dependent",
    columns: [
      {
        heading: "Independent clause",
        accent: "#4a8b23",
        icon: "CheckCircle2",
        content: "Subject + verb + complete idea. It **can stand alone**.\n✓ The bus was late.\n✓ We missed the meeting.",
        notes: [{ tone: "write", text: "Every complete sentence has **at least one** independent clause." }],
      },
      {
        heading: "Dependent clause",
        accent: "#c8102e",
        icon: "Link",
        content: "Subject + verb, but it starts with a **subordinator**, so it **cannot stand alone**.\n✗ **Because** the bus was late … | and then?",
        notes: [{ tone: "tip", badge: "Subordinators", icon: "Link", text: "because, although, when, while, if, since, until, after, before, unless" }],
      },
    ],
    check: {
      id: "chk_dependent",
      q: "\"Although the shop was open.\" What is this?",
      options: [
        { val: "A", text: "A complete sentence — it has a subject and a verb." },
        { val: "B", text: "A dependent clause on its own — a fragment." },
      ],
      correct: "B",
      expEn: "A subject and a verb are not enough. \"Although\" is a subordinator, so the clause depends on another idea that never comes. It is a fragment.",
    },
  },
  {
    layout: "split",
    icon: "Link",
    accent: "#c25e12",
    eyebrow: "Fragment 1 of 2",
    title: "Dependent-Clause Fragment",
    content: "✗ We missed the meeting. **Because the bus was late.** | fragment\n\n**Fix:** join it to the sentence it belongs to.\n✓ We missed the meeting **because** the bus was late.\n✓ **Because** the bus was late**,** we missed the meeting.",
    notes: [
      { tone: "write", text: "Dependent clause **first** → comma after it. Dependent clause **second** → no comma." },
    ],
  },
  {
    layout: "split",
    icon: "Ban",
    accent: "#c25e12",
    eyebrow: "Fragment 2 of 2",
    title: "Missing-Verb Fragment",
    content: "✗ My brother **working** at the port.\n✗ The manager, **a tall woman with a loud voice.**\n\n**Fix:** give it a real verb.\n✓ My brother **works** at the port.\n✓ The manager **is** a tall woman with a loud voice.",
    notes: [
      { tone: "write", text: "An **-ing** word alone is not a verb. It needs *is / was / are*, or change it: *working → works*." },
    ],
    check: {
      id: "chk_fragment_fix",
      q: "\"The nurses checking every patient at midnight.\" What is the best fix?",
      options: [
        { val: "A", text: "The nurses check every patient at midnight." },
        { val: "B", text: "Because the nurses checking every patient at midnight." },
        { val: "C", text: "The nurses, checking every patient at midnight." },
      ],
      correct: "A",
      expEn: "The fragment has no real verb — \"checking\" alone does not count. \"Check\" is a full verb. B adds a subordinator on top of the problem, and C only adds a comma.",
    },
  },
  {
    layout: "compare",
    icon: "AlertTriangle",
    accent: "#e11d48",
    title: "Run-On vs Comma Splice",
    columns: [
      {
        heading: "Run-on",
        accent: "#c8102e",
        icon: "Infinity",
        content: "Two complete sentences with **nothing** between them.\n✗ The bus was late **we** missed the meeting.",
        notes: [{ tone: "write", text: "Find the spot where a **new subject** starts a **new idea**. That spot needs a boundary." }],
      },
      {
        heading: "Comma splice",
        accent: "#e11d48",
        icon: "Slash",
        content: "Two complete sentences with **only a comma** between them.\n✗ The bus was late**,** we missed the meeting.",
        notes: [{ tone: "homework", text: "The most common one. A comma is **not** a boundary. Neither is *then*, *however* or *also* after a comma." }],
      },
    ],
  },
  {
    layout: "steps",
    icon: "Wrench",
    accent: "#4a8b23",
    title: "The Four Fixes",
    dense: true,
    content: "✗ The bus was late**,** we missed the meeting. | comma splice",
    steps: [
      { text: "**Full stop**\nTwo sentences.\n✓ The bus was late**.** **W**e missed the meeting." },
      { text: "**Semicolon**\nIdeas closely linked.\n✓ The bus was late**;** we missed the meeting." },
      { text: "**Comma + FANBOYS**\nfor, and, nor, but, or, yet, so\n✓ The bus was late**, so** we missed the meeting." },
      { text: "**Subordinator**\nbecause, although, when …\n✓ **Because** the bus was late, we missed the meeting." },
    ],
    notes: [
      { tone: "write", text: "**Four fixes:** full stop · semicolon · comma + FANBOYS · subordinator." },
    ],
    check: {
      id: "chk_four_fixes",
      q: "Which version is correct?",
      options: [
        { val: "A", text: "It rained all day, the match was cancelled." },
        { val: "B", text: "It rained all day, so the match was cancelled." },
        { val: "C", text: "It rained all day the match was cancelled." },
      ],
      correct: "B",
      expEn: "B joins two complete sentences with a comma + so. A is a comma splice (comma alone), and C is a run-on (nothing at all).",
    },
  },
  {
    layout: "callout",
    icon: "PenLine",
    accent: "#4a8b23",
    eyebrow: "Try it",
    title: "Fix It Two Ways",
    content: "✗ The shop was closed**,** we went home. | comma splice\nFix it **two different ways** in your notebook. Then check.",
    reveal: {
      label: "Show the answers",
      answer: "✓ The shop was closed**, so** we went home. | comma + FANBOYS\n✓ **Because** the shop was closed, we went home. | subordinator\n✓ The shop was closed**;** we went home. | semicolon\n✓ The shop was closed**.** **W**e went home. | full stop",
    },
  },
  {
    layout: "compare",
    icon: "PenLine",
    accent: "#7c3aed",
    title: "Join Your Ideas",
    content: "The essay marker rewards **varied, correctly joined sentences**, not a list of short ones.\n✗ Free buses help workers. They are expensive. The city should try them. | choppy\n✓ **Although** free buses are expensive, they help workers**, so** the city should try them. | joined",
    columns: [
      {
        heading: "Coordination",
        accent: "#c25e12",
        icon: "Equal",
        content: "Two **equal** ideas → comma + **FANBOYS**.\n✓ The plan saves money**, but** it costs jobs.",
      },
      {
        heading: "Subordination",
        accent: "#1a5fa8",
        icon: "GitMerge",
        content: "One idea **depends** on the other → a **subordinator**.\n✓ **Although** the plan saves money, it costs jobs.",
      },
    ],
  },
  {
    layout: "statement",
    icon: "Scale",
    accent: "#7c3aed",
    eyebrow: "Joining words",
    text: "Pick the joiner by **meaning**.",
    notes: [
      { tone: "write", text: "**because** = reason\n**although / but** = contrast\n**so** = result\n**when / while** = time" },
    ],
    check: {
      id: "chk_joiner",
      q: "\"______ the clinic opens at eight, the queue starts at seven.\" Which joiner gives the right meaning?",
      options: [
        { val: "A", text: "Because" },
        { val: "B", text: "Although" },
        { val: "C", text: "So" },
      ],
      correct: "B",
      expEn: "Opening at eight and a queue at seven is a contrast, so \"Although\". \"Because\" gives a reason that makes no sense, and \"So\" would leave a comma splice.",
    },
  },
  {
    layout: "stack",
    icon: "ListChecks",
    accent: "#e11d48",
    title: "Check Every Sentence",
    variant: "checklist",
    columns: 1,
    items: [
      { text: "Does it have a **subject**, a **real verb**, and a **complete idea**?" },
      { text: "Does it start with **because / although / when**? Then it must be **attached** to a complete sentence." },
      { text: "Are there **two complete sentences** inside it? Then a comma alone is a **splice** and nothing at all is a **run-on**." },
      { text: "Fix with **. ; , + FANBOYS** or a **subordinator**, and pick the joiner by meaning." },
    ],
    notes: [
      { tone: "homework", text: "A comma + **however / then / also / therefore** is still a splice. Those words are not FANBOYS." },
    ],
  },
  {
    layout: "hero",
    color: "#14b8a6",
    icon: "CheckCircle2",
    title: "Lesson Complete!",
    subtitle: "You can tell a **complete sentence** from a **fragment**, spot a **run-on** and a **comma splice**, and fix them with a **full stop, a semicolon, comma + FANBOYS, or a subordinator**.",
  },
];

// Number the "Write this down" boxes through the deck ("Write this down · 3 of 7")
// and put the counts on the title slide, so a student knows what the lesson asks
// of them and where they are in it. Counted here so they never drift.
function numbered(deck) {
  // `columns` is an array on a compare slide and a number on a stack slide.
  const writes = deck.flatMap((s) => [...(s.notes || []), ...(Array.isArray(s.columns) ? s.columns : []).flatMap((c) => c.notes || [])])
    .filter((n) => n.tone === "write");
  writes.forEach((n, i) => { n.badge = `Write this down · ${i + 1} of ${writes.length}`; });
  const questions = deck.filter((s) => s.check || s.activity).length;
  deck[0].chips = [
    { icon: "Pencil", text: `${writes.length} things to write down` },
    { icon: "HelpCircle", text: `${questions} questions to answer` },
  ];
  return deck;
}

export const notes = numbered(slides);
