
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
    width: 17,
    height: 17
}

const board = document.getElementById('game');
const play = document.getElementById('play');
const deadbox = document.getElementById('deadbox');
board.style.gridTemplateColumns = `repeat(${boardSize.width}, 1fr);`;


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
document.addEventListener('keydown', (e) => {
    key = e.key.toLowerCase();
    if (key === 'w' || key === 'arrowup') snake.direction = 'up';
    if (key === 's' || key === 'arrowdown') snake.direction = 'down';
    if (key === 'a' || key === 'arrowleft') snake.direction = 'left';
    if (key === 'd' || key === 'arrowright') snake.direction = 'right';
    if (snake.direction.length) e.preventDefault();
})



endGame();

setInterval(() => {
    if (gameState.gameStarted) tick();
}, 100);

function startGame() {
    snake = {
        body: [ [9, 9]],
        direction: ''
    }
    gameState.gameStarted = true;
    play.innerText = 'Stop';
    deadbox.style.display = 'none';
    board.style.opacity = '1';
    board.style.border = `2px solid ${document.documentElement.style.getPropertyValue('--background')}`;
}

function endGame() {
    gameState.gameStarted = false;
    play.innerText = 'Play';
    deadbox.style.display = 'block';
    board.style.opacity = '0.3';
    board.style.border = `2px solid ${document.documentElement.style.getPropertyValue('--game-color-2')}`;
}

function tick() {
    
    // udpate moving pixels
    snake.body.forEach(bodyPart => { 
        if (snake.direction === 'up') bodyPart[1]--; 
        if (snake.direction === 'down') bodyPart[1]++;
        if (snake.direction === 'left') bodyPart[0]--;
        if (snake.direction === 'right') bodyPart[0]++;

        if (bodyPart[0] < 1 || bodyPart[0] - 3 > boardSize.width) endGame();
        if (bodyPart[1] < 0 || bodyPart[1] > boardSize.height) endGame();
    });

    if (!gameState.gameStarted) return;
    
    // show snake body
    let row = 1, column = 1;
    for (let i = 0; i < board.childNodes.length; i++) {
        const cell = board.childNodes[i];
        snake.body.forEach(bodyPart => {
            if (column === bodyPart[0] + 1 && row === bodyPart[1]) {
                cell.style.background = "white";
            }
            else {
                if (!cell.style) return;
                if (i % 2 === 0) cell.style.background = document.documentElement.style.getPropertyValue('--game-color-1');
                else cell.style.background = document.documentElement.style.getPropertyValue('--game-color-2');
            }
        });

        if (boardSize.width === column) {
            column = 1;
            row++;
        } else column++;
        console.log(row)
        console.log(column)

    }
}