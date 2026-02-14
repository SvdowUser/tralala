/* =========================
   CONFIG (edit these)
========================= */
const CONTRACT_ADDRESS = "89muFzE1VpotYQfKm7xsuEbhgxRLyinmsELGTCSLpump";

// Pump.fun URL
const PUMP_COIN_URL = `https://pump.fun/coin/${CONTRACT_ADDRESS}`;

// Put your REAL social links here:
const X_PROFILE_URL = "PASTE_YOUR_X_PROFILE_URL_HERE";  // <- set this
const TIKTOK_URL = "https://tiktok.com/@mythosmonday";

// Optional tracker links (leave "" to auto-hide icons)
const DEXSCREENER_URL = ""; // e.g. https://dexscreener.com/solana/<PAIR_OR_TOKEN>
const DEXTOOLS_URL = "";    // e.g. https://www.dextools.io/app/en/solana/...

// Phantom helpers (good iPhone fallback)
const PHANTOM_TOKEN_URL = `https://phantom.com/tokens/solana/${CONTRACT_ADDRESS}`;
// Phantom official browse deeplink pattern
const PHANTOM_BROWSE_URL = `https://phantom.app/ul/browse/${encodeURIComponent(location.href)}`;

// Jupiter Terminal
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
function setHref(el, url) {
  if (!el) return;
  if (!isRealUrl(url)) {
    // hide optional icons if url missing
    el.style.display = "none";
    el.setAttribute("aria-hidden", "true");
    el.tabIndex = -1;
    return;
  }
  el.href = url;
  el.style.display = "";
}
function isIOS() {
  return /iPad|iPhone|iPod/.test(navigator.userAgent);
}
function hasInjectedWallet() {
  // some wallets inject window.solana, Phantom sets isPhantom
  return !!(window.solana && (window.solana.isPhantom || window.solana.isSolflare || window.solana.isBackpack));
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
mobileMenu?.addEventListener("click", (e) => { if (e.target === mobileMenu) closeMenu(); });
document.querySelectorAll(".menu__link").forEach((a) => a.addEventListener("click", closeMenu));

/* =========================
   Links wiring
========================= */
setHref(document.getElementById("pumpBtn"), PUMP_COIN_URL);
setHref(document.getElementById("pumpFooter"), PUMP_COIN_URL);
setHref(document.getElementById("brandLink"), PUMP_COIN_URL);
setHref(document.getElementById("pumpCtaTop"), PUMP_COIN_URL);
setHref(document.getElementById("pumpSwapLink"), PUMP_COIN_URL);

// Social icons under Gallery
setHref(document.getElementById("xLink"), X_PROFILE_URL);
setHref(document.getElementById("tiktokLink"), TIKTOK_URL);

// Optional trackers/tools
setHref(document.getElementById("dexscreenerLink"), DEXSCREENER_URL);
setHref(document.getElementById("dextoolsLink"), DEXTOOLS_URL);
setHref(document.getElementById("pumpLink"), PUMP_COIN_URL);

/* =========================
   iOS Phantom fallback hint
   - If the wallet modal doesn't show on iPhone, user can open in Phantom browser.
========================= */
const walletHint = document.getElementById("walletHint");
const phantomBrowseBtn = document.getElementById("phantomBrowseBtn");
if (phantomBrowseBtn) phantomBrowseBtn.href = PHANTOM_BROWSE_URL;

// show hint only when it makes sense
if (walletHint) {
  const shouldShow =
    isIOS() && !hasInjectedWallet(); // common: iOS Safari has no injected wallets
  walletHint.style.display = shouldShow ? "block" : "none";
}

/* =========================
   SWAP (Jupiter Terminal)
========================= */
function initJupiterTerminal() {
  const host = document.getElementById("jupiter-terminal");
  if (!host) return;

  // Safety: if script hasn't loaded yet, wait a bit
  const tryInit = () => {
    if (!window.Jupiter || typeof window.Jupiter.init !== "function") {
      // still not ready
      return false;
    }

    // Init
    window.Jupiter.init({
      displayMode: "integrated",
      integratedTargetId: "jupiter-terminal",
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

  // retry a few times (slow mobile)
  let tries = 0;
  const timer = setInterval(() => {
    tries++;
    if (tryInit() || tries > 20) clearInterval(timer);
    if (tries > 20 && host) {
      host.innerHTML = `<div style="padding:16px; text-align:center; opacity:.75;">
        Swap konnte nicht geladen werden. Bitte nutze den Pump.fun Link.
        <div style="margin-top:10px;">
          <a href="${PUMP_COIN_URL}" target="_blank" rel="noopener" style="color:#fff; text-decoration:underline;">Open Pump.fun</a>
          &nbsp;·&nbsp;
          <a href="${PHANTOM_TOKEN_URL}" target="_blank" rel="noopener" style="color:#fff; text-decoration:underline;">Open in Phantom</a>
        </div>
      </div>`;
    }
  }, 250);
}
initJupiterTerminal();

/* =========================
   Contract copy
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
    try { await audio.play(); } catch (e) { console.warn("Audio play blocked.", e); }
  }
});

/* =========================
   GALLERY
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
