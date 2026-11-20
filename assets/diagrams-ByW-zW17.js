var e=`/assets/pizza-BUwhY50e.jpg`,t=`#2b2b2b`,n=`#c25e12`,r=`#5b6770`,i=`#cfd8dc`,a=`#0087a8`,o=`#4a8b23`,s=`#c8102e`,c=`#1a5fa8`,l=`#6cbfd4`,u=`Inter, 'Segoe UI', system-ui, sans-serif`,d=e=>Math.round(e*10)/10,f=(e,t)=>`<rect x="0" y="0" width="${e}" height="${t}" rx="14" fill="#ffffff"/>
    <rect x="0.75" y="0.75" width="${e-1.5}" height="${t-1.5}" rx="13" fill="none" stroke="#e2e8f0" stroke-width="1.5"/>`,p=(e,n,r,i=t,a=5)=>`<line x1="${d(e-r/2)}" y1="${n}" x2="${d(e+r/2)}" y2="${n}" stroke="${i}" stroke-width="${a}" stroke-linecap="round"/>`,m=(e,n,r,i,a,o,s=l,c=4)=>{let u=r/a,f=``;for(let t=0;t<a;t+=1)f+=`<rect x="${d(e+t*u)}" y="${n}" width="${d(u)}" height="${i}" fill="${t<o?s:`#ffffff`}"/>`;for(let r=1;r<a;r+=1)f+=`<line x1="${d(e+r*u)}" y1="${n}" x2="${d(e+r*u)}" y2="${n+i}" stroke="${t}" stroke-width="${c*.75}"/>`;return f+`<rect x="${e}" y="${n}" width="${r}" height="${i}" fill="none" stroke="${t}" stroke-width="${c}"/>`},h=(e,n,r,i,a,o)=>{let s=``,c=e;return a.forEach((e,a)=>{s+=`<rect x="${d(c)}" y="${n}" width="${d(e*r)}" height="${i}" fill="${a<o?l:`#ffffff`}" stroke="${t}" stroke-width="3"/>`,c+=e*r}),s+`<rect x="${e}" y="${n}" width="${r}" height="${i}" fill="none" stroke="${t}" stroke-width="4"/>`},g=e=>e*Math.PI/180,_=(e,t,n,r)=>`${d(e+n*Math.cos(g(r)))} ${d(t+n*Math.sin(g(r)))}`,v=(e,t,n,r,i)=>`M ${e} ${t} L ${_(e,t,n,r)} A ${n} ${n} 0 ${+(i-r>180)} 1 ${_(e,t,n,i)} Z`,y=(e,n,r,i,a,o=`shade`)=>{let s=``,c=360/i;for(let u=0;u<i;u+=1){let i=-90+u*c,f=i+c,p=(i+f)/2;o===`pizza`?u<a?(s+=`<path d="${v(e,n,r,i,f)}" fill="#d9963f" stroke="${t}" stroke-width="3" stroke-linejoin="round"/>`,s+=`<path d="${v(e,n,r*.84,i+1,f-1)}" fill="#ffd66e"/>`,s+=`<circle cx="${d(e+r*.52*Math.cos(g(p)))}" cy="${d(n+r*.52*Math.sin(g(p)))}" r="${d(r*.11)}" fill="#c8442f"/>`):s+=`<path d="${v(e,n,r,i,f)}" fill="#f6f7f8" stroke="#9aa5b1" stroke-width="2.5" stroke-dasharray="7 6" stroke-linejoin="round"/>`:s+=`<path d="${v(e,n,r,i,f)}" fill="${u<a?l:`#ffffff`}" stroke="${t}" stroke-width="3" stroke-linejoin="round"/>`}return o===`shade`&&(s+=`<circle cx="${e}" cy="${n}" r="${r}" fill="none" stroke="${t}" stroke-width="4"/>`),s},b=(e,n,r,i=[])=>{let a=r/2,o=[[e-a,n-a],[e,n-a],[e+a,n-a],[e+a,n],[e+a,n+a],[e,n+a],[e-a,n+a],[e-a,n]],s=`<rect x="${e-a-9}" y="${n-a-9}" width="${r+18}" height="${r+18}" rx="8" fill="#4f8f35"/>`;return o.forEach((r,a)=>{let c=o[(a+1)%8];s+=`<path d="M ${e} ${n} L ${r[0]} ${r[1]} L ${c[0]} ${c[1]} Z" fill="${i.includes(a)?l:`#eef2d9`}" stroke="${t}" stroke-width="2.5" stroke-linejoin="round"/>`}),s+`<rect x="${e-a}" y="${n-a}" width="${r}" height="${r}" fill="none" stroke="${t}" stroke-width="3.5"/>`},x=(e,t,n=26)=>`<circle cx="${e}" cy="${t}" r="${n}" fill="${o}"/>
    <path d="M ${d(e-n*.5)} ${d(t+.03*n)} l ${d(n*.35)} ${d(n*.35)} l ${d(n*.65)} -${d(n*.76)}" fill="none" stroke="#ffffff" stroke-width="${d(n*.2)}" stroke-linecap="round" stroke-linejoin="round"/>`,S=(e,t,n=26)=>`<circle cx="${e}" cy="${t}" r="${n}" fill="${s}"/>
    <path d="M ${d(e-n*.38)} ${d(t-n*.38)} l ${d(n*.76)} ${d(n*.76)} M ${d(e+n*.38)} ${d(t-n*.38)} l -${d(n*.76)} ${d(n*.76)}" fill="none" stroke="#ffffff" stroke-width="${d(n*.2)}" stroke-linecap="round"/>`,C=(e,t,n)=>`<g transform="translate(${e} 76) scale(${t?`-7 7`:`7`})" fill="none" stroke="${n}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 11V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2"/><path d="M14 10V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v2"/><path d="M10 10.5V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2v8"/><path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"/></g>`,w=(e,n,r,i)=>{let a=`<line x1="${e-14}" y1="${n}" x2="${e+r*i+14}" y2="${n}" stroke="${t}" stroke-width="5" stroke-linecap="round"/>`;for(let o=0;o<=i*4;o+=1){let i=d(e+r*o/4),s=o%4==0;a+=`<line x1="${i}" y1="${n-(s?24:12)}" x2="${i}" y2="${n+(s?24:12)}" stroke="${t}" stroke-width="${s?5:3}"/>`}return a},T=(e,t,n)=>`<path d="M ${e} ${n-14} L ${e} ${n} L ${t} ${n} L ${t} ${n-14}" fill="none" stroke="${r}" stroke-width="3" stroke-linejoin="round"/>`,E=(e,t,n,r=a)=>`<line x1="${e}" y1="${t}" x2="${n-18}" y2="${t}" stroke="${r}" stroke-width="7" stroke-linecap="round"/>
    <path d="M ${n-26} ${t-16} L ${n} ${t} L ${n-26} ${t+16} Z" fill="${r}"/>`,D=(e,t,n=`#5c2483`)=>`<circle cx="${e}" cy="${t}" r="24" fill="${n}"/>`,O=(e,n)=>`<rect x="${e}" y="${n}" width="52" height="48" rx="6" fill="#ffffff" stroke="${t}" stroke-width="4"/>`,k={PIC_SAY:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 300" class="w-full h-full">
    ${f(480,300)}
    <text x="88" y="126" font-family="${u}" font-size="58" font-weight="900" fill="${t}" text-anchor="middle">3</text>
    ${p(88,142,52)}
    <text x="88" y="198" font-family="${u}" font-size="58" font-weight="900" fill="${t}" text-anchor="middle">4</text>
    ${m(150,112,296,70,4,3)}
  </svg>`,PIC_SAME:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 300" class="w-full h-full">
    ${f(480,300)}
    <text x="70" y="82" font-family="${u}" font-size="40" font-weight="900" fill="${t}" text-anchor="middle">3</text>
    ${p(70,94,36,t,4)}
    <text x="70" y="132" font-family="${u}" font-size="40" font-weight="900" fill="${t}" text-anchor="middle">4</text>
    ${m(126,70,320,52,4,3)}
    <text x="70" y="202" font-family="${u}" font-size="40" font-weight="900" fill="${t}" text-anchor="middle">6</text>
    ${p(70,214,36,t,4)}
    <text x="70" y="252" font-family="${u}" font-size="40" font-weight="900" fill="${t}" text-anchor="middle">8</text>
    ${m(126,190,320,52,8,6)}
    <line x1="366" y1="48" x2="366" y2="266" stroke="${n}" stroke-width="4" stroke-dasharray="10 8"/>
  </svg>`,PIC_WHOLES:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 300" class="w-full h-full">
    ${f(480,300)}
    ${y(92,150,66,4,4,`pizza`)}
    ${y(240,150,66,4,4,`pizza`)}
    ${y(388,150,66,4,3,`pizza`)}
  </svg>`,NUM_DEN:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${f(840,560)}
    <image href="${e}" x="30" y="24" width="370" height="370" preserveAspectRatio="xMidYMid slice"/>
    <rect x="30" y="24" width="370" height="370" rx="10" fill="none" stroke="#e2e8f0" stroke-width="2"/>
    <circle cx="160" cy="86" r="22" fill="${n}" stroke="#ffffff" stroke-width="3"/>
    <text x="160" y="95" font-family="${u}" font-size="30" font-weight="900" fill="#ffffff" text-anchor="middle">1</text>
    <circle cx="277" cy="129" r="22" fill="${n}" stroke="#ffffff" stroke-width="3"/>
    <text x="277" y="138" font-family="${u}" font-size="30" font-weight="900" fill="#ffffff" text-anchor="middle">2</text>
    <circle cx="320" cy="175" r="22" fill="${n}" stroke="#ffffff" stroke-width="3"/>
    <text x="320" y="184" font-family="${u}" font-size="30" font-weight="900" fill="#ffffff" text-anchor="middle">3</text>

    <text x="510" y="172" font-family="${u}" font-size="120" font-weight="900" fill="${n}" text-anchor="middle">3</text>
    ${p(510,198,104,t,8)}
    <text x="510" y="318" font-family="${u}" font-size="120" font-weight="900" fill="${t}" text-anchor="middle">8</text>
    <text x="590" y="112" font-family="${u}" font-size="32" font-weight="900" fill="${n}">numerator</text>
    <text x="590" y="146" font-family="${u}" font-size="28" font-weight="700" fill="${r}">slices eaten</text>
    <text x="590" y="262" font-family="${u}" font-size="32" font-weight="900" fill="${n}">denominator</text>
    <text x="590" y="296" font-family="${u}" font-size="28" font-weight="700" fill="${r}">equal slices</text>

    <text x="40" y="430" font-family="${u}" font-size="26" font-weight="700" fill="${r}">4 equal parts</text>
    ${m(40,444,340,56,4,1)}
    ${x(64,528,18)}
    <text x="92" y="537" font-family="${u}" font-size="28" font-weight="900" fill="${o}">quarters</text>
    <text x="460" y="430" font-family="${u}" font-size="26" font-weight="700" fill="${r}">4 parts</text>
    ${h(460,444,340,56,[.4,.14,.3,.16],1)}
    ${S(484,528,18)}
    <text x="512" y="537" font-family="${u}" font-size="28" font-weight="900" fill="${s}">not quarters</text>
  </svg>`,SAY_IT:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1120 440" class="w-full h-full">
    ${f(1120,440)}
    <line x1="24" y1="216" x2="1096" y2="216" stroke="${i}" stroke-width="2"/>
    <line x1="380" y1="30" x2="380" y2="410" stroke="${i}" stroke-width="2"/>
    <line x1="746" y1="30" x2="746" y2="410" stroke="${i}" stroke-width="2"/>

    <text x="76" y="92" font-family="${u}" font-size="52" font-weight="900" fill="${t}" text-anchor="middle">1</text>
    ${p(76,108,52)}
    <text x="76" y="160" font-family="${u}" font-size="52" font-weight="900" fill="${t}" text-anchor="middle">2</text>
    ${m(134,74,226,52,2,1)}
    <text x="247" y="184" font-family="${u}" font-size="30" font-weight="900" fill="${n}" text-anchor="middle">one half</text>

    <text x="442" y="92" font-family="${u}" font-size="52" font-weight="900" fill="${t}" text-anchor="middle">1</text>
    ${p(442,108,52)}
    <text x="442" y="160" font-family="${u}" font-size="52" font-weight="900" fill="${t}" text-anchor="middle">3</text>
    ${m(500,74,226,52,3,1)}
    <text x="613" y="184" font-family="${u}" font-size="30" font-weight="900" fill="${n}" text-anchor="middle">one third</text>

    <text x="808" y="92" font-family="${u}" font-size="52" font-weight="900" fill="${t}" text-anchor="middle">1</text>
    ${p(808,108,52)}
    <text x="808" y="160" font-family="${u}" font-size="52" font-weight="900" fill="${t}" text-anchor="middle">4</text>
    ${m(866,74,226,52,4,1)}
    <text x="979" y="184" font-family="${u}" font-size="30" font-weight="900" fill="${n}" text-anchor="middle">one quarter</text>

    <text x="76" y="292" font-family="${u}" font-size="52" font-weight="900" fill="${t}" text-anchor="middle">3</text>
    ${p(76,308,52)}
    <text x="76" y="360" font-family="${u}" font-size="52" font-weight="900" fill="${t}" text-anchor="middle">4</text>
    ${m(134,274,226,52,4,3)}
    <text x="247" y="384" font-family="${u}" font-size="30" font-weight="900" fill="${n}" text-anchor="middle">three quarters</text>

    <text x="442" y="292" font-family="${u}" font-size="52" font-weight="900" fill="${t}" text-anchor="middle">2</text>
    ${p(442,308,52)}
    <text x="442" y="360" font-family="${u}" font-size="52" font-weight="900" fill="${t}" text-anchor="middle">5</text>
    ${m(500,274,226,52,5,2)}
    <text x="613" y="384" font-family="${u}" font-size="30" font-weight="900" fill="${n}" text-anchor="middle">two fifths</text>

    <text x="808" y="292" font-family="${u}" font-size="52" font-weight="900" fill="${t}" text-anchor="middle">7</text>
    ${p(808,308,64)}
    <text x="808" y="360" font-family="${u}" font-size="52" font-weight="900" fill="${t}" text-anchor="middle">10</text>
    ${m(866,274,226,52,10,7)}
    <text x="979" y="384" font-family="${u}" font-size="30" font-weight="900" fill="${n}" text-anchor="middle">seven tenths</text>
  </svg>`,WHAT_FRACTION:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${f(840,560)}
    <line x1="420" y1="24" x2="420" y2="536" stroke="${i}" stroke-width="2"/>
    <line x1="24" y1="280" x2="816" y2="280" stroke="${i}" stroke-width="2"/>

    ${D(44,44)}
    <text x="44" y="53" font-family="${u}" font-size="30" font-weight="900" fill="#ffffff" text-anchor="middle">a</text>
    ${m(70,108,320,80,3,1)}

    ${D(464,44)}
    <text x="464" y="53" font-family="${u}" font-size="30" font-weight="900" fill="#ffffff" text-anchor="middle">b</text>
    ${y(634,150,104,6,5)}

    ${D(44,324)}
    <text x="44" y="333" font-family="${u}" font-size="30" font-weight="900" fill="#ffffff" text-anchor="middle">c</text>
    ${b(232,424,196,[0,1,2])}

    ${D(464,324)}
    <text x="464" y="333" font-family="${u}" font-size="30" font-weight="900" fill="#ffffff" text-anchor="middle">d</text>
    ${m(490,388,320,80,6,2)}
  </svg>`,ANS_34:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 320" class="w-full h-full">
    ${f(720,320)}
    ${C(192,!0,c)}
    <text x="440" y="140" font-family="${u}" font-size="120" font-weight="900" fill="${c}" text-anchor="middle">3</text>
    ${p(440,166,120,c,9)}
    <text x="440" y="288" font-family="${u}" font-size="120" font-weight="900" fill="${c}" text-anchor="middle">4</text>
  </svg>`,ANS_46:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 320" class="w-full h-full">
    ${f(720,320)}
    ${C(528,!1,n)}
    <text x="280" y="140" font-family="${u}" font-size="120" font-weight="900" fill="${n}" text-anchor="middle">4</text>
    ${p(280,166,120,n,9)}
    <text x="280" y="288" font-family="${u}" font-size="120" font-weight="900" fill="${n}" text-anchor="middle">6</text>
  </svg>`,ADD_OR_TIMES:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${f(840,560)}
    <text x="72" y="76" font-family="${u}" font-size="44" font-weight="900" fill="${t}" text-anchor="middle">2</text>
    ${p(72,90,40)}
    <text x="72" y="134" font-family="${u}" font-size="44" font-weight="900" fill="${t}" text-anchor="middle">3</text>
    ${m(140,52,620,70,3,2)}

    <text x="72" y="226" font-family="${u}" font-size="44" font-weight="900" fill="${t}" text-anchor="middle">4</text>
    ${p(72,240,40)}
    <text x="72" y="284" font-family="${u}" font-size="44" font-weight="900" fill="${t}" text-anchor="middle">6</text>
    ${m(140,202,620,70,6,4)}
    ${x(802,237)}
    <text x="140" y="312" font-family="${u}" font-size="30" font-weight="900" fill="${o}">× 2 top and bottom</text>

    <text x="72" y="376" font-family="${u}" font-size="44" font-weight="900" fill="${t}" text-anchor="middle">3</text>
    ${p(72,390,40)}
    <text x="72" y="434" font-family="${u}" font-size="44" font-weight="900" fill="${t}" text-anchor="middle">4</text>
    ${m(140,352,620,70,4,3)}
    ${S(802,387)}
    <text x="140" y="462" font-family="${u}" font-size="30" font-weight="900" fill="${s}">+ 1 top and bottom</text>

    <line x1="553" y1="36" x2="553" y2="440" stroke="${n}" stroke-width="4" stroke-dasharray="10 8"/>
    <text x="553" y="512" font-family="${u}" font-size="28" font-weight="900" fill="${n}" text-anchor="middle">the same amount ends here</text>
  </svg>`,IMPROPER_MIXED:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${f(840,560)}
    <text x="250" y="108" font-family="${u}" font-size="96" font-weight="900" fill="${t}" text-anchor="middle">11</text>
    ${p(250,132,124,t,8)}
    <text x="250" y="228" font-family="${u}" font-size="96" font-weight="900" fill="${t}" text-anchor="middle">4</text>
    <text x="410" y="168" font-family="${u}" font-size="90" font-weight="900" fill="${t}" text-anchor="middle">=</text>
    <text x="528" y="202" font-family="${u}" font-size="150" font-weight="900" fill="${t}" text-anchor="middle">2</text>
    <text x="616" y="126" font-family="${u}" font-size="64" font-weight="900" fill="${t}" text-anchor="middle">3</text>
    ${p(616,144,50,t,6)}
    <text x="616" y="202" font-family="${u}" font-size="64" font-weight="900" fill="${t}" text-anchor="middle">4</text>
    <text x="250" y="276" font-family="${u}" font-size="28" font-weight="900" fill="${n}" text-anchor="middle">improper fraction</text>
    <text x="566" y="276" font-family="${u}" font-size="28" font-weight="900" fill="${n}" text-anchor="middle">mixed number</text>

    ${y(142,400,84,4,4,`pizza`)}
    ${y(340,400,84,4,4,`pizza`)}
    ${y(616,400,84,4,3,`pizza`)}
    ${T(52,430,504)}
    ${T(526,706,504)}
    <text x="241" y="538" font-family="${u}" font-size="28" font-weight="900" fill="${n}" text-anchor="middle">whole-number part: 2</text>
    <text x="616" y="538" font-family="${u}" font-size="28" font-weight="900" fill="${n}" text-anchor="middle">fractional part: 3/4</text>
  </svg>`,BOTH_WAYS:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${f(840,560)}
    <text x="30" y="46" font-family="${u}" font-size="24" font-weight="900" fill="${r}" letter-spacing="2">IMPROPER → MIXED: DIVIDE</text>
    <text x="30" y="104" font-family="${u}" font-size="40" font-weight="900" fill="${t}">11 ÷ 4 = 2 remainder 3</text>
    ${y(84,186,50,4,4,`pizza`)}
    ${y(200,186,50,4,4,`pizza`)}
    ${y(360,186,50,4,3,`pizza`)}
    <text x="142" y="266" font-family="${u}" font-size="26" font-weight="700" fill="${r}" text-anchor="middle">2 wholes</text>
    <text x="360" y="266" font-family="${u}" font-size="26" font-weight="700" fill="${r}" text-anchor="middle">3 quarters left over</text>
    ${E(462,168,584)}
    <text x="654" y="216" font-family="${u}" font-size="130" font-weight="900" fill="${t}" text-anchor="middle">2</text>
    <text x="738" y="150" font-family="${u}" font-size="56" font-weight="900" fill="${t}" text-anchor="middle">3</text>
    ${p(738,166,44,t,6)}
    <text x="738" y="216" font-family="${u}" font-size="56" font-weight="900" fill="${t}" text-anchor="middle">4</text>

    <line x1="30" y1="296" x2="810" y2="296" stroke="${i}" stroke-width="2"/>

    <text x="30" y="338" font-family="${u}" font-size="24" font-weight="900" fill="${r}" letter-spacing="2">MIXED → IMPROPER: MULTIPLY, THEN ADD</text>
    <text x="88" y="486" font-family="${u}" font-size="130" font-weight="900" fill="${t}" text-anchor="middle">2</text>
    <text x="172" y="420" font-family="${u}" font-size="56" font-weight="900" fill="${t}" text-anchor="middle">3</text>
    ${p(172,436,44,t,6)}
    <text x="172" y="486" font-family="${u}" font-size="56" font-weight="900" fill="${t}" text-anchor="middle">4</text>
    <text x="250" y="418" font-family="${u}" font-size="32" font-weight="900" fill="${t}">2 × 4 = 8 quarters</text>
    <text x="250" y="472" font-family="${u}" font-size="32" font-weight="900" fill="${t}">8 + 3 = 11 quarters</text>
    ${E(596,440,680)}
    <text x="756" y="424" font-family="${u}" font-size="64" font-weight="900" fill="${t}" text-anchor="middle">11</text>
    ${p(756,444,82,t,6)}
    <text x="756" y="508" font-family="${u}" font-size="64" font-weight="900" fill="${t}" text-anchor="middle">4</text>
  </svg>`,ANS_134:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 320" class="w-full h-full">
    ${f(720,320)}
    ${C(192,!0,c)}
    <text x="440" y="140" font-family="${u}" font-size="120" font-weight="900" fill="${c}" text-anchor="middle">13</text>
    ${p(440,166,150,c,9)}
    <text x="440" y="288" font-family="${u}" font-size="120" font-weight="900" fill="${c}" text-anchor="middle">4</text>
  </svg>`,ANS_312:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 320" class="w-full h-full">
    ${f(720,320)}
    ${C(528,!1,n)}
    <text x="228" y="232" font-family="${u}" font-size="180" font-weight="900" fill="${n}" text-anchor="middle">3</text>
    <text x="338" y="140" font-family="${u}" font-size="80" font-weight="900" fill="${n}" text-anchor="middle">1</text>
    ${p(338,162,62,n,7)}
    <text x="338" y="236" font-family="${u}" font-size="80" font-weight="900" fill="${n}" text-anchor="middle">2</text>
  </svg>`,NUMBER_LINE:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1120 440" class="w-full h-full">
    ${f(1120,440)}
    <rect x="60" y="221" width="812.5" height="18" fill="${c}" opacity="0.22"/>
    ${w(60,230,250,4)}
    <text x="60" y="304" font-family="${u}" font-size="44" font-weight="900" fill="${t}" text-anchor="middle">0</text>
    <text x="310" y="304" font-family="${u}" font-size="44" font-weight="900" fill="${t}" text-anchor="middle">1</text>
    <text x="560" y="304" font-family="${u}" font-size="44" font-weight="900" fill="${t}" text-anchor="middle">2</text>
    <text x="810" y="304" font-family="${u}" font-size="44" font-weight="900" fill="${t}" text-anchor="middle">3</text>
    <text x="1060" y="304" font-family="${u}" font-size="44" font-weight="900" fill="${t}" text-anchor="middle">4</text>

    <text x="620" y="96" font-family="${u}" font-size="52" font-weight="900" fill="${c}" text-anchor="middle">13</text>
    ${p(620,112,66,c,6)}
    <text x="620" y="162" font-family="${u}" font-size="52" font-weight="900" fill="${c}" text-anchor="middle">4</text>
    <text x="668" y="146" font-family="${u}" font-size="46" font-weight="900" fill="${c}">= 3¼</text>
    <line x1="790" y1="164" x2="868" y2="216" stroke="${c}" stroke-width="4"/>
    <circle cx="872.5" cy="230" r="13" fill="${c}" stroke="#ffffff" stroke-width="3"/>

    <text x="990" y="162" font-family="${u}" font-size="80" font-weight="900" fill="${n}" text-anchor="middle">3</text>
    <text x="1046" y="114" font-family="${u}" font-size="40" font-weight="900" fill="${n}" text-anchor="middle">1</text>
    ${p(1046,126,30,n,5)}
    <text x="1046" y="164" font-family="${u}" font-size="40" font-weight="900" fill="${n}" text-anchor="middle">2</text>
    <line x1="988" y1="176" x2="940" y2="216" stroke="${n}" stroke-width="4"/>
    <circle cx="935" cy="230" r="13" fill="${n}" stroke="#ffffff" stroke-width="3"/>

    ${T(60,872,352)}
    <text x="466" y="396" font-family="${u}" font-size="30" font-weight="900" fill="${r}" text-anchor="middle">13 quarters</text>
  </svg>`,FILL_BOX:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${f(840,560)}
    ${D(46,112,o)}
    <text x="46" y="121" font-family="${u}" font-size="30" font-weight="900" fill="#ffffff" text-anchor="middle">a</text>
    <text x="130" y="98" font-family="${u}" font-size="60" font-weight="900" fill="${t}" text-anchor="middle">3</text>
    ${p(130,112,52,t,6)}
    <text x="130" y="166" font-family="${u}" font-size="60" font-weight="900" fill="${t}" text-anchor="middle">5</text>
    <text x="205" y="132" font-family="${u}" font-size="56" font-weight="900" fill="${t}" text-anchor="middle">=</text>
    ${O(259,52)}
    ${p(285,112,82,t,6)}
    <text x="285" y="166" font-family="${u}" font-size="60" font-weight="900" fill="${t}" text-anchor="middle">10</text>

    ${D(456,112,o)}
    <text x="456" y="121" font-family="${u}" font-size="30" font-weight="900" fill="#ffffff" text-anchor="middle">b</text>
    <text x="540" y="98" font-family="${u}" font-size="60" font-weight="900" fill="${t}" text-anchor="middle">2</text>
    ${p(540,112,52,t,6)}
    <text x="540" y="166" font-family="${u}" font-size="60" font-weight="900" fill="${t}" text-anchor="middle">7</text>
    <text x="615" y="132" font-family="${u}" font-size="56" font-weight="900" fill="${t}" text-anchor="middle">=</text>
    ${O(669,52)}
    ${p(695,112,82,t,6)}
    <text x="695" y="166" font-family="${u}" font-size="60" font-weight="900" fill="${t}" text-anchor="middle">21</text>

    ${D(46,276,o)}
    <text x="46" y="285" font-family="${u}" font-size="30" font-weight="900" fill="#ffffff" text-anchor="middle">c</text>
    <text x="130" y="262" font-family="${u}" font-size="60" font-weight="900" fill="${t}" text-anchor="middle">5</text>
    ${p(130,276,52,t,6)}
    <text x="130" y="330" font-family="${u}" font-size="60" font-weight="900" fill="${t}" text-anchor="middle">6</text>
    <text x="205" y="296" font-family="${u}" font-size="56" font-weight="900" fill="${t}" text-anchor="middle">=</text>
    <text x="285" y="262" font-family="${u}" font-size="60" font-weight="900" fill="${t}" text-anchor="middle">20</text>
    ${p(285,276,82,t,6)}
    ${O(259,284)}

    ${D(456,276,o)}
    <text x="456" y="285" font-family="${u}" font-size="30" font-weight="900" fill="#ffffff" text-anchor="middle">d</text>
    <text x="548" y="262" font-family="${u}" font-size="60" font-weight="900" fill="${t}" text-anchor="middle">12</text>
    ${p(548,276,82,t,6)}
    <text x="548" y="330" font-family="${u}" font-size="60" font-weight="900" fill="${t}" text-anchor="middle">16</text>
    <text x="628" y="296" font-family="${u}" font-size="56" font-weight="900" fill="${t}" text-anchor="middle">=</text>
    ${O(678,216)}
    ${p(704,276,64,t,6)}
    <text x="704" y="330" font-family="${u}" font-size="60" font-weight="900" fill="${t}" text-anchor="middle">4</text>

    <line x1="24" y1="372" x2="816" y2="372" stroke="${i}" stroke-width="2"/>

    ${D(46,462,o)}
    <text x="46" y="471" font-family="${u}" font-size="30" font-weight="900" fill="#ffffff" text-anchor="middle">e</text>
    <text x="130" y="448" font-family="${u}" font-size="60" font-weight="900" fill="${t}" text-anchor="middle">3</text>
    ${p(130,462,52,t,6)}
    <text x="130" y="516" font-family="${u}" font-size="60" font-weight="900" fill="${t}" text-anchor="middle">4</text>
    ${O(190,438)}
    <text x="300" y="448" font-family="${u}" font-size="60" font-weight="900" fill="${t}" text-anchor="middle">9</text>
    ${p(300,462,82,t,6)}
    <text x="300" y="516" font-family="${u}" font-size="60" font-weight="900" fill="${t}" text-anchor="middle">12</text>

    ${D(456,462,o)}
    <text x="456" y="471" font-family="${u}" font-size="30" font-weight="900" fill="#ffffff" text-anchor="middle">f</text>
    <text x="540" y="448" font-family="${u}" font-size="60" font-weight="900" fill="${t}" text-anchor="middle">2</text>
    ${p(540,462,52,t,6)}
    <text x="540" y="516" font-family="${u}" font-size="60" font-weight="900" fill="${t}" text-anchor="middle">5</text>
    ${O(600,438)}
    <text x="710" y="448" font-family="${u}" font-size="60" font-weight="900" fill="${t}" text-anchor="middle">3</text>
    ${p(710,462,52,t,6)}
    <text x="710" y="516" font-family="${u}" font-size="60" font-weight="900" fill="${t}" text-anchor="middle">6</text>
  </svg>`,CHANGE_THESE:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${f(840,560)}
    ${D(52,150,o)}
    <text x="52" y="159" font-family="${u}" font-size="30" font-weight="900" fill="#ffffff" text-anchor="middle">a</text>
    <text x="126" y="136" font-family="${u}" font-size="64" font-weight="900" fill="${t}" text-anchor="middle">9</text>
    ${p(126,150,54,t,6)}
    <text x="126" y="208" font-family="${u}" font-size="64" font-weight="900" fill="${t}" text-anchor="middle">4</text>

    ${D(252,150,o)}
    <text x="252" y="159" font-family="${u}" font-size="30" font-weight="900" fill="#ffffff" text-anchor="middle">b</text>
    <text x="334" y="136" font-family="${u}" font-size="64" font-weight="900" fill="${t}" text-anchor="middle">13</text>
    ${p(334,150,86,t,6)}
    <text x="334" y="208" font-family="${u}" font-size="64" font-weight="900" fill="${t}" text-anchor="middle">5</text>

    ${D(452,150,o)}
    <text x="452" y="159" font-family="${u}" font-size="30" font-weight="900" fill="#ffffff" text-anchor="middle">c</text>
    <text x="534" y="136" font-family="${u}" font-size="64" font-weight="900" fill="${t}" text-anchor="middle">17</text>
    ${p(534,150,86,t,6)}
    <text x="534" y="208" font-family="${u}" font-size="64" font-weight="900" fill="${t}" text-anchor="middle">3</text>

    ${D(652,150,o)}
    <text x="652" y="159" font-family="${u}" font-size="30" font-weight="900" fill="#ffffff" text-anchor="middle">d</text>
    <text x="734" y="136" font-family="${u}" font-size="64" font-weight="900" fill="${t}" text-anchor="middle">23</text>
    ${p(734,150,86,t,6)}
    <text x="734" y="208" font-family="${u}" font-size="64" font-weight="900" fill="${t}" text-anchor="middle">10</text>

    <line x1="24" y1="290" x2="816" y2="290" stroke="${i}" stroke-width="2"/>

    ${D(52,420,o)}
    <text x="52" y="429" font-family="${u}" font-size="30" font-weight="900" fill="#ffffff" text-anchor="middle">e</text>
    <text x="126" y="456" font-family="${u}" font-size="100" font-weight="900" fill="${t}" text-anchor="middle">3</text>
    <text x="194" y="406" font-family="${u}" font-size="52" font-weight="900" fill="${t}" text-anchor="middle">1</text>
    ${p(194,420,44,t,5)}
    <text x="194" y="466" font-family="${u}" font-size="52" font-weight="900" fill="${t}" text-anchor="middle">2</text>

    ${D(322,420,o)}
    <text x="322" y="429" font-family="${u}" font-size="30" font-weight="900" fill="#ffffff" text-anchor="middle">f</text>
    <text x="396" y="456" font-family="${u}" font-size="100" font-weight="900" fill="${t}" text-anchor="middle">2</text>
    <text x="464" y="406" font-family="${u}" font-size="52" font-weight="900" fill="${t}" text-anchor="middle">3</text>
    ${p(464,420,44,t,5)}
    <text x="464" y="466" font-family="${u}" font-size="52" font-weight="900" fill="${t}" text-anchor="middle">5</text>

    ${D(592,420,o)}
    <text x="592" y="429" font-family="${u}" font-size="30" font-weight="900" fill="#ffffff" text-anchor="middle">g</text>
    <text x="666" y="456" font-family="${u}" font-size="100" font-weight="900" fill="${t}" text-anchor="middle">4</text>
    <text x="734" y="406" font-family="${u}" font-size="52" font-weight="900" fill="${t}" text-anchor="middle">2</text>
    ${p(734,420,44,t,5)}
    <text x="734" y="466" font-family="${u}" font-size="52" font-weight="900" fill="${t}" text-anchor="middle">3</text>
  </svg>`,DRAW_THIS:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${f(840,560)}
    <text x="90" y="92" font-family="${u}" font-size="64" font-weight="900" fill="${t}" text-anchor="middle">11</text>
    ${p(90,110,84,t,6)}
    <text x="90" y="172" font-family="${u}" font-size="64" font-weight="900" fill="${t}" text-anchor="middle">4</text>
    <text x="182" y="146" font-family="${u}" font-size="60" font-weight="900" fill="${t}" text-anchor="middle">=</text>
    <text x="268" y="168" font-family="${u}" font-size="110" font-weight="900" fill="${t}" text-anchor="middle">2</text>
    <text x="338" y="110" font-family="${u}" font-size="48" font-weight="900" fill="${t}" text-anchor="middle">3</text>
    ${p(338,124,40,t,5)}
    <text x="338" y="168" font-family="${u}" font-size="48" font-weight="900" fill="${t}" text-anchor="middle">4</text>
    <text x="430" y="130" font-family="${u}" font-size="30" font-weight="900" fill="${a}">11 ÷ 4 = 2 remainder 3</text>

    ${y(110,292,72,4,4,`pizza`)}
    ${y(274,292,72,4,4,`pizza`)}
    ${y(470,292,72,4,3,`pizza`)}

    ${w(60,462,240,3)}
    <text x="60" y="524" font-family="${u}" font-size="34" font-weight="900" fill="${t}" text-anchor="middle">0</text>
    <text x="300" y="524" font-family="${u}" font-size="34" font-weight="900" fill="${t}" text-anchor="middle">1</text>
    <text x="540" y="524" font-family="${u}" font-size="34" font-weight="900" fill="${t}" text-anchor="middle">2</text>
    <text x="780" y="524" font-family="${u}" font-size="34" font-weight="900" fill="${t}" text-anchor="middle">3</text>
    <circle cx="720" cy="462" r="13" fill="${n}" stroke="#ffffff" stroke-width="3"/>
    <text x="720" y="418" font-family="${u}" font-size="40" font-weight="900" fill="${n}" text-anchor="middle">2¾</text>
  </svg>`};export{k as t};