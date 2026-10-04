/* ==========================================================================
   THREADS — Lógica de la aplicación (JavaScript puro)
   Funcionalidades:
   1. Modo claro/oscuro con persistencia
   2. Menú móvil (abrir/cerrar, cerrar en enlace y al redimensionar)
   3. Scroll suave, efectos de scroll y navegación activa
   4. Modal de búsqueda con resaltado de coincidencias
   5. Tienda: renderizado de productos
   6. Carrito: cantidades, entrega (mercado/domicilio) y formas de pago
   7. Modal de pago online (preparado para la pasarela)
   8. Sistema de idiomas (ES / EN / VA)
   9. Formularios de contacto y login (placeholder)
   ========================================================================== */
'use strict';

/* --------------------------------------------------------------------------
   Utilidades generales
   -------------------------------------------------------------------------- */
const $  = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

/* Formatea un número como precio español: 19.9 -> "19,90 €" */
const fmt = (n) => n.toFixed(2).replace('.', ',') + ' €';

/* Clave de almacenamiento local */
const store = {
  get(key, fallback) {
    try { return JSON.parse(localStorage.getItem(key)) ?? fallback; }
    catch { return fallback; }
  },
  set(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* sin persistencia */ }
  }
};

/* --------------------------------------------------------------------------
   1. DATOS: productos de la tienda
   -------------------------------------------------------------------------- */
const products = [
  {
    id: 'camiseta-oversize',
    name: 'Camiseta Oversize "Cloud"',
    price: 19.9,
    tag: 'Nuevo',
    img: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80',
    alt: 'Camiseta oversize blanca sobre fondo claro'
  },
  {
    id: 'hoodie-urbano',
    name: 'Hoodie Urbano "Night"',
    price: 49.9,
    tag: 'Top',
    img: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=800&q=80',
    alt: 'Sudadera con capucha gris colgada'
  },
  {
    id: 'chaqueta-denim',
    name: 'Chaqueta Denim',
    price: 79.9,
    tag: '-20%',
    tagSale: true,
    img: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80',
    alt: 'Chaqueta denim sobre silla'
  },
  {
    id: 'vaqueros-slim',
    name: 'Vaqueros Slim "Raw"',
    price: 59.9,
    tag: 'Nuevo',
    img: 'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=800&q=80',
    alt: 'Pantalones vaqueros azules doblados'
  },
  {
    id: 'zapatillas-street',
    name: 'Zapatillas "Street"',
    price: 89.9,
    tag: 'Top',
    img: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80',
    alt: 'Zapatillas deportivas blancas'
  },
  {
    id: 'gorra-mono',
    name: 'Gorra "Mono"',
    price: 24.9,
    tag: 'Nuevo',
    img: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=800&q=80',
    alt: 'Gorra negra vista de frente'
  }
];

/* --------------------------------------------------------------------------
   2. SISTEMA DE TRADUCCIONES (ES / EN / VA)
   Estructura preparada: solo hay que añadir claves nuevas.
   -------------------------------------------------------------------------- */
