// unit/src/data/UPPER_MATH/U01/notes.js
// Upper Secondary Maths Unit 1 — Solving Equations, the self-study lesson (Bowen,
// 21 November 2026: an algebra track on solving equations, "not too overwhelming").
// One idea runs through it: an equation is a balance, so whatever you do to one side
// you do to the other. Then the order: brackets, like terms, x on both sides, undo
// + or −, undo × or ÷, check.
//
// Taken from the best of the Dashboard's algebra units: GED Maths 1A and 1B (the
// golden rule, inverse operations, always check) and the Acellus Algebra balance.
//
// How it reads (the English Unit 1 and Maths 7.1 rules):
// - One orange "Write this down" box per slide at most, numbered by `numbered()`.
// - A line starting ✗ or ✓ is a worked example and gets a red or green strip.
// - Four questions are typed (`fill` with `solve` lines, utils/fracFill.js): the answer
//   is worked out from the equation, so the key cannot be wrong. Five are multiple
//   choice, where the choice is the point (which step first, is it right).
// - Nothing scrolls at 1366×768. English only, like the whole Upper Secondary track.
// - Every equation is new; none is a book question.

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
    objective: 'Solve an equation by doing the same to both sides: one step, two steps, brackets, and x on both sides. Then check the answer.',
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
    layout: 'split',
    accent: TEAL,
    icon: 'Scale',
    title: 'Do the Same to Both Sides',
    content: 'Take 9 away from **both** sides.\n$$\\begin{aligned} x + 9 &= 14 \\\\ x + 9 - 9 &= 14 - 9 \\\\ x &= 5 \\end{aligned}$$',
    notes: [
      { tone: 'write', text: 'Do the **same** thing to **both sides**. The equation stays balanced.' },
      { tone: 'tip', badge: false, text: 'Take 9 from one side only and the two sides are no longer equal.' },
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
    layout: 'split',
    accent: ORANGE,
    icon: 'Milestone',
    title: 'Two Steps',
    content: 'Undo the $+ 7$ first. Then undo the $\\times 3$.\n$$\\begin{aligned} 3x + 7 &= 22 &&\\text{subtract 7} \\\\ 3x &= 15 &&\\text{divide by 3} \\\\ x &= 5 \\end{aligned}$$',
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
    content: 'Solve each one in your notebook.\nThen type $x$.',
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

  // 8 ─ Like terms ──────────────────────────────────────────────────────────
  {
    layout: 'split',
    accent: PURPLE,
    icon: 'Layers',
    title: 'Tidy Each Side First',
    content: 'Tidy the left side. Then solve.\n$$\\begin{aligned} 5x + 2x - 3 &= 18 \\\\ 7x - 3 &= 18 \\\\ 7x &= 21 \\\\ x &= 3 \\end{aligned}$$',
    notes: [
      { tone: 'write', text: '**Like terms** have the same letter. Add them first: $5x + 2x = 7x$.' },
    ],
    check: {
      id: 'chk_like_terms',
      q: 'Tidy the left side of $4x + 3 + 2x = 27$.',
      options: [
        { val: 'A', text: '$6x + 3$' },
        { val: 'B', text: '$9x$' },
        { val: 'C', text: '$4x + 5$' },
      ],
      correct: 'A',
      expEn: '$4x$ and $2x$ are like terms: $6x$. The 3 has no $x$, so it stays on its own. Then $6x + 3 = 27$ gives $x = 4$.',
    },
  },

  // 9 ─ Brackets ────────────────────────────────────────────────────────────
  {
    layout: 'split',
    accent: PURPLE,
    icon: 'Brackets',
    title: 'Brackets: Multiply Out First',
    ratio: 45,
    content: '✗ $3(x + 4) = 3x + 4$ | the 4 needs × 3 too\n$$\\begin{aligned} 3(x + 4) &= 27 &&\\text{multiply out} \\\\ 3x + 12 &= 27 &&\\text{subtract 12} \\\\ 3x &= 15 &&\\text{divide by 3} \\\\ x &= 5 \\end{aligned}$$',
    notes: [
      { tone: 'write', text: '**Expand**: the number outside multiplies **every** term inside the bracket.' },
    ],
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

  // 10 ─ x on both sides ───────────────────────────────────────────────────
  {
    layout: 'split',
    accent: BLUE,
    icon: 'ArrowLeftRight',
    title: 'x on Both Sides',
    content: 'Here the smaller $x$ term is $2x$.\n$$\\begin{aligned} 5x + 3 &= 2x + 18 &&\\text{subtract } 2x \\\\ 3x + 3 &= 18 &&\\text{subtract 3} \\\\ 3x &= 15 &&\\text{divide by 3} \\\\ x &= 5 \\end{aligned}$$',
    notes: [
      { tone: 'write', text: '$x$ on both sides: take away the **smaller** $x$ term first. Then solve as before.' },
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
      expEn: '$3x$ is the smaller $x$ term. Take it from both sides: $4x - 2 = 10$, so $4x = 12$ and $x = 3$. B turns every term into a fraction. C changes one side only.',
    },
  },

  // 11 ─ Negatives ─────────────────────────────────────────────────────────
  {
    layout: 'split',
    accent: RED,
    icon: 'Minus',
    title: 'When x Has a Minus',
    ratio: 45,
    content: 'Subtract 4, then divide by $-1$.\n$$\\begin{aligned} 4 - x &= 9 \\\\ -x &= 5 \\\\ x &= -5 \\end{aligned}$$\nCheck: $4 - (-5) = 9$ ✓',
    notes: [
      { tone: 'tip', badge: 'In Balance', icon: 'Scale', text: 'To divide by $-1$, pick 1 and press **±**.' },
    ],
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

  // 12 ─ Watch out ─────────────────────────────────────────────────────────
  {
    layout: 'split',
    accent: RED,
    icon: 'AlertTriangle',
    title: 'Watch Out',
    content: '✗ $3x + 6 = 21$ → $x + 6 = 7$ | divided one term\n✓ $3x + 6 = 21$ → $3x = 15$ → $x = 5$ | undo the + 6 first\n✗ $x - 4 = 10$ → $x = 6$ | wrong way\n✓ $x - 4 = 10$ → $x = 14$ | add 4',
    notes: [
      { tone: 'homework', text: 'Divide **every** term, not just one. Undo $-$ with $+$. Do it to **both** sides, every time.' },
    ],
  },

  // 13 ─ The method ────────────────────────────────────────────────────────
  {
    layout: 'statement',
    accent: ORANGE,
    title: 'Every Equation, in Order',
    text: 'Five steps, in this order.',
    notes: [
      { tone: 'write', text: '**1.** Brackets? Multiply them out.\n**2.** Like terms? Collect them on each side.\n**3.** $x$ on both sides? Take away the smaller $x$ term.\n**4.** Undo the $+$ or $-$. Then undo the $\\times$ or $\\div$.\n**5.** Check: put your answer back in.' },
    ],
  },

  // 14 ─ Done ──────────────────────────────────────────────────────────────
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
