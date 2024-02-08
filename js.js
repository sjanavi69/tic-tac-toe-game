const vsButtons = document.querySelector('.vs-button');
const twoPlayers = document.getElementById('twoPlayers');
const vsComputer = document.getElementById('vsComputer');
const twoPlayersSection = document.querySelector('.board');
const vsComputerSection = document.querySelector('.vs-computer');
const restartButton = document.getElementById('restart')

function twoPlayersGame() {
    twoPlayersSection.style.display = "";
    vsComputerSection.remove();
    vsButtons.style.display = "none";
    restartButton.style.display = "";
}
twoPlayers.addEventListener('click', twoPlayersGame);

function vsComputerGame() {
    vsComputerSection.style.display = "";
    vsButtons.style.display = "none";
    restartButton.style.display = "";
}
vsComputer.addEventListener('click', vsComputerGame);

let currentplayer='X';
let gameactive=true;
let gameboard=['','','','','','','','',''];

function handleclick(index){
    if(gameactive&&gameboard[index]==''){
        gameboard[index]=currentplayer;
        document.getElementById("board").children[index].innerText=currentplayer;
        if(checkwinner()){
            document.getElementById("status").innerHTML=` Player ${currentplayer} Wins!!!`;
            gameactive=false;
        }else if(gameboard.every(cell => cell!='')){
            document.getElementById("status").innerHTML="It's a Tie!";
            gameactive=false;
        }
        else{
            currentplayer=currentplayer==='X'?'O':'X';
            document.getElementById("status").innerHTML=`Current Player:${currentplayer} `;
        }  } 
}
function checkwinner(){
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    return winPatterns.some(pattern => {
        const [a, b, c] = pattern;
        return gameboard[a] !== '' && gameboard[a] === gameboard[b] && gameboard[a] === gameboard[c];
    });
}

let board = [['', '', ''], ['', '', ''], ['', '', '']];
let gameOver = false;
let currentPlayer='X';
function vsComMakeMove(row, col) {
    
    if (!gameOver && board[row][col] === '') {
        board[row][col] = currentPlayer;
        document.querySelector(`.row:nth-child(${row + 1}) .cell:nth-child(${col + 1}`).textContent = currentPlayer;

        if (checkWin()) {
            document.getElementById('vsComputerWinnerText').textContent = `${currentPlayer} wins!`;
            gameOver = true;
        } else if (checkTie()) {
            document.getElementById('vsComputerWinnerText').textContent = "It's a tie!";
            gameOver = true;
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';

            if (!gameOver && currentPlayer === 'O') {
                setTimeout(makeComputerMove, 500); 
            }
        }
    }
}
function makeComputerMove() {
    if (!gameOver) {
        let row, col;
        do {
            row = Math.floor(Math.random() * 3);
            col = Math.floor(Math.random() * 3);
        } while (board[row][col] !== '');
        
        vsComMakeMove(row, col);
    }
}
function checkWin() {
    for (let i = 0; i < 3; i++) {
        if (
            (board[i][0] === currentPlayer && board[i][1] === currentPlayer && board[i][2] === currentPlayer) ||
            (board[0][i] === currentPlayer && board[1][i] === currentPlayer && board[2][i] === currentPlayer)
        ) {
            return true;
        }
    }
    
    if (
        (board[0][0] === currentPlayer && board[1][1] === currentPlayer && board[2][2] === currentPlayer) ||
        (board[0][2] === currentPlayer && board[1][1] === currentPlayer && board[2][0] === currentPlayer)
    ) {
        return true;
    }
    
    return false;
}

function checkTie() {
    for (let row of board) {
        if (row.includes('')) {
            return false;
        }
    }
    return true;
}

function reset(){
    location.reload();
}
restartButton.addEventListener('click', reset);
