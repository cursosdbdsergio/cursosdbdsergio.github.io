/* =========================================================
   MINI NUBE · Boutique de moda infantil
   Lógica de la página (JavaScript puro, sin dependencias)
   Índice:
   1. Configuración y datos (productos, claves, idiomas)
   2. Utilidades y estado
   3. Tema claro/oscuro
   4. Idioma (archivos JSON en /locales)
   5. Cabecera, scroll y navegación
   6. Menú hamburguesa
   7. Modales
   8. Buscador con resaltado
   9. Tienda (filtros y productos)
   10. Carrito
   11. Checkout, pago y confirmación
   12. Formulario de contacto
   13. Animaciones de aparición y contadores
   14. Eventos globales e inicio
   ========================================================= */
'use strict';

/* ---------------------------------------------------------
   1. CONFIGURACIÓN Y DATOS
   --------------------------------------------------------- */
const CONFIG = {
  freeShippingFrom: 60,      // Envío gratis a partir de este importe (€)
  shippingCost: 4.9,         // Coste del envío a domicilio (€)
  maxQuantityPerItem: 10,    // Máximo de unidades por prenda y talla
  maxPickupDays: 30,         // Días máximos de antelación para reservar la recogida
  minSearchLength: 2,        // Mínimo de letras para buscar
  maxSearchResults: 20,      // Resultados listados en el buscador
  promoCodes: { MININUBE10: 0.1 } // Códigos promocionales (porcentaje de descuento)
};

const STORAGE_KEYS = {
  theme: 'mininube-theme',
  lang: 'mininube-lang',
  cart: 'mininube-cart',
  lastOrder: 'mininube-last-order'
};

/*
 * IDIOMAS DISPONIBLES
 * Cada idioma tiene su archivo en locales/<código>.json (claves planas "sección.clave": "texto").
 * Para añadir un idioma: crear locales/<código>.json, registrarlo aquí y añadir su botón en el HTML.
 */
const LANGUAGES = {
  es: { locale: 'es-ES', htmlLang: 'es' },
  en: { locale: 'en-GB', htmlLang: 'en' },
  va: { locale: 'ca-ES', htmlLang: 'ca-valencia' }
};
const DEFAULT_LANGUAGE = 'es';
const LOCALES_PATH = 'locales';
const LANGUAGE_LOAD_ERROR = 'No se pudo cargar el idioma. Abre la web desde un servidor (http://).';

/* Tallas disponibles según el tipo de prenda */
const SIZE_SETS = {
  years: ['2', '4', '6', '8', '10'],
  months: ['0-3', '3-6', '6-12', '12-18'],
  shoe: ['22', '23', '24', '25', '26', '27'],
  babyShoe: ['17', '18', '19', '20'],
  one: ['one']
};

/*
 * Catálogo: 20 productos (las fotos se sustituirán por las del cliente).
 * Los nombres están en los JSON de idioma con la clave "product.<id>".
 */
const PRODUCTS = [
  { id: 'p01', category: 'girl', photo: 18476125, price: 29.95, isNew: true, sizeSet: 'years' },
  { id: 'p02', category: 'girl', photo: 37101826, price: 26.9, sizeSet: 'years' },
  { id: 'p03', category: 'girl', photo: 9627809, price: 39.9, oldPrice: 49.9, sizeSet: 'years' },
  { id: 'p04', category: 'girl', photo: 6349546, price: 24.5, sizeSet: 'years' },
  { id: 'p05', category: 'boy', photo: 31977204, price: 44.9, isNew: true, sizeSet: 'years' },
  { id: 'p06', category: 'boy', photo: 5486883, price: 12.9, sizeSet: 'years' },
  { id: 'p07', category: 'boy', photo: 30690920, price: 49.9, sizeSet: 'years' },
  { id: 'p08', category: 'boy', photo: 29247734, price: 15.9, sizeSet: 'years' },
  { id: 'p09', category: 'boy', photo: 6261906, price: 27.9, oldPrice: 34.9, sizeSet: 'years' },
  { id: 'p10', category: 'boy', photo: 38778553, price: 22.9, sizeSet: 'years' },
  { id: 'p11', category: 'baby', photo: 38543840, price: 32, sizeSet: 'months' },
  { id: 'p12', category: 'baby', photo: 32410090, price: 19.9, sizeSet: 'months' },
  { id: 'p13', category: 'baby', photo: 32890742, price: 28.9, isNew: true, sizeSet: 'months' },
  { id: 'p14', category: 'baby', photo: 14788988, price: 34.9, sizeSet: 'months' },
  { id: 'p15', category: 'baby', photo: 7566261, price: 14.9, sizeSet: 'months' },
  { id: 'p16', category: 'extras', photo: 4987523, price: 34.9, sizeSet: 'shoe' },
  { id: 'p17', category: 'extras', photo: 30395128, price: 39.9, oldPrice: 49.9, sizeSet: 'shoe' },
  { id: 'p18', category: 'extras', photo: 22484673, price: 24.9, sizeSet: 'babyShoe' },
  { id: 'p19', category: 'extras', photo: 9393048, price: 11.9, sizeSet: 'one' },
  { id: 'p20', category: 'extras', photo: 2869315, price: 9.9, sizeSet: 'one' }
];

/* ---------------------------------------------------------
   2. UTILIDADES Y ESTADO
   --------------------------------------------------------- */
const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

const state = {
  lang: DEFAULT_LANGUAGE,
  requestedLang: DEFAULT_LANGUAGE,
  theme: 'light',
  filter: 'all',
  sort: 'featured',
  cart: { items: [], promo: null },
  promoMessage: null,
  marks: [],
  currentMark: -1,
  activeModal: null,
  lastFocus: null,
  pendingOrder: null,
  confirmedOrder: null,
  infoType: null
};

/** Textos ya descargados, por código de idioma. */
const translationsCache = {};

