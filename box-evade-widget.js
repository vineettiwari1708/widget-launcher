(function () {
  if (document.getElementById("box-evade-container")) return;

  const widgetBox = document.querySelector(".widget-box");
  if (!widgetBox) return;
  widgetBox.innerHTML = "";

  const style = document.createElement("style");
  style.textContent = `
    #box-evade-container {
      font-family: sans-serif;
      width: 320px;
      height: 480px;
      margin: auto;
      padding: 16px;
      background: #fff;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      position: relative;
      overflow: hidden;
    }
    #game-area {
      position: relative;
      width: 100%;
      height: 100%;
      background-color: #e3e3e3;
      border: 2px solid #333;
      overflow: hidden;
    }
    .box {
      width: 40px;
      height: 40px;
      background-color: #007bff;
      position: absolute;
      bottom: 10px;
      left: 50%;
      transform: translateX(-50%);
    }
    .falling-block {
      width: 40px;
      height: 40px;
      background-color: #dc3545;
      position: absolute;
      top: -40px;
      animation: fall 2s linear infinite;
    }
    @keyframes fall {
      to {
        top: 100%;
      }
    }
    .message {
      font-size: 18px;
      font-weight: bold;
      text-align: center;
      position: absolute;
      top: 20px;
      width: 100%;
    }
    #reset-btn {
      padding: 8px 16px;
      margin-top: 12px;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      display: block;
      margin-left: auto;
      margin-right: auto;
    }
  `;
  document.head.appendChild(style);

  const container = document.createElement("div");
  container.id = "box-evade-container";

  const message = document.createElement("div");
  message.className = "message";
  message.textContent = "Avoid the blocks!";

  const gameArea = document.createElement("div");
  gameArea.id = "game-area";

  const resetBtn = document.createElement("button");
  resetBtn.id = "reset-btn";
  resetBtn.textContent = "Reset Game";

  container.appendChild(message);
  container.appendChild(gameArea);
  container.appendChild(resetBtn);
  widgetBox.appendChild(container);

  const box = document.createElement("div");
  box.className = "box";
  gameArea.appendChild(box);

  let boxX = 50; // Initial position in percentage (50% center)
  let gameOver = false;
  let blockSpeed = 2; // Speed of the falling blocks
  let blocks = [];

  function moveBox(direction) {
    if (gameOver) return;
    boxX += direction * 10;
    boxX = Math.max(0, Math.min(100, boxX)); // Prevent going out of bounds (0% to 100%)
    box.style.left = `${boxX}%`;
  }

  function spawnBlock() {
    const block = document.createElement("div");
    block.className = "falling-block";
    block.style.left = `${Math.random() * 100}%`; // Random horizontal position
    gameArea.appendChild(block);
    blocks.push(block);

    // Check if the block hits the player box
    setInterval(() => {
      if (gameOver) return;

      const blockRect = block.getBoundingClientRect();
      const boxRect = box.getBoundingClientRect();

      if (
        blockRect.top + blockRect.height >= boxRect.top &&
        blockRect.top <= boxRect.top + boxRect.height &&
        blockRect.left + blockRect.width >= boxRect.left &&
        blockRect.left <= boxRect.left + boxRect.width
      ) {
        gameOver = true;
        message.textContent = "Game Over! Tap to Reset.";
      }
    }, 20);
  }

  // Create blocks at intervals
  setInterval(() => {
    if (!gameOver) spawnBlock();
  }, 1000); // Spawn block every second

  // Move box based on user input (left and right tap)
  document.addEventListener("click", (e) => {
    if (gameOver) return;

    // Get position of the click relative to the game area
    const gameAreaRect = gameArea.getBoundingClientRect();
    const clickX = e.clientX - gameAreaRect.left;
    const clickDirection = clickX < gameAreaRect.width / 2 ? -1 : 1; // Left or right based on click

    moveBox(clickDirection);
  });

  // Reset the game
  resetBtn.addEventListener("click", () => {
    gameOver = false;
    message.textContent = "Avoid the blocks!";
    blocks.forEach(block => block.remove());
    blocks = [];
    box.style.left = "50%";
    boxX = 50;
  });
})();
