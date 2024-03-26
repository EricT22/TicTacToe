const rowIdToIndex = new Map();
rowIdToIndex["top"] = 0;
rowIdToIndex["center"] = 1;
rowIdToIndex["bottom"] = 2;

const colIdToIndex = new Map();
colIdToIndex["left"] = 0;
colIdToIndex["middle"] = 1;
colIdToIndex["right"] = 2;

let boardVals = [[-1,-1,-1], 
                 [-1,-1,-1], 
                 [-1,-1,-1]];

let gameOverByWin = false;
let numTilesFull = 0;
let turn = 0; // 0 for X, 1 for O


for (let tile of document.querySelectorAll(".board-tile")){
    tile.addEventListener("click", handleClick);
}

function handleClick(event){
    if (gameOverByWin || numTilesFull == 9){
        resetBoard();
        return;
    }

    let curID = event.currentTarget.getAttribute("id");

    let firstInd;
    let secondInd;

    // use maps here
    //let firstInd = rowIdToIndex[curID.slice(0, curID.indexOf('-'))];
    //let secondInd = colIdToIndex[curID.slice(curID.indexOf('-') + 1)];
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
        numTilesFull++;
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
    gameOverByWin = false;
    numTilesFull = 0;
}

function checkWin(){
    let curPiece = turn % 2;
    
    for (let i = 0; i < 3; i++){
        if (boardVals[i][0] == curPiece && boardVals[i][1] == curPiece && boardVals[i][2] == curPiece){
            let spans = document.querySelectorAll(`#${getKeyFromVal(rowIdToIndex, i)} > div > span`);

            spans.forEach((element) => {
                element.style.color = "red";
            });

            gameOverByWin = true;
            return;
        }
    }

    for (let i = 0; i < 3; i++){
        if (boardVals[0][i] == curPiece && boardVals[1][i] == curPiece && boardVals[2][i] == curPiece){
            let curCol = getKeyFromVal(colIdToIndex, i);
            let spans = document.querySelectorAll(`#top-${curCol} > span, #center-${curCol} > span, #bottom-${curCol} > span`);

            spans.forEach((element) => {
                element.style.color = "red";
            });

            gameOverByWin = true;
            return;
        }
    }

    if (boardVals[0][0] == curPiece && boardVals[1][1] == curPiece && boardVals[2][2] == curPiece){
        let spans = document.querySelectorAll("#top-left > span, #center-middle > span, #bottom-right > span");

        spans.forEach((element) => {
            element.style.color = "red";
        });

        gameOverByWin = true;
        return;
    }
    
    if (boardVals[0][2] == curPiece && boardVals[1][1] == curPiece && boardVals[2][0] == curPiece){
        let spans = document.querySelectorAll("#top-right > span, #center-middle > span, #bottom-left > span");

        spans.forEach((element) => {
            element.style.color = "red";
        });

        gameOverByWin = true;
        return;
    }
}

function getKeyFromVal(obj, value){
    return Object.keys(obj).find(key => obj[key] === value);
}