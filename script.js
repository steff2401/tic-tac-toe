const gameBoard = (function() {

    let gameBoardArray = [["", "", ""],
                          ["", "", ""],
                          ["", "", ""]];


    const renderGameBoard = () => (function(gameBoardArray) {

        const gameBoardDiv = document.querySelector(".game-board");

        for (let row = 0; row < gameBoardArray.length; row++) {

            for (let col = 0; col < gameBoardArray[row].length; col++) {

                // create HTML element
                const gameBoardSquare = document.createElement("button");
                gameBoardSquare.classList = "square";
                gameBoardSquare.id = row.toString() + col.toString(); 
                gameBoardSquare.textContent = gameBoardArray[row][col];

                // add event listener
                gameBoardSquare.addEventListener("click", () => {

                    // if square already has a symbol, don't do anything
                    if (gameBoardSquare.textContent !== "") {
                        return;
                    }

                    if (playerOne.myTurn) {
                        gameBoardSquare.textContent = playerOne.symbol;
                        playerOne.myTurn = false;
                        playerTwo.myTurn = true;

                        // update array too
                        const row = parseInt(gameBoardSquare.id.charAt(0));
                        const col = parseInt(gameBoardSquare.id.charAt(1));
                        gameBoardArray[row][col] = playerOne.symbol;

                        document.querySelector(".info").textContent = "Player 2's turn"

                    } else if (playerTwo.myTurn) {

                        gameBoardSquare.textContent = playerTwo.symbol;
                        playerTwo.myTurn = false;
                        playerOne.myTurn = true;
                        
                        // update array too
                        const row = parseInt(gameBoardSquare.id.charAt(0));
                        const col = parseInt(gameBoardSquare.id.charAt(1));
                        gameBoardArray[row][col] = playerTwo.symbol;

                        document.querySelector(".info").textContent = "Player 1's turn"
                    }

                    gameController.checkIfGameOver(gameBoardArray);
                });

                // add to HTML
                document.getElementById(row).appendChild(gameBoardSquare);
            }
        }
    })(gameBoardArray);

    return {renderGameBoard};

})();

gameBoard.renderGameBoard(); // test

const Player = (symbol) => {
    let myTurn = false;
    return {symbol, myTurn};
}

const playerOne = Player("X");
const playerTwo = Player("O");

playerOne.myTurn = true;
document.querySelector(".info").textContent = "Player 1's turn"

const gameController = (function() {

    const checkIfGameOver = (board) => {

        // game is over when: 
        // 1. Whole row is same --> check that all gameBoardArray[row][0] == gameBoardArray[row][1] == gameBoardArray[row][2]
        // 2. Whole column is same --> check that gameBoardArray[0][col] == gameBoardArray[1][col] == gameBoardArray[2][col]
        // 3. Whole diagonal is same --> check that gameBoardArray[0][0] == gameBoardArray[1][1] == gameBoardArray[2][2] or that gameBoardArray[0][2] == gameBoardArray[1][1] == gameBoardArray[2][0]
        // 4. All squares are filled and none of the above applies (a tie)
        
        let allSquaresFilled = true;

        for (let row = 0; row < board.length; row++) {

            for (let col = 0; col < board[row].length; col++) {

                if (col == 2 && board[row][col] !== "") { // checking for 1.

                    if (board[row][0] == board[row][1] && board[row][1] == board[row][2]) {
                        console.log("Won, whole row is same");
                    }   
                }

                if (row == 2 && board[row][col] !== "") { // checking for 2.

                    if (board[0][col] == board[1][col] && board[1][col] == board[2][col]) {
                        console.log("Won, whole column is same");
                    }
                }
                
                if (board[row][col] == "") { // set-up for 4.
                    allSquaresFilled = false;
                }
            }
        }

        // checking for 3.
        if ((board[0][0] != "" && board[0][0] == board[1][1] && board[1][1] == board[2][2]) || (board[0][2] != "" && board[0][2] == board[1][1] && board[1][1] == board[2][0])) {
            console.log("Won, diagonal is same"); 
        }

        // checking for 4.
        if (allSquaresFilled) {
            console.log("Tie");
        }
    }

    return {checkIfGameOver}
   
})();

