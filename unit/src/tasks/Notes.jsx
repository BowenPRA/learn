import React, { useState, useEffect, useRef, Component } from 'react';
import {
  ChevronRight, ChevronLeft, BookOpen, Scale, Target,
  MessageSquare, ShieldCheck, CheckCircle2, Construction,
  PlayCircle, PauseCircle, Maximize2, X, Pencil, MonitorPlay, Minimize2,
  Volume2, Repeat, AlertTriangle, UserCheck, HelpCircle, Equal, Scissors, Users,
  Wrench, RotateCcw, Lightbulb, ClipboardCheck, XCircle
} from 'lucide-react';

import TopBar from '../components/TopBar';
import WidgetRenderer from '../components/WidgetRenderer';
import { SlideLayout } from '../components/notes/layouts';
import ActivityBlock from '../components/notes/ActivityBlock';
import NotesReview from '../components/notes/NotesReview';
import Modal from '../components/ui/Modal';
import { retryKeepsParts } from '../utils/activity';
import { NOTES_BLOB_VERSION, deckItems, mistakesOf, restoreNotes } from '../utils/notesReview';
import { isLayout } from '../components/notes/layouts/helpers.jsx';
import { SafeInlineMath, SafeBlockMath } from '../components/notes/SafeMath.jsx';
import { splitInlineMath } from '../components/notes/splitInlineMath.js';
import useLang from '../hooks/useLang';
import { tr, field } from '../utils/lang';

const IconMap = {
  BookOpen, Scale, Target, MessageSquare, ShieldCheck,
  Repeat, AlertTriangle, UserCheck, HelpCircle, Equal, Scissors, Users,
};


class WidgetErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Interactive Widget Crashed:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-slate-50 dark:bg-slate-900 rounded-[2rem] border-2 border-dashed border-slate-300 dark:border-slate-700 text-center animate-in fade-in">
          <div className="w-12 h-12 bg-rose-100 dark:bg-rose-900/30 rounded-full flex items-center justify-center mb-3 shadow-inner">
            <Construction className="w-6 h-6 text-rose-500 dark:text-rose-400" strokeWidth={2.5} />
          </div>
          <h3 className="text-lg font-black text-slate-700 dark:text-slate-200 mb-1 tracking-tight">Widget Unavailable</h3>
          <p className="text-sm font-bold text-slate-500 dark:text-slate-400 max-w-[250px]">
            This interactive tool encountered an error. Please continue with the lesson.
          </p>
        </div>
      );
    }
    return this.props.children;
  }
}

/**
 * The check question a slide can carry: predict → answer → reveal.
 *
 * This is what the Notes task is scored on. Reaching the last slide used to pay
 * full marks, which taught the student that clicking Next is the goal; the deck
 * now has to ask, and the answer has to be right.
 */
