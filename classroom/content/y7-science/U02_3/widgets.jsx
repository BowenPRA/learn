// content/y7-science/U02_3/widgets.jsx
// "Explain It With Particles" — an animated particle simulation for section 2.3.
//
// WHY A WIDGET AND NOT A SLIDE. The whole point of 2.3 is that students can
// CONSTRUCT a particle-theory explanation for any change of state. A static
// slide can show the before and after, but not the transition. This widget shows
// 25 particles responding in real time to heat being added or removed, and
// beside the particle field, the explanation builds up line by line — so the
// student sees the particles vibrate more AT THE SAME MOMENT they read "the
// particles vibrate more." The visual and the verbal reinforce each other.
//
// WHAT IT DRILLS, deliberately mapped to the textbook (pages 41-43):
//   · expanding  — heat transferred → vibrate more → take up more space
//   · melting    — vibrate so much → forces can't hold → slide past each other
//   · boiling    — move faster → break forces → escape as gas
//   · condensing — hit cold surface → lose energy → slow down → forces pull back
//   · freezing   — lose energy → slow down → lock into fixed pattern
//
// INTERACTION: teacher-paced. Each press of "Add heat" or "Remove heat"
// advances one step. The particles transition visually while the next line of
// the explanation appears. Five scenarios, 3-4 steps each.
//
// The particle field is animated by writing cx/cy straight to the SVG circles
// in one rAF loop (same technique as StateModel), so 25 particles move at 60fps
// without re-rendering React.
import { useState, useRef, useEffect, useCallback } from 'react'
import { Flame, Snowflake, Sparkles, RotateCcw, ArrowRight, Check } from 'lucide-react'
import { tr } from '../../../src/lib/lang.js'

// Each entry is [English, Vietnamese, French].
const T = {
  title: ['Explain It With Particles', 'Giải thích bằng hạt', 'Explique avec les particules'],
  subtitle: ['Watch the particles, read the explanation', 'Xem các hạt, đọc lời giải thích', 'Regarde les particules, lis l’explication'],
  addHeat: ['Add heat', 'Thêm nhiệt', 'Chauffer'],
  removeHeat: ['Remove heat', 'Lấy nhiệt đi', 'Refroidir'],
  next: ['Next', 'Tiếp theo', 'Suivant'],
  done: ['All done!', 'Hoàn thành!', 'Terminé !'],
  doneMsg: ['You can explain every change of state with particles.', 'Em có thể giải thích mọi sự chuyển thể bằng hạt.', 'Tu sais expliquer chaque changement d’état avec les particules.'],
  again: ['Start again', 'Làm lại', 'Recommencer'],
  round: ['of', 'trong', 'sur'],
  explanation: ['The explanation', 'Lời giải thích', 'L’explication'],
  particles: ['The particles', 'Các hạt', 'Les particules'],
  watch: ['Press the button and watch what happens.', 'Bấm nút và xem điều gì xảy ra.', 'Appuie sur le bouton et regarde ce qui se passe.'],
  complete: ['Correct!', 'Chính xác!', 'Exact !'],
}
const t = (lang, key) => tr(lang, T[key][0], T[key][1], T[key][2])

// ── Particle field ──────────────────────────────────────────────────────────
const BW = 360, BH = 310
const COLS = 5, ROWS = 5, N = COLS * ROWS
const PR = 11

const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v))

function gridPositions(spacing = 1) {
  const span = 38 * spacing
  const x0 = BW / 2 - ((COLS - 1) * span) / 2
  const y0 = BH / 2 - ((ROWS - 1) * span) / 2
  const out = []
  for (let r = 0; r < ROWS; r++)
    for (let c = 0; c < COLS; c++)
      out.push({ x: x0 + c * span, y: y0 + r * span })
  return out
}

