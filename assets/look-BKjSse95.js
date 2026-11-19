import{r as e}from"./rolldown-runtime-XKyaHtl9.js";import{Sl as t,dl as n}from"./vendor-DeFEdIUd.js";var r=e(t(),1),i=e=>`teacher-game-${e}`,a=3e4,o=3e3,s=3e3,c=2800,l=2200;function u(e,t=!1){let n=Math.max(0,Math.min(1,e/a)),r=Math.round((100+900*n)/10)*10;return t?r*2:r}var d=e=>Math.max(1,Math.min(5,Math.floor(e/o)+1)),f=[`🦊`,`🐼`,`🐨`,`🐯`,`🦁`,`🐸`,`🐵`,`🐧`,`🦄`,`🐙`,`🐢`,`🦋`,`🐝`,`🐬`,`🦖`,`🐳`,`🦉`,`🐰`,`🐶`,`🐱`,`🐮`,`🐷`,`🦒`,`🦩`],p=[`#f472b6`,`#60a5fa`,`#34d399`,`#fbbf24`,`#a78bfa`,`#fb923c`,`#22d3ee`,`#f87171`,`#a3e635`,`#e879f9`,`#2dd4bf`,`#facc15`];function m(e){return Array.from(String(e||``).replace(/[\p{C}]/gu,``).replace(/\s+/g,` `).trim()).slice(0,20).join(``)}function h(e){let t=e%100;return t>=11&&t<=13?`${e}th`:`${e}${[`th`,`st`,`nd`,`rd`][e%10]||`th`}`}var g=[`🥇`,`🥈`,`🥉`],_=`teacher-game-fonts`,v=`'Baloo 2', 'Be Vietnam Pro', ui-rounded, system-ui, sans-serif`;function y(){if(document.getElementById(_))return;let e=document.createElement(`link`);e.id=_,e.rel=`stylesheet`,e.href=`https://fonts.googleapis.com/css2?family=Baloo+2:wght@500;600;700;800&display=swap`,document.head.appendChild(e)}var b=n(),x=`
.gt { position: relative; overflow: hidden; color: #fff; font-family: ${v};
  background: radial-gradient(130% 100% at 50% -10%, #6366f1 0%, #4338ca 28%, #2e1f8f 58%, #160d4d 85%, #0d0833 100%);
  -webkit-font-smoothing: antialiased; -webkit-tap-highlight-color: transparent; }
.gt *, .gt *::before, .gt *::after { box-sizing: border-box }
.gt button { font-family: inherit }
.gt-sky { position: absolute; inset: 0; container-type: size; pointer-events: none; overflow: hidden }
.gt-beams { position: absolute; left: 50%; top: -60%; width: 200cqmax; height: 200cqmax; margin-left: -100cqmax;
  background: conic-gradient(from 0deg, transparent 0 8%, rgba(255,255,255,.05) 10% 13%, transparent 15% 33%, rgba(255,255,255,.04) 35% 38%, transparent 40% 58%, rgba(255,255,255,.05) 60% 63%, transparent 65% 83%, rgba(255,255,255,.04) 85% 88%, transparent 90%);
  animation: gt-spin 90s linear infinite }
.gt-drift { position: absolute; bottom: -12cqh; line-height: 1; animation: gt-drift linear infinite; will-change: transform }
.gt-title { color: #fde047; font-weight: 800; line-height: .95; letter-spacing: -.01em;
  text-shadow: 0 .07em 0 #7c3aed, 0 .14em .3em rgba(0,0,0,.35) }
.gt-avatar { display: inline-flex; align-items: center; justify-content: center; border-radius: 999px; flex: none; line-height: 1;
  box-shadow: inset 0 -.12em 0 rgba(0,0,0,.18), 0 .08em .25em rgba(0,0,0,.25) }
.gt-avatar > span { font-size: .62em; transform: translateY(.03em) }
.gt-confetti { position: absolute; inset: 0; pointer-events: none; overflow: hidden; container-type: size; z-index: 40 }
.gt-confetti i { position: absolute; top: 0; display: block; animation-name: gt-fall; animation-timing-function: cubic-bezier(.3,.1,.6,1) }
@keyframes gt-spin { to { transform: rotate(360deg) } }
@keyframes gt-drift { 0% { transform: translateY(0) rotate(0deg) } 100% { transform: translateY(-135cqh) rotate(var(--turn, 30deg)) } }
@keyframes gt-fall { 0% { transform: translate3d(0, -8cqh, 0) rotate(0deg) } 100% { transform: translate3d(var(--sway), 112cqh, 0) rotate(var(--rot)) } }
@keyframes gt-pop { 0% { opacity: 0; transform: scale(.3) } 60% { opacity: 1; transform: scale(1.12) } 100% { opacity: 1; transform: scale(1) } }
@keyframes gt-rise { 0% { opacity: 0; transform: translateY(1.2em) } 100% { opacity: 1; transform: none } }
@keyframes gt-bob { 0%, 100% { transform: translateY(0) rotate(-4deg) } 50% { transform: translateY(-.12em) rotate(4deg) } }
@keyframes gt-shake { 0%, 100% { transform: translateX(0) } 20%, 60% { transform: translateX(-.5em) } 40%, 80% { transform: translateX(.5em) } }
@keyframes gt-pulse { 0%, 100% { transform: scale(1) } 50% { transform: scale(1.08) } }
@keyframes gt-stamp { 0% { opacity: 0; transform: scale(2.4) rotate(-8deg) } 55% { opacity: 1; transform: scale(.92) rotate(-2deg) } 78% { transform: scale(1.04) rotate(-2deg) } 100% { opacity: 1; transform: scale(1) rotate(-2deg) } }
@keyframes gt-blink { 0%, 100% { opacity: 1 } 50% { opacity: .35 } }
@keyframes gt-glow { 0%, 100% { box-shadow: 0 0 0 .12em rgba(253,224,71,.0), 0 .3em 0 #b45309 } 50% { box-shadow: 0 0 0 .3em rgba(253,224,71,.45), 0 .3em 0 #b45309 } }
.gt-pop { animation: gt-pop .45s cubic-bezier(.2,.9,.3,1.3) both }
.gt-rise { animation: gt-rise .5s ease-out both }
.gt-bob { display: inline-block; animation: gt-bob 2.4s ease-in-out infinite }
.gt-shake { animation: gt-shake .45s ease-in-out both }
.gt-pulse { animation: gt-pulse .9s ease-in-out infinite }
.gt-stamp { animation: gt-stamp .6s cubic-bezier(.2,.9,.3,1.2) both }
.gt-blink { animation: gt-blink 1.2s ease-in-out infinite }
@media (prefers-reduced-motion: reduce) {
  .gt-beams, .gt-drift, .gt-bob, .gt-pulse, .gt-blink { animation: none }
}
`;function S(e){let t=e>>>0;return()=>{t=t+1831565813>>>0;let e=t;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}}var C=[`📚`,`✏️`,`🎨`,`🔬`,`🌍`,`🎵`,`⚽`,`💡`,`⭐`,`🧠`,`🎒`,`📐`,`🍎`,`🎉`,`❓`,`😄`];function w({count:e=16}){let t=(0,r.useMemo)(()=>{let t=S(7);return Array.from({length:e},(n,r)=>{let i=26+t()*30;return{e:C[r%C.length],left:`${r/e*100+t()*(100/e)}%`,size:`${4+t()*5}cqmin`,dur:`${i}s`,delay:`${-t()*i}s`,turn:`${(t()-.5)*80}deg`,opacity:.07+t()*.07}})},[e]);return(0,b.jsxs)(`div`,{className:`gt-sky`,"aria-hidden":`true`,children:[(0,b.jsx)(`div`,{className:`gt-beams`}),t.map((e,t)=>(0,b.jsx)(`span`,{className:`gt-drift`,style:{left:e.left,fontSize:e.size,animationDuration:e.dur,animationDelay:e.delay,opacity:e.opacity,"--turn":e.turn},children:e.e},t))]})}var T=[`#fde047`,`#f472b6`,`#60a5fa`,`#34d399`,`#a78bfa`,`#fb923c`,`#ffffff`];function E({count:e=110,rain:t=!1,seed:n=1}){let i=(0,r.useMemo)(()=>{let r=S(n*97+e);return Array.from({length:e},()=>{let e=.7+r()*1.1,n=r()<.3;return{left:`${r()*100}%`,width:`${e}cqmin`,height:`${n?e:e*(1.6+r())}cqmin`,radius:n?`999px`:`2px`,color:T[Math.floor(r()*T.length)],dur:`${(t?5:2.6)+r()*2.4}s`,delay:`${t?-r()*7:r()*.5}s`,sway:`${(r()-.5)*30}cqw`,rot:`${(r()-.5)*1440}deg`}})},[e,t,n]);return(0,b.jsx)(`div`,{className:`gt-confetti`,"aria-hidden":`true`,children:i.map((e,n)=>(0,b.jsx)(`i`,{style:{left:e.left,width:e.width,height:e.height,borderRadius:e.radius,background:e.color,animationDuration:e.dur,animationDelay:e.delay,animationIterationCount:t?`infinite`:1,animationFillMode:t?`none`:`both`,"--sway":e.sway,"--rot":e.rot}},n))})}function D({emoji:e,color:t,size:n,className:r=``,style:i}){return(0,b.jsx)(`span`,{className:`gt-avatar ${r}`,style:{width:n,height:n,fontSize:n,background:t,...i},children:(0,b.jsx)(`span`,{children:e})})}export{d as _,f as a,s as c,l as d,i as f,u as g,h,E as i,g as l,y as m,x as n,p as o,m as p,w as r,c as s,D as t,a as u};