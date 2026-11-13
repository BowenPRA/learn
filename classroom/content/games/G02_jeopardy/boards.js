// content/games/G02_jeopardy/boards.js
// Fourteen Jeopardy boards of five clues a category.
//
//   1. Mathematics 1.1–1.3   — integers, sign rules, multiples and the LCM
//   2. Science 1.1–1.3       — cells, plant vs animal, specialised cells
//   3. Revision              — one category per unit, all six units, fresh clues
//   4. Unit 1 Finale         — Maths 1.4–1.6, Science 1.4, and two trivia rounds
//   5. Kindergarten & Year 1 — cooking and first science, read aloud
//   6. Year 1                — five columns of picture questions: kitchen,
//                              food, dishes from the world, claps, "Which is…?"
//   7. Science Unit 2        — states, particles, changes of state, elements,
//                              compounds and mixtures; 29 of 30 clues have a picture
//   8. Mathematics Unit 2    — Maths 2.1–2.6 and 3.1–3.2: expressions, like
//                              terms, brackets, equations, inequalities, rounding
//   9. Science 2.4 + 2.8     — the water cycle, then acids, alkalis and pH
//  10. Science 3.1 + Maths   — gravity, weight and mass; comparing, adding and
//      4.1–4.2                 subtracting decimals. English and French only
//  11. Maths Unit 4 +        — × and ÷ decimals, shortcuts, money and the mean;
//      Science 3.1–3.2         forces, and how the Solar System formed. EN/FR
//  12. Science 4.1–4.3       — living or not, the seven, viruses, species, a
//                              guessing round of hybrids (a photo on every
//                              reveal) and the science English. EN/FR
//  13. Teens                 — IGCSE chemistry and physics, word history, pop
//                              songs and big numbers; the hardest board
//  14. Teens 2               — myth or fact, celebrity couples, famous covers,
//                              geography and accidental inventions
//
// The board grid takes its column count from `categories.length`, so a board
// can have fewer than six.
//
// Every clue is written from what the deck for that unit actually taught, and
// the wording is the point: these are the sentences that cost marks, not the
// arithmetic. Where a lesson had a trap in it (subtract-from, "common", the LCM
// of 4 and 8, "green means plant", HCF(8, 9) = 1), the trap is here too.
//
// Board 4 is the only one that carries clues with no unit behind them. Its two
// trivia categories are not filler: a board made only of the taught units hands
// the game to the three strongest mathematicians in the room, and the other
// twenty-one stop speaking. Animal Records and Big Numbers are answerable by
// anyone, and are still answered in English, in a sentence, with a reason.
//
// A clue is { value, q, qVn, a, aVn }, or { value, q, qFr, a, aFr } on a board
// built from Unit 4 on, when Year 7 went English and French. A missing twin
// falls back to English, never to the other language. Nothing here goes through
// `parseInlineText` — the widget prints these as plain text — but the house
// rule still holds: write "dollars", never a dollar sign, and use the Unicode
// minus (−) so a negative number reads as a number and not as a hyphen.
//
// A clue MAY also carry a picture, and most do not:
//
//   qImage: { src, alt, altVn }   shown the moment the clue opens
//   aImage: { src, alt, altVn }   held back until the teacher reveals
//
// (altFr in place of altVn on an English-and-French board.)
//
// Which of the two depends on one question: does seeing it give the answer
// away? "Which animal has three hearts?" gets an aImage, because a photograph
// of an octopus next to that sentence is not a clue any more. The giraffe is
// named in its own question, so its photograph is a qImage and can sit there
// while the teams argue.
//
// A clue can instead be LED by pictures, for a class that cannot read yet:
//
//   qImages: [{ src, alt, altVn, label?, labelVn? }, …]   one to three pictures
//   aIndex:  1                                          which one is right
//
// The question shrinks to a line over the top and the pictures take the rest
// of the card. With one picture it is "What is it?". With two to four it is a
// choice, and on the reveal the `aIndex` picture turns green and the others fade.
// `label` prints a word under a picture — the word to clap, or a teacher's name.
// A `qImage` on a picture clue sits beside the question as a small lead picture
// (a country's flag), not as one of the choices.
import { IMAGES } from './images.js'

