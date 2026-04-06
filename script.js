/* ═══ FRISE CHRONOLOGIQUE — script.js ═══ */
const TODAY=new Date(), TODAY_Y=TODAY.getFullYear(), TODAY_M=TODAY.getMonth()+1, TODAY_D=TODAY.getDate();

/* CATS et DEFAULTS chargés depuis data.json */
let CATS={};
let DEFAULTS=[];

const ERAS=[
  {key:'all',    name:'Toute l\'histoire',from:-300000,to:TODAY_Y,color:'#8b5cf6'},
  {key:'prehist',name:'Préhistoire',      from:-300000,to:-3200,  color:'#e07820'},
  {key:'antiq',  name:'Antiquité',        from:-3200,  to:476,    color:'#d4a020'},
  {key:'moyen',  name:'Moyen Âge',        from:476,    to:1492,   color:'#4f6ef7'},
  {key:'mod',    name:'Époque Moderne',   from:1492,   to:1789,   color:'#16c47a'},
  {key:'contemp',name:'XIXᵉ siècle',      from:1789,   to:1900,   color:'#f03060'},
  {key:'xx',     name:'XXᵉ siècle',       from:1900,   to:2000,   color:'#a855f7'},
  {key:'xxi',    name:'XXIᵉ siècle',      from:2000,   to:TODAY_Y,color:'#06b6d4'},
];

const ERA_BG={
  all:    {c1:'#8b5cf6',c2:'#06b6d4',c3:'#f03060'},
  prehist:{c1:'#e07820',c2:'#f59e0b',c3:'#b45309'},
  antiq:  {c1:'#d4a020',c2:'#f59e0b',c3:'#92400e'},
  moyen:  {c1:'#4f6ef7',c2:'#6366f1',c3:'#1d4ed8'},
  mod:    {c1:'#16c47a',c2:'#10b981',c3:'#047857'},
  contemp:{c1:'#f03060',c2:'#e11d48',c3:'#9f1239'},
  xx:     {c1:'#a855f7',c2:'#9333ea',c3:'#6d28d9'},
  xxi:    {c1:'#06b6d4',c2:'#0891b2',c3:'#155e75'},
};

/* ── Storage ── */
const SK='frise_v10';
function loadEv(){try{const s=localStorage.getItem(SK);return s?JSON.parse(s):null;}catch{return null;}}
function saveSt(){
  try{localStorage.setItem(SK,JSON.stringify(events));}catch(e){}
  if(window.__firebaseSave)window.__firebaseSave(events);
}

let events=[];
let nextId=1;

/* ── Merge Firebase ── */
window.__mergeRemote=function(remote){
  let changed=false;
  remote.forEach(r=>{
    const loc=events.find(e=>e.id===r.id);
    if(!loc){events.push(r);changed=true;}
    else if((r.updatedAt||0)>(loc.updatedAt||0)){Object.assign(loc,r);changed=true;}
  });
  if(changed){
    try{localStorage.setItem(SK,JSON.stringify(events));}catch(e){}
    nextId=Math.max(...events.map(e=>e.id),0)+1;
    render();buildEraStrip();
  }
};

/* ── Chargement initial depuis data.json ── */
function initApp(data){
  CATS=data.categories;
  DEFAULTS=data.events;
  const saved=loadEv();
  events=saved&&saved.length>0?saved:DEFAULTS;
  nextId=Math.max(...events.map(e=>e.id),0)+1;
  buildCatSelects();
  renderLegend();
  buildEraStrip();
}

fetch('https://api.jsonbin.io/v3/b/69d37e5e856a682189037fc7')
  .then(r=>r.json())
  .then(initApp)
  .catch(()=>{
    /* Fallback si fetch échoue (ex: ouverture locale du fichier HTML) */
    CATS={
      politique:{c:'#4f6ef7',bg:'rgba(79,110,247,.13)',l:'Politique',e:'🏛'},
      science:  {c:'#16c47a',bg:'rgba(22,196,122,.13)',l:'Science',e:'🔬'},
      art:      {c:'#f0742a',bg:'rgba(240,116,42,.13)',l:'Art & Culture',e:'🎨'},
      guerre:   {c:'#f03060',bg:'rgba(240,48,96,.13)',l:'Guerre',e:'⚔️'},
      sport:    {c:'#f59e0b',bg:'rgba(245,158,11,.13)',l:'Sport',e:'🏆'},
      autre:    {c:'#a855f7',bg:'rgba(168,85,247,.13)',l:'Autre',e:'✦'},
    };
    events=loadEv()||[];
    nextId=Math.max(...events.map(e=>e.id),0)+1;
    buildCatSelects();
    renderLegend();
    buildEraStrip();
  });

/* ── State ── */
let scale=1,offsetX=0,svgW=900;
let H=340; /* dynamique selon mobile */
const AY_RATIO=0.515; /* axe à 51.5% de la hauteur */
let editId=null,activeId=null,hlId=null;
let currentEra=null;
let dragging=false,dsx=0,dsox=0;
let hiddenCats=new Set();

const svgEl=document.getElementById('tl-svg');
const wrap=document.getElementById('tl-wrap');
const tipEl=document.getElementById('tip');
const cpop=document.getElementById('cpop');
const clList=document.getElementById('cluster-list');

/* ── Cat selects dans le formulaire (construits dynamiquement) ── */
function buildCatSelects(){
  const html=Object.entries(CATS).map(([k,v])=>`<option value="${k}">${v.e} ${v.l}</option>`).join('');
  document.getElementById('fc-select').innerHTML=html;
  buildCatPick('autre');
}

