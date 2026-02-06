/* =========================
   CONFIG (EDIT THESE)
========================= */
const CONFIG = {
  // Pump.fun link (set your exact coin URL here)
  pumpfunUrl: "https://pump.fun/",

  // Contract address to show + copy
  contractAddress: "PASTE_CONTRACT_ADDRESS_HERE",

  // Social links
  xUrl: "https://x.com/",
  tiktokUrl: "https://www.tiktok.com/@mythosmondayss",

  // Audio
  audioFile: "bg.mp3",
  startMuted: true,

  // Gallery (leave empty [] to hide section)
  galleryImages: [
    // Example:
    // { src: "g1.jpg", caption: "Community moment #1" },
  ],
};

/* =========================
   Helpers
========================= */
function qs(sel){ return document.querySelector(sel); }

async function copyText(text){
  try{
    await navigator.clipboard.writeText(text);
    return true;
  }catch(e){
    // Fallback for older browsers
    try{
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.left = "-9999px";
      document.body.appendChild(ta);
      ta.focus();
      ta.select();
      const ok = document.execCommand("copy");
      document.body.removeChild(ta);
      return ok;
    }catch(err){
      return false;
    }
  }
}

/* =========================
   Hero image: cache-bust + fallback filenames
========================= */
function setupHeroImage(){
  const img = qs("#heroImg");
  if(!img) return;

  const candidates = ["hero.png", "hero.PNG", "Hero.png", "Hero.PNG"];
  let idx = 0;

  const tryLoad = () => {
    const src = candidates[idx] + "?v=" + Date.now();
    img.src = src;
  };

  img.onerror = () => {
    idx++;
    if(idx < candidates.length) tryLoad();
    // if all fail, do nothing (keeps broken icon)
  };

  // Start with cache-busted current src
  tryLoad();
}

/* =========================
   Brand logo fallback
   - If logo.png loads, show it
   - If not, keep text-only
========================= */
function setupBrandLogo(){
  const logo = qs("#brandLogo");
  if(!logo) return;

  logo.onload = () => { logo.style.display = "block"; };
  logo.onerror = () => { logo.style.display = "none"; };
  // cache-bust logo too
  logo.src = "logo.png?v=" + Date.now();
}

/* =========================
   Audio: toggle only (start muted)
========================= */
function setupAudio(){
  const btn = qs("#audioToggle");
  if(!btn) return;

  const audio = new Audio(CONFIG.audioFile);
  audio.loop = true;
  audio.volume = 0.35;

  let muted = !!CONFIG.startMuted;
  audio.muted = muted;

  const paint = () => {
    btn.dataset.muted = muted ? "true" : "false";
    btn.setAttribute("aria-pressed", muted ? "false" : "true");
  };
  paint();

  // Attempt to start playback (will be blocked on iOS until user taps – that's OK)
  audio.play().catch(()=>{ /* ignore */ });

  btn.addEventListener("click", async () => {
    muted = !muted;
    audio.muted = muted;
    paint();

    // If user unmutes, ensure audio is actually playing
    if(!muted){
      try{
        await audio.play();
      }catch(e){
        // If still blocked, re-mute to avoid confusion
        muted = true;
        audio.muted = true;
        paint();
      }
    }
  });
}

/* =========================
   Wire links + contract + copy
========================= */
function setupLinksAndContract(){
  const brandLink = qs("#brandLink");
  const buyBtnTop = qs("#buyBtnTop");
  const contractValue = qs("#contractValue");
  const copyBtn = qs("#copyContract");
  const xLink = qs("#xLink");
  const ttLink = qs("#ttLink");

  if(brandLink) brandLink.href = CONFIG.pumpfunUrl;
  if(buyBtnTop) buyBtnTop.href = CONFIG.pumpfunUrl;

  if(xLink) xLink.href = CONFIG.xUrl;
  if(ttLink) ttLink.href = CONFIG.tiktokUrl;

  if(contractValue) contractValue.textContent = CONFIG.contractAddress;

  if(copyBtn){
    copyBtn.addEventListener("click", async () => {
      const text = (CONFIG.contractAddress || "").trim();
      if(!text || text === "PASTE_CONTRACT_ADDRESS_HERE") return;

      const ok = await copyText(text);
      copyBtn.textContent = ok ? "COPIED" : "FAILED";
      setTimeout(()=> copyBtn.textContent = "COPY", 1100);
    });
  }
}

/* =========================
   Gallery (auto hide if empty)
========================= */
function setupGallery(){
  const sec = qs("#gallery");
  const img = qs("#galImg");
  const cap = qs("#galCap");
  const prev = qs("#galPrev");
  const next = qs("#galNext");

  const items = CONFIG.galleryImages || [];
  if(!sec) return;

  if(items.length === 0){
    sec.style.display = "none";
    return;
  }

  let i = 0;
  const render = () => {
    const it = items[i];
    img.style.display = "block";
    img.src = it.src + "?v=" + Date.now();
    cap.textContent = it.caption || "";
  };

  prev.addEventListener("click", () => {
    i = (i - 1 + items.length) % items.length;
    render();
  });
  next.addEventListener("click", () => {
    i = (i + 1) % items.length;
    render();
  });

  render();
}

/* =========================
   Year
========================= */
function setupYear(){
  const y = qs("#year");
  if(y) y.textContent = new Date().getFullYear();
}

/* =========================
   Init
========================= */
document.addEventListener("DOMContentLoaded", () => {
  setupBrandLogo();
  setupHeroImage();
  setupAudio();
  setupLinksAndContract();
  setupGallery();
  setupYear();
});
