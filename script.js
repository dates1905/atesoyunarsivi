// ===== SÜRÜM AYARLARI =====
const APP_VERSION = "1.0.14";
const BUILD_DATE = "20.03.2026";
const DOWNLOAD_URL = "https://github.com/dates1905/ATES-OYUN-ARSIVI/releases/download/v1.0.14/Ates-Oyun-Arsivi-Setup-1.0.14.exe";

document.addEventListener("DOMContentLoaded", () => {

  // ===== ELEMENTLER =====
  const versionText = document.getElementById("versionText");
  const buildDate = document.getElementById("buildDate");
  const versionBadge = document.getElementById("versionBadge");
  const downloadBtn = document.getElementById("downloadBtn");
  const copyBtn = document.getElementById("copyVersionBtn");
  const copyMessage = document.getElementById("copyMessage");
  const statusText = document.getElementById("systemStatus");

  // ===== SÜRÜM YAZDIR =====
  if (versionText) versionText.textContent = `v${APP_VERSION}`;
  if (buildDate) buildDate.textContent = `Build: ${BUILD_DATE}`;
  if (versionBadge) versionBadge.textContent = `Sürüm: v${APP_VERSION}`;

  // ===== DOWNLOAD =====
  if (downloadBtn) {
    downloadBtn.href = DOWNLOAD_URL;
  }

  // ===== COPY =====
  if (copyBtn) {
    copyBtn.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(`v${APP_VERSION}`);
        if (copyMessage) {
          copyMessage.textContent = "Sürüm kopyalandı!";
          setTimeout(() => copyMessage.textContent = "", 1500);
        }
      } catch {
        if (copyMessage) {
          copyMessage.textContent = "Kopyalama başarısız!";
          setTimeout(() => copyMessage.textContent = "", 1500);
        }
      }
    });
  }

  // ===== ONLINE STATUS =====
  function updateStatus() {
    if (!statusText) return;
    if (navigator.onLine) {
      statusText.textContent = "🟢 Sistem Online";
      statusText.style.color = "#00ff88";
    } else {
      statusText.textContent = "🔴 Offline";
      statusText.style.color = "#ff3c3c";
    }
  }

  updateStatus();
  window.addEventListener("online", updateStatus);
  window.addEventListener("offline", updateStatus);

  // ===== 3D HOVER EFFECT =====
  const cards = document.querySelectorAll(".feature-card");

  cards.forEach(card => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const rotateX = -(y - rect.height / 2) / 15;
      const rotateY = (x - rect.width / 2) / 15;

      card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "rotateX(0) rotateY(0) scale(1)";
    });
  });

  // ===== SCROLL REVEAL =====
  const reveals = document.querySelectorAll(".reveal");

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, { threshold: 0.1 });

  reveals.forEach(el => observer.observe(el));

  // ===== FIRE PARTICLES =====
  const canvas = document.getElementById("fireCanvas");
  if (canvas) {
    const ctx = canvas.getContext("2d");

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    window.addEventListener("resize", resize);
    resize();

    const particles = [];

    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedY = Math.random() * 2 + 1;
        this.alpha = Math.random() * 0.5 + 0.2;
      }

      update() {
        this.y -= this.speedY;
        this.alpha -= 0.005;
        if (this.alpha <= 0) this.reset();
      }

      draw() {
        ctx.fillStyle = `rgba(255,120,0,${this.alpha})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    for (let i = 0; i < 80; i++) {
      particles.push(new Particle());
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.update();
        p.draw();
      });
      requestAnimationFrame(animate);
    }

    animate();
  }

});
