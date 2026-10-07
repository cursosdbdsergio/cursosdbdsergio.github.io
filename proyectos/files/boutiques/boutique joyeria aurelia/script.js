/* ===================================================================
   AURÉLIA HAUTE JOAILLERIE - SCRIPT
   Pure Vanilla JavaScript (No Frameworks, No External Dependencies)
   Features:
   - 20 Luxury Jewelry Products with Dynamic Render & Filtering
   - Interactive Shopping Cart with Pickup / Delivery & 3 Payment Modes
   - Payment Gateway Screen & Order Confirmation
   - Light / Dark Mode with Persistence
   - Top-down Hamburger Menu (closes on link / resize)
   - Search Modal with Live Search & Page Text Highlighting
   - Multi-Language Switcher (Español, English, Valencià)
   - Quick View Modal & User Login System
   - Smooth Scroll Offset & Active Nav Spy
   - Cookie Consent Management & Toast System
   =================================================================== */

// --- 20 Curated Luxury Products Data ---
const PRODUCTS = [
  {
    id: 1,
    name: "Solitaire Éternel Diamant",
    category: "anillos",
    price: 6850,
    oldPrice: 7400,
    specs: "Oro Blanco 18K • Diamante Solitario 1.65 ct F-VVS1 • Certificado GIA",
    image: "https://images.pexels.com/photos/11504786/pexels-photo-11504786.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    badge: "Icono",
    desc: "El anillo solitario definitivo. Forjado a mano en oro blanco de 18 quilates con un diamante central de talla brillante redonda de pureza excepcional."
  },
  {
    id: 2,
    name: "Collier Cascade Royale",
    category: "collares",
    price: 14200,
    oldPrice: null,
    specs: "Oro Amarillo 18K • Pavé de Diamantes 4.20 ct • Cierre de Seguridad Oculto",
    image: "https://images.pexels.com/photos/24815712/pexels-photo-24815712.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    badge: "Alta Joyería",
    desc: "Una cascada deslumbrante de oro pulido y diamantes en degradé que reposa con gracia inigualable sobre la silueta del escote."
  },
  {
    id: 3,
    name: "Boucles d'Oreilles Perles du Sud",
    category: "pendientes",
    price: 3950,
    oldPrice: 4300,
    specs: "Oro Amarillo 18K • Perlas de los Mares del Sur 11mm • Diamantes Marquesa",
    image: "https://images.pexels.com/photos/3266700/pexels-photo-3266700.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    badge: "Bestseller",
    desc: "Perlas australianas seleccionadas por su brillo nacarado insuperable, coronadas por monturas de diamantes en corte marquesa."
  },
  {
    id: 4,
    name: "Bracelet Rivière Diamants",
    category: "pulseras",
    price: 9800,
    oldPrice: null,
    specs: "Platino 950 • 52 Diamantes Talla Brillante 5.50 ct Totales • Cierre Francés",
    image: "https://images.pexels.com/photos/8306528/pexels-photo-8306528.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    badge: "Exclusivo",
    desc: "La clásica pulsera Tennis de alta alcurnia. Una corriente ininterrumpida de diamantes perfectamente calibrados en color y pureza."
  },
  {
    id: 5,
    name: "Chronographe Tourbillon Noir",
    category: "relojes",
    price: 24500,
    oldPrice: 26800,
    specs: "Caja Cerámica & Oro Rosa 18K • Calibre Automático Suizo 72h • Correa Aligátor",
    image: "https://images.pexels.com/photos/28977357/pexels-photo-28977357.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    badge: "Edición Limitada",
    desc: "Maestría relojera suiza con escape de tourbillon volante y esfera calada con acabados Côtes de Genève elaborados a mano."
  },
  {
    id: 6,
    name: "Bague Fleur de Lys Saphir",
    category: "anillos",
    price: 8400,
    oldPrice: null,
    specs: "Platino & Oro 18K • Zafiro de Ceilán Royal Blue 3.10 ct • Orla de Diamantes",
    image: "https://images.pexels.com/photos/8398911/pexels-photo-8398911.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    badge: "Pieza Única",
    desc: "Inspirada en la orfebrería botánica del siglo XIX, con un zafiro azul aterciopelado sin tratamiento térmico de origen Sri Lanka."
  },
  {
    id: 7,
    name: "Pendentif Émeraude Impériale",
    category: "collares",
    price: 11900,
    oldPrice: 12800,
    specs: "Oro Amarillo 18K • Esmeralda Muzo Colombiana 2.90 ct • Diamantes Talla Pera",
    image: "https://images.pexels.com/photos/15064041/pexels-photo-15064041.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    badge: "Colección Privada",
    desc: "El verde profundo y embrujador de las minas históricas de Muzo en una montura minimalista que maximiza la refracción de luz."
  },
  {
    id: 8,
    name: "Créoles Diamant Pavé Infini",
    category: "pendientes",
    price: 4600,
    oldPrice: null,
    specs: "Oro Blanco 18K • Micro-pavé de Diamantes Interior & Exterior 2.30 ct",
    image: "https://images.pexels.com/photos/6716445/pexels-photo-6716445.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    badge: "Novedad",
    desc: "Aros de silueta fluida engastados por ambas caras para reflejar el destello desde cualquier ángulo del movimiento."
  },
  {
    id: 9,
    name: "Manchette d'Or Martelé",
    category: "pulseras",
    price: 7200,
    oldPrice: 7900,
    specs: "Oro Amarillo 18K Macizo • Acabado Cepillado a Mano Florentino • 45g",
    image: "https://images.pexels.com/photos/37573129/pexels-photo-37573129.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    badge: "Artesanal",
    desc: "Brazalete rígido forjado a fuego con textura satinada inspirada en los orfebres del Renacimiento italiano."
  },
  {
    id: 10,
    name: "Montre Squelette Platine",
    category: "relojes",
    price: 29000,
    oldPrice: null,
    specs: "Platino 950 • Esqueleto Completo Visible • Cristal Zafiro Doble Antirreflejos",
    image: "https://images.pexels.com/photos/9261531/pexels-photo-9261531.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    badge: "Haute Horlogerie",
    desc: "Transparencia absoluta. Una obra de micromecánica con puentes biselados a mano que revela el latido de 28.800 alternancias."
  },
  {
    id: 11,
    name: "Alliance Halo Tri-Gold",
    category: "anillos",
    price: 5200,
    oldPrice: 5700,
    specs: "Tres Oros 18K (Rosa, Blanco, Amarillo) • Diamantes Corte Baguette",
    image: "https://images.pexels.com/photos/16794266/pexels-photo-16794266.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    badge: "Eternidad",
    desc: "Tres aros entrelazados que simbolizan el pasado, presente y futuro, realzados con diamantes baguettes de claridad imponente."
  },
  {
    id: 12,
    name: "Sautoir Perles d'Orient & Rubis",
    category: "collares",
    price: 13500,
    oldPrice: null,
    specs: "Oro Rosa 18K • Rubíes Birmanos Sangre de Pichón • Perlas Akoya Graduadas",
    image: "https://images.pexels.com/photos/14999288/pexels-photo-14999288.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    badge: "Gema Natural",
    desc: "Collar largo versátil estilo Art Déco, perfecto para lucir en caída simple o con doble vuelta sobre vestidos de gala."
  },
  {
    id: 13,
    name: "Pendants Diamants Goutte d'Eau",
    category: "pendientes",
    price: 6100,
    oldPrice: 6600,
    specs: "Oro Blanco 18K • 2 Diamantes Centrales Talla Pera 2.10 ct • Movimiento Articulado",
    image: "https://images.pexels.com/photos/7093767/pexels-photo-7093767.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    badge: "Favorito",
    desc: "Pendientes de silueta esbelta con caída tridimensional que dan una iluminación sublime a los rasgos faciales."
  },
  {
    id: 14,
    name: "Bangle Serpent d'Or & Émeraudes",
    category: "pulseras",
    price: 10400,
    oldPrice: null,
    specs: "Oro Rosa 18K • Escamas Engastadas con Diamantes • Ojos de Esmeralda",
    image: "https://images.pexels.com/photos/8891958/pexels-photo-8891958.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    badge: "Icónico",
    desc: "La inmortal figura del ofidio que simboliza la sabiduría y el renacer eterno, con un muelle de memoria flexible de confort inigualable."
  },
  {
    id: 15,
    name: "Chronomètre Héritage Vintage",
    category: "relojes",
    price: 18900,
    oldPrice: 20500,
    specs: "Oro Amarillo 18K • Esfera Champagne con Números Aplicados • Reserva 60 Horas",
    image: "https://images.pexels.com/photos/6157408/pexels-photo-6157408.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    badge: "Clásico",
    desc: "Elegancia atemporal con proporciones doradas de 38mm de diámetro, corona estriada y cristal curvado 'glassbox'."
  },
  {
    id: 16,
    name: "Solitaire Coussin Diamant Jaune",
    category: "anillos",
    price: 16800,
    oldPrice: null,
    specs: "Oro Amarillo & Platino • Diamante Fancy Vivid Yellow 2.40 ct • Certificado GIA",
    image: "https://images.pexels.com/photos/8306529/pexels-photo-8306529.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    badge: "Rareza",
    desc: "Un diamante solar de tonalidad canario de intensidad 'Fancy', contrastado por una galería doble en platino con micro-engaste."
  },
  {
    id: 17,
    name: "Ras-du-Cou Céleste Platine",
    category: "collares",
    price: 18400,
    oldPrice: 19800,
    specs: "Platino 950 • Constelación de 80 Diamantes Talla Brillante 7.80 ct",
    image: "https://images.pexels.com/photos/32988651/pexels-photo-32988651.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    badge: "Alta Joyería",
    desc: "Choker flexible de ingeniería joyera con eslabones invisibles que se adapta como una segunda piel iluminada de destellos."
  },
  {
    id: 18,
    name: "Clous Diamant Solitaire 2.0ct",
    category: "pendientes",
    price: 5800,
    oldPrice: null,
    specs: "Oro Blanco 18K • Par de Diamantes 1.0ct cada uno • Sistema Rosca Alpa",
    image: "https://images.pexels.com/photos/18285658/pexels-photo-18285658.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    badge: "Esencial",
    desc: "La quintaesencia del fondo de joyero. Dos diamantes de proporciones de corte excelente montados en 4 garras finas."
  },
  {
    id: 19,
    name: "Bracelet Chaîne Gourmette Pavée",
    category: "pulseras",
    price: 8900,
    oldPrice: 9500,
    specs: "Oro Amarillo 18K • Eslabones Macizos con Cierre de Diamantes • 38g",
    image: "https://images.pexels.com/photos/28985978/pexels-photo-28985978.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    badge: "Moderno",
    desc: "Unión audaz entre la joyería urbana de vanguardia y la nobleza artesanal de nuestros maestros engastadores."
  },
  {
    id: 20,
    name: "Bague Chevalier Onyx & Diamants",
    category: "anillos",
    price: 4900,
    oldPrice: null,
    specs: "Oro Blanco 18K • Ónix Negro Natural Cortado a Medida • Pavé Geométrico",
    image: "https://images.pexels.com/photos/19703087/pexels-photo-19703087.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    badge: "Signet VIP",
    desc: "Sello contemporáneo de presencia magnética. La pureza mineral del ónix contrastada con diamantes de brillo glacial."
  }
];

