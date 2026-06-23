/* ============================================================
   data.js — content + generated SVG artwork
   Edit this file to update projects, builds, skills & timeline.
   ============================================================ */
const accentA = "#89AACC", accentB = "#4E85BF";
const ART_BG = "#0c1117"; /* shared background tone so all project art reads as one set */

/* ---- SVG art (unified padding / stroke weights / background) ---- */
function artVIAD(){return `<svg viewBox='0 0 400 250' preserveAspectRatio='xMidYMid slice' xmlns='http://www.w3.org/2000/svg'><defs><linearGradient id='ga' x1='0' y1='0' x2='1' y2='0'><stop offset='0' stop-color='${accentA}'/><stop offset='1' stop-color='${accentB}'/></linearGradient></defs><rect width='400' height='250' fill='${ART_BG}'/>${Array.from({length:7}).map((_,i)=>`<line x1='0' y1='${i*36+12}' x2='400' y2='${i*36+12}' stroke='${accentA}' stroke-opacity='.06'/>`).join('')}<g transform='translate(200,128)'><circle cx='-55' cy='0' r='40' fill='none' stroke='url(#ga)' stroke-width='3'/><circle cx='55' cy='0' r='40' fill='none' stroke='url(#ga)' stroke-width='3'/><path d='M-15 0 h30' stroke='url(#ga)' stroke-width='3'/><path d='M-95 -6 l-22 -10 M95 -6 l22 -10' stroke='url(#ga)' stroke-width='3' stroke-linecap='round'/><circle cx='-55' cy='0' r='6' fill='${accentA}'/><circle cx='55' cy='0' r='6' fill='${accentB}'/></g></svg>`}
function artBudget(){return `<svg viewBox='0 0 400 250' preserveAspectRatio='xMidYMid slice' xmlns='http://www.w3.org/2000/svg'><defs><linearGradient id='gb' x1='0' y1='1' x2='0' y2='0'><stop offset='0' stop-color='${accentB}'/><stop offset='1' stop-color='${accentA}'/></linearGradient></defs><rect width='400' height='250' fill='${ART_BG}'/><g transform='translate(64,210)'>${[50,95,70,130,105,165].map((h,i)=>`<rect x='${i*50}' y='${-h}' width='28' height='${h}' rx='6' fill='url(#gb)' opacity='${.45+i*.09}'/>`).join('')}</g><g stroke='${accentA}' stroke-opacity='.5' fill='none'><circle cx='72' cy='48' r='7'/><circle cx='172' cy='48' r='7'/><circle cx='272' cy='48' r='7'/><path d='M79 48 h86 M179 48 h86' stroke-dasharray='4 4'/></g></svg>`}
function artCleaner(){return `<svg viewBox='0 0 400 250' preserveAspectRatio='xMidYMid slice' xmlns='http://www.w3.org/2000/svg'><defs><linearGradient id='gc' x1='0' y1='0' x2='1' y2='1'><stop offset='0' stop-color='${accentA}'/><stop offset='1' stop-color='${accentB}'/></linearGradient></defs><rect width='400' height='250' fill='${ART_BG}'/><g transform='translate(150,55)'><rect x='28' y='28' width='110' height='140' rx='12' fill='#11181f' stroke='${accentA}' stroke-opacity='.4'/><rect x='14' y='14' width='110' height='140' rx='12' fill='#0e151b' stroke='${accentA}' stroke-opacity='.6'/><rect x='0' y='0' width='110' height='140' rx='12' fill='#121a22' stroke='url(#gc)' stroke-width='2'/><path d='M20 38 h70 M20 62 h70 M20 86 h48' stroke='${accentB}' stroke-opacity='.7' stroke-width='3' stroke-linecap='round'/><circle cx='88' cy='112' r='24' fill='none' stroke='url(#gc)' stroke-width='3'/><path d='M79 112 l7 7 l15 -17' fill='none' stroke='#fff' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'/></g></svg>`}
function artPharmacy(){return `<svg viewBox='0 0 400 250' preserveAspectRatio='xMidYMid slice' xmlns='http://www.w3.org/2000/svg'><defs><linearGradient id='gp' x1='0' y1='0' x2='1' y2='1'><stop offset='0' stop-color='${accentA}'/><stop offset='1' stop-color='${accentB}'/></linearGradient></defs><rect width='400' height='250' fill='${ART_BG}'/><g transform='translate(200,125)'><path d='M0 -68 C36 -68 62 -34 62 6 C62 52 0 78 0 78 C0 78 -62 52 -62 6 C-62 -34 -36 -68 0 -68Z' fill='none' stroke='url(#gp)' stroke-width='3' opacity='.55'/><rect x='-28' y='-26' width='56' height='16' rx='8' fill='url(#gp)'/><rect x='-8' y='-46' width='16' height='56' rx='8' fill='url(#gp)'/><circle cx='0' cy='6' r='5' fill='#fff' fill-opacity='.85'/></g></svg>`}
function artTic(){return `<svg viewBox='0 0 400 250' preserveAspectRatio='xMidYMid slice' xmlns='http://www.w3.org/2000/svg'><rect width='400' height='250' fill='${ART_BG}'/><g transform='translate(200,125)' stroke='${accentA}' stroke-opacity='.45' stroke-width='3'><path d='M-36 -80 v160 M36 -80 v160 M-108 -26 h216 M-108 26 h216'/></g><g transform='translate(200,125)' stroke-width='5' stroke-linecap='round'><path d='M-86 -66 l26 26 M-60 -66 l-26 26' stroke='${accentB}'/><circle cx='0' cy='0' r='16' fill='none' stroke='${accentA}'/><path d='M60 40 l26 26 M86 40 l-26 26' stroke='${accentA}'/></g></svg>`}
function artMosque(){return `<svg viewBox='0 0 400 250' preserveAspectRatio='xMidYMid slice' xmlns='http://www.w3.org/2000/svg'><defs><linearGradient id='gm' x1='0' y1='0' x2='0' y2='1'><stop offset='0' stop-color='${accentA}'/><stop offset='1' stop-color='${accentB}'/></linearGradient></defs><rect width='400' height='250' fill='${ART_BG}'/><g transform='translate(200,185)' fill='none' stroke='url(#gm)' stroke-width='3'><path d='M-86 0 v-62 a86 46 0 0 1 172 0 v62'/><path d='M0 -120 C24 -120 28 -88 0 -78 C-28 -88 -24 -120 0 -120Z'/><line x1='0' y1='-78' x2='0' y2='-106'/><path d='M-112 0 v-132 M112 0 v-132' stroke-opacity='.7'/><path d='M-40 0 v-40 a40 28 0 0 1 80 0 v40' stroke-opacity='.55'/></g></svg>`}

