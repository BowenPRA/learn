// src/data/Y7_MATH/U07_1/assessment.js
// Ten questions, one sitting, fifteen minutes. Maths lives ONLY inside $$…$$ here
// (the quiz's own rule). 1 equivalent fraction, 2 which is improper, 3 improper →
// mixed (typed), 4 mixed → improper, 5 mixed → improper (typed), 6 which is bigger,
// 7 < or > with a common denominator, 8 and 9 fraction → decimal, 10 order of size.
// Every distractor is a slip: adding 1, the fraction upside down, the answer and the
// remainder swapped, 3 + 2 for 3 × 2, a big top read as a big fraction, the remainder
// written after the point (19/4 = 4.3). New numbers: none is a notes check, a task
// problem or a Workbook question. The questions are in English, as in 5.3's quiz
// (the quiz has no French question text yet); every explanation has its French twin.
// Multiple-choice key: q1 B, q2 C, q4 A, q6 A, q7 A, q8 B, q9 B.

export const assessment = {
  timeLimit: 900, // 15 minutes
  passages: [],
  questions: [
    {
      id: 'a1_equivalent',
      type: 'mcq',
      title: '1. Which fraction is equal to $$\\dfrac{4}{7}$$?',
      options: [
        { val: 'A', text: 'A. $$\\dfrac{5}{8}$$' },
        { val: 'B', text: 'B. $$\\dfrac{8}{14}$$' },
        { val: 'C', text: 'C. $$\\dfrac{8}{7}$$' },
        { val: 'D', text: 'D. $$\\dfrac{4}{14}$$' },
      ],
      correct: 'B',
      expEn: 'Multiply the top **and** the bottom by the same number: $$\\dfrac{4}{7} = \\dfrac{8}{14}$$ (× 2). A adds 1 to both, which changes the amount. C doubles only the top; D doubles only the bottom.',
      expFr: 'Multiplie le haut **et** le bas par le même nombre : $$\\dfrac{4}{7} = \\dfrac{8}{14}$$ (× 2). A ajoute 1 aux deux, ce qui change la quantité. C double seulement le haut ; D seulement le bas.',
    },
    {
      id: 'a2_improper',
      type: 'mcq',
      title: '2. Which one is an improper fraction?',
      options: [
        { val: 'A', text: 'A. $$\\dfrac{5}{9}$$' },
        { val: 'B', text: 'B. $$1\\dfrac{4}{9}$$' },
        { val: 'C', text: 'C. $$\\dfrac{9}{5}$$' },
        { val: 'D', text: 'D. $$\\dfrac{1}{9}$$' },
      ],
      correct: 'C',
      expEn: 'In an **improper fraction** the top is bigger than the bottom: 9 > 5, so $$\\dfrac{9}{5}$$ is more than one whole. A and D are less than one whole. B is a **mixed number**.',
      expFr: 'Dans une **fraction impropre**, le haut est plus grand que le bas : 9 > 5, donc $$\\dfrac{9}{5}$$ vaut plus d’un entier. A et D valent moins d’un entier. B est un **nombre mixte**.',
    },
    {
      id: 'a3_to_mixed',
      type: 'fill_blank',
      title: '3. Write $$\\dfrac{29}{6}$$ as a mixed number. Type the two numbers.',
      textParts: ['$$\\dfrac{29}{6}$$ = ', ' wholes and ', ' sixths'],
      blanks: { 1: { correct: '4' }, 2: { correct: '5' } },
      expEn: '$$29 \\div 6 = 4$$ remainder $$5$$ (4 × 6 = 24, and 29 − 24 = 5). So $$\\dfrac{29}{6} = 4\\dfrac{5}{6}$$: 4 wholes and 5 sixths.',
      expFr: '$$29 \\div 6 = 4$$ reste $$5$$ (4 × 6 = 24, et 29 − 24 = 5). Donc $$\\dfrac{29}{6} = 4\\dfrac{5}{6}$$ : 4 entiers et 5 sixièmes.',
    },
    {
      id: 'a4_to_improper',
      type: 'mcq',
      title: '4. Write $$4\\dfrac{2}{9}$$ as an improper fraction.',
      options: [
        { val: 'A', text: 'A. $$\\dfrac{38}{9}$$' },
        { val: 'B', text: 'B. $$\\dfrac{6}{9}$$' },
        { val: 'C', text: 'C. $$\\dfrac{8}{9}$$' },
        { val: 'D', text: 'D. $$\\dfrac{15}{9}$$' },
      ],
      correct: 'A',
      expEn: 'Multiply, then add: $$4 \\times 9 = 36$$ ninths, and $$36 + 2 = 38$$. So $$\\dfrac{38}{9}$$. B adds 4 + 2, C multiplies 4 × 2, D adds all three numbers.',
      expFr: 'Multiplie, puis ajoute : $$4 \\times 9 = 36$$ neuvièmes, et $$36 + 2 = 38$$. Donc $$\\dfrac{38}{9}$$. B fait 4 + 2, C fait 4 × 2, D ajoute les trois nombres.',
    },
    {
      id: 'a5_to_improper_typed',
      type: 'fill_blank',
      title: '5. Write $$5\\dfrac{3}{4}$$ as an improper fraction. Type the top number.',
      textParts: ['$$5\\dfrac{3}{4}$$ = ', ' quarters'],
      blanks: { 1: { correct: '23' } },
      expEn: '$$5 \\times 4 = 20$$ quarters in 5 wholes, and $$20 + 3 = 23$$. So $$5\\dfrac{3}{4} = \\dfrac{23}{4}$$.',
      expFr: '$$5 \\times 4 = 20$$ quarts dans 5 entiers, et $$20 + 3 = 23$$. Donc $$5\\dfrac{3}{4} = \\dfrac{23}{4}$$.',
    },
    {
      id: 'a6_bigger',
      type: 'mcq',
      title: '6. Which is bigger: $$\\dfrac{17}{3}$$ or $$5\\dfrac{1}{2}$$?',
      options: [
        { val: 'A', text: 'A. $$\\dfrac{17}{3}$$' },
        { val: 'B', text: 'B. $$5\\dfrac{1}{2}$$' },
        { val: 'C', text: 'C. They are the same.' },
        { val: 'D', text: 'D. You cannot tell.' },
      ],
      correct: 'A',
      expEn: 'Change it first: $$17 \\div 3 = 5$$ remainder $$2$$, so $$\\dfrac{17}{3} = 5\\dfrac{2}{3}$$. Both have 5 wholes, and $$\\dfrac{2}{3}$$ is more than $$\\dfrac{1}{2}$$ ($$\\dfrac{4}{6}$$ and $$\\dfrac{3}{6}$$). So $$\\dfrac{17}{3}$$ is bigger.',
      expFr: 'Transforme d’abord : $$17 \\div 3 = 5$$ reste $$2$$, donc $$\\dfrac{17}{3} = 5\\dfrac{2}{3}$$. Les deux ont 5 entiers, et $$\\dfrac{2}{3}$$ est plus que $$\\dfrac{1}{2}$$ ($$\\dfrac{4}{6}$$ et $$\\dfrac{3}{6}$$). Donc $$\\dfrac{17}{3}$$ est plus grand.',
    },
    {
      id: 'a7_sign',
      type: 'mcq',
      title: '7. Which sign goes in the box?   $$\\dfrac{26}{5} \\;\\square\\; 5\\dfrac{3}{10}$$',
      options: [
        { val: 'A', text: 'A. <' },
        { val: 'B', text: 'B. >' },
        { val: 'C', text: 'C. =' },
      ],
      correct: 'A',
      expEn: '$$\\dfrac{26}{5} = 5\\dfrac{1}{5}$$. Same whole number, so use the common denominator 10: $$\\dfrac{1}{5} = \\dfrac{2}{10}$$, and 2 < 3. So $$\\dfrac{26}{5} < 5\\dfrac{3}{10}$$. 26 is a big number, but that does not make the fraction bigger.',
      expFr: '$$\\dfrac{26}{5} = 5\\dfrac{1}{5}$$. Même nombre entier, donc le dénominateur commun 10 : $$\\dfrac{1}{5} = \\dfrac{2}{10}$$, et 2 < 3. Donc $$\\dfrac{26}{5} < 5\\dfrac{3}{10}$$. 26 est un grand nombre, mais ça ne rend pas la fraction plus grande.',
    },
    {
      id: 'a8_decimal',
      type: 'mcq',
      title: '8. Write $$\\dfrac{7}{20}$$ as a decimal.',
      options: [
        { val: 'A', text: 'A. 0.72' },
        { val: 'B', text: 'B. 0.35' },
        { val: 'C', text: 'C. 2.86' },
        { val: 'D', text: 'D. 0.7' },
      ],
      correct: 'B',
      expEn: 'A fraction is a division: $$7 \\div 20$$. 20 into 7 goes 0; carry the 7 onto a 0 after the point: 70 ÷ 20 = 3 remainder 10; 100 ÷ 20 = 5. So 0.35. C is 20 ÷ 7, upside down. A and D just write the digits after a point.',
      expFr: 'Une fraction est une division : $$7 \\div 20$$. En 7, 20 va 0 fois ; le 7 va sur un 0 après le point : 70 ÷ 20 = 3 reste 10 ; 100 ÷ 20 = 5. Donc 0.35. C, c’est 20 ÷ 7, à l’envers. A et D écrivent juste les chiffres après un point.',
    },
    {
      id: 'a9_remainder_point',
      type: 'mcq',
      title: '9. What is $$\\dfrac{19}{4}$$ as a decimal?',
      options: [
        { val: 'A', text: 'A. 4.3' },
        { val: 'B', text: 'B. 4.75' },
        { val: 'C', text: 'C. 4.34' },
        { val: 'D', text: 'D. 0.21' },
      ],
      correct: 'B',
      expEn: '$$19 \\div 4 = 4$$ remainder 3, but the remainder is **not** the decimal. Carry the 3 onto a 0 after the point: 30 ÷ 4 = 7 remainder 2; 20 ÷ 4 = 5. So 4.75 (and $$4\\dfrac{3}{4} = 4.75$$). A writes the remainder after the point. D is 4 ÷ 19.',
      expFr: '$$19 \\div 4 = 4$$ reste 3, mais le reste n’est **pas** le décimal. Le 3 va sur un 0 après le point : 30 ÷ 4 = 7 reste 2 ; 20 ÷ 4 = 5. Donc 4.75 (et $$4\\dfrac{3}{4} = 4.75$$). A écrit le reste après le point. D, c’est 4 ÷ 19.',
    },
    {
      id: 'a10_order',
      type: 'order',
      title: '10. Put these fractions in order of size, starting with the smallest.',
      options: [],
      bank: [
        { id: 'b1', val: 'f95', text: '$$\\dfrac{9}{5}$$' },
        { id: 'b2', val: 'f116', text: '$$\\dfrac{11}{6}$$' },
        { id: 'b3', val: 'f53', text: '$$\\dfrac{5}{3}$$' },
        { id: 'b4', val: 'f74', text: '$$\\dfrac{7}{4}$$' },
      ],
      targets: [{ id: 'size', title: 'Smallest first' }],
      correctSets: { size: ['f53', 'f74', 'f95', 'f116'] },
      expEn: 'All four are 1 and a bit: $$1\\dfrac{2}{3}$$, $$1\\dfrac{3}{4}$$, $$1\\dfrac{4}{5}$$, $$1\\dfrac{5}{6}$$. As decimals: 1.67, 1.75, 1.8, 1.83. Each one is a smaller piece short of 2, so the order is $$\\dfrac{5}{3}, \\dfrac{7}{4}, \\dfrac{9}{5}, \\dfrac{11}{6}$$.',
      expFr: 'Les quatre font 1 et un peu : $$1\\dfrac{2}{3}$$, $$1\\dfrac{3}{4}$$, $$1\\dfrac{4}{5}$$, $$1\\dfrac{5}{6}$$. En décimaux : 1.67, 1.75, 1.8, 1.83. Chacune est plus près de 2 que la précédente, donc l’ordre est $$\\dfrac{5}{3}, \\dfrac{7}{4}, \\dfrac{9}{5}, \\dfrac{11}{6}$$.',
    },
  ],
};
