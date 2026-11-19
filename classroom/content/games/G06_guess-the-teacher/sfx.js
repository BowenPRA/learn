// content/games/G06_guess-the-teacher/sfx.js
// The TV's sounds, made on the spot with Web Audio (the same way as Guess Who's
// sfx.js), so there are no files to fetch or credit. Each is short and carries
// over a room of families. Browsers start audio only after a click or key on
// the page; the lobby's Start button is one.

const MUTE_KEY = 'learn:teacher-game:muted'
let ctx = null

export function isMuted() {
  try { return localStorage.getItem(MUTE_KEY) === '1' } catch { return false }
}

export function setMuted(on) {
  try { localStorage.setItem(MUTE_KEY, on ? '1' : '0') } catch { /* storage blocked */ }
}

function audio() {
  if (isMuted()) return null
  try {
    ctx = ctx || new AudioContext()
    if (ctx.state === 'suspended') ctx.resume()
    return ctx
  } catch {
    return null
  }
}

export const unlockAudio = () => { audio() }

function tone(a, { freq, to = freq, start = 0, length = 0.2, type = 'triangle', gain = 0.22 }) {
  const t = a.currentTime + start
  const osc = a.createOscillator()
  const g = a.createGain()
  osc.type = type
  osc.frequency.setValueAtTime(freq, t)
  if (to !== freq) osc.frequency.exponentialRampToValueAtTime(to, t + length)
  g.gain.setValueAtTime(0.0001, t)
  g.gain.exponentialRampToValueAtTime(gain, t + 0.012)
  g.gain.exponentialRampToValueAtTime(0.0001, t + length)
  osc.connect(g).connect(a.destination)
  osc.start(t)
  osc.stop(t + length + 0.05)
}

function noise(a, { start = 0, length = 0.16, gain = 0.16, from = 900, to = 3000, type = 'bandpass' } = {}) {
  const t = a.currentTime + start
  const buffer = a.createBuffer(1, Math.ceil(a.sampleRate * length), a.sampleRate)
  const data = buffer.getChannelData(0)
  for (let i = 0; i < data.length; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / data.length)
  const src = a.createBufferSource()
  src.buffer = buffer
  const filter = a.createBiquadFilter()
  filter.type = type
  filter.frequency.setValueAtTime(from, t)
  filter.frequency.exponentialRampToValueAtTime(to, t + length)
  const g = a.createGain()
  g.gain.value = gain
  src.connect(filter).connect(g).connect(a.destination)
  src.start(t)
}

// A major scale, for the "someone got it" dings that climb as more teams answer.
const SCALE = [523, 587, 659, 698, 784, 880, 988, 1047, 1175, 1319, 1397, 1568]

const SOUNDS = {
  // A team joins: a bubble.
  join: (a) => {
    tone(a, { freq: 420, to: 860, length: 0.12, type: 'sine', gain: 0.2 })
    tone(a, { freq: 860, to: 1300, start: 0.08, length: 0.12, type: 'sine', gain: 0.14 })
  },
  // An emoji card flips up.
  card: (a) => {
    noise(a, { length: 0.12, gain: 0.12 })
    tone(a, { freq: 880, start: 0.05, length: 0.12, type: 'sine', gain: 0.12 })
  },
  // The round starts.
  go: (a) => {
    ;[392, 523, 659].forEach((f, i) => tone(a, { freq: f, start: i * 0.09, length: 0.16 }))
    tone(a, { freq: 784, start: 0.27, length: 0.4, type: 'square', gain: 0.08 })
  },
  // The last five seconds.
  tick: (a) => tone(a, { freq: 1500, length: 0.05, type: 'square', gain: 0.06 }),
  tock: (a) => tone(a, { freq: 1100, length: 0.05, type: 'square', gain: 0.06 }),
  timeup: (a) => {
    tone(a, { freq: 180, length: 0.7, type: 'sawtooth', gain: 0.12 })
    tone(a, { freq: 186, length: 0.7, type: 'square', gain: 0.06 })
  },
  drum: (a) => {
    for (let i = 0; i < 20; i++) tone(a, { freq: 95, to: 62, start: i * 0.1, length: 0.08, type: 'sine', gain: 0.14 + i * 0.01 })
    noise(a, { start: 2.0, length: 0.5, gain: 0.2, from: 6000, to: 9000, type: 'highpass' })
  },
  reveal: (a) => {
    ;[523, 659, 784, 1047].forEach((f, i) => tone(a, { freq: f, start: i * 0.07, length: 0.5, gain: 0.16 }))
    tone(a, { freq: 1568, start: 0.3, length: 0.7, type: 'sine', gain: 0.1 })
  },
  whoosh: (a) => noise(a, { length: 0.35, gain: 0.14, from: 400, to: 2400 }),
  // A team locks in a guess: a padlock's clunk, the same for right and wrong.
  lock: (a) => {
    tone(a, { freq: 520, to: 360, length: 0.07, type: 'square', gain: 0.08 })
    noise(a, { start: 0.05, length: 0.06, gain: 0.12, from: 2500, to: 1200 })
    tone(a, { freq: 780, start: 0.08, length: 0.12, type: 'sine', gain: 0.1 })
  },
  fanfare: (a) => {
    const notes = [[523, 0], [523, 0.14], [523, 0.28], [698, 0.42], [880, 0.78], [784, 1.0], [1047, 1.2]]
    notes.forEach(([f, s], i) => tone(a, { freq: f, start: s, length: i === notes.length - 1 ? 1.1 : 0.22, type: 'square', gain: 0.07 }))
    notes.forEach(([f, s], i) => tone(a, { freq: f / 2, start: s, length: i === notes.length - 1 ? 1.1 : 0.22, gain: 0.12 }))
  },
}

/** Play a sound by name. `step` raises the "got it" ding up the scale. */
export function play(name, step = 0) {
  const a = audio()
  if (!a) return
  try {
    if (name === 'ding') {
      const f = SCALE[Math.min(step, SCALE.length - 1)]
      tone(a, { freq: f, length: 0.25, type: 'sine', gain: 0.2 })
      tone(a, { freq: f * 2, start: 0.04, length: 0.2, type: 'sine', gain: 0.07 })
    } else SOUNDS[name]?.(a)
  } catch { /* audio device gone */ }
}
