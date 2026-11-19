// content/games/G06_guess-the-teacher/widgets.jsx
// Guess the Teacher on the TV, run from the laptop plugged into it. Families
// scan the QR code and join as teams on their phones (phone.jsx); the TV shows
// a teacher's emojis, the last one up at 45 of the 60 seconds, and each team locks in one
// guess. Nobody learns who was right until the reveal, when the points land:
// the sooner a right guess was locked in, the more it is worth (1000 down to
// 100; the last teacher counts double). A leaderboard runs down the side the
// whole way through, and the QR code stays on screen for late joiners.
//
//   lobby   QR code, room code, teams popping in, Edit teachers
//   intro   "Teacher 2 of 5"
//   round   the emoji cards flip up one by one, the clock, who has locked in
//   reveal  a drumroll, the teacher's name, the fastest right answer, confetti
//   board   after the last teacher, the leaderboard sliding into order
//   final   the podium, with a fanfare
//
// One big Next button (bottom right; Space, Enter or →) always does the next
// step and says what it is. The list of teachers is edited on screen
// (editor.jsx) and kept for every staff login (list.js).
//
// The TV owns the game (rules.js) and judges every guess (match.js); the
// phones send what was typed. Phones talk to the TV over the decks' phone
// remote wire (src/lib/remote/bus.js), which stores nothing.
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { ChevronRight, Home, LogOut, Maximize, Minimize, Pause, Pencil, Play, Plus, RotateCcw, SkipForward, Users, Volume2, VolumeX, WifiOff } from 'lucide-react'
import { QrCode } from '../../../src/lib/remote/QrCode.jsx'
import { openBus } from '../../../src/lib/remote/bus.js'
import { keptRoom } from '../../../src/lib/remote/room.js'
import { Avatar, BASE_CSS, Backdrop, Confetti } from './look.jsx'
import { EDITOR_CSS, TeacherEditor } from './editor.jsx'
import { loadList, ready, saveList, setsFor } from './list.js'
import { INTRO_MS, MEDALS, SUSPENSE_MS, TOPIC, loadFont, ordinal, pointsFor, shownAt } from './protocol.js'
import { check, elapsedOf, isDouble, isLast, leftOf, loadGame, lockedOf, publicState, ranked, reduce, rightOf, saveGame, teacherOf } from './rules.js'
import { isMuted, play, setMuted, unlockAudio } from './sfx.js'

const ROOM_KEY = 'learn:teacher-game:room'
// The leaderboards' row heights, in the scene's unit (1% of its height).
const RAIL_ROW = 6.9
const BOARD_ROW = 7
const RAIL_MAX = 8
const BOARD_MAX = 8
// The final leaderboard waits this long before the rows slide to their new places.
const BOARD_HOLD_MS = 900
const BOARD_COUNT_MS = 1400

const U = (n) => `calc(var(--u) * ${n})`