/* ── Date helpers ── */
const MN=['','Jan','Fév','Mar','Avr','Mai','Jun','Jul','Aoû','Sep','Oct','Nov','Déc'];
function fmtY(y){return y<0?Math.abs(y)+' av. J.-C.':String(y);}
function fmtDate(ev){
  let s='';
  if(ev.d)s+=ev.d+' ';
  if(ev.m)s+=MN[ev.m]+' ';
  s+=fmtY(ev.y);
  return s;
}
function fmtDateEnd(ev){
  if(!ev.ye||ev.ye===ev.y)return null;
  let s='';
  if(ev.de)s+=ev.de+' ';
  if(ev.me)s+=MN[ev.me]+' ';
  s+=fmtY(ev.ye);
  return s;
}
function midY(ev){return(ev.ye&&ev.ye!==ev.y)?(ev.y+ev.ye)/2:ev.y;}
function yearFrac(y,m,d){return y+(m?((m-1)/12+(d?d/365:0)):0);}
function wikiUrl(ev){return'https://fr.wikipedia.org/wiki/'+encodeURIComponent((ev.wiki||ev.title).replace(/ /g,'_'));}

/* ── Era strip ── */
function buildEraStrip(){
  document.getElementById('era-strip').innerHTML=ERAS.map(era=>{
    const eT=era.key==='xxi'||era.key==='all'?TODAY_Y:era.to;
    const count=events.filter(e=>midY(e)>=era.from&&midY(e)<eT&&!hiddenCats.has(e.cat)).length;
    const active=currentEra&&currentEra.key===era.key;
    const fromS=era.from<0?Math.abs(era.from)+' av. J.-C.':era.from;
    const toS=era.key==='xxi'||era.key==='all'?'Aujourd\'hui':(era.to<0?Math.abs(era.to)+' av. J.-C.':era.to);
    return`<div class="era-card${active?' active':''}${era.key==='all'?' era-all':''}" style="--era-color:${era.color}" onclick="selectEra('${era.key}')">
      <div class="ec-dot" style="background:${era.color}"></div>
      <div class="ec-name">${era.name}</div>
      <div class="ec-range">${fromS} → ${toS}</div>
      <div class="ec-count">${count} événement${count>1?'s':''}</div>
    </div>`;
  }).join('');
}

function selectEra(key){
  currentEra=ERAS.find(e=>e.key===key);
  buildEraStrip();
  document.getElementById('era-hint').style.display='none';
  document.getElementById('tl-outer').classList.add('show');
  document.getElementById('tl-dot').style.background=currentEra.color;
  const eT=key==='xxi'||key==='all'?TODAY_Y:currentEra.to;
  const toS=key==='xxi'||key==='all'?'Aujourd\'hui':(eT<0?Math.abs(eT)+' av. J.-C.':eT);
  const fromS=currentEra.from<0?Math.abs(currentEra.from)+' av. J.-C.':currentEra.from;
  document.getElementById('tl-era-name').textContent=currentEra.name+' ('+fromS+' – '+toS+')';
  setTimeout(resetView,60);
  document.getElementById('tl-outer').scrollIntoView({behavior:'smooth',block:'start'});
}

function closeEra(){
  currentEra=null;buildEraStrip();
  document.getElementById('tl-outer').classList.remove('show');
  document.getElementById('era-hint').style.display='block';
}

/* ── Era events & range ── */
function eraTo(){return currentEra.key==='xxi'||currentEra.key==='all'?TODAY_Y:currentEra.to;}
function eraEvents(){
  if(!currentEra)return[];
  const to=eraTo();
  return events.filter(e=>midY(e)>=currentEra.from&&midY(e)<to&&!hiddenCats.has(e.cat));
}
function getRange(){
  if(!currentEra)return{minY:0,maxY:TODAY_Y};
  const from=currentEra.from,to=eraTo();
  const pad=(to-from)*0.04;
  return{minY:from-pad,maxY:to+pad};
}
function yearToX(y){const{minY}=getRange();return 80+(y-minY)*scale+offsetX;}
function defScale(){const{minY,maxY}=getRange();return Math.max(.001,(svgW-160)/(maxY-minY||1));}
function resetView(){scale=defScale();offsetX=0;render();updZoom();}
function zoom(d){scale*=d>0?1.5:1/1.5;render();updZoom();}
function updZoom(){
  const p=Math.round(scale/defScale()*100)+'%';
  ['zlbl','zlbl2','zlbl3'].forEach(id=>{const el=document.getElementById(id);if(el)el.textContent=p;});
}

/* ── Tick adaptatif années/mois/jours ── */
function getTickMode(){
  const yv=svgW/scale;
  if(yv<=3)return'days';
  if(yv<=60)return'months';
  return'years';
}
function tickIv(){
  const mode=getTickMode();
  if(mode==='days'){
    const dv=svgW/(scale/365.25);
    for(const iv of[1,2,5,7,10,15])if(svgW/dv*iv>60)return iv;
    return 30;
  }
  if(mode==='months'){
    const mv=svgW/(scale/12);
    for(const iv of[1,2,3,6])if(svgW/mv*iv>55)return iv;
    return 12;
  }
  const yv=svgW/scale;
  for(const iv of[1,2,5,10,25,50,100,200,500,1000,2000,5000,10000,50000,100000])if(svgW/yv*iv>65)return iv;
  return 100000;
}

