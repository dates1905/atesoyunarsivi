
(() => {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced || window.innerWidth < 768) return;

  const style = document.createElement('style');
  style.textContent = `
    .cursor-glow-tr {
      position: fixed;
      left: 0; top: 0;
      width: 180px; height: 180px;
      border-radius: 999px;
      pointer-events: none;
      z-index: 4;
      background:
        radial-gradient(circle at 50% 50%, rgba(255,107,26,.20), rgba(255,47,109,.12) 35%, rgba(68,112,255,.10) 55%, rgba(0,0,0,0) 72%);
      filter: blur(18px);
      mix-blend-mode: screen;
      transform: translate3d(-9999px,-9999px,0);
      transition: opacity .25s ease;
      opacity: .95;
    }
    .dragon-trail-tr {
      position: fixed;
      left: 0; top: 0;
      width: 34px; height: 20px;
      pointer-events: none;
      z-index: 5;
      transform: translate3d(-9999px,-9999px,0) rotate(0deg) scale(1);
      opacity: .92;
      will-change: transform, opacity;
      filter: drop-shadow(0 6px 10px rgba(0,0,0,.35));
    }
    .dragon-trail-tr svg {
      width: 100%; height: 100%; overflow: visible;
    }
    .dragon-trail-tr.fade {
      transition: transform .55s ease-out, opacity .55s ease-out;
      opacity: 0;
    }
    .magnetic-hover {
      transition: transform .18s ease, box-shadow .18s ease;
      will-change: transform;
    }
  `;
  document.head.appendChild(style);

  const glow = document.createElement('div');
  glow.className = 'cursor-glow-tr';
  document.body.appendChild(glow);

  const dragonSVG = `
  <svg viewBox="0 0 68 40" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M19 20c-7-7-12-9-16-9 3 2 6 5 8 10-3 0-6 1-8 3 6 0 10 2 16 7l8-11-8 0Z" fill="#0f1117"/>
    <path d="M49 20c7-7 12-9 16-9-3 2-6 5-8 10 3 0 6 1 8 3-6 0-10 2-16 7l-8-11 8 0Z" fill="#0f1117"/>
    <ellipse cx="34" cy="20" rx="16" ry="11" fill="#111722"/>
    <ellipse cx="45" cy="18" rx="10" ry="8" fill="#111722"/>
    <circle cx="47.5" cy="16.5" r="2.1" fill="#b8f8ff"/>
    <circle cx="48" cy="16.5" r="1" fill="#0f1117"/>
    <path d="M26 13l-4-7 7 4M42 13l4-7-7 4" stroke="#111722" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    <path d="M30 29c4 3 8 3 12 0" stroke="#1fc97a" stroke-width="2" stroke-linecap="round" opacity=".7"/>
  </svg>`;

  let mx = window.innerWidth * .5, my = window.innerHeight * .5;
  let gx = mx, gy = my;
  let raf = null;
  let lastTrail = 0;
  let lastPos = {x: mx, y: my};

  function spawnTrail(x, y, angle, speed) {
    const el = document.createElement('div');
    el.className = 'dragon-trail-tr';
    const scale = 0.85 + Math.min(speed / 18, 0.45);
    el.innerHTML = dragonSVG;
    el.style.transform = `translate3d(${x-17}px, ${y-10}px, 0) rotate(${angle}deg) scale(${scale})`;
    document.body.appendChild(el);
    requestAnimationFrame(() => {
      el.classList.add('fade');
      const dx = -Math.cos(angle * Math.PI/180) * (12 + Math.random()*10);
      const dy = -Math.sin(angle * Math.PI/180) * (12 + Math.random()*10);
      el.style.transform = `translate3d(${x-17 + dx}px, ${y-10 + dy}px, 0) rotate(${angle}deg) scale(${scale*0.78})`;
    });
    setTimeout(() => el.remove(), 620);
  }

  function frame() {
    gx += (mx - gx) * 0.18;
    gy += (my - gy) * 0.18;
    glow.style.transform = `translate3d(${gx-90}px, ${gy-90}px, 0)`;

    const now = performance.now();
    const dx = mx - lastPos.x, dy = my - lastPos.y;
    const speed = Math.hypot(dx, dy);
    if (now - lastTrail > 22 && speed > 2.5) {
      const angle = Math.atan2(dy, dx) * 180 / Math.PI;
      spawnTrail(mx, my, angle, speed);
      lastTrail = now;
      lastPos = {x: mx, y: my};
    }

    raf = requestAnimationFrame(frame);
  }

  window.addEventListener('mousemove', (e) => {
    mx = e.clientX; my = e.clientY;
    if (!raf) raf = requestAnimationFrame(frame);
  }, {passive:true});

  window.addEventListener('mouseleave', () => glow.style.opacity = '.15');
  window.addEventListener('mouseenter', () => glow.style.opacity = '.95');

  const selectors = '.btn, .feature-card, .mini-badge, .stat, .lang-item, .eyebrow';
  function bindMagnetic() {
    document.querySelectorAll(selectors).forEach(el => {
      if (el.classList.contains('floating-panel')) return;
      el.classList.add('magnetic-hover');
      el.addEventListener('mousemove', (e) => {
        const r = el.getBoundingClientRect();
        const x = e.clientX - r.left - r.width/2;
        const y = e.clientY - r.top - r.height/2;
        el.style.transform = `translate(${x*0.06}px, ${y*0.08}px)`;
      });
      el.addEventListener('mouseleave', () => {
        el.style.transform = '';
      });
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', bindMagnetic);
  else bindMagnetic();
})();