const dom = {
  header: $('#siteHeader'),
  progress: $('#scrollProgress'),
  menuToggle: $('#menuToggle'),
  mobileMenu: $('#mobileMenu'),
  themeToggle: $('#themeToggle'),
  backToTop: $('#backToTop'),
  productGrid: $('#productGrid'),
  sortSelect: $('#sortSelect'),
  cartBadge: $('#cartBadge'),
  cartBody: $('#cartBody'),
  cartFooter: $('#cartFooter'),
  cartTotals: $('#cartTotals'),
  freeShipText: $('#freeShipText'),
  freeShipBar: $('#freeShipBar'),
  promoForm: $('#promoForm'),
  promoInput: $('#promoInput'),
  promoMsg: $('#promoMsg'),
  checkoutForm: $('#checkoutForm'),
  searchInput: $('#searchInput'),
  searchSummary: $('#searchSummary'),
  searchResults: $('#searchResults'),
  clearHighlights: $('#clearHighlights'),
  toastRegion: $('#toastRegion')
};

/** Devuelve el texto traducido; usa el idioma por defecto si falta la clave y sustituye {parámetros}. */
function t(key, params = {}) {
  const text = translationsCache[state.lang]?.[key] ?? translationsCache[DEFAULT_LANGUAGE]?.[key] ?? key;
  return text.replace(/\{(\w+)\}/g, (match, name) => (name in params ? params[name] : match));
}

const getProductName = (product) => t(`product.${product.id}`);

const roundMoney = (value) => Math.round(value * 100) / 100;

function formatPrice(value) {
  return new Intl.NumberFormat(LANGUAGES[state.lang].locale, { style: 'currency', currency: 'EUR' }).format(value);
}

function formatDate(isoDate) {
  const date = new Date(`${isoDate}T00:00:00`);
  return new Intl.DateTimeFormat(LANGUAGES[state.lang].locale, { weekday: 'long', day: 'numeric', month: 'long' }).format(date);
}

/** Convierte una fecha a "AAAA-MM-DD" en hora local (para input type=date). */
function toISODate(date) {
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${date.getFullYear()}-${month}-${day}`;
}

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function photoUrl(id) {
  return `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=600`;
}

function findProduct(id) {
  return PRODUCTS.find((product) => product.id === id);
}

function readStorage(key) {
  try {
    return JSON.parse(localStorage.getItem(key));
  } catch {
    return null;
  }
}

function writeStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* El almacenamiento puede estar bloqueado (modo privado): la web sigue funcionando. */
  }
}

function showToast(message) {
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  dom.toastRegion.append(toast);
  setTimeout(() => toast.remove(), 3300);
}

/* ---------------------------------------------------------
   3. TEMA CLARO / OSCURO
   --------------------------------------------------------- */
function applyTheme(theme) {
  state.theme = theme;
  document.body.classList.remove('theme-light', 'theme-dark');
  document.body.classList.add(`theme-${theme}`);
  dom.themeToggle.setAttribute('aria-pressed', String(theme === 'dark'));
  writeStorage(STORAGE_KEYS.theme, theme);
}

function toggleTheme() {
  applyTheme(state.theme === 'dark' ? 'light' : 'dark');
}

function getInitialTheme() {
  const saved = readStorage(STORAGE_KEYS.theme);
  if (saved === 'light' || saved === 'dark') return saved;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

/* ---------------------------------------------------------
   4. IDIOMA (archivos JSON en /locales)
   --------------------------------------------------------- */

/** Descarga locales/<lang>.json una sola vez y lo guarda en caché. */
async function loadTranslations(lang) {
  if (translationsCache[lang]) return translationsCache[lang];
  const response = await fetch(`${LOCALES_PATH}/${lang}.json`);
  if (!response.ok) throw new Error(`HTTP ${response.status} al cargar ${lang}.json`);
  translationsCache[lang] = await response.json();
  return translationsCache[lang];
}

/** Pinta en la página todos los textos del idioma ya cargado. */
function applyLanguage(lang) {
  clearSearchHighlights();
  state.lang = lang;
  writeStorage(STORAGE_KEYS.lang, lang);
  document.documentElement.lang = LANGUAGES[lang].htmlLang;
  document.title = t('meta.title');

  $$('[data-i18n]').forEach((el) => { el.textContent = t(el.dataset.i18n); });
  $$('[data-i18n-placeholder]').forEach((el) => { el.placeholder = t(el.dataset.i18nPlaceholder); });
  $$('[data-i18n-aria]').forEach((el) => { el.setAttribute('aria-label', t(el.dataset.i18nAria)); });
  $$('[data-i18n-alt]').forEach((el) => { el.alt = t(el.dataset.i18nAlt); });
  $$('.field__error[data-error-key]').forEach((el) => { if (el.dataset.errorKey) el.textContent = t(el.dataset.errorKey); });
  $$('[data-lang]').forEach((btn) => btn.setAttribute('aria-pressed', String(btn.dataset.lang === lang)));

  renderProducts();
  renderCart();
  updateCheckoutUI();
  if (state.pendingOrder) renderPayment();
  if (state.confirmedOrder) renderConfirmation();
  if (state.infoType) renderInfo();
  if (dom.searchInput.value.trim()) runSearch();
}

/**
 * Cambia el idioma: descarga su JSON (si hace falta) y actualiza la página.
 * Si falla la descarga se mantiene el idioma actual.
 */
async function changeLanguage(lang, { announce = true } = {}) {
  if (!LANGUAGES[lang]) return;
  state.requestedLang = lang;
  try {
    await loadTranslations(lang);
    if (!translationsCache[DEFAULT_LANGUAGE]) await loadTranslations(DEFAULT_LANGUAGE).catch(() => {});
  } catch (error) {
    console.error(error);
    showToast(translationsCache[state.lang]?.['toast.langError'] ?? LANGUAGE_LOAD_ERROR);
    return;
  }
  if (state.requestedLang !== lang) return; // El usuario pidió otro idioma mientras cargaba
  applyLanguage(lang);
  if (announce) showToast(t('toast.langChanged'));
}

/* ---------------------------------------------------------
   5. CABECERA, SCROLL Y NAVEGACIÓN
   --------------------------------------------------------- */
let scrollTicking = false;

function getNavbarHeight() {
  return $('.navbar', dom.header).offsetHeight;
}

/** Desplaza suavemente hasta un elemento descontando la cabecera fija. */
function scrollToElement(element, { center = false } = {}) {
  const rect = element.getBoundingClientRect();
  let top = rect.top + window.scrollY;
  if (center) top -= (window.innerHeight - rect.height) / 2;
  else if (element.id !== 'inicio') top -= getNavbarHeight();
  window.scrollTo({ top: Math.max(0, top), behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
}

function updateActiveNavLink() {
  const sections = $$('main > section[id]');
  const position = window.scrollY + getNavbarHeight() + window.innerHeight * 0.3;
  const current = sections.filter((section) => section.offsetTop <= position).pop() || sections[0];
  $$('.main-nav a, .mobile-menu__list a').forEach((link) => {
    link.classList.toggle('is-active', link.getAttribute('href') === `#${current.id}`);
  });
}

