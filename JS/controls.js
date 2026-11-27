import { refreshGrid } from "./grid.js";

let tickCounter = 0;
export let gridSize = Number(getComputedStyle(document.querySelector('.grid5050')).getPropertyValue('--gridSize'));
const centerGrid = gridSize * gridSize / 2 + gridSize / 2;
export let head = centerGrid; // x,y -> (0,0) center, a fej kezdőpozíciója a grid-en
const body = [];
export let bodyLength = 7;
export let clk = 85; // 1/ms default speed
export let speed = document.getElementById('speed'); // game speed
export let pointsEl = document.getElementById('points'); // game points
export let expApple = 0;
let appleBonus = 0;
let points = 0;
let direction = 2; // 0:U, 1:D, 2:L, 3:R
let nextDirection = 2;
let gameLoopId = 0; // setIntervalId-t kap
let pauseGame = true;

speed.textContent = '1';

export function drawSnake() {
    const snakeHead = document.getElementsByClassName('cell')[head];
    snakeHead.className = 'cell snake-head';
    body.unshift(head);

    if (body.length == bodyLength) {
        let tail = document.getElementsByClassName('cell')[body[bodyLength - 1]];
        tail.classList.remove("snake-head");
        body.pop();
    }
}

export function randomApple(min, max) {
    const apple = Math.floor(Math.random() * max * max) + min;
    let appleEl = document.getElementsByClassName('cell')[apple];
    appleEl.className = 'cell apple';
    expApple = apple;
}


function gameTick() {
    direction = nextDirection;
    let nextCell = 0;
    switch (direction) {
        case 0: nextCell = head - gridSize; break;
        case 1: nextCell = head + gridSize; break;
        case 2: nextCell = head - 1; break;
        case 3: nextCell = head + 1; break;
        default: alert("error: nextDirection cannot read.");
    }
    if (body.includes(nextCell)) {
        gameOver();
    }
    moveAndWallCheck();
    drawSnake();

    tickCounter++;
    if (expApple === head || body.includes(expApple)) {
        bodyLength++;
        randomApple(1, gridSize);
        appleBonus += 50;
    }
    points = Math.round(tickCounter / 10) + appleBonus;
    pointsEl.textContent = points;
}
export function startGame() {
    pauseGame = false;
    if (gameLoopId == 0) {
        gameLoopId = setInterval(gameTick, clk);
    }
}
export function togglePause() {
    if (!pauseGame) {
        pauseGame = true;
        clearInterval(gameLoopId);
        gameLoopId = 0;
    } else {
        startGame(clk);
    }
}
export function stopGame() {
    clearInterval(gameLoopId);
    gameLoopId = 0;
    head = centerGrid;
    tickCounter = 0;
    pointsEl.textContent = 0;
    points = 0;
    body.length = 0;
    bodyLength = 7;
    appleBonus = 0;
    refreshGrid();
}
function moveAndWallCheck() {

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
            startGame(clk);
        }
        if (event.key === "p" || event.key === "P") { // Pause
            togglePause();
        }
        if (event.key === "q" || event.key === "Q") { // Reset
            stopGame();
            pauseGame = true;
        }
    });
}
export function speedControls() {
    document.addEventListener('keydown', (event) => {
        if (event.key === "+") {
            (clk <= 40) ? clk = 40 : clk -= 5;
        }
        if (event.key === "-") {
            (clk >= 85) ? clk = 85 : clk += 5;
        }
        switch (clk) {
            case 80: speed.textContent = '2';
                break;
            case 75: speed.textContent = '3';
                break;
            case 70: speed.textContent = '4';
                break;
            case 65: speed.textContent = '5';
                break;
            case 60: speed.textContent = '6';
                break;
            case 55: speed.textContent = '7';
                break;
            case 50: speed.textContent = '8';
                break;
            case 45: speed.textContent = '9';
                break;
            case 40: speed.textContent = '10';
                break;
            default: speed.textContent = '1';
        }
        togglePause();
        togglePause();  // sebesség frissítése
    });
}
export function changeBodyLength() {
    // bodyLength = Number(bodyLength);
    document.addEventListener('keydown', (event) => {
        // console.log(event);
        if (event.key === "PageUp") {
            bodyLength++;
        }
        if (event.key === "PageDown") {
            (bodyLength <= 5) ? bodyLength = 5 : bodyLength--;
            const tail = document.getElementsByClassName('cell')[body[bodyLength - 1]];
            tail.classList.remove("snake-head");
            body.pop();
        }
    });
} 


function gameOver() {
    alert(`Game Over! You got ${pointsEl.textContent} points. Congratulation! `);
    stopGame();
}
