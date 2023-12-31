const gameBoard = (function () {

    let gameBoardArray = [["", "", ""],
                          ["", "", ""],
                          ["", "", ""]];

    const info = document.querySelector(".info");

    const resetBoard = () => {

        gameBoardArray = [["", "", ""],
                          ["", "", ""],
                          ["", "", ""]];


        document.querySelectorAll(".square").forEach((square) => {
            square.textContent = "";
        });

        info.textContent = "Player 1's turn"
    }

    const placeMarker = (square, currentPlayer, otherPlayer) => {

        square.textContent = currentPlayer.symbol;
        info.textContent = `Player ${otherPlayer.number}'s turn`;

        // place marker in array too
        gameController.placeMarkerInArray(gameBoardArray, square, currentPlayer, otherPlayer);
    }

    const addSquareListener = (square) => {

        // if square already has a marker, or game is over; don't do anything
        if (square.textContent !== "" || gameController.isGameOver()) {
            return;
        }

        // run placeMarker with the currentPlayer as playerOne if playerOne.myTurn is true, else with currentPlayer as playerTwo
        playerOne.myTurn ? placeMarker(square, playerOne, playerTwo) : placeMarker(square, playerTwo, playerOne);

        // after every move, check if the game has a winner
        gameController.checkIfWinnerFound(gameBoardArray);
    };

    const renderGameBoard = () => {

        for (let row = 0; row < gameBoardArray.length; row++) {

            for (let col = 0; col < gameBoardArray[row].length; col++) {

                // create HTML element
                const gameBoardSquare = document.createElement("button");
                gameBoardSquare.classList = "square";
                gameBoardSquare.id = row.toString() + col.toString();
                gameBoardSquare.textContent = gameBoardArray[row][col];

                // add event listener
                gameBoardSquare.addEventListener("click", () => addSquareListener(gameBoardSquare));

                // add to HTML
                document.getElementById(row).appendChild(gameBoardSquare);
            }
        }
    };

    return { renderGameBoard, resetBoard };

})();

gameBoard.renderGameBoard(); // initialize board

const Player = (number, symbol) => {
    let myTurn = false;
    return { number, symbol, myTurn };
}

const playerOne = Player(1, "X");
const playerTwo = Player(2, "O");

const gameController = (function () {

    playerOne.myTurn = true;
    const info = document.querySelector(".info");
    info.textContent = "Player 1's turn";

    let gameOver = false;

    const placeMarkerInArray = (boardArray, square, currentPlayer, otherPlayer) => {

        currentPlayer.myTurn = false;
        otherPlayer.myTurn = true;

        const row = parseInt(square.id.charAt(0));
        const col = parseInt(square.id.charAt(1));
        boardArray[row][col] = currentPlayer.symbol;
    }


    const checkRows = (board, row, col) => {

        if (col == 2 && board[row][col] !== "") {

            if (board[row][0] == board[row][1] && board[row][1] == board[row][2]) {

                displayWinner(board[row][0]);
                endGame();
            }
        }
    }

    const checkColumns = (board, row, col) => {

        if (row == 2 && board[row][col] !== "") {

            if (board[0][col] == board[1][col] && board[1][col] == board[2][col]) {

                displayWinner(board[0][col]);
                endGame();
            }
        }
    }

    const checkDiagonals = (board) => {

        if ((board[0][0] != "" && board[0][0] == board[1][1] && board[1][1] == board[2][2])) {

            displayWinner(board[0][0]);
            endGame();
            return;
        }

        if ((board[0][2] != "" && board[0][2] == board[1][1] && board[1][1] == board[2][0])) {

            displayWinner(board[0][2]);
            endGame();
            return;
        }
    }

    const checkTie = (board) => {

        // if a player has already won, don't do anything
        if (info.textContent.includes("won")) {
            return;
        }

        for (let row = 0; row < board.length; row++) {
            for (let col = 0; col < board[row].length; col++) {

                if (board[row][col] == "") {
                    return;
                }
            }
        }

        displayWinner("tie");
        endGame();
    }

    const checkIfWinnerFound = (board) => {

        // Winner is found when: 
        // 1. Whole row is same symbol
        // 2. Whole column is same symbol
        // 3. Whole diagonal is same symbol
        // 4. All squares are filled and none of the above applies (a tie)

        for (let row = 0; row < board.length; row++) {
            for (let col = 0; col < board[row].length; col++) {

                checkRows(board, row, col);
                checkColumns(board, row, col);

                // stop searching if winner has been found
                if (isGameOver()) {
                    return;
                }
            }
        }

        checkDiagonals(board);
        checkTie(board);
    }

    const isGameOver = () => gameOver;

    const displayWinner = (symbol) => {

        if (symbol === "X") {

            info.textContent = "Player 1 (X) won!"

        } else if (symbol === "O") {

            info.textContent = "Player 2 (O) won!";

        } else if (symbol == "tie") {

            info.textContent = "It's a tie!"
        }
    }

    const endGame = () => {
        gameOver = true;
    }

    const resetGame = () => {

        gameBoard.resetBoard();
        playerOne.myTurn = true;
        playerTwo.myTurn = false;
        gameOver = false;
    }

    const button = document.querySelector("#new-game-button");
    button.addEventListener("click", resetGame);

    return { placeMarkerInArray, checkIfWinnerFound, isGameOver }

})();

