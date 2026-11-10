import { useMemo, useState } from 'react';
import { Construction, Trophy, Lightbulb, ArrowRight, TrendingUp, ZoomIn, ZoomOut, PencilRuler, SkipForward, CheckCircle2, XCircle } from 'lucide-react';
import TopBar from '../components/TopBar';
import useLang from '../hooks/useLang';
import { tr } from '../utils/lang';
import { zeroLineModel, diagnosePaper, zeroLineScore } from '../utils/zeroLine';
import { ZeroLineBoard, PaperSketch } from '../data/Y7_MATH/U05_3/protractor.jsx';
import { StagePanel, StageChips, ZMessage } from '../data/Y7_MATH/U05_3/zeroLineItem.jsx';
import { useZeroLineItem } from '../data/Y7_MATH/U05_3/zeroLineState.js';

/* ------------------------------------------------------------------ *
 * ZERO ON THE LINE — read, draw and construct with a protractor (Y7
 * Maths 5.3). Reads a unit's `zeroLine` { title, titleFr, intro?, levels,
 * items }; utils/zeroLine.js derives every stage, answer and slip, and the
 * unit folder (Y7_MATH/U05_3) draws the board and plays the stages.
 *
 * Decisions, not dexterity: the protractor is placed for the student; they
 * estimate, choose the 0, tap the scale, tap AB or type a reading. Two or
 * three actions an item; an extra stage opens only after a slip.
 *
 * The last level is on paper ("With your own tools"): the student draws with
 * a real ruler and protractor and types what they measure; they see their
 * value beside the expected one (±0.2 cm, ±2°). It can be skipped: a skipped
 * item leaves the count, so the task finishes and pays for everything else.
 * Progress blob: { [itemId]: 1 | 0.5 | 'skip' }, score out of 10.
 * ------------------------------------------------------------------ */

const INK = '#c25e12';
const INK_DARK = '#a04a0e';
const GREEN = '#58cc02';
const AMBER = '#f59e0b';
const btn = 'rounded-xl font-black uppercase tracking-widest border-b-[4px] active:border-b-0 active:translate-y-[4px] transition-all disabled:opacity-40 disabled:pointer-events-none';

