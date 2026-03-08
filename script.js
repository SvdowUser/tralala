
const startButton = document.getElementById("startButton");
const startMenu = document.getElementById("startMenu");
const copyButton = document.getElementById("copyButton");
const contractValue = document.getElementById("contractValue");
const copyStatus = document.getElementById("copyStatus");
const clock = document.getElementById("clock");
const trayClock = document.getElementById("trayClock");
const windows = [...document.querySelectorAll("[data-window]")];
let zCounter = 10;

function updateClocks() {
  const now = new Date();
  const time = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  if (clock) clock.textContent = time;
  if (trayClock) trayClock.textContent = time;
}
updateClocks();
setInterval(updateClocks, 1000);

function bringToFront(win) {
  zCounter += 1;
  win.style.zIndex = String(zCounter);
}

function openWindow(id) {
  const win = document.getElementById(id);
  if (!win) return;
  win.classList.add("open");
  bringToFront(win);
  syncTaskButtons();
  if (window.innerWidth <= 960) {
    win.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function closeWindow(id) {
  const win = document.getElementById(id);
  if (!win) return;
  win.classList.remove("open");
  syncTaskButtons();
}

function toggleWindow(id) {
  const win = document.getElementById(id);
  if (!win) return;
  if (win.classList.contains("open")) {
    bringToFront(win);
  } else {
    openWindow(id);
  }
}

function syncTaskButtons() {
  document.querySelectorAll(".task-button").forEach((btn) => {
    const id = btn.getAttribute("data-open");
    const win = document.getElementById(id);
    btn.classList.toggle("active", !!win && win.classList.contains("open"));
  });
}

document.querySelectorAll("[data-open]").forEach((trigger) => {
  trigger.addEventListener("click", () => {
    const id = trigger.getAttribute("data-open");
    toggleWindow(id);
    if (startMenu) startMenu.classList.remove("open");
  });
});

document.querySelectorAll("[data-close]").forEach((trigger) => {
  trigger.addEventListener("click", () => {
    const id = trigger.getAttribute("data-close");
    closeWindow(id);
  });
});

document.querySelectorAll("[data-minimize]").forEach((trigger) => {
  trigger.addEventListener("click", () => {
    const id = trigger.getAttribute("data-minimize");
    closeWindow(id);
  });
});

if (startButton && startMenu) {
  startButton.addEventListener("click", () => {
    startMenu.classList.toggle("open");
  });

  document.addEventListener("click", (event) => {
    if (!startMenu.contains(event.target) && !startButton.contains(event.target)) {
      startMenu.classList.remove("open");
    }
  });
}

if (copyButton && contractValue && copyStatus) {
  copyButton.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(contractValue.textContent.trim());
      copyStatus.textContent = "Copied";
      copyButton.textContent = "Copied";
      setTimeout(() => {
        copyStatus.textContent = "Ready";
        copyButton.textContent = "Copy Contract Address";
      }, 1400);
    } catch (error) {
      copyStatus.textContent = "Failed";
      copyButton.textContent = "Failed";
      setTimeout(() => {
        copyStatus.textContent = "Ready";
        copyButton.textContent = "Copy Contract Address";
      }, 1400);
    }
  });
}

windows.forEach((win) => {
  win.addEventListener("mousedown", () => bringToFront(win));
});

windows.forEach((win) => {
  const handle = win.querySelector("[data-drag-handle]");
  if (!handle) return;

  let dragging = false;
  let startX = 0;
  let startY = 0;
  let startLeft = 0;
  let startTop = 0;

  handle.addEventListener("mousedown", (event) => {
    if (window.innerWidth <= 960) return;
    dragging = true;
    bringToFront(win);
    startX = event.clientX;
    startY = event.clientY;
    startLeft = win.offsetLeft;
    startTop = win.offsetTop;
    event.preventDefault();
  });

  document.addEventListener("mousemove", (event) => {
    if (!dragging) return;
    const nextLeft = Math.max(0, Math.min(window.innerWidth - win.offsetWidth, startLeft + event.clientX - startX));
    const nextTop = Math.max(28, Math.min(window.innerHeight - 60 - win.offsetHeight, startTop + event.clientY - startY));
    win.style.left = nextLeft + "px";
    win.style.top = nextTop + "px";
  });

  document.addEventListener("mouseup", () => {
    dragging = false;
  });
});

syncTaskButtons();
