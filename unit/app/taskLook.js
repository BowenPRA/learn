// How a task looks on the unit page: its picture and its colour (a tile's face and the
// darker edge under it, as on the Dashboard). A task takes its kind's look unless
// src/data/units.js gives it its own `icon` or `tone`.
import { ClipboardCheck, Diamond, DraftingCompass, FileText, FlaskConical, Languages, Lightbulb, NotebookPen, Puzzle, Shapes, Waves } from 'lucide-react'

const ICONS = { ClipboardCheck, Diamond, DraftingCompass, FileText, FlaskConical, Languages, Lightbulb, NotebookPen, Puzzle, Shapes, Waves }

const TONES = {
  slate: ['#64748b', '#475569'],
  green: ['#58cc02', '#58a700'],
  orange: ['#ff9600', '#cc7800'],
  blue: ['#2563eb', '#1d4ed8'],
  navy: ['#1a5fa8', '#134a85'],
  sky: ['#1cb0f6', '#1899d6'],
  violet: ['#8b5cf6', '#6d28d9'],
  rose: ['#f43f5e', '#be123c'],
  teal: ['#14b8a6', '#0f766e'],
}

const KIND = {
  notes: { icon: 'FileText', tone: 'slate' },
  words: { icon: 'Languages', tone: 'green' },
  engine: { icon: 'Puzzle', tone: 'sky' },
  steps: { icon: 'NotebookPen', tone: 'orange' },
  quiz: { icon: 'ClipboardCheck', tone: 'blue' },
}

export function taskLook(task) {
  const kind = KIND[task.kind] || KIND.engine
  const [face, edge] = TONES[task.tone] || TONES[kind.tone]
  return { Icon: ICONS[task.icon] || ICONS[kind.icon], face, edge }
}