/* ── Cluster: regroupe uniquement 3+ événements trop proches ── */
const MIN_DIST=70;
function clusterEv(placed){
  const sorted=[...placed].sort((a,b)=>a.px-b.px);
  const clusters=[],used=new Set();
  for(let i=0;i<sorted.length;i++){
    if(used.has(i))continue;
    const grp=[sorted[i]];used.add(i);
    for(let j=i+1;j<sorted.length;j++){
      if(used.has(j))continue;
      if(sorted[j].px-sorted[i].px<MIN_DIST){grp.push(sorted[j]);used.add(j);}
    }
    if(grp.length>=3)clusters.push(grp);
    else grp.forEach(ev=>clusters.push([ev]));
  }
  return clusters;
}

/* ── Render ── */
function render(){
  H=window.innerWidth<640?260:340;
  const AY=Math.round(H*AY_RATIO);
  svgW=wrap.clientWidth||window.innerWidth-20;
  svgEl.setAttribute('width',svgW);svgEl.setAttribute('height',H);
  if(!currentEra){svgEl.innerHTML='';clearClusters();return;}
  const{minY}=getRange();
  const bg=ERA_BG[currentEra.key]||ERA_BG.xx;
  const mode=getTickMode();
  const iv=tickIv();
  let h='';

  /* Fond dégradé discret */
  h+=`<defs>
    <linearGradient id="bgv" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${bg.c1}" stop-opacity=".09"/>
      <stop offset="55%" stop-color="${bg.c1}" stop-opacity=".04"/>
      <stop offset="100%" stop-color="${bg.c1}" stop-opacity=".02"/>
    </linearGradient>
    <linearGradient id="bgh" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="${bg.c1}" stop-opacity=".06"/>
      <stop offset="100%" stop-color="${bg.c3}" stop-opacity=".06"/>
    </linearGradient>
    <radialGradient id="bgr1" cx="12%" cy="28%" r="42%">
      <stop offset="0%" stop-color="${bg.c1}" stop-opacity=".08"/>
      <stop offset="100%" stop-color="${bg.c1}" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="bgr2" cx="88%" cy="72%" r="42%">
      <stop offset="0%" stop-color="${bg.c3}" stop-opacity=".07"/>
      <stop offset="100%" stop-color="${bg.c3}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect x="0" y="0" width="${svgW}" height="${H}" fill="url(#bgv)"/>
  <rect x="0" y="0" width="${svgW}" height="${H}" fill="url(#bgh)"/>
  <rect x="0" y="0" width="${svgW}" height="${H}" fill="url(#bgr1)"/>
  <rect x="0" y="0" width="${svgW}" height="${H}" fill="url(#bgr2)"/>`;

  /* Ticks selon le mode */
  const eraFrom=currentEra.from, eraEnd=eraTo();
  if(mode==='years'){
    const st=Math.ceil((minY-iv*2)/iv)*iv;
    const en=st+Math.ceil(svgW/scale/iv+4)*iv;
    for(let y=st;y<=en;y+=iv){
      const x=yearToX(y);if(x<-5||x>svgW+5)continue;
      h+=`<line x1="${x}" y1="0" x2="${x}" y2="${H}" stroke="${bg.c1}" stroke-width=".4" opacity=".18"/>`;
      h+=`<circle cx="${x}" cy="${AY}" r="3" fill="${currentEra.color}" opacity=".45"/>`;
      const lbl=y<0?Math.abs(y)+' av.':y===0?'0':y;
      h+=`<text x="${x}" y="${AY+22}" text-anchor="middle" font-size="10" fill="var(--ink3)" font-family="'DM Sans',sans-serif">${lbl}</text>`;
    }
  } else if(mode==='months'){
    const startY=Math.max(Math.floor(minY),eraFrom), endY=Math.min(Math.ceil((minY+svgW/scale)),eraEnd);
    for(let y=startY;y<=endY;y++){
      for(let m=1;m<=12;m+=iv){
        const yf=yearFrac(y,m,1);if(yf<minY||yf>minY+svgW/scale)continue;
        const x=yearToX(yf);if(x<-5||x>svgW+5)continue;
        const isMaj=m===1;
        h+=`<line x1="${x}" y1="0" x2="${x}" y2="${H}" stroke="${bg.c1}" stroke-width="${isMaj?.7:.3}" opacity="${isMaj?.28:.1}"/>`;
        h+=`<circle cx="${x}" cy="${AY}" r="${isMaj?3.5:2}" fill="${currentEra.color}" opacity="${isMaj?.5:.3}"/>`;
        const lbl=isMaj?String(y):MN[m];
        h+=`<text x="${x}" y="${AY+22}" text-anchor="middle" font-size="${isMaj?10:9}" fill="var(--ink3)" font-family="'DM Sans',sans-serif" font-weight="${isMaj?'500':'400'}">${lbl}</text>`;
      }
    }
  } else {
    const startY=Math.max(Math.floor(minY),eraFrom), endY=Math.min(Math.ceil(minY+svgW/scale),eraEnd);
    for(let y=startY;y<=endY;y++){
      for(let m=1;m<=12;m++){
        for(let dd=1;dd<=31;dd+=iv){
          if(dd>28&&m===2)continue;if(dd>30&&[4,6,9,11].includes(m))continue;
          const yf=yearFrac(y,m,dd);if(yf<minY||yf>minY+svgW/scale)continue;
          const x=yearToX(yf);if(x<-5||x>svgW+5)continue;
          const isFM=dd===1&&m===1, isFirst=dd===1;
          h+=`<line x1="${x}" y1="0" x2="${x}" y2="${H}" stroke="${bg.c1}" stroke-width="${isFM?.8:isFirst?.4:.2}" opacity="${isFM?.32:isFirst?.18:.08}"/>`;
          h+=`<circle cx="${x}" cy="${AY}" r="${isFM?3.5:isFirst?2.5:1.5}" fill="${currentEra.color}" opacity="${isFM?.5:isFirst?.35:.2}"/>`;
          const lbl=isFM?String(y):isFirst?MN[m]:String(dd);
          h+=`<text x="${x}" y="${AY+22}" text-anchor="middle" font-size="${isFM?10:isFirst?9.5:9}" fill="var(--ink3)" font-family="'DM Sans',sans-serif">${lbl}</text>`;
        }
      }
    }
  }

  /* Axe */
  h+=`<line x1="0" y1="${AY}" x2="${svgW}" y2="${AY}" stroke="${currentEra.color}" stroke-width="2.5" opacity=".35"/>`;

  /* Marqueur aujourd'hui */
  if(currentEra.key==='xxi'||currentEra.key==='all'){
    const tx=yearToX(yearFrac(TODAY_Y,TODAY_M,TODAY_D));
    if(tx>=10&&tx<=svgW-10){
      h+=`<line x1="${tx}" y1="0" x2="${tx}" y2="${H}" stroke="${currentEra.color}" stroke-width="1.5" stroke-dasharray="4 4" opacity=".5"/>`;
      const lx=Math.min(tx+4,svgW-72);
      h+=`<rect x="${lx}" y="6" width="66" height="16" rx="8" fill="${currentEra.color}" opacity=".14"/>`;
      h+=`<text x="${lx+33}" y="18" text-anchor="middle" font-size="9.5" fill="${currentEra.color}" font-family="'DM Sans',sans-serif" font-weight="500">Aujourd'hui</text>`;
    }
  }

  /* Placement des événements */
  const visible=eraEvents().sort((a,b)=>a.y-b.y);
  const raw=[]; const rowLast={};
  visible.forEach((ev,i)=>{
    const px=yearToX(yearFrac(ev.y,ev.m,ev.d));
    const cands=[];for(let r=1;r<=8;r++)cands.push(-r,r);
    let row=i%2===0?-1:1;
    for(const r of cands){if(!rowLast[r]||px-rowLast[r]>95){row=r;break;}}
    rowLast[row]=px;raw.push({...ev,row,px});
  });

  /* Barres de période */
  raw.forEach(ev=>{
    if(!ev.ye||ev.ye===ev.y)return;
    const x1=Math.max(0,yearToX(ev.y)),x2=Math.min(svgW,yearToX(ev.ye));
    if(x2<0||x1>svgW)return;
    const c=(CATS[ev.cat]||CATS.autre).c;
    const above=ev.row<0,depth=Math.abs(ev.row);
    const barY=above?AY-(48+depth*36)-10:AY+(48+depth*36)+4;
    h+=`<rect x="${x1}" y="${barY}" width="${Math.max(1,x2-x1)}" height="6" rx="3" fill="${c}" opacity=".17"/>`;
    if(x1>=0)h+=`<line x1="${x1}" y1="${AY}" x2="${x1}" y2="${barY+3}" stroke="${c}" stroke-width=".7" opacity=".28"/>`;
    if(x2<=svgW)h+=`<line x1="${x2}" y1="${AY}" x2="${x2}" y2="${barY+3}" stroke="${c}" stroke-width=".7" opacity=".28"/>`;
  });

  const clusters=clusterEv(raw);
  const singles=new Set(clusters.filter(g=>g.length===1).flatMap(g=>g.map(e=>e.id)));

  /* Stems + dots */
  raw.filter(ev=>singles.has(ev.id)).forEach(ev=>{
    const px=ev.px;if(px<-80||px>svgW+80)return;
    const c=(CATS[ev.cat]||CATS.autre).c;
    const above=ev.row<0,depth=Math.abs(ev.row),sl=48+depth*36;
    const lY=above?AY-sl:AY+sl,by=above?lY-42:lY;
    h+=`<circle cx="${px}" cy="${AY}" r="7" fill="${c}" opacity=".17" data-id="${ev.id}"/>`;
    h+=`<circle cx="${px}" cy="${AY}" r="${activeId===ev.id?5.5:4}" fill="${c}" stroke="var(--paper2)" stroke-width="1.5" style="cursor:pointer" data-id="${ev.id}"/>`;
    h+=`<line x1="${px}" y1="${AY+(above?-5:5)}" x2="${px}" y2="${above?by+42:by}" stroke="${c}" stroke-width="1" stroke-dasharray="2 3" opacity=".38"/>`;
  });

  /* Cartes */
  raw.filter(ev=>singles.has(ev.id)).forEach(ev=>{h+=buildCard(ev,AY);});

  svgEl.setAttribute('height',H);
  svgEl.innerHTML=h;
  svgEl.querySelectorAll('[data-id]').forEach(el=>{
    const id=parseInt(el.dataset.id);
    el.addEventListener('click',e=>{e.stopPropagation();openCard(id,e);});
    el.addEventListener('mousemove',e=>showTip(e,id));
    el.addEventListener('mouseleave',()=>{tipEl.style.display='none';});
  });
  clearClusters();
  clusters.filter(g=>g.length>=3).forEach(g=>buildClusterOv(g,AY));
  renderLegend();buildEraStrip();
}

