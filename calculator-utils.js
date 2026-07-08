
export function formatNumber(n){return Number(n).toFixed(3);}
export function clampQuantity(q){return Math.max(1,parseInt(q||1,10));}
export function buildDimensionSummary(data){
 return Object.entries(data).map(([k,v])=>`${k}: ${Number(v).toFixed(3)}`).join("\n");
}
