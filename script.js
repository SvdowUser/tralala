const sheet = document.getElementById("sheet");
const menuBtn = document.getElementById("menuBtn");

menuBtn?.addEventListener("click", () => {
  sheet.classList.toggle("show");
});

// Close menu when clicking a link
document.querySelectorAll(".sheet__link").forEach(a => {
  a.addEventListener("click", () => sheet.classList.remove("show"));
});

// Copy contract
const copyBtn = document.getElementById("copyBtn");
const contractText = document.getElementById("contractText");

copyBtn?.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(contractText.textContent.trim());
    copyBtn.textContent = "Copied!";
    setTimeout(() => (copyBtn.textContent = "Copy"), 1200);
  } catch {
    alert("Copy ging nicht (Browser). Markier den Text manuell.");
  }
});

// Audio toggle
const audio = document.getElementById("bgAudio");
const audioBtn = document.getElementById("audioBtn");
const audioIcon = document.getElementById("audioIcon");

let playing = false;

// iOS/Browser: Audio darf erst nach Klick starten
audioBtn?.addEventListener("click", async () => {
  if (!audio) return;

  try {
    if (!playing) {
      await audio.play();
      playing = true;
      audioIcon.textContent = "🔊";
    } else {
      audio.pause();
      playing = false;
      audioIcon.textContent = "🔇";
    }
  } catch (e) {
    alert("Audio konnte nicht gestartet werden. (Browser blockt Autoplay – Klick nochmal.)");
  }
});
