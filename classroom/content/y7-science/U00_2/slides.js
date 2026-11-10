// content/y7-science/U00_2/slides.js
// Accuracy and Precision — a standalone scientific-enquiry lab, not tied to
// the Cambridge unit numbering (like Day One, U00_1). Three stations, three
// groups, one full rotation: 20 minutes per station, the first 2 of which are
// for a prediction with no measuring yet.
//
// The class only ever looks at one shared projector, so the rotation-timer
// slide (widget) carries the live schedule for all three stations at once,
// staged with the clock: each station's prediction question (minutes 0–2),
// then its base task (minutes 2–15), then a bonus extension question
// (minutes 15–20) — see STATIONS in widgets.jsx. The extension is never
// previewed on the station-briefing slides below, so it lands as a surprise
// for whichever group gets there early.
import { GroupMakerWidget, StationRotationWidget } from './widgets.jsx'

const TEAL = '#0087a8'
const PURPLE = '#5c2483'
const ORANGE = '#c25e12'
const BLUE = '#1a5fa8'

export const slides = [
  {
    layout: 'hero',
    color: 'bg-[#0087a8]',
    icon: 'Target',
    brand: 'Year 7 Science · Scientific Enquiry',
    brandVn: 'Khoa học Lớp 7 · Kỹ năng nghiên cứu khoa học',
    eyebrow: 'A Measuring Lab',
    eyebrowVn: 'Một buổi thực hành đo lường',
    title: 'Accuracy and Precision',
    titleVn: 'Độ chính xác và độ chuẩn xác',
    subtitle: 'Three stations, twenty minutes each. Your group predicts first, then measures.',
    subtitleVn: 'Ba trạm, mỗi trạm hai mươi phút. Nhóm em dự đoán trước, rồi mới đo.',
  },

  {
    layout: 'steps',
    accent: TEAL,
    icon: 'Repeat',
    eyebrow: 'Three stations, one rotation',
    eyebrowVn: 'Ba trạm, một vòng xoay',
    title: 'How Today Works',
    titleVn: 'Hôm nay diễn ra thế nào',
    steps: [
      { text: 'The class splits into **3 groups**.', textVn: 'Cả lớp chia thành **3 nhóm**.' },
      { text: 'Each group spends **20 minutes** at each of the **3 stations**.', textVn: 'Mỗi nhóm dành **20 phút** ở mỗi trạm trong **3 trạm**.' },
      { text: 'The **first 2 minutes** at every station are for **predicting** — before you measure anything.', textVn: '**2 phút đầu tiên** ở mỗi trạm dùng để **dự đoán** — trước khi đo bất cứ thứ gì.' },
      { text: 'When the timer says **move**, rotate to the next station with your group.', textVn: 'Khi đồng hồ báo **di chuyển**, hãy cùng nhóm chuyển sang trạm tiếp theo.' },
    ],
  },

  {
    layout: 'split',
    accent: PURPLE,
    icon: 'Users',
    title: 'Make Your Groups',
    titleVn: 'Chia nhóm',
    ratio: 45,
    side: 'left',
    widget: GroupMakerWidget,
    content: 'Type every student\'s name, one per line, then press the button. The computer picks the groups — not you.',
    contentVn: 'Gõ tên từng học sinh, mỗi tên một dòng, rồi bấm nút. Máy tính sẽ chọn nhóm — không phải các em.',
  },

  // ── The three stations, briefed before the class disperses ────────────────
  {
    layout: 'stack',
    accent: TEAL,
    icon: 'Ruler',
    columns: 1,
    eyebrow: 'Station 1',
    eyebrowVn: 'Trạm 1',
    title: 'The Perimeter of the Classroom',
    titleVn: 'Chu vi của phòng học',
    notes: [
      {
        tone: 'task',
        badge: 'Predict first — 2 minutes, no measuring yet',
        badgeVn: 'Dự đoán trước — 2 phút, chưa được đo',
        text: 'What will the final perimeter of the room be? Every person in the group writes down their own guess, in metres.',
        textVn: 'Chu vi cuối cùng của phòng sẽ là bao nhiêu? Mỗi người trong nhóm tự ghi lại dự đoán của mình, theo mét.',
      },
      {
        tone: 'write',
        badge: 'Then measure',
        badgeVn: 'Sau đó hãy đo',
        text: 'Measure the **length of every wall**, then **add them together** to find the total perimeter of the room. Write down every wall\'s length, not just the total.',
        textVn: 'Đo **chiều dài của từng bức tường**, rồi **cộng chúng lại** để tìm chu vi của cả phòng. Ghi lại độ dài của từng bức tường, không chỉ tổng số.',
      },
    ],
  },
  {
    layout: 'stack',
    accent: PURPLE,
    icon: 'Layers',
    columns: 1,
    eyebrow: 'Station 2',
    eyebrowVn: 'Trạm 2',
    title: 'Folding the Paper',
    titleVn: 'Gấp giấy',
    notes: [
      {
        tone: 'task',
        badge: 'Predict first — 2 minutes, no folding yet',
        badgeVn: 'Dự đoán trước — 2 phút, chưa được gấp',
        text: 'How many times can your group fold one sheet of A3 paper in half, and how thick will the folded stack be? Everybody writes down both numbers.',
        textVn: 'Nhóm em có thể gấp đôi một tờ giấy A3 được bao nhiêu lần, và xấp giấy gấp lại sẽ dày bao nhiêu? Mỗi người tự ghi lại cả hai con số.',
      },
      {
        tone: 'write',
        badge: 'Then fold',
        badgeVn: 'Sau đó hãy gấp',
        text: 'Fold the paper in half, again and again, as a group — as many times as you actually can. Then measure the **width of the folded stack**.',
        textVn: 'Cùng nhóm gấp đôi tờ giấy, gấp đi gấp lại — càng nhiều lần càng tốt. Sau đó đo **bề rộng của xấp giấy đã gấp**.',
      },
    ],
  },
  {
    layout: 'stack',
    accent: ORANGE,
    icon: 'Timer',
    columns: 1,
    eyebrow: 'Station 3',
    eyebrowVn: 'Trạm 3',
    title: 'The Ramp Race',
    titleVn: 'Cuộc đua trên đường dốc',
    notes: [
      {
        tone: 'task',
        badge: 'Predict first — 2 minutes, no racing yet',
        badgeVn: 'Dự đoán trước — 2 phút, chưa được đua',
        text: 'One metre down the ramp: the plastic ball or the wooden ball — which will be faster, and by how much? Everybody writes down a guess, a reason, and a rough time gap.',
        textVn: 'Trên đoạn đường dốc dài một mét: quả bóng nhựa hay quả bóng gỗ — quả nào sẽ nhanh hơn, và nhanh hơn bao nhiêu? Mỗi người ghi lại dự đoán, lý do, và ước lượng chênh lệch thời gian.',
      },
      {
        tone: 'write',
        badge: 'Then race',
        badgeVn: 'Sau đó hãy đua',
        text: 'Time each ball down the **1 metre track**, **10 times each**. Write down all 20 times, then find the **average time** for each ball.',
        textVn: 'Bấm giờ mỗi quả bóng chạy hết **đường dốc dài 1 mét**, **10 lần mỗi quả**. Ghi lại cả 20 lần đo, sau đó tính **thời gian trung bình** của mỗi quả bóng.',
      },
    ],
  },

  {
    layout: 'showcase',
    accent: '#4a8b23',
    icon: 'Timer',
    eyebrow: 'One slide, the whole lab',
    eyebrowVn: 'Một trang chiếu, cho cả buổi thực hành',
    title: 'Start the Rotation',
    titleVn: 'Bắt đầu vòng xoay',
    widget: StationRotationWidget,
    caption: 'Leave this slide open for all three rotations. Press Start, and press Next Rotation when the timer reaches zero.',
    captionVn: 'Giữ nguyên trang chiếu này suốt cả ba vòng. Bấm Bắt đầu, và bấm Vòng tiếp theo khi đồng hồ về không.',
  },

  {
    layout: 'callout',
    accent: BLUE,
    icon: 'Sparkles',
    eyebrow: 'Before you sit back down',
    eyebrowVn: 'Trước khi về chỗ ngồi',
    title: 'Look at Your Numbers',
    titleVn: 'Nhìn lại các con số của em',
    content: 'Compare your **prediction** with your **group\'s data**. At the ramp station, did all 10 times for one ball come out **exactly the same**?',
    contentVn: 'So sánh **dự đoán** của em với **số liệu của nhóm**. Ở trạm đường dốc, cả 10 lần đo của một quả bóng có ra **đúng y hệt nhau** không?',
    notes: [
      {
        tone: 'info',
        badge: 'Talk about it',
        badgeVn: 'Cùng thảo luận',
        text: 'If two groups measured the same wall and got different lengths, whose number is "right"? What would make everyone\'s measurement more alike?',
        textVn: 'Nếu hai nhóm cùng đo một bức tường mà ra hai con số khác nhau, số nào mới là số "đúng"? Điều gì sẽ giúp phép đo của mọi người giống nhau hơn?',
      },
    ],
  },
]