function handleScroll() {
  const scrolled = window.scrollY;
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  dom.header.classList.toggle('is-scrolled', scrolled > 24);
  dom.progress.style.transform = `scaleX(${scrollable > 0 ? Math.min(scrolled / scrollable, 1) : 0})`;
  dom.backToTop.classList.toggle('is-visible', scrolled > 600);
  updateActiveNavLink();
  scrollTicking = false;
}

function onScroll() {
  if (scrollTicking) return;
  scrollTicking = true;
  requestAnimationFrame(handleScroll);
}

/** Enlaces internos: scroll suave. Los enlaces de categoría también filtran la tienda. */
function handleAnchorClick(event, target) {
  const filterLink = target.closest('[data-filter-link]');
  if (filterLink) setFilter(filterLink.dataset.filterLink);

  const anchor = target.closest('a[href^="#"]');
  const hash = anchor ? anchor.getAttribute('href') : '';
  if (hash.length < 2) return;
  const destination = document.getElementById(hash.slice(1));
  if (!destination) return;
  event.preventDefault();
  closeMobileMenu();
  scrollToElement(destination);
  history.replaceState(null, '', hash);
}

/* ---------------------------------------------------------
   6. MENÚ HAMBURGUESA
   --------------------------------------------------------- */
function setMobileMenu(open) {
  dom.mobileMenu.classList.toggle('is-open', open);
  dom.mobileMenu.setAttribute('aria-hidden', String(!open));
  dom.mobileMenu.inert = !open;
  dom.menuToggle.classList.toggle('is-active', open);
  dom.menuToggle.setAttribute('aria-expanded', String(open));
}

const isMobileMenuOpen = () => dom.mobileMenu.classList.contains('is-open');
const closeMobileMenu = () => setMobileMenu(false);

/* ---------------------------------------------------------
   7. MODALES
   --------------------------------------------------------- */
const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

function setModalVisibility(modal, open) {
  modal.classList.toggle('is-open', open);
  modal.setAttribute('aria-hidden', String(!open));
  modal.inert = !open;
}

function openModal(id) {
  const modal = document.getElementById(id);
  if (!modal) return;
  closeMobileMenu();
  if (state.activeModal && state.activeModal !== modal) {
    setModalVisibility(state.activeModal, false);
  } else if (!state.activeModal) {
    state.lastFocus = document.activeElement;
  }
  state.activeModal = modal;
  setModalVisibility(modal, true);
  document.body.classList.add('no-scroll');
  setTimeout(() => {
    const target = id === 'searchModal' ? dom.searchInput : $('.modal__dialog', modal);
    target.focus({ preventScroll: true });
  }, 60);
}

function closeActiveModal() {
  const modal = state.activeModal;
  if (!modal) return;
  setModalVisibility(modal, false);
  state.activeModal = null;
  document.body.classList.remove('no-scroll');
  if (modal.id === 'infoModal') state.infoType = null;
  if (state.lastFocus && document.contains(state.lastFocus)) state.lastFocus.focus({ preventScroll: true });
}

/** Mantiene el foco del teclado dentro del modal abierto. */
function trapFocus(event) {
  const focusables = $$(FOCUSABLE, state.activeModal).filter((el) => el.offsetParent !== null);
  if (!focusables.length) return;
  const first = focusables[0];
  const last = focusables[focusables.length - 1];
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
}

function openInfo(type) {
  state.infoType = type;
  renderInfo();
  openModal('infoModal');
}

function renderInfo() {
  $('#infoTitle').textContent = t(`foot.${state.infoType}`);
  $('#infoBody').textContent = t(`info.${state.infoType}`);
}

/* ---------------------------------------------------------
   8. BUSCADOR CON RESALTADO
   --------------------------------------------------------- */
const SEARCH_SKIP_TAGS = new Set(['SCRIPT', 'STYLE', 'OPTION', 'SELECT', 'TEXTAREA', 'NOSCRIPT', 'MARK']);

/** Pasa a minúsculas y sin acentos conservando la longitud del texto original. */
function foldText(text) {
  return text.split('').map((char) => char.normalize('NFD').charAt(0).toLowerCase()).join('');
}

function clearSearchHighlights() {
  state.marks.forEach((mark) => {
    const parent = mark.parentNode;
    if (!parent) return;
    mark.replaceWith(document.createTextNode(mark.textContent));
    parent.normalize();
  });
  state.marks = [];
  state.currentMark = -1;
  dom.searchResults.replaceChildren();
  dom.clearHighlights.hidden = true;
}

/** Recorre el texto de main y footer envolviendo las coincidencias en <mark>. */
function highlightMatches(query) {
  const needle = foldText(query);
  const marks = [];

  $$('main, footer').forEach((root) => {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        const parent = node.parentElement;
        if (!parent || SEARCH_SKIP_TAGS.has(parent.tagName) || parent.closest('[hidden]') || !node.nodeValue.trim()) {
          return NodeFilter.FILTER_REJECT;
        }
        return foldText(node.nodeValue).includes(needle) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
      }
    });
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);

    nodes.forEach((node) => {
      const text = node.nodeValue;
      const folded = foldText(text);
      const fragment = document.createDocumentFragment();
      let cursor = 0;
      let index = folded.indexOf(needle, cursor);
      while (index !== -1) {
        fragment.append(text.slice(cursor, index));
        const mark = document.createElement('mark');
        mark.className = 'search-highlight';
        mark.textContent = text.slice(index, index + needle.length);
        fragment.append(mark);
        marks.push(mark);
        cursor = index + needle.length;
        index = folded.indexOf(needle, cursor);
      }
      fragment.append(text.slice(cursor));
      node.replaceWith(fragment);
    });
  });
  return marks;
}

