import {Geometry} from './geometry.js';
import {MATERIALS} from '../../data/materials.js';

export function geometryProvider(shape){
 return Geometry[shape];
}
export function materialProvider(id){
 return MATERIALS[id];
}
