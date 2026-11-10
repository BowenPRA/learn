// content/y7-science/U03_6/film.jsx
// The real thing, slowed down: a big exercise ball, filmed at 240 frames a
// second, goes flat at the bottom as it hits the floor and springs back up —
// kinetic to elastic potential to kinetic, the same as the tennis ball. Silent,
// looping, with controls to pause it (like 3.4's Holy Island film). No tennis
// ball clip on Commons is openly licensed; this one is (CC BY-SA 4.0).
import { tr } from '../../../src/lib/lang.js'
import ballFilm from './images/ball.webm'

const t = (lang, en, fr) => tr(lang, en, null, fr)

// No frame of its own: the layout already puts the media in a panel.
export function BallFilm({ lang = 'en' }) {
  return (
    <div className="w-full h-full flex items-center justify-center select-none">
      <div className="w-full h-full">
        <video
          className="w-full h-full object-contain rounded-xl"
          src={ballFilm}
          controls
          playsInline
          autoPlay
          muted
          loop
          preload="auto"
          aria-label={t(lang, 'Slow motion: a big ball goes flat at the bottom as it bounces', 'Au ralenti : une grosse balle s’aplatit en bas en rebondissant')}
        />
      </div>
    </div>
  )
}
