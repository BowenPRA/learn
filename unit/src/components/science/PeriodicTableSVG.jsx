import React, { useCallback, useState } from 'react';
import { FIRST_20, TABLE, BLANK_CELLS, tilePos, colX, rowY } from '../../utils/elements.js';
import { tr } from '../../utils/lang.js';

/**
 * The book's first-20 Periodic Table (Science 2.5, p.54), tappable. Drawn from
 * the one layout in utils/elements.js, so the table a student taps is the table
 * they are marked against. Used by the Element Hunt task and the `periodic`
 * Notes activity.
 *
 * Props
 *   highlight      { [sym]: 'good' | 'bad' | 'pick' | 'focus' }
 *                  good (green: right), bad (red: a wrong tap) and pick (blue:
 *                  selected, not yet checked) recolour the tile; focus keeps
 *                  the tile's own colour and adds the heavy orange outline of
 *                  the classroom table — "look here": a target the student
 *                  missed, or the element a question is about.
 *   onTap(sym)     tiles become buttons (mouse, touch, Enter/Space)
 *   showNames      the element name under the symbol (default true). Names are
 *                  also dropped automatically when the table is drawn narrower
 *                  than NARROW_PX, where they would be unreadably small.
 *   colourByMetal  yellow metals, blue non-metals (default true); false = plain white
 *   lang           'en' | 'vn' | 'fr' — which name the tiles show
 *   disabled       tiles stop responding
 *   masked         [sym] — these tiles show "?" instead of their symbol
 *   bands          [{ period } | { group }] — a dashed outline round a row or column
 *   label          aria-label for the whole table
 *
 * The drawing opens with a white plate, so it reads the same in dark mode.
 */

const FONT = "Inter, 'Segoe UI', system-ui, sans-serif";
const INK = '#2b2b2b';
const MUTED = '#5b6770';
const KEY = '#c25e12';
const METAL = { fill: '#fbe7a1', stroke: '#b8912a' };
const NONMETAL = { fill: '#cfe5f5', stroke: '#4f8fbf' };
const PLAIN = { fill: '#ffffff', stroke: '#8a979e' };
const MARKS = {
  good: { fill: '#d7ffb8', stroke: '#58a700', text: '#2f5f00' },
  bad: { fill: '#ffdfe0', stroke: '#ea2b2b', text: '#a32d23' },
  pick: { fill: '#ddf4ff', stroke: '#1cb0f6', text: '#0b5d87' },
  focus: { stroke: KEY },
};
const NARROW_PX = 560;

const { X0, CW, CH } = TABLE;
const RIGHT = colX(8) + CW;
// The book leaves period 4 empty after calcium: the ten narrow cells
// (BLANK_CELLS) and the six wide ones under groups 3–8.
const BLANKS = [...BLANK_CELLS, ...[3, 4, 5, 6, 7, 8].map((g) => ({ x: colX(g), y: rowY(4), w: CW }))];

function bandRect(b) {
  if (b?.period != null) return { x: X0 - 8, y: rowY(b.period) - 8, w: RIGHT - X0 + 16, h: CH + 16 };
  if (b?.group != null) {
    const top = b.group === 8 ? 1 : 2;
    return { x: colX(b.group) - 8, y: rowY(top) - 8, w: CW + 16, h: (5 - top) * CH + 16 };
  }
  return null;
}

