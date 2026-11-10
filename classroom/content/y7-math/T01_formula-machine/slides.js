// content/y7-math/T01_formula-machine/slides.js
// Year 7 Mathematics · Task 1 — The Formula Machine.
//
// A standalone TASK, not a Learner's Book section. It sits after 2.2, where the
// class met substitution and the word "formula", and it spends a whole period
// doing the one thing 2.2 only had ten minutes for: taking ONE formula and
// running many different sets of numbers through it.
//
// Same house style as 1.1–2.2: teal section headers, purple activity boxes, the
// book's orange for every key word students copy down. Anything they must write
// goes in an orange "Write This Down" panel — never plain body text. Seven
// panels, and the recap asks them to count.
//
// FIVE THINGS SHAPE THIS DECK.
//
// 1. THE PICTURE HAS TO CHANGE, OR THE POINT IS LOST. Year 7 does not fail to
//    multiply — it fails to believe the formula still applies when the drawing
//    looks different. So every station is six problems on ONE formula with a
//    diagram that redraws each time: a 15 cm by 2 cm bookmark and a 12 cm by
//    5 cm tile both have perimeter 34 cm and look nothing alike. That is why
//    these are widgets and not printed figures.
//
// 2. THREE SLIDES ASK AND DO NOT TELL — 5, 8 and 13 — and none of them has the
//    answer anywhere on it. Slide 8 is the one to protect: 35 °C and 95 °F are
//    the SAME temperature, so a show of hands splits the room and the argument
//    is worth more than the conversion. Take the count on the board first.
//
// 3. THE ROUTINE IS THE LESSON. Write the formula · put the numbers in · work it
//    out. Every predictable error today is invisible in a final answer and
//    obvious in that middle line, exactly as in 2.2. Insist on it.
//
// 4. THE SCIENCE IS NOT DECORATION. Celsius to Fahrenheit and "count the
//    seconds, divide by three" are both formulas this class will actually use,
//    and the second one they can use walking home. The boiling point on the
//    temperature station is the same 100 °C Science 2.2 taught them.
//
// 5. PART 2 IS A DIFFERENT KIND OF QUESTION. Slides 13–16 hand them a formula
//    they can substitute into and then ask for the letter that ISN'T given.
//    The way in is not rearranging — it is counting cubes: how many altogether,
//    how many in one layer, divide. Problem 3 of that station is the one that
//    matters, because "same volume" and "same depth" are the two ideas most
//    easily confused and it separates them.
//
// Every number in this task is original. Nothing here spends an exercise from
// the book.
import { DIAGRAMS } from './diagrams.js'
import {
  PerimeterStation, TriangleStation, TemperatureStation, StormStation, PourWidget,
} from './widgets.jsx'

const TEAL = '#0087a8'
const PURPLE = '#5c2483'
const ORANGE = '#c25e12'
const GREEN = '#4a8b23'
const BLUE = '#1a5fa8'
const RED = '#c8102e'

