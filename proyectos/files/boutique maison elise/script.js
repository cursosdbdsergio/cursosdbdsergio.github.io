/* ============================================
   MAISON ÉLISE - Boutique de Moda Femenina
   JavaScript Principal
   ============================================ */

/* --- SISTEMA DE IDIOMAS --- */
const translations = {
  es: {
    // Topbar
    topbar_phone: '+34 900 123 456',
    topbar_email: 'info@maisonelise.com',
    topbar_promo: 'ENVÍO GRATIS A PARTIR DE 80€',
    // Navegación
    nav_inicio: 'Inicio',
    nav_colecciones: 'Colecciones',
    nav_novedades: 'Novedades',
    nav_lookbook: 'Lookbook',
    nav_nosotros: 'Nosotros',
    nav_contacto: 'Contacto',
    nav_buscar: 'Buscar',
    nav_cuenta: 'Mi Cuenta',
    nav_carrito: 'Carrito',
    // Hero
    hero_tag: 'Nueva Temporada 2026',
    hero_title: 'Elegancia que Define tu <em>Esencia</em>',
    hero_description: 'Descubre nuestra colección exclusiva de moda femenina. Piezas únicas diseñadas para mujeres que saben que la verdadera elegancia está en los detalles.',
    hero_btn1: 'Ver Colección',
    hero_btn2: 'Nuestro Mundo',
    hero_scroll: 'Descubrir',
    // Info section
    info_title: '¿Por qué elegir Maison Élise?',
    info_subtitle: 'EXPERIENCIA & CALIDAD',
    info1_title: 'Diseño Exclusivo',
    info1_text: 'Cada pieza es cuidadosamente seleccionada para ofrecer lo último en moda femenina europea.',
    info2_title: 'Calidad Premium',
    info2_text: 'Trabajamos con los mejores materiales y artesanos para garantizar prendas duraderas y sofisticadas.',
    info3_title: 'Atención Personal',
    info3_text: 'Nuestro equipo de estilistas te asesora para crear el look perfecto para cada ocasión.',
    // Colecciones
    collections_title: 'Nuestras Colecciones',
    collections_subtitle: 'PIEZAS SELECCIONADAS',
    filter_all: 'Todo',
    filter_vestidos: 'Vestidos',
    filter_abrigos: 'Abrigos',
    filter_trajes: 'Trajes',
    filter_accesorios: 'Accesorios',
    quick_add: 'Añadir al Carrito',
    // Lookbook
    lookbook_tag: 'Primavera / Verano 2026',
    lookbook_title: 'El Arte de Vestir con <em>Intención</em>',
    lookbook_text: 'Nuestra nueva colección primavera-verano celebra la feminidad en todas sus formas. Telas ligeras, colores vibrantes y cortes que favorecen cada silueta. Diseñada para la mujer moderna que no sigue tendencias, sino que las crea.',
    lookbook_btn: 'Explorar Lookbook',
    // Testimonios
    testimonials_title: 'Lo que Dicen Nuestras Clientas',
    testimonials_subtitle: 'TESTIMONIOS',
    // Newsletter
    newsletter_title: 'Únete a Nuestro Mundo',
    newsletter_text: 'Suscríbete para recibir las últimas tendencias, ofertas exclusivas y acceso anticipado a nuevas colecciones.',
    newsletter_placeholder: 'Tu correo electrónico',
    newsletter_btn: 'Suscribirse',
    // Contacto
    contact_title: 'Ponte en Contacto',
    contact_subtitle: 'ESTAMOS AQUÍ PARA TI',
    contact_text: '¿Tienes alguna pregunta sobre nuestras colecciones, pedidos o servicios? Nuestro equipo estará encantado de ayudarte.',
    contact_direccion_title: 'Dirección',
    contact_direccion: 'Calle de Serrano 45, Madrid, España',
    contact_telefono_title: 'Teléfono',
    contact_telefono: '+34 900 123 456',
    contact_email_title: 'Email',
    contact_email: 'info@maisonelise.com',
    contact_horario_title: 'Horario',
    contact_horario: 'Lun - Sáb: 10:00 - 21:00',
    form_nombre: 'Nombre',
    form_apellido: 'Apellido',
    form_email: 'Email',
    form_asunto: 'Asunto',
    form_mensaje: 'Mensaje',
    form_submit: 'Enviar Mensaje',
    form_asunto_opciones: 'Seleccione una opción,Pedido,Devolución,Consulta general,Otro',
    // Carrito
    cart_title: 'Tu Carrito',
    cart_empty_title: 'Tu carrito está vacío',
    cart_empty_text: 'Añade prendas increíbles a tu carrito',
    cart_continuar: 'Seguir Comprando',
    cart_subtotal: 'Subtotal',
    cart_envio: 'Envío calculado en el checkout',
    // Opciones de entrega
    delivery_title: 'Opción de entrega',
    delivery_pickup: 'Recoger en tienda',
    delivery_pickup_desc: 'Pago al recoger — Gratis',
    delivery_home: 'Envío a domicilio',
    delivery_home_desc: 'Entrega en 2-5 días laborables',
    delivery_cod: 'Contra reembolso',
    delivery_cod_desc: 'Pagar al recibir el pedido',
    cart_checkout: 'Proceder al Pago',
    cart_see_more: '← Seguir comprando',
    // Checkout
    checkout_title: 'Resumen del Pedido',
    checkout_envio: 'Gastos de envío',
    checkout_gratis: 'Gratis',
    checkout_direccion_title: 'Dirección de envío',
    checkout_nombre: 'Nombre completo',
    checkout_calle: 'Dirección',
    checkout_ciudad: 'Ciudad',
    checkout_cp: 'Código Postal',
    checkout_pais: 'País',
    checkout_telefono: 'Teléfono',
    checkout_pagar: 'Confirmar y Pagar',
    checkout_pago_online: 'Pagar ahora (pasarela de pago)',
    // Footer
    footer_desc: 'Boutique de moda femenina comprometida con la elegancia, la calidad y el estilo atemporal. Desde el corazón de Madrid para el mundo.',
    footer_tienda: 'Tienda',
    footer_nosotros: 'Nosotros',
    footer_ayuda: 'Ayuda',
    footer_privacidad: 'Política de Privacidad',
    footer_cookies: 'Política de Cookies',
    footer_terminos: 'Términos y Condiciones',
    footer_requisitos: 'Requisitos Legales',
    footer_copyright: '© 2026 Maison Élise. Todos los derechos reservados.',
    // Búsqueda
    search_placeholder: 'Buscar productos, colecciones...',
    search_no_results: 'No se encontraron resultados',
    // Toast
    toast_add_title: 'Producto añadido',
    toast_add_msg: 'Se ha añadido a tu carrito',
    toast_remove_title: 'Producto eliminado',
    toast_remove_msg: 'Se ha eliminado del carrito',
  },
  en: {
    topbar_phone: '+34 900 123 456',
    topbar_email: 'info@maisonelise.com',
    topbar_promo: 'FREE SHIPPING OVER 80€',
    nav_inicio: 'Home',
    nav_colecciones: 'Collections',
    nav_novedades: 'New In',
    nav_lookbook: 'Lookbook',
    nav_nosotros: 'About',
    nav_contacto: 'Contact',
    nav_buscar: 'Search',
    nav_cuenta: 'My Account',
    nav_carrito: 'Cart',
    hero_tag: 'New Season 2026',
    hero_title: 'Elegance that Defines your <em>Essence</em>',
    hero_description: 'Discover our exclusive collection of women\'s fashion. Unique pieces designed for women who know true elegance is in the details.',
    hero_btn1: 'View Collection',
    hero_btn2: 'Our World',
    hero_scroll: 'Discover',
    info_title: 'Why choose Maison Élise?',
    info_subtitle: 'EXPERIENCE & QUALITY',
    info1_title: 'Exclusive Design',
    info1_text: 'Each piece is carefully selected to offer the latest in European women\'s fashion.',
    info2_title: 'Premium Quality',
    info2_text: 'We work with the finest materials and artisans to ensure durable and sophisticated garments.',
    info3_title: 'Personal Attention',
    info3_text: 'Our team of stylists advises you to create the perfect look for every occasion.',
    collections_title: 'Our Collections',
    collections_subtitle: 'CURATED PIECES',
    filter_all: 'All',
    filter_vestidos: 'Dresses',
    filter_abrigos: 'Coats',
    filter_trajes: 'Suits',
    filter_accesorios: 'Accessories',
    quick_add: 'Add to Cart',
    lookbook_tag: 'Spring / Summer 2026',
    lookbook_title: 'The Art of Dressing with <em>Intention</em>',
    lookbook_text: 'Our new spring-summer collection celebrates femininity in all its forms. Lightweight fabrics, vibrant colors and cuts that flatter every silhouette. Designed for the modern woman who doesn\'t follow trends, but creates them.',
    lookbook_btn: 'Explore Lookbook',
    testimonials_title: 'What Our Clients Say',
    testimonials_subtitle: 'TESTIMONIALS',
    newsletter_title: 'Join Our World',
    newsletter_text: 'Subscribe to receive the latest trends, exclusive offers and early access to new collections.',
    newsletter_placeholder: 'Your email address',
    newsletter_btn: 'Subscribe',
    contact_title: 'Get in Touch',
    contact_subtitle: 'WE ARE HERE FOR YOU',
    contact_text: 'Do you have any questions about our collections, orders or services? Our team will be happy to help you.',
    contact_direccion_title: 'Address',
    contact_direccion: 'Calle de Serrano 45, Madrid, Spain',
    contact_telefono_title: 'Phone',
    contact_telefono: '+34 900 123 456',
    contact_email_title: 'Email',
    contact_email: 'info@maisonelise.com',
    contact_horario_title: 'Hours',
    contact_horario: 'Mon - Sat: 10:00 - 21:00',
    form_nombre: 'First Name',
    form_apellido: 'Last Name',
    form_email: 'Email',
    form_asunto: 'Subject',
    form_mensaje: 'Message',
    form_submit: 'Send Message',
    form_asunto_opciones: 'Select an option,Order,Return,General inquiry,Other',
    cart_title: 'Your Cart',
    cart_empty_title: 'Your cart is empty',
    cart_empty_text: 'Add amazing garments to your cart',
    cart_continuar: 'Continue Shopping',
    cart_subtotal: 'Subtotal',
    cart_envio: 'Shipping calculated at checkout',
    delivery_title: 'Delivery option',
    delivery_pickup: 'Pick up in store',
    delivery_pickup_desc: 'Pay on pickup — Free',
    delivery_home: 'Home delivery',
    delivery_home_desc: 'Delivery in 2-5 business days',
    delivery_cod: 'Cash on delivery',
    delivery_cod_desc: 'Pay when you receive your order',
    cart_checkout: 'Proceed to Payment',
    cart_see_more: '← Continue Shopping',
    checkout_title: 'Order Summary',
    checkout_envio: 'Shipping',
    checkout_gratis: 'Free',
    checkout_direccion_title: 'Shipping Address',
    checkout_nombre: 'Full Name',
    checkout_calle: 'Address',
    checkout_ciudad: 'City',
    checkout_cp: 'Postal Code',
    checkout_pais: 'Country',
    checkout_telefono: 'Phone',
    checkout_pagar: 'Confirm & Pay',
    checkout_pago_online: 'Pay now (payment gateway)',
    footer_desc: 'Women\'s fashion boutique committed to elegance, quality and timeless style. From the heart of Madrid to the world.',
    footer_tienda: 'Shop',
    footer_nosotros: 'About',
    footer_ayuda: 'Help',
    footer_privacidad: 'Privacy Policy',
    footer_cookies: 'Cookie Policy',
    footer_terminos: 'Terms & Conditions',
    footer_requisitos: 'Legal Requirements',
    footer_copyright: '© 2026 Maison Élise. All rights reserved.',
    search_placeholder: 'Search products, collections...',
    search_no_results: 'No results found',
    toast_add_title: 'Product added',
    toast_add_msg: 'Added to your cart',
    toast_remove_title: 'Product removed',
    toast_remove_msg: 'Removed from cart',
  },
  va: {
    topbar_phone: '+34 900 123 456',
    topbar_email: 'info@maisonelise.com',
    topbar_promo: 'ENVIAMENT GRATUÏT A PARTIR DE 80€',
    nav_inicio: 'Inici',
    nav_colecciones: 'Col·leccions',
    nav_novedades: 'Novetats',
    nav_lookbook: 'Lookbook',
    nav_nosotros: 'Nosaltres',
    nav_contacto: 'Contacte',
    nav_buscar: 'Cercar',
    nav_cuenta: 'El Meu Compte',
    nav_carrito: 'Cistella',
    hero_tag: 'Nova Temporada 2026',
    hero_title: 'Elegància que Defineix la teua <em>Essència</em>',
    hero_description: 'Descobreix la nostra col·lecció exclusiva de moda femenina. Peces úniques dissenyades per a dones que saben que la veritable elegància està en els detalls.',
    hero_btn1: 'Vore Col·lecció',
    hero_btn2: 'El Nostre Món',
    hero_scroll: 'Descobrir',
    info_title: 'Per què triar Maison Élise?',
    info_subtitle: 'EXPERIÈNCIA I QUALITAT',
    info1_title: 'Disseny Exclusiu',
    info1_text: 'Cada peça és acuradament seleccionada per oferir l\'últim en moda femenina europea.',
    info2_title: 'Qualitat Premium',
    info2_text: 'Treballem amb els millors materials i artesans per garantir peces duradores i sofisticades.',
    info3_title: 'Atenció Personal',
    info3_text: 'El nostre equip d\'estilistes t\'assessora per crear el look perfecte per a cada ocasió.',
    collections_title: 'Les Nostres Col·leccions',
    collections_subtitle: 'PECES SELECCIONADES',
    filter_all: 'Tot',
    filter_vestidos: 'Vestits',
    filter_abrigos: 'Abrics',
    filter_trajes: 'Trajes',
    filter_accesorios: 'Accessoris',
    quick_add: 'Afegir al Cistell',
    lookbook_tag: 'Primavera / Estiu 2026',
    lookbook_title: 'L\'Art de Vestir amb <em>Intenció</em>',
    lookbook_text: 'La nostra nova col·lecció primavera-estiu celebra la feminitat en totes les seues formes. Teles lleugeres, colors vibrants i talls que afavoreixen cada silueta. Dissenyada per a la dona moderna que no segueix tendències, sinó que les crea.',
    lookbook_btn: 'Explorar Lookbook',
    testimonials_title: 'El que Diuen les Nostres Clientes',
    testimonials_subtitle: 'TESTIMONIS',
    newsletter_title: 'Uneix-te al Nostre Món',
    newsletter_text: 'Subscriu-te per rebre les últimes tendències, ofertes exclusives i accés anticipat a noves col·leccions.',
    newsletter_placeholder: 'El teu correu electrònic',
    newsletter_btn: 'Subscriure\'s',
    contact_title: 'Posa\'t en Contacte',
    contact_subtitle: 'ESTEM ACÍ PER A TU',
    contact_text: 'Tens alguna pregunta sobre les nostres col·leccions, comandes o serveis? El nostre equip estarà encantat d\'ajudar-te.',
    contact_direccion_title: 'Adreça',
    contact_direccion: 'Carrer de Serrano 45, Madrid, Espanya',
    contact_telefono_title: 'Telèfon',
    contact_telefono: '+34 900 123 456',
    contact_email_title: 'Email',
    contact_email: 'info@maisonelise.com',
    contact_horario_title: 'Horari',
    contact_horario: 'Dl - Ds: 10:00 - 21:00',
    form_nombre: 'Nom',
    form_apellido: 'Cognom',
    form_email: 'Email',
    form_asunto: 'Assumpte',
    form_mensaje: 'Missatge',
    form_submit: 'Enviar Missatge',
    form_asunto_opciones: 'Seleccioneu una opció,Comanda,Devolució,Consulta general,Altre',
    cart_title: 'El Teu Cistell',
    cart_empty_title: 'El teu cistell està buit',
    cart_empty_text: 'Afegeix peces increïbles al teu cistell',
    cart_continuar: 'Seguir Comprant',
    cart_subtotal: 'Subtotal',
    cart_envio: 'Enviament calculat al pagament',
    delivery_title: 'Opció d\'entrega',
    delivery_pickup: 'Recol·lir a la botiga',
    delivery_pickup_desc: 'Pagament en recollir — Gratuït',
    delivery_home: 'Enviament a domicili',
    delivery_home_desc: 'Entrega en 2-5 dies laborables',
    delivery_cod: 'Contra reembossament',
    delivery_cod_desc: 'Pagar en rebre la comanda',
    cart_checkout: 'Procedir al Pagament',
    cart_see_more: '← Seguir comprant',
    checkout_title: 'Resum de la Comanda',
    checkout_envio: 'Despeses d\'enviament',
    checkout_gratis: 'Gratuït',
    checkout_direccion_title: 'Adreça d\'enviament',
    checkout_nombre: 'Nom complet',
    checkout_calle: 'Adreça',
    checkout_ciudad: 'Ciutat',
    checkout_cp: 'Codi Postal',
    checkout_pais: 'País',
    checkout_telefono: 'Telèfon',
    checkout_pagar: 'Confirmar i Pagar',
    checkout_pago_online: 'Pagar ara (passarel·la de pagament)',
    footer_desc: 'Botiga de moda femenina compromesa amb l\'elegància, la qualitat i l\'estil atemporal. Des del cor de Madrid per al món.',
    footer_tienda: 'Botiga',
    footer_nosotros: 'Nosaltres',
    footer_ayuda: 'Ajuda',
    footer_privacidad: 'Política de Privacitat',
    footer_cookies: 'Política de Cookies',
    footer_terminos: 'Termes i Condicions',
    footer_requisitos: 'Requisits Legals',
    footer_copyright: '© 2026 Maison Élise. Tots els drets reservats.',
    search_placeholder: 'Cercar productes, col·leccions...',
    search_no_results: 'No s\'han trobat resultats',
    toast_add_title: 'Producte afegit',
    toast_add_msg: 'S\'ha afegit al teu cistell',
    toast_remove_title: 'Producte eliminat',
    toast_remove_msg: 'S\'ha eliminat del cistell',
  }
};

