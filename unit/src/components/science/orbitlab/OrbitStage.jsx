import { CheckCircle2, XCircle, Lightbulb, Navigation, MoveRight, HelpCircle, Ruler, AreaChart, Sparkles, Wind, Gauge } from 'lucide-react';
import { tr } from '../../../utils/lang';
import { fill } from '../../../utils/orbitLab';
import { PULL_REASONS, SPEED_REASONS, COAST_SCENES } from '../../../utils/orbitLabData';
import { PATTERNS } from '../../../utils/orbitLabSets';
import { T, say, pullSayWords, centreWords, predictQuestion } from './orbitLabText';
import OrbitFigure from './OrbitFigure.jsx';
import BarBuilder from './BarBuilder.jsx';
import { CoastPicture, ForceChips } from './CoastScene.jsx';

/* ------------------------------------------------------------------ *
 * One Orbit Lab item on screen, driven by useOrbitItem: the picture (it
 * stays up for the whole item), then the stage panel (the question, its
 * controls, the message, Check and Show me), then, once done, the rule.
 * Used by the task and by the deck's `orbitlab` activity (`compact`).
 * ------------------------------------------------------------------ */
const GREEN = '#58cc02';
const btn = 'rounded-xl font-black uppercase tracking-widest border-b-[4px] active:border-b-0 active:translate-y-[4px] transition-all disabled:opacity-40 disabled:pointer-events-none';
const STAGE_ICON = { pull: Navigation, path: MoveRight, why: HelpCircle, both: Navigation, draw: Ruler, pattern: AreaChart, predict: Sparkles, forces: Wind, speed: Gauge };
const pickL = (lang, o) => tr(lang, o.en, null, o.fr || o.en);

export function Message({ msg, lang }) {
  if (!msg) return null;
  const text = pickL(lang, msg);
  if (!text) return null;
  const soft = msg.tone === 'shown' || msg.tone === 'info';
  const tone = msg.tone === 'ok' ? 'bg-[#58cc02]/10 border-[#58cc02]/40 text-[#3e7500] dark:text-lime-300'
    : soft ? 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-300'
      : 'bg-rose-50 dark:bg-rose-900/20 border-rose-200 dark:border-rose-800 text-rose-600 dark:text-rose-300';
  const Icon = msg.tone === 'ok' ? CheckCircle2 : soft ? Lightbulb : XCircle;
  return (
    <div className={`mt-3 flex items-start gap-2 p-3 rounded-xl border-2 font-bold text-sm leading-relaxed ${tone}`}>
      <Icon className="w-5 h-5 shrink-0" strokeWidth={3} /><span>{text}</span>
    </div>
  );
}

function Choices({ options, tried = [], right = null, onPick, locked = false }) {
  return (
    <div className="grid gap-2">
      {options.map((o) => {
        const bad = tried.includes(o.val);
        const good = right === o.val;
        const chosen = o.chosen && !good && !bad;
        return (
          <button key={o.val} type="button" disabled={bad || right != null || locked} onClick={() => onPick(o.val)}
            className={`rounded-xl border-2 border-b-[4px] px-3.5 py-2.5 text-left font-black text-sm sm:text-base leading-snug transition-all flex items-start gap-2
              ${good ? 'border-[#58a700] bg-[#d7ffb8] dark:bg-lime-900/30 text-[#3e7500] dark:text-lime-200'
                : bad ? 'bg-rose-50 dark:bg-rose-900/20 border-rose-400 text-rose-600 dark:text-rose-300'
                  : chosen ? 'border-amber-500 bg-amber-100 dark:bg-amber-900/40 text-slate-900 dark:text-amber-100'
                    : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 hover:border-amber-400'}`}>
            {good && <CheckCircle2 className="w-5 h-5 shrink-0" strokeWidth={3} />}
            {bad && <XCircle className="w-5 h-5 shrink-0" strokeWidth={3} />}
            <span>{o.label}</span>
          </button>
        );
      })}
    </div>
  );
}

