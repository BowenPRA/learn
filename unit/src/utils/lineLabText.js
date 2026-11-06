// src/utils/lineLabText.js
//
// The words of the Line Lab: each step's instruction and sub-line, and the
// reason a wrong click is wrong — in English and Vietnamese. Shared by the
// task (src/tasks/LineLab.jsx) and the Notes `line` activity
// (src/components/notes/LineActivity.jsx), so the two never describe the same
// step differently. Strings carry $KaTeX$ and **bold** for parseInlineText.

import { frPt, numPt, ptTex, frTex, onLine } from './lineLab.js';
import { fr, neg, div, sub, add, mul, toNumber } from './linearEquation.js';

const pick = (lang, en, vn) => (lang === 'vn' ? (vn ?? en) : en);

/** The line's printed name in instructions: its equation when it was given one, else "line AB". */
function lineTex(model, name, vn = false) {
  const ln = model.lines[name];
  if (!ln) return name;
  // A line the item gave an equation for is named by it; a line through two
  // points the student can SEE labelled is "line AB"; a line built from a
  // point and a slope is "the line through P". Anything else is just "the
  // line" — its letter in the item is bookkeeping, not something on screen.
  if (ln.tex) return `$${ln.tex}$`;
  if (ln.through && ln.through.every((p) => model.labelled?.has(p))) return vn ? `đường thẳng $${ln.through.join('')}$` : `line $${ln.through.join('')}$`;
  if (ln.from && model.labelled?.has(ln.from)) return vn ? `đường thẳng qua $${ln.from}$` : `the line through $${ln.from}$`;
  return vn ? 'đường thẳng' : 'the line';
}

/** The move a slope makes, in words: "up 2 for every 3 to the right". Null when undefined. */
function slopeMove(m, vn) {
  if (!m) return null;
  const up = m.n >= 0;
  const r = Math.abs(m.n);
  if (vn) return `${up ? 'lên' : 'xuống'} $${r}$ ứng với mỗi $${m.d}$ sang phải`;
  return `${up ? 'up' : 'down'} $${r}$ for every $${m.d}$ to the right`;
}