/* --- DATOS DE PRODUCTOS --- */
const products = [
  {
    id: 1, name: 'Vestido Midi Satinado', category: 'vestidos',
    price: 189, originalPrice: 249, badge: 'Nuevo',
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500&h=660&fit=crop',
    description: 'Elegante vestido midi en satén con corte envolvente'
  },
  {
    id: 2, name: 'Abrigo Lana Merino', category: 'abrigos',
    price: 345, originalPrice: null, badge: null,
    image: 'https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?w=500&h=660&fit=crop',
    description: 'Abrigo de lana merino con cinturón y solapas amplias'
  },
  {
    id: 3, name: 'Traje Sastre Beige', category: 'trajes',
    price: 275, originalPrice: 350, badge: '-20%',
    image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=500&h=660&fit=crop',
    description: 'Traje sastre de corte slim en tono beige arena'
  },
  {
    id: 4, name: 'Bolso Cuero Artisan', category: 'accesorios',
    price: 159, originalPrice: null, badge: null,
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500&h=660&fit=crop',
    description: 'Bolso de cuero artesanal con detalles en metal dorado'
  },
  {
    id: 5, name: 'Vestido Floral Largo', category: 'vestidos',
    price: 215, originalPrice: null, badge: 'Exclusivo',
    image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=500&h=660&fit=crop',
    description: 'Vestido largo estampado floral con volantes'
  },
  {
    id: 6, name: 'Blazer Oversized', category: 'trajes',
    price: 195, originalPrice: null, badge: null,
    image: 'https://images.unsplash.com/photo-1591369822096-ffd140ec948f?w=500&h=660&fit=crop',
    description: 'Blazer oversized en tejido premium con hombros marcados'
  },
  {
    id: 7, name: 'Pañuelo Seda Estampado', category: 'accesorios',
    price: 79, originalPrice: 99, badge: '-20%',
    image: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=500&h=660&fit=crop',
    description: 'Pañuelo de seda 100% con estampado exclusivo'
  },
  {
    id: 8, name: 'Abrigo Trench Clásico', category: 'abrigos',
    price: 289, originalPrice: null, badge: 'Bestseller',
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500&h=660&fit=crop',
    description: 'Trench coat clásico con cinturón y doble botonadura'
  }
];

