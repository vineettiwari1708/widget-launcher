(function () {
  if (document.getElementById("quick-count-container")) return;

  const widgetBox = document.querySelector(".widget-box");
  if (!widgetBox) return;
  widgetBox.innerHTML = "";

  const style = document.createElement("style");
  style.textContent = `
    #quick-count-container {
      font-family: sans-serif;
      padding: 16px;
      background: #fff;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      position: relative;
      width: 100%;
      max-width: 350px;
      margin: 0 auto;
      text-align: center;
    }
    #item {
      font-size: 32px;
      margin: 20px auto;
      padding: 8px;
      background: #f1f1f1;
      border-radius: 6px;
      width: 50px;
    }
    .message {
      font-size: 18px;
      font-weight: bold;
      margin-bottom: 20px;
    }
    #input-field {
      width: 80px;
      padding: 8px;
      text-align: center;
      font-size: 16px;
      border: 1px solid #ccc;
      border-radius: 6px;
    }
    #submit-btn {
      padding: 8px 16px;
      background: #007bff;
      color: white;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      margin-top: 12px;
    }
    #reset-btn {
      padding: 8px 16px;
      background: #28a745;
      color: white;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      display: none;
      margin-top: 12px;
    }
    .incorrect {
      color: red;
    }
    .correct {
      color: green;
    }
  `;
  document.head.appendChild(style);

  const container = document.createElement("div");
  container.id = "quick-count-container";

  const message = document.createElement("div");
  message.className = "message";
  message.textContent = "How many items were shown?";

  const item = document.createElement("div");
  item.id = "item";
  item.textContent = "🍎"; // Example item: an apple emoji
  item.style.display = "none"; // Initially hidden

  const inputField = document.createElement("input");
  inputField.id = "input-field";
  inputField.type = "number";
  inputField.placeholder = "Your guess";

  const submitBtn = document.createElement("button");
  submitBtn.id = "submit-btn";
  submitBtn.textContent = "Submit";

  const resetBtn = document.createElement("button");
  resetBtn.id = "reset-btn";
  resetBtn.textContent = "Play Again";

  container.appendChild(message);
  container.appendChild(item);
  container.appendChild(inputField);
  container.appendChild(submitBtn);
  container.appendChild(resetBtn);
  widgetBox.appendChild(container);

  let itemCount = 0;
  let timer = null;

  // Function to show random number of items
  function showItems() {
    const numberOfItems = Math.floor(Math.random() * 5) + 3; // Show between 3 to 7 items
    itemCount = numberOfItems;

    item.style.display = "inline-block";
    item.textContent = "🍎".repeat(numberOfItems); // Display multiple items
    setTimeout(() => {
      item.style.display = "none";
      message.textContent = "How many items were shown?";
    }, 1500); // Items visible for 1.5 seconds
  }

  // Handle submit button click
  submitBtn.addEventListener("click", () => {
    const userGuess = parseInt(inputField.value, 10);
    if (isNaN(userGuess)) {
      message.textContent = "Please enter a valid number.";
      message.classList.add("incorrect");
    } else {
      if (userGuess === itemCount) {
        message.textContent = "Correct! 🎉";
        message.classList.add("correct");
      } else {
        message.textContent = `Incorrect. The correct number was ${itemCount}. 💥`;
        message.classList.add("incorrect");
      }
      resetBtn.style.display = "inline-block";
    }
  });

  // Handle reset button click
  resetBtn.addEventListener("click", () => {
    message.textContent = "How many items were shown?";
    message.classList.remove("correct", "incorrect");
    inputField.value = "";
    resetBtn.style.display = "none";
    showItems();
  });

  // Start the game
  showItems();
})();
