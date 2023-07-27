var gameBoard = document.querySelector("#gameBoard");
var ctx = gameBoard.getContext("2d");
var scoreText = document.querySelector("#scoreText");
var resetBtn = document.querySelector("#resetBtn");
var gameWidth = gameBoard.width;
var gameHeight = gameBoard.height;
var boardBackground = "white";
var snakeColor = "lightgreen";
var snakeBorder = "black";
var foodColor = "red";
var unitSize = 15;
var running = false;
var xVelocity = unitSize;
var yVelocity = 0;
var foodX;
var foodY;
var score = 0;
var snake = [
    { x: unitSize * 4, y: 0 },
    { x: unitSize * 3, y: 0 },
    { x: unitSize * 2, y: 0 },
    { x: unitSize, y: 0 },
    { x: 0, y: 0 },
];
window.addEventListener("keydown", changeDirection);
if (resetBtn) {
    resetBtn.addEventListener("click", resetGame);
}
gameStart();
function gameStart() {
    running = true;
    if (scoreText) {
        scoreText.textContent = score.toString();
    }
    createFood();
    drawFood();
    nextTick();
}
function nextTick() {
    if (running) {
        setTimeout(function () {
            clearBoard();
            drawFood();
            moveSnake();
            drawSnake();
            checkGameOver();
            nextTick();
        }, 75);
    }
    else {
        displayGameOver();
    }
}
function clearBoard() {
    ctx.fillStyle = boardBackground;
    ctx.fillRect(0, 0, gameWidth, gameHeight);
}
function createFood() {
    function randomFood(min, max) {
        var randNum = Math.round((Math.random() * (max - min) + min) / unitSize) * unitSize;
        return randNum;
    }
    foodX = randomFood(0, gameWidth - unitSize);
    foodY = randomFood(0, gameWidth - unitSize);
}
function drawFood() {
    ctx.fillStyle = foodColor;
    ctx.fillRect(foodX, foodY, unitSize, unitSize);
}
function moveSnake() {
    var head = { x: snake[0].x + xVelocity, y: snake[0].y + yVelocity };
    snake.unshift(head);
    //if food is eaten
    if (snake[0].x === foodX && snake[0].y === foodY) {
        score += 1;
        scoreText.textContent = score.toString();
        createFood();
    }
    else {
        snake.pop();
    }
}
function drawSnake() {
    ctx.fillStyle = snakeColor;
    ctx.strokeStyle = snakeBorder;
    snake.forEach(function (snakePart) {
        ctx.fillRect(snakePart.x, snakePart.y, unitSize, unitSize);
        ctx.strokeRect(snakePart.x, snakePart.y, unitSize, unitSize);
    });
}
function changeDirection(event) {
    var keyPressed = event.keyCode;
    var LEFT = 37;
    var UP = 38;
    var RIGHT = 39;
    var DOWN = 40;
    var goingUp = yVelocity === -unitSize;
    var goingDown = yVelocity === unitSize;
    var goingRight = xVelocity === unitSize;
    var goingLeft = xVelocity === -unitSize;
    switch (true) {
        case keyPressed === LEFT && !goingRight:
            xVelocity = -unitSize;
            yVelocity = 0;
            break;
        case keyPressed === UP && !goingDown:
            xVelocity = 0;
            yVelocity = -unitSize;
            break;
        case keyPressed === RIGHT && !goingLeft:
            xVelocity = unitSize;
            yVelocity = 0;
            break;
        case keyPressed === DOWN && !goingUp:
            xVelocity = 0;
            yVelocity = unitSize;
            break;
    }
}
function checkGameOver() {
    switch (true) {
        case snake[0].x < 0:
        case snake[0].x >= gameWidth:
        case snake[0].y < 0:
        case snake[0].y >= gameHeight:
        case snake.slice(1).some(function (part) { return part.x === snake[0].x && part.y === snake[0].y; }):
            running = false;
            break;
    }
}
function displayGameOver() {
    ctx.font = "50px MV Boli";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.fillText("GAME OVER!", gameWidth / 2, gameHeight / 2);
    running = false;
}
function resetGame() {
    score = 0;
    xVelocity = unitSize;
    yVelocity = 0;
    snake = [
        { x: unitSize * 4, y: 0 },
        { x: unitSize * 3, y: 0 },
        { x: unitSize * 2, y: 0 },
        { x: unitSize, y: 0 },
        { x: 0, y: 0 },
    ];
    gameStart();
}
