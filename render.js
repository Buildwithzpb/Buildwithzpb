export function renderResults(target,result){
 if(!target) return;
 target.textContent=`Volume: ${result.volume}\nWeight/Piece: ${result.pieceWeight}\nTotal Weight: ${result.total}`;
}
export function renderErrors(target,errors){
 if(!target) return;
 target.textContent=errors.join("\n");
}
