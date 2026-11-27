import { renderGrid } from "./JS/grid.js";
import {
    gridSize,
    eventControls,
    directionControls,
    speedControls,
    randomApple,
    changeBodyLength
} from "./JS/controls.js";

document.addEventListener('DOMContentLoaded', () => {
  
    renderGrid();
    eventControls();
    directionControls();
    speedControls();
    randomApple(1, gridSize);
    
    //* FEATURES
    changeBodyLength();

});
