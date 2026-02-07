/* =========================
   CONFIG (set these!)
========================= */
const PUMP_FUN_URL = "PASTE_PUMPFUN_URL_HERE";         // e.g. https://pump.fun/....
const CONTRACT_ADDRESS = "PASTE_CONTRACT_ADDRESS_HERE"; // e.g. 7abc...xyz

/* =========================
   HERO (fix id mismatch + path)
========================= */
// In deinem Index hat das Bild KEIN id="heroImg", sondern class="hero__img"
const heroImg = document.querySelector(".hero__img");
if (heroImg) {
  // ohne führenden Slash, GitHub Pages safe:
  heroImg.src = "./assets/hero.png";
  heroImg.addEventListener("error", () => {
    console.warn("Hero image not loading. Check path: ./assets/hero.png");
  });
}

/* =========================
   Smooth scroll (nur # Links)
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
   Pump.fun links (brand/button/footer)
========================= */
const pumpBtn = document.getElementById("pumpBtn");
const pumpFooter = document.getElementById("pumpFooter");
const brandLink = document.getElementById("brandLink");

[pumpBtn, pumpFooter, brandLink].forEach((el) => {
  if (el && PUMP_FUN_URL) el.href = PUMP_FUN_URL;
});

/* =========================
   Contract copy (mobile + iOS fallback)
   - kopiert IMMER den Text aus #contractText
========================= */
const contractText = document.getElementById("contractText");
const copyBtn = document.getElementById("copyBtn");
const toast = document.getElementById("toast");

if (contractText) contractText.textContent = CONTRACT_ADDRESS;

async function copyToClipboard(text) {
  // 1) Modern clipboard
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (_) {
    // 2) Fallback (iOS/Safari)
    try {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.setAttribute("readonly", "");
      ta.style.position = "fixed";
      ta.style.left = "-9999px";
      ta.style.top = "-9999px";
      document.body.appendChild(ta);

      // iOS selection workaround
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
  const value =
    (contractText?.textContent || "").trim() || CONTRACT_ADDRESS.trim();

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
   AUDIO (start muted, clean icon)
========================= */
const audio = document.getElementById("bgAudio");
const audioToggle = document.getElementById("audioToggle");
const audioIcon = document.getElementById("audioIcon");

// Icon masks (speaker on/off)
const MASK_SPEAKER_ON = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M3 10v4h4l5 4V6L7 10H3zm13.5 2a3.5 3.5 0 0 0-2-3.15v6.3A3.5 3.5 0 0 0 16.5 12zm0-8a1 1 0 0 1 1 1c0 .43-.27.81-.66.95A8.5 8.5 0 0 1 19 12a8.5 8.5 0 0 1-2.16 5.05 1 1 0 0 1-1.51-1.32A6.5 6.5 0 0 0 17 12a6.5 6.5 0 0 0-1.67-3.73A1 1 0 0 1 16.5 4z'/%3E%3C/svg%3E")`;
const MASK_SPEAKER_OFF = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M3 10v4h4l5 4V6L7 10H3zm16.3 2 1.7 1.7-1.4 1.4L18 13.4l-1.7 1.7-1.4-1.4L16.6 12l-1.7-1.7 1.4-1.4L18 10.6l1.7-1.7 1.4 1.4L19.4 12z'/%3E%3C/svg%3E")`;

function setAudioUI(isMuted) {
  if (!audioToggle || !audioIcon) return;
  audioToggle.classList.toggle("isMuted", isMuted);
  audioToggle.setAttribute("aria-pressed", String(!isMuted));
  audioIcon.style.setProperty("--mask", isMuted ? MASK_SPEAKER_OFF : MASK_SPEAKER_ON);
}

let muted = true;

if (audio) {
  audio.loop = true;
  audio.muted = true; // start muted (wie du wolltest)
}

setAudioUI(true);

audioToggle?.addEventListener("click", async () => {
  if (!audio) return;

  muted = !muted;
  audio.muted = muted;
  setAudioUI(muted);

  // iOS: play nur bei user gesture -> hier ok
  if (!muted) {
    try {
      await audio.play();
    } catch (e) {
      // Wenn Browser blockt, bleibt es halt stumm – UI bleibt korrekt
      console.warn("Audio play blocked by browser policy.", e);
    }
  }
});

/* =========================
   GALLERY (6 images) — fix: use ONE constant (no GALLERY vs galleryImages bug)
========================= */
const galleryImages = [
  { src: "assets/gallery/1.png", cap: "Image 1" },
  { src: "assets/gallery/2.png", cap: "Image 2" },
  { src: "assets/gallery/3.png", cap: "Image 3" },
  { src: "assets/gallery/4.png", cap: "Image 4" },
  { src: "assets/gallery/5.png", cap: "Image 5" },
  { src: "assets/gallery/6.png", cap: "Image 6" },
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
  for (let i = 0; i < GALLERY.length; i++) {
    const d = document.createElement("span");
    if (i === galIndex) d.classList.add("isOn");
    galDots.appendChild(d);
  }
}

function renderGallery() {
  if (!galImg || !galCap || !GALLERY.length) return;
  const item = GALLERY[galIndex];

  galImg.src = item.src;
  galImg.loading = "lazy";
  galCap.textContent = item.cap || "";
  renderDots();
}

galImg?.addEventListener("error", () => {
  if (galCap) {
    galCap.textContent = "Image missing — check filename/path in ./assets/gallery/";
  }
});

galPrev?.addEventListener("click", () => {
  galIndex = (galIndex - 1 + GALLERY.length) % GALLERY.length;
  renderGallery();
});

galNext?.addEventListener("click", () => {
  galIndex = (galIndex + 1) % GALLERY.length;
  renderGallery();
});

// Optional: swipe on mobile
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
    if (dx > 0) {
      galIndex = (galIndex - 1 + GALLERY.length) % GALLERY.length;
    } else {
      galIndex = (galIndex + 1) % GALLERY.length;
    }
    renderGallery();
  }
  touchStartX = null;
}, { passive: true });

renderGallery();
