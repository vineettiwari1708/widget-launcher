(function () {
  if (document.getElementById("memory-numbers-container")) return;

  const widgetBox = document.querySelector(".widget-box");
  if (!widgetBox) return;
  widgetBox.innerHTML = "";

  const style = document.createElement("style");
  style.textContent = `
    #memory-numbers-container {
      font-family: sans-serif;
      width: 320px;
      margin: auto;
      padding: 16px;
      background: #fff;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      text-align: center;
    }
    .sequence-display {
      font-size: 24px;
      letter-spacing: 10px;
      margin-bottom: 20px;
      min-height: 40px;
    }
    input[type="text"] {
      font-size: 20px;
      padding: 6px 12px;
      width: 80%;
      margin-bottom: 16px;
      border: 2px solid #007bff;
      border-radius: 6px;
      text-align: center;
    }
    button {
      background: #007bff;
      color: white;
      border: none;
      padding: 8px 16px;
      border-radius: 6px;
      cursor: pointer;
      font-size: 16px;
    }
    button:disabled {
      background: #999;
      cursor: default;
    }
    #feedback {
      margin-top: 12px;
      font-weight: bold;
      min-height: 24px;
    }
  `;
  document.head.appendChild(style);

  const container = document.createElement("div");
  container.id = "memory-numbers-container";

  const title = document.createElement("h3");
  title.textContent = "Memory Numbers";

  const sequenceDisplay = document.createElement("div");
  sequenceDisplay.className = "sequence-display";

  const input = document.createElement("input");
  input.type = "text";
  input.placeholder = "Type the sequence here";
  input.disabled = true;

  const submitBtn = document.createElement("button");
  submitBtn.textContent = "Submit";
  submitBtn.disabled = true;

  const feedback = document.createElement("div");
  feedback.id = "feedback";

  container.appendChild(title);
  container.appendChild(sequenceDisplay);
  container.appendChild(input);
  container.appendChild(submitBtn);
  container.appendChild(feedback);
  widgetBox.appendChild(container);

  let sequence = [];
  const sequenceLength = 5;  // You can change this to increase difficulty
  let showDuration = 3000; // milliseconds to show sequence

  function generateSequence() {
    sequence = [];
    for (let i = 0; i < sequenceLength; i++) {
      sequence.push(Math.floor(Math.random() * 10)); // digits 0-9
    }
  }

  function showSequence() {
    sequenceDisplay.textContent = sequence.join(" ");
    input.disabled = true;
    submitBtn.disabled = true;
    feedback.textContent = "";
    input.value = "";
    setTimeout(() => {
      sequenceDisplay.textContent = "???";
      input.disabled = false;
      submitBtn.disabled = false;
      input.focus();
    }, showDuration);
  }

  submitBtn.addEventListener("click", () => {
    const userInput = input.value.trim().replace(/\s+/g, "");
    const correctSeq = sequence.join("");
    if (userInput === correctSeq) {
      feedback.textContent = "✅ Correct!";
      feedback.style.color = "green";
    } else {
      feedback.textContent = `❌ Incorrect! The sequence was: ${sequence.join(" ")}`;
      feedback.style.color = "red";
    }
    input.disabled = true;
    submitBtn.disabled = true;
    setTimeout(() => {
      generateSequence();
      showSequence();
    }, 2000);
  });

  generateSequence();
  showSequence();
})();
