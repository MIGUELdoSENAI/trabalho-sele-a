/* ============================================================
   main.js — Inicializador Geral
   Ordem de carregamento: 5º e último JS
   Depende de: todos os outros módulos
============================================================ */

const App = (() => {

  /* ── Hero BG — Ken Burns ao carregar ─────────────────── */
  function initHeroBg() {
    const bg = document.getElementById('heroBg');
    if (!bg) return;
    window.addEventListener('load', () => bg.classList.add('loaded'));
  }

  /* ── Back to Top ──────────────────────────────────────── */
  function initBtt() {
    const btt = document.getElementById('btt');
    if (!btt) return;
    btt.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ── Init ─────────────────────────────────────────────── */
  function init() {
    initHeroBg();
    initBtt();
    console.log('🇧🇷 Seleção Brasileira — site iniciado com sucesso!');
  }

  // Aguarda DOM pronto
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  return { init };

})();