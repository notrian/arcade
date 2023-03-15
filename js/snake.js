
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

const board = document.getElementById('game');
const play = document.getElementById('play');
const deadbox = document.getElementById('deadbox');

setTimeout(() => {
    board.style.gridTemplateColumns = `repeat(${boardSize.width}, 1fr)`;    
}, 120);


// create all cells according to size
for (let i = 0; i < (boardSize.width*boardSize.height); i++) {
    let newChild = document.createElement('div');
    newChild.className = 'game-cell';
    if (i % 2 !== 0) newChild.classList.add('every-other');
    board.appendChild(newChild);
}

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
    tick();
});



endGame();

// setInterval(() => {
//     if (gameState.gameStarted) tick();
// }, 200);

function startGame() {
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
}

function endGame() {
    // udpate moving pixels
    snake.body.forEach(bodyPart => { 
        let beforeCell = findCell(bodyPart);
        if (beforeCell !== undefined) beforeCell.style.background = '';
    });

    gameState.gameStarted = false;
    play.innerText = 'Play';
    deadbox.style.display = 'block';
    board.style.opacity = '0.3';
    board.style.border = `2px solid ${document.documentElement.style.getPropertyValue('--game-color-2')}`;
}

function tick() {
    
    let isOverApple = false;
    
    // let snakeTail = snake.body[snake.body.length - 1];
    // if (snakeTail === snakeHead) snakeTail = undefined;
    
    let snakeHead = snake.body[snake.body.length - 1];

    if (snakeHead[0] === gameState.apple[0] && snakeHead[1] === gameState.apple[1]) { 
    }
    else {
        let snakeTail = snake.body.shift();
        findCell(snakeTail).style.background = '';

    }

    let x = snakeHead[0], y = snakeHead[1];
    if (snake.direction === 'up') y--; 
    if (snake.direction === 'down') y++;
    if (snake.direction === 'left') x--;
    if (snake.direction === 'right') x++;

    snake.body.push([x, y]);

    findCell(gameState.apple).style.background = 'red';
    
    // if (snakeHead[0] === gameState.apple[0] && snakeHead[1] === gameState.apple[1]) {
    //     snake.body.unshift([gameState.apple[0], gameState.apple[1]])
    // }
    
    for (let i = 0; i < snake.body.length; i++) {
        let snakePart = snake.body[i];
        findCell(snakePart).style.background = 'white';
    }   
    
    console.log(snake.body)
}

function findCell(bodyPart) {
    let index = 0;
    let column = bodyPart[0];
    let row = bodyPart[1];
    return board.childNodes[(row * boardSize.width - boardSize.width) + column]
}