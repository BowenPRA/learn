// Upper Secondary Maths · Unit 1 · Find the mistake, played by the step engine
// (unit/src/stepPractice). Six of Mr Bowen's worked solutions, each with one wrong line.
// The student finds the line, writes it correctly, then finishes the equation. The
// mistakes are the ones the lesson's Watch Out slide names: the wrong inverse, dividing
// one term, a bracket half multiplied out, adding the x terms, a lost minus sign.
//
// Levels: focus (every step) for four; practice for two (find the line and the answer;
// a wrong answer opens the fix). English only.
// Check: checkStepPractice(set) from unit/src/stepPractice/check.js.

const num = (before, answer, after) => ({ type: 'number', before, answer: String(answer), signed: true, ...(after ? { after } : {}) });

/**
 * One worked solution. `lines` are Mr Bowen's lines (maths, no $), `wrong` the number of
 * the wrong one, `why` what he did, `right` the reason each other line is not the
 * mistake (by line number), `fix` the step that writes the wrong line correctly (left
 * out when the wrong line is the answer itself), `x` the answer and `check` its proof.
 */
function mistake({ id, level, eq, lines, wrong, why, right, fix, x, check, finalSlips = [] }) {
  const choose = {
    key: true,
    title: 'Find the wrong line',
    sub: 'Check each line against the line before it.',
    input: {
      type: 'choice',
      options: lines.map((l, i) => ({ id: `l${i + 1}`, text: `Line ${i + 1}:  $${l}$` })),
      answer: `l${wrong}`,
    },
    line: `Line ${wrong} is wrong.`,
    hint: 'Do the move yourself on the line before. Does your line match his?',
    why,
    slips: lines.map((_, i) => i + 1).filter((n) => n !== wrong)
      .map((n) => ({ value: `l${n}`, key: `line${n}`, msg: right[n] })),
  };
  const answer = {
    title: 'Finish it correctly',
    sub: 'Carry on from the right line.',
    input: num('$x =$', x),
    line: `$x = ${x}$`,
    hint: 'Undo the + or − first, then the × or ÷.',
    why: `Check: ${check}`,
    slips: finalSlips,
  };
  return {
    id, level,
    prompt: `Mr Bowen solved $${eq}$. One line is wrong.`,
    table: { head: ['', 'His working'], rows: lines.map((l, i) => [`Line ${i + 1}`, `$${l}$`]) },
    steps: fix ? [choose, fix, answer] : [choose, answer],
  };
}