// --- Multilanguage Dictionary ---
const TRANSLATIONS = {
  es: {
    topbar_call: "Atención VIP Boutiques: +34 963 800 240",
    topbar_email: "boutique@aurelia-joaillerie.es",
    topbar_notice: "Cita privada en showroom y envíos blindados asegurados",
    nav_home: "Inicio",
    nav_collections: "Colecciones",
    nav_catalog: "Catálogo Joyas",
    nav_atelier: "El Atelier",
    nav_services: "Servicios de Lujo",
    nav_boutiques: "Boutiques",
    nav_contact: "Contacto",
    hero_badge: "Haute Joaillerie & Boutiques de Lujo",
    hero_title: "La Belleza Eterna Forjada en <span>Oro y Diamantes</span>",
    hero_desc: "Creaciones de alta joyería esculpidas a mano en nuestros talleres de París y Valencia. Gemas éticas certificadas y un legado centenario de distinción.",
    hero_btn_explore: "Explorar Catálogo",
    hero_btn_appointment: "Reservar Cita Privada",
    stat_legacy: "Años de Tradición",
    stat_gems: "Gemas Certificadas",
    stat_boutiques: "Boutiques Propias",
    trust_shipping: "Envío Blindado Asegurado",
    trust_shipping_sub: "100% cubierto hasta entrega",
    trust_gia: "Certificación GIA & HRD",
    trust_gia_sub: "Diamantes éticos seleccionados",
    trust_atelier: "Oro Ético 18K",
    trust_atelier_sub: "Trazabilidad ecológica",
    trust_warranty: "Garantía de por Vida",
    trust_warranty_sub: "Mantenimiento gratuito",
    catalog_title: "Nuestra Colección de Joyas",
    catalog_subtitle: "Piezas Excepcionales",
    filter_all: "Todos",
    filter_rings: "Anillos",
    filter_necklaces: "Collares",
    filter_earrings: "Pendientes",
    filter_bracelets: "Pulseras",
    filter_watches: "Relojes",
    btn_add_cart: "Añadir",
    btn_quick_view: "Vista Rápida",
    cart_title: "Bolsa de Alta Joyería",
    cart_empty: "Su bolsa de compras está vacía.",
    cart_subtotal: "Subtotal:",
    cart_tax: "IVA (21% incluido):",
    cart_shipping: "Envío Asegurado:",
    cart_free: "Gratuito",
    cart_total: "Total:",
    cart_checkout_btn: "Finalizar Pedido / Reserva",
    modal_search_title: "Búsqueda en la Boutique",
    modal_search_sub: "Encuentre piezas de joyería o secciones de información dentro de nuestra web.",
    search_placeholder: "Buscar por joya, oro, diamantes, perlas, servicios...",
    contact_title: "Concierge & Cita VIP",
    contact_subtitle: "Atención Personalizada",
    footer_rights: "© 2026 Aurélia Joaillerie S.L. Todos los derechos reservados."
  },
  en: {
    topbar_call: "VIP Boutique Line: +34 963 800 240",
    topbar_email: "boutique@aurelia-joaillerie.es",
    topbar_notice: "Private showroom appointments & insured armored delivery",
    nav_home: "Home",
    nav_collections: "Collections",
    nav_catalog: "Jewelry Catalog",
    nav_atelier: "The Atelier",
    nav_services: "Luxury Services",
    nav_boutiques: "Boutiques",
    nav_contact: "Contact",
    hero_badge: "Haute Joaillerie & Luxury Boutiques",
    hero_title: "Timeless Beauty Crafted in <span>Gold & Diamonds</span>",
    hero_desc: "High jewelry creations sculpted by hand in our ateliers in Paris and Valencia. Certified ethical gemstones and a century-long legacy of supreme excellence.",
    hero_btn_explore: "Explore Catalog",
    hero_btn_appointment: "Book Private Session",
    stat_legacy: "Years Heritage",
    stat_gems: "Certified Gemstones",
    stat_boutiques: "Bespoke Boutiques",
    trust_shipping: "Insured Armored Delivery",
    trust_shipping_sub: "100% insured up to doorstep",
    trust_gia: "GIA & HRD Certified",
    trust_gia_sub: "Ethically sourced diamonds",
    trust_atelier: "18K Ethical Gold",
    trust_atelier_sub: "Eco-conscious traceability",
    trust_warranty: "Lifetime Warranty",
    trust_warranty_sub: "Complimentary care",
    catalog_title: "Our Fine Jewelry Showcase",
    catalog_subtitle: "Exceptional Creations",
    filter_all: "All",
    filter_rings: "Rings",
    filter_necklaces: "Necklaces",
    filter_earrings: "Earrings",
    filter_bracelets: "Bracelets",
    filter_watches: "Timepieces",
    btn_add_cart: "Add",
    btn_quick_view: "Quick View",
    cart_title: "High Jewelry Shopping Bag",
    cart_empty: "Your shopping bag is currently empty.",
    cart_subtotal: "Subtotal:",
    cart_tax: "VAT (21% included):",
    cart_shipping: "Insured Shipping:",
    cart_free: "Complimentary",
    cart_total: "Total Amount:",
    cart_checkout_btn: "Proceed to Checkout / Reserve",
    modal_search_title: "Boutique Search",
    modal_search_sub: "Find fine jewelry pieces or informative content within our page.",
    search_placeholder: "Search jewels, gold, diamonds, pearls, services...",
    contact_title: "Concierge & VIP Booking",
    contact_subtitle: "Bespoke Experience",
    footer_rights: "© 2026 Aurélia Joaillerie S.L. All rights reserved."
  },
  va: {
    topbar_call: "Atenció VIP Boutiques: +34 963 800 240",
    topbar_email: "boutique@aurelia-joaillerie.es",
    topbar_notice: "Cita privada al showroom i enviaments blindats assegurats",
    nav_home: "Inici",
    nav_collections: "Col·leccions",
    nav_catalog: "Catàleg Joies",
    nav_atelier: "L'Atelier",
    nav_services: "Serveis de Lux",
    nav_boutiques: "Boutiques",
    nav_contact: "Contacte",
    hero_badge: "Haute Joaillerie & Boutiques de Lux",
    hero_title: "La Bellesa Eterna Forjada en <span>Or i Diamants</span>",
    hero_desc: "Creacions d'alta joieria esculpides a mà als nostres tallers de París i València. Gemmes ètiques certificades i un llegat centenari d'excel·lència.",
    hero_btn_explore: "Explorar Catàleg",
    hero_btn_appointment: "Reservar Cita Privada",
    stat_legacy: "Anys de Tradició",
    stat_gems: "Gemmes Certificades",
    stat_boutiques: "Boutiques Pròpies",
    trust_shipping: "Enviament Blindat Assegurat",
    trust_shipping_sub: "100% cobert fins a l'entrega",
    trust_gia: "Certificació GIA & HRD",
    trust_gia_sub: "Diamants ètics seleccionats",
    trust_atelier: "Or Ètic 18K",
    trust_atelier_sub: "Traçabilitat ecològica",
    trust_warranty: "Garantia de per Vida",
    trust_warranty_sub: "Manteniment gratuït",
    catalog_title: "La Nostra Col·lecció de Joies",
    catalog_subtitle: "Peces Excepcionals",
    filter_all: "Tots",
    filter_rings: "Anells",
    filter_necklaces: "Colliers",
    filter_earrings: "Arracades",
    filter_bracelets: "Polseres",
    filter_watches: "Rellotges",
    btn_add_cart: "Afegir",
    btn_quick_view: "Vista Ràpida",
    cart_title: "Bossa d'Alta Joieria",
    cart_empty: "La seua bossa de compra està buida.",
    cart_subtotal: "Subtotal:",
    cart_tax: "IVA (21% inclòs):",
    cart_shipping: "Enviament Assegurat:",
    cart_free: "Gratuït",
    cart_total: "Total:",
    cart_checkout_btn: "Finalitzar Comanda / Reserva",
    modal_search_title: "Cerca a la Boutique",
    modal_search_sub: "Trobe peces de joieria o seccions informatives dins la pàgina.",
    search_placeholder: "Cercar per joia, or, diamants, perles, serveis...",
    contact_title: "Concierge & Cita VIP",
    contact_subtitle: "Atenció Personalitzada",
    footer_rights: "© 2026 Aurélia Joaillerie S.L. Tots els drets reservats."
  }
};

