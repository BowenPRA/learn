// content/y7-science/U02_2a/slides.js
// Year 7 Science · 2.2a Changes of state. Wednesday 9 September 2026.
//
// Section 2.2 in the Learner's Book runs from page 35 to page 40 and, like 2.1,
// is too much for one period taught properly. THIS deck is pages 35-36: the five
// change words and the English that carries them. 2.2b is pages 37-40: measuring
// volume and temperature, and the heating-water investigation.
//
// WHY THE SEAM IS HERE. Everything in this deck is a WORD. The barrier for this
// class was never the idea — they already know ice melts — it is that English
// gives every change of state two forms (you BOIL the water; BOILING is the
// change) and Vietnamese does not split them the same way, and that "evaporate"
// and "boil" are the same journey (liquid to gas) with different words. So this
// lesson is built as an English lesson wearing a science coat: five verbs, five
// nouns, and the "from X to Y" frame that Activity 2.2.1 drills.
//
// THE SPINE IS ONE SUBSTANCE, WATER, MOVED THROUGH EVERY STATE, so "solid",
// "liquid" and "gas" read as things water DOES, not as different stuffs — the
// same move 2.1a made with ice and mercury. Ice on a warm table (melting), the
// puddle drying (evaporation), the kettle (boiling), the cold glass (condensing).
//
// THE COPY-DOWN PLAN. Six written items, each at the moment it is taught:
//   · change of state
//   · melt + melting point
//   · freeze                (named as the reverse of melting)
//   · evaporate + evaporation + water vapour
//   · boil + boiling point + steam
//   · condense + condensation
//   · the five verb/noun pairs      (one compact write panel)
//   · the state-change cycle         — the deck's one Draw This.
//
// FOUR SLIDES STOP AND ASK BEFORE THEY TELL: the ice-and-puddle hook, the
// evaporation-vs-boiling compare, Activity 2.2.1, and the real-world check.
//
// Source: Learner's Book Unit 2.2, pages 35-36. The p.36 "changing state" figure
// and Activity 2.2.1 are the book's own. The two diagrams are drawn in
// diagrams.js; the three photographs are openly licensed (see images/CREDITS.json).
import { DIAGRAMS } from './diagrams.js'
import boil from './images/boil.jpg'
import melt from './images/melt.jpg'
import condense from './images/condense.jpg'

const TEAL = '#0087a8'
const PURPLE = '#5c2483'
const RED = '#c8102e'
// Change words are coloured by DIRECTION, matching diagrams.js: heating changes
// (melt, boil, evaporate) are warm orange; cooling changes (freeze, condense)
// are cool blue.
const HEAT = '#c25e12'
const COOL = '#1a5fa8'

