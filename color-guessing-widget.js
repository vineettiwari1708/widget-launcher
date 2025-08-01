(function () {
  if (document.getElementById("color-guessing-container")) return;

  const style = document.createElement("style");
  style.textContent = `
    #color-guessing-container {
      font-family: Arial, sans-serif;
      width: 300px;
      background: #fafafa;
      border-radius: 12px;
      padding: 16px;
      box-sizing: border-box;
      text-align: center;
      user-select: none;
    }
    .color-code {
      font-size: 20px;
      font-weight: bold;
      margin-bottom: 20px;
      color: #333;
    }
    .options {
      display: flex;
      justify-content: space-around;
      margin-bottom: 16px;
    }
    .color-btn {
      width: 80px;
      height: 80px;
      border-radius: 12px;
      border: 2px solid #ccc;
      cursor: pointer;
      transition: border-color 0.3s;
    }
    .color-btn:hover {
      border-color: #007bff;
    }
    .message {
      font-size: 16px;
      margin-bottom: 12px;
      height: 24px;
      color: #333;
    }
    button.reset-btn {
      padding: 8px 16px;
      background: #007bff;
      color: white;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      user-select: none;
      font-size: 16px;
      transition: background-color 0.3s;
    }
    button.reset-btn:hover {
      background: #0056b3;
    }
  `;
  document.head.appendChild(style);

  const container = document.createElement("div");
  container.id = "color-guessing-container";

  const colorCodeDisplay = document.createElement("div");
  colorCodeDisplay.className = "color-code";

  const optionsDiv = document.createElement("div");
  optionsDiv.className = "options";

  const messageDiv = document.createElement("div");
  messageDiv.className = "message";

  const resetBtn = document.createElement("button");
  resetBtn.className = "reset-btn";
  resetBtn.textContent = "New Color";

  container.appendChild(colorCodeDisplay);
  container.appendChild(optionsDiv);
  container.appendChild(messageDiv);
  container.appendChild(resetBtn);

  const widgetBox = document.querySelector(".widget-box");
  if (widgetBox) {
    widgetBox.innerHTML = "";
    widgetBox.appendChild(container);
  } else {
    document.body.appendChild(container);
  }

  let correctIndex = 0;

  function randomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return { r, g, b };
  }

  function rgbString(c) {
    return `rgb(${c.r}, ${c.g}, ${c.b})`;
  }

  function generateColors() {
    // correct color
    const correctColor = randomColor();

    // generate two wrong colors (with some variation)
    const options = [correctColor];
    while (options.length < 3) {
      const c = randomColor();
      // avoid exact duplicates
      if (!options.some(o => o.r === c.r && o.g === c.g && o.b === c.b)) {
        options.push(c);
      }
    }

    // shuffle options
    for (let i = options.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [options[i], options[j]] = [options[j], options[i]];
    }

    correctIndex = options.findIndex(c => c.r === correctColor.r && c.g === correctColor.g && c.b === correctColor.b);

    colorCodeDisplay.textContent = rgbString(correctColor);
    messageDiv.textContent = "";
    optionsDiv.innerHTML = "";

    options.forEach((color, i) => {
      const btn = document.createElement("button");
      btn.className = "color-btn";
      btn.style.backgroundColor = rgbString(color);
      btn.title = rgbString(color);
      btn.addEventListener("click", () => {
        if (i === correctIndex) {
          messageDiv.textContent = "✅ Correct!";
          messageDiv.style.color = "green";
        } else {
          messageDiv.textContent = "❌ Try Again!";
          messageDiv.style.color = "red";
        }
      });
      optionsDiv.appendChild(btn);
    });
  }

  resetBtn.addEventListener("click", generateColors);

  generateColors();
})();