function buildCard(ev,AY){
  const cat=CATS[ev.cat]||CATS.autre,c=cat.c;
  const px=ev.px;if(px<-80||px>svgW+80)return'';
  const above=ev.row<0,depth=Math.abs(ev.row),sl=48+depth*36;
  const lY=above?AY-sl:AY+sl;
  const label=ev.title.length>25?ev.title.slice(0,24)+'…':ev.title;
  const bw=Math.min(label.length*7.2+30,192);
  const bh=42,bx=Math.max(4,Math.min(px-bw/2,svgW-bw-4));
  const by=above?lY-bh:lY;
  const isHL=ev.id===hlId;
  let s='';
  if(ev.id===activeId||isHL)s+=`<rect x="${bx-5}" y="${by-5}" width="${bw+10}" height="${bh+10}" rx="13" fill="${c}" opacity="${isHL?.2:.13}"/>`;
  s+=`<rect x="${bx}" y="${by}" width="${bw}" height="${bh}" rx="10" fill="var(--paper)" stroke="${c}" stroke-width="${activeId===ev.id?1.75:.75}" style="cursor:pointer" data-id="${ev.id}"/>`;
  s+=`<rect x="${bx}" y="${by}" width="${bw}" height="5" rx="5" fill="${c}" opacity=".85" style="pointer-events:none"/>`;
  s+=`<rect x="${bx}" y="${by+3}" width="${bw}" height="3" fill="${c}" opacity=".85" style="pointer-events:none"/>`;
  if(ev.ye&&ev.ye!==ev.y)s+=`<rect x="${bx+bw-13}" y="${by+9}" width="7" height="7" rx="2" fill="${c}" opacity=".38" style="pointer-events:none"/>`;
  s+=`<text x="${bx+9}" y="${by+20}" font-size="11.5" font-weight="500" fill="${c}" font-family="'Playfair Display',serif" style="cursor:pointer" data-id="${ev.id}">${label}</text>`;
  s+=`<text x="${bx+9}" y="${by+33}" font-size="9.5" fill="${c}" opacity=".68" font-family="'DM Sans',sans-serif" data-id="${ev.id}" style="cursor:pointer">${fmtDate(ev)}</text>`;
  return s;
}

