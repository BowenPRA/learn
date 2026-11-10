import { useState } from 'react'

// Cambridge palette, matching the deck's note cards and diagrams.
const TEAL = '#0087a8'
const PURPLE = '#5c2483'
const ORANGE = '#c25e12'
const GREEN = '#4a8b23'
const INK = '#2b2b2b'

/* ============================================================= *
 * WIDGET 1 — THE MAGNIFICATION CALCULATOR
 *
 * One job: show the soda-can calculation one step at a time, in
 * numbers big enough to read from the back of the room. The
 * teacher presses "Next step" as the class works it out on paper;
 * nothing is revealed early and there is nothing to fiddle with.
 * ============================================================= */
const STEPS = [
  {
    label: 'Step 1 — how big is a cell?',
    lines: [['A typical human cell', '0.02 mm'], ['A soda can', '120 mm']],
    note: 'Both measured the same way, in millimetres.',
  },
  {
    label: 'Step 2 — how many times bigger?',
    sum: '120 ÷ 0.02 = 6000',
    lines: [['Scale factor', '6000×']],
    note: 'The cell has to be magnified 6000 times to become a can.',
  },
  {
    label: 'Step 3 — magnify Mr Bowen by the same amount',
    sum: '178 cm × 6000 = 1 068 000 cm',
    lines: [['Mr Bowen, magnified', '10.68 km']],
    note: '1 068 000 cm = 10 680 m = 10.68 km.',
  },
  {
    label: 'Step 4 — is that big?',
    lines: [['Mr Bowen, magnified', '10.68 km'], ['Mount Everest', '8.85 km']],
    note: 'He would stand 1.83 km taller than Everest.',
    compare: true,
  },
]

export const ScaleChallengeWidget = () => {
  const [step, setStep] = useState(0)
  const cur = STEPS[step]
  const last = step === STEPS.length - 1

  return (
    <div className="w-full h-full flex flex-col select-none">
      <div className="flex-1 min-h-[220px] w-full bg-white dark:bg-slate-900 rounded-2xl border-2 border-slate-200 dark:border-slate-700 shadow-inner flex flex-col p-4 sm:p-6 overflow-y-auto custom-scrollbar">
        <div className="text-xs sm:text-sm font-black uppercase tracking-[0.15em] mb-4" style={{ color: TEAL }}>
          {cur.label}
        </div>

        {cur.sum && (
          <div className="font-mono font-black text-center rounded-xl py-2.5 px-3 mb-4 text-lg sm:text-2xl"
            style={{ color: ORANGE, backgroundColor: `${ORANGE}12` }}>
            {cur.sum}
          </div>
        )}

        <div className="space-y-2.5">
          {cur.lines.map(([name, value], i) => (
            <div key={i} className="flex items-baseline justify-between gap-3 border-b-2 border-dashed border-slate-200 dark:border-slate-700 pb-2">
              <span className="font-bold text-slate-600 dark:text-slate-300 text-sm sm:text-base">{name}</span>
              <span className="font-mono font-black text-xl sm:text-3xl tabular-nums" style={{ color: PURPLE }}>{value}</span>
            </div>
          ))}
        </div>

        {cur.compare && (
          <div className="flex-1 flex items-end justify-center gap-8 sm:gap-12 mt-5 min-h-[110px]">
            {[['Mr Bowen', 10.68, GREEN], ['Everest', 8.85, '#94a3b8']].map(([name, km, colour]) => (
              <div key={name} className="flex flex-col items-center justify-end h-full">
                <span className="font-mono font-black text-xs sm:text-sm mb-1" style={{ color: colour }}>{km} km</span>
                <div className="w-12 sm:w-16 rounded-t-md transition-all duration-500"
                  style={{ height: `${(km / 10.68) * 100}%`, backgroundColor: colour }} />
                <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 mt-1.5">{name}</span>
              </div>
            ))}
          </div>
        )}

        <p className="mt-4 text-[13px] sm:text-base font-semibold text-slate-500 dark:text-slate-400 leading-snug">{cur.note}</p>
      </div>

      <div className="w-full flex items-center gap-2 mt-2 flex-shrink-0">
        <button
          onClick={() => setStep((n) => Math.max(0, n - 1))}
          disabled={step === 0}
          className="px-4 py-3 rounded-xl font-black text-sm uppercase tracking-widest border-2 border-slate-200 dark:border-slate-700 text-slate-500 disabled:opacity-30 active:scale-95 transition-all">
          Back
        </button>
        <button
          onClick={() => setStep((n) => Math.min(STEPS.length - 1, n + 1))}
          disabled={last}
          className="flex-1 py-3 rounded-xl font-black text-sm uppercase tracking-widest text-white disabled:opacity-40 active:scale-95 transition-all"
          style={{ backgroundColor: last ? GREEN : TEAL }}>
          {last ? 'That is the whole calculation' : 'Next step'}
        </button>
        <span className="w-14 text-center font-mono font-black text-slate-400 tabular-nums">{step + 1}/{STEPS.length}</span>
      </div>
    </div>
  )
}

