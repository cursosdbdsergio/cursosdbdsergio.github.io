/* =========================================================
   MAISON ALBA · Lógica de la landing
   JavaScript puro, sin dependencias.
   ========================================================= */
'use strict';

/* ---------- Utilidades ---------- */
const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];
const formatPrice = (value) => value.toFixed(2).replace('.', ',') + ' €';

const SHIPPING_COST = 4.95;
const FREE_SHIPPING_FROM = 60;

/* =========================================================
   1. SISTEMA DE IDIOMAS
   Los textos en español se leen del HTML (data-i18n).
   Para añadir traducciones basta con completar los objetos.
   ========================================================= */
const translations = {
  es: {
    'ui.add': 'Añadir a la cesta', 'ui.added': 'Añadido a la cesta', 'ui.chooseSize': 'Selecciona una talla',
    'ui.empty': 'Tu cesta está vacía', 'ui.remove': 'Eliminar', 'ui.size': 'Talla', 'ui.shipping': 'Envío',
    'ui.total': 'Total', 'ui.free': 'Gratis', 'ui.results': 'coincidencias', 'ui.noResults': 'Sin resultados',
    'ui.contactOk': '¡Gracias! Te responderemos en menos de 24 h.', 'ui.formError': 'Revisa los campos marcados.',
    'ui.order': 'Pedido', 'ui.confirmPickup': 'Te avisaremos cuando tu pedido esté listo para recoger en la boutique.',
    'ui.confirmHome': 'Recibirás tu pedido en 24/48 h en la dirección indicada.', 'ui.newsletter': '¡Suscripción completada!',
    'ui.payStore': 'Pagarás al recoger en boutique.', 'ui.payCod': 'Pagarás al recibir el pedido.',
    'ui.gatewayPending': 'Pasarela de pago pendiente de integración.', 'ui.new': 'Nuevo', 'ui.sale': 'Rebajas',
    'ui.login': 'Sistema de acceso próximamente disponible.'
  },
  en: {
    'topbar.shipping': 'Free shipping over €60 · 30-day returns',
    'nav.home': 'Home', 'nav.collections': 'Collections', 'nav.shop': 'Shop', 'nav.about': 'About', 'nav.services': 'Services', 'nav.contact': 'Contact',
    'search.button': 'Search', 'search.placeholder': 'Search the page...',
    'hero.eyebrow': 'New Spring · Summer collection', 'hero.title': 'Natural elegance for every day',
    'hero.text': 'Timeless garments, noble fabrics and pieces designed to accompany you in every moment.',
    'hero.cta': 'Shop now', 'hero.cta2': 'View collections',
    'collections.eyebrow': 'Collections', 'collections.title': 'Discover our universe',
    'collections.lead': 'We select every garment with the real woman in mind: comfortable, versatile and with personality.',
    'collections.c1': 'Dresses', 'collections.c2': 'Sets', 'collections.c3': 'Denim & basics', 'collections.c4': 'Jackets', 'collections.explore': 'Explore',
    'features.f1t': '24/48 h shipping', 'features.f1': 'Free over €60', 'features.f2t': 'In-store pickup', 'features.f2': 'Reserve online, pick up in 2 h',
    'features.f3t': 'Easy returns', 'features.f3': '30 days to change your mind', 'features.f4t': 'Secure payment', 'features.f4': 'In store, cash on delivery or online',
    'shop.eyebrow': 'Online shop', 'shop.title': 'Most wanted', 'shop.all': 'All',
    'about.years': 'years dressing women', 'about.eyebrow': 'Our story', 'about.title': 'Conscious fashion with a Mediterranean soul',
    'about.p1': 'We were born in the heart of Valencia with a simple idea: to offer beautiful, well-made clothes designed to last. We work with small workshops and natural fabrics such as linen, organic cotton and silk.',
    'about.p2': 'Each season we create limited capsule collections so your wardrobe is as unique as you are.',
    'about.s1': 'happy customers', 'about.s2': 'sustainable fabrics', 'about.s3': 'physical boutiques',
    'services.eyebrow': 'Services', 'services.title': 'A tailor-made experience',
    'services.s1t': 'Personal shopper', 'services.s1': 'Free style advice in store or via video call.',
    'services.s2t': 'Alterations', 'services.s2': 'We adjust hems and waists in 48 h at no extra cost.',
    'services.s3t': 'Click & Collect', 'services.s3': 'Reserve online and pick up your order in store whenever you want.',
    'services.s4t': 'Gift card', 'services.s4': 'The perfect gift, valid in store and online.',
    'contact.eyebrow': 'Contact', 'contact.title': 'Visit us or write to us', 'contact.address': 'Address', 'contact.hours': 'Opening hours',
    'contact.hoursText': 'Monday to Saturday · 10:00 – 20:30', 'contact.phone': 'Phone',
    'form.name': 'Name', 'form.subject': 'Subject', 'form.message': 'Message', 'form.privacy': 'I accept the privacy policy', 'form.send': 'Send message',
    'footer.about': 'Women\'s fashion boutique in Valencia since 2010.', 'footer.help': 'Help', 'footer.shipping': 'Shipping & delivery',
    'footer.returns': 'Exchanges & returns', 'footer.sizes': 'Size guide', 'footer.legal': 'Legal', 'footer.cookies': 'Cookie policy',
    'footer.privacy': 'Privacy', 'footer.requirements': 'Purchase requirements & terms', 'footer.newsletter': 'Newsletter', 'footer.rights': 'All rights reserved.',
    'login.title': 'My account', 'login.password': 'Password', 'login.enter': 'Sign in',
    'cart.title': 'Your bag', 'cart.subtotal': 'Subtotal', 'cart.note': 'Free shipping over €60. In-store pickup always free.', 'cart.checkout': 'Checkout', 'cart.clear': 'Empty bag',
    'checkout.title': 'Checkout', 'checkout.data': '1. Your details', 'checkout.delivery': '2. Delivery', 'checkout.pickup': 'Pick up in store',
    'checkout.pickupInfo': 'Carrer de Colón 24 · Free', 'checkout.home': 'Home delivery', 'checkout.homeInfo': '24/48 h · €4.95 (free over €60)',
    'checkout.address': 'Address', 'checkout.city': 'City', 'checkout.zip': 'Postcode', 'checkout.pickupDate': 'Pickup date', 'checkout.payment': '3. Payment',
    'checkout.payStore': 'Pay on pickup', 'checkout.payStoreInfo': 'Cash or card in store', 'checkout.payCod': 'Pay on delivery',
    'checkout.payCodInfo': 'Cash on delivery to the courier', 'checkout.payOnline': 'Online payment', 'checkout.payOnlineInfo': 'Boutique secure gateway', 'checkout.confirm': 'Confirm order',
    'payment.title': 'Payment summary', 'payment.gateway': 'The payment gateway will be integrated here.', 'payment.pay': 'Go to payment',
    'confirm.title': 'Order reserved!', 'confirm.ok': 'Continue shopping',
    'cookies.text': 'We use our own cookies to improve your experience.', 'cookies.accept': 'Accept',
    'ui.add': 'Add to bag', 'ui.added': 'Added to bag', 'ui.chooseSize': 'Choose a size', 'ui.empty': 'Your bag is empty', 'ui.remove': 'Remove',
    'ui.size': 'Size', 'ui.shipping': 'Shipping', 'ui.total': 'Total', 'ui.free': 'Free', 'ui.results': 'matches', 'ui.noResults': 'No results',
    'ui.contactOk': 'Thank you! We will reply within 24 h.', 'ui.formError': 'Please check the highlighted fields.', 'ui.order': 'Order',
    'ui.confirmPickup': 'We will let you know when your order is ready for pickup.', 'ui.confirmHome': 'You will receive your order in 24/48 h.',
    'ui.newsletter': 'Subscribed!', 'ui.payStore': 'You will pay on pickup.', 'ui.payCod': 'You will pay on delivery.',
    'ui.gatewayPending': 'Payment gateway pending integration.', 'ui.new': 'New', 'ui.sale': 'Sale', 'ui.login': 'Login system coming soon.'
  },
  va: {
    'topbar.shipping': 'Enviament gratuït des de 60 € · Devolucions 30 dies',
    'nav.home': 'Inici', 'nav.collections': 'Col·leccions', 'nav.shop': 'Botiga', 'nav.about': 'Nosaltres', 'nav.services': 'Serveis', 'nav.contact': 'Contacte',
    'search.button': 'Cercar', 'search.placeholder': 'Cerca en la pàgina...',
    'hero.eyebrow': 'Nova col·lecció Primavera · Estiu', 'hero.title': 'Elegància natural per a cada dia',
    'hero.text': 'Peces atemporals, teixits nobles i dissenys pensats per a acompanyar-te en cada moment.',
    'hero.cta': 'Comprar ara', 'hero.cta2': 'Veure col·leccions',
    'collections.eyebrow': 'Col·leccions', 'collections.title': 'Descobreix el nostre univers',
    'collections.lead': 'Seleccionem cada peça pensant en la dona real: còmoda, versàtil i amb personalitat.',
    'collections.c1': 'Vestits', 'collections.c2': 'Conjunts', 'collections.c3': 'Denim i bàsics', 'collections.c4': 'Jaquetes', 'collections.explore': 'Explorar',
    'features.f1t': 'Enviament 24/48 h', 'features.f1': 'Gratuït a partir de 60 €', 'features.f2t': 'Recollida en botiga', 'features.f2': 'Reserva en línia i recull en 2 h',
    'features.f3t': 'Devolucions fàcils', 'features.f3': '30 dies per a canviar d\'opinió', 'features.f4t': 'Pagament segur', 'features.f4': 'En botiga, contra reemborsament o en línia',
    'shop.eyebrow': 'Botiga en línia', 'shop.title': 'El més desitjat', 'shop.all': 'Tot',
    'about.years': 'anys vestint dones', 'about.eyebrow': 'La nostra història', 'about.title': 'Moda conscient amb ànima mediterrània',
    'about.p1': 'Naixem al cor de València amb una idea senzilla: oferir peces boniques, ben fetes i pensades per a durar. Treballem amb xicotets tallers i teixits naturals com el lli, el cotó orgànic i la seda.',
    'about.p2': 'Cada temporada creem col·leccions càpsula limitades perquè el teu armari siga tan únic com tu.',
    'about.s1': 'clientes felices', 'about.s2': 'teixits sostenibles', 'about.s3': 'botigues físiques',
    'services.eyebrow': 'Serveis', 'services.title': 'Una experiència a la teua mida',
    'services.s1t': 'Personal shopper', 'services.s1': 'Assessorament d\'estil gratuït en botiga o per videotrucada.',
    'services.s2t': 'Arranjaments a mida', 'services.s2': 'Ajustem baixos i cintures en 48 h sense cost addicional.',
    'services.s3t': 'Click & Collect', 'services.s3': 'Reserva en línia i recull la teua comanda en la botiga quan vulgues.',
    'services.s4t': 'Targeta regal', 'services.s4': 'El detall perfecte, vàlida en botiga física i en línia.',
    'contact.eyebrow': 'Contacte', 'contact.title': 'Visita\'ns o escriu-nos', 'contact.address': 'Adreça', 'contact.hours': 'Horari',
    'contact.hoursText': 'Dilluns a dissabte · 10:00 – 20:30', 'contact.phone': 'Telèfon',
    'form.name': 'Nom', 'form.subject': 'Assumpte', 'form.message': 'Missatge', 'form.privacy': 'Accepte la política de privacitat', 'form.send': 'Enviar missatge',
    'footer.about': 'Botiga de moda femenina a València des de 2010.', 'footer.help': 'Ajuda', 'footer.shipping': 'Enviaments i lliuraments',
    'footer.returns': 'Canvis i devolucions', 'footer.sizes': 'Guia de talles', 'footer.legal': 'Legal', 'footer.cookies': 'Política de galetes',
    'footer.privacy': 'Privacitat', 'footer.requirements': 'Requisits i condicions de compra', 'footer.newsletter': 'Butlletí', 'footer.rights': 'Tots els drets reservats.',
    'login.title': 'El meu compte', 'login.password': 'Contrasenya', 'login.enter': 'Entrar',
    'cart.title': 'La teua cistella', 'cart.subtotal': 'Subtotal', 'cart.note': 'Enviament gratuït des de 60 €. Recollida en botiga sempre gratuïta.', 'cart.checkout': 'Finalitzar compra', 'cart.clear': 'Buidar cistella',
    'checkout.title': 'Finalitzar compra', 'checkout.data': '1. Les teues dades', 'checkout.delivery': '2. Lliurament', 'checkout.pickup': 'Recollir en botiga',
    'checkout.pickupInfo': 'Carrer de Colón 24 · Gratuït', 'checkout.home': 'Enviament a domicili', 'checkout.homeInfo': '24/48 h · 4,95 € (gratuït +60 €)',
    'checkout.address': 'Adreça', 'checkout.city': 'Ciutat', 'checkout.zip': 'Codi postal', 'checkout.pickupDate': 'Data de recollida', 'checkout.payment': '3. Pagament',
    'checkout.payStore': 'Pagar en recollir', 'checkout.payStoreInfo': 'Efectiu o targeta en botiga', 'checkout.payCod': 'Pagar en el lliurament',
    'checkout.payCodInfo': 'Contra reemborsament al repartidor', 'checkout.payOnline': 'Pagament en línia', 'checkout.payOnlineInfo': 'Passarel·la segura de la botiga', 'checkout.confirm': 'Confirmar comanda',
    'payment.title': 'Resum del pagament', 'payment.gateway': 'Ací s\'integrarà la passarel·la de pagament.', 'payment.pay': 'Anar a pagar',
    'confirm.title': 'Comanda reservada!', 'confirm.ok': 'Continuar comprant',
    'cookies.text': 'Utilitzem galetes pròpies per a millorar la teua experiència.', 'cookies.accept': 'Acceptar',
    'ui.add': 'Afegir a la cistella', 'ui.added': 'Afegit a la cistella', 'ui.chooseSize': 'Selecciona una talla', 'ui.empty': 'La teua cistella està buida', 'ui.remove': 'Eliminar',
    'ui.size': 'Talla', 'ui.shipping': 'Enviament', 'ui.total': 'Total', 'ui.free': 'Gratuït', 'ui.results': 'coincidències', 'ui.noResults': 'Sense resultats',
    'ui.contactOk': 'Gràcies! Et respondrem en menys de 24 h.', 'ui.formError': 'Revisa els camps marcats.', 'ui.order': 'Comanda',
    'ui.confirmPickup': 'T\'avisarem quan la comanda estiga preparada per a recollir.', 'ui.confirmHome': 'Rebràs la comanda en 24/48 h.',
    'ui.newsletter': 'Subscripció completada!', 'ui.payStore': 'Pagaràs en recollir en botiga.', 'ui.payCod': 'Pagaràs en rebre la comanda.',
    'ui.gatewayPending': 'Passarel·la de pagament pendent d\'integració.', 'ui.new': 'Nou', 'ui.sale': 'Rebaixes', 'ui.login': 'Sistema d\'accés pròximament disponible.'
  }
};

