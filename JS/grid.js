import {
    clk,
    gridSize,
    randomApple,
    startGame,
    stopGame
} from "./controls.js";

const col = gridSize;
const row = gridSize;
let gridSwitch = document.getElementById("grid");
const grid = document.getElementsByClassName('grid5050')[0];
export let isGrid = false;

export function renderGrid() {

    for (let i = 1; i <= col * row; i++) {
        const cell = document.createElement('div');
        cell.className = 'cell';
        cell.tabIndex = i;
        grid.appendChild(cell);
    }
}
export function refreshGrid() {
    const cells = grid.querySelectorAll('div');
    cells.forEach((cell) => {
        cell.className = 'cell';
    });
    randomApple(1, gridSize);
}

export function gridSw() {
    isGrid = !isGrid;
    const cells = grid.querySelectorAll('div');
    
    if (isGrid) {
        cells.forEach((cell) => {
            cell.style.border = "1px solid rgba(255, 255, 255, 0.25)";
        });
    } else{
        cells.forEach((cell) => {
            cell.style.border = "none";
        });

    }
}
// ----Buttons-----
const startBtn = document.getElementsByTagName('button')[0];
const stopBtn = document.getElementsByTagName('button')[3];
startBtn.addEventListener('click', () => {
    startGame(clk);
});
stopBtn.addEventListener('click', () => {
    console.log('clicked');
    stopGame();
    refreshGrid();
});
gridSwitch.addEventListener('click', () => {
    // console.log(gridSwitch);
    gridSw();

});


