(function () {
  if (document.getElementById("emoji-memory-container")) return;

  const widgetBox = document.querySelector(".widget-box");
  if (!widgetBox) return;

  widgetBox.innerHTML = "";

  const style = document.createElement("style");
  style.textContent = `
    #emoji-memory-container {
      font-family: sans-serif;
      padding: 16px;
      background: #f8f8f8;
      border-radius: 12px;
      width: 100%;
      max-width: 320px;
      margin: 10px auto;
      text-align: center;
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(4, 60px);
      grid-gap: 8px;
      justify-content: center;
      margin: 16px 0;
    }
    .card {
      width: 60px;
      height: 60px;
      background: #ddd;
      border-radius: 8px;
      font-size: 28px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: background 0.2s;
      user-select: none;
    }
    .card.revealed {
      background: #fff;
      cursor: default;
    }
    .card.matched {
      background: #c8facc;
      color: #4caf50;
      cursor: default;
    }
    .message {
      font-size: 16px;
      font-weight: bold;
      min-height: 24px;
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
  container.id = "emoji-memory-container";

  const message = document.createElement("div");
  message.className = "message";
  message.textContent = "Find all matching pairs";

  const grid = document.createElement("div");
  grid.className = "grid";

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
  container.appendChild(grid);
  container.appendChild(buttonRow);
  widgetBox.appendChild(container);

  const emojis = ["🍎", "🎈", "🐶", "🚀", "🌟", "🎵", "🍩", "🐸"];
  let cards = [];
  let firstCard = null;
  let lock = false;

  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  function createCards() {
    const doubled = [...emojis, ...emojis];
    shuffle(doubled);
    cards = [];

    grid.innerHTML = "";
    doubled.forEach((emoji, i) => {
      const card = document.createElement("div");
      card.className = "card";
      card.dataset.index = i;
      card.dataset.emoji = emoji;
      card.textContent = "";

      card.addEventListener("click", () => handleCardClick(card));

      cards.push(card);
      grid.appendChild(card);
    });
  }

  function handleCardClick(card) {
    if (lock || card.classList.contains("matched") || card.classList.contains("revealed")) return;

    card.classList.add("revealed");
    card.textContent = card.dataset.emoji;

    if (!firstCard) {
      firstCard = card;
    } else {
      lock = true;
      const secondCard = card;
      if (firstCard.dataset.emoji === secondCard.dataset.emoji) {
        firstCard.classList.add("matched");
        secondCard.classList.add("matched");
        firstCard = null;
        lock = false;
        checkWin();
      } else {
        setTimeout(() => {
          firstCard.classList.remove("revealed");
          secondCard.classList.remove("revealed");
          firstCard.textContent = "";
          secondCard.textContent = "";
          firstCard = null;
          lock = false;
        }, 800);
      }
    }
  }

  function checkWin() {
    const allMatched = cards.every(card => card.classList.contains("matched"));
    if (allMatched) {
      message.textContent = "🎉 You matched all the emojis!";
    }
  }

  resetBtn.addEventListener("click", () => {
    firstCard = null;
    lock = false;
    message.textContent = "Find all matching pairs";
    createCards();
  });

  closeBtn.addEventListener("click", () => {
    if (typeof window.renderLauncherButtons === "function") {
      widgetBox.innerHTML = "";
      window.renderLauncherButtons();
    }
  });

  createCards();
})();