let currentLang = localStorage.getItem('ma-lang') || 'es';

/** Devuelve el texto traducido de una clave (con respaldo en español). */
function t(key) {
  return translations[currentLang][key] || translations.es[key] || key;
}

/** Guarda los textos originales del HTML como diccionario español. */
function captureSpanishTexts() {
  $$('[data-i18n]').forEach((el) => {
    const key = el.dataset.i18n;
    if (!translations.es[key]) translations.es[key] = el.textContent.trim();
  });
  $$('[data-i18n-placeholder]').forEach((el) => {
    translations.es[el.dataset.i18nPlaceholder] = el.placeholder;
  });
}

/** Aplica el idioma a todos los elementos marcados. */
function applyLanguage(lang) {
  currentLang = translations[lang] ? lang : 'es';
  localStorage.setItem('ma-lang', currentLang);
  document.documentElement.lang = currentLang === 'va' ? 'ca' : currentLang;

  $$('[data-i18n]').forEach((el) => { el.textContent = t(el.dataset.i18n); });
  $$('[data-i18n-placeholder]').forEach((el) => { el.placeholder = t(el.dataset.i18nPlaceholder); });
  $$('.lang-btn').forEach((btn) => btn.classList.toggle('is-active', btn.dataset.lang === currentLang));

  renderProducts();
  renderCart();
}

