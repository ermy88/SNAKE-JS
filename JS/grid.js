import {
    head,
    vel,
    speed,
    gridSize, 
    startGame, 
    stopGame
} from "/JS/controls.js";

const col = gridSize;
const row = gridSize;

export function renderGrid() {

    vel.textContent = '4';

    const grid = document.getElementsByClassName('grid5050')[0];

    for (let i = 0; i < col * row; i++) {
        const cell = document.createElement('div');
        cell.className = 'cell';
        cell.tabIndex = i;
        grid.appendChild(cell);
    }
}
export function refreshGrid() {
    const grid = document.querySelector('.grid5050');
    const cells = grid.querySelectorAll('div');
    const snakeHead = document.getElementsByClassName('cell')[head];
    cells.forEach((cell) => {
        cell.className = 'cell';
    });
    snakeHead.className = 'cell snake-head';
}

// ----Buttons-----

const startBtn = document.getElementsByTagName('button')[0];
const stopBtn = document.getElementsByTagName('button')[2];
startBtn.addEventListener('click', () => {
    startGame(speed);
});
stopBtn.addEventListener('click', () => {
    stopGame();
    refreshGrid();
});

