// ========= Helpers =========
const $ = (q) => document.querySelector(q);
const $$ = (q) => document.querySelectorAll(q);

// ========= Menu =========
const menuBtn = $("#menuBtn");
const menuOverlay = $("#menuOverlay");
const menuClose = $("#menuClose");

function openMenu(){
  menuOverlay.classList.add("open");
  menuOverlay.setAttribute("aria-hidden", "false");
}
function closeMenu(){
  menuOverlay.classList.remove("open");
  menuOverlay.setAttribute("aria-hidden", "true");
}
menuBtn?.addEventListener("click", openMenu);
menuClose?.addEventListener("click", closeMenu);
menuOverlay?.addEventListener("click", (e) => {
  if (e.target === menuOverlay) closeMenu();
});
$$(".menu-links a").forEach(a => a.addEventListener("click", closeMenu));

// ========= Audio (IMPORTANT: autoplay blocked; start on first user gesture) =========
const audio = $("#bgAudio");
const soundBtn = $("#soundBtn");
const soundIcon = $("#soundIcon");

let audioEnabled = false;   // user wants sound
let audioStarted = false;   // audio actually started once

function setIcon(){
  soundIcon.textContent = audioEnabled ? "🔊" : "🔇";
}

// Try to start audio (must be called after user interaction)
async function tryStartAudio(){
  if (!audio) return;
  if (audioStarted) return;

  try {
    audio.volume = 0.85; // you can change
    await audio.play();
    audioStarted = true;
  } catch (err) {
    // If browser still blocks, user can press sound button again.
  }
}

// Toggle sound (AN/AUS only)
async function toggleSound(){
  audioEnabled = !audioEnabled;
  setIcon();

  if (!audio) return;

  if (audioEnabled) {
    // Start audio if not started yet
    await tryStartAudio();
    audio.muted = false;
  } else {
    audio.muted = true;
  }
}

// Button click
soundBtn?.addEventListener("click", async () => {
  await toggleSound();
});

// Start audio ON FIRST user click anywhere (only if they enabled sound once)
// If you want "first click starts sound immediately", set audioEnabled=true by default.
// But you asked for a toggle, so we keep it OFF by default.
document.addEventListener("click", async () => {
  // If user already turned it on but audio didn't start yet, try again.
  if (audioEnabled && !audioStarted) await tryStartAudio();
}, { once: false });

// Default state: muted/off
if (audio) audio.muted = true;
setIcon();

// ========= Copy Contract =========
const copyBtn = $("#copyBtn");
const contractText = $("#contractText");

copyBtn?.addEventListener("click", async () => {
  try {
    const txt = contractText?.textContent?.trim() || "";
    await navigator.clipboard.writeText(txt);
    copyBtn.textContent = "Copied!";
    setTimeout(() => (copyBtn.textContent = "Copy"), 1200);
  } catch {
    copyBtn.textContent = "Copy failed";
    setTimeout(() => (copyBtn.textContent = "Copy"), 1200);
  }
});

// ========= Gallery slider =========
const track = $("#galTrack");
const prev = $("#galPrev");
const next = $("#galNext");
const dotsWrap = $("#galDots");

let index = 0;
let total = 0;

function updateGallery(){
  if (!track) return;
  track.style.transform = `translateX(${-index * 100}%)`;

  if (dotsWrap) {
    $$(".dotbtn").forEach((d, i) => d.classList.toggle("active", i === index));
  }
}

function buildDots(){
  if (!track || !dotsWrap) return;
  const imgs = track.querySelectorAll("img");
  total = imgs.length;
  dotsWrap.innerHTML = "";

  for (let i = 0; i < total; i++){
    const b = document.createElement("button");
    b.className = "dotbtn" + (i === 0 ? " active" : "");
    b.setAttribute("aria-label", `Go to slide ${i + 1}`);
    b.addEventListener("click", () => {
      index = i;
      updateGallery();
    });
    dotsWrap.appendChild(b);
  }
}

prev?.addEventListener("click", () => {
  index = (index - 1 + total) % total;
  updateGallery();
});
next?.addEventListener("click", () => {
  index = (index + 1) % total;
  updateGallery();
});

// Swipe on mobile
let startX = 0;
let dx = 0;
track?.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
  dx = 0;
}, { passive: true });

track?.addEventListener("touchmove", (e) => {
  dx = e.touches[0].clientX - startX;
}, { passive: true });

track?.addEventListener("touchend", () => {
  if (Math.abs(dx) > 50) {
    if (dx < 0) index = (index + 1) % total;
    else index = (index - 1 + total) % total;
    updateGallery();
  }
});

buildDots();
updateGallery();
