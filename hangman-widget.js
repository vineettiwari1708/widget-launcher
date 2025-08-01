(function () {
  if (document.getElementById("hangman-container")) return;

  const style = document.createElement("style");
  style.textContent = `
    #hangman-container {
      font-family: Arial, sans-serif;
      width: 300px;
      background: #fff8dc;
      border-radius: 12px;
      padding: 16px;
      box-sizing: border-box;
      user-select: none;
      text-align: center;
    }
    #word-display {
      font-size: 24px;
      letter-spacing: 4px;
      margin-bottom: 12px;
      font-weight: bold;
      color: #333;
      min-height: 32px;
    }
    #wrong-guesses {
      margin-bottom: 12px;
      color: #b22222;
      min-height: 20px;
    }
    .letters {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 6px;
      margin-bottom: 12px;
    }
    .letter-btn {
      width: 32px;
      height: 32px;
      border-radius: 6px;
      border: 1px solid #666;
      background: #f0e68c;
      cursor: pointer;
      font-weight: bold;
      user-select: none;
      transition: background-color 0.3s;
    }
    .letter-btn:disabled {
      background: #ddd;
      cursor: default;
      color: #999;
      border-color: #aaa;
    }
    #status-message {
      font-size: 18px;
      font-weight: bold;
      min-height: 24px;
      margin-bottom: 12px;
    }
    button.reset-btn {
      padding: 8px 16px;
      background: #4caf50;
      color: white;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      user-select: none;
      font-size: 16px;
      transition: background-color 0.3s;
    }
    button.reset-btn:hover {
      background: #388e3c;
    }
  `;
  document.head.appendChild(style);

  const container = document.createElement("div");
  container.id = "hangman-container";

  const wordDisplay = document.createElement("div");
  wordDisplay.id = "word-display";

  const wrongGuessesDiv = document.createElement("div");
  wrongGuessesDiv.id = "wrong-guesses";

  const lettersDiv = document.createElement("div");
  lettersDiv.className = "letters";

  const statusMessage = document.createElement("div");
  statusMessage.id = "status-message";

  const resetBtn = document.createElement("button");
  resetBtn.className = "reset-btn";
  resetBtn.textContent = "New Game";

  container.appendChild(wordDisplay);
  container.appendChild(wrongGuessesDiv);
  container.appendChild(lettersDiv);
  container.appendChild(statusMessage);
  container.appendChild(resetBtn);

  const widgetBox = document.querySelector(".widget-box");
  if (widgetBox) {
    widgetBox.innerHTML = "";
    widgetBox.appendChild(container);
  } else {
    document.body.appendChild(container);
  }

  // List of simple words for guessing
  const words = [
    "apple", "banana", "cherry", "orange", "grape", "lemon",
    "peach", "melon", "mango", "kiwi", "plum", "berry", "pear",
    "apricot", "lime", "fig", "date"
  ];

  let chosenWord = "";
  let guessedLetters = new Set();
  let wrongGuesses = 0;
  const maxWrong = 6;

  function pickWord() {
    const idx = Math.floor(Math.random() * words.length);
    return words[idx];
  }

  function updateDisplay() {
    // Show word with guessed letters or underscores
    let display = "";
    for (const ch of chosenWord) {
      display += guessedLetters.has(ch) ? ch.toUpperCase() + " " : "_ ";
    }
    wordDisplay.textContent = display.trim();

    // Show wrong guesses count and letters
    wrongGuessesDiv.textContent = `Wrong guesses: ${wrongGuesses} / ${maxWrong}`;
  }

  function checkWin() {
    for (const ch of chosenWord) {
      if (!guessedLetters.has(ch)) return false;
    }
    return true;
  }

  function endGame(win) {
    if (win) {
      statusMessage.textContent = "🎉 You won!";
      statusMessage.style.color = "green";
    } else {
      statusMessage.textContent = `💀 You lost! Word was: ${chosenWord.toUpperCase()}`;
      statusMessage.style.color = "red";
    }
    // Disable all letter buttons
    Array.from(lettersDiv.children).forEach(btn => (btn.disabled = true));
  }

  function letterClick(letter, btn) {
    if (guessedLetters.has(letter) || wrongGuesses >= maxWrong) return;

    guessedLetters.add(letter);

    if (chosenWord.includes(letter)) {
      updateDisplay();
      if (checkWin()) {
        endGame(true);
      }
    } else {
      wrongGuesses++;
      updateDisplay();
      if (wrongGuesses >= maxWrong) {
        endGame(false);
      }
    }
    btn.disabled = true;
  }

  function initLetters() {
    lettersDiv.innerHTML = "";
    for (let i = 65; i <= 90; i++) {
      const letter = String.fromCharCode(i).toLowerCase();
      const btn = document.createElement("button");
      btn.className = "letter-btn";
      btn.textContent = letter.toUpperCase();
      btn.addEventListener("click", () => letterClick(letter, btn));
      lettersDiv.appendChild(btn);
    }
  }

  function resetGame() {
    chosenWord = pickWord();
    guessedLetters.clear();
    wrongGuesses = 0;
    statusMessage.textContent = "";
    updateDisplay();
    initLetters();
  }

  resetBtn.addEventListener("click", resetGame);

  resetGame();
})();
