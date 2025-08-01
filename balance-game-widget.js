(function () {
  if (document.getElementById("balance-game-container")) return;

  const widgetBox = document.querySelector(".widget-box");
  if (!widgetBox) return;

  widgetBox.innerHTML = "";

  const style = document.createElement("style");
  style.textContent = `
    #balance-game-container {
      font-family: sans-serif;
      padding: 16px;
      background: #f8f8f8;
      border-radius: 12px;
      width: 100%;
      max-width: 320px;
      margin: 10px auto;
      text-align: center;
    }
    .balance-box {
      position: relative;
      width: 240px;
      height: 40px;
      border: 4px solid #333;
      border-radius: 20px;
      margin: 20px auto;
      background: #e0e0e0;
      overflow: hidden;
    }
    .dot {
      position: absolute;
      width: 24px;
      height: 24px;
      border-radius: 50%;
      background: #2196f3;
      top: 8px;
      left: 108px;
      transition: left 0.05s;
    }
    .message {
      font-size: 16px;
      min-height: 24px;
      font-weight: bold;
    }
    .score {
      font-weight: bold;
      margin-top: 8px;
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
  container.id = "balance-game-container";

  const message = document.createElement("div");
  message.className = "message";
  message.textContent = "Tap to balance the dot";

  const scoreText = document.createElement("div");
  scoreText.className = "score";
  scoreText.textContent = "Time: 0.0s";

  const box = document.createElement("div");
  box.className = "balance-box";

  const dot = document.createElement("div");
  dot.className = "dot";
  box.appendChild(dot);

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
  container.appendChild(box);
  container.appendChild(buttonRow);
  widgetBox.appendChild(container);

  let position = 108; // 0–216 range inside 240px container
  let velocity = 0;
  let interval = null;
  let score = 0;
  let startTime = null;
  let gameOver = false;

  function resetGame() {
    position = 108;
    velocity = 0;
    dot.style.left = position + "px";
    score = 0;
    scoreText.textContent = "Time: 0.0s";
    gameOver = false;
    message.textContent = "Tap to balance the dot";
    clearInterval(interval);
    startTime = performance.now();

    interval = setInterval(() => {
      if (gameOver) return;

      velocity += (Math.random() - 0.5) * 0.8; // random nudge
      velocity *= 0.98; // friction
      position += velocity;

      if (position < 0 || position > 216) {
        message.textContent = "⚠️ You lost!";
        gameOver = true;
        clearInterval(interval);
        return;
      }

      dot.style.left = position + "px";
      const now = performance.now();
      score = ((now - startTime) / 1000).toFixed(1);
      scoreText.textContent = `Time: ${score}s`;
    }, 50);
  }

  box.addEventListener("click", () => {
    if (gameOver) return;
    velocity -= 1.5; // apply push left
  });

  resetBtn.addEventListener("click", resetGame);

  closeBtn.addEventListener("click", () => {
    if (typeof window.renderLauncherButtons === "function") {
      widgetBox.innerHTML = "";
      window.renderLauncherButtons();
    }
  });

  resetGame();
})();
