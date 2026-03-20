// ===== TEK YERDEN SÜRÜM YÖNETİMİ =====
const APP_VERSION = "1.0.15";
const BUILD_DATE = "20.03.2026";

// ===== ELEMENTLER =====
const versionText = document.getElementById("versionText");
const buildDate = document.getElementById("buildDate");
const versionBadge = document.getElementById("versionBadge");
const downloadBtn = document.getElementById("downloadBtn");

// ===== SÜRÜM YAZDIR =====
if (versionText) versionText.textContent = `v${APP_VERSION}`;
if (buildDate) buildDate.textContent = `Build: ${BUILD_DATE}`;
if (versionBadge) versionBadge.textContent = `Sürüm: v${APP_VERSION}`;

// ===== İNDİRME LİNKİ OTOMATİK =====
if (downloadBtn) {
  downloadBtn.href = `https://github.com/dates1905/ATES-OYUN-ARSIVI/releases/download/v${APP_VERSION}/Ates-Oyun-Arsivi-Setup-${APP_VERSION}.exe`;
}

// ===== KOPYALA BUTONU (VARSA) =====
const copyBtn = document.getElementById("copyVersionBtn");

if (copyBtn) {
  copyBtn.addEventListener("click", () => {
    navigator.clipboard.writeText(`v${APP_VERSION}`);
    copyBtn.textContent = "Kopyalandı!";
    setTimeout(() => {
      copyBtn.textContent = "Sürümü Kopyala";
    }, 1500);
  });
}