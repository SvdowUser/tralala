/* =========================
   CONFIG (set these!)
========================= */
const CONTRACT_ADDRESS = "89muFzE1VpotYQfKm7xsuEbhgxRLyinmsELGTCSLpump";

// Pump.fun URLs (used for buttons + embed)
// NOTE: Some setups use /coin/<address>. If your page doesn't load, switch to ALT below.
const PUMP_COIN_URL = `https://pump.fun/coin/${CONTRACT_ADDRESS}`;
// const PUMP_COIN_URL = `https://pump.fun/${CONTRACT_ADDRESS}`; // ALT

// Embed URL (usually same). If embed gets blocked, we auto-hide the iframe and show a note.
const PUMP_EMBED_URL = PUMP_COIN_URL;

/* =========================
   HELPERS
========================= */
function resolveUrl(path) {
  return new URL(path, document.baseURI).toString();
}
function isRealUrl(u) {
  return typeof u === "string" && /^https?:\/\//i.test(u);
}

/* =========================
   HERO (image path + float)
========================= */
const heroImg = document.querySelector(".hero__img");
if (heroImg) {
  heroImg.src = resolveUrl("./hero.png");

  let t0 = performance.now();
  const floatLoop = (t) => {
    const dt = (t - t0) / 1000;
    const y = Math.sin(dt * 1.05) * 10;
    const x = Math.cos(dt * 0.85) * 3;
    const r = Math.sin(dt * 0.70) * 1.0;
    heroImg.style.transform = `translate3d(${x}px, ${-y}px, 0) rotate(${r}deg)`;
    requestAnimationFrame(floatLoop);
  };
  requestAnimationFrame(floatLoop);

  heroImg.addEventListener("error", () => {
    console.warn("Hero image not loading. Check file name/path: hero.png in repo root.");
  });
}

