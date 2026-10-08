import {useState,useEffect,useRef} from 'react'

const SKIN=typeof __SKIN__!=='undefined'?__SKIN__:'ios'
const FRAME=typeof __PREVIEW__!=='undefined'
const T=new Date().toISOString().slice(0,10)
const SEED={dep:[{id:1,n:'دڵ'},{id:2,n:'منداڵان'},{id:3,n:'ئێسک'},{id:4,n:'فریاکەوتن'}],
doc:[{id:1,n:'د. ڕێبوار ساڵح',dep:1,sp:'پسپۆڕی دڵ'},{id:2,n:'د. هەڵاڵە عومەر',dep:2,sp:'منداڵان'},{id:3,n:'د. کاوە محەمەد',dep:3,sp:'نەشتەرگەری ئێسک'},{id:4,n:'د. سۆزان ئازاد',dep:4,sp:'فریاکەوتن'}],
pat:[{id:1,n:'ئاراس ئەحمەد',ph:'0750 111 2233',bd:'1990-04-12'},{id:2,n:'شنۆ کەریم',ph:'0770 444 5566',bd:'1985-09-03'},{id:3,n:'ڕێناس حەمە',ph:'0751 222 7788',bd:'2016-01-20'}],
svc:[{id:1,n:'پشکنینی خوێن',p:15000},{id:2,n:'تیشک (X-Ray)',p:30000},{id:3,n:'پشکنینی گشتی',p:10000},{id:4,n:'ئێکۆی دڵ',p:45000}],
vis:[{id:1,pid:1,did:1,date:T,room:'A-12',st:1,paid:0},{id:2,pid:2,did:3,date:T,room:'B-04',st:0,paid:0},{id:3,pid:3,did:2,date:T,room:'C-02',st:2,paid:1}],
tr:[{v:1,s:3,q:1},{v:1,s:4,q:1},{v:3,s:3,q:1}]}
const load=()=>{try{return JSON.parse(localStorage.getItem('hdb2'))||SEED}catch(e){return SEED}}
const fmt=n=>n.toLocaleString('en-US')+' د.ع'
const ST=['چاوەڕوان','لە چارەسەر','تەواوبوو']
const SC=['bg-amber-100 text-amber-700','bg-sky-100 text-sky-700 animate-pulse','bg-emerald-100 text-emerald-700']
const SPBG={android:'bg-gradient-to-br from-[#00221d] via-[#006b5e] to-[#0b4a52]',ios:'bg-gradient-to-br from-[#0a1a3a] via-[#1c5fd6] to-[#5b3ad1]',desktop:'bg-gradient-to-br from-[#07171d] via-[#0b2a33] to-[#a8403a]'}
const IC={home:'M3 11l9-8 9 8v9a1 1 0 01-1 1h-5v-6H9v6H4a1 1 0 01-1-1z',vis:'M8 2v4M16 2v4M3 9h18M5 4h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2z',pat:'M12 4a4 4 0 100 8 4 4 0 000-8zM4 21c0-4 3.5-7 8-7s8 3 8 7',doc:'M12 3v6M9 6h6M6 9h12a2 2 0 012 2v8a2 2 0 01-2 2H6a2 2 0 01-2-2v-8a2 2 0 012-2zM9 15h6',svc:'M12 8v8M8 12h8M6 3h12a3 3 0 013 3v12a3 3 0 01-3 3H6a3 3 0 01-3-3V6a3 3 0 013-3z'}
const TABS=[['home','سەرەکی'],['vis','سەردانەکان'],['pat','نەخۆشەکان'],['doc','پزیشکەکان'],['svc','خزمەتگوزاری']]
const ADD={vis:'سەردانی نوێ',pat:'نەخۆشی نوێ',doc:'پزیشکی نوێ',svc:'خزمەتگوزاری نوێ'}
const FORMS={pat:[['n','ناو'],['ph','تەلەفۆن','tel'],['bd','ڕێکەوتی لەدایکبوون','date']],svc:[['n','ناو'],['p','نرخ','number']],dep:[['n','ناوی بەش']],doc:[['n','ناو'],['sp','پسپۆڕی'],['dep','بەش','sel:dep']],vis:[['pid','نەخۆش','sel:pat'],['did','پزیشک','sel:doc'],['date','ڕێکەوت','date'],['room','ژوور']]}
const INP='w-full rounded-[calc(var(--r)-6px)] border border-white/60 bg-white/30 px-3.5 py-3 text-ink outline-none transition duration-300 focus:-translate-y-px focus:border-pri focus:bg-white/60 focus:[box-shadow:0_0_0_4px_color-mix(in_srgb,var(--pri)_25%,transparent)]'

