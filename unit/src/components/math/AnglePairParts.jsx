import { useState } from 'react';
import { tr } from '../../utils/lang';
import { sentencesOf } from '../../utils/anglePairs';
import { apT } from './anglePairWords';
import { CARD_KIND } from './anglePairLines';
import { FactCard, Eq, AnswerBox, CheckButton, Feedback } from './AngleKit.jsx';

/**
 * The pieces of an X, F or Z? stage that the task (tasks/AnglePairs.jsx) and
 * the deck activity (notes/AnglePairActivity.jsx) share: the pair cards, the
 * reason buttons, the size box, the message and the reason sentences — built
 * from the AngleKit pieces, so they look like the other angle tasks.
 */

const IDLE = 'border-slate-200 bg-white text-slate-800 hover:border-orange-400 hover:bg-orange-50/60 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-100 dark:hover:border-orange-500';
const STRUCK = 'border-rose-200 bg-rose-50 text-rose-400 line-through decoration-2 dark:bg-rose-950/30 dark:border-rose-900';

/** The pair cards (two on an X), each with a picture of its pair. */
export function PairButtons({ options, picks, onChoose, lang, compact = false }) {
  const odd = options.length % 2 === 1;
  return (
    <div className={`grid gap-2 ${compact ? 'grid-cols-2' : 'grid-cols-1 sm:grid-cols-2'}`}>
      {options.map((id, n) => (
        <div key={id} className={odd && n === options.length - 1 ? (compact ? 'col-span-2' : 'sm:col-span-2') : ''}>
          <FactCard kind={CARD_KIND[id]} lang={lang} compact={compact} state={picks[id] === 'bad' ? 'wrong' : 'idle'} onPick={() => onChoose(id)} />
        </div>
      ))}
    </div>
  );
}

export function ReasonButtons({ picks, onChoose, lang, compact = false }) {
  const t = apT(lang);
  return (
    <div className="grid gap-2 grid-cols-1">
      {['same', 'perp', 'eye'].map((id) => (
        <button key={id} type="button" disabled={!!picks[id]} onClick={() => onChoose(id)}
          className={`text-left rounded-xl border-2 border-b-[4px] font-bold transition-all active:translate-y-[2px] active:border-b-2 disabled:cursor-default ${compact ? 'px-2.5 py-1.5 text-xs' : 'px-3 py-2.5 text-sm sm:text-[15px]'} ${picks[id] === 'bad' ? STRUCK : IDLE}`}>
          {t.reasons[id]}
        </button>
      ))}
    </div>
  );
}

/**
 * The size box, after its sum: `frame` is the Eq parts before the box
 * ("x =" or "x = 180° − 76° ="); `hint` a line under it. Enter checks it and
 * goes no further (a deck's Enter-for-next must not skip the verdict).
 */
export function SizeInput({ letter, frame, hint, onCheck, lang, compact = false }) {
  const [typed, setTyped] = useState('');
  const go = () => { if (typed.trim()) { onCheck(typed); setTyped(''); } };
  const parts = frame || [{ t: 'cur', v: letter }, { t: 'op', v: '=' }];
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
        <Eq parts={[...parts, { node: <AnswerBox value={typed} onChange={setTyped} onEnter={go} label={letter} autoFocus /> }]} className={compact ? 'text-lg' : 'text-xl sm:text-2xl'} />
        <CheckButton onClick={go} disabled={!typed.trim()} lang={lang} />
      </div>
      {hint && <p className="text-sm font-bold text-slate-500 dark:text-slate-400">{hint}</p>}
    </div>
  );
}

/** A wrong answer, a nudge, a step filled in — and a "yes" only when it says what to do next. */
export function ApMessage({ msg, lang }) {
  if (!msg || (msg.tone === 'ok' && !msg.guide)) return null;
  const tone = msg.tone === 'ok' ? 'good' : msg.tone === 'shown' ? 'shown' : msg.tone === 'nudge' ? 'info' : 'bad';
  return <Feedback tone={tone}>{tr(lang, msg.en, null, msg.fr || msg.en)}</Feedback>;
}

/** The finished item as the sentences to write: English, with the French beside it in FR. */
export function Sentences({ m, stone, lang, compact = false }) {
  return (
    <div className={`flex flex-col gap-1.5 ${compact ? 'text-sm' : 'text-base sm:text-lg'}`}>
      {sentencesOf(m, stone).map((s, n) => (
        <p key={n} className="font-bold text-slate-900 dark:text-slate-100 leading-snug">{lang === 'fr' ? s.fr : s.en}</p>
      ))}
    </div>
  );
}
