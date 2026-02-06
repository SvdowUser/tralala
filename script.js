// HERO:
const heroImg = document.getElementById("heroImg");
if (heroImg) heroImg.src = "assets/hero.png";   // <— OHNE führenden Slash

// GALLERY (6 Bilder):
const galleryImages = [
  { src: "assets/gallery/1.jpg", cap: "Image 1" },
  { src: "assets/gallery/2.jpg", cap: "Image 2" },
  { src: "assets/gallery/3.jpg", cap: "Image 3" },
  { src: "assets/gallery/4.jpg", cap: "Image 4" },
  { src: "assets/gallery/5.jpg", cap: "Image 5" },
  { src: "assets/gallery/6.jpg", cap: "Image 6" },
];

// ======= NAV / MENU =======
const burgerBtn = document.getElementById("burgerBtn");
const mobileMenu = document.getElementById("mobileMenu");
const menuClose = document.getElementById("menuClose");

function openMenu() {
  mobileMenu.classList.add("isOpen");
  mobileMenu.setAttribute("aria-hidden", "false");
  burgerBtn.setAttribute("aria-expanded", "true");
}
function closeMenu() {
  mobileMenu.classList.remove("isOpen");
  mobileMenu.setAttribute("aria-hidden", "true");
  burgerBtn.setAttribute("aria-expanded", "false");
}

burgerBtn?.addEventListener("click", () => {
  if (mobileMenu.classList.contains("isOpen")) closeMenu();
  else openMenu();
});
menuClose?.addEventListener("click", closeMenu);
mobileMenu?.addEventListener("click", (e) => {
  if (e.target === mobileMenu) closeMenu();
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener("click", (e) => {
    const id = a.getAttribute("href");
    if (!id || id === "#") return;
    const el = document.querySelector(id);
    if (!el) return;
    e.preventDefault();
    closeMenu();
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

// ======= Pump.fun links =======
const pumpBtn = document.getElementById("pumpBtn");
const pumpFooter = document.getElementById("pumpFooter");
const pumpCtaTop = document.getElementById("pumpCtaTop");
const brandLink = document.getElementById("brandLink");

[pumpBtn, pumpFooter, pumpCtaTop, brandLink].forEach(el => {
  if (el) el.href = PUMP_FUN_URL;
});

// ======= Contract copy =======
const contractText = document.getElementById("contractText");
const copyBtn = document.getElementById("copyBtn");
const toast = document.getElementById("toast");

if (contractText) contractText.textContent = CONTRACT_ADDRESS;

async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // fallback
    try {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.left = "-9999px";
      ta.style.top = "-9999px";
      document.body.appendChild(ta);
      ta.focus();
      ta.select();
      const ok = document.execCommand("copy");
      document.body.removeChild(ta);
      return ok;
    } catch {
      return false;
    }
  }
}

copyBtn?.addEventListener("click", async () => {
  const ok = await copyToClipboard(CONTRACT_ADDRESS);
  if (toast) {
    toast.textContent = ok ? "COPIED ✓" : "Copy failed";
    setTimeout(() => (toast.textContent = ""), 1600);
  }
  copyBtn.textContent = "COPIED";
  setTimeout(() => (copyBtn.textContent = "COPY"), 1200);
});

// ======= AUDIO (start muted, clean icon) =======
const audio = document.getElementById("bgAudio");
const audioToggle = document.getElementById("audioToggle");
const audioIcon = document.getElementById("audioIcon");

// SVG masks for icons (speaker on/off)
const MASK_SPEAKER_ON = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M3 10v4h4l5 4V6L7 10H3zm13.5 2a3.5 3.5 0 0 0-2-3.15v6.3A3.5 3.5 0 0 0 16.5 12zm0-8a1 1 0 0 1 1 1c0 .43-.27.81-.66.95A8.5 8.5 0 0 1 19 12a8.5 8.5 0 0 1-2.16 5.05 1 1 0 0 1-1.51-1.32A6.5 6.5 0 0 0 17 12a6.5 6.5 0 0 0-1.67-3.73A1 1 0 0 1 16.5 4z'/%3E%3C/svg%3E")`;
const MASK_SPEAKER_OFF = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M3 10v4h4l5 4V6L7 10H3zm16.3 2 1.7 1.7-1.4 1.4L18 13.4l-1.7 1.7-1.4-1.4L16.6 12l-1.7-1.7 1.4-1.4L18 10.6l1.7-1.7 1.4 1.4L19.4 12z'/%3E%3C/svg%3E")`;

function setAudioUI(isMuted){
  if (!audioToggle || !audioIcon) return;
  audioToggle.classList.toggle("isMuted", isMuted);
  audioToggle.setAttribute("aria-pressed", String(!isMuted));
  audioIcon.style.setProperty("--mask", isMuted ? MASK_SPEAKER_OFF : MASK_SPEAKER_ON);
}

function ensureAudio(){
  if (!audio) return;
  // iOS requires a user gesture; we only try to play when user clicks.
  audio.loop = true;
}

let muted = true;
if (audio) audio.muted = true;
setAudioUI(true);
ensureAudio();

audioToggle?.addEventListener("click", async () => {
  if (!audio) return;

  muted = !muted;
  audio.muted = muted;
  setAudioUI(muted);

  // Try to play when unmuting
  if (!muted) {
    try { await audio.play(); } catch(e) {/* ignore */}
  }
});

// ======= GALLERY (6 images) =======
const galImg = document.getElementById("galImg");
const galCap = document.getElementById("galCap");
const galPrev = document.getElementById("galPrev");
const galNext = document.getElementById("galNext");
const galDots = document.getElementById("galDots");

let galIndex = 0;

function renderDots(){
  if (!galDots) return;
  galDots.innerHTML = "";
  for (let i=0;i<GALLERY.length;i++){
    const d = document.createElement("span");
    if (i === galIndex) d.classList.add("isOn");
    galDots.appendChild(d);
  }
}

function renderGallery(){
  if (!galImg || !galCap || !GALLERY.length) return;
  const item = GALLERY[galIndex];
  galImg.src = item.src;
  galCap.textContent = item.cap || "";
  renderDots();
}

galImg?.addEventListener("error", () => {
  if (galCap) galCap.textContent = "Image missing — check filename/path in /assets/gallery/";
});

galPrev?.addEventListener("click", () => {
  galIndex = (galIndex - 1 + GALLERY.length) % GALLERY.length;
  renderGallery();
});
galNext?.addEventListener("click", () => {
  galIndex = (galIndex + 1) % GALLERY.length;
  renderGallery();
});

renderGallery();
