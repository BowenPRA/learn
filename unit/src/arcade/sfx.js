// src/arcade/sfx.js
//
// A tiny, dependency-free WebAudio sound-effects synthesiser for the arcade's
// mini-games (tower defense, swarm survivor). Every "sound" is a few
// oscillators and/or a filtered noise burst, described as DATA below and
// played by one generic interpreter — there is no sample library and nothing
// to load over the network.
//
// Two things this file is paranoid about, because it runs on class laptops
// during a live lesson:
//   - VOLUME. A single master gain keeps everything quiet by default, and
//     every effect is deliberately soft ("cute arcade", never harsh).
//   - RATE. Games like these can emit hundreds of hit/shoot events per
//     second. Each effect name has a minimum gap between plays, and there is
//     a hard cap on how many voices can sound at once, so a swarm of enemies
//     dying at the same instant doesn't turn into a wall of noise (or tank
//     the frame rate). `priority` effects (wave clears, level ups, game over)
//     are exempt from the voice cap so they're never the ones getting dropped.
//
// sfx() never throws: audio is decoration, and a missing/blocked
// AudioContext (autoplay policy, private browsing, an old browser) should
// just mean silence, not a crashed game.

const MUTE_KEY = 'arcade_sfx_muted';
const MAX_VOICES = 10;

/** All effect names this module knows how to play. */
export const SFX_NAMES = [
  'place', 'upgrade', 'sell', 'deny',
  'waveStart', 'waveClear', 'leak', 'boss',
  'shoot', 'hit', 'kill', 'boom', 'zap', 'freeze', 'beam',
  'pickup', 'powerup', 'heal', 'hurt', 'dash',
  'levelUp', 'correct', 'wrong', 'gameOver', 'click',
];

