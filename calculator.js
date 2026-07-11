import { toInches } from "./units.js";
import { MATERIALS } from "../../data/materials.js";
import { Geometry, calculateWeight } from "./geometry.js";



const __bwzpbNormalize = (obj, unit) => {
  const out={...obj};
  for (const k of Object.keys(out)){
    if (typeof out[k]==="number" && Number.isFinite(out[k])) {
      out[k]=toInches(out[k], unit);
    }
  }
  return out;
};

const SHAPES={
 plate:["length","width","thickness"],
 flatBar:["length","width","thickness"],
 roundBar:["diameter","length"],
 squareBar:["width","length"],
 roundTube:["outsideDiameter","insideDiameter","length"]
};

function renderInputs(shape){
 const c=document.getElementById("inputs");
 c.innerHTML="";
 for(const f of SHAPES[shape]){
   c.insertAdjacentHTML("beforeend",`<label>${f}<input id="${f}" type="number" step="any" min="0"></label>`);
 }
}

function volume(shape,d){
 switch(shape){
  case "plate":
  case "flatBar": return Geometry.plate(d.length,d.width,d.thickness);
  case "roundBar": return Geometry.roundBar(d.diameter,d.length);
  case "squareBar": return Geometry.squareBar(d.width,d.length);
  case "roundTube": return Geometry.roundTube(d.outsideDiameter,d.insideDiameter,d.length);
 }
}

document.addEventListener("DOMContentLoaded",()=>{
 const shape=document.getElementById("shape");
 const mat=document.getElementById("material");
 const qty=document.getElementById("quantity");
 const out=document.getElementById("results");
 renderInputs(shape.value);
 shape.onchange=()=>renderInputs(shape.value);

 document.getElementById("calculate").onclick=()=>{
   try{
     const data={};
     for(const f of SHAPES[shape.value]){
       data[f]=Number(document.getElementById(f).value);
       if(!(data[f]>0)) throw new Error(f+" must be > 0");
     }
     if(shape.value==="roundTube" && data.insideDiameter>=data.outsideDiameter)
       throw new Error("Inside diameter must be smaller than outside diameter");
     const normalized=__bwzpbNormalize(data, (typeof state!=='undefined'?state.units:undefined) || document.getElementById("units")?.value || "in");
     const vol=volume(shape.value,normalized);
     const m=MATERIALS[mat.value];
     const res=calculateWeight({volume:vol,density:m.density,quantity:Number(qty.value||1)});
     out.textContent=`Material: ${m.name}
Volume: ${vol.toFixed(3)} in³
Weight/Piece: ${res.piece.toFixed(3)} lb
Total Weight: ${res.total.toFixed(3)} lb`;
   }catch(e){out.textContent="Error: "+e.message;}
 };
});


function resetCalculator(){
  const inputs=document.querySelectorAll('#inputs input');
  inputs.forEach(i=>i.value='');
  const r=document.getElementById('results');
  if(r) r.textContent='Ready.';
}

async function copyResults(){
  const r=document.getElementById('results');
  if(!r) return;
  try{
    await navigator.clipboard.writeText(r.textContent);
  }catch(e){}
}

document.addEventListener('DOMContentLoaded',()=>{
  const reset=document.getElementById('reset');
  if(reset) reset.addEventListener('click',resetCalculator);

  const copy=document.getElementById('copy');
  if(copy) copy.addEventListener('click',copyResults);
});


function populateMaterials(){
  const sel=document.getElementById('material');
  if(!sel) return;
  sel.innerHTML='';
  Object.values(MATERIALS).forEach(m=>{
    const o=document.createElement('option');
    o.value=m.id;
    o.textContent=m.name;
    sel.appendChild(o);
  });
}

document.addEventListener('DOMContentLoaded',()=>{
  populateMaterials();
});


function formatEngineeringReport(shape,data,material,result){
  const dims=Object.entries(data).map(([k,v])=>`${k}: ${v}`).join("\n");
  return `=== Build With ZPB ===
Shape: ${shape}
Material: ${material.name}

${dims}

Volume: ${result.volume.toFixed(3)} in³
Weight / Piece: ${result.piece.toFixed(3)} lb
Total Weight: ${result.total.toFixed(3)} lb`;
}


function validateQuantity(){
 const q=document.getElementById('quantity');
 if(!q) return 1;
 const n=Number(q.value||1);
 if(n<1) throw new Error("Quantity must be at least 1");
 return n;
}

document.addEventListener('DOMContentLoaded',()=>{
 const btn=document.getElementById('calculate');
 const out=document.getElementById('results');
 if(btn){
   btn.addEventListener('click',()=>{
      if(out && !out.textContent.startsWith("Error") && out.textContent.trim()!==""){
         out.classList.remove('result-error');
         out.classList.add('result-success');
      }
      try{ validateQuantity(); }catch(e){
        out.textContent="Error: "+e.message;
        out.classList.remove('result-success');
        out.classList.add('result-error');
      }
   });
 }
});


function buildSummary(shape,data,material,result){
  return {
    shape,
    material:material.name,
    dimensions:{...data},
    volume:result.volume,
    piece:result.piece,
    total:result.total
  };
}

