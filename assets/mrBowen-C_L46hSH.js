var e=`#2b2b2b`,t={skin:`#f2c9a5`,line:`#b9805c`,hair:`#2f2420`,beard:`#5a4334`,brow:`#2f2420`,shirt:`#fbf1e4`,stripe:`#c9643a`,trousers:`#39424f`,belt:`#1f2328`,shoe:`#2a2320`,strap:`#e8892b`,sheen:`#5a463a`},n={skin:`#cfe0ec`,line:`#8fa9bf`,hair:`#a9bfd1`,beard:`#8fa9bf`,brow:`#8fa9bf`,shirt:`#e8f0f6`,stripe:`#9db8cf`,trousers:`#7b93a8`,belt:`#6d8499`,shoe:`#6d8499`,strap:`#b7cadb`,sheen:`#d3e0ea`},r=[43,97],i=44,a=42,o=e=>Math.round(e*10)/10,s=e=>`${o(e[0])} ${o(e[1])}`;function c(e,t,n){let r=t[0]-e[0],o=t[1]-e[1],s=Math.hypot(r,o)||1;if(s>=86)return[e[0]+r*i/86,e[1]+o*i/86];let c=(i**2-a**2+s**2)/(2*s),l=Math.sqrt(Math.max(0,i**2-c**2)),u=e[0]+r*c/s,d=e[1]+o*c/s,f=[u-o*l/s,d+r*l/s],p=[u+o*l/s,d-r*l/s],m=e=>n*e[0]+.6*e[1];return m(f)>=m(p)?f:p}function l(t,n,i,a){let l=[t*r[0],r[1]],u=n||[t*53,182],d=i||c(l,u,t),f=d[0]-l[0],p=d[1]-l[1],m=Math.hypot(f,p)||1,h=[l[0]+f*.6,l[1]+p*.6],g=[h[0]+f/m*2,h[1]+p/m*2],_=-p/m*5,v=f/m*5,y=`
    <path d="M ${s(l)} L ${s(d)} L ${s(u)}" fill="none" stroke="${e}" stroke-width="19" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M ${s(l)} L ${s(d)} L ${s(u)}" fill="none" stroke="${a.skin}" stroke-width="14.5" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="${o(l[0])}" cy="${o(l[1])}" r="14" fill="${e}"/>
    <path d="M ${s(l)} L ${s(g)}" stroke="${e}" stroke-width="28"/>
    <circle cx="${o(l[0])}" cy="${o(l[1])}" r="12" fill="${a.shirt}"/>
    <path d="M ${s(l)} L ${s(h)}" stroke="${a.shirt}" stroke-width="24"/>
    <path d="M ${o(l[0]+_)} ${o(l[1]+v)} L ${o(h[0]+_)} ${o(h[1]+v)} M ${o(l[0]-_)} ${o(l[1]-v)} L ${o(h[0]-_)} ${o(h[1]-v)}" stroke="${a.stripe}" stroke-width="3"/>`;if(t>0){let t=u[0]-d[0],n=u[1]-d[1],r=[d[0]+t*.68,d[1]+n*.68],i=[d[0]+t*.84,d[1]+n*.84];y+=`
    <path d="M ${s(r)} L ${s(i)}" stroke="${a.strap}" stroke-width="13"/>
    <circle cx="${o((r[0]+i[0])/2)}" cy="${o((r[1]+i[1])/2)}" r="3.6" fill="${e}"/>`}return y+`
    <circle cx="${o(u[0])}" cy="${o(u[1])}" r="8.5" fill="${a.skin}" stroke="${e}" stroke-width="2.5"/>`}var u=(e,t)=>`M ${e} ${t-7} a 7 7 0 1 1 -7 7 a 5 5 0 1 1 5 5 a 3 3 0 1 1 -3 -3`;function d(t,n,r){let i=n||t===`asleep`,a={happy:`M -25 14 Q -16 9 -7 13 M 7 13 Q 16 9 25 14`,sad:`M -25 15 Q -16 13 -7 8 M 7 8 Q 16 13 25 15`,dizzy:`M -25 12 Q -16 7 -7 11 M 7 16 Q 16 14 25 17`,calm:`M -25 15 Q -16 12 -7 15 M 7 15 Q 16 12 25 15`}[i?`calm`:t]||`M -25 14 Q -16 9 -7 13 M 7 13 Q 16 9 25 14`,o;o=i?`<path d="M -21 30 q 6 4 12 0 M 9 30 q 6 4 12 0" stroke="${e}" stroke-width="2.5" fill="none" stroke-linecap="round"/>`:t===`dizzy`?`<path d="${u(-16,30)} ${u(16,30)}" stroke="${e}" stroke-width="2" fill="none"/>`:`
    <ellipse cx="-16" cy="30" rx="3.6" ry="4.4" fill="${e}"/><ellipse cx="16" cy="30" rx="3.6" ry="4.4" fill="${e}"/>
    <circle cx="-14.8" cy="28.4" r="1.2" fill="#ffffff"/><circle cx="17.2" cy="28.4" r="1.2" fill="#ffffff"/>`;let s;return s=n?`<path d="M -9 62 q 4.5 -3 9 0 q 4.5 3 9 0" stroke="${e}" stroke-width="2.5" fill="none" stroke-linecap="round"/>`:t===`asleep`?`<path d="M -7 61 q 7 4 14 0" stroke="${e}" stroke-width="2.5" fill="none" stroke-linecap="round"/>`:t===`sad`?`<path d="M -12 65 q 12 -10 24 0" stroke="${e}" stroke-width="3" fill="none" stroke-linecap="round"/>`:t===`dizzy`?`<path d="M -14 61 q 4.5 -6 9 0 q 4.5 6 9 0 q 4.5 -6 9 0" stroke="${e}" stroke-width="3" fill="none" stroke-linecap="round"/>`:`<path d="M -15 54 Q 0 57 15 54 Q 12 69 0 69 Q -12 69 -15 54 Z" fill="#ffffff" stroke="${e}" stroke-width="2.5" stroke-linejoin="round"/>`,`
    <ellipse cx="-34" cy="36" rx="6.5" ry="10" fill="${r.skin}" stroke="${e}" stroke-width="2.5"/>
    <ellipse cx="34" cy="36" rx="6.5" ry="10" fill="${r.skin}" stroke="${e}" stroke-width="2.5"/>
    <ellipse cx="0" cy="30" rx="34" ry="43" fill="${r.skin}" stroke="${e}" stroke-width="2.5"/>
    <path d="M -33.5 36 A 34 43 0 0 0 33.5 36 L 28 42 Q 23 51 15 50 Q 8 44 0 46 Q -8 44 -15 50 Q -23 51 -28 42 Z" fill="${r.beard}" opacity="0.5"/>
    <path d="M -1 35 Q -5 44 -1 46 Q 2 47 5 45" fill="none" stroke="${r.line}" stroke-width="2.4" stroke-linecap="round"/>
    ${s}
    ${o}
    <g fill="none" stroke="${e}" stroke-width="2.6" stroke-linejoin="round">
      <rect x="-27" y="21" width="22" height="17" rx="5"/><rect x="5" y="21" width="22" height="17" rx="5"/>
      <path d="M -5 27 Q 0 24 5 27 M -27 26 L -32 24 M 27 26 L 32 24"/>
    </g>
    <path d="${a}" stroke="${r.brow}" stroke-width="4" fill="none" stroke-linecap="round"/>
    <path d="${f[0]}" fill="${r.hair}" stroke="${e}" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="${f[1]}" stroke="${r.sheen}" stroke-width="2.5" fill="none" stroke-linecap="round"/>`}var f=[`M -33 36 L -34 12 Q -37 -12 -20 -22 Q -2 -31 16 -27 Q 34 -22 35 -2 L 34 16 L 33 36 L 29 34 L 28 12 Q 27 -2 16 -4 Q 0 -6 -16 -4 Q -27 -2 -28 12 L -29 34 Z`,`M -22 -9 Q -8 -21 10 -21 M -12 -4 Q 4 -15 22 -14 M 4 -6 Q 17 -11 29 -5`];function p({x:r=0,y:i=0,scale:a=1,mood:s=`happy`,frozen:c=!1,handLeft:u,handRight:f,elbowLeft:p,elbowRight:m}={}){let h=c?n:t,g=[-3.5,-2.5,-1.5,-.5,.5,1.5,2.5,3.5].map(e=>`M ${e*11.5} 89 L ${e*8} 169`).join(` `);return`<g transform="translate(${o(r)} ${o(i)}) scale(${a})">
    <path d="M -33 174 L 33 174 L 34 254 L 4 254 L 1.5 196 L -1.5 196 L -4 254 L -34 254 Z" fill="${h.trousers}" stroke="${e}" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M -40 268 Q -41 254 -29 253 L -5 253 Q -2.5 253 -2.5 258 L -2.5 268 Z M 40 268 Q 41 254 29 253 L 5 253 Q 2.5 253 2.5 258 L 2.5 268 Z" fill="${h.shoe}" stroke="${e}" stroke-width="2.5" stroke-linejoin="round"/>
    <rect x="-12" y="60" width="24" height="26" fill="${h.skin}" stroke="${e}" stroke-width="2.5"/>
    <path d="M -12 79 L -38 82 Q -52 85 -52 100 L -34 172 L 34 172 L 52 100 Q 52 85 38 82 L 12 79 Z" fill="${h.shirt}" stroke="${e}" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="${g}" stroke="${h.stripe}" stroke-width="4"/>
    <rect x="-34.5" y="165" width="69" height="10" fill="${h.belt}"/>
    <rect x="-6" y="165.5" width="12" height="9" rx="1.5" fill="none" stroke="#c9ccd1" stroke-width="2"/>
    <path d="M -12 79 L 12 79 L 0 103 Z" fill="${h.skin}"/>
    <path d="M -12 78 L -25 83 L -17 96 L 0 104 Z M 12 78 L 25 83 L 17 96 L 0 104 Z" fill="${h.shirt}" stroke="${e}" stroke-width="2.4" stroke-linejoin="round"/>
    <path d="M 0 104 L 0 165" stroke="${e}" stroke-width="1.5" opacity="0.45"/>
    <circle cx="0" cy="120" r="2.3" fill="${h.shirt}" stroke="${e}" stroke-width="1.5"/>
    <circle cx="0" cy="138" r="2.3" fill="${h.shirt}" stroke="${e}" stroke-width="1.5"/>
    <circle cx="0" cy="156" r="2.3" fill="${h.shirt}" stroke="${e}" stroke-width="1.5"/>
    ${l(-1,u,p,h)}
    ${l(1,f,m,h)}
    ${d(s,c,h)}
  </g>`}export{p as t};