// --- Application State ---
const state = {
  currentLang: localStorage.getItem('aurelia_lang') || 'es',
  currentCategory: 'todos',
  currentSort: 'featured',
  cart: JSON.parse(localStorage.getItem('aurelia_cart') || '[]'),
  deliveryMethod: 'pickup', // 'pickup' | 'delivery'
  paymentMethod: 'boutique', // 'boutique' | 'cash_on_delivery' | 'gateway'
  selectedStore: 'Boutique Valencia - Carrer de la Pau 14',
  discountPercent: 0,
  userSession: JSON.parse(localStorage.getItem('aurelia_user') || 'null')
};

// --- DOM Ready Initializer ---
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initLanguage();
  initHeaderScroll();
  initNavigation();
  initHamburgerMenu();
  renderProducts();
  initCatalogFilters();
  initCartDrawer();
  updateCartBadge();
  initSearchModal();
  initAuthModal();
  initQuickViewModal();
  initCheckoutFlow();
  initContactForm();
  initCookieBanner();
});

// --- Theme Management (Light / Dark) ---
function initTheme() {
  const savedTheme = localStorage.getItem('aurelia_theme') || 'dark';
  if (savedTheme === 'light') {
    document.body.classList.add('light-theme');
  } else {
    document.body.classList.remove('light-theme');
  }
  updateThemeIcons(savedTheme === 'light');

  const themeToggles = document.querySelectorAll('.theme-toggle-btn');
  themeToggles.forEach(btn => {
    btn.addEventListener('click', toggleTheme);
  });
}

