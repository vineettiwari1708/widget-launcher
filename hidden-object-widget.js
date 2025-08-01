(function () {
  if (document.getElementById("hidden-object-container")) return;

  const widgetBox = document.querySelector(".widget-box");
  if (!widgetBox) return;
  widgetBox.innerHTML = "";

  const style = document.createElement("style");
  style.textContent = `
    #hidden-object-container {
      font-family: sans-serif;
      background: #fff8dc;
      border-radius: 12px;
      padding: 16px;
      max-width: 320px;
      margin: auto;
      user-select: none;
      text-align: center;
    }
    #hidden-object-message {
      margin-bottom: 12px;
      font-weight: bold;
      font-size: 18px;
    }
    #hidden-object-area {
      position: relative;
      width: 300px;
      height: 200px;
      margin: 0 auto;
      background: repeating-conic-gradient(
        #ccc 0 5deg, #eee 5deg 10deg
      );
      border: 2px solid #a0522d;
      border-radius: 10px;
      cursor: pointer;
      overflow: hidden;
    }
    #hidden-object-tiny {
      position: absolute;
      width: 20px;
      height: 20px;
      background: #ff4500;
      border-radius: 50%;
      box-shadow: 0 0 8px #ff6347;
      cursor: pointer;
    }
    .close-btn {
      margin-top: 12px;
      padding: 6px 12px;
      background: #dc3545;
      color: white;
      border: none;
      border-radius: 6px;
      font-weight: bold;
      cursor: pointer;
    }
  `;
  document.head.appendChild(style);

  const container = document.createElement("div");
  container.id = "hidden-object-container";

  const message = document.createElement("div");
  message.id = "hidden-object-message";
  message.textContent = "Find the hidden red dot!";

  const area = document.createElement("div");
  area.id = "hidden-object-area";

  const tiny = document.createElement("div");
  tiny.id = "hidden-object-tiny";

  // Randomly position the tiny object inside the area
  function positionTiny() {
    const padding = 10;
    const maxX = area.clientWidth - tiny.clientWidth - padding;
    const maxY = area.clientHeight - tiny.clientHeight - padding;
    const x = Math.floor(Math.random() * maxX) + padding;
    const y = Math.floor(Math.random() * maxY) + padding;
    tiny.style.left = `${x}px`;
    tiny.style.top = `${y}px`;
  }
  positionTiny();

  let found = false;

  tiny.addEventListener("click", (e) => {
    e.stopPropagation();
    if (found) return;
    found = true;
    message.textContent = "🎉 You found it! Great job!";
    tiny.style.background = "#32cd32";
    tiny.style.boxShadow = "0 0 10px #32cd32";
  });

  area.addEventListener("click", () => {
    if (found) return;
    message.textContent = "Keep looking...";
  });

  const closeBtn = document.createElement("button");
  closeBtn.className = "close-btn";
  closeBtn.textContent = "Close";
  closeBtn.addEventListener("click", () => {
    if (typeof window.renderLauncherButtons === "function") {
      widgetBox.innerHTML = "";
      window.renderLauncherButtons();
    }
  });

  area.appendChild(tiny);
  container.appendChild(message);
  container.appendChild(area);
  container.appendChild(closeBtn);
  widgetBox.appendChild(container);
})();
