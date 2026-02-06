/* ====== CONFIG (easy to edit) ====== */
const CONFIG = {
  heroCandidates: [
    "./hero.png",
    "./hero.PNG",
    "./Hero.png",
    "./Hero.PNG"
  ],
  logoCandidates: [
    "./logo.png",
    "./logo.PNG",
    "./Logo.png",
    "./Logo.PNG"
  ],
  audioFile: "./bg.mp3",
  tiktokHandle: "@mythosmonday",
  tiktokUrl: "https://www.tiktok.com/@mythosmonday",
  xUrl: "https://x.com",
  contractText: "PASTE_CONTRACT_ADDRESS_HERE", // <-- replace later
  gallery: [
    // Put your images here when you have them (no debug text on page)
    // { src: "./g1.jpg", caption: "Community moment #1" },
    // { src: "./g2.jpg", caption: "Community moment #2" },
  ]
};

/* ====== helpers ====== */
function loadFirstWorkingImage(imgEl, candidates, onSuccess, onFail){
  let i = 0;
  const tryNext = () => {
    if (i >= candidates.length) { onFail?.(); return; }
    const testSrc = candidates[i++];
    const probe = new Image();
    probe.onload = () => {
      imgEl.src = testSrc;
      onSuccess?.(testSrc);
    };
    probe.onerror = () => tryNext();
    probe.src = testSrc + (testSrc.includes("?") ? "&" : "?") + "v=" + Date.now();
  };
  tryNext();
}

/* ====== Menu ====== */
const menuBtn = document.getElementById("menuBtn");
const menu = document.getElementById("menu");

menuBtn?.addEventListener("click", () => {
  const open = menu.style.display === "flex";
  menu.style.display = open ? "none" : "flex";
  menuBtn.setAttribute("aria-expanded", String(!open));
});

document.addEventListener("click", (e) => {
  if (!menu || !menuBtn) return;
  const isInside = menu.contains(e.target) || menuBtn.contains(e.target);
  if (!isInside) {
    menu.style.display = "none";
    menuBtn.setAttribute("aria-expanded", "false");
  }
});

/* ====== Smooth scroll ====== */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener("click", (e) => {
    const href = a.getAttribute("href");
    if (!href || href === "#") return;
    const el = document.querySelector(href);
    if (!el) return;
    e.preventDefault();
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    if (menu) menu.style.display = "none";
    if (menuBtn) menuBtn.setAttribute("aria-expanded", "false");
  });
});

/* ====== Logo ====== */
const logoImg = document.getElementById("logoImg");
const logoText = document.getElementById("logoText");
if (logoImg) {
  loadFirstWorkingImage(
    logoImg,
    CONFIG.logoCandidates,
    () => { if (logoText) logoText.style.display = "none"; },
    () => {
      // If logo missing, show text instead of broken icon
      logoImg.style.display = "none";
      if (logoText) logoText.style.display = "inline";
    }
  );
}

/* ====== Hero image ====== */
const heroImg = document.getElementById("heroImg");
if (heroImg) {
  loadFirstWorkingImage(
    heroImg,
    CONFIG.heroCandidates,
    () => heroImg.classList.add("loaded"),
    () => {
      // If none works, keep it invisible (no ugly debug overlay)
      heroImg.classList.remove("loaded");
      heroImg.style.display = "none";
    }
  );
}

/* ====== Audio toggle (no slider, only on/off) ====== */
const audioToggle = document.getElementById("audioToggle");
const audioIcon = document.getElementById("audioIcon");

// Browsers block autoplay. So audio starts paused,
// and only plays after a user click (this button).
const audio = new Audio(CONFIG.audioFile);
audio.loop = true;
audio.preload = "auto";

function setAudioUI(isOn){
  if (!audioToggle) return;
  audioToggle.classList.toggle("on", isOn);
  // optional: tint icon slightly via class
}

let audioOn = false;
setAudioUI(false);

audioToggle?.addEventListener("click", async () => {
  try {
    if (!audioOn) {
      await audio.play();  // requires user interaction (this click)
      audioOn = true;
      setAudioUI(true);
    } else {
      audio.pause();
      audioOn = false;
      setAudioUI(false);
    }
  } catch (err) {
    // If blocked for any reason, keep it off
    audioOn = false;
    setAudioUI(false);
    console.warn("Audio play blocked:", err);
  }
});

/* ====== Join links + handle ====== */
const ttLink = document.getElementById("ttLink");
if (ttLink) {
  ttLink.href = CONFIG.tiktokUrl;
  const sub = ttLink.querySelector(".join-sub");
  if (sub) sub.textContent = CONFIG.tiktokHandle;
}
const xLink = document.getElementById("xLink");
if (xLink) xLink.href = CONFIG.xUrl;

/* ====== Contract copy ====== */
const contractBox = document.getElementById("contractBox");
const copyBtn = document.getElementById("copyBtn");

if (contractBox) contractBox.textContent = CONFIG.contractText;

copyBtn?.addEventListener("click", async () => {
  const txt = contractBox?.textContent?.trim() || "";
  if (!txt) return;
  try {
    await navigator.clipboard.writeText(txt);
    copyBtn.textContent = "COPIED";
    setTimeout(() => (copyBtn.textContent = "COPY"), 900);
  } catch {
    // fallback
    const ta = document.createElement("textarea");
    ta.value = txt;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand("copy");
    ta.remove();
    copyBtn.textContent = "COPIED";
    setTimeout(() => (copyBtn.textContent = "COPY"), 900);
  }
});

/* ====== Gallery (auto hides if empty) ====== */
const gal = CONFIG.gallery;
const galSection = document.getElementById("gallery");
const galImg = document.getElementById("galImg");
const galCap = document.getElementById("galCap");
const galPrev = document.getElementById("galPrev");
const galNext = document.getElementById("galNext");

let galIndex = 0;

function renderGallery(){
  if (!galImg || !galCap) return;
  const item = gal[galIndex];
  galImg.src = item.src;
  galCap.textContent = item.caption || "";
}

if (!gal || gal.length === 0){
  // hide entire gallery section when you have no images yet
  if (galSection) galSection.style.display = "none";
} else {
  renderGallery();
  galPrev?.addEventListener("click", () => {
    galIndex = (galIndex - 1 + gal.length) % gal.length;
    renderGallery();
  });
  galNext?.addEventListener("click", () => {
    galIndex = (galIndex + 1) % gal.length;
    renderGallery();
  });
}