const T = {
  en: {
    title: 'Zero on the Line', next: 'Next', finish: 'Finish', level: 'Level', solved: 'done',
    clean: 'Right first time.', slipped: 'Done: one slip, and you fixed it.', helped: 'Done, with a step shown to you.',
    closer: 'Look closer', whole: 'Whole picture', noItems: 'No questions yet', back: 'Back to the unit',
    ask: {
      read: 'How big is this angle?', reflex: 'How big is the marked angle?',
      draw: (x, v) => `Draw an angle of ${x}° at ${v}.`,
      parallel: 'Draw the line through P parallel to AB: make the same angle at P as the angle at Q.',
      perp: 'Draw the perpendicular from C to AB. It meets AB at D. Then measure AD.',
      sketch: (q) => `From the sketch: AB = ${q.AB} cm, angle A = ${q.A}°, AD = ${q.AD} cm. Now draw angle B = ${q.B}° (BC = ${q.BC} cm).`,
      shape: (v) => `The quadrilateral is drawn from the sketch. Measure angle ${v}.`,
    },
    sum: 'Check: the four angles add up to 360°.',
    paper: {
      head: 'With your own tools',
      square: (s) => `On paper, with a ruler and a protractor: draw a square with sides of ${s} cm (AB, then a right angle and ${s} cm up at A and at B, then join). Measure both diagonals, AC and BD, to the nearest mm.`,
      quad: (q) => `On paper, draw the quadrilateral from the sketch, accurately: AB = ${q.AB} cm; at A, ${q.A}° and AD = ${q.AD} cm; at B, ${q.B}° (count from the 0 on BA) and BC = ${q.BC} cm; join D to C. Then measure angles C and D.`,
      tol: 'Within 0.2 cm, or 2°, counts as accurate.',
      check: 'Check my drawing', skip: 'Skip: no ruler and protractor with me',
      yours: 'Yours', expected: 'Expected', skipped: 'Skipped. It does not count against you.',
      angle: (v) => `Angle ${v}`,
    },
  },
  fr: {
    title: 'Le zéro sur la droite', next: 'Suivant', finish: 'Terminer', level: 'Niveau', solved: 'faits',
    clean: 'Juste du premier coup.', slipped: 'Fini : une erreur, et tu l’as corrigée.', helped: 'Fini, avec une étape montrée.',
    closer: 'Regarde de près', whole: 'Vue d’ensemble', noItems: 'Pas encore de questions', back: 'Retour à l’unité',
    ask: {
      read: 'Quelle est la taille de cet angle ?', reflex: 'Quelle est la taille de l’angle marqué ?',
      draw: (x, v) => `Trace un angle de ${x}° en ${v}.`,
      parallel: 'Trace la droite passant par P, parallèle à AB : fais en P le même angle qu’en Q.',
      perp: 'Trace la perpendiculaire menée de C à AB. Elle coupe AB en D. Puis mesure AD.',
      sketch: (q) => `D’après le croquis : AB = ${q.AB} cm, angle A = ${q.A}°, AD = ${q.AD} cm. Trace maintenant l’angle B = ${q.B}° (BC = ${q.BC} cm).`,
      shape: (v) => `Le quadrilatère est tracé d’après le croquis. Mesure l’angle ${v}.`,
    },
    sum: 'Vérifie : les quatre angles font 360° en tout.',
    paper: {
      head: 'Avec tes propres outils',
      square: (s) => `Sur papier, avec une règle et un rapporteur : trace un carré de ${s} cm de côté (AB, puis un angle droit et ${s} cm vers le haut en A et en B, puis relie). Mesure les deux diagonales, AC et BD, au mm près.`,
      quad: (q) => `Sur papier, trace le quadrilatère du croquis, avec précision : AB = ${q.AB} cm ; en A, ${q.A}° et AD = ${q.AD} cm ; en B, ${q.B}° (compte à partir du 0 sur BA) et BC = ${q.BC} cm ; relie D à C. Puis mesure les angles C et D.`,
      tol: 'À 0.2 cm, ou 2°, près, c’est précis.',
      check: 'Vérifier mon tracé', skip: 'Passer : je n’ai ni règle ni rapporteur',
      yours: 'Toi', expected: 'Attendu', skipped: 'Passé. Ça ne compte pas contre toi.',
      angle: (v) => `Angle ${v}`,
    },
  },
};

function derive(item) {
  if (!item?.id) return null;
  try { return zeroLineModel(item); } catch { return null; }
}

/** The answer line under a finished screen item. */
function summary(model, item, lang) {
  const fr = lang === 'fr';
  const q = model.quad;
  switch (model.kind) {
    case 'reflex': return `360° − ${model.inside}° = ${model.answer}°`;
    case 'draw': return fr ? `${model.answer}° en ${model.vertex}` : `${model.answer}° at ${model.vertex}`;
    case 'parallel': return fr ? `${model.answer}° en Q et en P : les droites sont parallèles.` : `${model.answer}° at Q and at P: the lines are parallel.`;
    case 'perp': return `AD = ${model.answer} cm`;
    case 'sketch': return fr ? `Angle B = ${item.B}°. Puis BC = ${item.BC} cm, et relie D à C.` : `Angle B = ${item.B}°. Then BC = ${item.BC} cm, and join D to C.`;
    case 'shape': {
      const a = ['A', 'B', 'C', 'D'].map((v) => Math.round(q.angles[v]));
      return `${a[0]}° + ${a[1]}° + ${a[2]}° + ${a[3]}° = ${a.reduce((s, x) => s + x, 0)}°`;
    }
    default: return `${Math.round(model.answer)}°`;
  }
}

function Done({ helped, slipped, t, children, onNext, isLast }) {
  return (
    <div className="rounded-2xl border-2 shadow-sm overflow-hidden" style={{ borderColor: helped ? AMBER : GREEN }}>
      <div className="px-4 py-2.5 flex items-center gap-3 text-white" style={{ backgroundColor: helped ? AMBER : GREEN }}>
        {helped ? <Lightbulb className="w-5 h-5 shrink-0" strokeWidth={2.5} /> : <Trophy className="w-5 h-5 shrink-0" strokeWidth={2.5} />}
        <div className="font-black">{helped ? t.helped : slipped ? t.slipped : t.clean}</div>
      </div>
      <div className="bg-white dark:bg-slate-900 p-3 sm:p-4">
        {children}
        <div className="mt-3 flex justify-end">
          <button onClick={onNext} className={`px-6 py-3 text-white text-sm ${btn}`} style={{ backgroundColor: INK, borderColor: INK_DARK }}>
            {isLast ? t.finish : t.next} <ArrowRight className="w-4 h-4 inline ml-1 -mt-0.5" strokeWidth={3} />
          </button>
        </div>
      </div>
    </div>
  );
}

