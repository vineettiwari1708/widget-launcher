(function () {
  if (document.getElementById("wires-circuits-container")) return;

  const widgetBox = document.querySelector(".widget-box");
  if (!widgetBox) return;
  widgetBox.innerHTML = "";

  const style = document.createElement("style");
  style.textContent = `
    #wires-circuits-container {
      font-family: sans-serif;
      width: 320px;
      height: 480px;
      margin: auto;
      padding: 16px;
      background: #fff;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      position: relative;
      overflow: hidden;
    }
    #game-area {
      position: relative;
      width: 100%;
      height: 100%;
      background-color: #e3e3e3;
      border: 2px solid #333;
      overflow: hidden;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .terminal {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      position: absolute;
      background-color: #007bff;
      cursor: pointer;
      z-index: 10;
    }
    .terminal.red { background-color: red; }
    .terminal.green { background-color: green; }
    .terminal.yellow { background-color: yellow; }
    .terminal.blue { background-color: blue; }
    .wire {
      position: absolute;
      background-color: #333;
      z-index: 5;
      pointer-events: none;
    }
    .message {
      font-size: 18px;
      font-weight: bold;
      text-align: center;
      position: absolute;
      top: 20px;
      width: 100%;
    }
    #reset-btn {
      padding: 8px 16px;
      margin-top: 12px;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      display: block;
      margin-left: auto;
      margin-right: auto;
    }
  `;
  document.head.appendChild(style);

  const container = document.createElement("div");
  container.id = "wires-circuits-container";

  const message = document.createElement("div");
  message.className = "message";
  message.textContent = "Connect matching terminals without crossing wires";

  const gameArea = document.createElement("div");
  gameArea.id = "game-area";

  const resetBtn = document.createElement("button");
  resetBtn.id = "reset-btn";
  resetBtn.textContent = "Reset Game";

  container.appendChild(message);
  container.appendChild(gameArea);
  container.appendChild(resetBtn);
  widgetBox.appendChild(container);

  const terminals = [];
  const wires = [];
  const connections = [];
  const terminalColors = ['red', 'green', 'yellow', 'blue'];
  let selectedTerminal = null;
  let gameOver = false;

  // Create terminals with random positions
  function createTerminals() {
    const positions = [
      { top: 50, left: 20 },
      { top: 50, left: 75 },
      { top: 80, left: 20 },
      { top: 80, left: 75 }
    ];

    positions.forEach((pos, index) => {
      const terminal = document.createElement("div");
      terminal.className = `terminal ${terminalColors[index]}`;
      terminal.style.top = `${pos.top}%`;
      terminal.style.left = `${pos.left}%`;
      terminal.addEventListener("click", () => handleTerminalClick(terminal, index));
      gameArea.appendChild(terminal);
      terminals.push(terminal);
    });
  }

  function handleTerminalClick(terminal, index) {
    if (gameOver) return;

    if (selectedTerminal === null) {
      selectedTerminal = { terminal, index };
    } else {
      const { terminal: prevTerminal, index: prevIndex } = selectedTerminal;
      if (prevIndex === index) return; // Do not connect the same terminals

      // Draw a wire between the terminals
      drawWire(prevTerminal, terminal);
      connections.push([prevIndex, index]);
      selectedTerminal = null;

      // Check for win condition
      if (connections.length === 2) {
        gameOver = true;
        message.textContent = "You Win!";
      }
    }
  }

  // Draw a wire between two terminals
  function drawWire(startTerminal, endTerminal) {
    const wire = document.createElement("div");
    wire.className = "wire";

    const startRect = startTerminal.getBoundingClientRect();
    const endRect = endTerminal.getBoundingClientRect();

    const x1 = startRect.left + startRect.width / 2;
    const y1 = startRect.top + startRect.height / 2;
    const x2 = endRect.left + endRect.width / 2;
    const y2 = endRect.top + endRect.height / 2;

    const width = Math.abs(x2 - x1);
    const height = Math.abs(y2 - y1);

    wire.style.width = `${width}px`;
    wire.style.height = `${height}px`;
    wire.style.top = `${Math.min(y1, y2)}px`;
    wire.style.left = `${Math.min(x1, x2)}px`;

    const angle = Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI);
    wire.style.transform = `rotate(${angle}deg)`;

    gameArea.appendChild(wire);
    wires.push(wire);
  }

  // Reset the game
  resetBtn.addEventListener("click", () => {
    gameOver = false;
    message.textContent = "Connect matching terminals without crossing wires";
    terminals.forEach(terminal => terminal.remove());
    wires.forEach(wire => wire.remove());
    terminals.length = 0;
    wires.length = 0;
    connections.length = 0;
    selectedTerminal = null;
    createTerminals();
  });

  createTerminals();
})();
