// Upper Secondary English Unit 1: Complete Sentences. Brought over from the Dashboard's
// GED English Grammar Foundations 4 (GED_ENG/ENG_4, Sentence Boundaries) on 14 November
// 2026: the lesson, key words, grammar edits, Find & Fix passages and quiz, with the GED
// framing taken out. Built for a Vietnamese speaker, whose first language chains clauses
// with commas: "a comma cannot hold two sentences together".
//
// `writing` is the unit's timed writing task (unit/app/writing/WritingTask.jsx): the
// kind of writing, the time (30 minutes at the least), the length, the grammar the
// marker looks hard for, and a bank of prompts. Prompts keep their ids once used.
import { assessment } from './assessment.js';
import { notes } from './notes.js';

export const U01_DATA = {
  meta: {
    id: "U01",
    title: "Complete Sentences",
    titleVn: "Câu hoàn chỉnh",
    desc: "Know what a complete sentence needs, spot fragments, run-ons and comma splices, and fix each one: a full stop, a semicolon, a comma + conjunction, or a subordinator.",
    track: "UPPER_ENG",
    icon: "Scissors",
    audio: false
  },
  realWords: [
    {
      word: "Fragment",
      vn: "Câu cụt",
      def: "A group of words that is punctuated like a sentence but is not complete.",
      vnDef: "Một nhóm từ được chấm câu như một câu nhưng không hoàn chỉnh.",
      sent: "\"Because the bus was late\" is a fragment, not a sentence.",
      vnSent: "\"Because the bus was late\" là một câu cụt, không phải một câu hoàn chỉnh.",
      isReal: true
    },
    {
      word: "Clause",
      vn: "Mệnh đề",
      def: "A group of words that has a subject and a verb.",
      vnDef: "Một nhóm từ có chủ ngữ và động từ.",
      sent: "Every clause has a subject and a verb.",
      vnSent: "Mỗi mệnh đề đều có một chủ ngữ và một động từ.",
      isReal: true
    },
    {
      word: "Independent",
      vn: "Độc lập",
      def: "Describing a clause that can stand alone as a full sentence.",
      vnDef: "Mô tả một mệnh đề có thể đứng một mình như một câu hoàn chỉnh.",
      sent: "An independent clause makes sense on its own.",
      vnSent: "Một mệnh đề độc lập tự nó đã có nghĩa.",
      isReal: true
    },
    {
      word: "Dependent",
      vn: "Phụ thuộc",
      def: "Describing a clause that cannot stand alone because it starts with a word like because or although.",
      vnDef: "Mô tả một mệnh đề không thể đứng một mình vì nó bắt đầu bằng từ như because hoặc although.",
      sent: "A dependent clause needs an independent clause to lean on.",
      vnSent: "Một mệnh đề phụ thuộc cần một mệnh đề độc lập để dựa vào.",
      isReal: true
    },
    {
      word: "Run-on",
      vn: "Câu chạy dài",
      def: "Two complete sentences pushed together with nothing between them.",
      vnDef: "Hai câu hoàn chỉnh bị ghép lại mà không có gì ở giữa.",
      sent: "\"It rained we stayed home\" is a run-on.",
      vnSent: "\"It rained we stayed home\" là một câu chạy dài.",
      isReal: true
    },
    {
      word: "Splice",
      vn: "Lỗi nối bằng dấu phẩy",
      def: "The error of joining two complete sentences with only a comma.",
      vnDef: "Lỗi nối hai câu hoàn chỉnh chỉ bằng một dấu phẩy.",
      sent: "A comma splice needs a full stop, a semicolon or a conjunction to fix it.",
      vnSent: "Một lỗi nối bằng dấu phẩy cần dấu chấm, dấu chấm phẩy hoặc liên từ để sửa.",
      isReal: true
    },
    {
      word: "Conjunction",
      vn: "Liên từ",
      def: "A joining word such as and, but, so or because.",
      vnDef: "Một từ dùng để nối như and, but, so hoặc because.",
      sent: "The conjunction so shows a result.",
      vnSent: "Liên từ so chỉ một kết quả.",
      isReal: true
    },
    {
      word: "Subordinator",
      vn: "Từ nối phụ thuộc",
      def: "A word such as because, although or when that makes a clause dependent.",
      vnDef: "Một từ như because, although hoặc when làm cho một mệnh đề trở nên phụ thuộc.",
      sent: "Adding the subordinator although turns a sentence into a dependent clause.",
      vnSent: "Thêm từ nối phụ thuộc although biến một câu thành mệnh đề phụ thuộc.",
      isReal: true
    },
    {
      word: "Semicolon",
      vn: "Dấu chấm phẩy",
      def: "The mark ; that can join two closely related complete sentences.",
      vnDef: "Dấu ; có thể nối hai câu hoàn chỉnh có liên quan chặt chẽ.",
      sent: "A semicolon joins two complete ideas without a conjunction.",
      vnSent: "Dấu chấm phẩy nối hai ý hoàn chỉnh mà không cần liên từ.",
      isReal: true
    },
    {
      word: "Boundary",
      vn: "Ranh giới",
      def: "The place where one sentence ends and the next begins.",
      vnDef: "Nơi một câu kết thúc và câu tiếp theo bắt đầu.",
      sent: "A full stop marks the boundary between two sentences.",
      vnSent: "Dấu chấm đánh dấu ranh giới giữa hai câu.",
      isReal: true
    }
  ],
  passages: [
    {
      id: "passage_1",
      title: "What a Sentence Needs",
      vnTitle: "Một câu cần những gì",
      text: "A complete sentence has a subject, a verb and a complete idea. A group of words that is missing one of these is a {fragment}. Every {clause} has a subject and a verb, but only an {independent} clause can stand alone. A {dependent} clause starts with a word like because or although and needs another clause to finish the idea.",
      vnText: "Một câu hoàn chỉnh có chủ ngữ, động từ và một ý trọn vẹn. Một nhóm từ thiếu một trong những thứ này là câu cụt. Mỗi mệnh đề đều có chủ ngữ và động từ, nhưng chỉ mệnh đề độc lập mới có thể đứng một mình. Mệnh đề phụ thuộc bắt đầu bằng từ như because hoặc although và cần một mệnh đề khác để hoàn thành ý."
    },
    {
      id: "passage_2",
      title: "Two Sentences, One Space",
      vnTitle: "Hai câu, một khoảng trống",
      text: "When two complete sentences run together with nothing between them, the result is a {run-on}. When only a comma sits between them, the error is called a comma {splice}. Both errors happen at the {boundary} between two ideas, and both are fixed in the same four ways.",
      vnText: "Khi hai câu hoàn chỉnh chạy liền nhau mà không có gì ở giữa, kết quả là một câu chạy dài. Khi chỉ có một dấu phẩy nằm giữa chúng, lỗi đó gọi là lỗi nối bằng dấu phẩy. Cả hai lỗi đều xảy ra ở ranh giới giữa hai ý, và cả hai đều được sửa bằng cùng bốn cách."
    },
    {
      id: "passage_3",
      title: "Four Ways to Fix It",
      vnTitle: "Bốn cách sửa",
      text: "You can fix a run-on with a full stop, so the two ideas become two sentences. You can use a {semicolon} when the ideas are closely linked. You can add a comma and a {conjunction} such as and, but or so. Or you can add a {subordinator} such as because, although or when, which makes one clause depend on the other.",
      vnText: "Bạn có thể sửa câu chạy dài bằng dấu chấm, để hai ý trở thành hai câu. Bạn có thể dùng dấu chấm phẩy khi hai ý liên quan chặt chẽ. Bạn có thể thêm dấu phẩy và một liên từ như and, but hoặc so. Hoặc bạn có thể thêm một từ nối phụ thuộc như because, although hoặc when, làm cho một mệnh đề phụ thuộc vào mệnh đề kia."
    }
  ],
  grammarEdit: [
    {
      id: "ge1",
      title: "The Night Shift",
      titleVn: "Ca đêm",
      passage: "Dao works the night shift at the [[b1]] sleeps during the day. Her neighbours are noisy in the [[b2]] wears earplugs. [[b3]] she wakes up at six, she eats a quick meal and takes the bus. The ward is quiet at [[b4]] nurses still check every patient. She likes the [[b5]] the hours are hard.",
      blanks: [
        {
          id: "b1",
          options: ["hospital, so she", "hospital, she", "hospital she"],
          correct: "hospital, so she",
          expEn: "\"Dao works the night shift\" and \"she sleeps during the day\" are two complete sentences. A comma alone is a splice and nothing at all is a run-on; a comma + so joins them correctly.",
          expVn: "\"Dao works the night shift\" và \"she sleeps during the day\" là hai câu hoàn chỉnh. Chỉ dấu phẩy là lỗi splice, không có gì là run-on; dấu phẩy + so nối chúng đúng cách."
        },
        {
          id: "b2",
          options: ["afternoon. She", "afternoon, she", "afternoon she"],
          correct: "afternoon. She",
          expEn: "Two complete ideas need a real boundary. A full stop and a capital letter is the simplest fix; a comma alone is a splice.",
          expVn: "Hai ý hoàn chỉnh cần một ranh giới thật sự. Dấu chấm và chữ hoa là cách sửa đơn giản nhất; chỉ dấu phẩy là lỗi splice."
        },
        {
          id: "b3",
          options: ["When", "Although", "So"],
          correct: "When",
          expEn: "The subordinator must match the meaning: she eats at the time she wakes up, so \"When\". \"Although\" shows contrast, and \"So\" would leave a comma splice.",
          expVn: "Từ nối phụ thuộc phải hợp nghĩa: cô ấy ăn vào lúc thức dậy, nên dùng \"When\". \"Although\" chỉ sự tương phản, còn \"So\" sẽ để lại lỗi nối bằng dấu phẩy."
        },
        {
          id: "b4",
          options: ["midnight, but the", "midnight, the", "midnight the"],
          correct: "midnight, but the",
          expEn: "Quiet ward, but the nurses still check: a contrast between two complete ideas takes a comma + but. A comma alone is a splice.",
          expVn: "Khoa yên tĩnh, nhưng y tá vẫn kiểm tra: sự tương phản giữa hai ý hoàn chỉnh dùng dấu phẩy + but. Chỉ dấu phẩy là lỗi splice."
        },
        {
          id: "b5",
          options: ["work although", "work because", "work so"],
          correct: "work although",
          expEn: "She likes the work even though the hours are hard: a contrast, so \"although\". \"Because\" would say the hard hours are the reason she likes it, and \"so\" makes no sense.",
          expVn: "Cô ấy thích công việc dù giờ giấc khó khăn: sự tương phản, nên dùng \"although\". \"Because\" sẽ nói giờ giấc khó là lý do cô thích, còn \"so\" thì vô nghĩa."
        }
      ]
    },
    {
      id: "ge2",
      title: "The Morning Market",
      titleVn: "Chợ buổi sáng",
      passage: "The market near our house opens at dawn. [[b1]] the freshest fish is gone by eight, my mother goes early. The vendors know her [[b2]] give her a good price. [[b3]] She likes the noise and the colours. At the far end of the market, an old man [[b4]] tea from a small cart. My mother always stops there for a [[b5]] she walks home.",
      blanks: [
        {
          id: "b1",
          options: ["Because", "Because of", "So"],
          correct: "Because",
          expEn: "\"Because\" + a clause (the freshest fish is gone) makes a dependent clause that leans on \"my mother goes early\". \"Because of\" needs a noun, not a clause, and \"So\" would leave two complete sentences with only a comma.",
          expVn: "\"Because\" + một mệnh đề (the freshest fish is gone) tạo mệnh đề phụ thuộc dựa vào \"my mother goes early\". \"Because of\" cần một danh từ, không phải mệnh đề, còn \"So\" sẽ để lại hai câu hoàn chỉnh chỉ với một dấu phẩy."
        },
        {
          id: "b2",
          options: ["well and", "well, they", "well they"],
          correct: "well and",
          expEn: "One subject (the vendors) with two verbs (know, give) needs only \"and\". Adding a new subject with a comma makes a splice; with nothing, a run-on.",
          expVn: "Một chủ ngữ (the vendors) với hai động từ (know, give) chỉ cần \"and\". Thêm chủ ngữ mới với dấu phẩy là lỗi splice; không có gì là run-on."
        },
        {
          id: "b3",
          options: ["My mother enjoys the market.", "Although my mother enjoys the market.", "My mother enjoying the market."],
          correct: "My mother enjoys the market.",
          expEn: "Only the first has a subject, a real verb and a complete idea. \"Although …\" is a dependent clause left alone, and \"enjoying\" is not a full verb — both are fragments.",
          expVn: "Chỉ câu đầu có chủ ngữ, động từ thật và ý trọn vẹn. \"Although …\" là mệnh đề phụ thuộc bị bỏ một mình, và \"enjoying\" không phải động từ đầy đủ — cả hai đều là câu cụt."
        },
        {
          id: "b4",
          options: ["sells", "selling", "who sells"],
          correct: "sells",
          expEn: "The sentence needs a real verb for \"an old man\". \"Selling\" alone and \"who sells\" both leave the sentence without a main verb — a missing-verb fragment.",
          expVn: "Câu cần một động từ thật cho \"an old man\". \"Selling\" một mình và \"who sells\" đều để câu không có động từ chính — câu cụt thiếu động từ."
        },
        {
          id: "b5",
          options: ["cup before", "cup. Before", "cup. When"],
          correct: "cup before",
          expEn: "\"Before she walks home\" is a dependent clause, so it must stay attached to the sentence. Cut off by a full stop, it becomes a fragment.",
          expVn: "\"Before she walks home\" là mệnh đề phụ thuộc, nên nó phải gắn liền với câu. Bị cắt bằng dấu chấm, nó trở thành câu cụt."
        }
      ]
    },
    {
      id: "ge3",
      title: "The Job Application",
      titleVn: "Đơn xin việc",
      passage: "Minh wanted the job at the [[b1]] filled in the form the same day. The form asked for two [[b2]] wrote down his old manager and his teacher. [[b3]] the interview went well, he did not get the job. The company hired someone with a forklift [[b4]] decided to get one too. He starts the course next [[b5]] cousin will drive him there.",
      blanks: [
        {
          id: "b1",
          options: ["warehouse, so he", "warehouse, he", "warehouse he"],
          correct: "warehouse, so he",
          expEn: "Wanting the job is the reason he filled in the form: two complete ideas joined by a comma + so. A comma alone is a splice.",
          expVn: "Muốn có việc là lý do anh điền đơn: hai ý hoàn chỉnh nối bằng dấu phẩy + so. Chỉ dấu phẩy là lỗi splice."
        },
        {
          id: "b2",
          options: ["references; he", "references, he", "references he"],
          correct: "references; he",
          expEn: "Two closely linked complete sentences can be joined by a semicolon. A comma alone is a splice; nothing at all is a run-on.",
          expVn: "Hai câu hoàn chỉnh liên quan chặt chẽ có thể nối bằng dấu chấm phẩy. Chỉ dấu phẩy là lỗi splice; không có gì là run-on."
        },
        {
          id: "b3",
          options: ["Although", "Because", "So"],
          correct: "Although",
          expEn: "A good interview but no job is a contrast, so \"Although\". \"Because\" gives the wrong reason, and \"So\" leaves a comma splice.",
          expVn: "Phỏng vấn tốt nhưng không được nhận là sự tương phản, nên dùng \"Although\". \"Because\" đưa ra lý do sai, còn \"So\" để lại lỗi nối bằng dấu phẩy."
        },
        {
          id: "b4",
          options: ["licence. Minh", "licence, Minh", "licence Minh"],
          correct: "licence. Minh",
          expEn: "The company's choice and Minh's decision are two complete sentences. A full stop is a clean boundary; a comma alone is a splice.",
          expVn: "Lựa chọn của công ty và quyết định của Minh là hai câu hoàn chỉnh. Dấu chấm là ranh giới rõ ràng; chỉ dấu phẩy là lỗi splice."
        },
        {
          id: "b5",
          options: ["month, and his", "month, his", "month his"],
          correct: "month, and his",
          expEn: "\"He starts the course\" and \"his cousin will drive him\" are both complete, so they need a comma + and. A comma alone is a splice.",
          expVn: "\"He starts the course\" và \"his cousin will drive him\" đều hoàn chỉnh, nên cần dấu phẩy + and. Chỉ dấu phẩy là lỗi splice."
        }
      ]
    },
    {
      id: "ge4",
      title: "Rules at the Pool",
      titleVn: "Nội quy hồ bơi",
      passage: "[[b1]] Children under eight must stay with an adult. The deep end is closed on [[b2]] lifeguard cleans the filters. [[b3]] Towels are available at the desk. Food is not allowed near the [[b4]] may eat on the grass. The pool closes at nine in summer. [[b5]]",
      blanks: [
        {
          id: "b1",
          options: ["The pool is open every day.", "Although the pool is open every day.", "The pool open every day."],
          correct: "The pool is open every day.",
          expEn: "A notice still needs complete sentences. \"Although …\" is a dependent clause on its own, and \"The pool open\" has no real verb.",
          expVn: "Một bảng thông báo vẫn cần câu hoàn chỉnh. \"Although …\" là mệnh đề phụ thuộc đứng một mình, còn \"The pool open\" không có động từ thật."
        },
        {
          id: "b2",
          options: ["Mondays because the", "Mondays, the", "Mondays the"],
          correct: "Mondays because the",
          expEn: "Cleaning the filters is the reason the deep end is closed: \"because\" joins the two ideas. A comma alone is a splice; nothing is a run-on.",
          expVn: "Vệ sinh bộ lọc là lý do đóng khu nước sâu: \"because\" nối hai ý. Chỉ dấu phẩy là lỗi splice; không có gì là run-on."
        },
        {
          id: "b3",
          options: ["Please shower before you swim.", "Before you swim.", "Showering before you swim."],
          correct: "Please shower before you swim.",
          expEn: "\"Please shower\" is a complete instruction with a verb. \"Before you swim\" is a dependent clause alone, and \"Showering\" is not a full verb.",
          expVn: "\"Please shower\" là một chỉ dẫn hoàn chỉnh có động từ. \"Before you swim\" là mệnh đề phụ thuộc đứng một mình, còn \"Showering\" không phải động từ đầy đủ."
        },
        {
          id: "b4",
          options: ["water, but you", "water, you", "water you"],
          correct: "water, but you",
          expEn: "Not near the water, but on the grass: a contrast between two complete ideas needs a comma + but.",
          expVn: "Không gần nước, nhưng trên bãi cỏ: sự tương phản giữa hai ý hoàn chỉnh cần dấu phẩy + but."
        },
        {
          id: "b5",
          options: ["It closes at seven in winter.", "Closing at seven in winter.", "Which closes at seven in winter."],
          correct: "It closes at seven in winter.",
          expEn: "Only \"It closes …\" has a subject and a full verb. \"Closing …\" and \"Which closes …\" cannot stand alone — both are fragments.",
          expVn: "Chỉ \"It closes …\" có chủ ngữ và động từ đầy đủ. \"Closing …\" và \"Which closes …\" không thể đứng một mình — cả hai đều là câu cụt."
        }
      ]
    }
  ],
  proofread: [
    {
      id: "pf1",
      title: "The Late Delivery",
      titleVn: "Chuyến giao hàng muộn",
      passage: "Our shop ordered fifty boxes of paper last Monday, the delivery was supposed to arrive on Wednesday. It did not come. When I called the supplier on Thursday. A woman said that the driver had the wrong address. She promised a new delivery on Friday, she also gave us a small discount. The boxes finally arrived at noon on Friday my manager was relieved. The paper is now on the shelves, and the customers is happy again.",
      errors: [
        {
          id: "e1",
          wrong: "Monday, the delivery",
          right: "Monday, but the delivery",
          accept: ["Monday. The delivery", "Monday; the delivery", "Monday, and the delivery"],
          kind: "Comma splice",
          expEn: "Two complete sentences are joined by only a comma. Add a conjunction (but / and), a semicolon, or a full stop.",
          expVn: "Hai câu hoàn chỉnh chỉ được nối bằng một dấu phẩy. Hãy thêm liên từ (but / and), dấu chấm phẩy, hoặc dấu chấm."
        },
        {
          id: "e2",
          wrong: "Thursday. A woman",
          right: "Thursday, a woman",
          accept: [],
          kind: "Fragment",
          expEn: "\"When I called the supplier on Thursday\" is a dependent clause and cannot stand alone. Join it to the next sentence with a comma.",
          expVn: "\"When I called the supplier on Thursday\" là mệnh đề phụ thuộc và không thể đứng một mình. Hãy nối nó với câu tiếp theo bằng dấu phẩy."
        },
        {
          id: "e3",
          wrong: "Friday, she also",
          right: "Friday, and she also",
          accept: ["Friday. She also", "Friday; she also"],
          kind: "Comma splice",
          expEn: "\"She promised …\" and \"she also gave …\" are both complete sentences. A comma alone cannot hold them together; add \"and\" or use a full stop.",
          expVn: "\"She promised …\" và \"she also gave …\" đều là câu hoàn chỉnh. Chỉ dấu phẩy không thể giữ chúng lại; hãy thêm \"and\" hoặc dùng dấu chấm."
        },
        {
          id: "e4",
          wrong: "Friday my manager",
          right: "Friday, and my manager",
          accept: ["Friday. My manager", "Friday; my manager", "Friday, so my manager"],
          kind: "Run-on",
          expEn: "Two complete sentences run together with nothing between them. Put a boundary there: a full stop, a semicolon, or a comma + and / so.",
          expVn: "Hai câu hoàn chỉnh chạy liền nhau không có gì ở giữa. Hãy đặt ranh giới: dấu chấm, dấu chấm phẩy, hoặc dấu phẩy + and / so."
        },
        {
          id: "e5",
          wrong: "customers is happy",
          right: "customers are happy",
          accept: [],
          kind: "Subject-verb agreement",
          expEn: "\"The customers\" is plural, so the verb is \"are\", not \"is\".",
          expVn: "\"The customers\" là số nhiều, nên động từ là \"are\", không phải \"is\"."
        }
      ]
    },
    {
      id: "pf2",
      title: "Learning to Drive",
      titleVn: "Học lái xe",
      passage: "My sister started driving lessons in June. Because she wants to drive to her new job. Her instructor is patient, he never shouts when she stalls the car. At first she was nervous about the roundabout near the station, now she goes around it without thinking. Last week she practised parking for an hour her instructor said she was ready for the test. The test are on the twentieth. If she passes, she will buy a small used car, her uncle has already found one for her.",
      errors: [
        {
          id: "e1",
          wrong: "June. Because",
          right: "June because",
          accept: ["June, because"],
          kind: "Fragment",
          expEn: "\"Because she wants to drive to her new job\" is a dependent clause left on its own. Attach it to the sentence before it.",
          expVn: "\"Because she wants to drive to her new job\" là mệnh đề phụ thuộc bị bỏ một mình. Hãy gắn nó vào câu trước."
        },
        {
          id: "e2",
          wrong: "patient, he never",
          right: "patient; he never",
          accept: ["patient. He never", "patient, and he never", "patient, so he never"],
          kind: "Comma splice",
          expEn: "\"Her instructor is patient\" and \"he never shouts\" are two complete sentences. A comma alone is a splice; use a semicolon, a full stop, or a comma + and.",
          expVn: "\"Her instructor is patient\" và \"he never shouts\" là hai câu hoàn chỉnh. Chỉ dấu phẩy là lỗi splice; hãy dùng dấu chấm phẩy, dấu chấm, hoặc dấu phẩy + and."
        },
        {
          id: "e3",
          wrong: "station, now she",
          right: "station, but now she",
          accept: ["station. Now she", "station; now she"],
          kind: "Comma splice",
          expEn: "Nervous at first, confident now — two complete ideas in contrast. They need a comma + but, or a full stop.",
          expVn: "Lúc đầu lo lắng, bây giờ tự tin — hai ý hoàn chỉnh tương phản. Chúng cần dấu phẩy + but, hoặc dấu chấm."
        },
        {
          id: "e4",
          wrong: "hour her instructor",
          right: "hour, and her instructor",
          accept: ["hour. Her instructor", "hour; her instructor"],
          kind: "Run-on",
          expEn: "Two complete sentences with nothing between them. Add a full stop, a semicolon, or a comma + and.",
          expVn: "Hai câu hoàn chỉnh không có gì ở giữa. Hãy thêm dấu chấm, dấu chấm phẩy, hoặc dấu phẩy + and."
        },
        {
          id: "e5",
          wrong: "test are on",
          right: "test is on",
          accept: [],
          kind: "Subject-verb agreement",
          expEn: "\"The test\" is one thing, so the verb is \"is\".",
          expVn: "\"The test\" là một thứ, nên động từ là \"is\"."
        },
        {
          id: "e6",
          wrong: "car, her uncle",
          right: "car; her uncle",
          accept: ["car. Her uncle", "car, and her uncle"],
          kind: "Comma splice",
          expEn: "\"She will buy a small used car\" and \"her uncle has already found one\" are both complete. A comma alone cannot join them.",
          expVn: "\"She will buy a small used car\" và \"her uncle has already found one\" đều hoàn chỉnh. Chỉ dấu phẩy không thể nối chúng."
        }
      ]
    },
    {
      id: "pf3",
      title: "The Community Kitchen",
      titleVn: "Bếp ăn cộng đồng",
      passage: "Every Sunday a group of volunteers cooks lunch at the community centre. The kitchen is small, the team still manages to feed eighty people. The cooks preparing rice, vegetables and hot soup. The food is simple but good. Although the centre gives them a little money for ingredients. Most of the vegetables come from a local farm the farmer delivers them on Saturday evening. After lunch, everyone helps to wash up, then the hall is ready for the evening class. The volunteers have ran this kitchen for six years.",
      errors: [
        {
          id: "e1",
          wrong: "small, the team",
          right: "small, but the team",
          accept: ["small. The team", "small; the team"],
          kind: "Comma splice",
          expEn: "A small kitchen but eighty people fed: two complete ideas in contrast need a comma + but, not a comma alone.",
          expVn: "Bếp nhỏ nhưng nuôi tám mươi người: hai ý hoàn chỉnh tương phản cần dấu phẩy + but, không phải chỉ dấu phẩy."
        },
        {
          id: "e2",
          wrong: "cooks preparing",
          right: "cooks prepare",
          accept: ["cooks are preparing"],
          kind: "Missing-verb fragment",
          expEn: "\"Preparing\" on its own is not a full verb, so the sentence has a subject but no real verb. Use \"prepare\" (or \"are preparing\").",
          expVn: "\"Preparing\" một mình không phải động từ đầy đủ, nên câu có chủ ngữ nhưng không có động từ thật. Dùng \"prepare\" (hoặc \"are preparing\")."
        },
        {
          id: "e3",
          wrong: "ingredients. Most",
          right: "ingredients, most",
          accept: [],
          kind: "Fragment",
          expEn: "\"Although the centre gives them a little money for ingredients\" cannot stand alone. Join it to the next sentence with a comma.",
          expVn: "\"Although the centre gives them a little money for ingredients\" không thể đứng một mình. Hãy nối nó với câu tiếp theo bằng dấu phẩy."
        },
        {
          id: "e4",
          wrong: "farm the farmer",
          right: "farm, and the farmer",
          accept: ["farm. The farmer", "farm; the farmer"],
          kind: "Run-on",
          expEn: "Two complete sentences run together. Add a full stop, a semicolon, or a comma + and.",
          expVn: "Hai câu hoàn chỉnh chạy liền nhau. Hãy thêm dấu chấm, dấu chấm phẩy, hoặc dấu phẩy + and."
        },
        {
          id: "e5",
          wrong: "up, then the hall",
          right: "up, and then the hall",
          accept: ["up. Then the hall", "up; then the hall"],
          kind: "Comma splice",
          expEn: "\"Then\" is not a conjunction, so a comma + then still leaves a splice. Add \"and\" or use a full stop.",
          expVn: "\"Then\" không phải liên từ, nên dấu phẩy + then vẫn là lỗi splice. Hãy thêm \"and\" hoặc dùng dấu chấm."
        },
        {
          id: "e6",
          wrong: "have ran",
          right: "have run",
          accept: [],
          kind: "Past participle",
          expEn: "After have or has, use the participle: have run, not have ran.",
          expVn: "Sau have hoặc has, dùng phân từ: have run, không phải have ran."
        }
      ]
    },
    {
      id: "pf4",
      title: "A Letter to the Landlord",
      titleVn: "Thư gửi chủ nhà",
      passage: "Dear Mr Tran, I am writing about the heating in flat 3B. The radiator in the bedroom has not worked since October, the one in the kitchen makes a loud noise at night. I reported the problem twice. Which is why I am writing again. Your office promised a repair last month nobody has come. My daughter have a cold, so the flat needs to be warm. Please send someone this week. If the heating is not fixed by Friday. I will contact the housing office. Thank you for your attention, I look forward to your reply.",
      errors: [
        {
          id: "e1",
          wrong: "October, the one",
          right: "October, and the one",
          accept: ["October. The one", "October; the one"],
          kind: "Comma splice",
          expEn: "Two complete sentences about two radiators are joined by only a comma. Add \"and\", a semicolon, or a full stop.",
          expVn: "Hai câu hoàn chỉnh về hai bộ tản nhiệt chỉ được nối bằng dấu phẩy. Hãy thêm \"and\", dấu chấm phẩy, hoặc dấu chấm."
        },
        {
          id: "e2",
          wrong: "twice. Which",
          right: "twice, which",
          accept: [],
          kind: "Fragment",
          expEn: "\"Which is why I am writing again\" cannot stand alone — a clause starting with \"which\" must be attached to the sentence before it.",
          expVn: "\"Which is why I am writing again\" không thể đứng một mình — mệnh đề bắt đầu bằng \"which\" phải gắn vào câu trước."
        },
        {
          id: "e3",
          wrong: "month nobody",
          right: "month, but nobody",
          accept: ["month. Nobody", "month; nobody"],
          kind: "Run-on",
          expEn: "A promise and a broken promise: two complete sentences pushed together. Put a boundary there — a comma + but, or a full stop.",
          expVn: "Một lời hứa và lời hứa không giữ: hai câu hoàn chỉnh bị ghép liền. Hãy đặt ranh giới — dấu phẩy + but, hoặc dấu chấm."
        },
        {
          id: "e4",
          wrong: "daughter have a",
          right: "daughter has a",
          accept: [],
          kind: "Subject-verb agreement",
          expEn: "\"My daughter\" is one person, so the verb is \"has\".",
          expVn: "\"My daughter\" là một người, nên động từ là \"has\"."
        },
        {
          id: "e5",
          wrong: "Friday. I will",
          right: "Friday, I will",
          accept: [],
          kind: "Fragment",
          expEn: "\"If the heating is not fixed by Friday\" is a dependent clause and needs the sentence after it. Join them with a comma.",
          expVn: "\"If the heating is not fixed by Friday\" là mệnh đề phụ thuộc và cần câu đứng sau nó. Hãy nối chúng bằng dấu phẩy."
        },
        {
          id: "e6",
          wrong: "attention, I look",
          right: "attention. I look",
          accept: ["attention; I look", "attention, and I look"],
          kind: "Comma splice",
          expEn: "\"Thank you for your attention\" and \"I look forward to your reply\" are two complete sentences. A comma alone is a splice.",
          expVn: "\"Thank you for your attention\" và \"I look forward to your reply\" là hai câu hoàn chỉnh. Chỉ dấu phẩy là lỗi splice."
        }
      ]
    }
  ],
  shortQA: [
    {
      id: "q1",
      question: "Explain what is wrong with this sentence and write it correctly: \"The train was crowded, I stood for the whole journey.\"",
      vnTranslation: "Giải thích câu này sai ở đâu và viết lại cho đúng: \"The train was crowded, I stood for the whole journey.\"",
      suggestedWords: [["complete", "independent"], ["comma"]],
      scienceMaxMarks: 2,
      markScheme: [
        "1 mark for explaining that it is a comma splice: two complete sentences (\"The train was crowded\" / \"I stood for the whole journey\") are joined by only a comma.",
        "1 mark for a correct rewrite using any of the four fixes, e.g. \"The train was crowded, so I stood for the whole journey.\" / \"The train was crowded; I stood …\" / \"The train was crowded. I stood …\" / \"Because the train was crowded, I stood …\""
      ],
      modelAnswer: "This is a comma splice. \"The train was crowded\" and \"I stood for the whole journey\" are both complete sentences, and a comma alone cannot join them. A correct version is: \"The train was crowded, so I stood for the whole journey.\" A full stop, a semicolon, or \"Because the train was crowded, …\" would also work."
    },
    {
      id: "q2",
      question: "Rewrite these two sentences as ONE correct sentence that shows the connection between them: \"Nam did not study for the test. He passed with a high score.\"",
      vnTranslation: "Viết lại hai câu này thành MỘT câu đúng thể hiện mối liên hệ giữa chúng: \"Nam did not study for the test. He passed with a high score.\"",
      suggestedWords: [["contrast", "connect"], ["clause"]],
      scienceMaxMarks: 2,
      markScheme: [
        "1 mark for a joining word that shows the contrast between not studying and passing (although / even though / but / yet / however with a semicolon).",
        "1 mark for the result being one correct sentence — no comma splice and no fragment — e.g. \"Although Nam did not study for the test, he passed with a high score.\" or \"Nam did not study for the test, but he passed with a high score.\""
      ],
      modelAnswer: "Although Nam did not study for the test, he passed with a high score. The word \"although\" shows the contrast, and the dependent clause is joined to the complete sentence with a comma. \"Nam did not study for the test, but he passed with a high score\" is also correct."
    },
    {
      id: "q3",
      question: "Explain why \"Because the shop was closed on Sunday.\" is not a complete sentence, and write a complete version.",
      vnTranslation: "Giải thích vì sao \"Because the shop was closed on Sunday.\" không phải là câu hoàn chỉnh, và viết một phiên bản hoàn chỉnh.",
      suggestedWords: [["clause", "idea"], ["stand alone"]],
      scienceMaxMarks: 2,
      markScheme: [
        "1 mark for explaining that \"because\" makes the clause dependent, so it does not give a complete idea and cannot stand alone (it is a fragment).",
        "1 mark for a complete version, either by adding an independent clause (\"Because the shop was closed on Sunday, we bought bread on Monday.\") or by removing \"because\" (\"The shop was closed on Sunday.\")."
      ],
      modelAnswer: "It is a fragment. The word \"because\" makes the clause dependent: it has a subject and a verb, but it does not give a complete idea, so the reader is left waiting for the rest. A complete version is: \"Because the shop was closed on Sunday, we bought our bread on Monday.\" Removing \"because\" also works: \"The shop was closed on Sunday.\""
    }
  ],
  writing: {
    type: "narrative",
    minutes: 30,
    minWords: 150,
    paragraphs: 3,
    focus: {
      label: "Complete sentences",
      labelVn: "Câu hoàn chỉnh",
      look: "fragments, run-on sentences and comma splices"
    },
    prompts: [
      {
        id: "u1w1",
        title: "A day that went wrong",
        titleVn: "Một ngày không như ý",
        task: "Write a true story about a day when something went wrong. Tell what happened, how you felt, and how the day ended.",
        taskVn: "Viết một câu chuyện có thật về một ngày có chuyện không như ý. Kể điều gì đã xảy ra, bạn cảm thấy thế nào, và ngày đó kết thúc ra sao.",
        guidelines: [
          "Paragraph 1: where and when it happened, and who was there.",
          "Paragraph 2: what went wrong, in the order it happened.",
          "Paragraph 3: how it ended and what you learned.",
          "Use the past tense. End every sentence with a full stop: never join two sentences with a comma."
        ],
        guidelinesVn: [
          "Đoạn 1: chuyện xảy ra ở đâu, khi nào, có ai.",
          "Đoạn 2: điều gì không ổn, theo thứ tự xảy ra.",
          "Đoạn 3: kết thúc ra sao và bạn học được gì.",
          "Dùng thì quá khứ. Kết thúc mỗi câu bằng dấu chấm: đừng nối hai câu bằng dấu phẩy."
        ]
      },
      {
        id: "u1w2",
        title: "Someone who helped me",
        titleVn: "Người đã giúp tôi",
        task: "Write about a time someone helped you learn something or get through a hard moment. Who were they, what did they do, and why do you still remember it?",
        taskVn: "Viết về một lần ai đó giúp bạn học điều gì đó hoặc vượt qua lúc khó khăn. Họ là ai, họ đã làm gì, và vì sao bạn vẫn nhớ?",
        guidelines: [
          "Paragraph 1: who the person is and how you know them.",
          "Paragraph 2: the moment they helped you, with details.",
          "Paragraph 3: why it still matters to you.",
          "Join some ideas with because, when or although, and keep each joined idea attached to a full sentence."
        ],
        guidelinesVn: [
          "Đoạn 1: người đó là ai và bạn quen họ thế nào.",
          "Đoạn 2: lúc họ giúp bạn, có chi tiết.",
          "Đoạn 3: vì sao điều đó vẫn quan trọng với bạn.",
          "Nối một số ý bằng because, when hoặc although, và giữ mỗi ý được nối gắn với một câu hoàn chỉnh."
        ]
      },
      {
        id: "u1w3",
        title: "My first time",
        titleVn: "Lần đầu tiên của tôi",
        task: "Write about the first time you did something new: riding a motorbike, cooking a meal, speaking in front of a class, travelling alone. What happened, and how did it change you?",
        taskVn: "Viết về lần đầu bạn làm một điều mới: đi xe máy, nấu một bữa ăn, nói trước lớp, đi một mình. Điều gì đã xảy ra, và nó thay đổi bạn thế nào?",
        guidelines: [
          "Paragraph 1: what you were about to do and how you felt before.",
          "Paragraph 2: what happened, step by step.",
          "Paragraph 3: how it ended and what changed.",
          "Use at least one semicolon and one sentence joined with but or so."
        ],
        guidelinesVn: [
          "Đoạn 1: bạn sắp làm gì và cảm thấy thế nào trước đó.",
          "Đoạn 2: điều gì xảy ra, từng bước.",
          "Đoạn 3: kết thúc ra sao và điều gì đã thay đổi.",
          "Dùng ít nhất một dấu chấm phẩy và một câu nối bằng but hoặc so."
        ]
      }
    ]
  },
  assessment,
  notes
};
