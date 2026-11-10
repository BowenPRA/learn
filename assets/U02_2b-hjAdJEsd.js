var e=`#2b2b2b`,t=`#c25e12`,n=`#7c8a95`,r=`#b6c1c9`,i=`#f3f6f8`,a=`#9aa8b4`,o=`#bfe0f2`,s=`#2f7fb0`,c=`#c8102e`,l=`#e8721c`,u=`#8a949c`,d=`Inter, 'Segoe UI', system-ui, sans-serif`,f=(e,t)=>`<rect x="0" y="0" width="${e}" height="${t}" rx="14" fill="#ffffff"/>
    <rect x="0.75" y="0.75" width="${e-1.5}" height="${t-1.5}" rx="13" fill="none" stroke="#e2e8f0" stroke-width="1.5"/>`,p=(e,t,r,i)=>`<line x1="${e}" y1="${t}" x2="${r}" y2="${i}" stroke="${n}" stroke-width="1.6"/>
    <circle cx="${r}" cy="${i}" r="3.2" fill="${n}"/>`,m=(e,t,n)=>`<line x1="${e}" y1="${n}" x2="${t}" y2="${n}" stroke="${r}" stroke-width="1.6"/>`,h=(e,t,n)=>`<line x1="${e}" y1="${t}" x2="${e}" y2="${n}" stroke="${r}" stroke-width="1.6"/>`,g=(e,t,n,r)=>`<path d="M ${e} ${t} v ${r-12} q 0 12 12 12 h ${n-24} q 12 0 12 -12 v -${r-12}" fill="none" stroke="${a}" stroke-width="3"/>
    <line x1="${e-8}" y1="${t}" x2="${e+n+8}" y2="${t}" stroke="${a}" stroke-width="3" stroke-linecap="round"/>
    <ellipse cx="${e+n/2}" cy="${t+r+8}" rx="${n/2+6}" ry="6" fill="none" stroke="${a}" stroke-width="3"/>`,_=(e,t,n,r,i,a=5)=>`<path d="M ${e+2} ${i} q ${n/2-2} ${a} ${n-4} 0 v ${t+r-i-12} q 0 12 -12 12 h -${n-4-24} q -12 0 -12 -12 Z" fill="${o}" stroke="${s}" stroke-width="2"/>`,v=(e,t,n,r,i=10)=>{let o=``;for(let s=0;s<=r;s++)o+=`<line x1="${e}" y1="${t-s*n}" x2="${e+(s%5==0?i+6:i)}" y2="${t-s*n}" stroke="${a}" stroke-width="1.8"/>`;return o},y=(t,n,r,i)=>`<rect x="${t-8}" y="${n}" width="16" height="${r-n}" rx="8" fill="#ffffff" stroke="${e}" stroke-width="2.2"/>
    <circle cx="${t}" cy="${r}" r="15" fill="${c}" stroke="${e}" stroke-width="2.2"/>
    <rect x="${t-7/2}" y="${i}" width="7" height="${r-i}" fill="${c}"/>`,b={MENISCUS:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 760 430" class="w-full h-full">
    ${f(760,430)}

    <text x="380" y="44" font-family="${d}" font-size="20" font-weight="bold" fill="${e}" text-anchor="middle">Read from the bottom of the meniscus, with your eye level</text>

    ${g(150,80,110,250)}
    ${v(150,322,24.8,10)}
    ${_(150,80,110,250,216,7)}

    <text x="120" y="227" font-family="${d}" font-size="15" fill="${e}" text-anchor="end">40</text>
    <text x="120" y="277" font-family="${d}" font-size="15" fill="${e}" text-anchor="end">20</text>
    <text x="120" y="178" font-family="${d}" font-size="15" fill="${e}" text-anchor="end">60</text>
    <text x="240" y="72" font-family="${d}" font-size="14" fill="${e}" text-anchor="middle">cm³</text>

    ${p(300,132,232,214)}
    <text x="308" y="128" font-family="${d}" font-size="16" font-weight="bold" fill="${t}">the meniscus</text>
    <text x="308" y="149" font-family="${d}" font-size="13" fill="${e}">the curved surface</text>

    <line x1="205" y1="223" x2="560" y2="223" stroke="${e}" stroke-width="1.6" stroke-dasharray="7 6"/>
    <text x="308" y="246" font-family="${d}" font-size="16" font-weight="bold" fill="${t}">read here — the bottom of the curve</text>

    <ellipse cx="620" cy="223" rx="46" ry="26" fill="#ffffff" stroke="${e}" stroke-width="2.4"/>
    <circle cx="606" cy="223" r="12" fill="#ffffff" stroke="${e}" stroke-width="2.4"/>
    <circle cx="606" cy="223" r="5.5" fill="${e}"/>
    <text x="620" y="282" font-family="${d}" font-size="15" font-weight="bold" fill="${e}" text-anchor="middle">your eye, level</text>
    <text x="620" y="301" font-family="${d}" font-size="15" font-weight="bold" fill="${e}" text-anchor="middle">with the surface</text>

    <text x="205" y="404" font-family="${d}" font-size="17" font-weight="bold" fill="${s}" text-anchor="middle">this reads 40 cm³</text>
  </svg>`,CYLINDERS_Q1:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 760 420" class="w-full h-full">
    ${f(760,420)}

    ${g(70,70,96,250)}
    ${v(70,312,24.6,10)}
    ${_(70,70,96,250,263,6)}
    <text x="118" y="46" font-family="${d}" font-size="20" font-weight="bold" fill="${e}" text-anchor="middle">A</text>
    <text x="44" y="267" font-family="${d}" font-size="14" fill="${e}" text-anchor="end">20</text>
    <text x="44" y="144" font-family="${d}" font-size="14" fill="${e}" text-anchor="end">70</text>

    ${g(330,70,96,250)}
    ${v(330,312,24.6,10)}
    ${_(330,70,96,250,165,6)}
    <text x="378" y="46" font-family="${d}" font-size="20" font-weight="bold" fill="${e}" text-anchor="middle">B</text>
    <text x="304" y="169" font-family="${d}" font-size="14" fill="${e}" text-anchor="end">60</text>
    <text x="304" y="292" font-family="${d}" font-size="14" fill="${e}" text-anchor="end">10</text>

    ${g(590,70,96,250)}
    ${v(590,312,24.6,10)}
    ${_(590,70,96,250,92,6)}
    <text x="638" y="46" font-family="${d}" font-size="20" font-weight="bold" fill="${e}" text-anchor="middle">C</text>
    <text x="564" y="96" font-family="${d}" font-size="14" fill="${e}" text-anchor="end">90</text>
    <text x="564" y="219" font-family="${d}" font-size="14" fill="${e}" text-anchor="end">40</text>

    <text x="380" y="404" font-family="${d}" font-size="16" fill="${t}" text-anchor="middle">Each small line is 10 cm³. What volume is in each cylinder?</text>
  </svg>`,THERMOMETER:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 620 440" class="w-full h-full">
    ${f(620,440)}

    <text x="310" y="42" font-family="${d}" font-size="20" font-weight="bold" fill="${e}" text-anchor="middle">The liquid rises as it gets hotter</text>

    ${y(250,70,372,204)}

    <line x1="266" y1="110" x2="280" y2="110" stroke="${e}" stroke-width="1.8"/>
    <line x1="266" y1="162" x2="280" y2="162" stroke="${e}" stroke-width="1.8"/>
    <line x1="266" y1="214" x2="280" y2="214" stroke="${e}" stroke-width="1.8"/>
    <line x1="266" y1="266" x2="280" y2="266" stroke="${e}" stroke-width="1.8"/>
    <line x1="266" y1="318" x2="280" y2="318" stroke="${e}" stroke-width="1.8"/>
    <text x="292" y="115" font-family="${d}" font-size="15" fill="${e}">40</text>
    <text x="292" y="167" font-family="${d}" font-size="15" fill="${e}">30</text>
    <text x="292" y="219" font-family="${d}" font-size="15" fill="${e}">20</text>
    <text x="292" y="271" font-family="${d}" font-size="15" fill="${e}">10</text>
    <text x="292" y="323" font-family="${d}" font-size="15" fill="${e}">0</text>
    <text x="258" y="66" font-family="${d}" font-size="14" fill="${e}" text-anchor="middle">°C</text>

    ${p(410,372,262,372)}
    <text x="418" y="377" font-family="${d}" font-size="16" font-weight="bold" fill="${t}">the bulb</text>
    ${p(410,300,250,300)}
    <text x="418" y="305" font-family="${d}" font-size="16" font-weight="bold" fill="${t}">the liquid</text>

    <line x1="150" y1="204" x2="360" y2="204" stroke="${e}" stroke-width="1.6" stroke-dasharray="7 6"/>
    <text x="150" y="196" font-family="${d}" font-size="15" font-weight="bold" fill="${e}">read the top of the liquid, at eye level</text>
    <text x="470" y="210" font-family="${d}" font-size="18" font-weight="bold" fill="${c}">22 °C</text>
  </svg>`,THERMOMETERS_Q2:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 760 420" class="w-full h-full">
    ${f(760,420)}

    ${y(150,70,350,206)}
    <text x="150" y="392" font-family="${d}" font-size="20" font-weight="bold" fill="${e}" text-anchor="middle">A</text>
    <line x1="164" y1="120" x2="176" y2="120" stroke="${e}" stroke-width="1.6"/>
    <line x1="164" y1="177" x2="176" y2="177" stroke="${e}" stroke-width="1.6"/>
    <line x1="164" y1="235" x2="176" y2="235" stroke="${e}" stroke-width="1.6"/>
    <line x1="164" y1="292" x2="176" y2="292" stroke="${e}" stroke-width="1.6"/>
    <line x1="164" y1="350" x2="176" y2="350" stroke="${e}" stroke-width="1.6"/>
    <text x="184" y="125" font-family="${d}" font-size="13" fill="${e}">40</text>
    <text x="184" y="182" font-family="${d}" font-size="13" fill="${e}">30</text>
    <text x="184" y="240" font-family="${d}" font-size="13" fill="${e}">20</text>
    <text x="184" y="297" font-family="${d}" font-size="13" fill="${e}">10</text>
    <text x="184" y="355" font-family="${d}" font-size="13" fill="${e}">0</text>

    ${y(380,70,350,264)}
    <text x="380" y="392" font-family="${d}" font-size="20" font-weight="bold" fill="${e}" text-anchor="middle">B</text>
    <line x1="394" y1="120" x2="406" y2="120" stroke="${e}" stroke-width="1.6"/>
    <line x1="394" y1="177" x2="406" y2="177" stroke="${e}" stroke-width="1.6"/>
    <line x1="394" y1="235" x2="406" y2="235" stroke="${e}" stroke-width="1.6"/>
    <line x1="394" y1="292" x2="406" y2="292" stroke="${e}" stroke-width="1.6"/>
    <line x1="394" y1="350" x2="406" y2="350" stroke="${e}" stroke-width="1.6"/>
    <text x="414" y="125" font-family="${d}" font-size="13" fill="${e}">40</text>
    <text x="414" y="182" font-family="${d}" font-size="13" fill="${e}">30</text>
    <text x="414" y="240" font-family="${d}" font-size="13" fill="${e}">20</text>
    <text x="414" y="297" font-family="${d}" font-size="13" fill="${e}">10</text>
    <text x="414" y="355" font-family="${d}" font-size="13" fill="${e}">0</text>

    ${y(610,70,350,120)}
    <text x="610" y="392" font-family="${d}" font-size="20" font-weight="bold" fill="${e}" text-anchor="middle">C</text>
    <line x1="624" y1="120" x2="636" y2="120" stroke="${e}" stroke-width="1.6"/>
    <line x1="624" y1="177" x2="636" y2="177" stroke="${e}" stroke-width="1.6"/>
    <line x1="624" y1="235" x2="636" y2="235" stroke="${e}" stroke-width="1.6"/>
    <line x1="624" y1="292" x2="636" y2="292" stroke="${e}" stroke-width="1.6"/>
    <line x1="624" y1="350" x2="636" y2="350" stroke="${e}" stroke-width="1.6"/>
    <text x="644" y="125" font-family="${d}" font-size="13" fill="${e}">40</text>
    <text x="644" y="182" font-family="${d}" font-size="13" fill="${e}">30</text>
    <text x="644" y="240" font-family="${d}" font-size="13" fill="${e}">20</text>
    <text x="644" y="297" font-family="${d}" font-size="13" fill="${e}">10</text>
    <text x="644" y="355" font-family="${d}" font-size="13" fill="${e}">0</text>

    <text x="380" y="36" font-family="${d}" font-size="16" fill="${t}" text-anchor="middle">The numbers are °C. What temperature does each thermometer show?</text>
  </svg>`,APPARATUS:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 820 560" class="w-full h-full">
    ${f(820,560)}

    <text x="410" y="42" font-family="${d}" font-size="20" font-weight="bold" fill="${e}" text-anchor="middle">Heating water — set it up like this</text>

    <!-- clamp stand -->
    <rect x="150" y="470" width="150" height="16" rx="3" fill="${u}"/>
    <rect x="205" y="120" width="12" height="352" fill="${u}"/>
    <rect x="217" y="150" width="150" height="12" fill="${u}"/>
    <rect x="360" y="140" width="18" height="34" rx="4" fill="none" stroke="${e}" stroke-width="2.4"/>

    <!-- thermometer, bulb in the water, not touching the bottom -->
    ${y(430,130,360,210)}

    <!-- beaker of water on the gauze -->
    <path d="M 372 300 v 78 q 0 8 8 8 h 100 q 8 0 8 -8 v -78" fill="none" stroke="${a}" stroke-width="3"/>
    <path d="M 376 336 v 42 q 0 8 8 8 h 92 q 8 0 8 -8 v -42 Z" fill="${o}" stroke="${s}" stroke-width="2"/>

    <!-- gauze on the tripod -->
    <rect x="352" y="392" width="156" height="8" fill="${u}"/>
    <!-- tripod legs -->
    <line x1="372" y1="400" x2="352" y2="470" stroke="${e}" stroke-width="3"/>
    <line x1="488" y1="400" x2="508" y2="470" stroke="${e}" stroke-width="3"/>
    <line x1="430" y1="400" x2="430" y2="470" stroke="${e}" stroke-width="3"/>

    <!-- Bunsen burner + flame -->
    <path d="M 414 468 q 16 -34 16 -60" fill="none" stroke="${l}" stroke-width="3"/>
    <path d="M 446 468 q -16 -34 -16 -60" fill="none" stroke="${l}" stroke-width="3"/>
    <path d="M 430 470 q -14 -30 0 -64 q 14 34 0 64 Z" fill="${l}" opacity="0.55"/>
    <rect x="424" y="470" width="12" height="40" fill="${u}"/>
    <ellipse cx="430" cy="512" rx="28" ry="7" fill="${u}"/>

    <!-- heat-proof mat -->
    <rect x="150" y="486" width="360" height="14" rx="3" fill="#d8c7a8" stroke="${e}" stroke-width="1.6"/>

    ${p(560,150,442,170)}
    <text x="568" y="155" font-family="${d}" font-size="16" font-weight="bold" fill="${t}">thermometer</text>
    <text x="568" y="176" font-family="${d}" font-size="12" fill="${e}">bulb in the water,</text>
    <text x="568" y="192" font-family="${d}" font-size="12" fill="${e}">not touching the bottom</text>
    ${p(560,350,486,358)}
    <text x="568" y="355" font-family="${d}" font-size="16" font-weight="bold" fill="${t}">beaker of water</text>
    ${p(560,396,500,396)}
    <text x="568" y="401" font-family="${d}" font-size="16" font-weight="bold" fill="${t}">gauze on a tripod</text>
    ${p(560,470,452,452)}
    <text x="568" y="475" font-family="${d}" font-size="16" font-weight="bold" fill="${t}">Bunsen burner</text>
    ${p(250,524,300,500)}
    <text x="250" y="540" font-family="${d}" font-size="16" font-weight="bold" fill="${t}" text-anchor="middle">heat-proof mat</text>
    ${p(150,156,210,200)}
    <text x="142" y="150" font-family="${d}" font-size="16" font-weight="bold" fill="${t}" text-anchor="end">clamp stand</text>
  </svg>`,RESULTS_TABLE:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 560 380" class="w-full h-full">
    ${f(560,380)}

    <rect x="60" y="40" width="220" height="48" fill="${i}" stroke="${r}" stroke-width="1.6"/>
    <rect x="280" y="40" width="220" height="48" fill="${i}" stroke="${r}" stroke-width="1.6"/>
    <text x="170" y="70" font-family="${d}" font-size="16" font-weight="bold" fill="${e}" text-anchor="middle">Time in minutes</text>
    <text x="390" y="70" font-family="${d}" font-size="16" font-weight="bold" fill="${e}" text-anchor="middle">Temperature in °C</text>

    ${m(60,500,88)}
    ${m(60,500,136)}
    ${m(60,500,184)}
    ${m(60,500,232)}
    ${m(60,500,280)}
    ${m(60,500,328)}
    ${h(60,40,328)}
    ${h(280,40,328)}
    ${h(500,40,328)}

    <text x="170" y="120" font-family="${d}" font-size="16" fill="${e}" text-anchor="middle">0</text>
    <text x="170" y="168" font-family="${d}" font-size="16" fill="${e}" text-anchor="middle">1</text>
    <text x="170" y="216" font-family="${d}" font-size="16" fill="${e}" text-anchor="middle">2</text>
    <text x="170" y="264" font-family="${d}" font-size="16" fill="${e}" text-anchor="middle">3</text>
    <text x="170" y="312" font-family="${d}" font-size="16" fill="${e}" text-anchor="middle">4</text>

    <text x="280" y="360" font-family="${d}" font-size="15" font-weight="bold" fill="${t}" text-anchor="middle">keep going until the water is boiling</text>
  </svg>`,HEATING_CURVE:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 820 460" class="w-full h-full">
    ${f(820,460)}

    <text x="420" y="40" font-family="${d}" font-size="20" font-weight="bold" fill="${e}" text-anchor="middle">What the temperature does as you heat water</text>

    <!-- axes -->
    <line x1="110" y1="80" x2="110" y2="380" stroke="${e}" stroke-width="2.4"/>
    <line x1="110" y1="380" x2="760" y2="380" stroke="${e}" stroke-width="2.4"/>

    <!-- y gridlines + labels (0..100 by 20) -->
    <line x1="110" y1="320" x2="760" y2="320" stroke="${r}" stroke-width="1.2"/>
    <line x1="110" y1="260" x2="760" y2="260" stroke="${r}" stroke-width="1.2"/>
    <line x1="110" y1="200" x2="760" y2="200" stroke="${r}" stroke-width="1.2"/>
    <line x1="110" y1="140" x2="760" y2="140" stroke="${r}" stroke-width="1.2"/>
    <text x="98" y="385" font-family="${d}" font-size="14" fill="${e}" text-anchor="end">0</text>
    <text x="98" y="325" font-family="${d}" font-size="14" fill="${e}" text-anchor="end">20</text>
    <text x="98" y="265" font-family="${d}" font-size="14" fill="${e}" text-anchor="end">40</text>
    <text x="98" y="205" font-family="${d}" font-size="14" fill="${e}" text-anchor="end">60</text>
    <text x="98" y="145" font-family="${d}" font-size="14" fill="${e}" text-anchor="end">80</text>
    <text x="98" y="125" font-family="${d}" font-size="14" fill="${e}" text-anchor="end">100</text>

    <!-- x labels -->
    <text x="110" y="402" font-family="${d}" font-size="14" fill="${e}" text-anchor="middle">0</text>
    <text x="240" y="402" font-family="${d}" font-size="14" fill="${e}" text-anchor="middle">2</text>
    <text x="370" y="402" font-family="${d}" font-size="14" fill="${e}" text-anchor="middle">4</text>
    <text x="500" y="402" font-family="${d}" font-size="14" fill="${e}" text-anchor="middle">6</text>
    <text x="630" y="402" font-family="${d}" font-size="14" fill="${e}" text-anchor="middle">8</text>
    <text x="760" y="402" font-family="${d}" font-size="14" fill="${e}" text-anchor="middle">10</text>

    <!-- boiling-point line -->
    <line x1="110" y1="120" x2="760" y2="120" stroke="${c}" stroke-width="1.8" stroke-dasharray="7 6"/>

    <!-- the curve: rises from 20°C, reaches 100 at 8 min, then flat -->
    <polyline points="110,320 175,286 240,250 305,214 370,180 435,158 500,138 565,120 630,120 695,120 760,120" fill="none" stroke="${s}" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"/>

    <text x="752" y="112" font-family="${d}" font-size="15" font-weight="bold" fill="${c}" text-anchor="end">boiling point — it stops rising</text>
    <text x="420" y="440" font-family="${d}" font-size="16" font-weight="bold" fill="${e}" text-anchor="middle">Time in minutes</text>
    <text x="40" y="230" font-family="${d}" font-size="16" font-weight="bold" fill="${e}" text-anchor="middle" transform="rotate(-90 40 230)">Temperature in °C</text>
  </svg>`},x=`#0087a8`,S=`#5c2483`,C=`#c25e12`,w=`#c8102e`,T={meta:{course:`y7-science`,unit:`2.2b`,id:`U02_2b`,title:`Measuring, and Heating Water`,objective:`Measure the volume of a liquid with a measuring cylinder (read the bottom of the meniscus at eye level) and a temperature with a thermometer (read the top of the liquid at eye level); plan and carry out the heating-water investigation safely; plot temperature against time; and describe the result — the temperature rises, then stays the same at the boiling point.`,order:8,french:!0,dashboard:{track:`Y7_SCI`,unit:`U02_2`}},slides:[{layout:`hero`,color:x,icon:`Ruler`,brand:`Year 7 Science`,brandVn:`Khoa học Lớp 7`,brandFr:`Sciences 7e année`,eyebrow:`2.2 Changes of state · part 2 of 2`,eyebrowVn:`2.2 Sự chuyển thể · phần 2 trong 2`,eyebrowFr:`2.2 Changements d’état · partie 2 sur 2`,date:`14 Sep 2026`,title:`Measuring`,titleVn:`Đo lường`,titleFr:`Mesurer`,card:{icon:`Pencil`,badge:`Starter Task`,badgeVn:`Nhiệm vụ khởi động`,badgeFr:`Pour commencer`,text:`Write a **guess** for each temperature, in degrees C: a **cold drink**, a **warm bath**, and **boiling water**. Three numbers. We will check them later.`,textVn:`Viết một **con số dự đoán** cho mỗi nhiệt độ, theo độ C: một **ly nước lạnh**, một **bồn tắm ấm**, và **nước đang sôi**. Ba con số. Lát nữa ta sẽ kiểm tra.`,textFr:`Écris une **estimation** pour chaque température, en degrés C\xA0: une **boisson froide**, un **bain chaud** et de l’**eau bouillante**. Trois nombres. On vérifiera plus tard.`}},{layout:`statement`,accent:S,icon:`HelpCircle`,eyebrow:`In pairs — one minute`,eyebrowVn:`Theo cặp — một phút`,eyebrowFr:`En binôme — une minute`,title:`Same Water, Two Answers`,titleVn:`Cùng một lượng nước, hai đáp án`,titleFr:`Même eau, deux réponses`,text:`Two students measure the **same** water. One writes **50**, the other writes **47**.`,textVn:`Hai học sinh đo **cùng** một lượng nước. Một bạn viết **50**, bạn kia viết **47**.`,textFr:`Deux élèves mesurent la **même** eau. L’un écrit **50**, l’autre écrit **47**.`,sub:`They cannot both be right. What did one of them do wrong?`,subVn:`Không thể cả hai đều đúng. Một trong hai bạn đã làm sai điều gì?`,subFr:`Ils ne peuvent pas avoir raison tous les deux. Quelle erreur l’un d’eux a-t-il faite\xA0?`},{layout:`split`,accent:x,icon:`Beaker`,eyebrow:`Learner’s Book, page 37 · Measuring volume`,eyebrowVn:`Sách học sinh, trang 37 · Đo thể tích`,eyebrowFr:`Manuel, page 37 · Mesurer un volume`,title:`Reading a Measuring Cylinder`,titleVn:`Đọc một ống đong`,titleFr:`Lire une éprouvette graduée`,ratio:52,side:`left`,inlineSvg:b.MENISCUS,content:`You measure the **volume** of a liquid with a **measuring cylinder**. The surface of the liquid curves up at the edges — that curve is the **meniscus**.

Read from the **bottom** of the curve, with your **eye level** with it. Look from above and you read too high; from below, too low.`,contentVn:`Em đo **thể tích (volume)** của chất lỏng bằng một **ống đong (measuring cylinder)**. Mặt chất lỏng cong lên ở mép — đường cong đó là **mặt khum (meniscus)**.

Đọc ở **đáy** của đường cong, với **mắt ngang tầm (eye level)** với nó. Nhìn từ trên xuống thì đọc quá cao; nhìn từ dưới lên thì quá thấp.`,contentFr:`On mesure le **volume** d’un liquide avec une **éprouvette graduée**. Au bord, le liquide remonte\xA0: c’est le **ménisque (meniscus)**.

Lis au **bas** de la courbe, à **hauteur des yeux (eye level)**. D’en haut, tu lis trop haut\xA0; d’en bas, trop bas.`,notes:[{tone:`write`,text:`**Measuring cylinder:** the tool used to measure the volume of a liquid.
**Meniscus:** the curved surface of the liquid. Read the **bottom** of it, with your **eye level**.`,textVn:`**Ống đong (measuring cylinder):** dụng cụ để đo thể tích chất lỏng.
**Mặt khum (meniscus):** mặt cong của chất lỏng. Đọc ở **đáy** của nó, với **mắt ngang tầm**.`,textFr:`**Éprouvette graduée (measuring cylinder)\xA0:** mesure le volume d’un liquide.
**Ménisque (meniscus)\xA0:** surface courbe du liquide. Lis le **bas**, à **hauteur des yeux**.`}]},{layout:`split`,accent:C,icon:`HelpCircle`,eyebrow:`Learner’s Book, page 37 · Question 1`,eyebrowVn:`Sách học sinh, trang 37 · Câu hỏi 1`,eyebrowFr:`Manuel de l’élève, page 37 · Question 1`,title:`What Volume Is in Each One?`,titleVn:`Mỗi ống chứa thể tích bao nhiêu?`,titleFr:`Quel volume dans chacune\xA0?`,ratio:56,inlineSvg:b.CYLINDERS_Q1,content:`Read each cylinder the way you just learned: **eye level**, at the **bottom of the meniscus**. Each small line is **10 cm³**.

Write your three answers in your notebook, with the units — **cm³** — every time.`,contentVn:`Đọc mỗi ống theo cách em vừa học: **mắt ngang tầm**, ở **đáy mặt khum**. Mỗi vạch nhỏ là **10 cm³**.

Viết ba đáp án vào vở, kèm đơn vị — **cm³** — mỗi lần.`,contentFr:`Lis chaque éprouvette comme tu viens de l’apprendre\xA0: **yeux à la même hauteur**, au **bas du ménisque**. Chaque petit trait vaut **10 cm³**.

Écris tes trois réponses dans ton cahier, avec l’unité — **cm³** — à chaque fois.`,reveal:{label:`Check`,labelVn:`Kiểm tra`,labelFr:`Vérifie`,answer:`**A** = 20 cm³
**B** = 60 cm³
**C** = 90 cm³`,answerVn:`**A** = 20 cm³
**B** = 60 cm³
**C** = 90 cm³`,answerFr:`**A** = 20 cm³
**B** = 60 cm³
**C** = 90 cm³`}},{layout:`split`,accent:x,icon:`Thermometer`,eyebrow:`Learner’s Book, page 37 · Measuring temperature`,eyebrowVn:`Sách học sinh, trang 37 · Đo nhiệt độ`,eyebrowFr:`Manuel de l’élève, page 37 · Mesurer une température`,title:`Reading a Thermometer`,titleVn:`Đọc một nhiệt kế`,titleFr:`Lire un thermomètre`,ratio:52,side:`left`,inlineSvg:b.THERMOMETER,content:`You measure **temperature** with a **thermometer**. The liquid inside **expands** — gets bigger — as it gets hotter, so it rises up the tube.

Read the scale at the **top of the liquid**, with your **eye level** with it — the same rule as the cylinder.`,contentVn:`Em đo **nhiệt độ (temperature)** bằng một **nhiệt kế (thermometer)**. Chất lỏng bên trong **giãn nở (expands)** — to ra — khi nóng lên, nên nó dâng lên trong ống.

Đọc thang đo ở **đỉnh của cột chất lỏng**, với **mắt ngang tầm** với nó — cùng quy tắc như ống đong.`,contentFr:`On mesure la **température** avec un **thermomètre**. Le liquide à l’intérieur se **dilate (expands)** — il grossit — quand il chauffe, donc il monte dans le tube.

Lis l’échelle au **sommet du liquide**, les **yeux à la même hauteur** — la même règle que pour l’éprouvette.`,notes:[{tone:`write`,text:`**Thermometer:** the tool used to measure temperature. The liquid inside **expands** and rises as it gets hotter. Read the **top of the liquid**, at **eye level**.`,textVn:`**Nhiệt kế (thermometer):** dụng cụ để đo nhiệt độ. Chất lỏng bên trong **giãn nở** và dâng lên khi nóng hơn. Đọc ở **đỉnh cột chất lỏng**, **ngang tầm mắt**.`,textFr:`**Thermomètre (thermometer)\xA0:** l’outil pour mesurer la température. Le liquide à l’intérieur se **dilate** et monte quand il chauffe. Lis au **sommet du liquide**, les **yeux à la même hauteur**.`}]},{layout:`split`,accent:C,icon:`HelpCircle`,eyebrow:`Learner’s Book, page 38 · Question 2`,eyebrowVn:`Sách học sinh, trang 38 · Câu hỏi 2`,eyebrowFr:`Manuel de l’élève, page 38 · Question 2`,title:`What Temperature Does Each Show?`,titleVn:`Mỗi nhiệt kế chỉ bao nhiêu độ?`,titleFr:`Quelle température indique chacun\xA0?`,ratio:56,inlineSvg:b.THERMOMETERS_Q2,content:`Read each thermometer at the **top of the liquid**. Write your answers with the units — **degrees C** — every time.`,contentVn:`Đọc mỗi nhiệt kế ở **đỉnh cột chất lỏng**. Viết đáp án kèm đơn vị — **độ C** — mỗi lần.`,contentFr:`Lis chaque thermomètre au **sommet du liquide**. Écris tes réponses avec l’unité — **degrés C** — à chaque fois.`,reveal:{label:`Check`,labelVn:`Kiểm tra`,labelFr:`Vérifie`,answer:`**A** = 25 degrees C
**B** = 15 degrees C
**C** = 40 degrees C`,answerVn:`**A** = 25 độ C
**B** = 15 độ C
**C** = 40 độ C`,answerFr:`**A** = 25 degrés C
**B** = 15 degrés C
**C** = 40 degrés C`}},{layout:`statement`,accent:S,icon:`HelpCircle`,eyebrow:`Predict — write it down before we start`,eyebrowVn:`Dự đoán — viết ra trước khi bắt đầu`,eyebrowFr:`Prédis — écris-le avant de commencer`,title:`Does It Get Hotter Forever?`,titleVn:`Nước có nóng lên mãi không?`,titleFr:`L’eau chauffe-t-elle sans fin\xA0?`,text:`We are going to heat water and read the temperature **every minute** until it boils.`,textVn:`Chúng ta sẽ đun nước và đọc nhiệt độ **mỗi phút** cho đến khi nó sôi.`,textFr:`On va chauffer de l’eau et lire la température **chaque minute** jusqu’à ce qu’elle bouille.`,sub:`Predict: does the temperature keep going up and up, or does something happen when it boils? Write your prediction now.`,subVn:`Dự đoán: nhiệt độ cứ tăng mãi, hay có điều gì xảy ra khi nước sôi? Hãy viết dự đoán của em ngay bây giờ.`,subFr:`Prédis\xA0: la température monte-t-elle sans arrêt, ou se passe-t-il quelque chose quand l’eau bout\xA0? Écris ta prédiction maintenant.`},{layout:`callout`,accent:w,icon:`AlertTriangle`,eyebrow:`Learner’s Book, page 38 · Before you start`,eyebrowVn:`Sách học sinh, trang 38 · Trước khi bắt đầu`,eyebrowFr:`Manuel de l’élève, page 38 · Avant de commencer`,title:`Safety First`,titleVn:`An toàn trước tiên`,titleFr:`La sécurité d’abord`,content:`Hot water burns. Before anyone lights a Bunsen burner, we agree the rules — and you copy them down.`,contentVn:`Nước nóng gây bỏng. Trước khi ai đó châm đèn Bunsen, cả lớp thống nhất các quy tắc — và em chép lại.`,contentFr:`L’eau chaude brûle. Avant d’allumer un bec Bunsen, on se met d’accord sur les règles — et tu les recopies.`,notes:[{tone:`homework`,badge:`Safety`,badgeVn:`An toàn`,badgeFr:`Sécurité`,icon:`AlertTriangle`,text:`Wear **safety spectacles**. **Stand up** while you work, so spilled hot water falls away from you, not onto you. **Take care** with the hot beaker and the Bunsen flame.`,textVn:`Đeo **kính bảo hộ**. **Đứng lên** khi làm, để nước nóng nếu đổ thì rơi ra xa người em, không phải vào người. **Cẩn thận** với cốc nóng và ngọn lửa đèn Bunsen.`,textFr:`Porte des **lunettes de protection**. **Reste debout** pendant le travail\xA0: l’eau chaude renversée tombe loin de toi, pas sur toi. **Fais attention** au bécher chaud et à la flamme du Bunsen.`}]},{layout:`showcase`,accent:S,icon:`FlaskConical`,eyebrow:`Rulers out — draw it as you set it up`,eyebrowVn:`Lấy thước ra — vẽ trong lúc em lắp đặt`,eyebrowFr:`Sors ta règle — dessine pendant le montage`,title:`The Apparatus`,titleVn:`Bộ dụng cụ`,titleFr:`Le montage`,inlineSvg:b.APPARATUS,drawThis:!0,caption:`Draw the whole set-up and label every part. The one thing that matters: the thermometer bulb sits IN the water, not touching the bottom of the beaker — so it measures the water, not the glass.`,captionVn:`Vẽ toàn bộ bộ dụng cụ và ghi nhãn từng bộ phận. Điều quan trọng nhất: bầu nhiệt kế nằm TRONG nước, không chạm đáy cốc — để nó đo nhiệt độ của nước, chứ không phải của thủy tinh.`,captionFr:`Dessine tout le montage et légende chaque partie. Le point essentiel\xA0: le réservoir du thermomètre est DANS l’eau, sans toucher le fond du bécher — pour mesurer l’eau, pas le verre.`},{layout:`steps`,accent:S,icon:`FlaskConical`,eyebrow:`Learner’s Book, page 39 · The method`,eyebrowVn:`Sách học sinh, trang 39 · Cách tiến hành`,eyebrowFr:`Manuel de l’élève, page 39 · La méthode`,title:`What to Do`,titleVn:`Các bước tiến hành`,titleFr:`Ce qu’il faut faire`,steps:[{text:`Measure **150 cm³** of water accurately into the beaker.`,textVn:`Đong chính xác **150 cm³** nước vào cốc.`,textFr:`Mesure avec précision **150 cm³** d’eau dans le bécher.`},{text:`Put the thermometer bulb **in the water**, held so it does **not touch the bottom**.`,textVn:`Đặt bầu nhiệt kế **trong nước**, giữ sao cho nó **không chạm đáy**.`,textFr:`Place le réservoir du thermomètre **dans l’eau**, tenu pour qu’il **ne touche pas le fond**.`},{text:`Read the temperature and **record it** in your table at 0 minutes.`,textVn:`Đọc nhiệt độ và **ghi vào bảng** ở phút 0.`,textFr:`Lis la température et **note-la** dans ton tableau à 0 minute.`},{text:`Light the Bunsen and heat the water. Read the temperature **every minute**.`,textVn:`Châm đèn Bunsen và đun nước. Đọc nhiệt độ **mỗi phút**.`,textFr:`Allume le Bunsen et chauffe l’eau. Lis la température **chaque minute**.`},{text:`Keep going until the water is **boiling** hard.`,textVn:`Tiếp tục cho đến khi nước **sôi** mạnh.`,textFr:`Continue jusqu’à ce que l’eau **bouille** fort.`}]},{layout:`showcase`,accent:C,icon:`Grid3x3`,eyebrow:`Copy this before you light the Bunsen`,eyebrowVn:`Chép bảng này trước khi châm đèn Bunsen`,eyebrowFr:`Recopie-le avant d’allumer le Bunsen`,title:`Your Results Table`,titleVn:`Bảng kết quả của em`,titleFr:`Ton tableau de résultats`,inlineSvg:b.RESULTS_TABLE,drawThis:!0,caption:`Rule up this table so you are ready to write a number the moment you read one. Add more rows — you keep going until the water boils.`,captionVn:`Kẻ sẵn bảng này để em sẵn sàng ghi số ngay khi đọc được. Thêm nhiều dòng nữa — em tiếp tục cho đến khi nước sôi.`,captionFr:`Trace ce tableau pour noter chaque nombre dès que tu le lis. Ajoute des lignes — tu continues jusqu’à ce que l’eau bouille.`},{layout:`split`,accent:C,icon:`Grid3x3`,eyebrow:`Learner’s Book, page 40 · Plot a graph`,eyebrowVn:`Sách học sinh, trang 40 · Vẽ đồ thị`,eyebrowFr:`Manuel de l’élève, page 40 · Tracer un graphique`,title:`Turn the Table Into a Graph`,titleVn:`Biến bảng số thành đồ thị`,titleFr:`Du tableau au graphique`,ratio:56,content:`A graph shows the numbers as a picture. It has two lines called **axes** (say *AK-sees*).

Put **time** along the **horizontal** axis (the one that goes across) and **temperature** up the **vertical** axis (the one that goes up). Mark each reading with a dot, then join the dots.`,contentVn:`Đồ thị cho thấy các con số dưới dạng hình ảnh. Nó có hai đường gọi là **trục (axes)**.

Đặt **thời gian** dọc theo **trục nằm ngang (horizontal)** (đường đi ngang) và **nhiệt độ** theo **trục thẳng đứng (vertical)** (đường đi lên). Đánh dấu mỗi số đọc bằng một chấm, rồi nối các chấm lại.`,contentFr:`Un graphique montre les nombres en image. Il a deux lignes appelées **axes**.

Mets le **temps** sur l’axe **horizontal** (celui qui va en travers) et la **température** sur l’axe **vertical** (celui qui monte). Marque chaque mesure d’un point, puis relie les points.`,notes:[{tone:`write`,text:`**Axis:** a line on a graph. **Time** goes on the **horizontal** axis (across); **temperature** goes on the **vertical** axis (up).`,textVn:`**Trục (axis):** một đường trên đồ thị. **Thời gian** nằm trên **trục ngang (horizontal)**; **nhiệt độ** nằm trên **trục dọc (vertical)**.`,textFr:`**Axe (axis)\xA0:** une ligne sur un graphique. Le **temps** va sur l’axe **horizontal**\xA0; la **température** va sur l’axe **vertical**.`}]},{layout:`split`,accent:x,icon:`Zap`,eyebrow:`The answer to your prediction`,eyebrowVn:`Đáp án cho dự đoán của em`,eyebrowFr:`La réponse à ta prédiction`,title:`It Stops at the Boiling Point`,titleVn:`Nó dừng lại ở nhiệt độ sôi`,titleFr:`Elle s’arrête au point d’ébullition`,ratio:56,side:`left`,inlineSvg:b.HEATING_CURVE,content:`At first the temperature climbs steadily — about the same amount each minute. Then it reaches **100 degrees C**, the **boiling point** of water, and it **stops rising**, even though the Bunsen is still on.

The heat is now being used to turn the liquid into gas, not to make it hotter. That is why the line goes flat.`,contentVn:`Lúc đầu nhiệt độ tăng đều — mỗi phút tăng khoảng như nhau. Rồi nó đạt **100 độ C**, **nhiệt độ sôi** của nước, và nó **ngừng tăng**, dù đèn Bunsen vẫn đang cháy.

Bây giờ nhiệt được dùng để biến chất lỏng thành khí, chứ không phải để làm nó nóng hơn. Đó là lý do đường đồ thị đi ngang.`,contentFr:`D’abord, la température monte régulièrement — à peu près autant chaque minute. Puis elle atteint **100 degrés C**, le **point d’ébullition** de l’eau, et elle **cesse de monter**, même si le Bunsen est toujours allumé.

La chaleur sert maintenant à changer le liquide en gaz, pas à le chauffer. C’est pour ça que la courbe devient plate.`,notes:[{tone:`write`,text:`While water **boils**, its temperature **stays the same** at the boiling point (100 degrees C). The heat changes the liquid into gas instead of raising the temperature.`,textVn:`Trong khi nước **sôi**, nhiệt độ của nó **giữ nguyên** ở nhiệt độ sôi (100 độ C). Nhiệt biến chất lỏng thành khí thay vì làm tăng nhiệt độ.`,textFr:`Pendant que l’eau **bout**, sa température **reste la même** au point d’ébullition (100 degrés C). La chaleur change le liquide en gaz au lieu d’augmenter la température.`}]},{layout:`split`,accent:S,icon:`MessageSquare`,eyebrow:`Learner’s Book, page 40 · Describe your graph`,eyebrowVn:`Sách học sinh, trang 40 · Mô tả đồ thị của em`,eyebrowFr:`Manuel, page 40 · Décris ton graphique`,title:`Finish the Sentences`,titleVn:`Hoàn thành các câu`,titleFr:`Complète les phrases`,ratio:56,content:`Describe your graph out loud, in full sentences. Fill each gap:

> When we heated the water, the temperature ______.
> The longer we heated it, the ______ the temperature became.
> When the water started to boil, the temperature ______.`,contentVn:`Mô tả đồ thị của em thành lời, bằng câu đầy đủ. Điền vào mỗi chỗ trống:

> When we heated the water, the temperature ______.
> The longer we heated it, the ______ the temperature became.
> When the water started to boil, the temperature ______.`,contentFr:`Décris ton graphique à l’oral, en phrases. Remplis les trous\xA0:

> When we heated the water, the temperature ______.
> The longer we heated it, the ______ the temperature became.
> When the water started to boil, the temperature ______.`,reveal:{label:`Example answers`,labelVn:`Câu trả lời mẫu`,labelFr:`Réponses types`,answer:`When we heated the water, the temperature **went up (rose)**.
The longer we heated it, the **higher** the temperature became.
When the water started to boil, the temperature **stayed the same**.`,answerVn:`When we heated the water, the temperature **went up (rose)** — nhiệt độ tăng lên.
The longer we heated it, the **higher** the temperature became — càng đun lâu, nhiệt độ càng cao.
When the water started to boil, the temperature **stayed the same** — khi nước bắt đầu sôi, nhiệt độ giữ nguyên.`,answerFr:`When we heated the water, the temperature **went up (rose)**.
The longer we heated it, the **higher** the temperature became.
When the water started to boil, the temperature **stayed the same**.`}},{layout:`split`,accent:x,icon:`HelpCircle`,eyebrow:`Learner’s Book, page 40 · Questions 3 to 5`,eyebrowVn:`Sách học sinh, trang 40 · Câu hỏi 3 đến 5`,eyebrowFr:`Manuel de l’élève, page 40 · Questions 3 à 5`,title:`Explain What You Saw`,titleVn:`Giải thích điều em đã thấy`,titleFr:`Explique ce que tu as vu`,ratio:56,content:`> **3.** What happened to the temperature when the water was boiling?
> **4.** Why do you think this happened?
> **5.** The thermometer is held so it does not rest on the bottom of the beaker. Why?`,contentVn:`> **3.** Điều gì xảy ra với nhiệt độ khi nước đang sôi?
> **4.** Vì sao em nghĩ điều đó xảy ra?
> **5.** Nhiệt kế được giữ sao cho không chạm đáy cốc. Vì sao?`,contentFr:`> **3.** Qu’est-il arrivé à la température quand l’eau bouillait\xA0?
> **4.** Pourquoi, à ton avis\xA0?
> **5.** On tient le thermomètre pour qu’il ne repose pas au fond du bécher. Pourquoi\xA0?`,reveal:{label:`Check`,labelVn:`Kiểm tra`,labelFr:`Vérifie`,answer:`**3.** It stopped rising and stayed the same, at about 100 degrees C.
**4.** The heat was being used to turn the water into a gas (steam), not to make it hotter.
**5.** So it measures the temperature of the **water**, not the hotter glass at the bottom of the beaker.`,answerVn:`**3.** Nó ngừng tăng và giữ nguyên, ở khoảng 100 độ C.
**4.** Nhiệt được dùng để biến nước thành khí (hơi), chứ không phải làm nó nóng hơn.
**5.** Để nó đo nhiệt độ của **nước**, chứ không phải của lớp thủy tinh nóng hơn ở đáy cốc.`,answerFr:`**3.** Elle a cessé de monter et est restée la même, vers 100 degrés C.
**4.** La chaleur servait à changer l’eau en gaz (vapeur), pas à la chauffer.
**5.** Pour mesurer la température de l’**eau**, pas celle du verre plus chaud au fond du bécher.`}},{layout:`stack`,variant:`checklist`,accent:x,icon:`CheckCircle2`,columns:2,eyebrow:`Learner’s Book, page 40 · Summary checklist`,eyebrowVn:`Sách học sinh, trang 40 · Bảng tự đánh giá`,eyebrowFr:`Manuel de l’élève, page 40 · Bilan`,title:`Can You Do All Four?`,titleVn:`Em làm được cả bốn điều này chứ?`,titleFr:`Sais-tu faire les quatre\xA0?`,content:`> Your notebook should now have **the meniscus and thermometer notes**, **the word axis**, **the safety rules**, **one labelled apparatus drawing**, and **one results table**. Check.`,contentVn:`> Trong vở của em bây giờ phải có **ghi chú về mặt khum và nhiệt kế**, **từ trục (axis)**, **các quy tắc an toàn**, **một hình bộ dụng cụ có ghi nhãn**, và **một bảng kết quả**. Hãy kiểm tra.`,contentFr:`> Ton cahier doit maintenant avoir **les notes sur le ménisque et le thermomètre**, **le mot axe (axis)**, **les règles de sécurité**, **un dessin du montage légendé** et **un tableau de résultats**. Vérifie.`,items:[{text:`Name the **three states of matter**.`,textVn:`Kể tên **ba trạng thái của vật chất**.`,textFr:`Nomme les **trois états de la matière**.`},{text:`Use the correct words for water changing from **solid to liquid to gas**.`,textVn:`Dùng đúng các từ cho nước chuyển từ **rắn sang lỏng sang khí**.`,textFr:`Utilise les bons mots pour l’eau qui passe de **solide à liquide à gaz**.`},{text:`Use a **thermometer** and a **measuring cylinder** accurately.`,textVn:`Dùng **nhiệt kế** và **ống đong** một cách chính xác.`,textFr:`Utilise un **thermomètre** et une **éprouvette graduée** avec précision.`},{text:`Carry out an **investigation safely**.`,textVn:`Tiến hành một **thí nghiệm an toàn**.`,textFr:`Mène une **expérience en sécurité**.`}]},{layout:`callout`,accent:w,icon:`Home`,eyebrow:`Homework Assignment`,eyebrowVn:`Bài tập về nhà`,eyebrowFr:`Devoirs`,title:`For Next Lesson`,titleVn:`Cho tiết học sau`,titleFr:`Prochain cours`,content:`Take your science notebook home. Both tasks are short.`,contentVn:`Hãy mang vở khoa học về nhà. Cả hai nhiệm vụ đều ngắn.`,contentFr:`Prends ton cahier de sciences. Deux tâches courtes.`,notes:[{tone:`homework`,badge:`Practice reading scales`,badgeVn:`Luyện đọc thang đo`,badgeFr:`Lire une échelle`,icon:`Pencil`,text:`Draw a **measuring cylinder** showing **35 cm³**, and a **thermometer** showing **28 degrees C**. Mark clearly where you read each one.`,textVn:`Vẽ một **ống đong** chỉ **35 cm³**, và một **nhiệt kế** chỉ **28 độ C**. Đánh dấu rõ chỗ em đọc số ở mỗi hình.`,textFr:`Dessine une **éprouvette graduée** à **35 cm³** et un **thermomètre** à **28 degrés C**. Marque bien où tu lis chacun.`},{tone:`homework`,badge:`Finish the write-up`,badgeVn:`Hoàn thành bài viết`,badgeFr:`Finir le rapport`,icon:`BookOpen`,text:`Finish your graph and write the three sentences describing it. Read Unit 2.2 **pages 37 to 40** again to check your answers.`,textVn:`Hoàn thành đồ thị và viết ba câu mô tả nó. Đọc lại Bài 2.2 **trang 37 đến 40** để kiểm tra đáp án.`,textFr:`Finis ton graphique et écris les trois phrases qui le décrivent. Relis l’Unité 2.2, **pages 37 à 40**, pour vérifier.`}]},{layout:`hero`,color:x,icon:`CheckCircle2`,brand:`Year 7 Science`,brandVn:`Khoa học Lớp 7`,brandFr:`Sciences 7e année`,title:`Lesson Complete!`,titleVn:`Hoàn thành bài học!`,titleFr:`Leçon terminée\xA0!`,subtitle:`You can measure a volume and a temperature accurately, and you know the temperature stops climbing at the boiling point. Exit question: **why** does the liquid in a thermometer rise when the water gets hotter? What is happening to it?`,subtitleVn:`Em đo được thể tích và nhiệt độ một cách chính xác, và em biết nhiệt độ ngừng tăng ở nhiệt độ sôi. Câu hỏi ra về: **vì sao** chất lỏng trong nhiệt kế dâng lên khi nước nóng hơn? Điều gì đang xảy ra với nó?`,subtitleFr:`Tu sais mesurer un volume et une température avec précision, et tu sais que la température cesse de monter au point d’ébullition. Question de sortie\xA0: **pourquoi** le liquide d’un thermomètre monte-t-il quand l’eau chauffe\xA0? Que lui arrive-t-il\xA0?`}],plan:{duration:`50 minutes`,objective:`Students can read a measuring cylinder (bottom of the meniscus, eye level) and a thermometer (top of the liquid, eye level) accurately; state and follow the safety rules for heating water; set up and label the heating apparatus with the thermometer bulb in the water and off the bottom; record temperature against time, plot it, and describe it in full sentences; and explain that the temperature stays the same at the boiling point because the heat is changing the liquid to a gas.`,materials:[`Projector / TV for the lesson deck`,`Student science notebooks and RULERS — the apparatus and the results table are drawn in class`,`Learner’s Book (Unit 2.2, pages 37–40)`,`For the investigation (per group of 2–3): beaker, 150 cm³ measured water, thermometer, clamp stand with boss and clamp, tripod, gauze, heat-proof mat, Bunsen burner, stopwatch, safety spectacles`,`A measuring cylinder and a thermometer to pass round at the start, so every student reads a real scale once before Questions 1 and 2`],vocab:[{term:`Volume`,def:`the amount of space a liquid takes up, measured in cm³`},{term:`Measuring cylinder`,def:`the tool used to measure the volume of a liquid`},{term:`Meniscus`,def:`the curved surface of a liquid; read the BOTTOM of it, at eye level`},{term:`Thermometer`,def:`the tool used to measure temperature; the liquid expands and rises as it gets hotter`},{term:`Eye level`,def:`looking straight at the mark, not from above or below — the fix for two people getting different readings`},{term:`Axis (axes)`,def:`a line on a graph; time on the horizontal axis (across), temperature on the vertical axis (up)`},{term:`Boiling point`,def:`the temperature at which a liquid boils; for water, 100 degrees C. The temperature stays here while it boils`}],timeline:[{time:`0–4 min`,phase:`Starter — guess three temperatures`,detail:`Title slide. Guess, in degrees C: a cold drink, a warm bath, boiling water. Collect a few. Rough answers: cold drink ~5, warm bath ~40, boiling water 100. Hold the 100 — it comes back at the end. This also warms up "degrees C" as a unit.`},{time:`4–8 min`,phase:`The hook — same water, two answers`,detail:`Slide 2: two students read the same cylinder as 50 and 47. NO answer on the slide. One minute in pairs. Take ideas; steer towards "they looked from different angles" without confirming — the meniscus slide answers it.`},{time:`8–18 min`,phase:`Measuring volume, then Question 1`,detail:`The meniscus slide: measuring cylinder, the curve, read the bottom at eye level — this answers the hook (50 vs 47 = looking from above vs below). Copy MEASURING CYLINDER + MENISCUS. Pass a real cylinder round if you have one. Then Question 1: three cylinders, answers A 20, B 60, C 90 cm³. Insist on the units every time.`},{time:`18–26 min`,phase:`Measuring temperature, then Question 2`,detail:`The thermometer slide: the liquid expands and rises; read the top at eye level (same rule). Copy THERMOMETER. Then Question 2: three thermometers, answers A 25, B 15, C 40 degrees C. Again, units every time.`},{time:`26–30 min`,phase:`Predict, then safety`,detail:`The prediction slide: heat water and read every minute — does it get hotter forever, or does something happen at boiling? Everyone WRITES a prediction (most say "hotter forever"; that is the useful wrong answer). Then the safety slide — copy the three rules before any Bunsen is lit.`},{time:`30–42 min`,phase:`The investigation`,detail:`Draw the apparatus (Draw This) and label it — the one thing that matters is the bulb IN the water and OFF the bottom. Copy the results table. Then run it in groups: 150 cm³, read every minute to boiling. If time or kit is short, run ONE demonstration at the front and have the class fill the table from it. Circulate on safety: goggles on, standing up.`},{time:`42–48 min`,phase:`Plot, then describe and explain`,detail:`The graph slide: axis / horizontal / vertical — copy AXIS. Then the heating-curve result answers the prediction: it climbs, then goes flat at 100. Copy the finding. Then the sentence frames (comparative English — "the longer we heated, the higher…") and Questions 3–5. Insist on full sentences; this is the English of the lesson.`},{time:`48–50 min`,phase:`Recap and homework`,detail:`The four-point Summary checklist and the copy-count. Homework: draw a cylinder at 35 cm³ and a thermometer at 28 degrees C (the reverse skill), and finish the graph write-up. Exit question: why does the thermometer liquid rise? (It expands when heated — links back to 2.1/2.2.)`}],answers:[{q:`Starter guesses`,a:`Cold drink ~5 degrees C, warm bath ~40 degrees C, boiling water 100 degrees C. Exact numbers do not matter; the point is a feel for the scale and practice with the unit.`},{q:`Hook — 50 vs 47`,a:`Neither misread the scale; they looked from different angles. Reading from ABOVE the meniscus gives a value that is too high, from BELOW too low. The fix is eye level, reading the bottom of the curve. This is the whole reason accuracy needs a rule.`},{q:`Question 1 — volumes`,a:`A = 20 cm³, B = 60 cm³, C = 90 cm³. Each small line is 10 cm³. Mark down any answer missing the unit.`},{q:`Question 2 — temperatures`,a:`A = 25 degrees C, B = 15 degrees C, C = 40 degrees C.`},{q:`Prediction`,a:`Most predict it keeps getting hotter. It does not: it stops at 100 degrees C. Do not confirm before the graph; the gap between the guess and the flat line is the lesson.`},{q:`Safety rules`,a:`Safety spectacles on; stand up so spills fall away from you; take care with the hot beaker and the flame. Discuss any extras (tie long hair back, bags under the bench) and check with the class.`},{q:`Why the bulb is off the bottom (Q5)`,a:`So the thermometer measures the temperature of the WATER, not the hotter glass at the bottom of the beaker, which is right over the flame.`},{q:`What happens at boiling (Q3)`,a:`The temperature stops rising and stays the same, at about 100 degrees C, even though heating continues.`},{q:`Why (Q4)`,a:`The heat energy is being used to change the liquid water into a gas (steam), not to raise the temperature. Accept any answer along these lines; the formal idea (latent heat) is not required in Year 7 — "the heat is turning it into gas instead of making it hotter" is full marks.`},{q:`Describe-the-graph sentences`,a:`"...the temperature went up / rose." "...the higher the temperature became." "...the temperature stayed the same." The middle one is comparative English (the + comparative, the + comparative); drill it.`},{q:`Exit question — why the thermometer liquid rises`,a:`The liquid EXPANDS (gets bigger) when it is heated, so it takes up more space and rises up the thin tube. This links back to "some substances get bigger when you heat them" from 2.1.`}],notes:`WHERE THIS SITS. Second half of section 2.2 (pages 37–40); 2.2a (pages 35–36, the change words) comes first and this deck depends on it — the payoff is that the heated water reaches its BOILING POINT, a word from 2.2a, and stops getting hotter. IT IS A SKILLS LESSON. The facts are few; the skill is accurate reading and a safe, well-recorded investigation. Two rules do all the work and are the same for both instruments: read at the liquid surface (bottom of the meniscus for a cylinder, top of the liquid for a thermometer) and read at EYE LEVEL. The hook (50 vs 47) exists only to make eye level feel necessary before it is stated. THE INVESTIGATION, HONESTLY. Full group practicals need kit and time; if either is short, run ONE demonstration at the front and have the class fill the same table from it — the graph and its lesson survive completely. If you do run groups, the safety slide is not optional and the bulb-off-the-bottom point is the one thing to police. THREE SLIDES ASK BEFORE THEY TELL: the hook, the prediction ("hotter forever?"), and the describe-the-graph frames. The prediction must be WRITTEN before heating; the flat line is only surprising if they committed to "up forever" first. WHAT GETS COPIED: measuring cylinder + meniscus, thermometer, axis, the safety rules, and the finding (temperature stays the same at the boiling point) — plus two drawn items, the labelled apparatus and the results table. THE ENGLISH BEATS: "accurate" and "eye level"; the graph words axis / horizontal / vertical; and the comparative frame "the longer we heated it, the higher the temperature became", which is the sentence most worth drilling because the class can use the pattern everywhere. THE READINGS in Questions 1 and 2 are chosen to sit on lines so the answers are clean (20/60/90 cm³ and 25/15/40 degrees C); tell the class each small line is 10 cm³ (volume) or that the numbers are degrees C (temperature). No Learner’s Book scans are used; every figure — meniscus, both question sets, the apparatus, the results table and the heating curve — is redrawn in content/y7-science/U02_2b/diagrams.js. There are no photographs in this deck, and it needs none; if you want a real-apparatus photo for the set-up slide later, add it to an images/ folder with a CREDITS.json entry.`}};export{T as default};