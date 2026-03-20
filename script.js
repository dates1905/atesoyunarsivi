document.addEventListener("DOMContentLoaded", () => {
  const APP_VERSION = "1.0.14";
  const BUILD_DATE = "20.03.2026";
  const DOWNLOAD_URL =
    "https://github.com/dates1905/ATES-OYUN-ARSIVI/releases/download/v1.0.14/Ates-Oyun-Arsivi-Setup-1.0.14.exe";

  const versionText = document.getElementById("versionText");
  const versionBadge = document.getElementById("versionBadge");
  const buildDate = document.getElementById("buildDate");
  const downloadBtn = document.getElementById("downloadBtn");
  const heroDownloadBtn = document.getElementById("heroDownloadBtn");
  const copyVersionBtn = document.getElementById("copyVersionBtn");
  const copyMessage = document.getElementById("copyMessage");
  const systemStatus = document.getElementById("systemStatus");
  const navbar = document.getElementById("navbar");
  const footerYear = document.getElementById("footerYear");
  const spotlight = document.querySelector(".spotlight");
  const tiltCards = document.querySelectorAll(".tilt-card");
  const countNodes = document.querySelectorAll("[data-count]");

  if (versionText) versionText.textContent = `v${APP_VERSION}`;
  if (versionBadge) versionBadge.textContent = `Sürüm: v${APP_VERSION}`;
  if (buildDate) buildDate.textContent = `Build: ${BUILD_DATE}`;

  if (downloadBtn) downloadBtn.href = DOWNLOAD_URL;
  if (heroDownloadBtn) heroDownloadBtn.href = "#indir";

  if (footerYear) {
    footerYear.textContent = String(new Date().getFullYear());
  }

  function updateSystemStatus() {
    if (!systemStatus) return;

    if (navigator.onLine) {
      systemStatus.textContent = "Sistem Çevrimiçi";
      systemStatus.classList.remove("offline");
      systemStatus.classList.add("online");
    } else {
      systemStatus.textContent = "Sistem Çevrim Dışı";
      systemStatus.classList.remove("online");
      systemStatus.classList.add("offline");
    }
  }

  updateSystemStatus();
  window.addEventListener("online", updateSystemStatus);
  window.addEventListener("offline", updateSystemStatus);

  if (copyVersionBtn) {
    copyVersionBtn.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(`v${APP_VERSION}`);
        if (copyMessage) {
          copyMessage.textContent = `Sürüm kopyalandı: v${APP_VERSION}`;
          setTimeout(() => {
            copyMessage.textContent = "";
          }, 1800);
        }
      } catch (error) {
        if (copyMessage) {
          copyMessage.textContent = "Kopyalama başarısız oldu.";
          setTimeout(() => {
            copyMessage.textContent = "";
          }, 1800);
        }
      }
    });
  }

  function handleNavbar() {
    if (!navbar) return;

    if (window.scrollY > 14) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  }

  handleNavbar();
  window.addEventListener("scroll", handleNavbar);

  function animateCount(el) {
    const target = Number(el.dataset.count || 0);
    const duration = 1400;
    const start = performance.now();

    function frame(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = Math.floor(target * eased);
      el.textContent = value.toLocaleString("tr-TR");

      if (progress < 1) {
        requestAnimationFrame(frame);
      } else {
        el.textContent = target.toLocaleString("tr-TR");
      }
    }

    requestAnimationFrame(frame);
  }

  countNodes.forEach((node) => animateCount(node));

  tiltCards.forEach((card) => {
    card.addEventListener("mousemove", (event) => {
      const rect = card.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateY = ((x - centerX) / centerX) * 5;
      const rotateX = -((y - centerY) / centerY) * 5;

      card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform =
        "perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0)";
    });
  });

  if (spotlight) {
    window.addEventListener("mousemove", (event) => {
      const x = (event.clientX / window.innerWidth) * 100;
      const y = (event.clientY / window.innerHeight) * 100;

      spotlight.style.background = `radial-gradient(circle at ${x}% ${y}%, rgba(255,120,20,0.12), rgba(255,120,20,0.04) 20%, transparent 42%)`;
    });
  }
});
