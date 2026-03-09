const CONTRACT_ADDRESS = "5Yj9xK2j5GxR6eTQ9R9dB4E5xM7QwJ9U1n2h6P8r3s4A";
const X_PROFILE_URL = "https://x.com/tralalaonsol";
const TIKTOK_URL = "https://tiktok.com/@mythosmondays";
const PUMP_COIN_URL = `https://pump.fun/coin/${CONTRACT_ADDRESS}`;

const idsToPump = ["buyNowTop", "pumpBtn", "pumpFooter", "brandLink", "communityBuyBtn"];
idsToPump.forEach((id) => {
  const el = document.getElementById(id);
  if (el) el.href = PUMP_COIN_URL;
});

const xLink = document.getElementById("xIconLink");
if (xLink) xLink.href = X_PROFILE_URL;

const tiktokLink = document.getElementById("tiktokIconLink");
if (tiktokLink) tiktokLink.href = TIKTOK_URL;

const contractText = document.getElementById("contractText");
if (contractText) contractText.textContent = CONTRACT_ADDRESS;

const copyBtn = document.getElementById("copyBtn");
const toast = document.getElementById("toast");

copyBtn?.addEventListener("click", async () => {
  const text = contractText?.textContent?.trim();
  if (!text) return;

  let copied = false;
  try {
    await navigator.clipboard.writeText(text);
    copied = true;
  } catch (error) {
    copied = false;
  }

  if (toast) {
    toast.textContent = copied ? "Copied to clipboard" : "Copy failed";
    setTimeout(() => {
      toast.textContent = "";
    }, 1400);
  }
});

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const target = link.getAttribute("href");
    if (!target || target === "#") return;

    const section = document.querySelector(target);
    if (!section) return;

    event.preventDefault();
    section.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

const audio = document.getElementById("bgAudio");
const audioToggle = document.getElementById("audioToggle");
const audioIcon = document.getElementById("audioIcon");

if (audio) {
  audio.volume = 0.5;
  audio.muted = true;
}

audioToggle?.addEventListener("click", async () => {
  if (!audio) return;

  const isMuted = audio.muted;

  if (isMuted) {
    audio.muted = false;
    try {
      await audio.play();
      audioToggle.setAttribute("aria-pressed", "true");
      if (audioIcon) audioIcon.textContent = "❚❚";
    } catch (error) {
      audio.muted = true;
    }
    return;
  }

  audio.muted = true;
  audio.pause();
  audioToggle.setAttribute("aria-pressed", "false");
  if (audioIcon) audioIcon.textContent = "▶";
});
