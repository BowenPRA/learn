// The shared look of the Year 7 angle tasks — Find It, Say Why (5.1) and Find
// Every Angle (5.1, 5.2): one colour for each kind of angle, the same in the
// picture, the working and the fact cards, and the words on the fact cards.
// Kept apart from AngleKit.jsx so that file exports components only.

/** The angle colours. Text colours for light backgrounds; the picture uses the same family. */
export const AC = {
  given: '#0087a8',     // a number printed on the picture
  letter: '#c25e12',    // a letter not found yet
  current: '#e8590c',   // the letter being found now
  found: '#3f7a1d',     // a letter found, now a number
  stone: '#5c2483',     // an angle found on the way ("?")
  lit: '#f5b301',       // the angles a fact joins, glowing
};

/** The fact cards: a short name and the rule, in English and French. */
export const FACT_CARD = {
  line: { en: ['Straight line', 'angles add up to 180°'], fr: ['Ligne droite', 'les angles font 180°'] },
  point: { en: ['Around a point', 'angles add up to 360°'], fr: ['Autour d’un point', 'les angles font 360°'] },
  quad: { en: ['Quadrilateral', 'angles add up to 360°'], fr: ['Quadrilatère', 'les angles font 360°'] },
  opp: { en: ['Vertically opposite', 'X · they are equal'], fr: ['Opposés par le sommet', 'X · ils sont égaux'] },
  corr: { en: ['Corresponding', 'F · they are equal'], fr: ['Correspondants', 'F · ils sont égaux'] },
  alt: { en: ['Alternate', 'Z · they are equal'], fr: ['Alternes-internes', 'Z · ils sont égaux'] },
  side: { en: ['Same side, between', 'they add up to 180°'], fr: ['Même côté, entre', 'ils font 180°'] },
  tri: { en: ['Triangle', 'angles add up to 180°'], fr: ['Triangle', 'les angles font 180°'] },
  para: { en: ['Parallelogram, opposite', 'they are equal'], fr: ['Parallélogramme, opposés', 'ils sont égaux'] },
  next: { en: ['Parallelogram, next-door', 'they add up to 180°'], fr: ['Parallélogramme, voisins', 'ils font 180°'] },
  none: { en: ['No arrows', 'you can’t tell'], fr: ['Pas de flèches', 'on ne peut pas savoir'] },
};

export const KT = {
  en: {
    find: 'Find', findStone: 'Find the angle marked ?', onTheWay: 'on the way', step: 'Step',
    which: (L) => `Which fact finds ${L}?`, workOut: 'Work it out',
    working: 'Your working', because: 'because', check: 'Check', hint: 'Hint', stuck: 'Show me',
    newLine: 'new',
  },
  fr: {
    find: 'Trouve', findStone: 'Trouve l’angle marqué ?', onTheWay: 'en chemin', step: 'Étape',
    which: (L) => `Quelle propriété donne ${L} ?`, workOut: 'Calcule',
    working: 'Ton calcul', because: 'car', check: 'Vérifier', hint: 'Indice', stuck: 'Montre-moi',
    newLine: 'nouveau',
  },
};
// Vietnamese for the step frame only: the Bus Stop it shares with Units 1-3, which offer VN.
KT.vn = {
  ...KT.en,
  find: 'Tìm', onTheWay: 'trên đường', step: 'Bước', workOut: 'Tính',
  working: 'Bài làm của em', check: 'Kiểm tra', hint: 'Gợi ý', stuck: 'Chỉ cho em', newLine: 'mới',
};
export const kt = (lang) => KT[lang] || KT.en;
