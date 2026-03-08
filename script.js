(function () {
  const video = document.getElementById("bgVideo");

  if (!video) return;

  const tryPlay = () => {
    const promise = video.play();
    if (promise && typeof promise.catch === "function") {
      promise.catch(() => {
        // GitHub Pages itself is not the problem; browsers may still block autoplay
        // in low-power/data-saving situations. The page remains usable either way.
      });
    }
  };

  video.muted = true;
  video.defaultMuted = true;
  video.setAttribute("muted", "");
  video.setAttribute("playsinline", "");
  video.setAttribute("autoplay", "");

  if (document.readyState === "complete" || document.readyState === "interactive") {
    tryPlay();
  } else {
    document.addEventListener("DOMContentLoaded", tryPlay, { once: true });
  }

  window.addEventListener("load", tryPlay, { once: true });
  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) tryPlay();
  });
})();
