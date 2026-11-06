// src/remote/planNotes.js
// The teacher plan, cut up slide by slide for the phone remote's presenter
// view. Plans have no per-slide field, but every plan from Maths 1.6 / Science
// 1.4 on writes its timeline as "Slide 9: … Slide 10: …" and its answers as
// "Slides 9–11 — …", so those sentences are found and filed under the slides
// they name. Older plans do not number their slides; their decks simply show
// no notes on the phone. Nothing here travels over the network: the phone
// reads the plan from its own copy of the site.

// "Slide 9", "Slides 21–23", "Slides 1, 3, 4", "Slides 7 and 8".
const REF = /\bSlides?\s+(\d+(?:\s*(?:[–—-]|,|and|&)\s*\d+)*)/g

function slideNumbers(spec) {
  const out = []
  for (const part of spec.split(/\s*(?:,|\band\b|&)\s*/)) {
    const range = part.match(/^(\d+)\s*[–—-]\s*(\d+)$/)
    if (range) {
      const [a, b] = [Number(range[1]), Number(range[2])]
      for (let k = a; k <= b && k - a < 60; k++) out.push(k)
    } else if (/^\d+$/.test(part.trim())) {
      out.push(Number(part.trim()))
    }
  }
  return out
}

// A reference opens a new note only where a sentence starts; "back to slide 4"
// inside a sentence stays part of the note it is in.
const atSentenceStart = (text, index) => index === 0 || /[.!?;)]\s+$/.test(text.slice(0, index))

/**
 * Map from slide number (1-based) to `{ plan: [{ when, text }], answers: [{ label, text }] }`.
 */
export function planNotes(plan) {
  const notes = new Map()
  const at = (n) => {
    if (!notes.has(n)) notes.set(n, { plan: [], answers: [] })
    return notes.get(n)
  }
  if (!plan) return notes

  for (const step of plan.timeline || []) {
    const detail = String(step.detail || '')
    const when = [step.time, step.phase].filter(Boolean).join(' · ')
    const starts = [...detail.matchAll(REF)].filter((m) => atSentenceStart(detail, m.index))
    starts.forEach((m, k) => {
      const end = k + 1 < starts.length ? starts[k + 1].index : detail.length
      // "Slide 9: say it" files "say it"; "Slide 2 gives the question" reads
      // as a sentence, so it keeps its subject.
      const rest = detail.slice(m.index + m[0].length, end)
      let text = (/^\s*[:,.—–-]/.test(rest) ? rest.replace(/^[\s:,.—–-]+/, '') : detail.slice(m.index, end)).trim()
      // Words before the first "Slide N" set that slide up ("Pairs, cans out.").
      if (k === 0 && m.index > 0) text = `${detail.slice(0, m.index).trim()} ${text}`
      if (!text) return
      text = text[0].toUpperCase() + text.slice(1)
      for (const n of slideNumbers(m[1])) at(n).plan.push({ when, text })
    })
  }

  for (const item of plan.answers || []) {
    const q = String(item.q || '')
    const m = q.match(/^Slides?\s+(\d+(?:\s*(?:[–—-]|,|and|&)\s*\d+)*)\s*(?:[—–:-]\s*)?(.*)$/)
    if (!m || !item.a) continue
    for (const n of slideNumbers(m[1])) at(n).answers.push({ label: m[2].trim(), text: String(item.a) })
  }
  return notes
}