/* ---- DATA ----
   Each project supports these fields:
     n        : the "01"–"99" badge shown on the card
     title    : project name
     img      : card + popup image  → drop a file in assets/projects/ and put its path here.
                If the file is missing/fails to load, it falls back to the generated SVG `art`.
     gallery  : OPTIONAL extra images shown ONLY in the popup carousel (the card always uses `img`).
                → ["assets/projects/viad-2.png","assets/projects/viad-3.png", …]
     art      : generated SVG used as the automatic image fallback (keep it)
     chips    : tech tags. Include "In progress" / "قيد التنفيذ" to show a live green dot.
     kind     : OPTIONAL category key (see KINDS below) → shows a colored label above the title in the popup.
     desc     : SHORT text shown on the card (bilingual)
     long     : LONGER text shown inside the popup (bilingual). Use \n\n to split paragraphs.
     features : OPTIONAL bullet highlights in the popup → [{en,ar}, …]
     video    : OPTIONAL demo clip path (assets/projects/xxx.mp4) → embedded & looping in the popup
     links    : { github, website, download } — a button appears only for the links you fill in.
                website = a deployed site, download = an app (APK file or store link).
   ============================================================ */
/* Project categories — the colored label shown above the title in the popup.
   Add a new one here, then set kind:"yourkey" on a project. */