const Ic=({k})=><svg viewBox="0 0 24 24" className="h-6 w-6 fill-none stroke-current stroke-[1.8] transition-transform duration-300 [stroke-linecap:round] [stroke-linejoin:round] group-hover/b:scale-125"><path d={IC[k]}/></svg>

function Count({n}){const [v,setV]=useState(0);useEffect(()=>{let r;const t0=performance.now();const f=t=>{const p=Math.min((t-t0)/900,1);setV(Math.round(n*(1-Math.pow(1-p,3))));if(p<1)r=requestAnimationFrame(f)};r=requestAnimationFrame(f);return()=>cancelAnimationFrame(r)},[n]);return v.toLocaleString('en-US')}

const Card=({i=0,className='',children,...p})=><div style={{animationDelay:i*90+'ms'}} className={'glass relative animate-up rounded-[calc(var(--r)+6px)] p-4 transition duration-500 before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:bg-gradient-to-br before:from-white/50 before:to-transparent before:to-40% hover:-translate-y-1 hover:shadow-2xl [&>*]:relative '+className} {...p}>{children}</div>

const Btn=({v,className='',...p})=><button className={'relative w-full overflow-hidden rounded-[calc(var(--r)-4px)] px-4 py-3 font-extrabold transition duration-300 before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/40 before:to-transparent before:transition-transform before:duration-700 hover:-translate-y-0.5 hover:brightness-110 hover:before:translate-x-full active:scale-95 '+(v==='g'?'bg-[var(--gl2)] text-pri ':v==='d'?'bg-rose-100/70 text-rose-600 ':'bg-gradient-to-b from-[color-mix(in_srgb,var(--pri)_80%,white)] to-pri text-white shadow-[0_10px_22px_-10px_var(--pri),inset_0_1.5px_0_rgba(255,255,255,.6)] ')+className} {...p}/>

const Chip=({s})=><span className={'rounded-full px-2.5 py-0.5 text-[11px] font-bold shadow-[inset_0_1px_0_rgba(255,255,255,.7)] '+SC[s]}>{ST[s]}</span>

const Row=({a,t,s,r,onClick})=><div onClick={onClick} className="group/r flex cursor-pointer items-center gap-3 border-b border-white/40 py-3 transition duration-300 last:border-0 hover:-translate-x-1.5 hover:rounded-2xl hover:bg-white/30 hover:px-2 active:scale-[.985]">
<span className="grid h-11 w-11 flex-none place-items-center rounded-full bg-gradient-to-br from-pri to-teal-400 font-extrabold text-white shadow-[inset_0_1.5px_0_rgba(255,255,255,.6)] transition duration-300 group-hover/r:-rotate-6 group-hover/r:scale-110 group-data-[s=desktop]:rounded-xl">{a}</span>
<div className="min-w-0 flex-1"><b className="block font-bold">{t}</b><small className="text-xs text-mut">{s}</small></div>{r}</div>

function Splash({st,onSkip}){return <div onClick={onSkip} className={'absolute inset-0 z-[90] flex flex-col items-center justify-center overflow-hidden text-white transition-all duration-700 '+SPBG[SKIN]+(st===2?' pointer-events-none scale-110 opacity-0':'')}>
<i className="absolute -left-20 -top-20 h-80 w-80 animate-float rounded-full bg-[radial-gradient(circle,rgba(255,107,91,.55),transparent_65%)] blur-2xl"/>
<i style={{animationDelay:'-3s'}} className="absolute -bottom-24 -right-20 h-80 w-80 animate-float rounded-full bg-[radial-gradient(circle,rgba(110,198,255,.45),transparent_65%)] blur-2xl"/>
<div className="relative grid h-32 w-32 animate-tile place-items-center rounded-[38px] border border-white/50 bg-white/15 shadow-[0_24px_50px_-12px_rgba(0,0,0,.5),inset_0_2px_0_rgba(255,255,255,.7)] backdrop-blur-xl">
<span className="absolute inset-0 animate-ring rounded-[inherit] border-2 border-white/60"/>
<svg viewBox="0 0 100 100" className="h-20 w-20 fill-white drop-shadow-lg"><rect style={{animationDelay:'.35s'}} className="origin-center animate-pop [transform-box:fill-box]" x="38" y="14" width="24" height="72" rx="9"/><rect style={{animationDelay:'.5s'}} className="origin-center animate-pop [transform-box:fill-box]" x="14" y="38" width="72" height="24" rx="9"/></svg></div>
<svg viewBox="0 0 240 50" className="relative mt-6 h-[50px] w-60 overflow-visible"><path id="spp" d="M0 28H70L80 28 88 8 98 46 108 20 114 28H240" className="animate-draw fill-none stroke-[#ff6b5b] stroke-[2.6] [filter:drop-shadow(0_0_6px_rgba(255,107,91,.9))] [stroke-dasharray:330] [stroke-dashoffset:330] [stroke-linecap:round] [stroke-linejoin:round]"/><circle r="3.5" fill="#fff"><animateMotion dur="2.2s" begin="0.5s" fill="freeze"><mpath href="#spp"/></animateMotion></circle></svg>
<h1 style={{animationDelay:'.9s'}} className="relative mt-2.5 animate-up text-4xl font-extrabold">نەخۆشخانە</h1>
<p style={{animationDelay:'1.2s'}} className="relative mt-1 animate-up text-sm opacity-85">چاودێری تەندروستی بە شێوازێکی نوێ</p>
<div className="absolute bottom-12 h-1 w-[min(220px,60%)] overflow-hidden rounded bg-white/20"><i className="block h-full origin-right animate-load rounded bg-white"/></div></div>}

