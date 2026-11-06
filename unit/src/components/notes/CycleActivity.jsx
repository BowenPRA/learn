import { Fragment, useMemo, useState } from 'react';
import { CheckCircle2, AlertTriangle, ArrowRight, MousePointerClick } from 'lucide-react';
import {
  ARROWS, ARROW, HIT_R, VIEW, PLACES, arrowsOf, midOf, cycleSvg, activityRound, markRound, processName,
} from '../../utils/waterCycle';
import { tr } from '../../utils/lang';

/**
 * The `cycle` deck activity (Science 2.4) — one Water Journey round fixed by
 * the slide, on the engine's own water-cycle diagram (utils/waterCycle.js):
 *
 *   tap      a process is named; tap its arrow, then Check
 *   arrow    one arrow is lit; choose its process, then Check
 *   journey  a particle goes from A to B; tap the processes into order, then
 *            Check — any order that is a real path from A to B is right
 *
 * Schema: { id, type: 'cycle', ask, process?, arrow?, options?, from?, to?,
 * steps?, prompt, promptVn, promptFr, explain, explainVn, explainFr }. ActivityBlock draws the
 * prompt; this draws the diagram and the answer, calls onResult once, then
 * shows the right answer in place — on the diagram — and the explain.
 *
 * CycleFigure (the diagram with its tap targets) is shared with the Water
 * Journey task (tasks/WaterJourney.jsx).
 */

const pickL = tr;
const sayLine = (lang, l) => pickL(lang, l.en, l.vn, l.fr);

const T = {
  en: {
    check: 'Check', tapRing: 'Tap a ring on the arrow you choose, then Check.', picked: 'Your arrow',
    none: 'none yet', start: 'Start', end: 'End', tapSteps: 'Tap the processes in order. Tap a step to take it back.',
    correct: 'Correct', wrong: 'Not quite', arrow: 'Arrow', diagram: 'The water cycle',
  },
  vn: {
    check: 'Kiểm tra', tapRing: 'Chạm vào vòng tròn trên mũi tên em chọn, rồi bấm Kiểm tra.', picked: 'Mũi tên của em',
    none: 'chưa chọn', start: 'Bắt đầu', end: 'Kết thúc', tapSteps: 'Chạm các quá trình theo thứ tự. Chạm vào một bước để bỏ nó ra.',
    correct: 'Chính xác', wrong: 'Chưa đúng', arrow: 'Mũi tên', diagram: 'Vòng tuần hoàn của nước',
  },
  fr: {
    check: 'Vérifier', tapRing: 'Touche un rond sur la flèche choisie, puis Vérifier.', picked: 'Ta flèche',
    none: 'aucune', start: 'Départ', end: 'Arrivée', tapSteps: 'Touche les processus dans l’ordre. Touche une étape pour la retirer.',
    correct: 'Correct !', wrong: 'Pas tout à fait', arrow: 'Flèche', diagram: 'Le cycle de l’eau',
  },
};

const btn = 'px-5 py-2.5 rounded-xl font-black uppercase tracking-widest text-xs border-b-[4px] active:border-b-0 active:translate-y-[4px] transition-all disabled:opacity-40 disabled:pointer-events-none';
const primary = `${btn} bg-[#1cb0f6] border-[#1899d6] text-white hover:bg-[#159bd9]`;
const GOOD = 'bg-[#d7ffb8] border-[#58a700] text-[#3e7500]';
const BAD = 'bg-[#ffdfe0] border-[#ea2b2b] text-[#c9362a]';
const IDLE = 'bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200';
const PICKED = 'bg-[#1cb0f6] border-[#1899d6] text-white';

/**
 * The diagram: an SVG string on a white plate, sized by height first so it
 * never pushes its own buttons off screen. With `onTap`, a ring at every
 * arrow's midpoint is a button (Enter / Space work too).
 *
 * `fit`: fill the parent box instead (give it a height). The drawing scales
 * to whichever of width or height runs out first and centres itself — the SVG
 * letterboxes on its own (preserveAspectRatio meet) and carries its own
 * rounded plate, and the tap layer uses the same viewBox, so the rings stay on
 * the arrows at any size.
 */
