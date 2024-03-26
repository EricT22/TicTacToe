let boardVals = [[-1,-1,-1], 
                 [-1,-1,-1], 
                 [-1,-1,-1]];

let gameOver = false;
let turn = 0; // 0 for X, 1 for O


for (let tile of document.querySelectorAll(".board-tile")){
    tile.addEventListener("click", handleClick);
}

function handleClick(event){
    if (gameOver){
        resetBoard();
        return;
    }
    let numTilesFull = 0;
    
    for (let i = 0; i < boardVals.length; i++){
        for (let j = 0; j < boardVals[i].length; j++){
            if (boardVals[i][j] != -1){
                numTilesFull++;
            }
        }
    }
    
    if (numTilesFull == 9){
        resetBoard();
        return;
    }

    let curID = event.currentTarget.getAttribute("id");

    let firstInd;
    let secondInd;


    if (curID.includes("top")){
        firstInd = 0;
    } else if (curID.includes("center")) {
        firstInd = 1;
    } else {
        firstInd = 2;
    }

    if (curID.includes("left")){
        secondInd = 0;
    } else if (curID.includes("middle")) {
        secondInd = 1;
    } else {
        secondInd = 2;
    }

    if (boardVals[firstInd][secondInd] == -1) {
        boardVals[firstInd][secondInd] = (turn % 2 == 0) ? 0 : 1;
        document.getElementById(curID).firstElementChild.textContent = (turn % 2 == 0) ? "X" : "O";
        
        checkWin();
        turn++;
    }
}

function resetBoard(){
    boardVals = [[-1,-1,-1], 
                 [-1,-1,-1], 
                 [-1,-1,-1]];

    let tiles = document.querySelectorAll("span");

    tiles.forEach((element) => {
        element.textContent = "";
        element.style.color = "black";
    });

    turn = 0;
    gameOver = false;
}

function checkWin(){
    let curPiece = turn % 2;
    
    for (let i = 0; i < 3; i++){
        if (boardVals[i][0] == curPiece && boardVals[i][1] == curPiece && boardVals[i][2] == curPiece){
            //highlight row

            return;
        }
    }

    for (let i = 0; i < 3; i++){
        if (boardVals[0][i] == curPiece && boardVals[1][i] == curPiece && boardVals[2][i] == curPiece){
            //highlight column

            return;
        }
    }

    if (boardVals[0][0] == curPiece && boardVals[1][1] == curPiece && boardVals[2][2] == curPiece){
        let spans = document.querySelectorAll("#top-left > span, #center-middle > span, #bottom-right > span");
        console.log(spans);

        spans.forEach((element) => {
            element.style.color = "red";
        });

        gameOver = true;
        return;
    }
    
    if (boardVals[0][2] == curPiece && boardVals[1][1] == curPiece && boardVals[2][0] == curPiece){
        //highlight diag

        return;
    }
}