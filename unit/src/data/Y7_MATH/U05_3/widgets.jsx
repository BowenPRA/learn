// src/data/Y7_MATH/U05_3/widgets.jsx
// Widgets for 5.3 Drawing lines and quadrilaterals, ported from the classroom
// deck (content/y7-math/U05_3: protractor.jsx, story.jsx, parallel.jsx). English
// and French only. Each stage is ONE wide SVG on a white plate (its text scales
// with the panel and reads on a light or dark slide); only the buttons are HTML.
//
//   ProtractorReader  six angles, both sides: say the size, then Show (the 0 to
//                     count from is ringed and the trap is named)
//   FrameStory        Mr Bowen's frame, panels 1–3 one press at a time; panel 4
//                     stays "?" — the slide's predict asks it, slide 8 answers it
//   SetSquareSlide    draw, slide, draw: the same angle each time is parallel;
//                     Turn lifts a corner off the ruler and the angle changes
//
// WHAT CHANGED IN THE PORT
//  · SetSquareSlide's parallel arrows: the classroom calls chevron(x, y, d, INK,
//    15), but lines.js defines chevron(x, y, d, s = 16), so the colour landed in
//    the size and every arrow was a NaN path that never drew. Fixed here:
//    chevron(x, y, d, 15).
//  · FrameStory stops at panel 3 (a student alone would press past the
//    prediction); its 4th panel and the closing question are not drawn.
//  · The classroom Btn registered with the phone remote; this unit's Btn (ui.jsx)
//    does not. Strings go through tr(lang, en, null, fr).
import { useState } from 'react';
import { Eye, ChevronRight, RotateCcw, Undo2, RotateCw } from 'lucide-react';
import { tr } from '../../../utils/lang';
import { Btn } from './ui.jsx';
import { at, f1, sector, chevron } from './lines.js';
import { Protractor } from './protractor.jsx';
import { mrBowenSvg } from './mrBowen.js';

const t = (lang, en, fr) => tr(lang, en, null, fr);
const FONT = "Inter, 'Segoe UI', system-ui, sans-serif";
const INK = '#2b2b2b', KEY = '#c25e12', MUTED = '#5b6770', BLUE = '#1a5fa8', RED = '#c8102e', GREEN_DARK = '#3d731c', PURPLE = '#5c2483';
const ORANGE_T = '#fdf1e3', PURPLE_T = '#f2ecf7';

/* ── Read the Protractor ─────────────────────────────────────────────────── */
// [the angle, the side its first arm points to]
const ANGLES = [[40, 'right'], [120, 'right'], [65, 'left'], [150, 'left'], [90, 'right'], [25, 'left']];
const C = [1010, 452];
const R = 330;
const ARM = 440;

