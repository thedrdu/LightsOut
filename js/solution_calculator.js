//0 = off, 1 = on

let solutions = {};

//Converts a given board(jagged array) to an integer, where each light is encoded as a bit.
function boardToInt(board){
    let num = 0;
    for(let i = 0; i < 3; i++){
        for(let j = 0; j < 3; j++){
            num = num << 1;
            if(board[i][j]){
                num = num | 1;
            }
        }
    }
    return num;
}

//Converts a given integer to a board(jagged array), where each bit is decoded as a light.
function intToBoard(num){
    let newBoard = [
        [false, false, false],
        [false, false, false],
        [false, false, false]
    ];
    for(let i = 2; i >= 0; i--){
        for(let j = 2; j >= 0; j--){
            newBoard[i][j] = num % 2 === 1;
            num = Math.floor(num / 2);
        }
    }
    return newBoard;
}

//Prints out a given board(jagged array)
function printBoard(board){
    let row = ""
    for(let i = 0; i < board.length; i++) {
        row = "";
        for(let j = 0; j < board[i].length; j++){
            if(board[i][j]){
                row += "1";
            }
            else{
                row += "0";
            }
        }
        console.log(row);
    }
    console.log();
}

//takes in int, converts to binary, returns new board in corresponding state
function getState(state){
    const binary = state.toString(2).padStart(9, '0'); //has to be 9 bits long, pad if needed
    const board = [
        [false, false, false],
        [false, false, false],
        [false, false, false]
    ];
    for(let i = 0; i < 9; i++){
        const row = Math.floor(i / 3);
        const col = i % 3;
        board[row][col] = binary[i] === '1';
    }
    return board;
}

//Checks if a board is solved(all lights are on)
function checkSolved(board){
    for(let i = 0; i < board.length; i++) {
        for(let j = 0; j < board[i].length; j++){
            if(!board[i][j]){return false;}
        }
    }
    return true;
}

//Toggles a light and its neighbors(if existing)
function toggleLight(board, x, y) {
    board[x][y] = !board[x][y];
  
    //left, right, top, bottom
    if(y > 0){board[x][y - 1] = !board[x][y - 1];}
    if(y < board[x].length - 1){board[x][y + 1] = !board[x][y + 1];}
    if(x > 0){board[x - 1][y] = !board[x - 1][y];}
    if(x < board.length - 1){board[x + 1][y] = !board[x + 1][y];}
}

//Note: no need to press any light more than once
function solveBoard(original_board) {
    for(let i = 0; i < 512; i++){
        let board = JSON.parse(JSON.stringify(original_board));
        let clicks_to_make = [...intToBoard(i)];
        for(let j = 0; j < 3; j++){
            for(let k = 0; k < 3; k++){
                if(clicks_to_make[j][k]){
                    toggleLight(board, j, k);
                }
            }
        }
        if(checkSolved(board)){
            return boardToInt(clicks_to_make);
        }
    }
    return -1; //this should never run
}

//main script
for(let state = 0; state < 512; state++){
    console.log(state);
    board = getState(state);
    const solution = solveBoard(board);
    if(solution !== null){
        solutions[state] = solution;
    }
}

console.log(solutions);