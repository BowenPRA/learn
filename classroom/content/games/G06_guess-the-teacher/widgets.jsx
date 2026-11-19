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
//   reveal  a drumroll over the teacher's silhouette, then the portrait, the
//           name and the photos of them at work, dealt out as a collage
//           (all from pra.edu.vn, staff.js), and the points landing
//   board   after the last teacher, the leaderboard sliding into order
//   final   the podium
//
// The look is the website's (look.jsx). One big Next button (bottom right;
// Space, Enter or →) always does the next step and says what it is. The list
// of teachers is edited on screen (editor.jsx) and kept for every staff login
// (list.js).
//
// The TV owns the game (rules.js) and judges every guess (match.js); the
// phones send what was typed. Phones talk to the TV over the decks' phone
// remote wire (src/lib/remote/bus.js), which stores nothing.
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { ArrowRight, CircleCheck, Home, Lock, LogOut, Maximize, MessageCircleQuestion, Minimize, Pause, Pencil, Play, Plus, RotateCcw, SkipForward, Users, Volume2, VolumeX, WifiOff, Zap } from 'lucide-react'
import { QrCode } from '../../../src/lib/remote/QrCode.jsx'
import { openBus } from '../../../src/lib/remote/bus.js'
import { keptRoom } from '../../../src/lib/remote/room.js'
import { Avatar, BASE_CSS, Backdrop, Confetti, Portrait } from './look.jsx'
import { EDITOR_CSS, TeacherEditor } from './editor.jsx'
import { loadList, ready, saveList, setsFor } from './list.js'
import { INTRO_MS, SUSPENSE_MS, TOPIC, ordinal, pointsFor, shownAt } from './protocol.js'
import { check, elapsedOf, isDouble, isLast, leftOf, loadGame, lockedOf, publicState, ranked, reduce, rightOf, saveGame, teacherOf } from './rules.js'
import { isMuted, play, setMuted, unlockAudio } from './sfx.js'
import { loadStaff, preload, staffFor } from './staff.js'
import { isRude } from './words.js'

const ROOM_KEY = 'learn:teacher-game:room'
// The leaderboards' row heights, in the scene's unit (1% of its height).
const RAIL_ROW = 6.6
const BOARD_ROW = 7
const RAIL_MAX = 8
const BOARD_MAX = 8
// The final leaderboard waits this long before the rows slide to their new places.
const BOARD_HOLD_MS = 900
const BOARD_COUNT_MS = 1400
// After the name: the first photo lands this long after, then one every POSTCARD_GAP.
const POSTCARD_AT = 700
const POSTCARD_GAP = 260
// The locked-in avatars shown under the clock; more teams than this become "+ 4".
const DOCK_MAX = 12

const U = (n) => `calc(var(--u) * ${n})`

