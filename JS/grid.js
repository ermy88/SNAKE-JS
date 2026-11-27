import {
    clk,
    gridSize, 
    randomApple, 
    startGame, 
    stopGame
} from "./controls.js";

const col = gridSize;
const row = gridSize;

export function renderGrid() {
    const grid = document.getElementsByClassName('grid5050')[0];

    for (let i = 1; i <= col * row; i++) {
        const cell = document.createElement('div');
        cell.className = 'cell';
        cell.tabIndex = i;
        grid.appendChild(cell);
    }
}
export function refreshGrid() {
    const grid = document.querySelector('.grid5050');
    const cells = grid.querySelectorAll('div');
    cells.forEach((cell) => {
        cell.className = 'cell';
    });
    randomApple(1,gridSize);
}
// ----Buttons-----
const startBtn = document.getElementsByTagName('button')[0];
const stopBtn = document.getElementsByTagName('button')[3];
startBtn.addEventListener('click', () => {
    startGame(clk);
});
stopBtn.addEventListener('click', () => {
    stopGame();
    refreshGrid();
});

