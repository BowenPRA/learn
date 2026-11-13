import{r as e}from"./rolldown-runtime-XKyaHtl9.js";import{il as t,qc as n}from"./vendor-BpJNYKxZ.js";import{f as r}from"./classroom-DEA5bv9U.js";var i=`#2b2b2b`,a=`#c25e12`,o=`#7c8a95`,s=`#c8102e`,c=`#1a5fa8`,l=`#4a8b23`,u=`#eef6e6`,d=`#fdf1e3`,f=`#eef4fb`,p=`#fdeef0`,m=`#f1f5f9`,h=`Inter, 'Segoe UI', system-ui, sans-serif`,g=(e,t)=>`<rect x="0" y="0" width="${e}" height="${t}" rx="14" fill="#ffffff"/>
    <rect x="0.75" y="0.75" width="${e-1.5}" height="${t-1.5}" rx="13" fill="none" stroke="#e2e8f0" stroke-width="1.5"/>`,_=`<defs>
    <marker id="m6-blue" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="${c}"/></marker>
    <marker id="m6-key" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="${a}"/></marker>
  </defs>`,v=(e,t,n,r,a)=>{let o=n*r,s=e-o/2,c=t-o,l=`<rect x="${s}" y="${c}" width="${o}" height="${o}" fill="${a}" stroke="${i}" stroke-width="2.5"/>`;for(let e=1;e<n;e+=1)l+=`<line x1="${s+e*r}" y1="${c}" x2="${s+e*r}" y2="${t}" stroke="${i}" stroke-width="1"/>`,l+=`<line x1="${s}" y1="${c+e*r}" x2="${s+o}" y2="${c+e*r}" stroke="${i}" stroke-width="1"/>`;return l},y=(e,t,n,r)=>{let a=n*r,o=`<polygon points="${`${e},${t} ${e+a},${t+a/2} ${e},${t+a} ${e-a},${t+a/2}`}" fill="#ffffff" stroke="${i}" stroke-width="2.5"/><polygon points="${`${e-a},${t+a/2} ${e},${t+a} ${e},${t+a+a} ${e-a},${t+a/2+a}`}" fill="${m}" stroke="${i}" stroke-width="2.5"/><polygon points="${`${e},${t+a} ${e+a},${t+a/2} ${e+a},${t+a/2+a} ${e},${t+a+a}`}" fill="${f}" stroke="${i}" stroke-width="2.5"/>`;for(let s=1;s<n;s+=1){let n=s*r;o+=`<line x1="${e-a+n}" y1="${t+a/2-n/2}" x2="${e+n}" y2="${t+a-n/2}" stroke="${i}" stroke-width="1"/>`,o+=`<line x1="${e+a-n}" y1="${t+a/2-n/2}" x2="${e-n}" y2="${t+a-n/2}" stroke="${i}" stroke-width="1"/>`,o+=`<line x1="${e-a+n}" y1="${t+a/2+n/2}" x2="${e-a+n}" y2="${t+a/2+n/2+a}" stroke="${i}" stroke-width="1"/>`,o+=`<line x1="${e+a-n}" y1="${t+a/2+n/2}" x2="${e+a-n}" y2="${t+a/2+n/2+a}" stroke="${i}" stroke-width="1"/>`,o+=`<line x1="${e-a}" y1="${t+a/2+n}" x2="${e}" y2="${t+a+n}" stroke="${i}" stroke-width="1"/>`,o+=`<line x1="${e+a}" y1="${t+a/2+n}" x2="${e}" y2="${t+a+n}" stroke="${i}" stroke-width="1"/>`}return o},b={SQUARE_TILES:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 660 252" class="w-full h-full">
    ${g(660,252)}

    <text x="330" y="32" font-family="${h}" font-size="19" font-weight="bold" fill="${a}" text-anchor="middle">A square number really is a square</text>

    ${v(90,190,1,22,u)}
    ${v(220,190,2,22,u)}
    ${v(380,190,3,22,u)}
    ${v(560,190,4,22,u)}

    <text x="90" y="224" font-family="${h}" font-size="16" font-weight="bold" fill="${i}" text-anchor="middle">1 × 1 = 1</text>
    <text x="220" y="224" font-family="${h}" font-size="16" font-weight="bold" fill="${i}" text-anchor="middle">2 × 2 = 4</text>
    <text x="380" y="224" font-family="${h}" font-size="16" font-weight="bold" fill="${i}" text-anchor="middle">3 × 3 = 9</text>
    <text x="560" y="224" font-family="${h}" font-size="16" font-weight="bold" fill="${i}" text-anchor="middle">4 × 4 = 16</text>
  </svg>`,SQUARE_LIST:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 660 262" class="w-full h-full">
    ${g(660,262)}

    <text x="330" y="30" font-family="${h}" font-size="19" font-weight="bold" fill="${a}" text-anchor="middle">The first twelve square numbers</text>

    <text x="84" y="60" font-family="${h}" font-size="15" font-weight="bold" fill="${a}" text-anchor="middle">1</text>
    <text x="180" y="60" font-family="${h}" font-size="15" font-weight="bold" fill="${a}" text-anchor="middle">2</text>
    <text x="276" y="60" font-family="${h}" font-size="15" font-weight="bold" fill="${a}" text-anchor="middle">3</text>
    <text x="372" y="60" font-family="${h}" font-size="15" font-weight="bold" fill="${a}" text-anchor="middle">4</text>
    <text x="468" y="60" font-family="${h}" font-size="15" font-weight="bold" fill="${a}" text-anchor="middle">5</text>
    <text x="564" y="60" font-family="${h}" font-size="15" font-weight="bold" fill="${a}" text-anchor="middle">6</text>

    <rect x="40" y="80" width="88" height="48" rx="10" fill="${f}" stroke="${c}" stroke-width="2"/>
    <rect x="136" y="80" width="88" height="48" rx="10" fill="${f}" stroke="${c}" stroke-width="2"/>
    <rect x="232" y="80" width="88" height="48" rx="10" fill="${f}" stroke="${c}" stroke-width="2"/>
    <rect x="328" y="80" width="88" height="48" rx="10" fill="${f}" stroke="${c}" stroke-width="2"/>
    <rect x="424" y="80" width="88" height="48" rx="10" fill="${f}" stroke="${c}" stroke-width="2"/>
    <rect x="520" y="80" width="88" height="48" rx="10" fill="${f}" stroke="${c}" stroke-width="2"/>
    <text x="84" y="114" font-family="${h}" font-size="24" font-weight="900" fill="${i}" text-anchor="middle">1</text>
    <text x="180" y="114" font-family="${h}" font-size="24" font-weight="900" fill="${i}" text-anchor="middle">4</text>
    <text x="276" y="114" font-family="${h}" font-size="24" font-weight="900" fill="${i}" text-anchor="middle">9</text>
    <text x="372" y="114" font-family="${h}" font-size="24" font-weight="900" fill="${i}" text-anchor="middle">16</text>
    <text x="468" y="114" font-family="${h}" font-size="24" font-weight="900" fill="${i}" text-anchor="middle">25</text>
    <text x="564" y="114" font-family="${h}" font-size="24" font-weight="900" fill="${i}" text-anchor="middle">36</text>

    <text x="84" y="164" font-family="${h}" font-size="15" font-weight="bold" fill="${a}" text-anchor="middle">7</text>
    <text x="180" y="164" font-family="${h}" font-size="15" font-weight="bold" fill="${a}" text-anchor="middle">8</text>
    <text x="276" y="164" font-family="${h}" font-size="15" font-weight="bold" fill="${a}" text-anchor="middle">9</text>
    <text x="372" y="164" font-family="${h}" font-size="15" font-weight="bold" fill="${a}" text-anchor="middle">10</text>
    <text x="468" y="164" font-family="${h}" font-size="15" font-weight="bold" fill="${a}" text-anchor="middle">11</text>
    <text x="564" y="164" font-family="${h}" font-size="15" font-weight="bold" fill="${a}" text-anchor="middle">12</text>

    <rect x="40" y="184" width="88" height="48" rx="10" fill="${u}" stroke="${l}" stroke-width="2"/>
    <rect x="136" y="184" width="88" height="48" rx="10" fill="${u}" stroke="${l}" stroke-width="2"/>
    <rect x="232" y="184" width="88" height="48" rx="10" fill="${u}" stroke="${l}" stroke-width="2"/>
    <rect x="328" y="184" width="88" height="48" rx="10" fill="${u}" stroke="${l}" stroke-width="2"/>
    <rect x="424" y="184" width="88" height="48" rx="10" fill="${u}" stroke="${l}" stroke-width="2"/>
    <rect x="520" y="184" width="88" height="48" rx="10" fill="${u}" stroke="${l}" stroke-width="2"/>
    <text x="84" y="218" font-family="${h}" font-size="24" font-weight="900" fill="${i}" text-anchor="middle">49</text>
    <text x="180" y="218" font-family="${h}" font-size="24" font-weight="900" fill="${i}" text-anchor="middle">64</text>
    <text x="276" y="218" font-family="${h}" font-size="24" font-weight="900" fill="${i}" text-anchor="middle">81</text>
    <text x="372" y="218" font-family="${h}" font-size="24" font-weight="900" fill="${i}" text-anchor="middle">100</text>
    <text x="468" y="218" font-family="${h}" font-size="24" font-weight="900" fill="${i}" text-anchor="middle">121</text>
    <text x="564" y="218" font-family="${h}" font-size="24" font-weight="900" fill="${i}" text-anchor="middle">144</text>

    <text x="330" y="252" font-family="${h}" font-size="13" font-weight="bold" fill="${o}" text-anchor="middle">orange on top, its square in the box below</text>
  </svg>`,ROOT_BOTH_WAYS:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 660 250" class="w-full h-full">
    ${g(660,250)}${_}

    <text x="330" y="32" font-family="${h}" font-size="19" font-weight="bold" fill="${a}" text-anchor="middle">Squaring goes out. Square rooting comes back.</text>

    <rect x="50" y="86" width="160" height="76" rx="14" fill="${u}" stroke="${l}" stroke-width="3"/>
    <text x="130" y="140" font-family="${h}" font-size="42" font-weight="900" fill="${i}" text-anchor="middle">15</text>

    <rect x="450" y="86" width="160" height="76" rx="14" fill="${d}" stroke="${a}" stroke-width="3"/>
    <text x="530" y="140" font-family="${h}" font-size="42" font-weight="900" fill="${i}" text-anchor="middle">225</text>

    <path d="M 214 106 C 280 68, 380 68, 444 104" fill="none" stroke="${c}" stroke-width="3" marker-end="url(#m6-blue)"/>
    <text x="330" y="70" font-family="${h}" font-size="16" font-weight="bold" fill="${c}" text-anchor="middle">15 × 15</text>

    <path d="M 446 144 C 380 182, 280 182, 216 146" fill="none" stroke="${a}" stroke-width="3" marker-end="url(#m6-key)"/>
    <text x="330" y="202" font-family="${h}" font-size="16" font-weight="bold" fill="${a}" text-anchor="middle">√225</text>

    <text x="330" y="234" font-family="${h}" font-size="15" font-weight="bold" fill="${i}" text-anchor="middle">The square root is the number you started from.</text>
  </svg>`,PATIO_225:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 660 340" class="w-full h-full">
    ${g(660,340)}

    <text x="330" y="30" font-family="${h}" font-size="19" font-weight="bold" fill="${a}" text-anchor="middle">Mr Bowen’s patio</text>
    <text x="330" y="58" font-family="${h}" font-size="16" font-weight="bold" fill="${i}" text-anchor="middle">15 stones along the top</text>

    <rect x="210" y="80" width="240" height="240" fill="${d}" stroke="${i}" stroke-width="3"/>
    <line x1="226" y1="80" x2="226" y2="320" stroke="${i}" stroke-width="1"/>
    <line x1="242" y1="80" x2="242" y2="320" stroke="${i}" stroke-width="1"/>
    <line x1="258" y1="80" x2="258" y2="320" stroke="${i}" stroke-width="1"/>
    <line x1="274" y1="80" x2="274" y2="320" stroke="${i}" stroke-width="1"/>
    <line x1="290" y1="80" x2="290" y2="320" stroke="${i}" stroke-width="1"/>
    <line x1="306" y1="80" x2="306" y2="320" stroke="${i}" stroke-width="1"/>
    <line x1="322" y1="80" x2="322" y2="320" stroke="${i}" stroke-width="1"/>
    <line x1="338" y1="80" x2="338" y2="320" stroke="${i}" stroke-width="1"/>
    <line x1="354" y1="80" x2="354" y2="320" stroke="${i}" stroke-width="1"/>
    <line x1="370" y1="80" x2="370" y2="320" stroke="${i}" stroke-width="1"/>
    <line x1="386" y1="80" x2="386" y2="320" stroke="${i}" stroke-width="1"/>
    <line x1="402" y1="80" x2="402" y2="320" stroke="${i}" stroke-width="1"/>
    <line x1="418" y1="80" x2="418" y2="320" stroke="${i}" stroke-width="1"/>
    <line x1="434" y1="80" x2="434" y2="320" stroke="${i}" stroke-width="1"/>
    <line x1="210" y1="96" x2="450" y2="96" stroke="${i}" stroke-width="1"/>
    <line x1="210" y1="112" x2="450" y2="112" stroke="${i}" stroke-width="1"/>
    <line x1="210" y1="128" x2="450" y2="128" stroke="${i}" stroke-width="1"/>
    <line x1="210" y1="144" x2="450" y2="144" stroke="${i}" stroke-width="1"/>
    <line x1="210" y1="160" x2="450" y2="160" stroke="${i}" stroke-width="1"/>
    <line x1="210" y1="176" x2="450" y2="176" stroke="${i}" stroke-width="1"/>
    <line x1="210" y1="192" x2="450" y2="192" stroke="${i}" stroke-width="1"/>
    <line x1="210" y1="208" x2="450" y2="208" stroke="${i}" stroke-width="1"/>
    <line x1="210" y1="224" x2="450" y2="224" stroke="${i}" stroke-width="1"/>
    <line x1="210" y1="240" x2="450" y2="240" stroke="${i}" stroke-width="1"/>
    <line x1="210" y1="256" x2="450" y2="256" stroke="${i}" stroke-width="1"/>
    <line x1="210" y1="272" x2="450" y2="272" stroke="${i}" stroke-width="1"/>
    <line x1="210" y1="288" x2="450" y2="288" stroke="${i}" stroke-width="1"/>
    <line x1="210" y1="304" x2="450" y2="304" stroke="${i}" stroke-width="1"/>

    <rect x="264" y="172" width="132" height="56" rx="10" fill="#ffffff" stroke="${a}" stroke-width="3"/>
    <text x="330" y="212" font-family="${h}" font-size="34" font-weight="900" fill="${a}" text-anchor="middle">225</text>

    <text x="196" y="206" font-family="${h}" font-size="16" font-weight="bold" fill="${i}" text-anchor="end">15 down</text>
    <text x="464" y="206" font-family="${h}" font-size="16" font-weight="bold" fill="${l}" text-anchor="start">√225 = 15</text>
  </svg>`,SQUARED_NOT_DOUBLED:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 660 226" class="w-full h-full">
    ${g(660,226)}

    <text x="330" y="32" font-family="${h}" font-size="19" font-weight="bold" fill="${a}" text-anchor="middle">The little 2 counts the fives</text>

    <rect x="46" y="66" width="256" height="76" rx="14" fill="${u}" stroke="${l}" stroke-width="3"/>
    <text x="174" y="116" font-family="${h}" font-size="30" font-weight="900" fill="${i}" text-anchor="middle">5 × 5 = 25</text>

    <rect x="358" y="66" width="256" height="76" rx="14" fill="${p}" stroke="${s}" stroke-width="3"/>
    <text x="486" y="116" font-family="${h}" font-size="30" font-weight="900" fill="${i}" text-anchor="middle">5 × 2 = 10</text>

    <text x="174" y="176" font-family="${h}" font-size="17" font-weight="bold" fill="${l}" text-anchor="middle">five squared</text>
    <text x="486" y="176" font-family="${h}" font-size="17" font-weight="bold" fill="${s}" text-anchor="middle">five doubled</text>

    <text x="330" y="210" font-family="${h}" font-size="15" font-weight="bold" fill="${i}" text-anchor="middle">Only the green one is 5².</text>
  </svg>`,CUBE_STACKS:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 660 252" class="w-full h-full">
    ${g(660,252)}

    <text x="330" y="32" font-family="${h}" font-size="19" font-weight="bold" fill="${a}" text-anchor="middle">A cube number really is a cube</text>

    ${y(110,150,1,20)}
    ${y(290,110,2,20)}
    ${y(520,70,3,20)}

    <text x="110" y="222" font-family="${h}" font-size="16" font-weight="bold" fill="${i}" text-anchor="middle">1 × 1 × 1 = 1</text>
    <text x="290" y="222" font-family="${h}" font-size="16" font-weight="bold" fill="${i}" text-anchor="middle">2 × 2 × 2 = 8</text>
    <text x="520" y="222" font-family="${h}" font-size="16" font-weight="bold" fill="${i}" text-anchor="middle">3 × 3 × 3 = 27</text>
  </svg>`,CUBE_LIST:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 660 244" class="w-full h-full">
    ${g(660,244)}

    <text x="330" y="30" font-family="${h}" font-size="19" font-weight="bold" fill="${a}" text-anchor="middle">The first six cube numbers</text>

    <text x="80" y="62" font-family="${h}" font-size="15" font-weight="bold" fill="${a}" text-anchor="middle">1</text>
    <text x="180" y="62" font-family="${h}" font-size="15" font-weight="bold" fill="${a}" text-anchor="middle">2</text>
    <text x="280" y="62" font-family="${h}" font-size="15" font-weight="bold" fill="${a}" text-anchor="middle">3</text>
    <text x="380" y="62" font-family="${h}" font-size="15" font-weight="bold" fill="${a}" text-anchor="middle">4</text>
    <text x="480" y="62" font-family="${h}" font-size="15" font-weight="bold" fill="${a}" text-anchor="middle">5</text>
    <text x="580" y="62" font-family="${h}" font-size="15" font-weight="bold" fill="${a}" text-anchor="middle">6</text>

    <rect x="34" y="82" width="92" height="52" rx="10" fill="${f}" stroke="${c}" stroke-width="2"/>
    <rect x="134" y="82" width="92" height="52" rx="10" fill="${f}" stroke="${c}" stroke-width="2"/>
    <rect x="234" y="82" width="92" height="52" rx="10" fill="${f}" stroke="${c}" stroke-width="2"/>
    <rect x="334" y="82" width="92" height="52" rx="10" fill="${f}" stroke="${c}" stroke-width="2"/>
    <rect x="434" y="82" width="92" height="52" rx="10" fill="${f}" stroke="${c}" stroke-width="2"/>
    <rect x="534" y="82" width="92" height="52" rx="10" fill="${f}" stroke="${c}" stroke-width="2"/>
    <text x="80" y="118" font-family="${h}" font-size="24" font-weight="900" fill="${i}" text-anchor="middle">1</text>
    <text x="180" y="118" font-family="${h}" font-size="24" font-weight="900" fill="${i}" text-anchor="middle">8</text>
    <text x="280" y="118" font-family="${h}" font-size="24" font-weight="900" fill="${i}" text-anchor="middle">27</text>
    <text x="380" y="118" font-family="${h}" font-size="24" font-weight="900" fill="${i}" text-anchor="middle">64</text>
    <text x="480" y="118" font-family="${h}" font-size="24" font-weight="900" fill="${i}" text-anchor="middle">125</text>
    <text x="580" y="118" font-family="${h}" font-size="24" font-weight="900" fill="${i}" text-anchor="middle">216</text>

    <text x="330" y="160" font-family="${h}" font-size="14" font-weight="bold" fill="${o}" text-anchor="middle">and one more that turns up everywhere</text>

    <rect x="150" y="180" width="360" height="50" rx="12" fill="${u}" stroke="${l}" stroke-width="2.5"/>
    <text x="330" y="214" font-family="${h}" font-size="24" font-weight="900" fill="${i}" text-anchor="middle">10 × 10 × 10 = 1000</text>
  </svg>`,CUBE_ROOT_BOTH_WAYS:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 660 250" class="w-full h-full">
    ${g(660,250)}${_}

    <text x="330" y="32" font-family="${h}" font-size="19" font-weight="bold" fill="${a}" text-anchor="middle">Cubing goes out. Cube rooting comes back.</text>

    <rect x="50" y="86" width="160" height="76" rx="14" fill="${u}" stroke="${l}" stroke-width="3"/>
    <text x="130" y="140" font-family="${h}" font-size="42" font-weight="900" fill="${i}" text-anchor="middle">5</text>

    <rect x="450" y="86" width="160" height="76" rx="14" fill="${d}" stroke="${a}" stroke-width="3"/>
    <text x="530" y="140" font-family="${h}" font-size="42" font-weight="900" fill="${i}" text-anchor="middle">125</text>

    <path d="M 214 106 C 280 68, 380 68, 444 104" fill="none" stroke="${c}" stroke-width="3" marker-end="url(#m6-blue)"/>
    <text x="330" y="70" font-family="${h}" font-size="16" font-weight="bold" fill="${c}" text-anchor="middle">5 × 5 × 5</text>

    <path d="M 446 144 C 380 182, 280 182, 216 146" fill="none" stroke="${a}" stroke-width="3" marker-end="url(#m6-key)"/>
    <text x="330" y="202" font-family="${h}" font-size="16" font-weight="bold" fill="${a}" text-anchor="middle">³√125</text>

    <text x="330" y="234" font-family="${h}" font-size="15" font-weight="bold" fill="${i}" text-anchor="middle">Same sign as before, with a small 3 on it.</text>
  </svg>`,CONSECUTIVE:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 660 244" class="w-full h-full">
    ${g(660,244)}

    <text x="330" y="30" font-family="${h}" font-size="19" font-weight="bold" fill="${a}" text-anchor="middle">Consecutive means next to each other, with nothing missed out</text>

    <text x="330" y="58" font-family="${h}" font-size="15" font-weight="bold" fill="${c}" text-anchor="middle">consecutive numbers</text>

    <rect x="116" y="80" width="76" height="50" rx="10" fill="${f}" stroke="${c}" stroke-width="2"/>
    <rect x="204" y="80" width="76" height="50" rx="10" fill="${f}" stroke="${c}" stroke-width="2"/>
    <rect x="292" y="80" width="76" height="50" rx="10" fill="${f}" stroke="${c}" stroke-width="2"/>
    <rect x="380" y="80" width="76" height="50" rx="10" fill="${f}" stroke="${c}" stroke-width="2"/>
    <rect x="468" y="80" width="76" height="50" rx="10" fill="${f}" stroke="${c}" stroke-width="2"/>
    <text x="154" y="115" font-family="${h}" font-size="24" font-weight="900" fill="${i}" text-anchor="middle">6</text>
    <text x="242" y="115" font-family="${h}" font-size="24" font-weight="900" fill="${i}" text-anchor="middle">7</text>
    <text x="330" y="115" font-family="${h}" font-size="24" font-weight="900" fill="${i}" text-anchor="middle">8</text>
    <text x="418" y="115" font-family="${h}" font-size="24" font-weight="900" fill="${i}" text-anchor="middle">9</text>
    <text x="506" y="115" font-family="${h}" font-size="24" font-weight="900" fill="${i}" text-anchor="middle">10</text>

    <text x="330" y="156" font-family="${h}" font-size="15" font-weight="bold" fill="${l}" text-anchor="middle">consecutive square numbers</text>

    <rect x="128" y="178" width="90" height="50" rx="10" fill="${u}" stroke="${l}" stroke-width="2"/>
    <rect x="232" y="178" width="90" height="50" rx="10" fill="${u}" stroke="${l}" stroke-width="2"/>
    <rect x="336" y="178" width="90" height="50" rx="10" fill="${u}" stroke="${l}" stroke-width="2"/>
    <rect x="440" y="178" width="90" height="50" rx="10" fill="${u}" stroke="${l}" stroke-width="2"/>
    <text x="173" y="213" font-family="${h}" font-size="24" font-weight="900" fill="${i}" text-anchor="middle">16</text>
    <text x="277" y="213" font-family="${h}" font-size="24" font-weight="900" fill="${i}" text-anchor="middle">25</text>
    <text x="381" y="213" font-family="${h}" font-size="24" font-weight="900" fill="${i}" text-anchor="middle">36</text>
    <text x="485" y="213" font-family="${h}" font-size="24" font-weight="900" fill="${i}" text-anchor="middle">49</text>
  </svg>`,BETWEEN_SQUARES:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 660 232" class="w-full h-full">
    ${g(660,232)}

    <text x="330" y="32" font-family="${h}" font-size="19" font-weight="bold" fill="${a}" text-anchor="middle">45 is not a square number — so trap it between two that are</text>

    <rect x="52" y="66" width="164" height="66" rx="14" fill="${u}" stroke="${l}" stroke-width="3"/>
    <text x="134" y="112" font-family="${h}" font-size="34" font-weight="900" fill="${i}" text-anchor="middle">36</text>

    <rect x="248" y="66" width="164" height="66" rx="14" fill="${m}" stroke="${o}" stroke-width="3" stroke-dasharray="8 6"/>
    <text x="330" y="112" font-family="${h}" font-size="34" font-weight="900" fill="${i}" text-anchor="middle">45</text>

    <rect x="444" y="66" width="164" height="66" rx="14" fill="${u}" stroke="${l}" stroke-width="3"/>
    <text x="526" y="112" font-family="${h}" font-size="34" font-weight="900" fill="${i}" text-anchor="middle">49</text>

    <text x="134" y="168" font-family="${h}" font-size="17" font-weight="bold" fill="${l}" text-anchor="middle">√36 = 6</text>
    <text x="330" y="168" font-family="${h}" font-size="17" font-weight="bold" fill="${o}" text-anchor="middle">√45 = ?</text>
    <text x="526" y="168" font-family="${h}" font-size="17" font-weight="bold" fill="${l}" text-anchor="middle">√49 = 7</text>

    <text x="330" y="208" font-family="${h}" font-size="16" font-weight="bold" fill="${i}" text-anchor="middle">36 &lt; 45 &lt; 49, so √45 is somewhere between 6 and 7.</text>
  </svg>`,SIXTY_FOUR_TWICE:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 660 250" class="w-full h-full">
    ${g(660,250)}

    <text x="330" y="32" font-family="${h}" font-size="19" font-weight="bold" fill="${a}" text-anchor="middle">64 answers to both names</text>

    ${v(180,190,8,16,u)}
    ${y(480,70,4,16)}

    <text x="180" y="222" font-family="${h}" font-size="17" font-weight="bold" fill="${l}" text-anchor="middle">8 × 8 = 64</text>
    <text x="480" y="222" font-family="${h}" font-size="17" font-weight="bold" fill="${c}" text-anchor="middle">4 × 4 × 4 = 64</text>
  </svg>`},x=e(t(),1),S=n(),C=`#0087a8`,w=`#5c2483`,T=`#4a8b23`,E=({children:e,className:t=``})=>(0,S.jsx)(`div`,{className:`flex-1 min-h-[210px] w-full bg-white dark:bg-slate-900 rounded-2xl sm:rounded-[2rem] border-2 border-slate-200 dark:border-slate-700 shadow-inner relative flex flex-col p-3 sm:p-4 overflow-hidden ${t}`,children:e}),D=({children:e})=>(0,S.jsx)(`div`,{className:`w-full bg-white dark:bg-slate-800 p-3 sm:p-4 rounded-2xl shadow-sm border-2 border-slate-200 dark:border-slate-700 mt-2 flex-shrink-0`,children:e}),O=[{line:`³√125 − √49`,note:`Two roots, then a subtraction. Do the roots first.`,noteVn:`Hai căn, rồi một phép trừ. Làm căn trước.`,noteFr:`Deux racines, puis une soustraction. Les racines d’abord.`},{line:`5 × 5 × 5 = 125`,note:`so ³√125 = 5`,noteVn:`nên ³√125 = 5`,noteFr:`donc ³√125 = 5`},{line:`7 × 7 = 49`,note:`so √49 = 7`,noteVn:`nên √49 = 7`,noteFr:`donc √49 = 7`},{line:`³√125 − √49 = 5 − 7`,note:`Now it is just a subtraction from 1.1.`,noteVn:`Bây giờ chỉ còn một phép trừ như bài 1.1.`,noteFr:`Il reste juste une soustraction, comme en 1.1.`},{line:`5 − 7 = −2`,note:`The answer to a root question can be negative.`,noteVn:`Đáp án của một bài về căn vẫn có thể là số âm.`,noteFr:`La réponse à une question de racines peut être négative.`}],k=({lang:e=`en`})=>{let[t,n]=(0,x.useState)(1),i=t===O.length;return(0,S.jsxs)(`div`,{className:`w-full h-full flex flex-col select-none`,children:[(0,S.jsxs)(E,{children:[(0,S.jsxs)(`div`,{className:`flex items-center justify-between mb-2`,children:[(0,S.jsx)(`span`,{className:`text-[10px] font-black uppercase tracking-[0.2em] text-slate-400`,children:r(e,`Worked example`,`Ví dụ mẫu`,`Exemple`)}),(0,S.jsxs)(`span`,{className:`font-mono font-black text-xs text-slate-400 tabular-nums`,children:[t,`/`,O.length]})]}),(0,S.jsxs)(`div`,{className:`flex-1 min-h-0 flex flex-col gap-1.5 justify-center`,children:[O.slice(0,t-1).map(e=>(0,S.jsxs)(`div`,{className:`flex items-baseline gap-2 px-2 opacity-50`,children:[(0,S.jsx)(`span`,{className:`text-slate-400 font-black text-xs`,children:`✓`}),(0,S.jsx)(`span`,{className:`font-black tabular-nums text-sm sm:text-base text-slate-500 dark:text-slate-400`,children:e.line})]},e.line)),(()=>{let n=O[t-1],i=t===O.length?T:t===1?C:w;return(0,S.jsxs)(`div`,{className:`rounded-xl border-2 px-3 py-2 animate-in fade-in duration-300`,style:{borderColor:i,backgroundColor:`${i}12`},children:[(0,S.jsx)(`p`,{className:`font-black tabular-nums leading-none text-2xl sm:text-3xl`,style:{color:i},children:n.line}),(0,S.jsx)(`p`,{className:`text-[11px] sm:text-xs font-bold text-slate-600 dark:text-slate-300 leading-snug mt-1`,children:r(e,n.note,n.noteVn,n.noteFr)})]})})()]})]}),(0,S.jsx)(D,{children:(0,S.jsxs)(`div`,{className:`flex items-center gap-2`,children:[(0,S.jsx)(`button`,{onClick:()=>n(Math.max(1,t-1)),disabled:t===1,className:`px-3 py-2.5 rounded-xl font-black text-xs uppercase tracking-widest border-2 border-slate-200 dark:border-slate-600 text-slate-500 disabled:opacity-30 active:scale-95`,children:r(e,`Back`,`Lùi`,`Retour`)}),(0,S.jsx)(`button`,{onClick:()=>n(i?1:t+1),className:`flex-1 py-2.5 rounded-xl font-black text-sm uppercase tracking-widest text-white border-2 active:scale-95 transition-all`,style:{backgroundColor:i?w:C,borderColor:i?w:C},children:i?r(e,`Start again`,`Làm lại`,`Recommencer`):r(e,`Next line`,`Dòng tiếp theo`,`Ligne suivante`)})]})})]})},A=`/assets/chessboard-aXFzZzcb.jpg`,j=`/assets/sugarcubes-CzsqviIQ.jpg`,M=`/assets/cubemelon-YHhgoINv.jpg`,N=`#0087a8`,P=`#5c2483`,F=`#c25e12`,I=`#4a8b23`,L=`#c8102e`,R={meta:{course:`y7-math`,unit:`1.6`,id:`U01_6`,title:`Square Roots & Cube Roots`,objective:`Square and cube a number, find square roots and cube roots from a learned list, and know that rooting is squaring or cubing run backwards — one idea, taught twice — plus the word "consecutive", which the exercise uses without ever explaining it.`,order:6,french:!0,dashboard:{track:`Y7_MATH`,unit:`U01_6`}},slides:[{layout:`hero`,color:P,icon:`Boxes`,brand:`Year 7 Mathematics`,brandVn:`Toán Lớp 7`,brandFr:`Maths 7e année`,eyebrow:`Unit 1 · 1.6`,eyebrowVn:`Chương 1 · 1.6`,eyebrowFr:`Unité 1 · 1.6`,date:`24 Aug 2026`,title:`Square Roots and Cube Roots`,titleVn:`Căn bậc hai và căn bậc ba`,titleFr:`Racines carrées et racines cubiques`,card:{icon:`Pencil`,badge:`Starter Task`,badgeVn:`Nhiệm vụ khởi động`,badgeFr:`Pour commencer`,text:`No calculators. Work out **7 × 7**, then **2 × 2 × 2**. Both answers go on your whiteboard.`,textVn:`Không dùng máy tính. Tính **7 × 7**, rồi **2 × 2 × 2**. Viết cả hai đáp án lên bảng con.`,textFr:`Sans calculatrice. Calcule **7 × 7**, puis **2 × 2 × 2**. Écris les deux réponses sur ton ardoise.`}},{layout:`statement`,accent:N,eyebrow:`In pairs — no calculators, two minutes`,eyebrowVn:`Theo cặp — không máy tính, hai phút`,eyebrowFr:`À deux — sans calculatrice, deux minutes`,title:`Mr Bowen’s Patio`,titleVn:`Sân gạch của thầy Bowen`,titleFr:`La terrasse de M. Bowen`,label:`Guess`,labelVn:`Hãy đoán`,labelFr:`Devine`,labelIcon:`MessageSquare`,text:`**225 stones**`,textVn:`**225 viên gạch**`,textFr:`**225 pavés**`,sub:`They are laid in a **perfect square**. How many stones run along one side?`,subVn:`Chúng được lát thành một **hình vuông hoàn hảo**. Mỗi cạnh có bao nhiêu viên gạch?`,subFr:`Ils forment un **carré parfait**. Combien de pavés y a-t-il sur un côté\xA0?`,content:`> Write one number on your whiteboard. Guessing is fine.`,contentVn:`> Hãy viết một con số lên bảng con. Đoán cũng được.`,contentFr:`> Écris un nombre sur ton ardoise. Tu peux deviner.`},{layout:`split`,accent:F,icon:`Grid3x3`,side:`left`,eyebrow:`Before any maths`,eyebrowVn:`Trước khi làm toán`,eyebrowFr:`Avant les maths`,title:`Count the Squares`,titleVn:`Đếm các ô vuông`,titleFr:`Compte les cases`,ratio:45,image:A,content:`Eight squares along the top. Eight squares down the side.

How many squares on the whole board — and how did you get there without counting them one by one?`,contentVn:`Tám ô dọc theo cạnh trên. Tám ô dọc theo cạnh bên.

Cả bàn cờ có bao nhiêu ô — và em tính ra bằng cách nào mà không phải đếm từng ô một?`,contentFr:`Huit cases en haut. Huit cases sur le côté.

Combien de cases sur tout l’échiquier — et comment as-tu trouvé sans les compter une par une\xA0?`,reveal:{label:`Show me`,labelVn:`Cho em xem`,labelFr:`Montre-moi`,answer:`**64**, because $8 × 8 = 64$. You multiplied the side by itself. That is the whole idea of this lesson.`,answerVn:`**64**, vì $8 × 8 = 64$. Em đã lấy cạnh nhân với chính nó. Đó chính là ý tưởng của cả bài học này.`,answerFr:`**64**, car $8 × 8 = 64$. Tu as multiplié le côté par lui-même. C’est toute l’idée de cette leçon.`}},{layout:`split`,accent:N,icon:`BookOpen`,eyebrow:`Key word`,eyebrowVn:`Từ khoá`,eyebrowFr:`Mot clé`,title:`Square Number`,titleVn:`Số chính phương`,titleFr:`Nombre carré`,ratio:45,inlineSvg:b.SQUARE_TILES,content:`The word came from the picture. Multiply a number by itself and the tiles make a square.`,contentVn:`Tên gọi này đến từ hình vẽ. Nhân một số với chính nó, các viên gạch sẽ xếp thành hình vuông.`,contentFr:`Le mot vient du dessin. Multiplie un nombre par lui-même et les carreaux forment un carré.`,notes:[{tone:`write`,text:`**Square number:** what you get when a number is multiplied by itself.
$5^2 = 5 × 5 = 25$ — say it as **five squared**.`,textVn:`**Số chính phương (square number):** kết quả khi một số được nhân với chính nó.
$5^2 = 5 × 5 = 25$ — đọc là **five squared** (5 bình phương).`,textFr:`**Nombre carré (square number)\xA0:** ce qu’on obtient quand on multiplie un nombre par lui-même.
$5^2 = 5 × 5 = 25$ — on dit **five squared** (5 au carré).`}]},{layout:`split`,accent:I,icon:`Layers`,side:`left`,eyebrow:`Learn these`,eyebrowVn:`Học thuộc bảng này`,eyebrowFr:`Apprends-les`,title:`The First Twelve`,titleVn:`Mười hai số đầu tiên`,titleFr:`Les douze premiers`,ratio:45,inlineSvg:b.SQUARE_LIST,content:`Every question in Exercise 1.6 is quicker if these are already in your head.`,contentVn:`Mọi câu trong Bài tập 1.6 sẽ nhanh hơn nhiều nếu em đã thuộc bảng này.`,contentFr:`Chaque question de l’exercice 1.6 va plus vite si tu les connais déjà par cœur.`,notes:[{tone:`write`,text:`Copy the twelve square numbers: **1, 4, 9, 16, 25, 36, 49, 64, 81, 100, 121, 144**.`,textVn:`Chép lại mười hai số chính phương: **1, 4, 9, 16, 25, 36, 49, 64, 81, 100, 121, 144**.`,textFr:`Recopie les douze nombres carrés\xA0: **1, 4, 9, 16, 25, 36, 49, 64, 81, 100, 121, 144**.`}]},{layout:`split`,accent:L,icon:`Equal`,eyebrow:`Quick question`,eyebrowVn:`Câu hỏi nhanh`,eyebrowFr:`Question rapide`,title:`Which One Is 5²?`,titleVn:`Cái nào là 5²?`,titleFr:`Lequel est 5²\xA0?`,ratio:45,inlineSvg:b.SQUARED_NOT_DOUBLED,content:`Both of these use a 5 and a 2. Only one of them is **five squared**.`,contentVn:`Cả hai đều dùng số 5 và số 2. Nhưng chỉ một trong hai là **năm bình phương**.`,contentFr:`Les deux utilisent un 5 et un 2. Un seul est **cinq au carré**.`,reveal:{label:`Say it out loud first`,labelVn:`Hãy nói to trước đã`,labelFr:`Dis-le d’abord à voix haute`,answer:`$5^2 = 25$. The small 2 says **how many fives to multiply**, not what to multiply by.`,answerVn:`$5^2 = 25$. Số 2 nhỏ cho biết **có bao nhiêu số 5 được nhân với nhau**, chứ không phải nhân với 2.`,answerFr:`$5^2 = 25$. Le petit 2 dit **combien de 5 on multiplie**, pas par quoi on multiplie.`}},{layout:`statement`,accent:P,eyebrow:`Same patio, harder question`,eyebrowVn:`Vẫn sân gạch đó, câu hỏi khó hơn`,eyebrowFr:`Même terrasse, question plus dure`,title:`Going Backwards`,titleVn:`Đi ngược lại`,titleFr:`En sens inverse`,label:`Discuss`,labelVn:`Thảo luận`,labelFr:`Discutez`,labelIcon:`MessageSquare`,text:`? × ? = 225`,textVn:`? × ? = 225`,textFr:`? × ? = 225`,sub:`Squaring was easy. This is the same question **turned around** — and it needs a name.`,subVn:`Bình phương thì dễ. Đây vẫn là câu hỏi đó nhưng **lật ngược lại** — và nó cần một cái tên.`,subFr:`Mettre au carré, c’était facile. C’est la même question **à l’envers** — et elle a besoin d’un nom.`},{layout:`split`,accent:N,icon:`RotateCcw`,eyebrow:`Key word`,eyebrowVn:`Từ khoá`,eyebrowFr:`Mot clé`,title:`Square Root`,titleVn:`Căn bậc hai`,titleFr:`Racine carrée`,ratio:45,inlineSvg:b.ROOT_BOTH_WAYS,content:`A **root** is where something came from — the root of a plant, the root of a word. The square root of a number is the number it was squared from.`,contentVn:`**Root** nghĩa là nơi một thứ bắt đầu — gốc của cây, gốc của một từ. Căn bậc hai của một số chính là số đã được bình phương để tạo ra nó.`,contentFr:`**Root** (racine) veut dire d’où vient une chose — la racine d’une plante, d’un mot. La racine carrée d’un nombre est le nombre qu’on a mis au carré pour l’obtenir.`,notes:[{tone:`write`,text:`**Square root:** the number that was multiplied by itself.
$\\sqrt{225} = 15$, because $15 × 15 = 225$.`,textVn:`**Căn bậc hai (square root):** số đã được nhân với chính nó.
$\\sqrt{225} = 15$, vì $15 × 15 = 225$.`,textFr:`**Racine carrée (square root)\xA0:** le nombre qui a été multiplié par lui-même.
$\\sqrt{225} = 15$, car $15 × 15 = 225$.`}]},{layout:`showcase`,accent:I,icon:`CheckCircle2`,eyebrow:`Back to the patio`,eyebrowVn:`Quay lại sân gạch`,eyebrowFr:`Retour à la terrasse`,title:`Fifteen Along Each Side`,titleVn:`Mỗi cạnh mười lăm viên`,titleFr:`Quinze sur chaque côté`,inlineSvg:b.PATIO_225,caption:`How close was your guess? Two minutes ago this was guesswork; now it is a question you can answer.`,captionVn:`Em đoán gần đúng đến đâu? Hai phút trước đây còn là đoán mò; bây giờ nó là câu hỏi em trả lời được.`,captionFr:`Ton estimation était-elle proche\xA0? Il y a deux minutes, tu devinais\xA0; maintenant, tu sais répondre.`},{layout:`split`,accent:F,icon:`Box`,side:`left`,eyebrow:`Before any maths`,eyebrowVn:`Trước khi làm toán`,eyebrowFr:`Avant les maths`,title:`Count the Cubes`,titleVn:`Đếm các khối lập phương`,titleFr:`Compte les cubes`,ratio:45,image:j,content:`A box is packed with sugar cubes: **4 along**, **4 across**, **4 high**.

How many cubes are in the box?`,contentVn:`Một hộp được xếp đầy đường viên: **4 viên chiều dài**, **4 viên chiều rộng**, **4 viên chiều cao**.

Trong hộp có bao nhiêu viên?`,contentFr:`Une boîte est remplie de sucres\xA0: **4 en longueur**, **4 en largeur**, **4 en hauteur**.

Combien de cubes y a-t-il dans la boîte\xA0?`,reveal:{label:`Show me`,labelVn:`Cho em xem`,labelFr:`Montre-moi`,answer:`$4 × 4 × 4 = 64$. Same idea as the chessboard, with one more direction to fill.`,answerVn:`$4 × 4 × 4 = 64$. Cùng ý tưởng với bàn cờ, chỉ thêm một chiều nữa phải lấp đầy.`,answerFr:`$4 × 4 × 4 = 64$. Même idée que l’échiquier, avec une direction de plus à remplir.`}},{layout:`split`,accent:N,icon:`Boxes`,eyebrow:`Key word`,eyebrowVn:`Từ khoá`,eyebrowFr:`Mot clé`,title:`Cube Number`,titleVn:`Số lập phương`,titleFr:`Nombre cubique`,ratio:45,inlineSvg:b.CUBE_STACKS,content:`Again the word came from the picture. Three of the same number, multiplied together, build a cube.`,contentVn:`Một lần nữa, tên gọi đến từ hình vẽ. Ba số giống nhau nhân với nhau sẽ dựng thành một khối lập phương.`,contentFr:`Là encore, le mot vient du dessin. Trois fois le même nombre, multipliés ensemble, forment un cube.`,notes:[{tone:`write`,text:`**Cube number:** what you get when a number is multiplied by itself **twice**.
$2^3 = 2 × 2 × 2 = 8$ — say it as **two cubed**.`,textVn:`**Số lập phương (cube number):** kết quả khi một số được nhân với chính nó **hai lần**.
$2^3 = 2 × 2 × 2 = 8$ — đọc là **two cubed** (2 lập phương).`,textFr:`**Nombre cubique (cube number)\xA0:** ce qu’on obtient quand on multiplie un nombre par lui-même **deux fois**.
$2^3 = 2 × 2 × 2 = 8$ — on dit **two cubed** (2 au cube).`}]},{layout:`split`,accent:I,icon:`Layers`,side:`left`,eyebrow:`Learn these too`,eyebrowVn:`Cũng học thuộc bảng này`,eyebrowFr:`Apprends-les aussi`,title:`Only Six to Know`,titleVn:`Chỉ cần thuộc sáu số`,titleFr:`Seulement six à savoir`,ratio:45,inlineSvg:b.CUBE_LIST,content:`Cube numbers grow fast, so the list you need is short.`,contentVn:`Số lập phương tăng rất nhanh, nên bảng em cần thuộc khá ngắn.`,contentFr:`Les nombres cubiques grandissent vite, donc la liste est courte.`,notes:[{tone:`write`,text:`Copy the six cube numbers: **1, 8, 27, 64, 125, 216** — and **1000**, because $10 × 10 × 10 = 1000$.`,textVn:`Chép lại sáu số lập phương: **1, 8, 27, 64, 125, 216** — và **1000**, vì $10 × 10 × 10 = 1000$.`,textFr:`Recopie les six nombres cubiques\xA0: **1, 8, 27, 64, 125, 216** — et **1000**, car $10 × 10 × 10 = 1000$.`}]},{layout:`split`,accent:N,icon:`RotateCcw`,eyebrow:`Key word`,eyebrowVn:`Từ khoá`,eyebrowFr:`Mot clé`,title:`Cube Root`,titleVn:`Căn bậc ba`,titleFr:`Racine cubique`,ratio:45,inlineSvg:b.CUBE_ROOT_BOTH_WAYS,content:`This is not a new idea. It is the picture you drew four slides ago, with a small **3** written on the sign.`,contentVn:`Đây không phải ý tưởng mới. Vẫn là hình em đã vẽ bốn trang trước, chỉ thêm số **3** nhỏ trên dấu căn.`,contentFr:`Ce n’est pas une idée nouvelle. C’est le dessin d’il y a quatre diapos, avec un petit **3** sur le symbole.`,notes:[{tone:`write`,text:`**Cube root:** the number that was multiplied by itself twice.
$\\sqrt[3]{125} = 5$, because $5 × 5 × 5 = 125$.`,textVn:`**Căn bậc ba (cube root):** số đã được nhân với chính nó hai lần.
$\\sqrt[3]{125} = 5$, vì $5 × 5 × 5 = 125$.`,textFr:`**Racine cubique (cube root)\xA0:** le nombre qui a été multiplié par lui-même deux fois.
$\\sqrt[3]{125} = 5$, car $5 × 5 × 5 = 125$.`}]},{layout:`split`,accent:P,icon:`Calculator`,side:`left`,eyebrow:`Worked example 1.6, from the book`,eyebrowVn:`Ví dụ mẫu 1.6, trong sách`,eyebrowFr:`Exemple 1.6, tiré du livre`,title:`One Line at a Time`,titleVn:`Từng dòng một`,titleFr:`Une ligne à la fois`,ratio:45,content:`Do each line on paper **before** Mr Bowen presses the button.`,contentVn:`Hãy làm từng dòng ra giấy **trước khi** thầy Bowen bấm nút.`,contentFr:`Fais chaque ligne sur papier **avant** que M. Bowen appuie sur le bouton.`,notes:[{tone:`task`,badge:`On your whiteboard`,badgeVn:`Trên bảng con`,badgeFr:`Sur ton ardoise`,text:`Roots first, subtraction last.`,textVn:`Tính căn trước, phép trừ sau cùng.`,textFr:`Les racines d’abord, la soustraction à la fin.`}],widget:k},{layout:`split`,accent:F,icon:`Equal`,eyebrow:`Every class is an English class`,eyebrowVn:`Mỗi tiết học đều là tiết tiếng Anh`,eyebrowFr:`Chaque cours est un cours d’anglais`,title:`Consecutive`,titleVn:`Consecutive — Liên tiếp`,titleFr:`Consecutive — Consécutif`,ratio:45,inlineSvg:b.CONSECUTIVE,content:`The exercise uses this word without explaining it. **Consecutive square numbers** are next to each other **in the list of squares** — not one apart.`,contentVn:`Bài tập dùng từ này mà không giải thích. **Consecutive square numbers** là các số chính phương đứng cạnh nhau **trong bảng bình phương** — chứ không phải hơn kém nhau 1 đơn vị.`,contentFr:`L’exercice utilise ce mot sans l’expliquer. Les **consecutive square numbers** se suivent **dans la liste des carrés** — ils n’ont pas 1 d’écart.`,notes:[{tone:`write`,text:`**Consecutive:** one after another, with nothing missed out. 25 and 36 are consecutive square numbers.`,textVn:`**Liên tiếp (consecutive):** cái này nối tiếp cái kia, không bỏ sót cái nào. 25 và 36 là hai số chính phương liên tiếp.`,textFr:`**Consécutifs (consecutive)\xA0:** l’un après l’autre, sans en sauter. 25 et 36 sont des nombres carrés consécutifs.`}]},{layout:`split`,accent:N,icon:`Target`,side:`left`,eyebrow:`Problem 1`,eyebrowVn:`Bài 1`,eyebrowFr:`Problème 1`,title:`Trap the Root`,titleVn:`Kẹp căn lại`,titleFr:`Coince la racine`,ratio:45,inlineSvg:b.BETWEEN_SQUARES,content:`45 is not in your list of squares, so $\\sqrt{45}$ is not a whole number.

Which **two whole numbers** is it between?`,contentVn:`45 không nằm trong bảng số chính phương, nên $\\sqrt{45}$ không phải số nguyên.

Nó nằm giữa **hai số nguyên** nào?`,contentFr:`45 n’est pas dans ta liste de carrés, donc $\\sqrt{45}$ n’est pas un nombre entier.

Entre quels **deux nombres entiers** se trouve-t-il\xA0?`,reveal:{label:`Check your answer`,labelVn:`Kiểm tra đáp án`,labelFr:`Vérifie ta réponse`,answer:`Between **6 and 7**. 45 sits between 36 and 49, so its root sits between $\\sqrt{36}$ and $\\sqrt{49}$.`,answerVn:`Nằm giữa **6 và 7**. Vì 45 nằm giữa 36 và 49, nên căn của nó nằm giữa $\\sqrt{36}$ và $\\sqrt{49}$.`,answerFr:`Entre **6 et 7**. 45 est entre 36 et 49, donc sa racine est entre $\\sqrt{36}$ et $\\sqrt{49}$.`}},{layout:`split`,accent:P,icon:`Sparkles`,eyebrow:`Problem 2`,eyebrowVn:`Bài 2`,eyebrowFr:`Problème 2`,title:`Mr Bowen’s Number`,titleVn:`Con số của thầy Bowen`,titleFr:`Le nombre de M. Bowen`,ratio:55,content:`Mr Bowen is thinking of a number.

> It is between **100 and 200**.
> Its **square root** is a multiple of **3**.

What is his number?`,contentVn:`Thầy Bowen đang nghĩ đến một con số.

> Nó nằm giữa **100 và 200**.
> **Căn bậc hai** của nó là bội số của **3**.

Con số đó là bao nhiêu?`,contentFr:`M. Bowen pense à un nombre.

> Il est entre **100 et 200**.
> Sa **racine carrée** est un multiple de **3**.

Quel est son nombre\xA0?`,reveal:{label:`Check your answer`,labelVn:`Kiểm tra đáp án`,labelFr:`Vérifie ta réponse`,answer:`**144.** The squares between 100 and 200 are 121, 144, 169 and 196. Their roots are 11, 12, 13 and 14 — and only 12 is a multiple of 3.`,answerVn:`**144.** Các số chính phương giữa 100 và 200 là 121, 144, 169 và 196. Căn của chúng là 11, 12, 13 và 14 — và chỉ có 12 là bội số của 3.`,answerFr:`**144.** Les carrés entre 100 et 200 sont 121, 144, 169 et 196. Leurs racines sont 11, 12, 13 et 14 — et seul 12 est un multiple de 3.`}},{layout:`split`,accent:I,icon:`Sparkles`,side:`left`,eyebrow:`Problem 3`,eyebrowVn:`Bài 3`,eyebrowFr:`Problème 3`,title:`One Number, Two Names`,titleVn:`Một con số, hai tên gọi`,titleFr:`Un nombre, deux noms`,ratio:45,inlineSvg:b.SIXTY_FOUR_TWICE,content:`**64** is on your list of squares. It is also on your list of cubes.

Which two multiplications put it on both lists?`,contentVn:`**64** có trong bảng số chính phương của em. Nó cũng có trong bảng số lập phương.

Hai phép nhân nào đã đưa nó vào cả hai bảng?`,contentFr:`**64** est dans ta liste de carrés. Il est aussi dans ta liste de cubes.

Quelles deux multiplications le mettent dans les deux listes\xA0?`,reveal:{label:`Check your answer`,labelVn:`Kiểm tra đáp án`,labelFr:`Vérifie ta réponse`,answer:`$8 × 8 = 64$ and $4 × 4 × 4 = 64$. So $\\sqrt{64} = 8$ and $\\sqrt[3]{64} = 4$.`,answerVn:`$8 × 8 = 64$ và $4 × 4 × 4 = 64$. Vậy $\\sqrt{64} = 8$ và $\\sqrt[3]{64} = 4$.`,answerFr:`$8 × 8 = 64$ et $4 × 4 × 4 = 64$. Donc $\\sqrt{64} = 8$ et $\\sqrt[3]{64} = 4$.`}},{layout:`split`,accent:N,icon:`Boxes`,eyebrow:`Problem 4`,eyebrowVn:`Bài 4`,eyebrowFr:`Problème 4`,title:`The Cube Watermelons`,titleVn:`Những quả dưa hấu lập phương`,titleFr:`Les pastèques cubiques`,ratio:55,side:`left`,image:M,content:`Mr Bowen grows **cube watermelons**. They stack better.

A crate holds **3 along, 3 across and 3 high**. How many watermelons fit in one crate?`,contentVn:`Thầy Bowen trồng **dưa hấu hình lập phương**. Xếp chồng dễ hơn.

Một thùng chứa **3 quả chiều dài, 3 quả chiều rộng và 3 quả chiều cao**. Một thùng chứa được bao nhiêu quả dưa?`,contentFr:`M. Bowen fait pousser des **pastèques cubiques**. Elles s’empilent mieux.

Une caisse en contient **3 en longueur, 3 en largeur et 3 en hauteur**. Combien de pastèques tiennent dans une caisse\xA0?`,reveal:{label:`Check your answer`,labelVn:`Kiểm tra đáp án`,labelFr:`Vérifie ta réponse`,answer:`$3 × 3 × 3 = 27$ watermelons. They are real — Japanese farmers grow them inside glass boxes.`,answerVn:`$3 × 3 × 3 = 27$ quả dưa. Loại dưa này có thật — nông dân Nhật Bản trồng chúng trong hộp kính.`,answerFr:`$3 × 3 × 3 = 27$ pastèques. Elles existent vraiment — des agriculteurs japonais les font pousser dans des boîtes en verre.`}},{layout:`split`,accent:N,icon:`Grid3x3`,eyebrow:`Problem 5`,eyebrowVn:`Bài 5`,eyebrowFr:`Problème 5`,title:`The Bathroom Wall`,titleVn:`Bức tường phòng tắm`,titleFr:`Le mur de la salle de bains`,ratio:55,content:`Mr Bowen tiles one bathroom wall with **576 square tiles**, in a perfect square.

How many tiles run along the bottom? Your list of squares will get you there.`,contentVn:`Thầy Bowen lát một bức tường phòng tắm bằng **576 viên gạch vuông**, thành một hình vuông hoàn hảo.

Cạnh dưới có bao nhiêu viên gạch? Bảng số chính phương của em sẽ giúp em tìm ra.`,contentFr:`M. Bowen carrelle un mur de la salle de bains avec **576 carreaux carrés**, en un carré parfait.

Combien de carreaux y a-t-il en bas\xA0? Ta liste de carrés t’aidera.`,reveal:{label:`Check your answer`,labelVn:`Kiểm tra đáp án`,labelFr:`Vérifie ta réponse`,answer:`**24.** 576 is past the end of your list, so trap it: $20 × 20 = 400$ and $25 × 25 = 625$. The side is between 20 and 25, and $24 × 24 = 576$. Mr Bowen has three walls still to do.`,answerVn:`**24.** 576 nằm ngoài bảng của em, nên hãy kẹp nó lại: $20 × 20 = 400$ và $25 × 25 = 625$. Cạnh nằm giữa 20 và 25, và $24 × 24 = 576$. Thầy Bowen vẫn còn ba bức tường nữa phải lát.`,answerFr:`**24.** 576 est après la fin de ta liste, alors coince-le\xA0: $20 × 20 = 400$ et $25 × 25 = 625$. Le côté est entre 20 et 25, et $24 × 24 = 576$. M. Bowen a encore trois murs à faire.`}},{layout:`stack`,variant:`checklist`,accent:N,icon:`CheckCircle2`,columns:2,eyebrow:`Before you leave`,eyebrowVn:`Trước khi ra về`,eyebrowFr:`Avant de partir`,title:`Can You Do All Four?`,titleVn:`Em làm được cả bốn điều này chứ?`,titleFr:`Sais-tu faire les quatre\xA0?`,content:`> Your notebook should now have **5 key words** and **2 lists** — twelve square numbers and six cube numbers. Check that none is missing.`,contentVn:`> Trong vở của em bây giờ phải có **5 từ khoá** và **2 bảng số** — mười hai số chính phương và sáu số lập phương. Hãy kiểm tra xem có thiếu cái nào không.`,contentFr:`> Ton cahier doit maintenant avoir **5 mots clés** et **2 listes** — douze nombres carrés et six nombres cubiques. Vérifie qu’il n’en manque aucun.`,items:[{text:`Say what a **square number** and a **cube number** are, and read $7^2$ and $2^3$ out loud.`,textVn:`Nói được **số chính phương** và **số lập phương** là gì, và đọc to $7^2$ và $2^3$.`,textFr:`Dire ce qu’est un **nombre carré** et un **nombre cubique**, et lire $7^2$ et $2^3$ à voix haute.`},{text:`Work out a **square root** and a **cube root** from the lists in your notebook.`,textVn:`Tính được **căn bậc hai** và **căn bậc ba** bằng hai bảng số trong vở.`,textFr:`Trouver une **racine carrée** et une **racine cubique** avec les listes de ton cahier.`},{text:`Trap a root between **two whole numbers**, the way you did with $\\sqrt{45}$.`,textVn:`Kẹp một căn giữa **hai số nguyên**, như em đã làm với $\\sqrt{45}$.`,textFr:`Coincer une racine entre **deux nombres entiers**, comme avec $\\sqrt{45}$.`},{text:`Use the word **consecutive** correctly about numbers.`,textVn:`Dùng đúng từ **consecutive (liên tiếp)** khi nói về các con số.`,textFr:`Utiliser correctement le mot **consecutive (consécutif)** pour des nombres.`}]},{layout:`callout`,accent:L,icon:`Home`,eyebrow:`Homework Assignment`,eyebrowVn:`Bài tập về nhà`,eyebrowFr:`Devoirs`,title:`For Next Lesson`,titleVn:`Cho tiết học sau`,titleFr:`Pour la prochaine leçon`,content:`Your two lists are the tool. Keep the notebook open beside you — copying from your own list is not cheating.`,contentVn:`Hai bảng số của em chính là công cụ. Hãy để vở mở bên cạnh — nhìn vào bảng của chính mình không phải là gian lận.`,contentFr:`Tes deux listes sont ton outil. Garde ton cahier ouvert à côté de toi — copier ta propre liste, ce n’est pas tricher.`,notes:[{tone:`homework`,badge:`Section 1.6 · pages 17–19`,badgeVn:`Mục 1.6 · trang 17–19`,badgeFr:`Section 1.6 · pages 17–19`,icon:`Pencil`,text:`**Focus** — Q1 to 5. Everybody.
**Practice** — Q6 to 11.
**Challenge** — Q12 to 16. An attempt beats a blank.`,textVn:`**Focus** — câu 1 đến 5. Tất cả các em.
**Practice** — câu 6 đến 11.
**Challenge** — câu 12 đến 16. Làm sai vẫn hơn bỏ trống.`,textFr:`**Focus** — Q1 à 5. Tout le monde.
**Practice** — Q6 à 11.
**Challenge** — Q12 à 16. Un essai vaut mieux qu’une page blanche.`}]},{layout:`hero`,color:N,icon:`CheckCircle2`,brand:`Year 7 Mathematics`,brandVn:`Toán Lớp 7`,brandFr:`Maths 7e année`,title:`Lesson Complete!`,titleVn:`Hoàn thành bài học!`,titleFr:`Leçon terminée\xA0!`,subtitle:`One idea, learned twice: squaring goes out, rooting comes back. Exit question: **what is $\\sqrt{81} + \\sqrt[3]{8}$?**`,subtitleVn:`Một ý tưởng, học hai lần: bình phương đi ra, khai căn đi về. Câu hỏi ra về: **$\\sqrt{81} + \\sqrt[3]{8}$ bằng bao nhiêu?**`,subtitleFr:`Une idée, apprise deux fois\xA0: le carré part, la racine revient. Question de sortie\xA0: **combien fait $\\sqrt{81} + \\sqrt[3]{8}$\xA0?**`}],plan:{duration:`50 minutes`,objective:`Students can square and cube a number and read the notation out loud, can find a square root and a cube root from the two lists in their notebook, know that squaring and square rooting undo each other — and that cubing and cube rooting are the same idea one dimension up, not a second thing to memorise — can trap a root that is not whole between two consecutive whole numbers, and can use the word "consecutive" correctly, which Exercise 1.6 assumes without explaining.`,materials:[`Projector / TV for the lesson deck`,`Mini whiteboards + markers (one per pair)`,`Student notebooks`,`Learner’s Book Section 1.6 (pages 17–19) for the homework`],vocab:[{term:`Square number`,def:`a number multiplied by itself. 5 squared, written 5², is 25 (Vietnamese: số chính phương)`},{term:`Square root`,def:`the number that was multiplied by itself. The square root of 225 is 15 (Vietnamese: căn bậc hai)`},{term:`Cube number`,def:`a number multiplied by itself twice. 2 cubed, written 2³, is 8 (Vietnamese: số lập phương)`},{term:`Cube root`,def:`the number that was multiplied by itself twice. The cube root of 125 is 5 (Vietnamese: căn bậc ba)`},{term:`Consecutive`,def:`one after another with nothing missed out. The book's fifth key word, and the one the exercise uses without ever defining`},{term:`Squared / cubed`,def:`the spoken forms. Students who only ever see the notation cannot answer a question read aloud, so drill saying them`}],timeline:[{time:`0–4 min`,phase:`Starter`,detail:`Title slide. 7 × 7 and 2 × 2 × 2 on whiteboards. Both answers, 49 and 8, are on the two lists they are about to copy — point that out when the lists arrive.`},{time:`4–8 min`,phase:`The hook`,detail:`Slide 2, QUESTION ONLY: 225 paving stones in a perfect square, how many along one side? One number per whiteboard, guesses only. Note the guesses on the board. Do NOT work it out — the class has no tool for it yet, which is the point. It is paid off on slide 9.`},{time:`8–13 min`,phase:`Squares, from the shape`,detail:`Slide 3: the chessboard, 8 × 8 = 64, before the word "square number" exists. Then slide 4 defines it and slide 5 is the list of twelve. Both copied. Give them a full minute to write the twelve — it is the tool for the rest of the lesson and for the homework.`},{time:`13–16 min`,phase:`The one that costs marks`,detail:`Slide 6: 5² against 5 × 2. Ask for the answer out loud before opening the reveal. Every year some of the class reads the small 2 as "times two", and it is much cheaper to catch here than in the exercise.`},{time:`16–24 min`,phase:`Backwards — the square root`,detail:`Slide 7 turns the question round: ? × ? = 225. Slide 8 names it and draws the there-and-back picture; copied. Say the English out loud: a root is where something came from, like the root of a plant. Then slide 9 is the payoff — the patio really is 15 by 15. Ask whose guess was closest.`},{time:`24–33 min`,phase:`Cubes — the same journey again`,detail:`Slides 10 to 13 run in exactly the same order as slides 3 to 8: sugar cubes first, then the definition, then the short list, then the cube root. Say explicitly that this is the same idea with one more direction, so it lands as familiar rather than as a fifth thing to learn. Three copy-down panels here.`},{time:`33–37 min`,phase:`Worked example widget`,detail:`Slide 14, the book's own Worked example 1.6. Five lines, one per press. Everyone works each line on paper first. The last line, 5 − 7 = −2, is the one to slow down on — the class will not expect a root question to have a negative answer.`},{time:`37–40 min`,phase:`Consecutive`,detail:`Slide 15. Copied. Consecutive numbers are obvious; consecutive SQUARE numbers is the bit they get wrong, because 25 and 36 are consecutive squares while being 11 apart. Exercise questions 14 and 15 are unanswerable without this.`},{time:`40–47 min`,phase:`Problems`,detail:`Trap the root (√45 between 6 and 7) · Mr Bowen's number (144) · 64 on both lists. Then the two word problems: the cube watermelons and the bathroom wall. If you are behind, drop the bathroom wall — it is the hardest and the least necessary.`},{time:`47–50 min`,phase:`Recap + homework`,detail:`Four-point checklist and the copy-count: 5 key words, 2 lists. Set Section 1.6, pages 17–19. Exit question: √81 + ∛8, which is 9 + 2 = 11.`}],answers:[{q:`Starter — 7 × 7 and 2 × 2 × 2`,a:`49 and 8. Both appear again on the lists the class copies later in the lesson.`},{q:`Hook — 225 stones in a perfect square, how many along one side?`,a:`15, because 15 × 15 = 225. Do not reveal this before slide 9.`},{q:`Slide 3 — how many squares on a chessboard?`,a:`64, from 8 × 8. The answer matters less than the method: they multiplied the side by itself without being told to.`},{q:`Slide 6 — which one is 5²?`,a:`5 × 5 = 25. The other is 5 × 2 = 10, which is five doubled. The small 2 counts the fives.`},{q:`Slide 10 — sugar cubes, 4 along each edge`,a:`4 × 4 × 4 = 64. Worth noticing out loud that 64 has now appeared as a square number and as a cube number — slide 18 comes back to it.`},{q:`Widget — the book's Worked example 1.6`,a:`5 × 5 × 5 = 125 so the cube root of 125 is 5. 7 × 7 = 49 so the square root of 49 is 7. Then 5 − 7 = −2.`},{q:`Problem 1 — which two whole numbers is √45 between?`,a:`6 and 7. 36 < 45 < 49, and the squares either side have roots 6 and 7. (√45 is about 6.7, but the class is not asked for that.)`},{q:`Problem 2 — Mr Bowen's number`,a:`144. The square numbers between 100 and 200 are 121, 144, 169 and 196; their roots are 11, 12, 13 and 14, and only 12 is a multiple of 3.`},{q:`Problem 3 — why is 64 on both lists?`,a:`8 × 8 = 64 and 4 × 4 × 4 = 64. So the square root of 64 is 8 and the cube root of 64 is 4. If anyone asks for another such number, it is 729 = 27² = 9³ — that is Exercise 1.6 Q16b, so do not give it away.`},{q:`Problem 4 — the cube watermelons`,a:`3 × 3 × 3 = 27. The melons are genuine: Japanese growers raise them inside glass boxes so they stack. Read the slide completely straight and do not explain the joke.`},{q:`Problem 5 — the bathroom wall`,a:`24 tiles, because 24 × 24 = 576. 576 is past the twelve they copied, so they trap it: 20² = 400 and 25² = 625, so the side is between 20 and 25, and 24² = 576.`},{q:`Exit question — √81 + ∛8`,a:`9 + 2 = 11.`}],notes:`THIS DECK IS DELIBERATELY THIN. 1.5 had to supply nine divisibility rules the book left out, so it ran dense. This section is the opposite — five key words, two short lists, and one idea taught twice — and the deck was built to match: one picture, two or three lines, at most one copy-down panel per slide. Resist adding to it in the room; the spare minutes belong to the class writing the two lists properly. THE SPINE IS "THERE AND BACK". Squaring goes out, square rooting comes back. Cubing goes out, cube rooting comes back. Slides 8 and 13 are the same drawing with different numbers on purpose, so say out loud on slide 13 that they have already seen this picture. If cube roots arrive as a separate rule, the lesson has twice as much in it as it needs. DO NOT SOLVE THE PATIO EARLY. Slide 2 is posed before the class has any tool for it, and the gap between their guess and 15 is what makes slide 9 land. Write the guesses on the board so they can be compared afterwards. THE TWO LISTS ARE THE LESSON'S REAL OUTPUT. A student who leaves with the twelve squares and the six cubes written down can do most of Exercise 1.6; a student who leaves without them cannot start it. Give real time to slides 5 and 12 and walk the room. THE PREDICTABLE ERROR is reading 5² as 5 × 2. Slide 6 exists only for that, and it is worth asking two or three students to say "five squared, which is five times five" out loud. The second most common error is assuming a square root question always has a whole-number answer — slide 16 and Exercise 1.6 Q8 and Q9 both push back on that. CONSECUTIVE is the book's key word that looks like the least important and is not. Exercise 1.6 Q14 and Q15 both hinge on "consecutive square numbers" and "consecutive cube numbers", and a student who reads consecutive as "one apart" will answer 325 instead of 361. THE NEGATIVE ANSWER in the widget connects back to 1.1. Do not rush the last line: the class will have decided that a question about roots cannot produce a negative, and 5 − 7 = −2 is a useful surprise. The cube watermelons on slide 19 are the deadpan one. They are real. Read it straight. Anything students must copy is in an orange "Write This Down" panel; everything else is discussion. Image sources and licences are in content/y7-math/U01_6/images/CREDITS.json — all three openly licensed (CC0, CC BY-SA 4.0 and CC BY 2.0).`}};export{R as default};