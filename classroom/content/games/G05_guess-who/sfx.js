// content/games/G05_guess-who/sfx.js
// The board's sounds, made on the spot with Web Audio, so there are no files to
// fetch or credit (copied from BowenPRA/classroom src/guess-who/sfx.js). Each
// one is short and carries over a noisy room. Browsers start audio only after
// a tap or key on the page, which the start screen's buttons supply.

const MUTE_KEY = 'learn:guess-who:muted'
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

/** Wake the audio from a user gesture, so later sounds from the phone can play. */
export const unlockAudio = () => { audio() }

function tone(a, { freq, to = freq, start = 0, length = 0.2, type = 'triangle', gain = 0.25 }) {
  const t = a.currentTime + start
  const osc = a.createOscillator()
  const g = a.createGain()
  osc.type = type
  osc.frequency.setValueAtTime(freq, t)
  if (to !== freq) osc.frequency.exponentialRampToValueAtTime(to, t + length)
  g.gain.setValueAtTime(0.0001, t)
  g.gain.exponentialRampToValueAtTime(gain, t + 0.015)
  g.gain.exponentialRampToValueAtTime(0.0001, t + length)
  osc.connect(g).connect(a.destination)
  osc.start(t)
  osc.stop(t + length + 0.05)
}

function whoosh(a, { start = 0, length = 0.16, gain = 0.18 } = {}) {
  const t = a.currentTime + start
  const buffer = a.createBuffer(1, Math.ceil(a.sampleRate * length), a.sampleRate)
  const data = buffer.getChannelData(0)
  for (let i = 0; i < data.length; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / data.length)
  const src = a.createBufferSource()
  src.buffer = buffer
  const filter = a.createBiquadFilter()
  filter.type = 'bandpass'
  filter.frequency.setValueAtTime(900, t)
  filter.frequency.exponentialRampToValueAtTime(3000, t + length)
  const g = a.createGain()
  g.gain.value = gain
  src.connect(filter).connect(g).connect(a.destination)
  src.start(t)
}

const SOUNDS = {
  flip: (a) => whoosh(a),
  ask: (a) => {
    tone(a, { freq: 660, length: 0.1, type: 'sine', gain: 0.18 })
    tone(a, { freq: 990, start: 0.09, length: 0.18, type: 'sine', gain: 0.15 })
  },
  deal: (a) => { for (let i = 0; i < 6; i++) whoosh(a, { start: i * 0.07, length: 0.1, gain: 0.12 }) },
  yes: (a) => {
    tone(a, { freq: 523, length: 0.16 })
    tone(a, { freq: 784, start: 0.12, length: 0.32 })
  },
  no: (a) => {
    tone(a, { freq: 220, to: 150, length: 0.45, type: 'sawtooth', gain: 0.14 })
    tone(a, { freq: 233, to: 156, length: 0.45, type: 'square', gain: 0.06 })
  },
  again: (a) => {
    tone(a, { freq: 440, to: 330, length: 0.14 })
    tone(a, { freq: 440, to: 330, start: 0.16, length: 0.14 })
  },
  drum: (a) => {
    for (let i = 0; i < 18; i++) tone(a, { freq: 90, to: 60, start: i * 0.12, length: 0.09, type: 'sine', gain: 0.18 + i * 0.012 })
  },
  win: (a) => {
    ;[523, 659, 784, 1047].forEach((f, i) => tone(a, { freq: f, start: i * 0.11, length: 0.3 }))
    tone(a, { freq: 1568, start: 0.5, length: 0.6, type: 'sine', gain: 0.12 })
  },
  lose: (a) => {
    ;[392, 370, 349].forEach((f, i) => tone(a, { freq: f, start: i * 0.32, length: 0.3, type: 'sawtooth', gain: 0.1 }))
    tone(a, { freq: 330, to: 196, start: 0.96, length: 0.9, type: 'sawtooth', gain: 0.12 })
  },
}

export function play(name) {
  const a = audio()
  if (a && SOUNDS[name]) {
    try { SOUNDS[name](a) } catch { /* audio device gone */ }
  }
}
