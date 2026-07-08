import {bindCalculatorEvents} from './events.js';
import {execute} from './controller.js';
import {renderResults,renderErrors} from './render.js';

export function startCalculator(api){
  bindCalculatorEvents(api);
}
