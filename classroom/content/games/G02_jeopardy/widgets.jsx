// content/games/G02_jeopardy/widgets.jsx
// Jeopardy — a revision quiz for the front of the room. Six categories, five
// clues each, teams on the board and a running score.
//
// Why a game and not a slide: the deck can already *ask* a question. What it
// cannot do is let a room of teams choose which question to take, hold the
// answer back until the class has argued, and keep score honestly across
// thirty of them. That is the whole widget — choose, wait, reveal, award.
// There is nothing else to fiddle with: no sliders, no wagering. The only two
// things that are not text are there because the room needs them — thinking
// music under the countdown, and a photograph on the handful of clues where
// seeing the thing IS the answer.
//
// Five decisions worth knowing about:
//   · The teacher reveals. The answer never appears on a timer, because the
//     value of the pause is the class arguing in English while it is hidden.
//   · The COUNTDOWN, unlike the answer, starts on its own the moment a clue
//     opens, and the music runs with it. One press instead of two, and the
//     room hears that it is on the clock without anyone watching the number.
//     A teacher who wants the thinking time back stops it with one tap, or
//     turns the whole thing off in Setup before the game starts.
//   · Points can go to more than one team, or to nobody. Both happen in a real
//     room, and a game that cannot record "nobody got it" gets fudged — and
//     any score can be corrected by hand afterwards, because a scoreboard that
//     cannot be fixed gets abandoned the first time the teacher mis-taps.
//   · The board cells are Jeopardy navy and gold in BOTH themes. That is a
//     fixed-colour surface on purpose, so every colour on it is written out
//     explicitly rather than inherited from the theme — the trap that turned
//     bold text white-on-white in dark mode.
//   · A clue's picture, where it has one, is held back with the answer unless
//     the question names the thing already. How many clues want one depends
//     entirely on who is in the room: six of the 120 Year 7 clues have a
//     picture, because a photograph next to "What is 9²?" is decoration — and
//     29 of the 30 Kindergarten clues do, because a five-year-old who has just
//     said "chopsticks" has not finished the clue until they have seen a pair.
//     The Year 1 board goes one step further and lets the pictures BE the
//     clue: a line of words over one to three photographs, and on a choice the
//     right one lights up green when the teacher reveals.
//
// The board is a grid whose rows divide whatever height the slide gives it, so
// it fills a projector without ever growing a scrollbar.
import { useState, useEffect, useRef, useCallback, createElement } from 'react'
import {
  Calculator, FlaskConical, Trophy, Gamepad2, ArrowLeft, Plus, X,
  Play, Pause, Eye, Check, Timer, Flag, RotateCcw, Crown, Users, Sparkles,
  Music, Volume2, VolumeX, Pencil, CookingPot, Apple, Atom, Rocket, Globe,
  Variable, Droplets, Orbit, Sun, PawPrint,
} from 'lucide-react'

import { tr, field, isEnFr } from '../../../src/lib/lang.js'
import { useGameRemote } from '../../../src/lib/deckControls.js'
import { BOARDS } from './boards.js'
import { TEAM_COLOURS, VALUES, TIMER_SECONDS, MIN_TEAMS, MAX_TEAMS, SCORE_STEPS, cellKey } from './rules.js'

// Clue pictures. A clue may carry `qImage` (shown as soon as the clue opens,
// because seeing the thing is part of understanding the question) and/or
// `aImage` (held back until the teacher reveals, because the picture IS the
// answer). Either is `{ src, alt, altVn }`; both are optional, and most clues
// have neither — see images.js for why that is the default.
//
// The picture always lives in the flexible middle of the clue card, never in
// the answer panel below it. That region already takes whatever height is left
// over, so a photo shrinks the question text instead of pushing the award
// buttons off the bottom of a 768px-tall window.
// EN+FR (PRA Learn's language switch, on this lesson only): the English as
// usual, and the clue's French under it, smaller and grey. tr() and field()
// read 'en+fr' as English, so every button stays English. A board without
// French twins (the older EN/VN boards) shows English alone.
const frTwin = (obj, key, lang) => (isEnFr(lang) && obj?.[`${key}Fr`]) || null

const clueImage = (clue, revealed) =>
  (revealed ? clue.aImage ?? clue.qImage : clue.qImage) ?? null

// A clue led by its pictures (`qImages`), for a class that cannot read the
// question. The words shrink to one line over the top and the pictures share
// everything below it, because on a projector a photo beside a sentence is
// half the size it could be.
//
// Each picture sits absolutely inside a box that flexes, so a photo's own
// pixel size can never push the award buttons off the bottom: revealing the
// answer shrinks the pictures instead. With two to four pictures each gets a
// frame, and on the reveal the `aIndex` one goes green and the rest fade — the
// class sees which picture was right without having to read the answer.
//
// A `qImage` here is not a choice: it sits beside the question at the height
// of the words, like a flag next to "Which one is from Japan?". It is sized in
// em so it grows with the question in project mode, and it has a border
// because a Japanese flag on a white card is otherwise a red dot.
function PictureClue({ clue, lang, big, revealed }) {
  const choice = clue.qImages.length > 1
  return (
    <div className="flex-1 min-h-0 flex flex-col gap-2 sm:gap-3">
      <div className={`shrink-0 flex items-center justify-center gap-3 font-black tracking-tight leading-tight text-slate-800 dark:text-slate-100 ${big ? 'text-[clamp(1.5rem,3vw,3.2rem)]' : 'text-xl sm:text-3xl'}`}>
        {clue.qImage && (
          <img
            src={clue.qImage.src}
            alt={field(clue.qImage, 'alt', lang)}
            className="shrink-0 h-[1.5em] w-auto rounded-md border-2 border-slate-200 dark:border-slate-700"
          />
        )}
        <p className="min-w-0 text-center">
          {glue(field(clue, 'q', lang))}
        </p>
      </div>
      <div className="flex-1 min-h-0 flex gap-2 sm:gap-4">
        {clue.qImages.map((image, i) => {
          const right = revealed && choice && i === clue.aIndex
          const faded = revealed && choice && i !== clue.aIndex
          return (
            <figure
              key={i}
              className={`relative flex-1 min-w-0 min-h-0 m-0 flex flex-col gap-1 transition-opacity duration-300 ${
                choice ? 'rounded-2xl border-4 p-1.5 sm:p-2' : ''
              } ${
                right
                  ? 'border-[#58cc02] bg-[#f0fdf4] dark:bg-emerald-500/15'
                  : choice ? 'border-slate-100 dark:border-slate-800' : ''
              } ${faded ? 'opacity-30' : ''}`}
            >
              <div className="relative flex-1 min-h-0">
                <img
                  src={image.src}
                  alt={field(image, 'alt', lang)}
                  className="absolute inset-0 w-full h-full object-contain"
                />
              </div>
              {image.label && (
                <figcaption className={`shrink-0 text-center font-black tracking-tight leading-tight text-slate-800 dark:text-slate-100 ${big ? 'text-[clamp(1.3rem,2.6vw,2.8rem)]' : 'text-lg sm:text-2xl'}`}>
                  {field(image, 'label', lang)}
                </figcaption>
              )}
              {right && (
                <span className="absolute -top-3 -right-3 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-[#58cc02] text-white flex items-center justify-center shadow-lg animate-in zoom-in duration-200">
                  <Check className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={4} />
                </span>
              )}
            </figure>
          )
        })}
      </div>
    </div>
  )
}

