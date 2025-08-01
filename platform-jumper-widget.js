(function () {
  if (document.getElementById("platform-jumper-container")) return;

  const widgetBox = document.querySelector(".widget-box");
  if (!widgetBox) return;
  widgetBox.innerHTML = "";

  const style = document.createElement("style");
  style.textContent = `
    #platform-jumper-container {
      font-family: sans-serif;
      text-align: center;
      background: #fdfdfd;
      border-radius: 12px;
      padding: 16px;
      max-width: 320px;
      margin: auto;
    }
    #jumper-canvas {
      border: 2px solid #000;
      background: #d0f0ff;
      border-radius: 8px;
      display: block;
      margin: 0 auto 10px;
    }
    .jumper-btn, .close-btn {
      padding: 6px 12px;
      margin: 5px;
      border: none;
      border-radius: 6px;
      color: white;
      font-weight: bold;
      cursor: pointer;
    }
    .jumper-btn {
      background: #28a745;
    }
    .close-btn {
      background: #dc3545;
    }
  `;
  document.head.appendChild(style);

  const container = document.createElement("div");
  container.id = "platform-jumper-container";

  const canvas = document.createElement("canvas");
  canvas.id = "jumper-canvas";
  canvas.width = 300;
  canvas.height = 200;
  container.appendChild(canvas);

  const jumpBtn = document.createElement("button");
  jumpBtn.className = "jumper-btn";
  jumpBtn.textContent = "Jump";

  const closeBtn = document.createElement("button");
  closeBtn.className = "close-btn";
  closeBtn.textContent = "Close";

  const btnRow = document.createElement("div");
  btnRow.appendChild(jumpBtn);
  btnRow.appendChild(closeBtn);
  container.appendChild(btnRow);

  widgetBox.appendChild(container);

  const ctx = canvas.getContext("2d");

  let player = { x: 50, y: 150, vy: 0, jumping: false };
  let gravity = 0.5;
  let jumpStrength = -8;

  let platforms = [
    { x: 20, y: 170, w: 60, h: 10 },
    { x: 120, y: 140, w: 60, h: 10 },
    { x: 220, y: 110, w: 60, h: 10 }
  ];

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw platforms
    ctx.fillStyle = "#444";
    for (let p of platforms) {
      ctx.fillRect(p.x, p.y, p.w, p.h);
    }

    // Draw player
    ctx.fillStyle = "#007bff";
    ctx.beginPath();
    ctx.arc(player.x, player.y, 10, 0, Math.PI * 2);
    ctx.fill();
  }

  function update() {
    player.vy += gravity;
    player.y += player.vy;

    // Collision with platforms
    for (let p of platforms) {
      if (
        player.y + 10 > p.y &&
        player.y + 10 < p.y + p.h &&
        player.x > p.x &&
        player.x < p.x + p.w &&
        player.vy > 0
      ) {
        player.y = p.y - 10;
        player.vy = 0;
        player.jumping = false;
      }
    }

    // Fall off screen reset
    if (player.y > canvas.height + 20) {
      player.y = 150;
      player.vy = 0;
      player.jumping = false;
      player.x = 50;
    }

    draw();
    requestAnimationFrame(update);
  }

  jumpBtn.addEventListener("click", () => {
    if (!player.jumping) {
      player.vy = jumpStrength;
      player.jumping = true;
    }
  });

  closeBtn.addEventListener("click", () => {
    if (typeof window.renderLauncherButtons === "function") {
      widgetBox.innerHTML = "";
      window.renderLauncherButtons();
    }
  });

  draw();
  update();
})();
