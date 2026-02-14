/* =========================
   CONFIG
========================= */
const CONTRACT_ADDRESS = "89muFzE1VpotYQfKm7xsuEbhgxRLyinmsELGTCSLpump";

// Pump.fun URL (Buttons/Links)
const PUMP_COIN_URL = `https://pump.fun/coin/${CONTRACT_ADDRESS}`;

// Jupiter Terminal (wallet connect + swap on-site)
const JUP_TERMINAL_SCRIPT = "https://plugin.jup.ag/plugin-v1.js"; // current embed loader
const SOL_MINT = "So11111111111111111111111111111111111111112";

/* =========================
   HELPERS
========================= */
function resolveUrl(path) {
  return new URL(path, document.baseURI).toString();
}
function isRealUrl(u) {
  return typeof u === "string" && /^https?:\/\//i.test(u);
}
function loadScriptOnce(src) {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[data-ext="${src}"]`)) return resolve();
    const s = document.createElement("script");
    s.src = src;
    s.async = true;
    s.defer = true;
    s.dataset.ext = src;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error(`Failed to load script: ${src}`));
    document.head.appendChild(s);
  });
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
   Smooth scroll
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
   Pump links (top, footer, brand, menu CTA, swap link)
========================= */
const pumpBtn = document.getElementById("pumpBtn");
const pumpFooter = document.getElementById("pumpFooter");
const brandLink = document.getElementById("brandLink");
const pumpCtaTop = document.getElementById("pumpCtaTop");
const pumpSwapLink = document.getElementById("pumpSwapLink");

[pumpBtn, pumpFooter, brandLink, pumpCtaTop, pumpSwapLink].forEach((el) => {
  if (el && isRealUrl(PUMP_COIN_URL)) el.href = PUMP_COIN_URL;
});

// falls noch irgendwo ein alter "pumpSwapBtn" rumliegt: verstecken (keine doppelten Buttons)
const oldPumpSwapBtn = document.getElementById("pumpSwapBtn");
if (oldPumpSwapBtn) {
  oldPumpSwapBtn.style.display = "none";
  oldPumpSwapBtn.setAttribute("aria-hidden", "true");
  oldPumpSwapBtn.tabIndex = -1;
}

/* =========================
   SWAP (Jupiter Terminal)
========================= */
async function initJupiterTerminal() {
  const host = document.getElementById("jupiter-terminal");
  const note = document.getElementById("swapNote");
  if (!host) return;

  try {
    await loadScriptOnce(JUP_TERMINAL_SCRIPT);

    // plugin creates window.Jupiter / window.Jupiter.init
    if (!window.Jupiter || typeof window.Jupiter.init !== "function") {
      throw new Error("Jupiter.init missing");
    }

    // Clear host (safety)
    host.innerHTML = "";

    window.Jupiter.init({
      displayMode: "integrated",
      integratedTargetId: "jupiter-terminal",
      endpoint: "https://api.mainnet-beta.solana.com",
      strictTokenList: false,
      formProps: {
        initialInputMint: SOL_MINT,
        initialOutputMint: CONTRACT_ADDRESS
      }
    });

    // wenn es lädt: note bleibt trotzdem als fallback sichtbar (ist okay),
    // du kannst sie auch ausblenden, aber ich lasse sie als "If it doesn’t load..."
    if (note) note.style.display = "block";
  } catch (e) {
    console.warn(e);
    host.innerHTML = `<div style="padding:16px; text-align:center; opacity:.75;">
      Swap konnte nicht geladen werden. Bitte nutze <a href="${PUMP_COIN_URL}" target="_blank" rel="noopener noreferrer" style="color:rgba(255,255,255,.85); text-decoration:underline; text-underline-offset:3px;">Pump.fun</a>.
    </div>`;
    if (note) note.style.display = "none";
  }
}
initJupiterTerminal(); // docs: plugin embed :contentReference[oaicite:1]{index=1}

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
========================= */
const audio = document.getElementById("bgAudio");
const audioToggle = document.getElementById("audioToggle");

let muted = true;
function setAudioUI(isMuted) {
  if (!audioToggle) return;
  audioToggle.setAttribute("aria-pressed", String(!isMuted));
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
  galImg.src = `${url}?v=${Date.now()}`;
  galImg.loading = "eager";

  if (galCap) {
    galCap.textContent = "";
    galCap.style.display = "none";
  }
  renderDots();
}

galPrev?.addEventListener("click", () => {
  galIndex = (galIndex - 1 + galleryImages.length) % galleryImages.length;
  setGalleryImage();
});
galNext?.addEventListener("click", () => {
  galIndex = (galIndex + 1) % galleryImages.length;
  setGalleryImage();
});

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
