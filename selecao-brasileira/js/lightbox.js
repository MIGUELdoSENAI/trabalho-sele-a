/* ============================================================
   lightbox.js — Galeria Navegável
   Ordem de carregamento: 4º JS
   Depende de: Bootstrap (modal)
============================================================ */

const Lightbox = (() => {

  const ITEMS   = [...document.querySelectorAll('.gi[data-img]')];
  const MODAL_EL = document.getElementById('lightboxModal');

  if (!ITEMS.length || !MODAL_EL) return { init: () => {} };

  const MODAL   = new bootstrap.Modal(MODAL_EL);
  const IMG     = document.getElementById('lbImg');
  const CAPTION = document.getElementById('lbCaption');
  const COUNTER = document.getElementById('lbCounter');
  const BTN_PREV = document.getElementById('lbPrev');
  const BTN_NEXT = document.getElementById('lbNext');

  let current = 0;

  /* ── Mostra item pelo índice ──────────────────────────── */
  function show(index) {
    current = (index + ITEMS.length) % ITEMS.length;
    const el = ITEMS[current];

    IMG.src            = el.dataset.img;
    IMG.alt            = el.dataset.cap || '';
    CAPTION.textContent = el.dataset.cap || '';
    COUNTER.textContent = `${current + 1} / ${ITEMS.length}`;
  }

  /* ── Navegação por teclado ────────────────────────────── */
  function onKeyDown(e) {
    if (!MODAL_EL.classList.contains('show')) return;
    if (e.key === 'ArrowLeft')  show(current - 1);
    if (e.key === 'ArrowRight') show(current + 1);
    if (e.key === 'Escape')     MODAL.hide();
  }

  function init() {
    // Abrir ao clicar em item
    ITEMS.forEach((el, i) => {
      el.addEventListener('click', () => {
        show(i);
        MODAL.show();
      });
    });

    // Botões prev / next
    BTN_PREV?.addEventListener('click', () => show(current - 1));
    BTN_NEXT?.addEventListener('click', () => show(current + 1));

    // Teclado
    document.addEventListener('keydown', onKeyDown);
  }

  return { init };

})();

Lightbox.init();