const KINDS={
 ai:      {en:"AI & Machine Learning", ar:"ذكاء اصطناعي", color:"#B57BFF"},
 mobile:  {en:"Mobile App",            ar:"تطبيق جوال",   color:"#4ADE80"},
 web:     {en:"Web Platform",          ar:"منصّة ويب",    color:"#5BA8FF"},
 software:{en:"Software",              ar:"برمجيات",      color:"#E0A65A"},
};
const projects=[
 {n:"01",title:"VIAD Smart Glasses",art:artVIAD,kind:"ai",
  img:"assets/projects/viad.png",
  gallery:[],   /* extra popup images, e.g. ["assets/projects/viad-2.png","assets/projects/viad-3.png"] */
  video:"assets/projects/viad-demo.mp4",   /* short, muted, looping demo of it working */
  chips:["Python","Computer Vision"],
  desc:{en:"Wearable smart-glasses project exploring computer vision to help users perceive and navigate their surroundings.",ar:"مشروع نظارات ذكية يستكشف الرؤية الحاسوبية لمساعدة المستخدمين على إدراك محيطهم والتنقّل فيه."},
  long:{en:"VIAD is a wearable smart-glasses prototype that uses computer vision to help users understand and move through the world around them. Live camera input is processed to detect objects and obstacles, and the result is relayed back to the wearer in real time.\n\nThe project brought together hardware, a Python vision pipeline and on-device feedback into one assistive device.",
        ar:"VIAD هو نموذج نظارات ذكية قابلة للارتداء يستخدم الرؤية الحاسوبية لمساعدة المستخدمين على فهم محيطهم والتنقّل فيه. تتم معالجة بثّ الكاميرا المباشر للتعرّف على الأجسام والعوائق، ثم تُنقل النتيجة إلى المستخدم في الوقت الحقيقي.\n\nجمع المشروع بين العتاد، ومسار رؤية مبني بلغة Python، وتغذية راجعة على الجهاز ضمن أداة مساعِدة واحدة."},
  features:[{en:"Real-time object & obstacle detection",ar:"كشف الأجسام والعوائق في الوقت الحقيقي"},
            {en:"Computer-vision pipeline built in Python",ar:"مسار رؤية حاسوبية مبني بلغة Python"},
            {en:"Wearable, assistive-first design",ar:"تصميم قابل للارتداء يركّز على المساعدة"}],
  links:{github:"https://github.com/ehrg1/VIAD_smart_glasses",website:"",download:""}},

 {n:"02",title:"Pharmacy App",art:artPharmacy,kind:"mobile",
  img:"assets/projects/pharmacy.png",
  gallery:[],   /* extra popup images, e.g. ["assets/projects/pharmacy-2.png"] */
  chips:["Flutter","Dart","In progress"],
  desc:{en:"A mobile app to search for medicines and find the nearest pharmacy that has them in stock.",ar:"تطبيق جوال للبحث عن الأدوية وإيجاد أقرب صيدلية تتوفّر فيها."},
  long:{en:"A cross-platform mobile app, built with Flutter, that lets people search for a medicine and instantly see which nearby pharmacies have it in stock — saving the frustrating trip from one pharmacy to the next.\n\nIt's an active work in progress as I expand search, location and stock features.",
        ar:"تطبيق جوال متعدّد المنصّات مبني بـ Flutter يتيح للمستخدم البحث عن دواء ومعرفة الصيدليات القريبة التي يتوفّر فيها فوراً — مما يوفّر عناء التنقّل بين صيدلية وأخرى.\n\nالعمل عليه جارٍ حالياً مع توسيع ميزات البحث والموقع والمخزون."},
  features:[{en:"Search medicines by name",ar:"البحث عن الأدوية بالاسم"},
            {en:"Find the nearest pharmacy with it in stock",ar:"إيجاد أقرب صيدلية يتوفّر فيها الدواء"},
            {en:"Built cross-platform with Flutter & Dart",ar:"مبني بـ Flutter و Dart لمنصّات متعددة"}],
  /* download: put your APK link or store URL here when ready, then a Download button appears */
  links:{github:"https://github.com/ehrg1",website:"",download:""}},

 {n:"03",title:"Budget Tracker",art:artBudget,kind:"software",
  img:"assets/projects/budget.png",
  gallery:[],   /* extra popup images, e.g. ["assets/projects/budget-2.png"] */
  chips:["C++","Linked List"],
  desc:{en:"A linked-list based finance manager for students to track income, categorize expenses and stay on budget.",ar:"مدير مالي مبني على القوائم المترابطة يساعد الطلاب على تتبّع الدخل وتصنيف المصروفات وضبط الميزانية."},
  long:{en:"A console finance manager written in C++ for the CS214 course. It uses a custom linked-list data structure to let students record income, categorize their expenses and keep an eye on their remaining budget.\n\nThe focus was clean data-structure design and a simple, reliable workflow.",
        ar:"مدير مالي بواجهة طرفية مكتوب بلغة C++ لمقرر CS214. يستخدم بنية قوائم مترابطة مخصّصة تتيح للطلاب تسجيل الدخل وتصنيف المصروفات ومتابعة ما تبقّى من الميزانية.\n\nتركّز العمل على تصميم بنية بيانات نظيفة وسير عمل بسيط وموثوق."},
  features:[{en:"Custom linked-list data structure",ar:"بنية قوائم مترابطة مخصّصة"},
            {en:"Track income & categorize expenses",ar:"تتبّع الدخل وتصنيف المصروفات"},
            {en:"Built for the CS214 course",ar:"بُني لمقرر CS214"}],
  links:{github:"https://github.com/ehrg1/CS214-Budget-tracker",website:"",download:""}},

 {n:"04",title:"Folder Cleaner",art:artCleaner,kind:"software",
  img:"assets/projects/cleaner.png",
  gallery:[],   /* extra popup images, e.g. ["assets/projects/cleaner-2.png"] */
  chips:["Python","Algorithms"],
  desc:{en:"A tool that scans a folder and removes duplicate files — built for the CS315 Algorithm Design course.",ar:"أداة تفحص المجلد وتحذف الملفات المكرّرة — بُنيت لمقرر تصميم الخوارزميات CS315."},
  long:{en:"A Python utility that recursively scans a folder, detects duplicate files and safely removes them to reclaim space. Built for the CS315 Algorithm Design course, with a focus on efficient comparison logic.\n\nIt grew out of coursework into a small, genuinely useful tool.",
        ar:"أداة بلغة Python تفحص المجلد بشكل متكرّر، وتكتشف الملفات المكرّرة وتحذفها بأمان لاسترجاع المساحة. بُنيت لمقرر تصميم الخوارزميات CS315 مع التركيز على منطق مقارنة فعّال.\n\nتطوّرت من مشروع دراسي إلى أداة صغيرة مفيدة فعلاً."},
  features:[{en:"Recursively scans for duplicate files",ar:"يفحص الملفات المكرّرة بشكل متكرّر"},
            {en:"Efficient comparison algorithm",ar:"خوارزمية مقارنة فعّالة"},
            {en:"Built for the CS315 course",ar:"بُني لمقرر CS315"}],
  links:{github:"https://github.com/ehrg1/CS315-folder-cleaner",website:"",download:""}},
];
/* Builds use the same popup as projects. Fields:
     title, lang, date, art (SVG fallback), note (short, shown on the row)
     img    : OPTIONAL thumbnail/popup image (assets/projects/xxx.jpg) — art is the fallback
     long   : OPTIONAL longer popup text (bilingual). Use \n\n for paragraphs. Falls back to note.
     video  : OPTIONAL demo clip shown in the popup
     links  : { github, website, download } — buttons appear ONLY inside the popup, not on the row. */
