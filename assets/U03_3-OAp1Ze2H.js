import{r as e}from"./rolldown-runtime-XKyaHtl9.js";import{Bc as t,Zc as n,da as r,ea as i,ha as a,la as o}from"./vendor-DwddSC97.js";import{l as s}from"./classroom-DTTXfPou.js";var c=`/assets/mercury-CWPZnjfb.jpg`,l=`/assets/venus-paY44LOU.jpg`,u=`/assets/earth-CQq-g7TH.jpg`,d=`/assets/mars-CtIrnotU.jpg`,f=`/assets/jupiter-G8KklgrF.jpg`,p=`/assets/saturn-B8so3jOv.jpg`,m=`/assets/uranus-Cuv9XQ1q.jpg`,h=`/assets/neptune-osFYcwgD.jpg`,g=`/assets/moon-9g5fKt5K.jpg`,_=`/assets/bouvard-l4iVq_0v.jpg`,ee=`/assets/leverrier-C-aXLje9.jpg`,v=`#2b2b2b`,y=`#c25e12`,b=`#5b6770`,x=`#cfd8dc`,S=`#0087a8`,C=`#c8102e`,w=`#1a5fa8`,T=`#e2f2f6`,E=`#fdf1e3`,D=`#fde58a`,te=`#c99a06`,O=`Inter, 'Segoe UI', system-ui, sans-serif`,k=(e,t)=>`<rect x="0" y="0" width="${e}" height="${t}" rx="14" fill="#ffffff"/>
    <rect x="0.75" y="0.75" width="${e-1.5}" height="${t-1.5}" rx="13" fill="none" stroke="#e2e8f0" stroke-width="1.5"/>`,A=e=>Number(e.toFixed(1)),j=(e,t,n,r,i,a=6,o=20)=>{let s=Math.atan2(r-t,n-e),c=n-o*Math.cos(s),l=r-o*Math.sin(s),u=o*.55*Math.sin(s),d=-o*.55*Math.cos(s);return`<line x1="${A(e)}" y1="${A(t)}" x2="${A(c)}" y2="${A(l)}" stroke="${i}" stroke-width="${a}" stroke-linecap="round"/>
    <path d="M ${A(n)} ${A(r)} L ${A(c+u)} ${A(l+d)} L ${A(c-u)} ${A(l-d)} Z" fill="${i}"/>`},M=(e,t,n,r)=>`<line x1="${e}" y1="${t}" x2="${n}" y2="${r}" stroke="${y}" stroke-width="2"/><circle cx="${n}" cy="${r}" r="4.5" fill="${y}"/>`,ne=(e,t,n,r,i,a,o=`xMidYMid slice`)=>`<defs><clipPath id="${e}"><rect x="${n}" y="${r}" width="${i}" height="${a}" rx="12"/></clipPath></defs>
    <image href="${t}" x="${n}" y="${r}" width="${i}" height="${a}" preserveAspectRatio="${o}" clip-path="url(#${e})"/>`,N=(e,t,n,r,i,a=1)=>{let o=i*a;return`<defs><clipPath id="${e}"><rect x="${n}" y="${r}" width="${i}" height="${i}" rx="10"/></clipPath></defs>
    <rect x="${n}" y="${r}" width="${i}" height="${i}" rx="10" fill="#05070a"/>
    <image href="${t}" x="${A(n-(o-i)/2)}" y="${A(r-(o-i)/2)}" width="${A(o)}" height="${A(o)}" preserveAspectRatio="xMidYMid meet" clip-path="url(#${e})"/>`},re=(e,t,n)=>`<circle cx="${e}" cy="${t}" r="${n}" fill="${D}" stroke="${te}" stroke-width="3"/>`,P=(e,t,n,r,i=v)=>`<circle cx="${e}" cy="${t}" r="${n}" fill="${r}" stroke="${i}" stroke-width="2.5"/>`,ie=(e,t,n,r,i=b)=>r.map(r=>{let a=r*Math.PI/180,o=e+n*Math.cos(a),s=t-n*Math.sin(a),c=-Math.sin(a),l=-Math.cos(a),u=-l,d=c;return`<path d="M ${A(o+c*11)} ${A(s+l*11)} L ${A(o-c*11*.6+u*11*.7)} ${A(s-l*11*.6+d*11*.7)} L ${A(o-c*11*.6-u*11*.7)} ${A(s-l*11*.6-d*11*.7)} Z" fill="${i}"/>`}).join(`
    `),ae=`<path d="M18 11V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2"/><path d="M14 10V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v2"/><path d="M10 10.5V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2v8"/><path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"/>`,oe=e=>`<g transform="translate(192 76) scale(-7 7)" fill="none" stroke="${e}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">${ae}</g>`,se=e=>`<g transform="translate(528 76) scale(7)" fill="none" stroke="${e}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">${ae}</g>`,F=(e,t,n)=>`<circle cx="${e}" cy="${t}" r="${n}" fill="none" stroke="${b}" stroke-width="3" stroke-dasharray="9 8"/>
    ${ie(e,t,n,[0,180,270])}
    <line x1="${e}" y1="${t}" x2="${e}" y2="${t-n+14}" stroke="${v}" stroke-width="3"/>
    <circle cx="${e}" cy="${t}" r="9" fill="#f1c9a5" stroke="${v}" stroke-width="2.5"/>
    ${P(e,t-n,15,`#f08b82`,C)}`,I={PLANET_ROW:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1120 400" class="w-full h-full">
    ${k(1120,400)}
    <text x="24" y="36" font-family="${O}" font-size="22" font-weight="bold" fill="${y}">closest to the Sun</text>
    <text x="1096" y="36" font-family="${O}" font-size="22" font-weight="bold" fill="${y}" text-anchor="end">furthest from the Sun</text>
    ${j(266,29,816,29,b,3,14)}

    ${N(`u33-row-1`,c,24,54,124)}
    ${N(`u33-row-2`,l,158,54,124)}
    ${N(`u33-row-3`,u,292,54,124)}
    ${N(`u33-row-4`,d,426,54,124)}
    ${N(`u33-row-5`,f,560,54,124)}
    ${N(`u33-row-6`,p,694,54,124,1.25)}
    ${N(`u33-row-7`,m,828,54,124)}
    ${N(`u33-row-8`,h,962,54,124)}

    <text x="86" y="212" font-family="${O}" font-size="24" font-weight="bold" fill="${v}" text-anchor="middle">Mercury</text>
    <text x="220" y="212" font-family="${O}" font-size="24" font-weight="bold" fill="${v}" text-anchor="middle">Venus</text>
    <text x="354" y="212" font-family="${O}" font-size="24" font-weight="bold" fill="${v}" text-anchor="middle">Earth</text>
    <text x="488" y="212" font-family="${O}" font-size="24" font-weight="bold" fill="${v}" text-anchor="middle">Mars</text>
    <text x="622" y="212" font-family="${O}" font-size="24" font-weight="bold" fill="${v}" text-anchor="middle">Jupiter</text>
    <text x="756" y="212" font-family="${O}" font-size="24" font-weight="bold" fill="${v}" text-anchor="middle">Saturn</text>
    <text x="890" y="212" font-family="${O}" font-size="24" font-weight="bold" fill="${v}" text-anchor="middle">Uranus</text>
    <text x="1024" y="212" font-family="${O}" font-size="24" font-weight="bold" fill="${v}" text-anchor="middle">Neptune</text>

    <text x="86" y="248" font-family="${O}" font-size="24" font-weight="bold" fill="${y}" text-anchor="middle">My</text>
    <text x="220" y="248" font-family="${O}" font-size="24" font-weight="bold" fill="${y}" text-anchor="middle">Very</text>
    <text x="354" y="248" font-family="${O}" font-size="24" font-weight="bold" fill="${y}" text-anchor="middle">Easy</text>
    <text x="488" y="248" font-family="${O}" font-size="24" font-weight="bold" fill="${y}" text-anchor="middle">Method</text>
    <text x="622" y="248" font-family="${O}" font-size="24" font-weight="bold" fill="${y}" text-anchor="middle">Just</text>
    <text x="756" y="248" font-family="${O}" font-size="24" font-weight="bold" fill="${y}" text-anchor="middle">Speeds</text>
    <text x="890" y="248" font-family="${O}" font-size="24" font-weight="bold" fill="${y}" text-anchor="middle">Up</text>
    <text x="1024" y="248" font-family="${O}" font-size="24" font-weight="bold" fill="${y}" text-anchor="middle">Naming</text>

    ${N(`u33-row-moon`,g,309,272,90)}
    <text x="414" y="310" font-family="${O}" font-size="26" font-weight="bold" fill="${v}">the Moon</text>
    <text x="414" y="342" font-family="${O}" font-size="24" fill="${v}">orbits the Earth</text>
    <text x="1096" y="384" font-family="${O}" font-size="18" fill="${b}" text-anchor="end">photographs from space · sizes not to scale</text>
  </svg>`,STRING_DEMO:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${k(840,560)}

    <rect x="16" y="16" width="300" height="528" rx="14" fill="#fbfcfd" stroke="${x}" stroke-width="2"/>
    <text x="166" y="58" font-family="${O}" font-size="26" font-weight="bold" fill="${v}" text-anchor="middle">Mr Bowen</text>
    <ellipse cx="192" cy="176" rx="106" ry="30" fill="none" stroke="${b}" stroke-width="3" stroke-dasharray="9 8"/>
    <g fill="none" stroke="${v}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="132" cy="312" r="24" fill="#ffffff"/>
      <path d="M 132 336 L 132 430 M 132 430 L 104 512 M 132 430 L 160 512 M 132 370 L 96 420 M 132 370 L 196 324 L 192 196"/>
    </g>
    <line x1="192" y1="194" x2="280" y2="192" stroke="${v}" stroke-width="3"/>
    ${P(286,190,14,`#f08b82`,C)}
    <text x="166" y="102" font-family="${O}" font-size="22" fill="${b}" text-anchor="middle">swings a ball round</text>
    <text x="166" y="128" font-family="${O}" font-size="22" fill="${b}" text-anchor="middle">over his head</text>

    <rect x="332" y="16" width="492" height="528" rx="14" fill="#fbfcfd" stroke="${x}" stroke-width="2"/>
    <text x="578" y="58" font-family="${O}" font-size="26" font-weight="bold" fill="${v}" text-anchor="middle">Seen from above</text>
    ${F(540,300,120)}
    ${j(562,200,562,272,C,6,18)}
    ${j(520,180,418,180,w,6,18)}
    <text x="678" y="226" font-family="${O}" font-size="22" font-weight="bold" fill="${C}">the string</text>
    <text x="678" y="254" font-family="${O}" font-size="22" font-weight="bold" fill="${C}">pulls it in</text>
    ${M(672,234,570,236)}
    <text x="350" y="124" font-family="${O}" font-size="22" font-weight="bold" fill="${w}">the ball is moving</text>
    ${M(420,132,448,176)}
    <text x="578" y="506" font-family="${O}" font-size="26" font-weight="bold" fill="${y}" text-anchor="middle">the string = the Sun’s gravity</text>
  </svg>`,ANS_OUT:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 320" class="w-full h-full">
    ${k(720,320)}
    ${oe(w)}
    ${F(356,214,82)}
    ${j(356,112,356,18,w,8,24)}
    <text x="596" y="160" font-family="${O}" font-size="36" font-weight="bold" fill="${w}" text-anchor="middle">away from</text>
    <text x="596" y="206" font-family="${O}" font-size="36" font-weight="bold" fill="${w}" text-anchor="middle">the centre</text>
  </svg>`,ANS_ON:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 320" class="w-full h-full">
    ${k(720,320)}
    ${se(y)}
    ${F(232,214,82)}
    ${j(214,132,28,132,y,8,24)}
    <text x="414" y="160" font-family="${O}" font-size="36" font-weight="bold" fill="${y}" text-anchor="middle">the way it</text>
    <text x="414" y="206" font-family="${O}" font-size="36" font-weight="bold" fill="${y}" text-anchor="middle">was going</text>
  </svg>`,ORBIT_DRAW:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${k(840,560)}
    <circle cx="290" cy="300" r="210" fill="none" stroke="${v}" stroke-width="3"/>
    ${re(290,300,36)}
    <line x1="500" y1="188" x2="500" y2="34" stroke="${b}" stroke-width="4" stroke-dasharray="11 9" stroke-linecap="round"/>
    ${P(500,300,15,`#8ec5e8`)}
    ${j(482,300,372,300,C,6,20)}
    ${j(500,282,500,186,w,6,20)}

    <text x="560" y="58" font-family="${O}" font-size="24" font-weight="bold" fill="${b}">no gravity:</text>
    <text x="560" y="88" font-family="${O}" font-size="24" font-weight="bold" fill="${b}">straight on</text>
    ${M(552,70,506,70)}
    <text x="560" y="214" font-family="${O}" font-size="24" font-weight="bold" fill="${w}">direction</text>
    <text x="560" y="244" font-family="${O}" font-size="24" font-weight="bold" fill="${w}">of orbit</text>
    ${M(552,224,506,236)}
    <text x="560" y="318" font-family="${O}" font-size="24" fill="${y}">planet</text>
    ${M(552,310,517,300)}
    <text x="560" y="398" font-family="${O}" font-size="24" font-weight="bold" fill="${C}">force from the</text>
    <text x="560" y="428" font-family="${O}" font-size="24" font-weight="bold" fill="${C}">Sun’s gravity</text>
    ${M(552,406,430,304)}
    <text x="290" y="550" font-family="${O}" font-size="24" fill="${y}" text-anchor="middle">Sun</text>
    ${M(290,530,290,338)}
    <text x="824" y="548" font-family="${O}" font-size="18" fill="${b}" text-anchor="end">not to scale</text>
  </svg>`,SPEED_TABLE:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1120 440" class="w-full h-full">
    ${k(1120,440)}
    <rect x="24" y="18" width="400" height="48" rx="6" fill="${S}"/>
    <text x="124" y="50" font-family="${O}" font-size="20" font-weight="bold" fill="#ffffff" text-anchor="middle">Name of planet</text>
    <text x="324" y="50" font-family="${O}" font-size="20" font-weight="bold" fill="#ffffff" text-anchor="middle">Speed in km/s</text>
    <rect x="24" y="66" width="400" height="44" fill="#f7f9fa"/>
    <rect x="24" y="110" width="400" height="44" fill="#ffffff"/>
    <rect x="24" y="154" width="400" height="44" fill="#f7f9fa"/>
    <rect x="24" y="198" width="400" height="44" fill="#ffffff"/>
    <rect x="24" y="242" width="400" height="44" fill="#f7f9fa"/>
    <rect x="24" y="286" width="400" height="44" fill="#ffffff"/>
    <rect x="24" y="330" width="400" height="44" fill="#f7f9fa"/>
    <rect x="24" y="374" width="400" height="44" fill="#ffffff"/>
    <line x1="224" y1="66" x2="224" y2="418" stroke="${x}" stroke-width="2"/>
    <rect x="24" y="18" width="400" height="400" rx="6" fill="none" stroke="${x}" stroke-width="2"/>
    <text x="124" y="96" font-family="${O}" font-size="22" fill="${v}" text-anchor="middle">Mercury</text>
    <text x="324" y="97" font-family="${O}" font-size="24" font-weight="bold" fill="${y}" text-anchor="middle">48</text>
    <text x="124" y="140" font-family="${O}" font-size="22" fill="${v}" text-anchor="middle">Venus</text>
    <text x="324" y="141" font-family="${O}" font-size="24" font-weight="bold" fill="${y}" text-anchor="middle">35</text>
    <text x="124" y="184" font-family="${O}" font-size="22" fill="${v}" text-anchor="middle">Earth</text>
    <text x="324" y="185" font-family="${O}" font-size="24" font-weight="bold" fill="${y}" text-anchor="middle">30</text>
    <text x="124" y="228" font-family="${O}" font-size="22" fill="${v}" text-anchor="middle">Mars</text>
    <text x="324" y="229" font-family="${O}" font-size="24" font-weight="bold" fill="${y}" text-anchor="middle">24</text>
    <text x="124" y="272" font-family="${O}" font-size="22" fill="${v}" text-anchor="middle">Jupiter</text>
    <text x="324" y="273" font-family="${O}" font-size="24" font-weight="bold" fill="${y}" text-anchor="middle">13</text>
    <text x="124" y="316" font-family="${O}" font-size="22" fill="${v}" text-anchor="middle">Saturn</text>
    <text x="324" y="317" font-family="${O}" font-size="24" font-weight="bold" fill="${y}" text-anchor="middle">10</text>
    <text x="124" y="360" font-family="${O}" font-size="22" fill="${v}" text-anchor="middle">Uranus</text>
    <text x="324" y="361" font-family="${O}" font-size="24" font-weight="bold" fill="${y}" text-anchor="middle">7</text>
    <text x="124" y="404" font-family="${O}" font-size="22" fill="${v}" text-anchor="middle">Neptune</text>
    <text x="324" y="405" font-family="${O}" font-size="24" font-weight="bold" fill="${y}" text-anchor="middle">5</text>

    <text x="536" y="214" font-family="${O}" font-size="20" font-weight="bold" fill="${v}" text-anchor="middle" transform="rotate(-90 536 214)">speed of orbit in km/s</text>
    <line x1="600" y1="308" x2="1096" y2="308" stroke="#e6ebef" stroke-width="1.5"/>
    <line x1="600" y1="244" x2="1096" y2="244" stroke="#e6ebef" stroke-width="1.5"/>
    <line x1="600" y1="180" x2="1096" y2="180" stroke="#e6ebef" stroke-width="1.5"/>
    <line x1="600" y1="116" x2="1096" y2="116" stroke="#e6ebef" stroke-width="1.5"/>
    <line x1="600" y1="52" x2="1096" y2="52" stroke="#e6ebef" stroke-width="1.5"/>
    <text x="588" y="378" font-family="${O}" font-size="18" fill="${b}" text-anchor="end">0</text>
    <text x="588" y="314" font-family="${O}" font-size="18" fill="${b}" text-anchor="end">10</text>
    <text x="588" y="250" font-family="${O}" font-size="18" fill="${b}" text-anchor="end">20</text>
    <text x="588" y="186" font-family="${O}" font-size="18" fill="${b}" text-anchor="end">30</text>
    <text x="588" y="122" font-family="${O}" font-size="18" fill="${b}" text-anchor="end">40</text>
    <text x="588" y="58" font-family="${O}" font-size="18" fill="${b}" text-anchor="end">50</text>
    <rect x="611" y="64.8" width="40" height="307.2" fill="${E}" stroke="${y}" stroke-width="2.5" stroke-dasharray="7 5"/>
    <text x="631" y="56" font-family="${O}" font-size="20" font-weight="bold" fill="${y}" text-anchor="middle">48</text>
    <text x="680" y="100" font-family="${O}" font-size="24" font-weight="bold" fill="${y}">Up the side: 1 cm = 5 km/s</text>
    <text x="680" y="134" font-family="${O}" font-size="20" fill="${b}">Mercury: 48 km/s = 9.6 cm, done for you.</text>
    <text x="680" y="164" font-family="${O}" font-size="20" fill="${b}">Bars 1 cm wide. Not touching.</text>
    <line x1="600" y1="40" x2="600" y2="372" stroke="${v}" stroke-width="3"/>
    <line x1="600" y1="372" x2="1100" y2="372" stroke="${v}" stroke-width="3"/>
    <text x="637" y="392" font-family="${O}" font-size="17" font-weight="bold" fill="${v}" text-anchor="end" transform="rotate(-35 637 392)">Mercury</text>
    <text x="699" y="392" font-family="${O}" font-size="17" font-weight="bold" fill="${v}" text-anchor="end" transform="rotate(-35 699 392)">Venus</text>
    <text x="761" y="392" font-family="${O}" font-size="17" font-weight="bold" fill="${v}" text-anchor="end" transform="rotate(-35 761 392)">Earth</text>
    <text x="823" y="392" font-family="${O}" font-size="17" font-weight="bold" fill="${v}" text-anchor="end" transform="rotate(-35 823 392)">Mars</text>
    <text x="885" y="392" font-family="${O}" font-size="17" font-weight="bold" fill="${v}" text-anchor="end" transform="rotate(-35 885 392)">Jupiter</text>
    <text x="947" y="392" font-family="${O}" font-size="17" font-weight="bold" fill="${v}" text-anchor="end" transform="rotate(-35 947 392)">Saturn</text>
    <text x="1009" y="392" font-family="${O}" font-size="17" font-weight="bold" fill="${v}" text-anchor="end" transform="rotate(-35 1009 392)">Uranus</text>
    <text x="1071" y="392" font-family="${O}" font-size="17" font-weight="bold" fill="${v}" text-anchor="end" transform="rotate(-35 1071 392)">Neptune</text>
  </svg>`,SPEED_GRAPH:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1120 440" class="w-full h-full">
    ${k(1120,440)}
    <text x="62" y="210" font-family="${O}" font-size="22" font-weight="bold" fill="${v}" text-anchor="middle" transform="rotate(-90 62 210)">speed of orbit in km/s</text>
    <line x1="150" y1="306" x2="1100" y2="306" stroke="#e6ebef" stroke-width="1.5"/>
    <line x1="150" y1="242" x2="1100" y2="242" stroke="#e6ebef" stroke-width="1.5"/>
    <line x1="150" y1="178" x2="1100" y2="178" stroke="#e6ebef" stroke-width="1.5"/>
    <line x1="150" y1="114" x2="1100" y2="114" stroke="#e6ebef" stroke-width="1.5"/>
    <line x1="150" y1="50" x2="1100" y2="50" stroke="#e6ebef" stroke-width="1.5"/>
    <text x="138" y="377" font-family="${O}" font-size="20" fill="${b}" text-anchor="end">0</text>
    <text x="138" y="313" font-family="${O}" font-size="20" fill="${b}" text-anchor="end">10</text>
    <text x="138" y="249" font-family="${O}" font-size="20" fill="${b}" text-anchor="end">20</text>
    <text x="138" y="185" font-family="${O}" font-size="20" fill="${b}" text-anchor="end">30</text>
    <text x="138" y="121" font-family="${O}" font-size="20" fill="${b}" text-anchor="end">40</text>
    <text x="138" y="57" font-family="${O}" font-size="20" fill="${b}" text-anchor="end">50</text>

    <rect x="174" y="62.8" width="70" height="307.2" fill="${T}" stroke="${S}" stroke-width="3"/>
    <rect x="293" y="146" width="70" height="224" fill="${T}" stroke="${S}" stroke-width="3"/>
    <rect x="412" y="178" width="70" height="192" fill="${T}" stroke="${S}" stroke-width="3"/>
    <rect x="530" y="216.4" width="70" height="153.6" fill="${T}" stroke="${S}" stroke-width="3"/>
    <rect x="649" y="286.8" width="70" height="83.2" fill="${T}" stroke="${S}" stroke-width="3"/>
    <rect x="768" y="306" width="70" height="64" fill="${T}" stroke="${S}" stroke-width="3"/>
    <rect x="887" y="325.2" width="70" height="44.8" fill="${T}" stroke="${S}" stroke-width="3"/>
    <rect x="1006" y="338" width="70" height="32" fill="${T}" stroke="${S}" stroke-width="3"/>
    <text x="209" y="52" font-family="${O}" font-size="24" font-weight="bold" fill="${y}" text-anchor="middle">48</text>
    <text x="328" y="135" font-family="${O}" font-size="24" font-weight="bold" fill="${y}" text-anchor="middle">35</text>
    <text x="447" y="167" font-family="${O}" font-size="24" font-weight="bold" fill="${y}" text-anchor="middle">30</text>
    <text x="565" y="205" font-family="${O}" font-size="24" font-weight="bold" fill="${y}" text-anchor="middle">24</text>
    <text x="684" y="276" font-family="${O}" font-size="24" font-weight="bold" fill="${y}" text-anchor="middle">13</text>
    <text x="803" y="295" font-family="${O}" font-size="24" font-weight="bold" fill="${y}" text-anchor="middle">10</text>
    <text x="922" y="314" font-family="${O}" font-size="24" font-weight="bold" fill="${y}" text-anchor="middle">7</text>
    <text x="1041" y="327" font-family="${O}" font-size="24" font-weight="bold" fill="${y}" text-anchor="middle">5</text>

    <line x1="150" y1="38" x2="150" y2="370" stroke="${v}" stroke-width="3"/>
    <line x1="150" y1="370" x2="1100" y2="370" stroke="${v}" stroke-width="3"/>
    <text x="209" y="400" font-family="${O}" font-size="22" font-weight="bold" fill="${v}" text-anchor="middle">Mercury</text>
    <text x="328" y="400" font-family="${O}" font-size="22" font-weight="bold" fill="${v}" text-anchor="middle">Venus</text>
    <text x="447" y="400" font-family="${O}" font-size="22" font-weight="bold" fill="${v}" text-anchor="middle">Earth</text>
    <text x="565" y="400" font-family="${O}" font-size="22" font-weight="bold" fill="${v}" text-anchor="middle">Mars</text>
    <text x="684" y="400" font-family="${O}" font-size="22" font-weight="bold" fill="${v}" text-anchor="middle">Jupiter</text>
    <text x="803" y="400" font-family="${O}" font-size="22" font-weight="bold" fill="${v}" text-anchor="middle">Saturn</text>
    <text x="922" y="400" font-family="${O}" font-size="22" font-weight="bold" fill="${v}" text-anchor="middle">Uranus</text>
    <text x="1041" y="400" font-family="${O}" font-size="22" font-weight="bold" fill="${v}" text-anchor="middle">Neptune</text>
    <text x="625" y="430" font-family="${O}" font-size="20" fill="${b}" text-anchor="middle">planet, in order from the Sun</text>

    <rect x="620" y="30" width="480" height="150" rx="14" fill="${E}" stroke="${y}" stroke-width="2.5"/>
    <text x="640" y="74" font-family="${O}" font-size="26" font-weight="bold" fill="${v}">As the distance from the Sun</text>
    <text x="640" y="112" font-family="${O}" font-size="26" font-weight="bold" fill="${v}">increases, the speed of orbit</text>
    <text x="640" y="150" font-family="${O}" font-size="26" font-weight="bold" fill="${v}">of the planets</text>
    <line x1="826" y1="152" x2="996" y2="152" stroke="${y}" stroke-width="4" stroke-linecap="round"/>
    <text x="1004" y="150" font-family="${O}" font-size="26" font-weight="bold" fill="${v}">.</text>
  </svg>`,SPEED_PULL:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${k(840,560)}
    ${j(40,56,112,56,C,7,20)}
    <text x="128" y="65" font-family="${O}" font-size="26" fill="${v}">= the pull of the Sun’s gravity</text>

    <path d="M 0 136 A 136 136 0 0 1 0 408 Z" fill="${D}" stroke="${te}" stroke-width="3"/>
    <text x="44" y="452" font-family="${O}" font-size="28" font-weight="bold" fill="${v}" text-anchor="middle">Sun</text>

    <text x="250" y="196" font-family="${O}" font-size="30" font-weight="bold" fill="${v}" text-anchor="middle">Mercury</text>
    ${P(250,272,16,`#b5b5b5`)}
    ${j(228,272,150,272,C,10,26)}
    <text x="250" y="354" font-family="${O}" font-size="40" font-weight="bold" fill="${y}" text-anchor="middle">48 km/s</text>
    <text x="250" y="396" font-family="${O}" font-size="24" fill="${b}" text-anchor="middle">strongest pull</text>

    <text x="446" y="196" font-family="${O}" font-size="30" font-weight="bold" fill="${v}" text-anchor="middle">Earth</text>
    ${P(446,272,21,`#4f8fbf`)}
    ${j(418,272,360,272,C,8,22)}
    <text x="446" y="354" font-family="${O}" font-size="40" font-weight="bold" fill="${y}" text-anchor="middle">30 km/s</text>

    <text x="578" y="282" font-family="${O}" font-size="36" font-weight="bold" fill="${b}" text-anchor="middle">· · ·</text>

    <text x="728" y="196" font-family="${O}" font-size="30" font-weight="bold" fill="${v}" text-anchor="middle">Neptune</text>
    ${P(728,272,27,`#4a6fd1`)}
    ${j(696,272,664,272,C,5,16)}
    <text x="728" y="354" font-family="${O}" font-size="40" font-weight="bold" fill="${y}" text-anchor="middle">5 km/s</text>
    <text x="728" y="396" font-family="${O}" font-size="24" fill="${b}" text-anchor="middle">weakest pull</text>
    <text x="728" y="452" font-family="${O}" font-size="22" fill="${b}" text-anchor="middle">30 times further</text>
    <text x="728" y="480" font-family="${O}" font-size="22" fill="${b}" text-anchor="middle">from the Sun</text>
    <text x="728" y="508" font-family="${O}" font-size="22" fill="${b}" text-anchor="middle">than the Earth</text>
    <text x="40" y="540" font-family="${O}" font-size="18" fill="${b}">not to scale</text>
  </svg>`,NEPTUNE_STORY:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1120 440" class="w-full h-full">
    ${k(1120,440)}

    <rect x="20" y="16" width="350" height="408" rx="14" fill="#ffffff" stroke="${x}" stroke-width="2"/>
    ${N(`u33-story-u`,m,95,32,200)}
    <text x="195" y="282" font-family="${O}" font-size="40" font-weight="bold" fill="${y}" text-anchor="middle">1781</text>
    <text x="195" y="324" font-family="${O}" font-size="24" font-weight="bold" fill="${v}" text-anchor="middle">Uranus is found.</text>
    <text x="195" y="358" font-family="${O}" font-size="24" fill="${v}" text-anchor="middle">Is it the last planet?</text>

    <rect x="385" y="16" width="350" height="408" rx="14" fill="#ffffff" stroke="${x}" stroke-width="2"/>
    ${ne(`u33-story-b`,_,445,32,230,200,`xMidYMin slice`)}
    <text x="560" y="282" font-family="${O}" font-size="40" font-weight="bold" fill="${y}" text-anchor="middle">1821</text>
    <text x="560" y="324" font-family="${O}" font-size="24" font-weight="bold" fill="${v}" text-anchor="middle">Bouvard calculates</text>
    <text x="560" y="358" font-family="${O}" font-size="24" fill="${v}" text-anchor="middle">where Uranus will be.</text>
    <text x="560" y="398" font-family="${O}" font-size="24" font-weight="bold" fill="${y}" text-anchor="middle">Uranus is not there!</text>

    <rect x="750" y="16" width="350" height="408" rx="14" fill="#ffffff" stroke="${x}" stroke-width="2"/>
    ${ne(`u33-story-l`,ee,772,32,158,200,`xMidYMin slice`)}
    ${N(`u33-story-n`,h,940,56,150)}
    <text x="925" y="282" font-family="${O}" font-size="40" font-weight="bold" fill="${y}" text-anchor="middle">1846</text>
    <text x="925" y="324" font-family="${O}" font-size="24" font-weight="bold" fill="${v}" text-anchor="middle">Le Verrier predicts</text>
    <text x="925" y="358" font-family="${O}" font-size="24" fill="${v}" text-anchor="middle">where a new planet is.</text>
    <text x="925" y="398" font-family="${O}" font-size="24" font-weight="bold" fill="${y}" text-anchor="middle">Neptune is there!</text>
  </svg>`,WORDS3:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 600" class="w-full h-full">
    ${k(640,600)}

    <rect x="16" y="16" width="608" height="182" rx="14" fill="${T}" stroke="${S}" stroke-width="2"/>
    <g fill="none" stroke="${v}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M 30 107 Q 80 55 130 107 Q 80 159 30 107 Z" fill="#ffffff"/>
      <circle cx="80" cy="107" r="18" fill="${S}"/>
    </g>
    <text x="156" y="80" font-family="${O}" font-size="46" font-weight="bold" fill="${y}">observation</text>
    <text x="156" y="128" font-family="${O}" font-size="30" fill="${v}">what you see,</text>
    <text x="156" y="166" font-family="${O}" font-size="30" fill="${v}">measure and record</text>

    <rect x="16" y="209" width="608" height="182" rx="14" fill="${E}" stroke="${y}" stroke-width="2"/>
    <g fill="none" stroke="${v}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="80" cy="300" r="46" fill="#ffffff"/>
      <path d="M 80 300 L 80 270 M 80 300 L 102 312"/>
    </g>
    <text x="156" y="273" font-family="${O}" font-size="46" font-weight="bold" fill="${y}">prediction</text>
    <text x="156" y="321" font-family="${O}" font-size="30" fill="${v}">what you think</text>
    <text x="156" y="359" font-family="${O}" font-size="30" fill="${v}">will happen</text>

    <rect x="16" y="402" width="608" height="182" rx="14" fill="#eef6e8" stroke="#4a8b23" stroke-width="2"/>
    <g fill="none" stroke="${v}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M 60 498 Q 40 468 52 446 Q 80 410 108 446 Q 120 468 100 498 Z" fill="#fff3a6"/>
      <path d="M 64 514 L 96 514 M 68 528 L 92 528"/>
    </g>
    <text x="156" y="466" font-family="${O}" font-size="46" font-weight="bold" fill="${y}">conclusion</text>
    <text x="156" y="514" font-family="${O}" font-size="30" fill="${v}">what you decide</text>
    <text x="156" y="552" font-family="${O}" font-size="30" fill="${v}">from the results</text>
  </svg>`},L=e(n(),1),R=t(),z=(e,t,n)=>s(e,t,null,n),B=`#2b2b2b`,V=`#c25e12`,H=`#5b6770`,ce=`#cfd8dc`,U=`Inter, 'Segoe UI', system-ui, sans-serif`;function W({onClick:e,disabled:t,tone:n=`teal`,icon:r,children:i}){return(0,R.jsxs)(`button`,{onClick:e,disabled:t,className:`inline-flex items-center gap-2 rounded-xl font-black uppercase tracking-wide text-white border-b-4 active:border-b-0 active:translate-y-1 transition-all px-4 py-2 text-sm lg:px-6 lg:py-2.5 lg:text-base disabled:opacity-35 disabled:pointer-events-none ${{teal:`bg-[#0087a8] border-[#00697f]`,orange:`bg-[#c25e12] border-[#a04a0e]`,red:`bg-[#c8102e] border-[#990c23]`,slate:`bg-slate-500 border-slate-700`}[n]}`,children:[r&&(0,R.jsx)(r,{className:`w-4 h-4 lg:w-5 lg:h-5`,strokeWidth:3}),i]})}var G=1120,K=440,q=520,J=220,le=128,ue=30,Y=[{en:`Mercury`,fr:`Mercure`,au:.387,days:88,r:12,fill:`#b5b5b5`,trail:`#6f7780`,start:100},{en:`Venus`,fr:`Vénus`,au:.723,days:225,r:13,fill:`#e8c27a`,trail:`#b8892f`,start:30},{en:`Earth`,fr:`Terre`,au:1,days:365,r:13,fill:`#4f8fbf`,trail:`#2f6d9c`,start:0},{en:`Mars`,fr:`Mars`,au:1.524,days:687,r:12,fill:`#d0643b`,trail:`#b14a24`,start:285}],de=e=>e*Math.PI/180;function fe(e,t){let n=e.au*le,r=de(e.start)+2*Math.PI*t/e.days,i=2*Math.PI*n/e.days;return{x:q+n*Math.cos(r),y:J-n*Math.sin(r),vx:-i*Math.sin(r),vy:-i*Math.cos(r)}}var pe=(e,t)=>e<-40||e>1160||t<-40||t>480;function me(e,t){return Y.map(n=>{if(t===null)return{...fe(n,e),from:null};let r=fe(n,t),i=e-t;return{x:r.x+r.vx*i,y:r.y+r.vy*i,from:r}})}var he=(e,t)=>t!==null&&me(e,t).every(e=>pe(e.x,e.y));function ge({lang:e=`en`}){let[t,n]=(0,L.useState)(0),[s,c]=(0,L.useState)(!1),[l,u]=(0,L.useState)(null),d=(0,L.useRef)(0),f=(0,L.useRef)(0),p=(0,L.useRef)(0),m=(0,L.useRef)(null);(0,L.useEffect)(()=>{if(!s)return;f.current=performance.now();let e=t=>{let r=Math.min(.1,(t-f.current)/1e3);f.current=t,p.current+=r*ue,n(p.current),he(p.current,m.current)?c(!1):d.current=requestAnimationFrame(e)};return d.current=requestAnimationFrame(e),()=>cancelAnimationFrame(d.current)},[s]);let h=me(t,l),g=he(t,l),_=e=>Math.floor((l??t)/e.days),ee=Math.floor(t);return(0,R.jsxs)(`div`,{className:`w-full h-full flex flex-col gap-3 select-none`,children:[(0,R.jsx)(`div`,{className:`flex-1 min-h-0 w-full`,children:(0,R.jsxs)(`svg`,{viewBox:`0 0 ${G} ${K}`,className:`w-full h-full`,preserveAspectRatio:`xMidYMid meet`,children:[(0,R.jsx)(`defs`,{children:(0,R.jsx)(`clipPath`,{id:`u33-letgo-clip`,children:(0,R.jsx)(`rect`,{x:`0`,y:`0`,width:G,height:K,rx:`14`})})}),(0,R.jsx)(`rect`,{x:`0`,y:`0`,width:G,height:K,rx:`14`,fill:`#ffffff`}),(0,R.jsxs)(`g`,{clipPath:`url(#u33-letgo-clip)`,children:[Y.map(e=>(0,R.jsx)(`circle`,{cx:q,cy:J,r:e.au*le,fill:`none`,stroke:ce,strokeWidth:`2.5`},`o-${e.en}`)),(0,R.jsx)(`circle`,{cx:q,cy:J,r:`20`,fill:`#fde58a`,stroke:`#c99a06`,strokeWidth:`3`}),h.map((e,t)=>e.from&&(0,R.jsxs)(`g`,{children:[(0,R.jsx)(`line`,{x1:e.from.x,y1:e.from.y,x2:e.x,y2:e.y,stroke:Y[t].trail,strokeWidth:`4`,strokeDasharray:`12 8`,strokeLinecap:`round`}),(0,R.jsx)(`circle`,{cx:e.from.x,cy:e.from.y,r:`6`,fill:Y[t].trail})]},`l-${Y[t].en}`))]}),(0,R.jsx)(`rect`,{x:`24`,y:`28`,width:`250`,height:`112`,rx:`12`,fill:`#ffffff`,fillOpacity:`0.92`}),(0,R.jsx)(`text`,{x:`36`,y:`62`,fontFamily:U,fontSize:`24`,fill:H,children:z(e,`Earth days`,`Jours terrestres`)}),(0,R.jsx)(`text`,{x:`36`,y:`120`,fontFamily:U,fontSize:`54`,fontWeight:`bold`,fill:B,children:ee}),(0,R.jsx)(`rect`,{x:`818`,y:`30`,width:`284`,height:`242`,rx:`12`,fill:`#ffffff`,fillOpacity:`0.92`}),(0,R.jsx)(`text`,{x:`830`,y:`62`,fontFamily:U,fontSize:`24`,fill:H,children:z(e,`Times round the Sun`,`Tours autour du Soleil`)}),Y.map((t,n)=>(0,R.jsxs)(`g`,{children:[(0,R.jsx)(`circle`,{cx:`846`,cy:104+n*52,r:`11`,fill:t.fill,stroke:B,strokeWidth:`2`}),(0,R.jsx)(`text`,{x:`870`,y:113+n*52,fontFamily:U,fontSize:`26`,fontWeight:`bold`,fill:B,children:z(e,t.en,t.fr)}),(0,R.jsx)(`text`,{x:`1080`,y:113+n*52,fontFamily:U,fontSize:`28`,fontWeight:`bold`,fill:V,textAnchor:`end`,children:_(t)})]},`k-${t.en}`)),l!==null&&(0,R.jsxs)(R.Fragment,{children:[(0,R.jsx)(`rect`,{x:`24`,y:`342`,width:`262`,height:`82`,rx:`12`,fill:`#ffffff`,fillOpacity:`0.92`}),(0,R.jsx)(`text`,{x:`36`,y:`376`,fontFamily:U,fontSize:`26`,fontWeight:`bold`,fill:V,children:z(e,`No gravity:`,`Sans gravité\xA0:`)}),(0,R.jsx)(`text`,{x:`36`,y:`410`,fontFamily:U,fontSize:`26`,fontWeight:`bold`,fill:V,children:z(e,`straight lines!`,`tout droit\xA0!`)})]}),(0,R.jsx)(`text`,{x:`1084`,y:`420`,fontFamily:U,fontSize:`18`,fill:H,textAnchor:`end`,children:z(e,`Orbits to scale`,`Orbites à l’échelle`)}),(0,R.jsx)(`g`,{clipPath:`url(#u33-letgo-clip)`,children:h.map((e,t)=>(0,R.jsx)(`circle`,{cx:e.x,cy:e.y,r:Y[t].r,fill:Y[t].fill,stroke:B,strokeWidth:`2`},`p-${Y[t].en}`))})]})}),(0,R.jsxs)(`div`,{className:`shrink-0 flex items-center justify-center gap-3 flex-wrap`,children:[(0,R.jsx)(W,{tone:`teal`,icon:s?a:r,disabled:g,onClick:()=>c(e=>!e),children:s?z(e,`Pause`,`Pause`):z(e,`Play`,`Lancer`)}),(0,R.jsx)(W,{tone:`red`,icon:o,disabled:l!==null,onClick:()=>{m.current=p.current,u(p.current),c(!0)},children:z(e,`Gravity off`,`Sans gravité`)}),(0,R.jsx)(W,{tone:`slate`,icon:i,disabled:t===0&&l===null,onClick:()=>{c(!1),m.current=null,u(null),p.current=0,n(0)},children:z(e,`Reset`,`Recommencer`)})]})]})}var _e=`/assets/sun-CwbYVG4Z.jpg`,ve=`/assets/spoilers-CQpZry4V.jpg`,ye=`/assets/juno-3dP8lpqX.jpg`,be=`/assets/voyager-BV2wtQ9b.jpg`,X=`#0087a8`,Z=`#5c2483`,xe=`#c25e12`,Q=`#4a8b23`,$=`#1a5fa8`,Se={meta:{course:`y7-science`,unit:`3.3`,id:`U03_3`,title:`Movement in Space`,subtitle:`Let go of the string: what keeps the planets going round, and why nothing slows them down`,objective:`Explain that the Sun’s gravity keeps the planets in orbit and always pulls towards the Sun; show from a bar graph that planets further from the Sun move more slowly, and say why; describe air resistance and a vacuum, and explain why objects moving in space do not slow down.`,order:17,french:!0,vietnamese:!1,dashboard:{track:`Y7_SCI`,unit:`U03_3`}},slides:[{layout:`hero`,color:X,icon:`Globe`,brand:`Year 7 Science`,brandFr:`Sciences 7e année`,date:`21 Oct 2026`,eyebrow:`3.3 · Forces and energy`,eyebrowFr:`3.3 · Forces et énergie`,title:`Movement in Space`,titleFr:`Le mouvement dans l’espace`,card:{icon:`Pencil`,badge:`Starter`,badgeFr:`Pour commencer`,text:`Write the names of the planets in order, starting with the one **closest to the Sun**. Then name the object that orbits the **Earth**, not the Sun.`,textFr:`Écris le nom des planètes (en anglais) dans l’ordre, en commençant par la plus **proche du Soleil**. Puis nomme l’objet qui tourne autour de la **Terre**, et pas du Soleil.`}},{layout:`showcase`,accent:X,icon:`Globe`,eyebrow:`Starter answers`,eyebrowFr:`Réponses`,title:`The Planets in Order`,titleFr:`Les planètes dans l’ordre`,inlineSvg:I.PLANET_ROW,caption:`The orange words help you remember the order.`,captionFr:`Les mots orange aident à retenir l’ordre. En français\xA0: «\xA0Me Voici Toute Mignonne, Je Suis Une Nébuleuse\xA0».`},{layout:`split`,accent:X,icon:`Sun`,eyebrow:`The biggest mass`,eyebrowFr:`La plus grande masse`,title:`The Sun`,titleFr:`Le Soleil`,ratio:50,image:_e,content:`Mass: **330\xA0000 times** the Earth’s. More than all the planets together.

