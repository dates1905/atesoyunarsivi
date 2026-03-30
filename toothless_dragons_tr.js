(function () {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const sky = document.getElementById("dragonSky");
  if (reduced || !sky || window.innerWidth < 900) return;

  const hero = document.querySelector(".hero-card");
  const heroRect = () => hero ? hero.getBoundingClientRect() : { top: 110, left: 40, right: window.innerWidth - 40, bottom: 700, width: window.innerWidth - 80, height: 590 };

  const dragonSVG = `
  <svg viewBox="0 0 180 120" aria-hidden="true">
    <g class="frame">
      <ellipse class="body" cx="86" cy="63" rx="36" ry="24"></ellipse>
      <ellipse class="nose" cx="117" cy="61" rx="16" ry="11"></ellipse>
      <ellipse class="eye" cx="121" cy="57" rx="3.2" ry="5.2"></ellipse>
      <ellipse class="eye" cx="112" cy="57" rx="3.2" ry="5.2"></ellipse>
      <path class="wing wing-left" d="M80 54 C62 28, 38 21, 14 35 C24 51, 42 61, 72 67 Z"></path>
      <path class="wing wing-right" d="M83 54 C103 25, 132 17, 163 34 C148 52, 128 63, 94 67 Z"></path>
      <path class="tailfin" d="M51 67 C34 70, 18 77, 7 91 C22 93, 37 89, 52 80 Z"></path>
      <path class="tailfin" d="M53 68 C40 82, 32 93, 29 108 C42 104, 53 96, 61 84 Z"></path>
      <ellipse class="body" cx="131" cy="63" rx="5" ry="3.4"></ellipse>
    </g>
  </svg>`;

  function makeDragon(i) {
    const d = document.createElement("div");
    d.className = "dragon";
    d.innerHTML = dragonSVG;
    d.dataset.i = i;
    d.style.left = `${10 + i * 18}%`;
    d.style.top = `${14 + (i % 3) * 10}%`;
    d.style.animationDelay = `${i * 0.7}s`;
    sky.appendChild(d);
    return {
      el: d,
      x: 80 + i * 150,
      y: 120 + i * 60,
      vx: 0.45 + Math.random() * 0.35,
      vy: -0.08 + Math.random() * 0.16,
      flap: Math.random() * Math.PI * 2,
      lookUntil: 0,
      pauseUntil: 0,
      targetAngle: 0
    };
  }

  const dragons = [makeDragon(0), makeDragon(1), makeDragon(2)];

  function animate(time) {
    const rect = heroRect();
    dragons.forEach((d, idx) => {
      if (time > d.pauseUntil && Math.random() < 0.0018) {
        d.pauseUntil = time + 1500 + Math.random() * 1300;
        d.lookUntil = d.pauseUntil;
      }

      const facingUser = time < d.lookUntil;
      const speedMul = time < d.pauseUntil ? 0.08 : 1;

      d.flap += 0.18;
      const wing = 16 + Math.sin(d.flap) * 14;
      d.el.querySelector(".wing-left").setAttribute("transform", `rotate(${-wing} 80 58)`);
      d.el.querySelector(".wing-right").setAttribute("transform", `rotate(${wing} 83 58)`);

      if (!facingUser) {
        d.x += d.vx * speedMul;
        d.y += d.vy * speedMul + Math.sin((time / 500) + idx) * 0.2;
      }

      if (d.x > rect.right + 120) d.x = rect.left - 140;
      if (d.x < rect.left - 160) d.x = rect.right + 120;
      if (d.y < rect.top + 20) d.y = rect.top + 30;
      if (d.y > rect.bottom - 120) d.y = rect.bottom - 130;

      const scale = 0.8 + idx * 0.08;
      const rotation = facingUser ? 0 : (d.vx >= 0 ? 0 : 180);
      d.el.style.transform = `translate(${d.x}px, ${d.y}px) scale(${scale}) scaleX(${d.vx >= 0 ? 1 : -1}) rotate(${facingUser ? 0 : 0}deg)`;
      d.el.style.opacity = facingUser ? "1" : "0.92";
      const eyeColor = facingUser ? "#d8ffd0" : "#a4ff91";
      d.el.querySelectorAll(".eye").forEach(e => e.setAttribute("fill", eyeColor));
    });

    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);
})();