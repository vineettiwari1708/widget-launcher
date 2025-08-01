(function () {
  if (document.getElementById("minesweeper-container")) return;

  const style = document.createElement("style");
  style.textContent = `
    #minesweeper-container {
      font-family: sans-serif;
      max-width: 360px;
      width: 100%;
      background: #f8f9fa;
      padding: 10px;
      border-radius: 12px;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .minesweeper-board {
      display: grid;
      gap: 2px;
      margin-bottom: 10px;
    }
    .cell {
      width: 28px;
      height: 28px;
      background: #e0e0e0;
      border: none;
      font-size: 14px;
      font-weight: bold;
      text-align: center;
      line-height: 28px;
      cursor: pointer;
      border-radius: 4px;
      padding: 0;
    }
    .cell.revealed {
      background: #ccc;
      cursor: default;
    }
    .cell.mine {
      background: #dc3545;
      color: #fff;
    }
    .cell.flag {
      background: #ffc107;
      color: #212529;
    }
    .btn-row {
      display: flex;
      gap: 8px;
    }
    .btn-mini {
      padding: 6px 12px;
      background: #007bff;
      color: white;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      font-size: 14px;
    }
    .btn-mini.danger {
      background: #dc3545;
    }
  `;
  document.head.appendChild(style);

  const container = document.createElement("div");
  container.id = "minesweeper-container";

  const boardEl = document.createElement("div");
  boardEl.className = "minesweeper-board";

  const rows = 8;
  const cols = 8;
  const mineCount = 10;
  let board = [];
  let revealed = [];

  function initBoard() {
    board = Array.from({ length: rows }, () => Array(cols).fill(0));
    revealed = Array.from({ length: rows }, () => Array(cols).fill(false));

    // Place mines
    let minesPlaced = 0;
    while (minesPlaced < mineCount) {
      const r = Math.floor(Math.random() * rows);
      const c = Math.floor(Math.random() * cols);
      if (board[r][c] !== "M") {
        board[r][c] = "M";
        minesPlaced++;
        for (let i = r - 1; i <= r + 1; i++) {
          for (let j = c - 1; j <= c + 1; j++) {
            if (
              i >= 0 &&
              i < rows &&
              j >= 0 &&
              j < cols &&
              board[i][j] !== "M"
            ) {
              board[i][j]++;
            }
          }
        }
      }
    }
  }

  function revealCell(r, c) {
    if (r < 0 || r >= rows || c < 0 || c >= cols) return;
    if (revealed[r][c]) return;

    revealed[r][c] = true;
    const cell = boardEl.querySelector(`[data-row="${r}"][data-col="${c}"]`);
    cell.classList.add("revealed");

    const val = board[r][c];
    if (val === "M") {
      cell.classList.add("mine");
      cell.textContent = "💣";
      revealAllMines();
      setTimeout(() => alert("Game Over!"), 100);
      return;
    } else if (val > 0) {
      cell.textContent = val;
    } else {
      cell.textContent = "";
      for (let i = r - 1; i <= r + 1; i++) {
        for (let j = c - 1; j <= c + 1; j++) {
          revealCell(i, j);
        }
      }
    }
  }

  function revealAllMines() {
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (board[r][c] === "M") {
          const cell = boardEl.querySelector(`[data-row="${r}"][data-col="${c}"]`);
          cell.classList.add("mine", "revealed");
          cell.textContent = "💣";
        }
      }
    }
  }

  function drawBoard() {
    boardEl.innerHTML = "";
    boardEl.style.gridTemplateColumns = `repeat(${cols}, 28px)`;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const cellBtn = document.createElement("button");
        cellBtn.className = "cell";
        cellBtn.dataset.row = r;
        cellBtn.dataset.col = c;
        cellBtn.onclick = () => revealCell(r, c);
        cellBtn.oncontextmenu = (e) => {
          e.preventDefault();
          if (!cellBtn.classList.contains("revealed")) {
            cellBtn.classList.toggle("flag");
            cellBtn.textContent = cellBtn.classList.contains("flag") ? "🚩" : "";
          }
        };
        boardEl.appendChild(cellBtn);
      }
    }
  }

  function resetGame() {
    initBoard();
    drawBoard();
  }

  const btnRow = document.createElement("div");
  btnRow.className = "btn-row";

  const resetBtn = document.createElement("button");
  resetBtn.className = "btn-mini";
  resetBtn.textContent = "Reset";
  resetBtn.onclick = resetGame;

  const closeBtn = document.createElement("button");
  closeBtn.className = "btn-mini danger";
  closeBtn.textContent = "Close";
  closeBtn.onclick = () => {
    const widgetBox = document.querySelector(".widget-box");
    if (widgetBox) {
      widgetBox.innerHTML = "";
      if (window.renderLauncherButtons) {
        window.renderLauncherButtons();
      }
    }
  };

  btnRow.appendChild(resetBtn);
  btnRow.appendChild(closeBtn);

  container.appendChild(boardEl);
  container.appendChild(btnRow);

  const widgetBox = document.querySelector(".widget-box");
  if (widgetBox) {
    widgetBox.innerHTML = "";
    widgetBox.appendChild(container);
  }

  resetGame();
})();
