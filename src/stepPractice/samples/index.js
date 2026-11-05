// The sample step-practice sets: the pattern every new set copies, shown by
// preview-steps.html and checked by `npm run validate` like a unit's pool.
// Original problems, written for PRA; no student names (the repo is public).
import maths1 from './y5MathsNegatives.js';
import { practice as maths2, challenge as maths3 } from './y5MathsNegatives2.js';
import science from './y5Science.js';
import english from './y5English.js';

export const SAMPLE_SETS = {
  y5maths: {
    title: 'Negative numbers: step by step', titleVn: 'Số âm: từng bước một',
    signed: true,
    items: [...maths1, ...maths2, ...maths3],
  },
  y5science: {
    title: 'Fair tests and results tables', titleVn: 'Thí nghiệm công bằng và bảng kết quả',
    items: science,
  },
  y5english: {
    title: 'Verbs in the past', titleVn: 'Động từ ở thì quá khứ',
    items: english,
  },
};
