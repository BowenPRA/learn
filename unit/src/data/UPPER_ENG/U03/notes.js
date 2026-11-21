// unit/src/data/UPPER_ENG/U03/notes.js
// Upper Secondary English Unit 3 — Nouns and Articles (Bowen, 21 November 2026, plan and
// content approved first; docs/UPPER-ENGLISH-PLAN.md, Stage 1 item 3). The whole deck is
// three questions to ask before every noun: one or more? can I count it? does the reader
// know which one? Plurals, things you cannot count, a / an by sound, a then the, and no
// article for things in general.
//
// Built like Units 1 and 2:
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
    color: "#0d9488",
    icon: "Boxes",
    eyebrow: "Unit 3",
    title: "Nouns and Articles",
    compact: true,
    objective: "Make plurals, tell the things you can count from the things you cannot, and choose a, an, the or no article at all.",
    // chips: filled in by numbered() — how many notes to write and questions to answer.
    card: {
      icon: "Boxes",
      badge: "The big idea",
      text: "Before every noun, ask: **one or more?** **Can I count it?** **Does the reader know which one?**",
    },
  },
  {
    layout: "statement",
    accent: "#0087a8",
    title: "One or More?",
    text: "More than one → **-s**.",
    content: "✗ I have two **brother**. | two → -s\n✓ I have two **brothers**.\n✓ I have one brother.",
    notes: [
      { tone: "tip", badge: false, text: "Words like **two, three, many, a few, all** come before a plural." },
    ],
    check: {
      id: "chk_plural",
      q: "Which is correct?",
      options: [
        { val: "A", text: "Three cup of tea, please." },
        { val: "B", text: "Three cups of tea, please." },
      ],
      correct: "B",
      expEn: "Three is more than one, so \"cup\" takes -s: three cups.",
    },
  },
  {
    layout: "steps",
    icon: "SpellCheck",
    accent: "#0087a8",
    title: "Spelling Plurals",
    dense: true,
    steps: [
      { text: "**+ s**\nmost nouns\nbook → book**s**" },
      { text: "**+ es**\nafter s, sh, ch, x\nbus → bus**es** · box → box**es**" },
      { text: "**y → ies**\nafter a consonant\ncity → cit**ies**" },
      { text: "**f → ves**\nknife → kni**ves** · leaf → lea**ves**" },
    ],
    notes: [
      { tone: "write", text: "Irregular plurals: man → **men** · woman → **women** · child → **children** · person → **people** · tooth → **teeth** · foot → **feet**" },
    ],
    check: {
      id: "chk_irregular",
      q: "One child, two ______.",
      options: [
        { val: "A", text: "childs" },
        { val: "B", text: "children" },
        { val: "C", text: "childrens" },
      ],
      correct: "B",
      expEn: "\"Child\" is irregular: one child, two children. \"Children\" is already plural, so it never takes -s.",
    },
  },
  {
    layout: "split",
    icon: "Droplet",
    accent: "#c25e12",
    title: "Count It or Not?",
    // Two strips, not four: four ran the slide 35 px past 1366×768.
    content: "Some things cannot be counted. They take **no a / an** and **no -s**.\n✗ some **informations** · **an advice**\n✓ some **information** · **some advice** · **a piece of** advice",
    notes: [
      { tone: "write", text: "Cannot count: **information · advice · homework · furniture · news · money · water · rice**" },
      { tone: "tip", badge: false, text: "**many** + things you count: many books. **much** + things you cannot: much money. **a lot of** + both." },
    ],
    check: {
      id: "chk_uncount",
      q: "Which is correct?",
      options: [
        { val: "A", text: "My teacher gave me some great advices." },
        { val: "B", text: "My teacher gave me some great advice." },
        { val: "C", text: "My teacher gave me a great advice." },
      ],
      correct: "B",
      expEn: "\"Advice\" cannot be counted, so it takes no -s and no \"a\". To count it, say \"a piece of advice\".",
    },
  },
  {
    layout: "compare",
    icon: "MessageSquare",
    accent: "#7c3aed",
    title: "A or An?",
    content: "Listen to the **first sound**, not the first letter.",
    columns: [
      {
        heading: "a + consonant sound",
        accent: "#1a5fa8",
        icon: "CheckCircle2",
        content: "✓ **a** book\n✓ **a** university | sounds like \"you\"\n✓ **a** one-way ticket | sounds like \"won\"",
      },
      {
        heading: "an + vowel sound",
        accent: "#4a8b23",
        icon: "CheckCircle2",
        content: "✓ **an** apple\n✓ **an** egg\n✓ **an** hour | the h is silent",
      },
    ],
    check: {
      id: "chk_a_an",
      q: "\"The film lasted ______ hour.\"",
      options: [
        { val: "A", text: "a" },
        { val: "B", text: "an" },
      ],
      correct: "B",
      expEn: "The h in \"hour\" is silent, so the word starts with a vowel sound: an hour.",
    },
  },
  {
    layout: "split",
    icon: "Ban",
    accent: "#e11d48",
    title: "One Thing Needs a Word in Front",
    content: "One thing you can count never stands alone.\n✗ I have **car**.\n✓ I have **a** car.\n✗ She is **teacher**. | jobs too\n✓ She is **a** teacher.",
    notes: [
      { tone: "write", text: "One thing you can count needs **a / an / the / my / this** in front: **a** car, **the** car, **my** car." },
    ],
  },
  {
    layout: "split",
    icon: "Eye",
    accent: "#1a5fa8",
    title: "A, Then The",
    content: "**a / an** the first time. **the** when the reader knows which one.\n✓ I bought **a** jacket and **a** hat. **The** jacket was cheap.\n✓ **the** sun · **the** internet | there is only one\n✓ Please close **the** door. | we both know which",
    notes: [
      { tone: "write", text: "**a / an**: the reader does not know which one yet.\n**the**: the reader knows which one." },
    ],
    check: {
      id: "chk_a_the",
      q: "\"I saw ______ dog in the street. ______ dog was very thin.\"",
      options: [
        { val: "A", text: "a … The" },
        { val: "B", text: "the … A" },
        { val: "C", text: "a … A" },
      ],
      correct: "A",
      expEn: "The first time, the reader does not know which dog: a dog. After that, the reader knows: the dog.",
    },
  },
  {
    layout: "split",
    icon: "Globe",
    accent: "#4a8b23",
    eyebrow: "All of them, not some",
    title: "No Article: Things in General",
    content: "✗ **The** dogs need exercise. | meaning all dogs\n✓ **Dogs** need exercise.\n✓ **Water** boils at 100 °C.\n✓ I like **music**.",
    notes: [
      { tone: "write", text: "Things in general: plural or cannot-count noun, **no article**. **Dogs** are loyal. **Rice** is cheap." },
    ],
    check: {
      id: "chk_general",
      q: "\"Doctors say that ______ is good for everyone.\"",
      options: [
        { val: "A", text: "the exercise" },
        { val: "B", text: "exercise" },
      ],
      correct: "B",
      expEn: "This is about exercise in general, not one particular exercise, so there is no article.",
    },
  },
  {
    layout: "callout",
    icon: "PenLine",
    accent: "#0d9488",
    eyebrow: "Try it",
    title: "Four Noun Mistakes",
    content: "✗ My uncle is farmer. He grows rices and vegetable on a small farm. He always gives me good advices.\nFind the four mistakes. Fix them in your notebook. Then check.",
    reveal: {
      label: "Show the answers",
      answer: "✓ My uncle is **a** farmer. | one job\n✓ He grows **rice** and **vegetables** on a small farm. | cannot count · more than one\n✓ He always gives me good **advice**. | cannot count",
    },
  },
  {
    layout: "stack",
    icon: "ListChecks",
    accent: "#0d9488",
    title: "Check Every Noun",
    variant: "checklist",
    columns: 1,
    items: [
      { text: "**One or more?** More than one → -s, or the irregular form: children, people." },
      { text: "**Can I count it?** If not: no a / an, no -s. information, advice, homework." },
      { text: "**One thing I can count?** Then a / an / the / my in front. **a** or **an** by the sound." },
      { text: "**Does the reader know which one?** Yes → the. All of them, in general → no article." },
    ],
    notes: [
      { tone: "homework", text: "**And from Units 1 and 2:** every sentence has a verb, and a comma alone cannot join two sentences." },
    ],
  },
  {
    layout: "hero",
    color: "#14b8a6",
    icon: "CheckCircle2",
    title: "Lesson Complete!",
    subtitle: "You can make **plurals**, spot the things you **cannot count**, choose **a** or **an** by sound, and decide between **a**, **the** and **no article**.",
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
