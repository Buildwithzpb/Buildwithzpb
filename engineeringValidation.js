import { calculateWeight } from "../calculator.js";
export const engineeringTests=[
{name:"Plate in/mm",geometry:"plate",imperial:{length:1,width:1,thickness:1,unit:"in",material:"A36 Steel"},metric:{length:25.4,width:25.4,thickness:25.4,unit:"mm",material:"A36 Steel"}},
{name:"Round Bar in/mm",geometry:"roundBar",imperial:{diameter:1,length:12,unit:"in",material:"A36 Steel"},metric:{diameter:25.4,length:304.8,unit:"mm",material:"A36 Steel"}},
{name:"Square Bar in/mm",geometry:"squareBar",imperial:{side:1,length:12,unit:"in",material:"A36 Steel"},metric:{side:25.4,length:304.8,unit:"mm",material:"A36 Steel"}},
{name:"Round Tube in/mm",geometry:"roundTube",imperial:{outsideDiameter:2,wallThickness:0.125,length:12,unit:"in",material:"A36 Steel"},metric:{outsideDiameter:50.8,wallThickness:3.175,length:304.8,unit:"mm",material:"A36 Steel"}}
]

export function nearlyEqual(a,b,tol=1e-9){
 return Math.abs(a-b)<=tol;
}

export function runEngineeringValidation(runCase){
 return engineeringTests.map(t=>{
   const r=runCase(t);
   return {...t,pass: nearlyEqual(r.imperial.piece, r.metric.piece) && nearlyEqual(r.imperial.total, r.metric.total),imperial:r.imperial,metric:r.metric};
 });
}


export function createCalculatorRunner(calculate){
  return function(runCase){
    const imperial = calculate(runCase.geometry, runCase.imperial);
    const metric = calculate(runCase.geometry, runCase.metric);
    return {imperial, metric};
  };
}


export const productionRunner = createCalculatorRunner(
  (geometry, input) => calculateWeight(geometry, input)
);


export const validationResults = runEngineeringValidation(productionRunner);
