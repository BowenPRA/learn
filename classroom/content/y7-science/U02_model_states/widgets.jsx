// content/y7-science/U02_model_states/widgets.jsx
// Heating & Cooling — a particle model. A standalone science-track simulation
// that ties every idea in section 2.2 to one moving picture: change the
// temperature and watch a substance melt, evaporate, boil, condense and freeze,
// with the particles shown beside the beaker so the class sees WHY.
//
// WHY A WIDGET AND NOT A SLIDE. Every other way of teaching this is a still
// picture of one state at a time. The whole point of 2.2 is the MOVEMENT between
// states and the temperatures it happens at — you cannot draw that, you have to
// run it. So the only interactive thing is the temperature (drag the axis, or
// Heat / Cool), because temperature is the one variable the whole topic turns on.
//
// WHAT IT DEMONSTRATES, deliberately mapped to the section:
//   · the three states, and the particle arrangement of each (2.1b / 2.2)
//   · melting and freezing, at the melting point
//   · boiling and condensing, at the boiling point
//   · EVAPORATION as a separate thing from boiling — a few surface particles
//     leaving a liquid that is nowhere near boiling, faster as it warms
//   · that the transition temperatures are a property of the substance: swap
//     water for oxygen (a gas in this room) or iron (a solid) and the whole
//     picture shifts along the temperature axis
//   · the plateau at each transition: Heat/Cool slows almost to a stop while the
//     change happens, the way the temperature holds while water boils (2.2b)
//
// The particle field is animated by writing cx/cy straight to the SVG circles in
// one rAF loop, so 42 particles move at 60fps without re-rendering React. Colours
// come from CSS, so light/dark just works. The macro beaker and the read-outs are
// ordinary React and update from the temperature state.
//
// Bilingual like every deck: it takes the deck's `lang`, and scales its type up
// on the projector from `isDisplayMode`.
import { useState, useRef, useEffect, useCallback } from 'react'
import { Flame, Snowflake, RotateCcw, Hand, Thermometer } from 'lucide-react'

const pick = (lang, en, vn) => (lang === 'vn' ? (vn ?? en) : en)

// ── Substances ───────────────────────────────────────────────────────────────
// Real melting and boiling points (degrees C), chosen to span the extremes:
// water is the reference; mercury is a liquid at room temperature; oxygen is a
// gas well below room temperature; iron is a solid that needs a furnace.
const SUBSTANCES = [
  {
    key: 'water', name: ['Water', 'Nước'], mp: 0, bp: 100,
    solid: ['Ice', 'Nước đá'], liquid: ['Water', 'Nước'], gas: ['Steam / water vapour', 'Hơi nước'],
    color: '#2f7fb0', roomWord: ['a liquid', 'chất lỏng'],
  },
  {
    key: 'mercury', name: ['Mercury', 'Thủy ngân'], mp: -39, bp: 357,
    solid: ['Solid mercury', 'Thủy ngân rắn'], liquid: ['Liquid mercury', 'Thủy ngân lỏng'], gas: ['Mercury vapour', 'Hơi thủy ngân'],
    color: '#7d8892', roomWord: ['a liquid', 'chất lỏng'],
  },
  {
    key: 'oxygen', name: ['Oxygen', 'Ô-xy'], mp: -218, bp: -183,
    solid: ['Solid oxygen', 'Ô-xy rắn'], liquid: ['Liquid oxygen', 'Ô-xy lỏng'], gas: ['Oxygen gas', 'Khí ô-xy'],
    color: '#3f8fd8', roomWord: ['a gas', 'chất khí'],
  },
  {
    key: 'iron', name: ['Iron', 'Sắt'], mp: 1538, bp: 2862,
    solid: ['Solid iron', 'Sắt rắn'], liquid: ['Molten iron', 'Sắt nóng chảy'], gas: ['Iron vapour', 'Hơi sắt'],
    color: '#b5744f', roomWord: ['a solid', 'chất rắn'],
  },
]

const ROOM = 20 // degrees C, the room-temperature marker

