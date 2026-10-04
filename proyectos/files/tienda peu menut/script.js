/* ==========================================================================
   PEU MENUT · MODA INFANTIL
   script.js — JavaScript puro (ES6+), sin frameworks ni dependencias
   --------------------------------------------------------------------------
   Módulos:
     1. Estado, utilidades y almacenamiento
     2. Diccionario de idiomas (ES / EN / VA)
     3. Tema claro / oscuro
     4. Sistema de idiomas
     5. Header, menú hamburguesa y eventos de scroll
     6. Aparición de secciones + navegación activa
     7. Catálogo de productos
     8. Carrito: añadir, editar, entrega, pago y checkout
     9. Modales genéricos (búsqueda, login, legales, pago)
    10. Búsqueda en la página con resaltado de coincidencias
    11. Formularios (contacto, newsletter, login)
    12. Avisos de cookies y utilidades finales
   ========================================================================== */
'use strict';

/* ============================ 1. ESTADO Y UTILIDADES ==================== */

/** Claves de almacenamiento local */
const STORE = {
  theme: 'pm_theme',
  lang: 'pm_lang',
  cart: 'pm_cart',
  cookies: 'pm_cookies',
  favs: 'pm_favs'
};

/** Costes de envío y gestión (en euros) */
const COSTS = { shipping: 3.95, freeFrom: 60, codFee: 1.5 };

/** Formateador de moneda */
const money = new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' });

const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

/** Lee JSON del localStorage de forma segura */
const readStore = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (err) {
    return fallback;
  }
};

/** Escribe JSON en el localStorage */
const writeStore = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    /* almacenamiento no disponible (modo privado): se ignora */
  }
};

/** Elimina acentos y normaliza para comparaciones de búsqueda */
const stripAccents = (str) => str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

/** Bloquea / libera el scroll de la página */
const lockScroll = (lock) => document.body.classList.toggle('is-locked', lock);

/* ========================= 2. DICCTIONARIO DE IDIOMAS ================== */
/* Estructura preparada para añadir idiomas: solo hace falta un objeto nuevo.
   No hay traducción automática: todos los textos están escritos a mano.     */
