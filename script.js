/* ═══ FRISE CHRONOLOGIQUE — script.js CORRIGÉ ═══ */
const TODAY=new Date(), TODAY_Y=TODAY.getFullYear(), TODAY_M=TODAY.getMonth()+1, TODAY_D=TODAY.getDate();

/* Catégories inline — toujours dispo même si data.json ne charge pas */
let CATS={
  politique:{c:'#4f6ef7',bg:'rgba(79,110,247,.13)',l:'Politique',e:'🏛'},
  science:  {c:'#16c47a',bg:'rgba(22,196,122,.13)',l:'Science',e:'🔬'},
  art:      {c:'#f0742a',bg:'rgba(240,116,42,.13)',l:'Art & Culture',e:'🎨'},
  guerre:   {c:'#f03060',bg:'rgba(240,48,96,.13)',l:'Guerre',e:'⚔️'},
  sport:    {c:'#f59e0b',bg:'rgba(245,158,11,.13)',l:'Sport',e:'🏆'},
  autre:    {c:'#a855f7',bg:'rgba(168,85,247,.13)',l:'Autre',e:'✦'},
};

const ERAS=[
  {key:'all',    name:"Toute l'histoire",from:-300000,to:TODAY_Y, color:'#8b5cf6'},
  {key:'prehist',name:'Préhistoire',     from:-300000,to:-3200,   color:'#e07820'},
  {key:'antiq',  name:'Antiquité',       from:-3200,  to:476,     color:'#d4a020'},
  {key:'moyen',  name:'Moyen Âge',       from:476,    to:1492,    color:'#4f6ef7'},
  {key:'mod',    name:'Époque Moderne',  from:1492,   to:1789,    color:'#16c47a'},
  {key:'contemp',name:'XIXᵉ siècle',     from:1789,   to:1900,    color:'#f03060'},
  {key:'xx',     name:'XXᵉ siècle',      from:1900,   to:2000,    color:'#a855f7'},
  {key:'xxi',    name:'XXIᵉ siècle',     from:2000,   to:TODAY_Y, color:'#06b6d4'},
];

const ERA_BG={
  all:    {c1:'#8b5cf6',c3:'#f03060'},
  prehist:{c1:'#e07820',c3:'#b45309'},
  antiq:  {c1:'#d4a020',c3:'#92400e'},
  moyen:  {c1:'#4f6ef7',c3:'#1d4ed8'},
  mod:    {c1:'#16c47a',c3:'#047857'},
  contemp:{c1:'#f03060',c3:'#9f1239'},
  xx:     {c1:'#a855f7',c3:'#6d28d9'},
  xxi:    {c1:'#06b6d4',c3:'#155e75'},
};

/* ── Storage localStorage ── */
const SK='frise_v11';
function loadLocal(){try{const s=localStorage.getItem(SK);return s?JSON.parse(s):null;}catch{return null;}}
function saveLocal(){try{localStorage.setItem(SK,JSON.stringify(events));}catch(e){}}

let events=[];
let nextId=1;

/* ── Firebase: appelé depuis index.html après init Firebase ── */
window.__mergeRemote=function(remote){
  let changed=false;
  remote.forEach(r=>{
    const loc=events.find(e=>e.id===r.id);
    if(!loc){events.push(r);changed=true;}
    else if((r.updatedAt||0)>(loc.updatedAt||0)){Object.assign(loc,r);changed=true;}
  });
  if(changed){saveLocal();nextId=Math.max(...events.map(e=>e.id),0)+1;render();buildEraStrip();}
};

function saveSt(){
  saveLocal();
  if(window.__firebaseSave)window.__firebaseSave(events);
}

/* ── Chargement data.json PUIS init (ordre garanti) ── */
function startApp(defaults,cats){
