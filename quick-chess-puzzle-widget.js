(function () {
  if (document.getElementById("chess-puzzle-container")) return;

  const widgetBox = document.querySelector(".widget-box");
  if (!widgetBox) return;
  widgetBox.innerHTML = "";

  const style = document.createElement("style");
  style.textContent = `
    #chess-puzzle-container {
      font-family: sans-serif;
      width: 320px;
      margin: auto;
      padding: 16px;
      background: #fff;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      text-align: center;
      user-select: none;
    }
    #board {
      display: grid;
      grid-template-columns: repeat(8, 40px);
      grid-template-rows: repeat(8, 40px);
      gap: 2px;
      margin-bottom: 16px;
      background: #f0d9b5;
      border: 2px solid #333;
      border-radius: 8px;
    }
    .square {
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 24px;
      cursor: pointer;
      transition: background-color 0.2s ease;
    }
    .square:hover {
      background-color: rgba(0, 0, 0, 0.1);
    }
    .dark {
      background-color: #b58863;
    }
    .light {
      background-color: #f0d9b5;
    }
    .highlight {
      background-color: #ffeb3b;
    }
    .message {
      font-size: 18px;
      font-weight: bold;
    }
    #reset-btn {
      margin-top: 12px;
      padding: 8px 16px;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 8px;
      cursor: pointer;
    }
  `;
  document.head.appendChild(style);

  const container = document.createElement("div");
  container.id = "chess-puzzle-container";

  const message = document.createElement("div");
  message.className = "message";
  message.textContent = "Your move! Checkmate in one.";

  const board = document.createElement("div");
  board.id = "board";

  const resetBtn = document.createElement("button");
  resetBtn.id = "reset-btn";
  resetBtn.textContent = "Reset Puzzle";

  container.appendChild(message);
  container.appendChild(board);
  container.appendChild(resetBtn);
  widgetBox.appendChild(container);

  const initialBoard = [
    ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
    ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
    ['.', '.', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '.'],
    ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
    ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R'],
  ];

  // Set the pieces on the board
  function drawBoard() {
    board.innerHTML = ''; // clear the board first

    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const square = document.createElement("div");
        square.classList.add("square");
        if ((row + col) % 2 === 0) {
          square.classList.add("light");
        } else {
          square.classList.add("dark");
        }
        
        if (initialBoard[row][col] !== '.') {
          square.textContent = initialBoard[row][col];
        }

        square.dataset.row = row;
        square.dataset.col = col;

        // Add a click event to make a move
        square.addEventListener("click", handleMove);

        board.appendChild(square);
      }
    }
  }

  // Handle the move
  let selectedSquare = null;

  function handleMove(event) {
    const square = event.target;
    const row = parseInt(square.dataset.row);
    const col = parseInt(square.dataset.col);
    const piece = initialBoard[row][col];

    if (selectedSquare) {
      const [startRow, startCol] = selectedSquare;
      const pieceToMove = initialBoard[startRow][startCol];

      if (isValidMove(pieceToMove, startRow, startCol, row, col)) {
        // Make the move
        initialBoard[row][col] = pieceToMove;
        initialBoard[startRow][startCol] = '.';

        // Check if it's a checkmate
        if (isCheckmate()) {
          message.textContent = "Checkmate! Well done! ♟️";
        } else {
          message.textContent = "Your move! Checkmate in one.";
        }

        drawBoard();
      }
      selectedSquare = null;
    } else {
      if (piece !== '.') {
        selectedSquare = [row, col];
        highlightPossibleMoves(piece, row, col);
      }
    }
  }

  function isValidMove(piece, startRow, startCol, endRow, endCol) {
    // Simple checkmate condition (for demo purposes, add more rules as necessary)
    if (piece === 'Q' && Math.abs(startRow - endRow) <= 1 && Math.abs(startCol - endCol) <= 1) {
      return true;
    }
    return false;
  }

  function isCheckmate() {
    // Simple checkmate check for this puzzle (You can extend this with actual checkmate logic)
    return initialBoard[4][4] === 'q'; // Assuming the Queen needs to be taken out for checkmate
  }

  function highlightPossibleMoves(piece, row, col) {
    const squares = document.querySelectorAll(".square");
    squares.forEach(square => {
      square.classList.remove("highlight");
    });

    // For simplicity, highlight squares in a range for Queen piece
    if (piece === 'Q') {
      for (let i = 0; i < 8; i++) {
        document.querySelector(`[data-row='${row}'][data-col='${i}']`).classList.add("highlight");
        document.querySelector(`[data-row='${i}'][data-col='${col}']`).classList.add("highlight");
      }
    }
  }

  // Reset the puzzle
  resetBtn.addEventListener("click", () => {
    initialBoard[4][4] = 'Q'; // Reset the Queen's position for checkmate
    message.textContent = "Your move! Checkmate in one.";
    drawBoard();
  });

  drawBoard();
})();
