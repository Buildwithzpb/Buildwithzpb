
export function calculatePipeline(input, geometry, material){
  const volume=geometry(input);
  const pieceWeight=volume*material.density;
  return {
    volume,
    pieceWeight,
    totalWeight:pieceWeight*(input.quantity||1)
  };
}
