import{r as e}from"./rolldown-runtime-XKyaHtl9.js";import{Ki as t,Li as n,Ui as r,Uo as i,ao as a,gi as o,il as s,na as c,qc as l,wi as u}from"./vendor-BpJNYKxZ.js";import{f as d}from"./classroom-DEA5bv9U.js";var f=`/assets/apple-D4KYtaIr.jpg`,p=`/assets/banana-L6wCETgu.jpg`,m=`/assets/strawberry-B27P-mRI.jpg`,h=`/assets/bricks-DYZho0if.jpg`,g=`#2b2b2b`,_=`#c25e12`,v=`#5b6770`,y=`#cfd8dc`,b=`#0087a8`,x=`#5c2483`,S=`#5b6770`,C=`#4a8b23`,w=`#c8102e`,T=`#1a5fa8`,E=`#e2f2f6`,ee=`#f2ecf7`,te=`#eef1f4`,D=`#eef6e6`,O=`#fdecee`,k=`#fdf1e3`,A=`Inter, 'Segoe UI', system-ui, sans-serif`,j=`'Segoe Print', 'Bradley Hand', 'Comic Sans MS', cursive`,M=(e,t)=>`<rect x="0" y="0" width="${e}" height="${t}" rx="14" fill="#ffffff"/>
    <rect x="0.75" y="0.75" width="${e-1.5}" height="${t-1.5}" rx="13" fill="none" stroke="#e2e8f0" stroke-width="1.5"/>`,ne=(e,t,n,r,i)=>`<image href="${e}" x="${t}" y="${n}" width="${r}" height="${i}" preserveAspectRatio="xMidYMid meet"/>`,N=(e,t)=>`<circle cx="${e}" cy="${t}" r="34" fill="${C}"/>
    <path d="M ${e-17} ${t+1} l 12 12 l 22 -26" fill="none" stroke="#ffffff" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>`,P=(e,t)=>`<circle cx="${e}" cy="${t}" r="34" fill="${w}"/>
    <path d="M ${e-13} ${t-13} l 26 26 M ${e+13} ${t-13} l -26 26" fill="none" stroke="#ffffff" stroke-width="7" stroke-linecap="round"/>`,re={C:{fill:`#aab4bc`,stroke:`#3b444b`},O:{fill:`#f08b82`,stroke:`#b3261e`},H:{fill:`#ffffff`,stroke:`#6b7580`}},F=(e,t,n)=>`<circle cx="${e}" cy="${t}" r="28" fill="${re[n].fill}" stroke="${re[n].stroke}" stroke-width="3"/>`,I=(e,t,n,r,i,a,o)=>Array.from({length:a},(a,s)=>ne(e,t+s*o,n,r,i)).join(`
    `),L={FRUIT_BAG:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1120 440" class="w-full h-full">
    ${M(1120,440)}

    <!-- apples -->
    <rect x="20" y="16" width="530" height="280" rx="14" fill="#ffffff" stroke="${b}" stroke-width="3"/>
    ${I(f,48,40,56,57,3,60)}
    <text x="258" y="86" font-family="${A}" font-size="48" font-weight="bold" fill="${g}" text-anchor="middle">+</text>
    ${I(f,300,40,56,57,4,60)}
    <text x="285" y="160" font-family="${A}" font-size="28" font-weight="bold" fill="${g}" text-anchor="middle">3 apples + 4 apples = 7 apples</text>
    <text x="285" y="250" font-family="${A}" font-size="50" font-weight="bold" fill="${b}" text-anchor="middle">3a + 4a = 7a</text>

    <!-- bananas -->
    <rect x="570" y="16" width="530" height="280" rx="14" fill="#ffffff" stroke="${x}" stroke-width="3"/>
    ${I(p,650,46,100,46,2,110)}
    <text x="895" y="86" font-family="${A}" font-size="48" font-weight="bold" fill="${g}" text-anchor="middle">+</text>
    ${ne(p,930,46,100,46)}
    <text x="835" y="160" font-family="${A}" font-size="26" font-weight="bold" fill="${g}" text-anchor="middle">2 bananas + 1 banana = 3 bananas</text>
    <text x="835" y="250" font-family="${A}" font-size="50" font-weight="bold" fill="${x}" text-anchor="middle">2b + b = 3b</text>

    <!-- the whole bag -->
    <rect x="20" y="316" width="1080" height="108" rx="14" fill="${k}" stroke="${_}" stroke-width="2.5"/>
    <text x="700" y="388" font-family="${A}" font-size="50" font-weight="bold" fill="${g}" text-anchor="end">3a + 2b + 4a + b =</text>
    <text x="724" y="388" font-family="${A}" font-size="50" font-weight="bold" fill="${_}" text-anchor="start">7a + 3b</text>
  </svg>`,ATOMS_SORT:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1120 440" class="w-full h-full">
    ${M(1120,440)}
    <defs>
      <marker id="u23-sort-head" viewBox="0 0 10 10" refX="9" refY="5" markerUnits="userSpaceOnUse" markerWidth="18" markerHeight="18" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="${_}"/></marker>
    </defs>

    <!-- mixed up -->
    <rect x="20" y="16" width="430" height="290" rx="14" fill="#f7f9fa" stroke="${y}" stroke-width="2"/>
    ${F(80,80,`C`)}${F(190,66,`H`)}${F(300,92,`O`)}${F(395,70,`H`)}
    ${F(140,165,`C`)}${F(250,180,`O`)}${F(360,170,`H`)}
    ${F(85,250,`C`)}${F(275,258,`H`)}
    <text x="80" y="90" font-family="${A}" font-size="30" font-weight="bold" fill="${g}" text-anchor="middle">C</text>
    <text x="190" y="76" font-family="${A}" font-size="30" font-weight="bold" fill="${g}" text-anchor="middle">H</text>
    <text x="300" y="102" font-family="${A}" font-size="30" font-weight="bold" fill="${g}" text-anchor="middle">O</text>
    <text x="395" y="80" font-family="${A}" font-size="30" font-weight="bold" fill="${g}" text-anchor="middle">H</text>
    <text x="140" y="175" font-family="${A}" font-size="30" font-weight="bold" fill="${g}" text-anchor="middle">C</text>
    <text x="250" y="190" font-family="${A}" font-size="30" font-weight="bold" fill="${g}" text-anchor="middle">O</text>
    <text x="360" y="180" font-family="${A}" font-size="30" font-weight="bold" fill="${g}" text-anchor="middle">H</text>
    <text x="85" y="260" font-family="${A}" font-size="30" font-weight="bold" fill="${g}" text-anchor="middle">C</text>
    <text x="275" y="268" font-family="${A}" font-size="30" font-weight="bold" fill="${g}" text-anchor="middle">H</text>
    <text x="235" y="340" font-family="${A}" font-size="26" font-weight="bold" fill="${v}" text-anchor="middle">Mixed up</text>

    <line x1="468" y1="160" x2="552" y2="160" stroke="${_}" stroke-width="5" marker-end="url(#u23-sort-head)"/>
    <text x="508" y="138" font-family="${A}" font-size="22" font-weight="bold" fill="${_}" text-anchor="middle">sort</text>

    <!-- sorted -->
    <rect x="570" y="16" width="530" height="290" rx="14" fill="#f7f9fa" stroke="${y}" stroke-width="2"/>
    ${F(625,75,`C`)}${F(690,75,`C`)}${F(755,75,`C`)}
    ${F(625,160,`O`)}${F(690,160,`O`)}
    ${F(625,245,`H`)}${F(690,245,`H`)}${F(755,245,`H`)}${F(820,245,`H`)}
    <text x="625" y="85" font-family="${A}" font-size="30" font-weight="bold" fill="${g}" text-anchor="middle">C</text>
    <text x="690" y="85" font-family="${A}" font-size="30" font-weight="bold" fill="${g}" text-anchor="middle">C</text>
    <text x="755" y="85" font-family="${A}" font-size="30" font-weight="bold" fill="${g}" text-anchor="middle">C</text>
    <text x="625" y="170" font-family="${A}" font-size="30" font-weight="bold" fill="${g}" text-anchor="middle">O</text>
    <text x="690" y="170" font-family="${A}" font-size="30" font-weight="bold" fill="${g}" text-anchor="middle">O</text>
    <text x="625" y="255" font-family="${A}" font-size="30" font-weight="bold" fill="${g}" text-anchor="middle">H</text>
    <text x="690" y="255" font-family="${A}" font-size="30" font-weight="bold" fill="${g}" text-anchor="middle">H</text>
    <text x="755" y="255" font-family="${A}" font-size="30" font-weight="bold" fill="${g}" text-anchor="middle">H</text>
    <text x="820" y="255" font-family="${A}" font-size="30" font-weight="bold" fill="${g}" text-anchor="middle">H</text>
    <text x="880" y="84" font-family="${A}" font-size="28" font-weight="bold" fill="${g}" text-anchor="start">3 carbon</text>
    <text x="880" y="169" font-family="${A}" font-size="28" font-weight="bold" fill="${g}" text-anchor="start">2 oxygen</text>
    <text x="880" y="254" font-family="${A}" font-size="28" font-weight="bold" fill="${g}" text-anchor="start">4 hydrogen</text>
    <text x="835" y="340" font-family="${A}" font-size="26" font-weight="bold" fill="${v}" text-anchor="middle">Sorted by kind</text>

    <rect x="20" y="362" width="1080" height="66" rx="14" fill="${k}" stroke="${_}" stroke-width="2.5"/>
    <text x="560" y="409" font-family="${A}" font-size="36" font-weight="bold" fill="${_}" text-anchor="middle">9 atoms, but only 3 kinds</text>
  </svg>`,TERMS:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${M(840,560)}

    <text x="420" y="96" font-family="${A}" font-size="34" font-weight="bold" fill="${g}" text-anchor="middle">This expression has 4 terms</text>

    <rect x="105" y="170" width="120" height="110" rx="16" fill="${E}" stroke="${b}" stroke-width="3"/>
    <rect x="245" y="170" width="170" height="110" rx="16" fill="${ee}" stroke="${x}" stroke-width="3"/>
    <rect x="435" y="170" width="140" height="110" rx="16" fill="${te}" stroke="${S}" stroke-width="3"/>
    <rect x="595" y="170" width="140" height="110" rx="16" fill="${E}" stroke="${b}" stroke-width="3"/>
    <text x="165" y="244" font-family="${A}" font-size="54" font-weight="bold" fill="${b}" text-anchor="middle">5x</text>
    <text x="330" y="244" font-family="${A}" font-size="54" font-weight="bold" fill="${x}" text-anchor="middle">+ 3y</text>
    <text x="505" y="244" font-family="${A}" font-size="54" font-weight="bold" fill="${S}" text-anchor="middle">− 2</text>
    <text x="665" y="244" font-family="${A}" font-size="54" font-weight="bold" fill="${b}" text-anchor="middle">+ x</text>

    <path d="M 115 300 v 14 H 215 v -14 M 255 300 v 14 H 405 v -14 M 445 300 v 14 H 565 v -14 M 605 300 v 14 H 725 v -14" fill="none" stroke="${_}" stroke-width="3" stroke-linejoin="round"/>
    <text x="165" y="356" font-family="${A}" font-size="28" font-weight="bold" fill="${_}" text-anchor="middle">term</text>
    <text x="330" y="356" font-family="${A}" font-size="28" font-weight="bold" fill="${_}" text-anchor="middle">term</text>
    <text x="505" y="356" font-family="${A}" font-size="28" font-weight="bold" fill="${_}" text-anchor="middle">term</text>
    <text x="665" y="356" font-family="${A}" font-size="28" font-weight="bold" fill="${_}" text-anchor="middle">term</text>

    <text x="420" y="450" font-family="${A}" font-size="26" fill="${v}" text-anchor="middle">A number on its own is a term too.</text>
    <text x="420" y="496" font-family="${A}" font-size="26" fill="${v}" text-anchor="middle">The sign in front stays with its term.</text>
  </svg>`,WORDS:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1120 470" class="w-full h-full">
    ${M(1120,470)}

    <text x="450" y="46" font-family="${A}" font-size="22" font-weight="bold" fill="${v}" text-anchor="start">EVERYDAY ENGLISH</text>
    <text x="760" y="46" font-family="${A}" font-size="22" font-weight="bold" fill="${_}" text-anchor="start">IN MATHS</text>

    <!-- like -->
    <rect x="20" y="66" width="1080" height="124" rx="14" fill="#f7f9fa" stroke="${y}" stroke-width="1.5"/>
    <text x="150" y="142" font-family="${A}" font-size="44" font-weight="bold" fill="${g}" text-anchor="middle">like</text>
    <path d="M 370 156 C 320 124 334 88 370 110 C 406 88 420 124 370 156 Z" fill="#f08b82" stroke="${g}" stroke-width="3" stroke-linejoin="round"/>
    <text x="450" y="138" font-family="${A}" font-size="28" fill="${g}" text-anchor="start">I like mangoes.</text>
    <text x="760" y="116" font-family="${A}" font-size="28" font-weight="bold" fill="${_}" text-anchor="start">the same kind</text>
    <text x="760" y="164" font-family="${A}" font-size="32" font-weight="bold" fill="${g}" text-anchor="start">2a and 5a</text>

    <!-- collect -->
    <rect x="20" y="206" width="1080" height="124" rx="14" fill="#f7f9fa" stroke="${y}" stroke-width="1.5"/>
    <text x="150" y="282" font-family="${A}" font-size="44" font-weight="bold" fill="${g}" text-anchor="middle">collect</text>
    <rect x="326" y="282" width="96" height="18" rx="3" fill="#cfe5f5" stroke="${g}" stroke-width="2.5"/>
    <rect x="334" y="264" width="84" height="18" rx="3" fill="#fbe7a1" stroke="${g}" stroke-width="2.5"/>
    <rect x="322" y="246" width="92" height="18" rx="3" fill="#f08b82" stroke="${g}" stroke-width="2.5"/>
    <rect x="336" y="228" width="80" height="18" rx="3" fill="#bfe3b5" stroke="${g}" stroke-width="2.5"/>
    <text x="450" y="278" font-family="${A}" font-size="28" fill="${g}" text-anchor="start">Collect the books.</text>
    <text x="760" y="256" font-family="${A}" font-size="28" font-weight="bold" fill="${_}" text-anchor="start">put together</text>
    <text x="760" y="304" font-family="${A}" font-size="32" font-weight="bold" fill="${g}" text-anchor="start">2a + 5a = 7a</text>

    <!-- simplify -->
    <rect x="20" y="346" width="1080" height="112" rx="14" fill="#f7f9fa" stroke="${y}" stroke-width="1.5"/>
    <text x="150" y="416" font-family="${A}" font-size="44" font-weight="bold" fill="${g}" text-anchor="middle">simplify</text>
    <path d="M 306 404 q 10 -34 20 0 t 20 0 t 20 0" fill="none" stroke="${g}" stroke-width="4" stroke-linecap="round"/>
    <path d="M 376 404 h 14 m -6 -7 l 7 7 l -7 7" fill="none" stroke="${_}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
    <line x1="400" y1="404" x2="428" y2="404" stroke="${g}" stroke-width="4" stroke-linecap="round"/>
    <text x="450" y="412" font-family="${A}" font-size="28" fill="${g}" text-anchor="start">Make it simple.</text>
    <text x="760" y="390" font-family="${A}" font-size="28" font-weight="bold" fill="${_}" text-anchor="start">write it shorter</text>
    <text x="760" y="436" font-family="${A}" font-size="32" font-weight="bold" fill="${g}" text-anchor="start">a + a + a = 3a</text>
  </svg>`,LIKE_UNLIKE:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${M(840,560)}

    <!-- like -->
    <rect x="24" y="30" width="792" height="230" rx="16" fill="${D}" stroke="${C}" stroke-width="2.5"/>
    <text x="100" y="120" font-family="${A}" font-size="68" font-weight="bold" fill="${b}" text-anchor="middle">2a</text>
    <text x="205" y="112" font-family="${A}" font-size="30" fill="${v}" text-anchor="middle">and</text>
    <text x="310" y="120" font-family="${A}" font-size="68" font-weight="bold" fill="${b}" text-anchor="middle">3a</text>
    ${I(f,56,158,44,45,2,48)}
    ${I(f,242,158,44,45,3,48)}
    ${N(470,140)}
    <text x="524" y="136" font-family="${A}" font-size="36" font-weight="bold" fill="${C}" text-anchor="start">like terms</text>
    <text x="524" y="180" font-family="${A}" font-size="26" fill="${v}" text-anchor="start">same letter</text>

    <!-- not like -->
    <rect x="24" y="300" width="792" height="230" rx="16" fill="${O}" stroke="${w}" stroke-width="2.5"/>
    <text x="100" y="390" font-family="${A}" font-size="68" font-weight="bold" fill="${b}" text-anchor="middle">2a</text>
    <text x="205" y="382" font-family="${A}" font-size="30" fill="${v}" text-anchor="middle">and</text>
    <text x="310" y="390" font-family="${A}" font-size="68" font-weight="bold" fill="${x}" text-anchor="middle">3b</text>
    ${I(f,56,428,44,45,2,48)}
    ${I(p,234,438,52,24,3,54)}
    ${P(470,410)}
    <text x="524" y="406" font-family="${A}" font-size="32" font-weight="bold" fill="${w}" text-anchor="start">not like terms</text>
    <text x="524" y="450" font-family="${A}" font-size="26" fill="${v}" text-anchor="start">different letters</text>
  </svg>`,ONE_X:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${M(840,560)}
    <defs>
      <pattern id="u23-stripe-onex" patternUnits="userSpaceOnUse" width="14" height="14" patternTransform="rotate(45)">
        <rect x="0" y="0" width="14" height="14" fill="#ffffff"/><rect x="0" y="0" width="4" height="14" fill="${g}"/>
      </pattern>
    </defs>

    <!-- 4x + x -->
    <rect x="24" y="24" width="792" height="252" rx="16" fill="#ffffff" stroke="${b}" stroke-width="3"/>
    <rect x="130" y="60" width="100" height="48" fill="url(#u23-stripe-onex)" stroke="${g}" stroke-width="2.5"/>
    <rect x="230" y="60" width="100" height="48" fill="url(#u23-stripe-onex)" stroke="${g}" stroke-width="2.5"/>
    <rect x="330" y="60" width="100" height="48" fill="url(#u23-stripe-onex)" stroke="${g}" stroke-width="2.5"/>
    <rect x="430" y="60" width="100" height="48" fill="url(#u23-stripe-onex)" stroke="${g}" stroke-width="2.5"/>
    <text x="570" y="100" font-family="${A}" font-size="44" font-weight="bold" fill="${g}" text-anchor="middle">+</text>
    <rect x="610" y="60" width="100" height="48" fill="url(#u23-stripe-onex)" stroke="${g}" stroke-width="2.5"/>
    <text x="180" y="146" font-family="${A}" font-size="26" font-weight="bold" fill="${v}" text-anchor="middle">x</text>
    <text x="280" y="146" font-family="${A}" font-size="26" font-weight="bold" fill="${v}" text-anchor="middle">x</text>
    <text x="380" y="146" font-family="${A}" font-size="26" font-weight="bold" fill="${v}" text-anchor="middle">x</text>
    <text x="480" y="146" font-family="${A}" font-size="26" font-weight="bold" fill="${v}" text-anchor="middle">x</text>
    <text x="660" y="146" font-family="${A}" font-size="26" font-weight="bold" fill="${v}" text-anchor="middle">x</text>
    <text x="420" y="218" font-family="${A}" font-size="52" font-weight="bold" fill="${_}" text-anchor="middle">4x + x = 5x</text>
    <text x="420" y="256" font-family="${A}" font-size="24" fill="${v}" text-anchor="middle">One brick is x. That is 1x.</text>

    <!-- 8s − s -->
    <rect x="24" y="296" width="792" height="240" rx="16" fill="#ffffff" stroke="${x}" stroke-width="3"/>
    ${I(m,160,326,58,44,8,66)}
    <path d="M 616 322 L 686 374 M 686 322 L 616 374" fill="none" stroke="${w}" stroke-width="6" stroke-linecap="round"/>
    <text x="420" y="446" font-family="${A}" font-size="52" font-weight="bold" fill="${_}" text-anchor="middle">8s − s = 7s</text>
    <text x="420" y="494" font-family="${A}" font-size="24" fill="${v}" text-anchor="middle">One is eaten. 7 are left.</text>
  </svg>`,CANT_COLLECT:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${M(840,560)}

    <rect x="24" y="24" width="792" height="150" rx="16" fill="${D}" stroke="${C}" stroke-width="2.5"/>
    <text x="64" y="104" font-family="${A}" font-size="48" font-weight="bold" fill="${g}" text-anchor="start">5 cm + 3 cm = 8 cm</text>
    <text x="64" y="148" font-family="${A}" font-size="24" fill="${v}" text-anchor="start">the same unit</text>
    ${N(740,99)}

    <rect x="24" y="194" width="792" height="150" rx="16" fill="${O}" stroke="${w}" stroke-width="2.5"/>
    <text x="64" y="274" font-family="${A}" font-size="48" font-weight="bold" fill="${g}" text-anchor="start">5 cm + 3 kg = ?</text>
    <text x="64" y="318" font-family="${A}" font-size="24" fill="${v}" text-anchor="start">different units</text>
    ${P(740,269)}

    <rect x="24" y="364" width="792" height="172" rx="16" fill="${k}" stroke="${_}" stroke-width="2.5"/>
    <text x="64" y="470" font-family="${A}" font-size="60" font-weight="bold" fill="${g}" text-anchor="start">3a + 2b</text>
    <text x="440" y="440" font-family="${A}" font-size="30" font-weight="bold" fill="${_}" text-anchor="start">already in</text>
    <text x="440" y="480" font-family="${A}" font-size="30" font-weight="bold" fill="${_}" text-anchor="start">simplest form</text>
  </svg>`,TRICKY:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${M(840,560)}

    <rect x="24" y="24" width="792" height="160" rx="16" fill="${D}" stroke="${C}" stroke-width="2.5"/>
    <text x="56" y="96" font-family="${A}" font-size="50" font-weight="bold" fill="${g}" text-anchor="start">4ab and 3ba</text>
    <text x="56" y="148" font-family="${A}" font-size="28" fill="${v}" text-anchor="start">a × b = b × a</text>
    ${N(560,104)}
    <text x="612" y="116" font-family="${A}" font-size="36" font-weight="bold" fill="${C}" text-anchor="start">like</text>

    <rect x="24" y="200" width="792" height="160" rx="16" fill="${D}" stroke="${C}" stroke-width="2.5"/>
    <text x="56" y="272" font-family="${A}" font-size="50" font-weight="bold" fill="${g}" text-anchor="start">7 and 2</text>
    <text x="56" y="324" font-family="${A}" font-size="28" fill="${v}" text-anchor="start">both are numbers</text>
    ${N(560,280)}
    <text x="612" y="292" font-family="${A}" font-size="36" font-weight="bold" fill="${C}" text-anchor="start">like</text>

    <rect x="24" y="376" width="792" height="160" rx="16" fill="${O}" stroke="${w}" stroke-width="2.5"/>
    <text x="56" y="448" font-family="${A}" font-size="50" font-weight="bold" fill="${g}" text-anchor="start">x and x²</text>
    <text x="56" y="500" font-family="${A}" font-size="28" fill="${v}" text-anchor="start">x² means x × x</text>
    ${P(560,456)}
    <text x="612" y="468" font-family="${A}" font-size="36" font-weight="bold" fill="${w}" text-anchor="start">not like</text>
  </svg>`,BRICKS_REAL:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1120 440" class="w-full h-full">
    ${M(1120,440)}
    <defs>
      <clipPath id="u23-wall-clip"><rect x="20" y="16" width="520" height="346" rx="12"/></clipPath>
      <marker id="u23-wall-end" viewBox="0 0 10 10" refX="9" refY="5" markerUnits="userSpaceOnUse" markerWidth="14" markerHeight="14" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="${_}"/></marker>
      <marker id="u23-wall-start" viewBox="0 0 10 10" refX="1" refY="5" markerUnits="userSpaceOnUse" markerWidth="14" markerHeight="14" orient="auto"><path d="M10 0 L0 5 L10 10 z" fill="${_}"/></marker>
      <marker id="u23-wall-end-ink" viewBox="0 0 10 10" refX="9" refY="5" markerUnits="userSpaceOnUse" markerWidth="16" markerHeight="16" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="${g}"/></marker>
      <marker id="u23-wall-start-ink" viewBox="0 0 10 10" refX="1" refY="5" markerUnits="userSpaceOnUse" markerWidth="16" markerHeight="16" orient="auto"><path d="M10 0 L0 5 L10 10 z" fill="${g}"/></marker>
    </defs>

    <image href="${h}" x="20" y="16" width="520" height="346" preserveAspectRatio="xMidYMid slice" clip-path="url(#u23-wall-clip)"/>
    <rect x="20" y="16" width="520" height="346" rx="12" fill="none" stroke="${y}" stroke-width="2"/>
    <text x="280" y="408" font-family="${A}" font-size="28" font-weight="bold" fill="${g}" text-anchor="middle">A real brick wall</text>

    <rect x="600" y="80" width="96" height="56" fill="#d9825b" stroke="#7a3b22" stroke-width="3"/>
    <rect x="696" y="80" width="96" height="56" fill="#d9825b" stroke="#7a3b22" stroke-width="3"/>
    <rect x="792" y="80" width="96" height="56" fill="#d9825b" stroke="#7a3b22" stroke-width="3"/>
    <rect x="888" y="80" width="96" height="56" fill="#d9825b" stroke="#7a3b22" stroke-width="3"/>
    <rect x="984" y="80" width="96" height="56" fill="#d9825b" stroke="#7a3b22" stroke-width="3"/>

    <line x1="604" y1="168" x2="692" y2="168" stroke="${_}" stroke-width="3" marker-start="url(#u23-wall-start)" marker-end="url(#u23-wall-end)"/>
    <line x1="700" y1="168" x2="788" y2="168" stroke="${_}" stroke-width="3" marker-start="url(#u23-wall-start)" marker-end="url(#u23-wall-end)"/>
    <line x1="796" y1="168" x2="884" y2="168" stroke="${_}" stroke-width="3" marker-start="url(#u23-wall-start)" marker-end="url(#u23-wall-end)"/>
    <line x1="892" y1="168" x2="980" y2="168" stroke="${_}" stroke-width="3" marker-start="url(#u23-wall-start)" marker-end="url(#u23-wall-end)"/>
    <line x1="988" y1="168" x2="1076" y2="168" stroke="${_}" stroke-width="3" marker-start="url(#u23-wall-start)" marker-end="url(#u23-wall-end)"/>
    <text x="648" y="212" font-family="${A}" font-size="34" font-weight="bold" fill="${_}" text-anchor="middle">x</text>
    <text x="744" y="212" font-family="${A}" font-size="34" font-weight="bold" fill="${_}" text-anchor="middle">x</text>
    <text x="840" y="212" font-family="${A}" font-size="34" font-weight="bold" fill="${_}" text-anchor="middle">x</text>
    <text x="936" y="212" font-family="${A}" font-size="34" font-weight="bold" fill="${_}" text-anchor="middle">x</text>
    <text x="1032" y="212" font-family="${A}" font-size="34" font-weight="bold" fill="${_}" text-anchor="middle">x</text>

    <line x1="602" y1="250" x2="1078" y2="250" stroke="${g}" stroke-width="3" marker-start="url(#u23-wall-start-ink)" marker-end="url(#u23-wall-end-ink)"/>
    <text x="840" y="310" font-family="${A}" font-size="44" font-weight="bold" fill="${g}" text-anchor="middle">total length = 5x</text>
    <text x="840" y="366" font-family="${A}" font-size="28" fill="${v}" text-anchor="middle">x is a number:</text>
    <text x="840" y="402" font-family="${A}" font-size="28" fill="${v}" text-anchor="middle">the length of one brick</text>
  </svg>`,BRICK_ROWS:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${M(840,560)}
    <defs>
      <pattern id="u23-stripe-rows" patternUnits="userSpaceOnUse" width="14" height="14" patternTransform="rotate(45)">
        <rect x="0" y="0" width="14" height="14" fill="#ffffff"/><rect x="0" y="0" width="4" height="14" fill="${g}"/>
      </pattern>
      <pattern id="u23-check-rows" patternUnits="userSpaceOnUse" width="16" height="16">
        <rect x="0" y="0" width="16" height="16" fill="#ffffff"/><rect x="0" y="0" width="8" height="8" fill="${S}"/><rect x="8" y="8" width="8" height="8" fill="${S}"/>
      </pattern>
      <marker id="u23-rows-end" viewBox="0 0 10 10" refX="9" refY="5" markerUnits="userSpaceOnUse" markerWidth="14" markerHeight="14" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="${g}"/></marker>
      <marker id="u23-rows-start" viewBox="0 0 10 10" refX="1" refY="5" markerUnits="userSpaceOnUse" markerWidth="14" markerHeight="14" orient="auto"><path d="M10 0 L0 5 L10 10 z" fill="${g}"/></marker>
    </defs>

    <!-- key -->
    <rect x="80" y="24" width="110" height="40" fill="url(#u23-stripe-rows)" stroke="${g}" stroke-width="2.5"/>
    <text x="206" y="54" font-family="${A}" font-size="30" font-weight="bold" fill="${b}" text-anchor="start">x cm</text>
    <rect x="400" y="24" width="170" height="40" fill="url(#u23-check-rows)" stroke="${g}" stroke-width="2.5"/>
    <text x="586" y="54" font-family="${A}" font-size="30" font-weight="bold" fill="${x}" text-anchor="start">y cm</text>
    <line x1="24" y1="92" x2="816" y2="92" stroke="${y}" stroke-width="2"/>

    <!-- a: x x y -->
    <text x="40" y="152" font-family="${A}" font-size="32" font-weight="bold" fill="${_}" text-anchor="middle">a</text>
    <rect x="80" y="120" width="110" height="44" fill="url(#u23-stripe-rows)" stroke="${g}" stroke-width="2.5"/>
    <rect x="190" y="120" width="110" height="44" fill="url(#u23-stripe-rows)" stroke="${g}" stroke-width="2.5"/>
    <rect x="300" y="120" width="170" height="44" fill="url(#u23-check-rows)" stroke="${g}" stroke-width="2.5"/>
    <line x1="82" y1="196" x2="468" y2="196" stroke="${g}" stroke-width="2.5" marker-start="url(#u23-rows-start)" marker-end="url(#u23-rows-end)"/>
    <rect x="255" y="178" width="40" height="36" fill="#ffffff"/>
    <text x="275" y="207" font-family="${A}" font-size="30" font-weight="bold" fill="${g}" text-anchor="middle">?</text>

    <!-- b: y x y -->
    <text x="40" y="282" font-family="${A}" font-size="32" font-weight="bold" fill="${_}" text-anchor="middle">b</text>
    <rect x="80" y="250" width="170" height="44" fill="url(#u23-check-rows)" stroke="${g}" stroke-width="2.5"/>
    <rect x="250" y="250" width="110" height="44" fill="url(#u23-stripe-rows)" stroke="${g}" stroke-width="2.5"/>
    <rect x="360" y="250" width="170" height="44" fill="url(#u23-check-rows)" stroke="${g}" stroke-width="2.5"/>
    <line x1="82" y1="326" x2="528" y2="326" stroke="${g}" stroke-width="2.5" marker-start="url(#u23-rows-start)" marker-end="url(#u23-rows-end)"/>
    <rect x="285" y="308" width="40" height="36" fill="#ffffff"/>
    <text x="305" y="337" font-family="${A}" font-size="30" font-weight="bold" fill="${g}" text-anchor="middle">?</text>

    <!-- c: x y x y x -->
    <text x="40" y="412" font-family="${A}" font-size="32" font-weight="bold" fill="${_}" text-anchor="middle">c</text>
    <rect x="80" y="380" width="110" height="44" fill="url(#u23-stripe-rows)" stroke="${g}" stroke-width="2.5"/>
    <rect x="190" y="380" width="170" height="44" fill="url(#u23-check-rows)" stroke="${g}" stroke-width="2.5"/>
    <rect x="360" y="380" width="110" height="44" fill="url(#u23-stripe-rows)" stroke="${g}" stroke-width="2.5"/>
    <rect x="470" y="380" width="170" height="44" fill="url(#u23-check-rows)" stroke="${g}" stroke-width="2.5"/>
    <rect x="640" y="380" width="110" height="44" fill="url(#u23-stripe-rows)" stroke="${g}" stroke-width="2.5"/>
    <line x1="82" y1="456" x2="748" y2="456" stroke="${g}" stroke-width="2.5" marker-start="url(#u23-rows-start)" marker-end="url(#u23-rows-end)"/>
    <rect x="395" y="438" width="40" height="36" fill="#ffffff"/>
    <text x="415" y="467" font-family="${A}" font-size="30" font-weight="bold" fill="${g}" text-anchor="middle">?</text>
  </svg>`,RECTANGLE:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${M(840,560)}

    <rect x="200" y="150" width="440" height="230" fill="${E}" stroke="${g}" stroke-width="4"/>
    <text x="420" y="126" font-family="${A}" font-size="42" font-weight="bold" fill="${_}" text-anchor="middle">2x + 1</text>
    <text x="420" y="438" font-family="${A}" font-size="42" font-weight="bold" fill="${_}" text-anchor="middle">2x + 1</text>
    <text x="160" y="280" font-family="${A}" font-size="42" font-weight="bold" fill="${_}" text-anchor="middle">x</text>
    <text x="680" y="280" font-family="${A}" font-size="42" font-weight="bold" fill="${_}" text-anchor="middle">x</text>
    <text x="420" y="512" font-family="${A}" font-size="26" fill="${v}" text-anchor="middle">All lengths are in cm.</text>
  </svg>`,MISTAKES:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${M(840,560)}

    <rect x="40" y="20" width="760" height="520" rx="6" fill="#fffdf5" stroke="#d8cfa8" stroke-width="2"/>
    <line x1="60" y1="140" x2="780" y2="140" stroke="#bcd3ea" stroke-width="2"/>
    <line x1="60" y1="220" x2="780" y2="220" stroke="#bcd3ea" stroke-width="2"/>
    <line x1="60" y1="300" x2="780" y2="300" stroke="#bcd3ea" stroke-width="2"/>
    <line x1="60" y1="380" x2="780" y2="380" stroke="#bcd3ea" stroke-width="2"/>
    <line x1="60" y1="460" x2="780" y2="460" stroke="#bcd3ea" stroke-width="2"/>
    <line x1="120" y1="30" x2="120" y2="530" stroke="#e8a0a0" stroke-width="2"/>

    <text x="140" y="86" font-family="${j}" font-size="32" font-weight="bold" fill="${g}" text-anchor="start">Mr Bowen’s homework</text>
    <circle cx="704" cy="78" r="44" fill="none" stroke="${w}" stroke-width="4"/>
    <text x="704" y="91" font-family="${j}" font-size="34" font-weight="bold" fill="${w}" text-anchor="middle">4/4</text>
    <text x="140" y="128" font-family="${j}" font-size="26" fill="${v}" text-anchor="start">Simplify.</text>

    <text x="140" y="208" font-family="${j}" font-size="38" font-weight="bold" fill="${g}" text-anchor="start">a)  3x + 5 = 8x</text>
    <text x="140" y="288" font-family="${j}" font-size="38" font-weight="bold" fill="${g}" text-anchor="start">b)  6y − y = 6</text>
    <text x="140" y="368" font-family="${j}" font-size="38" font-weight="bold" fill="${g}" text-anchor="start">c)  4p + 2q + p = 6pq</text>
    <text x="140" y="448" font-family="${j}" font-size="32" font-weight="bold" fill="${g}" text-anchor="start">d)  2ab + 3ba (no like terms)</text>

    <path d="M 728 190 l 12 14 l 24 -30 M 728 270 l 12 14 l 24 -30 M 728 350 l 12 14 l 24 -30 M 728 430 l 12 14 l 24 -30" fill="none" stroke="${w}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`,ANS_8:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 320" class="w-full h-full">
    ${M(720,320)}
    <g transform="translate(192 76) scale(-7 7)" fill="none" stroke="${T}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 11V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2"/><path d="M14 10V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v2"/><path d="M10 10.5V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2v8"/><path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"/></g>
    <text x="440" y="228" font-family="${A}" font-size="190" font-weight="bold" fill="${T}" text-anchor="middle">8</text>
  </svg>`,ANS_7S:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 320" class="w-full h-full">
    ${M(720,320)}
    <g transform="translate(528 76) scale(7)" fill="none" stroke="${_}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 11V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2"/><path d="M14 10V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v2"/><path d="M10 10.5V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2v8"/><path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"/></g>
    <text x="280" y="228" font-family="${A}" font-size="190" font-weight="bold" fill="${_}" text-anchor="middle">7s</text>
  </svg>`,ANS_4X6Y:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 320" class="w-full h-full">
    ${M(720,320)}
    <g transform="translate(192 76) scale(-7 7)" fill="none" stroke="${T}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 11V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2"/><path d="M14 10V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v2"/><path d="M10 10.5V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2v8"/><path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"/></g>
    <text x="440" y="197" font-family="${A}" font-size="104" font-weight="bold" fill="${T}" text-anchor="middle">4x + 6y</text>
  </svg>`,ANS_10X6Y:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 320" class="w-full h-full">
    ${M(720,320)}
    <g transform="translate(528 76) scale(7)" fill="none" stroke="${_}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 11V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2"/><path d="M14 10V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v2"/><path d="M10 10.5V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2v8"/><path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"/></g>
    <text x="280" y="197" font-family="${A}" font-size="104" font-weight="bold" fill="${_}" text-anchor="middle">10x + 6y</text>
  </svg>`},R=e(s(),1),z=l(),B=`#2b2b2b`,V=`#c25e12`,ie=`#5b6770`,H=`Inter, 'Segoe UI', system-ui, sans-serif`,U=`−`,ae=[{stroke:`#0087a8`,fill:`#e2f2f6`},{stroke:`#5c2483`,fill:`#f2ecf7`},{stroke:`#4a8b23`,fill:`#eef6e6`}],oe={stroke:`#5b6770`,fill:`#eef1f4`},se={stroke:`#8a979e`,fill:`#ffffff`};function W({onClick:e,disabled:t,tone:n=`teal`,icon:r,children:i}){let a={teal:`bg-[#0087a8] border-[#00697f]`,orange:`bg-[#c25e12] border-[#a04a0e]`,slate:`bg-slate-500 border-slate-700`};return(0,z.jsxs)(`button`,{onClick:e,disabled:t,className:`inline-flex items-center gap-2 rounded-xl font-black uppercase tracking-wide text-white border-b-4 active:border-b-0 active:translate-y-1 transition-all px-4 py-2 text-sm lg:px-6 lg:py-2.5 lg:text-base disabled:opacity-35 disabled:pointer-events-none ${a[a[n]?n:`teal`]}`,children:[r&&(0,z.jsx)(r,{className:`w-4 h-4 lg:w-5 lg:h-5`,strokeWidth:3}),i]})}var G=(e,t=``)=>({c:e,v:t}),ce={add:[[G(2,`b`),G(3,`b`)],[G(4,`x`),G(1,`x`),G(2,`x`)],[G(3,`a`),G(2,`b`),G(4,`a`),G(1,`b`)],[G(5,`m`),G(2,`n`),G(1,`m`),G(4,`n`)]],signs:[[G(7,`x`),G(5,`y`),G(-3,`x`),G(1,`y`)],[G(8,`a`),G(-3,`b`),G(2,`a`),G(-1,`b`)],[G(6),G(5,`t`),G(-1),G(-2,`t`)],[G(9,`p`),G(-4,`q`),G(-5,`p`),G(7,`q`),G(2)]]},le=(e,t)=>t&&Math.abs(e)===1?t:`${Math.abs(e)}${t}`,K=(e,t,n)=>n?`${e<0?U:``}${le(e,t)}`:`${e<0?U:`+`} ${le(e,t)}`;function ue(e){let t=[];return e.forEach(e=>{e.v&&!t.includes(e.v)&&t.push(e.v)}),e.some(e=>!e.v)&&t.push(``),t}var de=(e,t)=>t===``?oe:ae[e.indexOf(t)%ae.length],fe=96,pe=118,me=18,he=e=>[...e].reduce((e,t)=>e+(t===` `?19:41),0);function ge(e,t){let n=t.map((t,n)=>he(K(e[t].c,e[t].v,n===0))+52),r=560-(n.reduce((e,t)=>e+t,0)+me*(t.length-1))/2,i={};return t.forEach((e,t)=>{i[e]={x:r,w:n[t],first:t===0},r+=n[t]+me}),i}function _e({lang:e=`en`,set:t}){let n=ce[t],[a,s]=(0,R.useState)(0),[c,l]=(0,R.useState)(0),u=n[a],f=ue(u),p=u.map((e,t)=>t),m=[...p].sort((e,t)=>f.indexOf(u[e].v)-f.indexOf(u[t].v)||e-t),h=ge(u,c>=2?m:p),g=f.map((e,t)=>{let n=m.filter(t=>u[t].v===e),r=n.reduce((e,t)=>e+u[t].c,0);return{v:e,c:r,left:Math.min(...n.map(e=>h[e].x)),right:Math.max(...n.map(e=>h[e].x+h[e].w)),text:K(r,e,t===0)}}),_=g.map(e=>e.text).join(` `),v=[d(e,`1 Find`,`1 Tìm`,`1 Trouve`),d(e,`2 Move`,`2 Chuyển`,`2 Bouge`),d(e,`3 Collect`,`3 Gộp`,`3 Réduis`)];return(0,z.jsxs)(`div`,{className:`w-full h-full flex flex-col gap-3 select-none`,children:[(0,z.jsx)(`div`,{className:`flex-1 min-h-0 w-full`,children:(0,z.jsxs)(`svg`,{viewBox:`0 0 1120 440`,className:`w-full h-full`,preserveAspectRatio:`xMidYMid meet`,children:[(0,z.jsx)(`rect`,{x:`0`,y:`0`,width:`1120`,height:`440`,rx:`14`,fill:`#ffffff`}),v.map((e,t)=>{let n=t+1,r=c===n,i=c>n;return(0,z.jsxs)(`g`,{children:[(0,z.jsx)(`rect`,{x:320+t*170,y:`18`,width:`150`,height:`50`,rx:`25`,fill:r?V:`#ffffff`,stroke:r||i?V:`#c3cbd2`,strokeWidth:`3`}),(0,z.jsx)(`text`,{x:395+t*170,y:`52`,fontFamily:H,fontSize:`24`,fontWeight:`bold`,fill:r?`#ffffff`:i?V:`#9aa5ae`,textAnchor:`middle`,children:e})]},e)}),(0,z.jsxs)(`text`,{x:`1096`,y:`52`,fontFamily:H,fontSize:`22`,fontWeight:`bold`,fill:`#9aa5ae`,textAnchor:`end`,children:[a+1,` / `,n.length]}),u.map((e,t)=>{let n=h[t],r=c>=1?de(f,e.v):se;return(0,z.jsxs)(`g`,{style:{transform:`translate(${n.x}px, ${fe}px)`,transition:`transform 700ms cubic-bezier(.4,0,.2,1)`},children:[(0,z.jsx)(`rect`,{x:`0`,y:`0`,width:n.w,height:pe,rx:`16`,fill:r.fill,stroke:r.stroke,strokeWidth:c>=1?4:2.5,style:{transition:`width 700ms`}}),(0,z.jsx)(`text`,{x:n.w/2,y:`84`,fontFamily:H,fontSize:`68`,fontWeight:`bold`,fill:c>=1?r.stroke:B,textAnchor:`middle`,children:K(e.c,e.v,n.first)})]},`${a}-${t}`)}),c>=3&&g.map(e=>{let t=de(f,e.v),n=(e.left+e.right)/2;return(0,z.jsxs)(`g`,{children:[(0,z.jsx)(`path`,{d:`M ${e.left+8} 230 v 14 H ${e.right-8} v -14`,fill:`none`,stroke:t.stroke,strokeWidth:`4`,strokeLinejoin:`round`}),(0,z.jsx)(`text`,{x:n,y:`298`,fontFamily:H,fontSize:`52`,fontWeight:`bold`,fill:t.stroke,textAnchor:`middle`,children:e.text})]},`g${e.v}`)}),c>=3&&(0,z.jsxs)(`g`,{children:[(0,z.jsx)(`rect`,{x:`150`,y:`320`,width:`820`,height:`106`,rx:`16`,fill:`#fdf1e3`,stroke:V,strokeWidth:`3`}),(0,z.jsxs)(`text`,{x:`560`,y:`390`,fontFamily:H,fontSize:`46`,fontWeight:`bold`,fill:B,textAnchor:`middle`,children:[d(e,`Simplest form: `,`Dạng gọn nhất: `,`Forme réduite\xA0: `),(0,z.jsx)(`tspan`,{fill:V,children:_})]})]})]})}),(0,z.jsxs)(`div`,{className:`shrink-0 flex items-center justify-center gap-3 flex-wrap`,children:[(0,z.jsx)(W,{tone:`slate`,icon:o,disabled:c===0,onClick:()=>l(e=>Math.max(0,e-1)),children:d(e,`Back`,`Lùi`,`Retour`)}),(0,z.jsx)(W,{tone:`orange`,icon:i,disabled:c===3,onClick:()=>l(e=>Math.min(3,e+1)),children:d(e,`Next step`,`Bước tiếp`,`Suivant`)}),(0,z.jsx)(W,{tone:`teal`,icon:r,onClick:()=>{s(e=>(e+1)%n.length),l(0)},children:d(e,`Next expression`,`Biểu thức khác`,`Autre expression`)})]})]})}function ve({lang:e}){return(0,z.jsx)(_e,{lang:e,set:`add`})}function ye({lang:e}){return(0,z.jsx)(_e,{lang:e,set:`signs`})}var q=[{back:!1,rows:[[`2x`,`5x`,`x`],[`7x`,`6x`],[`13x`]],given:[`0-0`,`0-1`,`0-2`],steps:[{id:`1-0`,from:[`0-0`,`0-1`],en:`2x + 5x = 7x`},{id:`1-1`,from:[`0-1`,`0-2`],en:`5x + x = 6x`},{id:`2-0`,from:[`1-0`,`1-1`],en:`7x + 6x = 13x`}]},{back:!1,rows:[[`a + b`,`2a`,`3b`],[`3a + b`,`2a + 3b`],[`5a + 4b`]],given:[`0-0`,`0-1`,`0-2`],steps:[{id:`1-0`,from:[`0-0`,`0-1`],en:`a + b + 2a = 3a + b`},{id:`1-1`,from:[`0-1`,`0-2`],en:`2a + 3b: no like terms`,vn:`2a + 3b: không có hạng tử đồng dạng`,fr:`2a + 3b\xA0: pas de termes semblables`},{id:`2-0`,from:[`1-0`,`1-1`],en:`3a + b + 2a + 3b = 5a + 4b`}]},{back:!0,rows:[[`2y`,`3y`,`4y`],[`5y`,`7y`],[`12y`]],given:[`0-0`,`1-0`,`2-0`],steps:[{id:`0-1`,from:[`1-0`,`0-0`],en:`5y − 2y = 3y`},{id:`1-1`,from:[`2-0`,`1-0`],en:`12y − 5y = 7y`},{id:`0-2`,from:[`1-1`,`0-1`],en:`7y − 3y = 4y`}]}],J=250,be=108,xe=e=>{let[t,n]=e.split(`-`).map(Number),r=282-t*be;return{x:420-(3-t)*J/2+n*J,y:r}};function Se({lang:e=`en`}){let[t,n]=(0,R.useState)(0),[a,s]=(0,R.useState)(0),c=q[t],l=c.steps.slice(0,a).map(e=>e.id),u=a>0?c.steps[a-1]:null;return(0,z.jsxs)(`div`,{className:`w-full h-full flex flex-col gap-3 select-none`,children:[(0,z.jsx)(`div`,{className:`flex-1 min-h-0 w-full`,children:(0,z.jsxs)(`svg`,{viewBox:`0 0 840 470`,className:`w-full h-full`,preserveAspectRatio:`xMidYMid meet`,children:[(0,z.jsx)(`rect`,{x:`0`,y:`0`,width:`840`,height:`470`,rx:`14`,fill:`#ffffff`}),(0,z.jsx)(`text`,{x:`420`,y:`42`,fontFamily:H,fontSize:`32`,fontWeight:`bold`,fill:ie,textAnchor:`middle`,children:c.back?d(e,`Work backwards`,`Làm ngược lại`,`Calcule à l’envers`):d(e,`Add the two blocks below`,`Cộng hai ô bên dưới`,`Ajoute les deux cases du dessous`)}),(0,z.jsxs)(`text`,{x:`20`,y:`42`,fontFamily:H,fontSize:`22`,fontWeight:`bold`,fill:`#9aa5ae`,textAnchor:`start`,children:[t+1,` / `,q.length]}),c.rows.flatMap((e,t)=>e.map((e,n)=>{let r=`${t}-${n}`,{x:i,y:a}=xe(r),o=c.given.includes(r),s=u?.id===r,d=o||l.includes(r);return(0,z.jsxs)(`g`,{children:[(0,z.jsx)(`rect`,{x:i,y:a,width:J,height:be,fill:s?`#fdf1e3`:o?`#e2f2f6`:d?`#ffffff`:`#f1f5f9`,stroke:s?V:o?`#0087a8`:d?B:`#c3cbd2`,strokeWidth:s?5:2.5}),(0,z.jsx)(`text`,{x:i+J/2,y:a+72,fontFamily:H,fontSize:`50`,fontWeight:`bold`,fill:d?s?V:B:`#9aa5ae`,textAnchor:`middle`,children:d?e:`?`})]},r)})),u?.from.map(e=>{let{x:t,y:n}=xe(e);return(0,z.jsx)(`rect`,{x:t+6,y:n+6,width:238,height:96,fill:`none`,stroke:V,strokeWidth:`4`,strokeDasharray:`12 8`,pointerEvents:`none`},`f${e}`)}),u?(0,z.jsx)(`text`,{x:`420`,y:`448`,fontFamily:H,fontSize:`38`,fontWeight:`bold`,fill:V,textAnchor:`middle`,children:d(e,u.en,u.vn,u.fr)}):(0,z.jsx)(`text`,{x:`420`,y:`448`,fontFamily:H,fontSize:`32`,fill:`#9aa5ae`,textAnchor:`middle`,children:d(e,`Which block can you find first?`,`Em tìm được ô nào trước?`,`Quelle case trouves-tu en premier\xA0?`)})]})}),(0,z.jsxs)(`div`,{className:`shrink-0 flex items-center justify-center gap-3 flex-wrap`,children:[(0,z.jsx)(W,{tone:`slate`,icon:o,disabled:a===0,onClick:()=>s(e=>Math.max(0,e-1)),children:d(e,`Back`,`Lùi`,`Retour`)}),(0,z.jsx)(W,{tone:`orange`,icon:i,disabled:a===c.steps.length,onClick:()=>s(e=>Math.min(c.steps.length,e+1)),children:d(e,`Next block`,`Ô tiếp`,`Suivant`)}),(0,z.jsx)(W,{tone:`teal`,icon:r,onClick:()=>{n(e=>(e+1)%q.length),s(0)},children:d(e,`Next pyramid`,`Kim tự tháp khác`,`Autre pyramide`)})]})]})}var Y=[{a:`4a`,b:`9a`,like:!0,en:`the same letter`,vn:`cùng một chữ cái`,fr:`la même lettre`},{a:`4a`,b:`4b`,like:!1,en:`different letters`,vn:`khác chữ cái`,fr:`des lettres différentes`},{a:`x`,b:`7x`,like:!0,en:`x means 1x`,vn:`x nghĩa là 1x`,fr:`x veut dire 1x`},{a:`3y`,b:`3`,like:!1,en:`3 has no letter`,vn:`3 không có chữ cái`,fr:`3 n’a pas de lettre`},{a:`2ab`,b:`5ba`,like:!0,en:`ab = ba, because a × b = b × a`,vn:`ab = ba, vì a × b = b × a`,fr:`ab = ba, car a × b = b × a`},{a:`8`,b:`2`,like:!0,en:`both are numbers`,vn:`cả hai đều là số`,fr:`ce sont deux nombres`},{a:`6p`,b:`6pq`,like:!1,en:`p is not pq`,vn:`p khác pq`,fr:`p n’est pas pq`},{a:`5c`,b:`${U}2c`,like:!0,en:`both are c terms; the sign does not change that`,vn:`cả hai đều là hạng tử c; dấu không làm thay đổi điều đó`,fr:`deux termes en c\xA0; le signe n’y change rien`},{a:`m²`,b:`4m`,like:!1,en:`m² means m × m`,vn:`m² nghĩa là m × m`,fr:`m² veut dire m × m`},{a:`7xy`,b:`7x`,like:!1,en:`xy is not x`,vn:`xy khác x`,fr:`xy n’est pas x`},{a:`9n`,b:`n`,like:!0,en:`n means 1n`,vn:`n nghĩa là 1n`,fr:`n veut dire 1n`},{a:`12t`,b:`12`,like:!1,en:`12 has no letter`,vn:`12 không có chữ cái`,fr:`12 n’a pas de lettre`},{a:`2rd`,b:`3dr`,like:!0,en:`rd = dr`,vn:`rd = dr`,fr:`rd = dr`},{a:`3h²`,b:`h²`,like:!0,en:`both are h² terms`,vn:`cả hai đều là hạng tử h²`,fr:`deux termes en h²`},{a:`10w`,b:`10v`,like:!1,en:`different letters`,vn:`khác chữ cái`,fr:`des lettres différentes`},{a:`20`,b:`${U}6`,like:!0,en:`both are numbers`,vn:`cả hai đều là số`,fr:`ce sont deux nombres`}];function Ce({text:e,verdict:t,big:n}){return(0,z.jsx)(`div`,{className:`rounded-3xl border-[6px] bg-white flex items-center justify-center font-black text-[#2b2b2b] leading-none shadow-sm px-8 ${t===!0?`border-[#4a8b23]`:t===!1?`border-[#c8102e]`:`border-slate-300`} ${n?`min-w-[clamp(12rem,28vh,20rem)] h-[clamp(10rem,26vh,18rem)] text-[clamp(5rem,14vh,10rem)]`:`min-w-[10rem] h-[9rem] text-7xl`}`,children:e})}function we({lang:e=`en`,isDisplayMode:r=!1}){let[o,s]=(0,R.useState)(()=>Y.map((e,t)=>t)),[l,f]=(0,R.useState)(0),[p,m]=(0,R.useState)(!1),h=l>=o.length,g=h?null:Y[o[l]],_=r,v=(0,R.useCallback)(()=>{h||(p?(m(!1),f(e=>e+1)):m(!0))},[h,p]);return(0,R.useEffect)(()=>{let e=e=>{(e.key===`ArrowRight`||e.key===`PageDown`)&&(e.preventDefault(),v())};return window.addEventListener(`keydown`,e),()=>window.removeEventListener(`keydown`,e)},[v]),(0,z.jsxs)(`div`,{className:`w-full h-full flex flex-col bg-slate-50 dark:bg-slate-950 overflow-hidden select-none`,children:[(0,z.jsxs)(`div`,{className:`flex items-center justify-between gap-3 px-4 sm:px-6 py-3 border-b-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shrink-0`,children:[(0,z.jsxs)(`div`,{className:`flex items-center gap-3 min-w-0`,children:[(0,z.jsx)(`div`,{className:`p-2 rounded-xl text-white bg-[#c25e12] shrink-0`,children:(0,z.jsx)(u,{className:_?`w-7 h-7`:`w-5 h-5`,strokeWidth:2.5})}),(0,z.jsxs)(`div`,{className:`min-w-0`,children:[(0,z.jsx)(`div`,{className:`font-black tracking-tight text-slate-800 dark:text-slate-100 leading-none ${_?`text-2xl`:`text-lg sm:text-xl`}`,children:d(e,`Like or Not?`,`Đồng dạng hay không?`,`Semblables ou non\xA0?`)}),(0,z.jsx)(`div`,{className:`font-bold text-slate-400 dark:text-slate-500 truncate ${_?`text-base`:`text-xs`}`,children:d(e,`Thumbs up: like terms. Thumbs down: not. Then press Show.`,`Ngón cái lên: đồng dạng. Ngón cái xuống: không. Rồi bấm Hiện.`,`Pouce levé\xA0: semblables. Baissé\xA0: non. Puis appuie sur Voir.`)})]})]}),!h&&(0,z.jsxs)(`div`,{className:`font-black text-slate-400 dark:text-slate-500 tabular-nums shrink-0 ${_?`text-2xl`:`text-base`}`,children:[l+1,` / `,o.length]})]}),(0,z.jsx)(`div`,{className:`flex-1 min-h-0 flex flex-col items-center justify-center gap-[clamp(1rem,4vh,2.5rem)] p-4`,children:h?(0,z.jsxs)(z.Fragment,{children:[(0,z.jsx)(`div`,{className:`p-4 rounded-2xl bg-emerald-500 text-white`,children:(0,z.jsx)(n,{className:`w-12 h-12`,strokeWidth:2})}),(0,z.jsx)(`div`,{className:`font-black text-slate-800 dark:text-slate-100 ${_?`text-5xl`:`text-3xl`}`,children:d(e,`All 16 done!`,`Xong cả 16!`,`Les 16 sont faits\xA0!`)})]}):(0,z.jsxs)(z.Fragment,{children:[(0,z.jsx)(`div`,{className:`font-black uppercase tracking-[0.2em] text-[#c25e12] ${_?`text-[clamp(1rem,2.2vh,1.6rem)]`:`text-sm`}`,children:d(e,`Are these like terms?`,`Đây có phải hạng tử đồng dạng?`,`Des termes semblables\xA0?`)}),(0,z.jsxs)(`div`,{className:`flex items-center justify-center gap-[clamp(1rem,3vw,3rem)] flex-wrap`,children:[(0,z.jsx)(Ce,{text:g.a,verdict:p?g.like:null,big:_}),(0,z.jsx)(`div`,{className:`font-black text-slate-400 ${_?`text-[clamp(2rem,5vh,3.5rem)]`:`text-3xl`}`,children:d(e,`and`,`và`,`et`)}),(0,z.jsx)(Ce,{text:g.b,verdict:p?g.like:null,big:_})]}),(0,z.jsx)(`div`,{className:`min-h-[clamp(6rem,17vh,11rem)] flex flex-col items-center justify-center gap-3`,children:p?(0,z.jsxs)(z.Fragment,{children:[(0,z.jsx)(`div`,{className:`rounded-full text-white font-black px-8 py-2 ${g.like?`bg-[#4a8b23]`:`bg-[#c8102e]`} ${_?`text-[clamp(1.8rem,4.5vh,3rem)]`:`text-3xl`}`,children:g.like?d(e,`✓ Like terms`,`✓ Đồng dạng`,`✓ Semblables`):d(e,`✗ Not like terms`,`✗ Không đồng dạng`,`✗ Pas semblables`)}),(0,z.jsx)(`div`,{className:`font-bold text-slate-600 dark:text-slate-300 ${_?`text-[clamp(1.2rem,2.8vh,2rem)]`:`text-lg`}`,children:d(e,g.en,g.vn,g.fr)})]}):(0,z.jsx)(`div`,{className:`font-black text-slate-300 dark:text-slate-700 ${_?`text-8xl`:`text-6xl`}`,children:`?`})})]})}),(0,z.jsxs)(`div`,{className:`shrink-0 flex items-center justify-center gap-3 flex-wrap px-4 pb-4 pt-2`,children:[(0,z.jsx)(W,{tone:`teal`,icon:t,onClick:()=>{let e=Y.map((e,t)=>t);for(let t=e.length-1;t>0;t--){let n=Math.floor(Math.random()*(t+1));[e[t],e[n]]=[e[n],e[t]]}s(e),f(0),m(!1)},children:d(e,`Shuffle`,`Xáo trộn`,`Mélanger`)}),!h&&(0,z.jsx)(W,{tone:`orange`,icon:p?i:a,onClick:v,children:p?d(e,`Next`,`Tiếp`,`Suivant`):d(e,`Show`,`Hiện`,`Voir`)}),h&&(0,z.jsx)(W,{tone:`slate`,icon:c,onClick:()=>{f(0),m(!1)},children:d(e,`Start again`,`Làm lại`,`Recommencer`)})]})]})}var Te=`/assets/stall-Csu4l3QE.jpg`,X=`#0087a8`,Z=`#5c2483`,Q=`#c25e12`,$=`#4a8b23`,Ee=`#1a5fa8`,De=`#c8102e`,Oe={meta:{course:`y7-math`,unit:`2.3`,id:`U02_3`,title:`Collecting Like Terms`,objective:`Say what a term and like terms are; simplify an expression by collecting like terms; know that x means 1x, so 8s − s = 7s; leave unlike terms such as 3a + 2b alone; recognise numbers and ab and ba as like terms, but not x and x²; and move each sign with its term, so 7x + 5y − 3x + y = 4x + 6y.`,order:9,french:!0,dashboard:{track:`Y7_MATH`,unit:`U02_3`}},slides:[{layout:`hero`,color:Z,icon:`Sigma`,brand:`Year 7 Mathematics`,brandVn:`Toán Lớp 7`,brandFr:`Maths 7e année`,eyebrow:`Unit 2 · 2.3`,eyebrowVn:`Chương 2 · 2.3`,eyebrowFr:`Unité 2 · 2.3`,date:`15 Sept 2026`,title:`Collecting Like Terms`,titleVn:`Thu gọn các hạng tử đồng dạng`,titleFr:`Réduire les termes semblables`,card:{icon:`Pencil`,badge:`Starter Task`,badgeVn:`Nhiệm vụ khởi động`,badgeFr:`Pour commencer`,text:`When **a = 5**, work out **3a + 4a**. Then work out **7a**.`,textVn:`Khi **a = 5**, hãy tính **3a + 4a**. Rồi tính **7a**.`,textFr:`Si **a = 5**, calcule **3a + 4a**. Puis calcule **7a**.`}},{layout:`statement`,accent:Z,icon:`HelpCircle`,eyebrow:`Starter check`,eyebrowVn:`Kiểm tra khởi động`,eyebrowFr:`Correction`,title:`Same Answer?`,titleVn:`Cùng đáp án?`,titleFr:`Même réponse\xA0?`,text:`Both answers are **35**.`,textVn:`Cả hai đáp án đều là **35**.`,textFr:`Les deux réponses font **35**.`,sub:`Luck? Or is **3a + 4a** always the same as **7a**?`,subVn:`Tình cờ? Hay **3a + 4a** luôn bằng **7a**?`,subFr:`Un hasard\xA0? Ou **3a + 4a** est-il toujours égal à **7a**\xA0?`,reveal:{label:`Try a = 10`,labelVn:`Thử a = 10`,labelFr:`Essaie a = 10`,answer:`$3a + 4a = 30 + 40 = 70$ and $7a = 70$.

Always the same. Today you find out why.`,answerVn:`$3a + 4a = 30 + 40 = 70$ và $7a = 70$.

Luôn bằng nhau. Hôm nay em sẽ biết vì sao.`,answerFr:`$3a + 4a = 30 + 40 = 70$ et $7a = 70$.

Toujours pareil. Aujourd’hui, tu vas voir pourquoi.`}},{layout:`statement`,accent:Z,icon:`MessageSquare`,eyebrow:`Say it in English`,eyebrowVn:`Nói bằng tiếng Anh`,eyebrowFr:`Dis-le en anglais`,title:`What Is in the Bag?`,titleVn:`Trong túi có gì?`,titleFr:`Qu’y a-t-il dans le sac\xA0?`,text:`Mr Bowen buys **3 apples** and **2 bananas**. Then he buys **4 apples** and **1 banana**.`,textVn:`Thầy Bowen mua **3 quả táo** và **2 quả chuối**. Sau đó thầy mua **4 quả táo** và **1 quả chuối**.`,textFr:`M. Bowen achète **3 pommes** et **2 bananes**. Puis il achète **4 pommes** et **1 banane**.`,sub:`What is in his bag? Say it in a sentence.`,subVn:`Trong túi của thầy có gì? Hãy nói thành một câu (bằng tiếng Anh).`,subFr:`Qu’y a-t-il dans son sac\xA0? Dis-le en une phrase, en anglais.`},{layout:`showcase`,accent:X,icon:`Boxes`,eyebrow:`English does this already`,eyebrowVn:`Tiếng Anh vốn đã làm vậy`,eyebrowFr:`L’anglais le fait déjà`,title:`Apples With Apples`,titleVn:`Táo đi với táo`,titleFr:`Les pommes avec les pommes`,inlineSvg:L.FRUIT_BAG,caption:`Nobody says "10 apple-bananas". Algebra does not either.`,captionVn:`Không ai nói "10 quả táo-chuối". Đại số cũng vậy. (a: số táo, b: số chuối)`,captionFr:`Personne ne dit «\xA010 pommes-bananes\xA0». L’algèbre non plus. (a\xA0: pommes, b\xA0: bananes)`},{layout:`showcase`,accent:X,icon:`Atom`,eyebrow:`Science 2.5, this morning`,eyebrowVn:`Khoa học 2.5, sáng nay`,eyebrowFr:`Sciences 2.5, ce matin`,title:`Sorted by Kind`,titleVn:`Xếp theo từng loại`,titleFr:`Triés par sorte`,inlineSvg:L.ATOMS_SORT,caption:`Carbon and oxygen are different elements. Count each kind on its own.`,captionVn:`Cacbon và oxi là hai nguyên tố khác nhau. Đếm riêng từng loại. (carbon = cacbon, oxygen = oxi, hydrogen = hiđro)`,captionFr:`Le carbone et l’oxygène sont deux éléments différents. Compte chaque sorte à part.`},{layout:`split`,accent:Q,icon:`Boxes`,eyebrow:`Key word`,eyebrowVn:`Từ khóa`,eyebrowFr:`Mot clé`,title:`Term`,titleVn:`Hạng tử`,titleFr:`Terme`,ratio:40,inlineSvg:L.TERMS,content:`An expression is made of **terms**.`,contentVn:`Một biểu thức được tạo nên từ các **hạng tử (terms)**.`,contentFr:`Une expression est faite de **termes**.`,notes:[{tone:`write`,text:`**Term:** one part of an expression.
The + and − signs separate the terms.`,textVn:`**Hạng tử (term):** một phần của biểu thức.
Các dấu + và − ngăn cách các hạng tử.`,textFr:`**Terme (term)\xA0:** une partie d’une expression.
Les signes + et − séparent les termes.`}]},{layout:`showcase`,accent:Z,icon:`MessageSquare`,eyebrow:`English check`,eyebrowVn:`Kiểm tra tiếng Anh`,eyebrowFr:`Point d’anglais`,title:`Words With Two Meanings`,titleVn:`Từ có hai nghĩa`,titleFr:`Des mots à deux sens`,inlineSvg:L.WORDS,caption:`In maths, **like** means **the same kind**.`,captionVn:`Trong toán, **like** nghĩa là **cùng loại**, không phải "thích". **collect** = gộp lại, **simplify** = rút gọn.`,captionFr:`En maths, **like** veut dire **de la même sorte**, pas «\xA0aimer\xA0». **collect** = regrouper, **simplify** = simplifier.`},{layout:`split`,accent:Q,icon:`Equal`,eyebrow:`Key word`,eyebrowVn:`Từ khóa`,eyebrowFr:`Mot clé`,title:`Like Terms`,titleVn:`Hạng tử đồng dạng`,titleFr:`Termes semblables`,ratio:40,inlineSvg:L.LIKE_UNLIKE,content:`Look at the **letter**, not the number.`,contentVn:`Nhìn vào **chữ cái**, không nhìn con số.`,contentFr:`Regarde la **lettre**, pas le nombre.`,notes:[{tone:`write`,text:`**Like terms:** terms that contain the same letter.
$2a$ and $3a$ are like terms. $2a$ and $3b$ are not.`,textVn:`**Hạng tử đồng dạng (like terms):** các hạng tử có cùng chữ cái.
$2a$ và $3a$ là hạng tử đồng dạng. $2a$ và $3b$ thì không.`,textFr:`**Termes semblables (like terms)\xA0:** des termes qui ont la même lettre.
$2a$ et $3a$ sont des termes semblables. $2a$ et $3b$, non.`}]},{layout:`split`,accent:Q,icon:`Layers`,eyebrow:`Key words`,eyebrowVn:`Từ khóa`,eyebrowFr:`Mots clés`,title:`Collect and Simplify`,titleVn:`Gộp và rút gọn`,titleFr:`Réduire et simplifier`,ratio:45,image:Te,content:`Halong Bay: every basket holds **one kind** of fruit.`,contentVn:`Vịnh Hạ Long: mỗi rổ chỉ đựng **một loại** trái cây.`,contentFr:`Baie d’Halong\xA0: chaque panier contient **une seule sorte** de fruit.`,notes:[{tone:`write`,text:`**Simplify:** write an expression in a shorter way.
**Collecting like terms:** adding like terms together to simplify.
$a + a = 2a$ and $2b + 3b = 5b$`,textVn:`**Rút gọn (simplify):** viết biểu thức ngắn gọn hơn.
**Thu gọn hạng tử đồng dạng (collecting like terms):** cộng các hạng tử đồng dạng lại để rút gọn.
$a + a = 2a$ và $2b + 3b = 5b$`,textFr:`**Simplifier (simplify)\xA0:** écrire une expression plus courte.
**Réduire (collecting like terms)\xA0:** additionner les termes semblables pour simplifier.
$a + a = 2a$ et $2b + 3b = 5b$`}]},{layout:`showcase`,accent:Q,icon:`Target`,eyebrow:`Say each step first`,eyebrowVn:`Nói từng bước trước`,eyebrowFr:`Dis chaque étape avant`,title:`Find, Move, Collect`,titleVn:`Tìm, chuyển, gộp`,titleFr:`Trouve, bouge, réduis`,widget:ve,caption:`Before each press, the class says what happens next.`,captionVn:`Trước mỗi lần bấm, cả lớp nói điều gì sẽ xảy ra.`,captionFr:`Avant chaque clic, la classe dit ce qui va se passer.`},{layout:`compare`,accent:Z,icon:`Hand`,eyebrow:`Vote with one hand`,eyebrowVn:`Biểu quyết bằng một tay`,eyebrowFr:`Vote avec une main`,title:`Which Is Right?`,titleVn:`Đáp án nào đúng?`,titleFr:`Laquelle est juste\xA0?`,text:`Simplify $8s − s$`,textVn:`Rút gọn $8s − s$`,textFr:`Simplifie $8s − s$`,columns:[{heading:`A · left hand up`,headingVn:`A · giơ tay trái`,headingFr:`A · main gauche levée`,accent:Ee,icon:`Hand`,inlineSvg:L.ANS_8},{heading:`B · right hand up`,headingVn:`B · giơ tay phải`,headingFr:`B · main droite levée`,accent:Q,icon:`Hand`,inlineSvg:L.ANS_7S}]},{layout:`split`,accent:De,icon:`AlertTriangle`,eyebrow:`The invisible 1`,eyebrowVn:`Số 1 vô hình`,eyebrowFr:`Le 1 invisible`,title:`x Means 1x`,titleVn:`x nghĩa là 1x`,titleFr:`x veut dire 1x`,ratio:40,inlineSvg:L.ONE_X,content:`**7s is right.** The letter never disappears.`,contentVn:`**7s mới đúng.** Chữ cái không bao giờ biến mất.`,contentFr:`**7s est juste.** La lettre ne disparaît jamais.`,notes:[{tone:`write`,text:`$x$ means $1x$.
$4x + x = 5x$ and $8s − s = 7s$`,textVn:`$x$ nghĩa là $1x$.
$4x + x = 5x$ và $8s − s = 7s$`,textFr:`$x$ veut dire $1x$.
$4x + x = 5x$ et $8s − s = 7s$`}]},{layout:`split`,accent:Q,icon:`Ruler`,eyebrow:`The rule`,eyebrowVn:`Quy tắc`,eyebrowFr:`La règle`,title:`Only Like Terms`,titleVn:`Chỉ gộp hạng tử đồng dạng`,titleFr:`Seulement les termes semblables`,ratio:40,inlineSvg:L.CANT_COLLECT,content:`Can you add 5 cm and 3 kg?`,contentVn:`Em có cộng được 5 cm với 3 kg không?`,contentFr:`Peux-tu additionner 5 cm et 3 kg\xA0?`,notes:[{tone:`write`,text:`You can only collect **like terms**.
$3a + 2b$ cannot be simplified.`,textVn:`Em chỉ có thể gộp các **hạng tử đồng dạng**.
$3a + 2b$ không thể rút gọn.`,textFr:`Tu ne peux réduire que les **termes semblables**.
$3a + 2b$ ne peut pas être simplifié.`}]},{layout:`split`,accent:$,icon:`CheckCircle2`,eyebrow:`Whiteboards`,eyebrowVn:`Bảng con`,eyebrowFr:`Ardoises`,title:`Tick or Cross?`,titleVn:`Đánh dấu ✓ hay ✗?`,titleFr:`Coche ou croix\xA0?`,ratio:50,content:`Can it be simplified? Tick ✓ and simplify. Or cross ✗.

**a** $4k + k$
**b** $3k + 3$
**c** $7w − 2v$
**d** $9d − d$
**e** $2m + 5m + 1$`,contentVn:`Có rút gọn được không? Đánh ✓ rồi rút gọn. Hoặc đánh ✗.

**a** $4k + k$
**b** $3k + 3$
**c** $7w − 2v$
**d** $9d − d$
**e** $2m + 5m + 1$`,contentFr:`Peut-on simplifier\xA0? Coche ✓ et simplifie. Sinon, mets une croix ✗.

**a** $4k + k$
**b** $3k + 3$
**c** $7w − 2v$
**d** $9d − d$
**e** $2m + 5m + 1$`,reveal:{label:`Check your answers`,labelVn:`Kiểm tra đáp án`,labelFr:`Vérifie tes réponses`,answer:`**a** ✓ $5k$, **b** ✗, **c** ✗, **d** ✓ $8d$, **e** ✓ $7m + 1$`,answerVn:`**a** ✓ $5k$, **b** ✗, **c** ✗, **d** ✓ $8d$, **e** ✓ $7m + 1$`,answerFr:`**a** ✓ $5k$, **b** ✗, **c** ✗, **d** ✓ $8d$, **e** ✓ $7m + 1$`}},{layout:`split`,accent:Q,icon:`ScanEye`,eyebrow:`Look closely`,eyebrowVn:`Nhìn kỹ nhé`,eyebrowFr:`Regarde bien`,title:`Tricky Like Terms`,titleVn:`Hạng tử đồng dạng dễ nhầm`,titleFr:`Termes semblables piégeux`,ratio:40,inlineSvg:L.TRICKY,notes:[{tone:`write`,text:`**Numbers** are like terms: $7 + 2 = 9$.
$ab$ and $ba$ are like terms, because $a × b = b × a$.
$x$ and $x^2$ are **not** like terms.`,textVn:`**Các số** là hạng tử đồng dạng: $7 + 2 = 9$.
$ab$ và $ba$ là hạng tử đồng dạng, vì $a × b = b × a$.
$x$ và $x^2$ **không** đồng dạng.`,textFr:`**Les nombres** sont des termes semblables\xA0: $7 + 2 = 9$.
$ab$ et $ba$ sont des termes semblables, car $a × b = b × a$.
$x$ et $x^2$ ne sont **pas** semblables.`}]},{layout:`game`,title:`Like or Not?`,titleVn:`Đồng dạng hay không?`,titleFr:`Semblables ou non\xA0?`,widget:we},{layout:`compare`,accent:Z,icon:`Hand`,eyebrow:`Vote with one hand`,eyebrowVn:`Biểu quyết bằng một tay`,eyebrowFr:`Vote avec une main`,title:`Two Pairs Disagree`,titleVn:`Hai cặp không đồng ý`,titleFr:`Deux binômes pas d’accord`,text:`Simplify $7x + 5y − 3x + y$`,textVn:`Rút gọn $7x + 5y − 3x + y$`,textFr:`Simplifie $7x + 5y − 3x + y$`,columns:[{heading:`A · left hand up`,headingVn:`A · giơ tay trái`,headingFr:`A · main gauche levée`,accent:Ee,icon:`Hand`,inlineSvg:L.ANS_4X6Y},{heading:`B · right hand up`,headingVn:`B · giơ tay phải`,headingFr:`B · main droite levée`,accent:Q,icon:`Hand`,inlineSvg:L.ANS_10X6Y}]},{layout:`showcase`,accent:De,icon:`Move`,eyebrow:`Watch the minus sign`,eyebrowVn:`Theo dõi dấu trừ`,eyebrowFr:`Surveille le signe moins`,title:`The Sign Moves Too`,titleVn:`Dấu cũng di chuyển`,titleFr:`Le signe bouge aussi`,widget:ye,caption:`**4x + 6y** is right. Watch where the **−** goes.`,captionVn:`**4x + 6y** mới đúng. Hãy xem dấu **−** đi đâu.`,captionFr:`**4x + 6y** est juste. Regarde où va le **−**.`},{layout:`callout`,accent:Q,icon:`Pencil`,eyebrow:`The rule`,eyebrowVn:`Quy tắc`,eyebrowFr:`La règle`,title:`Keep the Sign`,titleVn:`Giữ nguyên dấu`,titleFr:`Garde le signe`,notes:[{tone:`write`,text:`The sign **in front** of a term belongs to it. Move them together.
$7x + 5y − 3x + y = 7x − 3x + 5y + y = 4x + 6y$`,textVn:`Dấu **đứng trước** hạng tử thuộc về hạng tử đó. Di chuyển cùng nhau.
$7x + 5y − 3x + y = 7x − 3x + 5y + y = 4x + 6y$`,textFr:`Le signe **devant** un terme lui appartient. Déplace-les ensemble.
$7x + 5y − 3x + y = 7x − 3x + 5y + y = 4x + 6y$`}],reveal:{prompt:`Simplify **a** $6p + 2q − 4p + 3q$ and **b** $9 + 5t − 4 − 2t$.`,promptVn:`Rút gọn **a** $6p + 2q − 4p + 3q$ và **b** $9 + 5t − 4 − 2t$.`,promptFr:`Simplifie **a** $6p + 2q − 4p + 3q$ et **b** $9 + 5t − 4 − 2t$.`,label:`Check your answers`,labelVn:`Kiểm tra đáp án`,labelFr:`Vérifie tes réponses`,answer:`**a** $2p + 5q$, **b** $3t + 5$`,answerVn:`**a** $2p + 5q$, **b** $3t + 5$`,answerFr:`**a** $2p + 5q$, **b** $3t + 5$`}},{layout:`showcase`,accent:X,icon:`Ruler`,eyebrow:`Real bricks`,eyebrowVn:`Gạch thật`,eyebrowFr:`De vraies briques`,title:`A Letter Is a Number`,titleVn:`Chữ cái là một con số`,titleFr:`Une lettre est un nombre`,inlineSvg:L.BRICKS_REAL,caption:`Here **x** is not a brick. It is the **length** of one brick.`,captionVn:`Ở đây **x** không phải viên gạch. Nó là **chiều dài** của một viên gạch. (length = chiều dài)`,captionFr:`Ici, **x** n’est pas une brique. C’est la **longueur** d’une brique. (length = longueur)`},{layout:`split`,accent:$,icon:`Ruler`,eyebrow:`Simplest form`,eyebrowVn:`Dạng gọn nhất`,eyebrowFr:`Forme réduite`,title:`How Long Is Each Row?`,titleVn:`Mỗi hàng dài bao nhiêu?`,titleFr:`Quelle longueur pour chaque rangée\xA0?`,ratio:40,inlineSvg:L.BRICK_ROWS,content:`Write the total length of each row in **simplest form**.`,contentVn:`Viết tổng chiều dài của mỗi hàng ở **dạng gọn nhất**.`,contentFr:`Écris la longueur totale de chaque rangée sous **forme réduite**.`,reveal:{label:`Check your answers`,labelVn:`Kiểm tra đáp án`,labelFr:`Vérifie tes réponses`,answer:`**a** $2x + y$
**b** $x + 2y$
**c** $3x + 2y$`,answerVn:`**a** $2x + y$
**b** $x + 2y$
**c** $3x + 2y$`,answerFr:`**a** $2x + y$
**b** $x + 2y$
**c** $3x + 2y$`}},{layout:`split`,accent:$,icon:`Triangle`,eyebrow:`Workbook puzzle`,eyebrowVn:`Câu đố trong vở bài tập`,eyebrowFr:`Énigme du cahier d’exercices`,title:`Algebraic Pyramids`,titleVn:`Kim tự tháp đại số`,titleFr:`Pyramides algébriques`,ratio:40,widget:Se,content:`Each block is the **two blocks under it**, added.

Say the block **before** you press.`,contentVn:`Mỗi ô bằng **hai ô bên dưới** cộng lại.

Nói kết quả **trước** khi bấm.`,contentFr:`Chaque case est la somme des **deux cases en dessous**.

Dis la case **avant** de cliquer.`},{layout:`split`,accent:Z,icon:`Pencil`,eyebrow:`Find the mistakes`,eyebrowVn:`Tìm lỗi sai`,eyebrowFr:`Trouve les erreurs`,title:`Mr Bowen's Homework`,titleVn:`Bài tập về nhà của thầy Bowen`,titleFr:`Les devoirs de M. Bowen`,ratio:40,inlineSvg:L.MISTAKES,content:`Mr Bowen gave himself **4 out of 4**.

Find his **four** mistakes.`,contentVn:`Thầy Bowen tự chấm **4 trên 4**.

Hãy tìm **bốn** lỗi sai của thầy.`,contentFr:`M. Bowen s’est mis **4 sur 4**.

Trouve ses **quatre** erreurs.`,reveal:{label:`Check your answers`,labelVn:`Kiểm tra đáp án`,labelFr:`Vérifie tes réponses`,answer:`**a** $3x + 5$: no like terms
**b** $5y$: $y$ means $1y$
**c** $5p + 2q$
**d** $5ab$: $ab$ and $ba$ are like terms`,answerVn:`**a** $3x + 5$: không có hạng tử đồng dạng
**b** $5y$: $y$ nghĩa là $1y$
**c** $5p + 2q$
**d** $5ab$: $ab$ và $ba$ là hạng tử đồng dạng`,answerFr:`**a** $3x + 5$\xA0: pas de termes semblables
**b** $5y$\xA0: $y$ veut dire $1y$
**c** $5p + 2q$
**d** $5ab$\xA0: $ab$ et $ba$ sont des termes semblables`}},{layout:`split`,accent:$,icon:`PenLine`,eyebrow:`Write it, then simplify`,eyebrowVn:`Viết ra, rồi rút gọn`,eyebrowFr:`Écris-le, puis simplifie`,title:`Word Problems`,titleVn:`Bài toán có lời văn`,titleFr:`Problèmes`,ratio:50,inlineSvg:L.RECTANGLE,content:`**1.** Mr Bowen buys $n$ pens on Monday and $3n$ pens on Tuesday. How many pens does he buy?

**2.** Find the perimeter of the rectangle.`,contentVn:`**1.** Thầy Bowen mua $n$ cây bút vào thứ Hai và $3n$ cây bút vào thứ Ba. Thầy mua tất cả bao nhiêu cây bút?

**2.** Tìm chu vi hình chữ nhật.`,contentFr:`**1.** M. Bowen achète $n$ stylos lundi et $3n$ stylos mardi. Combien de stylos achète-t-il\xA0?

**2.** Trouve le périmètre du rectangle.`,reveal:{label:`Check your answers`,labelVn:`Kiểm tra đáp án`,labelFr:`Vérifie tes réponses`,answer:`**1.** $n + 3n = 4n$ pens
**2.** $2x + 1 + x + 2x + 1 + x = 6x + 2$ cm`,answerVn:`**1.** $n + 3n = 4n$ cây bút
**2.** $2x + 1 + x + 2x + 1 + x = 6x + 2$ cm`,answerFr:`**1.** $n + 3n = 4n$ stylos
**2.** $2x + 1 + x + 2x + 1 + x = 6x + 2$ cm`}},{layout:`callout`,accent:$,icon:`PenLine`,eyebrow:`Simplest form`,eyebrowVn:`Dạng gọn nhất`,eyebrowFr:`Forme réduite`,title:`Mr Bowen's Animals`,titleVn:`Những con vật của thầy Bowen`,titleFr:`Les animaux de M. Bowen`,content:`Mr Bowen has $4c$ cats. He buys $3c$ more cats and $2d$ dogs.

Then $5c$ cats leave. One goldfish, called x, arrives.

How many animals does Mr Bowen have now?`,contentVn:`Thầy Bowen có $4c$ con mèo. Thầy mua thêm $3c$ con mèo và $2d$ con chó.

Sau đó $5c$ con mèo bỏ đi. Một con cá vàng tên là x đến.

Bây giờ thầy Bowen có bao nhiêu con vật?`,contentFr:`M. Bowen a $4c$ chats. Il achète encore $3c$ chats et $2d$ chiens.

Puis $5c$ chats s’en vont. Un poisson rouge, appelé x, arrive.

Combien d’animaux M. Bowen a-t-il maintenant\xA0?`,reveal:{label:`Check your answer`,labelVn:`Kiểm tra đáp án`,labelFr:`Vérifie ta réponse`,answer:`$4c + 3c + 2d − 5c + 1 = 2c + 2d + 1$

The goldfish is **1** animal. Its name is not a number.`,answerVn:`$4c + 3c + 2d − 5c + 1 = 2c + 2d + 1$

Con cá vàng là **1** con vật. Tên của nó không phải là một con số.`,answerFr:`$4c + 3c + 2d − 5c + 1 = 2c + 2d + 1$

Le poisson rouge, c’est **1** animal. Son nom n’est pas un nombre.`}},{layout:`callout`,accent:$,icon:`PenLine`,eyebrow:`Simplest form`,eyebrowVn:`Dạng gọn nhất`,eyebrowFr:`Forme réduite`,title:`Mr Bowen's Keys`,titleVn:`Chùm chìa khóa của thầy Bowen`,titleFr:`Les clés de M. Bowen`,content:`Mr Bowen walks $3k$ km to school, then $3k$ km home.

He cannot find his keys. He walks to school and home again.

The keys were in his pocket. How far did he walk?`,contentVn:`Thầy Bowen đi bộ $3k$ km đến trường, rồi $3k$ km về nhà.

Thầy không tìm thấy chìa khóa. Thầy lại đi bộ đến trường rồi về nhà.

Chìa khóa ở trong túi áo của thầy. Thầy đã đi bộ bao xa?`,contentFr:`M. Bowen marche $3k$ km jusqu’à l’école, puis $3k$ km pour rentrer.

Il ne trouve pas ses clés. Il refait l’aller et le retour.

Les clés étaient dans sa poche. Combien de km a-t-il marché\xA0?`,reveal:{label:`Check your answer`,labelVn:`Kiểm tra đáp án`,labelFr:`Vérifie ta réponse`,answer:`$3k + 3k + 3k + 3k = 12k$ km

The keys walked $12k$ km too.`,answerVn:`$3k + 3k + 3k + 3k = 12k$ km

Chùm chìa khóa cũng đã đi $12k$ km.`,answerFr:`$3k + 3k + 3k + 3k = 12k$ km

Les clés ont fait $12k$ km, elles aussi.`}},{layout:`stack`,variant:`checklist`,accent:X,icon:`CheckCircle2`,columns:2,eyebrow:`Before you leave`,eyebrowVn:`Trước khi ra về`,eyebrowFr:`Avant de partir`,title:`Can You Do These?`,titleVn:`Em làm được chưa?`,titleFr:`Sais-tu le faire\xA0?`,content:`> Check your notebook: **7 written panels**.`,contentVn:`> Kiểm tra vở: **7 khung ghi chép**.`,contentFr:`> Vérifie ton cahier\xA0: **7 encadrés recopiés**.`,items:[{text:`Say what a **term** and **like terms** are.`,textVn:`Nói được **hạng tử** và **hạng tử đồng dạng** là gì.`,textFr:`Dire ce que sont un **terme** et des **termes semblables**.`},{text:`**Simplify** by collecting like terms.`,textVn:`**Rút gọn** bằng cách gộp hạng tử đồng dạng.`,textFr:`**Simplifier** en réduisant les termes semblables.`},{text:`Remember that $x$ means $1x$.`,textVn:`Nhớ rằng $x$ nghĩa là $1x$.`,textFr:`Se souvenir que $x$ veut dire $1x$.`},{text:`Know that $3a + 2b$ cannot be simplified.`,textVn:`Biết rằng $3a + 2b$ không thể rút gọn.`,textFr:`Savoir que $3a + 2b$ ne peut pas être simplifié.`},{text:`Spot tricky like terms: $ab$ and $ba$.`,textVn:`Nhận ra hạng tử đồng dạng dễ nhầm: $ab$ và $ba$.`,textFr:`Repérer les termes semblables piégeux\xA0: $ab$ et $ba$.`},{text:`Move each **sign** with its term.`,textVn:`Di chuyển **dấu** cùng với hạng tử của nó.`,textFr:`Déplacer chaque **signe** avec son terme.`}]},{layout:`callout`,accent:De,icon:`Home`,eyebrow:`Homework Assignment`,eyebrowVn:`Bài tập về nhà`,eyebrowFr:`Devoirs`,title:`For Next Lesson`,titleVn:`Cho tiết học sau`,titleFr:`Pour le prochain cours`,content:`Before you simplify, **find** the like terms. Circle each kind in a different colour.`,contentVn:`Trước khi rút gọn, hãy **tìm** các hạng tử đồng dạng. Khoanh mỗi loại bằng một màu khác nhau.`,contentFr:`Avant de simplifier, **trouve** les termes semblables. Entoure chaque sorte d’une couleur différente.`,notes:[{tone:`homework`,badge:`Workbook 2.3`,badgeVn:`Vở bài tập 2.3`,badgeFr:`Cahier d’exercices 2.3`,icon:`Pencil`,text:`**Focus** — everybody.
**Practice** — the bricks and the pyramids.
**Challenge** — an attempt beats a blank.`,textVn:`**Focus** — tất cả các em.
**Practice** — phần viên gạch và kim tự tháp.
**Challenge** — làm sai vẫn hơn bỏ trống.`,textFr:`**Focus** — tout le monde.
**Practice** — les briques et les pyramides.
**Challenge** — essayer vaut mieux que laisser vide.`}]},{layout:`hero`,color:X,icon:`CheckCircle2`,brand:`Year 7 Mathematics`,brandVn:`Toán Lớp 7`,brandFr:`Maths 7e année`,title:`Lesson Complete!`,titleVn:`Hoàn thành bài học!`,titleFr:`Leçon terminée\xA0!`,subtitle:`Exit question: simplify **5m + 2n − m + 4n**.`,subtitleVn:`Câu hỏi ra về: rút gọn **5m + 2n − m + 4n**.`,subtitleFr:`Question de sortie\xA0: simplifie **5m + 2n − m + 4n**.`}],plan:{duration:`50 minutes`,objective:`Students can say what a term and like terms are; simplify an expression by collecting like terms; know that x means 1x, so 8s − s = 7s and not 8; leave unlike terms such as 3a + 2b alone; recognise numbers, and ab and ba, as like terms, but not x and x²; and move each sign with its term, so 7x + 5y − 3x + y = 4x + 6y.`,materials:[`Projector / TV for the lesson deck`,`Mini whiteboards + markers (one per pair)`,`Student notebooks; two or three coloured pens help for circling like terms`,`Workbook Unit 2, Section 2.3 for the homework`],vocab:[{term:`Term`,def:`one part of an expression; the + and − signs separate the terms. A number on its own is a term too (Vietnamese: hạng tử)`},{term:`Like terms`,def:`terms that contain the same letter. Say out loud that "like" here means "the same kind", not "thích" (Vietnamese: hạng tử đồng dạng)`},{term:`Simplify`,def:`write an expression in a shorter way. The exam says "simplify" and "write in its simplest form" — both mean the same job (Vietnamese: rút gọn)`},{term:`Collecting like terms`,def:`adding like terms together to simplify. "Collect" = put the same kind together, like the baskets on slide 9 (Vietnamese: thu gọn / gộp hạng tử đồng dạng)`},{term:`Simplest form`,def:`not a copy-down word, but it is in half the workbook questions: the expression once every like term is collected`}],timeline:[{time:`0–4 min`,phase:`Starter`,detail:`Slide 1: when a = 5, work out 3a + 4a, then 7a. Both are 35. Slide 2: is that luck? Take a guess, then open Try a = 10 (70 both times).`},{time:`4–9 min`,phase:`The bag`,detail:`Slide 3: make a student SAY the bag in a full English sentence ("7 apples and 3 bananas"). No letters yet. Slide 4: the photos, then 3a + 2b + 4a + b = 7a + 3b. Slide 5: the same idea with this morning’s atoms (9 atoms, 3 kinds) — 30 seconds, skip if short of time.`},{time:`9–17 min`,phase:`Key words`,detail:`Slide 6: copy TERM. Slide 7: like / collect / simplify, everyday vs maths; make the class say both meanings. Slide 8: copy LIKE TERMS. Slide 9: the Halong Bay baskets; copy SIMPLIFY and COLLECTING LIKE TERMS.`},{time:`17–21 min`,phase:`Find, move, collect`,detail:`Slide 10: press Next step; the class says "find", "move", "collect" before each press. Do all four expressions (the second one is 4x + x + 2x — watch for 6x).`},{time:`21–27 min`,phase:`The invisible 1`,detail:`Slide 11: everyone votes at once — left hand up for A (8), right hand up for B (7s). No discussion of the answer yet. Slide 12: 7s; copy x MEANS 1x. Slide 13: 5 cm + 3 kg; copy ONLY LIKE TERMS. Slide 14: five on whiteboards, then Check.`},{time:`27–33 min`,phase:`Tricky terms + game`,detail:`Slide 15: copy the three tricky cases. Slide 16: Like or Not? — thumbs up/down, then Show. Aim for 10–12 cards. Leave the game with the deck’s Continue button.`},{time:`33–38 min`,phase:`Keep the sign`,detail:`Slide 17: left hand A (4x + 6y), right hand B (10x + 6y), all at once. Slide 18: step through the first expression and stop on Move — point at the −3x travelling. Slide 19: copy KEEP THE SIGN; a and b on whiteboards.`},{time:`38–44 min`,phase:`Bricks and pyramids`,detail:`Slide 20: correct the apple — x is a length, a number. Slide 21: three rows on whiteboards. Slide 22: first pyramid together; second if time (the 2a + 3b block cannot be simplified — say so); the third works backwards.`},{time:`44–48 min`,phase:`Mistakes and word problems`,detail:`Slide 23: Mr Bowen’s homework, pairs find the four mistakes. Slides 24–26: word problems, getting sillier; read 25 and 26 completely straight.`},{time:`48–50 min`,phase:`Close`,detail:`Slide 27: checklist, 7 written panels. Slide 28: homework. Slide 29: exit question on whiteboards.`}],answers:[{q:`Slide 1 — starter`,a:`3a + 4a = 15 + 20 = 35; 7a = 7 × 5 = 35.`},{q:`Slide 10 — Find, Move, Collect`,a:`2b + 3b = 5b · 4x + x + 2x = 7x · 3a + 2b + 4a + b = 7a + 3b · 5m + 2n + m + 4n = 6m + 6n.`},{q:`Slide 14 — tick or cross`,a:`a ✓ 5k · b ✗ (3k and 3 are not like terms) · c ✗ (w and v) · d ✓ 8d · e ✓ 7m + 1.`},{q:`Slide 18 — the sign moves`,a:`7x + 5y − 3x + y = 4x + 6y · 8a − 3b + 2a − b = 10a − 4b · 6 + 5t − 1 − 2t = 3t + 5 · 9p − 4q − 5p + 7q + 2 = 4p + 3q + 2.`},{q:`Slide 19 — keep the sign`,a:`a 6p − 4p + 2q + 3q = 2p + 5q · b 5t − 2t + 9 − 4 = 3t + 5.`},{q:`Slide 21 — brick rows`,a:`a (x x y) 2x + y · b (y x y) x + 2y · c (x y x y x) 3x + 2y.`},{q:`Slide 22 — pyramids`,a:`1: 2x, 5x, x → 7x, 6x → 13x. 2: a + b, 2a, 3b → 3a + b, 2a + 3b → 5a + 4b. 3 (backwards): top 12y, middle 5y and 7y, bottom 2y, 3y, 4y.`},{q:`Slide 23 — Mr Bowen’s homework`,a:`a 3x + 5 cannot be simplified (not 8x) · b 5y (not 6) · c 5p + 2q (not 6pq) · d 5ab (ab and ba are like terms).`},{q:`Slide 24 — word problems`,a:`1: 4n pens. 2: perimeter = 2x + 1 + x + 2x + 1 + x = 6x + 2 cm.`},{q:`Slide 25 — the animals`,a:`4c + 3c + 2d − 5c + 1 = 2c + 2d + 1. The goldfish is 1 animal; students who write + x have added its name.`},{q:`Slide 26 — the keys`,a:`3k × 4 trips = 12k km. The keys were irrelevant.`},{q:`Exit question`,a:`5m − m + 2n + 4n = 4m + 6n.`}],notes:`The notebook count is 7 written panels: term; like terms; simplify + collecting like terms; x means 1x; only like terms; tricky like terms; keep the sign. The workbook’s key words box is collecting like terms, like terms, simplify, term — all four are copied. The book’s tip says to think of a letter as an apple or a banana. It helps on day one, and slide 20 deliberately corrects it: a letter is a number (the length of a brick), not an object. Do not skip that slide if short of time; skip slide 5 instead. Workbook Q7 (h², y³) and Q10 (ab, rd, jk, kj) are covered by slide 15 and the game; Q13 (fractions such as 3a/4 − a/2) was not taught and can be left for Challenge students. In the game, "5c and −2c" is a like pair on purpose: the sign belongs to the term but does not change its kind. Like or Not?: a clicker’s Right arrow shows the answer, then moves on. Leave the game with the deck’s Back or Continue buttons.`}};export{Oe as default};