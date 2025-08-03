(function () {
  document.addEventListener("DOMContentLoaded", function () {
    const launcherScript = document.querySelector(".widget-launcher");
    const position = launcherScript?.getAttribute("data-position") || "bottom-right";

    const widgetList = [
      { label: "📅", src: "https://raw.githubusercontent.com/vineettiwari1708/widget-launcher/main/calendar-widget.js" },
      { label: "📈", src: "https://raw.githubusercontent.com/vineettiwari1708/widget-launcher/main/chart-widget.js" },
      { label: "📊", src: "https://raw.githubusercontent.com/vineettiwari1708/widget-launcher/main/analytics-widget.js" },
      { label: "📋", src: "https://raw.githubusercontent.com/vineettiwari1708/widget-launcher/main/task-widget.js" },
      { label: "🔢", src: "https://raw.githubusercontent.com/vineettiwari1708/widget-launcher/main/quick-count-widget.js" }
    ];

    const state = { isOpen: false };
    const container = document.createElement("div");

    const positionMap = {
      "bottom-right": "bottom: 20px; right: 20px;",
      "bottom-left": "bottom: 20px; left: 20px;",
      "top-right": "top: 20px; right: 20px;",
      "top-left": "top: 20px; left: 20px;",
      "center-right": "top: 50%; right: 20px; transform: translateY(-50%);",
      "center-left": "top: 50%; left: 20px; transform: translateY(-50%);"
    };
    container.style.cssText = `position: fixed; z-index: 99999; ${positionMap[position] || positionMap["bottom-right"]}`;

    const toggleBtn = document.createElement("button");
    toggleBtn.innerText = "🧰";
    toggleBtn.title = "Open Widgets";
    toggleBtn.setAttribute("aria-expanded", "false");
    toggleBtn.setAttribute("aria-label", "Toggle widget menu");
    toggleBtn.style.cssText = `
      width: 48px; height: 48px;
      background: #007bff; color: white;
      border-radius: 50%; border: none;
      cursor: pointer; font-size: 24px;
      position: relative; z-index: 1;
    `;
    container.appendChild(toggleBtn);

    const widgetBar = document.createElement("div");
    widgetBar.classList.add("widget-box");
    widgetBar.style.cssText = `
      display: none; flex-wrap: wrap; gap: 16px;
      width: 360px; max-height: 400px;
      background: rgba(255,255,255,0.3);
      border: 1px solid rgba(255,255,255,0.4);
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      border-radius: 16px; padding: 10px;
      position: absolute; right: 60px;
      top: 50%; transform: translateY(-50%);
      opacity: 0; transition: opacity 0.3s ease;
      backdrop-filter: blur(8px);
      overflow-y: auto; box-sizing: border-box;
      z-index: 0;
    `;
    container.appendChild(widgetBar);

    const style = document.createElement("style");
    style.textContent = `
      @media (max-width: 768px) {
        .widget-box {
          width: 100vw !important;
          height: 100vh !important;
          max-width: 100vw !important;
          max-height: 100vh !important;
          position: fixed !important;
          top: 0 !important;
          left: 0 !important;
          right: 0 !important;
          bottom: 0 !important;
          transform: none !important;
          border-radius: 0 !important;
          padding: 20px;
          display: flex !important;
          flex-direction: column;
          justify-content: flex-start;
          align-items: center;
          z-index: 99998 !important;
        }
      }
    `;
    document.head.appendChild(style);

    const loadedWidgets = new Set();

    window.renderLauncherButtons = function () {
      widgetBar.innerHTML = "";

      if (window.innerWidth <= 768) {
        const closeBtn = document.createElement("button");
        closeBtn.textContent = "✖";
        closeBtn.style.cssText = `
          align-self: flex-end;
          background: transparent;
          color: #333;
          font-size: 24px;
          border: none;
          margin-bottom: 10px;
          cursor: pointer;
        `;
        closeBtn.onclick = () => {
          state.isOpen = false;
          widgetBar.style.opacity = "0";
          setTimeout(() => widgetBar.style.display = "none", 300);
        };
        widgetBar.appendChild(closeBtn);
      }

      widgetList.forEach(widget => {
        const btn = document.createElement("button");
        btn.textContent = widget.label;
        btn.title = widget.label;
        btn.style.cssText = `
          width: 56px; height: 56px;
          background: #007bff; color: white;
          border-radius: 50%; border: none;
          cursor: pointer; font-size: 24px;
          display: flex; align-items: center;
          justify-content: center;
        `;
        btn.onmouseover = () => btn.style.background = "#0056b3";
        btn.onmouseout = () => btn.style.background = "#007bff";

        btn.onclick = async () => {
          widgetBar.innerHTML = `<div style="color:#333;">Loading...</div>`;
          try {
            const scriptText = await fetch(widget.src).then(r => r.text());
            const script = document.createElement("script");
            script.type = "module";
            script.textContent = scriptText;
            document.body.appendChild(script);
            loadedWidgets.add(widget.src);
          } catch (e) {
            console.error("Widget load error:", e);
            widgetBar.innerHTML = `<div style="color:red;">❌ Failed to load widget</div>`;
          }
        };

        widgetBar.appendChild(btn);
      });
    };

    window.renderLauncherButtons();

    toggleBtn.addEventListener("click", () => {
      state.isOpen = !state.isOpen;
      toggleBtn.setAttribute("aria-expanded", state.isOpen);
      if (state.isOpen) {
        widgetBar.style.display = "flex";
        requestAnimationFrame(() => widgetBar.style.opacity = "1");
      } else {
        widgetBar.style.opacity = "0";
        setTimeout(() => widgetBar.style.display = "none", 300);
      }
    });

    document.body.appendChild(container);
  });
})();
