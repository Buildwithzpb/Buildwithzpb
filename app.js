import { renderTools, enableSearch, decorateToolCards, wireToolLinks, renderToolStatus } from "./ui.js";
import { initializeMaterialWeight } from "./calculator.js";

document.addEventListener("DOMContentLoaded", () => {
    initializePlatform();

  if (document.getElementById("shape")) {
    initializeMaterialWeight();
  }
  renderTools();
  enableSearch();
    decorateToolCards();
    wireToolLinks();
    renderToolStatus();
});


export function initializePlatform(){
  renderTools();
  enableSearch();
  if (typeof decorateToolCards==='function') decorateToolCards();
  if (typeof wireToolLinks==='function') wireToolLinks();
  if (typeof renderToolStatus==='function') renderToolStatus();
}