function getSectionLabel(mark) {
  const holder = mark.closest('section[id], footer');
  if (!holder) return '';
  if (holder.tagName === 'FOOTER') return t('search.footer');
  const link = $(`.main-nav a[href="#${holder.id}"]`);
  return link ? link.textContent : '';
}

/** Construye un fragmento de texto alrededor de la coincidencia. */
function buildSnippet(mark, query) {
  const full = mark.parentElement.textContent.replace(/\s+/g, ' ').trim();
  const index = Math.max(foldText(full).indexOf(foldText(query)), 0);
  const start = Math.max(0, index - 28);
  const end = Math.min(full.length, index + query.length + 48);
  const span = document.createElement('span');
  span.className = 'search-result__text';
  const strong = document.createElement('strong');
  strong.textContent = full.slice(index, index + query.length);
  span.append(`${start > 0 ? '…' : ''}${full.slice(start, index)}`, strong, `${full.slice(index + query.length, end)}${end < full.length ? '…' : ''}`);
  return span;
}

function runSearch() {
  clearSearchHighlights();
  const query = dom.searchInput.value.trim();

  if (query.length < CONFIG.minSearchLength) {
    dom.searchSummary.textContent = t('search.hint');
    return;
  }

  state.marks = highlightMatches(query);
  dom.clearHighlights.hidden = state.marks.length === 0;
  dom.searchSummary.textContent = state.marks.length
    ? t('search.count', { n: state.marks.length })
    : t('search.none', { q: query });

  state.marks.slice(0, CONFIG.maxSearchResults).forEach((mark, index) => {
    const item = document.createElement('li');
    const button = document.createElement('button');
    const section = document.createElement('span');
    button.type = 'button';
    button.dataset.markIndex = index;
    section.className = 'search-result__section';
    section.textContent = getSectionLabel(mark);
    button.append(section, buildSnippet(mark, query));
    item.append(button);
    dom.searchResults.append(item);
  });
}

function goToMark(index) {
  const mark = state.marks[index];
  if (!mark) return;
  state.marks.forEach((item) => item.classList.remove('is-current'));
  mark.classList.add('is-current');
  state.currentMark = index;
  closeActiveModal();
  scrollToElement(mark, { center: true });
}

function resetSearch() {
  dom.searchInput.value = '';
  runSearch();
  dom.searchInput.focus();
}

/* ---------------------------------------------------------
   9. TIENDA (FILTROS Y PRODUCTOS)
   --------------------------------------------------------- */
function getSizeLabel(sizeSet, size) {
  if (sizeSet === 'one') return t('size.one');
  if (sizeSet === 'years') return t('size.years', { s: size });
  if (sizeSet === 'months') return t('size.months', { s: size });
  return t('size.shoe', { s: size });
}

function getVisibleProducts() {
  const list = PRODUCTS.filter((product) => state.filter === 'all' || product.category === state.filter);
  const sorters = {
    featured: () => 0,
    priceAsc: (a, b) => a.price - b.price,
    priceDesc: (a, b) => b.price - a.price,
    name: (a, b) => getProductName(a).localeCompare(getProductName(b), LANGUAGES[state.lang].locale)
  };
  return list.sort(sorters[state.sort]);
}

function productCardHTML(product, index) {
  const name = getProductName(product);
  const badge = product.oldPrice
    ? `<span class="badge badge--sale">${t('badge.sale')}</span>`
    : product.isNew ? `<span class="badge">${t('badge.new')}</span>` : '';
  const oldPrice = product.oldPrice ? `<s class="price-old">${formatPrice(product.oldPrice)}</s>` : '';
  const sizeOptions = SIZE_SETS[product.sizeSet]
    .map((size) => `<option value="${size}">${getSizeLabel(product.sizeSet, size)}</option>`).join('');

  return `
    <article class="product-card" style="--i:${index}">
      <div class="product-card__media">
        <img src="${photoUrl(product.photo)}" alt="${name}" loading="lazy" width="600" height="800">
        ${badge}
      </div>
      <div class="product-card__body">
        <p class="product-card__cat">${t(`cat.${product.category}`)}</p>
        <h3 class="product-card__name">${name}</h3>
        <div class="product-card__price"><span class="price">${formatPrice(product.price)}</span>${oldPrice}</div>
        <div class="product-card__actions">
          <select class="select" id="size-${product.id}" aria-label="${t('shop.size')}">${sizeOptions}</select>
          <button type="button" class="btn btn--primary btn--sm" data-add-to-cart="${product.id}">
            <svg class="icon" aria-hidden="true"><use href="#i-plus"/></svg>${t('shop.add')}
          </button>
        </div>
      </div>
    </article>`;
}

function renderProducts() {
  clearSearchHighlights();
  dom.productGrid.innerHTML = getVisibleProducts().map(productCardHTML).join('');
  $$('#filterChips .chip').forEach((chip) => chip.setAttribute('aria-pressed', String(chip.dataset.filter === state.filter)));
}

function setFilter(filter) {
  state.filter = filter;
  renderProducts();
}

/* ---------------------------------------------------------
   10. CARRITO
   --------------------------------------------------------- */
function saveCart() {
  writeStorage(STORAGE_KEYS.cart, state.cart);
}

/** Recupera el carrito guardado validando productos, tallas y cantidades. */
function loadCart() {
  const saved = readStorage(STORAGE_KEYS.cart);
  if (!saved || !Array.isArray(saved.items)) return;
  state.cart.items = saved.items.filter((item) => {
    const product = findProduct(item.id);
    return product && SIZE_SETS[product.sizeSet].includes(item.size) && Number.isInteger(item.qty) && item.qty > 0;
  }).map((item) => ({ ...item, qty: Math.min(item.qty, CONFIG.maxQuantityPerItem) }));
  state.cart.promo = CONFIG.promoCodes[saved.promo] ? saved.promo : null;
  if (state.cart.promo) state.promoMessage = { key: 'cart.promo.ok', type: 'ok' };
}

