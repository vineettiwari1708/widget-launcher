(function () {
  if (document.getElementById("one-line-drawing-container")) return;

  const widgetBox = document.querySelector(".widget-box");
  if (!widgetBox) return;

  widgetBox.innerHTML = "";

  const style = document.createElement("style");
  style.textContent = `
    #one-line-drawing-container {
      font-family: sans-serif;
      padding: 16px;
      background: #f8f8f8;
      border-radius: 12px;
      width: 100%;
      max-width: 320px;
      margin: 10px auto;
      text-align: center;
    }
    .grid {
      position: relative;
      width: 240px;
      height: 240px;
      margin: 16px auto;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-template-rows: repeat(3, 1fr);
      gap: 0;
    }
    .dot {
      width: 24px;
      height: 24px;
      background: #333;
      border-radius: 50%;
      margin: auto;
      position: relative;
      z-index: 2;
      cursor: pointer;
    }
    .line-canvas {
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      z-index: 1;
    }
    .message {
      font-size: 16px;
      font-weight: bold;
      min-height: 24px;
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
  container.id = "one-line-drawing-container";

  const message = document.createElement("div");
  message.className = "message";
  message.textContent = "Draw a path connecting all dots";

  const grid = document.createElement("div");
  grid.className = "grid";

  const canvas = document.createElement("canvas");
  canvas.className = "line-canvas";
  canvas.width = 240;
  canvas.height = 240;
  grid.appendChild(canvas);

  const ctx = canvas.getContext("2d");

  const dots = [];
  const dotPositions = [];
  const size = 3; // 3x3 grid
  const dotSize = 24;
  const spacing = 80;
  let path = [];
  let visited = new Set();
  let drawing = false;

  for (let i = 0; i < size * size; i++) {
    const dot = document.createElement("div");
    dot.className = "dot";
    const row = Math.floor(i / size);
    const col = i % size;
    dot.dataset.index = i;
    dot.style.gridColumn = col + 1;
    dot.style.gridRow = row + 1;
    grid.appendChild(dot);
    dots.push(dot);
    dotPositions.push({
      x: col * spacing + spacing / 2,
      y: row * spacing + spacing / 2,
    });
  }

  function drawLines() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "#007bff";
    ctx.lineWidth = 4;
    ctx.beginPath();
    path.forEach((idx, i) => {
      const { x, y } = dotPositions[idx];
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    ctx.stroke();
  }

  function handleDotClick(e) {
    if (drawing === false) {
      path = [];
      visited = new Set();
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      message.textContent = "";
      drawing = true;
    }

    const idx = parseInt(e.target.dataset.index, 10);

    if (visited.has(idx)) return;

    if (path.length === 0 || isAdjacent(path[path.length - 1], idx)) {
      path.push(idx);
      visited.add(idx);
      drawLines();

      if (visited.size === size * size) {
        message.textContent = "🎉 You connected all dots!";
        drawing = false;
      }
    }
  }

  function isAdjacent(a, b) {
    const ax = a % size, ay = Math.floor(a / size);
    const bx = b % size, by = Math.floor(b / size);
    const dx = Math.abs(ax - bx), dy = Math.abs(ay - by);
    return (dx + dy === 1); // Only allow orthogonal moves (up/down/left/right)
  }

  const resetBtn = document.createElement("button");
  resetBtn.className = "reset-btn";
  resetBtn.textContent = "Reset";
  resetBtn.addEventListener("click", () => {
    path = [];
    visited.clear();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    message.textContent = "Draw a path connecting all dots";
    drawing = false;
  });

  const closeBtn = document.createElement("button");
  closeBtn.className = "close-btn";
  closeBtn.textContent = "Close";
  closeBtn.addEventListener("click", () => {
    if (typeof window.renderLauncherButtons === "function") {
      widgetBox.innerHTML = "";
      window.renderLauncherButtons();
    }
  });

  const buttonRow = document.createElement("div");
  buttonRow.className = "button-row";
  buttonRow.appendChild(resetBtn);
  buttonRow.appendChild(closeBtn);

  dots.forEach(dot => dot.addEventListener("click", handleDotClick));

  container.appendChild(message);
  container.appendChild(grid);
  container.appendChild(buttonRow);
  widgetBox.appendChild(container);
})();
