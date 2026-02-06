// ---------- Smooth scroll ----------
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

// ---------- Contract copy ----------
const copyBtn = document.getElementById("copyContract");
const contractValue = document.getElementById("contractValue");

if (copyBtn && contractValue) {
  copyBtn.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(contractValue.textContent.trim());
      copyBtn.textContent = "COPIED";
      setTimeout(() => (copyBtn.textContent = "COPY"), 1200);
    } catch {
      // Fallback
      const range = document.createRange();
      range.selectNodeContents(contractValue);
      const sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
      document.execCommand("copy");
      sel.removeAllRanges();
      copyBtn.textContent = "COPIED";
      setTimeout(() => (copyBtn.textContent = "COPY"), 1200);
    }
  });
}

// ---------- Audio toggle (no slider, user-gesture required) ----------
const audio = document.getElementById("bgAudio");
const audioToggle = document.getElementById("audioToggle");

function setAudioUI() {
  if (!audioToggle || !audio) return;
  const muted = audio.muted || audio.paused;
  audioToggle.classList.toggle("isMuted", muted);
}
setAudioUI();

if (audioToggle && audio) {
  audioToggle.addEventListener("click", async () => {
    try {
      // First click: ensure it starts playing (browsers block autoplay without click)
      if (audio.paused) {
        audio.muted = false;
        await audio.play();
      } else {
        // Toggle mute
        audio.muted = !audio.muted;
        if (!audio.muted) await audio.play();
      }
    } catch (err) {
      // If play is blocked, keep it muted/paused and let user click again
      console.warn("Audio play blocked:", err);
      audio.muted = true;
    }
    setAudioUI();
  });
}

// ---------- Gallery (optional) ----------
const galleryImages = [
  // Add your files here if you want gallery:
  // { src: "./g1.png", cap: "Gallery 1" },
  // { src: "./g2.png", cap: "Gallery 2" },
];

const galSection = document.getElementById("gallery");
const galImg = document.getElementById("galImg");
const galCap = document.getElementById("galCap");
const galPrev = document.getElementById("galPrev");
const galNext = document.getElementById("galNext");

let galIndex = 0;

function renderGallery() {
  if (!galSection) return;

  if (!galleryImages.length) {
    galSection.style.display = "none";
    return;
  }

  const item = galleryImages[galIndex];
  galImg.style.display = "none";
  galCap.textContent = item.cap || "";

  galImg.onload = () => {
    galImg.style.display = "block";
  };
  galImg.onerror = () => {
    galImg.style.display = "none";
    galCap.textContent = item.cap ? item.cap + " (image missing)" : "Image missing";
  };

  galImg.src = item.src;
}

if (galPrev) galPrev.addEventListener("click", () => {
  if (!galleryImages.length) return;
  galIndex = (galIndex - 1 + galleryImages.length) % galleryImages.length;
  renderGallery();
});
if (galNext) galNext.addEventListener("click", () => {
  if (!galleryImages.length) return;
  galIndex = (galIndex + 1) % galleryImages.length;
  renderGallery();
});

renderGallery();
