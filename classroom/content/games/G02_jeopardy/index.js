// content/games/G02_jeopardy/index.js
// A game module, discovered by the registry exactly like a lesson. One "unit"
// in the games course is one game; the four boards live inside it.
import { slides } from './slides.js'
import { plan } from './plan.js'

export default {
  meta: {
    course: 'games',
    unit: 'G2',
    id: 'G02',
    title: 'Jeopardy',
    objective: 'Teams pick a category and a value, argue in English, and the teacher reveals — fourteen boards. Ten are Year 7: Mathematics 1.1–1.3, Science 1.1–1.3, a revision board drawn from all six units, a Unit 1 finale covering Maths 1.4–1.6, Science 1.4 and two rounds of classroom trivia, Science Unit 2 (2.1–2.7) with a photograph, symbol or particle diagram on almost every clue, Mathematics Unit 2 with 3.1–3.2, Science 2.4 + 2.8 (the water cycle, acids and alkalis), Science 3.1 with Maths 4.1–4.2 (gravity, weight and mass; comparing, adding and subtracting decimals), the first board in English and French, and Maths Unit 4 with Science 3.1–3.2 (multiplying and dividing decimals, shortcuts, money and the mean; the contact force, weight on Mars, and how the Solar System formed), and Science 4.1–4.3 (living or not, the seven characteristics, viruses, species, and a guessing round of hybrids with a photograph of each animal on the reveal). Two are for the Teens class and are the hardest: IGCSE chemistry and physics, word history, pop songs and big numbers, then a second board of all trivia: myth or fact, celebrity couples, famous covers, geography and accidental inventions. One is for Kindergarten and Year 1 — cooking and first science, read aloud by the teacher, with a photograph on almost every answer. The last is Year 1 only: twenty-five picture clues in five columns — In the Kitchen, Food, Dishes from the World, Claps and Which Is…?',
    order: 2,
    // FR joins the switch for the boards built from Unit 4 on, when Year 7 went
    // English and French. VN stays, because the older boards are Vietnamese.
    french: true,
    // EN+FR on the switch (PRA Learn, 13 Nov 2026): each clue in English with its
    // French underneath, smaller and grey. Boards without French show English.
    enFr: true,
  },
  slides,
  plan,
}
