const clock = document.getElementById("clock");
const copyButton = document.getElementById("copyButton");
const contractValue = document.getElementById("contractValue");
const copyStatus = document.getElementById("copyStatus");

function updateClock() {
  const now = new Date();
  if (clock) {
    clock.textContent = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  }
}
updateClock();
setInterval(updateClock, 1000);

function closeAllWindows() {
  document.querySelectorAll("[data-window]").forEach((windowEl) => {
    windowEl.classList.remove("is-open");
  });
}

document.querySelectorAll("[data-open]").forEach((trigger) => {
  trigger.addEventListener("click", () => {
    const targetId = trigger.getAttribute("data-open");
    const targetWindow = document.getElementById(targetId);
    if (!targetWindow) return;

    if (window.innerWidth <= 980) {
      const alreadyOpen = targetWindow.classList.contains("is-open");
      closeAllWindows();
      if (!alreadyOpen) targetWindow.classList.add("is-open");
    } else {
      targetWindow.classList.toggle("is-open");
    }
  });
});

document.querySelectorAll("[data-close]").forEach((trigger) => {
  trigger.addEventListener("click", () => {
    const targetId = trigger.getAttribute("data-close");
    const targetWindow = document.getElementById(targetId);
    if (targetWindow) targetWindow.classList.remove("is-open");
  });
});

if (copyButton && contractValue && copyStatus) {
  copyButton.addEventListener("click", async () => {
    const text = contractValue.textContent.trim();

    try {
      await navigator.clipboard.writeText(text);
      copyButton.textContent = "Copied";
      copyStatus.textContent = "Copied";
      setTimeout(() => {
        copyButton.textContent = "Copy Contract Address";
        copyStatus.textContent = "Ready";
      }, 1400);
    } catch (error) {
      copyButton.textContent = "Failed";
      copyStatus.textContent = "Failed";
      setTimeout(() => {
        copyButton.textContent = "Copy Contract Address";
        copyStatus.textContent = "Ready";
      }, 1400);
    }
  });
}
