// Big centered statement / definition on a theme canvas (not full-color, so it
// stays crisp in dark mode). One large idea, an optional label chip, an accent
// bar, optional supporting line, reveal, and secondary note cards.
import { Note, Reveal, Pill, Ic } from './primitives.jsx';
import { parseInlineText, renderContent, toHex } from './helpers.jsx';

export default function StatementLayout({ slide: s, ctx }) {
  const { pick, lang, isDisplayMode } = ctx;
  const accent = toHex(s.accent || s.color, '#3b82f6');
  const eyebrow = pick(s.eyebrow, s.eyebrowVn, s.eyebrowFr);
  const title = pick(s.title, s.titleVn, s.titleFr);
  const text = pick(s.text ?? s.content, s.textVn ?? s.contentVn, s.textFr ?? s.contentFr);
  const sub = pick(s.sub, s.subVn, s.subFr);
  const label = pick(s.label, s.labelVn, s.labelFr);

  return (
    // Centred via the child's `my-auto`, so a statement taller than the card
    // scrolls from its top instead of losing its eyebrow above the fold.
    <div className={`flex-1 flex flex-col items-center overflow-y-auto custom-scrollbar bg-slate-50 dark:bg-slate-900 min-h-0 ${isDisplayMode ? 'p-[clamp(2rem,5vw,5rem)]' : 'p-4 sm:p-6 lg:p-8'}`}>
      <div className="w-full max-w-4xl mx-auto my-auto flex flex-col items-center text-center gap-4 sm:gap-5">
        {eyebrow && <Pill accent={accent} isDisplayMode={isDisplayMode}>{eyebrow}</Pill>}

        {s.icon && (
          <div className="rounded-2xl flex items-center justify-center shadow-inner" style={{ backgroundColor: `${accent}1a`, padding: isDisplayMode ? '1rem' : '0.85rem' }}>
            <Ic name={s.icon} className={isDisplayMode ? 'w-12 h-12' : 'w-9 h-9'} strokeWidth={2.5} style={{ color: accent }} />
          </div>
        )}

        {title && (
          <h2 className={`font-black tracking-tight text-slate-800 dark:text-slate-100 ${isDisplayMode ? 'text-[clamp(1.5rem,3vw,3rem)]' : 'text-2xl lg:text-4xl'}`}>{title}</h2>
        )}

        <div className="relative w-full rounded-[1.75rem] bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 shadow-sm"
          style={{ borderLeftWidth: 8, borderLeftColor: accent }}>
          <div className={isDisplayMode ? 'p-[clamp(1.75rem,3.5vw,3.5rem)]' : 'p-5 sm:p-8'}>
            {label && (
              <div className={`inline-flex items-center gap-1.5 rounded-full text-white font-black uppercase tracking-widest mb-4 shadow-sm ${isDisplayMode ? 'text-[clamp(0.65rem,1vw,1rem)] px-4 py-1.5' : 'text-[10px] sm:text-xs px-3 py-1'}`} style={{ backgroundColor: accent }}>
                <Ic name={s.labelIcon || 'Pencil'} className={isDisplayMode ? 'w-4 h-4' : 'w-3.5 h-3.5'} strokeWidth={3} />
                {label}
              </div>
            )}
            {/* A KaTeX run never wraps, so on a phone a statement like
                y = (x−1)(x−2)(x−3) ran off the card; one size down, and the
                box scrolls sideways rather than clipping in the last resort.
                The KaTeX runs are inline-block so a tall fraction (F = mv²/r)
                grows the line box instead of overflowing it — otherwise the
                sideways scroll container sprouts a vertical scrollbar too. */}
            <p className={`font-black text-slate-900 dark:text-slate-50 leading-tight tracking-tight overflow-x-auto overflow-y-hidden pb-3 [&_.katex]:inline-block [&_.katex]:align-middle ${isDisplayMode ? 'text-[clamp(1.75rem,4vw,4rem)]' : 'text-2xl sm:text-3xl lg:text-4xl'}`}>
              {parseInlineText(text)}
            </p>
            {sub && (
              <p className={`mt-5 font-bold text-slate-500 dark:text-slate-400 leading-snug ${isDisplayMode ? 'text-[clamp(1.1rem,1.9vw,1.7rem)]' : 'text-lg lg:text-2xl'}`}>{parseInlineText(sub)}</p>
            )}
          </div>
        </div>

        {s.content && s.text && (
          <div className="w-full text-left max-w-3xl">{renderContent(pick(s.content, s.contentVn, s.contentFr), { isDisplayMode })}</div>
        )}

        {s.reveal && <div className="w-full max-w-3xl"><Reveal reveal={s.reveal} lang={lang} accent={accent} isDisplayMode={isDisplayMode} /></div>}

        {s.notes?.length > 0 && (
          <div className="w-full max-w-3xl space-y-3 text-left">
            {s.notes.map((note, i) => <Note key={i} note={note} lang={lang} isDisplayMode={isDisplayMode} />)}
          </div>
        )}
      </div>
    </div>
  );
}