function CheckBlock({ check, lang, answer, onAnswer, isDisplayMode, parseText, compact = false, side = false, badge = null }) {
  const question = field(check, 'q', lang);
  const explanation = tr(lang, check.expEn || check.expVn, check.expVn || check.expEn, check.expFr || check.expEn || check.expVn);

  // `compact` is used when the check sits in the layout slide's own footer bar,
  // which already frames it — so drop the top margin, the tinted box and the
  // extra padding, and shrink the options, keeping the answer section small.
  const shell = compact
    ? ''
    : `mt-6 shrink-0 rounded-2xl lg:rounded-[1.75rem] border-2 border-[#1cb0f6]/40 bg-[#1cb0f6]/[0.07] dark:bg-[#1cb0f6]/[0.1] ${isDisplayMode ? 'p-[clamp(1.25rem,2vw,2rem)]' : 'p-4 lg:p-6'}`;
  const optPad = compact ? 'p-2.5 lg:p-3 text-sm' : (isDisplayMode ? 'p-[clamp(0.9rem,1.3vw,1.25rem)] text-[clamp(1rem,1.5vw,1.3rem)]' : 'p-3 lg:p-4 text-sm lg:text-base');

  return (
    <div className={shell}>
      <div className={`flex flex-wrap items-center gap-y-1 text-[#1899d6] dark:text-[#5cc8ff] font-black uppercase tracking-widest ${compact ? 'mb-2' : 'mb-3'} ${isDisplayMode ? 'text-[clamp(0.75rem,1.1vw,1.1rem)]' : 'text-[10px] lg:text-xs'}`}>
        <HelpCircle className={isDisplayMode ? 'w-5 h-5 mr-2' : 'w-4 h-4 mr-2'} strokeWidth={3} />
        {tr(lang, 'Quick Check', 'Kiểm tra nhanh', 'Vérification rapide')}
        {badge}
      </div>

      <div className={`font-black text-slate-800 dark:text-slate-100 leading-snug ${compact ? 'mb-2.5' : 'mb-4'} ${isDisplayMode ? 'text-[clamp(1.1rem,1.8vw,1.5rem)]' : 'text-[15px] sm:text-base lg:text-lg'}`}>
        {parseText(question)}
      </div>

      {/* In the side panel the options stack in one column: two columns of
          sentence-length options in a 24rem strip wrap into ragged slivers. */}
      <div className={`grid gap-2 ${side ? 'sm:grid-cols-2 lg:grid-cols-1' : 'sm:grid-cols-2'}`}>
        {(check.options || []).map((opt) => {
          const label = field(opt, 'text', lang);
          const isRight = opt.val === check.correct;
          const picked = answer?.val === opt.val;

          let style = 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 border-b-[4px] text-slate-700 dark:text-slate-200 hover:border-[#1cb0f6] active:border-b-2 active:translate-y-[2px]';
          if (answer) {
            if (isRight) style = 'bg-[#d7ffb8] border-[#58a700] text-[#3e7500]';
            else if (picked) style = 'bg-[#ffdfe0] border-[#ea2b2b] text-[#c9362a]';
            else style = 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-400 dark:text-slate-600 opacity-60';
          }

          return (
            <button
              key={opt.val}
              disabled={!!answer}
              onClick={() => onAnswer(opt)}
              className={`flex items-start text-left rounded-xl border-2 font-bold transition-all disabled:cursor-default ${style} ${optPad}`}
            >
              <span className="font-black uppercase tracking-widest opacity-60 mr-2.5 mt-0.5">{opt.val}</span>
              <span className="flex-1">{parseText(label)}</span>
            </button>
          );
        })}
      </div>

      {answer && (
        <div className={`rounded-xl border-2 ${compact ? 'mt-2.5' : 'mt-4'} ${answer.correct ? 'bg-[#d7ffb8] border-[#58a700]' : 'bg-[#ffdfe0] border-[#ea2b2b]'} ${isDisplayMode ? 'p-[clamp(1rem,1.5vw,1.5rem)]' : (compact ? 'p-3' : 'p-4')}`}>
          <div className={`flex items-center font-black uppercase tracking-widest mb-1.5 ${answer.correct ? 'text-[#3e7500]' : 'text-[#a32d23]'} ${isDisplayMode ? 'text-[clamp(0.75rem,1.1vw,1.1rem)]' : 'text-[10px] lg:text-xs'}`}>
            {answer.correct
              ? <><CheckCircle2 className="w-4 h-4 mr-2" strokeWidth={3} />{tr(lang, 'Correct', 'Chính xác', 'Correct !')}</>
              : <><AlertTriangle className="w-4 h-4 mr-2" strokeWidth={3} />{tr(lang, 'Not quite', 'Chưa đúng', 'Pas tout à fait')}</>}
          </div>
          <div className={`font-bold leading-relaxed ${answer.correct ? 'text-[#3e7500]' : 'text-[#a32d23]'} ${isDisplayMode ? 'text-[clamp(1rem,1.5vw,1.3rem)]' : 'text-sm lg:text-base'}`}>
            {parseText(explanation)}
          </div>
        </div>
      )}
    </div>
  );
}

// Activities that read fine in a column beside the slide. A number line needs
// the full width to be tappable, so it keeps the footer under the slide.
const SIDE_ACTIVITIES = new Set(['predict', 'sort', 'order', 'estimate', 'hotspot', 'plot', 'reflect', 'venn',
  'terms', 'algebra', 'grid', 'flow', 'periodic', 'particles', 'formula', 'line', 'shift', 'round', 'busstop', 'ineq',
  'chain', 'cycle', 'ph',
  // Maths Unit 4: Fill the Zeros (4.1), Line Up the Points (4.2), Point Out
  // Point Back (4.3), Make It Easy (4.5) — under the slide they squeeze it to a
  // sliver at 1280×720.
  'decorder', 'deccol', 'pointback', 'makeeasy',
  // Maths Unit 5 and Science 3.2, one line per unit:
  // @@U05_1_SIDE@@
  'anglesum',
  // @@U05_2_SIDE@@
  'anglepair',
  // @@U05_3_SIDE@@
  'zeroline',
  // @@SCI_U03_2_SIDE@@
  // Maths Unit 6 and Science 3.3–3.7, one line per unit:
  // @@U06_1_SIDE@@
  // @@U06_2_SIDE@@
  // @@SCI_U03_3_SIDE@@
  'orbitlab',
  // @@SCI_U03_4_SIDE@@
  // @@SCI_U03_5_SIDE@@
  // @@SCI_U03_6_SIDE@@
  'energychange',
  // @@SCI_U03_7_SIDE@@
  'energysplit',
]);

// The words around fixing mistakes (the results screen has its own, in NotesReview).
const FIX_T = {
  en: {
    fixLater: 'No problem — you can fix this at the end of the lesson.',
    tryAgain: 'Try again',
    again: 'Have another go',
    kept: 'your right answers are kept',
    wasRight: 'You got this one right.',
    wasWrong: 'You got this one wrong last time.',
    fixing: (p, n) => `Fixing mistakes · ${p} of ${n}`,
    finishedBar: (r, n) => `Lesson finished · ${r} of ${n} right`,
    results: 'Results',
    skip: 'Skip',
    next: 'Next',
    finish: 'Finish',
    startOver: 'Start over',
    restartTitle: 'Start the lesson again?',
    restartBody: 'This clears your answers and goes back to slide 1. Your best score stays saved.',
    restartHint: "You don't need to start over to fix a mistake. At the end of the lesson you can redo every question you got wrong — and your right answers are kept.",
    restartHintDone: "You don't need to start over to fix your mistakes. “Fix my mistakes” redoes only the ones you got wrong — your right answers are kept.",
    keep: 'Keep my answers',
    modeFix: 'Fix Mistakes',
    modeResults: 'Lesson Results',
  },
  vn: {
    fixLater: 'Không sao — em có thể sửa câu này ở cuối bài.',
    tryAgain: 'Làm lại',
    again: 'Thử lại lần nữa',
    kept: 'các câu đúng vẫn được giữ',
    wasRight: 'Em đã làm đúng câu này.',
    wasWrong: 'Lần trước em làm sai câu này.',
    fixing: (p, n) => `Sửa câu sai · ${p} / ${n}`,
    finishedBar: (r, n) => `Đã học xong · đúng ${r} / ${n}`,
    results: 'Kết quả',
    skip: 'Bỏ qua',
    next: 'Tiếp',
    finish: 'Hoàn thành',
    startOver: 'Làm lại từ đầu',
    restartTitle: 'Học lại từ đầu?',
    restartBody: 'Thao tác này xoá các câu trả lời và quay về slide 1. Điểm cao nhất của em vẫn được lưu.',
    restartHint: 'Em không cần học lại từ đầu để sửa lỗi. Ở cuối bài, em có thể làm lại mọi câu sai — và các câu đúng vẫn được giữ.',
    restartHintDone: 'Em không cần học lại từ đầu để sửa lỗi. “Sửa câu sai” chỉ làm lại những câu em làm sai — các câu đúng vẫn được giữ.',
    keep: 'Giữ câu trả lời',
    modeFix: 'Sửa Câu Sai',
    modeResults: 'Kết Quả Bài Học',
  },
  fr: {
    fixLater: 'Pas de souci — tu pourras corriger ça à la fin de la leçon.',
    tryAgain: 'Réessayer',
    again: 'Essaie encore',
    kept: 'tes bonnes réponses sont gardées',
    wasRight: 'Ta réponse était juste.',
    wasWrong: 'La dernière fois, ta réponse était fausse.',
    fixing: (p, n) => `Corriger mes erreurs · ${p} sur ${n}`,
    finishedBar: (r, n) => `Leçon terminée · ${r} sur ${n} justes`,
    results: 'Résultats',
    skip: 'Passer',
    next: 'Suivant',
    finish: 'Terminer',
    startOver: 'Recommencer',
    restartTitle: 'Recommencer la leçon ?',
    restartBody: 'Tes réponses seront effacées et tu reviendras à la diapo 1. Ton meilleur score reste enregistré.',
    restartHint: 'Pas besoin de recommencer pour corriger une erreur. À la fin de la leçon, tu peux refaire chaque question ratée — et tes bonnes réponses sont gardées.',
    restartHintDone: 'Pas besoin de recommencer pour corriger tes erreurs. « Corriger mes erreurs » refait seulement celles que tu as ratées — tes bonnes réponses sont gardées.',
    keep: 'Garder mes réponses',
    modeFix: 'Corriger mes erreurs',
    modeResults: 'Résultats de la leçon',
  },
};

export default function Notes({ slides, onComplete, onProgress, onQuit, savedData, itemLog, bilingual = true, langs }) {
  // Resume where the student left off. Students routinely close a deck part
  // way through (the tablet sleeps, the lesson ends, they tap the X), and
  // before this every slide read and every check answered was thrown away.
  // A finished deck keeps its answers too (utils/notesReview.js), so it can
  // reopen on its results with the wrong ones ready to fix.
  const [restored] = useState(() => restoreNotes(savedData, slides, itemLog));

  const [currentIndex, setCurrentIndex] = useState(restored.slide);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [zoomedImage, setZoomedImage] = useState(null);
  // EN / VN, plus FR on Year 7 (`langs` from the host); English alone on an
  // English-only track. Both switches below render one button per language.
  const { lang, setLang, langs: offered } = useLang({ langs, bilingual });
  const [isDisplayMode, setIsDisplayMode] = useState(false);
  const [isIdle, setIsIdle] = useState(false);
  const [checkAnswers, setCheckAnswers] = useState(restored.checks); // slide index -> result
  // Show "picked up where you left off" until the student moves on.
  const [resumedAt, setResumedAt] = useState(!restored.finished && restored.slide > 0 ? restored.slide : null);

  // Reached the end at least once. From then on nothing blocks navigation, a
  // wrong answer can be reopened, and the end of the deck is the results.
  const [finished, setFinished] = useState(restored.finished);
  // 'deck' (the slides) or 'review' (the results). A finished deck with
  // mistakes left opens on its results: that is what the student came back for.
  const [view, setView] = useState(() => (restored.finished && mistakesOf(slides, restored.checks).length ? 'review' : 'deck'));
  // "Fix my mistakes": the wrong items' slides, walked in order.
  const [fixing, setFixing] = useState(null); // { queue: [slideIndex], pos }
  // Slides whose check or activity is open again for another go. The old
  // answer stays in `checkAnswers` until the new one replaces it, so leaving
  // a retry unanswered loses nothing.
  const [reopened, setReopened] = useState({}); // slide index -> true
  const [attempt, setAttempt] = useState({});   // slide index -> retries, a remount key
  const [session, setSession] = useState(0);    // bumped by Start over, a remount key
  const [confirmRestart, setConfirmRestart] = useState(false);
  // Answered anything this visit? Opening a finished deck and closing it again
  // must not log a fresh attempt (it would turn the study plan's "today" green
  // for no work — the QA-pass pattern).
  const [dirty, setDirty] = useState(false);

  const audioRef = useRef(null);
  const activeAudioUrl = useRef(null);
  const containerRef = useRef(null);
  // The furthest slide this session has reached, so a checkpoint saved from
  // an earlier slide (after paging back) never moves the resume point backwards.
  const [furthest, setFurthest] = useState(restored.slide);

  const stopAudio = () => {
    if (audioRef.current) {
      try {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      } catch(e) {
        console.warn("Audio cleanup error:", e);
      }
    }
    setIsPlayingAudio(false);
  };

  useEffect(() => {
    return () => stopAudio();
  }, []);

  // Changing slide must stop the previous slide's narration. Pausing an <audio>
  // element is a side effect on an external system, so it belongs in an effect;
  // the flagged setState is `stopAudio` clearing the play/pause icon.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    stopAudio();
  }, [currentIndex]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) setIsDisplayMode(false);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  useEffect(() => {
    let timeout;
    const handleActivity = () => {
      setIsIdle(false);
      clearTimeout(timeout);
      if (isDisplayMode) {
        timeout = setTimeout(() => setIsIdle(true), 3000);
      }
    };

    if (isDisplayMode) {
      handleActivity();
      window.addEventListener('mousemove', handleActivity);
      window.addEventListener('keydown', handleActivity);
      window.addEventListener('touchstart', handleActivity);
    } else {
      // Leaving display mode must clear the idle overlay. Cheap, runs only on the
      // mode flip, and there is no render-phase equivalent — `isDisplayMode` is
      // this component's own state, not a prop it can derive from.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsIdle(false);
    }

    return () => {
      clearTimeout(timeout);
      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('keydown', handleActivity);
      window.removeEventListener('touchstart', handleActivity);
    };
  }, [isDisplayMode]);

  const toggleDisplayMode = async () => {
    if (!document.fullscreenElement) {
      try {
        await containerRef.current?.requestFullscreen();
        setIsDisplayMode(true);
      } catch (err) {
        console.error("Error attempting to enable fullscreen:", err);
      }
    } else {
      if (document.exitFullscreen) {
        await document.exitFullscreen();
        setIsDisplayMode(false);
      }
    }
  };

  // Every scored item in the deck — a `check` question or an interactive
  // `activity` (sort/order/estimate/hotspot/predict) — with the slide it sits
  // on. Both score alike: one item, right or wrong.
  const items = deckItems(slides);
  const mistakes = mistakesOf(slides, checkAnswers);
  const rightCount = items.length - mistakes.length;
  const hasItem = (i) => !!(slides?.[i]?.check || slides?.[i]?.activity);
  // What a slide shows as answered: nothing while it is open for another go.
  const answerOf = (i) => (reopened[i] ? null : checkAnswers[i] || null);

  // First time through, a slide's check or activity must be finished before it
  // can be left behind — the reveal is the teaching, so skipping past it would
  // skip the point. Once the deck is finished nothing blocks: a retry left
  // unanswered simply keeps the old answer.
  const pendingCheck = !finished && view === 'deck' && hasItem(currentIndex) && !checkAnswers[currentIndex];

  // Notes is a native-10 task (taskRegistry), so score out of 10. A deck with
  // no check questions pays on completion only, so decks written before checks
  // existed keep their XP until they are authored with them.
  const scoreOf = (answers, done) => {
    if (!items.length) return done ? 10 : 0;
    const right = items.filter(({ i }) => answers[i]?.correct).length;
    return Math.round((right / items.length) * 10);
  };
  const itemsOf = (answers) => items.map(({ i, id }) => ({
    itemId: id,
    correct: !!answers[i]?.correct,
    ...(answers[i]?.retried ? { retried: true } : null),
  }));
  // A finished deck keeps its answers (v2) — the old reset to `{}` is what made
  // a single wrong check cost the mark for good.
  const blobOf = (answers, slide, done) => ({
    v: NOTES_BLOB_VERSION, slide: done ? 0 : slide, total: slides?.length || 0, checks: answers,
    ...(done ? { finished: true } : null),
  });

  // A checkpoint: persist the score so far and where to resume, without
  // logging an attempt. Undefined in the dev harnesses.
  const checkpoint = (answers, slide, done = finished) => {
    onProgress?.(scoreOf(answers, done), blobOf(answers, slide, done));
  };

  // A check answered, or an activity reporting its result (`{ done, correct,
  // ... }`, once) — kept in one per-slide map so resume covers both. On a
  // retry the new answer replaces the old one, and `retried` remembers the
  // item was missed first (the item log keeps it).
  const record = (index, result) => {
    if (answerOf(index)) return;
    const before = checkAnswers[index];
    const next = {
      ...checkAnswers,
      [index]: { ...result, correct: !!result?.correct, ...(before ? { retried: true } : null) },
    };
    setDirty(true);
    setCheckAnswers(next);
    setReopened((r) => { const n = { ...r }; delete n[index]; return n; });
    checkpoint(next, Math.max(furthest, index));
  };
  const finishActivity = (index, result) => record(index, result);
  const answerCheck = (index, option, check) => record(index, { val: option.val, correct: option.val === check.correct });

  // Open a slide's check or activity for another go.
  const reopen = (index) => {
    setReopened((r) => ({ ...r, [index]: true }));
    setAttempt((a) => ({ ...a, [index]: (a[index] || 0) + 1 }));
  };

  const leaveScreen = () => {
    stopAudio();
    if (document.fullscreenElement) document.exitFullscreen();
  };

  // The final save. A deck with nothing new this visit (re-read, or its results
  // looked at and closed) logs no attempt — see `dirty`.
  const complete = () => {
    leaveScreen();
    if ((dirty || !restored.finished) && typeof onComplete === 'function') {
      onComplete(scoreOf(checkAnswers, true), blobOf(checkAnswers, 0, true), { items: itemsOf(checkAnswers) });
      return;
    }
    if (typeof onQuit === 'function') onQuit();
  };

  // The end of the deck. Every item right: done. Anything wrong: the results,
  // where the student can put it right — saved as finished first, so a closed
  // tab reopens there too.
  const reachEnd = () => {
    setFinished(true);
    if (!items.length || mistakes.length === 0) { complete(); return; }
    leaveScreen();
    setReopened({});
    setView('review');
    checkpoint(checkAnswers, 0, true);
  };

  // The X button SAVES. A student who has answered something this visit gets
  // the same save a finished deck gets (one attempt, the per-item log); one
  // who has only read ahead keeps their place without logging an attempt.
  const handleQuit = () => {
    leaveScreen();
    const slide = Math.max(furthest, currentIndex);
    if (dirty && typeof onComplete === 'function') {
      onComplete(scoreOf(checkAnswers, finished), blobOf(checkAnswers, slide, finished), { items: itemsOf(checkAnswers) });
      return;
    }
    if (!finished && slide > 0) checkpoint(checkAnswers, slide);
    if (typeof onQuit === 'function') onQuit();
  };

  // "Start over": back to slide one with the answers cleared, and the saved
  // resume point cleared with them so a reload does not bring them back. It
  // is asked first (confirmRestart) — a student with one wrong answer tended to
  // reach for it, and lose every right one, when fixing at the end is what they wanted.
  const restart = () => {
    stopAudio();
    setConfirmRestart(false);
    setFinished(false);
    setView('deck');
    setFixing(null);
    setReopened({});
    setFurthest(0);
    setResumedAt(null);
    setCheckAnswers({});
    setCurrentIndex(0);
    setSession((s) => s + 1);
    setDirty(false);
    checkpoint({}, 0, false);
  };

  const goTo = (index) => {
    setResumedAt(null);
    setReopened({});
    setCurrentIndex(index);
    if (index > furthest) {
      setFurthest(index);
      // Reaching a new slide is progress worth keeping: save the position so
      // closing the tab mid-deck reopens on this slide, not slide one.
      if (!finished) checkpoint(checkAnswers, index);
    }
  };

  // Show a slide from the results: reopened for another go when it is still wrong.
  const showSlide = (index, retry) => {
    setResumedAt(null);
    setView('deck');
    setReopened(retry ? { [index]: true } : {});
    if (retry) setAttempt((a) => ({ ...a, [index]: (a[index] || 0) + 1 }));
    setCurrentIndex(index);
  };

  // "Fix my mistakes" (or one "Redo" row): walk the wrong items in order, each
  // on its own slide and open for another go, then come back to the results.
  const startFix = (queue) => {
    if (!queue.length) return;
    setFixing({ queue, pos: 0 });
    showSlide(queue[0], true);
  };
  const backToResults = () => {
    stopAudio();
    setFixing(null);
    setReopened({});
    setView('review');
  };
  const fixStep = (dir) => {
    const pos = fixing.pos + dir;
    if (pos < 0) return;
    if (pos >= fixing.queue.length) { backToResults(); return; }
    setFixing({ ...fixing, pos });
    const index = fixing.queue[pos];
    showSlide(index, !checkAnswers[index]?.correct);
  };

  const handleNext = () => {
    if (view === 'review' || confirmRestart) return;
    if (fixing) { fixStep(1); return; }
    if (pendingCheck) return;
    if (currentIndex < slides.length - 1) {
      goTo(currentIndex + 1);
    } else {
      reachEnd();
    }
  };

  const handlePrev = () => {
    if (view === 'review' || confirmRestart) return;
    if (fixing) { fixStep(-1); return; }
    if (currentIndex > 0) goTo(currentIndex - 1);
  };

  useEffect(() => {
    const handleGlobalNav = (e) => {
      const activeTag = document.activeElement?.tagName;
      if (activeTag === 'INPUT' || activeTag === 'TEXTAREA' || activeTag === 'SELECT') return;

      // Enter on a focused button belongs to that button (a check option, "Start
      // over", Prev) — not to "next slide".
      const focused = document.activeElement;
      if (e.key === 'Enter' && focused?.tagName === 'BUTTON' && !focused.disabled) return;

      if (e.key === 'ArrowRight' || e.key === 'Enter') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      } else if (e.key === 'Escape' && zoomedImage) {
        setZoomedImage(null);
      } else if (e.key.toLowerCase() === 'f' && !e.ctrlKey && !e.metaKey && !e.altKey && view === 'deck' && !confirmRestart) {
        // (Bare F only — Ctrl/Cmd+F is the browser's find.)
        e.preventDefault();
        toggleDisplayMode();
      }
    };
    window.addEventListener('keydown', handleGlobalNav);
    return () => window.removeEventListener('keydown', handleGlobalNav);
    // checkAnswers: answering the check on the current slide unblocks Enter/→,
    // and the listener has to be rebuilt to see it; the rest steer what → does.
  }, [currentIndex, slides?.length, zoomedImage, checkAnswers, view, fixing, reopened, finished, confirmRestart]); // eslint-disable-line react-hooks/exhaustive-deps -- handleNext/handlePrev are stable navigation, re-binding the key listener each render is worse

  if (!slides || !Array.isArray(slides) || slides.length === 0) {
    return (
      <div className="h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-6 text-center animate-in fade-in duration-500 transition-colors">
        <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center mb-4 shadow-inner">
          <Construction className="w-8 h-8 text-indigo-500 dark:text-indigo-400" strokeWidth={2.5} />
        </div>
        <h2 className="text-2xl font-black text-slate-800 dark:text-slate-100 mb-2 tracking-tight">Notes Unavailable</h2>
        <div className="bg-white dark:bg-slate-900 px-6 py-3 rounded-2xl shadow-sm border-2 border-slate-200 dark:border-slate-800 mb-6 text-sm font-bold text-slate-500 dark:text-slate-400">
          No lecture slides have been configured for this module yet.
        </div>
        <button onClick={handleQuit} className="px-6 py-3 bg-[#1CB0F6] hover:bg-[#1899D6] text-white rounded-xl font-black text-base uppercase tracking-widest border-b-[4px] border-[#1899D6] active:border-b-0 active:translate-y-[4px] transition-all">
          Return to Dashboard
        </button>
      </div>
    );
  }
  
  const currentSlide = slides[currentIndex];
  const slideTitle = field(currentSlide, 'title', lang);
  const slideSubtitle = field(currentSlide, 'subtitle', lang);
  const slideObjective = field(currentSlide, 'objective', lang);
  const slideWarmUp = field(currentSlide, 'warmUp', lang);

  const slideContent = field(currentSlide, 'content', lang);
  const slideExample = field(currentSlide, 'example', lang);
  
  const hasContent = !!slideContent;
  const hasExample = !!slideExample;
  const hasDiagram = !!currentSlide.widget || !!currentSlide.image || !!currentSlide.inlineSvg;

  const t = FIX_T[lang] || FIX_T.en;
  const slideCheck = currentSlide.check || null;
  // What the slide shows as answered (nothing while it is open for another go),
  // and the answer on file, which a retry of a several-part activity starts from.
  const slideAnswer = answerOf(currentIndex);
  const slideStored = checkAnswers[currentIndex] || null;
  const slideRetrying = !!reopened[currentIndex];

  // Flexible lesson layouts ported from the classroom Lessons project. A slide
  // with a `layout` renders through one of these; slides with only a `type`
  // (intro/concept/summary/warmup) keep the legacy renderer below untouched.
  const hasLayout = isLayout(currentSlide.layout);
  const pick = (en, vn, fr) => tr(lang, en, vn, fr);
  // A widget zoomed from a layout slide keeps the slide's language (`withLang`);
  // the legacy concept slide's widget never took one, so its zoom stays as it was.
  const layoutCtx = { pick, lang, isDisplayMode, onZoom: (z) => setZoomedImage(z && { ...z, withLang: true }) };

  const showExampleOnRight = hasExample && !hasDiagram;
  const rightPanelExists = hasDiagram || showExampleOnRight;

  // Where a layout slide's check or activity sits. Under the slide it used to
  // take up to 40% (check) or 62% (activity) of the card, which on a 720px
  // laptop screen left a showcase diagram twenty pixels tall. Laptops are
  // wide and short, so from lg the question moves BESIDE the slide and the
  // slide keeps its full height; narrower screens keep the footer.
  const slideActivity = !slideCheck && currentSlide.activity ? currentSlide.activity : null;
  const sidePanel = hasLayout && (!!slideCheck || (slideActivity && SIDE_ACTIVITIES.has(slideActivity.type)));

  const labelEn = currentSlide.exampleLabel || 'Example';
  const labelVn = currentSlide.exampleLabelVn || currentSlide.exampleLabel || 'Ví Dụ';
  const labelFr = currentSlide.exampleLabelFr || currentSlide.exampleLabel || 'Exemple';
  const displayLabel = tr(lang, labelEn, labelVn, labelFr);

  const toggleAudio = (audioUrl) => {
    if (!audioUrl) return;
    try {
      // 1. Force the base to be an absolute path (e.g., "Dashboard/" becomes "/Dashboard/")
      let base = import.meta.env.BASE_URL || '/';
      if (!base.startsWith('/')) base = `/${base}`;
      if (!base.endsWith('/')) base = `${base}/`;

      // 2. Prevent "double-dipping" if the audioUrl somehow already includes the base
      let path = audioUrl;
      
      // Check if path already starts with /Dashboard/ and strip it back to /
      if (base !== '/' && path.startsWith(base)) {
        path = path.replace(base, '/');
      } else if (base !== '/' && path.startsWith(base.slice(0, -1))) {
        // Catch the edge case where it starts with /Dashboard (no trailing slash)
        path = path.replace(base.slice(0, -1), '/');
      }

      // 3. Construct a guaranteed absolute URL
      const cleanUrl = path.startsWith('/') 
        ? `${base}${path.slice(1)}`
        : `${base}${path}`;

      if (isPlayingAudio && audioRef.current) {
        audioRef.current.pause();
        setIsPlayingAudio(false);
      } else {
        if (!audioRef.current || activeAudioUrl.current !== cleanUrl) {
          if (audioRef.current) {
             audioRef.current.pause();
             audioRef.current.src = ""; // Hard unload of the old track
          }
          audioRef.current = new Audio(cleanUrl);
          activeAudioUrl.current = cleanUrl;
          audioRef.current.onended = () => setIsPlayingAudio(false);
          audioRef.current.onerror = (e) => console.error("Audio failed to load from:", cleanUrl, e);
        }
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise.then(() => setIsPlayingAudio(true)).catch(error => {
            console.warn("Audio playback prevented by browser autoplay policies.", error);
            setIsPlayingAudio(false);
          });
        }
      }
    } catch (e) {
      console.warn("Audio interaction failed completely:", e);
      setIsPlayingAudio(false);
    }
  };

  const parseInlineText = (text) => {
    if (!text) return null;
    const parts = text.split(/(\*\*.*?\*\*)/g);
    
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={`bold-${i}`} className="font-black text-slate-900 dark:text-slate-100">
            {splitInlineMath(part.slice(2, -2)).map((m, j) => (
              m.math !== undefined
                ? <SafeInlineMath key={`m-${j}`} math={m.math} />
                : <span key={`t-${j}`}>{m.text}</span>
            ))}
          </strong>
        );
      }

      // Shared scanner, so an escaped `\$` (currency) is never read as a delimiter.
      return splitInlineMath(part).map((m, j) => (
        m.math !== undefined
          ? <SafeInlineMath key={`m-${i}-${j}`} math={m.math} />
          : <span key={`t-${i}-${j}`}>{m.text}</span>
      ));
    });
  };

  // "Have another go" beside the check's or activity's heading while it is
  // reopened — with a promise that the right parts are kept, where they are.
  const retryBadge = (activity = null) => (slideRetrying ? (
    <span className="ml-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-200 normal-case tracking-normal font-black text-[11px] leading-tight">
      <RotateCcw className="w-3 h-3 shrink-0" strokeWidth={3} />
      {t.again}{activity && retryKeepsParts(activity) && slideStored && !slideStored.restored ? ` · ${t.kept}` : ''}
    </span>
  ) : null);

  // Under a wrong answer. The first time through: the reassurance that it can
  // be fixed at the end (the lesson is not over because of one slip). Once
  // the deck is finished: the way to fix it, right here.
  const itemFooter = () => {
    if (!slideAnswer || slideAnswer.correct) return null;
    if (!finished) {
      return (
        <div className="mt-2.5 flex items-start gap-2 text-xs lg:text-sm font-bold leading-snug text-slate-500 dark:text-slate-400 animate-in fade-in">
          <Repeat className="w-4 h-4 shrink-0 mt-px text-[#1cb0f6]" strokeWidth={3} />
          <span>{t.fixLater}</span>
        </div>
      );
    }
    return (
      <div className="mt-2.5 flex justify-end animate-in fade-in">
        <button
          onClick={() => reopen(currentIndex)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#ff9600] hover:bg-[#f08c00] border-b-[4px] border-[#cc7800] text-white font-black uppercase tracking-widest text-xs active:border-b-0 active:translate-y-[4px] transition-all"
        >
          <RotateCcw className="w-4 h-4" strokeWidth={3} />
          {t.tryAgain}
        </button>
      </div>
    );
  };

  // An activity result rebuilt from the item log keeps right/wrong and nothing
  // else, so it cannot be drawn in its checked state — say which it was.
  const restoredActivity = (activity, result) => (
    <div>
      <div className="font-black text-slate-800 dark:text-slate-100 leading-snug mb-2 text-[15px] sm:text-base lg:text-lg">
        {parseInlineText(pick(activity.prompt, activity.promptVn, activity.promptFr))}
      </div>
      <div className={`flex items-center gap-2 rounded-xl border-2 p-3 font-bold text-sm lg:text-base ${result.correct ? 'bg-[#d7ffb8] border-[#58a700] text-[#3e7500]' : 'bg-[#ffdfe0] border-[#ea2b2b] text-[#a32d23]'}`}>
        {result.correct ? <CheckCircle2 className="w-5 h-5 shrink-0" strokeWidth={3} /> : <XCircle className="w-5 h-5 shrink-0" strokeWidth={3} />}
        {result.correct ? t.wasRight : t.wasWrong}
      </div>
    </div>
  );

  const renderContent = (text, isExample = false) => {
    if (!text || typeof text !== 'string') return null;

    const blockParts = text.split(/(\$\$[\s\S]+?\$\$)/g);
    const elements = [];
    let groupedBumpers = [];

    const flushBumpers = () => {
      if (groupedBumpers.length > 0) {
        elements.push(
          <div key={`bumper-${elements.length}`} className={`my-4 bg-[#ffc800]/10 dark:bg-amber-900/10 border-l-[6px] border-[#ffc800] p-4 sm:p-5 rounded-r-2xl relative animate-in fade-in transition-all ${isDisplayMode ? 'ml-[clamp(1rem,1.5vw,1.5rem)]' : 'ml-0'}`}>
            <div className={`absolute ${isDisplayMode ? '-left-[18px] top-4 p-1.5' : '-left-[14px] top-4 p-1.5'} bg-[#ffc800] text-amber-950 rounded-full shadow-sm border-[2px] border-white dark:border-slate-900 z-10`}>
              <Pencil className={isDisplayMode ? "w-5 h-5" : "w-4 h-4"} strokeWidth={3} />
            </div>
            <div className={`space-y-3 ${isDisplayMode ? 'ml-3' : 'ml-3'}`}>
              {groupedBumpers.map((line, idx) => (
                <p key={idx} className={`text-amber-950 dark:text-amber-200 font-bold leading-relaxed ${isDisplayMode ? 'text-[clamp(1.15rem,1.8vw,1.6rem)]' : 'text-sm sm:text-base lg:text-lg'}`}>
                  {parseInlineText(line)}
                </p>
              ))}
            </div>
          </div>
        );
        groupedBumpers = [];
      }
    };

    blockParts.forEach((blockPart, i) => {
      if (blockPart.startsWith('$$') && blockPart.endsWith('$$')) {
        flushBumpers();
        const mathExpression = blockPart.slice(2, -2).trim();
        
        elements.push(
          <div key={`math-block-${i}`} className={`w-full text-slate-800 dark:text-slate-100 ${isDisplayMode ? 'text-4xl' : 'text-xl lg:text-2xl'}`}>
            <SafeBlockMath math={mathExpression} />
          </div>
        );
      } else {
        const lines = blockPart.split('\n');
        lines.forEach((line, j) => {
          if (!line.trim()) {
            flushBumpers();
            elements.push(<div key={`space-${i}-${j}`} className={isDisplayMode ? "h-[clamp(0.75rem,1.5vh,1.5rem)]" : "h-3"} />);
          } else if (line.trim().startsWith('>')) {
            groupedBumpers.push(line.replace('>', '').trim());
          } else {
            flushBumpers();
            elements.push(
              <p key={`p-${i}-${j}`} className={`${isExample ? 'mb-1' : 'mb-3'} text-slate-700 dark:text-slate-300 font-medium ${isDisplayMode ? 'text-[clamp(1rem,1.8vw,1.6rem)] leading-relaxed tracking-tight' : 'text-[15px] sm:text-base lg:text-lg leading-relaxed'}`}>
                {parseInlineText(line)}
              </p>
            );
          }
        });
      }
    });
    
    flushBumpers(); 
    return elements;
  };

  // The nav's right-hand button. On the results it closes the lesson; while
  // fixing it steps to the next mistake (or skips one left unanswered), then
  // back to the results; otherwise it walks the deck.
  const lastSlide = currentIndex === slides.length - 1;
  const lastFix = !!fixing && fixing.pos === fixing.queue.length - 1;
  const fixNext = lastFix ? t.results : slideAnswer ? t.next : t.skip;
  const next = view === 'review'
    ? { long: t.finish, short: t.finish, green: true, chevron: false }
    : fixing
      ? { long: fixNext, short: fixNext, green: lastFix, chevron: !lastFix }
      : { long: lastSlide ? 'Finish' : 'Continue', short: lastSlide ? 'End' : 'Next', green: lastSlide, chevron: !lastSlide };

  return (
    <div 
      ref={containerRef} 
      className={`h-screen flex flex-col bg-slate-50 dark:bg-slate-950 font-sans selection:bg-indigo-100 overflow-hidden relative transition-colors duration-300 ${isDisplayMode && isIdle ? 'cursor-none' : ''}`}
    >
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar { height: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background-color: rgba(148, 163, 184, 0.3); border-radius: 10px; }
        .dark .custom-scrollbar::-webkit-scrollbar-thumb { background-color: rgba(71, 85, 105, 0.4); }
      `}} />

      {!isDisplayMode && (
        <TopBar
          onQuit={handleQuit}
          current={view === 'review' ? rightCount : fixing ? fixing.pos + 1 : currentIndex + 1}
          total={view === 'review' ? items.length : fixing ? fixing.queue.length : slides.length}
          modeTitle={view === 'review' ? t.modeResults : fixing ? t.modeFix : 'Lesson Notes'}
        />
      )}

      {/* Main Content Area */}
      <div className={`flex-1 flex justify-center items-center z-10 overflow-hidden relative min-h-0 ${isDisplayMode ? 'p-0' : 'p-2.5 sm:p-4 lg:p-5'}`}>

        {/* Animated Wrapper for Cross-fade on slide change. A layout slide
            with a side panel lays out as a row from lg; the legacy `type`
            slides render header + body as siblings, so they must stay a
            column. */}
        {/* The results, in place of the slide: what was right, what was
            wrong, and the way back into the wrong ones. */}
        {view === 'review' ? (
          <NotesReview
            slides={slides}
            checks={checkAnswers}
            lang={lang}
            parseText={parseInlineText}
            onFixAll={() => startFix(mistakes)}
            onFixOne={(i) => startFix([i])}
            onView={(i) => showSlide(i, false)}
            onReadAgain={() => showSlide(0, false)}
            onStartOver={() => setConfirmRestart(true)}
          />
        ) : (
        <div
          key={`${session}:${currentIndex}`}
          className={`w-full max-h-full flex flex-col bg-white dark:bg-slate-900 overflow-hidden transition-all duration-500 animate-in fade-in zoom-in-[0.98]
          ${sidePanel ? 'lg:flex-row' : ''}
          ${isDisplayMode
            ? 'h-full max-w-none rounded-none border-0'
            : `rounded-2xl lg:rounded-3xl shadow-sm border-2 border-slate-200 dark:border-slate-800 h-full ${(rightPanelExists || hasLayout) ? 'max-w-7xl' : 'max-w-4xl'}`
          }`}
        >

          {hasLayout && (
            <>
              <div className="flex-1 min-h-0 min-w-0 flex flex-col overflow-hidden relative">
                <SlideLayout name={currentSlide.layout} slide={currentSlide} ctx={layoutCtx} />
                {/* Autonomous narration for layout slides lives in the bottom
                    bar (the Listen button beside Project). It used to float
                    over the slide's bottom-right corner, where it sat on top
                    of showcase captions and the last line of every statement. */}
              </div>
              {/* The check, or the activity: a footer under the slide on a
                  phone or tablet (capped so the slide keeps at least half the
                  card), a column beside it from lg. An activity's column is
                  wider than a check's — a sort has bins, a plot has a grid. */}
              {slideCheck && (
                <div className={`shrink-0 max-h-[50%] overflow-y-auto custom-scrollbar border-t-2 border-[#1cb0f6]/30 bg-[#1cb0f6]/[0.05] dark:bg-[#1cb0f6]/[0.08] px-4 sm:px-6 py-3
                  lg:max-h-none lg:h-auto lg:w-[34%] lg:max-w-[26rem] lg:border-t-0 lg:border-l-2 lg:px-5 lg:py-5 lg:flex lg:flex-col`}>
                  {/* my-auto, not justify-center: centring a scroll box's
                      content clips its top once it overflows. */}
                  <div className="w-full lg:my-auto">
                    <CheckBlock
                      check={slideCheck}
                      lang={lang}
                      answer={slideAnswer}
                      onAnswer={(opt) => answerCheck(currentIndex, opt, slideCheck)}
                      isDisplayMode={isDisplayMode}
                      parseText={parseInlineText}
                      compact
                      side
                      badge={retryBadge()}
                    />
                    {itemFooter()}
                  </div>
                </div>
              )}
              {slideActivity && (
                <div className={`shrink-0 max-h-[55%] overflow-y-auto custom-scrollbar border-t-2 border-[#1cb0f6]/30 bg-[#1cb0f6]/[0.05] dark:bg-[#1cb0f6]/[0.08] px-4 sm:px-6 py-3
                  ${sidePanel ? 'lg:max-h-none lg:h-auto lg:w-[42%] lg:max-w-[34rem] lg:border-t-0 lg:border-l-2 lg:px-5 lg:py-5 lg:flex lg:flex-col' : 'lg:px-8'}`}>
                  <div className="w-full lg:my-auto">
                    {slideAnswer?.restored ? restoredActivity(slideActivity, slideAnswer) : (
                      // Keyed by the retry count: reopening remounts it, so no
                      // state from the last go (a tap count, a half-built
                      // order) carries into the new one.
                      <ActivityBlock
                        key={`${currentIndex}:${attempt[currentIndex] || 0}`}
                        activity={slideActivity}
                        lang={lang}
                        result={slideAnswer}
                        retry={slideRetrying && slideStored && !slideStored.restored ? slideStored : null}
                        badge={retryBadge(slideActivity)}
                        onResult={(res) => finishActivity(currentIndex, res)}
                        parseText={parseInlineText}
                        isDisplayMode={isDisplayMode}
                        side={sidePanel}
                      />
                    )}
                    {itemFooter()}
                  </div>
                </div>
              )}
            </>
          )}

          {!hasLayout && currentSlide.type === 'intro' && (
            <div className={`flex-1 flex flex-col items-center justify-center p-8 sm:p-12 text-center text-white ${currentSlide.color || 'bg-[#1cb0f6] dark:bg-[#1899d6]'} overflow-y-auto min-h-0`}>
              <div className={`bg-white/20 mx-auto rounded-[2rem] flex items-center justify-center mb-8 shadow-inner border-[4px] border-white/30 ${isDisplayMode ? 'w-32 h-32' : 'w-24 h-24'}`}>
                <BookOpen className={`opacity-100 ${isDisplayMode ? 'w-16 h-16' : 'w-12 h-12'}`} strokeWidth={2.5} />
              </div>
              {currentSlide.unit && (
                <div className={`inline-block bg-white/20 text-white font-black uppercase tracking-[0.2em] rounded-full mb-5 border border-white/30 shadow-inner ${isDisplayMode ? 'text-[clamp(0.9rem,1.4vw,1.4rem)] px-6 py-2' : 'text-xs sm:text-sm px-4 py-1.5'}`}>
                  {currentSlide.unit}
                </div>
              )}
              <h1 className={`font-black tracking-tight mb-6 drop-shadow-md leading-tight ${isDisplayMode ? 'text-[clamp(3rem,6vw,7rem)]' : 'text-4xl lg:text-6xl'}`}>
                {slideTitle || 'Introduction'}
              </h1>
              {slideObjective ? (
                <div className={`bg-white/15 backdrop-blur-sm rounded-2xl border-2 border-white/25 shadow-inner max-w-3xl mx-auto ${isDisplayMode ? 'px-8 py-6' : 'px-5 py-4'}`}>
                  <div className={`font-black uppercase tracking-[0.2em] opacity-80 mb-1.5 ${isDisplayMode ? 'text-[clamp(0.8rem,1.1vw,1.1rem)]' : 'text-[10px] sm:text-xs'}`}>
                    {tr(lang, 'Objective', 'Mục tiêu', 'Objectif')}
                  </div>
                  <p className={`font-bold opacity-95 drop-shadow-sm leading-snug ${isDisplayMode ? 'text-[clamp(1.4rem,2.6vw,2.6rem)]' : 'text-lg lg:text-2xl'}`}>
                    {slideObjective}
                  </p>
                </div>
              ) : (
                <p className={`font-bold opacity-90 drop-shadow-sm max-w-4xl mx-auto ${isDisplayMode ? 'text-[clamp(1.5rem,3vw,3rem)]' : 'text-xl lg:text-2xl'}`}>
                  {slideSubtitle}
                </p>
              )}

              {slideWarmUp && (
                <div className={`bg-white rounded-2xl shadow-xl border-2 border-amber-300 text-left max-w-3xl mx-auto ${isDisplayMode ? 'mt-8 px-8 py-6' : 'mt-6 px-5 py-4'}`}>
                  <div className={`flex items-center gap-2 text-amber-600 font-black uppercase tracking-[0.15em] mb-2 ${isDisplayMode ? 'text-[clamp(0.8rem,1.1vw,1.15rem)]' : 'text-[11px] sm:text-xs'}`}>
                    <Pencil className={isDisplayMode ? 'w-5 h-5' : 'w-4 h-4'} strokeWidth={3} />
                    {tr(lang, 'Warm-Up · Do this now in your book', 'Khởi động · Làm ngay vào vở', 'Échauffement · À faire tout de suite dans ton cahier')}
                  </div>
                  <div className={`font-bold text-slate-800 leading-snug ${isDisplayMode ? 'text-[clamp(1.3rem,2.4vw,2.4rem)]' : 'text-lg lg:text-2xl'}`}>
                    {parseInlineText(slideWarmUp)}
                  </div>
                </div>
              )}

              {!isDisplayMode && currentSlide.audio && (
                 <button onClick={() => {
                      toggleAudio(currentSlide.audio);
                    }} className="mt-12 mx-auto flex items-center bg-white text-slate-800 rounded-2xl font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-transform shadow-md border-b-[4px] border-slate-200 active:border-b-0 active:translate-y-[4px] px-6 py-3 text-sm">
                   {isPlayingAudio ? <PauseCircle className="w-6 h-6 mr-3 text-slate-800" /> : <PlayCircle className="w-6 h-6 mr-3 text-slate-800" />}
                   {isPlayingAudio ? "Stop Audio" : "Listen"}
                 </button>
              )}
            </div>
          )}

          {currentSlide.type === 'concept' && (() => {
            const SlideIcon = IconMap[currentSlide.icon] || BookOpen;
            const themeColor = currentSlide.color || 'bg-[#1cb0f6]';

            return (
              <>
                {/* Header Banner */}
                <div className={`${themeColor} ${isDisplayMode ? 'p-2 sm:p-3 lg:p-4' : 'p-4 lg:p-6'} text-white flex items-center relative overflow-hidden flex-shrink-0 border-b-4 border-black/10 transition-all`}>
                  <div className={`bg-white/20 rounded-xl mr-3 sm:mr-4 shadow-inner border border-white/30 z-10 ${isDisplayMode ? 'p-2' : 'p-2.5 lg:p-3'}`}>
                    <SlideIcon className={`drop-shadow-sm ${isDisplayMode ? 'w-6 h-6' : 'w-5 h-5 lg:w-8 lg:h-8'}`} strokeWidth={2.5} />
                  </div>
                  <h2 className={`font-black tracking-tight z-10 relative drop-shadow-md pr-16 sm:pr-64 ${isDisplayMode ? 'text-[clamp(1.25rem,2vw,2rem)]' : 'text-xl sm:text-2xl lg:text-4xl'}`}>
                    {slideTitle || 'Concept'}
                  </h2>
                  
                  {!isDisplayMode && currentSlide.audio && (
                    <button 
                      onClick={() => {
                        // eslint-disable-next-line react-hooks/refs -- runs on click, never during render
                        toggleAudio(currentSlide.audio);
                      }}
                      className="ml-auto z-10 bg-white/20 hover:bg-white/30 transition-colors rounded-xl shadow-sm border border-white/30 active:scale-95 border-b-[4px] active:border-b-[1px] active:translate-y-[3px] p-2 lg:p-3"
                    >
                      {isPlayingAudio ? <PauseCircle className="drop-shadow-sm w-6 h-6 lg:w-7 lg:h-7" /> : <PlayCircle className="drop-shadow-sm w-6 h-6 lg:w-7 lg:h-7" />}
                    </button>
                  )}
                </div>
                
                {/* Content Body */}
                <div className="flex flex-col lg:flex-row flex-1 min-h-0 overflow-hidden">
                  
                  {/* Left Panel: Primary Content, Inline Examples & the Check */}
                  {(hasContent || (hasExample && hasDiagram) || slideCheck) && (
                    <div className={`flex-none h-[45%] lg:h-auto lg:flex-1 flex flex-col overflow-y-auto custom-scrollbar border-b-2 lg:border-b-0 border-slate-100 dark:border-slate-800 ${isDisplayMode ? 'p-[clamp(1.5rem,3vw,3rem)]' : 'p-4 sm:p-6 lg:p-10'} ${rightPanelExists ? 'lg:border-r-2 lg:w-[45%]' : 'w-full max-w-4xl mx-auto'}`}>
                      
                      {hasContent && <div className={hasExample && hasDiagram ? "pb-4 lg:pb-6" : ""}>{renderContent(slideContent)}</div>}
                      
                      {/* Only render example on Left side if the Right side is occupied by a Diagram */}
                      {hasExample && hasDiagram && (
                        <div className={`bg-slate-50 dark:bg-slate-800/50 border-2 border-slate-200 dark:border-slate-700 rounded-2xl lg:rounded-3xl relative shadow-sm shrink-0 ${isDisplayMode ? 'mt-6 p-[clamp(1.25rem,2vw,2rem)]' : 'mt-6 lg:mt-8 p-4 lg:p-6'}`}>
                          <div className={`absolute -top-3.5 lg:-top-4 left-4 lg:left-6 ${themeColor} text-white font-black uppercase tracking-widest rounded-lg lg:rounded-xl shadow-sm ${isDisplayMode ? 'text-[clamp(0.75rem,1.1vw,1.1rem)] px-5 py-2' : 'text-[9px] lg:text-xs px-3 lg:px-4 py-1'}`}>
                            {displayLabel}
                          </div>
                          
                          <div className={`font-bold text-slate-800 dark:text-slate-200 mt-1 lg:mt-2 leading-relaxed ${isDisplayMode ? 'text-[clamp(1.1rem,1.8vw,1.5rem)]' : 'text-sm sm:text-base lg:text-xl'}`}>
                            {renderContent(slideExample, true)}
                          </div>
                        </div>
                      )}

                      {slideCheck && (
                        <>
                          <CheckBlock
                            check={slideCheck}
                            lang={lang}
                            answer={slideAnswer}
                            onAnswer={(opt) => answerCheck(currentIndex, opt, slideCheck)}
                            isDisplayMode={isDisplayMode}
                            parseText={parseInlineText}
                            badge={retryBadge()}
                          />
                          {itemFooter()}
                        </>
                      )}
                    </div>
                  )}

                  {/* Right Panel: Diagram OR Adaptive Example Block */}
                  {rightPanelExists && (
                    <div className={`flex-1 w-full ${hasContent ? 'lg:w-[55%]' : 'lg:w-full'} bg-slate-50/50 dark:bg-slate-900/50 flex flex-col items-center justify-center flex-shrink-0 min-h-0 ${isDisplayMode ? 'p-[clamp(1.5rem,3vw,3rem)]' : 'p-3 sm:p-4 lg:p-8'}`}>
                      
                      {hasDiagram ? (
                        <div className={`relative w-full h-full bg-white dark:bg-slate-800 shadow-sm flex flex-col items-center justify-center overflow-hidden group transition-all duration-300 
                          ${isDisplayMode ? 'rounded-[2rem]' : 'rounded-2xl lg:rounded-[2rem]'} 
                          ${currentSlide.drawThis ? 'border-[3px] lg:border-[4px] border-[#ffc800]' : 'border-2 border-slate-200 dark:border-slate-700'}`}>
                          
                          {currentSlide.drawThis && (
                            <div className={`absolute top-0 right-0 bg-[#ffc800] text-amber-950 font-black uppercase tracking-widest rounded-bl-2xl lg:rounded-bl-3xl z-20 shadow-sm flex items-center border-b-2 border-l-2 border-[#cca000] ${isDisplayMode ? 'text-[clamp(0.75rem,1vw,1.1rem)] px-5 py-2.5' : 'text-[9px] sm:text-xs px-3 lg:px-4 py-1.5 lg:py-2'}`}>
                              <Pencil className={`${isDisplayMode ? 'w-4 h-4 mr-2' : 'w-3 h-3 lg:w-4 lg:h-4 mr-1.5 lg:mr-2'}`} strokeWidth={3} />
                              {tr(lang, 'Draw This', 'Vẽ Hình Này', 'À dessiner')}
                            </div>
                          )}

                          {currentSlide.widget ? (
                            <div className={`w-full h-full flex items-center justify-center ${isDisplayMode ? 'p-6' : 'p-2 sm:p-4'}`}>
                              <WidgetErrorBoundary>
                                <WidgetRenderer config={currentSlide.widget} />
                              </WidgetErrorBoundary>
                            </div>
                          ) : currentSlide.inlineSvg ? (
                            <div 
                              className={`w-full h-full flex items-center justify-center ${isDisplayMode ? 'p-6' : 'p-3 sm:p-4'}`}
                              dangerouslySetInnerHTML={{ __html: currentSlide.inlineSvg }} 
                            />
                          ) : (
                            <iframe 
                              src={currentSlide.image} 
                              title={slideTitle || "Educational Diagram"}
                              className="absolute inset-0 w-full h-full pointer-events-none select-none dark:opacity-90 object-contain"
                              scrolling="no"
                              frameBorder="0"
                            />
                          )}
                          
                          <button 
                            onClick={() => setZoomedImage(
                              currentSlide.widget 
                                ? { type: 'widget', config: currentSlide.widget }
                                : currentSlide.inlineSvg 
                                  ? { type: 'svg', content: currentSlide.inlineSvg } 
                                  : { type: 'url', src: currentSlide.image }
                            )}
                            className="absolute top-2 lg:top-4 right-2 lg:right-4 p-2.5 lg:p-3 bg-white/90 backdrop-blur hover:bg-slate-100 text-slate-600 hover:text-[#1cb0f6] rounded-xl shadow-sm border-2 border-slate-200 opacity-80 sm:opacity-0 sm:group-hover:opacity-100 transition-all z-30 scale-95 hover:scale-100 active:scale-95 border-b-[4px] active:border-b-[2px] active:translate-y-[2px]"
                            title="Expand"
                          >
                            <Maximize2 className="w-5 h-5 lg:w-6 lg:h-6" strokeWidth={2.5} />
                          </button>
                        </div>
                      ) : showExampleOnRight ? (
                        
                        <div className={`w-full h-full bg-slate-50 dark:bg-slate-800/80 border-2 border-slate-200 dark:border-slate-700 rounded-2xl lg:rounded-[2rem] relative shadow-inner flex flex-col overflow-hidden`}>
                          <div className={`w-full ${themeColor} text-white font-black uppercase tracking-widest flex items-center shadow-md ${isDisplayMode ? 'text-[clamp(0.9rem,1.3vw,1.3rem)] px-8 py-5' : 'text-xs px-6 py-4'}`}>
                            <Target className="w-5 h-5 mr-3 opacity-80" />
                            {displayLabel}
                          </div>
                          <div className={`flex-1 overflow-y-auto custom-scrollbar p-6 lg:p-10 font-bold text-slate-800 dark:text-slate-200 leading-relaxed ${isDisplayMode ? 'text-[clamp(1.1rem,1.8vw,1.5rem)]' : 'text-base lg:text-xl'}`}>
                            {renderContent(slideExample, true)}
                          </div>
                        </div>

                      ) : null}
                    </div>
                  )}
                </div>
              </>
            );
          })()}

          {currentSlide.type === 'summary' && (
            <div className={`flex-1 flex flex-col items-center justify-center p-8 sm:p-12 text-center text-white ${currentSlide.color || 'bg-[#58cc02]'} min-h-0 overflow-y-auto`}>
              <div className={`bg-white/20 mx-auto rounded-[2rem] flex items-center justify-center mb-8 shadow-inner border-[4px] border-white/30 ${isDisplayMode ? 'w-32 h-32' : 'w-24 h-24'}`}>
                <CheckCircle2 className={`opacity-100 ${isDisplayMode ? 'w-16 h-16' : 'w-12 h-12'}`} strokeWidth={3} />
              </div>
              <h1 className={`font-black tracking-tight mb-6 drop-shadow-md leading-tight ${isDisplayMode ? 'text-[clamp(3rem,6vw,7rem)]' : 'text-4xl lg:text-6xl'}`}>{slideTitle || "Complete"}</h1>
              <p className={`font-bold opacity-90 drop-shadow-sm max-w-4xl mx-auto ${isDisplayMode ? 'text-[clamp(1.5rem,3vw,3rem)]' : 'text-xl lg:text-2xl'}`}>{slideSubtitle}</p>
              
              {/* FIX: Audio button universally applied to the summary screen */}
              {!isDisplayMode && currentSlide.audio && (
                 <button onClick={() => {
                      toggleAudio(currentSlide.audio);
                    }} className="mt-12 mx-auto flex items-center bg-white text-slate-800 rounded-2xl font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-transform shadow-md border-b-[4px] border-slate-200 active:border-b-0 active:translate-y-[4px] px-6 py-3 text-sm">
                   {isPlayingAudio ? <PauseCircle className="w-6 h-6 mr-3 text-slate-800" /> : <PlayCircle className="w-6 h-6 mr-3 text-slate-800" />}
                   {isPlayingAudio ? "Stop Audio" : "Listen"}
                 </button>
              )}
            </div>
          )}

          {currentSlide.type === 'warmup' && (() => {
            const themeColor = currentSlide.color || 'bg-[#ff9600]';
            return (
              <>
                {/* Amber "Do Now" header */}
                <div className={`${themeColor} ${isDisplayMode ? 'p-3 lg:p-4' : 'p-4 lg:p-6'} text-white flex items-center relative overflow-hidden flex-shrink-0 border-b-4 border-black/10`}>
                  <div className={`bg-white/20 rounded-xl mr-3 sm:mr-4 shadow-inner border border-white/30 ${isDisplayMode ? 'p-2' : 'p-2.5 lg:p-3'}`}>
                    <Pencil className={`drop-shadow-sm ${isDisplayMode ? 'w-6 h-6' : 'w-5 h-5 lg:w-8 lg:h-8'}`} strokeWidth={2.5} />
                  </div>
                  <h2 className={`font-black tracking-tight drop-shadow-md ${isDisplayMode ? 'text-[clamp(1.25rem,2vw,2rem)]' : 'text-xl sm:text-2xl lg:text-4xl'}`}>
                    {slideTitle || 'Do Now'}
                  </h2>
                  <div className={`ml-auto bg-white/20 text-white font-black uppercase tracking-[0.2em] rounded-full border border-white/30 shadow-inner ${isDisplayMode ? 'text-[clamp(0.75rem,1.1vw,1.1rem)] px-5 py-2' : 'text-[9px] sm:text-xs px-3 py-1.5'}`}>
                    {tr(lang, 'Write it down', 'Viết vào vở', 'Écris-le dans ton cahier')}
                  </div>
                </div>
                {/* Body */}
                <div className={`flex-1 flex flex-col lg:flex-row min-h-0 overflow-hidden`}>
                  <div className={`flex-1 overflow-y-auto custom-scrollbar ${isDisplayMode ? 'p-[clamp(1.5rem,3vw,3rem)]' : 'p-4 sm:p-6 lg:p-10'} ${currentSlide.inlineSvg ? 'lg:w-[55%] lg:border-r-2 border-slate-100 dark:border-slate-800' : 'w-full max-w-4xl mx-auto'}`}>
                    {renderContent(slideContent)}
                    {slideCheck && (
                      <>
                        <CheckBlock
                          check={slideCheck}
                          lang={lang}
                          answer={slideAnswer}
                          onAnswer={(opt) => answerCheck(currentIndex, opt, slideCheck)}
                          isDisplayMode={isDisplayMode}
                          parseText={parseInlineText}
                          badge={retryBadge()}
                        />
                        {itemFooter()}
                      </>
                    )}
                  </div>
                  {currentSlide.inlineSvg && (
                    <div className={`flex-1 lg:w-[45%] bg-slate-50/50 dark:bg-slate-900/50 flex items-center justify-center flex-shrink-0 min-h-0 ${isDisplayMode ? 'p-[clamp(1.5rem,3vw,3rem)]' : 'p-3 sm:p-4 lg:p-8'}`}>
                      <div
                        className="w-full h-full flex items-center justify-center bg-white dark:bg-slate-800 rounded-2xl lg:rounded-[2rem] border-2 border-slate-200 dark:border-slate-700 shadow-sm p-3 sm:p-4"
                        dangerouslySetInnerHTML={{ __html: currentSlide.inlineSvg }}
                      />
                    </div>
                  )}
                </div>
              </>
            );
          })()}
        </div>
        )}
      </div>

      {/* Top-Right Floating Presenter Control Dock (Display Mode Only) */}
      {isDisplayMode && (
        <div className={`absolute top-2.5 sm:top-3 right-3 sm:right-4 flex items-center gap-1.5 bg-slate-900/80 backdrop-blur-md p-1.5 rounded-2xl shadow-2xl border border-white/15 z-50 transition-all duration-500 pointer-events-auto ${isIdle ? 'opacity-0 -translate-y-4' : 'opacity-100 translate-y-0'}`}>
          <button onClick={handlePrev} disabled={currentIndex === 0} className="p-2 rounded-xl bg-white/10 text-white hover:bg-white/20 disabled:opacity-30 transition-colors">
            <ChevronLeft className="w-5 h-5" strokeWidth={3} />
          </button>
          
          {offered.length > 1 && (
            <div className="flex items-center gap-1 px-1.5 border-r border-l border-white/20">
              {offered.map((l) => (
                <button key={l} onClick={() => setLang(l)} className={`px-2.5 py-1.5 rounded-lg font-black text-xs tracking-wider ${lang === l ? 'bg-[#1cb0f6] text-white' : 'text-white/50 hover:text-white'}`}>{l.toUpperCase()}</button>
              ))}
            </div>
          )}

          {currentSlide.audio && (
            <button 
              onClick={() => {
                      toggleAudio(currentSlide.audio);
                    }}
              className={`flex items-center justify-center p-2 rounded-xl font-black transition-colors ${isPlayingAudio ? 'bg-amber-500 text-white' : 'bg-white/10 text-white hover:bg-white/20'}`}
              title="Play Audio"
            >
              {isPlayingAudio ? <Volume2 className="w-5 h-5 animate-pulse" /> : <PlayCircle className="w-5 h-5" strokeWidth={2.5} />}
            </button>
          )}

          <button onClick={toggleDisplayMode} className="p-2 rounded-xl bg-white/10 text-slate-300 hover:bg-rose-500 hover:text-white transition-colors" title="Exit Presentation (Esc)">
             <Minimize2 className="w-5 h-5" strokeWidth={2.5} />
          </button>

          <button onClick={handleNext} disabled={pendingCheck} className="p-2 rounded-xl bg-[#58cc02] text-white hover:bg-[#46a802] transition-colors shadow-sm ml-0.5 disabled:opacity-30 disabled:pointer-events-none">
            <ChevronRight className="w-5 h-5" strokeWidth={3} />
          </button>
        </div>
      )}

      {/* Subtle 3D Progress Bar Bottom Anchored (Display Mode Only) */}
      {isDisplayMode && (
        <div className={`fixed bottom-0 left-0 right-0 h-1.5 bg-slate-200/20 dark:bg-slate-900/50 backdrop-blur-sm z-50 transition-opacity duration-500 pointer-events-none ${isIdle ? 'opacity-0' : 'opacity-100'}`}>
          <div 
            className="h-full bg-[#58cc02] transition-all duration-500 ease-out relative shadow-[0_-1px_10px_rgba(88,204,2,0.4)]"
            style={{ width: `${((currentIndex + 1) / slides.length) * 100}%` }}
          >
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-white/40"></div>
          </div>
        </div>
      )}

      {/* The strip above the nav: where the deck reopened (with Start over),
          which mistake is being fixed, or — on a finished deck being read
          again — the score and the way back to the results. */}
      {!isDisplayMode && view === 'deck' && (fixing || (finished && items.length > 0) || resumedAt !== null) && (
        <div className={`border-t-2 px-4 py-2 z-20 flex-shrink-0 flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5 text-xs sm:text-sm font-bold animate-in fade-in
          ${fixing
            ? 'bg-amber-50 dark:bg-amber-900/20 border-amber-300/70 dark:border-amber-700/60 text-amber-800 dark:text-amber-200'
            : 'bg-[#1cb0f6]/10 dark:bg-[#1cb0f6]/15 border-[#1cb0f6]/30 text-[#1899d6] dark:text-[#5cc8ff]'}`}>
          {fixing ? (
            <>
              <Wrench className="w-4 h-4 shrink-0" strokeWidth={3} />
              <span>{t.fixing(fixing.pos + 1, fixing.queue.length)}</span>
              <button
                onClick={backToResults}
                className="px-3 py-1 rounded-lg bg-white dark:bg-slate-800 border-2 border-amber-300 dark:border-amber-700 hover:border-amber-500 text-amber-700 dark:text-amber-300 font-black uppercase tracking-widest text-[10px] sm:text-xs transition-colors"
              >
                {t.results}
              </button>
            </>
          ) : finished ? (
            <>
              <ClipboardCheck className="w-4 h-4 shrink-0" strokeWidth={3} />
              <span>{t.finishedBar(rightCount, items.length)}</span>
              <button
                onClick={backToResults}
                className="px-3 py-1 rounded-lg bg-white dark:bg-slate-800 border-2 border-[#1cb0f6]/40 hover:border-[#1cb0f6] text-[#1899d6] dark:text-[#5cc8ff] font-black uppercase tracking-widest text-[10px] sm:text-xs transition-colors"
              >
                {t.results}
              </button>
            </>
          ) : (
            <>
              <Repeat className="w-4 h-4 shrink-0" strokeWidth={3} />
              <span>
                {tr(lang,
                  `Picked up where you left off — slide ${resumedAt + 1} of ${slides.length}`,
                  `Tiếp tục từ slide ${resumedAt + 1} / ${slides.length}`,
                  `On reprend où tu en étais — diapo ${resumedAt + 1} sur ${slides.length}`)}
              </span>
              <button
                onClick={() => setConfirmRestart(true)}
                className="px-3 py-1 rounded-lg bg-white dark:bg-slate-800 border-2 border-[#1cb0f6]/40 hover:border-[#1cb0f6] text-[#1899d6] dark:text-[#5cc8ff] font-black uppercase tracking-widest text-[10px] sm:text-xs transition-colors"
              >
                {t.startOver}
              </button>
            </>
          )}
        </div>
      )}

      {/* Standard Bottom Navigation (Hidden in Display Mode) */}
      {!isDisplayMode && (
        <div className="bg-white dark:bg-slate-900 border-t-2 border-slate-200 dark:border-slate-800 px-3 py-2 sm:px-5 sm:py-2.5 z-20 flex-shrink-0 shadow-[0_-4px_10px_rgba(0,0,0,0.02)]">
          <div className="max-w-5xl mx-auto flex items-center justify-between px-1 sm:px-2 gap-3 sm:gap-4">

            {view === 'review' ? (
              <div className="w-11 h-11 sm:w-12 sm:h-12" aria-hidden="true" />
            ) : (
              <button
                onClick={handlePrev}
                disabled={fixing ? fixing.pos === 0 : currentIndex === 0}
                className="w-11 h-11 sm:w-12 sm:h-12 flex items-center justify-center rounded-xl border-2 border-b-[4px] border-slate-200 dark:border-slate-700 text-slate-400 dark:text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-600 dark:hover:text-slate-300 active:border-b-2 active:translate-y-[2px] transition-all disabled:opacity-30 disabled:pointer-events-none bg-white dark:bg-slate-900"
              >
                <ChevronLeft className="w-6 h-6" strokeWidth={3} />
              </button>
            )}

            <div className="flex items-center gap-2 sm:gap-4">
              {/* An English-only track (ADD_MATH, COORD_SCI) has no Vietnamese
                  to switch to; the toggle only offered a button that did nothing.
                  Year 7 adds FR, so the buttons come from `offered`. Three
                  buttons share the room two had, so each is a little narrower
                  on a phone. */}
              {offered.length > 1 && (
                <div className="flex bg-slate-100 dark:bg-slate-800 rounded-xl border-2 border-slate-200 dark:border-slate-700 p-1 flex-shrink-0">
                  {offered.map((l) => (
                    <button
                      key={l}
                      onClick={() => setLang(l)}
                      className={`${offered.length > 2 ? 'px-2 sm:px-4' : 'px-3 sm:px-5'} py-1.5 rounded-lg text-[10px] sm:text-xs font-black uppercase tracking-widest transition-all ${lang === l ? 'bg-white dark:bg-slate-700 text-[#1cb0f6] shadow-sm border-2 border-slate-200 dark:border-slate-600' : 'text-slate-400 dark:text-slate-500 hover:text-slate-600 border-2 border-transparent'}`}
                    >
                      {l.toUpperCase()}
                    </button>
                  ))}
                </div>
              )}

              {/* Narration for a layout slide (the legacy slide types carry
                  their own button in their header or hero). */}
              {view === 'deck' && hasLayout && currentSlide.audio && (
                <button
                  onClick={() => toggleAudio(currentSlide.audio)}
                  className={`flex items-center justify-center px-3 sm:px-4 py-2 rounded-xl transition-all border-2 active:scale-95 ${isPlayingAudio
                    ? 'bg-amber-100 dark:bg-amber-900/30 border-amber-300 dark:border-amber-700 text-amber-700 dark:text-amber-300'
                    : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500 hover:text-[#1cb0f6]'}`}
                  title={isPlayingAudio ? 'Stop audio' : 'Listen to this slide'}
                >
                  {isPlayingAudio ? <Volume2 className="w-5 h-5 sm:mr-2 animate-pulse" strokeWidth={2.5} /> : <PlayCircle className="w-5 h-5 sm:mr-2" strokeWidth={2.5} />}
                  <span className="hidden sm:inline text-xs font-black uppercase tracking-widest">{isPlayingAudio ? 'Stop' : 'Listen'}</span>
                </button>
              )}

              {view === 'deck' && (
                <button
                  onClick={toggleDisplayMode}
                  className="hidden md:flex items-center justify-center px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-xl text-slate-500 hover:text-[#1cb0f6] transition-all border-2 border-slate-200 dark:border-slate-700 active:scale-95"
                  title="Project to TV (Fullscreen)"
                >
                  <MonitorPlay className="w-5 h-5 mr-2" strokeWidth={2.5} />
                  <span className="text-xs font-black uppercase tracking-widest">Project</span>
                </button>
              )}
            </div>

            <button
              onClick={view === 'review' ? complete : handleNext}
              disabled={pendingCheck}
              title={pendingCheck ? 'Answer the check question first' : undefined}
              className={`flex items-center px-5 sm:px-7 py-2.5 sm:py-3 rounded-xl font-black text-sm sm:text-base tracking-widest uppercase transition-all border-b-[4px] active:border-b-0 active:translate-y-[4px] disabled:opacity-40 disabled:pointer-events-none
                ${next.green
                  ? 'bg-[#58cc02] border-[#58a700] text-white hover:bg-[#46a802]'
                  : 'bg-[#1cb0f6] border-[#1899d6] text-white hover:bg-[#159bd9]'}`}
            >
              <span className="hidden sm:inline">{next.long}</span>
              <span className="sm:hidden">{next.short}</span>
              {next.chevron && <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 ml-1 sm:ml-2 -mr-1 sm:-mr-2" strokeWidth={3} />}
            </button>

          </div>
        </div>
      )}

      {/* Start over, asked first. Students with one wrong answer reached for
          it to get another go — and lost every right answer with it — when
          fixing just that one at the end is what they wanted. */}
      <Modal isOpen={confirmRestart} onClose={() => setConfirmRestart(false)} size="sm" showClose={false}>
        <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-300 flex items-center justify-center mb-4">
          <RotateCcw className="w-6 h-6" strokeWidth={2.5} />
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-slate-800 dark:text-white tracking-tight mb-2">{t.restartTitle}</h2>
        <p className="font-bold text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-4">{t.restartBody}</p>
        <div className="flex items-start gap-2.5 rounded-2xl bg-[#1cb0f6]/10 border-2 border-[#1cb0f6]/30 p-3.5 mb-6 text-sm font-bold leading-snug text-[#1480b8] dark:text-[#5cc8ff]">
          <Lightbulb className="w-5 h-5 shrink-0" strokeWidth={2.5} />
          <span>{finished && mistakes.length ? t.restartHintDone : t.restartHint}</span>
        </div>
        <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-2">
          <button
            onClick={restart}
            className="px-5 py-3 rounded-xl bg-white dark:bg-slate-800 border-2 border-b-[4px] border-slate-200 dark:border-slate-700 text-rose-500 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 font-black uppercase tracking-widest text-xs active:border-b-2 active:translate-y-[2px] transition-all"
          >
            {t.startOver}
          </button>
          <button
            onClick={() => setConfirmRestart(false)}
            autoFocus
            className="px-5 py-3 rounded-xl bg-[#1cb0f6] hover:bg-[#159bd9] border-b-[4px] border-[#1899d6] text-white font-black uppercase tracking-widest text-xs active:border-b-0 active:translate-y-[4px] transition-all focus:outline-none focus-visible:ring-4 focus-visible:ring-[#1cb0f6]/40"
          >
            {t.keep}
          </button>
        </div>
      </Modal>

      {/* Zoom Modal */}
      {zoomedImage && (
        <div className="fixed inset-0 z-[9999] bg-slate-900/95 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200 pointer-events-auto cursor-auto">
          <button 
            onClick={() => setZoomedImage(null)} 
            className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 sm:p-3 bg-white hover:bg-slate-100 text-slate-800 rounded-xl transition-colors shadow-xl border-2 border-slate-200 active:scale-95 z-50 border-b-[4px] active:border-b-[2px] active:translate-y-[2px]"
          >
            <X className="w-6 h-6 sm:w-8 sm:h-8" strokeWidth={3} />
          </button>
          
          <div className="relative w-full h-full max-w-7xl max-h-[90vh] flex items-center justify-center bg-slate-50 dark:bg-slate-900 rounded-[2rem] shadow-2xl overflow-hidden p-2 sm:p-6 animate-in zoom-in-95 duration-300 border-4 border-slate-200 dark:border-slate-700">
             {zoomedImage.type === 'widget' ? (
               <WidgetErrorBoundary>
                 <WidgetRenderer config={zoomedImage.config} lang={zoomedImage.withLang ? lang : undefined} />
               </WidgetErrorBoundary>
             ) : zoomedImage.type === 'svg' ? (
               <div 
                 className="w-full h-full flex items-center justify-center bg-white dark:bg-slate-800 rounded-xl shadow-sm"
                 dangerouslySetInnerHTML={{ __html: zoomedImage.content }} 
               />
             ) : (
               <iframe 
                 src={zoomedImage.src} 
                 title="Expanded Diagram"
                 className="w-full h-full pointer-events-none select-none dark:opacity-90 rounded-xl bg-white dark:bg-slate-800 shadow-sm"
                 scrolling="no"
                 frameBorder="0"
               />
             )}
          </div>
        </div>
      )}
    </div>
  );
}