/** The picture for the whole item. */
export function OrbitPicture({ o, lang, compact = false }) {
  const { m } = o;
  if (m.kind === 'pull') {
    const tappable = ['pull', 'path', 'both'].includes(o.stage);
    return (
      <div className={`${compact ? 'h-[30vh] min-h-[190px] lg:h-[29vh]' : 'h-[44vh] min-h-[250px] max-h-[480px]'} w-full`}>
        <OrbitFigure m={m} lang={lang} arrows={o.arrows} released={o.released} tappable={tappable} onArrow={o.tapArrow} reveal={o.done} />
      </div>
    );
  }
  if (m.kind === 'graph') {
    // On a slide the Check sits beside ▲ ▼, so the side column stays short.
    const check = compact && o.stage === 'draw' && o.check
      ? <button type="button" onClick={o.check} className={`px-5 py-3 text-white text-xs ${btn}`} style={{ backgroundColor: GREEN, borderColor: '#3e7500' }}>{(T[lang] || T.en).check}</button>
      : null;
    return (
      <BarBuilder m={m} lang={lang} heights={o.heights} sel={o.sel} onSel={o.setSel} onBar={o.setBar}
        marks={o.marks} locked={o.stage !== 'draw'} reveal={!o.queue.includes('draw')} compact={compact} extra={check} />
    );
  }
  const sc = COAST_SCENES[m.scene];
  return (
    <div>
      <p className={`font-black text-slate-800 dark:text-slate-100 leading-snug mb-2 ${compact ? 'text-sm' : 'text-base sm:text-lg'}`}>{pickL(lang, sc)}</p>
      <div className={compact ? 'max-w-md mx-auto' : 'max-w-2xl mx-auto'}><CoastPicture icon={sc.icon} lang={lang} /></div>
    </div>
  );
}

function StageControls({ o, lang }) {
  const { m, stage } = o;
  const t = T[lang] || T.en;
  if (m.kind === 'pull') {
    const words = pullSayWords(m);
    if (stage === 'why') {
      return <Choices options={m.reasons.map((id) => ({ val: id, label: fill(PULL_REASONS[id][lang === 'fr' ? 'fr' : 'en'], words, lang) }))}
        tried={o.tried.why} right={o.found.why} onPick={o.pick} />;
    }
    if (stage === 'both') {
      return (
        <div className="flex flex-wrap gap-2">
          {[['pull', '#c8102e', t.placePull], ['path', '#1a5fa8', t.placePath]].map(([k, color, label]) => (
            <button key={k} type="button" onClick={() => o.setTarget(k)} aria-pressed={o.target === k}
              className={`px-3 py-2 rounded-xl border-2 border-b-[4px] text-xs sm:text-sm font-black uppercase tracking-widest flex items-center gap-2 ${o.target === k ? 'bg-amber-100 dark:bg-amber-900/40 border-amber-500 text-slate-900 dark:text-amber-100' : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'}`}>
              <span className="inline-block w-5 h-1.5 rounded" style={{ backgroundColor: color }} />
              {label}{o.arrows[k] != null && ' ✓'}
            </button>
          ))}
        </div>
      );
    }
    return null;
  }
  if (m.kind === 'graph') {
    if (stage === 'pattern') {
      return <Choices options={m.pattern.map((id) => ({ val: id, label: `… ${pickL(lang, PATTERNS[id])}` }))} tried={o.tried.pattern} right={o.found.pattern} onPick={o.pick} />;
    }
    if (stage === 'why') {
      return <Choices options={m.reasonIds.map((id) => ({ val: id, label: pickL(lang, m.reasonTable.find((r) => r.id === id)) }))} tried={o.tried.why} right={o.found.why} onPick={o.pick} />;
    }
    if (stage === 'predict') {
      return <Choices options={m.predict.options.map((x) => ({ val: x.val, label: fill(t.predictAbout, { v: String(x.val) }, lang) }))} tried={o.tried.predict} right={o.found.predict} onPick={o.pick} />;
    }
    return null;
  }
  const speedChoices = (inBoth) => (
    <Choices options={m.speeds.map((id) => ({ val: id, label: pickL(lang, SPEED_REASONS[m.where][id]), chosen: inBoth && o.found.speed === id }))}
      tried={o.tried.speed} right={inBoth ? null : o.found.speed} onPick={o.pick} />
  );
  if (stage === 'forces') return <ForceChips picked={o.forces} onToggle={o.toggleForce} lang={lang} />;
  if (stage === 'speed') return speedChoices(false);
  if (stage === 'both') {
    return (
      <div className="flex flex-col gap-3">
        <ForceChips picked={o.forces} onToggle={o.toggleForce} lang={lang} />
        <p className="font-black text-slate-800 dark:text-slate-100 text-sm sm:text-base">{t.speed}</p>
        {speedChoices(true)}
      </div>
    );
  }
  return null;
}

