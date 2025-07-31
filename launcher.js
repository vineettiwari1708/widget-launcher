(function () {
  document.addEventListener("DOMContentLoaded", async function () {
    const launcherScript = document.querySelector(".widget-launcher");
    const dataUrl = launcherScript.getAttribute("data-widget-src");
    const position = launcherScript.getAttribute("data-position") || "bottom-right";

    if (!dataUrl) {
      console.error("Missing `data-widget-src` for widget launcher.");
      return;
    }

    let widgetList = [];

    try {
      const resp = await fetch(dataUrl);
      widgetList = await resp.json();
      if (!Array.isArray(widgetList)) throw new Error("Invalid widget list JSON.");
    } catch (err) {
      console.error("Failed to load widget list:", err);
      return;
    }

    const state = { isOpen: false };

    // Create container
    const container = document.createElement("div");

    let top = "auto", bottom = "auto", left = "auto", right = "auto", transform = "";

    if (position === "center-right") {
      top = "50%";
      right = "20px";
      transform = "translateY(-50%)";
    } else if (position === "center-left") {
      top = "50%";
      left = "20px";
      transform = "translateY(-50%)";
    } else if (position === "bottom-right") {
      bottom = "20px";
      right = "20px";
    } else if (position === "bottom-left") {
      bottom = "20px";
      left = "20px";
    } else if (position === "top-right") {
      top = "20px";
      right = "20px";
    } else if (position === "top-left") {
      top = "20px";
      left = "20px";
    }

    container.style.cssText = `
      position: fixed;
      top: ${top};
      bottom: ${bottom};
      left: ${left};
      right: ${right};
      transform: ${transform};
      z-index: 99999;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 10px;
    `;

    // Toggle button
    const toggleBtn = document.createElement("button");
    toggleBtn.innerText = "🧰";
    toggleBtn.title = "Open Widgets";
    toggleBtn.style.cssText = `
      width: 48px;
      height: 48px;
      background: #007bff;
      color: white;
      border-radius: 24px;
      border: none;
      cursor: pointer;
      font-size: 24px;
    `;
    container.appendChild(toggleBtn);

    // Widget icon bar
    const widgetBar = document.createElement("div");
    widgetBar.style.cssText = `
      display: none;
      flex-direction: column;
      align-items: flex-end;
      gap: 8px;
    `;

    widgetList.forEach(widget => {
      const btn = document.createElement("button");
      btn.textContent = widget.label || "⚙️ Widget";
      btn.title = widget.label;
      btn.style.cssText = `
        padding: 6px 10px;
        background: #fff;
        color: #333;
        border-radius: 6px;
        border: 1px solid #ccc;
        cursor: pointer;
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        font-size: 14px;
      `;
      btn.onclick = async () => {
        btn.disabled = true;
        btn.innerText = "⏳ Loading...";
        try {
          const scriptText = await fetch(widget.src).then(r => r.text());
          const script = document.createElement("script");
          script.type = "module";
          script.textContent = scriptText;
          document.body.appendChild(script);
          btn.innerText = widget.label;
        } catch (e) {
          console.error("Widget load error:", e);
          btn.innerText = "❌ Error";
        } finally {
          btn.disabled = false;
        }
      };
      widgetBar.appendChild(btn);
    });

    container.appendChild(widgetBar);
    document.body.appendChild(container);

    toggleBtn.addEventListener("click", () => {
      state.isOpen = !state.isOpen;
      widgetBar.style.display = state.isOpen ? "flex" : "none";
    });
  });
})();
