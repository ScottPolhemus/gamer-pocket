var Le=Object.defineProperty,Be=Object.defineProperties;var Ge=Object.getOwnPropertyDescriptors;var fe=Object.getOwnPropertySymbols;var Fe=Object.prototype.hasOwnProperty,Ie=Object.prototype.propertyIsEnumerable;var he=(e,t,r)=>t in e?Le(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,_=(e,t)=>{for(var r in t||(t={}))Fe.call(t,r)&&he(e,r,t[r]);if(fe)for(var r of fe(t))Ie.call(t,r)&&he(e,r,t[r]);return e},te=(e,t)=>Be(e,Ge(t));import{v as Te,n as Ae,r as n,u as K,G as De,S as F,_ as I,C as g,c as Ne,a as Oe,s as m,W as Ue,b as je,R as j,F as Ve,d as We}from"./vendor.6947c76c.js";const Ye=function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))o(s);new MutationObserver(s=>{for(const a of s)if(a.type==="childList")for(const l of a.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&o(l)}).observe(document,{childList:!0,subtree:!0});function r(s){const a={};return s.integrity&&(a.integrity=s.integrity),s.referrerpolicy&&(a.referrerPolicy=s.referrerpolicy),s.crossorigin==="use-credentials"?a.credentials="include":s.crossorigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function o(s){if(s.ep)return;s.ep=!0;const a=r(s);fetch(s.href,a)}};Ye();function _e(e={}){const{immediate:t=!1,onNeedRefresh:r,onOfflineReady:o}=e;let s,a;const l=async(i=!0)=>{i&&(s==null||s.addEventListener("controlling",p=>{p.isUpdate&&window.location.reload()})),a&&a.waiting&&await Ae(a.waiting,{type:"SKIP_WAITING"})};if("serviceWorker"in navigator){s=new Te("https://polhem.us/gamer-pocket/sw.js",{scope:"https://polhem.us/gamer-pocket/"}),s.addEventListener("activated",i=>{i.isUpdate||o==null||o()});{const i=()=>{r==null||r()};s.addEventListener("waiting",i),s.addEventListener("externalwaiting",i)}s.register({immediate:t}).then(i=>a=i)}return l}const we=n.exports.createContext(null),He=({children:e})=>{const t=n.exports.useRef(null),r=n.exports.useRef(null),[o,s]=n.exports.useState(""),[a,l]=K("currentGame",""),[i,p]=K("muted",!1),[v,y]=n.exports.useState(null),[u,k]=n.exports.useState(null),[b,P]=n.exports.useState(!1),[x,d]=n.exports.useState(!1),[c,w]=n.exports.useState(!1),[E,$]=n.exports.useState(!1),[N,Y]=n.exports.useState(!0);n.exports.useEffect(()=>{if(!b){if(!r.current)throw new Error("Missing screen canvas");t.current=new De(r.current,{mediaStreamWorkerSrc:"https://polhem.us/gamer-pocket/media-stream-worker.js",soundVolume:i?0:.5}),P(!0)}},[b]),n.exports.useEffect(()=>{const M=o||a;if(M&&!x){if(!t.current)throw new Error("Missing GameBoyPlayer instance");t.current.loadFreeze(M).then(h=>{y(h||null)}),t.current.loadFreezeScreen(M).then(h=>{k(h||null)})}else M||(y(null),k(null))},[a,o,x]),n.exports.useEffect(()=>{a&&!o&&v&&u&&!x&&!c&&w(!0)},[a,o,v,u,x,c]),n.exports.useEffect(()=>{if(x){if(!t.current)throw new Error("Missing GameBoyPlayer instance");if(!t.current.core.name)throw new Error("Missing ROM name from GameBoyCore");l(t.current.core.name)}},[x]),n.exports.useEffect(()=>{if(b){if(!t.current)throw new Error("Missing GameBoyPlayer instance");i?t.current.setVolume(0):t.current.setVolume(.5)}},[i]),n.exports.useEffect(()=>{},[x,c]);const O=n.exports.useCallback(async()=>{const M=document.visibilityState==="hidden";if(M&&x&&!c){if(!t.current)throw new Error("Missing GameBoyPlayer instance");await t.current.autoFreeze()}$(M)},[x,c]),D=n.exports.useCallback(async()=>{if(x&&!c){if(!t.current)throw new Error("Missing GameBoyPlayer instance");await t.current.autoFreeze()}Y(!1)},[x,c]),U=n.exports.useCallback(()=>{Y(!0)},[]);return n.exports.useEffect(()=>(document.addEventListener("visibilitychange",O),window.addEventListener("blur",D),window.addEventListener("focus",U),()=>{document.removeEventListener("visibilitychange",O),window.removeEventListener("blur",D),window.removeEventListener("focus",U)}),[x,c]),n.exports.createElement(we.Provider,{value:{playerRef:t,screenCanvasRef:r,initialized:b,currentGame:a,setCurrentGame:l,loadedGame:o,setLoadedGame:s,freeze:v,setFreeze:y,freezeScreen:u,setFreezeScreen:k,playing:x,setPlaying:d,paused:c,setPaused:w,muted:i,setMuted:p}},e)},z=()=>{const e=n.exports.useContext(we);if(!e)throw new Error("Missing player context");const{playerRef:t,screenCanvasRef:r,initialized:o,currentGame:s,setCurrentGame:a,loadedGame:l,setLoadedGame:i,freeze:p,freezeScreen:v,playing:y,setPlaying:u,paused:k,setPaused:b,muted:P,setMuted:x}=e,d=h=>{if(!t.current)throw new Error("Missing GameBoyPlayer instance");return t.current.openROM(h).then(()=>{if(!t.current)throw new Error("Missing GameBoyPlayer instance");if(!t.current.core.name)throw new Error("Missing ROM name from GameBoyCore");i(t.current.core.name),t.current.saveROM(t.current.core.name,h)})},c=()=>{if(!t.current)throw new Error("Missing GameBoyPlayer instance");t.current.start(),u(!0),b(!1)};return{playerRef:t,screenCanvasRef:r,initialized:o,openROM:d,currentGame:s,loadedGame:l,start:c,pause:()=>{if(!t.current)throw new Error("Missing GameBoyPlayer instance");return t.current.pause().then(()=>b(!0))},unPause:()=>{if(!t.current)throw new Error("Missing GameBoyPlayer instance");t.current.run(),u(!0),b(!1)},resume:()=>{if(!t.current)throw new Error("Missing GameBoyPlayer instance");if(!p)throw new Error("Missing freeze state");t.current.resume(p),u(!0),b(!1)},stop:()=>{a(""),i(""),u(!1),b(!1)},restart:()=>{if(!t.current)throw new Error("Missing GameBoyPlayer instance");t.current.core.reset();const h=l||s;if(!h)throw new Error("Missing current game");return t.current.loadROM(h).then(d).then(c)},mute:()=>x(!0),unMute:()=>x(!1),playing:y,paused:k,muted:P,freeze:p,freezeScreen:v,getSRAM:()=>{if(!t.current)throw new Error("Missing GameBoyPlayer instance");const h=l||s;if(!h)throw new Error("Missing current game");return t.current.loadSRAM(h)},setSRAM:h=>{if(!t.current)throw new Error("Missing GameBoyPlayer instance");if(!s)throw new Error("Missing current game");return t.current.saveSRAM(s,h)}}},ye=n.exports.createContext(null),qe=({children:e})=>{const{playerRef:t}=z(),r=Q.reduce((d,c)=>te(_({},d),{[c.group]:n.exports.useRef(null)}),{}),[o,s]=n.exports.useState([]),[a,l]=n.exports.useState([]),[i,p]=n.exports.useState([]);n.exports.useEffect(()=>{const d=o.reduce((E,$)=>{const N=$.clientX,Y=$.clientY,O=new F.Circle(new F.Vector(N,Y),25);for(let D=0;D<Q.length;D++){const U=Q[D],M=r[U.group].current;if(!M)continue;const h=M.firstElementChild;if(!h)throw new Error("Control group missing children");const pe=U.controls,de=h.getBoundingClientRect(),Re=de.x,ze=de.y;for(let Z=0;Z<pe.length;Z++){const L=pe[Z],me=Re+L.pos.x/2,ge=ze+L.pos.y/2;if(L.type===C.Circle){const ee=L.pos.r/2,xe=new F.Circle(new F.Vector(me,ge),ee);F.testCircleCircle(O,xe)&&E.push(L.name)}else if(L.type===C.Pill){const ee=new F.Box(new F.Vector(me,ge),L.pos.w/2,L.pos.h/2).toPolygon();F.testPolygonCircle(ee,O)&&E.push(L.name)}}}return E},[]),c=a.map(E=>Ke[E]),w=I.uniq(d.concat(c));t.current&&!I.isEqual(w,i)&&(I.difference(w,i).forEach(E=>{var $;($=t.current)==null||$.buttonDown(E)}),I.difference(i,w).forEach(E=>{var $;($=t.current)==null||$.buttonUp(E)})),p(w)},[o,a]);const v=n.exports.useCallback(d=>{d.target.matches('[data-screen], [data-screen] *, [role="listbox"], [role="listbox"] *')||d.preventDefault(),!(!d.changedTouches||!d.changedTouches.length)&&s(c=>[...c,...d.changedTouches])},[]),y=n.exports.useCallback(d=>{s(c=>{let w=c.slice(0);for(let E=0;E<d.changedTouches.length;E++){const $=d.changedTouches[E];w=w.map(N=>N.identifier===$.identifier?$:N)}return w})},[]),u=n.exports.useCallback(d=>{const c=I.map(d.changedTouches,w=>w.identifier);s(w=>w.filter(E=>!c.includes(E.identifier)))},[]),k=n.exports.useCallback(d=>{l(c=>c.includes(d.keyCode)?c:I.uniq([...c,d.keyCode]))},[]),b=n.exports.useCallback(d=>{l(c=>c.includes(d.keyCode)?I.filter(c,w=>w!==d.keyCode):c)},[]),P=n.exports.useCallback(()=>s([]),[]),x=n.exports.useCallback(d=>d.preventDefault(),[]);return n.exports.useEffect(()=>(document.addEventListener("touchstart",v,{passive:!1}),document.addEventListener("touchmove",y),document.addEventListener("touchend",u),document.addEventListener("touchcancel",u),window.addEventListener("keydown",k),window.addEventListener("keyup",b),window.addEventListener("resize",P),window.addEventListener("gesturestart",x),window.addEventListener("gestureend",x),()=>{document.removeEventListener("touchstart",v),document.removeEventListener("touchmove",y),document.removeEventListener("touchend",u),document.removeEventListener("touchcancel",u),window.removeEventListener("keydown",k),window.removeEventListener("keyup",b),window.removeEventListener("resize",P),window.removeEventListener("gesturestart",x),window.removeEventListener("gestureend",x)}),[]),n.exports.createElement(ye.Provider,{value:{groupRefs:r,pressed:i}},e)},Xe=()=>{const e=n.exports.useContext(ye);if(!e)throw new Error("Missing controls context");return e};var C;(function(e){e.Circle="circle",e.Pill="pill"})(C||(C={}));var H;(function(e){e.Left="left",e.Right="right",e.Bottom="bottom"})(H||(H={}));const V=75,f=50,J=100,ne=30,be=30,Q=[{group:"actions",position:H.Right,size:{width:f*2*3,height:f*2*3},controls:[{name:"a",type:C.Circle,pos:{x:f*2*3-V,y:V*1.5,r:V}},{name:"b",type:C.Circle,pos:{x:V,y:f*2*3-V,r:V}}]},{group:"options",position:H.Bottom,size:{width:J*2+be,height:ne},controls:[{name:"start",type:C.Pill,pos:{x:J+be,y:0,w:J,h:ne}},{name:"select",type:C.Pill,pos:{x:0,y:0,w:J,h:ne}}]},{group:"dpad",position:H.Left,size:{width:f*2*3,height:f*2*3},controls:[{name:"up",type:C.Circle,pos:{x:f*2*3/2,y:f,r:f}},{name:"down",type:C.Circle,pos:{x:f*2*3/2,y:f*2*3-f,r:f}},{name:"left",type:C.Circle,pos:{x:f,y:f*2*3/2,r:f}},{name:"right",type:C.Circle,pos:{x:f*2*3-f,y:f*2*3/2,r:f}}]}],Ke={13:"start",16:"select",38:"up",87:"up",39:"right",68:"right",40:"down",83:"down",37:"left",65:"left",32:"a",18:"a",76:"a",88:"a",186:"b",222:"a",17:"b",90:"b",91:"b",93:"b",75:"b",191:"a",188:"a",190:"b",77:"b"};var S;(function(e){e.Purple="rebeccapurple",e.Pink="deeppink",e.Red="crimson",e.Yellow="gold",e.Lime="limegreen",e.Green="seagreen",e.Teal="teal",e.Ice="deepskyblue",e.Blue="mediumblue",e.Silver="lightsteelblue",e.Black="black"})(S||(S={}));var re;(function(e){e.None="none",e.LCD="lcd"})(re||(re={}));var B;(function(e){e.Player="",e.Settings="settings",e.Save="save"})(B||(B={}));const Ee=n.exports.createContext(null),Je=({children:e})=>{const[t,r]=n.exports.useState(B.Player),[o,s]=K("color",S.Purple),[a,l]=K("screenFilter",re.LCD),i={color:o,setColor:s,screenFilter:a,setScreenFilter:l,menu:t,setMenu:r};return n.exports.createElement(Ee.Provider,{value:i},e)},T=()=>{const e=n.exports.useContext(Ee);if(!e)throw new Error("Missing settings context");return e},oe=e=>Oe[e],q=e=>Ne.rgb(oe(e)),ve=e=>{const t=q(e);return{background:t.hsl().string(),light:t.lighten(.25).hsl().string(),dark:t.darken(.25).hsl().string()}},se=e=>{const t=q(e);return g`
    background: linear-gradient(
      to top,
      ${t.darken(.25).hsl().string()} 25%,
      ${t.hsl().string()}
    );
    box-shadow: 0 0.5rem 1rem ${t.alpha(.25).hsl().string()};
  `},Qe=m.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`,Ze=m.div`
  flex: 1;

  ${e=>!e.menu&&!!e.paused&&g`
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
    `}
`,et=m.div`
  display: flex;
  justify-content: space-between;
`,ke=m.h2`
  font-weight: normal;
  font-size: 1rem;
  font-family: sans-serif;
  text-align: center;
  color: white;
`,$e=g`
  appearance: none;
  -webkit-tap-highlight-color: transparent;
  width: 100%;
  padding: 0.5rem;
  margin: 0;
  font-size: 1.25rem;
  border: 0;
  border-radius: 4px;
`,ae=m.input`
  ${$e}
  ${se("white")}
`,R=m.button`
  ${$e}
  position: relative;
  ${se("black")}
  background: linear-gradient(
    to top,
    ${q("lightgray").darken(.25).hsl().string()} 25%,
    ${q("lightgray").hsl().string()}
  );
  border: 1px solid gray;
  ${""}
  border-left-color: gray;
  border-top-color: gray;
  color: hsl(0, 0%, 40%);
  text-shadow: -1px -1px 0 hsla(0, 0%, 5%, 0.25);
  outline: none;

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
    box-shadow: 0 0 1rem ${q("black").alpha(.25).hsl().string()};
    transform: scale(0.99);

    &:before {
      display: none;
    }
  }
