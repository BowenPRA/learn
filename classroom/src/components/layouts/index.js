// Layout registry: maps a slide's `layout` field to its component.
//
// Slides written before `layout` existed carry a `type` instead. Each of those
// is mapped onto the layout that generalised it, with the old renderer's
// defaults filled in, so an old deck keeps rendering without its own code path.
import HeroLayout from './HeroLayout.jsx'
import StatementLayout from './StatementLayout.jsx'
import SplitLayout from './SplitLayout.jsx'
import ShowcaseLayout from './ShowcaseLayout.jsx'
import CompareLayout from './CompareLayout.jsx'
import StackLayout from './StackLayout.jsx'
import StepsLayout from './StepsLayout.jsx'
import CalloutLayout from './CalloutLayout.jsx'
import GalleryLayout from './GalleryLayout.jsx'
import GameLayout from './GameLayout.jsx'

export const LAYOUTS = {
  hero: HeroLayout,
  statement: StatementLayout,
  split: SplitLayout,
  showcase: ShowcaseLayout,
  compare: CompareLayout,
  stack: StackLayout,
  steps: StepsLayout,
  callout: CalloutLayout,
  gallery: GalleryLayout,
  game: GameLayout,
}

export function getLayout(name) {
  return name ? LAYOUTS[name] || null : null
}

// The legacy `type` renderers and the layouts that replaced them.
const LEGACY = {
  intro: (s) => ({ ...s, layout: 'hero', icon: s.icon || 'BookOpen', color: s.color || '#1cb0f6', eyebrow: s.eyebrow ?? s.unit }),
  summary: (s) => ({ ...s, layout: 'hero', icon: s.icon || 'CheckCircle2', color: s.color || '#58cc02' }),
  concept: (s) => ({ ...s, layout: 'split' }),
  warmup: (s) => ({ ...s, layout: 'split', icon: s.icon || 'Pencil', accent: s.accent || s.color || '#ff9600' }),
}

/** The slide as the layouts expect it: `layout` set, legacy `type` translated. */
export function resolveSlide(slide) {
  if (!slide || slide.layout) return slide
  const adapt = LEGACY[slide.type]
  return adapt ? adapt(slide) : slide
}