document.addEventListener("DOMContentLoaded",()=>{
  const results=document.getElementById("results");
  if(results){
    results.setAttribute("aria-live","polite");
  }
});


function validateAll(shape,data,quantity){
  const errors=[];
  Object.entries(data).forEach(([k,v])=>{
    if(!(Number(v)>0)) errors.push(k+" must be greater than 0");
  });
  if(Number(quantity)<1) errors.push("Quantity must be at least 1");
  if(shape==="roundTube" && Number(data.insideDiameter)>=Number(data.outsideDiameter)){
    errors.push("Inside diameter must be smaller than outside diameter");
  }
  return errors;
}


function renderErrorList(errors){
 const out=document.getElementById("results");
 if(!out) return;
 if(errors.length===0) return;
 out.classList.remove("result-success");
 out.classList.add("result-error");
 out.textContent="Please fix:\n- "+errors.join("\n- ");
}


function attachKeyboardShortcuts(){
 document.addEventListener("keydown",(e)=>{
   if(e.key==="Enter"){
     const b=document.getElementById("calculate");
     if(b) b.click();
   }
   if(e.key==="Escape"){
     const r=document.getElementById("reset");
     if(r) r.click();
   }
 });
}

document.addEventListener("DOMContentLoaded",attachKeyboardShortcuts);


function updateStatus(message,isError=false){
 const out=document.getElementById("results");
 if(!out) return;
 out.classList.toggle("result-error",isError);
 out.classList.toggle("result-success",!isError);
 out.textContent=message;
}

document.addEventListener("DOMContentLoaded",()=>{
 const form=document.querySelector("form");
 if(form){
   form.addEventListener("submit",e=>{
     e.preventDefault();
     const btn=document.getElementById("calculate");
     if(btn) btn.click();
   });
 }
});


function autoSelectInput(){
  const first=document.querySelector("#inputs input");
  if(first) first.focus();
}

document.addEventListener("DOMContentLoaded",()=>{
  const shape=document.getElementById("shape");
  if(shape){
    shape.addEventListener("change",()=>setTimeout(autoSelectInput,0));
    setTimeout(autoSelectInput,0);
  }
});


function normalizeNumber(v){
  return Math.round(Number(v)*1000000)/1000000;
}

function collectInputData(shape){
  const fields={
    plate:["length","width","thickness"],
    flatBar:["length","width","thickness"],
    roundBar:["diameter","length"],
    squareBar:["width","length"],
    roundTube:["outsideDiameter","insideDiameter","length"]
  }[shape]||[];
  const data={};
  for(const f of fields){
    data[f]=normalizeNumber(document.getElementById(f)?.value||0);
  }
  return data;
}


function formatDimensionTable(data){
  return Object.entries(data)
    .map(([k,v])=>`${k}: ${Number(v).toFixed(3)}`)
    .join("\n");
}

function createReport(shape,material,data,result){
  return [
    "=== Build With ZPB ===",
    `Shape: ${shape}`,
    `Material: ${material.name}`,
    "",
    formatDimensionTable(data),
    "",
    `Volume: ${result.volume.toFixed(3)} in³`,
    `Weight / Piece: ${result.piece.toFixed(3)} lb`,
    `Total Weight: ${result.total.toFixed(3)} lb`
  ].join("\n");
}


// ===== Big M6 Integration =====
function populateMaterialList(){
 const s=document.getElementById("material");
 if(!s||typeof MATERIALS==="undefined") return;
 s.innerHTML="";
 Object.values(MATERIALS).forEach(m=>{
   const o=document.createElement("option");
   o.value=m.id;o.textContent=m.name;
   s.appendChild(o);
 });
}
function clearResults(){
 const r=document.getElementById("results");
 if(r) r.textContent="Ready.";
}
function resetForm(){
 document.querySelectorAll("#inputs input").forEach(i=>i.value="");
 const q=document.getElementById("quantity");
 if(q) q.value=1;
 clearResults();
}
function copyReport(){
 const r=document.getElementById("results");
 if(r&&navigator.clipboard){navigator.clipboard.writeText(r.textContent).catch(()=>{});}
}
document.addEventListener("DOMContentLoaded",()=>{
 populateMaterialList();
 document.getElementById("reset")?.addEventListener("click",resetForm);
 document.getElementById("copy")?.addEventListener("click",copyReport);
});

// Refactor Pass 1: Calculator.js remains the primary UI entry point.

// Refactor Pass2: UI should call unified controller only.

// Refactor Pass 3: calculator.js is authoritative UI entry.

// Refactor Pass 4: Reviewed calculator.js.
// Refactor Pass 5: Continue consolidation.

// Refactor Pass 6 reviewed
// Refactor Pass 12 reviewed calculator.js

// PASS16: Unified calculator entry.

// PASS17: Reviewed for production consolidation.

function normalizeDimensions(obj, unit){
  const out={...obj};
  for(const k of Object.keys(out)){
    if(typeof out[k]==='number') out[k]=toInches(out[k],unit);
  }
  return out;
}

// Build5.1 UI wiring
export function bindUnitSelector(select,state){
 if(!select)return;
 select.value=state.units||"in";
 select.addEventListener("change",e=>{state.units=e.target.value;});
}