const builds=[
 {title:"Mosques Management",lang:"Python",art:artMosque,date:"CS492",
  img:"assets/projects/mosques.png",
  note:{en:"App to manage and organize mosque operations.",ar:"تطبيق لإدارة وتنظيم شؤون المساجد."},
  long:{en:"A Python application built for the CS492 course to help manage and organize day-to-day mosque operations — keeping records and routine tasks in one simple place.",
        ar:"تطبيق بلغة Python بُني لمقرر CS492 للمساعدة في إدارة وتنظيم شؤون المساجد اليومية — بجمع السجلّات والمهام الاعتيادية في مكان واحد بسيط."},
  links:{github:"https://github.com/ehrg1/CS492-mosques-management",website:"",download:""}},
 {title:"Tic-Tac-Toe",lang:"Python",art:artTic,date:"CS492",
  img:"assets/projects/tictactoe.png",
  note:{en:"A clean implementation of the classic game.",ar:"تنفيذ نظيف للعبة الكلاسيكية."},
  long:{en:"A clean, readable implementation of the classic Tic-Tac-Toe game in Python, written for the CS492 course with a focus on simple, well-structured game logic.",
        ar:"تنفيذ نظيف وواضح للعبة إكس-أو الكلاسيكية بلغة Python، كُتب لمقرر CS492 مع التركيز على منطق لعبة بسيط ومنظّم."},
  links:{github:"https://github.com/ehrg1/CS492-Tic-Tac-Toe",website:"",download:""}},
 {title:"File Cleaner (CS315)",lang:"Python",art:artCleaner,date:"CS315",
  img:"assets/projects/filecleaner.png",
  note:{en:"Earlier duplicate-file remover from coursework.",ar:"نسخة سابقة لأداة حذف الملفات المكرّرة من الدراسة."},
  long:{en:"An earlier version of the duplicate-file remover, written for the CS315 course. It scans a directory and clears out duplicate files — the groundwork that later grew into the Folder Cleaner tool.",
        ar:"نسخة سابقة من أداة حذف الملفات المكرّرة، كُتبت لمقرر CS315. تفحص المجلد وتزيل الملفات المكرّرة — وهي الأساس الذي تطوّر لاحقاً إلى أداة Folder Cleaner."},
  links:{github:"https://github.com/ehrg1/461-CS315-project",website:"",download:""}},
];
function tile(bg,fg,label,fs){return `<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><rect width="24" height="24" rx="5" fill="${bg}"/><text x="12" y="16.6" font-family="Inter,Arial,sans-serif" font-size="${fs||9}" font-weight="700" text-anchor="middle" fill="${fg}">${label}</text></svg>`}
/* Inline icons for the few tools that aren't a good fit for Devicon:
   - asm    : Devicon has no Assembly icon
   - github : Devicon's mark is solid black → invisible on the dark theme; this one uses currentColor
   Every other skill icon comes from the Devicon CDN (see iconHTML() in main.js). */