Gravity: **270\xA0N/kg**, 27 times the Earth’s.

**Never** look straight at the Sun.`,contentFr:`Masse\xA0: **330\xA0000 fois** celle de la Terre. Plus que toutes les planètes réunies.

Gravité\xA0: **270\xA0N/kg**, 27 fois celle de la Terre.

Ne regarde **jamais** le Soleil en face.`,reveal:{prompt:`Question 3, in pairs: which object has the **second** strongest gravity?`,promptFr:`Question 3, à deux\xA0: quel objet a la **deuxième** gravité la plus forte\xA0?`,label:`Answer`,labelFr:`Réponse`,answer:`**Jupiter.** After the Sun, it has the most mass. Its gravity: 25\xA0N/kg.`,answerFr:`**Jupiter.** Après le Soleil, c’est lui qui a le plus de masse. Sa gravité\xA0: 25\xA0N/kg.`}},{layout:`statement`,accent:Z,icon:`HelpCircle`,eyebrow:`Think`,eyebrowFr:`Réfléchis`,title:`Why Don’t They Fly Away?`,titleFr:`Pourquoi ne partent-elles pas\xA0?`,text:`The planets move **very fast**.`,textFr:`Les planètes vont **très vite**.`,sub:`So why don’t they fly off into space?`,subFr:`Alors pourquoi ne s’envolent-elles pas dans l’espace\xA0?`},{layout:`split`,accent:Q,icon:`RotateCcw`,eyebrow:`Watch Mr Bowen`,eyebrowFr:`Regarde M. Bowen`,title:`A Ball on a String`,titleFr:`Une balle au bout d’une ficelle`,ratio:40,inlineSvg:I.STRING_DEMO,content:`His hand is the **Sun**. The ball is a **planet**.`,contentFr:`Sa main, c’est le **Soleil**. La balle, c’est une **planète**.`},{layout:`compare`,accent:Z,icon:`Hand`,eyebrow:`Vote with one hand`,eyebrowFr:`Vote avec une main`,title:`What If He Lets Go?`,titleFr:`Et s’il lâche\xA0?`,text:`Mr Bowen lets go of the string. Which way does the ball go?`,textFr:`M. Bowen lâche la ficelle. Par où part la balle\xA0?`,columns:[{heading:`A · left hand up`,headingFr:`A · main gauche levée`,accent:$,icon:`Hand`,inlineSvg:I.ANS_OUT},{heading:`B · right hand up`,headingFr:`B · main droite levée`,accent:xe,icon:`Hand`,inlineSvg:I.ANS_ON}]},{layout:`showcase`,accent:X,icon:`Globe`,eyebrow:`B is right: straight on`,eyebrowFr:`B est juste\xA0: tout droit`,title:`Switch Off the Sun’s Gravity`,titleFr:`Coupe la gravité du Soleil`,widget:ge,caption:`What happens if gravity stops?`,captionFr:`Que se passe-t-il si la gravité s’arrête\xA0?`},{layout:`split`,accent:xe,icon:`Pencil`,eyebrow:`Draw this · page 92`,eyebrowFr:`À dessiner · page 92`,title:`What Keeps Planets in Orbit`,titleFr:`Ce qui garde les planètes en orbite`,ratio:40,inlineSvg:I.ORBIT_DRAW,drawThis:!0,content:`Draw the Sun, the orbit, a planet, the two arrows and the dashed line.`,contentFr:`Dessine le Soleil, l’orbite, une planète, les deux flèches et la ligne pointillée.`,notes:[{tone:`write`,text:`**Circular:** in the shape of a circle. The planets’ orbits are almost circular.
The Sun’s **gravity** keeps the planets in orbit. It always pulls **towards the Sun**.`,textFr:`**Circulaire (circular)\xA0:** en forme de cercle. Les orbites des planètes sont presque circulaires.
La **gravité** du Soleil garde les planètes en orbite. Elle tire toujours **vers le Soleil**.`}]},{layout:`callout`,accent:Q,icon:`MessageSquare`,eyebrow:`Say it · page 94`,eyebrowFr:`Dis-le · page 94`,title:`Questions 1 and 2`,titleFr:`Questions 1 et 2`,content:`**1.** In which direction does the Sun’s gravity pull on a planet?

