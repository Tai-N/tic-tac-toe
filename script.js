const Player = (name, symbol) => {
  return { name, symbol };
};

const gameBoard = (() => {
  const boardState = ["", "", "", "", "", "", "", "", ""];
  const player1 = null;
  const player2 = null;

  const winningPositionCombos = [
    // 8 possible combos
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  return { boardState, player1, player2, winningPositionCombos };
})();

// control the gameFlow
const gameFlow = (() => {
  // at default, player 1 always has first turn
  let isPlayerOneTurn = true;

  const startTurn = (event) => {
    const { player1, player2 } = gameBoard;
    let squarePosition = event.target.getAttribute("value");

    //p1 goes first, can mark boardState
    if (isPlayerOneTurn) {
      // get position of square clicked, then update boardState for p1
      if (gameBoard.boardState[squarePosition] != "") {
        return;
      }
      gameBoard.boardState[squarePosition] = player1.symbol;
      isPlayerOneTurn = false;
    } else {
      if (gameBoard.boardState[squarePosition] != "") {
        return;
      }
      gameBoard.boardState[squarePosition] = player2.symbol;
      isPlayerOneTurn = true;
    }

    display.render();
    checkForWinner();
  };

  const checkForWinner = () => {
    // check if our boardState have winning positions pattern, in which a set of 3 squares have the same player symbol

    // go thru each pos in for each set of combos
    // check our game board to see if each pos has the same symbol
    // determine winner, display message, and reset game
    gameBoard.winningPositionCombos.forEach((combo) => {
      let matchingSymbolCnt = 0;
      for (let i = 0; i < combo.length; i++) {
        let squarePosition = combo[i];
        let firstSymbol = gameBoard.boardState[combo[0]];
        if (gameBoard.boardState[squarePosition] === "") {
          continue;
        } else if (firstSymbol === gameBoard.boardState[squarePosition]) {
          matchingSymbolCnt++;
          if (matchingSymbolCnt === 3) {
            const { player1, player2 } = gameBoard;
            let winnerName =
              firstSymbol === player1.symbol ? player1.name : player2.name;
            display.gameMssg.innerHTML = `The Winner is ${winnerName}!`;
          }
        }
      }
    });
  };

  const resetGame = () => {
    gameBoard.boardState = ["", "", "", "", "", "", "", "", ""];
    gameBoard.player1 = null;
    gameBoard.player2 = null;
    display.gameMssg.innerHTML = "";
    display.render();
  };

  return { startTurn, resetGame };
})();

// render the contents of the boardState array to the webpage, mssgs
const display = (() => {
  const board = document.querySelectorAll(".square");
  const gameMssg = document.querySelector(".game-mssg");

  const render = () => {
    for (let i = 0; i < 9; i++) {
      board[i].innerHTML = gameBoard.boardState[i];
    }
  };

  return { render, gameMssg };
})();

// handle user inputs, board clicks, resets
const eventHandler = (() => {
  const startBtn = document.querySelector(".btn-start");
  const playerOneInput = document.querySelector(".input-p1");
  const playerTwoInput = document.querySelector(".input-p2");
  const board = document.querySelector(".board");
  const resetBtn = document.querySelector(".btn-reset");

  startBtn.addEventListener("click", () => {
    if (playerOneInput.value === "") {
      display.gameMssg.innerHTML = "Enter the player names first!";
    }
    gameBoard.player1 = Player(playerOneInput.value, "X");
    gameBoard.player2 = Player(playerTwoInput.value, "O");
  });

  // if it's a player's turn, get user clicked position from DOM and update boardstate
  board.addEventListener("click", (event) => {
    gameFlow.startTurn(event);
  });

  resetBtn.addEventListener("click", () => {
    playerOneInput.value = "";
    playerTwoInput.value = "";
    gameFlow.resetGame();
  });
})();
