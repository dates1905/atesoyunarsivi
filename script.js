const APP_VERSION = "1.0.14";
const BUILD_DATE = "20.03.2026";
const DOWNLOAD_URL =
  "https://github.com/dates1905/ATES-OYUN-ARSIVI/releases/download/v1.0.14/Ates-Oyun-Arsivi-Setup-1.0.14.exe";

document.addEventListener("DOMContentLoaded", () => {
  const versionText = document.getElementById("versionText");
  const versionBadge = document.getElementById("versionBadge");
  const buildDate = document.getElementById("buildDate");
  const downloadBtn = document.getElementById("downloadBtn");
  const copyVersionBtn = document.getElementById("copyVersionBtn");
  const copyMessage = document.getElementById("copyMessage");
  const systemStatus = document.getElementById("systemStatus");
  const navbar = document.querySelector(".navbar");
  const revealItems = document.querySelectorAll(".reveal");
  const statNumbers = document.querySelectorAll("[data-count]");
  const parallaxItems = document.querySelectorAll("[data-parallax]");

  if (versionText) {
    versionText.textContent = `v${APP_VERSION}`;
  }

  if (versionBadge) {
    versionBadge.textContent = `Sürüm: v${APP_VERSION}`;
  }

  if (buildDate) {
    buildDate.textContent = `Build: ${BUILD_DATE}`;
  }

  if (downloadBtn) {
    downloadBtn.href = DOWNLOAD_URL;
  }

  if (copyVersionBtn) {
    copyVersionBtn.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(`v${APP_VERSION}`);
        if (copyMessage) {
          copyMessage.textContent = `Sürüm kopyalandı: v${APP_VERSION}`;
          copyMessage.classList.add("show");
          setTimeout(() => {
            copyMessage.textContent = "";
            copyMessage.classList.remove("show");
          }, 1800);
        }
      } catch (error) {
        if (copyMessage) {
          copyMessage.textContent = "Kopyalama başarısız oldu.";
          copyMessage.classList.add("show");
          setTimeout(() => {
            copyMessage.textContent = "";
            copyMessage.classList.remove("show");
          }, 1800);
        }
      }
    });
  }

  function updateOnlineStatus() {
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

  updateOnlineStatus();
  window.addEventListener("online", updateOnlineStatus);
  window.addEventListener("offline", updateOnlineStatus);

  function handleNavbar() {
    if (!navbar) return;
    if (window.scrollY > 20) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  }

  handleNavbar();
  window.addEventListener("scroll", handleNavbar);

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12 }
    );

    revealItems.forEach((item) => revealObserver.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add("visible"));
  }

  function animateCount(el) {
    const target = Number(el.dataset.count || 0);
    const duration = 1400;
    const startTime = performance.now();

    function step(now) {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = Math.floor(target * eased);
      el.textContent = value.toLocaleString("tr-TR");

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = target.toLocaleString("tr-TR");
      }
    }

    requestAnimationFrame(step);
  }

  if ("IntersectionObserver" in window && statNumbers.length) {
    const statsObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          animateCount(entry.target);
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.35 }
    );

    statNumbers.forEach((item) => statsObserver.observe(item));
  } else {
    statNumbers.forEach((item) => {
      const target = Number(item.dataset.count || 0);
      item.textContent = target.toLocaleString("tr-TR");
    });
  }

  function handleParallax() {
    const scrollY = window.scrollY;
    parallaxItems.forEach((item) => {
      const speed = Number(item.dataset.parallax || 0.15);
      item.style.transform = `translate3d(0, ${scrollY * speed}px, 0)`;
    });
  }

  handleParallax();
  window.addEventListener("scroll", handleParallax);

  const cards = document.querySelectorAll(".tilt-card");

  cards.forEach((card) => {
    card.addEventListener("mousemove", (event) => {
      const rect = card.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateY = ((x - centerX) / centerX) * 6;
      const rotateX = -((y - centerY) / centerY) * 6;

      card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform =
        "perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0)";
    });
  });

  const spotlight = document.querySelector(".spotlight");
  if (spotlight) {
    window.addEventListener("mousemove", (e) => {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      spotlight.style.background = `radial-gradient(circle at ${x * 100}% ${
        y * 100
      }%, rgba(255,120,40,0.18), rgba(255,120,40,0.04) 25%, rgba(0,0,0,0) 55%)`;
    });
  }

  const yearNode = document.getElementById("footerYear");
  if (yearNode) {
    yearNode.textContent = String(new Date().getFullYear());
  }
});