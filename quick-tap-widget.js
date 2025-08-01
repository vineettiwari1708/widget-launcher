(function () {
  if (document.getElementById("quick-tap-container")) return;

  const widgetBox = document.querySelector(".widget-box");
  if (!widgetBox) return;

  widgetBox.innerHTML = "";

  const style = document.createElement("style");
  style.textContent = `
    #quick-tap-container {
      font-family: sans-serif;
      padding: 16px;
      background: #f8f8f8;
      border-radius: 12px;
      width: 100%;
      max-width: 320px;
      margin: 10px auto;
      text-align: center;
    }
    .tap-grid {
      display: grid;
      grid-template-columns: repeat(3, 80px);
      grid-gap: 12px;
      justify-content: center;
      margin: 16px auto;
    }
    .tap-cell {
      width: 80px;
      height: 80px;
      background: #eee;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 32px;
      cursor: pointer;
      transition: background 0.2s;
    }
    .tap-cell:hover {
      background: #ddd;
    }
    .target {
      color: red;
    }
    .message {
      font-size: 16px;
      font-weight: bold;
      min-height: 24px;
      margin-bottom: 4px;
    }
    .score {
      font-weight: bold;
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
  container.id = "quick-tap-container";

  const message = document.createElement("div");
  message.className = "message";
  message.textContent = "Tap the red 🔴 before time runs out!";

  const scoreText = document.createElement("div");
  scoreText.className = "score";
  scoreText.textContent = "Score: 0";

  const grid = document.createElement("div");
  grid.className = "tap-grid";

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
  container.appendChild(scoreText);
  container.appendChild(grid);
  container.appendChild(buttonRow);
  widgetBox.appendChild(container);

  const icons = ["🔵", "🟢", "🟡", "🟣", "🟠", "⚪", "🔴"];
  let score = 0;
  let timer = null;
  let targetIndex = null;

  function renderGrid() {
    clearTimeout(timer);
    grid.innerHTML = "";
    const cells = [];

    targetIndex = Math.floor(Math.random() * 9);
    for (let i = 0; i < 9; i++) {
      const cell = document.createElement("div");
      cell.className = "tap-cell";

      const isTarget = i === targetIndex;
      const icon = isTarget ? "🔴" : icons[Math.floor(Math.random() * (icons.length - 1))];
      cell.innerHTML = icon;

      if (isTarget) cell.classList.add("target");

      cell.addEventListener("click", () => {
        if (isTarget) {
          score++;
          scoreText.textContent = `Score: ${score}`;
          renderGrid(); // next round
        } else {
          message.textContent = "❌ Wrong one!";
          endGame();
        }
      });

      cells.push(cell);
      grid.appendChild(cell);
    }

    timer = setTimeout(() => {
      message.textContent = "⏱️ Too slow!";
      endGame();
    }, 2000); // 2 seconds to tap
  }

  function endGame() {
    clearTimeout(timer);
    grid.innerHTML = "";
    message.textContent += " Game Over.";
  }

  resetBtn.addEventListener("click", () => {
    score = 0;
    scoreText.textContent = "Score: 0";
    message.textContent = "Tap the red 🔴 before time runs out!";
    renderGrid();
  });

  closeBtn.addEventListener("click", () => {
    if (typeof window.renderLauncherButtons === "function") {
      widgetBox.innerHTML = "";
      window.renderLauncherButtons();
    }
  });

  renderGrid();
})();
