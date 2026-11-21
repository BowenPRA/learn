// Upper Secondary Maths · Unit 1 · Write the equation, played by the step engine
// (unit/src/stepPractice). Six short word problems: pick the equation that says what
// the words say, then solve it. Short sentences, everyday words; "dollars", never the
// sign (a $ in prose starts a maths span).
//
// Every wrong equation is a real misreading: the order of "multiply, then add" turned
// round, a one-off amount multiplied, "three times as old" read as + 3, area for
// perimeter. Levels: focus for two (every step), practice for four (the equation and
// the answer; a wrong answer opens the middle line). English only.
// Check: checkStepPractice(set) from unit/src/stepPractice/check.js.

const num = (before, answer, after) => ({ type: 'number', before, answer: String(answer), signed: true, ...(after ? { after } : {}) });
const opt = (id, tex) => ({ id, text: `$${tex}$` });

/** Pick the equation (key), one line of solving, then the answer. */
function problem({ id, level, prompt, right, wrongs, middle, x, check, finalSlips = [] }) {
  return {
    id, level, prompt,
    steps: [
      {
        key: true,
        title: 'Pick the equation',
        sub: 'Which one says what the words say?',
        input: { type: 'choice', options: [opt('right', right), ...wrongs.map((w, i) => opt(`w${i + 1}`, w.tex))], answer: 'right', shuffle: true },
        line: `$${right}$`,
        hint: 'Find the amount that is paid or added once, and the amount that is multiplied.',
        slips: wrongs.map((w, i) => ({ value: `w${i + 1}`, key: `w${i + 1}`, msg: w.msg })),
      },
      middle,
      {
        title: 'Solve it',
        input: num('$x =$', x),
        line: `$x = ${x}$`,
        hint: 'Undo the + or − first, then the × or ÷.',
        why: check,
        slips: finalSlips,
      },
    ],
  };
}