const T = {
  title: ['Heating & Cooling', 'Đun nóng & Làm lạnh'],
  subtitle: ['a particle model of melting, boiling and more', 'mô hình hạt của nóng chảy, sôi và hơn thế nữa'],
  see: ['What you see', 'Em nhìn thấy'],
  particles: ['The particles — zoomed in', 'Các hạt — phóng to'],
  heat: ['Heat', 'Đun nóng'],
  cool: ['Cool', 'Làm lạnh'],
  stop: ['Stop', 'Dừng'],
  room: ['Room temp', 'Nhiệt độ phòng'],
  drag: ['Drag the marker, or press Heat / Cool', 'Kéo con trỏ, hoặc bấm Đun nóng / Làm lạnh'],
  meltingPoint: ['melting point', 'nhiệt độ nóng chảy'],
  boilingPoint: ['boiling point', 'nhiệt độ sôi'],
  roomTemp: ['room temperature', 'nhiệt độ phòng'],
  solid: ['Solid', 'Rắn'],
  liquid: ['Liquid', 'Lỏng'],
  gas: ['Gas', 'Khí'],
  melting: ['Melting', 'Nóng chảy'],
  freezing: ['Freezing', 'Đông đặc'],
  boiling: ['Boiling', 'Sôi'],
  condensing: ['Condensing', 'Ngưng tụ'],
  evaporating: ['Evaporating', 'Bay hơi'],
  atRoom: ['At room temperature (20°C) this is', 'Ở nhiệt độ phòng (20°C), chất này là'],
  dSolid: ['Packed in a fixed pattern — the particles can only vibrate on the spot.', 'Xếp chặt theo trật tự cố định — các hạt chỉ rung tại chỗ.'],
  dLiquid: ['Still close together, but the particles can now slide past each other and flow.', 'Vẫn ở gần nhau, nhưng các hạt giờ có thể trượt qua nhau và chảy.'],
  dGas: ['Broken apart — the particles move fast and fill all the space they are given.', 'Đã tách rời — các hạt chuyển động nhanh và lấp đầy mọi khoảng trống.'],
  dMelting: ['Heat is breaking the fixed pattern — the solid is turning to liquid.', 'Nhiệt đang phá vỡ trật tự cố định — chất rắn đang chuyển thành lỏng.'],
  dFreezing: ['The particles are slowing and locking back into a fixed pattern.', 'Các hạt chậm lại và khóa trở lại thành trật tự cố định.'],
  dBoiling: ['Particles all through the liquid are escaping as gas.', 'Các hạt khắp trong lòng chất lỏng đang thoát ra thành khí.'],
  dCondensing: ['Gas particles are slowing and joining back into a liquid.', 'Các hạt khí chậm lại và nhập lại thành chất lỏng.'],
  dEvaporating: ['A few particles at the surface are escaping into the air — even though the liquid is not boiling.', 'Vài hạt ở bề mặt đang thoát vào không khí — dù chất lỏng chưa sôi.'],
}
const t = (lang, key) => T[key][lang === 'vn' ? 1 : 0]

// Format a temperature with a real Unicode minus sign.
const degC = (v) => `${v < 0 ? '−' : ''}${Math.abs(Math.round(v))}°C`

const clamp = (v, a, b) => Math.min(b, Math.max(a, v))
const smooth = (e0, e1, x) => { const s = clamp((x - e0) / (e1 - e0), 0, 1); return s * s * (3 - 2 * s) }

// The temperature axis for a substance: always wide enough to show both
// transition points AND room temperature, whichever is more extreme.
function rangeOf(s) {
  const pad = Math.max(15, (s.bp - s.mp) * 0.45)
  return { low: Math.min(s.mp - pad, ROOM - 5), high: Math.max(s.bp + pad, ROOM + 5) }
}

// The transition band half-width (degrees), so a transition reads as a zone the
// marker crosses rather than a single unreachable point.
const bandOf = (s) => Math.max(2, (s.bp - s.mp) * 0.02)

// Solid / liquid / gas fractions at a given temperature (they sum to 1).
function phaseOf(s, temp) {
  const d = bandOf(s)
  const melt = smooth(s.mp - d, s.mp + d, temp) // 0 solid → 1 liquid
  const boil = smooth(s.bp - d, s.bp + d, temp) // 0 liquid → 1 gas
  const solid = 1 - melt
  const gas = boil
  const liquid = clamp(1 - solid - gas, 0, 1)
  return { solid, liquid, gas, melt, boil }
}

// ── Particle field geometry ──────────────────────────────────────────────────
const BW = 340, BH = 300           // particle-box viewBox
const COLS = 7, ROWS = 6, N = COLS * ROWS
const R = 8.5                       // particle radius