export function ProtractorReader({ lang = 'en' }) {
  const [n, setN] = useState(0);
  const [shown, setShown] = useState(false);
  const [deg, side] = ANGLES[n];
  const dir = side === 'right' ? deg : 180 - deg;
  const [mx, my] = at(C, ARM, dir);
  const [fx, fy] = at(C, ARM, side === 'right' ? 0 : 180);
  const [rx, ry] = at(C, R + 34, dir);
  const [lx, ly] = at([rx, ry], 50, side === 'right' ? dir + 90 : dir - 90);
  const last = ANGLES.length - 1;
  const next = () => { setN((v) => Math.min(last, v + 1)); setShown(false); };
  return (
    <div className="w-full h-full flex flex-col gap-3 select-none">
      <div className="flex-1 min-h-0 w-full">
        <svg viewBox="0 0 1500 520" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
          <rect x="0" y="0" width="1500" height="520" rx="16" fill="#ffffff" />
          <text x="40" y="64" fontFamily={FONT} fontSize="26" fontWeight="800" fill={MUTED}>{t(lang, `Angle ${n + 1} of ${ANGLES.length}`, `Angle ${n + 1} sur ${ANGLES.length}`)}</text>
          <text x="40" y="116" fontFamily={FONT} fontSize="34" fontWeight="900" fill={INK}>{t(lang, 'What size is it?', 'Quelle est sa taille ?')}</text>
          <text x="40" y="236" fontFamily={FONT} fontSize="104" fontWeight="900" fill={shown ? KEY : '#c9d3dc'}>{shown ? `${deg}°` : '?'}</text>
          {shown && (
            <g>
              <text x="40" y="304" fontFamily={FONT} fontSize="27" fontWeight="800" fill={INK}>{t(lang, 'Start at 0 on the line.', 'Pars du 0 sur la droite.')}</text>
              <text x="40" y="344" fontFamily={FONT} fontSize="27" fontWeight="800" fill={INK}>{t(lang, `Count up to ${deg}.`, `Compte jusqu’à ${deg}.`)}</text>
              {deg !== 90 && (
                <text x="40" y="400" fontFamily={FONT} fontSize="24" fontWeight="700" fill={RED}>
                  {t(lang, `Not ${180 - deg}°: that scale starts at 180.`, `Pas ${180 - deg}° : cette échelle part de 180.`)}
                </text>
              )}
              <text x="40" y="452" fontFamily={FONT} fontSize="24" fontWeight="700" fill={MUTED}>
                {deg < 90 ? t(lang, 'Check: less than 90°, so it is acute.', 'Vérifie : moins de 90°, il est aigu.') : deg > 90 ? t(lang, 'Check: more than 90°, so it is obtuse.', 'Vérifie : plus de 90°, il est obtus.') : t(lang, 'Check: a right angle.', 'Vérifie : un angle droit.')}
              </text>
            </g>
          )}
          <Protractor cx={C[0]} cy={C[1]} r={R} ring={shown ? side : null} />
          <line x1={C[0]} y1={C[1]} x2={f1(fx)} y2={f1(fy)} stroke={INK} strokeWidth="6" strokeLinecap="round" />
          <line x1={C[0]} y1={C[1]} x2={f1(mx)} y2={f1(my)} stroke={INK} strokeWidth="6" strokeLinecap="round" />
          <circle cx={C[0]} cy={C[1]} r="7" fill={INK} />
          {shown && <circle cx={f1(rx)} cy={f1(ry)} r="12" fill={KEY} stroke="#ffffff" strokeWidth="3" />}
          {shown && <text x={f1(lx)} y={f1(ly + 12)} fontFamily={FONT} fontSize="34" fontWeight="900" fill={KEY} textAnchor="middle">{deg}°</text>}
          <text x={side === 'right' ? 1440 : 580} y="500" fontFamily={FONT} fontSize="22" fontWeight="700" fill={BLUE} textAnchor={side === 'right' ? 'end' : 'start'}>{t(lang, 'the line', 'la droite')}</text>
        </svg>
      </div>
      <div className="shrink-0 flex items-center justify-center gap-2 flex-wrap">
        <Btn tone="teal" icon={Eye} disabled={shown} onClick={() => setShown(true)}>{t(lang, 'Show the answer', 'Montrer la réponse')}</Btn>
        <Btn tone="orange" icon={ChevronRight} disabled={n === last} onClick={next}>{t(lang, 'Next angle', 'Angle suivant')}</Btn>
        <Btn tone="slate" icon={RotateCcw} disabled={n === 0 && !shown} onClick={() => { setN(0); setShown(false); }}>{t(lang, 'Start again', 'Recommencer')}</Btn>
      </div>
    </div>
  );
}

/* ── Mr Bowen's Frame ────────────────────────────────────────────────────── */
const RULE = '#d5dbe1', WOOD = '#c8955c', WOOD_EDGE = '#8a5d2e', WALL = '#f6f1e7';
const PANEL_W = 380, PANEL_H = 400, TOP = 20;
const px = (i) => 30 + i * (PANEL_W + 20);
const FLOOR = TOP + PANEL_H - 25;
const BOWEN = 0.5;
const SIDE = 150;
const CAPTIONS = [
  [['Mr Bowen makes a square frame.', 'Four sticks. All 40 cm.'], ['M. Bowen fait un cadre carré.', 'Quatre baguettes de 40 cm.']],
  [['He nails the corners.', 'One nail each.'], ['Il cloue les coins.', 'Un clou par coin.']],
  [['He puts in the class photo.', 'It fits. Perfect.'], ['Il met la photo de classe.', 'Elle rentre. Parfait.']],
  [['He picks it up.', 'What happens next?'], ['Il le soulève.', 'Que se passe-t-il ?']],
];
const SHOWN_MAX = 2; // panels 0..2 can be shown; the 4th is the slide's prediction

