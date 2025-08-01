(function () {
  if (document.getElementById("mini-golf-container")) return;

  const widgetBox = document.querySelector(".widget-box");
  if (!widgetBox) return;
  widgetBox.innerHTML = "";

  const style = document.createElement("style");
  style.textContent = `
    #mini-golf-container {
      font-family: sans-serif;
      width: 320px;
      margin: auto;
      padding: 16px;
      background: #fff;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      text-align: center;
      user-select: none;
    }
    #instruction {
      margin-bottom: 12px;
      font-weight: bold;
      font-size: 18px;
    }
    #golf-course {
      position: relative;
      width: 100%;
      height: 180px;
      background: #90ee90;
      border-radius: 12px;
      margin-bottom: 16px;
    }
    #golf-ball {
      position: absolute;
      width: 20px;
      height: 20px;
      background: #fff;
      border-radius: 50%;
      bottom: 20px;
      left: 10px;
      transition: all 0.3s ease;
    }
    #hole {
      position: absolute;
      width: 30px;
      height: 30px;
      background: #f44336;
      border-radius: 50%;
      top: 10px;
      right: 10px;
    }
    #power-meter {
      width: 100%;
      height: 20px;
      background: #ddd;
      border-radius: 10px;
      margin-top: 16px;
      position: relative;
    }
    #power-bar {
      height: 100%;
      width: 0%;
      background: #4caf50;
      border-radius: 10px;
      transition: width 0.1s ease;
    }
    #hit-button {
      margin-top: 16px;
      padding: 8px 20px;
      font-size: 16px;
      background: #007bff;
      color: white;
      border: none;
      border-radius: 8px;
      cursor: pointer;
    }
    #result {
      font-size: 18px;
      font-weight: bold;
      margin-top: 16px;
    }
  `;
  document.head.appendChild(style);

  const container = document.createElement("div");
  container.id = "mini-golf-container";

  const instruction = document.createElement("div");
  instruction.id = "instruction";
  instruction.textContent = "Tap the button to adjust power, then hit the ball into the hole!";

  const golfCourse = document.createElement("div");
  golfCourse.id = "golf-course";

  const golfBall = document.createElement("div");
  golfBall.id = "golf-ball";

  const hole = document.createElement("div");
  hole.id = "hole";

  const powerMeter = document.createElement("div");
  powerMeter.id = "power-meter";

  const powerBar = document.createElement("div");
  powerBar.id = "power-bar";

  const hitButton = document.createElement("button");
  hitButton.id = "hit-button";
  hitButton.textContent = "Hit Ball";

  const result = document.createElement("div");
  result.id = "result";

  golfCourse.appendChild(golfBall);
  golfCourse.appendChild(hole);
  powerMeter.appendChild(powerBar);
  container.appendChild(instruction);
  container.appendChild(golfCourse);
  container.appendChild(powerMeter);
  container.appendChild(hitButton);
  container.appendChild(result);

  widgetBox.appendChild(container);

  let power = 0;
  let ballPosition = 10; // Initial left position of ball
  let hitInterval;

  hitButton.addEventListener("click", () => {
    if (hitInterval) clearInterval(hitInterval);
    result.textContent = "";
    power = 0;
    powerBar.style.width = "0%";

    // Increase power bar
    hitInterval = setInterval(() => {
      if (power >= 100) {
        clearInterval(hitInterval);
        hitBall();
      } else {
        power += 2;
        powerBar.style.width = `${power}%`;
      }
    }, 30);
  });

  function hitBall() {
    const hitDistance = (power / 100) * 280; // Distance ball will travel
    const finalPosition = ballPosition + hitDistance;

    // Move ball based on the power
    const moveBallInterval = setInterval(() => {
      if (finalPosition <= ballPosition) {
        clearInterval(moveBallInterval);
        checkResult();
      } else {
        ballPosition += 2;
        golfBall.style.left = `${ballPosition}px`;
      }
    }, 5);
  }

  function checkResult() {
    if (ballPosition >= 250 && ballPosition <= 280) {
      result.textContent = "Hole in One! 🏌️‍♂️";
    } else {
      result.textContent = "Try Again! ⛳";
    }
  }
})();
