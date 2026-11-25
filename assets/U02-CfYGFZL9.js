var e=`#c2410c`,t=`#0087a8`,n=`#4a8b23`,r=`#1a5fa8`,i=`#7c3aed`,a=`#e11d48`,o=`#1a5fa8`,s=(e,t)=>({tone:`write`,badge:`Write This Down · ${e} of 8`,text:t}),c=e=>({tone:`homework`,badge:!1,text:`✗ ${e}`}),l=e=>({tone:`plant`,badge:!1,text:`✓ ${e}`}),u=e=>({tone:`theory`,badge:!1,text:e}),d={meta:{course:`upper-math`,unit:`2`,id:`U02`,title:`Formulas`,subtitle:`Put the numbers in, change the subject, then use it`,objective:`Put numbers into a formula, and change its subject: one move, two moves, a letter on the bottom and a bracket. Then use it.`,order:2,vietnamese:!1},slides:[{layout:`hero`,color:e,icon:`Sigma`,brand:`Upper Secondary Maths`,eyebrow:`Unit 2`,title:`Formulas`,card:{icon:`Lightbulb`,badge:`The big idea`,text:`The letter you want is your **x**. Treat every other letter like a **number**.`}},{layout:`split`,icon:`Equal`,accent:t,title:`What a Formula Is`,content:`$A = lw$
Area = length × width.`,notes:[s(1,`**Formula:** a rule written with letters. The **subject** is the letter on its own.
$A = lw$: the subject is $A$`)],reveal:{label:`Answer`,prompt:`In $P = 2l + 2w$, which letter is the subject?`,answer:`$P$. It is on its own, on one side of the $=$.`}},{layout:`split`,icon:`Calculator`,accent:t,title:`Put the Numbers In`,content:`$P = 2l + 2w$, with $l = 8$ and $w = 5$`,notes:[u(`$P = 2 \\times 8 + 2 \\times 5$
$P = 16 + 10 = 26$`),s(2,`**Substitute:** put each number in place of its letter. Then work it out.`)],reveal:{label:`Answer`,prompt:`$y = mx + b$, with $m = 4$, $x = 5$, $b = 2$. Find $y$.`,answer:`$y = 4 \\times 5 + 2 = 22$`}},{layout:`split`,icon:`ArrowLeftRight`,accent:t,title:`Same Moves, New Letters`,content:`Make $x$ the subject. Unit 1 and a formula: the **same** moves.`,notes:[u(`**Unit 1**
$3x + 7 = 22$
$- 7$ both sides: $3x = 15$
$\\div 3$ both sides: $x = 5$`),u(`**A formula**
$ax + b = c$
$- b$ both sides: $ax = c - b$
$\\div a$ both sides: $x = \\dfrac{c - b}{a}$`)]},{layout:`split`,icon:`Repeat`,accent:r,title:`One Move`,content:`Distance = speed × time.
$d = st$. Make $t$ the subject.`,notes:[s(3,`**Change the subject:** get the letter you want on its own. Do the **same** to **both sides**.`)],reveal:{label:`Working`,answer:`Turn it round: $st = d$
$\\div s$ both sides: $t = \\dfrac{d}{s}$
Check: $d = 120$, $s = 40$ give $t = 3$ ✓`}},{layout:`callout`,accent:n,icon:`PenLine`,eyebrow:`Your turn · notebooks`,title:`Try One Move`,content:`**a** · Make $l$ the subject of $A = lw$.

**b** · Make $x$ the subject of $y = x - k$.`,reveal:{label:`Answers`,answer:`**a** $\\div w$: $l = \\dfrac{A}{w}$
**b** $+ k$: $x = y + k$`}},{layout:`split`,icon:`Layers`,accent:e,title:`Two Moves`,content:`Perimeter of a rectangle.
$P = 2l + 2w$. Make $l$ the subject.`,notes:[s(4,`**Two moves:** undo $+$ or $-$ **first**. Then undo $\\times$ or $\\div$.`)],reveal:{label:`Working`,answer:`Turn it round: $2l + 2w = P$
$- 2w$ both sides: $2l = P - 2w$
$\\div 2$ both sides: $l = \\dfrac{P - 2w}{2}$
Check: $P = 26$, $w = 5$ give $l = 8$ ✓`}},{layout:`callout`,accent:o,icon:`Hand`,eyebrow:`Left hand A · right hand B`,title:`What Is the First Move?`,content:`$v = u + at$. Make $t$ the subject.

**A** · Divide both sides by $a$.

**B** · Take $u$ from both sides.`,reveal:{label:`Answer`,answer:`**B.** Undo the $+ u$ first: $at = v - u$. Then $\\div a$: $t = \\dfrac{v - u}{a}$`}},{layout:`split`,icon:`Target`,accent:i,title:`Make y the Subject`,content:`$2x + 3y = 12$
The $y$ term goes first. Then two moves, as before.`,reveal:{label:`Working`,answer:`$- 2x$ both sides: $3y = 12 - 2x$
$\\div 3$ both sides: $y = \\dfrac{12 - 2x}{3}$`}},{layout:`split`,icon:`Divide`,accent:r,title:`A Letter on the Bottom`,content:`Speed = distance ÷ time.
$s = \\dfrac{d}{t}$. Make $t$ the subject.`,notes:[s(5,`**A letter on the bottom:** multiply both sides by it **first**.
$s = \\dfrac{d}{t}$, so $st = d$`)],reveal:{label:`Working`,answer:`$\\times t$ both sides: $st = d$
$\\div s$ both sides: $t = \\dfrac{d}{s}$
Check: $d = 60$, $s = 12$ give $t = 5$ ✓`}},{layout:`split`,icon:`Parentheses`,accent:a,title:`A Fraction and a Bracket`,content:`°F to °C: $C = \\dfrac{5}{9}(F - 32)$
Make $F$ the subject. What do you undo first?`,notes:[s(6,`**A bracket:** undo what is **outside** the bracket first.
× 9, then ÷ 5, then + 32`)],reveal:{label:`Working`,answer:`$\\times 9$: $9C = 5(F - 32)$
$\\div 5$: $\\dfrac{9C}{5} = F - 32$
$+ 32$: $F = \\dfrac{9C}{5} + 32$`}},{layout:`split`,icon:`Ruler`,accent:n,title:`Rearrange, Then Use It`,content:`A rectangle: $P = 30$, $w = 4$. Find $l$.`,notes:[s(7,`**Use a formula:**
**1.** Make the letter you want the subject.
**2.** Put the numbers in.`)],reveal:{label:`Working`,answer:`$l = \\dfrac{P - 2w}{2} = \\dfrac{30 - 8}{2} = 11$`}},{layout:`split`,icon:`AlertTriangle`,accent:a,title:`Watch Out`,content:`Two common mistakes.`,notes:[c(`$P = 2l + 2w$ → $l = \\dfrac{P}{2} - 2w$ · divided one term`),l(`$P = 2l + 2w$ → $l = \\dfrac{P - 2w}{2}$ · divide the whole side`),c(`$y = x - k$ → $x = y - k$ · wrong way`),l(`$y = x - k$ → $x = y + k$ · add $k$`)]},{layout:`split`,icon:`ListChecks`,accent:e,title:`Every Formula, in Order`,content:`Use these steps to change the subject of any formula.`,notes:[s(8,`**Changing the subject**
**1.** Turn it round: the letter you want on the left.
**2.** A letter on the bottom? Multiply it up.
**3.** Undo $+$ or $-$.
**4.** Undo $\\times$ or $\\div$.
**5.** A square? Square root both sides.
**6.** Check with numbers.`)]}],plan:{duration:`10 minutes — 14 slides. If you fall behind: skip slides 9 and 11 (they are in the notes).`,objective:`Students put numbers into a formula, and change its subject with the same moves as Unit 1: undo + or − first, then × or ÷; a letter on the bottom is multiplied up first; what is outside a bracket is undone first.`,materials:[`Projector / TV; English only. Staff only: students never see it on their home page`,`Students follow on their Unit 2 Lesson (/unit/#/UPPER_MATH/U02/lesson) and answer its questions there`,`Notebooks: 8 written notes, the same 8 as the notes`],vocab:[{term:`Formula`,def:`a rule written with letters`},{term:`Subject`,def:`the letter on its own, on one side of the =`},{term:`Substitute`,def:`put a number in place of its letter`},{term:`Change the subject`,def:`get a different letter on its own`}],timeline:[{time:`0–2 min`,phase:`Big idea, formula, substitute · notes 1–3`,detail:`Slide 1: read the big idea. Slides 2–3: copy notes 1 and 2; ask the question, then open the answer.`},{time:`2–5 min`,phase:`One move · notes 4–6`,detail:`Slide 4: point at the same moves side by side. Slide 5: copy note 3; do the move with the class, then open the working. Slide 6: notebooks, then open the answers.`},{time:`5–8 min`,phase:`Two moves · notes 7–11`,detail:`Slide 7: copy note 4; + or − first. Slide 8: vote, everyone at once. Slides 9–10: copy note 5; open the working.`},{time:`8–10 min`,phase:`Bracket, use it, method · notes 12–17`,detail:`Slide 11: copy note 6. Slide 12: copy note 7. Slide 13: read the strips. Slide 14: copy note 8; then students start Isolate It.`}],answers:[{q:`Slide 2 — subject of P = 2l + 2w`,a:`P`},{q:`Slide 3 — y = mx + b, m = 4, x = 5, b = 2`,a:`y = 22`},{q:`Slide 6 — a) A = lw for l; b) y = x − k for x`,a:`a) l = A/w; b) x = y + k`},{q:`Slide 8 — v = u + at, first move to make t the subject`,a:`B, take u from both sides`},{q:`Slide 9 — 2x + 3y = 12 for y`,a:`y = (12 − 2x)/3`},{q:`Slide 12 — P = 30, w = 4, find l`,a:`l = 11`}],notes:`Class slides map to the Unit 2 notes (18 slides): 1 = notes 1, 2 = 2, 3 = 3, 4 = 4, 5 = 5, 6 = 6, 7 = 7, 8 = 8, 9 = 10, 10 = 11, 11 = 12–13, 12 = 14, 13 = 16, 14 = 17. Not in the class deck: the notes’ typed sets on slides 6, 9 and 14 and the square challenge (slide 15). Votes are left hand A, right hand B, all at once.`}};export{d as default};