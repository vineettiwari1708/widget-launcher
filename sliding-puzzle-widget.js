(function () {
  if (document.getElementById("sliding-puzzle-container")) return;

  const style = document.createElement("style");
  style.textContent = `
    #sliding-puzzle-container {
      font-family: sans-serif;
      background: #fafafa;
      border-radius: 16px;
      padding: 16px;
      max-width: 360px;
      width: 100%;
      color: #333;
      user-select: none;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 12px;
    }
    .puzzle-grid {
      display: grid;
      grid-template-columns: repeat(4, 70px);
      grid-template-rows: repeat(4, 70px);
      gap: 6px;
      margin-bottom: 12px;
    }
    .tile {
      background: #007bff;
      color: white;
      font-weight: bold;
      font-size: 24px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 8px;
      cursor: pointer;
      user-select: none;
      box-shadow: 0 2px 6px rgba(0, 123, 255, 0.6);
      transition: background 0.2s;
    }
    .tile.empty {
      background: transparent;
      box-shadow: none;
      cursor: default;
    }
    .tile:hover:not(.empty) {
      background: #0056b3;
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
    .message {
      min-height: 22px;
      font-size: 16px;
      font-weight: 600;
    }
  `;
  document.head.appendChild(style);

  const container = document.createElement("div");
  container.id = "sliding-puzzle-container";

  const message = document.createElement("div");
  message.className = "message";
  message.textContent = "Arrange the numbers from 1 to 15";

  const grid = document.createElement("div");
  grid.className = "puzzle-grid";

  let tiles = [];
  let emptyIndex = 15;

  // Initialize tiles 1 to 15 and one empty
  function initTiles() {
    tiles = [];
    for (let i = 1; i <= 15; i++) {
      tiles.push(i);
    }
    tiles.push(null); // empty space
  }

  // Shuffle tiles with solvable configuration
  function shuffleTiles() {
    do {
      tiles = tiles
        .map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value);
    } while (!isSolvable(tiles) || isSolved());

    emptyIndex = tiles.indexOf(null);
  }

  // Check if puzzle solved
  function isSolved() {
    for (let i = 0; i < 15; i++) {
      if (tiles[i] !== i + 1) return false;
    }
    return tiles[15] === null;
  }

  // Check solvability (inversion count + row of empty tile)
  function isSolvable(arr) {
    let inversions = 0;
    for (let i = 0; i < 16; i++) {
      for (let j = i + 1; j < 16; j++) {
        if (arr[i] && arr[j] && arr[i] > arr[j]) inversions++;
      }
    }
    const emptyRow = Math.floor(arr.indexOf(null) / 4);
    // If grid width is even:
    // puzzle solvable if:
    // empty row from bottom is even & inversions odd OR
    // empty row from bottom is odd & inversions even
    if (4 % 2 === 0) {
      if ((3 - emptyRow) % 2 === 0) return inversions % 2 === 1;
      else return inversions % 2 === 0;
    }
    // Odd grid width: inversions even
    return inversions % 2 === 0;
  }

  // Render tiles
  function renderTiles() {
    grid.innerHTML = "";
    tiles.forEach((num, idx) => {
      const tile = document.createElement("div");
      tile.className = "tile" + (num === null ? " empty" : "");
      tile.textContent = num || "";
      tile.onclick = () => tryMove(idx);
      grid.appendChild(tile);
    });
  }

  // Try to move tile if adjacent to empty
  function tryMove(idx) {
    if (tiles[idx] === null) return;

    const canMove = [idx - 1, idx + 1, idx - 4, idx + 4].includes(emptyIndex);
    // Check adjacency but avoid wrap around:
    if (
      (idx === emptyIndex - 1 && emptyIndex % 4 !== 0) ||
      (idx === emptyIndex + 1 && idx % 4 !== 0) ||
      (idx === emptyIndex - 4) ||
      (idx === emptyIndex + 4)
    ) {
      swapTiles(idx, emptyIndex);
      emptyIndex = idx;
      renderTiles();
      if (isSolved()) {
        message.textContent = "🎉 Congratulations! Puzzle solved.";
      }
    }
  }

  // Swap two tiles
  function swapTiles(i, j) {
    const temp = tiles[i];
    tiles[i] = tiles[j];
    tiles[j] = temp;
  }

  // Reset and shuffle
  function resetGame() {
    initTiles();
    shuffleTiles();
    renderTiles();
    message.textContent = "Arrange the numbers from 1 to 15";
  }

  // Close widget handler
  function closeWidget() {
    const widgetBox = document.querySelector(".widget-box");
    if (widgetBox) {
      widgetBox.innerHTML = "";
      if (window.renderLauncherButtons) {
        window.renderLauncherButtons();
      }
    }
  }

  // Controls
  const controls = document.createElement("div");
  controls.className = "controls";

  const resetBtn = document.createElement("button");
  resetBtn.textContent = "Shuffle";
  resetBtn.onclick = resetGame;

  const closeBtn = document.createElement("button");
  closeBtn.textContent = "Close";
  closeBtn.className = "danger";
  closeBtn.onclick = closeWidget;

  controls.appendChild(resetBtn);
  controls.appendChild(closeBtn);

  // Setup container
  container.appendChild(message);
  container.appendChild(grid);
  container.appendChild(controls);

  // Init & render first time
  resetGame();

  // Append to widget panel or body fallback
  const widgetBox = document.querySelector(".widget-box");
  if (widgetBox) {
    widgetBox.innerHTML = "";
    widgetBox.appendChild(container);
  } else {
    document.body.appendChild(container);
  }
})();
