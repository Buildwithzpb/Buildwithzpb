export const TO_INCHES=Object.freeze({in:1,ft:12,mm:0.03937007874,cm:0.3937007874,m:39.37007874});
export function toInches(value,unit='in'){
 const factor=TO_INCHES[unit];
 if(factor===undefined) throw new Error(`Unsupported unit: ${unit}`);
 return Number(value)*factor;
}
