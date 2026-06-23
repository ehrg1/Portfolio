/* ============================================================
   main.js — rendering, language, theme, loader & animations
   Depends on data.js (loaded first).
   ============================================================ */
let LANG = "en";
const t = (o) => o[LANG];

/* ---- RENDER ---- */
const chipsHTML=(p)=>p.chips.map(c=>`<span class="chip${/in progress|قيد/i.test(c)?' live':''}">${c}</span>`).join('');
/* shared action button — same look on the card and inside the popup */
function linkBtn(href,label,arrow,primary){return href?`<a class="pm-btn${primary?' primary':''}" href="${href}" target="_blank" rel="noopener"><span class="g"></span><span class="inner">${label} <span aria-hidden="true">${arrow}</span></span></a>`:'';}
function projLinkBtns(p,primary){const L=p.links||{};return [
  linkBtn(L.website,LANG==='en'?'Visit site':'زيارة الموقع','↗',primary),
  linkBtn(L.download,LANG==='en'?'Download app':'تحميل التطبيق','↓',primary),
  linkBtn(L.github,LANG==='en'?'View on GitHub':'افتح على GitHub','↗',false),
].join('');}
function cardActions(p){
  const details=`<button type="button" class="pm-btn primary proj-details"><span class="g"></span><span class="inner">${LANG==='en'?'View details':'عرض التفاصيل'} <span aria-hidden="true">↗</span></span></button>`;
  return `<div class="proj-actions">${details}${projLinkBtns(p,false)}</div>`;
}
/* card image: show the real file; if it's missing/fails, fall back to the generated SVG art */
function projArt(p,i){
  const safe=String(p.img||'').replace(/'/g,"&#39;");
  return `<div class="proj-art"><div class="art-inner">`+
    (p.img?`<img class="proj-img" src="${safe}" alt="${p.title}" loading="lazy" data-i="${i}">`:p.art())+
    `</div><div class="halftone"></div><div class="proj-num">${p.n}</div></div>`;
}
function renderProjects(){
  const g=document.getElementById('projGrid'); g.innerHTML="";
  projects.forEach((p,i)=>{
    const a=document.createElement('article');
    a.className="proj-card"; a.tabIndex=0; a.setAttribute('role','button');
    a.setAttribute('aria-label',(LANG==='en'?'View details: ':'عرض التفاصيل: ')+p.title);
    a.innerHTML=`${projArt(p,i)}
      <div class="proj-info"><h3>${p.title}</h3><p class="pdesc">${t(p.desc)}</p>
      <div class="chips">${chipsHTML(p)}</div>
      ${cardActions(p)}</div>`;
    a.addEventListener('click',()=>openProjectModal(p,a));
    a.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();openProjectModal(p,a);}});
    /* the external-link buttons navigate; don't let them also open the popup */
    a.querySelectorAll('.proj-actions a').forEach(lk=>lk.addEventListener('click',e=>e.stopPropagation()));
    g.appendChild(a);
  });
  /* swap a broken/missing image for the SVG art fallback */
  g.querySelectorAll('.proj-img').forEach(img=>img.addEventListener('error',()=>{
    const p=projects[+img.dataset.i]; if(p)img.outerHTML=p.art();
  }));
}

