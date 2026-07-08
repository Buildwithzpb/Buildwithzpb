
export function makeReport(data){
return [
"=== Build With ZPB ===",
`Shape: ${data.shape}`,
`Material: ${data.material}`,
`Volume: ${data.volume}`,
`Weight/Piece: ${data.weight}`,
`Quantity: ${data.quantity}`,
`Total Weight: ${data.total}`
].join("\n");
}