`,ie=m(ae).attrs({as:"select"})``,tt=m.input`
  display: none;
`,X=m.div`
  ${e=>e.horizontal?g`
          display: flex;
          margin-bottom: 1.5rem;

          ${ae} {
            margin: 0 0.5rem;
          }
        `:g`
          ${ae}, ${R} {
            margin-bottom: 1.5rem;
          }
        `}
`;m(R)`
  display: inline-block;
  width: auto;
  height: auto;
  margin: 0;
  margin-left: 0.5rem;
`;const nt=m.label`
  position: relative;
  display: inline-block;
  vertical-align: middle;
  -webkit-tap-highlight-color: transparent;
`,rt=m.input`
  position: absolute;
  top: 0;
  left: 0;
  visibility: hidden;
  width: 0;
  height: 0;
`,Ce=m(R).attrs({as:"span"})`
  display: inline-block;
  width: auto;
  margin: 0;
  vertical-align: middle;

  input:checked + & {
    ${se("darkorange")}
  }
`,Se=m.span`
  display: inline-block;
  margin: 0 0.5rem;
  font-family: sans-serif;
  vertical-align: middle;
  color: hsla(0, 0%, 100%, 0.5);
`,ot=m.a`
  cursor: default;
`,st=e=>{const t=new ArrayBuffer(e.length),r=new Uint8Array(t);for(let o=0;o<e.length;o++)r[o]=e.charCodeAt(o);return t},at=e=>{try{if(!e||!e.length)return[];const t=[];for(let r=0;r<e.length;++r)t[r]=e[r];return t}catch(t){return console.log("Conversion from a typed array failed: "+t.message),e}},it=e=>new Promise((t,r)=>{const o=new FileReader,s=new Blob([new Uint8Array(e)],{type:"application/octet-binary"});o.onload=a=>{a.target?t(a.target.result):r()},o.readAsDataURL(s)}),lt=e=>new Promise((t,r)=>{try{if(e.files&&e.files.length>0){const o=new FileReader;o.addEventListener("load",()=>{o.readyState===2&&t(o.result)}),o.readAsBinaryString(e.files[0])}else r()}catch(o){r(o)}}),Pe=({onChange:e,label:t,accept:r,inputRef:o})=>{const s=n.exports.useRef(null),a=()=>{var i;o&&o.current?o.current.click():(i=s.current)==null||i.click()},l=i=>lt(i.target).then(p=>{p&&e(p)});return n.exports.createElement("div",{onClick:i=>i.stopPropagation()},n.exports.createElement(R,{onClick:a},t),n.exports.createElement(tt,{type:"file",accept:r,ref:o||s,onChange:l}))},ct=({selectedGame:e,setSelectedGame:t})=>{const{initialized:r,playerRef:o,openROM:s}=z(),[a,l]=n.exports.useState(!1),[i,p]=n.exports.useState([]),v=n.exports.useRef(null),y=()=>{if(r){if(!o.current)throw new Error("Missing GameBoyPlayer instance");o.current.getStorageKeys().then(u=>{const k=i,b=u.filter(P=>P.indexOf("ROM_")===0).map(P=>P.slice("ROM_".length));if(p(b),l(!0),b.length>k.length){const P=I.difference(b,i);P.length===1&&t(P[0])}})}};return n.exports.useEffect(y,[r]),n.exports.useEffect(()=>{if(e){if(!o.current)throw new Error("Missing GameBoyPlayer instance");o.current.loadROM(e).then(s)}},[e]),a?n.exports.createElement(n.exports.Fragment,null,!!i.length&&n.exports.createElement(ie,{value:e,onChange:u=>{t(u.target.value||"")}},n.exports.createElement("option",{key:"game-select",value:""},"Select game"),i.map(u=>n.exports.createElement("option",{key:`game-${u}`,value:u},u))),!e&&n.exports.createElement(Pe,{inputRef:v,accept:".gb,.gbc",label:"Add ROM File",onChange:u=>{if(u)return s(u).then(y)}})):null},ut=()=>{const{playerRef:e,initialized:t,loadedGame:r,freeze:o,start:s,restart:a,resume:l}=z(),[i,p]=n.exports.useState("");return n.exports.createElement(n.exports.Fragment,null,n.exports.createElement(X,null,n.exports.createElement(ct,{selectedGame:i,setSelectedGame:p})),!!(t&&i&&r)&&n.exports.createElement(X,{horizontal:!0},n.exports.createElement(n.exports.Fragment,null,n.exports.createElement(R,{onClick:v=>{var y;v.stopPropagation(),((y=e.current)==null?void 0:y.runInterval)?a():s()}},"Start"),o?n.exports.createElement(R,{onClick:v=>{v.stopPropagation(),l()}},"Resume"):null)))},pt=()=>{const{restart:e,stop:t}=z(),{setMenu:r}=T();return n.exports.createElement(n.exports.Fragment,null,n.exports.createElement(ke,null,"Paused - Tap screen to resume"),n.exports.createElement(X,{horizontal:!0},n.exports.createElement(R,{onClick:o=>{o.stopPropagation(),e()}},"Restart"),n.exports.createElement(R,{onClick:o=>{o.stopPropagation(),t()}},"Change ROM")),n.exports.createElement(R,{onClick:o=>{o.stopPropagation(),r(B.Save)}},"Manage Save"))},dt=()=>{const e=n.exports.useRef(null),[t,r]=n.exports.useState(""),{currentGame:o,loadedGame:s,getSRAM:a}=z();n.exports.useEffect(()=>{a().then(it).then(p=>{r(p)})},[]);const l=n.exports.useCallback(p=>{if(p.stopPropagation(),p.preventDefault(),!e.current)throw new Error("Missing export button anchor");e.current.click()},[]),i=n.exports.useCallback(p=>{p.stopPropagation()},[]);return n.exports.createElement(n.exports.Fragment,null,n.exports.createElement(R,{onClick:l,disabled:!t},"Export Save File"),n.exports.createElement("a",{download:`${s||o}.sav`,href:t,onClick:i,ref:e,style:{display:"none"}},"Download"))},mt=()=>{const{restart:e,setSRAM:t}=z();return n.exports.createElement(Pe,{label:"Import Save File",accept:".sav",onChange:r=>{if(!r)throw new Error("Save file failed to load");const o=st(r),s=at(new Uint8Array(o));window.confirm("Replace current save file?")&&t(s).then(e)}})},gt=()=>{const{loadedGame:e,currentGame:t}=z(),{setMenu:r}=T(),o=e||t;return n.exports.useEffect(()=>{o||r(B.Player)},[e,t]),n.exports.createElement(n.exports.Fragment,null,n.exports.createElement(ke,null,o,".sav"),n.exports.createElement(X,null,n.exports.createElement(mt,null),n.exports.createElement(dt,null)))},xt=[{Purple:S.Purple},{Pink:S.Pink},{Red:S.Red},{Yellow:S.Yellow},{Lime:S.Lime},{Green:S.Green},{Teal:S.Teal},{Ice:S.Ice},{Blue:S.Blue},{Silver:S.Silver},{Black:S.Black}],ft=()=>{const{color:e,setColor:t,screenFilter:r,setScreenFilter:o}=T(),s=l=>t(l.target.value),a=l=>o(l.target.value);return n.exports.createElement(X,{onClick:l=>l.stopPropagation()},n.exports.createElement(ie,{onChange:s,value:e},xt.map(l=>{const[i]=Object.keys(l),[p]=Object.values(l);return n.exports.createElement("option",{key:`color-option-${p}`,value:p},i)})),n.exports.createElement(ie,{onChange:a,value:r},n.exports.createElement("option",{value:"none"},"None"),n.exports.createElement("option",{value:"lcd"},"LCD")))},ht=m.i`
  display: block;
