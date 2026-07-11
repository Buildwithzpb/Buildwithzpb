import { tools } from "./toolsRegistry.js";
export function renderTools(containerId="featuredTools"){
 const el=document.getElementById(containerId); if(!el)return;
 el.innerHTML=tools.map(t=>`<article class="tool-card ${t.comingSoon?'coming-soon':''}">
<h2>${t.name}</h2><p>${t.description}</p><small>${t.category}</small>
${t.comingSoon?'<span class="badge">Coming Soon</span>':`<a href="${t.href}">Open Tool</a>`}
</article>`).join('');
}
export function enableSearch(inputId="toolSearch"){
 const input=document.getElementById(inputId); if(!input)return;
 input.addEventListener('input',()=>{
 const q=input.value.toLowerCase();
 document.querySelectorAll('.tool-card').forEach(c=>c.style.display=c.textContent.toLowerCase().includes(q)?'':'none');
});
}


export function decorateToolCards(){
 document.querySelectorAll('.tool-card').forEach(card=>{
   if(!card.querySelector('.tool-category')){
      const p=document.createElement('div');
      p.className='tool-category';
      p.textContent='Engineering Tool';
      card.prepend(p);
   }
 });
}


export function wireToolLinks(){
  document.querySelectorAll('.tool-card a').forEach(a=>{
    a.setAttribute('aria-label', a.textContent || 'Open Tool');
  });
}


export function renderToolStatus(){
  document.querySelectorAll('.tool-card').forEach(card=>{
    const badge=card.querySelector('.status-badge');
    if(badge && badge.textContent.toLowerCase().includes('coming')){
      card.classList.add('coming-soon');
    }
  });
}
