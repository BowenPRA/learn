import React from 'react';
import {
  Trophy, ClipboardCheck, Wrench, Check, X, BookOpen, RotateCcw, ChevronRight, Sparkles,
} from 'lucide-react';
import { deckItems } from '../../utils/notesReview';
import { tr } from '../../utils/lang';

/**
 * The end-of-lesson results for a Notes deck: every check and activity, right
 * or wrong, and the way back into the ones that are wrong.
 *
 * Getting one check wrong used to cost the mark for good — the only way back
 * was to read the whole deck again and get everything else right a second
 * time. Here "Fix my mistakes" walks through just the wrong ones (Notes.jsx
 * reopens each on its own slide), a wrong row redoes that one question, and a
 * right row shows it again. Right answers are never asked twice.
 */

const REVIEW_T = {
  en: {
    lessonDone: 'Lesson complete',
    right: (r, n) => `${r} of ${n} right`,
    fixIntro: (k) => `Fix ${k === 1 ? 'your mistake' : `your ${k} mistakes`} to earn full marks. You only redo what you got wrong — your right answers are kept.`,
    allRight: 'Full marks — every question right.',
    allFixed: 'All fixed — full marks!',
    fixAll: (k) => `Fix my mistakes (${k})`,
    questions: 'Questions',
    slide: (n) => `Slide ${n}`,
    fixed: 'Fixed',
    redo: 'Redo',
    view: 'View',
    readAgain: 'Read the lesson again',
    startOver: 'Start over',
    activity: 'Activity',
  },
  vn: {
    lessonDone: 'Hoàn thành bài học',
    right: (r, n) => `Đúng ${r} / ${n}`,
    fixIntro: (k) => `Sửa ${k} câu sai để đạt điểm tối đa. Em chỉ làm lại những câu sai — các câu đúng vẫn được giữ.`,
    allRight: 'Điểm tối đa — đúng tất cả.',
    allFixed: 'Đã sửa hết — điểm tối đa!',
    fixAll: (k) => `Sửa câu sai (${k})`,
    questions: 'Câu hỏi',
    slide: (n) => `Slide ${n}`,
    fixed: 'Đã sửa',
    redo: 'Làm lại',
    view: 'Xem',
    readAgain: 'Đọc lại bài',
    startOver: 'Làm lại từ đầu',
    activity: 'Hoạt động',
  },
  fr: {
    lessonDone: 'Leçon terminée',
    right: (r, n) => `${r} sur ${n} justes`,
    fixIntro: (k) => `Corrige ${k === 1 ? 'ton erreur' : `tes ${k} erreurs`} pour avoir tous les points. Tu refais seulement ce qui était faux — tes bonnes réponses sont gardées.`,
    allRight: 'Tous les points — tout est juste.',
    allFixed: 'Tout est corrigé — tous les points !',
    fixAll: (k) => `Corriger mes erreurs (${k})`,
    questions: 'Questions',
    slide: (n) => `Diapo ${n}`,
    fixed: 'Corrigé',
    redo: 'Refaire',
    view: 'Voir',
    readAgain: 'Relire la leçon',
    startOver: 'Recommencer',
    activity: 'Activité',
  },
};

const labelOf = ({ check, activity }, slide, lang) => {
  const pick = (en, vn, fr) => tr(lang, en, vn || en, fr || en);
  if (check) return pick(check.q, check.qVn, check.qFr);
  if (activity?.prompt) return pick(activity.prompt, activity.promptVn, activity.promptFr);
  return pick(slide?.title, slide?.titleVn, slide?.titleFr) || '';
};

