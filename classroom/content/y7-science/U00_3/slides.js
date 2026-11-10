// content/y7-science/U00_3/slides.js
// Hanging Window Planters — a short, one-slide-of-steps building project, not
// tied to the Cambridge unit numbering (like Day One, U00_1, and the
// Accuracy and Precision lab, U00_2). Deliberately three slides: open, build,
// then what happens next. No concept teaching — the growing itself is the
// point, and the class checks back on it over the following days.
import { DIAGRAMS } from './diagrams.js'

const GREEN = '#4a8b23'
const TEAL = '#0087a8'

export const slides = [
  {
    layout: 'hero',
    color: 'bg-[#4a8b23]',
    icon: 'Sprout',
    brand: 'Year 7 Science',
    brandVn: 'Khoa học Lớp 7',
    eyebrow: 'A Class Window Garden',
    eyebrowVn: 'Vườn cửa sổ của lớp',
    title: 'Hanging Window Planters',
    titleVn: 'Chậu cây treo cửa sổ',
    subtitle: 'One cup, one seed, one spot in the sun.',
    subtitleVn: 'Một cái cốc, một hạt giống, một chỗ đầy nắng.',
  },

  {
    layout: 'steps',
    accent: GREEN,
    icon: 'Sprout',
    eyebrow: 'You get a cup, a hole punch, soil, and seeds',
    eyebrowVn: 'Em sẽ nhận một cái cốc, dụng cụ đục lỗ, đất, và hạt giống',
    title: 'Build Your Planter',
    titleVn: 'Làm chậu cây của em',
    inlineSvg: DIAGRAMS.PLANTER,
    steps: [
      { text: 'Punch a few **drainage holes** in the bottom, and **two holes** near the rim on opposite sides.', textVn: 'Đục vài lỗ **thoát nước** ở đáy, và **hai lỗ** gần miệng cốc ở hai phía đối diện.' },
      { text: 'Fill the cup with **soil**, almost to the top.', textVn: 'Đổ **đất** vào cốc, gần đầy miệng cốc.' },
      { text: 'Push your **seed** just under the soil surface.', textVn: 'Ấn **hạt giống** xuống ngay dưới bề mặt đất.' },
      { text: 'Tie **string** through the two rim holes, and hang your cup in the window.', textVn: 'Xỏ **dây** qua hai lỗ ở miệng cốc, rồi treo cốc lên cửa sổ.' },
    ],
  },

  {
    layout: 'callout',
    accent: TEAL,
    icon: 'Sun',
    eyebrow: 'Now you wait',
    eyebrowVn: 'Bây giờ chờ đợi thôi',
    title: 'Water It, Watch It, Wait',
    titleVn: 'Tưới nước, quan sát, và chờ đợi',
    content: 'Give it a **little water** now, and check on it every day — it is already in the sunniest spot in the room.',
    contentVn: 'Tưới **một chút nước** ngay bây giờ, và kiểm tra mỗi ngày — nó đã ở chỗ đầy nắng nhất trong phòng rồi.',
    notes: [
      {
        tone: 'info',
        badge: 'Do not overwater',
        badgeVn: 'Đừng tưới quá nhiều',
        text: 'A little water, a few times a week. Too much and the seed rots before it ever sprouts.',
        textVn: 'Tưới ít, vài lần một tuần. Tưới quá nhiều thì hạt sẽ thối trước khi kịp nảy mầm.',
      },
    ],
  },
]