`,Me=({name:e="",className:t=""})=>n.exports.createElement(ht,{className:`material-icons ${t}`.trim()},e),wt=()=>{const{muted:e,mute:t,unMute:r}=z();return n.exports.createElement(nt,{onClick:o=>o.stopPropagation()},n.exports.createElement(rt,{type:"checkbox",name:"mute",checked:!!e,onChange:o=>{o.target.checked?t():r()}}),n.exports.createElement(Ce,{tabIndex:0},n.exports.createElement(Me,{name:e?"volume_off":"volume_up"})),n.exports.createElement(Se,null,"Mute"))},yt=()=>{const{setMenu:e}=T();return n.exports.createElement(ot,{onClick:t=>{t.stopPropagation(),e(B.Settings)}},n.exports.createElement(Se,null,"Settings"),n.exports.createElement(Ce,{tabIndex:0},n.exports.createElement(Me,{name:"settings"})))},bt=()=>{const{paused:e}=z(),{menu:t,setMenu:r}=T();return n.exports.createElement(Qe,null,n.exports.createElement(Ze,{menu:t,paused:e},!t&&e?n.exports.createElement(pt,null):n.exports.createElement(n.exports.Fragment,null,!t&&n.exports.createElement(ut,null),t===B.Settings&&n.exports.createElement(ft,null),t===B.Save&&n.exports.createElement(gt,null))),n.exports.createElement(et,null,t?n.exports.createElement(R,{onClick:o=>{o.stopPropagation(),r(B.Player)}},"Back"):null,!t&&n.exports.createElement(wt,null),!t&&n.exports.createElement(yt,null)))},Et=Ue`
  body {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    margin: 0;

    ${({colorName:e})=>{const[t,r,o]=oe(e);return g`
        background: rgb(${t}, ${r}, ${o});
      `}}
  }