function initLanguage() {
  captureSpanishTexts();
  $$('.lang-btn').forEach((btn) => btn.addEventListener('click', () => applyLanguage(btn.dataset.lang)));
}

/* =========================================================
   2. MODO CLARO / OSCURO
   ========================================================= */
function setTheme(theme) {
  document.body.classList.toggle('theme-dark', theme === 'dark');
  document.body.classList.toggle('theme-light', theme !== 'dark');
  localStorage.setItem('ma-theme', theme);
}

function initTheme() {
  const saved = localStorage.getItem('ma-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  setTheme(saved || (prefersDark ? 'dark' : 'light'));

  $('#themeToggle').addEventListener('click', () => {
    setTheme(document.body.classList.contains('theme-dark') ? 'light' : 'dark');
  });
}

/* =========================================================
   3. MENÚ HAMBURGUESA
   ========================================================= */
const hamburger = $('#hamburger');
const mainNav = $('#mainNav');

function toggleMobileMenu(forceOpen) {
  const open = typeof forceOpen === 'boolean' ? forceOpen : !mainNav.classList.contains('is-open');
  mainNav.classList.toggle('is-open', open);
  hamburger.classList.toggle('is-open', open);
  hamburger.setAttribute('aria-expanded', String(open));
}

function initMobileMenu() {
  hamburger.addEventListener('click', () => toggleMobileMenu());
  $$('.nav-link', mainNav).forEach((link) => link.addEventListener('click', () => toggleMobileMenu(false)));
}

/* =========================================================
   4. SCROLL SUAVE + EVENTOS DE SCROLL/RESIZE
   ========================================================= */
function initSmoothScroll() {
  document.addEventListener('click', (event) => {
    const link = event.target.closest('a[href^="#"]');
    if (!link || link.getAttribute('href') === '#') return;
    const target = $(link.getAttribute('href'));
    if (!target) return;
    event.preventDefault();
    const offset = $('#siteHeader').offsetHeight;
    window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - offset + 1, behavior: 'smooth' });
  });
}