const I18N = {
  /* ----------------------------- ESPAÑOL ------------------------------- */
  es: {
    'skip': 'Saltar al contenido',
    'logo.tag': 'Moda infantil',
    'topbar.hours': 'Lun-Sáb · 10:00-14:00 / 17:00-20:30',
    'topbar.note': 'Envío gratis desde 60 € · Cambios de talla gratis',
    'a11y.search': 'Buscar', 'a11y.user': 'Acceso a mi cuenta', 'a11y.theme': 'Cambiar tema',
    'a11y.cart': 'Ver cesta', 'a11y.menu': 'Abrir menú', 'a11y.top': 'Volver arriba',
    'nav.home': 'Inicio', 'nav.collection': 'Colecciones', 'nav.shop': 'Tienda',
    'nav.sizes': 'Guía de tallas', 'nav.about': 'Nosotros', 'nav.contact': 'Contacto',
    'mobile.title': 'Menú', 'mobile.search': 'Buscar en la web',
    'hero.tag': 'Nueva colección · Primavera 2026',
    'hero.title': 'Ropa que crece,<br>juega y <em>vuelve a empezar</em>',
    'hero.text': 'Algodón orgánico certificado, cortes que respetan el movimiento y una talla para cada etapa. Hecho en Valencia, pensado para durar y para heredarse.',
    'hero.cta1': 'Comprar la colección', 'hero.cta2': 'Ver guía de tallas',
    'hero.stat1': 'Algodón orgánico', 'hero.stat2': 'Envío península', 'hero.stat3': 'Cambios y devoluciones',
    'hero.scroll': 'Desliza',
    'mq.1': 'Algodón orgánico GOTS', 'mq.2': 'Reserva y recoge en tienda en 2 h',
    'mq.3': 'Envío gratis desde 60 €', 'mq.4': 'Tallas de 0 meses a 14 años',
    'mq.5': 'Tejidos sin sustancias alérgenas',
    'info.eyebrow': 'Nuestra forma de hacer ropa', 'info.title': 'Poco ruido, mucho algodón',
    'info.lead': 'Diseñamos colecciones cortas y atemporales para que compremos menos y mejor. Cada prenda se prueba en niños reales antes de llegar a la tienda.',
    'info.card1.title': 'Piel primero',
    'info.card1.text': 'Algodón orgánico GOTS, tintes libres de metales pesados y etiquetas planas para evitar roces.',
    'info.card2.title': 'Tallas honestas',
    'info.card2.text': 'Patronaje real por edad y centímetros, con holgura para crecer y puños que se adaptan.',
    'info.card3.title': 'Recoge en tienda',
    'info.card3.text': 'Reserva en 2 horas y prueba en cabina sin compromiso. Paga allí mismo si lo prefieres.',
    'info.card4.title': 'Segunda vida',
    'info.card4.text': 'Trae la prenda que ya no usa: la reparamos, la reutilizamos y te damos 15 % de descuento.',
    'col.eyebrow': 'Colección', 'col.title': 'Cuatro líneas, un mismo lenguaje',
    'col.text': 'Básicos que aguantan el cole, piezas de ceremonia para los días grandes y tejidos de punto para el invierno. Todo combina entre sí para que no sobre nada en el armario.',
    'col.chip1': 'Bebé 0-24 m', 'col.chip2': 'Niña 2-14 años', 'col.chip3': 'Niño 2-14 años',
    'col.chip4': 'Ceremonia', 'col.chip5': 'Punto y jerseys',
    'col.cta': 'Ver todo el catálogo',
    'col.badge.title': 'Cápsula Mediterrània', 'col.badge.text': '12 prendas en lino, terracota y salvia.',
    'shop.eyebrow': 'Tienda online', 'shop.title': 'Los favoritos de la temporada',
    'shop.lead': 'Elige talla, añade a la cesta y decide al finalizar: recoger gratis en la tienda, envío a domicilio o reserva para probar en cabina.',
    'shop.filter.all': 'Todo', 'shop.filter.bebe': 'Bebé', 'shop.filter.nina': 'Niña',
    'shop.filter.nino': 'Niño', 'shop.filter.punto': 'Punto',
    'shop.note': '¿No encuentras la talla? Escríbenos por WhatsApp y te la reservamos en tienda.',
    'size.eyebrow': 'Cómo lo recibes', 'size.title': 'Recoge, envío o reserva: tú eliges cómo pagar',
    'size.lead': 'Al finalizar la compra puedes pagar en la pasarela del mercado, al recoger en tienda o en el momento de la entrega a domicilio.',
    'size.d1.title': 'Recoger en la tienda', 'size.d1.text': 'Reservamos tu pedido 5 días. Prueba en cabina y paga en caja si así lo decides.', 'size.d1.price': 'Gratis',
    'size.d2.title': 'Envío a domicilio', 'size.d2.text': '24/48 h en península y Baleares. Pago contra entrega disponible.', 'size.d2.price': '3,95 €',
    'size.d3.title': 'Pago online seguro', 'size.d3.text': 'Pasarela del mercado con tarjeta, Bizum o transferencia. Datos cifrados.', 'size.d3.price': '3-D Secure',
    'size.table.title': 'Guía de tallas (cm)',
    'size.table.caption': 'Equivalencia de tallas por altura y edad',
    'size.table.h1': 'Talla', 'size.table.h2': 'Edad', 'size.table.h3': 'Altura', 'size.table.h4': 'Pecho', 'size.table.h5': 'Cintura',
    'size.table.note': 'Las medidas son aproximadas y se toman sobre el cuerpo, no sobre la prenda. Si dudas entre dos tallas, elige la mayor.',
    'about.eyebrow': 'Quiénes somos', 'about.title': 'Una tienda de barrio con puerta digital',
    'about.text': 'Abrimos en 2014 en el barrio de Ruzafa, en Valencia, con una idea simple: ropa cómoda y bonita que no se rompa a la primera. Hoy seguimos probando cada patrón con las familias del barrio y enviamos a toda Europa.',
    'about.i1.title': 'Tienda física', 'about.i1.text': 'Carrer de Cadis 42, Ruzafa · Valencia',
    'about.i2.title': 'Horario', 'about.i2.text': 'Lunes a sábado · 10:00-14:00 y 17:00-20:30',
    'about.rev1': '"El conjunto de punto aguantó tres lavados por semana todo el invierno y sigue como nuevo. Y me ahorré el envío recogiéndolo en 2 horas."', 'about.rev1.by': 'Marta G. · Valencia',
    'about.rev2': '"El consejo de la guía de tallas fue acertado: el vestido de comunión quedaba perfecto. Reservé, lo probé y pagué en tienda."', 'about.rev2.by': 'Laura P. · Torrent',
    'about.rev3': '"Pagué contra entrega y me daba confianza no adelantar el dinero. Todo llegó al día siguiente en caja de cartón reciclado."', 'about.rev3.by': 'Sergio M. · Alicante',
    'contact.eyebrow': 'Contacto', 'contact.title': 'Cuéntanos qué necesitas',
    'contact.lead': 'Tallas, regalos, listas de nacimiento o pedidos para colegios. Respondemos en menos de 24 h laborables.',
    'contact.f1': 'Nombre', 'contact.f2': 'Email', 'contact.f3': 'Teléfono', 'contact.f4': 'Motivo', 'contact.f5': 'Mensaje',
    'contact.o1': 'Dudas de talla', 'contact.o2': 'Estado de mi pedido', 'contact.o3': 'Reserva en tienda',
    'contact.o4': 'Ceremonia y comunión', 'contact.o5': 'Otros',
    'contact.privacy': 'He leído y acepto la política de privacidad y el aviso sobre cookies.',
    'contact.submit': 'Enviar mensaje',
    'contact.i1.title': 'Dirección', 'contact.i2.title': 'Teléfono y WhatsApp', 'contact.i3.title': 'Email',
    'contact.map.note': 'Mapa orientativo: se sustituirá por la ubicación real del cliente.',
    'footer.about': 'Moda infantil de algodón orgánico diseñada y confeccionada en Valencia. Tallas de 0 meses a 14 años.',
    'footer.h1': 'Tienda', 'footer.h2': 'Ayuda', 'footer.h3': 'Legal', 'footer.h4': 'Novedades',
    'footer.l1': 'Novedades', 'footer.l2': 'Colecciones', 'footer.l3': 'Bebé 0-24 m', 'footer.l4': 'Niña y niño',
    'footer.l5': 'Guía de tallas', 'footer.l6': 'Contacto', 'footer.l7': 'Envíos y recogida',
    'footer.l8': 'Cambios y devoluciones', 'footer.l9': 'Formas de pago', 'footer.l10': 'Preguntas frecuentes',
    'footer.l11': 'Política de cookies', 'footer.l12': 'Privacidad', 'footer.l13': 'Condiciones de compra',
    'footer.l14': 'Requisitos técnicos',
    'footer.news': 'Nuevas colecciones y rebajas, una vez al mes. Sin spam.',
    'footer.pay4': 'Contra reembolso',
    'footer.rights': 'Todos los derechos reservados.',
    'footer.made': 'Hecho a mano en Valencia · IVA incluido',
    'cart.title': 'Tu cesta',
    'cart.empty': 'Tu cesta está vacía. Añade prendas y elige cómo quieres recibirlas.',
    'cart.keep': 'Seguir comprando',
    'cart.opt1': '1 · ¿Cómo lo quieres recibir?',
    'cart.opt2': '2 · ¿Cuándo quieres pagar?',
    'cart.d1.title': 'Recoger en la tienda', 'cart.d1.text': 'Gratis · listo en 2 h · C/ Cadis 42, Valencia',
    'cart.d2.title': 'Reservar para probar', 'cart.d2.text': 'Te guardamos la talla 5 días sin compromiso',
    'cart.d3.title': 'Enviar a mi dirección', 'cart.d3.text': '3,95 € · 24/48 h · gratis desde 60 €',
    'cart.store1': 'Ruzafa · C/ Cadis 42', 'cart.store2': 'El Cabañal · Av. dels Toros 18',
    'cart.address': 'Dirección de entrega',
    'cart.f1': 'Nombre y apellidos', 'cart.f2': 'Calle, número y piso', 'cart.f3': 'Código postal', 'cart.f4': 'Teléfono',
    'cart.p1.title': 'Ahora con la pasarela del mercado', 'cart.p1.text': 'Tarjeta, Bizum o transferencia · 3-D Secure',
    'cart.p2.title': 'Al recoger en tienda', 'cart.p2.text': 'Paga en caja cuando pruebes las prendas',
    'cart.p3.title': 'Al recibir el pedido', 'cart.p3.text': 'Contra reembolso · +1,50 € de gestión',
    'cart.subtotal': 'Subtotal', 'cart.shipping': 'Envío', 'cart.fee': 'Gestión contra reembolso',
    'cart.tax': 'IVA incluido', 'cart.total': 'Total', 'cart.checkout': 'Finalizar compra',
    'cart.clear': 'Vaciar cesta', 'cart.note': 'Puedes pagar ahora, al recoger o al recibir tu pedido.',
    'cart.remove': 'Quitar', 'cart.items': 'artículos', 'cart.item': 'artículo',
    'cart.free': 'Gratis',
    'search.title': 'Buscar en la web', 'search.lead': 'Escribe lo que buscas: prendas, tallas, envíos, pago en tienda...',
    'search.placeholder': 'Vestido, algodón, recogida...',
    'search.status.empty': 'Escribe al menos 2 caracteres',
    'search.status.none': 'Sin coincidencias en la página',
    'search.status.found': '{n} coincidencia(s)',
    'search.prev': 'Anterior', 'search.next': 'Siguiente', 'search.clear': 'Limpiar',
    'login.title': 'Mi cuenta', 'login.lead': 'Accede con tu cuenta para ver pedidos, reservas y listas de nacimiento.',
    'login.tab1': 'Iniciar sesión', 'login.tab2': 'Crear cuenta',
    'login.email': 'Email', 'login.pass': 'Contraseña', 'login.name': 'Nombre completo', 'login.submit': 'Entrar',
    'login.note': 'Zona reservada para la integración del sistema de autenticación del cliente: aquí se conectará el backend real.',
    'pay.eyebrow': 'Resumen del pago', 'pay.title': 'Esto es lo que vas a pagar',
    'pay.note.gateway': 'Vas a acceder a la pasarela de pago del mercado. Los datos de tarjeta se introducen en un entorno seguro y cifrado.',
    'pay.cta': 'Ir a la pasarela de pago', 'pay.back': 'Volver a la cesta',
    'pay.line.items': 'Prendas ({n})', 'pay.line.shipping': 'Envío', 'pay.line.fee': 'Gestión contra reembolso',
    'pay.line.total': 'Total a pagar', 'pay.line.pickup': 'Recogida en tienda', 'pay.line.reserve': 'Reserva para probar',
    'done.title': '¡Listo!',
    'done.text.gateway': 'Pago confirmado de forma simulada. Cuando se integre la pasarela real del mercado, aquí se mostrará el resultado del banco.',
    'done.text.pickup': 'Tu reserva está preparada. Te avisaremos por SMS cuando esté lista para recoger y pagar en caja.',
    'done.text.delivery': 'Pedido registrado. Lo recibirás en 24/48 h y pagarás el importe al mensajero.',
    'done.text.reserve': 'Reserva guardada. Te guardamos la talla 5 días; ven a probarla y decide allí.',
    'done.close': 'Aceptar',
    'legal.cookie.title': 'Política de cookies',
    'legal.cookie.lead': 'Esta web no utiliza cookies de terceros ni rastreadores publicitarios.',
    'legal.cookie.h1': 'Cookies técnicas necesarias',
    'legal.cookie.p1': 'Guardamos en tu navegador, mediante localStorage, únicamente tus preferencias: tema claro u oscuro, idioma y el contenido de la cesta. Son datos estrictamente funcionales y no identifican a ninguna persona.',
    'legal.cookie.h2': 'Analítica',
    'legal.cookie.p2': 'No se cargan librerías externas de analítica. Si el cliente instala Google Analytics u otra herramienta, deberá informar aquí y solicitar el consentimiento previo.',
    'legal.cookie.h3': 'Cómo gestionarlas',
    'legal.cookie.p3': 'Puedes borrar los datos guardados desde tu navegador o pulsando el botón «Restablecer preferencias».',
    'legal.cookie.reset': 'Restablecer preferencias',
    'legal.priv.title': 'Privacidad',
    'legal.priv.lead': 'Responsable: Peu Menut Moda Infantil S.L. · Carrer de Cadis 42, Valencia.',
    'legal.priv.p1': 'Los datos del formulario de contacto y del pedido se utilizan exclusivamente para gestionar tu consulta, la entrega y la garantía de las prendas. No se ceden a terceros con fines publicitarios.',
    'legal.priv.p2': 'Puedes ejercer los derechos de acceso, rectificación, supresión y portabilidad escribiendo a hola@peumenut.es, adjuntando un documento que acredite tu identidad.',
    'legal.priv.p3': 'Conservamos los datos de factura durante los plazos legales (6 años) y los datos de marketing hasta que retires el consentimiento.',
    'legal.terms.title': 'Condiciones de compra',
    'legal.terms.h1': 'Precios y pago', 'legal.terms.p1': 'Todos los precios incluyen IVA. Puedes pagar en la pasarela del mercado, en tienda al recoger o contra reembolso al recibir el pedido (1,50 € de gestión).',
    'legal.terms.h2': 'Reserva en tienda', 'legal.terms.p2': 'La reserva mantiene las prendas separadas 5 días naturales. No supone ningún cargo hasta que confirmas la compra en caja.',
    'legal.terms.h3': 'Envíos', 'legal.terms.p3': 'Península 24/48 h por 3,95 € (gratis desde 60 €). Baleares 3-4 días. Internacionales mediante presupuesto.',
    'legal.terms.h4': 'Devoluciones', 'legal.terms.p4': '30 días naturales con la prenda sin usar y etiquetas intactas. El cambio de talla es gratuito en tienda.',
    'legal.req.title': 'Requisitos técnicos',
    'legal.req.l1': 'HTML5 semántico, CSS3 y JavaScript nativo (ES6+): sin frameworks, librerías ni CDN.',
    'legal.req.l2': 'Navegadores compatibles: Chrome, Edge, Firefox y Safari en sus dos últimas versiones.',
    'legal.req.l3': 'Diseño responsive verificado de 320 px a 1920 px.',
    'legal.req.l4': 'Preferencias guardadas con localStorage (tema, idioma y cesta).',
    'legal.req.l5': 'Pendiente de integración: sistema de login y pasarela de pago del mercado.',
    'legal.faq.title': 'Preguntas frecuentes',
    'legal.faq.q1': '¿Cuánto tarda mi pedido?', 'legal.faq.a1': 'Si recoges en tienda, en 2 horas. Si lo enviamos, 24/48 h en península.',
    'legal.faq.q2': '¿Puedo pagar al recogerlo?', 'legal.faq.a2': 'Sí. Elige «Al recoger en tienda» y paga en caja cuando pruebes las prendas.',
    'legal.faq.q3': '¿Y si la talla no va bien?', 'legal.faq.a3': 'El primer cambio de talla es gratis, también en pedidos enviados a domicilio.',
    'legal.faq.q4': '¿Hacéis listas de nacimiento?', 'legal.faq.a4': 'Sí, preparamos la lista en tienda o por videollamada y la compartimos con la familia.',
    'cookie.title': 'Cookies y privacidad',
    'cookie.text': 'Usamos solo almacenamiento local para recordar tu tema, tu idioma y tu cesta. Sin rastreadores de terceros.',
    'cookie.accept': 'Aceptar', 'cookie.reject': 'Solo lo necesario', 'cookie.more': 'Más información',
    'toast.added': 'Añadido a la cesta',
    'toast.removed': 'Prenda eliminada',
    'toast.cleared': 'Cesta vaciada',
    'toast.fav': 'Guardado en favoritos',
    'toast.formOk': 'Mensaje enviado. Te contestamos en 24 h.',
    'toast.formError': 'Revisa los campos marcados',
    'toast.newsOk': '¡Suscripción confirmada!',
    'toast.loginOk': 'Acceso simulado correcto (backend pendiente)',
    'toast.payOk': 'Pago simulado realizado',
    'toast.address': 'Completa la dirección de entrega',
    'toast.paymentMode': 'El pago en tienda solo está disponible con recogida. Hemos ajustado el pago.',
    'toast.reset': 'Preferencias restablecidas',
    'toast.theme': 'Tema cambiado'
  },

  /* ------------------------------ ENGLISH ------------------------------ */
  en: {
    'skip': 'Skip to content',
    'logo.tag': "Children's fashion",
    'topbar.hours': 'Mon-Sat · 10:00-14:00 / 17:00-20:30',
    'topbar.note': 'Free shipping over €60 · Free size exchanges',
    'a11y.search': 'Search', 'a11y.user': 'My account', 'a11y.theme': 'Switch theme',
    'a11y.cart': 'View basket', 'a11y.menu': 'Open menu', 'a11y.top': 'Back to top',
    'nav.home': 'Home', 'nav.collection': 'Collections', 'nav.shop': 'Shop',
    'nav.sizes': 'Size guide', 'nav.about': 'About us', 'nav.contact': 'Contact',
    'mobile.title': 'Menu', 'mobile.search': 'Search the site',
    'hero.tag': 'New collection · Spring 2026',
    'hero.title': 'Clothes that grow,<br>play and <em>start again</em>',
    'hero.text': 'Certified organic cotton, cuts that respect movement and a size for every stage. Made in Valencia, built to last and to be handed down.',
    'hero.cta1': 'Shop the collection', 'hero.cta2': 'See the size guide',
    'hero.stat1': 'Organic cotton', 'hero.stat2': 'Mainland delivery', 'hero.stat3': 'Exchanges & returns',
    'hero.scroll': 'Scroll',
    'mq.1': 'GOTS organic cotton', 'mq.2': 'Reserve & collect in store in 2 h',
    'mq.3': 'Free shipping over €60', 'mq.4': 'Sizes from 0 months to 14 years',
    'mq.5': 'Fabrics free from allergens',
    'info.eyebrow': 'How we make clothes', 'info.title': 'Little noise, lots of cotton',
    'info.lead': 'We design short, timeless collections so we can all buy less and better. Every garment is tested on real children before reaching the shop.',
    'info.card1.title': 'Skin first',
    'info.card1.text': 'GOTS organic cotton, dyes free from heavy metals and flat labels to avoid scratching.',
    'info.card2.title': 'Honest sizing',
    'info.card2.text': 'Real patterns by age and centimetres, with growing room and cuffs that adapt.',
    'info.card3.title': 'Collect in store',
    'info.card3.text': 'Ready in 2 hours, try it on in the fitting room, no obligation. Pay there if you prefer.',
    'info.card4.title': 'Second life',
    'info.card4.text': 'Bring back what no longer fits: we repair it, reuse it and give you 15% off.',
    'col.eyebrow': 'Collection', 'col.title': 'Four lines, one language',
    'col.text': 'Basics that survive school, ceremony pieces for the big days and knitwear for winter. Everything mixes together so nothing sits unused in the wardrobe.',
    'col.chip1': 'Baby 0-24 m', 'col.chip2': 'Girls 2-14 y', 'col.chip3': 'Boys 2-14 y',
    'col.chip4': 'Ceremony', 'col.chip5': 'Knitwear',
    'col.cta': 'Browse the full catalogue',
    'col.badge.title': 'Mediterrània capsule', 'col.badge.text': '12 pieces in linen, terracotta and sage.',
    'shop.eyebrow': 'Online shop', 'shop.title': 'Season favourites',
    'shop.lead': 'Pick a size, add to the basket and decide at checkout: collect free in store, home delivery or reserve to try on.',
    'shop.filter.all': 'All', 'shop.filter.bebe': 'Baby', 'shop.filter.nina': 'Girls',
    'shop.filter.nino': 'Boys', 'shop.filter.punto': 'Knitwear',
    'shop.note': "Can't find the size? Message us on WhatsApp and we'll hold it for you in store.",
    'size.eyebrow': 'How you get it', 'size.title': 'Collect, ship or reserve: you choose how to pay',
    'size.lead': 'At checkout you can pay through the marketplace gateway, in store when you collect, or on delivery.',
    'size.d1.title': 'Collect in store', 'size.d1.text': 'We hold your order for 5 days. Try it on and pay at the till if you wish.', 'size.d1.price': 'Free',
    'size.d2.title': 'Home delivery', 'size.d2.text': '24/48 h in mainland Spain and the Balearics. Cash on delivery available.', 'size.d2.price': '€3.95',
    'size.d3.title': 'Secure online payment', 'size.d3.text': 'Marketplace gateway with card, Bizum or transfer. Encrypted data.', 'size.d3.price': '3-D Secure',
    'size.table.title': 'Size guide (cm)',
    'size.table.caption': 'Size equivalence by height and age',
    'size.table.h1': 'Size', 'size.table.h2': 'Age', 'size.table.h3': 'Height', 'size.table.h4': 'Chest', 'size.table.h5': 'Waist',
    'size.table.note': 'Measurements are approximate and taken on the body, not the garment. If in doubt between two sizes, choose the larger one.',
    'about.eyebrow': 'About us', 'about.title': 'A neighbourhood shop with a digital door',
    'about.text': "We opened in 2014 in Ruzafa, Valencia, with a simple idea: comfortable, beautiful clothes that don't fall apart. We still test every pattern with local families and now ship across Europe.",
    'about.i1.title': 'The shop', 'about.i1.text': 'Carrer de Cadis 42, Ruzafa · Valencia',
    'about.i2.title': 'Opening hours', 'about.i2.text': 'Monday to Saturday · 10:00-14:00 and 17:00-20:30',
    'about.rev1': '"The knit set survived three washes a week all winter and still looks new. And I saved the delivery fee by collecting in 2 hours."', 'about.rev1.by': 'Marta G. · Valencia',
    'about.rev2': '"The size guide advice was spot on: the communion dress fitted perfectly. I reserved it, tried it on and paid in store."', 'about.rev2.by': 'Laura P. · Torrent',
    'about.rev3': '"I paid on delivery, which felt safer than paying up front. Everything arrived next day in recycled cardboard."', 'about.rev3.by': 'Sergio M. · Alicante',
    'contact.eyebrow': 'Contact', 'contact.title': 'Tell us what you need',
    'contact.lead': 'Sizes, gifts, birth lists or school orders. We reply within 24 working hours.',
    'contact.f1': 'Name', 'contact.f2': 'Email', 'contact.f3': 'Phone', 'contact.f4': 'Subject', 'contact.f5': 'Message',
    'contact.o1': 'Size advice', 'contact.o2': 'Order status', 'contact.o3': 'Store reservation',
    'contact.o4': 'Ceremony & communion', 'contact.o5': 'Other',
    'contact.privacy': 'I have read and accept the privacy policy and the cookie notice.',
    'contact.submit': 'Send message',
    'contact.i1.title': 'Address', 'contact.i2.title': 'Phone & WhatsApp', 'contact.i3.title': 'Email',
    'contact.map.note': 'Indicative map: it will be replaced by the client location.',
    'footer.about': "Organic cotton children's clothing designed and made in Valencia. Sizes from 0 months to 14 years.",
    'footer.h1': 'Shop', 'footer.h2': 'Help', 'footer.h3': 'Legal', 'footer.h4': 'Newsletter',
    'footer.l1': 'New in', 'footer.l2': 'Collections', 'footer.l3': 'Baby 0-24 m', 'footer.l4': 'Girls & boys',
    'footer.l5': 'Size guide', 'footer.l6': 'Contact', 'footer.l7': 'Shipping & collection',
    'footer.l8': 'Exchanges & returns', 'footer.l9': 'Payment methods', 'footer.l10': 'FAQ',
    'footer.l11': 'Cookie policy', 'footer.l12': 'Privacy', 'footer.l13': 'Terms of sale',
    'footer.l14': 'Technical requirements',
    'footer.news': 'New collections and sales, once a month. No spam.',
    'footer.pay4': 'Cash on delivery',
    'footer.rights': 'All rights reserved.',
    'footer.made': 'Handmade in Valencia · VAT included',
    'cart.title': 'Your basket',
    'cart.empty': 'Your basket is empty. Add some pieces and choose how you want them.',
    'cart.keep': 'Keep shopping',
    'cart.opt1': '1 · How do you want to receive it?',
    'cart.opt2': '2 · When do you want to pay?',
    'cart.d1.title': 'Collect in store', 'cart.d1.text': 'Free · ready in 2 h · 42 Cadis St, Valencia',
    'cart.d2.title': 'Reserve to try on', 'cart.d2.text': 'We hold your size for 5 days, no obligation',
    'cart.d3.title': 'Ship to my address', 'cart.d3.text': '€3.95 · 24/48 h · free over €60',
    'cart.store1': 'Ruzafa · 42 Cadis St', 'cart.store2': 'El Cabañal · 18 dels Toros Av.',
    'cart.address': 'Delivery address',
    'cart.f1': 'Full name', 'cart.f2': 'Street, number and floor', 'cart.f3': 'Postcode', 'cart.f4': 'Phone',
    'cart.p1.title': 'Now, with the marketplace gateway', 'cart.p1.text': 'Card, Bizum or transfer · 3-D Secure',
    'cart.p2.title': 'When collecting in store', 'cart.p2.text': 'Pay at the till once you have tried everything on',
    'cart.p3.title': 'On delivery', 'cart.p3.text': 'Cash on delivery · +€1.50 handling',
    'cart.subtotal': 'Subtotal', 'cart.shipping': 'Shipping', 'cart.fee': 'Cash on delivery fee',
    'cart.tax': 'VAT included', 'cart.total': 'Total', 'cart.checkout': 'Checkout',
    'cart.clear': 'Empty basket', 'cart.note': 'You can pay now, in store or on delivery.',
    'cart.remove': 'Remove', 'cart.items': 'items', 'cart.item': 'item',
    'cart.free': 'Free',
    'search.title': 'Search the site', 'search.lead': 'Type what you are looking for: garments, sizes, shipping, paying in store...',
    'search.placeholder': 'Dress, cotton, collection...',
    'search.status.empty': 'Type at least 2 characters',
    'search.status.none': 'No matches on the page',
    'search.status.found': '{n} match(es)',
    'search.prev': 'Previous', 'search.next': 'Next', 'search.clear': 'Clear',
    'login.title': 'My account', 'login.lead': 'Sign in to see your orders, reservations and birth lists.',
    'login.tab1': 'Sign in', 'login.tab2': 'Create account',
    'login.email': 'Email', 'login.pass': 'Password', 'login.name': 'Full name', 'login.submit': 'Enter',
    'login.note': 'Area reserved for the client authentication system: the real backend will be connected here.',
    'pay.eyebrow': 'Payment summary', 'pay.title': 'This is what you will pay',
    'pay.note.gateway': 'You are about to reach the marketplace payment gateway. Card details are entered in a secure, encrypted environment.',
    'pay.cta': 'Go to the payment gateway', 'pay.back': 'Back to basket',
    'pay.line.items': 'Garments ({n})', 'pay.line.shipping': 'Shipping', 'pay.line.fee': 'Cash on delivery fee',
    'pay.line.total': 'Total to pay', 'pay.line.pickup': 'Collection in store', 'pay.line.reserve': 'Reservation to try on',
    'done.title': 'All done!',
    'done.text.gateway': 'Payment confirmed in simulation mode. Once the real marketplace gateway is integrated, the bank response will be shown here.',
    'done.text.pickup': 'Your order is being prepared. We will text you when it is ready to collect and pay at the till.',
    'done.text.delivery': 'Order registered. You will receive it in 24/48 h and pay the courier on arrival.',
    'done.text.reserve': 'Reservation saved. We hold your size for 5 days; come and try it on.',
    'done.close': 'Accept',
    'legal.cookie.title': 'Cookie policy',
    'legal.cookie.lead': 'This website uses no third-party cookies and no advertising trackers.',
    'legal.cookie.h1': 'Necessary technical cookies',
    'legal.cookie.p1': 'We store in your browser, through localStorage, only your preferences: light or dark theme, language and basket contents. Strictly functional data that identifies no person.',
    'legal.cookie.h2': 'Analytics',
    'legal.cookie.p2': 'No external analytics libraries are loaded. If the client installs Google Analytics or another tool, it must be disclosed here with prior consent.',
    'legal.cookie.h3': 'How to manage them',
    'legal.cookie.p3': 'You can delete the stored data from your browser or press the "Reset preferences" button.',
    'legal.cookie.reset': 'Reset preferences',
    'legal.priv.title': 'Privacy',
    'legal.priv.lead': 'Data controller: Peu Menut Moda Infantil S.L. · 42 Cadis St, Valencia.',
    'legal.priv.p1': 'Contact and order data are used solely to handle your enquiry, delivery and garment warranty. They are never shared with third parties for advertising.',
    'legal.priv.p2': 'You may exercise access, rectification, erasure and portability rights by writing to hola@peumenut.es with proof of identity.',
    'legal.priv.p3': 'Invoice data are kept for the legal period (6 years) and marketing data until you withdraw consent.',
    'legal.terms.title': 'Terms of sale',
    'legal.terms.h1': 'Prices and payment', 'legal.terms.p1': 'All prices include VAT. You can pay through the marketplace gateway, in store on collection, or cash on delivery (€1.50 handling).',
    'legal.terms.h2': 'Store reservation', 'legal.terms.h2': 'Reservations hold the garments for 5 calendar days. Nothing is charged until you confirm the purchase at the till.',
    'legal.terms.h3': 'Shipping', 'legal.terms.h3': 'Mainland Spain 24/48 h for €3.95 (free over €60). Balearics 3-4 days. International on request.',
    'legal.terms.h4': 'Returns', 'legal.terms.h4': '30 calendar days with the garment unused and labels intact. First size exchange is free in store.',
    'legal.req.title': 'Technical requirements',
    'legal.req.l1': 'Semantic HTML5, CSS3 and vanilla JavaScript (ES6+): no frameworks, libraries or CDNs.',
    'legal.req.l2': 'Supported browsers: Chrome, Edge, Firefox and Safari, latest two versions.',
    'legal.req.l3': 'Responsive layout checked from 320 px to 1920 px.',
    'legal.req.l4': 'Preferences stored with localStorage (theme, language and basket).',
    'legal.req.l5': 'Pending integration: login system and marketplace payment gateway.',
    'legal.faq.title': 'Frequently asked questions',
    'legal.faq.q1': 'How long does my order take?', 'legal.faq.a1': 'Store collection in 2 hours. Shipping takes 24/48 h in mainland Spain.',
    'legal.faq.q2': 'Can I pay when I collect it?', 'legal.faq.a2': 'Yes. Choose "When collecting in store" and pay at the till after trying everything on.',
    'legal.faq.q3': 'What if the size does not fit?', 'legal.faq.a3': 'The first size exchange is free, even for home deliveries.',
    'legal.faq.q4': 'Do you make birth lists?', 'legal.faq.a4': 'Yes, we prepare the list in store or by video call and share it with the family.',
    'cookie.title': 'Cookies & privacy',
    'cookie.text': 'We only use local storage to remember your theme, language and basket. No third-party trackers.',
    'cookie.accept': 'Accept', 'cookie.reject': 'Only necessary', 'cookie.more': 'More information',
    'toast.added': 'Added to the basket',
    'toast.removed': 'Garment removed',
    'toast.cleared': 'Basket emptied',
    'toast.fav': 'Saved to favourites',
    'toast.formOk': 'Message sent. We reply within 24 h.',
    'toast.formError': 'Please check the highlighted fields',
    'toast.newsOk': 'Subscription confirmed!',
    'toast.loginOk': 'Simulated sign-in (backend pending)',
    'toast.payOk': 'Simulated payment completed',
    'toast.address': 'Please complete the delivery address',
    'toast.paymentMode': 'In-store payment is only available with collection. Payment adjusted.',
    'toast.reset': 'Preferences reset',
    'toast.theme': 'Theme switched'
  },

  /* ---------------------------- VALENCIÀ ------------------------------- */
  va: {
    'skip': 'Ves al contingut',
    'logo.tag': 'Moda infantil',
    'topbar.hours': 'Dll-Ds · 10:00-14:00 / 17:00-20:30',
    'topbar.note': 'Enviament gratis des de 60 € · Canvis de talla gratis',
    'a11y.search': 'Cercar', 'a11y.user': 'Accés al meu compte', 'a11y.theme': "Canviar tema",
    'a11y.cart': "Veure cistella", 'a11y.menu': "Obrir menú", 'a11y.top': "Tornar a dalt",
    'nav.home': 'Inici', 'nav.collection': 'Col·leccions', 'nav.shop': 'Botiga',
    'nav.sizes': "Guia de talles", 'nav.about': 'Nosaltres', 'nav.contact': 'Contacte',
    'mobile.title': 'Menú', 'mobile.search': 'Cercar a la web',
    'hero.tag': 'Nova col·lecció · Primavera 2026',
    'hero.title': 'Roba que creix,<br>juga i <em>torna a començar</em>',
    'hero.text': 'Cotó orgànic certificat, talls que respecten el moviment i una talla per a cada etapa. Fet a València, pensat per a durar i per a heretar.',
    'hero.cta1': 'Comprar la col·lecció', 'hero.cta2': "Veure la guia de talles",
    'hero.stat1': 'Cotó orgànic', 'hero.stat2': 'Enviament península', 'hero.stat3': 'Canvis i devolucions',
    'hero.scroll': 'Baixa',
    'mq.1': 'Cotó orgànic GOTS', 'mq.2': 'Reserva i recull a la botiga en 2 h',
    'mq.3': 'Enviament gratis des de 60 €', 'mq.4': 'Talles de 0 mesos a 14 anys',
    'mq.5': "Teixits sense substàncies al·lergèniques",
    'info.eyebrow': 'La nostra manera de fer roba', 'info.title': 'Poc soroll, molt cotó',
    'info.lead': 'Dissenyem col·leccions curtes i atemporals per a comprar menys i millor. Cada peça es prova en xiquets reals abans d\'arribar a la botiga.',
    'info.card1.title': 'La pell primer',
    'info.card1.text': 'Cotó orgànic GOTS, tintes lliures de metalls pesats i etiquetes planes per a evitar roces.',
    'info.card2.title': 'Talles honestes',
    'info.card2.text': 'Patronatge real per edat i centímetres, amb folgança per a créixer i punys que s\'adapten.',
    'info.card3.title': 'Recull a la botiga',
    'info.card3.text': 'Reserva en 2 hores i prova al provador sense compromís. Paga allà mateix si ho prefereixes.',
    'info.card4.title': 'Segona vida',
    'info.card4.text': 'Torna la peça que ja no serveix: la reparem, la reutilitzem i et donem un 15 % de descompte.',
    'col.eyebrow': 'Col·lecció', 'col.title': 'Quatre línies, un mateix llenguatge',
    'col.text': 'Bàsics que aguanten el col·legi, peces de cerimònia per als dies grans i punts de teixir per a l\'hivern. Tot es combina perquè no sobre res en l\'armari.',
    'col.chip1': 'Bebé 0-24 m', 'col.chip2': "Xiqueta 2-14 anys", 'col.chip3': "Xiquet 2-14 anys",
    'col.chip4': 'Cerimònia', 'col.chip5': 'Punt i jerseis',
    'col.cta': "Veure tot el catàleg",
    'col.badge.title': 'Càpsula Mediterrània', 'col.badge.text': '12 peces en lli, terracota i sàlvia.',
    'shop.eyebrow': 'Botiga online', 'shop.title': 'Els favorits de la temporada',
    'shop.lead': 'Tria talla, afig a la cistella i decideix al finalitzar: recull gratis a la botiga, enviament a casa o reserva per a provar.',
    'shop.filter.all': 'Tot', 'shop.filter.bebe': 'Bebé', 'shop.filter.nina': 'Xiqueta',
    'shop.filter.nino': 'Xiquet', 'shop.filter.punto': 'Punt',
    'shop.note': 'No trobes la talla? Escriu-nos per WhatsApp i te la reservem a la botiga.',
    'size.eyebrow': 'Com ho repets', 'size.title': 'Recull, enviament o reserva: tu tries com pagar',
    'size.lead': 'En finalitzar la compra pots pagar en la passarel·la del mercat, al recollir a la botiga o al moment de l\'entrega a casa.',
    'size.d1.title': 'Recollir a la botiga', 'size.d1.text': 'Guardem la teua comanda 5 dies. Prova al provador i paga en caixa si vols.', 'size.d1.price': 'Gratis',
    'size.d2.title': 'Enviament a casa', 'size.d2.text': '24/48 h a península i Balears. Pagament contra lliurament disponible.', 'size.d2.price': '3,95 €',
    'size.d3.title': 'Pag online segur', 'size.d3.text': 'Passarel·la del mercat amb targeta, Bizum o transferència. Dades xifrades.', 'size.d3.price': '3-D Secure',
    'size.table.title': 'Guia de talles (cm)',
    'size.table.caption': 'Equivalència de talles per altura i edat',
    'size.table.h1': 'Talla', 'size.table.h2': 'Edat', 'size.table.h3': 'Alçada', 'size.table.h4': 'Pit', 'size.table.h5': 'Cintura',
    'size.table.note': 'Les mesures són aproximades i es prenen sobre el cos, no sobre la peça. Si dubtes entre dues talles, tria la major.',
    'about.eyebrow': 'Qui som', 'about.title': 'Una botiga de barri amb porta digital',
    'about.text': 'Vam obrir el 2014 al barri de Russafa, a València, amb una idea simple: roba còmoda i bonica que no es trenque a la primera. Encara provem cada patró amb les famílies del barri i enviem a tota Europa.',
    'about.i1.title': 'Botiga física', 'about.i1.text': 'Carrer de Cadis 42, Russafa · València',
    'about.i2.title': 'Horari', 'about.i2.text': 'Dilluns a dissabte · 10:00-14:00 i 17:00-20:30',
    'about.rev1': '"El conjunt de punt va aguantar tres rentats per setmana tot l\'hivern i continua com nou. I em vaig estalviar l\'enviament recollint-lo en 2 hores."', 'about.rev1.by': 'Marta G. · València',
    'about.rev2': '"El consell de la guia de talles va ser encertat: el vestit de comunió quedava perfecte. Vaig reservar, el vaig provar i vaig pagar a la botiga."', 'about.rev2.by': 'Laura P. · Torrent',
    'about.rev3': '"Vaig pagar contra lliurament i em donava confiança no avançar els diners. Tot va arribar l\'endemà en caixa de cartró reciclat."', 'about.rev3.by': 'Sergio M. · Alacant',
    'contact.eyebrow': 'Contacte', 'contact.title': 'Explica\'ns què necessites',
    'contact.lead': 'Talles, regals, llistes de naixement o comandes per a col·legis. Respontem en menys de 24 h laborables.',
    'contact.f1': 'Nom', 'contact.f2': 'Email', 'contact.f3': 'Telèfon', 'contact.f4': 'Motiu', 'contact.f5': 'Missatge',
    'contact.o1': 'Dubtes de talla', 'contact.o2': 'Estat de la meua comanda', 'contact.o3': 'Reserva a la botiga',
    'contact.o4': 'Cerimònia i comunió', 'contact.o5': 'Altres',
    'contact.privacy': "He llegit i accepte la política de privacitat i l'avís sobre cookies.",
    'contact.submit': 'Enviar missatge',
    'contact.i1.title': 'Adreça', 'contact.i2.title': 'Telèfon i WhatsApp', 'contact.i3.title': 'Email',
    'contact.map.note': "Mapa orientatiu: se substituirà per la ubicació real del client.",
    'footer.about': 'Moda infantil de cotó orgànic dissenyada i confeccionada a València. Talles de 0 mesos a 14 anys.',
    'footer.h1': 'Botiga', 'footer.h2': 'Ajuda', 'footer.h3': 'Legal', 'footer.h4': 'Novetats',
    'footer.l1': 'Novetats', 'footer.l2': 'Col·leccions', 'footer.l3': 'Bebé 0-24 m', 'footer.l4': "Xiqueta i xiquet",
    'footer.l5': 'Guia de talles', 'footer.l6': 'Contacte', 'footer.l7': 'Enviaments i recollida',
    'footer.l8': 'Canvis i devolucions', 'footer.l9': 'Formes de pag', 'footer.l10': 'Preguntes freqüents',
    'footer.l11': 'Política de cookies', 'footer.l12': 'Privacitat', 'footer.l13': 'Condicions de compra',
    'footer.l14': 'Requisits tècnics',
    'footer.news': 'Noves col·leccions i rebaixes, una vegada al mes. Sense spam.',
    'footer.pay4': 'Contra reemborsament',
    'footer.rights': 'Tots els drets reservats.',
    'footer.made': 'Fet a mà a València · IVA inclòs',
    'cart.title': 'La teua cistella',
    'cart.empty': 'La teua cistella està buida. Afig peces i tria com les vols rebre.',
    'cart.keep': 'Seguir comprant',
    'cart.opt1': '1 · Com ho vols rebre?',
    'cart.opt2': '2 · Quan vols pagar?',
    'cart.d1.title': 'Recollir a la botiga', 'cart.d1.text': 'Gratis · llist en 2 h · C/ Cadis 42, València',
    'cart.d2.title': 'Reservar per a provar', 'cart.d2.text': 'Et guardem la talla 5 dies sense compromís',
    'cart.d3.title': 'Enviar a la meua adreça', 'cart.d3.text': '3,95 € · 24/48 h · gratis des de 60 €',
    'cart.store1': 'Russafa · C/ Cadis 42', 'cart.store2': 'El Cabanyal · Av. dels Toros 18',
    'cart.address': "Adreça de lliurament",
    'cart.f1': 'Nom i cognoms', 'cart.f2': 'Carrer, número i pis', 'cart.f3': 'Codi postal', 'cart.f4': 'Telèfon',
    'cart.p1.title': 'Ara amb la passarel·la del mercat', 'cart.p1.text': 'Targeta, Bizum o transferència · 3-D Secure',
    'cart.p2.title': 'Al recollir a la botiga', 'cart.p2.text': 'Paga en caixa quan proves les peces',
    'cart.p3.title': "Al rebre la comanda", 'cart.p3.text': 'Contra reemborsament · +1,50 € de gestió',
    'cart.subtotal': 'Subtotal', 'cart.shipping': 'Enviament', 'cart.fee': 'Gestió contra reemborsament',
    'cart.tax': 'IVA inclòs', 'cart.total': 'Total', 'cart.checkout': 'Finalitzar compra',
    'cart.clear': 'Buidar cistella', 'cart.note': 'Pots pagar ara, al recollir o en rebre la comanda.',
    'cart.remove': 'Traure', 'cart.items': 'articles', 'cart.item': 'article',
    'cart.free': 'Gratis',
    'search.title': 'Cercar a la web', 'search.lead': 'Escriu el que busques: peces, talles, enviaments, pag a la botiga...',
    'search.placeholder': 'Vestit, cotó, recollida...',
    'search.status.empty': 'Escriu almenys 2 caràcters',
    'search.status.none': 'Sense coincidències a la pàgina',
    'search.status.found': '{n} coincidència(ies)',
    'search.prev': 'Anterior', 'search.next': 'Següent', 'search.clear': 'Netejar',
    'login.title': 'El meu compte', 'login.lead': 'Accedeix per a veure comandes, reserves i llistes de naixement.',
    'login.tab1': 'Iniciar sessió', 'login.tab2': 'Crear compte',
    'login.email': 'Email', 'login.pass': 'Contrasenya', 'login.name': 'Nom complet', 'login.submit': 'Entrar',
    'login.note': "Zona reservada per a la integració del sistema d'autenticació del client: ací es connectarà el backend real.",
    'pay.eyebrow': 'Resum del pag', 'pay.title': 'Això és el que vas a pagar',
    'pay.note.gateway': 'Vas a accedir a la passarel·la de pag del mercat. Les dades de targeta s\'introduïxen en un entorn segur i xifrat.',
    'pay.cta': 'Anar a la passarel·la de pag', 'pay.back': "Tornar a la cistella",
    'pay.line.items': 'Peces ({n})', 'pay.line.shipping': 'Enviament', 'pay.line.fee': 'Gestió contra reemborsament',
    'pay.line.total': 'Total a pagar', 'pay.line.pickup': 'Recollida a la botiga', 'pay.line.reserve': 'Reserva per a provar',
    'done.title': 'Fet!',
    'done.text.gateway': 'Pag confirmat de manera simulada. Quan s\'integre la passarel·la real del mercat, ací es mostrarà el resultat del banc.',
    'done.text.pickup': 'La teua reserva està preparada. T\'avisarem per SMS quan estiga llista per a recollir i pagar en caixa.',
    'done.text.delivery': 'Comanda registrada. La rebràs en 24/48 h i pagaràs l\'import al missatger.',
    'done.text.reserve': 'Reserva guardada. Et guardem la talla 5 dies; vine a provar-la i decideix allà.',
    'done.close': 'Acceptar',
    'legal.cookie.title': 'Política de cookies',
    'legal.cookie.lead': 'Aquesta web no utilitza cookies de tercers ni rastreadors publicitaris.',
    'legal.cookie.h1': 'Cookies tècniques necessàries',
    'legal.cookie.p1': 'Guardem al teu navegador, mitjançant localStorage, únicament les teues preferències: tema clar o fosc, idioma i contingut de la cistella. Són dades funcionals que no identifiquen cap persona.',
    'legal.cookie.h2': 'Analítica',
    'legal.cookie.p2': 'No es carreguen llibreries externes d\'analítica. Si el client instal·la Google Analytics o una altra eina, haurà d\'informar ací i demanar el consentiment previ.',
    'legal.cookie.h3': 'Com gestionar-les',
    'legal.cookie.p3': 'Pots esborrar les dades guardades des del navegador o polsant el botó «Restablir preferències».',
    'legal.cookie.reset': 'Restablir preferències',
    'legal.priv.title': 'Privacitat',
    'legal.priv.lead': 'Responsable: Peu Menut Moda Infantil S.L. · Carrer de Cadis 42, València.',
    'legal.priv.p1': 'Les dades del formulari de contacte i de la comanda s\'utilitzen exclusivament per a gestionar la teua consulta, l\'entrega i la garantia de les peces. No es cedixen a tercers amb fins publicitaris.',
    'legal.priv.p2': 'Pots exercir els drets d\'accés, rectificació, supressió i portabilitat escrivint a hola@peumenut.es, adjuntant un document que acredite la identitat.',
    'legal.priv.p3': 'Conservem les dades de factura durant els terminis legals (6 anys) i les dades de màrqueting fins que retires el consentiment.',
    'legal.terms.title': 'Condicions de compra',
    'legal.terms.h1': 'Preus i pag', 'legal.terms.p1': 'Tots els preus inclouen IVA. Pots pagar en la passarel·la del mercat, a la botiga en recollir o contra reemborsament en rebre la comanda (1,50 € de gestió).',
    'legal.terms.h2': 'Reserva a la botiga', 'legal.terms.p2': 'La reserva manté les peces separades 5 dies naturals. No suposa cap càrrec fins que confirmes la compra en caixa.',
    'legal.terms.h3': 'Enviaments', 'legal.terms.p3': 'Península 24/48 h per 3,95 € (gratis des de 60 €). Balears 3-4 dies. Internacionals mitjançant pressupost.',
    'legal.terms.h4': 'Devolucions', 'legal.terms.p4': '30 dies naturals amb la peça sense usar i etiquetes intactes. El canvi de talla és gratis a la botiga.',
    'legal.req.title': 'Requisits tècnics',
    'legal.req.l1': 'HTML5 semàntic, CSS3 i JavaScript natiu (ES6+): sense frameworks, llibreries ni CDN.',
    'legal.req.l2': 'Navegadors compatibles: Chrome, Edge, Firefox i Safari en les seues dues últimes versions.',
    'legal.req.l3': 'Disseny responsive verificat de 320 px a 1920 px.',
    'legal.req.l4': 'Preferències guardades amb localStorage (tema, idioma i cistella).',
    'legal.req.l5': 'Pendent d\'integració: sistema de login i passarel·la de pag del mercat.',
    'legal.faq.title': 'Preguntes freqüents',
    'legal.faq.q1': 'Quant tarda la meua comanda?', 'legal.faq.a1': 'Si reculls a la botiga, en 2 hores. Si l\'enviem, 24/48 h a península.',
    'legal.faq.q2': 'Puc pagar en recollir-la?', 'legal.faq.a2': 'Sí. Tria «Al recollir a la botiga» i paga en caixa quan proves les peces.',
    'legal.faq.q3': 'I si la talla no va bé?', 'legal.faq.a3': 'El primer canvi de talla és gratis, també en comandes enviades a casa.',
    'legal.faq.q4': 'Feu llistes de naixement?', 'legal.faq.a4': 'Sí, preparem la llista a la botiga o per videocrida i la compartim amb la família.',
    'cookie.title': 'Cookies i privacitat',
    'cookie.text': 'Usem només emmagatzematge local per a recordar el teu tema, idioma i cistella. Sense rastreadors de tercers.',
    'cookie.accept': 'Acceptar', 'cookie.reject': 'Només el necessari', 'cookie.more': 'Més informació',
    'toast.added': 'Afegit a la cistella',
    'toast.removed': 'Peça eliminada',
    'toast.cleared': 'Cistella buidada',
    'toast.fav': 'Guardat als favorits',
    'toast.formOk': 'Missatge enviat. et contestem en 24 h.',
    'toast.formError': 'Revisa els camps marcats',
    'toast.newsOk': 'Subscripció confirmada!',
    'toast.loginOk': 'Accés simulat correcte (backend pendent)',
    'toast.payOk': 'Pag simulat realitzat',
    'toast.address': "Completa l'adreça de lliurament",
    'toast.paymentMode': 'El pag a la botiga només està disponible amb recollida. Hem ajustat el pag.',
    'toast.reset': 'Preferències restablides',
    'toast.theme': 'Tema canviat'
  }
};

