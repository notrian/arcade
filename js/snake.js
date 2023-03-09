
let snake = {
    body: [ [9, 9]],
    nextDirection: [1, 0]
}

let gameState = {
    apple: [11, 8],
    snake: snake // from above
}

let boardSize = {
    width: 17,
    height: 17
}

const board = document.getElementById('game');
board.style.gridTemplateColumns = `repeat(${boardSize.width}, 1fr);`;

for (let i = 0; i < (boardSize.width*boardSize.height); i++) {
    let newChild = document.createElement('div');
    newChild.className = 'game-cell';
    if (i % 2 !== 0) newChild.classList.add('every-other');
    board.appendChild(newChild);
}


let direction = '';
document.addEventListener('keydown', (e) => {
    key = e.key.toLowerCase();
    if (key === 'w' || key === 'arrowup') direction = 'up';
    if (key === 's' || key === 'arrowdown') direction = 'down';
    if (key === 'a' || key === 'arrowleft') direction = 'left';
    if (key === 'd' || key === 'arrowright') direction = 'right';
    if (direction.length) e.preventDefault();
})

setInterval(() => {
}, 100);
tick();

function tick() {
    
    // udpate moving pixels
    if (direction === 'up') snake.body.forEach(bodyPart => { bodyPart[1]--; });
    if (direction === 'down') snake.body.forEach(bodyPart => { bodyPart[1]++; });
    if (direction === 'left') snake.body.forEach(bodyPart => { bodyPart[0]--; });
    if (direction === 'right') snake.body.forEach(bodyPart => { bodyPart[0]++; });
    


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
    }
}
endGame();
function endGame() {
    board.style.opacity = '0.3';
    board.style.border = `2px solid ${document.documentElement.style.getPropertyValue('--game-color-2')}`;
}