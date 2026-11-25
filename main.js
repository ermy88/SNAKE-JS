import { renderGrid } from "./JS/grid.js";
import {
    eventControls,
    directionControls,
    speedControls
} from "./JS/controls.js";


document.addEventListener('DOMContentLoaded', () => {

    renderGrid();
    eventControls();
    directionControls();
    speedControls();
 
});
