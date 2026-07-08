import { initializeMaterialWeight } from "./calculator.js";
document.addEventListener("DOMContentLoaded",()=>{
 if(document.getElementById("shape")) initializeMaterialWeight();
 const out=document.getElementById("featuredTools");
 if(out) out.innerHTML="<article><h2>Material Weight Calculator</h2><p>Available in Build 05.</p></article>";
});