/** Instruction + sub-line for a step, in both languages. `say` on the step wins. */
export function stepText(step, model, lang) {
  const vn = lang === 'vn';
  if (step.say) return { title: pick(lang, step.say, step.sayVn), sub: pick(lang, step.sub, step.subVn) || '' };
  const P = (n) => `$${n}${ptTex(model.points[n])}$`;
  const Pn = (n) => `$${n}$`;
  const LT = (n) => lineTex(model, n, vn);
  switch (step.kind) {
    case 'plot': {
      const list = (Array.isArray(step.points) ? step.points : [step.points]).map(P).join(', ');
      return vn
        ? { title: `Đặt điểm ${list}`, sub: 'Số thứ nhất là $x$ (sang ngang), số thứ hai là $y$ (lên hoặc xuống).' }
        : { title: `Plot ${list}`, sub: 'The first number is $x$ (across), the second is $y$ (up or down).' };
    }
    case 'on': {
      const ln = model.lines[step.line];
      const n = step.count || 2;
      if (ln.from && ln.slope !== undefined) {
        const move = ln.slope === null
          ? (vn ? 'đường thẳng đứng: $x$ không đổi' : 'an upright line: $x$ never changes')
          : slopeMove(ln.slope, vn);
        const sl = ln.slope === null ? (vn ? 'không xác định' : 'undefined') : `$${frTex(ln.slope)}$`;
        return vn
          ? { title: `Từ ${Pn(ln.from)}, dùng hệ số góc để đặt ${n} điểm nữa trên đường thẳng`, sub: `Hệ số góc ${sl}: ${move}.` }
          : { title: `From ${Pn(ln.from)}, use the slope to place ${n} more point${n > 1 ? 's' : ''} on the line`, sub: `Slope ${sl}: ${move}.` };
      }
      const why = n >= 3
        ? (vn ? 'Chọn một giá trị $x$, tính $y$. Ba điểm thì một lỗi sai sẽ lộ ra ngay.' : 'Choose an $x$, work out $y$. With three points, a slip shows itself.')
        : (vn ? 'Chọn một giá trị $x$, rồi tính $y$.' : 'Choose an $x$, then work out $y$.');
      return vn
        ? { title: `Đặt ${n} điểm nằm trên ${LT(step.line)}`, sub: why }
        : { title: `Place ${n} point${n > 1 ? 's' : ''} on ${LT(step.line)}`, sub: why };
    }
    case 'xint': return vn
      ? { title: `Bấm vào chỗ ${LT(step.line)} cắt trục $x$`, sub: 'Trên trục $x$ thì $y = 0$.' }
      : { title: `Click where ${LT(step.line)} crosses the $x$-axis`, sub: 'On the $x$-axis, $y = 0$.' };
    case 'yint': return vn
      ? { title: `Bấm vào chỗ ${LT(step.line)} cắt trục $y$`, sub: 'Trên trục $y$ thì $x = 0$.' }
      : { title: `Click where ${LT(step.line)} crosses the $y$-axis`, sub: 'On the $y$-axis, $x = 0$.' };
    case 'at': {
      const which = step.x !== undefined ? `x = ${step.x}` : `y = ${step.y}`;
      return vn
        ? { title: `Bấm vào điểm trên ${LT(step.line)} có $${which}$`, sub: `Thay $${which}$ vào phương trình.` }
        : { title: `Click the point on ${LT(step.line)} where $${which}$`, sub: `Put $${which}$ into the equation.` };
    }
    case 'corner': {
      const A = model.points[step.from];
      const B = model.points[step.to];
      const up = toNumber(B[1]) > toNumber(A[1]);
      return vn
        ? { title: `Bấm vào góc vuông ${Pn(step.name || 'C')} của tam giác`, sub: `Đi ngang từ ${Pn(step.from)} và thẳng ${up ? 'xuống' : 'lên'} từ ${Pn(step.to)} — lấy $x$ của ${Pn(step.to)}, $y$ của ${Pn(step.from)}.` }
        : { title: `Click the right-angle corner ${Pn(step.name || 'C')}`, sub: `Straight across from ${Pn(step.from)}, straight ${up ? 'below' : 'above'} ${Pn(step.to)} — it has ${Pn(step.to)}'s $x$ and ${Pn(step.from)}'s $y$.` };
    }
    case 'midpoint': return vn
      ? { title: `Bấm vào trung điểm ${Pn(step.name || 'M')} của $${step.of.join('')}$`, sub: 'Nửa đường theo chiều ngang và nửa đường theo chiều dọc: lấy trung bình các tọa độ.' }
      : { title: `Click the midpoint ${Pn(step.name || 'M')} of $${step.of.join('')}$`, sub: 'Halfway across and halfway up: average the coordinates.' };
    case 'divide': {
      const [m, n] = step.ratio;
      return vn
        ? { title: `Bấm vào ${Pn(step.name || 'T')} trên $${step.from}${step.to}$ sao cho $${step.from}${step.name || 'T'} : ${step.name || 'T'}${step.to} = ${m} : ${n}$`, sub: `${Pn(step.name || 'T')} nằm ở $\\dfrac{${m}}{${m + n}}$ quãng đường từ ${Pn(step.from)} tới ${Pn(step.to)} — theo cả $x$ LẪN $y$.` }
        : { title: `Click ${Pn(step.name || 'T')} on $${step.from}${step.to}$ with $${step.from}${step.name || 'T'} : ${step.name || 'T'}${step.to} = ${m} : ${n}$`, sub: `${Pn(step.name || 'T')} is $\\dfrac{${m}}{${m + n}}$ of the way from ${Pn(step.from)} to ${Pn(step.to)} — in $x$ AND in $y$.` };
    }
    case 'extend': return vn
      ? { title: `Bấm vào ${Pn(step.name || 'T')} sao cho ${Pn(step.through)} là trung điểm của $${step.from}${step.name || 'T'}$`, sub: `Đi từ ${Pn(step.from)} tới ${Pn(step.through)}, rồi đi thêm đúng bước đó một lần nữa.` }
      : { title: `Click ${Pn(step.name || 'T')} so that ${Pn(step.through)} is the midpoint of $${step.from}${step.name || 'T'}$`, sub: `Go from ${Pn(step.from)} to ${Pn(step.through)}, then take exactly the same step again.` };
    case 'meet': return vn
      ? { title: 'Bấm vào chỗ hai đường thẳng gặp nhau', sub: 'Điểm nằm trên cả hai đường thì thỏa mãn cả hai phương trình.' }
      : { title: 'Click where the two lines meet', sub: 'The point on both lines satisfies both equations.' };
    case 'type': {
      const seg = step.from ? `$${step.from}${step.to}$` : '';
      switch (step.ask) {
        case 'slope': return step.line
          ? (vn ? { title: `Hệ số góc của ${LT(step.line)} là bao nhiêu?`, sub: 'Nhập số nguyên hoặc phân số như $-3/4$.' }
            : { title: `What is the slope of ${LT(step.line)}?`, sub: 'Type a whole number or a fraction like $-3/4$.' })
          : (vn ? { title: `Hệ số góc của đường thẳng qua ${Pn(step.from)} và ${Pn(step.to)}?`, sub: 'Độ thay đổi của $y$ chia cho độ thay đổi của $x$.' }
            : { title: `What is the slope of the line through ${Pn(step.from)} and ${Pn(step.to)}?`, sub: 'Change in $y$ divided by change in $x$.' });
        case 'run': return step.abs
          ? (vn ? { title: `Từ ${Pn(step.from)} sang ${Pn(step.to)} là bao xa theo chiều ngang?`, sub: 'Một độ dài — luôn dương.' }
            : { title: `How far across is it from ${Pn(step.from)} to ${Pn(step.to)}?`, sub: 'A length — never negative.' })
          : (vn ? { title: `Độ thay đổi của $x$ từ ${Pn(step.from)} tới ${Pn(step.to)}?`, sub: 'Sang phải là dương, sang trái là âm.' }
            : { title: `Change in $x$ going from ${Pn(step.from)} to ${Pn(step.to)}?`, sub: 'Right is positive, left is negative.' });
        case 'rise': return step.abs
          ? (vn ? { title: `Từ ${Pn(step.from)} tới ${Pn(step.to)} là bao xa theo chiều dọc?`, sub: 'Một độ dài — luôn dương.' }
            : { title: `How far up or down is it from ${Pn(step.from)} to ${Pn(step.to)}?`, sub: 'A length — never negative.' })
          : (vn ? { title: `Độ thay đổi của $y$ từ ${Pn(step.from)} tới ${Pn(step.to)}?`, sub: 'Lên là dương, xuống là âm.' }
            : { title: `Change in $y$ going from ${Pn(step.from)} to ${Pn(step.to)}?`, sub: 'Up is positive, down is negative.' });
        case 'distance': return vn
          ? { title: `Độ dài ${seg} là bao nhiêu?`, sub: 'Chính xác: $10$, $\\sqrt{117}$ hay $3\\sqrt{13}/2$ — dùng nút √.' }
          : { title: `How long is ${seg}?`, sub: 'Exactly: $10$, $\\sqrt{117}$ or $3\\sqrt{13}/2$ — the √ button types the root sign.' };
        case 'xint': return vn
          ? { title: `Giao điểm của ${LT(step.line)} với trục $x$ có $x$ bằng bao nhiêu?`, sub: 'Cho $y = 0$ rồi giải. Có thể là phân số.' }
          : { title: `Where does ${LT(step.line)} cross the $x$-axis? Give its $x$.`, sub: 'Put $y = 0$ and solve. It may be a fraction.' };
        case 'yint': return vn
          ? { title: `Giao điểm của ${LT(step.line)} với trục $y$ có $y$ bằng bao nhiêu?`, sub: 'Cho $x = 0$ rồi giải. Có thể là phân số.' }
          : { title: `Where does ${LT(step.line)} cross the $y$-axis? Give its $y$.`, sub: 'Put $x = 0$ and solve. It may be a fraction.' };
        case 'xAt': return vn
          ? { title: `Trên ${LT(step.line)}, $x$ bằng bao nhiêu khi $y = ${step.y}$?`, sub: `Thay $y = ${step.y}$ rồi giải tìm $x$.` }
          : { title: `On ${LT(step.line)}, what is $x$ when $y = ${step.y}$?`, sub: `Put $y = ${step.y}$ in and solve for $x$.` };
        case 'yAt': return vn
          ? { title: `Trên ${LT(step.line)}, $y$ bằng bao nhiêu khi $x = ${step.x}$?`, sub: `Thay $x = ${step.x}$ rồi tính $y$.` }
          : { title: `On ${LT(step.line)}, what is $y$ when $x = ${step.x}$?`, sub: `Put $x = ${step.x}$ in and work out $y$.` };
        case 'midpoint': return vn
          ? { title: `Trung điểm của $${step.of.join('')}$ là $(\\,?,\\ ?\\,)$`, sub: 'Trung bình cộng: cộng hai tọa độ rồi chia đôi.' }
          : { title: `The midpoint of $${step.of.join('')}$ is $(\\,?,\\ ?\\,)$`, sub: 'The average: add the two coordinates, then halve.' };
        case 'divide': {
          const [m, n] = step.ratio;
          return vn
            ? { title: `Điểm chia $${step.from}${step.to}$ theo tỉ số $${m} : ${n}$ là $(\\,?,\\ ?\\,)$`, sub: `Đi $\\dfrac{${m}}{${m + n}}$ quãng đường từ ${Pn(step.from)}.` }
            : { title: `The point dividing $${step.from}${step.to}$ in the ratio $${m} : ${n}$ is $(\\,?,\\ ?\\,)$`, sub: `Go $\\dfrac{${m}}{${m + n}}$ of the way from ${Pn(step.from)}.` };
        }
        default: return { title: '', sub: '' };
      }
    }
    case 'equation': {
      const which = Object.keys(model.lines).length > 1 ? LT(step.line) : (vn ? 'đường thẳng' : 'the line');
      if (step.form === 'standard') return vn
        ? { title: `Viết phương trình của ${which} ở dạng chuẩn $Ax + By = C$`, sub: 'Số nguyên, $A$ dương, không có ước chung.' }
        : { title: `Write ${which} in standard form, $Ax + By = C$`, sub: 'Whole numbers, $A$ positive, no common factor.' };
      if (step.form === 'slope') return vn
        ? { title: `Viết phương trình của ${which} ở dạng $y = mx + b$`, sub: 'Dùng / cho phân số: y = -1/4x + 3.' }
        : { title: `Write ${which} in slope-intercept form, $y = mx + b$`, sub: 'Use / for a fraction: y = -1/4x + 3.' };
      return vn
        ? { title: `Viết một phương trình của ${which}`, sub: 'Dạng nào cũng được. Dùng / cho phân số.' }
        : { title: `Write an equation of ${which}`, sub: 'Any form will do. Use / for a fraction.' };
    }
    case 'relation': return vn
      ? { title: 'Hai đường thẳng này có quan hệ gì?', sub: 'So sánh hệ số góc của chúng.' }
      : { title: 'How are the two lines related?', sub: 'Compare their slopes.' };
    default: return { title: '', sub: '' };
  }
}