const items = [
  mistake({
    id: 'm1', level: 'focus', eq: '4x + 6 = 30',
    lines: ['4x = 36', 'x = 9'], wrong: 1,
    why: 'He added 6. To undo + 6, subtract 6 from both sides.',
    right: { 2: 'Line 2 is right for line 1: 36 ÷ 4 = 9. The mistake comes before it.' },
    fix: {
      title: 'Write line 1 correctly',
      input: num('$4x =$', 24),
      line: '$4x = 24$',
      hint: '30 − 6 = ?',
      slips: [{ value: '36', key: 'same-slip', msg: 'That is his line. Undo + 6 by subtracting 6.' }],
    },
    x: 6, check: '$4 \\times 6 + 6 = 30$ ✓',
    finalSlips: [{ value: '9', key: 'his-answer', step: 2, msg: 'That is his answer. Start from the corrected line.' }],
  }),
  mistake({
    id: 'm2', level: 'focus', eq: '3x - 5 = 16',
    lines: ['3x = 21', 'x = 18'], wrong: 2,
    why: 'He took 3 away. 3x means 3 × x, so divide by 3.',
    right: { 1: 'Line 1 is right: undo − 5 by adding 5, and 16 + 5 = 21.' },
    x: 7, check: '$3 \\times 7 - 5 = 16$ ✓',
    finalSlips: [{ value: '18', key: 'his-answer', msg: '21 − 3 is his mistake. Divide 21 by 3.' }],
  }),
  mistake({
    id: 'm3', level: 'focus', eq: '2(x + 7) = 30',
    lines: ['2x + 7 = 30', '2x = 23', 'x = 11.5'], wrong: 1,
    why: 'He multiplied only the x. The 2 multiplies the 7 too.',
    right: {
      2: 'Line 2 follows from line 1: 30 − 7 = 23. The mistake comes before it.',
      3: 'Line 3 follows from line 2: 23 ÷ 2 = 11.5. The mistake comes before it.',
    },
    fix: {
      title: 'Write line 1 correctly',
      input: num('$2x +$', 14, '$= 30$'),
      line: '$2x + 14 = 30$',
      hint: '2 × 7 = ?',
      slips: [{ value: '7', key: 'same-slip', msg: 'That is his line. Multiply the 7 by 2 too.' }],
    },
    x: 8, check: '$2(8 + 7) = 2 \\times 15 = 30$ ✓',
    finalSlips: [{ value: '11.5', key: 'his-answer', step: 2, msg: 'That is his answer. Start from the corrected line: 2x + 14 = 30.' }],
  }),
  mistake({
    id: 'm4', level: 'practice', eq: '6x + 4 = 2x + 28',
    lines: ['8x + 4 = 28', '8x = 24', 'x = 3'], wrong: 1,
    why: 'He added 2x to the left. Take 2x away from both sides: 6x − 2x = 4x.',
    right: {
      2: 'Line 2 follows from line 1: 28 − 4 = 24. The mistake comes before it.',
      3: 'Line 3 follows from line 2: 24 ÷ 8 = 3. The mistake comes before it.',
    },
    fix: {
      title: 'Write line 1 correctly',
      input: { type: 'gap', text: '___ $x + 4 = 28$', answers: ['4'] },
      line: '$4x + 4 = 28$',
      hint: '6x − 2x = ?',
      slips: [{ value: ['8'], key: 'same-slip', msg: 'That is his line. Take the 2x away: 6x − 2x.' }],
    },
    x: 6, check: '$6 \\times 6 + 4 = 40$ and $2 \\times 6 + 28 = 40$ ✓',
    finalSlips: [{ value: '3', key: 'his-answer', step: 2, msg: 'That is his answer. Fix line 1 first.' }],
  }),
  mistake({
    id: 'm5', level: 'practice', eq: '5x + 15 = 50',
    lines: ['x + 15 = 10', 'x = -5'], wrong: 1,
    why: 'He divided the 5x and the 50 by 5, but not the 15. Undo the + 15 first.',
    right: { 2: 'Line 2 follows from line 1: 10 − 15 = −5. The mistake comes before it.' },
    fix: {
      title: 'Write line 1 correctly',
      sub: 'Undo the + 15 first.',
      input: num('$5x =$', 35),
      line: '$5x = 35$',
      hint: '50 − 15 = ?',
      slips: [{ value: '65', key: 'wrong-way', msg: 'To undo + 15, subtract 15.' }],
    },
    x: 7, check: '$5 \\times 7 + 15 = 50$ ✓',
    finalSlips: [{ value: '-5', key: 'his-answer', step: 2, msg: 'That is his answer. Fix line 1 first: undo the + 15.' }],
  }),
  mistake({
    id: 'm6', level: 'focus', eq: '20 - 3x = 2',
    lines: ['-3x = -18', 'x = -6'], wrong: 2,
    why: 'A negative divided by a negative is positive: −18 ÷ −3 = 6.',
    right: { 1: 'Line 1 is right: take 20 from both sides, and 2 − 20 = −18.' },
    x: 6, check: '$20 - 3 \\times 6 = 2$ ✓',
    finalSlips: [{ value: '-6', key: 'his-answer', msg: 'Negative ÷ negative is positive.' }],
  }),
];

// Keys must differ inside an item: each is prefixed with its step's number.
const keyed = (item) => ({
  ...item,
  steps: item.steps.map((s, i) => ({ ...s, slips: (s.slips || []).map((sl) => ({ ...sl, key: `s${i + 1}.${sl.key}` })) })),
});

export default {
  title: 'Find the mistake',
  items: items.map(keyed),
};