const ICON={
 asm:tile('#5A5A5A','#fff','ASM',7),
 github:`<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path fill="currentColor" d="M12 2A10 10 0 0 0 8.8 21.5c.5.1.7-.2.7-.5v-1.7c-2.8.6-3.4-1.2-3.4-1.2-.4-1.1-1.1-1.4-1.1-1.4-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.4 1.1 2.9.8.1-.6.3-1.1.6-1.3-2.2-.2-4.5-1.1-4.5-4.9 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.7 0 0 .8-.3 2.7 1a9.3 9.3 0 0 1 5 0c1.9-1.3 2.7-1 2.7-1 .5 1.4.2 2.4.1 2.7.6.7 1 1.6 1 2.7 0 3.8-2.3 4.7-4.5 4.9.3.3.6.9.6 1.8v2.6c0 .3.2.6.7.5A10 10 0 0 0 12 2z"/></svg>`,
};
/* Skill items are [label, iconSpec]. iconSpec is a Devicon slug (name-variant, loaded from the CDN)
   OR an inline ICON key (asm / github). To add a tool, append a Devicon slug from devicon.dev. */
const skillGroups=[
 {cat:{en:"Languages",ar:"اللغات"},color:"amber",dir:"l",items:[["Python","python-original"],["Java","java-original"],["C","c-original"],["C++","cplusplus-original"],["Dart","dart-original"],["JavaScript","javascript-original"],["Assembly","asm"]]},
 {cat:{en:"AI & Machine Learning",ar:"الذكاء الاصطناعي وتعلّم الآلة"},color:"blue",dir:"r",items:[["TensorFlow","tensorflow-original"],["PyTorch","pytorch-original"],["OpenCV","opencv-original"],["NumPy","numpy-original"],["Pandas","pandas-original"],["Jupyter","jupyter-original"],["Anaconda","anaconda-original"]]},
 {cat:{en:"Web & Mobile",ar:"الويب والجوال"},color:"light",dir:"l",items:[["Flutter","flutter-original"],["React Native","react-original"],["Django","django-plain"],["HTML5","html5-original"],["CSS3","css3-original"],["SQLite","sqlite-original"],["Firebase","firebase-original"]]},
 {cat:{en:"Tools & Platforms",ar:"الأدوات والمنصّات"},color:"cyan",dir:"r",items:[["Git","git-original"],["GitHub","github"],["Docker","docker-original"],["Linux","linux-original"],["Raspberry Pi","raspberrypi-original"],["VS Code","vscode-original"]]},
];
/* Timeline entries — order does NOT matter, they auto-sort newest-first.
   Dates: use "YYYY" or "YYYY-MM" (month optional).
     start : when it began (optional)
     end   : when it ended. OMIT it (or set current:true) for an ongoing entry → shows "Present" and stays on top.
   The date label is generated automatically from start/end. Add `time:{en,ar}` to force a custom label instead.
   ph:true marks the editable placeholder; placeholders always stay at the bottom. */
