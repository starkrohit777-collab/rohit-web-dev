const board = document.getElementById("board");
const statusText = document.getElementById("status");
const restartBtn = document.getElementById("restartBtn");

let currentPlayer = "X";
let gameActive = true;
let cells = ["", "", "", "", "", "", "", "", ""];

const winPatterns = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

function createBoard(){
    board.innerHTML = "";
    cells.forEach((cell, index)=>{
        const cellDiv = document.createElement("div");
        cellDiv.classList.add("cell");
        cellDiv.setAttribute("data-index", index);
        cellDiv.addEventListener("click", handleClick);
        board.appendChild(cellDiv);
    });
}

function handleClick(e){
    const index = e.target.getAttribute("data-index");

    if(cells[index] !== "" || !gameActive) return;

    cells[index] = currentPlayer;
    e.target.textContent = currentPlayer;

    checkWinner();
}

function checkWinner(){
    let roundWon = false;

    for(let pattern of winPatterns){
        const [a,b,c] = pattern;

        if(cells[a] && cells[a] === cells[b] && cells[a] === cells[c]){
            roundWon = true;
            highlightWinner(pattern);
            break;
        }
    }

    if(roundWon){
        statusText.textContent = `Player ${currentPlayer} Wins! 🎉`;
        gameActive = false;
        return;
    }

    if(!cells.includes("")){
        statusText.textContent = "It's a Draw! 🤝";
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `Player ${currentPlayer}'s Turn`;
}

function highlightWinner(pattern){
    pattern.forEach(index=>{
        board.children[index].classList.add("winner");
    });
}

function restartGame(){
    currentPlayer = "X";
    gameActive = true;
    cells = ["", "", "", "", "", "", "", "", ""];
    statusText.textContent = "Player X's Turn";
    createBoard();
}

restartBtn.addEventListener("click", restartGame);

createBoard();