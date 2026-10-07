/**
 * ==========================================================================
 * SCRIPT.JS - PURE JAVASCRIPT CUSTOM ENGINE
 * Modern, Minimalist, Responsive & Functional Department Store Landing Page
 * ==========================================================================
 */

// I18N DICTIONARY - Complete dictionary for Spanish, English, and Valencian
const TRANSLATIONS = {
  es: {
    // Top bar
    "top-phone": "Tel: +34 960 123 456",
    "top-email": "contacto@aurorastore.com",
    "top-promo": "Envío gratis a partir de 100€ | Devoluciones 30 días",
    // Navigation
    "nav-home": "Inicio",
    "nav-about": "Nosotros",
    "nav-catalog": "Catálogo",
    "nav-contact": "Contacto",
    // Hero
    "hero-tag": "NUEVA COLECCIÓN OTOÑO / INVIERNO",
    "hero-title": "Moda que cuenta <span>tu historia</span>",
    "hero-desc": "Explora nuestra sofisticada selección de prendas por departamentos diseñadas para todas las edades. Un estilo atemporal para cada miembro de la familia.",
    "btn-shop": "Comprar Ahora",
    "btn-more": "Descubrir",
    "scroll-explore": "Explorar",
    // About
    "about-sub": "Nuestra Filosofía",
    "about-title": "Diseño moderno y <span>compromiso real</span>",
    "feature-1-title": "Calidad Premium",
    "feature-1-desc": "Seleccionamos tejidos naturales duraderos y respetuosos con el medio ambiente.",
    "feature-2-title": "Sostenibilidad",
    "feature-2-desc": "Procesos de fabricación éticos y reducción activa de emisiones de carbono.",
    "feature-3-title": "Diseño Local",
    "feature-3-desc": "Prendas concebidas en Valencia combinando elegancia mediterránea y funcionalidad.",
    "about-p1": "En <span>Aurora Department Store</span>, entendemos que vestir bien es una forma de expresión personal y de respeto hacia los demás y el entorno. Desde hace más de una década, vestimos a tres generaciones de familias con piezas icónicas.",
    "about-p2": "Cada una de nuestras colecciones cuenta con departamentos especializados para Mujer, Hombre, Niños y Accesorios, garantizando que cada prenda que adquieras sea el equilibrio perfecto entre tendencia, confort y durabilidad excepcional.",
    "stat-1-lbl": "Años de Tradición",
    "stat-2-lbl": "Departamentos",
    "stat-3-lbl": "Clientes Felices",
    // Catalog
    "catalog-sub": "Explora el Catálogo",
    "catalog-title": "Nuestros <span>Departamentos</span>",
    "tab-all": "Todos",
    "tab-women": "Mujer",
    "tab-men": "Hombre",
    "tab-kids": "Niños",
    "tab-acc": "Accesorios",
    "size-label": "Tallas:",
    "btn-add-cart": "Añadir al Carrito",
    // Contact
    "contact-sub": "Ponte en Contacto",
    "contact-title": "Estamos para <span>ayudarte</span>",
    "contact-desc": "¿Tienes dudas sobre una talla, tu envío o quieres concertar una cita de asesoramiento personalizado gratuito en tienda? Nuestro equipo de estilistas está a tu disposición.",
    "contact-h-loc": "Nuestra Tienda",
    "contact-d-loc": "Carrer de Colón, 45, 46004 Valencia, España",
    "contact-h-hours": "Horario Comercial",
    "contact-d-hours": "Lunes a Sábado: 10:00 - 21:00",
    "contact-h-phone": "Atención Telefónica",
    "contact-lbl-name": "Nombre Completo",
    "contact-lbl-email": "Correo Electrónico",
    "contact-lbl-msg": "Tu Mensaje",
    "btn-send": "Enviar Mensaje",
    // Cart
    "cart-title": "Tu Carrito",
    "cart-empty": "Tu carrito está vacío",
    "cart-subtotal": "Subtotal",
    "cart-shipping-cost": "Envío",
    "cart-total": "Total",
    "btn-checkout": "Proceder al Pago",
    // Checkout Modal
    "checkout-title": "Finalizar Compra",
    "checkout-sec-del": "1. Método de Entrega",
    "del-collect": "Recoger en Tienda",
    "del-collect-desc": "En Carrer de Colón, Valencia",
    "del-collect-cost": "Gratis",
    "del-shipping": "Envío a domicilio",
    "del-shipping-desc": "Entrega en 24/48 horas",
    "del-shipping-cost": "5,99 €",
    "checkout-sec-info": "2. Información del Cliente",
    "checkout-lbl-tel": "Teléfono de Contacto",
    "checkout-lbl-address": "Dirección Completo (solo envíos)",
    "checkout-lbl-city": "Ciudad / Código Postal",
    "checkout-sec-pay": "3. Método de Pago",
    "pay-collect": "Pagar al recoger en tienda",
    "pay-delivery": "Pagar al recibir en domicilio",
    "pay-gateway": "Pasarela de pago online (Tarjeta)",
    "checkout-sec-summary": "Resumen del Pedido",
    "btn-order-confirm": "Confirmar y Pagar",
    // Gateway Emulation
    "gateway-title": "Pasarela de Pago Aurora",
    "gateway-lbl-card": "Número de Tarjeta",
    "gateway-lbl-expiry": "Fecha Expiración",
    "gateway-btn-pay": "Pagar de forma Segura",
    // Success Modal
    "success-title": "¡Pedido Confirmado!",
    "success-desc": "Muchas gracias por tu compra. Tu pedido ha sido registrado con éxito. Hemos enviado un correo de confirmación con los detalles y el código de seguimiento de tu orden.",
    "btn-success-close": "Volver a la tienda",
    // Login
    "login-title": "Acceso de Clientes",
    "login-lbl-pass": "Contraseña",
    "login-btn-submit": "Iniciar Sesión",
    // Cookies
    "cookie-text": "Utilizamos cookies de primera mano para mejorar tu experiencia de compra y personalizar el contenido. Al continuar navegando, aceptas nuestra <a href='#'>Política de Cookies</a>.",
    "cookie-accept": "Aceptar",
    "cookie-deny": "Rechazar",
    // Search
    "search-placeholder": "Escribe para buscar en la web...",
    "search-tip": "Pulsa ENTER o haz clic fuera para salir. Buscaremos y resaltaremos las coincidencias en la landing.",
    "search-not-found": "No se encontraron coincidencias.",
    "search-matches": "coincidencia(s) encontrada(s) y resaltada(s)."
  },
  en: {
    // Top bar
    "top-phone": "Phone: +34 960 123 456",
    "top-email": "contact@aurorastore.com",
    "top-promo": "Free shipping over 100€ | 30 days returns",
    // Navigation
    "nav-home": "Home",
    "nav-about": "About",
    "nav-catalog": "Catalog",
    "nav-contact": "Contact",
    // Hero
    "hero-tag": "NEW AUTUMN / WINTER COLLECTION",
    "hero-title": "Fashion that tells <span>your story</span>",
    "hero-desc": "Explore our sophisticated selection of items by departments designed for all ages. Timeless style for every member of the family.",
    "btn-shop": "Shop Now",
    "btn-more": "Discover",
    "scroll-explore": "Explore",
    // About
    "about-sub": "Our Philosophy",
    "about-title": "Modern design & <span>real commitment</span>",
    "feature-1-title": "Premium Quality",
    "feature-1-desc": "We select natural, durable, and environmentally friendly textiles.",
    "feature-2-title": "Sustainability",
    "feature-2-desc": "Ethical manufacturing processes and active carbon footprint reduction.",
    "feature-3-title": "Local Design",
    "feature-3-desc": "Garments designed in Valencia combining Mediterranean elegance and usability.",
    "about-p1": "At <span>Aurora Department Store</span>, we understand that dressing well is a form of self-expression and respect for others and our planet. For over a decade, we have clothed three generations with iconic pieces.",
    "about-p2": "Each of our collections features specialized departments for Women, Men, Kids, and Accessories, ensuring every item you acquire is the perfect balance between style, comfort, and exceptional durability.",
    "stat-1-lbl": "Years of Tradition",
    "stat-2-lbl": "Departments",
    "stat-3-lbl": "Happy Clients",
    // Catalog
    "catalog-sub": "Explore Catalog",
    "catalog-title": "Our <span>Departments</span>",
    "tab-all": "All",
    "tab-women": "Women",
    "tab-men": "Men",
    "tab-kids": "Kids",
    "tab-acc": "Accessories",
    "size-label": "Sizes:",
    "btn-add-cart": "Add to Cart",
    // Contact
    "contact-sub": "Get in Touch",
    "contact-title": "We are here <span>to help</span>",
    "contact-desc": "Do you have doubts about a size, shipping, or want to schedule a free personal styling session in store? Our stylist team is at your disposal.",
    "contact-h-loc": "Our Store",
    "contact-d-loc": "Carrer de Colón, 45, 46004 Valencia, Spain",
    "contact-h-hours": "Store Hours",
    "contact-d-hours": "Monday to Saturday: 10:00 - 21:00",
    "contact-h-phone": "Phone Customer Support",
    "contact-lbl-name": "Full Name",
    "contact-lbl-email": "Email Address",
    "contact-lbl-msg": "Your Message",
    "btn-send": "Send Message",
    // Cart
    "cart-title": "Your Cart",
    "cart-empty": "Your cart is empty",
    "cart-subtotal": "Subtotal",
    "cart-shipping-cost": "Shipping",
    "cart-total": "Total",
    "btn-checkout": "Proceed to Checkout",
    // Checkout Modal
    "checkout-title": "Checkout",
    "checkout-sec-del": "1. Delivery Method",
    "del-collect": "Pick up in Store",
    "del-collect-desc": "At Carrer de Colón, Valencia",
    "del-collect-cost": "Free",
    "del-shipping": "Home Delivery",
    "del-shipping-desc": "Delivery in 24/48 hours",
    "del-shipping-cost": "5.99 €",
    "checkout-sec-info": "2. Customer Information",
    "checkout-lbl-tel": "Contact Phone",
    "checkout-lbl-address": "Full Address (shipping only)",
    "checkout-lbl-city": "City / Postal Code",
    "checkout-sec-pay": "3. Payment Method",
    "pay-collect": "Pay on collection in store",
    "pay-delivery": "Pay cash on delivery at home",
    "pay-gateway": "Online Secure Gateway (Card)",
    "checkout-sec-summary": "Order Summary",
    "btn-order-confirm": "Confirm & Pay",
    // Gateway Emulation
    "gateway-title": "Aurora Payment Gateway",
    "gateway-lbl-card": "Card Number",
    "gateway-lbl-expiry": "Expiration Date",
    "gateway-btn-pay": "Pay Securely Now",
    // Success Modal
    "success-title": "Order Confirmed!",
    "success-desc": "Thank you for your purchase. Your order has been placed successfully. We have sent a confirmation email with all the details and the tracking code.",
    "btn-success-close": "Back to store",
    // Login
    "login-title": "Customer Login",
    "login-lbl-pass": "Password",
    "login-btn-submit": "Log In",
    // Cookies
    "cookie-text": "We use first-party cookies to improve your shopping experience and personalize content. By continuing to browse, you accept our <a href='#'>Cookies Policy</a>.",
    "cookie-accept": "Accept",
    "cookie-deny": "Deny",
    // Search
    "search-placeholder": "Type to search on this page...",
    "search-tip": "Press ENTER or click outside to exit. We will search and highlight occurrences across the page.",
    "search-not-found": "No matches found.",
    "search-matches": "match(es) found and highlighted."
  },
  val: {
    // Top bar
    "top-phone": "Tel: +34 960 123 456",
    "top-email": "contacte@aurorastore.com",
    "top-promo": "Enviament gratuït a partir de 100€ | Devolucions 30 dies",
    // Navigation
    "nav-home": "Inici",
    "nav-about": "Nosaltres",
    "nav-catalog": "Catàleg",
    "nav-contact": "Contacte",
    // Hero
    "hero-tag": "NOVA COL·LECCIÓ TARDOR / HIVERN",
    "hero-title": "Moda que compta <span>la teua història</span>",
    "hero-desc": "Explora la nostra sofisticada selecció de peces per departaments dissenyades per a totes les edats. Un estil atemporal per a cada membre de la família.",
    "btn-shop": "Comprar Ara",
    "btn-more": "Descobrir",
    "scroll-explore": "Explorar",
    // About
    "about-sub": "La Nostra Filosofia",
    "about-title": "Disseny modern i <span>compromís real</span>",
    "feature-1-title": "Qualitat Premium",
    "feature-1-desc": "Seleccionem teixits naturals duradors i respectuosos amb el medi ambient.",
    "feature-2-title": "Sostenibilitat",
    "feature-2-desc": "Processos de fabricació ètics i reducció activa d'emissions de carboni.",
    "feature-3-title": "Disseny Local",
    "feature-3-desc": "Peces concebudes a València combinant elegància mediterrània i funcionalitat.",
    "about-p1": "A <span>Aurora Department Store</span>, entenem que vestir bé és una forma d'expressió personal i de respecte cap als altres i el nostre entorn. Des de fa més d'una dècada, vestim tres generacions de famílies amb peces icòniques.",
    "about-p2": "Cada una de les nostres col·leccions compta amb departaments especialitzats per a Dona, Home, Xiquets i Complements, garantint que cada peça que adquireixes siga l'equilibri perfecte entre tendència, confort i durabilitat excepcional.",
    "stat-1-lbl": "Anys de Tradició",
    "stat-2-lbl": "Departaments",
    "stat-3-lbl": "Clients Feliços",
    // Catalog
    "catalog-sub": "Explora el Catàleg",
    "catalog-title": "Els Nostres <span>Departaments</span>",
    "tab-all": "Tot",
    "tab-women": "Dona",
    "tab-men": "Home",
    "tab-kids": "Xiquets",
    "tab-acc": "Complements",
    "size-label": "Talles:",
    "btn-add-cart": "Afegir al Carret",
    // Contact
    "contact-sub": "Contacta amb Nosaltres",
    "contact-title": "Estem per a <span>ajudar-te</span>",
    "contact-desc": "Tens dubtes sobre una talla, el teu enviament o vols concertar una cita d'assessorament personalitzat gratuït a la botiga? El nostre equip d'estilistes està a la teua disposició.",
    "contact-h-loc": "La Nostra Botiga",
    "contact-d-loc": "Carrer de Colón, 45, 46004 València, Espanya",
    "contact-h-hours": "Horari Comercial",
    "contact-d-hours": "Dilluns a Dissabte: 10:00 - 21:00",
    "contact-h-phone": "Atenció Telefònica",
    "contact-lbl-name": "Nom Complet",
    "contact-lbl-email": "Correu Electrònic",
    "contact-lbl-msg": "El Teu Missatge",
    "btn-send": "Enviar Missatge",
    // Cart
    "cart-title": "El Teu Carret",
    "cart-empty": "El carret està buit",
    "cart-subtotal": "Subtotal",
    "cart-shipping-cost": "Enviament",
    "cart-total": "Total",
    "btn-checkout": "Procedir al Pagament",
    // Checkout Modal
    "checkout-title": "Finalitzar Compra",
    "checkout-sec-del": "1. Mètode de Lliurament",
    "del-collect": "Recollir a la Botiga",
    "del-collect-desc": "Al Carrer de Colón, València",
    "del-collect-cost": "Gratis",
    "del-shipping": "Enviament a domicili",
    "del-shipping-desc": "Lliurament en 24/48 hores",
    "del-shipping-cost": "5,99 €",
    "checkout-sec-info": "2. Informació del Client",
    "checkout-lbl-tel": "Telèfon de Contacte",
    "checkout-lbl-address": "Adreça Completa (només enviaments)",
    "checkout-lbl-city": "Ciutat / Codi Postal",
    "checkout-sec-pay": "3. Mètode de Pagament",
    "pay-collect": "Pagar al recollir a la botiga",
    "pay-delivery": "Pagar al rebre al domicili",
    "pay-gateway": "Passarel·la de pagament online (Targeta)",
    "checkout-sec-summary": "Resum de la Comanda",
    "btn-order-confirm": "Confirmar i Pagar",
    // Gateway Emulation
    "gateway-title": "Passarel·la de Pagament Aurora",
    "gateway-lbl-card": "Número de Targeta",
    "gateway-lbl-expiry": "Data de Caducitat",
    "gateway-btn-pay": "Pagar de forma Segura",
    // Success Modal
    "success-title": "Comanda Confirmada!",
    "success-desc": "Moltes gràcies per la teua compra. La teua comanda s'ha registrat amb èxit. Hem enviat un correu de confirmació amb tots els detalls i el codi de seguiment.",
    "btn-success-close": "Tornar a la botiga",
    // Login
    "login-title": "Accés de Clients",
    "login-lbl-pass": "Contrasenya",
    "login-btn-submit": "Iniciar Sessió",
    // Cookies
    "cookie-text": "Utilitzem cookies de primera mà per a millorar la teua experiència de compra i personalitzar el contingut. En continuar navegant, acceptes la nostra <a href='#'>Política de Cookies</a>.",
    "cookie-accept": "Acceptar",
    "cookie-deny": "Rebutjar",
    // Search
    "search-placeholder": "Escriu per a buscar a la web...",
    "search-tip": "Prem ENTER o fes clic fora per a eixir. Buscarem i ressaltarem les coincidències a la landing.",
    "search-not-found": "No s'han trobat coincidències.",
    "search-matches": "coincidència(s) trobada(s) i ressaltada(s)."
  }
};

