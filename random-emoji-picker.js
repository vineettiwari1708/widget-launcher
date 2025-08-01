(function () {
  if (document.getElementById("random-emoji-picker")) return;

  const style = document.createElement("style");
  style.textContent = `
    #random-emoji-picker {
      width: 300px;
      height: 180px;
      background: #fff;
      border-radius: 16px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      user-select: none;
      padding: 20px;
      box-sizing: border-box;
      color: #333;
    }
    #emoji-display {
      font-size: 72px;
      margin-bottom: 20px;
      transition: transform 0.3s ease;
    }
    #new-emoji-btn {
      background-color: #007bff;
      color: white;
      border: none;
      padding: 12px 24px;
      font-size: 18px;
      border-radius: 12px;
      cursor: pointer;
      user-select: none;
      box-shadow: 0 2px 8px rgba(0, 123, 255, 0.4);
      transition: background-color 0.3s ease;
    }
    #new-emoji-btn:hover {
      background-color: #0056b3;
    }
  `;

  document.head.appendChild(style);

  const container = document.createElement("div");
  container.id = "random-emoji-picker";

  const emojiDisplay = document.createElement("div");
  emojiDisplay.id = "emoji-display";
  emojiDisplay.textContent = "🎉";

  const button = document.createElement("button");
  button.id = "new-emoji-btn";
  button.textContent = "New Emoji";

  const emojis = [
    "😀","😂","😎","🤩","🥳","😜","😇","🤓","🤖","👻",
    "🎃","🍀","🌈","🔥","💥","⭐","🍕","🍔","🍦","⚽",
    "🎸","🚀","🐱","🐶","🐵","🦄","🐉","🌍","🍩","🎯",
    "🎲","🎮","🎤","📚","🛴","🏆","🎁","❤️","🧩","🎬"
  ];

  function pickRandomEmoji() {
    const randomIndex = Math.floor(Math.random() * emojis.length);
    return emojis[randomIndex];
  }

  button.addEventListener("click", () => {
    emojiDisplay.style.transform = "scale(1.3)";
    setTimeout(() => {
      emojiDisplay.textContent = pickRandomEmoji();
      emojiDisplay.style.transform = "scale(1)";
    }, 150);
  });

  container.appendChild(emojiDisplay);
  container.appendChild(button);

  // Append to widget panel or body
  const widgetBox = document.querySelector(".widget-box");
  if (widgetBox) {
    widgetBox.innerHTML = "";
    widgetBox.appendChild(container);
  } else {
    document.body.appendChild(container);
  }
})();
