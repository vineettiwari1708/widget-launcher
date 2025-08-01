(function () {
  if (document.getElementById("quick-maze-container")) return;

  const widgetBox = document.querySelector(".widget-box");
  if (!widgetBox) return;
  widgetBox.innerHTML = "";

  const style = document.createElement("style");
  style.textContent = `
    #quick-maze-container {
      font-family: sans-serif;
      width: 320px;
      margin: 0 auto;
      background: #f9f9f9;
      border-radius: 12px;
      padding: 16px;
      text-align: center;
      box-shadow: 0 2px 8px rgba(0,0,0,0.15);
    }
    .maze-grid {
      display: grid;
      grid-template-columns: repeat(6, 32px);
      grid-template-rows: repeat(6, 32px);
      gap: 4px;
      margin: 10px auto;
    }
    .maze-cell {
      width: 32px;
      height: 32px;
      background: #e0e0e0;
      border-radius: 4px;
      box-sizing: border-box;
    }
    .wall { background: #333; }
    .player { background: #4caf50; }
    .exit { background: #f44336; }
    .maze-controls {
      margin-top: 12px;
    }
    .maze-btn {
      margin: 4px;
      padding: 6px 10px;
      background: #2196f3;
      color: white;
      border: none;
      border-radius: 6px;
      cursor: pointer;
    }
  `;
  document.head.appendChild(style);

  const container = document.createElement("div");
  container.id = "quick-maze-container";

  const maze = [
    [1,1,1,1,1,1],
    [1,0,0,0,1,1],
    [1,0,1,0,0,1],
    [1,0,1,1,0,1],
    [1,0,0,0,0,1],
    [1,1,1,1,0,1],
  ];
  const rows = maze.length;
  const cols = maze[0].length;
  const start = { x: 1, y: 1 };
  const end = { x: 4, y: 5 };

  let player = { ...start };

  const grid = document.createElement("div");
  grid.className = "maze-grid";

  function renderMaze() {
    grid.innerHTML = "";
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const cell = document.createElement("div");
        cell.className = "maze-cell";
        if (maze[y][x] === 1) cell.classList.add("wall");
        if (x === player.x && y === player.y) cell.classList.add("player");
        if (x === end.x && y === end.y) cell.classList.add("exit");
        grid.appendChild(cell);
      }
    }
  }

  function move(dx, dy) {
    const newX = player.x + dx;
    const newY = player.y + dy;
    if (
      newX >= 0 &&
      newX < cols &&
      newY >= 0 &&
      newY < rows &&
      maze[newY][newX] === 0
    ) {
      player.x = newX;
      player.y = newY;
      renderMaze();
      if (player.x === end.x && player.y === end.y) {
        setTimeout(() => alert("🎉 You escaped the maze!"), 100);
      }
    }
  }

  document.addEventListener("keydown", (e) => {
    switch (e.key) {
      case "ArrowUp": move(0, -1); break;
      case "ArrowDown": move(0, 1); break;
      case "ArrowLeft": move(-1, 0); break;
      case "ArrowRight": move(1, 0); break;
    }
  });

  const controls = document.createElement("div");
  controls.className = "maze-controls";
  ["⬆️", "⬇️", "⬅️", "➡️"].forEach((arrow, i) => {
    const btn = document.createElement("button");
    btn.className = "maze-btn";
    btn.textContent = arrow;
    btn.onclick = () => {
      if (i === 0) move(0, -1);
      if (i === 1) move(0, 1);
      if (i === 2) move(-1, 0);
      if (i === 3) move(1, 0);
    };
    controls.appendChild(btn);
  });

  container.appendChild(grid);
  container.appendChild(controls);
  widgetBox.appendChild(container);
  renderMaze();
})();
