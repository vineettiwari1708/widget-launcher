(function () {
  if (document.getElementById("pssl-container")) return;

  const widgetBox = document.querySelector(".widget-box");
  if (!widgetBox) return;
  widgetBox.innerHTML = "";

  const style = document.createElement("style");
  style.textContent = `
    #pssl-container {
      font-family: sans-serif;
      max-width: 320px;
      margin: auto;
      background: #f0f8ff;
      padding: 16px;
      border-radius: 12px;
      text-align: center;
      user-select: none;
    }
    #pssl-title {
      font-size: 20px;
      margin-bottom: 12px;
      font-weight: bold;
    }
    .choices {
      display: flex;
      justify-content: space-around;
      margin-bottom: 12px;
      flex-wrap: wrap;
      gap: 8px;
    }
    .choice-btn {
      flex: 1 1 50px;
      max-width: 60px;
      padding: 8px 0;
      background: #007bff;
      color: white;
      border: none;
      border-radius: 8px;
      font-weight: bold;
      cursor: pointer;
      transition: background-color 0.3s;
    }
    .choice-btn:hover {
      background: #0056b3;
    }
    #pssl-result {
      min-height: 48px;
      margin-top: 8px;
      font-weight: bold;
      font-size: 16px;
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
  container.id = "pssl-container";

  const title = document.createElement("div");
  title.id = "pssl-title";
  title.textContent = "Paper, Scissors, Spock, Lizard";

  const choices = ["Paper", "Scissors", "Spock", "Lizard", "Rock"];
  const buttonsDiv = document.createElement("div");
  buttonsDiv.className = "choices";

  const resultDiv = document.createElement("div");
  resultDiv.id = "pssl-result";

  // Rules: key beats values
  const rules = {
    Scissors: ["Paper", "Lizard"],
    Paper: ["Rock", "Spock"],
    Rock: ["Lizard", "Scissors"],
    Lizard: ["Spock", "Paper"],
    Spock: ["Scissors", "Rock"],
  };

  function play(userChoice) {
    const compChoice = choices[Math.floor(Math.random() * choices.length)];
    if (userChoice === compChoice) {
      resultDiv.textContent = `Tie! Both chose ${userChoice}.`;
      return;
    }
    if (rules[userChoice].includes(compChoice)) {
      resultDiv.textContent = `You Win! ${userChoice} beats ${compChoice}.`;
    } else {
      resultDiv.textContent = `You Lose! ${compChoice} beats ${userChoice}.`;
    }
  }

  choices.forEach((choice) => {
    const btn = document.createElement("button");
    btn.className = "choice-btn";
    btn.textContent = choice;
    btn.addEventListener("click", () => play(choice));
    buttonsDiv.appendChild(btn);
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

  container.appendChild(title);
  container.appendChild(buttonsDiv);
  container.appendChild(resultDiv);
  container.appendChild(closeBtn);
  widgetBox.appendChild(container);
})();
