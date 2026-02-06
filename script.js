// ====== helpers ======
const $ = (id) => document.getElementById(id);

// Year
$("year").textContent = new Date().getFullYear();

// Mobile drawer
const drawer = $("drawer");
const menuBtn = $("menuBtn");
const drawerClose = $("drawerClose");

function openDrawer() {
  drawer.classList.add("open");
  drawer.setAttribute("aria-hidden", "false");
}
function closeDrawer() {
  drawer.classList.remove("open");
  drawer.setAttribute("aria-hidden", "true");
}

menuBtn.addEventListener("click", openDrawer);
drawerClose.addEventListener("click", closeDrawer);
drawer.addEventListener("click", (e) => {
  if (e.target === drawer) closeDrawer();
});
document.querySelectorAll(".drawerLink").forEach(a => {
  a.addEventListener("click", closeDrawer);
});

// Smooth scroll (optional nice feel)
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener("click", (e) => {
    const target = document.querySelector(a.getAttribute("href"));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

// Copy contract
$("copyBtn").addEventListener("click", async () => {
  const text = $("contractText").textContent.trim();
  try {
    await navigator.clipboard.writeText(text);
    $("copyBtn").textContent = "Copied!";
    setTimeout(() => ($("copyBtn").textContent = "Copy"), 1200);
  } catch {
    $("copyBtn").textContent = "Copy failed";
    setTimeout(() => ($("copyBtn").textContent = "Copy"), 1200);
  }
});

// Music toggle (placeholder)
const music = $("bgMusic");
const musicBtn = $("musicBtn");
let playing = false;

musicBtn.addEventListener("click", async () => {
  try {
    if (!playing) {
      await music.play();
      playing = true;
      musicBtn.querySelector(".icon").textContent = "🔈";
    } else {
      music.pause();
      playing = false;
      musicBtn.querySelector(".icon").textContent = "🔊";
    }
  } catch {
    // Autoplay block is common on mobile. User must tap (they did), but file may not exist yet.
    musicBtn.querySelector(".icon").textContent = "❌";
    setTimeout(() => (musicBtn.querySelector(".icon").textContent = "🔊"), 900);
  }
});