export function CycleFigure({ svg, onTap, picked, maxH = '40vh', fit = false, label, className = '' }) {
  const ratio = (VIEW.w / VIEW.h).toFixed(3);
  const frame = fit
    ? { className: `relative w-full h-full ${className}`, style: undefined }
    : {
      className: `relative mx-auto rounded-2xl overflow-hidden bg-white shadow-sm border-2 border-slate-200 dark:border-slate-700 ${className}`,
      style: { aspectRatio: `${VIEW.w} / ${VIEW.h}`, width: `min(100%, calc(${maxH} * ${ratio}))` },
    };
  return (
    <div className={frame.className} style={frame.style}>
      <div className="absolute inset-0 [&>svg]:block [&>svg]:w-full [&>svg]:h-full" role="img" aria-label={label}
        dangerouslySetInnerHTML={{ __html: svg }} />
      {onTap && (
        <svg viewBox={`0 0 ${VIEW.w} ${VIEW.h}`} className="absolute inset-0 w-full h-full select-none" style={{ touchAction: 'manipulation' }}>
          {ARROWS.map((a, i) => {
            const [x, y] = midOf(a);
            const on = picked === a.id;
            return (
              <g key={a.id} role="button" tabIndex={0} aria-label={`${label || 'Arrow'} ${i + 1}`} aria-pressed={on}
                className="group cursor-pointer outline-none"
                onClick={() => onTap(a.id)}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onTap(a.id); } }}>
                <circle cx={x} cy={y} r={HIT_R} fill="transparent" />
                <circle cx={x} cy={y} r={25} fill="none" stroke="#1cb0f6" strokeWidth={6}
                  className={on ? 'opacity-100' : 'opacity-0 group-hover:opacity-50 group-focus-visible:opacity-100'} />
                {on && <circle cx={x} cy={y} r={11} fill="#1cb0f6" />}
              </g>
            );
          })}
        </svg>
      )}
    </div>
  );
}

function Verdict({ ok, lang, children }) {
  const t = T[lang] || T.en;
  return (
    <div className={`rounded-xl border-2 mt-3 p-3 ${ok ? 'bg-[#d7ffb8] border-[#58a700]' : 'bg-[#ffdfe0] border-[#ea2b2b]'}`}>
      <div className={`flex items-center font-black uppercase tracking-widest text-[10px] lg:text-xs mb-1 ${ok ? 'text-[#3e7500]' : 'text-[#a32d23]'}`}>
        {ok ? <CheckCircle2 className="w-4 h-4 mr-2" strokeWidth={3} /> : <AlertTriangle className="w-4 h-4 mr-2" strokeWidth={3} />}
        {ok ? t.correct : t.wrong}
      </div>
      <div className={`font-bold leading-relaxed text-sm lg:text-base flex flex-col gap-1 ${ok ? 'text-[#3e7500]' : 'text-[#a32d23]'}`}>{children}</div>
    </div>
  );
}

/** What the diagram shows, before and after the check. */
function figureSvg(round, { checked, answer, mark, lang }) {
  if (round.mode === 'arrow') {
    if (!checked) return cycleSvg({ highlight: round.arrow, lang });
    return cycleSvg({ tones: { [round.arrow]: mark.ok ? 'good' : 'lit' }, dimRest: true, labels: { arrows: [round.arrow] }, lang });
  }
  if (round.mode === 'tap') {
    if (!checked) return cycleSvg({ hit: true, lang });
    const right = arrowsOf(round.process).map((a) => a.id);
    const tones = Object.fromEntries(right.map((id) => [id, 'good']));
    if (!mark.ok && ARROW[answer]) tones[answer] = 'bad';
    return cycleSvg({ tones, dimRest: true, labels: { arrows: Object.keys(tones) }, lang });
  }
  const marks = { A: round.from, B: round.to };
  if (!checked || !mark.path) return cycleSvg({ marks, lang });
  return cycleSvg({
    marks, lang, dimRest: true,
    tones: Object.fromEntries(mark.path.map((id) => [id, 'path'])),
    numbers: Object.fromEntries(mark.path.map((id, i) => [id, i + 1])),
  });
}

