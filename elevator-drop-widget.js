(function () {
  if (document.getElementById("elevator-drop-container")) return;

  const widgetBox = document.querySelector(".widget-box");
  if (!widgetBox) return;
  widgetBox.innerHTML = "";

  const style = document.createElement("style");
  style.textContent = `
    #elevator-drop-container {
      font-family: sans-serif;
      width: 320px;
      height: 480px;
      margin: auto;
      padding: 16px;
      background: #fff;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      position: relative;
      overflow: hidden;
    }
    #elevator {
      width: 100%;
      height: 60px;
      background-color: #4caf50;
      border-radius: 5px;
      position: absolute;
      top: 0;
      left: 0;
      transition: top 0.5s ease-out;
    }
    #game-area {
      position: relative;
      width: 100%;
      height: 100%;
      background-color: #f1f1f1;
      border: 2px solid #333;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
    }
    .floor {
      width: 80%;
      height: 40px;
      background-color: #2196f3;
      margin: 8px 0;
      border-radius: 5px;
      position: absolute;
      left: 10%;
      text-align: center;
      line-height: 40px;
      color: white;
      font-weight: bold;
    }
    .message {
      font-size: 18px;
      font-weight: bold;
      text-align: center;
      position: absolute;
      top: 20px;
      width: 100%;
    }
    #tap-btn {
      padding: 8px 16px;
      margin-top: 12px;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      display: block;
      margin-left: auto;
      margin-right: auto;
    }
  `;
  document.head.appendChild(style);

  const container = document.createElement("div");
  container.id = "elevator-drop-container";

  const message = document.createElement("div");
  message.className = "message";
  message.textContent = "Tap to stop the elevator at the right floor!";

  const gameArea = document.createElement("div");
  gameArea.id = "game-area";

  const elevator = document.createElement("div");
  elevator.id = "elevator";

  const tapBtn = document.createElement("button");
  tapBtn.id = "tap-btn";
  tapBtn.textContent = "Stop Elevator";

  container.appendChild(message);
  gameArea.appendChild(elevator);
  gameArea.appendChild(tapBtn);
  container.appendChild(gameArea);
  widgetBox.appendChild(container);

  const floors = [];
  let targetFloor = null;
  let elevatorMoving = false;

  // Create the floors
  function createFloors() {
    const numFloors = 5;
    const floorHeight = 60;

    for (let i = 0; i < numFloors; i++) {
      const floor = document.createElement("div");
      floor.className = "floor";
      floor.style.top = `${i * floorHeight + 80}px`; // Adjust for top margin
      floor.textContent = `Floor ${i + 1}`;
      gameArea.appendChild(floor);
      floors.push(floor);
    }

    // Set a random target floor for the user to stop the elevator
    targetFloor = Math.floor(Math.random() * numFloors);
  }

  // Move the elevator to the top
  function startElevator() {
    elevatorMoving = true;
    elevator.style.transition = "none";
    elevator.style.top = "-60px"; // Start position off screen
    setTimeout(() => {
      elevator.style.transition = "top 0.5s ease-out"; // Allow animation after moving to top
      elevator.style.top = `${targetFloor * 60 + 80}px`; // Stop at a random floor
    }, 100);
  }

  // Check if the user stopped the elevator at the right floor
  function checkTap() {
    const elevatorTop = parseFloat(elevator.style.top);
    const targetTop = targetFloor * 60 + 80;

    if (Math.abs(elevatorTop - targetTop) <= 10) {
      message.textContent = "You Win! Correct Floor!";
    } else {
      message.textContent = "You Lose! Try Again!";
    }
    elevatorMoving = false;
  }

  // Reset the game
  function resetGame() {
    targetFloor = Math.floor(Math.random() * 5);
    message.textContent = "Tap to stop the elevator at the right floor!";
    elevator.style.top = "-60px"; // Reset elevator position
    startElevator();
  }

  tapBtn.addEventListener("click", () => {
    if (!elevatorMoving) {
      checkTap();
    } else {
      resetGame();
    }
  });

  createFloors();
  startElevator();
})();