/* ── Cluster overlays HTML ── */
function clearClusters(){document.querySelectorAll('.cluster-ov').forEach(e=>e.remove());}
function buildClusterOv(grp,AY){
  const avgX=grp.reduce((s,e)=>s+e.px,0)/grp.length;
  if(avgX<-30||avgX>svgW+30)return;
  const catC={};grp.forEach(e=>{catC[e.cat]=(catC[e.cat]||0)+1;});
  const dc=Object.entries(catC).sort((a,b)=>b[1]-a[1])[0][0];
  const c=(CATS[dc]||CATS.autre).c;
  const sz=window.innerWidth<640?Math.min(58+grp.length*4,86):Math.min(50+grp.length*4,76);
  const div=document.createElement('div');
  div.className='cluster-ov';
  div.style.cssText=`position:absolute;left:${avgX}px;top:${AY}px;transform:translate(-50%,-50%);
    width:${sz}px;height:${sz}px;border-radius:50%;background:var(--paper);
    border:2.5px solid ${c};display:flex;flex-direction:column;align-items:center;justify-content:center;
    cursor:pointer;transition:transform .15s;box-shadow:0 2px 14px ${c}30;font-family:var(--fb);z-index:10`;
  div.innerHTML=`<span style="font-size:${sz>62?16:13}px;font-weight:600;color:${c};line-height:1">${grp.length}</span>
    <span style="font-size:9px;color:${c};opacity:.7;margin-top:2px">évts</span>`;
  div.addEventListener('click',e=>{e.stopPropagation();openClusterList(grp,e);});
  div.addEventListener('mouseenter',()=>div.style.transform='translate(-50%,-50%) scale(1.1)');
  div.addEventListener('mouseleave',()=>div.style.transform='translate(-50%,-50%)');
  wrap.style.position='relative';wrap.appendChild(div);
}

function openClusterList(grp,e){
  closeCard();
  document.getElementById('cl-title-span').textContent=grp.length+' événements groupés';
  document.getElementById('cl-items').innerHTML=grp.sort((a,b)=>a.y-b.y).map(ev=>{
    const cat=CATS[ev.cat]||CATS.autre;
    return`<div class="cl-item" onclick="zoomToEv(${ev.id})">
      <div class="cl-dot" style="background:${cat.c}"></div>
      <div><div class="cl-name">${ev.title}</div>
      <div class="cl-yr">${fmtDate(ev)} · ${cat.e} ${cat.l}</div></div>
    </div>`;
  }).join('');
  clList.style.display='block';
  if(window.innerWidth<640){
    clList.style.cssText='display:block;position:fixed;bottom:0;left:0;right:0;top:auto;width:100%;border-radius:var(--rxl) var(--rxl) 0 0;z-index:260';
  } else {
    const vw=window.innerWidth,vh=window.innerHeight;
    clList.style.cssText=`display:block;position:fixed;z-index:260;width:300px;left:${Math.min(e.clientX+10,vw-310)}px;top:${Math.min(e.clientY-40,vh-380)}px`;
  }
}
function closeClusterList(){clList.style.display='none';}
function zoomToEv(id){
  closeClusterList();
  const ev=events.find(e=>e.id===id);if(!ev)return;
  const{minY}=getRange();scale=defScale()*7;
  offsetX=(svgW/2)-80-(yearFrac(ev.y,ev.m,ev.d)-minY)*scale;
  render();updZoom();hlId=id;
  setTimeout(()=>{hlId=null;render();},2200);
}

