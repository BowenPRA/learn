var e=`#2b2b2b`,t=`#c25e12`,n=`#c8102e`,r=`#1a5fa8`,i=`#4a8b23`,a=`#eef6e6`,o=`#fdf1e3`,s=`#eef4fb`,c=`#f1f5f9`,l=`#dbeafe`,u=`Inter, 'Segoe UI', system-ui, sans-serif`,d=(e,t)=>`<rect x="0" y="0" width="${e}" height="${t}" rx="14" fill="#ffffff"/>
    <rect x="0.75" y="0.75" width="${e-1.5}" height="${t-1.5}" rx="13" fill="none" stroke="#e2e8f0" stroke-width="1.5"/>`,f=`<defs>
    <marker id="m21-key" viewBox="0 0 10 10" refX="9" refY="5" markerUnits="userSpaceOnUse" markerWidth="14" markerHeight="14" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="${t}"/></marker>
    <marker id="m21-blue" viewBox="0 0 10 10" refX="9" refY="5" markerUnits="userSpaceOnUse" markerWidth="14" markerHeight="14" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="${r}"/></marker>
    <marker id="m21-green" viewBox="0 0 10 10" refX="9" refY="5" markerUnits="userSpaceOnUse" markerWidth="14" markerHeight="14" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="${i}"/></marker>
  </defs>`,p={PARTICLE_DROP:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 580" class="w-full h-full">
    ${d(840,580)}

    <text x="420" y="48" font-family="${u}" font-size="28" font-weight="bold" fill="${t}" text-anchor="middle">One drop of water</text>

    <circle cx="420" cy="310" r="196" fill="${l}" stroke="${e}" stroke-width="3"/>
    ${((e,t,n,i,a)=>{let o=``;for(let n=-26;n<=26;n+=1){let s=t+n*a*.87,c=n%2==0?0:a/2;for(let n=-26;n<=26;n+=1){let l=e+n*a+c;(l-e)**2+(s-t)**2>184.5**2||(o+=`<circle cx="${l.toFixed(1)}" cy="${s.toFixed(1)}" r="${i}" fill="#ffffff" stroke="${r}" stroke-width="1.6"/>`)}}return o})(420,310,196,5.5,18)}
    <circle cx="420" cy="310" r="196" fill="none" stroke="${e}" stroke-width="3"/>

    <text x="420" y="552" font-family="${u}" font-size="23" fill="${e}" text-anchor="middle">There IS a number of particles in this drop. Nobody can count it.</text>
  </svg>`,COFFEE_WALL:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 520" class="w-full h-full">
    ${d(840,520)}
    ${f}

    <text x="420" y="46" font-family="${u}" font-size="28" font-weight="bold" fill="${t}" text-anchor="middle">Mr Bowen drinks 50 ml from every cup</text>

    <text x="145" y="92" font-family="${u}" font-size="21" font-weight="bold" fill="${r}" text-anchor="middle">In the cup</text>
    <text x="400" y="92" font-family="${u}" font-size="21" font-weight="bold" fill="${r}" text-anchor="middle">Drink 50 ml</text>
    <text x="700" y="92" font-family="${u}" font-size="21" font-weight="bold" fill="${r}" text-anchor="middle">Left in the cup</text>

    <rect x="40" y="124" width="210" height="80" rx="12" fill="${s}" stroke="${r}" stroke-width="2.5"/>
    <rect x="40" y="220" width="210" height="80" rx="12" fill="${s}" stroke="${r}" stroke-width="2.5"/>
    <rect x="40" y="316" width="210" height="80" rx="12" fill="${o}" stroke="${t}" stroke-width="3"/>
    <text x="145" y="177" font-family="${u}" font-size="34" font-weight="900" fill="${e}" text-anchor="middle">200 ml</text>
    <text x="145" y="273" font-family="${u}" font-size="34" font-weight="900" fill="${e}" text-anchor="middle">300 ml</text>
    <text x="145" y="369" font-family="${u}" font-size="34" font-weight="900" fill="${t}" text-anchor="middle">c ml</text>

    <rect x="275" y="124" width="250" height="80" rx="12" fill="#ffffff" stroke="${r}" stroke-width="2.5"/>
    <rect x="275" y="220" width="250" height="80" rx="12" fill="#ffffff" stroke="${r}" stroke-width="2.5"/>
    <rect x="275" y="316" width="250" height="80" rx="12" fill="#ffffff" stroke="${t}" stroke-width="3"/>
    <text x="400" y="177" font-family="${u}" font-size="34" font-weight="bold" fill="${e}" text-anchor="middle">200 − 50</text>
    <text x="400" y="273" font-family="${u}" font-size="34" font-weight="bold" fill="${e}" text-anchor="middle">300 − 50</text>
    <text x="400" y="369" font-family="${u}" font-size="34" font-weight="bold" fill="${t}" text-anchor="middle">c − 50</text>

    <line x1="540" y1="164" x2="586" y2="164" stroke="${r}" stroke-width="3" marker-end="url(#m21-blue)"/>
    <line x1="540" y1="260" x2="586" y2="260" stroke="${r}" stroke-width="3" marker-end="url(#m21-blue)"/>
    <line x1="540" y1="356" x2="586" y2="356" stroke="${t}" stroke-width="3" marker-end="url(#m21-key)"/>

    <rect x="600" y="124" width="200" height="80" rx="12" fill="${a}" stroke="${i}" stroke-width="2.5"/>
    <rect x="600" y="220" width="200" height="80" rx="12" fill="${a}" stroke="${i}" stroke-width="2.5"/>
    <rect x="600" y="316" width="200" height="80" rx="12" fill="${o}" stroke="${t}" stroke-width="3"/>
    <text x="700" y="177" font-family="${u}" font-size="34" font-weight="900" fill="${e}" text-anchor="middle">150 ml</text>
    <text x="700" y="273" font-family="${u}" font-size="34" font-weight="900" fill="${e}" text-anchor="middle">250 ml</text>
    <text x="700" y="369" font-family="${u}" font-size="34" font-weight="900" fill="${t}" text-anchor="middle">c − 50</text>

    <text x="420" y="445" font-family="${u}" font-size="24" font-weight="bold" fill="${t}" text-anchor="middle">The last row will not finish — and that is the answer.</text>
    <text x="420" y="484" font-family="${u}" font-size="21" fill="${e}" text-anchor="middle">You cannot work out c − 50 until somebody tells you c.</text>
  </svg>`,NOTATION:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 550" class="w-full h-full">
    ${d(840,550)}
    ${f}

    <text x="420" y="46" font-family="${u}" font-size="27" font-weight="bold" fill="${t}" text-anchor="middle">Algebra has a shorter way of writing it</text>

    <text x="250" y="92" font-family="${u}" font-size="21" font-weight="bold" fill="${r}" text-anchor="middle">What it means</text>
    <text x="660" y="92" font-family="${u}" font-size="21" font-weight="bold" fill="${r}" text-anchor="middle">How we write it</text>

    <rect x="60" y="124" width="380" height="90" rx="12" fill="${c}" stroke="${e}" stroke-width="2.5"/>
    <rect x="60" y="234" width="380" height="90" rx="12" fill="${c}" stroke="${e}" stroke-width="2.5"/>
    <rect x="60" y="344" width="380" height="90" rx="12" fill="${c}" stroke="${e}" stroke-width="2.5"/>
    <text x="250" y="182" font-family="${u}" font-size="36" font-weight="bold" fill="${e}" text-anchor="middle">3 × s</text>
    <text x="250" y="292" font-family="${u}" font-size="36" font-weight="bold" fill="${e}" text-anchor="middle">a × b</text>
    <text x="250" y="402" font-family="${u}" font-size="36" font-weight="bold" fill="${e}" text-anchor="middle">s ÷ 2</text>

    <line x1="462" y1="169" x2="516" y2="169" stroke="${t}" stroke-width="3" marker-end="url(#m21-key)"/>
    <line x1="462" y1="279" x2="516" y2="279" stroke="${t}" stroke-width="3" marker-end="url(#m21-key)"/>
    <line x1="462" y1="389" x2="516" y2="389" stroke="${t}" stroke-width="3" marker-end="url(#m21-key)"/>

    <rect x="540" y="124" width="240" height="90" rx="12" fill="${o}" stroke="${t}" stroke-width="3"/>
    <rect x="540" y="234" width="240" height="90" rx="12" fill="${o}" stroke="${t}" stroke-width="3"/>
    <rect x="540" y="344" width="240" height="90" rx="12" fill="${o}" stroke="${t}" stroke-width="3"/>
    <text x="660" y="184" font-family="${u}" font-size="40" font-weight="900" fill="${t}" text-anchor="middle">3s</text>
    <text x="660" y="294" font-family="${u}" font-size="40" font-weight="900" fill="${t}" text-anchor="middle">ab</text>
    <text x="660" y="382" font-family="${u}" font-size="32" font-weight="900" fill="${t}" text-anchor="middle">s</text>
    <line x1="634" y1="393" x2="686" y2="393" stroke="${t}" stroke-width="3"/>
    <text x="660" y="424" font-family="${u}" font-size="32" font-weight="900" fill="${t}" text-anchor="middle">2</text>

    <text x="420" y="484" font-family="${u}" font-size="24" font-weight="bold" fill="${e}" text-anchor="middle">We stop writing ×. We never stop writing + or −.</text>
    <text x="420" y="520" font-family="${u}" font-size="21" fill="${e}" text-anchor="middle">The number goes in front: we write 3s, never s3.</text>
  </svg>`,FOUR_PHRASES:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 520" class="w-full h-full">
    ${d(840,520)}
    ${f}

    <text x="420" y="46" font-family="${u}" font-size="26" font-weight="bold" fill="${t}" text-anchor="middle">Mr Bowen stirs s grams of salt into his beaker</text>

    <rect x="30" y="78" width="430" height="72" rx="12" fill="${c}" stroke="${e}" stroke-width="2.5"/>
    <rect x="30" y="166" width="430" height="72" rx="12" fill="${c}" stroke="${e}" stroke-width="2.5"/>
    <rect x="30" y="254" width="430" height="72" rx="12" fill="${c}" stroke="${e}" stroke-width="2.5"/>
    <rect x="30" y="342" width="430" height="72" rx="12" fill="${c}" stroke="${e}" stroke-width="2.5"/>

    <text x="245" y="122" font-family="${u}" font-size="23" fill="${e}" text-anchor="middle">two grams more than Mr Bowen</text>
    <text x="245" y="210" font-family="${u}" font-size="23" fill="${e}" text-anchor="middle">three times as much as Mr Bowen</text>
    <text x="245" y="298" font-family="${u}" font-size="23" fill="${e}" text-anchor="middle">six grams less than Mr Bowen</text>
    <text x="245" y="386" font-family="${u}" font-size="23" fill="${e}" text-anchor="middle">half as much as Mr Bowen</text>

    <line x1="482" y1="114" x2="536" y2="114" stroke="${t}" stroke-width="3" marker-end="url(#m21-key)"/>
    <line x1="482" y1="202" x2="536" y2="202" stroke="${t}" stroke-width="3" marker-end="url(#m21-key)"/>
    <line x1="482" y1="290" x2="536" y2="290" stroke="${t}" stroke-width="3" marker-end="url(#m21-key)"/>
    <line x1="482" y1="378" x2="536" y2="378" stroke="${t}" stroke-width="3" marker-end="url(#m21-key)"/>

    <rect x="560" y="78" width="250" height="72" rx="12" fill="${o}" stroke="${t}" stroke-width="3"/>
    <rect x="560" y="166" width="250" height="72" rx="12" fill="${o}" stroke="${t}" stroke-width="3"/>
    <rect x="560" y="254" width="250" height="72" rx="12" fill="${o}" stroke="${t}" stroke-width="3"/>
    <rect x="560" y="342" width="250" height="72" rx="12" fill="${o}" stroke="${t}" stroke-width="3"/>

    <text x="685" y="126" font-family="${u}" font-size="36" font-weight="900" fill="${t}" text-anchor="middle">s + 2</text>
    <text x="685" y="214" font-family="${u}" font-size="36" font-weight="900" fill="${t}" text-anchor="middle">3s</text>
    <text x="685" y="302" font-family="${u}" font-size="36" font-weight="900" fill="${t}" text-anchor="middle">s − 6</text>
    <text x="685" y="390" font-family="${u}" font-size="36" font-weight="900" fill="${t}" text-anchor="middle">s ÷ 2</text>

    <text x="420" y="464" font-family="${u}" font-size="24" font-weight="bold" fill="${e}" text-anchor="middle">The English words choose the operation for you.</text>
    <text x="420" y="499" font-family="${u}" font-size="21" fill="${e}" text-anchor="middle">Every answer still starts from s, because every sentence did.</text>
  </svg>`,TOTAL_DIFFERENCE:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 480" class="w-full h-full">
    ${d(840,480)}

    <text x="420" y="46" font-family="${u}" font-size="28" font-weight="bold" fill="${t}" text-anchor="middle">Two beakers, two letters</text>

    <rect x="60" y="84" width="440" height="66" rx="10" fill="${s}" stroke="${r}" stroke-width="3"/>
    <text x="280" y="128" font-family="${u}" font-size="32" font-weight="900" fill="${e}" text-anchor="middle">a ml</text>

    <rect x="60" y="178" width="270" height="66" rx="10" fill="${a}" stroke="${i}" stroke-width="3"/>
    <text x="195" y="222" font-family="${u}" font-size="32" font-weight="900" fill="${e}" text-anchor="middle">b ml</text>

    <rect x="60" y="290" width="340" height="92" rx="12" fill="${o}" stroke="${t}" stroke-width="3"/>
    <text x="230" y="324" font-family="${u}" font-size="21" font-weight="bold" fill="${e}" text-anchor="middle">The total</text>
    <text x="230" y="364" font-family="${u}" font-size="34" font-weight="900" fill="${t}" text-anchor="middle">a + b</text>

    <rect x="440" y="290" width="340" height="92" rx="12" fill="${o}" stroke="${t}" stroke-width="3"/>
    <text x="610" y="324" font-family="${u}" font-size="21" font-weight="bold" fill="${e}" text-anchor="middle">The difference</text>
    <text x="610" y="364" font-family="${u}" font-size="34" font-weight="900" fill="${t}" text-anchor="middle">a − b</text>

    <text x="420" y="434" font-family="${u}" font-size="23" font-weight="bold" fill="${e}" text-anchor="middle">Total means add them. Difference means subtract them.</text>
  </svg>`,ORDER_FLIP:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 490" class="w-full h-full">
    ${d(840,490)}
    ${f}

    <text x="420" y="48" font-family="${u}" font-size="27" font-weight="bold" fill="${t}" text-anchor="middle">The words arrive in the opposite order</text>

    <rect x="45" y="100" width="330" height="100" rx="12" fill="${c}" stroke="${e}" stroke-width="2.5"/>
    <text x="210" y="165" font-family="${u}" font-size="30" font-weight="bold" fill="${e}" text-anchor="middle">5 less than 12</text>
    <line x1="396" y1="150" x2="450" y2="150" stroke="${i}" stroke-width="3" marker-end="url(#m21-green)"/>
    <rect x="470" y="100" width="330" height="100" rx="12" fill="${a}" stroke="${i}" stroke-width="3"/>
    <text x="635" y="167" font-family="${u}" font-size="34" font-weight="900" fill="${e}" text-anchor="middle">12 − 5 = 7</text>

    <rect x="45" y="240" width="330" height="100" rx="12" fill="${c}" stroke="${e}" stroke-width="2.5"/>
    <text x="210" y="305" font-family="${u}" font-size="30" font-weight="bold" fill="${e}" text-anchor="middle">h less than t</text>
    <line x1="396" y1="290" x2="450" y2="290" stroke="${t}" stroke-width="3" marker-end="url(#m21-key)"/>
    <rect x="470" y="240" width="330" height="100" rx="12" fill="${o}" stroke="${t}" stroke-width="3"/>
    <text x="635" y="307" font-family="${u}" font-size="34" font-weight="900" fill="${t}" text-anchor="middle">t − h</text>

    <text x="420" y="400" font-family="${u}" font-size="26" font-weight="bold" fill="${n}" text-anchor="middle">Not 5 − 12.   Not h − t.</text>
    <text x="420" y="445" font-family="${u}" font-size="22" fill="${e}" text-anchor="middle">You write the starting number first, even though you say it last.</text>
  </svg>`,SUBTRACT_VS_FROM:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 600" class="w-full h-full">
    ${d(840,600)}

    <text x="420" y="46" font-family="${u}" font-size="27" font-weight="bold" fill="${t}" text-anchor="middle">One extra word. A completely different answer.</text>

    <rect x="25" y="76" width="390" height="440" rx="14" fill="${s}" stroke="${r}" stroke-width="3"/>
    <text x="220" y="120" font-family="${u}" font-size="22" fill="${e}" text-anchor="middle">Multiply x by 5</text>
    <text x="220" y="152" font-family="${u}" font-size="22" font-weight="bold" fill="${r}" text-anchor="middle">and subtract 4.</text>
    <text x="220" y="250" font-family="${u}" font-size="52" font-weight="900" fill="${r}" text-anchor="middle">5x − 4</text>
    <text x="220" y="320" font-family="${u}" font-size="20" fill="${e}" text-anchor="middle">Try it with x = 2</text>
    <text x="220" y="374" font-family="${u}" font-size="32" font-weight="bold" fill="${e}" text-anchor="middle">10 − 4 = 6</text>
    <text x="220" y="434" font-family="${u}" font-size="20" fill="${e}" text-anchor="middle">start at 10, take 4 away</text>

    <rect x="425" y="76" width="390" height="440" rx="14" fill="${o}" stroke="${t}" stroke-width="3"/>
    <text x="620" y="120" font-family="${u}" font-size="22" fill="${e}" text-anchor="middle">Multiply x by 5</text>
    <text x="620" y="152" font-family="${u}" font-size="22" font-weight="bold" fill="${t}" text-anchor="middle">and subtract from 4.</text>
    <text x="620" y="250" font-family="${u}" font-size="52" font-weight="900" fill="${t}" text-anchor="middle">4 − 5x</text>
    <text x="620" y="320" font-family="${u}" font-size="20" fill="${e}" text-anchor="middle">Try it with x = 2</text>
    <text x="620" y="374" font-family="${u}" font-size="32" font-weight="bold" fill="${n}" text-anchor="middle">4 − 10 = −6</text>
    <text x="620" y="434" font-family="${u}" font-size="20" fill="${e}" text-anchor="middle">start at 4, take 10 away</text>

    <text x="420" y="564" font-family="${u}" font-size="24" font-weight="bold" fill="${e}" text-anchor="middle">The word from tells you where to start counting down.</text>
  </svg>`,ORDER_OF_OPS:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 540" class="w-full h-full">
    ${d(840,540)}
    ${f}

    <text x="420" y="46" font-family="${u}" font-size="25" font-weight="bold" fill="${t}" text-anchor="middle">Multiply n by 3, then subtract the result from 25</text>

    <rect x="60" y="100" width="150" height="86" rx="12" fill="${c}" stroke="${e}" stroke-width="2.5"/>
    <text x="135" y="160" font-family="${u}" font-size="40" font-weight="900" fill="${e}" text-anchor="middle">n</text>

    <line x1="228" y1="143" x2="278" y2="143" stroke="${r}" stroke-width="3" marker-end="url(#m21-blue)"/>
    <text x="253" y="126" font-family="${u}" font-size="22" font-weight="bold" fill="${r}" text-anchor="middle">× 3</text>

    <rect x="300" y="100" width="190" height="86" rx="12" fill="${s}" stroke="${r}" stroke-width="3"/>
    <text x="395" y="162" font-family="${u}" font-size="40" font-weight="900" fill="${r}" text-anchor="middle">3n</text>

    <text x="650" y="154" font-family="${u}" font-size="22" font-weight="bold" fill="${r}" text-anchor="middle">this is "the result"</text>

    <text x="420" y="288" font-family="${u}" font-size="24" font-weight="bold" fill="${e}" text-anchor="middle">Now subtract the result from 25</text>

    <rect x="230" y="318" width="380" height="104" rx="14" fill="${o}" stroke="${t}" stroke-width="3"/>
    <text x="420" y="388" font-family="${u}" font-size="52" font-weight="900" fill="${t}" text-anchor="middle">25 − 3n</text>

    <text x="420" y="474" font-family="${u}" font-size="24" font-weight="bold" fill="${n}" text-anchor="middle">Not 3n − 25. "From 25" means you start at 25.</text>
    <text x="420" y="512" font-family="${u}" font-size="21" fill="${e}" text-anchor="middle">The multiplication always happens before the subtraction.</text>
  </svg>`},m=`#0087a8`,h=`#5c2483`,g=`#c25e12`,_=`#4a8b23`,v=`#1a5fa8`,y=`#c8102e`,b={meta:{course:`y7-math`,unit:`2.1`,id:`U02_1`,title:`Constructing Expressions`,objective:`Choose a letter to represent a number you cannot count, leave an expression such as c − 50 unfinished without thinking it is wrong, write 3 × s as 3s, and read the English that decides the answer — "h less than t" is written t − h, "subtract 4" is not "subtract from 4", and "subtract the result from 25" is 25 − 3n.`,order:7,french:!0,dashboard:{track:`Y7_MATH`,unit:`U02_1`}},slides:[{layout:`hero`,color:h,icon:`Sigma`,brand:`Year 7 Mathematics`,brandVn:`Toán Lớp 7`,brandFr:`Maths 7e année`,eyebrow:`Unit 2 · 2.1`,eyebrowVn:`Chương 2 · 2.1`,eyebrowFr:`Unité 2 · 2.1`,date:`7 Sept 2026`,title:`Constructing Expressions`,titleVn:`Xây dựng biểu thức`,titleFr:`Construire des expressions`,card:{icon:`Pencil`,badge:`Starter Task`,badgeVn:`Nhiệm vụ khởi động`,badgeFr:`Pour commencer`,text:`In **Science** you learned that everything is made of **particles**. On your whiteboard, write how many particles are in one drop of water. You have 30 seconds.`,textVn:`Trong giờ **Khoa học**, em đã học rằng mọi vật đều được tạo nên từ các **hạt (particles)**. Hãy viết lên bảng con: một giọt nước có bao nhiêu hạt? Em có 30 giây.`,textFr:`En **sciences**, tu as appris que tout est fait de **particules (particles)**. Sur ton ardoise, écris combien de particules il y a dans une goutte d’eau. Tu as 30 secondes.`}},{layout:`split`,accent:m,icon:`Droplet`,side:`left`,eyebrow:`Science 2.1 — particle theory`,eyebrowVn:`Khoa học 2.1 — thuyết hạt`,eyebrowFr:`Sciences 2.1 — théorie particulaire`,title:`Count Them`,titleVn:`Hãy đếm chúng`,titleFr:`Compte-les`,ratio:50,inlineSvg:p.PARTICLE_DROP,content:`Nobody wrote a number. That is not because you are bad at Science.

The particles are **really there**, and there is a **real number** of them.

**So how do we write about a number nobody can count?**`,contentVn:`Không ai viết ra được con số nào. Đó không phải vì em học Khoa học kém.

Các hạt **thật sự có ở đó**, và số lượng của chúng là một **con số có thật**.

**Vậy làm sao để viết về một con số mà không ai đếm được?**`,contentFr:`Personne n’a écrit de nombre. Ce n’est pas parce que tu es mauvais en sciences.

Les particules sont **vraiment là**, et il y en a un **vrai nombre**.

**Alors comment écrire un nombre que personne ne peut compter\xA0?**`},{layout:`statement`,accent:g,eyebrow:`The way out`,eyebrowVn:`Lối ra`,eyebrowFr:`La solution`,title:`Give It a Letter`,titleVn:`Hãy đặt cho nó một chữ cái`,titleFr:`Donne-lui une lettre`,label:`Key idea`,labelVn:`Ý chính`,labelFr:`Idée clé`,labelIcon:`Sparkles`,text:`**n**`,textVn:`**n**`,textFr:`**n**`,sub:`We cannot count them, so we let **n** be that number.`,subVn:`Ta không đếm được, nên cho **n** là con số đó.`,subFr:`On ne peut pas les compter, alors **n** est ce nombre.`,notes:[{tone:`write`,text:`**Represent:** in algebra we choose a letter to **represent** a number we do not know.
n represents **the number of particles**, not a particle.`,textVn:`**Represent (đại diện cho):** trong đại số, ta chọn một chữ cái để **đại diện cho** một số mà ta chưa biết.
n đại diện cho **số lượng hạt**, không phải một cái hạt.`,textFr:`**Represent (représenter)\xA0:** en algèbre, on choisit une lettre pour **représenter** un nombre inconnu.
n représente **le nombre de particules**, pas une particule.`}]},{layout:`split`,accent:h,icon:`Coffee`,eyebrow:`Three cups, one rule`,eyebrowVn:`Ba cốc, một quy tắc`,eyebrowFr:`Trois tasses, une règle`,title:`The Row That Will Not Finish`,titleVn:`Dòng không thể tính xong`,titleFr:`La ligne qui ne finit pas`,ratio:50,inlineSvg:p.COFFEE_WALL,content:`The first two rows finish neatly: **150** and **250**.

The last row will not. There is no number to write, because nobody has told us **c**.

So we stop, and we leave it as **c − 50**. That is not giving up — that is the answer.`,contentVn:`Hai dòng đầu tính xong gọn gàng: **150** và **250**.

Dòng cuối thì không. Không có con số nào để viết, vì chưa ai cho ta biết **c**.

Vậy nên ta dừng lại và để nguyên **c − 50**. Đó không phải là bỏ cuộc — đó chính là đáp án.`,contentFr:`Les deux premières lignes se terminent bien\xA0: **150** et **250**.

La dernière, non. Il n’y a pas de nombre à écrire, car personne ne nous a donné **c**.

Alors on s’arrête et on laisse **c − 50**. Ce n’est pas abandonner — c’est la réponse.`},{layout:`statement`,accent:m,eyebrow:`Key word`,eyebrowVn:`Từ khoá`,eyebrowFr:`Mot clé`,title:`Expression`,titleVn:`Biểu thức`,titleFr:`Expression`,label:`Copy this`,labelVn:`Chép lại`,labelFr:`À recopier`,labelIcon:`Pencil`,text:`c − 50`,textVn:`c − 50`,textFr:`c − 50`,sub:`What you are left with has a name.`,subVn:`Thứ còn lại đó có một cái tên.`,subFr:`Ce qui reste a un nom.`,notes:[{tone:`write`,text:`**Expression:** a statement that contains letters and sometimes numbers, but has **no = sign**.
For example $n + 7$, $4m$, $x + 2$, $c − 50$.`,textVn:`**Biểu thức (expression):** một mệnh đề chứa chữ cái và đôi khi có cả số, nhưng **không có dấu =**.
Ví dụ $n + 7$, $4m$, $x + 2$, $c − 50$.`,textFr:`**Expression\xA0:** une écriture avec des lettres et parfois des nombres, mais **sans signe =**.
Par exemple $n + 7$, $4m$, $x + 2$, $c − 50$.`}]},{layout:`split`,accent:_,icon:`ListChecks`,side:`left`,eyebrow:`Check you have it`,eyebrowVn:`Kiểm tra xem em đã hiểu chưa`,eyebrowFr:`Vérifie que tu as compris`,title:`Which Are Expressions?`,titleVn:`Cái nào là biểu thức?`,titleFr:`Lesquelles sont des expressions\xA0?`,ratio:50,content:`Three of these five are expressions. Which three?

**A** $4m$      **B** $7 + 2 = 9$      **C** $x + 2$
**D** $n − 3$      **E** $y = 5x$`,contentVn:`Ba trong năm cái này là biểu thức. Ba cái nào?

**A** $4m$      **B** $7 + 2 = 9$      **C** $x + 2$
**D** $n − 3$      **E** $y = 5x$`,contentFr:`Trois de ces cinq sont des expressions. Lesquelles\xA0?

**A** $4m$      **B** $7 + 2 = 9$      **C** $x + 2$
**D** $n − 3$      **E** $y = 5x$`,reveal:{label:`Check your answer`,labelVn:`Kiểm tra đáp án`,labelFr:`Vérifie ta réponse`,answer:`**A, C and D.**

B and E both have an **= sign**, so neither is an expression. B has no letter either.`,answerVn:`**A, C và D.**

B và E đều có **dấu =**, nên cả hai đều không phải biểu thức. B cũng không có chữ cái nào.`,answerFr:`**A, C et D.**

B et E ont un **signe =**, donc ce ne sont pas des expressions. B n’a pas de lettre non plus.`}},{layout:`split`,accent:g,icon:`PenTool`,eyebrow:`The book assumes this from page 21 onwards`,eyebrowVn:`Sách mặc định em biết điều này từ trang 21`,eyebrowFr:`Le livre le suppose dès la page 21`,title:`The Short Way of Writing It`,titleVn:`Cách viết ngắn gọn`,titleFr:`L’écriture courte`,ratio:50,inlineSvg:p.NOTATION,content:`Algebra drops the multiplication sign — and only the multiplication sign.`,contentVn:`Đại số lược bỏ dấu nhân — và chỉ lược bỏ dấu nhân mà thôi.`,contentFr:`L’algèbre enlève le signe de multiplication — et seulement celui-là.`,notes:[{tone:`write`,text:`$3s$ means $3 × s$ · $ab$ means $a × b$ · $\\frac{s}{2}$ means $s ÷ 2$
The number is written **in front** of the letter: $3s$, never $s3$.`,textVn:`$3s$ nghĩa là $3 × s$ · $ab$ nghĩa là $a × b$ · $\\frac{s}{2}$ nghĩa là $s ÷ 2$
Số được viết **đứng trước** chữ cái: $3s$, không bao giờ viết $s3$.`,textFr:`$3s$ veut dire $3 × s$ · $ab$ veut dire $a × b$ · $\\frac{s}{2}$ veut dire $s ÷ 2$
Le nombre s’écrit **devant** la lettre\xA0: $3s$, jamais $s3$.`}],reveal:{label:`Try four`,labelVn:`Thử bốn câu`,labelFr:`Essaie-en quatre`,answer:`Write the short way: **a** $7 × k$  **b** $m × n$  **c** $4 × a × b$  **d** $p ÷ 3$

**a** $7k$  **b** $mn$  **c** $4ab$  **d** $\\frac{p}{3}$`,answerVn:`Viết theo cách ngắn: **a** $7 × k$  **b** $m × n$  **c** $4 × a × b$  **d** $p ÷ 3$

**a** $7k$  **b** $mn$  **c** $4ab$  **d** $\\frac{p}{3}$`,answerFr:`Écris en version courte\xA0: **a** $7 × k$  **b** $m × n$  **c** $4 × a × b$  **d** $p ÷ 3$

**a** $7k$  **b** $mn$  **c** $4ab$  **d** $\\frac{p}{3}$`}},{layout:`statement`,accent:h,eyebrow:`On your whiteboard — no talking yet`,eyebrowVn:`Viết lên bảng con — chưa nói vội`,eyebrowFr:`Sur ton ardoise — sans parler`,title:`One Sentence`,titleVn:`Một câu văn`,titleFr:`Une phrase`,label:`Write it`,labelVn:`Hãy viết`,labelFr:`Écris-la`,labelIcon:`MessageSquare`,text:`Mr Bowen dissolves **s grams** of salt in the first beaker.`,textVn:`Thầy Bowen hoà tan **s gam** muối vào cốc thứ nhất.`,textFr:`M. Bowen dissout **s grammes** de sel dans le premier bécher.`,sub:`The second beaker gets **two grams more than the first**. How much salt is in it?`,subVn:`Cốc thứ hai được **nhiều hơn cốc thứ nhất hai gam**. Cốc đó có bao nhiêu muối?`,subFr:`Le deuxième bécher reçoit **deux grammes de plus que le premier**. Combien de sel contient-il\xA0?`,content:`> Show me your board. One expression, nothing else.`,contentVn:`> Giơ bảng con lên. Chỉ một biểu thức.`,contentFr:`> Montre ton ardoise. Une expression, rien d’autre.`},{layout:`split`,accent:g,icon:`Languages`,eyebrow:`Four phrases, four operations`,eyebrowVn:`Bốn cụm từ, bốn phép tính`,eyebrowFr:`Quatre tournures, quatre opérations`,title:`The Words Do the Choosing`,titleVn:`Chính từ ngữ quyết định phép tính`,titleFr:`Les mots choisissent`,ratio:50,inlineSvg:p.FOUR_PHRASES,content:`The salt dissolves and disappears. It is still **s grams** — you just cannot see it.

That is exactly what a letter does.`,contentVn:`Muối tan ra và biến mất. Nó vẫn là **s gam** — chỉ là em không nhìn thấy nữa.

Chữ cái trong đại số cũng hoạt động đúng như vậy.`,contentFr:`Le sel se dissout et disparaît. Il reste **s grammes** — tu ne le vois plus, c’est tout.

Une lettre fait exactement pareil.`,notes:[{tone:`write`,text:`**more than** → add · **less than** / **fewer than** → subtract
**times as many / as much** → multiply · **half as much** → divide by 2`,textVn:`**more than** (nhiều hơn) → cộng · **less than / fewer than** (ít hơn) → trừ
**times as many / as much** (gấp … lần) → nhân · **half as much** (bằng một nửa) → chia cho 2`,textFr:`**more than** (plus que) → additionner · **less than / fewer than** (moins que) → soustraire
**times as many / as much** (… fois plus) → multiplier · **half as much** (la moitié) → diviser par 2`}]},{layout:`split`,accent:_,icon:`Beaker`,side:`left`,eyebrow:`Quick fire — thirty seconds each`,eyebrowVn:`Nhanh — mỗi câu ba mươi giây`,eyebrowFr:`Rapide — trente secondes chacune`,title:`Four Beakers`,titleVn:`Bốn cái cốc`,titleFr:`Quatre béchers`,ratio:50,content:`The first beaker holds **w ml** of water. Write an expression for each of the others.

**a** The second holds 30 ml more than the first.
**b** The third holds five times as much as the first.
**c** The fourth holds 40 ml less than the first.
**d** The fifth holds half as much as the first.`,contentVn:`Cốc thứ nhất chứa **w ml** nước. Hãy viết biểu thức cho từng cốc còn lại.

**a** Cốc thứ hai chứa nhiều hơn cốc thứ nhất 30 ml.
**b** Cốc thứ ba chứa gấp năm lần cốc thứ nhất.
**c** Cốc thứ tư chứa ít hơn cốc thứ nhất 40 ml.
**d** Cốc thứ năm chứa bằng một nửa cốc thứ nhất.`,contentFr:`Le premier bécher contient **w ml** d’eau. Écris une expression pour chacun des autres.

**a** Le deuxième contient 30 ml de plus que le premier.
**b** Le troisième contient cinq fois plus que le premier.
**c** Le quatrième contient 40 ml de moins que le premier.
**d** Le cinquième contient la moitié du premier.`,reveal:{label:`Check your answers`,labelVn:`Kiểm tra đáp án`,labelFr:`Vérifie tes réponses`,answer:`**a** $w + 30$  **b** $5w$  **c** $w − 40$  **d** $\\frac{w}{2}$

Every answer starts from **w**, because every sentence did.`,answerVn:`**a** $w + 30$  **b** $5w$  **c** $w − 40$  **d** $\\frac{w}{2}$

Mọi đáp án đều bắt đầu từ **w**, vì mọi câu hỏi đều bắt đầu từ đó.`,answerFr:`**a** $w + 30$  **b** $5w$  **c** $w − 40$  **d** $\\frac{w}{2}$

Chaque réponse part de **w**, comme chaque phrase.`}},{layout:`split`,accent:m,icon:`Scale`,eyebrow:`Two words the exercise uses without explaining`,eyebrowVn:`Hai từ mà bài tập dùng nhưng không giải thích`,eyebrowFr:`Deux mots que l’exercice n’explique pas`,title:`Total and Difference`,titleVn:`Tổng và hiệu`,titleFr:`Total et différence`,ratio:50,inlineSvg:p.TOTAL_DIFFERENCE,content:`When a question gives you **two** letters, these are the two words it will use.`,contentVn:`Khi một câu hỏi cho em **hai** chữ cái, đây chính là hai từ nó sẽ dùng.`,contentFr:`Quand une question te donne **deux** lettres, ce sont ces deux mots qu’elle utilise.`,notes:[{tone:`write`,text:`**Total** → add them: $a + b$ · **Difference** → subtract them: $a − b$`,textVn:`**Total (tổng)** → cộng lại: $a + b$ · **Difference (hiệu)** → trừ đi: $a − b$`,textFr:`**Total** (le total) → additionne-les\xA0: $a + b$ · **Difference** (la différence) → soustrais-les\xA0: $a − b$`}],reveal:{label:`One more`,labelVn:`Thêm một câu`,labelFr:`Encore une`,answer:`Mr Bowen pours **three** large beakers and **five** small ones into a bowl. Write an expression for the total.

$3a + 5b$. Two different sizes, so two different letters.`,answerVn:`Thầy Bowen đổ **ba** cốc lớn và **năm** cốc nhỏ vào một cái tô. Hãy viết biểu thức cho tổng lượng nước.

$3a + 5b$. Hai cỡ cốc khác nhau nên phải dùng hai chữ cái khác nhau.`,answerFr:`M. Bowen verse **trois** grands béchers et **cinq** petits dans un bol. Écris une expression pour le total.

$3a + 5b$. Deux tailles différentes, donc deux lettres différentes.`}},{layout:`statement`,accent:h,eyebrow:`Discuss in pairs — do not write yet`,eyebrowVn:`Thảo luận theo cặp — chưa viết vội`,eyebrowFr:`Discute à deux — n’écris pas encore`,title:`Which One Is Right?`,titleVn:`Cái nào mới đúng?`,titleFr:`Laquelle est juste\xA0?`,label:`Discuss`,labelVn:`Thảo luận`,labelFr:`Discute`,labelIcon:`MessageSquare`,text:`**h less than t**`,textVn:`**h less than t**`,textFr:`**h less than t**`,sub:`Is this written $h − t$, or is it written $t − h$? They are not the same.`,subVn:`Câu này viết là $h − t$, hay là $t − h$? Hai cái đó không giống nhau.`,subFr:`Est-ce que ça s’écrit $h − t$ ou $t − h$\xA0? Ce n’est pas pareil.`},{layout:`split`,accent:m,icon:`ArrowLeftRight`,eyebrow:`Test it with numbers first`,eyebrowVn:`Hãy thử bằng số trước`,eyebrowFr:`Teste d’abord avec des nombres`,title:`The Words Come Backwards`,titleVn:`Thứ tự từ ngữ bị đảo ngược`,titleFr:`Les mots sont à l’envers`,ratio:50,inlineSvg:p.ORDER_FLIP,content:`You already know that **5 less than 12** is 7. Nobody says it is −7.

So you already know this rule. Putting letters in it changes nothing.`,contentVn:`Em vốn đã biết **5 less than 12** (12 bớt đi 5) bằng 7. Không ai nói là −7 cả.

Vậy là em đã biết quy tắc này rồi. Thay số bằng chữ cái cũng không đổi gì.`,contentFr:`Tu sais déjà que **5 less than 12** (5 de moins que 12) fait 7. Personne ne dit −7.

Donc tu connais déjà cette règle. Avec des lettres, rien ne change.`,notes:[{tone:`write`,text:`**Watch the order.** English often says the amount **first**, but we write the starting number **first**.
**h less than t** is $t − h$ · **k more than g** is $g + k$.`,textVn:`**Chú ý thứ tự.** Tiếng Anh thường nói phần thêm/bớt **trước**, nhưng ta lại viết số ban đầu **trước**.
**h less than t** là $t − h$ · **k more than g** là $g + k$.`,textFr:`**Attention à l’ordre.** L’anglais dit souvent la quantité **d’abord**, mais on écrit le nombre de départ **d’abord**.
**h less than t** donne $t − h$ · **k more than g** donne $g + k$.`}]},{layout:`split`,accent:_,icon:`ListChecks`,side:`left`,eyebrow:`Three to try`,eyebrowVn:`Ba câu để thử`,eyebrowFr:`Trois à essayer`,title:`Your Turn`,titleVn:`Đến lượt em`,titleFr:`À toi`,ratio:50,content:`Write an expression for each of these.

**a** 9 less than m
**b** d more than f
**c** p more than six times q`,contentVn:`Hãy viết biểu thức cho mỗi câu sau.

**a** 9 less than m
**b** d more than f
**c** p more than six times q`,contentFr:`Écris une expression pour chacune.

**a** 9 less than m
**b** d more than f
**c** p more than six times q`,reveal:{label:`Check your answers`,labelVn:`Kiểm tra đáp án`,labelFr:`Vérifie tes réponses`,answer:`**a** $m − 9$  **b** $f + d$  **c** $6q + p$

In **c**, "six times q" is $6q$ — build that first, then add p to it.`,answerVn:`**a** $m − 9$  **b** $f + d$  **c** $6q + p$

Ở câu **c**, "six times q" là $6q$ — hãy dựng phần đó trước, rồi cộng thêm p.`,answerFr:`**a** $m − 9$  **b** $f + d$  **c** $6q + p$

En **c**, «\xA0six times q\xA0» donne $6q$ — construis-le d’abord, puis ajoute p.`}},{layout:`compare`,accent:h,icon:`MessageSquare`,eyebrow:`Read both out loud — do A and B mean the same thing?`,eyebrowVn:`Đọc to cả hai câu — A và B có cùng nghĩa không?`,eyebrowFr:`Lis les deux à voix haute — A et B veulent-elles dire la même chose\xA0?`,title:`Spot the Difference`,titleVn:`Tìm điểm khác nhau`,titleFr:`Trouve la différence`,columns:[{heading:`Sentence A`,headingVn:`Câu A`,headingFr:`Phrase A`,accent:v,icon:`MessageSquare`,content:`Multiply x by 5 and **subtract 4**.`,contentVn:`Multiply x by 5 and **subtract 4**.`,contentFr:`Multiply x by 5 and **subtract 4**.`,caption:`Read it out loud.`,captionVn:`Hãy đọc to câu này.`,captionFr:`Lis-la à voix haute.`},{heading:`Sentence B`,headingVn:`Câu B`,headingFr:`Phrase B`,accent:g,icon:`MessageSquare`,content:`Multiply x by 5 and **subtract from 4**.`,contentVn:`Multiply x by 5 and **subtract from 4**.`,contentFr:`Multiply x by 5 and **subtract from 4**.`,caption:`Now read this one. What changed?`,captionVn:`Bây giờ đọc to câu này. Có gì thay đổi?`,captionFr:`Maintenant, lis celle-ci. Qu’est-ce qui a changé\xA0?`}]},{layout:`split`,accent:y,icon:`AlertTriangle`,eyebrow:`This one costs marks every year`,eyebrowVn:`Chỗ này năm nào cũng bị mất điểm`,eyebrowFr:`Celle-ci coûte des points chaque année`,title:`Subtract 4, or Subtract From 4?`,titleVn:`Trừ đi 4, hay lấy 4 trừ đi?`,titleFr:`Soustraire 4, ou soustraire de 4\xA0?`,ratio:50,inlineSvg:p.SUBTRACT_VS_FROM,content:`Same numbers. Same letter. Opposite answers — **6** and **−6**.

One word did that.`,contentVn:`Cùng những con số. Cùng chữ cái. Đáp án ngược nhau — **6** và **−6**.

Chỉ một từ đã làm nên điều đó.`,contentFr:`Mêmes nombres. Même lettre. Réponses opposées — **6** et **−6**.

Un seul mot a fait ça.`,notes:[{tone:`write`,text:`**subtract 4** → take 4 away from what you have: $5x − 4$
**subtract from 4** → start at 4 and take away what you have: $4 − 5x$`,textVn:`**subtract 4** (trừ đi 4) → lấy cái em đang có trừ đi 4: $5x − 4$
**subtract from 4** (lấy 4 trừ đi) → bắt đầu từ 4 rồi trừ đi cái em đang có: $4 − 5x$`,textFr:`**subtract 4** (soustraire 4) → enlève 4 à ce que tu as\xA0: $5x − 4$
**subtract from 4** (soustraire de 4) → pars de 4 et enlève ce que tu as\xA0: $4 − 5x$`}]},{layout:`split`,accent:y,icon:`Layers`,side:`left`,eyebrow:`Both traps in one question`,eyebrowVn:`Cả hai cái bẫy trong cùng một câu`,eyebrowFr:`Les deux pièges dans une question`,title:`The Result`,titleVn:`Kết quả`,titleFr:`Le résultat`,ratio:50,inlineSvg:p.ORDER_OF_OPS,content:`Build the multiplication first and give it a name: **3n is "the result"**.

Then the sentence is easy: subtract that result **from 25**.`,contentVn:`Hãy dựng phép nhân trước và đặt tên cho nó: **3n chính là "kết quả"**.

Rồi câu văn trở nên dễ: lấy **25** trừ đi kết quả đó.`,contentFr:`Construis d’abord la multiplication et donne-lui un nom\xA0: **3n est «\xA0le résultat\xA0»**.

Ensuite, la phrase est facile\xA0: soustrais ce résultat **de 25**.`,notes:[{tone:`write`,text:`**Order of operations:** do the **× and ÷ first**, then the + and −.
Multiply n by 3, then subtract the result from 25 → $25 − 3n$.`,textVn:`**Thứ tự phép tính:** làm **nhân và chia trước**, rồi mới cộng và trừ.
Nhân n với 3, rồi lấy 25 trừ đi kết quả → $25 − 3n$.`,textFr:`**Priorité des opérations\xA0:** fais **× et ÷ d’abord**, puis + et −.
Multiplie n par 3, puis soustrais le résultat de 25 → $25 − 3n$.`}]},{layout:`split`,accent:m,icon:`MessageSquare`,eyebrow:`Someone else’s answer`,eyebrowVn:`Đáp án của một bạn khác`,eyebrowFr:`La réponse de quelqu’un d’autre`,title:`Is Marcus Right?`,titleVn:`Bạn Marcus có đúng không?`,titleFr:`Marcus a-t-il raison\xA0?`,ratio:50,content:`Marcus is describing the expression $5 − 5x$ in words.

He writes: **"Multiply x by 5 then subtract 5."**

Is Marcus correct? Explain your answer to your partner.`,contentVn:`Bạn Marcus đang mô tả biểu thức $5 − 5x$ bằng lời.

Bạn ấy viết: **"Multiply x by 5 then subtract 5."**

Marcus có đúng không? Hãy giải thích cho bạn bên cạnh nghe.`,contentFr:`Marcus décrit l’expression $5 − 5x$ avec des mots.

Il écrit\xA0: **«\xA0Multiply x by 5 then subtract 5.\xA0»**

Marcus a-t-il raison\xA0? Explique ta réponse à ton voisin.`,reveal:{label:`Check your answer`,labelVn:`Kiểm tra đáp án`,labelFr:`Vérifie ta réponse`,answer:`**No.** What Marcus wrote describes $5x − 5$, which starts at $5x$.

The expression $5 − 5x$ starts at 5, so it needs one more word: **subtract FROM 5**.`,answerVn:`**Không.** Câu Marcus viết mô tả biểu thức $5x − 5$, tức là bắt đầu từ $5x$.

Biểu thức $5 − 5x$ bắt đầu từ 5, nên cần thêm một từ: **subtract FROM 5**.`,answerFr:`**Non.** Ce que Marcus a écrit décrit $5x − 5$, qui part de $5x$.

L’expression $5 − 5x$ part de 5, donc il faut un mot de plus\xA0: **subtract FROM 5**.`}},{layout:`split`,accent:h,icon:`ArrowLeftRight`,side:`left`,eyebrow:`Now go the other way`,eyebrowVn:`Bây giờ làm ngược lại`,eyebrowFr:`Maintenant, dans l’autre sens`,title:`From Algebra Back Into English`,titleVn:`Từ đại số dịch ngược về tiếng Anh`,titleFr:`De l’algèbre vers l’anglais`,ratio:50,content:`So far you turned English into algebra. Now write a **description in words** for each of these.

**a** $w + 5$      **b** $6k$      **c** $8 − y$      **d** $4pq$`,contentVn:`Đến giờ em đã dịch tiếng Anh sang đại số. Bây giờ hãy viết **mô tả bằng lời** cho mỗi biểu thức sau.

**a** $w + 5$      **b** $6k$      **c** $8 − y$      **d** $4pq$`,contentFr:`Jusqu’ici, tu as traduit l’anglais en algèbre. Maintenant, écris une **description en mots** pour chacune.

**a** $w + 5$      **b** $6k$      **c** $8 − y$      **d** $4pq$`,reveal:{label:`Check your answers`,labelVn:`Kiểm tra đáp án`,labelFr:`Vérifie tes réponses`,answer:`**a** Add 5 to w.  **b** Multiply k by 6.
**c** Subtract y **from** 8 — not "8 less than y".
**d** Multiply p by q, then multiply by 4.`,answerVn:`**a** Cộng 5 vào w.  **b** Nhân k với 6.
**c** Lấy 8 trừ đi y — **from** 8, không phải "8 less than y".
**d** Nhân p với q, rồi nhân với 4.`,answerFr:`**a** Ajoute 5 à w.  **b** Multiplie k par 6.
**c** Soustrais y de 8 — **from** 8, pas «\xA08 less than y\xA0».
**d** Multiplie p par q, puis multiplie par 4.`}},{layout:`split`,accent:_,icon:`Wind`,eyebrow:`Problem 1 — from your own Science practical`,eyebrowVn:`Bài 1 — từ chính buổi thực hành Khoa học của em`,eyebrowFr:`Problème 1 — tiré de ton TP de sciences`,title:`The Sealed Syringe`,titleVn:`Ống tiêm bịt kín`,titleFr:`La seringue fermée`,ratio:50,content:`In Science you pushed the plunger of a sealed syringe. A gas can be **compressed**; a liquid cannot.

The syringe holds **v ml** of air.

**a** Mr Bowen pushes until only half is left. Write an expression.
**b** He pushes 20 ml further. Write an expression now.`,contentVn:`Trong giờ Khoa học em đã đẩy pít-tông của một ống tiêm bịt kín. Chất khí có thể bị **nén (compressed)**; chất lỏng thì không.

Ống tiêm chứa **v ml** không khí.

**a** Thầy Bowen đẩy đến khi chỉ còn một nửa. Hãy viết biểu thức.
**b** Thầy đẩy thêm 20 ml nữa. Bây giờ hãy viết biểu thức.`,contentFr:`En sciences, tu as poussé le piston d’une seringue fermée. Un gaz peut être **comprimé (compressed)**\xA0; un liquide, non.

La seringue contient **v ml** d’air.

**a** M. Bowen pousse jusqu’à ce qu’il en reste la moitié. Écris une expression.
**b** Il pousse encore de 20 ml. Écris une expression maintenant.`,reveal:{label:`Check your answer`,labelVn:`Kiểm tra đáp án`,labelFr:`Vérifie ta réponse`,answer:`**a** $\\frac{v}{2}$  **b** $\\frac{v}{2} − 20$

If the syringe held water instead, neither answer would exist — you cannot compress a liquid.`,answerVn:`**a** $\\frac{v}{2}$  **b** $\\frac{v}{2} − 20$

Nếu trong ống tiêm là nước thì không có đáp án nào cả — chất lỏng không nén được.`,answerFr:`**a** $\\frac{v}{2}$  **b** $\\frac{v}{2} − 20$

Avec de l’eau dans la seringue, aucune réponse n’existerait — on ne peut pas comprimer un liquide.`}},{layout:`split`,accent:_,icon:`Snowflake`,side:`left`,eyebrow:`Problem 2`,eyebrowVn:`Bài 2`,eyebrowFr:`Problème 2`,title:`The Ice Cube Incident`,titleVn:`Sự cố viên đá`,titleFr:`L’incident des glaçons`,ratio:50,content:`Mr Bowen puts **n ice cubes** into a glass for his lesson on melting, then goes to answer the door.

**a** A helpful student adds three more. Write an expression for the number of ice cubes.
**b** Mr Bowen comes back forty minutes later. Write an expression for the number of ice cubes now.`,contentVn:`Thầy Bowen bỏ **n viên đá** vào một cái cốc cho bài học về sự nóng chảy, rồi đi ra mở cửa.

**a** Một bạn học sinh tốt bụng bỏ thêm ba viên nữa. Hãy viết biểu thức cho số viên đá.
**b** Bốn mươi phút sau thầy Bowen quay lại. Bây giờ hãy viết biểu thức cho số viên đá.`,contentFr:`M. Bowen met **n glaçons** dans un verre pour sa leçon sur la fusion, puis va ouvrir la porte.

**a** Un élève serviable en ajoute trois. Écris une expression pour le nombre de glaçons.
**b** M. Bowen revient quarante minutes plus tard. Écris une expression pour le nombre de glaçons maintenant.`,reveal:{label:`Check your answer`,labelVn:`Kiểm tra đáp án`,labelFr:`Vérifie ta réponse`,answer:`**a** $n + 3$.

**b** **Zero.** They melted. The water is all still there — but melted ice cubes are not ice cubes.

Mr Bowen taught the lesson without them.`,answerVn:`**a** $n + 3$.

**b** **Bằng không.** Chúng đã tan hết. Nước thì vẫn còn nguyên — nhưng đá đã tan thì không còn là viên đá nữa.

Thầy Bowen đành dạy bài đó mà không có viên đá nào.`,answerFr:`**a** $n + 3$.

**b** **Zéro.** Ils ont fondu. L’eau est toujours là — mais des glaçons fondus ne sont plus des glaçons.

M. Bowen a fait sa leçon sans eux.`}},{layout:`stack`,variant:`checklist`,accent:m,icon:`CheckCircle2`,columns:2,eyebrow:`Before you leave`,eyebrowVn:`Trước khi ra về`,eyebrowFr:`Avant de partir`,title:`Can You Do All Six?`,titleVn:`Em làm được cả sáu điều này chứ?`,titleFr:`Sais-tu faire les six\xA0?`,content:`> Your notebook should now have **8 written panels**. Count them. If one is missing, copy it from your partner before you go.`,contentVn:`> Trong vở của em bây giờ phải có **8 khung ghi chép**. Hãy đếm lại. Nếu thiếu khung nào, hãy chép của bạn bên cạnh trước khi ra về.`,contentFr:`> Ton cahier doit maintenant avoir **8 encadrés recopiés**. Compte-les. S’il en manque un, recopie celui de ton voisin avant de partir.`,items:[{text:`Say what an **expression** is, and why it has **no = sign**.`,textVn:`Nói được **biểu thức** là gì, và vì sao nó **không có dấu =**.`,textFr:`Dire ce qu’est une **expression**, et pourquoi elle n’a **pas de signe =**.`},{text:`Choose a letter to **represent** a number, and say what it represents.`,textVn:`Chọn được một chữ cái để **đại diện cho** một số, và nói rõ nó đại diện cho cái gì.`,textFr:`Choisir une lettre pour **représenter** un nombre, et dire ce qu’elle représente.`},{text:`Leave $c − 50$ alone without thinking you got it wrong.`,textVn:`Để yên $c − 50$ mà không nghĩ là mình làm sai.`,textFr:`Laisser $c − 50$ tel quel sans croire que tu t’es trompé.`},{text:`Write $3 × s$ as $3s$ and $a × b$ as $ab$.`,textVn:`Viết $3 × s$ thành $3s$ và $a × b$ thành $ab$.`,textFr:`Écrire $3 × s$ comme $3s$ et $a × b$ comme $ab$.`},{text:`Turn **more / less / times / half**, **total** and **difference** into operations.`,textVn:`Chuyển **more / less / times / half**, **total** và **difference** thành phép tính.`,textFr:`Changer **more / less / times / half**, **total** et **difference** en opérations.`},{text:`Write **h less than t** as $t − h$, and tell **subtract 4** from **subtract from 4**.`,textVn:`Viết **h less than t** thành $t − h$, và phân biệt **subtract 4** với **subtract from 4**.`,textFr:`Écrire **h less than t** comme $t − h$, et distinguer **subtract 4** de **subtract from 4**.`}]},{layout:`callout`,accent:y,icon:`Home`,eyebrow:`Homework Assignment`,eyebrowVn:`Bài tập về nhà`,eyebrowFr:`Devoirs`,title:`For Next Lesson`,titleVn:`Cho tiết học sau`,titleFr:`Pour la prochaine leçon`,content:`Read every question **twice** before you write. In this exercise the reading is the hard part, not the maths.`,contentVn:`Hãy đọc mỗi câu hỏi **hai lần** trước khi viết. Trong bài tập này, phần khó là đọc hiểu, không phải phần toán.`,contentFr:`Lis chaque question **deux fois** avant d’écrire. Ici, le plus dur, c’est la lecture, pas les maths.`,notes:[{tone:`homework`,badge:`Workbook 2.1 · pages 20–23`,badgeVn:`Vở bài tập 2.1 · trang 20–23`,badgeFr:`Cahier d’exercices 2.1 · pages 20–23`,icon:`Pencil`,text:`**Focus** — Q1 to 5. Everybody.
**Practice** — Q6 to 10. Q9 is the one from today.
**Challenge** — Q11 to 14. An attempt beats a blank.`,textVn:`**Focus** — câu 1 đến 5. Tất cả các em.
**Practice** — câu 6 đến 10. Câu 9 chính là câu hôm nay đã học.
**Challenge** — câu 11 đến 14. Làm sai vẫn hơn bỏ trống.`,textFr:`**Focus** — Q1 à 5. Tout le monde.
**Practice** — Q6 à 10. La Q9 est celle d’aujourd’hui.
**Challenge** — Q11 à 14. Un essai vaut mieux qu’une page blanche.`}]},{layout:`hero`,color:m,icon:`CheckCircle2`,brand:`Year 7 Mathematics`,brandVn:`Toán Lớp 7`,brandFr:`Maths 7e année`,title:`Lesson Complete!`,titleVn:`Hoàn thành bài học!`,titleFr:`Leçon terminée\xA0!`,subtitle:`A letter is just a number you have not been told yet. Exit question: **a beaker holds $p$ ml. Mr Bowen pours out 60 ml. Write the expression.**`,subtitleVn:`Chữ cái chỉ là một con số chưa ai nói cho em biết. Câu hỏi ra về: **một cốc chứa $p$ ml. Thầy Bowen rót ra 60 ml. Hãy viết biểu thức.**`,subtitleFr:`Une lettre, c’est juste un nombre qu’on ne t’a pas encore dit. Question de sortie\xA0: **un bécher contient $p$ ml. M. Bowen en verse 60 ml. Écris l’expression.**`}],plan:{duration:`50 minutes`,objective:`Students can choose a letter to represent a number they do not know and say what it represents; can leave an expression such as c − 50 unfinished without believing they have made a mistake; know Cambridge's definition of an expression, including that it has no = sign; can write 3 × s as 3s, a × b as ab and s ÷ 2 as s over 2; can turn more than, less than, times as much, half as much, total and difference into +, −, × and ÷; and can handle the three pieces of English that decide the marks in Exercise 2.1 — that "h less than t" is written t − h, that "subtract 4" and "subtract from 4" give opposite answers, and that "subtract the result from 25" is 25 − 3n, which needs the order of operations and the flip at the same time.`,materials:[`Projector / TV for the lesson deck`,`Mini whiteboards + markers (one per pair)`,`Student notebooks`,`Workbook Unit 2, Section 2.1 (pages 20–23) for the homework`,`Optional, for the opening: a glass of water, and the sealed syringe from the Science 2.1 practical`],vocab:[{term:`Expression`,def:`the section's only margin key word. Cambridge's wording: a statement that contains letters and sometimes numbers, but has no = sign. For example n + 7, 4m, x + 2 (Vietnamese: biểu thức)`},{term:`Represent`,def:`the book's own verb, and the one Q10 marks them on — "make sure you write what your letters represent". Use it rather than "stands for", every time`},{term:`Total / difference`,def:`add them / subtract them. Q13 uses both words without ever defining either, and a student who reads "difference" as "the answer" loses the mark`},{term:`Times as much / half as much`,def:`multiply / divide by 2. The book alternates "as many" (things you count) with "as much" (amounts); both mean the same operation`},{term:`Subtract from`,def:`the preposition that flips the order. "Subtract 4" is 5x − 4; "subtract from 4" is 4 − 5x. Exercise 2.1 Q9 is built entirely on it`},{term:`The result`,def:`Q7f says "multiply the number by 3, then subtract the result from 25". "The result" means the 3n you just built — naming it out loud is what makes 25 − 3n obvious`},{term:`Order of operations`,def:`the workbook flags it in two separate Tips and explains it in neither: × and ÷ happen before + and −, in algebra exactly as in arithmetic`},{term:`Particle · dissolve · compress`,def:`borrowed from Science 2.1 and carrying the maths. Say them out loud — this class already owns these words, and they make the letter concrete`}],timeline:[{time:`0–4 min`,phase:`Starter`,detail:`Title slide. "How many particles in one drop of water?" — 30 seconds on whiteboards. Expect blanks, shrugs and a few wild guesses. Do not correct anyone; the blank board is the point and slide 2 pays it off.`},{time:`4–9 min`,phase:`The hook (science bridge)`,detail:`Slide 2, QUESTION ONLY. Say plainly: nobody wrote a number, and that is not a Science failure — the particles are really there and there really is a number. Then ask the question the lesson answers: how do we write about a number nobody can count? Let pairs sit in it for two minutes. Do NOT hand them the letter.`},{time:`9–13 min`,phase:`Name it`,detail:`Slide 3: let n be that number. FIRST copy-down panel. Use the book's verb — n REPRESENTS the number of particles — and say the second half twice: n is the number of particles, not a particle. Students who read n as "a particle" write nonsense for the rest of the unit.`},{time:`13–20 min`,phase:`THE WALL`,detail:`Slide 4, the coffee table. The two known rows finish; the third does not. This is the sticking point of the whole section: students believe an answer must be a single number, so they either invent one or leave it blank. Say explicitly, more than once: "c − 50 is the finished answer. You are allowed to stop." Slide 5 then names it — SECOND panel, Cambridge's exact sentence including "no = sign" — and slide 6 checks it (A, C, D).`},{time:`20–25 min`,phase:`Notation`,detail:`Slide 7. THIRD panel. The workbook states this only in a Tip and then assumes it from page 21 onwards, so it gets a slide here: 3s means 3 × s, ab means a × b, s over 2 means s ÷ 2, and the number always goes in front. Open the reveal and do the four quick ones. Q11d and Q12d in the homework are unanswerable without this.`},{time:`25–33 min`,phase:`The four phrases`,detail:`Slide 8 is QUESTION ONLY — two grams more than Mr Bowen, on whiteboards, before any list exists. Slide 9 is the list, FOURTH panel; point at the salt as you say it, because dissolved salt is still s grams and that is exactly what a letter is. Slide 10 drills it on four beakers. Slide 11 adds total and difference, FIFTH panel. Watch for w5 instead of 5w and correct on the spot.`},{time:`33–39 min`,phase:`The order flips`,detail:`Slide 12 QUESTION ONLY: h − t or t − h? Take a show of hands and write the split on the board — the disagreement is worth more than the answer handed over. Slide 13 settles it with NUMBERS first ("5 less than 12 is 7", which nobody disputes) and only then with letters. SIXTH panel. Slide 14 drills three.`},{time:`39–46 min`,phase:`Subtract from, and the result`,detail:`Slide 15 QUESTION ONLY: read A and B aloud, ask whether one word can change the answer. Slide 16 shows 6 against −6 — SEVENTH panel. Slide 17 is Q7f, EIGHTH panel: build 3n first and name it "the result", then the sentence reads itself. Slide 18 is Marcus (Q9) and slide 19 runs the translation backwards, which nothing else in the deck rehearses. THIS IS THE SECTION TO PROTECT.`},{time:`46–50 min`,phase:`Problems, recap + homework`,detail:`Syringe and ice cubes if the time is there. Then the six-point checklist and the copy-count: 8 panels. Set Workbook 2.1, pages 20–23 — note that Exercise 2.1 runs to Q14, not Q12. Exit question: a beaker holds p ml, pour out 60, which is p − 60.`}],answers:[{q:`Starter / hook — how many particles in one drop of water?`,a:`Unknowable in class, and that is the correct answer. (For your own back pocket: about 1.7 × 10^21 molecules in a 0.05 ml drop. Do not put that on the board — it replaces one uncountable thing with another and kills the slide.)`},{q:`Slide 4 — drink 50 ml from each cup`,a:`200 − 50 = 150 · 300 − 50 = 250 · c − 50, which stays as c − 50. The third one is the whole section.`},{q:`Slide 6 — which are expressions?`,a:`A (4m), C (x + 2) and D (n − 3). B is 7 + 2 = 9 — it has an = sign and no letter. E is y = 5x — it has an = sign, which makes it a formula, not an expression. (Formula is the key word of 2.2; naming it here is fine but do not dwell.)`},{q:`Slide 7 reveal — write the short way`,a:`a: 7k · b: mn · c: 4ab · d: p over 3. Accept p ÷ 3 today, but show the fraction, because the workbook writes it that way.`},{q:`Slide 8 — two grams more than Mr Bowen`,a:`s + 2. Posed before the list of phrases exists, so expect some blanks; that is fine and intended.`},{q:`Slide 10 — the four beakers`,a:`a: w + 30 · b: 5w · c: w − 40 · d: w over 2. The predictable error is w5 for part b — the number goes in front, always.`},{q:`Slide 11 reveal — three large and five small beakers`,a:`3a + 5b. Two sizes, two letters. A student who writes 8ab has merged two different quantities into one.`},{q:`Slide 12 — h less than t`,a:`t − h. Check it with numbers if anyone resists: 5 less than 12 is 12 − 5 = 7, not 5 − 12 = −7.`},{q:`Slide 14 — three to try`,a:`a: m − 9 · b: f + d · c: 6q + p. Part c is the one to slow down on — build "six times q" as 6q first, then add p. It is the shape of Challenge Q11c.`},{q:`Slides 15/16 — subtract 4 against subtract from 4`,a:`5x − 4 and 4 − 5x. With x = 2 they give 10 − 4 = 6 and 4 − 10 = −6. Opposite signs, from one word.`},{q:`Slide 17 — multiply n by 3, then subtract the result from 25`,a:`25 − 3n. Two traps at once: the multiplication happens first (so it is 3n, not 3 × something later), and "from 25" means you start at 25. Not 3n − 25.`},{q:`Slide 18 — is Marcus right?`,a:`No. His description, "multiply x by 5 then subtract 5", is 5x − 5. The expression 5 − 5x starts at 5, so the description needs "subtract FROM 5". This is Exercise 2.1 Q9 and is worth the time.`},{q:`Slide 19 — describe these expressions in words`,a:`a: add 5 to w (or "5 more than w") · b: multiply k by 6 · c: subtract y FROM 8 — a student who writes "8 less than y" has it backwards · d: multiply p by q, then multiply by 4. Part c is the whole point of the slide.`},{q:`Problem 1 — the sealed syringe`,a:`a: v over 2 · b: v over 2 − 20. Tie it back to Science 2.1: a gas compresses because its particles are far apart; a liquid does not, so with water in the syringe neither answer would exist.`},{q:`Problem 2 — the ice cube incident`,a:`a: n + 3 · b: zero. They melted. Read it completely straight and do not explain the joke. If a student objects that the water is still there, agree with them warmly — that is conservation of mass from Science, and they are right about the water and wrong about the ice cubes.`},{q:`Exit question — a beaker holds p ml, pour out 60`,a:`p − 60.`}],notes:`THE DECK RUNS ON THE SCIENCE UNIT, DELIBERATELY. Science 2.1 left this class holding a quantity that is unarguably real and unarguably uncountable — the number of particles — which is the cleanest door into algebra they will ever be offered. Slide 2 walks through it, and salt (slide 9), beakers (slide 11) and the sealed syringe (slide 20) keep it open. Say "particle", "dissolve" and "compress" out loud: this class owns those words in English already, so they carry the maths for free. THE VOCABULARY IS THE WORKBOOK'S. Slide 5 is Cambridge's own sentence, including the "no = sign" clause. The verb is REPRESENT throughout, because Q10 marks them on writing what their letters represent — say "represents", not "stands for". Total and difference are Q13's words. The notation slide is the book's two Tips promoted to a slide, because Q11d (three times a multiplied by b) and Q12d (7pq) cannot be answered without them. THE WALL IS SLIDE 4. The obstacle is never "what does c mean". It is that c − 50 does not equal anything, so students assume they have failed and either invent a number or leave it blank. A class that believes slide 4 can do the whole of Unit 2; a class that does not will fight every exercise in it. Give it the full seven minutes even if that costs you a word problem. FOUR SLIDES ARE QUESTION-ONLY — 2, 8, 12 and 15 — and none has an answer anywhere on it. Take the guesses, write the split on the board where it is a show of hands, and only then move on. On slide 12 the disagreement between h − t and t − h is worth more than the correct answer handed over. IF YOU ARE BEHIND, CUT IN THIS ORDER: the ice cubes (slide 21), then the syringe (slide 20), then total and difference (slide 11). Do NOT cut slides 15 to 19. Those five contain no new arithmetic at all and are exactly where Exercise 2.1 Q7f, Q9, Q11 and Q12 are won — this class can do the algebra and still lose those marks on the reading. SLIDE 19 IS THE ONE PEOPLE SKIP. Running the translation backwards — expression into English — is Challenge Q12, and it is the only slide in the deck that rehearses it. Part c (8 − y) is the payoff: a student who writes "8 less than y" has just proved they learned the pattern rather than the language. THE PREDICTABLE ERRORS, in the order they appear: reading n as "a particle" rather than "the number of particles"; leaving c − 50 blank; writing w5 instead of 5w; writing h − t; describing 5 − 5x as "multiply by 5 then subtract 5"; and answering 3n − 25 for Q7f. Every one is a reading error, not a maths error, and every one has a slide pointed at it. EXERCISE 2.1 RUNS TO Q14, NOT Q12. Q13 (two pieces of wood, total and difference) and Q14 (p + q = −2, pq = −8) are on page 24, above the 2.2 heading, and are easy to miss. Q14 needs negative-number work from Unit 1.2 and is a genuine stretch — set it, but do not expect it back from everyone. Anything students must copy is in an orange "Write This Down" panel; everything else is discussion. Eight panels is a lot for one period, which is why the recap asks them to count. This deck has no photographs — all eight figures are authored SVG in diagrams.js, so there is no images/CREDITS.json for 2.1. Expressions have no real-world object to photograph, and a decorative stock picture on a projector is one more thing between the class and the sentence.`}};export{b as default};