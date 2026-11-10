var e=`/assets/fundy-high-pnxadoqT.jpg`,t=`/assets/fundy-low-BvlKSHoR.jpg`,n=`/assets/harbour-YrBrwkYg.jpg`,r=`/assets/venice-B87hwLnV.jpg`,i=`/assets/oystercatcher-Ct5b-eov.jpg`,a=`/assets/rance-CbF_nGFe.jpg`,o=`#2b2b2b`,s=`#c25e12`,c=`#5b6770`,l=`#0087a8`,u=`#1a5fa8`,d=`#cfe6f5`,f=`#5b9bd5`,p=`#a8d08d`,m=`Inter, 'Segoe UI', system-ui, sans-serif`,h=(e,t)=>`<rect x="0" y="0" width="${e}" height="${t}" rx="14" fill="#ffffff"/>
    <rect x="0.75" y="0.75" width="${e-1.5}" height="${t-1.5}" rx="13" fill="none" stroke="#e2e8f0" stroke-width="1.5"/>`,g=e=>Number(e.toFixed(1)),_=(e,t,n,r,i,a=5,o=18)=>{let s=Math.atan2(r-t,n-e),c=n-o*Math.cos(s),l=r-o*Math.sin(s),u=o*.55*Math.sin(s),d=-o*.55*Math.cos(s);return`<line x1="${g(e)}" y1="${g(t)}" x2="${g(c)}" y2="${g(l)}" stroke="${i}" stroke-width="${a}" stroke-linecap="round"/>
    <path d="M ${g(n)} ${g(r)} L ${g(c+u)} ${g(l+d)} L ${g(c-u)} ${g(l-d)} Z" fill="${i}"/>`},v=(e,t,n,r,i,a=4,o=16)=>`${_((e+n)/2,(t+r)/2,e,t,i,a,o)}${_((e+n)/2,(t+r)/2,n,r,i,a,o)}`,y=(e,t,n,r)=>`<line x1="${e}" y1="${t}" x2="${n}" y2="${r}" stroke="${s}" stroke-width="2"/><circle cx="${n}" cy="${r}" r="4.5" fill="${s}"/>`,b=(e,t,n)=>{let r=``;for(let i=0;i<12;i++){let a=i*30*Math.PI/180;r+=`<line x1="${g(e+(n+6)*Math.cos(a))}" y1="${g(t+(n+6)*Math.sin(a))}" x2="${g(e+(n+18)*Math.cos(a))}" y2="${g(t+(n+18)*Math.sin(a))}" stroke="#e8a317" stroke-width="4" stroke-linecap="round"/>`}return`${r}<circle cx="${e}" cy="${t}" r="${n}" fill="#ffd45c" stroke="${o}" stroke-width="3"/>`},x=(e,t,n)=>`<circle cx="${e}" cy="${t}" r="${n}" fill="#d9dde3" stroke="${o}" stroke-width="${n>40?3:2.5}"/>
    <circle cx="${g(e-n*.35)}" cy="${g(t-n*.3)}" r="${g(n*.2)}" fill="#c3c9d1"/>
    <circle cx="${g(e+n*.3)}" cy="${g(t+n*.25)}" r="${g(n*.26)}" fill="#c3c9d1"/>
    <circle cx="${g(e+n*.38)}" cy="${g(t-n*.4)}" r="${g(n*.12)}" fill="#c3c9d1"/>`,S=(e,t,n)=>`<circle cx="${e}" cy="${t}" r="${n}" fill="${p}" stroke="${o}" stroke-width="3"/>
    <circle cx="${e}" cy="${t}" r="${n>60?6:4}" fill="${o}"/>`,C=(e,t,n,r)=>`<ellipse cx="${e}" cy="${t}" rx="${n}" ry="${r}" fill="${d}" stroke="${f}" stroke-width="3"/>`,w=(e,t,n=120)=>`<path d="M ${e} ${t} h ${n} l ${g(-n*.14)} ${g(n*.24)} h ${g(-n*.72)} Z" fill="#d83a2e" stroke="${o}" stroke-width="3" stroke-linejoin="round"/>
    <line x1="${g(e+n*.1)}" y1="${g(t+n*.06)}" x2="${g(e+n*.9)}" y2="${g(t+n*.06)}" stroke="#ffffff" stroke-width="3"/>`,T=(e,t,n,r)=>{let i=`<rect x="${e}" y="${t}" width="${n}" height="${r}" fill="#cfc8bd" stroke="${o}" stroke-width="3"/>`;for(let a=t+34,o=0;a<t+r;a+=34,o++){i+=`<line x1="${e}" y1="${a}" x2="${e+n}" y2="${a}" stroke="#a79f92" stroke-width="2"/>`;for(let t=e+(o%2?30:60);t<e+n;t+=60)i+=`<line x1="${t}" y1="${a-34}" x2="${t}" y2="${a}" stroke="#a79f92" stroke-width="2"/>`}return i},E=`<path d="M18 11V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2"/><path d="M14 10V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v2"/><path d="M10 10.5V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2v8"/><path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"/>`,D=e=>`<g transform="translate(192 76) scale(-7 7)" fill="none" stroke="${e}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">${E}</g>`,O=e=>`<g transform="translate(528 76) scale(7)" fill="none" stroke="${e}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">${E}</g>`,k=(e,t,n,r,i,a)=>`<clipPath id="${e}"><rect x="${n}" y="${r}" width="${i}" height="${a}" rx="12"/></clipPath>
    <image href="${t}" x="${n}" y="${r}" width="${i}" height="${a}" preserveAspectRatio="xMidYMid slice" clip-path="url(#${e})"/>
    <rect x="${n}" y="${r}" width="${i}" height="${a}" rx="12" fill="none" stroke="#cbd5e1" stroke-width="2"/>`,A=(e,t,n,r)=>`<rect x="${e}" y="${t-13}" width="${n}" height="26" rx="6" fill="${r}"/>`,j={PIC_SEA:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 300" class="w-full h-full">
    ${h(480,300)}
    <rect x="40" y="150" width="320" height="120" rx="14" fill="${d}"/>
    <path d="M 40 150 q 20 -14 40 0 t 40 0 t 40 0 t 40 0 t 40 0 t 40 0 t 40 0 t 40 0" fill="none" stroke="${f}" stroke-width="5" stroke-linecap="round"/>
    <path d="M 60 200 q 20 -10 40 0 t 40 0 t 40 0 t 40 0 t 40 0 t 40 0 t 40 0" fill="none" stroke="${f}" stroke-width="4" stroke-linecap="round" opacity="0.6"/>
    ${w(150,124,110)}
    ${v(420,70,420,250,s,6,24)}
  </svg>`,PIC_MOON:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 300" class="w-full h-full">
    ${h(480,300)}
    ${x(240,150,104)}
  </svg>`,PIC_SUN:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 300" class="w-full h-full">
    ${h(480,300)}
    ${b(240,150,92)}
  </svg>`,TIDE_PHOTOS:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1120 440" class="w-full h-full">
    ${h(1120,440)}
    ${k(`tp-high`,e,24,14,524,372)}
    ${k(`tp-low`,t,572,14,524,372)}
    <text x="286" y="424" font-family="${m}" font-size="28" font-weight="bold" fill="${u}" text-anchor="middle">high tide</text>
    <text x="834" y="424" font-family="${m}" font-size="28" font-weight="bold" fill="${s}" text-anchor="middle">low tide, 6 hours later</text>
  </svg>`,RANGE:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${h(840,560)}
    ${T(40,120,150,360)}
    <rect x="190" y="370" width="610" height="110" fill="${d}"/>
    <line x1="190" y1="370" x2="800" y2="370" stroke="${f}" stroke-width="4"/>
    <rect x="190" y="480" width="610" height="40" fill="#d9c7a3"/>
    <line x1="40" y1="480" x2="800" y2="480" stroke="${o}" stroke-width="3"/>
    <line x1="190" y1="150" x2="800" y2="150" stroke="${u}" stroke-width="4" stroke-dasharray="14 10"/>
    <rect x="236" y="96" width="22" height="384" fill="#ffffff" stroke="${o}" stroke-width="2.5"/>
    <line x1="236" y1="480" x2="258" y2="480" stroke="${o}" stroke-width="3"/>
    <line x1="236" y1="425" x2="250" y2="425" stroke="${o}" stroke-width="2.5"/>
    <line x1="236" y1="370" x2="250" y2="370" stroke="${o}" stroke-width="2.5"/>
    <line x1="236" y1="315" x2="250" y2="315" stroke="${o}" stroke-width="2.5"/>
    <line x1="236" y1="260" x2="250" y2="260" stroke="${o}" stroke-width="2.5"/>
    <line x1="236" y1="205" x2="250" y2="205" stroke="${o}" stroke-width="2.5"/>
    <line x1="236" y1="150" x2="250" y2="150" stroke="${o}" stroke-width="2.5"/>
    <rect x="264" y="467" width="46" height="26" rx="5" fill="#ffffff"/>
    <rect x="264" y="357" width="46" height="26" rx="5" fill="#ffffff"/>
    <rect x="264" y="137" width="46" height="26" rx="5" fill="#ffffff"/>
    <text x="270" y="487" font-family="${m}" font-size="20" fill="${c}">0 m</text>
    <text x="270" y="377" font-family="${m}" font-size="20" fill="${c}">2 m</text>
    <text x="270" y="267" font-family="${m}" font-size="20" fill="${c}">4 m</text>
    <text x="270" y="157" font-family="${m}" font-size="20" fill="${c}">6 m</text>
    ${w(310,348,90)}
    <text x="790" y="132" font-family="${m}" font-size="25" font-weight="bold" fill="${u}" text-anchor="end">high tide: 6 m deep</text>
    <text x="790" y="356" font-family="${m}" font-size="25" font-weight="bold" fill="${u}" text-anchor="end">low tide: 2 m deep</text>
    ${v(430,156,430,364,s,5,20)}
    <text x="452" y="248" font-family="${m}" font-size="28" font-weight="bold" fill="${s}">tidal range</text>
    <text x="452" y="286" font-family="${m}" font-size="26" fill="${s}">6 − 2 = 4 m</text>
    <text x="115" y="104" font-family="${m}" font-size="20" fill="${c}" text-anchor="middle">harbour wall</text>
  </svg>`,MOON_PULL:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${h(840,560)}
    ${C(250,290,180,180)}
    ${S(250,290,145)}
    ${x(745,290,52)}
    ${_(452,290,668,290,`#d83a2e`,7,26)}
    <text x="556" y="248" font-family="${m}" font-size="24" font-weight="bold" fill="#d83a2e" text-anchor="middle">the Moon's gravity</text>
    <text x="556" y="336" font-family="${m}" font-size="24" font-weight="bold" fill="#d83a2e" text-anchor="middle">pulls</text>
    <text x="745" y="378" font-family="${m}" font-size="24" font-weight="bold" fill="${o}" text-anchor="middle">Moon</text>
    ${y(130,66,173,145)}
    <text x="30" y="56" font-family="${m}" font-size="25" font-weight="bold" fill="${s}">water: moves easily</text>
    ${y(140,500,185,400)}
    <text x="30" y="530" font-family="${m}" font-size="25" font-weight="bold" fill="${s}">land: hardly moves</text>
    <text x="560" y="530" font-family="${m}" font-size="20" fill="${c}">not to scale</text>
  </svg>`,ANS_ONE:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 320" class="w-full h-full">
    ${h(720,320)}
    ${D(u)}
    <ellipse cx="326" cy="140" rx="92" ry="66" fill="${d}" stroke="${f}" stroke-width="3"/>
    <circle cx="300" cy="140" r="56" fill="${p}" stroke="${o}" stroke-width="3"/>
    ${x(484,140,24)}
    <text x="620" y="190" font-family="${m}" font-size="150" font-weight="bold" fill="${u}" text-anchor="middle">1</text>
    <text x="340" y="282" font-family="${m}" font-size="30" font-weight="bold" fill="${u}" text-anchor="middle">only the Moon's side</text>
  </svg>`,ANS_TWO:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 320" class="w-full h-full">
    ${h(720,320)}
    ${O(s)}
    <text x="96" y="190" font-family="${m}" font-size="150" font-weight="bold" fill="${s}" text-anchor="middle">2</text>
    <ellipse cx="300" cy="140" rx="104" ry="58" fill="${d}" stroke="${f}" stroke-width="3"/>
    <circle cx="300" cy="140" r="52" fill="${p}" stroke="${o}" stroke-width="3"/>
    ${x(460,140,24)}
    <text x="290" y="282" font-family="${m}" font-size="30" font-weight="bold" fill="${s}" text-anchor="middle">both sides</text>
  </svg>`,STRETCH:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${h(840,560)}
    <text x="30" y="46" font-family="${m}" font-size="24" font-weight="bold" fill="${o}">1. Before</text>
    <circle cx="120" cy="96" r="20" fill="${d}" stroke="${f}" stroke-width="3"/>
    <circle cx="270" cy="96" r="20" fill="${p}" stroke="${o}" stroke-width="3"/>
    <circle cx="420" cy="96" r="20" fill="${d}" stroke="${f}" stroke-width="3"/>
    <text x="120" y="142" font-family="${m}" font-size="20" fill="${c}" text-anchor="middle">far side</text>
    <text x="270" y="142" font-family="${m}" font-size="20" fill="${c}" text-anchor="middle">middle</text>
    <text x="420" y="142" font-family="${m}" font-size="20" fill="${c}" text-anchor="middle">near side</text>
    ${x(745,160,44)}
    <line x1="30" y1="168" x2="660" y2="168" stroke="#e2e8f0" stroke-width="2"/>
    <text x="30" y="206" font-family="${m}" font-size="24" font-weight="bold" fill="${o}">2. The Moon pulls</text>
    <g fill="none" stroke="#b8c4cf" stroke-width="2.5" stroke-dasharray="5 5">
      <circle cx="120" cy="264" r="20"/><circle cx="270" cy="264" r="20"/><circle cx="420" cy="264" r="20"/>
    </g>
    <circle cx="170" cy="264" r="20" fill="${d}" stroke="${f}" stroke-width="3"/>
    <circle cx="370" cy="264" r="20" fill="${p}" stroke="${o}" stroke-width="3"/>
    <circle cx="570" cy="264" r="20" fill="${d}" stroke="${f}" stroke-width="3"/>
    ${_(120,230,172,230,`#d83a2e`,4,14)}
    ${_(270,230,372,230,`#d83a2e`,4,14)}
    ${_(420,230,572,230,`#d83a2e`,4,14)}
    <text x="145" y="310" font-family="${m}" font-size="21" font-weight="bold" fill="#d83a2e" text-anchor="middle">1 step</text>
    <text x="320" y="310" font-family="${m}" font-size="21" font-weight="bold" fill="#d83a2e" text-anchor="middle">2 steps</text>
    <text x="495" y="310" font-family="${m}" font-size="21" font-weight="bold" fill="#d83a2e" text-anchor="middle">3 steps</text>
    <text x="630" y="256" font-family="${m}" font-size="23" font-weight="bold" fill="${s}">further apart:</text>
    <text x="630" y="284" font-family="${m}" font-size="23" font-weight="bold" fill="${s}">stretched!</text>
    <line x1="30" y1="332" x2="810" y2="332" stroke="#e2e8f0" stroke-width="2"/>
    <text x="30" y="368" font-family="${m}" font-size="24" font-weight="bold" fill="${o}">3. So the water makes 2 bulges</text>
    ${C(350,462,165,78)}
    ${S(350,462,66)}
    ${_(187,462,142,462,u,5,16)}
    ${_(513,462,558,462,u,5,16)}
    ${x(750,476,30)}
    <text x="138" y="444" font-family="${m}" font-size="22" font-weight="bold" fill="${s}" text-anchor="end">high tide</text>
    <text x="564" y="444" font-family="${m}" font-size="22" font-weight="bold" fill="${s}">high tide</text>
  </svg>`,TWO_TIDES:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${h(840,560)}
    ${C(320,280,205,150)}
    ${S(320,280,128)}
    <path d="M 233.4 230 A 100 100 0 0 0 233.4 330" fill="none" stroke="${u}" stroke-width="5" stroke-linecap="round"/>
    ${_(228,320,238,337,u,5,16)}
    ${x(760,280,42)}
    ${_(548,280,700,280,`#d83a2e`,6,22)}
    <text x="624" y="326" font-family="${m}" font-size="22" font-weight="bold" fill="#d83a2e" text-anchor="middle">pull of the</text>
    <text x="624" y="354" font-family="${m}" font-size="22" font-weight="bold" fill="#d83a2e" text-anchor="middle">Moon's gravity</text>
    <text x="760" y="222" font-family="${m}" font-size="22" font-weight="bold" fill="${o}" text-anchor="middle">Moon</text>
    ${y(80,168,118,262)}
    <text x="24" y="156" font-family="${m}" font-size="25" font-weight="bold" fill="${s}">high tide</text>
    ${y(560,206,520,262)}
    <text x="520" y="194" font-family="${m}" font-size="25" font-weight="bold" fill="${s}">high tide</text>
    ${y(470,76,330,132)}
    <text x="480" y="72" font-family="${m}" font-size="25" font-weight="bold" fill="${s}">low tide</text>
    ${y(470,490,330,428)}
    <text x="480" y="500" font-family="${m}" font-size="25" font-weight="bold" fill="${s}">low tide</text>
    ${y(110,470,222,300)}
    <text x="24" y="500" font-family="${m}" font-size="25" font-weight="bold" fill="${s}">the Earth spins</text>
  </svg>`,ANS_SUN:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 320" class="w-full h-full">
    ${h(720,320)}
    ${D(u)}
    ${b(440,136,78)}
    <text x="440" y="296" font-family="${m}" font-size="40" font-weight="bold" fill="${u}" text-anchor="middle">the Sun</text>
  </svg>`,ANS_MOON:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 320" class="w-full h-full">
    ${h(720,320)}
    ${O(s)}
    ${x(280,136,92)}
    <text x="280" y="296" font-family="${m}" font-size="40" font-weight="bold" fill="${s}" text-anchor="middle">the Moon</text>
  </svg>`,SUN_FAR:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${h(840,560)}
    <text x="30" y="52" font-family="${m}" font-size="25" font-weight="bold" fill="${o}">1. The PULL on the whole Earth</text>
    <text x="150" y="111" font-family="${m}" font-size="22" fill="${c}" text-anchor="end">the Moon</text>
    ${A(166,104,6,l)}
    <text x="150" y="161" font-family="${m}" font-size="22" fill="${c}" text-anchor="end">the Sun</text>
    ${A(166,154,520,`#e8a317`)}
    <text x="700" y="162" font-family="${m}" font-size="22" font-weight="bold" fill="${o}">× 180</text>
    <text x="166" y="214" font-family="${m}" font-size="24" font-weight="bold" fill="${s}">The Sun pulls much harder.</text>
    <line x1="30" y1="246" x2="810" y2="246" stroke="#e2e8f0" stroke-width="2"/>
    <text x="30" y="294" font-family="${m}" font-size="25" font-weight="bold" fill="${o}">2. The STRETCH (tidal force)</text>
    <text x="150" y="351" font-family="${m}" font-size="22" fill="${c}" text-anchor="end">the Moon</text>
    ${A(166,344,400,l)}
    <text x="150" y="401" font-family="${m}" font-size="22" fill="${c}" text-anchor="end">the Sun</text>
    ${A(166,394,184,`#e8a317`)}
    <text x="366" y="402" font-family="${m}" font-size="22" font-weight="bold" fill="${o}">about half</text>
    <text x="166" y="454" font-family="${m}" font-size="24" font-weight="bold" fill="${s}">The Moon stretches more.</text>
    <rect x="166" y="484" width="508" height="54" rx="12" fill="${l}"/>
    <text x="420" y="520" font-family="${m}" font-size="25" font-weight="bold" fill="#ffffff" text-anchor="middle">Tides come from the stretch.</text>
  </svg>`,MOON_MOVES:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${h(840,560)}
    <line x1="300" y1="290" x2="636" y2="290" stroke="${c}" stroke-width="2.5" stroke-dasharray="8 8"/>
    <line x1="300" y1="290" x2="616" y2="175" stroke="${s}" stroke-width="2.5" stroke-dasharray="8 8"/>
    ${S(300,290,90)}
    <path d="M 420.7 257.6 A 125 125 0 1 0 420.7 322.4" fill="none" stroke="${u}" stroke-width="4" stroke-linecap="round"/>
    ${_(418,332,423,315,u,4,16)}
    <path d="M 449.9 284.8 A 150 150 0 0 0 441 238.7" fill="none" stroke="${s}" stroke-width="4" stroke-linecap="round"/>
    ${_(444.5,248.1,439,233.1,s,4,14)}
    <circle cx="390" cy="290" r="10" fill="#d83a2e" stroke="#ffffff" stroke-width="3"/>
    ${x(670,290,34)}
    ${x(648,164,34)}
    <path d="M 667.2 244.9 A 370 370 0 0 0 660.5 206.8" fill="none" stroke="${s}" stroke-width="4" stroke-linecap="round"/>
    ${_(662.4,214.6,659,201,s,4,14)}
    <text x="670" y="352" font-family="${m}" font-size="22" font-weight="bold" fill="${o}" text-anchor="middle">today</text>
    <text x="648" y="118" font-family="${m}" font-size="22" font-weight="bold" fill="${s}" text-anchor="middle">tomorrow</text>
    <text x="702" y="224" font-family="${m}" font-size="21" font-weight="bold" fill="${s}">the Moon</text>
    <text x="702" y="250" font-family="${m}" font-size="21" font-weight="bold" fill="${s}">moves on</text>
    ${y(150,128,212,202)}
    <text x="30" y="116" font-family="${m}" font-size="23" font-weight="bold" fill="${u}">1 turn: 24 hours</text>
    <text x="466" y="272" font-family="${m}" font-size="22" font-weight="bold" fill="${s}">a little more</text>
    ${y(445,410,394,302)}
    <text x="450" y="432" font-family="${m}" font-size="22" font-weight="bold" fill="${s}">the harbour</text>
    <text x="30" y="528" font-family="${m}" font-size="21" fill="${c}">The Moon goes round the Earth once in 29 days.</text>
    <text x="810" y="528" font-family="${m}" font-size="19" fill="${c}" text-anchor="end">not to scale</text>
  </svg>`,EFFECTS:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1120 440" class="w-full h-full">
    ${h(1120,440)}
    ${k(`fx-1`,n,20,16,256,256)}
    ${k(`fx-2`,r,296,16,256,256)}
    ${k(`fx-3`,i,572,16,256,256)}
    ${k(`fx-4`,a,848,16,256,256)}
    <text x="148" y="314" font-family="${m}" font-size="27" font-weight="bold" fill="${u}" text-anchor="middle">Harbours</text>
    <text x="148" y="350" font-family="${m}" font-size="21" fill="${o}" text-anchor="middle">boats get stuck</text>
    <text x="148" y="378" font-family="${m}" font-size="21" fill="${o}" text-anchor="middle">at low tide</text>
    <text x="424" y="314" font-family="${m}" font-size="27" font-weight="bold" fill="${u}" text-anchor="middle">Coastal floods</text>
    <text x="424" y="350" font-family="${m}" font-size="21" fill="${o}" text-anchor="middle">high tide + strong</text>
    <text x="424" y="378" font-family="${m}" font-size="21" fill="${o}" text-anchor="middle">wind (Venice, Italy)</text>
    <text x="700" y="314" font-family="${m}" font-size="27" font-weight="bold" fill="${u}" text-anchor="middle">Food</text>
    <text x="700" y="350" font-family="${m}" font-size="21" fill="${o}" text-anchor="middle">birds eat shellfish</text>
    <text x="700" y="378" font-family="${m}" font-size="21" fill="${o}" text-anchor="middle">at low tide</text>
    <text x="976" y="314" font-family="${m}" font-size="27" font-weight="bold" fill="${u}" text-anchor="middle">Electricity</text>
    <text x="976" y="350" font-family="${m}" font-size="21" fill="${o}" text-anchor="middle">moving water turns</text>
    <text x="976" y="378" font-family="${m}" font-size="21" fill="${o}" text-anchor="middle">turbines (France)</text>
  </svg>`,EARTH_TIDE:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${h(840,560)}
    <g fill="none" stroke="${u}" stroke-width="3" stroke-dasharray="12 9">
      <path d="M 60 300 H 620"/>
      <rect x="100" y="150" width="90" height="150"/>
      <rect x="210" y="90" width="110" height="210"/>
      <rect x="340" y="190" width="80" height="110"/>
      <path d="M 440 300 v -80 l 60 -50 l 60 50 v 80"/>
    </g>
    <rect x="60" y="360" width="560" height="140" fill="#d9c7a3" stroke="${o}" stroke-width="3"/>
    <rect x="100" y="210" width="90" height="150" fill="#eef1f4" stroke="${o}" stroke-width="3"/>
    <rect x="210" y="150" width="110" height="210" fill="#e3e8ee" stroke="${o}" stroke-width="3"/>
    <rect x="340" y="250" width="80" height="110" fill="#eef1f4" stroke="${o}" stroke-width="3"/>
    <path d="M 440 360 v -80 l 60 -50 l 60 50 v 80 z" fill="#f4e3d3" stroke="${o}" stroke-width="3" stroke-linejoin="round"/>
    <rect x="120" y="236" width="20" height="24" fill="#9ec5e8"/><rect x="150" y="236" width="20" height="24" fill="#9ec5e8"/>
    <rect x="232" y="176" width="22" height="26" fill="#9ec5e8"/><rect x="276" y="176" width="22" height="26" fill="#9ec5e8"/>
    <rect x="232" y="228" width="22" height="26" fill="#9ec5e8"/><rect x="276" y="228" width="22" height="26" fill="#9ec5e8"/>
    ${v(690,300,690,360,s,4,14)}
    <text x="714" y="324" font-family="${m}" font-size="25" font-weight="bold" fill="${s}">about</text>
    <text x="714" y="354" font-family="${m}" font-size="25" font-weight="bold" fill="${s}">30 cm</text>
    ${y(700,470,600,430)}
    <text x="640" y="500" font-family="${m}" font-size="25" font-weight="bold" fill="${s}">the ground</text>
    <text x="440" y="60" font-family="${m}" font-size="25" font-weight="bold" fill="${u}">dashed: the same city,</text>
    <text x="440" y="92" font-family="${m}" font-size="25" font-weight="bold" fill="${u}">6 hours later</text>
    <text x="60" y="540" font-family="${m}" font-size="20" fill="${c}">not to scale: the real rise is too small to draw</text>
  </svg>`,SUMMARY:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 800" class="w-full h-full">
    ${h(840,800)}
    <rect x="24" y="20" width="792" height="220" rx="18" fill="#e8f1fa"/>
    <rect x="44" y="120" width="140" height="80" rx="10" fill="${d}"/>
    <path d="M 44 120 q 17.5 -12 35 0 t 35 0 t 35 0 t 35 0" fill="none" stroke="${f}" stroke-width="5" stroke-linecap="round"/>
    ${v(114,40,114,104,s,4,14)}
    <text x="220" y="95" font-family="${m}" font-size="36" font-weight="bold" fill="${o}">The sea</text>
    <text x="220" y="140" font-family="${m}" font-size="29" fill="${o}">goes up and down twice a day</text>
    <text x="220" y="182" font-family="${m}" font-size="27" font-weight="bold" fill="${s}">tides</text>

    <rect x="24" y="256" width="792" height="220" rx="18" fill="#e2f2f6"/>
    ${x(110,366,58)}
    <text x="220" y="331" font-family="${m}" font-size="36" font-weight="bold" fill="${o}">The Moon</text>
    <text x="220" y="376" font-family="${m}" font-size="29" fill="${o}">pulls the oceans into 2 bulges</text>
    <text x="220" y="418" font-family="${m}" font-size="27" font-weight="bold" fill="${s}">tidal force</text>

    <rect x="24" y="492" width="792" height="220" rx="18" fill="#fdf1e3"/>
    ${b(110,602,46)}
    <text x="220" y="567" font-family="${m}" font-size="36" font-weight="bold" fill="${o}">The Sun</text>
    <text x="220" y="612" font-family="${m}" font-size="29" fill="${o}">in line with the Moon: bigger tides</text>
    <text x="220" y="654" font-family="${m}" font-size="27" font-weight="bold" fill="${s}">full moon and new moon</text>

    <rect x="24" y="728" width="792" height="56" rx="14" fill="${l}"/>
    <text x="420" y="767" font-family="${m}" font-size="28" font-weight="bold" fill="#ffffff" text-anchor="middle">The Moon pulls. The Earth spins. The Sun helps.</text>
  </svg>`};export{j as t};