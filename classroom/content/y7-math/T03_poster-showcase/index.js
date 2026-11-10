// content/y7-math/T03_poster-showcase/index.js
// A lesson module: default-exports { meta, slides, plan }. The registry
// auto-discovers this file (content/<course>/<unit>/index.js).
//
// `unit` is rendered inside a small circular badge on the course page, so it
// has to stay short — hence 'T3' rather than 'Task 3'.
import { slides } from './slides.js'
import { plan } from './plan.js'

export default {
  meta: {
    course: 'y7-math',
    unit: 'T3',
    id: 'T03',
    title: 'Task: The Maths Poster',
    subtitle: 'End-of-Quarter showcase · Thursday 8 October, 3:30–4:15',
    objective:
      'The launch for the end-of-Quarter-1 showcase. Each student makes one A3 poster that teaches one topic from the quarter to their parents, and explains it in one minute on the day. ' +
      'The deck asks what a parent would need before it answers with a seven-part checklist — title, key words, a picture, how it works, two examples, a common mistake, and a Try it! question under a flap — ' +
      'shown on a finished example poster on square roots, a topic nobody is given. The ten topics are dealt out on a board that uses the Pick button\'s class list and remembers the result on the classroom computer. ' +
      'It ends with the one-minute explanation, modelled by Mr Bowen and then copied as a five-sentence frame.',
    order: 13.5, // the end of Quarter 1, after 3.1–3.2
  },
  slides,
  plan,
}
