/* =========================
   CONFIG
========================= */
const CONTRACT_ADDRESS = "89muFzE1VpotYQfKm7xsuEbhgxRLyinmsELGTCSLpump";

// Links (HIER EINTRAGEN)
const X_PROFILE_URL = "PASTE_YOUR_X_PROFILE_URL_HERE";     // z.B. https://x.com/deinhandle
const TIKTOK_URL    = "https://tiktok.com/@mythosmonday";

// Optional Tracker (leer lassen => Icon bleibt trotzdem sichtbar, Link geht dann nirgends)
// Wenn du willst, kann ich auch auto-hide machen – sag kurz.
const DEXSCREENER_URL = ""; // z.B. https://dexscreener.com/solana/....
const DEXTOOLS_URL    = ""; // z.B. https://www.dextools.io/app/en/solana/...

// Pump.fun
const PUMP_COIN_URL = `https://pump.fun/coin/${CONTRACT_ADDRESS}`;

// Phantom deep link: Seite in Phantom öffnen (hilft auf iPhone, wenn Connect “nichts zeigt”)
const PHANTOM_OPEN_URL = `https://phantom.app/ul/browse/${encodeURIComponent(location.href)}`;

// Jupiter
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

/* =========================
   HERO float (wie bei dir)
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
   Mobile menu
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
mobileMenu?.addEventListener("click", (e) => { if (e.target === mobileMenu) closeMenu(); });
document.querySelectorAll(".menu__link").forEach((a) => a.addEventListener("click", closeMenu));

/* =========================
   Links setzen
========================= */
const pumpBtn = document.getElementById("pumpBtn");
const pumpFooter = document.getElementById("pumpFooter");
const brandLink = document.getElementById("brandLink");
const pumpCtaTop = document.getElementById("pumpCtaTop");
const pumpSwapLink = document.getElementById("pumpSwapLink");
[pumpBtn, pumpFooter, brandLink, pumpCtaTop, pumpSwapLink].forEach((el) => {
  if (el) el.href = PUMP_COIN_URL;
});

// Join section
const xJoinLink = document.getElementById("xJoinLink");
const tiktokJoinLink = document.getElementById("tiktokJoinLink");
if (xJoinLink && isRealUrl(X_PROFILE_URL)) xJoinLink.href = X_PROFILE_URL;
if (tiktokJoinLink && isRealUrl(TIKTOK_URL)) tiktokJoinLink.href = TIKTOK_URL;

// Social icons section
const xIconLink = document.getElementById("xIconLink");
const tiktokIconLink = document.getElementById("tiktokIconLink");
const dexscreenerIconLink = document.getElementById("dexscreenerIconLink");
const dextoolsIconLink = document.getElementById("dextoolsIconLink");
const pumpIconLink = document.getElementById("pumpIconLink");

if (xIconLink && isRealUrl(X_PROFILE_URL)) xIconLink.href = X_PROFILE_URL;
if (tiktokIconLink && isRealUrl(TIKTOK_URL)) tiktokIconLink.href = TIKTOK_URL;

if (dexscreenerIconLink && isRealUrl(DEXSCREENER_URL)) dexscreenerIconLink.href = DEXSCREENER_URL;
if (dextoolsIconLink && isRealUrl(DEXTOOLS_URL)) dextoolsIconLink.href = DEXTOOLS_URL;

if (pumpIconLink) pumpIconLink.href = PUMP_COIN_URL;

// Phantom link
const phantomOpen = document.getElementById("phantomOpen");
if (phantomOpen) phantomOpen.href = PHANTOM_OPEN_URL;

/* =========================
   Jupiter Terminal init
========================= */
function initJupiterTerminal() {
  const hostId = "jupiter-terminal";
  const host = document.getElementById(hostId);
  if (!host) return;

  const tryInit = () => {
    if (!window.Jupiter || typeof window.Jupiter.init !== "function") return false;

    window.Jupiter.init({
      displayMode: "integrated",
      integratedTargetId: hostId,
      endpoint: "https://api.mainnet-beta.solana.com",
      strictTokenList: false,
      formProps: {
        initialInputMint: SOL_MINT,
        initialOutputMint: CONTRACT_ADDRESS,
      },
    });

    return true;
  };

  if (tryInit()) return;

  let tries = 0;
  const timer = setInterval(() => {
    tries++;
    if (tryInit() || tries > 30) clearInterval(timer);
  }, 200);
}
initJupiterTerminal();

/* =========================
   Contract copy (wie bei dir)
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
   AUDIO (wie bei dir)
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
    try { await audio.play(); }
    catch (e) { console.warn("Audio play blocked.", e); }
  }
});

/* =========================
   GALLERY (Swipe wie bei dir)
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