const TV_CSS = `
.gt-tv { container-type: size; flex: 1 1 0; min-height: 0; display: flex; flex-direction: column; user-select: none }
.gt-in { --u: min(1cqh, .5625cqw); position: relative; z-index: 1; flex: 1; min-height: 0; display: flex; flex-direction: column;
  gap: ${U(1.4)}; padding: ${U(2)} ${U(3)} ${U(2)} }
.gt-vn { font-weight: 600; color: #c7d2fe; opacity: .9 }
.gt-main { flex: 1; min-height: 0; position: relative }

.gt-top { display: flex; align-items: center; gap: ${U(1.6)}; height: ${U(5.6)}; flex: none }
.gt-logo { font-size: ${U(3.6)}; white-space: nowrap }
.gt-dots { display: flex; align-items: center; gap: ${U(.8)}; flex-wrap: wrap; min-width: 0 }
.gt-dots > b { font-size: ${U(2.2)}; font-weight: 700; color: #e0e7ff; margin-right: ${U(.6)}; white-space: nowrap }
.gt-dot { position: relative; width: ${U(3.6)}; height: ${U(3.6)}; border-radius: 999px; display: inline-flex; align-items: center; justify-content: center;
  font-size: ${U(1.7)}; font-weight: 800; border: ${U(.25)} solid rgba(255,255,255,.4); color: rgba(255,255,255,.7); transition: all .3s }
.gt-dot.done { background: rgba(255,255,255,.85); border-color: transparent; color: #3730a3 }
.gt-dot.now { background: #fde047; border-color: #fde047; color: #3b0764; transform: scale(1.18); box-shadow: 0 0 0 ${U(.4)} rgba(253,224,71,.35) }
.gt-dot sup { position: absolute; top: ${U(-1.3)}; right: ${U(-1.4)}; font-size: ${U(1.3)}; font-weight: 800; color: #3b0764; background: #f472b6;
  border-radius: 999px; padding: 0 ${U(.4)}; line-height: 1.4 }
.gt-spacer { flex: 1 }
.gt-icon { width: ${U(5)}; height: ${U(5)}; display: inline-flex; align-items: center; justify-content: center; border-radius: ${U(1.4)}; cursor: pointer;
  background: rgba(255,255,255,.12); border: 1px solid rgba(255,255,255,.22); color: #fff; padding: 0 }
.gt-icon:hover { background: rgba(255,255,255,.24) }
.gt-icon svg { width: ${U(2.6)}; height: ${U(2.6)} }

.gt-bottom { display: flex; align-items: flex-end; justify-content: space-between; gap: ${U(2)}; flex: none }
.gt-host { display: flex; align-items: center; gap: ${U(1)}; flex-wrap: wrap; justify-content: flex-end }
.gt-btn { display: inline-flex; align-items: center; gap: ${U(.8)}; font-size: ${U(2.1)}; font-weight: 700; line-height: 1; padding: ${U(1.1)} ${U(1.7)};
  border-radius: ${U(1.6)}; background: rgba(255,255,255,.12); color: #fff; border: 1px solid rgba(255,255,255,.22); cursor: pointer;
  transition: background .15s, transform .1s }
.gt-btn:hover { background: rgba(255,255,255,.22) }
.gt-btn:active { transform: translateY(2px) }
.gt-btn svg { width: ${U(2.4)}; height: ${U(2.4)}; flex: none }
.gt-btn kbd { font-family: inherit; font-size: ${U(1.5)}; font-weight: 700; padding: ${U(.2)} ${U(.6)}; border-radius: ${U(.5)}; border: 1px solid currentColor; opacity: .6 }
.gt-next { display: inline-flex; align-items: center; gap: ${U(1.2)}; min-width: ${U(30)}; justify-content: center; font-size: ${U(3.4)}; font-weight: 800; line-height: 1;
  padding: ${U(1.6)} ${U(2.6)} ${U(1.6)} ${U(3.2)}; border-radius: ${U(2.2)}; border: none; cursor: pointer; background: #fde047; color: #3b0764;
  box-shadow: 0 ${U(.6)} 0 #b45309; transition: background .15s, transform .1s; animation: gt-glow 2.4s ease-in-out infinite }
.gt-next:hover { background: #fef08a }
.gt-next:active { transform: translateY(${U(.6)}); box-shadow: none }
.gt-next svg { width: ${U(4)}; height: ${U(4)}; flex: none }
.gt-next kbd { font-family: inherit; font-size: ${U(1.5)}; font-weight: 800; padding: ${U(.2)} ${U(.6)}; border-radius: ${U(.5)}; border: 1px solid currentColor; opacity: .55 }
.gt-next:disabled { opacity: .45; cursor: not-allowed; animation: none }

.gt-joinchip { display: flex; align-items: center; gap: ${U(1.4)}; background: #fff; color: #1e1b4b; border-radius: ${U(2)}; padding: ${U(.8)} ${U(2)} ${U(.8)} ${U(.8)};
  box-shadow: 0 ${U(.5)} 0 #a5b4fc }
.gt-joinchip svg.qr { width: ${U(11)}; height: ${U(11)}; flex: none }
.gt-joinchip small { display: block; font-size: ${U(1.7)}; font-weight: 800; letter-spacing: .08em; text-transform: uppercase; color: #6366f1; line-height: 1.1 }
.gt-joinchip b { display: block; font-size: ${U(2)}; font-weight: 700; color: #374151; line-height: 1.2 }
.gt-joinchip strong { display: block; font-size: ${U(3.6)}; font-weight: 800; letter-spacing: .14em; color: #4338ca; line-height: 1.05 }
.gt-offline { display: inline-flex; align-items: center; gap: ${U(.8)}; background: #dc2626; color: #fff; font-weight: 700; font-size: ${U(1.9)};
  padding: ${U(.7)} ${U(1.4)}; border-radius: ${U(1.4)}; margin-bottom: ${U(.8)} }
.gt-offline svg { width: ${U(2.3)}; height: ${U(2.3)} }

/* Lobby */
.gt-lobby { display: grid; grid-template-columns: 47% 1fr; gap: ${U(3.6)}; height: 100% }
.gt-lobby-left { display: flex; flex-direction: column; gap: ${U(2.2)}; min-height: 0; justify-content: center }
.gt-hero { font-size: ${U(8.2)}; white-space: nowrap }
.gt-hero .gt-bob { font-size: .9em; margin-left: .1em }
.gt-tag { font-size: ${U(2.7)}; font-weight: 600; color: #e0e7ff }
.gt-join { display: flex; align-items: center; gap: ${U(2.8)}; background: #fff; color: #1e1b4b; border-radius: ${U(3)}; padding: ${U(2.2)};
  box-shadow: 0 ${U(.8)} 0 #a5b4fc, 0 ${U(2)} ${U(4)} rgba(0,0,0,.3) }
.gt-join svg.qr { width: ${U(24)}; height: ${U(24)}; flex: none }
.gt-scan { font-size: ${U(4.4)}; font-weight: 800; color: #4338ca; line-height: 1 }
.gt-join .gt-vn { color: #6b7280; font-size: ${U(2.2)}; margin-top: ${U(.4)} }
.gt-or { font-size: ${U(2.1)}; font-weight: 600; color: #6b7280; margin-top: ${U(1.8)} }
.gt-url { font-size: ${U(2.7)}; font-weight: 800; color: #1e1b4b; line-height: 1.1 }
.gt-code { display: flex; gap: ${U(.8)}; margin-top: ${U(1)} }
.gt-code span { width: ${U(6.2)}; height: ${U(7.4)}; display: flex; align-items: center; justify-content: center; border-radius: ${U(1.2)};
  background: #eef2ff; color: #4338ca; font-size: ${U(5.2)}; font-weight: 800; box-shadow: inset 0 ${U(-.5)} 0 #c7d2fe }
.gt-steps { display: grid; gap: ${U(1.1)} }
.gt-step { display: flex; align-items: center; gap: ${U(1.6)} }
.gt-step i { font-style: normal; width: ${U(5.4)}; height: ${U(5.4)}; flex: none; border-radius: 999px; background: rgba(255,255,255,.13);
  display: flex; align-items: center; justify-content: center; font-size: ${U(2.8)} }
.gt-step b { display: block; font-size: ${U(2.4)}; font-weight: 700; line-height: 1.15 }
.gt-step .gt-vn { display: block; font-size: ${U(1.85)}; line-height: 1.2 }

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
.gt-waiting .gt-dots-wait { font-size: ${U(5)}; letter-spacing: .2em }
.gt-setlist { display: flex; align-items: center; justify-content: space-between; gap: ${U(2)}; margin-top: ${U(1.8)}; padding-top: ${U(1.6)};
  border-top: 1px solid rgba(255,255,255,.14) }
.gt-setlist p { margin: 0; font-size: ${U(2.1)}; font-weight: 700; color: #e0e7ff; line-height: 1.25 }
.gt-setlist p small { display: block; font-size: ${U(1.7)}; font-weight: 600; color: #c7d2fe }
.gt-setlist p small.warn { color: #fcd34d }

/* Intro */
.gt-intro { height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center }
.gt-intro-word { font-size: ${U(4.4)}; font-weight: 800; letter-spacing: .3em; color: #c7d2fe; text-transform: uppercase }
.gt-intro-num { font-size: ${U(28)}; line-height: .9 }
.gt-intro-of { font-size: ${U(4)}; font-weight: 700; color: #e0e7ff }
.gt-intro-ready { font-size: ${U(3.4)}; font-weight: 700; margin-top: ${U(2.6)} }
.gt-intro .gt-vn { font-size: ${U(2.3)} }
.gt-double { margin-top: ${U(2.2)}; font-size: ${U(4.6)}; font-weight: 800; color: #3b0764; background: linear-gradient(90deg, #fde047, #f472b6);
  padding: ${U(.8)} ${U(3.2)}; border-radius: ${U(2)}; transform: rotate(-3deg); box-shadow: 0 ${U(.6)} 0 #9d174d }

/* Round and reveal */
.gt-play { display: grid; grid-template-columns: 1fr ${U(44)}; gap: ${U(3)}; height: 100% }
.gt-stage { position: relative; display: flex; flex-direction: column; align-items: center; justify-content: space-evenly; gap: ${U(1.4)}; min-height: 0; min-width: 0 }
.gt-q { text-align: center; font-size: ${U(4.4)}; font-weight: 800; line-height: 1 }
.gt-q .gt-vn { display: block; font-size: ${U(2.2)}; margin-top: ${U(.6)} }
.gt-cards { display: grid; gap: ${U(2)}; width: 100% }
.gt-cards.small { gap: ${U(1.4)} }
.gt-slot { aspect-ratio: 1 / 1.08; perspective: 1200px; position: relative }
.gt-flip { position: absolute; inset: 0; transform-style: preserve-3d; transition: transform .75s cubic-bezier(.3,1.4,.5,1) }
.gt-flip.down { transform: rotateY(180deg) }
.gt-face, .gt-back { position: absolute; inset: 0; border-radius: ${U(2.6)}; backface-visibility: hidden; -webkit-backface-visibility: hidden;
  display: flex; align-items: center; justify-content: center }
.gt-face { background: #fff; box-shadow: 0 ${U(.8)} 0 #c7d2fe, 0 ${U(1.6)} ${U(3)} rgba(0,0,0,.3); line-height: 1 }
.gt-back { transform: rotateY(180deg); background: linear-gradient(145deg, #8b5cf6, #4f46e5); border: ${U(.5)} solid rgba(255,255,255,.28);
  color: rgba(255,255,255,.6); font-weight: 800; box-shadow: 0 ${U(.8)} 0 #312e81 }
.gt-cards.small .gt-face, .gt-cards.small .gt-back { border-radius: ${U(2)} }
.gt-clock { display: flex; align-items: center; justify-content: center; gap: ${U(4)}; width: 100% }
.gt-ring { position: relative; width: ${U(16)}; height: ${U(16)}; flex: none }
.gt-ring svg { width: 100%; height: 100%; transform: rotate(-90deg) }
.gt-ring circle { fill: none; stroke-width: 9 }
.gt-ring .track { stroke: rgba(255,255,255,.14) }
.gt-ring .bar { stroke-linecap: round; transition: stroke .4s }
.gt-ring b { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; font-size: ${U(6.6)}; font-weight: 800;
  font-variant-numeric: tabular-nums }
.gt-worth { text-align: left }
.gt-worth small { display: block; font-size: ${U(1.9)}; font-weight: 700; letter-spacing: .12em; text-transform: uppercase; color: #c7d2fe }
.gt-worth b { display: block; font-size: ${U(6.2)}; font-weight: 800; color: #fde047; line-height: 1; font-variant-numeric: tabular-nums }
.gt-worth span { font-size: ${U(2.2)}; font-weight: 700; color: #e0e7ff }
.gt-have { width: ${U(40)} }
.gt-have b { display: block; font-size: ${U(2.8)}; font-weight: 800; line-height: 1.1; white-space: nowrap }
.gt-have .gt-vn { display: block; font-size: ${U(1.9)}; margin-bottom: ${U(1)} }
.gt-bar { height: ${U(1.6)}; border-radius: 999px; background: rgba(255,255,255,.14); overflow: hidden }
.gt-bar i { display: block; height: 100%; border-radius: 999px; background: linear-gradient(90deg, #a5b4fc, #f0abfc); transition: width .5s cubic-bezier(.3,1.3,.5,1) }
.gt-strip { display: flex; flex-wrap: wrap; justify-content: center; gap: ${U(.8)}; max-height: ${U(10.4)}; overflow: hidden; width: 100% }
.gt-chipwrap { position: relative; display: inline-flex }
.gt-chipwrap .gt-avatar { opacity: .32; filter: grayscale(1); transition: opacity .3s, filter .3s }
.gt-chipwrap.in .gt-avatar { opacity: 1; filter: none; box-shadow: 0 0 0 ${U(.4)} #fff, 0 ${U(.3)} ${U(1)} rgba(0,0,0,.3); animation: gt-pop .45s cubic-bezier(.2,.9,.3,1.3) both }
.gt-chipwrap.in::after { content: '🔒'; position: absolute; right: ${U(-.6)}; bottom: ${U(-.6)}; font-size: ${U(1.9)}; line-height: 1 }
.gt-paused { position: absolute; inset: 0; z-index: 5; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: ${U(1)};
  background: rgba(13,8,51,.72); backdrop-filter: blur(6px); border-radius: ${U(3)} }
.gt-paused .gt-title { font-size: ${U(11)} }
.gt-paused span { font-size: ${U(2.6)}; font-weight: 700; color: #e0e7ff }
.gt-suspense { font-size: ${U(6)}; font-weight: 800; text-align: center }
.gt-answer { font-size: ${U(12.5)}; text-align: center; line-height: 1 }
.gt-answer-wrap { display: flex; flex-direction: column; align-items: center; gap: ${U(1)} }
.gt-answer-wrap > small { font-size: ${U(2.6)}; font-weight: 700; letter-spacing: .2em; text-transform: uppercase; color: #c7d2fe }
.gt-stats { display: flex; flex-wrap: wrap; justify-content: center; gap: ${U(1.4)} }
.gt-stat { display: inline-flex; align-items: center; gap: ${U(.8)}; background: #fff; color: #1e1b4b; font-size: ${U(2.4)}; font-weight: 700;
  padding: ${U(.8)} ${U(1.8)}; border-radius: 999px; box-shadow: 0 ${U(.4)} 0 #a5b4fc }

/* The live leaderboard down the side */
.gt-rail { display: flex; flex-direction: column; min-height: 0; background: rgba(9,6,40,.42); border: 1px solid rgba(255,255,255,.12);
  border-radius: ${U(3)}; padding: ${U(2)} }
.gt-rail-head { font-size: ${U(2.9)}; font-weight: 800; margin-bottom: ${U(1.4)}; display: flex; align-items: center; gap: ${U(1)} }
.gt-rows { position: relative; flex: none }
.gt-row { position: absolute; left: 0; right: 0; top: 0; height: ${U(RAIL_ROW - 0.7)}; display: flex; align-items: center; gap: ${U(1)};
  padding: 0 ${U(1.2)}; border-radius: ${U(1.6)}; background: rgba(255,255,255,.09); font-size: ${U(2.4)}; font-weight: 700;
  transition: transform .9s cubic-bezier(.3,1.2,.4,1), background .3s }
.gt-row.lead { background: rgba(253,224,71,.17); box-shadow: inset 0 0 0 1px rgba(253,224,71,.5) }
.gt-row .rk { width: ${U(3.4)}; text-align: center; flex: none; color: #c7d2fe; font-variant-numeric: tabular-nums }
.gt-row .nm { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap }
.gt-row .sc { font-weight: 800; font-variant-numeric: tabular-nums }
.gt-row .lk { flex: none; font-size: ${U(2)} }
.gt-plus { flex: none; font-size: ${U(1.8)}; font-weight: 800; color: #064e3b; background: #34d399; padding: ${U(.25)} ${U(.8)}; border-radius: 999px }
.gt-more { margin-top: auto; padding-top: ${U(1)}; font-size: ${U(2)}; font-weight: 700; color: #c7d2fe; text-align: center }
.gt-rail-empty { font-size: ${U(2.2)}; color: #c7d2fe; font-weight: 600 }

/* The leaderboard after the last teacher */
.gt-board { height: 100%; width: 100%; max-width: ${U(118)}; margin: 0 auto; display: flex; flex-direction: column; align-items: stretch }
.gt-board-head { text-align: center; margin-bottom: ${U(1.8)} }
.gt-board-head .gt-title { font-size: ${U(6.6)} }
.gt-board-head p { margin: ${U(.6)} 0 0; font-size: ${U(2.5)}; font-weight: 700; color: #c7d2fe }
.gt-brows { position: relative; flex: none }
.gt-brow { position: absolute; left: 0; right: 0; top: 0; height: ${U(BOARD_ROW - 0.8)}; display: flex; align-items: center; gap: ${U(1.6)};
  padding: 0 ${U(2)} 0 ${U(1)}; border-radius: ${U(2)}; background: #fff; color: #1e1b4b; font-size: ${U(2.9)}; font-weight: 700;
  box-shadow: 0 ${U(.5)} 0 #a5b4fc; transition: transform 1s cubic-bezier(.3,1.25,.4,1), opacity .5s }
.gt-brow.first { background: linear-gradient(90deg, #fef9c3, #fde68a); box-shadow: 0 ${U(.5)} 0 #d97706 }
.gt-brow .rk { width: ${U(4.8)}; height: ${U(4.8)}; flex: none; border-radius: 999px; display: flex; align-items: center; justify-content: center;
  background: #eef2ff; color: #4338ca; font-weight: 800; font-size: ${U(2.6)} }
.gt-brow .rk.medal { background: none; font-size: ${U(4.2)} }
.gt-brow .nm { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap }
.gt-climb { flex: none; font-size: ${U(2.1)}; font-weight: 800; color: #047857; background: #d1fae5; padding: ${U(.3)} ${U(1)}; border-radius: 999px }
.gt-gain { flex: none; font-size: ${U(2.2)}; font-weight: 800; color: #064e3b; background: #6ee7b7; padding: ${U(.3)} ${U(1)}; border-radius: 999px }
.gt-gain.zero { color: #6b7280; background: #e5e7eb }
.gt-brow .sc { width: ${U(13)}; text-align: right; font-size: ${U(3.4)}; font-weight: 800; color: #4338ca; font-variant-numeric: tabular-nums }

/* Final */
.gt-final { height: 100%; display: flex; flex-direction: column; align-items: center }
.gt-final-head { font-size: ${U(7.2)}; text-align: center }
.gt-podium { flex: 1; min-height: 0; width: 100%; display: flex; align-items: flex-end; justify-content: center; gap: ${U(2.4)} }
.gt-place { width: ${U(32)}; display: flex; flex-direction: column; align-items: center; animation: gt-up .9s cubic-bezier(.2,1.1,.3,1) both }
.gt-place .who { display: flex; flex-direction: column; align-items: center; gap: ${U(.6)}; margin-bottom: ${U(1.4)}; max-width: 100%; text-align: center }
.gt-place .crown { font-size: ${U(5.6)}; line-height: 1; margin-bottom: ${U(-1.4)}; position: relative; z-index: 1 }
.gt-place .nm { font-size: ${U(3.3)}; font-weight: 800; max-width: 100%; overflow: hidden; text-overflow: ellipsis; white-space: nowrap }
.gt-place .sc { font-size: ${U(2.5)}; font-weight: 700; color: #fde047; font-variant-numeric: tabular-nums }
.gt-block { width: 100%; border-radius: ${U(2)} ${U(2)} 0 0; display: flex; justify-content: center; padding-top: ${U(1.2)};
  font-size: ${U(7.4)}; font-weight: 800; color: rgba(0,0,0,.28); box-shadow: inset 0 ${U(.8)} 0 rgba(255,255,255,.45) }
.gt-rest { display: flex; flex-wrap: wrap; justify-content: center; gap: ${U(1)}; margin-top: ${U(1.4)} }
.gt-rest span { display: inline-flex; align-items: center; gap: ${U(.7)}; font-size: ${U(2.1)}; font-weight: 700; background: rgba(255,255,255,.12);
  padding: ${U(.5)} ${U(1.4)} ${U(.5)} ${U(.6)}; border-radius: 999px }
@keyframes gt-up { 0% { opacity: 0; transform: translateY(40%) } 100% { opacity: 1; transform: none } }
`

