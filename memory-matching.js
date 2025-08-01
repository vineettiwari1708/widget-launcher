(function () {
  if (document.getElementById("memory-game-container")) return;

  const style = document.createElement("style");
  style.textContent = `
    #memory-game-container {
      font-family: sans-serif;
      padding: 12px;
      width: 100%;
      max-width: 360px;
      background: #fdfdfd;
      border-radius: 12px;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .memory-grid {
      display: grid;
      grid-template-columns: repeat(4, 64px);
      gap: 10px;
      margin-bottom: 12px;
    }
    .memory-card {
      width: 64px;
      height: 64px;
      background: #007bff;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 28px;
      color: white;
      cursor: pointer;
      transition: background 0.3s;
    }
    .memory-card.matched {
      background: #28a745;
      cursor: default;
    }
    .memory-card.revealed {
      background: #ffc107;
    }
    .btn-row {
      display: flex;
      gap: 10px;
      justify-content: center;
    }
    .memory-btn {
      padding: 6px 12px;
      font-size: 14px;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      background: #007bff;
      color: white;
    }
  `;
  document.head.appendChild(style);

  const container = document.createElement("div");
  container.id = "memory-game-container";

  const grid = document.createElement("div");
  grid.className = "memory-grid";

  const symbols = ["🍎", "🍌", "🍇", "🍓", "🍎", "🍌", "🍇", "🍓"];
  let cards = [];
  let firstCard = null;
  let lock = false;

  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  function setupGame() {
    grid.innerHTML = "";
    firstCard = null;
    lock = false;
    const shuffled = [...symbols];
    shuffle(shuffled);

    cards = shuffled.map((symbol, i) => {
      const card = document.createElement("div");
      card.className = "memory-card";
      card.dataset.symbol = symbol;
      card.dataset.index = i;
      card.addEventListener("click", () => {
        if (lock || card.classList.contains("matched") || card.classList.contains("revealed")) return;

        card.textContent = symbol;
        card.classList.add("revealed");

        if (!firstCard) {
          firstCard = card;
        } else {
          lock = true;
          if (firstCard.dataset.symbol === card.dataset.symbol) {
            firstCard.classList.add("matched");
            card.classList.add("matched");
            firstCard = null;
            lock = false;
          } else {
            setTimeout(() => {
              firstCard.textContent = "";
              card.textContent = "";
              firstCard.classList.remove("revealed");
              card.classList.remove("revealed");
              firstCard = null;
              lock = false;
            }, 700);
          }
        }
      });
      grid.appendChild(card);
      return card;
    });
  }

  const btnRow = document.createElement("div");
  btnRow.className = "btn-row";

  const resetBtn = document.createElement("button");
  resetBtn.className = "memory-btn";
  resetBtn.textContent = "Reset Game";
  resetBtn.onclick = () => setupGame();

  const closeBtn = document.createElement("button");
  closeBtn.className = "memory-btn";
  closeBtn.style.background = "#dc3545";
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

  btnRow.appendChild(resetBtn);
  btnRow.appendChild(closeBtn);

  container.appendChild(grid);
  container.appendChild(btnRow);

  const widgetBox = document.querySelector(".widget-box");
  if (widgetBox) {
    widgetBox.innerHTML = "";
    widgetBox.appendChild(container);
  } else {
    document.body.appendChild(container);
  }

  setupGame();
})();