/* ---- PROJECT / BUILD MODAL ---- */
let modalEl=null, modalItem=null, lastFocus=null;
function ensureModal(){
  if(modalEl)return modalEl;
  modalEl=document.createElement('div');
  modalEl.className="pm-overlay"; modalEl.id="projModal";
  modalEl.setAttribute('role','dialog'); modalEl.setAttribute('aria-modal','true'); modalEl.hidden=true;
  modalEl.innerHTML=`<div class="pm-dialog" role="document"><button class="pm-close" aria-label="Close">&times;</button><div class="pm-content"></div></div>`;
  modalEl.addEventListener('click',e=>{if(e.target===modalEl)closeProjectModal();});
  modalEl.querySelector('.pm-close').addEventListener('click',closeProjectModal);
  document.body.appendChild(modalEl);
  return modalEl;
}
/* popup media slides, in order: video → cover image → extra gallery images (or one art fallback) */
function mediaSlides(p){
  const out=[];
  if(p.video)out.push({type:'video',src:p.video,poster:p.img});
  if(p.img)out.push({type:'img',src:p.img});
  (p.gallery||[]).forEach(src=>{if(src)out.push({type:'img',src});});
  if(!out.length)out.push({type:'art'});
  return out;
}
function slideHTML(s,p){
  if(s.type==='video')return `<video class="pm-media" autoplay muted loop playsinline ${s.poster?`poster="${s.poster}"`:''}><source src="${s.src}" type="video/mp4"></video>`;
  if(s.type==='img')return `<img class="pm-media" src="${s.src}" alt="${p.title}" data-fallback="1">`;
  return `<div class="pm-media pm-art">${p.art()}</div>`;
}
function carouselHTML(p){
  const slides=mediaSlides(p);
  const track=slides.map(s=>`<div class="pm-slide">${slideHTML(s,p)}</div>`).join('');
  const multi=slides.length>1;
  const arrows=multi?`<button type="button" class="pm-nav prev" aria-label="Previous image">‹</button><button type="button" class="pm-nav next" aria-label="Next image">›</button>`:'';
  const dots=multi?`<div class="pm-dots">${slides.map((_,i)=>`<button type="button" class="pm-dot${i===0?' active':''}" data-idx="${i}" aria-label="Image ${i+1}"></button>`).join('')}</div>`:'';
  return `<div class="pm-media-wrap pm-carousel"><div class="pm-track">${track}</div>${arrows}${dots}</div>`;
}
function modalContentHTML(p){
  const media=carouselHTML(p);
  const paras=t(p.long||p.desc).split('\n\n').map(s=>`<p>${s}</p>`).join('');
  const feats=(p.features&&p.features.length)
    ? `<ul class="pm-features">${p.features.map(f=>`<li>${t(f)}</li>`).join('')}</ul>` : '';
  const actions=projLinkBtns(p,true);
  const k=p.kind&&(typeof KINDS!=='undefined')&&KINDS[p.kind];
  const header=`<div class="pm-header">${k?`<span class="pm-kind" style="color:${k.color}">${t(k)}</span>`:''}<h3 class="pm-title">${p.title}</h3></div>`;
  return `<div class="pm-main">
    <div class="pm-left">${header}${media}</div>
    <div class="pm-body">
      <div class="chips">${chipsHTML(p)}</div>
      <div class="pm-desc">${paras}</div>
      ${feats}
      ${actions?`<div class="pm-actions">${actions}</div>`:''}
    </div></div>`;
}
function openProjectModal(item,trigger){
  if(!item)return;
  ensureModal();
  modalItem=item; lastFocus=trigger||document.activeElement;
  fillModalContent(item);
  modalEl.hidden=false;
  requestAnimationFrame(()=>modalEl.classList.add('open'));
  document.body.classList.add('modal-lock');
  modalEl.querySelector('.pm-close').focus();
}
/* fill the popup body, wire slide fallbacks, and set up the carousel (shared by open + language switch) */
function fillModalContent(item){
  const content=modalEl.querySelector('.pm-content');
  content.innerHTML=modalContentHTML(item);
  content.querySelectorAll('.pm-media[data-fallback]').forEach(mImg=>
    mImg.addEventListener('error',()=>{mImg.outerHTML=`<div class="pm-media pm-art">${item.art()}</div>`;}));
  setupCarousel(content);
}
/* carousel: ‹ › arrows, dots, and Left/Right keys move between slides */
let pmNav=null;
function setupCarousel(root){
  pmNav=null;
  const track=root.querySelector('.pm-track'); if(!track)return;
  const slides=[...track.children]; if(slides.length<2)return;
  const dots=[...root.querySelectorAll('.pm-dot')];
  let idx=0;
  const go=i=>{idx=(i+slides.length)%slides.length;track.style.transform=`translateX(${-idx*100}%)`;dots.forEach((d,j)=>d.classList.toggle('active',j===idx));};
  root.querySelector('.pm-nav.prev').addEventListener('click',e=>{e.stopPropagation();go(idx-1);});
  root.querySelector('.pm-nav.next').addEventListener('click',e=>{e.stopPropagation();go(idx+1);});
  dots.forEach((d,j)=>d.addEventListener('click',e=>{e.stopPropagation();go(j);}));
  pmNav=dir=>go(idx+dir);
}
function closeProjectModal(){
  if(!modalEl||!modalItem)return;
  modalEl.classList.remove('open'); modalItem=null; pmNav=null;
  document.body.classList.remove('modal-lock');
  const done=()=>{modalEl.hidden=true;modalEl.removeEventListener('transitionend',done);};
  modalEl.addEventListener('transitionend',done);
  setTimeout(()=>{if(modalEl&&!modalEl.classList.contains('open'))modalEl.hidden=true;},400);
  if(lastFocus&&lastFocus.focus)lastFocus.focus();
}
document.addEventListener('keydown',e=>{
  if(!modalItem)return;
  if(e.key==='Escape')closeProjectModal();
  else if(e.key==='ArrowLeft'&&pmNav)pmNav(-1);
  else if(e.key==='ArrowRight'&&pmNav)pmNav(1);
});