const translations = {
  es: {
    'nav.inicio': 'Inicio', 'nav.tienda': 'Tienda', 'nav.colecciones': 'Colecciones',
    'nav.nosotros': 'Nosotros', 'nav.contacto': 'Contacto',
    'topbar.shipping': 'Envío gratis desde 50 €',
    'hero.eyebrow': 'Nueva colección · Otoño 2025',
    'hero.title': 'Viste tu<br><em>actitud</em>',
    'hero.sub': 'Ropa urbana, cómoda y sostenible para jóvenes que quieren destacar sin pasar desapercibidos. Diseños limitados, básicos que elevan cualquier look.',
    'hero.ctaPrimary': 'Ver la tienda', 'hero.ctaSecondary': 'Nuestra historia',
    'hero.meta1': 'clientes felices', 'hero.meta2': '+2.300 reseñas',
    'hero.badge': '4,9 — +2.300 reseñas verificadas',
    'search.menuButton': 'Buscar en la página',
    'search.title': 'Buscar en la página',
    'search.placeholder': 'Escribe para buscar…',
    'search.initial': 'Escribe al menos 2 caracteres para resaltar coincidencias.',
    'search.results': (n, q) => `${n} coincidencia${n === 1 ? '' : 's'} con "${q}". Pulsa la primera para ir allí.`,
    'search.none': (q) => `Sin resultados para "${q}".`,
    'features.eyebrow': 'Por qué Threads',
    'features.title': 'Todo lo que esperas de una tienda moderna',
    'features.f1t': 'Envío rápido', 'features.f1d': 'Recibe tu pedido en 24–48 h en toda España, o recógelo gratis en nuestro puesto del mercado.',
    'features.f2t': '30 días para devolver', 'features.f2d': 'Si no es amor a primera vista, devuélvelo sin preguntas en un plazo de 30 días.',
    'features.f3t': 'Pago 100% seguro', 'features.f3d': 'Paga en efectivo, contra reembolso o online a través de nuestra pasarela cifrada.',
    'features.f4t': 'Materiales sostenibles', 'features.f4d': 'Algodón orgánico y prendas de segunda mano seleccionadas a mano en el mercado.',
    'products.eyebrow': 'Los favoritos',
    'products.title': 'Nuestros básicos, elevados',
    'products.sub': 'Las piezas que no pueden faltar en tu armario urbano.',
    'products.add': 'Añadir al carrito',
    'promo.eyebrow': 'Colección Otoño / Invierno',
    'promo.title': 'Capas urbanas para<br>entrar con fuerza',
    'promo.text': 'Hoodies oversize, chaquetas denim y tonos tierra. Piezas pensadas para combinarse entre sí y durar más de una temporada.',
    'promo.l1': 'Edición limitada de 500 unidades',
    'promo.l2': 'Tallas XS a XXL probadas en el mercado',
    'promo.l3': 'Etiquetas 100% reciclables',
    'promo.cta': 'Reserva la tuya en el mercado',
    'about.eyebrow': 'Nosotros',
    'about.title': 'Hecho en el mercado, para tu calle',
    'about.text': 'Threads nació en un puesto del mercado central con una idea simple: la ropa urbana de calidad no debería ser un lujo. Seleccionamos cada prenda a mano, probamos cada tela y escuchamos a nuestra comunidad para crear piezas con verdadero carácter.',
    'about.s1': 'clientes', 'about.s2': 'marcas seleccionadas', 'about.s3': 'de satisfacción',
    'about.cta': 'Ven a conocernos al puesto 12',
    'contact.eyebrow': 'Contacto', 'contact.title': '¿Hablamos?',
    'contact.text': 'Estamos en el mercado todos los días. Escríbenos y te respondemos en menos de 24 horas laborables.',
    'contact.addressT': 'Visítanos', 'contact.address': 'Mercado Central, puesto 12 · Calle Mayor 5',
    'contact.phoneT': 'Llámanos', 'contact.emailT': 'Escríbenos',
    'contact.hoursT': 'Horario', 'contact.hours': 'Lun–Sáb 9:00–21:00 · Dom 10:00–14:00',
    'contact.formTitle': 'Envíanos un mensaje',
    'contact.name': 'Nombre', 'contact.email': 'Email', 'contact.subject': 'Asunto', 'contact.message': 'Mensaje',
    'contact.namePh': 'Tu nombre', 'contact.emailPh': 'tu@email.com',
    'contact.subjectPh': '¿En qué podemos ayudarte?', 'contact.messagePh': 'Cuéntanos más…',
    'contact.send': 'Enviar mensaje', 'contact.sent': '¡Gracias! Te responderemos en menos de 24 horas.',
    'footer.tagline': 'Ropa urbana con carácter. Hecho en el mercado, para tu calle.',
    'footer.shop': 'Tienda', 'footer.new': 'Novedades', 'footer.hoodies': 'Hoodies',
    'footer.tshirts': 'Camisetas', 'footer.jackets': 'Chaquetas', 'footer.sale': 'Ofertas',
    'footer.help': 'Ayuda', 'footer.shipping': 'Envíos', 'footer.returns': 'Devoluciones',
    'footer.sizes': 'Guía de tallas', 'footer.payment': 'Pago seguro', 'footer.contactLink': 'Contacto',
    'footer.legal': 'Legal', 'footer.cookies': 'Política de cookies', 'footer.legalNotice': 'Aviso legal',
    'footer.privacy': 'Política de privacidad',
    'footer.rights': 'Todos los derechos reservados',
    'footer.made': 'HTML + CSS + JavaScript puro, sin dependencias.',
    'login.title': 'Mi cuenta', 'login.email': 'Email', 'login.password': 'Contraseña',
    'login.emailPh': 'tu@email.com', 'login.passwordPh': '••••••••',
    'login.submit': 'Entrar',
    'login.note': 'El sistema de inicio de sesión se habilitará pronto. Déjanos tu correo y te avisaremos.',
    'cart.title': 'Tu carrito', 'cart.delivery': 'Entrega', 'cart.payment': 'Método de pago',
    'cart.pickup': 'Recoger en el mercado', 'cart.pickupDesc': 'Gratis · Puesto 12, Mercado Central',
    'cart.homeDelivery': 'Envío a domicilio',
    'cart.freeFrom': 'gratis desde 50 €',
    'cart.addrStreet': 'Dirección completa', 'cart.addrCity': 'Ciudad', 'cart.addrZip': 'Código postal',
    'cart.payPickup': 'Pagar al recoger', 'cart.payPickupDesc': 'Efectivo o tarjeta en el puesto',
    'cart.payDelivery': 'Pagar a la entrega', 'cart.payDeliveryDesc': 'Contra reembolso',
    'cart.payOnline': 'Pagar online', 'cart.payOnlineDesc': 'Redirección a la pasarela segura',
    'cart.subtotal': 'Subtotal', 'cart.shipping': 'Envío', 'cart.total': 'Total',
    'cart.checkout': 'Confirmar pedido',
    'cart.noticeEmpty': 'Tu carrito está vacío. Añade productos primero.',
    'cart.noticeAddress': 'Completa la dirección de envío para continuar.',
    'cart.noticePayment': 'Elige un método de pago para continuar.',
    'cart.noticeDelivery': 'Elige una opción de entrega para continuar.',
    'cart.emptyTitle': 'Tu carrito está vacío',
    'cart.emptyText': 'Añade tus prendas favoritas y descubre tu próximo look.',
    'cart.discover': 'Descubrir la tienda',
    'cart.successTitle': '¡Pedido confirmado!',
    'cart.successText': 'Tu pedido', 'cart.successText2': 'Te avisaremos cuando esté listo para recoger o en camino.',
    'cart.continue': 'Seguir explorando',
    'cart.gatewayConnecting': 'Conectando con la pasarela de pago…',
    'cart.gatewayPending': 'Pasarela pendiente de integración: aquí conectarás tu proveedor de pago. Importe reservado: ',
    'payment.title': 'Pago online', 'payment.due': 'Importe a pagar',
    'payment.note': 'Serás redirigido a la pasarela de pago segura del mercado para completar la compra.',
    'payment.now': 'Ir a pagar', 'payment.cancel': 'Cancelar'
  },

  en: {
    'nav.inicio': 'Home', 'nav.tienda': 'Shop', 'nav.colecciones': 'Collections',
    'nav.nosotros': 'About', 'nav.contacto': 'Contact',
    'topbar.shipping': 'Free shipping from €50',
    'hero.eyebrow': 'New collection · Autumn 2025',
    'hero.title': 'Wear your<br><em>attitude</em>',
    'hero.sub': 'Urban, comfortable and sustainable clothing for young people who want to stand out without going unnoticed. Limited designs, essentials that elevate any look.',
    'hero.ctaPrimary': 'Go to the shop', 'hero.ctaSecondary': 'Our story',
    'hero.meta1': 'happy customers', 'hero.meta2': '+2.300 reviews',
    'hero.badge': '4.9 — +2.300 verified reviews',
    'search.menuButton': 'Search the page',
    'search.title': 'Search the page',
    'search.placeholder': 'Type to search…',
    'search.initial': 'Type at least 2 characters to highlight matches.',
    'search.results': (n, q) => `${n} match${n === 1 ? '' : 'es'} for "${q}". Press the first one to jump there.`,
    'search.none': (q) => `No results for "${q}".`,
    'features.eyebrow': 'Why Threads',
    'features.title': 'Everything you expect from a modern shop',
    'features.f1t': 'Fast shipping', 'features.f1d': 'Get your order in 24–48 h across Spain, or collect it free at our market stall.',
    'features.f2t': '30-day returns', 'features.f2d': "If it isn't love at first sight, send it back within 30 days, no questions asked.",
    'features.f3t': '100% secure payment', 'features.f3d': 'Pay in cash, on delivery or online through our encrypted gateway.',
    'features.f4t': 'Sustainable materials', 'features.f4d': 'Organic cotton and second-hand pieces handpicked at the market.',
    'products.eyebrow': 'Favourites',
    'products.title': 'Our essentials, elevated',
    'products.sub': 'The pieces every urban wardrobe needs.',
    'products.add': 'Add to cart',
    'promo.eyebrow': 'Autumn / Winter Collection',
    'promo.title': 'Urban layers to<br>walk in strong',
    'promo.text': 'Oversize hoodies, denim jackets and earth tones. Pieces designed to mix and match and last more than one season.',
    'promo.l1': 'Limited edition of 500 units',
    'promo.l2': 'Sizes XS to XXL tested at the market',
    'promo.l3': '100% recycled labels',
    'promo.cta': 'Reserve yours at the market',
    'about.eyebrow': 'About us',
    'about.title': 'Made at the market, for your street',
    'about.text': 'Threads was born at a stall in the central market with one simple idea: quality urban clothing shouldn\'t be a luxury. We handpick every garment, test every fabric and listen to our community to create pieces with real character.',
    'about.s1': 'customers', 'about.s2': 'brands selected', 'about.s3': 'satisfaction',
    'about.cta': 'Come say hi at stall 12',
    'contact.eyebrow': 'Contact', 'contact.title': "Let's talk",
    'contact.text': 'We are at the market every day. Write to us and we will reply within 24 working hours.',
    'contact.addressT': 'Visit us', 'contact.address': 'Central Market, stall 12 · Mayor Street 5',
    'contact.phoneT': 'Call us', 'contact.emailT': 'Write to us',
    'contact.hoursT': 'Hours', 'contact.hours': 'Mon–Sat 9:00–21:00 · Sun 10:00–14:00',
    'contact.formTitle': 'Send us a message',
    'contact.name': 'Name', 'contact.email': 'Email', 'contact.subject': 'Subject', 'contact.message': 'Message',
    'contact.namePh': 'Your name', 'contact.emailPh': 'you@email.com',
    'contact.subjectPh': 'How can we help?', 'contact.messagePh': 'Tell us more…',
    'contact.send': 'Send message', 'contact.sent': 'Thanks! We will reply within 24 hours.',
    'footer.tagline': 'Urban clothing with character. Made at the market, for your street.',
    'footer.shop': 'Shop', 'footer.new': 'New arrivals', 'footer.hoodies': 'Hoodies',
    'footer.tshirts': 'T-shirts', 'footer.jackets': 'Jackets', 'footer.sale': 'Offers',
    'footer.help': 'Help', 'footer.shipping': 'Shipping', 'footer.returns': 'Returns',
    'footer.sizes': 'Size guide', 'footer.payment': 'Secure payment', 'footer.contactLink': 'Contact',
    'footer.legal': 'Legal', 'footer.cookies': 'Cookie policy', 'footer.legalNotice': 'Legal notice',
    'footer.privacy': 'Privacy policy',
    'footer.rights': 'All rights reserved',
    'footer.made': 'Pure HTML + CSS + JavaScript, no dependencies.',
    'login.title': 'My account', 'login.email': 'Email', 'login.password': 'Password',
    'login.emailPh': 'you@email.com', 'login.passwordPh': '••••••••',
    'login.submit': 'Sign in',
    'login.note': 'The sign-in system will be enabled soon. Leave your email and we will notify you.',
    'cart.title': 'Your cart', 'cart.delivery': 'Delivery', 'cart.payment': 'Payment method',
    'cart.pickup': 'Collect at the market', 'cart.pickupDesc': 'Free · Stall 12, Central Market',
    'cart.homeDelivery': 'Home delivery',
    'cart.freeFrom': 'free from €50',
    'cart.addrStreet': 'Full address', 'cart.addrCity': 'City', 'cart.addrZip': 'Postal code',
    'cart.payPickup': 'Pay on pickup', 'cart.payPickupDesc': 'Cash or card at the stall',
    'cart.payDelivery': 'Pay on delivery', 'cart.payDeliveryDesc': 'Cash on delivery',
    'cart.payOnline': 'Pay online', 'cart.payOnlineDesc': 'Redirect to the secure gateway',
    'cart.subtotal': 'Subtotal', 'cart.shipping': 'Shipping', 'cart.total': 'Total',
    'cart.checkout': 'Place order',
    'cart.noticeEmpty': 'Your cart is empty. Add products first.',
    'cart.noticeAddress': 'Complete the shipping address to continue.',
    'cart.noticePayment': 'Choose a payment method to continue.',
    'cart.noticeDelivery': 'Choose a delivery option to continue.',
    'cart.emptyTitle': 'Your cart is empty',
    'cart.emptyText': 'Add your favourite pieces and discover your next look.',
    'cart.discover': 'Discover the shop',
    'cart.successTitle': 'Order confirmed!',
    'cart.successText': 'Your order', 'cart.successText2': 'We will notify you when it is ready for pickup or on its way.',
    'cart.continue': 'Keep exploring',
    'cart.gatewayConnecting': 'Connecting to the payment gateway…',
    'cart.gatewayPending': 'Gateway pending integration: you will connect your payment provider here. Amount reserved: ',
    'payment.title': 'Online payment', 'payment.due': 'Amount due',
    'payment.note': 'You will be redirected to the market\'s secure payment gateway to complete your purchase.',
    'payment.now': 'Go to pay', 'payment.cancel': 'Cancel'
  },

  /* Valenciano (normes de valència) */
  va: {
    'nav.inicio': 'Inici', 'nav.tienda': 'Tendes', 'nav.colecciones': 'Col·leccions',
    'nav.nosotros': 'Nosaltres', 'nav.contacto': 'Contacte',
    'topbar.shipping': 'Eniu gratis des de 50 €',
    'hero.eyebrow': 'Col·lecció de Tardor 2025',
    'hero.title': 'Vest-te la teua<br><em>atzitud</em>',
    'hero.sub': 'Ropa urbana, còmode i sostenible per a joves que volen destacar. Dissenys limitats, básicos que il·lixen qualsevol look.',
    'hero.ctaPrimary': 'Veure la tendes', 'hero.ctaSecondary': 'La nostra història',
    'hero.meta1': 'clients feliços', 'hero.meta2': '+2.300 ressenyes',
    'hero.badge': '4,9 — +2.300 ressenyes verificades',
    'search.menuButton': 'Buscar en la pàgina',
    'search.title': 'Buscar en la pàgina',
    'search.placeholder': 'Escriu per a buscar…',
    'search.initial': 'Escriu almenys 2 caràcters per a remarcar coincidències.',
    'search.results': (n, q) => `${n} coincidència${n === 1 ? '' : 'ns'} amb "${q}". Prem la primera per a anar-hi.`,
    'search.none': (q) => `Sense resultats per a "${q}".`,
    'features.eyebrow': 'Per què Threads',
    'features.title': 'Tot el que esperes d\'una tendes moderna',
    'features.f1t': 'Eniu ràpid', 'features.f1d': 'Rep la comanda en 24–48 h a tota Espanya, o recóbrala gratis al nostre puny del mercat.',
    'features.f2t': '30 dies per a devolucionar', 'features.f2d': 'Si no és amor a primera vista, devolució-lo sense preguntes en 30 dies.',
    'features.f3t': 'Pagament 100% segur', 'features.f3d': 'Paga en efectiu, contra reemborsament o en línia a través de la nostra pasarel·la xifrada.',
    'features.f4t': 'Materials sostenibles', 'features.f4d': 'Cotonej orgànic i peces de segunda ma seleccionades a mà en el mercat.',
    'products.eyebrow': 'Els preferits',
    'products.title': 'Els nostres básicos, il·lifats',
    'products.sub': 'Les peces que no poden faltar al teu armari urbà.',
    'products.add': 'Afegir al carret',
    'promo.eyebrow': 'Col·lecció de Tardor / Hivern',
    'promo.title': 'Capes urbanes per a<br>entrar amb fora',
    'promo.text': 'Hoodies oversize, jaquetes denim i tons terra. Peces pensades per a combinar-se i durar més d\'una temporada.',
    'promo.l1': 'Edició limitada de 500 unitats',
    'promo.l2': 'Talles XS a XXL provades en el mercat',
    'promo.l3': 'Etiquetes 100% reciclables',
    'promo.cta': 'Reserva la teua al mercat',
    'about.eyebrow': 'Nosaltres',
    'about.title': 'Fet en el mercat, per a la teua carrer',
    'about.text': 'Threads neix en un puny del mercat central amb una idea simple: la ropa urbana de qualitat no hauria de ser un luxe. Seleccionem cada peça a mà, provem cada tela i escoltem la nostra comunitat per a crear peces amb verdader caràcter.',
    'about.s1': 'clients', 'about.s2': 'marques seleccionades', 'about.s3': 'de satisfacció',
    'about.cta': 'Vine a conéixer-nos al puny 12',
    'contact.eyebrow': 'Contacte', 'contact.title': 'Parlem?',
    'contact.text': 'Som al mercat cada dia. Escriu-nos i et respondrem en menys de 24 hores laborables.',
    'contact.addressT': 'Visita\'ns', 'contact.address': 'Mercat Central, puny 12 · Carrer Major 5',
    'contact.phoneT': 'Truca\'ns', 'contact.emailT': 'Escriu\'ns',
    'contact.hoursT': 'Horari', 'contact.hours': 'Dill–Dissab 9:00–21:00 · Diumenge 10:00–14:00',
    'contact.formTitle': 'Envianos un missatge',
    'contact.name': 'Nom', 'contact.email': 'Correu', 'contact.subject': 'Assumpte', 'contact.message': 'Missatge',
    'contact.namePh': 'El teu nom', 'contact.emailPh': 'tu@mail.com',
    'contact.subjectPh': 'En què et podem ajudar?', 'contact.messagePh': 'Conta\'ns més…',
    'contact.send': 'Enviar missatge', 'contact.sent': 'Gràcies! Et respondrem en menys de 24 hores.',
    'footer.tagline': 'Ropa urbana amb caràcter. Fet al mercat, per al teu carrer.',
    'footer.shop': 'Tendes', 'footer.new': 'Novetats', 'footer.hoodies': 'Hoodies',
    'footer.tshirts': 'Camisetes', 'footer.jackets': 'Jaquetes', 'footer.sale': 'Ofertes',
    'footer.help': 'Ajuda', 'footer.shipping': 'Enius', 'footer.returns': 'Devolucions',
    'footer.sizes': 'Guia de tassos', 'footer.payment': 'Pagament segur', 'footer.contactLink': 'Contacte',
    'footer.legal': 'Legal', 'footer.cookies': 'Política de galetes', 'footer.legalNotice': 'Avís legal',
    'footer.privacy': 'Política de privacitat',
    'footer.rights': 'Tots els drets reservats',
    'footer.made': 'HTML + CSS + JavaScript pur, sense dependències.',
    'login.title': 'El meu compte', 'login.email': 'Correu', 'login.password': 'Contrasenya',
    'login.emailPh': 'tu@mail.com', 'login.passwordPh': '••••••••',
    'login.submit': 'Entrar',
    'login.note': 'El sistema d\'inici de sessió s\'habilitará aviat. Deixa\'ns el teu correu i t\'avisarem.',
    'cart.title': 'El teu carret', 'cart.delivery': 'Entrega', 'cart.payment': 'Mètode de pagament',
    'cart.pickup': 'Rebre al mercat', 'cart.pickupDesc': 'Gratis · Pany 12, Mercat Central',
    'cart.homeDelivery': 'Eniu a domicili',
    'cart.freeFrom': 'gratis des de 50 €',
    'cart.addrStreet': 'Adreça completa', 'cart.addrCity': 'Ciutat', 'cart.addrZip': 'Codi postal',
    'cart.payPickup': 'Pagar en rebre', 'cart.payPickupDesc': 'Efectiu o targeta al puny',
    'cart.payDelivery': 'Pagar en l\'entrega', 'cart.payDeliveryDesc': 'Contra reemborsament',
    'cart.payOnline': 'Pagar en línia', 'cart.payOnlineDesc': 'Redirecció a la pasarel·la segura',
    'cart.subtotal': 'Subtotal', 'cart.shipping': 'Eniu', 'cart.total': 'Total',
    'cart.checkout': 'Confirma la comanda',
    'cart.noticeEmpty': 'El teu carret és buit. Afegix productes primer.',
    'cart.noticeAddress': 'Completa l\'adreça d\'eniu per a continuar.',
    'cart.noticePayment': 'Tria un mètode de pagament per a continuar.',
    'cart.noticeDelivery': 'Tria una opció d\'entrega per a continuar.',
    'cart.emptyTitle': 'El teu carret és buit',
    'cart.emptyText': 'Afegix les teues peces preferides i descobreix el teu proper look.',
    'cart.discover': 'Descobrir la tendes',
    'cart.successTitle': '¡Comanda confirmada!',
    'cart.successText': 'La teua comanda', 'cart.successText2': 'T\'avisarem quan estiga llesta per a rebre-la o en camí.',
    'cart.continue': 'Seguir explorant',
    'cart.gatewayConnecting': 'S\'està connectant amb la pasarel·la de pagament…',
    'cart.gatewayPending': 'Pasarel·la pendent d\'integració: ací connectaràs el teu proveïdor de pagament. Import reservat: ',
    'payment.title': 'Pagament en línia', 'payment.due': 'Import a pagar',
    'payment.note': 'Seràs redigitat a la pasarel·la de pagament segura del mercat per a completar la compra.',
    'payment.now': 'Anar a pagar', 'payment.cancel': 'Cancel·lar'
  }
};

