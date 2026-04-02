/* ============================================================
   theme.js — Dark / Light Mode
   Ordem de carregamento: 1º JS
   Depende de: variables.css
============================================================ */

const Theme = (() => {

  const HTML  = document.documentElement;
  const BTN   = document.getElementById('themeBtn');
  const ICON  = document.getElementById('themeIcon');

  const ICONS = {
    dark:  'bi bi-moon-stars-fill',
    light: 'bi bi-sun-fill'
  };

  function apply(theme) {
    HTML.dataset.theme = theme;
    if (ICON) ICON.className = ICONS[theme];
    localStorage.setItem('theme', theme);
  }

  function toggle() {
    apply(HTML.dataset.theme === 'light' ? 'dark' : 'light');
  }

  function init() {
    // Carrega tema salvo ou usa dark como padrão
    const saved = localStorage.getItem('theme') || 'dark';
    apply(saved);
    BTN?.addEventListener('click', toggle);
  }

  return { init };

})();

Theme.init();