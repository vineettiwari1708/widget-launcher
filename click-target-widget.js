(function () {
  if (document.getElementById("click-target-container")) return;

  const style = document.createElement("style");
  style.textContent = `
    #click-target-container {
      width: 320px;
      height: 250px;
      background: #fff;
      border-radius: 12px;
      box-shadow: 0 2px 12px rgba(0,0,0,0.15);
      position: relative;
      overflow: hidden;
      user-select: none;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 12px;
      box-sizing: border-box;
    }
    #score {
      font-size: 20px;
      font-weight: 600;
      margin-bottom: 8px;
      color: #007bff;
    }
    #timer {
      font-size: 18px;
      margin-bottom: 12px;
      color: #444;
    }
    #game-area {
      flex: 1;
      position: relative;
      width: 100%;
      background: #e0e7ff;
      border-radius: 12px;
      cursor: pointer;
    }
    .target-circle {
      position: absolute;
      border-radius: 50%;
      background: #ff3b3b;
      width: 40px;
      height: 40px;
      box-shadow: 0 0 8px 2px rgba(255,59,59,0.7);
      transition: transform 0.1s ease;
    }
    .target-circle:active {
      transform: scale(0.8);
    }
    #start-btn {
      margin-top: 12px;
      padding: 8px 20px;
      font-size: 16px;
      background: #007bff;
      color: white;
      border: none;
      border-radius: 10px;
      cursor: pointer;
      user-select: none;
      font-weight: 600;
      transition: background-color 0.3s;
    }
    #start-btn:hover {
      background: #0056b3;
    }
  `;
  document.head.appendChild(style);

  const container = document.createElement("div");
  container.id = "click-target-container";

  const scoreEl = document.createElement("div");
  scoreEl.id = "score";
  scoreEl.textContent = "Score: 0";

  const timerEl = document.createElement("div");
  timerEl.id = "timer";
  timerEl.textContent = "Time: 30s";

  const gameArea = document.createElement("div");
  gameArea.id = "game-area";

  const startBtn = document.createElement("button");
  startBtn.id = "start-btn";
  startBtn.textContent = "Start Game";

  container.appendChild(scoreEl);
  container.appendChild(timerEl);
  container.appendChild(gameArea);
  container.appendChild(startBtn);

  // Append to widget panel or body
  const widgetBox = document.querySelector(".widget-box");
  if (widgetBox) {
    widgetBox.innerHTML = "";
    widgetBox.appendChild(container);
  } else {
    document.body.appendChild(container);
  }

  let score = 0;
  let timeLeft = 30;
  let gameInterval = null;
  let countdownInterval = null;
  let currentTarget = null;

  function randomPosition() {
    const padding = 40; // radius of circle
    const maxX = gameArea.clientWidth - padding;
    const maxY = gameArea.clientHeight - padding;
    return {
      x: Math.floor(Math.random() * maxX),
      y: Math.floor(Math.random() * maxY),
    };
  }

  function createTarget() {
    if (currentTarget) {
      // Missed click - remove old target without scoring
      gameArea.removeChild(currentTarget);
      currentTarget = null;
    }
    const pos = randomPosition();
    const circle = document.createElement("div");
    circle.className = "target-circle";
    circle.style.left = pos.x + "px";
    circle.style.top = pos.y + "px";

    circle.addEventListener("click", () => {
      score++;
      scoreEl.textContent = `Score: ${score}`;
      gameArea.removeChild(circle);
      currentTarget = null;
    });

    gameArea.appendChild(circle);
    currentTarget = circle;

    // Remove target after 800ms if not clicked
    setTimeout(() => {
      if (currentTarget === circle) {
        gameArea.removeChild(circle);
        currentTarget = null;
      }
    }, 800);
  }

  function startGame() {
    score = 0;
    timeLeft = 30;
    scoreEl.textContent = "Score: 0";
    timerEl.textContent = `Time: ${timeLeft}s`;
    startBtn.disabled = true;
    gameArea.innerHTML = "";
    currentTarget = null;

    gameInterval = setInterval(createTarget, 1000);
    countdownInterval = setInterval(() => {
      timeLeft--;
      timerEl.textContent = `Time: ${timeLeft}s`;
      if (timeLeft <= 0) {
        endGame();
      }
    }, 1000);
  }

  function endGame() {
    clearInterval(gameInterval);
    clearInterval(countdownInterval);
    gameInterval = null;
    countdownInterval = null;
    if (currentTarget) {
      gameArea.removeChild(currentTarget);
      currentTarget = null;
    }
    startBtn.disabled = false;
    alert(`Game Over! Your score: ${score}`);
  }

  startBtn.addEventListener("click", startGame);
})();
