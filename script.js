/* =========================
   CONFIG (set these!)
========================= */
const PUMP_FUN_URL = "PASTE_PUMPFUN_URL_HERE";          // e.g. https://pump.fun/....
const CONTRACT_ADDRESS = "PASTE_CONTRACT_ADDRESS_HERE"; // e.g. 7abc...xyz

/* =========================
   HERO (id mismatch + path + float)
========================= */
// In deinem Index: <img class="hero__img" ... />
const heroImg = document.querySelector(".hero__img");
if (heroImg) {
  // Wenn deine hero.png im ROOT liegt:
  heroImg.src = "./hero.png";

  // smooth float (subtil, wie "schweben")
  // (zusätzlich/anstatt CSS — wirkt auch wenn CSS kaputt ist)
  let t0 = performance.now();
  const floatLoop = (t) => {
    const dt = (t - t0) / 1000;
    // sanftes Up/Down + mini sway
    const y = Math.sin(dt * 1.1) * 10;      // px
    const r = Math.sin(dt * 0.8) * 1.2;     // deg
    const x = Math.cos(dt * 0.9) * 3;       // px
    heroImg.style.transform = `translate3d(${x}px, ${-y}px, 0) rotate(${r}deg)`;
    requestAnimationFrame(floatLoop);
  };
  requestAnimationFrame(floatLoop);

  heroImg.addEventListener("error", () => {
    console.warn("Hero image not loading. Check path: ./hero.png");
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
   - setzt nur, wenn URL wirklich eingefügt wurde
========================= */
const pumpBtn = document.getElementById("pumpBtn");
const pumpFooter = document.getElementById("pumpFooter");
const brandLink = document.getElementById("brandLink");

// optional, falls du noch irgendwo einen CTA im Menü hast:
const pumpCtaTop = document.getElementById("pumpCtaTop");

function isRealUrl(u) {
  return typeof u === "string" && u.startsWith("http");
}

[pumpBtn, pumpFooter, brandLink, pumpCtaTop].forEach((el) => {
  if (el && isRealUrl(PUMP_FUN_URL)) el.href = PUMP_FUN_URL;
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
  const value = (contractText?.textContent || "").trim() || (CONTRACT_ADDRESS || "").trim();

  // Wenn noch Platzhalter drin ist, nicht so tun als ob’s klappt:
  if (!value || value.includes("PASTE_CONTRACT")) {
    if (toast) {
      toast.textContent = "Set CONTRACT_ADDRESS first";
      setTimeout(() => (toast.textContent = ""), 1600);
    }
    return;
  }

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
  audio.muted = true; // start muted
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
      console.warn("Audio play blocked by browser policy.", e);
    }
  }
});

/* =========================
   GALLERY (6 images) — ultra robust for GitHub Pages
   - resolves URLs via document.baseURI (safe for /repo/ paths)
   - tries root first, then ./assets/gallery/
   - shows current tried path in caption for debugging
========================= */
const galleryImages = [
  { file: "1.png", cap: "Image 1" },
  { file: "2.png", cap: "Image 2" },
  { file: "3.png", cap: "Image 3" },
  { file: "4.png", cap: "Image 4" },
  { file: "5.png", cap: "Image 5" },
  { file: "6.png", cap: "Image 6" },
];

const galImg = document.getElementById("galImg");
const galPrev = document.getElementById("galPrev");
const galNext = document.getElementById("galNext");
const galDots = document.getElementById("galDots");

let galIndex = 0;
let triedAlt = false;

function resolveUrl(path) {
  // macht aus "1.png" automatisch "https://.../tralala/1.png"
  return new URL(path, document.baseURI).toString();
}

function renderDots() {
  if (!galDots) return;
  galDots.innerHTML = "";
  for (let i = 0; i < galleryImages.length; i++) {
    const d = document.createElement("span");
    if (i === galIndex) d.classList.add("isOn");
    galDots.appendChild(d);
  }
}

function setGallerySrc(file, altFolder = false) {
  const rel = altFolder ? `assets/gallery/${file}` : file;
  const url = resolveUrl(rel);

  if (galImg) {
    // cache-bust, damit du sicher NICHT die alte Version siehst
    galImg.src = url + `?v=${Date.now()}`;
  }

}

function renderGallery() {
  if (!galImg || !galCap || !galleryImages.length) return;
  triedAlt = false;

  const item = galleryImages[galIndex];
  galImg.loading = "eager"; // für Test: sofort laden
  setGallerySrc(item.file, false);
  renderDots();
}

galImg?.addEventListener("error", () => {
  const item = galleryImages[galIndex];

  // wenn root nicht klappt → probier assets/gallery
  if (!triedAlt) {
    triedAlt = true;
    setGallerySrc(item.file, true);
    return;
  }

  // wenn auch das nicht klappt → klare Meldung
  if (galCap) {
    galCap.textContent =
      `IMAGE NOT FOUND: tried "${item.file}" and "assets/gallery/${item.file}". ` +
      `Check exact filename (case-sensitive) + GitHub Pages deployment.`;
  }
});

galPrev?.addEventListener("click", () => {
  galIndex = (galIndex - 1 + galleryImages.length) % galleryImages.length;
  renderGallery();
});

galNext?.addEventListener("click", () => {
  galIndex = (galIndex + 1) % galleryImages.length;
  renderGallery();
});

// swipe optional
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
    renderGallery();
  }
  touchStartX = null;
}, { passive: true });

renderGallery();
