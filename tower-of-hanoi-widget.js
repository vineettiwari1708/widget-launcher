(function () {
  if (document.getElementById("hanoi-widget-container")) return;

  const widgetBox = document.querySelector(".widget-box");
  if (!widgetBox) return;

  widgetBox.innerHTML = "";

  const style = document.createElement("style");
  style.textContent = `
    #hanoi-widget-container {
      font-family: sans-serif;
      padding: 16px;
      background: #f8f8f8;
      border-radius: 12px;
      width: 100%;
      max-width: 300px;
      margin: 10px auto;
      text-align: center;
    }
    .hanoi-pegs {
      display: flex;
      justify-content: space-between;
      margin: 20px 0;
    }
    .hanoi-peg {
      width: 80px;
      height: 120px;
      background: #e0e0e0;
      border-radius: 8px;
      position: relative;
      cursor: pointer;
    }
    .hanoi-peg.selected {
      border: 2px solid #007bff;
    }
    .hanoi-disk {
      position: absolute;
      height: 20px;
      border-radius: 4px;
      text-align: center;
      line-height: 20px;
      color: white;
      font-weight: bold;
    }
    .hanoi-disk[data-size="1"] { width: 40px; background: #2196f3; left: 20px; }
    .hanoi-disk[data-size="2"] { width: 60px; background: #4caf50; left: 10px; }
    .hanoi-disk[data-size="3"] { width: 80px; background: #f44336; left: 0px; }
    .message {
      font-size: 16px;
      min-height: 24px;
      font-weight: bold;
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
  container.id = "hanoi-widget-container";

  const message = document.createElement("div");
  message.className = "message";
  message.textContent = "Solve the puzzle by moving all disks to the rightmost peg.";

  const pegsEl = document.createElement("div");
  pegsEl.className = "hanoi-pegs";

  const resetBtn = document.createElement("button");
  resetBtn.className = "reset-btn";
  resetBtn.textContent = "Reset";

  const closeBtn = document.createElement("button");
  closeBtn.className = "close-btn";
  closeBtn.textContent = "Close";

  const buttonRow = document.createElement("div");
  buttonRow.className = "button-row";
  buttonRow.appendChild(resetBtn);
  buttonRow.appendChild(closeBtn);

  container.appendChild(message);
  container.appendChild(pegsEl);
  container.appendChild(buttonRow);
  widgetBox.appendChild(container);

  const pegCount = 3;
  const diskCount = 3;
  let pegs = [];
  let selectedPeg = null;

  function initGame() {
    pegs = Array.from({ length: pegCount }, () => []);
    for (let i = diskCount; i >= 1; i--) {
      pegs[0].push(i);
    }
    selectedPeg = null;
    message.textContent = "Solve the puzzle by moving all disks to the rightmost peg.";
    renderPegs();
  }

  function renderPegs() {
    pegsEl.innerHTML = "";
    pegs.forEach((peg, i) => {
      const pegEl = document.createElement("div");
      pegEl.className = "hanoi-peg";
      if (i === selectedPeg) pegEl.classList.add("selected");

      peg.forEach((disk, dIndex) => {
        const diskEl = document.createElement("div");
        diskEl.className = "hanoi-disk";
        diskEl.dataset.size = disk;
        diskEl.textContent = disk;
        diskEl.style.bottom = `${dIndex * 22}px`;
        pegEl.appendChild(diskEl);
      });

      pegEl.addEventListener("click", () => handlePegClick(i));
      pegsEl.appendChild(pegEl);
    });
  }

  function handlePegClick(index) {
    if (selectedPeg === null) {
      if (pegs[index].length === 0) return;
      selectedPeg = index;
    } else {
      if (selectedPeg !== index) {
        const from = pegs[selectedPeg];
        const to = pegs[index];
        const disk = from[from.length - 1];
        const topTo = to[to.length - 1];

        if (!topTo || topTo > disk) {
          to.push(from.pop());
          message.textContent = "";
        } else {
          message.textContent = "❌ Invalid move!";
        }

        if (pegs[2].length === diskCount) {
          message.textContent = "🎉 You solved it!";
        }
      }
      selectedPeg = null;
    }
    renderPegs();
  }

  resetBtn.addEventListener("click", () => {
    initGame();
  });

  closeBtn.addEventListener("click", () => {
    if (typeof window.renderLauncherButtons === "function") {
      widgetBox.innerHTML = "";
      window.renderLauncherButtons();
    }
  });

  initGame();
})();
