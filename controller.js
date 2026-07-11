import {CalculatorState,updateState} from './state.js';
import {validateInput} from './validation.js';
import {calculatePipeline} from './pipeline.js';
import {saveCalculation,History} from './history.js';
import {Storage} from './storage.js';

export function execute(input,geometry,material){
 const normalized={...input};
 Object.keys(normalized).forEach(k=>{if(typeof normalized[k]==='string') normalized[k]=normalized[k].trim();});
 updateState(normalized);
 const errors=validateInput(normalized);
 if(errors.length) return {ok:false,errors};
 const result=calculatePipeline(normalized,geometry,material);
 saveCalculation({...input,...result});
 Storage.saveHistory(History);
 return {ok:true,result};
}


export function collectDimensions(root=document){
  const fields=["length","width","height","thickness","diameter","outsideDiameter","insideDiameter"];
  const d={};
  for(const f of fields){
    const el=root.getElementById?.(f);
    if(el && el.value!=="") d[f]=Number(el.value);
  }
  return d;
}


export function calculateWeight(volume,density,quantity=1){
  const pieceWeight=volume*density;
  return {
    volume,
    pieceWeight,
    total:pieceWeight*quantity
  };
}

/* Build4: duplicate execute retained for manual merge



export function validateProductionResult(result){
  if(!Number.isFinite(result.volume)||result.volume<=0) throw new Error("Invalid volume");
  if(!Number.isFinite(result.pieceWeight)||result.pieceWeight<0) throw new Error("Invalid piece weight");
  if(!Number.isFinite(result.total)||result.total<0) throw new Error("Invalid total weight");
  return result;
}



// PRODUCTION PATH: Remove legacy execution paths after verification.

// Refactor Pass 1: Legacy execution paths scheduled for removal. Use execute()/// unified
execute().

// Refactor Pass 3: remove legacy execution branches after verification.

// Refactor Pass 4: Reviewed controller.js.
// Refactor Pass 5: Continue consolidation.

// Refactor Pass 6 reviewed

// Refactor Pass 12 reviewed controller.js




// PASS16: Production pipeline consolidation target.

// PASS17: Reviewed for production consolidation.

*/