const copyButton = document.getElementById("copyButton");
const contractValue = document.getElementById("contractValue");
const copyStatus = document.getElementById("copyStatus");
const yearSpan = document.getElementById("year");

if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

if (copyButton && contractValue && copyStatus) {
  copyButton.addEventListener("click", async () => {
    const text = contractValue.textContent.trim();

    try {
      await navigator.clipboard.writeText(text);
      copyButton.textContent = "Copied";
      copyStatus.textContent = "Copied";
      setTimeout(() => {
        copyButton.textContent = "Copy CA";
        copyStatus.textContent = "Ready";
      }, 1400);
    } catch (error) {
      copyButton.textContent = "Failed";
      copyStatus.textContent = "Failed";
      setTimeout(() => {
        copyButton.textContent = "Copy CA";
        copyStatus.textContent = "Ready";
      }, 1400);
    }
  });
}
