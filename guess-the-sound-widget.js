(function () {
  if (document.getElementById("guess-sound-container")) return;

  const widgetBox = document.querySelector(".widget-box");
  if (!widgetBox) return;
  widgetBox.innerHTML = "";

  const style = document.createElement("style");
  style.textContent = `
    #guess-sound-container {
      font-family: sans-serif;
      width: 300px;
      margin: 10px auto;
      padding: 16px;
      background: #fff;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      text-align: center;
      user-select: none;
    }
    #sound-question {
      font-size: 16px;
      margin-bottom: 10px;
    }
    .sound-btn {
      padding: 8px 16px;
      margin: 6px;
      border: none;
      border-radius: 8px;
      background: #e0e0e0;
      cursor: pointer;
      font-weight: bold;
      transition: background 0.3s;
    }
    .sound-btn:hover {
      background: #d0d0d0;
    }
    .sound-btn.correct {
      background: #a5d6a7;
      color: #2e7d32;
      cursor: default;
    }
    .sound-btn.incorrect {
      background: #ef9a9a;
      color: #b71c1c;
      cursor: default;
    }
    #play-sound {
      background: #007bff;
      color: white;
      margin-bottom: 10px;
    }
    #result {
      margin-top: 10px;
      font-weight: bold;
    }
    #next-btn {
      margin-top: 10px;
      display: none;
      background: #007bff;
      color: white;
    }
  `;
  document.head.appendChild(style);

  const container = document.createElement("div");
  container.id = "guess-sound-container";

  const soundData = [
    {
      name: "Beep",
      src: "https://actions.google.com/sounds/v1/alarms/beep_short.ogg",
    },
    {
      name: "Click",
      src: "https://actions.google.com/sounds/v1/cartoon/click.ogg",
    },
    {
      name: "Swoosh",
      src: "https://actions.google.com/sounds/v1/cartoon/wood_plank_flicks.ogg",
    },
    {
      name: "Pop",
      src: "https://actions.google.com/sounds/v1/cartoon/pop.ogg",
    },
  ];

  let currentIndex = -1;
  let correctAnswer = "";

  const questionEl = document.createElement("div");
  questionEl.id = "sound-question";
  questionEl.textContent = "Guess the sound!";

  const playBtn = document.createElement("button");
  playBtn.id = "play-sound";
  playBtn.className = "sound-btn";
  playBtn.textContent = "▶️ Play Sound";

  const optionsDiv = document.createElement("div");

  const result = document.createElement("div");
  result.id = "result";

  const nextBtn = document.createElement("button");
  nextBtn.id = "next-btn";
  nextBtn.className = "sound-btn";
  nextBtn.textContent = "Next";
  nextBtn.addEventListener("click", () => {
    loadSound();
  });

  playBtn.addEventListener("click", () => {
    const audio = new Audio(soundData[currentIndex].src);
    audio.play();
  });

  function loadSound() {
    result.textContent = "";
    optionsDiv.innerHTML = "";
    nextBtn.style.display = "none";

    currentIndex = Math.floor(Math.random() * soundData.length);
    correctAnswer = soundData[currentIndex].name;

    const shuffled = soundData
      .map((a) => a.name)
      .sort(() => Math.random() - 0.5);

    shuffled.forEach((label) => {
      const btn = document.createElement("button");
      btn.className = "sound-btn";
      btn.textContent = label;
      btn.addEventListener("click", () => {
        const isCorrect = label === correctAnswer;
        btn.classList.add(isCorrect ? "correct" : "incorrect");
        result.textContent = isCorrect ? "✅ Correct!" : `❌ It was "${correctAnswer}"`;
        [...optionsDiv.children].forEach((b) => {
          b.disabled = true;
          if (b.textContent === correctAnswer) b.classList.add("correct");
        });
        nextBtn.style.display = "inline-block";
      });
      optionsDiv.appendChild(btn);
    });
  }

  container.appendChild(questionEl);
  container.appendChild(playBtn);
  container.appendChild(optionsDiv);
  container.appendChild(result);
  container.appendChild(nextBtn);

  widgetBox.appendChild(container);
  loadSound();
})();