function Form({k,id,db,put,rm}){const fs=FORMS[k],o=id?db[k].find(x=>x.id==id):{}
const [v,setV]=useState(()=>{const r={};fs.forEach(([f,,t])=>{r[f]=o[f]??(t&&t.startsWith('sel:')?(db[t.slice(4)][0]||{}).id:t==='date'?T:f==='n'&&k==='doc'?'د. ':'')});return r})
return <><h3 className="text-xl font-extrabold">{id?'دەستکاریکردن':'زیادکردن'}</h3>
{fs.map(([f,l,t='text'])=><label key={f} className="mt-3 block text-xs font-semibold text-mut">{l}
{t.startsWith('sel:')?<select className={INP+' mt-1'} value={v[f]} onChange={e=>setV({...v,[f]:e.target.value})}>{db[t.slice(4)].map(x=><option key={x.id} value={x.id}>{x.n}</option>)}</select>:<input className={INP+' mt-1'} type={t} value={v[f]} onChange={e=>setV({...v,[f]:e.target.value})}/>}</label>)}
<Btn className="mt-4" onClick={()=>{const r={...v};['dep','pid','did','p'].forEach(f=>{if(f in r)r[f]=+r[f]});if(!(r.n||r.pid))return;put(k,{...r,id})}}>پاشەکەوتکردن</Btn>
{id&&<Btn v="d" className="mt-2" onClick={()=>rm(k,id)}>سڕینەوە</Btn>}</>}

function Detail({id,db,G,tot,upd,addT,rmT,rm}){const v=G('vis',id),ts=db.tr.filter(t=>t.v==id),[s,setS]=useState((db.svc[0]||{}).id),[q,setQ]=useState(1)
return <><h3 className="text-xl font-extrabold">{G('pat',v.pid).n}</h3><small className="text-mut">{G('doc',v.did).n} · {v.date} · ژوور {v.room||'-'}</small>
<div className="mt-3 grid grid-cols-3 gap-2">{ST.map((n,i)=><Btn key={i} v={v.st===i?'':'g'} className="!px-1 !py-2 text-xs" onClick={()=>upd(id,{st:i})}>{n}</Btn>)}</div>
<p className="mt-3 text-xs font-semibold text-mut">چارەسەرەکان</p>
{ts.length?ts.map(t=><div key={t.s} className="flex items-center gap-2 border-b border-white/40 py-2"><div className="flex-1"><b>{G('svc',t.s).n}</b> <span className="rounded-full bg-emerald-200 px-2 text-xs font-bold">×{t.q}</span></div><b>{fmt(G('svc',t.s).p*t.q)}</b><button className="rounded-full bg-rose-100 px-2.5 text-xs text-rose-600 transition hover:scale-110" onClick={()=>rmT(id,t.s)}>✕</button></div>):<p className="py-4 text-center text-mut">هێشتا چارەسەر نییە</p>}
<div className="mt-2 flex gap-2"><select className={INP+' flex-[3]'} value={s} onChange={e=>setS(+e.target.value)}>{db.svc.map(x=><option key={x.id} value={x.id}>{x.n}</option>)}</select><input className={INP+' flex-1'} type="number" min="1" value={q} onChange={e=>setQ(+e.target.value||1)}/><Btn v="g" className="!w-14 !px-0" onClick={()=>addT(id,s,q)}>+</Btn></div>
<div className="mt-3 flex justify-between rounded-2xl bg-white/30 px-4 py-3 font-extrabold"><span>کۆی گشتی</span><span className="text-pri">{fmt(tot(id))}</span></div>
<Btn className="mt-3" onClick={()=>upd(id,{paid:v.paid?0:1,...(v.paid?{}:{st:2})})}>{v.paid?'پارەدراوە ✓ (هەڵوەشاندنەوە)':'پارەدان'}</Btn>
<Btn v="d" className="mt-2" onClick={()=>rm('vis',id)}>سڕینەوەی سەردان</Btn></>}

