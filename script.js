(() => {
  // ===== MENU =====
  const menuBtn = document.getElementById("menuBtn");
  const menu = document.getElementById("menu");
  const overlay = document.getElementById("overlay");

  function openMenu() {
    menu.style.display = "block";
    overlay.style.display = "block";
    menuBtn.setAttribute("aria-expanded", "true");
    menu.setAttribute("aria-hidden", "false");
    overlay.setAttribute("aria-hidden", "false");
  }
  function closeMenu() {
    menu.style.display = "none";
    overlay.style.display = "none";
    menuBtn.setAttribute("aria-expanded", "false");
    menu.setAttribute("aria-hidden", "true");
    overlay.setAttribute("aria-hidden", "true");
  }

  menuBtn?.addEventListener("click", () => {
    const isOpen = menu.style.display === "block";
    isOpen ? closeMenu() : openMenu();
  });
  overlay?.addEventListener("click", closeMenu);
  menu?.querySelectorAll("a").forEach(a => a.addEventListener("click", closeMenu));

  // ===== HERO IMAGE DEBUG / FALLBACK =====
  const heroImg = document.getElementById("heroImg");
  const imgFallback = document.getElementById("imgFallback");

  function showHeroFallback(msg) {
    if (imgFallback) {
      imgFallback.hidden = false;
      if (msg) console.warn(msg);
    }
  }

  if (heroImg) {
    heroImg.addEventListener("error", () => {
      showHeroFallback("Hero image failed to load. Check repo filename/path (hero.png).");
      console.log("Tried:", heroImg.src);
    });
    heroImg.addEventListener("load", () => {
      if (imgFallback) imgFallback.hidden = true;
    });
  }

  // ===== AUDIO (TOGGLE ONLY, NO SLIDER) =====
  const audio = document.getElementById("bgAudio");
  const toggle = document.getElementById("soundToggle");
  const icon = toggle?.querySelector(".soundToggle__icon");

  let isPlaying = false;
  let hasUserGesture = false;

  // Browser policy: must be started by user gesture
  async function tryPlay() {
    if (!audio) return;
    try {
      audio.volume = 1;
      await audio.play();
      isPlaying = true;
      updateSoundUI();
    } catch (e) {
      // Autoplay blocked or other error
      console.warn("Audio play blocked until user gesture:", e);
      isPlaying = false;
      updateSoundUI();
    }
  }

  function pauseAudio() {
    if (!audio) return;
    audio.pause();
    isPlaying = false;
    updateSoundUI();
  }

  function updateSoundUI() {
    if (!toggle || !icon) return;
    toggle.setAttribute("aria-pressed", String(isPlaying));
    icon.textContent = isPlaying ? "🔊" : "🔇";
  }

  // Ensure we count a real gesture
  function markGesture() {
    hasUserGesture = true;
    document.removeEventListener("pointerdown", markGesture);
    document.removeEventListener("keydown", markGesture);
  }
  document.addEventListener("pointerdown", markGesture, { once: true });
  document.addEventListener("keydown", markGesture, { once: true });

  toggle?.addEventListener("click", async () => {
    if (!audio) return;

    // If it's not playing, attempt to start. If playing, stop.
    if (!isPlaying) {
      // Force user gesture required path
      if (!hasUserGesture) hasUserGesture = true;
      await tryPlay();
    } else {
      pauseAudio();
    }
  });

  // Keep it looped even if some browsers pause on background changes
  audio?.addEventListener("ended", () => {
    audio.currentTime = 0;
    if (isPlaying) tryPlay();
  });

  updateSoundUI();

  // ===== COPY CONTRACT =====
  const copyBtn = document.getElementById("copyBtn");
  const contractText = document.getElementById("contractText");
  const copyHint = document.getElementById("copyHint");

  copyBtn?.addEventListener("click", async () => {
    const text = contractText?.textContent?.trim() || "";
    if (!text || text === "PASTE_CONTRACT_ADDRESS_HERE") {
      if (copyHint) copyHint.textContent = "Paste your contract address first.";
      return;
    }
    try {
      await navigator.clipboard.writeText(text);
      if (copyHint) copyHint.textContent = "Copied!";
      setTimeout(() => { if (copyHint) copyHint.textContent = ""; }, 1200);
    } catch (e) {
      console.warn("Clipboard failed:", e);
      if (copyHint) copyHint.textContent = "Copy failed (browser blocked).";
    }
  });

  // ===== GALLERY (REPLACE FILENAMES) =====
  // Put your images in repo root (same level as index.html), e.g. g1.jpg, g2.jpg...
  const galleryData = [
    { src: "./g1.jpg?v=1", caption: "Gallery 1" },
    { src: "./g2.jpg?v=1", caption: "Gallery 2" },
    { src: "./g3.jpg?v=1", caption: "Gallery 3" },
    { src: "./g4.jpg?v=1", caption: "Gallery 4" },
    { src: "./g5.jpg?v=1", caption: "Gallery 5" },
    { src: "./g6.jpg?v=1", caption: "Gallery 6" }
  ];

  const galleryImg = document.getElementById("galleryImg");
  const galleryCaption = document.getElementById("galleryCaption");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const dotsWrap = document.getElementById("galleryDots");

  let idx = 0;

  function renderDots() {
    if (!dotsWrap) return;
    dotsWrap.innerHTML = "";
    galleryData.forEach((_, i) => {
      const d = document.createElement("span");
      if (i === idx) d.classList.add("is-active");
      dotsWrap.appendChild(d);
    });
  }

  function setGallery(i) {
    if (!galleryImg || !galleryCaption) return;
    idx = (i + galleryData.length) % galleryData.length;

    galleryImg.src = galleryData[idx].src;
    galleryCaption.textContent = galleryData[idx].caption;
    renderDots();
  }

  prevBtn?.addEventListener("click", () => setGallery(idx - 1));
  nextBtn?.addEventListener("click", () => setGallery(idx + 1));

  // Swipe support
  let startX = null;
  galleryImg?.addEventListener("pointerdown", (e) => { startX = e.clientX; });
  galleryImg?.addEventListener("pointerup", (e) => {
    if (startX == null) return;
    const dx = e.clientX - startX;
    startX = null;
    if (Math.abs(dx) > 40) {
      dx > 0 ? setGallery(idx - 1) : setGallery(idx + 1);
    }
  });

  // Init gallery (only if element exists)
  if (galleryImg && galleryData.length) setGallery(0);

  // ===== QUICK PATH CHECKS (helps with your hero.png issue) =====
  // Open DevTools Console and you’ll see if the files are reachable.
  const checks = [
    { name: "hero", url: "./hero.png" },
    { name: "logo", url: "./logo.png" },
    { name: "bg", url: "./bg.mp3" }
  ];

  checks.forEach(async (c) => {
    try {
      const res = await fetch(c.url, { cache: "no-store" });
      console.log(`[asset-check] ${c.name}:`, res.status, c.url);
    } catch (e) {
      console.warn(`[asset-check] ${c.name} failed:`, c.url, e);
    }
  });
})();