/* ============================================================= *
 * WIDGET 2 — CELL EXPLORER
 * Toggle animal / plant, then tap an organelle to reveal its job.
 * The selected part is unmissable: everything else drops to a
 * flat grey, the chosen part keeps its full colour, gains a heavy
 * outline and a coloured halo, and is named on the picture.
 * ============================================================= */
const WALL_F = '#f9dcc4', WALL_S = '#e07b39'
const CYTO_F = '#eaf0f8'
const VAC_F = '#dbeafe', VAC_S = '#7ba7d4'
const NUC_F = '#9b7fc4', NUC_S = '#6f52a0'
const CHL_F = '#5aab4e', CHL_S = '#3a7d31'
const AMEM_S = '#c2185b'
const GREY_F = '#eef1f4', GREY_S = '#c3ccd6'

const ORGANELLES = {
  membrane: { name: 'Cell membrane', color: AMEM_S, job: 'A thin, flexible layer that controls what goes in and out of the cell.', both: true },
  cytoplasm: { name: 'Cytoplasm', color: TEAL, job: 'A clear, jelly-like substance where the cell’s chemical reactions happen.', both: true },
  nucleus: { name: 'Nucleus', color: NUC_S, job: 'The control centre — the “boss” that manages all the cell’s activities.', both: true },
  mitochondria: { name: 'Mitochondria', color: '#8a5a2b', job: 'Where energy is released from food. The powerhouse of the cell.', both: true },
  wall: { name: 'Cell wall', color: WALL_S, job: 'A strong, stiff outer layer made of cellulose that holds the plant cell in shape.', plant: true },
  chloroplast: { name: 'Chloroplast', color: CHL_S, job: 'Green structures where the plant makes its food from sunlight, using chlorophyll.', plant: true },
  vacuole: { name: 'Sap vacuole', color: VAC_S, job: 'A large space of cell sap — sugar and water — that helps keep the cell firm.', plant: true },
}

const PLANT_CHLOROPLASTS = [[84, 62], [84, 104], [216, 62], [216, 112], [216, 160]]
const ANIMAL_MITOS = [[74, 152], [226, 62], [222, 148]]