function MrBowen(props) {
  return <g dangerouslySetInnerHTML={{ __html: mrBowenSvg(props) }} />;
}
function Stick({ a, b }) {
  return (
    <g>
      <line x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke={WOOD_EDGE} strokeWidth="17" strokeLinecap="round" />
      <line x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke={WOOD} strokeWidth="11" strokeLinecap="round" />
    </g>
  );
}
function Frame({ c, nails = false }) {
  return (
    <g>
      <Stick a={c[0]} b={c[1]} /><Stick a={c[1]} b={c[2]} /><Stick a={c[2]} b={c[3]} /><Stick a={c[3]} b={c[0]} />
      {nails && c.map((p, i) => <circle key={i} cx={p[0]} cy={p[1]} r="4.5" fill="#3d4652" />)}
    </g>
  );
}
function Photo({ x, y, w, h }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} fill="#dceefb" stroke={INK} strokeWidth="2" />
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <rect x={x + 10 + i * ((w - 20) / 4)} y={y + h * 0.62} width={(w - 20) / 4 - 6} height={h * 0.38} rx="6" fill={['#1a5fa8', '#c25e12', '#4a8b23', '#5c2483'][i]} />
          <circle cx={x + 10 + i * ((w - 20) / 4) + ((w - 20) / 4 - 6) / 2} cy={y + h * 0.5} r={h * 0.13} fill="#e8b98f" stroke={INK} strokeWidth="1.5" />
        </g>
      ))}
    </g>
  );
}
function Bowen({ x, hammer = false }) {
  const bx = x + 326;
  const by = FLOOR - 268 * BOWEN;
  return (
    <g>
      {hammer && (
        <g>
          <line x1={bx - 46} y1={by + 34} x2={bx - 52} y2={by - 8} stroke="#8a6a3c" strokeWidth="7" strokeLinecap="round" />
          <rect x={bx - 68} y={by - 20} width="32" height="15" rx="3" fill="#59636e" stroke={INK} strokeWidth="2" />
        </g>
      )}
      <MrBowen x={bx} y={by} scale={BOWEN} mood="happy" handLeft={hammer ? [-92, 64] : undefined} />
    </g>
  );
}
const square = (x) => [[x + 60, FLOOR - 30], [x + 60 + SIDE, FLOOR - 30], [x + 60 + SIDE, FLOOR - 30 - SIDE], [x + 60, FLOOR - 30 - SIDE]];
function Sticks({ x }) {
  return (
    <g>
      {[0, 1, 2, 3].map((i) => (
        <g key={i} transform={`rotate(${-10 + i * 3} ${x + 80 + i * 34} ${FLOOR})`}>
          <Stick a={[x + 80 + i * 34, FLOOR - 4]} b={[x + 80 + i * 34, FLOOR - 4 - SIDE]} />
        </g>
      ))}
      <Bowen x={x} hammer />
    </g>
  );
}
const Nailed = ({ x }) => <g><Frame c={square(x)} nails /><Bowen x={x} hammer /></g>;
function WithPhoto({ x }) {
  const c = square(x);
  return <g><Photo x={c[3][0] + 12} y={c[3][1] + 12} w={SIDE - 24} h={SIDE - 24} /><Frame c={c} nails /><Bowen x={x} /></g>;
}
const PANELS = [Sticks, Nailed, WithPhoto];

