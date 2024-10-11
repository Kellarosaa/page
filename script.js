const board = document.getElementById('board');
const restartButton = document.getElementById('restart');
let currentPlayer = 'X';
let gameState = ['', '', '', '', '', '', '', '', ''];

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function createBoard() {
    gameState.forEach((cell, index) => {
        const cellElement = document.createElement('div');
        cellElement.classList.add('cell');
        cellElement.addEventListener('click', () => handleCellClick(index));
        board.appendChild(cellElement);
    });
}

function handleCellClick(index) {
    if (gameState[index] === '') {
        gameState[index] = currentPlayer;
        render();
        if (!checkWin()) {
            currentPlayer = 'O';
            botMove();
        }
    }
}

function botMove() {
    const availableCells = gameState.map((cell, index) => cell === '' ? index : null).filter(index => index !== null);
    const winningMove = findWinningMove();
    if (winningMove !== -1) {
        gameState[winningMove] = currentPlayer;
    } else {
        const move = availableCells[Math.floor(Math.random() * availableCells.length)];
        gameState[move] = currentPlayer;
    }
    render();
    checkWin();
}

function findWinningMove() {
    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (gameState[a] === 'O' && gameState[b] === 'O' && gameState[c] === '') return c;
        if (gameState[a] === 'O' && gameState[c] === 'O' && gameState[b] === '') return b;
        if (gameState[b] === 'O' && gameState[c] === 'O' && gameState[a] === '') return a;
    }
    return -1;
}

function render() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach((cell, index) => {
        cell.textContent = gameState[index];
    });
}

function checkWin() {
    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            alert(`${gameState[a]} wins!`);
            resetGame();
            return true;
        }
    }
    if (!gameState.includes('')) {
        alert("It's a draw!");
        resetGame();
    }
    return false;
}

function resetGame() {
    gameState = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    render();
}

restartButton.addEventListener('click', resetGame);
createBoard();