export const CellExplorerWidget = () => {
  const [mode, setMode] = useState('plant') // 'plant' | 'animal'
  const [sel, setSel] = useState('nucleus')

  const keys = Object.keys(ORGANELLES).filter((k) => (mode === 'plant' ? (ORGANELLES[k].both || ORGANELLES[k].plant) : ORGANELLES[k].both))
  const active = keys.includes(sel) ? sel : 'nucleus'
  const cur = ORGANELLES[active]
  const on = (k) => active === k
  // Selected keeps its real colour; everything else goes flat grey.
  const fill = (k, colour) => (on(k) ? colour : GREY_F)
  const line = (k, colour) => (on(k) ? colour : GREY_S)
  const wide = (k, base, hot) => (on(k) ? hot : base)

  return (
    <div className="w-full h-full flex flex-col select-none">
      <div className="flex-1 min-h-[210px] w-full bg-white dark:bg-slate-900 rounded-2xl border-2 border-slate-200 dark:border-slate-700 shadow-inner relative flex flex-col p-3 sm:p-4 overflow-hidden">
        {/* mode toggle */}
        <div className="flex items-center justify-center gap-1.5 mb-2">
          {['plant', 'animal'].map((m) => (
            <button key={m} onClick={() => setMode(m)}
              className="px-4 py-1.5 rounded-lg font-black text-xs uppercase tracking-widest border-2 transition-all"
              style={mode === m
                ? { backgroundColor: m === 'plant' ? CHL_S : AMEM_S, borderColor: m === 'plant' ? CHL_S : AMEM_S, color: '#fff' }
                : { backgroundColor: 'transparent', borderColor: '#cbd5e1', color: '#64748b' }}>
              {m === 'plant' ? '🌱 Plant' : '🐾 Animal'}
            </button>
          ))}
        </div>

        {/* cell picture — always drawn on white so it reads in dark mode too */}
        <div className="flex-1 min-h-0 flex items-center justify-center">
          <svg viewBox="0 0 300 220" className="w-full h-full max-h-[250px]">
            <rect x="0" y="0" width="300" height="220" rx="12" fill="#ffffff" />
            {mode === 'plant' ? (
              <g>
                {on('wall') && <rect x="42" y="12" width="216" height="196" rx="30" fill="none" stroke={WALL_S} strokeWidth="10" opacity="0.28" />}
                <rect x="52" y="22" width="196" height="176" rx="22" fill={fill('wall', WALL_F)} stroke={line('wall', WALL_S)} strokeWidth={wide('wall', 3, 7)} />
                {on('membrane') && <rect x="57" y="27" width="186" height="166" rx="20" fill="none" stroke={AMEM_S} strokeWidth="9" opacity="0.28" />}
                <rect x="61" y="31" width="178" height="158" rx="16" fill={on('cytoplasm') ? `${TEAL}33` : CYTO_F} stroke={line('membrane', AMEM_S)} strokeWidth={wide('membrane', 2, 6)} />
                {on('vacuole') && <rect x="99" y="53" width="102" height="114" rx="30" fill="none" stroke={VAC_S} strokeWidth="9" opacity="0.3" />}
                <rect x="104" y="58" width="92" height="104" rx="26" fill={fill('vacuole', VAC_F)} stroke={line('vacuole', VAC_S)} strokeWidth={wide('vacuole', 2, 6)} />
                {PLANT_CHLOROPLASTS.map(([x, y], i) => (
                  <g key={i}>
                    {on('chloroplast') && <ellipse cx={x} cy={y} rx="16" ry="22" fill={CHL_S} opacity="0.25" />}
                    <ellipse cx={x} cy={y} rx="11" ry="17" fill={fill('chloroplast', CHL_F)} stroke={line('chloroplast', CHL_S)} strokeWidth={wide('chloroplast', 2, 4)} />
                  </g>
                ))}
                {on('nucleus') && <ellipse cx="86" cy="142" rx="26" ry="31" fill={NUC_S} opacity="0.25" />}
                <ellipse cx="86" cy="142" rx="19" ry="24" fill={fill('nucleus', NUC_F)} stroke={line('nucleus', NUC_S)} strokeWidth={wide('nucleus', 2, 5)} />
                {on('mitochondria') && <ellipse cx="140" cy="180" rx="21" ry="15" fill="#8a5a2b" opacity="0.22" />}
                <ellipse cx="140" cy="180" rx="15" ry="9" fill="#ffffff" stroke={on('mitochondria') ? INK : GREY_S} strokeWidth={wide('mitochondria', 2, 4)} />
                <path d="M 128 180 q 6 -7 12 0 q 6 7 12 0" fill="none" stroke={on('mitochondria') ? INK : GREY_S} strokeWidth="1.5" />
              </g>
            ) : (
              <g>
                {on('membrane') && <ellipse cx="150" cy="110" rx="123" ry="87" fill="none" stroke={AMEM_S} strokeWidth="10" opacity="0.26" />}
                <ellipse cx="150" cy="110" rx="118" ry="82" fill={on('cytoplasm') ? `${TEAL}33` : CYTO_F} stroke={line('membrane', AMEM_S)} strokeWidth={wide('membrane', 3, 7)} />
                {on('nucleus') && <circle cx="160" cy="100" r="39" fill={NUC_S} opacity="0.25" />}
                <circle cx="160" cy="100" r="32" fill={fill('nucleus', NUC_F)} stroke={line('nucleus', NUC_S)} strokeWidth={wide('nucleus', 2, 6)} />
                <circle cx="170" cy="90" r="10" fill={on('nucleus') ? NUC_S : GREY_S} />
                {ANIMAL_MITOS.map(([x, y], i) => (
                  <g key={i}>
                    {on('mitochondria') && <ellipse cx={x} cy={y} rx="24" ry="17" fill="#8a5a2b" opacity="0.22" />}
                    <ellipse cx={x} cy={y} rx="17" ry="10" fill="#ffffff" stroke={on('mitochondria') ? INK : GREY_S} strokeWidth={wide('mitochondria', 2, 4)} />
                    <path d={`M ${x - 13} ${y} q 6.5 -8 13 0 q 6.5 8 13 0`} fill="none" stroke={on('mitochondria') ? INK : GREY_S} strokeWidth="1.5" />
                  </g>
                ))}
              </g>
            )}
            {/* name the selected part right on the picture */}
            <text x="150" y="212" fontFamily="Inter, 'Segoe UI', sans-serif" fontSize="14" fontWeight="bold"
              fill={cur.color} textAnchor="middle">{cur.name}</text>
          </svg>
        </div>

        {/* detail */}
        <div className="rounded-xl border-2 shadow-sm p-2.5 sm:p-3 bg-white dark:bg-slate-800" style={{ borderColor: cur.color }}>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: cur.color }} />
            <span className="font-black text-sm sm:text-base" style={{ color: cur.color }}>{cur.name}</span>
            {cur.plant && (
              <span className="ml-auto text-[9px] font-black uppercase tracking-widest text-white rounded-full px-2 py-0.5" style={{ backgroundColor: CHL_S }}>Plant only</span>
            )}
          </div>
          <p className="mt-1 text-[13px] sm:text-sm font-semibold text-slate-700 dark:text-slate-200 leading-snug">{cur.job}</p>
        </div>
      </div>

      {/* organelle chips */}
      <div className="w-full bg-white dark:bg-slate-800 p-2.5 sm:p-3 rounded-2xl shadow-sm border-2 border-slate-200 dark:border-slate-700 mt-2 flex-shrink-0">
        <div className="flex flex-wrap gap-1.5 justify-center">
          {keys.map((k) => (
            <button key={k} onClick={() => setSel(k)}
              className="px-3 py-1.5 rounded-lg font-black text-[11px] sm:text-xs border-2 transition-all active:scale-95"
              style={on(k)
                ? { backgroundColor: ORGANELLES[k].color, borderColor: ORGANELLES[k].color, color: '#fff' }
                : { backgroundColor: 'transparent', borderColor: '#cbd5e1', color: ORGANELLES[k].color }}>
              {ORGANELLES[k].name}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