export const slides = [
  // ── Section 1: recall, then a puzzle about one glass of water ────────────
  {
    layout: 'hero',
    color: TEAL,
    icon: 'Repeat',
    brand: 'Year 7 Science',
    brandVn: 'Khoa học Lớp 7',
    brandFr: 'Sciences 7e année',
    eyebrow: '2.2 Changes of state · part 1 of 2',
    eyebrowVn: '2.2 Sự chuyển thể · phần 1 trong 2',
    eyebrowFr: '2.2 Changements d’état · partie 1 sur 2',
    date: '9 Sep 2026',
    title: 'Changes of State',
    titleVn: 'Sự chuyển thể',
    titleFr: 'Les changements d’état',
    card: {
      icon: 'Pencil',
      badge: 'Starter Task',
      badgeVn: 'Nhiệm vụ khởi động',
      badgeFr: 'Pour commencer',
      text: 'On one line in your notebook, draw the **particles** of a **solid**, a **liquid** and a **gas** — the three pictures from last lesson. Three minutes, from memory.',
      textVn: 'Trên một dòng trong vở, hãy vẽ các **hạt** của một **chất rắn**, một **chất lỏng** và một **chất khí** — ba hình của tiết trước. Ba phút, vẽ từ trí nhớ.',
      textFr: 'Sur une ligne de ton cahier, dessine les **particules** d’un **solide**, d’un **liquide** et d’un **gaz** — les trois dessins du dernier cours. Trois minutes, de mémoire.',
    },
  },
  {
    layout: 'showcase',
    accent: PURPLE,
    icon: 'HelpCircle',
    eyebrow: 'In pairs — two minutes, no answers called out',
    eyebrowVn: 'Theo cặp — hai phút, không nói to đáp án',
    eyebrowFr: 'À deux — deux minutes, sans crier la réponse',
    title: 'The Same Water, Three Times',
    titleVn: 'Vẫn là nước đó, ba lần',
    titleFr: 'La même eau, trois fois',
    image: melt,
    caption: 'You leave an ice cube on the table. An hour later it is a small **puddle**. By lunchtime the puddle is **gone**. It was the same water the whole time. **Where did it go — twice?**',
    captionVn: 'Em để một viên đá trên bàn. Một giờ sau nó thành một **vũng nước** nhỏ. Đến trưa vũng nước **biến mất**. Suốt thời gian đó vẫn là cùng một lượng nước. **Nó đã đi đâu — hai lần?**',
    captionFr: 'Tu laisses un glaçon sur la table. Une heure plus tard, c’est une petite **flaque**. À midi, la flaque a **disparu**. C’était la même eau tout le temps. **Où est-elle partie — deux fois ?**',
  },
  {
    layout: 'callout',
    accent: TEAL,
    icon: 'Repeat',
    eyebrow: 'Last lesson gave us the reason',
    eyebrowVn: 'Tiết trước đã cho ta lý do',
    eyebrowFr: 'Le dernier cours a la réponse',
    title: 'Heat In, Heat Out',
    titleVn: 'Nhận nhiệt, mất nhiệt',
    titleFr: 'Chauffer, refroidir',
    content:
      'Everything is made of **particles** — that was last lesson. **Heating** gives the particles more energy, so they move more. **Cooling** takes energy away.\n\n' +
      'Put enough energy in, or take enough out, and the substance changes from one state to another. That is what happened to the ice.',
    contentVn:
      'Mọi thứ đều tạo nên từ các **hạt** — đó là tiết trước. **Đun nóng** cho các hạt thêm năng lượng, nên chúng chuyển động nhiều hơn. **Làm lạnh** thì lấy bớt năng lượng đi.\n\n' +
      'Đưa đủ năng lượng vào, hoặc lấy đủ ra, thì chất sẽ chuyển từ trạng thái này sang trạng thái khác. Đó là điều đã xảy ra với viên đá.',
    contentFr:
      'Tout est fait de **particules** — vu au dernier cours. **Chauffer** donne de l’énergie aux particules : elles bougent plus. **Refroidir** leur en retire.\n\n' +
      'Ajoute ou retire assez d’énergie, et la substance passe d’un état à un autre. C’est ce qui est arrivé au glaçon.',
    notes: [
      {
        tone: 'write',
        text: '**Change of state:** when a substance changes from one state of matter to another — for example, solid to liquid. **Heating** and **cooling** cause changes of state.',
        textVn: '**Sự chuyển thể (change of state):** khi một chất chuyển từ trạng thái này sang trạng thái khác — ví dụ, từ rắn sang lỏng. **Đun nóng** và **làm lạnh** gây ra sự chuyển thể.',
        textFr: '**Changement d’état :** quand une substance passe d’un état à un autre — comme de solide à liquide. **Chauffer** et **refroidir** causent les changements d’état.',
      },
    ],
  },
  {
    layout: 'statement',
    accent: HEAT,
    icon: 'ArrowLeftRight',
    eyebrow: 'Every science class is an English class',
    eyebrowVn: 'Mỗi tiết khoa học đều là tiết tiếng Anh',
    eyebrowFr: 'Les sciences, c’est aussi de l’anglais',
    title: 'From … To …',
    titleVn: 'Từ … sang …',
    titleFr: 'De … à …',
    text: 'Every change of state is a journey **from** one state **to** another.',
    textVn: 'Mỗi sự chuyển thể là một hành trình **từ (from)** trạng thái này **sang (to)** trạng thái khác.',
    textFr: 'Chaque changement d’état est un voyage **depuis (from)** un état **vers (to)** un autre.',
    sub: 'There are five words for these journeys. Today you learn all five — and the naming word that goes with each.',
    subVn: 'Có năm từ cho những hành trình này. Hôm nay em học cả năm — và danh từ đi kèm với mỗi từ.',
    subFr: 'Il y a cinq mots pour ces voyages. Aujourd’hui, tu apprends les cinq — et le nom qui va avec chacun.',
  },

  // ── Section 2: one change at a time, water all the way through ────────────
  {
    layout: 'split',
    accent: HEAT,
    icon: 'Droplets',
    eyebrow: 'Change 1 · solid → liquid · by heating',
    eyebrowVn: 'Chuyển thể 1 · rắn → lỏng · do đun nóng',
    eyebrowFr: 'Changement 1 · solide → liquide · à chaud',
    title: 'Melting',
    titleVn: 'Sự nóng chảy',
    titleFr: 'La fusion',
    ratio: 45,
    image: melt,
    content:
      'Leave ice in a warm place and it **melts** — it turns into liquid water. That is your puddle.\n\n' +
      'The temperature at which a solid melts is its **melting point**. For ice it is **0 degrees C**. Below that it is solid; above it, liquid.',
    contentVn:
      'Để đá ở nơi ấm thì nó **nóng chảy (melts)** — biến thành nước lỏng. Đó chính là vũng nước của em.\n\n' +
      'Nhiệt độ mà một chất rắn nóng chảy gọi là **nhiệt độ nóng chảy (melting point)**. Với nước đá là **0 độ C**. Dưới mức đó là rắn; trên mức đó là lỏng.',
    contentFr:
      'Laisse de la glace dans un endroit chaud et elle **fond (melts)** — elle devient de l’eau liquide. C’est ta flaque.\n\n' +
      'La température à laquelle un solide fond est son **point de fusion (melting point)**. Pour la glace, c’est **0 degré C**. En dessous, elle est solide ; au-dessus, liquide.',
    notes: [
      {
        tone: 'write',
        text: '**Melt:** to change from a **solid** to a **liquid** (by heating).\n**Melting point:** the temperature at which a solid melts. Ice melts at 0 degrees C.',
        textVn: '**Nóng chảy (melt):** chuyển từ **rắn** sang **lỏng** (do đun nóng).\n**Nhiệt độ nóng chảy (melting point):** nhiệt độ mà chất rắn nóng chảy. Nước đá nóng chảy ở 0 độ C.',
        textFr: '**Fondre (melt) :** passer de **solide** à **liquide** (en chauffant).\n**Point de fusion (melting point) :** la température à laquelle un solide fond. La glace fond à 0 degré C.',
      },
    ],
  },
  {
    layout: 'callout',
    accent: COOL,
    icon: 'Snowflake',
    eyebrow: 'Change 2 · liquid → solid · by cooling',
    eyebrowVn: 'Chuyển thể 2 · lỏng → rắn · do làm lạnh',
    eyebrowFr: 'Changement 2 · liquide → solide · à froid',
    title: 'Freezing Is Melting, Backwards',
    titleVn: 'Đông đặc là nóng chảy, đảo ngược',
    titleFr: 'Geler, c’est fondre à l’envers',
    content:
      'Put liquid water in the freezer and it **freezes** — it turns back into solid ice.\n\n' +
      'It is the exact **reverse** of melting: melting needs heat going **in**, freezing needs heat coming **out**. Same two states, opposite direction.',
    contentVn:
      'Cho nước lỏng vào ngăn đá thì nó **đông đặc (freezes)** — biến trở lại thành nước đá rắn.\n\n' +
      'Đây đúng là **quá trình ngược** của nóng chảy: nóng chảy cần nhiệt đi **vào**, đông đặc cần nhiệt đi **ra**. Cùng hai trạng thái, ngược chiều nhau.',
    contentFr:
      'Mets de l’eau au congélateur et elle **gèle** — elle redevient de la glace.\n\n' +
      'C’est l’**inverse** exact de la fusion : fondre demande de la chaleur qui **entre**, geler, de la chaleur qui **sort**. Mêmes deux états, sens opposé.',
    notes: [
      {
        tone: 'write',
        text: '**Freeze:** to change from a **liquid** to a **solid** (by cooling). Freezing is the reverse of melting.',
        textVn: '**Đông đặc (freeze):** chuyển từ **lỏng** sang **rắn** (do làm lạnh). Đông đặc là quá trình ngược của nóng chảy.',
        textFr: '**Geler (freeze) :** passer de **liquide** à **solide** (par le froid). C’est l’inverse de la fusion.',
      },
    ],
  },
  {
    layout: 'callout',
    accent: HEAT,
    icon: 'Wind',
    eyebrow: 'Change 3 · liquid → gas · slowly',
    eyebrowVn: 'Chuyển thể 3 · lỏng → khí · chậm',
    eyebrowFr: 'Changement 3 · liquide → gaz · lent',
    title: 'Where the Puddle Went',
    titleVn: 'Vũng nước đã đi đâu',
    titleFr: 'Où va la flaque ?',
    content:
      'Water on the ground slowly disappears. It changes into **water vapour** — an **invisible** gas. This slow change is **evaporation**.\n\n' +
      'The warmer the water, the faster it evaporates — it left as a gas you cannot see.',
    contentVn:
      'Nước trên mặt đất từ từ biến mất. Nó chuyển thành **hơi nước (water vapour)** — một chất khí **vô hình**. Sự thay đổi chậm này gọi là **sự bay hơi (evaporation)**.\n\n' +
      'Nước càng ấm thì bay hơi càng nhanh — nó rời đi dưới dạng một chất khí mà em không nhìn thấy.',
    contentFr:
      'L’eau au sol disparaît lentement. Elle devient de la **vapeur d’eau** — un gaz **invisible**. Ce changement lent, c’est l’**évaporation**.\n\n' +
      'Plus l’eau est chaude, plus elle s’évapore vite — sans qu’on la voie.',
    notes: [
      {
        tone: 'write',
        text: '**Evaporate:** to change from a **liquid** to a **gas**, slowly, from the surface. The gas is **water vapour** — you cannot see it. This slow change is **evaporation**.',
        textVn: '**Bay hơi (evaporate):** chuyển từ **lỏng** sang **khí**, một cách chậm rãi, ở bề mặt. Chất khí đó là **hơi nước (water vapour)** — em không nhìn thấy. Sự thay đổi chậm này là **sự bay hơi (evaporation)**.',
        textFr: '**S’évaporer (evaporate) :** passer de **liquide** à **gaz**, lentement, en surface. Ce gaz est la **vapeur d’eau (water vapour)** — invisible. C’est l’**évaporation**.',
      },
    ],
  },
  {
    layout: 'split',
    accent: HEAT,
    icon: 'Flame',
    eyebrow: 'Change 4 · liquid → gas · fast',
    eyebrowVn: 'Chuyển thể 4 · lỏng → khí · nhanh',
    eyebrowFr: 'Changement 4 · liquide → gaz · rapide',
    title: 'Boiling',
    titleVn: 'Sự sôi',
    titleFr: 'L’ébullition',
    ratio: 45,
    image: boil,
    content:
      'Heat water to **100 degrees C** and it **boils**: bubbles of gas form all through it and it changes rapidly to **steam**. Steam is water that has been heated until it turns into a gas.\n\n' +
      '100 degrees C is the **boiling point** of water. Look at the kettle — bubbling liquid below, gas escaping above.',
    contentVn:
      'Đun nước đến **100 độ C** thì nó **sôi (boils)**: các bọt khí hình thành khắp trong lòng nước và nó nhanh chóng chuyển thành **hơi (steam)**. Hơi là nước đã được đun nóng đến mức biến thành khí.\n\n' +
      '100 độ C là **nhiệt độ sôi (boiling point)** của nước. Hãy nhìn ấm nước — chất lỏng sủi bọt ở dưới, khí thoát ra ở trên.',
    contentFr:
      'Chauffe l’eau à **100 degrés C** : elle **bout**. Des bulles de gaz se forment partout, et elle devient vite de la **vapeur** — de l’eau chauffée jusqu’à l’état de gaz.\n\n' +
      'C’est le **point d’ébullition** de l’eau. Regarde la bouilloire : liquide qui bouillonne en bas, gaz qui s’échappe en haut.',
    notes: [
      {
        tone: 'write',
        text: '**Boil:** to change from a **liquid** to a **gas** quickly, all through the liquid. Water boils at its **boiling point**, 100 degrees C. The gas is **steam**.',
        textVn: '**Sôi (boil):** chuyển từ **lỏng** sang **khí** một cách nhanh chóng, khắp trong lòng chất lỏng. Nước sôi ở **nhiệt độ sôi (boiling point)** là 100 độ C. Chất khí đó là **hơi nước (steam)**.',
        textFr: '**Bouillir :** passer de **liquide** à **gaz** vite, dans tout le liquide. L’eau bout à 100 degrés C, son **point d’ébullition**. Gaz : **vapeur (steam)**.',
      },
    ],
  },
  {
    layout: 'compare',
    accent: PURPLE,
    icon: 'Scale',
    eyebrow: 'Two words, one journey — liquid to gas',
    eyebrowVn: 'Hai từ, một hành trình — lỏng sang khí',
    eyebrowFr: 'Deux mots, un voyage — de liquide à gaz',
    title: 'Evaporating or Boiling?',
    titleVn: 'Bay hơi hay sôi?',
    titleFr: 'Évaporation ou ébullition ?',
    columns: [
      {
        heading: 'Evaporating',
        headingVn: 'Bay hơi',
        headingFr: 'L’évaporation',
        accent: HEAT,
        icon: 'Wind',
        content:
          '**Slow.** Happens at **any** temperature.\n\nOnly at the **surface** of the liquid.\n\nNo bubbles. A puddle drying, wet clothes on a line, the sea feeding the clouds.',
        contentVn:
          '**Chậm.** Xảy ra ở **bất kỳ** nhiệt độ nào.\n\nChỉ ở **bề mặt** chất lỏng.\n\nKhông có bọt. Vũng nước khô đi, quần áo ướt phơi trên dây, biển cung cấp hơi cho mây.',
        contentFr:
          '**Lente.** Se produit à **n’importe quelle** température.\n\n' +
          'Seulement à la **surface** du liquide.\n\n' +
          'Pas de bulles. Une flaque qui sèche, du linge mouillé sur un fil, la mer qui nourrit les nuages.',
      },
      {
        heading: 'Boiling',
        headingVn: 'Sôi',
        headingFr: 'L’ébullition',
        accent: RED,
        icon: 'Flame',
        content:
          '**Fast.** Happens only at the **boiling point** (100 degrees C for water).\n\n**All through** the liquid, not just the top.\n\nBubbles everywhere. A kettle, a pot on the stove.',
        contentVn:
          '**Nhanh.** Chỉ xảy ra ở **nhiệt độ sôi** (100 độ C với nước).\n\n**Khắp trong lòng** chất lỏng, không chỉ ở mặt trên.\n\nBọt khắp nơi. Một ấm nước, một nồi trên bếp.',
        contentFr:
          '**Rapide.** Se produit seulement au **point d’ébullition** (100 degrés C pour l’eau).\n\n' +
          '**Dans tout** le liquide, pas seulement en haut.\n\n' +
          'Des bulles partout. Une bouilloire, une casserole sur le feu.',
      },
    ],
  },
  {
    layout: 'split',
    accent: COOL,
    icon: 'CloudFog',
    eyebrow: 'Change 5 · gas → liquid · by cooling',
    eyebrowVn: 'Chuyển thể 5 · khí → lỏng · do làm lạnh',
    eyebrowFr: 'Changement 5 · gaz → liquide · à froid',
    title: 'Condensation',
    titleVn: 'Sự ngưng tụ',
    titleFr: 'La condensation',
    ratio: 45,
    side: 'left',
    image: condense,
    content:
      'When water vapour or steam touches something **cold**, it **condenses** — it turns back into liquid water, in tiny drops. This is **condensation**.\n\n' +
      'You have seen it a hundred times: a cold drink that "sweats", the bathroom mirror after a shower, the window on a cold morning.',
    contentVn:
      'Khi hơi nước hoặc hơi chạm vào vật gì đó **lạnh**, nó **ngưng tụ (condenses)** — biến trở lại thành nước lỏng, thành những giọt nhỏ. Đây là **sự ngưng tụ (condensation)**.\n\n' +
      'Em đã thấy điều này cả trăm lần: một ly nước lạnh "đổ mồ hôi", tấm gương phòng tắm sau khi tắm, cửa sổ vào một buổi sáng lạnh.',
    contentFr:
      'Quand la vapeur touche quelque chose de **froid**, elle **se condense** — elle redevient liquide, en petites gouttes. C’est la **condensation**.\n\n' +
      'Tu l’as vu cent fois : une boisson froide qui « transpire », le miroir de la salle de bain après la douche, la vitre le matin.',
    notes: [
      {
        tone: 'write',
        text: '**Condense:** to change from a **gas** back to a **liquid** (by cooling). When water vapour touches something cold it condenses into drops. This change is **condensation**.',
        textVn: '**Ngưng tụ (condense):** chuyển từ **khí** trở lại thành **lỏng** (do làm lạnh). Khi hơi nước chạm vào vật lạnh, nó ngưng tụ thành các giọt. Sự thay đổi này là **sự ngưng tụ (condensation)**.',
        textFr: '**Se condenser (condense) :** repasser de **gaz** à **liquide** (en refroidissant). Au contact du froid, la vapeur d’eau se condense en gouttes. C’est la **condensation**.',
      },
    ],
  },

  // ── Section 3: the English that holds it together ────────────────────────
  {
    layout: 'split',
    accent: TEAL,
    icon: 'BookOpen',
    eyebrow: 'The two shapes of every science word',
    eyebrowVn: 'Hai dạng của mỗi từ khoa học',
    eyebrowFr: 'Les deux formes de chaque mot scientifique',
    title: 'One Change, Two Words',
    titleVn: 'Một sự thay đổi, hai từ',
    titleFr: 'Un changement, deux mots',
    ratio: 52,
    side: 'left',
    inlineSvg: DIAGRAMS.VERB_NOUN,
    content:
      'English gives every change of state **two** words. A **doing word** (a verb) — *the ice melts* — and a **naming word** (a noun) — *melting is a change of state*.\n\n' +
      'You **boil** the water; **boiling** is the change. Say the pair, not just one half.',
    contentVn:
      'Tiếng Anh cho mỗi sự chuyển thể **hai** từ. Một **động từ (doing word)** — *the ice melts* (đá nóng chảy) — và một **danh từ (naming word)** — *melting is a change of state* (sự nóng chảy là một sự chuyển thể).\n\n' +
      'Em **boil** nước; **boiling** là sự thay đổi. Hãy nói cả cặp, đừng chỉ một nửa.',
    contentFr:
      'L’anglais donne **deux** mots à chaque changement d’état. Un **verbe (doing word)** — *the ice melts* (la glace fond) — et un **nom (naming word)** — *melting is a change of state* (la fusion est un changement d’état).\n\n' +
      'Tu **boil** l’eau ; **boiling**, c’est le changement. Dis la paire, pas seulement une moitié.',
    notes: [
      {
        tone: 'write',
        text: 'Copy the five pairs: **melt → melting**, **freeze → freezing**, **boil → boiling**, **evaporate → evaporation**, **condense → condensation**.',
        textVn: 'Chép năm cặp: **melt → melting** (nóng chảy), **freeze → freezing** (đông đặc), **boil → boiling** (sôi), **evaporate → evaporation** (bay hơi), **condense → condensation** (ngưng tụ).',
        textFr: 'Recopie les cinq paires : **melt → melting** (fondre), **freeze → freezing** (geler), **boil → boiling** (bouillir), **evaporate → evaporation** (s’évaporer), **condense → condensation** (se condenser).',
      },
    ],
  },
  {
    layout: 'showcase',
    accent: HEAT,
    icon: 'Repeat',
    eyebrow: 'Rulers out — this is the sheet you keep',
    eyebrowVn: 'Lấy thước ra — đây là bảng em giữ lại',
    eyebrowFr: 'Sors ta règle — c’est la feuille que tu gardes',
    title: 'The Whole Section on One Diagram',
    titleVn: 'Cả bài gọn trong một sơ đồ',
    titleFr: 'Toute la partie sur un seul schéma',
    inlineSvg: DIAGRAMS.STATE_CYCLE,
    drawThis: true,
    caption: 'Rule up the three boxes and copy all five change words onto the arrows. Heating drives the changes to the right, cooling brings them back to the left. Six minutes.',
    captionVn: 'Kẻ ba ô và chép cả năm từ chuyển thể lên các mũi tên. Đun nóng đẩy các thay đổi sang phải, làm lạnh đưa chúng về trái. Sáu phút.',
    captionFr: 'Trace les trois cases et recopie les cinq mots de changement sur les flèches. Chauffer pousse les changements vers la droite, refroidir les ramène vers la gauche. Six minutes.',
  },

  // ── Section 4: use the words — the activity and a real-world check ────────
  {
    layout: 'split',
    accent: PURPLE,
    icon: 'Users',
    eyebrow: 'Learner’s Book, page 36 · Activity 2.2.1',
    eyebrowVn: 'Sách học sinh, trang 36 · Hoạt động 2.2.1',
    eyebrowFr: 'Livre de l’élève, page 36 · Activité 2.2.1',
    title: 'Which Change of State?',
    titleVn: 'Đây là sự chuyển thể nào?',
    titleFr: 'Quel changement d’état ?',
    ratio: 56,
    content:
      'Work in pairs. One of you holds up a **change** card — *melt, freeze, boil* or *condense*. The other lays out the answer with three cards: **from** [state] **to** [state].\n\n' +
      'Example: *freeze* is **from liquid to solid**. Then swap, so you both take turns.',
    contentVn:
      'Làm việc theo cặp. Một bạn giơ lên một thẻ **sự thay đổi** — *melt, freeze, boil* hoặc *condense*. Bạn kia sắp đáp án bằng ba thẻ: **from (từ)** [trạng thái] **to (sang)** [trạng thái].\n\n' +
      'Ví dụ: *freeze* là **from liquid to solid** (từ lỏng sang rắn). Rồi đổi vai để cả hai đều được luyện.',
    contentFr:
      'Travaille à deux. L’un montre une carte **changement** — *melt, freeze, boil* ou *condense*. L’autre pose la réponse avec trois cartes : **from (de)** [état] **to (à)** [état].\n\n' +
      'Exemple : *freeze*, c’est **from liquid to solid** (de liquide à solide). Puis on échange les rôles, pour que chacun ait son tour.',
    reveal: {
      label: 'Check all five',
      labelVn: 'Kiểm tra cả năm',
      labelFr: 'Vérifie les cinq',
      answer:
        '**melt** — from solid to liquid\n**freeze** — from liquid to solid\n**boil** — from liquid to gas\n**evaporate** — from liquid to gas\n**condense** — from gas to liquid',
      answerVn:
        '**melt** — từ rắn sang lỏng\n**freeze** — từ lỏng sang rắn\n**boil** — từ lỏng sang khí\n**evaporate** — từ lỏng sang khí\n**condense** — từ khí sang lỏng',
      answerFr:
        '**melt** — de solide à liquide\n' +
        '**freeze** — de liquide à solide\n' +
        '**boil** — de liquide à gaz\n' +
        '**evaporate** — de liquide à gaz\n' +
        '**condense** — de gaz à liquide',
    },
  },
  {
    layout: 'split',
    accent: TEAL,
    icon: 'HelpCircle',
    eyebrow: 'Name the change — full sentences, out loud',
    eyebrowVn: 'Gọi tên sự thay đổi — nói to, thành câu đầy đủ',
    eyebrowFr: 'Nomme le changement — phrases complètes, à voix haute',
    title: 'Spot It in Real Life',
    titleVn: 'Nhận ra nó trong đời thực',
    titleFr: 'Repère-le dans la vraie vie',
    ratio: 56,
    content:
      '> **1.** Wet clothes on a line dry in the sun.\n' +
      '> **2.** Drops of water appear on the outside of a cold bottle.\n' +
      '> **3.** A puddle turns to ice overnight.\n' +
      '> **4.** A chocolate bar goes soft and runny in your hand.\n\n' +
      'For each one: which change of state is it? Answer in a full sentence — *“This is …”*.',
    contentVn:
      '> **1.** Quần áo ướt trên dây phơi khô dưới nắng.\n' +
      '> **2.** Các giọt nước xuất hiện ở mặt ngoài một chai lạnh.\n' +
      '> **3.** Một vũng nước đóng thành băng qua đêm.\n' +
      '> **4.** Một thanh sô-cô-la mềm ra và chảy trong tay em.\n\n' +
      'Với mỗi tình huống: đó là sự chuyển thể nào? Trả lời bằng một câu đầy đủ — *“This is …”*.',
    contentFr:
      '> **1.** Du linge mouillé sèche au soleil sur un fil.\n' +
      '> **2.** Des gouttes d’eau apparaissent sur une bouteille froide.\n' +
      '> **3.** Une flaque devient de la glace pendant la nuit.\n' +
      '> **4.** Une barre de chocolat devient molle et coulante dans ta main.\n\n' +
      'Pour chacun : quel changement d’état est-ce ? Réponds par une phrase complète — *“This is …”*.',
    reveal: {
      label: 'Check',
      labelVn: 'Kiểm tra',
      labelFr: 'Vérifie',
      answer:
        '**1.** Evaporation — the water changes from a liquid to a gas.\n**2.** Condensation — water vapour in the air cools on the cold bottle and turns to liquid.\n**3.** Freezing — the water changes from a liquid to a solid.\n**4.** Melting — the chocolate changes from a solid to a liquid.',
      answerVn:
        '**1.** Bay hơi — nước chuyển từ lỏng sang khí.\n**2.** Ngưng tụ — hơi nước trong không khí gặp lạnh trên chai và biến thành lỏng.\n**3.** Đông đặc — nước chuyển từ lỏng sang rắn.\n**4.** Nóng chảy — sô-cô-la chuyển từ rắn sang lỏng.',
      answerFr:
        '**1.** Évaporation — l’eau passe de liquide à gaz.\n' +
        '**2.** Condensation — la vapeur d’eau de l’air refroidit sur la bouteille froide et devient liquide.\n' +
        '**3.** Solidification — l’eau passe de liquide à solide.\n' +
        '**4.** Fusion — le chocolat passe de solide à liquide.',
    },
  },

  // ── Section 5: recap and homework ────────────────────────────────────────
  {
    layout: 'stack',
    variant: 'checklist',
    accent: TEAL,
    icon: 'CheckCircle2',
    columns: 2,
    eyebrow: 'Before you leave',
    eyebrowVn: 'Trước khi ra về',
    eyebrowFr: 'Avant de partir',
    title: 'Can You Do All Five?',
    titleVn: 'Em làm được cả năm điều này chứ?',
    titleFr: 'Sais-tu faire les cinq ?',
    content:
      '> Your notebook should now have **change of state**, the **five change words with their from → to**, and **one labelled cycle diagram**. Check.',
    contentVn:
      '> Trong vở của em bây giờ phải có **sự chuyển thể**, **năm từ chuyển thể kèm from → to**, và **một sơ đồ vòng có ghi nhãn**. Hãy kiểm tra.',
    contentFr:
      '> Ton cahier doit maintenant contenir **changement d’état**, les **cinq mots de changement avec leur from → to**, et **un schéma du cycle légendé**. Vérifie.',
    items: [
      { text: 'Name the **five changes of state**.', textVn: 'Kể tên **năm sự chuyển thể**.', textFr: 'Nomme les **cinq changements d’état**.' },
      { text: 'Give the **doing word** and the **naming word** for each.', textVn: 'Nêu **động từ** và **danh từ** cho mỗi sự thay đổi.', textFr: 'Donne le **verbe** et le **nom** de chacun.' },
      { text: 'Say each change as **from [state] to [state]**.', textVn: 'Nói mỗi sự thay đổi là **from [trạng thái] to [trạng thái]**.', textFr: 'Dis chaque changement sous la forme **from [état] to [état]**.' },
      { text: 'Explain the difference between **evaporating** and **boiling**.', textVn: 'Giải thích sự khác nhau giữa **bay hơi** và **sôi**.', textFr: 'Explique la différence entre **évaporation** et **ébullition**.' },
      { text: 'Give the **melting point** and **boiling point** of water.', textVn: 'Nêu **nhiệt độ nóng chảy** và **nhiệt độ sôi** của nước.', textFr: 'Donne le **point de fusion** et le **point d’ébullition** de l’eau.' },
      { text: 'Explain what **water vapour** is, and why you cannot see it.', textVn: 'Giải thích **hơi nước** là gì, và vì sao em không nhìn thấy nó.', textFr: 'Explique ce qu’est la **vapeur d’eau**, et pourquoi tu ne peux pas la voir.' },
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
    contentFr: 'Emporte ton cahier de sciences. Deux tâches courtes.',
    notes: [
      {
        tone: 'homework',
        badge: 'Find it at home',
        badgeVn: 'Tìm ở nhà',
        badgeFr: 'Trouve chez toi',
        icon: 'Home',
        text: 'Find **one real example of each change of state** in your home. Write one sentence for each, saying **from** which state **to** which.',
        textVn: 'Tìm **một ví dụ thật cho mỗi sự chuyển thể** ở nhà em. Viết một câu cho mỗi cái, nói rõ **từ (from)** trạng thái nào **sang (to)** trạng thái nào.',
        textFr: 'Trouve chez toi **un vrai exemple de chaque changement d’état**. Une phrase pour chacun : **de** quel état **à** quel état.',
      },
      {
        tone: 'homework',
        badge: 'Reading Task',
        badgeVn: 'Bài đọc',
        badgeFr: 'Lecture',
        icon: 'BookOpen',
        text: 'Read Unit 2.2, **pages 37 to 38** — measuring volume and temperature. That is where we start next time.',
        textVn: 'Đọc Bài 2.2, **trang 37 đến 38** — đo thể tích và nhiệt độ. Đó là chỗ chúng ta bắt đầu tiết sau.',
        textFr: 'Lis l’unité 2.2, **pages 37 à 38** — mesurer volume et température. On part de là au prochain cours.',
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
    subtitle: 'You can name every change of state and say it as **from one state to another**. Exit question: the bathroom mirror goes **foggy** when you shower, then slowly **clears** again. Name the **two** changes of state, in order.',
    subtitleVn: 'Em gọi được tên mọi sự chuyển thể và nói được nó là **từ trạng thái này sang trạng thái khác**. Câu hỏi ra về: tấm gương phòng tắm bị **mờ hơi nước** khi em tắm, rồi từ từ **trong trở lại**. Hãy gọi tên **hai** sự chuyển thể, theo thứ tự.',
    subtitleFr: 'Tu sais nommer chaque changement d’état et le dire comme un passage **d’un état à un autre**. Question de sortie : le miroir de la salle de bain devient **embué** quand tu te douches, puis **redevient clair** lentement. Nomme les **deux** changements d’état, dans l’ordre.',
  },
]