function makeParticles(type, spacing = 1) {
  const grid = gridPositions(spacing)
  return grid.map((g, i) => {
    let x = g.x, y = g.y
    if (type === 'liquid') {
      const angle = i * 2.4
      const rr = 0.25 + (i * 0.618) % 0.55
      x = BW * 0.2 + BW * 0.6 * ((Math.sin(angle) * rr + 1) / 2)
      y = BH * 0.35 + BH * 0.55 * ((Math.cos(angle * 1.3) * rr + 1) / 2)
    } else if (type === 'gas') {
      x = PR + 1 + Math.sin(i * 3.7 + 1) * 0.5 * (BW - 2 * PR - 2) + (BW - 2 * PR - 2) * 0.5
      y = PR + 1 + Math.cos(i * 2.3 + 2) * 0.5 * (BH - 2 * PR - 2) + (BH - 2 * PR - 2) * 0.5
    }
    return { x, y, vx: 0, vy: 0, hx: g.x, hy: g.y, vap: type === 'gas' }
  })
}

// ── Scenario data ───────────────────────────────────────────────────────────
// Each step defines target physics params AND an explanation line.
// Keys in the text get highlighted in orange.
const SCENARIOS = [
  {
    key: 'expand', icon: 'heat',
    title: ['Expanding', 'Giãn nở', 'Dilatation'],
    scene: ['Mr Bowen heats an iron bar. It gets slightly bigger. Why?',
            'Thầy Bowen đun nóng một thanh sắt. Nó to ra một chút. Tại sao?',
            'M. Bowen chauffe une barre de fer. Elle grandit un peu. Pourquoi ?'],
    init: 'solid',
    steps: [
      {
        params: { homePull: 0.20, vibAmp: 4.5, spacing: 1.0, flowKick: 0, gravity: 0, vapTarget: 0 },
        text: ['**Heat energy** is **transferred** to the particles.', '**Nhiệt năng** được **truyền** đến các hạt.', 'L’**énergie thermique** est **transférée** aux particules.'],
      },
      {
        params: { homePull: 0.17, vibAmp: 7, spacing: 1.15, flowKick: 0, gravity: 0, vapTarget: 0 },
        text: ['The particles vibrate more. They take up more space.', 'Các hạt rung động nhiều hơn. Chúng chiếm nhiều chỗ hơn.', 'Les particules vibrent plus. Elles prennent plus de place.'],
      },
      {
        params: { homePull: 0.14, vibAmp: 9, spacing: 1.3, flowKick: 0, gravity: 0, vapTarget: 0 },
        text: ['The solid **expands** (gets bigger).', 'Chất rắn **giãn nở** (to ra).', 'Le solide se **dilate** (il grandit).'],
      },
    ],
  },
  {
    key: 'melt', icon: 'heat',
    title: ['Melting', 'Nóng chảy', 'Fusion'],
    scene: ['An ice cube sits on a warm table. It turns into water.',
            'Một viên đá để trên bàn ấm. Nó biến thành nước.',
            'Un glaçon est posé sur une table chaude. Il devient de l’eau.'],
    init: 'solid',
    steps: [
      {
        params: { homePull: 0.12, vibAmp: 10, spacing: 1.12, flowKick: 30, gravity: 0, vapTarget: 0 },
        text: ['The particles vibrate more and more as **heat energy** is **transferred**.', 'Các hạt rung động ngày càng nhiều khi **nhiệt năng** được **truyền**.', 'Les particules vibrent de plus en plus quand l’**énergie thermique** est **transférée**.'],
      },
      {
        params: { homePull: 0.02, vibAmp: 4, spacing: 1.0, flowKick: 120, gravity: 500, vapTarget: 0 },
        text: ['The **attractive forces** can no longer hold them in a fixed pattern.', '**Lực hút** không còn giữ được chúng trong trật tự cố định.', 'Les **forces d’attraction** ne peuvent plus les tenir en place.'],
      },
      {
        params: { homePull: 0, vibAmp: 0, spacing: 1.0, flowKick: 170, gravity: 650, vapTarget: 0 },
        text: ['They slide past each other. The solid melts into a liquid.', 'Chúng trượt qua nhau. Chất rắn nóng chảy thành chất lỏng.', 'Elles glissent les unes sur les autres. Le solide fond en liquide.'],
      },
    ],
  },
  {
    key: 'boil', icon: 'heat',
    title: ['Boiling', 'Sôi', 'Ébullition'],
    scene: ['Water is heated to 100 degrees C. Bubbles form and steam escapes.',
            'Nước được đun đến 100 độ C. Bọt hình thành và hơi thoát ra.',
            'On chauffe de l’eau à 100 degrés C. Des bulles se forment et la vapeur s’échappe.'],
    init: 'liquid',
    steps: [
      {
        params: { homePull: 0, vibAmp: 0, spacing: 1.0, flowKick: 280, gravity: 500, vapTarget: 0 },
        text: ['The particles move faster and faster.', 'Các hạt chuyển động ngày càng nhanh.', 'Les particules bougent de plus en plus vite.'],
      },
      {
        params: { homePull: 0, vibAmp: 0, spacing: 1.0, flowKick: 200, gravity: 350, vapTarget: 10 },
        text: ['Some have enough energy to break the **attractive forces**.', 'Một số có đủ năng lượng để phá vỡ **lực hút**.', 'Certaines ont assez d’énergie pour briser les **forces d’attraction**.'],
      },
      {
        params: { homePull: 0, vibAmp: 0, spacing: 1.0, flowKick: 0, gravity: 0, vapTarget: N },
        text: ['They escape as a gas. The liquid boils.', 'Chúng thoát ra dưới dạng khí. Chất lỏng sôi.', 'Elles s’échappent sous forme de gaz. Le liquide bout.'],
      },
    ],
  },
  {
    key: 'condense', icon: 'cool',
    title: ['Condensing', 'Ngưng tụ', 'Condensation'],
    scene: ['Steam from a shower hits a cold mirror. Water drops appear.',
            'Hơi nước từ vòi sen chạm vào gương lạnh. Các giọt nước xuất hiện.',
            'La vapeur d’une douche touche un miroir froid. Des gouttes d’eau apparaissent.'],
    init: 'gas',
    steps: [
      {
        params: { homePull: 0, vibAmp: 0, spacing: 1.0, flowKick: 0, gravity: 0, vapTarget: N, gasSlowdown: 0.6 },
        text: ['Gas particles hit the cold surface and lose energy.', 'Các hạt khí va vào bề mặt lạnh và mất năng lượng.', 'Les particules de gaz touchent la surface froide et perdent de l’énergie.'],
      },
      {
        params: { homePull: 0, vibAmp: 0, spacing: 1.0, flowKick: 60, gravity: 400, vapTarget: 6 },
        text: ['They slow down and get closer together.', 'Chúng chậm lại và lại gần nhau hơn.', 'Elles ralentissent et se rapprochent.'],
      },
      {
        params: { homePull: 0, vibAmp: 0, spacing: 1.0, flowKick: 140, gravity: 650, vapTarget: 0 },
        text: ['The **attractive forces** pull them together. The gas condenses into a liquid.', '**Lực hút** kéo chúng lại gần nhau. Chất khí ngưng tụ thành chất lỏng.', 'Les **forces d’attraction** les rassemblent. Le gaz se condense en liquide.'],
      },
    ],
  },
  {
    key: 'freeze', icon: 'cool',
    title: ['Freezing', 'Đông đặc', 'Solidification'],
    scene: ['A puddle of water freezes into ice overnight.',
            'Một vũng nước đóng băng thành đá qua đêm.',
            'Une flaque d’eau gèle pendant la nuit.'],
    init: 'liquid',
    steps: [
      {
        params: { homePull: 0, vibAmp: 0, spacing: 1.0, flowKick: 60, gravity: 500, vapTarget: 0 },
        text: ['**Heat energy** is **transferred** away from the particles. They slow down.', '**Nhiệt năng** bị **truyền** ra khỏi các hạt. Chúng chậm lại.', 'L’**énergie thermique** est **transférée** hors des particules. Elles ralentissent.'],
      },
      {
        params: { homePull: 0.08, vibAmp: 5, spacing: 1.05, flowKick: 15, gravity: 150, vapTarget: 0 },
        text: ['They can no longer flow past each other.', 'Chúng không còn chảy qua nhau được nữa.', 'Elles ne peuvent plus couler les unes sur les autres.'],
      },
      {
        params: { homePull: 0.25, vibAmp: 1.5, spacing: 1.0, flowKick: 0, gravity: 0, vapTarget: 0 },
        text: ['They lock into a fixed pattern. The liquid freezes into a solid.', 'Chúng khóa vào trật tự cố định. Chất lỏng đông đặc thành chất rắn.', 'Elles se bloquent en place. Le liquide gèle et devient solide.'],
      },
    ],
  },
]

