// Menu
const menu = document.getElementById("menu");
const openBtn = document.getElementById("menuOpen");
const closeBtn = document.getElementById("menuClose");

openBtn?.addEventListener("click", () => menu.classList.add("is-open"));
closeBtn?.addEventListener("click", () => menu.classList.remove("is-open"));
menu?.addEventListener("click", (e) => {
  if (e.target === menu) menu.classList.remove("is-open");
});

// Smooth scroll for menu links
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener("click", (e) => {
    const id = a.getAttribute("href");
    if (!id || id.length < 2) return;
    const el = document.querySelector(id);
    if (!el) return;
    e.preventDefault();
    menu.classList.remove("is-open");
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

// Year
document.getElementById("year").textContent = new Date().getFullYear();

// Copy contract
const copyBtn = document.getElementById("copyBtn");
copyBtn?.addEventListener("click", async () => {
  const txt = document.getElementById("contractText")?.textContent?.trim() || "";
  if (!txt) return;
  try {
    await navigator.clipboard.writeText(txt);
    copyBtn.textContent = "Copied ✓";
    setTimeout(() => (copyBtn.textContent = "Copy"), 1200);
  } catch {
    copyBtn.textContent = "Copy failed";
    setTimeout(() => (copyBtn.textContent = "Copy"), 1200);
  }
});

// Music toggle (works once you add a real audio source in <audio>)
const musicBtn = document.getElementById("musicBtn");
const audio = document.getElementById("bgMusic");

let playing = false;
musicBtn?.addEventListener("click", async () => {
  if (!audio) return;
  try {
    if (!playing) {
      await audio.play();
      playing = true;
      musicBtn.querySelector(".icon").textContent = "🔈";
    } else {
      audio.pause();
      playing = false;
      musicBtn.querySelector(".icon").textContent = "🔊";
    }
  } catch {
    // Autoplay blocked until user interacts — this click counts, but needs a real source file.
    alert("Add an audio file in the <audio> tag (assets/theme.mp3).");
  }
});
