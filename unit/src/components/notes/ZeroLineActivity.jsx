import { useMemo, useState } from 'react';
import { CheckCircle2, AlertTriangle, ZoomIn, ZoomOut } from 'lucide-react';
import { zeroLineModel } from '../../utils/zeroLine';
import { ZeroLineBoard } from '../../data/Y7_MATH/U05_3/protractor.jsx';
import { StagePanel } from '../../data/Y7_MATH/U05_3/zeroLineItem.jsx';
import { useZeroLineItem } from '../../data/Y7_MATH/U05_3/zeroLineState.js';
import { tr } from '../../utils/lang';

/**
 * `zeroline` — one Zero on the Line item on a Notes slide (Year 7 Maths 5.3).
 * Rendered by ActivityBlock, checked by utils/activity.js → zeroLine.checkZeroLineActivity.
 *
 *   { id, type: 'zeroline', kind: 'draw', angle: 35, zero: 'right', prompt, promptFr, explain, explainFr }
 *   { id, type: 'zeroline', kind: 'read', angle: 50, zero: 'left', … }
 *   { id, type: 'zeroline', kind: 'shape', AB, A, AD, B, D, at: 'D', given: ['A', 'B', 'C'], … }
 *
 * The same stages as the task (the unit folder's useZeroLineItem): the
 * protractor is placed for the student; a read is estimate → read, a draw is
 * which 0 → mark. A wrong answer is named and tried once more; a second (or a
 * slip's extra stage, then a second) fills it in, and the activity scores
 * wrong. Enter in the box does not reach the deck's Enter-for-next.
 */

const ITEM_KEYS = ['kind', 'angle', 'zero', 'turn', 'offset', 'AB', 'A', 'AD', 'B', 'BC', 'D', 'at', 'from', 'given'];

function Board({ model, zl, done }) {
  const [zoom, setZoom] = useState(false);
  const target = model.draw?.target;
  return (
    <div className="relative h-[30vh] min-h-[180px] lg:h-[34vh] rounded-xl border-2 border-slate-200 dark:border-slate-700 overflow-hidden bg-white mb-2">
      <ZeroLineBoard model={model}
        ring={zl ? zl.ring : (model.read || model.draw).zero}
        onZero={zl?.stage === 'zero' ? zl.tapZero : null}
        mark={zl ? zl.mark : target ?? null}
        onMark={zl?.stage === 'mark' ? zl.setMark : null}
        drawn={zl ? zl.drawn : (model.draw ? { mark: target, ok: true } : null)}
        finished={model.kind === 'sketch' && done}
        reveal={done && model.read ? `${Math.round(model.answer)}°` : null}
        zoom={zoom} />
      <button type="button" onClick={() => setZoom(!zoom)} aria-label={zoom ? 'whole picture' : 'look closer'}
        className="absolute right-1.5 bottom-1.5 p-1.5 rounded-lg bg-white/90 border-2 border-slate-200 text-slate-600">
        {zoom ? <ZoomOut className="w-4 h-4" strokeWidth={3} /> : <ZoomIn className="w-4 h-4" strokeWidth={3} />}
      </button>
    </div>
  );
}

function Verdict({ correct, lang, children }) {
  return (
    <div className={`rounded-xl border-2 mt-2 p-3 ${correct ? 'bg-[#d7ffb8] border-[#58a700]' : 'bg-[#ffdfe0] border-[#ea2b2b]'}`}>
      <div className={`flex items-center font-black uppercase tracking-widest text-[10px] lg:text-xs mb-1 ${correct ? 'text-[#3e7500]' : 'text-[#a32d23]'}`}>
        {correct ? <CheckCircle2 className="w-4 h-4 mr-2" strokeWidth={3} /> : <AlertTriangle className="w-4 h-4 mr-2" strokeWidth={3} />}
        {correct ? tr(lang, 'Correct', null, 'Correct !') : tr(lang, 'Not quite', null, 'Pas tout à fait')}
      </div>
      <div className={`font-bold leading-relaxed text-sm lg:text-base ${correct ? 'text-[#3e7500]' : 'text-[#a32d23]'}`}>{children}</div>
    </div>
  );
}

function Live({ activity, model, lang, onResult, parseText }) {
  const zl = useZeroLineItem(model, { onDone: ({ helped }) => onResult({ done: true, correct: !helped }) });
  return (
    <div>
      <Board model={model} zl={zl} done={zl.done} />
      {!zl.done && <StagePanel zl={zl} model={model} lang={lang} showMe={false} />}
      {zl.done && (
        <Verdict correct={!zl.helped} lang={lang}>{parseText(tr(lang, activity.explain, null, activity.explainFr))}</Verdict>
      )}
    </div>
  );
}

export function ZeroLineActivity({ activity, lang, result, onResult, parseText }) {
  const model = useMemo(() => {
    const it = { id: activity.id, level: 3 };
    for (const k of ITEM_KEYS) if (activity[k] !== undefined) it[k] = activity[k];
    try { return zeroLineModel(it); } catch { return null; }
  }, [activity]);
  if (!model) return <div className="text-rose-500 font-bold text-sm">zeroline: this item cannot be built.</div>;
  if (result?.done) {
    return (
      <div>
        <Board model={model} zl={null} done />
        <Verdict correct={result.correct} lang={lang}>{parseText(tr(lang, activity.explain, null, activity.explainFr))}</Verdict>
      </div>
    );
  }
  return <Live activity={activity} model={model} lang={lang} onResult={onResult} parseText={parseText} />;
}