function toggleTheme() {
  const isLight = document.body.classList.toggle('light-theme');
  const newTheme = isLight ? 'light' : 'dark';
  localStorage.setItem('aurelia_theme', newTheme);
  updateThemeIcons(isLight);
  showToast(isLight ? 'Modo luminoso activado' : 'Modo oscuro activado', 'gold');
}

function updateThemeIcons(isLight) {
  const sunMoonSVGs = document.querySelectorAll('.theme-icon-svg');
  sunMoonSVGs.forEach(container => {
    if (isLight) {
      // Moon Icon
      container.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>
      `;
    } else {
      // Sun Icon
      container.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="5"></circle>
          <line x1="12" y1="1" x2="12" y2="3"></line>
          <line x1="12" y1="21" x2="12" y2="23"></line>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
          <line x1="1" y1="12" x2="3" y2="12"></line>
          <line x1="21" y1="12" x2="23" y2="12"></line>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
        </svg>
      `;
    }
  });
}

// --- Language Switcher ---
function initLanguage() {
  setLanguage(state.currentLang);

  const langButtons = document.querySelectorAll('.lang-btn');
  langButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = btn.dataset.lang;
      setLanguage(lang);
    });
  });
}

function setLanguage(lang) {
  if (!TRANSLATIONS[lang]) return;
  state.currentLang = lang;
  localStorage.setItem('aurelia_lang', lang);

  // Update active state in UI
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });

  // Update all elements with data-i18n
  const dict = TRANSLATIONS[lang];
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key]) {
      el.innerHTML = dict[key];
    }
  });

  // Update placeholders
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (dict[key]) {
      el.placeholder = dict[key];
    }
  });

  // Re-render products to update any translated buttons
  renderProducts();
  renderCartDrawer();
}

// --- Header Scroll & Active Spy ---
function initHeaderScroll() {
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    updateActiveNavLink();
  });
}

function updateActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const scrollY = window.scrollY + 120;

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');

    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      document.querySelectorAll('.nav-link, .mobile-nav-link').forEach(link => {
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });
    }
  });
}

// --- Smooth Scrolling for Internal Links ---
function initNavigation() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        closeHamburgerMenu();
        
        const headerOffset = 100;
        const elementPosition = targetEl.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

// --- Hamburger Menu (Slides from Top) ---
function initHamburgerMenu() {
  const hamburgerBtn = document.querySelector('.hamburger-btn');
  const mobileMenu = document.querySelector('.mobile-menu-overlay');

  if (!hamburgerBtn || !mobileMenu) return;

  hamburgerBtn.addEventListener('click', () => {
    const isOpen = hamburgerBtn.classList.toggle('active');
    mobileMenu.classList.toggle('active', isOpen);
    document.body.classList.toggle('modal-open', isOpen);
  });

  // Close on link click
  document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', closeHamburgerMenu);
  });

  // Close on window resize > 768px
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      closeHamburgerMenu();
    }
  });

  // Mobile search button trigger
  const mobileSearchTrigger = document.querySelector('.mobile-search-trigger');
  if (mobileSearchTrigger) {
    mobileSearchTrigger.addEventListener('click', () => {
      closeHamburgerMenu();
      openSearchModal();
    });
  }
}

function closeHamburgerMenu() {
  const hamburgerBtn = document.querySelector('.hamburger-btn');
  const mobileMenu = document.querySelector('.mobile-menu-overlay');
  if (hamburgerBtn && mobileMenu) {
    hamburgerBtn.classList.remove('active');
    mobileMenu.classList.remove('active');
    document.body.classList.remove('modal-open');
  }
}

// --- Catalog Rendering & Filtering (~20 items) ---
function initCatalogFilters() {
  const filterPills = document.querySelectorAll('.filter-pill');
  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      filterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      state.currentCategory = pill.dataset.category;
      renderProducts();
    });
  });

  const sortSelect = document.getElementById('catalog-sort');
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      state.currentSort = e.target.value;
      renderProducts();
    });
  }
}

