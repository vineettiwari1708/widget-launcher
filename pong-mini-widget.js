(function () {
  if (document.getElementById("pong-mini-container")) return;

  const style = document.createElement("style");
  style.textContent = `
    #pong-mini-container {
      font-family: monospace, monospace;
      width: 320px;
      height: 200px;
      background: #222;
      color: white;
      border-radius: 12px;
      padding: 12px;
      box-sizing: border-box;
      user-select: none;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      position: relative;
    }
    canvas {
      background: black;
      border-radius: 8px;
      display: block;
      margin-bottom: 8px;
    }
    .status {
      font-size: 14px;
      margin-bottom: 6px;
      user-select: none;
    }
    .controls {
      display: flex;
      gap: 10px;
    }
    button {
      padding: 6px 12px;
      border: none;
      border-radius: 6px;
      background: #007bff;
      color: white;
      cursor: pointer;
      font-size: 14px;
      user-select: none;
      transition: background-color 0.3s;
    }
    button:hover {
      background: #0056b3;
    }
  `;
  document.head.appendChild(style);

  const container = document.createElement("div");
  container.id = "pong-mini-container";

  const status = document.createElement("div");
  status.className = "status";
  status.textContent = "Use W/S to move paddle";

  const canvas = document.createElement("canvas");
  canvas.width = 300;
  canvas.height = 150;
  container.appendChild(status);
  container.appendChild(canvas);

  const ctx = canvas.getContext("2d");

  // Game variables
  const paddleWidth = 8;
  const paddleHeight = 40;
  const ballRadius = 6;
  const paddleSpeed = 4;
  const aiSpeed = 2.5;

  let leftPaddleY = (canvas.height - paddleHeight) / 2;
  let rightPaddleY = (canvas.height - paddleHeight) / 2;
  let ballX = canvas.width / 2;
  let ballY = canvas.height / 2;
  let ballSpeedX = 3;
  let ballSpeedY = 3;

  let leftScore = 0;
  let rightScore = 0;

  // Input state
  const keysPressed = { w: false, s: false };

  function resetBall(direction = 1) {
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
    ballSpeedX = 3 * direction;
    ballSpeedY = (Math.random() * 4) - 2;
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw center line
    ctx.strokeStyle = "#444";
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, 0);
    ctx.lineTo(canvas.width / 2, canvas.height);
    ctx.stroke();
    ctx.setLineDash([]);

    // Draw paddles
    ctx.fillStyle = "white";
    ctx.fillRect(10, leftPaddleY, paddleWidth, paddleHeight);
    ctx.fillRect(canvas.width - 10 - paddleWidth, rightPaddleY, paddleWidth, paddleHeight);

    // Draw ball
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
    ctx.fill();

    // Draw scores
    ctx.font = "20px monospace";
    ctx.fillText(leftScore, canvas.width / 4, 25);
    ctx.fillText(rightScore, (canvas.width * 3) / 4, 25);
  }

  function update() {
    // Move left paddle (player)
    if (keysPressed.w) leftPaddleY = Math.max(0, leftPaddleY - paddleSpeed);
    if (keysPressed.s) leftPaddleY = Math.min(canvas.height - paddleHeight, leftPaddleY + paddleSpeed);

    // Move right paddle (AI simple)
    const paddleCenter = rightPaddleY + paddleHeight / 2;
    if (ballY < paddleCenter - 10) {
      rightPaddleY = Math.max(0, rightPaddleY - aiSpeed);
    } else if (ballY > paddleCenter + 10) {
      rightPaddleY = Math.min(canvas.height - paddleHeight, rightPaddleY + aiSpeed);
    }

    // Move ball
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    // Ball collision top/bottom
    if (ballY - ballRadius < 0 || ballY + ballRadius > canvas.height) {
      ballSpeedY = -ballSpeedY;
    }

    // Ball collision left paddle
    if (ballX - ballRadius < 10 + paddleWidth &&
      ballY > leftPaddleY &&
      ballY < leftPaddleY + paddleHeight) {
      ballSpeedX = -ballSpeedX;
      // Add some vertical speed based on hit position
      const deltaY = ballY - (leftPaddleY + paddleHeight / 2);
      ballSpeedY = deltaY * 0.25;
    }

    // Ball collision right paddle
    if (ballX + ballRadius > canvas.width - 10 - paddleWidth &&
      ballY > rightPaddleY &&
      ballY < rightPaddleY + paddleHeight) {
      ballSpeedX = -ballSpeedX;
      const deltaY = ballY - (rightPaddleY + paddleHeight / 2);
      ballSpeedY = deltaY * 0.25;
    }

    // Scoring
    if (ballX - ballRadius < 0) {
      rightScore++;
      resetBall(1);
    } else if (ballX + ballRadius > canvas.width) {
      leftScore++;
      resetBall(-1);
    }

    draw();
    updateStatus();
  }

  function updateStatus() {
    status.textContent = `Use W/S to move paddle | Score: You ${leftScore} - AI ${rightScore}`;
  }

  function gameLoop() {
    update();
    requestAnimationFrame(gameLoop);
  }

  // Keyboard input
  window.addEventListener("keydown", e => {
    if (e.key === "w" || e.key === "W") keysPressed.w = true;
    if (e.key === "s" || e.key === "S") keysPressed.s = true;
  });

  window.addEventListener("keyup", e => {
    if (e.key === "w" || e.key === "W") keysPressed.w = false;
    if (e.key === "s" || e.key === "S") keysPressed.s = false;
  });

  // Controls buttons
  const controls = document.createElement("div");
  controls.className = "controls";

  const resetBtn = document.createElement("button");
  resetBtn.textContent = "Reset";
  resetBtn.onclick = () => {
    leftScore = 0;
    rightScore = 0;
    resetBall(1);
  };

  const closeBtn = document.createElement("button");
  closeBtn.textContent = "Close";
  closeBtn.onclick = () => {
    const widgetBox = document.querySelector(".widget-box");
    if (widgetBox) {
      widgetBox.innerHTML = "";
      if (window.renderLauncherButtons) window.renderLauncherButtons();
    }
  };

  controls.appendChild(resetBtn);
  controls.appendChild(closeBtn);

  container.appendChild(controls);

  const widgetBox = document.querySelector(".widget-box");
  if (widgetBox) {
    widgetBox.innerHTML = "";
    widgetBox.appendChild(container);
  } else {
    document.body.appendChild(container);
  }

  resetBall(1);
  gameLoop();
})();
