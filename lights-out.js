(function () {
  if (document.getElementById("lights-out-container")) return;

  const widgetBox = document.querySelector(".widget-box");
  if (!widgetBox) return;

  widgetBox.innerHTML = "";

  const style = document.createElement("style");
  style.textContent = `
    #lights-out-container {
      font-family: sans-serif;
      padding: 16px;
      background: #f8f8f8;
      border-radius: 12px;
      width: 100%;
      max-width: 300px;
      margin: 10px auto;
      text-align: center;
    }
    .lights-grid {
      display: grid;
      grid-template-columns: repeat(5, 48px);
      grid-gap: 6px;
      margin: 20px auto;
    }
    .light {
      width: 48px;
      height: 48px;
      border-radius: 6px;
      background: #333;
      cursor: pointer;
      transition: background 0.2s;
    }
    .light.on {
      background: #ffeb3b;
    }
    .message {
      font-size: 16px;
      min-height: 24px;
      font-weight: bold;
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
  container.id = "lights-out-container";

  const message = document.createElement("div");
  message.className = "message";
  message.textContent = "Turn off all the lights.";

  const grid = document.createElement("div");
  grid.className = "lights-grid";

  const resetBtn = document.createElement("button");
  resetBtn.className = "reset-btn";
  resetBtn.textContent = "Reset";

  const closeBtn = document.createElement("button");
  closeBtn.className = "close-btn";
  closeBtn.textContent = "Close";

  const buttonRow = document.createElement("div");
  buttonRow.className = "button-row";
  buttonRow.appendChild(resetBtn);
  buttonRow.appendChild(closeBtn);

  container.appendChild(message);
  container.appendChild(grid);
  container.appendChild(buttonRow);
  widgetBox.appendChild(container);

  const size = 5;
  let board = [];

  function initBoard() {
    board = Array.from({ length: size }, () =>
      Array.from({ length: size }, () => Math.random() < 0.5)
    );
    message.textContent = "Turn off all the lights.";
    renderBoard();
  }

  function toggle(x, y) {
    if (x < 0 || x >= size || y < 0 || y >= size) return;
    board[y][x] = !board[y][x];
  }

  function handleClick(x, y) {
    toggle(x, y);
    toggle(x + 1, y);
    toggle(x - 1, y);
    toggle(x, y + 1);
    toggle(x, y - 1);
    renderBoard();
    checkWin();
  }

  function renderBoard() {
    grid.innerHTML = "";
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        const tile = document.createElement("div");
        tile.className = "light" + (board[y][x] ? " on" : "");
        tile.addEventListener("click", () => handleClick(x, y));
        grid.appendChild(tile);
      }
    }
  }

  function checkWin() {
    const allOff = board.flat().every(light => !light);
    if (allOff) {
      message.textContent = "🎉 You won!";
    }
  }

  resetBtn.addEventListener("click", initBoard);

  closeBtn.addEventListener("click", () => {
    if (typeof window.renderLauncherButtons === "function") {
      widgetBox.innerHTML = "";
      window.renderLauncherButtons();
    }
  });

  initBoard();
})();