function renderProducts() {
  const container = document.getElementById('products-grid');
  if (!container) return;

  let filtered = PRODUCTS.filter(p => {
    if (state.currentCategory === 'todos') return true;
    return p.category === state.currentCategory;
  });

  // Sort
  if (state.currentSort === 'price-low') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (state.currentSort === 'price-high') {
    filtered.sort((a, b) => b.price - a.price);
  } else if (state.currentSort === 'name') {
    filtered.sort((a, b) => a.name.localeCompare(b.name));
  }

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="no-products-msg">
        <p>No se encontraron piezas en esta categoría en este momento.</p>
      </div>
    `;
    return;
  }

  const dict = TRANSLATIONS[state.currentLang];
  const quickViewLabel = dict.btn_quick_view || "Vista Rápida";
  const addCartLabel = dict.btn_add_cart || "Añadir";

  container.innerHTML = filtered.map(p => `
    <div class="product-card" data-id="${p.id}" data-category="${p.category}">
      <div class="product-img-wrap">
        <img src="${p.image}" alt="${p.name}" loading="lazy">
        <div class="product-badges">
          <span class="badge-tag highlight">${p.badge}</span>
        </div>
        <div class="product-quick-action">
          <button class="btn-quick-view" onclick="openQuickView(${p.id})">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
              <circle cx="12" cy="12" r="3"></circle>
            </svg>
            ${quickViewLabel}
          </button>
        </div>
      </div>
      <div class="product-info">
        <span class="product-category">${p.category}</span>
        <h3 class="product-title">${p.name}</h3>
        <p class="product-specs">${p.specs}</p>
        <div class="product-bottom-row">
          <div class="product-price">
            ${p.oldPrice ? `<span class="price-old">${formatCurrency(p.oldPrice)}</span>` : ''}
            <span class="price-current">${formatCurrency(p.price)}</span>
          </div>
          <button class="btn-add-cart" onclick="addToCart(${p.id})" title="${addCartLabel}" aria-label="Añadir ${p.name}">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <path d="M16 10a4 4 0 0 1-8 0"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

// --- Cart System & Drawer ---
function initCartDrawer() {
  const openCartBtns = document.querySelectorAll('.open-cart-btn');
  const closeCartBtn = document.querySelector('.close-cart-btn');
  const cartOverlay = document.querySelector('.cart-drawer-overlay');

  openCartBtns.forEach(btn => {
    btn.addEventListener('click', openCartDrawer);
  });

  if (closeCartBtn) {
    closeCartBtn.addEventListener('click', closeCartDrawer);
  }

  if (cartOverlay) {
    cartOverlay.addEventListener('click', (e) => {
      if (e.target === cartOverlay) {
        closeCartDrawer();
      }
    });
  }

  // Checkout trigger
  const checkoutTrigger = document.getElementById('cart-checkout-btn');
  if (checkoutTrigger) {
    checkoutTrigger.addEventListener('click', () => {
      if (state.cart.length === 0) {
        showToast('Su bolsa de compras está vacía', 'gold');
        return;
      }
      closeCartDrawer();
      openCheckoutModal();
    });
  }
}

function openCartDrawer() {
  const overlay = document.querySelector('.cart-drawer-overlay');
  if (overlay) {
    renderCartDrawer();
    overlay.classList.add('active');
    document.body.classList.add('modal-open');
  }
}

function closeCartDrawer() {
  const overlay = document.querySelector('.cart-drawer-overlay');
  if (overlay) {
    overlay.classList.remove('active');
    document.body.classList.remove('modal-open');
  }
}

function addToCart(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const existing = state.cart.find(item => item.id === productId);
  if (existing) {
    existing.qty += 1;
  } else {
    state.cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      specs: product.specs,
      qty: 1
    });
  }

  saveCart();
  updateCartBadge();
  showToast(`"${product.name}" añadido a la bolsa`, 'success');
  openCartDrawer();
}

function updateCartQty(productId, delta) {
  const itemIndex = state.cart.findIndex(i => i.id === productId);
  if (itemIndex > -1) {
    state.cart[itemIndex].qty += delta;
    if (state.cart[itemIndex].qty <= 0) {
      state.cart.splice(itemIndex, 1);
    }
  }
  saveCart();
  renderCartDrawer();
  updateCartBadge();
}

function removeFromCart(productId) {
  state.cart = state.cart.filter(item => item.id !== productId);
  saveCart();
  renderCartDrawer();
  updateCartBadge();
  showToast('Pieza eliminada de la bolsa');
}

function saveCart() {
  localStorage.setItem('aurelia_cart', JSON.stringify(state.cart));
}

function updateCartBadge() {
  const count = state.cart.reduce((sum, item) => sum + item.qty, 0);
  document.querySelectorAll('.cart-badge').forEach(badge => {
    badge.textContent = count;
    badge.style.display = count > 0 ? 'flex' : 'none';
  });
  const drawerPill = document.querySelector('.cart-drawer-header .count-pill');
  if (drawerPill) {
    drawerPill.textContent = `${count} ${count === 1 ? 'pieza' : 'piezas'}`;
  }
}

function calculateCartTotals() {
  const subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const discountAmount = subtotal * (state.discountPercent / 100);
  const discountedSubtotal = subtotal - discountAmount;
  const tax = discountedSubtotal * 0.21;
  const shipping = state.deliveryMethod === 'delivery' ? 0 : 0; // Armored delivery is complimentary for luxury orders!
  const total = discountedSubtotal;

  return { subtotal, discountAmount, tax, shipping, total };
}

function renderCartDrawer() {
  const container = document.getElementById('cart-items-wrap');
  if (!container) return;

  if (state.cart.length === 0) {
    container.innerHTML = `
      <div class="cart-empty-state">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <path d="M16 10a4 4 0 0 1-8 0"></path>
        </svg>
        <p>${TRANSLATIONS[state.currentLang].cart_empty}</p>
      </div>
    `;
    updateDrawerFooter(0, 0, 0);
    return;
  }

  container.innerHTML = state.cart.map(item => `
    <div class="cart-item">
      <img src="${item.image}" alt="${item.name}" class="cart-item-img">
      <div class="cart-item-info">
        <h4 class="cart-item-title">${item.name}</h4>
        <div class="cart-item-price">${formatCurrency(item.price)}</div>
        <div class="cart-qty-row">
          <div class="cart-qty-box">
            <button class="qty-btn" onclick="updateCartQty(${item.id}, -1)">−</button>
            <span class="qty-val">${item.qty}</span>
            <button class="qty-btn" onclick="updateCartQty(${item.id}, 1)">+</button>
          </div>
        </div>
      </div>
      <button class="cart-item-remove" onclick="removeFromCart(${item.id})" title="Eliminar">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    </div>
  `).join('');

  const totals = calculateCartTotals();
  updateDrawerFooter(totals.subtotal, totals.tax, totals.total);
}

function updateDrawerFooter(subtotal, tax, total) {
  const subtotalEl = document.getElementById('drawer-subtotal');
  const taxEl = document.getElementById('drawer-tax');
  const totalEl = document.getElementById('drawer-total');

  if (subtotalEl) subtotalEl.textContent = formatCurrency(subtotal);
  if (taxEl) taxEl.textContent = formatCurrency(tax);
  if (totalEl) totalEl.textContent = formatCurrency(total);
}