// Thinking music. Six free tracks — lofi first, because that is what the room
// responds to — with licences and sources in audio/CREDITS.json.
//
// What is NOT here, and cannot be: the television show's countdown cue. It is
// still in copyright, and so is a re-recorded "free version" of it, which is a
// cover of a protected tune rather than a way round it. Lift Motif is the
// honest substitute — forty-four seconds of waiting music, an original
// composition, doing the job the cue does in the room rather than repeating
// the tune it does it with.
//
// Vite fingerprints these like any other asset, so they are imported rather
// than written as paths.
import studyAndRelax from './audio/study-and-relax.ogg'
import lofi from './audio/lofi.mp3'
import liftMotif from './audio/lift-motif.ogg'
import bossBattle from './audio/boss-battle.opus'
import timeAttack from './audio/time-attack.ogg'
import phonk from './audio/phonk.opus'

const ICONS = { Calculator, FlaskConical, Trophy, Sparkles, CookingPot, Apple, Atom, Rocket, Globe, Variable, Droplets, Orbit, Sun, PawPrint }

// The clue countdown (TIMER_SECONDS, in rules.js), and the music that runs with it.
// Loud enough to be heard over a room of Year 7s arguing, quiet enough that
// the teacher does not have to raise their voice to read the clue again.
const MUSIC_VOLUME = 0.35
// Switched off for now, to be fixed later. While this is false nothing plays —
// not under the countdown, not as a preview in Setup — and the track picker and
// the sound button are hidden. The tracks stay imported and credited so turning
// it back on is this one line.
const MUSIC_ON = false

const TRACKS = [
  // The descriptor line has about twenty characters before it truncates at
  // three cards across. The longer advice — which track suits which row of the
  // board — lives in the teacher plan, where there is room to say it properly.
  { id: 'study-and-relax', src: studyAndRelax, name: 'Study And Relax', nameVn: 'Study And Relax', by: 'lofi · warped tape', byVn: 'lofi · băng cũ', byFr: 'lofi · bande usée' },
  { id: 'lofi', src: lofi, name: 'Lofi', nameVn: 'Lofi', by: 'lofi · straight up', byVn: 'lofi · thuần chất', byFr: 'lofi · pur et simple' },
  { id: 'lift-motif', src: liftMotif, name: 'Lift Motif', nameVn: 'Lift Motif', by: 'the thinking one', byVn: 'nhạc để suy nghĩ', byFr: 'pour réfléchir' },
  { id: 'boss-battle', src: bossBattle, name: 'Boss Battle', nameVn: 'Boss Battle', by: '8-bit · heavy', byVn: '8-bit · nặng đô', byFr: '8-bit · intense' },
  { id: 'time-attack', src: timeAttack, name: 'Time Attack', nameVn: 'Time Attack', by: 'chiptune · 40s', byVn: 'chiptune · 40 giây', byFr: 'chiptune · 40 s' },
  { id: 'phonk', src: phonk, name: 'Current', nameVn: 'Current', by: 'phonk · their music', byVn: 'phonk · gu các em', byFr: 'phonk · leur musique' },
]

// Fade rather than cut. A clip that stops dead sounds like something broke,
// and the teacher is usually still talking over the last second of it.
function fadeOutAndStop(audio, ms = 450) {
  const step = 40
  const drop = audio.volume / Math.max(1, ms / step)
  const id = setInterval(() => {
    audio.volume = Math.max(0, audio.volume - drop)
    if (audio.volume <= 0.001) {
      clearInterval(id)
      audio.pause()
    }
  }, step)
}

// Interface strings in English, Vietnamese and French, kept in one place so
// nothing ships English-only. The deck's switch reads EN / VN / FR: the older
// boards carry Vietnamese twins and the boards built from Unit 4 on carry
// French ones, and a clue with no twin in the chosen language falls back to
// English (`field`), never to the other translation.
const T = {
  brand: ['Jeopardy', 'Jeopardy', 'Jeopardy'],
  chooseBoard: ['Choose a board', 'Chọn bảng chơi', 'Choisis un plateau'],
  teams: ['Teams', 'Các đội', 'Équipes'],
  team: ['Team', 'Đội', 'Équipe'],
  addTeam: ['Add a team', 'Thêm một đội', 'Ajouter une équipe'],
  start: ['Start the game', 'Bắt đầu chơi', 'Commencer la partie'],
  setup: ['Setup', 'Cài đặt', 'Réglages'],
  finish: ['Finish', 'Kết thúc', 'Terminer'],
  left: ['clues left', 'câu còn lại', 'questions restantes'],
  reveal: ['Show the answer', 'Hiện đáp án', 'Montrer la réponse'],
  answer: ['Answer', 'Đáp án', 'Réponse'],
  close: ['Close', 'Đóng', 'Fermer'],
  whoGotIt: ['Who answered correctly?', 'Đội nào trả lời đúng?', 'Qui a bien répondu ?'],
  award: ['Award', 'Cộng', 'Donner'],
  points: ['points', 'điểm', 'points'],
  noPoints: ['Nobody — no points', 'Không đội nào — không cộng điểm', 'Personne — pas de points'],
  startTimer: ['Start 30 seconds', 'Bấm giờ 30 giây', 'Lancer 30 secondes'],
  stopTimer: ['Stop the timer', 'Dừng đồng hồ', 'Arrêter le chrono'],
  timeUp: ['Time is up!', 'Hết giờ rồi!', 'Temps écoulé !'],
  music: ['Thinking music', 'Nhạc suy nghĩ', 'Musique de réflexion'],
  soundOff: ['Sound off', 'Tắt tiếng', 'Couper le son'],
  soundOn: ['Sound on', 'Bật tiếng', 'Remettre le son'],
  autoTimer: ['The timer starts by itself', 'Đồng hồ tự chạy khi mở câu hỏi', 'Le chrono démarre tout seul'],
  editScores: ['Edit scores', 'Sửa điểm', 'Modifier les scores'],
  done: ['Done', 'Xong', 'Terminé'],
  finalTitle: ['Final scores', 'Điểm chung cuộc', 'Scores finaux'],
  winner: ['Winner', 'Đội thắng', 'Gagnant'],
  tie: ['It is a tie!', 'Hoà nhau rồi!', 'Égalité !'],
  sameBoard: ['Play this board again', 'Chơi lại bảng này', 'Rejouer ce plateau'],
  otherBoard: ['Choose another board', 'Chọn bảng khác', 'Choisir un autre plateau'],
  minTeams: ['Two teams at least', 'Cần ít nhất hai đội', 'Au moins deux équipes'],
}
const t = (lang, key) => tr(lang, ...T[key])

// Keep a sum on one line. The space either side of an operator becomes a
// no-break space, so "40.0 − 6.4" can never wrap as "40.0 −" over "6.4" —
// which on a projector reads as two different numbers. French puts a space
// before : ? ! ; and inside « », and those become no-break spaces too, so a
// line never starts with ": 31.2" or a lone "?".
const glue = (text) => text
  ?.replace(/ ([−+×÷=<>]) /g, ' $1 ')
  .replace(/ ([:?!;»])/g, ' $1')
  .replace(/« /g, '« ')

// The team colours, the clue values and the rest of the numbers the phone
// remote shares are in rules.js.