export function CycleActivity({ activity, lang = 'en', result, onResult, parseText = (x) => x, side = false }) {
  const t = T[lang] || T.en;
  const round = useMemo(() => activityRound(activity), [activity]);
  const checked = !!result?.done;
  const [picked, setPicked] = useState(() => result?.picked ?? null);
  const [chosen, setChosen] = useState(() => result?.chosen ?? null);
  const [order, setOrder] = useState(() => result?.order ?? []);

  const answer = round?.mode === 'tap' ? (result?.picked ?? picked)
    : round?.mode === 'arrow' ? (result?.chosen ?? chosen)
      : (result?.order ?? order);
  const mark = useMemo(() => (round && checked ? markRound(round, answer) : null), [round, checked, answer]);
  const svg = useMemo(() => (round ? figureSvg(round, { checked, answer, mark, lang }) : ''), [round, checked, answer, mark, lang]);

  if (!round) return <div className="text-rose-500 font-bold text-sm">This activity is not set up.</div>;

  const check = () => {
    if (checked) return;
    const res = markRound(round, answer);
    if (round.mode === 'tap') onResult({ done: true, correct: res.ok, picked });
    else if (round.mode === 'arrow') onResult({ done: true, correct: res.ok, chosen });
    else onResult({ done: true, correct: res.ok, order });
  };
  const ready = round.mode === 'journey' ? order.length === round.steps.length : !!answer;

  // A wrong answer is answered by name (the engine's lines) before the explain.
  const named = !checked || result.correct ? []
    : round.mode === 'journey' ? mark.lines : mark.lines.slice(0, -1);

  // Beside the slide (`side`) the diagram takes the column's width. In the
  // footer under a slide it sits beside the controls and stays short, so the
  // slide above keeps room to be read. A journey is read from its A / B lines
  // and chips more than from the picture, so on a phone its diagram is smaller.
  const figure = (
    <CycleFigure svg={svg} label={t.diagram}
      maxH={side ? (round.mode === 'journey' ? '27vh' : '34vh') : round.mode === 'journey' ? 'min(22vh, 34vw)' : '22vh'}
      picked={round.mode === 'tap' ? picked : null}
      onTap={round.mode === 'tap' && !checked ? (id) => setPicked(id) : undefined} />
  );

  let controls;
  if (round.mode === 'tap') {
    const n = picked ? ARROWS.findIndex((a) => a.id === picked) + 1 : 0;
    controls = !checked && (
      <div className="flex flex-col gap-2">
        <p className="flex items-start gap-2 text-sm font-bold text-slate-500 dark:text-slate-400">
          <MousePointerClick className="w-4 h-4 shrink-0 mt-0.5" strokeWidth={3} />{t.tapRing}
        </p>
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs font-black uppercase tracking-widest text-slate-400">{t.picked}: <span className={n ? 'text-[#1899d6]' : ''}>{n ? `${t.arrow} ${n}` : t.none}</span></span>
          <button onClick={check} disabled={!ready} className={primary}>{t.check}</button>
        </div>
      </div>
    );
  } else if (round.mode === 'arrow') {
    controls = (
      <div className="flex flex-col gap-2">
        <div className="grid grid-cols-2 gap-2">
          {round.options.map((pid) => {
            const isRight = pid === round.process;
            const on = (result?.chosen ?? chosen) === pid;
            const style = !checked ? (on ? PICKED : IDLE) : isRight ? GOOD : on ? BAD : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-400 opacity-60';
            return (
              <button key={pid} disabled={checked} onClick={() => setChosen(pid)}
                className={`text-left rounded-xl border-2 border-b-[4px] px-3 py-2 font-bold text-sm transition-all ${style}`}>
                {processName(pid, lang)}
              </button>
            );
          })}
        </div>
        {!checked && <div className="flex justify-end"><button onClick={check} disabled={!ready} className={primary}>{t.check}</button></div>}
      </div>
    );
  } else {
    controls = (
      <JourneyControls round={round} lang={lang} t={t} order={result?.order ?? order} setOrder={setOrder}
        checked={checked} ok={!!result?.correct} onCheck={check} ready={ready} />
    );
  }

  return (
    <div>
      <div className={side ? 'flex flex-col gap-3' : 'flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-4'}>
        <div className={side ? '' : 'sm:w-[min(56%,37.5vh)] sm:shrink-0'}>{figure}</div>
        <div className="flex-1 min-w-0">{controls}</div>
      </div>
      {checked && (
        <Verdict ok={result.correct} lang={lang}>
          {named.map((l, i) => <p key={i}>{sayLine(lang, l)}</p>)}
          <p>{parseText(pickL(lang, activity.explain, activity.explainVn, activity.explainFr))}</p>
        </Verdict>
      )}
    </div>
  );
}

