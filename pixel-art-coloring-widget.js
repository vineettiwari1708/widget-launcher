(function () {
  if (document.getElementById("pixel-art-container")) return;

  const widgetBox = document.querySelector(".widget-box");
  if (!widgetBox) return;
  widgetBox.innerHTML = "";

  const style = document.createElement("style");
  style.textContent = `
    #pixel-art-container {
      font-family: sans-serif;
      width: 320px;
      margin: auto;
      padding: 16px;
      background: #fff;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      text-align: center;
      user-select: none;
    }
    #instruction {
      margin-bottom: 12px;
      font-weight: bold;
      font-size: 18px;
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(8, 30px);
      grid-gap: 2px;
      justify-content: center;
      margin-bottom: 16px;
    }
    .pixel {
      width: 30px;
      height: 30px;
      background: #f0f0f0;
      border: 1px solid #ccc;
      cursor: pointer;
      transition: background-color 0.3s;
    }
    .pixel.active {
      background: #4caf50;
    }
    #color-picker {
      margin-top: 12px;
    }
    .color-option {
      width: 30px;
      height: 30px;
      border-radius: 4px;
      cursor: pointer;
      display: inline-block;
      margin: 5px;
    }
    #reset-btn {
      margin-top: 12px;
      padding: 8px 20px;
      font-size: 16px;
      border: none;
      border-radius: 8px;
      background: #007bff;
      color: white;
      cursor: pointer;
    }
  `;
  document.head.appendChild(style);

  const container = document.createElement("div");
  container.id = "pixel-art-container";

  const instruction = document.createElement("div");
  instruction.id = "instruction";
  instruction.textContent = "Tap to color the pixel grid!";

  const grid = document.createElement("div");
  grid.className = "grid";

  const colorPicker = document.createElement("div");
  colorPicker.id = "color-picker";

  const resetBtn = document.createElement("button");
  resetBtn.id = "reset-btn";
  resetBtn.textContent = "Reset Grid";

  container.appendChild(instruction);
  container.appendChild(grid);
  container.appendChild(colorPicker);
  container.appendChild(resetBtn);
  widgetBox.appendChild(container);

  let currentColor = "#4caf50"; // default color (green)
  
  const colors = ["#4caf50", "#ff5722", "#2196f3", "#f44336", "#ffeb3b"]; // array of colors

  function createColorOptions() {
    colors.forEach(color => {
      const colorOption = document.createElement("div");
      colorOption.className = "color-option";
      colorOption.style.backgroundColor = color;
      colorOption.addEventListener("click", () => {
        currentColor = color;
        colorOption.style.border = "2px solid #000";
        Array.from(colorPicker.children).forEach(child => {
          if (child !== colorOption) child.style.border = "none";
        });
      });
      colorPicker.appendChild(colorOption);
    });
  }

  function createGrid() {
    grid.innerHTML = "";
    for (let i = 0; i < 64; i++) {
      const pixel = document.createElement("div");
      pixel.className = "pixel";
      pixel.addEventListener("click", () => {
        pixel.style.backgroundColor = currentColor;
      });
      grid.appendChild(pixel);
    }
  }

  resetBtn.addEventListener("click", () => {
    Array.from(grid.children).forEach(pixel => {
      pixel.style.backgroundColor = "#f0f0f0"; // reset to default
    });
  });

  createColorOptions();
  createGrid();
})();