export default function NotesReview({
  slides, checks, lang = 'en', parseText = (x) => x,
  onFixAll, onFixOne, onView, onReadAgain, onStartOver,
}) {
  const t = REVIEW_T[lang] || REVIEW_T.en;
  const items = deckItems(slides);
  const wrong = items.filter(({ i }) => !checks?.[i]?.correct);
  const right = items.length - wrong.length;
  const allRight = wrong.length === 0;
  const anyFixed = items.some(({ i }) => checks?.[i]?.correct && checks[i].retried);
  const HeadIcon = allRight ? Trophy : ClipboardCheck;

  return (
    <div className="w-full h-full max-w-3xl flex flex-col bg-white dark:bg-slate-900 rounded-2xl lg:rounded-3xl shadow-sm border-2 border-slate-200 dark:border-slate-800 overflow-hidden animate-in fade-in zoom-in-[0.98] duration-300">

      {/* Score band: the count, and a segment per question so the pattern of
          right and wrong reads at a glance. */}
      <div className={`shrink-0 px-5 sm:px-8 py-4 sm:py-6 text-white ${allRight ? 'bg-[#58cc02]' : 'bg-[#1cb0f6]'}`}>
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white/20 border-2 border-white/30 shadow-inner flex items-center justify-center shrink-0">
            <HeadIcon className="w-6 h-6 sm:w-7 sm:h-7" strokeWidth={2.5} />
          </div>
          <div className="min-w-0">
            <div className="text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] opacity-85">{t.lessonDone}</div>
            <div className="text-2xl sm:text-3xl font-black tracking-tight drop-shadow-sm">{t.right(right, items.length)}</div>
          </div>
        </div>
        <div className="flex gap-1 mt-4" aria-hidden="true">
          {items.map(({ i }) => (
            <span key={i} className={`h-2.5 flex-1 rounded-full ${checks?.[i]?.correct ? 'bg-white' : 'bg-[#ff4b4b] ring-2 ring-white/60'}`} />
          ))}
        </div>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto custom-scrollbar p-4 sm:p-6">
        {allRight ? (
          <div className="flex items-center gap-3 rounded-2xl border-2 border-[#58a700] bg-[#d7ffb8] px-4 py-3 font-black text-[#3e7500] text-sm sm:text-base">
            <Sparkles className="w-5 h-5 shrink-0" strokeWidth={2.5} />
            {anyFixed ? t.allFixed : t.allRight}
          </div>
        ) : (
          <div className="rounded-2xl border-2 border-amber-300 dark:border-amber-700 bg-amber-50 dark:bg-amber-900/20 p-4 flex flex-col sm:flex-row sm:items-center gap-3">
            <p className="flex-1 font-bold leading-snug text-amber-900 dark:text-amber-200 text-sm sm:text-base">{t.fixIntro(wrong.length)}</p>
            <button
              onClick={onFixAll}
              autoFocus
              className="shrink-0 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#ff9600] hover:bg-[#f08c00] border-b-[4px] border-[#cc7800] text-white font-black uppercase tracking-widest text-xs sm:text-sm active:border-b-0 active:translate-y-[4px] transition-all focus:outline-none focus-visible:ring-4 focus-visible:ring-amber-400/50"
            >
              <Wrench className="w-4 h-4" strokeWidth={3} />
              {t.fixAll(wrong.length)}
            </button>
          </div>
        )}

        <div className="mt-5 mb-2 text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">{t.questions}</div>
        <ol className="flex flex-col gap-2">
          {items.map((item) => {
            const { i } = item;
            const result = checks?.[i];
            const ok = !!result?.correct;
            const fixed = ok && !!result?.retried;
            const label = labelOf(item, slides[i], lang) || t.activity;
            return (
              <li key={i}>
                <button
                  onClick={() => (ok ? onView(i) : onFixOne(i))}
                  className={`group w-full flex items-center gap-3 text-left rounded-xl border-2 border-b-[4px] px-3 py-2.5 transition-all active:border-b-2 active:translate-y-[2px]
                    ${ok
                      ? 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                      : 'bg-[#fff5f5] dark:bg-rose-950/30 border-[#ffc1c1] dark:border-rose-900 hover:border-[#ea2b2b]'}`}
                >
                  <span className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${ok ? 'bg-[#58cc02] text-white' : 'bg-[#ff4b4b] text-white'}`}>
                    {ok ? <Check className="w-4 h-4" strokeWidth={3.5} /> : <X className="w-4 h-4" strokeWidth={3.5} />}
                  </span>
                  <span className="flex-1 min-w-0">
                    <span className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">
                      {t.slide(i + 1)}
                      {fixed && <span className="px-1.5 py-px rounded-md bg-[#d7ffb8] text-[#3e7500]">{t.fixed}</span>}
                    </span>
                    <span className="block font-bold text-sm text-slate-700 dark:text-slate-200 leading-snug line-clamp-2">{parseText(label)}</span>
                  </span>
                  <span className={`shrink-0 flex items-center gap-0.5 text-[10px] sm:text-xs font-black uppercase tracking-widest ${ok ? 'text-slate-400 dark:text-slate-500' : 'text-[#ea2b2b]'}`}>
                    {ok ? t.view : t.redo}
                    <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" strokeWidth={3} />
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
      </div>

      <div className="shrink-0 border-t-2 border-slate-100 dark:border-slate-800 px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-2">
        <button
          onClick={onReadAgain}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-slate-800 border-2 border-b-[4px] border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-200 font-black uppercase tracking-widest text-[10px] sm:text-xs hover:bg-slate-50 dark:hover:bg-slate-700 active:border-b-2 active:translate-y-[2px] transition-all"
        >
          <BookOpen className="w-4 h-4" strokeWidth={2.5} />
          {t.readAgain}
        </button>
        <button
          onClick={onStartOver}
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-slate-400 dark:text-slate-500 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 font-black uppercase tracking-widest text-[10px] sm:text-xs transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" strokeWidth={3} />
          {t.startOver}
        </button>
      </div>
    </div>
  );
}
