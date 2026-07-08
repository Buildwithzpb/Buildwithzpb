export function runGeometry(fn,dimensions){
 if(typeof fn!=="function") throw new Error("Invalid geometry function");
 return fn(dimensions);
}