**2.** Comets and asteroids orbit the Sun too. What keeps them in orbit?`,contentFr:`**1.** Dans quel sens la gravité du Soleil tire-t-elle une planète\xA0?

**2.** Les comètes et les astéroïdes tournent aussi autour du Soleil. Qu’est-ce qui les garde en orbite\xA0?`,reveal:{label:`Check your answers`,labelFr:`Vérifie tes réponses`,answer:`**1.** Towards the Sun.
**2.** The Sun’s gravity.`,answerFr:`**1.** Vers le Soleil.
**2.** La gravité du Soleil.`}},{layout:`showcase`,accent:$,icon:`Table`,eyebrow:`Activity · page 94`,eyebrowFr:`Activité · page 94`,title:`Planet Speeds`,titleFr:`La vitesse des planètes`,inlineSvg:I.SPEED_TABLE,caption:`Draw the bar graph. **km/s** = kilometres **per** second: Mercury goes 48\xA0km **every** second!`,captionFr:`Trace le diagramme en barres. **km/s** = kilomètres **par** seconde\xA0: Mercure parcourt 48\xA0km **chaque** seconde\xA0!`},{layout:`showcase`,accent:$,icon:`CheckCircle2`,eyebrow:`Check your graph`,eyebrowFr:`Vérifie ton graphique`,title:`Is Yours the Same?`,titleFr:`Le tien est-il pareil\xA0?`,inlineSvg:I.SPEED_GRAPH,caption:`Complete the sentence on your whiteboard. Then say **why**.`,captionFr:`Complète la phrase sur ton ardoise (en anglais). Puis dis **pourquoi**.`},{layout:`split`,accent:X,icon:`Gauge`,eyebrow:`Key word`,eyebrowFr:`Mot clé`,title:`Speed`,titleFr:`La vitesse`,ratio:45,inlineSvg:I.SPEED_PULL,notes:[{tone:`write`,text:`**Speed:** how fast something moves.
As the distance from the Sun increases, the speed of the planets **decreases**.
The Sun’s pull is **weaker** far away.`,textFr:`**Vitesse (speed)\xA0:** la rapidité avec laquelle un objet se déplace.
Plus on s’éloigne du Soleil, plus la vitesse des planètes **diminue**.
L’attraction du Soleil est **plus faible** au loin.`}],reveal:{prompt:`Whiteboards: Mercury goes 48\xA0km every second. How far does it go in one hour?`,promptFr:`Ardoises\xA0: Mercure parcourt 48\xA0km chaque seconde. Quelle distance en une heure\xA0?`,label:`Answer`,labelFr:`Réponse`,answer:`48 × 3600 = 172\xA0800, about **170\xA0000\xA0km**. So 170\xA0000\xA0km/h.`,answerFr:`48 × 3600 = 172\xA0800, environ **170\xA0000\xA0km**. Donc 170\xA0000\xA0km/h.`}},{layout:`callout`,accent:$,icon:`HelpCircle`,eyebrow:`Activity · Questions 2 and 4 · say it`,eyebrowFr:`Activité · Questions 2 et 4 · dis-le`,title:`Why a Bar Graph?`,titleFr:`Pourquoi des barres\xA0?`,content:`**2.** Why is a graph better than a table for these numbers?

