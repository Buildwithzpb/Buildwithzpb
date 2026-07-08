import {CalculatorState,updateState} from './state.js';
import {validateInput} from './validation.js';
import {calculatePipeline} from './pipeline.js';
import {saveCalculation,History} from './history.js';
import {Storage} from './storage.js';

export function execute(input,geometry,material){
 updateState(input);
 const errors=validateInput(input);
 if(errors.length) return {ok:false,errors};
 const result=calculatePipeline(input,geometry,material);
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
    totalWeight:pieceWeight*quantity
  };
}

export function executeProduction(input,geometryFn,material){
  const dims=collectDimensions();
  const volume=geometryFn(dims);
  return calculateWeight(volume,material.density,input.quantity||1);
}


export function validateProductionResult(result){
  if(!Number.isFinite(result.volume)||result.volume<=0) throw new Error("Invalid volume");
  if(!Number.isFinite(result.pieceWeight)||result.pieceWeight<0) throw new Error("Invalid piece weight");
  if(!Number.isFinite(result.totalWeight)||result.totalWeight<0) throw new Error("Invalid total weight");
  return result;
}

export function // unified
executeVerified(input,geometryFn,material){
  const result=executeProduction(input,geometryFn,material);
  return validateProductionResult(result);
}

// PRODUCTION PATH: Remove legacy execution paths after verification.

// Refactor Pass 1: Legacy execution paths scheduled for removal. Use executeProduction()/// unified
executeVerified().

// Refactor Pass 3: remove legacy execution branches after verification.

// Refactor Pass 4: Reviewed controller.js.
// Refactor Pass 5: Continue consolidation.

// Refactor Pass 6 reviewed
// NEXT: Delete legacy execute() after executeProduction is fully verified.
// RP10: Consolidate executeVerified as sole execution path.

// Refactor Pass 12 reviewed controller.js


export function executeUnified(input, geometry, material){
  return execute(input, geometry, material);
}

// PASS16: Production pipeline consolidation target.

// PASS17: Reviewed for production consolidation.

// PASS20: inspected and prepared for production verification.
