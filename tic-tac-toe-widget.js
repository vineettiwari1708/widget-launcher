// // tic-tac-toe-widget.js (ES module format)
// (function () {
//   // Prevent adding multiple times
//   if (document.getElementById("tic-tac-toe-container")) return;

//   const style = document.createElement("style");
//   style.textContent = `
//     #tic-tac-toe-container {
//       font-family: sans-serif;
//       display: flex;
//       flex-direction: column;
//       align-items: center;
//       padding: 16px;
//       background: #f8f8f8;
//       border-radius: 12px;
//       width: 100%;
//       max-width: 300px;
//       margin: 10px;
//     }
//     .board {
//       display: grid;
//       grid-template-columns: repeat(3, 80px);
//       grid-gap: 8px;
//       margin-bottom: 12px;
//     }
//     .cell {
//       width: 80px;
//       height: 80px;
//       background: white;
//       border: 2px solid #007bff;
//       display: flex;
//       align-items: center;
//       justify-content: center;
//       font-size: 32px;
//       font-weight: bold;
//       cursor: pointer;
//       transition: background 0.2s;
//     }
//     .cell:hover {
//       background: #e7f1ff;
//     }
//     .message {
//       font-size: 16px;
//       margin-bottom: 8px;
//     }
//     .reset-btn {
//       padding: 6px 12px;
//       background: #007bff;
//       color: white;
//       border: none;
//       border-radius: 6px;
//       cursor: pointer;
//     }
//   `;
//   document.head.appendChild(style);

//   const container = document.createElement("div");
//   container.id = "tic-tac-toe-container";

//   const message = document.createElement("div");
//   message.className = "message";
//   message.textContent = "Player X's turn";

//   const board = document.createElement("div");
//   board.className = "board";

//   let currentPlayer = "X";
//   let gameOver = false;

//   const cells = Array(9).fill(null).map((_, i) => {
//     const cell = document.createElement("div");
//     cell.className = "cell";
//     cell.addEventListener("click", () => {
//       if (cell.textContent || gameOver) return;
//       cell.textContent = currentPlayer;
//       if (checkWin()) {
//         message.textContent = `Player ${currentPlayer} wins!`;
//         gameOver = true;
//       } else if ([...board.children].every(c => c.textContent)) {
//         message.textContent = "It's a draw!";
//         gameOver = true;
//       } else {
//         currentPlayer = currentPlayer === "X" ? "O" : "X";
//         message.textContent = `Player ${currentPlayer}'s turn`;
//       }
//     });
//     board.appendChild(cell);
//     return cell;
//   });

//   function checkWin() {
//     const winPatterns = [
//       [0,1,2], [3,4,5], [6,7,8],
//       [0,3,6], [1,4,7], [2,5,8],
//       [0,4,8], [2,4,6]
//     ];
//     return winPatterns.some(([a, b, c]) =>
//       cells[a].textContent &&
//       cells[a].textContent === cells[b].textContent &&
//       cells[a].textContent === cells[c].textContent
//     );
//   }

//   const resetBtn = document.createElement("button");
//   resetBtn.className = "reset-btn";
//   resetBtn.textContent = "Reset Game";
//   resetBtn.addEventListener("click", () => {
//     cells.forEach(cell => (cell.textContent = ""));
//     currentPlayer = "X";
//     gameOver = false;
//     message.textContent = "Player X's turn";
//   });

//   container.appendChild(message);
//   container.appendChild(board);
//   container.appendChild(resetBtn);

//   // Append to widget panel
//   const widgetBox = document.querySelector(".widget-box");
//   if (widgetBox) {
//     widgetBox.appendChild(container);
//   } else {
//     document.body.appendChild(container);
//   }
// })();


(function () {
  if (document.getElementById("tic-tac-toe-container")) return;

  const widgetBox = document.querySelector(".widget-box");
  if (!widgetBox) return;

  // Clear existing content
  widgetBox.innerHTML = "";

  const style = document.createElement("style");
  style.textContent = `
    #tic-tac-toe-container {
      font-family: sans-serif;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 16px;
      background: #f8f8f8;
      border-radius: 12px;
      width: 100%;
      max-width: 300px;
      margin: 10px auto;
    }
    .board {
      display: grid;
      grid-template-columns: repeat(3, 80px);
      grid-gap: 8px;
      margin-bottom: 12px;
    }
    .cell {
      width: 80px;
      height: 80px;
      background: white;
      border: 2px solid #007bff;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 32px;
      font-weight: bold;
      cursor: pointer;
      transition: background 0.2s;
    }
    .cell:hover {
      background: #e7f1ff;
    }
    .message {
      font-size: 16px;
      margin-bottom: 8px;
    }
    .reset-btn, .close-btn {
      padding: 6px 12px;
      margin-top: 10px;
      background: #007bff;
      color: white;
      border: none;
      border-radius: 6px;
      cursor: pointer;
    }
    .close-btn {
      background: #dc3545;
      margin-left: 10px;
    }
    .button-row {
      display: flex;
      justify-content: center;
    }
  `;
  document.head.appendChild(style);

  const container = document.createElement("div");
  container.id = "tic-tac-toe-container";

  const message = document.createElement("div");
  message.className = "message";
  message.textContent = "Player X's turn";

  const board = document.createElement("div");
  board.className = "board";

  let currentPlayer = "X";
  let gameOver = false;

  const cells = Array(9).fill(null).map(() => {
    const cell = document.createElement("div");
    cell.className = "cell";
    cell.addEventListener("click", () => {
      if (cell.textContent || gameOver) return;
      cell.textContent = currentPlayer;
      if (checkWin()) {
        message.textContent = `Player ${currentPlayer} wins!`;
        gameOver = true;
      } else if ([...board.children].every(c => c.textContent)) {
        message.textContent = "It's a draw!";
        gameOver = true;
      } else {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        message.textContent = `Player ${currentPlayer}'s turn`;
      }
    });
    board.appendChild(cell);
    return cell;
  });

  function checkWin() {
    const winPatterns = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];
    return winPatterns.some(([a, b, c]) =>
      cells[a].textContent &&
      cells[a].textContent === cells[b].textContent &&
      cells[a].textContent === cells[c].textContent
    );
  }

  const resetBtn = document.createElement("button");
  resetBtn.className = "reset-btn";
  resetBtn.textContent = "Reset Game";
  resetBtn.addEventListener("click", () => {
    cells.forEach(cell => (cell.textContent = ""));
    currentPlayer = "X";
    gameOver = false;
    message.textContent = "Player X's turn";
  });

  const closeBtn = document.createElement("button");
  closeBtn.className = "close-btn";
  closeBtn.textContent = "Close";
  closeBtn.addEventListener("click", () => {
    // Re-render original buttons (assuming launcher has renderButtons exposed globally)
    if (typeof window.renderLauncherButtons === "function") {
      widgetBox.innerHTML = "";
      window.renderLauncherButtons();
    }
  });

  const buttonRow = document.createElement("div");
  buttonRow.className = "button-row";
  buttonRow.appendChild(resetBtn);
  buttonRow.appendChild(closeBtn);

  container.appendChild(message);
  container.appendChild(board);
  container.appendChild(buttonRow);
  widgetBox.appendChild(container);
})();

