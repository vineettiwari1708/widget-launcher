(function () {
  if (document.getElementById("odd-one-out-container")) return;

  const widgetBox = document.querySelector(".widget-box");
  if (!widgetBox) return;
  widgetBox.innerHTML = "";

  const style = document.createElement("style");
  style.textContent = `
    #odd-one-out-container {
      font-family: sans-serif;
      width: 320px;
      padding: 16px;
      margin: auto;
      background: #fff;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      text-align: center;
    }
    .ooo-question {
      font-size: 18px;
      margin-bottom: 12px;
    }
    .ooo-options {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 10px;
    }
    .ooo-option {
      padding: 10px 16px;
      background: #f0f0f0;
      border-radius: 8px;
      cursor: pointer;
      font-size: 16px;
      transition: background 0.3s;
      border: 2px solid transparent;
    }
    .ooo-option:hover {
      background: #d6ebff;
    }
    .ooo-option.correct {
      background: #c8e6c9;
      border-color: #4caf50;
    }
    .ooo-option.incorrect {
      background: #ffcdd2;
      border-color: #e53935;
    }
    #ooo-feedback {
      margin-top: 12px;
      font-weight: bold;
    }
    #ooo-next {
      margin-top: 16px;
      display: none;
      padding: 6px 14px;
      background: #007bff;
      color: white;
      border: none;
      border-radius: 6px;
      cursor: pointer;
    }
  `;
  document.head.appendChild(style);

  const container = document.createElement("div");
  container.id = "odd-one-out-container";

  const questionEl = document.createElement("div");
  questionEl.className = "ooo-question";
  questionEl.textContent = "Find the odd one out!";

  const optionsEl = document.createElement("div");
  optionsEl.className = "ooo-options";

  const feedback = document.createElement("div");
  feedback.id = "ooo-feedback";

  const nextBtn = document.createElement("button");
  nextBtn.id = "ooo-next";
  nextBtn.textContent = "Next";
  nextBtn.onclick = loadNewRound;

  container.appendChild(questionEl);
  container.appendChild(optionsEl);
  container.appendChild(feedback);
  container.appendChild(nextBtn);
  widgetBox.appendChild(container);

  const questions = [
    {
      group: ["Carrot", "Potato", "Onion", "Strawberry"],
      oddIndex: 3,
    },
    {
      group: ["Lion", "Tiger", "Leopard", "Cow"],
      oddIndex: 3,
    },
    {
      group: ["Violin", "Flute", "Drum", "Chair"],
      oddIndex: 3,
    },
    {
      group: ["Circle", "Square", "Triangle", "Banana"],
      oddIndex: 3,
    },
    {
      group: ["January", "March", "Sunday", "June"],
      oddIndex: 2,
    },
  ];

  let current = 0;

  function loadNewRound() {
    if (current >= questions.length) {
      questionEl.textContent = "You're done! 🎉";
      optionsEl.innerHTML = "";
      nextBtn.style.display = "none";
      feedback.textContent = "";
      return;
    }

    const { group, oddIndex } = questions[current];
    feedback.textContent = "";
    nextBtn.style.display = "none";
    optionsEl.innerHTML = "";

    group.forEach((item, index) => {
      const btn = document.createElement("div");
      btn.className = "ooo-option";
      btn.textContent = item;
      btn.onclick = () => {
        const correct = index === oddIndex;
        btn.classList.add(correct ? "correct" : "incorrect");
        feedback.textContent = correct ? "✅ Correct!" : `❌ Nope, it's "${group[oddIndex]}"`;
        [...optionsEl.children].forEach((el, i) => {
          el.style.pointerEvents = "none";
          if (i === oddIndex) el.classList.add("correct");
        });
        nextBtn.style.display = "inline-block";
      };
      optionsEl.appendChild(btn);
    });

    current++;
  }

  loadNewRound();
})();