export default function App(){
const [db,setDb]=useState(load),[tab,setTab]=useState('home'),[q,setQ]=useState(''),[sh,setSh]=useState(null),[sp,setSp]=useState(1),t0=useRef(Date.now())
useEffect(()=>{try{localStorage.setItem('hdb2',JSON.stringify(db))}catch(e){}},[db])
useEffect(()=>{const a=setTimeout(()=>setSp(2),3200),b=setTimeout(()=>setSp(0),3900);return()=>{clearTimeout(a);clearTimeout(b)}},[])
const skip=()=>{if(Date.now()-t0.current>2000){setSp(2);setTimeout(()=>setSp(0),700)}}
const G=(k,id)=>db[k].find(x=>x.id==id)||{}
const tot=v=>db.tr.filter(t=>t.v==v).reduce((s,t)=>s+(G('svc',t.s).p||0)*t.q,0)
const put=(k,o)=>{setDb(d=>{const a=d[k];if(o.id)return{...d,[k]:a.map(x=>x.id==o.id?{...x,...o}:x)};const id=Math.max(0,...a.map(x=>x.id))+1;return{...d,[k]:[...a,{...o,id,...(k==='vis'?{st:0,paid:0}:{})}]}});setSh(null)}
const used={pat:id=>db.vis.some(v=>v.pid==id),doc:id=>db.vis.some(v=>v.did==id),svc:id=>db.tr.some(t=>t.s==id),dep:id=>db.doc.some(d=>d.dep==id),vis:()=>false}
const rm=(k,id)=>{if(used[k](id)){alert('ئەم تۆمارە بەستراوەتەوە بە داتای تر و ناسڕدرێتەوە');return}setDb(d=>({...d,[k]:d[k].filter(x=>x.id!=id),...(k==='vis'?{tr:d.tr.filter(t=>t.v!=id)}:{})}));setSh(null)}
const upd=(id,f)=>setDb(d=>({...d,vis:d.vis.map(v=>v.id==id?{...v,...f}:v)}))
const addT=(v,s,n)=>setDb(d=>{const e=d.tr.find(t=>t.v==v&&t.s==s);return{...d,tr:e?d.tr.map(t=>t===e?{...t,q:t.q+n}:t):[...d.tr,{v,s,q:n}]}})
const rmT=(v,s)=>setDb(d=>({...d,tr:d.tr.filter(t=>!(t.v==v&&t.s==s))}))
const m=s=>!q.trim()||String(s).includes(q.trim())
const VRow=v=>{const p=G('pat',v.pid),d=G('doc',v.did);return <Row key={v.id} a={(p.n||'?')[0]} t={p.n} s={(d.n||'')+' · '+(G('dep',d.dep).n||'')+' · '+(v.room||'')} onClick={()=>setSh({k:'det',id:v.id})} r={<div className="text-left"><Chip s={v.st}/><small className="block text-xs text-mut">{v.paid?'پارەدراوە':fmt(tot(v.id))}</small></div>}/>}
const Empty=({t})=><p className="py-6 text-center text-mut">{t}</p>
let body
if(tab==='home'){const td=db.vis.filter(v=>v.date===T),inc=db.vis.filter(v=>v.paid).reduce((s,v)=>s+tot(v.id),0),cnt=db.dep.map(d=>({n:d.n,c:db.vis.filter(v=>G('doc',v.did).dep===d.id).length})),mx=Math.max(1,...cnt.map(x=>x.c))
body=<><div className="mb-3.5 grid grid-cols-2 gap-2.5 group-data-[s=desktop]:grid-cols-4">{[[db.pat.length,'نەخۆش'],[td.length,'سەردانی ئەمڕۆ'],[db.doc.length,'پزیشک'],[inc,'داهات (د.ع)']].map(([n,l],i)=><Card key={l} i={i} className="!p-3 text-center"><b className="block text-2xl font-extrabold text-pri transition-transform duration-300 hover:scale-110"><Count n={n}/></b><span className="text-xs font-semibold text-mut">{l}</span></Card>)}</div>
<div className="grid gap-3.5 group-data-[s=desktop]:grid-cols-[1.4fr_1fr]"><Card i={4}><b>ڕیزی ئەمڕۆ</b>{td.length?td.map(VRow):<Empty t="ئەمڕۆ سەردان نییە"/>}</Card>
<Card i={5}><b>سەردان بەپێی بەش</b><div className="mt-3">{cnt.map(x=><div key={x.n}><div className="flex justify-between text-sm"><span>{x.n}</span><b>{x.c}</b></div><div className="mb-3 mt-1 h-2 overflow-hidden rounded-full bg-white/40"><i className="block h-full origin-right animate-grow rounded-full bg-gradient-to-l from-pri to-teal-300" style={{width:x.c/mx*100+'%'}}/></div></div>)}</div></Card></div></>}
else if(tab==='vis'){const a=db.vis.filter(v=>m(G('pat',v.pid).n)).slice().reverse();body=<Card>{a.length?a.map(VRow):<Empty t="هیچ سەردانێک نییە"/>}</Card>}
else if(tab==='pat'){const a=db.pat.filter(p=>m(p.n)||m(p.ph));body=<Card>{a.length?a.map(p=><Row key={p.id} a={p.n[0]} t={p.n} s={p.ph+' · '+p.bd} onClick={()=>setSh({k:'pat',id:p.id})} r={<span className="rounded-full bg-sky-100 px-2.5 py-0.5 text-[11px] font-bold text-sky-700">{db.vis.filter(v=>v.pid===p.id).length} سەردان</span>}/>):<Empty t="نەخۆش نەدۆزرایەوە"/>}</Card>}
else if(tab==='doc'){body=<>{db.dep.map((d,i)=>{const a=db.doc.filter(x=>x.dep===d.id);return a.length?<Card key={d.id} i={i} className="mb-3.5"><b>بەشی {d.n}</b>{a.map(x=><Row key={x.id} a={x.n.replace('د. ','')[0]} t={x.n} s={x.sp} onClick={()=>setSh({k:'doc',id:x.id})}/>)}</Card>:null})}<Btn v="g" onClick={()=>setSh({k:'dep'})}>+ بەشی نوێ</Btn></>}
else{const a=db.svc.filter(s=>m(s.n));body=<Card>{a.map(s=><Row key={s.id} a="₪" t={s.n} onClick={()=>setSh({k:'svc',id:s.id})} r={<b className="text-pri">{fmt(s.p)}</b>}/>)}</Card>}
const title=TABS.find(t=>t[0]===tab)[1],ad=ADD[tab],srch=tab!=='home'&&tab!=='doc'
const frame=FRAME?(SKIN==='desktop'?'min-[700px]:mx-auto min-[700px]:my-3 min-[700px]:h-[calc(100dvh-24px)] min-[700px]:w-[min(1180px,calc(100%-24px))] min-[700px]:rounded-2xl min-[700px]:border min-[700px]:shadow-2xl':'min-[700px]:mx-auto min-[700px]:my-3 min-[700px]:h-[min(800px,calc(100dvh-24px))] min-[700px]:w-[390px] min-[700px]:rounded-[44px] min-[700px]:border-[9px] min-[700px]:border-neutral-900 min-[700px]:shadow-2xl'):''
return <div data-s={SKIN} dir="rtl" className={'group relative h-dvh overflow-hidden bg-bg font-sans text-ink antialiased '+frame}>
<div className="pointer-events-none absolute -inset-1/4 animate-float bg-[radial-gradient(38%_32%_at_20%_18%,var(--b1),transparent_70%),radial-gradient(34%_30%_at_82%_30%,var(--b2),transparent_70%),radial-gradient(40%_34%_at_70%_85%,var(--b3),transparent_70%),radial-gradient(36%_30%_at_15%_78%,var(--b4),transparent_70%)]"/>
<div className="relative z-10 flex h-full flex-col pt-[env(safe-area-inset-top)] group-data-[s=desktop]:flex-row">
<main className="flex-1 overflow-auto px-4 pb-6"><div className="flex items-center justify-between gap-3 pb-3 pt-5 group-data-[s=ios]:pt-8"><h2 key={tab} className="animate-up text-[28px] font-extrabold leading-tight group-data-[s=android]:font-semibold group-data-[s=ios]:text-[34px]">{title}</h2>
{srch&&<input className={INP+' hidden max-w-xs group-data-[s=desktop]:block'} placeholder="گەڕان..." value={q} onChange={e=>setQ(e.target.value)}/>}
{ad&&<button onClick={()=>setSh({k:tab})} className="hidden rounded-full bg-pri px-5 py-2 font-bold text-white transition duration-300 hover:-translate-y-0.5 hover:shadow-lg active:scale-95 group-data-[s=desktop]:block group-data-[s=ios]:grid group-data-[s=ios]:h-9 group-data-[s=ios]:w-9 group-data-[s=ios]:place-items-center group-data-[s=ios]:bg-[var(--gl2)] group-data-[s=ios]:p-0 group-data-[s=ios]:text-2xl group-data-[s=ios]:text-pri group-data-[s=ios]:hover:rotate-90"><span className="group-data-[s=ios]:hidden">+ {ad}</span><span className="hidden group-data-[s=ios]:inline">+</span></button>}</div>
{srch&&<input className={INP+' mb-3 group-data-[s=desktop]:hidden'} placeholder="گەڕان..." value={q} onChange={e=>setQ(e.target.value)}/>}
<div key={tab}>{body}</div></main>
<nav className="glass mx-3 mb-3 flex justify-around rounded-[34px] p-1.5 group-data-[s=desktop]:order-first group-data-[s=desktop]:m-3 group-data-[s=desktop]:w-52 group-data-[s=desktop]:flex-col group-data-[s=desktop]:justify-start group-data-[s=desktop]:gap-1 group-data-[s=desktop]:rounded-3xl group-data-[s=desktop]:!bg-slate-900/55 group-data-[s=desktop]:p-3 group-data-[s=desktop]:text-white">
<div className="hidden items-center gap-2 px-3 pb-4 pt-2 text-lg font-extrabold group-data-[s=desktop]:flex"><span className="animate-bob">🏥</span> نەخۆشخانە</div>
{TABS.map(([k,l])=><button key={k} onClick={()=>{setTab(k);setQ('')}} className={'group/b relative flex min-w-14 flex-col items-center gap-0.5 overflow-hidden rounded-3xl px-2 py-1.5 text-[11px] font-semibold transition duration-300 hover:bg-white/30 active:scale-90 group-data-[s=desktop]:w-full group-data-[s=desktop]:flex-row group-data-[s=desktop]:gap-3 group-data-[s=desktop]:px-3.5 group-data-[s=desktop]:py-2.5 group-data-[s=desktop]:text-sm group-data-[s=desktop]:hover:-translate-x-1 '+(tab===k?'bg-white/55 text-pri shadow-[inset_0_1.5px_0_#fff,0_4px_12px_-4px_rgba(0,0,0,.25)] group-data-[s=desktop]:!bg-[#ff6b5b] group-data-[s=desktop]:!text-white':'text-mut group-data-[s=desktop]:text-white/70')}><Ic k={k}/>{l}</button>)}</nav></div>
{ad&&<button onClick={()=>setSh({k:tab})} className="absolute bottom-28 left-5 z-20 hidden h-14 animate-bob items-center rounded-2xl bg-[var(--pc)] px-5 font-bold text-pri shadow-xl transition duration-300 hover:scale-105 active:scale-90 group-data-[s=android]:flex">+ {ad}</button>}
{sh&&<div onClick={e=>e.target===e.currentTarget&&setSh(null)} className="absolute inset-0 z-50 flex animate-fade items-end bg-slate-900/25 backdrop-blur-sm group-data-[s=desktop]:items-center group-data-[s=desktop]:justify-center"><div className="glass max-h-[90%] w-full animate-sheet overflow-auto rounded-t-[34px] p-4 pb-8 [background:var(--gl2)] group-data-[s=desktop]:w-[440px] group-data-[s=desktop]:animate-dlg group-data-[s=desktop]:rounded-[30px]">
{sh.k==='det'?<Detail id={sh.id} db={db} G={G} tot={tot} upd={upd} addT={addT} rmT={rmT} rm={rm}/>:<Form key={sh.k+(sh.id||'')} k={sh.k} id={sh.id} db={db} put={put} rm={rm}/>}</div></div>}
{sp>0&&<Splash st={sp} onSkip={skip}/>}</div>}
