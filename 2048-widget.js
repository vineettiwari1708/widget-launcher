(function () {
  if (document.getElementById("game-2048-container")) return;

  const style = document.createElement("style");
  style.textContent = `
    #game-2048-container {
      font-family: sans-serif;
      width: 100%;
      max-width: 360px;
      padding: 12px;
      background: #faf8ef;
      border-radius: 12px;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .board-2048 {
      display: grid;
      grid-template-columns: repeat(4, 70px);
      grid-template-rows: repeat(4, 70px);
      gap: 6px;
      background: #bbada0;
      padding: 6px;
      border-radius: 6px;
    }
    .tile {
      width: 70px;
      height: 70px;
      background: #cdc1b4;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 24px;
      font-weight: bold;
      color: #776e65;
      border-radius: 4px;
      transition: all 0.2s ease;
    }
    .tile-2    { background: #eee4da; }
    .tile-4    { background: #ede0c8; }
    .tile-8    { background: #f2b179; color: #f9f6f2; }
    .tile-16   { background: #f59563; color: #f9f6f2; }
    .tile-32   { background: #f67c5f; color: #f9f6f2; }
    .tile-64   { background: #f65e3b; color: #f9f6f2; }
    .tile-128  { background: #edcf72; color: #f9f6f2; font-size: 20px; }
    .tile-256  { background: #edcc61; color: #f9f6f2; font-size: 20px; }
    .tile-512  { background: #edc850; color: #f9f6f2; font-size: 20px; }
    .tile-1024 { background: #edc53f; color: #f9f6f2; font-size: 18px; }
    .tile-2048 { background: #edc22e; color: #f9f6f2; font-size: 18px; }

    .btn-row {
      display: flex;
      gap: 10px;
      margin-top: 10px;
    }
    .btn-2048 {
      padding: 6px 12px;
      font-size: 14px;
      background: #8f7a66;
      color: white;
      border: none;
      border-radius: 6px;
      cursor: pointer;
    }
    .btn-2048.danger {
      background: #dc3545;
    }
  `;
  document.head.appendChild(style);

  const container = document.createElement("div");
  container.id = "game-2048-container";

  const boardEl = document.createElement("div");
  boardEl.className = "board-2048";

  const size = 4;
  let board = [];

  function createEmptyBoard() {
    board = Array(size).fill().map(() => Array(size).fill(0));
  }

  function drawBoard() {
    boardEl.innerHTML = "";
    board.flat().forEach(value => {
      const tile = document.createElement("div");
      tile.className = "tile";
      if (value) {
        tile.classList.add("tile-" + value);
        tile.textContent = value;
      }
      boardEl.appendChild(tile);
    });
  }

  function getEmptyCells() {
    const empty = [];
    board.forEach((row, i) => {
      row.forEach((val, j) => {
        if (!val) empty.push([i, j]);
      });
    });
    return empty;
  }

  function addRandomTile() {
    const empty = getEmptyCells();
    if (empty.length === 0) return;
    const [i, j] = empty[Math.floor(Math.random() * empty.length)];
    board[i][j] = Math.random() < 0.9 ? 2 : 4;
  }

  function compress(row) {
    const newRow = row.filter(val => val);
    while (newRow.length < size) newRow.push(0);
    return newRow;
  }

  function merge(row) {
    for (let i = 0; i < size - 1; i++) {
      if (row[i] && row[i] === row[i + 1]) {
        row[i] *= 2;
        row[i + 1] = 0;
      }
    }
    return row;
  }

  function moveLeft() {
    let moved = false;
    board = board.map(row => {
      const compressed = compress(row);
      const merged = merge(compressed);
      const newRow = compress(merged);
      if (newRow.toString() !== row.toString()) moved = true;
      return newRow;
    });
    return moved;
  }

  function rotateClockwise(b) {
    return b[0].map((_, i) => b.map(row => row[i]).reverse());
  }

  function move(dir) {
    let moved = false;
    if (dir === "left") moved = moveLeft();
    if (dir === "right") {
      board = board.map(row => row.reverse());
      moved = moveLeft();
      board = board.map(row => row.reverse());
    }
    if (dir === "up") {
      board = rotateClockwise(rotateClockwise(rotateClockwise(board)));
      moved = moveLeft();
      board = rotateClockwise(board);
    }
    if (dir === "down") {
      board = rotateClockwise(board);
      moved = moveLeft();
      board = rotateClockwise(rotateClockwise(rotateClockwise(board)));
    }
    if (moved) {
      addRandomTile();
      drawBoard();
      if (checkGameOver()) {
        setTimeout(() => alert("Game Over!"), 100);
      }
    }
  }

  function checkGameOver() {
    if (getEmptyCells().length) return false;
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size - 1; j++) {
        if (board[i][j] === board[i][j + 1] || board[j][i] === board[j + 1][i]) {
          return false;
        }
      }
    }
    return true;
  }

  window.addEventListener("keydown", e => {
    switch (e.key) {
      case "ArrowLeft": move("left"); break;
      case "ArrowRight": move("right"); break;
      case "ArrowUp": move("up"); break;
      case "ArrowDown": move("down"); break;
    }
  });

  function resetGame() {
    createEmptyBoard();
    addRandomTile();
    addRandomTile();
    drawBoard();
  }

  const btnRow = document.createElement("div");
  btnRow.className = "btn-row";

  const resetBtn = document.createElement("button");
  resetBtn.className = "btn-2048";
  resetBtn.textContent = "Reset";
  resetBtn.onclick = resetGame;

  const closeBtn = document.createElement("button");
  closeBtn.className = "btn-2048 danger";
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
