
(function () {
  if (document.getElementById("hanoi-container")) return;

  const style = document.createElement("style");
  style.textContent = `
    #hanoi-container {
      width: 320px;
      padding: 16px;
      background: #fff;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.15);
      font-family: Arial, sans-serif;
      color: #333;
      user-select: none;
      text-align: center;
    }
    .peg {
      display: inline-block;
      width: 80px;
      height: 120px;
      margin: 0 10px;
      background: #f1f1f1;
      border-radius: 8px;
      position: relative;
      vertical-align: top;
    }
    .disk {
      position: absolute;
      height: 20px;
      border-radius: 4px;
      text-align: center;
      line-height: 20px;
      color: white;
      font-weight: bold;
    }
    .disk[data-size="1"] { width: 40px; background: #2196f3; left: 20px; }
    .disk[data-size="2"] { width: 60px; background: #4caf50; left: 10px; }
    .disk[data-size="3"] { width: 80px; background: #f44336; left: 0; }
    .peg.selected {
      border: 2px solid #007bff;
    }
    #hanoi-message {
      margin-top: 12px;
      min-height: 24px;
      font-weight: bold;
    }
  `;
  document.head.appendChild(style);

  const container = document.createElement("div");
  container.id = "hanoi-container";
  container.innerHTML = `
    <div><strong>Mini Tower of Hanoi</strong></div><br>
    <div id="pegs" style="display: flex; justify-content: center;"></div>
    <div id="hanoi-message"></div>
  `;

  const widgetBox = document.querySelector(".widget-box");
  if (widgetBox) {
    widgetBox.innerHTML = "";
    widgetBox.appendChild(container);
  } else {
    document.body.appendChild(container);
  }

  const pegsContainer = container.querySelector("#pegs");
  const message = container.querySelector("#hanoi-message");

  const pegCount = 3;
  const diskCount = 3;
  const pegs = [];

  let selectedPegIndex = null;

  function renderPegs() {
    pegsContainer.innerHTML = "";
    pegs.forEach((peg, index) => {
      const pegEl = document.createElement("div");
      pegEl.className = "peg";
      pegEl.dataset.index = index;
      if (index === selectedPegIndex) {
        pegEl.classList.add("selected");
      }

      peg.forEach((diskSize, i) => {
        const disk = document.createElement("div");
        disk.className = "disk";
        disk.dataset.size = diskSize;
        disk.style.bottom = `${i * 22}px`;
        disk.textContent = diskSize;
        pegEl.appendChild(disk);
      });

      pegEl.addEventListener("click", () => handlePegClick(index));
      pegsContainer.appendChild(pegEl);
    });
  }

  function handlePegClick(index) {
    if (selectedPegIndex === null) {
      // Select source peg
      if (pegs[index].length === 0) return;
      selectedPegIndex = index;
    } else {
      // Attempt to move from selected to current
      if (index !== selectedPegIndex) {
        const fromPeg = pegs[selectedPegIndex];
        const toPeg = pegs[index];
        const disk = fromPeg[fromPeg.length - 1];

        if (
          toPeg.length === 0 ||
          toPeg[toPeg.length - 1] > disk
        ) {
          toPeg.push(fromPeg.pop());
          message.textContent = "";
        } else {
          message.textContent = "❌ Invalid move!";
        }

        // Check for win
        if (pegs[2].length === diskCount) {
          message.textContent = "🎉 You solved it!";
        }
      }
      selectedPegIndex = null;
    }
    renderPegs();
  }

  // Initialize pegs
  for (let i = 0; i < pegCount; i++) {
    pegs[i] = [];
  }
  for (let i = diskCount; i >= 1; i--) {
    pegs[0].push(i);
  }

  renderPegs();
})();

