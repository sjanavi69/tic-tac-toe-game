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
function reset(){
    gameactive=true;
    currentplayer='X';
     gameboard=['','','','','','','','',''];
    document.getElementById("status").innerHTML='current player:X';
    Array.from(document.getElementById("board").children).forEach(cell => {
        cell.innerText='';
    });
}