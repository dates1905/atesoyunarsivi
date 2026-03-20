// ===== SÜRÜM AYARLARI =====
const APP_VERSION = "1.0.14";
const BUILD_DATE = "20.03.2026";

document.addEventListener("DOMContentLoaded", () => {

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
    copyBtn.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(`v${APP_VERSION}`);
        if (copyMessage) {
          copyMessage.textContent = "Sürüm kopyalandı!";
          setTimeout(() => {
            copyMessage.textContent = "";
          }, 1500);
        }
      } catch (err) {
        if (copyMessage) {
          copyMessage.textContent = "Kopyalama başarısız!";
          setTimeout(() => {
            copyMessage.textContent = "";
          }, 1500);
        }
      }
    });
  }

  // ===== REVEAL (SİTE BOŞ GÖRÜNMESİN) =====
  const revealElements = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12
    });

    revealElements.forEach((el) => observer.observe(el));
  } else {
    revealElements.forEach((el) => el.classList.add("visible"));
  }

  // ===== İLK AÇILIŞTA GÖRÜNSÜN =====
  revealElements.forEach((el) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight) {
      el.classList.add("visible");
    }
  });

});