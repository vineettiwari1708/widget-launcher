(function () {
  if (document.getElementById("mini-maze-solver")) return;

  const style = document.createElement("style");
  style.textContent = `
    #mini-maze-solver {
      width: 300px;
      height: 320px;
      background: #fafafa;
      border-radius: 16px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      display: flex;
      flex-direction: column;
      align-items: center;
      font-family: monospace, monospace;
      user-select: none;
      padding: 16px;
      box-sizing: border-box;
      color: #333;
    }
    #maze {
      display: grid;
      grid-template-columns: repeat(7, 32px);
      grid-template-rows: repeat(7, 32px);
      gap: 2px;
      margin-bottom: 12px;
    }
    .cell {
      width: 32px;
      height: 32px;
      background: white;
      border-radius: 4px;
      box-sizing: border-box;
      border: 1px solid #ccc;
    }
    .wall {
      background: #444;
    }
    .player {
      background: #007bff;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-weight: bold;
      font-size: 20px;
    }
    .goal {
      background: #28a745;
    }
    #message {
      font-size: 16px;
      min-height: 20px;
      margin-top: 4px;
      font-weight: 600;
      color: #28a745;
      user-select: none;
    }
  `;

  document.head.appendChild(style);

  const container = document.createElement("div");
  container.id = "mini-maze-solver";

  const mazeEl = document.createElement("div");
  mazeEl.id = "maze";

  const message = document.createElement("div");
  message.id = "message";
  message.textContent = "Use arrow keys to move";

  // Maze map legend:
  // 0 = empty path
  // 1 = wall
  // 2 = goal
  const mazeMap = [
    [1,1,1,1,1,1,1],
    [1,0,0,0,1,0,1],
    [1,0,1,0,1,0,1],
    [1,0,1,0,0,0,1],
    [1,0,1,1,1,0,1],
    [1,0,0,0,0,2,1],
    [1,1,1,1,1,1,1]
  ];

  let playerPos = { x: 1, y: 1 };

  function drawMaze() {
    mazeEl.innerHTML = "";
    for(let y=0; y<7; y++) {
      for(let x=0; x<7; x++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        const val = mazeMap[y][x];
        if(val === 1) cell.classList.add("wall");
        else if(val === 2) cell.classList.add("goal");
        if(playerPos.x === x && playerPos.y === y) {
          cell.classList.add("player");
          cell.textContent = "☺";
        }
        mazeEl.appendChild(cell);
      }
    }
  }

  function canMove(x, y) {
    if(x < 0 || x >= 7 || y < 0 || y >= 7) return false;
    return mazeMap[y][x] !== 1;
  }

  function movePlayer(dx, dy) {
    const newX = playerPos.x + dx;
    const newY = playerPos.y + dy;
    if(canMove(newX, newY)) {
      playerPos.x = newX;
      playerPos.y = newY;
      drawMaze();
      if(mazeMap[newY][newX] === 2) {
        message.textContent = "🎉 You reached the goal!";
        window.removeEventListener("keydown", handleKey);
      } else {
        message.textContent = "Use arrow keys to move";
      }
    }
  }

  function handleKey(e) {
    switch(e.key) {
      case "ArrowUp": e.preventDefault(); movePlayer(0, -1); break;
      case "ArrowDown": e.preventDefault(); movePlayer(0, 1); break;
      case "ArrowLeft": e.preventDefault(); movePlayer(-1, 0); break;
      case "ArrowRight": e.preventDefault(); movePlayer(1, 0); break;
    }
  }

  drawMaze();
  window.addEventListener("keydown", handleKey);

  container.appendChild(mazeEl);
  container.appendChild(message);

  // Append to widget panel or body
  const widgetBox = document.querySelector(".widget-box");
  if (widgetBox) {
    widgetBox.innerHTML = "";
    widgetBox.appendChild(container);
  } else {
    document.body.appendChild(container);
  }
})();