/* ---- CV POPUP (preview the PDF in-page, with open-in-new-window + download) ---- */
const CV_URL="assets/assets/Rayan_Altawijari_CV.pdf";
let cvEl=null, cvOpen=false, cvLastFocus=null;
function cvActionsHTML(){
  const open=linkBtn(CV_URL,LANG==='en'?'Open in new window':'فتح في نافذة جديدة','↗',true);
  const dl=`<a class="pm-btn" href="${CV_URL}" download><span class="g"></span><span class="inner">${LANG==='en'?'Download':'تحميل'} <span aria-hidden="true">↓</span></span></a>`;
  return open+dl;
}
function ensureCvModal(){
  if(cvEl)return cvEl;
  cvEl=document.createElement('div');
  cvEl.className="pm-overlay cv-overlay"; cvEl.id="cvModal";
  cvEl.setAttribute('role','dialog'); cvEl.setAttribute('aria-modal','true'); cvEl.setAttribute('aria-label','CV'); cvEl.hidden=true;
  cvEl.innerHTML=`<div class="pm-dialog cv-dialog" role="document"><button class="pm-close" aria-label="Close">&times;</button><div class="cv-frame-wrap"><iframe class="cv-frame" title="CV" src="${CV_URL}"></iframe></div><div class="cv-actions"></div></div>`;
  cvEl.addEventListener('click',e=>{if(e.target===cvEl)closeCvModal();});
  cvEl.querySelector('.pm-close').addEventListener('click',closeCvModal);
  document.body.appendChild(cvEl);
  return cvEl;
}
function openCvModal(trigger){
  ensureCvModal();
  cvOpen=true; cvLastFocus=trigger||document.activeElement;
  cvEl.querySelector('.cv-actions').innerHTML=cvActionsHTML();
  cvEl.hidden=false;
  requestAnimationFrame(()=>cvEl.classList.add('open'));
  document.body.classList.add('modal-lock');
  cvEl.querySelector('.pm-close').focus();
}
function closeCvModal(){
  if(!cvEl||!cvOpen)return;
  cvEl.classList.remove('open'); cvOpen=false;
  document.body.classList.remove('modal-lock');
  const done=()=>{cvEl.hidden=true;cvEl.removeEventListener('transitionend',done);};
  cvEl.addEventListener('transitionend',done);
  setTimeout(()=>{if(cvEl&&!cvEl.classList.contains('open'))cvEl.hidden=true;},400);
  if(cvLastFocus&&cvLastFocus.focus)cvLastFocus.focus();
}
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&cvOpen)closeCvModal();});
document.querySelectorAll('[data-cv]').forEach(el=>el.addEventListener('click',e=>{e.preventDefault();e.stopPropagation();openCvModal(el);}));