/* --- VARIABLES GLOBALES --- */
let currentLang = localStorage.getItem('lang') || 'es';
let isDarkMode = localStorage.getItem('darkMode') === 'true';
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let deliveryMethod = 'pickup';

/* --- INICIALIZACIÓN --- */
document.addEventListener('DOMContentLoaded', function() {
  initDarkMode();
  initLang();
  initHeader();
  initHamburger();
  initSearchModal();
  initCart();
  initTestimonials();
  initFilters();
  initScrollAnimations();
  initContactForm();
  renderProducts('all');
  updateCartUI();
});

/* ============================================
   MODO CLARO / OSCURO
   ============================================ */
function initDarkMode() {
  if (isDarkMode) {
    document.body.classList.add('dark-mode');
    updateDarkModeIcon(true);
  }
}

function toggleDarkMode() {
  isDarkMode = !isDarkMode;
  document.body.classList.toggle('dark-mode', isDarkMode);
  localStorage.setItem('darkMode', isDarkMode);
  updateDarkModeIcon(isDarkMode);
}

function updateDarkModeIcon(dark) {
  const btn = document.querySelector('.dark-mode-toggle');
  if (!btn) return;
  const sunIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`;
  const moonIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;
  btn.innerHTML = dark ? sunIcon : moonIcon;
}

/* ============================================
   SISTEMA DE IDIOMAS
   ============================================ */
function initLang() {
  setLanguage(currentLang);
  // Botones de idioma desktop
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const lang = this.getAttribute('data-lang');
      setLanguage(lang);
    });
  });
  // Botones de idioma móvil
  document.querySelectorAll('.mobile-lang-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const lang = this.getAttribute('data-lang');
      setLanguage(lang);
    });
  });
}

function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('lang', lang);
  const t = translations[lang];
  if (!t) return;

  // Actualizar todos los elementos con data-i18n
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (t[key] !== undefined) {
      if (el.tagName === 'INPUT' && el.type !== 'radio') {
        el.placeholder = t[key];
      } else {
        el.innerHTML = t[key];
      }
    }
  });

  // Actualizar botones activos
  document.querySelectorAll('.lang-btn, .mobile-lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
  });

  // Actualizar select de asunto
  const asuntoSelect = document.getElementById('contact-subject');
  if (asuntoSelect && t.form_asunto_opciones) {
    const options = t.form_asunto_opciones.split(',');
    asuntoSelect.innerHTML = '';
    options.forEach((opt, i) => {
      const option = document.createElement('option');
      option.value = i === 0 ? '' : opt.trim();
      option.textContent = opt.trim();
      option.disabled = i === 0;
      option.selected = i === 0;
      asuntoSelect.appendChild(option);
    });
  }
}

/* ============================================
   HEADER SCROLL
   ============================================ */
function initHeader() {
  const header = document.querySelector('.header');
  const topbar = document.querySelector('.topbar');

  window.addEventListener('scroll', function() {
    if (window.scrollY > 10) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Smooth scroll para enlaces internos
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const headerHeight = header.offsetHeight;
        const topbarHeight = topbar ? topbar.offsetHeight : 0;
        const offset = headerHeight + topbarHeight;
        const position = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: position, behavior: 'smooth' });
      }
    });
  });
}

/* ============================================
   MENÚ HAMBURGUESA
   ============================================ */
function initHamburger() {
  const hamburger = document.querySelector('.hamburger-btn');
  const mobileMenu = document.querySelector('.mobile-menu');
  const closeBtn = document.querySelector('.mobile-menu-close');

  if (!hamburger || !mobileMenu) return;

  hamburger.addEventListener('click', function() {
    this.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', closeMobileMenu);
  }

  // Cerrar al hacer clic en un enlace
  mobileMenu.querySelectorAll('.mobile-menu-nav a').forEach(link => {
    link.addEventListener('click', function() {
      closeMobileMenu();
    });
  });

  // Cerrar al cambiar tamaño de pantalla
  window.addEventListener('resize', function() {
    if (window.innerWidth > 1024) {
      closeMobileMenu();
    }
  });

  function closeMobileMenu() {
    hamburger.classList.remove('active');
    mobileMenu.classList.remove('active');
    document.body.style.overflow = '';
  }
}

/* ============================================
   MODAL DE BÚSQUEDA
   ============================================ */
function initSearchModal() {
  const searchBtns = document.querySelectorAll('.search-btn, .mobile-search-btn');
  const modal = document.querySelector('.search-modal');
  const overlay = modal ? modal.querySelector('.search-modal-overlay') : null;
  const closeBtn = modal ? modal.querySelector('.search-modal-close') : null;
  const input = modal ? modal.querySelector('.search-modal-input') : null;

  if (!modal) return;

  function openSearch() {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    setTimeout(() => { if (input) input.focus(); }, 300);
  }

  function closeSearch() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
    if (input) input.value = '';
    const results = modal.querySelector('.search-results');
    if (results) results.innerHTML = '';
  }

  searchBtns.forEach(btn => btn.addEventListener('click', openSearch));
  if (overlay) overlay.addEventListener('click', closeSearch);
  if (closeBtn) closeBtn.addEventListener('click', closeSearch);

  // Búsqueda en tiempo real
  if (input) {
    input.addEventListener('input', function() {
      performSearch(this.value.trim());
    });
  }

  // Cerrar con ESC
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeSearch();
    }
  });
}

function performSearch(query) {
  const resultsEl = document.querySelector('.search-results');
  const t = translations[currentLang];
  if (!resultsEl) return;

  if (query.length < 2) {
    resultsEl.innerHTML = '';
    return;
  }

  const filtered = products.filter(p => {
    const name = p.name.toLowerCase();
    const cat = p.category.toLowerCase();
    const desc = p.description.toLowerCase();
    const q = query.toLowerCase();
    return name.includes(q) || cat.includes(q) || desc.includes(q);
  });

  if (filtered.length === 0) {
    resultsEl.innerHTML = `<div class="search-no-results">${t.search_no_results}</div>`;
    return;
  }

  resultsEl.innerHTML = filtered.map(p => {
    const highlightedName = p.name.replace(
      new RegExp(`(${escapeRegex(query)})`, 'gi'),
      '<span class="search-highlight">$1</span>'
    );
    return `
      <div class="search-result-item" onclick="scrollToProduct(${p.id})">
        <h4>${highlightedName}</h4>
        <p>${p.category} — ${p.price}€</p>
      </div>
    `;
  }).join('');
}

function escapeRegex(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function scrollToProduct(id) {
  const modal = document.querySelector('.search-modal');
  modal.classList.remove('active');
  document.body.style.overflow = '';
  // Scroll a la sección de colecciones
  const section = document.getElementById('colecciones');
  if (section) {
    const header = document.querySelector('.header');
    const topbar = document.querySelector('.topbar');
    const offset = (header ? header.offsetHeight : 0) + (topbar ? topbar.offsetHeight : 0);
    const position = section.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top: position, behavior: 'smooth' });
  }
}

/* ============================================
   CARRITO DE COMPRAS
   ============================================ */
function initCart() {
  // Abrir carrito
  document.querySelectorAll('.cart-btn').forEach(btn => {
    btn.addEventListener('click', openCart);
  });

  // Cerrar carrito
  const closeBtn = document.querySelector('.cart-close');
  const overlay = document.querySelector('.cart-overlay');
  if (closeBtn) closeBtn.addEventListener('click', closeCart);
  if (overlay) overlay.addEventListener('click', closeCart);

  // Opciones de entrega
  document.querySelectorAll('.delivery-option').forEach(opt => {
    opt.addEventListener('click', function() {
      document.querySelectorAll('.delivery-option').forEach(o => o.classList.remove('selected'));
      this.classList.add('selected');
      this.querySelector('input[type="radio"]').checked = true;
      deliveryMethod = this.getAttribute('data-method');
    });
  });

  // Checkout
  const checkoutBtn = document.querySelector('.cart-checkout-btn');
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', openCheckout);
  }

  // Cerrar checkout
  const checkoutClose = document.querySelector('.checkout-modal-close');
  const checkoutOverlay = document.querySelector('.checkout-modal-overlay');
  if (checkoutClose) checkoutClose.addEventListener('click', closeCheckout);
  if (checkoutOverlay) checkoutOverlay.addEventListener('click', closeCheckout);

  // Botón pagar en checkout
  const payBtn = document.querySelector('.checkout-pay-btn');
  if (payBtn) {
    payBtn.addEventListener('click', function() {
      alert('Redirigiendo a la pasarela de pago...');
      // Aquí se implementará la pasarela de pago real
    });
  }

  // Seguir comprando
  document.querySelectorAll('.cart-continue').forEach(btn => {
    btn.addEventListener('click', closeCart);
  });
}

function openCart() {
  document.querySelector('.cart-sidebar').classList.add('active');
  document.querySelector('.cart-overlay').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeCart() {
  document.querySelector('.cart-sidebar').classList.remove('active');
  document.querySelector('.cart-overlay').classList.remove('active');
  document.body.style.overflow = '';
}

function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  const existing = cart.find(item => item.id === productId);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
      size: 'M'
    });
  }

  saveCart();
  updateCartUI();
  showToast(translations[currentLang].toast_add_title, translations[currentLang].toast_add_msg);
}

function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  saveCart();
  updateCartUI();
  showToast(translations[currentLang].toast_remove_title, translations[currentLang].toast_remove_msg);
}

function updateQuantity(productId, delta) {
  const item = cart.find(i => i.id === productId);
  if (!item) return;

  item.quantity += delta;
  if (item.quantity <= 0) {
    removeFromCart(productId);
    return;
  }

  saveCart();
  updateCartUI();
}

function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

function updateCartUI() {
  const countEl = document.querySelector('.cart-count');
  const itemsEl = document.querySelector('.cart-items');
  const footerEl = document.querySelector('.cart-footer');
  const emptyEl = document.querySelector('.cart-empty');
  const t = translations[currentLang];

  // Actualizar contador
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  if (countEl) {
    countEl.textContent = totalItems;
    countEl.style.display = totalItems > 0 ? 'flex' : 'none';
  }

  if (!itemsEl) return;

  if (cart.length === 0) {
    itemsEl.innerHTML = `
      <div class="cart-empty">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
          <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/>
        </svg>
        <p><strong>${t.cart_empty_title}</strong></p>
        <p>${t.cart_empty_text}</p>
        <button class="btn btn-outline" style="color:var(--color-text);border-color:var(--color-border);margin-top:1rem" onclick="closeCart()">${t.cart_continuar}</button>
      </div>
    `;
    if (footerEl) footerEl.style.display = 'none';
    return;
  }

  if (footerEl) footerEl.style.display = 'block';

  itemsEl.innerHTML = cart.map(item => `
    <div class="cart-item">
      <div class="cart-item-image">
        <img src="${item.image}" alt="${item.name}" loading="lazy">
      </div>
      <div class="cart-item-info">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-variant">Talla: ${item.size}</div>
        <div class="cart-item-quantity">
          <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">−</button>
          <span>${item.quantity}</span>
          <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
        </div>
      </div>
      <div class="cart-item-price">
        <span class="price">${(item.price * item.quantity).toFixed(2)}€</span>
        <button class="cart-item-remove" onclick="removeFromCart(${item.id})">Eliminar</button>
      </div>
    </div>
  `).join('');

  // Subtotal
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const subtotalEl = document.querySelector('.cart-subtotal .amount');
  if (subtotalEl) subtotalEl.textContent = subtotal.toFixed(2) + '€';
}

/* ============================================
   CHECKOUT (Resumen de Pedido)
   ============================================ */
function openCheckout() {
  if (cart.length === 0) return;
  closeCart();

  const modal = document.querySelector('.checkout-modal');
  if (!modal) return;

  const t = translations[currentLang];

  // Determinar info de entrega
  let deliveryInfo = '';
  let deliveryCost = 0;
  let showAddressForm = false;

  if (deliveryMethod === 'pickup') {
    deliveryInfo = `<strong>${t.delivery_pickup}</strong><br>${t.delivery_pickup_desc}`;
  } else if (deliveryMethod === 'home') {
    deliveryInfo = `<strong>${t.delivery_home}</strong><br>${t.delivery_home_desc}`;
    deliveryCost = 5.99;
    showAddressForm = true;
  } else if (deliveryMethod === 'cod') {
    deliveryInfo = `<strong>${t.delivery_cod}</strong><br>${t.delivery_cod_desc}`;
    deliveryCost = 3.99;
    showAddressForm = true;
  }

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const total = subtotal + deliveryCost;

  // Construir contenido
  let summaryHTML = cart.map(item => `
    <div class="checkout-summary-item">
      <span>${item.name} × ${item.quantity}</span>
      <span>${(item.price * item.quantity).toFixed(2)}€</span>
    </div>
  `).join('');

  let addressFormHTML = '';
  if (showAddressForm) {
    addressFormHTML = `
      <div class="checkout-address-form">
        <h4 style="font-size:0.8rem;letter-spacing:0.1em;text-transform:uppercase;margin-bottom:1rem;color:var(--color-primary);">${t.checkout_direccion_title}</h4>
        <div class="form-group"><label>${t.checkout_nombre}</label><input type="text"></div>
        <div class="form-group"><label>${t.checkout_calle}</label><input type="text"></div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:0.75rem;">
          <div class="form-group"><label>${t.checkout_ciudad}</label><input type="text"></div>
          <div class="form-group"><label>${t.checkout_cp}</label><input type="text"></div>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:0.75rem;">
          <div class="form-group"><label>${t.checkout_pais}</label><input type="text" value="España"></div>
          <div class="form-group"><label>${t.checkout_telefono}</label><input type="tel"></div>
        </div>
      </div>
    `;
  }

  const content = modal.querySelector('.checkout-modal-content');
  content.innerHTML = `
    <button class="checkout-modal-close" onclick="closeCheckout()">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
    </button>
    <h3>${t.checkout_title}</h3>
    ${summaryHTML}
    <div class="checkout-summary-item" style="border:none;">
      <span>${t.checkout_envio}</span>
      <span>${deliveryCost === 0 ? t.checkout_gratis : deliveryCost.toFixed(2) + '€'}</span>
    </div>
    <div class="checkout-total">
      <span>Total</span>
      <span class="amount">${total.toFixed(2)}€</span>
    </div>
    <div class="checkout-delivery-info">
      <h4>Entrega</h4>
      <p>${deliveryInfo}</p>
    </div>
    ${addressFormHTML}
    ${deliveryMethod === 'pickup' ? `<p style="font-size:0.85rem;color:var(--color-text-light);text-align:center;margin-bottom:1rem;">Se le notificará cuando su pedido esté listo para recoger.</p>` : ''}
    <button class="checkout-pay-btn" onclick="processPayment()">${deliveryMethod === 'pickup' ? t.checkout_pagar : t.checkout_pago_online}</button>
  `;

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeCheckout() {
  const modal = document.querySelector('.checkout-modal');
  if (modal) modal.classList.remove('active');
  document.body.style.overflow = '';
}

function processPayment() {
  // Aquí se integrará la pasarela de pago real
  if (deliveryMethod === 'pickup') {
    alert('¡Pedido confirmado! Recibirá una notificación cuando esté listo para recoger en tienda.');
  } else {
    alert('Redirigiendo a la pasarela de pago para procesar el pago de ' +
      document.querySelector('.checkout-total .amount').textContent + '...');
  }
  cart = [];
  saveCart();
  updateCartUI();
  closeCheckout();
}

/* ============================================
   TESTIMONIALS SLIDER
   ============================================ */
function initTestimonials() {
  const track = document.querySelector('.testimonial-track');
  const dots = document.querySelectorAll('.testimonial-dot');
  let current = 0;
  const total = dots.length;

  function goTo(index) {
    current = index;
    if (track) track.style.transform = `translateX(-${current * 100}%)`;
    dots.forEach((dot, i) => dot.classList.toggle('active', i === current));
  }

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => goTo(i));
  });

  // Auto-slide
  if (total > 1) {
    setInterval(() => {
      goTo((current + 1) % total);
    }, 5000);
  }
}

/* ============================================
   FILTROS DE PRODUCTOS
   ============================================ */
function initFilters() {
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      const filter = this.getAttribute('data-filter');
      renderProducts(filter);
    });
  });
}

function renderProducts(filter) {
  const grid = document.querySelector('.products-grid');
  if (!grid) return;

  const t = translations[currentLang];
  const filtered = filter === 'all' ? products : products.filter(p => p.category === filter);

  grid.innerHTML = filtered.map((p, index) => `
    <div class="product-card fade-in" style="animation-delay: ${index * 0.1}s">
      <div class="product-image">
        <img src="${p.image}" alt="${p.name}" loading="lazy">
        ${p.badge ? `<span class="product-badge">${p.badge}</span>` : ''}
        <div class="product-actions">
          <button class="product-action-btn" title="Favorito" onclick="event.stopPropagation()">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>
          </button>
        </div>
        <button class="product-quick-add" onclick="event.stopPropagation(); addToCart(${p.id})">${t.quick_add}</button>
      </div>
      <div class="product-info">
        <div class="product-category">${p.category}</div>
        <div class="product-name">${p.name}</div>
        <div class="product-price">
          <span class="current">${p.price}€</span>
          ${p.originalPrice ? `<span class="original">${p.originalPrice}€</span>` : ''}
        </div>
      </div>
    </div>
  `).join('');

  // Trigger fade-in animations
  requestAnimationFrame(() => {
    grid.querySelectorAll('.fade-in').forEach(el => el.classList.add('visible'));
  });
}

/* ============================================
   SCROLL ANIMATIONS
   ============================================ */
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right').forEach(el => {
    observer.observe(el);
  });
}

/* ============================================
   FORMULARIO DE CONTACTO
   ============================================ */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    // Simular envío
    const btn = form.querySelector('.form-submit');
    const originalText = btn.textContent;
    btn.textContent = '✓ Enviado';
    btn.style.backgroundColor = 'var(--color-success)';
    setTimeout(() => {
      btn.textContent = originalText;
      btn.style.backgroundColor = '';
      form.reset();
    }, 2000);
  });
}

/* ============================================
   TOAST NOTIFICATION
   ============================================ */
function showToast(title, message) {
  // Eliminar toast existente
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/>
      <polyline points="22 4 12 14.01 9 11.01"/>
    </svg>
    <div class="toast-content">
      <div class="toast-title">${title}</div>
      <div class="toast-message">${message}</div>
    </div>
  `;
  document.body.appendChild(toast);

  requestAnimationFrame(() => {
    toast.classList.add('show');
  });

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, 3000);
}

/* ============================================
   NEWSLETTER
   ============================================ */
document.addEventListener('DOMContentLoaded', function() {
  const nlForm = document.querySelector('.newsletter-form');
  if (nlForm) {
    nlForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const input = this.querySelector('input');
      if (input && input.value) {
        showToast('¡Suscripción exitosa!', 'Gracias por unirte a Maison Élise');
        input.value = '';
      }
    });
  }
});