export function createWorkflow(api){
return{
 calculate:(ctx)=>api.calculate?.(ctx),
 reset:()=>api.reset?.(),
 copy:()=>api.copy?.(),
 export:()=>api.exportReport?.()
};
}