// --- Checkout Modal & Booking Flow ---
function initCheckoutFlow() {
  // Delivery mode toggle (Pickup vs Delivery)
  const deliveryCards = document.querySelectorAll('.delivery-opt-card');
  deliveryCards.forEach(card => {
    card.addEventListener('click', () => {
      deliveryCards.forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      state.deliveryMethod = card.dataset.method;

      const pickupFields = document.getElementById('checkout-pickup-fields');
      const deliveryFields = document.getElementById('checkout-delivery-fields');
      if (state.deliveryMethod === 'pickup') {
        if (pickupFields) pickupFields.style.display = 'block';
        if (deliveryFields) deliveryFields.style.display = 'none';
      } else {
        if (pickupFields) pickupFields.style.display = 'none';
        if (deliveryFields) deliveryFields.style.display = 'block';
      }
    });
  });

  // Payment mode toggle
  const paymentItems = document.querySelectorAll('.payment-opt-item');
  paymentItems.forEach(item => {
    item.addEventListener('click', () => {
      paymentItems.forEach(i => {
        i.classList.remove('selected');
        const radio = i.querySelector('input[type="radio"]');
        if (radio) radio.checked = false;
      });
      item.classList.add('selected');
      const radio = item.querySelector('input[type="radio"]');
      if (radio) radio.checked = true;
      state.paymentMethod = item.dataset.payment;
    });
  });

  // Store select
  const storeSelect = document.getElementById('pickup-store-select');
  if (storeSelect) {
    storeSelect.addEventListener('change', (e) => {
      state.selectedStore = e.target.value;
    });
  }

  // Promo code apply
  const applyPromoBtn = document.getElementById('btn-apply-promo');
  if (applyPromoBtn) {
    applyPromoBtn.addEventListener('click', () => {
      const codeInput = document.getElementById('promo-code-input');
      const code = codeInput ? codeInput.value.trim().toUpperCase() : '';
      if (code === 'AURELIA10') {
        state.discountPercent = 10;
        showToast('Código VIP AURELIA10 aplicado: 10% de cortesía', 'gold');
        renderCheckoutSummary();
      } else if (code) {
        showToast('Código de cortesía no válido o expirado', 'danger');
      }
    });
  }

  // Submit checkout
  const submitOrderBtn = document.getElementById('btn-submit-order');
  if (submitOrderBtn) {
    submitOrderBtn.addEventListener('click', handleOrderSubmission);
  }
}

function openCheckoutModal() {
  renderCheckoutSummary();
  openModal('checkout-modal');
}

function renderCheckoutSummary() {
  const totals = calculateCartTotals();
  const summaryList = document.getElementById('checkout-items-summary');
  if (summaryList) {
    summaryList.innerHTML = state.cart.map(item => `
      <div style="display:flex; justify-content:space-between; margin-bottom:8px; font-size:0.85rem;">
        <span>${item.qty}x ${item.name}</span>
        <span style="color:var(--accent-gold); font-weight:600;">${formatCurrency(item.price * item.qty)}</span>
      </div>
    `).join('');
  }

  const subtotalEl = document.getElementById('checkout-subtotal');
  const discountRow = document.getElementById('checkout-discount-row');
  const discountVal = document.getElementById('checkout-discount-val');
  const totalEl = document.getElementById('checkout-final-total');

  if (subtotalEl) subtotalEl.textContent = formatCurrency(totals.subtotal);
  if (discountRow && discountVal) {
    if (totals.discountAmount > 0) {
      discountRow.style.display = 'flex';
      discountVal.textContent = `-${formatCurrency(totals.discountAmount)}`;
    } else {
      discountRow.style.display = 'none';
    }
  }
  if (totalEl) totalEl.textContent = formatCurrency(totals.total);
}

function handleOrderSubmission(e) {
  e.preventDefault();
  const name = document.getElementById('order-name')?.value.trim();
  const email = document.getElementById('order-email')?.value.trim();
  const phone = document.getElementById('order-phone')?.value.trim();

  if (!name || !email || !phone) {
    showToast('Por favor, complete nombre, email y teléfono de contacto', 'danger');
    return;
  }

  // Check if chosen payment method is Online Gateway
  if (state.paymentMethod === 'gateway') {
    closeModal('checkout-modal');
    openPaymentGatewayModal();
  } else {
    // Immediate store booking or COD
    completeOrder();
  }
}

function openPaymentGatewayModal() {
  const totals = calculateCartTotals();
  const gatewayAmountEl = document.getElementById('gateway-amount');
  if (gatewayAmountEl) {
    gatewayAmountEl.textContent = formatCurrency(totals.total);
  }

  const gatewayDetailsEl = document.getElementById('gateway-breakdown-details');
  if (gatewayDetailsEl) {
    gatewayDetailsEl.innerHTML = `
      <div style="display:flex; justify-content:space-between; font-size:0.85rem; margin-bottom:6px;">
        <span>Concepto:</span>
        <span>Compra Joyas Aurélia (${state.cart.length} ref.)</span>
      </div>
      <div style="display:flex; justify-content:space-between; font-size:0.85rem; margin-bottom:6px;">
        <span>Método de Entrega:</span>
        <span>${state.deliveryMethod === 'pickup' ? 'Recogida en ' + state.selectedStore : 'Envío Blindado a Domicilio'}</span>
      </div>
      <div style="display:flex; justify-content:space-between; font-size:0.85rem; margin-bottom:6px;">
        <span>IVA (21%):</span>
        <span>${formatCurrency(totals.tax)}</span>
      </div>
    `;
  }

  openModal('gateway-modal');

  // Gateway form submit button
  const confirmPaymentBtn = document.getElementById('btn-confirm-gateway-payment');
  if (confirmPaymentBtn) {
    confirmPaymentBtn.onclick = () => {
      confirmPaymentBtn.disabled = true;
      confirmPaymentBtn.innerHTML = 'Verificando con pasarela bancaria...';
      setTimeout(() => {
        confirmPaymentBtn.disabled = false;
        confirmPaymentBtn.innerHTML = 'Confirmar y Pagar';
        closeModal('gateway-modal');
        completeOrder(true);
      }, 1600);
    };
  }
}

