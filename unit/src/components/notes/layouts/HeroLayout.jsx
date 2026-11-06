// Full-color hero: openers and closers. Big centered title with an optional
// brand pill, unit eyebrow, date, icon, subtitle/objective, and a white callout
// card (starter task / warm-up / exit question). Generalizes intro + summary.
import { Ic, Reveal } from './primitives.jsx';
import { parseInlineText, toHex } from './helpers.jsx';
import { tr } from '../../../utils/lang';

export default function HeroLayout({ slide: s, ctx }) {
  const { pick, lang, isDisplayMode } = ctx;
  const accent = toHex(s.accent || s.color, '#0087a8');
  // Always paint the background inline from the parsed hex, so it can't break
  // silently (white text on white) if Tailwind never scanned an arbitrary class.
  const bgStyle = { backgroundColor: toHex(s.color || s.accent, accent) };
  const title = pick(s.title, s.titleVn, s.titleFr);
  const subtitle = pick(s.subtitle, s.subtitleVn, s.subtitleFr);
  const objective = pick(s.objective, s.objectiveVn, s.objectiveFr);
  const brand = pick(s.brand, s.brandVn, s.brandFr);
  const eyebrow = pick(s.eyebrow, s.eyebrowVn, s.eyebrowFr);
  const card = s.card || (s.warmUp ? { text: s.warmUp, textVn: s.warmUpVn, textFr: s.warmUpFr, icon: 'Pencil', badge: tr(lang, 'Warm-Up · Do this now in your book', 'Khởi động · Làm ngay vào vở', 'Échauffement · À faire tout de suite dans ton cahier') } : null);
  const cardText = card ? pick(card.text, card.textVn, card.textFr) : null;
  const cardBadge = card ? pick(card.badge, card.badgeVn, card.badgeFr) : null;

  // Both surfaces on a hero are a FIXED colour that does not follow the theme:
  // the callout card is always white, the field behind the title is always the
  // hero colour. So the emphasis colour has to be pinned to the surface.
  const STRONG_ON_CARD = 'font-black text-slate-900';
  const STRONG_ON_FIELD = 'font-black text-white underline decoration-white/40 underline-offset-4';

  return (
    // The content is centred with an inner `my-auto`, not `justify-center`:
    // a centred flex child that outgrows a scroll box is clipped at the TOP,
    // which is where the icon and the unit line sat on a laptop screen.
    <div className="flex-1 flex flex-col text-center text-white overflow-y-auto custom-scrollbar min-h-0 p-6 sm:p-8 lg:p-10" style={bgStyle}>
    <div className="my-auto w-full flex flex-col items-center">
      {(brand || s.date) && (
        <div className={`flex items-center justify-center gap-2 flex-wrap ${isDisplayMode ? 'mb-5' : 'mb-4'}`}>
          {brand && (
            <span className={`inline-block bg-white/20 text-white font-black uppercase tracking-[0.2em] rounded-full border border-white/30 shadow-inner ${isDisplayMode ? 'text-[clamp(0.75rem,1.1vw,1.1rem)] px-5 py-2' : 'text-[10px] sm:text-xs px-4 py-1.5'}`}>{brand}</span>
          )}
          {s.date && (
            <span className={`inline-block bg-white/10 text-white/90 font-bold tracking-wide rounded-full border border-white/20 ${isDisplayMode ? 'text-[clamp(0.75rem,1.1vw,1.1rem)] px-5 py-2' : 'text-[10px] sm:text-xs px-4 py-1.5'}`}>{s.date}</span>
          )}
        </div>
      )}

      <div className={`bg-white/20 mx-auto rounded-[2rem] flex items-center justify-center shadow-inner border-4 border-white/30 ${isDisplayMode ? 'w-32 h-32 mb-8' : 'w-20 h-20 mb-5 sm:mb-6'}`}>
        <Ic name={s.icon || 'BookOpen'} className={isDisplayMode ? 'w-16 h-16' : 'w-10 h-10'} strokeWidth={2.5} />
      </div>

      {eyebrow && (
        <div className={`inline-block bg-white/20 text-white font-black uppercase tracking-[0.2em] rounded-full mb-4 border border-white/30 shadow-inner ${isDisplayMode ? 'text-[clamp(0.9rem,1.4vw,1.4rem)] px-6 py-2' : 'text-[11px] sm:text-xs px-4 py-1.5'}`}>{eyebrow}</div>
      )}

      <h1 className={`font-black tracking-tight mb-5 drop-shadow-md leading-tight ${isDisplayMode ? 'text-[clamp(3rem,6vw,7rem)]' : 'text-3xl sm:text-4xl lg:text-5xl'}`}>{title || 'Introduction'}</h1>

      {objective ? (
        <div className={`bg-white/15 backdrop-blur-sm rounded-2xl border-2 border-white/25 shadow-inner max-w-3xl mx-auto ${isDisplayMode ? 'px-8 py-6' : 'px-5 py-4'}`}>
          <div className={`font-black uppercase tracking-[0.2em] opacity-80 mb-1.5 ${isDisplayMode ? 'text-[clamp(0.8rem,1.1vw,1.1rem)]' : 'text-[10px] sm:text-xs'}`}>{tr(lang, 'Objective', 'Mục tiêu', 'Objectif')}</div>
          <p className={`font-bold opacity-95 drop-shadow-sm leading-snug ${isDisplayMode ? 'text-[clamp(1.4rem,2.6vw,2.6rem)]' : 'text-lg lg:text-2xl'}`}>{objective}</p>
        </div>
      ) : subtitle ? (
        <p className={`font-bold opacity-90 drop-shadow-sm max-w-4xl mx-auto ${isDisplayMode ? 'text-[clamp(1.5rem,3vw,3rem)]' : 'text-xl lg:text-2xl'}`}>{parseInlineText(subtitle, { strongClass: STRONG_ON_FIELD })}</p>
      ) : null}

      {cardText && (
        <div className={`bg-white rounded-2xl shadow-xl border-2 border-white/60 text-left max-w-3xl mx-auto ${isDisplayMode ? 'mt-8 px-8 py-6' : 'mt-6 px-5 py-4'}`}>
          <div className={`flex items-center gap-2 font-black uppercase tracking-[0.15em] mb-2 ${isDisplayMode ? 'text-[clamp(0.8rem,1.1vw,1.15rem)]' : 'text-[11px] sm:text-xs'}`} style={{ color: accent }}>
            <Ic name={card.icon || 'Pencil'} className={isDisplayMode ? 'w-5 h-5' : 'w-4 h-4'} strokeWidth={3} />
            {cardBadge || tr(lang, 'Task', 'Nhiệm vụ', 'Activité')}
          </div>
          <div className={`font-bold text-slate-800 leading-snug ${isDisplayMode ? 'text-[clamp(1.3rem,2.4vw,2.4rem)]' : 'text-lg lg:text-2xl'}`}>{parseInlineText(cardText, { strongClass: STRONG_ON_CARD })}</div>
        </div>
      )}

      {s.reveal && (
        <div className="mt-6 max-w-3xl mx-auto w-full">
          <Reveal reveal={s.reveal} lang={lang} accent="#0f172a" isDisplayMode={isDisplayMode} />
        </div>
      )}
    </div>
    </div>
  );
}