// Each effect is a list of layers played together (optionally staggered with
// `delay`), plus a minimum gap between repeats and whether it's exempt from
// the voice cap. A tone layer glides from f0 to f1 (or holds, if f1 is
// omitted) over `dur` seconds; a noise layer plays a filtered burst of the
// shared white-noise buffer.
const EFFECTS = {
  place: { minGap: 80, layers: [
    { type: 'sine', f0: 160, f1: 90, dur: 0.09, gain: 0.5 },
    { type: 'square', f0: 1200, dur: 0.03, gain: 0.12, delay: 0.05 },
  ] },
  upgrade: { minGap: 120, layers: [
    { type: 'triangle', f0: 520, f1: 780, dur: 0.09, gain: 0.35 },
    { type: 'triangle', f0: 780, f1: 1040, dur: 0.1, gain: 0.3, delay: 0.08 },
  ] },
  sell: { minGap: 120, layers: [
    { type: 'square', f0: 900, f1: 420, dur: 0.14, gain: 0.28 },
  ] },
  deny: { minGap: 150, layers: [
    { type: 'sawtooth', f0: 140, f1: 100, dur: 0.14, gain: 0.22 },
  ] },
  waveStart: { minGap: 300, layers: [
    { type: 'triangle', f0: 220, f1: 330, dur: 0.18, gain: 0.32 },
    { type: 'triangle', f0: 330, f1: 440, dur: 0.22, gain: 0.3, delay: 0.16 },
  ] },
  waveClear: { minGap: 300, priority: true, layers: [
    { type: 'triangle', f0: 523, dur: 0.12, gain: 0.3 },
    { type: 'triangle', f0: 659, dur: 0.12, gain: 0.3, delay: 0.1 },
    { type: 'triangle', f0: 784, dur: 0.2, gain: 0.32, delay: 0.2 },
  ] },
  leak: { minGap: 250, priority: true, layers: [
    { type: 'sine', f0: 220, f1: 60, dur: 0.3, gain: 0.4 },
  ] },
  boss: { minGap: 400, priority: true, layers: [
    { type: 'sawtooth', f0: 55, f1: 80, dur: 0.7, gain: 0.28 },
    { type: 'sine', f0: 50, dur: 0.7, gain: 0.3 },
  ] },
  shoot: { minGap: 110, layers: [
    { type: 'square', f0: 900, f1: 700, dur: 0.03, gain: 0.08 },
  ] },
  hit: { minGap: 110, layers: [
    { noise: true, dur: 0.04, gain: 0.12, filter: 'highpass', cutoff: 2500 },
  ] },
  kill: { minGap: 70, layers: [
    { type: 'sine', f0: 500, f1: 220, dur: 0.07, gain: 0.2 },
  ] },
  boom: { minGap: 150, layers: [
    { noise: true, dur: 0.22, gain: 0.32, filter: 'lowpass', cutoff: 900 },
    { type: 'sine', f0: 140, f1: 40, dur: 0.22, gain: 0.3 },
  ] },
  zap: { minGap: 100, layers: [
    { type: 'sawtooth', f0: 1600, f1: 300, dur: 0.09, gain: 0.22 },
  ] },
  freeze: { minGap: 150, layers: [
    { type: 'sine', f0: 1100, f1: 1600, dur: 0.16, gain: 0.18 },
    { type: 'sine', f0: 1300, f1: 1900, dur: 0.16, gain: 0.14, delay: 0.03 },
  ] },
  beam: { minGap: 250, priority: true, layers: [
    { type: 'sawtooth', f0: 300, f1: 900, dur: 0.25, gain: 0.22 },
    { type: 'sawtooth', f0: 900, f1: 250, dur: 0.25, gain: 0.2, delay: 0.25 },
  ] },
  pickup: { minGap: 45, layers: [
    { type: 'sine', f0: 1200, f1: 1700, dur: 0.06, gain: 0.22 },
  ] },
  powerup: { minGap: 180, layers: [
    { type: 'triangle', f0: 523, dur: 0.08, gain: 0.28 },
    { type: 'triangle', f0: 659, dur: 0.08, gain: 0.28, delay: 0.07 },
    { type: 'triangle', f0: 784, dur: 0.12, gain: 0.3, delay: 0.14 },
  ] },
  heal: { minGap: 150, layers: [
    { type: 'sine', f0: 440, f1: 560, dur: 0.14, gain: 0.26 },
    { type: 'sine', f0: 560, f1: 700, dur: 0.14, gain: 0.22, delay: 0.1 },
  ] },
  hurt: { minGap: 200, priority: true, layers: [
    { type: 'sawtooth', f0: 160, f1: 90, dur: 0.12, gain: 0.28 },
    { type: 'square', f0: 150, f1: 85, dur: 0.12, gain: 0.16 },
  ] },
  dash: { minGap: 120, layers: [
    { noise: true, dur: 0.14, gain: 0.2, filter: 'bandpass', cutoff: 1200 },
  ] },
  levelUp: { minGap: 350, priority: true, layers: [
    { type: 'triangle', f0: 392, dur: 0.1, gain: 0.3 },
    { type: 'triangle', f0: 523, dur: 0.1, gain: 0.3, delay: 0.09 },
    { type: 'triangle', f0: 659, dur: 0.1, gain: 0.3, delay: 0.18 },
    { type: 'triangle', f0: 784, dur: 0.18, gain: 0.34, delay: 0.27 },
  ] },
  correct: { minGap: 200, priority: true, layers: [
    { type: 'sine', f0: 880, dur: 0.08, gain: 0.28 },
    { type: 'sine', f0: 1175, dur: 0.12, gain: 0.28, delay: 0.08 },
  ] },
  wrong: { minGap: 200, priority: true, layers: [
    { type: 'sine', f0: 400, dur: 0.1, gain: 0.22 },
    { type: 'sine', f0: 300, dur: 0.16, gain: 0.2, delay: 0.1 },
  ] },
  gameOver: { minGap: 400, priority: true, layers: [
    { type: 'sine', f0: 392, dur: 0.2, gain: 0.28 },
    { type: 'sine', f0: 330, dur: 0.2, gain: 0.26, delay: 0.22 },
    { type: 'sine', f0: 262, dur: 0.36, gain: 0.26, delay: 0.44 },
  ] },
  click: { minGap: 60, layers: [
    { type: 'square', f0: 1000, dur: 0.02, gain: 0.1 },
  ] },
};

let ctx = null;
let masterGain = null;
let noiseBuffer = null;
let muted = false;
let muteLoaded = false;
let voiceCount = 0;
const lastPlayed = Object.create(null);

function loadMuted() {
  if (muteLoaded) return;
  muteLoaded = true;
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      muted = window.localStorage.getItem(MUTE_KEY) === '1';
    }
  } catch {
    // Private mode, disabled storage, etc — default stays unmuted.
  }
}

function saveMuted() {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem(MUTE_KEY, muted ? '1' : '0');
    }
  } catch {
    // Ignore — nothing we can do about it, and it isn't worth surfacing.
  }
}

export function isMuted() {
  loadMuted();
  return muted;
}

export function setMuted(value) {
  loadMuted();
  muted = !!value;
  saveMuted();
}

export function toggleMuted() {
  loadMuted();
  muted = !muted;
  saveMuted();
  return muted;
}