// INITIAL SEED PRODUCTS
const PRODUCTS_DATA = [
  // MUJER (women)
  {
    id: "w1",
    dept: "women",
    name: "Abrigo Camel de Lana Virgen",
    name_en: "Virgin Wool Camel Coat",
    name_val: "Abric Camel de Llana Verge",
    price: 189.99,
    tag: "Premium",
    sizes: ["S", "M", "L", "XL"],
    img: "https://images.pexels.com/photos/14916457/pexels-photo-14916457.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=400&w=300"
  },
  {
    id: "w2",
    dept: "women",
    name: "Vestido Midi Plisado Negro",
    name_en: "Pleated Black Midi Dress",
    name_val: "Vestit Midi Plisat Negre",
    price: 89.99,
    tag: "Novedad",
    sizes: ["XS", "S", "M", "L"],
    img: "https://images.pexels.com/photos/13859647/pexels-photo-13859647.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=400&w=300"
  },
  {
    id: "w3",
    dept: "women",
    name: "Blusa Oversize Algodón Orgánico",
    name_en: "Organic Cotton Oversize Blouse",
    name_val: "Blusa Oversize Cotó Orgànic",
    price: 49.99,
    tag: "Eco",
    sizes: ["S", "M", "L"],
    img: "https://images.pexels.com/photos/7945547/pexels-photo-7945547.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=400&w=300"
  },
  
  // HOMBRE (men)
  {
    id: "m1",
    dept: "men",
    name: "Americana Entallada Tweed",
    name_en: "Tailored Tweed Blazer",
    name_val: "Americana Entallada Tweed",
    price: 149.99,
    tag: "Elegante",
    sizes: ["M", "L", "XL", "XXL"],
    img: "https://images.pexels.com/photos/987577/pexels-photo-987577.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=400&w=300"
  },
  {
    id: "m2",
    dept: "men",
    name: "Jersey de Cuello Alto Cachemira",
    name_en: "Cashmere Roll Neck Sweater",
    name_val: "Jersey de Coll Alt Catxemira",
    price: 119.99,
    tag: "Premium",
    sizes: ["S", "M", "L", "XL"],
    img: "https://images.pexels.com/photos/11900126/pexels-photo-11900126.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=400&w=300"
  },
  
  // NIÑOS (kids)
  {
    id: "k1",
    dept: "kids",
    name: "Chubasquero Forrado Polar Infantil",
    name_en: "Fleece Lined Kids Raincoat",
    name_val: "Anorac Forrat Polar Infantil",
    price: 39.99,
    tag: "Funcional",
    sizes: ["4y", "6y", "8y", "10y"],
    img: "https://images.pexels.com/photos/8386651/pexels-photo-8386651.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=300"
  },
  {
    id: "k2",
    dept: "kids",
    name: "Peto de Pana de Algodón Orgánico",
    name_en: "Organic Cotton Corduroy Dungarees",
    name_val: "Pet de Pana de Cotó Orgànic",
    price: 34.99,
    tag: "Eco",
    sizes: ["2y", "4y", "6y", "8y"],
    img: "https://images.pexels.com/photos/5490974/pexels-photo-5490974.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=400&w=300"
  },
  
  // ACCESORIOS (accessories)
  {
    id: "a1",
    dept: "accessories",
    name: "Bolso Shopper de Piel Vegana",
    name_en: "Vegan Leather Shopper Bag",
    name_val: "Bossat Shopper de Pell Vegana",
    price: 79.99,
    tag: "Best Seller",
    sizes: ["U"],
    img: "https://images.pexels.com/photos/11911863/pexels-photo-11911863.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=300"
  },
  {
    id: "a2",
    dept: "accessories",
    name: "Sombrero de Fieltro Ala Ancha",
    name_en: "Wide Brim Felt Hat",
    name_val: "Capell de Feltre Ala Ampla",
    price: 45.00,
    tag: "Chic",
    sizes: ["M", "L"],
    img: "https://images.pexels.com/photos/20238933/pexels-photo-20238933.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=400&w=300"
  }
];