**4.** Why a **bar** graph, and not a **line** graph?`,contentFr:`**2.** Pourquoi un graphique est-il mieux qu’un tableau pour ces nombres\xA0?

**4.** Pourquoi un diagramme en **barres** (bar graph), et pas une **courbe** (line graph)\xA0?`,reveal:{label:`Check your answers`,labelFr:`Vérifie tes réponses`,answer:`**2.** You see the pattern at once, and you can compare the planets easily.
**4.** The planets are separate things. There is nothing **between** two planets, so we do not join them with a line.`,answerFr:`**2.** On voit la tendance tout de suite, et on compare facilement les planètes.
**4.** Les planètes sont des choses séparées. Il n’y a rien **entre** deux planètes, donc on ne les relie pas par une ligne.`}},{layout:`statement`,accent:Q,eyebrow:`Try it at your desk`,eyebrowFr:`Essaie à ta place`,title:`Feel the Air`,titleFr:`Sens l’air`,text:`Wave your closed exercise book: **slowly**, then **fast**.`,textFr:`Agite ton cahier fermé\xA0: **lentement**, puis **vite**.`,sub:`Then move it **edge first**. What do you feel?`,subFr:`Puis **tranche en avant**. Que sens-tu\xA0?`,reveal:{label:`What did you feel?`,labelFr:`Qu’as-tu senti\xA0?`,answer:`A push **against** your hand. Bigger when you go **faster**. Bigger with the **flat side** first: it pushes more air.`,answerFr:`Une poussée **contre** ta main. Plus forte quand tu vas **plus vite**. Plus forte côté plat devant\xA0: il pousse plus d’**air**.`}},{layout:`split`,accent:X,icon:`Wind`,eyebrow:`Key word`,eyebrowFr:`Mot clé`,title:`Air Resistance`,titleFr:`La résistance de l’air`,ratio:45,image:ve,content:`This plane has just landed. Panels on its wing stand up to make **more** air resistance.`,contentFr:`Cet avion vient d’atterrir. Des panneaux se lèvent sur l’aile pour faire **plus** de résistance de l’air.`,notes:[{tone:`write`,text:`**Air resistance:** a force from the air that slows a moving object down. It acts in the **opposite** direction to the movement.
The faster an object moves, the **bigger** the air resistance.`,textFr:`**Résistance de l’air (air resistance)\xA0:** une force de l’air qui ralentit un objet en mouvement. Elle agit dans le sens **opposé** au mouvement.
Plus un objet va vite, plus la résistance de l’air est **grande**.`}]},{layout:`statement`,accent:Z,eyebrow:`Think`,eyebrowFr:`Réfléchis`,title:`Air Resistance in Space?`,titleFr:`Résistance de l’air dans l’espace\xA0?`,text:`Air resistance comes from **particles** of air.`,textFr:`La résistance de l’air vient des **particules** d’air.`,sub:`Is there air resistance in **space**?`,subFr:`Y a-t-il de la résistance de l’air dans l’**espace**\xA0?`,reveal:{label:`Answer`,labelFr:`Réponse`,answer:`**No.** Space has very, very few particles: nothing to push against.`,answerFr:`**Non.** Dans l’espace, il y a très, très peu de particules\xA0: rien à pousser.`}},{layout:`split`,accent:X,icon:`CircleSlash`,eyebrow:`Key word · Question 4`,eyebrowFr:`Mot clé · Question 4`,title:`Vacuum`,titleFr:`Le vide`,ratio:45,image:ye,content:`In 2016, the **Juno** probe passed Jupiter at **266\xA0000\xA0km/h**.`,contentFr:`En 2016, la sonde **Juno** est passée près de Jupiter à **266\xA0000\xA0km/h**.`,notes:[{tone:`write`,text:`**Vacuum:** a space with no particles.
Space is a vacuum, so there is no air resistance. Only **gravity** acts on the planets.`,textFr:`**Vide (vacuum)\xA0:** un espace sans particules.
L’espace est un vide, donc il n’y a pas de résistance de l’air. Seule la **gravité** agit sur les planètes.`}]},{layout:`split`,accent:X,icon:`Telescope`,eyebrow:`Question 5 · page 94`,eyebrowFr:`Question 5 · page 94`,title:`Voyager 1: Still Going`,titleFr:`Voyager 1\xA0: toujours en route`,ratio:50,image:be,content:`Launched in **1977**. Now outside the Solar System, at **64\xA0000\xA0km/h**.

