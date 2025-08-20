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
let highScore = 0;
let gameInterval;
let gameSpeed = 150; // milliseconds
let isGameOver = false;

// Load high score from localStorage
function loadHighScore() {
    const saved = localStorage.getItem('snakeHighScore');
    highScore = saved ? parseInt(saved) : 0;
    updateScoreDisplay();
}

// Save high score to localStorage
function saveHighScore() {
    if (score > highScore) {
        highScore = score;
        localStorage.setItem('snakeHighScore', highScore);
        updateScoreDisplay();
    }
}

// Update score display to show both current and high score
function updateScoreDisplay() {
    scoreDisplay.innerHTML = `Score: ${score} | High Score: ${highScore}`;
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw snake with modern gradient and rounded corners
    snake.forEach((segment, index) => {
        const x = segment.x * gridSize;
        const y = segment.y * gridSize;
        
        // Create gradient for snake body
        const gradient = ctx.createLinearGradient(x, y, x + gridSize, y + gridSize);
        if (index === 0) {
            // Head with different color
            gradient.addColorStop(0, '#4ade80');
            gradient.addColorStop(1, '#22c55e');
        } else {
            // Body with gradient
            gradient.addColorStop(0, '#10b981');
            gradient.addColorStop(1, '#059669');
        }
        
        ctx.fillStyle = gradient;
        
        // Draw rounded rectangle for snake segments
        const radius = 4;
        ctx.beginPath();
        ctx.moveTo(x + radius, y);
        ctx.lineTo(x + gridSize - radius, y);
        ctx.quadraticCurveTo(x + gridSize, y, x + gridSize, y + radius);
        ctx.lineTo(x + gridSize, y + gridSize - radius);
        ctx.quadraticCurveTo(x + gridSize, y + gridSize, x + gridSize - radius, y + gridSize);
        ctx.lineTo(x + radius, y + gridSize);
        ctx.quadraticCurveTo(x, y + gridSize, x, y + gridSize - radius);
        ctx.lineTo(x, y + radius);
        ctx.quadraticCurveTo(x, y, x + radius, y);
        ctx.closePath();
        ctx.fill();
        
        // Add subtle shadow
        ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
        ctx.shadowBlur = 4;
        ctx.shadowOffsetX = 2;
        ctx.shadowOffsetY = 2;
        ctx.fill();
        ctx.shadowColor = 'transparent';
    });

    // Draw food with modern design
    if (food.x !== undefined && food.y !== undefined) {
        const x = food.x * gridSize;
        const y = food.y * gridSize;
        
        // Create gradient for food
        const foodGradient = ctx.createRadialGradient(
            x + gridSize/2, y + gridSize/2, 0,
            x + gridSize/2, y + gridSize/2, gridSize/2
        );
        foodGradient.addColorStop(0, '#f87171');
        foodGradient.addColorStop(1, '#dc2626');
        
        ctx.fillStyle = foodGradient;
        
        // Draw food as a circle
        ctx.beginPath();
        ctx.arc(x + gridSize/2, y + gridSize/2, gridSize/2 - 2, 0, Math.PI * 2);
        ctx.fill();
        
        // Add glow effect
        ctx.shadowColor = '#f87171';
        ctx.shadowBlur = 15;
        ctx.fill();
        ctx.shadowColor = 'transparent';
        
        // Add shine effect
        ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
        ctx.beginPath();
        ctx.arc(x + gridSize/3, y + gridSize/3, gridSize/6, 0, Math.PI * 2);
        ctx.fill();
    }
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
        updateScoreDisplay();
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

    // Prevent default scrolling behavior for arrow keys
    if ([37, 38, 39, 40].includes(event.keyCode)) {
        event.preventDefault();
    }

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
    updateScoreDisplay();
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
    saveHighScore();
    finalScoreDisplay.innerHTML = `Your Score: ${score}<br>High Score: ${highScore}`;
    gameOverMenu.style.display = 'block';
    canvas.style.display = 'none';
    scoreDisplay.style.display = 'none';
}

// Event Listeners
startButton.addEventListener('click', startGame);
restartButton.addEventListener('click', startGame);
document.addEventListener('keydown', changeDirection);

// Initial setup
loadHighScore();
canvas.style.display = 'none';
scoreDisplay.style.display = 'none';
startMenu.style.display = 'block';
