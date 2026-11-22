// unit/src/data/UPPER_MATH/U01/notes.js
// Upper Secondary Maths Unit 1 — Solving Equations, the self-study lesson (Bowen,
// 21 November 2026: an algebra track on solving equations, "not too overwhelming").
// One idea runs through it: an equation is a balance, so whatever you do to one side
// you do to the other. Then grouping: x terms with x terms, numbers with numbers.
//
// Reworked 22 November 2026 (Bowen: "the -9 under the +9 and 14 respectively … talk
// about grouping with like terms, constants with constants … add more polish"; plan and
// mock-up approved first). Every worked example is now a `work` slide
// (layouts/WorkLayout.jsx, components/math/NotebookWorking.jsx): the move written under
// the term it undoes on both sides, x terms blue and numbers amber (the Balance chips'
// colours), the words for each move in the margin, one step at a time, then the check.
// New slide 8, Two Kinds of Terms, with the Year 7 sort; slide 9 groups like terms in
// coloured boxes and ends with a typed "collect the like terms"; brackets became two
// slides (arrows from the number outside to each term and a typed "expand"; then solving
// from the bracket); x on both sides is told as grouping.
// 16 slides (was 14): a save made on the old deck starts the notes again; the best
// score stays.
//
// Taken from the best of the Dashboard's algebra units: GED Maths 1A and 1B (the
// golden rule, inverse operations, always check), the Acellus Algebra balance and the
// Year 7 algebra activities (terms, algebra).
//
// How it reads (the English Unit 1 and Maths 7.1 rules):
// - One orange "Write this down" box per slide at most, numbered by `numbered()`.
// - A line starting ✗ or ✓ is a worked example and gets a red or green strip.
// - Typed questions: four `fill` slides with `solve` lines (utils/fracFill.js) and two
//   `algebra` ones (collect, expand); the sort is `terms`. Every answer is worked out,
//   never typed by the author. Four are multiple choice, where the choice is the point.
// - Nothing scrolls at 1366×768 with every step shown. English only, like the whole
//   Upper Secondary track. Every equation is new; none is a book question.

const ORANGE = '#c2410c';
const TEAL = '#0087a8';
const GREEN = '#4a8b23';
const BLUE = '#1a5fa8';
const PURPLE = '#7c3aed';
const RED = '#e11d48';