const items = [
  problem({
    id: 'w1', level: 'focus',
    prompt: 'Mr Bowen thinks of a number. He multiplies it by 4, then adds 3. He gets 31. What is the number? Call it $x$.',
    right: '4x + 3 = 31',
    wrongs: [
      { tex: '4(x + 3) = 31', msg: 'That adds 3 first, then multiplies. He multiplies first.' },
      { tex: '3x + 4 = 31', msg: 'The number is multiplied by 4, so 4x. The 3 is added.' },
    ],
    middle: { title: 'Undo the + 3', input: num('$4x =$', 28), line: '$4x = 28$', hint: '31 − 3 = ?', slips: [{ value: '34', key: 'wrong-way', msg: 'To undo + 3, subtract 3.' }] },
    x: 7, check: 'The number is 7: $7 \\times 4 + 3 = 31$ ✓',
  }),
  problem({
    id: 'w2', level: 'focus',
    prompt: 'A taxi costs 2 dollars to start, then 3 dollars for each kilometre. Mr Bowen pays 26 dollars. How many kilometres is the ride? Call it $x$.',
    right: '3x + 2 = 26',
    wrongs: [
      { tex: '2x + 3 = 26', msg: 'The 3 dollars is for each kilometre, so 3x. The 2 dollars is paid once.' },
      { tex: '5x = 26', msg: 'The 2 dollars is paid once. Only the 3 dollars is for each kilometre.' },
    ],
    middle: { title: 'Undo the + 2', input: num('$3x =$', 24), line: '$3x = 24$', hint: '26 − 2 = ?', slips: [{ value: '28', key: 'wrong-way', msg: 'To undo + 2, subtract 2.' }] },
    x: 8, check: '8 kilometres: $3 \\times 8 + 2 = 26$ ✓',
  }),
  problem({
    id: 'w3', level: 'practice',
    prompt: 'A rectangle is $x$ cm long and 5 cm wide. Its perimeter is 36 cm. How long is it?',
    right: '2(x + 5) = 36',
    wrongs: [
      { tex: 'x + 5 = 36', msg: 'The perimeter goes all the way round: two lengths and two widths.' },
      { tex: '5x = 36', msg: 'Length × width is the area. The perimeter adds the four sides.' },
    ],
    middle: { title: 'Multiply out, then undo the + 10', input: num('$2x =$', 26), line: '$2x + 10 = 36$, so $2x = 26$', hint: '2(x + 5) = 2x + 10. Then 36 − 10.', slips: [{ value: '31', key: 'first-term-only', msg: 'Multiply out first: 2 × 5 = 10. Then subtract 10.' }] },
    x: 13, check: '13 cm: $2(13 + 5) = 2 \\times 18 = 36$ ✓',
    finalSlips: [{ value: '15.5', key: 'first-term-only', step: 2, msg: 'Multiply out the bracket first: the 2 multiplies the 5 too.' }],
  }),
  problem({
    id: 'w4', level: 'practice',
    prompt: 'Three friends share a meal. Each pays $x$ dollars. With a 6-dollar tip, the total is 48 dollars. How much does each one pay?',
    right: '3x + 6 = 48',
    wrongs: [
      { tex: '3(x + 6) = 48', msg: 'The tip is paid once, not by each friend.' },
      { tex: 'x + 6 = 48', msg: 'There are three friends, so 3x.' },
    ],
    middle: { title: 'Undo the + 6', input: num('$3x =$', 42), line: '$3x = 42$', hint: '48 − 6 = ?', slips: [{ value: '54', key: 'wrong-way', msg: 'To undo + 6, subtract 6.' }] },
    x: 14, check: '14 dollars each: $3 \\times 14 + 6 = 48$ ✓',
    finalSlips: [{ value: '42', key: 'not-divided', step: 2, msg: '42 dollars is what all three pay. Divide by 3.' }],
  }),
  problem({
    id: 'w5', level: 'practice',
    prompt: 'A father is 3 times as old as his son. Together they are 48 years old. How old is the son? Call his age $x$.',
    right: 'x + 3x = 48',
    wrongs: [
      { tex: '3x = 48', msg: '3x is the father alone. Together means the son and the father.' },
      { tex: 'x + 3 = 48', msg: '3 times as old is 3x, not x + 3.' },
    ],
    middle: { title: 'Collect the like terms', input: { type: 'gap', text: '___ $x = 48$', answers: ['4'] }, line: '$4x = 48$', hint: 'x + 3x: x is 1x.', slips: [{ value: ['3'], key: 'lost-x', msg: 'x is 1x. 1x + 3x = ?' }] },
    x: 12, check: 'The son is 12 and the father is 36: $12 + 36 = 48$ ✓',
    finalSlips: [{ value: '16', key: 'father-only', step: 1, msg: '16 is 48 ÷ 3. The 48 years are the son and the father together.' }],
  }),
  problem({
    id: 'w6', level: 'practice',
    prompt: 'Phone plan A costs 10 dollars a month plus 2 dollars for each GB. Plan B costs 4 dollars for each GB. For how many GB do they cost the same? Call it $x$.',
    right: '2x + 10 = 4x',
    wrongs: [
      { tex: '10x + 2 = 4x', msg: 'The 10 dollars is paid once a month. The 2 dollars is for each GB.' },
      { tex: '2x + 10 = 4', msg: 'Plan B costs 4 dollars for each GB: 4x.' },
    ],
    middle: { title: 'Take 2x from both sides', input: { type: 'gap', text: '$10 =$ ___ $x$', answers: ['2'] }, line: '$10 = 2x$', hint: '4x − 2x = ?', slips: [{ value: ['6'], key: 'added-x', msg: 'Take 2x away: 4x − 2x.' }] },
    x: 5, check: '5 GB: plan A is $2 \\times 5 + 10 = 20$ dollars, plan B is $4 \\times 5 = 20$ dollars ✓',
  }),
];

// Keys must differ inside an item: each is prefixed with its step's number.
const keyed = (item) => ({
  ...item,
  steps: item.steps.map((s, i) => ({ ...s, slips: (s.slips || []).map((sl) => ({ ...sl, key: `s${i + 1}.${sl.key}` })) })),
});

export default {
  title: 'Write the equation',
  items: items.map(keyed),
};
