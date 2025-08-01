(function () {
  if (document.getElementById("daily-riddle-container")) return;

  const style = document.createElement("style");
  style.textContent = `
    #daily-riddle-container {
      width: 300px;
      min-height: 180px;
      background: #fffefa;
      border-radius: 14px;
      box-shadow: 0 4px 14px rgba(0,0,0,0.12);
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 20px;
      box-sizing: border-box;
      color: #333;
      user-select: none;
    }
    #riddle-title {
      font-weight: 700;
      font-size: 20px;
      margin-bottom: 12px;
      color: #2c3e50;
    }
    #riddle-text {
      font-size: 16px;
      text-align: center;
      margin-bottom: 16px;
      min-height: 70px;
      padding: 0 10px;
    }
    #show-answer-btn {
      padding: 8px 16px;
      background: #2c3e50;
      color: #fff;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      font-weight: 600;
      transition: background 0.3s;
      user-select: none;
    }
    #show-answer-btn:hover {
      background: #1a242f;
    }
    #answer-text {
      margin-top: 12px;
      font-style: italic;
      color: #555;
      font-size: 15px;
      max-width: 280px;
      text-align: center;
      user-select: text;
    }
  `;
  document.head.appendChild(style);

  const container = document.createElement("div");
  container.id = "daily-riddle-container";

  const title = document.createElement("div");
  title.id = "riddle-title";
  title.textContent = "🧩 Daily Riddle";

  const riddleText = document.createElement("div");
  riddleText.id = "riddle-text";
  riddleText.textContent = "Loading riddle...";

  const showAnswerBtn = document.createElement("button");
  showAnswerBtn.id = "show-answer-btn";
  showAnswerBtn.textContent = "Show Answer";

  const answerText = document.createElement("div");
  answerText.id = "answer-text";
  answerText.style.display = "none";

  container.appendChild(title);
  container.appendChild(riddleText);
  container.appendChild(showAnswerBtn);
  container.appendChild(answerText);

  // List of riddles with answers
  const riddles = [
    { q: "What has keys but can't open locks?", a: "A piano." },
    { q: "What has a head and a tail but no body?", a: "A coin." },
    { q: "I speak without a mouth and hear without ears. What am I?", a: "An echo." },
    { q: "What can travel around the world while staying in the same spot?", a: "A stamp." },
    { q: "What has to be broken before you can use it?", a: "An egg." },
    { q: "What has hands but can’t clap?", a: "A clock." },
    { q: "What gets wetter the more it dries?", a: "A towel." },
    { q: "I’m tall when I’m young and short when I’m old. What am I?", a: "A candle." },
    { q: "What invention lets you look right through a wall?", a: "A window." },
    { q: "What runs but never walks?", a: "A river." }
  ];

  // Pick riddle based on the day of the year
  function getDayOfYear() {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now - start + ((start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000);
    return Math.floor(diff / (1000 * 60 * 60 * 24));
  }

  const index = getDayOfYear() % riddles.length;
  const todayRiddle = riddles[index];

  riddleText.textContent = todayRiddle.q;

  showAnswerBtn.addEventListener("click", () => {
    if (answerText.style.display === "none") {
      answerText.textContent = todayRiddle.a;
      answerText.style.display = "block";
      showAnswerBtn.textContent = "Hide Answer";
    } else {
      answerText.style.display = "none";
      showAnswerBtn.textContent = "Show Answer";
    }
  });

  // Append to widget panel or body
  const widgetBox = document.querySelector(".widget-box");
  if (widgetBox) {
    widgetBox.innerHTML = "";
    widgetBox.appendChild(container);
  } else {
    document.body.appendChild(container);
  }
})();
