// content/y7-science/U02_8/slides.js
// Year 7 Science · 2.8 Acids and bases. Wednesday 23 September 2026.
//
// No Learner's Book pages: Unit 2 ends at 2.7. This section is built to the
// Cambridge Lower Secondary Stage 7 chemistry content instead — acids, alkalis,
// indicators, the pH scale and neutralisation — and to the house style of the
// exemplars (Science 2.5, Maths 2.3): short sentences, one idea each, and no
// slide body that repeats its write note.
//
// The book's own word is ALKALI, not base, and it is the one that turns up in
// an exam paper. So the deck teaches the pair together, once, on slide 5:
// a base is the opposite of an acid, and an alkali is a base that dissolves in
// water. After that the deck says "alkali" wherever a liquid is being tested
// and "base" wherever a solid is being added, which is how the book uses them.
//
// THE SHAPE: the whole lesson hangs off one question, asked on slide 2 and not
// answered until slide 9 — two clear liquids that look identical, and no way to
// tell them apart, because tasting is banned. Acids, bases and the hazard
// symbol come first so that the ban has teeth; the indicator then arrives as
// the answer to a question the class has been carrying for ten minutes.
//
// The vote on slide 15 is the misconception worth spending a minute on: a class
// that has been told acids burn will happily pick pH 1, and the answer is both.
//
// COPY-DOWN: 7 written panels covering 10 key words (acid · base · alkali ·
// corrosive · indicator · litmus · universal indicator · pH scale · neutral ·
// neutralisation) and 2 Draw This diagrams (the pH scale, and neutralisation).

import { DIAGRAMS } from './diagrams.js'
import { PhDipper, AcidSnap } from './widgets.jsx'
import lemon from './images/lemon.jpg'
import soap from './images/soap.jpg'
import corrosive from './images/corrosive.jpg'
import litmusAcid from './images/litmus-acid.jpg'
import litmusBase from './images/litmus-base.jpg'
import cabbage from './images/cabbage.jpg'
import phrange from './images/phrange.jpg'
import antacid from './images/antacid.jpg'

const TEAL = '#0087a8'
const PURPLE = '#5c2483'
const ORANGE = '#c25e12'
const BLUE = '#1a5fa8'
const RED = '#c8102e'
const ACID = '#c0392b'
const ALKALI = '#2c6fbb'

