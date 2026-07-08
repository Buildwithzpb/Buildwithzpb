export const Storage={
saveHistory(items){localStorage.setItem("bwzpb.history",JSON.stringify(items));},
loadHistory(){try{return JSON.parse(localStorage.getItem("bwzpb.history"))||[]}catch{return[];}}
};
