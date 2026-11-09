// =========================================================
// menu.js — общий скрипт для всех страниц (КР №3)
// 1) мобильное меню-бургер;
// 2) сворачиваемый фильтр каталога (только на catalog.html).
// Без JavaScript сайт тоже работает: меню показано списком,
// а фильтр раскрыт (атрибут open в разметке).
// =========================================================

// ---------- 1. Мобильное меню ----------

const navToggle = document.querySelector('.site-nav__toggle');
const siteNav = document.querySelector('.site-nav');

// Медиазапрос, совпадающий с responsive.css: от 768px меню всегда видно.
const tabletQuery = window.matchMedia('(min-width: 768px)');

function setMenuOpen(isOpen) {
  siteNav.classList.toggle('site-nav--open', isOpen);
  // aria-expanded сообщает скринридеру, раскрыто ли меню.
  navToggle.setAttribute('aria-expanded', String(isOpen));
  navToggle.querySelector('.site-nav__toggle-text').textContent = isOpen ? 'Закрыть' : 'Меню';
}

if (navToggle && siteNav) {
  navToggle.addEventListener('click', () => {
    const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
    setMenuOpen(!isOpen);

    // При открытии переводим фокус на первый пункт меню.
    if (!isOpen) {
      siteNav.querySelector('.site-nav__link').focus();
    }
  });

  // Esc закрывает меню и возвращает фокус на кнопку.
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && siteNav.classList.contains('site-nav--open')) {
      setMenuOpen(false);
      navToggle.focus();
    }
  });

  // Клик мимо шапки закрывает меню.
  document.addEventListener('click', (event) => {
    if (!event.target.closest('.site-header') && siteNav.classList.contains('site-nav--open')) {
      setMenuOpen(false);
    }
  });

  // Переход по якорной ссылке (#popular и т.п.) — меню закрываем.
  siteNav.addEventListener('click', (event) => {
    if (event.target.closest('.site-nav__link')) {
      setMenuOpen(false);
    }
  });

  // При повороте телефона/расширении окна до планшета сбрасываем состояние.
  tabletQuery.addEventListener('change', () => setMenuOpen(false));
}

// ---------- 2. Фильтр каталога ----------

const filters = document.querySelector('.catalog-filters');

// От 1024px фильтр стоит сбоку и всегда раскрыт (как в responsive.css).
const desktopQuery = window.matchMedia('(min-width: 1024px)');

if (filters) {
  // На телефоне/планшете при загрузке сворачиваем, на desktop — раскрываем.
  const syncFilters = () => {
    filters.open = desktopQuery.matches;
  };

  syncFilters();
  desktopQuery.addEventListener('change', syncFilters);

  // На desktop не даём случайно свернуть боковой фильтр.
  filters.querySelector('summary').addEventListener('click', (event) => {
    if (desktopQuery.matches) {
      event.preventDefault();
    }
  });
}