export const slides = [
  // ── 1. Hero + starter ──────────────────────────────────────────────────────
  {
    layout: 'hero',
    color: TEAL,
    icon: 'FlaskConical',
    brand: 'Year 7 Science',
    brandVn: 'Khoa học Lớp 7',
    brandFr: 'Sciences 7e année',
    date: '23 Sep 2026',
    eyebrow: '2.8 Acids and bases',
    eyebrowVn: '2.8 Axit và bazơ',
    eyebrowFr: '2.8 Acides et bases',
    title: 'Acids & Bases',
    titleVn: 'Axit & Bazơ',
    titleFr: 'Acides & bases',
    card: {
      icon: 'Pencil',
      badge: 'Starter · one minute alone, two with a partner',
      badgeVn: 'Khởi động · một phút một mình, hai phút với bạn',
      badgeFr: 'Pour commencer · une minute seul, deux avec un voisin',
      text: 'Write down **three** foods that taste **sour**.',
      textVn: 'Viết ra **ba** món ăn có vị **chua**.',
      textFr: 'Écris **trois** aliments au goût **acide**.',
    },
  },

  // ── 2. The question the whole lesson answers. No answer on this slide. ─────
  {
    layout: 'statement',
    accent: PURPLE,
    icon: 'HelpCircle',
    eyebrow: 'Think',
    eyebrowVn: 'Suy nghĩ',
    eyebrowFr: 'Réfléchis',
    title: 'Two Clear Liquids',
    titleVn: 'Hai ly nước trong',
    titleFr: 'Deux liquides transparents',
    text: 'Mr Bowen has two glasses. One is lemon juice. One is soapy water.',
    textVn: 'Thầy Bowen có hai ly. Một ly là nước chanh. Một ly là nước xà phòng.',
    textFr: 'M. Bowen a deux verres. L’un contient du jus de citron. L’autre de l’eau savonneuse.',
    sub: 'They look **the same**. How can you tell them apart — with **no tasting**?',
    subVn: 'Chúng trông **giống hệt nhau**. Làm sao phân biệt được — mà **không được nếm**?',
    subFr: 'Ils se ressemblent **exactement**. Comment les distinguer — **sans goûter** ?',
  },

  // ── ACIDS ──────────────────────────────────────────────────────────────────
  // 3. Acid, by the sense they already trust
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Droplet',
    eyebrow: 'Key word',
    eyebrowVn: 'Từ khóa',
    eyebrowFr: 'Mot clé',
    title: 'Sour Means Acid',
    titleVn: 'Chua nghĩa là axit',
    titleFr: 'Aigre veut dire acide',
    ratio: 45,
    image: lemon,
    content: 'You have eaten acid all your life. But never taste anything in the lab.',
    contentVn: 'Em đã ăn axit cả đời rồi. Nhưng đừng bao giờ nếm thứ gì trong phòng thí nghiệm.',
    contentFr: 'Tu manges de l’acide depuis toujours. Mais ne goûte jamais rien au labo.',
    notes: [
      {
        tone: 'write',
        text: '**Acid:** a substance that tastes sour. A strong acid can burn your skin.',
        textVn: '**Axit (acid):** chất có vị chua. Axit mạnh có thể làm bỏng da.',
        textFr: '**Acide (acid) :** une substance au goût aigre. Un acide fort peut brûler la peau.',
      },
    ],
  },

  // 4. Six acids, drawn
  {
    layout: 'showcase',
    accent: ACID,
    icon: 'Boxes',
    eyebrow: 'Six you already know',
    eyebrowVn: 'Sáu thứ em đã biết',
    eyebrowFr: 'Six que tu connais déjà',
    title: 'Acids Around You',
    titleVn: 'Axit quanh em',
    titleFr: 'Les acides autour de toi',
    inlineSvg: DIAGRAMS.ACIDS_ROUND,
    caption: 'Four of these you can taste. Two you must **never** taste.',
    captionVn: 'Bốn thứ em có thể nếm. Hai thứ em **không bao giờ** được nếm.',
    captionFr: 'Tu peux en goûter quatre. Deux, il ne faut **jamais** les goûter.',
  },

  // ── BASES ──────────────────────────────────────────────────────────────────
  // 5. The other family, and the two words for it
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Droplets',
    eyebrow: 'Key words',
    eyebrowVn: 'Từ khóa',
    eyebrowFr: 'Mots clés',
    title: 'The Opposite Family',
    titleVn: 'Nhóm chất đối lập',
    titleFr: 'La famille opposée',
    ratio: 45,
    image: soap,
    content: 'Rub soap between wet fingers. That slippery feeling is the clue.',
    contentVn: 'Xoa xà phòng giữa hai ngón tay ướt. Cảm giác trơn trượt đó là dấu hiệu.',
    contentFr: 'Frotte du savon entre tes doigts mouillés. Ça glisse : c’est l’indice.',
    notes: [
      {
        tone: 'write',
        text: '**Base:** the chemical opposite of an acid.\n**Alkali:** a base that dissolves in water.',
        textVn: '**Bazơ (base):** chất đối lập hóa học của axit.\n**Kiềm (alkali):** bazơ tan được trong nước.',
        textFr: '**Base :** le contraire chimique d’un acide.\n**Alcali (alkali) :** une base qui se dissout dans l’eau.',
      },
    ],
  },

  // 6. Six bases, drawn
  {
    layout: 'showcase',
    accent: ALKALI,
    icon: 'Boxes',
    eyebrow: 'Six more you already know',
    eyebrowVn: 'Sáu thứ nữa em đã biết',
    eyebrowFr: 'Six autres que tu connais déjà',
    title: 'Bases Around You',
    titleVn: 'Bazơ quanh em',
    titleFr: 'Les bases autour de toi',
    inlineSvg: DIAGRAMS.BASES_ROUND,
    caption: 'You wash with them, brush with them — and one of them cleans an oven.',
    captionVn: 'Em dùng chúng để rửa, để đánh răng — và một thứ dùng để lau lò nướng.',
    captionFr: 'Tu te laves avec, tu te brosses les dents avec — et l’une nettoie un four.',
  },

  // ── SAFETY ─────────────────────────────────────────────────────────────────
  // 7. Why the no-tasting rule has teeth
  {
    layout: 'split',
    accent: RED,
    icon: 'AlertTriangle',
    eyebrow: 'Lab safety',
    eyebrowVn: 'An toàn phòng thí nghiệm',
    eyebrowFr: 'Sécurité au labo',
    title: 'This Symbol Means Stop',
    titleVn: 'Kí hiệu này nghĩa là dừng lại',
    titleFr: 'Ce symbole veut dire stop',
    ratio: 50,
    image: corrosive,
    content: 'You will see it on bottles in our lab. Find one next lesson.',
    contentVn: 'Em sẽ thấy nó trên các chai lọ trong phòng thí nghiệm của lớp. Buổi sau hãy tìm một chai.',
    contentFr: 'Tu le verras sur des flacons de notre labo. Trouves-en un au prochain cours.',
    notes: [
      {
        tone: 'write',
        text: '**Corrosive:** it attacks skin, eyes and clothes.\nWear eye protection. Never taste. Wash a spill off at once.',
        textVn: '**Ăn mòn (corrosive):** chất làm hỏng da, mắt và quần áo.\nĐeo kính bảo hộ. Không bao giờ nếm. Nếu đổ ra người, rửa ngay.',
        textFr: '**Corrosif (corrosive) :** il attaque la peau, les yeux et les vêtements.\nPorte des lunettes de protection. Ne goûte jamais. Rince tout de suite si ça coule.',
      },
    ],
  },

  // ── INDICATORS ─────────────────────────────────────────────────────────────
  // 8. Back to slide 2. Still no answer.
  {
    layout: 'statement',
    accent: PURPLE,
    icon: 'HelpCircle',
    eyebrow: 'Back to the two glasses',
    eyebrowVn: 'Quay lại hai ly nước',
    eyebrowFr: 'Retour aux deux verres',
    title: 'So What Is Left?',
    titleVn: 'Vậy còn cách nào?',
    titleFr: 'Alors, que reste-t-il ?',
    text: 'You cannot see the difference. You must not taste it.',
    textVn: 'Em không nhìn ra khác biệt. Em cũng không được nếm.',
    textFr: 'Tu ne vois pas la différence. Tu ne dois pas goûter.',
    sub: 'What else could tell you?',
    subVn: 'Còn thứ gì có thể cho em biết?',
    subFr: 'Quoi d’autre pourrait te le dire ?',
  },

  // 9. The answer: an indicator
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Sparkles',
    eyebrow: 'Key words',
    eyebrowVn: 'Từ khóa',
    eyebrowFr: 'Mots clés',
    title: 'Use an Indicator',
    titleVn: 'Dùng chất chỉ thị',
    titleFr: 'Utilise un indicateur',
    ratio: 40,
    inlineSvg: DIAGRAMS.LITMUS_RULE,
    content: 'One dip, and the colour answers for you.',
    contentVn: 'Một lần nhúng, và màu sắc sẽ trả lời thay em.',
    contentFr: 'On trempe une fois, et la couleur répond pour toi.',
    notes: [
      {
        tone: 'write',
        text: '**Indicator:** a substance that changes colour to show an acid or an alkali.\n**Litmus:** the simplest indicator. It comes as red paper and blue paper.',
        textVn: '**Chất chỉ thị (indicator):** chất đổi màu để cho biết đó là axit hay kiềm.\n**Quỳ tím (litmus):** chất chỉ thị đơn giản nhất. Có loại giấy đỏ và giấy xanh.',
        textFr: '**Indicateur (indicator) :** une substance qui change de couleur pour montrer un acide ou un alcali.\n**Tournesol (litmus) :** l’indicateur le plus simple. Il existe en papier rouge et en papier bleu.',
      },
    ],
  },

  // 10. The real thing, both ways round
  {
    layout: 'compare',
    accent: TEAL,
    icon: 'ScanEye',
    eyebrow: 'The drawing, photographed',
    eyebrowVn: 'Hình vẽ, chụp ngoài đời thật',
    eyebrowFr: 'Le dessin, en photo',
    title: 'Real Litmus Paper',
    titleVn: 'Giấy quỳ thật',
    titleFr: 'Du vrai papier tournesol',
    columns: [
      {
        heading: 'Blue paper in an acid',
        headingVn: 'Giấy xanh trong axit',
        headingFr: 'Papier bleu dans un acide',
        accent: ACID,
        image: litmusAcid,
        caption: 'The wet end went **red**. The bottle held hydrochloric acid.',
        captionVn: 'Đầu ướt đã chuyển sang **đỏ**. Chai đó đựng axit clohiđric.',
        captionFr: 'Le bout mouillé est devenu **rouge**. Le flacon contenait de l’acide chlorhydrique.',
      },
      {
        heading: 'Red paper in an alkali',
        headingVn: 'Giấy đỏ trong kiềm',
        headingFr: 'Papier rouge dans un alcali',
        accent: ALKALI,
        image: litmusBase,
        caption: 'The wet end went **blue**. The flask held sodium hydroxide.',
        captionVn: 'Đầu ướt đã chuyển sang **xanh**. Bình đó đựng natri hiđroxit.',
        captionFr: 'Le bout mouillé est devenu **bleu**. La fiole contenait de l’hydroxyde de sodium.',
      },
    ],
  },

  // 11. An indicator they can make at home
  {
    layout: 'showcase',
    accent: PURPLE,
    icon: 'Leaf',
    eyebrow: 'You can make this at home',
    eyebrowVn: 'Em có thể tự làm ở nhà',
    eyebrowFr: 'Tu peux le faire à la maison',
    title: 'Red Cabbage Works Too',
    titleVn: 'Bắp cải tím cũng được',
    titleFr: 'Le chou rouge marche aussi',
    image: cabbage,
    caption: 'Boil red cabbage and keep the purple water. It changes colour just like litmus.',
    captionVn: 'Luộc bắp cải tím rồi giữ lại phần nước tím. Nó đổi màu giống hệt giấy quỳ.',
    captionFr: 'Fais bouillir du chou rouge et garde l’eau violette. Elle change de couleur comme le tournesol.',
  },

  // ── THE pH SCALE ───────────────────────────────────────────────────────────
  // 12. Why two colours are not enough
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Gauge',
    eyebrow: 'Key words',
    eyebrowVn: 'Từ khóa',
    eyebrowFr: 'Mots clés',
    title: 'Litmus Is Not Enough',
    titleVn: 'Giấy quỳ chưa đủ',
    titleFr: 'Tournesol limité',
    ratio: 45,
    image: phrange,
    content: 'Litmus says which family. It never says how strong.',
    contentVn: 'Giấy quỳ chỉ cho biết thuộc nhóm nào. Nó không cho biết mạnh đến đâu.',
    contentFr: 'Le tournesol dit la famille. Jamais la force.',
    notes: [
      {
        tone: 'write',
        text: '**Universal indicator:** an indicator that gives many colours, not just two.',
        textVn: '**Chất chỉ thị vạn năng (universal indicator):** chất chỉ thị cho nhiều màu, không chỉ hai màu.',
        textFr: '**Indicateur universel :** il donne beaucoup de couleurs, pas juste deux.',
      },
      {
        tone: 'write',
        text: '**pH scale:** numbers from 1 to 14 that say how strong an acid or an alkali is.\n**Neutral:** not an acid and not a base. Its pH is exactly 7.',
        textVn: '**Thang pH (pH scale):** các số từ 1 đến 14 cho biết axit hay kiềm mạnh đến mức nào.\n**Trung tính (neutral):** không phải axit, cũng không phải bazơ. pH đúng bằng 7.',
        textFr: '**Échelle de pH :** de 1 à 14, elle dit la force d’un acide ou d’un alcali.\n**Neutre :** ni acide, ni base. Son pH vaut exactement 7.',
      },
    ],
  },

  // 13. Draw This: the scale
  {
    layout: 'showcase',
    accent: ORANGE,
    icon: 'Pencil',
    eyebrow: 'Rulers out — and colour it in',
    eyebrowVn: 'Lấy thước ra — và tô màu',
    eyebrowFr: 'Sors ta règle — et colorie',
    title: 'The pH Scale',
    titleVn: 'Thang pH',
    titleFr: 'L’échelle de pH',
    inlineSvg: DIAGRAMS.PH_SCALE,
    drawThis: true,
    caption: 'Fourteen boxes, fourteen numbers, and three colours to remember.',
    captionVn: 'Mười bốn ô, mười bốn con số, và ba màu cần nhớ.',
    captionFr: 'Quatorze cases, quatorze nombres, et trois couleurs à retenir.',
  },

  // 14. The dipper
  {
    layout: 'showcase',
    accent: TEAL,
    icon: 'Target',
    eyebrow: 'Say your answer before the press',
    eyebrowVn: 'Nói đáp án trước khi bấm',
    eyebrowFr: 'Dis ta réponse avant d’appuyer',
    title: 'Dip the Paper',
    titleVn: 'Nhúng giấy chỉ thị',
    titleFr: 'Trempe le papier',
    widget: PhDipper,
    caption: 'Eleven liquids. Watch the black box walk across the scale.',
    captionVn: 'Mười một chất lỏng. Nhìn ô viền đen chạy dọc thang pH.',
    captionFr: 'Onze liquides. Regarde la case noire avancer sur l’échelle.',
  },

  // 15. Vote. No answer on this slide.
  {
    layout: 'compare',
    accent: PURPLE,
    icon: 'Hand',
    eyebrow: 'Vote with one hand',
    eyebrowVn: 'Biểu quyết bằng một tay',
    eyebrowFr: 'Vote avec une main',
    title: 'Which One Burns Your Skin?',
    titleVn: 'Cái nào làm bỏng da em?',
    titleFr: 'Lequel brûle ta peau ?',
    text: 'One drop of each falls on your hand.',
    textVn: 'Mỗi loại một giọt rơi lên tay em.',
    textFr: 'Une goutte de chaque tombe sur ta main.',
    columns: [
      { heading: 'A · left hand up', headingVn: 'A · giơ tay trái', headingFr: 'A · main gauche levée', accent: BLUE, icon: 'Hand', inlineSvg: DIAGRAMS.ANS_A },
      { heading: 'B · right hand up', headingVn: 'B · giơ tay phải', headingFr: 'B · main droite levée', accent: ORANGE, icon: 'Hand', inlineSvg: DIAGRAMS.ANS_B },
    ],
  },

  // 16. The answer: both ends of the scale
  {
    layout: 'showcase',
    accent: TEAL,
    icon: 'AlertTriangle',
    eyebrow: 'The answer is both',
    eyebrowVn: 'Câu trả lời là cả hai',
    eyebrowFr: 'La réponse : les deux',
    title: 'A Strong Alkali Burns Too',
    titleVn: 'Kiềm mạnh cũng gây bỏng',
    titleFr: 'Un alcali fort brûle aussi',
    inlineSvg: DIAGRAMS.BOTH_ENDS,
    caption: 'Oven cleaner is pH 13. That is why its bottle says **do not touch**.',
    captionVn: 'Nước tẩy lò có pH 13. Vì vậy trên chai mới ghi **không được chạm vào**.',
    captionFr: 'Le décape-four a un pH de 13. C’est pour ça que son flacon dit **ne pas toucher**.',
  },

  // ── NEUTRALISATION ─────────────────────────────────────────────────────────
  // 17. Ask before you tell. No answer on this slide.
  {
    layout: 'statement',
    accent: PURPLE,
    icon: 'HelpCircle',
    eyebrow: 'Think',
    eyebrowVn: 'Suy nghĩ',
    eyebrowFr: 'Réfléchis',
    title: 'Mr Bowen Ate Too Much',
    titleVn: 'Thầy Bowen ăn quá nhiều',
    titleFr: 'M. Bowen a trop mangé',
    text: 'Spicy noodles, two bowls. Now his stomach has too much acid, and it hurts.',
    textVn: 'Mì cay, hai tô. Giờ dạ dày thầy thừa axit, và đang đau.',
    textFr: 'Des nouilles épicées, deux bols. Son estomac a trop d’acide, et ça fait mal.',
    sub: 'What should he swallow to stop the pain?',
    subVn: 'Thầy nên uống gì để hết đau?',
    subFr: 'Que doit-il avaler pour ne plus avoir mal ?',
  },

  // 18. Neutralisation
  {
    layout: 'split',
    accent: TEAL,
    icon: 'Equal',
    eyebrow: 'Key word',
    eyebrowVn: 'Từ khóa',
    eyebrowFr: 'Mot clé',
    title: 'Cancel It Out',
    titleVn: 'Triệt tiêu lẫn nhau',
    titleFr: 'Ils s’annulent',
    ratio: 48,
    image: antacid,
    content: 'The tablet is a base. It meets the acid, and the acid stops being an acid.',
    contentVn: 'Viên thuốc là một bazơ. Nó gặp axit, và axit không còn là axit nữa.',
    contentFr: 'Le comprimé est une base. Il rencontre l’acide, et l’acide n’est plus un acide.',
    notes: [
      {
        tone: 'write',
        text: '**Neutralisation:** an acid and a base cancel each other out and make something neutral.',
        textVn: '**Sự trung hòa (neutralisation):** axit và bazơ triệt tiêu lẫn nhau, tạo ra chất trung tính.',
        textFr: '**Neutralisation :** un acide et une base s’annulent et donnent quelque chose de neutre.',
      },
    ],
  },

  // 19. Draw This: the two arrows meeting at 7
  {
    layout: 'showcase',
    accent: ORANGE,
    icon: 'Pencil',
    eyebrow: 'Copy the three beakers and the two arrows',
    eyebrowVn: 'Chép ba cốc và hai mũi tên',
    eyebrowFr: 'Recopie les trois béchers et les deux flèches',
    title: 'Acid + Alkali',
    titleVn: 'Axit + Kiềm',
    titleFr: 'Acide + alcali',
    inlineSvg: DIAGRAMS.NEUTRALISE,
    drawThis: true,
    caption: 'Neither side wins. They meet in the middle.',
    captionVn: 'Không bên nào thắng. Chúng gặp nhau ở giữa.',
    captionFr: 'Aucun ne gagne. Ils se retrouvent au milieu.',
  },

  // 20. Four places it is already being used
  {
    layout: 'showcase',
    accent: TEAL,
    icon: 'Home',
    eyebrow: 'You have used it already',
    eyebrowVn: 'Em đã dùng nó rồi',
    eyebrowFr: 'Tu l’as déjà utilisée',
    title: 'Neutralising Every Day',
    titleVn: 'Trung hòa mỗi ngày',
    titleFr: 'Neutraliser chaque jour',
    inlineSvg: DIAGRAMS.NEUTRAL_LIFE,
    caption: 'Every one of these adds the opposite family, on purpose.',
    captionVn: 'Mỗi cách ở đây đều cố ý thêm vào nhóm chất đối lập.',
    captionFr: 'Chacun ajoute exprès la famille opposée.',
  },

  // ── QUESTIONS (three per slide, so an open answer never scrolls) ───────────
  // 21. Questions 1–3
  {
    layout: 'callout',
    accent: PURPLE,
    icon: 'HelpCircle',
    eyebrow: 'Check yourself',
    eyebrowVn: 'Tự kiểm tra',
    eyebrowFr: 'Teste-toi',
    title: 'Questions 1–3',
    titleVn: 'Câu hỏi 1–3',
    titleFr: 'Questions 1–3',
    content:
      '> **1.** Vinegar has a pH of 3. Acid, neutral or alkali?\n' +
      '> **2.** Blue litmus paper turns red. What was it dipped in?\n' +
      '> **3.** Which is the stronger acid: pH 2 or pH 5?',
    contentVn:
      '> **1.** Giấm có pH bằng 3. Axit, trung tính hay kiềm?\n' +
      '> **2.** Giấy quỳ xanh chuyển sang đỏ. Nó đã được nhúng vào gì?\n' +
      '> **3.** Axit nào mạnh hơn: pH 2 hay pH 5?',
    contentFr:
      '> **1.** Vinaigre : pH 3. Acide, neutre ou alcalin ?\n' +
      '> **2.** Le tournesol bleu devient rouge. Trempé dans quoi ?\n' +
      '> **3.** L’acide le plus fort : pH 2 ou pH 5 ?',
    reveal: {
      label: 'Check',
      labelVn: 'Kiểm tra',
      labelFr: 'Vérifier',
      answer:
        '**1.** An acid — 3 is below 7.\n' +
        '**2.** An acid.\n' +
        '**3.** pH 2. The smaller the number, the stronger the acid.',
      answerVn:
        '**1.** Axit — 3 nhỏ hơn 7.\n' +
        '**2.** Một axit.\n' +
        '**3.** pH 2. Số càng nhỏ, axit càng mạnh.',
      answerFr:
        '**1.** Un acide — 3 < 7.\n' +
        '**2.** Un acide.\n' +
        '**3.** pH 2. Nombre plus petit, acide plus fort.',
    },
  },

  // 22. Questions 4–6
  {
    layout: 'callout',
    accent: PURPLE,
    icon: 'HelpCircle',
    eyebrow: 'Check yourself',
    eyebrowVn: 'Tự kiểm tra',
    eyebrowFr: 'Teste-toi',
    title: 'Questions 4–6',
    titleVn: 'Câu hỏi 4–6',
    titleFr: 'Questions 4–6',
    content:
      '> **4.** Soap has a pH of 10. Name its family.\n' +
      '> **5.** Why can litmus not tell pH 8 from pH 13?\n' +
      '> **6.** Mr Bowen spills acid on the bench. More acid, or a base?',
    contentVn:
      '> **4.** Xà phòng có pH bằng 10. Nó thuộc nhóm nào?\n' +
      '> **5.** Vì sao giấy quỳ không phân biệt được pH 8 với pH 13?\n' +
      '> **6.** Thầy Bowen làm đổ axit ra bàn. Đổ thêm axit, hay đổ bazơ?',
    contentFr:
      '> **4.** Savon : pH 10. Quelle famille ?\n' +
      '> **5.** Pourquoi le tournesol confond pH 8 et 13 ?\n' +
      '> **6.** M. Bowen renverse de l’acide sur la table. Acide ou base ?',
    reveal: {
      label: 'Check',
      labelVn: 'Kiểm tra',
      labelFr: 'Vérifier',
      answer:
        '**4.** An alkali — 10 is above 7.\n' +
        '**5.** Litmus has only two colours. Both of those turn it blue.\n' +
        '**6.** A base. It neutralises the acid.',
      answerVn:
        '**4.** Kiềm — 10 lớn hơn 7.\n' +
        '**5.** Giấy quỳ chỉ có hai màu. Cả hai đều làm nó xanh.\n' +
        '**6.** Bazơ. Nó trung hòa axit.',
      answerFr:
        '**4.** Un alcali — 10 > 7.\n' +
        '**5.** Deux couleurs seulement : les deux pH donnent du bleu.\n' +
        '**6.** Une base. Elle neutralise l’acide.',
    },
  },

  // ── 23. Game ───────────────────────────────────────────────────────────────
  {
    layout: 'game',
    title: 'Acid Snap',
    titleVn: 'Đoán nhanh axit',
    titleFr: 'Acide express',
    widget: AcidSnap,
  },

  // ── CLOSE ──────────────────────────────────────────────────────────────────
  // 24. Homework
  {
    layout: 'callout',
    accent: RED,
    icon: 'Home',
    eyebrow: 'At home',
    eyebrowVn: 'Ở nhà',
    eyebrowFr: 'À la maison',
    title: 'Hunt Your Kitchen',
    titleVn: 'Đi săn trong nhà bếp',
    titleFr: 'Chasse dans ta cuisine',
    notes: [
      {
        tone: 'homework',
        badge: 'Homework',
        badgeVn: 'Bài tập về nhà',
        badgeFr: 'Devoirs',
        icon: 'Pencil',
        text: '1. Draw the pH scale on one page. Colour it in. Label acid, neutral and alkali.\n2. Find **six** things in your kitchen or bathroom. Write each one under the right label.\n3. Bring it in. Be ready to explain **one** of your six.',
        textVn: '1. Vẽ thang pH trên một trang giấy. Tô màu. Ghi nhãn axit, trung tính và kiềm.\n2. Tìm **sáu** thứ trong bếp hoặc nhà tắm. Viết mỗi thứ vào đúng nhãn.\n3. Mang đến lớp. Chuẩn bị giải thích **một** trong sáu thứ đó.',
        textFr: '1. Dessine l’échelle de pH sur une page. Colorie-la. Écris acide, neutre et alcalin.\n2. Trouve **six** choses dans ta cuisine ou ta salle de bain. Écris chacune sous la bonne étiquette.\n3. Apporte-la en classe. Sois prêt à expliquer **une** des six.',
      },
    ],
  },

  // 25. Checklist
  {
    layout: 'stack',
    variant: 'checklist',
    accent: TEAL,
    icon: 'CheckCircle2',
    columns: 2,
    eyebrow: 'Before you leave',
    eyebrowVn: 'Trước khi ra về',
    eyebrowFr: 'Avant de partir',
    title: 'Can You Do These?',
    titleVn: 'Em làm được chưa?',
    titleFr: 'Sais-tu faire ça ?',
    content: '> Check your notebook: **7 written panels** and **2 diagrams**.',
    contentVn: '> Kiểm tra vở: **7 khung ghi chép** và **2 sơ đồ**.',
    contentFr: '> Vérifie ton cahier : **7 encadrés écrits** et **2 schémas**.',
    items: [
      { text: 'Name three **acids** and three **bases** around you.', textVn: 'Kể tên ba **axit** và ba **bazơ** quanh em.', textFr: 'Nomme trois **acides** et trois **bases** autour de toi.' },
      { text: 'Use an **indicator** to test a liquid.', textVn: 'Dùng **chất chỉ thị** để thử một chất lỏng.', textFr: 'Utilise un **indicateur** pour tester un liquide.' },
      { text: 'Read the **pH scale** and say which family.', textVn: 'Đọc **thang pH** và nói nó thuộc nhóm nào.', textFr: 'Lis l’**échelle de pH** et dis quelle famille.' },
      { text: 'Explain what **neutralisation** does.', textVn: 'Giải thích **sự trung hòa** làm gì.', textFr: 'Explique ce que fait la **neutralisation**.' },
    ],
  },

  // 26. Exit question
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
    subtitle: 'Exit question: toothpaste is pH 9. Why do we brush **after** eating?',
    subtitleVn: 'Câu hỏi ra về: kem đánh răng có pH 9. Tại sao ta đánh răng **sau** khi ăn?',
    subtitleFr: 'Question de sortie : le dentifrice a un pH de 9. Pourquoi se brosser les dents **après** avoir mangé ?',
  },
]
