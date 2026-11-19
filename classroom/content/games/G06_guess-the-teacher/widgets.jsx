// content/games/G06_guess-the-teacher/widgets.jsx
// Guess the Teacher on the TV. Families scan the QR code and join as teams on
// their phones (phone.jsx); the TV shows five emojis that describe a teacher,
// one every three seconds, and the teams type the teacher's name. The sooner
// a right answer lands, the more it is worth (1000 down to 100; the last round
// counts double). A leaderboard runs down the side the whole way through.
//
//   lobby   QR code, room code, teams popping in as they join, Start
//   intro   "Round 2 of 5"
//   round   the emoji cards flip up one by one, the clock, who has it so far
//   reveal  a drumroll, the teacher's name, the fastest team, confetti
//   board   the leaderboard sliding into its new order, points counting up
//   final   the podium, with a fanfare
//
// The TV owns the game (rules.js) and judges every guess (match.js); the
// phones send what was typed and are told right or wrong. Phones talk to the
// TV over the same wire as the decks' phone remote (src/lib/remote/bus.js),
// which stores nothing. Keys: Space or Enter for the next step, P to pause,
// M for sound.
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Home, Pause, Play, Plus, RotateCcw, SkipForward, Users, Volume2, VolumeX, WifiOff } from 'lucide-react'
import { QrCode } from '../../../src/lib/remote/QrCode.jsx'
import { openBus } from '../../../src/lib/remote/bus.js'
import { keptRoom } from '../../../src/lib/remote/room.js'
import { PLAYABLE, TEACHERS } from './teachers.js'
import { Avatar, BASE_CSS, Backdrop, Confetti } from './look.jsx'
import { INTRO_MS, LOCK_MS, MEDALS, SUSPENSE_MS, TOPIC, loadFont, ordinal, pointsFor, shownAt } from './protocol.js'
import { check, elapsedOf, isDouble, leftOf, loadGame, publicState, ranked, reduce, saveGame, shuffled, teacherOf } from './rules.js'
import { isMuted, play, setMuted, unlockAudio } from './sfx.js'

const ROOM_KEY = 'learn:teacher-game:room'
// The leaderboard's row heights, in the scene's unit (1% of its height).
const RAIL_ROW = 6.9
const BOARD_ROW = 7.6
const RAIL_MAX = 9
const BOARD_MAX = 8
// The board waits this long before the rows slide to their new places.
const BOARD_HOLD_MS = 900
const BOARD_COUNT_MS = 1400

const U = (n) => `calc(var(--u) * ${n})`

