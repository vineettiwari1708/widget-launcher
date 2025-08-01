(function () {
  if (document.getElementById("dots-and-boxes-container")) return;

  const style = document.createElement("style");
  style.textContent = `
    #dots-and-boxes-container {
      font-family: sans-serif;
      max-width: 360px;
      width: 100%;
      background: #fafafa;
      border-radius: 16px;
      padding: 16px;
      user-select: none;
      color: #333;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 12px;
    }
    .game-board {
      display: grid;
      grid-template-columns: repeat(5, 40px);
      grid-template-rows: repeat(5, 40px);
      gap: 2px;
      margin-bottom: 12px;
      position: relative;
    }
    .dot {
      width: 12px;
      height: 12px;
      background: #007bff;
      border-radius: 50%;
      margin: auto;
    }
    .line {
      background: #ccc;
      cursor: pointer;
      transition: background-color 0.3s;
    }
    .line.h-line {
      height: 4px;
      width: 40px;
      border-radius: 2px;
    }
    .line.v-line {
      width: 4px;
      height: 40px;
      border-radius: 2px;
    }
    .line.claimed {
      background: #007bff;
      cursor: default;
    }
    .box {
      width: 40px;
      height: 40px;
      background: #eee;
      border-radius: 6px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      font-size: 24px;
      user-select: none;
      color: white;
    }
    .box.player1 {
      background: #007bff;
    }
    .box.player2 {
      background: #28a745;
    }
    .status {
      font-size: 16px;
      font-weight: 600;
    }
    .controls {
      display: flex;
      gap: 10px;
      width: 100%;
      justify-content: center;
    }
    button {
      padding: 8px 16px;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      font-size: 14px;
      background: #007bff;
      color: white;
      user-select: none;
      transition: background 0.3s;
    }
    button:hover {
      background: #0056b3;
    }
    button.danger {
      background: #dc3545;
    }
  `;
  document.head.appendChild(style);

  const container = document.createElement("div");
  container.id = "dots-and-boxes-container";

  const status = document.createElement("div");
  status.className = "status";

  // 3x3 dots => 2x2 boxes, so board size = 5x5 cells:
  // Odd rows: dots and horizontal lines alternate
  // Even rows: vertical lines and boxes alternate

  const boardSize = 5;
  // We'll store state of lines and boxes
  // Lines indexed by their position in grid and type: horizontal or vertical

  // Data structures to track claimed lines and boxes:
  // horizontalLines[row][col] (row even), verticalLines[row][col] (row odd)
  const horizontalLines = Array(3).fill(null).map(() => Array(2).fill(false));
  const verticalLines = Array(2).fill(null).map(() => Array(3).fill(false));
  // Boxes claimed by players: 0 = unclaimed, 1 = player1, 2 = player2
  const boxes = Array(2).fill(null).map(() => Array(2).fill(0));

  let currentPlayer = 1; // 1 = blue, 2 = green
  let scores = { 1: 0, 2: 0 };
  let movesLeft = 12; // total lines: 3*2 + 2*3 = 6 + 6 = 12

  const gameBoard = document.createElement("div");
  gameBoard.className = "game-board";

  function updateStatus() {
    status.textContent = `Player ${currentPlayer === 1 ? "🔵 Blue" : "🟢 Green"}'s turn | Scores - 🔵: ${scores[1]} 🟢: ${scores[2]}`;
    if (movesLeft === 0) {
      if (scores[1] > scores[2]) {
        status.textContent = `Game over! 🔵 Blue wins! Final score: ${scores[1]} - ${scores[2]}`;
      } else if (scores[2] > scores[1]) {
        status.textContent = `Game over! 🟢 Green wins! Final score: ${scores[1]} - ${scores[2]}`;
      } else {
        status.textContent = `Game over! It's a tie! Final score: ${scores[1]} - ${scores[2]}`;
      }
    }
  }

  function createCell(r, c) {
    // Odd rows = lines & boxes
    // Even rows = dots & lines
    if (r % 2 === 0 && c % 2 === 0) {
      // Dot
      const dot = document.createElement("div");
      dot.className = "dot";
      return dot;
    }
    else if (r % 2 === 0 && c % 2 === 1) {
      // Horizontal line slot (between dots)
      const line = document.createElement("div");
      line.className = "line h-line";
      line.onclick = () => handleLineClick("h", r / 2, (c - 1) / 2, line);
      return line;
    }
    else if (r % 2 === 1 && c % 2 === 0) {
      // Vertical line slot (between dots)
      const line = document.createElement("div");
      line.className = "line v-line";
      line.onclick = () => handleLineClick("v", (r - 1) / 2, c / 2, line);
      return line;
    }
    else {
      // Box slot
      const box = document.createElement("div");
      box.className = "box";
      return box;
    }
  }

  function handleLineClick(type, row, col, element) {
    if (movesLeft === 0) return; // game over
    if (type === "h") {
      if (horizontalLines[row][col]) return; // already claimed
      horizontalLines[row][col] = true;
    } else {
      if (verticalLines[row][col]) return;
      verticalLines[row][col] = true;
    }
    element.classList.add("claimed");
    movesLeft--;

    // Check if any box(es) completed
    let boxesClaimed = 0;

    // Adjacent boxes depending on line type and position
    const affectedBoxes = [];
    if (type === "h") {
      // Horizontal line is top border of box below and bottom border of box above
      if (row > 0) affectedBoxes.push([row - 1, col]);
      if (row < 2) affectedBoxes.push([row, col]);
    } else {
      // Vertical line is left border of box right and right border of box left
      if (col > 0) affectedBoxes.push([row, col - 1]);
      if (col < 2) affectedBoxes.push([row, col]);
    }

    affectedBoxes.forEach(([r, c]) => {
      if (r >= 0 && c >= 0 && r < 2 && c < 2 && boxes[r][c] === 0) {
        if (
          horizontalLines[r][c] &&
          horizontalLines[r + 1][c] &&
          verticalLines[r][c] &&
          verticalLines[r][c + 1]
        ) {
          boxes[r][c] = currentPlayer;
          boxesClaimed++;
          scores[currentPlayer]++;
          // Update box UI
          const boxIndex = r * 4 + (c * 2) + 1;
          const boxElement = gameBoard.children[boxIndex];
          if (boxElement) {
            boxElement.classList.add(currentPlayer === 1 ? "player1" : "player2");
            boxElement.textContent = currentPlayer === 1 ? "🔵" : "🟢";
          }
        }
      }
    });

    // If claimed box, player gets another turn
    if (boxesClaimed === 0) {
      currentPlayer = currentPlayer === 1 ? 2 : 1;
    }

    updateStatus();
  }

  // Build the grid UI
  for (let r = 0; r < boardSize; r++) {
    for (let c = 0; c < boardSize; c++) {
      gameBoard.appendChild(createCell(r, c));
    }
  }

  // Controls
  const controls = document.createElement("div");
  controls.className = "controls";

  const resetBtn = document.createElement("button");
  resetBtn.textContent = "Reset";
  resetBtn.onclick = () => {
    // Reset state
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 2; c++) horizontalLines[r][c] = false;
    }
    for (let r = 0; r < 2; r++) {
      for (let c = 0; c < 3; c++) verticalLines[r][c] = false;
    }
    for (let r = 0; r < 2; r++) {
      for (let c = 0; c < 2; c++) boxes[r][c] = 0;
    }
    scores = { 1: 0, 2: 0 };
    currentPlayer = 1;
    movesLeft = 12;
    // Reset UI elements
    [...gameBoard.children].forEach(el => {
      el.classList.remove("claimed", "player1", "player2");
      if (el.classList.contains("box")) el.textContent = "";
    });
    updateStatus();
  };

  const closeBtn = document.createElement("button");
  closeBtn.textContent = "Close";
  closeBtn.className = "danger";
  closeBtn.onclick = () => {
    const widgetBox = document.querySelector(".widget-box");
    if (widgetBox) {
      widgetBox.innerHTML = "";
      if (window.renderLauncherButtons) window.renderLauncherButtons();
    }
  };

  controls.appendChild(resetBtn);
  controls.appendChild(closeBtn);

  container.appendChild(status);
  container.appendChild(gameBoard);
  container.appendChild(controls);

  updateStatus();

  const widgetBox = document.querySelector(".widget-box");
  if (widgetBox) {
    widgetBox.innerHTML = "";
    widgetBox.appendChild(container);
  } else {
    document.body.appendChild(container);
  }
})();
