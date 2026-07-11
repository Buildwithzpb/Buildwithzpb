import {execute} from './controller.js';
import {renderResults,renderErrors} from './render.js';
import {Storage} from './storage.js';
import {geometryProvider,materialProvider} from './providers.js';

export function wireCalculator(){
 const results=document.getElementById('results');
 document.getElementById('calculate')?.addEventListener('click',()=>{
   const shape=document.getElementById('shape')?.value;
   const materialId=document.getElementById('material')?.value;
   const qty=Number(document.getElementById('quantity')?.value||1);
   const geom=geometryProvider(shape);
   const mat=materialProvider(materialId);
   const input={shape,quantity:qty};
   const r=execute(input,geom,mat);
   if(r.ok){
      renderResults(results,r.result);
      Storage.saveHistory([r.result]);
   }else{
      renderErrors(results,r.errors);
   }
 });
}


export function runProductionCalculation(input,geometryFn,material,target,renderer){
  const result=execute(input,geometryFn,material);
  renderer.renderResults(target,result);
  return result;
}


export function runVerifiedCalculation(input,geometryFn,material,target,renderer){
 const result=execute(input,geometryFn,material);
 renderer.renderResults(target,result);
 return result;
}

// Refactor Pass 4: Reviewed liveController.js.
// Refactor Pass 5: Continue consolidation.

// Refactor Pass 6 reviewed
// Refactor Pass 12 reviewed liveController.js

// Future controller calls should use execute().

// PASS16: Legacy controller path removed pending verification.

// PASS17: Reviewed for production consolidation.
