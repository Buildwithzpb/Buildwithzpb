
import {wireCalculator} from './liveController.js';
document.addEventListener('DOMContentLoaded',()=>{
 wireCalculator({
   geometryProvider:()=>()=>0,
   materialProvider:()=>({density:0})
 });
});