/** Real full screen for the whole page: [on, toggle]. */
function useFullscreen() {
  const [on, setOn] = useState(() => Boolean(document.fullscreenElement))
  useEffect(() => {
    const onChange = () => setOn(Boolean(document.fullscreenElement))
    document.addEventListener('fullscreenchange', onChange)
    return () => document.removeEventListener('fullscreenchange', onChange)
  }, [])
  const toggle = useCallback(() => {
    if (document.fullscreenElement) document.exitFullscreen?.().catch(() => {})
    else document.documentElement.requestFullscreen?.().catch(() => {})
  }, [])
  return [on, toggle]
}

/** What the Next button says and does in each step. */
function nextStep(g, listReady) {
  switch (g.phase) {
    case 'lobby': return { label: listReady ? 'Start' : 'Start', disabled: !listReady, icon: Play }
    case 'intro': return { label: 'Go' }
    case 'round': return { label: 'Show the answer' }
    case 'reveal': return { label: isLast(g) ? 'Final leaderboard' : 'Next teacher' }
    case 'board': return { label: 'Show the podium 🏆' }
    case 'final': return { label: 'Play again', icon: RotateCcw }
    default: return { label: 'Next' }
  }
}

/**
 * The TV. On its own page (classroom/main.jsx opens this game without the
 * deck's bars), with `onExit` back to PRA Learn; the scene sizes itself to the
 * window (container units), a laptop or a TV alike.
 */
