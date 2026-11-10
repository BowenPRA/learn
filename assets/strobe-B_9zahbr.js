import{r as e}from"./rolldown-runtime-XKyaHtl9.js";import{Bc as t,Bo as n,Fi as r,Lo as i,No as a,Ua as o,Wi as s,Xi as c,Zc as l,ea as u,hi as d,si as f,to as ee}from"./vendor-DwddSC97.js";import{l as p}from"./classroom-D_VntHmj.js";import{t as m}from"./mrBowen-C_L46hSH.js";var h=`/assets/bowling-BlpkjgWB.jpg`,g=`/assets/football-DszhaW9X.jpg`,te=`/assets/aristotle-BQl1z-HY.jpg`,_=`/assets/pisa-Ke9xILWb.jpg`,v=`/assets/galileo-Cj6Oc6sQ.jpg`,ne=`/assets/earth-7rutLccl.jpg`,re=`/assets/carsand-C503qhEz.jpg`,y=`#2b2b2b`,b=`#c25e12`,x=`#5b6770`,S=`#cfd8dc`,C=`#0087a8`,w=`#c8102e`,T=`#1a5fa8`,ie=`#e2f2f6`,E=`#fdf1e3`,D=`Inter, 'Segoe UI', system-ui, sans-serif`,O=(e,t)=>`<rect x="0" y="0" width="${e}" height="${t}" rx="14" fill="#ffffff"/>
    <rect x="0.75" y="0.75" width="${e-1.5}" height="${t-1.5}" rx="13" fill="none" stroke="#e2e8f0" stroke-width="1.5"/>`,k=e=>Number(e.toFixed(1)),A=(e,t,n,r,i,a=6,o=20)=>{let s=Math.atan2(r-t,n-e),c=n-o*Math.cos(s),l=r-o*Math.sin(s),u=o*.55*Math.sin(s),d=-o*.55*Math.cos(s);return`<line x1="${k(e)}" y1="${k(t)}" x2="${k(c)}" y2="${k(l)}" stroke="${i}" stroke-width="${a}" stroke-linecap="round"/>
    <path d="M ${k(n)} ${k(r)} L ${k(c+u)} ${k(l+d)} L ${k(c-u)} ${k(l-d)} Z" fill="${i}"/>`},j=(e,t,n,r)=>`<line x1="${e}" y1="${t}" x2="${n}" y2="${r}" stroke="${b}" stroke-width="2"/><circle cx="${n}" cy="${r}" r="4.5" fill="${b}"/>`,ae=[`M -0.62 -0.52 C -0.35 -0.72 -0.1 -0.62 -0.18 -0.36 C -0.26 -0.12 -0.06 0.06 -0.22 0.32 C -0.34 0.52 -0.3 0.74 -0.46 0.7 C -0.6 0.5 -0.52 0.22 -0.7 0.06 C -0.86 -0.1 -0.8 -0.36 -0.62 -0.52 Z`,`M 0.12 -0.78 C 0.36 -0.86 0.62 -0.66 0.56 -0.44 C 0.76 -0.3 0.72 0 0.56 0.18 C 0.48 0.42 0.34 0.62 0.2 0.5 C 0.14 0.3 0.24 0.12 0.1 -0.04 C -0.02 -0.2 0 -0.56 0.12 -0.78 Z`,`M 0.42 0.56 C 0.56 0.5 0.7 0.58 0.64 0.7 C 0.56 0.8 0.44 0.74 0.42 0.56 Z`,`M -0.3 0.86 C -0.1 0.8 0.1 0.82 0.3 0.9 L 0.3 1.1 L -0.3 1.1 Z`],M=(e,t,n,r)=>`<defs><clipPath id="${e}"><circle cx="${t}" cy="${n}" r="${r}"/></clipPath></defs>
    <circle cx="${t}" cy="${n}" r="${r}" fill="#cfe5f5"/>
    <g clip-path="url(#${e})"><g transform="translate(${t} ${n}) scale(${r})">${ae.map(e=>`<path d="${e}" fill="#bfe0ad" stroke="#4a8b23" stroke-width="2" vector-effect="non-scaling-stroke"/>`).join(``)}</g></g>
    <circle cx="${t}" cy="${n}" r="${r}" fill="none" stroke="#4f8fbf" stroke-width="3"/>`,N=(e,t,n,r=`#f08b82`,i=w)=>`<circle cx="${e}" cy="${t}" r="${n}" fill="${r}" stroke="${i}" stroke-width="3"/>`,oe=(e,t,n=0,r=1)=>`<g transform="translate(${e} ${t}) rotate(${n}) scale(${r})" fill="none" stroke="${y}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round">
      <path d="M -10 0 L 0 -24 L 10 0 M 0 -24 L 0 -50 M -13 -42 L 13 -42"/><circle cx="0" cy="-60" r="9" fill="#ffffff"/>
    </g>`,P=(e,t)=>`<g transform="translate(${e} ${t})" stroke="${y}" stroke-width="3" stroke-linejoin="round">
      <path d="M -40 -16 L -54 -32 L -26 -16 Z M -40 16 L -54 32 L -26 16 Z" fill="${b}"/>
      <rect x="-42" y="-16" width="66" height="32" rx="10" fill="#ffffff"/>
      <path d="M 24 -16 Q 54 0 24 16 Z" fill="${b}"/>
      <circle cx="4" cy="0" r="7" fill="#cfe5f5"/>
    </g>`,F=(e,t,n)=>`<g stroke="${y}" stroke-width="2.5" stroke-linejoin="round">
      <rect x="${e-11}" y="${t}" width="22" height="18" rx="4" fill="#f4a6b5"/>
      <rect x="${e-11}" y="${t+18}" width="22" height="${n-48}" fill="#f6d55c"/>
      <path d="M ${e-11} ${t+n-30} L ${e+11} ${t+n-30} L ${e} ${t+n} Z" fill="#f1d3a8"/>
      <path d="M ${e-4} ${t+n-12} L ${e+4} ${t+n-12} L ${e} ${t+n} Z" fill="${y}"/>
    </g>`,I=`<path d="M18 11V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2"/><path d="M14 10V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v2"/><path d="M10 10.5V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2v8"/><path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"/>`,L=e=>`<g transform="translate(192 76) scale(-7 7)" fill="none" stroke="${e}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">${I}</g>`,R=e=>`<g transform="translate(528 76) scale(7)" fill="none" stroke="${e}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">${I}</g>`,se=(e,t,n,r)=>Array.from({length:8},(i,a)=>{let o=(22.5+45*a)*Math.PI/180;return A(e+n*Math.cos(o),t+n*Math.sin(o),e+r*Math.cos(o),t+r*Math.sin(o),w,6,20)}).join(`
    `),ce=(e,t,n,r)=>{let i=``;for(let a=0;a<n;a++)for(let o=0;o<n;o++)i+=N(e+r+o*2*r,t+r+a*2*r,r-1,`#cfd4d9`,`#6b7580`);return i},le=(e,t,n)=>{let r=``;for(let i=0;i<n;i++)for(let n of[18,62,106])r+=`<rect x="${e+n}" y="${t+12+i*32}" width="26" height="16" fill="#cfe5f5" stroke="#8a979e" stroke-width="1.5"/>`;return r},ue=(e,t)=>{let n=``;for(let r=0;r<=30;r++){let i=t-r*12;n+=`<line x1="${e}" y1="${i}" x2="${e+(r%5==0?22:11)}" y2="${i}" stroke="${y}" stroke-width="${r%5==0?2.5:1.5}"/>`}return n},de={Mercury:`#b5b5b5`,Venus:`#e8c27a`,Earth:`#4f8fbf`,Moon:`#d9d9d9`,Mars:`#d0643b`,Jupiter:`#d9a066`,Saturn:`#e6cf8b`,Uranus:`#8fd3e0`,Neptune:`#4a6fd1`},z=(e,t,n,r=!1)=>`<rect x="${t}" y="${n}" width="384" height="80" rx="12" fill="${r?ie:`#f7f9fa`}" stroke="${r?C:S}" stroke-width="${r?3:1.5}"/>
    ${e===`Saturn`?`<ellipse cx="${t+48}" cy="${n+40}" rx="36" ry="9" fill="none" stroke="#b39b55" stroke-width="3"/>`:``}
    <circle cx="${t+48}" cy="${n+40}" r="24" fill="${de[e]}" stroke="${y}" stroke-width="2"/>`,B=(e,t,n,r,i,a,o=`xMidYMid slice`)=>`<defs><clipPath id="${e}"><rect x="${n}" y="${r}" width="${i}" height="${a}" rx="14"/></clipPath></defs>
    <image href="${t}" x="${n}" y="${r}" width="${i}" height="${a}" preserveAspectRatio="${o}" clip-path="url(#${e})"/>`,fe={ANS_HEAVY:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 320" class="w-full h-full">
    ${O(720,320)}
    ${L(T)}
    ${B(`u31-ans-b`,h,392,22,120,120)}
    <text x="452" y="176" font-family="${D}" font-size="24" font-weight="bold" fill="${x}" text-anchor="middle">7 kg</text>
    <text x="452" y="236" font-family="${D}" font-size="46" font-weight="bold" fill="${T}" text-anchor="middle">the bowling</text>
    <text x="452" y="290" font-family="${D}" font-size="46" font-weight="bold" fill="${T}" text-anchor="middle">ball</text>
  </svg>`,ANS_SAME:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 320" class="w-full h-full">
    ${O(720,320)}
    ${R(b)}
    ${B(`u31-ans-sb`,h,70,22,120,120)}
    ${B(`u31-ans-sf`,g,330,22,120,120)}
    <text x="130" y="176" font-family="${D}" font-size="24" font-weight="bold" fill="${x}" text-anchor="middle">7 kg</text>
    <text x="390" y="176" font-family="${D}" font-size="24" font-weight="bold" fill="${x}" text-anchor="middle">0.4 kg</text>
    <text x="260" y="98" font-family="${D}" font-size="40" font-weight="bold" fill="${x}" text-anchor="middle">+</text>
    <text x="260" y="236" font-family="${D}" font-size="46" font-weight="bold" fill="${b}" text-anchor="middle">both at the</text>
    <text x="260" y="290" font-family="${D}" font-size="46" font-weight="bold" fill="${b}" text-anchor="middle">same time</text>
  </svg>`,ANS_W10:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 320" class="w-full h-full">
    ${O(720,320)}
    ${L(T)}
    <text x="452" y="150" font-family="${D}" font-size="50" font-weight="bold" fill="${T}" text-anchor="middle">The weight of</text>
    <text x="452" y="222" font-family="${D}" font-size="50" font-weight="bold" fill="${T}" text-anchor="middle">my bag is 10 kg.</text>
  </svg>`,ANS_M10:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 320" class="w-full h-full">
    ${O(720,320)}
    ${R(b)}
    <text x="268" y="150" font-family="${D}" font-size="50" font-weight="bold" fill="${b}" text-anchor="middle">The mass of</text>
    <text x="268" y="222" font-family="${D}" font-size="50" font-weight="bold" fill="${b}" text-anchor="middle">my bag is 10 kg.</text>
  </svg>`,DROP_WORDS:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1120 440" class="w-full h-full">
    ${O(1120,440)}

    <!-- drop -->
    <rect x="20" y="16" width="248" height="408" rx="14" fill="#ffffff" stroke="${S}" stroke-width="2"/>
    <text x="144" y="66" font-family="${D}" font-size="40" font-weight="bold" fill="${b}" text-anchor="middle">drop</text>
    <g transform="translate(96 84) scale(4)" fill="none" stroke="${y}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${I}</g>
    ${N(144,214,22,`#3b3f46`,y)}
    <line x1="144" y1="248" x2="144" y2="282" stroke="${x}" stroke-width="3" stroke-dasharray="6 6"/>
    <text x="144" y="356" font-family="${D}" font-size="24" fill="${y}" text-anchor="middle">Mr Bowen</text>
    <text x="144" y="388" font-family="${D}" font-size="24" fill="${y}" text-anchor="middle">drops the ball.</text>

    <!-- fall -->
    <rect x="284" y="16" width="248" height="408" rx="14" fill="#ffffff" stroke="${S}" stroke-width="2"/>
    <text x="408" y="66" font-family="${D}" font-size="40" font-weight="bold" fill="${b}" text-anchor="middle">fall</text>
    <path d="M 394 120 L 394 158 M 408 108 L 408 158 M 422 120 L 422 158" stroke="${x}" stroke-width="3" stroke-linecap="round"/>
    ${N(408,192,22,`#3b3f46`,y)}
    ${A(408,226,408,292,x,4,16)}
    <text x="408" y="356" font-family="${D}" font-size="24" fill="${y}" text-anchor="middle">The ball</text>
    <text x="408" y="388" font-family="${D}" font-size="24" fill="${y}" text-anchor="middle">falls.</text>

    <!-- land -->
    <rect x="548" y="16" width="248" height="408" rx="14" fill="#ffffff" stroke="${S}" stroke-width="2"/>
    <text x="672" y="66" font-family="${D}" font-size="40" font-weight="bold" fill="${b}" text-anchor="middle">land</text>
    <line x1="572" y1="300" x2="772" y2="300" stroke="${y}" stroke-width="4" stroke-linecap="round"/>
    ${N(672,276,22,`#3b3f46`,y)}
    <path d="M 636 292 l -18 -10 M 634 278 l -20 -2 M 708 292 l 18 -10 M 710 278 l 20 -2" stroke="${b}" stroke-width="3" stroke-linecap="round"/>
    <text x="672" y="356" font-family="${D}" font-size="24" fill="${y}" text-anchor="middle">It lands. It hits</text>
    <text x="672" y="388" font-family="${D}" font-size="24" fill="${y}" text-anchor="middle">the ground.</text>

    <!-- at the same time -->
    <rect x="812" y="16" width="288" height="408" rx="14" fill="#ffffff" stroke="${S}" stroke-width="2"/>
    <text x="956" y="64" font-family="${D}" font-size="28" font-weight="bold" fill="${b}" text-anchor="middle">at the same time</text>
    <line x1="836" y1="300" x2="1076" y2="300" stroke="${y}" stroke-width="4" stroke-linecap="round"/>
    ${N(912,268,30,`#3b3f46`,y)}
    ${N(1004,282,16,`#f2f2f2`,y)}
    <path d="M 870 292 l -16 -10 M 948 292 l 14 -10 M 980 294 l -14 -8 M 1028 294 l 14 -8" stroke="${b}" stroke-width="3" stroke-linecap="round"/>
    <text x="956" y="356" font-family="${D}" font-size="24" fill="${y}" text-anchor="middle">They land at</text>
    <text x="956" y="388" font-family="${D}" font-size="24" fill="${y}" text-anchor="middle">the same time.</text>
  </svg>`,FALL_STORY:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1120 440" class="w-full h-full">
    ${O(1120,440)}

    <rect x="20" y="16" width="350" height="408" rx="14" fill="#ffffff" stroke="${S}" stroke-width="2"/>
    ${B(`u31-story-a`,te,30,26,330,270,`xMidYMin slice`)}
    <text x="195" y="330" font-family="${D}" font-size="24" font-weight="bold" fill="${y}" text-anchor="middle">Aristotle, about 350 BC</text>
    <text x="195" y="366" font-family="${D}" font-size="24" font-weight="bold" fill="${b}" text-anchor="middle">Heavy things</text>
    <text x="195" y="398" font-family="${D}" font-size="24" font-weight="bold" fill="${b}" text-anchor="middle">fall faster.</text>

    <rect x="385" y="16" width="350" height="408" rx="14" fill="#ffffff" stroke="${S}" stroke-width="2"/>
    ${B(`u31-story-p`,_,395,26,330,270,`xMidYMid meet`)}
    <text x="560" y="330" font-family="${D}" font-size="24" font-weight="bold" fill="${y}" text-anchor="middle">The Leaning Tower</text>
    <text x="560" y="362" font-family="${D}" font-size="24" font-weight="bold" fill="${y}" text-anchor="middle">of Pisa, Italy</text>
    <text x="560" y="396" font-family="${D}" font-size="22" fill="${x}" text-anchor="middle">56 m tall</text>

    <rect x="750" y="16" width="350" height="408" rx="14" fill="#ffffff" stroke="${S}" stroke-width="2"/>
    ${B(`u31-story-g`,v,760,26,330,270,`xMidYMin slice`)}
    <text x="925" y="330" font-family="${D}" font-size="24" font-weight="bold" fill="${y}" text-anchor="middle">Galileo, about 1590</text>
    <text x="925" y="366" font-family="${D}" font-size="24" font-weight="bold" fill="${b}" text-anchor="middle">No! They fall</text>
    <text x="925" y="398" font-family="${D}" font-size="24" font-weight="bold" fill="${b}" text-anchor="middle">together.</text>
  </svg>`,EARTH_PULL:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${O(840,560)}

    <rect x="16" y="16" width="480" height="528" rx="14" fill="#fbfcfd" stroke="${S}" stroke-width="2"/>
    <text x="256" y="62" font-family="${D}" font-size="30" font-weight="bold" fill="${b}" text-anchor="middle">Big mass:</text>
    <text x="256" y="98" font-family="${D}" font-size="30" font-weight="bold" fill="${b}" text-anchor="middle">a strong pull</text>
    <defs><clipPath id="u31-pull-clip"><circle cx="200" cy="320" r="125"/></clipPath></defs>
    <image href="${ne}" x="57" y="177" width="286" height="286" preserveAspectRatio="xMidYMid slice" clip-path="url(#u31-pull-clip)"/>
    <circle cx="420" cy="160" r="24" fill="#e04b3a" stroke="#8e2a1f" stroke-width="3"/>
    <path d="M 420 136 L 426 122" stroke="#6d4c2e" stroke-width="4" stroke-linecap="round"/>
    ${A(394,179,308,241.5,w,7,22)}
    <text x="424" y="104" font-family="${D}" font-size="22" fill="${x}" text-anchor="middle">an apple</text>
    <text x="256" y="482" font-family="${D}" font-size="22" font-weight="bold" fill="${y}" text-anchor="middle">The mass of the Earth:</text>
    <text x="256" y="514" font-family="${D}" font-size="20" fill="${y}" text-anchor="middle">6 000 000 000 000 000 000 000 000 kg</text>

    <rect x="516" y="16" width="308" height="528" rx="14" fill="#fbfcfd" stroke="${S}" stroke-width="2"/>
    <text x="670" y="62" font-family="${D}" font-size="30" font-weight="bold" fill="${b}" text-anchor="middle">Small mass:</text>
    <text x="670" y="98" font-family="${D}" font-size="30" font-weight="bold" fill="${b}" text-anchor="middle">a weak pull</text>
    ${F(618,170,230)}
    ${F(722,170,230)}
    ${A(634,285,654,285,w,3,10)}
    ${A(706,285,686,285,w,3,10)}
    <text x="670" y="466" font-family="${D}" font-size="22" fill="${x}" text-anchor="middle">two pencils pull too,</text>
    <text x="670" y="496" font-family="${D}" font-size="22" fill="${x}" text-anchor="middle">far too weakly to feel</text>
  </svg>`,EARTH_ABCD:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1120 440" class="w-full h-full">
    ${O(1120,440)}
    ${M(`u31-abcd`,560,220,160)}
    ${N(560,34,15)}
    ${N(762,220,15)}
    ${N(560,406,15)}
    ${N(358,220,15)}
    <text x="592" y="47" font-family="${D}" font-size="38" font-weight="bold" fill="${y}">A</text>
    <text x="792" y="233" font-family="${D}" font-size="38" font-weight="bold" fill="${y}">B</text>
    <text x="592" y="420" font-family="${D}" font-size="38" font-weight="bold" fill="${y}">C</text>
    <text x="328" y="233" font-family="${D}" font-size="38" font-weight="bold" fill="${y}" text-anchor="end">D</text>
  </svg>`,EARTH_ARROWS:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${O(840,560)}
    ${M(`u31-arrows`,270,290,170)}
    ${se(270,290,250,182)}
    <circle cx="270" cy="290" r="7" fill="${y}"/>
    ${oe(270,120,0)}
    ${oe(270,460,180)}

    <text x="548" y="96" font-family="${D}" font-size="24" font-weight="bold" fill="${b}">The force of gravity</text>
    <text x="548" y="127" font-family="${D}" font-size="24" font-weight="bold" fill="${b}">acts towards the</text>
    <text x="548" y="158" font-family="${D}" font-size="24" font-weight="bold" fill="${b}">centre of the Earth.</text>
    ${j(540,148,476,205)}

    <text x="548" y="300" font-family="${D}" font-size="24" fill="${x}">the centre</text>
    ${j(540,292,280,290)}

    <text x="548" y="438" font-family="${D}" font-size="24" fill="${x}">South Pole: "down"</text>
    <text x="548" y="468" font-family="${D}" font-size="24" fill="${x}">still means towards</text>
    <text x="548" y="498" font-family="${D}" font-size="24" fill="${x}">the centre.</text>
    ${j(540,462,284,500)}
  </svg>`,FURTHER_WEAKER:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${O(840,560)}
    ${M(`u31-far`,60,300,190)}
    <text x="80" y="532" font-family="${D}" font-size="24" font-weight="bold" fill="${y}" text-anchor="middle">The Earth</text>

    ${A(352,66,300,66,w,6,18)}
    <text x="366" y="74" font-family="${D}" font-size="22" fill="${x}">= the pull of the Earth's gravity</text>

    ${P(372,290)}
    ${P(562,290)}
    ${P(752,290)}
    ${A(372,346,254,346,w,7,22)}
    ${A(562,346,516,346,w,7,22)}
    ${A(752,346,728,346,w,7,20)}

    <text x="372" y="410" font-family="${D}" font-size="24" font-weight="bold" fill="${y}" text-anchor="middle">near:</text>
    <text x="372" y="440" font-family="${D}" font-size="22" fill="${x}" text-anchor="middle">a strong pull</text>
    <text x="562" y="410" font-family="${D}" font-size="24" font-weight="bold" fill="${y}" text-anchor="middle">further:</text>
    <text x="562" y="440" font-family="${D}" font-size="22" fill="${x}" text-anchor="middle">a weaker pull</text>
    <text x="752" y="410" font-family="${D}" font-size="24" font-weight="bold" fill="${y}" text-anchor="middle">far away:</text>
    <text x="752" y="440" font-family="${D}" font-size="22" fill="${x}" text-anchor="middle">very weak</text>
  </svg>`,NEWTON_LADDER:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1120 440" class="w-full h-full">
    ${O(1120,440)}

    <rect x="28" y="20" width="200" height="400" rx="14" fill="#ffffff" stroke="${S}" stroke-width="2"/>
    <circle cx="128" cy="168" r="58" fill="#e04b3a" stroke="#8e2a1f" stroke-width="3"/>
    <path d="M 128 112 L 134 92" stroke="#6d4c2e" stroke-width="5" stroke-linecap="round"/>
    <ellipse cx="154" cy="100" rx="18" ry="9" transform="rotate(-30 154 100)" fill="#6abf4b" stroke="#3e7c27" stroke-width="2"/>
    <text x="128" y="300" font-family="${D}" font-size="26" font-weight="bold" fill="${y}" text-anchor="middle">an apple</text>
    <text x="128" y="360" font-family="${D}" font-size="34" font-weight="bold" fill="${b}" text-anchor="middle">about 1 N</text>

    <rect x="244" y="20" width="200" height="400" rx="14" fill="#ffffff" stroke="${S}" stroke-width="2"/>
    <rect x="284" y="84" width="120" height="156" rx="6" fill="${C}" stroke="${y}" stroke-width="3"/>
    <rect x="284" y="84" width="18" height="156" fill="#006b85" stroke="${y}" stroke-width="3"/>
    <rect x="318" y="120" width="70" height="28" rx="4" fill="#ffffff"/>
    <text x="344" y="300" font-family="${D}" font-size="26" font-weight="bold" fill="${y}" text-anchor="middle">a book</text>
    <text x="344" y="360" font-family="${D}" font-size="34" font-weight="bold" fill="${b}" text-anchor="middle">about 5 N</text>

    <rect x="460" y="20" width="200" height="400" rx="14" fill="#ffffff" stroke="${S}" stroke-width="2"/>
    <path d="M 505 238 Q 495 150 520 118 L 530 100 L 590 100 L 600 118 Q 625 150 615 238 Z" fill="#f3ead7" stroke="${y}" stroke-width="3" stroke-linejoin="round"/>
    <path d="M 526 110 L 594 110" stroke="${b}" stroke-width="5" stroke-linecap="round"/>
    <text x="560" y="190" font-family="${D}" font-size="30" font-weight="bold" fill="${y}" text-anchor="middle">1 kg</text>
    <text x="560" y="300" font-family="${D}" font-size="24" font-weight="bold" fill="${y}" text-anchor="middle">a bag of rice</text>
    <text x="560" y="360" font-family="${D}" font-size="34" font-weight="bold" fill="${b}" text-anchor="middle">10 N</text>

    <rect x="676" y="20" width="200" height="400" rx="14" fill="#ffffff" stroke="${S}" stroke-width="2"/>
    ${m({x:776,y:83,scale:.57})}
    <text x="776" y="300" font-family="${D}" font-size="26" font-weight="bold" fill="${y}" text-anchor="middle">Mr Bowen</text>
    <text x="776" y="360" font-family="${D}" font-size="34" font-weight="bold" fill="${b}" text-anchor="middle">800 N</text>

    <rect x="892" y="20" width="200" height="400" rx="14" fill="#ffffff" stroke="${S}" stroke-width="2"/>
    <path d="M 907 206 L 907 176 Q 912 164 932 162 L 957 134 Q 962 128 972 128 L 1022 128 Q 1032 128 1040 138 L 1054 162 Q 1077 164 1080 178 L 1080 206 Z" fill="${w}" stroke="${y}" stroke-width="3" stroke-linejoin="round"/>
    <path d="M 962 160 L 974 140 L 996 140 L 996 160 Z M 1004 160 L 1004 140 L 1026 140 L 1038 160 Z" fill="#cfe5f5" stroke="${y}" stroke-width="2"/>
    <circle cx="942" cy="210" r="18" fill="${y}"/><circle cx="942" cy="210" r="7" fill="#cfd8dc"/>
    <circle cx="1044" cy="210" r="18" fill="${y}"/><circle cx="1044" cy="210" r="7" fill="#cfd8dc"/>
    <text x="992" y="300" font-family="${D}" font-size="26" font-weight="bold" fill="${y}" text-anchor="middle">a car</text>
    <text x="992" y="360" font-family="${D}" font-size="34" font-weight="bold" fill="${b}" text-anchor="middle">15 000 N</text>
  </svg>`,CONTACT_BOX:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${O(840,560)}
    <rect x="120" y="406" width="18" height="128" fill="#d9bf95" stroke="${y}" stroke-width="2"/>
    <rect x="702" y="406" width="18" height="128" fill="#d9bf95" stroke="${y}" stroke-width="2"/>
    <rect x="90" y="380" width="660" height="26" rx="4" fill="#ecd9b8" stroke="${y}" stroke-width="3"/>
    <rect x="330" y="200" width="180" height="180" rx="4" fill="${E}" stroke="${y}" stroke-width="3"/>

    ${A(390,290,390,524,w,7,24)}
    ${A(450,380,450,146,T,7,24)}

    <text x="360" y="474" font-family="${D}" font-size="26" font-weight="bold" fill="${w}" text-anchor="end">weight</text>
    <text x="360" y="506" font-family="${D}" font-size="26" font-weight="bold" fill="${w}" text-anchor="end">W = 5 N</text>
    <text x="470" y="118" font-family="${D}" font-size="26" font-weight="bold" fill="${T}">contact force</text>
    <text x="470" y="150" font-family="${D}" font-size="26" font-weight="bold" fill="${T}">C = 5 N</text>

    <text x="226" y="248" font-family="${D}" font-size="26" fill="${b}" text-anchor="end">box</text>
    ${j(236,240,330,240)}
    <text x="250" y="352" font-family="${D}" font-size="26" fill="${b}" text-anchor="end">desk</text>
    ${j(260,344,300,382)}
  </svg>`,SAND_CAR:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${O(840,560)}
    ${B(`u31-car`,re,0,0,840,560)}
    ${A(300,286,300,540,w,9,30)}
    ${A(392,546,392,478,T,9,26)}

    <rect x="24" y="24" width="392" height="58" rx="14" fill="#ffffff" fill-opacity="0.94"/>
    <text x="220" y="63" font-family="${D}" font-size="28" font-weight="bold" fill="${y}" text-anchor="middle">weight > contact force</text>
    <rect x="136" y="486" width="146" height="46" rx="12" fill="#ffffff" fill-opacity="0.94"/>
    <text x="209" y="518" font-family="${D}" font-size="26" font-weight="bold" fill="${w}" text-anchor="middle">weight</text>
    <rect x="414" y="474" width="222" height="46" rx="12" fill="#ffffff" fill-opacity="0.94"/>
    <text x="525" y="506" font-family="${D}" font-size="26" font-weight="bold" fill="${T}" text-anchor="middle">contact force</text>
  </svg>`,MASS_STUFF:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${O(840,560)}
    <text x="230" y="76" font-family="${D}" font-size="30" font-weight="bold" fill="${y}" text-anchor="middle">less matter</text>
    <text x="610" y="76" font-family="${D}" font-size="30" font-weight="bold" fill="${y}" text-anchor="middle">more matter</text>

    <rect x="90" y="116" width="280" height="280" rx="12" fill="#f7f9fa" stroke="${y}" stroke-width="3"/>
    ${N(150,170,15,`#cfd4d9`,`#6b7580`)}${N(250,150,15,`#cfd4d9`,`#6b7580`)}
    ${N(320,220,15,`#cfd4d9`,`#6b7580`)}${N(190,250,15,`#cfd4d9`,`#6b7580`)}
    ${N(130,330,15,`#cfd4d9`,`#6b7580`)}${N(280,310,15,`#cfd4d9`,`#6b7580`)}
    ${N(220,360,15,`#cfd4d9`,`#6b7580`)}${N(330,360,15,`#cfd4d9`,`#6b7580`)}

    <rect x="470" y="116" width="280" height="280" rx="12" fill="#f7f9fa" stroke="${y}" stroke-width="3"/>
    ${ce(498,144,7,16)}

    <text x="230" y="452" font-family="${D}" font-size="34" font-weight="bold" fill="${b}" text-anchor="middle">less mass</text>
    <text x="610" y="452" font-family="${D}" font-size="34" font-weight="bold" fill="${b}" text-anchor="middle">more mass</text>
    <text x="420" y="520" font-family="${D}" font-size="26" font-weight="bold" fill="${x}" text-anchor="middle">Same size. Different mass.</text>
  </svg>`,TRIANGLE:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${O(840,560)}
    <path d="M 330 40 L 600 520 L 60 520 Z" fill="${E}" stroke="${b}" stroke-width="5" stroke-linejoin="round"/>
    <line x1="184" y1="300" x2="476" y2="300" stroke="${b}" stroke-width="5"/>
    <text x="330" y="262" font-family="${D}" font-size="110" font-weight="bold" fill="${y}" text-anchor="middle">W</text>
    <text x="330" y="450" font-family="${D}" font-size="76" font-weight="bold" fill="${y}" text-anchor="middle">m × 10</text>

    <text x="612" y="190" font-family="${D}" font-size="28" font-weight="bold" fill="${b}">W = weight</text>
    <text x="612" y="224" font-family="${D}" font-size="24" fill="${x}">in newtons (N)</text>
    <text x="612" y="410" font-family="${D}" font-size="28" font-weight="bold" fill="${b}">m = mass</text>
    <text x="612" y="444" font-family="${D}" font-size="24" fill="${x}">in kilograms (kg)</text>
  </svg>`,TRIANGLE_USE:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1120 440" class="w-full h-full">
    ${O(1120,440)}

    <rect x="20" y="16" width="530" height="408" rx="14" fill="#ffffff" stroke="${S}" stroke-width="2"/>
    <text x="285" y="58" font-family="${D}" font-size="28" font-weight="bold" fill="${y}" text-anchor="middle">To find W, cover W</text>
    <path d="M 150 90 L 260 390 L 40 390 Z" fill="${E}" stroke="${b}" stroke-width="4" stroke-linejoin="round"/>
    <path d="M 150 90 L 208.7 250 L 91.3 250 Z" fill="#8a979e" stroke="${b}" stroke-width="4" stroke-linejoin="round"/>
    <text x="150" y="232" font-family="${D}" font-size="54" font-weight="bold" fill="#c9d1d8" text-anchor="middle">W</text>
    <text x="150" y="350" font-family="${D}" font-size="44" font-weight="bold" fill="${y}" text-anchor="middle">m × 10</text>
    <text x="300" y="130" font-family="${D}" font-size="26" font-weight="bold" fill="${y}">Mr Bowen</text>
    <text x="300" y="168" font-family="${D}" font-size="24" fill="${x}">m = 80 kg</text>
    <text x="300" y="228" font-family="${D}" font-size="30" font-weight="bold" fill="${y}">W = m × 10</text>
    <text x="300" y="278" font-family="${D}" font-size="30" font-weight="bold" fill="${y}">W = 80 × 10</text>
    <text x="300" y="340" font-family="${D}" font-size="36" font-weight="bold" fill="${b}">W = 800 N</text>

    <rect x="570" y="16" width="530" height="408" rx="14" fill="#ffffff" stroke="${S}" stroke-width="2"/>
    <text x="835" y="58" font-family="${D}" font-size="28" font-weight="bold" fill="${y}" text-anchor="middle">To find m, cover m</text>
    <path d="M 700 90 L 810 390 L 590 390 Z" fill="${E}" stroke="${b}" stroke-width="4" stroke-linejoin="round"/>
    <line x1="641.3" y1="250" x2="758.7" y2="250" stroke="${b}" stroke-width="4"/>
    <text x="700" y="232" font-family="${D}" font-size="54" font-weight="bold" fill="${y}" text-anchor="middle">W</text>
    <rect x="618" y="308" width="62" height="56" rx="8" fill="#8a979e"/>
    <text x="649" y="350" font-family="${D}" font-size="44" font-weight="bold" fill="#c9d1d8" text-anchor="middle">m</text>
    <text x="736" y="350" font-family="${D}" font-size="44" font-weight="bold" fill="${y}" text-anchor="middle">× 10</text>
    <text x="850" y="130" font-family="${D}" font-size="26" font-weight="bold" fill="${y}">Games console</text>
    <text x="850" y="168" font-family="${D}" font-size="24" fill="${x}">W = 28 N</text>
    <text x="850" y="228" font-family="${D}" font-size="30" font-weight="bold" fill="${y}">m = W ÷ 10</text>
    <text x="850" y="278" font-family="${D}" font-size="30" font-weight="bold" fill="${y}">m = 28 ÷ 10</text>
    <text x="850" y="340" font-family="${D}" font-size="36" font-weight="bold" fill="${b}">m = 2.8 kg</text>
  </svg>`,PLANET_TABLE:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${O(840,560)}
    <text x="420" y="52" font-family="${D}" font-size="30" font-weight="bold" fill="${y}" text-anchor="middle">Strength of gravity (N/kg)</text>

    ${z(`Mercury`,24,84)}
    <text x="114" y="135" font-family="${D}" font-size="30" font-weight="bold" fill="${y}">Mercury</text>
    <text x="388" y="137" font-family="${D}" font-size="36" font-weight="bold" fill="${b}" text-anchor="end">3.7</text>
    ${z(`Venus`,24,176)}
    <text x="114" y="227" font-family="${D}" font-size="30" font-weight="bold" fill="${y}">Venus</text>
    <text x="388" y="229" font-family="${D}" font-size="36" font-weight="bold" fill="${b}" text-anchor="end">8.9</text>
    ${z(`Earth`,24,268,!0)}
    <text x="114" y="319" font-family="${D}" font-size="30" font-weight="bold" fill="${y}">Earth</text>
    <text x="388" y="321" font-family="${D}" font-size="36" font-weight="bold" fill="${b}" text-anchor="end">10</text>
    ${z(`Moon`,24,360)}
    <text x="114" y="411" font-family="${D}" font-size="30" font-weight="bold" fill="${y}">Moon</text>
    <text x="388" y="413" font-family="${D}" font-size="36" font-weight="bold" fill="${b}" text-anchor="end">1.6</text>
    ${z(`Mars`,24,452)}
    <text x="114" y="503" font-family="${D}" font-size="30" font-weight="bold" fill="${y}">Mars</text>
    <text x="388" y="505" font-family="${D}" font-size="36" font-weight="bold" fill="${b}" text-anchor="end">3.7</text>

    ${z(`Jupiter`,432,84)}
    <text x="522" y="135" font-family="${D}" font-size="30" font-weight="bold" fill="${y}">Jupiter</text>
    <text x="796" y="137" font-family="${D}" font-size="36" font-weight="bold" fill="${b}" text-anchor="end">25</text>
    ${z(`Saturn`,432,176)}
    <text x="522" y="227" font-family="${D}" font-size="30" font-weight="bold" fill="${y}">Saturn</text>
    <text x="796" y="229" font-family="${D}" font-size="36" font-weight="bold" fill="${b}" text-anchor="end">10</text>
    ${z(`Uranus`,432,268)}
    <text x="522" y="319" font-family="${D}" font-size="30" font-weight="bold" fill="${y}">Uranus</text>
    <text x="796" y="321" font-family="${D}" font-size="36" font-weight="bold" fill="${b}" text-anchor="end">8.7</text>
    ${z(`Neptune`,432,360)}
    <text x="522" y="411" font-family="${D}" font-size="30" font-weight="bold" fill="${y}">Neptune</text>
    <text x="796" y="413" font-family="${D}" font-size="36" font-weight="bold" fill="${b}" text-anchor="end">11</text>
  </svg>`,SPEED_FALL:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${O(840,560)}
    <rect x="40" y="40" width="150" height="480" fill="#eef1f4" stroke="${y}" stroke-width="3"/>
    ${le(40,40,15)}
    <line x1="20" y1="520" x2="820" y2="520" stroke="${y}" stroke-width="4" stroke-linecap="round"/>
    <text x="115" y="550" font-family="${D}" font-size="20" fill="${x}" text-anchor="middle">15 floors: 45 m</text>

    <g opacity="0.45">${N(250,54,14,`#3b3f46`,y)}${N(250,104,14,`#3b3f46`,y)}${N(250,255,14,`#3b3f46`,y)}</g>
    ${N(250,504,14,`#3b3f46`,y)}

    <text x="284" y="63" font-family="${D}" font-size="28" font-weight="bold" fill="${y}">0 s: 0 km/h</text>
    <text x="284" y="113" font-family="${D}" font-size="28" font-weight="bold" fill="${b}">1 s: 36 km/h</text>
    <text x="284" y="264" font-family="${D}" font-size="28" font-weight="bold" fill="${b}">2 s: 72 km/h</text>
    <text x="284" y="500" font-family="${D}" font-size="28" font-weight="bold" fill="${b}">3 s: 108 km/h</text>

    <path d="M 572 54 L 586 54 M 579 54 L 579 104 M 572 104 L 586 104" stroke="${x}" stroke-width="3" fill="none"/>
    <path d="M 572 110 L 586 110 M 579 110 L 579 255 M 572 255 L 586 255" stroke="${x}" stroke-width="3" fill="none"/>
    <path d="M 572 261 L 586 261 M 579 261 L 579 504 M 572 504 L 586 504" stroke="${x}" stroke-width="3" fill="none"/>
    <text x="600" y="88" font-family="${D}" font-size="24" fill="${x}">falls 5 m</text>
    <text x="600" y="190" font-family="${D}" font-size="24" fill="${x}">falls 15 m</text>
    <text x="600" y="390" font-family="${D}" font-size="24" fill="${x}">falls 25 m</text>
  </svg>`,PULL_VS_MASS:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${O(840,560)}
    ${N(210,150,38)}
    <text x="210" y="160" font-family="${D}" font-size="26" font-weight="bold" fill="${y}" text-anchor="middle">1 kg</text>
    ${A(210,196,210,250,w,7,20)}
    <text x="210" y="292" font-family="${D}" font-size="28" font-weight="bold" fill="${w}" text-anchor="middle">pull: 10 N</text>
    <text x="210" y="356" font-family="${D}" font-size="24" fill="${x}" text-anchor="middle">easy to</text>
    <text x="210" y="386" font-family="${D}" font-size="24" fill="${x}" text-anchor="middle">speed up</text>

    ${N(560,150,70,`#9aa5ae`,y)}
    <text x="560" y="162" font-family="${D}" font-size="32" font-weight="bold" fill="#ffffff" text-anchor="middle">5 kg</text>
    ${A(560,228,560,470,w,7,20)}
    <text x="584" y="330" font-family="${D}" font-size="28" font-weight="bold" fill="${w}">pull: 50 N</text>
    <text x="584" y="390" font-family="${D}" font-size="24" fill="${x}">5 times harder</text>
    <text x="584" y="420" font-family="${D}" font-size="24" fill="${x}">to speed up</text>

    <rect x="40" y="490" width="760" height="54" rx="12" fill="${E}" stroke="${b}" stroke-width="2.5"/>
    <text x="420" y="526" font-family="${D}" font-size="26" font-weight="bold" fill="${y}" text-anchor="middle">Both speed up at the same rate.</text>
  </svg>`,RULER_CATCH:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${O(840,560)}
    <rect x="96" y="52" width="64" height="440" rx="6" fill="#fff3c4" stroke="${y}" stroke-width="3"/>
    ${ue(96,470)}
    <text x="150" y="477" font-family="${D}" font-size="18" font-weight="bold" fill="${y}" text-anchor="end">0</text>
    <text x="150" y="417" font-family="${D}" font-size="18" font-weight="bold" fill="${y}" text-anchor="end">5</text>
    <text x="150" y="357" font-family="${D}" font-size="18" font-weight="bold" fill="${y}" text-anchor="end">10</text>
    <text x="150" y="297" font-family="${D}" font-size="18" font-weight="bold" fill="${y}" text-anchor="end">15</text>
    <text x="150" y="237" font-family="${D}" font-size="18" font-weight="bold" fill="${y}" text-anchor="end">20</text>
    <text x="150" y="177" font-family="${D}" font-size="18" font-weight="bold" fill="${y}" text-anchor="end">25</text>
    <text x="150" y="117" font-family="${D}" font-size="18" font-weight="bold" fill="${y}" text-anchor="end">30</text>

    <rect x="72" y="58" width="22" height="38" rx="9" fill="#f1c9a5" stroke="${y}" stroke-width="2"/>
    <rect x="162" y="58" width="22" height="38" rx="9" fill="#f1c9a5" stroke="${y}" stroke-width="2"/>
    <rect x="66" y="452" width="24" height="40" rx="10" fill="#f1c9a5" stroke="${y}" stroke-width="2"/>
    <rect x="166" y="452" width="24" height="40" rx="10" fill="#f1c9a5" stroke="${y}" stroke-width="2"/>
    <text x="200" y="84" font-family="${D}" font-size="22" fill="${x}">partner lets go</text>
    <text x="200" y="478" font-family="${D}" font-size="22" fill="${x}">you catch</text>
    ${A(230,140,230,400,x,4,16)}

    <rect x="460" y="56" width="356" height="62" rx="10" fill="${C}"/>
    <text x="550" y="96" font-family="${D}" font-size="24" font-weight="bold" fill="#ffffff" text-anchor="middle">caught at</text>
    <text x="728" y="96" font-family="${D}" font-size="24" font-weight="bold" fill="#ffffff" text-anchor="middle">your time</text>
    <rect x="460" y="122" width="356" height="62" rx="8" fill="#f7f9fa"/>
    <text x="550" y="164" font-family="${D}" font-size="28" font-weight="bold" fill="${y}" text-anchor="middle">5 cm</text>
    <text x="728" y="164" font-family="${D}" font-size="28" font-weight="bold" fill="${b}" text-anchor="middle">0.10 s</text>
    <rect x="460" y="184" width="356" height="62" rx="8" fill="#ffffff"/>
    <text x="550" y="226" font-family="${D}" font-size="28" font-weight="bold" fill="${y}" text-anchor="middle">10 cm</text>
    <text x="728" y="226" font-family="${D}" font-size="28" font-weight="bold" fill="${b}" text-anchor="middle">0.14 s</text>
    <rect x="460" y="246" width="356" height="62" rx="8" fill="#f7f9fa"/>
    <text x="550" y="288" font-family="${D}" font-size="28" font-weight="bold" fill="${y}" text-anchor="middle">15 cm</text>
    <text x="728" y="288" font-family="${D}" font-size="28" font-weight="bold" fill="${b}" text-anchor="middle">0.17 s</text>
    <rect x="460" y="308" width="356" height="62" rx="8" fill="#ffffff"/>
    <text x="550" y="350" font-family="${D}" font-size="28" font-weight="bold" fill="${y}" text-anchor="middle">20 cm</text>
    <text x="728" y="350" font-family="${D}" font-size="28" font-weight="bold" fill="${b}" text-anchor="middle">0.20 s</text>
    <rect x="460" y="370" width="356" height="62" rx="8" fill="#f7f9fa"/>
    <text x="550" y="412" font-family="${D}" font-size="28" font-weight="bold" fill="${y}" text-anchor="middle">25 cm</text>
    <text x="728" y="412" font-family="${D}" font-size="28" font-weight="bold" fill="${b}" text-anchor="middle">0.22 s</text>
    <rect x="460" y="432" width="356" height="62" rx="8" fill="#ffffff"/>
    <text x="550" y="474" font-family="${D}" font-size="28" font-weight="bold" fill="${y}" text-anchor="middle">30 cm</text>
    <text x="728" y="474" font-family="${D}" font-size="28" font-weight="bold" fill="${b}" text-anchor="middle">0.24 s</text>
    <rect x="460" y="56" width="356" height="438" rx="10" fill="none" stroke="${S}" stroke-width="2"/>
  </svg>`},V=e(l(),1),pe=`/assets/apollo15-C8tgDK-k.webm`,me=`/assets/moonjump-Da_Q3TfQ.webm`,H=t(),U=(e,t,n)=>p(e,t,null,n),W=`#2b2b2b`,G=`#c25e12`,K=`#5b6770`,he=`#cfd8dc`,ge=`#0087a8`,_e=`#1a5fa8`,q=`Inter, 'Segoe UI', system-ui, sans-serif`;function J({onClick:e,disabled:t,tone:n=`teal`,icon:r,children:i}){return(0,H.jsxs)(`button`,{onClick:e,disabled:t,className:`inline-flex items-center gap-2 rounded-xl font-black uppercase tracking-wide text-white border-b-4 active:border-b-0 active:translate-y-1 transition-all px-4 py-2 text-sm lg:px-6 lg:py-2.5 lg:text-base disabled:opacity-35 disabled:pointer-events-none ${{teal:`bg-[#0087a8] border-[#00697f]`,orange:`bg-[#c25e12] border-[#a04a0e]`,blue:`bg-[#1a5fa8] border-[#134a85]`,slate:`bg-slate-500 border-slate-700`}[n]}`,children:[r&&(0,H.jsx)(r,{className:`w-4 h-4 lg:w-5 lg:h-5`,strokeWidth:3}),i]})}var ve={id:`E43-CfukEgs`,air:[82,107],vacuum:[158,207]};function ye({lang:e=`en`}){let[t,n]=(0,V.useState)(`air`),[r,i]=(0,V.useState)(0),[o,s]=ve[t],c=`https://www.youtube-nocookie.com/embed/${ve.id}?start=${o}&end=${s}&rel=0&modestbranding=1&playsinline=1${r?`&autoplay=1`:``}`,l=e=>{n(e),i(e=>e+1)};return(0,H.jsxs)(`div`,{className:`w-full h-full flex flex-col gap-3 select-none`,children:[(0,H.jsx)(`div`,{className:`flex-1 min-h-0 flex items-center justify-center`,children:(0,H.jsx)(`div`,{className:`h-full max-w-full rounded-xl overflow-hidden bg-black`,style:{aspectRatio:`16 / 9`},children:(0,H.jsx)(`iframe`,{className:`w-full h-full`,src:c,title:U(e,`A bowling ball and feathers in a vacuum chamber (BBC)`,`Une boule de bowling et des plumes dans une chambre à vide (BBC)`),loading:`lazy`,referrerPolicy:`strict-origin-when-cross-origin`,allow:`autoplay; encrypted-media; picture-in-picture`,allowFullScreen:!0},`${t}-${r}`)})}),(0,H.jsxs)(`div`,{className:`shrink-0 flex items-center justify-center gap-3 flex-wrap`,children:[(0,H.jsx)(J,{tone:t===`air`?`orange`:`slate`,icon:f,onClick:()=>l(`air`),children:U(e,`1 · With air`,`1 · Avec de l’air`)}),(0,H.jsx)(J,{tone:t===`vacuum`?`orange`:`slate`,icon:a,onClick:()=>l(`vacuum`),children:U(e,`2 · No air`,`2 · Sans air`)})]})]})}function be({src:e,ratio:t,label:n,loop:r=!1}){return(0,H.jsx)(`div`,{className:`w-full h-full flex items-center justify-center select-none`,children:(0,H.jsx)(`div`,{className:`h-full max-w-full rounded-xl overflow-hidden bg-black`,style:{aspectRatio:t},children:(0,H.jsx)(`video`,{className:`w-full h-full object-contain`,src:e,controls:!0,playsInline:!0,preload:`metadata`,"aria-label":n,...r?{autoPlay:!0,muted:!0,loop:!0}:{}})})})}function xe({lang:e=`en`}){return(0,H.jsx)(be,{src:pe,ratio:`654 / 480`,label:U(e,`A hammer and a feather dropped on the Moon, Apollo 15`,`Un marteau et une plume lâchés sur la Lune, Apollo 15`)})}function Se({lang:e=`en`}){return(0,H.jsx)(be,{src:me,ratio:`854 / 640`,loop:!0,label:U(e,`Two astronauts bounding on the Moon, Apollo 16`,`Deux astronautes qui bondissent sur la Lune, Apollo 16`)})}var Ce=5,Y=104,we=352,X=248/Ce,Z=370,Te=.2,Ee=[{g:10,x0:20,en:`Earth`,fr:`Terre`},{g:1.6,x0:570,en:`Moon`,fr:`Lune`}],De=e=>Math.sqrt(10/e),Oe=De(1.6),ke=(e,t)=>Math.min(Ce,.5*e*t*t);function Ae({x:e,y:t}){return(0,H.jsxs)(`g`,{children:[(0,H.jsx)(`circle`,{cx:e,cy:t,r:`18`,fill:`#e2492c`,stroke:W,strokeWidth:`2.5`}),(0,H.jsx)(`circle`,{cx:e-5,cy:t-7,r:`2.6`,fill:W}),(0,H.jsx)(`circle`,{cx:e+4,cy:t-8,r:`2.6`,fill:W}),(0,H.jsx)(`circle`,{cx:e,cy:t+3,r:`2.6`,fill:W})]})}function je({x:e,y:t}){return(0,H.jsxs)(`g`,{children:[(0,H.jsx)(`circle`,{cx:e,cy:t,r:`18`,fill:`#ffffff`,stroke:W,strokeWidth:`2.5`}),(0,H.jsx)(`path`,{d:`M ${e} ${t-7} L ${e+7} ${t-2} L ${e+4} ${t+6} L ${e-4} ${t+6} L ${e-7} ${t-2} Z`,fill:W})]})}function Me({x:e,y:t}){return(0,H.jsxs)(`g`,{stroke:W,strokeWidth:`2.5`,strokeLinejoin:`round`,children:[(0,H.jsx)(`rect`,{x:e-4,y:t-6,width:`8`,height:`26`,rx:`2`,fill:`#b98a5a`}),(0,H.jsx)(`rect`,{x:e-18,y:t-16,width:`36`,height:`12`,rx:`3`,fill:`#9aa5ae`})]})}function Ne({x:e,y:t}){return(0,H.jsxs)(`g`,{stroke:W,strokeWidth:`2`,strokeLinejoin:`round`,children:[(0,H.jsx)(`path`,{d:`M ${e} ${t-20} C ${e+12} ${t-10} ${e+10} ${t+8} ${e} ${t+18} C ${e-10} ${t+8} ${e-12} ${t-10} ${e} ${t-20} Z`,fill:`#ffffff`}),(0,H.jsx)(`path`,{d:`M ${e} ${t-16} L ${e} ${t+22}`,fill:`none`})]})}function Pe({lang:e=`en`}){let[t,r]=(0,V.useState)(0),[i,a]=(0,V.useState)(!1),o=(0,V.useRef)(0);(0,V.useEffect)(()=>()=>cancelAnimationFrame(o.current),[]);let s=e=>{cancelAnimationFrame(o.current);let t=performance.now(),n=i=>{let s=(i-t)/1e3*e;s>=Oe?(r(Oe),a(!1)):(r(s),o.current=requestAnimationFrame(n))};r(0),a(!0),o.current=requestAnimationFrame(n)};return(0,H.jsxs)(`div`,{className:`w-full h-full flex flex-col gap-3 select-none`,children:[(0,H.jsx)(`div`,{className:`flex-1 min-h-0 w-full`,children:(0,H.jsxs)(`svg`,{viewBox:`0 0 1120 440`,className:`w-full h-full`,preserveAspectRatio:`xMidYMid meet`,children:[(0,H.jsx)(`rect`,{x:`0`,y:`0`,width:`1120`,height:`440`,rx:`14`,fill:`#ffffff`}),Ee.map(n=>{let{x0:r,g:i}=n,a=De(i),o=t>=a,s=Y+ke(i,t)*X,c=[];for(let e=1;e*Te<=Math.min(t,a)+1e-9;e++)c.push(Y+ke(i,e*Te)*X);let l=Math.min(t,a),u=Math.round(i*a*3.6),d=r+150,f=r+240;return(0,H.jsxs)(`g`,{children:[(0,H.jsx)(`rect`,{x:r,y:`16`,width:`530`,height:`408`,rx:`14`,fill:`#f7fafc`,stroke:he,strokeWidth:`2`}),(0,H.jsx)(`text`,{x:r+24,y:`56`,fontFamily:q,fontSize:`30`,fontWeight:`bold`,fill:W,children:U(e,n.en,n.fr)}),(0,H.jsxs)(`text`,{x:r+506,y:`56`,fontFamily:q,fontSize:`26`,fontWeight:`bold`,fill:G,textAnchor:`end`,children:[i,` N/kg`]}),(0,H.jsx)(`line`,{x1:r+56,y1:Y,x2:r+56,y2:we,stroke:K,strokeWidth:`2`}),[0,1,2,3,4,5].map(e=>(0,H.jsxs)(`g`,{children:[(0,H.jsx)(`line`,{x1:r+50,y1:Y+e*X,x2:r+62,y2:Y+e*X,stroke:K,strokeWidth:`2`}),(0,H.jsxs)(`text`,{x:r+44,y:Y+e*X+6,fontFamily:q,fontSize:`17`,fill:K,textAnchor:`end`,children:[e,` m`]})]},e)),(0,H.jsx)(`rect`,{x:r+70,y:Z,width:`440`,height:`16`,fill:i===10?`#d9c7a5`:`#cfd2d6`}),(0,H.jsx)(`line`,{x1:r+70,y1:Z,x2:r+510,y2:Z,stroke:W,strokeWidth:`3`}),c.map((e,t)=>(0,H.jsx)(`circle`,{cx:d-44,cy:e,r:`5`,fill:G},t)),i===10?(0,H.jsxs)(H.Fragment,{children:[(0,H.jsx)(Ae,{x:d,y:s}),(0,H.jsx)(je,{x:f,y:s})]}):(0,H.jsxs)(H.Fragment,{children:[(0,H.jsx)(Me,{x:d,y:s}),(0,H.jsx)(Ne,{x:f,y:s})]}),(0,H.jsx)(`text`,{x:r+420,y:`150`,fontFamily:q,fontSize:`20`,fill:K,textAnchor:`middle`,children:U(e,`time`,`temps`)}),(0,H.jsxs)(`text`,{x:r+420,y:`200`,fontFamily:q,fontSize:`46`,fontWeight:`bold`,fill:o?G:W,textAnchor:`middle`,children:[l.toFixed(1),` s`]}),o&&(0,H.jsxs)(H.Fragment,{children:[(0,H.jsx)(`text`,{x:r+420,y:`252`,fontFamily:q,fontSize:`24`,fontWeight:`bold`,fill:G,textAnchor:`middle`,children:U(e,`landed!`,`au sol\xA0!`)}),(0,H.jsx)(`text`,{x:r+420,y:`292`,fontFamily:q,fontSize:`20`,fill:K,textAnchor:`middle`,children:U(e,`at ${u} km/h`,`à ${u} km/h`)})]}),(0,H.jsx)(`text`,{x:r+290,y:`410`,fontFamily:q,fontSize:`18`,fill:K,textAnchor:`middle`,children:U(e,`one dot every 0.2 s`,`un point toutes les 0.2 s`)})]},n.en)})]})}),(0,H.jsxs)(`div`,{className:`shrink-0 flex items-center justify-center gap-3 flex-wrap`,children:[(0,H.jsx)(J,{tone:`orange`,icon:n,disabled:i,onClick:()=>s(1),children:U(e,`Drop`,`Lâcher`)}),(0,H.jsx)(J,{tone:`teal`,icon:d,disabled:i,onClick:()=>s(1/3),children:U(e,`Slow motion`,`Ralenti`)}),(0,H.jsx)(J,{tone:`slate`,icon:u,disabled:t===0&&!i,onClick:()=>{cancelAnimationFrame(o.current),a(!1),r(0)},children:U(e,`Reset`,`Remettre`)})]})]})}var Q=80,Fe=[{en:`Mercury`,fr:`Mercure`,g:3.7,r:15,fill:`#b5b5b5`},{en:`Venus`,fr:`Vénus`,g:8.9,r:23,fill:`#e8c27a`},{en:`Earth`,fr:`Terre`,g:10,r:24,fill:`#4f8fbf`},{en:`Moon`,fr:`Lune`,g:1.6,r:11,fill:`#d9d9d9`},{en:`Mars`,fr:`Mars`,g:3.7,r:17,fill:`#d0643b`},{en:`Jupiter`,fr:`Jupiter`,g:25,r:44,fill:`#d9a066`},{en:`Saturn`,fr:`Saturne`,g:10,r:34,fill:`#e6cf8b`,ring:!0},{en:`Uranus`,fr:`Uranus`,g:8.7,r:29,fill:`#8fd3e0`},{en:`Neptune`,fr:`Neptune`,g:11,r:28,fill:`#4a6fd1`}],Ie=e=>70+e*122.5,Le=e=>Math.round(Q*e);function Re({lang:e=`en`}){let[t,n]=(0,V.useState)(null),[r,i]=(0,V.useState)(!1),a=t===null?null:Fe[t],o=e=>{n(e),i(!1)};return(0,H.jsxs)(`div`,{className:`w-full h-full flex flex-col gap-3 select-none`,children:[(0,H.jsx)(`div`,{className:`flex-1 min-h-0 w-full`,children:(0,H.jsxs)(`svg`,{viewBox:`0 0 1120 440`,className:`w-full h-full`,preserveAspectRatio:`xMidYMid meet`,children:[(0,H.jsx)(`rect`,{x:`0`,y:`0`,width:`1120`,height:`440`,rx:`14`,fill:`#ffffff`}),Fe.map((n,r)=>{let i=t===null||t===r,a=Ie(r);return(0,H.jsxs)(`g`,{onClick:()=>o(r),style:{cursor:`pointer`},children:[(0,H.jsx)(`rect`,{x:a-60,y:`20`,width:`120`,height:`212`,rx:`14`,fill:t===r?`#fdf1e3`:`#ffffff`,stroke:t===r?G:`none`,strokeWidth:`3`}),n.ring&&(0,H.jsx)(`ellipse`,{cx:a,cy:`104`,rx:`56`,ry:`11`,fill:`none`,stroke:i?`#b39b55`:`#d5dbe1`,strokeWidth:`4`}),(0,H.jsx)(`circle`,{cx:a,cy:`104`,r:n.r,fill:i?n.fill:`#e5e9ed`,stroke:i?W:`#cfd5db`,strokeWidth:`2`}),(0,H.jsx)(`text`,{x:a,y:`186`,fontFamily:q,fontSize:`20`,fontWeight:`bold`,fill:i?W:`#b8c1ca`,textAnchor:`middle`,children:U(e,n.en,n.fr)}),(0,H.jsxs)(`text`,{x:a,y:`214`,fontFamily:q,fontSize:`19`,fontWeight:`bold`,fill:i?G:`#c8d0d7`,textAnchor:`middle`,children:[n.g,` N/kg`]})]},n.en)}),(0,H.jsx)(`rect`,{x:`40`,y:`252`,width:`500`,height:`172`,rx:`16`,fill:`#e2f2f6`,stroke:ge,strokeWidth:`3`}),(0,H.jsx)(`text`,{x:`290`,y:`298`,fontFamily:q,fontSize:`26`,fontWeight:`bold`,fill:W,textAnchor:`middle`,children:U(e,`Mr Bowen’s mass`,`La masse de M. Bowen`)}),(0,H.jsxs)(`text`,{x:`290`,y:`374`,fontFamily:q,fontSize:`62`,fontWeight:`bold`,fill:ge,textAnchor:`middle`,children:[Q,` kg`]}),(0,H.jsx)(`text`,{x:`290`,y:`408`,fontFamily:q,fontSize:`20`,fill:K,textAnchor:`middle`,children:U(e,`the same on every planet`,`la même sur toutes les planètes`)}),(0,H.jsx)(`rect`,{x:`580`,y:`252`,width:`500`,height:`172`,rx:`16`,fill:`#fdf1e3`,stroke:G,strokeWidth:`3`}),(0,H.jsx)(`text`,{x:`830`,y:`298`,fontFamily:q,fontSize:`26`,fontWeight:`bold`,fill:W,textAnchor:`middle`,children:a?U(e,`His weight on ${a.en}`,`Son poids sur ${a.fr}`):U(e,`Tap a planet`,`Touche une planète`)}),a&&(0,H.jsxs)(H.Fragment,{children:[(0,H.jsx)(`text`,{x:`830`,y:`374`,fontFamily:q,fontSize:`62`,fontWeight:`bold`,fill:r?G:`#c8d0d7`,textAnchor:`middle`,children:r?`${Le(a.g)} N`:`? N`}),(0,H.jsxs)(`text`,{x:`830`,y:`408`,fontFamily:q,fontSize:`20`,fill:K,textAnchor:`middle`,children:[Q,` × `,a.g]})]})]})}),(0,H.jsxs)(`div`,{className:`shrink-0 flex items-center justify-center gap-3 flex-wrap`,children:[(0,H.jsx)(J,{tone:`orange`,icon:ee,disabled:!a||r,onClick:()=>i(!0),children:U(e,`Show weight`,`Voir le poids`)}),(0,H.jsx)(J,{tone:`slate`,icon:u,disabled:!a,onClick:()=>{n(null),i(!1)},children:U(e,`Clear`,`Effacer`)})]})]})}var $=[{en:`___ is measured in newtons (N).`,fr:`___ se mesure en newtons (N).`,weight:!0,why:`Weight is a force. Forces are measured in newtons.`,whyFr:`Le poids est une force. Les forces se mesurent en newtons.`},{en:`___ is measured in kilograms (kg).`,fr:`___ se mesure en kilogrammes (kg).`,weight:!1,why:`Kilograms measure the amount of matter.`,whyFr:`Les kilogrammes mesurent la quantité de matière.`},{en:`___ is the quantity of matter in an object.`,fr:`___ est la quantité de matière dans un objet.`,weight:!1,why:`That is what mass means.`,whyFr:`C’est la définition de la masse.`},{en:`___ of an object changes when the strength of gravity changes.`,fr:`___ d’un objet change quand la force de gravité change.`,weight:!0,the:!0,why:`On the Moon, your weight is much smaller.`,whyFr:`Sur la Lune, ton poids est bien plus petit.`},{en:`___ is not changed by gravity.`,fr:`___ ne change pas avec la gravité.`,weight:!1,why:`Your mass is the same on every planet.`,whyFr:`Ta masse est la même sur toutes les planètes.`},{en:`___ of an object gets smaller as it moves away from the Earth.`,fr:`___ d’un objet diminue quand il s’éloigne de la Terre.`,weight:!0,the:!0,why:`Gravity is weaker far away.`,whyFr:`La gravité est plus faible loin de la Terre.`},{en:`___ can be measured in grams (g).`,fr:`___ peut se mesurer en grammes (g).`,weight:!1,why:`1000 g = 1 kg. Grams measure mass too.`,whyFr:`1000 g = 1 kg. Les grammes mesurent aussi la masse.`},{en:`___ is the force you need to lift an object.`,fr:`___ est la force qu’il faut pour soulever un objet.`,weight:!0,why:`To lift it, you pull against gravity.`,whyFr:`Pour le soulever, tu tires contre la gravité.`},{en:`___ equals the contact force when an object rests on a level desk.`,fr:`___ est égal à la force de contact quand un objet est posé sur une table.`,weight:!0,why:`The desk pushes up as hard as gravity pulls down.`,whyFr:`La table pousse vers le haut autant que la gravité tire vers le bas.`},{en:`___ is what gives a planet its gravity.`,fr:`___ est ce qui donne sa gravité à une planète.`,weight:!1,why:`Big mass, strong gravity.`,whyFr:`Grande masse, gravité forte.`},{en:`___ of Mr Bowen on the Moon is 128 N.`,fr:`___ de M. Bowen sur la Lune est de 128 N.`,weight:!0,the:!0,why:`Newtons, so it is a weight. His mass is still 80 kg.`,whyFr:`Des newtons, donc c’est un poids. Sa masse est toujours 80 kg.`},{en:`___ of a bag of rice is the same on Mars.`,fr:`___ d’un sac de riz est la même sur Mars.`,weight:!1,the:!0,why:`Mass does not change. The rice does not know it is on Mars.`,whyFr:`La masse ne change pas. Le riz ne sait pas qu’il est sur Mars.`}];function ze({side:e,label:t,active:n,big:r}){let i=e===`left`;return(0,H.jsxs)(`div`,{className:`flex flex-col items-center justify-center gap-2 rounded-3xl border-4 px-4 py-5 transition-all duration-300 shrink-0 ${n===null?`opacity-100`:n?`opacity-100 scale-105`:`opacity-25`} ${i?`border-[#1a5fa8] bg-[#e9f1fa] text-[#1a5fa8]`:`border-[#c25e12] bg-[#fdf1e3] text-[#c25e12]`}`,children:[(0,H.jsx)(o,{className:`${r?`w-[clamp(4rem,11vh,8rem)] h-[clamp(4rem,11vh,8rem)]`:`w-20 h-20`} ${i?`-scale-x-100`:``}`,strokeWidth:2.2}),(0,H.jsx)(`div`,{className:`font-black uppercase tracking-wide ${r?`text-[clamp(1.2rem,3vh,2.2rem)]`:`text-xl`}`,children:t})]})}function Be({text:e,fill:t,colour:n}){let[r,i]=e.split(`___`);return(0,H.jsxs)(H.Fragment,{children:[r,t?(0,H.jsx)(`span`,{style:{color:n},children:t}):(0,H.jsx)(`span`,{className:`inline-block align-baseline w-[3.2em] border-b-[6px] border-slate-400 mx-1`}),i]})}function Ve({lang:e=`en`,isDisplayMode:t=!1}){let[n,a]=(0,V.useState)(()=>$.map((e,t)=>t)),[o,l]=(0,V.useState)(0),[d,f]=(0,V.useState)(!1),p=o>=n.length,m=p?null:$[n[o]],h=t,g=(0,V.useCallback)(()=>{p||(d?(f(!1),l(e=>e+1)):f(!0))},[p,d]),te=()=>{let e=$.map((e,t)=>t);for(let t=e.length-1;t>0;t--){let n=Math.floor(Math.random()*(t+1));[e[t],e[n]]=[e[n],e[t]]}a(e),l(0),f(!1)};(0,V.useEffect)(()=>{let e=e=>{(e.key===`ArrowRight`||e.key===`PageDown`)&&(e.preventDefault(),g())};return window.addEventListener(`keydown`,e),()=>window.removeEventListener(`keydown`,e)},[g]);let _=d?m.weight:null,v=m?.weight?G:_e,ne=m&&d?m.weight?m.the?`The weight`:`Weight`:m.the?`The mass`:`Mass`:null,re=m&&d?m.weight?`Le poids`:`La masse`:null;return(0,H.jsxs)(`div`,{className:`w-full h-full flex flex-col bg-slate-50 dark:bg-slate-950 overflow-hidden select-none`,children:[(0,H.jsxs)(`div`,{className:`flex items-center justify-between gap-3 px-4 sm:px-6 py-3 border-b-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shrink-0`,children:[(0,H.jsxs)(`div`,{className:`flex items-center gap-3 min-w-0`,children:[(0,H.jsx)(`div`,{className:`p-2 rounded-xl text-white bg-[#c25e12] shrink-0`,children:(0,H.jsx)(c,{className:h?`w-7 h-7`:`w-5 h-5`,strokeWidth:2.5})}),(0,H.jsxs)(`div`,{className:`min-w-0`,children:[(0,H.jsx)(`div`,{className:`font-black tracking-tight text-slate-800 dark:text-slate-100 leading-none ${h?`text-2xl`:`text-lg sm:text-xl`}`,children:U(e,`Mass or Weight?`,`Masse ou poids\xA0?`)}),(0,H.jsx)(`div`,{className:`font-bold text-slate-400 dark:text-slate-500 truncate ${h?`text-base`:`text-xs`}`,children:U(e,`Left hand: mass. Right hand: weight. Everyone at once.`,`Main gauche\xA0: masse. Main droite\xA0: poids. Tous ensemble.`)})]})]}),!p&&(0,H.jsxs)(`div`,{className:`font-black text-slate-400 dark:text-slate-500 tabular-nums shrink-0 ${h?`text-2xl`:`text-base`}`,children:[o+1,` / `,n.length]})]}),(0,H.jsx)(`div`,{className:`flex-1 min-h-0 flex items-center justify-center gap-[clamp(1rem,3vw,3rem)] p-4`,children:p?(0,H.jsxs)(`div`,{className:`flex flex-col items-center gap-4`,children:[(0,H.jsx)(`div`,{className:`p-4 rounded-2xl bg-emerald-500 text-white`,children:(0,H.jsx)(r,{className:`w-12 h-12`,strokeWidth:2})}),(0,H.jsx)(`div`,{className:`font-black text-slate-800 dark:text-slate-100 ${h?`text-5xl`:`text-3xl`}`,children:U(e,`All 12 done!`,`Les 12 sont faits\xA0!`)})]}):(0,H.jsxs)(H.Fragment,{children:[(0,H.jsx)(ze,{side:`left`,label:U(e,`Mass`,`Masse`),active:_===null?null:!_,big:h}),(0,H.jsxs)(`div`,{className:`flex flex-col items-center gap-[clamp(0.75rem,3vh,2rem)] min-w-0 flex-1 max-w-[56rem]`,children:[(0,H.jsxs)(`div`,{className:`w-full rounded-3xl border-[6px] bg-white flex flex-col items-center justify-center text-center font-black text-[#2b2b2b] leading-snug shadow-sm px-8 py-5 ${_===null?`border-slate-300`:_?`border-[#c25e12]`:`border-[#1a5fa8]`} ${h?`min-h-[clamp(11rem,28vh,19rem)] text-[clamp(1.8rem,5.2vh,3.4rem)]`:`min-h-[10rem] text-3xl`}`,children:[(0,H.jsx)(`div`,{children:(0,H.jsx)(Be,{text:m.en,fill:ne,colour:v})}),e===`fr`&&(0,H.jsxs)(`div`,{className:`mt-2 font-bold text-slate-500 ${h?`text-[clamp(1.1rem,2.8vh,2rem)]`:`text-lg`}`,children:[`(`,(0,H.jsx)(Be,{text:m.fr,fill:re,colour:v}),`)`]})]}),(0,H.jsx)(`div`,{className:`min-h-[clamp(4rem,11vh,7rem)] flex flex-col items-center justify-center gap-2 text-center`,children:d?(0,H.jsx)(`div`,{className:`font-bold text-slate-600 dark:text-slate-300 ${h?`text-[clamp(1.1rem,2.6vh,1.9rem)]`:`text-lg`}`,children:U(e,m.why,m.whyFr)}):(0,H.jsx)(`div`,{className:`font-black text-slate-300 dark:text-slate-700 ${h?`text-7xl`:`text-5xl`}`,children:`?`})})]}),(0,H.jsx)(ze,{side:`right`,label:U(e,`Weight`,`Poids`),active:_,big:h})]})}),(0,H.jsxs)(`div`,{className:`shrink-0 flex items-center justify-center gap-3 flex-wrap px-4 pb-4 pt-2`,children:[(0,H.jsx)(J,{tone:`teal`,icon:s,onClick:te,children:U(e,`Shuffle`,`Mélanger`)}),!p&&(0,H.jsx)(J,{tone:`orange`,icon:d?i:ee,onClick:g,children:d?U(e,`Next`,`Suivant`):U(e,`Show`,`Voir`)}),p&&(0,H.jsx)(J,{tone:`slate`,icon:u,onClick:()=>{l(0),f(!1)},children:U(e,`Start again`,`Recommencer`)})]})]})}var He=`/assets/strobe-Ce0hda15.jpg`;export{Se as a,fe as c,Ve as i,xe as n,Re as o,Pe as r,ye as s,He as t};