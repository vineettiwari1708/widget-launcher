(function () {
  if (document.getElementById("shape-sorter-container")) return;

  const widgetBox = document.querySelector(".widget-box");
  if (!widgetBox) return;
  widgetBox.innerHTML = "";

  const style = document.createElement("style");
  style.textContent = `
    #shape-sorter-container {
      font-family: sans-serif;
      width: 320px;
      margin: auto;
      padding: 16px;
      background: #fff;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      text-align: center;
    }
    .shape-display {
      margin-bottom: 12px;
      font-size: 24px;
    }
    .outline-options {
      display: flex;
      justify-content: space-around;
      flex-wrap: wrap;
    }
    .outline {
      width: 60px;
      height: 60px;
      margin: 8px;
      border: 2px dashed #aaa;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 24px;
      cursor: pointer;
      border-radius: 10px;
      transition: background 0.2s;
    }
    .outline:hover {
      background: #f0f0f0;
    }
    .outline.correct {
      background: #c8e6c9;
      border-color: #4caf50;
    }
    .outline.incorrect {
      background: #ffcdd2;
      border-color: #e53935;
    }
    #next-shape {
      margin-top: 10px;
      display: none;
      background: #007bff;
      color: white;
      padding: 6px 12px;
      border: none;
      border-radius: 6px;
      cursor: pointer;
    }
    #feedback {
      margin-top: 8px;
      font-weight: bold;
    }
  `;
  document.head.appendChild(style);

  const container = document.createElement("div");
  container.id = "shape-sorter-container";

  const shapeEl = document.createElement("div");
  shapeEl.className = "shape-display";

  const outlinesDiv = document.createElement("div");
  outlinesDiv.className = "outline-options";

  const nextBtn = document.createElement("button");
  nextBtn.id = "next-shape";
  nextBtn.textContent = "Next";

  const feedback = document.createElement("div");
  feedback.id = "feedback";

  container.appendChild(shapeEl);
  container.appendChild(outlinesDiv);
  container.appendChild(feedback);
  container.appendChild(nextBtn);
  widgetBox.appendChild(container);

  const shapes = ["🔺", "🔵", "⬛", "⭐", "❤️", "🟩"];

  let currentShape = "";

  function shuffle(arr) {
    return arr.sort(() => Math.random() - 0.5);
  }

  function loadNewShape() {
    outlinesDiv.innerHTML = "";
    feedback.textContent = "";
    nextBtn.style.display = "none";

    currentShape = shapes[Math.floor(Math.random() * shapes.length)];
    shapeEl.textContent = `Match this: ${currentShape}`;

    const options = shuffle([currentShape, ...shuffle(shapes.filter(s => s !== currentShape)).slice(0, 3)]);

    options.forEach((shape) => {
      const outline = document.createElement("div");
      outline.className = "outline";
      outline.textContent = shape;
      outline.onclick = () => {
        if (shape === currentShape) {
          outline.classList.add("correct");
          feedback.textContent = "✅ Correct!";
        } else {
          outline.classList.add("incorrect");
          feedback.textContent = `❌ Nope, it was ${currentShape}`;
          [...outlinesDiv.children].forEach(o => {
            if (o.textContent === currentShape) o.classList.add("correct");
          });
        }
        [...outlinesDiv.children].forEach(o => o.style.pointerEvents = "none");
        nextBtn.style.display = "inline-block";
      };
      outlinesDiv.appendChild(outline);
    });
  }

  nextBtn.onclick = loadNewShape;
  loadNewShape();
})();