// ── Confetti ────────────────────────────────────────────────────────────────
// Squares of paper thrown once, on a canvas sized to the widget so nothing
// escapes the slide.
function useConfetti(canvasRef) {
  return useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const box = canvas.getBoundingClientRect()
    canvas.width = box.width
    canvas.height = box.height
    const ctx = canvas.getContext('2d')
    const colours = ['#ffc800', '#58cc02', '#1cb0f6', '#ec4899', '#8b5cf6']
    const bits = Array.from({ length: 150 }, () => ({
      x: canvas.width / 2,
      y: canvas.height * 0.5,
      vx: (Math.random() - 0.5) * 24,
      vy: -Math.random() * 22 - 5,
      size: Math.random() * 9 + 5,
      colour: colours[Math.floor(Math.random() * colours.length)],
      rot: Math.random() * 360,
      spin: (Math.random() - 0.5) * 12,
    }))

    let frame
    const step = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      let alive = false
      bits.forEach((b) => {
        b.x += b.vx; b.y += b.vy; b.vy += 0.55; b.vx *= 0.98; b.rot += b.spin
        if (b.y < canvas.height + 30) alive = true
        ctx.save()
        ctx.translate(b.x, b.y)
        ctx.rotate((b.rot * Math.PI) / 180)
        ctx.fillStyle = b.colour
        ctx.fillRect(-b.size / 2, -b.size / 2, b.size, b.size * 0.7)
        ctx.restore()
      })
      if (alive) frame = requestAnimationFrame(step)
      else ctx.clearRect(0, 0, canvas.width, canvas.height)
    }
    step()
    return () => cancelAnimationFrame(frame)
  }, [canvasRef])
}

// ── Setup ───────────────────────────────────────────────────────────────────

// Padded p-2 rather than p-3, because the fifth board tipped the Setup column
// 45px past a 1440×900 window and a Setup screen that scrolls is one the
// teacher has to hunt around in with the class already watching. The sixth
// board moved the music picker over to the teams column instead of shaving
// this again. By the ninth the column was 100px over, so the boards now sit
// two across in the wider of two columns, and eleven fit a 1440×900 window
// with about 30px to spare in Vietnamese, the longer language. The twelfth
// filled the last row without adding one. The thirteenth added a row and ran
// 26px over in English, so from xl up the boards column takes three quarters
// of the width, not five sevenths: that puts all but the two Teens subtitles
// on one line, and the teams column still has 300px. A fourteenth fills the
// last row; a fifteenth should check this height again.
function BoardCard({ board, lang, selected, onPick }) {
  return (
    <button
      type="button"
      onClick={onPick}
      className={`w-full text-left rounded-2xl bg-white dark:bg-slate-900 border-2 border-b-[6px] p-2 flex items-start gap-2.5 transition-all active:border-b-2 active:translate-y-[4px] ${
        selected
          ? 'border-slate-800 dark:border-slate-200'
          : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
      }`}
    >
      <span
        className="w-10 h-10 shrink-0 rounded-xl flex items-center justify-center text-white shadow-sm"
        style={{ backgroundColor: board.accent }}
      >
        {createElement(ICONS[board.icon] || Gamepad2, { className: 'w-5 h-5', strokeWidth: 2.5 })}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block font-black text-sm sm:text-base leading-tight tracking-tight text-slate-800 dark:text-slate-100">
          {field(board, 'title', lang)}
        </span>
        <span className="block font-bold text-[11px] sm:text-xs leading-snug text-slate-400 dark:text-slate-500">
          {field(board, 'subtitle', lang)}
        </span>
      </span>
      {selected && (
        <span className="shrink-0 w-6 h-6 rounded-lg bg-[#58cc02] text-white flex items-center justify-center">
          <Check className="w-4 h-4" strokeWidth={3.5} />
        </span>
      )}
    </button>
  )
}