/* ── Tooltip ── */
function showTip(e,id){
  const ev=events.find(x=>x.id===id);if(!ev)return;
  const cat=CATS[ev.cat]||CATS.autre;
  tipEl.style.display='block';
  tipEl.style.left=(e.clientX+16)+'px';tipEl.style.top=(e.clientY-22)+'px';
  tipEl.innerHTML=`<strong>${ev.title}</strong>
    <div class="ty" style="color:${cat.c}">${fmtDate(ev)} · ${cat.e} ${cat.l}</div>
    ${ev.desc?`<div class="td">${ev.desc.slice(0,100)}${ev.desc.length>100?'…':''}</div>`:''}`;
}

/* ── Card popup — images via <img> HTML standard ── */
function openCard(id,e){
  const ev=events.find(x=>x.id===id);if(!ev)return;
  const cat=CATS[ev.cat]||CATS.autre;
  const endS=fmtDateEnd(ev);
  document.getElementById('cp-img-w').innerHTML=ev.img
    ?`<img class="cp-img" src="${ev.img}" alt="${ev.title}" loading="lazy"
        onerror="this.parentNode.innerHTML='<div style=\\'width:100%;height:80px;display:flex;align-items:center;justify-content:center;font-size:42px;background:${cat.bg}\\'>${cat.e}</div>'">`
    :`<div style="width:100%;height:72px;display:flex;align-items:center;justify-content:center;font-size:42px;background:${cat.bg}">${cat.e}</div>`;
  document.getElementById('cp-stripe').style.cssText=`height:5px;background:linear-gradient(90deg,${cat.c},${cat.c}66)`;
  const ce=document.getElementById('cp-cat');
  ce.textContent=`${cat.e} ${cat.l}`;ce.style.background=cat.bg;ce.style.color=cat.c;
  document.getElementById('cp-dates').innerHTML=endS
    ?`<strong style="color:${cat.c}">${fmtDate(ev)}</strong><br>→ ${endS}`:fmtDate(ev);
  document.getElementById('cp-title').textContent=ev.title;
  const pbw=document.getElementById('cp-period-wrap');
  if(ev.ye&&ev.ye!==ev.y&&currentEra){
    const span=ev.ye-ev.y,eraSpan=eraTo()-currentEra.from;
    const pct=Math.min(100,Math.round(span/eraSpan*100));
    pbw.style.display='block';
    document.getElementById('cp-period-label').textContent=`Durée : ${span} an${span>1?'s':''} (${pct}% de l'époque)`;
    document.getElementById('cp-period-fill').style.cssText=`width:${pct}%;background:${cat.c}`;
  } else pbw.style.display='none';
  document.getElementById('cp-desc').textContent=ev.desc||'Aucune description.';
  document.getElementById('cp-edit').onclick=()=>{closeCard();openEdit(id);};
  document.getElementById('cp-edit').style.cssText=`background:linear-gradient(135deg,${cat.c},${cat.c}bb);color:#fff;flex:1;min-width:70px;font-family:var(--fb);font-size:12px;font-weight:500;padding:8px;border-radius:100px;cursor:pointer;border:none`;
  document.getElementById('cp-wiki').href=wikiUrl(ev);
  cpop.style.display='block';
  if(window.innerWidth<640){
    cpop.style.cssText='display:block;position:fixed;bottom:0;left:0;right:0;top:auto;width:100%;border-radius:24px 24px 0 0;max-height:88vh;overflow-y:auto;z-index:250';
  } else {
    const vw=window.innerWidth,vh=window.innerHeight;
    cpop.style.cssText=`display:block;position:fixed;border-radius:var(--rxl);width:min(350px,90vw);z-index:250;
      top:${Math.min(e.clientY-60,vh-520)}px;left:${Math.min(e.clientX+16,vw-366)}px`;
  }
  activeId=id;render();
}
function closeCard(){cpop.style.display='none';activeId=null;render();}
document.addEventListener('click',e=>{
  if(!cpop.contains(e.target)&&!e.target.dataset.id)closeCard();
  if(clList.style.display!=='none'&&!clList.contains(e.target)&&!e.target.closest('.cluster-ov'))closeClusterList();
});

/* ── Legend ── */
function renderLegend(){
  document.getElementById('legend').innerHTML=Object.entries(CATS).map(([k,v])=>{
    const on=!hiddenCats.has(k);
    return`<div class="leg-item" style="background:${on?v.bg:'var(--paper2)'};color:${on?v.c:'var(--ink3)'};border-color:${on?v.c:'var(--paper4)'};opacity:${on?1:.45}" onclick="toggleCat('${k}')">${v.e} ${v.l}</div>`;
  }).join('');
}
function toggleCat(k){hiddenCats.has(k)?hiddenCats.delete(k):hiddenCats.add(k);render();buildEraStrip();}

