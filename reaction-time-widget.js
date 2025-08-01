(function () {
  if (document.getElementById("reaction-time-container")) return;

  const style = document.createElement("style");
  style.textContent = `
    #reaction-time-container {
      width: 300px;
      height: 200px;
      background: #3498db;
      border-radius: 12px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      color: white;
      font-family: Arial, sans-serif;
      user-select: none;
      cursor: pointer;
      box-sizing: border-box;
      padding: 20px;
      text-align: center;
    }
    #reaction-message {
      font-size: 18px;
      margin-bottom: 12px;
    }
    #reaction-time {
      font-size: 48px;
      font-weight: bold;
      margin-bottom: 12px;
      min-height: 60px;
    }
    #reset-btn {
      padding: 8px 16px;
      background: white;
      color: #3498db;
      border: none;
      border-radius: 8px;
      font-weight: bold;
      cursor: pointer;
      user-select: none;
      transition: background-color 0.3s;
    }
    #reset-btn:hover {
      background: #ecf0f1;
    }
  `;
  document.head.appendChild(style);

  const container = document.createElement("div");
  container.id = "reaction-time-container";

  const message = document.createElement("div");
  message.id = "reaction-message";
  message.textContent = "Wait for green, then click as fast as you can!";

  const timeDisplay = document.createElement("div");
  timeDisplay.id = "reaction-time";

  const resetBtn = document.createElement("button");
  resetBtn.id = "reset-btn";
  resetBtn.textContent = "Restart";

  container.appendChild(message);
  container.appendChild(timeDisplay);
  container.appendChild(resetBtn);

  const widgetBox = document.querySelector(".widget-box");
  if (widgetBox) {
    widgetBox.innerHTML = "";
    widgetBox.appendChild(container);
  } else {
    document.body.appendChild(container);
  }

  let startTime = 0;
  let timeoutId = null;
  let waitingForClick = false;

  function startTest() {
    container.style.background = "#3498db"; // blue
    message.textContent = "Wait for green, then click as fast as you can!";
    timeDisplay.textContent = "";
    waitingForClick = false;

    const delay = 1500 + Math.random() * 3000; // 1.5 to 4.5 seconds
    timeoutId = setTimeout(() => {
      container.style.background = "#2ecc71"; // green
      message.textContent = "CLICK NOW!";
      startTime = performance.now();
      waitingForClick = true;
    }, delay);
  }

  container.addEventListener("click", () => {
    if (!waitingForClick) {
      // Clicked too early
      clearTimeout(timeoutId);
      message.textContent = "Too soon! Wait for green.";
      timeDisplay.textContent = "";
      container.style.background = "#e74c3c"; // red
      waitingForClick = false;
      setTimeout(startTest, 1500);
    } else {
      const reactionTime = performance.now() - startTime;
      timeDisplay.textContent = reactionTime.toFixed(0) + " ms";
      message.textContent = "Great! Your reaction time is:";
      waitingForClick = false;
    }
  });

  resetBtn.addEventListener("click", () => {
    clearTimeout(timeoutId);
    startTest();
  });

  // Start first test on load
  startTest();
})();
