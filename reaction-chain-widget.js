(function () {
  if (document.getElementById("reaction-chain-container")) return;

  const widgetBox = document.querySelector(".widget-box");
  if (!widgetBox) return;
  widgetBox.innerHTML = "";

  const style = document.createElement("style");
  style.textContent = `
    #reaction-chain-container {
      font-family: sans-serif;
      padding: 16px;
      background: #fefefe;
      border-radius: 12px;
      max-width: 320px;
      margin: 0 auto;
      text-align: center;
    }
    .chain-grid {
      display: grid;
      grid-template-columns: repeat(6, 40px);
      grid-gap: 8px;
      justify-content: center;
      margin: 12px auto;
    }
    .cell {
      width: 40px;
      height: 40px;
      background: #eee;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 18px;
      cursor: pointer;
      transition: background 0.3s ease;
    }
    .active {
      background: #4caf50;
      color: white;
    }
    .triggered {
      background: #ff5722;
      color: white;
    }
    .message {
      margin-top: 10px;
      font-weight: bold;
      min-height: 24px;
    }
    .reset-btn, .close-btn {
      margin-top: 12px;
      padding: 6px 12px;
      border: none;
      border-radius: 6px;
      background: #007bff;
      color: white;
      cursor: pointer;
    }
    .close-btn {
      background: #dc3545;
      margin-left: 10px;
    }
    .btn-row {
      display: flex;
      justify-content: center;
      gap: 10px;
    }
  `;
  document.head.appendChild(style);

  const container = document.createElement("div");
  container.id = "reaction-chain-container";

  const message = document.createElement("div");
  message.className = "message";
  message.textContent = "Tap any cell to start the chain!";

  const grid = document.createElement("div");
  grid.className = "chain-grid";

  const totalCells = 30;
  let cells = [];
  let triggeredCount = 0;
  let gameStarted = false;

  function setupGrid() {
    grid.innerHTML = "";
    cells = [];

    for (let i = 0; i < totalCells; i++) {
      const cell = document.createElement("div");
      cell.className = "cell";
      const isActive = Math.random() < 0.4;
      if (isActive) cell.classList.add("active");

      cell.dataset.index = i;
      cell.addEventListener("click", () => {
        if (!gameStarted) {
          gameStarted = true;
          triggerCell(i);
        }
      });

      cells.push(cell);
      grid.appendChild(cell);
    }

    message.textContent = "Tap any active cell to begin!";
    triggeredCount = 0;
  }

  function triggerCell(index) {
    const cell = cells[index];
    if (!cell || !cell.classList.contains("active")) return;

    if (cell.classList.contains("triggered")) return;

    cell.classList.remove("active");
    cell.classList.add("triggered");
    triggeredCount++;
    message.textContent = `Triggered: ${triggeredCount}`;

    // Chain to neighbors
    setTimeout(() => {
      const neighbors = [index - 1, index + 1, index - 6, index + 6];
      neighbors.forEach(n => {
        if (cells[n] && cells[n].classList.contains("active")) {
          triggerCell(n);
        }
      });
    }, 200);
  }

  const resetBtn = document.createElement("button");
  resetBtn.className = "reset-btn";
  resetBtn.textContent = "Reset";
  resetBtn.addEventListener("click", () => {
    gameStarted = false;
    setupGrid();
  });

  const closeBtn = document.createElement("button");
  closeBtn.className = "close-btn";
  closeBtn.textContent = "Close";
  closeBtn.addEventListener("click", () => {
    if (typeof window.renderLauncherButtons === "function") {
      widgetBox.innerHTML = "";
      window.renderLauncherButtons();
    }
  });

  const btnRow = document.createElement("div");
  btnRow.className = "btn-row";
  btnRow.appendChild(resetBtn);
  btnRow.appendChild(closeBtn);

  container.appendChild(grid);
  container.appendChild(message);
  container.appendChild(btnRow);
  widgetBox.appendChild(container);

  setupGrid();
})();
