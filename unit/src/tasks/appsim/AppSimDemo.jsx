import { lazy, Suspense, useEffect, useMemo, useState } from 'react';
import { Play, Pause, SkipForward, RotateCcw } from 'lucide-react';
import { initialState, replay } from '../../utils/appSim';

const FilesSkin = lazy(() => import('./skins/FilesSkin.jsx'));
const DesktopSkin = lazy(() => import('./skins/DesktopSkin.jsx'));
const BrowserSkin = lazy(() => import('./skins/BrowserSkin.jsx'));

/* ------------------------------------------------------------------ *
 * APP SIM — DEMO MODE. The same engine and the same skin as the Try It task,
 * driving themselves through an authored script while the deck explains what is
 * happening. Registered in WidgetRenderer as `type: 'AppSim'`.
 *
 * This is the strongest architectural argument for building the simulator at
 * all (docs/digital-skills-course.md §5.1): the SHOW beat of the lesson and the
 * DO beat are the same machine, so a student watches exactly the window they are
 * about to be handed. Build once, use twice.
 *
 * Nothing here can be interacted with — the skin is passed `disabled` — because
 * a demo the student can wander off inside stops demonstrating anything. The
 * doing happens in the SIM task.
 *
 * Widget params:
 *   { skin: 'files' | 'desktop' | 'browser',
 *     initial: { … },                 // same shape as a sim item's `initial`
 *     script: [ { type, …, say, sayVn } ],   // engine actions, optionally narrated
 *     autoplay?: true }
 * ------------------------------------------------------------------ */

const STEP_MS = 1900;

export default function AppSimDemo({ skin = 'files', initial = {}, script = [], autoplay = true, lang = 'en' }) {
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(autoplay);

  const start = useMemo(() => initialState({ skin, initial }), [skin, initial]);
  const state = useMemo(() => replay(start, script.slice(0, step)), [start, script, step]);

  const atEnd = step >= script.length;

  useEffect(() => {
    if (!playing || atEnd) return undefined;
    const id = setTimeout(() => setStep((s) => Math.min(s + 1, script.length)), STEP_MS);
    return () => clearTimeout(id);
  }, [playing, atEnd, step, script.length]);

  // It stops at the end rather than looping — a window that keeps resetting
  // itself under a paragraph of narration is impossible to read alongside — and
  // that falls out of the effect above scheduling nothing once `atEnd`. No
  // second effect is needed to flip `playing`: every control below branches on
  // `atEnd` first, so the state would only have to be kept in sync for nothing.

  // The caption belongs to the action just performed, so it lands with the
  // change it describes rather than a beat early.
  const current = step > 0 ? script[step - 1] : null;
  const caption = current && (lang === 'vn' ? (current.sayVn || current.say) : current.say);

  const btn = 'px-3 py-1.5 rounded-lg text-xs font-black uppercase tracking-widest border-2 border-b-[3px] flex items-center gap-1.5 bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200';

  return (
    <div className="w-full h-full flex flex-col gap-2 p-1">
      <div className="flex-1 min-h-0 overflow-hidden">
        <Suspense fallback={<div className="p-6 text-center font-black text-slate-400">Loading…</div>}>
          {skin === 'files' && <FilesSkin state={state} onAction={() => {}} disabled />}
          {skin === 'desktop' && <DesktopSkin state={state} onAction={() => {}} disabled fit="parent" />}
          {skin === 'browser' && <BrowserSkin state={state} onAction={() => {}} disabled />}
        </Suspense>
      </div>

      <div className="shrink-0 flex items-center gap-2 flex-wrap">
        <button onClick={() => (atEnd ? (setStep(0), setPlaying(true)) : setPlaying(!playing))} className={btn}>
          {atEnd
            ? <><RotateCcw className="w-3.5 h-3.5" strokeWidth={3} /> {lang === 'vn' ? 'Xem lại' : 'Replay'}</>
            : playing
              ? <><Pause className="w-3.5 h-3.5" strokeWidth={3} /> {lang === 'vn' ? 'Dừng' : 'Pause'}</>
              : <><Play className="w-3.5 h-3.5" strokeWidth={3} /> {lang === 'vn' ? 'Chạy' : 'Play'}</>}
        </button>
        <button onClick={() => { setPlaying(false); setStep((s) => Math.min(s + 1, script.length)); }}
          disabled={atEnd} className={`${btn} ${atEnd ? 'opacity-40 cursor-not-allowed' : ''}`}>
          <SkipForward className="w-3.5 h-3.5" strokeWidth={3} /> {lang === 'vn' ? 'Từng bước' : 'Step'}
        </button>
        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
          {step} / {script.length}
        </span>
        {caption && (
          <span className="text-xs font-bold text-slate-600 dark:text-slate-300 basis-full sm:basis-auto sm:ml-2">
            {caption}
          </span>
        )}
      </div>
    </div>
  );
}
