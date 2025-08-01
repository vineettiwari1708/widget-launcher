(function () {
  if (document.getElementById("simon-says-container")) return;

  const style = document.createElement("style");
  style.textContent = `
    #simon-says-container {
      font-family: sans-serif;
      background: #222;
      border-radius: 16px;
      padding: 16px;
      max-width: 320px;
      width: 100%;
      color: #fff;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 12px;
      user-select: none;
    }
    .btn-row {
      display: grid;
      grid-template-columns: repeat(2, 120px);
      grid-template-rows: repeat(2, 120px);
      gap: 12px;
    }
    .color-btn {
      border-radius: 16px;
      cursor: pointer;
      transition: filter 0.2s;
      box-shadow: 0 3px 8px rgba(0,0,0,0.3);
    }
    .color-btn:active,
    .color-btn.active {
      filter: brightness(1.5);
      box-shadow: 0 6px 15px rgba(255, 255, 255, 0.8);
    }
    .green { background: #28a745; }
    .red { background: #dc3545; }
    .yellow { background: #ffc107; }
    .blue { background: #007bff; }

    .info {
      font-size: 16px;
      min-height: 22px;
    }

    .btn-control {
      margin-top: 10px;
      display: flex;
      gap: 10px;
      justify-content: center;
      width: 100%;
    }
    .btn-mini {
      padding: 8px 16px;
      background: #007bff;
      border: none;
      border-radius: 6px;
      color: white;
      cursor: pointer;
      font-size: 14px;
      flex: 1;
      user-select: none;
      transition: background 0.3s;
    }
    .btn-mini:hover {
      background: #0056b3;
    }
    .btn-mini.danger {
      background: #dc3545;
    }
  `;
  document.head.appendChild(style);

  const container = document.createElement("div");
  container.id = "simon-says-container";

  // Game State
  const sequence = [];
  let playerIndex = 0;
  let playingSequence = false;
  let round = 0;

  const info = document.createElement("div");
  info.className = "info";
  info.textContent = "Press Start to play";

  // Color Buttons
  const colors = ["green", "red", "yellow", "blue"];
  const btnRow = document.createElement("div");
  btnRow.className = "btn-row";

  const buttons = {};

  colors.forEach(color => {
    const btn = document.createElement("div");
    btn.className = `color-btn ${color}`;
    btn.tabIndex = 0; // focusable
    btnRow.appendChild(btn);
    buttons[color] = btn;

    btn.addEventListener("click", () => {
      if (playingSequence || round === 0) return; // disable during playback or before start
      handlePlayerInput(color);
    });
  });

  function flashButton(color) {
    return new Promise(resolve => {
      const btn = buttons[color];
      btn.classList.add("active");
      setTimeout(() => {
        btn.classList.remove("active");
        setTimeout(resolve, 250);
      }, 600);
    });
  }

  async function playSequence() {
    playingSequence = true;
    for (const color of sequence) {
      await flashButton(color);
    }
    playingSequence = false;
    info.textContent = "Your turn!";
    playerIndex = 0;
  }

  function handlePlayerInput(color) {
    if (color !== sequence[playerIndex]) {
      info.textContent = "Wrong! Game over.";
      round = 0;
      startBtn.textContent = "Restart";
      return;
    }
    flashButton(color);
    playerIndex++;
    if (playerIndex === sequence.length) {
      round++;
      info.textContent = `Good! Round ${round}`;
      setTimeout(nextRound, 1000);
    }
  }

  function nextRound() {
    sequence.push(colors[Math.floor(Math.random() * colors.length)]);
    info.textContent = `Watch closely! Round ${round + 1}`;
    playSequence();
  }

  const startBtn = document.createElement("button");
  startBtn.className = "btn-mini";
  startBtn.textContent = "Start";
  startBtn.onclick = () => {
    if (playingSequence) return;
    if (round === 0) {
      sequence.length = 0;
      round = 0;
      playerIndex = 0;
      nextRound();
    } else {
      // Restart game
      sequence.length = 0;
      round = 0;
      playerIndex = 0;
      info.textContent = "Game restarted. Watch!";
      nextRound();
    }
    startBtn.textContent = "Restart";
  };

  const closeBtn = document.createElement("button");
  closeBtn.className = "btn-mini danger";
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

  const controlRow = document.createElement("div");
  controlRow.className = "btn-control";
  controlRow.appendChild(startBtn);
  controlRow.appendChild(closeBtn);

  container.appendChild(info);
  container.appendChild(btnRow);
  container.appendChild(controlRow);

  const widgetBox = document.querySelector(".widget-box");
  if (widgetBox) {
    widgetBox.innerHTML = "";
    widgetBox.appendChild(container);
  }
})();