const cartKey = (item) => `${item.id}|${item.size}`;

/** Convierte los items del carrito en líneas con producto y total. */
function resolveLines(items) {
  return items.map((item) => {
    const product = findProduct(item.id);
    return { key: cartKey(item), product, size: item.size, qty: item.qty, lineTotal: roundMoney(product.price * item.qty) };
  });
}

const getCartLines = () => resolveLines(state.cart.items);

/** Calcula subtotal, descuento, envío y total. Sin método de entrega el envío queda pendiente. */
function calculateTotals(lines, deliveryMethod = null) {
  const subtotal = roundMoney(lines.reduce((sum, line) => sum + line.lineTotal, 0));
  const rate = CONFIG.promoCodes[state.cart.promo] || 0;
  const discount = roundMoney(subtotal * rate);
  const base = roundMoney(subtotal - discount);
  const shipping = deliveryMethod === 'delivery' && base > 0 && base < CONFIG.freeShippingFrom ? CONFIG.shippingCost : 0;
  return { subtotal, discount, base, shipping, total: roundMoney(base + shipping), deliveryMethod };
}

function totalsHTML(totals, shippingKnown) {
  const shippingValue = !shippingKnown
    ? t('cart.shippingCalc')
    : totals.shipping === 0 ? t('co.free') : formatPrice(totals.shipping);
  return `
    <div><dt>${t('cart.subtotal')}</dt><dd>${formatPrice(totals.subtotal)}</dd></div>
    ${totals.discount > 0 ? `<div class="totals__discount"><dt>${t('cart.discount')}</dt><dd>-${formatPrice(totals.discount)}</dd></div>` : ''}
    <div><dt>${t('cart.shipping')}</dt><dd>${shippingValue}</dd></div>
    <div class="totals__total"><dt>${t('cart.total')}</dt><dd>${formatPrice(totals.total)}</dd></div>`;
}

function summaryListHTML(lines) {
  return lines.map((line) => `
    <li>
      <img src="${photoUrl(line.product.photo)}" alt="">
      <span>${getProductName(line.product)}<small>${getSizeLabel(line.product.sizeSet, line.size)} × ${line.qty}</small></span>
      <strong>${formatPrice(line.lineTotal)}</strong>
    </li>`).join('');
}

function cartItemHTML(line) {
  const name = getProductName(line.product);
  const atMax = line.qty >= CONFIG.maxQuantityPerItem;
  return `
    <article class="cart-item" data-key="${line.key}">
      <img src="${photoUrl(line.product.photo)}" alt="${name}" width="72" height="96">
      <div class="cart-item__info">
        <div class="cart-item__top">
          <h3 class="cart-item__name">${name}</h3>
          <button type="button" class="cart-item__remove" data-cart-action="remove" aria-label="${t('cart.remove')}">
            <svg class="icon" aria-hidden="true"><use href="#i-trash"/></svg>
          </button>
        </div>
        <p class="cart-item__size">${t('shop.size')}: ${getSizeLabel(line.product.sizeSet, line.size)}</p>
        <div class="cart-item__bottom">
          <div class="qty">
            <button type="button" data-cart-action="dec" aria-label="${t('cart.dec')}"><svg class="icon" aria-hidden="true"><use href="#i-minus"/></svg></button>
            <span aria-live="polite">${line.qty}</span>
            <button type="button" data-cart-action="inc" aria-label="${t('cart.inc')}" ${atMax ? 'disabled' : ''}><svg class="icon" aria-hidden="true"><use href="#i-plus"/></svg></button>
          </div>
          <span class="cart-item__price">${formatPrice(line.lineTotal)}</span>
        </div>
      </div>
    </article>`;
}

function renderCart() {
  const lines = getCartLines();
  const count = lines.reduce((sum, line) => sum + line.qty, 0);
  const isEmpty = lines.length === 0;

  dom.cartBadge.textContent = count;
  dom.cartBadge.hidden = isEmpty;
  dom.cartFooter.hidden = isEmpty;

  if (isEmpty) {
    dom.cartBody.innerHTML = `
      <div class="cart-empty">
        <svg class="icon" aria-hidden="true"><use href="#i-bag"/></svg>
        <p>${t('cart.empty')}</p>
        <a class="btn btn--primary" href="#tienda" data-close-modal>${t('cart.emptyCta')}</a>
      </div>`;
    return;
  }

  const totals = calculateTotals(lines);
  dom.cartBody.innerHTML = lines.map(cartItemHTML).join('');
  dom.cartTotals.innerHTML = totalsHTML(totals, false);

  const remaining = roundMoney(CONFIG.freeShippingFrom - totals.base);
  dom.freeShipText.textContent = remaining > 0 ? t('cart.freeShip.left', { amount: formatPrice(remaining) }) : t('cart.freeShip.done');
  dom.freeShipBar.style.width = `${Math.min(100, (totals.base / CONFIG.freeShippingFrom) * 100)}%`;

  const message = state.promoMessage;
  dom.promoMsg.textContent = message ? t(message.key, { pct: Math.round((CONFIG.promoCodes[state.cart.promo] || 0) * 100) }) : '';
  dom.promoMsg.className = `promo__msg${message ? ` is-${message.type}` : ''}`;

  renderCheckoutSummary();
}

function bumpCartBadge() {
  dom.cartBadge.classList.remove('is-bumped');
  void dom.cartBadge.offsetWidth; // Reinicia la animación
  dom.cartBadge.classList.add('is-bumped');
}

function addToCart(productId, size) {
  const product = findProduct(productId);
  if (!product) return;
  const existing = state.cart.items.find((item) => item.id === productId && item.size === size);
  if (existing) {
    if (existing.qty >= CONFIG.maxQuantityPerItem) {
      showToast(t('cart.max', { n: CONFIG.maxQuantityPerItem }));
      return;
    }
    existing.qty += 1;
  } else {
    state.cart.items.push({ id: productId, size, qty: 1 });
  }
  saveCart();
  renderCart();
  bumpCartBadge();
  showToast(t('shop.added', { name: getProductName(product) }));
}

