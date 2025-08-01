(function () {
  if (document.getElementById("math-challenge-container")) return;

  const style = document.createElement("style");
  style.textContent = `
    #math-challenge-container {
      width: 320px;
      padding: 16px;
      background: #fff;
      border-radius: 12px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.15);
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      color: #222;
      user-select: none;
      text-align: center;
    }
    #math-question {
      font-size: 28px;
      font-weight: bold;
      margin-bottom: 20px;
    }
    #answer-input {
      width: 100px;
      font-size: 22px;
      padding: 6px 10px;
      border-radius: 8px;
      border: 2px solid #007bff;
      text-align: center;
      margin-bottom: 15px;
    }
    #submit-btn {
      background: #007bff;
      color: white;
      font-weight: 600;
      padding: 10px 18px;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      user-select: none;
      transition: background-color 0.3s;
    }
    #submit-btn:hover {
      background: #0056b3;
    }
    #timer {
      font-size: 18px;
      margin-bottom: 10px;
      color: #555;
    }
    #score {
      margin-top: 12px;
      font-size: 18px;
      font-weight: bold;
      color: #007bff;
    }
    #feedback {
      margin-top: 10px;
      min-height: 24px;
      font-weight: 600;
    }
  `;
  document.head.appendChild(style);

  const container = document.createElement("div");
  container.id = "math-challenge-container";

  const timerEl = document.createElement("div");
  timerEl.id = "timer";

  const questionEl = document.createElement("div");
  questionEl.id = "math-question";

  const input = document.createElement("input");
  input.type = "number";
  input.id = "answer-input";
  input.autocomplete = "off";

  const submitBtn = document.createElement("button");
  submitBtn.id = "submit-btn";
  submitBtn.textContent = "Submit";

  const feedback = document.createElement("div");
  feedback.id = "feedback";

  const scoreEl = document.createElement("div");
  scoreEl.id = "score";
  scoreEl.textContent = "Score: 0";

  container.appendChild(timerEl);
  container.appendChild(questionEl);
  container.appendChild(input);
  container.appendChild(submitBtn);
  container.appendChild(feedback);
  container.appendChild(scoreEl);

  const widgetBox = document.querySelector(".widget-box");
  if (widgetBox) {
    widgetBox.innerHTML = "";
    widgetBox.appendChild(container);
  } else {
    document.body.appendChild(container);
  }

  let timeLeft = 10;
  let score = 0;
  let currentAnswer = null;
  let timerId = null;

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function generateQuestion() {
    // Simple addition, subtraction, multiplication, division
    const operations = ["+", "-", "*", "/"];
    const op = operations[getRandomInt(0, operations.length - 1)];
    let a, b;

    switch(op) {
      case "+":
        a = getRandomInt(1, 50);
        b = getRandomInt(1, 50);
        currentAnswer = a + b;
        break;
      case "-":
        a = getRandomInt(20, 70);
        b = getRandomInt(1, a);
        currentAnswer = a - b;
        break;
      case "*":
        a = getRandomInt(2, 12);
        b = getRandomInt(2, 12);
        currentAnswer = a * b;
        break;
      case "/":
        b = getRandomInt(2, 12);
        currentAnswer = getRandomInt(2, 12);
        a = currentAnswer * b; // ensures integer division
        break;
    }
    questionEl.textContent = `${a} ${op} ${b} = ?`;
  }

  function updateTimer() {
    timerEl.textContent = `Time left: ${timeLeft}s`;
    if (timeLeft === 0) {
      clearInterval(timerId);
      feedback.textContent = `Time's up! Correct answer: ${currentAnswer}`;
      input.disabled = true;
      submitBtn.disabled = true;
      setTimeout(() => {
        startRound();
      }, 2000);
    }
    timeLeft--;
  }

  function startRound() {
    input.value = "";
    input.disabled = false;
    submitBtn.disabled = false;
    feedback.textContent = "";
    timeLeft = 10;
    updateTimer();
    generateQuestion();
    input.focus();
    clearInterval(timerId);
    timerId = setInterval(updateTimer, 1000);
  }

  submitBtn.addEventListener("click", () => {
    if (input.disabled) return;
    const userAnswer = Number(input.value);
    clearInterval(timerId);
    if (userAnswer === currentAnswer) {
      score++;
      feedback.textContent = "Correct! 🎉";
    } else {
      feedback.textContent = `Wrong! Correct answer: ${currentAnswer}`;
    }
    scoreEl.textContent = `Score: ${score}`;
    input.disabled = true;
    submitBtn.disabled = true;
    setTimeout(() => {
      startRound();
    }, 2000);
  });

  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      submitBtn.click();
    }
  });

  startRound();
})();
