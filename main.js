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

    document.addEventListener('contextmenu', (e) => {e.preventDefault()})
  
    renderGrid();
    eventControls();
    directionControls();
    speedControls();
    randomApple(1, gridSize);
    
    //* FEATURES
    changeBodyLength(); // with PgUp/PgDn

});
