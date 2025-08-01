(function () {
  if (document.getElementById("quiz-container")) return;

  const style = document.createElement("style");
  style.textContent = `
    #quiz-container {
      width: 320px;
      padding: 16px;
      background: #fff;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.15);
      font-family: Arial, sans-serif;
      color: #333;
      user-select: none;
    }
    #quiz-question {
      font-size: 18px;
      margin-bottom: 16px;
      min-height: 60px;
    }
    .quiz-option {
      background: #f0f0f0;
      border-radius: 8px;
      padding: 10px 14px;
      margin-bottom: 10px;
      cursor: pointer;
      transition: background-color 0.3s, color 0.3s;
      border: 2px solid transparent;
    }
    .quiz-option:hover {
      background: #d8eaff;
    }
    .quiz-option.correct {
      background: #a0e7a0;
      border-color: #4caf50;
      color: #2e7d32;
      cursor: default;
    }
    .quiz-option.incorrect {
      background: #f5a1a1;
      border-color: #e53935;
      color: #b71c1c;
      cursor: default;
    }
    #quiz-feedback {
      margin-top: 12px;
      min-height: 24px;
      font-weight: bold;
    }
    #quiz-next {
      margin-top: 16px;
      padding: 8px 16px;
      background: #007bff;
      border: none;
      color: white;
      border-radius: 8px;
      cursor: pointer;
      font-weight: bold;
      display: none;
      user-select: none;
    }
  `;
  document.head.appendChild(style);

  const container = document.createElement("div");
  container.id = "quiz-container";

  const questionEl = document.createElement("div");
  questionEl.id = "quiz-question";

  const optionsContainer = document.createElement("div");
  optionsContainer.id = "quiz-options";

  const feedback = document.createElement("div");
  feedback.id = "quiz-feedback";

  const nextBtn = document.createElement("button");
  nextBtn.id = "quiz-next";
  nextBtn.textContent = "Next Question";

  container.appendChild(questionEl);
  container.appendChild(optionsContainer);
  container.appendChild(feedback);
  container.appendChild(nextBtn);

  const widgetBox = document.querySelector(".widget-box");
  if (widgetBox) {
    widgetBox.innerHTML = "";
    widgetBox.appendChild(container);
  } else {
    document.body.appendChild(container);
  }

  const quizData = [
    {
      question: "What is the capital of France?",
      options: ["Berlin", "Madrid", "Paris", "Rome"],
      answer: 2,
    },
    {
      question: "Which planet is known as the Red Planet?",
      options: ["Earth", "Mars", "Jupiter", "Saturn"],
      answer: 1,
    },
    {
      question: "What is the largest ocean on Earth?",
      options: ["Atlantic", "Indian", "Pacific", "Arctic"],
      answer: 2,
    },
    {
      question: "Who wrote 'Romeo and Juliet'?",
      options: ["Mark Twain", "William Shakespeare", "Charles Dickens", "Leo Tolstoy"],
      answer: 1,
    },
  ];

  let currentQuestionIndex = 0;
  let answered = false;

  function loadQuestion() {
    answered = false;
    nextBtn.style.display = "none";
    feedback.textContent = "";
    optionsContainer.innerHTML = "";
    const q = quizData[currentQuestionIndex];
    questionEl.textContent = q.question;
    q.options.forEach((opt, i) => {
      const btn = document.createElement("div");
      btn.className = "quiz-option";
      btn.textContent = opt;
      btn.addEventListener("click", () => {
        if (answered) return;
        answered = true;
        if (i === q.answer) {
          btn.classList.add("correct");
          feedback.textContent = "Correct! 🎉";
        } else {
          btn.classList.add("incorrect");
          feedback.textContent = `Wrong! Correct answer: ${q.options[q.answer]}`;
          // highlight correct answer
          [...optionsContainer.children].forEach((child, idx) => {
            if (idx === q.answer) child.classList.add("correct");
          });
        }
        nextBtn.style.display = "inline-block";
      });
      optionsContainer.appendChild(btn);
    });
  }

  nextBtn.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex >= quizData.length) {
      questionEl.textContent = "Quiz complete! Thanks for playing.";
      optionsContainer.innerHTML = "";
      feedback.textContent = "";
      nextBtn.style.display = "none";
    } else {
      loadQuestion();
    }
  });

  loadQuestion();
})();
