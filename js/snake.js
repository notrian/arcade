
let snake = {
    body: [ [9, 9], [9, 8]],
    direction: ''
}
let gameState = {
    gameStarted: false,
    apple: [11, 8],
    snake: snake // from above
}
let boardSize = {
    width: 19,
    height: 19
}

// difficulty changer
const difficulty = document.getElementById('difficulty');
let tickSpeed = parseInt(difficulty.value);

difficulty.addEventListener('change', (e) => {
    tickSpeed = parseInt(difficulty.value);
});


const board = document.getElementById('game');
const play = document.getElementById('play');
const deadbox = document.getElementById('deadbox');
const score = document.getElementById('score');
const topscore = document.getElementById('topscore');
const avgscore = document.getElementById('avgscore');
let scores = [];

// Start game when play pressed
play.addEventListener('click', () => {
    if (!gameState.gameStarted) startGame()
    else endGame();
});


// change snake.direction when key down
let isTurning = false;
document.addEventListener('keydown', (e) => {
    if (isTurning) return;
    isTurning = true;
    key = e.key.toLowerCase();
    if (snake.direction !== 'down' && (key === 'w' || key === 'arrowup')) snake.direction = 'up';
    if (snake.direction !== 'up' && (key === 's' || key === 'arrowdown')) snake.direction = 'down';
    if (snake.direction !== 'right' && (key === 'a' || key === 'arrowleft')) snake.direction = 'left';
    if (snake.direction !== 'left' && (key === 'd' || key === 'arrowright')) snake.direction = 'right';
    if (key === ' ' || key === 'enter') startGame();
    if (snake.direction.length) e.preventDefault();
    isTurning = false;
    // tick();
});


function createBoard() {
    boardSize.width = document.getElementById('width').value;
    boardSize.height = document.getElementById('height').value;
    board.style.gridTemplateColumns = `repeat(${boardSize.width}, 1fr)`;    

    // create all cells according to size
    if (board.childElementCount > 1) return;
    for (let i = 0; i < (boardSize.width*boardSize.height); i++) {
        let newChild = document.createElement('div');
        newChild.className = 'game-cell';
        if (i % 2 !== 0) newChild.classList.add('every-other');
        board.appendChild(newChild);
    }
}

// setup game for playing when user loads browser
createBoard()
let tickInterval = setInterval(tick, tickSpeed)
endGame();
scores = [];

let appleColor = 'red';
let snakeColor = 'white';

// called whenever play is pressed
function startGame() {
    createBoard();

    if (document.documentElement.style.getPropertyValue('--game-color-1') === '#B02A2A') appleColor = '#00cc00';
    if (document.documentElement.style.getPropertyValue('--game-color-2') === '#cccccc') snakeColor = 'black';
    resetApple();

    for (let i = 0; i < board.childNodes.length; i++) { 
        if (board.childNodes[i].style) board.childNodes[i].style.background = '';
    }
    snake = {
        body: [ [Math.round(boardSize.width / 2), Math.round(boardSize.height / 2)]],
        direction: ''
    }
    gameState.gameStarted = true;
    play.innerText = 'Stop';
    deadbox.style.display = 'none';
    board.style.opacity = '1';
    board.style.border = `2px solid ${document.documentElement.style.getPropertyValue('--background')}`;

    tickInterval = setInterval(tick, tickSpeed);
}

// called whenever snake dies
function endGame() {   
    scores.push(parseInt(score.innerText));
    let totalScore = 0;
    scores.forEach(scr => {
        totalScore+=scr;
    });
    avgscore.innerText = Math.round(totalScore / scores.length);
    
    if (parseInt(topscore.innerText) < parseInt(score.innerText)) {
        topscore.innerText = score.innerText;
    }
    
    gameState.gameStarted = false;
    play.innerText = 'Play';
    deadbox.style.display = 'block';
    board.style.opacity = '0.3';
    board.style.border = `2px solid ${document.documentElement.style.getPropertyValue('--game-color-2')}`;
    
    clearInterval(tickInterval);
}

function tick() {
    
    let snakeHead = snake.body[snake.body.length - 1];
    
    // if the snake is not on the apple, remove tail
    if (snakeHead[0] === gameState.apple[0] && snakeHead[1] === gameState.apple[1]) { }
    else {
        let snakeTail = snake.body.shift();
        findCell(snakeTail).style.background = '';
    }

    // updates position of new head
    let x = snakeHead[0], y = snakeHead[1];
    if (snake.direction === 'up') y--; 
    if (snake.direction === 'down') y++;
    if (snake.direction === 'left') x--;
    if (snake.direction === 'right') x++;

    if (x > boardSize.width || x < 1) return endGame(); // if goes off map
    if (y > boardSize.height || y < 1) return endGame(); // if goes off map
    if (snake.body.some(bodyPart => bodyPart[0] === x && bodyPart[1] === y)) return endGame(); // if body hits self
    
    snake.body.push([x, y]); // add the new head
    
    // color in current apple
    findCell(gameState.apple).style.background = appleColor;
    
    // if snake is over apple, reset it
    if (snakeHead[0] === gameState.apple[0] && snakeHead[1] === gameState.apple[1]) {
        resetApple();
    }
    
    // draw all body parts
    for (let i = 0; i < snake.body.length; i++) {
        let snakePart = snake.body[i];
        findCell(snakePart).style.background = snakeColor;
    }   

    // update score text to amount of body parts added
    score.innerText = `${snake.body.length - 1}`;    
}

function resetApple() {
    findCell(gameState.apple).style.background = '';
    let randomX = Math.floor(Math.random() * boardSize.width) + 1;
    let randomY = Math.floor(Math.random() * boardSize.height) + 1;
    gameState.apple = [randomX, randomY];
    findCell(gameState.apple).style.background = appleColor;
}

function findCell(bodyPart) {
    let index = 0;
    let column = bodyPart[0];
    let row = bodyPart[1];
    return board.childNodes[(row * boardSize.width - boardSize.width) + column]
}