const TV_CSS = `
.gt-tv { container-type: size; flex: 1 1 0; min-height: 0; display: flex; flex-direction: column; user-select: none }
.gt-in { --u: min(1cqh, .5625cqw); position: relative; z-index: 1; flex: 1; min-height: 0; display: flex; flex-direction: column;
  gap: ${U(1.6)}; padding: ${U(2)} ${U(3)} }
.gt-main { flex: 1; min-height: 0; position: relative }
.gt-eyebrow { font-size: ${U(1.7)} }

/* The bar along the top, as the website's header: logo, game, progress, sound / full screen / exit. */
.gt-top { display: flex; align-items: center; gap: ${U(2)}; height: ${U(6.6)}; flex: none; padding: 0 ${U(1)} 0 ${U(2.4)};
  background: rgba(255,255,255,.94); border: 1px solid var(--line); border-radius: 999px; box-shadow: var(--shadow-sm) }
.gt-logo { height: ${U(3.9)}; width: auto; display: block; flex: none }
.gt-gamename { font-size: ${U(2.3)}; font-weight: 700; color: var(--blue-ink); padding-left: ${U(2)}; border-left: 2px solid var(--line); white-space: nowrap; line-height: 1.1 }
.gt-prog { flex: 1; min-width: 0; display: flex; align-items: center; justify-content: center; gap: ${U(.7)} }
.gt-prog > b { font-size: ${U(1.9)}; font-weight: 600; color: var(--ink-soft); margin-right: ${U(.9)}; white-space: nowrap }
.gt-seg { flex: 0 1 ${U(4.6)}; min-width: ${U(.9)}; height: ${U(1.1)}; border-radius: 999px; background: var(--line); transition: background .4s, box-shadow .4s }
.gt-seg.done { background: var(--blue) }
.gt-seg.now { background: var(--sun); box-shadow: 0 0 0 ${U(.4)} var(--sun-tint) }
.gt-x2 { font-size: ${U(1.5)}; font-weight: 700; color: var(--sun-ink); background: var(--sun-tint); border-radius: 999px; padding: ${U(.15)} ${U(.8)}; margin-left: ${U(.3)} }
.gt-icon { width: ${U(4.6)}; height: ${U(4.6)}; flex: none; display: inline-flex; align-items: center; justify-content: center; border-radius: 999px; cursor: pointer;
  background: var(--blue-pale); border: none; color: var(--blue-ink); padding: 0; transition: background .2s, transform .25s var(--bounce) }
.gt-icon:hover { background: var(--blue-tint); transform: translateY(-2px) }
.gt-icon svg { width: ${U(2.3)}; height: ${U(2.3)} }

/* Along the bottom: the join card, the host's buttons and Next. */
.gt-bottom { display: flex; align-items: flex-end; justify-content: space-between; gap: ${U(2)}; flex: none; min-height: ${U(6.4)} }
.gt-host { display: flex; align-items: center; gap: ${U(1)}; flex-wrap: wrap; justify-content: flex-end }
.gt-btn { display: inline-flex; align-items: center; gap: ${U(.8)}; font-size: ${U(1.95)}; font-weight: 600; line-height: 1; padding: ${U(1.15)} ${U(2)};
  border-radius: 999px; background: #fff; color: var(--blue-ink); border: 2px solid var(--line); cursor: pointer; white-space: nowrap;
  transition: border-color .2s, background .2s, transform .25s var(--bounce) }
.gt-btn:hover:not(:disabled) { border-color: var(--blue-tint); background: var(--blue-pale); transform: translateY(-2px) }
.gt-btn:disabled { opacity: .5; cursor: default }
.gt-btn svg { width: ${U(2.2)}; height: ${U(2.2)}; flex: none; color: var(--blue) }
.gt-btn kbd { font-family: inherit; font-size: ${U(1.4)}; font-weight: 600; padding: ${U(.15)} ${U(.55)}; border-radius: ${U(.5)}; border: 1.5px solid var(--line); color: var(--ink-soft) }
.gt-next { display: inline-flex; align-items: center; gap: ${U(1.2)}; min-width: ${U(30)}; justify-content: center; font-size: ${U(3)}; font-weight: 700; line-height: 1;
  padding: ${U(1.75)} ${U(2.6)} ${U(1.75)} ${U(3.4)}; border-radius: 999px; border: none; cursor: pointer; background: var(--blue); color: #fff; white-space: nowrap;
  box-shadow: 0 ${U(.9)} ${U(2.2)} rgba(17,109,255,.32); transition: background .2s, transform .25s var(--bounce), box-shadow .2s }
.gt-next:hover:not(:disabled) { background: var(--blue-deep); transform: translateY(-3px) rotate(-1deg); box-shadow: 0 ${U(1.4)} ${U(2.8)} rgba(17,109,255,.36) }
.gt-next:active:not(:disabled) { transform: scale(.97) }
.gt-next svg { width: ${U(3.2)}; height: ${U(3.2)}; flex: none }
.gt-next kbd { font-family: inherit; font-size: ${U(1.45)}; font-weight: 600; padding: ${U(.2)} ${U(.6)}; border-radius: ${U(.5)}; border: 1.5px solid rgba(255,255,255,.55); opacity: .85 }
.gt-next:disabled { opacity: .45; cursor: not-allowed; box-shadow: none }

.gt-joinchip { display: flex; align-items: center; gap: ${U(1.6)}; background: #fff; border: 1px solid var(--line); border-radius: ${U(2.2)};
  padding: ${U(.9)} ${U(2.4)} ${U(.9)} ${U(.9)}; box-shadow: var(--shadow-sm) }
.gt-joinchip svg.qr { width: ${U(10.5)}; height: ${U(10.5)}; flex: none }
.gt-joinchip small { display: block; font-size: ${U(1.45)}; font-weight: 600; letter-spacing: .1em; text-transform: uppercase; color: var(--green-deep); line-height: 1.2 }
.gt-joinchip b { display: block; font-size: ${U(2)}; font-weight: 600; color: var(--ink-soft); line-height: 1.3 }
.gt-joinchip strong { display: block; font-size: ${U(3.6)}; font-weight: 800; letter-spacing: .16em; color: var(--blue-ink); line-height: 1.1 }
.gt-offline { display: inline-flex; align-items: center; gap: ${U(.8)}; background: var(--coral-deep); color: #fff; font-weight: 600; font-size: ${U(1.9)};
  padding: ${U(.8)} ${U(1.6)}; border-radius: 999px; margin-bottom: ${U(.9)} }
.gt-offline svg { width: ${U(2.3)}; height: ${U(2.3)} }

/* Lobby */
.gt-lobby { display: grid; grid-template-columns: 50% 1fr; gap: ${U(3.6)}; height: 100% }
.gt-lobby-left { display: flex; flex-direction: column; align-items: flex-start; gap: ${U(2.4)}; min-height: 0; justify-content: center }
.gt-hero { margin: ${U(1.4)} 0 0; font-size: ${U(8.4)}; font-weight: 800; letter-spacing: -.03em; line-height: .98; color: var(--blue-ink); white-space: nowrap }
.gt-mark { position: relative; display: inline-block; color: var(--blue) }
.gt-mark svg { position: absolute; left: -2%; right: -2%; bottom: -.16em; width: 104%; height: .26em; overflow: visible }
.gt-lede { margin: ${U(1.6)} 0 0; font-size: ${U(2.6)}; font-weight: 500; color: var(--ink-soft) }
.gt-join { display: flex; align-items: center; gap: ${U(2.8)}; padding: ${U(2.2)} ${U(3.2)} ${U(2.2)} ${U(2.2)}; border-radius: ${U(3)} }
.gt-join svg.qr { width: ${U(23)}; height: ${U(23)}; flex: none }
.gt-scan { font-size: ${U(4.2)}; font-weight: 800; color: var(--blue); line-height: 1; letter-spacing: -.02em }
.gt-join .gt-vn { font-size: ${U(2.1)}; margin-top: ${U(.5)} }
.gt-or { font-size: ${U(1.9)}; font-weight: 500; color: var(--ink-soft); margin-top: ${U(1.8)} }
.gt-url { font-size: ${U(2.6)}; font-weight: 700; color: var(--blue-ink); line-height: 1.15 }
.gt-code { display: flex; gap: ${U(.8)}; margin-top: ${U(1.1)} }
.gt-code span { width: ${U(6)}; height: ${U(7.2)}; display: flex; align-items: center; justify-content: center; border-radius: ${U(1.4)};
  background: var(--blue-pale); border: 2px solid var(--blue-tint); color: var(--blue-ink); font-size: ${U(4.8)}; font-weight: 800 }
.gt-steps { display: grid; gap: ${U(1.3)} }
.gt-step { display: flex; align-items: center; gap: ${U(1.6)} }
.gt-step i { font-style: normal; width: ${U(4.6)}; height: ${U(4.6)}; flex: none; border-radius: 999px; background: var(--blue); color: #fff;
  display: flex; align-items: center; justify-content: center; font-size: ${U(2.2)}; font-weight: 700; box-shadow: 0 ${U(.5)} ${U(1.2)} rgba(17,109,255,.25) }
.gt-step b { display: block; font-size: ${U(2.3)}; font-weight: 600; line-height: 1.2; color: var(--blue-ink) }
.gt-step .gt-vn { display: block; font-size: ${U(1.8)}; line-height: 1.25 }

.gt-teams { display: flex; flex-direction: column; min-height: 0; border-radius: ${U(3)}; padding: ${U(2.6)} ${U(2.8)} ${U(2.2)} }
.gt-teams-head { display: flex; align-items: center; gap: ${U(1.2)}; font-size: ${U(3.2)}; font-weight: 700; color: var(--blue-ink); margin-bottom: ${U(1.8)}; letter-spacing: -.01em }
.gt-count { min-width: ${U(4.4)}; padding: 0 ${U(1.1)}; height: ${U(4.4)}; border-radius: 999px; background: var(--blue); color: #fff;
  display: inline-flex; align-items: center; justify-content: center; font-size: ${U(2.4)}; font-weight: 700 }
.gt-team-grid { flex: 1; min-height: 0; overflow: hidden; display: flex; flex-wrap: wrap; align-content: flex-start; gap: ${U(1.1)} }
.gt-team { --t: ${U(2.5)}; position: relative; display: inline-flex; align-items: center; gap: calc(var(--t) * .45); max-width: 100%;
  padding: calc(var(--t) * .24) calc(var(--t) * .8) calc(var(--t) * .24) calc(var(--t) * .24); border-radius: 999px; background: var(--row); border: 1px solid var(--line);
  color: var(--ink); font-size: var(--t); font-weight: 600; line-height: 1.15 }
.gt-team.mid { --t: ${U(2.05)} }
.gt-team.small { --t: ${U(1.7)} }
.gt-team > .gt-team-name { overflow: hidden; text-overflow: ellipsis; white-space: nowrap }
.gt-x { position: absolute; top: -.35em; right: -.35em; width: 1.3em; height: 1.3em; border-radius: 999px; border: 2px solid #fff; background: var(--coral-deep); color: #fff;
  font-size: .75em; font-weight: 700; line-height: 1; cursor: pointer; display: none; align-items: center; justify-content: center; padding: 0 }
.gt-team:hover .gt-x, .gt-brow:hover .gt-x { display: inline-flex }
.gt-waiting { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; gap: ${U(.8)};
  border: 2px dashed var(--blue-tint); border-radius: ${U(2.4)}; background: var(--blue-pale) }
.gt-waiting b { font-size: ${U(3)}; font-weight: 700; color: var(--blue-ink) }
.gt-waiting > span { font-size: ${U(2)}; color: var(--ink-soft) }
.gt-waiting .gt-ellipsis { font-size: ${U(6)}; line-height: .6; color: var(--blue); letter-spacing: .08em; font-weight: 800 }
.gt-setlist { display: flex; align-items: center; justify-content: space-between; gap: ${U(2)}; margin-top: ${U(2)}; padding-top: ${U(1.8)};
  border-top: 1px solid var(--line) }
.gt-setlist p { margin: 0; font-size: ${U(2.1)}; font-weight: 600; color: var(--blue-ink); line-height: 1.3 }
.gt-setlist p small { display: block; font-size: ${U(1.65)}; font-weight: 500; color: var(--ink-soft) }
.gt-setlist p small.warn { color: var(--coral-deep) }
.gt-setlist p small.ok { color: var(--green-deep) }

/* Intro */
.gt-intro { height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center }
.gt-intro .gt-eyebrow { font-size: ${U(2.2)} }
.gt-intro-num { margin-top: ${U(1.6)}; font-size: ${U(27)}; font-weight: 800; line-height: .9; letter-spacing: -.04em; color: var(--blue) }
.gt-intro-of { font-size: ${U(3.6)}; font-weight: 600; color: var(--ink-soft) }
.gt-intro-ready { margin-top: ${U(3)}; font-size: ${U(3)}; font-weight: 700; color: var(--blue-ink) }
.gt-intro-ready .gt-vn { display: block; font-size: ${U(2.2)} }
.gt-double { margin-top: ${U(2.4)}; font-size: ${U(3.6)}; font-weight: 700; color: var(--sun-ink); background: var(--sun);
  padding: ${U(.9)} ${U(3)}; border-radius: 999px; transform: rotate(-2deg); box-shadow: 0 ${U(.8)} ${U(2)} rgba(245,166,35,.35) }

/* Round */
.gt-play { display: grid; grid-template-columns: 1fr ${U(44)}; gap: ${U(3)}; height: 100% }
.gt-stage { position: relative; display: flex; flex-direction: column; align-items: center; justify-content: space-evenly; gap: ${U(1.4)}; min-height: 0; min-width: 0 }
.gt-q { text-align: center; display: flex; flex-direction: column; align-items: center }
.gt-q h2 { margin: ${U(.6)} 0 0; font-size: ${U(5.6)}; font-weight: 800; letter-spacing: -.025em; color: var(--blue); line-height: 1.05 }
.gt-q .gt-vn { display: block; font-size: ${U(2.2)}; margin-top: ${U(.5)} }
.gt-cards { display: grid; gap: ${U(2.2)}; width: 100% }
.gt-cards.small { gap: ${U(1.2)} }
.gt-slot { aspect-ratio: 1 / 1.08; perspective: 1200px; position: relative }
.gt-flip { position: absolute; inset: 0; transform-style: preserve-3d; transition: transform .8s var(--bounce) }
.gt-flip.down { transform: rotateY(180deg) }
.gt-face, .gt-back { position: absolute; inset: 0; border-radius: ${U(2.8)}; backface-visibility: hidden; -webkit-backface-visibility: hidden;
  display: flex; align-items: center; justify-content: center; overflow: hidden }
.gt-face { background: #fff; border: 1px solid var(--line); box-shadow: var(--shadow); line-height: 1 }
.gt-back { transform: rotateY(180deg); background: linear-gradient(165deg, var(--blue), var(--teal)); box-shadow: var(--shadow) }
.gt-back::before { content: ''; position: absolute; inset: 0; background: radial-gradient(64% 52% at 50% 26%, rgba(255,255,255,.3), transparent 72%) }
.gt-back .gt-frond { inset: 13%; background: rgba(255,255,255,.2) }
.gt-back b { position: relative; color: #fff; font-weight: 800; opacity: .92 }
.gt-cards.small .gt-face, .gt-cards.small .gt-back { border-radius: ${U(1.8)} }

.gt-dock { display: flex; align-items: center; gap: ${U(3)}; border-radius: ${U(2.8)}; padding: ${U(1.5)} ${U(3)} ${U(1.5)} ${U(1.5)}; box-shadow: var(--shadow-sm) }
.gt-dock-sep { width: 1px; align-self: stretch; background: var(--line) }
.gt-ring { position: relative; width: ${U(13)}; height: ${U(13)}; flex: none }
.gt-ring svg { width: 100%; height: 100%; transform: rotate(-90deg) }
.gt-ring circle { fill: none; stroke-width: 10 }
.gt-ring .track { stroke: var(--blue-pale) }
.gt-ring .bar { stroke-linecap: round; transition: stroke .4s }
.gt-ring b { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; font-size: ${U(5)}; font-weight: 700;
  font-variant-numeric: tabular-nums; color: var(--blue-ink) }
.gt-dock small { display: block; font-size: ${U(1.55)}; font-weight: 600; letter-spacing: .1em; text-transform: uppercase; color: var(--ink-soft); white-space: nowrap }
.gt-worth { min-width: ${U(19)} }
.gt-worth b { display: block; font-size: ${U(5.2)}; font-weight: 800; color: var(--blue-ink); line-height: 1.05; font-variant-numeric: tabular-nums; letter-spacing: -.02em }
.gt-worth b span { font-size: .4em; font-weight: 600; color: var(--ink-soft); margin-left: .35em; letter-spacing: 0 }
.gt-have > b { display: block; font-size: ${U(2.5)}; font-weight: 700; color: var(--blue-ink); line-height: 1.2; margin: ${U(.2)} 0 ${U(.9)}; white-space: nowrap }
.gt-avs { display: flex; gap: ${U(.6)}; align-items: center }
.gt-av { position: relative; display: inline-flex }
.gt-av .gt-avatar { opacity: .3; filter: grayscale(1); transition: opacity .3s, filter .3s }
.gt-av.in .gt-avatar { opacity: 1; filter: none; animation: gt-pop .45s var(--bounce) both }
.gt-av.in::after { content: ''; position: absolute; right: ${U(-.4)}; bottom: ${U(-.4)}; width: ${U(1.8)}; height: ${U(1.8)}; border-radius: 50%; border: 2px solid #fff;
  background: var(--green-deep) url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='3.6' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M20 6 9 17l-5-5'/%3E%3C/svg%3E") center / 64% no-repeat }
.gt-avmore { font-size: ${U(1.8)}; font-weight: 600; color: var(--ink-soft); margin-left: ${U(.4)}; white-space: nowrap }
.gt-paused { position: absolute; inset: 0; z-index: 5; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: ${U(1)};
  background: rgba(238,245,255,.78); backdrop-filter: blur(8px); border-radius: ${U(3)} }
.gt-paused b { font-size: ${U(10)}; font-weight: 800; color: var(--blue-ink); letter-spacing: -.03em; line-height: 1 }
.gt-paused span { font-size: ${U(2.4)}; font-weight: 600; color: var(--ink-soft) }

/* Reveal */
.gt-rv { height: 100%; display: grid; grid-template-columns: ${U(33)} minmax(0, 1fr); gap: ${U(3.6)}; align-items: center }
.gt-rv.solo { grid-template-columns: ${U(40)} auto; justify-content: center; gap: ${U(5)} }
.gt-rv-left { display: flex; flex-direction: column; align-items: center; gap: ${U(2.2)} }
.gt-rv-left .gt-portrait { width: 100%; --frame: ${U(.9)}; --radius: ${U(2.8)}; --q: ${U(12)}; transform: rotate(-2deg) }
.gt-rv-right { min-width: 0; height: 100%; display: flex; flex-direction: column; justify-content: center }
.gt-rv.solo .gt-rv-right { height: auto }
.gt-clues { display: inline-flex; gap: ${U(.9)}; font-size: ${U(3.3)}; line-height: 1; background: #fff; border: 1px solid var(--line); border-radius: 999px;
  padding: ${U(.8)} ${U(1.8)}; box-shadow: var(--shadow-sm) }
.gt-wait { font-size: ${U(5.6)}; font-weight: 800; color: var(--blue-ink); letter-spacing: -.02em; line-height: 1.1 }
.gt-wait .gt-vn { display: block; font-size: ${U(2.3)}; letter-spacing: 0; margin-top: ${U(.6)} }
.gt-answer { margin: ${U(1)} 0 0; font-size: ${U(9.2)}; font-weight: 800; letter-spacing: -.035em; color: var(--blue-ink); line-height: 1; white-space: nowrap }
.gt-rv.solo .gt-answer { font-size: ${U(11)} }
.gt-answer .gt-mark { color: inherit }
.gt-role { margin-top: ${U(.9)}; font-size: ${U(2.5)}; font-weight: 600; color: var(--green-deep) }
.gt-collage { position: relative; flex: none; width: ${U(86)}; height: ${U(47)}; margin: ${U(2.2)} 0 ${U(1.4)} }
.gt-postcard { position: absolute; transform: translate(-50%, -50%) rotate(var(--r)); background: #fff; border-radius: ${U(1.2)}; padding: ${U(.8)};
  box-shadow: var(--shadow-pop); animation: gt-deal .7s var(--ease-out) both }
.gt-postcard img { display: block; width: 100%; height: 100%; object-fit: cover; border-radius: ${U(.5)}; background: var(--blue-pale) }
.gt-postcard::after { content: ''; position: absolute; left: 50%; top: ${U(-1.1)}; width: ${U(8)}; height: ${U(2.4)}; translate: -50% 0; rotate: calc(var(--r) * -1.5);
  background: rgba(255,228,160,.82); box-shadow: 0 1px 2px rgba(14,42,92,.08) }
.gt-postcard.t2::after { background: rgba(211,237,185,.85) }
.gt-postcard.t3::after { background: rgba(211,228,255,.88) }
@keyframes gt-deal {
  0% { opacity: 0; transform: translate(-50%, -50%) translate(${U(18)}, ${U(26)}) rotate(calc(var(--r) + 14deg)) scale(.72) }
  100% { opacity: 1; transform: translate(-50%, -50%) rotate(var(--r)) }
}
.gt-stats { display: flex; flex-wrap: wrap; gap: ${U(1)} }
.gt-rv.bare .gt-stats { justify-content: center }
.gt-stat { display: inline-flex; align-items: center; gap: ${U(.8)}; background: #fff; color: var(--blue-ink); font-size: ${U(2.05)}; font-weight: 600;
  padding: ${U(.75)} ${U(1.7)} ${U(.75)} ${U(1.3)}; border-radius: 999px; border: 1px solid var(--line); box-shadow: var(--shadow-sm); white-space: nowrap }
.gt-stat svg { width: ${U(2.4)}; height: ${U(2.4)}; flex: none }
.gt-stat .gt-team-name { font-weight: 600 }
.gt-rv.bare { display: flex; flex-direction: column; align-items: center; justify-content: space-evenly; text-align: center }

/* The live leaderboard down the side */
.gt-rail { display: flex; flex-direction: column; min-height: 0; border-radius: ${U(2.8)}; padding: ${U(2.2)} ${U(2)} }
.gt-rail-head { font-size: ${U(2.7)}; font-weight: 700; color: var(--blue-ink); margin: 0 0 ${U(1.4)} ${U(.6)}; letter-spacing: -.01em }
.gt-rows { position: relative; flex: none }
.gt-row { position: absolute; left: 0; right: 0; top: 0; height: ${U(RAIL_ROW - 0.8)}; display: flex; align-items: center; gap: ${U(1.1)};
  padding: 0 ${U(1.3)} 0 ${U(.8)}; border-radius: ${U(1.6)}; background: var(--row); font-size: ${U(2.25)};
  transition: transform .9s var(--bounce), background .3s, box-shadow .3s }
.gt-row.lead { background: var(--sun-pale); box-shadow: inset 0 0 0 2px var(--sun) }
.gt-rk { width: ${U(3.5)}; height: ${U(3.5)}; flex: none; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center;
  font-size: ${U(1.75)}; font-weight: 700; color: var(--ink-soft); background: var(--line); font-variant-numeric: tabular-nums }
.gt-rk.r1 { background: var(--sun); color: var(--sun-ink) }
.gt-rk.r2 { background: #CFD8E3; color: #3B4A5E }
.gt-rk.r3 { background: #F4BC9A; color: #7A3412 }
.gt-row .nm { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-weight: 600 }
.gt-row .sc { font-weight: 700; color: var(--blue-ink); font-variant-numeric: tabular-nums }
.gt-row .lk { flex: none; width: ${U(2.8)}; height: ${U(2.8)}; border-radius: 50%; background: var(--green-pale); color: var(--green-deep);
  display: inline-flex; align-items: center; justify-content: center }
.gt-row .lk svg { width: ${U(1.6)}; height: ${U(1.6)} }
.gt-plus { flex: none; font-size: ${U(1.7)}; font-weight: 700; color: var(--green-deep); background: var(--green-pale); padding: ${U(.25)} ${U(.8)}; border-radius: 999px }
.gt-more { margin-top: auto; padding-top: ${U(1)}; font-size: ${U(1.9)}; font-weight: 500; color: var(--ink-soft); text-align: center }
.gt-rail-empty { margin: 0 ${U(.6)}; font-size: ${U(2.1)}; color: var(--ink-soft) }

/* The leaderboard after the last teacher */
.gt-board { height: 100%; width: 100%; max-width: ${U(116)}; margin: 0 auto; display: flex; flex-direction: column; align-items: stretch }
.gt-board-head { text-align: center; margin-bottom: ${U(2)}; display: flex; flex-direction: column; align-items: center }
.gt-board-head h2 { margin: ${U(.8)} 0 0; font-size: ${U(5.8)}; font-weight: 800; letter-spacing: -.025em; color: var(--blue); line-height: 1 }
.gt-brows { position: relative; flex: none }
.gt-brow { position: absolute; left: 0; right: 0; top: 0; height: ${U(BOARD_ROW - 0.9)}; display: flex; align-items: center; gap: ${U(1.6)};
  padding: 0 ${U(2.2)} 0 ${U(1.2)}; border-radius: ${U(2)}; background: #fff; border: 1px solid var(--line); font-size: ${U(2.7)};
  box-shadow: var(--shadow-sm); transition: transform 1s var(--bounce), opacity .5s }
.gt-brow.first { background: var(--sun-pale); border-color: var(--sun); box-shadow: 0 ${U(.6)} ${U(2)} rgba(245,166,35,.22) }
.gt-brow .gt-rk { width: ${U(4.6)}; height: ${U(4.6)}; font-size: ${U(2.3)} }
.gt-brow .nm { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-weight: 600 }
.gt-climb { flex: none; font-size: ${U(1.9)}; font-weight: 700; color: var(--blue-deep); background: var(--blue-tint); padding: ${U(.3)} ${U(1)}; border-radius: 999px }
.gt-gain { flex: none; font-size: ${U(2)}; font-weight: 700; color: var(--green-deep); background: var(--green-pale); padding: ${U(.3)} ${U(1)}; border-radius: 999px }
.gt-gain.zero { color: var(--ink-soft); background: var(--row) }
.gt-brow .sc { width: ${U(13)}; text-align: right; font-size: ${U(3.2)}; font-weight: 800; color: var(--blue-ink); font-variant-numeric: tabular-nums }

/* Final */
.gt-final { height: 100%; display: flex; flex-direction: column; align-items: center }
.gt-final-head { display: flex; flex-direction: column; align-items: center; text-align: center }
.gt-final-head h2 { margin: ${U(.8)} 0 0; font-size: ${U(6.4)}; font-weight: 800; letter-spacing: -.03em; color: var(--blue); line-height: 1 }
.gt-podium { flex: 1; min-height: 0; width: 100%; display: flex; align-items: flex-end; justify-content: center; gap: ${U(2.4)} }
.gt-place { width: ${U(31)}; display: flex; flex-direction: column; align-items: center; animation: gt-up .9s var(--ease-out) both }
.gt-place .who { display: flex; flex-direction: column; align-items: center; gap: ${U(.5)}; margin-bottom: ${U(1.6)}; max-width: 100%; text-align: center }
.gt-place .who .gt-avatar { box-shadow: 0 0 0 ${U(.6)} #fff, var(--shadow) }
.gt-place.p1 .who .gt-avatar { box-shadow: 0 0 0 ${U(.6)} #fff, 0 0 0 ${U(1.1)} var(--sun), var(--shadow-pop) }
.gt-place .nm { margin-top: ${U(.9)}; font-size: ${U(3.1)}; font-weight: 700; color: var(--blue-ink); max-width: 100%; overflow: hidden; text-overflow: ellipsis; white-space: nowrap }
.gt-place .sc { font-size: ${U(2.3)}; font-weight: 600; color: var(--ink-soft); font-variant-numeric: tabular-nums }
.gt-block { position: relative; width: 100%; border-radius: ${U(2.4)} ${U(2.4)} 0 0; display: flex; justify-content: center; padding-top: ${U(1.6)};
  font-size: ${U(6.4)}; font-weight: 800; letter-spacing: -.03em; color: rgba(255,255,255,.95); text-shadow: 0 2px 10px rgba(14,42,92,.18);
  box-shadow: inset 0 ${U(.7)} 0 rgba(255,255,255,.45), var(--shadow) }
.gt-rest { display: flex; flex-wrap: wrap; justify-content: center; gap: ${U(1)}; margin-top: ${U(1.6)} }
.gt-rest > span { display: inline-flex; align-items: center; gap: ${U(.7)}; font-size: ${U(2)}; font-weight: 600; color: var(--blue-ink); background: #fff;
  border: 1px solid var(--line); padding: ${U(.5)} ${U(1.5)} ${U(.5)} ${U(.6)}; border-radius: 999px }
@keyframes gt-up { 0% { opacity: 0; transform: translateY(40%) } 100% { opacity: 1; transform: none } }
@media (prefers-reduced-motion: reduce) { .gt-postcard { animation: gt-fade .3s both } }
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
    case 'lobby': return { label: 'Start', disabled: !listReady, icon: Play }
    case 'intro': return { label: 'Go' }
    case 'round': return { label: 'Show the answer' }
    case 'reveal': return { label: isLast(g) ? 'Final leaderboard' : 'Next teacher' }
    case 'board': return { label: 'Show the podium' }
    case 'final': return { label: 'Play again', icon: RotateCcw }
    default: return { label: 'Next' }
  }
}

/** A teacher's pictures from pra.edu.vn: the ones copied in at Start, or matched now. */
const cardOf = (t, staff) => (t ? t.pic || staffFor(t, staff) : null)

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

  // The teachers' pictures from pra.edu.vn (staff.js).
  const [site, setSite] = useState({ staff: [], where: 'loading' })
  const staffRef = useRef([])

  const joinUrl = useMemo(() => `${window.location.origin}${import.meta.env.BASE_URL}classroom/#/play/${room}`, [room])
  const joinText = useMemo(() => `${window.location.host}/play`, [])

  useEffect(() => {
    let alive = true
    loadList().then((res) => {
      if (!alive) return
      setList(res.list)
      setListStatus({ state: res.where, error: res.error })
    })
    loadStaff().then((res) => {
      if (!alive) return
      staffRef.current = res.staff
      setSite(res)
    })
    return () => { alive = false }
  }, [])

  // Every picture the game may reveal starts loading now, so none arrives late.
  useEffect(() => {
    if (!list || !site.staff.length) return
    list.teachers.filter(ready).forEach((t) => preload(staffFor(t, site.staff)))
  }, [list, site])
  useEffect(() => {
    game.sets.forEach((t) => preload(cardOf(t, site.staff)))
  }, [game.sets, site])

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
      // A soft card sound as each photo lands on the collage.
      const photos = cardOf(teacherOf(g), staffRef.current)?.photos.length || 0
      for (let i = 0; i < photos; i++) later(SUSPENSE_MS + POSTCARD_AT + i * POSTCARD_GAP + 250, () => play('card'))
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
      // A name the phone should not have let through (words.js): back to the join screen.
      if (isRude(msg.name)) {
        busRef.current?.send('kick', { to: msg.pid, why: 'name' })
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
      apply({ type: 'locked', pid: msg.pid, ok: res.ok, pts: res.pts, ms: res.ms, other: res.other, now: t })
      busRef.current?.send('locked', { to: msg.pid, no: msg.no })
      // The round always runs its full minute, even once every team has
      // locked in: only the clock or Show the answer ends it.
      play('lock')
    }
  }, [apply, sendState])

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
  const pictured = list ? list.teachers.filter((t) => ready(t) && staffFor(t, site.staff)).length : 0

  const startGame = useCallback(() => {
    unlockAudio()
    if (!list) return
    // Each teacher's pictures go into the game with them, so the phones get the portrait at the reveal.
    const sets = setsFor(list).map((t) => ({ ...t, pic: staffFor(t, staffRef.current) }))
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
  const NextIcon = step.icon || ArrowRight
  const running = Boolean(game.round?.runFrom)

  return (
    <div className="gt gt-tv">
      <style>{BASE_CSS + TV_CSS + EDITOR_CSS}</style>
      <Backdrop />
      <div className="gt-in">
        <div className="gt-top">
          <img className="gt-logo" src={`${import.meta.env.BASE_URL}logo.png`} alt="Palm River Academy" draggable={false} />
          <span className="gt-gamename">Guess the Teacher</span>
          {phase !== 'lobby' ? <Progress game={game} /> : <span className="gt-prog" />}
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
              pictured={pictured}
              site={site}
              listStatus={listStatus}
              onEdit={list ? () => setEditing(true) : null}
              onRemove={removeTeam}
            />
          )}
          {phase === 'intro' && <Intro game={game} />}
          {phase === 'round' && <RoundView game={game} now={now} />}
          {phase === 'reveal' && <RevealView game={game} now={now} staff={site.staff} />}
          {phase === 'board' && <BoardView game={game} now={now} onRemove={removeTeam} />}
          {phase === 'final' && <FinalView game={game} />}
        </div>
        <div className="gt-bottom">
          <div>
            {net === 'offline' && <div className="gt-offline"><WifiOff /> No internet: phones cannot reach the TV</div>}
            {phase !== 'lobby' && (
              <div className="gt-joinchip">
                <QrCode text={joinUrl} className="qr" ink="#0E2A5C" />
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
          staff={site.staff}
          site={site.where}
          onChange={editList}
          onClose={() => { flushSave(); setEditing(false) }}
        />
      )}
    </div>
  )
}

