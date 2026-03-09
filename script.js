const CONFIG = {
  contractAddress: "COMING SOON",
  xProfileUrl: "https://x.com/yourprofile",
  tiktokUrl: "https://www.tiktok.com/@mythosmondays"
};

const PUMP_COIN_URL =
  CONFIG.contractAddress && CONFIG.contractAddress !== "PASTE_CONTRACT_HERE"
    ? `https://pump.fun/coin/${CONFIG.contractAddress}`
    : "https://pump.fun/";

const contractText = document.getElementById("contractText");
const copyBtn = document.getElementById("copyBtn");
const toast = document.getElementById("toast");

const burgerBtn = document.getElementById("burgerBtn");
const mobileMenu = document.getElementById("mobileMenu");
const menuClose = document.getElementById("menuClose");

function setHref(id, value) {
  const el = document.getElementById(id);
  if (el) el.href = value;
}

function openMenu() {
  if (!mobileMenu || !burgerBtn) return;
  mobileMenu.classList.add("isOpen");
  mobileMenu.setAttribute("aria-hidden", "false");
  burgerBtn.setAttribute("aria-expanded", "true");
}

function closeMenu() {
  if (!mobileMenu || !burgerBtn) return;
  mobileMenu.classList.remove("isOpen");
  mobileMenu.setAttribute("aria-hidden", "true");
  burgerBtn.setAttribute("aria-expanded", "false");
}

function showToast(message) {
  if (!toast) return;
  toast.textContent = message;
  window.clearTimeout(showToast._timer);
  showToast._timer = window.setTimeout(() => {
    toast.textContent = "";
  }, 1600);
}

async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const temp = document.createElement("textarea");
    temp.value = text;
    temp.style.position = "fixed";
    temp.style.opacity = "0";
    document.body.appendChild(temp);
    temp.select();
    const ok = document.execCommand("copy");
    document.body.removeChild(temp);
    return ok;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  if (contractText) {
    contractText.textContent = CONFIG.contractAddress;
  }

  setHref("brandLink", PUMP_COIN_URL);
  setHref("buyNowTop", PUMP_COIN_URL);
  setHref("menuBuyBtn", PUMP_COIN_URL);
  setHref("heroPumpBtn", PUMP_COIN_URL);
  setHref("communityPumpBtn", PUMP_COIN_URL);
  setHref("pumpFooter", PUMP_COIN_URL);

  setHref("xIconLink", CONFIG.xProfileUrl);
  setHref("tiktokIconLink", CONFIG.tiktokUrl);

  burgerBtn?.addEventListener("click", () => {
    const isOpen = mobileMenu?.classList.contains("isOpen");
    if (isOpen) closeMenu();
    else openMenu();
  });

  menuClose?.addEventListener("click", closeMenu);

  mobileMenu?.addEventListener("click", (event) => {
    if (event.target === mobileMenu) closeMenu();
  });

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");
      if (!targetId || targetId === "#") return;

      const target = document.querySelector(targetId);
      if (!target) return;

      event.preventDefault();
      closeMenu();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });

  copyBtn?.addEventListener("click", async () => {
    const value = (CONFIG.contractAddress || "").trim();
    if (!value) return;

    const ok = await copyToClipboard(value);
    copyBtn.textContent = ok ? "COPIED" : "FAILED";
    showToast(ok ? "COPIED ✓" : "Copy failed");

    window.setTimeout(() => {
      copyBtn.textContent = "COPY";
    }, 1200);
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const oceanAudio = document.getElementById("oceanAudio");
  if (!oceanAudio) return;

  oceanAudio.volume = 0.12;

  const startOcean = async () => {
    try {
      await oceanAudio.play();
    } catch (e) {
      console.log("Ocean audio blocked until user interaction.");
    }
  };

  document.addEventListener("pointerdown", startOcean, { once: true });
});
/* ===== OPTIONAL OCEAN AUDIO ===== */
document.addEventListener("DOMContentLoaded", () => {
  const oceanAudio = document.getElementById("oceanAudio");
  if (!oceanAudio) return;

  oceanAudio.volume = 0.10;

  const startOcean = async () => {
    try {
      await oceanAudio.play();
    } catch (e) {
      console.log("Ocean audio will start after user interaction.");
    }
  };

  document.addEventListener("pointerdown", startOcean, { once: true });
});
