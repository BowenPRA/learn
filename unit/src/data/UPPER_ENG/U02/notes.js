// unit/src/data/UPPER_ENG/U02/notes.js
// Upper Secondary English Unit 2 — The Verb in Every Sentence (Bowen, 21 November 2026,
// from docs/UPPER-ENGLISH-PLAN.md, Stage 1 item 2). The whole deck is one idea: every
// sentence needs a verb, and when nothing happens the verb is "be". Then the -s of
// he / she / it, does and doesn't, the past simple, and "there is / there are" (not "have").
//
// Built the way Unit 1 was reworked on 20 November 2026:
// - A line starting ✗ or ✓ is an example sentence and gets a red or green strip;
//   **bold** in it marks the mistake (✗) or the fix (✓); " | tag" adds a label.
//   Never wrap a strip in *italics*: the formatter cannot nest bold inside them.
// - One orange "Write this down" box per slide at most, numbered across the deck
//   by `numbered()` below. "Watch out" (homework tone) is only for a real trap;
//   lists and tips use the quiet blue `tip` tone.
// - Nothing scrolls at 1366×768: a slide that does is two slides.
// - The checks never reuse a sentence the quiz or the practice uses.

const slides = [
  {
    layout: "hero",
    color: "#2563eb",
    icon: "Zap",
    eyebrow: "Unit 2",
    title: "The Verb in Every Sentence",
    compact: true,
    objective: "Find the verb, use \"be\" where English needs it, put the -s on he / she / it verbs, use the past simple for the past, and write \"there is / there are\".",
    // chips: filled in by numbered() — how many notes to write and questions to answer.
    card: {
      icon: "Zap",
      badge: "The big idea",
      text: "Every sentence needs a **verb**. When nothing happens, the verb is **be**: am, is, are, was, were.",
    },
  },
  {
    layout: "statement",
    accent: "#0087a8",
    title: "Find the Verb",
    text: "No verb, no sentence.",
    content: "✗ She very tired. | no verb\n✓ She **is** very tired.",
    notes: [
      { tone: "tip", badge: false, text: "**From Unit 1:** a sentence needs a subject, a verb and a complete idea. Find the verb first." },
    ],
    check: {
      id: "chk_find_verb",
      q: "\"The pharmacy opens at eight.\" Which word is the verb?",
      options: [
        { val: "A", text: "pharmacy" },
        { val: "B", text: "opens" },
        { val: "C", text: "eight" },
      ],
      correct: "B",
      expEn: "\"Opens\" is what the pharmacy does, so it is the verb. \"Pharmacy\" is the subject, and \"eight\" is a time.",
    },
  },
  {
    layout: "split",
    icon: "Equal",
    accent: "#0087a8",
    title: "The Verb Be",
    content: "✓ I **am** hungry.\n✓ The shop **is** closed.\n✓ My parents **are** at work.\n✓ The film **was** long.\n✓ The roads **were** busy.",
    notes: [
      { tone: "write", text: "**be** now: I **am** · he / she / it **is** · you / we / they **are**\n**be** then: I / he / she / it **was** · you / we / they **were**" },
    ],
  },
  {
    layout: "split",
    icon: "Ban",
    accent: "#c25e12",
    title: "Where Be Goes Missing",
    content: "✗ My brother hungry. | no verb\n\n**be** goes before a describing word, a place or a noun.\n✓ My brother **is** hungry. | describing word\n✓ The keys **are** in the car. | place\n✓ She **is** a nurse. | noun",
    notes: [
      { tone: "tip", badge: false, text: "**From Unit 1:** an -ing word needs be too. They **are** waiting." },
    ],
    check: {
      id: "chk_missing_be",
      q: "Which sentence is correct?",
      options: [
        { val: "A", text: "Our teacher from Canada." },
        { val: "B", text: "Our teacher is from Canada." },
        { val: "C", text: "Our teacher be from Canada." },
      ],
      correct: "B",
      expEn: "\"From Canada\" says where the teacher is from. Nothing happens, so the sentence needs \"be\": our teacher (he or she) is. A has no verb, and \"be\" in C is not changed for the subject.",
    },
  },
  {
    layout: "split",
    icon: "Repeat",
    accent: "#1a5fa8",
    eyebrow: "Now: habits and facts",
    title: "Present Simple",
    content: "For what happens **every day**, **always** or **never**, and for facts.\n✗ My father **work** in a bank. | he → -s\n✓ My father **works** in a bank.\n✓ My parents **work** in a bank. | they → no -s",
    notes: [
      { tone: "write", text: "**he / she / it** + verb**-s**: she works, it opens.\n**I / you / we / they**: no -s." },
      { tone: "tip", badge: false, text: "**my mother, the bus, everyone** = he / she / it." },
    ],
  },
  {
    layout: "steps",
    icon: "SpellCheck",
    accent: "#1a5fa8",
    title: "Spelling the -s",
    dense: true,
    steps: [
      { text: "**+ s**\nmost verbs\nwork → work**s** · play → play**s**" },
      { text: "**+ es**\nafter s, sh, ch, x, o\nwatch → watch**es** · go → go**es**" },
      { text: "**y → ies**\nafter a consonant\nstudy → stud**ies** · carry → carr**ies**" },
      { text: "**have → has**\nits own form\nShe **has** a bike." },
    ],
    check: {
      id: "chk_spell_s",
      q: "\"Every evening my uncle ______ the dishes.\" Which is correct?",
      options: [
        { val: "A", text: "wash" },
        { val: "B", text: "washs" },
        { val: "C", text: "washes" },
      ],
      correct: "C",
      expEn: "My uncle = he, so the verb takes -s. \"Wash\" ends in sh, so it takes -es: washes.",
    },
  },
  {
    layout: "compare",
    icon: "HelpCircle",
    accent: "#7c3aed",
    title: "Don't, Doesn't, Does",
    content: "With **not** or in a question, the -s moves to **does**. The verb goes back to its base form.",
    columns: [
      {
        heading: "he / she / it → does",
        accent: "#c8102e",
        icon: "Ban",
        content: "✗ He **don't** eat meat.\n✓ He **doesn't** eat meat.",
        notes: [{ tone: "write", text: "he / she / it: **does / doesn't** + base verb.\nI / you / we / they: **do / don't** + base verb." }],
      },
      {
        heading: "Only one -s",
        accent: "#4a8b23",
        icon: "CheckCircle2",
        content: "✗ She doesn't **likes** tea.\n✓ She doesn't **like** tea.\n✓ **Does** she **like** tea?",
      },
    ],
  },
  {
    layout: "split",
    icon: "Clock",
    accent: "#e11d48",
    eyebrow: "Then: finished actions",
    title: "Past Simple",
    content: "**yesterday · last week · ago** → past.\n✗ Yesterday I **go** to the market. | past time, present verb\n✓ Yesterday I **went** to the market.\n✓ We **walked** home. | regular: + ed",
    notes: [
      { tone: "write", text: "Regular: + **-ed** (walk → walked).\nTen irregular: was / were · had · went · did · made · got · saw · came · took · said" },
      { tone: "tip", badge: false, text: "The past has no -s: I went, she went." },
    ],
    check: {
      id: "chk_past",
      q: "\"Last summer my cousins ______ to the mountains.\" Which is correct?",
      options: [
        { val: "A", text: "go" },
        { val: "B", text: "goes" },
        { val: "C", text: "went" },
      ],
      correct: "C",
      expEn: "\"Last summer\" is finished, so the verb is past. \"Go\" is irregular: its past is \"went\", the same for everyone.",
    },
  },
  {
    layout: "statement",
    icon: "Ban",
    accent: "#e11d48",
    title: "Didn't + Base Verb",
    text: "**didn't** already says past.",
    content: "✗ I didn't **went** to the party.\n✓ I didn't **go** to the party.\n✗ **Did** you **saw** the news?\n✓ **Did** you **see** the news?",
    check: {
      id: "chk_didnt",
      q: "Which sentence is correct?",
      options: [
        { val: "A", text: "We didn't hear the alarm." },
        { val: "B", text: "We didn't heard the alarm." },
      ],
      correct: "A",
      expEn: "After \"didn't\", use the base verb: hear. \"Didn't\" already shows the past, so \"heard\" says it twice.",
    },
  },
  {
    layout: "split",
    icon: "MapPin",
    accent: "#4a8b23",
    title: "There Is, There Are",
    content: "To say something is in a place, start with **there**. Not **have**.\n✗ In my town **have** a market.\n✓ **There is** a market in my town.\n✓ **There are** two banks on my street.\n✓ **There was** a storm last night.",
    notes: [
      { tone: "write", text: "**there is** + one thing · **there are** + more than one.\nPast: **there was / there were**." },
    ],
    check: {
      id: "chk_there",
      q: "Which sentence is correct?",
      options: [
        { val: "A", text: "Have three hotels near the airport." },
        { val: "B", text: "There is three hotels near the airport." },
        { val: "C", text: "There are three hotels near the airport." },
      ],
      correct: "C",
      expEn: "Three hotels is more than one, so \"there are\". A uses \"have\", which cannot say that something is in a place, and B has \"is\" with more than one.",
    },
  },
  {
    layout: "stack",
    icon: "ListChecks",
    accent: "#2563eb",
    title: "Check Every Verb",
    variant: "checklist",
    columns: 1,
    items: [
      { text: "Does every sentence have a **verb**? If nothing happens, use **am / is / are / was / were**." },
      { text: "Is the subject **he / she / it**? Then **-s**, or **does / doesn't** + the base verb." },
      { text: "Is it **finished**, in the past? Then the past form: walked, went, saw. After **didn't**, the base verb." },
      { text: "Is something **in a place**? Then **there is / there are**, not have." },
    ],
    notes: [
      { tone: "homework", text: "**And from Unit 1:** one complete idea at a time. A comma alone cannot join two sentences." },
    ],
  },
  {
    layout: "hero",
    color: "#14b8a6",
    icon: "CheckCircle2",
    title: "Lesson Complete!",
    subtitle: "You can find the **verb**, use **be** where English needs it, add the **-s** for he / she / it, use the **past simple**, and write **there is / there are**.",
  },
];

// Number the "Write this down" boxes through the deck ("Write this down · 3 of 5")
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
