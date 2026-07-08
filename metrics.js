export function buildMetrics(history=[]){
return {
 calculations: history.length,
 lastCalculation: history[0]?.time ?? null
};
}