export const BOARDS = [
  // ── 1 · MATHEMATICS ───────────────────────────────────────────────────────
  {
    id: 'maths',
    title: 'Mathematics · 1.1–1.3',
    titleVn: 'Toán học · Bài 1.1–1.3',
    subtitle: 'Integers, sign rules, multiples and the LCM',
    subtitleVn: 'Số nguyên, quy tắc dấu, bội số và BCNN',
    icon: 'Calculator',
    accent: '#1cb0f6',
    categories: [
      {
        name: 'Adding & Subtracting',
        nameVn: 'Cộng & Trừ',
        clues: [
          {
            value: 100,
            q: 'What is −3 + 5?',
            qVn: '−3 + 5 bằng bao nhiêu?',
            a: '2',
            aVn: '2',
          },
          {
            value: 200,
            q: 'What is −6 − 4?',
            qVn: '−6 − 4 bằng bao nhiêu?',
            a: '−10. Subtracting still sends you to the left.',
            aVn: '−10. Phép trừ vẫn đưa em đi sang trái.',
          },
          {
            value: 300,
            q: 'What is 2 − (−5)?',
            qVn: '2 − (−5) bằng bao nhiêu?',
            a: '7. Only minus a negative turns into plus.',
            aVn: '7. Chỉ có "trừ một số âm" mới đổi thành phép cộng.',
          },
          {
            value: 400,
            q: 'The temperature is −4 °C. It falls by 10 degrees. What is the new temperature?',
            qVn: 'Nhiệt độ là −4 °C. Nhiệt độ giảm 10 độ. Nhiệt độ mới là bao nhiêu?',
            a: '−14 °C.  −4 − 10 = −14',
            aVn: '−14 °C.  −4 − 10 = −14',
          },
          {
            value: 500,
            q: 'Mr Bowen is 6 dollars overdrawn (−6). He puts in 20 dollars, takes out 9 dollars, and the bank removes a 4-dollar debt. How much has he got?',
            qVn: 'Thầy Bowen đang nợ 6 đô la (−6). Thầy nạp vào 20 đô la, rút ra 9 đô la, rồi ngân hàng xoá một khoản nợ 4 đô la. Thầy còn bao nhiêu?',
            a: '9 dollars.  −6 + 20 − 9 − (−4) = 9. Removing a debt ADDS.',
            aVn: '9 đô la.  −6 + 20 − 9 − (−4) = 9. Xoá một khoản nợ nghĩa là CỘNG thêm.',
          },
        ],
      },
      {
        name: 'Every Class Is an English Class',
        nameVn: 'Giờ nào cũng là giờ tiếng Anh',
        clues: [
          {
            value: 100,
            q: '"Subtract 5 from 8." Write the calculation, then the answer.',
            qVn: '"Subtract 5 from 8." Hãy viết phép tính, rồi viết đáp án.',
            a: '8 − 5 = 3.  NOT 5 − 8. The word "from" marks the number you start at.',
            aVn: '8 − 5 = 3. KHÔNG phải 5 − 8. Từ "from" chỉ ra con số em bắt đầu.',
          },
          {
            value: 200,
            q: 'Name three English words that tell you a number is going DOWN.',
            qVn: 'Hãy nêu ba từ tiếng Anh cho biết một số đang GIẢM.',
            a: 'Any three of: fall, drop, decrease, loss, withdraw, owe, colder, lower, below, less than.',
            aVn: 'Ba từ bất kỳ trong: fall, drop, decrease, loss, withdraw, owe, colder, lower, below, less than.',
          },
          {
            value: 300,
            q: 'What is the difference between −3 and 4?',
            qVn: '"The difference between −3 and 4" bằng bao nhiêu?',
            a: '7 — the gap between them. A difference is never negative. (But −3 − 4 = −7, a different question.)',
            aVn: '7 — khoảng cách giữa hai số. Hiệu (difference) không bao giờ âm. (Còn −3 − 4 = −7, đó là câu hỏi khác.)',
          },
          {
            value: 400,
            q: '"Divide −20 by 4." Write the calculation, then the answer.',
            qVn: '"Divide −20 by 4." Hãy viết phép tính, rồi viết đáp án.',
            a: '−20 ÷ 4 = −5. "4 divided into −20" is the same calculation — the English swaps the order, the maths does not.',
            aVn: '−20 ÷ 4 = −5. "4 divided into −20" cũng là phép tính đó — tiếng Anh đảo thứ tự, còn toán thì không.',
          },
          {
            value: 500,
            q: 'What does the word "common" mean in maths, and what does it mean in everyday English?',
            qVn: 'Từ "common" trong toán nghĩa là gì, còn trong tiếng Anh hằng ngày nghĩa là gì?',
            a: 'In maths it means SHARED — in both lists. In everyday English it means ordinary.',
            aVn: 'Trong toán, nó nghĩa là CHUNG — có trong cả hai dãy. Trong tiếng Anh hằng ngày, nó nghĩa là bình thường, phổ biến.',
          },
        ],
      },
      {
        name: 'Multiplying & Dividing',
        nameVn: 'Nhân & Chia',
        clues: [
          {
            value: 100,
            q: 'What is 3 × −4?',
            qVn: '3 × −4 bằng bao nhiêu?',
            a: '−12. Different signs give a negative.',
            aVn: '−12. Khác dấu thì kết quả âm.',
          },
          {
            value: 200,
            q: 'What is −6 × −5?',
            qVn: '−6 × −5 bằng bao nhiêu?',
            a: '30. Same signs give a positive.',
            aVn: '30. Cùng dấu thì kết quả dương.',
          },
          {
            value: 300,
            q: 'What is −48 ÷ 6?',
            qVn: '−48 ÷ 6 bằng bao nhiêu?',
            a: '−8. Division uses the same four sign rules as multiplication.',
            aVn: '−8. Phép chia dùng đúng bốn quy tắc dấu như phép nhân.',
          },
          {
            value: 400,
            q: 'Work out 20 ÷ (−3 + −2). Careful.',
            qVn: 'Hãy tính 20 ÷ (−3 + −2). Cẩn thận nhé.',
            a: 'The bracket holds an ADDITION: −3 + −2 = −5. Then 20 ÷ −5 = −4.',
            aVn: 'Trong ngoặc là phép CỘNG: −3 + −2 = −5. Sau đó 20 ÷ −5 = −4.',
          },
          {
            value: 500,
            q: 'Is "two negatives make a positive" true? Prove your answer with two calculations.',
            qVn: 'Câu "hai số âm thành một số dương" có đúng không? Hãy chứng minh bằng hai phép tính.',
            a: 'True for × and ÷ : −3 × −4 = 12. FALSE for + : −3 + −4 = −7. The sentence needs the operation attached to it.',
            aVn: 'Đúng với × và ÷ : −3 × −4 = 12. SAI với + : −3 + −4 = −7. Câu nói đó phải gắn với phép tính cụ thể.',
          },
        ],
      },
      {
        name: 'Multiples & the LCM',
        nameVn: 'Bội số & BCNN',
        clues: [
          {
            value: 100,
            q: 'List the first five multiples of 4.',
            qVn: 'Hãy liệt kê năm bội số đầu tiên của 4.',
            a: '4, 8, 12, 16, 20',
            aVn: '4, 8, 12, 16, 20',
          },
          {
            value: 200,
            q: 'What do the letters LCM stand for, and what is it called in Vietnamese maths?',
            qVn: 'Ba chữ LCM viết tắt của cụm từ nào, và trong toán tiếng Việt gọi là gì?',
            a: 'Lowest Common Multiple — the same idea as BCNN, bội số chung nhỏ nhất.',
            aVn: 'Lowest Common Multiple — chính là BCNN, bội số chung nhỏ nhất.',
          },
          {
            value: 300,
            q: 'What is the LCM of 6 and 9?',
            qVn: 'BCNN của 6 và 9 là bao nhiêu?',
            a: '18. Multiples of 6: 6, 12, 18 … Multiples of 9: 9, 18 … The first match is 18.',
            aVn: '18. Bội của 6: 6, 12, 18 … Bội của 9: 9, 18 … Số trùng đầu tiên là 18.',
          },
          {
            value: 400,
            q: 'What is the LCM of 4 and 8? Careful.',
            qVn: 'BCNN của 4 và 8 là bao nhiêu? Cẩn thận nhé.',
            a: '8 — not 32. When one number divides the other, the LCM is just the bigger number.',
            aVn: '8 — không phải 32. Khi số này chia hết cho số kia, BCNN chính là số lớn hơn.',
          },
          {
            value: 500,
            q: 'A red light flashes every 4 seconds and a blue light every 6 seconds. They have just flashed together. When do they next flash together?',
            qVn: 'Đèn đỏ nháy mỗi 4 giây, đèn xanh nháy mỗi 6 giây. Hai đèn vừa nháy cùng lúc. Bao lâu nữa chúng lại nháy cùng lúc?',
            a: 'After 12 seconds — then 24, then 36. 12 is the LCM of 4 and 6.',
            aVn: 'Sau 12 giây — rồi 24, rồi 36. 12 là BCNN của 4 và 6.',
          },
        ],
      },
      {
        name: 'Word Problems',
        nameVn: 'Bài toán có lời văn',
        clues: [
          {
            value: 100,
            q: 'Mr Bowen parks on floor −4. He takes the lift up 9 floors. Which floor is he on?',
            qVn: 'Thầy Bowen đỗ xe ở tầng −4. Thầy đi thang máy lên 9 tầng. Thầy đang ở tầng nào?',
            a: 'Floor 5.  −4 + 9 = 5',
            aVn: 'Tầng 5.  −4 + 9 = 5',
          },
          {
            value: 200,
            q: 'One bus leaves every 10 minutes, another every 15 minutes. Both left at 7:00. When do they next leave together?',
            qVn: 'Một xe buýt chạy 10 phút một chuyến, xe kia 15 phút một chuyến. Cả hai cùng xuất phát lúc 7:00. Khi nào hai xe lại cùng xuất phát?',
            a: '7:30. LCM(10, 15) = 30, so 30 minutes later.',
            aVn: '7:30. BCNN(10, 15) = 30, tức là 30 phút sau.',
          },
          {
            value: 300,
            q: 'The temperature falls 3 degrees every hour for 6 hours. Write the calculation and the change.',
            qVn: 'Nhiệt độ giảm 3 độ mỗi giờ, trong 6 giờ. Hãy viết phép tính và mức thay đổi.',
            a: '6 × −3 = −18, so it is 18 degrees colder.',
            aVn: '6 × −3 = −18, tức là lạnh đi 18 độ.',
          },
          {
            value: 400,
            q: 'A diver goes from the surface to −48 m in 6 minutes, at a steady speed. How far does she go each minute?',
            qVn: 'Một thợ lặn đi từ mặt nước xuống −48 m trong 6 phút, với tốc độ đều. Mỗi phút cô ấy đi được bao xa?',
            a: '−48 ÷ 6 = −8, so 8 metres down every minute.',
            aVn: '−48 ÷ 6 = −8, tức là mỗi phút xuống 8 mét.',
          },
          {
            value: 500,
            q: 'A snail is 12 m down a well (−12 m). Every day it climbs 3 m and slides back 3 m. Where is it after nine days?',
            qVn: 'Một con ốc sên ở dưới giếng, sâu 12 m (−12 m). Mỗi ngày nó bò lên 3 m rồi tụt xuống 3 m. Sau chín ngày nó ở đâu?',
            a: 'Still −12 m. +3 − 3 = 0 every day, so nine days change nothing. Read the whole question before you calculate.',
            aVn: 'Vẫn ở −12 m. Mỗi ngày +3 − 3 = 0, nên chín ngày cũng chẳng thay đổi gì. Hãy đọc hết đề trước khi tính.',
          },
        ],
      },
      {
        name: 'Traps & Tricks',
        nameVn: 'Bẫy & Mẹo',
        clues: [
          {
            value: 100,
            q: 'Mr Bowen buys 0 durians at 90 000 dong each. How much does he spend?',
            qVn: 'Thầy Bowen mua 0 quả sầu riêng, mỗi quả 90 000 đồng. Thầy tiêu hết bao nhiêu tiền?',
            a: 'Nothing — 0 dong. Anything multiplied by zero is zero, so every other number in the question is decoration.',
            aVn: 'Không đồng nào — 0 đồng. Số nào nhân 0 cũng bằng 0, nên mọi con số khác trong đề chỉ là trang trí.',
          },
          {
            value: 200,
            q: 'Two alarms both ring every 15 minutes. They have just rung together. When do they next ring together?',
            qVn: 'Hai chiếc chuông báo đều reo mỗi 15 phút. Chúng vừa reo cùng lúc. Khi nào chúng lại reo cùng lúc?',
            a: 'In 15 minutes. The two numbers are the same, so there is nothing to work out — LCM(15, 15) = 15.',
            aVn: 'Sau 15 phút. Hai số giống nhau nên chẳng phải tính gì cả — BCNN(15, 15) = 15.',
          },
          {
            value: 300,
            q: 'What is −3 + −4? Careful — this is not the same shape as −3 − (−4).',
            qVn: '−3 + −4 bằng bao nhiêu? Cẩn thận — nó không giống dạng −3 − (−4).',
            a: '−7. Adding a negative still sends you left. Only − (−) becomes +.',
            aVn: '−7. Cộng một số âm vẫn đưa em sang trái. Chỉ có − (−) mới thành +.',
          },
          {
            value: 400,
            q: 'True or false: to find the LCM you always multiply the two numbers together.',
            qVn: 'Đúng hay sai: muốn tìm BCNN thì luôn luôn lấy hai số nhân với nhau.',
            a: 'False. That works only when the numbers have no common factor except 1 (3 and 5 → 15). LCM(4, 8) is 8, not 32. When in doubt, list them.',
            aVn: 'Sai. Cách đó chỉ đúng khi hai số không có ước số chung nào ngoài 1 (3 và 5 → 15). BCNN(4, 8) là 8, không phải 32. Nếu không chắc, hãy liệt kê ra.',
          },
          {
            value: 500,
            q: 'Give a pair of integers with a product of −24 — and say how many such pairs there are altogether.',
            qVn: 'Hãy nêu một cặp số nguyên có tích bằng −24 — và cho biết tất cả có bao nhiêu cặp như vậy.',
            a: 'Eight pairs: 1 × −24, −1 × 24, 2 × −12, −2 × 12, 3 × −8, −3 × 8, 4 × −6, −4 × 6. Four factor pairs of 24, and each takes its minus sign two ways.',
            aVn: 'Có tám cặp: 1 × −24, −1 × 24, 2 × −12, −2 × 12, 3 × −8, −3 × 8, 4 × −6, −4 × 6. Số 24 có bốn cặp thừa số, mỗi cặp đặt dấu trừ được hai cách.',
          },
        ],
      },
    ],
  },

  // ── 2 · SCIENCE ───────────────────────────────────────────────────────────
  {
    id: 'science',
    title: 'Science · 1.1–1.3',
    titleVn: 'Khoa học · Bài 1.1–1.3',
    subtitle: 'Cells, plant vs animal, and cells built for a job',
    subtitleVn: 'Tế bào, thực vật và động vật, và tế bào chuyên hoá',
    icon: 'FlaskConical',
    accent: '#14b8a6',
    categories: [
      {
        name: 'What Is a Cell?',
        nameVn: 'Tế bào là gì?',
        clues: [
          {
            value: 100,
            q: 'What is a cell?',
            qVn: 'Tế bào là gì?',
            a: 'The smallest basic unit of all living organisms.',
            aVn: 'Đơn vị cơ bản nhỏ nhất của mọi cơ thể sống.',
          },
          {
            value: 200,
            q: 'What is an organelle?',
            qVn: 'Bào quan là gì?',
            a: 'A tiny structure inside a cell that does one specific job.',
            aVn: 'Một cấu trúc rất nhỏ bên trong tế bào, làm một nhiệm vụ cụ thể.',
          },
          {
            value: 300,
            q: 'Where does the English word "cell" come from?',
            qVn: 'Từ tiếng Anh "cell" bắt nguồn từ đâu?',
            a: 'From the Latin "cella", a small room — like a prison cell. Robert Hooke named it in 1665 after looking at cork.',
            aVn: 'Từ tiếng Latin "cella", nghĩa là căn phòng nhỏ — như phòng giam. Robert Hooke đặt tên năm 1665 khi quan sát nút bần.',
          },
          {
            value: 400,
            q: 'Roughly how many cells is one person made of?',
            qVn: 'Một người được tạo thành từ khoảng bao nhiêu tế bào?',
            a: 'About 100 trillion — 100 000 000 000 000.',
            aVn: 'Khoảng 100 nghìn tỉ — 100 000 000 000 000.',
          },
          {
            value: 500,
            q: 'Magnify one cell to the size of a soda can and the scale factor is 6000. Mr Bowen is 178 cm. How tall is he now — and what does that beat?',
            qVn: 'Phóng to một tế bào bằng lon nước ngọt thì tỉ lệ phóng đại là 6000 lần. Thầy Bowen cao 178 cm. Vậy thầy sẽ cao bao nhiêu — và cao hơn cái gì?',
            a: '178 cm × 6000 = 10 680 m = 10.68 km. Taller than Mount Everest, which is 8.85 km.',
            aVn: '178 cm × 6000 = 10 680 m = 10,68 km. Cao hơn đỉnh Everest, chỉ cao 8,85 km.',
          },
        ],
      },
      {
        name: 'Inside Every Cell',
        nameVn: 'Bên trong mọi tế bào',
        clues: [
          {
            value: 100,
            q: 'Which part controls the cell?',
            qVn: 'Bộ phận nào điều khiển tế bào?',
            a: 'The nucleus.',
            aVn: 'Nhân tế bào.',
          },
          {
            value: 200,
            q: 'Which part is the jelly that fills the cell, where the chemical reactions happen?',
            qVn: 'Bộ phận nào là chất keo lấp đầy tế bào, nơi diễn ra các phản ứng hoá học?',
            a: 'The cytoplasm.',
            aVn: 'Tế bào chất.',
          },
          {
            value: 300,
            q: 'Name all four parts that EVERY cell has.',
            qVn: 'Hãy nêu đủ bốn bộ phận mà MỌI tế bào đều có.',
            a: 'Cell membrane, cytoplasm, nucleus, mitochondria.',
            aVn: 'Màng tế bào, tế bào chất, nhân tế bào, ti thể.',
          },
          {
            value: 400,
            q: 'What job do the mitochondria do?',
            qVn: 'Ti thể làm nhiệm vụ gì?',
            a: 'They release the energy the cell needs from food.',
            aVn: 'Chúng giải phóng năng lượng từ thức ăn cho tế bào dùng.',
          },
          {
            value: 500,
            q: 'One human cell is missing one of those four parts. Which cell, which part — and why is losing it useful?',
            qVn: 'Có một loại tế bào người thiếu mất một trong bốn bộ phận đó. Đó là tế bào nào, thiếu bộ phận nào — và vì sao mất nó lại có lợi?',
            a: 'The red blood cell has no nucleus. That leaves more room inside for haemoglobin, so it can carry more oxygen.',
            aVn: 'Hồng cầu không có nhân. Nhờ vậy bên trong có thêm chỗ cho huyết sắc tố, nên nó chở được nhiều ô-xi hơn.',
          },
        ],
      },
      {
        name: 'Plant Only',
        nameVn: 'Chỉ có ở thực vật',
        clues: [
          {
            value: 100,
            q: 'Which part gives a plant cell its stiff, boxy shape?',
            qVn: 'Bộ phận nào giúp tế bào thực vật có hình hộp cứng cáp?',
            a: 'The cell wall.',
            aVn: 'Thành tế bào.',
          },
          {
            value: 200,
            q: 'What substance is a plant cell wall made of?',
            qVn: 'Thành tế bào thực vật được cấu tạo từ chất gì?',
            a: 'Cellulose.',
            aVn: 'Xen-lu-lô-zơ (cellulose).',
          },
          {
            value: 300,
            q: 'What is inside a chloroplast that makes it green — and what happens there?',
            qVn: 'Bên trong lục lạp có chất gì làm nó có màu xanh — và ở đó xảy ra điều gì?',
            a: 'Chlorophyll. The plant uses it to make its own food from sunlight.',
            aVn: 'Diệp lục. Cây dùng nó để tự tạo thức ăn từ ánh sáng mặt trời.',
          },
          {
            value: 400,
            q: 'Name the three parts a plant cell has that an animal cell has not.',
            qVn: 'Hãy nêu ba bộ phận mà tế bào thực vật có còn tế bào động vật thì không.',
            a: 'Cell wall, chloroplasts, sap vacuole.',
            aVn: 'Thành tế bào, lục lạp, không bào chứa dịch.',
          },
          {
            value: 500,
            q: 'In the photograph the Rhoeo cells were purple, with no chloroplasts at all. Plant or animal — and what is your evidence?',
            qVn: 'Trong bức ảnh, các tế bào cây Rhoeo có màu tím và hoàn toàn không có lục lạp. Đây là thực vật hay động vật — và bằng chứng của em là gì?',
            a: 'Plant. Every cell has a straight, stiff cell wall. Green is not the test — the wall is.',
            aVn: 'Thực vật. Mọi tế bào đều có thành tế bào thẳng và cứng. Màu xanh không phải là dấu hiệu — thành tế bào mới là.',
          },
        ],
      },
      {
        name: 'Animal Cells',
        nameVn: 'Tế bào động vật',
        clues: [
          {
            value: 100,
            q: 'Name two parts an animal cell does NOT have.',
            qVn: 'Hãy nêu hai bộ phận mà tế bào động vật KHÔNG có.',
            a: 'Any two of: cell wall, chloroplasts, sap vacuole.',
            aVn: 'Hai trong số: thành tế bào, lục lạp, không bào chứa dịch.',
          },
          {
            value: 200,
            q: 'Why has an animal cell no fixed shape?',
            qVn: 'Vì sao tế bào động vật không có hình dạng cố định?',
            a: 'Because it has no cell wall — only a thin, flexible membrane.',
            aVn: 'Vì nó không có thành tế bào — chỉ có màng mỏng và mềm dẻo.',
          },
          {
            value: 300,
            q: 'In English, what is the difference between "similar" and "the same"?',
            qVn: 'Trong tiếng Anh, "similar" khác "the same" ở chỗ nào?',
            a: '"Similar" means alike in some ways AND different in others. "The same" means no differences at all.',
            aVn: '"Similar" nghĩa là giống ở vài điểm VÀ khác ở vài điểm. "The same" nghĩa là không khác gì cả.',
          },
          {
            value: 400,
            q: 'Onion cells have straight walls but not one chloroplast. Plant or animal — and why no chloroplasts?',
            qVn: 'Tế bào hành có thành thẳng nhưng không hề có lục lạp. Đây là thực vật hay động vật — và vì sao không có lục lạp?',
            a: 'Plant — it has cell walls. No chloroplasts because that part of the onion grows underground, in the dark.',
            aVn: 'Thực vật — vì nó có thành tế bào. Không có lục lạp vì phần củ hành mọc dưới đất, trong bóng tối.',
          },
          {
            value: 500,
            q: 'You have built a model plant cell. What must you take away to turn it into an animal cell?',
            qVn: 'Em vừa làm xong mô hình một tế bào thực vật. Phải bỏ đi những gì để nó thành tế bào động vật?',
            a: 'The cell wall, the chloroplasts and the sap vacuole. Everything else stays.',
            aVn: 'Bỏ thành tế bào, lục lạp và không bào chứa dịch. Những phần còn lại giữ nguyên.',
          },
        ],
      },
      {
        name: 'Specialised Cells',
        nameVn: 'Tế bào chuyên hoá',
        clues: [
          {
            value: 100,
            q: 'In science, what does the FUNCTION of a cell mean?',
            qVn: 'Trong khoa học, "chức năng" (function) của tế bào nghĩa là gì?',
            a: 'The job the cell does.',
            aVn: 'Là công việc mà tế bào đó đảm nhiệm.',
          },
          {
            value: 200,
            q: 'What is the job of a red blood cell, and what carries the oxygen?',
            qVn: 'Hồng cầu có nhiệm vụ gì, và chất nào chở ô-xi?',
            a: 'It transports oxygen around the body. The red pigment haemoglobin carries it.',
            aVn: 'Nó vận chuyển ô-xi đi khắp cơ thể. Huyết sắc tố (hemoglobin) màu đỏ chở ô-xi.',
          },
          {
            value: 300,
            q: 'What is the job of a root hair cell, and what is its adaptation?',
            qVn: 'Tế bào lông hút có nhiệm vụ gì, và nó thích nghi như thế nào?',
            a: 'It absorbs water from the soil. It has a long, thin extension, which gives it a large surface area.',
            aVn: 'Nó hút nước từ đất. Nó có phần kéo dài mảnh và dài, tạo diện tích bề mặt lớn.',
          },
          {
            value: 400,
            q: 'What are cilia, and what do they sweep away?',
            qVn: 'Lông chuyển (cilia) là gì, và chúng quét đi thứ gì?',
            a: 'Tiny moving hairs on top of a ciliated cell. They sweep mucus — with the dust and germs trapped in it — away from the lungs.',
            aVn: 'Là những sợi lông nhỏ chuyển động trên bề mặt tế bào có lông chuyển. Chúng quét chất nhầy — cùng bụi và vi khuẩn dính trong đó — ra xa phổi.',
          },
          {
            value: 500,
            q: 'Why does a root hair cell have no chloroplasts?',
            qVn: 'Vì sao tế bào lông hút không có lục lạp?',
            a: 'Roots are underground in the dark. Chloroplasts need sunlight to make food, so down there they would be useless.',
            aVn: 'Rễ nằm dưới đất, trong bóng tối. Lục lạp cần ánh sáng mặt trời để tạo thức ăn, nên ở dưới đó chúng vô dụng.',
          },
        ],
      },
      {
        name: 'Under the Microscope',
        nameVn: 'Dưới kính hiển vi',
        clues: [
          {
            value: 100,
            q: 'What is a microscope?',
            qVn: 'Kính hiển vi là gì?',
            a: 'A tool that uses lenses to bend light and magnify a tiny image.',
            aVn: 'Một dụng cụ dùng thấu kính để bẻ cong ánh sáng và phóng to hình ảnh rất nhỏ.',
          },
          {
            value: 200,
            q: 'What is a stain, and why do we use one?',
            qVn: 'Thuốc nhuộm (stain) là gì, và vì sao ta dùng nó?',
            a: 'A coloured dye added to a specimen to make its parts easier to see.',
            aVn: 'Một loại phẩm màu nhỏ lên mẫu vật để nhìn rõ các bộ phận hơn.',
          },
          {
            value: 300,
            q: 'When you move the lens down towards the slide, why must you watch from the side and not through the eyepiece?',
            qVn: 'Khi hạ vật kính xuống gần lam kính, vì sao phải nhìn từ bên cạnh chứ không nhìn qua thị kính?',
            a: 'From the eyepiece you cannot judge the gap. Looking from the side is the only way to stop the lens being driven through the slide.',
            aVn: 'Nhìn qua thị kính thì không ước lượng được khoảng cách. Nhìn từ bên cạnh là cách duy nhất để vật kính không đâm vỡ lam kính.',
          },
          {
            value: 400,
            q: 'What is the one clue that always tells you cells are plant cells?',
            qVn: 'Dấu hiệu duy nhất luôn cho biết đó là tế bào thực vật là gì?',
            a: 'The cell wall — a straight, stiff edge, with the cells packed together like bricks. "No green" does NOT mean animal.',
            aVn: 'Thành tế bào — đường viền thẳng và cứng, các tế bào xếp sát nhau như những viên gạch. "Không có màu xanh" KHÔNG có nghĩa là tế bào động vật.',
          },
          {
            value: 500,
            q: 'Some things are too small for a light microscope to show. What kind of microscope is used instead, and what does it use in place of light?',
            qVn: 'Có những vật quá nhỏ, kính hiển vi quang học không nhìn thấy được. Người ta dùng loại kính hiển vi nào, và nó dùng gì thay cho ánh sáng?',
            a: 'An electron microscope. It uses a beam of electrons instead of light.',
            aVn: 'Kính hiển vi điện tử. Nó dùng chùm electron thay cho ánh sáng.',
          },
        ],
      },
    ],
  },

  // ── 3 · REVISION · ONE CATEGORY PER UNIT ──────────────────────────────────
  {
    id: 'revision',
    title: 'Revision · All Six Units',
    titleVn: 'Ôn tập · Cả sáu bài',
    subtitle: 'Maths and Science together, one category per unit',
    subtitleVn: 'Toán và Khoa học cùng nhau, mỗi bài một cột',
    icon: 'Trophy',
    accent: '#8b5cf6',
    categories: [
      {
        name: 'Maths 1.1',
        nameVn: 'Toán 1.1',
        clues: [
          {
            value: 100,
            q: 'What is an integer?',
            qVn: 'Số nguyên là gì?',
            a: 'A whole number that is positive, negative or zero.',
            aVn: 'Là số nguyên vẹn, có thể dương, âm hoặc bằng không.',
          },
          {
            value: 200,
            q: 'What is −7 + 10?',
            qVn: '−7 + 10 bằng bao nhiêu?',
            a: '3',
            aVn: '3',
          },
          {
            value: 300,
            q: 'What is 5 − (−3)?',
            qVn: '5 − (−3) bằng bao nhiêu?',
            a: '8. Minus a negative becomes plus.',
            aVn: '8. Trừ một số âm thì thành phép cộng.',
          },
          {
            value: 400,
            q: '"The temperature rose by 6 degrees from −2 °C." Write the calculation and the answer.',
            qVn: '"Nhiệt độ tăng 6 độ, từ −2 °C." Hãy viết phép tính và đáp án.',
            a: '−2 + 6 = 4 °C. "Rose" is an up-word, so it is an addition.',
            aVn: '−2 + 6 = 4 °C. "Rose" là từ chỉ sự tăng, nên đây là phép cộng.',
          },
          {
            value: 500,
            q: 'What is the inverse of −9 — and what is 3 − (−9)?',
            qVn: 'Số đối của −9 là gì — và 3 − (−9) bằng bao nhiêu?',
            a: 'The inverse of −9 is 9. And 3 − (−9) = 3 + 9 = 12.',
            aVn: 'Số đối của −9 là 9. Và 3 − (−9) = 3 + 9 = 12.',
          },
        ],
      },
      {
        name: 'Maths 1.2',
        nameVn: 'Toán 1.2',
        clues: [
          {
            value: 100,
            q: 'What is −8 × 2?',
            qVn: '−8 × 2 bằng bao nhiêu?',
            a: '−16',
            aVn: '−16',
          },
          {
            value: 200,
            q: 'What is the product of 2 and −9? (And what does "product" mean?)',
            qVn: 'Tích (product) của 2 và −9 là bao nhiêu? (Và "product" nghĩa là gì?)',
            a: '−18. The product is the answer when you multiply.',
            aVn: '−18. "Product" là kết quả của phép nhân, tức là tích.',
          },
          {
            value: 300,
            q: 'What is −36 ÷ −9?',
            qVn: '−36 ÷ −9 bằng bao nhiêu?',
            a: '4. Same signs give a positive.',
            aVn: '4. Cùng dấu thì kết quả dương.',
          },
          {
            value: 400,
            q: 'Estimate −4.1 × 2.8 by rounding. Do not work it out exactly.',
            qVn: 'Hãy ước lượng −4,1 × 2,8 bằng cách làm tròn. Đừng tính chính xác.',
            a: 'About −4 × 3 = −12. An estimate is a quick rough answer used to check the real one is sensible.',
            aVn: 'Khoảng −4 × 3 = −12. Ước lượng là đáp án nhanh và gần đúng, dùng để kiểm tra kết quả thật có hợp lí không.',
          },
          {
            value: 500,
            q: 'Fill in the gap: ___ × −7 = 56',
            qVn: 'Điền vào chỗ trống: ___ × −7 = 56',
            a: '−8. Sign first: the answer is positive and one number is negative, so the missing one is negative too. Then the digits.',
            aVn: '−8. Xét dấu trước: kết quả dương mà một số âm, nên số còn thiếu cũng phải âm. Sau đó mới tính chữ số.',
          },
        ],
      },
      {
        name: 'Maths 1.3',
        nameVn: 'Toán 1.3',
        clues: [
          {
            value: 100,
            q: 'What is a multiple? Give the first four multiples of 5.',
            qVn: 'Bội số là gì? Hãy nêu bốn bội số đầu tiên của 5.',
            a: 'A multiple is what you get when you multiply a number by 1, 2, 3, 4 … So: 5, 10, 15, 20.',
            aVn: 'Bội số là kết quả khi nhân một số với 1, 2, 3, 4 … Vậy: 5, 10, 15, 20.',
          },
          {
            value: 200,
            q: 'What is a common multiple of two numbers?',
            qVn: 'Bội số chung của hai số là gì?',
            a: 'A number that is a multiple of both — so it appears in both lists.',
            aVn: 'Một số vừa là bội của số này vừa là bội của số kia — tức là có mặt trong cả hai dãy.',
          },
          {
            value: 300,
            q: 'What is the LCM of 3 and 5 — and why does multiplying work this time?',
            qVn: 'BCNN của 3 và 5 là bao nhiêu — và vì sao lần này nhân hai số lại đúng?',
            a: '15. Multiplying works here because 3 and 5 have no common factor except 1. It is a lucky shortcut, not the rule.',
            aVn: '15. Lần này nhân được vì 3 và 5 không có ước số chung nào ngoài 1. Đó là mẹo may mắn, không phải quy tắc.',
          },
          {
            value: 400,
            q: 'Hot dogs come 8 to a pack and buns come 12 to a pack. What is the smallest number of each you can buy with none left over?',
            qVn: 'Xúc xích bán theo gói 8 chiếc, bánh mì bán theo gói 12 chiếc. Số ít nhất của mỗi loại mà em mua được sao cho không thừa cái nào?',
            a: '24 of each. LCM(8, 12) = 24 — so 3 packs of hot dogs and 2 packs of buns.',
            aVn: 'Mỗi loại 24 cái. BCNN(8, 12) = 24 — tức là 3 gói xúc xích và 2 gói bánh mì.',
          },
          {
            value: 500,
            q: 'One tap drips every 4 seconds, another every 12 seconds. They have just dripped together. How often do they drip together?',
            qVn: 'Một vòi nước nhỏ giọt mỗi 4 giây, vòi kia mỗi 12 giây. Hai vòi vừa nhỏ giọt cùng lúc. Bao lâu chúng lại nhỏ cùng lúc?',
            a: 'Every 12 seconds — not 48. Four divides into 12, so the LCM is just the bigger number.',
            aVn: 'Cứ 12 giây một lần — không phải 48. Vì 12 chia hết cho 4, nên BCNN chính là số lớn hơn.',
          },
        ],
      },
      {
        name: 'Science 1.1',
        nameVn: 'Khoa học 1.1',
        clues: [
          {
            value: 100,
            q: 'What is the name of the tool we use to see cells?',
            qVn: 'Dụng cụ chúng ta dùng để nhìn thấy tế bào tên là gì?',
            a: 'A microscope.',
            aVn: 'Kính hiển vi.',
          },
          {
            value: 200,
            q: 'Finish the sentence: "All living organisms are made of ___."',
            qVn: 'Hoàn thành câu: "Mọi cơ thể sống đều được tạo thành từ ___."',
            a: '"… cells." Every one of them.',
            aVn: '"… tế bào." Không có ngoại lệ.',
          },
          {
            value: 300,
            q: 'In a photograph of a leaf, what are the little green circles inside the cells — and why are they green?',
            qVn: 'Trong ảnh chụp một chiếc lá, những vòng tròn nhỏ màu xanh bên trong tế bào là gì — và vì sao chúng màu xanh?',
            a: 'Chloroplasts. They are green because they contain chlorophyll, and the plant makes its food inside them using sunlight.',
            aVn: 'Lục lạp. Chúng màu xanh vì chứa diệp lục, và cây tạo thức ăn bên trong chúng nhờ ánh sáng mặt trời.',
          },
          {
            value: 400,
            q: 'Give two differences between a cell wall and a cell membrane.',
            qVn: 'Hãy nêu hai điểm khác nhau giữa thành tế bào và màng tế bào.',
            a: 'Any two: the wall is thick, stiff, made of cellulose and only in plants; the membrane is thin, flexible, in every cell, and controls what enters and leaves.',
            aVn: 'Hai điểm bất kỳ: thành thì dày, cứng, làm từ xen-lu-lô-zơ và chỉ có ở thực vật; màng thì mỏng, mềm dẻo, có ở mọi tế bào, và kiểm soát những gì ra vào.',
          },
          {
            value: 500,
            q: 'A model of a cell has limitations. What does that word mean?',
            qVn: 'Một mô hình tế bào có "limitations". Từ đó nghĩa là gì?',
            a: 'The weaknesses of the model — the ways it is different from the real object.',
            aVn: 'Là những hạn chế của mô hình — những điểm nó khác với vật thật.',
          },
        ],
      },
      {
        name: 'Science 1.2',
        nameVn: 'Khoa học 1.2',
        clues: [
          {
            value: 100,
            q: 'How many parts does an animal cell have — and name one of them.',
            qVn: 'Tế bào động vật có mấy bộ phận — và hãy kể tên một bộ phận.',
            a: 'Four: cell membrane, cytoplasm, nucleus, mitochondria.',
            aVn: 'Bốn: màng tế bào, tế bào chất, nhân tế bào, ti thể.',
          },
          {
            value: 200,
            q: 'Under the microscope some cells are soft and rounded with no straight edges at all. Plant or animal?',
            qVn: 'Dưới kính hiển vi, có những tế bào mềm, tròn, không hề có cạnh thẳng. Đó là thực vật hay động vật?',
            a: 'Animal — for example cheek cells. No cell wall means no straight edges.',
            aVn: 'Động vật — ví dụ tế bào niêm mạc má. Không có thành tế bào nên không có cạnh thẳng.',
          },
          {
            value: 300,
            q: 'Cellulose and chlorophyll are not organelles. So what are they?',
            qVn: 'Xen-lu-lô-zơ và diệp lục không phải là bào quan. Vậy chúng là gì?',
            a: 'Substances — the materials an organelle is made of or contains. An organelle is a structure you can point to.',
            aVn: 'Chúng là chất — vật liệu tạo nên hoặc chứa trong bào quan. Còn bào quan là cấu trúc mà em có thể chỉ vào được.',
          },
          {
            value: 400,
            q: 'Give the first four steps for making a slide of your own cheek cells, in order.',
            qVn: 'Hãy nêu bốn bước đầu tiên để làm tiêu bản tế bào má của chính em, theo đúng thứ tự.',
            a: 'Rub a clean cotton bud inside your cheek; smear it onto a slide; add a drop of stain; lower a cover slip on top.',
            aVn: 'Chà nhẹ tăm bông sạch vào mặt trong má; phết lên lam kính; nhỏ một giọt thuốc nhuộm; đậy lá kính lên trên.',
          },
          {
            value: 500,
            q: 'In everyday English a stain on your shirt is an accident. How is a stain in a laboratory different?',
            qVn: 'Trong tiếng Anh hằng ngày, vết bẩn (stain) trên áo là do vô ý. Còn "stain" trong phòng thí nghiệm khác thế nào?',
            a: 'In a laboratory you stain something on purpose, so that its parts show up under the microscope.',
            aVn: 'Trong phòng thí nghiệm, ta nhuộm màu một cách có chủ ý, để các bộ phận hiện rõ dưới kính hiển vi.',
          },
        ],
      },
      {
        name: 'Science 1.3',
        nameVn: 'Khoa học 1.3',
        clues: [
          {
            value: 100,
            q: 'What does it mean to say a cell is specialised?',
            qVn: 'Nói một tế bào "chuyên hoá" nghĩa là gì?',
            a: 'It has a structure that helps it carry out its job really well.',
            aVn: 'Nó có cấu tạo giúp nó làm thật tốt nhiệm vụ của mình.',
          },
          {
            value: 200,
            q: 'What is the job of a neurone, and what is its main adaptation?',
            qVn: 'Tế bào thần kinh có nhiệm vụ gì, và nó thích nghi chủ yếu ra sao?',
            a: 'It carries electrical signals around the body. It has a very long axon, so signals travel far and fast.',
            aVn: 'Nó dẫn truyền tín hiệu điện đi khắp cơ thể. Nó có sợi trục rất dài nên tín hiệu đi xa và nhanh.',
          },
          {
            value: 300,
            q: 'Name two things a red blood cell, a neurone and a ciliated cell all have. Careful.',
            qVn: 'Hãy nêu hai thứ mà hồng cầu, tế bào thần kinh và tế bào có lông chuyển đều có. Cẩn thận nhé.',
            a: 'Cytoplasm and a cell membrane — NOT a nucleus, because the red blood cell has none.',
            aVn: 'Tế bào chất và màng tế bào — KHÔNG phải nhân, vì hồng cầu không có nhân.',
          },
          {
            value: 400,
            q: 'What is the job of a palisade cell, and why is it at the top of the leaf?',
            qVn: 'Tế bào mô giậu có nhiệm vụ gì, và vì sao nó nằm ở phía trên của lá?',
            a: 'It makes food by photosynthesis. It is packed with chloroplasts, tall enough to stack more of them, and at the top so the light reaches it first.',
            aVn: 'Nó tạo thức ăn bằng quang hợp. Nó chứa đầy lục lạp, có dạng cao để xếp được nhiều lục lạp hơn, và nằm trên cùng để nhận ánh sáng trước tiên.',
          },
          {
            value: 500,
            q: 'Finish the sentence in full English: "A red blood cell is adapted to ___ because it has ___."',
            qVn: 'Hãy hoàn thành câu bằng tiếng Anh đầy đủ: "A red blood cell is adapted to ___ because it has ___."',
            a: '"… adapted to carry oxygen because it is full of haemoglobin." Also accept: because it is small enough to fit through a capillary, or because it has no nucleus, leaving more room.',
            aVn: '"… adapted to carry oxygen because it is full of haemoglobin." Cũng chấp nhận: vì nó đủ nhỏ để lọt qua mao mạch, hoặc vì nó không có nhân nên có thêm chỗ trống.',
          },
        ],
      },
    ],
  },

  // ── 4 · UNIT 1 FINALE · THE SECOND HALF OF THE UNIT, PLUS TRIVIA ─────────
  {
    id: 'unit1-finale',
    title: 'Unit 1 Finale · Maths 1.4–1.6, Science 1.4',
    titleVn: 'Chung kết Chương 1 · Toán 1.4–1.6, Khoa học 1.4',
    subtitle: 'Factors, divisibility, roots, tissues — and two rounds of trivia',
    subtitleVn: 'Ước số, chia hết, căn bậc hai, mô — và hai vòng đố vui',
    icon: 'Sparkles',
    accent: '#f59e0b',
    categories: [
      // ── Maths 1.4 ─────────────────────────────────────────────────────────
      {
        name: 'Factors & the HCF',
        nameVn: 'Ước số & ƯCLN',
        clues: [
          {
            value: 100,
            q: 'List all the factors of 12.',
            qVn: 'Hãy liệt kê tất cả các ước số của 12.',
            a: '1, 2, 3, 4, 6, 12. Hunt in pairs: 1 × 12, 2 × 6, 3 × 4.',
            aVn: '1, 2, 3, 4, 6, 12. Hãy tìm theo cặp: 1 × 12, 2 × 6, 3 × 4.',
          },
          {
            value: 200,
            q: 'What do the letters HCF stand for, and what is it called in Vietnamese maths?',
            qVn: 'Ba chữ HCF viết tắt của cụm từ nào, và trong toán tiếng Việt gọi là gì?',
            a: 'Highest Common Factor — the same idea as ƯCLN, ước chung lớn nhất.',
            aVn: 'Highest Common Factor — chính là ƯCLN, ước chung lớn nhất.',
          },
          {
            value: 300,
            q: 'What is the HCF of 8 and 9? Careful.',
            qVn: 'ƯCLN của 8 và 9 là bao nhiêu? Cẩn thận nhé.',
            a: '1 — never "none". Factors of 8: 1, 2, 4, 8. Factors of 9: 1, 3, 9. Only 1 is shared, and 1 is a factor of every number.',
            aVn: '1 — không bao giờ là "không có". Ước của 8: 1, 2, 4, 8. Ước của 9: 1, 3, 9. Chỉ có 1 là chung, mà 1 là ước của mọi số.',
          },
          {
            value: 400,
            q: 'What is the HCF of 6 and 18?',
            qVn: 'ƯCLN của 6 và 18 là bao nhiêu?',
            a: '6, not 1. When one number divides into the other, the HCF is the smaller number.',
            aVn: '6, không phải 1. Khi số này chia hết cho số kia, ƯCLN chính là số nhỏ hơn.',
          },
          {
            value: 500,
            q: 'Why does the book ask for the LOWEST common multiple, but the HIGHEST common factor?',
            qVn: 'Vì sao sách hỏi bội chung NHỎ NHẤT, nhưng lại hỏi ước chung LỚN NHẤT?',
            a: 'Multiples never stop, so there is no highest one to ask for. Factors stop, so a highest one exists — and the lowest common factor is always 1, which tells you nothing.',
            aVn: 'Bội số liệt kê mãi không hết, nên không có số lớn nhất để hỏi. Ước số thì dừng lại, nên có số lớn nhất — còn ước chung nhỏ nhất luôn bằng 1, chẳng cho biết điều gì.',
          },
        ],
      },

      // ── Maths 1.5 ─────────────────────────────────────────────────────────
      {
        name: 'Divisible By',
        nameVn: 'Chia hết cho',
        clues: [
          {
            value: 100,
            q: 'Which number between 2 and 11 has no quick test for divisibility?',
            qVn: 'Số nào trong khoảng từ 2 đến 11 không có mẹo kiểm tra chia hết nhanh?',
            a: '7. Tests for 7 do exist, but they take longer than the division itself — so divide, and look at the remainder.',
            aVn: '7. Vẫn có mẹo cho số 7, nhưng làm còn lâu hơn chia trực tiếp — nên cứ chia rồi xem số dư.',
          },
          {
            value: 200,
            q: 'Is 4113 divisible by 3? Say the TEST, not just the answer.',
            qVn: '4113 có chia hết cho 3 không? Hãy nói ra CÁCH KIỂM TRA, đừng chỉ nói đáp án.',
            a: 'Yes. 4 + 1 + 1 + 3 = 9, and 9 is a multiple of 3, so 4113 is divisible by 3. (4113 ÷ 3 = 1371.)',
            aVn: 'Có. 4 + 1 + 1 + 3 = 9, mà 9 là bội của 3, nên 4113 chia hết cho 3. (4113 ÷ 3 = 1371.)',
          },
          {
            value: 300,
            q: '10 is an even number. Is 10 divisible by 6?',
            qVn: '10 là số chẵn. Vậy 10 có chia hết cho 6 không?',
            a: 'No. The test for 6 is BOTH tests at once: divisible by 2 AND by 3. Here 1 + 0 = 1, so it fails the test for 3. Even is not enough.',
            aVn: 'Không. Muốn chia hết cho 6 phải qua CẢ HAI phép thử: chia hết cho 2 VÀ cho 3. Ở đây 1 + 0 = 1, nên nó trượt phép thử của 3. Chẵn thôi thì chưa đủ.',
          },
          {
            value: 400,
            q: '24 ÷ 6 = 4. Say that ONE fact in three different English sentences.',
            qVn: '24 ÷ 6 = 4. Hãy diễn đạt MỘT sự thật đó bằng ba câu tiếng Anh khác nhau.',
            a: '"6 is a factor of 24." · "24 is divisible by 6." · "24 is a multiple of 6." Three sentences, one division.',
            aVn: '"6 is a factor of 24." · "24 is divisible by 6." · "24 is a multiple of 6." Ba câu, chỉ một phép chia.',
          },
          {
            value: 500,
            q: 'Find the missing digit: 274▢ is divisible by 9. Why is there only one answer?',
            qVn: 'Hãy tìm chữ số còn thiếu: 274▢ chia hết cho 9. Vì sao chỉ có một đáp án?',
            a: '5, giving 2745. The digits you can see add to 13; the next multiple of 9 is 18, and 18 − 13 = 5. The multiple after that is 27, which would need a digit of 14 — impossible.',
            aVn: '5, được số 2745. Ba chữ số nhìn thấy cộng lại bằng 13; bội tiếp theo của 9 là 18, mà 18 − 13 = 5. Bội sau nữa là 27, sẽ cần chữ số 14 — không thể có.',
          },
        ],
      },

      // ── Maths 1.6 ─────────────────────────────────────────────────────────
      {
        name: 'Squares & Roots',
        nameVn: 'Bình phương & Căn',
        clues: [
          {
            value: 100,
            q: 'What is 9², and how do you say it out loud in English?',
            qVn: '9² bằng bao nhiêu, và đọc bằng tiếng Anh như thế nào?',
            a: '81. "Nine squared", which means 9 × 9.',
            aVn: '81. Đọc là "nine squared", nghĩa là 9 × 9.',
          },
          {
            value: 200,
            q: 'Which is bigger, 5² or 5 × 2? Work out both.',
            qVn: 'Số nào lớn hơn, 5² hay 5 × 2? Hãy tính cả hai.',
            a: '5² = 25 is bigger; 5 × 2 = 10. The small 2 counts how many 5s are multiplied together — it does not double the number.',
            aVn: '5² = 25 lớn hơn; 5 × 2 = 10. Số 2 nhỏ ở trên cho biết nhân bao nhiêu số 5 với nhau — nó không phải nhân đôi.',
          },
          {
            value: 300,
            q: '64 is on both lists. What is the square root of 64, and what is the cube root of 64?',
            qVn: '64 nằm trong cả hai danh sách. Căn bậc hai của 64 là bao nhiêu, và căn bậc ba của 64 là bao nhiêu?',
            a: 'Square root 8, because 8 × 8 = 64. Cube root 4, because 4 × 4 × 4 = 64.',
            aVn: 'Căn bậc hai là 8, vì 8 × 8 = 64. Căn bậc ba là 4, vì 4 × 4 × 4 = 64.',
          },
          {
            value: 400,
            q: 'The square root of 45 lies between which two consecutive whole numbers?',
            qVn: 'Căn bậc hai của 45 nằm giữa hai số tự nhiên liên tiếp nào?',
            a: '6 and 7, because 36 < 45 < 49 and the roots of 36 and 49 are 6 and 7. "Consecutive" means one straight after the other.',
            aVn: '6 và 7, vì 36 < 45 < 49 mà căn của 36 và 49 là 6 và 7. "Consecutive" nghĩa là liền nhau, số này ngay sau số kia.',
          },
          {
            value: 500,
            q: 'Mr Bowen is thinking of a square number between 100 and 200. Its square root is a multiple of 3. What is his number?',
            qVn: 'Thầy Bowen đang nghĩ tới một số chính phương nằm giữa 100 và 200. Căn bậc hai của nó là một bội của 3. Đó là số nào?',
            a: '144. The square numbers between 100 and 200 are 121, 144, 169 and 196; their roots are 11, 12, 13 and 14, and only 12 is a multiple of 3.',
            aVn: '144. Các số chính phương giữa 100 và 200 là 121, 144, 169 và 196; căn của chúng là 11, 12, 13 và 14, và chỉ có 12 là bội của 3.',
          },
        ],
      },

      // ── Science 1.4 ───────────────────────────────────────────────────────
      {
        name: 'Cells to Organisms',
        nameVn: 'Từ tế bào đến cơ thể',
        clues: [
          {
            value: 100,
            q: 'What is a tissue?',
            qVn: 'Mô là gì?',
            a: 'A group of SIMILAR cells, all working together to carry out one particular function.',
            aVn: 'Một nhóm các tế bào GIỐNG NHAU, cùng làm việc để thực hiện một chức năng cụ thể.',
          },
          {
            value: 200,
            q: 'What is an organ? Give one human example and one plant example.',
            qVn: 'Cơ quan là gì? Hãy cho một ví dụ ở người và một ví dụ ở thực vật.',
            a: 'A structure made of several DIFFERENT tissues, working together. Human: the heart, the stomach, the skin. Plant: a leaf, a root, a flower.',
            aVn: 'Một cấu trúc gồm nhiều loại MÔ KHÁC NHAU cùng làm việc. Ở người: tim, dạ dày, da. Ở thực vật: lá, rễ, hoa.',
          },
          {
            value: 300,
            q: 'Is a leaf a tissue or an organ? Say why.',
            qVn: 'Lá cây là mô hay cơ quan? Vì sao?',
            a: 'An organ. One leaf holds four different tissues: upper epidermis, palisade layer, spongy layer, lower epidermis. Different tissues means organ.',
            aVn: 'Là cơ quan. Một chiếc lá chứa bốn loại mô khác nhau: biểu bì trên, mô giậu, mô xốp, biểu bì dưới. Nhiều loại mô khác nhau nghĩa là cơ quan.',
            // The same photograph the class met in the Science 1.4 lesson, so
            // the reveal is a recognition rather than a new picture to decode.
            // Count the four layers off it while the answer is on screen.
            aImage: {
              src: IMAGES.leafCrossSection,
              alt: 'A leaf cut across under a microscope: a flat top layer, tall column cells, loose round cells, then a flat bottom layer.',
              altVn: 'Lát cắt ngang của lá dưới kính hiển vi: một lớp dẹt ở trên, các tế bào hình cột cao, các tế bào tròn xếp thưa, rồi một lớp dẹt ở dưới.',
            },
          },
          {
            value: 400,
            q: 'Put these five in order, smallest first: organ · cell · organism · tissue · organ system.',
            qVn: 'Hãy sắp xếp năm mức sau từ nhỏ đến lớn: cơ quan · tế bào · cơ thể · mô · hệ cơ quan.',
            a: 'cell → tissue → organ → organ system → organism. One example goes all the way up: a ciliated cell → ciliated epithelium → a lung → the breathing system → you.',
            aVn: 'tế bào → mô → cơ quan → hệ cơ quan → cơ thể. Một ví dụ đi hết cả năm bậc: tế bào có lông chuyển → biểu mô có lông chuyển → lá phổi → hệ hô hấp → chính em.',
          },
          {
            value: 500,
            q: 'The word "tissue" has two meanings in English. Give both — in a full sentence each.',
            qVn: 'Từ "tissue" trong tiếng Anh có hai nghĩa. Hãy nêu cả hai — mỗi nghĩa một câu hoàn chỉnh.',
            a: 'Everyday, countable: "Mr Bowen sneezed, so he took a tissue out of the box." Scientific, uncountable: "The wall of the stomach contains muscle tissue."',
            aVn: 'Nghĩa hằng ngày, đếm được: "Mr Bowen sneezed, so he took a tissue out of the box." Nghĩa khoa học, không đếm được: "The wall of the stomach contains muscle tissue."',
          },
        ],
      },

      // ── Trivia 1 ──────────────────────────────────────────────────────────
      {
        name: 'Animal Records',
        nameVn: 'Kỷ lục động vật',
        clues: [
          {
            value: 100,
            q: 'What is the largest animal that has ever lived on Earth?',
            qVn: 'Loài động vật lớn nhất từng sống trên Trái Đất là loài nào?',
            a: 'The blue whale — about 30 metres long, and heavier than any dinosaur. It is alive today.',
            aVn: 'Cá voi xanh — dài khoảng 30 mét, nặng hơn bất kỳ loài khủng long nào. Và nó vẫn đang sống đến ngày nay.',
            aImage: {
              src: IMAGES.blueWhale,
              alt: 'A blue whale seen from above, its whole body just under clear blue water.',
              altVn: 'Một con cá voi xanh nhìn từ trên cao, toàn thân nằm ngay dưới mặt nước biển trong xanh.',
            },
          },
          {
            value: 200,
            q: 'What is the fastest animal in the world? It is not the cheetah.',
            qVn: 'Loài động vật nhanh nhất thế giới là loài nào? Không phải báo săn đâu.',
            a: 'The peregrine falcon, which dives at about 390 km/h. The cheetah is the fastest on LAND, at about 110 km/h.',
            aVn: 'Chim cắt lớn, lao xuống với tốc độ khoảng 390 km/h. Báo săn chỉ nhanh nhất TRÊN CẠN, khoảng 110 km/h.',
            aImage: {
              src: IMAGES.peregrineFalcon,
              alt: 'A peregrine falcon flying straight towards the camera, wings fully spread against a pale sky.',
              altVn: 'Một con chim cắt lớn bay thẳng về phía máy ảnh, hai cánh dang rộng trên nền trời nhạt.',
            },
          },
          {
            value: 300,
            q: 'A giraffe has a neck about two metres long. How many neck bones does it have — and how many have you got?',
            qVn: 'Hươu cao cổ có chiếc cổ dài khoảng hai mét. Nó có bao nhiêu đốt xương cổ — còn em có bao nhiêu?',
            // On the QUESTION: the clue says the word "giraffe" itself, so the
            // photograph gives nothing away. What it gives is two metres of
            // neck to look at while the teams argue about the number.
            qImage: {
              src: IMAGES.giraffe,
              alt: 'Two giraffes standing with their long necks crossed against a blue sky.',
              altVn: 'Hai con hươu cao cổ đứng bắt chéo hai chiếc cổ dài trên nền trời xanh.',
            },
            a: 'Seven each. The giraffe has exactly the same number as you; its bones are simply enormous.',
            aVn: 'Cả hai đều có bảy. Hươu cao cổ có đúng bằng số của em; chỉ là mỗi đốt xương của nó to khổng lồ.',
          },
          {
            value: 400,
            q: 'Which animal has three hearts and blue blood?',
            qVn: 'Loài vật nào có ba trái tim và máu màu xanh?',
            a: 'The octopus. Two hearts push blood through the gills and one pushes it round the body; its blood carries copper instead of iron, so it is blue, not red.',
            aVn: 'Bạch tuộc. Hai tim đẩy máu qua mang, một tim đẩy máu đi khắp cơ thể; máu của nó chứa đồng thay vì sắt, nên có màu xanh chứ không đỏ.',
            aImage: {
              src: IMAGES.octopus,
              alt: 'A common octopus on the sea floor, its eye and all eight arms clearly visible.',
              altVn: 'Một con bạch tuộc trên đáy biển, thấy rõ mắt và cả tám xúc tu.',
            },
          },
          {
            value: 500,
            q: 'One animal survives being frozen solid, dried out completely, and even the vacuum of space — but you need a microscope to see it. What is it?',
            qVn: 'Có một loài vật sống sót qua cả việc bị đông cứng, khô kiệt hoàn toàn, và cả chân không ngoài vũ trụ — nhưng phải dùng kính hiển vi mới nhìn thấy nó. Đó là con gì?',
            a: 'The tardigrade, or water bear — under a millimetre long. Some were carried into orbit in 2007, exposed to open space, and came back alive.',
            aVn: 'Gấu nước (tardigrade) — dài chưa tới một milimét. Năm 2007 người ta đưa chúng lên quỹ đạo, phơi ra ngoài không gian, và chúng vẫn sống sót trở về.',
            aImage: {
              src: IMAGES.tardigrade,
              alt: 'An electron microscope image of a tardigrade: a plump segmented body walking on eight stubby legs.',
              altVn: 'Ảnh chụp gấu nước bằng kính hiển vi điện tử: thân mập chia đốt, đi trên tám chiếc chân ngắn.',
            },
          },
        ],
      },

      // ── Trivia 2 ──────────────────────────────────────────────────────────
      {
        name: 'Big Numbers, Weird Facts',
        nameVn: 'Số khổng lồ, sự thật lạ',
        clues: [
          {
            value: 100,
            q: 'How many seconds are there in one hour?',
            qVn: 'Một giờ có bao nhiêu giây?',
            a: '3600, from 60 × 60. (And 86 400 in a whole day.)',
            aVn: '3600 giây, do 60 × 60. (Và một ngày có 86 400 giây.)',
          },
          {
            value: 200,
            q: 'An adult has 206 bones. Does a newborn baby have more, or fewer?',
            qVn: 'Người lớn có 206 chiếc xương. Vậy trẻ sơ sinh có nhiều hơn hay ít hơn?',
            a: 'More — about 300. As you grow, some of them fuse together into single larger bones.',
            aVn: 'Nhiều hơn — khoảng 300 chiếc. Khi lớn lên, một số xương dính liền lại thành những xương lớn hơn.',
          },
          {
            value: 300,
            q: 'How long does light from the Sun take to reach the Earth?',
            qVn: 'Ánh sáng từ Mặt Trời mất bao lâu để đến được Trái Đất?',
            a: 'About 8 minutes — 8 minutes and 20 seconds. So you always see the Sun as it was 8 minutes ago.',
            aVn: 'Khoảng 8 phút — chính xác là 8 phút 20 giây. Nghĩa là em luôn nhìn thấy Mặt Trời của 8 phút trước.',
          },
          {
            value: 400,
            q: 'A million seconds is about eleven and a half days. Roughly how long is a BILLION seconds?',
            qVn: 'Một triệu giây là khoảng mười một ngày rưỡi. Vậy MỘT TỈ giây là khoảng bao lâu?',
            a: 'About 32 years. A billion is a thousand millions — that is how far apart the two words really are.',
            aVn: 'Khoảng 32 năm. Một tỉ bằng một nghìn triệu — đó mới là khoảng cách thật giữa hai từ này.',
          },
          {
            value: 500,
            q: 'A sheet of paper is 0.1 mm thick. Fold it in half 42 times. Roughly how thick is it now?',
            qVn: 'Một tờ giấy dày 0,1 mm. Gấp đôi nó 42 lần. Khi đó nó dày khoảng bao nhiêu?',
            a: 'It reaches the Moon — about 440 000 km, and the Moon is 384 000 km away. Every fold doubles the thickness. (Nobody can really fold paper 42 times.)',
            aVn: 'Nó chạm tới Mặt Trăng — khoảng 440 000 km, mà Mặt Trăng chỉ cách 384 000 km. Mỗi lần gấp là dày gấp đôi. (Thực tế không ai gấp giấy được 42 lần đâu.)',
          },
        ],
      },
    ],
  },
  // ── 5 · KINDERGARTEN & YEAR 1 · COOKING AND FIRST SCIENCE ────────────────
  // A board for a class that cannot read the clues. THE TEACHER READS EVERY
  // ONE ALOUD, twice, which is why the questions are short spoken sentences
  // rather than written ones, and why the answers are one or two words.
  //
  // Twenty-nine of the thirty clues carry an `aImage`, and every one is held
  // back until the reveal. That is the engine of the whole board: the class
  // says "chopsticks" in English, THEN the photograph comes up and confirms
  // it. A five-year-old who has said a new English word out loud and then seen
  // the thing has learnt it; one who has only seen the picture has not had to
  // say anything.
  //
  // Three categories are cooking and three are Cambridge Primary Science
  // Stage 1 — the senses, living and non-living, and reversible against
  // irreversible change. "How Do We Cook It?" deliberately uses the same four
  // methods as the Word Wall puzzle of that name, so play the wall first.
  //
  // The values still run 100–500 and the 500s are still the hard ones, but
  // hard here means "say two things" or "say why", never a longer number.
  {
    id: 'kindy-cooking',
    title: 'Kindergarten & Year 1 · Cooking and First Science',
    titleVn: 'Mẫu giáo & Lớp 1 · Nấu ăn và Khoa học đầu tiên',
    subtitle: 'The kitchen, how food gets hot, the five senses and living things',
    subtitleVn: 'Nhà bếp, cách làm nóng thức ăn, năm giác quan và vật sống',
    icon: 'CookingPot',
    accent: '#ec4899',
    categories: [
      // ── Cooking · the kitchen ─────────────────────────────────────────────
      {
        name: 'In the Kitchen',
        nameVn: 'Trong Nhà Bếp',
        clues: [
          {
            value: 100,
            q: 'We pick up our rice with these two little sticks. What are they?',
            qVn: 'Chúng ta gắp cơm bằng hai chiếc que nhỏ này. Đó là gì?',
            a: 'Chopsticks.',
            aVn: 'Đôi đũa. (Tiếng Anh: chopsticks.)',
            aImage: { src: IMAGES.chopsticks, alt: 'A pair of wooden chopsticks.', altVn: 'Một đôi đũa gỗ.' },
          },
          {
            value: 200,
            q: 'It is round and flat, and we fry an egg in it. What is it?',
            qVn: 'Nó tròn và dẹt, chúng ta chiên trứng trong đó. Đó là cái gì?',
            a: 'A pan.',
            aVn: 'Cái chảo. (Tiếng Anh: a pan.)',
            aImage: { src: IMAGES.pan, alt: 'A round frying pan with a long handle.', altVn: 'Một cái chảo tròn có tay cầm dài.' },
          },
          {
            value: 300,
            q: 'This big machine keeps our milk cold. What is it?',
            qVn: 'Cái máy to này giữ cho sữa của chúng ta lạnh. Đó là cái gì?',
            a: 'The fridge.',
            aVn: 'Tủ lạnh. (Tiếng Anh: the fridge.)',
            aImage: { src: IMAGES.fridge, alt: 'A tall kitchen fridge.', altVn: 'Một chiếc tủ lạnh cao trong bếp.' },
          },
          {
            value: 400,
            q: 'Bread goes in. It gets hot. Brown, crunchy bread comes out. What is it?',
            qVn: 'Cho bánh mì vào. Nó nóng lên. Bánh mì vàng giòn đi ra. Đó là cái gì?',
            a: 'A toaster.',
            aVn: 'Máy nướng bánh mì. (Tiếng Anh: a toaster.)',
            aImage: { src: IMAGES.toaster, alt: 'An electric toaster with two slots.', altVn: 'Một máy nướng bánh mì có hai khe.' },
          },
          {
            value: 500,
            q: 'Mr Bowen is making soup for the whole class. Does he need a pan or a pot? Say why.',
            qVn: 'Thầy Bowen đang nấu canh cho cả lớp. Thầy cần cái chảo hay cái nồi? Vì sao?',
            a: 'A pot. A pot is deep, so it holds a lot of soup. A pan is flat.',
            aVn: 'Cái nồi. Nồi sâu nên chứa được nhiều canh. Còn chảo thì dẹt.',
            aImage: { src: IMAGES.pot, alt: 'A deep cooking pot with two handles and a lid.', altVn: 'Một cái nồi sâu có hai quai và nắp.' },
          },
        ],
      },

      // ── Cooking · the method, the same four as the Word Wall ──────────────
      {
        name: 'How Do We Cook It?',
        nameVn: 'Nấu Bằng Cách Nào?',
        clues: [
          {
            value: 100,
            q: 'We cook it in a pot of hot water. We eat it every day in Vietnam. What is it?',
            qVn: 'Chúng ta nấu nó trong nồi nước nóng. Ở Việt Nam ngày nào chúng ta cũng ăn. Đó là gì?',
            a: 'Rice.',
            aVn: 'Cơm. (Tiếng Anh: rice.)',
            aImage: { src: IMAGES.rice, alt: 'A bowl of cooked white rice.', altVn: 'Một bát cơm trắng đã nấu chín.' },
          },
          {
            value: 200,
            q: 'We mix flour and water, then we bake it in the oven. We put butter on it. What is it?',
            qVn: 'Chúng ta trộn bột với nước, rồi nướng trong lò. Chúng ta phết bơ lên. Đó là gì?',
            a: 'Bread.',
            aVn: 'Bánh mì. (Tiếng Anh: bread.)',
            aImage: { src: IMAGES.bread, alt: 'A loaf of bread.', altVn: 'Một ổ bánh mì.' },
          },
          {
            value: 300,
            q: 'Hot oil in a pan makes this go golden and crispy. We eat it at Tet. What is it?',
            qVn: 'Dầu nóng trong chảo làm món này vàng giòn. Chúng ta ăn nó vào dịp Tết. Đó là gì?',
            a: 'A spring roll.',
            aVn: 'Nem rán (chả giò). Tiếng Anh: a spring roll.',
            aImage: { src: IMAGES.springroll, alt: 'Golden fried spring rolls on a plate.', altVn: 'Những chiếc nem rán vàng giòn trên đĩa.' },
          },
          {
            value: 400,
            q: 'Which one do we NOT cook at all — a pizza, a fried egg, or a banana?',
            qVn: 'Món nào chúng ta KHÔNG nấu chút nào — bánh pizza, trứng ốp la, hay quả chuối?',
            a: 'The banana. We peel it and eat it. The other two need heat.',
            aVn: 'Quả chuối. Ta bóc vỏ rồi ăn luôn. Hai món kia đều cần làm nóng.',
            aImage: { src: IMAGES.banana, alt: 'A ripe yellow banana.', altVn: 'Một quả chuối chín vàng.' },
          },
          {
            value: 500,
            q: 'Mr Bowen has one egg. Name TWO different ways he could cook it.',
            qVn: 'Thầy Bowen có một quả trứng. Hãy nêu HAI cách khác nhau để nấu nó.',
            a: 'Fry it in a pan of hot oil, or boil it in a pot of water. (Also fine: scramble it, or bake it inside a cake.)',
            aVn: 'Chiên trong chảo dầu nóng, hoặc luộc trong nồi nước. (Cũng được: đánh tan rán lên, hoặc cho vào bánh để nướng.)',
            aImage: { src: IMAGES.friedegg, alt: 'A fried egg on a plate.', altVn: 'Một quả trứng ốp la trên đĩa.' },
          },
        ],
      },

      // ── Cooking · where the food starts ───────────────────────────────────
      {
        name: 'Where Does It Come From?',
        nameVn: 'Thức Ăn Từ Đâu Đến?',
        clues: [
          {
            value: 100,
            q: 'Which animal gives us milk?',
            qVn: 'Con vật nào cho chúng ta sữa?',
            a: 'The cow.',
            aVn: 'Con bò. (Tiếng Anh: the cow.)',
            aImage: { src: IMAGES.cow, alt: 'A cow standing in a field.', altVn: 'Một con bò đứng trên đồng cỏ.' },
          },
          {
            value: 200,
            q: 'Which animal gives us eggs?',
            qVn: 'Con vật nào cho chúng ta trứng?',
            a: 'The hen.',
            aVn: 'Con gà mái. (Tiếng Anh: the hen.)',
            aImage: { src: IMAGES.hen, alt: 'A brown hen.', altVn: 'Một con gà mái màu nâu.' },
          },
          {
            value: 300,
            q: 'Rice does not grow in a shop. It grows in a big field full of water. What do we call that field?',
            qVn: 'Cây lúa không mọc trong cửa hàng. Nó mọc trên một cánh đồng đầy nước. Cánh đồng đó gọi là gì?',
            a: 'A rice field. In English we also say a paddy field.',
            aVn: 'Cánh đồng lúa. Tiếng Anh: a rice field, hoặc a paddy field.',
            aImage: { src: IMAGES.riceField, alt: 'Green rice fields full of water, with farmers working in them.', altVn: 'Những thửa ruộng lúa xanh ngập nước, có bà con đang làm việc.' },
          },
          {
            value: 400,
            q: 'Cheese and butter both start as the same white drink. What is it?',
            qVn: 'Phô mai và bơ đều bắt đầu từ cùng một thức uống màu trắng. Đó là gì?',
            a: 'Milk.',
            aVn: 'Sữa. (Tiếng Anh: milk.)',
            aImage: { src: IMAGES.milk, alt: 'A glass of milk.', altVn: 'Một ly sữa.' },
          },
          {
            value: 500,
            q: 'Honey is made by a tiny animal with wings. Which one?',
            qVn: 'Mật ong do một con vật nhỏ có cánh làm ra. Con gì vậy?',
            a: 'The bee. Bees take sweet juice from flowers and turn it into honey.',
            aVn: 'Con ong. Ong lấy mật ngọt từ hoa rồi biến nó thành mật ong.',
            aImage: { src: IMAGES.bee, alt: 'A bee on a flower.', altVn: 'Một con ong đậu trên bông hoa.' },
          },
        ],
      },

      // ── Science · Stage 1, the senses ─────────────────────────────────────
      {
        name: 'Our Five Senses',
        nameVn: 'Năm Giác Quan',
        clues: [
          {
            value: 100,
            q: 'Which part of your body do you SEE with?',
            qVn: 'Em NHÌN bằng bộ phận nào trên cơ thể?',
            a: 'Your eyes.',
            aVn: 'Đôi mắt. (Tiếng Anh: your eyes.)',
            aImage: { src: IMAGES.eye, alt: 'A close-up of a human eye.', altVn: 'Cận cảnh một con mắt người.' },
          },
          {
            value: 200,
            q: 'Which part of your body do you HEAR with?',
            qVn: 'Em NGHE bằng bộ phận nào trên cơ thể?',
            a: 'Your ears.',
            aVn: 'Đôi tai. (Tiếng Anh: your ears.)',
            aImage: { src: IMAGES.ears, alt: 'A child holding both hands over his ears.', altVn: 'Một bạn nhỏ lấy hai tay bịt tai lại.' },
          },
          {
            value: 300,
            q: 'Mr Bowen is in the next room. He cannot see the kitchen, but he knows the cake is ready. Which part of his body told him?',
            qVn: 'Thầy Bowen đang ở phòng bên. Thầy không nhìn thấy nhà bếp, nhưng thầy biết bánh đã chín. Bộ phận nào trên cơ thể đã báo cho thầy?',
            a: 'His nose. He can SMELL it.',
            aVn: 'Cái mũi. Thầy NGỬI thấy mùi bánh.',
            aImage: { src: IMAGES.cake, alt: 'A cake.', altVn: 'Một chiếc bánh ngọt.' },
          },
          {
            value: 400,
            q: 'You put a piece of lemon on your tongue. Is it sweet, or is it sour?',
            qVn: 'Em đặt một miếng chanh lên lưỡi. Nó ngọt hay chua?',
            a: 'Sour! Your tongue is the part that tastes.',
            aVn: 'Chua! Cái lưỡi là bộ phận nếm vị. (Tiếng Anh: sour.)',
            aImage: { src: IMAGES.lemon, alt: 'A whole lemon and a lemon cut in half.', altVn: 'Một quả chanh nguyên và một quả chanh cắt đôi.' },
          },
          {
            value: 500,
            q: 'Mr Bowen shuts his eyes. He puts his hand in a bowl. It feels cold, hard and wet. What is in the bowl?',
            qVn: 'Thầy Bowen nhắm mắt lại. Thầy thò tay vào một cái bát. Thầy thấy lạnh, cứng và ướt. Trong bát có gì?',
            a: 'Ice. He used TOUCH — his hands — because his eyes were shut.',
            aVn: 'Nước đá. Thầy dùng xúc giác — đôi tay — vì mắt đang nhắm.',
            aImage: { src: IMAGES.ice, alt: 'Ice cubes in a glass of water.', altVn: 'Những viên đá trong ly nước.' },
          },
        ],
      },

      // ── Science · Stage 1, living things ──────────────────────────────────
      {
        name: 'Living or Not Living?',
        nameVn: 'Vật Sống Hay Không Sống?',
        clues: [
          {
            value: 100,
            q: 'Is a dog living, or not living?',
            qVn: 'Con chó là vật sống hay không sống?',
            a: 'Living. It eats, it moves and it grows.',
            aVn: 'Vật sống. Nó ăn, nó di chuyển và nó lớn lên.',
            aImage: { src: IMAGES.dog, alt: 'A dog.', altVn: 'Một chú chó.' },
          },
          {
            value: 200,
            q: 'Is a spoon living, or not living?',
            qVn: 'Cái thìa là vật sống hay không sống?',
            a: 'Not living. It has never been alive.',
            aVn: 'Không sống. Nó chưa bao giờ sống cả.',
            aImage: { src: IMAGES.spoon, alt: 'A metal spoon.', altVn: 'Một cái thìa kim loại.' },
          },
          {
            value: 300,
            q: 'Is a tree living, or not living? Say why.',
            qVn: 'Cái cây là vật sống hay không sống? Vì sao?',
            a: 'Living. It grows, and it needs water and light. Living does not mean it has to walk about.',
            aVn: 'Vật sống. Nó lớn lên và nó cần nước với ánh sáng. Sống không có nghĩa là phải đi lại được.',
            aImage: { src: IMAGES.tree, alt: 'A large green tree.', altVn: 'Một cái cây to xanh tốt.' },
          },
          {
            value: 400,
            q: 'There is a carrot in your soup. Is that carrot living NOW? Careful!',
            qVn: 'Trong bát canh của em có một miếng cà rốt. Miếng cà rốt đó BÂY GIỜ có phải vật sống không? Cẩn thận nhé!',
            a: 'Not living now. It WAS living when it was growing in the ground, but it is not living any more.',
            aVn: 'Bây giờ không sống. Nó ĐÃ từng sống khi còn mọc dưới đất, nhưng bây giờ thì không còn sống nữa.',
            aImage: { src: IMAGES.carrot, alt: 'Fresh carrots.', altVn: 'Những củ cà rốt tươi.' },
          },
          {
            value: 500,
            q: 'A little plant is pushing up out of the soil. Name TWO things it needs so it can keep growing.',
            qVn: 'Một cây con đang nhú lên khỏi mặt đất. Hãy nêu HAI thứ nó cần để tiếp tục lớn lên.',
            a: 'Water and light. (Also accept air, and soil to grow in.)',
            aVn: 'Nước và ánh sáng. (Cũng chấp nhận: không khí, và đất để mọc.)',
            aImage: { src: IMAGES.seedling, alt: 'A small green seedling pushing up out of the soil.', altVn: 'Một cây con màu xanh đang nhú lên khỏi mặt đất.' },
          },
        ],
      },

      // ── Science · Stage 1, change ─────────────────────────────────────────
      {
        name: 'Hot, Cold and Changing',
        nameVn: 'Nóng, Lạnh và Thay Đổi',
        clues: [
          {
            value: 100,
            q: 'We put water in the freezer and leave it all night. What does it turn into?',
            qVn: 'Chúng ta cho nước vào ngăn đá và để cả đêm. Nước biến thành gì?',
            a: 'Ice. The cold made it hard.',
            aVn: 'Nước đá. Cái lạnh đã làm nó cứng lại.',
            aImage: { src: IMAGES.ice, alt: 'Ice cubes in a glass of water.', altVn: 'Những viên đá trong ly nước.' },
          },
          {
            value: 200,
            q: 'We leave an ice lolly outside in the hot sun. What happens to it?',
            qVn: 'Chúng ta để một que kem ngoài trời nắng nóng. Chuyện gì sẽ xảy ra?',
            a: 'It melts. It turns into a puddle of liquid.',
            aVn: 'Nó tan chảy. Nó biến thành một vũng nước.',
            aImage: { src: IMAGES.meltingIcecream, alt: 'An ice lolly melting into a coloured puddle on hot pavement, with only the stick left.', altVn: 'Một que kem đang tan thành vũng nước màu trên vỉa hè nóng, chỉ còn lại chiếc que.' },
          },
          {
            value: 300,
            q: 'The water in the pot is very hot. It is full of bubbles. What is the water doing?',
            qVn: 'Nước trong nồi rất nóng. Nó sủi đầy bọt. Nước đang làm gì?',
            a: 'Boiling.',
            aVn: 'Đang sôi. (Tiếng Anh: boiling.)',
            aImage: { src: IMAGES.boilingPot, alt: 'A pot of water boiling on a stove.', altVn: 'Một nồi nước đang sôi trên bếp.' },
          },
          {
            value: 400,
            q: 'Mr Bowen cracks an egg into a hot pan. Does it stay runny?',
            qVn: 'Thầy Bowen đập một quả trứng vào chảo nóng. Trứng có còn lỏng không?',
            a: 'No. It goes white and firm. The heat changed it.',
            aVn: 'Không. Nó chuyển sang màu trắng và cứng lại. Sức nóng đã làm nó thay đổi.',
            aImage: { src: IMAGES.friedegg, alt: 'A fried egg, white and firm, on a plate.', altVn: 'Một quả trứng ốp la, đã trắng và chín, trên đĩa.' },
          },
          {
            value: 500,
            q: 'Ice melts into water, and water freezes back into ice. Can Mr Bowen turn a cooked egg back into a runny one?',
            qVn: 'Nước đá tan thành nước, rồi nước lại đông thành đá. Vậy thầy Bowen có thể biến quả trứng đã chín trở lại thành trứng lỏng không?',
            a: 'No — never. Some changes can go back again, and some can never go back.',
            aVn: 'Không — không bao giờ. Có những thay đổi quay lại được, và có những thay đổi thì không bao giờ quay lại được.',
          },
        ],
      },
    ],
  },

  // ── 6 · YEAR 1 · PICTURES THAT MAKE THEM THINK ────────────────────────────
  // Five columns, and every clue is a picture with a few words over it. The
  // class cannot read a sentence yet, so the words stay short and the pictures
  // carry the question.
  //
  // Almost every clue is a CHOICE, not a name. "What is it?" only asks a child
  // to remember a word; "Which one makes toast?" makes them look at three
  // things and think about what each one does. The 500s want two steps: an egg
  // is the odd one out because the other three are made from milk.
  //
  // `aIndex` says which picture is right, and it lights up green on the reveal.
  // With two pictures the class votes all at once: left hand for the left
  // picture, right hand for the right.
  //
  // Dishes from the World puts the country's flag beside its question (a
  // `qImage` on a picture clue), because "Italy" means nothing to a six-year-old
  // until they can see which flag it is.
  //
  // Claps counts the beats in a spoken word, and the 500 is still "fire", which
  // sounds long and is one clap.
  {
    id: 'year1-pictures',
    title: 'Year 1 · Picture Questions',
    titleVn: 'Lớp 1 · Câu hỏi bằng hình',
    subtitle: 'Kitchen, food, dishes from the world, claps, which is…?',
    subtitleVn: 'Nhà bếp, đồ ăn, món ăn thế giới, vỗ tay, cái nào…?',
    icon: 'Apple',
    accent: '#16a34a',
    categories: [
      {
        name: 'In the Kitchen',
        nameVn: 'Trong Nhà Bếp',
        clues: [
          {
            value: 100,
            q: 'Which one is NOT in the kitchen?',
            qVn: 'Cái nào KHÔNG có trong nhà bếp?',
            qImages: [
              { src: IMAGES.bed, alt: 'A bed.', altVn: 'Một cái giường.' },
              { src: IMAGES.pot, alt: 'A cooking pot.', altVn: 'Một cái nồi.' },
              { src: IMAGES.pan, alt: 'A frying pan.', altVn: 'Một cái chảo.' },
            ],
            aIndex: 0,
            a: 'The bed. A bed is in the bedroom.',
            aVn: 'Cái giường. Giường ở trong phòng ngủ.',
          },
          {
            value: 200,
            q: 'Which one makes toast?',
            qVn: 'Cái nào nướng bánh mì?',
            qImages: [
              { src: IMAGES.kettle, alt: 'A white electric kettle.', altVn: 'Một ấm đun nước điện màu trắng.' },
              { src: IMAGES.microwave, alt: 'A microwave oven.', altVn: 'Một cái lò vi sóng.' },
              { src: IMAGES.toaster, alt: 'A toaster.', altVn: 'Một máy nướng bánh mì.' },
            ],
            aIndex: 2,
            a: 'The toaster.',
            aVn: 'Máy nướng bánh mì. (Tiếng Anh: the toaster.)',
          },
          {
            value: 300,
            q: 'Where do we keep ice cream?',
            qVn: 'Chúng ta cất kem ở đâu?',
            qImages: [
              { src: IMAGES.fridge, alt: 'A tall fridge.', altVn: 'Một chiếc tủ lạnh cao.' },
              { src: IMAGES.oven, alt: 'An oven in a kitchen.', altVn: 'Một cái lò nướng trong bếp.' },
              { src: IMAGES.microwave, alt: 'A microwave oven.', altVn: 'Một cái lò vi sóng.' },
            ],
            aIndex: 0,
            a: 'In the fridge. It is cold inside.',
            aVn: 'Trong tủ lạnh. Bên trong tủ lạnh rất lạnh.',
          },
          {
            value: 400,
            q: 'Which one cooks rice?',
            qVn: 'Cái nào nấu cơm?',
            qImages: [
              { src: IMAGES.toaster, alt: 'A toaster.', altVn: 'Một máy nướng bánh mì.' },
              { src: IMAGES.kettle, alt: 'A white electric kettle.', altVn: 'Một ấm đun nước điện màu trắng.' },
              { src: IMAGES.riceCooker, alt: 'A white rice cooker with a round lid.', altVn: 'Một nồi cơm điện màu trắng có nắp tròn.' },
            ],
            aIndex: 2,
            a: 'The rice cooker.',
            aVn: 'Nồi cơm điện. (Tiếng Anh: the rice cooker.)',
          },
          {
            value: 500,
            q: 'Which one is for a hot pan?',
            qVn: 'Cái nào dùng để cầm chảo nóng?',
            qImages: [
              { src: IMAGES.sock, alt: 'A pair of red socks.', altVn: 'Một đôi tất màu đỏ.' },
              { src: IMAGES.ovenGlove, alt: 'A red oven glove.', altVn: 'Một chiếc găng tay nhắc nồi màu đỏ.' },
              { src: IMAGES.hat, alt: 'A hat.', altVn: 'Một cái mũ.' },
            ],
            aIndex: 1,
            a: 'The oven glove. It keeps your hand safe.',
            aVn: 'Găng tay nhắc nồi. Nó giữ cho tay em an toàn. (Tiếng Anh: an oven glove.)',
          },
        ],
      },
      {
        name: 'Food',
        nameVn: 'Đồ Ăn',
        clues: [
          {
            value: 100,
            q: 'Which one is a fruit?',
            qVn: 'Cái nào là trái cây?',
            qImages: [
              { src: IMAGES.broccoli, alt: 'A head of broccoli.', altVn: 'Một cây súp lơ xanh.' },
              { src: IMAGES.potato, alt: 'Two potatoes, one cut open.', altVn: 'Hai củ khoai tây, một củ bổ ra.' },
              { src: IMAGES.banana, alt: 'Bananas.', altVn: 'Những quả chuối.' },
            ],
            aIndex: 2,
            a: 'The banana.',
            aVn: 'Quả chuối. (Tiếng Anh: the banana.)',
          },
          {
            value: 200,
            q: 'Which one is NOT sweet?',
            qVn: 'Cái nào KHÔNG ngọt?',
            qImages: [
              { src: IMAGES.doughnut, alt: 'A chocolate doughnut with sprinkles.', altVn: 'Một chiếc bánh vòng phủ sô-cô-la.' },
              { src: IMAGES.onion, alt: 'Onions, some cut in half.', altVn: 'Những củ hành, có củ bổ đôi.' },
              { src: IMAGES.icecream, alt: 'An ice cream cone.', altVn: 'Một cây kem ốc quế.' },
            ],
            aIndex: 1,
            a: 'The onion.',
            aVn: 'Củ hành. (Tiếng Anh: the onion.)',
          },
          {
            value: 300,
            q: 'Which one grows on a tree?',
            qVn: 'Cái nào mọc trên cây?',
            qImages: [
              { src: IMAGES.orange, alt: 'Oranges, one cut open.', altVn: 'Những quả cam, có một quả bổ ra.' },
              { src: IMAGES.carrot, alt: 'Carrots.', altVn: 'Những củ cà rốt.' },
              { src: IMAGES.ginger, alt: 'Ginger root.', altVn: 'Củ gừng.' },
            ],
            aIndex: 0,
            a: 'The orange. Carrots and ginger grow under the ground.',
            aVn: 'Quả cam. Cà rốt và gừng mọc dưới đất.',
          },
          {
            value: 400,
            q: 'Which one is made from potatoes?',
            qVn: 'Món nào làm từ khoai tây?',
            qImages: [
              { src: IMAGES.bread, alt: 'A loaf of bread.', altVn: 'Một ổ bánh mì.' },
              { src: IMAGES.noodles, alt: 'A bowl of phở noodle soup.', altVn: 'Một bát phở.' },
              { src: IMAGES.chips, alt: 'Chips (French fries).', altVn: 'Khoai tây chiên.' },
            ],
            aIndex: 2,
            a: 'Chips. Some people say French fries.',
            aVn: 'Khoai tây chiên. (Tiếng Anh: chips, hoặc French fries.)',
          },
          {
            value: 500,
            q: 'Which one is different?',
            qVn: 'Cái nào khác các cái còn lại?',
            qImages: [
              { src: IMAGES.milk, alt: 'A glass of milk.', altVn: 'Một ly sữa.' },
              { src: IMAGES.cheese, alt: 'Cheese.', altVn: 'Phô mai.' },
              { src: IMAGES.egg, alt: 'Eggs.', altVn: 'Những quả trứng.' },
              { src: IMAGES.yoghurt, alt: 'A bowl of yoghurt.', altVn: 'Một bát sữa chua.' },
            ],
            aIndex: 2,
            a: 'The egg. It comes from a hen. The others are made from milk.',
            aVn: 'Quả trứng. Trứng do gà mái đẻ. Ba thứ kia đều làm từ sữa.',
          },
        ],
      },
      {
        name: 'Dishes from the World',
        nameVn: 'Món Ăn Thế Giới',
        clues: [
          {
            value: 100,
            q: 'Which one is from Vietnam?',
            qVn: 'Món nào đến từ Việt Nam?',
            qImage: { src: IMAGES.flagVietnam, alt: 'The flag of Vietnam.', altVn: 'Quốc kỳ Việt Nam.' },
            qImages: [
              { src: IMAGES.pizza, alt: 'A pizza.', altVn: 'Một chiếc bánh pizza.' },
              { src: IMAGES.banhMi, alt: 'A bánh mì sandwich.', altVn: 'Một ổ bánh mì kẹp.' },
            ],
            aIndex: 1,
            a: 'Bánh mì.',
            aVn: 'Bánh mì.',
          },
          {
            value: 200,
            q: 'Which one is from Italy?',
            qVn: 'Món nào đến từ nước Ý?',
            qImage: { src: IMAGES.flagItaly, alt: 'The flag of Italy.', altVn: 'Quốc kỳ Ý.' },
            qImages: [
              { src: IMAGES.pizza, alt: 'A pizza.', altVn: 'Một chiếc bánh pizza.' },
              { src: IMAGES.springroll, alt: 'Spring rolls.', altVn: 'Nem rán.' },
            ],
            aIndex: 0,
            a: 'Pizza.',
            aVn: 'Bánh pizza.',
          },
          {
            value: 300,
            q: 'Which one is from Japan?',
            qVn: 'Món nào đến từ Nhật Bản?',
            qImage: { src: IMAGES.flagJapan, alt: 'The flag of Japan.', altVn: 'Quốc kỳ Nhật Bản.' },
            qImages: [
              { src: IMAGES.banhMi, alt: 'A bánh mì sandwich.', altVn: 'Một ổ bánh mì kẹp.' },
              { src: IMAGES.sushi, alt: 'A plate of sushi.', altVn: 'Một đĩa sushi.' },
              { src: IMAGES.croissant, alt: 'A croissant.', altVn: 'Một chiếc bánh sừng bò.' },
            ],
            aIndex: 1,
            a: 'Sushi.',
            aVn: 'Sushi.',
          },
          {
            value: 400,
            q: 'Which one is from Korea?',
            qVn: 'Món nào đến từ Hàn Quốc?',
            qImage: { src: IMAGES.flagKorea, alt: 'The flag of South Korea.', altVn: 'Quốc kỳ Hàn Quốc.' },
            qImages: [
              { src: IMAGES.kimchi, alt: 'Kimchi.', altVn: 'Kim chi.' },
              { src: IMAGES.sushi, alt: 'A plate of sushi.', altVn: 'Một đĩa sushi.' },
              { src: IMAGES.pizza, alt: 'A pizza.', altVn: 'Một chiếc bánh pizza.' },
            ],
            aIndex: 0,
            a: 'Kimchi.',
            aVn: 'Kim chi.',
          },
          {
            value: 500,
            q: 'Which one is from France?',
            qVn: 'Món nào đến từ nước Pháp?',
            qImage: { src: IMAGES.flagFrance, alt: 'The flag of France.', altVn: 'Quốc kỳ Pháp.' },
            qImages: [
              { src: IMAGES.noodles, alt: 'A bowl of phở noodle soup.', altVn: 'Một bát phở.' },
              { src: IMAGES.croissant, alt: 'A croissant.', altVn: 'Một chiếc bánh sừng bò.' },
              { src: IMAGES.kimchi, alt: 'Kimchi.', altVn: 'Kim chi.' },
            ],
            aIndex: 1,
            a: 'The croissant. Fun fact: the bread in bánh mì came from France too!',
            aVn: 'Bánh sừng bò. Điều thú vị: bánh mì của chúng ta cũng bắt nguồn từ nước Pháp!',
          },
        ],
      },
      {
        // The word under each picture is English in both languages: it is the
        // English word the class claps.
        name: 'Claps',
        nameVn: 'Vỗ Tay',
        clues: [
          {
            value: 100,
            q: 'How many claps?',
            qVn: 'Vỗ tay mấy cái?',
            qImages: [{ src: IMAGES.tiger, alt: 'A tiger.', altVn: 'Một con hổ.', label: 'tiger', labelVn: 'tiger' }],
            a: '2 claps: ti · ger',
            aVn: '2 cái: ti · ger',
          },
          {
            value: 200,
            q: 'How many claps?',
            qVn: 'Vỗ tay mấy cái?',
            qImages: [{ src: IMAGES.elephant, alt: 'An elephant.', altVn: 'Một con voi.', label: 'elephant', labelVn: 'elephant' }],
            a: '3 claps: el · e · phant',
            aVn: '3 cái: el · e · phant',
          },
          {
            value: 300,
            q: 'Which one has 1 clap?',
            qVn: 'Từ nào chỉ vỗ tay 1 cái?',
            qImages: [
              { src: IMAGES.penguin, alt: 'A penguin.', altVn: 'Một con chim cánh cụt.', label: 'penguin', labelVn: 'penguin' },
              { src: IMAGES.duck, alt: 'Two ducks.', altVn: 'Hai con vịt.', label: 'duck', labelVn: 'duck' },
              { src: IMAGES.turtle, alt: 'A turtle swimming.', altVn: 'Một con rùa đang bơi.', label: 'turtle', labelVn: 'turtle' },
            ],
            aIndex: 1,
            a: 'Duck: 1 clap. Pen · guin and tur · tle have 2.',
            aVn: 'Duck: 1 cái. Pen · guin và tur · tle có 2 cái.',
          },
          {
            value: 400,
            q: 'How many claps?',
            qVn: 'Vỗ tay mấy cái?',
            qImages: [{ src: IMAGES.hippo, alt: 'A hippopotamus.', altVn: 'Một con hà mã.', label: 'hippopotamus', labelVn: 'hippopotamus' }],
            a: '5 claps: hip · po · pot · a · mus',
            aVn: '5 cái: hip · po · pot · a · mus',
          },
          {
            value: 500,
            q: 'How many claps?',
            qVn: 'Vỗ tay mấy cái?',
            qImages: [{ src: IMAGES.fire, alt: 'A campfire burning at night.', altVn: 'Một đống lửa trại cháy trong đêm.', label: 'fire', labelVn: 'fire' }],
            a: '1 clap: fire. It sounds long, but it is one clap.',
            aVn: '1 cái: fire. Nghe thì dài, nhưng chỉ vỗ một cái.',
          },
        ],
      },
      {
        // The pictures never show the real sizes — an ant and a bee fill the
        // same frame — so every one of these has to be answered from what the
        // child knows, not from what they see. The opposites (smaller,
        // lighter) and the -est words are the step up from "bigger".
        name: 'Which Is…?',
        nameVn: 'Cái Nào…?',
        clues: [
          {
            value: 100,
            q: 'Which is smaller?',
            qVn: 'Con nào nhỏ hơn?',
            qImages: [
              { src: IMAGES.bee, alt: 'A bee.', altVn: 'Một con ong.' },
              { src: IMAGES.ant, alt: 'An ant.', altVn: 'Một con kiến.' },
            ],
            aIndex: 1,
            a: 'An ant is smaller than a bee.',
            aVn: 'Con kiến nhỏ hơn con ong.',
          },
          {
            value: 200,
            q: 'Which is the slowest?',
            qVn: 'Con nào chậm nhất?',
            qImages: [
              { src: IMAGES.tiger, alt: 'A tiger.', altVn: 'Một con hổ.' },
              { src: IMAGES.snail, alt: 'A snail.', altVn: 'Một con ốc sên.' },
              { src: IMAGES.turtle, alt: 'A turtle swimming.', altVn: 'Một con rùa đang bơi.' },
            ],
            aIndex: 1,
            a: 'The snail is the slowest.',
            aVn: 'Con ốc sên chậm nhất.',
          },
          {
            value: 300,
            q: 'Which is lighter?',
            qVn: 'Cái nào nhẹ hơn?',
            qImages: [
              { src: IMAGES.whale, alt: 'A whale jumping out of the sea.', altVn: 'Một con cá voi nhảy lên khỏi mặt biển.' },
              { src: IMAGES.bus, alt: 'A yellow bus.', altVn: 'Một chiếc xe buýt màu vàng.' },
            ],
            aIndex: 1,
            a: 'A bus is lighter than a whale.',
            aVn: 'Xe buýt nhẹ hơn cá voi.',
          },
          {
            value: 400,
            q: 'Which is the biggest?',
            qVn: 'Cái nào to nhất?',
            qImages: [
              { src: IMAGES.earth, alt: 'The Earth seen from space.', altVn: 'Trái Đất nhìn từ vũ trụ.' },
              { src: IMAGES.moon, alt: 'The full moon.', altVn: 'Mặt Trăng tròn.' },
              { src: IMAGES.sun, alt: 'The sun.', altVn: 'Mặt Trời.' },
            ],
            aIndex: 2,
            a: 'The sun is the biggest.',
            aVn: 'Mặt Trời to nhất.',
          },
          {
            value: 500,
            q: 'Who is taller?',
            qVn: 'Ai cao hơn?',
            qImages: [
              { src: IMAGES.mrBowen, alt: 'Mr Bowen.', altVn: 'Thầy Bowen.', label: 'Mr Bowen', labelVn: 'Thầy Bowen' },
              { src: IMAGES.mrSeth, alt: 'Mr Seth.', altVn: 'Thầy Seth.', label: 'Mr Seth', labelVn: 'Thầy Seth' },
            ],
            aIndex: 0,
            a: 'Mr Bowen is taller than Mr Seth.',
            aVn: 'Thầy Bowen cao hơn thầy Seth.',
          },
        ],
      },
    ],
  },

  // ── 7 · SCIENCE UNIT 2 ────────────────────────────────────────────────────
  // Science 2.1–2.7, one category per idea rather than per lesson. 2.4 was
  // taught after this board was built, so it is on board 9 with 2.8.
  //
  // This is the Year 7 board that is built on pictures: 29 of the 30 clues
  // carry one. The photographs are the ones from the lessons, so a clue is a
  // memory of a slide. The drawn ones — particle boxes, symbol squares, H₂O,
  // Co and CO, the heating curve and the air pie — put the symbol or the
  // diagram on the card as the thing to read, because in this unit the
  // symbol IS the English.
  {
    id: 'science-u2',
    title: 'Science · Unit 2 · 2.1–2.7',
    titleVn: 'Khoa học · Chương 2 · Bài 2.1–2.7',
    subtitle: 'States, particles, elements, compounds and mixtures',
    subtitleVn: 'Các thể, hạt, nguyên tố, hợp chất và hỗn hợp',
    icon: 'Atom',
    accent: '#e11d48',
    categories: [
      {
        name: 'States of Matter',
        nameVn: 'Các thể của chất',
        clues: [
          {
            value: 100,
            q: 'Ice: solid, liquid or gas? Give one reason.',
            qVn: 'Nước đá: rắn, lỏng hay khí? Nêu một lý do.',
            qImage: { src: IMAGES.ice, alt: 'Ice cubes in a glass of water.', altVn: 'Những viên đá trong ly nước.' },
            a: 'A solid. It keeps its shape. (Or: it keeps its volume. It cannot be poured.)',
            aVn: 'Chất rắn. Nó giữ nguyên hình dạng. (Hoặc: nó giữ nguyên thể tích. Nó không rót được.)',
          },
          {
            value: 200,
            q: 'Mercury is a metal. Is it a solid, a liquid or a gas?',
            qVn: 'Thuỷ ngân là một kim loại. Nó là chất rắn, chất lỏng hay chất khí?',
            qImage: { src: IMAGES.mercury, alt: 'Silver liquid mercury being poured.', altVn: 'Thuỷ ngân lỏng màu bạc đang được rót.' },
            a: 'A liquid. It can be poured, and it takes the shape of its container.',
            aVn: 'Chất lỏng. Nó rót được, và nó có hình dạng của vật chứa nó.',
          },
          {
            value: 300,
            q: 'You can pour sand. So is sand a liquid?',
            qVn: 'Em có thể rót cát. Vậy cát có phải là chất lỏng không?',
            qImage: { src: IMAGES.hourglass, alt: 'Sand pouring through an hourglass.', altVn: 'Cát đang chảy qua một chiếc đồng hồ cát.' },
            a: 'No. Each grain of sand is a solid. Each grain keeps its own shape and volume.',
            aVn: 'Không. Mỗi hạt cát là một chất rắn. Mỗi hạt giữ nguyên hình dạng và thể tích của nó.',
          },
          {
            value: 400,
            q: 'Only one state of matter can be compressed (squashed). Which one?',
            qVn: 'Chỉ có một thể của chất có thể bị nén (ép lại). Đó là thể nào?',
            a: 'A gas. Its particles are far apart, so they can be pushed closer together.',
            aVn: 'Chất khí. Các hạt của nó ở xa nhau, nên có thể bị đẩy lại gần nhau hơn.',
            aImage: { src: IMAGES.balloon, alt: 'A hot-air balloon filling up with gas.', altVn: 'Một khinh khí cầu đang được bơm đầy khí.' },
          },
          {
            value: 500,
            q: 'You can squash a sponge. But a sponge is a solid. How?',
            qVn: 'Em có thể bóp một miếng bọt biển. Nhưng bọt biển là chất rắn. Tại sao bóp được?',
            qImage: { src: IMAGES.sponge, alt: 'A yellow kitchen sponge, full of holes.', altVn: 'Một miếng bọt biển màu vàng, có rất nhiều lỗ.' },
            a: 'A sponge is full of holes, and the holes are full of air. You squash the air — a gas. The solid does not get smaller.',
            aVn: 'Bọt biển có rất nhiều lỗ, và các lỗ chứa đầy không khí. Em đang nén không khí — một chất khí. Phần chất rắn không nhỏ đi.',
          },
        ],
      },
      {
        name: 'Particles',
        nameVn: 'Các hạt',
        clues: [
          {
            value: 100,
            q: 'Solid, liquid or gas?',
            qVn: 'Rắn, lỏng hay khí?',
            qImage: { src: IMAGES.particlesSolid, alt: 'Particles in neat rows, tightly packed and touching.', altVn: 'Các hạt xếp thành hàng ngay ngắn, sát nhau và chạm nhau.' },
            a: 'A solid. The particles are in a fixed pattern, tightly packed.',
            aVn: 'Chất rắn. Các hạt xếp theo một trật tự cố định, sát nhau.',
          },
          {
            value: 200,
            q: 'Solid, liquid or gas?',
            qVn: 'Rắn, lỏng hay khí?',
            qImage: { src: IMAGES.particlesGas, alt: 'A few particles, far apart, spread through the whole box.', altVn: 'Một vài hạt ở xa nhau, rải khắp cả hộp.' },
            a: 'A gas. The particles do not touch. They are far apart.',
            aVn: 'Chất khí. Các hạt không chạm nhau. Chúng ở xa nhau.',
          },
          {
            value: 300,
            q: 'Solid, liquid or gas? Look carefully.',
            qVn: 'Rắn, lỏng hay khí? Nhìn kỹ nhé.',
            qImage: { src: IMAGES.particlesLiquid, alt: 'Particles at the bottom of the box, touching, but not in rows.', altVn: 'Các hạt ở đáy hộp, chạm nhau, nhưng không xếp thành hàng.' },
            a: 'A liquid. The particles still touch, but there is no pattern. They move past one another.',
            aVn: 'Chất lỏng. Các hạt vẫn chạm nhau, nhưng không có trật tự. Chúng di chuyển qua nhau.',
          },
          {
            value: 400,
            q: 'Space is almost empty. What is the word for a space with no particles at all?',
            qVn: 'Vũ trụ gần như trống rỗng. Một khoảng không hoàn toàn không có hạt nào gọi là gì?',
            qImage: { src: IMAGES.earth, alt: 'The Earth seen from space.', altVn: 'Trái Đất nhìn từ vũ trụ.' },
            a: 'A vacuum. A vacuum contains nothing.',
            aVn: 'Chân không (vacuum). Chân không không chứa gì cả.',
          },
          {
            value: 500,
            q: 'Nobody stirs the water, but the ink spreads out. Why? Use the word "particles".',
            qVn: 'Không ai khuấy nước, nhưng mực vẫn lan ra. Tại sao? Hãy dùng từ "particles" (hạt).',
            qImage: { src: IMAGES.diffusion, alt: 'Ink spreading slowly through a glass of water.', altVn: 'Mực đang từ từ lan ra trong một cốc nước.' },
            a: 'The particles in a liquid move past one another. The ink particles move in between the water particles.',
            aVn: 'Các hạt trong chất lỏng di chuyển qua nhau. Các hạt mực đi vào giữa các hạt nước.',
          },
        ],
      },
      {
        name: 'Changes of State',
        nameVn: 'Sự chuyển thể',
        clues: [
          {
            value: 100,
            q: 'Solid to liquid. What is the word?',
            qVn: 'Từ rắn sang lỏng. Từ đó là gì?',
            qImage: { src: IMAGES.meltingIcecream, alt: 'An ice lolly melting into a puddle on hot pavement.', altVn: 'Một que kem đang tan thành vũng nước trên vỉa hè nóng.' },
            a: 'Melt. The ice lolly is melting.',
            aVn: 'Melt (nóng chảy). Que kem đang tan chảy.',
          },
          {
            value: 200,
            q: 'Liquid to gas, fast, at 100 °C. What is the word? What is the gas called?',
            qVn: 'Từ lỏng sang khí, nhanh, ở 100 °C. Từ đó là gì? Chất khí đó gọi là gì?',
            qImage: { src: IMAGES.boilingKettle, alt: 'A kettle boiling, with steam coming out.', altVn: 'Một chiếc ấm đang sôi, hơi nước bốc ra.' },
            a: 'Boil. The gas is steam.',
            aVn: 'Boil (sôi). Chất khí đó là steam (hơi nước).',
          },
          {
            value: 300,
            q: 'Evaporate and boil both change a liquid into a gas. What is the difference?',
            qVn: 'Bay hơi và sôi đều biến chất lỏng thành chất khí. Khác nhau ở đâu?',
            a: 'Evaporation is slow, only from the surface. Boiling is fast, all through the liquid.',
            aVn: 'Bay hơi thì chậm, chỉ ở bề mặt. Sôi thì nhanh, xảy ra khắp chất lỏng.',
          },
          {
            value: 400,
            q: 'Mr Bowen puts ice in a glass of water. Soon the OUTSIDE of the glass is wet. Where does the water come from?',
            qVn: 'Thầy Bowen cho đá vào một cốc nước. Một lúc sau, mặt NGOÀI của cốc bị ướt. Nước đó từ đâu ra?',
            qImage: { src: IMAGES.coldGlass, alt: 'Drops of water on the outside of a cold glass.', altVn: 'Những giọt nước ở mặt ngoài một chiếc cốc lạnh.' },
            a: 'From the air. Water vapour in the air touches the cold glass and condenses into drops. It does not come through the glass.',
            aVn: 'Từ không khí. Hơi nước trong không khí chạm vào cốc lạnh và ngưng tụ thành giọt. Nước không thấm qua thành cốc.',
          },
          {
            value: 500,
            q: 'Water is heated. Why does the line go flat at 100 °C?',
            qVn: 'Nước được đun nóng. Tại sao đường đồ thị đi ngang ở 100 °C?',
            qImage: { src: IMAGES.heatingCurve, alt: 'A graph of temperature against time. The line goes up, then flat at 100.', altVn: 'Đồ thị nhiệt độ theo thời gian. Đường đi lên, rồi đi ngang ở 100.' },
            a: 'The water is boiling. The heat changes the liquid into gas, so the temperature stays the same.',
            aVn: 'Nước đang sôi. Nhiệt làm chất lỏng biến thành khí, nên nhiệt độ giữ nguyên.',
          },
        ],
      },
      {
        name: 'Elements & Symbols',
        nameVn: 'Nguyên tố & Kí hiệu',
        clues: [
          {
            value: 100,
            q: 'Which element is this?',
            qVn: 'Đây là nguyên tố nào?',
            qImage: { src: IMAGES.symbolC, alt: 'A Periodic Table square: number 6, symbol C. The name is hidden.', altVn: 'Một ô trong Bảng tuần hoàn: số 6, kí hiệu C. Tên bị che.' },
            a: 'Carbon. Diamond and graphite (the "lead" in a pencil) are both carbon.',
            aVn: 'Cacbon. Kim cương và than chì ("ruột" bút chì) đều là cacbon.',
            aImage: { src: IMAGES.carbon, alt: 'Graphite and a diamond: two forms of carbon.', altVn: 'Than chì và kim cương: hai dạng của cacbon.' },
          },
          {
            value: 200,
            q: 'In the Periodic Table, what is a row called? What is a column called?',
            qVn: 'Trong Bảng tuần hoàn, một hàng gọi là gì? Một cột gọi là gì?',
            qImage: { src: IMAGES.periodicTable, alt: 'A Periodic Table poster on a classroom wall.', altVn: 'Một tấm áp phích Bảng tuần hoàn trên tường lớp học.' },
            a: 'A row is a period. A column is a group.',
            aVn: 'Một hàng là một chu kì (period). Một cột là một nhóm (group).',
          },
          {
            value: 300,
            q: 'Which is the right way to write the symbol for chlorine?',
            qVn: 'Cách viết nào đúng cho kí hiệu của clo (chlorine)?',
            qImages: [
              { src: IMAGES.symbolClCaps, alt: 'CL, two capital letters.', altVn: 'CL, hai chữ in hoa.' },
              { src: IMAGES.symbolClLower, alt: 'cl, two small letters.', altVn: 'cl, hai chữ thường.' },
              { src: IMAGES.symbolCl, alt: 'Cl, a capital C and a small l.', altVn: 'Cl, chữ C in hoa và chữ l thường.' },
            ],
            aIndex: 2,
            a: 'Cl. The first letter is a capital. The second letter is small.',
            aVn: 'Cl. Chữ cái đầu viết hoa. Chữ cái thứ hai viết thường.',
          },
          {
            value: 400,
            q: 'This is sodium. Its symbol is Na. Where does "Na" come from?',
            qVn: 'Đây là natri (sodium). Kí hiệu của nó là Na. "Na" từ đâu mà có?',
            qImage: { src: IMAGES.sodium, alt: 'Freshly cut chunks of sodium metal.', altVn: 'Những miếng kim loại natri vừa được cắt.' },
            a: 'From "natrium", the old Latin name for sodium.',
            aVn: 'Từ "natrium", tên La-tinh cổ của sodium.',
          },
          {
            value: 500,
            q: 'Co and CO. What is the difference?',
            qVn: 'Co và CO. Khác nhau thế nào?',
            qImage: { src: IMAGES.coVsCo, alt: 'Two squares: Co, and CO.', altVn: 'Hai ô: Co và CO.' },
            a: 'Co is one element: cobalt, a metal. CO is a compound: carbon monoxide — one carbon atom and one oxygen atom.',
            aVn: 'Co là một nguyên tố: coban, một kim loại. CO là một hợp chất: cacbon monoxit — một nguyên tử cacbon và một nguyên tử oxi.',
          },
        ],
      },
      {
        name: 'Compounds & Formulae',
        nameVn: 'Hợp chất & Công thức',
        clues: [
          {
            value: 100,
            q: 'What compound is this? How many atoms of each element?',
            qVn: 'Đây là hợp chất gì? Có bao nhiêu nguyên tử của mỗi nguyên tố?',
            qImage: { src: IMAGES.formulaH2o, alt: 'The formula H₂O.', altVn: 'Công thức H₂O.' },
            a: 'Water. Two hydrogen atoms and one oxygen atom.',
            aVn: 'Nước. Hai nguyên tử hiđro và một nguyên tử oxi.',
            aImage: { src: IMAGES.glassOfWater, alt: 'A glass of water.', altVn: 'Một cốc nước.' },
          },
          {
            value: 200,
            q: 'Salt is sodium chloride. Write its formula.',
            qVn: 'Muối là natri clorua (sodium chloride). Hãy viết công thức của nó.',
            qImage: { src: IMAGES.saltShaker, alt: 'A salt shaker full of table salt.', altVn: 'Một lọ rắc muối đầy muối ăn.' },
            a: 'NaCl. One sodium atom, one chlorine atom.',
            aVn: 'NaCl. Một nguyên tử natri, một nguyên tử clo.',
          },
          {
            value: 300,
            q: 'Dry ice is solid carbon dioxide. Write its formula.',
            qVn: 'Đá khô là cacbon đioxit (carbon dioxide) ở thể rắn. Hãy viết công thức của nó.',
            qImage: { src: IMAGES.dryIce, alt: 'White pellets of dry ice, smoking.', altVn: 'Những viên đá khô màu trắng đang bốc khói.' },
            a: 'CO₂. "Di" means two: two oxygen atoms.',
            aVn: 'CO₂. "Di" nghĩa là hai: hai nguyên tử oxi.',
          },
          {
            value: 400,
            q: 'Chlorine is a poisonous gas. Sodium is a dangerous metal. Bond them together. What do you get?',
            qVn: 'Clo là một chất khí độc. Natri là một kim loại nguy hiểm. Cho chúng liên kết với nhau. Em được chất gì?',
            qImage: { src: IMAGES.chlorine, alt: 'Yellow-green chlorine gas in a glass jar.', altVn: 'Khí clo màu vàng lục trong một bình thuỷ tinh.' },
            a: 'Salt — and you can eat it. A compound has new properties. It is not like its elements.',
            aVn: 'Muối — và em ăn được. Hợp chất có tính chất mới. Nó không giống các nguyên tố tạo ra nó.',
            aImage: { src: IMAGES.saltField, alt: 'Harvesting salt at a salt field in Phú Yên, Vietnam.', altVn: 'Thu hoạch muối trên cánh đồng muối ở Phú Yên, Việt Nam.' },
          },
          {
            value: 500,
            q: 'Copper sulfate. Name the THREE elements in it.',
            qVn: 'Đồng sunfat (copper sulfate). Kể tên BA nguyên tố có trong nó.',
            qImage: { src: IMAGES.copperSulfate, alt: 'Bright blue crystals of copper sulfate.', altVn: 'Những tinh thể đồng sunfat màu xanh lam.' },
            a: 'Copper, sulfur and oxygen. A name that ends in "-ate" has oxygen in it too.',
            aVn: 'Đồng, lưu huỳnh và oxi. Tên kết thúc bằng "-ate" thì có cả oxi.',
          },
        ],
      },
      {
        name: 'Compound or Mixture?',
        nameVn: 'Hợp chất hay hỗn hợp?',
        clues: [
          {
            value: 100,
            q: 'A magnet pulls the iron away from the sulfur. Compound or mixture?',
            qVn: 'Nam châm hút sắt ra khỏi lưu huỳnh. Hợp chất hay hỗn hợp?',
            qImage: { src: IMAGES.magnet, alt: 'A magnet covered in iron filings, lifted out of yellow sulfur.', altVn: 'Một thanh nam châm dính đầy mạt sắt, nhấc ra khỏi bột lưu huỳnh màu vàng.' },
            a: 'A mixture. The iron is still iron. The iron and sulfur are not bonded.',
            aVn: 'Hỗn hợp. Sắt vẫn là sắt. Sắt và lưu huỳnh không liên kết với nhau.',
          },
          {
            value: 200,
            q: 'Now heat the iron and sulfur. They make a new substance. What is its name?',
            qVn: 'Bây giờ đun nóng sắt và lưu huỳnh. Chúng tạo thành một chất mới. Tên của nó là gì?',
            a: 'Iron sulfide, a compound. The metal comes first. The non-metal ends in "-ide".',
            aVn: 'Sắt sunfua (iron sulfide), một hợp chất. Kim loại đứng trước. Phi kim kết thúc bằng "-ide".',
            aImage: { src: IMAGES.ironSulfide, alt: 'Iron sulfide: a dark grey solid.', altVn: 'Sắt sunfua: một chất rắn màu xám đen.' },
          },
          {
            value: 300,
            q: 'Air is a mixture. Which gas is 78%? Which gas is 21%?',
            qVn: 'Không khí là một hỗn hợp. Khí nào chiếm 78%? Khí nào chiếm 21%?',
            qImage: { src: IMAGES.airPie, alt: 'A pie chart of the air: 78%, 21% and 1%. The names are hidden.', altVn: 'Biểu đồ tròn của không khí: 78%, 21% và 1%. Tên các khí bị che.' },
            a: 'Nitrogen is 78%. Oxygen is 21%. Other gases are 1%.',
            aVn: 'Nitơ chiếm 78%. Oxi chiếm 21%. Các khí khác chiếm 1%.',
          },
          {
            value: 400,
            q: 'Motorbikes burn petrol. Which gas do they put into the air? Give its name and its formula.',
            qVn: 'Xe máy đốt xăng. Chúng thải vào không khí khí gì? Nêu tên và công thức của nó.',
            qImage: { src: IMAGES.traffic, alt: 'Motorbike traffic in Hanoi.', altVn: 'Dòng xe máy ở Hà Nội.' },
            a: 'Carbon dioxide, CO₂.',
            aVn: 'Cacbon đioxit, CO₂.',
          },
          {
            value: 500,
            q: 'You boil tap water away in an evaporating basin. A white solid is left. Was the tap water pure?',
            qVn: 'Em đun cho nước máy bay hơi hết trong một bát sứ (evaporating basin). Còn lại một chất rắn màu trắng. Nước máy có tinh khiết (pure) không?',
            qImage: { src: IMAGES.basin, alt: 'Three white evaporating basins.', altVn: 'Ba chiếc bát sứ trắng dùng để làm bay hơi.' },
            a: 'No. Pure water is only water. Tap water is a mixture: water and minerals. The same white solid builds up inside a kettle.',
            aVn: 'Không. Nước tinh khiết chỉ có nước. Nước máy là một hỗn hợp: nước và khoáng chất. Chất rắn trắng đó cũng bám bên trong ấm đun nước.',
            aImage: { src: IMAGES.limescale, alt: 'White limescale inside an electric kettle.', altVn: 'Cặn trắng bám bên trong một ấm đun nước điện.' },
          },
        ],
      },
    ],
  },

  // ── 8 · MATHEMATICS UNIT 2 + 3.1–3.2 ──────────────────────────────────────
  // Seven lessons in six columns: 2.1 and 2.2 share Expressions & Formulae,
  // because 2.2 is 2.1 with the numbers filled in. Every other column is one
  // lesson.
  //
  // Each column carries that lesson's traps, because the traps are what the
  // decks voted on: 34 for 3n, h − t, 8 for 8s − s, 10x + 6y, 5a + 3, 8c,
  // x = 2, a = 5, 3 as the smallest integer above 3, 7.2000, 35, 8.285. The
  // 200s are the English: like, expand, reverse, under, correct to. The 500s
  // are Mr Bowen, deadpan, as in the decks — the goldfish, the mangoes, and
  // his age.
  //
  // Every inequality is strict. 2.6 never taught ≤, ≥ or a closed circle.
  {
    id: 'maths-u2',
    title: 'Mathematics · Unit 2 + 3.1–3.2',
    titleVn: 'Toán học · Chương 2 + Bài 3.1–3.2',
    subtitle: 'Expressions, like terms, brackets, equations, inequalities, rounding',
    subtitleVn: 'Biểu thức, hạng tử đồng dạng, dấu ngoặc, phương trình, bất đẳng thức, làm tròn',
    icon: 'Variable',
    accent: '#2563eb',
    categories: [
      {
        name: 'Expressions & Formulae',
        nameVn: 'Biểu thức & Công thức',
        clues: [
          {
            value: 100,
            q: 'Which one is an expression: 4m or y = 5x?',
            qVn: 'Cái nào là biểu thức: 4m hay y = 5x?',
            a: '4m. An expression has no = sign. y = 5x has one, so it is a formula.',
            aVn: '4m. Biểu thức không có dấu =. y = 5x có dấu =, nên nó là một công thức.',
          },
          {
            value: 200,
            q: 'When n = 4, what is 3n?',
            qVn: 'Khi n = 4, 3n bằng bao nhiêu?',
            a: '12. 3n means 3 × n, so 3 × 4 = 12. Never 34.',
            aVn: '12. 3n nghĩa là 3 × n, nên 3 × 4 = 12. Không bao giờ là 34.',
          },
          {
            value: 300,
            q: 'Write "h less than t" in algebra.',
            qVn: 'Viết "h less than t" bằng đại số.',
            a: 't − h. Write the starting number first. (5 less than 12 is 12 − 5 = 7.)',
            aVn: 't − h. Viết số ban đầu trước. (5 less than 12 là 12 − 5 = 7.)',
          },
          {
            value: 400,
            q: '"Multiply x by 5, then subtract from 4." Write the expression.',
            qVn: '"Multiply x by 5, then subtract from 4." Hãy viết biểu thức.',
            a: '4 − 5x. "From 4" means you start at 4. ("Subtract 4" would be 5x − 4.)',
            aVn: '4 − 5x. "From 4" nghĩa là bắt đầu từ 4. ("Subtract 4" mới là 5x − 4.)',
          },
          {
            value: 500,
            q: 'Mr Bowen\'s taxi costs 15 thousand dong to start, then 9 thousand dong for every kilometre. Write a formula for the cost C of k kilometres. Then find the cost of 6 km.',
            qVn: 'Taxi của thầy Bowen tính 15 nghìn đồng tiền mở cửa, sau đó 9 nghìn đồng mỗi ki-lô-mét. Viết công thức tính chi phí C cho k ki-lô-mét. Rồi tính chi phí cho 6 km.',
            a: 'C = 15 + 9k. The 15 is paid once. The 9 is paid every kilometre. For 6 km: 15 + 9 × 6 = 69 thousand dong.',
            aVn: 'C = 15 + 9k. Số 15 trả một lần. Số 9 trả cho mỗi ki-lô-mét. Với 6 km: 15 + 9 × 6 = 69 nghìn đồng.',
          },
        ],
      },
      {
        name: 'Like Terms',
        nameVn: 'Hạng tử đồng dạng',
        clues: [
          {
            value: 100,
            q: 'Simplify 8s − s.',
            qVn: 'Rút gọn 8s − s.',
            a: '7s. s means 1s. The letter never disappears. (Not 8.)',
            aVn: '7s. s nghĩa là 1s. Chữ cái không bao giờ biến mất. (Không phải 8.)',
          },
          {
            value: 200,
            q: 'In "like terms", what does "like" mean?',
            qVn: 'Trong "like terms", từ "like" nghĩa là gì?',
            a: 'The same kind: terms with the same letter, like 2a and 5a. Not "I like mangoes".',
            aVn: 'Cùng loại: các hạng tử có cùng chữ cái, như 2a và 5a. Không phải "thích" như trong "I like mangoes".',
          },
          {
            value: 300,
            q: 'Which pair are like terms: 3a and 2b, 4ab and 3ba, or x and x²?',
            qVn: 'Cặp nào là hạng tử đồng dạng: 3a và 2b, 4ab và 3ba, hay x và x²?',
            a: '4ab and 3ba, because a × b = b × a. 3a and 2b have different letters. x² means x × x, so it is not like x.',
            aVn: '4ab và 3ba, vì a × b = b × a. 3a và 2b khác chữ cái. x² nghĩa là x × x, nên nó không đồng dạng với x.',
          },
          {
            value: 400,
            q: 'Simplify 7x + 5y − 3x + y.',
            qVn: 'Rút gọn 7x + 5y − 3x + y.',
            a: '4x + 6y. The minus moves with the 3x, so 7x − 3x = 4x. (Not 10x + 6y.)',
            aVn: '4x + 6y. Dấu trừ đi cùng với 3x, nên 7x − 3x = 4x. (Không phải 10x + 6y.)',
          },
          {
            value: 500,
            q: 'Mr Bowen has 4c cats. He buys 3c more cats and 2d dogs. Then 5c cats leave. One goldfish, called x, arrives. How many animals does he have now?',
            qVn: 'Thầy Bowen có 4c con mèo. Thầy mua thêm 3c con mèo và 2d con chó. Sau đó 5c con mèo bỏ đi. Một con cá vàng tên là x đến. Bây giờ thầy có bao nhiêu con vật?',
            a: '2c + 2d + 1. 4c + 3c − 5c = 2c. The goldfish is 1 animal. Its name is not a number.',
            aVn: '2c + 2d + 1. 4c + 3c − 5c = 2c. Con cá vàng là 1 con vật. Tên của nó không phải là một con số.',
          },
        ],
      },
      {
        name: 'Brackets',
        nameVn: 'Dấu ngoặc',
        clues: [
          {
            value: 100,
            q: 'Expand 5(a + 3).',
            qVn: 'Khai triển 5(a + 3).',
            a: '5a + 15. Multiply EVERY term inside the brackets. (Not 5a + 3.)',
            aVn: '5a + 15. Nhân MỌI hạng tử bên trong ngoặc. (Không phải 5a + 3.)',
          },
          {
            value: 200,
            q: '"Expand" and "multiply out". Same job, or different jobs?',
            qVn: '"Expand" và "multiply out". Cùng một việc, hay hai việc khác nhau?',
            a: 'The same job. And the value does not get bigger. Only the writing gets longer.',
            aVn: 'Cùng một việc. Và giá trị không lớn hơn. Chỉ có cách viết dài ra.',
          },
          {
            value: 300,
            q: 'Expand 4(3 − c).',
            qVn: 'Khai triển 4(3 − c).',
            a: '12 − 4c. The minus goes in with the c. Then stop: 12 and 4c are not like terms, so it is not 8c.',
            aVn: '12 − 4c. Dấu trừ đi cùng với c. Rồi dừng lại: 12 và 4c không đồng dạng, nên không phải 8c.',
          },
          {
            value: 400,
            q: 'Expand 5(2p + 1).',
            qVn: 'Khai triển 5(2p + 1).',
            a: '10p + 5. 5 × 2p = 10p: multiply the numbers, and the letter stays. (Not 7p.)',
            aVn: '10p + 5. 5 × 2p = 10p: nhân các con số, chữ cái giữ nguyên. (Không phải 7p.)',
          },
          {
            value: 500,
            q: 'Mr Bowen buys 6 bags. Each bag has m mangoes and 2 dragon fruits. On the way home, he eats 4 mangoes. How much fruit does he carry into the house?',
            qVn: 'Thầy Bowen mua 6 túi. Mỗi túi có m quả xoài và 2 quả thanh long. Trên đường về, thầy ăn 4 quả xoài. Thầy mang vào nhà bao nhiêu quả?',
            a: '6m + 8.  6(m + 2) − 4 = 6m + 12 − 4 = 6m + 8. "Fruit" means the mangoes AND the dragon fruits.',
            aVn: '6m + 8.  6(m + 2) − 4 = 6m + 12 − 4 = 6m + 8. "Fruit" là cả xoài VÀ thanh long.',
          },
        ],
      },
      {
        name: 'Equations',
        nameVn: 'Phương trình',
        clues: [
          {
            value: 100,
            q: 'Solve x − 4 = 6. Then check your answer.',
            qVn: 'Giải x − 4 = 6. Rồi thử lại đáp án.',
            a: 'x = 10. Check: 10 − 4 = 6 ✓. (x = 2 is wrong: 2 − 4 = −2.)',
            aVn: 'x = 10. Thử lại: 10 − 4 = 6 ✓. (x = 2 là sai: 2 − 4 = −2.)',
          },
          {
            value: 200,
            q: '"Reverse" and "inverse" look the same. What does each one mean?',
            qVn: '"Reverse" và "inverse" trông giống nhau. Mỗi từ nghĩa là gì?',
            a: 'Reverse: go backwards, like a car. Inverse: the opposite operation. + 5 is undone by − 5.',
            aVn: 'Reverse: đi ngược lại, như ô tô lùi. Inverse: phép toán ngược. + 5 được xóa bỏ bằng − 5.',
          },
          {
            value: 300,
            q: 'Mr Bowen thinks of a number and subtracts 5. His answer is 21. What number did he first think of?',
            qVn: 'Thầy Bowen nghĩ ra một số rồi trừ đi 5. Kết quả là 21. Lúc đầu thầy đã nghĩ ra số nào?',
            a: '26.  n − 5 = 21, so n = 21 + 5 = 26. Check: 26 − 5 = 21 ✓.',
            aVn: '26.  n − 5 = 21, nên n = 21 + 5 = 26. Thử lại: 26 − 5 = 21 ✓.',
          },
          {
            value: 400,
            q: 'Solve 2a + 4 = 18.',
            qVn: 'Giải 2a + 4 = 18.',
            a: 'a = 7. Undo the last step first: 18 − 4 = 14, then 14 ÷ 2 = 7. (a = 5 halved first: 2 × 5 + 4 = 14.)',
            aVn: 'a = 7. Làm ngược bước cuối trước: 18 − 4 = 14, rồi 14 ÷ 2 = 7. (a = 5 là chia đôi trước: 2 × 5 + 4 = 14.)',
          },
          {
            value: 500,
            q: 'Mr Bowen thinks of his age. He doubles it, then subtracts 7. The answer is 1. How old is Mr Bowen?',
            qVn: 'Thầy Bowen nghĩ đến tuổi của mình. Thầy nhân đôi nó, rồi trừ đi 7. Kết quả là 1. Thầy Bowen bao nhiêu tuổi?',
            a: '2a − 7 = 1, so 2a = 8 and a = 4. Mr Bowen is 4 years old.',
            aVn: '2a − 7 = 1, nên 2a = 8 và a = 4. Thầy Bowen 4 tuổi.',
          },
        ],
      },
      {
        name: 'Inequalities',
        nameVn: 'Bất đẳng thức',
        clues: [
          {
            value: 100,
            q: 'Say it in English: −3 < 2',
            qVn: 'Đọc bằng tiếng Anh: −3 < 2',
            a: '"−3 is less than 2." Read it from left to right.',
            aVn: '"−3 is less than 2." Đọc từ trái sang phải.',
          },
          {
            value: 200,
            q: '"Under 18 years old." Is that less than, or greater than? Write it with a for age.',
            qVn: '"Under 18 years old." Đó là nhỏ hơn hay lớn hơn? Viết bằng chữ a cho tuổi.',
            a: 'Less than: a < 18. Under, below and fewer than all mean <.',
            aVn: 'Nhỏ hơn: a < 18. Under, below và fewer than đều nghĩa là <.',
          },
          {
            value: 300,
            q: 'Write the inequality. Use x. What is the smallest integer x could be?',
            qVn: 'Viết bất đẳng thức. Dùng chữ x. Số nguyên nhỏ nhất mà x có thể là bao nhiêu?',
            qImage: { src: IMAGES.numberLine, alt: 'A number line from 0 to 6. An open circle at 3, and an arrow to the right.', altVn: 'Trục số từ 0 đến 6. Vòng tròn rỗng ở số 3, và mũi tên sang phải.' },
            a: 'x > 3. The smallest integer is 4. The circle is open, so 3 is not included.',
            aVn: 'x > 3. Số nguyên nhỏ nhất là 4. Vòng tròn rỗng, nên 3 không được tính.',
          },
          {
            value: 400,
            q: 't < −2. Which integers could t be?',
            qVn: 't < −2. t có thể là những số nguyên nào?',
            a: '−3, −4, −5, …  Less than means further left. (−1 is greater than −2.)',
            aVn: '−3, −4, −5, …  Nhỏ hơn nghĩa là xa hơn về bên trái. (−1 lớn hơn −2.)',
          },
          {
            value: 500,
            q: 'Mr Bowen\'s class has more than 20 students. It has fewer than 24 students. How many students could there be?',
            qVn: 'Lớp của thầy Bowen có nhiều hơn 20 học sinh. Lớp có ít hơn 24 học sinh. Lớp có thể có bao nhiêu học sinh?',
            a: '21, 22 or 23.  s > 20 and s < 24. Not 20, and not 24.',
            aVn: '21, 22 hoặc 23.  s > 20 và s < 24. Không phải 20, cũng không phải 24.',
          },
        ],
      },
      {
        name: 'Place Value & Rounding',
        nameVn: 'Giá trị theo vị trí & Làm tròn',
        clues: [
          {
            value: 100,
            q: 'Say it in English: 10³',
            qVn: 'Đọc bằng tiếng Anh: 10³',
            a: '"Ten cubed", or "ten to the power of three". It is 1000.',
            aVn: '"Ten cubed" hoặc "ten to the power of three" (mười lập phương). Nó bằng 1000.',
          },
          {
            value: 200,
            q: 'Work out 7.2 × 10³.',
            qVn: 'Tính 7.2 × 10³.',
            a: '7200. The digits move 3 places left. (Adding zeros gives 7.2000, and that is still 7.2.)',
            aVn: '7200. Các chữ số dịch 3 cột sang trái. (Thêm số 0 sẽ ra 7.2000, mà 7.2000 vẫn chỉ là 7.2.)',
          },
          {
            value: 300,
            q: 'Round 34.9892 to 1 decimal place.',
            qVn: 'Làm tròn 34.9892 đến 1 chữ số thập phân.',
            a: '35.0. The 9 carries. Keep the zero: it shows 1 decimal place. (35 loses the mark.)',
            aVn: '35.0. Số 9 được nhớ lên. Giữ số 0: nó cho thấy có 1 chữ số thập phân. (Viết 35 là mất điểm.)',
          },
          {
            value: 400,
            q: '"Correct to 2 d.p." and "as far as 2 d.p." Same job, or different jobs?',
            qVn: '"Correct to 2 d.p." và "as far as 2 d.p." Cùng một việc, hay hai việc khác nhau?',
            a: 'Different. "Correct to" means round. "As far as" means keep going, and do not round yet.',
            aVn: 'Khác nhau. "Correct to" nghĩa là làm tròn. "As far as" nghĩa là cứ tính tiếp, chưa làm tròn.',
          },
          {
            value: 500,
            q: 'Work out 58 ÷ 7, correct to 3 decimal places.',
            qVn: 'Tính 58 ÷ 7, chính xác đến 3 chữ số thập phân.',
            a: '8.286. Work to 4 places first: 8.2857. Then round once. (8.285 stopped too early.)',
            aVn: '8.286. Tính đến 4 chữ số thập phân trước: 8.2857. Rồi làm tròn một lần. (8.285 là dừng quá sớm.)',
          },
        ],
      },
    ],
  },

  // ── 9 · SCIENCE 2.4 + 2.8 ─────────────────────────────────────────────────
  // The two Science lessons no other board has: The Water Cycle (taught after
  // the Unit 2 board was built) and Acids and Bases. Three columns each.
  //
  // Every photograph is the one from the lesson, as on the Unit 2 board. The
  // kettle comes back from that board on purpose: there it was "boil", here it
  // is "the white cloud is not water vapour", which is 2.4's one real
  // misconception. 2.8's is Acid or Alkali? 500 — pH 13 burns too.
  //
  // "Alkali" is the word for a liquid being tested and "base" for a thing you
  // add, which is how the 2.8 deck uses them. The pH scale runs 1 to 14.
  {
    id: 'science-water-acids',
    title: 'Science · 2.4 + 2.8',
    titleVn: 'Khoa học · Bài 2.4 + 2.8',
    subtitle: 'The water cycle, acids and alkalis, indicators and pH',
    subtitleVn: 'Vòng tuần hoàn của nước, axit và kiềm, chất chỉ thị và pH',
    icon: 'Droplets',
    accent: '#0891b2',
    categories: [
      {
        name: 'Into the Air',
        nameVn: 'Bay vào không khí',
        clues: [
          {
            value: 100,
            q: 'Water as a gas. What is it called?',
            qVn: 'Nước ở thể khí. Nó được gọi là gì?',
            a: 'Water vapour.',
            aVn: 'Hơi nước (water vapour).',
          },
          {
            value: 200,
            q: 'A rice field loses water through the rice plants. Evaporation or transpiration?',
            qVn: 'Ruộng lúa mất nước qua cây lúa. Bay hơi (evaporation) hay thoát hơi nước (transpiration)?',
            a: 'Transpiration: water leaving a plant through its leaves. Out of the leaves, not off the ground.',
            aVn: 'Thoát hơi nước (transpiration): nước đi ra khỏi cây qua lá. Qua lá cây, không phải từ mặt đất.',
          },
          {
            value: 300,
            q: 'Water vapour is all around you right now. Can you see it?',
            qVn: 'Hơi nước đang ở khắp xung quanh em. Em có nhìn thấy nó không?',
            a: 'No, never. It is a gas, and it is invisible.',
            aVn: 'Không, không bao giờ. Nó là chất khí, và nó vô hình.',
          },
          {
            value: 400,
            q: 'Look at the white cloud above this kettle. Is it water vapour?',
            qVn: 'Nhìn đám mây trắng phía trên chiếc ấm này. Đó có phải là hơi nước không?',
            qImage: { src: IMAGES.boilingKettle, alt: 'A kettle boiling. A white cloud rises beside the spout.', altVn: 'Một chiếc ấm đang sôi. Một đám mây trắng bốc lên cạnh vòi ấm.' },
            a: 'No. The white cloud is tiny drops of liquid water. The water vapour is in the clear gap by the spout, and you cannot see it.',
            aVn: 'Không. Đám mây trắng là những giọt nước lỏng rất nhỏ. Hơi nước ở khoảng trống trong suốt cạnh vòi ấm, và em không nhìn thấy nó.',
          },
          {
            value: 500,
            q: 'A puddle on the road disappears on a sunny day. Explain why. Use the word "particles".',
            qVn: 'Một vũng nước trên đường biến mất vào ngày nắng. Giải thích vì sao. Hãy dùng từ "particles" (hạt).',
            a: 'The Sun gives the water particles heat energy. They move faster. Some break free of the forces holding them together and escape as a gas. The puddle evaporates.',
            aVn: 'Mặt Trời truyền nhiệt năng cho các hạt nước. Chúng chuyển động nhanh hơn. Một số hạt phá vỡ lực hút giữ chúng lại và thoát ra thành khí. Vũng nước bay hơi.',
          },
        ],
      },
      {
        name: 'Clouds & Rain',
        nameVn: 'Mây & Mưa',
        clues: [
          {
            value: 100,
            q: 'Rain, snow, hail and sleet. What ONE word names all four?',
            qVn: 'Mưa, tuyết, mưa đá và mưa tuyết. MỘT từ nào gọi chung cả bốn?',
            qImage: { src: IMAGES.rainfall, alt: 'Cyclos in the falling rain, Hanoi.', altVn: 'Xích lô dưới mưa, Hà Nội.' },
            a: 'Precipitation: water falling from clouds.',
            aVn: 'Giáng thủy (precipitation): nước rơi từ đám mây.',
          },
          {
            value: 200,
            q: 'Hail is balls of ice. It is frozen. Is it still precipitation?',
            qVn: 'Mưa đá là những viên nước đá. Nó bị đóng băng. Nó vẫn là giáng thủy chứ?',
            qImage: { src: IMAGES.hail, alt: 'A hand catching hailstones in a rainstorm.', altVn: 'Một bàn tay hứng những viên mưa đá trong cơn mưa.' },
            a: 'Yes. It is frozen, but it still fell from a cloud.',
            aVn: 'Có. Nó bị đóng băng, nhưng nó vẫn rơi xuống từ đám mây.',
          },
          {
            value: 300,
            q: 'Is a cloud made of gas?',
            qVn: 'Đám mây có phải được tạo thành từ chất khí không?',
            qImage: { src: IMAGES.clouds, alt: 'A white cloud building over a mountain.', altVn: 'Một đám mây trắng hình thành trên đỉnh núi.' },
            a: 'No. A cloud is millions of tiny drops of liquid water. You can see it, so it is already liquid.',
            aVn: 'Không. Đám mây là hàng triệu giọt nước lỏng rất nhỏ. Em nhìn thấy được, nên nó đã là chất lỏng.',
          },
          {
            value: 400,
            q: '"Evaporate" is a doing word. What is its naming word? Now do the same for "condense".',
            qVn: '"Evaporate" là từ chỉ hành động. Từ chỉ tên gọi của nó là gì? Bây giờ làm tương tự với "condense".',
            a: 'Evaporation. Condensation. All four naming words end in -ation: evaporation, condensation, precipitation, transpiration.',
            aVn: 'Evaporation. Condensation. Cả bốn từ chỉ tên gọi đều kết thúc bằng -ation: evaporation, condensation, precipitation, transpiration.',
          },
          {
            value: 500,
            q: 'How does rain form? Say it in three steps.',
            qVn: 'Mưa hình thành như thế nào? Nói theo ba bước.',
            a: '1. Water vapour rises and cools.  2. It condenses into tiny drops: a cloud.  3. The drops join up until they are too heavy, and they fall.',
            aVn: '1. Hơi nước bay lên và lạnh đi.  2. Nó ngưng tụ thành những giọt nhỏ: một đám mây.  3. Các giọt nhập lại đến khi quá nặng, rồi rơi xuống.',
          },
        ],
      },
      {
        name: 'Where Does It Go?',
        nameVn: 'Nước đi đâu?',
        clues: [
          {
            value: 100,
            q: 'Rivers, large lakes and the oceans: big water you can see. What is it called?',
            qVn: 'Sông, hồ lớn và đại dương: vùng nước lớn nhìn thấy được. Nó được gọi là gì?',
            qImage: { src: IMAGES.halong, alt: 'Ha Long Bay, Vietnam.', altVn: 'Vịnh Hạ Long, Việt Nam.' },
            a: 'Open water.',
            aVn: 'Mặt nước hở (open water).',
          },
          {
            value: 200,
            q: 'Rain falls on soil. It can do one of two things. What are they?',
            qVn: 'Mưa rơi xuống đất. Nó có thể làm một trong hai việc. Đó là hai việc gì?',
            a: 'It runs over the ground into a river (surface run-off). Or it soaks into the ground (groundwater).',
            aVn: 'Nó chảy trên mặt đất vào sông (dòng chảy bề mặt). Hoặc nó thấm xuống đất (nước ngầm).',
          },
          {
            value: 300,
            q: 'Water flows across the ground into a river. What is it called? What does it carry away?',
            qVn: 'Nước chảy trên mặt đất vào sông. Nó được gọi là gì? Nó cuốn theo cái gì?',
            qImage: { src: IMAGES.paddy, alt: 'Terraced rice fields on a hillside in Son La, Vietnam.', altVn: 'Ruộng bậc thang trên sườn đồi ở Sơn La, Việt Nam.' },
            a: 'Surface run-off. It carries the soil away. Terraces like these hold the water back, so it soaks in.',
            aVn: 'Dòng chảy bề mặt (surface run-off). Nó cuốn đất đi. Ruộng bậc thang giữ nước lại, để nước thấm xuống.',
          },
          {
            value: 400,
            q: 'These people are filling cans at a village pump. The water comes up from under the ground. What is it called?',
            qVn: 'Những người này đang lấy nước vào can ở chiếc bơm của làng. Nước được bơm lên từ dưới đất. Nó được gọi là gì?',
            qImage: { src: IMAGES.pump, alt: 'Villagers with water cans at a village pump.', altVn: 'Người dân mang can nước ở chiếc bơm nước của làng.' },
            a: 'Groundwater. It soaked into the soil and rocks, and it can stay there for years.',
            aVn: 'Nước ngầm (groundwater). Nó đã thấm vào đất và đá, và có thể nằm đó nhiều năm.',
          },
          {
            value: 500,
            q: 'Mr Bowen drinks a glass of water. Is it new water? Where was it 2000 years ago?',
            qVn: 'Thầy Bowen uống một ly nước. Đó có phải là nước mới không? 2000 năm trước nó ở đâu?',
            a: 'It is not new. It could have been in the sea, a cloud, a river or a dinosaur. The Earth uses the same water again and again. That is the water cycle.',
            aVn: 'Nó không phải nước mới. Nó có thể đã ở biển, trong mây, dưới sông hay trong một con khủng long. Trái Đất dùng cùng một lượng nước lặp đi lặp lại. Đó là vòng tuần hoàn của nước.',
          },
        ],
      },
      {
        name: 'Acid or Alkali?',
        nameVn: 'Axit hay kiềm?',
        clues: [
          {
            value: 100,
            q: 'Lemons and limes taste sour. Acid or alkali?',
            qVn: 'Chanh có vị chua. Axit hay kiềm?',
            qImage: { src: IMAGES.lemonLime, alt: 'A lemon and a lime.', altVn: 'Một quả chanh vàng và một quả chanh xanh.' },
            a: 'Acid. Sour means acid.',
            aVn: 'Axit. Chua nghĩa là axit.',
          },
          {
            value: 200,
            q: 'Soap feels slippery. Acid or alkali?',
            qVn: 'Xà phòng sờ thấy trơn. Axit hay kiềm?',
            qImage: { src: IMAGES.soap, alt: 'A bar of soap with lather.', altVn: 'Một bánh xà phòng có bọt.' },
            a: 'Alkali. An alkali is a base that dissolves in water.',
            aVn: 'Kiềm. Kiềm là bazơ tan được trong nước.',
          },
          {
            value: 300,
            q: 'Which two must you NEVER taste: lemon juice, vinegar, stomach acid, car battery acid?',
            qVn: 'Hai thứ nào em KHÔNG BAO GIỜ được nếm: nước chanh, giấm, axit dạ dày, axit ắc quy?',
            a: 'Stomach acid and car battery acid. And never taste anything in the lab.',
            aVn: 'Axit dạ dày và axit ắc quy. Và không bao giờ nếm bất cứ thứ gì trong phòng thí nghiệm.',
          },
          {
            value: 400,
            q: 'This symbol is on a bottle in the lab. What does it mean?',
            qVn: 'Kí hiệu này có trên một chai trong phòng thí nghiệm. Nó nghĩa là gì?',
            qImage: { src: IMAGES.corrosive, alt: 'A red diamond hazard symbol: liquid dripping onto a metal bar and onto a hand.', altVn: 'Kí hiệu nguy hiểm hình thoi đỏ: chất lỏng nhỏ xuống một thanh kim loại và một bàn tay.' },
            a: 'Corrosive: it attacks skin, eyes and clothes. Wear eye protection. Never taste. Wash a spill off at once.',
            aVn: 'Ăn mòn (corrosive): nó làm hỏng da, mắt và quần áo. Đeo kính bảo hộ. Không bao giờ nếm. Nếu đổ ra người, rửa ngay.',
          },
          {
            value: 500,
            q: 'One drop falls on your hand. Which one burns your skin: pH 1 or pH 13?',
            qVn: 'Một giọt rơi lên tay em. Giọt nào làm bỏng da: pH 1 hay pH 13?',
            a: 'BOTH. pH 1 is a strong acid. pH 13 is a strong alkali, like oven cleaner. Danger is at both ends of the scale.',
            aVn: 'CẢ HAI. pH 1 là axit mạnh. pH 13 là kiềm mạnh, như nước tẩy lò. Nguy hiểm nằm ở cả hai đầu thang đo.',
          },
        ],
      },
      {
        name: 'Indicators & pH',
        nameVn: 'Chất chỉ thị & pH',
        clues: [
          {
            value: 100,
            q: 'Mr Bowen has two clear glasses: lemon juice and soapy water. They look the same. How can he tell them apart, with no tasting?',
            qVn: 'Thầy Bowen có hai ly nước trong: nước chanh và nước xà phòng. Chúng trông giống nhau. Làm sao thầy phân biệt được mà không nếm?',
            a: 'Use an indicator. It changes colour to show an acid or an alkali.',
            aVn: 'Dùng chất chỉ thị (indicator). Nó đổi màu để cho biết đó là axit hay kiềm.',
          },
          {
            value: 200,
            q: 'Blue litmus paper turns red. What was it dipped in?',
            qVn: 'Giấy quỳ xanh chuyển sang đỏ. Nó đã được nhúng vào gì?',
            qImage: { src: IMAGES.litmusAcid, alt: 'A strip of blue litmus paper. The wet end has turned red.', altVn: 'Một mẩu giấy quỳ xanh. Đầu bị ướt đã chuyển sang đỏ.' },
            a: 'An acid. (In an alkali it goes the other way: red litmus turns blue.)',
            aVn: 'Axit. (Trong kiềm thì ngược lại: giấy quỳ đỏ chuyển sang xanh.)',
            aImage: { src: IMAGES.litmusBase, alt: 'Red litmus paper in an alkali. The wet end has turned blue.', altVn: 'Giấy quỳ đỏ trong kiềm. Đầu bị ướt đã chuyển sang xanh.' },
          },
          {
            value: 300,
            q: 'The pH scale runs from 1 to 14. Which number is neutral? Is an acid above it, or below it?',
            qVn: 'Thang pH đi từ 1 đến 14. Số nào là trung tính? Axit lớn hơn hay nhỏ hơn số đó?',
            a: '7 is neutral. Below 7 is acid. Above 7 is alkali.',
            aVn: '7 là trung tính. Nhỏ hơn 7 là axit. Lớn hơn 7 là kiềm.',
          },
          {
            value: 400,
            q: 'Which is the stronger acid: pH 2 or pH 5?',
            qVn: 'Axit nào mạnh hơn: pH 2 hay pH 5?',
            a: 'pH 2. The smaller the number, the stronger the acid.',
            aVn: 'pH 2. Số càng nhỏ, axit càng mạnh.',
          },
          {
            value: 500,
            q: 'Why can litmus NOT tell pH 8 from pH 13?',
            qVn: 'Tại sao giấy quỳ KHÔNG phân biệt được pH 8 với pH 13?',
            a: 'Litmus has only two colours. pH 8 and pH 13 are both alkalis, so both turn red litmus blue. Universal indicator gives a different colour for each number.',
            aVn: 'Giấy quỳ chỉ có hai màu. pH 8 và pH 13 đều là kiềm, nên cả hai đều làm giấy quỳ đỏ chuyển sang xanh. Chất chỉ thị vạn năng cho mỗi số một màu khác nhau.',
          },
        ],
      },
      {
        name: 'Cancel It Out',
        nameVn: 'Triệt tiêu lẫn nhau',
        clues: [
          {
            value: 100,
            q: 'An acid and a base cancel each other out, and make something neutral. What is the word?',
            qVn: 'Axit và bazơ triệt tiêu lẫn nhau, tạo ra chất trung tính. Từ đó là gì?',
            a: 'Neutralisation.',
            aVn: 'Sự trung hòa (neutralisation).',
          },
          {
            value: 200,
            q: 'Mr Bowen ate two bowls of spicy noodles. Now his stomach has too much acid, and it hurts. What should he swallow?',
            qVn: 'Thầy Bowen ăn hai tô mì cay. Bây giờ dạ dày thầy có quá nhiều axit, và nó đau. Thầy nên uống gì?',
            a: 'A base, like an indigestion tablet. It neutralises the acid.',
            aVn: 'Một bazơ, như viên thuốc đau dạ dày. Nó trung hòa axit.',
            aImage: { src: IMAGES.antacid, alt: 'An indigestion tablet dropped into a glass of water.', altVn: 'Một viên thuốc đau dạ dày thả vào ly nước.' },
          },
          {
            value: 300,
            q: 'Mr Bowen spills acid on the bench. Should he add more acid, or a base?',
            qVn: 'Thầy Bowen làm đổ axit ra bàn. Thầy nên đổ thêm axit, hay một bazơ?',
            a: 'A base. It neutralises the acid. More acid would make it worse.',
            aVn: 'Một bazơ. Nó trung hòa axit. Thêm axit sẽ làm tệ hơn.',
          },
          {
            value: 400,
            q: 'The soil has too much acid for rice to grow. What does the farmer spread on it? Why?',
            qVn: 'Đất có quá nhiều axit, lúa không mọc được. Người nông dân rải gì lên đất? Tại sao?',
            a: 'Lime. Lime is a base, so it neutralises the acid in the soil.',
            aVn: 'Vôi. Vôi là một bazơ, nên nó trung hòa axit trong đất.',
          },
          {
            value: 500,
            q: 'Toothpaste is pH 9. Why do we brush our teeth AFTER eating, not before?',
            qVn: 'Kem đánh răng có pH 9. Tại sao ta đánh răng SAU khi ăn, không phải trước?',
            a: 'Food leaves acid on your teeth. Toothpaste is a base, so brushing neutralises the acid. Before you eat, there is no acid there yet.',
            aVn: 'Thức ăn để lại axit trên răng. Kem đánh răng là một bazơ, nên đánh răng sẽ trung hòa axit. Trước khi ăn, chưa có axit ở đó.',
          },
        ],
      },
    ],
  },

  // ── 10 · SCIENCE 3.1 + MATHS 4.1–4.2 ──────────────────────────────────────
  // The week of 15 October: Science 3.1 (Gravity, Weight and Mass) in three
  // columns, and the first half of the decimals speed run (compare, add,
  // subtract) in three more. Multiplying and dividing are not on it.
  //
  // ENGLISH AND FRENCH, the first board that is. From Unit 4 the Year 7
  // lessons drop Vietnamese, so every clue has a …Fr twin and no …Vn twin. In
  // VN this board falls back to English; in FR the other boards do.
  //
  // The traps are the decks' own: heavy and light land together, the crumpled
  // paper is not heavier, "My mass is 40 kg", 3.25 said as "three point two
  // five", 4.6 against 4.52, fastest = smallest, 0.12 for 0.7 + 0.5, digits
  // lined up instead of points, subtract FROM, and 0.38 for 1 − 0.72. The 200s
  // are the English: drop / falls / lands, mass against weight, saying a
  // decimal, "the sum", "subtract from".
  //
  // Two clues join the subjects, as Homework 9 did: the cat's weight on the
  // Moon (40.0 − 6.4) and the contact force under a bag and a laptop
  // (45.5 + 18.75). Mr Bowen is in the 500s, deadpan, as in the decks.
  //
  // Every decimal is written with a point in French too, as the decks do: the
  // class is learning to read them the English way.
  {
    id: 'gravity-decimals',
    title: 'Science 3.1 + Maths 4.1–4.2',
    titleFr: 'Sciences 3.1 + Maths 4.1–4.2',
    subtitle: 'Gravity, weight and mass; compare, add and subtract decimals',
    subtitleFr: 'Gravité, poids et masse ; comparer, additionner et soustraire des décimaux',
    icon: 'Orbit',
    accent: '#a21caf',
    categories: [
      {
        name: 'Gravity',
        nameFr: 'La gravité',
        clues: [
          {
            value: 100,
            q: 'You drop a ball. What force pulls it down?',
            qFr: 'Tu lâches une balle. Quelle force la tire vers le bas ?',
            a: 'Gravity. The Earth pulls the ball towards it.',
            aFr: 'La gravité (gravity). La Terre attire la balle vers elle.',
          },
          {
            value: 200,
            q: 'A ball is dropped at the South Pole. Which way does it fall?',
            qFr: 'On lâche une balle au pôle Sud. Dans quel sens tombe-t-elle ?',
            a: 'Towards the centre of the Earth. Gravity always pulls that way, so nobody falls off.',
            aFr: 'Vers le centre de la Terre. La gravité tire toujours dans ce sens : personne ne tombe dans le vide.',
          },
          {
            value: 300,
            q: 'A rocket flies away from the Earth. Does the Earth’s gravity pull on it more, or less?',
            qFr: 'Une fusée s’éloigne de la Terre. La gravité de la Terre l’attire-t-elle plus, ou moins ?',
            a: 'Less. The further away it is, the weaker the pull.',
            aFr: 'Moins. Plus elle est loin, plus l’attraction est faible.',
          },
          {
            value: 400,
            q: 'Some people say there is no gravity on the Moon. Are they right?',
            qFr: 'Certains disent qu’il n’y a pas de gravité sur la Lune. Ont-ils raison ?',
            a: 'No. The Moon has a big mass, so it has gravity. The astronaut’s hammer still fell!',
            aFr: 'Non. La Lune a une grande masse, donc elle a une gravité. Le marteau de l’astronaute est bien tombé !',
          },
          {
            value: 500,
            q: 'Leaving the Earth takes a bigger force than leaving the Moon. The spacecraft’s mass is the same. Why?',
            qFr: 'Quitter la Terre demande une force plus grande que quitter la Lune. La masse de la fusée est la même. Pourquoi ?',
            a: 'Gravity is stronger on Earth: 10 N/kg, not 1.6 N/kg. So the spacecraft’s weight is bigger on Earth.',
            aFr: 'La gravité est plus forte sur Terre : 10 N/kg, pas 1.6 N/kg. Donc le poids de la fusée est plus grand sur Terre.',
          },
        ],
      },
      {
        name: 'Falling',
        nameFr: 'La chute',
        clues: [
          {
            value: 100,
            q: 'Mr Bowen drops a bowling ball and a football at the same time. Which one lands first?',
            qFr: 'M. Bowen lâche une boule de bowling et un ballon de foot en même temps. Lequel touche le sol en premier ?',
            a: 'Neither. They land at the same time. Heavy things do not fall faster.',
            aFr: 'Aucun. Ils touchent le sol en même temps. Les objets lourds ne tombent pas plus vite.',
          },
          {
            value: 200,
            q: 'Use drop, falls and lands: “You ___ the ball. It ___. Then it ___.”',
            qFr: 'Utilise drop, falls et lands : « You ___ the ball. It ___. Then it ___. »',
            a: 'You drop the ball. It falls. Then it lands. You drop it, but it falls by itself.',
            aFr: 'You drop the ball. It falls. Then it lands. Toi, tu lâches (drop) ; la balle tombe (falls) toute seule.',
          },
          {
            value: 300,
            q: 'Drop a book and a flat sheet of paper together. The paper lands last. Why?',
            qFr: 'Lâche ensemble un livre et une feuille de papier à plat. La feuille touche le sol en dernier. Pourquoi ?',
            a: 'The air pushes up on the flat paper and slows it down.',
            aFr: 'L’air pousse sous la feuille à plat et la ralentit.',
          },
          {
            value: 400,
            q: 'Now crumple the paper into a ball. It lands with the book. Is the paper heavier now?',
            qFr: 'Maintenant, froisse la feuille en boule. Elle touche le sol avec le livre. Le papier est-il plus lourd ?',
            a: 'No. Same paper, same mass. The air cannot slow a ball down much.',
            aFr: 'Non. Même papier, même masse. L’air ne peut presque pas ralentir une boule.',
          },
          {
            value: 500,
            q: 'One photo, a flash 20 times a second. Does the ball fall at the same speed all the way down? Use the word “accelerate”.',
            qFr: 'Une photo, un flash 20 fois par seconde. La balle tombe-t-elle à la même vitesse jusqu’en bas ? Utilise le mot « accelerate ».',
            // A question picture, not an answer picture: it is a tall, thin
            // photo, and beside a revealed answer it shrinks to a sliver. The
            // class reasons from it, as the Accelerate slide had them do.
            qImage: {
              src: IMAGES.fallingBall,
              alt: 'One photo of a falling ball, with a flash 20 times a second. The gaps between the balls get bigger.',
              altFr: 'Une photo d’une balle qui tombe, avec un flash 20 fois par seconde. Les écarts entre les balles grandissent.',
            },
            a: 'No. It accelerates: the gaps get bigger, so it goes further in each flash. Gravity makes falling objects accelerate.',
            aFr: 'Non. Elle accélère (accelerates) : les écarts grandissent, donc elle va plus loin à chaque flash. La gravité fait accélérer les objets qui tombent.',
          },
        ],
      },
      {
        name: 'Weight & Mass',
        nameFr: 'Poids et masse',
        clues: [
          {
            value: 100,
            q: 'Newtons or kilograms: which unit is for weight?',
            qFr: 'Newtons ou kilogrammes : quelle unité pour le poids ?',
            a: 'Newtons (N). Kilograms (kg) are for mass.',
            aFr: 'Les newtons (N). Les kilogrammes (kg), c’est pour la masse.',
          },
          {
            value: 200,
            q: 'Which sentence is right in science: “My weight is 40 kg” or “My mass is 40 kg”?',
            qFr: 'Quelle phrase est juste en sciences : « My weight is 40 kg » ou « My mass is 40 kg » ?',
            a: '“My mass is 40 kg.” Kilograms measure mass. Weight is in newtons.',
            aFr: '« My mass is 40 kg. » Les kilogrammes mesurent la masse. Le poids se mesure en newtons.',
          },
          {
            value: 300,
            q: 'A bag of rice has a mass of 5 kg. What is its weight on Earth?',
            qFr: 'Un sac de riz a une masse de 5 kg. Quel est son poids sur Terre ?',
            a: '50 N. Weight = mass × 10, so 5 × 10 = 50.',
            aFr: '50 N. Poids = masse × 10, donc 5 × 10 = 50.',
          },
          {
            value: 400,
            q: 'A motorbike stands still on the road. Its weight is 1500 N. What is the contact force from the road? What is its mass?',
            qFr: 'Une moto est à l’arrêt sur la route. Son poids est de 1500 N. Quelle est la force de contact de la route ? Quelle est sa masse ?',
            a: 'Contact force: 1500 N, pushing up. Nothing moves, so contact force = weight. Mass: 1500 ÷ 10 = 150 kg.',
            aFr: 'Force de contact : 1500 N, vers le haut. Rien ne bouge, donc force de contact = poids. Masse : 1500 ÷ 10 = 150 kg.',
          },
          {
            value: 500,
            q: 'Mr Bowen takes his cat (4 kg) to the Moon. Gravity there is 1.6 N/kg. How much less does the cat weigh on the Moon than on Earth?',
            qFr: 'M. Bowen emmène son chat (4 kg) sur la Lune. Là-bas, la gravité est de 1.6 N/kg. Combien le chat pèse-t-il de moins sur la Lune que sur Terre ?',
            a: '33.6 N less. Earth: 4 × 10 = 40 N. Moon: 4 × 1.6 = 6.4 N. Then 40.0 − 6.4 = 33.6. Its mass is still 4 kg. The cat is not impressed.',
            aFr: '33.6 N de moins. Terre : 4 × 10 = 40 N. Lune : 4 × 1.6 = 6.4 N. Puis 40.0 − 6.4 = 33.6. Sa masse est toujours de 4 kg. Le chat n’est pas impressionné.',
          },
        ],
      },
      {
        name: 'Bigger or Smaller?',
        nameFr: 'Plus grand ou plus petit ?',
        clues: [
          {
            value: 100,
            q: 'Which is bigger: 4.6 or 4.52?',
            qFr: 'Lequel est le plus grand : 4.6 ou 4.52 ?',
            a: '4.6. Fill with zeros: 4.60 is bigger than 4.52.',
            aFr: '4.6. Complète avec des zéros : 4.60 est plus grand que 4.52.',
          },
          {
            value: 200,
            q: 'Say 3.25 in English.',
            qFr: 'Dis 3.25 en anglais.',
            a: '“Three point two five.” Say each digit after the point on its own. Not “three point twenty-five”.',
            aFr: '« Three point two five. » Après le point, on lit chiffre par chiffre. Pas « three point twenty-five ».',
          },
          {
            value: 300,
            q: 'Write in order, starting with the smallest: 0.5, 0.45, 0.405, 0.54',
            qFr: 'Range du plus petit au plus grand : 0.5, 0.45, 0.405, 0.54',
            a: '0.405, 0.45, 0.5, 0.54. Fill with zeros first: 0.405, 0.450, 0.500, 0.540.',
            aFr: '0.405, 0.45, 0.5, 0.54. Complète d’abord avec des zéros : 0.405, 0.450, 0.500, 0.540.',
          },
          {
            value: 400,
            q: 'Four swimmers’ times, in seconds: 31.2, 30.95, 31.09, 30.9. Which time wins the race?',
            qFr: 'Les temps de quatre nageurs, en secondes : 31.2, 30.95, 31.09, 30.9. Quel temps gagne la course ?',
            a: '30.9 s. The fastest time is the smallest number, and 30.90 is smaller than 30.95.',
            aFr: '30.9 s. Le temps le plus rapide est le plus petit nombre, et 30.90 est plus petit que 30.95.',
          },
          {
            value: 500,
            q: 'Mr Bowen says: “7.125 is bigger than 7.2, because 125 is bigger than 2.” Is he right? Say why.',
            qFr: 'M. Bowen dit : « 7.125 est plus grand que 7.2, parce que 125 est plus grand que 2. » A-t-il raison ? Explique.',
            a: 'No. Fill with zeros: 7.2 = 7.200, and 7.200 is bigger than 7.125. You cannot compare 125 with 2.',
            aFr: 'Non. Complète avec des zéros : 7.2 = 7.200, et 7.200 est plus grand que 7.125. On ne peut pas comparer 125 et 2.',
          },
        ],
      },
      {
        name: 'Adding',
        nameFr: 'Additionner',
        clues: [
          {
            value: 100,
            q: 'What is 0.7 + 0.5?',
            qFr: 'Combien font 0.7 + 0.5 ?',
            a: '1.2. Seven tenths and five tenths make twelve tenths. Not 0.12.',
            aFr: '1.2. Sept dixièmes et cinq dixièmes font douze dixièmes. Pas 0.12.',
          },
          {
            value: 200,
            q: 'What is the sum of 3.5 and 2.25?',
            qFr: 'Quelle est la somme (the sum) de 3.5 et 2.25 ?',
            a: '5.75. “The sum” means add: 3.50 + 2.25 = 5.75.',
            aFr: '5.75. « The sum » veut dire additionner : 3.50 + 2.25 = 5.75.',
          },
          {
            value: 300,
            q: 'Use a mental method: 5.9 + 2.7',
            qFr: 'Utilise le calcul mental (mental method) : 5.9 + 2.7',
            a: '8.6. 5.9 is nearly 6: 6 + 2.7 = 8.7, then take away 0.1.',
            aFr: '8.6. 5.9, c’est presque 6 : 6 + 2.7 = 8.7, puis enlève 0.1.',
          },
          {
            value: 400,
            q: 'Mr Bowen worked out 4.65 + 3.2 like this. What did he do wrong?',
            qFr: 'M. Bowen a calculé 4.65 + 3.2 comme ça. Quelle est son erreur ?',
            qImage: {
              src: IMAGES.columnAdd,
              alt: '4.65 plus 3.2 in columns, with the 3.2 pushed right, under the 6 and the 5. The answer written is 4.97.',
              altFr: '4.65 plus 3.2 en colonnes, avec 3.2 décalé à droite, sous le 6 et le 5. La réponse écrite est 4.97.',
            },
            a: 'He lined up the last digits, not the points. Line up the points: 4.65 + 3.20 = 7.85.',
            aFr: 'Il a aligné les derniers chiffres, pas les points. Aligne les points : 4.65 + 3.20 = 7.85.',
          },
          {
            value: 500,
            q: 'Mr Bowen puts his bag (45.5 N) and his laptop (18.75 N) on a table. Nothing moves. What is the contact force from the table?',
            qFr: 'M. Bowen pose son sac (45.5 N) et son ordinateur portable (18.75 N) sur une table. Rien ne bouge. Quelle est la force de contact de la table ?',
            a: '64.25 N. 45.50 + 18.75 = 64.25. Nothing moves, so the contact force = the total weight.',
            aFr: '64.25 N. 45.50 + 18.75 = 64.25. Rien ne bouge, donc force de contact = poids total.',
          },
        ],
      },
      {
        name: 'Subtracting',
        nameFr: 'Soustraire',
        clues: [
          {
            value: 100,
            q: 'What is 5.8 − 2.3?',
            qFr: 'Combien font 5.8 − 2.3 ?',
            a: '3.5. Line up the points.',
            aFr: '3.5. Aligne les points.',
          },
          {
            value: 200,
            q: 'Subtract 1.2 from 4.6.',
            qFr: '« Subtract 1.2 from 4.6. » Calcule.',
            a: '3.4. “From 4.6” means start at 4.6: 4.6 − 1.2 = 3.4.',
            aFr: '3.4. « From 4.6 » veut dire : commence à 4.6. 4.6 − 1.2 = 3.4.',
          },
          {
            value: 300,
            q: 'Work out 1 − 0.72. Then check by adding.',
            qFr: 'Calcule 1 − 0.72. Puis vérifie en additionnant.',
            a: '0.28. Write 1 as 1.00. Check: 0.28 + 0.72 = 1. (Not 0.38.)',
            aFr: '0.28. Écris 1 comme 1.00. Vérifie : 0.28 + 0.72 = 1. (Pas 0.38.)',
          },
          {
            value: 400,
            q: 'Mr Bowen pays for a 4.85-dollar sandwich with a 20-dollar note. How much change does he get?',
            qFr: 'M. Bowen paie un sandwich à 4.85 dollars avec un billet de 20 dollars. Combien de monnaie (change) reçoit-il ?',
            a: '15.15 dollars. Change is the money you get back: 20.00 − 4.85 = 15.15.',
            aFr: '15.15 dollars. La monnaie (change), c’est l’argent qu’on te rend : 20.00 − 4.85 = 15.15.',
          },
          {
            value: 500,
            q: 'Usain Bolt runs 100 m in 9.58 s. Mr Bowen runs it in 16.04 s. How many seconds faster is Usain Bolt?',
            qFr: 'Usain Bolt court le 100 m en 9.58 s. M. Bowen le court en 16.04 s. De combien de secondes Usain Bolt est-il plus rapide ?',
            qImage: {
              src: IMAGES.usainBolt,
              alt: 'Usain Bolt, smiling, in Berlin in 2009.',
              altFr: 'Usain Bolt, souriant, à Berlin en 2009.',
            },
            a: '6.46 s. 16.04 − 9.58 = 6.46. Check: 9.58 + 6.46 = 16.04. Mr Bowen is still training.',
            aFr: '6.46 s. 16.04 − 9.58 = 6.46. Vérifie : 9.58 + 6.46 = 16.04. M. Bowen s’entraîne encore.',
          },
        ],
      },
    ],
  },

  // ── 11 · MATHS UNIT 4 + SCIENCE 3.1–3.2 ───────────────────────────────────
  // The week of 19 October: the rest of the decimals unit (4.3–4.5 and the
  // review day) in three columns, and Science 3.1–3.2 in three more. Nothing
  // repeats Board 10, which already has 4.1–4.2 and the falling half of 3.1:
  // here 3.1 is the contact force, N/kg, the scales and Mars, and two columns
  // are 3.2 — the facts and how it formed, then the evidence and the model.
  //
  // English and French, like Board 10. The traps are the decks' own: 0.28 for
  // 0.7 × 4, 2.6 for 6.18 ÷ 3, the right digits with the point in the wrong
  // place (6.44), 900 for 450 × 0.2, taking away 4 instead of 4.80, "Mr Bowen
  // and four friends" is five people, money to 2 decimal places, scales that
  // show kg but feel newtons, the biggest planet that is not a star, and Venus
  // and Uranus, which only SEEM to contradict. The 200s are the English:
  // "share equally", "of", "conjecture", "per", orbit against spin, "observe".
  //
  // Two clues join the subjects: the mean of four fall times (Money & the
  // Mean 400) and the Curiosity rover's weight on Mars, 900 × 3.7 by
  // partitioning (Forces 500).
  {
    id: 'decimals-solar-system',
    title: 'Maths Unit 4 + Science 3.1–3.2',
    titleFr: 'Maths unité 4 + Sciences 3.1–3.2',
    subtitle: 'Multiply, divide, shortcuts, the mean; forces and the Solar System',
    subtitleFr: 'Multiplier, diviser, raccourcis, moyenne ; forces et système solaire',
    icon: 'Sun',
    accent: '#475569',
    categories: [
      {
        name: 'Multiply & Divide',
        nameFr: 'Multiplier et diviser',
        clues: [
          {
            value: 100,
            q: 'What is 0.7 × 4?',
            qFr: 'Combien font 0.7 × 4 ?',
            a: '2.8. Four lots of 0.7 go past 1. Not 0.28.',
            aFr: '2.8. Quatre fois 0.7, ça dépasse 1. Pas 0.28.',
          },
          {
            value: 200,
            q: 'Share 7.2 kg of rice equally between 3 bags. How much rice goes in each bag?',
            qFr: 'Partage 7.2 kg de riz en parts égales (share equally) dans 3 sacs. Combien de riz va dans chaque sac ?',
            a: '2.4 kg. “Share equally” means divide: 7.2 ÷ 3 = 2.4.',
            aFr: '2.4 kg. « Share equally » veut dire diviser : 7.2 ÷ 3 = 2.4.',
          },
          {
            value: 300,
            q: 'Work out 6.18 ÷ 3. Then check with the inverse calculation.',
            qFr: 'Calcule 6.18 ÷ 3. Puis vérifie avec le calcul inverse (inverse calculation).',
            a: '2.06. 1 ÷ 3 does not go, so write 0. Check: 2.06 × 3 = 6.18. (Not 2.6.)',
            aFr: '2.06. 1 ÷ 3, ça ne va pas, donc écris 0. Vérifie : 2.06 × 3 = 6.18. (Pas 2.6.)',
          },
          {
            value: 400,
            q: 'Work out 57.6 ÷ 16. Write the 16 times table first.',
            qFr: 'Calcule 57.6 ÷ 16. Écris d’abord la table de 16.',
            a: '3.6. The table: 16, 32, 48, 64. 57 ÷ 16 = 3, remainder 9. Then 96 ÷ 16 = 6.',
            aFr: '3.6. La table : 16, 32, 48, 64. 57 ÷ 16 = 3, reste 9. Puis 96 ÷ 16 = 6.',
          },
          {
            value: 500,
            q: 'Mr Bowen says 2.8 × 23 = 6.44, because 28 × 23 = 644. Is he right? How can you tell without working it out?',
            qFr: 'M. Bowen dit que 2.8 × 23 = 6.44, parce que 28 × 23 = 644. A-t-il raison ? Comment le savoir sans calculer ?',
            a: 'No. Estimate: 3 × 20 = 60, so the answer is near 60, not near 6. 2.8 × 23 = 64.4.',
            aFr: 'Non. Estime : 3 × 20 = 60, donc la réponse est proche de 60, pas de 6. 2.8 × 23 = 64.4.',
          },
        ],
      },
      {
        name: 'Shortcuts',
        nameFr: 'Raccourcis',
        clues: [
          {
            value: 100,
            q: 'Write 0.09 as a fraction.',
            qFr: 'Écris 0.09 en fraction.',
            a: '9/100. The 9 is in the hundredths column.',
            aFr: '9/100. Le 9 est dans la colonne des centièmes.',
          },
          {
            value: 200,
            q: 'In “a quarter of 60”, what does “of” mean? Work it out.',
            qFr: 'Dans « a quarter of 60 », que veut dire « of » ? Calcule.',
            a: '“Of” means ×. A quarter of 60 = 60 × 0.25 = 60 ÷ 4 = 15.',
            aFr: '« Of » veut dire ×. Le quart de 60 : 60 × 0.25 = 60 ÷ 4 = 15.',
          },
          {
            value: 300,
            q: 'Work out 450 × 0.2 in your head.',
            qFr: 'Calcule 450 × 0.2 de tête.',
            a: '90. × 0.2 means ÷ 10, then × 2: 45 × 2 = 90. Not 900: multiplying by 0.2 makes it smaller.',
            aFr: '90. × 0.2 veut dire ÷ 10, puis × 2 : 45 × 2 = 90. Pas 900 : multiplier par 0.2 rend plus petit.',
          },
          {
            value: 400,
            q: 'What does “partitioning” mean? Use it to work out 7.2 × 6.',
            qFr: 'Que veut dire « partitioning » ? Utilise-le pour calculer 7.2 × 6.',
            a: 'Splitting a number into parts that are easy to work with. 7.2 × 6 = 7 × 6 + 0.2 × 6 = 42 + 1.2 = 43.2.',
            aFr: 'Décomposer : couper un nombre en parties faciles à calculer. 7.2 × 6 = 7 × 6 + 0.2 × 6 = 42 + 1.2 = 43.2.',
          },
          {
            value: 500,
            q: 'Mr Bowen buys 9 bowls of phở. Each one costs 4.80 dollars. Use a quick way to find the total.',
            qFr: 'M. Bowen achète 9 bols de phở. Chacun coûte 4.80 dollars. Utilise un moyen rapide pour trouver le total.',
            a: '43.20 dollars. × 10, then take away one lot: 48.00 − 4.80 = 43.20. Take away 4.80, not 4. All nine are for him.',
            aFr: '43.20 dollars. × 10, puis enlève une fois le prix : 48.00 − 4.80 = 43.20. Enlève 4.80, pas 4. Les neuf sont pour lui.',
          },
        ],
      },
      {
        name: 'Money & the Mean',
        nameFr: 'L’argent et la moyenne',
        clues: [
          {
            value: 100,
            q: 'Write 6.5 dollars the way a shop would.',
            qFr: 'Écris 6.5 dollars comme dans un magasin.',
            a: '6.50 dollars. Money is written to 2 decimal places.',
            aFr: '6.50 dollars. L’argent s’écrit avec 2 décimales.',
          },
          {
            value: 200,
            q: 'What is a conjecture?',
            qFr: 'Qu’est-ce qu’une conjecture ?',
            a: 'A guess that you can test, like a hypothesis in science.',
            aFr: 'Une supposition que l’on peut vérifier, comme une hypothèse en sciences.',
          },
          {
            value: 300,
            q: 'Mr Bowen and four friends share a 13-dollar taxi equally. How much does each person pay?',
            qFr: 'M. Bowen et quatre amis partagent un taxi à 13 dollars en parts égales. Combien paie chaque personne ?',
            a: '2.60 dollars. That is 5 people: 13 ÷ 5 = 2.6. Money has 2 decimal places.',
            aFr: '2.60 dollars. Ça fait 5 personnes : 13 ÷ 5 = 2.6. L’argent a 2 décimales.',
          },
          {
            value: 400,
            q: 'Mr Bowen drops a ball 4 times and times each fall: 0.48 s, 0.52 s, 0.45 s and 0.55 s. What is the mean time?',
            qFr: 'M. Bowen lâche une balle 4 fois et chronomètre chaque chute : 0.48 s, 0.52 s, 0.45 s et 0.55 s. Quel est le temps moyen (the mean) ?',
            a: '0.5 s. Add them: 0.48 + 0.52 + 0.45 + 0.55 = 2.00. Then divide by how many: 2.00 ÷ 4 = 0.50.',
            aFr: '0.5 s. Additionne : 0.48 + 0.52 + 0.45 + 0.55 = 2.00. Puis divise par leur nombre : 2.00 ÷ 4 = 0.50.',
          },
          {
            value: 500,
            q: 'Mr Bowen buys 3 notebooks at 1.85 dollars each and a pen at 0.95 dollars. He pays with a 10-dollar note. How much change does he get?',
            qFr: 'M. Bowen achète 3 cahiers à 1.85 dollar chacun et un stylo à 0.95 dollar. Il paie avec un billet de 10 dollars. Combien de monnaie (change) reçoit-il ?',
            a: '3.50 dollars. 3 × 1.85 = 5.55, then 5.55 + 0.95 = 6.50, then 10.00 − 6.50 = 3.50.',
            aFr: '3.50 dollars. 3 × 1.85 = 5.55, puis 5.55 + 0.95 = 6.50, puis 10.00 − 6.50 = 3.50.',
          },
        ],
      },
      {
        name: 'Forces',
        nameFr: 'Les forces',
        clues: [
          {
            value: 100,
            q: 'A book sits on a desk. Gravity pulls it down. What pushes it up?',
            qFr: 'Un livre est posé sur une table. La gravité le tire vers le bas. Qu’est-ce qui le pousse vers le haut ?',
            a: 'The desk. Its push is called the contact force.',
            aFr: 'La table. Sa poussée s’appelle la force de contact (contact force).',
          },
          {
            value: 200,
            q: 'Say “10 N/kg” in words. What does “per” mean?',
            qFr: 'Dis « 10 N/kg » en anglais. Que veut dire « per » ?',
            a: '“Ten newtons per kilogram.” “Per” means “for every”: 10 N for every 1 kg.',
            aFr: '« Ten newtons per kilogram. » « Per » veut dire « pour chaque » : 10 N pour chaque kilogramme.',
          },
          {
            value: 300,
            q: 'A table weighs 600 N. It stands on 4 legs, and the weight is shared equally. What is the contact force on each leg?',
            qFr: 'Une table pèse 600 N. Elle tient sur 4 pieds, et le poids est partagé également. Quelle est la force de contact sur chaque pied ?',
            a: '150 N. Shared equally means divide: 600 ÷ 4 = 150.',
            aFr: '150 N. Partagé également : on divise. 600 ÷ 4 = 150.',
          },
          {
            value: 400,
            q: 'Mr Bowen stands on his bathroom scales. They show 80 kg. What pushes down on the scales: his mass or his weight? How big is it?',
            qFr: 'M. Bowen monte sur sa balance. Elle affiche 80 kg. Qu’est-ce qui appuie sur la balance : sa masse ou son poids ? Combien ?',
            // A question picture: the clue names the scales, and "scales" for
            // one object is English the class has to see to believe.
            qImage: {
              src: IMAGES.bathroomScales,
              alt: 'A white digital bathroom scale.',
              altFr: 'Une balance de salle de bain numérique, blanche.',
            },
            a: 'His weight: 80 × 10 = 800 N. The scales divide it by 10 and show kg.',
            aFr: 'Son poids : 80 × 10 = 800 N. La balance le divise par 10 et affiche des kg.',
          },
          {
            value: 500,
            q: 'The Curiosity rover has a mass of 900 kg. Gravity on Mars is 3.7 N/kg. What is its weight on Mars? And its mass there?',
            qFr: 'Le rover Curiosity a une masse de 900 kg. Sur Mars, la gravité est de 3.7 N/kg. Quel est son poids sur Mars ? Et sa masse là-bas ?',
            a: '3330 N. Partition 3.7: 900 × 3 + 900 × 0.7 = 2700 + 630 = 3330. Its mass is still 900 kg.',
            aFr: '3330 N. Décompose 3.7 : 900 × 3 + 900 × 0.7 = 2700 + 630 = 3330. Sa masse est toujours de 900 kg.',
          },
        ],
      },
      {
        name: 'The Solar System',
        nameFr: 'Le système solaire',
        clues: [
          {
            value: 100,
            q: 'What is a nebula?',
            qFr: 'Qu’est-ce qu’une nébuleuse (nebula) ?',
            // Held back: a glowing cloud beside "What is a nebula?" answers it.
            aImage: {
              src: IMAGES.orionNebula,
              alt: 'The Orion Nebula, photographed by the Hubble telescope: a glowing cloud of dust and gas.',
              altFr: 'La nébuleuse d’Orion, photographiée par le télescope Hubble : un nuage brillant de poussière et de gaz.',
            },
            a: 'A cloud of dust and gas in space. This is the Orion Nebula: new stars are forming in it.',
            aFr: 'Un nuage de poussière et de gaz dans l’espace. Voici la nébuleuse d’Orion : de nouvelles étoiles s’y forment.',
          },
          {
            value: 200,
            q: 'The Earth goes round the Sun once a year. It also turns on its axis once a day. Which is the orbit, and which is the spin?',
            qFr: 'La Terre fait le tour du Soleil une fois par an. Elle tourne aussi sur son axe une fois par jour. Lequel est l’orbite (orbit), et lequel est la rotation (spin) ?',
            a: 'Going round the Sun is the orbit. Turning on its axis is the spin.',
            aFr: 'Faire le tour du Soleil, c’est l’orbite (orbit). Tourner sur son axe, c’est la rotation (spin).',
          },
          {
            value: 300,
            q: 'Gravity pulls the dust in a nebula into clumps. Why does the biggest clump grow faster and faster?',
            qFr: 'La gravité rassemble la poussière d’une nébuleuse en amas. Pourquoi le plus gros amas grossit-il de plus en plus vite ?',
            a: 'More mass → stronger gravity → it pulls in even more dust and gas.',
            aFr: 'Plus de masse → gravité plus forte → il attire encore plus de poussière et de gaz.',
          },
          {
            value: 400,
            q: 'Jupiter is the biggest planet. So why is it not a star?',
            qFr: 'Jupiter est la plus grosse planète. Alors pourquoi n’est-ce pas une étoile ?',
            qImage: {
              src: IMAGES.jupiter,
              alt: 'Jupiter, photographed by the Hubble telescope in 2024.',
              altFr: 'Jupiter, photographiée par le télescope Hubble en 2024.',
            },
            a: 'Not enough mass. Only a clump with enough mass gets hot and becomes a star. Jupiter would need about 80 times more.',
            aFr: 'Pas assez de masse. Seul un amas avec assez de masse chauffe assez pour devenir une étoile. Il faudrait à Jupiter environ 80 fois plus de masse.',
          },
          {
            value: 500,
            q: 'Why do all the planets orbit the Sun the same way, in one flat plane?',
            qFr: 'Pourquoi toutes les planètes tournent-elles autour du Soleil dans le même sens, dans un seul plan ?',
            a: 'The Sun and the planets formed from one spinning cloud. A spinning cloud flattens, like pizza dough, and everything in it keeps going round the same way.',
            aFr: 'Le Soleil et les planètes viennent d’un seul nuage qui tournait. Un nuage qui tourne s’aplatit, comme une pâte à pizza, et tout ce qu’il contient continue de tourner dans le même sens.',
          },
        ],
      },
      {
        name: 'Evidence & Models',
        nameFr: 'Preuves et modèles',
        clues: [
          {
            value: 100,
            q: 'Evidence or hypothesis: which one is “an idea that can be tested”?',
            qFr: 'Evidence ou hypothesis : lequel est « une idée qu’on peut tester » ?',
            a: 'A hypothesis. Evidence is facts from observations or experiments.',
            aFr: 'L’hypothèse (hypothesis). Les preuves (evidence) sont des faits tirés d’observations ou d’expériences.',
          },
          {
            value: 200,
            q: 'What does “observe” mean? Why could nobody observe the Solar System forming?',
            qFr: 'Que veut dire « observe » ? Pourquoi personne n’a-t-il pu observer la formation du système solaire ?',
            a: '“Observe” means watch. It formed 4.6 billion years ago: nobody was there.',
            aFr: '« Observe » veut dire regarder, observer. Il s’est formé il y a 4.6 milliards d’années : personne n’était là.',
          },
          {
            value: 300,
            q: 'A real photo of a young star, HL Tauri, and its flat disc of dust. Does it support or contradict the hypothesis?',
            qFr: 'Une vraie photo d’une jeune étoile, HL Tauri, et de son disque plat de poussière. Confirme-t-elle (support) ou contredit-elle (contradict) l’hypothèse ?',
            // A question picture: the photograph IS the evidence being judged.
            qImage: {
              src: IMAGES.hlTauri,
              alt: 'The young star HL Tauri, photographed by the ALMA telescopes in 2014: a bright centre in a flat disc of dust with dark rings.',
              altFr: 'La jeune étoile HL Tauri, photographiée par les télescopes ALMA en 2014 : un centre brillant dans un disque plat de poussière, avec des anneaux sombres.',
            },
            a: 'It supports it. The hypothesis says everything formed from one spinning cloud, and a spinning cloud makes a flat disc. The dark rings may be new planets.',
            aFr: 'Elle la confirme (supports). L’hypothèse dit que tout vient d’un seul nuage qui tournait, et un nuage qui tourne forme un disque plat. Les anneaux sombres sont peut-être de nouvelles planètes.',
          },
          {
            value: 400,
            q: 'Venus spins the opposite way. Uranus spins on its side. Do these facts support or contradict the hypothesis?',
            qFr: 'Vénus tourne dans le sens opposé. Uranus tourne sur le côté. Ces faits confirment-ils ou contredisent-ils l’hypothèse ?',
            a: 'They seem to contradict it: one spinning cloud should make every planet spin the same way. So most, but not all, of the evidence supports it.',
            aFr: 'Ils semblent la contredire (seem to contradict) : un seul nuage qui tourne devrait faire tourner toutes les planètes dans le même sens. Donc la plupart des preuves, mais pas toutes, la confirment.',
          },
          {
            value: 500,
            q: 'Our dust model was flat and had only 240 grains. Is that a mistake, a limitation or a strength? Then give the model one strength.',
            qFr: 'Notre modèle de poussière était plat, avec 240 grains seulement. Est-ce une erreur (a mistake), une limite (a limitation) ou un point fort (a strength) ? Puis donne un point fort du modèle.',
            a: 'A limitation: something a model cannot do. Nobody got it wrong. A strength: it shows millions of years in a few seconds.',
            aFr: 'Une limite (a limitation) : ce qu’un modèle ne peut pas faire. Personne ne s’est trompé. Un point fort : il montre des millions d’années en quelques secondes.',
          },
        ],
      },
    ],
  },

  // ── 12 · SCIENCE 4.1–4.3 ──────────────────────────────────────────────────
  // The week of 9 November: the start of Unit 4, Grouping and identifying
  // organisms. Two columns from 4.1 (characteristics of living organisms), one
  // from 4.2 (viruses), one from 4.3 (what a species is, from the book: there
  // is no deck yet), a guessing round of hybrids, and the science English.
  //
  // English and French, like Boards 10 and 11. The traps are the decks' own:
  // respiration is not breathing (in French the two are one word, which makes
  // it worse), a car does some of the seven but not all, breathing out carbon
  // dioxide is excretion, the CELL makes the new viruses, three colours of
  // budgie are one species, similar is not identical, and a liger does not make
  // lions and tigers one species. The 200s and 300s of Science English are the
  // English traps: the two meanings of "sensitive", and "the virus makes
  // copies" against replication.
  //
  // HYBRIDS is a guessing round: "A ___ and a ___ have a baby. What is it
  // called?" Every clue in it holds back a photograph of the real animal until
  // the reveal, because seeing it is the payoff. The column ends on 4.3's word:
  // a wholphin can be fertile, a mule cannot. The tigon (tiger dad, lion mum)
  // has no clue of its own, because no usable photograph of one exists on
  // Commons; it rides in the liger's answer instead.
  {
    id: 'living-viruses-species',
    title: 'Science 4.1–4.3',
    titleFr: 'Sciences 4.1–4.3',
    subtitle: 'Living things, viruses, species and hybrids',
    subtitleFr: 'Le vivant, les virus, les espèces et les hybrides',
    icon: 'PawPrint',
    accent: '#65a30d',
    categories: [
      {
        name: 'Alive?',
        nameFr: 'Vivant ?',
        clues: [
          {
            value: 100,
            q: 'What is an organism?',
            qFr: 'Qu’est-ce qu’un organisme (organism) ?',
            a: 'A living thing. You are an organism, and so is a tree.',
            aFr: 'Un être vivant. Tu es un organisme, et un arbre aussi.',
          },
          {
            value: 200,
            q: 'A tree has no heart, and it does not breathe like you. How do we know it is alive?',
            qFr: 'Un arbre n’a pas de cœur, et il ne respire pas comme toi. Comment sait-on qu’il est vivant ?',
            a: 'It grows, and it makes seeds. A heartbeat is not the test.',
            aFr: 'Il grandit, et il fait des graines. Le cœur n’est pas le test.',
          },
          {
            value: 300,
            q: 'A car moves. It takes in fuel and oxygen, and it gives out waste gases. Is it alive?',
            qFr: 'Une voiture bouge. Elle prend du carburant et de l’oxygène, et elle rejette des gaz. Est-elle vivante ?',
            // A question picture: the car is named in the clue.
            qImage: {
              src: IMAGES.sci41Car,
              alt: 'A silver Toyota Vios, a petrol car, parked in Ho Chi Minh City.',
              altFr: 'Une Toyota Vios grise, une voiture à essence, garée à Hô Chi Minh-Ville.',
            },
            a: 'No. It does some of the seven, but not all. It cannot grow or reproduce.',
            aFr: 'Non. Elle fait quelques-unes des sept, mais pas toutes. Elle ne peut pas grandir ni se reproduire.',
          },
          {
            value: 400,
            q: 'A robot vacuum cleaner moves, and it senses walls. Is it alive? Name two of the seven it cannot do.',
            qFr: 'Un robot aspirateur bouge, et il sent les murs. Est-il vivant ? Nomme deux des sept qu’il ne sait pas faire.',
            a: 'Not alive. It cannot grow or reproduce. It never eats (nutrition), and it has no cells for respiration.',
            aFr: 'Pas vivant. Il ne peut pas grandir ni se reproduire. Il ne mange jamais (nutrition), et il n’a pas de cellules pour la respiration.',
          },
          {
            value: 500,
            q: 'Mr Bowen says his pet rock is alive. It is very quiet, and it never complains. How many of the seven does the rock do?',
            qFr: 'M. Bowen dit que son caillou de compagnie est vivant. Il est très calme, et il ne se plaint jamais. Combien des sept le caillou fait-il ?',
            a: 'None. A living organism does all seven. Being quiet is not one of them.',
            aFr: 'Aucune. Un organisme vivant fait les sept. Être calme n’en fait pas partie.',
          },
        ],
      },
      {
        name: 'The Seven',
        nameFr: 'Les sept',
        clues: [
          {
            value: 100,
            q: 'What does the G in MRS GREN stand for? What does it mean?',
            qFr: 'Que veut dire le G de MRS GREN ? Qu’est-ce que ça signifie ?',
            a: 'Growth: getting bigger.',
            aFr: 'Growth (la croissance) : devenir plus grand.',
          },
          {
            value: 200,
            q: 'In science, is respiration the same as breathing?',
            qFr: 'En sciences, « respiration » veut-il dire « breathing » (respirer) ?',
            a: 'No. Respiration is breaking down food inside cells to get energy. Breathing only brings in the oxygen.',
            aFr: 'Non. La respiration, c’est décomposer la nourriture dans les cellules pour avoir de l’énergie. Respirer (breathing) fait seulement entrer l’oxygène.',
          },
          {
            value: 300,
            q: 'You jog on the spot for 20 seconds. You get hot, and you breathe faster. Why?',
            qFr: 'Tu cours sur place pendant 20 secondes. Tu as chaud, et tu respires plus vite. Pourquoi ?',
            a: 'Your cells need more energy, so they do more respiration.',
            aFr: 'Tes cellules ont besoin de plus d’énergie, alors elles font plus de respiration.',
          },
          {
            value: 400,
            q: 'You touch a sensitive plant, and its leaves fold up. Which two of the seven do you see?',
            qFr: 'Tu touches une sensitive, et ses feuilles se replient. Quelles deux caractéristiques des sept vois-tu ?',
            a: 'Sensitivity: it notices the touch. Movement: its leaves change shape.',
            aFr: 'La sensibilité (sensitivity) : elle remarque le toucher. Le mouvement (movement) : ses feuilles changent de forme.',
          },
          {
            value: 500,
            q: 'Mr Bowen eats three bánh mì for breakfast. Then he breathes out carbon dioxide. Which two of the seven is he doing?',
            qFr: 'M. Bowen mange trois bánh mì au petit-déjeuner. Puis il rejette du dioxyde de carbone en expirant. Quelles deux caractéristiques des sept fait-il ?',
            a: 'Nutrition: taking in food. Excretion: getting rid of waste, such as carbon dioxide. Three is a lot.',
            aFr: 'La nutrition : prendre de la nourriture. L’excrétion (excretion) : rejeter les déchets, comme le dioxyde de carbone. Trois, c’est beaucoup.',
          },
        ],
      },
      {
        name: 'Viruses',
        nameFr: 'Les virus',
        clues: [
          {
            value: 100,
            q: 'You are made of cells. Is a virus made of cells?',
            qFr: 'Tu es fait de cellules. Un virus est-il fait de cellules ?',
            a: 'No. A virus is a very small particle, much smaller than a cell. It has no membrane, no cytoplasm and no nucleus.',
            aFr: 'Non. Un virus est une très petite particule, bien plus petite qu’une cellule. Il n’a pas de membrane, pas de cytoplasme et pas de noyau.',
          },
          {
            value: 200,
            q: 'A virus is too small to see with a normal microscope. What kind of microscope can see it?',
            qFr: 'Un virus est trop petit pour un microscope normal. Quel microscope peut le voir ?',
            // Held back: the machine is the answer.
            aImage: {
              src: IMAGES.sci42Microscope,
              alt: 'A scientist at a scanning electron microscope, with its pictures on the screens beside her.',
              altFr: 'Une scientifique devant un microscope électronique à balayage, ses images sur les écrans à côté d’elle.',
            },
            a: 'An electron microscope. 10 000 flu viruses in a line are only about 1 mm long.',
            aFr: 'Un microscope électronique (electron microscope). 10 000 virus de la grippe en ligne font environ 1 mm.',
          },
          {
            value: 300,
            q: 'Corona means “crown”. Look at the spikes on these coronaviruses. Which part of a virus are they? Name the other two parts.',
            qFr: 'Corona veut dire « couronne ». Regarde les pointes de ces coronavirus. Quelle partie d’un virus sont-elles ? Nomme les deux autres parties.',
            // A question picture: the clue asks the class to look at it.
            qImage: {
              src: IMAGES.sci42Covid,
              alt: 'Real SARS-CoV-2 viruses seen with an electron microscope, coloured: spikes make a crown round each one.',
              altFr: 'De vrais virus SARS-CoV-2 vus au microscope électronique, en couleurs : des pointes font une couronne autour de chacun.',
            },
            a: 'The pegs: they stick to your cells. The other two parts are the protein coat and the RNA, the instructions inside.',
            aFr: 'Les picots (pegs) : ils se collent à tes cellules. Les deux autres parties sont l’enveloppe de protéines (protein coat) et l’ARN (RNA), les instructions à l’intérieur.',
          },
          {
            value: 400,
            q: 'Put these in order: A the cell dies, B the pegs stick, C the cell copies the RNA, D the virus gets in.',
            qFr: 'Remets dans l’ordre : A la cellule meurt, B les picots se collent, C la cellule copie l’ARN, D le virus entre.',
            a: 'B, D, C, A: stick, get in, copy, burst out. The new viruses burst out, and the cell dies.',
            aFr: 'B, D, C, A : se coller, entrer, copier, éclater. Les nouveaux virus sortent, et la cellule meurt.',
          },
          {
            value: 500,
            q: 'Is a virus alive? Pick a side and give a reason.',
            qFr: 'Un virus est-il vivant ? Choisis un côté et donne une raison.',
            a: 'Both can be right: scientists disagree. Not alive: it is not made of cells, and on its own it does none of the seven. Alive: it has instructions (RNA), and inside a cell it replicates.',
            aFr: 'Les deux peuvent être justes : les scientifiques ne sont pas d’accord. Pas vivant : il n’est pas fait de cellules, et tout seul il ne fait aucune des sept. Vivant : il a des instructions (ARN), et dans une cellule il se réplique.',
          },
        ],
      },
      {
        name: 'Species',
        nameFr: 'Les espèces',
        clues: [
          {
            value: 100,
            q: 'Three budgies of different colours. Are they three species, or one?',
            qFr: 'Trois perruches (budgies) de couleurs différentes. Sont-elles trois espèces, ou une seule ?',
            // A question picture: the colours are the trap, so the class has to
            // see them.
            qImage: {
              src: IMAGES.sci43Budgies,
              alt: 'Three budgies on a branch: one yellow and green, one blue and white, one green with a yellow head.',
              altFr: 'Trois perruches sur une branche : une jaune et verte, une bleue et blanche, une verte à tête jaune.',
            },
            a: 'One species. Colour does not make a new species. These differences are called variation.',
            aFr: 'Une seule espèce. La couleur ne fait pas une nouvelle espèce. Ces différences s’appellent la variation (variation).',
          },
          {
            value: 200,
            q: 'Two elephants of the same species. Are they identical or similar?',
            qFr: 'Deux éléphants de la même espèce. Sont-ils identiques (identical) ou semblables (similar) ?',
            a: 'Similar. Identical means exactly the same. Some Indian elephants have straighter tusks, or pink markings in different places.',
            aFr: 'Semblables (similar). Identical veut dire exactement pareils. Certains éléphants d’Inde ont des défenses plus droites, ou des taches roses à d’autres endroits.',
          },
          {
            value: 300,
            q: 'Indian elephants and African elephants look similar. Are they one species, or two?',
            qFr: 'Les éléphants d’Inde et les éléphants d’Afrique se ressemblent. Sont-ils une seule espèce, ou deux ?',
            a: 'Two different species. Looking similar is not the test.',
            aFr: 'Deux espèces différentes. Se ressembler, ce n’est pas le test.',
          },
          {
            value: 400,
            q: 'How do scientists decide if two organisms are the same species?',
            qFr: 'Comment les scientifiques décident-ils si deux organismes sont de la même espèce ?',
            a: 'They can reproduce together and have fertile offspring: young that can have young of their own.',
            aFr: 'Ils peuvent se reproduire ensemble et avoir des petits féconds (fertile offspring) : des petits qui pourront avoir des petits à leur tour.',
          },
          {
            value: 500,
            q: 'A lion and a tiger can have a baby. So why are lions and tigers still two different species?',
            qFr: 'Un lion et une tigresse peuvent avoir un petit. Alors pourquoi les lions et les tigres sont-ils toujours deux espèces différentes ?',
            a: 'The baby, a liger, is almost always infertile: it cannot have babies of its own. One species makes fertile offspring.',
            aFr: 'Le petit, un ligre, est presque toujours stérile (infertile) : il ne peut pas avoir de petits. Une espèce fait des petits féconds.',
          },
        ],
      },
      {
        name: 'Hybrids',
        nameFr: 'Les hybrides',
        clues: [
          {
            value: 100,
            q: 'A male lion and a female tiger have a baby. What is it called?',
            qFr: 'Un lion et une tigresse ont un petit. Comment s’appelle-t-il ?',
            aImage: {
              src: IMAGES.sci43Liger,
              alt: 'A liger lying on rocks at Novosibirsk Zoo: a lion’s face, with faint tiger stripes on its body.',
              altFr: 'Un ligre couché sur des rochers au zoo de Novossibirsk : une tête de lion, avec de légères rayures de tigre sur le corps.',
            },
            a: 'A liger: lion + tiger. Dad’s name goes first. A tiger dad and a lion mum make a tigon!',
            aFr: 'Un ligre (liger) : lion + tigre. Le nom du papa vient en premier. Un papa tigre et une maman lionne font un tigron (tigon) !',
          },
          {
            value: 200,
            q: 'A zebra and a donkey have a baby. What is it called?',
            qFr: 'Un zèbre et un âne ont un petit. Comment s’appelle-t-il ?',
            aImage: {
              src: IMAGES.sci43Zonkey,
              alt: 'A zonkey in a field: shaped like a donkey, with zebra stripes.',
              altFr: 'Un zébrâne dans un pré : la forme d’un âne, avec des rayures de zèbre.',
            },
            a: 'A zonkey (or a zedonk): zebra + donkey. Look at the stripes.',
            aFr: 'Un zébrâne (zonkey) : zèbre + âne. Regarde les rayures.',
          },
          {
            value: 300,
            q: 'A false killer whale and a bottlenose dolphin have a baby. What is it called?',
            qFr: 'Un faux-orque et un grand dauphin ont un petit. Comment s’appelle-t-il ?',
            aImage: {
              src: IMAGES.sci43Wholphin,
              alt: 'Kawili Kai, a baby wholphin, 9 months old, at Sea Life Park in Hawaii.',
              altFr: 'Kawili Kai, un bébé wholphin de 9 mois, au Sea Life Park à Hawaï.',
            },
            a: 'A wholphin: whale + dolphin. This one was born in Hawaii in 2004. Her mum was a wholphin too, so wholphins can be fertile!',
            aFr: 'Un wholphin : whale (baleine) + dolphin (dauphin). Celle-ci est née à Hawaï en 2004. Sa maman était aussi un wholphin, donc les wholphins peuvent être féconds !',
          },
          {
            value: 400,
            q: 'A polar bear and a brown bear have a baby. What is it called?',
            qFr: 'Un ours polaire et un ours brun ont un petit. Comment s’appelle-t-il ?',
            aImage: {
              src: IMAGES.sci43Pizzly,
              alt: 'A pale, cream-coloured bear at Osnabrück Zoo in Germany: half polar bear, half brown bear.',
              altFr: 'Un ours pâle, couleur crème, au zoo d’Osnabrück en Allemagne : moitié ours polaire, moitié ours brun.',
            },
            a: 'A pizzly bear, or a grolar bear: polar + grizzly (a kind of brown bear). Some live in the wild, in the Arctic.',
            aFr: 'Un pizzly, ou un grolar : polar + grizzly (une sorte d’ours brun). Il y en a dans la nature, dans l’Arctique.',
          },
          {
            value: 500,
            q: 'A male donkey and a female horse have a baby. Mr Bowen says it is a “dorse”. He is wrong. What is it called?',
            qFr: 'Un âne et une jument ont un petit. M. Bowen dit que c’est un « dorse ». Il a tort. Comment s’appelle-t-il ?',
            aImage: {
              src: IMAGES.sci43Mule,
              alt: 'A young mule with long ears, standing on a dusty path.',
              altFr: 'Un jeune mulet aux longues oreilles, debout sur un chemin poussiéreux.',
            },
            a: 'A mule. Its name is not a mix of the two words. Mules are infertile: they cannot have babies of their own.',
            aFr: 'Un mulet (mule). Son nom n’est pas un mélange des deux mots. Les mulets sont stériles (infertile) : ils ne peuvent pas avoir de petits.',
          },
        ],
      },
      {
        name: 'Science English',
        nameFr: 'L’anglais des sciences',
        clues: [
          {
            value: 100,
            q: 'What does “offspring” mean?',
            qFr: 'Que veut dire « offspring » ?',
            a: 'Children: the young that an organism makes. Kittens are a cat’s offspring.',
            aFr: 'Les petits d’un organisme, ses enfants. Les chatons sont les « offspring » d’une chatte.',
          },
          {
            value: 200,
            q: '“Mr Bowen is sensitive: he cries at sad films.” “A plant is sensitive to light.” Which one is the science meaning?',
            qFr: '« Mr Bowen is sensitive: he cries at sad films. » « A plant is sensitive to light. » Laquelle a le sens scientifique ?',
            a: 'The plant. In science, sensitive means it notices changes around it. Crying at films is everyday English.',
            aFr: 'La plante. En sciences, « sensitive » veut dire remarquer les changements autour de soi. Pleurer devant un film, c’est l’anglais de tous les jours.',
          },
          {
            value: 300,
            q: '“The virus makes copies of itself.” What is wrong with this sentence? What is the science word?',
            qFr: '« The virus makes copies of itself. » Qu’est-ce qui ne va pas dans cette phrase ? Quel est le mot scientifique ?',
            a: 'The virus makes the CELL build the copies. The science word is replication.',
            aFr: 'Le virus fait fabriquer les copies par la CELLULE. Le mot scientifique est « replication » (la réplication).',
          },
          {
            value: 400,
            q: '“Fertile” and “infertile”: what does each one mean? What does “in-” do to the word?',
            qFr: '« Fertile » et « infertile » : que veut dire chacun ? Que fait « in- » au mot ?',
            a: 'Fertile: can produce offspring. Infertile: cannot. “In-” means “not”, like “incorrect”.',
            aFr: 'Fertile : peut avoir des petits. Infertile : ne peut pas. « In- » veut dire « pas », comme dans « incorrect ».',
          },
          {
            value: 500,
            q: 'Mr Bowen wants a specimen of a tiger for the classroom. What is a specimen? Does he need the whole tiger?',
            qFr: 'M. Bowen veut un spécimen (specimen) de tigre pour la classe. Qu’est-ce qu’un spécimen ? A-t-il besoin du tigre entier ?',
            a: 'A specimen is a sample of an organism. One hair is enough. Please do not bring the whole tiger.',
            aFr: 'Un spécimen, c’est un échantillon (a sample) d’un organisme. Un poil suffit. Merci de ne pas apporter le tigre entier.',
          },
        ],
      },
    ],
  },

  // ── 13 · TEENS ────────────────────────────────────────────────────────────
  // The hardest board. IGCSE chemistry and physics that need a calculation or
  // a reason, then three rounds anyone can win: word history, pop songs, and
  // big numbers. The trivia rounds do the same job as Board 4's: they stop the
  // two strongest scientists winning alone.
  //
  // Every pop clue is a FACT about a song — a record, a year, a reason — and
  // never a line from it. Lyrics are copyrighted, and this site is public.
  //
  // Several clues lean on each other on purpose: Word History 400 (oxygen, the
  // "acid-maker") answers itself with HCl from chemistry; Big Numbers 400 sets
  // up the powers of 2 that Big Numbers 500 needs.
  {
    id: 'teens',
    title: 'Teens · Science, Words, Songs & Numbers',
    titleVn: 'Thiếu niên · Khoa học, Từ ngữ, Bài hát & Con số',
    subtitle: 'IGCSE chemistry and physics, word history, pop songs, big numbers',
    subtitleVn: 'Hoá học và vật lí IGCSE, lịch sử từ ngữ, nhạc pop, những con số lớn',
    icon: 'Rocket',
    accent: '#4338ca',
    categories: [
      {
        name: 'Chemistry',
        nameVn: 'Hoá học',
        clues: [
          {
            value: 100,
            q: 'You hold a lit splint at the mouth of a test tube. It makes a squeaky pop. Which gas is in the tube?',
            qVn: 'Em đưa que đóm đang cháy vào miệng ống nghiệm. Có một tiếng "pop" nhỏ. Trong ống là khí gì?',
            a: 'Hydrogen. The pop is hydrogen burning with oxygen to make water.',
            aVn: 'Hiđro. Tiếng "pop" là hiđro cháy với oxi tạo thành nước.',
          },
          {
            value: 200,
            q: 'How many protons, neutrons and electrons are in this atom?',
            qVn: 'Nguyên tử này có bao nhiêu proton, nơtron và electron?',
            qImage: { src: IMAGES.teenNuclideNa, alt: 'Sodium in nuclide notation: mass number 23, atomic number 11.', altVn: 'Natri viết theo kí hiệu hạt nhân: số khối 23, số hiệu nguyên tử 11.' },
            a: '11 protons and 11 electrons. 23 − 11 = 12 neutrons.',
            aVn: '11 proton và 11 electron. 23 − 11 = 12 nơtron.',
            aImage: { src: IMAGES.sodium, alt: 'Freshly cut chunks of sodium metal.', altVn: 'Những miếng kim loại natri vừa được cắt.' },
          },
          {
            value: 300,
            q: 'Balance this equation. It happens inside a blast furnace.',
            qVn: 'Hãy cân bằng phương trình này. Phản ứng xảy ra trong lò cao.',
            qImage: { src: IMAGES.teenEquationIron, alt: 'Fe₂O₃ plus ? CO gives ? Fe plus ? CO₂.', altVn: 'Fe₂O₃ cộng ? CO tạo ra ? Fe cộng ? CO₂.' },
            a: 'Fe₂O₃ + 3CO → 2Fe + 3CO₂. Check: 2 Fe, 3 C and 6 O on each side.',
            aVn: 'Fe₂O₃ + 3CO → 2Fe + 3CO₂. Kiểm tra: mỗi vế có 2 Fe, 3 C và 6 O.',
          },
          {
            value: 400,
            q: 'Ha Long Bay is limestone, CaCO₃. What is its Mr? How many moles are in 25 g? (Ca = 40, C = 12, O = 16)',
            qVn: 'Vịnh Hạ Long là đá vôi, CaCO₃. Mr của nó là bao nhiêu? 25 g có bao nhiêu mol? (Ca = 40, C = 12, O = 16)',
            qImage: { src: IMAGES.teenHalong, alt: 'Limestone towers rising out of the sea in Ha Long Bay.', altVn: 'Những đảo đá vôi nhô lên khỏi mặt biển ở vịnh Hạ Long.' },
            a: 'Mr = 40 + 12 + (3 × 16) = 100. Moles = 25 ÷ 100 = 0.25 mol.',
            aVn: 'Mr = 40 + 12 + (3 × 16) = 100. Số mol = 25 ÷ 100 = 0,25 mol.',
          },
          {
            value: 500,
            q: 'Electrolysis of concentrated sodium chloride solution. What forms at the anode (+)? At the cathode (−)? What is left in the solution?',
            qVn: 'Điện phân dung dịch natri clorua đặc. Chất gì tạo thành ở cực dương (+)? Ở cực âm (−)? Chất gì còn lại trong dung dịch?',
            a: 'Anode: chlorine. Cathode: hydrogen — not sodium, because sodium is more reactive than hydrogen. Left in the solution: sodium hydroxide.',
            aVn: 'Cực dương: clo. Cực âm: hiđro — không phải natri, vì natri hoạt động mạnh hơn hiđro. Còn lại trong dung dịch: natri hiđroxit.',
            aImage: { src: IMAGES.chlorine, alt: 'Yellow-green chlorine gas in a glass jar.', altVn: 'Khí clo màu vàng lục trong một bình thuỷ tinh.' },
          },
        ],
      },
      {
        name: 'Physics',
        nameVn: 'Vật lí',
        clues: [
          {
            value: 100,
            q: 'On the Moon, an astronaut drops a hammer and a feather at the same time. Which one lands first?',
            qVn: 'Trên Mặt Trăng, một phi hành gia thả một cái búa và một chiếc lông vũ cùng lúc. Vật nào chạm đất trước?',
            qImage: { src: IMAGES.moon, alt: 'The full moon.', altVn: 'Mặt Trăng tròn.' },
            a: 'Neither — they land together. There is no air on the Moon, so there is no air resistance. (David Scott tried it on Apollo 15, in 1971.)',
            aVn: 'Không vật nào — chúng chạm đất cùng lúc. Mặt Trăng không có không khí nên không có lực cản không khí. (David Scott đã thử trong chuyến Apollo 15, năm 1971.)',
          },
          {
            value: 200,
            q: 'Mr Bowen rides his motorbike 12 km in 20 minutes. What is his average speed in km/h?',
            qVn: 'Thầy Bowen đi xe máy 12 km trong 20 phút. Tốc độ trung bình của thầy là bao nhiêu km/h?',
            a: '36 km/h. 20 minutes is a third of an hour, so 12 × 3 = 36.',
            aVn: '36 km/h. 20 phút là một phần ba giờ, nên 12 × 3 = 36.',
          },
          {
            value: 300,
            q: 'What is the total resistance? What current flows from the 12 V supply?',
            qVn: 'Điện trở tổng là bao nhiêu? Dòng điện chạy ra từ nguồn 12 V là bao nhiêu?',
            qImage: { src: IMAGES.teenCircuitParallel, alt: 'A 12 V cell with two 6 ohm resistors in parallel.', altVn: 'Một nguồn 12 V với hai điện trở 6 ôm mắc song song.' },
            a: '3 Ω — in parallel, the total is LESS than either resistor. Current: I = V ÷ R = 12 ÷ 3 = 4 A.',
            aVn: '3 Ω — khi mắc song song, điện trở tổng NHỎ HƠN mỗi điện trở. Dòng điện: I = V ÷ R = 12 ÷ 3 = 4 A.',
          },
          {
            value: 400,
            q: 'A radioactive sample has a half-life of 8 days. You start with 160 g. How much is left after 24 days?',
            qVn: 'Một mẫu chất phóng xạ có chu kì bán rã 8 ngày. Ban đầu có 160 g. Sau 24 ngày còn lại bao nhiêu?',
            a: '20 g. 24 days is 3 half-lives: 160 → 80 → 40 → 20.',
            aVn: '20 g. 24 ngày là 3 chu kì bán rã: 160 → 80 → 40 → 20.',
          },
          {
            value: 500,
            q: 'Light from the Sun takes about 500 seconds to reach us. Light travels at 3 × 10⁸ m/s. How far away is the Sun?',
            qVn: 'Ánh sáng từ Mặt Trời mất khoảng 500 giây để đến chỗ chúng ta. Ánh sáng đi với tốc độ 3 × 10⁸ m/s. Mặt Trời cách chúng ta bao xa?',
            qImage: { src: IMAGES.sun, alt: 'The sun.', altVn: 'Mặt Trời.' },
            a: '1.5 × 10¹¹ m — 150 million km. Distance = speed × time = 3 × 10⁸ × 500.',
            aVn: '1,5 × 10¹¹ m — 150 triệu km. Quãng đường = tốc độ × thời gian = 3 × 10⁸ × 500.',
          },
        ],
      },
      {
        name: 'Word History',
        nameVn: 'Lịch sử từ ngữ',
        clues: [
          {
            value: 100,
            q: 'The sandwich is named after a person. Who?',
            qVn: 'Bánh sandwich được đặt theo tên một người. Người đó là ai?',
            a: 'The Earl of Sandwich, an English lord in the 1700s. The story is that he ate meat between bread so he did not have to stop playing cards.',
            aVn: 'Bá tước xứ Sandwich, một quý tộc Anh ở thế kỉ 18. Chuyện kể rằng ông ăn thịt kẹp giữa hai lát bánh mì để khỏi phải dừng chơi bài.',
          },
          {
            value: 200,
            q: '"Robot" first appeared in a Czech play in 1920. The Czech word "robota" means…?',
            qVn: 'Từ "robot" xuất hiện lần đầu trong một vở kịch Séc năm 1920. Từ tiếng Séc "robota" nghĩa là…?',
            a: 'Forced work — hard work you are made to do. The play was R.U.R., by Karel Čapek.',
            aVn: 'Lao động cưỡng bức — việc nặng nhọc mà mình bị bắt phải làm. Vở kịch là R.U.R. của Karel Čapek.',
          },
          {
            value: 300,
            q: '"Quarantine" comes from the Italian "quaranta". What number is that — and why?',
            qVn: '"Quarantine" (cách li) đến từ tiếng Ý "quaranta". Đó là số mấy — và tại sao?',
            a: 'Forty. During the plague, ships arriving in Venice had to wait forty days before anyone could come ashore.',
            aVn: 'Bốn mươi. Trong thời dịch hạch, tàu đến Venice phải chờ bốn mươi ngày rồi mới có người được lên bờ.',
          },
          {
            value: 400,
            q: 'Hydrogen means "water-maker". Oxygen means "acid-maker". Which name is a mistake — and why?',
            qVn: 'Hydrogen nghĩa là "chất tạo ra nước". Oxygen nghĩa là "chất tạo ra axit". Tên nào là một sai lầm — và tại sao?',
            a: 'Oxygen. Lavoisier thought every acid contains oxygen. Hydrochloric acid, HCl, has none.',
            aVn: 'Oxygen. Lavoisier nghĩ rằng axit nào cũng chứa oxi. Axit clohiđric, HCl, không có oxi.',
          },
          {
            value: 500,
            q: 'Most languages call it "tea" or "cha". Vietnamese says "trà" or "chè". Why are there two words?',
            qVn: 'Hầu hết các ngôn ngữ gọi nó là "tea" hoặc "cha". Tiếng Việt nói "trà" hoặc "chè". Tại sao lại có hai từ?',
            a: 'Both come from Chinese. "Te" is from Fujian, where Dutch ships bought tea, so it spread by SEA to most of Europe. "Cha" spread over LAND — along the Silk Road, and to China\'s neighbours, like Vietnam.',
            aVn: 'Cả hai đều từ tiếng Trung. "Te" là từ Phúc Kiến, nơi tàu Hà Lan mua trà, nên nó lan theo đường BIỂN tới hầu hết châu Âu. "Cha" lan theo đường BỘ — dọc Con đường Tơ lụa, và tới các nước láng giềng của Trung Quốc, như Việt Nam.',
          },
        ],
      },
      {
        name: 'Pop Songs',
        nameVn: 'Nhạc pop',
        clues: [
          {
            value: 100,
            q: 'In 2020, which K-pop group became the first all-Korean act to reach number one in the US, with "Dynamite"?',
            qVn: 'Năm 2020, nhóm K-pop nào trở thành nghệ sĩ toàn người Hàn đầu tiên đứng số một ở Mỹ, với bài "Dynamite"?',
            a: 'BTS. "Dynamite" went straight to number one on the Billboard Hot 100.',
            aVn: 'BTS. "Dynamite" lên thẳng vị trí số một trên Billboard Hot 100.',
          },
          {
            value: 200,
            q: 'Which was the first YouTube video to pass 10 billion views?',
            qVn: 'Video YouTube nào là video đầu tiên vượt 10 tỉ lượt xem?',
            a: '"Baby Shark Dance", by Pinkfong from South Korea, in 2022. Yes, really.',
            aVn: '"Baby Shark Dance" của Pinkfong (Hàn Quốc), năm 2022. Đúng vậy, thật đấy.',
          },
          {
            value: 300,
            q: 'In 2020, which 18-year-old won all four of the biggest Grammy awards in one night — the youngest person ever to do it?',
            qVn: 'Năm 2020, ca sĩ 18 tuổi nào đã giành cả bốn giải Grammy lớn nhất trong một đêm — người trẻ nhất từng làm được?',
            a: 'Billie Eilish. She writes her songs with her brother, Finneas.',
            aVn: 'Billie Eilish. Cô sáng tác cùng anh trai mình, Finneas.',
          },
          {
            value: 400,
            q: 'Mariah Carey\'s "All I Want for Christmas Is You" came out in 1994. In which year did it first reach number one in the US?',
            qVn: 'Bài "All I Want for Christmas Is You" của Mariah Carey ra mắt năm 1994. Năm nào nó lần đầu đứng số một ở Mỹ?',
            a: '2019 — twenty-five years later. It climbs back up the charts every December.',
            aVn: 'Năm 2019 — hai mươi lăm năm sau. Tháng Mười Hai nào nó cũng leo lại bảng xếp hạng.',
          },
          {
            value: 500,
            q: 'Why did Taylor Swift start re-recording her old albums as "Taylor\'s Version"?',
            qVn: 'Tại sao Taylor Swift bắt đầu thu âm lại các album cũ của mình dưới tên "Taylor\'s Version"?',
            a: 'She did not own the master recordings of her first six albums. A new recording is a new master — and she owns it. (In 2025 she bought the old ones back too.)',
            aVn: 'Cô không sở hữu bản thu gốc (master) của sáu album đầu tiên. Một bản thu mới là một bản master mới — và cô sở hữu nó. (Năm 2025 cô cũng đã mua lại được các bản cũ.)',
          },
        ],
      },
      {
        name: 'Big Numbers',
        nameVn: 'Những con số lớn',
        clues: [
          {
            value: 100,
            q: 'How many zeros are in a googol?',
            qVn: 'Một googol có bao nhiêu chữ số 0?',
            a: '100. A googol is 10¹⁰⁰. The name Google is a play on it.',
            aVn: '100. Một googol là 10¹⁰⁰. Cái tên Google là một cách chơi chữ từ nó.',
          },
          {
            value: 200,
            q: 'Which is bigger?',
            qVn: 'Số nào lớn hơn?',
            qImage: { src: IMAGES.teenPowers, alt: '2 to the power 10, or 10 to the power 3.', altVn: '2 mũ 10, hay 10 mũ 3.' },
            a: '2¹⁰ = 1024 and 10³ = 1000, so 2¹⁰ is bigger — just.',
            aVn: '2¹⁰ = 1024 và 10³ = 1000, nên 2¹⁰ lớn hơn — chỉ một chút.',
          },
          {
            value: 300,
            q: 'You are 15 years old. Roughly how old are you in seconds?',
            qVn: 'Em 15 tuổi. Tính ra giây thì em khoảng bao nhiêu giây tuổi?',
            a: 'About 470 million seconds. 15 × 365 × 24 × 60 × 60 ≈ 473 000 000.',
            aVn: 'Khoảng 470 triệu giây. 15 × 365 × 24 × 60 × 60 ≈ 473 000 000.',
          },
          {
            value: 400,
            q: '1 grain of rice on the first square, 2 on the next, then 4, 8, 16… How many grains on square 64? Answer as a power of 2.',
            qVn: '1 hạt gạo ở ô đầu tiên, 2 hạt ở ô tiếp theo, rồi 4, 8, 16… Ô thứ 64 có bao nhiêu hạt? Trả lời dưới dạng lũy thừa của 2.',
            qImage: { src: IMAGES.teenChessboard, alt: 'A chessboard with 1, 2, 4, 8 and 16 on the first squares, and a question mark on the last square.', altVn: 'Một bàn cờ vua có 1, 2, 4, 8 và 16 ở các ô đầu, và dấu hỏi ở ô cuối cùng.' },
            a: '2⁶³, not 2⁶⁴ — square 1 is 2⁰. That is about 9 × 10¹⁸ grains: centuries of the whole world\'s rice harvest, on one square.',
            aVn: '2⁶³, không phải 2⁶⁴ — ô 1 là 2⁰. Khoảng 9 × 10¹⁸ hạt: bằng lượng gạo cả thế giới thu hoạch trong nhiều thế kỉ, chỉ trên một ô.',
          },
          {
            value: 500,
            q: 'In 2014, "Gangnam Style" broke YouTube\'s view counter. It could not count past this number. Why this number?',
            qVn: 'Năm 2014, "Gangnam Style" đã làm hỏng bộ đếm lượt xem của YouTube. Nó không thể đếm quá con số này. Tại sao lại là con số này?',
            qImage: { src: IMAGES.teenCounter, alt: 'A view counter showing 2,147,483,647 views.', altVn: 'Bộ đếm hiển thị 2 147 483 647 lượt xem.' },
            a: 'It is 2³¹ − 1: the biggest number a 32-bit signed integer can hold. YouTube moved to 64 bits.',
            aVn: 'Đó là 2³¹ − 1: số lớn nhất mà một số nguyên có dấu 32 bit chứa được. YouTube đã chuyển sang 64 bit.',
          },
        ],
      },
    ],
  },

  // ── 14 · TEENS 2 ──────────────────────────────────────────────────────────
  // Trivia only, no syllabus: Myth or Fact, Celebrity Couples, Famous Covers,
  // Geography and Accidental Inventions. Every answer still wants a reason.
  //
  // CELEBRITY COUPLES GO STALE. Each clue is pinned to an event and a year
  // ("In 2025, … was seen on dates with …"), never "is dating", so it stays
  // true whatever happens to the couple. Keep it that way when editing, and
  // keep it to confirmed, public, family-friendly facts.
  //
  // FAMOUS COVERS name songs and tell their history; they never quote a line.
  {
    id: 'teens-2',
    title: 'Teens 2 · Myths, Couples, Covers & Maps',
    titleVn: 'Thiếu niên 2 · Lầm tưởng, Cặp đôi, Bản cover & Bản đồ',
    subtitle: 'Myth or fact, celebrity couples, famous covers, geography, accidental inventions',
    subtitleVn: 'Lầm tưởng hay sự thật, cặp đôi nổi tiếng, bản cover, địa lí, phát minh tình cờ',
    icon: 'Globe',
    accent: '#ea580c',
    categories: [
      {
        name: 'Myth or Fact?',
        nameVn: 'Lầm tưởng hay sự thật?',
        clues: [
          {
            value: 100,
            q: 'Myth or fact? A goldfish can only remember things for three seconds.',
            qVn: 'Lầm tưởng hay sự thật? Cá vàng chỉ nhớ được mọi thứ trong ba giây.',
            a: 'Myth. Goldfish can be trained, and they remember what they learn for months.',
            aVn: 'Lầm tưởng. Cá vàng có thể được huấn luyện, và chúng nhớ những gì đã học trong nhiều tháng.',
          },
          {
            value: 200,
            q: 'Myth or fact? A banana is a berry, but a strawberry is not.',
            qVn: 'Lầm tưởng hay sự thật? Quả chuối là một loại quả mọng (berry), còn quả dâu tây thì không.',
            a: 'Fact — to a scientist. A true berry keeps its seeds inside. A strawberry has its seeds on the outside.',
            aVn: 'Sự thật — theo các nhà khoa học. Quả mọng thật sự có hạt ở bên trong. Dâu tây lại có hạt ở bên ngoài.',
            aImage: { src: IMAGES.banana, alt: 'A ripe yellow banana.', altVn: 'Một quả chuối chín vàng.' },
          },
          {
            value: 300,
            q: 'Myth or fact? Lightning never strikes the same place twice.',
            qVn: 'Lầm tưởng hay sự thật? Sét không bao giờ đánh hai lần vào cùng một chỗ.',
            a: 'Myth. The Empire State Building in New York is hit more than 20 times a year.',
            aVn: 'Lầm tưởng. Toà nhà Empire State ở New York bị sét đánh hơn 20 lần mỗi năm.',
          },
          {
            value: 400,
            q: 'Myth or fact? On Venus, one day is longer than one year.',
            qVn: 'Lầm tưởng hay sự thật? Trên sao Kim, một ngày dài hơn một năm.',
            a: 'Fact. Venus takes 243 Earth days to spin round once, but only 225 Earth days to go round the Sun.',
            aVn: 'Sự thật. Sao Kim mất 243 ngày Trái Đất để tự quay một vòng, nhưng chỉ mất 225 ngày Trái Đất để quay quanh Mặt Trời.',
          },
          {
            value: 500,
            q: 'Myth or fact? Eating lots of carrots lets you see in the dark. Where did the idea come from?',
            qVn: 'Lầm tưởng hay sự thật? Ăn nhiều cà rốt giúp em nhìn thấy trong bóng tối. Ý tưởng này từ đâu ra?',
            qImage: { src: IMAGES.carrot, alt: 'Fresh carrots.', altVn: 'Những củ cà rốt tươi.' },
            a: 'Myth. The story goes that in World War II, Britain said its pilots ate carrots, to explain how they found enemy planes at night. The real secret was radar.',
            aVn: 'Lầm tưởng. Chuyện kể rằng trong Thế chiến II, nước Anh nói phi công của họ ăn cà rốt, để giải thích vì sao họ tìm thấy máy bay địch vào ban đêm. Bí mật thật sự là ra-đa.',
          },
        ],
      },
      {
        name: 'Celebrity Couples',
        nameVn: 'Cặp đôi nổi tiếng',
        clues: [
          {
            value: 100,
            q: 'In 2025, Taylor Swift got engaged to Travis Kelce. What sport does he play?',
            qVn: 'Năm 2025, Taylor Swift đính hôn với Travis Kelce. Anh ấy chơi môn thể thao nào?',
            a: 'American football. He plays for the Kansas City Chiefs.',
            aVn: 'Bóng bầu dục Mỹ. Anh chơi cho đội Kansas City Chiefs.',
          },
          {
            value: 200,
            q: 'In 2025, which pop star was seen on dates with Justin Trudeau, the former Prime Minister of Canada?',
            qVn: 'Năm 2025, ngôi sao nhạc pop nào được nhìn thấy đi hẹn hò với Justin Trudeau, cựu Thủ tướng Canada?',
            a: 'Katy Perry.',
            aVn: 'Katy Perry.',
          },
          {
            value: 300,
            q: 'Zendaya and Tom Holland met while making which films?',
            qVn: 'Zendaya và Tom Holland quen nhau khi đóng loạt phim nào?',
            a: 'The Spider-Man films, starting with "Spider-Man: Homecoming" (2017). They got engaged in 2025.',
            aVn: 'Loạt phim Người Nhện, bắt đầu từ "Spider-Man: Homecoming" (2017). Họ đính hôn năm 2025.',
          },
          {
            value: 400,
            q: 'Lionel Messi met his wife, Antonela, when he was five years old. In which city?',
            qVn: 'Lionel Messi quen vợ mình, Antonela, khi anh mới năm tuổi. Ở thành phố nào?',
            a: 'Rosario, in Argentina — his home town. She is the cousin of his childhood best friend.',
            aVn: 'Rosario, ở Argentina — quê nhà của anh. Cô là em họ của người bạn thân thời thơ ấu của anh.',
          },
          {
            value: 500,
            q: 'In 1989, Barack Obama started a summer job at a law firm in Chicago. What was Michelle Robinson\'s job — for him?',
            qVn: 'Năm 1989, Barack Obama bắt đầu làm việc mùa hè ở một công ti luật tại Chicago. Michelle Robinson có nhiệm vụ gì — đối với anh?',
            a: 'She was his mentor. The firm asked her to look after the new student. She said no to a date at first.',
            aVn: 'Bà là người hướng dẫn của ông. Công ti giao cho bà kèm cặp cậu sinh viên mới. Lúc đầu bà còn từ chối đi hẹn hò.',
          },
        ],
      },
      {
        name: 'Famous Covers',
        nameVn: 'Những bản cover nổi tiếng',
        clues: [
          {
            value: 100,
            q: '"I Will Always Love You" was a huge hit for Whitney Houston in 1992. Who wrote it and sang it first?',
            qVn: '"I Will Always Love You" là bản hit lớn của Whitney Houston năm 1992. Ai đã sáng tác và hát nó đầu tiên?',
            a: 'Dolly Parton, in 1974. She once refused to let Elvis record it, because his manager wanted half of the rights.',
            aVn: 'Dolly Parton, năm 1974. Bà từng không cho Elvis thu âm bài này, vì quản lí của Elvis đòi một nửa bản quyền.',
          },
          {
            value: 200,
            q: '"Shrek" made "Hallelujah" famous with a new generation. Who wrote it, in 1984?',
            qVn: 'Phim "Shrek" làm bài "Hallelujah" nổi tiếng với một thế hệ mới. Ai đã sáng tác nó, năm 1984?',
            a: 'Leonard Cohen, a Canadian singer and poet. The film uses a cover by John Cale; Jeff Buckley\'s 1994 cover is the most famous.',
            aVn: 'Leonard Cohen, một ca sĩ và nhà thơ người Canada. Bộ phim dùng bản cover của John Cale; bản cover năm 1994 của Jeff Buckley là nổi tiếng nhất.',
          },
          {
            value: 300,
            q: 'Aretha Franklin\'s "Respect" (1967) is a cover. Who sang it first?',
            qVn: 'Bài "Respect" (1967) của Aretha Franklin là một bản cover. Ai hát nó đầu tiên?',
            a: 'Otis Redding, in 1965. Aretha changed it so that a woman is the one asking for respect — and her version became the famous one.',
            aVn: 'Otis Redding, năm 1965. Aretha sửa lại để người đòi được tôn trọng là một người phụ nữ — và bản của bà trở thành bản nổi tiếng.',
          },
          {
            value: 400,
            q: 'Elvis Presley\'s "Can\'t Help Falling in Love" (1961) borrowed its tune. From where?',
            qVn: 'Bài "Can\'t Help Falling in Love" (1961) của Elvis Presley mượn giai điệu. Từ đâu?',
            a: 'From a French love song written in 1784, "Plaisir d\'amour".',
            aVn: 'Từ một bản tình ca Pháp viết năm 1784, "Plaisir d\'amour".',
          },
          {
            value: 500,
            q: 'In 2023, Luke Combs took a cover of "Fast Car" up the country charts. Who wrote the song — and what record did she set?',
            qVn: 'Năm 2023, Luke Combs đưa bản cover "Fast Car" lên các bảng xếp hạng nhạc đồng quê. Ai đã sáng tác bài hát — và bà đã lập kỉ lục gì?',
            a: 'Tracy Chapman, in 1988. She became the first Black songwriter to win Song of the Year at the Country Music Association Awards.',
            aVn: 'Tracy Chapman, năm 1988. Bà trở thành nhạc sĩ da màu đầu tiên đoạt giải Bài hát của năm tại Giải thưởng Hiệp hội Nhạc đồng quê (CMA).',
          },
        ],
      },
      {
        name: 'Geography',
        nameVn: 'Địa lí',
        clues: [
          {
            value: 100,
            q: 'What is the capital of Australia?',
            qVn: 'Thủ đô của Úc là gì?',
            a: 'Canberra — not Sydney. Sydney and Melbourne both wanted to be the capital, so a new city was built between them.',
            aVn: 'Canberra — không phải Sydney. Sydney và Melbourne đều muốn làm thủ đô, nên người ta xây một thành phố mới ở giữa hai nơi.',
          },
          {
            value: 200,
            q: 'Which is the only landlocked country in Southeast Asia?',
            qVn: 'Nước nào là nước duy nhất không giáp biển ở Đông Nam Á?',
            a: 'Laos. It has no coast — and its border with Vietnam is Vietnam\'s longest land border.',
            aVn: 'Lào. Lào không có bờ biển — và biên giới với Lào là đường biên giới trên đất liền dài nhất của Việt Nam.',
          },
          {
            value: 300,
            q: 'Which country has the most people in the world?',
            qVn: 'Nước nào đông dân nhất thế giới?',
            a: 'India. It passed China in 2023. Each has more than 1.4 billion people.',
            aVn: 'Ấn Độ. Ấn Độ vượt Trung Quốc năm 2023. Mỗi nước có hơn 1,4 tỉ người.',
          },
          {
            value: 400,
            q: 'The Mekong flows through six countries. Name them, from the mountains to the sea.',
            qVn: 'Sông Mê Kông chảy qua sáu nước. Hãy kể tên, từ vùng núi ra đến biển.',
            a: 'China, Myanmar, Laos, Thailand, Cambodia, Vietnam.',
            aVn: 'Trung Quốc, Myanmar, Lào, Thái Lan, Campuchia, Việt Nam.',
          },
          {
            value: 500,
            q: 'Russia and the USA are less than 4 km apart. Where? And why is one island "Tomorrow Island" and the other "Yesterday Island"?',
            qVn: 'Nga và Mỹ cách nhau chưa đến 4 km. Ở đâu? Và tại sao một hòn đảo được gọi là "Đảo Ngày Mai", còn hòn kia là "Đảo Hôm Qua"?',
            a: 'The Diomede Islands, in the Bering Strait. The International Date Line runs between them, so the Russian island is almost a day ahead of the American one.',
            aVn: 'Quần đảo Diomede, ở eo biển Bering. Đường đổi ngày quốc tế chạy giữa hai đảo, nên đảo của Nga đi trước đảo của Mỹ gần một ngày.',
            aImage: { src: IMAGES.teenDiomede, alt: 'A map, not to scale: Big Diomede (Russia) and Little Diomede (USA), 3.8 km apart, with the International Date Line between them.', altVn: 'Bản đồ minh hoạ, không theo tỉ lệ: Big Diomede (Nga) và Little Diomede (Mỹ), cách nhau 3,8 km, đường đổi ngày quốc tế chạy ở giữa.' },
          },
        ],
      },
      {
        name: 'Accidental Inventions',
        nameVn: 'Phát minh tình cờ',
        clues: [
          {
            value: 100,
            q: 'In 1928, Alexander Fleming came back from holiday. Mould on a dish had killed the bacteria around it. What medicine did he discover?',
            qVn: 'Năm 1928, Alexander Fleming đi nghỉ về. Nấm mốc trên một chiếc đĩa đã giết chết vi khuẩn xung quanh nó. Ông đã phát hiện ra loại thuốc gì?',
            a: 'Penicillin — the first antibiotic.',
            aVn: 'Penicillin — loại thuốc kháng sinh đầu tiên.',
          },
          {
            value: 200,
            q: 'In 1945, Percy Spencer was working on radar. The chocolate bar in his pocket melted. What did he invent?',
            qVn: 'Năm 1945, Percy Spencer đang nghiên cứu ra-đa. Thanh sô-cô-la trong túi ông bị chảy. Ông đã phát minh ra cái gì?',
            a: 'The microwave oven.',
            aVn: 'Lò vi sóng.',
            aImage: { src: IMAGES.microwave, alt: 'A microwave oven.', altVn: 'Một chiếc lò vi sóng.' },
          },
          {
            value: 300,
            q: 'In 1968, a scientist tried to make a very strong glue. He made a very weak one instead. What did it become?',
            qVn: 'Năm 1968, một nhà khoa học cố làm ra một loại keo thật chắc. Nhưng ông lại làm ra một loại keo rất yếu. Nó đã trở thành cái gì?',
            a: 'The Post-it Note. Another scientist at his company used it for bookmarks in his songbook that would not fall out.',
            aVn: 'Giấy nhớ Post-it. Một nhà khoa học khác ở cùng công ti dùng nó làm dấu trang cho sách hát mà không bị rơi ra.',
          },
          {
            value: 400,
            q: 'After a walk in the Alps, George de Mestral found burrs (sticky seeds) stuck in his dog\'s fur. What did he invent?',
            qVn: 'Sau một chuyến đi dạo ở dãy Alps, George de Mestral thấy những quả ké (hạt dính) bám đầy lông chó của mình. Ông đã phát minh ra cái gì?',
            a: 'Velcro. The name comes from the French "velours" (velvet) and "crochet" (hook).',
            aVn: 'Khoá dán Velcro. Cái tên đến từ tiếng Pháp "velours" (nhung) và "crochet" (móc).',
          },
          {
            value: 500,
            q: 'Play-Doh was first sold in the 1930s for a completely different job. What was it?',
            qVn: 'Play-Doh (đất nặn) lúc đầu được bán vào những năm 1930 cho một việc hoàn toàn khác. Đó là việc gì?',
            a: 'Cleaning wallpaper. It rubbed off black soot from coal fires. When homes stopped burning coal, the company sold it as a toy.',
            aVn: 'Lau giấy dán tường. Nó lau sạch muội đen từ lò đốt than. Khi các gia đình không còn đốt than nữa, công ti bán nó làm đồ chơi.',
          },
        ],
      },
    ],
  },
]