/* ---- SUGGEST AN IDEA POPUP (form → emailed via Web3Forms) ----
   Get a FREE access key: go to https://web3forms.com, enter riansaad23@gmail.com,
   check that inbox for the key, and paste it below. Submissions are emailed to that address. */
const SUGGEST_ACCESS_KEY="7f7957cc-52fa-458b-afb9-61eabae50fa6";
const SG={
 en:{title:"Suggest an idea",intro:"Got something in mind? Send it over — it's the quickest way to reach me.",
     message:"Your idea",name:"Your name",email:"Email (optional)",phone:"Phone (optional)",
     hint:"Add an email or phone so I can reply (at least one).",send:"Send",sending:"Sending…",
     ok:"Thanks! Your idea is on its way — I'll get back to you soon.",
     need:"Please add an email or a phone number so I can reach you.",
     fail:"Something went wrong. Please try again, or email me directly.",
     nokey:"The form isn't set up yet — please email me directly for now."},
 ar:{title:"اقترح فكرة",intro:"لديك فكرة في بالك؟ أرسلها — إنها أسرع طريقة للوصول إليّ.",
     message:"فكرتك",name:"اسمك",email:"البريد الإلكتروني (اختياري)",phone:"رقم الجوال (اختياري)",
     hint:"أضِف بريداً إلكترونياً أو رقم جوال حتى أتمكّن من الرد (واحد على الأقل).",send:"إرسال",sending:"جارٍ الإرسال…",
     ok:"شكراً! وصلتني فكرتك وسأعود إليك قريباً.",
     need:"الرجاء إضافة بريد إلكتروني أو رقم جوال للتواصل معك.",
     fail:"حدث خطأ ما. حاول مرة أخرى أو راسلني مباشرة.",
     nokey:"النموذج غير مُفعّل بعد — الرجاء مراسلتي مباشرة حالياً."}
};
let sgEl=null, sgOpen=false, sgLastFocus=null;
function ensureSuggestModal(){
  if(sgEl)return sgEl;
  sgEl=document.createElement('div');
  sgEl.className="pm-overlay sg-overlay"; sgEl.id="suggestModal";
  sgEl.setAttribute('role','dialog'); sgEl.setAttribute('aria-modal','true'); sgEl.setAttribute('aria-label','Suggest an idea'); sgEl.hidden=true;
  sgEl.innerHTML=`<div class="pm-dialog sg-dialog" role="document">
    <button class="pm-close" aria-label="Close">&times;</button>
    <form class="sg-form" novalidate>
      <h3 class="sg-title"></h3>
      <p class="sg-intro"></p>
      <div class="sg-field"><label for="sg-message"></label><textarea id="sg-message" name="message" class="sg-textarea" required></textarea></div>
      <div class="sg-field"><label for="sg-name"></label><input id="sg-name" name="name" class="sg-input" required></div>
      <div class="sg-row">
        <div class="sg-field"><label for="sg-email"></label><input id="sg-email" type="email" name="email" class="sg-input"></div>
        <div class="sg-field"><label for="sg-phone"></label><input id="sg-phone" type="tel" name="phone" class="sg-input"></div>
      </div>
      <p class="sg-hint"></p>
      <p class="sg-status" role="status" aria-live="polite"></p>
      <input type="hidden" name="access_key" value="${SUGGEST_ACCESS_KEY}">
      <input type="hidden" name="subject" value="New idea from your portfolio">
      <input type="hidden" name="from_name" value="Portfolio — Idea Suggestion">
      <input type="checkbox" name="botcheck" class="sg-hp" tabindex="-1" autocomplete="off" aria-hidden="true">
      <button type="submit" class="pm-btn primary sg-submit"><span class="g"></span><span class="inner"></span></button>
    </form></div>`;
  sgEl.addEventListener('click',e=>{if(e.target===sgEl)closeSuggestModal();});
  sgEl.querySelector('.pm-close').addEventListener('click',closeSuggestModal);
  sgEl.querySelector('.sg-form').addEventListener('submit',submitSuggest);
  document.body.appendChild(sgEl);
  applySuggestLang();
  return sgEl;
}
function applySuggestLang(){
  if(!sgEl)return;
  const s=SG[LANG]||SG.en;
  sgEl.querySelector('.sg-title').textContent=s.title;
  sgEl.querySelector('.sg-intro').textContent=s.intro;
  sgEl.querySelector('label[for="sg-message"]').textContent=s.message;
  sgEl.querySelector('label[for="sg-name"]').textContent=s.name;
  sgEl.querySelector('label[for="sg-email"]').textContent=s.email;
  sgEl.querySelector('label[for="sg-phone"]').textContent=s.phone;
  sgEl.querySelector('.sg-hint').textContent=s.hint;
  sgEl.querySelector('.sg-submit .inner').textContent=s.send;
}
function openSuggestModal(trigger){
  ensureSuggestModal();
  sgOpen=true; sgLastFocus=trigger||document.activeElement;
  applySuggestLang();
  sgEl.querySelector('.sg-status').textContent="";
  sgEl.hidden=false;
  requestAnimationFrame(()=>sgEl.classList.add('open'));
  document.body.classList.add('modal-lock');
  sgEl.querySelector('.pm-close').focus();
}
function closeSuggestModal(){
  if(!sgEl||!sgOpen)return;
  sgEl.classList.remove('open'); sgOpen=false;
  document.body.classList.remove('modal-lock');
  const done=()=>{sgEl.hidden=true;sgEl.removeEventListener('transitionend',done);};
  sgEl.addEventListener('transitionend',done);
  setTimeout(()=>{if(sgEl&&!sgEl.classList.contains('open'))sgEl.hidden=true;},400);
  if(sgLastFocus&&sgLastFocus.focus)sgLastFocus.focus();
}
async function submitSuggest(e){
  e.preventDefault();
  const form=e.target, s=SG[LANG]||SG.en, status=form.querySelector('.sg-status');
  const setStatus=(msg,cls)=>{status.textContent=msg;status.className='sg-status'+(cls?' '+cls:'');};
  if(!form.reportValidity())return;                         /* name + idea required (+ email format) */
  const email=form.email.value.trim(), phone=form.phone.value.trim();
  if(!email&&!phone){setStatus(s.need,'err');form.email.focus();return;}
  if(SUGGEST_ACCESS_KEY.indexOf('REPLACE')===0){setStatus(s.nokey,'err');return;}
  const btn=form.querySelector('.sg-submit'); btn.disabled=true; setStatus(s.sending);
  try{
    const res=await fetch('https://api.web3forms.com/submit',{method:'POST',body:new FormData(form)});
    const data=await res.json();
    if(data.success){setStatus(s.ok,'ok');form.reset();}else setStatus(s.fail,'err');
  }catch(err){setStatus(s.fail,'err');}
  btn.disabled=false;
}
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&sgOpen)closeSuggestModal();});
document.querySelectorAll('[data-suggest]').forEach(el=>el.addEventListener('click',()=>openSuggestModal(el)));

