(function () {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduced || window.innerWidth < 700) return;

  const layer = document.getElementById("cursorFx");
  if (!layer) return;

  const glow = document.createElement("div");
  glow.className = "cursor-glow";
  const dot = document.createElement("div");
  dot.className = "cursor-dot";
  layer.appendChild(glow);
  layer.appendChild(dot);

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let glowX = mouseX;
  let glowY = mouseY;
  let dotX = mouseX;
  let dotY = mouseY;

  function tick() {
    glowX += (mouseX - glowX) * 0.14;
    glowY += (mouseY - glowY) * 0.14;
    dotX += (mouseX - dotX) * 0.42;
    dotY += (mouseY - dotY) * 0.42;
    glow.style.transform = `translate3d(${glowX}px, ${glowY}px, 0)`;
    dot.style.transform = `translate3d(${dotX}px, ${dotY}px, 0)`;
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);

  let lastTrail = 0;
  function spawnTrail(x, y) {
    const now = performance.now();
    if (now - lastTrail < 24) return;
    lastTrail = now;
    const t = document.createElement("div");
    t.className = "cursor-trail";
    t.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    layer.appendChild(t);
    setTimeout(() => t.remove(), 620);
  }

  window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    spawnTrail(mouseX, mouseY);
  }, { passive: true });

  const magnetics = document.querySelectorAll(".btn, .feature-card, .mini-badge, .lang-item, .brand-logo");
  magnetics.forEach((el) => {
    if (el.classList.contains("floating-panel")) return;
    el.addEventListener("mousemove", (e) => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - r.left - r.width / 2;
      const y = e.clientY - r.top - r.height / 2;
      el.style.transform = `translate(${x * 0.06}px, ${y * 0.06}px)`;
      glow.classList.add("active");
    });
    el.addEventListener("mouseleave", () => {
      el.style.transform = "";
      glow.classList.remove("active");
    });
  });
})();