const slides = [
  // 1 ─ Title ──────────────────────────────────────────────────────────────
  {
    layout: 'hero',
    color: ORANGE,
    icon: 'Scale',
    eyebrow: 'Unit 1',
    title: 'Solving Equations',
    compact: true,
    objective: 'Solve an equation by doing the same to both sides: one step, two steps, like terms, brackets, and x on both sides. Then check the answer.',
    card: {
      icon: 'Scale',
      badge: 'The big idea',
      text: 'An equation is a **balance**. Whatever you do to one side, do to the **other side** too.',
    },
  },

  // 2 ─ What an equation is ─────────────────────────────────────────────────
  {
    layout: 'statement',
    accent: TEAL,
    icon: 'Equal',
    title: 'An Equation Is a Balance',
    text: '$3x + 7 = 22$',
    sub: 'The left side **equals** the right side. Find the number $x$ that makes it true.',
    notes: [
      { tone: 'write', text: '**Equation**: two sides with $=$ between them. **Solve**: find the number the letter stands for.' },
    ],
    check: {
      id: 'chk_which_x',
      q: 'Which value of $x$ makes $3x + 7 = 22$ true?',
      options: [
        { val: 'A', text: '$x = 3$' },
        { val: 'B', text: '$x = 5$' },
        { val: 'C', text: '$x = 15$' },
      ],
      correct: 'B',
      expEn: '$3 \\times 5 + 7 = 15 + 7 = 22$. With 3 you get $9 + 7 = 16$. With 15 you get $45 + 7 = 52$.',
    },
  },

  // 3 ─ Same to both sides ──────────────────────────────────────────────────
  {
    layout: 'work',
    accent: TEAL,
    icon: 'Scale',
    title: 'Do the Same to Both Sides',
    content: 'Take 9 away from **both** sides: one side alone breaks the balance. Press **Next step**.',
    work: { eq: 'x + 9 = 14', moves: ['-9'] },
    notes: [
      { tone: 'write', text: 'Do the **same** thing to **both sides**. Write the move under each side.' },
    ],
  },

  // 4 ─ Inverse operations, then four to type ───────────────────────────────
  {
    layout: 'split',
    accent: BLUE,
    icon: 'ArrowLeftRight',
    title: 'Undo It With the Opposite',
    ratio: 45,
    content: '$$\\begin{aligned} x + 6 &= 10 &&\\text{subtract 6} && x = 4 \\\\ x - 3 &= 8 &&\\text{add 3} && x = 11 \\\\ 4x &= 20 &&\\text{divide by 4} && x = 5 \\\\ \\dfrac{x}{2} &= 7 &&\\text{multiply by 2} && x = 14 \\end{aligned}$$',
    notes: [
      { tone: 'write', text: '**Inverse operations** undo each other: $+$ and $-$, $\\times$ and $\\div$.' },
    ],
    activity: {
      id: 'act_one_step',
      type: 'fill',
      prompt: 'Solve each one. Type the value of x.',
      lines: [
        { solve: 'x + 8 = 15' },
        { solve: 'x - 5 = 12' },
        { solve: '6x = 42' },
        { solve: 'x/3 = 4', tex: '\\dfrac{x}{3} = 4' },
      ],
      explain: '**a** subtract 8: $x = 7$. **b** add 5: $x = 17$. **c** divide by 6: $x = 7$. **d** multiply by 3: $x = 12$.',
    },
  },

  // 5 ─ Two steps ───────────────────────────────────────────────────────────
  {
    layout: 'work',
    accent: ORANGE,
    icon: 'Milestone',
    title: 'Two Steps',
    work: { eq: '3x + 7 = 22', moves: ['-7', '/3'] },
    notes: [
      { tone: 'write', text: 'Two steps: undo the $+$ or $-$ **first**. Then undo the $\\times$ or $\\div$.' },
    ],
    check: {
      id: 'chk_first_step',
      q: '$5x - 4 = 26$. What is the first step?',
      options: [
        { val: 'A', text: 'Divide both sides by 5.' },
        { val: 'B', text: 'Add 4 to both sides.' },
        { val: 'C', text: 'Subtract 4 from both sides.' },
      ],
      correct: 'B',
      expEn: 'Undo the $- 4$ first, so **add** 4: $5x = 30$. Then divide by 5: $x = 6$. Subtracting 4 makes it $- 8$, further away.',
    },
  },

  // 6 ─ Try two steps ───────────────────────────────────────────────────────
  {
    layout: 'split',
    accent: GREEN,
    icon: 'PenLine',
    eyebrow: 'Your turn',
    title: 'Two Steps',
    ratio: 40,
    content: 'Solve each one in your notebook.\nWrite each move under both sides.\nThen type $x$.',
    notes: [
      { tone: 'tip', badge: false, text: 'An answer can be **negative**. Type the minus sign: $-2$.' },
    ],
    activity: {
      id: 'act_two_step',
      type: 'fill',
      prompt: 'Two steps each. Type the value of x.',
      lines: [
        { solve: '2x + 5 = 17' },
        { solve: '4x - 3 = 25' },
        { solve: 'x/5 + 2 = 6', tex: '\\dfrac{x}{5} + 2 = 6' },
        { solve: '3x + 7 = 1' },
      ],
      explain: '**a** $2x = 12$, $x = 6$. **b** $4x = 28$, $x = 7$. **c** $\\dfrac{x}{5} = 4$, $x = 20$. **d** $3x = -6$, $x = -2$.',
    },
  },

  // 7 ─ Check ───────────────────────────────────────────────────────────────
  {
    layout: 'statement',
    accent: GREEN,
    icon: 'CheckCircle2',
    title: 'Check Your Answer',
    text: 'Put it back in.',
    sub: '$3x + 7 = 22$ and $x = 5$: $3(5) + 7 = 15 + 7 = 22$ ✓',
    notes: [
      { tone: 'write', text: '**Check**: put your answer into the **first** equation. Both sides must be the same.' },
    ],
    check: {
      id: 'chk_is_he_right',
      q: 'Mr Bowen solves $2x - 3 = 11$ and gets $x = 4$. Is he right?',
      options: [
        { val: 'A', text: 'Yes: $2 \\times 4 = 8$.' },
        { val: 'B', text: 'No: $2 \\times 4 - 3 = 5$, not 11.' },
      ],
      correct: 'B',
      expEn: 'Put 4 back in: $2 \\times 4 - 3 = 5$, and $5 \\neq 11$. The answer is $x = 7$: $2 \\times 7 - 3 = 11$.',
    },
  },

  // 8 ─ Two kinds of terms, then the sort ──────────────────────────────────
  {
    layout: 'work',
    accent: PURPLE,
    icon: 'Shapes',
    title: 'Two Kinds of Terms',
    content: 'Every term is an **x term** (it has an $x$) or a **number** (a constant, no letter). The sign in front belongs to the term.',
    groups: { expr: '4x - 5 + 9 - x', sums: false },
    notes: [
      { tone: 'write', text: '**Like terms** are the same kind. Group **x terms** with x terms and **numbers** with numbers.' },
    ],
    activity: {
      id: 'act_sort_terms',
      type: 'terms',
      prompt: 'Put each term in its basket. Keep its sign.',
      expr: '5x + 7 - 3x + 2 + x',
      explain: 'x terms: $5x - 3x + x = 3x$. Numbers: $7 + 2 = 9$.',
    },
  },

  // 9 ─ Group like terms, then solve ───────────────────────────────────────
  {
    layout: 'work',
    accent: PURPLE,
    icon: 'Layers',
    title: 'Group Like Terms',
    content: 'Collect the **x terms**. Collect the **numbers**. Then solve.',
    groups: { expr: '5x + 7 + 2x - 3', chips: false },
    work: { eq: '7x + 4 = 25', written: '5x + 7 + 2x - 3 = 25', writtenSay: 'group like terms', moves: ['-4', '/7'] },
    activity: {
      id: 'act_collect',
      type: 'algebra',
      mode: 'simplify',
      prompt: 'Group the like terms. Type the shorter expression.',
      expr: '6x + 5 - 2x + 1',
      explain: 'x terms: $6x - 2x = 4x$. Numbers: $5 + 1 = 6$. So $6x + 5 - 2x + 1 = 4x + 6$.',
    },
  },

  // 10 ─ Brackets: multiply out ───────────────────────────────────────────
  {
    layout: 'work',
    accent: PURPLE,
    icon: 'Brackets',
    title: 'Brackets: Multiply Out',
    content: '$3(x + 4)$ means 3 lots of $x + 4$. Follow the arrows.',
    expand: [{ a: 3, b: 4 }, { a: 5, b: -2 }],
    notes: [
      { tone: 'write', text: '**Expand**: the number outside multiplies **every** term inside the bracket.' },
    ],
    activity: {
      id: 'act_expand',
      type: 'algebra',
      mode: 'expand',
      grid: false,
      prompt: 'Multiply out the bracket. Type the answer.',
      expr: '4(x - 3)',
      explain: '$4 \\times x = 4x$ and $4 \\times (-3) = -12$. So $4(x - 3) = 4x - 12$.',
    },
  },

  // 11 ─ Solve with a bracket ──────────────────────────────────────────────
  {
    layout: 'work',
    accent: PURPLE,
    icon: 'Brackets',
    title: 'Solve With a Bracket',
    content: 'Multiply out first. Then solve as before.',
    work: { eq: '3x + 12 = 27', written: '3(x + 4) = 27', writtenSay: 'multiply out the bracket', moves: ['-12', '/3'] },
    activity: {
      id: 'act_brackets',
      type: 'fill',
      prompt: 'Multiply out the bracket first. Type the value of x.',
      lines: [
        { solve: '2(x + 5) = 18' },
        { solve: '4(x - 3) = 20' },
        { solve: '5(2x + 1) = 35' },
      ],
      explain: '**a** $2x + 10 = 18$, $x = 4$. **b** $4x - 12 = 20$, $x = 8$. **c** $10x + 5 = 35$, $x = 3$.',
    },
  },

  // 12 ─ x on both sides, told as grouping ─────────────────────────────────
  {
    layout: 'work',
    accent: BLUE,
    icon: 'ArrowLeftRight',
    title: 'x on Both Sides',
    work: { eq: '5x + 3 = 2x + 18', moves: ['-2x', '-3', '/3'], say: ['x terms to the left', 'numbers to the right', 'divide both sides by 3'] },
    notes: [
      { tone: 'write', text: 'Group again: **x terms** on one side, **numbers** on the other.' },
    ],
    check: {
      id: 'chk_both_sides',
      q: '$7x - 2 = 3x + 10$. What do you do first?',
      options: [
        { val: 'A', text: 'Subtract $3x$ from both sides.' },
        { val: 'B', text: 'Divide both sides by 7.' },
        { val: 'C', text: 'Add 2 to the left side.' },
      ],
      correct: 'A',
      expEn: '$3x$ is the smaller x term. Take it from both sides: $4x - 2 = 10$, so $4x = 12$ and $x = 3$. B turns every term into a fraction. C changes one side only.',
    },
  },

  // 13 ─ Negatives ─────────────────────────────────────────────────────────
  {
    layout: 'work',
    accent: RED,
    icon: 'Minus',
    title: 'When x Has a Minus',
    content: '$-x$ is $-1 \\times x$, so the last move is $\\div (-1)$.',
    work: { eq: '-x + 4 = 9', written: '4 - x = 9', writtenSay: 'the same, with the x term first', moves: ['-4', '/-1'] },
    activity: {
      id: 'act_negatives',
      type: 'fill',
      prompt: 'Type the value of x. Some answers are negative.',
      lines: [
        { solve: '2x + 9 = 1' },
        { solve: '10 - x = 4' },
        { solve: '3x + 8 = x + 2' },
      ],
      explain: '**a** $2x = -8$, $x = -4$. **b** $-x = -6$, $x = 6$. **c** $2x + 8 = 2$, $2x = -6$, $x = -3$.',
    },
  },

  // 14 ─ Watch out ─────────────────────────────────────────────────────────
  {
    layout: 'split',
    accent: RED,
    icon: 'AlertTriangle',
    title: 'Watch Out',
    content: '✗ $3x + 6 = 21$ → $x + 6 = 7$ | divided one term\n✓ $3x + 6 = 21$ → $3x = 15$ → $x = 5$ | undo the + 6 first\n✗ $x - 4 = 10$ → $x = 6$ | wrong way\n✓ $x - 4 = 10$ → $x = 14$ | add 4\n✗ $4x + 2x = 6x^2$ | add like terms\n✓ $4x + 2x = 6x$ | still x terms',
  },

  // 15 ─ The method ────────────────────────────────────────────────────────
  {
    layout: 'statement',
    accent: ORANGE,
    title: 'Every Equation, in Order',
    text: 'Five steps, in this order.',
    notes: [
      { tone: 'write', text: '**1.** Brackets? Multiply them out.\n**2.** Like terms? Group x terms with x terms, numbers with numbers.\n**3.** $x$ on both sides? Take away the smaller x term.\n**4.** Undo the $+$ or $-$. Then undo the $\\times$ or $\\div$.\n**5.** Check: put your answer back in.' },
    ],
  },

  // 16 ─ Done ──────────────────────────────────────────────────────────────
  {
    layout: 'hero',
    color: GREEN,
    icon: 'CheckCircle2',
    title: 'Lesson Complete!',
    subtitle: 'Now practise: **Balance**, **Show your working**, **Find the mistake** and **Write the equation**. Then the quiz.',
  },
];

// Number the "Write this down" boxes through the deck and put the counts on the title
// slide, as English Unit 1 and Maths 7.1 do. Counted here so they never drift.
function numbered(deck) {
  const writes = deck.flatMap((s) => [...(s.notes || []), ...(Array.isArray(s.columns) ? s.columns : []).flatMap((c) => c.notes || [])])
    .filter((n) => n.tone === 'write');
  writes.forEach((n, i) => { n.badge = `Write this down · ${i + 1} of ${writes.length}`; });
  const questions = deck.filter((s) => s.check || s.activity).length;
  deck[0].chips = [
    { icon: 'Pencil', text: `${writes.length} things to write down` },
    { icon: 'HelpCircle', text: `${questions} questions to answer` },
  ];
  return deck;
}

export const notes = numbered(slides);
