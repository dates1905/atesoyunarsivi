(() => {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  if (window.innerWidth < 900) return;

  const canvas = document.getElementById("dragonCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d", { alpha: true });

  let w = 0, h = 0, dpr = Math.min(window.devicePixelRatio || 1, 2);
  const mouse = { x: window.innerWidth * 0.5, y: window.innerHeight * 0.35 };
  let lastTime = performance.now();

  function resize() {
    w = window.innerWidth;
    h = window.innerHeight;
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  window.addEventListener("resize", resize, { passive: true });
  window.addEventListener("mousemove", e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  }, { passive: true });
  resize();

  class ToothlessLikeDragon {
    constructor(seed) {
      this.seed = seed;
      this.phase = Math.random() * Math.PI * 2;
      this.scale = 0.55 + Math.random() * 0.45;
      this.speed = 0.9 + Math.random() * 0.45;
      this.yBand = 0.16 + Math.random() * 0.26;
      this.x = Math.random() * w;
      this.y = h * this.yBand + Math.random() * 120;
      this.dir = Math.random() > 0.5 ? 1 : -1;
      this.lookTimer = 1 + Math.random() * 4;
      this.lookingAtUser = false;
      this.pauseTime = 0;
      this.wing = Math.random() * Math.PI * 2;
      this.turn = 0;
      this.glow = 0.4 + Math.random() * 0.35;
      this.tailSwing = Math.random() * Math.PI * 2;
      this.orbitOffset = Math.random() * 240;
    }

    update(dt, t) {
      this.lookTimer -= dt;
      if (this.pauseTime > 0) {
        this.pauseTime -= dt;
        this.lookingAtUser = true;
        this.turn += ((mouse.x < this.x ? -1 : 1) - this.turn) * dt * 2.4;
      } else {
        this.lookingAtUser = false;
        this.turn += (this.dir - this.turn) * dt * 2.2;
        this.x += this.dir * dt * 110 * this.speed;
        this.y = h * this.yBand + Math.sin(t * 0.7 * this.speed + this.phase) * (40 + this.orbitOffset * 0.08) + Math.cos(t * 1.1 + this.phase) * 12;

        if (this.x > w + 180) this.dir = -1;
        if (this.x < -180) this.dir = 1;

        if (this.lookTimer <= 0) {
          this.pauseTime = 1.6 + Math.random() * 1.8;
          this.lookTimer = 5 + Math.random() * 6;
        }
      }

      this.wing += dt * (this.pauseTime > 0 ? 2.2 : 7.2) * this.speed;
      this.tailSwing += dt * 4.5 * this.speed;
    }

    draw(ctx) {
      const s = 0.62 * this.scale;
      const flap = Math.sin(this.wing) * 0.9;
      const tail = Math.sin(this.tailSwing) * 10;
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.scale(this.turn, 1);

      // shadow glow
      ctx.save();
      ctx.globalAlpha = 0.12 * this.glow;
      ctx.fillStyle = "#7fffd4";
      ctx.beginPath();
      ctx.ellipse(0, 16, 48 * s, 18 * s, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // wings back
      this.drawWing(ctx, -1, flap, s, 0.82);
      this.drawWing(ctx,  1, flap, s, 0.82);

      // body
      ctx.fillStyle = "#0f1118";
      ctx.strokeStyle = "rgba(255,255,255,.07)";
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.ellipse(0, 0, 42 * s, 20 * s, -0.08, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // tail
      ctx.save();
      ctx.translate(-42 * s, 2 * s);
      ctx.strokeStyle = "#0d1016";
      ctx.lineWidth = 9 * s;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.quadraticCurveTo(-26 * s, -4 * s + tail * 0.08, -64 * s, tail * 0.18);
      ctx.quadraticCurveTo(-88 * s, tail * 0.36, -110 * s, tail * 0.18);
      ctx.stroke();

      // split tail fin
      ctx.fillStyle = "#11141d";
      ctx.beginPath();
      ctx.moveTo(-108 * s, tail * 0.18);
      ctx.quadraticCurveTo(-126 * s, -20 * s + tail * 0.25, -138 * s, -6 * s + tail * 0.15);
      ctx.quadraticCurveTo(-126 * s, 6 * s + tail * 0.1, -110 * s, tail * 0.18);
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(-108 * s, tail * 0.18);
      ctx.quadraticCurveTo(-124 * s, 26 * s + tail * 0.2, -138 * s, 8 * s + tail * 0.2);
      ctx.quadraticCurveTo(-124 * s, -2 * s + tail * 0.1, -110 * s, tail * 0.18);
      ctx.fill();
      ctx.restore();

      // head
      ctx.save();
      ctx.translate(38 * s, -1 * s);
      ctx.beginPath();
      ctx.ellipse(0, 0, 22 * s, 19 * s, 0.08, 0, Math.PI * 2);
      ctx.fillStyle = "#10131b";
      ctx.fill();
      ctx.strokeStyle = "rgba(255,255,255,.08)";
      ctx.stroke();

      // ear fins
      ctx.fillStyle = "#0c0f15";
      ctx.beginPath();
      ctx.moveTo(5 * s, -10 * s);
      ctx.quadraticCurveTo(12 * s, -26 * s, 0, -18 * s);
      ctx.quadraticCurveTo(-6 * s, -14 * s, 5 * s, -10 * s);
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(14 * s, -6 * s);
      ctx.quadraticCurveTo(28 * s, -14 * s, 20 * s, -2 * s);
      ctx.quadraticCurveTo(16 * s, 4 * s, 14 * s, -6 * s);
      ctx.fill();

      // eyes
      const eyeTargetX = this.lookingAtUser ? Math.max(-3, Math.min(3, (mouse.x - this.x) * 0.015)) : this.turn * 1.2;
      const eyeTargetY = this.lookingAtUser ? Math.max(-1.5, Math.min(2.2, (mouse.y - this.y) * 0.012)) : 0;
      this.drawEye(ctx, 8 * s, -2 * s, 1.15 * s, eyeTargetX * s, eyeTargetY * s);
      this.drawEye(ctx, 8 * s, 5 * s, 1.0 * s, eyeTargetX * s, eyeTargetY * s);
      ctx.restore();

      // wings front
      this.drawWing(ctx, -1, flap, s, 1);
      this.drawWing(ctx,  1, flap, s, 1);

      ctx.restore();
    }

    drawWing(ctx, side, flap, s, alpha) {
      const sign = side;
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.translate(-2 * s, -4 * s);
      ctx.scale(sign, 1);
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.quadraticCurveTo(30 * s, (-12 - flap * 10) * s, 58 * s, (-30 - flap * 18) * s);
      ctx.quadraticCurveTo(100 * s, (-48 - flap * 10) * s, 128 * s, (-10 - flap * 4) * s);
      ctx.quadraticCurveTo(84 * s, 8 * s, 24 * s, 10 * s);
      ctx.closePath();
      ctx.fillStyle = "rgba(9, 12, 18, 0.96)";
      ctx.fill();

      // membrane lines
      ctx.strokeStyle = "rgba(120,150,190,.10)";
      ctx.lineWidth = 1;
      for (let i = 0; i < 4; i++) {
        const px = 28 + i * 22;
        ctx.beginPath();
        ctx.moveTo(8 * s, 1 * s);
        ctx.quadraticCurveTo(px * s, (-16 - flap * 8) * s, (px + 28) * s, (-10 - flap * 5) * s);
        ctx.stroke();
      }
      ctx.restore();
    }

    drawEye(ctx, x, y, scale, offsetX, offsetY) {
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(scale, scale);
      ctx.fillStyle = "#b7ff67";
      ctx.shadowColor = "rgba(183,255,103,.7)";
      ctx.shadowBlur = 10;
      ctx.beginPath();
      ctx.ellipse(0, 0, 8, 10, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
      ctx.fillStyle = "#102311";
      ctx.beginPath();
      ctx.ellipse(offsetX * 0.45, offsetY * 0.45, 1.8, 6.2, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "rgba(255,255,255,.85)";
      ctx.beginPath();
      ctx.arc(-2.2, -2.5, 1.4, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  const dragons = Array.from({ length: 3 }, (_, i) => new ToothlessLikeDragon(i + 1));

  function frame(now) {
    const dt = Math.min((now - lastTime) / 1000, 0.033);
    lastTime = now;
    const t = now / 1000;

    ctx.clearRect(0, 0, w, h);

    // subtle atmospheric mist
    const grad = ctx.createRadialGradient(w * 0.78, h * 0.18, 10, w * 0.78, h * 0.18, Math.max(w, h) * 0.5);
    grad.addColorStop(0, "rgba(85, 190, 255, 0.05)");
    grad.addColorStop(1, "rgba(85, 190, 255, 0)");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    dragons.forEach(dragon => {
      dragon.update(dt, t);
      dragon.draw(ctx);
    });

    requestAnimationFrame(frame);
  }

  requestAnimationFrame(frame);
})();