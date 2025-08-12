const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreDisplay = document.getElementById('score');
const startMenu = document.getElementById('startMenu');
const startButton = document.getElementById('startButton');
const gameOverMenu = document.getElementById('gameOverMenu');
const finalScoreDisplay = document.getElementById('finalScore');
const restartButton = document.getElementById('restartButton');

const gridSize = 20;
let snake = [{ x: 10, y: 10 }];
let food = {};
let direction = 'right';
let score = 0;
let gameInterval;
let gameSpeed = 150; // milliseconds
let isGameOver = false;

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw snake
    ctx.fillStyle = 'lime';
    snake.forEach(segment => {
        ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize, gridSize);
    });

    // Draw food
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);
}

function generateFood() {
    food = {
        x: Math.floor(Math.random() * (canvas.width / gridSize)),
        y: Math.floor(Math.random() * (canvas.height / gridSize))
    };

    // Ensure food doesn't spawn on snake
    for (let i = 0; i < snake.length; i++) {
        if (snake[i].x === food.x && snake[i].y === food.y) {
            generateFood();
            return;
        }
    }
}

function moveSnake() {
    if (isGameOver) return;

    const head = { x: snake[0].x, y: snake[0].y };

    switch (direction) {
        case 'up':
            head.y--;
            break;
        case 'down':
            head.y++;
            break;
        case 'left':
            head.x--;
            break;
        case 'right':
            head.x++;
            break;
    }

    // Check for collision with walls
    if (head.x < 0 || head.x >= canvas.width / gridSize ||
        head.y < 0 || head.y >= canvas.height / gridSize) {
        endGame();
        return;
    }

    // Check for collision with self
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            endGame();
            return;
        }
    }

    snake.unshift(head); // Add new head

    // Check if food is eaten
    if (head.x === food.x && head.y === food.y) {
        score++;
        scoreDisplay.textContent = `Score: ${score}`;
        generateFood();
        // Increase speed slightly
        gameSpeed = Math.max(50, gameSpeed - 5);
        clearInterval(gameInterval);
        gameInterval = setInterval(gameLoop, gameSpeed);
    } else {
        snake.pop(); // Remove tail if no food eaten
    }

    draw();
}

function changeDirection(event) {
    if (isGameOver) return;

    const keyPressed = event.keyCode;
    const LEFT = 37;
    const UP = 38;
    const RIGHT = 39;
    const DOWN = 40;

    switch (keyPressed) {
        case LEFT:
            if (direction !== 'right') direction = 'left';
            break;
        case UP:
            if (direction !== 'down') direction = 'up';
            break;
        case RIGHT:
            if (direction !== 'left') direction = 'right';
            break;
        case DOWN:
            if (direction !== 'up') direction = 'down';
            break;
    }
}

function gameLoop() {
    moveSnake();
}

function startGame() {
    snake = [{ x: 10, y: 10 }];
    direction = 'right';
    score = 0;
    gameSpeed = 150;
    isGameOver = false;
    scoreDisplay.textContent = `Score: ${score}`;
    startMenu.style.display = 'none';
    gameOverMenu.style.display = 'none';
    canvas.style.display = 'block';
    scoreDisplay.style.display = 'block';

    generateFood();
    draw();
    clearInterval(gameInterval);
    gameInterval = setInterval(gameLoop, gameSpeed);
}

function endGame() {
    isGameOver = true;
    clearInterval(gameInterval);
    finalScoreDisplay.textContent = `Your Score: ${score}`;
    gameOverMenu.style.display = 'block';
    canvas.style.display = 'none';
    scoreDisplay.style.display = 'none';
}

// Event Listeners
startButton.addEventListener('click', startGame);
restartButton.addEventListener('click', startGame);
document.addEventListener('keydown', changeDirection);

// Initial setup
canvas.style.display = 'none';
scoreDisplay.style.display = 'none';
startMenu.style.display = 'block';
