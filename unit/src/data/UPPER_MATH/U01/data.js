// Upper Secondary Maths Unit 1: Solving Equations (Bowen, 21 November 2026, plan
// approved first: "Yes, build Unit 1"). The first unit of a freshman algebra track on
// solving equations: Unit 2 is formulas, Unit 3 quadratics.
//
// Seven tasks (src/data/units.js), 135 XP on offer, the unit stops at 100:
//   the lesson (notes.js); key words (realWords); Balance (`balance` below, the
//   Dashboard's Acellus/GED task, unit/src/tasks/EquationBalance.jsx); three step sets
//   in unit/content/UPPER_MATH/U01/ (working.js, mistake.js, story.js); the quiz.
// English only, like the whole Upper Secondary track (unit/main.jsx). Every equation is
// new; worked examples use Mr Bowen, never a student's name.
import { notes } from './notes.js';
import { assessment } from './assessment.js';

export const U01_DATA = {
  meta: {
    id: 'U01',
    title: 'Solving Equations',
    desc: 'Solve an equation by doing the same to both sides: one step, two steps, brackets, like terms and x on both sides, then check the answer.',
    track: 'UPPER_MATH',
    icon: 'Scale',
    vietnamese: false,
    audio: false,
  },

  // The words the lesson and the questions are written in. The Key words task reviews
  // them as cards, then quizzes them; the Arcade asks them too.
  realWords: [
    {
      word: 'Equation',
      def: 'Two sides with an equals sign between them, such as 3x + 7 = 22.',
      sent: '3x + 7 = 22 is an equation: the left side equals the right side.',
      isReal: true,
    },
    {
      word: 'Variable',
      def: 'A letter that stands for a number we do not know yet.',
      sent: 'In 3x + 7 = 22, the variable is x.',
      isReal: true,
    },
    {
      word: 'Coefficient',
      def: 'The number in front of a variable. It multiplies the variable.',
      sent: 'In 3x, the coefficient is 3.',
      isReal: true,
    },
    {
      word: 'Constant',
      def: 'A number on its own, with no variable.',
      sent: 'In 3x + 7, the constant is 7.',
      isReal: true,
    },
    {
      word: 'Term',
      def: 'One part of an expression. Terms are joined by + and − signs.',
      sent: '3x + 7 has two terms: 3x and 7.',
      isReal: true,
    },
    {
      word: 'Like terms',
      def: 'Terms with the same letter, or two numbers on their own. You can add them.',
      sent: '5x and 2x are like terms: 5x + 2x = 7x.',
      isReal: true,
    },
    {
      word: 'Inverse operation',
      def: 'The operation that undoes another one: + and −, × and ÷.',
      sent: 'Subtracting 7 is the inverse operation of adding 7.',
      isReal: true,
    },
    {
      word: 'Expand',
      def: 'Multiply out a bracket: the number outside multiplies every term inside.',
      sent: 'Expand 2(x + 4) to get 2x + 8.',
      isReal: true,
    },
    {
      word: 'Solution',
      def: 'The value of the variable that makes the equation true.',
      sent: 'x = 5 is the solution of 2x = 10.',
      isReal: true,
    },
    {
      word: 'Substitute',
      def: 'Put a number in place of a letter.',
      sent: 'Substitute x = 5 into 3x + 7: 3(5) + 7 = 22.',
      isReal: true,
    },
  ],

  notes: notes,
  assessment: assessment,

  // Balance (unit/src/tasks/EquationBalance.jsx): one move done to both sides at a
  // time. The engine works out the moves, the target number of steps and "Show me"
  // from each equation; there is no answer key. `tidy` shows the equation as written
  // above its first line, with the bracket multiplied out or the like terms collected.
  // In order of shape, the order the lesson teaches:
  //   b1–b3    one move            b4–b7   two moves (a fraction, a negative answer)
  //   b8       a minus in front of x                 b9–b10  a bracket, like terms
  //   b11      x on both sides     b12     a bracket and x on both sides
  balance: [
    { id: 'b1', equation: 'x + 9 = 14', prompt: 'One move. Undo the + 9.' },
    { id: 'b2', equation: 'x - 6 = 11', prompt: 'One move. Undo the − 6.' },
    { id: 'b3', equation: '5x = 35', prompt: 'One move. 5x means 5 × x.' },
    { id: 'b4', equation: '3x + 7 = 22', prompt: 'Two moves. Undo the + or − first, then the ×.' },
    { id: 'b5', equation: '4x - 5 = 23', prompt: 'Two moves.' },
    // "Show me" multiplies by 2 first (it clears a fraction before anything else); undoing
    // the + 3 first is just as short.
    { id: 'b6', equation: 'x/2 + 3 = 10', prompt: 'x over 2 means x ÷ 2. Undo the + 3 and the ÷ 2, in either order.' },
    { id: 'b7', equation: '2x + 11 = 5', prompt: 'The answer is negative this time.' },
    // The engine writes the x term first (−x + 9), so the line as written is shown above it.
    { id: 'b8', equation: '9 - x = 2', tidy: 'The same, with the x term first', prompt: 'A minus in front of x. To divide by −1, pick 1 and press ±.' },
    { id: 'b9', equation: '3(x + 2) = 21', tidy: 'Multiply out the bracket', prompt: 'The bracket is multiplied out for you. Then two moves.' },
    { id: 'b10', equation: '4x + 2x - 5 = 31', tidy: 'Collect the like terms', prompt: 'The like terms are collected for you. Then two moves.' },
    { id: 'b11', equation: '5x + 4 = 2x + 25', prompt: 'x on both sides. Take away the smaller x term first: tap 2x.' },
    { id: 'b12', equation: '2(x + 6) = 5x - 3', tidy: 'Multiply out the bracket', prompt: 'A bracket, then x on both sides. 5 = x is the same as x = 5.' },
  ],
};