/** Idioma activo */
let currentLang = readStore(STORE.lang, 'es');
if (!I18N[currentLang]) currentLang = 'es';

/** Devuelve un texto traducido, con soporte de sustitución simple {n} */
const t = (key, vars) => {
  const dict = I18N[currentLang] || I18N.es;
  let text = dict[key] || I18N.es[key] || key;
  if (vars) {
    Object.keys(vars).forEach((k) => { text = text.replace('{' + k + '}', vars[k]); });
  }
  return text;
};

/* ===================== 4. SISTEMA DE IDIOMAS =========================== */

/** Aplica el idioma a todos los elementos marcados con data-i18n */
function applyLanguage(lang) {
  currentLang = I18N[lang] ? lang : 'es';
  document.documentElement.lang = currentLang;

  // Textos simples
  $$('[data-i18n]').forEach((el) => {
    const value = t(el.dataset.i18n);
    if (el.tagName === 'OPTION' || el.tagName === 'TITLE') el.textContent = value;
    else el.textContent = value;
  });

  // Textos con etiquetas HTML
  $$('[data-i18n-html]').forEach((el) => { el.innerHTML = t(el.dataset.i18nHtml); });

  // Placeholders
  $$('[data-i18n-placeholder]').forEach((el) => { el.placeholder = t(el.dataset.i18nPlaceholder); });

  // Atributos aria-label
  $$('[data-i18n-aria]').forEach((el) => { el.setAttribute('aria-label', t(el.dataset.i18nAria)); });

  // Sincroniza los botones de idioma (escritorio y menú móvil)
  $$('.lang-btn').forEach((btn) => btn.classList.toggle('is-active', btn.dataset.lang === currentLang));

  // Los textos dinámicos también se actualizan
  renderProducts();
  renderCart();

  writeStore(STORE.lang, currentLang);
}

