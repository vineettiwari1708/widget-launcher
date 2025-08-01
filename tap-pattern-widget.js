(function () {
  if (document.getElementById("tap-pattern-container")) return;

  const widgetBox = document.querySelector(".widget-box");
  if (!widgetBox) return;
  widgetBox.innerHTML = "";

  const style = document.createElement("style");
  style.textContent = `
    #tap-pattern-container {
      font-family: sans-serif;
      max-width: 320px;
      margin: 10px auto;
      padding: 16px;
      background: #fefefe;
      border-radius: 12px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
      text-align: center;
      user-select: none;
    }
    #pattern-display {
      margin-bottom: 16px;
      font-size: 28px;
      letter-spacing: 12px;
      font-weight: bold;
      color: #007bff;
    }
    #instructions {
      margin-bottom: 12px;
      font-size: 14px;
      color: #444;
    }
    #buttons-container {
      display: flex;
      justify-content: center;
      gap: 16px;
      margin-bottom: 12px;
    }
    .tap-btn {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      border: 2px solid #007bff;
      background: #e7f1ff;
      cursor: pointer;
      font-size: 24px;
      font-weight: bold;
      line-height: 60px;
      user-select: none;
      transition: background 0.2s, transform 0.1s;
    }
    .tap-btn:active {
      background: #007bff;
      color: white;
      transform: scale(0.95);
    }
    #message {
      font-weight: bold;
      height: 24px;
      color: #28a745;
    }
    #reset-btn {
      margin-top: 12px;
      padding: 8px 16px;
      border: none;
      border-radius: 8px;
      background: #007bff;
      color: white;
      font-weight: bold;
      cursor: pointer;
      transition: background 0.3s;
    }
    #reset-btn:hover {
      background: #0056b3;
    }
  `;
  document.head.appendChild(style);

  const container = document.createElement("div");
  container.id = "tap-pattern-container";

  const title = document.createElement("div");
  title.id = "title";
  title.textContent = "Tap Pattern";

  const instructions = document.createElement("div");
  instructions.id = "instructions";
  instructions.textContent = "Repeat the tap pattern shown below:";

  const patternDisplay = document.createElement("div");
  patternDisplay.id = "pattern-display";

  // Use 'T' for Tap, '-' for Pause (silence)
  // Example pattern: tap, tap, pause, tap → "T T - T"
  // Let's define the pattern as an array:
  const pattern = ["T", "T", "-", "T"];
  patternDisplay.textContent = pattern.join(" ");

  // Player input pattern
  const playerPattern = [];

  // Buttons: Tap and Pause
  const buttonsContainer = document.createElement("div");
  buttonsContainer.id = "buttons-container";

  const tapBtn = document.createElement("button");
  tapBtn.className = "tap-btn";
  tapBtn.textContent = "Tap";
  tapBtn.title = "Tap";

  const pauseBtn = document.createElement("button");
  pauseBtn.className = "tap-btn";
  pauseBtn.textContent = "-";
  pauseBtn.title = "Pause";

  buttonsContainer.appendChild(tapBtn);
  buttonsContainer.appendChild(pauseBtn);

  const message = document.createElement("div");
  message.id = "message";

  const resetBtn = document.createElement("button");
  resetBtn.id = "reset-btn";
  resetBtn.textContent = "Reset";

  function checkPattern() {
    if (playerPattern.length !== pattern.length) {
      message.style.color = "#dc3545";
      message.textContent = `Keep going... (${playerPattern.length}/${pattern.length})`;
      return;
    }

    for (let i = 0; i < pattern.length; i++) {
      if (playerPattern[i] !== pattern[i]) {
        message.style.color = "#dc3545";
        message.textContent = "Wrong pattern, try again!";
        playerPattern.length = 0; // reset input
        return;
      }
    }
    message.style.color = "#28a745";
    message.textContent = "Correct! Well done! 🎉";
  }

  tapBtn.addEventListener("click", () => {
    playerPattern.push("T");
    checkPattern();
  });

  pauseBtn.addEventListener("click", () => {
    playerPattern.push("-");
    checkPattern();
  });

  resetBtn.addEventListener("click", () => {
    playerPattern.length = 0;
    message.textContent = "";
  });

  container.appendChild(title);
  container.appendChild(instructions);
  container.appendChild(patternDisplay);
  container.appendChild(buttonsContainer);
  container.appendChild(message);
  container.appendChild(resetBtn);

  widgetBox.appendChild(container);
})();