On **18 November 2026** it will be so far away that a radio message takes a **whole day** to reach it.`,contentFr:`Lancée en **1977**. Aujourd’hui hors du système solaire, à **64\xA0000\xA0km/h**.

Le **18 novembre 2026**, elle sera si loin qu’un message radio mettra **une journée entière** pour l’atteindre.`,reveal:{prompt:`Why could Voyager 1 not travel this fast on Earth?`,promptFr:`Pourquoi Voyager 1 ne pourrait-elle pas aller aussi vite sur Terre\xA0?`,label:`Answer`,labelFr:`Réponse`,answer:`**Air resistance.** At 64\xA0000\xA0km/h it would be huge and slow Voyager down. In space there is no air.`,answerFr:`**La résistance de l’air.** À 64\xA0000\xA0km/h, elle serait énorme et ralentirait Voyager. Dans l’espace, il n’y a pas d’air.`}},{layout:`callout`,accent:Z,icon:`Hand`,eyebrow:`Question 6 · show 1, 2, 3 or 4 fingers`,eyebrowFr:`Question 6 · montre 1, 2, 3 ou 4 doigts`,title:`Which Forces?`,titleFr:`Quelles forces\xA0?`,content:`Which forces act on the Earth as it orbits the Sun?

**1** gravity only
**2** air resistance only
**3** gravity and air resistance
**4** gravity, air resistance and friction`,contentFr:`Quelles forces agissent sur la Terre quand elle tourne autour du Soleil\xA0?

