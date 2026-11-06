// Layout registry: maps a slide's `layout` field to its component. A slide with
// no `layout` falls back to the legacy `type` renderer in Notes.jsx, so every
// existing GED deck keeps rendering unchanged.
//
// Ported from the Lessons project (BowenPRA/classroom). These were built for a
// teacher driving a projector; here they run autonomously, so the classroom-only
// moves translate: "ask, then tell" → the Reveal box, teacher-paced steppers →
// self-paced Steps, and the check-MCQ (the Dashboard's own retention gate) can
// attach to any layout via Notes.jsx.
import HeroLayout from './HeroLayout.jsx';
import StatementLayout from './StatementLayout.jsx';
import SplitLayout from './SplitLayout.jsx';
import ShowcaseLayout from './ShowcaseLayout.jsx';
import CompareLayout from './CompareLayout.jsx';
import StackLayout from './StackLayout.jsx';
import StepsLayout from './StepsLayout.jsx';
import CalloutLayout from './CalloutLayout.jsx';
import GalleryLayout from './GalleryLayout.jsx';

// isLayout / LAYOUT_NAMES live in helpers.jsx so this file exports only a
// component (fast-refresh clean); import them from there.

/**
 * Renders the layout a slide declares. A switch with literal component tags
 * (rather than a name→component map read during render) keeps the caller free of
 * the "component created during render" hazard while still dispatching by name.
 */
export function SlideLayout({ name, slide, ctx }) {
  switch (name) {
    case 'hero': return <HeroLayout slide={slide} ctx={ctx} />;
    case 'statement': return <StatementLayout slide={slide} ctx={ctx} />;
    case 'split': return <SplitLayout slide={slide} ctx={ctx} />;
    case 'showcase': return <ShowcaseLayout slide={slide} ctx={ctx} />;
    case 'compare': return <CompareLayout slide={slide} ctx={ctx} />;
    case 'stack': return <StackLayout slide={slide} ctx={ctx} />;
    case 'steps': return <StepsLayout slide={slide} ctx={ctx} />;
    case 'callout': return <CalloutLayout slide={slide} ctx={ctx} />;
    case 'gallery': return <GalleryLayout slide={slide} ctx={ctx} />;
    default: return null;
  }
}
