const APP_VERSION = "1.0.14";
const BUILD_DATE = "20.03.2026";
const DOWNLOAD_URL = "https://github.com/dates1905/ATES-OYUN-ARSIVI/releases/download/v1.0.14/Ates-Oyun-Arsivi-Setup-1.0.14.exe";

const versionText = document.getElementById("versionText");
const versionBadge = document.getElementById("versionBadge");
const buildDate = document.getElementById("buildDate");
const copyVersionBtn = document.getElementById("copyVersionBtn");
const copyMessage = document.getElementById("copyMessage");
const downloadBtn = document.getElementById("downloadBtn");

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
        setTimeout(() => {
          copyMessage.textContent = "";
        }, 2200);
      }
    } catch (error) {
      if (copyMessage) {
        copyMessage.textContent = "Kopyalama başarısız oldu.";
        setTimeout(() => {
          copyMessage.textContent = "";
        }, 2200);
      }
    }
  });
}

const canvas = document.getElementById("fireCanvas");

if (canvas) {
  const ctx = canvas.getContext("2d");
  let particles = [];

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  class FireParticle {
    constructor() {
      this.reset(true);
    }

    reset(initial = false) {
      this.x = Math.random() * canvas.width;
      this.y = initial
        ? Math.random() * canvas.height
        : canvas.height + Math.random() * 40;

      this.size = 1 + Math.random() * 4;
      this.speedY = 0.8 + Math.random() * 2.2;
      this.speedX = (Math.random() - 0.5) * 1.2;
      this.alpha = 0.18 + Math.random() * 0.45;
      this.life = 50 + Math.random() * 70;
      this.maxLife = this.life;

      const palette = [
        "255,106,0",
        "255,140,0",
        "255,180,80",
        "255,90,0"
      ];
      this.color = palette[Math.floor(Math.random() * palette.length)];
    }

    update() {
      this.y -= this.speedY;
      this.x += this.speedX + Math.sin(this.y * 0.02) * 0.2;
      this.life -= 1;

      if (this.life <= 0 || this.y < -20) {
        this.reset(false);
      }
    }

    draw() {
      const lifeRatio = this.life / this.maxLife;
      const currentAlpha = this.alpha * lifeRatio;

      ctx.beginPath();
      ctx.fillStyle = `rgba(${this.color}, ${currentAlpha})`;
      ctx.shadowBlur = 18;
      ctx.shadowColor = `rgba(${this.color}, ${currentAlpha})`;
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function createParticles() {
    particles = [];
    const count = Math.max(60, Math.floor(window.innerWidth / 18));

    for (let i = 0; i < count; i++) {
      particles.push(new FireParticle());
    }
  }

  function drawFireBaseGlow() {
    const gradient = ctx.createLinearGradient(0, canvas.height, 0, canvas.height - 220);
    gradient.addColorStop(0, "rgba(255,106,0,0.18)");
    gradient.addColorStop(0.4, "rgba(255,120,0,0.08)");
    gradient.addColorStop(1, "rgba(255,120,0,0)");

    ctx.fillStyle = gradient;
    ctx.fillRect(0, canvas.height - 240, canvas.width, 240);
  }

  function animateFire() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawFireBaseGlow();

    for (const particle of particles) {
      particle.update();
      particle.draw();
    }

    requestAnimationFrame(animateFire);
  }

  resizeCanvas();
  createParticles();
  animateFire();

  window.addEventListener("resize", () => {
    resizeCanvas();
    createParticles();
  });
}