export function FrameStory({ lang = 'en' }) {
  const [k, setK] = useState(0);
  const L = (pair) => (lang === 'fr' ? pair[1] : pair[0]);
  return (
    <div className="w-full h-full flex flex-col gap-3 select-none">
      <div className="flex-1 min-h-0 w-full">
        <svg viewBox="0 0 1640 510" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
          <rect x="0" y="0" width="1640" height="510" rx="16" fill="#ffffff" />
          <defs>
            {PANELS.map((_, i) => <clipPath key={i} id={`u53-frame-p${i}`}><rect x={px(i)} y={TOP} width={PANEL_W} height={PANEL_H} rx="20" /></clipPath>)}
          </defs>
          {[0, 1, 2, 3].map((i) => {
            const x = px(i);
            const shown = i <= k && i < PANELS.length;
            const Panel = PANELS[i];
            const asking = i === 3 && k === SHOWN_MAX;
            return (
              <g key={i}>
                <rect x={x} y={TOP} width={PANEL_W} height={PANEL_H} rx="20" fill={shown ? WALL : '#f4f6f8'} stroke={shown ? '#c9d3dc' : asking ? KEY : RULE} strokeWidth="3" strokeDasharray={shown ? undefined : '10 8'} />
                {shown ? (
                  <g clipPath={`url(#u53-frame-p${i})`}>
                    <rect x={x} y={FLOOR} width={PANEL_W} height={TOP + PANEL_H - FLOOR} fill="#e4d6c1" />
                    <line x1={x} y1={FLOOR} x2={x + PANEL_W} y2={FLOOR} stroke="#b9a68a" strokeWidth="3" />
                    <Panel x={x} />
                  </g>
                ) : (
                  <text x={x + PANEL_W / 2} y={TOP + 250} fontFamily={FONT} fontSize="150" fontWeight="900" fill={asking ? KEY : RULE} textAnchor="middle">?</text>
                )}
                <circle cx={x + 30} cy={TOP + 30} r="19" fill={shown || asking ? BLUE : RULE} />
                <text x={x + 30} y={TOP + 38} fontFamily={FONT} fontSize="22" fontWeight="900" fill="#ffffff" textAnchor="middle">{i + 1}</text>
                {(shown || asking) && (
                  <g>
                    <text x={x + PANEL_W / 2} y={TOP + PANEL_H + 38} fontFamily={FONT} fontSize="22" fontWeight="900" fill={INK} textAnchor="middle">{L(CAPTIONS[i])[0]}</text>
                    <text x={x + PANEL_W / 2} y={TOP + PANEL_H + 68} fontFamily={FONT} fontSize="22" fontWeight="700" fill={asking ? KEY : INK} textAnchor="middle">{L(CAPTIONS[i])[1]}</text>
                  </g>
                )}
              </g>
            );
          })}
        </svg>
      </div>
      <div className="shrink-0 flex items-center justify-center gap-2 flex-wrap">
        <Btn tone="slate" icon={Undo2} disabled={k === 0} onClick={() => setK((v) => Math.max(0, v - 1))}>{t(lang, 'Back', 'Retour')}</Btn>
        <Btn tone="orange" icon={ChevronRight} disabled={k === SHOWN_MAX} onClick={() => setK((v) => Math.min(SHOWN_MAX, v + 1))}>{t(lang, 'What happens next?', 'Et ensuite ?')}</Btn>
        <Btn tone="teal" icon={RotateCcw} disabled={k === 0} onClick={() => setK(0)}>{t(lang, 'Start again', 'Recommencer')}</Btn>
      </div>
    </div>
  );
}

/* ── Slide the Set Square ────────────────────────────────────────────────── */
const RULER_Y = 430, START = 610, STEP = 150, LEG_UP = 250, LEG_RUN = 144, MAX = 5;
function turn(q, c, d) {
  const r = (d * Math.PI) / 180;
  const dx = q[0] - c[0], dy = q[1] - c[1];
  return [c[0] + dx * Math.cos(r) + dy * Math.sin(r), c[1] - dx * Math.sin(r) + dy * Math.cos(r)];
}