const TV_CSS = `
.gt-tv { container-type: size; flex: 1 1 0; min-height: 0; display: flex; flex-direction: column; user-select: none }
.gt-in { --u: min(1cqh, .5625cqw); position: relative; z-index: 1; flex: 1; min-height: 0; display: flex; flex-direction: column;
  gap: ${U(1.4)}; padding: ${U(2.4)} ${U(3.4)} ${U(2)} }
.gt-vn { font-weight: 600; color: #c7d2fe; opacity: .9 }
.gt-main { flex: 1; min-height: 0; position: relative }

.gt-top { display: flex; align-items: center; gap: ${U(1.4)}; height: ${U(6)}; padding-right: ${U(16)}; flex: none }
.gt-logo { font-size: ${U(3.8)} }
.gt-pill { display: inline-flex; align-items: center; gap: ${U(.6)}; padding: ${U(.5)} ${U(1.8)}; border-radius: 999px; font-weight: 700; font-size: ${U(2.4)};
  background: rgba(255,255,255,.12); border: 1px solid rgba(255,255,255,.2) }
.gt-pill-hot { background: #fde047; color: #4c1d95; border-color: #fde047 }

.gt-bottom { display: flex; align-items: flex-end; justify-content: space-between; gap: ${U(2)}; flex: none; min-height: ${U(7)} }
.gt-host { display: flex; align-items: center; gap: ${U(1)}; flex-wrap: wrap; justify-content: flex-end }
.gt-btn { display: inline-flex; align-items: center; gap: ${U(.8)}; font-size: ${U(2.2)}; font-weight: 700; line-height: 1; padding: ${U(1.1)} ${U(1.8)};
  border-radius: ${U(1.6)}; background: rgba(255,255,255,.12); color: #fff; border: 1px solid rgba(255,255,255,.22); cursor: pointer;
  transition: background .15s, transform .1s }
.gt-btn:hover { background: rgba(255,255,255,.22) }
.gt-btn:active { transform: translateY(2px) }
.gt-btn svg { width: ${U(2.5)}; height: ${U(2.5)}; flex: none }
.gt-btn kbd { font-family: inherit; font-size: ${U(1.5)}; font-weight: 700; padding: ${U(.2)} ${U(.6)}; border-radius: ${U(.5)}; border: 1px solid currentColor; opacity: .6 }
.gt-btn-go { background: #fde047; color: #3b0764; border-color: #fde047; box-shadow: 0 ${U(.5)} 0 #b45309; font-size: ${U(2.6)}; padding: ${U(1.2)} ${U(2.6)} }
.gt-btn-go:hover { background: #fef08a }
.gt-btn:disabled { opacity: .45; cursor: not-allowed; animation: none }
.gt-btn-go:active { transform: translateY(${U(.5)}); box-shadow: none }
.gt-btn-big { font-size: ${U(3.4)}; padding: ${U(1.6)} ${U(3.6)}; border-radius: ${U(2.2)}; animation: gt-glow 2s ease-in-out infinite }
.gt-btn-big svg { width: ${U(3.4)}; height: ${U(3.4)} }

.gt-joinchip { display: flex; align-items: center; gap: ${U(1.3)}; background: #fff; color: #1e1b4b; border-radius: ${U(1.8)}; padding: ${U(.7)} ${U(1.8)} ${U(.7)} ${U(.7)};
  box-shadow: 0 ${U(.5)} 0 #a5b4fc }
.gt-joinchip svg.qr { width: ${U(8)}; height: ${U(8)}; flex: none }
.gt-joinchip b { display: block; font-size: ${U(1.9)}; font-weight: 700; color: #4b5563; line-height: 1.1 }
.gt-joinchip strong { display: block; font-size: ${U(3.2)}; font-weight: 800; letter-spacing: .12em; color: #4338ca; line-height: 1.05 }
.gt-offline { display: inline-flex; align-items: center; gap: ${U(.8)}; background: #dc2626; color: #fff; font-weight: 700; font-size: ${U(2)};
  padding: ${U(.8)} ${U(1.6)}; border-radius: ${U(1.4)} }
.gt-offline svg { width: ${U(2.4)}; height: ${U(2.4)} }

/* Lobby */
.gt-lobby { display: grid; grid-template-columns: 47% 1fr; gap: ${U(3.6)}; height: 100% }
.gt-lobby-left { display: flex; flex-direction: column; gap: ${U(2.4)}; min-height: 0; justify-content: center }
.gt-hero { font-size: ${U(8.2)}; white-space: nowrap }
.gt-hero .gt-bob { font-size: .9em; margin-left: .1em }
.gt-tag { font-size: ${U(2.7)}; font-weight: 600; color: #e0e7ff; margin-top: ${U(1)} }
.gt-join { display: flex; align-items: center; gap: ${U(2.8)}; background: #fff; color: #1e1b4b; border-radius: ${U(3)}; padding: ${U(2.4)};
  box-shadow: 0 ${U(.8)} 0 #a5b4fc, 0 ${U(2)} ${U(4)} rgba(0,0,0,.3) }
.gt-join svg.qr { width: ${U(26)}; height: ${U(26)}; flex: none }
.gt-scan { font-size: ${U(4.4)}; font-weight: 800; color: #4338ca; line-height: 1 }
.gt-join .gt-vn { color: #6b7280; font-size: ${U(2.2)}; margin-top: ${U(.4)} }
.gt-or { font-size: ${U(2.1)}; font-weight: 600; color: #6b7280; margin-top: ${U(2)} }
.gt-url { font-size: ${U(2.7)}; font-weight: 800; color: #1e1b4b; line-height: 1.1 }
.gt-code { display: flex; gap: ${U(.8)}; margin-top: ${U(1)} }
.gt-code span { width: ${U(6.2)}; height: ${U(7.4)}; display: flex; align-items: center; justify-content: center; border-radius: ${U(1.2)};
  background: #eef2ff; color: #4338ca; font-size: ${U(5.2)}; font-weight: 800; box-shadow: inset 0 ${U(-.5)} 0 #c7d2fe }
.gt-steps { display: grid; gap: ${U(1.2)} }
.gt-step { display: flex; align-items: center; gap: ${U(1.6)} }
.gt-step i { font-style: normal; width: ${U(5.8)}; height: ${U(5.8)}; flex: none; border-radius: 999px; background: rgba(255,255,255,.13);
  display: flex; align-items: center; justify-content: center; font-size: ${U(3)} }
.gt-step b { display: block; font-size: ${U(2.5)}; font-weight: 700; line-height: 1.15 }
.gt-step .gt-vn { display: block; font-size: ${U(1.9)}; line-height: 1.2 }

.gt-teams { display: flex; flex-direction: column; min-height: 0; background: rgba(9,6,40,.38); border: 1px solid rgba(255,255,255,.12);
  border-radius: ${U(3)}; padding: ${U(2.4)} }
.gt-teams-head { display: flex; align-items: center; gap: ${U(1.2)}; font-size: ${U(3.4)}; font-weight: 800; margin-bottom: ${U(1.6)} }
.gt-count { min-width: ${U(4.6)}; padding: 0 ${U(1)}; height: ${U(4.6)}; border-radius: 999px; background: #fde047; color: #3b0764;
  display: inline-flex; align-items: center; justify-content: center; font-size: ${U(2.8)} }
.gt-team-grid { flex: 1; min-height: 0; overflow: hidden; display: flex; flex-wrap: wrap; align-content: flex-start; gap: ${U(1.2)} }
.gt-team { --t: ${U(2.6)}; position: relative; display: inline-flex; align-items: center; gap: calc(var(--t) * .4); max-width: 100%;
  padding: calc(var(--t) * .22) calc(var(--t) * .7) calc(var(--t) * .22) calc(var(--t) * .22); border-radius: 999px; background: #fff; color: #1e1b4b;
  font-size: var(--t); font-weight: 700; line-height: 1.1; box-shadow: 0 calc(var(--t) * .15) 0 rgba(0,0,0,.2) }
.gt-team.mid { --t: ${U(2.1)} }
.gt-team.small { --t: ${U(1.75)} }
.gt-team > span:last-of-type { overflow: hidden; text-overflow: ellipsis; white-space: nowrap }
.gt-x { position: absolute; top: -.35em; right: -.35em; width: 1.3em; height: 1.3em; border-radius: 999px; border: none; background: #dc2626; color: #fff;
  font-size: .8em; font-weight: 800; line-height: 1; cursor: pointer; display: none; align-items: center; justify-content: center }
.gt-team:hover .gt-x, .gt-brow:hover .gt-x { display: inline-flex }
.gt-waiting { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; gap: ${U(1)}; color: #c7d2fe }
.gt-waiting b { font-size: ${U(3.4)}; color: #fff }
.gt-waiting span { font-size: ${U(2.2)} }
.gt-waiting .gt-dots { font-size: ${U(5)}; letter-spacing: .2em }
.gt-start { display: flex; align-items: center; justify-content: space-between; gap: ${U(2)}; margin-top: ${U(2)} }
.gt-start p { font-size: ${U(2)}; font-weight: 600; color: #c7d2fe; margin: 0 }

/* Intro */
.gt-intro { height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center }
.gt-intro-word { font-size: ${U(4.4)}; font-weight: 800; letter-spacing: .3em; color: #c7d2fe; text-transform: uppercase }
.gt-intro-num { font-size: ${U(30)}; line-height: .9 }
.gt-intro-of { font-size: ${U(4)}; font-weight: 700; color: #e0e7ff }
.gt-intro-ready { font-size: ${U(3.4)}; font-weight: 700; margin-top: ${U(3)} }
.gt-intro .gt-vn { font-size: ${U(2.3)} }
.gt-double { margin-top: ${U(2.4)}; font-size: ${U(4.6)}; font-weight: 800; color: #3b0764; background: linear-gradient(90deg, #fde047, #f472b6);
  padding: ${U(.8)} ${U(3.2)}; border-radius: ${U(2)}; transform: rotate(-3deg); box-shadow: 0 ${U(.6)} 0 #9d174d }

/* Round and reveal */
.gt-play { display: grid; grid-template-columns: 1fr ${U(44)}; gap: ${U(3)}; height: 100% }
.gt-stage { position: relative; display: flex; flex-direction: column; align-items: center; justify-content: space-evenly; gap: ${U(1.6)}; min-height: 0; min-width: 0 }
.gt-q { text-align: center; font-size: ${U(4.6)}; font-weight: 800; line-height: 1 }
.gt-q .gt-vn { display: block; font-size: ${U(2.3)}; margin-top: ${U(.6)} }
.gt-cards { display: grid; grid-template-columns: repeat(5, 1fr); gap: ${U(2)}; width: 100%; max-width: ${U(135)} }
.gt-cards.small { max-width: ${U(88)}; gap: ${U(1.4)} }
.gt-slot { aspect-ratio: 1 / 1.08; perspective: 1200px; position: relative }
.gt-flip { position: absolute; inset: 0; transform-style: preserve-3d; transition: transform .75s cubic-bezier(.3,1.4,.5,1) }
.gt-flip.down { transform: rotateY(180deg) }
.gt-face, .gt-back { position: absolute; inset: 0; border-radius: ${U(2.6)}; backface-visibility: hidden; -webkit-backface-visibility: hidden;
  display: flex; align-items: center; justify-content: center }
.gt-face { background: #fff; box-shadow: 0 ${U(.8)} 0 #c7d2fe, 0 ${U(1.6)} ${U(3)} rgba(0,0,0,.3); font-size: ${U(13.5)}; line-height: 1 }
.gt-cards.small .gt-face { font-size: ${U(8.6)}; border-radius: ${U(2)} }
.gt-back { transform: rotateY(180deg); background: linear-gradient(145deg, #8b5cf6, #4f46e5); border: ${U(.5)} solid rgba(255,255,255,.28);
  color: rgba(255,255,255,.6); font-size: ${U(10)}; font-weight: 800; box-shadow: 0 ${U(.8)} 0 #312e81 }
.gt-cards.small .gt-back { font-size: ${U(6)}; border-radius: ${U(2)} }
.gt-clock { display: flex; align-items: center; justify-content: center; gap: ${U(4)}; width: 100% }
.gt-ring { position: relative; width: ${U(17)}; height: ${U(17)}; flex: none }
.gt-ring svg { width: 100%; height: 100%; transform: rotate(-90deg) }
.gt-ring circle { fill: none; stroke-width: 9 }
.gt-ring .track { stroke: rgba(255,255,255,.14) }
.gt-ring .bar { stroke-linecap: round; transition: stroke-dashoffset .12s linear, stroke .3s }
.gt-ring b { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; font-size: ${U(7)}; font-weight: 800;
  font-variant-numeric: tabular-nums }
.gt-worth { text-align: left }
.gt-worth small { display: block; font-size: ${U(1.9)}; font-weight: 700; letter-spacing: .14em; text-transform: uppercase; color: #c7d2fe }
.gt-worth b { display: block; font-size: ${U(6.4)}; font-weight: 800; color: #fde047; line-height: 1; font-variant-numeric: tabular-nums }
.gt-worth span { font-size: ${U(2.2)}; font-weight: 700; color: #e0e7ff }
.gt-have { width: ${U(34)} }
.gt-have b { display: block; font-size: ${U(3)}; font-weight: 800; line-height: 1.1 }
.gt-have .gt-vn { display: block; font-size: ${U(1.9)}; margin-bottom: ${U(1)} }
.gt-bar { height: ${U(1.6)}; border-radius: 999px; background: rgba(255,255,255,.14); overflow: hidden }
.gt-bar i { display: block; height: 100%; border-radius: 999px; background: linear-gradient(90deg, #34d399, #a3e635); transition: width .5s cubic-bezier(.3,1.3,.5,1) }
.gt-strip { display: flex; flex-wrap: wrap; justify-content: center; gap: ${U(.8)}; max-height: ${U(10.6)}; overflow: hidden; width: 100% }
.gt-strip .gt-avatar { opacity: .32; filter: grayscale(1); transition: opacity .3s, filter .3s }
.gt-strip .gt-avatar.got { opacity: 1; filter: none; box-shadow: 0 0 0 ${U(.4)} #34d399, 0 ${U(.3)} ${U(1)} rgba(0,0,0,.3); animation: gt-pop .45s cubic-bezier(.2,.9,.3,1.3) both }
.gt-paused { position: absolute; inset: 0; z-index: 5; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: ${U(1)};
  background: rgba(13,8,51,.72); backdrop-filter: blur(6px); border-radius: ${U(3)} }
.gt-paused .gt-title { font-size: ${U(11)} }
.gt-paused span { font-size: ${U(2.6)}; font-weight: 700; color: #e0e7ff }
.gt-suspense { font-size: ${U(6)}; font-weight: 800; text-align: center }
.gt-answer { font-size: ${U(13)}; text-align: center; line-height: 1 }
.gt-answer-wrap { display: flex; flex-direction: column; align-items: center; gap: ${U(1)} }
.gt-answer-wrap > small { font-size: ${U(2.6)}; font-weight: 700; letter-spacing: .2em; text-transform: uppercase; color: #c7d2fe }
.gt-stats { display: flex; flex-wrap: wrap; justify-content: center; gap: ${U(1.4)} }
.gt-stat { display: inline-flex; align-items: center; gap: ${U(.8)}; background: #fff; color: #1e1b4b; font-size: ${U(2.5)}; font-weight: 700;
  padding: ${U(.8)} ${U(1.8)}; border-radius: 999px; box-shadow: 0 ${U(.4)} 0 #a5b4fc }

/* The live leaderboard down the side */
.gt-rail { display: flex; flex-direction: column; min-height: 0; background: rgba(9,6,40,.42); border: 1px solid rgba(255,255,255,.12);
  border-radius: ${U(3)}; padding: ${U(2)} }
.gt-rail-head { font-size: ${U(2.9)}; font-weight: 800; margin-bottom: ${U(1.4)}; display: flex; align-items: center; gap: ${U(1)} }
.gt-rows { position: relative; flex: none }
.gt-row { position: absolute; left: 0; right: 0; top: 0; height: ${U(RAIL_ROW - 0.7)}; display: flex; align-items: center; gap: ${U(1)};
  padding: 0 ${U(1.2)}; border-radius: ${U(1.6)}; background: rgba(255,255,255,.09); font-size: ${U(2.4)}; font-weight: 700;
  transition: transform .8s cubic-bezier(.3,1.2,.4,1), background .3s }
.gt-row.lead { background: rgba(253,224,71,.17); box-shadow: inset 0 0 0 1px rgba(253,224,71,.5) }
.gt-row .rk { width: ${U(3.4)}; text-align: center; flex: none; color: #c7d2fe; font-variant-numeric: tabular-nums }
.gt-row .nm { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap }
.gt-row .sc { font-weight: 800; font-variant-numeric: tabular-nums }
.gt-plus { flex: none; font-size: ${U(1.8)}; font-weight: 800; color: #064e3b; background: #34d399; padding: ${U(.25)} ${U(.8)}; border-radius: 999px }
.gt-more { margin-top: auto; padding-top: ${U(1)}; font-size: ${U(2)}; font-weight: 700; color: #c7d2fe; text-align: center }
.gt-rail-empty { font-size: ${U(2.2)}; color: #c7d2fe; font-weight: 600 }

/* The leaderboard between rounds */
.gt-board { height: 100%; width: 100%; max-width: ${U(118)}; margin: 0 auto; display: flex; flex-direction: column; align-items: stretch }
.gt-board-head { text-align: center; margin-bottom: ${U(2)} }
.gt-board-head .gt-title { font-size: ${U(7)} }
.gt-board-head p { margin: ${U(.8)} 0 0; font-size: ${U(2.6)}; font-weight: 700; color: #c7d2fe }
.gt-brows { position: relative; flex: none }
.gt-brow { position: absolute; left: 0; right: 0; top: 0; height: ${U(BOARD_ROW - 0.9)}; display: flex; align-items: center; gap: ${U(1.6)};
  padding: 0 ${U(2)} 0 ${U(1)}; border-radius: ${U(2)}; background: #fff; color: #1e1b4b; font-size: ${U(3)}; font-weight: 700;
  box-shadow: 0 ${U(.5)} 0 #a5b4fc; transition: transform 1s cubic-bezier(.3,1.25,.4,1), opacity .5s }
.gt-brow.first { background: linear-gradient(90deg, #fef9c3, #fde68a); box-shadow: 0 ${U(.5)} 0 #d97706 }
.gt-brow .rk { width: ${U(5.2)}; height: ${U(5.2)}; flex: none; border-radius: 999px; display: flex; align-items: center; justify-content: center;
  background: #eef2ff; color: #4338ca; font-weight: 800; font-size: ${U(2.8)} }
.gt-brow .rk.medal { background: none; font-size: ${U(4.4)} }
.gt-brow .nm { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap }
.gt-climb { flex: none; font-size: ${U(2.1)}; font-weight: 800; color: #047857; background: #d1fae5; padding: ${U(.3)} ${U(1)}; border-radius: 999px }
.gt-gain { flex: none; font-size: ${U(2.2)}; font-weight: 800; color: #064e3b; background: #6ee7b7; padding: ${U(.3)} ${U(1)}; border-radius: 999px }
.gt-gain.zero { color: #6b7280; background: #e5e7eb }
.gt-brow .sc { width: ${U(13)}; text-align: right; font-size: ${U(3.6)}; font-weight: 800; color: #4338ca; font-variant-numeric: tabular-nums }

/* Final */
.gt-final { height: 100%; display: flex; flex-direction: column; align-items: center }
.gt-final-head { font-size: ${U(7.6)}; text-align: center }
.gt-podium { flex: 1; min-height: 0; width: 100%; display: flex; align-items: flex-end; justify-content: center; gap: ${U(2.4)} }
.gt-place { width: ${U(32)}; display: flex; flex-direction: column; align-items: center; animation: gt-up .9s cubic-bezier(.2,1.1,.3,1) both }
.gt-place .who { display: flex; flex-direction: column; align-items: center; gap: ${U(.6)}; margin-bottom: ${U(1.4)}; max-width: 100%; text-align: center }
.gt-place .crown { font-size: ${U(6)}; line-height: 1; margin-bottom: ${U(-1.4)}; position: relative; z-index: 1 }
.gt-place .nm { font-size: ${U(3.4)}; font-weight: 800; max-width: 100%; overflow: hidden; text-overflow: ellipsis; white-space: nowrap }
.gt-place .sc { font-size: ${U(2.6)}; font-weight: 700; color: #fde047; font-variant-numeric: tabular-nums }
.gt-block { width: 100%; border-radius: ${U(2)} ${U(2)} 0 0; display: flex; justify-content: center; padding-top: ${U(1.4)};
  font-size: ${U(8)}; font-weight: 800; color: rgba(0,0,0,.28); box-shadow: inset 0 ${U(.8)} 0 rgba(255,255,255,.45) }
.gt-rest { display: flex; flex-wrap: wrap; justify-content: center; gap: ${U(1)}; margin-top: ${U(1.6)} }
.gt-rest span { display: inline-flex; align-items: center; gap: ${U(.7)}; font-size: ${U(2.2)}; font-weight: 700; background: rgba(255,255,255,.12);
  padding: ${U(.5)} ${U(1.4)} ${U(.5)} ${U(.6)}; border-radius: 999px }
@keyframes gt-up { 0% { opacity: 0; transform: translateY(40%) } 100% { opacity: 1; transform: none } }
`

