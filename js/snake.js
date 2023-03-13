
let snake = {
    body: [ [9, 9]],
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

    if (snake.direction === 'up') snakeHead[1]--; 
    if (snake.direction === 'down') snakeHead[1]++;
    if (snake.direction === 'left') snakeHead[0]--;
    if (snake.direction === 'right') snakeHead[0]++;
    
    snake.body.push(snakeHead);
    snake.body.shift()
    
    for (let i = 0; i < snake.body.length; i++) {
        let snakePart = snake.body[i];
        findCell(snakePart).style.background = 'white';
    }   

    // if (snake.body.length > 1) {
    // }
    
    console.log(snake.body)

        /////////////////////////////////////////////

    // for (let i = 0; i < snake.body.length; i++) {
    //     let snakePart = snake.body[i];
        
    //     findCell(snakePart).style.background = '';

    //     if (i === 0) {
    //         if (snakePart === gameState.apple) {
    //             console.log('d')
    //             snakeHead = snakePart;
    //         }
    //     }
        
    //     if (snake.direction === 'up') snakePart[1]--; 
    //     if (snake.direction === 'down') snakePart[1]++;
    //     if (snake.direction === 'left') snakePart[0]--;
    //     if (snake.direction === 'right') snakePart[0]++;
        
    //     if (i !== 0 && snakeHead === snakePart && snake.body.length > 1) return endGame();
        
    //     findCell(snakePart).style.background = 'white';
    // }   
    
    // if (snakeHead[1] < 1 || snakeHead[1] > boardSize.height) return endGame();
    // if (snakeHead[0] < 1 || snakeHead[0] > boardSize.width) return endGame();
    
    
    // if (snakeHead && snakeHead[0] === gameState.apple[0] && snakeHead[1] === gameState.apple[1]) {
    //     let newSnakePart = gameState.apple;
    //     if (snake.direction === 'up') newSnakePart[1]--; 
    //     if (snake.direction === 'down') newSnakePart[1]++;
    //     if (snake.direction === 'left') newSnakePart[0]--;
    //     if (snake.direction === 'right') newSnakePart[0]++;
    //     snake.body.push(newSnakePart);
    //     gameState.apple = [2,2];
    // }

    // findCell(gameState.apple).style.background = 'red';
    
    // oldSnakeHead = snakeHead;
    /////////////////////////////////////////////
    
    // udpate moving pixels
    // snake.body.forEach(bodyPart => { 
        
    //     if (bodyPart !== gameState.apple) {
    //         let beforeCell = findCell(bodyPart);
    //         if (beforeCell !== undefined) beforeCell.style.background = ''
    //     }

        
    //     if (snake.direction === 'up') bodyPart[1]--; 
    //     if (snake.direction === 'down') bodyPart[1]++;
    //     if (snake.direction === 'left') bodyPart[0]--;
    //     if (snake.direction === 'right') bodyPart[0]++;

    //     if (snake.body[0] === bodyPart && interations) endGame();
    //     if (bodyPart[0] < 1 || bodyPart[0] > boardSize.width) endGame();
    //     if (bodyPart[1] < 1 || bodyPart[1] > boardSize.height) endGame();

    //     if (gameState.gameStarted) {
    //         let childCell = findCell(bodyPart);
    //         childCell.style.background = 'white';
    //     }

    //     interations++;
    // });

    

    // if (isOverApple) {
    //     snake.body.push(gameState.apple)
    //     gameState.apple = [1, 1]
    //     console.log(snake.body)
    // }
    // else {
    //     findCell(gameState.apple).style.background = 'red';
    // }
}

function findCell(bodyPart) {
    let index = 0;
    let column = bodyPart[0];
    let row = bodyPart[1];
    return board.childNodes[(row * boardSize.width - boardSize.width) + column]
}