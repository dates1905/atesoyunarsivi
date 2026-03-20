// ===== SÜRÜM AYARLARI =====
const APP_VERSION = "1.0.15";
const BUILD_DATE = "20.03.2026";

// ===== ELEMENTLER =====
const versionText = document.getElementById("versionText");
const buildDate = document.getElementById("buildDate");
const versionBadge = document.getElementById("versionBadge");
const downloadBtn = document.getElementById("downloadBtn");
const copyBtn = document.getElementById("copyVersionBtn");
const copyMessage = document.getElementById("copyMessage");

// ===== SÜRÜM YAZDIR =====
if (versionText) versionText.textContent = `v${APP_VERSION}`;
if (buildDate) buildDate.textContent = `Build: ${BUILD_DATE}`;
if (versionBadge) versionBadge.textContent = `Sürüm: v${APP_VERSION}`;

// ===== İNDİRME LİNKİ =====
if (downloadBtn) {
  downloadBtn.href = `https://github.com/dates1905/ATES-OYUN-ARSIVI/releases/download/v${APP_VERSION}/Ates-Oyun-Arsivi-Setup-${APP_VERSION}.exe`;
}

// ===== KOPYALA =====
if (copyBtn) {
  copyBtn.addEventListener("click", () => {
    navigator.clipboard.writeText(`v${APP_VERSION}`);

    if (copyMessage) {
      copyMessage.textContent = "Sürüm kopyalandı!";
      setTimeout(() => {
        copyMessage.textContent = "";
      }, 1500);
    }
  });
}