/** Cambio de idioma por delegación (dos grupos de botones) */
function initLanguageSwitch() {
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.lang-btn');
    if (!btn) return;
    applyLanguage(btn.dataset.lang);
    showToast('🌐 ' + btn.dataset.lang.toUpperCase());
  });
}

/* ===================== 3. TEMA CLARO / OSCURO ========================== */

/** Aplica el tema guardado o el del sistema */
function initTheme() {
  const saved = readStore(STORE.theme, null);
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const dark = saved ? saved === 'dark' : prefersDark;
  setTheme(dark, true);
}

/** Cambia el tema del body y guarda la preferencia */
function setTheme(dark, silent) {
  document.body.classList.toggle('theme-dark', dark);
  document.documentElement.style.colorScheme = dark ? 'dark' : 'light';
  writeStore(STORE.theme, dark ? 'dark' : 'light');
  const btn = $('#themeToggle');
  if (btn) {
    btn.setAttribute('aria-label', t('a11y.theme'));
    btn.setAttribute('aria-pressed', String(dark));
  }
  if (!silent) showToast((dark ? '🌙 ' : '☀️ ') + t('toast.theme'));
}

function initThemeToggle() {
  $('#themeToggle').addEventListener('click', () => {
    setTheme(!document.body.classList.contains('theme-dark'), false);
  });
}