/* Idioma activo (se restaura desde localStorage) */
let currentLang = store.get('threads_lang', 'es');

/* Devuelve la traducción de una clave (cadena o función) */
function t(key, ...args) {
  const value = translations[currentLang]?.[key] ?? translations.es[key] ?? key;
  return typeof value === 'function' ? value(...args) : value;
}

/* Aplica el idioma a todos los elementos del DOM */
function applyLanguage(lang) {
  currentLang = translations[lang] ? lang : 'es';

  $$('[data-i18n]').forEach(el => {
    const value = translations[currentLang][el.dataset.i18n];
    if (typeof value === 'string') el.textContent = value;
  });
  $$('[data-i18n-html]').forEach(el => {
    const value = translations[currentLang][el.dataset.i18nHtml];
    if (typeof value === 'string') el.innerHTML = value;
  });
  $$('[data-i18n-placeholder]').forEach(el => {
    const value = translations[currentLang][el.dataset.i18nPlaceholder];
    if (typeof value === 'string') el.setAttribute('placeholder', value);
  });

  /* Marca el botón de idioma activo */
  $$('.lang-btn').forEach(btn => btn.classList.toggle('is-active', btn.dataset.lang === currentLang));

  document.documentElement.lang = currentLang;
  store.set('threads_lang', currentLang);

  /* Refresca textos dinámicos (carrito, estados de formulario) */
  renderCart();
  renderProducts();
}

