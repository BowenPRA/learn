var e=`#2b2b2b`,t=`#c25e12`,n=`#c8102e`,r=`#1a5fa8`,i=`#4a8b23`,a=`#eef6e6`,o=`#fdf1e3`,s=`#eef4fb`,c=`#f1f5f9`,l=`#fdecef`,u=`Inter, 'Segoe UI', system-ui, sans-serif`,d=(e,t)=>`<rect x="0" y="0" width="${e}" height="${t}" rx="14" fill="#ffffff"/>
    <rect x="0.75" y="0.75" width="${e-1.5}" height="${t-1.5}" rx="13" fill="none" stroke="#e2e8f0" stroke-width="1.5"/>`,f=`<defs>
    <marker id="m22-key" viewBox="0 0 10 10" refX="9" refY="5" markerUnits="userSpaceOnUse" markerWidth="14" markerHeight="14" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="${t}"/></marker>
    <marker id="m22-blue" viewBox="0 0 10 10" refX="9" refY="5" markerUnits="userSpaceOnUse" markerWidth="14" markerHeight="14" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="${r}"/></marker>
    <marker id="m22-green" viewBox="0 0 10 10" refX="9" refY="5" markerUnits="userSpaceOnUse" markerWidth="14" markerHeight="14" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="${i}"/></marker>
    <marker id="m22-red" viewBox="0 0 10 10" refX="9" refY="5" markerUnits="userSpaceOnUse" markerWidth="14" markerHeight="14" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="${n}"/></marker>
  </defs>`,p=(e,t,n,r,i)=>{let a=(r,i)=>`${(e+r*n).toFixed(1)},${(t+i*n).toFixed(1)}`;return`<path d="M ${a(0,30)} L ${a(35,0)} L ${a(55,14)} L ${a(75,0)} L ${a(110,30)} L ${a(92,58)} L ${a(82,48)} L ${a(82,150)} L ${a(28,150)} L ${a(28,48)} L ${a(18,58)} Z" fill="${r}" stroke="${i}" stroke-width="3" stroke-linejoin="round"/>`},m={CUP_FINISHES:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 500" class="w-full h-full">
    ${d(840,500)}
    ${f}

    <text x="420" y="44" font-family="${u}" font-size="27" font-weight="bold" fill="${t}" text-anchor="middle">The row that would not finish</text>

    <text x="420" y="88" font-family="${u}" font-size="21" font-weight="bold" fill="${r}" text-anchor="middle">Last lesson — nobody had told us what c was</text>

    <rect x="60" y="112" width="200" height="86" rx="12" fill="${c}" stroke="${e}" stroke-width="2.5"/>
    <text x="160" y="167" font-family="${u}" font-size="34" font-weight="900" fill="${e}" text-anchor="middle">c − 50</text>
    <line x1="278" y1="155" x2="326" y2="155" stroke="${e}" stroke-width="3" marker-end="url(#m22-blue)"/>
    <rect x="344" y="112" width="440" height="86" rx="12" fill="#ffffff" stroke="${e}" stroke-width="2.5"/>
    <text x="564" y="167" font-family="${u}" font-size="24" fill="${e}" text-anchor="middle">We stop here. That is the answer.</text>

    <text x="420" y="246" font-family="${u}" font-size="21" font-weight="bold" fill="${i}" text-anchor="middle">Today — I tell you that c = 320</text>

    <rect x="60" y="272" width="200" height="86" rx="12" fill="${o}" stroke="${t}" stroke-width="3"/>
    <text x="160" y="327" font-family="${u}" font-size="34" font-weight="900" fill="${t}" text-anchor="middle">320 − 50</text>
    <line x1="278" y1="315" x2="326" y2="315" stroke="${t}" stroke-width="3" marker-end="url(#m22-key)"/>
    <rect x="344" y="272" width="440" height="86" rx="12" fill="${a}" stroke="${i}" stroke-width="3"/>
    <text x="564" y="327" font-family="${u}" font-size="26" font-weight="900" fill="${e}" text-anchor="middle">270 ml is left in the cup</text>

    <text x="420" y="414" font-family="${u}" font-size="24" font-weight="bold" fill="${e}" text-anchor="middle">Nothing has changed except one thing: now we know c.</text>
    <text x="420" y="454" font-family="${u}" font-size="21" fill="${e}" text-anchor="middle">Putting a number in place of a letter is called substituting.</text>
  </svg>`,SUBSTITUTE_SWAP:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 580" class="w-full h-full">
    ${d(840,580)}
    ${f}

    <text x="420" y="44" font-family="${u}" font-size="27" font-weight="bold" fill="${t}" text-anchor="middle">Substitute means swap it for a number</text>

    ${p(90,110,1.7,s,r)}
    <text x="183" y="290" font-family="${u}" font-size="72" font-weight="900" fill="${r}" text-anchor="middle">n</text>
    <text x="183" y="400" font-family="${u}" font-size="23" fill="${e}" text-anchor="middle">the letter comes off</text>

    <line x1="310" y1="240" x2="452" y2="240" stroke="${t}" stroke-width="5" marker-end="url(#m22-key)"/>
    <text x="380" y="212" font-family="${u}" font-size="30" font-weight="bold" fill="${t}" text-anchor="middle">n = 4</text>

    ${p(490,110,1.7,o,t)}
    <text x="583" y="290" font-family="${u}" font-size="72" font-weight="900" fill="${t}" text-anchor="middle">4</text>
    <text x="583" y="400" font-family="${u}" font-size="23" fill="${e}" text-anchor="middle">the number goes on</text>

    <rect x="70" y="430" width="280" height="76" rx="12" fill="${c}" stroke="${e}" stroke-width="2.5"/>
    <text x="210" y="482" font-family="${u}" font-size="34" font-weight="bold" fill="${e}" text-anchor="middle">3n + 2</text>
    <line x1="372" y1="468" x2="438" y2="468" stroke="${t}" stroke-width="3" marker-end="url(#m22-key)"/>
    <rect x="460" y="430" width="310" height="76" rx="12" fill="${o}" stroke="${t}" stroke-width="3"/>
    <text x="615" y="482" font-family="${u}" font-size="34" font-weight="900" fill="${t}" text-anchor="middle">3 × 4 + 2</text>

    <text x="420" y="552" font-family="${u}" font-size="23" font-weight="bold" fill="${e}" text-anchor="middle">The place stays the same. Only what is in it changes.</text>
  </svg>`,INVISIBLE_TIMES:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 550" class="w-full h-full">
    ${d(840,550)}
    ${f}

    <text x="420" y="44" font-family="${u}" font-size="27" font-weight="bold" fill="${t}" text-anchor="middle">3n still means 3 × n</text>

    <rect x="60" y="110" width="180" height="86" rx="12" fill="${c}" stroke="${e}" stroke-width="2.5"/>
    <text x="150" y="168" font-family="${u}" font-size="44" font-weight="900" fill="${e}" text-anchor="middle">3n</text>
    <text x="273" y="162" font-family="${u}" font-size="22" fill="${e}" text-anchor="middle">means</text>
    <rect x="306" y="110" width="210" height="86" rx="12" fill="${s}" stroke="${r}" stroke-width="3"/>
    <text x="411" y="168" font-family="${u}" font-size="40" font-weight="900" fill="${r}" text-anchor="middle">3 × n</text>
    <text x="660" y="162" font-family="${u}" font-size="22" fill="${e}" text-anchor="middle">put the × back in</text>

    <text x="420" y="240" font-family="${u}" font-size="26" font-weight="bold" fill="${e}" text-anchor="middle">when n = 4</text>

    <rect x="180" y="270" width="210" height="86" rx="12" fill="${c}" stroke="${e}" stroke-width="2.5"/>
    <text x="285" y="328" font-family="${u}" font-size="40" font-weight="900" fill="${e}" text-anchor="middle">3 × 4</text>
    <line x1="406" y1="313" x2="458" y2="313" stroke="${i}" stroke-width="3" marker-end="url(#m22-green)"/>
    <rect x="480" y="270" width="180" height="86" rx="12" fill="${a}" stroke="${i}" stroke-width="3"/>
    <text x="570" y="328" font-family="${u}" font-size="44" font-weight="900" fill="${e}" text-anchor="middle">12</text>

    <rect x="320" y="386" width="200" height="80" rx="12" fill="${l}" stroke="${n}" stroke-width="3"/>
    <text x="420" y="444" font-family="${u}" font-size="44" font-weight="900" fill="${n}" text-anchor="middle">34</text>
    <line x1="378" y1="428" x2="462" y2="428" stroke="${n}" stroke-width="6"/>

    <text x="420" y="514" font-family="${u}" font-size="24" font-weight="bold" fill="${e}" text-anchor="middle">Never push the digits together. 3n means multiply.</text>
  </svg>`,ORDER_AFTER_SUB:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 570" class="w-full h-full">
    ${d(840,570)}

    <text x="420" y="44" font-family="${u}" font-size="26" font-weight="bold" fill="${t}" text-anchor="middle">Work out 3x + 2 when x = 4</text>

    <rect x="30" y="86" width="380" height="400" rx="14" fill="${a}" stroke="${i}" stroke-width="3"/>
    <text x="220" y="128" font-family="${u}" font-size="24" font-weight="bold" fill="${i}" text-anchor="middle">Do this</text>
    <text x="220" y="204" font-family="${u}" font-size="36" font-weight="bold" fill="${e}" text-anchor="middle">3 × 4 + 2</text>
    <text x="220" y="282" font-family="${u}" font-size="36" font-weight="bold" fill="${e}" text-anchor="middle">12 + 2</text>
    <text x="220" y="374" font-family="${u}" font-size="48" font-weight="900" fill="${i}" text-anchor="middle">= 14</text>
    <text x="220" y="444" font-family="${u}" font-size="22" fill="${e}" text-anchor="middle">multiply first</text>

    <rect x="430" y="86" width="380" height="400" rx="14" fill="${l}" stroke="${n}" stroke-width="3"/>
    <text x="620" y="128" font-family="${u}" font-size="24" font-weight="bold" fill="${n}" text-anchor="middle">Not this</text>
    <text x="620" y="204" font-family="${u}" font-size="36" font-weight="bold" fill="${e}" text-anchor="middle">4 + 2 = 6</text>
    <text x="620" y="282" font-family="${u}" font-size="36" font-weight="bold" fill="${e}" text-anchor="middle">6 × 3</text>
    <text x="620" y="374" font-family="${u}" font-size="48" font-weight="900" fill="${n}" text-anchor="middle">= 18</text>
    <text x="620" y="444" font-family="${u}" font-size="22" fill="${e}" text-anchor="middle">added first</text>

    <text x="420" y="534" font-family="${u}" font-size="24" font-weight="bold" fill="${e}" text-anchor="middle">× and ÷ always happen before + and −.</text>
  </svg>`,EXPRESSION_FORMULA:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 500" class="w-full h-full">
    ${d(840,500)}

    <text x="420" y="44" font-family="${u}" font-size="27" font-weight="bold" fill="${t}" text-anchor="middle">One has an = sign. One does not.</text>

    <rect x="30" y="84" width="380" height="290" rx="14" fill="${s}" stroke="${r}" stroke-width="3"/>
    <text x="220" y="128" font-family="${u}" font-size="26" font-weight="bold" fill="${r}" text-anchor="middle">Expression</text>
    <text x="220" y="210" font-family="${u}" font-size="44" font-weight="900" fill="${e}" text-anchor="middle">3n + 2</text>
    <text x="220" y="272" font-family="${u}" font-size="24" font-weight="bold" fill="${e}" text-anchor="middle">No = sign.</text>
    <text x="220" y="322" font-family="${u}" font-size="21" fill="${e}" text-anchor="middle">It is a thing you have built.</text>

    <rect x="430" y="84" width="380" height="290" rx="14" fill="${o}" stroke="${t}" stroke-width="3"/>
    <text x="620" y="128" font-family="${u}" font-size="26" font-weight="bold" fill="${t}" text-anchor="middle">Formula</text>
    <text x="620" y="210" font-family="${u}" font-size="40" font-weight="900" fill="${t}" text-anchor="middle">C = 3n + 2</text>
    <text x="620" y="272" font-family="${u}" font-size="24" font-weight="bold" fill="${e}" text-anchor="middle">It has an = sign.</text>
    <text x="620" y="322" font-family="${u}" font-size="21" fill="${e}" text-anchor="middle">It is a rule you can use.</text>

    <text x="420" y="428" font-family="${u}" font-size="24" font-weight="bold" fill="${e}" text-anchor="middle">A formula is a rule that connects two quantities.</text>
    <text x="420" y="466" font-family="${u}" font-size="21" fill="${e}" text-anchor="middle">Tell me n, and the formula tells you C.</text>
  </svg>`,RECTANGLE_FORMULA:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 480" class="w-full h-full">
    ${d(840,480)}
    ${f}

    <text x="420" y="44" font-family="${u}" font-size="27" font-weight="bold" fill="${t}" text-anchor="middle">One formula, two letters to substitute</text>

    <rect x="70" y="140" width="280" height="180" rx="6" fill="${s}" stroke="${e}" stroke-width="3"/>
    <line x1="352" y1="230" x2="368" y2="230" stroke="${t}" stroke-width="2.5"/>
    <text x="372" y="240" font-family="${u}" font-size="26" font-weight="bold" fill="${t}">w = 4 cm</text>
    <text x="210" y="358" font-family="${u}" font-size="26" font-weight="bold" fill="${t}" text-anchor="middle">l = 7 cm</text>

    <rect x="520" y="120" width="290" height="250" rx="14" fill="${o}" stroke="${t}" stroke-width="3"/>
    <text x="665" y="182" font-family="${u}" font-size="34" font-weight="900" fill="${t}" text-anchor="middle">A = lw</text>
    <text x="665" y="248" font-family="${u}" font-size="30" font-weight="bold" fill="${e}" text-anchor="middle">A = 7 × 4</text>
    <text x="665" y="316" font-family="${u}" font-size="30" font-weight="900" fill="${i}" text-anchor="middle">A = 28 cm²</text>

    <text x="420" y="430" font-family="${u}" font-size="24" font-weight="bold" fill="${e}" text-anchor="middle">Substitute both letters, then work it out.</text>
  </svg>`,NEGATIVE_SUB:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 580" class="w-full h-full">
    ${d(840,580)}
    ${f}

    <text x="420" y="44" font-family="${u}" font-size="26" font-weight="bold" fill="${t}" text-anchor="middle">Work out 5 − 2n when n = −3</text>

    <rect x="140" y="90" width="560" height="80" rx="12" fill="${c}" stroke="${e}" stroke-width="2.5"/>
    <text x="420" y="142" font-family="${u}" font-size="34" font-weight="bold" fill="${e}" text-anchor="middle">2n = 2 × (−3)</text>
    <line x1="420" y1="176" x2="420" y2="198" stroke="${r}" stroke-width="3" marker-end="url(#m22-blue)"/>

    <rect x="140" y="204" width="560" height="80" rx="12" fill="${s}" stroke="${r}" stroke-width="3"/>
    <text x="420" y="256" font-family="${u}" font-size="34" font-weight="bold" fill="${r}" text-anchor="middle">so 2n = −6</text>
    <line x1="420" y1="290" x2="420" y2="312" stroke="${r}" stroke-width="3" marker-end="url(#m22-blue)"/>

    <rect x="140" y="318" width="560" height="80" rx="12" fill="${c}" stroke="${e}" stroke-width="2.5"/>
    <text x="420" y="370" font-family="${u}" font-size="32" font-weight="bold" fill="${e}" text-anchor="middle">5 − (−6) = 5 + 6</text>
    <line x1="420" y1="404" x2="420" y2="426" stroke="${i}" stroke-width="3" marker-end="url(#m22-green)"/>

    <rect x="140" y="432" width="560" height="80" rx="12" fill="${a}" stroke="${i}" stroke-width="3"/>
    <text x="420" y="487" font-family="${u}" font-size="40" font-weight="900" fill="${e}" text-anchor="middle">= 11</text>

    <text x="420" y="552" font-family="${u}" font-size="22" font-weight="bold" fill="${n}" text-anchor="middle">Not −1. The minus sign belongs to the 3, so it goes in too.</text>
  </svg>`,BOILING_LIMIT:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" class="w-full h-full">
    ${d(840,560)}
    ${f}

    <text x="420" y="42" font-family="${u}" font-size="25" font-weight="bold" fill="${t}" text-anchor="middle">The water starts at 24 °C and rises 3 °C each minute</text>

    <rect x="300" y="70" width="240" height="64" rx="12" fill="${o}" stroke="${t}" stroke-width="3"/>
    <text x="420" y="114" font-family="${u}" font-size="32" font-weight="900" fill="${t}" text-anchor="middle">T = 24 + 3m</text>

    <rect x="50" y="180" width="440" height="72" rx="12" fill="${a}" stroke="${i}" stroke-width="3"/>
    <text x="270" y="226" font-family="${u}" font-size="26" font-weight="bold" fill="${e}" text-anchor="middle">after 12 minutes, T = 60 °C</text>

    <rect x="50" y="266" width="440" height="72" rx="12" fill="${a}" stroke="${i}" stroke-width="3"/>
    <text x="270" y="312" font-family="${u}" font-size="26" font-weight="bold" fill="${e}" text-anchor="middle">after 25 minutes, T = 99 °C</text>

    <rect x="50" y="352" width="440" height="72" rx="12" fill="${l}" stroke="${n}" stroke-width="3"/>
    <text x="270" y="398" font-family="${u}" font-size="26" font-weight="bold" fill="${n}" text-anchor="middle">after 40 minutes, T = 144 °C</text>

    <text x="667" y="112" font-family="${u}" font-size="24" font-weight="bold" fill="${n}" text-anchor="middle">144 °C?</text>
    <line x1="667" y1="126" x2="667" y2="150" stroke="${n}" stroke-width="3" stroke-dasharray="7 6" marker-end="url(#m22-red)"/>

    <rect x="640" y="170" width="54" height="280" rx="27" fill="#ffffff" stroke="${e}" stroke-width="3"/>
    <rect x="650" y="222" width="34" height="232" fill="${n}"/>
    <circle cx="667" cy="470" r="42" fill="${n}" stroke="${e}" stroke-width="3"/>
    <line x1="634" y1="222" x2="706" y2="222" stroke="${e}" stroke-width="2.5"/>
    <text x="626" y="230" font-family="${u}" font-size="22" font-weight="bold" fill="${e}" text-anchor="end">100 °C</text>

    <text x="420" y="500" font-family="${u}" font-size="24" font-weight="bold" fill="${n}" text-anchor="middle">Water cannot get hotter than 100 °C.</text>
    <text x="420" y="538" font-family="${u}" font-size="21" fill="${e}" text-anchor="middle">A formula is only true while the situation it describes is true.</text>
  </svg>`,ANS_14:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 320" class="w-full h-full">
    ${d(720,320)}
    <g transform="translate(192 76) scale(-7 7)" fill="none" stroke="${r}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 11V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2"/><path d="M14 10V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v2"/><path d="M10 10.5V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2v8"/><path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"/></g>
    <text x="440" y="228" font-family="${u}" font-size="190" font-weight="bold" fill="${r}" text-anchor="middle">14</text>
  </svg>`,ANS_18:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 320" class="w-full h-full">
    ${d(720,320)}
    <g transform="translate(528 76) scale(7)" fill="none" stroke="${t}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 11V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2"/><path d="M14 10V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v2"/><path d="M10 10.5V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2v8"/><path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"/></g>
    <text x="280" y="228" font-family="${u}" font-size="190" font-weight="bold" fill="${t}" text-anchor="middle">18</text>
  </svg>`,ANS_NEG1:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 320" class="w-full h-full">
    ${d(720,320)}
    <g transform="translate(192 76) scale(-7 7)" fill="none" stroke="${r}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 11V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2"/><path d="M14 10V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v2"/><path d="M10 10.5V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2v8"/><path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"/></g>
    <text x="440" y="228" font-family="${u}" font-size="190" font-weight="bold" fill="${r}" text-anchor="middle">−1</text>
  </svg>`,ANS_11:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 320" class="w-full h-full">
    ${d(720,320)}
    <g transform="translate(528 76) scale(7)" fill="none" stroke="${t}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 11V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2"/><path d="M14 10V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v2"/><path d="M10 10.5V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2v8"/><path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"/></g>
    <text x="280" y="228" font-family="${u}" font-size="190" font-weight="bold" fill="${t}" text-anchor="middle">11</text>
  </svg>`},h=`#0087a8`,g=`#5c2483`,_=`#c25e12`,v=`#4a8b23`,y=`#1a5fa8`,b=`#c8102e`,x={meta:{course:`y7-math`,unit:`2.2`,id:`U02_2`,title:`Using Expressions and Formulae`,objective:`Substitute a number in place of a letter and give the value; know that 3n with n = 4 is 12 and never 34, because the times sign was only ever hidden; keep the order of operations after substituting, so 3x + 2 with x = 4 is 14 and not 18; say what a formula is and why — unlike an expression — it has an = sign; substitute into a formula with two letters such as A = lw; carry a minus sign into the expression with the number it belongs to, using brackets; and recognise that a formula stops being true when the situation it describes does.`,order:8,french:!0,dashboard:{track:`Y7_MATH`,unit:`U02_2`}},slides:[{layout:`hero`,color:g,icon:`Sigma`,brand:`Year 7 Mathematics`,brandVn:`Toán Lớp 7`,brandFr:`Maths 7e année`,eyebrow:`Unit 2 · 2.2`,eyebrowVn:`Chương 2 · 2.2`,eyebrowFr:`Unité 2 · 2.2`,date:`10 Sept 2026`,title:`Using Expressions and Formulae`,titleVn:`Sử dụng biểu thức và công thức`,titleFr:`Expressions et formules`,card:{icon:`Pencil`,badge:`Starter Task`,badgeVn:`Nhiệm vụ khởi động`,badgeFr:`Pour commencer`,text:`Last lesson a cup held **c ml**, Mr Bowen drank 50 ml, and I told you to stop at **c − 50**.

Today I am telling you: **c = 320**. On your whiteboard, write how much is left. You have 30 seconds.`,textVn:`Tiết trước, một cốc chứa **c ml**, thầy Bowen uống 50 ml, và thầy bảo em dừng lại ở **c − 50**.

Hôm nay thầy nói cho em biết: **c = 320**. Hãy viết lên bảng con: còn lại bao nhiêu? Em có 30 giây.`,textFr:`Au dernier cours, une tasse avait **c ml**, M. Bowen a bu 50 ml, et on s’est arrêté à **c − 50**.

Aujourd’hui, **c = 320**. Sur ton ardoise, écris ce qui reste. Tu as 30 secondes.`}},{layout:`split`,accent:h,icon:`Coffee`,side:`left`,eyebrow:`Maths 2.1 — the cup we had to leave alone`,eyebrowVn:`Toán 2.1 — cái cốc mà ta đành để nguyên`,eyebrowFr:`Maths 2.1 — la tasse qu’on a dû laisser`,title:`The Row Finishes`,titleVn:`Dòng tính đã hoàn thành`,titleFr:`La ligne se termine`,ratio:50,inlineSvg:m.CUP_FINISHES,content:`Last lesson **c − 50** was the finished answer, and stopping there was correct.

Nothing about that has changed. The only new thing is that somebody has now **told us what c is**.

So today the row goes one step further, and lands on a number: **270**.`,contentVn:`Tiết trước, **c − 50** chính là đáp án hoàn chỉnh, và dừng ở đó là đúng.

Điều đó vẫn không thay đổi. Chỉ có một điều mới: bây giờ đã có người **cho ta biết c bằng bao nhiêu**.

Vậy nên hôm nay dòng tính đi thêm được một bước nữa, và ra một con số: **270**.`,contentFr:`La dernière fois, **c − 50** était la réponse finale, et s’arrêter là était juste.

Ça n’a pas changé. La seule nouveauté\xA0: quelqu’un nous a enfin **dit ce que vaut c**.

Alors aujourd’hui, la ligne va une étape plus loin et donne un nombre\xA0: **270**.`},{layout:`split`,accent:_,icon:`Repeat`,eyebrow:`Key words`,eyebrowVn:`Từ khoá`,eyebrowFr:`Mots clés`,title:`Substitute`,titleVn:`Thay số`,titleFr:`Remplacer`,ratio:50,inlineSvg:m.SUBSTITUTE_SWAP,content:`In football, a **substitute** comes on and another player goes off. The position on the pitch does not change — only who is standing in it.

A letter works the same way.`,contentVn:`Trong bóng đá, một cầu thủ **dự bị (substitute)** vào sân và một cầu thủ khác rời sân. Vị trí trên sân không đổi — chỉ đổi người đứng ở đó.

Chữ cái trong đại số cũng hoạt động đúng như vậy.`,contentFr:`Au football, un **remplaçant (substitute)** entre et un autre joueur sort. Le poste sur le terrain ne change pas — seulement le joueur.

Une lettre marche pareil.`,notes:[{tone:`write`,text:`**Substitute:** put a number in place of a letter.
**Value:** the number you get after substituting. When $n = 4$, the value of $3n + 2$ is 14.`,textVn:`**Substitute (thay số):** đặt một con số vào chỗ của chữ cái.
**Value (giá trị):** con số em thu được sau khi thay. Khi $n = 4$, giá trị của $3n + 2$ là 14.`,textFr:`**Substitute (remplacer)\xA0:** mettre un nombre à la place d’une lettre.
**Value (valeur)\xA0:** le nombre obtenu après le remplacement. Quand $n = 4$, la valeur de $3n + 2$ est 14.`}]},{layout:`split`,accent:b,icon:`AlertTriangle`,side:`left`,eyebrow:`This one costs the most marks every year`,eyebrowVn:`Chỗ này năm nào cũng mất điểm nhiều nhất`,eyebrowFr:`Celle-ci coûte le plus de points chaque année`,title:`The Times Sign Did Not Leave`,titleVn:`Dấu nhân vẫn còn đó`,titleFr:`Le signe × est toujours là`,ratio:50,inlineSvg:m.INVISIBLE_TIMES,content:`Last lesson we stopped writing the **×**. We did not stop **doing** it.

So when you substitute, put the **×** back in first. Write $3 × 4$, and only then work it out.`,contentVn:`Tiết trước ta ngừng **viết** dấu **×**. Nhưng ta không hề ngừng **thực hiện** phép nhân đó.

Vậy nên khi thay số, hãy **viết lại dấu ×** trước đã. Viết $3 × 4$, rồi mới tính.`,contentFr:`La dernière fois, on a arrêté d’**écrire** le **×**. On n’a pas arrêté de le **faire**.

Alors quand tu remplaces, remets d’abord le **×**. Écris $3 × 4$, et seulement ensuite calcule.`,notes:[{tone:`write`,text:`$3n$ means $3 × n$. When $n = 4$, $3n = 3 × 4 = 12$.
**It is never 34.** Never push the two digits together.`,textVn:`$3n$ nghĩa là $3 × n$. Khi $n = 4$ thì $3n = 3 × 4 = 12$.
**Không bao giờ bằng 34.** Đừng bao giờ ghép hai chữ số lại với nhau.`,textFr:`$3n$ veut dire $3 × n$. Quand $n = 4$, $3n = 3 × 4 = 12$.
**Ce n’est jamais 34.** Ne colle jamais les deux chiffres.`}]},{layout:`split`,accent:v,icon:`ListChecks`,eyebrow:`Quick fire — thirty seconds each`,eyebrowVn:`Nhanh — mỗi câu ba mươi giây`,eyebrowFr:`Rapide — trente secondes chacune`,title:`Four to Substitute`,titleVn:`Bốn câu để thay số`,titleFr:`Quatre remplacements`,ratio:50,content:`In every one of these, **n = 5**. Work out the value.

**a** $n + 7$
**b** $4n$
**c** $n − 9$
**d** $\\frac{n}{5}$`,contentVn:`Trong tất cả các câu sau, **n = 5**. Hãy tính giá trị.

**a** $n + 7$
**b** $4n$
**c** $n − 9$
**d** $\\frac{n}{5}$`,contentFr:`Dans chacune, **n = 5**. Calcule la valeur.

**a** $n + 7$
**b** $4n$
**c** $n − 9$
**d** $\\frac{n}{5}$`,reveal:{label:`Check your answers`,labelVn:`Kiểm tra đáp án`,labelFr:`Vérifie tes réponses`,answer:`**a** 12  **b** 20  **c** −4  **d** 1

Part **b** is $4 × 5$, not 45. Part **c** goes below zero, and that is allowed — you did this in Unit 1.`,answerVn:`**a** 12  **b** 20  **c** −4  **d** 1

Câu **b** là $4 × 5$, không phải 45. Câu **c** xuống dưới 0, và điều đó hoàn toàn được — em đã học ở Chương 1.`,answerFr:`**a** 12  **b** 20  **c** −4  **d** 1

La **b**, c’est $4 × 5$, pas 45. La **c** passe sous zéro, et c’est permis — tu l’as vu dans l’unité 1.`}},{layout:`compare`,accent:g,icon:`Hand`,eyebrow:`Vote with one hand`,eyebrowVn:`Biểu quyết bằng một tay`,eyebrowFr:`Vote avec une main`,title:`Which Answer, and Why?`,titleVn:`Đáp án nào đúng, và vì sao?`,titleFr:`Quelle réponse, et pourquoi\xA0?`,text:`Work out $3x + 2$ when $x = 4$`,textVn:`Tính $3x + 2$ khi $x = 4$`,textFr:`Calcule $3x + 2$ quand $x = 4$`,columns:[{heading:`A · left hand up`,headingVn:`A · giơ tay trái`,headingFr:`A · main gauche levée`,accent:y,icon:`Hand`,inlineSvg:m.ANS_14},{heading:`B · right hand up`,headingVn:`B · giơ tay phải`,headingFr:`B · main droite levée`,accent:_,icon:`Hand`,inlineSvg:m.ANS_18}]},{layout:`split`,accent:b,icon:`ArrowDownUp`,side:`left`,eyebrow:`The rule you already know, still switched on`,eyebrowVn:`Quy tắc em đã biết, vẫn còn hiệu lực`,eyebrowFr:`La règle que tu connais, toujours valable`,title:`Multiply Before You Add`,titleVn:`Nhân trước, cộng sau`,titleFr:`Multiplie avant d’additionner`,ratio:50,inlineSvg:m.ORDER_AFTER_SUB,content:`**14 is right.** 18 comes from reading left to right and adding first.

Substituting a number does not change the order of operations. It never did in arithmetic, and it does not here.`,contentVn:`**14 mới đúng.** 18 là do đọc từ trái sang phải rồi cộng trước.

Việc thay số vào không làm thay đổi thứ tự phép tính. Trong số học đã vậy, ở đây cũng vậy.`,contentFr:`**14 est juste.** 18 vient d’une lecture de gauche à droite, en additionnant d’abord.

Remplacer par un nombre ne change pas la priorité des opérations. En calcul, jamais\xA0; ici non plus.`,notes:[{tone:`write`,text:`**Order of operations:** do **× and ÷ first**, then + and −.
When $x = 4$: $3x + 2 = 3 × 4 + 2 = 12 + 2 = 14$.`,textVn:`**Thứ tự phép tính:** làm **nhân và chia trước**, rồi mới cộng và trừ.
Khi $x = 4$: $3x + 2 = 3 × 4 + 2 = 12 + 2 = 14$.`,textFr:`**Priorité des opérations\xA0:** fais **× et ÷ d’abord**, puis + et −.
Quand $x = 4$\xA0: $3x + 2 = 3 × 4 + 2 = 12 + 2 = 14$.`}]},{layout:`split`,accent:v,icon:`ListChecks`,eyebrow:`Three to try — write the middle line every time`,eyebrowVn:`Ba câu để thử — luôn viết dòng trung gian`,eyebrowFr:`Trois à essayer — écris toujours la ligne du milieu`,title:`Your Turn`,titleVn:`Đến lượt em`,titleFr:`À toi`,ratio:50,content:`Work out the value of each expression.

**a** $5n − 3$ when $n = 4$
**b** $20 − 3n$ when $n = 6$
**c** $\\frac{n}{2} + 8$ when $n = 10$`,contentVn:`Hãy tính giá trị của mỗi biểu thức sau.

**a** $5n − 3$ khi $n = 4$
**b** $20 − 3n$ khi $n = 6$
**c** $\\frac{n}{2} + 8$ khi $n = 10$`,contentFr:`Calcule la valeur de chaque expression.

**a** $5n − 3$ quand $n = 4$
**b** $20 − 3n$ quand $n = 6$
**c** $\\frac{n}{2} + 8$ quand $n = 10$`,reveal:{label:`Check your answers`,labelVn:`Kiểm tra đáp án`,labelFr:`Vérifie tes réponses`,answer:`**a** $20 − 3 = 17$  **b** $20 − 18 = 2$  **c** $5 + 8 = 13$

In **b** the multiplication happens first even though it is written second. $20 − 3n$ is not $17n$.`,answerVn:`**a** $20 − 3 = 17$  **b** $20 − 18 = 2$  **c** $5 + 8 = 13$

Ở câu **b**, phép nhân vẫn làm trước dù nó được viết sau. $20 − 3n$ không phải là $17n$.`,answerFr:`**a** $20 − 3 = 17$  **b** $20 − 18 = 2$  **c** $5 + 8 = 13$

En **b**, la multiplication se fait d’abord, même si elle est écrite après. $20 − 3n$ n’est pas $17n$.`}},{layout:`split`,accent:h,icon:`Equal`,side:`left`,eyebrow:`Key word — and the opposite of last lesson’s`,eyebrowVn:`Từ khoá — và là cái ngược lại với tiết trước`,eyebrowFr:`Mot clé — le contraire de celui de la dernière fois`,title:`Formula`,titleVn:`Công thức`,titleFr:`Formule`,ratio:50,inlineSvg:m.EXPRESSION_FORMULA,content:`Last lesson you learned that an **expression** has **no = sign**.

A **formula** is the one that does. It is a rule: tell it n, and it tells you C.`,contentVn:`Tiết trước em đã học rằng **biểu thức (expression)** thì **không có dấu =**.

**Công thức (formula)** thì có. Nó là một quy tắc: cho nó biết n, nó cho em biết C.`,contentFr:`La dernière fois, tu as appris qu’une **expression** n’a **pas de signe =**.

Une **formule (formula)**, elle, en a un. C’est une règle\xA0: donne-lui n, elle te donne C.`,notes:[{tone:`write`,text:`**Formula:** a rule that connects two or more quantities, written with letters, and it **has an = sign**.
For example $C = 3n + 2$, $A = lw$. More than one formula: **formulae**.`,textVn:`**Công thức (formula):** một quy tắc liên hệ hai đại lượng trở lên, viết bằng chữ cái, và **có dấu =**.
Ví dụ $C = 3n + 2$, $A = lw$. Số nhiều của formula là **formulae**.`,textFr:`**Formula (formule)\xA0:** une règle qui relie deux quantités ou plus, écrite avec des lettres, et qui **a un signe =**.
Par exemple $C = 3n + 2$, $A = lw$. Le pluriel de formula est **formulae**.`}]},{layout:`split`,accent:_,icon:`Square`,eyebrow:`A formula you have used since primary school`,eyebrowVn:`Một công thức em đã dùng từ hồi tiểu học`,eyebrowFr:`Une formule que tu utilises depuis l’école primaire`,title:`Two Letters, So Substitute Twice`,titleVn:`Hai chữ cái, nên phải thay hai lần`,titleFr:`Deux lettres, donc deux remplacements`,ratio:50,inlineSvg:m.RECTANGLE_FORMULA,content:`The area of a rectangle is its length times its width. Written as a formula, that is **A = lw**.

Remember what $lw$ means: $l × w$. The times sign is still missing, and still there.`,contentVn:`Diện tích hình chữ nhật bằng chiều dài nhân chiều rộng. Viết thành công thức là **A = lw**.

Nhớ lại $lw$ nghĩa là gì: $l × w$. Dấu nhân vẫn bị lược đi, và vẫn đang ở đó.`,contentFr:`L’aire d’un rectangle, c’est sa longueur fois sa largeur. En formule\xA0: **A = lw**.

Rappelle-toi ce que veut dire $lw$\xA0: $l × w$. Le signe × est toujours caché, et toujours là.`,notes:[{tone:`write`,text:`When a formula has **two letters**, substitute **both** before you work anything out.
$A = lw$, with $l = 7$ and $w = 4$: $A = 7 × 4 = 28$.`,textVn:`Khi công thức có **hai chữ cái**, hãy thay **cả hai** rồi mới tính.
$A = lw$, với $l = 7$ và $w = 4$: $A = 7 × 4 = 28$.`,textFr:`Quand une formule a **deux lettres**, remplace les **deux** avant de calculer.
$A = lw$, avec $l = 7$ et $w = 4$\xA0: $A = 7 × 4 = 28$.`}]},{layout:`split`,accent:v,icon:`ListChecks`,side:`left`,eyebrow:`Two formulae, four substitutions`,eyebrowVn:`Hai công thức, bốn lần thay số`,eyebrowFr:`Deux formules, quatre remplacements`,title:`Use the Formula`,titleVn:`Hãy dùng công thức`,titleFr:`Utilise la formule`,ratio:50,content:`The perimeter of a rectangle is **P = 2l + 2w**.

**a** Find P when $l = 9$ and $w = 5$.
**b** Find P when $l = 12$ and $w = 3$.

A different formula: **T = 5a − b**.

**c** Find T when $a = 4$ and $b = 6$.`,contentVn:`Chu vi hình chữ nhật là **P = 2l + 2w**.

**a** Tìm P khi $l = 9$ và $w = 5$.
**b** Tìm P khi $l = 12$ và $w = 3$.

Một công thức khác: **T = 5a − b**.

**c** Tìm T khi $a = 4$ và $b = 6$.`,contentFr:`Le périmètre d’un rectangle est **P = 2l + 2w**.

**a** Trouve P quand $l = 9$ et $w = 5$.
**b** Trouve P quand $l = 12$ et $w = 3$.

Une autre formule\xA0: **T = 5a − b**.

**c** Trouve T quand $a = 4$ et $b = 6$.`,reveal:{label:`Check your answers`,labelVn:`Kiểm tra đáp án`,labelFr:`Vérifie tes réponses`,answer:`**a** $18 + 10 = 28$  **b** $24 + 6 = 30$  **c** $20 − 6 = 14$

Both multiplications happen before the + or the −, every time.`,answerVn:`**a** $18 + 10 = 28$  **b** $24 + 6 = 30$  **c** $20 − 6 = 14$

Lần nào cũng vậy: cả hai phép nhân đều làm trước dấu + hoặc dấu −.`,answerFr:`**a** $18 + 10 = 28$  **b** $24 + 6 = 30$  **c** $20 − 6 = 14$

Les deux multiplications se font avant le + ou le −, à chaque fois.`}},{layout:`compare`,accent:g,icon:`Hand`,eyebrow:`Vote with one hand`,eyebrowVn:`Biểu quyết bằng một tay`,eyebrowFr:`Vote avec une main`,title:`One of These Is Wrong`,titleVn:`Một trong hai cái này là sai`,titleFr:`L’une des deux est fausse`,text:`Work out $5 − 2n$ when $n = −3$`,textVn:`Tính $5 − 2n$ khi $n = −3$`,textFr:`Calcule $5 − 2n$ quand $n = −3$`,columns:[{heading:`A · left hand up`,headingVn:`A · giơ tay trái`,headingFr:`A · main gauche levée`,accent:y,icon:`Hand`,inlineSvg:m.ANS_NEG1},{heading:`B · right hand up`,headingVn:`B · giơ tay phải`,headingFr:`B · main droite levée`,accent:_,icon:`Hand`,inlineSvg:m.ANS_11}]},{layout:`split`,accent:b,icon:`Minus`,eyebrow:`Unit 1 comes back, inside Unit 2`,eyebrowVn:`Chương 1 quay lại, nằm trong Chương 2`,eyebrowFr:`L’unité 1 revient, dans l’unité 2`,title:`The Minus Sign Travels With It`,titleVn:`Dấu trừ đi theo con số`,titleFr:`Le signe moins voyage avec le nombre`,ratio:50,inlineSvg:m.NEGATIVE_SUB,content:`**11 is right.** −1 comes from substituting 3 and leaving the minus sign behind.

The arithmetic here is $5 + 6$. Nobody in this room finds that hard. The only difficulty is getting the sign into the expression in one piece.`,contentVn:`**11 mới đúng.** −1 là do chỉ thay số 3 vào mà bỏ quên dấu trừ.

Phép tính ở đây là $5 + 6$. Không bạn nào trong lớp thấy khó cả. Cái khó duy nhất là đưa được dấu trừ vào biểu thức cùng với con số.`,contentFr:`**11 est juste.** −1 vient de remplacer par 3 en oubliant le signe moins.

Le calcul ici, c’est $5 + 6$. Personne ici ne trouve ça dur. La seule difficulté\xA0: faire entrer le signe dans l’expression avec le nombre.`,notes:[{tone:`write`,text:`**Put a negative number in brackets when you substitute it.**
If $n = −3$ then $2n = 2 × (−3) = −6$, so $5 − 2n = 5 − (−6) = 5 + 6 = 11$.`,textVn:`**Khi thay một số âm, hãy đặt nó trong dấu ngoặc.**
Nếu $n = −3$ thì $2n = 2 × (−3) = −6$, nên $5 − 2n = 5 − (−6) = 5 + 6 = 11$.`,textFr:`**Mets un nombre négatif entre parenthèses quand tu le remplaces.**
Si $n = −3$ alors $2n = 2 × (−3) = −6$, donc $5 − 2n = 5 − (−6) = 5 + 6 = 11$.`}]},{layout:`split`,accent:g,icon:`PenTool`,side:`left`,eyebrow:`Write the formula first`,eyebrowVn:`Viết công thức trước`,eyebrowFr:`Écris d’abord la formule`,title:`Write It, Then Use It`,titleVn:`Viết ra, rồi dùng nó`,titleFr:`Écris-la, puis utilise-la`,ratio:50,content:`A taxi charges **15 thousand dong** to start, and then **9 thousand dong for every kilometre**.

**a** Write a formula for the cost **C** of a journey of **k** kilometres.
**b** Use your formula to find the cost of a journey of 6 kilometres.`,contentVn:`Một chuyến taxi tính **15 nghìn đồng** tiền mở cửa, sau đó **9 nghìn đồng mỗi ki-lô-mét**.

**a** Hãy viết công thức tính chi phí **C** cho một chuyến đi dài **k** ki-lô-mét.
**b** Dùng công thức của em để tính chi phí của chuyến đi 6 ki-lô-mét.`,contentFr:`Un taxi coûte **15 mille dongs** au départ, puis **9 mille dongs par kilomètre**.

**a** Écris une formule pour le prix **C** d’un trajet de **k** kilomètres.
**b** Utilise ta formule pour trouver le prix d’un trajet de 6 kilomètres.`,notes:[{tone:`write`,text:`When you write a formula, **say what every letter represents**.
C is the cost in thousand dong · k is the number of kilometres.`,textVn:`Khi viết một công thức, hãy **nói rõ mỗi chữ cái đại diện cho cái gì**.
C là chi phí tính bằng nghìn đồng · k là số ki-lô-mét.`,textFr:`Quand tu écris une formule, **dis ce que représente chaque lettre**.
C est le prix en milliers de dongs · k est le nombre de kilomètres.`}],reveal:{label:`Check your answer`,labelVn:`Kiểm tra đáp án`,labelFr:`Vérifie ta réponse`,answer:`**a** $C = 15 + 9k$: 15 is paid once, 9 every kilometre.
**b** $C = 15 + 9 × 6 = 69$ thousand dong`,answerVn:`**a** $C = 15 + 9k$: 15 trả một lần, 9 trả mỗi ki-lô-mét.
**b** $C = 15 + 9 × 6 = 69$ nghìn đồng`,answerFr:`**a** $C = 15 + 9k$\xA0: 15 payé une fois, 9 à chaque kilomètre.
**b** $C = 15 + 9 × 6 = 69$ mille dongs`}},{layout:`split`,accent:v,icon:`Thermometer`,eyebrow:`From yesterday’s Science`,eyebrowVn:`Từ tiết Khoa học hôm qua`,eyebrowFr:`Tiré des sciences d’hier`,title:`The Water That Would Not Get Hotter`,titleVn:`Nước không thể nóng hơn được nữa`,titleFr:`L’eau qui ne chauffait plus`,ratio:50,inlineSvg:m.BOILING_LIMIT,content:`Mr Bowen heats water. It starts at 24 °C and rises 3 °C every minute, so **T = 24 + 3m**.

**a** Find T after 12 minutes.
**b** Find T after 25 minutes.
**c** The formula says T = 144 after 40 minutes. Is that possible?`,contentVn:`Thầy Bowen đun nước. Nước bắt đầu ở 24 °C và tăng 3 °C mỗi phút, nên **T = 24 + 3m**.

**a** Tìm T sau 12 phút.
**b** Tìm T sau 25 phút.
**c** Công thức cho ra T = 144 sau 40 phút. Điều đó có thể xảy ra không?`,contentFr:`M. Bowen chauffe de l’eau. Elle part de 24 °C et monte de 3 °C par minute, donc **T = 24 + 3m**.

**a** Trouve T après 12 minutes.
**b** Trouve T après 25 minutes.
**c** La formule donne T = 144 après 40 minutes. Est-ce possible\xA0?`,reveal:{label:`Check your answer`,labelVn:`Kiểm tra đáp án`,labelFr:`Vérifie ta réponse`,answer:`**a** $24 + 36 = 60$ °C, **b** $24 + 75 = 99$ °C
**c** **No.** Water stops getting hotter at 100 °C. A formula is only true while the situation is.`,answerVn:`**a** $24 + 36 = 60$ °C, **b** $24 + 75 = 99$ °C
**c** **Không.** Nước không nóng hơn 100 °C. Công thức chỉ đúng khi tình huống còn đúng.`,answerFr:`**a** $24 + 36 = 60$ °C, **b** $24 + 75 = 99$ °C
**c** **Non.** L’eau ne dépasse pas 100 °C. Une formule n’est vraie que tant que la situation l’est.`}},{layout:`stack`,variant:`checklist`,accent:h,icon:`CheckCircle2`,columns:2,eyebrow:`Before you leave`,eyebrowVn:`Trước khi ra về`,eyebrowFr:`Avant de partir`,title:`Can You Do All Six?`,titleVn:`Em làm được cả sáu điều này chứ?`,titleFr:`Sais-tu faire les six\xA0?`,content:`> Your notebook should now have **7 written panels**. Count them. If one is missing, copy it from your partner before you go.`,contentVn:`> Trong vở của em bây giờ phải có **7 khung ghi chép**. Hãy đếm lại. Nếu thiếu khung nào, hãy chép của bạn bên cạnh trước khi ra về.`,contentFr:`> Ton cahier doit maintenant avoir **7 encadrés recopiés**. Compte-les. S’il en manque un, recopie celui de ton voisin avant de partir.`,items:[{text:`**Substitute** a number for a letter, and say what the **value** is.`,textVn:`**Thay số (substitute)** vào chỗ chữ cái, và nói được **giá trị (value)** là bao nhiêu.`,textFr:`**Remplacer (substitute)** une lettre par un nombre, et dire quelle est la **valeur (value)**.`},{text:`Work out $3n$ when $n = 4$ and get **12**, never 34.`,textVn:`Tính $3n$ khi $n = 4$ và ra **12**, không bao giờ ra 34.`,textFr:`Calculer $3n$ quand $n = 4$ et trouver **12**, jamais 34.`},{text:`Do the **× and ÷ before the + and −** after substituting.`,textVn:`Sau khi thay số, làm **nhân và chia trước cộng và trừ**.`,textFr:`Faire **× et ÷ avant + et −** après le remplacement.`},{text:`Say what a **formula** is, and why it **has** an = sign.`,textVn:`Nói được **công thức** là gì, và vì sao nó **có** dấu =.`,textFr:`Dire ce qu’est une **formule**, et pourquoi elle **a** un signe =.`},{text:`Substitute into a formula with **two letters**, such as $A = lw$.`,textVn:`Thay số vào công thức có **hai chữ cái**, ví dụ $A = lw$.`,textFr:`Remplacer dans une formule à **deux lettres**, comme $A = lw$.`},{text:`Substitute a **negative** number in brackets: $2 × (−3) = −6$.`,textVn:`Thay một số **âm** trong dấu ngoặc: $2 × (−3) = −6$.`,textFr:`Remplacer par un nombre **négatif** entre parenthèses\xA0: $2 × (−3) = −6$.`}]},{layout:`callout`,accent:b,icon:`Home`,eyebrow:`Homework Assignment`,eyebrowVn:`Bài tập về nhà`,eyebrowFr:`Devoirs`,title:`For Next Lesson`,titleVn:`Cho tiết học sau`,titleFr:`Pour la prochaine leçon`,content:`Write the **middle line** in every question — the line where the letters have gone and the × signs are back. That line is where the marks are.`,contentVn:`Ở mỗi câu, hãy viết **dòng trung gian** — dòng mà chữ cái đã biến mất và dấu × đã quay lại. Điểm nằm ở dòng đó.`,contentFr:`Écris la **ligne du milieu** à chaque question — celle où les lettres ont disparu et où les × sont revenus. C’est là que sont les points.`,notes:[{tone:`homework`,badge:`Workbook 2.2`,badgeVn:`Vở bài tập 2.2`,badgeFr:`Cahier d’exercices 2.2`,icon:`Pencil`,text:`**Focus** — everybody.
**Practice** — the formulae with two letters.
**Challenge** — an attempt beats a blank.

If an answer looks impossible, check the situation before you check the arithmetic.`,textVn:`**Focus** — tất cả các em.
**Practice** — phần công thức có hai chữ cái.
**Challenge** — làm sai vẫn hơn bỏ trống.

Nếu một đáp án trông có vẻ vô lý, hãy kiểm tra lại tình huống trước khi kiểm tra phép tính.`,textFr:`**Focus** — tout le monde.
**Practice** — les formules à deux lettres.
**Challenge** — un essai vaut mieux qu’une page blanche.

Si une réponse semble impossible, vérifie la situation avant de vérifier le calcul.`}]},{layout:`hero`,color:h,icon:`CheckCircle2`,brand:`Year 7 Mathematics`,brandVn:`Toán Lớp 7`,brandFr:`Maths 7e année`,title:`Lesson Complete!`,titleVn:`Hoàn thành bài học!`,titleFr:`Leçon terminée\xA0!`,subtitle:`Last lesson you were not allowed to finish. This lesson you were. Exit question: **$s = 4t + 1$. Work out s when $t = 6$.**`,subtitleVn:`Tiết trước em không được phép tính xong. Tiết này thì được. Câu hỏi ra về: **$s = 4t + 1$. Hãy tính s khi $t = 6$.**`,subtitleFr:`La dernière fois, tu n’avais pas le droit de finir. Aujourd’hui, si. Question de sortie\xA0: **$s = 4t + 1$. Calcule s quand $t = 6$.**`}],plan:{duration:`50 minutes`,objective:`Students can substitute a number in place of a letter and state the value; know that 3n with n = 4 is 12 and never 34, because the multiplication sign was only ever hidden; keep the order of operations after substituting, so that 3x + 2 with x = 4 is 14 and not 18; know Cambridge's definition of a formula — a rule connecting two or more quantities, written with letters, and having an = sign — and can say how that differs from 2.1's expression; can substitute into a formula with two letters, such as A = lw and P = 2l + 2w; can carry a minus sign into an expression with the number it belongs to, writing 2 × (−3) rather than 2 × 3; can write a simple formula of their own from a described situation and then use it; and can recognise that a formula stops being true when the situation it describes stops being true.`,materials:[`Projector / TV for the lesson deck`,`Mini whiteboards + markers (one per pair)`,`Student notebooks`,`Workbook Unit 2, Section 2.2 for the homework`,`Optional, for slide 15: the kettle or hotplate from yesterday's Science 2.2 lesson, and a thermometer`],vocab:[{term:`Substitute`,def:`the section's first key word, and a word this class already owns from football — a substitute comes on, a player goes off, the position is unchanged. Put a number in place of a letter (Vietnamese: thay số)`},{term:`Value`,def:`the number you are left with after substituting. The book asks for "the value of the expression", and a student who does not know the word does not know what is being asked for`},{term:`Formula / formulae`,def:`a rule connecting two or more quantities, written with letters, WITH an = sign. The plural is irregular and worth saying out loud twice — formulae, not formulas (Vietnamese: công thức)`},{term:`Order of operations`,def:`the same rule as 2.1, now doing real damage: × and ÷ before + and −, whether or not a letter has just been replaced by a number`},{term:`Length · width · area · perimeter`,def:`needed for slides 10 and 11. Area is lw, perimeter is 2l + 2w. The class knows these shapes from primary; it is only the letters that are new`},{term:`Boil · thermometer · degrees Celsius`,def:`borrowed from Science 2.2, which this class had yesterday. Say them out loud; they carry the maths on slide 15 for free`}],timeline:[{time:`0–4 min`,phase:`Starter`,detail:`Title slide. The cup from 2.1: c ml, drink 50, and now c = 320. Thirty seconds on whiteboards. Almost everybody gets 270, and that is the design — the lesson opens with the class succeeding at the exact thing they were told last week they could not do.`},{time:`4–9 min`,phase:`The row finishes`,detail:`Slide 2. Say plainly that NOTHING about last lesson was wrong: c − 50 was a finished answer then and it still is. The only new thing is that somebody has told us c. Do not let this become "so last lesson was pointless" — the whole of 2.2 depends on 2.1 having landed.`},{time:`9–14 min`,phase:`Name it`,detail:`Slide 3. FIRST panel — substitute and value together. Use the football substitution out loud; this class knows the word already and knowing it in English is half the section. Say the second half twice: the PLACE does not change, only what is standing in it.`},{time:`14–22 min`,phase:`THE WALL`,detail:`Slide 4, the invisible times sign. This is the sticking point of the whole section and it is 2.1's own fault: we taught them to write 3n instead of 3 × n, and now a student reads 3n with n = 4 as two digits pushed together and writes 34, completely confident. Put the × back in on the board, out loud, three times. Then slide 5 drills it on four quick ones. Watch for 45 on part b and correct it on the spot.`},{time:`22–30 min`,phase:`The order does not switch off`,detail:`Slide 6 is QUESTION ONLY — 14 against 18, everyone votes at once — left hand up for A, right hand up for B — and write the split on the board before anybody explains. The disagreement is worth more than the answer handed over. Slide 7 settles it, SECOND panel. Slide 8 is three to try; insist on the middle line, because that line is where the marks are and where you can see the error.`},{time:`30–38 min`,phase:`Formula`,detail:`Slide 9, THIRD panel — Cambridge's own sentence, and the explicit contrast with 2.1: an expression has NO = sign, a formula HAS one. Say "formulae" twice. Slide 10 is A = lw, FOURTH panel: two letters means substitute twice, and lw still means l × w. Slide 11 is four substitutions across two formulae.`},{time:`38–44 min`,phase:`The minus sign travels`,detail:`Slide 12 QUESTION ONLY: −1 against 11. Both are things this class will genuinely write. Slide 13 settles it, FIFTH panel. Point out that the arithmetic is 5 + 6 and nobody here finds that hard — the only difficulty is getting the sign into the expression in one piece, which is what the brackets are for.`},{time:`44–50 min`,phase:`Build one, then break one`,detail:`Slide 14, the taxi: write the formula, SIXTH and SEVENTH panels are here and on slide 13 respectively — check the count. Slide 15 is the boiling water, and it is the slide to protect if you are behind on anything else. Then the six-point checklist and the copy-count: 7 panels. Set Workbook 2.2. Exit question: s = 4t + 1, find s when t = 6.`}],answers:[{q:`Starter — the cup, with c = 320`,a:`270 ml. Everybody should get this. If a student writes 320 − 50 and stops, they have not done anything wrong — praise it, then ask them for the number.`},{q:`Slide 5 — four to substitute, n = 5`,a:`a: 12 · b: 20 · c: −4 · d: 1. Part b is the one to watch: 4n is 4 × 5 = 20, never 45. Part c going below zero is Unit 1 work and is allowed.`},{q:`Slide 6 — 3x + 2 when x = 4`,a:`14. The 18 comes from reading left to right: 4 + 2 = 6, then 6 × 3 = 18. Do not reveal this on slide 6 — take the hand vote first (left hand 14, right hand 18).`},{q:`Slide 8 — three to try`,a:`a: 5 × 4 − 3 = 17 · b: 20 − 3 × 6 = 20 − 18 = 2 · c: 10 ÷ 2 + 8 = 13. Part b is the one to slow down on: the multiplication is written second and still happens first. 20 − 3n is not 17n.`},{q:`Slide 10 — A = lw with l = 7, w = 4`,a:`28 cm². Two letters, so two substitutions, and lw still means l × w.`},{q:`Slide 11 — use the formula`,a:`a: P = 18 + 10 = 28 · b: P = 24 + 6 = 30 · c: T = 20 − 6 = 14. Every one has a multiplication that must happen before the + or −.`},{q:`Slide 12 — 5 − 2n when n = −3`,a:`11. The −1 comes from substituting 3 and leaving the minus sign behind: 5 − 2 × 3 = −1. Both answers will be in the room; take the hand vote before settling it (left hand −1, right hand 11).`},{q:`Slide 13 — the working`,a:`2n = 2 × (−3) = −6, so 5 − 2n = 5 − (−6) = 5 + 6 = 11. Insist on the brackets at the substitution step. That habit is the whole fix.`},{q:`Slide 14 — the taxi`,a:`a: C = 15 + 9k · b: C = 15 + 9 × 6 = 69, so 69 thousand dong. The 15 is paid once so it carries no letter; the 9 is paid every kilometre so it is multiplied by k. Ask what C and k represent — that is the 2.1 habit and it is marked in this exercise too.`},{q:`Slide 15 — the boiling water, T = 24 + 3m`,a:`a: 24 + 36 = 60 °C · b: 24 + 75 = 99 °C · c: No. Water boils at 100 °C and stops. The arithmetic in part c is perfect and the answer is still wrong, because the formula describes a situation that has ended. If a student says the water would have boiled away, agree with them — they are right and they have made the point for you.`},{q:`Exit question — s = 4t + 1, find s when t = 6`,a:`25. A student who writes 46 + 1 = 47 has made today's headline mistake, and it is worth catching on the way out of the door.`}],notes:`THE DECK OPENS BY PAYING OFF 2.1, DELIBERATELY. Last lesson's hardest sell was that c − 50 is a finished answer and stopping there is allowed. Slide 2 hands the class c = 320 and the row finishes. Say clearly that nothing about last lesson was wrong — the only new thing is that somebody has now told us c. A class that hears "so last week was pointless" has lost both lessons. THE WALL IS SLIDE 4, AND WE BUILT IT OURSELVES. In 2.1 we taught them to write 3 × n as 3n. The bill arrives today: 3n with n = 4 is read as two digits pushed together and answered 34, with total confidence, by students whose arithmetic is fine. This is a reading error, not a maths error, exactly like every obstacle in Unit 2. Put the × back in on the board every single time you substitute today, and make them write the middle line. TWO SLIDES ARE QUESTION-ONLY — 6 and 12 — and neither has an answer anywhere on it. Both are built as a disagreement between two answers the class will genuinely produce (14 against 18; −1 against 11). Take the vote with one hand each — left for A, right for B — write the split on the board, and only then move on. A room that is split down the middle is paying attention in a way a room being told the answer is not. THE MIDDLE LINE IS THE WHOLE ROUTINE. Substitute, write the line with the numbers and the × signs back in, THEN work it out. Every predictable error today is invisible in a final answer and obvious in that middle line: 34 for 3n, 18 for 3x + 2, −1 for 5 − 2n. Insist on it in class and set it as the homework instruction. SLIDE 15 IS THE ONE TO PROTECT. A formula that gives a perfect answer to an impossible question is rare in a maths lesson, and it is the honest thing to teach: a formula is a rule about a situation, and when the situation ends the formula ends with it. It also lands the day after Science 2.2 taught this class that water boils at 100 °C and stays there, so the science is already in the room. If you are behind, cut the second and third parts of slide 11 rather than this. THE PREDICTABLE ERRORS, in the order they appear: writing 34 for 3n when n = 4; writing 45 for 4n when n = 5; adding before multiplying and getting 18; forgetting that 20 − 3n multiplies first; substituting only one of two letters in A = lw; and dropping the minus sign so that 5 − 2n with n = −3 comes out as −1. Every one has a slide pointed at it. PAGE NUMBERS ARE NOT PRINTED HERE ON PURPOSE. Section 2.1 ran to page 23 with Exercise 2.1 finishing on page 24, so 2.2 begins on 24 — but the exact span was not to hand when this deck was written. Check the book before you set the homework and write the range on the board. Anything students must copy is in an orange "Write This Down" panel; everything else is discussion. Seven panels, which is one fewer than 2.1 and still a lot for one period, which is why the recap asks them to count. This deck has no photographs — all eight figures are authored SVG in diagrams.js, so there is no images/CREDITS.json for 2.2. Substituting has no real-world object to photograph, and a decorative stock picture on a projector is one more thing between the class and the sentence.`}};export{x as default};