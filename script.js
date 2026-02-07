/* =========================
   CONFIG (set these!)
========================= */
const PUMP_FUN_URL = "PASTE_PUMPFUN_URL_HERE";          // e.g. https://pump.fun/....
const CONTRACT_ADDRESS = "89muFzE1VpotYQfKm7xsuEbhgxRLyinmsELGTCSLpump"; // e.g. 7abc...xyz

/* =========================
   HELPERS
========================= */
function isRealUrl(u) {
  return typeof u === "string" && /^https?:\/\//i.test(u);
}

// Resolve relative path safely for GitHub Pages (/repo/...)
function resolveUrl(path) {
  return new URL(path, document.baseURI).toString();
}

/* =========================
   HERO (path + float)
========================= */
const heroImg = document.querySelector(".hero__img");
if (heroImg) {
  // hero.png liegt im ROOT
  heroImg.src = resolveUrl("./hero.png");

  // smooth float (subtil)
  let t0 = performance.now();
  const floatLoop = (t) => {
    const dt = (t - t0) / 1000;
    const y = Math.sin(dt * 1.05) * 10;  // px
    const x = Math.cos(dt * 0.85) * 3;   // px
    const r = Math.sin(dt * 0.70) * 1.0; // deg
    heroImg.style.transform = `translate3d(${x}px, ${-y}px, 0) rotate(${r}deg)`;
    requestAnimationFrame(floatLoop);
  };
  requestAnimationFrame(floatLoop);

  heroImg.addEventListener("error", () => {
    console.warn("Hero image not loading. Check file name/path: hero.png in repo root.");
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
   Pump.fun links
========================= */
const pumpBtn = document.getElementById("pumpBtn");
const pumpFooter = document.getElementById("pumpFooter");
const brandLink = document.getElementById("brandLink");
const pumpCtaTop = document.getElementById("pumpCtaTop"); // optional (falls vorhanden)

[pumpBtn, pumpFooter, brandLink, pumpCtaTop].forEach((el) => {
  if (el && isRealUrl(PUMP_FUN_URL)) el.href = PUMP_FUN_URL;
});

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
  const value =
    (contractText?.textContent || "").trim() || (CONTRACT_ADDRESS || "").trim();

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
      console.warn("Audio play blocked by browser policy.", e);
    }
  }
});

/* =========================
   GALLERY (ROOT files 1.png..6.png)
   - robust for GitHub Pages
   - no caption overlay (nur Bild!)
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
const galCap = document.getElementById("galCap"); // existiert im HTML
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

  // Bild-URL sauber auflösen (GitHub Pages safe)
  const url = resolveUrl(`./${item.file}`);

  // cache bust (hilft wenn GitHub Pages noch cached)
  galImg.src = `${url}?v=${Date.now()}`;
  galImg.loading = "eager";

  // DU wolltest den grauen Kasten weg:
  if (galCap) {
    galCap.textContent = "";          // keine Texte
    galCap.style.display = "none";    // komplett ausblenden
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

// Swipe on mobile
let touchStartX = null;
galImg?.addEventListener(
  "touchstart",
  (e) => {
    touchStartX = e.touches?.[0]?.clientX ?? null;
  },
  { passive: true }
);

galImg?.addEventListener(
  "touchend",
  (e) => {
    if (touchStartX == null) return;
    const endX = e.changedTouches?.[0]?.clientX ?? null;
    if (endX == null) return;

    const dx = endX - touchStartX;
    if (Math.abs(dx) > 40) {
      galIndex =
        dx > 0
          ? (galIndex - 1 + galleryImages.length) % galleryImages.length
          : (galIndex + 1) % galleryImages.length;
      setGalleryImage();
    }
    touchStartX = null;
  },
  { passive: true }
);

// init
setGalleryImage();