/* --------------------------------------------------------------------------
   3. MODO CLARO / OSCURO
   -------------------------------------------------------------------------- */
const THEME_KEY = 'threads_theme';

function setTheme(theme) {
  const isDark = theme === 'dark';
  document.body.classList.toggle('dark', isDark);
  /* Actualiza el color de la barra del navegador */
  const meta = $('meta[name="theme-color"]');
  if (meta) meta.setAttribute('content', isDark ? '#0f1014' : '#f6f3ee');
  $('#themeToggle')?.setAttribute('aria-pressed', String(isDark));
  store.set(THEME_KEY, theme);
}

function initTheme() {
  const saved = store.get(THEME_KEY, null);
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  setTheme(saved || (prefersDark ? 'dark' : 'light'));
}

/* Alterna entre modo claro y oscuro */
$('#themeToggle').addEventListener('click', () => {
  const isDark = document.body.classList.contains('dark');
  setTheme(isDark ? 'light' : 'dark');
});

/* --------------------------------------------------------------------------
   4. MENÚ MÓVIL
   -------------------------------------------------------------------------- */
const header = $('#header');
const menuToggle = $('#menuToggle');
const mobileMenu = $('#mobileMenu');

function openMenu() {
  mobileMenu.classList.add('is-open');
  mobileMenu.setAttribute('aria-hidden', 'false');
  menuToggle.classList.add('is-active');
  menuToggle.setAttribute('aria-expanded', 'true');
  menuToggle.setAttribute('aria-label', 'Cerrar menú móvil');
  updateScrollLock();
}