// A team name the teacher has not typed stays an empty string, and the default
// is only ever a placeholder. That way "Team 3" becomes "Đội 3" when the deck
// is switched to Vietnamese, instead of freezing an English name into state.
function Setup({
  lang, boardIndex, setBoardIndex, names, setNames, onStart,
  trackIndex, setTrackIndex, autoTimer, setAutoTimer,
}) {
  const rename = (i, value) => setNames(names.map((n, j) => (j === i ? value : n)))
  const remove = (i) => setNames(names.filter((_, j) => j !== i))
  const add = () => setNames([...names, ''])

  // Tapping a track picks it AND plays it, so the choice can be made by ear at
  // the desk before the class arrives rather than discovered in front of them.
  // Tapping the one that is already playing stops it.
  const previewRef = useRef(null)
  const [previewing, setPreviewing] = useState(null)

  const stopPreview = () => {
    if (previewRef.current) fadeOutAndStop(previewRef.current, 250)
    previewRef.current = null
    setPreviewing(null)
  }

  const pickTrack = (i) => {
    const wasPlaying = previewing === i
    stopPreview()
    setTrackIndex(i)
    if (wasPlaying) return
    const audio = new Audio(TRACKS[i].src)
    audio.volume = MUSIC_VOLUME
    audio.play().catch(() => {})
    previewRef.current = audio
    setPreviewing(i)
  }

  // Leaving Setup — by starting the game or by any other route — takes the
  // preview with it. Music playing under the board that the countdown did not
  // start would be a bug the teacher cannot explain to the room.
  useEffect(() => () => {
    if (previewRef.current) fadeOutAndStop(previewRef.current, 250)
  }, [])

  return (
    <div className="h-full min-h-0 overflow-y-auto custom-scrollbar px-4 sm:px-6 py-4">
      <div className="w-full max-w-7xl mx-auto">
        <div className="flex items-baseline gap-3 mb-4">
          <span className="self-center w-9 h-9 rounded-xl bg-[#f59e0b] text-white flex items-center justify-center shadow-sm shrink-0">
            <Gamepad2 className="w-5 h-5" strokeWidth={2.5} />
          </span>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-800 dark:text-slate-100">
            {t(lang, 'brand')}
          </h1>
          <p className="font-bold text-slate-400 dark:text-slate-500 text-sm hidden sm:block">
            {t(lang, 'chooseBoard')}
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-[5fr_2fr] xl:grid-cols-[3fr_1fr]">
          <section>
            <h2 className="text-[11px] font-black uppercase tracking-[0.18em] text-slate-400 dark:text-slate-500 mb-1.5">
              {t(lang, 'chooseBoard')}
            </h2>
            <div className="grid gap-1.5 sm:grid-cols-2">
              {BOARDS.map((board, i) => (
                <BoardCard
                  key={board.id}
                  board={board}
                  lang={lang}
                  selected={i === boardIndex}
                  onPick={() => setBoardIndex(i)}
                />
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-[11px] font-black uppercase tracking-[0.18em] text-slate-400 dark:text-slate-500 mb-1.5">
              {t(lang, 'teams')}
            </h2>
            <div className="grid gap-2">
              {names.map((name, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span
                    className="w-3 h-9 shrink-0 rounded-full"
                    style={{ backgroundColor: TEAM_COLOURS[i % TEAM_COLOURS.length] }}
                  />
                  <input
                    type="text"
                    value={name}
                    placeholder={`${t(lang, 'team')} ${i + 1}`}
                    onChange={(e) => rename(i, e.target.value)}
                    className="flex-1 min-w-0 px-3 py-2 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 font-black text-sm focus:outline-none focus:border-[#1cb0f6]"
                  />
                  {names.length > MIN_TEAMS && (
                    <button
                      type="button"
                      onClick={() => remove(i)}
                      className="shrink-0 w-9 h-9 rounded-xl border-2 border-b-4 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-400 hover:text-[#ff4b4b] flex items-center justify-center active:border-b-2 active:translate-y-0.5 transition-all"
                    >
                      <X className="w-4 h-4" strokeWidth={3} />
                    </button>
                  )}
                </div>
              ))}
              {names.length < MAX_TEAMS && (
                <button
                  type="button"
                  onClick={add}
                  className="flex items-center justify-center gap-2 py-2.5 rounded-xl border-2 border-b-4 border-dashed border-slate-300 dark:border-slate-700 text-slate-400 dark:text-slate-500 font-black uppercase tracking-widest text-[11px] hover:text-[#1cb0f6] active:border-b-2 active:translate-y-0.5 transition-all"
                >
                  <Plus className="w-4 h-4" strokeWidth={3} />
                  {t(lang, 'addTeam')}
                </button>
              )}
            </div>

            {MUSIC_ON && (
              <>
                {/* The music, and whether the countdown runs at all. Both live
                    here rather than on the board, because they are decisions made
                    once before the game and never mid-clue. They sit under the
                    teams, not under the boards: the sixth board would otherwise
                    have pushed the left column past a 1440×900 window. */}
                <h2 className="mt-4 text-[11px] font-black uppercase tracking-[0.18em] text-slate-400 dark:text-slate-500 mb-1.5">
                  {t(lang, 'music')}
                </h2>
                {/* Three across, so five tracks are two rows and not three. Two
                    rows is what keeps Setup inside the frame at 1440×900 — the
                    fifth track is exactly what pushed it over. */}
                <div className="grid gap-1.5 grid-cols-2 sm:grid-cols-3">
                  {TRACKS.map((track, i) => (
                    <button
                      key={track.id}
                      type="button"
                      onClick={() => pickTrack(i)}
                      className={`text-left rounded-xl border-2 border-b-4 px-2.5 py-1.5 transition-all active:border-b-2 active:translate-y-0.5 ${
                        i === trackIndex
                          ? 'border-[#f59e0b] bg-amber-50 dark:bg-amber-500/15'
                          : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900'
                      }`}
                    >
                      <span className="flex items-center gap-1.5">
                        {previewing === i
                          ? <Pause className="w-3.5 h-3.5 shrink-0 text-[#f59e0b]" strokeWidth={3} />
                          : <Music className={`w-3.5 h-3.5 shrink-0 ${i === trackIndex ? 'text-[#f59e0b]' : 'text-slate-300 dark:text-slate-600'}`} strokeWidth={3} />}
                        <span className="min-w-0 truncate font-black text-[11px] sm:text-xs text-slate-800 dark:text-slate-100">
                          {field(track, 'name', lang)}
                        </span>
                      </span>
                      <span className="block pl-5 truncate font-bold text-[10px] text-slate-400 dark:text-slate-500">
                        {field(track, 'by', lang)}
                      </span>
                    </button>
                  ))}
                </div>
              </>
            )}

            <button
              type="button"
              onClick={() => setAutoTimer(!autoTimer)}
              className={`${MUSIC_ON ? 'mt-2' : 'mt-4'} w-full flex items-center gap-2 rounded-xl border-2 border-b-4 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-2.5 py-2 active:border-b-2 active:translate-y-0.5 transition-all`}
            >
              <span
                className={`shrink-0 w-5 h-5 rounded-md border-2 flex items-center justify-center ${
                  autoTimer ? 'bg-[#58cc02] border-[#46a302] text-white' : 'border-slate-300 dark:border-slate-600'
                }`}
              >
                {autoTimer && <Check className="w-3.5 h-3.5" strokeWidth={4} />}
              </span>
              <span className="min-w-0 flex-1 text-left truncate font-black text-[11px] sm:text-xs text-slate-600 dark:text-slate-300">
                {t(lang, 'autoTimer')}
              </span>
              <Timer className="w-4 h-4 shrink-0 text-slate-300 dark:text-slate-600" strokeWidth={3} />
            </button>

            <button
              type="button"
              onClick={onStart}
              className="mt-4 w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-[#58cc02] border-b-4 border-[#46a302] text-white font-black uppercase tracking-widest text-sm sm:text-base active:border-b-0 active:translate-y-1 transition-all"
            >
              <Play className="w-5 h-5" strokeWidth={3} />
              {t(lang, 'start')}
            </button>
          </section>
        </div>
      </div>
    </div>
  )
}

// ── Scoreboard ──────────────────────────────────────────────────────────────

// `teams` here is the labelled list: a team the teacher never named carries an
// empty name and is labelled from the current language at render time, so an
// unnamed team reads "Đội 2" the moment the deck is switched to Vietnamese.
function Scoreboard({ teams, big, flash }) {
  return (
    <div className="shrink-0 grid gap-1.5 sm:gap-2" style={{ gridTemplateColumns: `repeat(${teams.length}, minmax(0, 1fr))` }}>
      {teams.map((team, i) => (
        <div
          key={i}
          className={`rounded-xl border-2 border-l-[6px] bg-white dark:bg-slate-900 px-2 sm:px-3 py-1.5 flex items-center justify-between gap-2 transition-transform duration-300 ${
            flash === i ? 'scale-105' : ''
          }`}
          style={{ borderColor: TEAM_COLOURS[i % TEAM_COLOURS.length] }}
        >
          <span className={`min-w-0 truncate font-black tracking-tight text-slate-700 dark:text-slate-200 ${big ? 'text-[clamp(0.9rem,1.3vw,1.35rem)]' : 'text-[11px] sm:text-sm'}`}>
            {team.label}
          </span>
          <span
            className={`shrink-0 font-black tabular-nums ${big ? 'text-[clamp(1.1rem,1.8vw,1.9rem)]' : 'text-sm sm:text-lg'}`}
            style={{ color: TEAM_COLOURS[i % TEAM_COLOURS.length] }}
          >
            {team.score}
          </span>
        </div>
      ))}
    </div>
  )
}

// ── The game ────────────────────────────────────────────────────────────────

export function JeopardyGame({ lang = 'en', isDisplayMode = false }) {
  const [screen, setScreen] = useState('setup') // 'setup' | 'board' | 'final'
  const [boardIndex, setBoardIndex] = useState(0)
  const [names, setNames] = useState(['', '', ''])
  const [teams, setTeams] = useState([])
  const [used, setUsed] = useState([])
  const [open, setOpen] = useState(null) // { c, r, clue, category }
  const [revealed, setRevealed] = useState(false)
  const [picked, setPicked] = useState([]) // team indexes awarded this clue
  const [flash, setFlash] = useState(null)
  // The countdown, as the moment it ends (null = not running) and the clock it
  // was last read at. An end rather than a number ticking down, so the phone
  // remote is told once when it starts and counts down by itself.
  const [clockEnd, setClockEnd] = useState(null)
  const [clockNow, setClockNow] = useState(0)
  const [autoTimer, setAutoTimer] = useState(true) // the countdown starts itself
  const [trackIndex, setTrackIndex] = useState(0)
  const [muted, setMuted] = useState(false)
  const [editing, setEditing] = useState(false) // the score editor is open
  const canvasRef = useRef(null)
  const throwConfetti = useConfetti(canvasRef)

  const board = BOARDS[boardIndex]
  // The picture on the clue that is open, if it has one. Computed here rather
  // than in the JSX because `revealed` decides which of the two it is.
  const shownImage = open ? clueImage(open.clue, revealed) : null
  const big = isDisplayMode
  const total = board.categories.length * VALUES.length
  // Display list: an unnamed team is labelled in whatever language the deck is
  // showing, so nothing on the board is ever English-only.
  const named = teams.map((team, i) => ({
    ...team,
    label: team.name || `${t(lang, 'team')} ${i + 1}`,
    colour: TEAM_COLOURS[i % TEAM_COLOURS.length],
  }))

  // The clue timer. It only ever runs while a clue is open, and it starts by
  // itself — one press to open a clue instead of two. It is still the
  // teacher's pace to set: tapping the countdown stops it, and the Setup
  // checkbox turns the automatic start off for a lesson where the thinking
  // time matters more than the pressure.
  // null = not running; 0 = time is up.
  const seconds = clockEnd === null ? null : Math.max(0, Math.ceil((clockEnd - clockNow) / 1000))
  const startClock = useCallback(() => {
    const now = Date.now()
    setClockNow(now)
    setClockEnd(now + TIMER_SECONDS * 1000)
  }, [])
  const stopClock = useCallback(() => setClockEnd(null), [])
  // Read the clock just after each whole second, until it runs out.
  useEffect(() => {
    if (clockEnd === null) return undefined
    let id
    const tick = () => {
      const now = Date.now()
      setClockNow(now)
      if (now < clockEnd) id = setTimeout(tick, (clockEnd - now) % 1000 || 1000)
    }
    id = setTimeout(tick, (clockEnd - Date.now()) % 1000 || 1000)
    return () => clearTimeout(id)
  }, [clockEnd])

  // The music follows the countdown exactly: it starts when the clock starts
  // and fades when the clock stops, so the sound in the room always means
  // "you are on the clock" and never has to be explained.
  //
  // `running` is a boolean and not `seconds`, or this would tear the audio
  // down and build it again on every tick.
  const running = seconds !== null && seconds > 0
  useEffect(() => {
    const track = TRACKS[trackIndex]
    if (!MUSIC_ON || !running || muted || !track?.src) return undefined
    const audio = new Audio(track.src)
    audio.volume = MUSIC_VOLUME
    // A browser that refuses to autoplay simply stays quiet; the game does not
    // depend on it, and there is nothing useful to say to the class about it.
    audio.play().catch(() => {})
    return () => fadeOutAndStop(audio)
  }, [running, trackIndex, muted])

  // Every picture on this board, pulled into the browser cache the moment the
  // board is chosen. An answer image is by definition one nobody has seen yet,
  // so without this the reveal is a blank rectangle for as long as the school
  // wifi takes — at exactly the moment the room is looking hardest.
  useEffect(() => {
    board.categories.forEach((category) => category.clues.forEach((clue) => {
      [clue.qImage, clue.aImage, ...(clue.qImages ?? [])].forEach((image) => {
        if (image?.src) Object.assign(new Image(), { src: image.src })
      })
    }))
  }, [board])

  const closeClue = useCallback(() => {
    setOpen(null)
    setRevealed(false)
    setPicked([])
    setClockEnd(null)
  }, [])

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') closeClue() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [closeClue])

  const startGame = () => {
    if (names.length < 2) return
    setTeams(names.map((name) => ({ name: name.trim(), score: 0 })))
    setUsed([])
    closeClue()
    setScreen('board')
  }

  const openClue = (c, r) => {
    if (used.includes(cellKey(c, r))) return
    setOpen({ c, r, category: board.categories[c], clue: board.categories[c].clues[r] })
    setRevealed(false)
    setPicked([])
    if (autoTimer) startClock()
    else setClockEnd(null)
  }

  // Correcting the scoreboard by hand. Points awarded to the wrong team, a
  // clue the class talked you into after the event, a team that arrived late —
  // all of it happens, and a scoreboard that cannot be fixed stops being used.
  const adjustScore = (i, delta) => {
    setTeams((cur) => cur.map((team, j) => (j === i ? { ...team, score: team.score + delta } : team)))
  }

  const setScore = (i, value) => {
    const score = Number.parseInt(value, 10)
    setTeams((cur) => cur.map((team, j) => (j === i ? { ...team, score: Number.isNaN(score) ? 0 : score } : team)))
  }

  const togglePick = (i) => {
    setPicked((cur) => (cur.includes(i) ? cur.filter((x) => x !== i) : [...cur, i]))
  }

  const confirm = () => {
    const value = open.clue.value
    if (picked.length) {
      setTeams((cur) => cur.map((team, i) => (picked.includes(i) ? { ...team, score: team.score + value } : team)))
      setFlash(picked[0])
      setTimeout(() => setFlash(null), 400)
    }
    const nextUsed = [...used, cellKey(open.c, open.r)]
    setUsed(nextUsed)
    closeClue()
    if (nextUsed.length === total) {
      setScreen('final')
      setTimeout(throwConfetti, 120)
    }
  }

  const finishNow = () => {
    closeClue()
    setScreen('final')
    setTimeout(throwConfetti, 120)
  }

  const replay = () => {
    setTeams(teams.map((team) => ({ ...team, score: 0 })))
    setUsed([])
    closeClue()
    setScreen('board')
  }

  // ── The phone remote ──────────────────────────────────────────────────────
  // Mr Bowen's phone (remote.jsx) draws its own copy of the game from this:
  // the board and its clues come from the phone's copy of boards.js, so only
  // indexes, names and scores travel. Its requests are checked against the
  // game as it stands, because one can arrive a moment out of date.
  const resize = (n) => setNames((cur) => (n > cur.length ? [...cur, ...Array(n - cur.length).fill('')] : cur.slice(0, n)))
  useGameRemote({
    k: 'jeopardy',
    s: screen,
    b: boardIndex,
    // In Setup, the names as typed so far; in the game, each team's score too.
    tm: screen === 'setup' ? names.map((name) => [name.trim(), 0]) : teams.map((team) => [team.name, team.score]),
    u: used,
    o: open ? [open.c, open.r] : null,
    rv: revealed ? 1 : 0,
    pk: picked,
    t: clockEnd,
  }, (a) => {
    const clueOpen = screen === 'board' && open
    switch (a.do) {
      case 'board':
        if (screen === 'setup' && BOARDS[a.i]) setBoardIndex(a.i)
        return
      case 'teams':
        if (screen === 'setup' && Number.isInteger(a.n) && a.n >= MIN_TEAMS && a.n <= MAX_TEAMS) resize(a.n)
        return
      case 'start':
        if (screen === 'setup') startGame()
        return
      case 'open':
        if (screen === 'board' && !open && board.categories[a.c] && VALUES[a.r] !== undefined) openClue(a.c, a.r)
        return
      case 'clock':
        if (clueOpen) { if (a.on) startClock(); else stopClock() }
        return
      case 'reveal':
        if (clueOpen) setRevealed(true)
        return
      case 'pick':
        if (clueOpen && revealed && teams[a.i]) togglePick(a.i)
        return
      case 'award':
        if (clueOpen && revealed) confirm()
        return
      case 'close':
        if (clueOpen) closeClue()
        return
      case 'score':
        if (screen !== 'setup' && teams[a.i] && SCORE_STEPS.includes(a.d)) adjustScore(a.i, a.d)
        return
      case 'finish':
        if (screen === 'board') finishNow()
        return
      case 'replay':
        if (screen === 'final') replay()
        return
      case 'setup':
        if (screen === 'final') setScreen('setup')
        return
      default:
    }
  })

  // ── Setup screen ──────────────────────────────────────────────────────────
  if (screen === 'setup') {
    return (
      <Setup
        lang={lang}
        boardIndex={boardIndex}
        setBoardIndex={setBoardIndex}
        names={names}
        setNames={setNames}
        onStart={startGame}
        trackIndex={trackIndex}
        setTrackIndex={setTrackIndex}
        autoTimer={autoTimer}
        setAutoTimer={setAutoTimer}
      />
    )
  }

  // ── Final scores ──────────────────────────────────────────────────────────
  if (screen === 'final') {
    const ranked = [...named].sort((a, b) => b.score - a.score)
    // A board abandoned before anyone scored has no winner — crowning all six
    // teams on nought points reads as a bug, not as a tie.
    const top = ranked[0]?.score ?? 0
    const winners = top > 0 ? ranked.filter((team) => team.score === top) : []

    return (
      <div className="relative h-full min-h-0 flex flex-col items-center justify-center p-4 sm:p-6">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-10" />
        <div className="relative z-20 w-full max-w-2xl">
          <div className="text-center mb-5">
            <span className="inline-flex w-16 h-16 rounded-2xl bg-amber-100 dark:bg-amber-500/20 text-amber-500 items-center justify-center mb-3">
              <Trophy className="w-9 h-9" strokeWidth={2.5} />
            </span>
            <h2 className={`font-black tracking-tight text-slate-800 dark:text-slate-100 ${big ? 'text-[clamp(2rem,3.4vw,3.4rem)]' : 'text-2xl sm:text-4xl'}`}>
              {t(lang, 'finalTitle')}
            </h2>
            <p className={`font-black text-amber-600 dark:text-amber-300 ${big ? 'text-[clamp(1.1rem,1.8vw,1.9rem)]' : 'text-base sm:text-xl'}`}>
              {winners.length === 0
                ? ' '
                : winners.length > 1
                  ? t(lang, 'tie')
                  : `${t(lang, 'winner')}: ${winners[0].label}`}
            </p>
          </div>

          <div className="grid gap-2 mb-6">
            {ranked.map((team, place) => (
              <div
                key={`${team.label}-${place}`}
                className="rounded-2xl border-2 border-l-[8px] bg-white dark:bg-slate-900 px-4 py-3 flex items-center gap-3"
                style={{ borderColor: team.colour }}
              >
                <span className="w-7 shrink-0 font-black text-slate-300 dark:text-slate-600 text-lg tabular-nums">
                  {place + 1}
                </span>
                {top > 0 && team.score === top && <Crown className="w-5 h-5 shrink-0 text-amber-500" strokeWidth={2.5} />}
                <span className={`flex-1 min-w-0 truncate font-black tracking-tight text-slate-800 dark:text-slate-100 ${big ? 'text-[clamp(1.1rem,1.7vw,1.8rem)]' : 'text-base sm:text-xl'}`}>
                  {team.label}
                </span>
                <span
                  className={`shrink-0 font-black tabular-nums ${big ? 'text-[clamp(1.4rem,2.3vw,2.4rem)]' : 'text-xl sm:text-2xl'}`}
                  style={{ color: team.colour }}
                >
                  {team.score}
                </span>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-2.5">
            <button
              type="button"
              onClick={replay}
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-[#58cc02] border-b-4 border-[#46a302] text-white font-black uppercase tracking-widest text-xs sm:text-sm active:border-b-0 active:translate-y-1 transition-all"
            >
              <RotateCcw className="w-5 h-5" strokeWidth={2.5} />{t(lang, 'sameBoard')}
            </button>
            <button
              type="button"
              onClick={() => setScreen('setup')}
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 border-b-4 border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-black uppercase tracking-widest text-xs sm:text-sm active:border-b-0 active:translate-y-1 transition-all"
            >
              <Users className="w-5 h-5" strokeWidth={2.5} />{t(lang, 'otherBoard')}
            </button>
          </div>
        </div>
      </div>
    )
  }

  // ── The board ─────────────────────────────────────────────────────────────
  return (
    <div className="relative h-full min-h-0 flex flex-col gap-2 sm:gap-2.5 p-3 sm:p-4 lg:p-5">
      <header className="shrink-0 flex items-center gap-2 sm:gap-3">
        <button
          type="button"
          onClick={() => setScreen('setup')}
          className="flex items-center gap-1.5 px-2.5 sm:px-3 py-2 rounded-xl border-2 border-b-4 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-300 hover:text-[#1cb0f6] font-black uppercase tracking-widest text-[10px] sm:text-xs active:border-b-2 active:translate-y-0.5 transition-all"
        >
          <ArrowLeft className="w-4 h-4" strokeWidth={3} />
          <span className="hidden sm:inline">{t(lang, 'setup')}</span>
        </button>

        <div className="min-w-0 flex-1">
          <h2 className={`font-black tracking-tight text-slate-800 dark:text-slate-100 leading-tight truncate ${big ? 'text-[clamp(1.2rem,2vw,2rem)]' : 'text-base sm:text-xl'}`}>
            {field(board, 'title', lang)}
          </h2>
          <p className={`font-bold text-slate-400 dark:text-slate-500 leading-tight truncate ${big ? 'text-[clamp(0.85rem,1.2vw,1.2rem)]' : 'text-[10px] sm:text-xs'}`}>
            {total - used.length} {t(lang, 'left')}
          </p>
        </div>

        {/* Sound off is here rather than in Setup because it is the control a
            teacher reaches for mid-game — the class next door, a fire drill,
            a clue that needs reading three times. */}
        {MUSIC_ON && (
          <button
            type="button"
            onClick={() => setMuted(!muted)}
            title={t(lang, muted ? 'soundOn' : 'soundOff')}
            aria-label={t(lang, muted ? 'soundOn' : 'soundOff')}
            className={`shrink-0 w-9 h-9 rounded-xl border-2 border-b-4 flex items-center justify-center active:border-b-2 active:translate-y-0.5 transition-all ${
              muted
                ? 'border-rose-300 dark:border-rose-800 bg-rose-50 dark:bg-rose-950 text-rose-500 dark:text-rose-300'
                : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-300'
            }`}
          >
            {muted ? <VolumeX className="w-4 h-4" strokeWidth={3} /> : <Volume2 className="w-4 h-4" strokeWidth={3} />}
          </button>
        )}

        <button
          type="button"
          onClick={() => setEditing(true)}
          title={t(lang, 'editScores')}
          className="shrink-0 flex items-center gap-1.5 px-2.5 sm:px-3 py-2 rounded-xl border-2 border-b-4 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-300 hover:text-[#1cb0f6] font-black uppercase tracking-widest text-[10px] sm:text-xs active:border-b-2 active:translate-y-0.5 transition-all"
        >
          <Pencil className="w-4 h-4" strokeWidth={3} />
          <span className="hidden lg:inline">{t(lang, 'editScores')}</span>
        </button>

        <button
          type="button"
          onClick={finishNow}
          className="shrink-0 flex items-center gap-1.5 px-2.5 sm:px-3 py-2 rounded-xl border-2 border-b-4 border-amber-300 dark:border-amber-700 bg-amber-50 dark:bg-amber-500/15 text-amber-700 dark:text-amber-200 font-black uppercase tracking-widest text-[10px] sm:text-xs active:border-b-2 active:translate-y-0.5 transition-all"
        >
          <Flag className="w-4 h-4" strokeWidth={3} />
          <span className="hidden sm:inline">{t(lang, 'finish')}</span>
        </button>
      </header>

      <Scoreboard teams={named} big={big} flash={flash} />

      {/* The board itself: one header row plus five clue rows, dividing the
          remaining height between them so it never scrolls. */}
      <div
        className="flex-1 min-h-0 grid gap-1.5 sm:gap-2"
        style={{
          gridTemplateColumns: `repeat(${board.categories.length}, minmax(0, 1fr))`,
          gridTemplateRows: `auto repeat(${VALUES.length}, minmax(0, 1fr))`,
        }}
      >
        {board.categories.map((category, c) => (
          <div
            key={`cat-${c}`}
            className="rounded-lg sm:rounded-xl bg-[#0a1e6b] px-1.5 py-2 flex flex-col items-center justify-center text-center"
          >
            <span className={`font-black uppercase tracking-wide leading-tight text-[#ffd34d] break-words ${big ? 'text-[clamp(0.7rem,1.05vw,1.15rem)]' : 'text-[9px] sm:text-[11px] lg:text-xs'}`}>
              {glue(field(category, 'name', lang))}
            </span>
            {frTwin(category, 'name', lang) && (
              <span className={`mt-0.5 font-bold leading-tight text-[#ffd34d]/70 break-words ${big ? 'text-[clamp(0.6rem,0.85vw,0.95rem)]' : 'text-[8px] sm:text-[10px]'}`}>
                {glue(frTwin(category, 'name', lang))}
              </span>
            )}
          </div>
        ))}

        {VALUES.map((value, r) =>
          board.categories.map((category, c) => {
            const spent = used.includes(cellKey(c, r))
            return (
              <button
                key={cellKey(c, r)}
                type="button"
                onClick={() => openClue(c, r)}
                disabled={spent}
                className={`rounded-lg sm:rounded-xl border-2 flex items-center justify-center transition-all ${
                  spent
                    ? 'bg-slate-200/70 dark:bg-slate-800/70 border-slate-200 dark:border-slate-800 cursor-not-allowed'
                    : 'bg-[#0e3fa8] border-[#0a2f80] border-b-[5px] hover:bg-[#1350c8] active:border-b-2 active:translate-y-[3px]'
                }`}
              >
                {spent ? (
                  <Check className="w-5 h-5 text-slate-400 dark:text-slate-600" strokeWidth={3} />
                ) : (
                  <span className={`font-black tabular-nums text-[#ffc800] ${big ? 'text-[clamp(1.4rem,2.6vw,3rem)]' : 'text-lg sm:text-2xl lg:text-3xl'}`}>
                    {value}
                  </span>
                )}
              </button>
            )
          }),
        )}
      </div>

      {/* One clue, over the board */}
      {open && (
        // The clue fills the slide rather than floating in the middle of it: a
        // centred card that grows with its content is exactly the thing that
        // ends up 70px taller than a 1366×768 window with the answer showing.
        // Here the question takes whatever height is left over, so revealing
        // the answer shrinks the question block instead of pushing the award
        // buttons off the bottom.
        <div className="absolute inset-0 z-50 flex bg-slate-900/70 backdrop-blur-sm p-2 sm:p-4 lg:p-5 animate-in fade-in duration-200">
          <div className="w-full h-full max-w-5xl mx-auto flex flex-col rounded-[1.5rem] bg-white dark:bg-slate-900 border-4 border-slate-100 dark:border-slate-800 shadow-2xl p-3 sm:p-5 lg:p-6 animate-in zoom-in-95 duration-200">
            <div className="shrink-0 flex items-center gap-3 mb-2 sm:mb-3">
              <span className={`min-w-0 flex-1 truncate font-black uppercase tracking-[0.15em] text-slate-400 dark:text-slate-500 ${big ? 'text-[clamp(0.85rem,1.2vw,1.25rem)]' : 'text-[10px] sm:text-xs'}`}>
                {glue(field(open.category, 'name', lang))}
              </span>
              <span
                className={`shrink-0 font-black tabular-nums text-[#0e3fa8] dark:text-[#ffc800] ${big ? 'text-[clamp(1.3rem,2.2vw,2.3rem)]' : 'text-lg sm:text-2xl'}`}
              >
                {open.clue.value}
              </span>
              {/* The timer lives in the header, not in a row of its own: a
                  strip that exists only to hold one small button costs about
                  fifty pixels, and in a 768px-tall window that is the
                  difference between the question fitting and not. */}
              {/* One control, three states: not running (press to start),
                  running (press to stop — which also fades the music), and
                  finished (press to run it again). */}
              {seconds === null || seconds <= 0 ? (
                <button
                  type="button"
                  onClick={startClock}
                  title={t(lang, 'startTimer')}
                  className={`shrink-0 flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border-2 font-black uppercase tracking-widest text-[10px] transition-colors ${
                    seconds === null
                      ? 'border-slate-200 dark:border-slate-700 text-slate-400 dark:text-slate-500 hover:text-[#1cb0f6]'
                      : 'border-rose-400 bg-rose-50 dark:bg-rose-950 text-rose-600 dark:text-rose-300'
                  }`}
                >
                  <Timer className="w-4 h-4" strokeWidth={3} />
                  <span className="hidden sm:inline">
                    {seconds === null ? t(lang, 'startTimer') : t(lang, 'timeUp')}
                  </span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={stopClock}
                  title={t(lang, 'stopTimer')}
                  aria-label={t(lang, 'stopTimer')}
                  className={`shrink-0 flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border-2 font-black tabular-nums transition-colors ${
                    seconds > 5
                      ? 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
                      : 'border-rose-400 bg-rose-50 dark:bg-rose-950 text-rose-600 dark:text-rose-300'
                  } ${big ? 'text-[clamp(1rem,1.4vw,1.5rem)]' : 'text-sm sm:text-base'}`}
                >
                  <Pause className="w-4 h-4" strokeWidth={3} />
                  {`${seconds}s`}
                </button>
              )}
              <button
                type="button"
                onClick={closeClue}
                className="shrink-0 w-8 h-8 rounded-lg border-2 border-slate-200 dark:border-slate-700 text-slate-400 hover:text-[#ff4b4b] flex items-center justify-center transition-colors"
                aria-label={t(lang, 'close')}
              >
                <X className="w-4 h-4" strokeWidth={3} />
              </button>
            </div>

            {/* A clue with `qImages` is laid out by PictureClue. Otherwise:
                question, and the picture if this clue has one. Side by side,
                because a photo stacked under the text is a photo two inches
                tall on a projector. Two caps, and whichever bites first wins:
                the height of this region, and 48% of its width. A wide shot on
                a projector is stopped by the width; a portrait one, or any shot
                in a small desk window, is stopped by the height. Neither can
                produce a scrollbar, and 48% still leaves the question a
                readable column beside it. */}
            {open.clue.qImages ? (
              <PictureClue clue={open.clue} lang={lang} big={big} revealed={revealed} />
            ) : (
              <div className="flex-1 min-h-[2.5rem] flex [align-items:safe_center] gap-3 sm:gap-5 overflow-y-auto custom-scrollbar">
                {/* A clue with a picture beside it has half the width for its
                    words, so its words are set a notch smaller. Without this the
                    longest clue on the board — the tardigrade, in Vietnamese —
                    runs 22px past the bottom of the region and `items-center`
                    clips the top of it where no scrollbar can reach. */}
                {/* EN+FR sets both a notch smaller, so the pair fits where one did. */}
                <div className="flex-1 min-w-0">
                  <p className={`font-black tracking-tight leading-snug text-slate-800 dark:text-slate-100 ${frTwin(open.clue, 'q', lang)
                    ? (shownImage
                      ? (big ? 'text-[clamp(1rem,1.8vw,2rem)]' : 'text-xs sm:text-sm')
                      : (big ? 'text-[clamp(1.3rem,2.4vw,2.6rem)]' : 'text-sm sm:text-base'))
                    : (shownImage
                      ? (big ? 'text-[clamp(1.15rem,2.1vw,2.3rem)]' : 'text-base sm:text-xl')
                      : (big ? 'text-[clamp(1.5rem,2.8vw,3rem)]' : 'text-lg sm:text-2xl'))}`}>
                    {glue(field(open.clue, 'q', lang))}
                  </p>
                  {frTwin(open.clue, 'q', lang) && (
                    <p lang="fr" className={`font-bold leading-snug text-slate-500 dark:text-slate-400 ${shownImage
                      ? (big ? 'mt-2 text-[clamp(0.85rem,1.45vw,1.6rem)]' : 'mt-1 text-[11px] sm:text-xs')
                      : (big ? 'mt-2 text-[clamp(1rem,1.85vw,2rem)]' : 'mt-1 text-xs sm:text-sm')}`}>
                      {glue(frTwin(open.clue, 'q', lang))}
                    </p>
                  )}
                </div>
                {shownImage && (
                  <img
                    src={shownImage.src}
                    alt={field(shownImage, 'alt', lang)}
                    className="shrink-0 min-h-0 max-h-full w-auto max-w-[48%] object-contain rounded-2xl border-4 border-slate-100 dark:border-slate-800 animate-in fade-in duration-300"
                  />
                )}
              </div>
            )}

            {/* The answer, and who gets the points */}
            {!revealed ? (
              <button
                type="button"
                onClick={() => setRevealed(true)}
                className={`shrink-0 mt-3 w-full flex items-center justify-center gap-2 rounded-2xl bg-[#1cb0f6] border-b-4 border-[#1899d6] text-white font-black uppercase tracking-widest active:border-b-0 active:translate-y-1 transition-all ${
                  big ? 'py-4 text-[clamp(1rem,1.6vw,1.6rem)]' : 'py-3 text-xs sm:text-base'
                }`}
              >
                <Eye className="w-5 h-5" strokeWidth={2.5} />
                {t(lang, 'reveal')}
              </button>
            ) : (
              <>
                <div className="shrink-0 mt-3 rounded-2xl border-2 border-l-[7px] border-[#58cc02] bg-[#f0fdf4] dark:bg-emerald-500/15 px-4 py-2.5 sm:px-5 sm:py-3 animate-in fade-in zoom-in-95 duration-200">
                  <div className="flex items-center gap-1.5 mb-1">
                    <Sparkles className="w-4 h-4 text-[#3d8c00] dark:text-emerald-300" strokeWidth={2.5} />
                    <span className="font-black uppercase tracking-[0.18em] text-[10px] text-[#3d8c00] dark:text-emerald-300">
                      {t(lang, 'answer')}
                    </span>
                  </div>
                  <p className={`font-bold leading-snug text-[#14532d] dark:text-emerald-100 ${big ? 'text-[clamp(1.15rem,1.9vw,2rem)]' : (frTwin(open.clue, 'a', lang) ? 'text-sm sm:text-base' : 'text-base sm:text-lg')}`}>
                    {glue(field(open.clue, 'a', lang))}
                  </p>
                  {frTwin(open.clue, 'a', lang) && (
                    <p lang="fr" className={`mt-1 font-semibold leading-snug text-[#14532d]/65 dark:text-emerald-100/65 ${big ? 'text-[clamp(0.9rem,1.45vw,1.55rem)]' : 'text-xs sm:text-sm'}`}>
                      {glue(frTwin(open.clue, 'a', lang))}
                    </p>
                  )}
                </div>

                <p className="shrink-0 mt-2.5 mb-1.5 font-black uppercase tracking-[0.18em] text-[10px] sm:text-xs text-slate-400 dark:text-slate-500">
                  {t(lang, 'whoGotIt')}
                </p>
                <div className="shrink-0 grid gap-2" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(9rem, 1fr))' }}>
                  {named.map((team, i) => {
                    const on = picked.includes(i)
                    const colour = team.colour
                    return (
                      <button
                        key={i}
                        type="button"
                        onClick={() => togglePick(i)}
                        className={`rounded-xl border-2 border-b-4 px-3 py-2 font-black tracking-tight truncate transition-all active:border-b-2 active:translate-y-0.5 ${
                          on ? 'text-white' : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                        } ${big ? 'text-[clamp(0.95rem,1.4vw,1.45rem)]' : 'text-xs sm:text-base'}`}
                        style={{
                          borderColor: colour,
                          backgroundColor: on ? colour : undefined,
                        }}
                      >
                        {on ? '✓ ' : ''}{team.label}
                      </button>
                    )
                  })}
                </div>

                <button
                  type="button"
                  onClick={confirm}
                  className={`shrink-0 mt-3 w-full flex items-center justify-center gap-2 rounded-2xl border-b-4 font-black uppercase tracking-widest active:border-b-0 active:translate-y-1 transition-all ${
                    picked.length
                      ? 'bg-[#58cc02] border-[#46a302] text-white'
                      : 'bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-500 dark:text-slate-400'
                  } ${big ? 'py-4 text-[clamp(1rem,1.6vw,1.6rem)]' : 'py-3 text-xs sm:text-base'}`}
                >
                  <Check className="w-5 h-5" strokeWidth={3} />
                  {picked.length
                    ? `${t(lang, 'award')} ${open.clue.value} ${t(lang, 'points')}`
                    : t(lang, 'noPoints')}
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* The score editor. Above the clue layer, because the correction a
          teacher needs to make is usually the one they just noticed while a
          clue was open. Steps of 100 and 500 match the values on the board,
          and the box takes a typed number for anything else. */}
      {editing && (
        <div className="absolute inset-0 z-[60] flex items-center justify-center bg-slate-900/70 backdrop-blur-sm p-3 sm:p-5 animate-in fade-in duration-200">
          <div className="w-full max-w-3xl max-h-full overflow-y-auto custom-scrollbar rounded-[1.5rem] bg-white dark:bg-slate-900 border-4 border-slate-100 dark:border-slate-800 shadow-2xl p-4 sm:p-6 animate-in zoom-in-95 duration-200">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-9 h-9 shrink-0 rounded-xl bg-[#1cb0f6] text-white flex items-center justify-center">
                <Pencil className="w-4 h-4" strokeWidth={3} />
              </span>
              <h3 className="min-w-0 flex-1 font-black tracking-tight text-slate-800 dark:text-slate-100 text-lg sm:text-2xl">
                {t(lang, 'editScores')}
              </h3>
              <button
                type="button"
                onClick={() => setEditing(false)}
                aria-label={t(lang, 'close')}
                className="shrink-0 w-8 h-8 rounded-lg border-2 border-slate-200 dark:border-slate-700 text-slate-400 hover:text-[#ff4b4b] flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4" strokeWidth={3} />
              </button>
            </div>

            <div className="grid gap-2">
              {named.map((team, i) => (
                <div
                  key={i}
                  className="flex flex-wrap items-center gap-2 rounded-xl border-2 border-l-[6px] bg-white dark:bg-slate-900 px-2.5 py-2"
                  style={{ borderColor: team.colour }}
                >
                  <span className="min-w-0 flex-1 truncate font-black tracking-tight text-slate-800 dark:text-slate-100 text-sm sm:text-base">
                    {team.label}
                  </span>
                  {SCORE_STEPS.filter((delta) => delta < 0).map((delta) => (
                    <button
                      key={delta}
                      type="button"
                      onClick={() => adjustScore(i, delta)}
                      className="shrink-0 px-2.5 py-1.5 rounded-lg border-2 border-b-4 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-black tabular-nums text-xs sm:text-sm active:border-b-2 active:translate-y-0.5 transition-all"
                    >
                      −{Math.abs(delta)}
                    </button>
                  ))}
                  <input
                    type="number"
                    step="100"
                    value={teams[i].score}
                    onChange={(e) => setScore(i, e.target.value)}
                    className="shrink-0 w-24 px-2 py-1.5 rounded-lg border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-center font-black tabular-nums text-sm sm:text-base focus:outline-none focus:border-[#1cb0f6]"
                    style={{ color: team.colour }}
                  />
                  {SCORE_STEPS.filter((delta) => delta > 0).map((delta) => (
                    <button
                      key={delta}
                      type="button"
                      onClick={() => adjustScore(i, delta)}
                      className="shrink-0 px-2.5 py-1.5 rounded-lg border-2 border-b-4 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-black tabular-nums text-xs sm:text-sm active:border-b-2 active:translate-y-0.5 transition-all"
                    >
                      +{delta}
                    </button>
                  ))}
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setEditing(false)}
              className="mt-4 w-full flex items-center justify-center gap-2 py-3 rounded-2xl bg-[#58cc02] border-b-4 border-[#46a302] text-white font-black uppercase tracking-widest text-xs sm:text-base active:border-b-0 active:translate-y-1 transition-all"
            >
              <Check className="w-5 h-5" strokeWidth={3} />
              {t(lang, 'done')}
            </button>
          </div>
        </div>
      )}

      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-40" />
    </div>
  )
}
