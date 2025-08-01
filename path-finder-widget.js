(function () {
  if (document.getElementById("path-finder-container")) return;

  const widgetBox = document.querySelector(".widget-box");
  if (!widgetBox) return;
  widgetBox.innerHTML = "";

  const style = document.createElement("style");
  style.textContent = `
    #path-finder-container {
      font-family: sans-serif;
      background: #fff;
      border-radius: 12px;
      padding: 16px;
      width: 320px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
      user-select: none;
    }
    .pf-grid {
      display: grid;
      grid-template-columns: repeat(6, 40px);
      grid-template-rows: repeat(6, 40px);
      gap: 4px;
      margin: 10px 0;
    }
    .pf-cell {
      width: 40px;
      height: 40px;
      background: #e0e0e0;
      border-radius: 4px;
      transition: background 0.2s;
    }
    .pf-start {
      background: #4caf50;
    }
    .pf-end {
      background: #f44336;
    }
    .pf-path {
      background: #2196f3;
    }
    .pf-wall {
      background: #333;
    }
    .pf-controls {
      margin-top: 12px;
      display: flex;
      justify-content: space-between;
    }
    .pf-btn {
      padding: 6px 12px;
      border: none;
      border-radius: 6px;
      font-weight: bold;
      cursor: pointer;
      background: #007bff;
      color: white;
    }
    .pf-btn:hover {
      background: #0056b3;
    }
    .pf-message {
      height: 24px;
      margin-top: 8px;
      font-weight: bold;
    }
  `;
  document.head.appendChild(style);

  const container = document.createElement("div");
  container.id = "path-finder-container";

  const grid = document.createElement("div");
  grid.className = "pf-grid";

  const rows = 6;
  const cols = 6;
  const cells = [];

  let isDragging = false;
  let pathMode = true;

  const startIndex = 0; // top-left
  const endIndex = rows * cols - 1; // bottom-right

  for (let i = 0; i < rows * cols; i++) {
    const cell = document.createElement("div");
    cell.className = "pf-cell";
    if (i === startIndex) cell.classList.add("pf-start");
    if (i === endIndex) cell.classList.add("pf-end");

    cell.addEventListener("mousedown", (e) => {
      isDragging = true;
      if (!cell.classList.contains("pf-start") && !cell.classList.contains("pf-end")) {
        toggleCell(cell);
      }
    });

    cell.addEventListener("mouseenter", () => {
      if (isDragging && !cell.classList.contains("pf-start") && !cell.classList.contains("pf-end")) {
        toggleCell(cell);
      }
    });

    cells.push(cell);
    grid.appendChild(cell);
  }

  document.addEventListener("mouseup", () => {
    isDragging = false;
  });

  function toggleCell(cell) {
    if (pathMode) {
      cell.classList.add("pf-path");
      cell.classList.remove("pf-wall");
    } else {
      cell.classList.add("pf-wall");
      cell.classList.remove("pf-path");
    }
  }

  const controls = document.createElement("div");
  controls.className = "pf-controls";

  const modeBtn = document.createElement("button");
  modeBtn.className = "pf-btn";
  modeBtn.textContent = "Toggle Wall Mode";
  modeBtn.addEventListener("click", () => {
    pathMode = !pathMode;
    modeBtn.textContent = pathMode ? "Toggle Wall Mode" : "Toggle Path Mode";
  });

  const resetBtn = document.createElement("button");
  resetBtn.className = "pf-btn";
  resetBtn.textContent = "Reset";
  resetBtn.addEventListener("click", () => {
    cells.forEach((cell, i) => {
      cell.className = "pf-cell";
      if (i === startIndex) cell.classList.add("pf-start");
      if (i === endIndex) cell.classList.add("pf-end");
    });
    message.textContent = "";
  });

  const message = document.createElement("div");
  message.className = "pf-message";

  const checkBtn = document.createElement("button");
  checkBtn.className = "pf-btn";
  checkBtn.textContent = "Check Path";
  checkBtn.addEventListener("click", () => {
    if (pathExists()) {
      message.style.color = "#28a745";
      message.textContent = "✅ Path exists!";
    } else {
      message.style.color = "#e53935";
      message.textContent = "🚫 No path found!";
    }
  });

  controls.appendChild(modeBtn);
  controls.appendChild(checkBtn);
  controls.appendChild(resetBtn);

  container.appendChild(grid);
  container.appendChild(controls);
  container.appendChild(message);
  widgetBox.appendChild(container);

  // Pathfinding using simple BFS
  function pathExists() {
    const queue = [startIndex];
    const visited = new Set();
    visited.add(startIndex);

    while (queue.length) {
      const index = queue.shift();
      if (index === endIndex) return true;

      const neighbors = getNeighbors(index);
      for (const n of neighbors) {
        if (!visited.has(n) && isPassable(n)) {
          visited.add(n);
          queue.push(n);
        }
      }
    }
    return false;
  }

  function getNeighbors(i) {
    const res = [];
    const row = Math.floor(i / cols);
    const col = i % cols;
    if (row > 0) res.push(i - cols);
    if (row < rows - 1) res.push(i + cols);
    if (col > 0) res.push(i - 1);
    if (col < cols - 1) res.push(i + 1);
    return res;
  }

  function isPassable(i) {
    const cell = cells[i];
    return (
      !cell.classList.contains("pf-wall") &&
      (cell.classList.contains("pf-path") ||
        i === startIndex ||
        i === endIndex)
    );
  }
})();
