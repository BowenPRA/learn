// content/games/G06_guess-the-teacher/editor.jsx
// Edit teachers: the list the game plays, edited on the TV's laptop. One row a
// teacher: an On switch, the photo from pra.edu.vn the reveal will show (found
// by name, or picked), the emojis (typed or pasted; Windows + . opens the
// emoji keyboard), the name shown at the reveal, and other names that also
// count as right. Rows move up and down and can be deleted. Every change is
// saved as it is made (list.js); the line at the top says where.
import { useState } from 'react'
import { ArrowDown, ArrowUp, Check, ImageOff, Minus, Plus, Shuffle, Timer, Trash2 } from 'lucide-react'
import { newId, ready, splitEmojis } from './list.js'
import { ALL_UP_SHARE, EMOJI_MAX, ROUND_MS, ROUND_SECS, roundSecsOf } from './protocol.js'
import { TONES, staffFor } from './staff.js'

const U = (n) => `calc(var(--u) * ${n})`

export const EDITOR_CSS = `
.gt-ed { --u: min(1cqh, .5625cqw); position: absolute; inset: 0; z-index: 30; display: flex; padding: ${U(2.4)} ${U(3.4)}; background: rgba(14,42,92,.38); backdrop-filter: blur(6px) }
.gt-ed-card { flex: 1; min-height: 0; display: flex; flex-direction: column; background: #fff; color: var(--ink); border-radius: ${U(2.8)};
  box-shadow: var(--shadow-pop); overflow: hidden; user-select: text }
.gt-ed-head { display: flex; align-items: center; gap: ${U(2)}; padding: ${U(2.2)} ${U(2.8)}; border-bottom: 1px solid var(--line); flex-wrap: wrap }
.gt-ed-head h2 { margin: 0; font-size: ${U(3.8)}; font-weight: 800; letter-spacing: -.02em; color: var(--blue-ink); line-height: 1 }
.gt-ed-status { flex: 1; min-width: ${U(30)}; font-size: ${U(1.85)}; font-weight: 600; color: var(--ink-soft); line-height: 1.3 }
.gt-ed-status.ok { color: var(--green-deep) }
.gt-ed-status.warn { color: var(--coral-deep) }
.gt-ed-status small { display: block; font-weight: 500; color: var(--ink-soft); font-size: ${U(1.55)} }
.gt-ed-btn { display: inline-flex; align-items: center; gap: ${U(.7)}; font: inherit; font-size: ${U(2)}; font-weight: 600; line-height: 1; cursor: pointer;
  padding: ${U(1.05)} ${U(1.8)}; border-radius: 999px; border: 2px solid var(--line); background: #fff; color: var(--blue-ink); transition: background .2s, border-color .2s }
.gt-ed-btn:hover { background: var(--blue-pale); border-color: var(--blue-tint) }
.gt-ed-btn svg { width: ${U(2.2)}; height: ${U(2.2)}; color: var(--blue) }
.gt-ed-btn.on { background: var(--blue-tint); border-color: var(--blue-tint); color: var(--blue-deep) }
.gt-ed-btn.done { background: var(--blue); border-color: var(--blue); color: #fff; font-size: ${U(2.3)}; padding: ${U(1.15)} ${U(2.6)}; box-shadow: 0 ${U(.7)} ${U(1.8)} rgba(17,109,255,.3) }
.gt-ed-btn.done svg { color: #fff }
.gt-ed-btn.done:hover { background: var(--blue-deep); border-color: var(--blue-deep) }
.gt-ed-cols, .gt-ed-row { display: grid; grid-template-columns: ${U(3)} ${U(7.5)} ${U(25)} minmax(0, 1.15fr) minmax(0, .9fr) minmax(0, 1fr) ${U(15)}; gap: ${U(1.2)}; align-items: center }
.gt-ed-cols { padding: ${U(1.4)} ${U(2.8)} ${U(.6)}; font-size: ${U(1.5)}; font-weight: 600; letter-spacing: .1em; text-transform: uppercase; color: var(--ink-soft) }
.gt-ed-list { flex: 1; min-height: 0; overflow-y: auto; padding: 0 ${U(2.8)} ${U(1.4)} }
.gt-ed-row { padding: ${U(.9)} 0; border-bottom: 1px solid var(--line) }
.gt-ed-row.off > :not(.gt-ed-switchcell):not(.gt-ed-tools) { opacity: .42 }
.gt-ed-num { font-size: ${U(2.1)}; font-weight: 700; color: var(--ink-soft); text-align: right }
.gt-ed-in { width: 100%; font: inherit; font-size: ${U(2.1)}; font-weight: 600; color: var(--ink); padding: ${U(.9)} ${U(1.2)}; border-radius: ${U(1.2)};
  border: 2px solid var(--line); background: #fff; outline: none; transition: border-color .15s, box-shadow .15s }
.gt-ed-in:focus { border-color: var(--blue); box-shadow: 0 0 0 ${U(.45)} var(--blue-tint) }
.gt-ed-in.emo { font-size: ${U(3)}; padding: ${U(.4)} ${U(1)}; letter-spacing: .05em }
.gt-ed-tag { display: inline-block; margin-top: ${U(.4)}; font-size: ${U(1.45)}; font-weight: 600; color: var(--sun-ink); background: var(--sun-pale); padding: ${U(.2)} ${U(.8)}; border-radius: 999px }
.gt-ed-photo { display: flex; align-items: center; gap: ${U(1)}; min-width: 0 }
.gt-ed-thumb { position: relative; width: ${U(5.2)}; height: ${U(5.2)}; flex: none; border-radius: 50%; overflow: hidden; background: linear-gradient(165deg, var(--a), var(--b));
  box-shadow: 0 0 0 2px #fff, 0 0 0 3px var(--line) }
.gt-ed-thumb img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; object-position: 50% 6% }
.gt-ed-thumb.none { background: var(--row); color: var(--ink-soft); display: inline-flex; align-items: center; justify-content: center }
.gt-ed-thumb.none svg { width: ${U(2.2)}; height: ${U(2.2)} }
.gt-ed-pick { min-width: 0; flex: 1; display: flex; flex-direction: column; gap: ${U(.25)} }
.gt-ed-pick select { width: 100%; font: inherit; font-size: ${U(1.7)}; font-weight: 600; color: var(--ink); padding: ${U(.5)} ${U(.6)}; border-radius: ${U(1)};
  border: 2px solid var(--line); background: #fff; outline: none; cursor: pointer }
.gt-ed-pick select:focus { border-color: var(--blue) }
.gt-ed-pick small { font-size: ${U(1.4)}; font-weight: 500; color: var(--ink-soft); white-space: nowrap; overflow: hidden; text-overflow: ellipsis }
.gt-ed-switch { position: relative; width: ${U(6.4)}; height: ${U(3.6)}; border-radius: 999px; border: none; padding: 0; cursor: pointer; background: #CBD5E1; transition: background .15s }
.gt-ed-switch::after { content: ''; position: absolute; top: ${U(.45)}; left: ${U(.45)}; width: ${U(2.7)}; height: ${U(2.7)}; border-radius: 999px; background: #fff;
  box-shadow: 0 1px 3px rgba(14,42,92,.3); transition: transform .2s var(--bounce) }
.gt-ed-switch[aria-checked="true"] { background: var(--green) }
.gt-ed-switch[aria-checked="true"]::after { transform: translateX(${U(2.8)}) }
.gt-ed-tools { display: flex; gap: ${U(.5)}; justify-content: flex-end }
.gt-ed-icon { width: ${U(4.4)}; height: ${U(4.4)}; display: inline-flex; align-items: center; justify-content: center; border-radius: 999px; cursor: pointer;
  border: none; background: var(--blue-pale); color: var(--blue-ink); padding: 0 }
.gt-ed-icon:hover:not(:disabled) { background: var(--blue-tint) }
.gt-ed-icon:disabled { opacity: .3; cursor: default }
.gt-ed-time { display: inline-flex; align-items: center; gap: ${U(.8)}; padding: ${U(.4)} ${U(.6)}; border-radius: 999px; border: 1px solid var(--line) }
.gt-ed-time > svg { width: ${U(2.3)}; height: ${U(2.3)}; margin-left: ${U(.6)}; color: var(--ink-soft) }
.gt-ed-time span { display: flex; flex-direction: column; align-items: center; min-width: ${U(11)}; line-height: 1.1 }
.gt-ed-time b { font-size: ${U(2.2)}; font-weight: 800; color: var(--blue-ink) }
.gt-ed-time small { font-size: ${U(1.4)}; font-weight: 500; color: var(--ink-soft) }
.gt-ed-icon.del:hover { background: var(--coral-pale); color: var(--coral-deep) }
.gt-ed-icon svg { width: ${U(2.2)}; height: ${U(2.2)} }
.gt-ed-foot { display: flex; align-items: center; gap: ${U(2)}; padding: ${U(1.4)} ${U(2.8)}; border-top: 1px solid var(--line); flex-wrap: wrap; background: var(--row) }
.gt-ed-foot p { flex: 1; min-width: ${U(40)}; margin: 0; font-size: ${U(1.7)}; font-weight: 500; color: var(--ink-soft); line-height: 1.4 }
.gt-ed-foot kbd { font-family: inherit; font-weight: 600; border: 1.5px solid var(--line); border-radius: ${U(.5)}; padding: 0 ${U(.5)}; background: #fff; color: var(--blue-ink) }
`