export default function PeriodicTableSVG({
  highlight = {},
  onTap,
  showNames = true,
  colourByMetal = true,
  lang = 'en',
  disabled = false,
  masked = [],
  bands = [],
  label,
  className = '',
}) {
  // Measured width → are the names big enough to read? Set from the observer's
  // callback, never during render or in an effect body.
  const [narrow, setNarrow] = useState(false);
  const measure = useCallback((node) => {
    if (!node || typeof ResizeObserver === 'undefined') return undefined;
    const ro = new ResizeObserver((entries) => {
      const w = entries[0]?.contentRect?.width || 0;
      if (w) setNarrow(w < NARROW_PX);
    });
    ro.observe(node);
    return () => ro.disconnect();
  }, []);

  const names = showNames && !narrow;
  const tappable = typeof onTap === 'function' && !disabled;
  const outlined = FIRST_20.filter((el) => MARKS[highlight[el.sym]]);

  return (
    <div ref={measure} className={`w-full ${className}`}>
      <svg viewBox={`0 0 ${TABLE.W} ${TABLE.H}`} className="block w-full h-auto select-none touch-manipulation" role="group" aria-label={label}>
        <rect x="0" y="0" width={TABLE.W} height={TABLE.H} rx="14" fill="#ffffff" />

        {BLANKS.map((b, i) => (
          <rect key={`blank${i}`} x={b.x} y={b.y} width={b.w} height={CH} fill="#ffffff" stroke="#c9d1d6" strokeWidth="1.5" />
        ))}

        {FIRST_20.map((el) => {
          const { x, y } = tilePos(el);
          const mark = highlight[el.sym];
          const base = colourByMetal ? (el.metal ? METAL : NONMETAL) : PLAIN;
          const m = MARKS[mark] || {};
          const fill = m.fill || base.fill;
          const text = m.text || INK;
          const hidden = masked.includes(el.sym);
          const name = tr(lang, el.en, el.vn, el.fr);
          const tap = () => onTap(el.sym);
          return (
            <g
              key={el.sym}
              role={tappable ? 'button' : undefined}
              tabIndex={tappable ? 0 : undefined}
              aria-label={tappable ? (showNames ? `${el.sym}, ${name}` : el.sym) : undefined}
              aria-pressed={tappable ? mark === 'pick' : undefined}
              onClick={tappable ? tap : undefined}
              onKeyDown={tappable ? (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); tap(); } } : undefined}
              className={tappable ? 'cursor-pointer outline-none [@media(hover:hover)]:[&:hover>.tile]:opacity-75 [&:focus-visible>.ring]:opacity-100' : undefined}
            >
              <rect className="tile" x={x} y={y} width={CW} height={CH} fill={fill} stroke={mark && mark !== 'focus' ? m.stroke : base.stroke} strokeWidth="1.5" />
              {names ? (
                <>
                  <text x={x + CW / 2} y={y + 47} fontFamily={FONT} fontSize="34" fontWeight="bold" fill={hidden ? '#9aa5ae' : text} textAnchor="middle" pointerEvents="none">{hidden ? '?' : el.sym}</text>
                  <text x={x + CW / 2} y={y + 72} fontFamily={FONT} fontSize="13.5" fill={m.text || MUTED} textAnchor="middle" pointerEvents="none">{name}</text>
                </>
              ) : (
                <text x={x + CW / 2} y={y + 58} fontFamily={FONT} fontSize="42" fontWeight="bold" fill={hidden ? '#9aa5ae' : text} textAnchor="middle" pointerEvents="none">{hidden ? '?' : el.sym}</text>
              )}
              {tappable && <rect className="ring opacity-0" x={x + 4} y={y + 4} width={CW - 8} height={CH - 8} rx="6" fill="none" stroke="#1cb0f6" strokeWidth="4" strokeDasharray="8 5" pointerEvents="none" />}
            </g>
          );
        })}

        {/* Heavy outlines on top, so a neighbour's edge never covers them. */}
        {outlined.map((el) => {
          const { x, y } = tilePos(el);
          return <rect key={`o${el.sym}`} x={x + 2.5} y={y + 2.5} width={CW - 5} height={CH - 5} fill="none" stroke={MARKS[highlight[el.sym]].stroke} strokeWidth="5" pointerEvents="none" />;
        })}

        {bands.map(bandRect).filter(Boolean).map((b, i) => (
          <rect key={`band${i}`} x={b.x} y={b.y} width={b.w} height={b.h} rx="12" fill="none" stroke={KEY} strokeWidth="3" strokeDasharray="10 7" pointerEvents="none" />
        ))}
      </svg>
    </div>
  );
}
