(function () {
  if (document.getElementById("tap-sequence-container")) return;

  const widgetBox = document.querySelector(".widget-box");
  if (!widgetBox) return;
  widgetBox.innerHTML = "";

  const style = document.createElement("style");
  style.textContent = `
    #tap-sequence-container {
      font-family: sans-serif;
      width: 320px;
      margin: auto;
      padding: 16px;
      background: #fff;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      text-align: center;
      user-select: none;
    }
    #instruction {
      margin-bottom: 12px;
      font-weight: bold;
      font-size: 18px;
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(3, 80px);
      grid-gap: 10px;
      justify-content: center;
      margin-bottom: 16px;
    }
    .tile {
      background: #007bff;
      color: white;
      font-size: 24px;
      font-weight: bold;
      border-radius: 8px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      user-select: none;
      height: 80px;
      transition: background-color 0.3s;
    }
    .tile.correct {
      background: #4caf50;
      cursor: default;
    }
    .tile.incorrect {
      background: #e53935;
      cursor: default;
    }
    #feedback {
      min-height: 28px;
      font-weight: bold;
      font-size: 16px;
    }
    #restart-btn {
      margin-top: 12px;
      padding: 8px 20px;
      font-size: 16px;
      border: none;
      border-radius: 8px;
      background: #007bff;
      color: white;
      cursor: pointer;
      display: none;
    }
  `;
  document.head.appendChild(style);

  const container = document.createElement("div");
  container.id = "tap-sequence-container";

  const instruction = document.createElement("div");
  instruction.id = "instruction";
  instruction.textContent = "Tap the tiles in order: 1 → 9";

  const grid = document.createElement("div");
  grid.className = "grid";

  const feedback = document.createElement("div");
  feedback.id = "feedback";

  const restartBtn = document.createElement("button");
  restartBtn.id = "restart-btn";
  restartBtn.textContent = "Play Again";

  container.appendChild(instruction);
  container.appendChild(grid);
  container.appendChild(feedback);
  container.appendChild(restartBtn);
  widgetBox.appendChild(container);

  let sequence = [];
  let currentStep = 1;
  let gameOver = false;

  function shuffleArray(arr) {
    for (let i = arr.length -1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i+1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }

  function createTiles() {
    grid.innerHTML = "";
    sequence = Array.from({length: 9}, (_, i) => i + 1);
    shuffleArray(sequence);
    currentStep = 1;
    gameOver = false;
    feedback.textContent = "";
    restartBtn.style.display = "none";

    sequence.forEach(num => {
      const tile = document.createElement("div");
      tile.className = "tile";
      tile.textContent = num;
      tile.addEventListener("click", () => {
        if (gameOver) return;
        if (num === currentStep) {
          tile.classList.add("correct");
          currentStep++;
          if (currentStep > 9) {
            feedback.textContent = "🎉 You completed the sequence!";
            gameOver = true;
            restartBtn.style.display = "inline-block";
          }
        } else {
          tile.classList.add("incorrect");
          feedback.textContent = `❌ Wrong tile! Tap ${currentStep}`;
          gameOver = true;
          restartBtn.style.display = "inline-block";
        }
      });
      grid.appendChild(tile);
    });
  }

  restartBtn.addEventListener("click", createTiles);

  createTiles();
})();