/** Where the list is saved, in a line: { cls, text, small }. */
function statusLine(status) {
  switch (status?.state) {
    case 'loading': return { cls: '', text: 'Loading the list…' }
    case 'saving': return { cls: '', text: 'Saving…' }
    case 'shared': return { cls: 'ok', text: '✓ Saved for every staff login' }
    case 'start': return { cls: '', text: 'The starting list. Your changes are saved for every staff login.' }
    case 'laptop': return {
      cls: 'warn',
      text: 'Saved on this laptop only: the shared list is not set up yet, or the internet is down.',
      small: status.error ? `(${status.error.slice(0, 120)})` : '',
    }
    default: return { cls: '', text: '' }
  }
}

/** Where the photos come from, for the foot of the editor. */
function siteLine(where) {
  switch (where) {
    case 'site': return 'Photos come from the staff page on pra.edu.vn: add one there and it appears here.'
    case 'copy': return 'pra.edu.vn could not be reached just now: these are the photos it had last time.'
    case 'none': return 'pra.edu.vn could not be reached: the reveal will show names without photos.'
    default: return 'Looking for photos on pra.edu.vn…'
  }
}

export function TeacherEditor({ list, status, staff = [], site, onChange, onClose }) {
  const { teachers } = list
  const playing = teachers.filter(ready).length
  const line = statusLine(status)
  const set = (next) => onChange({ ...list, teachers: next })
  const patch = (id, change) => set(teachers.map((t) => (t.id === id ? { ...t, ...change } : t)))
  const move = (i, by) => {
    const next = [...teachers]
    const [row] = next.splice(i, 1)
    next.splice(i + by, 0, row)
    set(next)
  }
  const remove = (t) => {
    if (window.confirm(`Delete ${t.name || 'this teacher'} from the list?`)) set(teachers.filter((x) => x.id !== t.id))
  }
  const add = () => set([...teachers, { id: newId(), emojis: [], name: '', also: [], on: true, photo: '' }])

  return (
    <div className="gt-ed" role="dialog" aria-label="Edit teachers">
      <div className="gt-ed-card">
        <div className="gt-ed-head">
          <h2>Edit teachers</h2>
          <div className={`gt-ed-status ${line.cls}`}>
            {line.text}
            {line.small && <small>{line.small}</small>}
          </div>
          <button
            type="button"
            className={`gt-ed-btn ${list.shuffle ? 'on' : ''}`}
            onClick={() => onChange({ ...list, shuffle: !list.shuffle })}
            aria-pressed={list.shuffle}
            title="Off: the teachers come in this order. On: a new order every game."
          >
            <Shuffle /> {list.shuffle ? 'Shuffled' : 'In this order'}
          </button>
          <RoundTime secs={list.roundSecs || ROUND_MS / 1000} onSecs={(roundSecs) => onChange({ ...list, roundSecs })} />
          <button type="button" className="gt-ed-btn done" onClick={onClose}><Check /> Done</button>
        </div>
        <div className="gt-ed-cols" aria-hidden="true">
          <span />
          <span>Play</span>
          <span>Photo at the reveal</span>
          <span>Emojis (up to {EMOJI_MAX})</span>
          <span>Name on the TV</span>
          <span>Also counts as right</span>
          <span />
        </div>
        <div className="gt-ed-list">
          {teachers.map((t, i) => (
            <Row
              key={t.id}
              t={t}
              i={i}
              last={i === teachers.length - 1}
              staff={staff}
              onPatch={(change) => patch(t.id, change)}
              onUp={() => move(i, -1)}
              onDown={() => move(i, 1)}
              onDelete={() => remove(t)}
            />
          ))}
        </div>
        <div className="gt-ed-foot">
          <button type="button" className="gt-ed-btn" onClick={add}><Plus /> Add a teacher</button>
          <p>
            {playing} of {teachers.length} will be played. <kbd>Windows</kbd> + <kbd>.</kbd> opens the emoji keyboard.
            Capitals, accents and Mr / Ms / Thầy / Cô never matter; put other names under "Also counts as right", with commas between them.
            {' '}{siteLine(site)}
          </p>
        </div>
      </div>
    </div>
  )
}

