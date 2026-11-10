import{a as e,i as t,n,o as r,r as i,t as a}from"./widgets-CsBvibg1.js";var o=`/assets/rings-CMEfXZbK.jpg`,s=`/assets/aluminium-BXgJHdLv.jpg`,c=`/assets/zinc-BIQK0ZdQ.jpg`,l=`/assets/lead-5Hy5Rm_q.jpg`,u=`/assets/copper-Ca866aD9.jpg`,d=`/assets/iron-Cqxpxi_G.jpg`,f=`/assets/bromine-BUIifHef.jpg`,p=`/assets/carbon-D68C-orY.jpg`,m=`/assets/gold-C8vJJ_mY.jpg`,h=`/assets/silver-BgI-LWzA.jpg`,g=`/assets/neon-tydNZGe_.jpg`,_=`/assets/oxygen-CqLoYWKa.jpg`,v=`/assets/sulfur-BxuEo2s6.jpg`,y=`#2b2b2b`,b=`#c25e12`,x=`#5b6770`,S=`#cfd8dc`,C=`#fbe7a1`,w=`#b8912a`,T=`#cfe5f5`,E=`#4f8fbf`,D=`Inter, 'Segoe UI', system-ui, sans-serif`,O=(e,t)=>`<rect x="0" y="0" width="${e}" height="${t}" rx="14" fill="#ffffff"/>
    <rect x="0.75" y="0.75" width="${e-1.5}" height="${t-1.5}" rx="13" fill="none" stroke="#e2e8f0" stroke-width="1.5"/>`,k=(e,t,n,r,i)=>`<circle cx="${e.toFixed(1)}" cy="${t.toFixed(1)}" r="${n}" fill="${r}" stroke="${i}" stroke-width="2"/>`;function A(e,t,n,r){let i=``,a=r*2,o=Math.ceil(n/a);for(let s=-o;s<=o;s++)for(let c=-o;c<=o;c++){let o=e+c*a,l=t+s*a;Math.hypot(o-e,l-t)+r<=n-4&&(i+=k(o,l,r,`#cfd4d9`,`#6b7580`))}return i}function j(e,t,n,r,i,a,o){let s=``;for(let c=0;c<r;c++)for(let r=0;r<n;r++)s+=k(e+i+r*2*i,t+i+c*2*i,i,a,o);return s}function M(e,t,n,r,i,a){let o=``;for(let s=0;s<8;s++){let c=s/8*Math.PI*2-Math.PI/2;o+=k(e+n*Math.cos(c),t+n*Math.sin(c),r,i,a)}return o}var N=(e,t,n,r)=>{let i=Math.atan2(r-t,n-e),a=n-11*Math.cos(i),o=r-11*Math.sin(i),s=6*Math.sin(i),c=-6*Math.cos(i);return`<line x1="${e}" y1="${t}" x2="${a.toFixed(1)}" y2="${o.toFixed(1)}" stroke="${x}" stroke-width="3" stroke-linecap="round"/>
    <path d="M ${n} ${r} L ${(a+s).toFixed(1)} ${(o+c).toFixed(1)} L ${(a-s).toFixed(1)} ${(o-c).toFixed(1)} Z" fill="${x}"/>`};function P(e,t,n){let r=``;for(let i=0;i<4;i++)for(let a=0;a<6;a++){let o=n===`row`&&i===1||n===`col`&&a===2;r+=`<rect x="${e+a*22}" y="${t+i*22}" width="22" height="22" fill="${o?b:`#ffffff`}" stroke="${o?`#8a4209`:`#8a979e`}" stroke-width="1.5"/>`}return r}var F={SILVER_ZOOM:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${O(840,560)}
    <defs>
      <clipPath id="u25-ring-clip"><rect x="30" y="120" width="360" height="240" rx="14"/></clipPath>
    </defs>

    <image href="${o}" x="30" y="120" width="360" height="240" preserveAspectRatio="xMidYMid slice" clip-path="url(#u25-ring-clip)"/>
    <rect x="30" y="120" width="360" height="240" rx="14" fill="none" stroke="${S}" stroke-width="2"/>

    <!-- zoom lines from the magnifier to the atom disc -->
    <line x1="266" y1="236" x2="560" y2="92" stroke="${b}" stroke-width="2.5" stroke-dasharray="7 6"/>
    <line x1="266" y1="296" x2="560" y2="428" stroke="${b}" stroke-width="2.5" stroke-dasharray="7 6"/>
    <circle cx="250" cy="266" r="34" fill="none" stroke="${b}" stroke-width="5"/>

    <circle cx="610" cy="260" r="180" fill="#ffffff" stroke="${b}" stroke-width="5"/>
    ${A(610,260,180,25)}

    <text x="420" y="62" font-family="${D}" font-size="30" font-weight="bold" fill="${y}" text-anchor="middle">Pure silver: one kind of atom</text>
    <text x="210" y="400" font-family="${D}" font-size="24" font-weight="bold" fill="${y}" text-anchor="middle">Silver rings</text>
    <text x="610" y="485" font-family="${D}" font-size="24" font-weight="bold" fill="${b}" text-anchor="middle">Zoom in: only silver atoms</text>
    <text x="420" y="532" font-family="${D}" font-size="22" fill="${x}" text-anchor="middle">Every atom is the same.</text>
  </svg>`,JOINING:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1120 440" class="w-full h-full">
    ${O(1120,440)}

    <!-- Panel 1: neon, atoms alone -->
    <rect x="30" y="24" width="245" height="300" rx="14" fill="#f4faf4" stroke="#9cc79c" stroke-width="2"/>
    ${k(90,90,21,`#8fd18f`,`#2e7d32`)}
    ${k(205,120,21,`#8fd18f`,`#2e7d32`)}
    ${k(115,215,21,`#8fd18f`,`#2e7d32`)}
    ${k(220,262,21,`#8fd18f`,`#2e7d32`)}
    ${N(114,72,150,52)}
    ${N(230,138,256,168)}
    ${N(92,234,60,262)}
    ${N(196,244,170,214)}
    <text x="152" y="366" font-family="${D}" font-size="23" font-weight="bold" fill="${y}" text-anchor="middle">Atoms of neon</text>
    <text x="152" y="398" font-family="${D}" font-size="20" fill="${x}" text-anchor="middle">move around alone</text>

    <!-- Panel 2: gold, packed closely -->
    <rect x="305" y="24" width="245" height="300" rx="14" fill="#fffbef" stroke="#e0c46a" stroke-width="2"/>
    ${j(327.5,74,5,5,20,`#f4cf45`,`#9a7400`)}
    <text x="427" y="366" font-family="${D}" font-size="23" font-weight="bold" fill="${y}" text-anchor="middle">Atoms of gold</text>
    <text x="427" y="398" font-family="${D}" font-size="20" fill="${x}" text-anchor="middle">packed closely</text>

    <!-- Panel 3: oxygen, pairs -->
    <rect x="580" y="24" width="245" height="300" rx="14" fill="#fff5f4" stroke="#e5a39d" stroke-width="2"/>
    ${k(635,92,21,`#f08b82`,`#b3261e`)}${k(673,92,21,`#f08b82`,`#b3261e`)}
    ${k(735,168,21,`#f08b82`,`#b3261e`)}${k(762,195,21,`#f08b82`,`#b3261e`)}
    ${k(640,258,21,`#f08b82`,`#b3261e`)}${k(668,284,21,`#f08b82`,`#b3261e`)}
    <text x="702" y="366" font-family="${D}" font-size="23" font-weight="bold" fill="${y}" text-anchor="middle">Particles of oxygen</text>
    <text x="702" y="398" font-family="${D}" font-size="20" fill="${x}" text-anchor="middle">2 atoms joined</text>

    <!-- Panel 4: sulfur, a ring of eight -->
    <rect x="855" y="24" width="245" height="300" rx="14" fill="#fdfbe8" stroke="#d6c95a" stroke-width="2"/>
    ${M(977,174,54,21,`#efe04a`,`#8a7c00`)}
    <text x="977" y="366" font-family="${D}" font-size="23" font-weight="bold" fill="${y}" text-anchor="middle">A particle of sulfur</text>
    <text x="977" y="398" font-family="${D}" font-size="20" fill="${x}" text-anchor="middle">8 atoms in a ring</text>
  </svg>`,TWO_MEANINGS:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1120 470" class="w-full h-full">
    ${O(1120,470)}

    <text x="500" y="46" font-family="${D}" font-size="22" font-weight="bold" fill="${x}" text-anchor="middle">EVERYDAY ENGLISH</text>
    <text x="870" y="46" font-family="${D}" font-size="22" font-weight="bold" fill="${b}" text-anchor="middle">IN THE PERIODIC TABLE</text>

    <!-- Row 1: table -->
    <rect x="20" y="66" width="1080" height="124" rx="14" fill="#f7f9fa" stroke="${S}" stroke-width="1.5"/>
    <text x="150" y="142" font-family="${D}" font-size="40" font-weight="bold" fill="${y}" text-anchor="middle">table</text>
    <rect x="330" y="104" width="96" height="12" rx="3" fill="#b98a5a" stroke="#6d4c2e" stroke-width="2"/>
    <rect x="340" y="116" width="10" height="44" fill="#6d4c2e"/>
    <rect x="406" y="116" width="10" height="44" fill="#6d4c2e"/>
    <text x="450" y="140" font-family="${D}" font-size="26" fill="${y}">a desk</text>
    ${P(720,84,`none`)}
    <text x="866" y="140" font-family="${D}" font-size="26" font-weight="bold" fill="${b}">a chart</text>

    <!-- Row 2: period -->
    <rect x="20" y="206" width="1080" height="124" rx="14" fill="#f7f9fa" stroke="${S}" stroke-width="1.5"/>
    <text x="150" y="282" font-family="${D}" font-size="40" font-weight="bold" fill="${y}" text-anchor="middle">period</text>
    <circle cx="378" cy="268" r="36" fill="#ffffff" stroke="${y}" stroke-width="4"/>
    <line x1="378" y1="268" x2="378" y2="244" stroke="${y}" stroke-width="4" stroke-linecap="round"/>
    <line x1="378" y1="268" x2="396" y2="276" stroke="${y}" stroke-width="4" stroke-linecap="round"/>
    <text x="450" y="280" font-family="${D}" font-size="26" fill="${y}">one lesson</text>
    ${P(720,224,`row`)}
    <text x="866" y="280" font-family="${D}" font-size="26" font-weight="bold" fill="${b}">a row →</text>

    <!-- Row 3: group -->
    <rect x="20" y="346" width="1080" height="112" rx="14" fill="#f7f9fa" stroke="${S}" stroke-width="1.5"/>
    <text x="150" y="416" font-family="${D}" font-size="40" font-weight="bold" fill="${y}" text-anchor="middle">group</text>
    <circle cx="344" cy="378" r="12" fill="#ffffff" stroke="${y}" stroke-width="3"/>
    <path d="M 326 434 Q 344 396 362 434 Z" fill="#ffffff" stroke="${y}" stroke-width="3"/>
    <circle cx="378" cy="372" r="12" fill="#ffffff" stroke="${y}" stroke-width="3"/>
    <path d="M 360 434 Q 378 390 396 434 Z" fill="#ffffff" stroke="${y}" stroke-width="3"/>
    <circle cx="412" cy="378" r="12" fill="#ffffff" stroke="${y}" stroke-width="3"/>
    <path d="M 394 434 Q 412 396 430 434 Z" fill="#ffffff" stroke="${y}" stroke-width="3"/>
    <text x="450" y="414" font-family="${D}" font-size="26" fill="${y}">people together</text>
    ${P(720,358,`col`)}
    <text x="866" y="414" font-family="${D}" font-size="26" font-weight="bold" fill="${b}">a column ↓</text>
  </svg>`,SYMBOL_WAYS:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 660 560" class="w-full h-full">
    ${O(660,560)}

    <!-- Way 1: first letter -->
    <rect x="36" y="34" width="130" height="130" rx="12" fill="${T}" stroke="${E}" stroke-width="3"/>
    <text x="101" y="122" font-family="${D}" font-size="68" font-weight="bold" fill="${y}" text-anchor="middle">O</text>
    <path d="M 186 99 l 24 -14 l 0 28 z" fill="${b}"/>
    <line x1="208" y1="99" x2="236" y2="99" stroke="${b}" stroke-width="5" stroke-linecap="round"/>
    <rect x="256" y="62" width="48" height="56" rx="6" fill="${b}" stroke="#8a4209" stroke-width="2"/>
    <text x="280" y="102" font-family="${D}" font-size="32" font-weight="bold" fill="#ffffff" text-anchor="middle">O</text>
    <rect x="308" y="62" width="48" height="56" rx="6" fill="#ffffff" stroke="#8a979e" stroke-width="2"/>
    <text x="332" y="102" font-family="${D}" font-size="32" font-weight="bold" fill="${y}" text-anchor="middle">x</text>
    <rect x="360" y="62" width="48" height="56" rx="6" fill="#ffffff" stroke="#8a979e" stroke-width="2"/>
    <text x="384" y="102" font-family="${D}" font-size="32" font-weight="bold" fill="${y}" text-anchor="middle">y</text>
    <rect x="412" y="62" width="48" height="56" rx="6" fill="#ffffff" stroke="#8a979e" stroke-width="2"/>
    <text x="436" y="102" font-family="${D}" font-size="32" font-weight="bold" fill="${y}" text-anchor="middle">g</text>
    <rect x="464" y="62" width="48" height="56" rx="6" fill="#ffffff" stroke="#8a979e" stroke-width="2"/>
    <text x="488" y="102" font-family="${D}" font-size="32" font-weight="bold" fill="${y}" text-anchor="middle">e</text>
    <rect x="516" y="62" width="48" height="56" rx="6" fill="#ffffff" stroke="#8a979e" stroke-width="2"/>
    <text x="540" y="102" font-family="${D}" font-size="32" font-weight="bold" fill="${y}" text-anchor="middle">n</text>
    <text x="256" y="152" font-family="${D}" font-size="22" fill="${x}">the first letter</text>

    <!-- Way 2: first letter + another letter -->
    <rect x="36" y="214" width="130" height="130" rx="12" fill="${T}" stroke="${E}" stroke-width="3"/>
    <text x="101" y="302" font-family="${D}" font-size="68" font-weight="bold" fill="${y}" text-anchor="middle">He</text>
    <path d="M 186 279 l 24 -14 l 0 28 z" fill="${b}"/>
    <line x1="208" y1="279" x2="236" y2="279" stroke="${b}" stroke-width="5" stroke-linecap="round"/>
    <rect x="256" y="242" width="48" height="56" rx="6" fill="${b}" stroke="#8a4209" stroke-width="2"/>
    <text x="280" y="282" font-family="${D}" font-size="32" font-weight="bold" fill="#ffffff" text-anchor="middle">H</text>
    <rect x="308" y="242" width="48" height="56" rx="6" fill="${b}" stroke="#8a4209" stroke-width="2"/>
    <text x="332" y="282" font-family="${D}" font-size="32" font-weight="bold" fill="#ffffff" text-anchor="middle">e</text>
    <rect x="360" y="242" width="48" height="56" rx="6" fill="#ffffff" stroke="#8a979e" stroke-width="2"/>
    <text x="384" y="282" font-family="${D}" font-size="32" font-weight="bold" fill="${y}" text-anchor="middle">l</text>
    <rect x="412" y="242" width="48" height="56" rx="6" fill="#ffffff" stroke="#8a979e" stroke-width="2"/>
    <text x="436" y="282" font-family="${D}" font-size="32" font-weight="bold" fill="${y}" text-anchor="middle">i</text>
    <rect x="464" y="242" width="48" height="56" rx="6" fill="#ffffff" stroke="#8a979e" stroke-width="2"/>
    <text x="488" y="282" font-family="${D}" font-size="32" font-weight="bold" fill="${y}" text-anchor="middle">u</text>
    <rect x="516" y="242" width="48" height="56" rx="6" fill="#ffffff" stroke="#8a979e" stroke-width="2"/>
    <text x="540" y="282" font-family="${D}" font-size="32" font-weight="bold" fill="${y}" text-anchor="middle">m</text>
    <text x="256" y="332" font-family="${D}" font-size="22" fill="${x}">the first letter + another letter</text>

    <!-- Way 3: another language -->
    <rect x="36" y="394" width="130" height="130" rx="12" fill="${C}" stroke="${w}" stroke-width="3"/>
    <text x="101" y="482" font-family="${D}" font-size="68" font-weight="bold" fill="${y}" text-anchor="middle">Na</text>
    <path d="M 186 459 l 24 -14 l 0 28 z" fill="${b}"/>
    <line x1="208" y1="459" x2="236" y2="459" stroke="${b}" stroke-width="5" stroke-linecap="round"/>
    <rect x="256" y="422" width="48" height="56" rx="6" fill="${b}" stroke="#8a4209" stroke-width="2"/>
    <text x="280" y="462" font-family="${D}" font-size="32" font-weight="bold" fill="#ffffff" text-anchor="middle">N</text>
    <rect x="308" y="422" width="48" height="56" rx="6" fill="${b}" stroke="#8a4209" stroke-width="2"/>
    <text x="332" y="462" font-family="${D}" font-size="32" font-weight="bold" fill="#ffffff" text-anchor="middle">a</text>
    <rect x="360" y="422" width="48" height="56" rx="6" fill="#ffffff" stroke="#8a979e" stroke-width="2"/>
    <text x="384" y="462" font-family="${D}" font-size="32" font-weight="bold" fill="${y}" text-anchor="middle">t</text>
    <rect x="412" y="422" width="48" height="56" rx="6" fill="#ffffff" stroke="#8a979e" stroke-width="2"/>
    <text x="436" y="462" font-family="${D}" font-size="32" font-weight="bold" fill="${y}" text-anchor="middle">r</text>
    <rect x="464" y="422" width="48" height="56" rx="6" fill="#ffffff" stroke="#8a979e" stroke-width="2"/>
    <text x="488" y="462" font-family="${D}" font-size="32" font-weight="bold" fill="${y}" text-anchor="middle">i</text>
    <rect x="516" y="422" width="48" height="56" rx="6" fill="#ffffff" stroke="#8a979e" stroke-width="2"/>
    <text x="540" y="462" font-family="${D}" font-size="32" font-weight="bold" fill="${y}" text-anchor="middle">u</text>
    <rect x="568" y="422" width="48" height="56" rx="6" fill="#ffffff" stroke="#8a979e" stroke-width="2"/>
    <text x="592" y="462" font-family="${D}" font-size="32" font-weight="bold" fill="${y}" text-anchor="middle">m</text>
    <text x="256" y="512" font-family="${D}" font-size="22" fill="${x}">its old Latin name: natrium</text>
  </svg>`,METAL_QUIZ:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1120 440" class="w-full h-full">
    ${O(1120,440)}

    <rect x="20" y="16" width="350" height="200" rx="12" fill="#ffffff" stroke="${S}" stroke-width="2"/>
    <image href="${s}" x="30" y="24" width="330" height="152" preserveAspectRatio="xMidYMid meet"/>
    <text x="195" y="204" font-family="${D}" font-size="24" font-weight="bold" fill="${y}" text-anchor="middle">Aluminium</text>

    <rect x="385" y="16" width="350" height="200" rx="12" fill="#ffffff" stroke="${S}" stroke-width="2"/>
    <image href="${c}" x="395" y="24" width="330" height="152" preserveAspectRatio="xMidYMid meet"/>
    <text x="560" y="204" font-family="${D}" font-size="24" font-weight="bold" fill="${y}" text-anchor="middle">Zinc</text>

    <rect x="750" y="16" width="350" height="200" rx="12" fill="#ffffff" stroke="${S}" stroke-width="2"/>
    <image href="${l}" x="760" y="24" width="330" height="152" preserveAspectRatio="xMidYMid meet"/>
    <text x="925" y="204" font-family="${D}" font-size="24" font-weight="bold" fill="${y}" text-anchor="middle">Lead</text>

    <rect x="20" y="226" width="350" height="200" rx="12" fill="#ffffff" stroke="${S}" stroke-width="2"/>
    <image href="${u}" x="30" y="234" width="330" height="152" preserveAspectRatio="xMidYMid meet"/>
    <text x="195" y="414" font-family="${D}" font-size="24" font-weight="bold" fill="${y}" text-anchor="middle">Copper</text>

    <rect x="385" y="226" width="350" height="200" rx="12" fill="#ffffff" stroke="${S}" stroke-width="2"/>
    <image href="${d}" x="395" y="234" width="330" height="152" preserveAspectRatio="xMidYMid meet"/>
    <text x="560" y="414" font-family="${D}" font-size="24" font-weight="bold" fill="${y}" text-anchor="middle">Iron</text>

    <rect x="750" y="226" width="350" height="200" rx="12" fill="#ffffff" stroke="${S}" stroke-width="2"/>
    <image href="${f}" x="760" y="234" width="330" height="152" preserveAspectRatio="xMidYMid meet"/>
    <text x="925" y="414" font-family="${D}" font-size="24" font-weight="bold" fill="${y}" text-anchor="middle">Bromine</text>
  </svg>`,ONE_KIND:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1120 440" class="w-full h-full">
    ${O(1120,440)}

    <rect x="20" y="16" width="350" height="408" rx="12" fill="#ffffff" stroke="${S}" stroke-width="2"/>
    <image href="${p}" x="30" y="26" width="330" height="300" preserveAspectRatio="xMidYMid meet"/>
    <text x="195" y="366" font-family="${D}" font-size="30" font-weight="bold" fill="${y}" text-anchor="middle">Carbon</text>
    <text x="195" y="402" font-family="${D}" font-size="22" fill="${x}" text-anchor="middle">graphite and diamond</text>

    <rect x="385" y="16" width="350" height="408" rx="12" fill="#ffffff" stroke="${S}" stroke-width="2"/>
    <image href="${m}" x="395" y="26" width="330" height="300" preserveAspectRatio="xMidYMid meet"/>
    <text x="560" y="366" font-family="${D}" font-size="30" font-weight="bold" fill="${y}" text-anchor="middle">Gold</text>
    <text x="560" y="402" font-family="${D}" font-size="22" fill="${x}" text-anchor="middle">only gold atoms</text>

    <rect x="750" y="16" width="350" height="408" rx="12" fill="#ffffff" stroke="${S}" stroke-width="2"/>
    <image href="${h}" x="760" y="26" width="330" height="300" preserveAspectRatio="xMidYMid meet"/>
    <text x="925" y="366" font-family="${D}" font-size="30" font-weight="bold" fill="${y}" text-anchor="middle">Silver</text>
    <text x="925" y="402" font-family="${D}" font-size="22" fill="${x}" text-anchor="middle">only silver atoms</text>
  </svg>`,JOINING_REAL:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1120 440" class="w-full h-full">
    ${O(1120,440)}

    <rect x="20" y="16" width="350" height="408" rx="12" fill="#ffffff" stroke="${S}" stroke-width="2"/>
    <image href="${g}" x="30" y="26" width="330" height="300" preserveAspectRatio="xMidYMid meet"/>
    <text x="195" y="366" font-family="${D}" font-size="30" font-weight="bold" fill="${y}" text-anchor="middle">Neon</text>
    <text x="195" y="402" font-family="${D}" font-size="22" fill="${x}" text-anchor="middle">a gas that glows</text>

    <rect x="385" y="16" width="350" height="408" rx="12" fill="#ffffff" stroke="${S}" stroke-width="2"/>
    <image href="${_}" x="395" y="26" width="330" height="300" preserveAspectRatio="xMidYMid meet"/>
    <text x="560" y="366" font-family="${D}" font-size="30" font-weight="bold" fill="${y}" text-anchor="middle">Oxygen</text>
    <text x="560" y="402" font-family="${D}" font-size="22" fill="${x}" text-anchor="middle">so cold it is a liquid</text>

    <rect x="750" y="16" width="350" height="408" rx="12" fill="#ffffff" stroke="${S}" stroke-width="2"/>
    <image href="${v}" x="760" y="26" width="330" height="300" preserveAspectRatio="xMidYMid meet"/>
    <text x="925" y="366" font-family="${D}" font-size="30" font-weight="bold" fill="${y}" text-anchor="middle">Sulfur</text>
    <text x="925" y="402" font-family="${D}" font-size="22" fill="${x}" text-anchor="middle">a yellow solid</text>
  </svg>`},I=`/assets/democritus-DTiX9jFU.jpg`,L=`/assets/stm-BbEqQ8hw.jpg`,R=`/assets/nanotube-Bxf8cHsG.jpg`,z=`/assets/ptwall-Buu9lohm.jpg`,B=`#0087a8`,V=`#5c2483`,H=`#c25e12`,U={meta:{course:`y7-science`,unit:`2.5`,id:`U02_5`,title:`Atoms, Elements and the Periodic Table`,objective:`Explain what an atom and an element are, describe how atoms join together, find periods, groups, metals and non-metals in the first 20 elements of the Periodic Table, and write element symbols correctly.`,order:11,french:!0,dashboard:{track:`Y7_SCI`,unit:`U02_5`}},slides:[{layout:`hero`,color:B,icon:`Atom`,brand:`Year 7 Science`,brandVn:`Khoa học Lớp 7`,brandFr:`Sciences 7e année`,date:`15 Sep 2026`,eyebrow:`2.5 Atoms, elements and the Periodic Table`,eyebrowVn:`2.5 Nguyên tử, nguyên tố và Bảng tuần hoàn`,eyebrowFr:`2.5 Atomes, éléments et tableau périodique`,title:`Atoms & Elements`,titleVn:`Nguyên tử & Nguyên tố`,titleFr:`Atomes & éléments`,card:{icon:`Pencil`,badge:`Starter`,badgeVn:`Khởi động`,badgeFr:`Pour commencer`,text:`Draw the particles in a **solid**. What must you do to a solid to make it **melt**?`,textVn:`Vẽ các hạt trong **chất rắn**. Em phải làm gì để chất rắn **nóng chảy**?`,textFr:`Dessine les particules d’un **solide**. Que dois-tu faire à un solide pour qu’il **fonde**\xA0?`}},{layout:`statement`,accent:V,icon:`HelpCircle`,eyebrow:`Think, then vote`,eyebrowVn:`Suy nghĩ, rồi biểu quyết`,eyebrowFr:`Réfléchis, puis vote`,title:`Can You Cut Forever?`,titleVn:`Có cắt mãi được không?`,titleFr:`Peut-on couper sans fin\xA0?`,text:`Mr Bowen cuts a piece of gold in half. Then in half again. And again.`,textVn:`Thầy Bowen cắt đôi một miếng vàng. Rồi lại cắt đôi. Cứ thế mãi.`,textFr:`M. Bowen coupe un morceau d’or en deux. Puis encore en deux. Et encore.`,sub:`Can he keep cutting **forever**? Yes or no?`,subVn:`Thầy có thể cắt **mãi mãi** không? Có hay không?`,subFr:`Peut-il couper **sans fin**\xA0? Oui ou non\xA0?`},{layout:`split`,accent:B,icon:`Atom`,eyebrow:`Greece, over 2000 years ago`,eyebrowVn:`Hy Lạp, hơn 2000 năm trước`,eyebrowFr:`Grèce, il y a plus de 2000 ans`,title:`Democritus Said No`,titleVn:`Democritus nói: Không`,titleFr:`Democritus a dit non`,ratio:55,image:I,content:`Keep cutting, and you reach a piece that **cannot be cut**.`,contentVn:`Cứ cắt mãi, em sẽ đến một mẩu **không thể cắt** được nữa.`,contentFr:`Continue à couper, et tu arrives à un morceau qu’on **ne peut pas couper**.`,notes:[{tone:`write`,text:`**Atom:** a tiny piece of matter. Everything is made of atoms.
"Atom" means "cannot be divided".`,textVn:`**Nguyên tử (atom):** một mẩu vật chất rất nhỏ. Mọi thứ đều được tạo nên từ nguyên tử.
"Atom" nghĩa là "không thể chia nhỏ".`,textFr:`**Atome (atom)\xA0:** un tout petit morceau de matière. Tout est fait d’atomes.
«\xA0Atom\xA0» veut dire «\xA0qu’on ne peut pas diviser\xA0».`}]},{layout:`statement`,accent:V,icon:`HelpCircle`,eyebrow:`Guess first`,eyebrowVn:`Đoán trước`,eyebrowFr:`Devine d’abord`,title:`How Many Cuts?`,titleVn:`Bao nhiêu lần cắt?`,titleFr:`Combien de coupes\xA0?`,text:`Mr Bowen's gold cube is **1 cm** wide. He cuts it in half, again and again.`,textVn:`Khối vàng của thầy Bowen rộng **1 cm**. Thầy cắt đôi nó, hết lần này đến lần khác.`,textFr:`Le cube d’or de M. Bowen fait **1 cm** de large. Il le coupe en deux, encore et encore.`,sub:`How many cuts until it is just **one atom** wide?`,subVn:`Cắt bao nhiêu lần thì nó chỉ còn rộng **một nguyên tử**?`,subFr:`Combien de coupes pour qu’il fasse **un atome** de large\xA0?`},{layout:`showcase`,accent:H,icon:`Target`,eyebrow:`Count out loud`,eyebrowVn:`Đếm to lên`,eyebrowFr:`Compte à voix haute`,title:`Half, and Half Again`,titleVn:`Một nửa, rồi lại một nửa`,titleFr:`La moitié, puis encore la moitié`,widget:a,caption:`Say the number with every cut. Was your guess close?`,captionVn:`Đọc to con số sau mỗi lần cắt. Em đoán có gần đúng không?`,captionFr:`Dis le nombre à chaque coupe. Ton estimation était-elle proche\xA0?`},{layout:`compare`,accent:B,icon:`Microscope`,eyebrow:`Today we can see atoms`,eyebrowVn:`Ngày nay ta có thể nhìn thấy nguyên tử`,eyebrowFr:`Aujourd’hui, on peut voir les atomes`,title:`Atoms Are Real`,titleVn:`Nguyên tử là có thật`,titleFr:`Les atomes existent`,columns:[{heading:`Real gold atoms`,headingVn:`Nguyên tử vàng thật`,headingFr:`De vrais atomes d’or`,accent:B,image:L,caption:`Each tiny bright dot is one atom. Seen with a **scanning tunnelling microscope**.`,captionVn:`Mỗi chấm sáng nhỏ là một nguyên tử. Chụp bằng **kính hiển vi quét xuyên hầm**.`,captionFr:`Chaque petit point brillant est un atome. Vu avec un **microscope à effet tunnel**.`},{heading:`A model of a nanotube`,headingVn:`Mô hình ống nano`,headingFr:`Un modèle de nanotube`,accent:B,image:R,notes:[{tone:`write`,text:`**Nanotube:** a very, very small tube made of carbon atoms.
"Nano" means "very, very small".`,textVn:`**Ống nano (nanotube):** một ống rất, rất nhỏ tạo nên từ nguyên tử cacbon.
"Nano" nghĩa là "rất, rất nhỏ".`,textFr:`**Nanotube\xA0:** un tube tout, tout petit, fait d’atomes de carbone.
«\xA0Nano\xA0» veut dire «\xA0tout, tout petit\xA0».`}]}]},{layout:`showcase`,accent:B,icon:`Boxes`,eyebrow:`Look closely`,eyebrowVn:`Nhìn kỹ nhé`,eyebrowFr:`Regarde bien`,title:`Only One Kind of Atom`,titleVn:`Chỉ một loại nguyên tử`,titleFr:`Une seule sorte d’atome`,inlineSvg:F.ONE_KIND,caption:`Each is made of **only one kind** of atom. Graphite and diamond are **both** just carbon!`,captionVn:`Mỗi chất chỉ gồm **một loại** nguyên tử. Than chì và kim cương **đều** chỉ là cacbon! (vàng = gold, bạc = silver)`,captionFr:`Chacun est fait d’**une seule sorte** d’atome. Le graphite et le diamant sont **tous les deux** du carbone\xA0! (or = gold, argent = silver)`},{layout:`split`,accent:B,icon:`Atom`,eyebrow:`Key word`,eyebrowVn:`Từ khóa`,eyebrowFr:`Mot clé`,title:`Element`,titleVn:`Nguyên tố`,titleFr:`Élément`,ratio:40,inlineSvg:F.SILVER_ZOOM,content:`Carbon, gold and silver are all **elements**.

Each kind of atom has different **properties**. So each element does too.`,contentVn:`Cacbon, vàng và bạc đều là **nguyên tố**.

Mỗi loại nguyên tử có **tính chất** khác nhau. Vì vậy mỗi nguyên tố cũng vậy.`,contentFr:`Le carbone, l’or et l’argent sont tous des **éléments**.

Chaque sorte d’atome a des **propriétés** différentes. Donc chaque élément aussi.`,notes:[{tone:`write`,text:`**Element:** a substance made of only one kind of atom.`,textVn:`**Nguyên tố (element):** một chất chỉ được tạo nên từ một loại nguyên tử.`,textFr:`**Élément (element)\xA0:** une substance faite d’une seule sorte d’atome.`}]},{layout:`statement`,accent:V,eyebrow:`Think`,eyebrowVn:`Suy nghĩ`,eyebrowFr:`Pense`,title:`How Many Elements?`,titleVn:`Có bao nhiêu nguyên tố?`,titleFr:`Combien d’éléments\xA0?`,text:`Scientists have found **94** kinds of atom in nature.`,textVn:`Có **94** loại nguyên tử trong tự nhiên.`,textFr:`On a trouvé **94** sortes d’atomes dans la nature.`,sub:`So how many natural elements are there?`,subVn:`Vậy có bao nhiêu nguyên tố tự nhiên?`,subFr:`Alors, combien d’éléments naturels\xA0?`,reveal:{label:`Answer`,labelVn:`Đáp án`,labelFr:`Voir`,answer:`**94**, one for each kind of atom. Scientists have **made 24 more** in laboratories.`,answerVn:`**94**, mỗi loại nguyên tử là một nguyên tố. Các nhà khoa học **tạo thêm 24** nguyên tố trong phòng thí nghiệm.`,answerFr:`**94**, un par sorte d’atome. On en a **fabriqué 24 de plus** en laboratoire.`}},{layout:`showcase`,accent:H,icon:`Pencil`,eyebrow:`Draw all four, with labels`,eyebrowVn:`Vẽ cả bốn, có ghi chú`,eyebrowFr:`Dessine les quatre, avec les légendes`,title:`How Atoms Join Together`,titleVn:`Các nguyên tử liên kết như thế nào`,titleFr:`Comment les atomes s’assemblent`,inlineSvg:F.JOINING,drawThis:!0,caption:`Six elements, like neon: atoms alone. **Most**, like gold: packed close. **A few**: small particles.`,captionVn:`Sáu nguyên tố, như neon: nguyên tử đứng riêng. **Hầu hết**, như vàng: xếp sát nhau. **Một số ít**: hạt nhỏ.`,captionFr:`Six éléments, comme le néon\xA0: des atomes seuls. **La plupart**, comme l’or\xA0: serrés. **Quelques-uns**\xA0: de petites particules.`},{layout:`showcase`,accent:B,icon:`ScanEye`,eyebrow:`The drawings, for real`,eyebrowVn:`Hình vẽ, ngoài đời thật`,eyebrowFr:`Les dessins, en vrai`,title:`Neon, Oxygen, Sulfur`,titleVn:`Neon, Oxi, Lưu huỳnh`,titleFr:`Néon, oxygène, soufre`,inlineSvg:F.JOINING_REAL,caption:`Neon: atoms **alone**. Oxygen: particles of **2 atoms**. Sulfur: particles of **8 atoms**.`,captionVn:`Neon: nguyên tử **riêng lẻ**. Oxi: hạt gồm **2 nguyên tử**. Lưu huỳnh: hạt gồm **8 nguyên tử**.`,captionFr:`Néon\xA0: des atomes **seuls**. Oxygène\xA0: des particules de **2 atomes**. Soufre\xA0: des particules de **8 atomes**.`},{layout:`split`,accent:B,icon:`LayoutGrid`,eyebrow:`Key word`,eyebrowVn:`Từ khóa`,eyebrowFr:`Mot clé`,title:`The Periodic Table`,titleVn:`Bảng tuần hoàn`,titleFr:`Le tableau périodique`,ratio:45,image:z,content:`All **118** elements: 94 natural, 24 made by scientists.

Is there one on our lab wall? Today we learn the **first 20**.`,contentVn:`Tất cả **118** nguyên tố: 94 tự nhiên, 24 do nhà khoa học tạo ra.

Phòng thí nghiệm của mình có treo bảng này không? Hôm nay ta học **20 nguyên tố đầu tiên**.`,contentFr:`Les **118** éléments\xA0: 94 naturels, 24 fabriqués par les scientifiques.

Y en a-t-il un au mur de notre labo\xA0? Aujourd’hui, on apprend les **20 premiers**.`,notes:[{tone:`write`,text:`**The Periodic Table:** a way of arranging all the elements.`,textVn:`**Bảng tuần hoàn (The Periodic Table):** một cách sắp xếp tất cả các nguyên tố.`,textFr:`**Le tableau périodique (The Periodic Table)\xA0:** une façon de ranger tous les éléments.`}]},{layout:`showcase`,accent:B,icon:`Grid3x3`,eyebrow:`The first 20 elements`,eyebrowVn:`20 nguyên tố đầu tiên`,eyebrowFr:`Les 20 premiers éléments`,title:`Rows and Columns`,titleVn:`Hàng và cột`,titleFr:`Lignes et colonnes`,widget:r,caption:`A **row** goes across →     A **column** goes down ↓`,captionVn:`Một **hàng** đi ngang →     Một **cột** đi xuống ↓`,captionFr:`Une **ligne** va en travers →     Une **colonne** descend ↓`},{layout:`showcase`,accent:V,icon:`MessageSquare`,eyebrow:`English check`,eyebrowVn:`Kiểm tra tiếng Anh`,eyebrowFr:`Point d’anglais`,title:`Words With Two Meanings`,titleVn:`Từ có hai nghĩa`,titleFr:`Des mots à deux sens`,inlineSvg:F.TWO_MEANINGS,caption:`Same word. A different meaning in science.`,captionVn:`Cùng một từ, nghĩa khác trong khoa học: **table** = bảng, **period** = chu kì, **group** = nhóm.`,captionFr:`Même mot, autre sens en sciences\xA0: **table** = tableau, **period** = période, **group** = groupe.`},{layout:`callout`,accent:H,icon:`Pencil`,eyebrow:`Key words`,eyebrowVn:`Từ khóa`,eyebrowFr:`Mots clés`,title:`Periods and Groups`,titleVn:`Chu kì và nhóm`,titleFr:`Périodes et groupes`,content:`Book page 54: put your finger on a **period**. Now on a **group**.`,contentVn:`Sách trang 54: đặt ngón tay lên một **chu kì**. Giờ lên một **nhóm**.`,contentFr:`Livre page 54\xA0: pose ton doigt sur une **période**. Puis sur un **groupe**.`,notes:[{tone:`write`,text:`**Period:** a row in the Periodic Table.
**Group:** a column in the Periodic Table.`,textVn:`**Chu kì (period):** một hàng trong Bảng tuần hoàn.
**Nhóm (group):** một cột trong Bảng tuần hoàn.`,textFr:`**Période (period)\xA0:** une ligne du tableau périodique.
**Groupe (group)\xA0:** une colonne du tableau périodique.`}]},{layout:`showcase`,accent:B,icon:`Scale`,eyebrow:`Read it like a page of English`,eyebrowVn:`Đọc như đọc một trang tiếng Anh`,eyebrowFr:`Lis-le comme une page en anglais`,title:`Lightest to Heaviest`,titleVn:`Từ nhẹ nhất đến nặng nhất`,titleFr:`Du plus léger au plus lourd`,widget:t,caption:`Left to right, then the next row. The atoms get **heavier**. Say each name.`,captionVn:`Từ trái sang phải, rồi xuống hàng tiếp. Nguyên tử **nặng dần**. Đọc to từng tên.`,captionFr:`De gauche à droite, puis la ligne suivante. Les atomes sont de plus en plus **lourds**. Dis chaque nom.`},{layout:`showcase`,accent:B,icon:`Layers`,eyebrow:`Look at the colours`,eyebrowVn:`Nhìn màu sắc`,eyebrowFr:`Regarde les couleurs`,title:`Metals and Non-metals`,titleVn:`Kim loại và phi kim`,titleFr:`Métaux et non-métaux`,widget:e,caption:`The table puts **similar** elements **close together**.`,captionVn:`Bảng xếp các nguyên tố **giống nhau** ở **gần nhau**.`,captionFr:`Le tableau met les éléments **semblables** **près les uns des autres**.`},{layout:`showcase`,accent:V,icon:`HelpCircle`,eyebrow:`Book page 54`,eyebrowVn:`Sách trang 54`,eyebrowFr:`Livre page 54`,title:`Metal or Non-metal?`,titleVn:`Kim loại hay phi kim?`,titleFr:`Métal ou non-métal\xA0?`,inlineSvg:F.METAL_QUIZ,caption:`Five of these are metals. **One is not.** Which one?`,captionVn:`Năm chất là kim loại. **Một chất thì không.** Chất nào?`,captionFr:`Cinq sont des métaux. **Un ne l’est pas.** Lequel\xA0?`},{layout:`callout`,accent:H,icon:`Pencil`,eyebrow:`Key word`,eyebrowVn:`Từ khóa`,eyebrowFr:`Mot clé`,title:`Metals`,titleVn:`Kim loại`,titleFr:`Les métaux`,notes:[{tone:`write`,text:`**Metals:** elements like iron, copper and aluminium.
In the Periodic Table, metals are yellow. Non-metals are blue.`,textVn:`**Kim loại (metals):** các nguyên tố như sắt, đồng và nhôm.
Trong Bảng tuần hoàn, kim loại màu vàng. Phi kim màu xanh.`,textFr:`**Métaux (metals)\xA0:** des éléments comme le fer, le cuivre et l’aluminium.
Dans le tableau périodique, les métaux sont en jaune. Les non-métaux sont en bleu.`}],reveal:{label:`Which one was not a metal?`,labelVn:`Chất nào không phải kim loại?`,labelFr:`Lequel n’était pas un métal\xA0?`,answer:`**Bromine.** It is a non-metal — and a liquid!`,answerVn:`**Brom (bromine).** Nó là phi kim — và là chất lỏng!`,answerFr:`**Le brome (bromine).** C’est un non-métal — et un liquide\xA0!`}},{layout:`statement`,accent:V,icon:`HelpCircle`,eyebrow:`Think`,eyebrowVn:`Suy nghĩ`,eyebrowFr:`Réfléchis`,title:`Why Na?`,titleVn:`Tại sao là Na?`,titleFr:`Pourquoi Na\xA0?`,text:`The symbol for **sodium** is **Na**.`,textVn:`Kí hiệu của **sodium** (natri) là **Na**.`,textFr:`Le symbole du **sodium** est **Na**.`,sub:`Sodium starts with **S**. So where does **Na** come from?`,subVn:`Sodium bắt đầu bằng chữ **S**. Vậy **Na** từ đâu ra?`,subFr:`Sodium commence par **S**. Alors d’où vient **Na**\xA0?`},{layout:`split`,accent:B,icon:`PenLine`,eyebrow:`Three ways to make a symbol`,eyebrowVn:`Ba cách tạo kí hiệu`,eyebrowFr:`Trois façons de faire un symbole`,title:`Chemical Symbols`,titleVn:`Kí hiệu hóa học`,titleFr:`Symboles chimiques`,ratio:40,inlineSvg:F.SYMBOL_WAYS,content:`**Na** comes from **natrium**, the old Latin name for sodium.`,contentVn:`**Na** đến từ **natrium**, tên La-tinh cổ của sodium.`,contentFr:`**Na** vient de **natrium**, l’ancien nom latin du sodium.`,notes:[{tone:`write`,text:`**Symbol:** a short way to write the name of an element.
The first letter is always a capital (upper case). The second is always small (lower case).`,textVn:`**Kí hiệu (symbol):** cách viết ngắn gọn tên của một nguyên tố.
Chữ cái đầu luôn viết hoa. Chữ cái thứ hai luôn viết thường.`,textFr:`**Symbole (symbol)\xA0:** une façon courte d’écrire le nom d’un élément.
La première lettre est toujours une majuscule. La deuxième est toujours une minuscule.`}]},{layout:`statement`,accent:V,eyebrow:`Spot the difference`,eyebrowVn:`Tìm điểm khác nhau`,eyebrowFr:`Trouve la différence`,title:`Capitals Matter`,titleVn:`Chữ hoa rất quan trọng`,titleFr:`Les majuscules comptent`,text:`**Co** and **CO** look almost the same.`,textVn:`**Co** và **CO** trông gần giống nhau.`,textFr:`**Co** et **CO** se ressemblent beaucoup.`,sub:`How are they different?`,subVn:`Chúng khác nhau thế nào?`,subFr:`En quoi sont-ils différents\xA0?`,reveal:{label:`Answer`,labelVn:`Đáp án`,labelFr:`Réponse`,answer:`**Co** is one element: cobalt, a metal.
**CO** is two elements: **C** (carbon) and **O** (oxygen).`,answerVn:`**Co** là một nguyên tố: coban, một kim loại.
**CO** là hai nguyên tố: **C** (cacbon) và **O** (oxi).`,answerFr:`**Co** est un seul élément\xA0: le cobalt, un métal.
**CO**, ce sont deux éléments\xA0: **C** (carbone) et **O** (oxygène).`}},{layout:`game`,title:`Symbol Snap`,titleVn:`Đoán nhanh kí hiệu`,titleFr:`Symboles éclair`,widget:n},{layout:`callout`,accent:V,icon:`HelpCircle`,eyebrow:`Learner's Book, page 53`,eyebrowVn:`Sách học sinh, trang 53`,eyebrowFr:`Manuel de l’élève, page 53`,title:`Questions 1–2`,titleVn:`Câu hỏi 1–2`,titleFr:`Questions 1–2`,content:`> **1.** What are atoms?
> **2.** There are 94 kinds of natural atom. How many natural elements are there?`,contentVn:`> **1.** Nguyên tử là gì?
> **2.** Có 94 loại nguyên tử tự nhiên. Có bao nhiêu nguyên tố tự nhiên?`,contentFr:`> **1.** Que sont les atomes\xA0?
> **2.** Il existe 94 sortes d’atomes naturels. Combien y a-t-il d’éléments naturels\xA0?`,reveal:{label:`Check`,labelVn:`Kiểm tra`,labelFr:`Vérifie`,answer:`**1.** Tiny pieces of matter. Everything is made of atoms.
**2.** 94.`,answerVn:`**1.** Những mẩu vật chất rất nhỏ. Mọi thứ đều được tạo nên từ nguyên tử.
**2.** 94.`,answerFr:`**1.** De tout petits morceaux de matière. Tout est fait d’atomes.
**2.** 94.`}},{layout:`split`,accent:V,icon:`HelpCircle`,eyebrow:`Learner's Book, page 55`,eyebrowVn:`Sách học sinh, trang 55`,eyebrowFr:`Manuel de l’élève, page 55`,title:`Questions 3–4`,titleVn:`Câu hỏi 3–4`,titleFr:`Questions 3–4`,ratio:40,widget:i,content:`> **3.** Name the elements with the symbols Mg, Be, Li and N.
> **4.** Find the symbols for aluminium, boron, fluorine and potassium.`,contentVn:`> **3.** Gọi tên các nguyên tố có kí hiệu Mg, Be, Li và N.
> **4.** Tìm kí hiệu của aluminium, boron, fluorine và potassium.`,contentFr:`> **3.** Nomme les éléments de symboles Mg, Be, Li et N.
> **4.** Trouve le symbole de\xA0: aluminium, boron, fluorine et potassium.`,reveal:{label:`Check`,labelVn:`Kiểm tra`,labelFr:`Vérifie`,answer:`**3.** magnesium, beryllium, lithium, nitrogen
**4.** Al, B, F, K`,answerVn:`**3.** magnesium, beryllium, lithium, nitrogen
**4.** Al, B, F, K`,answerFr:`**3.** magnesium, beryllium, lithium, nitrogen
**4.** Al, B, F, K`}},{layout:`split`,accent:V,icon:`HelpCircle`,eyebrow:`Learner's Book, page 55`,eyebrowVn:`Sách học sinh, trang 55`,eyebrowFr:`Manuel de l’élève, page 55`,title:`Questions 5–6`,titleVn:`Câu hỏi 5–6`,titleFr:`Questions 5–6`,ratio:40,widget:t,content:`> **5.** Which element has atoms with the smallest mass?
> **6.** Of the first 20 elements, which has atoms with the greatest mass?`,contentVn:`> **5.** Nguyên tố nào có nguyên tử khối lượng nhỏ nhất?
> **6.** Trong 20 nguyên tố đầu tiên, nguyên tố nào có nguyên tử khối lượng lớn nhất?`,contentFr:`> **5.** Quel élément a les atomes de plus petite masse\xA0?
> **6.** Parmi les 20 premiers éléments, lequel a les atomes de plus grande masse\xA0?`,reveal:{label:`Check`,labelVn:`Kiểm tra`,labelFr:`Vérifie`,answer:`**5.** hydrogen
**6.** calcium`,answerVn:`**5.** hydrogen
**6.** calcium`,answerFr:`**5.** hydrogen
**6.** calcium`}},{layout:`split`,accent:V,icon:`HelpCircle`,eyebrow:`Learner's Book, page 55`,eyebrowVn:`Sách học sinh, trang 55`,eyebrowFr:`Manuel de l’élève, page 55`,title:`Questions 7–8`,titleVn:`Câu hỏi 7–8`,titleFr:`Questions 7–8`,ratio:40,widget:i,content:`> **7.** Give the **names** of two elements in the same period as magnesium.
> **8.** Give the **symbols** of two elements in the same group as helium.`,contentVn:`> **7.** Viết **tên** hai nguyên tố cùng chu kì với magnesium.
> **8.** Viết **kí hiệu** hai nguyên tố cùng nhóm với helium.`,contentFr:`> **7.** Donne les **noms** de deux éléments de la même période que magnesium.
> **8.** Donne les **symboles** de deux éléments du même groupe que helium.`,reveal:{label:`Check`,labelVn:`Kiểm tra`,labelFr:`Vérifie`,answer:`**7.** Any two: sodium, aluminium, silicon, phosphorus, sulfur, chlorine, argon
**8.** Ne and Ar`,answerVn:`**7.** Hai trong số: sodium, aluminium, silicon, phosphorus, sulfur, chlorine, argon
**8.** Ne và Ar`,answerFr:`**7.** Deux parmi\xA0: sodium, aluminium, silicon, phosphorus, sulfur, chlorine, argon
**8.** Ne et Ar`}},{layout:`stack`,variant:`checklist`,accent:B,icon:`CheckCircle2`,columns:2,eyebrow:`Before you leave`,eyebrowVn:`Trước khi ra về`,eyebrowFr:`Avant de partir`,title:`Can You Do These?`,titleVn:`Em làm được chưa?`,titleFr:`Sais-tu faire ceci\xA0?`,content:`> Check your notebook: **8 key words** and **1 drawing**.`,contentVn:`> Kiểm tra vở: **8 từ khóa** và **1 hình vẽ**.`,contentFr:`> Vérifie ton cahier\xA0: **8 mots clés** et **1 dessin**.`,items:[{text:`Explain what an **atom** and an **element** are.`,textVn:`Giải thích **nguyên tử** và **nguyên tố** là gì.`,textFr:`Explique ce que sont un **atome** et un **élément**.`},{text:`Name **20 elements** and their symbols.`,textVn:`Gọi tên **20 nguyên tố** và kí hiệu của chúng.`,textFr:`Nomme **20 éléments** et leurs symboles.`},{text:`Use **symbols** to write elements.`,textVn:`Dùng **kí hiệu** để viết các nguyên tố.`,textFr:`Utilise les **symboles** pour écrire les éléments.`},{text:`Describe the **Periodic Table**.`,textVn:`Mô tả **Bảng tuần hoàn**.`,textFr:`Décris le **tableau périodique**.`}]},{layout:`hero`,color:B,icon:`CheckCircle2`,brand:`Year 7 Science`,brandVn:`Khoa học Lớp 7`,brandFr:`Sciences 7e année`,title:`Lesson Complete!`,titleVn:`Hoàn thành bài học!`,titleFr:`Leçon terminée\xA0!`,subtitle:`Exit question: write the symbols for **carbon**, **calcium** and **chlorine**.`,subtitleVn:`Câu hỏi ra về: viết kí hiệu của **carbon**, **calcium** và **chlorine**.`,subtitleFr:`Question de sortie\xA0: écris les symboles de **carbon**, **calcium** et **chlorine**.`}],plan:{duration:`50 minutes`,objective:`Students can explain what an atom and an element are; describe how atoms join together in neon, gold, oxygen and sulfur; find periods, groups, metals and non-metals in the first 20 elements of the Periodic Table; and write element symbols with the capital-letter rule.`,materials:[`Projector / TV for the lesson deck`,`Learner’s Book (Unit 2.5, pages 51–56)`,`Student science notebooks; yellow and blue pencils are nice for the table but optional`,`Mini whiteboards or scrap paper for Symbol Snap`],vocab:[{term:`Atom`,def:`a tiny piece of matter; everything is made of atoms. "Atom" means "cannot be divided"`},{term:`Nanotube`,def:`a very, very small tube made of carbon atoms. "Nano" means "very, very small"`},{term:`Element`,def:`a substance made of only one kind of atom`},{term:`The Periodic Table`,def:`a way of arranging all the elements`},{term:`Period`,def:`a row in the Periodic Table (in everyday English, a lesson — say so)`},{term:`Group`,def:`a column in the Periodic Table (in everyday English, people together — say so)`},{term:`Metals`,def:`elements like iron, copper and aluminium; yellow boxes in the book’s table`},{term:`Symbol`,def:`a short way to write the name of an element; first letter a capital, second letter small`}],timeline:[{time:`0–4 min`,phase:`Starter`,detail:`Slide 1, the book’s Getting Started: draw the particles in a solid; what must you do to make it melt? (Heat it.) Two hands up.`},{time:`4–10 min`,phase:`Can you cut forever?`,detail:`Slide 2: vote yes or no, no discussion of the answer. Slide 3: Democritus said no; copy ATOM. Slide 4: guess how many halvings from 1 cm to one atom. Write several guesses on the board.`},{time:`10–13 min`,phase:`The halving counter`,detail:`Slide 5: press Cut in half while the class counts aloud. Pause at sand (3), hair (7), cell (9, the 0.02 mm cell from 1.1), virus (17). It lands on one gold atom at 25. Compare with the board.`},{time:`13–20 min`,phase:`Atoms are real; elements`,detail:`Slide 6: real gold atoms and a nanotube; copy NANOTUBE. Slide 7: carbon, gold, silver (graphite and diamond are both carbon). Slide 8: silver zoom; copy ELEMENT. Slide 9: 94 kinds of atom, so 94 natural elements (+24 made = 118).`},{time:`20–26 min`,phase:`Draw This: atoms joining`,detail:`Slide 10: draw all four panels with labels, about 4 minutes. Slide 11 (neon, oxygen, sulfur photos) while the last ones finish.`},{time:`26–33 min`,phase:`The Periodic Table`,detail:`Slide 12: copy THE PERIODIC TABLE; is one on our wall? Slide 13: press Next row, then Next column. Slide 14: table, period and group have everyday meanings; make the class say both. Slide 15: fingers on the book table; copy PERIOD and GROUP.`},{time:`33–38 min`,phase:`Mass order and metals`,detail:`Slide 16: press Next atom; the class reads each element name aloud (pronunciation practice). Slide 17: metals, then non-metals. Slide 18: which photo is not a metal? Slide 19: copy METALS, then reveal bromine.`},{time:`38–42 min`,phase:`Symbols`,detail:`Slide 20: why is sodium Na? Take guesses, no answer. Slide 21: the three ways; copy SYMBOL with the capital rule. Slide 22: Co or CO?`},{time:`42–46 min`,phase:`Symbol Snap`,detail:`Slide 23: a name appears, everyone writes the symbol, then Show. Aim for 10–12 cards; use Show symbols instead for the last few. This is the book’s Activity, played from the front.`},{time:`46–50 min`,phase:`Questions and exit`,detail:`Slides 24–27: Questions 1–8, two per slide; start in class, finish for homework. The table on 25 and 27 can be tapped to check answers (tap Mg for Q7, He for Q8). Slide 28: checklist, 8 key words + 1 drawing. Slide 29: exit question.`}],answers:[{q:`Slide 5 — halving`,a:`10 mm halved 25 times = 0.0000003 mm, about one gold atom (0.00000029 mm). On the way: 3 = 1.25 mm (sand), 7 = 0.078 mm (hair), 9 = 0.02 mm (a cell), 13 = 0.0012 mm (bacterium), 17 = 0.000076 mm (virus).`},{q:`Slide 18 — metal or non-metal`,a:`Bromine is the non-metal (a red-brown liquid). Aluminium, zinc, lead, copper and iron are metals.`},{q:`Slide 22 — Co or CO`,a:`Co is one element, cobalt (a metal). CO is two elements joined, carbon and oxygen (carbon monoxide; no need to name it).`},{q:`Q1`,a:`Tiny pieces of matter; everything is made of atoms. ("Atom" means "cannot be divided".)`},{q:`Q2`,a:`94.`},{q:`Q3`,a:`Mg magnesium, Be beryllium, Li lithium, N nitrogen.`},{q:`Q4`,a:`Aluminium Al, boron B, fluorine F, potassium K.`},{q:`Q5`,a:`Hydrogen.`},{q:`Q6`,a:`Calcium.`},{q:`Q7`,a:`Any two of: sodium, aluminium, silicon, phosphorus, sulfur, chlorine, argon.`},{q:`Q8`,a:`Ne and Ar.`},{q:`Exit question`,a:`C, Ca, Cl. All three start with C, so the small second letter is what tells them apart.`}],notes:`The notebook count is the book’s own Key words box: atom, element, group, metals, nanotube, period, symbol, The Periodic Table (8), plus the joining drawing (1). Mass order: the book says atoms get heavier across each period, and slide 16 follows it. Strictly, argon atoms are slightly heavier than potassium atoms, because the table is really ordered by atomic number. That comes later; do not raise it unless a student spots it. In the book’s table hydrogen floats above the middle and is in no group, and the widget draws it the same way, so Q8 has only Ne and Ar. Book Activity (p.56): students make their own name and symbol card game. Symbol Snap models one; card-making can go home if there is no time. Symbol Snap: a clicker’s Right arrow shows the answer, then moves on. Leave the game with the deck’s Back or Continue buttons.`}};export{U as default};