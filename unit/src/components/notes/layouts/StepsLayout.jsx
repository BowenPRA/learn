// Multi-step: a numbered sequence with accent-tinted step chips, plus an optional
// media panel and a final reveal (answer box). For processes and derivations —
// solving an equation, the scientific method, writing a summary.
import { Media, Reveal, HeaderBar } from './primitives.jsx';
import { parseInlineText, renderContent, toHex } from './helpers.jsx';

export default function StepsLayout({ slide: s, ctx }) {
  const { pick, lang, isDisplayMode } = ctx;
  const accent = toHex(s.accent || s.color, '#ff9600');
  const title = pick(s.title, s.titleVn, s.titleFr);
  const content = pick(s.content, s.contentVn, s.contentFr);
  const steps = s.steps || [];
  const hasMedia = !!s.widget || !!s.inlineSvg || !!s.image;
  // `dense: true` tightens the step cards so five steps and a reveal fit a
  // 1280×720 laptop without scrolling. Opt-in, so decks already approved at the
  // roomier size keep it. Projector (display) mode ignores it.
  const dense = !!s.dense && !isDisplayMode;

  return (
    <>
      <HeaderBar title={title || ''} icon={s.icon || 'Layers'} accent={accent} eyebrow={pick(s.eyebrow, s.eyebrowVn, s.eyebrowFr)} isDisplayMode={isDisplayMode} />
      <div className={`flex-1 min-h-0 overflow-y-auto custom-scrollbar bg-slate-50/50 dark:bg-slate-900/50 ${isDisplayMode ? 'p-[clamp(1.5rem,3vw,3rem)]' : 'p-4 sm:p-5 lg:p-6'}`}>
        <div className={`mx-auto flex flex-col ${hasMedia ? 'max-w-6xl lg:flex-row lg:items-start gap-6' : 'max-w-3xl'}`}>
          <div className="flex-1 min-w-0">
            {content && <div className={dense ? 'mb-3' : 'mb-5'}>{renderContent(content, { isDisplayMode })}</div>}
            <ol className={dense ? 'space-y-2' : 'space-y-3 sm:space-y-4'}>
              {steps.map((step, i) => {
                const text = pick(step.text ?? step, step.textVn, step.textFr);
                return (
                  <li key={i} className={`flex items-start rounded-2xl bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 shadow-sm animate-in fade-in slide-in-from-bottom-1 ${dense ? 'gap-3 px-4 py-2.5' : 'gap-3 sm:gap-4 p-4 sm:p-5'}`}>
                    <span className={`shrink-0 rounded-full text-white font-black flex items-center justify-center shadow-sm ${isDisplayMode ? 'w-11 h-11 text-[clamp(1.1rem,1.6vw,1.5rem)]' : dense ? 'w-8 h-8 text-sm' : 'w-9 h-9 text-base'}`} style={{ backgroundColor: accent }}>{i + 1}</span>
                    <div className={`font-bold text-slate-700 dark:text-slate-200 leading-snug ${isDisplayMode ? 'pt-1 text-[clamp(1.05rem,1.7vw,1.55rem)]' : dense ? 'pt-1 text-[15px] lg:text-base' : 'pt-1 text-[15px] sm:text-base lg:text-lg'}`}>{parseInlineText(text)}</div>
                  </li>
                );
              })}
            </ol>
            {s.reveal && <div className={dense ? 'mt-3' : 'mt-5'}><Reveal reveal={s.reveal} lang={lang} accent={accent} isDisplayMode={isDisplayMode} /></div>}
          </div>
          {hasMedia && (
            <div className={`shrink-0 w-full lg:w-[42%] ${isDisplayMode ? 'h-[22rem]' : 'h-64 sm:h-80'}`}>
              <Media slide={s} ctx={ctx} />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
