// content/y7-science/U02_2b/slides.js
// Year 7 Science · 2.2b Measuring, and heating water. Monday 14 September 2026.
//
// The second half of Learner's Book section 2.2: pages 37-40. 2.2a (U02_2a) is
// pages 35-36 (the five change words) and is taught first — this deck uses those
// words at the end, when the water it heats reaches its boiling point and stops
// getting hotter.
//
// THIS LESSON IS A SKILL, not a set of facts: measure a volume accurately (read
// the bottom of the meniscus, eye level) and a temperature accurately (read the
// top of the liquid, eye level), then run a real investigation — heat water,
// record the temperature every minute, plot it, and discover that the
// temperature climbs and then STOPS at the boiling point. That last fact is the
// payoff, and it is asked as a prediction before it is shown.
//
// THE ENGLISH BEATS: "accurate" and "eye level" (the whole reason two people get
// different numbers), the graph words "axis / horizontal / vertical", and the
// sentence frames on p.40 for describing a graph — comparative English ("the
// longer we heated, the higher the temperature"), which is exactly what this
// class needs practice saying.
//
// THE COPY-DOWN PLAN. Five written items and two drawn:
//   · measuring cylinder + meniscus + how to read it
//   · thermometer + how to read it
//   · axis (and horizontal / vertical)
//   · the safety rules
//   · the finding: the temperature stops rising at the boiling point
//   · the apparatus, drawn and labelled      — Draw This
//   · the results table, ruled up            — Draw This
//
// Source: Learner's Book Unit 2.2, pages 37-40. Questions 1-2, the "Think like a
// scientist" method and its questions, and the Summary checklist are the book's
// own; the readings in the two question figures are chosen to be unambiguous.
// Every figure is redrawn in diagrams.js — no Learner's Book scans are used.
import { DIAGRAMS } from './diagrams.js'

const TEAL = '#0087a8'
const PURPLE = '#5c2483'
const ORANGE = '#c25e12'
const RED = '#c8102e'

