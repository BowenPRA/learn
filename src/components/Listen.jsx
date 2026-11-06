/* eslint-disable react-refresh/only-export-components */
import { useEffect, useRef, useState } from 'react'
import { Square, Volume2 } from 'lucide-react'
import { useT } from '../lib/i18n.jsx'

// Read aloud with the browser's own voices (speechSynthesis). Nothing is sent
// anywhere by this code. The button hides itself where the browser has no speech,
// and speaking stops when the button goes away (the child moves on).

export const canSpeak = () => typeof window !== 'undefined' && 'speechSynthesis' in window && typeof window.SpeechSynthesisUtterance === 'function'

/** Slide or question text as plain words: no **bold**, $maths$ marks or {{ }}/[[ ]]/<< >>. */
export function plain(text) {
  if (text == null) return ''
  return String(text)
    .replace(/<[^>]*>/g, ' ')
    .replace(/\{\{|\}\}|\[\[|\]\]|<<|>>/g, '')
    .replace(/\$([^$]*)\$/g, '$1')
    .replace(/\*\*|__|(?<!\w)\*|\*(?!\w)/g, '')
    .replace(/^\s*>\s?/gm, '')
    .replace(/[−–]/g, '-')
    .replace(/\s+/g, ' ')
    .trim()
}

function englishVoice() {
  const voices = window.speechSynthesis.getVoices() || []
  const en = voices.filter((v) => /^en[-_]/i.test(v.lang) || v.lang === 'en')
  return en.find((v) => /en[-_](GB|US)/i.test(v.lang) && v.localService) || en.find((v) => v.localService) || en[0] || null
}

let current = null

export function stopSpeaking() {
  if (!canSpeak()) return
  current = null
  window.speechSynthesis.cancel()
}

/** A Listen / Stop button that reads `text` (English) at rate 0.9. */
export function ListenButton({ text, label, className = '' }) {
  const { t } = useT()
  const [on, setOn] = useState(false)
  const mine = useRef(null)
  useEffect(() => () => { if (current && current === mine.current) stopSpeaking() }, [])
  const words = plain(Array.isArray(text) ? text.filter(Boolean).join('. ') : text)
  if (!canSpeak() || !words) return null

  const toggle = () => {
    if (on) { stopSpeaking(); setOn(false); return }
    window.speechSynthesis.cancel()
    const u = new window.SpeechSynthesisUtterance(words)
    const v = englishVoice()
    if (v) u.voice = v
    u.lang = v?.lang || 'en-GB'
    u.rate = 0.9
    u.onend = u.onerror = () => { if (current === u) current = null; if (mine.current === u) setOn(false) }
    mine.current = u
    current = u
    setOn(true)
    window.speechSynthesis.speak(u)
  }
  return (
    <button type="button" onClick={toggle} aria-pressed={on}
      className={`inline-flex min-h-[44px] shrink-0 items-center gap-2 rounded-2xl border-2 px-3 py-1.5 text-base font-extrabold transition ${on ? 'border-pra-blue bg-pra-blue text-white' : 'border-pra-blue-tint bg-white text-pra-blue hover:border-pra-blue'} ${className}`}>
      {on ? <Square className="h-5 w-5 fill-current" strokeWidth={2.5} aria-hidden /> : <Volume2 className="h-5 w-5" strokeWidth={2.5} aria-hidden />}
      <span>{on ? t('stopListen') : label || t('listen')}</span>
    </button>
  )
}
