// content/y7-science/U04_1/film.jsx
// THE SENSITIVE PLANT — a short clip of Mimosa pudica (cây xấu hổ) folding
// its leaves when it is touched: a plant that senses and moves. Silent, so it
// loops like a GIF. No frame of its own: the layout already puts the media in
// a panel (as in 3.4's TideFilm).
import { tr } from '../../../src/lib/lang.js'
import mimosaFilm from './images/mimosa.webm'
import mimosaPoster from './images/mimosa.jpg'

const t = (lang, en, fr) => tr(lang, en, null, fr)

export function MimosaFilm({ lang = 'en' }) {
  return (
    <div className="w-full h-full flex items-center justify-center select-none">
      <div className="w-full h-full">
        <video
          className="w-full h-full object-contain rounded-xl"
          src={mimosaFilm}
          poster={mimosaPoster}
          controls
          playsInline
          autoPlay
          muted
          loop
          preload="auto"
          aria-label={t(lang, 'A finger touches a sensitive plant, and its leaves fold up', 'Un doigt touche une sensitive, et ses feuilles se replient')}
        />
      </div>
    </div>
  )
}
