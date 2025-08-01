(function () {
  document.addEventListener("DOMContentLoaded", function () {
    const launcherScript = document.querySelector(".widget-launcher");
    const position = launcherScript?.getAttribute("data-position") || "bottom-right";

    const widgetList = [
  {
    label: "❌", // Tic Tac Toe cross
    src: "https://raw.githubusercontent.com/vineettiwari1708/widget-launcher/main/tic-tac-toe-widget.js"
  },
  {
    label: "🧠", // Memory Matching = brain
    src: "https://raw.githubusercontent.com/vineettiwari1708/widget-launcher/main/memory-matching.js"
  },
  {
    label: "🐍", // Snake game = snake
    src: "https://raw.githubusercontent.com/vineettiwari1708/widget-launcher/main/snake-widget.js"
  },
  {
    label: "🔢", // 2048 = numbers
    src: "https://raw.githubusercontent.com/vineettiwari1708/widget-launcher/main/2048-widget.js"
  },
  {
    label: "💣", // Minesweeper = bomb
    src: "https://raw.githubusercontent.com/vineettiwari1708/widget-launcher/main/minesweeper-widget.js"
  },
  {
    label: "✊", // Rock-Paper-Scissors
    src: "https://raw.githubusercontent.com/vineettiwari1708/widget-launcher/main/rock-paper-scissors-widget.js"
  },
  {
    label: "🎵", // Simon Says = music notes (memory sequence)
    src: "https://raw.githubusercontent.com/vineettiwari1708/widget-launcher/main/simon-says-widget.js"
  },
  {
    label: "🧩", // Sliding Puzzle = puzzle piece
    src: "https://raw.githubusercontent.com/vineettiwari1708/widget-launcher/main/sliding-puzzle-widget.js"
  },
  {
    label: "🔵", // Dots and Boxes = dots
    src: "https://raw.githubusercontent.com/vineettiwari1708/widget-launcher/main/dots-and-boxes-widget.js"
  },
  {
    label: "🏓", // Pong mini = ping pong paddle/ball
    src: "https://raw.githubusercontent.com/vineettiwari1708/widget-launcher/main/pong-mini-widget.js"
  },
  {
    label: "🐹", // Whack-a-Mole = mole
    src: "https://raw.githubusercontent.com/vineettiwari1708/widget-launcher/main/whack-a-mole-widget.js"
  },
  {
    label: "🎨", // Color Guessing Game = palette
    src: "https://raw.githubusercontent.com/vineettiwari1708/widget-launcher/main/color-guessing-widget.js"
  },
  {
    label: "👤", // Hangman = trap (closest emoji)
    src: "https://raw.githubusercontent.com/vineettiwari1708/widget-launcher/main/hangman-widget.js"
  },
  {
    label: "🔤", // Word Scramble = letters
    src: "https://raw.githubusercontent.com/vineettiwari1708/widget-launcher/main/word-scramble-widget.js"
  },
  {
    label: "⏱️", // Reaction Time = stopwatch
    src: "https://raw.githubusercontent.com/vineettiwari1708/widget-launcher/main/reaction-time-widget.js"
  },
  {
    label: "❓", // Quiz/Trivia = question mark
    src: "https://raw.githubusercontent.com/vineettiwari1708/widget-launcher/main/quiz-widget.js"
  },
  {
    label: "🧮", // Math Challenge = abacus
    src: "https://raw.githubusercontent.com/vineettiwari1708/widget-launcher/main/math-challenge-widget.js"
  },
  {
    label: "🎯", // Click the Target = dartboard
    src: "https://raw.githubusercontent.com/vineettiwari1708/widget-launcher/main/click-target-widget.js"
  },
  {
    label: "⌨️", // Typing Speed Test = keyboard
    src: "https://raw.githubusercontent.com/vineettiwari1708/widget-launcher/main/typing-speed-test-widget.js"
  },
  {
    label: "🎲", // Coin Toss / Dice Roller = dice
    src: "https://raw.githubusercontent.com/vineettiwari1708/widget-launcher/main/coin-dice-widget.js"
  },
  {
    label: "🥠", // Fortune Cookie / Spinner = fortune cookie
    src: "https://raw.githubusercontent.com/vineettiwari1708/widget-launcher/main/spinner-widget.js"
  },
  {
    label: "🧩", // Daily Puzzle = puzzle piece again
    src: "https://raw.githubusercontent.com/vineettiwari1708/widget-launcher/main/daily-puzzle.js"
  },
  {
    label: "😀", // Random Emoji Picker = smiley face
    src: "https://raw.githubusercontent.com/vineettiwari1708/widget-launcher/main/random-emoji-picker.js"
  },
  {
    label: "🧭", // Mini Maze Solver = compass
    src: "https://raw.githubusercontent.com/vineettiwari1708/widget-launcher/main/mini-maze-solver.js"
  }
];

    const state = { isOpen: false };
    const container = document.createElement("div");

    const positionMap = {
      "bottom-right": "bottom: 20px; right: 20px;",
      "bottom-left": "bottom: 20px; left: 20px;",
      "top-right": "top: 20px; right: 20px;",
      "top-left": "top: 20px; left: 20px;",
      "center-right": "top: 50%; right: 20px; transform: translateY(-50%);",
      "center-left": "top: 50%; left: 20px; transform: translateY(-50%);"
    };
    container.style.cssText = `position: fixed; z-index: 99999; ${positionMap[position] || positionMap["bottom-right"]}`;

    const toggleBtn = document.createElement("button");
    toggleBtn.innerText = "🧰";
    toggleBtn.title = "Open Widgets";
    toggleBtn.setAttribute("aria-expanded", "false");
    toggleBtn.setAttribute("aria-label", "Toggle widget menu");
    toggleBtn.style.cssText = `
      width: 48px; height: 48px;
      background: #007bff; color: white;
      border-radius: 50%; border: none;
      cursor: pointer; font-size: 24px;
      position: relative; z-index: 1;
    `;
    container.appendChild(toggleBtn);

    const widgetBar = document.createElement("div");
    widgetBar.classList.add("widget-box");
    widgetBar.style.cssText = `
      display: none; flex-wrap: wrap; gap: 16px;
      max-width: 400px; width: 400px; max-height: 400px;
      background: rgba(255,255,255,0.3);
      border: 1px solid rgba(255,255,255,0.4);
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      border-radius: 16px; padding: 10px;
      position: absolute; right: 60px;
      top: 50%; transform: translateY(-50%);
      opacity: 0; transition: opacity 0.3s ease;
      backdrop-filter: blur(8px);
      overflow-y: auto; box-sizing: border-box;
      
      z-index: 0;
    `;
    container.appendChild(widgetBar);

    const style = document.createElement("style");
    style.textContent = `
      @media (max-width: 500px) {
        .widget-box {
          max-width: 90vw !important;
          max-height: 90vh !important;
          right: 60px !important;
        }
      }
    `;
    document.head.appendChild(style);

    const loadedWidgets = new Set();

    window.renderLauncherButtons = function () {
      widgetBar.innerHTML = "";
      widgetList.forEach(widget => {
        const btn = document.createElement("button");
        btn.textContent = widget.label;
        btn.title = widget.label;
        btn.style.cssText = `
          width: 56px; height: 56px;
          background: #007bff; color: white;
          border-radius: 50%; border: none;
          cursor: pointer; font-size: 24px;
          display: flex; align-items: center;
          justify-content: center;
        `;
        btn.onmouseover = () => btn.style.background = "#0056b3";
        btn.onmouseout = () => btn.style.background = "#007bff";

        btn.onclick = async () => {
          widgetBar.innerHTML = `<div style="color:#333;">Loading...</div>`;
          try {
            const scriptText = await fetch(widget.src).then(r => r.text());
            const script = document.createElement("script");
            script.type = "module";
            script.textContent = scriptText;
            document.body.appendChild(script);
            loadedWidgets.add(widget.src);
          } catch (e) {
            console.error("Widget load error:", e);
            widgetBar.innerHTML = `<div style="color:red;">❌ Failed to load widget</div>`;
          }
        };

        widgetBar.appendChild(btn);
      });
    };

    // Initial button render
    window.renderLauncherButtons();

    toggleBtn.addEventListener("click", () => {
      state.isOpen = !state.isOpen;
      toggleBtn.setAttribute("aria-expanded", state.isOpen);
      if (state.isOpen) {
        widgetBar.style.display = "flex";
        requestAnimationFrame(() => widgetBar.style.opacity = "1");
      } else {
        widgetBar.style.opacity = "0";
        setTimeout(() => widgetBar.style.display = "none", 300);
      }
    });

    document.body.appendChild(container);
  });
})();
