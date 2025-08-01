(function () {
  if (document.getElementById("fortune-cookie-container")) return;

  const style = document.createElement("style");
  style.textContent = `
    #fortune-cookie-container {
      width: 300px;
      height: 200px;
      background: #fff8e1;
      border-radius: 16px;
      box-shadow: 0 4px 15px rgba(0,0,0,0.15);
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 20px;
      box-sizing: border-box;
      user-select: none;
    }
    #cookie {
      font-size: 80px;
      cursor: pointer;
      user-select: none;
      transition: transform 1s ease;
      margin-bottom: 16px;
    }
    #message {
      font-size: 18px;
      color: #6b4f01;
      text-align: center;
      min-height: 60px;
      padding: 0 10px;
      font-weight: 600;
    }
    #hint {
      font-size: 12px;
      color: #a67c00;
      margin-top: 8px;
      user-select: none;
    }
  `;
  document.head.appendChild(style);

  const container = document.createElement("div");
  container.id = "fortune-cookie-container";

  const cookie = document.createElement("div");
  cookie.id = "cookie";
  cookie.textContent = "🥠";
  cookie.title = "Click to reveal your fortune!";

  const message = document.createElement("div");
  message.id = "message";
  message.textContent = "Click the fortune cookie to get your advice.";

  const hint = document.createElement("div");
  hint.id = "hint";
  hint.textContent = "Try your luck!";

  container.appendChild(cookie);
  container.appendChild(message);
  container.appendChild(hint);

  // Fortune messages
  const fortunes = [
    "You will find happiness soon.",
    "A fresh start will put you on your way.",
    "Adventure awaits you this weekend.",
    "Your talents will be recognized and rewarded.",
    "A pleasant surprise is in store for you.",
    "Believe in yourself and others will too.",
    "An old friend will reappear in your life.",
    "Good news will come to you by mail.",
    "Now is the time to try something new.",
    "Your hard work will soon pay off.",
    "Patience will bring you rewards.",
    "Expect great things in the near future.",
    "Someone is thinking of you fondly.",
    "You will conquer obstacles with grace.",
    "A new opportunity is just around the corner.",
    "Trust your instincts; they will lead you well.",
    "Joy and prosperity are heading your way.",
    "Your kindness will be returned tenfold.",
    "Seize the moment and make it yours.",
    "Harmony and balance will come to you."
  ];

  let spinning = false;

  cookie.addEventListener("click", () => {
    if (spinning) return;
    spinning = true;
    message.textContent = "Spinning the cookie...";
    cookie.style.transform = "rotate(720deg)";
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * fortunes.length);
      message.textContent = fortunes[randomIndex];
      cookie.style.transform = "rotate(0deg)";
      spinning = false;
    }, 1500);
  });

  // Append container to widget-box or body
  const widgetBox = document.querySelector(".widget-box");
  if (widgetBox) {
    widgetBox.innerHTML = "";
    widgetBox.appendChild(container);
  } else {
    document.body.appendChild(container);
  }
})();