// STATE STATE OBJECT
const STATE = {
  lang: "es", // Default language: Spanish
  theme: "light", // Default theme
  cart: [], // Shopping cart item array
  checkout: {
    deliveryMethod: "collect", // "collect" or "shipping"
    paymentMethod: "collect" // "collect", "delivery" or "gateway"
  }
};

/**
 * ==========================================================================
 * INITIALIZATION & EVENTS BINDING
 * ==========================================================================
 */
document.addEventListener("DOMContentLoaded", () => {
  // Load Theme Preference from LocalStorage
  initTheme();
  
  // Load Language Preference
  initLanguage();
  
  // Load Saved Cart from LocalStorage
  initCart();
  
  // Draw Products Catalog
  renderCatalog("all");
  
  // Initialize Scroll Reveal Animations (Intersection Observer)
  initScrollAnimations();
  
  // Bind Header Scroll Logic
  bindHeaderScroll();

  // Attach All Event Listeners
  attachEventListeners();
});

/**
 * ==========================================================================
 * MAIN EVENT LISTENERS ATTACHMENT
 * ==========================================================================
 */
function attachEventListeners() {
  // Dark / Light Theme Button Toggle
  const themeToggleBtns = document.querySelectorAll(".theme-toggle-btn");
  themeToggleBtns.forEach(btn => {
    btn.addEventListener("click", toggleTheme);
  });

  // Language Dropdown Toggle (Desktop)
  const langBtn = document.querySelector(".lang-select-btn");
  const langDropdown = document.querySelector(".lang-dropdown");
  if (langBtn) {
    langBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      langDropdown.classList.toggle("show");
    });
  }

  // Click outside language dropdown closes it
  document.addEventListener("click", () => {
    if (langDropdown) langDropdown.classList.remove("show");
  });

  // Desktop Language Options
  const langOptions = document.querySelectorAll(".lang-option");
  langOptions.forEach(opt => {
    opt.addEventListener("click", (e) => {
      const selectedLang = e.currentTarget.getAttribute("data-value");
      changeLanguage(selectedLang);
    });
  });

  // Mobile Language Options
  const mobileLangBtns = document.querySelectorAll(".mobile-lang-btn");
  mobileLangBtns.forEach(btn => {
    btn.addEventListener("click", (e) => {
      const selectedLang = e.currentTarget.getAttribute("data-value");
      changeLanguage(selectedLang);
    });
  });

  // Hamburger Menu Actions
  const hamburgerBtn = document.querySelector(".hamburger-btn");
  const mobileNavPanel = document.querySelector(".mobile-nav-panel");
  if (hamburgerBtn) {
    hamburgerBtn.addEventListener("click", () => {
      hamburgerBtn.classList.toggle("open");
      mobileNavPanel.classList.toggle("open");
    });
  }

  // Close Mobile Menu on Link Click
  const mobileLinks = document.querySelectorAll(".mobile-nav-link");
  mobileLinks.forEach(link => {
    link.addEventListener("click", () => {
      if (hamburgerBtn) hamburgerBtn.classList.remove("open");
      if (mobileNavPanel) mobileNavPanel.classList.remove("open");
    });
  });

  // Close Mobile Menu on Screen Resize
  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
      if (hamburgerBtn) hamburgerBtn.classList.remove("open");
      if (mobileNavPanel) mobileNavPanel.classList.remove("open");
    }
  });

  // Search Modals Triggers
  const searchModalTriggers = document.querySelectorAll(".search-trigger");
  const searchModal = document.querySelector(".search-modal");
  const searchModalClose = document.querySelector(".search-modal-close-btn");
  const searchModalInput = document.querySelector(".search-modal-input");

  searchModalTriggers.forEach(trigger => {
    trigger.addEventListener("click", () => {
      searchModal.classList.add("show");
      setTimeout(() => searchModalInput.focus(), 150);
    });
  });

  if (searchModalClose) {
    searchModalClose.addEventListener("click", closeSearchModal);
  }

  // Close search modal when clicking outside box
  if (searchModal) {
    searchModal.addEventListener("click", (e) => {
      if (e.target === searchModal) {
        closeSearchModal();
      }
    });
  }

  // Keypress event for live search input
  if (searchModalInput) {
    searchModalInput.addEventListener("keyup", (e) => {
      if (e.key === "Enter") {
        executePageSearch(searchModalInput.value);
      } else if (e.key === "Escape") {
        closeSearchModal();
      } else {
        // Live search counts
        executePageSearch(searchModalInput.value, true);
      }
    });
  }

  // Mobile search form handler
  const mobileSearchForm = document.getElementById("mobileSearchForm");
  if (mobileSearchForm) {
    mobileSearchForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const query = document.getElementById("mobileSearchInput").value;
      if (hamburgerBtn) hamburgerBtn.classList.remove("open");
      if (mobileNavPanel) mobileNavPanel.classList.remove("open");
      searchModal.classList.add("show");
      searchModalInput.value = query;
      executePageSearch(query);
    });
  }

  // Catalog Department Tabs Filter Click
  const deptTabs = document.querySelectorAll(".dept-tab");
  deptTabs.forEach(tab => {
    tab.addEventListener("click", (e) => {
      deptTabs.forEach(t => t.classList.remove("active"));
      e.currentTarget.classList.add("active");
      const deptFilter = e.currentTarget.getAttribute("data-dept");
      renderCatalog(deptFilter);
    });
  });

  // Cart Drawer toggles
  const cartToggleBtns = document.querySelectorAll(".cart-toggle-btn");
  const cartSidebar = document.querySelector(".cart-sidebar");
  const closeCartBtn = document.querySelector(".close-cart-btn");

  cartToggleBtns.forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      cartSidebar.classList.add("open");
    });
  });

  if (closeCartBtn) {
    closeCartBtn.addEventListener("click", () => {
      cartSidebar.classList.remove("open");
    });
  }

  // Checkout Modal Trigger
  const checkoutBtn = document.querySelector(".cart-checkout-btn");
  const checkoutModal = document.querySelector(".checkout-modal");
  const checkoutCloseBtn = document.querySelector(".checkout-close-btn");

  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", () => {
      if (STATE.cart.length === 0) return;
      cartSidebar.classList.remove("open");
      checkoutModal.classList.add("show");
      renderCheckoutSummary();
    });
  }

  if (checkoutCloseBtn) {
    checkoutCloseBtn.addEventListener("click", () => {
      checkoutModal.classList.remove("show");
    });
  }

  // Click outside Checkout closes it
  if (checkoutModal) {
    checkoutModal.addEventListener("click", (e) => {
      if (e.target === checkoutModal) {
        checkoutModal.classList.remove("show");
      }
    });
  }

  // Delivery Method Selection Cards
  const deliveryCards = document.querySelectorAll(".delivery-card");
  deliveryCards.forEach(card => {
    card.addEventListener("click", (e) => {
      deliveryCards.forEach(c => c.classList.remove("active"));
      const targetCard = e.currentTarget;
      targetCard.classList.add("active");
      
      const method = targetCard.getAttribute("data-method");
      STATE.checkout.deliveryMethod = method;
      
      // Update form requirements / labels
      const addressGroup = document.getElementById("shippingAddressGroup");
      const cityGroup = document.getElementById("shippingCityGroup");
      const addressInput = document.getElementById("checkoutAddress");
      const cityInput = document.getElementById("checkoutCity");

      if (method === "shipping") {
        addressGroup.style.display = "block";
        cityGroup.style.display = "block";
        addressInput.setAttribute("required", "true");
        cityInput.setAttribute("required", "true");
      } else {
        addressGroup.style.display = "none";
        cityGroup.style.display = "none";
        addressInput.removeAttribute("required");
        cityInput.removeAttribute("required");
      }

      // Re-render checkout calculation
      renderCheckoutSummary();
      updatePaymentOptions();
    });
  });

  // Payment Method Selection Cards
  const paymentCards = document.querySelectorAll(".payment-card");
  paymentCards.forEach(card => {
    card.addEventListener("click", (e) => {
      if (e.currentTarget.classList.contains("disabled")) return;
      paymentCards.forEach(c => c.classList.remove("active"));
      e.currentTarget.classList.add("active");
      
      const method = e.currentTarget.getAttribute("data-payment");
      STATE.checkout.paymentMethod = method;
    });
  });

  // Form Submission checkout
  const checkoutForm = document.getElementById("checkoutForm");
  if (checkoutForm) {
    checkoutForm.addEventListener("submit", (e) => {
      e.preventDefault();
      
      // Validation passed
      if (STATE.checkout.paymentMethod === "gateway") {
        // Redirigir a pasarela de pago simulada
        openPaymentGateway();
      } else {
        // Confirmar directamente
        finalizeOrder();
      }
    });
  }

  // Gateway Simulation Form Submission
  const gatewayForm = document.getElementById("gatewayForm");
  const gatewayModal = document.querySelector(".gateway-modal");
  const gatewayCloseBtn = document.querySelector(".gateway-close-btn");

  if (gatewayForm) {
    gatewayForm.addEventListener("submit", (e) => {
      e.preventDefault();
      // Simulate validation / processing spinner
      const payBtn = gatewayForm.querySelector(".gateway-btn");
      const originalText = payBtn.textContent;
      payBtn.textContent = STATE.lang === "es" ? "Procesando pago..." : STATE.lang === "val" ? "Processant pagament..." : "Processing payment...";
      payBtn.setAttribute("disabled", "true");

      setTimeout(() => {
        payBtn.textContent = originalText;
        payBtn.removeAttribute("disabled");
        gatewayModal.classList.remove("show");
        finalizeOrder();
      }, 1500);
    });
  }

  if (gatewayCloseBtn) {
    gatewayCloseBtn.addEventListener("click", () => {
      gatewayModal.classList.remove("show");
    });
  }

  // Success Confirmation Close Handler
  const successCloseBtn = document.querySelector(".btn-success-close");
  const successModal = document.querySelector(".success-modal");
  if (successCloseBtn) {
    successCloseBtn.addEventListener("click", () => {
      successModal.classList.remove("show");
    });
  }

  // Cookie Consent Handlers
  const cookieBanner = document.querySelector(".cookie-banner");
  const acceptCookieBtn = document.querySelector(".cookie-btn-accept");
  const denyCookieBtn = document.querySelector(".cookie-btn-deny");

  if (acceptCookieBtn) {
    acceptCookieBtn.addEventListener("click", () => {
      localStorage.setItem("cookie-consent", "accepted");
      cookieBanner.classList.remove("show");
    });
  }
  if (denyCookieBtn) {
    denyCookieBtn.addEventListener("click", () => {
      localStorage.setItem("cookie-consent", "denied");
      cookieBanner.classList.remove("show");
    });
  }

  // Trigger simulated login popup
  const userBtn = document.querySelector(".user-trigger");
  const loginModal = document.querySelector(".login-modal");
  const loginCloseBtn = document.querySelector(".login-close-btn");
  const loginForm = document.getElementById("loginForm");

  if (userBtn) {
    userBtn.addEventListener("click", (e) => {
      e.preventDefault();
      loginModal.classList.add("show");
    });
  }

  if (loginCloseBtn) {
    loginCloseBtn.addEventListener("click", () => {
      loginModal.classList.remove("show");
    });
  }

  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = document.getElementById("loginEmail").value;
      const pass = document.getElementById("loginPassword").value;
      alert(`Simulated Login: Welcome back ${email}! (Authentication system to be fully connected by backend developer)`);
      loginModal.classList.remove("show");
    });
  }

  // Simple Newsletter subscription
  const newsForm = document.querySelector(".newsletter-form");
  if (newsForm) {
    newsForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const emailInput = newsForm.querySelector("input").value;
      alert(`Newsletter: Subscribed successfully with ${emailInput}!`);
      newsForm.reset();
    });
  }

  // Contact Form Submission
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      alert(STATE.lang === "es" ? "¡Mensaje enviado con éxito! Nos pondremos en contacto contigo lo antes posible." : STATE.lang === "val" ? "¡Missatge enviat amb èxit! Ens posarem en contacte amb tu al més prompte possible." : "Message sent successfully! We will contact you as soon as possible.");
      contactForm.reset();
    });
  }
}

