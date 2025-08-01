(function () {
  if (document.getElementById("rps-container")) return;

  const style = document.createElement("style");
  style.textContent = `
    #rps-container {
      font-family: sans-serif;
      background: #f1f1f1;
      padding: 16px;
      border-radius: 12px;
      width: 100%;
      max-width: 300px;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 12px;
    }
    .rps-buttons {
      display: flex;
      gap: 12px;
    }
    .rps-btn {
      font-size: 24px;
      background: #007bff;
      color: white;
      border: none;
      border-radius: 8px;
      width: 56px;
      height: 56px;
      cursor: pointer;
    }
    .rps-btn:hover {
      background: #0056b3;
    }
    .result, .score {
      font-size: 16px;
      text-align: center;
    }
    .btn-row {
      display: flex;
      gap: 10px;
    }
    .btn-mini {
      padding: 6px 12px;
      background: #007bff;
      color: white;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      font-size: 14px;
    }
    .btn-mini.danger {
      background: #dc3545;
    }
  `;
  document.head.appendChild(style);

  const container = document.createElement("div");
  container.id = "rps-container";

  const result = document.createElement("div");
  result.className = "result";
  result.textContent = "Make your move!";

  const score = document.createElement("div");
  score.className = "score";
  let playerScore = 0;
  let computerScore = 0;
  updateScore();

  function updateScore() {
    score.textContent = `You: ${playerScore} | Computer: ${computerScore}`;
  }

  const choices = ["✊", "✋", "✌️"];
  const buttons = document.createElement("div");
  buttons.className = "rps-buttons";

  choices.forEach(choice => {
    const btn = document.createElement("button");
    btn.className = "rps-btn";
    btn.textContent = choice;
    btn.onclick = () => playRound(choice);
    buttons.appendChild(btn);
  });

  function playRound(player) {
    const comp = choices[Math.floor(Math.random() * choices.length)];
    if (player === comp) {
      result.textContent = `Draw! You both chose ${player}`;
    } else if (
      (player === "✊" && comp === "✌️") ||
      (player === "✋" && comp === "✊") ||
      (player === "✌️" && comp === "✋")
    ) {
      playerScore++;
      result.textContent = `You win! ${player} beats ${comp}`;
    } else {
      computerScore++;
      result.textContent = `You lose! ${comp} beats ${player}`;
    }
    updateScore();
  }

  const resetBtn = document.createElement("button");
  resetBtn.className = "btn-mini";
  resetBtn.textContent = "Reset";
  resetBtn.onclick = () => {
    playerScore = 0;
    computerScore = 0;
    updateScore();
    result.textContent = "Make your move!";
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

  const btnRow = document.createElement("div");
  btnRow.className = "btn-row";
  btnRow.appendChild(resetBtn);
  btnRow.appendChild(closeBtn);

  container.appendChild(result);
  container.appendChild(score);
  container.appendChild(buttons);
  container.appendChild(btnRow);

  const widgetBox = document.querySelector(".widget-box");
  if (widgetBox) {
    widgetBox.innerHTML = "";
    widgetBox.appendChild(container);
  }
})();