export function SetSquareSlide({ lang = 'en' }) {
  const [lines, setLines] = useState([]);
  const [turned, setTurned] = useState(false);
  const k = lines.length;
  const x0 = START + STEP * k;
  const angle = turned ? 70 : 60;
  const parallel = lines.every(([, a]) => a === lines[0]?.[1]);
  const foot = x0 + LEG_RUN;
  const corner = [foot, RULER_Y];
  // turned 10° clockwise about the foot: the other corner lifts OFF the ruler, never into it
  const spin = (q) => (turned ? turn(q, corner, -10) : q);
  const base = spin([x0, RULER_Y]);
  const top = spin([x0, RULER_Y - LEG_UP]);
  const draw = () => setLines((ls) => [...ls, [foot, angle]]);
  return (
    <div className="w-full h-full flex flex-col gap-3 select-none">
      <div className="flex-1 min-h-0 w-full">
        <svg viewBox="0 0 1500 520" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
          <rect x="0" y="0" width="1500" height="520" rx="16" fill="#ffffff" />
          <text x="40" y="66" fontFamily={FONT} fontSize="26" fontWeight="800" fill={MUTED}>{t(lang, 'Lines drawn', 'Droites tracées')}</text>
          <text x="40" y="140" fontFamily={FONT} fontSize="72" fontWeight="900" fill={INK}>{k}</text>
          {k >= 2 && (
            <g>
              <text x="40" y="216" fontFamily={FONT} fontSize="26" fontWeight="800" fill={MUTED}>{t(lang, 'The lines are', 'Les droites sont')}</text>
              <text x="40" y="268" fontFamily={FONT} fontSize={parallel ? 44 : 36} fontWeight="900" fill={parallel ? GREEN_DARK : RED}>
                {parallel ? t(lang, 'PARALLEL', 'PARALLÈLES') : t(lang, 'NOT PARALLEL', 'PAS PARALLÈLES')}
              </text>
              <text x="40" y="314" fontFamily={FONT} fontSize="24" fontWeight="800" fill={INK}>
                {parallel ? t(lang, 'The same angle each time.', 'Le même angle à chaque fois.') : t(lang, 'The angle changed.', 'L’angle a changé.')}
              </text>
            </g>
          )}
          {lines.map(([fx, a], i) => {
            const end = at([fx, RULER_Y], 420, 180 - a);
            const odd = a !== lines[0][1];
            const [lx, ly] = at([fx, RULER_Y], 66, 180 - a / 2);
            const mid = at([fx, RULER_Y], 300, 180 - a);
            return (
              <g key={i}>
                <line x1={fx} y1={RULER_Y} x2={f1(end[0])} y2={f1(end[1])} stroke={odd ? PURPLE : INK} strokeWidth="5" strokeLinecap="round" />
                <path d={sector([fx, RULER_Y], 40, 180 - a, 180)} fill={odd ? PURPLE_T : ORANGE_T} stroke={odd ? PURPLE : KEY} strokeWidth="2.5" />
                <text x={f1(lx)} y={f1(ly + 8)} fontFamily={FONT} fontSize="23" fontWeight="900" fill={odd ? PURPLE : KEY} textAnchor="middle">{a}°</text>
                {parallel && k >= 2 && <path d={chevron(mid[0], mid[1], 180 - a, 15)} fill="none" stroke={INK} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />}
              </g>
            );
          })}
          <rect x="540" y={RULER_Y} width="930" height="50" rx="6" fill="#fbe7a1" stroke="#c9a227" strokeWidth="2" />
          {Array.from({ length: 47 }, (_, i) => (
            <line key={i} x1={560 + i * 19.6} y1={RULER_Y} x2={560 + i * 19.6} y2={RULER_Y + (i % 5 === 0 ? 18 : 10)} stroke="#8a6d12" strokeWidth={i % 5 === 0 ? 2 : 1} />
          ))}
          <text x="1460" y={RULER_Y + 40} fontFamily={FONT} fontSize="18" fontWeight="800" fill="#6b5410" textAnchor="end">{t(lang, 'ruler: it does not move', 'règle : elle ne bouge pas')}</text>
          {k < MAX && (
            <g>
              <path d={`M ${f1(base[0])} ${f1(base[1])} L ${f1(corner[0])} ${f1(corner[1])} L ${f1(top[0])} ${f1(top[1])} Z`}
                fill="#bfe0f2" fillOpacity="0.72" stroke="#3f7fa6" strokeWidth="3" strokeLinejoin="round" />
              <line x1={f1(corner[0])} y1={f1(corner[1])} x2={f1(top[0])} y2={f1(top[1])} stroke={KEY} strokeWidth="5" strokeDasharray="10 8" />
              <text x={f1((corner[0] + top[0]) / 2 + 22)} y={f1((corner[1] + top[1]) / 2)} fontFamily={FONT} fontSize="20" fontWeight="800" fill={KEY}>{t(lang, 'draw here', 'trace ici')}</text>
            </g>
          )}
        </svg>
      </div>
      <div className="shrink-0 flex items-center justify-center gap-2 flex-wrap">
        <Btn tone="orange" icon={ChevronRight} disabled={k >= MAX} onClick={draw}>{t(lang, 'Draw, then slide', 'Trace, puis glisse')}</Btn>
        <Btn tone="purple" icon={RotateCw} disabled={k >= MAX} onClick={() => setTurned((v) => !v)}>
          {turned ? t(lang, 'Put it back on the ruler', 'Remets-la sur la règle') : t(lang, 'Turn the set square', 'Tourne l’équerre')}
        </Btn>
        <Btn tone="slate" icon={RotateCcw} disabled={k === 0 && !turned} onClick={() => { setLines([]); setTurned(false); }}>{t(lang, 'Start again', 'Recommencer')}</Btn>
      </div>
    </div>
  );
}
