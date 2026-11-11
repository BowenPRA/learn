import{r as e}from"./rolldown-runtime-XKyaHtl9.js";import{Qc as t,Vc as n}from"./vendor-o2wDgTHu.js";var r=`#2b2b2b`,i=`#c25e12`,a=`#c8102e`,o=`#1a5fa8`,s=`#4a8b23`,c=`#eef6e6`,l=`#fdf1e3`,u=`#eef4fb`,d=`#f1f5f9`,f=`#fdecef`,p=`#7ec8e3`,m=`Inter, 'Segoe UI', system-ui, sans-serif`,h=(e,t)=>`<rect x="0" y="0" width="${e}" height="${t}" rx="14" fill="#ffffff"/>
    <rect x="0.75" y="0.75" width="${e-1.5}" height="${t-1.5}" rx="13" fill="none" stroke="#e2e8f0" stroke-width="1.5"/>`,g=`<defs>
    <marker id="t1-key" viewBox="0 0 10 10" refX="9" refY="5" markerUnits="userSpaceOnUse" markerWidth="13" markerHeight="13" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="${i}"/></marker>
    <marker id="t1-blue" viewBox="0 0 10 10" refX="9" refY="5" markerUnits="userSpaceOnUse" markerWidth="13" markerHeight="13" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="${o}"/></marker>
    <marker id="t1-green" viewBox="0 0 10 10" refX="9" refY="5" markerUnits="userSpaceOnUse" markerWidth="13" markerHeight="13" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="${s}"/></marker>
    <marker id="t1-ink" viewBox="0 0 10 10" refX="9" refY="5" markerUnits="userSpaceOnUse" markerWidth="12" markerHeight="12" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="${r}"/></marker>
  </defs>`,_=(e,t,n,i,a,o=0)=>{let s=a,c=-a*.62,l=t+i,u=l-o,d=o>0?`<polygon points="${e},${u} ${e+s},${u+c} ${e+n+s},${u+c} ${e+n},${u}" fill="${p}" stroke="#3d8fb0" stroke-width="2"/>
       <polygon points="${e+n},${u} ${e+n+s},${u+c} ${e+n+s},${l+c} ${e+n},${l}" fill="#9fd8ec" stroke="#3d8fb0" stroke-width="2"/>
       <rect x="${e}" y="${u}" width="${n}" height="${o}" fill="#bfe6f4" stroke="#3d8fb0" stroke-width="2"/>`:``;return`<polygon points="${e},${t} ${e+s},${t+c} ${e+n+s},${t+c} ${e+n},${t}" fill="none" stroke="${r}" stroke-width="2.5" stroke-linejoin="round"/>
    <polygon points="${e+n},${t} ${e+n+s},${t+c} ${e+n+s},${l+c} ${e+n},${l}" fill="#eef4f8" stroke="${r}" stroke-width="2.5" stroke-linejoin="round"/>
    ${d}
    <rect x="${e}" y="${t}" width="${n}" height="${i}" fill="none" stroke="${r}" stroke-width="3"/>`},v={ANT_WALK:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 500" class="w-full h-full">
    ${h(840,500)}
    ${g}

    <text x="420" y="46" font-family="${m}" font-size="27" font-weight="bold" fill="${i}" text-anchor="middle">One rectangle, four sides</text>

    <rect x="210" y="110" width="420" height="158" fill="${u}" stroke="${r}" stroke-width="3"/>

    <path d="M 240 100 L 600 100" fill="none" stroke="${s}" stroke-width="3" marker-end="url(#t1-green)"/>
    <path d="M 642 130 L 642 248" fill="none" stroke="${s}" stroke-width="3" marker-end="url(#t1-green)"/>
    <path d="M 600 278 L 240 278" fill="none" stroke="${s}" stroke-width="3" marker-end="url(#t1-green)"/>
    <path d="M 198 248 L 198 130" fill="none" stroke="${s}" stroke-width="3" marker-end="url(#t1-green)"/>

    <circle cx="210" cy="110" r="7" fill="${i}"/>
    <text x="200" y="100" font-family="${m}" font-size="18" font-weight="bold" fill="${i}" text-anchor="end">Start</text>

    <text x="420" y="308" font-family="${m}" font-size="26" font-weight="bold" fill="${o}" text-anchor="middle">8 cm</text>
    <text x="186" y="198" font-family="${m}" font-size="26" font-weight="bold" fill="${o}" text-anchor="end">3 cm</text>

    <text x="420" y="360" font-family="${m}" font-size="32" font-weight="bold" fill="${s}" text-anchor="middle">8 + 3 + 8 + 3 = 22 cm</text>

    <text x="420" y="416" font-family="${m}" font-size="21" font-weight="bold" fill="${r}" text-anchor="middle">That is correct, and it is finished.</text>
    <text x="420" y="452" font-family="${m}" font-size="21" font-weight="bold" fill="${i}" text-anchor="middle">Now do it for forty rectangles.</text>
  </svg>`,THREE_MOVES:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${h(840,560)}

    <text x="420" y="46" font-family="${m}" font-size="27" font-weight="bold" fill="${i}" text-anchor="middle">Three moves, every time</text>

    <rect x="60" y="76" width="720" height="104" rx="14" fill="${l}" stroke="${i}" stroke-width="2.5"/>
    <circle cx="112" cy="128" r="26" fill="${i}"/>
    <text x="112" y="138" font-family="${m}" font-size="30" font-weight="bold" fill="#ffffff" text-anchor="middle">1</text>
    <text x="158" y="116" font-family="${m}" font-size="22" font-weight="bold" fill="${i}">Write the formula</text>
    <text x="158" y="156" font-family="${m}" font-size="28" font-weight="bold" fill="${r}">P = 2l + 2w</text>

    <rect x="60" y="196" width="720" height="104" rx="14" fill="${u}" stroke="${o}" stroke-width="2.5"/>
    <circle cx="112" cy="248" r="26" fill="${o}"/>
    <text x="112" y="258" font-family="${m}" font-size="30" font-weight="bold" fill="#ffffff" text-anchor="middle">2</text>
    <text x="158" y="236" font-family="${m}" font-size="22" font-weight="bold" fill="${o}">Put the numbers in</text>
    <text x="158" y="276" font-family="${m}" font-size="28" font-weight="bold" fill="${r}">P = 2 × 8 + 2 × 3</text>

    <rect x="60" y="316" width="720" height="104" rx="14" fill="${c}" stroke="${s}" stroke-width="2.5"/>
    <circle cx="112" cy="368" r="26" fill="${s}"/>
    <text x="112" y="378" font-family="${m}" font-size="30" font-weight="bold" fill="#ffffff" text-anchor="middle">3</text>
    <text x="158" y="356" font-family="${m}" font-size="22" font-weight="bold" fill="${s}">Work it out</text>
    <text x="158" y="396" font-family="${m}" font-size="28" font-weight="bold" fill="${r}">P = 16 + 6 = 22 cm</text>

    <rect x="60" y="440" width="720" height="86" rx="14" fill="${f}" stroke="${a}" stroke-width="2.5"/>
    <text x="100" y="478" font-family="${m}" font-size="24" font-weight="bold" fill="${a}">2l means 2 × l.</text>
    <text x="100" y="508" font-family="${m}" font-size="19" font-weight="bold" fill="${r}">It is a multiplication, not two things stuck together.</text>
  </svg>`,TRIANGLE_IN_RECT:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 500" class="w-full h-full">
    ${h(840,500)}

    <text x="420" y="46" font-family="${m}" font-size="27" font-weight="bold" fill="${i}" text-anchor="middle">Look before you calculate</text>

    <rect x="200" y="90" width="440" height="240" fill="${d}" stroke="${r}" stroke-width="3"/>
    <polygon points="200,330 640,330 490,90" fill="${u}" stroke="${o}" stroke-width="3.5" stroke-linejoin="round"/>
    <path d="M 490 90 L 490 330" fill="none" stroke="${r}" stroke-width="2" stroke-dasharray="7 6"/>

    <text x="420" y="392" font-family="${m}" font-size="26" font-weight="bold" fill="${r}" text-anchor="middle">How much of the rectangle does the triangle cover?</text>
    <text x="420" y="440" font-family="${m}" font-size="22" font-weight="bold" fill="${i}" text-anchor="middle">No numbers. Just look, and say why.</text>
  </svg>`,TRIANGLE_HEIGHT:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 540" class="w-full h-full">
    ${h(840,540)}
    ${g}

    <text x="420" y="44" font-family="${m}" font-size="27" font-weight="bold" fill="${i}" text-anchor="middle">Area of a triangle</text>
    <text x="420" y="94" font-family="${m}" font-size="32" font-weight="bold" fill="${r}" text-anchor="middle">A = b × h ÷ 2</text>

    <polygon points="200,400 620,400 530,150" fill="${c}" stroke="${r}" stroke-width="3.5" stroke-linejoin="round"/>
    <path d="M 530 150 L 530 400" fill="none" stroke="${i}" stroke-width="3" stroke-dasharray="9 7"/>
    <path d="M 530 382 L 512 382 L 512 400" fill="none" stroke="${i}" stroke-width="2.5"/>

    <path d="M 676 268 L 536 268" fill="none" stroke="${i}" stroke-width="2" marker-end="url(#t1-key)"/>
    <circle cx="678" cy="268" r="4" fill="${i}"/>
    <text x="688" y="275" font-family="${m}" font-size="22" font-weight="bold" fill="${i}">height (h)</text>

    <text x="410" y="446" font-family="${m}" font-size="22" font-weight="bold" fill="${i}" text-anchor="middle">base (b)</text>
    <path d="M 200 414 L 620 414" fill="none" stroke="${i}" stroke-width="2"/>

    <text x="420" y="504" font-family="${m}" font-size="21" font-weight="bold" fill="${a}" text-anchor="middle">The height goes straight up. The slanted side is not the height.</text>
  </svg>`,TWO_THERMOMETERS:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 520" class="w-full h-full">
    ${h(840,520)}

    <text x="420" y="44" font-family="${m}" font-size="27" font-weight="bold" fill="${i}" text-anchor="middle">Two cities, two numbers</text>

    <text x="230" y="104" font-family="${m}" font-size="34" font-weight="bold" fill="${a}" text-anchor="middle">35 °C</text>
    <rect x="215" y="140" width="30" height="230" rx="15" fill="${d}" stroke="${r}" stroke-width="2.5"/>
    <rect x="222" y="240" width="16" height="130" fill="${a}"/>
    <circle cx="230" cy="392" r="30" fill="${a}" stroke="${r}" stroke-width="2.5"/>
    <text x="230" y="466" font-family="${m}" font-size="22" font-weight="bold" fill="${r}" text-anchor="middle">Ha Noi today</text>

    <text x="610" y="104" font-family="${m}" font-size="34" font-weight="bold" fill="${a}" text-anchor="middle">95 °F</text>
    <rect x="595" y="140" width="30" height="230" rx="15" fill="${d}" stroke="${r}" stroke-width="2.5"/>
    <rect x="602" y="240" width="16" height="130" fill="${a}"/>
    <circle cx="610" cy="392" r="30" fill="${a}" stroke="${r}" stroke-width="2.5"/>
    <text x="610" y="466" font-family="${m}" font-size="22" font-weight="bold" fill="${r}" text-anchor="middle">Texas today</text>

    <text x="420" y="230" font-family="${m}" font-size="27" font-weight="bold" fill="${r}" text-anchor="middle">Which city is</text>
    <text x="420" y="266" font-family="${m}" font-size="27" font-weight="bold" fill="${r}" text-anchor="middle">hotter today?</text>
    <text x="420" y="312" font-family="${m}" font-size="21" font-weight="bold" fill="${i}" text-anchor="middle">Hands up for each.</text>
  </svg>`,TEMP_SCALES:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${h(840,560)}

    <text x="420" y="40" font-family="${m}" font-size="27" font-weight="bold" fill="${i}" text-anchor="middle">One temperature, two scales</text>

    <text x="322" y="76" font-family="${m}" font-size="24" font-weight="bold" fill="${o}" text-anchor="middle">°C</text>
    <text x="522" y="76" font-family="${m}" font-size="24" font-weight="bold" fill="${a}" text-anchor="middle">°F</text>

    <rect x="300" y="104" width="44" height="366" rx="10" fill="${u}" stroke="${r}" stroke-width="2.5"/>
    <rect x="500" y="104" width="44" height="366" rx="10" fill="${f}" stroke="${r}" stroke-width="2.5"/>

    <path d="M 344 120 L 500 120" fill="none" stroke="#94a3b8" stroke-width="2" stroke-dasharray="6 5"/>
    <path d="M 344 341 L 500 341" fill="none" stroke="${i}" stroke-width="3"/>
    <path d="M 344 460 L 500 460" fill="none" stroke="#94a3b8" stroke-width="2" stroke-dasharray="6 5"/>

    <text x="288" y="128" font-family="${m}" font-size="22" font-weight="bold" fill="${o}" text-anchor="end">100</text>
    <text x="288" y="349" font-family="${m}" font-size="22" font-weight="bold" fill="${i}" text-anchor="end">35</text>
    <text x="288" y="468" font-family="${m}" font-size="22" font-weight="bold" fill="${o}" text-anchor="end">0</text>

    <text x="558" y="128" font-family="${m}" font-size="22" font-weight="bold" fill="${a}">212</text>
    <text x="558" y="349" font-family="${m}" font-size="22" font-weight="bold" fill="${i}">95</text>
    <text x="558" y="468" font-family="${m}" font-size="22" font-weight="bold" fill="${a}">32</text>

    <text x="628" y="128" font-family="${m}" font-size="19" font-weight="bold" fill="${r}">water boils</text>
    <text x="628" y="349" font-family="${m}" font-size="19" font-weight="bold" fill="${i}">Ha Noi and Texas</text>
    <text x="628" y="468" font-family="${m}" font-size="19" font-weight="bold" fill="${r}">water freezes</text>

    <rect x="150" y="496" width="540" height="52" rx="12" fill="${l}" stroke="${i}" stroke-width="2.5"/>
    <text x="420" y="532" font-family="${m}" font-size="30" font-weight="bold" fill="${r}" text-anchor="middle">F = 1.8 × c + 32</text>
  </svg>`,STORM_DISTANCE:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 540" class="w-full h-full">
    ${h(840,540)}
    ${g}

    <text x="420" y="42" font-family="${m}" font-size="27" font-weight="bold" fill="${i}" text-anchor="middle">How far away is the storm?</text>

    <path d="M 96 168 Q 72 130 108 116 Q 116 80 162 84 Q 190 58 226 82 Q 272 74 280 116 Q 314 126 300 168 Z" fill="#dbe4ec" stroke="${r}" stroke-width="2.5" stroke-linejoin="round"/>
    <polygon points="196,168 168,244 200,244 172,324 236,232 202,232 226,168" fill="#ffd23f" stroke="${r}" stroke-width="2.5" stroke-linejoin="round"/>

    ${((e,t,n)=>`<circle cx="${e}" cy="${t-62*n}" r="${15*n}" fill="${l}" stroke="${r}" stroke-width="2.5"/>
    <path d="M ${e} ${t-47*n} L ${e} ${t-20*n} M ${e-16*n} ${t-38*n} L 718.4 ${t-38*n} M ${e} ${t-20*n} L ${e-13*n} ${t} M ${e} ${t-20*n} L 714.95 ${t}" fill="none" stroke="${r}" stroke-width="2.5" stroke-linecap="round"/>`)(700,390,1.15)}
    <path d="M 60 390 L 790 390" fill="none" stroke="${r}" stroke-width="3"/>

    <text x="360" y="122" font-family="${m}" font-size="21" font-weight="bold" fill="${o}">You SEE the flash at once.</text>
    <text x="360" y="154" font-family="${m}" font-size="21" font-weight="bold" fill="${o}">You HEAR the bang later.</text>
    <text x="360" y="186" font-family="${m}" font-size="21" font-weight="bold" fill="${r}">About 3 seconds for every kilometre.</text>

    <rect x="250" y="240" width="380" height="118" rx="14" fill="${c}" stroke="${s}" stroke-width="2.5"/>
    <text x="440" y="298" font-family="${m}" font-size="34" font-weight="bold" fill="${r}" text-anchor="middle">d = t ÷ 3</text>
    <text x="440" y="336" font-family="${m}" font-size="19" font-weight="bold" fill="${s}" text-anchor="middle">t = seconds · d = kilometres</text>

    <path d="M 200 424 L 690 424" fill="none" stroke="${i}" stroke-width="3" marker-start="url(#t1-key)" marker-end="url(#t1-key)"/>
    <text x="440" y="466" font-family="${m}" font-size="24" font-weight="bold" fill="${i}" text-anchor="middle">d kilometres</text>
  </svg>`,POUR_QUESTION:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 500" class="w-full h-full">
    ${h(840,500)}
    ${g}

    <text x="420" y="44" font-family="${m}" font-size="27" font-weight="bold" fill="${i}" text-anchor="middle">The same water, a different tank</text>

    ${_(110,120,190,210,52,130)}
    ${_(500,150,260,180,52,0)}

    <path d="M 350 250 Q 420 196 468 244" fill="none" stroke="${o}" stroke-width="4" marker-end="url(#t1-blue)"/>

    <text x="620" y="284" font-family="${m}" font-size="66" font-weight="bold" fill="${i}" text-anchor="middle">?</text>

    <text x="420" y="404" font-family="${m}" font-size="26" font-weight="bold" fill="${r}" text-anchor="middle">Will the water be deeper, shallower, or the same?</text>
    <text x="420" y="450" font-family="${m}" font-size="21" font-weight="bold" fill="${i}" text-anchor="middle">No numbers yet. Say which, and say why.</text>
  </svg>`,WATER_LAYERS:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 520" class="w-full h-full">
    ${h(840,520)}

    <text x="420" y="42" font-family="${m}" font-size="27" font-weight="bold" fill="${i}" text-anchor="middle">Water is made of centimetre cubes</text>

    ${_(250,96,200,200,58,150)}

    <path d="M 300 146 L 358 110 M 350 146 L 408 110 M 400 146 L 458 110" fill="none" stroke="#3d8fb0" stroke-width="1.5"/>
    <path d="M 269 134 L 469 134 M 289 122 L 489 122" fill="none" stroke="#3d8fb0" stroke-width="1.5"/>
    <path d="M 300 146 L 300 296 M 350 146 L 350 296 M 400 146 L 400 296" fill="none" stroke="#3d8fb0" stroke-width="1.5"/>
    <path d="M 250 196 L 450 196 M 250 246 L 450 246" fill="none" stroke="#3d8fb0" stroke-width="1.5"/>

    <text x="350" y="332" font-family="${m}" font-size="24" font-weight="bold" fill="${o}" text-anchor="middle">4 cm</text>
    <text x="228" y="228" font-family="${m}" font-size="24" font-weight="bold" fill="${o}" text-anchor="end">3 cm</text>
    <path d="M 520 96 L 470 118" fill="none" stroke="${o}" stroke-width="1.5"/>
    <text x="526" y="96" font-family="${m}" font-size="24" font-weight="bold" fill="${o}">3 cm</text>

    <text x="420" y="386" font-family="${m}" font-size="24" font-weight="bold" fill="${r}" text-anchor="middle">One layer = 4 × 3 = 12 cubes</text>
    <text x="420" y="424" font-family="${m}" font-size="24" font-weight="bold" fill="${r}" text-anchor="middle">Three layers = 12 × 3 = 36 cubes</text>
    <text x="420" y="476" font-family="${m}" font-size="30" font-weight="bold" fill="${s}" text-anchor="middle">V = l × w × h = 36 cm³</text>
  </svg>`,POUR_TWO_STEPS:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 540" class="w-full h-full">
    ${h(840,540)}
    ${g}

    <text x="420" y="42" font-family="${m}" font-size="27" font-weight="bold" fill="${i}" text-anchor="middle">Two questions, then you are done</text>

    <rect x="60" y="80" width="340" height="150" rx="14" fill="${u}" stroke="${o}" stroke-width="2.5"/>
    <text x="230" y="126" font-family="${m}" font-size="22" font-weight="bold" fill="${o}" text-anchor="middle">1. How much water?</text>
    <text x="230" y="184" font-family="${m}" font-size="28" font-weight="bold" fill="${r}" text-anchor="middle">4 × 3 × 3 = 36 cm³</text>

    <rect x="440" y="80" width="340" height="150" rx="14" fill="${c}" stroke="${s}" stroke-width="2.5"/>
    <text x="610" y="126" font-family="${m}" font-size="22" font-weight="bold" fill="${s}" text-anchor="middle">2. One layer holds?</text>
    <text x="610" y="184" font-family="${m}" font-size="28" font-weight="bold" fill="${r}" text-anchor="middle">6 × 3 = 18 cm³</text>

    <path d="M 230 246 L 380 288" fill="none" stroke="${r}" stroke-width="3" marker-end="url(#t1-ink)"/>
    <path d="M 610 246 L 460 288" fill="none" stroke="${r}" stroke-width="3" marker-end="url(#t1-ink)"/>

    <rect x="200" y="300" width="440" height="118" rx="14" fill="${l}" stroke="${i}" stroke-width="2.5"/>
    <text x="420" y="358" font-family="${m}" font-size="40" font-weight="bold" fill="${i}" text-anchor="middle">36 ÷ 18 = 2</text>
    <text x="420" y="396" font-family="${m}" font-size="22" font-weight="bold" fill="${r}" text-anchor="middle">so the water is 2 cm deep</text>

    <text x="420" y="466" font-family="${m}" font-size="21" font-weight="bold" fill="${r}" text-anchor="middle">Cubes altogether ÷ cubes in one layer = layers deep</text>
    <text x="420" y="500" font-family="${m}" font-size="20" font-weight="bold" fill="${i}" text-anchor="middle">The number of layers is the depth in centimetres.</text>
  </svg>`},y=e(t(),1),b=n(),x=(e,t,n)=>e===`vn`?n??t:t,S=`#2b2b2b`,C=`#c25e12`,w=`#1a5fa8`,T=`#4a8b23`,E=`#c8102e`,D=`#0087a8`,O=`#5c2483`,k=`Inter, 'Segoe UI', system-ui, sans-serif`,A=e=>String(Math.round(e*1e3)/1e3),j={nextStep:[`Next line`,`Dòng tiếp theo`],back:[`Back`,`Lùi`],nextProblem:[`Next problem`,`Bài tiếp theo`],whiteboards:[`Whiteboards first. Then press.`,`Làm ra bảng con trước. Rồi mới bấm.`],pour:[`Pour it`,`Đổ nước`],tankA:[`TANK A`,`BỂ A`],tankB:[`TANK B`,`BỂ B`],celsius:[`Celsius`,`Độ C`],fahrenheit:[`Fahrenheit`,`Độ F`]},M=(e,t)=>j[t][+(e===`vn`)],N=(e,t,n,r,i,a)=>`<rect x="${e}" y="${t}" width="${n}" height="${r}" rx="14" fill="${a}" stroke="${i}" stroke-width="2.5"/>`,P=(e,t,n,r)=>`<rect x="${e}" y="${t}" width="${n}" height="${r}" rx="14" fill="none" stroke="#cbd5e1" stroke-width="2" stroke-dasharray="9 8"/>`,F=(e,t)=>{let n=Math.min(300/Math.max(e.l,e.w),170/e.w),r=e.l*n,i=e.w*n,a=305-r/2,o=248-i/2;return`
    <rect x="${a}" y="${o}" width="${r}" height="${i}" fill="#eef4fb" stroke="${S}" stroke-width="3"/>
    <text x="305" y="${o+i+42}" font-family="${k}" font-size="22" font-weight="bold" fill="${w}" text-anchor="middle">l = ${e.l} cm</text>
    <text x="${a-14}" y="${o+i/2+8}" font-family="${k}" font-size="22" font-weight="bold" fill="${w}" text-anchor="end">w = ${e.w} cm</text>
    <text x="305" y="424" font-family="${k}" font-size="30" font-weight="bold" fill="${t?T:C}" text-anchor="middle">P = ${t?`${A(2*e.l+2*e.w)} cm`:`?`}</text>`},I=(e,t)=>{let n=Math.min(280/e.b,172/e.h),r=e.b*n,i=e.h*n,a=230-r/2,o=a+r*.68,s=356-i,c=s+i/2;return`
    <polygon points="${a},356 ${a+r},356 ${o},${s}" fill="#eef6e6" stroke="${S}" stroke-width="3.5" stroke-linejoin="round"/>
    <path d="M ${o} ${s} L ${o} 356" fill="none" stroke="${C}" stroke-width="3" stroke-dasharray="9 7"/>
    <path d="M ${o} 341 L ${o-15} 341 L ${o-15} 356" fill="none" stroke="${C}" stroke-width="2.5"/>
    <path d="M ${o+8} ${c} L 388 ${c}" fill="none" stroke="${C}" stroke-width="2"/>
    <circle cx="390" cy="${c}" r="4" fill="${C}"/>
    <text x="400" y="${c+8}" font-family="${k}" font-size="21" font-weight="bold" fill="${C}">h = ${e.h} cm</text>
    <text x="230" y="398" font-family="${k}" font-size="22" font-weight="bold" fill="${C}" text-anchor="middle">b = ${e.b} cm</text>
    <text x="265" y="432" font-family="${k}" font-size="30" font-weight="bold" fill="${t?T:C}" text-anchor="middle">A = ${t?`${A(e.b*e.h/2)} cm²`:`?`}</text>`},L=(e,t,n)=>{let r=Math.max(7,Math.min(1,Math.max(0,t))*178);return`
    <rect x="${e-17}" y="166" width="34" height="178" rx="17" fill="#f1f5f9" stroke="${S}" stroke-width="2.5"/>
    <rect x="${e-9}" y="${344-r}" width="18" height="${r}" fill="${n}"/>
    <circle cx="${e}" cy="368" r="25" fill="${n}" stroke="${S}" stroke-width="2.5"/>`},R={rect:{accent:D,formula:`P = 2l + 2w`,draw:F,steps:e=>[[`P = 2l + 2w`,`Write the formula first.`,`Viết công thức trước đã.`],[`P = 2 × ${e.l} + 2 × ${e.w}`,`Put the numbers in. Keep the × signs.`,`Thay số vào. Giữ lại dấu ×.`],[`P = ${A(2*e.l)} + ${A(2*e.w)}`,`Multiply before you add.`,`Nhân trước, cộng sau.`],[`P = ${A(2*e.l+2*e.w)} cm`,`A perimeter is a length: cm.`,`Chu vi là độ dài: cm.`]],problems:[{l:9,w:4,ctx:[`Mr Bowen has a photo frame 9 cm long and 4 cm wide.`,`Thầy Bowen có một khung ảnh dài 9 cm, rộng 4 cm.`]},{l:12,w:5,ctx:[`A wall tile is 12 cm long and 5 cm wide.`,`Một viên gạch tường dài 12 cm, rộng 5 cm.`]},{l:7,w:7,ctx:[`A sticky note is 7 cm on every side. It is still a rectangle.`,`Tờ giấy nhớ có mọi cạnh 7 cm. Nó vẫn là hình chữ nhật.`]},{l:15,w:2,ctx:[`A bookmark is 15 cm long and 2 cm wide.`,`Một cái đánh dấu sách dài 15 cm, rộng 2 cm.`]},{l:6.5,w:3,ctx:[`A phone screen is 6.5 cm long and 3 cm wide.`,`Màn hình điện thoại dài 6,5 cm, rộng 3 cm.`]},{l:11,w:4.5,ctx:[`A pencil case lid is 11 cm long and 4.5 cm wide.`,`Nắp hộp bút dài 11 cm, rộng 4,5 cm.`]}]},triangle:{accent:T,formula:`A = b × h ÷ 2`,draw:I,steps:e=>[[`A = b × h ÷ 2`,`Write the formula first.`,`Viết công thức trước đã.`],[`A = ${e.b} × ${e.h} ÷ 2`,`h is the dashed line, not the slant.`,`h là đường nét đứt, không phải cạnh xiên.`],[`A = ${A(e.b*e.h)} ÷ 2`,`Multiply first, then halve it.`,`Nhân trước, rồi chia đôi.`],[`A = ${A(e.b*e.h/2)} cm²`,`An area is a surface: cm².`,`Diện tích là bề mặt: cm².`]],problems:[{b:8,h:5,ctx:[`A triangular flag has base 8 cm and height 5 cm.`,`Một lá cờ tam giác có đáy 8 cm và chiều cao 5 cm.`]},{b:10,h:6,ctx:[`A slice of watermelon has base 10 cm and height 6 cm.`,`Một miếng dưa hấu có đáy 10 cm và chiều cao 6 cm.`]},{b:7,h:4,ctx:[`A triangle in Mr Bowen's notebook: base 7 cm, height 4 cm.`,`Một tam giác trong vở thầy Bowen: đáy 7 cm, cao 4 cm.`]},{b:9,h:6,ctx:[`A road sign has base 9 cm and height 6 cm on the plan.`,`Một biển báo có đáy 9 cm và cao 6 cm trên bản vẽ.`]},{b:5,h:3,ctx:[`A very small triangle has base 5 cm and height 3 cm.`,`Một tam giác rất nhỏ có đáy 5 cm và cao 3 cm.`]},{b:12,h:7,ctx:[`A roof end has base 12 cm and height 7 cm on the drawing.`,`Đầu hồi mái nhà có đáy 12 cm và cao 7 cm trên bản vẽ.`]}]},temp:{accent:E,formula:`F = 1.8 × c + 32`,draw:(e,t,n)=>`
    ${L(180,e.c/100,w)}
    ${L(390,e.c/100,E)}
    <text x="180" y="148" font-family="${k}" font-size="30" font-weight="bold" fill="${w}" text-anchor="middle">${e.c} °C</text>
    <text x="390" y="148" font-family="${k}" font-size="30" font-weight="bold" fill="${t?T:C}" text-anchor="middle">${t?`${A(1.8*e.c+32)} °F`:`? °F`}</text>
    <text x="180" y="424" font-family="${k}" font-size="21" font-weight="bold" fill="${S}" text-anchor="middle">${M(n,`celsius`)}</text>
    <text x="390" y="424" font-family="${k}" font-size="21" font-weight="bold" fill="${S}" text-anchor="middle">${M(n,`fahrenheit`)}</text>`,steps:e=>[[`F = 1.8 × c + 32`,`Write the formula first.`,`Viết công thức trước đã.`],[`F = 1.8 × ${e.c} + 32`,`c is the Celsius number. Put it in.`,`c là số độ C. Thay vào.`],[`F = ${A(1.8*e.c)} + 32`,`Multiply before you add.`,`Nhân trước, cộng sau.`],[`F = ${A(1.8*e.c+32)} °F`,`Same heat. Different scale.`,`Cùng độ nóng. Khác thang đo.`]],problems:[{c:10,ctx:[`A cold morning in Sa Pa is 10 °C.`,`Một buổi sáng lạnh ở Sa Pa là 10 °C.`]},{c:25,ctx:[`A pleasant classroom is 25 °C.`,`Một lớp học dễ chịu là 25 °C.`]},{c:0,ctx:[`Ice is 0 °C.`,`Nước đá là 0 °C.`]},{c:35,ctx:[`Ha Noi in June is 35 °C. This is the one you argued about.`,`Hà Nội tháng Sáu là 35 °C. Đây là bài các em đã tranh luận.`]},{c:37,ctx:[`Your body is 37 °C.`,`Cơ thể em là 37 °C.`]},{c:100,ctx:[`Boiling water is 100 °C.`,`Nước sôi là 100 °C.`]}]},storm:{accent:O,formula:`d = t ÷ 3`,draw:(e,t)=>`
    <path d="M 56 212 Q 36 180 68 169 Q 76 140 114 144 Q 138 122 166 142 Q 204 135 211 169 Q 238 178 227 212 Z" fill="#dbe4ec" stroke="${S}" stroke-width="2.5" stroke-linejoin="round"/>
    <polygon points="140,212 118,264 144,264 122,320 172,250 145,250 165,212" fill="#ffd23f" stroke="${S}" stroke-width="2.5" stroke-linejoin="round"/>
    <circle cx="330" cy="222" r="38" fill="#ffffff" stroke="${S}" stroke-width="3"/>
    <path d="M 330 193 L 330 184 M 319 182 L 341 182" fill="none" stroke="${S}" stroke-width="3" stroke-linecap="round"/>
    <text x="330" y="233" font-family="${k}" font-size="28" font-weight="bold" fill="${S}" text-anchor="middle">${e.t} s</text>
    <circle cx="440" cy="292" r="14" fill="#fdf1e3" stroke="${S}" stroke-width="2.5"/>
    <path d="M 440 306 L 440 332 M 425 315 L 455 315 M 440 332 L 428 352 M 440 332 L 452 352" fill="none" stroke="${S}" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M 40 354 L 500 354" fill="none" stroke="${S}" stroke-width="3"/>
    <path d="M 130 384 L 428 384" fill="none" stroke="${C}" stroke-width="3" marker-start="url(#fm-key)" marker-end="url(#fm-key)"/>
    <text x="279" y="424" font-family="${k}" font-size="28" font-weight="bold" fill="${t?T:C}" text-anchor="middle">d = ${t?`${A(e.t/3)} km`:`?`}</text>`,steps:e=>[[`d = t ÷ 3`,`Write the formula first.`,`Viết công thức trước đã.`],[`d = ${e.t} ÷ 3`,`t is the seconds you counted.`,`t là số giây em đếm được.`],[`d = ${A(e.t/3)} km`,`About 3 seconds per kilometre.`,`Khoảng 3 giây cho mỗi ki-lô-mét.`]],problems:[{t:9,ctx:[`You see the flash. You count 9 seconds. Then the bang.`,`Em thấy tia chớp. Em đếm 9 giây. Rồi tiếng sấm.`]},{t:15,ctx:[`The next flash. You count 15 seconds.`,`Tia chớp tiếp theo. Em đếm 15 giây.`]},{t:3,ctx:[`You count 3 seconds. Go inside.`,`Em đếm 3 giây. Vào nhà ngay.`]},{t:24,ctx:[`You count 24 seconds.`,`Em đếm 24 giây.`]},{t:45,ctx:[`You count 45 seconds. The storm is a long way off.`,`Em đếm 45 giây. Cơn giông còn rất xa.`]},{t:6,ctx:[`You count 6 seconds. Is it closer than the last one?`,`Em đếm 6 giây. Có gần hơn lần trước không?`]}]}};function z({lang:e,count:t,i:n,onPick:r,n:i,onBack:a,onNext:o,accent:s,solved:c,nextLabel:l}){return(0,b.jsxs)(`div`,{className:`w-full flex-shrink-0 mt-2 flex flex-wrap items-center gap-2`,children:[(0,b.jsx)(`div`,{className:`flex items-center gap-1.5`,children:Array.from({length:t},(e,t)=>(0,b.jsx)(`button`,{onClick:()=>r(t),className:`w-9 h-9 rounded-xl font-black text-sm border-2 active:scale-95 transition-all ${t===n?`text-white border-transparent`:`text-slate-500 dark:text-slate-300 border-slate-200 dark:border-slate-600`}`,style:t===n?{backgroundColor:s}:void 0,children:t+1},t))}),(0,b.jsx)(`button`,{onClick:a,disabled:i===0,className:`px-3 py-2 rounded-xl font-black text-xs uppercase tracking-widest border-2 border-slate-200 dark:border-slate-600 text-slate-500 dark:text-slate-300 disabled:opacity-30 active:scale-95`,children:M(e,`back`)}),(0,b.jsx)(`button`,{onClick:o,className:`flex-1 min-w-[180px] py-2.5 rounded-xl font-black text-sm uppercase tracking-widest text-white border-2 active:scale-95 transition-all`,style:{backgroundColor:c?O:s,borderColor:c?O:s},children:c?M(e,`nextProblem`):l}),(0,b.jsx)(`span`,{className:`hidden xl:block text-[11px] font-black uppercase tracking-[0.15em] text-slate-400`,children:M(e,`whiteboards`)})]})}function B({lang:e=`en`,station:t=`rect`}){let n=R[t],[r,i]=(0,y.useState)(0),[a,o]=(0,y.useState)(0),s=n.problems[r],c=n.steps(s),l=a>=c.length,u=n.accent,d=c.map((t,n)=>{let r=118+n*80;if(n>=a)return P(540,r,560,68);let i=n===c.length-1?T:n===0?C:w;return`${N(540,r,560,68,i,`${i}12`)}
      <text x="562" y="${r+34}" font-family="${k}" font-size="30" font-weight="bold" fill="${i}">${t[0]}</text>
      <text x="562" y="${r+57}" font-family="${k}" font-size="16" font-weight="bold" fill="${S}">${x(e,t[1],t[2])}</text>`}).join(``),f=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1120 440" class="w-full h-full">
    <defs>
      <marker id="fm-key" viewBox="0 0 10 10" refX="9" refY="5" markerUnits="userSpaceOnUse" markerWidth="13" markerHeight="13" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="${C}"/></marker>
    </defs>
    <rect x="0" y="0" width="1120" height="440" rx="16" fill="#ffffff"/>
    ${N(20,10,500,56,u,`${u}14`)}
    <text x="270" y="48" font-family="${k}" font-size="32" font-weight="bold" fill="${u}" text-anchor="middle">${n.formula}</text>
    <text x="270" y="94" font-family="${k}" font-size="19" font-weight="bold" fill="${S}" text-anchor="middle">${x(e,s.ctx[0],s.ctx[1])}</text>
    ${n.draw(s,l,e)}
    ${d}
  </svg>`;return(0,b.jsxs)(`div`,{className:`w-full h-full flex flex-col select-none`,children:[(0,b.jsx)(`div`,{className:`flex-1 min-h-0 w-full`,dangerouslySetInnerHTML:{__html:f}}),(0,b.jsx)(z,{lang:e,count:n.problems.length,i:r,onPick:e=>{i(e),o(0)},n:a,onBack:()=>o(Math.max(0,a-1)),onNext:()=>{l?(i((r+1)%n.problems.length),o(0)):o(a+1)},accent:u,solved:l,nextLabel:M(e,`nextStep`)})]})}var V=e=>(0,b.jsx)(B,{...e,station:`rect`}),H=e=>(0,b.jsx)(B,{...e,station:`triangle`}),U=e=>(0,b.jsx)(B,{...e,station:`temp`}),W=e=>(0,b.jsx)(B,{...e,station:`storm`}),G=[{a:[4,3,3],b:[6,3],ctx:[`The tank from the last slide: 4 cm by 3 cm, water 3 cm deep.`,`Bể ở trang trước: 4 cm nhân 3 cm, nước sâu 3 cm.`]},{a:[6,5,2],b:[4,3],ctx:[`A wide tank pours into a narrow one. Watch what the water does.`,`Bể rộng đổ sang bể hẹp. Xem nước làm gì nhé.`]},{a:[4,3,5],b:[6,2],ctx:[`A different shape of tank. Is the water deeper, or not?`,`Bể có hình dạng khác. Nước sâu hơn hay không?`]},{a:[10,4,3],b:[8,5],ctx:[`A long fish tank empties into a shorter, wider one.`,`Một bể cá dài đổ sang một bể ngắn hơn và rộng hơn.`]},{a:[5,4,3],b:[8,3],ctx:[`This one does not come out as a whole number of centimetres.`,`Bài này đáp án không phải số nguyên xăng-ti-mét.`]}],K=7,q=376,ee=([e,t],[n,r])=>Math.min(300/(e+.42*t),300/(n+.42*r),34),J=(e,t,n,r,i,a)=>{let o=t*a,s=K*a,c=q-s,l=Math.round(n*a*.42),u=-Math.round(l*.62),d=r*a,f=q-d,p=`
    <polygon points="${e},${c} ${e+l},${c+u} ${e+o+l},${c+u} ${e+o},${c}" fill="none" stroke="${S}" stroke-width="2.5" stroke-linejoin="round"/>
    <polygon points="${e+o},${c} ${e+o+l},${c+u} ${e+o+l},${q+u} ${e+o},${q}" fill="#eef4f8" stroke="${S}" stroke-width="2.5" stroke-linejoin="round"/>`,m=`<rect x="${e}" y="${c}" width="${o}" height="${s}" fill="none" stroke="${S}" stroke-width="3"/>`;if(i===`empty`)return`${p}${m}`;let h=i===`fill`?`<rect x="${e}" y="${q}" width="${o}" height="0" fill="#bfe6f4" stroke="#3d8fb0" stroke-width="2">
         <animate attributeName="y" from="${q}" to="${f}" dur="0.9s" begin="0.3s" fill="freeze"/>
         <animate attributeName="height" from="0" to="${d}" dur="0.9s" begin="0.3s" fill="freeze"/>
       </rect>`:i===`drain`?`<rect x="${e}" y="${f}" width="${o}" height="${d}" fill="#bfe6f4" stroke="#3d8fb0" stroke-width="2">
           <animate attributeName="y" from="${f}" to="${q}" dur="0.9s" begin="0.3s" fill="freeze"/>
           <animate attributeName="height" from="${d}" to="0" dur="0.9s" begin="0.3s" fill="freeze"/>
         </rect>`:`<rect x="${e}" y="${f}" width="${o}" height="${d}" fill="#bfe6f4" stroke="#3d8fb0" stroke-width="2"/>`,g=i===`fill`?`<animateTransform attributeName="transform" type="translate" from="0 ${d}" to="0 0" dur="0.9s" begin="0.3s" fill="freeze"/>`:i===`drain`?`<animateTransform attributeName="transform" type="translate" from="0 0" to="0 ${d}" dur="0.9s" begin="0.3s" fill="freeze"/>`:``,_=i===`drain`?`<animate attributeName="opacity" from="1" to="0" dur="0.3s" begin="1.0s" fill="freeze"/>`:``;return`${p}${h}${`<polygon points="${e},${f} ${e+l},${f+u} ${e+o+l},${f+u} ${e+o},${f}" fill="#7ec8e3" stroke="#3d8fb0" stroke-width="2" transform="translate(0 ${i===`fill`?d:0})">${g}${_}</polygon>`}${m}`};function te({lang:e=`en`}){let[t,n]=(0,y.useState)(0),[r,i]=(0,y.useState)(0),a=G[t],[o,s,c]=a.a,[l,u]=a.b,d=o*s*c,f=l*u,p=d/f,m=r>=4,h=ee(a.a,a.b),g=m?q-p*h-18:q-3.5*h,_=70+o*h+Math.round(s*h*.42),v=[[`${o} × ${s} × ${c} = ${d} cm³`,`How much water is in tank A?`,`Bể A có bao nhiêu nước?`],[`Still ${d} cm³`,`Pouring does not make new water.`,`Đổ nước không tạo ra nước mới.`],[`${l} × ${u} = ${f} cm³`,`One layer of tank B holds this.`,`Một lớp của bể B chứa được từng này.`],[`${d} ÷ ${f} = ${A(p)} cm`,`Total ÷ one layer = how many layers.`,`Tổng ÷ một lớp = số lớp.`]].map((t,n)=>{let i=118+n*80;if(n>=r)return P(740,i,360,68);let a=n===3?T:n===1?w:C;return`${N(740,i,360,68,a,`${a}12`)}
      <text x="920" y="${i+32}" font-family="${k}" font-size="25" font-weight="bold" fill="${a}" text-anchor="middle">${t[0]}</text>
      <text x="920" y="${i+55}" font-family="${k}" font-size="15" font-weight="bold" fill="${S}" text-anchor="middle">${x(e,t[1],t[2])}</text>`}).join(``),E=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1120 440" class="w-full h-full">
    <defs>
      <marker id="pw-blue" viewBox="0 0 10 10" refX="9" refY="5" markerUnits="userSpaceOnUse" markerWidth="14" markerHeight="14" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="${w}"/></marker>
    </defs>
    <rect x="0" y="0" width="1120" height="440" rx="16" fill="#ffffff"/>

    <text x="370" y="40" font-family="${k}" font-size="19" font-weight="bold" fill="${S}" text-anchor="middle">${x(e,a.ctx[0],a.ctx[1])}</text>

    <text x="70" y="102" font-family="${k}" font-size="19" font-weight="bold" fill="${D}">${M(e,`tankA`)}</text>
    <text x="420" y="102" font-family="${k}" font-size="19" font-weight="bold" fill="${C}">${M(e,`tankB`)}</text>

    ${J(70,o,s,c,m?`drain`:`full`,h)}
    ${J(420,l,u,p,m?`fill`:`empty`,h)}

    <path d="M ${_+14} 268 Q ${(_+420)/2} 208 412 254" fill="none" stroke="${w}" stroke-width="4" marker-end="url(#pw-blue)" opacity="${m?1:.22}"/>

    <text x="${70+o*h/2}" y="408" font-family="${k}" font-size="20" font-weight="bold" fill="${w}" text-anchor="middle">${o} cm × ${s} cm</text>
    <text x="56" y="${q-c*h/2+8}" font-family="${k}" font-size="20" font-weight="bold" fill="${w}" text-anchor="end">${c} cm</text>
    <text x="${420+l*h/2}" y="408" font-family="${k}" font-size="20" font-weight="bold" fill="${C}" text-anchor="middle">${l} cm × ${u} cm</text>
    <text x="${420+l*h/2}" y="${g}" font-family="${k}" font-size="30" font-weight="bold" fill="${m?T:C}" text-anchor="middle">${m?`${A(p)} cm`:`? cm`}</text>

    ${v}
  </svg>`;return(0,b.jsxs)(`div`,{className:`w-full h-full flex flex-col select-none`,children:[(0,b.jsx)(`div`,{className:`flex-1 min-h-0 w-full`,dangerouslySetInnerHTML:{__html:E}}),(0,b.jsx)(z,{lang:e,count:G.length,i:t,onPick:e=>{n(e),i(0)},n:r,onBack:()=>i(Math.max(0,r-1)),onNext:()=>{m?(n((t+1)%G.length),i(0)):i(r+1)},accent:D,solved:m,nextLabel:r===3?M(e,`pour`):M(e,`nextStep`)})]})}var Y=`#0087a8`,X=`#5c2483`,Z=`#c25e12`,Q=`#4a8b23`,ne=`#1a5fa8`,$=`#c8102e`,re={meta:{course:`y7-math`,unit:`T1`,id:`T01`,title:`Task: The Formula Machine`,objective:`A standalone task following 2.2. Students take one formula at a time and run six different sets of values through it, with the diagram redrawing for every set: perimeter of a rectangle, area of a triangle (where the height is the dashed line and never the slanted side), Celsius to Fahrenheit, and the distance to a storm from the seconds between the flash and the bang. Every problem is worked in three lines — write the formula, put the numbers in, work it out — because the middle line is where the marks and the mistakes both live. Part 2 turns the question round: water is poured from one tank into another with a different base, and the depth it reaches is the letter that was NOT given. The way in is counting centimetre cubes — how many altogether, how many in one layer, divide — not rearranging a formula.`,order:8.1},slides:[{layout:`hero`,color:X,icon:`Calculator`,brand:`Year 7 Mathematics`,brandVn:`Toán Lớp 7`,eyebrow:`Task 1`,eyebrowVn:`Nhiệm vụ 1`,title:`The Formula Machine`,titleVn:`Cỗ Máy Công Thức`,subtitle:`One formula. Many different pictures.`,subtitleVn:`Một công thức. Rất nhiều hình vẽ khác nhau.`,card:{icon:`Pencil`,badge:`Starter Task`,badgeVn:`Nhiệm vụ khởi động`,text:`A rectangle is **8 cm** long and **3 cm** wide. An ant walks all the way around the edge.

How far does it walk? Whiteboards. **30 seconds.**`,textVn:`Một hình chữ nhật dài **8 cm**, rộng **3 cm**. Một con kiến bò hết một vòng quanh mép.

Nó bò được bao xa? Viết ra bảng con. **30 giây.**`}},{layout:`split`,accent:Y,icon:`Ruler`,side:`left`,eyebrow:`The answer is 22 cm, and it was never hard`,eyebrowVn:`Đáp án là 22 cm, và nó chưa bao giờ khó`,title:`You Can Already Do This`,titleVn:`Em Đã Làm Được Rồi`,ratio:45,inlineSvg:v.ANT_WALK,content:`The ant walks 8, then 3, then 8, then 3. That is **22 cm**, and it is finished. The distance all the way around the outside of a shape is the **perimeter**.

Adding four numbers is fine for one rectangle. It is slow for forty. A **formula** does the same job every time.`,contentVn:`Con kiến bò 8, rồi 3, rồi 8, rồi 3. Được **22 cm**, và bài đã xong. Khoảng cách đi hết một vòng quanh bên ngoài một hình chính là **chu vi**.

Cộng bốn số thì ổn với một hình. Nhưng rất chậm với bốn mươi hình. **Công thức** làm đúng việc đó mọi lần.`,notes:[{tone:`write`,text:`**Perimeter (P):** the distance all the way around the outside of a shape.
**Formula:** a rule connecting quantities, written with letters, with an = sign.
**Perimeter of a rectangle:** $P = 2l + 2w$`,textVn:`**Perimeter — Chu vi (P):** khoảng cách đi hết một vòng quanh bên ngoài một hình.
**Formula — Công thức:** một quy tắc nối các đại lượng, viết bằng chữ cái, và có dấu =.
**Chu vi hình chữ nhật:** $P = 2l + 2w$`}]},{layout:`split`,accent:Z,icon:`Layers`,eyebrow:`Every problem today is these three moves`,eyebrowVn:`Mọi bài hôm nay đều là ba bước này`,title:`Three Moves, Every Time`,titleVn:`Ba Bước, Lần Nào Cũng Vậy`,ratio:45,inlineSvg:v.THREE_MOVES,content:`The middle move is the one that gets skipped, and it is the one that is marked.

A student who jumps straight from the formula to the answer has nothing on the page to check, and nothing on the page to get credit for. Write the middle line.`,contentVn:`Bước ở giữa là bước hay bị bỏ qua, và đó lại chính là bước được chấm điểm.

Bạn nào nhảy thẳng từ công thức sang đáp án thì trên giấy không có gì để kiểm tra, cũng không có gì để được điểm. Hãy viết dòng ở giữa.`,notes:[{tone:`write`,text:`**1 Write the formula.** $P = 2l + 2w$
**2 Put the numbers in.** P = 2 × 8 + 2 × 3
**3 Work it out.** P = 16 + 6 = 22 cm
**2l means 2 × l.** It is a multiplication, never two things stuck together.`,textVn:`**1 Viết công thức.** $P = 2l + 2w$
**2 Thay số vào.** P = 2 × 8 + 2 × 3
**3 Tính ra kết quả.** P = 16 + 6 = 22 cm
**2l nghĩa là 2 × l.** Đó là phép nhân, không bao giờ là hai thứ dính vào nhau.`}]},{layout:`showcase`,accent:Y,icon:`Ruler`,eyebrow:`Station 1 · six rectangles, one formula`,eyebrowVn:`Trạm 1 · sáu hình chữ nhật, một công thức`,title:`Try Six Rectangles`,titleVn:`Thử Sáu Hình Chữ Nhật`,widget:V,caption:`Problems 2 and 4 have the same answer. Ask the class why before you press.`,captionVn:`Bài 2 và bài 4 có cùng đáp án. Hãy hỏi cả lớp vì sao trước khi bấm.`},{layout:`split`,accent:ne,icon:`Triangle`,side:`left`,eyebrow:`No numbers on this slide`,eyebrowVn:`Trang này không có số nào cả`,title:`Before We Calculate`,titleVn:`Trước Khi Tính`,ratio:45,inlineSvg:v.TRIANGLE_IN_RECT,content:`The triangle sits inside the rectangle. Its base is the whole bottom edge, and its top corner touches the top edge.

**How much of the rectangle does the triangle cover?**

Talk to the person next to you. Then tell me the fraction — and tell me how you know.`,contentVn:`Hình tam giác nằm gọn trong hình chữ nhật. Đáy của nó là cả cạnh dưới, và đỉnh của nó chạm vào cạnh trên.

**Tam giác chiếm bao nhiêu phần của hình chữ nhật?**

Hãy trao đổi với bạn bên cạnh. Rồi nói cho thầy phân số đó — và nói vì sao em biết.`},{layout:`split`,accent:Q,icon:`Triangle`,eyebrow:`Half of the rectangle — so halve the answer`,eyebrowVn:`Một nửa hình chữ nhật — nên chia đôi kết quả`,title:`Area of a Triangle`,titleVn:`Diện Tích Hình Tam Giác`,ratio:45,inlineSvg:v.TRIANGLE_HEIGHT,content:`A rectangle with the same base and height has area **b × h**. The triangle covers exactly half of it, so we halve.

**h** is the dashed line, not the slant.`,contentVn:`Hình chữ nhật cùng đáy, cùng chiều cao có diện tích **b × h**. Tam giác chiếm đúng một nửa, nên ta chia đôi.

**h** là đường nét đứt, không phải cạnh xiên.`,notes:[{tone:`write`,text:`**Area (A):** how much surface a shape covers, measured in cm².
**Base (b):** the side you measure along.
**Height (h):** the straight-up distance from the base to the top corner. The dashed line, never the slanted side.
**Area of a triangle:** A = b × h ÷ 2`,textVn:`**Area — Diện tích (A):** phần bề mặt mà một hình chiếm, đo bằng cm².
**Base — Đáy (b):** cạnh mà em đo dọc theo.
**Height — Chiều cao (h):** khoảng cách thẳng đứng từ đáy lên đỉnh. Là đường nét đứt, không bao giờ là cạnh xiên.
**Diện tích hình tam giác:** A = b × h ÷ 2`}]},{layout:`showcase`,accent:Q,icon:`Triangle`,eyebrow:`Station 2 · six triangles, one formula`,eyebrowVn:`Trạm 2 · sáu hình tam giác, một công thức`,title:`Try Six Triangles`,titleVn:`Thử Sáu Hình Tam Giác`,widget:H,caption:`Problem 5 does not come out whole. Half a square centimetre is a real answer.`,captionVn:`Bài 5 không ra số nguyên. Nửa xăng-ti-mét vuông vẫn là một đáp án đúng.`},{layout:`split`,accent:$,icon:`Thermometer`,side:`left`,eyebrow:`Hands up for each. I am counting.`,eyebrowVn:`Giơ tay cho từng bên. Thầy đếm đấy.`,title:`Two Cities`,titleVn:`Hai Thành Phố`,ratio:45,inlineSvg:v.TWO_THERMOMETERS,content:`Today Ha Noi is **35 degrees Celsius**.

Mr Bowen's cousin lives in Texas. She says it is **95 degrees Fahrenheit** there today.

**Which city is hotter?**

Hands up for Ha Noi. Hands up for Texas. Hands up if you think you cannot tell yet.`,contentVn:`Hôm nay Hà Nội là **35 độ C**.

Chị họ của thầy Bowen sống ở Texas. Chị ấy nói hôm nay ở đó là **95 độ F**.

**Thành phố nào nóng hơn?**

Giơ tay chọn Hà Nội. Giơ tay chọn Texas. Giơ tay nếu em nghĩ chưa thể biết được.`},{layout:`split`,accent:$,icon:`Thermometer`,eyebrow:`They are the same temperature`,eyebrowVn:`Hai nơi đó cùng một nhiệt độ`,title:`One Temperature, Two Scales`,titleVn:`Một Nhiệt Độ, Hai Thang Đo`,ratio:45,inlineSvg:v.TEMP_SCALES,content:`Ha Noi and Texas are exactly as hot as each other. 35 °C **is** 95 °F.

Celsius and Fahrenheit are two rulers laid against the same wall. Converting does not change the weather — it reads the other ruler.`,contentVn:`Hà Nội và Texas nóng như nhau y hệt. 35 °C **chính là** 95 °F.

Độ C và độ F là hai cái thước đặt lên cùng một bức tường. Đổi đơn vị không làm thời tiết đổi — nó chỉ là đọc cái thước kia.`,notes:[{tone:`write`,text:`**Celsius to Fahrenheit:** F = 1.8 × c + 32
**c** is the Celsius number. **F** is the Fahrenheit number.
Water freezes at 0 °C = 32 °F. Water boils at 100 °C = 212 °F.`,textVn:`**Đổi độ C sang độ F:** F = 1.8 × c + 32
**c** là số độ C. **F** là số độ F.
Nước đóng băng ở 0 °C = 32 °F. Nước sôi ở 100 °C = 212 °F.`}]},{layout:`showcase`,accent:$,icon:`Thermometer`,eyebrow:`Station 3 · six temperatures, one formula`,eyebrowVn:`Trạm 3 · sáu nhiệt độ, một công thức`,title:`Try Six Temperatures`,titleVn:`Thử Sáu Nhiệt Độ`,widget:U,caption:`Both thermometers fill to the same height every time. That is the whole idea.`,captionVn:`Lần nào hai nhiệt kế cũng dâng lên bằng nhau. Đó chính là ý chính.`},{layout:`split`,accent:X,icon:`Zap`,side:`left`,eyebrow:`You can use this one tonight`,eyebrowVn:`Công thức này tối nay em dùng được luôn`,title:`How Far Away Is the Storm?`,titleVn:`Cơn Giông Cách Bao Xa?`,ratio:45,inlineSvg:v.STORM_DISTANCE,content:`You see the flash at once. Sound is slow: it needs about **3 seconds** to travel one kilometre.

So the gap between the flash and the bang tells you how far away the storm is. Count the seconds and divide by three.`,contentVn:`Em thấy tia chớp ngay lập tức. Âm thanh thì chậm: nó cần khoảng **3 giây** để đi được một ki-lô-mét.

Vậy khoảng cách giữa chớp và sấm cho biết cơn giông cách bao xa. Đếm số giây rồi chia ba.`,notes:[{tone:`write`,text:`**Distance to a storm:** d = t ÷ 3
**t** is the number of seconds between the flash and the bang. **d** is the distance in kilometres.
Sound needs about 3 seconds to travel 1 km. Light arrives at once.`,textVn:`**Khoảng cách tới cơn giông:** d = t ÷ 3
**t** là số giây giữa chớp và sấm. **d** là khoảng cách (km).
Âm thanh cần khoảng 3 giây để đi 1 km. Ánh sáng tới ngay.`}]},{layout:`showcase`,accent:X,icon:`Zap`,eyebrow:`Station 4 · six storms, one formula`,eyebrowVn:`Trạm 4 · sáu cơn giông, một công thức`,title:`Try Six Storms`,titleVn:`Thử Sáu Cơn Giông`,widget:W,caption:`Problem 6 is 6 seconds, after problem 5 was 45. Ask what that means before you press.`,captionVn:`Bài 6 là 6 giây, ngay sau bài 5 là 45 giây. Hỏi cả lớp điều đó nghĩa là gì trước khi bấm.`},{layout:`split`,accent:Y,icon:`Droplets`,side:`left`,eyebrow:`Part 2 · no numbers on this slide`,eyebrowVn:`Phần 2 · trang này không có số nào`,title:`The Pour`,titleVn:`Đổ Nước`,ratio:45,inlineSvg:v.POUR_QUESTION,content:`All of the water in the left tank is poured into the right tank. Nothing is spilled, and nothing is added.

The right tank has a **wider bottom** than the left one.

**Will the water end up deeper, shallower, or exactly the same?**

Say which. Then say why — that part is the maths.`,contentVn:`Toàn bộ nước ở bể bên trái được đổ sang bể bên phải. Không làm đổ giọt nào, cũng không thêm giọt nào.

Bể bên phải có **đáy rộng hơn** bể bên trái.

**Nước sẽ sâu hơn, nông hơn, hay đúng như cũ?**

Hãy chọn một. Rồi nói vì sao — phần đó mới là toán.`},{layout:`split`,accent:Y,icon:`Boxes`,eyebrow:`Count the cubes and the question answers itself`,eyebrowVn:`Đếm số khối là câu hỏi tự có lời giải`,title:`Water Is Made of Cubes`,titleVn:`Nước Được Xếp Từ Những Khối Lập Phương`,ratio:45,inlineSvg:v.WATER_LAYERS,content:`Think of the water as centimetre cubes. One layer here is 4 across and 3 deep — **12 cubes** — and the water is 3 layers high: **36 cubes**.

Pour it, and it is still 36 cubes. That is the only idea in Part 2.`,contentVn:`Hãy hình dung nước là những khối 1 cm. Một lớp ở đây rộng 4, sâu 3 — **12 khối** — và nước cao 3 lớp: **36 khối**.

Đổ nước đi, vẫn là 36 khối. Đó là ý duy nhất của Phần 2.`,notes:[{tone:`write`,text:`**Volume (V):** how much space something takes up, measured in cm³.
**Volume of a cuboid:** V = l × w × h
Pouring water into a different tank does not change its volume. The cubes are the same cubes.`,textVn:`**Volume — Thể tích (V):** lượng không gian mà một vật chiếm, đo bằng cm³.
**Thể tích hình hộp chữ nhật:** V = l × w × h
Đổ nước sang bể khác không làm thể tích thay đổi. Vẫn là những khối ấy.`}]},{layout:`split`,accent:Z,icon:`Equal`,eyebrow:`How deep is a division, not a guess`,eyebrowVn:`"Sâu bao nhiêu" là một phép chia, không phải đoán`,title:`Two Questions, Then You Are Done`,titleVn:`Hai Câu Hỏi, Rồi Là Xong`,ratio:45,inlineSvg:v.POUR_TWO_STEPS,content:`The new tank has a base of 6 cm by 3 cm, so **one layer holds 18 cubes**.

36 cubes ÷ 18 in a layer = 2 layers, and 2 layers of centimetre cubes is **2 cm deep**.`,contentVn:`Bể mới có đáy 6 cm nhân 3 cm, nên **một lớp chứa được 18 khối**.

36 khối ÷ 18 mỗi lớp = 2 lớp, và 2 lớp khối 1 cm nghĩa là nước **sâu 2 cm**.`,notes:[{tone:`write`,text:`**To find the new depth:**
**1** How many cubes of water? V = l × w × h
**2** How many cubes in one layer of the new tank? l × w
**3** Divide: cubes altogether ÷ cubes in a layer = depth in cm.`,textVn:`**Để tìm độ sâu mới:**
**1** Có bao nhiêu khối nước? V = l × w × h
**2** Một lớp bể mới chứa bao nhiêu khối? l × w
**3** Chia: tổng số khối ÷ số khối một lớp = độ sâu (cm).`}]},{layout:`showcase`,accent:Y,icon:`Droplets`,eyebrow:`Station 5 · five pours`,eyebrowVn:`Trạm 5 · năm lần đổ nước`,title:`Pour It Five Times`,titleVn:`Đổ Nước Năm Lần`,widget:te,caption:`Ask for deeper, shallower or the same BEFORE each one. Problem 3 is the one that catches people.`,captionVn:`Trước mỗi bài, hãy hỏi: sâu hơn, nông hơn hay như cũ? Bài 3 là bài dễ nhầm nhất.`},{layout:`stack`,variant:`checklist`,accent:Q,icon:`CheckCircle2`,title:`What You Now Own`,titleVn:`Những Gì Em Đã Có`,columns:2,content:`Your notebook should now have **seven orange panels**. Count them.`,contentVn:`Vở của em bây giờ phải có **bảy khung màu cam**. Hãy đếm lại.`,items:[{text:`Write the formula · put the numbers in · work it out. Always three lines.`,textVn:`Viết công thức · thay số vào · tính ra kết quả. Luôn luôn ba dòng.`},{text:`**2l means 2 × l** — a multiplication, never two things stuck together.`,textVn:`**2l nghĩa là 2 × l** — một phép nhân, không bao giờ là hai thứ dính vào nhau.`},{text:`Perimeter $P = 2l + 2w$, in cm. Area of a triangle A = b × h ÷ 2, in cm².`,textVn:`Chu vi $P = 2l + 2w$, đơn vị cm. Diện tích tam giác A = b × h ÷ 2, đơn vị cm².`},{text:`The height of a triangle goes **straight up**. It is never the slanted side.`,textVn:`Chiều cao tam giác là đường **thẳng đứng**. Không bao giờ là cạnh xiên.`},{text:`F = 1.8 × c + 32 converts Celsius to Fahrenheit. Same heat, different ruler.`,textVn:`F = 1.8 × c + 32 đổi độ C sang độ F. Cùng độ nóng, khác cái thước.`},{text:`d = t ÷ 3 gives the distance to a storm in km, from the seconds you counted.`,textVn:`d = t ÷ 3 cho khoảng cách tới cơn giông (km), từ số giây em đếm được.`},{text:`Volume of a cuboid V = l × w × h, in cm³. Pouring never changes it.`,textVn:`Thể tích hình hộp chữ nhật V = l × w × h, đơn vị cm³. Đổ đi đổ lại không làm nó đổi.`},{text:`New depth = cubes altogether ÷ cubes in one layer of the new tank.`,textVn:`Độ sâu mới = tổng số khối ÷ số khối trong một lớp của bể mới.`}]},{layout:`hero`,color:Q,icon:`Target`,brand:`Year 7 Mathematics`,brandVn:`Toán Lớp 7`,eyebrow:`Task 1 · the formula never changed, only the numbers`,eyebrowVn:`Nhiệm vụ 1 · công thức không đổi, chỉ các con số đổi`,title:`One Machine, Five Jobs`,titleVn:`Một Cỗ Máy, Năm Công Việc`,card:{icon:`Pencil`,badge:`Exit Question`,badgeVn:`Câu hỏi ra về`,text:`A tank 5 cm by 4 cm holds water **4 cm** deep. Pour it into a tank with base 8 cm by 5 cm. How deep is it now? Show both lines.`,textVn:`Một bể 5 cm nhân 4 cm chứa nước sâu **4 cm**. Đổ sang bể có đáy 8 cm nhân 5 cm. Nước sâu bao nhiêu? Trình bày hai dòng.`}}],plan:{duration:`50 minutes`,objective:`Students can take a formula they are given, substitute values into it and state the answer with the right unit, using the same three lines every time — write the formula, put the numbers in, work it out; can do this for the perimeter of a rectangle (P = 2l + 2w), the area of a triangle (A = b × h ÷ 2), a Celsius to Fahrenheit conversion (F = 1.8c + 32) and the distance to a storm (d = t ÷ 3); know that the height of a triangle is the straight-up dashed line and never the slanted side; know that two rectangles with very different shapes can have the same perimeter, and that converting a temperature does not change how hot it is; can find the volume of water in a cuboid tank as V = l × w × h and state it in cm³; know that pouring water into a differently shaped tank does not change its volume; and can find the depth the water reaches in the new tank by dividing the total number of centimetre cubes by the number of cubes in one layer of that tank.`,materials:[`Projector / TV for the lesson deck`,`Mini whiteboards + markers (one per pair) — used on every station`,`Student notebooks`,`Optional but worth it for Part 2: two clear plastic containers of obviously different shapes, and a jug of water. Pour it in front of them once before slide 13.`],vocab:[{term:`Formula / formulae`,def:`carried over from 2.2 — a rule connecting quantities, written with letters, WITH an = sign. The plural is irregular; say it out loud twice`},{term:`Perimeter`,def:`the distance all the way around the OUTSIDE of a shape. A length, so the unit is cm. The word is not obvious to this class and is worth saying with a finger tracing the edge`},{term:`Area · base · height`,def:`area is the surface a shape covers, in cm². The height of a triangle is the straight-up distance from the base to the top corner — the dashed line, never the slanted side. This is the section's one real trap`},{term:`Celsius · Fahrenheit · convert`,def:`two scales for the same thing. "Convert" means read the other ruler; it does not mean change the weather. Both words are needed to read the question at all`},{term:`Flash · bang · thunder · lightning`,def:`needed for slides 11 and 12, and none of them appears in a maths book. Say them, and let a student say what happens first`},{term:`Volume · cuboid · tank · depth · pour · spill`,def:`Part 2 stands or falls on these six. "Depth" is what the question asks for and "how deep" is how it will be phrased; make sure both are in the room before slide 13`}],timeline:[{time:`0–5 min`,phase:`Starter`,detail:`Title slide, then slide 2. The ant walks 8 + 3 + 8 + 3 = 22. Almost everybody gets it, and that is the design — praise it and mean it, because the case for a formula is "this is slow for forty", not "you did it wrong". FIRST panel: perimeter, formula, P = 2l + 2w.`},{time:`5–10 min`,phase:`The routine`,detail:`Slide 3, SECOND panel. Three moves, and the middle one is the one that gets skipped and the one that is marked. Say "2l means 2 × l" out loud three times — this class met that error in 2.2 and it comes straight back the moment a picture is on the slide.`},{time:`10–18 min`,phase:`Station 1 — perimeter`,detail:`Slide 4. Six rectangles. Whiteboards up before each press. Problems 2 and 4 both come to 34 cm and look nothing alike — stop there and ask why; that is the point of the whole station. Problem 3 is a square, which is still a rectangle. Problem 5 has a decimal.`},{time:`18–20 min`,phase:`Ask first`,detail:`Slide 5 is QUESTION ONLY. The triangle inside the rectangle, no numbers anywhere. Wait for a student to say "half". Do not move on until somebody says WHY — the dashed line splits the picture into two rectangles and the triangle halves each one.`},{time:`20–28 min`,phase:`Station 2 — triangles`,detail:`Slide 6, THIRD panel: A = b × h ÷ 2, and the height is the dashed line. Then slide 7, six triangles, every one drawn leaning so the slanted side is visibly not the height. Problem 5 gives 7.5 cm² — half a square centimetre is a real answer and somebody will say it cannot be.`},{time:`28–34 min`,phase:`THE ARGUMENT`,detail:`Slide 8 is QUESTION ONLY and is the slide to protect. 35 °C against 95 °F, and they are the SAME temperature. Take a show of hands for each and write the split on the board before anybody converts anything. Then slide 9, FOURTH panel, and slide 10 — problem 4 of that station is the 35 °C they just argued about.`},{time:`34–40 min`,phase:`The storm`,detail:`Slide 11, FIFTH panel: d = t ÷ 3. Ask which arrives first, the flash or the bang, before you explain anything. Slide 12 is six storms; problem 6 is 6 seconds straight after problem 5 was 45, so ask what has happened before you press.`},{time:`40–48 min`,phase:`PART 2 — the pour`,detail:`Slide 13 is QUESTION ONLY: deeper, shallower or the same. Pour real water between two real containers here if you have them. Slide 14 SIXTH panel (volume, and it does not change), slide 15 SEVENTH panel (the two questions and the division), then slide 16. Do problems 1–3 as a class; 4 and 5 only if the time is there.`},{time:`48–50 min`,phase:`Close`,detail:`Recap checklist, and make them count the seven orange panels. Exit question on the last slide: a 5 by 4 tank with water 4 cm deep, poured into a tank with base 8 by 5. Answer 2 cm, and they must show two lines.`}],answers:[{q:`Starter — the ant on an 8 cm by 3 cm rectangle`,a:`22 cm. Accept 8 + 3 + 8 + 3 without the formula; that is exactly what slide 2 is built on.`},{q:`Station 1 — perimeter, P = 2l + 2w`,a:`1) 9 by 4 → 26 cm · 2) 12 by 5 → 34 cm · 3) 7 by 7 → 28 cm · 4) 15 by 2 → 34 cm · 5) 6.5 by 3 → 19 cm · 6) 11 by 4.5 → 31 cm. Problems 2 and 4 are equal on purpose. Watch for 2l being read as a two-digit number when l = 15.`},{q:`Slide 5 — how much of the rectangle does the triangle cover?`,a:`Half. The dashed line from the top corner down to the base cuts the picture into two rectangles, and the triangle takes exactly half of each. Do not put a number on this slide.`},{q:`Station 2 — area of a triangle, A = b × h ÷ 2`,a:`1) 8, 5 → 20 cm² · 2) 10, 6 → 30 cm² · 3) 7, 4 → 14 cm² · 4) 9, 6 → 27 cm² · 5) 5, 3 → 7.5 cm² · 6) 12, 7 → 42 cm². The predictable error is using the slanted side for h; the second predictable error is forgetting the ÷ 2 and doubling the answer.`},{q:`Slide 8 — which city is hotter, Ha Noi at 35 °C or Texas at 95 °F?`,a:`Neither. They are the same temperature. Take the show of hands FIRST and write the split on the board — the argument is worth more than the conversion.`},{q:`Station 3 — Celsius to Fahrenheit, F = 1.8c + 32`,a:`1) 10 → 50 °F · 2) 25 → 77 °F · 3) 0 → 32 °F · 4) 35 → 95 °F · 5) 37 → 98.6 °F · 6) 100 → 212 °F. Problem 3 catches people who think 0 must give 0. Problem 5 is body temperature and 6 is the boiling point from Science 2.2.`},{q:`Station 4 — the storm, d = t ÷ 3`,a:`1) 9 s → 3 km · 2) 15 s → 5 km · 3) 3 s → 1 km · 4) 24 s → 8 km · 5) 45 s → 15 km · 6) 6 s → 2 km. After 5 and 6, ask what has happened: the storm has come 13 km closer, so it is heading straight for us.`},{q:`Slide 13 — deeper, shallower or the same?`,a:`Shallower, because the new tank is wider — the same water spread over a bigger base has to be less deep. All three answers are correct for SOME pair of tanks, which is why the station has one of each. Take the word and the reason; no numbers on this slide.`},{q:`Station 5 — the pour`,a:`1) 4×3×3 = 36 into a 6×3 base (18 a layer) → 2 cm, shallower · 2) 6×5×2 = 60 into a 4×3 base (12) → 5 cm, DEEPER · 3) 4×3×5 = 60 into a 6×2 base (12) → 5 cm, exactly the SAME depth in a differently shaped tank, because both bases hold 12 · 4) 10×4×3 = 120 into an 8×5 base (40) → 3 cm · 5) 5×4×3 = 60 into an 8×3 base (24) → 2.5 cm.`},{q:`Exit question — 5 by 4 tank, water 4 cm deep, poured into a base 8 by 5`,a:`2 cm. Line one: 5 × 4 × 4 = 80 cm³. Line two: 80 ÷ 40 = 2 cm. A student who writes only "2 cm" has not answered the question that was asked.`}],notes:`THIS IS A TASK, NOT A SECTION. There is no exercise to set from it and no Learner's Book pages behind it. It exists because 2.2 introduced the word "formula" and then had about ten minutes to use one, and what this class actually needs is the same formula meeting many different sets of numbers until substituting stops being an event. THE PICTURE CHANGING IS THE WHOLE DESIGN. Year 7 does not fail to multiply — it fails to believe the formula still applies when the drawing looks different. That is why every station is a widget and not a printed figure: a 15 cm by 2 cm bookmark and a 12 cm by 5 cm tile have the same perimeter and look nothing alike, and the class has to see both come out of the same machine. THREE SLIDES ASK AND DO NOT TELL — 5, 8 and 13 — and none of them has the answer on it anywhere. Slide 8 is the one to protect if you are short of time: 35 °C and 95 °F are the same temperature, so the room splits, and a room that is arguing is paying attention in a way a room being told the answer is not. Write the count of hands on the board before you move. INSIST ON THE MIDDLE LINE, exactly as in 2.2. Write the formula, put the numbers in WITH the × signs back, then work it out. Every predictable error today is invisible in a final answer and obvious in the middle line: 2l read as a two-digit number, the slanted side used as the height, the ÷ 2 forgotten, 1.8 × c added before it is multiplied. PART 2 IS NOT REARRANGING, AND SHOULD NOT BE TAUGHT AS IF IT WERE. The question asks for the letter that was not given, and a Year 7 who is shown h = V ÷ (l × w) will remember a shape of symbols and nothing else. Counting cubes is the honest route and it survives: how many cubes of water are there, how many fit in one layer of the new tank, divide. The number of layers IS the depth in centimetres, and that sentence is the one to repeat. POUR REAL WATER IF YOU CAN. Two clear containers of obviously different shapes and a jug, done once in front of them before slide 13, is worth more than any animation — the widget then confirms something they have already watched happen. PROBLEM 3 OF THE POUR STATION IS THE ONE THAT MATTERS. The water ends up at exactly the same depth in a tank that looks completely different, because both bases hold 12 cubes a layer. "Same volume" and "same depth" are the two ideas most easily confused in this topic and that problem is the only thing in the deck that separates them. Anything students must copy is in an orange "Write This Down" panel; everything else is discussion. Seven panels, and the recap slide asks them to count. This deck has no photographs — all ten figures are authored SVG in diagrams.js, so there is no images/CREDITS.json for this task.`}};export{re as default};