function JourneyControls({ round, lang, t, order, setOrder, checked, ok, onCheck, ready }) {
  const add = (pid) => { if (!checked && !order.includes(pid) && order.length < round.steps.length) setOrder([...order, pid]); };
  const takeBack = (i) => { if (!checked) setOrder(order.filter((_, k) => k !== i)); };
  const bank = round.bank.filter((pid) => !order.includes(pid));
  const place = (id, letter, colour) => (
    <div className="flex items-baseline gap-1.5 text-xs sm:text-sm font-bold text-slate-600 dark:text-slate-300">
      <span className="shrink-0 px-1.5 rounded-md text-white text-[11px] font-black" style={{ backgroundColor: colour }}>{letter}</span>
      <span>{pickL(lang, PLACES[id].at.en, PLACES[id].at.vn, PLACES[id].at.fr)}</span>
    </div>
  );
  // Compact: under a slide this shares the card with it, so every row counts.
  const chip = 'rounded-lg border-2 border-b-[3px] px-2 py-1 font-bold text-xs sm:text-sm';
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex flex-col gap-0.5">
        {place(round.from, `A · ${t.start}`, '#0087a8')}
        {place(round.to, `B · ${t.end}`, '#c25e12')}
      </div>
      <div className="flex flex-wrap items-center gap-1">
        {round.steps.map((_, i) => {
          const pid = order[i];
          const style = checked ? (ok ? GOOD : BAD) : pid ? IDLE : 'border-dashed bg-slate-50 dark:bg-slate-900 border-slate-300 dark:border-slate-600 text-slate-400';
          return (
            <Fragment key={i}>
              {i > 0 && <ArrowRight className="w-3.5 h-3.5 text-slate-400 shrink-0" strokeWidth={3} />}
              <button disabled={checked || !pid} onClick={() => takeBack(i)} className={`${chip} min-w-[3rem] ${style}`}>
                <span className="opacity-60 mr-1">{i + 1}.</span>{pid ? processName(pid, lang) : '…'}
              </button>
            </Fragment>
          );
        })}
      </div>
      {!checked && (
        <>
          <p className="text-[11px] font-bold text-slate-400">{t.tapSteps}</p>
          <div className="flex flex-wrap items-center gap-1.5">
            <div className="flex-1 min-w-[10rem] flex flex-wrap gap-1 min-h-[2.25rem] p-1 rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-700 bg-slate-100/60 dark:bg-slate-800/40">
              {bank.map((pid) => (
                <button key={pid} onClick={() => add(pid)} className={`${chip} hover:-translate-y-0.5 transition-all ${IDLE}`}>
                  {processName(pid, lang)}
                </button>
              ))}
            </div>
            <button onClick={onCheck} disabled={!ready} className={`${primary} ml-auto`}>{t.check}</button>
          </div>
        </>
      )}
    </div>
  );
}