/* ============ 5. HEADER, MENÚ HAMBURGUESA Y EVENTOS DE SCROLL ========== */

const siteTop = $('#siteTop');
const mobileMenu = $('#mobileMenu');
const hamburgerBtn = $('#hamburgerBtn');

/** Abre o cierra el menú móvil */
function toggleMobileMenu(open) {
  const willOpen = typeof open === 'boolean' ? open : !mobileMenu.classList.contains('is-open');
  mobileMenu.classList.toggle('is-open', willOpen);
  hamburgerBtn.classList.toggle('is-open', willOpen);
  hamburgerBtn.setAttribute('aria-expanded', String(willOpen));
  lockScroll(willOpen);
}

function initMobileMenu() {
  hamburgerBtn.addEventListener('click', () => toggleMobileMenu());

  // Cerrar al pulsar un enlace
  $$('#mobileMenu a').forEach((link) => {
    link.addEventListener('click', () => toggleMobileMenu(false));
  });

  // Cerrar con Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('is-open')) toggleMobileMenu(false);
  });
}

/** Scroll suave a una sección (con compensación del header fijo) */
function smoothScrollTo(target) {
  const el = typeof target === 'string' ? $(target) : target;
  if (!el) return;
  const offset = siteTop.offsetHeight - 1;
  const top = el.getBoundingClientRect().top + window.pageYOffset - offset;
  window.scrollTo({ top: top < 0 ? 0 : top, behavior: 'smooth' });
}

