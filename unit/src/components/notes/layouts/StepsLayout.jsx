// Multi-step: a numbered sequence with accent-tinted step chips, plus an optional
// media panel and a final reveal (answer box). For processes and derivations —
// solving an equation, the scientific method, writing a summary.
import { Media, Reveal, HeaderBar, Note } from './primitives.jsx';
import { parseInlineText, renderContent, renderStrip, isStripLine, hasStrips, toHex } from './helpers.jsx';

// A step that carries an example sentence (a ✗/✓ line): its name, and any
// detail line under it, on the left; the example strip on the right from lg,
// under the name on a narrow screen. One row per fix keeps four of them and
// a note on a laptop screen without scrolling.
function StepWithExample({ text, isDisplayMode, dense }) {
  const lines = String(text).split('\n').filter((l) => l.trim());
  const words = lines.filter((l) => !isStripLine(l));
  const strips = lines.filter(isStripLine);
  return (
    <div className="flex flex-col lg:flex-row lg:items-center gap-1.5 lg:gap-4">
      <div className={`shrink-0 ${isDisplayMode ? 'lg:w-[clamp(12rem,18vw,18rem)]' : 'lg:w-44'}`}>
        {words.map((w, j) => (
          <div key={j} className={j ? `font-semibold text-slate-500 dark:text-slate-400 leading-snug ${isDisplayMode ? 'text-[clamp(0.9rem,1.3vw,1.25rem)]' : 'text-[13px] lg:text-sm'}` : ''}>{parseInlineText(w)}</div>
        ))}
      </div>
      <div className="flex-1 min-w-0 space-y-2">{strips.map((l, j) => renderStrip(l, j, { isDisplayMode, tight: dense }))}</div>
    </div>
  );
}

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
                  <li key={i} className={`flex rounded-2xl bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 shadow-sm animate-in fade-in slide-in-from-bottom-1 ${hasStrips(text) ? 'items-center' : 'items-start'} ${dense ? `gap-3 px-4 ${hasStrips(text) ? 'py-1.5' : 'py-2.5'}` : 'gap-3 sm:gap-4 p-4 sm:p-5'}`}>
                    <span className={`shrink-0 rounded-full text-white font-black flex items-center justify-center shadow-sm ${isDisplayMode ? 'w-11 h-11 text-[clamp(1.1rem,1.6vw,1.5rem)]' : dense ? 'w-8 h-8 text-sm' : 'w-9 h-9 text-base'}`} style={{ backgroundColor: accent }}>{i + 1}</span>
                    {/* A step with an example sentence (a ✗/✓ line) puts it in a
                        strip under the step's own line; other steps as before. */}
                    <div className={`font-bold text-slate-700 dark:text-slate-200 leading-snug ${isDisplayMode ? 'pt-1 text-[clamp(1.05rem,1.7vw,1.55rem)]' : dense ? 'pt-1 text-[15px] lg:text-base' : 'pt-1 text-[15px] sm:text-base lg:text-lg'} ${hasStrips(text) ? 'flex-1 min-w-0' : ''}`}>
                      {hasStrips(text) ? <StepWithExample text={text} isDisplayMode={isDisplayMode} dense={dense} /> : parseInlineText(text)}
                    </div>
                  </li>
                );
              })}
            </ol>
            {s.notes?.length > 0 && (
              <div className={`space-y-3 ${dense ? 'mt-3' : 'mt-4'}`}>
                {s.notes.map((note, i) => <Note key={i} note={note} lang={lang} isDisplayMode={isDisplayMode} />)}
              </div>
            )}
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