export function TeacherGame({ onExit }) {
  const [room] = useState(() => keptRoom(ROOM_KEY))
  const [game, setGame] = useState(loadGame)
  const gameRef = useRef(game)
  const [now, setNow] = useState(() => Date.now())
  const [net, setNet] = useState('connecting')
  const [muted, setMutedState] = useState(isMuted)
  const [burst, setBurst] = useState(0)
  const [full, toggleFull] = useFullscreen()
  const busRef = useRef(null)
  const sendTimer = useRef(null)
  const endTimer = useRef(null)
  const cueTimers = useRef([])
  // What the clock last announced, so each sound plays once.
  const heard = useRef({ shown: 0, sec: 0 })

  // The list of teachers (list.js), and the editor.
  const [list, setList] = useState(null)
  const [listStatus, setListStatus] = useState({ state: 'loading' })
  const [editing, setEditing] = useState(false)
  const saveTimer = useRef(null)
  const saveSeq = useRef(0)
  const unsaved = useRef(null)

  const joinUrl = useMemo(() => `${window.location.origin}${import.meta.env.BASE_URL}classroom/#/play/${room}`, [room])
  const joinText = useMemo(() => `${window.location.host}/play`, [])

  useEffect(() => {
    let alive = true
    loadList().then((res) => {
      if (!alive) return
      setList(res.list)
      setListStatus({ state: res.where, error: res.error })
    })
    return () => { alive = false }
  }, [])

  const flushSave = useCallback(() => {
    clearTimeout(saveTimer.current)
    const pending = unsaved.current
    if (!pending) return
    unsaved.current = null
    const seq = ++saveSeq.current
    saveList(pending).then((res) => {
      if (seq === saveSeq.current) setListStatus({ state: res.where, error: res.error })
    })
  }, [])

  const editList = useCallback((next) => {
    setList(next)
    setListStatus({ state: 'saving' })
    unsaved.current = next
    clearTimeout(saveTimer.current)
    saveTimer.current = setTimeout(flushSave, 700)
  }, [flushSave])

  useEffect(() => () => flushSave(), [flushSave])

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
      if (next.phase !== before.phase || next.r !== before.r) {
        clearTimeout(endTimer.current)
        cue(next)
      }
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
      if (res.ignore) {
        // Already locked in (a guess sent twice): say so again, nothing more.
        if (g.round?.guesses[msg.pid] && msg.no === g.r + 1) busRef.current?.send('locked', { to: msg.pid, no: msg.no })
        return
      }
      const next = apply({ type: 'locked', pid: msg.pid, ok: res.ok, pts: res.pts, ms: res.ms, other: res.other, now: t })
      busRef.current?.send('locked', { to: msg.pid, no: msg.no })
      play('lock')
      // Every team has locked in: a moment, then the reveal.
      if (lockedOf(next.round) >= next.players.length) {
        clearTimeout(endTimer.current)
        endTimer.current = setTimeout(endRound, 1200)
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
      const shown = shownAt(elapsedOf(g.round, tnow), teacherOf(g)?.emojis.length || 1)
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

  // The teacher splash, then the round.
  useEffect(() => {
    if (game.phase !== 'intro') return undefined
    const t = setTimeout(() => apply({ type: 'go' }), Math.max(0, INTRO_MS - (Date.now() - game.phaseAt)))
    return () => clearTimeout(t)
  }, [game.phase, game.phaseAt, apply])

  const playable = list ? list.teachers.filter(ready).length : 0

  const startGame = useCallback(() => {
    unlockAudio()
    if (!list) return
    const sets = setsFor(list)
    if (sets.length) apply({ type: 'start', sets })
  }, [apply, list])

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

  const skipTeacher = useCallback(() => {
    if (window.confirm('Skip this teacher? Nobody gets points for it, and the game moves on.')) apply({ type: 'skip' })
  }, [apply])

  // The one Next button, and Space / Enter / →.
  const next = useCallback(() => {
    const g = gameRef.current
    unlockAudio()
    if (g.phase === 'lobby' || g.phase === 'final') startGame()
    else if (g.phase === 'intro') apply({ type: 'go' })
    else if (g.phase === 'round') endRound()
    else apply({ type: 'next' })
  }, [apply, startGame, endRound])

  useEffect(() => {
    if (editing) return undefined
    const onKey = (e) => {
      const el = document.activeElement
      if (el?.tagName === 'INPUT' || el?.tagName === 'TEXTAREA' || el?.tagName === 'SELECT') return
      if (e.ctrlKey || e.metaKey || e.altKey) return
      if (e.key === ' ' || e.key === 'Enter' || e.key === 'ArrowRight') {
        e.preventDefault()
        // A button still focused from a click would press itself as well.
        if (el?.tagName === 'BUTTON') el.blur()
        next()
      } else if (e.key === 'p' || e.key === 'P') togglePause()
      else if (e.key === 'm' || e.key === 'M') toggleMute()
      else if ((e.key === 'f' || e.key === 'F') && onExit) toggleFull()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [editing, next, togglePause, toggleMute, toggleFull, onExit])

  const { phase } = game
  const rainOn = phase === 'final' && now - game.phaseAt > 2200
  const step = nextStep(game, playable > 0)
  const NextIcon = step.icon || ChevronRight
  const running = Boolean(game.round?.runFrom)

  return (
    <div className="gt gt-tv">
      <style>{BASE_CSS + TV_CSS + EDITOR_CSS}</style>
      <Backdrop />
      <div className="gt-in">
        <div className="gt-top">
          {phase !== 'lobby' && <span className="gt-logo gt-title">Guess the Teacher</span>}
          {phase !== 'lobby' && <Dots game={game} />}
          <span className="gt-spacer" />
          <button type="button" className="gt-icon" onClick={toggleMute} title={muted ? 'Sound on (M)' : 'Sound off (M)'} aria-label={muted ? 'Sound on' : 'Sound off'}>
            {muted ? <VolumeX /> : <Volume2 />}
          </button>
          {onExit && (
            <>
              <button type="button" className="gt-icon" onClick={toggleFull} title={full ? 'Leave full screen (F)' : 'Full screen (F)'} aria-label={full ? 'Leave full screen' : 'Full screen'}>
                {full ? <Minimize /> : <Maximize />}
              </button>
              <button type="button" className="gt-icon" onClick={onExit} title="Back to PRA Learn" aria-label="Back to PRA Learn"><LogOut /></button>
            </>
          )}
        </div>
        <div className="gt-main">
          {phase === 'lobby' && (
            <Lobby
              game={game}
              room={room}
              joinUrl={joinUrl}
              joinText={joinText}
              playable={playable}
              listStatus={listStatus}
              onEdit={list ? () => setEditing(true) : null}
              onRemove={removeTeam}
            />
          )}
          {phase === 'intro' && <Intro game={game} />}
          {phase === 'round' && <RoundView game={game} now={now} />}
          {phase === 'reveal' && <RevealView game={game} now={now} />}
          {phase === 'board' && <BoardView game={game} now={now} onRemove={removeTeam} />}
          {phase === 'final' && <FinalView game={game} />}
        </div>
        <div className="gt-bottom">
          <div>
            {net === 'offline' && <div className="gt-offline"><WifiOff /> No internet: phones cannot reach the TV</div>}
            {phase !== 'lobby' && (
              <div className="gt-joinchip">
                <QrCode text={joinUrl} className="qr" ink="#1e1b4b" />
                <div>
                  <small>Join any time</small>
                  <b>{joinText}</b>
                  <strong>{room}</strong>
                </div>
              </div>
            )}
          </div>
          <div className="gt-host">
            {phase === 'lobby' && game.players.length > 0 && (
              <button type="button" className="gt-btn" onClick={newTeams}><Users /> Clear teams</button>
            )}
            {phase !== 'lobby' && phase !== 'final' && (
              <button type="button" className="gt-btn" onClick={toLobby} title="End this game"><Home /> End game</button>
            )}
            {(phase === 'intro' || phase === 'round') && (
              <button type="button" className="gt-btn" onClick={skipTeacher}><SkipForward /> Skip teacher</button>
            )}
            {phase === 'round' && (
              <>
                <button type="button" className="gt-btn" onClick={() => apply({ type: 'more' })}><Plus /> 10 s</button>
                <button type="button" className="gt-btn" onClick={togglePause}>{running ? <Pause /> : <Play />} {running ? 'Pause' : 'Carry on'} <kbd>P</kbd></button>
              </>
            )}
            {phase === 'final' && (
              <button type="button" className="gt-btn" onClick={newTeams}><Users /> New teams</button>
            )}
            <button type="button" className="gt-next" onClick={next} disabled={step.disabled}>
              {step.label} <NextIcon /> <kbd>Space</kbd>
            </button>
          </div>
        </div>
      </div>
      {phase === 'reveal' && burst > 0 && <Confetti key={burst} seed={burst} />}
      {rainOn && <Confetti rain count={90} seed={3} />}
      {editing && list && (
        <TeacherEditor
          list={list}
          status={listStatus}
          onChange={editList}
          onClose={() => { flushSave(); setEditing(false) }}
        />
      )}
    </div>
  )
}

/** Which teacher this is: numbered dots, the done ones filled, this one yellow. */
function Dots({ game }) {
  const n = game.sets.length
  const final = game.phase === 'board' || game.phase === 'final'
  return (
    <div className="gt-dots" aria-label={final ? 'All teachers done' : `Teacher ${game.r + 1} of ${n}`}>
      <b>{final ? 'Final' : `Teacher ${game.r + 1} of ${n}`}</b>
      {game.sets.map((_, i) => {
        const done = final || i < game.r || (i === game.r && game.phase === 'reveal')
        const cls = done ? 'done' : i === game.r ? 'now' : ''
        return (
          <span key={i} className={`gt-dot ${cls}`}>
            {i + 1}
            {n >= 3 && i === n - 1 && <sup>×2</sup>}
          </span>
        )
      })}
    </div>
  )
}

function Lobby({ game, room, joinUrl, joinText, playable, listStatus, onEdit, onRemove }) {
  const n = game.players.length
  const size = n > 30 ? 'small' : n > 14 ? 'mid' : ''
  const where = listStatus.state === 'laptop'
    ? { cls: 'warn', text: 'List saved on this laptop only' }
    : listStatus.state === 'loading'
      ? { cls: '', text: 'Loading the list…' }
      : { cls: '', text: 'Last teacher counts double' }
  return (
    <div className="gt-lobby">
      <div className="gt-lobby-left">
        <div>
          <h1 className="gt-title gt-hero" style={{ margin: 0 }}>Guess the Teacher <span className="gt-bob">🤔</span></h1>
          <p className="gt-tag" style={{ margin: `${U(1)} 0 0` }}>Emojis on the TV. One teacher. Who is it?</p>
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
          <Step icon="🔒" en="Type the teacher's name on your phone and lock it in" vn="Nhập tên giáo viên trên điện thoại và chốt đáp án" />
          <Step icon="⚡" en="Lock in sooner, score more. Answers at the end!" vn="Chốt càng sớm, càng nhiều điểm. Đáp án ở cuối!" />
        </div>
      </div>
      <div className="gt-teams">
        <div className="gt-teams-head">Teams <span className="gt-count">{n}</span></div>
        {n === 0 ? (
          <div className="gt-waiting">
            <span className="gt-dots-wait gt-blink">• • •</span>
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
        <div className="gt-setlist">
          <p>
            {listStatus.state === 'loading' ? 'Teachers…' : `${playable} ${playable === 1 ? 'teacher' : 'teachers'} to guess`}
            <small className={where.cls}>{where.text}</small>
          </p>
          <button type="button" className="gt-btn" onClick={onEdit} disabled={!onEdit}><Pencil /> Edit teachers</button>
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
      <div className="gt-intro-word gt-rise">{isLast(game) ? 'Last teacher' : 'Teacher'}</div>
      <div className="gt-intro-num gt-title gt-stamp">{game.r + 1}</div>
      <div className="gt-intro-of gt-rise" style={{ animationDelay: '.2s' }}>of {game.sets.length}</div>
      {double && <div className="gt-double gt-pop" style={{ animationDelay: '.5s' }}>×2 Double points!</div>}
      <div className="gt-intro-ready gt-rise" style={{ animationDelay: '.4s' }}>
        Phones ready!
        <div className="gt-vn">Chuẩn bị điện thoại!</div>
      </div>
    </div>
  )
}

function Cards({ emojis, shown, small = false }) {
  const n = Math.max(1, emojis.length)
  const each = small ? 17.6 : 27
  return (
    <div className={`gt-cards ${small ? 'small' : ''}`} style={{ gridTemplateColumns: `repeat(${n}, 1fr)`, maxWidth: U(n * each) }}>
      {emojis.map((e, i) => (
        <div key={i} className="gt-slot">
          <div className={`gt-flip ${i < shown ? '' : 'down'}`}>
            <div className="gt-face" style={{ fontSize: U(small ? 8.6 : 13.5) }}>{e}</div>
            <div className="gt-back" style={{ fontSize: U(small ? 6 : 10) }}>?</div>
          </div>
        </div>
      ))}
    </div>
  )
}

const RING = 2 * Math.PI * 44
const clockColor = (secs) => (secs > 20 ? '#34d399' : secs > 10 ? '#fbbf24' : '#f87171')

/**
 * The clock. The ring drains on every screen frame, so it moves smoothly; the
 * game's own tick sets it too, so it never stands still if frames pause.
 */
function Ring({ round, left }) {
  const barRef = useRef(null)
  const roundRef = useRef(round)
  useEffect(() => { roundRef.current = round }, [round])
  useEffect(() => {
    let frame = 0
    const draw = () => {
      const r = roundRef.current
      const ms = Math.max(0, leftOf(r, Date.now()))
      if (barRef.current) barRef.current.style.strokeDashoffset = String(RING * (1 - ms / r.dur))
      frame = requestAnimationFrame(draw)
    }
    draw()
    return () => cancelAnimationFrame(frame)
  }, [])
  const secs = Math.ceil(left / 1000)
  const color = clockColor(secs)
  return (
    <div className={`gt-ring ${secs <= 5 && secs > 0 ? 'gt-pulse' : ''}`}>
      <svg viewBox="0 0 100 100" aria-hidden="true">
        <circle className="track" cx="50" cy="50" r="44" />
        <circle ref={barRef} className="bar" cx="50" cy="50" r="44" strokeDasharray={RING} style={{ stroke: color, strokeDashoffset: RING * (1 - left / round.dur) }} />
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
  const locked = lockedOf(round)
  const total = game.players.length
  const paused = !round.runFrom
  return (
    <div className="gt-play">
      <div className="gt-stage">
        <div className="gt-q">
          Who is this teacher?
          <span className="gt-vn">Đây là giáo viên nào?</span>
        </div>
        <Cards emojis={t.emojis} shown={shownAt(elapsed, t.emojis.length)} />
        <div className="gt-clock">
          <Ring round={round} left={left} />
          <div className="gt-worth">
            <small>Lock in now for</small>
            <b>{pointsFor(left, isDouble(game))}</b>
            <span>points</span>
          </div>
          <div className="gt-have">
            <b>🔒 {locked} of {total} {total === 1 ? 'team' : 'teams'} locked in</b>
            <span className="gt-vn">{locked}/{total} đội đã chốt đáp án</span>
            <div className="gt-bar"><i style={{ width: `${total ? (locked / total) * 100 : 0}%` }} /></div>
          </div>
        </div>
        <div className="gt-strip">
          {game.players.map((p) => (
            <span key={p.pid} className={`gt-chipwrap ${round.guesses[p.pid] ? 'in' : ''}`}>
              <Avatar emoji={p.avatar} color={p.color} size={U(4.4)} />
            </span>
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
  const right = rightOf(round)
  const total = game.players.length
  const [fastPid, fastRes] = right[0] || []
  const fast = fastPid && game.players.find((p) => p.pid === fastPid)
  // The other teacher most teams named, if any did.
  const tally = {}
  Object.values(round.guesses).forEach((x) => { if (x.other != null) tally[x.other] = (tally[x.other] || 0) + 1 })
  const [otherIdx, otherN] = Object.entries(tally).sort((a, b) => b[1] - a[1])[0] || []
  return (
    <div className="gt-play">
      <div className="gt-stage">
        <Cards emojis={t.emojis} shown={t.emojis.length} small />
        {!named ? (
          <div className="gt-suspense gt-blink">And the teacher is…</div>
        ) : (
          <div className="gt-answer-wrap">
            <small className="gt-rise">It's</small>
            <div className="gt-answer gt-title gt-stamp">{t.name}</div>
          </div>
        )}
        <div className="gt-stats" style={{ visibility: named ? 'visible' : 'hidden' }}>
          <span className="gt-stat gt-rise" style={{ animationDelay: '.5s' }}>✅ {right.length} of {total} {total === 1 ? 'team' : 'teams'} got it</span>
          {fast && (
            <span className="gt-stat gt-rise" style={{ animationDelay: '.8s' }}>
              ⚡ Fastest: <Avatar emoji={fast.avatar} color={fast.color} size="1.4em" /> {fast.name} · {(fastRes.ms / 1000).toFixed(1)} s
            </span>
          )}
          {otherN > 0 && game.sets[otherIdx] && (
            <span className="gt-stat gt-rise" style={{ animationDelay: '1.1s' }}>
              🤔 {otherN} {otherN === 1 ? 'team' : 'teams'} said {game.sets[otherIdx].name}
            </span>
          )}
        </div>
      </div>
      <Rail game={game} hold={!named} />
    </div>
  )
}

/**
 * The leaderboard down the side: the top teams, a padlock on each team that
 * has locked in, and at the reveal the points landing and the rows sliding.
 * `hold` keeps the order and points from before the round (the drumroll).
 */
function Rail({ game, hold = false }) {
  const round = game.round
  const showGains = game.phase === 'reveal' && !hold
  const rows = hold
    ? game.players
      .map((p) => ({ ...p, score: game.prev[p.pid]?.score ?? 0, before: game.prev[p.pid]?.rank ?? 999 }))
      .sort((a, b) => a.before - b.before || a.joinedAt - b.joinedAt)
      .map((p, i) => ({ ...p, rank: i + 1 }))
    : ranked(game.players)
  const top = rows.slice(0, RAIL_MAX)
  const anyPoints = rows.some((p) => p.score > 0)
  return (
    <aside className="gt-rail">
      <div className="gt-rail-head">🏆 Leaderboard</div>
      {rows.length === 0 && <p className="gt-rail-empty">No teams yet</p>}
      <div className="gt-rows" style={{ height: U(top.length * RAIL_ROW) }}>
        {top.map((p) => {
          const guess = round?.guesses[p.pid]
          return (
            <div key={p.pid} className={`gt-row ${p.rank === 1 && anyPoints ? 'lead' : ''}`} style={{ transform: `translateY(${U((p.rank - 1) * RAIL_ROW)})` }}>
              <span className="rk">{p.rank <= 3 && anyPoints ? MEDALS[p.rank - 1] : p.rank}</span>
              <Avatar emoji={p.avatar} color={p.color} size={U(4.2)} />
              <span className="nm">{p.name}</span>
              {game.phase === 'round' && guess && <span className="lk" title="Locked in">🔒</span>}
              {showGains && guess?.ok && <span className="gt-plus gt-pop">+{guess.pts}</span>}
              <span className="sc">{p.score.toLocaleString('en-US')}</span>
            </div>
          )
        })}
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
  const guesses = game.round?.guesses || {}
  return (
    <div className="gt-board">
      <div className="gt-board-head">
        <div className="gt-title">Leaderboard</div>
        <p>After all {game.sets.length} teachers · the podium is next</p>
      </div>
      {n === 0 && <p className="gt-rail-empty" style={{ textAlign: 'center' }}>No teams played.</p>}
      <div className="gt-brows" style={{ height: U(n * BOARD_ROW) }}>
        {shownRows.map((p) => {
          const prev = game.prev[p.pid]
          const from = prev?.score ?? 0
          const at = moved ? p.rank - 1 : Math.min((prev?.rank ?? n + 1) - 1, n)
          const rank = moved || !prev ? p.rank : prev.rank
          const climb = prev ? prev.rank - p.rank : 0
          const gain = guesses[p.pid]?.ok ? guesses[p.pid].pts : 0
          return (
            <div
              key={p.pid}
              className={`gt-brow ${moved && p.rank === 1 ? 'first' : ''}`}
              style={{ transform: `translateY(${U(at * BOARD_ROW)})`, opacity: !moved && (!prev || prev.rank > BOARD_MAX) ? 0 : 1 }}
            >
              <span className={`rk ${rank <= 3 ? 'medal' : ''}`}>{rank <= 3 ? MEDALS[rank - 1] : rank}</span>
              <Avatar emoji={p.avatar} color={p.color} size={U(4.8)} />
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
  { place: 2, height: 20, delay: 1.1, bg: 'linear-gradient(180deg, #f3f4f6, #9ca3af)' },
  { place: 1, height: 28, delay: 2.1, bg: 'linear-gradient(180deg, #fde047, #ca8a04)' },
  { place: 3, height: 13, delay: 0.3, bg: 'linear-gradient(180deg, #fdba74, #c2410c)' },
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
                <Avatar emoji={p.avatar} color={p.color} size={U(place === 1 ? 11.5 : 9)} />
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
