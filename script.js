/* =========================
   CONFIG (set these!)
========================= */
const PUMP_FUN_URL = "PASTE_PUMPFUN_URL_HERE";
const CONTRACT_ADDRESS = "PASTE_CONTRACT_ADDRESS_HERE";

/* =========================
   Helpers
========================= */
function isRealUrl(u) {
  return typeof u === "string" && u.startsWith("http");
}
function $(id) {
  return document.getElementById(id);
}
function resolveUrl(relPath) {
  // Works on GitHub Pages: https://user.github.io/repo/ + relPath
  return new URL(relPath, document.baseURI).toString();
}

/* =========================
   Run after DOM is ready
========================= */
document.addEventListener("DOMContentLoaded", () => {
  console.log("[TRALALA] script loaded ✅", { base: document.baseURI });

  /* =========================
     HERO (path + float)
  ========================= */
  try {
    const heroImg = document.querySelector(".hero__img");
    if (heroImg) {
      heroImg.src = "./hero.png";

      let t0 = performance.now();
      const floatLoop = (t) => {
        const dt = (t - t0) / 1000;
        const y = Math.sin(dt * 1.1) * 10;
        const r = Math.sin(dt * 0.8) * 1.2;
        const x = Math.cos(dt * 0.9) * 3;
        heroImg.style.transform = `translate3d(${x}px, ${-y}px, 0) rotate(${r}deg)`;
        requestAnimationFrame(floatLoop);
      };
      requestAnimationFrame(floatLoop);

      heroImg.addEventListener("error", () => {
        console.warn("[TRALALA] Hero image not loading. Expected: ./hero.png");
      });
    }
  } catch (e) {
    console.warn("[TRALALA] HERO init failed:", e);
  }

  /* =========================
     Smooth scroll (# links)
  ========================= */
  try {
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
  } catch (e) {
    console.warn("[TRALALA] Smooth scroll init failed:", e);
  }

  /* =========================
     Pump.fun links
  ========================= */
  try {
    const pumpBtn = $("pumpBtn");
    const pumpFooter = $("pumpFooter");
    const brandLink = $("brandLink");
    const pumpCtaTop = $("pumpCtaTop");

    [pumpBtn, pumpFooter, brandLink, pumpCtaTop].forEach((el) => {
      if (el && isRealUrl(PUMP_FUN_URL)) el.href = PUMP_FUN_URL;
    });
  } catch (e) {
    console.warn("[TRALALA] Pump links init failed:", e);
  }

  /* =========================
     Contract copy
  ========================= */
  try {
    const contractText = $("contractText");
    const copyBtn = $("copyBtn");
    const toast = $("toast");

    if (contractText) contractText.textContent = CONTRACT_ADDRESS;

    async function copyToClipboard(text) {
      try {
        await navigator.clipboard.writeText(text);
        return true;
      } catch {
        try {
          const ta = document.createElement("textarea");
          ta.value = text;
          ta.setAttribute("readonly", "");
          ta.style.position = "fixed";
          ta.style.left = "-9999px";
          ta.style.top = "-9999px";
          document.body.appendChild(ta);
          ta.focus();
          ta.select();
          ta.setSelectionRange(0, ta.value.length);
          const ok = document.execCommand("copy");
          document.body.removeChild(ta);
          return ok;
        } catch {
          return false;
        }
      }
    }

    copyBtn?.addEventListener("click", async () => {
      const value =
        (contractText?.textContent || "").trim() ||
        (CONTRACT_ADDRESS || "").trim();

      if (!value || value.includes("PASTE_CONTRACT")) {
        if (toast) {
          toast.textContent = "Set CONTRACT_ADDRESS first";
          setTimeout(() => (toast.textContent = ""), 1600);
        }
        return;
      }

      const ok = await copyToClipboard(value);

      if (toast) {
        toast.textContent = ok ? "COPIED ✓" : "Copy failed";
        setTimeout(() => (toast.textContent = ""), 1600);
      }

      if (copyBtn) {
        copyBtn.textContent = ok ? "COPIED" : "COPY";
        setTimeout(() => (copyBtn.textContent = "COPY"), 1200);
      }
    });
  } catch (e) {
    console.warn("[TRALALA] Copy init failed:", e);
  }

  /* =========================
     AUDIO (start muted)
  ========================= */
  try {
    const audio = $("bgAudio");
    const audioToggle = $("audioToggle");
    const audioIcon = $("audioIcon");

    const MASK_SPEAKER_ON = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M3 10v4h4l5 4V6L7 10H3zm13.5 2a3.5 3.5 0 0 0-2-3.15v6.3A3.5 3.5 0 0 0 16.5 12zm0-8a1 1 0 0 1 1 1c0 .43-.27.81-.66.95A8.5 8.5 0 0 1 19 12a8.5 8.5 0 0 1-2.16 5.05 1 1 0 0 1-1.51-1.32A6.5 6.5 0 0 0 17 12a6.5 6.5 0 0 0-1.67-3.73A1 1 0 0 1 16.5 4z'/%3E%3C/svg%3E")`;
    const MASK_SPEAKER_OFF = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M3 10v4h4l5 4V6L7 10H3zm16.3 2 1.7 1.7-1.4 1.4L18 13.4l-1.7 1.7-1.4-1.4L16.6 12l-1.7-1.7 1.4-1.4L18 10.6l1.7-1.7 1.4 1.4L19.4 12z'/%3E%3C/svg%3E")`;

    function setAudioUI(isMuted) {
      if (!audioToggle || !audioIcon) return;
      audioToggle.classList.toggle("isMuted", isMuted);
      audioToggle.setAttribute("aria-pressed", String(!isMuted));
      audioIcon.style.setProperty("--mask", isMuted ? MASK_SPEAKER_OFF : MASK_SPEAKER_ON);
    }

    let muted = true;
    if (audio) {
      audio.loop = true;
      audio.muted = true;
    }
    setAudioUI(true);

    audioToggle?.addEventListener("click", async () => {
      if (!audio) return;
      muted = !muted;
      audio.muted = muted;
      setAudioUI(muted);
      if (!muted) {
        try { await audio.play(); } catch (e) { console.warn("[TRALALA] Audio blocked:", e); }
      }
    });
  } catch (e) {
    console.warn("[TRALALA] Audio init failed:", e);
  }

  /* =========================
     GALLERY (ROOT images 1.png..6.png)
     - never crashes even if cap removed
  ========================= */
  try {
    const galleryImages = ["1.png","2.png","3.png","4.png","5.png","6.png"];

    const galImg = $("galImg");
    const galPrev = $("galPrev");
    const galNext = $("galNext");
    const galDots = $("galDots");
    const galCap = $("galCap"); // optional (can be null)

    if (!galImg) {
      console.warn("[TRALALA] galImg not found. Check HTML: <img id='galImg' ...>");
      return;
    }

    let galIndex = 0;
    let triedAlt = false;

    function renderDots() {
      if (!galDots) return;
      galDots.innerHTML = "";
      for (let i = 0; i < galleryImages.length; i++) {
        const d = document.createElement("span");
        if (i === galIndex) d.classList.add("isOn");
        galDots.appendChild(d);
      }
    }

    function setSrc(file, alt = false) {
      const rel = alt ? `./assets/gallery/${file}` : `./${file}`;
      const url = resolveUrl(rel);
      // Cache bust (während du testest)
      galImg.src = url + `?v=${Date.now()}`;
      galImg.loading = "eager";

      // Caption leer halten (kein grauer Kasten Text)
      if (galCap) galCap.textContent = "";
      console.log("[TRALALA] gallery try:", rel);
    }

    function render() {
      triedAlt = false;
      setSrc(galleryImages[galIndex], false);
      renderDots();
    }

    galImg.addEventListener("error", () => {
      const file = galleryImages[galIndex];
      if (!triedAlt) {
        triedAlt = true;
        setSrc(file, true);
        return;
      }
      console.warn(`[TRALALA] Gallery image failed both: ./${file} and ./assets/gallery/${file}`);
      if (galCap) galCap.textContent = "";
    });

    galPrev?.addEventListener("click", () => {
      galIndex = (galIndex - 1 + galleryImages.length) % galleryImages.length;
      render();
    });
    galNext?.addEventListener("click", () => {
      galIndex = (galIndex + 1) % galleryImages.length;
      render();
    });

    // Swipe
    let startX = null;
    galImg.addEventListener("touchstart", (e) => {
      startX = e.touches?.[0]?.clientX ?? null;
    }, { passive: true });

    galImg.addEventListener("touchend", (e) => {
      if (startX == null) return;
      const endX = e.changedTouches?.[0]?.clientX ?? null;
      if (endX == null) return;
      const dx = endX - startX;
      if (Math.abs(dx) > 40) {
        galIndex = dx > 0
          ? (galIndex - 1 + galleryImages.length) % galleryImages.length
          : (galIndex + 1) % galleryImages.length;
        render();
      }
      startX = null;
    }, { passive: true });

    render();
  } catch (e) {
    console.warn("[TRALALA] Gallery init failed (THIS is why images won't load):", e);
  }
});
