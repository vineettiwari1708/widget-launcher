(function () {
  if (document.getElementById("wire-cutter-container")) return;

  const widgetBox = document.querySelector(".widget-box");
  if (!widgetBox) return;
  widgetBox.innerHTML = "";

  const style = document.createElement("style");
  style.textContent = `
    #wire-cutter-container {
      font-family: sans-serif;
      padding: 16px;
      background: #fff;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      position: relative;
      width: 100%;
      max-width: 350px;
      margin: 0 auto;
    }
    #bomb {
      background: #333;
      padding: 16px;
      text-align: center;
      color: white;
      border-radius: 10px;
      margin-bottom: 16px;
    }
    .wire-container {
      display: flex;
      justify-content: space-between;
      margin-bottom: 16px;
    }
    .wire {
      width: 60px;
      height: 20px;
      background: #000;
      border-radius: 6px;
      cursor: pointer;
      transition: background 0.3s;
    }
    .wire:hover {
      background: #888;
    }
    .wire.correct {
      background: #4caf50;
    }
    .wire.incorrect {
      background: #f44336;
    }
    .message {
      font-size: 18px;
      font-weight: bold;
      text-align: center;
      margin-bottom: 16px;
    }
    #reset-btn {
      padding: 8px 16px;
      background: #007bff;
      color: white;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      display: block;
      margin-left: auto;
      margin-right: auto;
    }
    .game-over {
      color: red;
    }
    .game-won {
      color: green;
    }
  `;
  document.head.appendChild(style);

  const container = document.createElement("div");
  container.id = "wire-cutter-container";

  const bomb = document.createElement("div");
  bomb.id = "bomb";
  bomb.textContent = "⚠️ BOMB DETECTED ⚠️";

  const message = document.createElement("div");
  message.className = "message";
  message.textContent = "Select the correct wire to defuse the bomb!";

  const wireContainer = document.createElement("div");
  wireContainer.className = "wire-container";

  // Define wires and correct wire
  const wires = [
    { color: "red", isCorrect: false },
    { color: "blue", isCorrect: false },
    { color: "green", isCorrect: true },
    { color: "yellow", isCorrect: false },
  ];

  // Create wire elements
  wires.forEach((wire, index) => {
    const wireElement = document.createElement("div");
    wireElement.className = "wire";
    wireElement.style.backgroundColor = wire.color;
    wireElement.addEventListener("click", () => handleWireClick(wire, wireElement));
    wireContainer.appendChild(wireElement);
  });

  const resetBtn = document.createElement("button");
  resetBtn.id = "reset-btn";
  resetBtn.textContent = "Try Again";

  container.appendChild(bomb);
  container.appendChild(message);
  container.appendChild(wireContainer);
  container.appendChild(resetBtn);
  widgetBox.appendChild(container);

  // Handle wire click
  function handleWireClick(wire, wireElement) {
    if (wire.isCorrect) {
      wireElement.classList.add("correct");
      message.textContent = "You defused the bomb! 🎉";
      message.classList.add("game-won");
      resetBtn.style.display = "inline-block";
    } else {
      wireElement.classList.add("incorrect");
      message.textContent = "Boom! Incorrect wire! 💥";
      message.classList.add("game-over");
      resetBtn.style.display = "inline-block";
    }

    // Disable further clicking on wires
    wireContainer.querySelectorAll(".wire").forEach(wireElem => wireElem.style.pointerEvents = "none");
  }

  // Reset the game
  resetBtn.addEventListener("click", () => {
    wireContainer.querySelectorAll(".wire").forEach(wireElem => {
      wireElem.classList.remove("correct", "incorrect");
      wireElem.style.pointerEvents = "auto";
    });

    message.textContent = "Select the correct wire to defuse the bomb!";
    message.classList.remove("game-over", "game-won");
    resetBtn.style.display = "none";
  });
})();
