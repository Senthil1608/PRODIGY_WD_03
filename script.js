let currentPlayer = 'X';
let gameStatus = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function checkWinner() {
    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (gameStatus[a] && gameStatus[a] === gameStatus[b] && gameStatus[a] === gameStatus[c]) {
            gameActive = false;
            markWinningCells(winningConditions[i], gameStatus[a]);
            return gameStatus[a];
        }
    }
    return null;
}

function markWinningCells(cells, symbol) {
    cells.forEach(cellIndex => {
        let cell = document.getElementsByClassName('cell')[cellIndex];
        cell.classList.add(`winning-cell-${symbol}`);
        cell.style.pointerEvents = "none";
    });
    document.getElementById('play-again').classList.add('glow');
}

function makeMove(cellIndex) {
    if (!gameActive || gameStatus[cellIndex] !== "") return;

    gameStatus[cellIndex] = currentPlayer;
    document.getElementsByClassName('cell')[cellIndex].innerText = currentPlayer;

    const winner = checkWinner();
    if (winner) {
        document.getElementById('status').innerText = `${winner} wins!`;
        gameActive = false;
        document.getElementById('play-again').disabled = false;
        return;
    }

    if (!gameStatus.includes("")) {
        document.getElementById('status').innerText = "It's a draw!";
        gameActive = false;
        document.getElementById('play-again').disabled = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    document.getElementById('status').innerText = `Player ${currentPlayer}'s turn`;
}

function resetGame() {
    gameActive = true;
    currentPlayer = 'X';
    gameStatus = ["", "", "", "", "", "", "", "", ""];
    document.getElementById('status').innerText = "";
    let cells = document.getElementsByClassName('cell');
    for (let i = 0; i < cells.length; i++) {
        cells[i].innerText = "";
        cells[i].classList.remove('winning-cell-X', 'winning-cell-O');
        cells[i].style.pointerEvents = "auto";
    }
    document.getElementById('play-again').disabled = true;
    document.getElementById('play-again').classList.remove('glow');
}