`,vt=(e="rebeccapurple")=>{const[t,r,o]=oe(e);return`
    <svg width="512" height="512" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="rgb(${t},${r},${o})"/>
      <ellipse ry="80" rx="80" cy="108" cx="256" fill="#000"/>
      <ellipse ry="80" rx="80" cy="256" cx="108" fill="#000"/>
      <ellipse ry="80" rx="80" cy="256" cx="404" fill="#000"/>
      <ellipse ry="80" rx="80" cy="404" cx="256" fill="#000"/>
    </svg>
  `},kt=e=>{var r;const t=document.createElement("canvas");return t.width=512,t.height=512,(r=t.getContext("2d"))==null||r.drawImage(e,0,0),t.toDataURL()},$t=(e="rebeccapurple")=>new Promise((t,r)=>je(vt(e),(o,s)=>o?r(o):t(kt(s)))),Ct="(min-width: 667px)",le="(min-width: 850px) and (min-height: 500px)",ce="(min-width: 1020px) and (min-height: 650px)",W="(min-height: 800px) and (min-width: 650px) and (max-width: 1024px)",ue="(max-width: 320px)",G="(max-height: 500px) and (max-width: 666px) and (min-width: 529px)",St=m.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;

  ${e=>e.position==="left"&&g`
      order: 1;

      @media ${W} {
        margin-left: 48px;
      }

      @media ${G} {
        margin-left: 4px;
      }
    `}

  ${e=>e.position==="right"&&g`
      order: 2;

      @media ${W} {
        margin-right: 48px;
      }

      @media ${G} {
        margin-right: 4px;
      }
    `}

  ${e=>e.position==="bottom"&&g`
      order: 3;
      align-self: center;
      margin: 0 auto;
      width: 100%;

      @media ${ue} {
        margin-bottom: 1rem;
      }

      @media ${G} {
        margin-bottom: 9px;
      }
    `}

  @media (min-width: 636px) {
    ${e=>e.position==="left"&&g`
        order: 0;
      `}

    ${e=>e.position==="bottom"&&g`
        align-self: bottom;
      `}
  }
`,Pt=m.div`
  position: relative;
  display: block;

  ${e=>g`
    width: ${e.width/2}px;
    height: ${e.height/2}px;
  `}

  ${e=>e.position!=="bottom"&&g`
    @media ${G} {
      width: ${e.width/3}px;
      height: ${e.height/3}px;
    }
  `}
`,Mt=m.span`
  position: absolute;
  display: block;
  z-index: -1;
  background: linear-gradient(
    -30deg,
    hsla(0, 0%, 0%, 0.5) 25%,
    hsla(0, 0%, 0%, 0)
  );
  overflow: hidden;
  transition: 75ms;

  ${({colorName:e,pressed:t})=>{const r=ve(e);return g`
      box-shadow: 4px 4px 12px 2px ${r.dark},
        -4px -4px 12px 2px ${r.light};

      ${t&&g`
        box-shadow: 4px 4px 12px 2px ${r.light},
          -4px -4px 12px 2px ${r.dark}, inset 0 0 8px hsla(0, 0%, 0%, 0.5);
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

  ${e=>e.type===C.Circle&&g`
      top: ${100*((e.pos.y-e.pos.r)/e.size.height)}%;
      left: ${100*((e.pos.x-e.pos.r)/e.size.width)}%;
      width: ${100*(e.pos.r/(e.size.width/2))}%;
      height: ${100*(e.pos.r/(e.size.height/2))}%;
      border-radius: 100%;
    `}

  ${e=>e.type===C.Pill&&g`
      top: ${100*(e.pos.y/e.size.height)}%;
      left: ${100*(e.pos.x/e.size.width)}%;
      width: ${100*(e.pos.w/e.size.width)}%;
      height: ${100*(e.pos.h/e.size.height)}%;
      border-radius: ${e.pos.h/2}px;
    `}
`,Rt=({controls:e,group:t,size:r,position:o})=>{const{groupRefs:s,pressed:a}=Xe(),{color:l}=T();return n.exports.createElement(St,{ref:s[t],position:o},n.exports.createElement(Pt,te(_({},r),{position:o}),e.map(i=>n.exports.createElement(Mt,_({colorName:l,key:`control-outline-${i.name}`,size:r,pressed:a.includes(i.name)},i)))))},A="rgba(0,0,0,0.1125)",zt=m.div`
  display: flex;
  justify-content: center;
  position: relative;
  width: 100%;
  order: 0;

  @media ${Ct} {
    width: auto;
    order: 1;
  }

  @media ${W} {
    width: 100%;
    order: 0;
  }

  @media ${G} {
    width: auto;
    order: 2;
  }
`,Lt=m.div`
  position: relative;
  width: 320px;
  height: 288px;
  border: 8px solid hsla(0, 0%, 0%, 0);
  border-bottom-width: 32px;
  border-radius: 8px;
  box-sizing: content-box;
  z-index: 1;

  ${({colorName:e})=>{const t=ve(e);return g`
      background: ${t.background};
      box-shadow: 4px 4px 12px 2px ${t.dark},
      -4px -4px 12px 2px ${t.light};

      @media ${ue}, ${G} {
        background: none;
        box-shadow: none;
        border-radius: none;
        border-top: 0;
      }
    `}}

  @media (max-width: 336px) {
    margin-left: -8px;
    margin-right: -8px;
  }

  @media ${le}, ${W} {
    width: 480px;
    height: 432px;
  }

  @media ${ce} {
    width: 640px;
    height: 576px;
  }

  @media ${G} {
    border: 0;
    border-radius: 0;
  }

  ${e=>(e.playing||e.paused)&&g`
      ${""}
      overflow: hidden;
    `}

  ${e=>!e.playing&&!e.paused&&g`
      ${""}
    `}
`,Bt=m.div`
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
`,Gt=m.span`
  display: none;
  position: absolute;
  top: -1px;
  bottom: -1px;
  left: -1px;
  right: -1px;
  z-index: 2;
  pointer-events: none;
  transform: translate3d(0, 0, 0);

  ${e=>e.playing&&g`
      display: block;
    `}

  ${e=>e.filter==="lcd"&&g`
      background-position: 1px 1px;
      background-size: 2px 2px;
      background-image: linear-gradient(
          ${A},
          ${A} 25%,
          transparent 25%,
          transparent 75%,
          ${A} 75%,
          ${A}
        ),
        linear-gradient(
          90deg,
          ${A},
          ${A} 25%,
          transparent 25%,
          transparent 75%,
          ${A} 75%,
          ${A}
        );

      @media ${le}, ${W} {
        background-size: 3px 3px;
      }

      @media ${ce} {
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

        @media ${le} {
          background-size: 6px 6px;
        }

        @media ${ce} {
          background-size: 8px 8px;
        }
      }
    `}
`,Ft=m.canvas`
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

  ${e=>e.playing&&g`
      opacity: 1;
    `}

  ${e=>e.paused&&g`
      opacity: 0.1;
    `}
`,It=m.h1`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  margin: 0;
  color: rgba(0,0,0,0.5);
  text-align: center;
  line-height: 32px;
  font-size: 1rem;
  font-style: italic;
  font-family: sans-serif;
  font-weight: bold;
  text-transform: uppercase;
  text-shadow: 1px 1px 0 rgba(255,255,255,0.25), -1px -1px 0 rgba(0,0,0,0.25);
  opacity: 0.2;
  z-index: 1;

  @media ${G} {
    display: none;
  }
`,Tt=({children:e})=>{const{screenCanvasRef:t,freezeScreen:r,currentGame:o,playing:s,paused:a,pause:l,unPause:i,resume:p}=z(),{color:v,screenFilter:y}=T();n.exports.useEffect(()=>{var k;r&&a&&!s&&t.current&&((k=t.current.getContext("2d"))==null||k.putImageData(r,0,0))},[s,a,r]);let u;return s?a?u=i:u=l:a&&(u=p),j.createElement(zt,null,j.createElement(Lt,{"data-screen":!0,colorName:v,onClick:u,paused:a,playing:s},(!s||a)&&j.createElement(Bt,null,e),j.createElement(Gt,{filter:y,playing:s||!!o&&!!r,paused:a}),j.createElement(Ft,{ref:t,width:"160",height:"144",paused:a,playing:s})),j.createElement(It,null,"Gamer Pocket"))},At=m.div`
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
  min-width: 320px;

  padding-left: env(safe-area-inset-left);
  padding-right: env(safe-area-inset-left);
  padding-top: env(safe-area-inset-top);
  padding-bottom: env(safe-area-inset-bottom);

  @media ${W} {
    justify-content: space-between;
  }

  @media ${ue}, ${G} {
    align-content: space-between
  }
`,Dt=({children:e})=>{const[t,r]=n.exports.useState(""),{color:o}=T();return n.exports.useEffect(()=>{$t(o).then(s=>{r(s)})},[o]),n.exports.useEffect(()=>{var l;const s=document.querySelector("#app-icon");s&&((l=s.parentNode)==null||l.removeChild(s));const a=document.createElement("link");a.setAttribute("id","app-icon"),a.setAttribute("rel","apple-touch-icon"),a.setAttribute("href",t),document.head.appendChild(a)},[t]),n.exports.createElement(Ve,{theme:{colorName:o}},n.exports.createElement(Et,{colorName:o}),n.exports.createElement(At,null,n.exports.createElement(Tt,null,e),Q.map(s=>n.exports.createElement(Rt,_({key:`controls-${s.group}`},s)))))},Nt=()=>n.exports.createElement(Je,null,n.exports.createElement(He,null,n.exports.createElement(qe,null,n.exports.createElement(Dt,null,n.exports.createElement(bt,null)))));We.exports.render(n.exports.createElement(n.exports.StrictMode,null,n.exports.createElement(Nt,null)),document.getElementById("app"));_e();