function promptOf(o, lang) {
  const { m, stage } = o;
  const t = T[lang] || T.en;
  if (m.kind === 'pull') {
    const words = pullSayWords(m);
    if (stage === 'pull') return [say(lang, 'pull', words), m.walk ? t.pullHint : null];
    if (stage === 'path') return [say(lang, 'path', words), m.walk ? t.pathHint : null];
    if (stage === 'why') return [t.why, null];
    return [say(lang, 'both', words), null];
  }
  if (m.kind === 'graph') {
    if (stage === 'draw') return [t.draw, fill(t.scale, { per: String(m.per) }, lang)];
    if (stage === 'pattern') return [say(lang, 'patternLead', centreWords(m, lang)), null];
    if (stage === 'why') return [t.graphWhy, null];
    return [predictQuestion(m, lang), null];
  }
  if (stage === 'forces' || stage === 'both') return [t.forces, null];
  return [t.speed, null];
}

/** The question, its controls, the message and the buttons for the current stage. */
export function StagePanel({ o, lang, showMe = true, compact = false }) {
  const t = T[lang] || T.en;
  if (o.done) return <Message msg={o.msg} lang={lang} />;
  const [title, help] = promptOf(o, lang);
  // On a slide, the draw stage's Check is beside ▲ ▼ and the activity's own
  // prompt says what to draw; the message goes under the buttons.
  const checkInPicture = compact && o.stage === 'draw';
  const needsCheck = ['pull', 'path', 'both', 'draw', 'forces'].includes(o.stage) && !checkInPicture;
  const stages = o.queue;
  return (
    <div className="min-w-0">
      {!compact && (
        <div className="flex flex-wrap gap-1.5 mb-2">
          {stages.map((s, i) => {
            const Icon = STAGE_ICON[s] || Navigation;
            const label = s === 'both' && o.m.kind === 'coast' ? t.stages.coastBoth : t.stages[s];
            return (
              <span key={`${s}-${i}`} className={`flex items-center gap-1.5 px-2.5 py-1 rounded-xl border-2 text-[10px] sm:text-xs font-black uppercase tracking-widest ${i === 0 ? 'bg-amber-400 border-amber-500 text-slate-950' : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-400'}`}>
                <Icon className="w-3.5 h-3.5" strokeWidth={3} />{label}
              </span>
            );
          })}
        </div>
      )}
      {!checkInPicture && <div className={`font-black text-slate-800 dark:text-slate-100 leading-snug ${compact ? 'text-sm lg:text-base' : 'text-base sm:text-lg'}`}>{title}</div>}
      {help ? <p className={`text-xs sm:text-sm font-semibold text-slate-500 dark:text-slate-400 mt-0.5 ${compact ? 'mb-2' : 'mb-3'}`}>{help}</p> : <div className={compact ? 'mb-2' : 'mb-3'} />}
      <StageControls o={o} lang={lang} />
      {!compact && <Message msg={o.msg} lang={lang} />}
      {(showMe || needsCheck) && (
        <div className="mt-3 flex items-center justify-end gap-2">
          {showMe && (
            <button type="button" onClick={o.showMe}
              className="flex items-center gap-1.5 px-4 py-3 rounded-xl font-bold text-xs uppercase tracking-widest text-amber-600 dark:text-amber-400 border-2 border-amber-200 dark:border-amber-800 hover:bg-amber-50 dark:hover:bg-amber-900/20">
              <Lightbulb className="w-4 h-4" strokeWidth={2.5} /> {t.stuck}
            </button>
          )}
          {needsCheck && <button type="button" onClick={o.check} className={`px-5 py-3 text-white text-xs ${btn}`} style={{ backgroundColor: GREEN, borderColor: '#3e7500' }}>{t.check}</button>}
        </div>
      )}
      {compact && <Message msg={o.msg} lang={lang} />}
    </div>
  );
}