**1** la gravité seulement
**2** la résistance de l’air seulement
**3** la gravité et la résistance de l’air
**4** la gravité, la résistance de l’air et le frottement`,reveal:{label:`Answer`,labelFr:`Réponse`,answer:`**1: gravity only.** Space is a vacuum: no air resistance. Nothing rubs on the Earth: no friction.`,answerFr:`**1\xA0: la gravité seulement.** L’espace est un vide\xA0: pas de résistance de l’air. Rien ne frotte sur la Terre\xA0: pas de frottement.`}},{layout:`showcase`,accent:Z,icon:`Telescope`,eyebrow:`Think like a scientist · page 95`,eyebrowFr:`Pense comme un scientifique · page 95`,title:`How Neptune Was Found`,titleFr:`Comment on a trouvé Neptune`,inlineSvg:I.NEPTUNE_STORY,caption:`Something was pulling Uranus off its path. It was the gravity of **Neptune**.`,captionFr:`Quelque chose tirait Uranus hors de son chemin. C’était la gravité de **Neptune**. Bouvard et Le Verrier étaient français\xA0!`},{layout:`split`,accent:Z,icon:`MessageSquare`,eyebrow:`Questions 1–3 · English check`,eyebrowFr:`Questions 1–3 · point d’anglais`,title:`Which Word Fits?`,titleFr:`Quel mot convient\xA0?`,ratio:50,inlineSvg:I.WORDS3,content:`**1.** Bouvard calculated where Uranus would be.