function initSmoothScroll() {
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href^="#"]');
    if (!link) return;
    const id = link.getAttribute('href');
    if (!id || id === '#') return;
    const target = $(id);
    if (!target) return;
    e.preventDefault();
    smoothScrollTo(target);
    history.replaceState(null, '', id);
  });
}

/** Actualiza la barra de progreso, el header compacto y el botón "arriba" */
function onScroll() {
  const y = window.pageYOffset;
  const max = document.documentElement.scrollHeight - window.innerHeight;
  $('#scrollProgress').style.width = (max > 0 ? (y / max) * 100 : 0) + '%';
  siteTop.classList.toggle('is-compact', y > 90 && !mobileMenu.classList.contains('is-open'));
  siteTop.classList.toggle('is-scrolled', y > 20);
  $('#toTop').classList.toggle('is-visible', y > 500);
}

/** Marca como activo el enlace del menú de la sección visible */
function initActiveNav() {
  const sections = $$('main section[id]');
  const links = $$('.nav__link');
  if (!('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      links.forEach((link) => {
        link.classList.toggle('is-active', link.getAttribute('href') === '#' + entry.target.id);
      });
    });
  }, { rootMargin: '-45% 0px -50% 0px' });

  sections.forEach((section) => observer.observe(section));
}

/* ============== 6. APARICIÓN DE SECCIONES AL HACER SCROLL ============= */

function initReveal() {
  const items = $$('.reveal');
  if (!('IntersectionObserver' in window)) {
    items.forEach((el) => el.classList.add('is-visible'));
    return;
  }
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  items.forEach((el) => observer.observe(el));
}

/* ======================= 7. CATÁLOGO DE PRODUCTOS ====================== */

/** Catálogo de ejemplo (se sustituirá por el catálogo real del cliente) */
const PRODUCTS = [
  { id: 'pij-plumeti', cat: 'bebe', price: 24.9, old: null, badge: 'new', sizes: ['1m', '3m', '6m', '12m'],
    img: 'https://images.pexels.com/photos/5982372/pexels-photo-5982372.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=640&h=850',
    name: { es: 'Pijama Plumeti Bebé', en: 'Plumeti Baby Pyjamas', va: 'Pijama Plumeti Bebé' } },
  { id: 'ranita-tulipas', cat: 'bebe', price: 19.9, old: 26, badge: 'sale', sizes: ['0-1m', '3m', '6m'],
    img: 'https://images.pexels.com/photos/4858394/pexels-photo-4858394.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=640&h=850',
    name: { es: 'Ranita Algodón Tulipas', en: 'Tulip Cotton Romper', va: 'Raneta Cotó Tulipes' } },
  { id: 'pack-body', cat: 'bebe', price: 27.9, old: 33, badge: 'sale', sizes: ['0-1m', '3m', '6m', '12m'],
    img: 'https://images.pexels.com/photos/32410090/pexels-photo-32410090.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=640&h=850',
    name: { es: 'Pack 3 Bodies Orgánicos', en: 'Pack of 3 Organic Bodysuits', va: "Pack 3 Bodies Orgànics" } },
  { id: 'vestido-flores', cat: 'nina', price: 42, old: null, badge: 'new', sizes: ['2a', '4a', '6a', '8a'],
    img: 'https://images.pexels.com/photos/7329630/pexels-photo-7329630.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=640&h=850',
    name: { es: 'Vestido Flores Nívea', en: 'Nívea Flower Dress', va: 'Vestit Flores Nívea' } },
  { id: 'falda-lino', cat: 'nina', price: 31.5, old: null, badge: null, sizes: ['4a', '6a', '8a', '10a'],
    img: 'https://images.pexels.com/photos/5893841/pexels-photo-5893841.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=640&h=850',
    name: { es: 'Falda Pantalón de Lino', en: 'Linen Skirt Trousers', va: 'Falda Pantaló de Lli' } },
  { id: 'vestido-ceremonia', cat: 'nina', price: 68, old: null, badge: null, sizes: ['6a', '8a', '10a', '12a'],
    img: 'https://images.pexels.com/photos/1620759/pexels-photo-1620759.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=640&h=850',
    name: { es: 'Vestido Ceremonia Perla', en: 'Pearl Ceremony Dress', va: 'Vestit Cerimònia Perla' } },
  { id: 'conjunto-marinero', cat: 'nino', price: 39.9, old: null, badge: 'new', sizes: ['2a', '4a', '6a', '8a'],
    img: 'https://images.pexels.com/photos/6261908/pexels-photo-6261908.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=640&h=850',
    name: { es: 'Conjunto Marinero', en: 'Sailor Set', va: 'Conjunt Mariner' } },
  { id: 'sudadera-sport', cat: 'nino', price: 29.9, old: 36, badge: 'sale', sizes: ['4a', '6a', '8a', '10a'],
    img: 'https://images.pexels.com/photos/9648677/pexels-photo-9648677.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=640&h=850',
    name: { es: 'Sudadera Sport Chico', en: "Boys' Sport Hoodie", va: 'Samarreta Sport Xiquet' } },
  { id: 'traje-comunion', cat: 'nino', price: 89, old: null, badge: null, sizes: ['6a', '8a', '10a'],
    img: 'https://images.pexels.com/photos/36909815/pexels-photo-36909815.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=640&h=850',
    name: { es: 'Traje Comunión Clásico', en: 'Classic Communion Suit', va: 'Traje Comunió Clàssic' } },
  { id: 'jersey-salvia', cat: 'punto', price: 34.5, old: null, badge: 'new', sizes: ['2a', '4a', '6a', '8a', '10a'],
    img: 'https://images.pexels.com/photos/6261906/pexels-photo-6261906.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=640&h=850',
    name: { es: 'Jersey Punto Salvia', en: 'Sage Knit Jumper', va: 'Jersei Punt Sàlvia' } },
  { id: 'gorro-azul', cat: 'punto', price: 15.9, old: null, badge: null, sizes: ['1m', '3m', '6m', '12m'],
    img: 'https://images.pexels.com/photos/11630885/pexels-photo-11630885.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=640&h=850',
    name: { es: 'Gorro de Punto Azul', en: 'Blue Knitted Beanie', va: 'Gorra de Punt Blava' } },
  { id: 'look-familiar', cat: 'punto', price: 54, old: null, badge: null, sizes: ['4a', '6a', '8a'],
    img: 'https://images.pexels.com/photos/28456646/pexels-photo-28456646.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=640&h=850',
    name: { es: 'Cápsula Mediterrània', en: 'Mediterrània Capsule', va: 'Càpsula Mediterrània' } }
];

/** Filtro y estado del carrito */
let activeFilter = 'all';
let cart = readStore(STORE.cart, []);
let favourites = readStore(STORE.favs, []);

/** Genera las tarjetas de producto según el filtro activo */
function renderProducts() {
  const grid = $('#productGrid');
  if (!grid) return;

  const visible = PRODUCTS.filter((p) => activeFilter === 'all' || p.cat === activeFilter);

  grid.innerHTML = visible.map((p, index) => `
    <article class="product-card" data-cat="${p.cat}" data-id="${p.id}" style="animation-delay:${index * 0.05}s">
      <div class="product-card__media">
        <img src="${p.img}" alt="${p.name[currentLang] || p.name.es}" loading="lazy" width="600" height="800">
        ${p.badge ? `<span class="badge badge--${p.badge}">${badgeLabel(p.badge)}</span>` : ''}
        <button class="product-card__fav ${favourites.includes(p.id) ? 'is-active' : ''}" type="button" data-fav="${p.id}" aria-label="Favorito">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round"><path d="M12 20s-7-4.4-7-9.4A4 4 0 0 1 12 8a4 4 0 0 1 7 2.6c0 5-7 9.4-7 9.4Z"/></svg>
        </button>
      </div>
      <div class="product-card__body">
        <span class="product-card__cat">${t('shop.filter.' + p.cat)}</span>
        <h3 class="product-card__name">${p.name[currentLang] || p.name.es}</h3>
        <div class="product-card__row">
          <span class="price">${money.format(p.price)}</span>
          ${p.old ? `<span class="price--old">${money.format(p.old)}</span>` : ''}
        </div>
        <div class="sizes" role="group" aria-label="Talla">
          ${p.sizes.map((s, i) => `<button class="size-btn ${i === 0 ? 'is-active' : ''}" type="button" data-size="${s}">${s}</button>`).join('')}
        </div>
        <div class="product-card__foot">
          <button class="add-cart" type="button" data-add="${p.id}">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>
            ${addLabel()}
          </button>
          <input class="qty-mini" type="number" min="1" max="10" value="1" data-qty="${p.id}" aria-label="Cantidad">
        </div>
      </div>
    </article>`).join('');
}

/** Etiqueta del badge y texto del botón añadir */
const badgeLabel = (badge) => (badge === 'sale' ? 'Rebaixa · Sale' : 'Nou · New');
const addLabel = () => (currentLang === 'en' ? 'Add' : currentLang === 'va' ? 'Afegir' : 'Añadir');
const sizeLabel = () => (currentLang === 'en' ? 'Size' : 'Talla');

/** Delegación de eventos del catálogo: filtro, talla, favorito y añadir */
function initShop() {
  $('#shopFilters').addEventListener('click', (e) => {
    const chip = e.target.closest('.chip');
    if (!chip) return;
    activeFilter = chip.dataset.filter;
    $$('#shopFilters .chip').forEach((c) => c.classList.toggle('is-active', c === chip));
    renderProducts();
  });

  $('#productGrid').addEventListener('click', (e) => {
    const card = e.target.closest('.product-card');
    if (!card) return;
    const id = card.dataset.id;

    // Selección de talla
    const sizeBtn = e.target.closest('.size-btn');
    if (sizeBtn) {
      $$('.size-btn', card).forEach((b) => b.classList.toggle('is-active', b === sizeBtn));
      return;
    }

    // Favorito
    const favBtn = e.target.closest('[data-fav]');
    if (favBtn) {
      const isActive = !favourites.includes(id);
      favourites = isActive ? favourites.concat(id) : favourites.filter((f) => f !== id);
      writeStore(STORE.favs, favourites);
      favBtn.classList.toggle('is-active', isActive);
      showToast('♥ ' + t('toast.fav'));
      return;
    }

    // Añadir al carrito
    const addBtn = e.target.closest('[data-add]');
    if (addBtn) {
      const size = ($('.size-btn.is-active', card) || {}).dataset ? $('.size-btn.is-active', card).dataset.size : '';
      const qtyInput = $(`[data-qty="${id}"]`, card);
      const qty = Math.max(1, Math.min(10, parseInt(qtyInput.value, 10) || 1));
      addToCart(id, size, qty);
    }
  });
}

/* ==================== 8. CARRITO Y PROCESO DE COMPRA =================== */

const cartDrawer = $('#cartDrawer');