function closeMenu() {
  if (!mobileMenu.classList.contains('is-open')) return;
  mobileMenu.classList.remove('is-open');
  mobileMenu.setAttribute('aria-hidden', 'true');
  menuToggle.classList.remove('is-active');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Abrir menú móvil');
  updateScrollLock();
}

menuToggle.addEventListener('click', () =>
  mobileMenu.classList.contains('is-open') ? closeMenu() : openMenu()
);

/* Cierra la X del menú móvil */
$('#mobileMenuClose').addEventListener('click', closeMenu);

/* Cierra el menú al pulsar cualquier enlace de navegación */
$$('#mobileMenu a[href^="#"]').forEach(link => link.addEventListener('click', closeMenu));

/* --------------------------------------------------------------------------
   5. GESTIÓN DEL SCROLL (efecto header, reveal y navegación activa)
   -------------------------------------------------------------------------- */
function handleScroll() {
  header.classList.toggle('is-scrolled', window.scrollY > 24);
}
window.addEventListener('scroll', handleScroll, { passive: true });
handleScroll();

/* Aparición progresiva de secciones */
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
$$('.reveal').forEach(el => revealObserver.observe(el));

/* Resaltado del enlace de la sección visible */
const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const id = entry.target.id;
    $$('.nav__link, #mobileMenu a[href^="#"]').forEach(link =>
      link.classList.toggle('is-active', link.getAttribute('href') === '#' + id)
    );
  });
}, { rootMargin: '-40% 0px -55% 0px' });
$$('main section[id]').forEach(section => sectionObserver.observe(section));