function getCtx() {
  if (ctx) return ctx;
  try {
    if (typeof window === 'undefined') return null;
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
    masterGain = ctx.createGain();
    masterGain.gain.value = 0.22;
    const compressor = ctx.createDynamicsCompressor();
    masterGain.connect(compressor);
    compressor.connect(ctx.destination);
  } catch {
    ctx = null;
    masterGain = null;
  }
  return ctx;
}

function getNoiseBuffer(audioCtx) {
  if (noiseBuffer) return noiseBuffer;
  const len = audioCtx.sampleRate;
  const buffer = audioCtx.createBuffer(1, len, audioCtx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < len; i++) data[i] = Math.random() * 2 - 1;
  noiseBuffer = buffer;
  return noiseBuffer;
}

/** Create/resume the shared AudioContext. Safe to call from any user gesture, repeatedly. */
export function unlockAudio() {
  try {
    const audioCtx = getCtx();
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume().catch(() => {});
    }
  } catch {
    // No-op — audio staying locked just means no sound this session.
  }
}

function playTone(audioCtx, dest, layer, pitch, volume, when) {
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type = layer.type;
  const f0 = layer.f0 * pitch;
  const start = when + (layer.delay || 0);
  const end = start + layer.dur;
  osc.frequency.setValueAtTime(Math.max(1, f0), start);
  if (layer.f1 != null) {
    osc.frequency.exponentialRampToValueAtTime(Math.max(1, layer.f1 * pitch), end);
  }
  const peak = Math.max(0.0001, layer.gain * volume);
  gain.gain.setValueAtTime(0.0001, start);
  gain.gain.exponentialRampToValueAtTime(peak, start + Math.min(0.015, layer.dur / 3));
  gain.gain.exponentialRampToValueAtTime(0.0001, end);
  osc.connect(gain);
  gain.connect(dest);
  voiceCount++;
  osc.onended = () => {
    voiceCount = Math.max(0, voiceCount - 1);
    try { osc.disconnect(); gain.disconnect(); } catch { /* already gone */ }
  };
  osc.start(start);
  osc.stop(end + 0.02);
}

function playNoise(audioCtx, dest, layer, volume, when) {
  const source = audioCtx.createBufferSource();
  source.buffer = getNoiseBuffer(audioCtx);
  const filter = audioCtx.createBiquadFilter();
  filter.type = layer.filter;
  filter.frequency.value = layer.cutoff;
  const gain = audioCtx.createGain();
  const start = when + (layer.delay || 0);
  const end = start + layer.dur;
  const peak = Math.max(0.0001, layer.gain * volume);
  gain.gain.setValueAtTime(0.0001, start);
  gain.gain.exponentialRampToValueAtTime(peak, start + Math.min(0.01, layer.dur / 3));
  gain.gain.exponentialRampToValueAtTime(0.0001, end);
  source.connect(filter);
  filter.connect(gain);
  gain.connect(dest);
  voiceCount++;
  source.onended = () => {
    voiceCount = Math.max(0, voiceCount - 1);
    try { source.disconnect(); filter.disconnect(); gain.disconnect(); } catch { /* already gone */ }
  };
  source.start(start);
  source.stop(end + 0.02);
}

/**
 * Play a named effect. `opts.volume` (0..1 multiplier, default 1) and
 * `opts.pitch` (frequency multiplier, default 1) are optional. Unknown names
 * are silently ignored. Never throws.
 */
export function sfx(name, opts) {
  try {
    loadMuted();
    if (muted) return;
    const effect = EFFECTS[name];
    if (!effect) return;

    const now = (typeof performance !== 'undefined' ? performance.now() : Date.now());
    const last = lastPlayed[name] || 0;
    if (now - last < effect.minGap) return;

    if (!effect.priority && voiceCount >= MAX_VOICES) return;

    const audioCtx = getCtx();
    if (!audioCtx || !masterGain) return;
    if (audioCtx.state === 'suspended') {
      audioCtx.resume().catch(() => {});
    }

    lastPlayed[name] = now;
    const volume = opts && typeof opts.volume === 'number' ? opts.volume : 1;
    const pitch = opts && typeof opts.pitch === 'number' ? opts.pitch : 1;
    const when = audioCtx.currentTime;

    for (const layer of effect.layers) {
      if (layer.noise) {
        playNoise(audioCtx, masterGain, layer, volume, when);
      } else {
        playTone(audioCtx, masterGain, layer, pitch, volume, when);
      }
    }
  } catch {
    // Audio is decoration — never let it break the game.
  }
}
