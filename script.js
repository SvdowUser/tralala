// Menu
const overlay = document.getElementById("menuOverlay");
const openMenu = document.getElementById("openMenu");
const closeMenu = document.getElementById("closeMenu");

openMenu?.addEventListener("click", () => {
  overlay.classList.add("open");
  overlay.setAttribute("aria-hidden", "false");
});
closeMenu?.addEventListener("click", () => {
  overlay.classList.remove("open");
  overlay.setAttribute("aria-hidden", "true");
});
overlay?.addEventListener("click", (e) => {
  if (e.target === overlay) closeMenu.click();
});
document.querySelectorAll(".menu-link").forEach(a => {
  a.addEventListener("click", () => closeMenu.click());
});

// Copy contract
const copyBtn = document.getElementById("copyBtn");
const contractText = document.getElementById("contractText");

copyBtn?.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(contractText.textContent.trim());
    copyBtn.textContent = "Copied!";
    setTimeout(() => (copyBtn.textContent = "Copy"), 900);
  } catch {
    copyBtn.textContent = "Copy failed";
    setTimeout(() => (copyBtn.textContent = "Copy"), 900);
  }
});

// Audio (iOS requires user gesture — speaker tap is perfect)
const audio = document.getElementById("bgAudio");
const speakerBtn = document.getElementById("speakerBtn");
const volumeWrap = document.getElementById("volumeWrap");
const volume = document.getElementById("volume");

let isOn = false;

speakerBtn?.addEventListener("click", async () => {
  try {
    if (!isOn) {
      audio.volume = Number(volume?.value ?? 0.6);
      await audio.play();
      isOn = true;
      speakerBtn.classList.add("on");
      volumeWrap.classList.add("show");
      volumeWrap.setAttribute("aria-hidden", "false");
    } else {
      audio.pause();
      isOn = false;
      speakerBtn.classList.remove("on");
      volumeWrap.classList.remove("show");
      volumeWrap.setAttribute("aria-hidden", "true");
    }
  } catch (e) {
    // If autoplay policy blocks, user needs to tap again after interaction (normally this works on tap).
    console.log(e);
  }
});

volume?.addEventListener("input", () => {
  audio.volume = Number(volume.value);
});

// Gallery slider
const track = document.getElementById("track");
const prev = document.getElementById("prev");
const next = document.getElementById("next");

let index = 0;
const slides = () => track?.querySelectorAll("img").length ?? 0;

function render() {
  if (!track) return;
  track.style.transform = `translateX(${-index * 100}%)`;
}

prev?.addEventListener("click", () => {
  index = (index - 1 + slides()) % slides();
  render();
});
next?.addEventListener("click", () => {
  index = (index + 1) % slides();
  render();
});

// Touch swipe
let startX = null;
track?.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
}, { passive: true });

track?.addEventListener("touchend", (e) => {
  if (startX === null) return;
  const endX = e.changedTouches[0].clientX;
  const dx = endX - startX;
  if (Math.abs(dx) > 40) {
    if (dx < 0) next.click();
    else prev.click();
  }
  startX = null;
}, { passive: true });

// Footer year
document.getElementById("year").textContent = new Date().getFullYear();
