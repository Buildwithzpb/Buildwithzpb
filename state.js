
export const CalculatorState={
 shape:"plate",
 material:"a36Steel",
 quantity:1,
 units:"imperial"
};
export function updateState(values){
 Object.assign(CalculatorState,values);
 return CalculatorState;
}