function changeCartQuantity(key, delta) {
  const item = state.cart.items.find((entry) => cartKey(entry) === key);
  if (!item) return;
  const next = item.qty + delta;
  if (next > CONFIG.maxQuantityPerItem) {
    showToast(t('cart.max', { n: CONFIG.maxQuantityPerItem }));
    return;
  }
  if (next < 1) {
    removeFromCart(key);
    return;
  }
  item.qty = next;
  saveCart();
  renderCart();
}

function removeFromCart(key) {
  state.cart.items = state.cart.items.filter((item) => cartKey(item) !== key);
  if (!state.cart.items.length) resetPromo();
  saveCart();
  renderCart();
  showToast(t('cart.removed'));
}

function resetPromo() {
  state.cart.promo = null;
  state.promoMessage = null;
  dom.promoInput.value = '';
}

function emptyCart({ silent = false } = {}) {
  state.cart.items = [];
  resetPromo();
  saveCart();
  renderCart();
  if (!silent) showToast(t('cart.cleared'));
}

function applyPromoCode(rawCode) {
  const code = rawCode.trim().toUpperCase();
  if (!code) {
    const hadPromo = Boolean(state.cart.promo);
    resetPromo();
    state.promoMessage = hadPromo ? { key: 'cart.promo.removed', type: 'ok' } : null;
  } else if (CONFIG.promoCodes[code]) {
    state.cart.promo = code;
    state.promoMessage = { key: 'cart.promo.ok', type: 'ok' };
  } else {
    state.promoMessage = { key: 'cart.promo.bad', type: 'error' };
  }
  saveCart();
  renderCart();
}

function handleCartAction(button) {
  const key = button.closest('.cart-item').dataset.key;
  const action = button.dataset.cartAction;
  if (action === 'inc') changeCartQuantity(key, 1);
  if (action === 'dec') changeCartQuantity(key, -1);
  if (action === 'remove') removeFromCart(key);
}

/* ---------------------------------------------------------
   11. CHECKOUT, PAGO Y CONFIRMACIÓN
   --------------------------------------------------------- */
const getCheckoutField = (name) => dom.checkoutForm.elements[name];
const getDeliveryMethod = () => getCheckoutField('deliveryMethod').value;
const getPaymentMethod = () => getCheckoutField('paymentMethod').value;

const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
const isValidPhone = (value) => /^\+?[\d\s().-]{9,}$/.test(value.trim());

/** Muestra u oculta el error de un campo. */
function setFieldError(input, errorKey) {
  const field = input.closest('.field');
  if (!field) return;
  const error = $('.field__error', field);
  field.classList.toggle('has-error', Boolean(errorKey));
  input.setAttribute('aria-invalid', String(Boolean(errorKey)));
  error.dataset.errorKey = errorKey;
  error.textContent = errorKey ? t(errorKey) : '';
}

/** Valida una lista de [campo, función de validación, clave de error]. Devuelve true si todo es correcto. */
function validateFields(checks) {
  let firstInvalid = null;
  checks.forEach(([input, isValid, errorKey]) => {
    const ok = input.type === 'checkbox' ? input.checked : isValid(input.value);
    setFieldError(input, ok ? '' : errorKey);
    if (!ok && !firstInvalid) firstInvalid = input;
  });
  if (firstInvalid) firstInvalid.focus();
  return !firstInvalid;
}

/** Fechas de recogida permitidas: de mañana a 30 días, de lunes a sábado. */
function getPickupDateRange() {
  const min = new Date();
  min.setHours(0, 0, 0, 0);
  min.setDate(min.getDate() + 1);
  const max = new Date(min);
  max.setDate(max.getDate() + CONFIG.maxPickupDays);
  return { min, max };
}

function isValidPickupDate(value) {
  if (!value) return false;
  const date = new Date(`${value}T00:00:00`);
  const { min, max } = getPickupDateRange();
  return !Number.isNaN(date.getTime()) && date >= min && date <= max && date.getDay() !== 0;
}

function setPickupDateDefaults() {
  const input = getCheckoutField('pickupDate');
  const { min, max } = getPickupDateRange();
  const first = new Date(min);
  if (first.getDay() === 0) first.setDate(first.getDate() + 1);
  input.min = toISODate(min);
  input.max = toISODate(max);
  input.value = toISODate(first);
}

function validateCheckoutForm() {
  const isPickup = getDeliveryMethod() === 'pickup';
  const checks = [
    [getCheckoutField('fullName'), (value) => value.trim().length >= 3, 'err.name'],
    [getCheckoutField('email'), isValidEmail, 'err.email'],
    [getCheckoutField('phone'), isValidPhone, 'err.phone']
  ];
  if (isPickup) {
    checks.push([getCheckoutField('pickupDate'), isValidPickupDate, 'err.date']);
  } else {
    checks.push(
      [getCheckoutField('address'), (value) => value.trim().length >= 5, 'err.address'],
      [getCheckoutField('city'), (value) => value.trim().length >= 2, 'err.city'],
      [getCheckoutField('zip'), (value) => /^\d{5}$/.test(value.trim()), 'err.zip']
    );
  }
  checks.push([getCheckoutField('terms'), null, 'err.terms']);
  return validateFields(checks);
}

/** Adapta el formulario al método de entrega y de pago elegidos. */
function updateCheckoutUI() {
  const isPickup = getDeliveryMethod() === 'pickup';
  $('#pickupFields').hidden = !isPickup;
  $('#deliveryFields').hidden = isPickup;
  ['pickupDate', 'pickupSlot'].forEach((name) => { getCheckoutField(name).disabled = !isPickup; });
  ['address', 'city', 'zip', 'deliveryNotes'].forEach((name) => { getCheckoutField(name).disabled = isPickup; });

  // Pagar al recoger solo con recogida; pagar a la entrega solo con envío
  const radios = $$('input[name="paymentMethod"]', dom.checkoutForm);
  radios.forEach((radio) => {
    if (radio.value === 'pickup') radio.disabled = !isPickup;
    if (radio.value === 'cod') radio.disabled = isPickup;
  });
  const selected = radios.find((radio) => radio.checked);
  if (!selected || selected.disabled) {
    radios.find((radio) => radio.value === (isPickup ? 'pickup' : 'cod')).checked = true;
  }

  $('#checkoutSubmit').textContent = t(getPaymentMethod() === 'online' ? 'co.submit.pay' : 'co.submit.order');
  renderCheckoutSummary();
}

