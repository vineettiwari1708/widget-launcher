(function () {
  if (document.getElementById("word-scramble-container")) return;

  const style = document.createElement("style");
  style.textContent = `
    #word-scramble-container {
      font-family: Arial, sans-serif;
      width: 300px;
      background: #f0f8ff;
      border-radius: 12px;
      padding: 16px;
      box-sizing: border-box;
      text-align: center;
      user-select: none;
    }
    #scrambled-word {
      font-size: 28px;
      font-weight: bold;
      margin-bottom: 12px;
      letter-spacing: 6px;
      color: #2c3e50;
    }
    #answer {
      font-size: 22px;
      min-height: 36px;
      margin-bottom: 12px;
      letter-spacing: 6px;
      color: #34495e;
      border-bottom: 2px solid #3498db;
      padding: 4px 0;
      user-select: text;
    }
    .letters {
      display: flex;
      justify-content: center;
      gap: 8px;
      flex-wrap: wrap;
      margin-bottom: 12px;
    }
    .letter-btn {
      width: 36px;
      height: 36px;
      background: #3498db;
      border: none;
      border-radius: 6px;
      color: white;
      font-weight: bold;
      font-size: 20px;
      cursor: pointer;
      transition: background-color 0.3s;
      user-select: none;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .letter-btn:hover:not(:disabled) {
      background: #2980b9;
    }
    .letter-btn:disabled {
      background: #95a5a6;
      cursor: default;
      color: #ecf0f1;
    }
    #controls {
      margin-top: 8px;
      display: flex;
      justify-content: center;
      gap: 12px;
    }
    button.control-btn {
      padding: 8px 16px;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      font-weight: bold;
      font-size: 14px;
      user-select: none;
      transition: background-color 0.3s;
    }
    button.check-btn {
      background: #27ae60;
      color: white;
    }
    button.check-btn:hover {
      background: #1e8449;
    }
    button.reset-btn {
      background: #e67e22;
      color: white;
    }
    button.reset-btn:hover {
      background: #d35400;
    }
    #result-msg {
      font-size: 18px;
      font-weight: bold;
      min-height: 24px;
      color: #c0392b;
      margin-top: 8px;
      user-select: none;
    }
  `;
  document.head.appendChild(style);

  const container = document.createElement("div");
  container.id = "word-scramble-container";

  const scrambledWordDiv = document.createElement("div");
  scrambledWordDiv.id = "scrambled-word";

  const answerDiv = document.createElement("div");
  answerDiv.id = "answer";

  const lettersDiv = document.createElement("div");
  lettersDiv.className = "letters";

  const controlsDiv = document.createElement("div");
  controlsDiv.id = "controls";

  const checkBtn = document.createElement("button");
  checkBtn.className = "control-btn check-btn";
  checkBtn.textContent = "Check";

  const resetBtn = document.createElement("button");
  resetBtn.className = "control-btn reset-btn";
  resetBtn.textContent = "Reset";

  controlsDiv.appendChild(checkBtn);
  controlsDiv.appendChild(resetBtn);

  const resultMsg = document.createElement("div");
  resultMsg.id = "result-msg";

  container.appendChild(scrambledWordDiv);
  container.appendChild(answerDiv);
  container.appendChild(lettersDiv);
  container.appendChild(controlsDiv);
  container.appendChild(resultMsg);

  const widgetBox = document.querySelector(".widget-box");
  if (widgetBox) {
    widgetBox.innerHTML = "";
    widgetBox.appendChild(container);
  } else {
    document.body.appendChild(container);
  }

  // Words for the game
  const words = [
    "planet",
    "garden",
    "flower",
    "bottle",
    "stream",
    "window",
    "rocket",
    "bridge",
    "castle",
    "puzzle",
    "button",
    "circle",
  ];

  let currentWord = "";
  let scrambled = "";
  let answer = [];

  function shuffleArray(arr) {
    // Fisher-Yates shuffle
    for (let i = arr.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  function pickWord() {
    const idx = Math.floor(Math.random() * words.length);
    return words[idx];
  }

  function scrambleWord(word) {
    let letters = word.split("");
    do {
      letters = shuffleArray(letters);
    } while (letters.join("") === word);
    return letters.join("");
  }

  function updateDisplay() {
    scrambledWordDiv.textContent = scrambled.toUpperCase();
    answerDiv.textContent = answer.map(l => l.toUpperCase()).join(" ");
    resultMsg.textContent = "";
  }

  function initLettersButtons() {
    lettersDiv.innerHTML = "";
    for (const letter of scrambled) {
      const btn = document.createElement("button");
      btn.className = "letter-btn";
      btn.textContent = letter.toUpperCase();
      btn.addEventListener("click", () => {
        answer.push(letter);
        btn.disabled = true;
        updateDisplay();
      });
      lettersDiv.appendChild(btn);
    }
  }

  checkBtn.addEventListener("click", () => {
    if (answer.length === 0) return;
    const guess = answer.join("");
    if (guess === currentWord) {
      resultMsg.style.color = "#27ae60";
      resultMsg.textContent = "🎉 Correct!";
    } else {
      resultMsg.style.color = "#c0392b";
      resultMsg.textContent = "❌ Try again.";
    }
  });

  resetBtn.addEventListener("click", () => {
    startGame();
  });

  // Allow clicking answer letters to remove last letter
  answerDiv.addEventListener("click", () => {
    if (answer.length === 0) return;
    answer.pop();
    // Enable buttons again accordingly
    const buttons = lettersDiv.querySelectorAll("button");
    buttons.forEach(btn => {
      if (answer.indexOf(btn.textContent.toLowerCase()) === -1) {
        btn.disabled = false;
      }
    });
    updateDisplay();
  });

  function startGame() {
    currentWord = pickWord();
    scrambled = scrambleWord(currentWord);
    answer = [];
    updateDisplay();
    initLettersButtons();
    resultMsg.textContent = "";
  }

  startGame();
})();
