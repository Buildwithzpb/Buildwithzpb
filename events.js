export function bindCalculatorEvents(api){
document.getElementById("calculate")?.addEventListener("click",()=>api.calculate());
document.getElementById("reset")?.addEventListener("click",()=>api.reset());
document.getElementById("copy")?.addEventListener("click",()=>api.copy());
document.getElementById("shape")?.addEventListener("change",e=>api.shapeChanged(e.target.value));
}
