(function () {
  if (document.getElementById("whack-a-mole-container")) return;

  const style = document.createElement("style");
  style.textContent = `
    #whack-a-mole-container {
      font-family: Arial, sans-serif;
      width: 300px;
      background: #f9f9f9;
      border-radius: 12px;
      padding: 16px;
      box-sizing: border-box;
      user-select: none;
      text-align: center;
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(3, 80px);
      grid-template-rows: repeat(3, 80px);
      gap: 10px;
      justify-content: center;
      margin: 16px 0;
    }
    .cell {
      width: 80px;
      height: 80px;
      background: #ddd;
      border-radius: 12px;
      position: relative;
      cursor: pointer;
      box-shadow: inset 0 0 5px rgba(0,0,0,0.1);
      transition: background-color 0.2s;
    }
    .cell.active {
      background: #8bc34a;
    }
    .mole {
      width: 48px;
      height: 48px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: url("https://i.imgur.com/rs7h0wS.png") no-repeat center center;
      background-size: contain;
      pointer-events: none;
      user-select: none;
    }
    .scoreboard {
      font-size: 18px;
      margin-bottom: 8px;
    }
    .timer {
      font-size: 14px;
      margin-bottom: 12px;
      color: #555;
    }
    button {
      padding: 8px 16px;
      border: none;
      border-radius: 6px;
      background: #007bff;
      color: white;
      font-size: 16px;
      cursor: pointer;
      user-select: none;
      transition: background-color 0.3s;
    }
    button:hover {
      background: #0056b3;
    }
  `;
  document.head.appendChild(style);

  const container = document.createElement("div");
  container.id = "whack-a-mole-container";

  const scoreboard = document.createElement("div");
  scoreboard.className = "scoreboard";
  scoreboard.textContent = "Score: 0";

  const timerDisplay = document.createElement("div");
  timerDisplay.className = "timer";
  timerDisplay.textContent = "Time: 30s";

  const grid = document.createElement("div");
  grid.className = "grid";

  const cells = [];
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.className = "cell";
    grid.appendChild(cell);
    cells.push(cell);
  }

  const resetBtn = document.createElement("button");
  resetBtn.textContent = "Start Game";

  container.appendChild(scoreboard);
  container.appendChild(timerDisplay);
  container.appendChild(grid);
  container.appendChild(resetBtn);

  const widgetBox = document.querySelector(".widget-box");
  if (widgetBox) {
    widgetBox.innerHTML = "";
    widgetBox.appendChild(container);
  } else {
    document.body.appendChild(container);
  }

  let score = 0;
  let timeLeft = 30;
  let moleIndex = null;
  let gameInterval = null;
  let timerInterval = null;
  let gameRunning = false;

  function showMole() {
    if (moleIndex !== null) {
      cells[moleIndex].classList.remove("active");
      cells[moleIndex].innerHTML = "";
    }
    moleIndex = Math.floor(Math.random() * cells.length);
    cells[moleIndex].classList.add("active");
    const mole = document.createElement("div");
    mole.className = "mole";
    cells[moleIndex].appendChild(mole);
  }

  function whack(index) {
    if (!gameRunning) return;
    if (index === moleIndex) {
      score++;
      scoreboard.textContent = `Score: ${score}`;
      cells[moleIndex].classList.remove("active");
      cells[moleIndex].innerHTML = "";
      moleIndex = null;
      showMole();
    }
  }

  cells.forEach((cell, i) => {
    cell.addEventListener("click", () => whack(i));
  });

  function tickTimer() {
    timeLeft--;
    timerDisplay.textContent = `Time: ${timeLeft}s`;
    if (timeLeft <= 0) {
      endGame();
    }
  }

  function startGame() {
    if (gameRunning) return;
    score = 0;
    timeLeft = 30;
    scoreboard.textContent = "Score: 0";
    timerDisplay.textContent = "Time: 30s";
    gameRunning = true;
    resetBtn.textContent = "Restart Game";
    showMole();

    gameInterval = setInterval(showMole, 800);
    timerInterval = setInterval(tickTimer, 1000);
  }

  function endGame() {
    gameRunning = false;
    clearInterval(gameInterval);
    clearInterval(timerInterval);
    if (moleIndex !== null) {
      cells[moleIndex].classList.remove("active");
      cells[moleIndex].innerHTML = "";
      moleIndex = null;
    }
    timerDisplay.textContent = "Time: 0s";
    alert(`Game Over! Your score: ${score}`);
  }

  resetBtn.addEventListener("click", () => {
    if (gameRunning) {
      endGame();
    }
    startGame();
  });
})();