function renderCheckoutSummary() {
  const lines = getCartLines();
  const totals = calculateTotals(lines, getDeliveryMethod());
  $('#checkoutItems').innerHTML = summaryListHTML(lines);
  $('#checkoutTotals').innerHTML = totalsHTML(totals, true);
}

function openCheckout() {
  if (!state.cart.items.length) {
    showToast(t('co.empty'));
    return;
  }
  openModal('checkoutModal');
}

function buildOrder() {
  const method = getDeliveryMethod();
  const lines = getCartLines();
  const isPickup = method === 'pickup';
  return {
    ref: `MN-${Date.now().toString(36).toUpperCase().slice(-6)}`,
    createdAt: new Date().toISOString(),
    customer: {
      name: getCheckoutField('fullName').value.trim(),
      email: getCheckoutField('email').value.trim(),
      phone: getCheckoutField('phone').value.trim()
    },
    delivery: isPickup
      ? { method, date: getCheckoutField('pickupDate').value, slot: getCheckoutField('pickupSlot').value }
      : {
        method,
        address: getCheckoutField('address').value.trim(),
        city: getCheckoutField('city').value.trim(),
        zip: getCheckoutField('zip').value.trim(),
        notes: getCheckoutField('deliveryNotes').value.trim()
      },
    payment: getPaymentMethod(),
    promo: state.cart.promo,
    items: state.cart.items.map((item) => ({ ...item })),
    totals: calculateTotals(lines, method)
  };
}

function submitCheckout(event) {
  event.preventDefault();
  if (!state.cart.items.length || !validateCheckoutForm()) return;
  const order = buildOrder();
  if (order.payment === 'online') {
    state.pendingOrder = order;
    renderPayment();
    openModal('paymentModal');
  } else {
    finalizeOrder(order);
  }
}

/** Ventana con el detalle de lo que se va a pagar online. */
function renderPayment() {
  const order = state.pendingOrder;
  $('#paymentRef').textContent = order.ref;
  $('#paymentItems').innerHTML = summaryListHTML(resolveLines(order.items));
  $('#paymentTotals').innerHTML = totalsHTML(order.totals, true);
  $('#paymentAmount').textContent = formatPrice(order.totals.total);
  $('#paymentPay').textContent = t('pm.pay', { amount: formatPrice(order.totals.total) });
  $('#paymentStatus').textContent = '';
}

/*
 * PUNTO DE INTEGRACIÓN DE LA PASARELA DE PAGO
 * 1. Al pulsar "Pagar" se lanza el evento cancelable "payment:request" con { order } en detail.
 *    Quien integre la pasarela debe escucharlo y llamar a event.preventDefault().
 * 2. Cuando la pasarela confirme el cobro, lanzar document.dispatchEvent(new CustomEvent('payment:success'))
 *    para cerrar el pedido y mostrar la confirmación.
 * El contenedor #paymentGatewayMount está reservado para montar el formulario de la pasarela.
 */
function requestOnlinePayment() {
  const requestEvent = new CustomEvent('payment:request', { detail: { order: state.pendingOrder }, cancelable: true });
  const notHandled = document.dispatchEvent(requestEvent);
  if (notHandled) $('#paymentStatus').textContent = t('pm.pending');
}

function finalizeOrder(order) {
  state.pendingOrder = null;
  state.confirmedOrder = order;
  writeStorage(STORAGE_KEYS.lastOrder, order);
  emptyCart({ silent: true });
  dom.checkoutForm.reset();
  $$('.field.has-error', dom.checkoutForm).forEach((field) => setFieldError($('input, textarea', field), ''));
  setPickupDateDefaults();
  updateCheckoutUI();
  renderConfirmation();
  openModal('confirmModal');
}

function renderConfirmation() {
  const order = state.confirmedOrder;
  const { delivery, totals } = order;
  const placeLine = delivery.method === 'pickup'
    ? t('ok.pickup', { date: formatDate(delivery.date), slot: delivery.slot })
    : t('ok.delivery', { address: `${delivery.address}, ${delivery.zip} ${delivery.city}` });

  $('#confirmRef').textContent = order.ref;
  $('#confirmText').textContent = [
    t('ok.thanks', { name: order.customer.name }),
    placeLine,
    t(`ok.pay.${order.payment}`, { amount: formatPrice(totals.total) })
  ].join('\n');
  $('#confirmItems').innerHTML = summaryListHTML(resolveLines(order.items));
  $('#confirmTotals').innerHTML = totalsHTML(totals, true);
}

/* ---------------------------------------------------------
   12. FORMULARIO DE CONTACTO
   --------------------------------------------------------- */
function submitContactForm(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const status = $('#contactStatus');
  status.textContent = '';
  const isValid = validateFields([
    [form.elements.namedItem('name'), (value) => value.trim().length >= 2, 'err.name'],
    [form.elements.namedItem('email'), isValidEmail, 'err.email'],
    [form.elements.namedItem('message'), (value) => value.trim().length >= 5, 'err.message'],
    [form.elements.namedItem('privacy'), null, 'err.privacy']
  ]);
  if (!isValid) return;
  // El envío real al servidor se conectará aquí; de momento se confirma en la propia página.
  form.reset();
  status.textContent = t('form.success');
}

/** Quita el mensaje de error de un campo en cuanto el usuario lo corrige. */
function clearFieldErrorOnInput(event) {
  const field = event.target.closest('.field.has-error');
  if (field) setFieldError(event.target, '');
}

