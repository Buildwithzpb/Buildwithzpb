export function fmt(v,d=3){return Number(v).toFixed(d);}
export function report(r){
return `Volume: ${fmt(r.volume)}
Weight/Piece: ${fmt(r.pieceWeight)}
Total: ${fmt(r.total)}`;
}