/** Marca el enlace activo según la sección visible y compacta la cabecera. */
function handleScroll() {
  document.body.classList.toggle('scrolled', window.scrollY > 40);

  const marker = window.scrollY + window.innerHeight * 0.35;
  let activeId = 'inicio';
  $$('main > section').forEach((section) => {
    if (section.offsetTop <= marker) activeId = section.id;
  });
  $$('.nav-link').forEach((link) => link.classList.toggle('is-active', link.getAttribute('href') === '#' + activeId));
}

function initScrollAndResize() {
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => { handleScroll(); ticking = false; });
  }, { passive: true });

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      if (window.innerWidth > 900) toggleMobileMenu(false);
      handleScroll();
    }, 150);
  });
  handleScroll();
}

/** Aparición de secciones al entrar en pantalla. */
function initReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  $$('.reveal').forEach((el) => observer.observe(el));
}

/* =========================================================
   5. MODALES GENÉRICOS
   ========================================================= */
function openModal(id) {
  const modal = document.getElementById(id);
  modal.classList.add('is-open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('no-scroll');
}

function closeModal(modal) {
  modal.classList.remove('is-open');
  modal.setAttribute('aria-hidden', 'true');
  if (!$('.modal.is-open') && !$('#cartDrawer').classList.contains('is-open')) {
    document.body.classList.remove('no-scroll');
  }
}

function initModals() {
  $$('.modal').forEach((modal) => {
    $$('[data-close]', modal).forEach((el) => el.addEventListener('click', () => closeModal(modal)));
  });
  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return;
    $$('.modal.is-open').forEach(closeModal);
    closeCart();
    toggleMobileMenu(false);
  });

  // Botón de usuario: punto de enlace para el sistema de login
  $('#userBtn').addEventListener('click', () => openModal('loginModal'));
  $('#loginForm').addEventListener('submit', (event) => {
    event.preventDefault();
    showToast(t('ui.login'));
  });
}