/* normalize a build into the shape the popup expects (links live ONLY in the popup) */
function buildItem(b){return {
  title:b.title, kind:b.kind, art:b.art, img:b.img, gallery:b.gallery, video:b.video,
  chips:b.chips||[b.lang,b.date].filter(Boolean),
  desc:b.note, long:b.long, features:b.features,
  links:b.links||(b.url?{github:b.url}:{})
};}
function renderBuilds(){
  const l=document.getElementById('buildsList'); l.innerHTML="";
  builds.forEach((b,i)=>{
    const item=buildItem(b);
    const a=document.createElement('article');
    a.className="build"; a.tabIndex=0; a.setAttribute('role','button');
    a.setAttribute('aria-label',(LANG==='en'?'View details: ':'عرض التفاصيل: ')+b.title);
    a.innerHTML=`<div class="build-thumb">`+
      (b.img?`<img class="build-img" src="${b.img}" alt="${b.title}" loading="lazy" data-bi="${i}">`:b.art())+
      `</div><div class="build-body"><h4>${b.title}</h4><p>${t(b.note)}</p></div>
      <div class="build-side"><span class="lang">${b.lang}</span><br>${b.date}</div><span class="arrow" aria-hidden="true">↗</span>`;
    a.addEventListener('click',()=>openProjectModal(item,a));
    a.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();openProjectModal(item,a);}});
    l.appendChild(a);
  });
  /* swap a broken/missing thumbnail for the SVG art fallback */
  l.querySelectorAll('.build-img').forEach(img=>img.addEventListener('error',()=>{
    const b=builds[+img.dataset.bi]; if(b)img.outerHTML=b.art();
  }));
}
/* skill icon: inline SVG for ICON keys (asm/github), Devicon CDN image for everything else */
function iconHTML(spec){
  if(ICON[spec])return ICON[spec];
  const base=spec.split('-')[0];
  return `<img class="sk-ic" loading="lazy" alt="" aria-hidden="true" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${base}/${spec}.svg">`;
}
const MARQ_SPEED=35;        /* px per second — constant across all rows */
let skUnits=[];
function renderSkills(){
  const c=document.getElementById('skills'); c.innerHTML=""; skUnits=[];
  skillGroups.forEach((g,gi)=>{
    const unit=g.items.map(([name,ic])=>`<span class="sk-pill">${iconHTML(ic)}<span>${name}</span></span><span class="sk-sep" aria-hidden="true">◆</span>`).join('');
    skUnits[gi]=unit;
    const wrap=document.createElement('div'); wrap.className="sk-group";
    wrap.innerHTML=`<span class="sk-cat ${g.color}">${t(g.cat)}</span><div class="sk-row"><div class="sk-track ${g.dir==='r'?'rev':''}" data-i="${gi}">${unit}</div></div>`;
    c.appendChild(wrap);
  });
  requestAnimationFrame(fillMarquees);
}
/* repeat each row's content until it always exceeds the row width, so the -50% loop never shows a gap */
function fillMarquees(){
  document.querySelectorAll('.sk-track').forEach(track=>{
    const unit=skUnits[+track.dataset.i]; if(unit==null)return;
    track.innerHTML=unit;                                   /* one copy, to measure */
    const unitW=track.scrollWidth, rowW=track.parentElement.clientWidth||1;
    const reps=Math.max(1,Math.ceil(rowW/unitW));           /* copies needed to fill one row */
    track.innerHTML=unit.repeat(reps*2);                    /* two identical halves → seamless */
    track.style.animationDuration=((track.scrollWidth/2)/MARQ_SPEED)+'s';
  });
}
let marqResizeTimer;
window.addEventListener('resize',()=>{clearTimeout(marqResizeTimer);marqResizeTimer=setTimeout(fillMarquees,200);});
window.addEventListener('load',fillMarquees);
/* timeline date helpers: format the label and sort newest-first automatically */
const TL_MONTHS={en:["","Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
  ar:["","يناير","فبراير","مارس","أبريل","مايو","يونيو","يوليو","أغسطس","سبتمبر","أكتوبر","نوفمبر","ديسمبر"]};
function tlDigits(s){return LANG==='ar'?String(s).replace(/[0-9]/g,d=>"٠١٢٣٤٥٦٧٨٩"[d]):String(s);}
function tlParse(v){if(!v)return null;const [y,m]=String(v).split('-');return {y:+y,m:m?+m:0};}
function tlPart(p){const yr=tlDigits(p.y);return p.m?`${TL_MONTHS[LANG][p.m]} ${yr}`:yr;}
function tlLabel(it){
  if(it.time)return t(it.time);                       /* explicit label wins (e.g. placeholder) */
  const s=tlParse(it.start),e=tlParse(it.end),present=LANG==='en'?'Present':'حالياً',dash=' – ';
  if(it.current||!e)return s?tlPart(s)+dash+present:present;   /* ongoing */
  if(s){if(s.y===e.y&&!s.m&&!e.m)return tlPart(e);return tlPart(s)+dash+tlPart(e);}
  return tlPart(e);
}
function tlKey(it){if(it.ph)return -Infinity;if(it.current||!it.end)return Infinity;const e=tlParse(it.end);return e.y*100+e.m;}
function tlStartVal(it){const s=tlParse(it.start);return s?s.y*100+s.m:0;}
function renderTimeline(){
  const tl=document.getElementById('timeline'); tl.innerHTML="";
  const sorted=[...timeline].sort((a,b)=>{const ka=tlKey(a),kb=tlKey(b);return ka!==kb?kb-ka:tlStartVal(b)-tlStartVal(a);});
  sorted.forEach(it=>{const d=document.createElement('div');d.className="tl-item"+(it.ph?" ph":"");
    d.innerHTML=`<span class="tl-dot"></span><div class="tl-time">${tlLabel(it)}</div><div class="tl-body"><h4>${t(it.title)}</h4><div class="tl-org">${t(it.org)}</div><p>${t(it.desc)}</p></div>`;tl.appendChild(d);});
}
function renderMarquee(){
  const mq=document.getElementById('marquee'); mq.innerHTML="";
  const txt=LANG==='en'?"LET'S BUILD SOMETHING TOGETHER • ":"لنبنِ شيئًا معاً • ";
  for(let i=0;i<10;i++){const s=document.createElement('span');s.textContent=txt;mq.appendChild(s);}
  if(window.gsap){gsap.killTweensOf(".marquee-track");gsap.set(".marquee-track",{xPercent:0});gsap.to(".marquee-track",{xPercent:-50,duration:40,ease:"none",repeat:-1});}
}
document.getElementById('year').textContent=new Date().getFullYear();

/* ---- THEME (dark / light) ---- */
function applyTheme(theme){
  document.documentElement.setAttribute('data-theme',theme);
  try{localStorage.setItem('theme',theme);}catch(e){}
  const btn=document.getElementById('themeBtn');
  if(btn)btn.setAttribute('aria-label',theme==='light'?'Switch to dark mode':'Switch to light mode');
}
(function initTheme(){
  let saved=null;try{saved=localStorage.getItem('theme');}catch(e){}
  applyTheme(saved||'dark');   /* default is always the night (dark) theme */
})();
document.getElementById('themeBtn').addEventListener('click',()=>{
  const cur=document.documentElement.getAttribute('data-theme');
  applyTheme(cur==='light'?'dark':'light');
});

/* ---- LANGUAGE ---- */
function setLang(l){
  LANG=l;
  document.documentElement.lang=l;
  document.documentElement.dir=(l==='ar')?'rtl':'ltr';
  document.querySelectorAll('[data-en]').forEach(el=>{const v=el.getAttribute('data-'+l);if(v!==null)el.textContent=v;});
  document.getElementById('langBtn').textContent=(l==='en')?'ع':'EN';
  renderProjects();renderBuilds();renderSkills();renderTimeline();renderMarquee();
  /* keep an open popup in sync with the new language */
  if(modalEl&&modalItem){fillModalContent(modalItem);modalEl.querySelector('.pm-close').focus();}
  if(cvEl&&cvOpen)cvEl.querySelector('.cv-actions').innerHTML=cvActionsHTML();
  if(sgEl)applySuggestLang();
}
document.getElementById('langBtn').addEventListener('click',()=>setLang(LANG==='en'?'ar':'en'));

/* initial render */
renderProjects();renderBuilds();renderSkills();renderTimeline();

/* ---- LOADER ---- */
(function(){
  const loader=document.getElementById('loader'),countEl=document.getElementById('loader-count'),
        fill=document.getElementById('loader-bar-fill'),wordEl=document.getElementById('loader-word');
  const words={en:["Design","Create","Build"],ar:["تصميم","إبداع","بناء"]};let wi=0;
  const wordTimer=setInterval(()=>{wordEl.style.opacity=0;wordEl.style.transform="translateY(-20px)";
    setTimeout(()=>{wi=(wi+1)%3;wordEl.textContent=words[LANG][wi];wordEl.style.transform="translateY(20px)";
      requestAnimationFrame(()=>{wordEl.style.opacity=1;wordEl.style.transform="translateY(0)";});},300);},900);
  const dur=2700,start=performance.now();
  function tick(now){const p=Math.min((now-start)/dur,1);countEl.textContent=String(Math.floor(p*100)).padStart(3,"0");
    fill.style.transform=`scaleX(${p})`;
    if(p<1)requestAnimationFrame(tick);
    else{clearInterval(wordTimer);setTimeout(()=>{loader.classList.add('done');initHero();},400);}}
  requestAnimationFrame(tick);
})();

/* ---- ROLE CYCLE ---- */
(function(){const roles={en:["Developer","CS Student","App Builder","Problem Solver"],ar:["مطوّر","طالب علوم حاسب","مطوّر تطبيقات","حلّال مشكلات"]};
  let ri=0;const el=document.getElementById('roleWord');
  setInterval(()=>{ri=(ri+1)%4;el.textContent=roles[LANG][ri];el.style.animation='none';void el.offsetWidth;el.style.animation='role-fade-in .4s ease-out';},2000);})();

/* ---- GSAP ENTRANCE ---- */
function initHero(){if(!window.gsap)return;
  const tl=gsap.timeline({defaults:{ease:"power3.out"}});
  tl.from(".name-reveal",{opacity:0,y:54,duration:1.3,delay:.1})
    .from(".blur-in",{opacity:0,y:22,filter:"blur(10px)",duration:1,stagger:.12},"-=0.8");}

/* ---- NAV ---- */
const navPill=document.getElementById('navPill');
const navLinks=[...document.querySelectorAll('[data-nav]')];
const secMap={home:'#home',about:'#about',experience:'#experience',work:'#work',contact:'#contact'};
window.addEventListener('scroll',()=>{
  navPill.classList.toggle('scrolled',window.scrollY>100);
  let cur='home';for(const k in secMap){const s=document.querySelector(secMap[k]);if(s&&s.getBoundingClientRect().top<=120)cur=k;}
  navLinks.forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+cur));
},{passive:true});