/* ---------------------------------------------------------
   13. ANIMACIONES DE APARICIÓN Y CONTADORES
   --------------------------------------------------------- */
function setupRevealOnScroll() {
  const elements = $$('.reveal');
  if (!('IntersectionObserver' in window)) {
    elements.forEach((el) => el.classList.add('is-visible'));
    return;
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const element = entry.target;
      element.classList.add('is-visible');
      observer.unobserve(element);
      // Terminada la animación se libera el elemento para que sus efectos hover funcionen con normalidad
      setTimeout(() => {
        element.classList.remove('reveal', 'is-visible');
        element.style.transitionDelay = '';
      }, 1200);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  elements.forEach((el, index) => {
    el.style.transitionDelay = `${(index % 4) * 70}ms`;
    observer.observe(el);
  });
}

function animateCounter(element) {
  const target = Number(element.dataset.count);
  const suffix = element.dataset.suffix || '';
  if (prefersReducedMotion()) {
    element.textContent = `${target}${suffix}`;
    return;
  }
  const duration = 1400;
  const start = performance.now();
  const step = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    element.textContent = `${Math.round(target * eased)}${suffix}`;
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

function setupCounters() {
  const counters = $$('[data-count]');
  if (!('IntersectionObserver' in window)) {
    counters.forEach(animateCounter);
    return;
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      animateCounter(entry.target);
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.6 });
  counters.forEach((counter) => observer.observe(counter));
}

/* ---------------------------------------------------------
   14. EVENTOS GLOBALES E INICIO
   --------------------------------------------------------- */
let lastViewportWidth = window.innerWidth;

function handleDocumentClick(event) {
  const target = event.target;

  const openButton = target.closest('[data-open-modal]');
  if (openButton) {
    openModal(openButton.dataset.openModal);
    return;
  }
  if (target.closest('[data-close-modal]')) {
    closeActiveModal();
    handleAnchorClick(event, target);
    return;
  }
  if (target.classList.contains('modal')) {
    closeActiveModal();
    return;
  }

  const infoButton = target.closest('[data-info]');
  if (infoButton) return openInfo(infoButton.dataset.info);

  const langButton = target.closest('[data-lang]');
  if (langButton) return changeLanguage(langButton.dataset.lang);

  const filterChip = target.closest('.chip[data-filter]');
  if (filterChip) return setFilter(filterChip.dataset.filter);

  const addButton = target.closest('[data-add-to-cart]');
  if (addButton) {
    const select = $('select', addButton.closest('.product-card'));
    return addToCart(addButton.dataset.addToCart, select.value);
  }

  const cartButton = target.closest('[data-cart-action]');
  if (cartButton) return handleCartAction(cartButton);

  const markButton = target.closest('[data-mark-index]');
  if (markButton) return goToMark(Number(markButton.dataset.markIndex));

  handleAnchorClick(event, target);

  // Clic fuera del menú móvil: se cierra
  if (isMobileMenuOpen() && !target.closest('.mobile-menu, .hamburger')) closeMobileMenu();
}

function handleKeydown(event) {
  if (event.key === 'Escape') {
    if (state.activeModal) closeActiveModal();
    else if (isMobileMenuOpen()) closeMobileMenu();
  }
  if (event.key === 'Tab' && state.activeModal) trapFocus(event);
}

function handleResize() {
  if (window.innerWidth !== lastViewportWidth) {
    lastViewportWidth = window.innerWidth;
    closeMobileMenu();
  }
  handleScroll();
}

function bindEvents() {
  document.addEventListener('click', handleDocumentClick);
  document.addEventListener('keydown', handleKeydown);
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', handleResize);

  dom.themeToggle.addEventListener('click', toggleTheme);
  dom.menuToggle.addEventListener('click', () => setMobileMenu(!isMobileMenuOpen()));
  dom.backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? 'auto' : 'smooth' }));
  $('#userButton').addEventListener('click', () => {
    // Punto de integración del login: escuchar el evento "auth:open" para abrir el acceso de usuarios.
    document.dispatchEvent(new CustomEvent('auth:open'));
    showToast(t('toast.login'));
  });

  dom.sortSelect.addEventListener('change', () => {
    state.sort = dom.sortSelect.value;
    renderProducts();
  });

  // Buscador
  dom.searchInput.addEventListener('input', runSearch);
  $('#searchForm').addEventListener('submit', (event) => {
    event.preventDefault();
    if (state.marks.length) goToMark((state.currentMark + 1) % state.marks.length);
  });
  $('#searchClear').addEventListener('click', resetSearch);
  dom.clearHighlights.addEventListener('click', resetSearch);

  // Carrito y checkout
  dom.promoForm.addEventListener('submit', (event) => {
    event.preventDefault();
    applyPromoCode(dom.promoInput.value);
  });
  $('#checkoutButton').addEventListener('click', openCheckout);
  $('#clearCartButton').addEventListener('click', () => emptyCart());
  dom.checkoutForm.addEventListener('change', updateCheckoutUI);
  dom.checkoutForm.addEventListener('submit', submitCheckout);
  dom.checkoutForm.addEventListener('input', clearFieldErrorOnInput);
  $('#paymentPay').addEventListener('click', requestOnlinePayment);
  $('#paymentBack').addEventListener('click', () => openModal('checkoutModal'));
  document.addEventListener('payment:success', () => {
    if (state.pendingOrder) finalizeOrder(state.pendingOrder);
  });

  // Contacto
  const contactForm = $('#contactForm');
  contactForm.addEventListener('submit', submitContactForm);
  contactForm.addEventListener('input', clearFieldErrorOnInput);
}

async function init() {
  document.documentElement.classList.add('js');
  $('#currentYear').textContent = new Date().getFullYear();

  loadCart();
  applyTheme(getInitialTheme());
  bindEvents();
  setPickupDateDefaults();
  setupRevealOnScroll();
  setupCounters();
  handleScroll();

  // El idioma se carga al final porque depende de la descarga de los JSON
  const savedLang = readStorage(STORAGE_KEYS.lang);
  await changeLanguage(LANGUAGES[savedLang] ? savedLang : DEFAULT_LANGUAGE, { announce: false });
}

init();