/** The TV. Windowed or in Project mode, the scene sizes itself to the slide (container units). */
export function TeacherGame() {
  const [room] = useState(() => keptRoom(ROOM_KEY))
  const [game, setGame] = useState(loadGame)
  const gameRef = useRef(game)
  const [now, setNow] = useState(() => Date.now())
  const [net, setNet] = useState('connecting')
  const [muted, setMutedState] = useState(isMuted)
  const [burst, setBurst] = useState(0)
  const busRef = useRef(null)
  const sendTimer = useRef(null)
  const endTimer = useRef(null)
  const cueTimers = useRef([])
  // What the clock last announced, so each sound plays once.
  const heard = useRef({ shown: 0, sec: 0 })

  const joinUrl = useMemo(() => `${window.location.origin}${import.meta.env.BASE_URL}classroom/#/play/${room}`, [room])
  const joinText = useMemo(() => `${window.location.host}/play`, [])

  // The sounds and confetti that go with a new step. Called from apply, so a
  // reload of a game in progress stays quiet.
  const cue = useCallback((g) => {
    cueTimers.current.forEach(clearTimeout)
    cueTimers.current = []
    const later = (ms, fn) => cueTimers.current.push(setTimeout(fn, ms))
    if (g.phase === 'intro') play('whoosh')
    else if (g.phase === 'round') {
      heard.current = { shown: 1, sec: 0 }
      play('go')
      later(150, () => play('card'))
    } else if (g.phase === 'reveal') {
      later(450, () => play('drum'))
      later(SUSPENSE_MS, () => { play('reveal'); setBurst((b) => b + 1) })
    } else if (g.phase === 'board') play('whoosh')
    else if (g.phase === 'final') {
      later(250, () => play('drum'))
      later(2200, () => play('fanfare'))
    }
  }, [])

  const apply = useCallback((action) => {
    const t = Date.now()
    const before = gameRef.current
    const next = reduce(before, { now: t, ...action })
    if (next !== before) {
      gameRef.current = next
      setGame(next)
      setNow(t)
      if (next.phase !== before.phase || next.r !== before.r) cue(next)
    }
    return next
  }, [cue])

  useEffect(() => { loadFont() }, [])
  useEffect(() => { saveGame(game) }, [game])
  useEffect(() => () => {
    cueTimers.current.forEach(clearTimeout)
    clearTimeout(endTimer.current)
    clearTimeout(sendTimer.current)
  }, [])

  // Every change goes out to the phones, a few at a time.
  const sendState = useCallback(() => {
    clearTimeout(sendTimer.current)
    sendTimer.current = setTimeout(() => busRef.current?.send('state', publicState(gameRef.current, Date.now())), 120)
  }, [])
  useEffect(() => { sendState() }, [game, sendState])
  // And again every few seconds, for a phone that missed one.
  useEffect(() => {
    const t = setInterval(() => busRef.current?.send('state', publicState(gameRef.current, Date.now())), 6000)
    return () => clearInterval(t)
  }, [])

  const endRound = useCallback(() => {
    clearTimeout(endTimer.current)
    apply({ type: 'end' })
  }, [apply])

  const onMessage = useCallback((msg) => {
    const g = gameRef.current
    if (msg.type === 'hello') {
      if (g.removed.includes(msg.pid)) {
        busRef.current?.send('kick', { to: msg.pid })
        return
      }
      const next = apply({ type: 'hello', pid: msg.pid, name: msg.name, avatar: msg.avatar })
      if (next.players.length > g.players.length) play('join')
      sendState()
    } else if (msg.type === 'guess') {
      const t = Date.now()
      const res = check(g, msg.pid, msg.no, msg.text, t)
      if (res.ignore) return
      const next = apply({ type: 'guessed', pid: msg.pid, ok: res.ok, pts: res.pts, ms: res.ms, other: res.other, now: t })
      busRef.current?.send('verdict', { to: msg.pid, no: msg.no, ok: res.ok, pts: res.pts, lock: res.ok ? 0 : LOCK_MS })
      if (res.ok) {
        const got = Object.keys(next.round.results).length
        play('ding', got - 1)
        // Everyone has it: a moment to enjoy that, then the reveal.
        if (got >= next.players.length) {
          clearTimeout(endTimer.current)
          endTimer.current = setTimeout(endRound, 1400)
        }
      }
    }
  }, [apply, sendState, endRound])

  useEffect(() => {
    const bus = openBus(TOPIC(room), 'tv', (m) => onMessage(m), (status) => {
      setNet(status)
      if (status === 'live') sendState()
    })
    busRef.current = bus
    return () => {
      bus.close()
      busRef.current = null
    }
  }, [room, onMessage, sendState])

  // The clock: ten times a second during play. Time up ends the round; the
  // cards and the last five seconds make their sounds from here.
  const fast = game.phase !== 'lobby'
  const every = game.phase === 'board' ? 50 : 100
  useEffect(() => {
    const t = setInterval(() => {
      const tnow = Date.now()
      setNow(tnow)
      const g = gameRef.current
      if (g.phase !== 'round' || !g.round?.runFrom) return
      const left = leftOf(g.round, tnow)
      const shown = shownAt(elapsedOf(g.round, tnow))
      if (shown > heard.current.shown) {
        heard.current.shown = shown
        play('card')
      }
      const sec = Math.ceil(left / 1000)
      if (sec <= 5 && sec >= 1 && sec !== heard.current.sec) {
        heard.current.sec = sec
        play(sec % 2 ? 'tick' : 'tock')
      }
      if (left <= 0) {
        play('timeup')
        endRound()
      }
    }, fast ? every : 1000)
    return () => clearInterval(t)
  }, [fast, every, endRound])

  // The round splash, then the round.
  useEffect(() => {
    if (game.phase !== 'intro') return undefined
    const t = setTimeout(() => apply({ type: 'go' }), Math.max(0, INTRO_MS - (Date.now() - game.phaseAt)))
    return () => clearTimeout(t)
  }, [game.phase, game.phaseAt, apply])

  const startGame = useCallback(() => {
    unlockAudio()
    if (!PLAYABLE.length) return
    apply({ type: 'start', order: shuffled() })
  }, [apply])

  const togglePause = useCallback(() => {
    const g = gameRef.current
    if (g.phase !== 'round') return
    apply({ type: g.round?.runFrom ? 'pause' : 'resume' })
  }, [apply])

  const toggleMute = useCallback(() => {
    setMuted(!isMuted())
    setMutedState(isMuted())
    unlockAudio()
  }, [])

  const removeTeam = useCallback((p) => {
    if (!window.confirm(`Take "${p.name}" out of the game? Their phone goes back to the join screen.`)) return
    apply({ type: 'remove', pid: p.pid })
    busRef.current?.send('kick', { to: p.pid })
  }, [apply])

  const toLobby = useCallback(() => {
    if (window.confirm('End this game and go back to the start screen? The teams stay; their points go back to 0.')) apply({ type: 'lobby' })
  }, [apply])

  const newTeams = useCallback(() => {
    if (window.confirm('Clear every team? Phones go back to the join screen.')) apply({ type: 'newTeams' })
  }, [apply])

  const primary = useCallback(() => {
    const g = gameRef.current
    unlockAudio()
    if (g.phase === 'lobby') startGame()
    else if (g.phase === 'reveal' || g.phase === 'board') apply({ type: 'next' })
  }, [apply, startGame])

  useEffect(() => {
    const onKey = (e) => {
      const el = document.activeElement
      if (el?.tagName === 'INPUT' || el?.tagName === 'TEXTAREA' || el?.tagName === 'SELECT') return
      if (e.ctrlKey || e.metaKey || e.altKey) return
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault()
        // A button still focused from a click would press itself as well.
        if (el?.tagName === 'BUTTON') el.blur()
        primary()
      } else if (e.key === 'p' || e.key === 'P') togglePause()
      else if (e.key === 'm' || e.key === 'M') toggleMute()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [primary, togglePause, toggleMute])

  const { phase } = game
  const rainOn = phase === 'final' && now - game.phaseAt > 2200

  return (
    <div className="gt gt-tv">
      <style>{BASE_CSS + TV_CSS}</style>
      <Backdrop />
      <div className="gt-in">
        {phase !== 'lobby' && <TopBar game={game} />}
        <div className="gt-main">
          {phase === 'lobby' && (
            <Lobby game={game} room={room} joinUrl={joinUrl} joinText={joinText} onStart={startGame} onRemove={removeTeam} />
          )}
          {phase === 'intro' && <Intro game={game} />}
          {phase === 'round' && <RoundView game={game} now={now} />}
          {phase === 'reveal' && <RevealView game={game} now={now} />}
          {phase === 'board' && <BoardView game={game} now={now} onRemove={removeTeam} />}
          {phase === 'final' && <FinalView game={game} />}
        </div>
        <div className="gt-bottom">
          <div>
            {net === 'offline' && (
              <span className="gt-offline"><WifiOff /> No internet: phones cannot reach the TV</span>
            )}
            {net !== 'offline' && phase !== 'lobby' && (
              <div className="gt-joinchip">
                <QrCode text={joinUrl} className="qr" ink="#1e1b4b" />
                <div>
                  <b>Join: {joinText}</b>
                  <strong>{room}</strong>
                </div>
              </div>
            )}
          </div>
          <HostBar
            game={game}
            muted={muted}
            onMute={toggleMute}
            onPause={togglePause}
            onMore={() => apply({ type: 'more' })}
            onEnd={endRound}
            onNext={primary}
            onLobby={toLobby}
            onNewTeams={newTeams}
            onAgain={startGame}
          />
        </div>
      </div>
      {phase === 'reveal' && burst > 0 && <Confetti key={burst} seed={burst} />}
      {rainOn && <Confetti rain count={90} seed={3} />}
    </div>
  )
}

function TopBar({ game }) {
  const final = game.phase === 'final'
  return (
    <div className="gt-top">
      <span className="gt-logo gt-title">Guess the Teacher</span>
      {final
        ? <span className="gt-pill">🏆 Final results</span>
        : <span className="gt-pill">Round {game.r + 1} of {game.order.length}</span>}
      {!final && isDouble(game) && <span className="gt-pill gt-pill-hot">×2 Double points</span>}
    </div>
  )
}

function HostBar({ game, muted, onMute, onPause, onMore, onEnd, onNext, onLobby, onNewTeams, onAgain }) {
  const { phase } = game
  const running = Boolean(game.round?.runFrom)
  const last = game.r + 1 >= game.order.length
  return (
    <div className="gt-host">
      <button type="button" className="gt-btn" onClick={onMute} title={muted ? 'Sound on (M)' : 'Sound off (M)'} aria-label={muted ? 'Sound on' : 'Sound off'}>
        {muted ? <VolumeX /> : <Volume2 />}
      </button>
      {phase === 'lobby' && game.players.length > 0 && (
        <button type="button" className="gt-btn" onClick={onNewTeams}><Users /> Clear teams</button>
      )}
      {phase !== 'lobby' && phase !== 'final' && (
        <button type="button" className="gt-btn" onClick={onLobby} title="End this game"><Home /> End game</button>
      )}
      {phase === 'round' && (
        <>
          <button type="button" className="gt-btn" onClick={onMore}><Plus /> 10 s</button>
          <button type="button" className="gt-btn" onClick={onPause}>{running ? <Pause /> : <Play />} {running ? 'Pause' : 'Carry on'} <kbd>P</kbd></button>
          <button type="button" className="gt-btn" onClick={onEnd}><SkipForward /> End round</button>
        </>
      )}
      {phase === 'reveal' && (
        <button type="button" className="gt-btn gt-btn-go" onClick={onNext}>Leaderboard <kbd>Space</kbd></button>
      )}
      {phase === 'board' && (
        <button type="button" className="gt-btn gt-btn-go" onClick={onNext}>{last ? 'Final results 🏆' : 'Next round'} <kbd>Space</kbd></button>
      )}
      {phase === 'final' && (
        <>
          <button type="button" className="gt-btn" onClick={onNewTeams}><Users /> New teams</button>
          <button type="button" className="gt-btn gt-btn-go" onClick={onAgain}><RotateCcw /> Play again</button>
        </>
      )}
    </div>
  )
}

function Lobby({ game, room, joinUrl, joinText, onStart, onRemove }) {
  const n = game.players.length
  const size = n > 30 ? 'small' : n > 14 ? 'mid' : ''
  return (
    <div className="gt-lobby">
      <div className="gt-lobby-left">
        <div>
          <h1 className="gt-title gt-hero" style={{ margin: 0 }}>Guess the Teacher <span className="gt-bob">🤔</span></h1>
          <p className="gt-tag" style={{ margin: `${U(1)} 0 0` }}>Five emojis. One teacher. Who is it?</p>
        </div>
        <div className="gt-join">
          <QrCode text={joinUrl} className="qr" ink="#1e1b4b" />
          <div>
            <div className="gt-scan">Scan to play</div>
            <div className="gt-vn">Quét mã để chơi</div>
            <div className="gt-or">or go to</div>
            <div className="gt-url">{joinText}</div>
            <div className="gt-code" aria-label={`Game code ${room}`}>
              {room.split('').map((c, i) => <span key={i}>{c}</span>)}
            </div>
          </div>
        </div>
        <div className="gt-steps">
          <Step icon="👀" en="Look at the emojis on the TV" vn="Xem các emoji trên TV" />
          <Step icon="📱" en="Type the teacher's name on your phone" vn="Nhập tên giáo viên trên điện thoại" />
          <Step icon="⚡" en="The faster you answer, the more points" vn="Trả lời càng nhanh, càng nhiều điểm" />
        </div>
      </div>
      <div className="gt-teams">
        <div className="gt-teams-head">Teams <span className="gt-count">{n}</span></div>
        {n === 0 ? (
          <div className="gt-waiting">
            <span className="gt-dots gt-blink">• • •</span>
            <b>Waiting for teams</b>
            <span>Scan the code with a phone to join</span>
          </div>
        ) : (
          <div className="gt-team-grid">
            {game.players.map((p) => (
              <span key={p.pid} className={`gt-team gt-pop ${size}`}>
                <Avatar emoji={p.avatar} color={p.color} size="1.75em" />
                <span>{p.name}</span>
                <button type="button" className="gt-x" onClick={() => onRemove(p)} aria-label={`Remove ${p.name}`}>×</button>
              </span>
            ))}
          </div>
        )}
        <div className="gt-start">
          <p>
            {PLAYABLE.length
              ? `${PLAYABLE.length} teachers to guess · last round double points`
              : 'No teacher has a name yet: add them in teachers.js'}
          </p>
          <button type="button" className="gt-btn gt-btn-go gt-btn-big" onClick={onStart} disabled={!PLAYABLE.length}>
            <Play /> Start <kbd>Space</kbd>
          </button>
        </div>
      </div>
    </div>
  )
}

function Step({ icon, en, vn }) {
  return (
    <div className="gt-step">
      <i>{icon}</i>
      <span><b>{en}</b><span className="gt-vn">{vn}</span></span>
    </div>
  )
}

function Intro({ game }) {
  const double = isDouble(game)
  return (
    <div className="gt-intro">
      <div className="gt-intro-word gt-rise">{game.r + 1 === game.order.length ? 'Last round' : 'Round'}</div>
      <div className="gt-intro-num gt-title gt-stamp">{game.r + 1}</div>
      <div className="gt-intro-of gt-rise" style={{ animationDelay: '.2s' }}>of {game.order.length}</div>
      {double && <div className="gt-double gt-pop" style={{ animationDelay: '.5s' }}>×2 Double points!</div>}
      <div className="gt-intro-ready gt-rise" style={{ animationDelay: '.4s' }}>
        Phones ready!
        <div className="gt-vn">Chuẩn bị điện thoại!</div>
      </div>
    </div>
  )
}

function Cards({ emojis, shown, small = false }) {
  return (
    <div className={`gt-cards ${small ? 'small' : ''}`}>
      {emojis.map((e, i) => (
        <div key={i} className="gt-slot">
          <div className={`gt-flip ${i < shown ? '' : 'down'}`}>
            <div className="gt-face">{e}</div>
            <div className="gt-back">?</div>
          </div>
        </div>
      ))}
    </div>
  )
}

function Ring({ left, dur }) {
  const secs = Math.ceil(left / 1000)
  const c = 2 * Math.PI * 44
  const color = secs > 10 ? '#34d399' : secs > 5 ? '#fbbf24' : '#f87171'
  return (
    <div className={`gt-ring ${secs <= 5 && secs > 0 ? 'gt-pulse' : ''}`}>
      <svg viewBox="0 0 100 100" aria-hidden="true">
        <circle className="track" cx="50" cy="50" r="44" />
        <circle className="bar" cx="50" cy="50" r="44" stroke={color} strokeDasharray={c} strokeDashoffset={c * (1 - Math.max(0, left) / dur)} />
      </svg>
      <b style={{ color }}>{secs}</b>
    </div>
  )
}

function RoundView({ game, now }) {
  const t = teacherOf(game)
  const round = game.round
  if (!t || !round) return null
  const elapsed = elapsedOf(round, now)
  const left = Math.max(0, round.dur - elapsed)
  const got = Object.keys(round.results).length
  const total = game.players.length
  const paused = !round.runFrom
  return (
    <div className="gt-play">
      <div className="gt-stage">
        <div className="gt-q">
          Who is this teacher?
          <span className="gt-vn">Đây là giáo viên nào?</span>
        </div>
        <Cards emojis={t.emojis} shown={shownAt(elapsed)} />
        <div className="gt-clock">
          <Ring left={left} dur={round.dur} />
          <div className="gt-worth">
            <small>Right now</small>
            <b>{pointsFor(left, isDouble(game))}</b>
            <span>points</span>
          </div>
          <div className="gt-have">
            <b>{got} of {total} {total === 1 ? 'team has' : 'teams have'} it</b>
            <span className="gt-vn">{got}/{total} đội đã đoán đúng</span>
            <div className="gt-bar"><i style={{ width: `${total ? (got / total) * 100 : 0}%` }} /></div>
          </div>
        </div>
        <div className="gt-strip">
          {game.players.map((p) => (
            <Avatar key={p.pid} emoji={p.avatar} color={p.color} size={U(4.4)} className={round.results[p.pid] ? 'got' : ''} />
          ))}
        </div>
        {paused && (
          <div className="gt-paused">
            <div className="gt-title">Paused</div>
            <span>Press P to carry on</span>
          </div>
        )}
      </div>
      <Rail game={game} />
    </div>
  )
}

function RevealView({ game, now }) {
  const t = teacherOf(game)
  const round = game.round
  if (!t || !round) return null
  const named = now - game.phaseAt >= SUSPENSE_MS
  const results = Object.entries(round.results)
  const got = results.length
  const total = game.players.length
  const [fastPid, fastRes] = results.sort((a, b) => a[1].ms - b[1].ms)[0] || []
  const fast = fastPid && game.players.find((p) => p.pid === fastPid)
  // The other teacher most teams named, if any did.
  const tally = {}
  Object.values(round.others).forEach((i) => { tally[i] = (tally[i] || 0) + 1 })
  const [otherIdx, otherN] = Object.entries(tally).sort((a, b) => b[1] - a[1])[0] || []
  return (
    <div className="gt-play">
      <div className="gt-stage">
        <Cards emojis={t.emojis} shown={5} small />
        {!named ? (
          <div className="gt-suspense gt-blink">And the teacher is…</div>
        ) : (
          <div className="gt-answer-wrap">
            <small className="gt-rise">It's</small>
            <div className="gt-answer gt-title gt-stamp">{t.name}</div>
          </div>
        )}
        <div className="gt-stats" style={{ visibility: named ? 'visible' : 'hidden' }}>
          <span className="gt-stat gt-rise" style={{ animationDelay: '.5s' }}>✅ {got} of {total} {total === 1 ? 'team' : 'teams'} got it</span>
          {fast && (
            <span className="gt-stat gt-rise" style={{ animationDelay: '.8s' }}>
              ⚡ Fastest: <Avatar emoji={fast.avatar} color={fast.color} size="1.4em" /> {fast.name} · {(fastRes.ms / 1000).toFixed(1)} s
            </span>
          )}
          {otherN > 0 && (
            <span className="gt-stat gt-rise" style={{ animationDelay: '1.1s' }}>
              🤔 {otherN} {otherN === 1 ? 'team' : 'teams'} said {TEACHERS[otherIdx].name}
            </span>
          )}
        </div>
      </div>
      <Rail game={game} />
    </div>
  )
}

/** The leaderboard down the side: the top teams, sliding as points land. */
function Rail({ game }) {
  const rows = ranked(game.players)
  const top = rows.slice(0, RAIL_MAX)
  const results = game.round?.results || {}
  const anyPoints = rows.some((p) => p.score > 0)
  return (
    <aside className="gt-rail">
      <div className="gt-rail-head">🏆 Leaderboard</div>
      {rows.length === 0 && <p className="gt-rail-empty">No teams yet</p>}
      <div className="gt-rows" style={{ height: U(top.length * RAIL_ROW) }}>
        {top.map((p) => (
          <div key={p.pid} className={`gt-row ${p.rank === 1 && anyPoints ? 'lead' : ''}`} style={{ transform: `translateY(${U((p.rank - 1) * RAIL_ROW)})` }}>
            <span className="rk">{p.rank <= 3 && anyPoints ? MEDALS[p.rank - 1] : p.rank}</span>
            <Avatar emoji={p.avatar} color={p.color} size={U(4.2)} />
            <span className="nm">{p.name}</span>
            {results[p.pid] && <span className="gt-plus gt-pop">+{results[p.pid].pts}</span>}
            <span className="sc">{p.score.toLocaleString('en-US')}</span>
          </div>
        ))}
      </div>
      {rows.length > RAIL_MAX && <div className="gt-more">+ {rows.length - RAIL_MAX} more {rows.length - RAIL_MAX === 1 ? 'team' : 'teams'}</div>}
    </aside>
  )
}

const easeOut = (x) => 1 - (1 - x) ** 3

function BoardView({ game, now, onRemove }) {
  const rows = ranked(game.players)
  const shownRows = rows.slice(0, BOARD_MAX)
  const n = shownRows.length
  const since = now - game.phaseAt
  const moved = since >= BOARD_HOLD_MS
  const k = easeOut(Math.max(0, Math.min(1, (since - BOARD_HOLD_MS) / BOARD_COUNT_MS)))
  const results = game.round?.results || {}
  const last = game.r + 1 >= game.order.length
  return (
    <div className="gt-board">
      <div className="gt-board-head">
        <div className="gt-title">Leaderboard</div>
        <p>{last ? 'Before the final results' : `After round ${game.r + 1} of ${game.order.length}`}</p>
      </div>
      {n === 0 && <p className="gt-rail-empty" style={{ textAlign: 'center' }}>No teams played this round.</p>}
      <div className="gt-brows" style={{ height: U(n * BOARD_ROW) }}>
        {shownRows.map((p) => {
          const prev = game.prev[p.pid]
          const from = prev?.score ?? 0
          const at = moved ? p.rank - 1 : Math.min((prev?.rank ?? n + 1) - 1, n)
          const rank = moved || !prev ? p.rank : prev.rank
          const climb = prev ? prev.rank - p.rank : 0
          const gain = results[p.pid]?.pts || 0
          return (
            <div
              key={p.pid}
              className={`gt-brow ${moved && p.rank === 1 ? 'first' : ''}`}
              style={{ transform: `translateY(${U(at * BOARD_ROW)})`, opacity: !moved && (!prev || prev.rank > BOARD_MAX) ? 0 : 1 }}
            >
              <span className={`rk ${rank <= 3 ? 'medal' : ''}`}>{rank <= 3 ? MEDALS[rank - 1] : rank}</span>
              <Avatar emoji={p.avatar} color={p.color} size={U(5)} />
              <span className="nm">{p.name}</span>
              {moved && climb > 0 && <span className="gt-climb gt-pop">▲ {climb}</span>}
              <span className={`gt-gain ${gain ? '' : 'zero'}`}>+{gain}</span>
              <span className="sc">{Math.round(from + (p.score - from) * k).toLocaleString('en-US')}</span>
              <button type="button" className="gt-x" onClick={() => onRemove(p)} aria-label={`Remove ${p.name}`}>×</button>
            </div>
          )
        })}
      </div>
      {rows.length > BOARD_MAX && <p className="gt-more">+ {rows.length - BOARD_MAX} more {rows.length - BOARD_MAX === 1 ? 'team' : 'teams'}</p>}
    </div>
  )
}

const PODIUM = [
  { place: 2, height: 21, delay: 1.1, bg: 'linear-gradient(180deg, #f3f4f6, #9ca3af)' },
  { place: 1, height: 30, delay: 2.1, bg: 'linear-gradient(180deg, #fde047, #ca8a04)' },
  { place: 3, height: 14, delay: 0.3, bg: 'linear-gradient(180deg, #fdba74, #c2410c)' },
]

function FinalView({ game }) {
  const rows = ranked(game.players)
  const rest = rows.slice(3, 12)
  if (!rows.length) {
    return (
      <div className="gt-final">
        <div className="gt-final-head gt-title">Thanks for playing!</div>
      </div>
    )
  }
  return (
    <div className="gt-final">
      <div className="gt-final-head gt-title gt-pop">Final results</div>
      <div className="gt-podium">
        {PODIUM.map(({ place, height, delay, bg }) => {
          const p = rows[place - 1]
          if (!p) return <div key={place} className="gt-place" style={{ visibility: 'hidden' }} />
          return (
            <div key={place} className="gt-place" style={{ animationDelay: `${delay}s` }}>
              <div className="who">
                {place === 1 && <span className="crown gt-bob">👑</span>}
                <Avatar emoji={p.avatar} color={p.color} size={U(place === 1 ? 12 : 9.5)} />
                <span className="nm">{p.name}</span>
                <span className="sc">{p.score.toLocaleString('en-US')} points</span>
              </div>
              <div className="gt-block" style={{ height: U(height), background: bg }}>{ordinal(place)}</div>
            </div>
          )
        })}
      </div>
      {rest.length > 0 && (
        <div className="gt-rest gt-rise" style={{ animationDelay: '2.8s' }}>
          {rest.map((p) => (
            <span key={p.pid}>
              <Avatar emoji={p.avatar} color={p.color} size="1.5em" /> {ordinal(p.rank)} {p.name} · {p.score.toLocaleString('en-US')}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}
