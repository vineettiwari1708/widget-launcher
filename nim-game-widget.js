(function () {
  if (document.getElementById("nim-game-container")) return;

  const widgetBox = document.querySelector(".widget-box");
  if (!widgetBox) return;

  widgetBox.innerHTML = "";

  const style = document.createElement("style");
  style.textContent = `
    #nim-game-container {
      font-family: sans-serif;
      padding: 16px;
      background: #f8f8f8;
      border-radius: 12px;
      width: 100%;
      max-width: 300px;
      margin: 10px auto;
      text-align: center;
    }
    .pile {
      margin: 12px 0;
    }
    .pile span {
      font-weight: bold;
      margin-right: 8px;
    }
    .pile button {
      padding: 4px 10px;
      margin: 2px;
      border: none;
      border-radius: 4px;
      background: #007bff;
      color: white;
      cursor: pointer;
    }
    .pile button:disabled {
      background: #ccc;
      cursor: default;
    }
    .message {
      font-size: 16px;
      min-height: 24px;
      font-weight: bold;
      margin-top: 10px;
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
  container.id = "nim-game-container";

  const message = document.createElement("div");
  message.className = "message";
  message.textContent = "Player 1's turn";

  const pilesContainer = document.createElement("div");

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
  container.appendChild(pilesContainer);
  container.appendChild(buttonRow);
  widgetBox.appendChild(container);

  let piles, currentPlayer, gameOver;

  function initGame() {
    piles = [3, 5, 7]; // You can customize this
    currentPlayer = 1;
    gameOver = false;
    message.textContent = "Player 1's turn";
    renderPiles();
  }

  function renderPiles() {
    pilesContainer.innerHTML = "";

    piles.forEach((count, index) => {
      const pileDiv = document.createElement("div");
      pileDiv.className = "pile";

      const label = document.createElement("span");
      label.textContent = `Pile ${index + 1}: ${count}`;
      pileDiv.appendChild(label);

      for (let i = 1; i <= count; i++) {
        const btn = document.createElement("button");
        btn.textContent = `−${i}`;
        btn.addEventListener("click", () => handleMove(index, i));
        pileDiv.appendChild(btn);
      }

      pilesContainer.appendChild(pileDiv);
    });
  }

  function handleMove(pileIndex, removeCount) {
    if (gameOver || piles[pileIndex] < removeCount) return;

    piles[pileIndex] -= removeCount;

    if (piles.every(p => p === 0)) {
      message.textContent = `🎉 Player ${currentPlayer} wins!`;
      gameOver = true;
    } else {
      currentPlayer = currentPlayer === 1 ? 2 : 1;
      message.textContent = `Player ${currentPlayer}'s turn`;
    }

    renderPiles();
  }

  resetBtn.addEventListener("click", initGame);

  closeBtn.addEventListener("click", () => {
    if (typeof window.renderLauncherButtons === "function") {
      widgetBox.innerHTML = "";
      window.renderLauncherButtons();
    }
  });

  initGame();
})();
