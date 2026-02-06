// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener("click", (e) => {
    const id = a.getAttribute("href");
    if (!id || id === "#") return;
    const el = document.querySelector(id);
    if (!el) return;
    e.preventDefault();
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// ---------- Copy contract ----------
const contractInput = document.getElementById("contractValue");
const copyBtn = document.getElementById("copyBtn");
const toast = document.getElementById("toast");

async function copyText(text) {
  // Clipboard API works only in secure context + user gesture on many browsers (esp. iOS). 
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (e) {
    // Fallback (older browsers)
    try {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.top = "-1000px";
      document.body.appendChild(ta);
      ta.focus();
      ta.select();
      const ok = document.execCommand("copy");
      document.body.removeChild(ta);
      return ok;
    } catch {
      return false;
    }
  }
}

copyBtn.addEventListener("click", async () => {
  const text = (contractInput.value || "").trim();
  if (!text || text === "PASTE_CONTRACT_ADDRESS_HERE") {
    toast.textContent = "Paste the contract address first.";
    return;
  }

  const ok = await copyText(text);
  toast.textContent = ok ? "COPIED ✅" : "Copy failed ❌";
  setTimeout(() => (toast.textContent = ""), 1400);
});

// ---------- Audio toggle ----------
const audio = document.getElementById("bgAudio");
const toggleBtn = document.getElementById("audioToggle");
const icon = document.getElementById("audioIcon");

// Clean icons (no emoji)
const ICON_MUTED = `
<svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
  <path d="M10 7L6.5 10H4v4h2.5L10 17V7Z" stroke="rgba(234,243,255,.95)" stroke-width="1.8" stroke-linejoin="round"/>
  <path d="M15 9l6 6M21 9l-6 6" stroke="rgba(234,243,255,.75)" stroke-width="1.8" stroke-linecap="round"/>
</svg>
`;
const ICON_SOUND = `
<svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
  <path d="M10 7L6.5 10H4v4h2.5L10 17V7Z" stroke="rgba(234,243,255,.95)" stroke-width="1.8" stroke-linejoin="round"/>
  <path d="M14.5 9.5c1.2 1.2 1.2 3.8 0 5M17 7c2.6 2.6 2.6 7.4 0 10" stroke="rgba(234,243,255,.75)" stroke-width="1.8" stroke-linecap="round"/>
</svg>
`;

function updateAudioUI() {
  icon.innerHTML = audio.muted ? ICON_MUTED : ICON_SOUND;
}

audio.muted = true;
updateAudioUI();

// Browsers often block autoplay with sound until user gesture. Muted is generally allowed, but still can fail. :contentReference[oaicite:3]{index=3}
async function tryPlayMuted() {
  try {
    audio.muted = true;
    await audio.play();
  } catch {
    // ignore: will start on first user gesture
  } finally {
    updateAudioUI();
  }
}
tryPlayMuted();

// Ensure first user gesture enables playback if needed (still muted)
window.addEventListener("pointerdown", async () => {
  try {
    if (audio.paused) await audio.play();
  } catch {}
}, { once: true });

toggleBtn.addEventListener("click", async () => {
  try {
    // if audio never started due to policy, start it now
    if (audio.paused) await audio.play();
  } catch {}

  audio.muted = !audio.muted;
  updateAudioUI();
});

// ---------- Gallery ----------
const galleryImages = [
  // Add your images here (place files in repo root or an /img folder)
  // { src: "./g1.jpg", cap: "Gallery 1" },
  // { src: "./g2.jpg", cap: "Gallery 2" },
];

const galSection = document.getElementById("gallery");
const galImg = document.getElementById("galImg");
const galCap = document.getElementById("galCap");
const galPrev = document.getElementById("galPrev");
const galNext = document.getElementById("galNext");

let gi = 0;

function renderGallery() {
  if (!galleryImages.length) {
    // Hide gallery completely if empty (no weird placeholder text)
    galSection.style.display = "none";
    return;
  }

  const item = galleryImages[gi];
  galImg.src = item.src;
  galCap.textContent = item.cap || "";
}

galPrev.addEventListener("click", () => {
  if (!galleryImages.length) return;
  gi = (gi - 1 + galleryImages.length) % galleryImages.length;
  renderGallery();
});

galNext.addEventListener("click", () => {
  if (!galleryImages.length) return;
  gi = (gi + 1) % galleryImages.length;
  renderGallery();
});

renderGallery();
