
export const History=[];
export function saveCalculation(entry){
 History.unshift({...entry,time:new Date().toISOString()});
 if(History.length>25) History.pop();
}