/** Notificación breve. */
let toastTimer;
function showToast(message) {
  const toast = $('#toast');
  toast.textContent = message;
  toast.classList.add('is-visible');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('is-visible'), 2600);
}

/* =========================================================
   6. BÚSQUEDA EN LA PÁGINA
   ========================================================= */
const searchInput = $('#searchInput');

/** Elimina resaltados previos restaurando el texto original. */
function clearHighlights() {
  $$('mark.search-highlight').forEach((mark) => {
    const parent = mark.parentNode;
    parent.replaceChild(document.createTextNode(mark.textContent), mark);
    parent.normalize();
  });
}

/** Busca el término en el contenido principal y resalta coincidencias. */
function searchInPage(term) {
  clearHighlights();
  const resultsList = $('#searchResults');
  const summary = $('#searchSummary');
  resultsList.innerHTML = '';
  summary.textContent = '';
  if (term.length < 2) return;

  const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(escaped, 'gi');
  const walker = document.createTreeWalker($('#mainContent'), NodeFilter.SHOW_TEXT, {
    acceptNode: (node) => node.nodeValue.trim() && !node.parentElement.closest('script, style, button, video')
      ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT
  });

  const textNodes = [];
  while (walker.nextNode()) if (regex.test(walker.currentNode.nodeValue)) textNodes.push(walker.currentNode);

  const marks = [];
  textNodes.forEach((node) => {
    const fragment = document.createDocumentFragment();
    let lastIndex = 0;
    node.nodeValue.replace(regex, (match, offset) => {
      fragment.appendChild(document.createTextNode(node.nodeValue.slice(lastIndex, offset)));
      const mark = document.createElement('mark');
      mark.className = 'search-highlight';
      mark.textContent = match;
      fragment.appendChild(mark);
      marks.push(mark);
      lastIndex = offset + match.length;
    });
    fragment.appendChild(document.createTextNode(node.nodeValue.slice(lastIndex)));
    node.parentNode.replaceChild(fragment, node);
  });

  summary.textContent = marks.length ? `${marks.length} ${t('ui.results')}` : t('ui.noResults');

  marks.slice(0, 30).forEach((mark) => {
    const context = mark.parentElement.textContent.trim();
    const index = context.toLowerCase().indexOf(term.toLowerCase());
    const snippet = (index > 30 ? '…' : '') + context.slice(Math.max(0, index - 30), index + term.length + 50) + '…';
    const item = document.createElement('li');
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = snippet;
    button.addEventListener('click', () => goToMatch(mark));
    item.appendChild(button);
    resultsList.appendChild(item);
  });
}

