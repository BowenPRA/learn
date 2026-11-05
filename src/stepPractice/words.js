// The step-practice screen's own words, in English, Vietnamese and French.
// Item text comes from the data; these are the frame around it.

export const LEVEL_INK = { focus: '#1c6ed6', practice: '#6741d9', challenge: '#a61e4d' };
export const LEVEL_INK_DARK = { focus: '#1757ab', practice: '#5233b0', challenge: '#84183d' };

/** The three colours of the method, the same everywhere: given, what you are finding, found. */
export const MARK = { given: '#0087a8', find: '#e8590c', found: '#2f7d12' };

export const W = {
  en: {
    levels: { focus: 'Focus', practice: 'Practice', challenge: 'Challenge' },
    how: {
      focus: ['Read the question', 'Answer each step', 'Copy the working'],
      practice: ['Do the key steps', 'A wrong answer opens the steps', 'Copy the working'],
      challenge: ['Work it out on paper', 'Type the answer', 'A slip opens the steps'],
    },
    howBig: {
      focus: ['Read', 'One step at a time', 'Copy'],
      practice: ['Key steps', 'Help if wrong', 'Copy'],
      challenge: ['Work it out', 'Answer', 'Help if wrong'],
    },
    question: 'Question', step: 'Step', answer: 'Answer', check: 'Check', hint: 'Hint', showMe: 'Show me',
    working: 'Your working', inHead: 'in your head', shownTag: 'shown',
    bookCopy: 'Copy this into your book', next: 'Next question', finish: 'Finish',
    clean: 'Right first time.', slipped: 'Done. One wrong turn, and you fixed it yourself.', helped: 'Done, with a step shown to you.',
    notYet: 'Not yet. Try again.', opened: 'Let’s do it one step at a time.',
    shown: (a) => `The answer is ${a}.`, why: 'Why?', look: 'Look back at this step.',
    nudge: { empty: 'Answer first, then Check.', comma: 'Use a point for decimals, like 2.5.', order: 'Put every card in order first.', gaps: 'Fill every gap first.' },
    subs: {
      number: 'Type the number.', text: 'Type the word.', choice: 'Tap one.', multi: 'Tap every right one, then Check.',
      order: 'Tap them in order. Tap again to undo.', gap: 'Fill the gap.', tap: 'Tap the word.', tapMany: 'Tap the words, then Check.',
    },
    solved: 'done', setDone: 'Set finished', setDoneSub: (c, n) => `${c} of ${n} right without help.`,
    youWrote: (v) => `Your answer was ${v}.`, noItems: 'No questions yet', minus: 'Make it negative',
  },
  vn: {
    levels: { focus: 'Trọng tâm', practice: 'Luyện tập', challenge: 'Nâng cao' },
    how: {
      focus: ['Đọc đề', 'Làm từng bước', 'Chép bài làm'],
      practice: ['Làm các bước chính', 'Sai thì mở từng bước', 'Chép bài làm'],
      challenge: ['Làm ra giấy', 'Nhập đáp án', 'Sai thì mở từng bước'],
    },
    howBig: {
      focus: ['Đọc', 'Từng bước', 'Chép'],
      practice: ['Bước chính', 'Sai có gợi ý', 'Chép'],
      challenge: ['Làm ra giấy', 'Đáp án', 'Sai có gợi ý'],
    },
    question: 'Câu hỏi', step: 'Bước', answer: 'Đáp án', check: 'Kiểm tra', hint: 'Gợi ý', showMe: 'Chỉ cho em',
    working: 'Bài làm của em', inHead: 'tính nhẩm', shownTag: 'được chỉ',
    bookCopy: 'Chép phần này vào vở', next: 'Câu tiếp theo', finish: 'Hoàn thành',
    clean: 'Đúng ngay lần đầu.', slipped: 'Xong. Có một chỗ sai và em đã tự sửa.', helped: 'Xong, có một bước được chỉ cho em.',
    notYet: 'Chưa đúng. Em thử lại nhé.', opened: 'Mình làm từng bước nhé.',
    shown: (a) => `Đáp án là ${a}.`, why: 'Vì sao?', look: 'Em xem lại bước này.',
    nudge: { empty: 'Em trả lời trước rồi bấm Kiểm tra.', comma: 'Em dùng dấu chấm cho số thập phân, ví dụ 2.5.', order: 'Em xếp hết các thẻ trước nhé.', gaps: 'Em điền hết chỗ trống trước nhé.' },
    subs: {
      number: 'Nhập số.', text: 'Nhập từ.', choice: 'Chọn một.', multi: 'Chọn tất cả ý đúng rồi bấm Kiểm tra.',
      order: 'Bấm theo thứ tự. Bấm lại để bỏ.', gap: 'Điền vào chỗ trống.', tap: 'Bấm vào từ.', tapMany: 'Bấm vào các từ rồi bấm Kiểm tra.',
    },
    solved: 'đã xong', setDone: 'Đã làm xong bài', setDoneSub: (c, n) => `Em làm đúng ${c}/${n} câu mà không cần trợ giúp.`,
    youWrote: (v) => `Em đã trả lời ${v}.`, noItems: 'Chưa có câu hỏi', minus: 'Đổi thành số âm',
  },
  fr: {
    levels: { focus: 'Essentiel', practice: 'Entraînement', challenge: 'Défi' },
    how: {
      focus: ['Lis la question', 'Réponds à chaque étape', 'Recopie le calcul'],
      practice: ['Fais les étapes clés', 'Une erreur ouvre les étapes', 'Recopie le calcul'],
      challenge: ['Calcule sur papier', 'Tape la réponse', 'Une erreur ouvre les étapes'],
    },
    howBig: {
      focus: ['Lis', 'Une étape à la fois', 'Recopie'],
      practice: ['Étapes clés', 'Aide si erreur', 'Recopie'],
      challenge: ['Calcule', 'Réponds', 'Aide si erreur'],
    },
    question: 'Question', step: 'Étape', answer: 'Réponse', check: 'Vérifier', hint: 'Indice', showMe: 'Montre-moi',
    working: 'Ton calcul', inHead: 'de tête', shownTag: 'montré',
    bookCopy: 'Recopie ceci dans ton cahier', next: 'Question suivante', finish: 'Terminer',
    clean: 'Juste du premier coup.', slipped: 'Fini. Une erreur, et tu l’as corrigée toi-même.', helped: 'Fini, avec une étape montrée.',
    notYet: 'Pas encore. Essaie encore.', opened: 'Faisons-le étape par étape.',
    shown: (a) => `La réponse est ${a}.`, why: 'Pourquoi ?', look: 'Regarde à nouveau cette étape.',
    nudge: { empty: 'Réponds d’abord, puis Vérifier.', comma: 'Utilise un point pour les décimaux, comme 2.5.', order: 'Range d’abord toutes les cartes.', gaps: 'Remplis d’abord chaque trou.' },
    subs: {
      number: 'Tape le nombre.', text: 'Tape le mot.', choice: 'Touche une réponse.', multi: 'Touche toutes les bonnes, puis Vérifier.',
      order: 'Touche-les dans l’ordre. Touche encore pour annuler.', gap: 'Remplis le trou.', tap: 'Touche le mot.', tapMany: 'Touche les mots, puis Vérifier.',
    },
    solved: 'faites', setDone: 'Série terminée', setDoneSub: (c, n) => `${c} sur ${n} justes sans aide.`,
    youWrote: (v) => `Ta réponse était ${v}.`, noItems: 'Pas encore de questions', minus: 'Le rendre négatif',
  },
};

export const words = (lang) => W[lang] || W.en;
