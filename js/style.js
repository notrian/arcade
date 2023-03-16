const theme = document.getElementById('theme');
const snakeselect = document.getElementById('snakecolor');
theme.value = 'black';
snakeselect.value = 'white';

theme.addEventListener('change', (e) => {
    let color1 = theme.value;
    let color2 = '#151515';

    if (theme.value === 'black') color1 = '#0f0f0f';
    if (theme.value === 'white') color2 = '#cccccc';
    if (theme.value === 'red') {
        color1 = '#B02A2A';
        color2 = '#fc3c3c';
    }
    if (theme.value === 'orange') color2 = '#b27300';
    if (theme.value === 'yellow') color2 = '#b2b200';
    if (theme.value === 'green') {
        color1 = '#04a071';
        color2 = '#066448';
    }
    if (theme.value === 'blue') {;
        color1 = '#294f86';
        color2 = '#396DBA';
    }
    if (theme.value === 'purple') {;
        color1 = '#796bb2';
        color2 = '#ae9aff';
    }
    if (theme.value === 'brown') color2 = '#581616';
    
    document.documentElement.style.setProperty('--game-color-1', color1)
    document.documentElement.style.setProperty('--game-color-2', color2)
});


snakeselect.addEventListener('change', (e) => {
    snakeColor = snakeselect.value;
    if (snakeColor === 'red') appleColor = 'green'
    else appleColor = 'red'
});