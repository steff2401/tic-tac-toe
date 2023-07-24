const gameBoard = (function() {

    let gameBoardArray = [["O", "X", "O"],
                          ["X", "O", "X"],
                          ["O", "X", "X"]];


    const renderGameBoard = () => (function(gameBoardArray) {

        const gameBoardDiv = document.querySelector(".game-board");

        for (let row = 0; row < gameBoardArray.length; row++) {

            for (let col = 0; col < gameBoardArray[row].length; col++) {

                const gameBoardSquare = document.createElement("div");
                gameBoardSquare.classList = "square";
                gameBoardSquare.textContent = gameBoardArray[row][col];
                document.getElementById(row).appendChild(gameBoardSquare);
            }
        }
    })(gameBoardArray);

    return {renderGameBoard};

})();

gameBoard.renderGameBoard();