/** Añade un producto (o incrementa su cantidad) */
function addToCart(id, size, qty) {
  const product = PRODUCTS.find((p) => p.id === id);
  if (!product) return;
  const key = id + '|' + size;
  const existing = cart.find((item) => item.key === key);

  if (existing) existing.qty = Math.min(10, existing.qty + qty);
  else cart.push({ key, id, size, qty, price: product.price });

  writeStore(STORE.cart, cart);
  renderCart();
  bumpCartCount();
  showToast('🛍 ' + t('toast.added'));
}

/** Actualiza la cantidad de un artículo */
function changeQty(key, delta) {
  const item = cart.find((i) => i.key === key);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) cart = cart.filter((i) => i.key !== key);
  writeStore(STORE.cart, cart);
  renderCart();
}

/** Elimina un artículo del carrito */
function removeFromCart(key) {
  cart = cart.filter((i) => i.key !== key);
  writeStore(STORE.cart, cart);
  renderCart();
  showToast(t('toast.removed'));
}

/** Vacía la cesta */
function clearCart() {
  cart = [];
  writeStore(STORE.cart, cart);
  renderCart();
  showToast(t('toast.cleared'));
}

/** Subtotal (sin gastos) */
const cartSubtotal = () => cart.reduce((sum, item) => sum + item.price * item.qty, 0);
const cartUnits = () => cart.reduce((sum, item) => sum + item.qty, 0);

/** Opciones seleccionadas de entrega y pago */
const selectedDelivery = () => ($('input[name="delivery"]:checked') || {}).value || 'pickup';
const selectedPayment = () => ($('input[name="payment"]:checked') || {}).value || 'gateway';

/** Coste de envío según la entrega y el importe */
function shippingCost() {
  if (selectedDelivery() !== 'shipping') return 0;
  return cartSubtotal() >= COSTS.freeFrom ? 0 : COSTS.shipping;
}

/** Recargo por pago contra entrega */
const codFee = () => (selectedPayment() === 'delivery' ? COSTS.codFee : 0);

/** Total de la cesta */
const cartTotal = () => cartSubtotal() + shippingCost() + codFee();

/** Pinta el carrito (artículos, contadores y resumen) */
function renderCart() {
  const itemsBox = $('#cartItems');
  const emptyBox = $('#cartEmpty');
  const optionsBox = $('#cartOptions');
  const counter = $('#cartCount');

  if (!itemsBox) return;

  // Contador del header
  const units = cartUnits();
  counter.textContent = units;
  counter.classList.toggle('is-visible', units > 0);

  // Estado vacío
  const isEmpty = cart.length === 0;
  emptyBox.classList.toggle('hidden', !isEmpty);
  optionsBox.classList.toggle('hidden', isEmpty);
  $('#checkoutBtn').disabled = isEmpty;
  $('#clearCartBtn').disabled = isEmpty;

  // Listado de artículos
  itemsBox.innerHTML = cart.map((item) => {
    const product = PRODUCTS.find((p) => p.id === item.id) || {};
    const name = (product.name || {})[currentLang] || (product.name || {}).es || item.id;
    return `
      <article class="cart-item">
        <img class="cart-item__img" src="${product.img || ''}" alt="${name}" loading="lazy">
        <div>
          <p class="cart-item__name">${name}</p>
          <p class="cart-item__meta">${t('shop.filter.' + (product.cat || 'all'))} · ${sizeLabel()}: ${item.size}</p>
          <div class="cart-item__col-end">
            <span class="cart-item__price">${money.format(item.price * item.qty)}</span>
          </div>
          <button class="cart-item__remove" type="button" data-remove="${item.key}">${t('cart.remove')}</button>
        </div>
        <div class="cart-item__col-end">
          <div class="qty">
            <button type="button" data-minus="${item.key}" aria-label="-">−</button>
            <span>${item.qty}</span>
            <button type="button" data-plus="${item.key}" aria-label="+">+</button>
          </div>
        </div>
      </article>`;
  }).join('');

  // Resumen
  const ship = shippingCost();
  const fee = codFee();
  $('#sumSubtotal').textContent = money.format(cartSubtotal());
  $('#sumShipping').textContent = ship === 0 ? t('cart.free') : money.format(ship);
  $('#sumFeeRow').classList.toggle('hidden', fee === 0);
  $('#sumFee').textContent = money.format(fee);
  $('#sumTotal').textContent = money.format(cartTotal());
  $('#sumShippingRow').classList.toggle('hidden', selectedDelivery() === 'pickup' || selectedDelivery() === 'reserve');

  // Aviso contextual del total según la forma de pago elegida
  const note = $('.drawer__note');
  if (note) {
    const mode = selectedPayment();
    note.textContent = mode === 'gateway' ? t('cart.p1.title') : mode === 'pickup' ? t('cart.p2.title') : t('cart.p3.title');
  }
}

/** Animación del contador del carrito */
function bumpCartCount() {
  const counter = $('#cartCount');
  counter.classList.remove('is-bump');
  void counter.offsetWidth;
  counter.classList.add('is-bump');
}

/** Abre / cierra el drawer del carrito */
function toggleCart(open) {
  const willOpen = typeof open === 'boolean' ? open : !cartDrawer.classList.contains('is-open');
  cartDrawer.classList.toggle('is-open', willOpen);
  cartDrawer.setAttribute('aria-hidden', String(!willOpen));
  lockScroll(willOpen);
}

/** Eventos del carrito */
function initCart() {
  $('#cartBtn').addEventListener('click', () => toggleCart(true));
  document.addEventListener('click', (e) => {
    if (e.target.closest('[data-close-cart]')) toggleCart(false);

    const itemBox = e.target.closest('#cartItems');
    if (itemBox) {
      const minus = e.target.closest('[data-minus]');
      const plus = e.target.closest('[data-plus]');
      const remove = e.target.closest('[data-remove]');
      if (minus) changeQty(minus.dataset.minus, -1);
      if (plus) changeQty(plus.dataset.plus, 1);
      if (remove) removeFromCart(remove.dataset.remove);
    }
  });

  $('#clearCartBtn').addEventListener('click', clearCart);

  // Cambio de entrega: muestra dirección y ajusta la forma de pago si procede
  $('#deliveryOptions').addEventListener('change', () => {
    $$('#deliveryOptions .opt').forEach((opt) => {
      opt.classList.toggle('is-active', $('input', opt).checked);
    });
    $('#addressFields').classList.toggle('hidden', selectedDelivery() !== 'shipping');
    $('#pickupStore').classList.toggle('hidden', selectedDelivery() !== 'pickup');

    // El pago en tienda exige recoger en tienda
    if (selectedPayment() === 'pickup' && selectedDelivery() !== 'pickup') {
      $('input[name="payment"][value="gateway"]').checked = true;
      syncPaymentStyles();
      showToast(t('toast.paymentMode'));
    }
    renderCart();
  });

  // Cambio de forma de pago
  $('#paymentOptions').addEventListener('change', () => {
    if (selectedPayment() === 'pickup' && selectedDelivery() !== 'pickup') {
      $('input[name="delivery"][value="pickup"]').checked = true;
      $('#addressFields').classList.add('hidden');
      $('#pickupStore').classList.remove('hidden');
      $$('#deliveryOptions .opt').forEach((opt) => opt.classList.toggle('is-active', $('input', opt).checked));
      showToast(t('toast.paymentMode'));
    }
    syncPaymentStyles();
    renderCart();
  });

  $('#checkoutBtn').addEventListener('click', handleCheckout);
  $('#payConfirm').addEventListener('click', confirmPayment);
}

/** Sincroniza el estilo visual de las opciones de pago */
function syncPaymentStyles() {
  $$('#paymentOptions .opt').forEach((opt) => opt.classList.toggle('is-active', $('input', opt).checked));
}

/** Proceso de finalización de compra */
function handleCheckout() {
  if (cart.length === 0) return;

  const payment = selectedPayment();
  const delivery = selectedDelivery();

  // Validación de la dirección si hay envío a domicilio
  if (delivery === 'shipping' && payment !== 'pickup') {
    const required = ['shipName', 'shipAddr', 'shipZip', 'shipPhone'];
    const missing = required.some((id) => !$(id).value.trim());
    if (missing) {
      showToast('⚠ ' + t('toast.address'));
      $('#addressFields').classList.remove('hidden');
      return;
    }
  }

  // Resumen económico antes de pasar a la pasarela
  const lines = [];
  lines.push([t('pay.line.items', { n: cartUnits() }), money.format(cartSubtotal())]);
  if (delivery === 'shipping') {
    const ship = shippingCost();
    lines.push([t('pay.line.shipping'), ship === 0 ? t('cart.free') : money.format(ship)]);
  } else {
    lines.push([delivery === 'pickup' ? t('pay.line.pickup') : t('pay.line.reserve'), t('cart.free')]);
  }
  if (codFee() > 0) lines.push([t('pay.line.fee'), money.format(codFee())]);
  lines.push([t('pay.line.total'), money.format(cartTotal())]);

  $('#payLines').innerHTML = lines
    .map((line) => `<div><span>${line[0]}</span><span>${line[1]}</span></div>`)
    .join('');
  $('#payAmount').textContent = money.format(cartTotal());
  $('#payNote').textContent = payment === 'gateway' ? t('pay.note.gateway') : (payment === 'pickup' ? t('cart.p2.text') : t('cart.p3.text'));
  $('#payConfirm').textContent = payment === 'gateway' ? t('pay.cta') : t('cart.checkout');
  $('#payConfirm').dataset.mode = payment;

  openModal('payModal');
}

/** Confirma el pago / reserva y cierra el proceso */
function confirmPayment() {
  const mode = $('#payConfirm').dataset.mode || 'gateway';
  const code = 'PM-' + Math.floor(1000 + Math.random() * 8999);
  const store = $('#pickupStore');
  const storeName = store && !store.classList.contains('hidden') ? store.options[store.selectedIndex].text : '';

  let textKey = 'done.text.gateway';
  if (mode === 'pickup') textKey = 'done.text.pickup';
  if (mode === 'delivery') textKey = 'done.text.delivery';

  let message = t(textKey);
  if (mode === 'pickup' && storeName) message += ' (' + storeName + ')';
  $('#doneText').textContent = message;
  $('#doneCode').textContent = code;

  closeAllModals();
  toggleCart(false);

  cart = [];
  writeStore(STORE.cart, cart);
  renderCart();
  showToast('✓ ' + t('toast.payOk') + ' · ' + code);

  setTimeout(() => openModal('doneModal'), 260);
}

/* ============= 9. MODALES GENÉRICOS (búsqueda, login, legal) =========== */

/** Abre un modal por su id */
function openModal(id) {
  const modal = document.getElementById(id);
  if (!modal) return;
  closeAllModals();
  modal.classList.add('is-open');
  modal.setAttribute('aria-hidden', 'false');
  lockScroll(true);
  const focusable = $('input, button, textarea, select', modal);
  if (focusable) setTimeout(() => focusable.focus(), 260);
  if (id === 'searchModal') setTimeout(() => $('#searchInput').focus(), 300);
}

/** Cierra todos los modales abiertos */
function closeAllModals() {
  $$('.modal.is-open').forEach((modal) => {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
  });
  if (!cartDrawer.classList.contains('is-open')) lockScroll(false);
}