function ScreenItem({ item, model, lang, t, head, onScore, onNext, isLast }) {
  const [zoom, setZoom] = useState(false);
  const zl = useZeroLineItem(model, { onDone: ({ helped }) => onScore(helped ? 0.5 : 1) });
  const ask = model.kind === 'draw' ? t.ask.draw(model.answer, model.vertex)
    : model.kind === 'sketch' ? t.ask.sketch(item) : model.kind === 'shape' ? t.ask.shape(model.vertex) : t.ask[model.kind];
  return (
    <div className="flex-1 w-full max-w-6xl mx-auto p-3 sm:p-5 pb-10 lg:grid lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-5 lg:items-start">
      <div className="lg:sticky lg:top-4 rounded-2xl border-2 bg-white dark:bg-slate-800 shadow-sm overflow-hidden min-w-0" style={{ borderColor: INK }}>
        {head}
        <div className="relative h-[42vh] min-h-[220px] lg:h-[min(58vh,30rem)] bg-white">
          <ZeroLineBoard model={model} ring={zl.ring} onZero={zl.stage === 'zero' ? zl.tapZero : null}
            mark={zl.mark} onMark={zl.stage === 'mark' ? zl.setMark : null} drawn={zl.drawn}
            place={zl.place} onPlace={zl.stage === 'place' ? zl.movePlace : null} foot={zl.foot} ruler={zl.ruler}
            finished={model.kind === 'sketch' && zl.done} reveal={zl.done && model.read && model.kind !== 'reflex' ? `${Math.round(model.answer)}°` : null} zoom={zoom} />
          <button type="button" onClick={() => setZoom(!zoom)}
            className="absolute right-2 bottom-2 flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-white/90 border-2 border-slate-200 text-[10px] font-black uppercase tracking-widest text-slate-600">
            {zoom ? <ZoomOut className="w-3.5 h-3.5" strokeWidth={3} /> : <ZoomIn className="w-3.5 h-3.5" strokeWidth={3} />} {zoom ? t.whole : t.closer}
          </button>
        </div>
      </div>
      <div className="mt-3 lg:mt-0 flex flex-col gap-3 min-w-0">
        <div className="rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-sm p-3 sm:p-4">
          <p className="text-base sm:text-lg font-black text-slate-800 dark:text-slate-100 leading-snug">{ask}</p>
          <div className="mt-2 mb-3"><StageChips zl={zl} lang={lang} /></div>
          {!zl.done && <StagePanel zl={zl} model={model} lang={lang} />}
        </div>
        {zl.done && (
          <Done helped={zl.helped} slipped={zl.slipped} t={t} onNext={onNext} isLast={isLast}>
            <ZMessage msg={zl.msg} lang={lang} />
            <div className="mt-2 rounded-xl border-2 p-3 font-mono font-black text-lg text-slate-900 dark:text-slate-100" style={{ borderColor: INK, backgroundColor: 'rgba(194,94,18,0.07)' }}>
              {summary(model, item, lang)}
            </div>
            {model.kind === 'shape' && <p className="mt-2 text-sm font-bold text-slate-500 dark:text-slate-400">{t.sum}</p>}
          </Done>
        )}
      </div>
    </div>
  );
}