**2.** Uranus was seen further from the Sun. The results were recorded.

**3.** “Another source of gravity is pulling Uranus.”`,contentFr:`**1.** Bouvard a calculé où serait Uranus.

**2.** On a vu Uranus plus loin du Soleil. On a noté les résultats.

**3.** «\xA0Une autre source de gravité tire Uranus.\xA0»`,reveal:{label:`Check your answers`,labelFr:`Vérifie tes réponses`,answer:`**1.** predictions
**2.** observations
**3.** a conclusion`,answerFr:`**1.** predictions (des prédictions)
**2.** observations
**3.** a conclusion (une conclusion)`}},{layout:`stack`,variant:`checklist`,accent:X,icon:`CheckCircle2`,columns:2,eyebrow:`Before you leave`,eyebrowFr:`Avant de partir`,title:`Can You Do These?`,titleFr:`Sais-tu faire ceci\xA0?`,content:`> Check your notebook: **4 written panels**, **1 drawing** and **1 bar graph**.`,contentFr:`> Vérifie ton cahier\xA0: **4 encadrés recopiés**, **1 dessin** et **1 diagramme en barres**.`,items:[{text:`Name the force that keeps the planets in **orbit**.`,textFr:`Nommer la force qui garde les planètes en **orbite**.`},{text:`Say which way this force acts on a planet.`,textFr:`Dire dans quel sens cette force agit sur une planète.`},{text:`Explain why planets closer to the Sun move **faster**.`,textFr:`Expliquer pourquoi les planètes proches du Soleil vont **plus vite**.`},{text:`Explain why things in space do not **slow down**.`,textFr:`Expliquer pourquoi les objets dans l’espace ne **ralentissent** pas.`}]},{layout:`hero`,color:X,icon:`CheckCircle2`,brand:`Year 7 Science`,brandFr:`Sciences 7e année`,title:`Lesson Complete!`,titleFr:`Leçon terminée\xA0!`,subtitle:`Exit question: the Earth is a little **closer** to the Sun in January than in July. When does it move **faster**?`,subtitleFr:`Question de sortie\xA0: la Terre est un peu **plus proche** du Soleil en janvier qu’en juillet. Quand va-t-elle **plus vite**\xA0?`}],plan:{duration:`50 minutes, one period (Wednesday 21 October 2026) — 23 slides, timed at 47 minutes with 3 to spare`,objective:`Students can explain that the Sun’s gravity keeps the planets in orbit and always pulls towards the Sun, and that without it a planet would go off in a straight line; draw a bar graph of the planets’ orbit speeds and say that speed decreases as the distance from the Sun increases, because the Sun’s pull is weaker; describe air resistance and a vacuum, and explain why objects moving in space do not slow down.`,materials:[`Projector / TV for the lesson deck (no internet needed: every picture is saved in the deck)`,`Learner’s Book, Unit 3.3, pages 91–96`,`For the demo (slides 5–6): a SOFT ball on about 1 m of strong string — a tennis ball knotted into an old sock works well, or a foam ball or rubber bung. See the safety note below.`,`Rulers and pencils for the bar graph (slide 10); squared paper if you have it, otherwise the notebook`,`Mini whiteboards (slides 11, 12 and 21)`,`Their exercise books, closed, for the air-resistance test (slide 14)`,`Student science notebooks`],vocab:[{term:`Orbit · l’orbite (f) / être en orbite`,def:`the path of an object going round another one; also the verb, "the Moon orbits the Earth" (a 3.2 key word)`},{term:`Circular · circulaire`,def:`in the shape of a circle. The planets’ orbits are almost circular`},{term:`Speed · la vitesse`,def:`how fast something moves. Here in km/s, kilometres per second, and km/h, kilometres per hour`},{term:`Air resistance · la résistance de l’air`,def:`a force from the air that slows a moving object down; it acts opposite to the movement and is bigger at higher speed`},{term:`Vacuum · le vide`,def:`a space with no particles. Space is (almost) a vacuum, so there is no air resistance`},{term:`Gravity · la gravité`,def:`from 3.1: the force that pulls objects towards each other. The Sun’s gravity pulls every planet towards the Sun`},{term:`Observation · une observation`,def:`what you see, measure and record (Think like a scientist)`},{term:`Prediction · une prédiction`,def:`what you think will happen`},{term:`Conclusion · une conclusion`,def:`what you decide from the results`},{term:`Contradict · contredire`,def:`to go against (a 3.2 key word). Uranus’s path contradicted the prediction (the extension, below)`}],timeline:[{time:`0–3 min`,phase:`Starter`,detail:`Slide 1, the book’s Getting Started: the planets in order and the object that orbits the Earth (they met the order in 3.2 yesterday). Slide 2: check against the photos; say the orange words together ("My Very Easy Method…"). The Moon orbits the Earth.`},{time:`3–5 min`,phase:`The Sun`,detail:`Slide 3, a recall of 3.2: the biggest mass, gravity 270 N/kg. Never look at the Sun. Question 3 in pairs for 30 seconds, then reveal Jupiter.`},{time:`5–10 min`,phase:`Let go of the string`,detail:`Slide 4: why don’t the planets fly away? Take two ideas, no answer. Slide 5: swing the ball; hand = Sun, string = gravity, ball = planet. Slide 6: everyone votes at once (left hand A, right hand B), THEN let go — twice. Slide 7: Play for a few seconds, then Gravity off: each planet goes straight on, like the ball. Do not ask about speeds yet; if someone says "Mercury is fastest", say "good — we will check it with numbers".`},{time:`10–17 min`,phase:`Draw This, Questions 1–2`,detail:`Slide 8: draw the Sun, the orbit, one planet, the two arrows and the dashed no-gravity line (about 4 minutes), then copy the panel (2 minutes). Slide 9: Questions 1 and 2 aloud, hands up — 1 minute.`},{time:`17–28 min`,phase:`Planet speeds: the bar graph`,detail:`Slide 10: the book’s Activity. Show them the scale first: up the side, 1 cm = 5 km/s, so Mercury’s bar is 9.6 cm; bars 1 cm wide, not touching. Say "km/s, kilometres PER second" (3.1’s per = for every). Ten minutes of drawing; walk round and check the first two bars. Anyone not finished keeps going while you show slide 11.`},{time:`28–30 min`,phase:`The pattern`,detail:`Slide 11: they check their bars, then write the missing word of the sentence on whiteboards (decreases) and tell a partner why.`},{time:`30–33 min`,phase:`Speed`,detail:`Slide 12: copy SPEED — the panel gives the word and the reason. Whiteboards: 48 km every second, how far in an hour? (48 × 3600 ≈ 170 000 km — the book’s figure.)`},{time:`33–34 min`,phase:`Why a bar graph?`,detail:`Slide 13: Activity Questions 2 and 4, aloud, one answer each, then reveal. One minute.`},{time:`34–37 min`,phase:`Air resistance`,detail:`Slide 14: everyone waves a CLOSED exercise book, slow then fast, flat side then edge first — then reveal. Remind them of the flat paper in 3.1. Slide 15: the plane’s wing; copy AIR RESISTANCE.`},{time:`37–42 min`,phase:`Vacuum: nothing to slow you down`,detail:`Slide 16: is there air resistance in space? (30 seconds.) Slide 17: Juno; copy VACUUM (this is Question 4). Slide 18: Voyager 1, still going since 1977; Question 5 aloud, then reveal. Slide 19: Question 6 with fingers, 1 to 4, all at once.`},{time:`42–45 min`,phase:`How Neptune was found`,detail:`Slide 20: tell the story left to right (1 minute). Slide 21: read the three words together, then Questions 1–3 on whiteboards: one word each.`},{time:`45–47 min`,phase:`Close`,detail:`Slide 22: checklist; 4 written panels, 1 drawing, 1 bar graph. Slide 23: exit question (the book’s Question 7).`},{time:`47–50 min`,phase:`Spare`,detail:`Three minutes in hand. The bar graph is where they go. If the graph is done early: the extension below, or Mr Bowen’s weight on the Sun (80 × 270 = 21 600 N).`}],answers:[{q:`Getting Started`,a:`1 Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune. 2 The Moon.`},{q:`Q3 (slide 3)`,a:`Jupiter. After the Sun it has the most mass in the Solar System (about 318 times the Earth’s), so the strongest gravity: 25 N/kg in 3.1’s table.`},{q:`Slide 6 — the vote`,a:`B. When he lets go, nothing pulls the ball towards the centre any more, so it goes straight on in the direction it was moving at that moment — along the edge of the circle (the tangent), not outwards along the string. A is the common wrong idea that something "throws it outwards".`},{q:`Slide 7 — the widget`,a:`Gravity off: each planet leaves along a straight line from the dot where it let go, the way it was going, at the same speed — nothing slows it down. (The speeds are real: Mercury 48 km/s, Mars 24 km/s; in one Earth year Mercury goes round about 4 times. Use this only after the graph, if at all.)`},{q:`Q1`,a:`Towards the Sun (towards the centre of the orbit).`},{q:`Q2`,a:`The Sun’s gravity.`},{q:`Slide 10 — the scale`,a:`1 cm = 5 km/s, so each bar is the speed ÷ 5 in cm: Mercury 9.6, Venus 7.0, Earth 6.0, Mars 4.8, Jupiter 2.6, Saturn 2.0, Uranus 1.4, Neptune 1.0 cm. Eight bars 1 cm wide with 0.5 cm gaps need about 12 cm across.`},{q:`Activity Q1`,a:`… decreases. (As the distance from the Sun increases, the speed of orbit of the planets decreases.) The panel on slide 12 confirms it.`},{q:`Activity Q2`,a:`A graph shows the pattern (trend) at a glance and makes the planets easy to compare; in a table you must read every number.`},{q:`Activity Q3`,a:`The Sun’s gravity gets weaker as the distance from the Sun increases. Close to the Sun the pull is strongest, and the planets move fastest.`},{q:`Activity Q4`,a:`The planets are separate categories, not continuous data like time or temperature: there are no in-between values to join with a line.`},{q:`Slide 12 — whiteboards`,a:`48 km/s × 3600 s = 172 800 km in an hour, the book’s "170 000 km/h". (The Earth: 30 × 3600 = 108 000 km/h, the book’s "about 100 000".)`},{q:`Slide 14 — feel the air`,a:`A push against the movement of the book (air resistance). Bigger when it moves faster, and bigger flat side first than edge first — the flat side pushes against more air. The same reason the flat paper fell slowly in 3.1.`},{q:`Q4`,a:`Vacuum.`},{q:`Q5`,a:`On Earth there is air. Air resistance acts against the movement, and the faster an object moves the bigger it is: at 64 000 km/h it would be enormous and would slow Voyager 1 down (and heat it up). In space there is a vacuum, so there is nothing to slow it.`},{q:`Q6`,a:`Gravity only. Space is a vacuum, so there is no air resistance; nothing is rubbing on the Earth, so there is no friction.`},{q:`Think like a scientist Q1–3`,a:`1 predictions (Bouvard’s calculations said where Uranus would be). 2 observations (what was seen and recorded). 3 a conclusion (what scientists decided from the results). The book offers four words each time; the deck keeps the three that matter.`},{q:`Extension — Think like a scientist Q4`,a:`Not on a slide. For early finishers, from the book (p.96): "Uranus moving further away from the Sun ______ the original prediction about its orbit." CONTRADICTED. "Scientists found Neptune using careful ______." MEASUREMENTS — accept OBSERVATIONS too: the prediction came from measurements of Uranus, and Neptune was then found by looking.`},{q:`Exit (Q7)`,a:`In January. Closer to the Sun, its gravity pulls harder and the Earth moves faster: about 30.3 km/s in early January, 29.3 km/s in early July.`}],notes:`NOTEBOOK COUNT (slide 22): 4 written panels — circular and the Sun’s pull (slide 8), speed (12), air resistance (15), vacuum (17) — plus 1 drawing (the orbit, slide 8) and 1 bar graph (slide 10). Fewer copied panels than 3.1, on purpose.

