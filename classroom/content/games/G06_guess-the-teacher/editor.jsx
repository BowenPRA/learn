// content/games/G06_guess-the-teacher/editor.jsx
// Edit teachers: the list the game plays, edited on the TV's laptop. One row a
// teacher: an On switch, the emojis (typed or pasted; Windows + . opens the
// emoji keyboard), the name shown at the reveal, and other names that also
// count as right. Rows move up and down and can be deleted. Every change is
// saved as it is made (list.js); the line at the top says where.
import { useState } from 'react'
import { ArrowDown, ArrowUp, Check, Plus, Shuffle, Trash2 } from 'lucide-react'
import { newId, ready, splitEmojis } from './list.js'
import { EMOJI_MAX } from './protocol.js'

const U = (n) => `calc(var(--u) * ${n})`

export const EDITOR_CSS = `
.gt-ed { --u: min(1cqh, .5625cqw); position: absolute; inset: 0; z-index: 30; display: flex; padding: ${U(2.4)} ${U(3.4)}; background: rgba(13,8,51,.72); backdrop-filter: blur(6px) }
.gt-ed-card { flex: 1; min-height: 0; display: flex; flex-direction: column; background: #fff; color: #1e1b4b; border-radius: ${U(2.6)};
  box-shadow: 0 ${U(.8)} 0 #a5b4fc, 0 ${U(2)} ${U(5)} rgba(0,0,0,.4); overflow: hidden; user-select: text }
.gt-ed-head { display: flex; align-items: center; gap: ${U(2)}; padding: ${U(2)} ${U(2.6)}; border-bottom: ${U(.3)} solid #e0e7ff; flex-wrap: wrap }
.gt-ed-head h2 { margin: 0; font-size: ${U(4)}; font-weight: 800; line-height: 1 }
.gt-ed-status { flex: 1; min-width: ${U(30)}; font-size: ${U(1.9)}; font-weight: 700; color: #6b7280; line-height: 1.25 }
.gt-ed-status.ok { color: #047857 }
.gt-ed-status.warn { color: #b45309 }
.gt-ed-status small { display: block; font-weight: 600; color: #9ca3af; font-size: ${U(1.6)} }
.gt-ed-btn { display: inline-flex; align-items: center; gap: ${U(.7)}; font: inherit; font-size: ${U(2.1)}; font-weight: 700; line-height: 1; cursor: pointer;
  padding: ${U(1)} ${U(1.6)}; border-radius: ${U(1.4)}; border: ${U(.25)} solid #c7d2fe; background: #eef2ff; color: #3730a3 }
.gt-ed-btn:hover { background: #e0e7ff }
.gt-ed-btn svg { width: ${U(2.3)}; height: ${U(2.3)} }
.gt-ed-btn.on { background: #4f46e5; border-color: #4f46e5; color: #fff }
.gt-ed-btn.done { background: #fde047; border-color: #eab308; color: #3b0764; font-size: ${U(2.4)}; padding: ${U(1.1)} ${U(2.4)} }
.gt-ed-cols, .gt-ed-row { display: grid; grid-template-columns: ${U(3)} ${U(7.5)} minmax(0, 1.25fr) minmax(0, 1fr) minmax(0, 1.1fr) ${U(15)}; gap: ${U(1.2)}; align-items: center }
.gt-ed-cols { padding: ${U(1.2)} ${U(2.6)} ${U(.6)}; font-size: ${U(1.6)}; font-weight: 800; letter-spacing: .08em; text-transform: uppercase; color: #6b7280 }
.gt-ed-list { flex: 1; min-height: 0; overflow-y: auto; padding: 0 ${U(2.6)} ${U(1.4)} }
.gt-ed-row { padding: ${U(.9)} 0; border-bottom: 1px solid #eef2ff }
.gt-ed-row.off > :not(.gt-ed-switchcell):not(.gt-ed-tools) { opacity: .45 }
.gt-ed-num { font-size: ${U(2.2)}; font-weight: 800; color: #9ca3af; text-align: right }
.gt-ed-in { width: 100%; font: inherit; font-size: ${U(2.2)}; font-weight: 700; color: #1e1b4b; padding: ${U(.9)} ${U(1.2)}; border-radius: ${U(1.2)};
  border: ${U(.25)} solid #c7d2fe; background: #fff; outline: none }
.gt-ed-in:focus { border-color: #6366f1 }
.gt-ed-in.emo { font-size: ${U(3)}; padding: ${U(.4)} ${U(1)}; letter-spacing: .05em }
.gt-ed-tag { display: inline-block; margin-top: ${U(.4)}; font-size: ${U(1.5)}; font-weight: 800; color: #b45309; background: #fef3c7; padding: ${U(.2)} ${U(.8)}; border-radius: 999px }
.gt-ed-switch { position: relative; width: ${U(6.4)}; height: ${U(3.6)}; border-radius: 999px; border: none; padding: 0; cursor: pointer; background: #d1d5db; transition: background .15s }
.gt-ed-switch::after { content: ''; position: absolute; top: ${U(.45)}; left: ${U(.45)}; width: ${U(2.7)}; height: ${U(2.7)}; border-radius: 999px; background: #fff;
  box-shadow: 0 1px 3px rgba(0,0,0,.3); transition: transform .15s }
.gt-ed-switch[aria-checked="true"] { background: #10b981 }
.gt-ed-switch[aria-checked="true"]::after { transform: translateX(${U(2.8)}) }
.gt-ed-tools { display: flex; gap: ${U(.5)}; justify-content: flex-end }
.gt-ed-icon { width: ${U(4.4)}; height: ${U(4.4)}; display: inline-flex; align-items: center; justify-content: center; border-radius: ${U(1.1)}; cursor: pointer;
  border: ${U(.25)} solid #e0e7ff; background: #f8fafc; color: #4b5563; padding: 0 }
.gt-ed-icon:hover:not(:disabled) { background: #eef2ff; color: #3730a3 }
.gt-ed-icon:disabled { opacity: .3; cursor: default }
.gt-ed-icon.del:hover { background: #fee2e2; color: #b91c1c; border-color: #fecaca }
.gt-ed-icon svg { width: ${U(2.3)}; height: ${U(2.3)} }
.gt-ed-foot { display: flex; align-items: center; gap: ${U(2)}; padding: ${U(1.4)} ${U(2.6)}; border-top: ${U(.3)} solid #e0e7ff; flex-wrap: wrap }
.gt-ed-foot p { flex: 1; min-width: ${U(40)}; margin: 0; font-size: ${U(1.75)}; font-weight: 600; color: #6b7280; line-height: 1.35 }
.gt-ed-foot kbd { font-family: inherit; font-weight: 800; border: 1px solid #c7d2fe; border-radius: ${U(.5)}; padding: 0 ${U(.5)}; background: #eef2ff; color: #3730a3 }
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

export function TeacherEditor({ list, status, onChange, onClose }) {
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
  const add = () => set([...teachers, { id: newId(), emojis: [], name: '', also: [], on: true }])

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
          <button type="button" className="gt-ed-btn done" onClick={onClose}><Check /> Done</button>
        </div>
        <div className="gt-ed-cols" aria-hidden="true">
          <span />
          <span>Play</span>
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
          </p>
        </div>
      </div>
    </div>
  )
}

function Row({ t, i, last, onPatch, onUp, onDown, onDelete }) {
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
          placeholder="a nickname, a Vietnamese name"
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