function PaperItem({ model, lang, t, head, onScore, onSkip, onNext, isLast }) {
  const [vals, setVals] = useState({});
  const [res, setRes] = useState(null);
  const [nudge, setNudge] = useState(null);
  const [skipped, setSkipped] = useState(false);
  const p = t.paper;
  const check = () => {
    const d = diagnosePaper(model, vals);
    if (d.soft) { setNudge(d.soft); return; }
    setNudge(null); setRes(d); onScore(d.all ? 1 : 0.5);
  };
  const skip = () => { setSkipped(true); onSkip(); };
  const label = (b) => (b.unit === 'cm' ? b.id : p.angle(b.id));
  return (
    <div className="flex-1 w-full max-w-6xl mx-auto p-3 sm:p-5 pb-10 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-5 lg:items-start">
      <div className="lg:sticky lg:top-4 rounded-2xl border-2 bg-white dark:bg-slate-800 shadow-sm overflow-hidden min-w-0" style={{ borderColor: INK }}>
        {head}
        <div className="h-[34vh] min-h-[200px] lg:h-[min(50vh,24rem)] bg-white"><PaperSketch model={model} lang={lang} /></div>
      </div>
      <div className="mt-3 lg:mt-0 flex flex-col gap-3 min-w-0">
        <div className="rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-sm p-3 sm:p-4">
          <div className="flex items-center gap-2 mb-2 text-[11px] font-black uppercase tracking-widest" style={{ color: INK }}><PencilRuler className="w-4 h-4" strokeWidth={3} /> {p.head}</div>
          <p className="text-sm sm:text-base font-bold text-slate-700 dark:text-slate-200 leading-relaxed">{model.shape === 'square' ? p.square(model.side) : p.quad(model.q)}</p>
          <p className="mt-1 text-xs font-bold text-slate-500 dark:text-slate-400">{p.tol}</p>
          <div className="mt-3 flex flex-col gap-2">
            {model.boxes.map((b) => {
              const v = res?.boxes?.[b.id];
              return (
                <div key={b.id} className="flex flex-wrap items-center gap-2 rounded-xl border-2 border-slate-100 dark:border-slate-800 px-3 py-2">
                  <span className="font-black text-slate-700 dark:text-slate-200 min-w-[5rem]">{label(b)}</span>
                  <input value={vals[b.id] || ''} disabled={!!res || skipped} onChange={(e) => { setVals({ ...vals, [b.id]: e.target.value }); setNudge(null); }}
                    onKeyDown={(e) => { if (e.key === 'Enter') check(); }} inputMode="decimal" autoComplete="off" spellCheck={false} placeholder="?" aria-label={label(b)}
                    className="w-24 px-2 py-1 rounded-xl border-2 border-b-[4px] border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 font-mono font-black text-lg text-center text-slate-800 dark:text-slate-100 focus:outline-none focus:border-orange-500" />
                  <span className="font-black text-slate-500">{b.unit === 'cm' ? 'cm' : '°'}</span>
                  {v && (
                    <span className={`ml-auto inline-flex items-center gap-1 text-sm font-black ${v.ok ? 'text-[#3e7500]' : 'text-rose-600'}`}>
                      {v.ok ? <CheckCircle2 className="w-4 h-4" strokeWidth={3} /> : <XCircle className="w-4 h-4" strokeWidth={3} />}
                      {p.expected}: {b.show}{b.unit === 'cm' ? ' cm' : '°'}
                    </span>
                  )}
                  {v && !v.ok && <p className="w-full text-sm font-bold text-rose-600 dark:text-rose-300">{tr(lang, v.en, null, v.fr)}</p>}
                </div>
              );
            })}
          </div>
          {res?.corner && <ZMessage msg={{ tone: 'bad', ...res.corner }} lang={lang} />}
          {res?.sum && <ZMessage msg={{ tone: res.sum.ok ? 'ok' : 'bad', en: `${T.en.sum} ${res.sum.text}`, fr: `${T.fr.sum} ${res.sum.text}` }} lang={lang} />}
          {nudge && <ZMessage msg={{ tone: 'info', ...nudge }} lang={lang} />}
          {skipped && <ZMessage msg={{ tone: 'info', en: T.en.paper.skipped, fr: T.fr.paper.skipped }} lang={lang} />}
          {!res && !skipped && (
            <div className="mt-3 flex flex-wrap items-center justify-end gap-2">
              <button type="button" onClick={skip} className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl font-bold text-[11px] uppercase tracking-widest text-slate-500 border-2 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800">
                <SkipForward className="w-4 h-4" strokeWidth={2.5} /> {p.skip}
              </button>
              <button type="button" onClick={check} className={`px-5 py-2.5 text-white text-xs ${btn}`} style={{ backgroundColor: GREEN, borderColor: '#3e7500' }}>{p.check}</button>
            </div>
          )}
        </div>
        {(res || skipped) && (
          <div className="flex justify-end">
            <button onClick={onNext} className={`px-6 py-3 text-white text-sm ${btn}`} style={{ backgroundColor: INK, borderColor: INK_DARK }}>
              {isLast ? t.finish : t.next} <ArrowRight className="w-4 h-4 inline ml-1 -mt-0.5" strokeWidth={3} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ZeroLine({ pool, savedData = {}, onComplete, onProgress, onQuit, bilingual = true, langs }) {
  const items = useMemo(() => (pool?.items || []).filter((it) => derive(it)), [pool]);
  const { lang, toggleLang } = useLang({ langs, bilingual });
  const [results, setResults] = useState(() => {
    const init = {};
    for (const [id, v] of Object.entries(savedData || {})) init[id] = v === 'skip' ? 'skip' : Number(v) || 0;
    return init;
  });
  const [pos, setPos] = useState(() => {
    const i = items.findIndex((it) => savedData?.[it.id] == null);
    return i === -1 ? 0 : i;
  });
  const [ended, setEnded] = useState(false);
  const t = T[lang] || T.en;
  const item = items[pos];
  const model = useMemo(() => derive(item), [item]);

  if (!items.length || !model) {
    return (
      <div className="h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-6 text-center">
        <Construction className="w-10 h-10 mb-3" style={{ color: INK }} strokeWidth={2.5} />
        <h2 className="text-2xl font-black text-slate-800 dark:text-slate-100 mb-2">{t.noItems}</h2>
        <button onClick={onQuit} className={`mt-4 px-6 py-3 text-white text-base ${btn}`} style={{ backgroundColor: INK, borderColor: INK_DARK }}>{t.back}</button>
      </div>
    );
  }

  const report = (res) => {
    const raw = zeroLineScore(items, res);
    const blob = Object.fromEntries(items.filter((it) => res[it.id] != null).map((it) => [it.id, res[it.id]]));
    const log = items.filter((it) => res[it.id] !== 'skip').map((it) => ({ itemId: it.id, correct: res[it.id] === 1 }));
    return { raw, blob, log };
  };
  const record = (value) => {
    const next = { ...results, [item.id]: value };
    setResults(next);
    const { raw, blob, log } = report(next);
    onProgress?.(raw, blob, { items: log });
  };
  const finish = () => {
    if (ended) return;
    setEnded(true);
    const { raw, blob, log } = report(results);
    onComplete?.(raw, blob, { items: log });
  };
  const isLast = pos === items.length - 1;
  const onNext = () => (isLast ? finish() : setPos(pos + 1));
  // Every answer is saved as it is given (onProgress), so leaving just leaves.
  const quit = () => onQuit?.();

  const cleared = items.reduce((s, it) => s + (typeof results[it.id] === 'number' ? results[it.id] : 0), 0);
  const levelRaw = item.level ? pool?.levels?.[item.level] : null;
  const levelName = levelRaw ? tr(lang, levelRaw.en, null, levelRaw.fr || levelRaw.en) : null;
  const intro = pos === 0 ? tr(lang, pool?.intro, null, pool?.introFr || pool?.intro) : null;
  const head = (
    <div>
      <div className="px-4 py-2 text-white flex items-center gap-3" style={{ backgroundColor: INK }}>
        <TrendingUp className="w-4 h-4 shrink-0" strokeWidth={3} />
        <div className="text-[11px] font-black uppercase tracking-widest opacity-90 truncate">{t.level} {item.level}{levelName ? ` · ${levelName}` : ''}</div>
        <div className="ml-auto text-[11px] font-black uppercase tracking-widest opacity-80 whitespace-nowrap">{cleared % 1 === 0 ? cleared : cleared.toFixed(1)} / {items.length} {t.solved}</div>
      </div>
      {intro && <p className="px-4 pt-2 text-sm font-bold text-slate-500 dark:text-slate-400">{intro}</p>}
    </div>
  );
  const common = { model, lang, t, head, onNext, isLast, onScore: record };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 font-sans transition-colors duration-300">
      <TopBar onQuit={quit} modeTitle={tr(lang, pool?.title, null, pool?.titleFr) || t.title} current={pos + 1} total={items.length}
        lang={toggleLang ? lang : undefined} onLangToggle={toggleLang} />
      {model.kind === 'paper'
        ? <PaperItem key={item.id} {...common} onSkip={() => record('skip')} />
        : <ScreenItem key={item.id} {...common} item={item} />}
    </div>
  );
}
