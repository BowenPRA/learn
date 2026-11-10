var e=`/assets/pizza-nImJuAwQ.jpg`,t=`#2b2b2b`,n=`#c25e12`,r=`#5b6770`,i=`#0087a8`,a=`#5c2483`,o=`#4a8b23`,s=`#1a5fa8`,c=`#e2f2f6`,l=`#f2ecf7`,u=`#eef6e6`,d=`#fdf1e3`,f=`#eef1f4`,p=`Inter, 'Segoe UI', system-ui, sans-serif`,m=(e,t)=>`<rect x="0" y="0" width="${e}" height="${t}" rx="14" fill="#ffffff"/>
    <rect x="0.75" y="0.75" width="${e-1.5}" height="${t-1.5}" rx="13" fill="none" stroke="#e2e8f0" stroke-width="1.5"/>`,h=e=>e*Math.PI/180,g=(e,t,n,r)=>[e+n*Math.cos(h(r)),t-n*Math.sin(h(r))],_=e=>e.toFixed(1),v=(e,n,r,i,a,o,s=t)=>{let[c,l]=g(e,n,r,i),[u,d]=g(e,n,r,a),f=+(a-i>180);return`<path d="M ${e} ${n} L ${_(c)} ${_(l)} A ${r} ${r} 0 ${f} 0 ${_(u)} ${_(d)} Z" fill="${o}" stroke="${s}" stroke-width="2"/>`},y=(e,t,n)=>{let r=t=>Math.atan2(-(t[1]-e[1]),t[0]-e[0])*180/Math.PI,i=r(t),a=(r(n)-i+360)%360;return a>180&&(i=r(n),a=360-a),{a1:i,d:a}},b=(e,t,n,r,i)=>{let{a1:a,d:o}=y(e,t,n);return v(e[0],e[1],r,a,a+o,i)},x=(e,n,r)=>e.map((i,a)=>{let{a1:o,d:s}=y(i,e[(a+3)%4],e[(a+1)%4]),[c,l]=g(0,0,-30,o+s/2),[u,d]=g(i[0],i[1],n,o),[f,p]=g(i[0],i[1],n,o+s);return`<path d="M ${_(u)} ${_(d)} A ${n} ${n} 0 0 0 ${_(f)} ${_(p)}" fill="none" stroke="${t}" stroke-width="2.5" stroke-dasharray="7 6"/>
      <g transform="translate(${_(c)} ${_(l)})">${v(i[0],i[1],n,o,o+s,r[a])}</g>`}).join(`
      `),S=(e,t,n)=>[78.8,98,90,93.2].map((r,i)=>{let a=45+90*i,[o,s]=g(e,t,34,a);return v(Math.round(o),Math.round(s),58,a-r/2,a+r/2,n[i])}).join(`
    `),C=(e,n=f)=>`<polygon points="${e.map(e=>e.join(`,`)).join(` `)}" fill="${n}" stroke="${t}" stroke-width="3" stroke-linejoin="round"/>`,w=(e,n,r,i)=>`<line x1="${_(e)}" y1="${_(n)}" x2="${_(r)}" y2="${_(i)}" stroke="${t}" stroke-width="4" stroke-linecap="round"/>`,T=(e,n,r,i=22)=>`<path d="M ${e[0]+n[0]*i} ${e[1]+n[1]*i} L ${e[0]+(n[0]+r[0])*i} ${e[1]+(n[1]+r[1])*i} L ${e[0]+r[0]*i} ${e[1]+r[1]*i}" fill="none" stroke="${t}" stroke-width="2.5"/>`,E=`<path d="M18 11V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2"/><path d="M14 10V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v2"/><path d="M10 10.5V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2v8"/><path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"/>`,D=`<g transform="translate(192 76) scale(-7 7)" fill="none" stroke="${s}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">${E}</g>`,O=`<g transform="translate(528 76) scale(7)" fill="none" stroke="${n}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">${E}</g>`,k=[[90,350],[170,90],[420,130],[380,380]],A=[[120,450],[230,130],[650,160],[720,450]],j=[[150,420],[300,150],[720,150],[570,420]],M=[[200,540],[200,400],[620,287.5],[620,540]],N=(e,t,n)=>e.map((r,i)=>b(r,e[(i+3)%4],e[(i+1)%4],t,n[i])).join(`
    `),P={FACTS:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1120 440" class="w-full h-full">
    ${m(1120,440)}
    ${v(80,300,70,0,90,c)}
    ${w(80,300,230,300)}
    ${w(80,300,80,130)}
    ${T([80,300],[1,0],[0,-1],30)}
    <text x="140" y="390" font-family="${p}" font-size="30" font-weight="bold" fill="${i}" text-anchor="middle">90°</text>
    <text x="140" y="80" font-family="${p}" font-size="26" fill="${t}" text-anchor="middle">a right angle</text>
    ${v(410,300,70,0,180,l)}
    ${w(300,300,520,300)}
    <circle cx="410" cy="300" r="5" fill="${t}"/>
    <text x="410" y="390" font-family="${p}" font-size="30" font-weight="bold" fill="${a}" text-anchor="middle">180°</text>
    <text x="410" y="80" font-family="${p}" font-size="26" fill="${t}" text-anchor="middle">a straight line</text>
    ${v(690,250,85,0,359.9,d)}
    ${w(690,250,775,250)}
    <circle cx="690" cy="250" r="5" fill="${t}"/>
    <text x="690" y="390" font-family="${p}" font-size="30" font-weight="bold" fill="${n}" text-anchor="middle">360°</text>
    <text x="690" y="80" font-family="${p}" font-size="26" fill="${t}" text-anchor="middle">a full turn</text>
    ${C([[870,320],[1060,320],[940,140]],u)}
    <text x="965" y="390" font-family="${p}" font-size="30" font-weight="bold" fill="${o}" text-anchor="middle">180°</text>
    <text x="965" y="80" font-family="${p}" font-size="26" fill="${t}" text-anchor="middle">a triangle</text>
  </svg>`,LINE:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${m(840,560)}
    ${v(420,380,80,0,50,d)}
    ${v(420,380,62,50,180,c)}
    ${w(80,380,760,380)}
    ${w(420,380,612.8,150.2)}
    <circle cx="420" cy="380" r="6" fill="${t}"/>
    <text x="530" y="352" font-family="${p}" font-size="44" font-weight="bold" fill="${n}" text-anchor="middle">a</text>
    <text x="368" y="296" font-family="${p}" font-size="40" font-weight="bold" fill="${i}" text-anchor="middle">130°</text>
    <text x="420" y="470" font-family="${p}" font-size="30" fill="${r}" text-anchor="middle">a straight line</text>
  </svg>`,PIZZA:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1120 440" class="w-full h-full">
    ${m(1120,440)}
    <image href="${e}" x="30" y="25" width="520" height="390" preserveAspectRatio="xMidYMid meet"/>
    ${[0,45,90,135,180,225,270,315].map((e,t)=>v(840,205,165,e,e+45,t===0?d:`#ffffff`)).join(`
    `)}
    <text x="940" y="186" font-family="${p}" font-size="34" font-weight="bold" fill="${n}" text-anchor="middle">45°</text>
    <text x="840" y="420" font-family="${p}" font-size="34" font-weight="bold" fill="${t}" text-anchor="middle">8 × 45° = 360°</text>
  </svg>`,POINT:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${m(840,560)}
    ${v(420,290,62,20,120,c)}
    ${v(420,290,62,120,240,l)}
    ${v(420,290,80,240,380,d)}
    ${w(420,290,626.7,214.8)}
    ${w(420,290,310,99.5)}
    ${w(420,290,310,480.5)}
    <circle cx="420" cy="290" r="6" fill="${t}"/>
    <text x="458" y="200" font-family="${p}" font-size="36" font-weight="bold" fill="${i}" text-anchor="middle">100°</text>
    <text x="300" y="302" font-family="${p}" font-size="36" font-weight="bold" fill="${a}" text-anchor="middle">120°</text>
    <text x="490" y="375" font-family="${p}" font-size="44" font-weight="bold" fill="${n}" text-anchor="middle">b</text>
    <text x="640" y="470" font-family="${p}" font-size="30" fill="${r}" text-anchor="middle">round a point</text>
  </svg>`,SUM_SOME:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${m(840,560)}
    <text x="420" y="66" font-family="${p}" font-size="32" font-weight="bold" fill="${t}" text-anchor="middle">They sound the same.</text>
    <rect x="50" y="110" width="740" height="180" rx="16" fill="${f}" stroke="${r}" stroke-width="2"/>
    <text x="90" y="200" font-family="${p}" font-size="64" font-weight="bold" fill="${r}">some</text>
    <text x="290" y="192" font-family="${p}" font-size="32" fill="${t}">Can I have some rice?</text>
    <text x="290" y="240" font-family="${p}" font-size="24" fill="${r}">everyday English</text>
    <rect x="50" y="330" width="740" height="180" rx="16" fill="${d}" stroke="${n}" stroke-width="2"/>
    <text x="90" y="420" font-family="${p}" font-size="64" font-weight="bold" fill="${n}">sum</text>
    <text x="290" y="412" font-family="${p}" font-size="32" fill="${t}">The sum of 3, 4 and 5 is 12.</text>
    <text x="290" y="460" font-family="${p}" font-size="24" fill="${n}">maths: add them all</text>
  </svg>`,QUADS:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${m(840,560)}
    ${C([[80,80],[220,80],[220,220],[80,220]],c)}
    <text x="150" y="262" font-family="${p}" font-size="26" fill="${t}" text-anchor="middle">square</text>
    ${C([[320,95],[520,95],[520,205],[320,205]],c)}
    <text x="420" y="262" font-family="${p}" font-size="26" fill="${t}" text-anchor="middle">rectangle</text>
    ${C([[610,205],[650,95],[800,95],[760,205]],l)}
    <text x="705" y="262" font-family="${p}" font-size="26" fill="${t}" text-anchor="middle">parallelogram</text>
    ${C([[150,310],[80,370],[150,480],[220,370]],u)}
    <text x="150" y="522" font-family="${p}" font-size="26" fill="${t}" text-anchor="middle">kite</text>
    ${C([[330,470],[370,340],[470,340],[510,470]],d)}
    <text x="420" y="522" font-family="${p}" font-size="26" fill="${t}" text-anchor="middle">trapezium</text>
    ${C([[620,460],[650,345],[790,325],[760,480]],f)}
    <text x="705" y="522" font-family="${p}" font-size="26" fill="${t}" text-anchor="middle">any 4 sides</text>
  </svg>`,CORNERS:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1120 440" class="w-full h-full">
    ${m(1120,440)}
    ${C(k)}
    ${N(k,48,[c,l,d,u])}
    <text x="150" y="320" font-family="${p}" font-size="34" font-weight="bold" fill="${i}" text-anchor="middle">a</text>
    <text x="208" y="161" font-family="${p}" font-size="34" font-weight="bold" fill="${a}" text-anchor="middle">b</text>
    <text x="362" y="182" font-family="${p}" font-size="34" font-weight="bold" fill="${n}" text-anchor="middle">c</text>
    <text x="336" y="333" font-family="${p}" font-size="34" font-weight="bold" fill="${o}" text-anchor="middle">d</text>
    <line x1="480" y1="225" x2="650" y2="225" stroke="${t}" stroke-width="5" stroke-linecap="round"/>
    <path d="M 650 210 L 676 225 L 650 240 Z" fill="${t}"/>
    <text x="575" y="200" font-family="${p}" font-size="28" fill="${t}" text-anchor="middle">tear off</text>
    ${v(880,210,140,0,78.8,c)}
    ${v(880,210,140,78.8,176.8,l)}
    ${v(880,210,140,176.8,266.8,d)}
    ${v(880,210,140,266.8,360,u)}
    <text x="946" y="166" font-family="${p}" font-size="34" font-weight="bold" fill="${i}" text-anchor="middle">a</text>
    <text x="828" y="153" font-family="${p}" font-size="34" font-weight="bold" fill="${a}" text-anchor="middle">b</text>
    <text x="817" y="277" font-family="${p}" font-size="34" font-weight="bold" fill="${n}" text-anchor="middle">c</text>
    <text x="938" y="282" font-family="${p}" font-size="34" font-weight="bold" fill="${o}" text-anchor="middle">d</text>
    <text x="880" y="410" font-family="${p}" font-size="32" font-weight="bold" fill="${t}" text-anchor="middle">a + b + c + d = 360°</text>
  </svg>`,QUAD_TRI:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${m(840,560)}
    ${C([[120,420],[200,120],[720,430]],c)}
    ${C([[200,120],[640,90],[720,430]],l)}
    <text x="345" y="335" font-family="${p}" font-size="40" font-weight="bold" fill="${i}" text-anchor="middle">180°</text>
    <text x="525" y="225" font-family="${p}" font-size="40" font-weight="bold" fill="${a}" text-anchor="middle">180°</text>
    <text x="420" y="515" font-family="${p}" font-size="40" font-weight="bold" fill="${t}" text-anchor="middle">180° + 180° = 360°</text>
  </svg>`,WORKED:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${m(840,560)}
    ${C(A)}
    ${N(A,50,[c,c,c,d])}
    <text x="198" y="414" font-family="${p}" font-size="34" font-weight="bold" fill="${i}" text-anchor="middle">70°</text>
    <text x="292" y="218" font-family="${p}" font-size="34" font-weight="bold" fill="${i}" text-anchor="middle">95°</text>
    <text x="582" y="244" font-family="${p}" font-size="34" font-weight="bold" fill="${i}" text-anchor="middle">120°</text>
    <text x="660" y="418" font-family="${p}" font-size="42" font-weight="bold" fill="${n}" text-anchor="middle">d</text>
  </svg>`,PHRASES:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1120 440" class="w-full h-full">
    ${m(1120,440)}
    <text x="40" y="52" font-family="${p}" font-size="26" font-weight="bold" fill="${r}">The question says…</text>
    <text x="700" y="52" font-family="${p}" font-size="26" font-weight="bold" fill="${n}">It means…</text>
    <line x1="30" y1="72" x2="1090" y2="72" stroke="#cfd8dc" stroke-width="2"/>
    <text x="40" y="118" font-family="${p}" font-size="25" fill="${t}">Calculate the value of a.</text>
    <text x="700" y="118" font-family="${p}" font-size="25" font-weight="bold" fill="${n}">Find the number a.</text>
    <text x="40" y="186" font-family="${p}" font-size="25" fill="${t}">Work out the size of the angles that have a letter.</text>
    <text x="700" y="186" font-family="${p}" font-size="25" font-weight="bold" fill="${n}">Find every lettered angle.</text>
    <text x="40" y="254" font-family="${p}" font-size="25" fill="${t}">AB is a straight line.</text>
    <text x="700" y="254" font-family="${p}" font-size="25" font-weight="bold" fill="${n}">Use 180°.</text>
    <text x="40" y="322" font-family="${p}" font-size="25" fill="${t}">The other angles are the same size.</text>
    <text x="700" y="322" font-family="${p}" font-size="25" font-weight="bold" fill="${n}">They are equal.</text>
    <text x="40" y="390" font-family="${p}" font-size="25" fill="${t}">Give a reason.</text>
    <text x="700" y="390" font-family="${p}" font-size="25" font-weight="bold" fill="${n}">Say which fact you used.</text>
  </svg>`,PRACTICE:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${m(840,560)}
    <circle cx="44" cy="52" r="22" fill="${t}"/>
    <text x="44" y="61" font-family="${p}" font-size="26" font-weight="bold" fill="#ffffff" text-anchor="middle">1</text>
    ${v(210,200,70,0,35,d)}
    ${v(210,200,52,35,180,c)}
    ${w(40,200,380,200)}
    ${w(210,200,349.3,102.5)}
    <text x="290" y="190" font-family="${p}" font-size="34" font-weight="bold" fill="${n}" text-anchor="middle">x</text>
    <text x="176" y="140" font-family="${p}" font-size="30" font-weight="bold" fill="${i}" text-anchor="middle">145°</text>
    <circle cx="470" cy="52" r="22" fill="${t}"/>
    <text x="470" y="61" font-family="${p}" font-size="26" font-weight="bold" fill="#ffffff" text-anchor="middle">2</text>
    ${v(640,160,38,0,150,c)}
    ${v(640,160,38,150,235,l)}
    ${v(640,160,46,235,360,d)}
    ${w(640,160,780,160)}
    ${w(640,160,536,100)}
    ${w(640,160,571,258)}
    <text x="664" y="98" font-family="${p}" font-size="30" font-weight="bold" fill="${i}" text-anchor="middle">150°</text>
    <text x="560" y="194" font-family="${p}" font-size="30" font-weight="bold" fill="${a}" text-anchor="middle">85°</text>
    <text x="680" y="250" font-family="${p}" font-size="34" font-weight="bold" fill="${n}" text-anchor="middle">y</text>
    <circle cx="80" cy="400" r="22" fill="${t}"/>
    <text x="80" y="409" font-family="${p}" font-size="26" font-weight="bold" fill="#ffffff" text-anchor="middle">3</text>
    ${C(M)}
    ${b(M[1],M[0],M[2],46,c)}
    ${b(M[2],M[1],M[3],46,d)}
    ${T(M[0],[0,-1],[1,0],24)}
    ${T(M[3],[0,-1],[-1,0],24)}
    <text x="262" y="458" font-family="${p}" font-size="30" font-weight="bold" fill="${i}" text-anchor="middle">105°</text>
    <text x="574" y="356" font-family="${p}" font-size="34" font-weight="bold" fill="${n}" text-anchor="middle">z</text>
  </svg>`,PARA:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${m(840,560)}
    ${C(j)}
    ${N(j,50,[c,d,c,d])}
    <text x="234" y="384" font-family="${p}" font-size="34" font-weight="bold" fill="${i}" text-anchor="middle">65°</text>
    <text x="337" y="222" font-family="${p}" font-size="38" font-weight="bold" fill="${n}" text-anchor="middle">p</text>
    <text x="638" y="217" font-family="${p}" font-size="38" font-weight="bold" fill="${i}" text-anchor="middle">q</text>
    <text x="533" y="368" font-family="${p}" font-size="38" font-weight="bold" fill="${n}" text-anchor="middle">r</text>
    <text x="420" y="505" font-family="${p}" font-size="28" fill="${r}" text-anchor="middle">a parallelogram</text>
  </svg>`,TILES:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${m(840,560)}
    ${C([[420,280],[420,130],[270,130],[270,280]],c)}
    ${C([[420,280],[270,280],[270,430],[420,430]],c)}
    ${C([[420,280],[420,430],[549.9,355]],l)}
    ${T([420,280],[0,-1],[-1,0],24)}
    ${T([420,280],[-1,0],[0,1],24)}
    ${v(420,280,80,330,450,d)}
    <text x="345" y="214" font-family="${p}" font-size="26" fill="${t}" text-anchor="middle">square</text>
    <text x="345" y="364" font-family="${p}" font-size="26" fill="${t}" text-anchor="middle">square</text>
    <text x="448" y="368" font-family="${p}" font-size="26" font-weight="bold" fill="${a}" text-anchor="middle">60°</text>
    <text x="466" y="268" font-family="${p}" font-size="40" font-weight="bold" fill="${n}" text-anchor="middle">y</text>
    <text x="640" y="470" font-family="${p}" font-size="26" fill="${a}" text-anchor="middle">equilateral triangle</text>
  </svg>`,READ:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1120 440" class="w-full h-full">
    ${m(1120,440)}
    ${v(60,270,70,0,60,c)}
    ${w(60,270,250,270)}
    ${w(60,270,155,105.5)}
    <text x="150" y="238" font-family="${p}" font-size="36" font-weight="bold" fill="${i}" text-anchor="middle">60°</text>
    <text x="150" y="350" font-family="${p}" font-size="26" font-weight="bold" fill="${i}" text-anchor="middle">a number</text>
    <text x="150" y="390" font-family="${p}" font-size="24" fill="${t}" text-anchor="middle">We know this angle.</text>
    ${v(340,270,70,0,60,d)}
    ${w(340,270,530,270)}
    ${w(340,270,435,105.5)}
    <text x="425" y="240" font-family="${p}" font-size="44" font-weight="bold" fill="${n}" text-anchor="middle">a</text>
    <text x="430" y="350" font-family="${p}" font-size="26" font-weight="bold" fill="${n}" text-anchor="middle">a letter</text>
    <text x="430" y="390" font-family="${p}" font-size="24" fill="${t}" text-anchor="middle">Find this angle.</text>
    ${w(640,270,820,270)}
    ${w(640,270,640,100)}
    ${T([640,270],[1,0],[0,-1],34)}
    <text x="715" y="350" font-family="${p}" font-size="26" font-weight="bold" fill="${a}" text-anchor="middle">a small square</text>
    <text x="715" y="390" font-family="${p}" font-size="24" fill="${t}" text-anchor="middle">This angle is 90°.</text>
    <text x="975" y="250" font-family="${p}" font-size="110" font-weight="bold" fill="${o}" text-anchor="middle">°</text>
    <text x="975" y="350" font-family="${p}" font-size="26" font-weight="bold" fill="${o}" text-anchor="middle">degrees</text>
    <text x="975" y="390" font-family="${p}" font-size="24" fill="${t}" text-anchor="middle">60° = 60 degrees</text>
  </svg>`,PIZZA_Q:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${m(840,560)}
    <image href="${e}" x="25" y="90" width="400" height="380" preserveAspectRatio="xMidYMid meet"/>
    ${[0,45,90,135,180,225,270,315].map((e,t)=>v(630,260,170,e,e+45,t===0?d:`#ffffff`)).join(`
    `)}
    <text x="732" y="232" font-family="${p}" font-size="48" font-weight="bold" fill="${n}" text-anchor="middle">?</text>
    <text x="630" y="490" font-family="${p}" font-size="30" fill="${t}" text-anchor="middle">8 equal slices</text>
  </svg>`,TEAR:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1120 440" class="w-full h-full">
    ${m(1120,440)}
    <g transform="translate(-4 24) scale(0.75)">
      ${C(k)}
      ${N(k,48,[c,l,d,u])}
    </g>
    <text x="109" y="264" font-family="${p}" font-size="28" font-weight="bold" fill="${i}" text-anchor="middle">a</text>
    <text x="152" y="145" font-family="${p}" font-size="28" font-weight="bold" fill="${a}" text-anchor="middle">b</text>
    <text x="268" y="161" font-family="${p}" font-size="28" font-weight="bold" fill="${n}" text-anchor="middle">c</text>
    <text x="248" y="274" font-family="${p}" font-size="28" font-weight="bold" fill="${o}" text-anchor="middle">d</text>
    <g transform="translate(369 24) scale(0.75)">
      ${C(k,`#ffffff`)}
      ${x(k,48,[c,l,d,u])}
    </g>
    ${S(933,200,[c,l,d,u])}
    <circle cx="933" cy="200" r="6" fill="${t}"/>
    <text x="933" y="325" font-family="${p}" font-size="44" font-weight="bold" fill="${n}" text-anchor="middle">?</text>
    <circle cx="40" cy="44" r="22" fill="${t}"/>
    <text x="40" y="53" font-family="${p}" font-size="26" font-weight="bold" fill="#ffffff" text-anchor="middle">1</text>
    <circle cx="413" cy="44" r="22" fill="${t}"/>
    <text x="413" y="53" font-family="${p}" font-size="26" font-weight="bold" fill="#ffffff" text-anchor="middle">2</text>
    <circle cx="786" cy="44" r="22" fill="${t}"/>
    <text x="786" y="53" font-family="${p}" font-size="26" font-weight="bold" fill="#ffffff" text-anchor="middle">3</text>
    <text x="187" y="395" font-family="${p}" font-size="26" fill="${t}" text-anchor="middle">Draw. Mark the corners.</text>
    <text x="560" y="395" font-family="${p}" font-size="26" fill="${t}" text-anchor="middle">Tear off the corners.</text>
    <text x="933" y="395" font-family="${p}" font-size="26" fill="${t}" text-anchor="middle">Put the points together.</text>
  </svg>`,ANS_YES:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 320" class="w-full h-full">
    ${m(720,320)}
    ${D}
    <text x="440" y="214" font-family="${p}" font-size="140" font-weight="bold" fill="${s}" text-anchor="middle">Yes</text>
  </svg>`,ANS_NO:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 320" class="w-full h-full">
    ${m(720,320)}
    ${O}
    <text x="280" y="214" font-family="${p}" font-size="140" font-weight="bold" fill="${n}" text-anchor="middle">No</text>
  </svg>`,ANS_SOME:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 320" class="w-full h-full">
    ${m(720,320)}
    ${D}
    <text x="460" y="150" font-family="${p}" font-size="64" font-weight="bold" fill="${s}" text-anchor="middle">Only</text>
    <text x="460" y="230" font-family="${p}" font-size="64" font-weight="bold" fill="${s}" text-anchor="middle">some</text>
  </svg>`,ANS_ALL:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 320" class="w-full h-full">
    ${m(720,320)}
    ${O}
    <text x="260" y="150" font-family="${p}" font-size="64" font-weight="bold" fill="${n}" text-anchor="middle">Every</text>
    <text x="260" y="230" font-family="${p}" font-size="64" font-weight="bold" fill="${n}" text-anchor="middle">one</text>
  </svg>`};P.PIC_LINE=P.LINE.replace(`>a</text>`,`>?</text>`),P.PIC_POINT=P.POINT.replace(`>b</text>`,`>?</text>`),P.PIC_QUAD=P.WORKED.replace(`>d</text>`,`>?</text>`);var F=`#0087a8`,I=`#5c2483`,L=`#c25e12`,R=`#4a8b23`,z=`#1a5fa8`,B={meta:{course:`y7-math`,unit:`5.1`,id:`U05_1`,title:`A Sum of 360°`,subtitle:`Angles on a line, round a point and in a quadrilateral`,objective:`Use angles on a straight line (180°), angles around a point (360°) and angles in a quadrilateral (360°) to find missing angles; know the key words sum and quadrilateral; use the opposite angles of a parallelogram; and read the instruction words of a Workbook angle question.`,order:17,french:!0,vietnamese:!1,dashboard:{track:`Y7_MATH`,unit:`U05_1`}},slides:[{layout:`hero`,color:I,icon:`Triangle`,brand:`Year 7 Mathematics`,brandFr:`Maths 7e année`,eyebrow:`Unit 5 · 5.1`,eyebrowFr:`Unité 5 · 5.1`,date:`26 Oct 2026`,title:`A Sum of 360°`,titleFr:`Une somme de 360°`,card:{icon:`Pencil`,badge:`Starter Task`,badgeFr:`Pour commencer`,text:`How many degrees? Write four numbers: a **right angle**, a **straight line**, a **full turn**, and the three angles of a **triangle**.`,textFr:`Combien de degrés\xA0? Écris quatre nombres\xA0: un **angle droit**, une **ligne droite**, un **tour complet**, et les trois angles d’un **triangle**.`}},{layout:`showcase`,accent:I,icon:`CheckCircle2`,eyebrow:`Starter check`,eyebrowFr:`Correction`,title:`Four Numbers`,titleFr:`Quatre nombres`,inlineSvg:P.FACTS,caption:`Today we use **180°** and **360°** again and again.`,captionFr:`Aujourd’hui, on utilise **180°** et **360°** encore et encore.`},{layout:`compare`,accent:F,icon:`Target`,eyebrow:`Today`,eyebrowFr:`Aujourd’hui`,title:`Today You Will…`,titleFr:`Aujourd’hui, tu vas…`,text:`Find a **missing angle**.`,textFr:`Trouver un **angle qui manque**.`,columns:[{heading:`On a line`,headingFr:`Sur une ligne`,accent:F,icon:`Minus`,inlineSvg:P.PIC_LINE,caption:`Find a missing angle on a line.`,captionFr:`Trouver un angle sur une ligne.`},{heading:`Round a point`,headingFr:`Autour d’un point`,accent:I,icon:`Circle`,inlineSvg:P.PIC_POINT,caption:`Find a missing angle round a point.`,captionFr:`Trouver un angle autour d’un point.`},{heading:`In a 4-sided shape`,headingFr:`Dans une figure à 4 côtés`,accent:L,icon:`Square`,inlineSvg:P.PIC_QUAD,caption:`Find the last angle of a 4-sided shape.`,captionFr:`Trouver le dernier angle à 4 côtés.`}]},{layout:`showcase`,accent:I,icon:`ScanEye`,eyebrow:`Read the picture`,eyebrowFr:`Lis le dessin`,title:`How to Read an Angle`,titleFr:`Comment lire un angle`,inlineSvg:P.READ,caption:`A **letter** is a missing angle. Your job is to find it.`,captionFr:`Une **lettre** est un angle qui manque. Ton travail\xA0: le trouver.`},{layout:`split`,accent:F,icon:`Minus`,eyebrow:`Angle fact`,eyebrowFr:`Propriété`,title:`On a Straight Line`,titleFr:`Sur une ligne droite`,ratio:45,inlineSvg:P.LINE,content:`Together, the two angles make the **straight line**.`,contentFr:`Ensemble, les deux angles font la **ligne droite**.`,notes:[{tone:`write`,text:`Angles on a **straight line** add up to **180°**.`,textFr:`Les angles sur une **ligne droite** font **180°** en tout.`}],reveal:{prompt:`Find **a**.`,promptFr:`Trouve **a**.`,label:`Check your answer`,labelFr:`Vérifie ta réponse`,answer:`**a = 180° − 130° = 50°**`,answerFr:`**a = 180° − 130° = 50°**`}},{layout:`compare`,accent:I,icon:`Hand`,eyebrow:`Vote with one hand`,eyebrowFr:`Vote avec une main`,title:`Is It Straight?`,titleFr:`Est-ce droit\xA0?`,text:`Two angles are **57°** and **121°**. Together, do they make a **straight line**?`,textFr:`Deux angles font **57°** et **121°**. Ensemble, font-ils une **ligne droite**\xA0?`,columns:[{heading:`A · left hand up`,headingFr:`A · main gauche levée`,accent:z,icon:`Hand`,inlineSvg:P.ANS_YES},{heading:`B · right hand up`,headingFr:`B · main droite levée`,accent:L,icon:`Hand`,inlineSvg:P.ANS_NO}]},{layout:`statement`,accent:`#c8102e`,eyebrow:`Answer: B`,eyebrowFr:`Réponse\xA0: B`,title:`Not Quite Straight`,titleFr:`Pas tout à fait droite`,text:`**57° + 121° = 178°**. A straight line is **180°**.`,textFr:`**57° + 121° = 178°**. Une ligne droite fait **180°**.`,sub:`So it is **not** straight. It can look straight. Always add.`,subFr:`Donc elle n’est **pas** droite. Elle peut sembler droite. Additionne toujours.`},{layout:`split`,accent:L,icon:`Circle`,eyebrow:`Think · a full turn`,eyebrowFr:`Réfléchis · un tour complet`,title:`Mr Bowen’s Pizza`,titleFr:`La pizza de M. Bowen`,ratio:40,inlineSvg:P.PIZZA_Q,content:`Mr Bowen cuts his pizza into **8 equal slices**.

What angle is **one** slice?`,contentFr:`M. Bowen coupe sa pizza en **8 parts égales**.

Quel est l’angle d’**une** part\xA0?`,reveal:{label:`Check your answer`,labelFr:`Vérifie ta réponse`,answer:`A full turn is **360°**. **360° ÷ 8 = 45°**`,answerFr:`Un tour complet fait **360°**. **360° ÷ 8 = 45°**`}},{layout:`split`,accent:F,icon:`Circle`,eyebrow:`Angle fact`,eyebrowFr:`Propriété`,title:`Round a Point`,titleFr:`Autour d’un point`,ratio:45,inlineSvg:P.POINT,content:`Together, the angles make a **full turn**.`,contentFr:`Ensemble, les angles font un **tour complet**.`,notes:[{tone:`write`,text:`Angles **around a point** add up to **360°**.`,textFr:`Les angles **autour d’un point** font **360°** en tout.`}],reveal:{prompt:`Find **b**.`,promptFr:`Trouve **b**.`,label:`Check your answer`,labelFr:`Vérifie ta réponse`,answer:`**100° + 120° = 220°**
**b = 360° − 220° = 140°**`,answerFr:`**100° + 120° = 220°**
**b = 360° − 220° = 140°**`}},{layout:`callout`,accent:L,icon:`ListOrdered`,eyebrow:`The method`,eyebrowFr:`La méthode`,title:`Two Steps`,titleFr:`Deux étapes`,notes:[{tone:`write`,text:`**To find a missing angle:**
**1.** Add the angles you know.
**2.** Subtract the total from **180°** or **360°**.`,textFr:`**Pour trouver un angle qui manque\xA0:**
**1.** Additionne les angles que tu connais.
**2.** Soustrais le total de **180°** ou de **360°**.`}],reveal:{prompt:`Three angles round a point are **90°**, **150°** and **c**. Find **c**.`,promptFr:`Trois angles autour d’un point font **90°**, **150°** et **c**. Trouve **c**.`,label:`Check your answer`,labelFr:`Vérifie ta réponse`,answer:`**1.** **90° + 150° = 240°**, **2.** **c = 360° − 240° = 120°**`,answerFr:`**1.** **90° + 150° = 240°**, **2.** **c = 360° − 240° = 120°**`}},{layout:`split`,accent:L,icon:`MessageSquare`,eyebrow:`Key word · English check`,eyebrowFr:`Mot clé · point d’anglais`,title:`Sum`,titleFr:`La somme`,ratio:45,inlineSvg:P.SUM_SOME,notes:[{tone:`write`,text:`**Sum:** the total when you add numbers together.`,textFr:`**Somme (sum)\xA0:** le total quand on additionne des nombres.`},{tone:`info`,badge:!1,text:`**A sum of 360°** means they **add up to** 360°.`,textFr:`**A sum of 360°** veut dire qu’ils **font 360° en tout**.`}]},{layout:`split`,accent:L,icon:`Square`,eyebrow:`Key word`,eyebrowFr:`Mot clé`,title:`Quadrilateral`,titleFr:`Le quadrilatère`,ratio:45,inlineSvg:P.QUADS,content:`**quad** = 4 · **lateral** = side`,contentFr:`**quad** = 4 · **lateral** = côté`,notes:[{tone:`write`,text:`**Quadrilateral:** a flat shape with **four** straight sides.`,textFr:`**Quadrilatère (quadrilateral)\xA0:** une figure plane à **quatre** côtés droits.`}]},{layout:`compare`,accent:I,icon:`Hand`,eyebrow:`Vote with one hand`,eyebrowFr:`Vote avec une main`,title:`Every Quadrilateral?`,titleFr:`Tous les quadrilatères\xA0?`,text:`A square’s four angles add up to **360°**. Is that true for **every** quadrilateral?`,textFr:`Les quatre angles d’un carré font **360°**. Est-ce vrai pour **tous** les quadrilatères\xA0?`,columns:[{heading:`A · left hand up`,headingFr:`A · main gauche levée`,accent:z,icon:`Hand`,inlineSvg:P.ANS_SOME},{heading:`B · right hand up`,headingFr:`B · main droite levée`,accent:L,icon:`Hand`,inlineSvg:P.ANS_ALL}]},{layout:`showcase`,accent:R,icon:`PenLine`,eyebrow:`Try it · scrap paper`,eyebrowFr:`Essaie · papier brouillon`,title:`Tear Off the Corners`,titleFr:`Déchire les coins`,inlineSvg:P.TEAR,caption:`Make your shape **strange**. What do the four corners make?`,captionFr:`Fais une figure **bizarre**. Que font les quatre coins\xA0?`},{layout:`showcase`,accent:R,icon:`Circle`,eyebrow:`Answer: B`,eyebrowFr:`Réponse\xA0: B`,title:`Always a Full Turn`,titleFr:`Toujours un tour complet`,inlineSvg:P.CORNERS,caption:`Every shape, every time: the corners make a **full turn**.`,captionFr:`Chaque figure, chaque fois\xA0: les coins font un **tour complet**.`},{layout:`split`,accent:F,icon:`Square`,eyebrow:`Angle fact`,eyebrowFr:`Propriété`,title:`A Sum of 360°`,titleFr:`Une somme de 360°`,ratio:45,inlineSvg:P.QUAD_TRI,content:`Another way to see it: one line makes **two triangles**.`,contentFr:`Une autre façon de le voir\xA0: une ligne fait **deux triangles**.`,notes:[{tone:`write`,text:`The angles in a **quadrilateral** add up to **360°**.`,textFr:`Les angles d’un **quadrilatère** font **360°** en tout.`}]},{layout:`split`,accent:L,icon:`ListOrdered`,eyebrow:`Two steps · say them first`,eyebrowFr:`Deux étapes · dis-les avant`,title:`Find the Fourth Angle`,titleFr:`Trouve le quatrième angle`,ratio:45,inlineSvg:P.WORKED,content:`Three angles of a quadrilateral are **70°**, **95°** and **120°**.`,contentFr:`Trois angles d’un quadrilatère font **70°**, **95°** et **120°**.`,reveal:{prompt:`Find **d**.`,promptFr:`Trouve **d**.`,label:`Check your answer`,labelFr:`Vérifie ta réponse`,answer:`**1.** **70° + 95° + 120° = 285°**
**2.** **d = 360° − 285° = 75°**`,answerFr:`**1.** **70° + 95° + 120° = 285°**
**2.** **d = 360° − 285° = 75°**`}},{layout:`showcase`,accent:I,icon:`MessageSquare`,eyebrow:`English check`,eyebrowFr:`Point d’anglais`,title:`Read the Question`,titleFr:`Lis la question`,inlineSvg:P.PHRASES,caption:`**Calculate** and **work out** both mean **find**.`,captionFr:`**Calculate** et **work out** veulent dire **trouve** (calcule).`},{layout:`split`,accent:R,icon:`CheckCircle2`,eyebrow:`Whiteboards`,eyebrowFr:`Ardoises`,title:`One of Each`,titleFr:`Un de chaque`,ratio:40,inlineSvg:P.PRACTICE,content:`Work out the size of the angles that have a letter.

First decide: **180°** or **360°**?`,contentFr:`Work out the size of the angles that have a letter\xA0: calcule les angles qui ont une lettre.

Décide d’abord\xA0: **180°** ou **360°**\xA0?`,reveal:{label:`Check your answers`,labelFr:`Vérifie tes réponses`,answer:`**1** **x = 35°** (180°), **2** **y = 125°** (360°), **3** **z = 75°** (360°)`,answerFr:`**1** **x = 35°** (180°), **2** **y = 125°** (360°), **3** **z = 75°** (360°)`}},{layout:`statement`,accent:R,eyebrow:`Whiteboards`,eyebrowFr:`Ardoises`,title:`Three the Same`,titleFr:`Trois pareils`,text:`One angle of a quadrilateral is **150°**. The other three angles are **the same size**.`,textFr:`Un angle d’un quadrilatère fait **150°**. Les trois autres angles sont **égaux**.`,sub:`Work out the size of the other angles. Start with **360° − 150°**.`,subFr:`Calcule la taille des autres angles. Commence par **360° − 150°**.`,reveal:{label:`Check your answer`,labelFr:`Vérifie ta réponse`,answer:`**360° − 150° = 210°**, and **210° ÷ 3 = 70°** each`,answerFr:`**360° − 150° = 210°**, et **210° ÷ 3 = 70°** chacun`}},{layout:`split`,accent:F,icon:`Square`,eyebrow:`Angle fact`,eyebrowFr:`Propriété`,title:`Parallelogram`,titleFr:`Le parallélogramme`,ratio:45,inlineSvg:P.PARA,content:`One angle is **65°**. Find **q** first. Then **p** and **r**.`,contentFr:`Un angle fait **65°**. Trouve d’abord **q**. Puis **p** et **r**.`,notes:[{tone:`write`,text:`In a **parallelogram**, opposite angles are **equal**.`,textFr:`Dans un **parallélogramme**, les angles opposés sont **égaux**.`}],reveal:{label:`Check your answer`,labelFr:`Vérifie ta réponse`,answer:`**q = 65°**. **360° − 65° − 65° = 230°**, so **p = r = 115°**`,answerFr:`**q = 65°**. **360° − 65° − 65° = 230°**, donc **p = r = 115°**`}},{layout:`split`,accent:I,icon:`Trophy`,eyebrow:`Challenge`,eyebrowFr:`Défi`,title:`Shapes Round a Point`,titleFr:`Des figures autour d’un point`,ratio:45,inlineSvg:P.TILES,content:`Two squares and an equilateral triangle meet at a point. Find **y**.`,contentFr:`Deux carrés et un triangle équilatéral se rejoignent en un point. Trouve **y**.`,notes:[{tone:`info`,badge:!1,text:`Every angle in an **equilateral** triangle is **60°**.`,textFr:`Chaque angle d’un triangle **équilatéral** fait **60°**.`}],reveal:{label:`Check your answer`,labelFr:`Vérifie ta réponse`,answer:`**1.** **90° + 90° + 60° = 240°**
**2.** **y = 360° − 240° = 120°**`,answerFr:`**1.** **90° + 90° + 60° = 240°**
**2.** **y = 360° − 240° = 120°**`}},{layout:`callout`,accent:R,icon:`RotateCcw`,eyebrow:`Word problem`,eyebrowFr:`Problème`,title:`Mr Bowen’s Chair`,titleFr:`La chaise de M. Bowen`,content:`Mr Bowen sits on his chair, facing the board.

He spins round **2½ times**. How many degrees does he turn? What is he facing now?`,contentFr:`M. Bowen est assis sur sa chaise, face au tableau.

Il tourne **2 fois et demie**. De combien de degrés tourne-t-il\xA0? Que regarde-t-il maintenant\xA0?`,reveal:{label:`Check your answer`,labelFr:`Vérifie ta réponse`,answer:`**2.5 × 360° = 900°**. He is facing the **back** of the room. The lesson is behind him.`,answerFr:`**2.5 × 360° = 900°**. Il regarde le **fond** de la classe. La leçon est derrière lui.`}},{layout:`callout`,accent:R,icon:`Home`,eyebrow:`Word problem`,eyebrowFr:`Problème`,title:`Mr Bowen’s Garden`,titleFr:`Le jardin de M. Bowen`,content:`Mr Bowen’s garden is a quadrilateral. Three of its corners are **90°**.

His cat sleeps in the fourth corner. What size is the cat’s corner?`,contentFr:`Le jardin de M. Bowen est un quadrilatère. Trois de ses coins font **90°**.

Son chat dort dans le quatrième coin. Quelle est la taille du coin du chat\xA0?`,reveal:{label:`Check your answer`,labelFr:`Vérifie ta réponse`,answer:`**360° − 90° − 90° − 90° = 90°**. The cat does not change the angle.`,answerFr:`**360° − 90° − 90° − 90° = 90°**. Le chat ne change pas l’angle.`}},{layout:`stack`,variant:`checklist`,accent:F,icon:`CheckCircle2`,columns:2,eyebrow:`Before you leave`,eyebrowFr:`Avant de partir`,title:`Can You Do These?`,titleFr:`Sais-tu faire ceci\xA0?`,content:`> Check your notebook: **7 written panels**.`,contentFr:`> Vérifie ton cahier\xA0: **7 encadrés recopiés**.`,items:[{text:`Find a missing angle on a **straight line** (180°).`,textFr:`Trouver un angle sur une **ligne droite** (180°).`},{text:`Find a missing angle **around a point** (360°).`,textFr:`Trouver un angle **autour d’un point** (360°).`},{text:`Find the fourth angle of a **quadrilateral** (360°).`,textFr:`Trouver le quatrième angle d’un **quadrilatère** (360°).`},{text:`Use the **two steps**: add, then subtract.`,textFr:`Utiliser les **deux étapes**\xA0: additionner, puis soustraire.`}]},{layout:`hero`,color:I,icon:`Target`,brand:`Year 7 Mathematics`,brandFr:`Maths 7e année`,eyebrow:`Exit question`,eyebrowFr:`Question de sortie`,title:`The Fourth Angle`,titleFr:`Le quatrième angle`,subtitle:`Three angles of a quadrilateral are **85°**, **100°** and **110°**. Work out the fourth angle.`,subtitleFr:`Trois angles d’un quadrilatère font **85°**, **100°** et **110°**. Calcule le quatrième angle.`,reveal:{label:`Answer`,labelFr:`Réponse`,answer:`**1.** **85° + 100° + 110° = 295°**
**2.** **360° − 295° = 65°**`,answerFr:`**1.** **85° + 100° + 110° = 295°**
**2.** **360° − 295° = 65°**`}}],plan:{duration:`50 minutes — Monday 26 October, 26 slides. If you fall behind: skip slide 22 (the challenge) and one of the two word problems (23–24).`,objective:`Students can read an angle diagram (a number is known, a letter is missing, a small square is 90°); find a missing angle on a straight line (180°), around a point (360°) and in a quadrilateral (360°) with two steps — add the angles you know, subtract the total from 180° or 360°; say what sum and quadrilateral mean; use the equal opposite angles of a parallelogram; and read the Workbook’s instruction words.`,materials:[`Projector / TV for the lesson deck (EN / FR switch)`,`Scrap paper, one sheet per student, for Tear Off the Corners (slide 14) — tearing works, no scissors needed`,`Mini whiteboards and pens (slides 1, 5, 8, 9, 10, 17, 19, 20, 21, 26); maths notebooks`],vocab:[{term:`Sum · la somme`,def:`the total when you add numbers together; sounds exactly like “some”`},{term:`Quadrilateral · le quadrilatère`,def:`a flat shape with four straight sides (quad = 4, lateral = side)`},{term:`Straight line · la ligne droite`,def:`angles on it add up to 180°`},{term:`Around a point · autour d’un point`,def:`angles round it add up to 360°, a full turn`},{term:`Degrees (°) · les degrés`,def:`60° is said “60 degrees” (slide 4)`},{term:`Parallelogram · le parallélogramme`,def:`opposite angles are equal; next-door angles add up to 180°`},{term:`Equilateral · équilatéral`,def:`all three sides equal, so every angle is 60° — spoken, not copied`},{term:`Calculate / work out · calcule`,def:`both mean “find”; “the value of a” means “the number a”`}],timeline:[{time:`0–6 min`,phase:`Starter, goals, reading a diagram`,detail:`Slide 1: four numbers on whiteboards while they settle. Slide 2: check them — 90, 180, 360, 180. Slide 3: read the big line and the three goals; each ? is the missing angle. Slide 4: point at each part — a number we know, a letter we find, a small square is 90°, ° is “degrees”. Say “sixty degrees” together.`},{time:`6–13 min`,phase:`A straight line`,detail:`Slide 5: trace the two angles with your arm — together they make the straight line; copy the fact; whiteboards for a. Slide 6: vote, everyone at once. Slide 7: 178°, not 180°.`},{time:`13–20 min`,phase:`Round a point; the two steps`,detail:`Slide 8: whiteboards, one slice; reveal. Slide 9: copy the fact; whiteboards for b — point out it took two steps. Slide 10: copy TWO STEPS; whiteboards for c. Every answer from here on is shown as 1. add, 2. subtract.`},{time:`20–25 min`,phase:`Key words`,detail:`Slide 11: say “some” and “sum” — the same sound; copy SUM (the line underneath is read, not copied). Slide 12: quad = 4 (a quad bike has 4 wheels); copy QUADRILATERAL. Point at “any 4 sides”: it counts too.`},{time:`25–34 min`,phase:`Angles in a quadrilateral`,detail:`Slide 13: vote. Slide 14: everyone draws a strange quadrilateral, marks a b c d, tears off the corners and puts the points together. Ask what they made before you go on. Slide 15: a full turn, every time — answer B. Slide 16: the diagonal is a second reason; copy the fact. Slide 17: the class says step 1 and step 2 before you reveal.`},{time:`34–42 min`,phase:`The Workbook’s words; practice`,detail:`Slide 18: read each Workbook phrase, the class reads the meaning. Slide 19: whiteboards, all three; decide 180° or 360° first. Slide 20: 360 − 150, then ÷ 3.`},{time:`42–46 min`,phase:`Parallelogram and challenge`,detail:`Slide 21: copy the fact; q = 65° first, then p and r. Slide 22: two right angles and a 60°, then the two steps.`},{time:`46–50 min`,phase:`Word problems and close`,detail:`Slides 23–24, deadpan. Slide 25: thumbs up or down for each item; notebook count. Slide 26: exit question on whiteboards.`}],answers:[{q:`Slides 1–2 — starter`,a:`Right angle 90°, straight line 180°, full turn 360°, triangle 180°.`},{q:`Slide 5 — straight line`,a:`a = 180° − 130° = 50°.`},{q:`Slides 6–7 — is it straight?`,a:`B, no: 57° + 121° = 178°, not 180°.`},{q:`Slide 8 — pizza`,a:`360° ÷ 8 = 45°.`},{q:`Slide 9 — round a point`,a:`100° + 120° = 220°; b = 360° − 220° = 140°.`},{q:`Slide 10 — two steps`,a:`90° + 150° = 240°; c = 360° − 240° = 120°.`},{q:`Slides 13–16 — every quadrilateral?`,a:`B, every one. The torn corners always make a full turn; a diagonal splits any quadrilateral into two triangles, 180° + 180°.`},{q:`Slide 17 — worked example`,a:`70 + 95 + 120 = 285; d = 360 − 285 = 75°.`},{q:`Slide 19 — whiteboards`,a:`1: x = 180 − 145 = 35°. 2: y = 360 − (150 + 85) = 125°. 3: z = 360 − (90 + 90 + 105) = 75°.`},{q:`Slide 20 — three the same`,a:`360 − 150 = 210; 210 ÷ 3 = 70° each.`},{q:`Slide 21 — parallelogram`,a:`q = 65° (opposite); p = r = (360 − 130) ÷ 2 = 115°. Also 180 − 65 = 115.`},{q:`Slide 22 — challenge`,a:`90 + 90 + 60 = 240; y = 360 − 240 = 120°.`},{q:`Slide 23 — the chair`,a:`2.5 × 360 = 900°. Two full turns bring him back to the board; the half turn leaves him facing the back of the room.`},{q:`Slide 24 — the garden`,a:`360 − 270 = 90°. The cat is irrelevant.`},{q:`Slide 26 — exit`,a:`85 + 100 + 110 = 295; 360 − 295 = 65°.`}],notes:`NOTEBOOK COUNT (slide 25): 7 written panels — straight line 180° (5), around a point 360° (9), two steps (10), sum (11), quadrilateral (12), quadrilateral 360° (16), parallelogram (21). The lines under the panels on slides 11 and 22 are read, not copied.

THE SCAFFOLD. Slide 4 teaches how to read the Workbook’s diagrams before any are used: a number is known, a letter is the missing angle, a small square is 90°. Slide 10 gives one method for every question — add the angles you know, subtract the total from 180° or 360° — and every later answer is revealed in those two steps. Slide 19 uses the Workbook’s own wording, straight after slide 18 teaches it.

WORKBOOK 5.1. Every number in the deck is new, so Exercise 5.1 (pp. 66–68) is still unspent: Focus 1–3 match slides 5, 9 and 17–19; Practice 4 is slides 6–7 (is it straight?); Practice 5 is slide 20; Practice 7 is slide 21; Challenge 8–9 are slide 22. Question 11 (the kite) needs a kite’s line of symmetry — one pair of equal angles — which slide 12 only names.

ASK BEFORE YOU TELL. The starter (1), both votes (6, 13), the pizza (8), the torn corners (14, shown on 15) and the worked example (17).

THE WORD PROBLEMS (23–24). Deadpan, never flagged as jokes. The chair: the half turn matters. The garden: the cat is irrelevant.

LANGUAGES: English and French; no Vietnamese. Diagrams are in English, as always.`}};export{B as default};