const menuButton = document.getElementById("menuButton");
const mobileMenu = document.getElementById("mobileMenu");
const copyButton = document.getElementById("copyButton");
const contractValue = document.getElementById("contractValue");

if (menuButton && mobileMenu) {
  menuButton.addEventListener("click", () => {
    const isOpen = mobileMenu.classList.toggle("is-open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
  });

  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.remove("is-open");
      menuButton.setAttribute("aria-expanded", "false");
    });
  });
}

if (copyButton && contractValue) {
  copyButton.addEventListener("click", async () => {
    const text = contractValue.textContent.trim();

    try {
      await navigator.clipboard.writeText(text);
      const previous = copyButton.textContent;
      copyButton.textContent = "Copied";
      setTimeout(() => {
        copyButton.textContent = previous;
      }, 1400);
    } catch (error) {
      copyButton.textContent = "Failed";
      setTimeout(() => {
        copyButton.textContent = "Copy";
      }, 1400);
    }
  });
}