SAFETY FOR THE DEMO (slides 5–6). Soft ball only, on strong string with the knot checked. Stand at the front with at least 3 metres of clear space in the direction the ball will fly, and nobody within 2 metres of you. Swing it in a flat circle above head height, slowly — two turns a second is plenty. Let go when the ball is moving towards an empty wall or a pile of bags, never towards students, windows or the projector. Practise once before the class arrives. Let go twice, from different points, so they see it always goes straight on. If the room is too small, or you have marbles and paper plates: each pair rolls a marble round inside a paper plate with a quarter of the rim cut away — it leaves the gap in a straight line. That takes 2 minutes more; take them from the spare 3.

THE WIDGET (slide 7). The four planets closest to the Sun, with their orbits to scale and their real times round the Sun, so the dots’ speeds are in the right proportion. Press Play for a few seconds, then Gravity off: each planet leaves along a straight line from the dot where it let go, while its orbit stays drawn. Reset puts them back. The speed pattern is for the bar graph to find, so do not ask "which is fastest?" here.

NO FILM. NASA’s Juno approach movie of Jupiter’s four big moons (YouTube XpsQimYhNkA; a public-domain GIF on Commons) shows real orbits where the closer moon is faster. It was tried at the size the projector shows it and left out: the moons are dots about 8–10 pixels wide, the furthest one is so faint it disappears, and seen edge-on they swing side to side with no labels, so the pattern needs a lot of explaining. There is also no minute for it in this period. Show it another day if you like: Io (closest) goes round in 42 hours, Callisto in 17 days.

THE PHOTOS. The Sun, Earth, Venus, Jupiter and Uranus are the same pictures as in 3.2. Neptune is not: 3.2 showed its paler true colour, and here it is the familiar deep blue so it stands apart from Uranus in the row. If someone notices, that is the reason.

THE NUMBERS. Book values throughout. The Sun’s mass is about 333 000 Earths; its surface gravity 274 N/kg (book: 270). Orbit speeds in km/s (NASA): Mercury 47.4, Venus 35.0, Earth 29.8, Mars 24.1, Jupiter 13.1, Saturn 9.7, Uranus 6.8, Neptune 5.4 — the book rounds them. Neptune is 30 times further from the Sun than the Earth and has 17 times its mass.

JUNO AND VOYAGER. Juno reached about 266 000 km/h as it arrived at Jupiter on 4 July 2016, then the fastest object people had made; if a student asks, the record now belongs to the Parker Solar Probe, about 690 000 km/h close to the Sun (December 2024). Voyager 1 was launched on 5 September 1977. NASA says it will be one light-day from Earth — about 25.9 billion km, so a radio signal takes 24 hours each way — on 18 November 2026, the first spacecraft ever to get that far. Its speed is about 61 000 km/h (17 km/s); the book says 64 000.

THE NEPTUNE STORY (slide 20). William Herschel found Uranus in 1781. In 1821 the French astronomer Alexis Bouvard published tables of where Uranus would be; it kept drifting off them. In 1846 Urbain Le Verrier, also French, calculated where an unseen planet pulling on Uranus must be; Johann Galle at the Berlin Observatory looked there on 23 September 1846 and found Neptune within about 1° of the prediction. (John Couch Adams in England made a similar prediction.) Worth saying in French as well: two French scientists.

ENGLISH POINTS. "Orbit" is a noun and a verb. "Per" means "for every" (3.1): km/s, km/h. Observation, prediction and conclusion are nearly the same words in French, so the French speakers have a head start — but the English spelling of "prediction" has no accent. On slide 21 the verbs (calculated, seen) are not in bold on purpose: the class has to match the meaning, not the word.

LANGUAGES: English and French only, like every Year 7 deck from Unit 4. The diagrams are in English.`}};export{Se as default};