/**
 * ==========================================================================
 * CONTROLLER: INTERACTIVE SHOPPING CART ENGINE
 * ==========================================================================
 */

// Draw Catalog Cards
function renderCatalog(filter) {
  const grid = document.querySelector(".products-grid");
  if (!grid) return;
  
  grid.innerHTML = "";
  
  const filtered = filter === "all" ? PRODUCTS_DATA : PRODUCTS_DATA.filter(p => p.dept === filter);
  
  filtered.forEach(p => {
    // Select translations based on state
    let displayName = p.name;
    if (STATE.lang === "en" && p.name_en) displayName = p.name_en;
    if (STATE.lang === "val" && p.name_val) displayName = p.name_val;

    const card = document.createElement("div");
    card.className = "product-card";
    card.setAttribute("data-id", p.id);
    
    // Size badges string
    const sizeBadges = p.sizes.map(s => `<span class="size-badge">${s}</span>`).join("");
    
    card.innerHTML = `
      <span class="product-tag">${p.tag}</span>
      <div class="product-image-container">
        <img class="product-img" src="${p.img}" alt="${displayName}" loading="lazy">
        <div class="product-actions-overlay">
          <button class="btn-add-quick" title="${STATE.lang === 'es' ? 'Añadir al Carrito' : STATE.lang === 'val' ? 'Afegir al carret' : 'Add to Cart'}" onclick="addToCart('${p.id}')">
            <svg viewBox="0 0 24 24"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
          </button>
        </div>
      </div>
      <div class="product-info">
        <span class="product-category">${p.dept}</span>
        <h4 class="product-title">${displayName}</h4>
        <div class="product-footer">
          <span class="product-price">${p.price.toFixed(2)} €</span>
          <div class="product-sizes">
            ${sizeBadges}
          </div>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
}

// Add Item to cart
window.addToCart = function(productId) {
  const item = PRODUCTS_DATA.find(p => p.id === productId);
  if (!item) return;
  
  // Find if already exists
  const existingIndex = STATE.cart.findIndex(c => c.id === productId);
  
  if (existingIndex > -1) {
    STATE.cart[existingIndex].qty += 1;
  } else {
    // Default size selection is the first one
    STATE.cart.push({
      id: item.id,
      name: item.name,
      name_en: item.name_en,
      name_val: item.name_val,
      price: item.price,
      img: item.img,
      size: item.sizes[0],
      qty: 1
    });
  }
  
  saveCart();
  updateCartUI();
  
  // Open Cart drawer for immediate visual confirmation
  document.querySelector(".cart-sidebar").classList.add("open");
};

// Remove Item from cart completely
window.removeFromCart = function(productId) {
  STATE.cart = STATE.cart.filter(c => c.id !== productId);
  saveCart();
  updateCartUI();
};

// Alter quantity
window.alterQty = function(productId, delta) {
  const index = STATE.cart.findIndex(c => c.id === productId);
  if (index === -1) return;
  
  STATE.cart[index].qty += delta;
  
  if (STATE.cart[index].qty <= 0) {
    STATE.cart.splice(index, 1);
  }
  
  saveCart();
  updateCartUI();
};

// Save Cart to localstorage
function saveCart() {
  localStorage.setItem("aurora-cart-store", JSON.stringify(STATE.cart));
}

// Load Cart on boot
function initCart() {
  const saved = localStorage.getItem("aurora-cart-store");
  if (saved) {
    try {
      STATE.cart = JSON.parse(saved);
      updateCartUI();
    } catch(e) {
      STATE.cart = [];
    }
  }
}

// Update Cart Badge, sidebar list, and sums
function updateCartUI() {
  const counts = STATE.cart.reduce((sum, item) => sum + item.qty, 0);
  
  // Badges update
  const badges = document.querySelectorAll(".cart-badge");
  badges.forEach(b => {
    b.textContent = counts;
    b.style.display = counts > 0 ? "flex" : "none";
  });
  
  // Sidebar listing
  const container = document.querySelector(".cart-items-container");
  if (!container) return;
  
  if (STATE.cart.length === 0) {
    container.innerHTML = `
      <div class="cart-empty-state">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
        <p data-i18n="cart-empty">${TRANSLATIONS[STATE.lang]["cart-empty"]}</p>
      </div>
    `;
    // Totals calculations to zero
    document.getElementById("cartSubtotalAmount").textContent = "0.00 €";
    document.getElementById("cartShippingAmount").textContent = "0.00 €";
    document.getElementById("cartTotalAmount").textContent = "0.00 €";
    return;
  }
  
  container.innerHTML = "";
  let subtotal = 0;
  
  STATE.cart.forEach(item => {
    let name = item.name;
    if (STATE.lang === "en" && item.name_en) name = item.name_en;
    if (STATE.lang === "val" && item.name_val) name = item.name_val;

    subtotal += item.price * item.qty;
    
    const div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = `
      <img class="cart-item-img" src="${item.img}" alt="${name}">
      <div class="cart-item-details">
        <h4 class="cart-item-title">${name}</h4>
        <span class="cart-item-meta">Talla: ${item.size}</span>
        <span class="cart-item-price">${(item.price * item.qty).toFixed(2)} €</span>
        <div class="cart-item-actions">
          <div class="quantity-controller">
            <button class="qty-btn" onclick="alterQty('${item.id}', -1)">-</button>
            <span class="qty-val">${item.qty}</span>
            <button class="qty-btn" onclick="alterQty('${item.id}', 1)">+</button>
          </div>
          <button class="remove-item-btn" onclick="removeFromCart('${item.id}')">${STATE.lang === "es" ? "Eliminar" : STATE.lang === "val" ? "Eliminar" : "Delete"}</button>
        </div>
      </div>
    `;
    container.appendChild(div);
  });
  
  // Core Subtotal calculation
  document.getElementById("cartSubtotalAmount").textContent = `${subtotal.toFixed(2)} €`;
  
  // Shipping calculation (free if collected or over 100)
  const isShipping = STATE.checkout.deliveryMethod === "shipping";
  const shippingCost = (subtotal >= 100 || !isShipping) ? 0 : 5.99;
  
  document.getElementById("cartShippingAmount").textContent = shippingCost === 0 ? "Gratis" : `${shippingCost.toFixed(2)} €`;
  
  const total = subtotal + shippingCost;
  document.getElementById("cartTotalAmount").textContent = `${total.toFixed(2)} €`;
}

// Re-evaluate available payment options based on pick up / shipping
function updatePaymentOptions() {
  const collectionPaymentCard = document.getElementById("payCollectCard");
  const deliveryPaymentCard = document.getElementById("payDeliveryCard");
  
  if (STATE.checkout.deliveryMethod === "collect") {
    // Pick up in store can do: pick up pay, or gateway pay. (Contra entrega delivery is disabled)
    deliveryPaymentCard.classList.add("disabled");
    deliveryPaymentCard.style.opacity = "0.4";
    deliveryPaymentCard.style.pointerEvents = "none";
    collectionPaymentCard.classList.remove("disabled");
    collectionPaymentCard.style.opacity = "1";
    collectionPaymentCard.style.pointerEvents = "auto";
    
    if (STATE.checkout.paymentMethod === "delivery") {
      // Default reset
      STATE.checkout.paymentMethod = "collect";
      collectionPaymentCard.classList.add("active");
      deliveryPaymentCard.classList.remove("active");
    }
  } else {
    // Shipping to home can do: cash on delivery, or gateway. (Pick up in store pay is disabled)
    collectionPaymentCard.classList.add("disabled");
    collectionPaymentCard.style.opacity = "0.4";
    collectionPaymentCard.style.pointerEvents = "none";
    deliveryPaymentCard.classList.remove("disabled");
    deliveryPaymentCard.style.opacity = "1";
    deliveryPaymentCard.style.pointerEvents = "auto";
    
    if (STATE.checkout.paymentMethod === "collect") {
      // Default reset
      STATE.checkout.paymentMethod = "delivery";
      deliveryPaymentCard.classList.add("active");
      collectionPaymentCard.classList.remove("active");
    }
  }
}

// Render Order Summary in Checkout Box
function renderCheckoutSummary() {
  const summaryContainer = document.querySelector(".summary-items-list");
  if (!summaryContainer) return;
  
  summaryContainer.innerHTML = "";
  let subtotal = 0;
  
  STATE.cart.forEach(item => {
    let name = item.name;
    if (STATE.lang === "en" && item.name_en) name = item.name_en;
    if (STATE.lang === "val" && item.name_val) name = item.name_val;

    subtotal += item.price * item.qty;
    
    const row = document.createElement("div");
    row.className = "summary-item-mini";
    row.innerHTML = `
      <span class="summary-item-name">${name} <strong>x${item.qty}</strong></span>
      <span class="summary-item-price">${(item.price * item.qty).toFixed(2)} €</span>
    `;
    summaryContainer.appendChild(row);
  });
  
  const isShipping = STATE.checkout.deliveryMethod === "shipping";
  const shippingCost = (subtotal >= 100 || !isShipping) ? 0 : 5.99;
  const total = subtotal + shippingCost;
  
  document.getElementById("checkoutSubtotal").textContent = `${subtotal.toFixed(2)} €`;
  document.getElementById("checkoutShipping").textContent = shippingCost === 0 ? "Gratis" : `${shippingCost.toFixed(2)} €`;
  document.getElementById("checkoutTotal").textContent = `${total.toFixed(2)} €`;
}

// Open Payment Gateway emulation
function openPaymentGateway() {
  const gatewayModal = document.querySelector(".gateway-modal");
  const checkoutModal = document.querySelector(".checkout-modal");
  
  // Hide checkout temporarily (visual cleanliness)
  checkoutModal.classList.remove("show");
  
  // Calculate final amount
  let subtotal = STATE.cart.reduce((s, i) => s + (i.price * i.qty), 0);
  const isShipping = STATE.checkout.deliveryMethod === "shipping";
  const shippingCost = (subtotal >= 100 || !isShipping) ? 0 : 5.99;
  const finalAmount = subtotal + shippingCost;
  
  document.getElementById("gatewayAmount").textContent = `${finalAmount.toFixed(2)} €`;
  gatewayModal.classList.add("show");
}

// End checkout and show success simulation
function finalizeOrder() {
  const successModal = document.querySelector(".success-modal");
  const checkoutModal = document.querySelector(".checkout-modal");
  
  // Close any intermediate popups
  checkoutModal.classList.remove("show");
  
  // Clear Cart State
  STATE.cart = [];
  saveCart();
  updateCartUI();
  
  // Show successful dialog
  successModal.classList.add("show");
  
  // Reset checkout form fields safely
  const checkoutForm = document.getElementById("checkoutForm");
  if (checkoutForm) checkoutForm.reset();
}

/**
 * ==========================================================================
 * CONTROLLER: MODERN THEME SWITCHER (LIGHT / DARK)
 * ==========================================================================
 */
function initTheme() {
  const savedTheme = localStorage.getItem("aurora-theme-v1");
  const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  
  if (savedTheme === "dark" || (!savedTheme && systemPrefersDark)) {
    document.body.classList.add("dark-mode");
    STATE.theme = "dark";
  } else {
    document.body.classList.remove("dark-mode");
    STATE.theme = "light";
  }
  updateThemeIcons();
}

function toggleTheme() {
  if (document.body.classList.contains("dark-mode")) {
    document.body.classList.remove("dark-mode");
    STATE.theme = "light";
    localStorage.setItem("aurora-theme-v1", "light");
  } else {
    document.body.classList.add("dark-mode");
    STATE.theme = "dark";
    localStorage.setItem("aurora-theme-v1", "dark");
  }
  updateThemeIcons();
}

function updateThemeIcons() {
  const icons = document.querySelectorAll(".theme-toggle-btn svg");
  icons.forEach(icon => {
    if (STATE.theme === "dark") {
      // Draw Sun Icon inside button
      icon.innerHTML = `<circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>`;
    } else {
      // Draw Moon Icon inside button
      icon.innerHTML = `<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>`;
    }
  });
}

/**
 * ==========================================================================
 * CONTROLLER: ADVANCED MULTI-LANGUAGE SYSTEM (I18N)
 * ==========================================================================
 */
function initLanguage() {
  const savedLang = localStorage.getItem("aurora-lang-v1");
  if (savedLang && (savedLang === "es" || savedLang === "en" || savedLang === "val")) {
    STATE.lang = savedLang;
  } else {
    // Detect browser default language, fallback to 'es'
    const browserLang = navigator.language.slice(0, 2);
    if (browserLang === "ca" || browserLang === "va") {
      STATE.lang = "val";
    } else if (browserLang === "en") {
      STATE.lang = "en";
    } else {
      STATE.lang = "es";
    }
  }
  applyLanguageUI();
}

function changeLanguage(langCode) {
  STATE.lang = langCode;
  localStorage.setItem("aurora-lang-v1", langCode);
  applyLanguageUI();
  
  // Re-draw components that rely on state language
  renderCatalog(document.querySelector(".dept-tab.active")?.getAttribute("data-dept") || "all");
  updateCartUI();
  renderCheckoutSummary();
  updatePaymentOptions();
}

function applyLanguageUI() {
  const langObj = TRANSLATIONS[STATE.lang];
  if (!langObj) return;

  // Translate all DOM elements with data-i18n attribute
  const elements = document.querySelectorAll("[data-i18n]");
  elements.forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (langObj[key]) {
      // Handle HTML text nodes
      if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") {
        el.setAttribute("placeholder", langObj[key]);
      } else {
        el.innerHTML = langObj[key];
      }
    }
  });

  // Highlight active buttons (Desktop Dropdown)
  const langLabel = document.querySelector(".lang-label-txt");
  if (langLabel) {
    langLabel.textContent = STATE.lang === "val" ? "VAL" : STATE.lang.toUpperCase();
  }

  const langOptions = document.querySelectorAll(".lang-option");
  langOptions.forEach(opt => {
    if (opt.getAttribute("data-value") === STATE.lang) {
      opt.classList.add("active");
    } else {
      opt.classList.remove("active");
    }
  });

  // Highlight active buttons (Mobile Nav Panel)
  const mobileLangBtns = document.querySelectorAll(".mobile-lang-btn");
  mobileLangBtns.forEach(btn => {
    if (btn.getAttribute("data-value") === STATE.lang) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });
}

/**
 * ==========================================================================
 * CONTROLLER: ADVANCED DOM TEXT HIGHLIGHT & FIND SYSTEM
 * ==========================================================================
 */
let originalPageContent = null; // Save original HTML structure before highlight
let findMatchIndex = 0;
let findMatchedElements = [];

function executePageSearch(query, isLiveCount = false) {
  const feedback = document.querySelector(".search-results-feedback");
  if (!feedback) return;
  
  // Clear previous highlighted nodes safely if any
  clearSearchHighlights();
  
  if (!query || query.trim().length < 2) {
    feedback.textContent = "";
    return;
  }

  query = query.trim().toLowerCase();
  
  // Scan DOM visible texts
  const searchableSections = document.querySelectorAll("section, footer, header");
  let matchesCount = 0;

  searchableSections.forEach(section => {
    // Traverse text nodes to avoid destroying HTML structure / events
    traverseAndHighlight(section, query);
  });

  // Find all highlighted occurrences in the page
  const highlights = document.querySelectorAll("mark.search-highlight");
  matchesCount = highlights.length;

  if (matchesCount > 0) {
    feedback.textContent = `${matchesCount} ${TRANSLATIONS[STATE.lang]["search-matches"]}`;
    feedback.style.color = "var(--accent)";
    
    // Smooth scroll to the first match if it is not just a live counts trigger
    if (!isLiveCount) {
      highlights[0].scrollIntoView({ behavior: "smooth", block: "center" });
    }
  } else {
    feedback.textContent = TRANSLATIONS[STATE.lang]["search-not-found"];
    feedback.style.color = "#ff3b30";
  }
}

// Traverse nodes recursively to safely highlight targets
function traverseAndHighlight(node, query) {
  if (node.nodeType === Node.TEXT_NODE) {
    const text = node.nodeValue;
    const lowerText = text.toLowerCase();
    
    if (lowerText.includes(query)) {
      const parent = node.parentNode;
      
      // Do not highlight inside critical nodes, form controls, script tags, style tags, or already highlighted marks
      if (parent && 
          parent.tagName !== "SCRIPT" && 
          parent.tagName !== "STYLE" && 
          parent.tagName !== "TEXTAREA" && 
          parent.tagName !== "INPUT" && 
          parent.tagName !== "MARK" &&
          !parent.closest(".search-modal") &&
          !parent.closest(".cart-sidebar") &&
          !parent.closest(".checkout-modal") &&
          !parent.closest(".gateway-modal") &&
          !parent.closest(".cookie-banner")) {
        
        const fragment = document.createDocumentFragment();
        let lastIndex = 0;
        
        // Find all occurrences
        let index = lowerText.indexOf(query);
        while (index > -1) {
          // Add preceding text
          if (index > lastIndex) {
            fragment.appendChild(document.createTextNode(text.substring(lastIndex, index)));
          }
          
          // Add highlighted <mark> element
          const mark = document.createElement("mark");
          mark.className = "search-highlight";
          mark.textContent = text.substring(index, index + query.length);
          fragment.appendChild(mark);
          
          lastIndex = index + query.length;
          index = lowerText.indexOf(query, lastIndex);
        }
        
        // Add remaining text
        if (lastIndex < text.length) {
          fragment.appendChild(document.createTextNode(text.substring(lastIndex)));
        }
        
        parent.replaceChild(fragment, node);
      }
    }
  } else if (node.nodeType === Node.ELEMENT_NODE && node.childNodes) {
    // Node is an element, scan its children. Need an array copy since we might modify child nodes inline
    Array.from(node.childNodes).forEach(child => traverseAndHighlight(child, query));
  }
}

// Strip out custom highlight markers and restore original DOM structure
function clearSearchHighlights() {
  const highlights = document.querySelectorAll("mark.search-highlight");
  highlights.forEach(mark => {
    const parent = mark.parentNode;
    if (parent) {
      const textNode = document.createTextNode(mark.textContent);
      parent.replaceChild(textNode, mark);
      parent.normalize(); // Join contiguous text nodes
    }
  });
}

function closeSearchModal() {
  const searchModal = document.querySelector(".search-modal");
  const searchModalInput = document.querySelector(".search-modal-input");
  const feedback = document.querySelector(".search-results-feedback");
  
  if (searchModal) {
    searchModal.classList.remove("show");
  }
  if (searchModalInput) {
    searchModalInput.value = "";
  }
  if (feedback) {
    feedback.textContent = "";
  }
  clearSearchHighlights();
}

/**
 * ==========================================================================
 * CONTROLLER: UX / PERFORMANCE OPTIMIZATIONS
 * ==========================================================================
 */

// Scroll reveal animations observer
function initScrollAnimations() {
  const sections = document.querySelectorAll("section");
  
  const revealCallback = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target); // Trigger only once for performance
      }
    });
  };
  
  const options = {
    root: null,
    threshold: 0.1, // Element is 10% visible
    rootMargin: "0px 0px -50px 0px"
  };
  
  const observer = new IntersectionObserver(revealCallback, options);
  sections.forEach(s => observer.observe(s));
  
  // Show first section (Hero is already styled natively, let's reveal others quickly)
  const aboutSec = document.getElementById("about");
  if (aboutSec && window.innerHeight > aboutSec.getBoundingClientRect().top) {
    aboutSec.classList.add("visible");
  }
}

// Dynamic header style adjustment on scroll
function bindHeaderScroll() {
  const header = document.querySelector(".main-header");
  if (!header) return;
  
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });
}

// Show Cookie Banner after a brief delay if not decided yet
window.addEventListener("load", () => {
  const cookieBanner = document.querySelector(".cookie-banner");
  const consent = localStorage.getItem("cookie-consent");
  
  if (!consent && cookieBanner) {
    setTimeout(() => {
      cookieBanner.classList.add("show");
    }, 2000);
  }
});