/* --------------------------------------------------------------------------
   6. MODALES (genéricos) con bloqueo de scroll
   -------------------------------------------------------------------------- */
function updateScrollLock() {
  const anyModalOpen = $$('.modal.is-open').length > 0;
  const cartOpen = $('#cartOverlay').classList.contains('is-open');
  document.body.classList.toggle('no-scroll', anyModalOpen || cartOpen || mobileMenu.classList.contains('is-open'));
}

function openModal(modal) {
  modal.classList.add('is-open');
  modal.setAttribute('aria-hidden', 'false');
  updateScrollLock();
  /* Enfoca el primer input para una UX rápida con teclado */
  setTimeout(() => modal.querySelector('input')?.focus(), 120);
}

function closeModal(modal) {
  modal.classList.remove('is-open');
  modal.setAttribute('aria-hidden', 'true');
  updateScrollLock();
}

/* Cierre al pulsar el backdrop o los botones con data-close-* */
$$('[data-close-search]').forEach(el => el.addEventListener('click', () => closeModal(searchModal)));
$$('[data-close-login]').forEach(el => el.addEventListener('click', () => closeModal(loginModal)));
$$('[data-close-payment]').forEach(el => el.addEventListener('click', () => closeModal(paymentModal)));

/* Cierre con tecla ESC de cualquier modal, menú o carrito */
document.addEventListener('keydown', event => {
  if (event.key !== 'Escape') return;
  $$('.modal.is-open').forEach(closeModal);
  closeCart();
  closeMenu();
});

/* Referencias a modales */
const searchModal = $('#searchModal');
const loginModal = $('#loginModal');
const paymentModal = $('#paymentModal');

/* Apertura del modal de búsqueda (header y menú móvil) */
$('#searchToggle').addEventListener('click', () => {
  searchInput.value = '';
  clearHighlights();
  searchStatus.textContent = t('search.initial');
  openModal(searchModal);
});
$('#mobileSearchBtn').addEventListener('click', () => {
  closeMenu();
  searchInput.value = '';
  clearHighlights();
  searchStatus.textContent = t('search.initial');
  openModal(searchModal);
});

/* Apertura del modal de login (placeholder para el sistema del cliente) */
$('#userToggle').addEventListener('click', () => openModal(loginModal));

/* --------------------------------------------------------------------------
   7. BÚSQUEDA EN LA PÁGINA CON RESALTADO DE COINCIDENCIAS
   -------------------------------------------------------------------------- */
const searchInput = $('#searchInput');
const searchStatus = $('#searchStatus');
const mainContent = $('#main');

/* Elimina los <mark> de resaltado y une los nodos de texto */
function clearHighlights() {
  $$('mark.search-hit', mainContent).forEach(mark =>
    mark.replaceWith(document.createTextNode(mark.textContent))
  );
  mainContent.normalize();
}

/* Busca el texto y envuelve las coincidencias en <mark> */
function highlightMatches(query) {
  const normalized = query.trim().toLowerCase();
  if (normalized.length < 2) return 0;

  /* Recolecta los nodos de texto que contienen la consulta */
  const walker = document.createTreeWalker(mainContent, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      const parent = node.parentElement;
      if (!parent || parent.closest('script, style, mark, .no-search')) return NodeFilter.FILTER_REJECT;
      if (!node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
      return node.nodeValue.toLowerCase().includes(normalized)
        ? NodeFilter.FILTER_ACCEPT
        : NodeFilter.FILTER_REJECT;
    }
  });

  const textNodes = [];
  let node;
  while ((node = walker.nextNode())) textNodes.push(node);

  /* Reemplaza cada coincidencia dentro del nodo por un <mark> */
  textNodes.forEach(textNode => {
    const text = textNode.nodeValue;
    const lower = text.toLowerCase();
    const fragment = document.createDocumentFragment();
    let start = 0;
    let index = lower.indexOf(normalized);

    while (index !== -1) {
      fragment.append(text.slice(start, index));
      const mark = document.createElement('mark');
      mark.className = 'search-hit';
      mark.textContent = text.slice(index, index + normalized.length);
      fragment.append(mark);
      start = index + normalized.length;
      index = lower.indexOf(normalized, start);
    }
    fragment.append(text.slice(start));
    textNode.parentNode.replaceChild(fragment, textNode);
  });

  return $$('mark.search-hit', mainContent).length;
}

