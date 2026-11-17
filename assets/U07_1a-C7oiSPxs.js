import{r as e}from"./rolldown-runtime-XKyaHtl9.js";import{Oi as t,Sl as n,Uo as r,dl as i,ha as a,xo as o,yo as s}from"./vendor-DeFEdIUd.js";import{f as c}from"./classroom-CIZ9D88N.js";import{t as l}from"./ui-C6sch65x.js";import{a as u}from"./dating-nHCoXag2.js";import{t as d}from"./bodies-BeahaDRD.js";var f=`/assets/pizza-BUwhY50e.jpg`,p=`#2b2b2b`,m=`#c25e12`,h=`#5b6770`,g=`#cfd8dc`,ee=`#0087a8`,_=`#4a8b23`,te=`#c8102e`,v=`#1a5fa8`,ne=`#5c2483`,re=`#6cbfd4`,ie=`#d9963f`,ae=`#ffd66e`,oe=`#c8442f`,se=`#4f8f35`,ce=`#eef2d9`,y=`Inter, 'Segoe UI', system-ui, sans-serif`,b=e=>Math.round(e*10)/10,x=(e,t)=>`<rect x="0" y="0" width="${e}" height="${t}" rx="14" fill="#ffffff"/>
    <rect x="0.75" y="0.75" width="${e-1.5}" height="${t-1.5}" rx="13" fill="none" stroke="#e2e8f0" stroke-width="1.5"/>`,S=(e,t,n,r=p,i=5)=>`<line x1="${b(e-n/2)}" y1="${t}" x2="${b(e+n/2)}" y2="${t}" stroke="${r}" stroke-width="${i}" stroke-linecap="round"/>`,C=(e,t,n,r,i,a,o=re,s=4)=>{let c=n/i,l=``;for(let n=0;n<i;n+=1)l+=`<rect x="${b(e+n*c)}" y="${t}" width="${b(c)}" height="${r}" fill="${n<a?o:`#ffffff`}"/>`;for(let n=1;n<i;n+=1)l+=`<line x1="${b(e+n*c)}" y1="${t}" x2="${b(e+n*c)}" y2="${t+r}" stroke="${p}" stroke-width="${s*.75}"/>`;return l+`<rect x="${e}" y="${t}" width="${n}" height="${r}" fill="none" stroke="${p}" stroke-width="${s}"/>`},le=(e,t,n,r,i,a)=>{let o=``,s=e;return i.forEach((e,i)=>{o+=`<rect x="${b(s)}" y="${t}" width="${b(e*n)}" height="${r}" fill="${i<a?re:`#ffffff`}" stroke="${p}" stroke-width="3"/>`,s+=e*n}),o+`<rect x="${e}" y="${t}" width="${n}" height="${r}" fill="none" stroke="${p}" stroke-width="4"/>`},ue=e=>e*Math.PI/180,de=(e,t,n,r)=>`${b(e+n*Math.cos(ue(r)))} ${b(t+n*Math.sin(ue(r)))}`,fe=(e,t,n,r,i)=>`M ${e} ${t} L ${de(e,t,n,r)} A ${n} ${n} 0 ${+(i-r>180)} 1 ${de(e,t,n,i)} Z`,w=(e,t,n,r,i,a=`shade`)=>{let o=``,s=360/r;for(let c=0;c<r;c+=1){let r=-90+c*s,l=r+s,u=(r+l)/2;a===`pizza`?c<i?(o+=`<path d="${fe(e,t,n,r,l)}" fill="${ie}" stroke="${p}" stroke-width="3" stroke-linejoin="round"/>`,o+=`<path d="${fe(e,t,n*.84,r+1,l-1)}" fill="${ae}"/>`,o+=`<circle cx="${b(e+n*.52*Math.cos(ue(u)))}" cy="${b(t+n*.52*Math.sin(ue(u)))}" r="${b(n*.11)}" fill="${oe}"/>`):o+=`<path d="${fe(e,t,n,r,l)}" fill="#f6f7f8" stroke="#9aa5b1" stroke-width="2.5" stroke-dasharray="7 6" stroke-linejoin="round"/>`:o+=`<path d="${fe(e,t,n,r,l)}" fill="${c<i?re:`#ffffff`}" stroke="${p}" stroke-width="3" stroke-linejoin="round"/>`}return a===`shade`&&(o+=`<circle cx="${e}" cy="${t}" r="${n}" fill="none" stroke="${p}" stroke-width="4"/>`),o},pe=(e,t,n,r=[])=>{let i=n/2,a=[[e-i,t-i],[e,t-i],[e+i,t-i],[e+i,t],[e+i,t+i],[e,t+i],[e-i,t+i],[e-i,t]],o=`<rect x="${e-i-9}" y="${t-i-9}" width="${n+18}" height="${n+18}" rx="8" fill="${se}"/>`;return a.forEach((n,i)=>{let s=a[(i+1)%8];o+=`<path d="M ${e} ${t} L ${n[0]} ${n[1]} L ${s[0]} ${s[1]} Z" fill="${r.includes(i)?re:ce}" stroke="${p}" stroke-width="2.5" stroke-linejoin="round"/>`}),o+`<rect x="${e-i}" y="${t-i}" width="${n}" height="${n}" fill="none" stroke="${p}" stroke-width="3.5"/>`},me=(e,t,n=26)=>`<circle cx="${e}" cy="${t}" r="${n}" fill="${_}"/>
    <path d="M ${b(e-n*.5)} ${b(t+.03*n)} l ${b(n*.35)} ${b(n*.35)} l ${b(n*.65)} -${b(n*.76)}" fill="none" stroke="#ffffff" stroke-width="${b(n*.2)}" stroke-linecap="round" stroke-linejoin="round"/>`,he=(e,t,n=26)=>`<circle cx="${e}" cy="${t}" r="${n}" fill="${te}"/>
    <path d="M ${b(e-n*.38)} ${b(t-n*.38)} l ${b(n*.76)} ${b(n*.76)} M ${b(e+n*.38)} ${b(t-n*.38)} l -${b(n*.76)} ${b(n*.76)}" fill="none" stroke="#ffffff" stroke-width="${b(n*.2)}" stroke-linecap="round"/>`,ge=(e,t,n)=>`<g transform="translate(${e} 76) scale(${t?`-7 7`:`7`})" fill="none" stroke="${n}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 11V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2"/><path d="M14 10V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v2"/><path d="M10 10.5V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2v8"/><path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"/></g>`,_e=(e,t,n,r)=>{let i=`<line x1="${e-14}" y1="${t}" x2="${e+n*r+14}" y2="${t}" stroke="${p}" stroke-width="5" stroke-linecap="round"/>`;for(let a=0;a<=r*4;a+=1){let r=b(e+n*a/4),o=a%4==0;i+=`<line x1="${r}" y1="${t-(o?24:12)}" x2="${r}" y2="${t+(o?24:12)}" stroke="${p}" stroke-width="${o?5:3}"/>`}return i},ve=(e,t,n)=>`<path d="M ${e} ${n-14} L ${e} ${n} L ${t} ${n} L ${t} ${n-14}" fill="none" stroke="${h}" stroke-width="3" stroke-linejoin="round"/>`,ye=(e,t,n,r=ee)=>`<line x1="${e}" y1="${t}" x2="${n-18}" y2="${t}" stroke="${r}" stroke-width="7" stroke-linecap="round"/>
    <path d="M ${n-26} ${t-16} L ${n} ${t} L ${n-26} ${t+16} Z" fill="${r}"/>`,T=(e,t,n=ne)=>`<circle cx="${e}" cy="${t}" r="24" fill="${n}"/>`,E=(e,t)=>`<rect x="${e}" y="${t}" width="52" height="48" rx="6" fill="#ffffff" stroke="${p}" stroke-width="4"/>`,D={PIC_SAY:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 300" class="w-full h-full">
    ${x(480,300)}
    <text x="88" y="126" font-family="${y}" font-size="58" font-weight="900" fill="${p}" text-anchor="middle">3</text>
    ${S(88,142,52)}
    <text x="88" y="198" font-family="${y}" font-size="58" font-weight="900" fill="${p}" text-anchor="middle">4</text>
    ${C(150,112,296,70,4,3)}
  </svg>`,PIC_SAME:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 300" class="w-full h-full">
    ${x(480,300)}
    <text x="70" y="82" font-family="${y}" font-size="40" font-weight="900" fill="${p}" text-anchor="middle">3</text>
    ${S(70,94,36,p,4)}
    <text x="70" y="132" font-family="${y}" font-size="40" font-weight="900" fill="${p}" text-anchor="middle">4</text>
    ${C(126,70,320,52,4,3)}
    <text x="70" y="202" font-family="${y}" font-size="40" font-weight="900" fill="${p}" text-anchor="middle">6</text>
    ${S(70,214,36,p,4)}
    <text x="70" y="252" font-family="${y}" font-size="40" font-weight="900" fill="${p}" text-anchor="middle">8</text>
    ${C(126,190,320,52,8,6)}
    <line x1="366" y1="48" x2="366" y2="266" stroke="${m}" stroke-width="4" stroke-dasharray="10 8"/>
  </svg>`,PIC_WHOLES:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 300" class="w-full h-full">
    ${x(480,300)}
    ${w(92,150,66,4,4,`pizza`)}
    ${w(240,150,66,4,4,`pizza`)}
    ${w(388,150,66,4,3,`pizza`)}
  </svg>`,NUM_DEN:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${x(840,560)}
    <image href="${f}" x="30" y="24" width="370" height="370" preserveAspectRatio="xMidYMid slice"/>
    <rect x="30" y="24" width="370" height="370" rx="10" fill="none" stroke="#e2e8f0" stroke-width="2"/>
    <circle cx="160" cy="86" r="22" fill="${m}" stroke="#ffffff" stroke-width="3"/>
    <text x="160" y="95" font-family="${y}" font-size="30" font-weight="900" fill="#ffffff" text-anchor="middle">1</text>
    <circle cx="277" cy="129" r="22" fill="${m}" stroke="#ffffff" stroke-width="3"/>
    <text x="277" y="138" font-family="${y}" font-size="30" font-weight="900" fill="#ffffff" text-anchor="middle">2</text>
    <circle cx="320" cy="175" r="22" fill="${m}" stroke="#ffffff" stroke-width="3"/>
    <text x="320" y="184" font-family="${y}" font-size="30" font-weight="900" fill="#ffffff" text-anchor="middle">3</text>

    <text x="510" y="172" font-family="${y}" font-size="120" font-weight="900" fill="${m}" text-anchor="middle">3</text>
    ${S(510,198,104,p,8)}
    <text x="510" y="318" font-family="${y}" font-size="120" font-weight="900" fill="${p}" text-anchor="middle">8</text>
    <text x="590" y="112" font-family="${y}" font-size="32" font-weight="900" fill="${m}">numerator</text>
    <text x="590" y="146" font-family="${y}" font-size="28" font-weight="700" fill="${h}">slices eaten</text>
    <text x="590" y="262" font-family="${y}" font-size="32" font-weight="900" fill="${m}">denominator</text>
    <text x="590" y="296" font-family="${y}" font-size="28" font-weight="700" fill="${h}">equal slices</text>

    <text x="40" y="430" font-family="${y}" font-size="26" font-weight="700" fill="${h}">4 equal parts</text>
    ${C(40,444,340,56,4,1)}
    ${me(64,528,18)}
    <text x="92" y="537" font-family="${y}" font-size="28" font-weight="900" fill="${_}">quarters</text>
    <text x="460" y="430" font-family="${y}" font-size="26" font-weight="700" fill="${h}">4 parts</text>
    ${le(460,444,340,56,[.4,.14,.3,.16],1)}
    ${he(484,528,18)}
    <text x="512" y="537" font-family="${y}" font-size="28" font-weight="900" fill="${te}">not quarters</text>
  </svg>`,SAY_IT:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1120 440" class="w-full h-full">
    ${x(1120,440)}
    <line x1="24" y1="216" x2="1096" y2="216" stroke="${g}" stroke-width="2"/>
    <line x1="380" y1="30" x2="380" y2="410" stroke="${g}" stroke-width="2"/>
    <line x1="746" y1="30" x2="746" y2="410" stroke="${g}" stroke-width="2"/>

    <text x="76" y="92" font-family="${y}" font-size="52" font-weight="900" fill="${p}" text-anchor="middle">1</text>
    ${S(76,108,52)}
    <text x="76" y="160" font-family="${y}" font-size="52" font-weight="900" fill="${p}" text-anchor="middle">2</text>
    ${C(134,74,226,52,2,1)}
    <text x="247" y="184" font-family="${y}" font-size="30" font-weight="900" fill="${m}" text-anchor="middle">one half</text>

    <text x="442" y="92" font-family="${y}" font-size="52" font-weight="900" fill="${p}" text-anchor="middle">1</text>
    ${S(442,108,52)}
    <text x="442" y="160" font-family="${y}" font-size="52" font-weight="900" fill="${p}" text-anchor="middle">3</text>
    ${C(500,74,226,52,3,1)}
    <text x="613" y="184" font-family="${y}" font-size="30" font-weight="900" fill="${m}" text-anchor="middle">one third</text>

    <text x="808" y="92" font-family="${y}" font-size="52" font-weight="900" fill="${p}" text-anchor="middle">1</text>
    ${S(808,108,52)}
    <text x="808" y="160" font-family="${y}" font-size="52" font-weight="900" fill="${p}" text-anchor="middle">4</text>
    ${C(866,74,226,52,4,1)}
    <text x="979" y="184" font-family="${y}" font-size="30" font-weight="900" fill="${m}" text-anchor="middle">one quarter</text>

    <text x="76" y="292" font-family="${y}" font-size="52" font-weight="900" fill="${p}" text-anchor="middle">3</text>
    ${S(76,308,52)}
    <text x="76" y="360" font-family="${y}" font-size="52" font-weight="900" fill="${p}" text-anchor="middle">4</text>
    ${C(134,274,226,52,4,3)}
    <text x="247" y="384" font-family="${y}" font-size="30" font-weight="900" fill="${m}" text-anchor="middle">three quarters</text>

    <text x="442" y="292" font-family="${y}" font-size="52" font-weight="900" fill="${p}" text-anchor="middle">2</text>
    ${S(442,308,52)}
    <text x="442" y="360" font-family="${y}" font-size="52" font-weight="900" fill="${p}" text-anchor="middle">5</text>
    ${C(500,274,226,52,5,2)}
    <text x="613" y="384" font-family="${y}" font-size="30" font-weight="900" fill="${m}" text-anchor="middle">two fifths</text>

    <text x="808" y="292" font-family="${y}" font-size="52" font-weight="900" fill="${p}" text-anchor="middle">7</text>
    ${S(808,308,64)}
    <text x="808" y="360" font-family="${y}" font-size="52" font-weight="900" fill="${p}" text-anchor="middle">10</text>
    ${C(866,274,226,52,10,7)}
    <text x="979" y="384" font-family="${y}" font-size="30" font-weight="900" fill="${m}" text-anchor="middle">seven tenths</text>
  </svg>`,WHAT_FRACTION:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${x(840,560)}
    <line x1="420" y1="24" x2="420" y2="536" stroke="${g}" stroke-width="2"/>
    <line x1="24" y1="280" x2="816" y2="280" stroke="${g}" stroke-width="2"/>

    ${T(44,44)}
    <text x="44" y="53" font-family="${y}" font-size="30" font-weight="900" fill="#ffffff" text-anchor="middle">a</text>
    ${C(70,108,320,80,3,1)}

    ${T(464,44)}
    <text x="464" y="53" font-family="${y}" font-size="30" font-weight="900" fill="#ffffff" text-anchor="middle">b</text>
    ${w(634,150,104,6,5)}

    ${T(44,324)}
    <text x="44" y="333" font-family="${y}" font-size="30" font-weight="900" fill="#ffffff" text-anchor="middle">c</text>
    ${pe(232,424,196,[0,1,2])}

    ${T(464,324)}
    <text x="464" y="333" font-family="${y}" font-size="30" font-weight="900" fill="#ffffff" text-anchor="middle">d</text>
    ${C(490,388,320,80,6,2)}
  </svg>`,ANS_34:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 320" class="w-full h-full">
    ${x(720,320)}
    ${ge(192,!0,v)}
    <text x="440" y="140" font-family="${y}" font-size="120" font-weight="900" fill="${v}" text-anchor="middle">3</text>
    ${S(440,166,120,v,9)}
    <text x="440" y="288" font-family="${y}" font-size="120" font-weight="900" fill="${v}" text-anchor="middle">4</text>
  </svg>`,ANS_46:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 320" class="w-full h-full">
    ${x(720,320)}
    ${ge(528,!1,m)}
    <text x="280" y="140" font-family="${y}" font-size="120" font-weight="900" fill="${m}" text-anchor="middle">4</text>
    ${S(280,166,120,m,9)}
    <text x="280" y="288" font-family="${y}" font-size="120" font-weight="900" fill="${m}" text-anchor="middle">6</text>
  </svg>`,ADD_OR_TIMES:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${x(840,560)}
    <text x="72" y="76" font-family="${y}" font-size="44" font-weight="900" fill="${p}" text-anchor="middle">2</text>
    ${S(72,90,40)}
    <text x="72" y="134" font-family="${y}" font-size="44" font-weight="900" fill="${p}" text-anchor="middle">3</text>
    ${C(140,52,620,70,3,2)}

    <text x="72" y="226" font-family="${y}" font-size="44" font-weight="900" fill="${p}" text-anchor="middle">4</text>
    ${S(72,240,40)}
    <text x="72" y="284" font-family="${y}" font-size="44" font-weight="900" fill="${p}" text-anchor="middle">6</text>
    ${C(140,202,620,70,6,4)}
    ${me(802,237)}
    <text x="140" y="312" font-family="${y}" font-size="30" font-weight="900" fill="${_}">× 2 top and bottom</text>

    <text x="72" y="376" font-family="${y}" font-size="44" font-weight="900" fill="${p}" text-anchor="middle">3</text>
    ${S(72,390,40)}
    <text x="72" y="434" font-family="${y}" font-size="44" font-weight="900" fill="${p}" text-anchor="middle">4</text>
    ${C(140,352,620,70,4,3)}
    ${he(802,387)}
    <text x="140" y="462" font-family="${y}" font-size="30" font-weight="900" fill="${te}">+ 1 top and bottom</text>

    <line x1="553" y1="36" x2="553" y2="440" stroke="${m}" stroke-width="4" stroke-dasharray="10 8"/>
    <text x="553" y="512" font-family="${y}" font-size="28" font-weight="900" fill="${m}" text-anchor="middle">the same amount ends here</text>
  </svg>`,IMPROPER_MIXED:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${x(840,560)}
    <text x="250" y="108" font-family="${y}" font-size="96" font-weight="900" fill="${p}" text-anchor="middle">11</text>
    ${S(250,132,124,p,8)}
    <text x="250" y="228" font-family="${y}" font-size="96" font-weight="900" fill="${p}" text-anchor="middle">4</text>
    <text x="410" y="168" font-family="${y}" font-size="90" font-weight="900" fill="${p}" text-anchor="middle">=</text>
    <text x="528" y="202" font-family="${y}" font-size="150" font-weight="900" fill="${p}" text-anchor="middle">2</text>
    <text x="616" y="126" font-family="${y}" font-size="64" font-weight="900" fill="${p}" text-anchor="middle">3</text>
    ${S(616,144,50,p,6)}
    <text x="616" y="202" font-family="${y}" font-size="64" font-weight="900" fill="${p}" text-anchor="middle">4</text>
    <text x="250" y="276" font-family="${y}" font-size="28" font-weight="900" fill="${m}" text-anchor="middle">improper fraction</text>
    <text x="566" y="276" font-family="${y}" font-size="28" font-weight="900" fill="${m}" text-anchor="middle">mixed number</text>

    ${w(142,400,84,4,4,`pizza`)}
    ${w(340,400,84,4,4,`pizza`)}
    ${w(616,400,84,4,3,`pizza`)}
    ${ve(52,430,504)}
    ${ve(526,706,504)}
    <text x="241" y="538" font-family="${y}" font-size="28" font-weight="900" fill="${m}" text-anchor="middle">whole-number part: 2</text>
    <text x="616" y="538" font-family="${y}" font-size="28" font-weight="900" fill="${m}" text-anchor="middle">fractional part: 3/4</text>
  </svg>`,BOTH_WAYS:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${x(840,560)}
    <text x="30" y="46" font-family="${y}" font-size="24" font-weight="900" fill="${h}" letter-spacing="2">IMPROPER → MIXED: DIVIDE</text>
    <text x="30" y="104" font-family="${y}" font-size="40" font-weight="900" fill="${p}">11 ÷ 4 = 2 remainder 3</text>
    ${w(84,186,50,4,4,`pizza`)}
    ${w(200,186,50,4,4,`pizza`)}
    ${w(360,186,50,4,3,`pizza`)}
    <text x="142" y="266" font-family="${y}" font-size="26" font-weight="700" fill="${h}" text-anchor="middle">2 wholes</text>
    <text x="360" y="266" font-family="${y}" font-size="26" font-weight="700" fill="${h}" text-anchor="middle">3 quarters left over</text>
    ${ye(462,168,584)}
    <text x="654" y="216" font-family="${y}" font-size="130" font-weight="900" fill="${p}" text-anchor="middle">2</text>
    <text x="738" y="150" font-family="${y}" font-size="56" font-weight="900" fill="${p}" text-anchor="middle">3</text>
    ${S(738,166,44,p,6)}
    <text x="738" y="216" font-family="${y}" font-size="56" font-weight="900" fill="${p}" text-anchor="middle">4</text>

    <line x1="30" y1="296" x2="810" y2="296" stroke="${g}" stroke-width="2"/>

    <text x="30" y="338" font-family="${y}" font-size="24" font-weight="900" fill="${h}" letter-spacing="2">MIXED → IMPROPER: MULTIPLY, THEN ADD</text>
    <text x="88" y="486" font-family="${y}" font-size="130" font-weight="900" fill="${p}" text-anchor="middle">2</text>
    <text x="172" y="420" font-family="${y}" font-size="56" font-weight="900" fill="${p}" text-anchor="middle">3</text>
    ${S(172,436,44,p,6)}
    <text x="172" y="486" font-family="${y}" font-size="56" font-weight="900" fill="${p}" text-anchor="middle">4</text>
    <text x="250" y="418" font-family="${y}" font-size="32" font-weight="900" fill="${p}">2 × 4 = 8 quarters</text>
    <text x="250" y="472" font-family="${y}" font-size="32" font-weight="900" fill="${p}">8 + 3 = 11 quarters</text>
    ${ye(596,440,680)}
    <text x="756" y="424" font-family="${y}" font-size="64" font-weight="900" fill="${p}" text-anchor="middle">11</text>
    ${S(756,444,82,p,6)}
    <text x="756" y="508" font-family="${y}" font-size="64" font-weight="900" fill="${p}" text-anchor="middle">4</text>
  </svg>`,ANS_134:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 320" class="w-full h-full">
    ${x(720,320)}
    ${ge(192,!0,v)}
    <text x="440" y="140" font-family="${y}" font-size="120" font-weight="900" fill="${v}" text-anchor="middle">13</text>
    ${S(440,166,150,v,9)}
    <text x="440" y="288" font-family="${y}" font-size="120" font-weight="900" fill="${v}" text-anchor="middle">4</text>
  </svg>`,ANS_312:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 320" class="w-full h-full">
    ${x(720,320)}
    ${ge(528,!1,m)}
    <text x="228" y="232" font-family="${y}" font-size="180" font-weight="900" fill="${m}" text-anchor="middle">3</text>
    <text x="338" y="140" font-family="${y}" font-size="80" font-weight="900" fill="${m}" text-anchor="middle">1</text>
    ${S(338,162,62,m,7)}
    <text x="338" y="236" font-family="${y}" font-size="80" font-weight="900" fill="${m}" text-anchor="middle">2</text>
  </svg>`,NUMBER_LINE:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1120 440" class="w-full h-full">
    ${x(1120,440)}
    <rect x="60" y="221" width="812.5" height="18" fill="${v}" opacity="0.22"/>
    ${_e(60,230,250,4)}
    <text x="60" y="304" font-family="${y}" font-size="44" font-weight="900" fill="${p}" text-anchor="middle">0</text>
    <text x="310" y="304" font-family="${y}" font-size="44" font-weight="900" fill="${p}" text-anchor="middle">1</text>
    <text x="560" y="304" font-family="${y}" font-size="44" font-weight="900" fill="${p}" text-anchor="middle">2</text>
    <text x="810" y="304" font-family="${y}" font-size="44" font-weight="900" fill="${p}" text-anchor="middle">3</text>
    <text x="1060" y="304" font-family="${y}" font-size="44" font-weight="900" fill="${p}" text-anchor="middle">4</text>

    <text x="620" y="96" font-family="${y}" font-size="52" font-weight="900" fill="${v}" text-anchor="middle">13</text>
    ${S(620,112,66,v,6)}
    <text x="620" y="162" font-family="${y}" font-size="52" font-weight="900" fill="${v}" text-anchor="middle">4</text>
    <text x="668" y="146" font-family="${y}" font-size="46" font-weight="900" fill="${v}">= 3¼</text>
    <line x1="790" y1="164" x2="868" y2="216" stroke="${v}" stroke-width="4"/>
    <circle cx="872.5" cy="230" r="13" fill="${v}" stroke="#ffffff" stroke-width="3"/>

    <text x="990" y="162" font-family="${y}" font-size="80" font-weight="900" fill="${m}" text-anchor="middle">3</text>
    <text x="1046" y="114" font-family="${y}" font-size="40" font-weight="900" fill="${m}" text-anchor="middle">1</text>
    ${S(1046,126,30,m,5)}
    <text x="1046" y="164" font-family="${y}" font-size="40" font-weight="900" fill="${m}" text-anchor="middle">2</text>
    <line x1="988" y1="176" x2="940" y2="216" stroke="${m}" stroke-width="4"/>
    <circle cx="935" cy="230" r="13" fill="${m}" stroke="#ffffff" stroke-width="3"/>

    ${ve(60,872,352)}
    <text x="466" y="396" font-family="${y}" font-size="30" font-weight="900" fill="${h}" text-anchor="middle">13 quarters</text>
  </svg>`,FILL_BOX:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${x(840,560)}
    ${T(46,112,_)}
    <text x="46" y="121" font-family="${y}" font-size="30" font-weight="900" fill="#ffffff" text-anchor="middle">a</text>
    <text x="130" y="98" font-family="${y}" font-size="60" font-weight="900" fill="${p}" text-anchor="middle">3</text>
    ${S(130,112,52,p,6)}
    <text x="130" y="166" font-family="${y}" font-size="60" font-weight="900" fill="${p}" text-anchor="middle">5</text>
    <text x="205" y="132" font-family="${y}" font-size="56" font-weight="900" fill="${p}" text-anchor="middle">=</text>
    ${E(259,52)}
    ${S(285,112,82,p,6)}
    <text x="285" y="166" font-family="${y}" font-size="60" font-weight="900" fill="${p}" text-anchor="middle">10</text>

    ${T(456,112,_)}
    <text x="456" y="121" font-family="${y}" font-size="30" font-weight="900" fill="#ffffff" text-anchor="middle">b</text>
    <text x="540" y="98" font-family="${y}" font-size="60" font-weight="900" fill="${p}" text-anchor="middle">2</text>
    ${S(540,112,52,p,6)}
    <text x="540" y="166" font-family="${y}" font-size="60" font-weight="900" fill="${p}" text-anchor="middle">7</text>
    <text x="615" y="132" font-family="${y}" font-size="56" font-weight="900" fill="${p}" text-anchor="middle">=</text>
    ${E(669,52)}
    ${S(695,112,82,p,6)}
    <text x="695" y="166" font-family="${y}" font-size="60" font-weight="900" fill="${p}" text-anchor="middle">21</text>

    ${T(46,276,_)}
    <text x="46" y="285" font-family="${y}" font-size="30" font-weight="900" fill="#ffffff" text-anchor="middle">c</text>
    <text x="130" y="262" font-family="${y}" font-size="60" font-weight="900" fill="${p}" text-anchor="middle">5</text>
    ${S(130,276,52,p,6)}
    <text x="130" y="330" font-family="${y}" font-size="60" font-weight="900" fill="${p}" text-anchor="middle">6</text>
    <text x="205" y="296" font-family="${y}" font-size="56" font-weight="900" fill="${p}" text-anchor="middle">=</text>
    <text x="285" y="262" font-family="${y}" font-size="60" font-weight="900" fill="${p}" text-anchor="middle">20</text>
    ${S(285,276,82,p,6)}
    ${E(259,284)}

    ${T(456,276,_)}
    <text x="456" y="285" font-family="${y}" font-size="30" font-weight="900" fill="#ffffff" text-anchor="middle">d</text>
    <text x="548" y="262" font-family="${y}" font-size="60" font-weight="900" fill="${p}" text-anchor="middle">12</text>
    ${S(548,276,82,p,6)}
    <text x="548" y="330" font-family="${y}" font-size="60" font-weight="900" fill="${p}" text-anchor="middle">16</text>
    <text x="628" y="296" font-family="${y}" font-size="56" font-weight="900" fill="${p}" text-anchor="middle">=</text>
    ${E(678,216)}
    ${S(704,276,64,p,6)}
    <text x="704" y="330" font-family="${y}" font-size="60" font-weight="900" fill="${p}" text-anchor="middle">4</text>

    <line x1="24" y1="372" x2="816" y2="372" stroke="${g}" stroke-width="2"/>

    ${T(46,462,_)}
    <text x="46" y="471" font-family="${y}" font-size="30" font-weight="900" fill="#ffffff" text-anchor="middle">e</text>
    <text x="130" y="448" font-family="${y}" font-size="60" font-weight="900" fill="${p}" text-anchor="middle">3</text>
    ${S(130,462,52,p,6)}
    <text x="130" y="516" font-family="${y}" font-size="60" font-weight="900" fill="${p}" text-anchor="middle">4</text>
    ${E(190,438)}
    <text x="300" y="448" font-family="${y}" font-size="60" font-weight="900" fill="${p}" text-anchor="middle">9</text>
    ${S(300,462,82,p,6)}
    <text x="300" y="516" font-family="${y}" font-size="60" font-weight="900" fill="${p}" text-anchor="middle">12</text>

    ${T(456,462,_)}
    <text x="456" y="471" font-family="${y}" font-size="30" font-weight="900" fill="#ffffff" text-anchor="middle">f</text>
    <text x="540" y="448" font-family="${y}" font-size="60" font-weight="900" fill="${p}" text-anchor="middle">2</text>
    ${S(540,462,52,p,6)}
    <text x="540" y="516" font-family="${y}" font-size="60" font-weight="900" fill="${p}" text-anchor="middle">5</text>
    ${E(600,438)}
    <text x="710" y="448" font-family="${y}" font-size="60" font-weight="900" fill="${p}" text-anchor="middle">3</text>
    ${S(710,462,52,p,6)}
    <text x="710" y="516" font-family="${y}" font-size="60" font-weight="900" fill="${p}" text-anchor="middle">6</text>
  </svg>`,CHANGE_THESE:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${x(840,560)}
    ${T(52,150,_)}
    <text x="52" y="159" font-family="${y}" font-size="30" font-weight="900" fill="#ffffff" text-anchor="middle">a</text>
    <text x="126" y="136" font-family="${y}" font-size="64" font-weight="900" fill="${p}" text-anchor="middle">9</text>
    ${S(126,150,54,p,6)}
    <text x="126" y="208" font-family="${y}" font-size="64" font-weight="900" fill="${p}" text-anchor="middle">4</text>

    ${T(252,150,_)}
    <text x="252" y="159" font-family="${y}" font-size="30" font-weight="900" fill="#ffffff" text-anchor="middle">b</text>
    <text x="334" y="136" font-family="${y}" font-size="64" font-weight="900" fill="${p}" text-anchor="middle">13</text>
    ${S(334,150,86,p,6)}
    <text x="334" y="208" font-family="${y}" font-size="64" font-weight="900" fill="${p}" text-anchor="middle">5</text>

    ${T(452,150,_)}
    <text x="452" y="159" font-family="${y}" font-size="30" font-weight="900" fill="#ffffff" text-anchor="middle">c</text>
    <text x="534" y="136" font-family="${y}" font-size="64" font-weight="900" fill="${p}" text-anchor="middle">17</text>
    ${S(534,150,86,p,6)}
    <text x="534" y="208" font-family="${y}" font-size="64" font-weight="900" fill="${p}" text-anchor="middle">3</text>

    ${T(652,150,_)}
    <text x="652" y="159" font-family="${y}" font-size="30" font-weight="900" fill="#ffffff" text-anchor="middle">d</text>
    <text x="734" y="136" font-family="${y}" font-size="64" font-weight="900" fill="${p}" text-anchor="middle">23</text>
    ${S(734,150,86,p,6)}
    <text x="734" y="208" font-family="${y}" font-size="64" font-weight="900" fill="${p}" text-anchor="middle">10</text>

    <line x1="24" y1="290" x2="816" y2="290" stroke="${g}" stroke-width="2"/>

    ${T(52,420,_)}
    <text x="52" y="429" font-family="${y}" font-size="30" font-weight="900" fill="#ffffff" text-anchor="middle">e</text>
    <text x="126" y="456" font-family="${y}" font-size="100" font-weight="900" fill="${p}" text-anchor="middle">3</text>
    <text x="194" y="406" font-family="${y}" font-size="52" font-weight="900" fill="${p}" text-anchor="middle">1</text>
    ${S(194,420,44,p,5)}
    <text x="194" y="466" font-family="${y}" font-size="52" font-weight="900" fill="${p}" text-anchor="middle">2</text>

    ${T(322,420,_)}
    <text x="322" y="429" font-family="${y}" font-size="30" font-weight="900" fill="#ffffff" text-anchor="middle">f</text>
    <text x="396" y="456" font-family="${y}" font-size="100" font-weight="900" fill="${p}" text-anchor="middle">2</text>
    <text x="464" y="406" font-family="${y}" font-size="52" font-weight="900" fill="${p}" text-anchor="middle">3</text>
    ${S(464,420,44,p,5)}
    <text x="464" y="466" font-family="${y}" font-size="52" font-weight="900" fill="${p}" text-anchor="middle">5</text>

    ${T(592,420,_)}
    <text x="592" y="429" font-family="${y}" font-size="30" font-weight="900" fill="#ffffff" text-anchor="middle">g</text>
    <text x="666" y="456" font-family="${y}" font-size="100" font-weight="900" fill="${p}" text-anchor="middle">4</text>
    <text x="734" y="406" font-family="${y}" font-size="52" font-weight="900" fill="${p}" text-anchor="middle">2</text>
    ${S(734,420,44,p,5)}
    <text x="734" y="466" font-family="${y}" font-size="52" font-weight="900" fill="${p}" text-anchor="middle">3</text>
  </svg>`,DRAW_THIS:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${x(840,560)}
    <text x="90" y="92" font-family="${y}" font-size="64" font-weight="900" fill="${p}" text-anchor="middle">11</text>
    ${S(90,110,84,p,6)}
    <text x="90" y="172" font-family="${y}" font-size="64" font-weight="900" fill="${p}" text-anchor="middle">4</text>
    <text x="182" y="146" font-family="${y}" font-size="60" font-weight="900" fill="${p}" text-anchor="middle">=</text>
    <text x="268" y="168" font-family="${y}" font-size="110" font-weight="900" fill="${p}" text-anchor="middle">2</text>
    <text x="338" y="110" font-family="${y}" font-size="48" font-weight="900" fill="${p}" text-anchor="middle">3</text>
    ${S(338,124,40,p,5)}
    <text x="338" y="168" font-family="${y}" font-size="48" font-weight="900" fill="${p}" text-anchor="middle">4</text>
    <text x="430" y="130" font-family="${y}" font-size="30" font-weight="900" fill="${ee}">11 ÷ 4 = 2 remainder 3</text>

    ${w(110,292,72,4,4,`pizza`)}
    ${w(274,292,72,4,4,`pizza`)}
    ${w(470,292,72,4,3,`pizza`)}

    ${_e(60,462,240,3)}
    <text x="60" y="524" font-family="${y}" font-size="34" font-weight="900" fill="${p}" text-anchor="middle">0</text>
    <text x="300" y="524" font-family="${y}" font-size="34" font-weight="900" fill="${p}" text-anchor="middle">1</text>
    <text x="540" y="524" font-family="${y}" font-size="34" font-weight="900" fill="${p}" text-anchor="middle">2</text>
    <text x="780" y="524" font-family="${y}" font-size="34" font-weight="900" fill="${p}" text-anchor="middle">3</text>
    <circle cx="720" cy="462" r="13" fill="${m}" stroke="#ffffff" stroke-width="3"/>
    <text x="720" y="418" font-family="${y}" font-size="40" font-weight="900" fill="${m}" text-anchor="middle">2¾</text>
  </svg>`},O=e(n(),1),k=e=>Math.round(e*10)/10,be=(e,t,n)=>Math.max(String(e).length,String(t).length)*n*.62+n*.25,xe=(e,t,n,r)=>String(e).length*r*1.45*.6+be(t,n,r*.62)+r*.04,A=i(),j=`Inter, 'Segoe UI', system-ui, sans-serif`,M=`#2b2b2b`,N=`#5b6770`,Se=`#cfd8dc`,P=`#c25e12`,F=`#1a5fa8`,Ce=`#2f6b12`,we=`#c8102e`,Te=`#6cbfd4`,Ee=`#e4f1da`,De=`#d9963f`,Oe=`#ffd66e`,ke=`#c8442f`,I=e=>e*Math.PI/180;function L({x:e,y:t,top:n,bottom:r,size:i=80,fill:a=M,weight:o=900}){let s=be(n,r,i);return(0,A.jsxs)(`g`,{children:[(0,A.jsx)(`text`,{x:e,y:t-i*.22,fontFamily:j,fontSize:i,fontWeight:o,fill:a,textAnchor:`middle`,children:n}),(0,A.jsx)(`line`,{x1:k(e-s/2),y1:t,x2:k(e+s/2),y2:t,stroke:a,strokeWidth:Math.max(3,i/14),strokeLinecap:`round`}),(0,A.jsx)(`text`,{x:e,y:t+i*.86,fontFamily:j,fontSize:i,fontWeight:o,fill:a,textAnchor:`middle`,children:r})]})}function Ae({x:e,y:t,whole:n,top:r,bottom:i,size:a=80,fill:o=M}){let s=a*1.45,c=String(n).length*s*.6,l=a*.62,u=e+c+be(r,i,l)/2+a*.04;return(0,A.jsxs)(`g`,{children:[(0,A.jsx)(`text`,{x:e,y:t+s*.36,fontFamily:j,fontSize:s,fontWeight:`900`,fill:o,children:n}),(0,A.jsx)(L,{x:u,y:t,top:r,bottom:i,size:l,fill:o})]})}function je({x:e,y:t,w:n,h:r,n:i,k:a,fill:o=Te,groups:s=0,cutColour:c=P,strong:l=5}){let u=n/i,d=s?i/s:0;return(0,A.jsxs)(`g`,{children:[Array.from({length:i},(n,i)=>(0,A.jsx)(`rect`,{x:k(e+i*u),y:t,width:k(u),height:r,fill:i<a?o:`#ffffff`},`p${i}`)),Array.from({length:i-1},(n,i)=>{let a=i+1,o=d&&a%d===0;return(0,A.jsx)(`line`,{x1:k(e+a*u),y1:t,x2:k(e+a*u),y2:t+r,stroke:d&&!o?c:M,strokeWidth:d&&!o?3.5:l*.8},`l${a}`)}),(0,A.jsx)(`rect`,{x:e,y:t,width:n,height:r,fill:`none`,stroke:M,strokeWidth:l})]})}function Me(e,t,n,r,i){let a=r=>`${k(e+n*Math.cos(I(r)))} ${k(t+n*Math.sin(I(r)))}`;return`M ${e} ${t} L ${a(r)} A ${n} ${n} 0 ${+(i-r>180)} 1 ${a(i)} Z`}function Ne({cx:e,cy:t,r:n,n:r,k:i,style:a=`shade`,groups:o=0,cutColour:s=P}){let c=360/r,l=o?r/o:0,u=Array.from({length:r},(r,o)=>{let s=-90+o*c,l=s+c,u=(s+l)/2;return a===`pizza`?o<i?(0,A.jsxs)(`g`,{children:[(0,A.jsx)(`path`,{d:Me(e,t,n,s,l),fill:De,stroke:M,strokeWidth:`3`,strokeLinejoin:`round`}),(0,A.jsx)(`path`,{d:Me(e,t,n*.84,s+1,l-1),fill:Oe}),(0,A.jsx)(`circle`,{cx:k(e+n*.52*Math.cos(I(u))),cy:k(t+n*.52*Math.sin(I(u))),r:k(n*.11),fill:ke})]},o):(0,A.jsx)(`path`,{d:Me(e,t,n,s,l),fill:`#f6f7f8`,stroke:`#9aa5b1`,strokeWidth:`2.5`,strokeDasharray:`7 6`,strokeLinejoin:`round`},o):(0,A.jsx)(`path`,{d:Me(e,t,n,s,l),fill:o<i?Te:`#ffffff`},o)});return a===`pizza`?(0,A.jsx)(`g`,{children:u}):(0,A.jsxs)(`g`,{children:[u,Array.from({length:r},(r,i)=>{let a=-90+i*c,o=!l||i%l===0;return(0,A.jsx)(`line`,{x1:e,y1:t,x2:k(e+n*Math.cos(I(a))),y2:k(t+n*Math.sin(I(a))),stroke:o?M:s,strokeWidth:o?5:3.5,strokeLinecap:`round`},`c${i}`)}),(0,A.jsx)(`circle`,{cx:e,cy:t,r:n,fill:`none`,stroke:M,strokeWidth:`5`})]})}var Pe=(e,t,n)=>c(e,t,null,n),Fe=5;function Ie(e,t,n,r){return`M ${e} ${n} Q ${(e+t)/2} ${n+r*2} ${t} ${n}`}function Le({lang:e=`en`,isDisplayMode:n=!1}){let[i,o]=(0,O.useState)(1),s=n,c=3*i,u=4*i,d=i>1;return(0,A.jsxs)(`div`,{className:`w-full h-full flex flex-col gap-3 select-none`,children:[(0,A.jsx)(`div`,{className:`flex-1 min-h-0 w-full`,children:(0,A.jsxs)(`svg`,{viewBox:`0 0 1500 520`,className:`w-full h-full`,preserveAspectRatio:`xMidYMid meet`,children:[(0,A.jsx)(`rect`,{x:`0`,y:`0`,width:`1500`,height:`520`,rx:`16`,fill:`#ffffff`}),(0,A.jsx)(`defs`,{children:(0,A.jsx)(`marker`,{id:`cut-arrow`,viewBox:`0 0 10 10`,refX:`8`,refY:`5`,markerUnits:`userSpaceOnUse`,markerWidth:`18`,markerHeight:`18`,orient:`auto`,children:(0,A.jsx)(`path`,{d:`M 0 0 L 10 5 L 0 10 z`,fill:P})})}),(0,A.jsx)(L,{x:140,y:196,top:3,bottom:4,size:120}),d&&(0,A.jsxs)(`g`,{children:[(0,A.jsx)(`text`,{x:292,y:232,fontFamily:`Inter, 'Segoe UI', system-ui, sans-serif`,fontSize:`110`,fontWeight:`900`,fill:`#2b2b2b`,textAnchor:`middle`,children:`=`}),(0,A.jsx)(L,{x:470,y:196,top:c,bottom:u,size:120,fill:`#0087a8`}),(0,A.jsx)(`path`,{d:Ie(176,430,74,-22),fill:`none`,stroke:`#c25e12`,strokeWidth:`5`,markerEnd:`url(#cut-arrow)`}),(0,A.jsxs)(`text`,{x:303,y:40,fontFamily:`Inter, 'Segoe UI', system-ui, sans-serif`,fontSize:`34`,fontWeight:`900`,fill:`#c25e12`,textAnchor:`middle`,children:[`× `,i]}),(0,A.jsx)(`path`,{d:Ie(176,430,354,20),fill:`none`,stroke:`#c25e12`,strokeWidth:`5`,markerEnd:`url(#cut-arrow)`}),(0,A.jsxs)(`text`,{x:303,y:418,fontFamily:`Inter, 'Segoe UI', system-ui, sans-serif`,fontSize:`34`,fontWeight:`900`,fill:`#c25e12`,textAnchor:`middle`,children:[`× `,i]})]}),!d&&(0,A.jsx)(`text`,{x:300,y:214,fontFamily:`Inter, 'Segoe UI', system-ui, sans-serif`,fontSize:`32`,fontWeight:`800`,fill:`#5b6770`,children:Pe(e,`3 pieces of 4`,`3 morceaux sur 4`)}),(0,A.jsx)(Ne,{cx:1250,cy:214,r:180,n:u,k:c,groups:4}),(0,A.jsx)(je,{x:60,y:440,w:1380,h:62,n:u,k:c,groups:4})]})}),(0,A.jsxs)(`div`,{className:`shrink-0 flex items-center justify-center gap-3 flex-wrap`,children:[(0,A.jsx)(l,{big:s,tone:`slate`,icon:t,disabled:i===1,onClick:()=>o(e=>Math.max(1,e-1)),children:Pe(e,`Back`,`Retour`)}),(0,A.jsx)(l,{big:s,tone:`orange`,icon:r,disabled:i===Fe,onClick:()=>o(e=>Math.min(Fe,e+1)),children:Pe(e,`Cut each quarter into ${Math.min(Fe,i+1)}`,`Coupe chaque quart en ${Math.min(Fe,i+1)}`)}),(0,A.jsx)(l,{big:s,tone:`teal`,icon:a,disabled:i===1,onClick:()=>o(1),children:Pe(e,`Start again`,`Recommencer`)})]})]})}var R=(e,t,n)=>c(e,t,null,n),Re=[[1,`one whole`,`un entier`],[2,`halves`,`demis`],[3,`thirds`,`tiers`],[4,`quarters`,`quarts`],[6,`sixths`,`sixièmes`],[8,`eighths`,`huitièmes`],[12,`twelfths`,`douzièmes`]],ze=[[1,2],[1,3],[2,3],[3,4]],Be=230,Ve=900,He=26,Ue=62;function We({lang:e=`en`,isDisplayMode:t=!1}){let[n,r]=(0,O.useState)(null),i=t,a=n==null?null:ze[n],s=a?Re.filter(([e])=>e%a[1]===0):[];return(0,A.jsxs)(`div`,{className:`w-full h-full flex flex-col gap-3 select-none`,children:[(0,A.jsx)(`div`,{className:`flex-1 min-h-0 w-full`,children:(0,A.jsxs)(`svg`,{viewBox:`0 0 1500 520`,className:`w-full h-full`,preserveAspectRatio:`xMidYMid meet`,children:[(0,A.jsx)(`rect`,{x:`0`,y:`0`,width:`1500`,height:`520`,rx:`16`,fill:`#ffffff`}),Re.map(([t,n,r],i)=>{let o=He+i*68,s=a&&t%a[1]===0,c=s?t/a[1]*a[0]:0,l=a&&!s,u=Ve/t;return(0,A.jsxs)(`g`,{children:[(0,A.jsx)(`text`,{x:212,y:o+Ue/2+10,fontFamily:j,fontSize:`28`,fontWeight:`800`,fill:l?`#a7b1ba`:N,textAnchor:`end`,children:R(e,n,r)}),Array.from({length:t},(e,t)=>(0,A.jsx)(`rect`,{x:Be+t*u,y:o,width:u,height:Ue,fill:t<c?Te:l?`#f1f3f5`:`#ffffff`,stroke:l?`#c9d1d8`:M,strokeWidth:l?2:3},t))]},t)}),a&&(0,A.jsx)(`line`,{x1:Be+Ve*a[0]/a[1],y1:12,x2:Be+Ve*a[0]/a[1],y2:He+Re.length*68+4,stroke:`#c25e12`,strokeWidth:`6`,strokeDasharray:`14 9`}),(0,A.jsx)(`rect`,{x:`1180`,y:`26`,width:`296`,height:`468`,rx:`18`,fill:`#f8fafb`,stroke:`#dfe5ea`,strokeWidth:`2`}),!a&&(0,A.jsxs)(`g`,{children:[(0,A.jsx)(`text`,{x:`1328`,y:`236`,fontFamily:`Inter, 'Segoe UI', system-ui, sans-serif`,fontSize:`30`,fontWeight:`900`,fill:`#5b6770`,textAnchor:`middle`,children:R(e,`Find them`,`Trouve-les`)}),(0,A.jsx)(`text`,{x:`1328`,y:`276`,fontFamily:`Inter, 'Segoe UI', system-ui, sans-serif`,fontSize:`30`,fontWeight:`900`,fill:`#5b6770`,textAnchor:`middle`,children:R(e,`first.`,`d’abord.`)})]}),a&&s.filter(([e])=>e!==a[1]).map(([e],t)=>{let n=e/a[1]*a[0],r=t%2,i=Math.floor(t/2);return(0,A.jsx)(L,{x:1265+r*128,y:232+i*132,top:n,bottom:e,size:52},e)}),a&&(0,A.jsxs)(`g`,{children:[(0,A.jsx)(L,{x:1278,y:102,top:a[0],bottom:a[1],size:52,fill:`#c25e12`}),(0,A.jsx)(`text`,{x:`1340`,y:`118`,fontFamily:`Inter, 'Segoe UI', system-ui, sans-serif`,fontSize:`52`,fontWeight:`900`,fill:`#c25e12`,children:`=`})]})]})}),(0,A.jsxs)(`div`,{className:`shrink-0 flex items-center justify-center gap-3 flex-wrap`,children:[ze.map(([t,a],o)=>(0,A.jsx)(l,{big:i,tone:n===o?`orange`:`blue`,onClick:()=>r(o),children:R(e,`Line at ${t}/${a}`,`Ligne à ${t}/${a}`)},o)),(0,A.jsx)(l,{big:i,tone:`slate`,icon:o,disabled:n==null,onClick:()=>r(null),children:R(e,`Clear`,`Effacer`)})]})]})}var z=(e,t,n)=>c(e,t,null,n),B=380,Ge=400,Ke=20,qe=e=>30+e*400,V=395,Je=`#f6f1e7`,Ye=`#e9d3a6`,Xe=`#a9864f`,Ze=.5,Qe=[[[`Mr Bowen has a party.`,`He orders 3 pizzas.`],[`M. Bowen fait une fête.`,`Il commande 3 pizzas.`]],[[`Each pizza: 4 slices.`,`(He counts them.)`],[`Chaque pizza\xA0: 4 parts.`,`(Il les compte.)`]],[[`Nobody comes.`,`(He waits 3 hours.)`],[`Personne ne vient.`,`(Il attend 3 heures.)`]],[[`He eats 11 slices.`,`(Not very hungry.)`],[`Il mange 11 parts.`,`(Pas très faim.)`]]],$e=4;function et({x:e}){return(0,A.jsxs)(`g`,{children:[(0,A.jsx)(`rect`,{x:e+34,y:291,width:`200`,height:`14`,rx:`3`,fill:`#b07a45`,stroke:`#6f4a25`,strokeWidth:`3`}),(0,A.jsx)(`line`,{x1:e+50,y1:305,x2:e+50,y2:V,stroke:`#6f4a25`,strokeWidth:`8`}),(0,A.jsx)(`line`,{x1:e+218,y1:305,x2:e+218,y2:V,stroke:`#6f4a25`,strokeWidth:`8`})]})}function tt({x:e}){return(0,A.jsx)(`g`,{children:[0,1,2].map(t=>(0,A.jsxs)(`g`,{children:[(0,A.jsx)(`rect`,{x:e+62,y:291-24*(t+1),width:`144`,height:`22`,rx:`3`,fill:Ye,stroke:Xe,strokeWidth:`3`}),(0,A.jsx)(`circle`,{cx:e+134,cy:291-24*(t+1)+11,r:`6`,fill:ke})]},t))})}function nt({x:e}){return(0,A.jsxs)(`g`,{children:[(0,A.jsx)(`line`,{x1:e+70,y1:132,x2:e+52,y2:291,stroke:`#8a95a0`,strokeWidth:`2`}),(0,A.jsx)(`line`,{x1:e+116,y1:118,x2:e+60,y2:291,stroke:`#8a95a0`,strokeWidth:`2`}),(0,A.jsx)(`ellipse`,{cx:e+70,cy:104,rx:`24`,ry:`30`,fill:`#e0474c`,stroke:M,strokeWidth:`2.5`}),(0,A.jsx)(`ellipse`,{cx:e+116,cy:90,rx:`24`,ry:`30`,fill:`#3d8be0`,stroke:M,strokeWidth:`2.5`})]})}function rt({x:e,mood:t=`happy`,handLeft:n,handRight:r}){return(0,A.jsx)(u,{x:e+318,y:V-268*Ze,scale:Ze,mood:t,handLeft:n,handRight:r})}function it({cx:e,cy:t,slices:n}){return(0,A.jsxs)(`g`,{children:[(0,A.jsx)(`rect`,{x:e-46,y:t-46,width:`92`,height:`92`,rx:`4`,fill:Ye,stroke:Xe,strokeWidth:`3`}),(0,A.jsx)(`rect`,{x:e-38,y:t-38,width:`76`,height:`76`,rx:`3`,fill:`#f6ead0`}),n>0?(0,A.jsx)(Ne,{cx:e,cy:t,r:34,n:4,k:n,style:`pizza`}):[[-12,-8],[9,6],[-4,14],[14,-12]].map(([n,r],i)=>(0,A.jsx)(`circle`,{cx:e+n,cy:t+r,r:`2.6`,fill:De},i))]})}function at({x:e}){return(0,A.jsxs)(`g`,{children:[(0,A.jsx)(nt,{x:e}),(0,A.jsx)(et,{x:e}),(0,A.jsx)(tt,{x:e}),(0,A.jsx)(rt,{x:e})]})}function ot({x:e}){return(0,A.jsxs)(`g`,{children:[(0,A.jsx)(Ne,{cx:e+140,cy:190,r:96,n:4,k:4,style:`pizza`}),[[1,50,-50],[2,50,50],[3,-50,50],[4,-50,-50]].map(([t,n,r])=>(0,A.jsxs)(`g`,{children:[(0,A.jsx)(`circle`,{cx:e+140+n,cy:190+r,r:`17`,fill:`#ffffff`,stroke:M,strokeWidth:`2.5`}),(0,A.jsx)(`text`,{x:e+140+n,y:197+r,fontFamily:j,fontSize:`20`,fontWeight:`900`,fill:M,textAnchor:`middle`,children:t})]},t)),(0,A.jsx)(rt,{x:e,handLeft:[-112,66]})]})}function st({x:e}){let t=e+96;return(0,A.jsxs)(`g`,{children:[(0,A.jsx)(`circle`,{cx:t,cy:106,r:`38`,fill:`#ffffff`,stroke:M,strokeWidth:`4`}),(0,A.jsx)(`line`,{x1:t,y1:106,x2:t,y2:80,stroke:M,strokeWidth:`4`,strokeLinecap:`round`}),(0,A.jsx)(`line`,{x1:t,y1:106,x2:t+20,y2:114,stroke:M,strokeWidth:`4`,strokeLinecap:`round`}),(0,A.jsx)(et,{x:e}),(0,A.jsx)(tt,{x:e}),(0,A.jsx)(rt,{x:e,mood:`sad`})]})}function ct({x:e}){return(0,A.jsxs)(`g`,{children:[(0,A.jsx)(it,{cx:e+76,cy:112,slices:0}),(0,A.jsx)(it,{cx:e+186,cy:112,slices:0}),(0,A.jsx)(it,{cx:e+131,cy:220,slices:1}),(0,A.jsx)(rt,{x:e,handRight:[-6,140]})]})}var lt=[at,ot,st,ct];function ut({lang:e=`en`,isDisplayMode:n=!1}){let[i,o]=(0,O.useState)(0),s=n,c=t=>e===`fr`?t[1]:t[0],u=i>=3;return(0,A.jsxs)(`div`,{className:`w-full h-full flex flex-col gap-3 select-none`,children:[(0,A.jsx)(`div`,{className:`flex-1 min-h-0 w-full`,children:(0,A.jsxs)(`svg`,{viewBox:`0 0 1640 610`,className:`w-full h-full`,preserveAspectRatio:`xMidYMid meet`,children:[(0,A.jsx)(`rect`,{x:`0`,y:`0`,width:`1640`,height:`610`,rx:`16`,fill:`#ffffff`}),(0,A.jsx)(`defs`,{children:lt.map((e,t)=>(0,A.jsx)(`clipPath`,{id:`party-p${t}`,children:(0,A.jsx)(`rect`,{x:qe(t),y:Ke,width:B,height:Ge,rx:`20`})},t))}),lt.map((e,t)=>{let n=qe(t),r=t<=i;return(0,A.jsxs)(`g`,{children:[(0,A.jsx)(`rect`,{x:n,y:Ke,width:B,height:Ge,rx:`20`,fill:r?Je:`#f4f6f8`}),r?(0,A.jsxs)(`g`,{clipPath:`url(#party-p${t})`,children:[(0,A.jsx)(`rect`,{x:n,y:V,width:B,height:25,fill:`#e4d6c1`}),(0,A.jsx)(`line`,{x1:n,y1:V,x2:n+B,y2:V,stroke:`#b9a68a`,strokeWidth:`3`}),(0,A.jsx)(e,{x:n})]}):(0,A.jsx)(`text`,{x:n+B/2,y:270,fontFamily:j,fontSize:`150`,fontWeight:`900`,fill:Se,textAnchor:`middle`,children:`?`}),(0,A.jsx)(`rect`,{x:n,y:Ke,width:B,height:Ge,rx:`20`,fill:`none`,stroke:r?`#c9d3dc`:Se,strokeWidth:`3`,strokeDasharray:r?void 0:`10 8`}),(0,A.jsx)(`circle`,{cx:n+32,cy:52,r:`22`,fill:r?F:Se}),(0,A.jsx)(`text`,{x:n+32,y:61,fontFamily:j,fontSize:`26`,fontWeight:`900`,fill:`#ffffff`,textAnchor:`middle`,children:t+1}),r&&(0,A.jsxs)(`g`,{children:[(0,A.jsx)(`text`,{x:n+B/2,y:460,fontFamily:`Inter, 'Segoe UI', system-ui, sans-serif`,fontSize:`28`,fontWeight:`900`,fill:`#2b2b2b`,textAnchor:`middle`,children:c(Qe[t])[0]}),(0,A.jsx)(`text`,{x:n+B/2,y:494,fontFamily:`Inter, 'Segoe UI', system-ui, sans-serif`,fontSize:`28`,fontWeight:`700`,fill:`#2b2b2b`,textAnchor:`middle`,children:c(Qe[t])[1]})]})]},t)}),u&&(0,A.jsxs)(`g`,{children:[(0,A.jsx)(`rect`,{x:`30`,y:`510`,width:`1580`,height:`94`,rx:`16`,fill:`#e2f2f6`,stroke:`#0087a8`,strokeWidth:`3`}),(0,A.jsx)(`text`,{x:`820`,y:i>=$e?548:568,fontFamily:`Inter, 'Segoe UI', system-ui, sans-serif`,fontSize:`32`,fontWeight:`900`,fill:`#2b2b2b`,textAnchor:`middle`,children:z(e,`How many pizzas did Mr Bowen eat?`,`Combien de pizzas M. Bowen a-t-il mangées\xA0?`)}),i>=$e&&(0,A.jsx)(`text`,{x:`820`,y:`590`,fontFamily:`Inter, 'Segoe UI', system-ui, sans-serif`,fontSize:`30`,fontWeight:`900`,fill:`#0087a8`,textAnchor:`middle`,children:z(e,`A clue: 4 slices make 1 whole pizza.`,`Un indice\xA0: 4 parts font 1 pizza entière.`)})]})]})}),(0,A.jsxs)(`div`,{className:`shrink-0 flex items-center justify-center gap-3 flex-wrap`,children:[(0,A.jsx)(l,{big:s,tone:`slate`,icon:t,disabled:i===0,onClick:()=>o(e=>Math.max(0,e-1)),children:z(e,`Back`,`Retour`)}),(0,A.jsx)(l,{big:s,tone:`orange`,icon:r,disabled:i===$e,onClick:()=>o(e=>Math.min($e,e+1)),children:i===3?z(e,`A clue`,`Un indice`):z(e,`What happens next?`,`Et ensuite\xA0?`)}),(0,A.jsx)(l,{big:s,tone:`teal`,icon:a,disabled:i===0,onClick:()=>o(0),children:z(e,`Start again`,`Recommencer`)})]})]})}var H=(e,t,n)=>c(e,t,null,n),dt=11,ft=[`zero`,`one`,`two`,`three`,`four`,`five`,`six`,`seven`,`eight`,`nine`,`ten`,`eleven`],pt=[`zéro`,`un`,`deux`,`trois`,`quatre`,`cinq`,`six`,`sept`,`huit`,`neuf`,`dix`,`onze`],U=120,mt=440,ht=440;function gt(e,t){let n=Math.floor(t/4),r=t%4,i=H(e,`${ft[t]} ${t===1?`quarter`:`quarters`}`,`${pt[t]} ${t===1?`quart`:`quarts`}`);return t<4?[i,null]:r===0?[i,H(e,n===1?`= one whole pizza`:`= two whole pizzas`,n===1?`= une pizza entière`:`= deux pizzas entières`)]:[i,H(e,`= ${ft[n]} and ${r===1?`a quarter`:`${ft[r]} quarters`}`,`= ${pt[n]} et ${pt[r]} ${r===1?`quart`:`quarts`}`)]}function _t({lang:e=`en`,isDisplayMode:n=!1}){let[i,o]=(0,O.useState)(1),s=n,c=Math.floor(i/4),u=i%4,[d,f]=gt(e,i),p=U+mt*i/4;return(0,A.jsxs)(`div`,{className:`w-full h-full flex flex-col gap-3 select-none`,children:[(0,A.jsx)(`div`,{className:`flex-1 min-h-0 w-full`,children:(0,A.jsxs)(`svg`,{viewBox:`0 0 1500 520`,className:`w-full h-full`,preserveAspectRatio:`xMidYMid meet`,children:[(0,A.jsx)(`rect`,{x:`0`,y:`0`,width:`1500`,height:`520`,rx:`16`,fill:`#ffffff`}),(0,A.jsx)(L,{x:120,y:168,top:i,bottom:4,size:110}),i>=4&&(0,A.jsxs)(`g`,{children:[(0,A.jsx)(`text`,{x:256,y:204,fontFamily:`Inter, 'Segoe UI', system-ui, sans-serif`,fontSize:`96`,fontWeight:`900`,fill:`#2b2b2b`,textAnchor:`middle`,children:`=`}),u===0?(0,A.jsx)(`text`,{x:316,y:226,fontFamily:`Inter, 'Segoe UI', system-ui, sans-serif`,fontSize:`160`,fontWeight:`900`,fill:`#0087a8`,children:c}):(0,A.jsx)(Ae,{x:316,y:168,whole:c,top:u,bottom:4,size:110,fill:`#0087a8`})]}),(0,A.jsx)(`text`,{x:40,y:330,fontFamily:j,fontSize:`32`,fontWeight:`800`,fill:N,children:d}),f&&(0,A.jsx)(`text`,{x:40,y:374,fontFamily:`Inter, 'Segoe UI', system-ui, sans-serif`,fontSize:`32`,fontWeight:`900`,fill:`#0087a8`,children:f}),[0,1,2].map(t=>{let n=Math.max(0,Math.min(4,i-4*t));return(0,A.jsxs)(`g`,{children:[(0,A.jsx)(Ne,{cx:760+t*270,cy:168,r:116,n:4,k:n,style:`pizza`}),n===4&&(0,A.jsx)(`text`,{x:760+t*270,y:322,fontFamily:`Inter, 'Segoe UI', system-ui, sans-serif`,fontSize:`26`,fontWeight:`900`,fill:`#0087a8`,textAnchor:`middle`,children:H(e,`1 whole`,`1 entière`)})]},t)}),(0,A.jsx)(`rect`,{x:U,y:431,width:p-U,height:`18`,fill:F,opacity:`0.22`}),(0,A.jsx)(`line`,{x1:106,y1:ht,x2:1454,y2:ht,stroke:M,strokeWidth:`5`,strokeLinecap:`round`}),Array.from({length:13},(e,t)=>{let n=U+mt*t/4,r=t%4==0;return(0,A.jsx)(`line`,{x1:n,y1:ht-(r?24:12),x2:n,y2:ht+(r?24:12),stroke:M,strokeWidth:r?5:3},t)}),[0,1,2,3].map(e=>(0,A.jsx)(`text`,{x:U+mt*e,y:502,fontFamily:j,fontSize:`36`,fontWeight:`900`,fill:M,textAnchor:`middle`,children:e},e)),(0,A.jsx)(`circle`,{cx:p,cy:ht,r:`15`,fill:P,stroke:`#ffffff`,strokeWidth:`3`})]})}),(0,A.jsxs)(`div`,{className:`shrink-0 flex items-center justify-center gap-3 flex-wrap`,children:[(0,A.jsx)(l,{big:s,tone:`slate`,icon:t,disabled:i===1,onClick:()=>o(e=>Math.max(1,e-1)),children:H(e,`Back`,`Retour`)}),(0,A.jsx)(l,{big:s,tone:`orange`,icon:r,disabled:i===dt,onClick:()=>o(e=>Math.min(dt,e+1)),children:H(e,`One more slice`,`Une part de plus`)}),(0,A.jsx)(l,{big:s,tone:`teal`,icon:a,disabled:i===1,onClick:()=>o(1),children:H(e,`Start again`,`Recommencer`)})]})]})}var W=(e,t,n)=>c(e,t,null,n),vt=`#9cc3ea`,yt=`#f3b98a`,G=(e,t)=>({n:e,d:t}),K=(e,t,n)=>({w:e,n:t,d:n}),q=e=>(e.w||0)*e.d+e.n,J=e=>e.w?`${e.w} ${e.n}/${e.d}`:`${e.n}/${e.d}`,bt=`\xA0`,xt=[`Adding 1 to the top and the bottom changes the amount.`,`Ajouter 1 en haut et en bas change la quantité.`],St=(e,t,n,r=`×`)=>[`${J(e)} = ${J(t)}: ${r} ${n} top and bottom.`,`${J(e)} = ${J(t)}${bt}: ${r} ${n} en haut et en bas.`],Y=(e,t,n)=>{let r=Math.floor(e.n/e.d),i=e.n%e.d,a=K(r,i,e.d);return n?[`${e.n} ÷ ${e.d} = ${r} remainder ${i}, so ${J(e)} = ${J(a)}, not ${J(t)}.`,`${e.n} ÷ ${e.d} = ${r} reste ${i}, donc ${J(e)} = ${J(a)}, pas ${J(t)}.`]:[`${e.n} ÷ ${e.d} = ${r} remainder ${i}, so ${J(e)} = ${J(t)}.`,`${e.n} ÷ ${e.d} = ${r} reste ${i}, donc ${J(e)} = ${J(t)}.`]},Ct=[{a:G(1,2),b:G(4,8),why:St(G(1,2),G(4,8),4)},{a:G(2,3),b:G(3,4),why:xt},{a:G(9,4),b:K(2,1,4),why:Y(G(9,4),K(2,1,4),!1)},{a:G(6,10),b:G(3,5),why:St(G(3,5),G(6,10),2)},{a:G(10,3),b:K(3,2,3),why:Y(G(10,3),K(3,2,3),!0)},{a:G(8,12),b:G(2,3),why:St(G(8,12),G(2,3),4,`÷`)},{a:G(3,8),b:G(4,9),why:xt},{a:G(7,2),b:K(3,1,2),why:Y(G(7,2),K(3,1,2),!1)}];function wt(e){let t=e>>>0;return()=>{t=t+1831565813>>>0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}var Tt=(e,t)=>t?Tt(t,e%t):e;function Et(e){let t=wt(e*7919+13),n=(e,n)=>e+Math.floor(t()*(n-e+1)),r=n(0,3),i;if(r===0||r===1){let e=n(2,6),t=n(1,e-1);for(;Tt(t,e)!==1;)t=n(1,e-1);if(r===0){let r=n(2,4);i={a:G(t,e),b:G(t*r,e*r),why:St(G(t,e),G(t*r,e*r),r)}}else i={a:G(t,e),b:G(t+1,e+1),why:xt}}else{let e=n(2,5),t=n(1,3),a=n(1,e-1),o=G(t*e+a,e);if(r===2)i={a:o,b:K(t,a,e),why:Y(o,K(t,a,e),!1)};else{let n=e===2?K(t+1,a,e):K(t,a===e-1?a-1:a+1,e);i={a:o,b:n,why:Y(o,n,!0)}}}return t()<.5?i:{a:i.b,b:i.a,why:i.why}}var Dt=e=>e<Ct.length?Ct[e]:Et(e),Ot=e=>q(e.a)*e.b.d===q(e.b)*e.a.d;function kt({v:e,cx:t,y:n,fill:r}){return e.w?(0,A.jsx)(Ae,{x:t-xe(e.w,e.n,e.d,92)/2,y:n,whole:e.w,top:e.n,bottom:e.d,size:92,fill:r}):(0,A.jsx)(L,{x:t,y:n,top:e.n,bottom:e.d,size:92,fill:r})}function At({v:e,x0:t,y:n,unit:r,fill:i}){let a=q(e),o=Math.max(1,Math.ceil(a/e.d)),s=r/e.d;return(0,A.jsxs)(`g`,{children:[Array.from({length:o*e.d},(r,o)=>(0,A.jsx)(`rect`,{x:t+o*s,y:n,width:s,height:`44`,fill:o<a?i:`#ffffff`,stroke:M,strokeWidth:o%e.d===0?4:2},o)),(0,A.jsx)(`rect`,{x:t,y:n,width:o*r,height:`44`,fill:`none`,stroke:M,strokeWidth:`4`})]})}function jt({lang:e=`en`,isDisplayMode:t=!1}){let[n,i]=(0,O.useState)(0),[o,c]=(0,O.useState)(!1),u=t,f=Dt(n),p=Ot(f),m=p?Ce:we,h=Math.max(1,Math.ceil(q(f.a)/f.a.d),Math.ceil(q(f.b)/f.b.d)),g=Math.min(1e3,1380/h),ee=60+g*q(f.a)/f.a.d,_=()=>{i(e=>e+1),c(!1)},te=(t,n)=>{let r=o&&n===p;return(0,A.jsxs)(`g`,{opacity:o&&n!==p?.3:1,children:[(0,A.jsx)(`rect`,{x:t,y:`40`,width:`340`,height:`262`,rx:`20`,fill:r?Ee:`#f7fafc`,stroke:r?Ce:Se,strokeWidth:r?6:3}),(0,A.jsx)(d,{x:t+170,y:150,up:n,color:n?F:P,s:.95}),(0,A.jsx)(`text`,{x:t+170,y:`244`,fontFamily:j,fontSize:`30`,fontWeight:`900`,fill:n?F:P,textAnchor:`middle`,children:n?W(e,`ARMS UP`,`BRAS EN HAUT`):W(e,`ARMS DOWN`,`BRAS EN BAS`)}),(0,A.jsx)(`text`,{x:t+170,y:`282`,fontFamily:j,fontSize:`26`,fontWeight:`700`,fill:M,textAnchor:`middle`,children:n?W(e,`the same`,`pareil`):W(e,`not the same`,`pas pareil`)}),r&&(0,A.jsxs)(`g`,{children:[(0,A.jsx)(`circle`,{cx:t+306,cy:`74`,r:`22`,fill:`#2f6b12`}),(0,A.jsx)(`path`,{d:`M ${t+294} 74 l 8 8 l 14 -16`,stroke:`#ffffff`,strokeWidth:`5`,fill:`none`,strokeLinecap:`round`,strokeLinejoin:`round`})]})]})};return(0,A.jsxs)(`div`,{className:`w-full h-full flex flex-col gap-3 select-none`,children:[(0,A.jsx)(`div`,{className:`flex-1 min-h-0 w-full`,children:(0,A.jsxs)(`svg`,{viewBox:`0 0 1500 560`,className:`w-full h-full`,preserveAspectRatio:`xMidYMid meet`,children:[(0,A.jsx)(`rect`,{x:`0`,y:`0`,width:`1500`,height:`560`,rx:`16`,fill:`#ffffff`}),(0,A.jsx)(`text`,{x:`40`,y:`54`,fontFamily:j,fontSize:`26`,fontWeight:`800`,fill:N,children:W(e,`Round ${n+1}`,`Manche ${n+1}`)}),(0,A.jsx)(`text`,{x:`40`,y:`100`,fontFamily:j,fontSize:`34`,fontWeight:`900`,fill:M,children:W(e,`The same amount?`,`La même quantité\xA0?`)}),(0,A.jsx)(kt,{v:f.a,cx:190,y:214,fill:F}),(0,A.jsx)(`text`,{x:`370`,y:`248`,fontFamily:j,fontSize:`96`,fontWeight:`900`,fill:o?m:N,textAnchor:`middle`,children:o?p?`=`:`≠`:`?`}),(0,A.jsx)(kt,{v:f.b,cx:550,y:214,fill:P}),te(760,!0),te(1124,!1),o?(0,A.jsxs)(`g`,{children:[(0,A.jsx)(At,{v:f.a,x0:60,y:336,unit:g,fill:vt}),(0,A.jsx)(At,{v:f.b,x0:60,y:396,unit:g,fill:yt}),(0,A.jsx)(`line`,{x1:ee,y1:`324`,x2:ee,y2:`452`,stroke:M,strokeWidth:`4`,strokeDasharray:`10 7`}),(0,A.jsx)(`text`,{x:`60`,y:`510`,fontFamily:j,fontSize:`28`,fontWeight:`900`,fill:m,children:W(e,f.why[0],f.why[1])})]}):(0,A.jsx)(`text`,{x:`60`,y:`420`,fontFamily:j,fontSize:`28`,fontWeight:`900`,fill:N,children:W(e,`Everyone answers at once. Wrong? Sit down.`,`Tout le monde répond en même temps. Faux\xA0? Assieds-toi.`)})]})}),(0,A.jsxs)(`div`,{className:`shrink-0 flex items-center justify-center gap-3 flex-wrap`,children:[(0,A.jsx)(l,{big:u,tone:`teal`,icon:s,disabled:o,onClick:()=>c(!0),children:W(e,`Show the answer`,`Montrer la réponse`)}),(0,A.jsx)(l,{big:u,tone:`orange`,icon:r,onClick:_,children:W(e,`Next round`,`Manche suivante`)}),(0,A.jsx)(l,{big:u,tone:`slate`,icon:a,disabled:n===0&&!o,onClick:()=>{i(0),c(!1)},children:W(e,`Start again`,`Recommencer`)})]})]})}var Mt=`/assets/chocolate-ByhL4yvO.jpg`,Nt=`/assets/banhchung-DoSx7Y2l.jpg`,X=`#0087a8`,Z=`#5c2483`,Q=`#c25e12`,$=`#4a8b23`,Pt=`#1a5fa8`,Ft={meta:{course:`y7-math`,unit:`7.1a`,id:`U07_1a`,title:`Fractions and Mixed Numbers`,subtitle:`Say it, cut it, count the wholes: equivalent fractions, improper fractions and mixed numbers`,objective:`Name the numerator and denominator and say a fraction in English; make equivalent fractions by multiplying or dividing the top and the bottom by the same number (never adding); change an improper fraction to a mixed number by dividing, and back by multiplying and adding; and compare an improper fraction with a mixed number by changing it first.`,order:22,french:!0,vietnamese:!1},slides:[{layout:`hero`,color:Z,icon:`LayoutGrid`,brand:`Year 7 Mathematics`,brandFr:`Maths 7e année`,eyebrow:`Unit 7 · 7.1 · Part 1`,eyebrowFr:`Unité 7 · 7.1 · Partie 1`,title:`Fractions and Mixed Numbers`,titleFr:`Fractions et nombres mixtes`,card:{icon:`Pencil`,badge:`Starter`,badgeFr:`Pour commencer`,text:`A chocolate bar has **4** pieces. Mr Bowen eats **3**. Now the same bar is cut into **8** smaller pieces. How many small pieces is **the same amount**? **Guess** and write it down.`,textFr:`Une tablette de chocolat a **4** morceaux. M. Bowen en mange **3**. Maintenant, la même tablette est coupée en **8** petits morceaux. Combien de petits morceaux font **la même quantité**\xA0? **Devine** et écris-le.`}},{layout:`compare`,accent:X,icon:`Target`,eyebrow:`Today`,eyebrowFr:`Aujourd’hui`,title:`Today You Will…`,titleFr:`Aujourd’hui, tu vas…`,text:`Read fractions. Then write them in **new ways**.`,textFr:`Lire des fractions. Puis les écrire **autrement**.`,columns:[{heading:`Say it`,headingFr:`Le dire`,accent:X,icon:`MessageSquare`,inlineSvg:D.PIC_SAY,caption:`Say a fraction in English.`,captionFr:`Dire une fraction en anglais.`},{heading:`The same amount`,headingFr:`La même quantité`,accent:Pt,icon:`Equal`,inlineSvg:D.PIC_SAME,caption:`Write the same amount two ways.`,captionFr:`Écrire une quantité de deux façons.`},{heading:`Wholes and parts`,headingFr:`Entiers et parts`,accent:Q,icon:`Circle`,inlineSvg:D.PIC_WHOLES,caption:`Count the wholes, then the part.`,captionFr:`Compter les entiers, puis la part.`}]},{layout:`split`,accent:X,icon:`LayoutGrid`,eyebrow:`Key words`,eyebrowFr:`Mots clés`,title:`Numerator and Denominator`,titleFr:`Numérateur et dénominateur`,ratio:45,inlineSvg:D.NUM_DEN,content:`Mr Bowen eats **3** of the **8** equal slices.`,contentFr:`M. Bowen mange **3** des **8** parts égales.`,notes:[{tone:`write`,text:`**Numerator:** the top number. How many parts.
**Denominator:** the bottom number. How many **equal** parts make one whole.`,textFr:`**Numérateur (numerator)\xA0:** le nombre du haut. Combien de parts.
**Dénominateur (denominator)\xA0:** le nombre du bas. Combien de parts **égales** font un entier.`},{tone:`info`,badge:!1,text:`Say it: **three eighths**, or **3 out of 8**.`,textFr:`En anglais\xA0: **three eighths**, ou **3 out of 8** (3 sur 8).`}]},{layout:`showcase`,accent:Z,icon:`MessageSquare`,eyebrow:`English check`,eyebrowFr:`Point d’anglais`,title:`Say It in English`,titleFr:`Dis-le en anglais`,inlineSvg:D.SAY_IT,caption:`**Half**, **third** and **quarter** are special. Then add **-th**: fifth, sixth, tenth. More than one: add **s**.`,captionFr:`**Half**, **third**, **quarter** (demi, tiers, quart), puis **-th**\xA0: fifth = cinquième. Plusieurs\xA0: ajoute **s**.`},{layout:`split`,accent:$,icon:`PenLine`,eyebrow:`Whiteboards`,eyebrowFr:`Ardoises`,title:`What Fraction Is Shaded?`,titleFr:`Quelle fraction est coloriée\xA0?`,ratio:40,inlineSvg:D.WHAT_FRACTION,content:`**Shaded** = coloured in.

Write each fraction. Say it in English.

Which **two** show **the same amount**?`,contentFr:`**Shaded** = colorié.

Écris chaque fraction. Dis-la en anglais.

Lesquelles **deux** montrent **la même quantité**\xA0?`,reveal:{label:`Check your answers`,labelFr:`Vérifie tes réponses`,answer:`**a** $\\dfrac{1}{3}$ one third, **b** $\\dfrac{5}{6}$ five sixths
**c** $\\dfrac{3}{8}$ three eighths, **d** $\\dfrac{2}{6}$ two sixths
**a** and **d** are the same amount.`,answerFr:`**a** $\\dfrac{1}{3}$ one third, **b** $\\dfrac{5}{6}$ five sixths
**c** $\\dfrac{3}{8}$ three eighths, **d** $\\dfrac{2}{6}$ two sixths
**a** et **d** montrent la même quantité.`}},{layout:`showcase`,accent:X,icon:`Grid3x3`,eyebrow:`Say it first`,eyebrowFr:`Dis-le d’abord`,title:`Cut Every Piece`,titleFr:`Coupe chaque morceau`,widget:Le,caption:`Before each cut: how many pieces? How many shaded? Say the fraction.`,captionFr:`Avant chaque coupe\xA0: combien de morceaux\xA0? Combien de coloriés\xA0? Dis la fraction.`},{layout:`split`,accent:Z,icon:`Target`,eyebrow:`Back to the starter`,eyebrowFr:`Retour au début`,title:`The Same Amount`,titleFr:`La même quantité`,ratio:50,image:Mt,content:`Mr Bowen ate **3** pieces of **4**. How many pieces of **8** is the same amount?

This real bar has **12** equal pieces. How many is the same amount?`,contentFr:`M. Bowen a mangé **3** morceaux sur **4**. Combien de morceaux sur **8** font la même quantité\xA0?

Cette vraie tablette a **12** morceaux égaux. Combien font la même quantité\xA0?`,reveal:{label:`Answer`,labelFr:`Réponse`,answer:`**6** pieces: $\\dfrac{3}{4} = \\dfrac{6}{8}$
**9** pieces: $\\dfrac{3}{4} = \\dfrac{9}{12}$`,answerFr:`**6** morceaux\xA0: $\\dfrac{3}{4} = \\dfrac{6}{8}$
**9** morceaux\xA0: $\\dfrac{3}{4} = \\dfrac{9}{12}$`}},{layout:`compare`,accent:Z,icon:`Hand`,eyebrow:`Vote with one hand`,eyebrowFr:`Vote avec une main`,title:`Which Is Equal?`,titleFr:`Laquelle est égale\xA0?`,text:`Which fraction is **equal to** $\\dfrac{2}{3}$?`,textFr:`Quelle fraction est **égale à** $\\dfrac{2}{3}$\xA0?`,columns:[{heading:`A · left hand up`,headingFr:`A · main gauche levée`,accent:Pt,icon:`Hand`,inlineSvg:D.ANS_34},{heading:`B · right hand up`,headingFr:`B · main droite levée`,accent:Q,icon:`Hand`,inlineSvg:D.ANS_46}]},{layout:`split`,accent:X,icon:`Equal`,eyebrow:`Answer: B`,eyebrowFr:`Réponse\xA0: B`,title:`Equivalent Fractions`,titleFr:`Fractions équivalentes`,ratio:45,inlineSvg:D.ADD_OR_TIMES,content:`**Multiply**. Never add.`,contentFr:`**Multiplie**. N’ajoute jamais.`,notes:[{tone:`write`,text:`**Equivalent fractions:** fractions that show the same amount.
Multiply or divide the top and the bottom by the **same number**.`,textFr:`**Fractions équivalentes (equivalent fractions)\xA0:** des fractions qui montrent la même quantité.
Multiplie ou divise le haut et le bas par le **même nombre**.`},{tone:`info`,badge:!1,text:`$\\dfrac{2}{3} = \\dfrac{4}{6} = \\dfrac{6}{9} = \\dfrac{8}{12}$`,textFr:`$\\dfrac{2}{3} = \\dfrac{4}{6} = \\dfrac{6}{9} = \\dfrac{8}{12}$`}]},{layout:`showcase`,accent:Pt,icon:`Layers`,eyebrow:`Pairs · one minute`,eyebrowFr:`À deux · une minute`,title:`The Fraction Wall`,titleFr:`Le mur des fractions`,widget:We,caption:`Find every fraction **equal to** one half. Then press **Line at 1/2**.`,captionFr:`Trouve toutes les fractions **égales à** un demi. Puis appuie sur **Ligne à 1/2**.`},{layout:`split`,accent:$,icon:`CheckCircle2`,eyebrow:`Whiteboards`,eyebrowFr:`Ardoises`,title:`Fill the Box`,titleFr:`Complète`,ratio:40,inlineSvg:D.FILL_BOX,content:`**a** to **d**: write the missing number.

**e** and **f**: write **=** or **≠**.`,contentFr:`**a** à **d**\xA0: écris le nombre qui manque.

**e** et **f**\xA0: écris **=** ou **≠**.`,notes:[{tone:`info`,badge:`Tip`,badgeFr:`Astuce`,text:`**=** means **is equal to**. **≠** means **is not equal to**.`,textFr:`**=** se dit **is equal to** (est égal à). **≠** se dit **is not equal to** (n’est pas égal à).`}],reveal:{label:`Check your answers`,labelFr:`Vérifie tes réponses`,answer:`**a** 6, **b** 6, **c** 24, **d** 3 (÷ 4)
**e** = (× 3), **f** ≠ (adding 1 does not work)`,answerFr:`**a** 6, **b** 6, **c** 24, **d** 3 (÷ 4)
**e** = (× 3), **f** ≠ (ajouter 1 ne marche pas)`}},{layout:`showcase`,accent:Pt,icon:`Sparkles`,eyebrow:`What happens next?`,eyebrowFr:`Que se passe-t-il ensuite\xA0?`,title:`Mr Bowen’s Party`,titleFr:`La fête de M. Bowen`,widget:ut,caption:`Before each step, **predict**: what happens next?`,captionFr:`Avant chaque étape, **prédis**\xA0: que se passe-t-il ensuite\xA0?`},{layout:`showcase`,accent:Q,icon:`Circle`,eyebrow:`Say it two ways`,eyebrowFr:`Dis-le de deux façons`,title:`Slice by Slice`,titleFr:`Part après part`,widget:_t,caption:`Put his **11** slices back together. Say each number two ways **before** the press.`,captionFr:`Rassemble ses **11** parts. Dis chaque nombre de deux façons **avant** le clic.`},{layout:`split`,accent:Q,icon:`Circle`,eyebrow:`Key words`,eyebrowFr:`Mots clés`,title:`Improper Fraction, Mixed Number`,titleFr:`Fraction impropre, nombre mixte`,ratio:45,inlineSvg:D.IMPROPER_MIXED,content:`Mr Bowen ate $2\\dfrac{3}{4}$ pizzas. Say it: **two and three quarters**.`,contentFr:`M. Bowen a mangé $2\\dfrac{3}{4}$ pizzas. En anglais\xA0: **two and three quarters**.`,notes:[{tone:`write`,text:`**Improper fraction:** the numerator is bigger than the denominator. $\\dfrac{11}{4}$
**Mixed number:** a whole number and a fraction. $2\\dfrac{3}{4}$`,textFr:`**Fraction impropre (improper fraction)\xA0:** le numérateur est plus grand que le dénominateur. $\\dfrac{11}{4}$
**Nombre mixte (mixed number)\xA0:** un nombre entier et une fraction. $2\\dfrac{3}{4}$`},{tone:`info`,badge:!1,text:`An improper fraction is **more than 1** whole.`,textFr:`Une fraction impropre vaut **plus d’un** entier.`}]},{layout:`split`,accent:Q,icon:`ArrowLeftRight`,eyebrow:`The method`,eyebrowFr:`La méthode`,title:`Change It Both Ways`,titleFr:`Dans les deux sens`,ratio:45,inlineSvg:D.BOTH_WAYS,content:`**Remainder** = what is left over.`,contentFr:`**Remainder** (le reste) = ce qui reste.`,notes:[{tone:`write`,text:`**Improper → mixed:** divide.
$11 ÷ 4 = 2$ remainder $3$, so $\\dfrac{11}{4} = 2\\dfrac{3}{4}$
**Mixed → improper:** multiply, then add.
$2 × 4 + 3 = 11$, so $2\\dfrac{3}{4} = \\dfrac{11}{4}$`,textFr:`**Impropre → mixte\xA0:** divise.
$11 ÷ 4 = 2$ reste $3$, donc $\\dfrac{11}{4} = 2\\dfrac{3}{4}$
**Mixte → impropre\xA0:** multiplie, puis ajoute.
$2 × 4 + 3 = 11$, donc $2\\dfrac{3}{4} = \\dfrac{11}{4}$`}]},{layout:`split`,accent:$,icon:`CheckCircle2`,eyebrow:`Whiteboards`,eyebrowFr:`Ardoises`,title:`Change These`,titleFr:`Transforme-les`,ratio:40,inlineSvg:D.CHANGE_THESE,content:`**a** to **d**: write as a **mixed number**.

**e** to **g**: write as an **improper fraction**.`,contentFr:`**a** à **d**\xA0: écris en **nombre mixte**.

**e** à **g**\xA0: écris en **fraction impropre**.`,reveal:{label:`Check your answers`,labelFr:`Vérifie tes réponses`,answer:`**a** $2\\dfrac{1}{4}$, **b** $2\\dfrac{3}{5}$, **c** $5\\dfrac{2}{3}$, **d** $2\\dfrac{3}{10}$
**e** $\\dfrac{7}{2}$, **f** $\\dfrac{13}{5}$, **g** $\\dfrac{14}{3}$`,answerFr:`**a** $2\\dfrac{1}{4}$, **b** $2\\dfrac{3}{5}$, **c** $5\\dfrac{2}{3}$, **d** $2\\dfrac{3}{10}$
**e** $\\dfrac{7}{2}$, **f** $\\dfrac{13}{5}$, **g** $\\dfrac{14}{3}$`}},{layout:`compare`,accent:Z,icon:`Hand`,eyebrow:`Vote with one hand`,eyebrowFr:`Vote avec une main`,title:`Which Is Bigger?`,titleFr:`Lequel est le plus grand\xA0?`,text:`Which is **bigger**?`,textFr:`Lequel est **le plus grand**\xA0?`,columns:[{heading:`A · left hand up`,headingFr:`A · main gauche levée`,accent:Pt,icon:`Hand`,inlineSvg:D.ANS_134},{heading:`B · right hand up`,headingFr:`B · main droite levée`,accent:Q,icon:`Hand`,inlineSvg:D.ANS_312}]},{layout:`showcase`,accent:X,icon:`Ruler`,eyebrow:`Answer: B`,eyebrowFr:`Réponse\xA0: B`,title:`Change It First`,titleFr:`Transforme d’abord`,inlineSvg:D.NUMBER_LINE,caption:`$13 ÷ 4 = 3$ remainder $1$, so $\\dfrac{13}{4} = 3\\dfrac{1}{4}$. That is less than $3\\dfrac{1}{2}$.`,captionFr:`$13 ÷ 4 = 3$ reste $1$, donc $\\dfrac{13}{4} = 3\\dfrac{1}{4}$. C’est moins que $3\\dfrac{1}{2}$.`},{layout:`showcase`,accent:$,icon:`Trophy`,eyebrow:`A game · everyone stands`,eyebrowFr:`Un jeu · tout le monde debout`,title:`Same Amount or Not?`,titleFr:`Même quantité ou pas\xA0?`,widget:jt,caption:`**Arms up:** the same. **Arms down:** not the same. The last ones standing win a prize ticket!`,captionFr:`**Bras en haut\xA0:** pareil. **Bras en bas\xA0:** pas pareil. Les derniers debout gagnent un ticket\xA0!`},{layout:`split`,accent:Q,icon:`Pencil`,eyebrow:`Put it together · draw this`,eyebrowFr:`En résumé · à dessiner`,title:`Eleven Quarters`,titleFr:`Onze quarts`,ratio:40,inlineSvg:D.DRAW_THIS,drawThis:!0,content:`Copy it all: the fractions, the **pizzas**, the **division** and the **number line**.`,contentFr:`Recopie tout\xA0: les fractions, les **pizzas**, la **division** et la **droite graduée**.`},{layout:`split`,accent:$,icon:`PenLine`,eyebrow:`Word problem`,eyebrowFr:`Problème`,title:`Mr Bowen’s Bánh Chưng`,titleFr:`Le bánh chưng de M. Bowen`,ratio:50,image:Nt,content:`A bánh chưng is cut into **8** equal pieces. At Tết, Mr Bowen’s family eats **14** pieces.

How many bánh chưng is that? Write it as a **mixed number**.`,contentFr:`Un bánh chưng est coupé en **8** parts égales. Au Têt, la famille de M. Bowen mange **14** parts.

Combien de bánh chưng cela fait-il\xA0? Écris-le en **nombre mixte**.`,reveal:{label:`Check your answer`,labelFr:`Vérifie ta réponse`,answer:`$\\dfrac{14}{8}$, and $14 ÷ 8 = 1$ remainder $6$. So $1\\dfrac{6}{8} = 1\\dfrac{3}{4}$ bánh chưng.`,answerFr:`$\\dfrac{14}{8}$, et $14 ÷ 8 = 1$ reste $6$. Donc $1\\dfrac{6}{8} = 1\\dfrac{3}{4}$ bánh chưng.`}},{layout:`callout`,accent:$,icon:`PenLine`,eyebrow:`Word problem`,eyebrowFr:`Problème`,title:`Mr Bowen’s Cat`,titleFr:`Le chat de M. Bowen`,content:`Mr Bowen cuts a cake into **12** equal slices. He eats **9**.

His cat says: “You ate $\\dfrac{3}{4}$ of the cake.”

Is the cat right?`,contentFr:`M. Bowen coupe un gâteau en **12** parts égales. Il en mange **9**.

Son chat dit\xA0: «\xA0Tu as mangé $\\dfrac{3}{4}$ du gâteau.\xA0»

Le chat a-t-il raison\xA0?`,reveal:{label:`Check your answer`,labelFr:`Vérifie ta réponse`,answer:`Yes. $\\dfrac{9}{12} = \\dfrac{3}{4}$ (÷ 3 top and bottom).

The cat is good at fractions.`,answerFr:`Oui. $\\dfrac{9}{12} = \\dfrac{3}{4}$ (÷ 3 en haut et en bas).

Le chat est fort en fractions.`}},{layout:`callout`,accent:$,icon:`PenLine`,eyebrow:`Word problem`,eyebrowFr:`Problème`,title:`Mr Bowen’s Pizza`,titleFr:`La pizza de M. Bowen`,content:`Mr Bowen says: “I ate $\\dfrac{9}{4}$ of my pizza.”

His doctor says that is not possible with one pizza.

How many pizzas did Mr Bowen have, **at least**?`,contentFr:`M. Bowen dit\xA0: «\xA0J’ai mangé $\\dfrac{9}{4}$ de ma pizza.\xA0»

Son médecin dit que c’est impossible avec une seule pizza.

Combien de pizzas M. Bowen avait-il, **au moins**\xA0?`,reveal:{label:`Check your answer`,labelFr:`Vérifie ta réponse`,answer:`$\\dfrac{9}{4} = 2\\dfrac{1}{4}$: more than 2 whole pizzas. So **3** pizzas, at least.

He has not finished the third one. Yet.`,answerFr:`$\\dfrac{9}{4} = 2\\dfrac{1}{4}$\xA0: plus de 2 pizzas entières. Donc **3** pizzas, au moins.

Il n’a pas fini la troisième. Pas encore.`}},{layout:`stack`,variant:`checklist`,accent:X,icon:`CheckCircle2`,columns:2,eyebrow:`Before you leave`,eyebrowFr:`Avant de partir`,title:`Can You Do These?`,titleFr:`Sais-tu faire ceci\xA0?`,content:`> Check your notebook: **4 written panels** and **1 drawing**.`,contentFr:`> Vérifie ton cahier\xA0: **4 encadrés recopiés** et **1 dessin**.`,items:[{text:`Say a fraction in English: the **numerator** over the **denominator**.`,textFr:`Dire une fraction en anglais\xA0: le **numérateur** sur le **dénominateur**.`},{text:`Make **equivalent fractions**: multiply, never add.`,textFr:`Faire des **fractions équivalentes**\xA0: multiplier, jamais ajouter.`},{text:`Change an **improper fraction** to a **mixed number**, and back.`,textFr:`Passer d’une **fraction impropre** à un **nombre mixte**, et l’inverse.`},{text:`Compare them: change to a mixed number first.`,textFr:`Les comparer\xA0: d’abord en nombre mixte.`}]},{layout:`hero`,color:Z,icon:`Target`,brand:`Year 7 Mathematics`,brandFr:`Maths 7e année`,eyebrow:`Exit question`,eyebrowFr:`Question de sortie`,title:`Wholes and Parts`,titleFr:`Entiers et parts`,subtitle:`Write $\\frac{17}{5}$ as a **mixed number**. Write $2\\frac{2}{3}$ as an **improper fraction**. Is $\\frac{2}{3}$ equal to $\\frac{10}{15}$?`,subtitleFr:`Écris $\\frac{17}{5}$ en **nombre mixte**. Écris $2\\frac{2}{3}$ en **fraction impropre**. $\\frac{2}{3}$ est-il égal à $\\frac{10}{15}$\xA0?`,reveal:{label:`Answer`,labelFr:`Réponse`,answer:`$3\\dfrac{2}{5}$, then $\\dfrac{8}{3}$, and **yes**: $\\dfrac{2}{3} = \\dfrac{10}{15}$ (× 5).`,answerFr:`$3\\dfrac{2}{5}$, puis $\\dfrac{8}{3}$, et **oui**\xA0: $\\dfrac{2}{3} = \\dfrac{10}{15}$ (× 5).`}}],plan:{duration:`50 minutes, one period — 25 slides, timed at 50 minutes. Part 1 of two: Part 2 (ordering fractions) is the next period. If you fall behind: on the wall (10) draw only the 1/2 line, play four rounds of the game (19) instead of eight, and keep only one of the word problems 21–23 (23 is the quickest).`,objective:`Students can name the numerator and the denominator, and say a fraction in English (a half, a third, a quarter, three quarters, two fifths); make equivalent fractions by multiplying or dividing the top and the bottom by the same number, and know that adding to both changes the amount; change an improper fraction to a mixed number by dividing (11 ÷ 4 = 2 remainder 3, so 11/4 = 2¾) and back by multiplying and adding; and compare an improper fraction with a mixed number by changing it first.`,materials:[`Workbook, Unit 7, Section 7.1, pages 80–82 (no Learner’s Book for this unit)`,`Projector / TV — five slides are models, a story or a game (6, 10, 12, 13, 19); they run offline. EN / FR switch`,`A real chocolate bar to hold up, if you have one (slides 1 and 7)`,`Mini whiteboards and pens (slides 1, 5, 11, 16, 21–23, 25); maths notebooks`,`Prize tickets for the last students standing in Same Amount or Not? (slide 19)`],vocab:[{term:`Fraction · une fraction`,def:`a part of one whole, written as one number over another`},{term:`Numerator · le numérateur`,def:`the top number: how many parts we have (slide 3)`},{term:`Denominator · le dénominateur`,def:`the bottom number: how many equal parts make one whole. The parts must be equal (slide 3, “not quarters”)`},{term:`Shaded · colorié`,def:`coloured in. The Workbook asks “What fraction is shaded?” (slide 5)`},{term:`A half, a third, a quarter · un demi, un tiers, un quart`,def:`the three special names; after that, add -th: fifth, sixth, tenth; more than one adds s: two fifths (slide 4). The French works the same way (cinquième)`},{term:`Equivalent fractions · fractions équivalentes`,def:`fractions that show the same amount: multiply or divide the top and the bottom by the same number (slide 9)`},{term:`Improper fraction · fraction impropre`,def:`the numerator is bigger than the denominator, so it is more than one whole: 11/4 (slide 14). Some books say “top-heavy”`},{term:`Mixed number · nombre mixte`,def:`a whole number and a fraction: 2¾, said “two and three quarters”. The whole-number part and the fractional part are labelled on slide 14`},{term:`Remainder · le reste`,def:`what is left over after dividing: 11 ÷ 4 = 2 remainder 3 (slide 15)`},{term:`= and ≠ · égal, pas égal`,def:`“is equal to” and “is not equal to”, the Workbook’s symbols in Questions 1, 3 and 7 (slide 11)`},{term:`At least · au moins`,def:`the smallest number that works (slide 23)`}],timeline:[{time:`0–3 min`,phase:`Starter and goals`,detail:`Slide 1: hold up a chocolate bar if you have one. Everyone writes a guess; take four for the board (expect 6, and some 7 or 5). Slide 2: read the big line and point at each picture. The key words come later.`},{time:`3–7 min`,phase:`Numerator and denominator; say it`,detail:`Slide 3: count the 8 slices on the photo together, then the 3 marked ones. Copy the panel (the line under it is read). Point at “not quarters”: four parts, but not equal. Slide 4: the class reads all six aloud twice; stress third and quarter.`},{time:`7–10 min`,phase:`What fraction is shaded?`,detail:`Slide 5: whiteboards, all four, said in English. Ask “Which two are the same amount?” before revealing; most see a and d (1/3 and 2/6) by the length of the shading.`},{time:`10–14 min`,phase:`Cut every piece`,detail:`Slide 6: before each press ask “How many pieces now? How many shaded?” and get the fraction: 6/8, 9/12, 12/16, 15/20. After two presses ask what the orange arrows do (× the same number, top and bottom). Slide 7: back to the board guesses; then the real bar of 12 (9 pieces).`},{time:`14–18 min`,phase:`Vote; equivalent fractions`,detail:`Slide 8: vote, everyone at once — expect many for A. Slide 9: point at the dashed line: 2/3 and 4/6 end at the same place, 3/4 goes past. Copy the panel; read the chain under it.`},{time:`18–21 min`,phase:`The fraction wall`,detail:`Slide 10: pairs, one minute, find every fraction equal to one half by counting bricks; take answers, then press Line at 1/2. Then 1/3, 2/3 and 3/4 the same way, quickly. The row names (halves, thirds …) are English to read aloud.`},{time:`21–24 min`,phase:`Fill the box`,detail:`Slide 11: whiteboards. Read the tip first: = “is equal to”, ≠ “is not equal to”. d needs dividing; f is the add-1 trap from the vote.`},{time:`24–28 min`,phase:`What happens next? Slice by slice`,detail:`Slide 12, completely deadpan. Ask “What happens next?” before every press and take two guesses. Take answers to the question before A clue. Slide 13: before each press the class says the next number both ways (“five quarters — one and a quarter”). Pause at 4/4 and 8/4: whole pizzas.`},{time:`28–33 min`,phase:`Improper fraction, mixed number; both ways`,detail:`Slide 14: say “two and three quarters” together; copy the panel. Slide 15: read “remainder”; follow the top half (divide), then the bottom (multiply, then add); copy the panel.`},{time:`33–36 min`,phase:`Change these`,detail:`Slide 16: whiteboards. Point out afterwards that b and f undo each other.`},{time:`36–38 min`,phase:`Vote; change it first`,detail:`Slide 17: vote — many choose A because 13 is big. Slide 18: 13 quarters reach only 3¼.`},{time:`38–42 min`,phase:`Same Amount or Not?`,detail:`Slide 19: everyone stands; rules below. Eight rounds if you can.`},{time:`42–45 min`,phase:`Put it together`,detail:`Slide 20: draw the three pizzas, write the division, draw the number line and mark 2¾ (about 3 minutes).`},{time:`45–48 min`,phase:`Word problems`,detail:`Slides 21–23, deadpan, never flagged as jokes. Whiteboards for each; reveal after fifteen seconds.`},{time:`48–50 min`,phase:`Close`,detail:`Slide 24: thumbs up or down for each line; notebook count. Slide 25: exit question on whiteboards.`}],answers:[{q:`Slides 1, 6, 7 — the chocolate bar`,a:`3/4 = 6/8, so 6 small pieces. The stepper: 6/8, 9/12, 12/16, 15/20 (each quarter cut into 2, 3, 4, 5). The real bar of 12: 3/4 of 12 is 9 pieces.`},{q:`Slide 3 — the pizza`,a:`3 of 8 equal slices: 3/8, three eighths. The top slice is already bitten; it still counts.`},{q:`Slide 5 — what fraction is shaded?`,a:`a 1/3, b 5/6, c 3/8 (the bánh chưng is cut into 8 equal triangles), d 2/6. a and d are the same amount: 2/6 = 1/3. (Not 2/3 and 4/6 on purpose: that pair is the vote on slide 8.)`},{q:`Slides 8–9 — which is equal to 2/3?`,a:`B, 4/6 (× 2). A, 3/4, adds 1 to the top and bottom: 2/3 = 8/12 but 3/4 = 9/12, a little more.`},{q:`Slide 10 — the fraction wall`,a:`1/2 = 2/4 = 3/6 = 4/8 = 6/12. 1/3 = 2/6 = 4/12. 2/3 = 4/6 = 8/12. 3/4 = 6/8 = 9/12.`},{q:`Slide 11 — fill the box`,a:`a 6, b 6, c 24, d 3 (÷ 4). e = (3/4 = 9/12, × 3). f ≠ (2/5 = 12/30 but 3/6 = 15/30; it adds 1).`},{q:`Slides 12–13 — the party`,a:`11 slices, 4 to a pizza: 11/4 = 2¾ pizzas (one slice of the third pizza is left). The stepper says each number two ways: 5/4 = 1¼, 6/4 = 1 2/4 (= 1½), 8/4 = 2, 10/4 = 2 2/4 (= 2½).`},{q:`Slide 16 — change these`,a:`a 9/4 = 2¼, b 13/5 = 2⅗, c 17/3 = 5⅔, d 23/10 = 2 3/10. e 3½ = 7/2, f 2⅗ = 13/5, g 4⅔ = 14/3.`},{q:`Slides 17–18 — 13/4 or 3½?`,a:`B. 13 ÷ 4 = 3 remainder 1, so 13/4 = 3¼, which is less than 3½.`},{q:`Slide 19 — Same Amount or Not?, rounds 1–8`,a:`1 same (1/2 = 4/8). 2 NOT — the trap: 2/3 and 3/4 add 1. 3 same (9/4 = 2¼). 4 same (6/10 = 3/5). 5 NOT — the remainder trap: 10/3 = 3⅓, not 3⅔. 6 same (8/12 = 2/3, ÷ 4). 7 NOT — add 1 again: 3/8 and 4/9. 8 same (7/2 = 3½). Rounds after 8 are random; the answer always draws both to scale and says why.`},{q:`Slides 21–23 — word problems`,a:`Bánh chưng: 14/8, 14 ÷ 8 = 1 remainder 6, so 1 6/8 = 1¾ bánh chưng. Cat: yes, 9/12 = 3/4 (÷ 3). Pizza: 9/4 = 2¼, more than 2 whole pizzas, so at least 3 pizzas.`},{q:`Slide 25 — exit`,a:`17/5 = 3⅖ (17 ÷ 5 = 3 remainder 2). 2⅔ = 8/3 (2 × 3 + 2). Yes, 2/3 = 10/15 (× 5).`},{q:`Workbook 7.1, Focus 1–5 (pages 80–81)`,a:`1 b =, c =, d ≠. 2 a 6, b 6, c 7. 3 a ≠ (6/9 and 7/9), b =, c ≠ (7/14 and 8/14). 4 b 3 remainder 3, 3¾; c 1 remainder 4, 1⅘; d 3 remainder 1, 3½. 5 a < (2⅓), b > (3¾), c > (1⅘), d < (3½).`},{q:`Workbook 7.1, Practice 7–8 (page 81)`,a:`7 a = (2/8), b ≠ (8/10), c = (10/15), d ≠ (8/20 = 2/5), e ≠ (20/25 = 4/5), f = (16/24 = 2/3). 8 a < (5¼), b > (27/7 = 3 6/7), c > (9⅔), d < (43/8 = 5⅜). Questions 6 and 9–15 use a common denominator: Part 2.`}],notes:`NOTEBOOK COUNT (slide 24): 4 written panels — numerator and denominator (3), equivalent fractions (9), improper fraction and mixed number (14), both ways (15) — and 1 drawing: 11/4 = 2¾ (20). Only the panel is copied; the line under it (3, 9, 14) is read aloud.

FOR THE OBSERVER. The goal is said on slide 2 and checked on slide 24 (the same three, now with their key words). Ask before you tell: the starter (1), what fraction (5), the stepper predictions (6, 13), two votes (8, 17), the wall found in pairs before each line (10), the story (12) and the game (19). Every student answers at once on 8, 17 and 19; whiteboards on 5, 11, 16, 21–23 and 25 show who has it. One picture language throughout: a bar or a pizza is one whole cut into equal parts, teal is shaded, and fractions are written stacked. Real photographs: a pizza in 8 slices (3), a 12-piece chocolate bar (7), a bánh chưng cut into 8 (21). The thread: Mr Bowen’s chocolate, then his party, then his cat.

WHERE IT SITS. The first lesson of Unit 7. It uses 1.4 (the HCF: dividing the top and the bottom) and the remainder from division. Part 2 (7.1 Ordering fractions: < and >, a common denominator from the LCM of 1.3, order of size, the division method) is the next period, and Unit 7.2 adds mixed numbers. Every number on the slides is new, so Exercise 7.1 is unspent: Focus 1–5 and Practice 7–8 fit after this lesson (answers above); the rest after Part 2.

LANGUAGES: English and French; no Vietnamese. Every model’s buttons and labels follow the EN / FR switch; diagrams stay in English. Where a slide teaches English (fractions said aloud, remainder, = and ≠), the French slide keeps the English beside the French.

THE STORY (slide 12). Deadpan, never flagged as a joke. Mr Bowen is the cartoon from Coffee, Carbon and Stars. Three pizzas of 4 slices; nobody comes; he eats 11 and one slice is left in the third box. The question (how many pizzas did he eat?) is answered by slide 13.

SAME AMOUNT OR NOT? (slide 19). Everyone stands. Read both numbers aloud. Count “3, 2, 1” and everyone answers at once: arms UP for the same amount, arms DOWN for not the same. Then press Show the answer: both are drawn to scale, one under the other, and the reason appears as a sentence. Wrong — sit down. The last students standing win a prize ticket. Rounds 2 and 7 are the add-1 trap; round 5 is the remainder trap. Ask a student to read the reason aloud each round.

MODEL MOVES. Cut Every Piece (6): the quarter lines stay black, the new cuts are orange, and the shaded amount never moves; the arrows show × 2, × 3 … top and bottom. The fraction wall (10): a line turns the rows it meets exactly teal up to the line and greys the rest; the list on the right fills in. Slice by Slice (13): one slice a press; every full pizza is labelled “1 whole”; the marker on the number line walks a quarter at a time.

NOT ON THE SLIDES. Proper fraction (numerator smaller than the denominator) and simplest form are spoken only if a student asks; the Workbook’s 7.1 does not ask for them. Slide 21’s 1 6/8 = 1¾ uses dividing by 2, as on slide 9.`}};export{Ft as default};