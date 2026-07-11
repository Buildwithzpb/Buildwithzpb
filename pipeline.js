
export function calculatePipeline(input, geometry, material){
  const quantity=Math.max(1, Number(input.quantity)||1);
  const volume=geometry(input);
  const pieceWeight=volume*material.density;
  return {
    volume,
    pieceWeight,
    total:pieceWeight*quantity,
    quantity
  };
}
