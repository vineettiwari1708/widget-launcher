(function () {
  if (document.getElementById("stack-the-blocks-container")) return;

  const widgetBox = document.querySelector(".widget-box");
  if (!widgetBox) return;
  widgetBox.innerHTML = "";

  const style = document.createElement("style");
  style.textContent = `
    #stack-the-blocks-container {
      font-family: sans-serif;
      width: 300px;
      height: 450px;
      margin: auto;
      padding: 16px;
      background: #fff;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      position: relative;
      overflow: hidden;
    }
    #stack {
      position: relative;
      width: 100%;
      height: 400px;
      background-color: #f1f1f1;
      border: 2px solid #333;
      margin: 20px 0;
      display: flex;
      justify-content: center;
      align-items: flex-end;
      overflow: hidden;
    }
    .block {
      width: 100%;
      height: 30px;
      background-color: #2196f3;
      margin: 0;
      position: absolute;
      bottom: 0;
      left: 0;
      transition: bottom 0.1s ease-out;
    }
    .message {
      font-size: 18px;
      font-weight: bold;
      text-align: center;
      margin-bottom: 16px;
    }
    #tap-btn {
      padding: 8px 16px;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      display: block;
      margin-left: auto;
      margin-right: auto;
    }
    .game-over {
      color: red;
    }
  `;
  document.head.appendChild(style);

  const container = document.createElement("div");
  container.id = "stack-the-blocks-container";

  const message = document.createElement("div");
  message.className = "message";
  message.textContent = "Tap to drop blocks!";

  const stack = document.createElement("div");
  stack.id = "stack";

  const tapBtn = document.createElement("button");
  tapBtn.id = "tap-btn";
  tapBtn.textContent = "Drop Block";

  container.appendChild(message);
  container.appendChild(stack);
  container.appendChild(tapBtn);
  widgetBox.appendChild(container);

  let blockHeight = 30;
  let currentBlockPosition = 0;
  let isGameOver = false;
  let lastBlockPosition = 0;

  // Function to create a new block
  function createBlock() {
    if (isGameOver) return;

    const block = document.createElement("div");
    block.classList.add("block");
    stack.appendChild(block);

    block.style.bottom = `${currentBlockPosition}px`;

    currentBlockPosition += blockHeight;

    // Check for misalignment
    const blockWidth = block.offsetWidth;
    const stackWidth = stack.offsetWidth;
    const offset = (stackWidth - blockWidth) / 2;

    block.style.left = `${offset}px`;

    // Check for collision and game over condition
    if (Math.abs(offset) > 20) {
      gameOver();
    }

    // Update last block position
    lastBlockPosition = currentBlockPosition;
  }

  // Function to handle game over
  function gameOver() {
    isGameOver = true;
    message.textContent = "Game Over! You lost!";
    message.classList.add("game-over");
    tapBtn.textContent = "Restart Game";
  }

  // Start or restart the game when the button is clicked
  tapBtn.addEventListener("click", () => {
    if (isGameOver) {
      // Reset game
      currentBlockPosition = 0;
      isGameOver = false;
      message.textContent = "Tap to drop blocks!";
      message.classList.remove("game-over");
      tapBtn.textContent = "Drop Block";
      stack.innerHTML = "";
      createBlock();
    } else {
      createBlock();
    }
  });

  // Initialize with the first block
  createBlock();
})();