/* =========================
   Smooth scroll (only # links)
========================= */
document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener("click", (e) => {
    const id = a.getAttribute("href");
    if (!id || id === "#") return;
    const el = document.querySelector(id);
    if (!el) return;
    e.preventDefault();
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

/* =========================
   Mobile menu (burger)
========================= */
const burgerBtn = document.getElementById("burgerBtn");
const mobileMenu = document.getElementById("mobileMenu");
const menuClose = document.getElementById("menuClose");

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

burgerBtn?.addEventListener("click", () => {
  const isOpen = mobileMenu?.classList.contains("isOpen");
  isOpen ? closeMenu() : openMenu();
});
menuClose?.addEventListener("click", closeMenu);
mobileMenu?.addEventListener("click", (e) => {
  if (e.target === mobileMenu) closeMenu();
});
document.querySelectorAll(".menu__link").forEach((a) => a.addEventListener("click", closeMenu));

/* =========================
   Pump links + Swap embed
   - keeps ONLY top Buy button as main CTA
   - if you still have #pumpSwapBtn in HTML, we hide it to avoid double buttons
   - detects blocked/blank embeds and shows a fallback note
========================= */
const pumpBtn = document.getElementById("pumpBtn");
const pumpFooter = document.getElementById("pumpFooter");
const brandLink = document.getElementById("brandLink");
const pumpCtaTop = document.getElementById("pumpCtaTop");
const pumpSwapBtn = document.getElementById("pumpSwapBtn"); // optional (we hide to prevent duplicates)

const swapFrame = document.getElementById("swapFrame");
const swapSection = document.getElementById("swap");

// optional: a note element inside swap section (recommended)
// <div class="swapNote" id="swapNote">...</div>
let swapNote = document.getElementById("swapNote");

// If it doesn't exist, create a clean note automatically (so you don't have to edit HTML)
if (!swapNote && swapSection) {
  swapNote = document.createElement("div");
  swapNote.id = "swapNote";
  swapNote.className = "swapNote";
  swapNote.style.display = "none";
  swapNote.textContent =
    "Swap window blocked by your browser — use the Buy button at the top (Pump.fun).";
  swapSection.appendChild(swapNote);
}

// set all Pump links
[pumpBtn, pumpFooter, brandLink, pumpCtaTop].forEach((el) => {
  if (el && isRealUrl(PUMP_COIN_URL)) el.href = PUMP_COIN_URL;
});

// avoid duplicate CTAs: if pumpSwapBtn exists in your HTML, hide it
if (pumpSwapBtn) {
  pumpSwapBtn.style.display = "none";
  pumpSwapBtn.setAttribute("aria-hidden", "true");
  pumpSwapBtn.tabIndex = -1;
}

// set embed src
if (swapFrame && isRealUrl(PUMP_EMBED_URL)) {
  swapFrame.src = PUMP_EMBED_URL;

  // Detect blocked embeds (common with X-Frame-Options / CSP).
  // We cannot read the iframe content cross-origin, but we can:
  // - show a note if load never happens in time
  // - show a note if an error event fires
  let loaded = false;

  const showSwapBlocked = () => {
    if (!swapFrame) return;
    // Hide iframe to avoid empty big box
    swapFrame.style.display = "none";
    // Show a nice fallback note
    if (swapNote) swapNote.style.display = "block";
  };

  swapFrame.addEventListener("load", () => {
    loaded = true;
    // If it loads, keep iframe visible and hide note
    swapFrame.style.display = "block";
    if (swapNote) swapNote.style.display = "none";
  });

  swapFrame.addEventListener("error", () => {
    showSwapBlocked();
  });

  // Timeout fallback (if it never loads, often means blocked or stuck)
  setTimeout(() => {
    if (!loaded) showSwapBlocked();
  }, 3500);
}

/* =========================
   Contract copy (mobile + iOS fallback)
========================= */
const contractText = document.getElementById("contractText");
const copyBtn = document.getElementById("copyBtn");
const toast = document.getElementById("toast");

if (contractText) contractText.textContent = CONTRACT_ADDRESS;

async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (_) {
    try {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.setAttribute("readonly", "");
      ta.style.position = "fixed";
      ta.style.left = "-9999px";
      ta.style.top = "-9999px";
      document.body.appendChild(ta);
      ta.focus();
      ta.select();
      ta.setSelectionRange(0, ta.value.length);
      const ok = document.execCommand("copy");
      document.body.removeChild(ta);
      return ok;
    } catch (_) {
      return false;
    }
  }
}

copyBtn?.addEventListener("click", async () => {
  const value = (contractText?.textContent || "").trim();
  if (!value) return;

  const ok = await copyToClipboard(value);

  if (toast) {
    toast.textContent = ok ? "COPIED ✓" : "Copy failed";
    setTimeout(() => (toast.textContent = ""), 1600);
  }

  if (copyBtn) {
    copyBtn.textContent = ok ? "COPIED" : "COPY";
    setTimeout(() => (copyBtn.textContent = "COPY"), 1200);
  }
});

/* =========================
   AUDIO (start muted)
   - your HTML uses aria-pressed + SVG play/pause
   - we toggle aria-pressed properly so the right icon shows
========================= */
const audio = document.getElementById("bgAudio");
const audioToggle = document.getElementById("audioToggle");

let muted = true;

function setAudioUI(isMuted) {
  if (!audioToggle) return;
  audioToggle.setAttribute("aria-pressed", String(!isMuted)); // true = playing
}

if (audio) {
  audio.loop = true;
  audio.muted = true;
}
setAudioUI(true);

audioToggle?.addEventListener("click", async () => {
  if (!audio) return;

  muted = !muted;
  audio.muted = muted;
  setAudioUI(muted);

  if (!muted) {
    try {
      await audio.play();
    } catch (e) {
      console.warn("Audio play blocked.", e);
    }
  }
});

/* =========================
   GALLERY (ROOT files 1.png..6.png)
========================= */
const galleryImages = [
  { file: "1.png" }, { file: "2.png" }, { file: "3.png" },
  { file: "4.png" }, { file: "5.png" }, { file: "6.png" },
];

const galImg = document.getElementById("galImg");
const galCap = document.getElementById("galCap");
const galPrev = document.getElementById("galPrev");
const galNext = document.getElementById("galNext");
const galDots = document.getElementById("galDots");

let galIndex = 0;

function renderDots() {
  if (!galDots) return;
  galDots.innerHTML = "";
  for (let i = 0; i < galleryImages.length; i++) {
    const d = document.createElement("span");
    if (i === galIndex) d.classList.add("isOn");
    galDots.appendChild(d);
  }
}

function setGalleryImage() {
  if (!galImg || !galleryImages.length) return;
  const item = galleryImages[galIndex];
  const url = resolveUrl(`./${item.file}`);

  // cache bust (helps GitHub Pages caching)
  galImg.src = `${url}?v=${Date.now()}`;
  galImg.loading = "eager";

  // hide caption overlay
  if (galCap) {
    galCap.textContent = "";
    galCap.style.display = "none";
  }
  renderDots();
}

galImg?.addEventListener("error", () => {
  console.warn("Gallery image not loading. Check file names in repo root: 1.png..6.png");
});

galPrev?.addEventListener("click", () => {
  galIndex = (galIndex - 1 + galleryImages.length) % galleryImages.length;
  setGalleryImage();
});
galNext?.addEventListener("click", () => {
  galIndex = (galIndex + 1) % galleryImages.length;
  setGalleryImage();
});

// Swipe
let touchStartX = null;
galImg?.addEventListener("touchstart", (e) => {
  touchStartX = e.touches?.[0]?.clientX ?? null;
}, { passive: true });

galImg?.addEventListener("touchend", (e) => {
  if (touchStartX == null) return;
  const endX = e.changedTouches?.[0]?.clientX ?? null;
  if (endX == null) return;

  const dx = endX - touchStartX;
  if (Math.abs(dx) > 40) {
    galIndex = dx > 0
      ? (galIndex - 1 + galleryImages.length) % galleryImages.length
      : (galIndex + 1) % galleryImages.length;
    setGalleryImage();
  }
  touchStartX = null;
}, { passive: true });

setGalleryImage();
