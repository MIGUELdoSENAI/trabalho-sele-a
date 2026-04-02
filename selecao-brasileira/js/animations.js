/* ============================================================
   animations.js — Scroll Reveal, Contadores, Marquee
   Ordem de carregamento: 3º JS
   Depende de: —
============================================================ */

const Animations = (() => {

  /* ── Scroll Reveal ────────────────────────────────────── */
  function initReveal() {
    const els = document.querySelectorAll('.rv, .rv-l, .rv-r');
    if (!els.length) return;

    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('on');
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.08 });

    els.forEach(el => obs.observe(el));
  }

  /* ── Contadores Animados ──────────────────────────────── */
  function runCounter(el) {
    const target = parseInt(el.dataset.target, 10);
    if (!target) return;

    const duration = 1600;
    const interval = 1000 / 60;         // 60fps
    const steps    = duration / interval;
    const increment = target / steps;
    let current = 0;

    const tick = () => {
      current = Math.min(current + increment, target);
      el.textContent = Math.floor(current).toLocaleString('pt-BR');
      if (current < target) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }

  function initCounters() {
    const els = document.querySelectorAll('.counter[data-target]');
    if (!els.length) return;

    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          runCounter(e.target);
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.5 });

    els.forEach(el => obs.observe(el));
  }

  /* ── Marquee — duplica para loop perfeito ─────────────── */
  function initMarquee() {
    const track = document.getElementById('marqueeTrack');
    if (!track) return;
    // Duplica o HTML original para o loop nunca ter gaps
    track.innerHTML += track.innerHTML;
  }

  function init() {
    initReveal();
    initCounters();
    initMarquee();
  }

  return { init };

})();

Animations.init();