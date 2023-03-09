
const board = document.getElementById('game');

for (let i = 0; i < (17*17); i++) {
    let newChild = document.createElement('div');
    newChild.className = 'game-cell';
    if (i % 2 !== 0) newChild.classList.add('every-other');
    board.appendChild(newChild);
}