/** The photo a teacher gets: a round thumbnail of the website's portrait, and a choice of who it is. */
function PhotoPick({ t, i, staff, onPatch }) {
  const card = staffFor(t, staff)
  const byName = staffFor({ ...t, photo: '' }, staff)
  const [a, b] = card ? TONES[card.tone % TONES.length] : []
  const count = card?.photos.length || 0
  return (
    <span className="gt-ed-photo">
      {card
        ? <span className="gt-ed-thumb" style={{ '--a': a, '--b': b }}><img src={card.portrait} alt="" /></span>
        : <span className="gt-ed-thumb none"><ImageOff /></span>}
      <span className="gt-ed-pick">
        <select value={t.photo || ''} onChange={(e) => onPatch({ photo: e.target.value })} aria-label={`Photo for teacher ${i + 1}`}>
          <option value="">{byName ? byName.name : 'Not on the website'}</option>
          {staff.map((s) => <option key={s.key} value={s.key}>{s.name}</option>)}
          <option value="none">No photo</option>
        </select>
        <small>{card ? `${t.photo ? 'Picked' : 'Found by name'} · ${count} ${count === 1 ? 'photo' : 'photos'}` : 'Name only at the reveal'}</small>
      </span>
    </span>
  )
}

function Row({ t, i, last, staff, onPatch, onUp, onDown, onDelete }) {
  // What is in the two typed boxes, kept as typed while the box is in use, so a
  // space or a comma does not vanish under the cursor.
  const [emojiDraft, setEmojiDraft] = useState(null)
  const [alsoDraft, setAlsoDraft] = useState(null)
  const needs = !t.name ? 'Needs a name' : !t.emojis.length ? 'Needs emojis' : ''
  return (
    <div className={`gt-ed-row ${t.on ? '' : 'off'}`}>
      <span className="gt-ed-num">{i + 1}</span>
      <span className="gt-ed-switchcell">
        <button
          type="button"
          role="switch"
          aria-checked={t.on}
          aria-label={`Play ${t.name || 'this teacher'}`}
          className="gt-ed-switch"
          onClick={() => onPatch({ on: !t.on })}
        />
      </span>
      <PhotoPick t={t} i={i} staff={staff} onPatch={onPatch} />
      <span>
        <input
          className="gt-ed-in emo"
          value={emojiDraft ?? t.emojis.join(' ')}
          onChange={(e) => {
            setEmojiDraft(e.target.value)
            onPatch({ emojis: splitEmojis(e.target.value) })
          }}
          onBlur={() => setEmojiDraft(null)}
          placeholder="🏠 📚 ☕ …"
          aria-label={`Emojis for teacher ${i + 1}`}
          spellCheck={false}
          autoComplete="off"
        />
      </span>
      <span>
        <input
          className="gt-ed-in"
          value={t.name}
          onChange={(e) => onPatch({ name: e.target.value.slice(0, 40) })}
          placeholder="Type a name"
          aria-label={`Name of teacher ${i + 1}`}
          spellCheck={false}
          autoComplete="off"
        />
        {needs && t.on && <span className="gt-ed-tag">{needs}</span>}
      </span>
      <span>
        <input
          className="gt-ed-in"
          value={alsoDraft ?? t.also.join(', ')}
          onChange={(e) => {
            setAlsoDraft(e.target.value)
            onPatch({ also: e.target.value.split(',').map((s) => s.trim()).filter(Boolean).slice(0, 8) })
          }}
          onBlur={() => setAlsoDraft(null)}
          placeholder="nickname, Vietnamese name"
          aria-label={`Other names for teacher ${i + 1}`}
          spellCheck={false}
          autoComplete="off"
        />
      </span>
      <span className="gt-ed-tools">
        <button type="button" className="gt-ed-icon" onClick={onUp} disabled={i === 0} aria-label="Move up" title="Move up"><ArrowUp /></button>
        <button type="button" className="gt-ed-icon" onClick={onDown} disabled={last} aria-label="Move down" title="Move down"><ArrowDown /></button>
        <button type="button" className="gt-ed-icon del" onClick={onDelete} aria-label="Delete" title="Delete"><Trash2 /></button>
      </span>
    </div>
  )
}

/** The round length, in steps of five seconds. The emojis and the points scale with it. */
function RoundTime({ secs, onSecs }) {
  const lastAt = Math.round(secs * ALL_UP_SHARE)
  return (
    <div className="gt-ed-time" title={`Each teacher gets ${secs} seconds. The last emoji goes up at ${lastAt} s; points fall from 1000 to 100 over the round.`}>
      <Timer aria-hidden="true" />
      <button type="button" className="gt-ed-icon" onClick={() => onSecs(roundSecsOf(secs - ROUND_SECS.step))} disabled={secs <= ROUND_SECS.min} aria-label="Shorter rounds"><Minus /></button>
      <span><b>{secs} s a round</b><small>all emojis up at {lastAt} s</small></span>
      <button type="button" className="gt-ed-icon" onClick={() => onSecs(roundSecsOf(secs + ROUND_SECS.step))} disabled={secs >= ROUND_SECS.max} aria-label="Longer rounds"><Plus /></button>
    </div>
  )
}