/* Búsqueda con debounce para no bloquear el hilo principal */
let searchTimer;
searchInput.addEventListener('input', () => {
  clearTimeout(searchTimer);
  searchTimer = setTimeout(() => {
    const query = searchInput.value;
    clearHighlights();

    if (query.trim().length < 2) {
      searchStatus.textContent = t('search.initial');
      return;
    }

    const total = highlightMatches(query);
    searchStatus.textContent = total
      ? t('search.results', total, query.trim())
      : t('search.none', query.trim());

    /* Desplaza la vista hasta la primera coincidencia */
    const first = $('mark.search-hit', mainContent);
    if (first) first.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, 200);
});

/* --------------------------------------------------------------------------
   8. TIENDA: RENDERIZADO DE PRODUCTOS
   -------------------------------------------------------------------------- */
const productsGrid = $('#productsGrid');

function renderProducts() {
  productsGrid.innerHTML = products.map((product, index) => `
    <article class="product reveal" style="--d:${(index * 0.07).toFixed(2)}s">
      <div class="product__media">
        <img src="${product.img}" alt="${product.alt}" width="800" height="1000" loading="lazy">
        <span class="product__tag${product.tagSale ? ' product__tag--sale' : ''}">${product.tag}</span>
      </div>
      <div class="product__body">
        <h3 class="product__name">${product.name}</h3>
        <p class="product__price">${fmt(product.price)}</p>
        <button class="btn btn--primary btn--sm product__add" data-add="${product.id}">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
          ${t('products.add')}
        </button>
      </div>
    </article>
  `).join('');

  /* Activa las animaciones de aparición de las tarjetas nuevas */
  $$('.product.reveal', productsGrid).forEach(el => revealObserver.observe(el));
}

/* Añadir al carrito (delegación de eventos) */
productsGrid.addEventListener('click', event => {
  const button = event.target.closest('[data-add]');
  if (button) addToCart(button.dataset.add, button);
});

/* --------------------------------------------------------------------------
   9. CARRITO DE COMPRAS
   -------------------------------------------------------------------------- */
const CART_KEY = 'threads_cart';
const SHIPPING_COST = 3.9;
const FREE_SHIPPING_FROM = 50;

const cartOverlay = $('#cartOverlay');
const cartDrawer = $('#cartDrawer');
const cartItemsEl = $('#cartItems');
const cartCountEl = $('#cartCount');
const cartBadge = $('#cartBadge');
const cartEmptyEl = $('#cartEmpty');
const cartScrollEl = $('#cartScroll');
const cartSuccessEl = $('#cartSuccess');
const cartNoticeEl = $('#cartNotice');
const addressFields = $('#addressFields');

let cart = store.get(CART_KEY, []);
let deliveryMethod = store.get('threads_delivery', 'pickup');
let paymentMethod = null;

/* --- Operaciones sobre el carrito --- */
function saveCart() { store.set(CART_KEY, cart); }

function cartQuantity() { return cart.reduce((sum, item) => sum + item.qty, 0); }

function cartSubtotal() {
  return cart.reduce((sum, item) => {
    const product = products.find(p => p.id === item.id);
    return sum + (product ? product.price * item.qty : 0);
  }, 0);
}

function shippingCost() {
  if (deliveryMethod === 'pickup') return 0;
  return cartSubtotal() >= FREE_SHIPPING_FROM ? 0 : SHIPPING_COST;
}

function addToCart(id, sourceButton) {
  const item = cart.find(entry => entry.id === id);
  if (item) item.qty += 1;
  else cart.push({ id, qty: 1 });

  saveCart();
  renderCart();
  openCart();

  /* Animación del botón y del badge */
  cartBadge.classList.remove('is-bumped');
  void cartBadge.offsetWidth;              /* reinicia la animación */
  cartBadge.classList.add('is-bumped');
  if (sourceButton) {
    sourceButton.classList.add('is-added');
    setTimeout(() => sourceButton.classList.remove('is-added'), 600);
  }
}

function changeQuantity(id, delta) {
  const item = cart.find(entry => entry.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty < 1) item.qty = 1;          /* mínimo una unidad */
  saveCart();
  renderCart();
}

function removeFromCart(id) {
  cart = cart.filter(entry => entry.id !== id);
  saveCart();
  renderCart();
}

/* --- Renderizado del carrito --- */
function renderCart() {
  const count = cartQuantity();
  cartCountEl.textContent = count;
  cartBadge.textContent = count;
  cartBadge.style.display = count ? 'grid' : 'none';

  /* Lista de productos */
  if (cart.length) {
    cartItemsEl.innerHTML = cart.map(item => {
      const product = products.find(p => p.id === item.id);
      if (!product) return '';
      return `
        <li class="cart-item">
          <img src="${product.img}" alt="${product.alt}" width="80" height="100">
          <div class="cart-item__info">
            <span class="cart-item__name">${product.name}</span>
            <span class="cart-item__price">${fmt(product.price * item.qty)}</span>
            <div class="qty">
              <button type="button" data-qty="-1" data-id="${product.id}" aria-label="Reducir cantidad">−</button>
              <span>${item.qty}</span>
              <button type="button" data-qty="1" data-id="${product.id}" aria-label="Aumentar cantidad">+</button>
            </div>
          </div>
          <button type="button" class="cart-item__remove" data-remove="${product.id}" aria-label="Eliminar ${product.name}">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </li>`;
    }).join('');
  } else {
    cartItemsEl.innerHTML = '';
  }

  /* Estados: vacío / con contenido / éxito */
  const showSuccess = cartSuccessEl.classList.contains('is-visible');
  cartEmptyEl.classList.toggle('is-visible', !cart.length && !showSuccess);
  cartScrollEl.hidden = !cart.length || showSuccess;
  if (showSuccess) cartSuccessEl.style.display = 'flex';

  /* Sincroniza radios de entrega */
  const deliveryInput = $(`input[name="delivery"][value="${deliveryMethod}"]`);
  if (deliveryInput) deliveryInput.checked = true;
  addressFields.hidden = deliveryMethod !== 'delivery';
  $('#deliveryCostLabel').textContent = fmt(SHIPPING_COST);

  /* Habilita/deshabilita opciones de pago según la entrega */
  updatePaymentAvailability();

  /* Totales */
  $('#summarySubtotal').textContent = fmt(cartSubtotal());
  $('#summaryShipping').textContent = shippingCost() === 0 ? t('cart.freeFrom') === 'gratis desde 50 €' && deliveryMethod === 'pickup' ? 'Gratis' : (cartSubtotal() >= FREE_SHIPPING_FROM ? 'Gratis' : fmt(shippingCost())) : fmt(shippingCost());
  $('#summaryShipping').textContent = shippingCost() === 0 ? 'Gratis' : fmt(shippingCost());
  $('#summaryTotal').textContent = fmt(cartSubtotal() + shippingCost());
}

/* Desactiva las opciones de pago incoherentes con el método de entrega */
function updatePaymentAvailability() {
  const pickupRadio = $('input[name="payment"][value="pickup"]');
  const deliveryRadio = $('input[name="payment"][value="delivery"]');

  pickupRadio.disabled = deliveryMethod === 'delivery';
  deliveryRadio.disabled = deliveryMethod === 'pickup';

  /* Si la opción elegida quedó desactivada, se limpia la selección */
  if (paymentMethod === 'pickup' && pickupRadio.disabled ||
      paymentMethod === 'delivery' && deliveryRadio.disabled) {
    paymentMethod = null;
    const checked = $('input[name="payment"]:checked');
    if (checked) checked.checked = false;
  }
}

/* Muestra un aviso temporal de validación */
function showNotice(message) {
  cartNoticeEl.textContent = message;
  cartNoticeEl.classList.remove('is-visible');
  void cartNoticeEl.offsetWidth;
  cartNoticeEl.classList.add('is-visible');
  clearTimeout(showNotice.timer);
  showNotice.timer = setTimeout(() => {
    cartNoticeEl.textContent = '';
    cartNoticeEl.classList.remove('is-visible');
  }, 3500);
}

/* Apertura / cierre del panel del carrito */
function openCart() {
  cartOverlay.classList.add('is-open');
  cartOverlay.setAttribute('aria-hidden', 'false');
  updateScrollLock();
}

function closeCart() {
  if (!cartOverlay.classList.contains('is-open')) return;
  cartOverlay.classList.remove('is-open');
  cartOverlay.setAttribute('aria-hidden', 'true');
  updateScrollLock();
}

$('#cartToggle').addEventListener('click', openCart);
$('#cartClose').addEventListener('click', closeCart);
$('#cartOverlay').addEventListener('click', event => {
  if (event.target === cartOverlay) closeCart();
});

/* Botón "Descubrir la tienda" del estado vacío */
$('#discoverBtn').addEventListener('click', event => {
  event.preventDefault();
  closeCart();
});

/* Delegación: cantidades y eliminación */
cartItemsEl.addEventListener('click', event => {
  const qtyBtn = event.target.closest('[data-qty]');
  if (qtyBtn) return changeQuantity(qtyBtn.dataset.id, Number(qtyBtn.dataset.qty));

  const removeBtn = event.target.closest('[data-remove]');
  if (removeBtn) removeFromCart(removeBtn.dataset.remove);
});

/* Cambio de método de entrega */
$$('input[name="delivery"]').forEach(radio =>
  radio.addEventListener('change', () => {
    deliveryMethod = radio.value;
    store.set('threads_delivery', deliveryMethod);
    renderCart();
  })
);

/* Cambio de método de pago */
$$('input[name="payment"]').forEach(radio =>
  radio.addEventListener('change', () => {
    paymentMethod = radio.value;
  })
);

/* Confirmación del pedido */
$('#checkoutBtn').addEventListener('click', () => {
  if (!cart.length) return showNotice(t('cart.noticeEmpty'));

  if (deliveryMethod === 'delivery') {
    const street = $('#addrStreet').value.trim();
    const city = $('#addrCity').value.trim();
    const zip = $('#addrZip').value.trim();
    if (!street || !city || !zip) return showNotice(t('cart.noticeAddress'));
  }

  if (!paymentMethod) return showNotice(t('cart.noticePayment'));

  /* Pago online: se abre el modal de la pasarela (aún sin implementar) */
  if (paymentMethod === 'online') return openPaymentModal();

  completeOrder();
});

/* Pedido completado (efectivo/tarjeta al recoger o contra reembolso) */
function completeOrder() {
  $('#orderNumber').textContent = 'THR-' + Math.floor(1000 + Math.random() * 9000);
  cartScrollEl.hidden = true;
  cartEmptyEl.classList.remove('is-visible');
  cartSuccessEl.classList.add('is-visible');

  cart = [];
  saveCart();
  renderCart();
  cartCountEl.textContent = '0';
  cartBadge.textContent = '0';
  cartBadge.style.display = 'none';
}

/* Botón del estado de éxito */
$('#continueShopping').addEventListener('click', () => {
  cartSuccessEl.classList.remove('is-visible');
  cartSuccessEl.style.display = '';
  closeCart();
  renderCart();
});

/* --------------------------------------------------------------------------
   10. MODAL DE PAGO ONLINE (preparado para la pasarela del mercado)
   -------------------------------------------------------------------------- */
function openPaymentModal() {
  /* Rellena el resumen del pedido */
  $('#paymentRecap').innerHTML = cart.map(item => {
    const product = products.find(p => p.id === item.id);
    return product
      ? `<li><span>${product.name} × ${item.qty}</span><strong>${fmt(product.price * item.qty)}</strong></li>`
      : '';
  }).join('') + `<li><span>${t('cart.shipping')}</span><strong>${shippingCost() === 0 ? 'Gratis' : fmt(shippingCost())}</strong></li>`;

  $('#paymentTotal').textContent = fmt(cartSubtotal() + shippingCost());
  $('#paymentStatus').textContent = '';
  openModal(paymentModal);
}

/* Acción "Ir a pagar": aquí se conectará la pasarela de pago del cliente */
$('#payNowBtn').addEventListener('click', () => {
  const total = fmt(cartSubtotal() + shippingCost());
  $('#paymentStatus').textContent = t('cart.gatewayConnecting');
  setTimeout(() => {
    /* Punto de integración: reemplazar por la llamada real a la pasarela */
    $('#paymentStatus').textContent = t('cart.gatewayPending') + total;
  }, 1500);
});

/* --------------------------------------------------------------------------
   11. FORMULARIOS
   -------------------------------------------------------------------------- */
/* Formulario de contacto */
$('#contactForm').addEventListener('submit', event => {
  event.preventDefault();
  const form = event.target;
  if (!form.checkValidity()) { form.reportValidity(); return; }

  const status = $('#contactStatus');
  status.textContent = t('contact.sent');
  status.classList.add('is-success');
  form.reset();
  setTimeout(() => { status.textContent = ''; }, 6000);
});

/* Login (placeholder hasta que se implemente el sistema real) */
$('#loginForm').addEventListener('submit', event => {
  event.preventDefault();
  const status = $('#loginStatus');
  status.textContent = t('login.note');
  status.classList.remove('is-success');
});

/* --------------------------------------------------------------------------
   12. SELECTOR DE IDIOMAS (menú móvil y pie)
   -------------------------------------------------------------------------- */
$$('.lang-btn').forEach(btn =>
  btn.addEventListener('click', () => applyLanguage(btn.dataset.lang))
);

/* --------------------------------------------------------------------------
   13. EVENTO RESIZE: cierra el menú móvil al pasar a escritorio
   -------------------------------------------------------------------------- */
const DESKTOP_BREAKPOINT = 1024;
window.addEventListener('resize', () => {
  if (window.innerWidth > DESKTOP_BREAKPOINT) closeMenu();
});

/* --------------------------------------------------------------------------
   14. ARRANQUE DE LA APLICACIÓN
   -------------------------------------------------------------------------- */
initTheme();
renderProducts();
renderCart();
applyLanguage(currentLang);
$('#year').textContent = new Date().getFullYear();
