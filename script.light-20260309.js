/* =========================
   CONFIG
========================= */
const CONTRACT_ADDRESS = "none";
const X_PROFILE_URL = "PASTE_YOUR_X_PROFILE_URL_HERE";
const TIKTOK_URL = "https://tiktok.com/@mythosmondays";
const PUMP_COIN_URL = `https://pump.fun/coin/${CONTRACT_ADDRESS}`;
const PHANTOM_OPEN_URL = `https://phantom.app/ul/browse/${encodeURIComponent(location.href)}`;
const SOL_MINT = "So11111111111111111111111111111111111111112";
const ENABLE_JUPITER = false;

/* =========================
   HELPERS
========================= */
function resolveUrl(path) {
  return new URL(path, document.baseURI).toString();
}

function isRealUrl(u) {
  return typeof u === "string" && /^https?:\/\//i.test(u);
}

function upgradeInsecureUrl(value) {
  if (typeof value !== "string") return value;
  if (value.startsWith("http://")) return `https://${value.slice(7)}`;
  if (value.startsWith("ws://")) return `wss://${value.slice(5)}`;
  return value;
}

function collectInsecureCssUrls(cssText, sourceLabel) {
  if (typeof cssText !== "string") return;
  const re = /url\((['"]?)(http:\/\/[^'"\)]+)\1\)/gi;
  let m;
  while ((m = re.exec(cssText)) !== null) {
    console.warn(`[MixedContentGuard] Insecure CSS url() found in ${sourceLabel}:`, m[2]);
  }
}

function installMixedContentWarningHelper() {
  const ATTRS = ["src", "href", "poster"];

  const scanElement = (el, label = "DOM") => {
    if (!(el instanceof Element)) return;

    ATTRS.forEach((attr) => {
      const value = el.getAttribute(attr);
      if (!value) return;

      if (value.startsWith("http://") || value.startsWith("ws://")) {
        console.warn(`[MixedContentGuard] Insecure ${attr} on element (${label}):`, value, el);
      }

      const upgraded = upgradeInsecureUrl(value.trim());
      if (upgraded !== value) el.setAttribute(attr, upgraded);
    });

    const inlineStyle = el.getAttribute("style");
    if (inlineStyle) collectInsecureCssUrls(inlineStyle, `${label} inline style`);
  };

  scanElement(document.documentElement, "documentElement");
  document.querySelectorAll("[src], [href], [poster], [style]").forEach((el) => scanElement(el, "initial scan"));

  document.querySelectorAll("style").forEach((styleTag, i) => {
    collectInsecureCssUrls(styleTag.textContent || "", `style tag #${i + 1}`);
  });

  for (const sheet of Array.from(document.styleSheets || [])) {
    try {
      for (const rule of Array.from(sheet.cssRules || [])) {
        collectInsecureCssUrls(rule.cssText, `stylesheet ${sheet.href || "inline"}`);
      }
    } catch (_) {
      // ignore cross-origin stylesheet access restrictions
    }
  }

  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (!(node instanceof Element)) return;
        scanElement(node, "mutation");
        node.querySelectorAll?.("[src], [href], [poster], [style]").forEach((el) => scanElement(el, "mutation subtree"));
      });
    });
  });

  observer.observe(document.documentElement, { childList: true, subtree: true });
}

installMixedContentWarningHelper();

/* =========================
   HERO FX
========================= */
const heroImg = document.querySelector(".hero__img");
const orb = document.querySelector(".orb");

if (heroImg) {
  heroImg.src = resolveUrl("./hero.png");
  heroImg.addEventListener("error", () => {
    heroImg.classList.add("is-broken");
    console.warn("Hero image could not be loaded. Check ./hero.png path.");
  });

  let t0 = performance.now();
  const floatLoop = (t) => {
    const dt = (t - t0) / 1000;
    const y = Math.sin(dt * 1.05) * 9;
    const x = Math.cos(dt * 0.85) * 3;
    const r = Math.sin(dt * 0.7) * 1;
    heroImg.style.transform = `translate3d(${x}px, ${-y}px, 0) rotate(${r}deg)`;
    requestAnimationFrame(floatLoop);
  };
  requestAnimationFrame(floatLoop);
}

