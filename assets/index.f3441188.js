var e=Object.defineProperty,t=Object.defineProperties,r=Object.getOwnPropertyDescriptors,n=Object.getOwnPropertySymbols,o=Object.prototype.hasOwnProperty,a=Object.prototype.propertyIsEnumerable,s=(t,r,n)=>r in t?e(t,r,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[r]=n,i=(e,t)=>{for(var r in t||(t={}))o.call(t,r)&&s(e,r,t[r]);if(n)for(var r of n(t))a.call(t,r)&&s(e,r,t[r]);return e};import{v as l,n as c,r as p,_ as u,G as d,S as m,a as x,A as g,c as h,b as f,s as w,$ as y,d as E,R as b,e as v,f as k}from"./vendor.9215dfce.js";const $=p.exports.createContext(null),C=({children:e})=>{const t=p.exports.useRef(null),r=p.exports.useRef(null),[n,o]=p.exports.useState(""),[a,s]=u("currentGame",""),[i,l]=u("muted",!1),[c,m]=p.exports.useState(null),[x,g]=p.exports.useState(null),[h,f]=p.exports.useState(!1),[w,y]=p.exports.useState(!1),[E,b]=p.exports.useState(!1),[v,k]=p.exports.useState(!1),[C,P]=p.exports.useState(!0);p.exports.useEffect((()=>{if(!h){if(!r.current)throw new Error("Missing screen canvas");t.current=new d(r.current,{mediaStreamWorkerSrc:"https://polhem.us/gamer-pocket/media-stream-worker.js",soundVolume:i?0:.5}),f(!0)}}),[h]),p.exports.useEffect((()=>{const e=n||a;if(e&&!w){if(!t.current)throw new Error("Missing GameBoyPlayer instance");t.current.loadFreeze(e).then((e=>{m(e||null)})),t.current.loadFreezeScreen(e).then((e=>{g(e||null)}))}else e||(m(null),g(null))}),[a,n,w]),p.exports.useEffect((()=>{a&&!n&&c&&x&&!w&&!E&&b(!0)}),[a,n,c,x,w,E]),p.exports.useEffect((()=>{if(w){if(!t.current)throw new Error("Missing GameBoyPlayer instance");if(!t.current.core.name)throw new Error("Missing ROM name from GameBoyCore");s(t.current.core.name)}}),[w]),p.exports.useEffect((()=>{if(h){if(!t.current)throw new Error("Missing GameBoyPlayer instance");i?t.current.setVolume(0):t.current.setVolume(.5)}}),[i]),p.exports.useEffect((()=>{}),[w,E]);const S=p.exports.useCallback((async()=>{const e="hidden"===document.visibilityState;if(e&&w&&!E){if(!t.current)throw new Error("Missing GameBoyPlayer instance");await t.current.autoFreeze()}k(e)}),[w,E]),M=p.exports.useCallback((async()=>{if(w&&!E){if(!t.current)throw new Error("Missing GameBoyPlayer instance");await t.current.autoFreeze()}P(!1)}),[w,E]),z=p.exports.useCallback((()=>{P(!0)}),[]);return p.exports.useEffect((()=>(document.addEventListener("visibilitychange",S),window.addEventListener("blur",M),window.addEventListener("focus",z),()=>{document.removeEventListener("visibilitychange",S),window.removeEventListener("blur",M),window.removeEventListener("focus",z)})),[w,E]),p.exports.createElement($.Provider,{value:{playerRef:t,screenCanvasRef:r,initialized:h,currentGame:a,setCurrentGame:s,loadedGame:n,setLoadedGame:o,freeze:c,setFreeze:m,freezeScreen:x,setFreezeScreen:g,playing:w,setPlaying:y,paused:E,setPaused:b,muted:i,setMuted:l}},e)},P=()=>{const e=p.exports.useContext($);if(!e)throw new Error("Missing player context");const{playerRef:t,screenCanvasRef:r,initialized:n,currentGame:o,setCurrentGame:a,loadedGame:s,setLoadedGame:i,freeze:l,freezeScreen:c,playing:u,setPlaying:d,paused:m,setPaused:x,muted:g,setMuted:h}=e,f=e=>{if(!t.current)throw new Error("Missing GameBoyPlayer instance");return t.current.openROM(e).then((()=>{if(!t.current)throw new Error("Missing GameBoyPlayer instance");if(!t.current.core.name)throw new Error("Missing ROM name from GameBoyCore");i(t.current.core.name),t.current.saveROM(t.current.core.name,e)}))},w=()=>{if(!t.current)throw new Error("Missing GameBoyPlayer instance");t.current.start(),d(!0),x(!1)};return{playerRef:t,screenCanvasRef:r,initialized:n,openROM:f,currentGame:o,loadedGame:s,start:w,pause:()=>{if(!t.current)throw new Error("Missing GameBoyPlayer instance");return t.current.pause().then((()=>x(!0)))},unPause:()=>{if(!t.current)throw new Error("Missing GameBoyPlayer instance");t.current.run(),d(!0),x(!1)},resume:()=>{if(!t.current)throw new Error("Missing GameBoyPlayer instance");if(!l)throw new Error("Missing freeze state");t.current.resume(l),d(!0),x(!1)},stop:()=>{a(""),i(""),d(!1),x(!1)},restart:()=>{if(!t.current)throw new Error("Missing GameBoyPlayer instance");t.current.core.reset();const e=s||o;if(!e)throw new Error("Missing current game");return t.current.loadROM(e).then(f).then(w)},mute:()=>h(!0),unMute:()=>h(!1),playing:u,paused:m,muted:g,freeze:l,freezeScreen:c,getSRAM:()=>{if(!t.current)throw new Error("Missing GameBoyPlayer instance");const e=s||o;if(!e)throw new Error("Missing current game");return t.current.loadSRAM(e)},setSRAM:e=>{if(!t.current)throw new Error("Missing GameBoyPlayer instance");if(!o)throw new Error("Missing current game");return t.current.saveSRAM(o,e)}}},S=p.exports.createContext(null),M=({children:e})=>{const{playerRef:n}=P(),o=B.reduce(((e,n)=>{return o=i({},e),a={[n.group]:p.exports.useRef(null)},t(o,r(a));var o,a}),{}),[a,s]=p.exports.useState([]),[l,c]=p.exports.useState([]),[u,d]=p.exports.useState([]);p.exports.useEffect((()=>{const e=a.reduce(((e,t)=>{const r=t.clientX,n=t.clientY,a=new m.Circle(new m.Vector(r,n),25);for(let s=0;s<B.length;s++){const t=B[s],r=o[t.group].current;if(!r)continue;const n=r.firstElementChild;if(!n)throw new Error("Control group missing children");const i=t.controls,l=n.getBoundingClientRect(),c=l.x,p=l.y;for(let o=0;o<i.length;o++){const t=i[o],r=c+t.pos.x/2,n=p+t.pos.y/2;if(t.type===z.Circle){const o=t.pos.r/2,s=new m.Circle(new m.Vector(r,n),o);m.testCircleCircle(a,s)&&e.push(t.name)}else if(t.type===z.Pill){const o=new m.Box(new m.Vector(r,n),t.pos.w/2,t.pos.h/2).toPolygon();m.testPolygonCircle(o,a)&&e.push(t.name)}}}return e}),[]),t=l.map((e=>O[e])),r=x.uniq(e.concat(t));n.current&&!x.isEqual(r,u)&&(x.difference(r,u).forEach((e=>{var t;null==(t=n.current)||t.buttonDown(e)})),x.difference(u,r).forEach((e=>{var t;null==(t=n.current)||t.buttonUp(e)}))),d(r)}),[a,l]);const g=p.exports.useCallback((e=>{e.target.matches('[data-screen], [data-screen] *, [role="listbox"], [role="listbox"] *')||e.preventDefault(),e.changedTouches&&e.changedTouches.length&&s((t=>[...t,...e.changedTouches]))}),[]),h=p.exports.useCallback((e=>{s((t=>{let r=t.slice(0);for(let n=0;n<e.changedTouches.length;n++){const t=e.changedTouches[n];r=r.map((e=>e.identifier===t.identifier?t:e))}return r}))}),[]),f=p.exports.useCallback((e=>{const t=x.map(e.changedTouches,(e=>e.identifier));s((e=>e.filter((e=>!t.includes(e.identifier)))))}),[]),w=p.exports.useCallback((e=>{c((t=>t.includes(e.keyCode)?t:x.uniq([...t,e.keyCode])))}),[]),y=p.exports.useCallback((e=>{c((t=>t.includes(e.keyCode)?x.filter(t,(t=>t!==e.keyCode)):t))}),[]),E=p.exports.useCallback((()=>s([])),[]),b=p.exports.useCallback((e=>e.preventDefault()),[]);return p.exports.useEffect((()=>(document.addEventListener("touchstart",g,{passive:!1}),document.addEventListener("touchmove",h),document.addEventListener("touchend",f),document.addEventListener("touchcancel",f),window.addEventListener("keydown",w),window.addEventListener("keyup",y),window.addEventListener("resize",E),window.addEventListener("gesturestart",b),window.addEventListener("gestureend",b),()=>{document.removeEventListener("touchstart",g),document.removeEventListener("touchmove",h),document.removeEventListener("touchend",f),document.removeEventListener("touchcancel",f),window.removeEventListener("keydown",w),window.removeEventListener("keyup",y),window.removeEventListener("resize",E),window.removeEventListener("gesturestart",b),window.removeEventListener("gestureend",b)})),[]),p.exports.createElement(S.Provider,{value:{groupRefs:o,pressed:u}},e)};var z,R,G,L;(R=z||(z={})).Circle="circle",R.Pill="pill",(L=G||(G={})).Left="left",L.Right="right",L.Bottom="bottom";const B=[{group:"actions",position:G.Right,size:{width:300,height:300},controls:[{name:"a",type:z.Circle,pos:{x:225,y:112.5,r:75}},{name:"b",type:z.Circle,pos:{x:75,y:225,r:75}}]},{group:"options",position:G.Bottom,size:{width:230,height:30},controls:[{name:"start",type:z.Pill,pos:{x:130,y:0,w:100,h:30}},{name:"select",type:z.Pill,pos:{x:0,y:0,w:100,h:30}}]},{group:"dpad",position:G.Left,size:{width:300,height:300},controls:[{name:"up",type:z.Circle,pos:{x:150,y:50,r:50}},{name:"down",type:z.Circle,pos:{x:150,y:250,r:50}},{name:"left",type:z.Circle,pos:{x:50,y:150,r:50}},{name:"right",type:z.Circle,pos:{x:250,y:150,r:50}}]}],O={13:"start",16:"select",38:"up",87:"up",39:"right",68:"right",40:"down",83:"down",37:"left",65:"left",32:"a",18:"a",76:"a",88:"a",186:"b",222:"a",17:"b",90:"b",91:"b",93:"b",75:"b",191:"a",188:"a",190:"b",77:"b"};var F,A,j,N,D,I;(A=F||(F={})).Purple="rebeccapurple",A.Pink="deeppink",A.Red="crimson",A.Yellow="gold",A.Lime="limegreen",A.Green="seagreen",A.Teal="teal",A.Ice="deepskyblue",A.Blue="mediumblue",A.Silver="lightsteelblue",A.Black="black",(N=j||(j={})).None="none",N.LCD="lcd",(I=D||(D={})).Player="",I.Settings="settings",I.Save="save";const T=p.exports.createContext(null),U=({children:e})=>{const[t,r]=p.exports.useState(D.Player),[n,o]=u("color",F.Purple),[a,s]=u("screenFilter",j.LCD),i={color:n,setColor:o,screenFilter:a,setScreenFilter:s,menu:t,setMenu:r};return p.exports.createElement(T.Provider,{value:i},e)},V=()=>{const e=p.exports.useContext(T);if(!e)throw new Error("Missing settings context");return e},_=e=>f[e],q=e=>h.rgb(_(e)),Y=e=>{const t=q(e);return{background:t.hsl().string(),light:t.lighten(.25).hsl().string(),dark:t.darken(.25).hsl().string()}},W=e=>{const t=q(e);return g`
    background: linear-gradient(
      to top,
      ${t.darken(.25).hsl().string()} 25%,
      ${t.hsl().string()}
    );
    box-shadow: 0 0.5rem 1rem ${t.alpha(.25).hsl().string()};
  `},K=w.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`,X=w.div`
  flex: 1;

  ${e=>!e.menu&&!!e.paused&&g`
      display: flex;
      flex-direction: column;
      justify-content: center;
    `}
`,H=w.div`
  display: flex;
  justify-content: space-between;
`,J=w.h2`
  font-weight: normal;
  font-size: 1rem;
  font-family: sans-serif;
  text-align: center;
  color: white;
`,Q=g`
  appearance: none;
  width: 100%;
  padding: 0.5rem;
  margin: 0;
  font-size: 1.25rem;
  border: 0;
  border-radius: 4px;
`,Z=w.input`
  ${Q}
  ${W("white")}
`,ee=w.button`
  ${Q}
  position: relative;
  ${W("black")}
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
`,te=w(Z).attrs({as:"select"})``,re=w.input`
  display: none;
`,ne=w.div`
  ${e=>e.horizontal?g`
          display: flex;
          margin-bottom: 1.5rem;

          ${Z} {
            margin: 0 0.5rem;
          }
        `:g`
          ${Z}, ${ee} {
            margin-bottom: 1.5rem;
          }
        `}
`;w(ee)`
  display: inline-block;
  width: auto;
  height: auto;
  margin: 0;
  margin-left: 0.5rem;
`;const oe=w.label`
  position: relative;
  display: inline-block;
  vertical-align: middle;
`,ae=w.input`
  position: absolute;
  top: 0;
  left: 0;
  visibility: hidden;
  width: 0;
  height: 0;
`,se=w(ee).attrs({as:"span"})`
  display: inline-block;
  width: auto;
  margin: 0;
  vertical-align: middle;

  input:checked + & {
    ${W("orange")}
  }
`,ie=w.span`
  display: inline-block;
  margin: 0 0.5rem;
  font-family: sans-serif;
  vertical-align: middle;
  color: hsla(0, 0%, 100%, 0.5);
`,le=w.a`
  cursor: default;
`,ce=e=>new Promise(((t,r)=>{const n=new FileReader,o=new Blob([new Uint8Array(e)],{type:"application/octet-binary"});n.onload=e=>{e.target?t(e.target.result):r()},n.readAsDataURL(o)})),pe=({onChange:e,label:t,accept:r,inputRef:n})=>{const o=p.exports.useRef(null);return p.exports.createElement("div",{onClick:e=>e.stopPropagation()},p.exports.createElement(ee,{onClick:()=>{var e;n&&n.current?n.current.click():null==(e=o.current)||e.click()}},t),p.exports.createElement(re,{type:"file",accept:r,ref:n||o,onChange:t=>{return(r=t.target,new Promise(((e,t)=>{try{if(r.files&&r.files.length>0){const t=new FileReader;t.addEventListener("load",(()=>{2===t.readyState&&e(t.result)})),t.readAsBinaryString(r.files[0])}else t()}catch(n){t(n)}}))).then((t=>{t&&e(t)}));var r}}))},ue=({selectedGame:e,setSelectedGame:t})=>{const{initialized:r,playerRef:n,openROM:o}=P(),[a,s]=p.exports.useState(!1),[i,l]=p.exports.useState([]),c=p.exports.useRef(null),u=()=>{if(r){if(!n.current)throw new Error("Missing GameBoyPlayer instance");n.current.getStorageKeys().then((e=>{const t=e.filter((e=>0===e.indexOf("ROM_"))).map((e=>e.slice("ROM_".length)));l(t),s(!0)}))}};return p.exports.useEffect(u,[r]),p.exports.useEffect((()=>{if(e){if(!n.current)throw new Error("Missing GameBoyPlayer instance");n.current.loadROM(e).then(o)}}),[e]),a?p.exports.createElement(p.exports.Fragment,null,!!i.length&&p.exports.createElement(te,{value:e,onChange:e=>{t(e.target.value||"")}},p.exports.createElement("option",{key:"game-select",value:""},"Select game"),i.map((e=>p.exports.createElement("option",{key:`game-${e}`,value:e},e)))),!e&&p.exports.createElement(pe,{inputRef:c,accept:".gb,.gbc",label:"Add ROM File",onChange:e=>{if(e)return o(e).then(u)}})):null},de=()=>{const{playerRef:e,initialized:t,loadedGame:r,freeze:n,start:o,restart:a,resume:s}=P(),[i,l]=p.exports.useState("");return p.exports.createElement(p.exports.Fragment,null,p.exports.createElement(ne,null,p.exports.createElement(ue,{selectedGame:i,setSelectedGame:l})),!!(t&&i&&r)&&p.exports.createElement(ne,{horizontal:!0},p.exports.createElement(p.exports.Fragment,null,p.exports.createElement(ee,{onClick:t=>{var r;t.stopPropagation(),(null==(r=e.current)?void 0:r.runInterval)?a():o()}},"Start"),n?p.exports.createElement(ee,{onClick:e=>{e.stopPropagation(),s()}},"Resume"):null)))},me=()=>{const{restart:e,stop:t}=P(),{setMenu:r}=V();return p.exports.createElement(p.exports.Fragment,null,p.exports.createElement(J,null,"Paused - Tap screen to resume"),p.exports.createElement(ne,{horizontal:!0},p.exports.createElement(ee,{onClick:t=>{t.stopPropagation(),e()}},"Restart"),p.exports.createElement(ee,{onClick:e=>{e.stopPropagation(),t()}},"Change ROM")),p.exports.createElement(ee,{onClick:e=>{e.stopPropagation(),r(D.Save)}},"Manage Save"))},xe=()=>{const e=p.exports.useRef(null),[t,r]=p.exports.useState(""),{currentGame:n,loadedGame:o,getSRAM:a}=P();p.exports.useEffect((()=>{a().then(ce).then((e=>{r(e)}))}),[]);const s=p.exports.useCallback((t=>{if(t.stopPropagation(),t.preventDefault(),!e.current)throw new Error("Missing export button anchor");e.current.click()}),[]),i=p.exports.useCallback((e=>{e.stopPropagation()}),[]);return p.exports.createElement(p.exports.Fragment,null,p.exports.createElement(ee,{onClick:s,disabled:!t},"Export Save File"),p.exports.createElement("a",{download:`${o||n}.sav`,href:t,onClick:i,ref:e,style:{display:"none"}},"Download"))},ge=()=>{const{restart:e,setSRAM:t}=P();return p.exports.createElement(pe,{label:"Import Save File",accept:".sav",onChange:r=>{if(!r)throw new Error("Save file failed to load");const n=(e=>{const t=new ArrayBuffer(e.length),r=new Uint8Array(t);for(let n=0;n<e.length;n++)r[n]=e.charCodeAt(n);return t})(r),o=(e=>{try{if(!e||!e.length)return[];const t=[];for(let r=0;r<e.length;++r)t[r]=e[r];return t}catch(t){return console.log("Conversion from a typed array failed: "+t.message),e}})(new Uint8Array(n));window.confirm("Replace current save file?")&&t(o).then(e)}})},he=()=>{const{loadedGame:e,currentGame:t}=P(),{setMenu:r}=V(),n=e||t;return p.exports.useEffect((()=>{n||r(D.Player)}),[e,t]),p.exports.createElement(p.exports.Fragment,null,p.exports.createElement(J,null,n,".sav"),p.exports.createElement(ne,null,p.exports.createElement(ge,null),p.exports.createElement(xe,null)))},fe=[{Purple:F.Purple},{Pink:F.Pink},{Red:F.Red},{Yellow:F.Yellow},{Lime:F.Lime},{Green:F.Green},{Teal:F.Teal},{Ice:F.Ice},{Blue:F.Blue},{Silver:F.Silver},{Black:F.Black}],we=()=>{const{color:e,setColor:t,screenFilter:r,setScreenFilter:n}=V();return p.exports.createElement(ne,{onClick:e=>e.stopPropagation()},p.exports.createElement(te,{onChange:e=>t(e.target.value),value:e},fe.map((e=>{const[t]=Object.keys(e),[r]=Object.values(e);return p.exports.createElement("option",{key:`color-option-${r}`,value:r},t)}))),p.exports.createElement(te,{onChange:e=>n(e.target.value),value:r},p.exports.createElement("option",{value:"none"},"None"),p.exports.createElement("option",{value:"lcd"},"LCD")))},ye=w.i`
  display: block;
`,Ee=({name:e="",className:t=""})=>p.exports.createElement(ye,{className:`material-icons ${t}`.trim()},e),be=()=>{const{muted:e,mute:t,unMute:r}=P();return p.exports.createElement(oe,{onClick:e=>e.stopPropagation()},p.exports.createElement(ae,{type:"checkbox",name:"mute",checked:!!e,onChange:e=>{e.target.checked?t():r()}}),p.exports.createElement(se,{tabIndex:0},p.exports.createElement(Ee,{name:e?"volume_off":"volume_up"})),p.exports.createElement(ie,null,"Mute"))},ve=()=>{const{setMenu:e}=V();return p.exports.createElement(le,{onClick:t=>{t.stopPropagation(),e(D.Settings)}},p.exports.createElement(ie,null,"Settings"),p.exports.createElement(se,{tabIndex:0},p.exports.createElement(Ee,{name:"settings"})))},ke=()=>{const{paused:e}=P(),{menu:t,setMenu:r}=V();return p.exports.createElement(K,null,p.exports.createElement(X,{menu:t,paused:e},!t&&e?p.exports.createElement(me,null):p.exports.createElement(p.exports.Fragment,null,!t&&p.exports.createElement(de,null),t===D.Settings&&p.exports.createElement(we,null),t===D.Save&&p.exports.createElement(he,null))),p.exports.createElement(H,null,t?p.exports.createElement(ee,{onClick:e=>{e.stopPropagation(),r(D.Player)}},"Back"):null,!t&&p.exports.createElement(be,null),!t&&p.exports.createElement(ve,null)))},$e=y`
  body {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    margin: 0;

    ${({colorName:e})=>{const[t,r,n]=_(e);return g`
        background: rgb(${t}, ${r}, ${n});
      `}}
  }
`,Ce=(e="rebeccapurple")=>new Promise(((t,r)=>E(((e="rebeccapurple")=>{const[t,r,n]=_(e);return`\n    <svg width="512" height="512" xmlns="http://www.w3.org/2000/svg">\n      <rect width="100%" height="100%" fill="rgb(${t},${r},${n})"/>\n      <ellipse ry="80" rx="80" cy="108" cx="256" fill="#000"/>\n      <ellipse ry="80" rx="80" cy="256" cx="108" fill="#000"/>\n      <ellipse ry="80" rx="80" cy="256" cx="404" fill="#000"/>\n      <ellipse ry="80" rx="80" cy="404" cx="256" fill="#000"/>\n    </svg>\n  `})(e),((e,n)=>e?r(e):t((e=>{var t;const r=document.createElement("canvas");return r.width=512,r.height=512,null==(t=r.getContext("2d"))||t.drawImage(e,0,0),r.toDataURL()})(n)))))),Pe="(min-width: 850px) and (min-height: 500px)",Se="(min-width: 1020px) and (min-height: 650px)",Me="(min-height: 800px) and (min-width: 650px) and (max-width: 1024px)",ze=w.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  ${e=>"left"===e.position&&g`
      order: 1;

      @media ${Me} {
        margin-left: 48px;
      }
    `}

  ${e=>"right"===e.position&&g`
      order: 2;

      @media ${Me} {
        margin-right: 48px;
      }
    `}

  ${e=>"bottom"===e.position&&g`
      order: 3;
      align-self: center;
      margin: 0 auto;
      width: 100%;
    `}

  @media (min-width: 636px) {
    ${e=>"left"===e.position&&g`
        order: 0;
      `}

    ${e=>"bottom"===e.position&&g`
        align-self: bottom;
      `}
  }
`,Re=w.div`
  position: relative;
  display: block;

  ${e=>g`
    width: ${e.width/2}px;
    height: ${e.height/2}px;
  `}
`,Ge=w.span`
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

  ${({colorName:e,pressed:t})=>{const r=Y(e);return g`
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

  ${e=>e.type===z.Circle&&g`
      top: ${(e.pos.y-e.pos.r)/e.size.height*100}%;
      left: ${(e.pos.x-e.pos.r)/e.size.width*100}%;
      width: ${e.pos.r/(e.size.width/2)*100}%;
      height: ${e.pos.r/(e.size.height/2)*100}%;
      border-radius: 100%;
    `}

  ${e=>e.type===z.Pill&&g`
      top: ${e.pos.y/e.size.height*100}%;
      left: ${e.pos.x/e.size.width*100}%;
      width: ${e.pos.w/e.size.width*100}%;
      height: ${e.pos.h/e.size.height*100}%;
      border-radius: ${e.pos.h/2}px;
    `}
`,Le=({controls:e,group:t,size:r,position:n})=>{const{groupRefs:o,pressed:a}=(()=>{const e=p.exports.useContext(S);if(!e)throw new Error("Missing controls context");return e})(),{color:s}=V();return p.exports.createElement(ze,{ref:o[t],position:n},p.exports.createElement(Re,i({},r),e.map((e=>p.exports.createElement(Ge,i({colorName:s,key:`control-outline-${e.name}`,size:r,pressed:a.includes(e.name)},e))))))},Be="rgba(0,0,0,0.1125)",Oe=w.div`
  display: flex;
  justify-content: center;
  position: relative;
  width: 100%;
  order: 0;

  @media ${"(min-width: 680px)"} {
    width: auto;
    order: 1;
  }

  @media ${Me} {
    width: 100%;
    order: 0;
  }
`,Fe=w.div`
  position: relative;
  width: 320px;
  height: 288px;
  border: 8px solid hsla(0, 0%, 0%, 0);
  border-bottom-width: 32px;
  border-radius: 8px;
  box-sizing: content-box;
  z-index: 1;

  ${({colorName:e})=>{const t=Y(e);return g`
      background: ${t.background};
      box-shadow: 4px 4px 12px 2px ${t.dark},
        -4px -4px 12px 2px ${t.light};
    `}}

  @media (max-width: 336px) {
    margin-left: -8px;
    margin-right: -8px;
  }

  @media ${Pe}, ${Me} {
    width: 480px;
    height: 432px;
  }

  @media ${Se} {
    width: 640px;
    height: 576px;
  }

  ${e=>(e.playing||e.paused)&&g`
      ${""}
      overflow: hidden;
    `}

  ${e=>!e.playing&&!e.paused&&g`
      ${""}
    `}
`,Ae=w.div`
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
`,je=w.span`
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

  ${e=>"lcd"===e.filter&&g`
      background-position: 1px 1px;
      background-size: 2px 2px;
      background-image: linear-gradient(
          ${Be},
          ${Be} 25%,
          transparent 25%,
          transparent 75%,
          ${Be} 75%,
          ${Be}
        ),
        linear-gradient(
          90deg,
          ${Be},
          ${Be} 25%,
          transparent 25%,
          transparent 75%,
          ${Be} 75%,
          ${Be}
        );

      @media ${Pe}, ${Me} {
        background-size: 3px 3px;
      }

      @media ${Se} {
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

        @media ${Pe} {
          background-size: 6px 6px;
        }

        @media ${Se} {
          background-size: 8px 8px;
        }
      }
    `}
`,Ne=w.canvas`
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
`,De=w.h1`
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
`,Ie=({children:e})=>{const{screenCanvasRef:t,freezeScreen:r,currentGame:n,playing:o,paused:a,pause:s,unPause:i,resume:l}=P(),{color:c,screenFilter:u}=V();let d;return p.exports.useEffect((()=>{var e;r&&a&&!o&&t.current&&(null==(e=t.current.getContext("2d"))||e.putImageData(r,0,0))}),[o,a,r]),o?d=a?i:s:a&&(d=l),b.createElement(Oe,null,b.createElement(Fe,{"data-screen":!0,colorName:c,onClick:d,paused:a,playing:o},(!o||a)&&b.createElement(Ae,null,e),b.createElement(je,{filter:u,playing:o||!!n&&!!r,paused:a}),b.createElement(Ne,{ref:t,width:"160",height:"144",paused:a,playing:o})),b.createElement(De,null,"Gamer Pocket"))},Te=w.div`
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

  @media ${Me} {
    justify-content: space-between;
  }
`,Ue=({children:e})=>{const[t,r]=p.exports.useState(""),{color:n}=V();return p.exports.useEffect((()=>{Ce(n).then((e=>{r(e)}))}),[n]),p.exports.useEffect((()=>{var e;const r=document.querySelector("#app-icon");r&&(null==(e=r.parentNode)||e.removeChild(r));const n=document.createElement("link");n.setAttribute("id","app-icon"),n.setAttribute("rel","apple-touch-icon"),n.setAttribute("href",t),document.head.appendChild(n)}),[t]),p.exports.createElement(v,{theme:{colorName:n}},p.exports.createElement($e,{colorName:n}),p.exports.createElement(Te,null,p.exports.createElement(Ie,null,e),B.map((e=>p.exports.createElement(Le,i({key:`controls-${e.group}`},e))))))},Ve=()=>p.exports.createElement(U,null,p.exports.createElement(C,null,p.exports.createElement(M,null,p.exports.createElement(Ue,null,p.exports.createElement(ke,null)))));k.exports.render(p.exports.createElement(p.exports.StrictMode,null,p.exports.createElement(Ve,null)),document.getElementById("app")),function(e={}){const{immediate:t=!1,onNeedRefresh:r,onOfflineReady:n}=e;let o,a;if("serviceWorker"in navigator){o=new l("https://polhem.us/gamer-pocket/sw.js",{scope:"https://polhem.us/gamer-pocket/"}),o.addEventListener("activated",(e=>{e.isUpdate||null==n||n()}));{const e=()=>{null==r||r()};o.addEventListener("waiting",e),o.addEventListener("externalwaiting",e)}o.register({immediate:t}).then((e=>a=e))}}();
