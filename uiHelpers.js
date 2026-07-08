export function byId(id){return document.getElementById(id);}
export function setText(id,text){
 const el=byId(id);
 if(el) el.textContent=text;
}
export function toggle(el,on){
 if(el) el.classList.toggle("hidden",!on);
}