/* ── Search ── */
function hl(str,q){
  if(!q)return str;
  return String(str).replace(new RegExp(`(${q.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')})`,'gi'),'<mark>$1</mark>');
}
function onSearch(q){
  document.getElementById('scl').classList.toggle('on',q.length>0);
  const res=document.getElementById('sres');
  if(!q.trim()){res.classList.remove('open');hlId=null;render();return;}
  const ql=q.toLowerCase(),yn=parseInt(q);
  const matched=events.filter(ev=>
    ev.title.toLowerCase().includes(ql)||(ev.desc||'').toLowerCase().includes(ql)||
    (ev.wiki||'').toLowerCase().includes(ql)||(CATS[ev.cat]?CATS[ev.cat].l.toLowerCase().includes(ql):false)||
    String(Math.abs(ev.y)).includes(q)||(!isNaN(yn)&&Math.abs(ev.y-yn)<30)
  ).sort((a,b)=>!isNaN(yn)?Math.abs(a.y-yn)-Math.abs(b.y-yn):a.y-b.y);
  if(!matched.length){res.innerHTML=`<div class="sr-empty">Aucun résultat pour « ${q} »</div>`;res.classList.add('open');return;}
  res.innerHTML=matched.slice(0,10).map(ev=>{
    const cat=CATS[ev.cat]||CATS.autre;
    const dm=(ev.desc||'').toLowerCase().includes(ql);
    let ds='';
    if(dm){const i=(ev.desc||'').toLowerCase().indexOf(ql);const s=Math.max(0,i-30);ds=`<div class="sri-desc">${hl((s>0?'…':''+(ev.desc||'').slice(s,i+ql.length+50)+'…'),q)}</div>`;}
    const endS=fmtDateEnd(ev);
    return`<div class="sri" onclick="goToEv(${ev.id})">
      <div class="sri-dot" style="background:${cat.c}"></div>
      <div style="min-width:0">
        <div class="sri-title">${hl(ev.title,q)}</div>
        <div class="sri-meta">${fmtDate(ev)}${endS?' → '+endS:''} · ${cat.e} ${cat.l}</div>
        ${ds}
      </div>
    </div>`;
  }).join('');
  res.classList.add('open');
}
function clearSearch(){
  document.getElementById('si').value='';
  document.getElementById('sres').classList.remove('open');
  document.getElementById('scl').classList.remove('on');
  hlId=null;render();
}
function goToEv(id){
  const ev=events.find(e=>e.id===id);if(!ev)return;
  document.getElementById('sres').classList.remove('open');
  const era=ERAS.find(er=>er.key!=='all'&&midY(ev)>=er.from&&midY(ev)<(er.key==='xxi'?TODAY_Y:er.to));
  if(era&&(!currentEra||currentEra.key!==era.key))selectEra(era.key);
  hlId=id;
  setTimeout(()=>{
    const{minY}=getRange();scale=defScale()*7;
    offsetX=(svgW/2)-80-(yearFrac(ev.y,ev.m,ev.d)-minY)*scale;
    render();updZoom();
    setTimeout(()=>{hlId=null;render();},2500);
  },200);
}

/* ── Image ── */
function applyImgUrl(){
  const url=document.getElementById('f-img-url').value.trim();
  if(!url)return;
  document.getElementById('ipr').style.display='block';
  document.getElementById('iprel').src=url;
  document.getElementById('iprel').onerror=()=>{document.getElementById('iprel').alt='URL invalide';};
}
function removeImg(){
  document.getElementById('ipr').style.display='none';
  document.getElementById('iprel').src='';
  document.getElementById('f-img-url').value='';
}

/* ── Cat picker ── */
function buildCatPick(sel){
  document.getElementById('cpick').innerHTML=Object.entries(CATS).map(([k,v])=>
    `<div class="csw${k===sel?' sel':''}" style="background:${v.bg};color:${v.c};border-color:${k===sel?v.c:'transparent'}" onclick="pickCat('${k}',this)">${v.e} ${v.l}</div>`
  ).join('');
  document.getElementById('fc').value=sel||Object.keys(CATS)[0]||'autre';
}
function pickCat(k,el){
  document.getElementById('fc').value=k;
  document.querySelectorAll('.csw').forEach(s=>{s.classList.remove('sel');s.style.borderColor='transparent';});
  el.classList.add('sel');el.style.borderColor=CATS[k].c;
}

/* ── Modal ── */
function resetForm(){
  ['ft','fy','fm','fd2','fye','fme','fde','fdesc','fwiki','f-img-url'].forEach(id=>{
    const el=document.getElementById(id);if(el)el.value='';
  });
  removeImg();
}
function openAdd(){
  editId=null;resetForm();
  document.getElementById('mtitle').textContent='Nouvel événement';
  if(currentEra){const mid=Math.round((currentEra.from+Math.min(eraTo(),TODAY_Y))/2);document.getElementById('fy').value=mid;}
  buildCatPick('autre');
  document.getElementById('bdel').style.display='none';
  document.getElementById('mbg').classList.add('open');
  setTimeout(()=>document.getElementById('ft').focus(),80);
}
function openEdit(id){
  const ev=events.find(e=>e.id===id);if(!ev)return;
  editId=id;resetForm();
  document.getElementById('mtitle').textContent="Modifier l'événement";
  document.getElementById('ft').value=ev.title||'';
  document.getElementById('fy').value=ev.y||'';
  document.getElementById('fm').value=ev.m||'';
  document.getElementById('fd2').value=ev.d||'';
  document.getElementById('fye').value=(ev.ye&&ev.ye!==ev.y)?ev.ye:'';
  document.getElementById('fme').value=ev.me||'';
  document.getElementById('fde').value=ev.de||'';
  document.getElementById('fdesc').value=ev.desc||'';
  document.getElementById('fwiki').value=ev.wiki||'';
  if(ev.img){document.getElementById('f-img-url').value=ev.img;document.getElementById('ipr').style.display='block';document.getElementById('iprel').src=ev.img;}
  buildCatPick(ev.cat||'autre');
  document.getElementById('bdel').style.display='inline-block';
  document.getElementById('mbg').classList.add('open');
}
function closeMod(){document.getElementById('mbg').classList.remove('open');}

