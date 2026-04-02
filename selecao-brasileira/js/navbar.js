/* ============================================================
   navbar.js — Scroll, Link Ativo, Mobile
   Ordem de carregamento: 2º JS
   Depende de: Bootstrap (collapse)
============================================================ */

const Navbar = (() => {

  const NAV      = document.getElementById('nav');
  const LINKS    = [...document.querySelectorAll('.nl')];
  const SECTIONS = [...document.querySelectorAll('section[id]')];
  const COLLAPSE = document.getElementById('navContent');

  /* ── Scrolled state + BTT ─────────────────────────────── */
  function onScroll() {
    const y = window.scrollY;
    NAV?.classList.toggle('scrolled', y > 55);
    document.getElementById('btt')?.classList.toggle('on', y > 380);
  }

  /* ── Link ativo por seção visível ─────────────────────── */
  function initActiveLink() {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        LINKS.forEach(a => {
          a.classList.toggle(
            'active',
            a.getAttribute('href') === `#${e.target.id}`
          );
        });
      });
    }, { threshold: 0.35 });

    SECTIONS.forEach(s => obs.observe(s));
  }

  /* ── Fechar menu mobile ao clicar em link ──────────────── */
  function initMobileClose() {
    LINKS.forEach(a => {
      a.addEventListener('click', () => {
        if (COLLAPSE?.classList.contains('show')) {
          bootstrap.Collapse.getInstance(COLLAPSE)?.hide();
        }
      });
    });
  }

  function init() {
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // estado inicial
    initActiveLink();
    initMobileClose();
  }

  return { init };

})();

Navbar.init();