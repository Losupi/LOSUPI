const menu=document.querySelector('#menu');const nav=document.querySelector('#nav');
menu.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Закрыть меню':'Открыть меню');menu.textContent=open?'✕':'☰'});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Открыть меню');menu.textContent='☰'}));
document.querySelector('#year').textContent=new Date().getFullYear();
document.querySelector('#copy-email').addEventListener('click',async()=>{const value='alyshaka@mail.ru',status=document.querySelector('#copy-status');try{if(navigator.clipboard&&window.isSecureContext){await navigator.clipboard.writeText(value)}else{const temp=document.createElement('textarea');temp.value=value;temp.style.position='fixed';temp.style.opacity='0';document.body.appendChild(temp);temp.select();if(!document.execCommand('copy'))throw Error('copy');temp.remove()}status.textContent='Почта скопирована ✓'}catch{status.textContent='Выделите адрес и скопируйте: '+value}});

const estimateForm=document.querySelector('#estimate-form');
const priceEl=document.querySelector('#estimate-price');
const summaryEl=document.querySelector('#estimate-summary');
const emailBrief=document.querySelector('#email-brief');
const briefStatus=document.querySelector('#brief-status');
let currentBrief='';
function updateEstimate(){
 const site=estimateForm.querySelector('input[name="site"]:checked');
 const extras=[...estimateForm.querySelectorAll('input[name="extra"]:checked')];
 const total=Number(site.value)+extras.reduce((sum,x)=>sum+Number(x.value),0);
 const note=document.querySelector('#brief-note').value.trim();
 priceEl.textContent='от '+new Intl.NumberFormat('ru-RU').format(total)+' ₽';
 summaryEl.textContent=site.dataset.label+(extras.length?' + '+extras.map(x=>x.dataset.label).join(', '):'');
 currentBrief=['Здравствуйте, Альбина! Хочу обсудить сайт.','Формат: '+site.dataset.label,'Дополнительно: '+(extras.length?extras.map(x=>x.dataset.label).join(', '):'пока без дополнений'),'Предварительная оценка: от '+new Intl.NumberFormat('ru-RU').format(total)+' ₽',note?'О проекте: '+note:'','Подскажите, пожалуйста, сроки и точную стоимость.'].filter(Boolean).join('\n');
 emailBrief.href='mailto:alyshaka@mail.ru?subject='+encodeURIComponent('Заявка на сайт — '+site.dataset.label)+'&body='+encodeURIComponent(currentBrief);
 briefStatus.textContent='Скопируйте бриф и вставьте его в Telegram.';
}
estimateForm.addEventListener('input',updateEstimate);
updateEstimate();
document.querySelector('#copy-brief').addEventListener('click',async()=>{
 try{if(navigator.clipboard&&window.isSecureContext){await navigator.clipboard.writeText(currentBrief)}else{const el=document.createElement('textarea');el.value=currentBrief;document.body.append(el);el.select();if(!document.execCommand('copy'))throw Error('copy');el.remove()}briefStatus.textContent='Бриф скопирован! Откройте Telegram и вставьте сообщение ✓'}catch{briefStatus.textContent='Не удалось скопировать автоматически. Используйте кнопку «Отправить на почту».'}
});

// Reading progress bar
const progressBar=document.querySelector('#scroll-progress');
function updateProgress(){const range=document.documentElement.scrollHeight-window.innerHeight;progressBar.style.width=(range>0?Math.min(100,window.scrollY/range*100):0)+'%'}
window.addEventListener('scroll',updateProgress,{passive:true});window.addEventListener('resize',updateProgress);updateProgress();
