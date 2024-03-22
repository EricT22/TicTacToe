let boardVals = [[-1,-1,-1], 
                 [-1,-1,-1], 
                 [-1,-1,-1]];

let turn = 0; // 0 for X, 1 for O

for (let tile of document.querySelectorAll(".board-tile")){
    tile.addEventListener("click", handleClick);
}

function handleClick(event){
    let curID = event.currentTarget.getAttribute("id");
    console.log(`Clicked ${curID}`);

    let firstInd;
    let secondInd;
    let numTilesFull = 0;

    //maybe use a map
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

    boardVals[firstInd][secondInd] = (turn % 2 == 0) ? 0 : 1;
    document.getElementById(curID).firstElementChild.textContent = (turn % 2 == 0) ? "X" : "O";
    turn++;
}

function resetBoard(){
    
}