window.addEventListener("pointermove", (e) => {
  if (!orb || window.matchMedia("(max-width: 920px)").matches) return;
  const x = (e.clientX / window.innerWidth - 0.5) * 10;
  const y = (e.clientY / window.innerHeight - 0.5) * -10;
  orb.style.setProperty("--tiltX", `${x.toFixed(2)}deg`);
  orb.style.setProperty("--tiltY", `${y.toFixed(2)}deg`);
});

document.addEventListener("pointerleave", () => {
  if (!orb) return;
  orb.style.setProperty("--tiltX", "0deg");
  orb.style.setProperty("--tiltY", "0deg");
});

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
mobileMenu?.addEventListener("click", (e) => {
  if (e.target === mobileMenu) closeMenu();
});
document.querySelectorAll(".menu__link").forEach((a) => a.addEventListener("click", closeMenu));

/* =========================
   LINKS
========================= */
const pumpBtn = document.getElementById("pumpBtn");
const pumpFooter = document.getElementById("pumpFooter");
const brandLink = document.getElementById("brandLink");
const buyNowTop = document.getElementById("buyNowTop");
const communityBuyBtn = document.getElementById("communityBuyBtn");

[pumpBtn, pumpFooter, brandLink, buyNowTop, communityBuyBtn].forEach((el) => {
  if (el) el.href = PUMP_COIN_URL;
});

const xIconLink = document.getElementById("xIconLink");
const tiktokIconLink = document.getElementById("tiktokIconLink");
if (xIconLink && isRealUrl(X_PROFILE_URL)) xIconLink.href = X_PROFILE_URL;
if (tiktokIconLink && isRealUrl(TIKTOK_URL)) tiktokIconLink.href = TIKTOK_URL;

const phantomOpen = document.getElementById("phantomOpen");
if (phantomOpen) phantomOpen.href = PHANTOM_OPEN_URL;

/* =========================
   Jupiter Terminal (flagged)
========================= */
function loadJupiterScript() {
  return new Promise((resolve, reject) => {
    if (window.Jupiter && typeof window.Jupiter.init === "function") {
      resolve();
      return;
    }

    const script = document.createElement("script");
    script.src = "https://terminal.jup.ag/main-v3.js";
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load Jupiter script"));
    document.head.appendChild(script);
  });
}

function initJupiterTerminal() {
  const hostId = "jupiter-terminal";
  const host = document.getElementById(hostId);
  if (!host) return;

  if (!window.Jupiter || typeof window.Jupiter.init !== "function") return;

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
}

if (ENABLE_JUPITER) {
  loadJupiterScript()
    .then(initJupiterTerminal)
    .catch((e) => console.warn("Jupiter disabled due to load/init error:", e));
}

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
    return false;
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

  copyBtn.textContent = ok ? "COPIED" : "COPY";
  setTimeout(() => (copyBtn.textContent = "COPY"), 1200);
});

/* =========================
   AUDIO
========================= */
const audio = document.getElementById("bgAudio");
const audioToggle = document.getElementById("audioToggle");
let muted = true;
let audioUnlocked = false;

function setAudioUI(isMuted) {
  if (!audioToggle) return;
  audioToggle.setAttribute("aria-pressed", String(!isMuted));
  audioToggle.title = isMuted ? "Sound off" : "Sound on";
}

async function ensureAudioStarts() {
  if (!audio) return;
  try {
    await audio.play();
    audioUnlocked = true;
  } catch (e) {
    console.warn("Audio play blocked.", e);
  }
}

if (audio) {
  audio.src = resolveUrl("./bg.mp3");
  audio.loop = true;
  audio.volume = 0.6;
  audio.muted = true;
  audio.preload = "auto";
  audio.load();
}

setAudioUI(true);

audioToggle?.addEventListener("click", async () => {
  if (!audio) return;

  muted = !muted;
  audio.muted = muted;
  setAudioUI(muted);

  if (!muted && (audio.paused || !audioUnlocked)) {
    await ensureAudioStarts();
  }

  if (muted && !audio.paused) {
    audio.pause();
  }
});

document.addEventListener(
  "pointerdown",
  async () => {
    if (!audio || !muted || audioUnlocked) return;
    await ensureAudioStarts();
    audio.pause();
  },
  { once: true }
);
