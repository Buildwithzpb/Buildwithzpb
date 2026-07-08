
export function validateInput(data){
  const errors=[];
  Object.entries(data).forEach(([k,v])=>{
    if(k!=="quantity" && !(Number(v)>0)) errors.push(`${k} must be > 0`);
  });
  if((data.quantity||1)<1) errors.push("quantity must be >= 1");
  return errors;
}