function goToMatch(mark) {
  $$('mark.is-current').forEach((m) => m.classList.remove('is-current'));
  mark.classList.add('is-current');
  closeModal($('#searchModal'));
  mark.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function initSearch() {
  $$('.js-open-search').forEach((btn) => btn.addEventListener('click', () => {
    toggleMobileMenu(false);
    openModal('searchModal');
    setTimeout(() => searchInput.focus(), 300);
  }));

  let debounce;
  searchInput.addEventListener('input', () => {
    clearTimeout(debounce);
    debounce = setTimeout(() => searchInPage(searchInput.value.trim()), 250);
  });
  $('#searchForm').addEventListener('submit', (event) => {
    event.preventDefault();
    const first = $('mark.search-highlight');
    if (first) goToMatch(first);
  });
}

/* =========================================================
   7. CATÁLOGO DE PRODUCTOS
   (Sustituir por los datos reales de la boutique)
   ========================================================= */
const IMG = (id, w = 600, h = 800) => `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=${h}&w=${w}`;

const products = [
  { id: 1, name: 'Vestido midi lino', category: 'vestidos', price: 69.9, image: IMG(35741388), sizes: ['XS', 'S', 'M', 'L'], tag: 'new' },
  { id: 2, name: 'Conjunto blazer rosa', category: 'conjuntos', price: 119, oldPrice: 149, image: IMG(38194951), sizes: ['S', 'M', 'L'], tag: 'sale' },
  { id: 3, name: 'Jeans mom rotos', category: 'basicos', price: 45.9, image: IMG(26651160), sizes: ['34', '36', '38', '40'] },
  { id: 4, name: 'Chaqueta terciopelo', category: 'chaquetas', price: 89, image: IMG(19060012), sizes: ['S', 'M', 'L', 'XL'], tag: 'new' },
  { id: 5, name: 'Vestido estampado boho', category: 'vestidos', price: 59.9, image: IMG(38254984), sizes: ['XS', 'S', 'M'] },
  { id: 6, name: 'Camisa satinada beige', category: 'basicos', price: 39.9, image: IMG(5418894), sizes: ['S', 'M', 'L'] },
  { id: 7, name: 'Vestido cóctel negro', category: 'vestidos', price: 79, oldPrice: 99, image: IMG(36772528), sizes: ['XS', 'S', 'M', 'L'], tag: 'sale' },
  { id: 8, name: 'Conjunto color fiesta', category: 'conjuntos', price: 95, image: IMG(9432674), sizes: ['S', 'M', 'L'] }
];

let activeFilter = 'todos';

function renderProducts() {
  const grid = $('#productsGrid');
  const list = activeFilter === 'todos' ? products : products.filter((p) => p.category === activeFilter);

  grid.innerHTML = list.map((product) => `
    <article class="product-card" data-id="${product.id}">
      <div class="product-card__media">
        <img src="${product.image}" alt="${product.name}" loading="lazy">
        ${product.tag ? `<span class="product-tag">${t('ui.' + product.tag)}</span>` : ''}
      </div>
      <div class="product-card__body">
        <h3 class="product-card__name">${product.name}</h3>
        <p class="product-card__price">${formatPrice(product.price)}${product.oldPrice ? `<del>${formatPrice(product.oldPrice)}</del>` : ''}</p>
        <div class="size-picker">
          ${product.sizes.map((size) => `<button type="button" class="size-btn" data-size="${size}">${size}</button>`).join('')}
        </div>
        <button type="button" class="btn btn--primary js-add-to-cart">${t('ui.add')}</button>
      </div>
    </article>`).join('');
}

function setFilter(filter) {
  activeFilter = filter;
  $$('.filter-btn').forEach((btn) => btn.classList.toggle('is-active', btn.dataset.filter === filter));
  renderProducts();
}

function initShop() {
  $$('.filter-btn').forEach((btn) => btn.addEventListener('click', () => setFilter(btn.dataset.filter)));
  $$('[data-filter-link]').forEach((link) => link.addEventListener('click', () => setFilter(link.dataset.filterLink)));

  // Delegación de eventos: tallas y añadir al carrito
  $('#productsGrid').addEventListener('click', (event) => {
    const card = event.target.closest('.product-card');
    if (!card) return;

    const sizeBtn = event.target.closest('.size-btn');
    if (sizeBtn) {
      $$('.size-btn', card).forEach((b) => b.classList.remove('is-selected'));
      sizeBtn.classList.add('is-selected');
      return;
    }

    if (event.target.closest('.js-add-to-cart')) {
      const selected = $('.size-btn.is-selected', card);
      if (!selected) { showToast(t('ui.chooseSize')); return; }
      addToCart(Number(card.dataset.id), selected.dataset.size);
    }
  });
}

/* =========================================================
   8. CARRITO DE COMPRA (persistente en localStorage)
   ========================================================= */
let cart = JSON.parse(localStorage.getItem('ma-cart') || '[]');

const saveCart = () => localStorage.setItem('ma-cart', JSON.stringify(cart));
const getSubtotal = () => cart.reduce((sum, item) => sum + getProduct(item.id).price * item.qty, 0);
const getProduct = (id) => products.find((p) => p.id === id);

function addToCart(id, size) {
  const existing = cart.find((item) => item.id === id && item.size === size);
  if (existing) existing.qty += 1;
  else cart.push({ id, size, qty: 1 });
  saveCart();
  renderCart();
  showToast(t('ui.added'));
  const counter = $('#cartCount');
  counter.classList.add('bump');
  setTimeout(() => counter.classList.remove('bump'), 300);
}

function updateQuantity(index, delta) {
  cart[index].qty += delta;
  if (cart[index].qty <= 0) cart.splice(index, 1);
  saveCart();
  renderCart();
}

function renderCart() {
  const list = $('#cartItems');
  $('#cartCount').textContent = cart.reduce((sum, item) => sum + item.qty, 0);
  $('#cartSubtotal').textContent = formatPrice(getSubtotal());
  $('#checkoutBtn').disabled = cart.length === 0;
  $('#checkoutBtn').style.opacity = cart.length ? '1' : '.5';

  if (!cart.length) {
    list.innerHTML = `<li class="cart-empty">${t('ui.empty')}</li>`;
    return;
  }

  list.innerHTML = cart.map((item, index) => {
    const product = getProduct(item.id);
    return `
      <li class="cart-item">
        <img src="${product.image}" alt="${product.name}">
        <div>
          <p class="cart-item__name">${product.name}</p>
          <p class="cart-item__meta">${t('ui.size')}: ${item.size} · ${formatPrice(product.price)}</p>
          <div class="qty">
            <button type="button" data-qty="-1" data-index="${index}" aria-label="-">−</button>
            <span>${item.qty}</span>
            <button type="button" data-qty="1" data-index="${index}" aria-label="+">+</button>
          </div>
        </div>
        <div class="cart-item__side">
          <strong>${formatPrice(product.price * item.qty)}</strong>
          <button type="button" class="cart-item__remove" data-remove="${index}">${t('ui.remove')}</button>
        </div>
      </li>`;
  }).join('');
}

function openCart() {
  const drawer = $('#cartDrawer');
  drawer.classList.add('is-open');
  drawer.setAttribute('aria-hidden', 'false');
  document.body.classList.add('no-scroll');
}

function closeCart() {
  const drawer = $('#cartDrawer');
  drawer.classList.remove('is-open');
  drawer.setAttribute('aria-hidden', 'true');
  if (!$('.modal.is-open')) document.body.classList.remove('no-scroll');
}

function initCart() {
  $('#cartBtn').addEventListener('click', openCart);
  $$('[data-close-cart]').forEach((el) => el.addEventListener('click', closeCart));

  $('#cartItems').addEventListener('click', (event) => {
    const qtyBtn = event.target.closest('[data-qty]');
    if (qtyBtn) updateQuantity(Number(qtyBtn.dataset.index), Number(qtyBtn.dataset.qty));
    const removeBtn = event.target.closest('[data-remove]');
    if (removeBtn) updateQuantity(Number(removeBtn.dataset.remove), -Infinity);
  });

  $('#clearCartBtn').addEventListener('click', () => { cart = []; saveCart(); renderCart(); });
  $('#checkoutBtn').addEventListener('click', () => {
    if (!cart.length) return;
    closeCart();
    updateCheckoutForm();
    openModal('checkoutModal');
  });
}

/* =========================================================
   9. CHECKOUT: entrega, pago y resumen
   ========================================================= */
const checkoutForm = $('#checkoutForm');

function getShippingCost(delivery) {
  return delivery === 'home' && getSubtotal() < FREE_SHIPPING_FROM ? SHIPPING_COST : 0;
}

function buildSummaryHTML(delivery) {
  const shipping = getShippingCost(delivery);
  const lines = cart.map((item) => {
    const p = getProduct(item.id);
    return `<div class="summary-line"><span>${item.qty} × ${p.name} (${item.size})</span><span>${formatPrice(p.price * item.qty)}</span></div>`;
  }).join('');
  return `${lines}
    <div class="summary-line"><span>${t('ui.shipping')}</span><span>${shipping ? formatPrice(shipping) : t('ui.free')}</span></div>
    <div class="summary-line summary-line--total"><span>${t('ui.total')}</span><span>${formatPrice(getSubtotal() + shipping)}</span></div>`;
}

/** Ajusta campos y métodos de pago según el tipo de entrega. */
function updateCheckoutForm() {
  const delivery = checkoutForm.delivery.value;
  const isHome = delivery === 'home';

  $('#addressFields').hidden = !isHome;
  $('#pickupDate').hidden = isHome;
  ['address', 'city', 'zip'].forEach((name) => { checkoutForm[name].required = isHome; });

  // "Pagar al recoger" solo con recogida y "Pagar en la entrega" solo con envío
  $$('[data-pay-for]').forEach((option) => {
    const enabled = option.dataset.payFor === delivery;
    option.classList.toggle('is-disabled', !enabled);
    option.querySelector('input').disabled = !enabled;
  });
  const selectedPayment = $('input[name="payment"]:checked', checkoutForm);
  if (!selectedPayment || selectedPayment.disabled) {
    $(`input[value="${isHome ? 'cod' : 'store'}"]`, checkoutForm).checked = true;
  }

  $('#orderSummary').innerHTML = buildSummaryHTML(delivery);
}

function createOrder() {
  const data = Object.fromEntries(new FormData(checkoutForm));
  return {
    number: 'MA-' + Date.now().toString().slice(-6),
    customer: { name: data.name, email: data.email, phone: data.phone },
    delivery: data.delivery,
    address: data.delivery === 'home' ? { street: data.address, city: data.city, zip: data.zip } : null,
    pickupDate: data.delivery === 'pickup' ? data.pickupDate : null,
    payment: data.payment,
    items: cart.map((item) => ({ ...item, name: getProduct(item.id).name, price: getProduct(item.id).price })),
    shipping: getShippingCost(data.delivery),
    total: getSubtotal() + getShippingCost(data.delivery)
  };
}

function finishOrder(order) {
  const message = order.delivery === 'pickup' ? t('ui.confirmPickup') : t('ui.confirmHome');
  const paymentText = order.payment === 'store' ? t('ui.payStore') : t('ui.payCod');
  $('#confirmBody').innerHTML = `<p><strong>${t('ui.order')} ${order.number}</strong></p><p>${message}</p><p>${paymentText}</p><p><strong>${t('ui.total')}: ${formatPrice(order.total)}</strong></p>`;
  cart = []; saveCart(); renderCart();
  openModal('confirmModal');
}

let pendingOrder = null;

function initCheckout() {
  checkoutForm.addEventListener('change', (event) => {
    if (event.target.name === 'delivery') updateCheckoutForm();
  });

  // Fecha mínima de recogida: hoy
  checkoutForm.pickupDate.min = new Date().toISOString().split('T')[0];

  checkoutForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!checkoutForm.checkValidity()) { checkoutForm.reportValidity(); return; }

    const order = createOrder();
    closeModal($('#checkoutModal'));

    if (order.payment === 'online') {
      pendingOrder = order;
      localStorage.setItem('ma-pending-order', JSON.stringify(order));
      $('#paymentSummary').innerHTML = `<p class="summary-line"><strong>${t('ui.order')} ${order.number}</strong></p>${buildSummaryHTML(order.delivery)}`;
      openModal('paymentModal');
    } else {
      finishOrder(order);
    }
  });

  /* Punto de integración de la pasarela:
     escuchar el evento "maisonalba:pay" o sustituir este manejador. */
  $('#payNowBtn').addEventListener('click', () => {
    document.dispatchEvent(new CustomEvent('maisonalba:pay', { detail: pendingOrder }));
    showToast(t('ui.gatewayPending'));
  });
}

