
(() => {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced || window.innerWidth < 900) return;

  const style = document.createElement('style');
  style.textContent = `
    .toothless-sky-tr {
      position: fixed;
      inset: 0;
      pointer-events: none;
      z-index: 2;
      overflow: hidden;
    }
    .toothless-tr {
      position: absolute;
      left: -120px;
      top: 10vh;
      width: 92px;
      height: 56px;
      opacity: .95;
      filter: drop-shadow(0 10px 18px rgba(0,0,0,.35));
      will-change: transform, opacity;
      transform-origin: center center;
    }
    .toothless-tr svg { width:100%; height:100%; overflow: visible; }
  `;
  document.head.appendChild(style);
  const layer = document.createElement('div');
  layer.className = 'toothless-sky-tr';
  document.body.appendChild(layer);

  const svg = `
  <svg viewBox="0 0 120 70" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <g fill="#0f1117">
      <path d="M34 34C19 19 8 15 0 14c9 5 14 12 17 19-6 0-12 2-17 6 11 0 20 4 31 13l10-18-7 0Z"/>
      <path d="M86 34c15-15 26-19 34-20-9 5-14 12-17 19 6 0 12 2 17 6-11 0-20 4-31 13L79 34h7Z"/>
      <ellipse cx="60" cy="35" rx="23" ry="14"/>
      <ellipse cx="79" cy="31" rx="14" ry="10"/>
      <path d="M49 19l-7-12 11 7M74 19l7-12-11 7" stroke="#0f1117" stroke-width="4" stroke-linecap="round" fill="none"/>
      <path d="M43 47c9 7 24 7 33 0" stroke="#1fc97a" stroke-width="3" stroke-linecap="round" opacity=".72"/>
    </g>
    <circle cx="84" cy="29" r="4.4" fill="#d5fbff"/>
    <circle cx="84.6" cy="29" r="2.1" fill="#0f1117"/>
  </svg>`;

  const dragons = [];
  const count = 3;

  function newDragon(i) {
    const el = document.createElement('div');
    el.className = 'toothless-tr';
    el.innerHTML = svg;
    layer.appendChild(el);
    const d = {
      el,
      x: -120 - Math.random()*300,
      y: 90 + i*150 + Math.random()*70,
      speed: 0.45 + Math.random()*0.35,
      bob: Math.random()*Math.PI*2,
      pauseUntil: 0,
      lookUntil: 0,
      flip: 1,
      scale: 0.65 + Math.random()*0.22,
      nextPause: performance.now() + 2200 + Math.random()*2600
    };
    dragons.push(d);
  }
  for (let i=0;i<count;i++) newDragon(i);

  function animate(now) {
    const w = window.innerWidth;
    dragons.forEach((d, idx) => {
      if (now > d.nextPause && now > d.pauseUntil) {
        d.pauseUntil = now + 900 + Math.random()*1200;
        d.lookUntil = d.pauseUntil;
        d.nextPause = now + 5000 + Math.random()*5000;
      }
      if (now > d.pauseUntil) d.x += d.speed * (1 + idx*0.08);

      d.bob += 0.035 + idx*0.003;
      const y = d.y + Math.sin(d.bob) * 16;

      if (d.x > w + 180) {
        d.x = -220 - Math.random()*260;
        d.y = 70 + Math.random()*(window.innerHeight*0.55);
      }

      const looking = now < d.lookUntil;
      const angle = looking ? Math.sin(now/140) * 4 : Math.sin(d.bob*2) * 3;
      const flap = looking ? 0.98 : (1 + Math.sin(now/90 + idx)*0.05);
      d.el.style.transform = `translate3d(${d.x}px, ${y}px, 0) rotate(${angle}deg) scale(${d.scale * flap})`;
    });
    requestAnimationFrame(animate);
  }
  requestAnimationFrame(animate);
})();