function completeOrder(isOnlinePaid = false) {
  const bookingCode = 'AUR-' + Math.floor(100000 + Math.random() * 900000);
  const totals = calculateCartTotals();

  let paymentText = '';
  if (isOnlinePaid || state.paymentMethod === 'gateway') {
    paymentText = 'Pago verificado mediante pasarela bancaria segura.';
  } else if (state.paymentMethod === 'boutique') {
    paymentText = 'Pago presencial a realizar en la Boutique al retirar sus piezas con su asesor VIP.';
  } else {
    paymentText = 'Pago contra entrega en mano a la recepción del mensajero blindado.';
  }

  let deliveryText = '';
  if (state.deliveryMethod === 'pickup') {
    deliveryText = `Punto de recogida: <strong>${state.selectedStore}</strong>.`;
  } else {
    const address = document.getElementById('order-address')?.value || 'Dirección indicada';
    deliveryText = `Envío blindado programado a: <strong>${address}</strong>.`;
  }

  // Display Confirmation Popup
  const confContent = document.getElementById('order-confirm-content');
  if (confContent) {
    confContent.innerHTML = `
      <div style="text-align:center; padding:10px 0;">
        <div style="width:60px; height:60px; border-radius:50%; background:var(--accent-gold-bg); border:1px solid var(--border-gold); display:flex; align-items:center; justify-content:center; margin:0 auto 16px auto; color:var(--accent-gold);">
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>
        <h3 style="font-family:var(--font-serif); font-size:1.6rem; margin-bottom:8px;">¡Enhorabuena por su adquisición!</h3>
        <p style="font-size:0.85rem; color:var(--text-secondary); margin-bottom:20px;">
          Su solicitud ha quedado registrada bajo el código de reserva de alta joyería:
        </p>
        <div style="background:var(--bg-secondary); border:1px dashed var(--accent-gold); padding:12px; border-radius:var(--radius-sm); font-family:monospace; font-size:1.3rem; letter-spacing:0.15em; color:var(--accent-gold); font-weight:bold; margin-bottom:22px;">
          ${bookingCode}
        </div>
        <div style="text-align:left; background:var(--bg-secondary); padding:18px; border-radius:var(--radius-sm); border:1px solid var(--border-subtle); font-size:0.85rem; line-height:1.6; margin-bottom:24px;">
          <p style="margin-bottom:8px;">${deliveryText}</p>
          <p style="margin-bottom:8px;">${paymentText}</p>
          <p style="margin-bottom:0; color:var(--accent-gold); font-weight:600;">Importe Total: ${formatCurrency(totals.total)}</p>
        </div>
        <p style="font-size:0.8rem; color:var(--text-muted); margin-bottom:24px;">
          Hemos enviado un correo electrónico de confirmación con el certificado de garantía previa y la asignación de su gemólogo personal.
        </p>
        <button class="btn btn-primary" style="width:100%;" onclick="closeModal('confirmation-modal')">Continuar en la Boutique</button>
      </div>
    `;
  }

  closeModal('checkout-modal');
  openModal('confirmation-modal');

  // Clear Cart
  state.cart = [];
  saveCart();
  updateCartBadge();
  renderCartDrawer();
}

// --- Quick View Modal ---
function initQuickViewModal() {
  // close handled by modal helper
}

function openQuickView(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const content = document.getElementById('quickview-content');
  if (content) {
    content.innerHTML = `
      <div class="quickview-grid">
        <div>
          <img src="${product.image}" alt="${product.name}" class="quickview-img">
        </div>
        <div class="quickview-info">
          <span class="badge" style="margin-bottom:12px;">${product.badge}</span>
          <h3>${product.name}</h3>
          <div class="quickview-price">${formatCurrency(product.price)}</div>
          <p class="quickview-desc">${product.desc}</p>
          <div class="quickview-spec-list">
            <div>
              <span>Categoría:</span>
              <strong style="text-transform:capitalize;">${product.category}</strong>
            </div>
            <div>
              <span>Especificaciones:</span>
              <strong>${product.specs}</strong>
            </div>
            <div>
              <span>Certificación:</span>
              <strong>GIA / HRD Gemological Institute</strong>
            </div>
            <div>
              <span>Garantía:</span>
              <strong>Vitalicia con Mantenimiento Bianual</strong>
            </div>
          </div>
          <button class="btn btn-primary" style="width:100%;" onclick="addToCart(${product.id}); closeModal('quickview-modal');">
            Añadir a la Bolsa • ${formatCurrency(product.price)}
          </button>
        </div>
      </div>
    `;
  }

  openModal('quickview-modal');
}

// --- Search System with Live Highlighting & Page Crawling ---
function initSearchModal() {
  const openSearchBtns = document.querySelectorAll('.open-search-btn');
  const searchInput = document.getElementById('site-search-input');
  const clearBtn = document.querySelector('.search-clear-btn');

  openSearchBtns.forEach(btn => {
    btn.addEventListener('click', openSearchModal);
  });

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.trim();
      if (clearBtn) clearBtn.classList.toggle('visible', query.length > 0);
      handleSearch(query);
    });
  }

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      if (searchInput) {
        searchInput.value = '';
        searchInput.focus();
        clearBtn.classList.remove('visible');
        handleSearch('');
      }
    });
  }
}

function openSearchModal() {
  openModal('search-modal');
  const input = document.getElementById('site-search-input');
  if (input) {
    input.value = '';
    setTimeout(() => input.focus(), 150);
    handleSearch('');
  }
}

function handleSearch(query) {
  const resultsContainer = document.getElementById('search-results-list');
  if (!resultsContainer) return;

  // Clear any existing highlights in the page
  removeSearchHighlights();

  if (!query || query.length < 2) {
    resultsContainer.innerHTML = `
      <p style="font-size:0.85rem; color:var(--text-muted); text-align:center; padding:20px;">
        Escriba al menos 2 letras para buscar joyas, diamantes, materiales o servicios.
      </p>
    `;
    return;
  }

  const q = query.toLowerCase();

  // Search inside catalog products
  const matchedProducts = PRODUCTS.filter(p => 
    p.name.toLowerCase().includes(q) ||
    p.specs.toLowerCase().includes(q) ||
    p.desc.toLowerCase().includes(q) ||
    p.category.toLowerCase().includes(q)
  );

  // Search inside page text sections
  const searchableSections = [
    { id: 'atelier', title: 'El Atelier y Tradición Artesana', desc: 'Milenaria artesanía y diamantes éticos seleccionados por gemólogos.' },
    { id: 'servicios', title: 'Servicios de Lujo & Encargos', desc: 'Diseño a medida, alta restauración y tasación oficial.' },
    { id: 'boutiques', title: 'Nuestras Boutiques', desc: 'Espacios en Valencia, Madrid, Barcelona y París.' },
    { id: 'contacto', title: 'Contacto & Cita VIP', desc: 'Solicitud de cita privada con un asesor gemológico en showroom.' }
  ];

  const matchedSections = searchableSections.filter(s => 
    s.title.toLowerCase().includes(q) || s.desc.toLowerCase().includes(q)
  );

  if (matchedProducts.length === 0 && matchedSections.length === 0) {
    resultsContainer.innerHTML = `
      <p style="font-size:0.85rem; color:var(--text-muted); text-align:center; padding:20px;">
        No se encontraron coincidencias para "<strong>${escapeHtml(query)}</strong>".
      </p>
    `;
    return;
  }

  let html = '';

  if (matchedProducts.length > 0) {
    html += `<div style="font-size:0.75rem; letter-spacing:0.1em; text-transform:uppercase; color:var(--accent-gold); font-weight:700; margin-bottom:8px;">Piezas Encontradas (${matchedProducts.length})</div>`;
    html += matchedProducts.slice(0, 5).map(p => `
      <div class="search-result-item" onclick="selectSearchResultProduct(${p.id})">
        <img src="${p.image}" alt="${p.name}" class="search-result-thumb">
        <div class="search-result-info">
          <div class="search-result-title">${highlightQuery(p.name, query)}</div>
          <div class="search-result-meta">${p.specs} • <strong>${formatCurrency(p.price)}</strong></div>
        </div>
      </div>
    `).join('');
  }

  if (matchedSections.length > 0) {
    html += `<div style="font-size:0.75rem; letter-spacing:0.1em; text-transform:uppercase; color:var(--accent-gold); font-weight:700; margin-top:16px; margin-bottom:8px;">Secciones de la Web</div>`;
    html += matchedSections.map(s => `
      <div class="search-result-item" onclick="jumpToSection('${s.id}', '${escapeHtml(query)}')">
        <div style="width:36px; height:36px; border-radius:4px; background:var(--accent-gold-bg); display:flex; align-items:center; justify-content:center; color:var(--accent-gold); flex-shrink:0;">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </div>
        <div class="search-result-info">
          <div class="search-result-title">${highlightQuery(s.title, query)}</div>
          <div style="font-size:0.76rem; color:var(--text-muted);">${s.desc}</div>
        </div>
      </div>
    `).join('');
  }

  resultsContainer.innerHTML = html;

  // Highlight matches directly on the page text
  highlightPageText(query);
}

