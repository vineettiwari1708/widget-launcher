(function () {
  if (document.getElementById("mini-sudoku-container")) return;

  const widgetBox = document.querySelector(".widget-box");
  if (!widgetBox) return;
  widgetBox.innerHTML = "";

  const style = document.createElement("style");
  style.textContent = `
    #mini-sudoku-container {
      font-family: sans-serif;
      max-width: 320px;
      margin: 10px auto;
      background: #fff;
      padding: 16px;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      user-select: none;
      text-align: center;
    }
    #mini-sudoku-title {
      font-weight: bold;
      font-size: 18px;
      margin-bottom: 12px;
    }
    #sudoku-grid {
      display: grid;
      grid-template-columns: repeat(4, 50px);
      grid-template-rows: repeat(4, 50px);
      gap: 4px;
      justify-content: center;
      margin-bottom: 12px;
    }
    .cell {
      border: 2px solid #007bff;
      font-size: 20px;
      text-align: center;
      line-height: 46px;
      font-weight: bold;
      user-select: none;
      background: #e8f0fe;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
    }
    .cell input {
      width: 100%;
      height: 100%;
      border: none;
      background: transparent;
      text-align: center;
      font-size: 20px;
      font-weight: bold;
      outline: none;
      cursor: pointer;
      color: #000;
    }
    #check-btn, #reset-btn {
      padding: 8px 16px;
      margin: 6px;
      border-radius: 8px;
      border: none;
      cursor: pointer;
      font-weight: bold;
      color: white;
      background-color: #007bff;
      transition: background-color 0.3s;
    }
    #check-btn:hover, #reset-btn:hover {
      background-color: #0056b3;
    }
    #result-msg {
      font-weight: bold;
      min-height: 24px;
      margin-top: 8px;
    }
    .bold-border-right {
      border-right: 3px solid #007bff;
    }
    .bold-border-bottom {
      border-bottom: 3px solid #007bff;
    }
  `;
  document.head.appendChild(style);

  const container = document.createElement("div");
  container.id = "mini-sudoku-container";

  const title = document.createElement("div");
  title.id = "mini-sudoku-title";
  title.textContent = "Mini Sudoku (4x4)";

  const grid = document.createElement("div");
  grid.id = "sudoku-grid";

  // Sample Sudoku puzzle (0 = empty)
  // Puzzle taken from a known simple 4x4 sudoku
  const puzzle = [
    1, 0, 0, 4,
    0, 0, 3, 0,
    0, 3, 0, 0,
    2, 0, 0, 1,
  ];

  // Solution for checking
  const solution = [
    1, 2, 3, 4,
    4, 1, 3, 2,
    3, 4, 1, 2,
    2, 3, 4, 1,
  ];

  const cells = [];

  function createCell(index) {
    const cell = document.createElement("div");
    cell.className = "cell";

    // Bold borders to separate blocks
    if ((index + 1) % 2 === 0) cell.classList.add("bold-border-right");
    if (index >= 8 && index < 12) cell.classList.add("bold-border-bottom");

    if (puzzle[index] !== 0) {
      cell.textContent = puzzle[index];
      cell.style.color = "#555";
    } else {
      const input = document.createElement("input");
      input.setAttribute("type", "text");
      input.setAttribute("maxlength", "1");
      input.setAttribute("inputmode", "numeric");
      input.addEventListener("input", () => {
        // Allow only digits 1-4
        input.value = input.value.replace(/[^1-4]/g, "");
      });
      cell.appendChild(input);
    }

    cells[index] = cell;
    grid.appendChild(cell);
  }

  for (let i = 0; i < 16; i++) {
    createCell(i);
  }

  const checkBtn = document.createElement("button");
  checkBtn.id = "check-btn";
  checkBtn.textContent = "Check Solution";

  const resetBtn = document.createElement("button");
  resetBtn.id = "reset-btn";
  resetBtn.textContent = "Reset";

  const resultMsg = document.createElement("div");
  resultMsg.id = "result-msg";

  function checkSolution() {
    for (let i = 0; i < 16; i++) {
      if (puzzle[i] === 0) {
        const input = cells[i].querySelector("input");
        if (!input || input.value === "") {
          resultMsg.textContent = "Please fill all empty cells.";
          return;
        }
        if (parseInt(input.value, 10) !== solution[i]) {
          resultMsg.textContent = "Incorrect solution. Keep trying!";
          return;
        }
      }
    }
    resultMsg.textContent = "Congratulations! You solved it! 🎉";
  }

  function resetGrid() {
    resultMsg.textContent = "";
    for (let i = 0; i < 16; i++) {
      if (puzzle[i] === 0) {
        const input = cells[i].querySelector("input");
        if (input) input.value = "";
      }
    }
  }

  checkBtn.addEventListener("click", checkSolution);
  resetBtn.addEventListener("click", resetGrid);

  container.appendChild(title);
  container.appendChild(grid);
  container.appendChild(checkBtn);
  container.appendChild(resetBtn);
  container.appendChild(resultMsg);

  widgetBox.appendChild(container);
})();