const timeline=[
 {ph:true,start:"2021",end:"2026",title:{en:"B.Sc. in Computer Science",ar:"بكالوريوس علوم الحاسب"},org:{en:"Qassim University, sa",ar:"جامعة القصيم, السعودية"},
  desc:{en:"Earned a Bachelor of Science in Computer Science, maintaining a high academic standing and receiving the Academic Excellence Award for four consecutive years (2023–2026).",ar:"حصلت على درجة بكالوريوس في علوم الحاسب، مع الحفاظ على مستوى أكاديمي مرتفع وتلقي جائزة التفوق الأكاديمي لأربعة أعوام متتالية (2023–2026)."}},
 {ph:true,time:{en:"2025 jun - aug",ar:"2025 يونيو - أغسطس"},title:{en:"Intern",ar:"متدرب"},org:{en:"Upsource by solutions",ar:"Upsource by solutions"},
  desc:{en:"A three-month IT Support Specialist internship at Upsource by solutions (an stc Group company). Delivered frontline technical support, resolved hardware and software issues to ensure seamless daily operations.",ar:"تدريب لمدة ثلاثة أشهر كأخصائي دعم تقني في شركة Upsource by Solutions (إحدى شركات مجموعة stc). مهامي تمحورت حول تقديم الدعم التقني المباشر، وحل مشكلات الأجهزة والبرامج لضمان سير العمليات اليومية بسلاسة."}},
 {ph:true,time:{en:"Continuous",ar:"مستمر"},title:{en:"Course & Personal Projects",ar:"مشاريع دراسية وشخصية"},org:{en:"Self-directed",ar:"ذاتية"},
  desc:{en:"Built apps and tools across Python, C++ and Flutter — a smart-glasses prototype, a C++ budget tracker, and file-cleaning utilities.",ar:"بنيت تطبيقات وأدوات بلغات Python و C++ و Flutter — نموذج نظارات ذكية، ومتتبّع ميزانية بـ C++، وأدوات لتنظيف الملفات."}},
];