/* =========================================================
   10. FORMULARIOS, FOOTER Y COOKIES
   ========================================================= */
function initContactForm() {
  const form = $('#contactForm');
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    let valid = true;
    $$('input, textarea', form).forEach((field) => {
      const ok = field.checkValidity();
      field.classList.toggle('is-invalid', !ok);
      if (!ok) valid = false;
    });
    $('#contactFeedback').textContent = valid ? t('ui.contactOk') : t('ui.formError');
    if (valid) form.reset();
  });

  $('#newsletterForm').addEventListener('submit', (event) => {
    event.preventDefault();
    event.target.reset();
    showToast(t('ui.newsletter'));
  });
}

/** Contenidos legales e informativos del footer (editables por el cliente). */
const infoContent = {
  cookies: { title: 'footer.cookies', body: '<p>Utilizamos cookies técnicas necesarias para el funcionamiento de la web (cesta, idioma y tema) y, con tu consentimiento, cookies analíticas para mejorar el servicio.</p><p>Puedes eliminarlas en cualquier momento desde la configuración de tu navegador.</p>' },
  privacy: { title: 'footer.privacy', body: '<p>Tus datos se tratan únicamente para gestionar pedidos y consultas, conforme al RGPD. Puedes ejercer tus derechos escribiendo a hola@maisonalba.es.</p>' },
  requirements: { title: 'footer.requirements', body: '<ul><li>Ser mayor de 18 años para realizar compras.</li><li>Las reservas para recoger en boutique se mantienen 5 días.</li><li>Envíos solo a península y Baleares.</li><li>Pago en tienda, contra reembolso o pasarela online.</li><li>Precios con IVA incluido.</li></ul>' },
  shipping: { title: 'footer.shipping', body: '<p>Envío estándar 24/48 h por 4,95 €, gratuito a partir de 60 €. Recogida en boutique gratuita, lista en 2 horas.</p>' },
  returns: { title: 'footer.returns', body: '<p>Dispones de 30 días para cambios y devoluciones, en tienda o mediante recogida a domicilio. Las prendas deben conservar sus etiquetas.</p>' },
  sizes: { title: 'footer.sizes', body: '<ul><li>XS · 34 · Pecho 80 cm</li><li>S · 36 · Pecho 84 cm</li><li>M · 38 · Pecho 88 cm</li><li>L · 40 · Pecho 94 cm</li><li>XL · 42 · Pecho 100 cm</li></ul>' }
};

function initFooter() {
  $('#year').textContent = new Date().getFullYear();
  $$('[data-info]').forEach((link) => link.addEventListener('click', (event) => {
    event.preventDefault();
    const info = infoContent[link.dataset.info];
    $('#infoTitle').textContent = t(info.title);
    $('#infoBody').innerHTML = info.body;
    openModal('infoModal');
  }));
}

function initCookieBanner() {
  const banner = $('#cookieBanner');
  if (!localStorage.getItem('ma-cookies')) banner.hidden = false;
  $('#acceptCookies').addEventListener('click', () => {
    localStorage.setItem('ma-cookies', 'accepted');
    banner.hidden = true;
  });
}

/* =========================================================
   INICIALIZACIÓN
   ========================================================= */
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initLanguage();
  initMobileMenu();
  initSmoothScroll();
  initScrollAndResize();
  initReveal();
  initModals();
  initSearch();
  initShop();
  initCart();
  initCheckout();
  initContactForm();
  initFooter();
  initCookieBanner();
  applyLanguage(currentLang); // Renderiza textos, productos y carrito
});
