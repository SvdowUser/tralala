// --------------------
// Drawer Menu
// --------------------
const drawer = document.getElementById("drawer");
const menuBtn = document.getElementById("menuBtn");
const closeDrawer = document.getElementById("closeDrawer");

function openDrawer(){
  drawer.classList.add("open");
  drawer.setAttribute("aria-hidden", "false");
}
function shutDrawer(){
  drawer.classList.remove("open");
  drawer.setAttribute("aria-hidden", "true");
}

menuBtn?.addEventListener("click", openDrawer);
closeDrawer?.addEventListener("click", shutDrawer);
drawer?.addEventListener("click", (e) => {
  if (e.target === drawer) shutDrawer();
});
document.querySelectorAll(".drawer-link").forEach(a => {
  a.addEventListener("click", () => shutDrawer());
});

// --------------------
// Audio (autoplay safe)
// --------------------
const audio = document.getElementById("bgMusic");
const audioBtn = document.getElementById("audioBtn");

let started = false;

async function startAudio(){
  if (!audio || started) return;
  started = true;
  audio.volume = 0.35;
  audio.muted = false;

  try{
    await audio.play();
    if (audioBtn) audioBtn.textContent = "🔊";
  }catch(err){
    // blocked: user must click button once
    started = false;
  }
}

// Start audio on first user interaction (mobile-friendly)
window.addEventListener("pointerdown", startAudio, { once: true });

audioBtn?.addEventListener("click", async () => {
  if (!started) await startAudio();
  if (!audio) return;
  audio.muted = !audio.muted;
  audioBtn.textContent = audio.muted ? "🔇" : "🔊";
});

// --------------------
// Contract copy
// --------------------
const copyBtn = document.getElementById("copyBtn");
const contractText = document.getElementById("contractText");
const copyStatus = document.getElementById("copyStatus");

copyBtn?.addEventListener("click", async () => {
  try{
    const text = contractText?.innerText?.trim() || "";
    await navigator.clipboard.writeText(text);
    if (copyStatus) copyStatus.textContent = "Copied!";
    setTimeout(() => { if (copyStatus) copyStatus.textContent = ""; }, 1400);
  }catch(e){
    if (copyStatus) copyStatus.textContent = "Copy failed — long-press to copy.";
  }
});

// --------------------
// Gallery slider
// Replace/extend file names here
// --------------------
const galleryFiles = [
  "assets/gallery1.jpg",
  "assets/gallery2.jpg",
  "assets/gallery3.jpg",
  "assets/gallery4.jpg",
  "assets/gallery5.jpg",
  "assets/gallery6.jpg"
];

const galleryImg = document.getElementById("galleryImg");
const prevImg = document.getElementById("prevImg");
const nextImg = document.getElementById("nextImg");
const dotsWrap = document.getElementById("dots");

let idx = 0;

function renderDots(){
  if (!dotsWrap) return;
  dotsWrap.innerHTML = "";
  galleryFiles.forEach((_, i) => {
    const d = document.createElement("div");
    d.className = "dotty" + (i === idx ? " active" : "");
    d.addEventListener("click", () => {
      idx = i;
      updateGallery();
    });
    dotsWrap.appendChild(d);
  });
}

function updateGallery(){
  if (!galleryImg) return;
  galleryImg.src = galleryFiles[idx];
  renderDots();
}

prevImg?.addEventListener("click", () => {
  idx = (idx - 1 + galleryFiles.length) % galleryFiles.length;
  updateGallery();
});

nextImg?.addEventListener("click", () => {
  idx = (idx + 1) % galleryFiles.length;
  updateGallery();
});

// Swipe on mobile
let startX = 0;
galleryImg?.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
}, { passive: true });

galleryImg?.addEventListener("touchend", (e) => {
  const endX = e.changedTouches[0].clientX;
  const diff = endX - startX;
  if (Math.abs(diff) > 40){
    if (diff > 0) prevImg?.click();
    else nextImg?.click();
  }
}, { passive: true });

updateGallery();