/** Which teacher this is: a bar per teacher, the done ones blue, this one gold, the last marked ×2. */
function Progress({ game }) {
  const n = game.sets.length
  const final = game.phase === 'board' || game.phase === 'final'
  return (
    <div className="gt-prog" aria-label={final ? 'All teachers done' : `Teacher ${game.r + 1} of ${n}`}>
      <b>{final ? 'Final results' : `Teacher ${game.r + 1} of ${n}`}</b>
      {game.sets.map((_, i) => {
        const done = final || i < game.r || (i === game.r && game.phase === 'reveal')
        return <span key={i} className={`gt-seg ${done ? 'done' : i === game.r ? 'now' : ''}`} />
      })}
      {n >= 3 && <span className="gt-x2">×2</span>}
    </div>
  )
}

/** A hand-drawn green line under a word, as on the website's headings. */
function Mark({ children }) {
  return (
    <span className="gt-mark">
      {children}
      <svg viewBox="0 0 300 24" preserveAspectRatio="none" aria-hidden="true">
        <path d="M4 15 C 70 5, 160 4, 296 11" fill="none" stroke="#9CC64A" strokeWidth="9" strokeLinecap="round" />
      </svg>
    </span>
  )
}

function Lobby({ game, room, joinUrl, joinText, playable, pictured, site, listStatus, onEdit, onRemove }) {
  const n = game.players.length
  const size = n > 30 ? 'small' : n > 14 ? 'mid' : ''
  const saved = listStatus.state === 'laptop'
    ? { cls: 'warn', text: 'List saved on this laptop only' }
    : listStatus.state === 'loading' ? { cls: '', text: 'Loading the list…' } : { cls: '', text: 'The last teacher counts double' }
  const photos = site.where === 'loading'
    ? { cls: '', text: 'Finding photos on pra.edu.vn…' }
    : site.where === 'none'
      ? { cls: 'warn', text: 'Could not reach pra.edu.vn: names only at the reveal' }
      : { cls: pictured === playable ? 'ok' : '', text: `Photos from pra.edu.vn for ${pictured} of ${playable}` }
  return (
    <div className="gt-lobby">
      <div className="gt-lobby-left">
        <div>
          <span className="gt-eyebrow green">Family game</span>
          <h1 className="gt-hero">Guess the <Mark>Teacher</Mark></h1>
          <p className="gt-lede">Emojis on the TV. One teacher. Who is it?</p>
        </div>
        <div className="gt-join gt-card">
          <QrCode text={joinUrl} className="qr" ink="#0E2A5C" />
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
          <Step n={1} en="Look at the emojis on the TV" vn="Xem các emoji trên TV" />
          <Step n={2} en="Type the teacher's name on your phone and lock it in" vn="Nhập tên giáo viên trên điện thoại và chốt đáp án" />
          <Step n={3} en="Lock in sooner, score more. Answers at the end!" vn="Chốt càng sớm, càng nhiều điểm. Đáp án ở cuối!" />
        </div>
      </div>
      <div className="gt-teams gt-card">
        <div className="gt-teams-head">Teams <span className="gt-count">{n}</span></div>
        {n === 0 ? (
          <div className="gt-waiting">
            <span className="gt-ellipsis" aria-hidden="true"><i>•</i><i>•</i><i>•</i></span>
            <b>Waiting for teams</b>
            <span>Scan the code with a phone to join</span>
            <span className="gt-vn">Quét mã bằng điện thoại để tham gia</span>
          </div>
        ) : (
          <div className="gt-team-grid">
            {game.players.map((p) => (
              <span key={p.pid} className={`gt-team gt-pop ${size}`}>
                <Avatar emoji={p.avatar} color={p.color} size="1.7em" />
                <span className="gt-team-name">{p.name}</span>
                <button type="button" className="gt-x" onClick={() => onRemove(p)} aria-label={`Remove ${p.name}`}>×</button>
              </span>
            ))}
          </div>
        )}
        <div className="gt-setlist">
          <p>
            {listStatus.state === 'loading' ? 'Teachers…' : `${playable} ${playable === 1 ? 'teacher' : 'teachers'} to guess`}
            <small className={saved.cls}>{saved.text}</small>
            <small className={photos.cls}>{photos.text}</small>
          </p>
          <button type="button" className="gt-btn" onClick={onEdit} disabled={!onEdit}><Pencil /> Edit teachers</button>
        </div>
      </div>
    </div>
  )
}