function selectSearchResultProduct(productId) {
  closeModal('search-modal');
  openQuickView(productId);
}

function jumpToSection(sectionId, query) {
  closeModal('search-modal');
  const target = document.getElementById(sectionId);
  if (target) {
    const headerOffset = 100;
    const elementPosition = target.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });

    if (query) {
      showToast(`Coincidencia resaltada en sección ${sectionId}`, 'gold');
    }
  }
}

function highlightQuery(text, query) {
  const regex = new RegExp(`(${escapeRegex(query)})`, 'gi');
  return text.replace(regex, '<mark class="search-match">$1</mark>');
}

function highlightPageText(query) {
  if (!query || query.length < 2) return;
  const sections = document.querySelectorAll('section p, section h2, section h3');
  const regex = new RegExp(`(${escapeRegex(query)})`, 'gi');

  sections.forEach(node => {
    // Avoid double marking or marking in inputs
    if (node.querySelector('.search-match') || node.children.length > 2) return;
    if (regex.test(node.textContent)) {
      node.dataset.originalText = node.dataset.originalText || node.innerHTML;
      node.innerHTML = node.dataset.originalText.replace(regex, '<mark class="search-match">$1</mark>');
    }
  });
}

function removeSearchHighlights() {
  document.querySelectorAll('mark.search-match').forEach(mark => {
    const parent = mark.parentNode;
    if (parent) {
      parent.replaceChild(document.createTextNode(mark.textContent), mark);
      parent.normalize();
    }
  });
}

// --- User Auth Modal (Login / Register) ---
function initAuthModal() {
  const openAuthBtns = document.querySelectorAll('.open-auth-btn');
  openAuthBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      openModal('auth-modal');
    });
  });

  const authTabs = document.querySelectorAll('.auth-tab');
  authTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      authTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const mode = tab.dataset.mode;
      const loginForm = document.getElementById('login-form');
      const registerForm = document.getElementById('register-form');

      if (mode === 'login') {
        if (loginForm) loginForm.style.display = 'flex';
        if (registerForm) registerForm.style.display = 'none';
      } else {
        if (loginForm) loginForm.style.display = 'none';
        if (registerForm) registerForm.style.display = 'flex';
      }
    });
  });

  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('login-email').value;
      const user = { name: email.split('@')[0], email };
      state.userSession = user;
      localStorage.setItem('aurelia_user', JSON.stringify(user));
      closeModal('auth-modal');
      showToast(`Bienvenido a su cuenta VIP, ${user.name}`, 'gold');
    });
  }

  const registerForm = document.getElementById('register-form');
  if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('reg-name').value;
      const email = document.getElementById('reg-email').value;
      const user = { name, email };
      state.userSession = user;
      localStorage.setItem('aurelia_user', JSON.stringify(user));
      closeModal('auth-modal');
      showToast(`Cuenta VIP creada con éxito. Bienvenido, ${user.name}`, 'gold');
    });
  }
}

// --- Contact Form ---
function initContactForm() {
  const contactForm = document.getElementById('vip-contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('c-name')?.value;
      const boutique = document.getElementById('c-boutique')?.value;
      showToast(`Solicitud de cita enviada. Nuestro concierge de ${boutique} le contactará en breve.`, 'success');
      contactForm.reset();
    });
  }
}

// --- Cookie Consent Banner ---
function initCookieBanner() {
  const cookieBanner = document.querySelector('.cookie-banner');
  const consent = localStorage.getItem('aurelia_cookie_consent');

  if (!consent && cookieBanner) {
    setTimeout(() => {
      cookieBanner.classList.add('active');
    }, 1200);
  }

  const acceptBtn = document.getElementById('btn-accept-cookies');
  const rejectBtn = document.getElementById('btn-reject-cookies');

  if (acceptBtn) {
    acceptBtn.addEventListener('click', () => {
      localStorage.setItem('aurelia_cookie_consent', 'accepted');
      if (cookieBanner) cookieBanner.classList.remove('active');
      showToast('Preferencias de cookies guardadas');
    });
  }

  if (rejectBtn) {
    rejectBtn.addEventListener('click', () => {
      localStorage.setItem('aurelia_cookie_consent', 'essential_only');
      if (cookieBanner) cookieBanner.classList.remove('active');
      showToast('Solo cookies técnicas esenciales activadas');
    });
  }
}

// --- Global Modal Helpers ---
function openModal(modalId) {
  const backdrop = document.getElementById(modalId);
  if (backdrop) {
    backdrop.classList.add('active');
    document.body.classList.add('modal-open');
  }
}

function closeModal(modalId) {
  const backdrop = document.getElementById(modalId);
  if (backdrop) {
    backdrop.classList.remove('active');
    document.body.classList.remove('modal-open');
  }
}

// Wire backdrop click to close
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('modal-backdrop')) {
    e.target.classList.remove('active');
    document.body.classList.remove('modal-open');
    removeSearchHighlights();
  }
});

// ESC key to close any active modal
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal-backdrop.active').forEach(b => b.classList.remove('active'));
    closeCartDrawer();
    closeHamburgerMenu();
    document.body.classList.remove('modal-open');
    removeSearchHighlights();
  }
});

// --- Toast Notification System ---
function showToast(message, type = 'gold') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;

  const iconSvg = type === 'success'
    ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>`
    : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>`;

  toast.innerHTML = `${iconSvg} <span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => toast.classList.add('show'), 20);

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, 4000);
}

// --- Utility Helpers ---
function formatCurrency(amount) {
  return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(amount);
}

function escapeHtml(str) {
  return str.replace(/[&<>'"]/g, tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag));
}

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