/** Why a wrong click is wrong — the substitution, the swap, the sign. */
export function clickWhy(step, ans, model, p, lang) {
  const vn = lang === 'vn';
  const q = frPt(p);
  const at = `$${ptTex(q)}$`;
  if (ans.on || step.kind === 'xint' || step.kind === 'yint' || step.kind === 'at') {
    const ln = model.lines[step.line];
    if (ln?.sides && !onLine(ln, q)) {
      const L = evalSide(ln.sides[0], q);
      const R = evalSide(ln.sides[1], q);
      return vn
        ? `Tại ${at}: vế trái bằng $${frTex(L)}$, vế phải bằng $${frTex(R)}$ — không bằng nhau, nên điểm này không nằm trên đường thẳng.`
        : `At ${at} the left side is $${frTex(L)}$ and the right side is $${frTex(R)}$ — not equal, so it is not on the line.`;
    }
    if (ans.on && ln && onLine(ln, q)) {
      return vn ? 'Điểm đó đã có rồi — chọn một điểm khác.' : 'That one is already placed or given — find a different one.';
    }
    if (step.kind === 'xint' && p[1] !== 0) return vn ? 'Giao điểm với trục $x$ phải nằm TRÊN trục $x$, nơi $y = 0$.' : 'An $x$-intercept sits ON the $x$-axis, where $y = 0$.';
    if (step.kind === 'yint' && p[0] !== 0) return vn ? 'Giao điểm với trục $y$ phải nằm TRÊN trục $y$, nơi $x = 0$.' : 'A $y$-intercept sits ON the $y$-axis, where $x = 0$.';
    if (ln?.from) return vn ? `Điểm này không nằm trên đường thẳng. Từ $${ln.from}$, đi theo hệ số góc.` : `That point is not on the line. Start at $${ln.from}$ and follow the slope.`;
    if (ln?.through) return vn ? `Điểm này không nằm trên đường thẳng. Tính hệ số góc từ $${ln.through[0]}$ tới $${ln.through[1]}$, rồi đi tiếp theo đúng bước đó.` : `That point is not on the line. Work out the step from $${ln.through[0]}$ to $${ln.through[1]}$, and keep taking it.`;
  }
  // The classic slips, against every point the step wants: the numbers the
  // wrong way round, or one sign lost.
  for (const tg of ans.targets || []) {
    const [tx, ty] = numPt(tg);
    if (p[0] === ty && p[1] === tx && tx !== ty) return vn ? `Em đã đảo hai tọa độ của $${ptTex(tg)}$ — $x$ (ngang) luôn đứng trước.` : `You swapped the numbers of $${ptTex(tg)}$ — $x$ (across) always comes first.`;
    if (p[0] === -tx && p[1] === ty && tx !== 0) return vn ? `Gần đúng $${ptTex(tg)}$: tung độ đúng, xem lại dấu của hoành độ $x$.` : `Nearly $${ptTex(tg)}$: the $y$ is right — check the sign of the $x$.`;
    if (p[0] === tx && p[1] === -ty && ty !== 0) return vn ? `Gần đúng $${ptTex(tg)}$: hoành độ đúng, xem lại dấu của tung độ $y$.` : `Nearly $${ptTex(tg)}$: the $x$ is right — check the sign of the $y$.`;
  }
  if (step.kind === 'plot') return vn ? `Đó là ${at}, không phải điểm nào cần đặt. Đi ngang trước, rồi mới lên hoặc xuống.` : `That is ${at} — not one of the points. Across first, then up or down.`;
  const t = ans.targets?.[0];
  if (t) {
    if (step.kind === 'meet') {
      const [a, b] = step.lines.map((n) => model.lines[n]);
      const onA = onLine(a, q);
      const onB = onLine(b, q);
      if (onA || onB) return vn ? `${at} nằm trên một đường nhưng không nằm trên đường kia.` : `${at} is on one line but not the other.`;
    }
    if (step.kind === 'extend') return vn ? 'Tính bước đi từ điểm đầu tới trung điểm (ngang bao nhiêu, dọc bao nhiêu), rồi đi thêm đúng bước đó.' : 'Work out the step from the start to the midpoint (how far across, how far up), then take that step once more.';
    if (step.kind === 'midpoint') return vn ? 'Trung điểm là trung bình: cộng hai giá trị $x$ rồi chia đôi, làm tương tự với $y$.' : 'The midpoint is the average: add the two $x$ values and halve, then the same for $y$.';
    if (step.kind === 'divide') return vn ? 'Tính độ thay đổi của $x$ và $y$ từ điểm đầu tới điểm cuối, rồi lấy đúng phần đó.' : 'Work out the change in $x$ and in $y$ from start to end, then take that fraction of each.';
    if (step.kind === 'corner') return vn ? 'Góc vuông nằm ngang hàng với điểm đầu và thẳng hàng dọc với điểm cuối.' : 'The corner is level with the first point and straight in line with the second.';
  }
  return vn ? 'Không phải điểm đó.' : 'Not that point.';
}

/** A written side's value at a point (from the parsed tree). */
export function evalSide(node, [x, y]) {
  switch (node.t) {
    case 'num': return fr(Number(node.v));
    case 'var': return node.v === 'x' ? x : node.v === 'y' ? y : fr(0);
    case 'group': return evalSide(node.a, [x, y]);
    case 'neg': return neg(evalSide(node.a, [x, y]));
    case 'sum': return node.terms.reduce((s, t) => (t.sign > 0 ? add(s, evalSide(t.node, [x, y])) : sub(s, evalSide(t.node, [x, y]))), fr(0));
    case 'mul': return mul(evalSide(node.a, [x, y]), evalSide(node.b, [x, y]));
    case 'div': return div(evalSide(node.a, [x, y]), evalSide(node.b, [x, y]));
    default: return fr(0);
  }
}