/** Inicializa apertura y cierre de modales */
function initModals() {
  document.addEventListener('click', (e) => {
    const opener = e.target.closest('[data-modal-open]');
    if (opener) {
      openModal(opener.dataset.modalOpen);
      return;
    }
    if (e.target.closest('[data-close-modal]') || e.target.classList.contains('modal')) {
      closeAllModals();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeAllModals();
  });

  // Botones de cabecera
  $('#searchBtn').addEventListener('click', () => openModal('searchModal'));
  $('#mobileSearchBtn').addEventListener('click', () => {
    toggleMobileMenu(false);
    setTimeout(() => openModal('searchModal'), 220);
  });
  $('#userBtn').addEventListener('click', () => openModal('loginModal'));

  // Pestañas del login
  $$('#loginModal .login-tabs button').forEach((tab) => {
    tab.addEventListener('click', () => {
      $$('#loginModal .login-tabs button').forEach((b) => b.classList.toggle('is-active', b === tab));
      $('#registerFields').classList.toggle('hidden', tab.dataset.tab !== 'register');
    });
  });

  // Restablecer preferencias (política de cookies)
  $('#resetPrefsBtn').addEventListener('click', () => {
    [STORE.theme, STORE.lang, STORE.cookies, STORE.favs].forEach((k) => {
      try { localStorage.removeItem(k); } catch (err) { /* ignorado */ }
    });
    closeAllModals();
    setTheme(false, true);
    applyLanguage('es');
    showToast(t('toast.reset'));
  });
}

/* ==== 10. BÚSQUEDA EN LA PÁGINA CON RESALTADO DE COINCIDENCIAS ========= */

const SEARCH_SKIP = new Set(['SCRIPT', 'STYLE', 'NOSCRIPT', 'MARK', 'INPUT', 'TEXTAREA', 'SELECT', 'BUTTON']);
let searchHits = [];
let searchIndex = 0;

/** Crea un patrón que ignora acentos y mayúsculas */
function buildPattern(query) {
  const map = {
    a: '[aáàäâ]', e: '[eéèëê]', i: '[iíìïî]', o: '[oóòöô]',
    u: '[uúùüû]', n: '[nñ]', c: '[cç]'
  };
  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return new RegExp(escaped.replace(/[aeiouncAEIOUNC]/g, (ch) => {
    const lower = ch.toLowerCase();
    return map[lower] ? map[lower] + (ch !== lower ? map[lower].toUpperCase() : '') : ch;
  }), 'gi');
}

/** Limpia los resaltados anteriores */
function clearHighlights() {
  $$('mark.search-hit').forEach((mark) => {
    const parent = mark.parentNode;
    parent.replaceChild(document.createTextNode(mark.textContent), mark);
    parent.normalize();
  });
  searchHits = [];
  searchIndex = 0;
}

/** Busca el texto en el contenido principal y lo envuelve en <mark> */
function runSearch(query) {
  clearHighlights();
  const status = $('#searchStatus');
  if (!query || query.trim().length < 2) {
    status.textContent = t('search.status.empty');
    return;
  }

  const pattern = buildPattern(query.trim());
  // Copia sin bandera global: con "g" el método test() avanza el índice y da falsos negativos
  const finder = new RegExp(pattern.source, 'i');
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
    acceptNode: (node) => {
      const parent = node.parentElement;
      if (!parent || !node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
      if (SEARCH_SKIP.has(parent.tagName) || parent.closest('[data-no-search]') || parent.closest('.modal')) {
        return NodeFilter.FILTER_REJECT;
      }
      return finder.test(node.nodeValue) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
    }
  });

  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);

  nodes.forEach((node) => {
    const text = node.nodeValue;
    const fragment = document.createDocumentFragment();
    let lastIndex = 0;
    pattern.lastIndex = 0;
    let match;
    while ((match = pattern.exec(text)) !== null) {
      if (match.index > lastIndex) fragment.appendChild(document.createTextNode(text.slice(lastIndex, match.index)));
      const mark = document.createElement('mark');
      mark.className = 'search-hit';
      mark.textContent = match[0];
      fragment.appendChild(mark);
      lastIndex = match.index + match[0].length;
      if (match[0].length === 0) pattern.lastIndex += 1;
    }
    if (lastIndex < text.length) fragment.appendChild(document.createTextNode(text.slice(lastIndex)));
    node.parentNode.replaceChild(fragment, node);
  });

  searchHits = $$('mark.search-hit');
  status.textContent = searchHits.length === 0 ? t('search.status.none') : t('search.status.found', { n: searchHits.length });
  if (searchHits.length) goToHit(0);
}

/** Desplaza la vista hasta la coincidencia indicada */
function goToHit(index) {
  if (!searchHits.length) return;
  searchIndex = (index + searchHits.length) % searchHits.length;
  searchHits.forEach((hit, i) => hit.classList.toggle('is-active', i === searchIndex));
  const target = searchHits[searchIndex];
  const y = target.getBoundingClientRect().top + window.pageYOffset - (siteTop.offsetHeight + 90);
  window.scrollTo({ top: y < 0 ? 0 : y, behavior: 'smooth' });
  $('#searchStatus').textContent = t('search.status.found', { n: (searchIndex + 1) + '/' + searchHits.length });
}

/** Eventos del modal de búsqueda */
function initSearch() {
  $('#searchForm').addEventListener('submit', (e) => {
    e.preventDefault();
    runSearch($('#searchInput').value);
  });

  let debounce;
  $('#searchInput').addEventListener('input', (e) => {
    clearTimeout(debounce);
    const value = e.target.value;
    debounce = setTimeout(() => runSearch(value), 260);
  });

  $('#searchNext').addEventListener('click', () => goToHit(searchIndex + 1));
  $('#searchPrev').addEventListener('click', () => goToHit(searchIndex - 1));
  $('#searchClear').addEventListener('click', () => {
    $('#searchInput').value = '';
    clearHighlights();
    $('#searchStatus').textContent = t('search.status.empty');
    $('#searchInput').focus();
  });

  $$('#searchHints button').forEach((btn) => {
    btn.addEventListener('click', () => {
      $('#searchInput').value = btn.dataset.hint;
      runSearch(btn.dataset.hint);
    });
  });

  // Al cerrar el modal se limpia el resaltado
  const observer = new MutationObserver(() => {
    const modal = $('#searchModal');
    if (!modal.classList.contains('is-open') && searchHits.length) clearHighlights();
  });
  observer.observe($('#searchModal'), { attributes: true, attributeFilter: ['class'] });
}

/* =============== 11. FORMULARIOS (contacto, news, login) =============== */

/** Comprueba un email con una expresión regular simple */
const isEmail = (value) => /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(value.trim());

/** Marca un campo como erróneo y escribe el mensaje */
function setError(field, message) {
  field.closest('.field').classList.toggle('has-error', Boolean(message));
  const box = field.closest('.field').querySelector('.field__error');
  if (box) box.textContent = message || '';
}

/** Validación y envío simulado del formulario de contacto */
function initContactForm() {
  const form = $('#contactForm');
  // Mensajes de error cortos según el idioma activo
  const errors = () => ({
    name: currentLang === 'en' ? 'Please enter your name' : 'Indica tu nombre',
    email: currentLang === 'en' ? 'Check the email address' : 'Revisa el email',
    message: currentLang === 'en' ? 'Write at least 10 characters' : 'Escribe al menos 10 caracteres',
    privacy: currentLang === 'en' ? 'Required to continue' : 'Necesario para continuar'
  });

  // Cada campo con su regla de validación
  const rules = [
    { el: $('#cName'), check: () => $('#cName').value.trim().length >= 2, key: 'name' },
    { el: $('#cEmail'), check: () => isEmail($('#cEmail').value), key: 'email' },
    { el: $('#cMsg'), check: () => $('#cMsg').value.trim().length >= 10, key: 'message' },
    { el: $('#cPrivacy'), check: () => $('#cPrivacy').checked, key: 'privacy' }
  ];

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const messages = errors();
    let ok = true;

    rules.forEach((rule) => {
      const valid = rule.check();
      setError(rule.el, valid ? '' : messages[rule.key]);
      if (!valid) ok = false;
    });

    if (!ok) {
      showToast('⚠ ' + t('toast.formError'));
      return;
    }
    form.reset();
    $$('.field', form).forEach((f) => f.classList.remove('has-error'));
    showToast('✉ ' + t('toast.formOk'));
  });
}

/** Newsletter del footer */
function initNewsletter() {
  $('#newsletterForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const input = $('#newsEmail');
    if (!isEmail(input.value)) {
      showToast('⚠ ' + t('toast.formError'));
      input.focus();
      return;
    }
    input.value = '';
    showToast('✓ ' + t('toast.newsOk'));
  });
}

/** Login simulado (el backend real se conectará aquí) */
function initLogin() {
  $('#loginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = $('#loginEmail');
    const pass = $('#loginPass');
    if (!isEmail(email.value) || pass.value.length < 6) {
      showToast('⚠ ' + t('toast.formError'));
      return;
    }
    closeAllModals();
    showToast('👤 ' + t('toast.loginOk'));
    email.value = '';
    pass.value = '';
  });
}

/* ============= 12. COOKIES, AVISOS Y UTILIDADES FINALES ================ */

/** Muestra un aviso temporal */
function showToast(message) {
  const wrap = $('#toastWrap');
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg><span></span>';
  toast.querySelector('span').textContent = message;
  wrap.appendChild(toast);
  requestAnimationFrame(() => toast.classList.add('is-show'));
  setTimeout(() => {
    toast.classList.remove('is-show');
    setTimeout(() => toast.remove(), 450);
  }, 2600);
}

/** Banner de cookies: guarda la decisión del usuario */
function initCookies() {
  const banner = $('#cookieBanner');
  const saved = readStore(STORE.cookies, null);

  if (!saved) {
    setTimeout(() => banner.classList.add('is-visible'), 1400);
  }

  const close = (value) => {
    writeStore(STORE.cookies, value);
    banner.classList.remove('is-visible');
  };

  $('#cookieAccept').addEventListener('click', () => close('accepted'));
  $('#cookieReject').addEventListener('click', () => close('necessary'));
}

/** Marquee: duplica el contenido para lograr el bucle continuo */
function initMarquee() {
  const track = $('#marqueeTrack');
  if (track) track.innerHTML += track.innerHTML;
}

/** Año dinámico del copyright */
function initYear() {
  $('#year').textContent = new Date().getFullYear();
}

/** Asegura que el vídeo del hero se reproduzca (algunos navegadores lo pausan) */
function initHeroVideo() {
  const video = $('#heroVideo');
  if (!video) return;
  const play = () => { const p = video.play(); if (p && p.catch) p.catch(() => { /* bloqueo de autoplay */ }); };
  video.addEventListener('loadeddata', play);
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) video.pause(); else play();
  });
  play();
}

/** Botón para volver arriba */
function initToTop() {
  $('#toTop').addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

/* ============================ ARRANQUE ================================= */

function init() {
  // Preferencias
  initTheme();
  initThemeToggle();
  applyLanguage(currentLang);
  initLanguageSwitch();

  // Navegación y UX de scroll
  initSmoothScroll();
  initMobileMenu();
  initActiveNav();
  initReveal();
  onScroll();

  // Tienda (renderProducts y renderCart ya se ejecutan dentro de applyLanguage)
  initShop();
  initCart();

  // Modales, búsqueda y formularios
  initModals();
  initSearch();
  initContactForm();
  initNewsletter();
  initLogin();

  // Detalles finales
  initCookies();
  initMarquee();
  initYear();
  initHeroVideo();
  initToTop();

  // Eventos globales de scroll y resize para mejorar la experiencia
  let scrollTick = false;
  window.addEventListener('scroll', () => {
    if (scrollTick) return;
    scrollTick = true;
    requestAnimationFrame(() => { onScroll(); scrollTick = false; });
  }, { passive: true });

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      // El menú hamburguesa se cierra al pasar a escritorio
      if (window.innerWidth > 1024) toggleMobileMenu(false);
      onScroll();
    }, 150);
  });
}

document.addEventListener('DOMContentLoaded', init);