/* ---- REVEAL ---- */
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}}),{threshold:.12,rootMargin:"-50px"});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

/* ---- GSAP SCROLL ---- */
window.addEventListener('load',()=>{
  if(!window.gsap||!window.ScrollTrigger)return;
  gsap.registerPlugin(ScrollTrigger);
  renderMarquee();
  gsap.utils.toArray(".proj-card").forEach(c=>gsap.from(c,{y:50,opacity:0,duration:1,ease:"power3.out",scrollTrigger:{trigger:c,start:"top 88%"}}));
  gsap.utils.toArray(".sk-group").forEach((t,i)=>gsap.from(t,{opacity:0,duration:.8,ease:"power2.out",delay:i*.1,scrollTrigger:{trigger:t,start:"top 92%"}}));
  gsap.utils.toArray(".tl-item").forEach(it=>gsap.from(it,{x:20,opacity:0,duration:.8,ease:"power3.out",scrollTrigger:{trigger:it,start:"top 90%"}}));
});

/* ---- HLS VIDEO ---- */
function loadHls(video){const src="https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8";
  const reveal=()=>video.classList.add('ready');
  if(window.Hls&&Hls.isSupported()){const h=new Hls();h.loadSource(src);h.attachMedia(video);
    h.on(Hls.Events.MANIFEST_PARSED,()=>{video.play().catch(()=>{});reveal();});
    h.on(Hls.Events.ERROR,(e,d)=>{if(d.fatal)video.classList.remove('ready');});}
  else if(video.canPlayType('application/vnd.apple.mpegurl')){video.src=src;video.addEventListener('loadeddata',()=>{video.play().catch(()=>{});reveal();});}}
loadHls(document.getElementById('heroVideo'));
loadHls(document.getElementById('footVideo'));