function Step({ n, en, vn }) {
  return (
    <div className="gt-step">
      <i>{n}</i>
      <span><b>{en}</b><span className="gt-vn">{vn}</span></span>
    </div>
  )
}

function Intro({ game }) {
  const double = isDouble(game)
  return (
    <div className="gt-intro">
      <span className={`gt-eyebrow gt-rise ${isLast(game) ? 'sun' : ''}`}>{isLast(game) ? 'Last teacher' : 'Next teacher'}</span>
      <div className="gt-intro-num gt-stamp">{game.r + 1}</div>
      <div className="gt-intro-of gt-rise" style={{ animationDelay: '.2s' }}>of {game.sets.length}</div>
      {double && <div className="gt-double gt-pop" style={{ animationDelay: '.5s' }}>Double points ×2</div>}
      <div className="gt-intro-ready gt-rise" style={{ animationDelay: '.4s' }}>
        Phones ready!
        <span className="gt-vn">Chuẩn bị điện thoại!</span>
      </div>
    </div>
  )
}

function Cards({ emojis, shown, small = false }) {
  const n = Math.max(1, emojis.length)
  const each = small ? 13 : 26
  return (
    <div className={`gt-cards ${small ? 'small' : ''}`} style={{ gridTemplateColumns: `repeat(${n}, 1fr)`, maxWidth: U(n * each) }}>
      {emojis.map((e, i) => (
        <div key={i} className="gt-slot">
          <div className={`gt-flip ${i < shown ? '' : 'down'}`}>
            <div className="gt-face" style={{ fontSize: U(small ? 6.4 : 13) }}>{e}</div>
            <div className="gt-back">
              <div className="gt-frond" />
              <b style={{ fontSize: U(small ? 4 : 7) }}>?</b>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

const RING = 2 * Math.PI * 44
const clockColor = (secs) => (secs > 20 ? '#116DFF' : secs > 10 ? '#F5A623' : '#D2452F')

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
      <b style={{ color: secs <= 10 ? color : undefined }}>{secs}</b>
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
  const shownTeams = game.players.slice(0, DOCK_MAX)
  return (
    <div className="gt-play">
      <div className="gt-stage">
        <div className="gt-q">
          {isDouble(game) && <span className="gt-eyebrow sun">Double points</span>}
          <h2>Who is this teacher?</h2>
          <span className="gt-vn">Đây là giáo viên nào?</span>
        </div>
        <Cards emojis={t.emojis} shown={shownAt(elapsed, t.emojis.length)} />
        <div className="gt-dock gt-card">
          <Ring round={round} left={left} />
          <div className="gt-worth">
            <small>Lock in now for</small>
            <b>{pointsFor(left, isDouble(game))}<span>points</span></b>
          </div>
          <span className="gt-dock-sep" />
          <div className="gt-have">
            <small>Locked in · Đã chốt</small>
            <b>{locked} of {total} {total === 1 ? 'team' : 'teams'}</b>
            <div className="gt-avs">
              {shownTeams.map((p) => (
                <span key={p.pid} className={`gt-av ${round.guesses[p.pid] ? 'in' : ''}`}>
                  <Avatar emoji={p.avatar} color={p.color} size={U(4.2)} />
                </span>
              ))}
              {total > DOCK_MAX && <span className="gt-avmore">+ {total - DOCK_MAX}</span>}
            </div>
          </div>
        </div>
        {paused && (
          <div className="gt-paused">
            <b>Paused</b>
            <span>Press P to carry on</span>
          </div>
        )}
      </div>
      <Rail game={game} />
    </div>
  )
}

// Where the photos land on the collage, by how many there are: the centre
// (x, y, as % of the collage) and width (% of its width, for a 4:3 photo), and
// a tilt. The collage is 86 × 47 units, so a photo w% wide is w × 1.37% high.
const LAYOUTS = {
  1: [[50, 50, 64, -1.5]],
  2: [[29, 42, 50, -4], [71, 58, 50, 3]],
  3: [[24, 31, 43, -5], [72, 30, 43, 4], [48, 70, 43, -1.5]],
  4: [[24, 26, 36, -4], [74, 25, 36, 3], [27, 74, 36, 2.5], [71, 75, 36, -3]],
  5: [[19, 27, 34, -5], [51, 23, 34, 3], [82, 28, 34, -2], [33, 74, 34, 3.5], [68, 74, 34, -3.5]],
  6: [[17, 26, 32, -4], [50, 23, 32, 3], [83, 27, 32, -2.5], [18, 74, 32, 2], [50, 77, 32, -3], [82, 73, 32, 4]],
}

/** The photos of the teacher at work, dealt onto the table one by one. */
function Collage({ photos }) {
  const [gone, setGone] = useState({})
  const shown = photos.filter((p) => !gone[p.src])
  const slots = LAYOUTS[Math.min(shown.length, 6)] || []
  if (!shown.length) return null
  return (
    <div className="gt-collage" aria-label={`${shown.length} ${shown.length === 1 ? 'photo' : 'photos'} from pra.edu.vn`}>
      {shown.slice(0, 6).map((p, i) => {
        const [x, y, w, r] = slots[i]
        const tall = p.h > p.w
        // A tall photo keeps the height of the others, so the layout still fits.
        const width = tall ? w * 0.5625 : w
        return (
          <div
            key={p.src}
            className={`gt-postcard t${(i % 3) + 1}`}
            style={{ left: `${x}%`, top: `${y}%`, width: `${width}%`, aspectRatio: tall ? '3 / 4' : '4 / 3', '--r': `${r}deg`, zIndex: i + 1, animationDelay: `${(POSTCARD_AT + i * POSTCARD_GAP) / 1000}s` }}
          >
            <img src={p.src} alt={p.alt} title={p.alt} style={p.pos ? { objectPosition: p.pos } : undefined} draggable={false} onError={() => setGone((g) => ({ ...g, [p.src]: true }))} />
          </div>
        )
      })}
    </div>
  )
}

function RevealStats({ game, round, named }) {
  const right = rightOf(round)
  const total = game.players.length
  const [fastPid, fastRes] = right[0] || []
  const fast = fastPid && game.players.find((p) => p.pid === fastPid)
  // The other teacher most teams named, if any did.
  const tally = {}
  Object.values(round.guesses).forEach((x) => { if (x.other != null) tally[x.other] = (tally[x.other] || 0) + 1 })
  const [otherIdx, otherN] = Object.entries(tally).sort((a, b) => b[1] - a[1])[0] || []
  const at = (POSTCARD_AT + 400) / 1000
  return (
    <div className="gt-stats" style={{ visibility: named ? 'visible' : 'hidden' }}>
      <span className="gt-stat gt-rise" style={{ animationDelay: `${at}s` }}>
        <CircleCheck style={{ color: 'var(--green-deep)' }} /> {right.length} of {total} {total === 1 ? 'team' : 'teams'} got it
      </span>
      {fast && (
        <span className="gt-stat gt-rise" style={{ animationDelay: `${at + 0.25}s` }}>
          <Zap style={{ color: 'var(--sun-deep)' }} /> Fastest <Avatar emoji={fast.avatar} color={fast.color} size="1.35em" /> <span className="gt-team-name">{fast.name}</span> · {(fastRes.ms / 1000).toFixed(1)} s
        </span>
      )}
      {otherN > 0 && game.sets[otherIdx] && (
        <span className="gt-stat gt-rise" style={{ animationDelay: `${at + 0.5}s` }}>
          <MessageCircleQuestion style={{ color: 'var(--violet)' }} /> {otherN} {otherN === 1 ? 'team' : 'teams'} said {game.sets[otherIdx].name}
        </span>
      )}
    </div>
  )
}

/**
 * The reveal. A drumroll over the teacher's silhouette ("And the teacher
 * is…"), then the portrait in colour, the name, their role, and the photos of
 * them at work dealt out as a collage, all from pra.edu.vn. A teacher the
 * website has no card for gets the emojis and the name.
 */
function RevealView({ game, now, staff }) {
  const t = teacherOf(game)
  const round = game.round
  const card = cardOf(t, staff)
  const [noFace, setNoFace] = useState(false)
  if (!t || !round) return null
  const named = now - game.phaseAt >= SUSPENSE_MS
  const wait = (
    <div className="gt-wait">
      And the teacher is<span className="gt-ellipsis"><i>.</i><i>.</i><i>.</i></span>
      <span className="gt-vn">Và giáo viên đó là…</span>
    </div>
  )
  const name = (
    <>
      <span className="gt-eyebrow green gt-rise">It's</span>
      <h2 className="gt-answer gt-stamp"><Mark>{t.name}</Mark></h2>
      {card?.role && <div className="gt-role gt-rise" style={{ animationDelay: '.25s' }}>{card.role}</div>}
    </>
  )

  if (!card || noFace) {
    return (
      <div className="gt-play">
        <div className="gt-stage">
          <div className="gt-rv bare">
            <Cards emojis={t.emojis} shown={t.emojis.length} small />
            <div>{named ? name : wait}</div>
            <RevealStats game={game} round={round} named={named} />
          </div>
        </div>
        <Rail game={game} hold={!named} />
      </div>
    )
  }

  const solo = !card.photos.length
  return (
    <div className="gt-play">
      <div className="gt-stage">
        <div className={`gt-rv ${solo ? 'solo' : ''}`}>
          <div className="gt-rv-left">
            <Portrait src={card.portrait} tone={card.tone} dark={!named} onFail={() => setNoFace(true)} />
            <span className="gt-clues" aria-label="The emojis">{t.emojis.map((e, i) => <span key={i}>{e}</span>)}</span>
          </div>
          <div className="gt-rv-right">
            {named ? (
              <>
                <div>{name}</div>
                {!solo && <Collage key={round.t} photos={card.photos} />}
                {solo && <div style={{ height: U(3) }} />}
                <RevealStats game={game} round={round} named={named} />
              </>
            ) : wait}
          </div>
        </div>
      </div>
      <Rail game={game} hold={!named} />
    </div>
  )
}

/** A place, as a number in a circle: gold, silver and bronze for the top three once anyone has points. */
function Rank({ rank, medal }) {
  return <span className={`gt-rk ${medal && rank <= 3 ? `r${rank}` : ''}`}>{rank}</span>
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
    <aside className="gt-rail gt-card">
      <div className="gt-rail-head">Leaderboard</div>
      {rows.length === 0 && <p className="gt-rail-empty">No teams yet</p>}
      <div className="gt-rows" style={{ height: U(top.length * RAIL_ROW) }}>
        {top.map((p) => {
          const guess = round?.guesses[p.pid]
          return (
            <div key={p.pid} className={`gt-row ${p.rank === 1 && anyPoints ? 'lead' : ''}`} style={{ transform: `translateY(${U((p.rank - 1) * RAIL_ROW)})` }}>
              <Rank rank={p.rank} medal={anyPoints} />
              <Avatar emoji={p.avatar} color={p.color} size={U(3.9)} />
              <span className="nm gt-team-name">{p.name}</span>
              {game.phase === 'round' && guess && <span className="lk" title="Locked in"><Lock /></span>}
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
        <span className="gt-eyebrow">After all {game.sets.length} teachers</span>
        <h2>Leaderboard</h2>
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
              <Rank rank={rank} medal />
              <Avatar emoji={p.avatar} color={p.color} size={U(4.6)} />
              <span className="nm gt-team-name">{p.name}</span>
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
  { place: 2, height: 19, delay: 1.1, bg: 'linear-gradient(180deg, #DCE4EE, #A9B8CB)' },
  { place: 1, height: 27, delay: 2.1, bg: 'linear-gradient(180deg, #FFD785, #F5A623)' },
  { place: 3, height: 12.5, delay: 0.3, bg: 'linear-gradient(180deg, #FFC2A6, #E0855A)' },
]

function FinalView({ game }) {
  const rows = ranked(game.players)
  const rest = rows.slice(3, 12)
  if (!rows.length) {
    return (
      <div className="gt-final">
        <div className="gt-final-head"><h2>Thanks for playing!</h2></div>
      </div>
    )
  }
  return (
    <div className="gt-final">
      <div className="gt-final-head gt-rise">
        <span className="gt-eyebrow green">Thanks for playing</span>
        <h2>Final results</h2>
      </div>
      <div className="gt-podium">
        {PODIUM.map(({ place, height, delay, bg }) => {
          const p = rows[place - 1]
          if (!p) return <div key={place} className="gt-place" style={{ visibility: 'hidden' }} />
          return (
            <div key={place} className={`gt-place p${place}`} style={{ animationDelay: `${delay}s` }}>
              <div className="who">
                <Avatar emoji={p.avatar} color={p.color} size={U(place === 1 ? 11 : 8.6)} />
                <span className="nm gt-team-name">{p.name}</span>
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
              <Avatar emoji={p.avatar} color={p.color} size="1.5em" /> {ordinal(p.rank)} <span className="gt-team-name">{p.name}</span> · {p.score.toLocaleString('en-US')}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}
