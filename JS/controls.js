import { refreshGrid } from "./grid.js";

export let gridSize = Number(getComputedStyle(document.querySelector('.grid5050')).getPropertyValue('--gridSize'));
const centerGrid = gridSize * gridSize / 2 + gridSize / 2;
export let head = centerGrid; // x,y -> (0,0) center, a fej kezdőpozíciója a grid-en
export let speed = 40; // 1 tick per 'speed' miliseconds
export let vel = document.getElementById('speed'); // game speed
let direction = 2; // 0:U, 1:D, 2:L, 3:R
let nextDirection = 2;
let gameLoopId = 0; // setIntervalId-t kap
let pauseGame = true;

function drawSnake() {
    const snakeHead = document.getElementsByClassName('cell')[head];
    snakeHead.className = 'cell snake-head';
}
function removeTail() {
    const snakeHead = document.getElementsByClassName('cell')[head];
    snakeHead.classList.remove("snake-head");
}
function gameTick() {
    direction = nextDirection;
    removeTail();
    atWall();
    drawSnake();
}
export function startGame() {
    pauseGame = false;
    if (gameLoopId == 0) {
        gameLoopId = setInterval(gameTick, speed);
    }
}
export function togglePause() {
    if (!pauseGame) {
        pauseGame = true;
        clearInterval(gameLoopId);
        gameLoopId = 0;
    } else {
        startGame(speed);
    }
}
export function stopGame() {
    clearInterval(gameLoopId);
    gameLoopId = 0;
    head = centerGrid;
}
function atWall() {

    switch (direction) {
        case 0: //* UP
            (head < gridSize) ? head += Math.pow(gridSize, 2) - gridSize : head -= gridSize;
            break;
        case 1: //* DOWN
            (head < Math.pow(gridSize, 2) - gridSize) ? head += gridSize : head -= Math.pow(gridSize, 2) - gridSize;
            break;
        case 2: //* LEFT
            (head % gridSize == 0) ? head += gridSize - 1 : head -= 1;
            break;
        case 3: //* RIGHT
            (head % gridSize == gridSize - 1) ? head -= gridSize - 1 : head += 1;
            break;
    }
}

export function directionControls() {
    const opposite = { 0: 1, 1: 0, 2: 3, 3: 2 };
    const keyMap = { ArrowUp: 0, ArrowDown: 1, ArrowLeft: 2, ArrowRight: 3 };

    document.addEventListener('keydown', (event) => {
        const d = keyMap[event.key];
        if (d !== undefined && d !== opposite[direction]) {
            nextDirection = d;
        }
    });
}
export function eventControls() {
    document.addEventListener('keydown', (event) => {
        if (event.key === "Enter") { // Start
            startGame(speed);
        }
        else if (event.key === "p" || event.key === "P") { // Pause
            togglePause();
        } 
        else if (event.key === "q" || event.key === "Q") { // Reset
            stopGame();
            refreshGrid();
            pauseGame = true;
        }
    });
}
export function speedControls() {
    document.addEventListener('keydown', (event) => {
        if (event.key === "+") {
            (speed <= 20) ? speed = 20 : speed -= 20;
        }
        if (event.key === "-") {
            (speed >= 100) ? speed = 100 : speed += 20;
        }
        switch (speed) {
            case 80: vel.textContent = '2';
                break;
            case 60: vel.textContent = '3';
                break;
            case 40: vel.textContent = '4';
                break;
            case 20: vel.textContent = '5';
                break;
            default: vel.textContent = '1';
        }
        togglePause();
        togglePause();  // sebesség frissítése
    });
}