// ── Render bold key words in orange ─────────────────────────────────────────
function renderLine(text, big) {
  const parts = text.split(/(\*\*[^*]+\*\*)/)
  return parts.map((p, i) => {
    if (p.startsWith('**') && p.endsWith('**')) {
      return <span key={i} className={`font-black text-[#c25e12] ${big ? 'text-lg' : ''}`}>{p.slice(2, -2)}</span>
    }
    return <span key={i}>{p}</span>
  })
}

// ── Main component ──────────────────────────────────────────────────────────
export function ParticleExplainer({ lang = 'en', isDisplayMode = false }) {
  const [scenarioIdx, setScenarioIdx] = useState(0)
  const [stepIdx, setStepIdx] = useState(-1) // -1 = waiting for first press
  const [done, setDone] = useState(false)

  const sc = SCENARIOS[scenarioIdx]
  const big = isDisplayMode
  const isHeat = sc.icon === 'heat'

  // A stable array of length N for rendering the circles; the loop mutates the
  // same array through particlesRef and writes cx/cy straight to the DOM.
  const [particles] = useState(() => makeParticles(SCENARIOS[0].init))
  const particlesRef = useRef(particles)
  const circleRefs = useRef([])
  const paramsRef = useRef({
    homePull: sc.init === 'solid' ? 0.25 : 0,
    vibAmp: sc.init === 'solid' ? 1.5 : 0,
    spacing: 1.0,
    flowKick: sc.init === 'liquid' ? 160 : 0,
    gravity: sc.init === 'liquid' ? 600 : 0,
    vapTarget: sc.init === 'gas' ? N : 0,
    gasSlowdown: 1,
  })

  const resetScenario = useCallback((idx) => {
    const s = SCENARIOS[idx]
    const ps = makeParticles(s.init)
    const current = particlesRef.current
    for (let i = 0; i < N; i++) Object.assign(current[i], ps[i])
    paramsRef.current = {
      homePull: s.init === 'solid' ? 0.25 : 0,
      vibAmp: s.init === 'solid' ? 1.5 : 0,
      spacing: 1.0,
      flowKick: s.init === 'liquid' ? 160 : 0,
      gravity: s.init === 'liquid' ? 600 : 0,
      vapTarget: s.init === 'gas' ? N : 0,
      gasSlowdown: 1,
    }
  }, [])

  // ── The animation loop ────────────────────────────────────────────────────
  useEffect(() => {
    let raf, last = performance.now()

    const step = (now) => {
      const dt = clamp((now - last) / 1000, 0, 0.033)
      last = now
      const ps = particlesRef.current
      const pm = paramsRef.current

      const grid = gridPositions(pm.spacing)
      const floorY = BH - PR - 4
      const gasSpeed = 90 * (pm.gasSlowdown ?? 1)

      // Vapor transitions
      const vapCount = ps.filter((p) => p.vap).length
      if (vapCount < pm.vapTarget) {
        let top = null
        for (const p of ps) if (!p.vap && (!top || p.y < top.y)) top = p
        if (top) { top.vap = true; top.vy = -50 - Math.random() * 40; top.vx = (Math.random() - 0.5) * 50 }
      } else if (vapCount > pm.vapTarget) {
        let bot = null
        for (const p of ps) if (p.vap && (!bot || p.y > bot.y)) bot = p
        if (bot) { bot.vap = false }
      }

      for (let i = 0; i < ps.length; i++) {
        const p = ps[i]
        if (p.vap) {
          // Gas: move freely, bounce off walls
          p.vx += (Math.random() - 0.5) * 60
          p.vy += (Math.random() - 0.5) * 60 - 10
          const sp = Math.hypot(p.vx, p.vy) || 1
          p.vx = (p.vx / sp) * gasSpeed
          p.vy = (p.vy / sp) * gasSpeed
          p.x += p.vx * dt; p.y += p.vy * dt
          if (p.x < PR + 4) { p.x = PR + 4; p.vx = Math.abs(p.vx) }
          if (p.x > BW - PR - 4) { p.x = BW - PR - 4; p.vx = -Math.abs(p.vx) }
          if (p.y < PR + 4) { p.y = PR + 4; p.vy = Math.abs(p.vy) }
          if (p.y > floorY) { p.y = floorY; p.vy = -Math.abs(p.vy) }
        } else {
          // Condensed: grid pull + vibration + liquid flow + gravity
          p.vx += (Math.random() - 0.5) * pm.flowKick * dt
          p.vy += (Math.random() - 0.5) * pm.flowKick * dt + pm.gravity * dt
          p.vx *= 0.9; p.vy *= 0.9
          p.x += p.vx * dt; p.y += p.vy * dt

          // Grid pull
          if (pm.homePull > 0.002) {
            const g = grid[i]
            p.x += (g.x - p.x) * pm.homePull + (Math.random() - 0.5) * pm.vibAmp
            p.y += (g.y - p.y) * pm.homePull + (Math.random() - 0.5) * pm.vibAmp
            p.hx = g.x; p.hy = g.y
          }

          // Walls and floor
          if (p.x < PR + 4) { p.x = PR + 4; p.vx = Math.abs(p.vx) * 0.5 }
          if (p.x > BW - PR - 4) { p.x = BW - PR - 4; p.vx = -Math.abs(p.vx) * 0.5 }
          if (p.y > floorY) { p.y = floorY; p.vy = -Math.abs(p.vy) * 0.3 }
          if (p.y < PR + 4) { p.y = PR + 4; p.vy = Math.abs(p.vy) }

          // Simple repulsion to prevent overlap
          for (let j = i + 1; j < ps.length; j++) {
            if (ps[j].vap) continue
            const dx = ps[j].x - p.x, dy = ps[j].y - p.y
            const dist = Math.hypot(dx, dy) || 1
            if (dist < PR * 2.2) {
              const push = (PR * 2.2 - dist) * 0.15
              const nx = dx / dist, ny = dy / dist
              p.x -= nx * push; p.y -= ny * push
              ps[j].x += nx * push; ps[j].y += ny * push
            }
          }
        }

        const el = circleRefs.current[i]
        if (el) {
          el.setAttribute('cx', p.x.toFixed(1))
          el.setAttribute('cy', p.y.toFixed(1))
          el.setAttribute('r', (p.vap ? PR * 0.82 : PR).toFixed(1))
          el.setAttribute('opacity', p.vap ? '0.55' : '1')
        }
      }

      raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [])

  // ── Advance one step ──────────────────────────────────────────────────────
  const advance = () => {
    const nextStep = stepIdx + 1
    if (nextStep >= sc.steps.length) return
    setStepIdx(nextStep)
    const p = sc.steps[nextStep].params
    paramsRef.current = { ...paramsRef.current, ...p }
  }

  const nextScenario = () => {
    if (scenarioIdx + 1 >= SCENARIOS.length) { setDone(true); return }
    const next = scenarioIdx + 1
    setScenarioIdx(next)
    setStepIdx(-1)
    resetScenario(next)
  }

  const restart = () => {
    setScenarioIdx(0)
    setStepIdx(-1)
    setDone(false)
    resetScenario(0)
  }

  const allStepsShown = stepIdx >= sc.steps.length - 1
  const HEAT_BG = 'bg-[#c25e12]'
  const COOL_BG = 'bg-[#1a5fa8]'
  const accentBg = isHeat ? HEAT_BG : COOL_BG
  const IconComp = isHeat ? Flame : Snowflake

  // ── Done screen ───────────────────────────────────────────────────────────
  if (done) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-950 gap-6 p-6">
        <div className="p-4 rounded-2xl bg-emerald-500 text-white shadow-lg">
          <Sparkles className={big ? 'w-14 h-14' : 'w-10 h-10'} strokeWidth={2} />
        </div>
        <div className={`font-black text-slate-800 dark:text-slate-100 text-center ${big ? 'text-4xl' : 'text-2xl sm:text-3xl'}`}>{t(lang, 'done')}</div>
        <div className={`font-bold text-slate-500 dark:text-slate-400 text-center max-w-lg ${big ? 'text-xl' : 'text-base'}`}>{t(lang, 'doneMsg')}</div>
        <button onClick={restart} className={`flex items-center gap-2 rounded-xl font-black uppercase tracking-wide text-white bg-[#0087a8] border-b-4 border-[#00697f] active:border-b-0 active:translate-y-1 transition-all ${big ? 'px-6 py-3 text-lg' : 'px-5 py-2.5 text-sm'}`}>
          <RotateCcw className={big ? 'w-5 h-5' : 'w-4 h-4'} strokeWidth={3} />{t(lang, 'again')}
        </button>
      </div>
    )
  }

  return (
    <div className="w-full h-full flex flex-col bg-slate-50 dark:bg-slate-950 overflow-hidden select-none">
      {/* Header */}
      <div className="flex items-center justify-between gap-3 px-4 sm:px-6 py-3 border-b-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shrink-0">
        <div className="flex items-center gap-3 min-w-0">
          <div className={`p-2 rounded-xl text-white shadow-inner border border-black/10 shrink-0 ${accentBg}`}>
            <IconComp className={big ? 'w-7 h-7' : 'w-5 h-5'} strokeWidth={2.5} />
          </div>
          <div className="min-w-0">
            <div className={`font-black tracking-tight text-slate-800 dark:text-slate-100 leading-none ${big ? 'text-2xl' : 'text-lg sm:text-xl'}`}>{t(lang, 'title')}</div>
            <div className={`font-bold text-slate-400 dark:text-slate-500 truncate ${big ? 'text-sm' : 'text-[11px] sm:text-xs'}`}>{t(lang, 'subtitle')}</div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className={`font-black text-slate-400 dark:text-slate-500 tabular-nums ${big ? 'text-lg' : 'text-sm'}`}>
            {scenarioIdx + 1} {t(lang, 'round')} {SCENARIOS.length}
          </span>
          <div className="flex gap-1.5">
            {SCENARIOS.map((s, i) => (
              <div key={s.key} className={`rounded-full transition-all ${big ? 'w-3.5 h-3.5' : 'w-2.5 h-2.5'} ${i < scenarioIdx ? 'bg-emerald-400' : i === scenarioIdx ? 'bg-slate-800 dark:bg-slate-200' : 'bg-slate-300 dark:bg-slate-700'}`} />
            ))}
          </div>
        </div>
      </div>

      {/* Main area */}
      <div className="flex-1 min-h-0 flex flex-col lg:flex-row gap-3 sm:gap-4 p-3 sm:p-4">
        {/* LEFT — particle field */}
        <div className="flex-1 min-h-0 flex flex-col rounded-2xl border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden">
          <div className={`px-4 py-2 font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 border-b border-slate-100 dark:border-slate-800 ${big ? 'text-sm' : 'text-[10px] sm:text-xs'}`}>
            {t(lang, 'particles')}
          </div>
          <div className="flex-1 min-h-0 flex items-center justify-center p-2 bg-slate-100 dark:bg-slate-900/60">
            <svg viewBox={`0 0 ${BW} ${BH}`} className="h-full max-h-full w-auto" style={{ maxWidth: '100%' }}>
              <rect x="6" y="6" width={BW - 12} height={BH - 12} rx="14" fill="none" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="4 6" className="dark:stroke-slate-700" />
              {particles.map((p, i) => (
                <circle
                  key={i}
                  ref={(el) => (circleRefs.current[i] = el)}
                  cx={p.x} cy={p.y} r={PR}
                  fill="#5a7d94" stroke="#3d5f73" strokeWidth="1.5"
                />
              ))}
            </svg>
          </div>
        </div>

        {/* RIGHT — scenario + explanation */}
        <div className="lg:w-[380px] xl:w-[440px] shrink-0 flex flex-col gap-3">
          {/* Scenario card */}
          <div className="rounded-2xl border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden">
            <div className={`px-4 py-2 font-black uppercase tracking-widest text-white ${accentBg} ${big ? 'text-sm' : 'text-[10px] sm:text-xs'}`}>
              {tr(lang, sc.title[0], sc.title[1], sc.title[2])}
            </div>
            <div className={`px-4 py-3 font-bold text-slate-700 dark:text-slate-200 leading-relaxed ${big ? 'text-lg' : 'text-sm sm:text-base'}`}>
              {tr(lang, sc.scene[0], sc.scene[1], sc.scene[2])}
            </div>
          </div>

          {/* Explanation panel */}
          <div className="flex-1 min-h-0 rounded-2xl border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden flex flex-col">
            <div className={`px-4 py-2 font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 border-b border-slate-100 dark:border-slate-800 ${big ? 'text-sm' : 'text-[10px] sm:text-xs'}`}>
              {t(lang, 'explanation')}
            </div>
            <div className="flex-1 min-h-0 overflow-y-auto p-3 flex flex-col gap-2.5">
              {stepIdx < 0 && (
                <div className={`text-center text-slate-400 dark:text-slate-600 font-bold py-4 ${big ? 'text-base' : 'text-xs sm:text-sm'}`}>
                  {t(lang, 'watch')}
                </div>
              )}
              {sc.steps.map((s, i) => i <= stepIdx && (
                <div
                  key={i}
                  className={`flex items-start gap-2.5 rounded-xl border-2 px-3 py-2.5 transition-all
                    ${allStepsShown ? 'border-emerald-400 bg-emerald-50 dark:bg-emerald-950/30' : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800'}
                    ${big ? 'text-base' : 'text-xs sm:text-sm'}`}
                >
                  <span className={`shrink-0 w-6 h-6 rounded-full flex items-center justify-center font-black text-white text-xs ${allStepsShown ? 'bg-emerald-500' : 'bg-slate-400 dark:bg-slate-600'}`}>
                    {allStepsShown ? <Check className="w-3.5 h-3.5" strokeWidth={3} /> : i + 1}
                  </span>
                  <span className="font-bold leading-snug text-slate-700 dark:text-slate-200">
                    {renderLine(tr(lang, s.text[0], s.text[1], s.text[2]), big)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Controls */}
          <div className="shrink-0 flex items-center justify-center gap-3">
            {!allStepsShown && (
              <button
                onClick={advance}
                className={`flex items-center gap-2 rounded-xl font-black uppercase tracking-wide text-white border-b-4 active:border-b-0 active:translate-y-1 transition-all
                  ${isHeat ? 'bg-[#c25e12] border-[#a04a0e]' : 'bg-[#1a5fa8] border-[#14497e]'}
                  ${big ? 'px-8 py-3 text-lg' : 'px-6 py-2.5 text-sm'}`}
              >
                <IconComp className={big ? 'w-5 h-5' : 'w-4 h-4'} strokeWidth={3} />
                {isHeat ? t(lang, 'addHeat') : t(lang, 'removeHeat')}
              </button>
            )}
            {allStepsShown && (
              <button
                onClick={nextScenario}
                className={`flex items-center gap-2 rounded-xl font-black uppercase tracking-wide text-white bg-emerald-500 border-b-4 border-emerald-700 active:border-b-0 active:translate-y-1 transition-all ${big ? 'px-8 py-3 text-lg' : 'px-6 py-2.5 text-sm'}`}
              >
                <ArrowRight className={big ? 'w-5 h-5' : 'w-4 h-4'} strokeWidth={3} />
                {scenarioIdx + 1 < SCENARIOS.length ? t(lang, 'next') : t(lang, 'done')}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
