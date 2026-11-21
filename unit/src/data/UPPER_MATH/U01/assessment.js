// unit/src/data/UPPER_MATH/U01/assessment.js
// Ten questions, one sitting, fifteen minutes. Maths lives ONLY inside $$…$$ here (the
// quiz's own rule). 1 which is an equation, 2 the coefficient, 3 one step (typed),
// 4 one step ÷, 5 two steps (typed), 6 the next line, 7 expand, 8 a bracket (typed),
// 9 x on both sides, 10 check an answer. Every wrong choice is a real slip: the wrong
// inverse, dividing one term, multiplying only the first term of a bracket, adding the
// x terms. New numbers: none is a lesson check or a task problem.
// Multiple-choice key: q1 B, q2 A, q4 C, q6 A, q7 B, q9 B, q10 A.

export const assessment = {
  timeLimit: 900, // 15 minutes
  passages: [],
  questions: [
    {
      id: 'q1_equation',
      type: 'mcq',
      title: '1. Which one is an equation?',
      options: [
        { val: 'A', text: 'A. $$4x - 9$$' },
        { val: 'B', text: 'B. $$4x - 9 = 15$$' },
        { val: 'C', text: 'C. $$4x$$' },
        { val: 'D', text: 'D. $$9 + 15$$' },
      ],
      correct: 'B',
      expEn: 'An **equation** has two sides with an equals sign between them. A and C are expressions: there is nothing to solve. D is a sum.',
    },
    {
      id: 'q2_coefficient',
      type: 'mcq',
      title: '2. In $$6x + 5 = 29$$, what is the coefficient of $$x$$?',
      options: [
        { val: 'A', text: 'A. 6' },
        { val: 'B', text: 'B. 5' },
        { val: 'C', text: 'C. 29' },
        { val: 'D', text: 'D. 11' },
      ],
      correct: 'A',
      expEn: 'The **coefficient** is the number in front of the variable: $$6x$$ means $$6 \\times x$$. 5 is the constant, 29 is the right side, and 11 is 6 + 5.',
    },
    {
      id: 'q3_one_step',
      type: 'fill_blank',
      title: '3. Solve $$x - 8 = 13$$. Type the value of $$x$$.',
      textParts: ['$$x$$ = ', ''],
      blanks: { 1: { correct: '21' } },
      expEn: 'Undo the $$- 8$$: **add** 8 to both sides. $$x = 13 + 8 = 21$$. Check: $$21 - 8 = 13$$.',
    },
    {
      id: 'q4_divide',
      type: 'mcq',
      title: '4. Solve $$7x = 56$$.',
      options: [
        { val: 'A', text: 'A. $$x = 49$$' },
        { val: 'B', text: 'B. $$x = 63$$' },
        { val: 'C', text: 'C. $$x = 8$$' },
        { val: 'D', text: 'D. $$x = 392$$' },
      ],
      correct: 'C',
      expEn: '$$7x$$ means $$7 \\times x$$, so **divide** both sides by 7: $$x = 8$$. A subtracts 7, B adds 7 and D multiplies: none of them undoes the × 7.',
    },
    {
      id: 'q5_two_step',
      type: 'fill_blank',
      title: '5. Solve $$4x + 9 = 37$$. Type the value of $$x$$.',
      textParts: ['$$x$$ = ', ''],
      blanks: { 1: { correct: '7' } },
      expEn: 'Undo the $$+ 9$$ first: $$4x = 28$$. Then divide by 4: $$x = 7$$. Check: $$4 \\times 7 + 9 = 37$$.',
    },
    {
      id: 'q6_next_line',
      type: 'mcq',
      title: '6. Mr Bowen is solving $$5x + 3 = 38$$. What is his next line?',
      options: [
        { val: 'A', text: 'A. $$5x = 35$$' },
        { val: 'B', text: 'B. $$5x = 41$$' },
        { val: 'C', text: 'C. $$x + 3 = 33$$' },
        { val: 'D', text: 'D. $$8x = 38$$' },
      ],
      correct: 'A',
      expEn: 'Subtract 3 from both sides: $$5x = 35$$, then $$x = 7$$. B adds 3. C takes 5 away from $$5x$$, but $$5x$$ is 5 × x, so you divide. D adds the 3 to the $$x$$ term: they are not like terms.',
    },
    {
      id: 'q7_expand',
      type: 'mcq',
      title: '7. Expand $$4(x - 3)$$.',
      options: [
        { val: 'A', text: 'A. $$4x - 3$$' },
        { val: 'B', text: 'B. $$4x - 12$$' },
        { val: 'C', text: 'C. $$4x + 12$$' },
        { val: 'D', text: 'D. $$x - 12$$' },
      ],
      correct: 'B',
      expEn: 'The 4 multiplies **every** term in the bracket: $$4 \\times x = 4x$$ and $$4 \\times (-3) = -12$$. A multiplies only the $$x$$. C loses the minus. D multiplies only the 3.',
    },
    {
      id: 'q8_bracket',
      type: 'fill_blank',
      title: '8. Solve $$3(x + 5) = 33$$. Type the value of $$x$$.',
      textParts: ['$$x$$ = ', ''],
      blanks: { 1: { correct: '6' } },
      expEn: 'Multiply out: $$3x + 15 = 33$$. Subtract 15: $$3x = 18$$. Divide by 3: $$x = 6$$. Check: $$3(6 + 5) = 3 \\times 11 = 33$$.',
    },
    {
      id: 'q9_both_sides',
      type: 'mcq',
      title: '9. Solve $$6x - 4 = 2x + 16$$.',
      options: [
        { val: 'A', text: 'A. $$x = 3$$' },
        { val: 'B', text: 'B. $$x = 5$$' },
        { val: 'C', text: 'C. $$x = 1.5$$' },
        { val: 'D', text: 'D. $$x = 20$$' },
      ],
      correct: 'B',
      expEn: 'Take $$2x$$ from both sides: $$4x - 4 = 16$$. Add 4: $$4x = 20$$. Divide by 4: $$x = 5$$. A subtracts the 4 instead of adding it. C adds $$2x$$ to the left. D stops before dividing.',
    },
    {
      id: 'q10_check',
      type: 'mcq',
      title: '10. Mr Bowen says $$x = -2$$ solves $$5x + 13 = 3$$. Is he right?',
      options: [
        { val: 'A', text: 'A. Yes: $$5 \\times (-2) + 13 = 3$$' },
        { val: 'B', text: 'B. No: $$5 \\times (-2) + 13 = 23$$' },
        { val: 'C', text: 'C. No: an answer cannot be negative.' },
        { val: 'D', text: 'D. No: the answer is $$x = 2$$' },
      ],
      correct: 'A',
      expEn: 'Put it back in: $$5 \\times (-2) = -10$$, and $$-10 + 13 = 3$$. Both sides match, so he is right. B forgets that $$5 \\times (-2)$$ is negative. Answers can be negative.',
    },
  ],
};
