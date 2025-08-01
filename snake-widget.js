(function () {
  if (document.getElementById("snake-game-container")) return;

  const style = document.createElement("style");
  style.textContent = `
    #snake-game-container {
      font-family: sans-serif;
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
      max-width: 360px;
      background: #f4f4f4;
      border-radius: 12px;
      padding: 10px;
    }
    .snake-grid {
      display: grid;
      grid-template-columns: repeat(15, 20px);
      grid-template-rows: repeat(15, 20px);
      gap: 1px;
      background: #ccc;
    }
    .snake-cell {
      width: 20px;
      height: 20px;
      background: white;
    }
    .snake-body {
      background: #007bff !important;
    }
    .snake-food {
      background: red !important;
    }
    .snake-controls {
      margin-top: 10px;
      display: flex;
      gap: 10px;
    }
    .snake-btn {
      padding: 6px 12px;
      background: #007bff;
      color: white;
      border: none;
      border-radius: 6px;
      cursor: pointer;
    }
    .snake-btn.danger {
      background: #dc3545;
    }
  `;
  document.head.appendChild(style);

  const container = document.createElement("div");
  container.id = "snake-game-container";

  const grid = document.createElement("div");
  grid.className = "snake-grid";

  const size = 15;
  const cells = [];

  for (let i = 0; i < size * size; i++) {
    const cell = document.createElement("div");
    cell.className = "snake-cell";
    grid.appendChild(cell);
    cells.push(cell);
  }

  let snake = [112, 111]; // initial position
  let direction = 1; // right
  let food = null;
  let interval = null;
  let gameOver = false;

  function placeFood() {
    do {
      food = Math.floor(Math.random() * cells.length);
    } while (snake.includes(food));
    cells[food].classList.add("snake-food");
  }

  function draw() {
    cells.forEach(cell => {
      cell.classList.remove("snake-body", "snake-food");
    });
    snake.forEach(index => cells[index].classList.add("snake-body"));
    if (food !== null) cells[food].classList.add("snake-food");
  }

  function move() {
    if (gameOver) return;
    const head = snake[0];
    let next = head + direction;

    // Wall collision
    const x = head % size;
    if (
      (direction === 1 && x === size - 1) ||
      (direction === -1 && x === 0) ||
      (direction === -size && head < size) ||
      (direction === size && head >= size * (size - 1))
    ) {
      endGame();
      return;
    }

    // Self collision
    if (snake.includes(next)) {
      endGame();
      return;
    }

    snake.unshift(next);

    if (next === food) {
      placeFood();
    } else {
      snake.pop();
    }

    draw();
  }

  function endGame() {
    clearInterval(interval);
    gameOver = true;
    alert("Game Over!");
  }

  function resetGame() {
    clearInterval(interval);
    snake = [112, 111];
    direction = 1;
    gameOver = false;
    placeFood();
    draw();
    interval = setInterval(move, 200);
  }

  window.addEventListener("keydown", (e) => {
    switch (e.key) {
      case "ArrowUp": if (direction !== size) direction = -size; break;
      case "ArrowDown": if (direction !== -size) direction = size; break;
      case "ArrowLeft": if (direction !== 1) direction = -1; break;
      case "ArrowRight": if (direction !== -1) direction = 1; break;
    }
  });

  const controls = document.createElement("div");
  controls.className = "snake-controls";

  const resetBtn = document.createElement("button");
  resetBtn.className = "snake-btn";
  resetBtn.textContent = "Reset";
  resetBtn.onclick = resetGame;

  const closeBtn = document.createElement("button");
  closeBtn.className = "snake-btn danger";
  closeBtn.textContent = "Close";
  closeBtn.onclick = () => {
    const widgetBox = document.querySelector(".widget-box");
    if (widgetBox) {
      widgetBox.innerHTML = "";
      if (window.renderLauncherButtons) {
        window.renderLauncherButtons();
      }
    }
  };

  controls.appendChild(resetBtn);
  controls.appendChild(closeBtn);

  container.appendChild(grid);
  container.appendChild(controls);

  const widgetBox = document.querySelector(".widget-box");
  if (widgetBox) {
    widgetBox.innerHTML = "";
    widgetBox.appendChild(container);
  } else {
    document.body.appendChild(container);
  }

  resetGame();
})();