export const slides = [
  // ── Opening: they can already do it, and that is the point ────────────────
  {
    layout: 'hero',
    color: PURPLE,
    icon: 'Calculator',
    brand: 'Year 7 Mathematics',
    brandVn: 'Toán Lớp 7',
    eyebrow: 'Task 1',
    eyebrowVn: 'Nhiệm vụ 1',
    title: 'The Formula Machine',
    titleVn: 'Cỗ Máy Công Thức',
    subtitle: 'One formula. Many different pictures.',
    subtitleVn: 'Một công thức. Rất nhiều hình vẽ khác nhau.',
    card: {
      icon: 'Pencil',
      badge: 'Starter Task',
      badgeVn: 'Nhiệm vụ khởi động',
      text: 'A rectangle is **8 cm** long and **3 cm** wide. An ant walks all the way around the edge.\n\nHow far does it walk? Whiteboards. **30 seconds.**',
      textVn: 'Một hình chữ nhật dài **8 cm**, rộng **3 cm**. Một con kiến bò hết một vòng quanh mép.\n\nNó bò được bao xa? Viết ra bảng con. **30 giây.**',
    },
  },
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Ruler',
    side: 'left',
    eyebrow: 'The answer is 22 cm, and it was never hard',
    eyebrowVn: 'Đáp án là 22 cm, và nó chưa bao giờ khó',
    title: 'You Can Already Do This',
    titleVn: 'Em Đã Làm Được Rồi',
    ratio: 45,
    inlineSvg: DIAGRAMS.ANT_WALK,
    content:
      'The ant walks 8, then 3, then 8, then 3. That is **22 cm**, and it is finished. The distance all the way around the outside of a shape is the **perimeter**.\n\n' +
      'Adding four numbers is fine for one rectangle. It is slow for forty. A **formula** does the same job every time.',
    contentVn:
      'Con kiến bò 8, rồi 3, rồi 8, rồi 3. Được **22 cm**, và bài đã xong. Khoảng cách đi hết một vòng quanh bên ngoài một hình chính là **chu vi**.\n\n' +
      'Cộng bốn số thì ổn với một hình. Nhưng rất chậm với bốn mươi hình. **Công thức** làm đúng việc đó mọi lần.',
    notes: [
      {
        tone: 'write',
        text:
          '**Perimeter (P):** the distance all the way around the outside of a shape.\n' +
          '**Formula:** a rule connecting quantities, written with letters, with an = sign.\n' +
          '**Perimeter of a rectangle:** $P = 2l + 2w$',
        textVn:
          '**Perimeter — Chu vi (P):** khoảng cách đi hết một vòng quanh bên ngoài một hình.\n' +
          '**Formula — Công thức:** một quy tắc nối các đại lượng, viết bằng chữ cái, và có dấu =.\n' +
          '**Chu vi hình chữ nhật:** $P = 2l + 2w$',
      },
    ],
  },
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'Layers',
    eyebrow: 'Every problem today is these three moves',
    eyebrowVn: 'Mọi bài hôm nay đều là ba bước này',
    title: 'Three Moves, Every Time',
    titleVn: 'Ba Bước, Lần Nào Cũng Vậy',
    ratio: 45,
    inlineSvg: DIAGRAMS.THREE_MOVES,
    content:
      'The middle move is the one that gets skipped, and it is the one that is marked.\n\n' +
      'A student who jumps straight from the formula to the answer has nothing on the page to check, and nothing on the page to get credit for. Write the middle line.',
    contentVn:
      'Bước ở giữa là bước hay bị bỏ qua, và đó lại chính là bước được chấm điểm.\n\n' +
      'Bạn nào nhảy thẳng từ công thức sang đáp án thì trên giấy không có gì để kiểm tra, cũng không có gì để được điểm. Hãy viết dòng ở giữa.',
    notes: [
      {
        tone: 'write',
        text:
          '**1 Write the formula.** $P = 2l + 2w$\n' +
          '**2 Put the numbers in.** P = 2 × 8 + 2 × 3\n' +
          '**3 Work it out.** P = 16 + 6 = 22 cm\n' +
          '**2l means 2 × l.** It is a multiplication, never two things stuck together.',
        textVn:
          '**1 Viết công thức.** $P = 2l + 2w$\n' +
          '**2 Thay số vào.** P = 2 × 8 + 2 × 3\n' +
          '**3 Tính ra kết quả.** P = 16 + 6 = 22 cm\n' +
          '**2l nghĩa là 2 × l.** Đó là phép nhân, không bao giờ là hai thứ dính vào nhau.',
      },
    ],
  },
  {
    layout: 'showcase',
    accent: TEAL,
    icon: 'Ruler',
    eyebrow: 'Station 1 · six rectangles, one formula',
    eyebrowVn: 'Trạm 1 · sáu hình chữ nhật, một công thức',
    title: 'Try Six Rectangles',
    titleVn: 'Thử Sáu Hình Chữ Nhật',
    widget: PerimeterStation,
    caption: 'Problems 2 and 4 have the same answer. Ask the class why before you press.',
    captionVn: 'Bài 2 và bài 4 có cùng đáp án. Hãy hỏi cả lớp vì sao trước khi bấm.',
  },

  // ── Triangles: ask, then tell ─────────────────────────────────────────────
  {
    // QUESTION ONLY. There is not a number anywhere on this slide and there
    // must not be. The class has to say "half" out loud before the ÷ 2 arrives,
    // or the ÷ 2 is just one more rule to forget.
    layout: 'split',
    accent: BLUE,
    icon: 'Triangle',
    side: 'left',
    eyebrow: 'No numbers on this slide',
    eyebrowVn: 'Trang này không có số nào cả',
    title: 'Before We Calculate',
    titleVn: 'Trước Khi Tính',
    ratio: 45,
    inlineSvg: DIAGRAMS.TRIANGLE_IN_RECT,
    content:
      'The triangle sits inside the rectangle. Its base is the whole bottom edge, and its top corner touches the top edge.\n\n' +
      '**How much of the rectangle does the triangle cover?**\n\n' +
      'Talk to the person next to you. Then tell me the fraction — and tell me how you know.',
    contentVn:
      'Hình tam giác nằm gọn trong hình chữ nhật. Đáy của nó là cả cạnh dưới, và đỉnh của nó chạm vào cạnh trên.\n\n' +
      '**Tam giác chiếm bao nhiêu phần của hình chữ nhật?**\n\n' +
      'Hãy trao đổi với bạn bên cạnh. Rồi nói cho thầy phân số đó — và nói vì sao em biết.',
  },
  {
    layout: 'split',
    accent: GREEN,
    icon: 'Triangle',
    eyebrow: 'Half of the rectangle — so halve the answer',
    eyebrowVn: 'Một nửa hình chữ nhật — nên chia đôi kết quả',
    title: 'Area of a Triangle',
    titleVn: 'Diện Tích Hình Tam Giác',
    ratio: 45,
    inlineSvg: DIAGRAMS.TRIANGLE_HEIGHT,
    content:
      'A rectangle with the same base and height has area **b × h**. The triangle covers exactly half of it, so we halve.\n\n' +
      '**h** is the dashed line, not the slant.',
    contentVn:
      'Hình chữ nhật cùng đáy, cùng chiều cao có diện tích **b × h**. Tam giác chiếm đúng một nửa, nên ta chia đôi.\n\n' +
      '**h** là đường nét đứt, không phải cạnh xiên.',
    notes: [
      {
        tone: 'write',
        text:
          '**Area (A):** how much surface a shape covers, measured in cm².\n' +
          '**Base (b):** the side you measure along.\n' +
          '**Height (h):** the straight-up distance from the base to the top corner. The dashed line, never the slanted side.\n' +
          '**Area of a triangle:** A = b × h ÷ 2',
        textVn:
          '**Area — Diện tích (A):** phần bề mặt mà một hình chiếm, đo bằng cm².\n' +
          '**Base — Đáy (b):** cạnh mà em đo dọc theo.\n' +
          '**Height — Chiều cao (h):** khoảng cách thẳng đứng từ đáy lên đỉnh. Là đường nét đứt, không bao giờ là cạnh xiên.\n' +
          '**Diện tích hình tam giác:** A = b × h ÷ 2',
      },
    ],
  },
  {
    layout: 'showcase',
    accent: GREEN,
    icon: 'Triangle',
    eyebrow: 'Station 2 · six triangles, one formula',
    eyebrowVn: 'Trạm 2 · sáu hình tam giác, một công thức',
    title: 'Try Six Triangles',
    titleVn: 'Thử Sáu Hình Tam Giác',
    widget: TriangleStation,
    caption: 'Problem 5 does not come out whole. Half a square centimetre is a real answer.',
    captionVn: 'Bài 5 không ra số nguyên. Nửa xăng-ti-mét vuông vẫn là một đáp án đúng.',
  },

  // ── Temperature: the best question in the task ────────────────────────────
  {
    // QUESTION ONLY, and the slide to protect. 35 °C and 95 °F are the same
    // temperature. Take the show of hands and write the split on the board
    // BEFORE anybody converts anything.
    layout: 'split',
    accent: RED,
    icon: 'Thermometer',
    side: 'left',
    eyebrow: 'Hands up for each. I am counting.',
    eyebrowVn: 'Giơ tay cho từng bên. Thầy đếm đấy.',
    title: 'Two Cities',
    titleVn: 'Hai Thành Phố',
    ratio: 45,
    inlineSvg: DIAGRAMS.TWO_THERMOMETERS,
    content:
      'Today Ha Noi is **35 degrees Celsius**.\n\n' +
      'Mr Bowen\'s cousin lives in Texas. She says it is **95 degrees Fahrenheit** there today.\n\n' +
      '**Which city is hotter?**\n\n' +
      'Hands up for Ha Noi. Hands up for Texas. Hands up if you think you cannot tell yet.',
    contentVn:
      'Hôm nay Hà Nội là **35 độ C**.\n\n' +
      'Chị họ của thầy Bowen sống ở Texas. Chị ấy nói hôm nay ở đó là **95 độ F**.\n\n' +
      '**Thành phố nào nóng hơn?**\n\n' +
      'Giơ tay chọn Hà Nội. Giơ tay chọn Texas. Giơ tay nếu em nghĩ chưa thể biết được.',
  },
  {
    layout: 'split',
    accent: RED,
    icon: 'Thermometer',
    eyebrow: 'They are the same temperature',
    eyebrowVn: 'Hai nơi đó cùng một nhiệt độ',
    title: 'One Temperature, Two Scales',
    titleVn: 'Một Nhiệt Độ, Hai Thang Đo',
    ratio: 45,
    inlineSvg: DIAGRAMS.TEMP_SCALES,
    content:
      'Ha Noi and Texas are exactly as hot as each other. 35 °C **is** 95 °F.\n\n' +
      'Celsius and Fahrenheit are two rulers laid against the same wall. Converting does not change the weather — it reads the other ruler.',
    contentVn:
      'Hà Nội và Texas nóng như nhau y hệt. 35 °C **chính là** 95 °F.\n\n' +
      'Độ C và độ F là hai cái thước đặt lên cùng một bức tường. Đổi đơn vị không làm thời tiết đổi — nó chỉ là đọc cái thước kia.',
    notes: [
      {
        tone: 'write',
        text:
          '**Celsius to Fahrenheit:** F = 1.8 × c + 32\n' +
          '**c** is the Celsius number. **F** is the Fahrenheit number.\n' +
          'Water freezes at 0 °C = 32 °F. Water boils at 100 °C = 212 °F.',
        textVn:
          '**Đổi độ C sang độ F:** F = 1.8 × c + 32\n' +
          '**c** là số độ C. **F** là số độ F.\n' +
          'Nước đóng băng ở 0 °C = 32 °F. Nước sôi ở 100 °C = 212 °F.',
      },
    ],
  },
  {
    layout: 'showcase',
    accent: RED,
    icon: 'Thermometer',
    eyebrow: 'Station 3 · six temperatures, one formula',
    eyebrowVn: 'Trạm 3 · sáu nhiệt độ, một công thức',
    title: 'Try Six Temperatures',
    titleVn: 'Thử Sáu Nhiệt Độ',
    widget: TemperatureStation,
    caption: 'Both thermometers fill to the same height every time. That is the whole idea.',
    captionVn: 'Lần nào hai nhiệt kế cũng dâng lên bằng nhau. Đó chính là ý chính.',
  },

  // ── The storm: a formula they can use on the way home ─────────────────────
  {
    layout: 'split',
    accent: PURPLE,
    icon: 'Zap',
    side: 'left',
    eyebrow: 'You can use this one tonight',
    eyebrowVn: 'Công thức này tối nay em dùng được luôn',
    title: 'How Far Away Is the Storm?',
    titleVn: 'Cơn Giông Cách Bao Xa?',
    ratio: 45,
    inlineSvg: DIAGRAMS.STORM_DISTANCE,
    content:
      'You see the flash at once. Sound is slow: it needs about **3 seconds** to travel one kilometre.\n\n' +
      'So the gap between the flash and the bang tells you how far away the storm is. Count the seconds and divide by three.',
    contentVn:
      'Em thấy tia chớp ngay lập tức. Âm thanh thì chậm: nó cần khoảng **3 giây** để đi được một ki-lô-mét.\n\n' +
      'Vậy khoảng cách giữa chớp và sấm cho biết cơn giông cách bao xa. Đếm số giây rồi chia ba.',
    notes: [
      {
        tone: 'write',
        text:
          '**Distance to a storm:** d = t ÷ 3\n' +
          '**t** is the number of seconds between the flash and the bang. **d** is the distance in kilometres.\n' +
          'Sound needs about 3 seconds to travel 1 km. Light arrives at once.',
        textVn:
          '**Khoảng cách tới cơn giông:** d = t ÷ 3\n' +
          '**t** là số giây giữa chớp và sấm. **d** là khoảng cách (km).\n' +
          'Âm thanh cần khoảng 3 giây để đi 1 km. Ánh sáng tới ngay.',
      },
    ],
  },
  {
    layout: 'showcase',
    accent: PURPLE,
    icon: 'Zap',
    eyebrow: 'Station 4 · six storms, one formula',
    eyebrowVn: 'Trạm 4 · sáu cơn giông, một công thức',
    title: 'Try Six Storms',
    titleVn: 'Thử Sáu Cơn Giông',
    widget: StormStation,
    caption: 'Problem 6 is 6 seconds, after problem 5 was 45. Ask what that means before you press.',
    captionVn: 'Bài 6 là 6 giây, ngay sau bài 5 là 45 giây. Hỏi cả lớp điều đó nghĩa là gì trước khi bấm.',
  },

  // ── Part 2: the letter that is not given ──────────────────────────────────
  {
    // QUESTION ONLY. The answer here is a word — deeper, shallower or the same
    // — and every one of the three is right for some pair of tanks, which is
    // exactly why the station later has one of each.
    layout: 'split',
    accent: TEAL,
    icon: 'Droplets',
    side: 'left',
    eyebrow: 'Part 2 · no numbers on this slide',
    eyebrowVn: 'Phần 2 · trang này không có số nào',
    title: 'The Pour',
    titleVn: 'Đổ Nước',
    ratio: 45,
    inlineSvg: DIAGRAMS.POUR_QUESTION,
    content:
      'All of the water in the left tank is poured into the right tank. Nothing is spilled, and nothing is added.\n\n' +
      'The right tank has a **wider bottom** than the left one.\n\n' +
      '**Will the water end up deeper, shallower, or exactly the same?**\n\n' +
      'Say which. Then say why — that part is the maths.',
    contentVn:
      'Toàn bộ nước ở bể bên trái được đổ sang bể bên phải. Không làm đổ giọt nào, cũng không thêm giọt nào.\n\n' +
      'Bể bên phải có **đáy rộng hơn** bể bên trái.\n\n' +
      '**Nước sẽ sâu hơn, nông hơn, hay đúng như cũ?**\n\n' +
      'Hãy chọn một. Rồi nói vì sao — phần đó mới là toán.',
  },
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Boxes',
    eyebrow: 'Count the cubes and the question answers itself',
    eyebrowVn: 'Đếm số khối là câu hỏi tự có lời giải',
    title: 'Water Is Made of Cubes',
    titleVn: 'Nước Được Xếp Từ Những Khối Lập Phương',
    ratio: 45,
    inlineSvg: DIAGRAMS.WATER_LAYERS,
    content:
      'Think of the water as centimetre cubes. One layer here is 4 across and 3 deep — **12 cubes** — and the water is 3 layers high: **36 cubes**.\n\n' +
      'Pour it, and it is still 36 cubes. That is the only idea in Part 2.',
    contentVn:
      'Hãy hình dung nước là những khối 1 cm. Một lớp ở đây rộng 4, sâu 3 — **12 khối** — và nước cao 3 lớp: **36 khối**.\n\n' +
      'Đổ nước đi, vẫn là 36 khối. Đó là ý duy nhất của Phần 2.',
    notes: [
      {
        tone: 'write',
        text:
          '**Volume (V):** how much space something takes up, measured in cm³.\n' +
          '**Volume of a cuboid:** V = l × w × h\n' +
          'Pouring water into a different tank does not change its volume. The cubes are the same cubes.',
        textVn:
          '**Volume — Thể tích (V):** lượng không gian mà một vật chiếm, đo bằng cm³.\n' +
          '**Thể tích hình hộp chữ nhật:** V = l × w × h\n' +
          'Đổ nước sang bể khác không làm thể tích thay đổi. Vẫn là những khối ấy.',
      },
    ],
  },
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'Equal',
    eyebrow: 'How deep is a division, not a guess',
    eyebrowVn: '"Sâu bao nhiêu" là một phép chia, không phải đoán',
    title: 'Two Questions, Then You Are Done',
    titleVn: 'Hai Câu Hỏi, Rồi Là Xong',
    ratio: 45,
    inlineSvg: DIAGRAMS.POUR_TWO_STEPS,
    content:
      'The new tank has a base of 6 cm by 3 cm, so **one layer holds 18 cubes**.\n\n' +
      '36 cubes ÷ 18 in a layer = 2 layers, and 2 layers of centimetre cubes is **2 cm deep**.',
    contentVn:
      'Bể mới có đáy 6 cm nhân 3 cm, nên **một lớp chứa được 18 khối**.\n\n' +
      '36 khối ÷ 18 mỗi lớp = 2 lớp, và 2 lớp khối 1 cm nghĩa là nước **sâu 2 cm**.',
    notes: [
      {
        tone: 'write',
        text:
          '**To find the new depth:**\n' +
          '**1** How many cubes of water? V = l × w × h\n' +
          '**2** How many cubes in one layer of the new tank? l × w\n' +
          '**3** Divide: cubes altogether ÷ cubes in a layer = depth in cm.',
        textVn:
          '**Để tìm độ sâu mới:**\n' +
          '**1** Có bao nhiêu khối nước? V = l × w × h\n' +
          '**2** Một lớp bể mới chứa bao nhiêu khối? l × w\n' +
          '**3** Chia: tổng số khối ÷ số khối một lớp = độ sâu (cm).',
      },
    ],
  },
  {
    layout: 'showcase',
    accent: TEAL,
    icon: 'Droplets',
    eyebrow: 'Station 5 · five pours',
    eyebrowVn: 'Trạm 5 · năm lần đổ nước',
    title: 'Pour It Five Times',
    titleVn: 'Đổ Nước Năm Lần',
    widget: PourWidget,
    caption: 'Ask for deeper, shallower or the same BEFORE each one. Problem 3 is the one that catches people.',
    captionVn: 'Trước mỗi bài, hãy hỏi: sâu hơn, nông hơn hay như cũ? Bài 3 là bài dễ nhầm nhất.',
  },

  // ── Recap ─────────────────────────────────────────────────────────────────
  {
    layout: 'stack',
    variant: 'checklist',
    accent: GREEN,
    icon: 'CheckCircle2',
    title: 'What You Now Own',
    titleVn: 'Những Gì Em Đã Có',
    columns: 2,
    content:
      'Your notebook should now have **seven orange panels**. Count them.',
    contentVn:
      'Vở của em bây giờ phải có **bảy khung màu cam**. Hãy đếm lại.',
    items: [
      { text: 'Write the formula · put the numbers in · work it out. Always three lines.', textVn: 'Viết công thức · thay số vào · tính ra kết quả. Luôn luôn ba dòng.' },
      { text: '**2l means 2 × l** — a multiplication, never two things stuck together.', textVn: '**2l nghĩa là 2 × l** — một phép nhân, không bao giờ là hai thứ dính vào nhau.' },
      { text: 'Perimeter $P = 2l + 2w$, in cm. Area of a triangle A = b × h ÷ 2, in cm².', textVn: 'Chu vi $P = 2l + 2w$, đơn vị cm. Diện tích tam giác A = b × h ÷ 2, đơn vị cm².' },
      { text: 'The height of a triangle goes **straight up**. It is never the slanted side.', textVn: 'Chiều cao tam giác là đường **thẳng đứng**. Không bao giờ là cạnh xiên.' },
      { text: 'F = 1.8 × c + 32 converts Celsius to Fahrenheit. Same heat, different ruler.', textVn: 'F = 1.8 × c + 32 đổi độ C sang độ F. Cùng độ nóng, khác cái thước.' },
      { text: 'd = t ÷ 3 gives the distance to a storm in km, from the seconds you counted.', textVn: 'd = t ÷ 3 cho khoảng cách tới cơn giông (km), từ số giây em đếm được.' },
      { text: 'Volume of a cuboid V = l × w × h, in cm³. Pouring never changes it.', textVn: 'Thể tích hình hộp chữ nhật V = l × w × h, đơn vị cm³. Đổ đi đổ lại không làm nó đổi.' },
      { text: 'New depth = cubes altogether ÷ cubes in one layer of the new tank.', textVn: 'Độ sâu mới = tổng số khối ÷ số khối trong một lớp của bể mới.' },
    ],
  },
  {
    layout: 'hero',
    color: GREEN,
    icon: 'Target',
    brand: 'Year 7 Mathematics',
    brandVn: 'Toán Lớp 7',
    // No subtitle. In project mode at 1366×768 this hero is the tightest slide
    // in the deck, and the closing line reads just as well in the eyebrow.
    eyebrow: 'Task 1 · the formula never changed, only the numbers',
    eyebrowVn: 'Nhiệm vụ 1 · công thức không đổi, chỉ các con số đổi',
    title: 'One Machine, Five Jobs',
    titleVn: 'Một Cỗ Máy, Năm Công Việc',
    card: {
      icon: 'Pencil',
      badge: 'Exit Question',
      badgeVn: 'Câu hỏi ra về',
      text: 'A tank 5 cm by 4 cm holds water **4 cm** deep. Pour it into a tank with base 8 cm by 5 cm. How deep is it now? Show both lines.',
      textVn: 'Một bể 5 cm nhân 4 cm chứa nước sâu **4 cm**. Đổ sang bể có đáy 8 cm nhân 5 cm. Nước sâu bao nhiêu? Trình bày hai dòng.',
    },
  },
]
