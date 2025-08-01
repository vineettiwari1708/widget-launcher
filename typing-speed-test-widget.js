(function () {
  if (document.getElementById("typing-speed-test-container")) return;

  const phrases = [
    "The quick brown fox jumps over the lazy dog",
    "Practice makes perfect",
    "ChatGPT is awesome",
    "JavaScript is fun",
    "OpenAI creates great tools",
    "Typing speed test challenge",
    "Keep calm and code on",
  ];

  const style = document.createElement("style");
  style.textContent = `
    #typing-speed-test-container {
      width: 320px;
      height: 250px;
      background: #fff;
      border-radius: 12px;
      box-shadow: 0 2px 12px rgba(0,0,0,0.15);
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      padding: 16px;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    #phrase {
      font-size: 18px;
      margin-bottom: 12px;
      color: #007bff;
      user-select: none;
      line-height: 1.4;
      min-height: 60px;
    }
    #input-area {
      flex-grow: 1;
      margin-bottom: 12px;
    }
    #input-text {
      width: 100%;
      height: 80px;
      font-size: 16px;
      padding: 8px;
      box-sizing: border-box;
      border-radius: 8px;
      border: 2px solid #007bff;
      resize: none;
      font-family: monospace;
      outline-offset: 2px;
    }
    #input-text:disabled {
      background: #e9ecef;
      color: #6c757d;
    }
    #start-btn {
      padding: 10px 20px;
      background: #007bff;
      border: none;
      color: white;
      border-radius: 10px;
      font-weight: 600;
      cursor: pointer;
      transition: background-color 0.3s;
      user-select: none;
    }
    #start-btn:hover:not(:disabled) {
      background: #0056b3;
    }
    #result {
      margin-top: 8px;
      font-size: 16px;
      color: #333;
      min-height: 24px;
    }
  `;
  document.head.appendChild(style);

  const container = document.createElement("div");
  container.id = "typing-speed-test-container";

  const phraseEl = document.createElement("div");
  phraseEl.id = "phrase";
  phraseEl.textContent = "Click Start to begin";

  const inputArea = document.createElement("div");
  inputArea.id = "input-area";

  const inputText = document.createElement("textarea");
  inputText.id = "input-text";
  inputText.placeholder = "Type here...";
  inputText.disabled = true;

  inputArea.appendChild(inputText);

  const startBtn = document.createElement("button");
  startBtn.id = "start-btn";
  startBtn.textContent = "Start Test";

  const resultEl = document.createElement("div");
  resultEl.id = "result";

  container.appendChild(phraseEl);
  container.appendChild(inputArea);
  container.appendChild(startBtn);
  container.appendChild(resultEl);

  // Append to widget panel or body
  const widgetBox = document.querySelector(".widget-box");
  if (widgetBox) {
    widgetBox.innerHTML = "";
    widgetBox.appendChild(container);
  } else {
    document.body.appendChild(container);
  }

  let startTime = null;
  let currentPhrase = "";
  let timer = null;

  function startTest() {
    // Reset
    inputText.value = "";
    resultEl.textContent = "";
    inputText.disabled = false;
    inputText.focus();

    currentPhrase = phrases[Math.floor(Math.random() * phrases.length)];
    phraseEl.textContent = currentPhrase;

    startTime = null;

    // Listen for first keystroke to start timer
    inputText.onkeydown = function (e) {
      if (!startTime) {
        startTime = performance.now();
      }
      if (e.key === "Enter") {
        e.preventDefault();
        finishTest();
      }
    };

    // Listen for input
    inputText.oninput = function () {
      if (inputText.value === currentPhrase) {
        finishTest();
      }
    };

    startBtn.disabled = true;
  }

  function finishTest() {
    if (!startTime) return;

    const elapsedMs = performance.now() - startTime;
    const elapsedMinutes = elapsedMs / 60000;
    const typedText = inputText.value;

    const wordCount = currentPhrase.trim().split(/\s+/).length;
    const wpm = Math.round(wordCount / elapsedMinutes);

    // Accuracy calculation
    let correctChars = 0;
    for (let i = 0; i < typedText.length; i++) {
      if (typedText[i] === currentPhrase[i]) correctChars++;
    }
    const accuracy = Math.round((correctChars / currentPhrase.length) * 100);

    resultEl.textContent = `WPM: ${wpm} | Accuracy: ${accuracy}%`;

    inputText.disabled = true;
    startBtn.disabled = false;
    startBtn.textContent = "Try Again";
  }

  startBtn.addEventListener("click", startTest);
})();
