import { useMemo } from 'react';
import { CheckCircle2, AlertTriangle, MousePointerClick } from 'lucide-react';
import { tr } from '../../utils/lang';
import AnglePairFigure from '../math/AnglePairFigure.jsx';
import useAnglePairItem, { deriveAnglePair } from '../math/useAnglePairItem';
import { PairButtons, SizeInput, ApMessage, Sentences } from '../math/AnglePairParts.jsx';
import { apT, stageTitle } from '../math/anglePairWords';
import { letterOf } from '../../utils/anglePairGeom';
import { frameParts } from '../math/anglePairLines';

/**
 * `anglepair` — one X, F or Z? item on a Notes slide (Year 7 Maths 5.2).
 * Rendered by ActivityBlock, checked by utils/activity.js →
 * anglePairCheck.checkAnglePairActivity.
 *
 *   { id, type: 'anglepair', kind: 'find', fig, given: [c, w], find: [{ at, letter }], prompt, promptFr, explain, explainFr }
 *   { id, type: 'anglepair', kind: 'spot', fig, given: [c, w], ask: 'opp' | 'corr' | 'alt', … }
 *
 * The task's stages, compact. Each stage takes one wrong answer, named; a
 * second fills it in and the activity is scored wrong. The activity draws its
 * own picture, so the slide that holds it has no diagram of the same thing.
 */
const itemOf = (a) => ({ id: a.id, kind: a.kind, fig: a.fig, given: a.given, ask: a.ask, find: a.find });

/** A finished activity, drawn again from the item (a revisited slide). */
function Finished({ activity, lang, result, parseText }) {
  const m = useMemo(() => deriveAnglePair(itemOf(activity)), [activity]);
  if (!m) return null;
  const tone = result.correct ? 'good' : 'shown';
  const marks = [{ at: m.given.at, tone: 'given', text: `${m.given.size}°` }];
  const glows = [];
  if (m.kind === 'spot') { marks.push({ at: m.answerAt, tone, text: `${m.answer}°` }); glows.push(letterOf(m.F, m.given.at, m.answerAt)); }
  else m.targets.forEach((t) => {
    marks.push({ at: t.at, tone, text: t.answer == null ? t.letter : `${t.answer}°` });
    if (t.right !== 'none') glows.push(letterOf(m.F, m.given.at, t.at));
  });
  const glow = glows.some((g) => g.letter) ? { paths: glows.filter((g) => g.letter).flatMap((g) => g.paths), tone: result.correct ? 'good' : 'shown' } : null;
  return (
    <div>
      <AnglePairFigure F={m.F} marks={marks} glow={glow} label={apT(lang).title} className="mx-auto" style={{ maxHeight: '26vh' }} />
      <Verdict ok={result.correct} lang={lang}>
        <Sentences m={m} lang={lang} compact />
        <div className="mt-1">{parseText(tr(lang, activity.explain, null, activity.explainFr))}</div>
      </Verdict>
    </div>
  );
}

function Verdict({ ok, lang, children }) {
  return (
    <div className={`rounded-xl border-2 mt-2 p-3 ${ok ? 'bg-[#d7ffb8] border-[#58a700]' : 'bg-[#ffdfe0] border-[#ea2b2b]'}`}>
      <div className={`flex items-center font-black uppercase tracking-widest text-[10px] lg:text-xs mb-1 ${ok ? 'text-[#3e7500]' : 'text-[#a32d23]'}`}>
        {ok ? <CheckCircle2 className="w-4 h-4 mr-2" strokeWidth={3} /> : <AlertTriangle className="w-4 h-4 mr-2" strokeWidth={3} />}
        {ok ? tr(lang, 'Correct', null, 'Correct !') : tr(lang, 'Not quite', null, 'Pas tout à fait')}
      </div>
      <div className={`font-bold leading-relaxed text-sm ${ok ? 'text-[#3e7500]' : 'text-[#a32d23]'}`}>{children}</div>
    </div>
  );
}

function Running({ activity, lang, onResult }) {
  const run = useAnglePairItem(itemOf(activity), { onFinish: (filled) => onResult({ done: true, correct: !filled }) });
  const t = apT(lang);
  if (!run.m) return null;
  const { kind } = run;
  return (
    <div>
      <AnglePairFigure F={run.m.F} marks={run.marks} glow={run.glow} tap={run.tap} rails={run.rails}
        onTap={run.actions.tapSector} label={t.title} className="mx-auto" style={{ maxHeight: '26vh' }} />
      {!run.done && (
        <div className="mt-2">
          <p className="mb-2 text-sm font-black text-slate-600 dark:text-slate-300">{stageTitle(run, lang)}</p>
          {kind === 'pair' && <PairButtons options={run.target.options} picks={run.picks} onChoose={run.actions.choose} lang={lang} compact />}
          {kind === 'size' && (
            <SizeInput key={run.stage} letter={run.target.letter} onCheck={run.actions.type} lang={lang} compact
              frame={frameParts(run.target.letter, run.target.right, run.target.from, true)}
              hint={run.target.right !== 'adj' ? t.sameAs(run.target.from) : null} />
          )}
          {kind === 'tap' && <p className="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center gap-2"><MousePointerClick className="w-4 h-4" />{t.tap}</p>}
          <ApMessage msg={run.msg} lang={lang} />
        </div>
      )}
    </div>
  );
}

export function AnglePairActivity({ activity, lang, result, onResult, parseText }) {
  if (result?.done) return <Finished activity={activity} lang={lang} result={result} parseText={parseText} />;
  return <Running activity={activity} lang={lang} onResult={onResult} />;
}