function saveEv(){
  const title=(document.getElementById('ft').value||'').trim();
  const yv=(document.getElementById('fy').value||'').trim();
  if(!title){document.getElementById('ft').style.borderColor='#f03060';document.getElementById('ft').focus();return;}
  if(!yv){document.getElementById('fy').style.borderColor='#f03060';document.getElementById('fy').focus();return;}
  const y=parseInt(yv);
  if(isNaN(y)){document.getElementById('fy').style.borderColor='#f03060';document.getElementById('fy').focus();return;}
  document.getElementById('ft').style.borderColor='';document.getElementById('fy').style.borderColor='';
  const mRaw=document.getElementById('fm').value;const m=mRaw?parseInt(mRaw):undefined;
  const dRaw=document.getElementById('fd2').value;const d=dRaw?parseInt(dRaw):undefined;
  const yeRaw=(document.getElementById('fye').value||'').trim();const ye=yeRaw?parseInt(yeRaw):y;
  const meRaw=document.getElementById('fme').value;const me=meRaw?parseInt(meRaw):undefined;
  const deRaw=document.getElementById('fde').value;const de=deRaw?parseInt(deRaw):undefined;
  const desc=document.getElementById('fdesc').value.trim();
  const cat=document.getElementById('fc').value||'autre';
  const wiki=document.getElementById('fwiki').value.trim();
  const img=document.getElementById('f-img-url').value.trim();
  const obj={id:editId||nextId,title,y,ye,cat,desc,wiki,img,updatedAt:Date.now()};
  if(m)obj.m=m;if(d)obj.d=d;if(me)obj.me=me;if(de)obj.de=de;
  if(editId){const i=events.findIndex(e=>e.id===editId);if(i>=0)events[i]=obj;}
  else{nextId++;events.push(obj);}
  saveSt();closeMod();
  const mid=Math.round((y+ye)/2);
  const era=ERAS.find(er=>er.key!=='all'&&mid>=er.from&&mid<(er.key==='xxi'?TODAY_Y:er.to));
  if(era&&(!currentEra||currentEra.key!==era.key))selectEra(era.key);
  else{render();updZoom();}
  setTimeout(()=>{hlId=obj.id;render();setTimeout(()=>{hlId=null;render();},2000);},300);
}
function deleteEv(){
  if(!editId||!confirm('Supprimer cet événement ?'))return;
  if(window.__firebaseDelete)window.__firebaseDelete(editId);
  events=events.filter(e=>e.id!==editId);
  saveSt();closeMod();render();updZoom();
}
document.getElementById('mbg').addEventListener('click',e=>{if(e.target===e.currentTarget)closeMod();});

/* ── Mobile navigation ── */
function panLeft(){offsetX+=svgW*0.4;render();}
function panRight(){offsetX-=svgW*0.4;render();}

/* ── Drag / wheel / touch ── */
wrap.addEventListener('mousedown',e=>{
  if(e.target.dataset.id||e.target.closest('.cluster-ov'))return;
  dragging=true;dsx=e.clientX;dsox=offsetX;wrap.classList.add('dragging');
});
window.addEventListener('mousemove',e=>{if(!dragging)return;offsetX=dsox+(e.clientX-dsx);render();});
window.addEventListener('mouseup',()=>{dragging=false;wrap.classList.remove('dragging');});
wrap.addEventListener('wheel',e=>{
  e.preventDefault();
  const f=e.deltaY<0?1.18:1/1.18;
  const mx=e.clientX-wrap.getBoundingClientRect().left;
  const{minY}=getRange();
  const yam=(mx-80-offsetX)/scale+minY;
  scale*=f;offsetX=mx-80-(yam-minY)*scale;
  render();updZoom();
},{passive:false});
let ltx=null,ltd=null;
wrap.addEventListener('touchstart',e=>{
  if(e.touches.length===2){ltd=Math.hypot(e.touches[0].clientX-e.touches[1].clientX,e.touches[0].clientY-e.touches[1].clientY);ltx=null;}
  else{ltx=e.touches[0].clientX;ltd=null;}
},{passive:true});
wrap.addEventListener('touchmove',e=>{
  if(e.touches.length===2&&ltd){
    const d=Math.hypot(e.touches[0].clientX-e.touches[1].clientX,e.touches[0].clientY-e.touches[1].clientY);
    const cx=(e.touches[0].clientX+e.touches[1].clientX)/2-wrap.getBoundingClientRect().left;
    const{minY}=getRange();const yam=(cx-80-offsetX)/scale+minY;
    scale*=d/ltd;ltd=d;offsetX=cx-80-(yam-minY)*scale;render();updZoom();
  } else if(ltx&&e.touches.length===1){
    offsetX+=e.touches[0].clientX-ltx;ltx=e.touches[0].clientX;render();
  }
},{passive:true});
wrap.addEventListener('touchend',()=>{ltx=null;ltd=null;});

/* ── Keyboard ── */
document.addEventListener('keydown',e=>{
  if(e.key==='Escape'){closeMod();closeCard();closeClusterList();clearSearch();}
  if((e.metaKey||e.ctrlKey)&&e.key==='k'){e.preventDefault();document.getElementById('si').focus();}
  if((e.metaKey||e.ctrlKey)&&e.key==='Enter'&&document.getElementById('mbg').classList.contains('open'))saveEv();
});
document.addEventListener('click',e=>{
  if(!document.getElementById('sres').contains(e.target)&&e.target!==document.getElementById('si'))
    document.getElementById('sres').classList.remove('open');
});
window.addEventListener('resize',()=>{if(currentEra)render();});