function makeParticles() {
  const arr = []
  const spanX = 210, spanY = 150
  const x0 = (BW - spanX) / 2, y0 = BH - 40 - spanY
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const hx = x0 + (c + 0.5) * (spanX / COLS)
      const hy = y0 + (r + 0.5) * (spanY / ROWS)
      arr.push({ x: hx, y: hy, vx: 0, vy: 0, hx, hy, vap: false })
    }
  }
  return arr
}

export function StateModel({ lang = 'en', isDisplayMode = false }) {
  const [subKey, setSubKey] = useState('water')
  const sub = SUBSTANCES.find((s) => s.key === subKey)
  const [temp, setTemp] = useState(ROOM)
  const [auto, setAuto] = useState(null) // 'heat' | 'cool' | null
  const [dir, setDir] = useState(1) // +1 heating, -1 cooling — decides melting vs freezing

  // A stable array of length N for rendering the circles; the loop mutates the
  // same array through particlesRef and writes cx/cy straight to the DOM.
  const [particles] = useState(makeParticles)

  // Refs the animation loop reads (so the loop is created once).
  const subRef = useRef(sub)
  const tempRef = useRef(temp)
  const autoRef = useRef(auto)
  const particlesRef = useRef(particles)
  const circleRefs = useRef([])
  const bubbleRefs = useRef([])
  const axisRef = useRef(null)

  useEffect(() => { subRef.current = sub }, [sub])
  useEffect(() => { tempRef.current = temp }, [temp])
  useEffect(() => { autoRef.current = auto }, [auto])

  // Switching substance returns to room temperature and stops any ramp, so each
  // substance is first met at the temperature the class actually lives in.
  const chooseSub = (key) => {
    setSubKey(key)
    setAuto(null)
    const r = rangeOf(SUBSTANCES.find((s) => s.key === key))
    setTemp(clamp(ROOM, r.low, r.high))
  }

  // ── The one animation loop ─────────────────────────────────────────────────
  useEffect(() => {
    let raf, last = performance.now()
    const bubbles = bubbleRefs.current

    const step = (now) => {
      const dt = clamp((now - last) / 1000, 0, 0.033)
      last = now
      const s = subRef.current
      const { low, high } = rangeOf(s)
      const range = high - low

      // Auto heat / cool ramps the temperature, but crawls across a transition
      // band — the plateau where water sits at 100 while it boils.
      if (autoRef.current) {
        const dir = autoRef.current === 'heat' ? 1 : -1
        const d = bandOf(s)
        const tv = tempRef.current
        const inBand = (tv > s.mp - d && tv < s.mp + d) || (tv > s.bp - d && tv < s.bp + d)
        const rate = range * (inBand ? 0.03 : 0.16) // per second
        let nt = tv + dir * rate * dt
        nt = clamp(nt, low, high)
        tempRef.current = nt
        setTemp(nt)
        if ((dir > 0 && nt >= high) || (dir < 0 && nt <= low)) { autoRef.current = null; setAuto(null) }
      }

      const temp = tempRef.current
      const ph = phaseOf(s, temp)
      const ps = particlesRef.current

      // How much liquid/solid is still condensed (drives the surface level).
      const condensedFrac = ps.filter((p) => !p.vap).length / N
      const floorY = BH - 22
      const surfaceY = floorY - condensedFrac * (BH * 0.62)

      // Target number of escaped (vapour) particles: nearly all when it is a gas,
      // plus a few extra for surface EVAPORATION when it is a warm liquid.
      let evap = 0
      if (ph.liquid > 0.6 && ph.gas < 0.1) {
        const warmth = clamp((temp - s.mp) / Math.max(1, s.bp - s.mp), 0, 1)
        evap = Math.round(warmth * 3.4)
      }
      const targetVap = clamp(Math.round(N * ph.gas) + evap, 0, N)
      const vapCount = ps.filter((p) => p.vap).length
      if (vapCount < targetVap) {
        // Evaporate the highest condensed particle (nearest the surface).
        let top = null
        for (const p of ps) if (!p.vap && (!top || p.y < top.y)) top = p
        if (top) { top.vap = true; top.vy = -60 - Math.random() * 40; top.vx = (Math.random() - 0.5) * 60 }
      } else if (vapCount > targetVap) {
        // Condense the lowest vapour particle (the one back at the surface).
        let bot = null
        for (const p of ps) if (p.vap && (!bot || p.y > bot.y)) bot = p
        if (bot) { bot.vap = false }
      }

      // Move every particle. All speeds are in SVG-units per second.
      const gasSpeed = 80 + ph.gas * 140
      const grav = 720 * ph.liquid                        // liquid pulls to the floor
      const kickL = ph.liquid * 180                       // liquid flow
      const vib = ph.solid * (1.6 + 9 * ph.melt)          // solid vibration, grows near melting
      const homePull = ph.solid * 0.22                    // how hard the lattice holds each frame
      for (let i = 0; i < ps.length; i++) {
        const p = ps[i]
        if (p.vap) {
          // Free flight at a lively, roughly constant speed — fills the whole box.
          p.vx += (Math.random() - 0.5) * 70
          p.vy += (Math.random() - 0.5) * 70 - 14 // faint buoyancy so gas rises to fill
          const sp = Math.hypot(p.vx, p.vy) || 1
          p.vx = (p.vx / sp) * gasSpeed
          p.vy = (p.vy / sp) * gasSpeed
          p.x += p.vx * dt; p.y += p.vy * dt
          if (p.x < R) { p.x = R; p.vx = Math.abs(p.vx) }
          if (p.x > BW - R) { p.x = BW - R; p.vx = -Math.abs(p.vx) }
          if (p.y < R + 24) { p.y = R + 24; p.vy = Math.abs(p.vy) }
          if (p.y > floorY) { p.y = floorY; p.vy = -Math.abs(p.vy) }
        } else {
          // Condensed. Liquid: gravity + random flow. Solid: pulled onto its home
          // lattice site each frame, with only a small vibration left over.
          p.vx += (Math.random() - 0.5) * kickL
          p.vy += (Math.random() - 0.5) * kickL + grav * dt
          p.vx *= 0.9; p.vy *= 0.9
          p.x += p.vx * dt; p.y += p.vy * dt
          if (homePull > 0.002) {
            p.x += (p.hx - p.x) * homePull + (Math.random() - 0.5) * vib
            p.y += (p.hy - p.y) * homePull + (Math.random() - 0.5) * vib
          }
          // Walls, floor, and a soft liquid surface so a liquid pools at the bottom.
          if (p.x < R) { p.x = R; p.vx = Math.abs(p.vx) * 0.5 }
          if (p.x > BW - R) { p.x = BW - R; p.vx = -Math.abs(p.vx) * 0.5 }
          if (p.y > floorY) { p.y = floorY; p.vy = -Math.abs(p.vy) * 0.3 }
          if (ph.liquid > 0.5 && p.y < surfaceY - R) { p.vy += 600 * dt } // held under the surface
          if (p.y < R + 6) { p.y = R + 6; p.vy = Math.abs(p.vy) }
        }
        const el = circleRefs.current[i]
        if (el) {
          el.setAttribute('cx', p.x.toFixed(1))
          el.setAttribute('cy', p.y.toFixed(1))
          el.setAttribute('r', (p.vap ? R * 0.82 : R).toFixed(1))
          el.setAttribute('opacity', p.vap ? '0.55' : '1')
        }
      }

      // Bubbles in the macro beaker while boiling.
      if (bubbles.length) {
        const boiling = ph.gas > 0.08 && ph.gas < 0.98 ? 1 : 0
        for (let i = 0; i < bubbles.length; i++) {
          const b = bubbles[i]
          if (!b) continue
          if (boiling) {
            let cy = parseFloat(b.getAttribute('data-y') || '150')
            cy -= (18 + i * 4) * dt * 6
            if (cy < 46) cy = 150 + (i % 3) * 8
            b.setAttribute('data-y', cy.toFixed(1))
            b.setAttribute('cy', cy.toFixed(1))
            b.setAttribute('opacity', '0.5')
          } else {
            b.setAttribute('opacity', '0')
          }
        }
      }

      raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [])

  // ── Interactive temperature axis ────────────────────────────────────────────
  const { low, high } = rangeOf(sub)
  const fracFromTemp = (v) => clamp((v - low) / (high - low), 0, 1)
  const tempFromClientX = useCallback((clientX) => {
    const el = axisRef.current
    if (!el) return temp
    const rect = el.getBoundingClientRect()
    const f = clamp((clientX - rect.left) / rect.width, 0, 1)
    return low + f * (high - low)
  }, [low, high, temp])

  const dragging = useRef(false)
  const onDown = (e) => { dragging.current = true; setAuto(null); const nt = tempFromClientX(e.clientX); setDir(nt >= tempRef.current ? 1 : -1); setTemp(nt); e.currentTarget.setPointerCapture?.(e.pointerId) }
  const onMove = (e) => { if (!dragging.current) return; const nt = tempFromClientX(e.clientX); setDir(nt >= tempRef.current ? 1 : -1); setTemp(nt) }
  const onUp = () => { dragging.current = false }

  const toggle = (mode) => { setDir(mode === 'heat' ? 1 : -1); setAuto((a) => (a === mode ? null : mode)) }
  const goRoom = () => { setAuto(null); setDir(temp > ROOM ? -1 : 1); setTemp(clamp(ROOM, low, high)) }

  // ── Derived display state ───────────────────────────────────────────────────
  const ph = phaseOf(sub, temp)
  const d = bandOf(sub)
  const inMelt = temp > sub.mp - d && temp < sub.mp + d
  const inBoil = temp > sub.bp - d && temp < sub.bp + d
  const heating = dir >= 0
  const evaporating = ph.liquid > 0.75 && temp > sub.mp + d && temp < sub.bp - d && temp > sub.mp + 1

  let stateKey, label, desc
  if (inBoil) { stateKey = 'gas'; label = heating ? t(lang, 'boiling') : t(lang, 'condensing'); desc = heating ? t(lang, 'dBoiling') : t(lang, 'dCondensing') }
  else if (inMelt) { stateKey = 'solid'; label = heating ? t(lang, 'melting') : t(lang, 'freezing'); desc = heating ? t(lang, 'dMelting') : t(lang, 'dFreezing') }
  else if (ph.gas > 0.5) { stateKey = 'gas'; label = t(lang, 'gas'); desc = t(lang, 'dGas') }
  else if (ph.solid > 0.5) { stateKey = 'solid'; label = t(lang, 'solid'); desc = t(lang, 'dSolid') }
  else { stateKey = 'liquid'; label = t(lang, 'liquid'); desc = evaporating ? t(lang, 'dEvaporating') : t(lang, 'dLiquid') }

  const stateName = pick(lang, sub[stateKey][0], sub[stateKey][1])
  const roomPhase = phaseOf(sub, ROOM)
  const roomStateKey = roomPhase.gas > 0.5 ? 'gas' : roomPhase.solid > 0.5 ? 'solid' : 'liquid'

  const stateColor = { solid: '#3b82f6', liquid: '#0ea5a4', gas: '#ef6b3d' }[stateKey]
  const big = isDisplayMode

  // Macro-beaker geometry.
  const mbW = 200, mbH = 240
  const contentFrac = clamp(ph.solid + ph.liquid, 0, 1)
  const liqTop = mbH - 40 - contentFrac * (mbH - 80)
  const iceSize = 78 * ph.solid

  return (
    <div className="w-full h-full flex flex-col bg-slate-50 dark:bg-slate-950 overflow-hidden select-none">
      {/* Header + substance selector */}
      <div className="flex items-center justify-between gap-3 px-4 sm:px-6 py-3 border-b-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shrink-0">
        <div className="flex items-center gap-3 min-w-0">
          <div className="p-2 rounded-xl bg-[#14b8a6] text-white shadow-inner border border-black/10 shrink-0">
            <Thermometer className={big ? 'w-7 h-7' : 'w-5 h-5'} strokeWidth={2.5} />
          </div>
          <div className="min-w-0">
            <div className={`font-black tracking-tight text-slate-800 dark:text-slate-100 leading-none ${big ? 'text-2xl' : 'text-lg sm:text-xl'}`}>{t(lang, 'title')}</div>
            <div className={`font-bold text-slate-400 dark:text-slate-500 truncate ${big ? 'text-sm' : 'text-[11px] sm:text-xs'}`}>{t(lang, 'subtitle')}</div>
          </div>
        </div>
        <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap justify-end">
          {SUBSTANCES.map((s) => (
            <button
              key={s.key}
              onClick={() => chooseSub(s.key)}
              className={`rounded-xl font-black uppercase tracking-wide border-2 transition-all active:scale-95 ${big ? 'px-4 py-2 text-sm' : 'px-3 py-1.5 text-xs'} ${subKey === s.key ? 'text-white border-transparent shadow-sm' : 'text-slate-500 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-slate-300 bg-white dark:bg-slate-800'}`}
              style={subKey === s.key ? { backgroundColor: s.color } : undefined}
            >
              {pick(lang, s.name[0], s.name[1])}
            </button>
          ))}
        </div>
      </div>

      {/* Split: macro beaker | particle zoom */}
      <div className="flex-1 min-h-0 flex flex-col lg:flex-row gap-3 sm:gap-4 p-3 sm:p-4">
        {/* LEFT — what you see */}
        <div className="flex-1 min-h-0 flex flex-col rounded-2xl border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden">
          <div className={`px-4 py-2 font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 border-b border-slate-100 dark:border-slate-800 ${big ? 'text-sm' : 'text-[10px] sm:text-xs'}`}>{t(lang, 'see')}</div>
          <div className="flex-1 min-h-0 flex items-center justify-center gap-2 p-2">
            <svg viewBox="0 0 300 280" className="h-full max-h-full w-auto" style={{ maxWidth: '100%' }}>
              {/* thermometer */}
              <g>
                <rect x="30" y="24" width="20" height="210" rx="10" fill="none" stroke="#94a3b8" strokeWidth="3" />
                <circle cx="40" cy="246" r="18" fill={stateColor} stroke="#64748b" strokeWidth="3" />
                <rect x="35" y={40 + (1 - fracFromTemp(temp)) * 190} width="10" height={246 - (40 + (1 - fracFromTemp(temp)) * 190)} fill={stateColor} />
              </g>
              {/* beaker */}
              <g transform="translate(70,20)">
                <path d={`M 8 6 v 224 q 0 10 10 10 h ${mbW - 36} q 10 0 10 -10 v -224`} fill="none" stroke="#94a3b8" strokeWidth="3.5" />
                {/* liquid / solid content */}
                {contentFrac > 0.02 && (
                  <path d={`M 12 ${liqTop} h ${mbW - 24} v ${232 - liqTop} q 0 8 -8 8 h ${-(mbW - 40)} q -8 0 -8 -8 Z`} fill={sub.color} opacity="0.5" />
                )}
                {/* ice / solid cube */}
                {ph.solid > 0.03 && (
                  <rect x={mbW / 2 - iceSize / 2 - 4} y={236 - iceSize} width={iceSize} height={iceSize} rx="6" fill={sub.color} opacity={0.35 + 0.5 * ph.solid} stroke="#64748b" strokeWidth="1.5" />
                )}
                {/* bubbles while boiling */}
                <g>
                  {[0, 1, 2, 3, 4].map((i) => (
                    <circle key={i} ref={(el) => (bubbleRefs.current[i] = el)} data-y="150" cx={40 + i * 28} cy="150" r={5 + (i % 3)} fill="#ffffff" opacity="0" />
                  ))}
                </g>
                {/* vapour wisps */}
                {ph.gas > 0.05 && [0, 1, 2].map((i) => (
                  <ellipse key={i} cx={50 + i * 45} cy={-2 - i * 4} rx="16" ry="8" fill={sub.color} opacity={0.12 + 0.18 * ph.gas}>
                    <animate attributeName="cy" values={`10;-30`} dur={`${2 + i * 0.4}s`} repeatCount="indefinite" />
                    <animate attributeName="opacity" values={`${0.05 + 0.2 * ph.gas};0`} dur={`${2 + i * 0.4}s`} repeatCount="indefinite" />
                  </ellipse>
                ))}
              </g>
            </svg>
          </div>
          {/* read-out */}
          <div className="px-4 py-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3">
            <div>
              <div className={`font-black tabular-nums text-slate-800 dark:text-slate-100 leading-none ${big ? 'text-4xl' : 'text-2xl sm:text-3xl'}`}>{degC(temp)}</div>
              <div className={`font-bold text-slate-400 ${big ? 'text-sm' : 'text-[11px]'}`}>{pick(lang, sub.name[0], sub.name[1])}</div>
            </div>
            <div className="text-right">
              <span className={`inline-block rounded-lg px-3 py-1.5 font-black uppercase tracking-wide text-white shadow-sm ${big ? 'text-lg' : 'text-sm'}`} style={{ backgroundColor: stateColor }}>{label}</span>
              <div className={`font-bold text-slate-500 dark:text-slate-400 mt-1 ${big ? 'text-base' : 'text-xs'}`}>{stateName}</div>
            </div>
          </div>
        </div>

        {/* RIGHT — the particles */}
        <div className="flex-1 min-h-0 flex flex-col rounded-2xl border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden">
          <div className={`px-4 py-2 font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between ${big ? 'text-sm' : 'text-[10px] sm:text-xs'}`}>
            <span>{t(lang, 'particles')}</span>
            {evaporating && (
              <span className="inline-flex items-center gap-1 rounded-full bg-[#0ea5a4]/15 text-[#0e7c7b] dark:text-[#5eded0] px-2.5 py-0.5 font-black normal-case tracking-normal animate-pulse">
                {t(lang, 'evaporating')}
              </span>
            )}
          </div>
          <div className="flex-1 min-h-0 flex items-center justify-center p-2 bg-slate-100 dark:bg-slate-900/60">
            <svg viewBox={`0 0 ${BW} ${BH}`} className="h-full max-h-full w-auto" style={{ maxWidth: '100%' }}>
              <rect x="6" y="6" width={BW - 12} height={BH - 12} rx="14" fill="none" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="4 6" className="dark:stroke-slate-700" />
              {particles.map((p, i) => (
                <circle key={i} ref={(el) => (circleRefs.current[i] = el)} cx={p.x} cy={p.y} r={R} fill={sub.color} />
              ))}
            </svg>
          </div>
          <div className={`px-4 py-3 border-t border-slate-100 dark:border-slate-800 font-bold text-slate-600 dark:text-slate-300 leading-snug ${big ? 'text-base min-h-[4.5rem]' : 'text-xs sm:text-sm min-h-[3.5rem]'}`}>{desc}</div>
        </div>
      </div>

      {/* Temperature axis + controls */}
      <div className="shrink-0 px-3 sm:px-5 pb-3 sm:pb-4 pt-1">
        <div className="rounded-2xl border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-3 sm:p-4">
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Heat / Cool / Room */}
            <div className="flex flex-col gap-1.5 shrink-0">
              <button onClick={() => toggle('heat')} className={`flex items-center gap-1.5 rounded-lg font-black uppercase tracking-wide border-b-4 active:border-b-0 active:translate-y-1 transition-all ${big ? 'px-4 py-2 text-sm' : 'px-3 py-1.5 text-xs'} ${auto === 'heat' ? 'bg-[#e0842a] border-[#b4530c] text-white' : 'bg-[#fdf1e3] dark:bg-amber-950/40 border-[#e8c9a6] dark:border-amber-800/60 text-[#b4530c] dark:text-amber-300'}`}>
                <Flame className={big ? 'w-5 h-5' : 'w-4 h-4'} strokeWidth={3} />{auto === 'heat' ? t(lang, 'stop') : t(lang, 'heat')}
              </button>
              <button onClick={() => toggle('cool')} className={`flex items-center gap-1.5 rounded-lg font-black uppercase tracking-wide border-b-4 active:border-b-0 active:translate-y-1 transition-all ${big ? 'px-4 py-2 text-sm' : 'px-3 py-1.5 text-xs'} ${auto === 'cool' ? 'bg-[#2f7fb0] border-[#1a5fa8] text-white' : 'bg-[#e9f1fa] dark:bg-blue-950/40 border-[#bcd3ea] dark:border-blue-800/60 text-[#1a5fa8] dark:text-blue-300'}`}>
                <Snowflake className={big ? 'w-5 h-5' : 'w-4 h-4'} strokeWidth={3} />{auto === 'cool' ? t(lang, 'stop') : t(lang, 'cool')}
              </button>
            </div>

            {/* The axis */}
            <div className="flex-1 min-w-0">
              <svg
                ref={axisRef}
                viewBox="0 0 1000 96" preserveAspectRatio="none"
                className="w-full touch-none cursor-pointer"
                style={{ height: big ? 92 : 76 }}
                onPointerDown={onDown} onPointerMove={onMove} onPointerUp={onUp} onPointerCancel={onUp}
              >
                {/* zones */}
                {(() => {
                  const fx = (v) => clamp((v - low) / (high - low), 0, 1) * 1000
                  const mpx = fx(sub.mp), bpx = fx(sub.bp), roomx = fx(ROOM), curx = fx(temp)
                  const zoneWord = (cx, w, txt, col) => (w > 95 ? <text x={cx} y="53" textAnchor="middle" fontSize="15" fontWeight="700" fill={col}>{txt}</text> : null)
                  const bubbleX = clamp(curx, 32, 968)
                  return (
                    <>
                      <rect x="0" y="32" width={mpx} height="32" fill="#3b82f6" opacity="0.2" />
                      <rect x={mpx} y="32" width={bpx - mpx} height="32" fill="#0ea5a4" opacity="0.2" />
                      <rect x={bpx} y="32" width={1000 - bpx} height="32" fill="#ef6b3d" opacity="0.2" />
                      <rect x="0" y="32" width="1000" height="32" fill="none" stroke="#cbd5e1" strokeWidth="1.5" className="dark:stroke-slate-700" />
                      {zoneWord(mpx / 2, mpx, t(lang, 'solid'), '#2563eb')}
                      {zoneWord((mpx + bpx) / 2, bpx - mpx, t(lang, 'liquid'), '#0e7c7b')}
                      {zoneWord((bpx + 1000) / 2, 1000 - bpx, t(lang, 'gas'), '#c2410c')}
                      {/* room-temperature marker (its value is in the legend below) */}
                      <line x1={roomx} y1="28" x2={roomx} y2="72" stroke="#64748b" strokeWidth="1.5" strokeDasharray="3 3" />
                      <circle cx={roomx} cy="70" r="3.2" fill="#64748b" />
                      {/* melting- and boiling-point ticks */}
                      <line x1={mpx} y1="26" x2={mpx} y2="70" stroke="#1e293b" strokeWidth="2.5" className="dark:stroke-slate-200" />
                      <line x1={bpx} y1="26" x2={bpx} y2="70" stroke="#1e293b" strokeWidth="2.5" className="dark:stroke-slate-200" />
                      {/* current-temperature marker, with a value bubble kept on-canvas */}
                      <line x1={curx} y1="26" x2={curx} y2="70" stroke={stateColor} strokeWidth="4" />
                      <circle cx={curx} cy="48" r="9" fill={stateColor} stroke="#fff" strokeWidth="2.5" />
                      <g transform={`translate(${bubbleX},0)`}>
                        <rect x="-30" y="4" width="60" height="20" rx="6" fill={stateColor} />
                        <text x="0" y="18.5" textAnchor="middle" fontSize="14" fontWeight="800" fill="#ffffff">{degC(temp)}</text>
                      </g>
                    </>
                  )
                })()}
              </svg>
            </div>

            <button onClick={goRoom} className={`flex flex-col items-center gap-1 rounded-lg font-black uppercase tracking-wide border-2 border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 active:scale-95 shrink-0 ${big ? 'px-3 py-2 text-xs' : 'px-2.5 py-1.5 text-[10px]'}`}>
              <RotateCcw className={big ? 'w-5 h-5' : 'w-4 h-4'} strokeWidth={3} />{t(lang, 'room')}
            </button>
          </div>

          <div className={`mt-2.5 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 font-bold text-slate-600 dark:text-slate-300 ${big ? 'text-sm' : 'text-[11px] sm:text-xs'}`}>
            <span className="inline-flex items-center gap-1.5"><span className="inline-block w-3 h-3 rounded-sm bg-[#1e293b] dark:bg-slate-200" />{t(lang, 'meltingPoint')} · <span className="tabular-nums font-black">{degC(sub.mp)}</span></span>
            <span className="inline-flex items-center gap-1.5"><span className="inline-block w-3 h-3 rounded-sm bg-[#1e293b] dark:bg-slate-200" />{t(lang, 'boilingPoint')} · <span className="tabular-nums font-black">{degC(sub.bp)}</span></span>
            <span className="inline-flex items-center gap-1.5"><span className="inline-block w-3 h-3 rounded-full bg-[#64748b]" />{t(lang, 'roomTemp')} · <span className="tabular-nums font-black">20°C</span></span>
          </div>
          <div className={`mt-1.5 flex items-center justify-center gap-2 font-bold text-slate-400 dark:text-slate-500 ${big ? 'text-sm' : 'text-[11px]'}`}>
            <Hand className={big ? 'w-4 h-4' : 'w-3.5 h-3.5'} strokeWidth={2.5} />
            {t(lang, 'drag')} · {t(lang, 'atRoom')} {pick(lang, sub[roomStateKey][0], sub[roomStateKey][1])}
          </div>
        </div>
      </div>
    </div>
  )
}
