(function () {
  if (document.getElementById("coin-dice-container")) return;

  const style = document.createElement("style");
  style.textContent = `
    #coin-dice-container {
      width: 320px;
      height: 260px;
      background: #fff;
      border-radius: 14px;
      box-shadow: 0 3px 15px rgba(0,0,0,0.2);
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      padding: 16px;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      user-select: none;
    }
    #buttons {
      display: flex;
      justify-content: space-around;
      margin-bottom: 12px;
    }
    button {
      flex: 1;
      margin: 0 6px;
      padding: 10px;
      font-weight: 600;
      font-size: 16px;
      border-radius: 8px;
      border: 2px solid #007bff;
      background: white;
      color: #007bff;
      cursor: pointer;
      transition: background-color 0.3s, color 0.3s;
    }
    button.active, button:hover {
      background: #007bff;
      color: white;
    }
    #result-area {
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      font-size: 24px;
      color: #333;
      position: relative;
    }
    #coin {
      width: 120px;
      height: 120px;
      border-radius: 50%;
      background: linear-gradient(145deg, #f0f0f0, #cacaca);
      box-shadow: inset 3px 3px 8px #bebebe, inset -3px -3px 8px #ffffff;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 64px;
      font-weight: bold;
      color: #007bff;
      cursor: pointer;
      user-select: none;
      perspective: 800px;
      margin-bottom: 20px;
      transition: transform 1s ease;
    }
    #dice {
      width: 120px;
      height: 120px;
      background: #007bff;
      border-radius: 16px;
      color: white;
      font-weight: 700;
      font-size: 72px;
      display: flex;
      align-items: center;
      justify-content: center;
      user-select: none;
      cursor: pointer;
      box-shadow: 0 4px 10px rgba(0,0,0,0.2);
      transition: transform 1s ease;
      margin-bottom: 20px;
    }
    #message {
      font-size: 18px;
      color: #555;
      min-height: 24px;
    }
  `;
  document.head.appendChild(style);

  const container = document.createElement("div");
  container.id = "coin-dice-container";

  // Buttons
  const buttonsDiv = document.createElement("div");
  buttonsDiv.id = "buttons";

  const coinBtn = document.createElement("button");
  coinBtn.textContent = "Coin Toss";
  coinBtn.classList.add("active");

  const diceBtn = document.createElement("button");
  diceBtn.textContent = "Dice Roll";

  buttonsDiv.appendChild(coinBtn);
  buttonsDiv.appendChild(diceBtn);
  container.appendChild(buttonsDiv);

  // Result area
  const resultArea = document.createElement("div");
  resultArea.id = "result-area";

  // Coin element
  const coin = document.createElement("div");
  coin.id = "coin";
  coin.textContent = "🪙";
  coin.title = "Click to toss coin";

  // Dice element
  const dice = document.createElement("div");
  dice.id = "dice";
  dice.textContent = "🎲";
  dice.title = "Click to roll dice";
  dice.style.display = "none";

  // Message
  const message = document.createElement("div");
  message.id = "message";
  message.textContent = "Click the coin to toss or dice to roll.";

  resultArea.appendChild(coin);
  resultArea.appendChild(dice);
  resultArea.appendChild(message);

  container.appendChild(resultArea);

  // Append to widget panel or body
  const widgetBox = document.querySelector(".widget-box");
  if (widgetBox) {
    widgetBox.innerHTML = "";
    widgetBox.appendChild(container);
  } else {
    document.body.appendChild(container);
  }

  // State
  let isCoinActive = true;
  let flipping = false;

  // Switch modes
  function switchToCoin() {
    if (flipping) return;
    isCoinActive = true;
    coinBtn.classList.add("active");
    diceBtn.classList.remove("active");
    coin.style.display = "flex";
    dice.style.display = "none";
    message.textContent = "Click the coin to toss.";
  }

  function switchToDice() {
    if (flipping) return;
    isCoinActive = false;
    coinBtn.classList.remove("active");
    diceBtn.classList.add("active");
    coin.style.display = "none";
    dice.style.display = "flex";
    message.textContent = "Click the dice to roll.";
  }

  // Coin toss logic with flip animation
  coin.onclick = () => {
    if (flipping) return;
    flipping = true;
    message.textContent = "Tossing...";
    let flips = 0;
    let flipCount = 10;
    let flipInterval = setInterval(() => {
      coin.style.transform = `rotateY(${flips * 180}deg)`;
      coin.textContent = flips % 2 === 0 ? "🪙" : "❌"; // Use emoji heads/tails: 🪙/❌ or ⚪️/⚫️
      flips++;
      if (flips > flipCount) {
        clearInterval(flipInterval);
        const result = Math.random() < 0.5 ? "Heads 🪙" : "Tails ❌";
        coin.textContent = result.startsWith("Heads") ? "🪙" : "❌";
        message.textContent = `Result: ${result}`;
        coin.style.transform = "rotateY(0deg)";
        flipping = false;
      }
    }, 120);
  };

  // Dice roll logic with animation
  dice.onclick = () => {
    if (flipping) return;
    flipping = true;
    message.textContent = "Rolling...";
    let rolls = 0;
    let rollCount = 15;
    let rollInterval = setInterval(() => {
      const randomFace = Math.floor(Math.random() * 6) + 1;
      dice.textContent = randomFace;
      dice.style.transform = `rotate(${rolls * 30}deg)`;
      rolls++;
      if (rolls > rollCount) {
        clearInterval(rollInterval);
        message.textContent = `Result: ${dice.textContent}`;
        dice.style.transform = "rotate(0deg)";
        flipping = false;
      }
    }, 100);
  };

  coinBtn.onclick = switchToCoin;
  diceBtn.onclick = switchToDice;
})();
