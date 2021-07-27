var e=Object.defineProperty,t=Object.defineProperties,n=Object.getOwnPropertyDescriptors,r=Object.getOwnPropertySymbols,a=Object.prototype.hasOwnProperty,o=Object.prototype.propertyIsEnumerable,i=(t,n,r)=>n in t?e(t,n,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[n]=r,l=(e,t)=>{for(var n in t||(t={}))a.call(t,n)&&i(e,n,t[n]);if(r)for(var n of r(t))o.call(t,n)&&i(e,n,t[n]);return e};import{v as s,n as c,r as p,_ as d,R as u,G as m,S as g,a as h,A as x,c as f,b,q as y,$ as v,s as E,d as w,e as k}from"./vendor.930f83b5.js";const $=p.exports.createContext(),C=({children:e})=>{const[t,n]=p.exports.useState(""),[r,a]=d("color","rebeccapurple"),[o,i]=d("screenFilter","lcd");return u.createElement($.Provider,{value:{color:r,setColor:a,screenFilter:o,setScreenFilter:i,menu:t,setMenu:n}},e)},z=()=>{const{color:e,setColor:t,screenFilter:n,setScreenFilter:r,menu:a,setMenu:o}=p.exports.useContext($);return{color:e,setColor:t,screenFilter:n,setScreenFilter:r,menu:a,setMenu:o}},R=p.exports.createContext(),S=({children:e})=>{z();const t=p.exports.useRef(),n=p.exports.useRef(),[r,a]=p.exports.useState(""),[o,i]=d("currentGame",""),[l,s]=d("muted",!1),[c,g]=p.exports.useState(null),[h,x]=p.exports.useState(null),[f,b]=p.exports.useState(!1),[y,v]=p.exports.useState(!1),[E,w]=p.exports.useState(!1),[k,$]=p.exports.useState(!1),[C,S]=p.exports.useState(!0);p.exports.useEffect((()=>{f||(t.current=new m(n.current,{mediaStreamWorkerSrc:"/media-stream-worker.js",soundVolume:l?0:.5}),b(!0))}),[f]),p.exports.useEffect((()=>{const e=r||o;e&&!y?(t.current.loadFreeze(e).then((e=>{g(e||!1)})),t.current.loadFreezeScreen(e).then((e=>{x(e||!1)}))):e||(g(!1),x(!1))}),[o,r,y]),p.exports.useEffect((()=>{o&&!r&&c&&h&&!y&&!E&&w(!0)}),[o,r,c,h,y,E]),p.exports.useEffect((()=>{y&&i(t.current.core.name)}),[y]),p.exports.useEffect((()=>{f&&(l?t.current.setVolume(0):t.current.setVolume(.5))}),[l]),p.exports.useEffect((()=>{}),[y,E]);const P=p.exports.useCallback((async()=>{const e="hidden"===document.visibilityState;e&&y&&!E&&await t.current.autoFreeze(),$(e)}),[y,E]),L=p.exports.useCallback((async()=>{y&&!E&&await t.current.autoFreeze(),S(!1)}),[y,E]),M=p.exports.useCallback((()=>{S(!0)}),[]);return p.exports.useEffect((()=>(document.addEventListener("visibilitychange",P),window.addEventListener("blur",L),window.addEventListener("focus",M),()=>{document.removeEventListener("visibilitychange",P),window.removeEventListener("blur",L),window.removeEventListener("focus",M)})),[y,E]),u.createElement(R.Provider,{value:{playerRef:t,screenCanvasRef:n,initialized:f,currentGame:o,setCurrentGame:i,loadedGame:r,setLoadedGame:a,freeze:c,setFreeze:g,freezeScreen:h,setFreezeScreen:x,playing:y,setPlaying:v,paused:E,setPaused:w,muted:l,setMuted:s}},e)},P=()=>{const{playerRef:e,screenCanvasRef:t,initialized:n,currentGame:r,setCurrentGame:a,loadedGame:o,setLoadedGame:i,freeze:l,freezeScreen:s,playing:c,setPlaying:d,paused:u,setPaused:m,muted:g,setMuted:h}=p.exports.useContext(R),x=t=>e.current.openROM(t).then((()=>{i(e.current.core.name),e.current.saveROM(e.current.core.name,t)})),f=()=>{e.current.start(),d(!0),m(!1)};return{playerRef:e,screenCanvasRef:t,initialized:n,openROM:x,currentGame:r,loadedGame:o,start:f,pause:()=>e.current.pause().then((()=>m(!0))),unPause:()=>{e.current.run(),d(!0),m(!1)},resume:()=>{e.current.resume(l),d(!0),m(!1)},stop:()=>{a(""),i(""),d(!1),m(!1)},restart:()=>(e.current.core.reset(),e.current.loadROM(o||r).then(x).then(f)),mute:()=>h(!0),unMute:()=>h(!1),playing:c,paused:u,muted:g,freeze:l,freezeScreen:s,getSRAM:()=>e.current.loadSRAM(o||r),setSRAM:t=>e.current.saveSRAM(r,t)}},L=p.exports.createContext(),M=({children:e})=>{const{playerRef:r}=P(),a=F.reduce(((e,r)=>{return a=l({},e),o={[r.group]:p.exports.useRef()},t(a,n(o));var a,o}),{}),[o,i]=p.exports.useState([]),[s,c]=p.exports.useState([]),[d,m]=p.exports.useState([]);p.exports.useEffect((()=>{const e=o.reduce(((e,t)=>{const n=t.clientX,r=t.clientY,o=new g.Circle(new g.Vector(n,r),25);for(let i=0;i<F.length;i++){const t=F[i],n=a[t.group].current;if(!n)continue;const r=n.firstElementChild,l=t.controls,s=r.getBoundingClientRect(),c=s.x,p=s.y;for(let a=0;a<l.length;a++){const t=l[a],n=c+t.pos.x/2,r=p+t.pos.y/2,i=t.pos.r/2;if("circle"===t.type){const a=new g.Circle(new g.Vector(n,r),i);g.testCircleCircle(o,a)&&e.push(t.name)}else if("pill"===t.type){const a=new g.Box(new g.Vector(n,r),t.pos.w/2,t.pos.h/2).toPolygon();g.testPolygonCircle(a,o)&&e.push(t.name)}}}return e}),[]),t=s.map((e=>O[e])),n=h.uniq(e.concat(t));r.current&&!h.isEqual(n,d)&&(h.difference(n,d).forEach((e=>r.current.buttonDown(e))),h.difference(d,n).forEach((e=>r.current.buttonUp(e)))),m(n)}),[o,s]);const x=p.exports.useCallback((e=>{e.target.matches('[data-screen], [data-screen] *, [role="listbox"], [role="listbox"] *')||e.preventDefault(),e.changedTouches&&e.changedTouches.length&&i((t=>[...t,...e.changedTouches]))}),[]),f=p.exports.useCallback((e=>{i((t=>{let n=t.slice(0);for(let r=0;r<e.changedTouches.length;r++){const t=e.changedTouches[r];n=n.map((e=>e.identifier===t.identifier?t:e))}return n}))}),[]),b=p.exports.useCallback((e=>{const t=h.map(e.changedTouches,(e=>e.identifier));i((e=>e.filter((e=>!t.includes(e.identifier)))))}),[]),y=p.exports.useCallback((e=>{c((t=>t.includes(e.keyCode)?t:h.uniq([...t,e.keyCode])))}),[]),v=p.exports.useCallback((e=>{c((t=>t.includes(e.keyCode)?h.filter(t,(t=>t!==e.keyCode)):t))}),[]),E=p.exports.useCallback((()=>i([])),[]),w=p.exports.useCallback((e=>e.preventDefault()),[]);return p.exports.useEffect((()=>(document.addEventListener("touchstart",x,{passive:!1}),document.addEventListener("touchmove",f),document.addEventListener("touchend",b),document.addEventListener("touchcancel",b),window.addEventListener("keydown",y),window.addEventListener("keyup",v),window.addEventListener("resize",E),window.addEventListener("gesturestart",w),window.addEventListener("gestureend",w),()=>{document.removeEventListener("touchstart",x),document.removeEventListener("touchmove",f),document.removeEventListener("touchend",b),document.removeEventListener("touchcancel",b),window.removeEventListener("keydown",y),window.removeEventListener("keyup",v),window.removeEventListener("resize",E),window.removeEventListener("gesturestart",w),window.removeEventListener("gestureend",w)})),[]),u.createElement(L.Provider,{value:{groupRefs:a,pressed:d}},e)},F=[{group:"actions",position:"right",size:{width:300,height:300},controls:[{name:"a",type:"circle",pos:{x:225,y:112.5,r:75}},{name:"b",type:"circle",pos:{x:75,y:225,r:75}}]},{group:"options",position:"bottom",size:{width:230,height:30},controls:[{name:"start",type:"pill",pos:{x:130,y:0,w:100,h:30}},{name:"select",type:"pill",pos:{x:0,y:0,w:100,h:30}}]},{group:"dpad",position:"left",size:{width:300,height:300},controls:[{name:"up",type:"circle",pos:{x:150,y:50,r:50}},{name:"down",type:"circle",pos:{x:150,y:250,r:50}},{name:"left",type:"circle",pos:{x:50,y:150,r:50}},{name:"right",type:"circle",pos:{x:250,y:150,r:50}}]}],O={13:"start",16:"select",38:"up",87:"up",39:"right",68:"right",40:"down",83:"down",37:"left",65:"left",32:"a",18:"a",76:"a",88:"a",186:"b",222:"a",17:"b",90:"b",91:"b",93:"b",75:"b",191:"a",188:"a",190:"b",77:"b"},G=e=>b[e],A=e=>new f.rgb(G(e)),j=e=>{const t=A(e);return{background:t.hsl().string(),light:t.lighten(.25).hsl().string(),dark:t.darken(.25).hsl().string()}},N=e=>{const t=A(e);return x`
    background: linear-gradient(
      to top,
      ${t.darken(.25).hsl().string()} 25%,
      ${t.hsl().string()}
    );
    box-shadow: 0 0.5rem 1rem ${t.alpha(.25).hsl().string()};
  `},D=y.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`,B=y.div`
  flex: 1;

  ${e=>!e.menu&&!!e.paused&&x`
      display: flex;
      flex-direction: column;
      justify-content: center;
    `}
`,I=y.div`
  display: flex;
  justify-content: space-between;
`,T=y.h2`
  font-weight: normal;
  font-size: 1rem;
  font-family: sans-serif;
  text-align: center;
  color: white;
`,U=x`
  appearance: none;
  width: 100%;
  padding: 0.5rem;
  margin: 0;
  font-size: 1.25rem;
  border: 0;
  border-radius: 4px;
`,V=y.input`
  ${U}
  ${N("white")}
`,q=y.button`
  ${U}
  position: relative;
  ${N("black")}
  background: linear-gradient(
    to top,
    ${A("lightgray").darken(.25).hsl().string()} 25%,
    ${A("lightgray").hsl().string()}
  );
  border: 1px solid gray;
  ${""}
  border-left-color: gray;
  border-top-color: gray;
  color: hsl(0,0%,40%);
  text-shadow: -1px -1px 0 hsla(0,0%,5%,0.25);

  &::before {
    display: none;
    content: '';
    position: absolute;
    top: -1px;
    bottom: -3px;
    left: -1px;
    right: -1px;
    background: gray;
    border: 1px solid transparent;
    border-bottom: 3px solid gray;
    border-radius: inherit;
    z-index: -1;
  }

  &:active {
    box-shadow: none;
    box-shadow: 0 0 1rem ${A("black").alpha(.25).hsl().string()};
    transform: scale(0.99);

    &:before {
      display: none;
    }
  }
`,_=y(V).attrs({as:"select"})``,W=y.input`
  display: none;
`,Y=y.div`
  ${e=>e.horizontal&&x`
      display: flex;
      margin: 0 -0.5rem;
      margin-bottom: 1.5rem;

      ${V} {
        margin: 0 0.5rem;
      }
    `}

  ${e=>!e.horizontal&&x`
      ${V} {
        margin-bottom: 1.5rem;
      }
    `}
`;y(q)`
  display: inline-block;
  width: auto;
  height: auto;
  margin: 0;
  margin-left: 0.5rem;
`;const K=y.label`
  position: relative;
  display: inline-block;
  vertical-align: middle;
`,X=y.input`
  position: absolute;
  top: 0;
  left: 0;
  visibility: hidden;
  width: 0;
  height: 0;
`,H=y(q).attrs({as:"span"})`
  display: inline-block;
  width: auto;
  margin: 0;
  vertical-align: middle;

  input:checked + & {
    ${N("orange")}
  }
`,J=y.span`
  display: inline-block;
  margin: 0 0.5rem;
  font-family: sans-serif;
  vertical-align: middle;
  color: hsla(0,0%,100%,0.5);
`,Q=y.a`
  cursor: default;
`,Z=e=>new Promise(((t,n)=>{const r=new FileReader,a=new Blob([new Uint8Array(e)],{type:"application/octet-binary"});r.onload=e=>{t(e.target.result)},r.readAsDataURL(a)})),ee=({onChange:e,label:t,accept:n,inputRef:r})=>{const a=p.exports.useRef();return u.createElement("div",{onClick:e=>e.stopPropagation()},u.createElement(q,{fullWidth:!0,variant:"contained",onClick:e=>{r?r.current.click():a.current.click()}},t),u.createElement(W,{type:"file",accept:n,ref:r||a,onChange:t=>{return(n=t.target,new Promise(((e,t)=>{try{if(n.files.length>0){const t=new FileReader;t.addEventListener("load",(()=>{2===t.readyState&&e(t.result)})),t.readAsBinaryString(n.files[0])}else t()}catch(r){t(r)}}))).then(e);var n}}))},te=({onChange:e})=>{const{initialized:t,playerRef:n,loadedGame:r,openROM:a}=P(),[o,i]=p.exports.useState(!1),[l,s]=p.exports.useState([]),[c,d]=p.exports.useState(""),m=p.exports.useRef(),g=()=>{t&&n.current.getStorageKeys().then((e=>{const t=e.filter((e=>0===e.indexOf("ROM_"))).map((e=>e.slice("ROM_".length)));s(t),i(!0)}))};return p.exports.useEffect(g,[t]),p.exports.useEffect((()=>{c&&("add"===c?m.current.click():n.current.loadROM(c).then(a))}),[c]),o?u.createElement(u.Fragment,null,u.createElement(ee,{inputRef:m,accept:".gb,.gbc",label:"Add ROM File",onChange:e=>a(e).then(g)}),!!l.length&&u.createElement(_,{value:r,onChange:e=>{d(e.target.value||"")}},u.createElement("option",{key:"game-select"},"Select game"),l.map((e=>u.createElement("option",{key:`game-${e}`,value:e},e))),u.createElement("option",{value:"add"},"Add"))):null},ne=()=>{const{playerRef:e,initialized:t,loadedGame:n,freeze:r,openROM:a,start:o,restart:i,resume:l}=P();return z(),u.createElement(u.Fragment,null,u.createElement(Y,null,u.createElement(te,null)),!(!t||!n)&&u.createElement(Y,{horizontal:!0},u.createElement(q,{onClick:t=>{t.stopPropagation(),e.current.runInterval?i():o()}},"Start"),!!r&&u.createElement(q,{onClick:e=>{e.stopPropagation(),l()}},"Resume")))},re=()=>{const{restart:e,stop:t}=P(),{setMenu:n}=z();return u.createElement(u.Fragment,null,u.createElement(T,null,"Paused - Tap screen to resume"),u.createElement(Y,{horizontal:!0},u.createElement(q,{onClick:t=>{t.stopPropagation(),e()}},"Restart"),u.createElement(q,{onClick:e=>{e.stopPropagation(),t()}},"Change ROM")),u.createElement(q,{onClick:e=>{e.stopPropagation(),n("save")}},"Manage Save"))},ae=()=>{const e=p.exports.useRef(),[t,n]=p.exports.useState(""),{currentGame:r,loadedGame:a,getSRAM:o}=P();p.exports.useEffect((()=>{o().then(Z).then((e=>{n(e)}))}),[]);const i=p.exports.useCallback((t=>{t.stopPropagation(),t.preventDefault(),e.current.click()}),[]),l=p.exports.useCallback((e=>{e.stopPropagation()}),[]);return u.createElement(u.Fragment,null,u.createElement(q,{fullWidth:!0,variant:"contained",onClick:i,disabled:!t},"Export Save File"),u.createElement("a",{download:`${a||r}.sav`,href:t,onClick:l,ref:e,style:{display:"none"}},"Download"))},oe=()=>{const{restart:e,setSRAM:t}=P();return u.createElement(ee,{label:"Import Save File",accept:".sav",onChange:n=>{const r=(e=>{const t=new ArrayBuffer(e.length),n=new Uint8Array(t);for(let r=0;r<e.length;r++)n[r]=e.charCodeAt(r);return t})(n),a=(e=>{try{if(!e||!e.length)return[];for(var t=[],n=0;n<e.length;++n)t[n]=e[n];return t}catch(r){return console.log("Conversion from a typed array failed: "+r.message),e}})(new Uint8Array(r));window.confirm("Replace current save file?")&&t(a).then(e)}})},ie=()=>{const{loadedGame:e,currentGame:t}=P(),{setMenu:n}=z(),r=e||t;return p.exports.useEffect((()=>{r||n("")}),[e,t]),u.createElement(u.Fragment,null,u.createElement(T,null,r,".sav"),u.createElement(Y,null,u.createElement(oe,null),u.createElement(ae,null)))},le=[{Purple:"rebeccapurple"},{Pink:"deeppink"},{Red:"crimson"},{Yellow:"gold"},{Lime:"limegreen"},{Green:"seagreen"},{Teal:"teal"},{Ice:"deepskyblue"},{Blue:"mediumblue"},{Silver:"lightsteelblue"},{Black:"black"}],se=()=>{const{color:e,setColor:t,screenFilter:n,setScreenFilter:r}=z();return u.createElement(Y,{onClick:e=>e.stopPropagation()},u.createElement(_,{onChange:e=>t(e.target.value),value:e},le.map((e=>{const[t]=Object.keys(e),[n]=Object.values(e);return u.createElement("option",{key:`color-option-${n}`,value:n},t)}))),u.createElement(_,{onChange:e=>r(e.target.value),value:n},u.createElement("option",{value:"none"},"None"),u.createElement("option",{value:"lcd"},"LCD")))},ce=y.i`
  display: block;
`,pe=({name:e,className:t=""})=>u.createElement(ce,{className:`material-icons ${t}`.trim()},e),de=()=>{const{muted:e,mute:t,unMute:n}=P();return u.createElement(K,{onClick:e=>e.stopPropagation()},u.createElement(X,{type:"checkbox",name:"mute",checked:!!e,onChange:e=>{e.target.checked?t():n()}}),u.createElement(H,{tabIndex:"0"},u.createElement(pe,{name:e?"volume_off":"volume_up"})),u.createElement(J,null,"Mute"))},ue=()=>{const{setMenu:e}=z();return u.createElement(Q,{onClick:t=>{t.stopPropagation(),e("settings")}},u.createElement(J,null,"Settings"),u.createElement(H,{tabIndex:"0"},u.createElement(pe,{name:"settings"})))},me=()=>{const{paused:e}=P(),{menu:t,setMenu:n}=z();return u.createElement(D,null,u.createElement(B,{menu:t,paused:e},!t&&e?u.createElement(re,null):u.createElement(u.Fragment,null,!t&&u.createElement(ne,null),"settings"===t&&u.createElement(se,null),"save"===t&&u.createElement(ie,null))),u.createElement(I,null,t?u.createElement(q,{onClick:e=>{e.stopPropagation(),n("")}},"Back"):null,!t&&u.createElement(de,null),!t&&u.createElement(ue,null)))},ge=v`
  body {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    margin: 0;

    ${({colorName:e})=>{const[t,n,r]=G(e);return x`
        background: rgb(${t}, ${n}, ${r});
      `}}
  }
`,he=(e="rebeccapurple")=>new Promise(((t,n)=>E(((e="rebeccapurple")=>{const[t,n,r]=G(e);return`\n    <svg width="512" height="512" xmlns="http://www.w3.org/2000/svg">\n      <rect width="100%" height="100%" fill="rgb(${t},${n},${r})"/>\n      <ellipse ry="80" rx="80" cy="108" cx="256" fill="#000"/>\n      <ellipse ry="80" rx="80" cy="256" cx="108" fill="#000"/>\n      <ellipse ry="80" rx="80" cy="256" cx="404" fill="#000"/>\n      <ellipse ry="80" rx="80" cy="404" cx="256" fill="#000"/>\n    </svg>\n  `})(e),((e,r)=>e?n(e):t((e=>{var t=document.createElement("canvas");return t.width=512,t.height=512,t.getContext("2d").drawImage(e,0,0),t.toDataURL()})(r)))))),xe="(min-width: 850px) and (min-height: 500px)",fe="(min-width: 1020px) and (min-height: 650px)",be="(min-height: 800px) and (min-width: 650px) and (max-width: 1024px)",ye=y.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  ${e=>"left"===e.position&&x`
      order: 1;

      @media ${be} {
        margin-left: 48px;
      }
    `}

  ${e=>"right"===e.position&&x`
      order: 2;

      @media ${be} {
        margin-right: 48px;
      }
    `}

  ${e=>"bottom"===e.position&&x`
      order: 3;
      align-self: center;
      margin: 0 auto;
      width: 100%;
    `}

  @media (min-width: 636px) {
    ${e=>"left"===e.position&&x`
        order: 0;
      `}

    ${e=>"bottom"===e.position&&x`
        align-self: bottom;
      `}
  }
`,ve=y.div`
  position: relative;
  display: block;

  ${e=>x`
    width: ${e.width/2}px;
    height: ${e.height/2}px;
  `}
`,Ee=y.span`
  position: absolute;
  display: block;
  z-index: -1;
  background: linear-gradient(
    -30deg,
    hsla(0, 0%, 0%, 0.5) 25%,
    hsla(0, 0%, 0%, 0)
  );
  overflow: hidden;

  ${({colorName:e,pressed:t})=>{const n=j(e);return x`
      box-shadow: 4px 4px 12px 2px ${n.dark},
        -4px -4px 12px 2px ${n.light};

      ${t&&x`
        box-shadow: 4px 4px 12px 2px ${n.light},
          -4px -4px 12px 2px ${n.dark}, inset 0 0 8px hsla(0, 0%, 0%, 0.5);
      `}
    `}}

  &:before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    border-radius: inherit;
  }

  ${e=>"circle"===e.type&&x`
      top: ${(e.pos.y-e.pos.r)/e.size.height*100}%;
      left: ${(e.pos.x-e.pos.r)/e.size.width*100}%;
      width: ${e.pos.r/(e.size.width/2)*100}%;
      height: ${e.pos.r/(e.size.height/2)*100}%;
      border-radius: 100%;
    `}

  ${e=>"pill"===e.type&&x`
      top: ${e.pos.y/e.size.height*100}%;
      left: ${e.pos.x/e.size.width*100}%;
      width: ${e.pos.w/e.size.width*100}%;
      height: ${e.pos.h/e.size.height*100}%;
      border-radius: ${e.pos.h/2}px;
    `}
`,we=({controls:e,group:t,size:n,position:r})=>{const{groupRefs:a,pressed:o}=(()=>{const{groupRefs:e,pressed:t}=p.exports.useContext(L);return{groupRefs:e,pressed:t}})(),{color:i}=z();return u.createElement(ye,{ref:a[t],position:r},u.createElement(ve,l({},n),e.map((e=>u.createElement(Ee,l({colorName:i,key:`control-outline-${e.name}`,size:n,pressed:o.includes(e.name)},e))))))},ke="rgba(0,0,0,0.1125)",$e=y.div`
  display: flex;
  justify-content: center;
  position: relative;
  width: 100%;
  order: 0;

  @media ${"(min-width: 680px)"} {
    width: auto;
    order: 1;
  }

  @media ${be} {
    width: 100%;
    order: 0;
  }
`,Ce=y.div`
  position: relative;
  width: 320px;
  height: 288px;
  border: 8px solid hsla(0, 0%, 0%, 0);
  border-bottom-width: 32px;
  border-radius: 8px;
  box-sizing: content-box;
  z-index: 1;

  ${({colorName:e})=>{const t=j(e);return x`
      background: ${t.background};
      box-shadow: 4px 4px 12px 2px ${t.dark},
        -4px -4px 12px 2px ${t.light};
    `}}

  @media (max-width: 336px) {
    margin-left: -8px;
    margin-right: -8px;
  }

  @media ${xe}, ${be} {
    width: 480px;
    height: 432px;
  }

  @media ${fe} {
    width: 640px;
    height: 576px;
  }

  ${e=>(e.playing||e.paused)&&x`
      ${""}
      overflow: hidden;
    `}

  ${e=>!e.playing&&!e.paused&&x`
      ${""}
    `}
`,ze=y.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  padding: 16px;
  z-index: 3;
  background: hsla(0, 0%, 0%, 0);
`,Re=y.span`
  display: none;
  position: absolute;
  top: -1px;
  bottom: -1px;
  left: -1px;
  right: -1px;
  z-index: 2;
  pointer-events: none;
  transform: translate3d(0, 0, 0);

  ${e=>e.playing&&x`
      display: block;
    `}

  ${e=>"lcd"===e.filter&&x`
      background-position: 1px 1px;
      background-size: 2px 2px;
      background-image: linear-gradient(
          ${ke},
          ${ke} 25%,
          transparent 25%,
          transparent 75%,
          ${ke} 75%,
          ${ke}
        ),
        linear-gradient(
          90deg,
          ${ke},
          ${ke} 25%,
          transparent 25%,
          transparent 75%,
          ${ke} 75%,
          ${ke}
        );

      @media ${xe}, ${be} {
        background-size: 3px 3px;
      }

      @media ${fe} {
        background-size: 4px 4px;
      }

      @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
        top: -2px;
        right: -100%;
        left: -2px;
        bottom: -100%;
        margin-top: 1px;
        margin-left: 1px;
        transform: scale(0.5);
        transform-origin: 1px 1px;
        background-size: 4px 4px;

        @media ${xe} {
          background-size: 6px 6px;
        }

        @media ${fe} {
          background-size: 8px 8px;
        }
      }
    `}
`,Se=y.canvas`
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  /* stylelint-disable value-no-vendor-prefix */
  image-rendering: -moz-crisp-edges;
  image-rendering: -webkit-crisp-edges;
  image-rendering: pixelated;
  image-rendering: crisp-edges;
  /* stylelint-enable */
  pointer-events: none;
  opacity: 0;

  ${e=>e.playing&&x`
      opacity: 1;
    `}

  ${e=>e.paused&&x`
      opacity: 0.1;
    `}
`,Pe=y.h1`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  margin: 0;
  color: black;
  text-align: center;
  line-height: 32px;
  font-size: 1rem;
  font-style: italic;
  font-family: sans-serif;
  font-weight: bold;
  text-transform: uppercase;
  opacity: 0.5;
  z-index: 1;
`,Le=({children:e})=>{const{screenCanvasRef:t,freezeScreen:n,currentGame:r,playing:a,paused:o,pause:i,unPause:l,resume:s}=P(),{color:c,screenFilter:d}=z();let m;return p.exports.useEffect((()=>{n&&o&&!a&&t.current&&t.current.getContext("2d").putImageData(n,0,0)}),[a,o,n]),a?m=o?l:i:o&&(m=s),u.createElement($e,null,u.createElement(Ce,{"data-screen":!0,colorName:c,onClick:m,paused:o,playing:a},(!a||o)&&u.createElement(ze,null,e),u.createElement(Re,{filter:d,playing:a||!!r&&!!n,paused:o}),u.createElement(Se,{ref:t,width:"160",height:"144",paused:o,playing:a})),u.createElement(Pe,null,"Gamer Pocket"))},Me=y.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  align-content: space-evenly;
  justify-content: space-around;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  padding-left: env(safe-area-inset-left);
  padding-right: env(safe-area-inset-left);

  @media ${be} {
    justify-content: space-between;
  }
`,Fe=({children:e})=>{const[t,n]=p.exports.useState(""),{color:r}=z();return p.exports.useEffect((()=>{he(r).then((e=>{n(e)}))}),[r]),p.exports.useEffect((()=>{const e=document.querySelector("#app-icon");e&&e.parentNode.removeChild(e);const n=document.createElement("link");n.setAttribute("id","app-icon"),n.setAttribute("rel","apple-touch-icon"),n.setAttribute("href",t),document.head.appendChild(n)}),[t]),u.createElement(w,{theme:{colorName:r}},u.createElement(ge,{colorName:r}),u.createElement(Me,null,u.createElement(Le,null,e),F.map((e=>u.createElement(we,l({key:`controls-${e.group}`},e))))))},Oe=()=>u.createElement(C,null,u.createElement(S,null,u.createElement(M,null,u.createElement(Fe,null,u.createElement(me,null)))));k.render(u.createElement(u.StrictMode,null,u.createElement(Oe,null)),document.getElementById("app")),function(e={}){const{immediate:t=!1,onNeedRefresh:n,onOfflineReady:r}=e;let a,o;if("serviceWorker"in navigator){a=new s("/sw.js",{scope:"/"}),a.addEventListener("activated",(e=>{e.isUpdate||null==r||r()}));{const e=()=>{null==n||n()};a.addEventListener("waiting",e),a.addEventListener("externalwaiting",e)}a.register({immediate:t}).then((e=>o=e))}}();