export const slides = [
  // ── Section 1: why accuracy matters, and measuring volume ────────────────
  {
    layout: 'hero',
    color: TEAL,
    icon: 'Ruler',
    brand: 'Year 7 Science',
    brandVn: 'Khoa học Lớp 7',
    brandFr: 'Sciences 7e année',
    eyebrow: '2.2 Changes of state · part 2 of 2',
    eyebrowVn: '2.2 Sự chuyển thể · phần 2 trong 2',
    eyebrowFr: '2.2 Changements d’état · partie 2 sur 2',
    date: '14 Sep 2026',
    title: 'Measuring',
    titleVn: 'Đo lường',
    titleFr: 'Mesurer',
    card: {
      icon: 'Pencil',
      badge: 'Starter Task',
      badgeVn: 'Nhiệm vụ khởi động',
      badgeFr: 'Pour commencer',
      text: 'Write a **guess** for each temperature, in degrees C: a **cold drink**, a **warm bath**, and **boiling water**. Three numbers. We will check them later.',
      textVn: 'Viết một **con số dự đoán** cho mỗi nhiệt độ, theo độ C: một **ly nước lạnh**, một **bồn tắm ấm**, và **nước đang sôi**. Ba con số. Lát nữa ta sẽ kiểm tra.',
      textFr: 'Écris une **estimation** pour chaque température, en degrés C : une **boisson froide**, un **bain chaud** et de l’**eau bouillante**. Trois nombres. On vérifiera plus tard.',
    },
  },
  {
    layout: 'statement',
    accent: PURPLE,
    icon: 'HelpCircle',
    eyebrow: 'In pairs — one minute',
    eyebrowVn: 'Theo cặp — một phút',
    eyebrowFr: 'En binôme — une minute',
    title: 'Same Water, Two Answers',
    titleVn: 'Cùng một lượng nước, hai đáp án',
    titleFr: 'Même eau, deux réponses',
    text: 'Two students measure the **same** water. One writes **50**, the other writes **47**.',
    textVn: 'Hai học sinh đo **cùng** một lượng nước. Một bạn viết **50**, bạn kia viết **47**.',
    textFr: 'Deux élèves mesurent la **même** eau. L’un écrit **50**, l’autre écrit **47**.',
    sub: 'They cannot both be right. What did one of them do wrong?',
    subVn: 'Không thể cả hai đều đúng. Một trong hai bạn đã làm sai điều gì?',
    subFr: 'Ils ne peuvent pas avoir raison tous les deux. Quelle erreur l’un d’eux a-t-il faite ?',
  },
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Beaker',
    eyebrow: 'Learner’s Book, page 37 · Measuring volume',
    eyebrowVn: 'Sách học sinh, trang 37 · Đo thể tích',
    eyebrowFr: 'Manuel, page 37 · Mesurer un volume',
    title: 'Reading a Measuring Cylinder',
    titleVn: 'Đọc một ống đong',
    titleFr: 'Lire une éprouvette graduée',
    ratio: 52,
    side: 'left',
    inlineSvg: DIAGRAMS.MENISCUS,
    content:
      'You measure the **volume** of a liquid with a **measuring cylinder**. The surface of the liquid curves up at the edges — that curve is the **meniscus**.\n\n' +
      'Read from the **bottom** of the curve, with your **eye level** with it. Look from above and you read too high; from below, too low.',
    contentVn:
      'Em đo **thể tích (volume)** của chất lỏng bằng một **ống đong (measuring cylinder)**. Mặt chất lỏng cong lên ở mép — đường cong đó là **mặt khum (meniscus)**.\n\n' +
      'Đọc ở **đáy** của đường cong, với **mắt ngang tầm (eye level)** với nó. Nhìn từ trên xuống thì đọc quá cao; nhìn từ dưới lên thì quá thấp.',
    contentFr:
      'On mesure le **volume** d’un liquide avec une **éprouvette graduée**. Au bord, le liquide remonte : c’est le **ménisque (meniscus)**.\n\n' +
      'Lis au **bas** de la courbe, à **hauteur des yeux (eye level)**. D’en haut, tu lis trop haut ; d’en bas, trop bas.',
    notes: [
      {
        tone: 'write',
        text: '**Measuring cylinder:** the tool used to measure the volume of a liquid.\n**Meniscus:** the curved surface of the liquid. Read the **bottom** of it, with your **eye level**.',
        textVn: '**Ống đong (measuring cylinder):** dụng cụ để đo thể tích chất lỏng.\n**Mặt khum (meniscus):** mặt cong của chất lỏng. Đọc ở **đáy** của nó, với **mắt ngang tầm**.',
        textFr: '**Éprouvette graduée (measuring cylinder) :** mesure le volume d’un liquide.\n**Ménisque (meniscus) :** surface courbe du liquide. Lis le **bas**, à **hauteur des yeux**.',
      },
    ],
  },
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'HelpCircle',
    eyebrow: 'Learner’s Book, page 37 · Question 1',
    eyebrowVn: 'Sách học sinh, trang 37 · Câu hỏi 1',
    eyebrowFr: 'Manuel de l’élève, page 37 · Question 1',
    title: 'What Volume Is in Each One?',
    titleVn: 'Mỗi ống chứa thể tích bao nhiêu?',
    titleFr: 'Quel volume dans chacune ?',
    ratio: 56,
    inlineSvg: DIAGRAMS.CYLINDERS_Q1,
    content:
      'Read each cylinder the way you just learned: **eye level**, at the **bottom of the meniscus**. Each small line is **10 cm³**.\n\n' +
      'Write your three answers in your notebook, with the units — **cm³** — every time.',
    contentVn:
      'Đọc mỗi ống theo cách em vừa học: **mắt ngang tầm**, ở **đáy mặt khum**. Mỗi vạch nhỏ là **10 cm³**.\n\n' +
      'Viết ba đáp án vào vở, kèm đơn vị — **cm³** — mỗi lần.',
    contentFr:
      'Lis chaque éprouvette comme tu viens de l’apprendre : **yeux à la même hauteur**, au **bas du ménisque**. Chaque petit trait vaut **10 cm³**.\n\n' +
      'Écris tes trois réponses dans ton cahier, avec l’unité — **cm³** — à chaque fois.',
    reveal: {
      label: 'Check',
      labelVn: 'Kiểm tra',
      labelFr: 'Vérifie',
      answer: '**A** = 20 cm³\n**B** = 60 cm³\n**C** = 90 cm³',
      answerVn: '**A** = 20 cm³\n**B** = 60 cm³\n**C** = 90 cm³',
      answerFr: '**A** = 20 cm³\n**B** = 60 cm³\n**C** = 90 cm³',
    },
  },

  // ── Section 2: measuring temperature ─────────────────────────────────────
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Thermometer',
    eyebrow: 'Learner’s Book, page 37 · Measuring temperature',
    eyebrowVn: 'Sách học sinh, trang 37 · Đo nhiệt độ',
    eyebrowFr: 'Manuel de l’élève, page 37 · Mesurer une température',
    title: 'Reading a Thermometer',
    titleVn: 'Đọc một nhiệt kế',
    titleFr: 'Lire un thermomètre',
    ratio: 52,
    side: 'left',
    inlineSvg: DIAGRAMS.THERMOMETER,
    content:
      'You measure **temperature** with a **thermometer**. The liquid inside **expands** — gets bigger — as it gets hotter, so it rises up the tube.\n\n' +
      'Read the scale at the **top of the liquid**, with your **eye level** with it — the same rule as the cylinder.',
    contentVn:
      'Em đo **nhiệt độ (temperature)** bằng một **nhiệt kế (thermometer)**. Chất lỏng bên trong **giãn nở (expands)** — to ra — khi nóng lên, nên nó dâng lên trong ống.\n\n' +
      'Đọc thang đo ở **đỉnh của cột chất lỏng**, với **mắt ngang tầm** với nó — cùng quy tắc như ống đong.',
    contentFr:
      'On mesure la **température** avec un **thermomètre**. Le liquide à l’intérieur se **dilate (expands)** — il grossit — quand il chauffe, donc il monte dans le tube.\n\n' +
      'Lis l’échelle au **sommet du liquide**, les **yeux à la même hauteur** — la même règle que pour l’éprouvette.',
    notes: [
      {
        tone: 'write',
        text: '**Thermometer:** the tool used to measure temperature. The liquid inside **expands** and rises as it gets hotter. Read the **top of the liquid**, at **eye level**.',
        textVn: '**Nhiệt kế (thermometer):** dụng cụ để đo nhiệt độ. Chất lỏng bên trong **giãn nở** và dâng lên khi nóng hơn. Đọc ở **đỉnh cột chất lỏng**, **ngang tầm mắt**.',
        textFr: '**Thermomètre (thermometer) :** l’outil pour mesurer la température. Le liquide à l’intérieur se **dilate** et monte quand il chauffe. Lis au **sommet du liquide**, les **yeux à la même hauteur**.',
      },
    ],
  },
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'HelpCircle',
    eyebrow: 'Learner’s Book, page 38 · Question 2',
    eyebrowVn: 'Sách học sinh, trang 38 · Câu hỏi 2',
    eyebrowFr: 'Manuel de l’élève, page 38 · Question 2',
    title: 'What Temperature Does Each Show?',
    titleVn: 'Mỗi nhiệt kế chỉ bao nhiêu độ?',
    titleFr: 'Quelle température indique chacun ?',
    ratio: 56,
    inlineSvg: DIAGRAMS.THERMOMETERS_Q2,
    content:
      'Read each thermometer at the **top of the liquid**. Write your answers with the units — **degrees C** — every time.',
    contentVn:
      'Đọc mỗi nhiệt kế ở **đỉnh cột chất lỏng**. Viết đáp án kèm đơn vị — **độ C** — mỗi lần.',
    contentFr:
      'Lis chaque thermomètre au **sommet du liquide**. Écris tes réponses avec l’unité — **degrés C** — à chaque fois.',
    reveal: {
      label: 'Check',
      labelVn: 'Kiểm tra',
      labelFr: 'Vérifie',
      answer: '**A** = 25 degrees C\n**B** = 15 degrees C\n**C** = 40 degrees C',
      answerVn: '**A** = 25 độ C\n**B** = 15 độ C\n**C** = 40 độ C',
      answerFr: '**A** = 25 degrés C\n**B** = 15 degrés C\n**C** = 40 degrés C',
    },
  },

  // ── Section 3: the investigation — predict, do, plot, explain ─────────────
  {
    layout: 'statement',
    accent: PURPLE,
    icon: 'HelpCircle',
    eyebrow: 'Predict — write it down before we start',
    eyebrowVn: 'Dự đoán — viết ra trước khi bắt đầu',
    eyebrowFr: 'Prédis — écris-le avant de commencer',
    title: 'Does It Get Hotter Forever?',
    titleVn: 'Nước có nóng lên mãi không?',
    titleFr: 'L’eau chauffe-t-elle sans fin ?',
    text: 'We are going to heat water and read the temperature **every minute** until it boils.',
    textVn: 'Chúng ta sẽ đun nước và đọc nhiệt độ **mỗi phút** cho đến khi nó sôi.',
    textFr: 'On va chauffer de l’eau et lire la température **chaque minute** jusqu’à ce qu’elle bouille.',
    sub: 'Predict: does the temperature keep going up and up, or does something happen when it boils? Write your prediction now.',
    subVn: 'Dự đoán: nhiệt độ cứ tăng mãi, hay có điều gì xảy ra khi nước sôi? Hãy viết dự đoán của em ngay bây giờ.',
    subFr: 'Prédis : la température monte-t-elle sans arrêt, ou se passe-t-il quelque chose quand l’eau bout ? Écris ta prédiction maintenant.',
  },
  {
    layout: 'callout',
    accent: RED,
    icon: 'AlertTriangle',
    eyebrow: 'Learner’s Book, page 38 · Before you start',
    eyebrowVn: 'Sách học sinh, trang 38 · Trước khi bắt đầu',
    eyebrowFr: 'Manuel de l’élève, page 38 · Avant de commencer',
    title: 'Safety First',
    titleVn: 'An toàn trước tiên',
    titleFr: 'La sécurité d’abord',
    content:
      'Hot water burns. Before anyone lights a Bunsen burner, we agree the rules — and you copy them down.',
    contentVn:
      'Nước nóng gây bỏng. Trước khi ai đó châm đèn Bunsen, cả lớp thống nhất các quy tắc — và em chép lại.',
    contentFr:
      'L’eau chaude brûle. Avant d’allumer un bec Bunsen, on se met d’accord sur les règles — et tu les recopies.',
    notes: [
      {
        tone: 'homework',
        badge: 'Safety',
        badgeVn: 'An toàn',
        badgeFr: 'Sécurité',
        icon: 'AlertTriangle',
        text: 'Wear **safety spectacles**. **Stand up** while you work, so spilled hot water falls away from you, not onto you. **Take care** with the hot beaker and the Bunsen flame.',
        textVn: 'Đeo **kính bảo hộ**. **Đứng lên** khi làm, để nước nóng nếu đổ thì rơi ra xa người em, không phải vào người. **Cẩn thận** với cốc nóng và ngọn lửa đèn Bunsen.',
        textFr: 'Porte des **lunettes de protection**. **Reste debout** pendant le travail : l’eau chaude renversée tombe loin de toi, pas sur toi. **Fais attention** au bécher chaud et à la flamme du Bunsen.',
      },
    ],
  },
  {
    layout: 'showcase',
    accent: PURPLE,
    icon: 'FlaskConical',
    eyebrow: 'Rulers out — draw it as you set it up',
    eyebrowVn: 'Lấy thước ra — vẽ trong lúc em lắp đặt',
    eyebrowFr: 'Sors ta règle — dessine pendant le montage',
    title: 'The Apparatus',
    titleVn: 'Bộ dụng cụ',
    titleFr: 'Le montage',
    inlineSvg: DIAGRAMS.APPARATUS,
    drawThis: true,
    caption: 'Draw the whole set-up and label every part. The one thing that matters: the thermometer bulb sits IN the water, not touching the bottom of the beaker — so it measures the water, not the glass.',
    captionVn: 'Vẽ toàn bộ bộ dụng cụ và ghi nhãn từng bộ phận. Điều quan trọng nhất: bầu nhiệt kế nằm TRONG nước, không chạm đáy cốc — để nó đo nhiệt độ của nước, chứ không phải của thủy tinh.',
    captionFr: 'Dessine tout le montage et légende chaque partie. Le point essentiel : le réservoir du thermomètre est DANS l’eau, sans toucher le fond du bécher — pour mesurer l’eau, pas le verre.',
  },
  {
    layout: 'steps',
    accent: PURPLE,
    icon: 'FlaskConical',
    eyebrow: 'Learner’s Book, page 39 · The method',
    eyebrowVn: 'Sách học sinh, trang 39 · Cách tiến hành',
    eyebrowFr: 'Manuel de l’élève, page 39 · La méthode',
    title: 'What to Do',
    titleVn: 'Các bước tiến hành',
    titleFr: 'Ce qu’il faut faire',
    steps: [
      { text: 'Measure **150 cm³** of water accurately into the beaker.', textVn: 'Đong chính xác **150 cm³** nước vào cốc.', textFr: 'Mesure avec précision **150 cm³** d’eau dans le bécher.' },
      { text: 'Put the thermometer bulb **in the water**, held so it does **not touch the bottom**.', textVn: 'Đặt bầu nhiệt kế **trong nước**, giữ sao cho nó **không chạm đáy**.', textFr: 'Place le réservoir du thermomètre **dans l’eau**, tenu pour qu’il **ne touche pas le fond**.' },
      { text: 'Read the temperature and **record it** in your table at 0 minutes.', textVn: 'Đọc nhiệt độ và **ghi vào bảng** ở phút 0.', textFr: 'Lis la température et **note-la** dans ton tableau à 0 minute.' },
      { text: 'Light the Bunsen and heat the water. Read the temperature **every minute**.', textVn: 'Châm đèn Bunsen và đun nước. Đọc nhiệt độ **mỗi phút**.', textFr: 'Allume le Bunsen et chauffe l’eau. Lis la température **chaque minute**.' },
      { text: 'Keep going until the water is **boiling** hard.', textVn: 'Tiếp tục cho đến khi nước **sôi** mạnh.', textFr: 'Continue jusqu’à ce que l’eau **bouille** fort.' },
    ],
  },
  {
    layout: 'showcase',
    accent: ORANGE,
    icon: 'Grid3x3',
    eyebrow: 'Copy this before you light the Bunsen',
    eyebrowVn: 'Chép bảng này trước khi châm đèn Bunsen',
    eyebrowFr: 'Recopie-le avant d’allumer le Bunsen',
    title: 'Your Results Table',
    titleVn: 'Bảng kết quả của em',
    titleFr: 'Ton tableau de résultats',
    inlineSvg: DIAGRAMS.RESULTS_TABLE,
    drawThis: true,
    caption: 'Rule up this table so you are ready to write a number the moment you read one. Add more rows — you keep going until the water boils.',
    captionVn: 'Kẻ sẵn bảng này để em sẵn sàng ghi số ngay khi đọc được. Thêm nhiều dòng nữa — em tiếp tục cho đến khi nước sôi.',
    captionFr: 'Trace ce tableau pour noter chaque nombre dès que tu le lis. Ajoute des lignes — tu continues jusqu’à ce que l’eau bouille.',
  },
  {
    layout: 'split',
    accent: ORANGE,
    icon: 'Grid3x3',
    eyebrow: 'Learner’s Book, page 40 · Plot a graph',
    eyebrowVn: 'Sách học sinh, trang 40 · Vẽ đồ thị',
    eyebrowFr: 'Manuel de l’élève, page 40 · Tracer un graphique',
    title: 'Turn the Table Into a Graph',
    titleVn: 'Biến bảng số thành đồ thị',
    titleFr: 'Du tableau au graphique',
    ratio: 56,
    content:
      'A graph shows the numbers as a picture. It has two lines called **axes** (say *AK-sees*).\n\n' +
      'Put **time** along the **horizontal** axis (the one that goes across) and **temperature** up the **vertical** axis (the one that goes up). Mark each reading with a dot, then join the dots.',
    contentVn:
      'Đồ thị cho thấy các con số dưới dạng hình ảnh. Nó có hai đường gọi là **trục (axes)**.\n\n' +
      'Đặt **thời gian** dọc theo **trục nằm ngang (horizontal)** (đường đi ngang) và **nhiệt độ** theo **trục thẳng đứng (vertical)** (đường đi lên). Đánh dấu mỗi số đọc bằng một chấm, rồi nối các chấm lại.',
    contentFr:
      'Un graphique montre les nombres en image. Il a deux lignes appelées **axes**.\n\n' +
      'Mets le **temps** sur l’axe **horizontal** (celui qui va en travers) et la **température** sur l’axe **vertical** (celui qui monte). Marque chaque mesure d’un point, puis relie les points.',
    notes: [
      {
        tone: 'write',
        text: '**Axis:** a line on a graph. **Time** goes on the **horizontal** axis (across); **temperature** goes on the **vertical** axis (up).',
        textVn: '**Trục (axis):** một đường trên đồ thị. **Thời gian** nằm trên **trục ngang (horizontal)**; **nhiệt độ** nằm trên **trục dọc (vertical)**.',
        textFr: '**Axe (axis) :** une ligne sur un graphique. Le **temps** va sur l’axe **horizontal** ; la **température** va sur l’axe **vertical**.',
      },
    ],
  },
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Zap',
    eyebrow: 'The answer to your prediction',
    eyebrowVn: 'Đáp án cho dự đoán của em',
    eyebrowFr: 'La réponse à ta prédiction',
    title: 'It Stops at the Boiling Point',
    titleVn: 'Nó dừng lại ở nhiệt độ sôi',
    titleFr: 'Elle s’arrête au point d’ébullition',
    ratio: 56,
    side: 'left',
    inlineSvg: DIAGRAMS.HEATING_CURVE,
    content:
      'At first the temperature climbs steadily — about the same amount each minute. Then it reaches **100 degrees C**, the **boiling point** of water, and it **stops rising**, even though the Bunsen is still on.\n\n' +
      'The heat is now being used to turn the liquid into gas, not to make it hotter. That is why the line goes flat.',
    contentVn:
      'Lúc đầu nhiệt độ tăng đều — mỗi phút tăng khoảng như nhau. Rồi nó đạt **100 độ C**, **nhiệt độ sôi** của nước, và nó **ngừng tăng**, dù đèn Bunsen vẫn đang cháy.\n\n' +
      'Bây giờ nhiệt được dùng để biến chất lỏng thành khí, chứ không phải để làm nó nóng hơn. Đó là lý do đường đồ thị đi ngang.',
    contentFr:
      'D’abord, la température monte régulièrement — à peu près autant chaque minute. Puis elle atteint **100 degrés C**, le **point d’ébullition** de l’eau, et elle **cesse de monter**, même si le Bunsen est toujours allumé.\n\n' +
      'La chaleur sert maintenant à changer le liquide en gaz, pas à le chauffer. C’est pour ça que la courbe devient plate.',
    notes: [
      {
        tone: 'write',
        text: 'While water **boils**, its temperature **stays the same** at the boiling point (100 degrees C). The heat changes the liquid into gas instead of raising the temperature.',
        textVn: 'Trong khi nước **sôi**, nhiệt độ của nó **giữ nguyên** ở nhiệt độ sôi (100 độ C). Nhiệt biến chất lỏng thành khí thay vì làm tăng nhiệt độ.',
        textFr: 'Pendant que l’eau **bout**, sa température **reste la même** au point d’ébullition (100 degrés C). La chaleur change le liquide en gaz au lieu d’augmenter la température.',
      },
    ],
  },
  {
    layout: 'split',
    accent: PURPLE,
    icon: 'MessageSquare',
    eyebrow: 'Learner’s Book, page 40 · Describe your graph',
    eyebrowVn: 'Sách học sinh, trang 40 · Mô tả đồ thị của em',
    eyebrowFr: 'Manuel, page 40 · Décris ton graphique',
    title: 'Finish the Sentences',
    titleVn: 'Hoàn thành các câu',
    titleFr: 'Complète les phrases',
    ratio: 56,
    content:
      'Describe your graph out loud, in full sentences. Fill each gap:\n\n' +
      '> When we heated the water, the temperature ______.\n' +
      '> The longer we heated it, the ______ the temperature became.\n' +
      '> When the water started to boil, the temperature ______.',
    contentVn:
      'Mô tả đồ thị của em thành lời, bằng câu đầy đủ. Điền vào mỗi chỗ trống:\n\n' +
      '> When we heated the water, the temperature ______.\n' +
      '> The longer we heated it, the ______ the temperature became.\n' +
      '> When the water started to boil, the temperature ______.',
    contentFr:
      'Décris ton graphique à l’oral, en phrases. Remplis les trous :\n\n' +
      '> When we heated the water, the temperature ______.\n' +
      '> The longer we heated it, the ______ the temperature became.\n' +
      '> When the water started to boil, the temperature ______.',
    reveal: {
      label: 'Example answers',
      labelVn: 'Câu trả lời mẫu',
      labelFr: 'Réponses types',
      answer:
        'When we heated the water, the temperature **went up (rose)**.\nThe longer we heated it, the **higher** the temperature became.\nWhen the water started to boil, the temperature **stayed the same**.',
      answerVn:
        'When we heated the water, the temperature **went up (rose)** — nhiệt độ tăng lên.\nThe longer we heated it, the **higher** the temperature became — càng đun lâu, nhiệt độ càng cao.\nWhen the water started to boil, the temperature **stayed the same** — khi nước bắt đầu sôi, nhiệt độ giữ nguyên.',
      answerFr:
        'When we heated the water, the temperature **went up (rose)**.\nThe longer we heated it, the **higher** the temperature became.\nWhen the water started to boil, the temperature **stayed the same**.',
    },
  },
  {
    layout: 'split',
    accent: TEAL,
    icon: 'HelpCircle',
    eyebrow: 'Learner’s Book, page 40 · Questions 3 to 5',
    eyebrowVn: 'Sách học sinh, trang 40 · Câu hỏi 3 đến 5',
    eyebrowFr: 'Manuel de l’élève, page 40 · Questions 3 à 5',
    title: 'Explain What You Saw',
    titleVn: 'Giải thích điều em đã thấy',
    titleFr: 'Explique ce que tu as vu',
    ratio: 56,
    content:
      '> **3.** What happened to the temperature when the water was boiling?\n' +
      '> **4.** Why do you think this happened?\n' +
      '> **5.** The thermometer is held so it does not rest on the bottom of the beaker. Why?',
    contentVn:
      '> **3.** Điều gì xảy ra với nhiệt độ khi nước đang sôi?\n' +
      '> **4.** Vì sao em nghĩ điều đó xảy ra?\n' +
      '> **5.** Nhiệt kế được giữ sao cho không chạm đáy cốc. Vì sao?',
    contentFr:
      '> **3.** Qu’est-il arrivé à la température quand l’eau bouillait ?\n' +
      '> **4.** Pourquoi, à ton avis ?\n' +
      '> **5.** On tient le thermomètre pour qu’il ne repose pas au fond du bécher. Pourquoi ?',
    reveal: {
      label: 'Check',
      labelVn: 'Kiểm tra',
      labelFr: 'Vérifie',
      answer:
        '**3.** It stopped rising and stayed the same, at about 100 degrees C.\n**4.** The heat was being used to turn the water into a gas (steam), not to make it hotter.\n**5.** So it measures the temperature of the **water**, not the hotter glass at the bottom of the beaker.',
      answerVn:
        '**3.** Nó ngừng tăng và giữ nguyên, ở khoảng 100 độ C.\n**4.** Nhiệt được dùng để biến nước thành khí (hơi), chứ không phải làm nó nóng hơn.\n**5.** Để nó đo nhiệt độ của **nước**, chứ không phải của lớp thủy tinh nóng hơn ở đáy cốc.',
      answerFr:
        '**3.** Elle a cessé de monter et est restée la même, vers 100 degrés C.\n**4.** La chaleur servait à changer l’eau en gaz (vapeur), pas à la chauffer.\n**5.** Pour mesurer la température de l’**eau**, pas celle du verre plus chaud au fond du bécher.',
    },
  },

  // ── Section 4: recap and homework ────────────────────────────────────────
  {
    layout: 'stack',
    variant: 'checklist',
    accent: TEAL,
    icon: 'CheckCircle2',
    columns: 2,
    eyebrow: 'Learner’s Book, page 40 · Summary checklist',
    eyebrowVn: 'Sách học sinh, trang 40 · Bảng tự đánh giá',
    eyebrowFr: 'Manuel de l’élève, page 40 · Bilan',
    title: 'Can You Do All Four?',
    titleVn: 'Em làm được cả bốn điều này chứ?',
    titleFr: 'Sais-tu faire les quatre ?',
    content:
      '> Your notebook should now have **the meniscus and thermometer notes**, **the word axis**, **the safety rules**, **one labelled apparatus drawing**, and **one results table**. Check.',
    contentVn:
      '> Trong vở của em bây giờ phải có **ghi chú về mặt khum và nhiệt kế**, **từ trục (axis)**, **các quy tắc an toàn**, **một hình bộ dụng cụ có ghi nhãn**, và **một bảng kết quả**. Hãy kiểm tra.',
    contentFr:
      '> Ton cahier doit maintenant avoir **les notes sur le ménisque et le thermomètre**, **le mot axe (axis)**, **les règles de sécurité**, **un dessin du montage légendé** et **un tableau de résultats**. Vérifie.',
    items: [
      { text: 'Name the **three states of matter**.', textVn: 'Kể tên **ba trạng thái của vật chất**.', textFr: 'Nomme les **trois états de la matière**.' },
      { text: 'Use the correct words for water changing from **solid to liquid to gas**.', textVn: 'Dùng đúng các từ cho nước chuyển từ **rắn sang lỏng sang khí**.', textFr: 'Utilise les bons mots pour l’eau qui passe de **solide à liquide à gaz**.' },
      { text: 'Use a **thermometer** and a **measuring cylinder** accurately.', textVn: 'Dùng **nhiệt kế** và **ống đong** một cách chính xác.', textFr: 'Utilise un **thermomètre** et une **éprouvette graduée** avec précision.' },
      { text: 'Carry out an **investigation safely**.', textVn: 'Tiến hành một **thí nghiệm an toàn**.', textFr: 'Mène une **expérience en sécurité**.' },
    ],
  },
  {
    layout: 'callout',
    accent: RED,
    icon: 'Home',
    eyebrow: 'Homework Assignment',
    eyebrowVn: 'Bài tập về nhà',
    eyebrowFr: 'Devoirs',
    title: 'For Next Lesson',
    titleVn: 'Cho tiết học sau',
    titleFr: 'Prochain cours',
    content: 'Take your science notebook home. Both tasks are short.',
    contentVn: 'Hãy mang vở khoa học về nhà. Cả hai nhiệm vụ đều ngắn.',
    contentFr: 'Prends ton cahier de sciences. Deux tâches courtes.',
    notes: [
      {
        tone: 'homework',
        badge: 'Practice reading scales',
        badgeVn: 'Luyện đọc thang đo',
        badgeFr: 'Lire une échelle',
        icon: 'Pencil',
        text: 'Draw a **measuring cylinder** showing **35 cm³**, and a **thermometer** showing **28 degrees C**. Mark clearly where you read each one.',
        textVn: 'Vẽ một **ống đong** chỉ **35 cm³**, và một **nhiệt kế** chỉ **28 độ C**. Đánh dấu rõ chỗ em đọc số ở mỗi hình.',
        textFr: 'Dessine une **éprouvette graduée** à **35 cm³** et un **thermomètre** à **28 degrés C**. Marque bien où tu lis chacun.',
      },
      {
        tone: 'homework',
        badge: 'Finish the write-up',
        badgeVn: 'Hoàn thành bài viết',
        badgeFr: 'Finir le rapport',
        icon: 'BookOpen',
        text: 'Finish your graph and write the three sentences describing it. Read Unit 2.2 **pages 37 to 40** again to check your answers.',
        textVn: 'Hoàn thành đồ thị và viết ba câu mô tả nó. Đọc lại Bài 2.2 **trang 37 đến 40** để kiểm tra đáp án.',
        textFr: 'Finis ton graphique et écris les trois phrases qui le décrivent. Relis l’Unité 2.2, **pages 37 à 40**, pour vérifier.',
      },
    ],
  },
  {
    layout: 'hero',
    color: TEAL,
    icon: 'CheckCircle2',
    brand: 'Year 7 Science',
    brandVn: 'Khoa học Lớp 7',
    brandFr: 'Sciences 7e année',
    title: 'Lesson Complete!',
    titleVn: 'Hoàn thành bài học!',
    titleFr: 'Leçon terminée !',
    subtitle: 'You can measure a volume and a temperature accurately, and you know the temperature stops climbing at the boiling point. Exit question: **why** does the liquid in a thermometer rise when the water gets hotter? What is happening to it?',
    subtitleVn: 'Em đo được thể tích và nhiệt độ một cách chính xác, và em biết nhiệt độ ngừng tăng ở nhiệt độ sôi. Câu hỏi ra về: **vì sao** chất lỏng trong nhiệt kế dâng lên khi nước nóng hơn? Điều gì đang xảy ra với nó?',
    subtitleFr: 'Tu sais mesurer un volume et une température avec précision, et tu sais que la température cesse de monter au point d’ébullition. Question de sortie : **pourquoi** le liquide d’un thermomètre monte-t-il quand l’eau chauffe ? Que lui arrive-t-il ?',
  },
]
