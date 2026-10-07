/* =========================================================
   VESTA ATELIER · Lógica de la página
   Índice:
   1. Configuración y datos
   2. Traducciones (ES / EN / VA)
   3. Utilidades
   4. Tema claro/oscuro
   5. Idioma
   6. Cabecera, scroll y navegación
   7. Menú hamburguesa y selector de idioma
   8. Sistema de modales
   9. Búsqueda en la página
   10. Catálogo de productos
   11. Carrito
   12. Checkout, pago y confirmación
   13. Formularios
   14. Información legal y cookies
   15. Animaciones (aparición y contadores)
   16. Inicialización
   ========================================================= */
'use strict';

/* ---------- 1. Configuración y datos ---------- */
const CONFIG = {
  freeShippingThreshold: 60,
  shippingCost: 4.95,
  defaultLang: 'es',
  scrolledHeaderHeight: 64,
  desktopBreakpoint: 1024,
  searchMinChars: 2,
  storageKeys: {
    theme: 'vesta-theme',
    lang: 'vesta-lang',
    cart: 'vesta-cart',
    cookies: 'vesta-cookies',
    orders: 'vesta-orders'
  }
};

const LOCALES = { es: 'es-ES', en: 'en-GB', va: 'ca-ES' };

const STORES = {
  colon: 'VESTA Colón · C/ de Colón 24',
  ruzafa: 'VESTA Ruzafa · C/ de Sueca 15'
};

/* Relación sección → clave de traducción (para etiquetas de búsqueda) */
const SECTION_LABELS = {
  inicio: 'nav.home',
  colecciones: 'nav.collections',
  tienda: 'nav.shop',
  lookbook: 'nav.lookbook',
  nosotros: 'nav.about',
  contacto: 'nav.contact'
};

/* Genera la URL de una imagen de Pexels (sustituible por imágenes del cliente) */
const pexelsImage = (id, width = 600, height = 800) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=${height}&w=${width}`;

/* Catálogo de productos */
const PRODUCTS = [
  { id: 'p1', category: 'men', price: 189, oldPrice: null, isNew: true, image: pexelsImage(7653836), sizes: ['S', 'M', 'L', 'XL'],
    name: { es: 'Abrigo de lana camel', en: 'Camel wool coat', va: 'Abric de llana camel' } },
  { id: 'p2', category: 'women', price: 89, oldPrice: null, isNew: false, image: pexelsImage(18731383), sizes: ['XS', 'S', 'M', 'L'],
    name: { es: 'Vestido midi negro', en: 'Black midi dress', va: 'Vestit midi negre' } },
  { id: 'p3', category: 'men', price: 159, oldPrice: 199, isNew: false, image: pexelsImage(19086795), sizes: ['S', 'M', 'L', 'XL'],
    name: { es: 'Chaquetón de paño negro', en: 'Black wool pea coat', va: 'Jaquetó de drap negre' } },
  { id: 'p4', category: 'women', price: 119, oldPrice: null, isNew: true, image: pexelsImage(10240697), sizes: ['XS', 'S', 'M', 'L'],
    name: { es: 'Vestido satén esmeralda', en: 'Emerald satin dress', va: 'Vestit de setí maragda' } },
  { id: 'p5', category: 'men', price: 59, oldPrice: null, isNew: false, image: pexelsImage(9594681), sizes: ['S', 'M', 'L', 'XL'],
    name: { es: 'Camisa de lino verde', en: 'Green linen shirt', va: 'Camisa de lli verda' } },
  { id: 'p6', category: 'women', price: 139, oldPrice: null, isNew: false, image: pexelsImage(34160661), sizes: ['XS', 'S', 'M', 'L'],
    name: { es: 'Vestido rojo de noche', en: 'Red evening dress', va: 'Vestit roig de nit' } },
  { id: 'p7', category: 'men', price: 169, oldPrice: null, isNew: true, image: pexelsImage(35879164), sizes: ['M', 'L', 'XL'],
    name: { es: 'Parka acolchada', en: 'Padded parka', va: 'Parca encoixinada' } },
  { id: 'p8', category: 'women', price: 79, oldPrice: 99, isNew: false, image: pexelsImage(28114289), sizes: ['XS', 'S', 'M', 'L'],
    name: { es: 'Vestido lencero negro', en: 'Black slip dress', va: 'Vestit lencer negre' } }
];

/* Iconos SVG reutilizables */
const ICONS = {
  sun: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4.5"/><path d="M12 1.5v2M12 20.5v2M4.6 4.6 6 6M18 18l1.4 1.4M1.5 12h2M20.5 12h2M4.6 19.4 6 18M18 6l1.4-1.4"/></svg>',
  moon: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>',
  check: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>',
  bag: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><path d="M3 6h18M16 10a4 4 0 0 1-8 0"/></svg>'
};

/* ---------- 2. Traducciones ---------- */
/* Tabla de tallas compartida (solo cambian las cabeceras) */
const buildSizeTable = (intro, headers) => `
  <p>${intro}</p>
  <table>
    <thead><tr>${headers.map((h) => `<th>${h}</th>`).join('')}</tr></thead>
    <tbody>
      <tr><td>XS</td><td>82–86</td><td>64–68</td><td>88–92</td></tr>
      <tr><td>S</td><td>86–90</td><td>68–72</td><td>92–96</td></tr>
      <tr><td>M</td><td>90–96</td><td>72–78</td><td>96–102</td></tr>
      <tr><td>L</td><td>96–102</td><td>78–84</td><td>102–108</td></tr>
      <tr><td>XL</td><td>102–110</td><td>84–92</td><td>108–116</td></tr>
    </tbody>
  </table>`;

const TRANSLATIONS = {
  es: {
    'top.ship': 'Envío gratis a partir de 60 € · Recogida en tienda en 2 h',
    'top.hours': 'Lun–Sáb · 10:00–20:30',
    'nav.home': 'Inicio', 'nav.collections': 'Colecciones', 'nav.shop': 'Tienda', 'nav.lookbook': 'Lookbook', 'nav.about': 'Nosotros', 'nav.contact': 'Contacto',
    'hero.tag': 'Nueva colección Otoño–Invierno 2026',
    'hero.title': 'Viste con intención.',
    'hero.text': 'Prendas atemporales para adultos, confeccionadas con tejidos nobles y pensadas para durar más de una temporada.',
    'hero.cta1': 'Comprar ahora', 'hero.cta2': 'Ver colecciones', 'hero.scroll': 'Desliza',
    'feat.ship.t': 'Envío gratis', 'feat.ship.d': 'En pedidos superiores a 60 €',
    'feat.pickup.t': 'Recogida en tienda', 'feat.pickup.d': 'Reserva online y recoge en 2 h',
    'feat.returns.t': 'Devoluciones 30 días', 'feat.returns.d': 'Cambios sin coste en tienda',
    'feat.pay.t': 'Pago flexible', 'feat.pay.d': 'Online, en tienda o a la entrega',
    'col.eyebrow': 'Colecciones', 'col.title': 'Diseñadas para cada momento',
    'col.text': 'Líneas depuradas, paleta neutra y patrones pensados para el cuerpo adulto. Piezas que combinan entre sí y construyen un armario sin esfuerzo.',
    'col.women': 'Mujer', 'col.men': 'Hombre', 'col.new': 'Novedades', 'col.cta': 'Descubrir →',
    'shop.eyebrow': 'Tienda online', 'shop.title': 'Esenciales de temporada',
    'shop.text': 'Elige tu talla, añade a la cesta y decide si prefieres recogerlo en tienda o recibirlo en casa.',
    'shop.size': 'Talla', 'shop.add': 'Añadir a la cesta', 'badge.new': 'Nuevo',
    'filter.all': 'Todo', 'filter.women': 'Mujer', 'filter.men': 'Hombre', 'filter.sale': 'Rebajas',
    'look.eyebrow': 'Lookbook', 'look.title': 'Inspiración Otoño 2026',
    'look.text': 'Capas, texturas y tonos tierra. Una mirada a cómo combinar las piezas clave de la temporada.',
    'about.eyebrow': 'Nosotros', 'about.title': 'Moda consciente desde 2012',
    'about.p1': 'VESTA nació en el centro de València con una idea sencilla: vestir a personas adultas con prendas bien hechas, cómodas y elegantes, lejos de las tendencias de usar y tirar.',
    'about.p2': 'Trabajamos con talleres europeos, fibras naturales y producciones cortas. Cada pieza se prueba en tienda antes de llegar a ti.',
    'about.s1': 'Años vistiendo València', 'about.s2': 'Clientes satisfechos', 'about.s3': 'Tejidos de origen europeo',
    'contact.eyebrow': 'Contacto', 'contact.title': 'Hablemos',
    'contact.text': '¿Dudas con una talla, un pedido o una reserva? Escríbenos o visítanos, te asesoramos encantados.',
    'contact.addressT': 'Visítanos', 'contact.hoursT': 'Horario', 'contact.phoneT': 'Teléfono',
    'form.name': 'Nombre *', 'form.subject': 'Asunto', 'form.message': 'Mensaje *', 'form.privacy': 'Acepto la política de privacidad',
    'form.send': 'Enviar mensaje', 'form.success': '¡Gracias! Te responderemos en menos de 24 h.', 'form.error': 'Por favor, completa correctamente los campos obligatorios.',
    'footer.about': 'Moda atemporal para adultos. Diseñada en València, confeccionada en Europa.',
    'footer.emailPh': 'Tu email', 'footer.subscribe': 'Suscribirme', 'footer.shop': 'Tienda', 'footer.help': 'Ayuda',
    'footer.shipping': 'Envíos y entregas', 'footer.returns': 'Cambios y devoluciones', 'footer.sizes': 'Guía de tallas',
    'footer.legal': 'Legal', 'footer.cookies': 'Política de cookies', 'footer.requirements': 'Requisitos', 'footer.privacy': 'Privacidad',
    'footer.legalNotice': 'Aviso legal', 'footer.copy': 'Todos los derechos reservados.',
    'search.button': 'Buscar', 'search.title': 'Buscar en la página', 'search.placeholder': 'Escribe para buscar…',
    'search.hint': 'Escribe al menos 2 caracteres', 'search.results': '{n} coincidencias encontradas', 'search.none': 'Sin resultados para «{q}»',
    'login.title': 'Accede a tu cuenta', 'login.password': 'Contraseña', 'login.submit': 'Entrar',
    'login.register': '¿No tienes cuenta? Regístrate', 'login.note': 'El sistema de acceso estará disponible próximamente.',
    'cart.title': 'Tu cesta', 'cart.subtotal': 'Subtotal', 'cart.shipping': 'Envío', 'cart.total': 'Total',
    'cart.shipNote': 'Gastos de envío y forma de pago en el siguiente paso.', 'cart.checkout': 'Tramitar pedido', 'cart.clear': 'Vaciar cesta',
    'cart.empty': 'Tu cesta está vacía', 'cart.continue': 'Seguir comprando', 'cart.remove': 'Eliminar',
    'cart.free': '¡Has conseguido el envío gratis!', 'cart.freeLeft': 'Te faltan {amount} para el envío gratis', 'cart.cleared': 'Cesta vaciada',
    'toast.added': '{name} añadido a la cesta', 'toast.newsletter': '¡Gracias por suscribirte!',
    'co.title': 'Finalizar pedido', 'co.step1': 'Tus datos', 'co.name': 'Nombre completo *', 'co.phone': 'Teléfono *',
    'co.step2': 'Entrega', 'co.pickup': 'Recoger en tienda', 'co.pickupDesc': 'Gratis · Listo en 2 h',
    'co.delivery': 'Envío a domicilio', 'co.deliveryDesc': '4,95 € · Gratis desde 60 € · 24–48 h',
    'co.store': 'Tienda de recogida', 'co.date': 'Fecha de recogida *', 'co.address': 'Dirección *', 'co.city': 'Ciudad *', 'co.zip': 'Código postal *',
    'co.step3': 'Pago', 'co.payStore': 'Pagar al recoger', 'co.payStoreDesc': 'Efectivo o tarjeta en tienda',
    'co.payCod': 'Pagar a la entrega', 'co.payCodDesc': 'Contra reembolso al repartidor',
    'co.payOnline': 'Pago online', 'co.payOnlineDesc': 'Pasarela de pago segura de la tienda',
    'co.summary': 'Resumen', 'co.confirm': 'Confirmar pedido', 'co.free': 'Gratis',
    'co.pickupAt': 'Recogida en {store} · {date}', 'co.shipTo': 'Envío a {address}',
    'pay.title': 'Resumen de pago', 'pay.text': 'Vas a pagar el siguiente importe a través de la pasarela segura de la tienda.',
    'pay.order': 'Pedido', 'pay.customer': 'Cliente', 'pay.delivery': 'Entrega', 'pay.amount': 'Importe a pagar',
    'pay.go': 'Ir a la pasarela de pago', 'pay.note': 'Pago cifrado. No almacenamos los datos de tu tarjeta.', 'pay.redirect': 'Conectando con la pasarela de pago…',
    'ok.title': '¡Pedido reservado!', 'ok.close': 'Seguir comprando',
    'ok.pickup': 'Tu pedido estará listo para recoger en la tienda elegida. Pagarás al recogerlo. Te hemos enviado los detalles por email.',
    'ok.cod': 'Recibirás tu pedido en 24–48 h laborables. Pagarás al repartidor en el momento de la entrega.',
    'cookie.text': 'Usamos cookies técnicas propias para guardar tu cesta, idioma y preferencias de visualización.',
    'cookie.more': 'Más información', 'cookie.accept': 'Aceptar',
    'info.cookies.title': 'Política de cookies',
    'info.cookies.body': '<p>En VESTA Atelier utilizamos únicamente cookies técnicas y almacenamiento local necesarios para el funcionamiento de la tienda.</p><h3>¿Qué guardamos?</h3><ul><li><strong>Cesta:</strong> productos y tallas seleccionadas.</li><li><strong>Idioma:</strong> tu idioma preferido.</li><li><strong>Tema:</strong> modo claro u oscuro.</li><li><strong>Consentimiento:</strong> que has aceptado este aviso.</li></ul><h3>¿Cómo eliminarlas?</h3><p>Puedes borrarlas en cualquier momento desde la configuración de tu navegador. No utilizamos cookies publicitarias ni de terceros.</p>',
    'info.requirements.title': 'Requisitos de compra',
    'info.requirements.body': '<p>Para comprar en nuestra tienda online es necesario:</p><ul><li>Ser mayor de 18 años o contar con autorización de un tutor legal.</li><li>Facilitar datos de contacto veraces (nombre, email y teléfono).</li><li>Para envíos: dirección de entrega en Península o Baleares.</li><li>Para recogida en tienda: presentar el número de pedido y un documento identificativo.</li><li>Navegador actualizado con JavaScript activado.</li></ul><h3>Reservas</h3><p>Los pedidos con pago en tienda se mantienen reservados durante 72 horas desde la fecha de recogida elegida.</p>',
    'info.shipping.title': 'Envíos y entregas',
    'info.shipping.body': '<ul><li><strong>Recogida en tienda:</strong> gratis, lista en 2 horas en horario comercial.</li><li><strong>Envío a domicilio:</strong> 4,95 € (gratis desde 60 €), entrega en 24–48 h laborables.</li><li><strong>Pago a la entrega:</strong> disponible en envíos a domicilio, en efectivo o tarjeta.</li></ul><p>Recibirás un email con el seguimiento cuando tu pedido salga del almacén.</p>',
    'info.returns.title': 'Cambios y devoluciones',
    'info.returns.body': '<p>Dispones de <strong>30 días</strong> desde la recepción para cambiar o devolver tus prendas.</p><ul><li>Cambios y devoluciones gratis en cualquiera de nuestras tiendas.</li><li>Devolución por mensajería: 3,95 €.</li><li>Las prendas deben conservar sus etiquetas y estar en perfecto estado.</li><li>El reembolso se realiza en un máximo de 14 días por el mismo método de pago.</li></ul>',
    'info.sizes.title': 'Guía de tallas',
    'info.sizes.body': buildSizeTable('Medidas en centímetros. Si estás entre dos tallas, te recomendamos la mayor.', ['Talla', 'Pecho', 'Cintura', 'Cadera']),
    'info.privacy.title': 'Política de privacidad',
    'info.privacy.body': '<p>VESTA Atelier S.L. es responsable del tratamiento de tus datos, que se utilizan exclusivamente para gestionar pedidos, reservas y consultas.</p><ul><li>No cedemos datos a terceros salvo obligación legal o empresas de transporte.</li><li>Puedes ejercer tus derechos de acceso, rectificación y supresión escribiendo a hola@vesta-atelier.es.</li></ul>',
    'info.legal.title': 'Aviso legal',
    'info.legal.body': '<p><strong>VESTA Atelier S.L.</strong> · CIF B-00000000 · C/ de Colón 24, 46004 València.</p><p>Inscrita en el Registro Mercantil de Valencia. Contacto: hola@vesta-atelier.es · +34 963 000 000.</p><p>Todos los contenidos de esta web están protegidos por derechos de propiedad intelectual.</p>'
  },

  en: {
    'top.ship': 'Free shipping over €60 · In-store pickup in 2 h',
    'top.hours': 'Mon–Sat · 10:00–20:30',
    'nav.home': 'Home', 'nav.collections': 'Collections', 'nav.shop': 'Shop', 'nav.lookbook': 'Lookbook', 'nav.about': 'About', 'nav.contact': 'Contact',
    'hero.tag': 'New Autumn–Winter 2026 collection',
    'hero.title': 'Dress with intention.',
    'hero.text': 'Timeless clothing for adults, made from fine fabrics and designed to last more than one season.',
    'hero.cta1': 'Shop now', 'hero.cta2': 'View collections', 'hero.scroll': 'Scroll',
    'feat.ship.t': 'Free shipping', 'feat.ship.d': 'On orders over €60',
    'feat.pickup.t': 'In-store pickup', 'feat.pickup.d': 'Book online, collect in 2 h',
    'feat.returns.t': '30-day returns', 'feat.returns.d': 'Free exchanges in store',
    'feat.pay.t': 'Flexible payment', 'feat.pay.d': 'Online, in store or on delivery',
    'col.eyebrow': 'Collections', 'col.title': 'Designed for every moment',
    'col.text': 'Clean lines, a neutral palette and patterns made for the adult body. Pieces that work together to build an effortless wardrobe.',
    'col.women': 'Women', 'col.men': 'Men', 'col.new': 'New in', 'col.cta': 'Discover →',
    'shop.eyebrow': 'Online shop', 'shop.title': 'Seasonal essentials',
    'shop.text': 'Choose your size, add it to your bag and decide whether to collect it in store or have it delivered.',
    'shop.size': 'Size', 'shop.add': 'Add to bag', 'badge.new': 'New',
    'filter.all': 'All', 'filter.women': 'Women', 'filter.men': 'Men', 'filter.sale': 'Sale',
    'look.eyebrow': 'Lookbook', 'look.title': 'Autumn 2026 inspiration',
    'look.text': 'Layers, textures and earthy tones. A look at how to style the key pieces of the season.',
    'about.eyebrow': 'About us', 'about.title': 'Conscious fashion since 2012',
    'about.p1': 'VESTA was born in the heart of València with a simple idea: dressing adults in well-made, comfortable and elegant clothing, far from throwaway trends.',
    'about.p2': 'We work with European workshops, natural fibres and small production runs. Every piece is tried on in store before it reaches you.',
    'about.s1': 'Years dressing València', 'about.s2': 'Happy customers', 'about.s3': 'European-sourced fabrics',
    'contact.eyebrow': 'Contact', 'contact.title': "Let's talk",
    'contact.text': 'Questions about a size, an order or a reservation? Write to us or visit us, we will be happy to help.',
    'contact.addressT': 'Visit us', 'contact.hoursT': 'Opening hours', 'contact.phoneT': 'Phone',
    'form.name': 'Name *', 'form.subject': 'Subject', 'form.message': 'Message *', 'form.privacy': 'I accept the privacy policy',
    'form.send': 'Send message', 'form.success': 'Thank you! We will reply within 24 h.', 'form.error': 'Please fill in the required fields correctly.',
    'footer.about': 'Timeless fashion for adults. Designed in València, made in Europe.',
    'footer.emailPh': 'Your email', 'footer.subscribe': 'Subscribe', 'footer.shop': 'Shop', 'footer.help': 'Help',
    'footer.shipping': 'Shipping & delivery', 'footer.returns': 'Exchanges & returns', 'footer.sizes': 'Size guide',
    'footer.legal': 'Legal', 'footer.cookies': 'Cookie policy', 'footer.requirements': 'Requirements', 'footer.privacy': 'Privacy',
    'footer.legalNotice': 'Legal notice', 'footer.copy': 'All rights reserved.',
    'search.button': 'Search', 'search.title': 'Search this page', 'search.placeholder': 'Type to search…',
    'search.hint': 'Type at least 2 characters', 'search.results': '{n} matches found', 'search.none': 'No results for “{q}”',
    'login.title': 'Sign in to your account', 'login.password': 'Password', 'login.submit': 'Sign in',
    'login.register': "Don't have an account? Sign up", 'login.note': 'The login system will be available soon.',
    'cart.title': 'Your bag', 'cart.subtotal': 'Subtotal', 'cart.shipping': 'Shipping', 'cart.total': 'Total',
    'cart.shipNote': 'Shipping costs and payment method in the next step.', 'cart.checkout': 'Checkout', 'cart.clear': 'Empty bag',
    'cart.empty': 'Your bag is empty', 'cart.continue': 'Continue shopping', 'cart.remove': 'Remove',
    'cart.free': 'You have unlocked free shipping!', 'cart.freeLeft': '{amount} away from free shipping', 'cart.cleared': 'Bag emptied',
    'toast.added': '{name} added to your bag', 'toast.newsletter': 'Thanks for subscribing!',
    'co.title': 'Checkout', 'co.step1': 'Your details', 'co.name': 'Full name *', 'co.phone': 'Phone *',
    'co.step2': 'Delivery', 'co.pickup': 'Collect in store', 'co.pickupDesc': 'Free · Ready in 2 h',
    'co.delivery': 'Home delivery', 'co.deliveryDesc': '€4.95 · Free over €60 · 24–48 h',
    'co.store': 'Pickup store', 'co.date': 'Pickup date *', 'co.address': 'Address *', 'co.city': 'City *', 'co.zip': 'Postcode *',
    'co.step3': 'Payment', 'co.payStore': 'Pay on pickup', 'co.payStoreDesc': 'Cash or card in store',
    'co.payCod': 'Pay on delivery', 'co.payCodDesc': 'Cash on delivery to the courier',
    'co.payOnline': 'Online payment', 'co.payOnlineDesc': "Store's secure payment gateway",
    'co.summary': 'Summary', 'co.confirm': 'Place order', 'co.free': 'Free',
    'co.pickupAt': 'Pickup at {store} · {date}', 'co.shipTo': 'Delivery to {address}',
    'pay.title': 'Payment summary', 'pay.text': "You are about to pay the following amount through the store's secure gateway.",
    'pay.order': 'Order', 'pay.customer': 'Customer', 'pay.delivery': 'Delivery', 'pay.amount': 'Amount to pay',
    'pay.go': 'Go to payment gateway', 'pay.note': 'Encrypted payment. We never store your card details.', 'pay.redirect': 'Connecting to the payment gateway…',
    'ok.title': 'Order reserved!', 'ok.close': 'Continue shopping',
    'ok.pickup': 'Your order will be ready to collect at the selected store. You will pay on pickup. Details have been sent to your email.',
    'ok.cod': 'You will receive your order within 24–48 working hours. You will pay the courier on delivery.',
    'cookie.text': 'We use our own technical cookies to save your bag, language and display preferences.',
    'cookie.more': 'More info', 'cookie.accept': 'Accept',
    'info.cookies.title': 'Cookie policy',
    'info.cookies.body': '<p>VESTA Atelier only uses technical cookies and local storage required for the shop to work.</p><h3>What do we store?</h3><ul><li><strong>Bag:</strong> selected products and sizes.</li><li><strong>Language:</strong> your preferred language.</li><li><strong>Theme:</strong> light or dark mode.</li><li><strong>Consent:</strong> that you accepted this notice.</li></ul><h3>How to delete them?</h3><p>You can delete them at any time from your browser settings. We do not use advertising or third-party cookies.</p>',
    'info.requirements.title': 'Purchase requirements',
    'info.requirements.body': '<p>To shop in our online store you must:</p><ul><li>Be over 18 or have the consent of a legal guardian.</li><li>Provide truthful contact details (name, email and phone).</li><li>For shipping: a delivery address in mainland Spain or the Balearic Islands.</li><li>For in-store pickup: show your order number and an ID document.</li><li>Use an up-to-date browser with JavaScript enabled.</li></ul><h3>Reservations</h3><p>Orders paid in store are kept reserved for 72 hours from the chosen pickup date.</p>',
    'info.shipping.title': 'Shipping & delivery',
    'info.shipping.body': '<ul><li><strong>In-store pickup:</strong> free, ready in 2 hours during opening hours.</li><li><strong>Home delivery:</strong> €4.95 (free over €60), delivered in 24–48 working hours.</li><li><strong>Pay on delivery:</strong> available for home delivery, cash or card.</li></ul><p>You will receive a tracking email when your order leaves our warehouse.</p>',
    'info.returns.title': 'Exchanges & returns',
    'info.returns.body': '<p>You have <strong>30 days</strong> from receipt to exchange or return your items.</p><ul><li>Free exchanges and returns in any of our stores.</li><li>Courier returns: €3.95.</li><li>Items must keep their tags and be in perfect condition.</li><li>Refunds are issued within 14 days using the original payment method.</li></ul>',
    'info.sizes.title': 'Size guide',
    'info.sizes.body': buildSizeTable('Measurements in centimetres. If you are between two sizes, we recommend the larger one.', ['Size', 'Chest', 'Waist', 'Hips']),
    'info.privacy.title': 'Privacy policy',
    'info.privacy.body': '<p>VESTA Atelier S.L. is the data controller of your personal data, which is used exclusively to manage orders, reservations and enquiries.</p><ul><li>We do not share data with third parties except where legally required or with delivery companies.</li><li>You can exercise your rights of access, rectification and erasure by writing to hola@vesta-atelier.es.</li></ul>',
    'info.legal.title': 'Legal notice',
    'info.legal.body': '<p><strong>VESTA Atelier S.L.</strong> · VAT B-00000000 · C/ de Colón 24, 46004 València.</p><p>Registered in the Valencia Companies Register. Contact: hola@vesta-atelier.es · +34 963 000 000.</p><p>All content on this website is protected by intellectual property rights.</p>'
  },

  va: {
    'top.ship': 'Enviament gratuït a partir de 60 € · Recollida en botiga en 2 h',
    'top.hours': 'Dl–Ds · 10:00–20:30',
    'nav.home': 'Inici', 'nav.collections': 'Col·leccions', 'nav.shop': 'Botiga', 'nav.lookbook': 'Lookbook', 'nav.about': 'Nosaltres', 'nav.contact': 'Contacte',
    'hero.tag': 'Nova col·lecció Tardor–Hivern 2026',
    'hero.title': 'Vist amb intenció.',
    'hero.text': "Peces atemporals per a adults, confeccionades amb teixits nobles i pensades per a durar més d'una temporada.",
    'hero.cta1': 'Comprar ara', 'hero.cta2': 'Veure col·leccions', 'hero.scroll': 'Llisca',
    'feat.ship.t': 'Enviament gratuït', 'feat.ship.d': 'En comandes superiors a 60 €',
    'feat.pickup.t': 'Recollida en botiga', 'feat.pickup.d': 'Reserva en línia i arreplega en 2 h',
    'feat.returns.t': 'Devolucions 30 dies', 'feat.returns.d': 'Canvis sense cost en botiga',
    'feat.pay.t': 'Pagament flexible', 'feat.pay.d': "En línia, en botiga o a l'entrega",
    'col.eyebrow': 'Col·leccions', 'col.title': 'Dissenyades per a cada moment',
    'col.text': 'Línies depurades, paleta neutra i patrons pensats per al cos adult. Peces que combinen entre si i construïxen un armari sense esforç.',
    'col.women': 'Dona', 'col.men': 'Home', 'col.new': 'Novetats', 'col.cta': 'Descobrir →',
    'shop.eyebrow': 'Botiga en línia', 'shop.title': 'Essencials de temporada',
    'shop.text': 'Tria la teua talla, afig-la a la cistella i decidix si preferixes arreplegar-la en botiga o rebre-la a casa.',
    'shop.size': 'Talla', 'shop.add': 'Afegir a la cistella', 'badge.new': 'Nou',
    'filter.all': 'Tot', 'filter.women': 'Dona', 'filter.men': 'Home', 'filter.sale': 'Rebaixes',
    'look.eyebrow': 'Lookbook', 'look.title': 'Inspiració Tardor 2026',
    'look.text': 'Capes, textures i tons terra. Una mirada a com combinar les peces clau de la temporada.',
    'about.eyebrow': 'Nosaltres', 'about.title': 'Moda conscient des de 2012',
    'about.p1': "VESTA va nàixer al centre de València amb una idea senzilla: vestir persones adultes amb peces ben fetes, còmodes i elegants, lluny de les tendències d'usar i llançar.",
    'about.p2': "Treballem amb tallers europeus, fibres naturals i produccions curtes. Cada peça es prova en botiga abans d'arribar a tu.",
    'about.s1': 'Anys vestint València', 'about.s2': 'Clients satisfets', 'about.s3': "Teixits d'origen europeu",
    'contact.eyebrow': 'Contacte', 'contact.title': 'Parlem',
    'contact.text': "Dubtes amb una talla, una comanda o una reserva? Escriu-nos o visita'ns, t'assessorarem encantats.",
    'contact.addressT': "Visita'ns", 'contact.hoursT': 'Horari', 'contact.phoneT': 'Telèfon',
    'form.name': 'Nom *', 'form.subject': 'Assumpte', 'form.message': 'Missatge *', 'form.privacy': 'Accepte la política de privacitat',
    'form.send': 'Enviar missatge', 'form.success': 'Gràcies! Et respondrem en menys de 24 h.', 'form.error': 'Per favor, completa correctament els camps obligatoris.',
    'footer.about': 'Moda atemporal per a adults. Dissenyada a València, confeccionada a Europa.',
    'footer.emailPh': 'El teu email', 'footer.subscribe': "Subscriure'm", 'footer.shop': 'Botiga', 'footer.help': 'Ajuda',
    'footer.shipping': 'Enviaments i entregues', 'footer.returns': 'Canvis i devolucions', 'footer.sizes': 'Guia de talles',
    'footer.legal': 'Legal', 'footer.cookies': 'Política de galetes', 'footer.requirements': 'Requisits', 'footer.privacy': 'Privacitat',
    'footer.legalNotice': 'Avís legal', 'footer.copy': 'Tots els drets reservats.',
    'search.button': 'Cercar', 'search.title': 'Cercar en la pàgina', 'search.placeholder': 'Escriu per a cercar…',
    'search.hint': 'Escriu almenys 2 caràcters', 'search.results': '{n} coincidències trobades', 'search.none': 'Sense resultats per a «{q}»',
    'login.title': 'Accedix al teu compte', 'login.password': 'Contrasenya', 'login.submit': 'Entrar',
    'login.register': "No tens compte? Registra't", 'login.note': "El sistema d'accés estarà disponible pròximament.",
    'cart.title': 'La teua cistella', 'cart.subtotal': 'Subtotal', 'cart.shipping': 'Enviament', 'cart.total': 'Total',
    'cart.shipNote': "Despeses d'enviament i forma de pagament en el pas següent.", 'cart.checkout': 'Tramitar comanda', 'cart.clear': 'Buidar cistella',
    'cart.empty': 'La teua cistella està buida', 'cart.continue': 'Seguir comprant', 'cart.remove': 'Eliminar',
    'cart.free': "Has aconseguit l'enviament gratuït!", 'cart.freeLeft': "Et falten {amount} per a l'enviament gratuït", 'cart.cleared': 'Cistella buidada',
    'toast.added': '{name} afegit a la cistella', 'toast.newsletter': "Gràcies per subscriure't!",
    'co.title': 'Finalitzar comanda', 'co.step1': 'Les teues dades', 'co.name': 'Nom complet *', 'co.phone': 'Telèfon *',
    'co.step2': 'Entrega', 'co.pickup': 'Arreplegar en botiga', 'co.pickupDesc': 'Gratuït · Llest en 2 h',
    'co.delivery': 'Enviament a domicili', 'co.deliveryDesc': '4,95 € · Gratuït des de 60 € · 24–48 h',
    'co.store': 'Botiga de recollida', 'co.date': 'Data de recollida *', 'co.address': 'Adreça *', 'co.city': 'Ciutat *', 'co.zip': 'Codi postal *',
    'co.step3': 'Pagament', 'co.payStore': 'Pagar en arreplegar', 'co.payStoreDesc': 'Efectiu o targeta en botiga',
    'co.payCod': "Pagar a l'entrega", 'co.payCodDesc': 'Contra reemborsament al repartidor',
    'co.payOnline': 'Pagament en línia', 'co.payOnlineDesc': 'Passarel·la de pagament segura de la botiga',
    'co.summary': 'Resum', 'co.confirm': 'Confirmar comanda', 'co.free': 'Gratuït',
    'co.pickupAt': 'Recollida en {store} · {date}', 'co.shipTo': 'Enviament a {address}',
    'pay.title': 'Resum de pagament', 'pay.text': 'Pagaràs el següent import a través de la passarel·la segura de la botiga.',
    'pay.order': 'Comanda', 'pay.customer': 'Client', 'pay.delivery': 'Entrega', 'pay.amount': 'Import a pagar',
    'pay.go': 'Anar a la passarel·la de pagament', 'pay.note': 'Pagament xifrat. No guardem les dades de la teua targeta.', 'pay.redirect': 'Connectant amb la passarel·la de pagament…',
    'ok.title': 'Comanda reservada!', 'ok.close': 'Seguir comprant',
    'ok.pickup': "La teua comanda estarà llesta per a arreplegar en la botiga triada. Pagaràs en arreplegar-la. T'hem enviat els detalls per email.",
    'ok.cod': "Rebràs la teua comanda en 24–48 h laborables. Pagaràs al repartidor en el moment de l'entrega.",
    'cookie.text': 'Utilitzem galetes tècniques pròpies per a guardar la teua cistella, idioma i preferències de visualització.',
    'cookie.more': 'Més informació', 'cookie.accept': 'Acceptar',
    'info.cookies.title': 'Política de galetes',
    'info.cookies.body': "<p>En VESTA Atelier utilitzem únicament galetes tècniques i emmagatzematge local necessaris per al funcionament de la botiga.</p><h3>Què guardem?</h3><ul><li><strong>Cistella:</strong> productes i talles seleccionades.</li><li><strong>Idioma:</strong> el teu idioma preferit.</li><li><strong>Tema:</strong> mode clar o fosc.</li><li><strong>Consentiment:</strong> que has acceptat este avís.</li></ul><h3>Com eliminar-les?</h3><p>Pots esborrar-les en qualsevol moment des de la configuració del teu navegador. No utilitzem galetes publicitàries ni de tercers.</p>",
    'info.requirements.title': 'Requisits de compra',
    'info.requirements.body': "<p>Per a comprar en la nostra botiga en línia cal:</p><ul><li>Ser major de 18 anys o tindre l'autorització d'un tutor legal.</li><li>Facilitar dades de contacte verídiques (nom, email i telèfon).</li><li>Per a enviaments: adreça d'entrega a la Península o les Balears.</li><li>Per a recollida en botiga: presentar el número de comanda i un document identificatiu.</li><li>Navegador actualitzat amb JavaScript activat.</li></ul><h3>Reserves</h3><p>Les comandes amb pagament en botiga es mantenen reservades durant 72 hores des de la data de recollida triada.</p>",
    'info.shipping.title': 'Enviaments i entregues',
    'info.shipping.body': "<ul><li><strong>Recollida en botiga:</strong> gratuïta, llesta en 2 hores en horari comercial.</li><li><strong>Enviament a domicili:</strong> 4,95 € (gratuït des de 60 €), entrega en 24–48 h laborables.</li><li><strong>Pagament a l'entrega:</strong> disponible en enviaments a domicili, en efectiu o targeta.</li></ul><p>Rebràs un email amb el seguiment quan la teua comanda isca del magatzem.</p>",
    'info.returns.title': 'Canvis i devolucions',
    'info.returns.body': "<p>Disposes de <strong>30 dies</strong> des de la recepció per a canviar o tornar les teues peces.</p><ul><li>Canvis i devolucions gratuïts en qualsevol de les nostres botigues.</li><li>Devolució per missatgeria: 3,95 €.</li><li>Les peces han de conservar les etiquetes i estar en perfecte estat.</li><li>El reemborsament es fa en un màxim de 14 dies pel mateix mètode de pagament.</li></ul>",
    'info.sizes.title': 'Guia de talles',
    'info.sizes.body': buildSizeTable('Mesures en centímetres. Si estàs entre dues talles, et recomanem la més gran.', ['Talla', 'Pit', 'Cintura', 'Maluc']),
    'info.privacy.title': 'Política de privacitat',
    'info.privacy.body': "<p>VESTA Atelier S.L. és responsable del tractament de les teues dades, que s'utilitzen exclusivament per a gestionar comandes, reserves i consultes.</p><ul><li>No cedim dades a tercers excepte per obligació legal o a empreses de transport.</li><li>Pots exercir els teus drets d'accés, rectificació i supressió escrivint a hola@vesta-atelier.es.</li></ul>",
    'info.legal.title': 'Avís legal',
    'info.legal.body': "<p><strong>VESTA Atelier S.L.</strong> · CIF B-00000000 · C/ de Colón 24, 46004 València.</p><p>Inscrita en el Registre Mercantil de València. Contacte: hola@vesta-atelier.es · +34 963 000 000.</p><p>Tots els continguts d'esta web estan protegits per drets de propietat intel·lectual.</p>"
  }
};

/* ---------- 3. Utilidades ---------- */
const $ = (selector, context = document) => context.querySelector(selector);
const $$ = (selector, context = document) => [...context.querySelectorAll(selector)];

/* Acceso seguro a localStorage */
const storage = {
  get(key, fallback) {
    try {
      const value = localStorage.getItem(key);
      return value === null ? fallback : JSON.parse(value);
    } catch {
      return fallback;
    }
  },
  set(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* almacenamiento no disponible */ }
  }
};

/* Estado global de la aplicación */
const state = {
  lang: CONFIG.defaultLang,
  filter: 'all',
  cart: storage.get(CONFIG.storageKeys.cart, []),
  selectedSizes: {},
  pendingOrder: null
};

/* Referencias del DOM */
const dom = {
  header: $('#siteHeader'),
  hamburger: $('#hamburger'),
  mobileMenu: $('#mobileMenu'),
  themeToggle: $('#themeToggle'),
  langDropdown: $('#langDropdown'),
  langToggle: $('#langToggle'),
  langCurrent: $('#langCurrent'),
  backToTop: $('#backToTop'),
  productGrid: $('#productGrid'),
  searchModal: $('#searchModal'),
  searchInput: $('#searchInput'),
  searchStatus: $('#searchStatus'),
  searchResults: $('#searchResults'),
  loginModal: $('#loginModal'),
  cartDrawer: $('#cartDrawer'),
  cartItems: $('#cartItems'),
  cartFoot: $('#cartFoot'),
  cartBadge: $('#cartBadge'),
  cartSubtotal: $('#cartSubtotal'),
  freeShip: $('#freeShip'),
  checkoutModal: $('#checkoutModal'),
  checkoutForm: $('#checkoutForm'),
  checkoutItems: $('#checkoutItems'),
  checkoutFeedback: $('#checkoutFeedback'),
  paymentModal: $('#paymentModal'),
  confirmModal: $('#confirmModal'),
  infoModal: $('#infoModal'),
  cookieBanner: $('#cookieBanner'),
  toastContainer: $('#toastContainer')
};

/* Devuelve un texto traducido y sustituye variables {clave} */
function t(key, vars = {}) {
  const dictionary = TRANSLATIONS[state.lang] || TRANSLATIONS[CONFIG.defaultLang];
  let text = dictionary[key] ?? TRANSLATIONS[CONFIG.defaultLang][key] ?? key;
  Object.entries(vars).forEach(([name, value]) => { text = text.split(`{${name}}`).join(value); });
  return text;
}

const formatPrice = (value) =>
  new Intl.NumberFormat(LOCALES[state.lang], { style: 'currency', currency: 'EUR' }).format(value);

const escapeHTML = (str) =>
  str.replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);

const getProduct = (id) => PRODUCTS.find((product) => product.id === id);

/* Ejecuta una función como máximo una vez por frame */
function throttleFrame(callback) {
  let ticking = false;
  return () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => { callback(); ticking = false; });
  };
}

function debounce(callback, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => callback(...args), delay);
  };
}

/* Notificación temporal */
function showToast(message) {
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `${ICONS.check}<span>${escapeHTML(message)}</span>`;
  dom.toastContainer.appendChild(toast);
  setTimeout(() => {
    toast.classList.add('is-leaving');
    toast.addEventListener('animationend', () => toast.remove(), { once: true });
  }, 2600);
}

/* ---------- 4. Tema claro/oscuro ---------- */
function applyTheme(theme) {
  const isDark = theme === 'dark';
  document.body.classList.toggle('theme-dark', isDark);
  document.body.classList.toggle('theme-light', !isDark);
  /* En modo oscuro se muestra el sol (para volver a claro) y viceversa */
  dom.themeToggle.innerHTML = isDark ? ICONS.sun : ICONS.moon;
  storage.set(CONFIG.storageKeys.theme, theme);
}

function initTheme() {
  const savedTheme = storage.get(CONFIG.storageKeys.theme, null);
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  applyTheme(savedTheme || (prefersDark ? 'dark' : 'light'));

  dom.themeToggle.addEventListener('click', () => {
    applyTheme(document.body.classList.contains('theme-dark') ? 'light' : 'dark');
  });
}

/* ---------- 5. Idioma ---------- */
function applyLanguage(lang) {
  state.lang = TRANSLATIONS[lang] ? lang : CONFIG.defaultLang;
  clearHighlights();

  document.documentElement.lang = state.lang === 'va' ? 'ca-ES-valencia' : state.lang;
  $$('[data-i18n]').forEach((el) => { el.textContent = t(el.dataset.i18n); });
  $$('[data-i18n-placeholder]').forEach((el) => { el.placeholder = t(el.dataset.i18nPlaceholder); });
  $$('.lang-option').forEach((btn) => btn.classList.toggle('is-active', btn.dataset.lang === state.lang));
  dom.langCurrent.textContent = state.lang.toUpperCase();

  storage.set(CONFIG.storageKeys.lang, state.lang);

  /* Volver a pintar los contenidos dinámicos */
  renderProducts();
  renderCart();
  if (dom.checkoutModal.classList.contains('is-open')) renderCheckoutSummary();
}

function initLanguage() {
  applyLanguage(storage.get(CONFIG.storageKeys.lang, CONFIG.defaultLang));
  $$('.lang-option').forEach((btn) => {
    btn.addEventListener('click', () => {
      applyLanguage(btn.dataset.lang);
      closeLangDropdown();
    });
  });
}

/* ---------- 6. Cabecera, scroll y navegación ---------- */
function updateActiveLink() {
  const offset = CONFIG.scrolledHeaderHeight + 120;
  let currentId = 'inicio';
  $$('main section[id]').forEach((section) => {
    if (section.offsetTop - offset <= window.scrollY) currentId = section.id;
  });
  $$('.nav-link, .mobile-link').forEach((link) => {
    link.classList.toggle('is-active', link.getAttribute('href') === `#${currentId}`);
  });
}

function handleScroll() {
  const scrollY = window.scrollY;
  dom.header.classList.toggle('is-scrolled', scrollY > 40);
  dom.backToTop.classList.toggle('is-visible', scrollY > 600);
  updateActiveLink();
}

/* Desplazamiento suave teniendo en cuenta la cabecera fija */
function scrollToElement(target) {
  const offset = target.id === 'inicio' ? 0 : CONFIG.scrolledHeaderHeight;
  const top = target.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top: Math.max(top, 0), behavior: 'smooth' });
}

function initNavigation() {
  document.addEventListener('click', (event) => {
    const link = event.target.closest('a[href^="#"]');
    if (!link) return;
    const hash = link.getAttribute('href');
    const target = hash.length > 1 ? document.querySelector(hash) : null;
    if (!target) return;

    event.preventDefault();
    if (link.dataset.filterLink) setFilter(link.dataset.filterLink);
    closeMobileMenu();
    scrollToElement(target);
    history.replaceState(null, '', hash);
  });

  dom.backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  window.addEventListener('scroll', throttleFrame(handleScroll), { passive: true });
  window.addEventListener('resize', debounce(() => {
    if (window.innerWidth >= CONFIG.desktopBreakpoint) closeMobileMenu();
    closeLangDropdown();
    updateActiveLink();
  }, 150));

  handleScroll();
}

/* ---------- 7. Menú hamburguesa y selector de idioma ---------- */
function openMobileMenu() {
  dom.mobileMenu.classList.add('is-open');
  dom.header.classList.add('menu-open');
  dom.hamburger.classList.add('is-active');
  dom.hamburger.setAttribute('aria-expanded', 'true');
  dom.mobileMenu.setAttribute('aria-hidden', 'false');
}

function closeMobileMenu() {
  dom.mobileMenu.classList.remove('is-open');
  dom.header.classList.remove('menu-open');
  dom.hamburger.classList.remove('is-active');
  dom.hamburger.setAttribute('aria-expanded', 'false');
  dom.mobileMenu.setAttribute('aria-hidden', 'true');
}

function closeLangDropdown() {
  dom.langDropdown.classList.remove('is-open');
  dom.langToggle.setAttribute('aria-expanded', 'false');
}

function initMenus() {
  dom.hamburger.addEventListener('click', () => {
    dom.mobileMenu.classList.contains('is-open') ? closeMobileMenu() : openMobileMenu();
  });

  dom.langToggle.addEventListener('click', (event) => {
    event.stopPropagation();
    const isOpen = dom.langDropdown.classList.toggle('is-open');
    dom.langToggle.setAttribute('aria-expanded', String(isOpen));
  });

  document.addEventListener('click', (event) => {
    if (!dom.langDropdown.contains(event.target)) closeLangDropdown();
  });
}

/* ---------- 8. Sistema de modales ---------- */
const Modal = {
  open(modal) {
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('no-scroll');
    const focusTarget = $('input[type="search"], input[type="text"], input[type="email"], .btn', modal);
    if (focusTarget) setTimeout(() => focusTarget.focus({ preventScroll: true }), 150);
  },
  close(modal) {
    if (!modal) return;
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    if (!$('.modal.is-open') && !dom.cartDrawer.classList.contains('is-open')) {
      document.body.classList.remove('no-scroll');
    }
  }
};

function initModals() {
  document.addEventListener('click', (event) => {
    const closer = event.target.closest('[data-close]');
    if (closer) Modal.close(closer.closest('.modal'));
  });

  document.addEventListener('keydown', (event) => {
    /* Atajo Ctrl/Cmd + K para abrir la búsqueda */
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
      event.preventDefault();
      openSearch();
      return;
    }
    if (event.key !== 'Escape') return;
    const openModals = $$('.modal.is-open');
    if (openModals.length) Modal.close(openModals[openModals.length - 1]);
    else if (dom.cartDrawer.classList.contains('is-open')) closeCart();
    else { closeMobileMenu(); closeLangDropdown(); }
  });

  $('#userToggle').addEventListener('click', () => Modal.open(dom.loginModal));
}

/* ---------- 9. Búsqueda en la página ---------- */
/* Normaliza carácter a carácter (sin tildes, minúsculas) conservando la longitud */
const normalizeText = (str) =>
  str.split('').map((char) => (char.normalize('NFD')[0] || char).toLowerCase().charAt(0) || char).join('');

function clearHighlights() {
  $$('mark.search-highlight').forEach((mark) => {
    const parent = mark.parentNode;
    parent.replaceChild(document.createTextNode(mark.textContent), mark);
    parent.normalize();
  });
}

/* Envuelve en <mark> todas las coincidencias visibles dentro de <main> */
function highlightMatches(query) {
  clearHighlights();
  const needle = normalizeText(query.trim());
  if (needle.length < CONFIG.searchMinChars) return [];

  const walker = document.createTreeWalker($('main'), NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      const parent = node.parentElement;
      if (!node.nodeValue.trim() || !parent || parent.closest('script, style, svg')) return NodeFilter.FILTER_REJECT;
      return parent.offsetParent === null ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT;
    }
  });

  const textNodes = [];
  while (walker.nextNode()) textNodes.push(walker.currentNode);

  const marks = [];
  textNodes.forEach((node) => {
    const text = node.nodeValue;
    const haystack = normalizeText(text);
    let index = haystack.indexOf(needle);
    if (index === -1) return;

    const fragment = document.createDocumentFragment();
    let lastIndex = 0;
    while (index !== -1) {
      fragment.append(text.slice(lastIndex, index));
      const mark = document.createElement('mark');
      mark.className = 'search-highlight';
      mark.textContent = text.slice(index, index + needle.length);
      fragment.append(mark);
      marks.push(mark);
      lastIndex = index + needle.length;
      index = haystack.indexOf(needle, lastIndex);
    }
    fragment.append(text.slice(lastIndex));
    node.parentNode.replaceChild(fragment, node);
  });
  return marks;
}

/* Crea un fragmento de texto con la coincidencia resaltada */
function buildSnippet(mark) {
  const context = mark.parentElement.closest('p, h1, h2, h3, li, label, a, button, span') || mark.parentElement;
  const range = document.createRange();
  range.setStart(context, 0);
  range.setEndBefore(mark);
  const before = range.toString().replace(/\s+/g, ' ');
  const after = context.textContent.replace(/\s+/g, ' ').slice(before.length + mark.textContent.length);
  const trimmedBefore = before.length > 40 ? `…${before.slice(-40)}` : before;
  const trimmedAfter = after.length > 55 ? `${after.slice(0, 55)}…` : after;
  return `${escapeHTML(trimmedBefore)}<b>${escapeHTML(mark.textContent)}</b>${escapeHTML(trimmedAfter)}`;
}

function goToMatch(mark) {
  Modal.close(dom.searchModal);
  $$('mark.search-highlight.is-current').forEach((el) => el.classList.remove('is-current'));
  mark.classList.add('is-current');
  const top = mark.getBoundingClientRect().top + window.scrollY - window.innerHeight / 3;
  window.scrollTo({ top, behavior: 'smooth' });
}

function runSearch() {
  const query = dom.searchInput.value;
  const marks = highlightMatches(query);
  dom.searchResults.innerHTML = '';

  if (query.trim().length < CONFIG.searchMinChars) {
    dom.searchStatus.textContent = t('search.hint');
    return;
  }
  dom.searchStatus.textContent = marks.length
    ? t('search.results', { n: marks.length })
    : t('search.none', { q: query.trim() });

  marks.slice(0, 30).forEach((mark) => {
    const sectionId = mark.closest('section[id]')?.id;
    const item = document.createElement('li');
    const button = document.createElement('button');
    button.className = 'search-result';
    button.innerHTML = `<small>${escapeHTML(t(SECTION_LABELS[sectionId] || 'nav.home'))}</small><span>${buildSnippet(mark)}</span>`;
    button.addEventListener('click', () => goToMatch(mark));
    item.appendChild(button);
    dom.searchResults.appendChild(item);
  });
}

function openSearch() {
  closeMobileMenu();
  Modal.open(dom.searchModal);
}

function initSearch() {
  $('#searchToggle').addEventListener('click', openSearch);
  $('#mobileSearchBtn').addEventListener('click', openSearch);
  dom.searchInput.addEventListener('input', debounce(runSearch, 250));
  dom.searchInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      const firstResult = $('.search-result', dom.searchResults);
      if (firstResult) firstResult.click();
    }
  });
}

/* ---------- 10. Catálogo de productos ---------- */
function getVisibleProducts() {
  return PRODUCTS.filter((product) => {
    if (state.filter === 'all') return true;
    if (state.filter === 'sale') return Boolean(product.oldPrice);
    return product.category === state.filter;
  });
}

function renderProductCard(product, index) {
  const name = escapeHTML(product.name[state.lang]);
  const selectedSize = state.selectedSizes[product.id] || product.sizes[Math.min(1, product.sizes.length - 1)];
  state.selectedSizes[product.id] = selectedSize;

  let badge = '';
  if (product.oldPrice) {
    const discount = Math.round((1 - product.price / product.oldPrice) * 100);
    badge = `<span class="product-card__badge product-card__badge--sale">-${discount}%</span>`;
  } else if (product.isNew) {
    badge = `<span class="product-card__badge">${t('badge.new')}</span>`;
  }

  const price = product.oldPrice
    ? `<span class="is-sale">${formatPrice(product.price)}</span><del>${formatPrice(product.oldPrice)}</del>`
    : `<span>${formatPrice(product.price)}</span>`;

  const sizes = product.sizes.map((size) => `
    <button type="button" class="size-btn ${size === selectedSize ? 'is-selected' : ''}" data-size="${size}" aria-pressed="${size === selectedSize}">${size}</button>`).join('');

  return `
    <article class="product-card" data-id="${product.id}" style="animation-delay:${index * 60}ms">
      <div class="product-card__media">
        <img src="${product.image}" alt="${name}" loading="lazy">
        ${badge}
      </div>
      <div class="product-card__body">
        <span class="product-card__cat">${t(`filter.${product.category}`)}</span>
        <h3 class="product-card__name">${name}</h3>
        <p class="product-card__price">${price}</p>
        <div class="size-selector" role="group" aria-label="${t('shop.size')}">
          <span class="size-selector__label">${t('shop.size')}</span>
          ${sizes}
        </div>
        <button type="button" class="btn btn--primary btn--block" data-add="${product.id}">${t('shop.add')}</button>
      </div>
    </article>`;
}

function renderProducts() {
  dom.productGrid.innerHTML = getVisibleProducts().map(renderProductCard).join('');
}

function setFilter(filter) {
  state.filter = filter;
  $$('.filter-btn').forEach((btn) => btn.classList.toggle('is-active', btn.dataset.filter === filter));
  renderProducts();
}

function initProducts() {
  $$('.filter-btn').forEach((btn) => btn.addEventListener('click', () => setFilter(btn.dataset.filter)));

  /* Delegación de eventos: selección de talla y añadir a la cesta */
  dom.productGrid.addEventListener('click', (event) => {
    const sizeBtn = event.target.closest('.size-btn');
    const addBtn = event.target.closest('[data-add]');

    if (sizeBtn) {
      const card = sizeBtn.closest('.product-card');
      state.selectedSizes[card.dataset.id] = sizeBtn.dataset.size;
      $$('.size-btn', card).forEach((btn) => {
        const isSelected = btn === sizeBtn;
        btn.classList.toggle('is-selected', isSelected);
        btn.setAttribute('aria-pressed', String(isSelected));
      });
    }
    if (addBtn) addToCart(addBtn.dataset.add, state.selectedSizes[addBtn.dataset.add]);
  });
}

/* ---------- 11. Carrito ---------- */
function saveCart() {
  storage.set(CONFIG.storageKeys.cart, state.cart);
}

/* Calcula importes según el método de entrega */
function getCartTotals(deliveryMethod = 'pickup') {
  const subtotal = state.cart.reduce((sum, item) => sum + getProduct(item.id).price * item.qty, 0);
  const count = state.cart.reduce((sum, item) => sum + item.qty, 0);
  const shipping = deliveryMethod === 'shipping' && subtotal > 0 && subtotal < CONFIG.freeShippingThreshold
    ? CONFIG.shippingCost
    : 0;
  return { subtotal, shipping, total: subtotal + shipping, count };
}

function addToCart(id, size) {
  const existing = state.cart.find((item) => item.id === id && item.size === size);
  if (existing) existing.qty += 1;
  else state.cart.push({ id, size, qty: 1 });

  saveCart();
  renderCart();
  dom.cartBadge.classList.remove('bump');
  void dom.cartBadge.offsetWidth; /* reinicia la animación */
  dom.cartBadge.classList.add('bump');
  showToast(t('toast.added', { name: `${getProduct(id).name[state.lang]} (${size})` }));
}

function updateQuantity(id, size, delta) {
  const item = state.cart.find((entry) => entry.id === id && entry.size === size);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) removeFromCart(id, size);
  else { saveCart(); renderCart(); }
}

function removeFromCart(id, size) {
  state.cart = state.cart.filter((item) => !(item.id === id && item.size === size));
  saveCart();
  renderCart();
}

function clearCart() {
  state.cart = [];
  saveCart();
  renderCart();
}

function renderCart() {
  const { subtotal, count } = getCartTotals();

  dom.cartBadge.textContent = count;
  dom.cartBadge.classList.toggle('has-items', count > 0);
  dom.cartFoot.classList.toggle('is-hidden', count === 0);

  if (!count) {
    dom.cartItems.innerHTML = `
      <div class="cart-empty">
        ${ICONS.bag}
        <p>${t('cart.empty')}</p>
        <a href="#tienda" class="btn btn--outline btn--sm" data-close-cart>${t('cart.continue')}</a>
      </div>`;
    return;
  }

  dom.cartItems.innerHTML = state.cart.map((item) => {
    const product = getProduct(item.id);
    const name = escapeHTML(product.name[state.lang]);
    return `
      <div class="cart-item">
        <img src="${product.image}" alt="${name}">
        <div class="cart-item__info">
          <div class="cart-item__top">
            <span class="cart-item__name">${name}</span>
            <strong>${formatPrice(product.price * item.qty)}</strong>
          </div>
          <span class="cart-item__meta">${t('shop.size')}: ${item.size} · ${formatPrice(product.price)}</span>
          <div class="cart-item__bottom">
            <div class="qty">
              <button type="button" data-action="dec" data-id="${item.id}" data-size="${item.size}" aria-label="-">−</button>
              <span>${item.qty}</span>
              <button type="button" data-action="inc" data-id="${item.id}" data-size="${item.size}" aria-label="+">+</button>
            </div>
            <button type="button" class="cart-item__remove" data-action="remove" data-id="${item.id}" data-size="${item.size}">${t('cart.remove')}</button>
          </div>
        </div>
      </div>`;
  }).join('');

  /* Barra de progreso hacia el envío gratuito */
  const remaining = CONFIG.freeShippingThreshold - subtotal;
  const progress = Math.min((subtotal / CONFIG.freeShippingThreshold) * 100, 100);
  dom.freeShip.innerHTML = `
    <span>${remaining > 0 ? t('cart.freeLeft', { amount: formatPrice(remaining) }) : t('cart.free')}</span>
    <div class="free-ship__bar"><i style="width:${progress}%"></i></div>`;
  dom.cartSubtotal.textContent = formatPrice(subtotal);
}

function openCart() {
  closeMobileMenu();
  dom.cartDrawer.classList.add('is-open');
  dom.cartDrawer.setAttribute('aria-hidden', 'false');
  document.body.classList.add('no-scroll');
}

function closeCart() {
  dom.cartDrawer.classList.remove('is-open');
  dom.cartDrawer.setAttribute('aria-hidden', 'true');
  if (!$('.modal.is-open')) document.body.classList.remove('no-scroll');
}

function initCart() {
  $('#cartToggle').addEventListener('click', openCart);

  document.addEventListener('click', (event) => {
    if (event.target.closest('[data-close-cart]')) closeCart();
  });

  dom.cartItems.addEventListener('click', (event) => {
    const button = event.target.closest('[data-action]');
    if (!button) return;
    const { action, id, size } = button.dataset;
    if (action === 'inc') updateQuantity(id, size, 1);
    if (action === 'dec') updateQuantity(id, size, -1);
    if (action === 'remove') removeFromCart(id, size);
  });

  $('#clearCartBtn').addEventListener('click', () => {
    clearCart();
    showToast(t('cart.cleared'));
  });

  $('#checkoutBtn').addEventListener('click', openCheckout);
}

/* ---------- 12. Checkout, pago y confirmación ---------- */
const getTodayISO = () => {
  const now = new Date();
  now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
  return now.toISOString().slice(0, 10);
};

const formatDate = (isoDate) =>
  new Date(`${isoDate}T00:00:00`).toLocaleDateString(LOCALES[state.lang], { weekday: 'short', day: 'numeric', month: 'short' });

const getDeliveryMethod = () => dom.checkoutForm.elements.delivery.value;

/* Muestra campos y métodos de pago según el tipo de entrega */
function updateDeliveryUI() {
  const method = getDeliveryMethod();
  $('#pickupFields').classList.toggle('is-hidden', method !== 'pickup');
  $('#shippingFields').classList.toggle('is-hidden', method !== 'shipping');

  $$('[data-pay-for]').forEach((card) => {
    card.classList.toggle('is-hidden', !['all', method].includes(card.dataset.payFor));
  });

  /* Si el pago seleccionado ya no está disponible, se elige el primero visible */
  const checked = $('input[name="payment"]:checked', dom.checkoutForm);
  if (!checked || checked.closest('.option-card').classList.contains('is-hidden')) {
    $('[data-pay-for]:not(.is-hidden) input', dom.checkoutForm).checked = true;
  }
  renderCheckoutSummary();
}

function renderCheckoutSummary() {
  const totals = getCartTotals(getDeliveryMethod());
  dom.checkoutItems.innerHTML = state.cart.map((item) => {
    const product = getProduct(item.id);
    const name = escapeHTML(product.name[state.lang]);
    return `
      <li class="summary-item">
        <img src="${product.image}" alt="${name}">
        <div>${name}<small>${t('shop.size')}: ${item.size} · x${item.qty}</small></div>
        <span>${formatPrice(product.price * item.qty)}</span>
      </li>`;
  }).join('');
  $('#coSubtotal').textContent = formatPrice(totals.subtotal);
  $('#coShipping').textContent = totals.shipping ? formatPrice(totals.shipping) : t('co.free');
  $('#coTotal').textContent = formatPrice(totals.total);
}

function openCheckout() {
  if (!state.cart.length) return;
  closeCart();
  const dateInput = $('#pickupDate');
  dateInput.min = getTodayISO();
  if (!dateInput.value) dateInput.value = getTodayISO();
  dom.checkoutFeedback.textContent = '';
  updateDeliveryUI();
  Modal.open(dom.checkoutModal);
}

/* Valida los campos requeridos según el método de entrega */
function validateCheckout() {
  const fields = dom.checkoutForm.elements;
  const method = getDeliveryMethod();
  const required = ['fullName', 'phone', 'email'];
  if (method === 'pickup') required.push('pickupDate');
  else required.push('address', 'city', 'zip');

  let isValid = true;
  required.forEach((name) => {
    const input = fields[name];
    let fieldValid = input.value.trim() !== '';
    if (name === 'email') fieldValid = isValidEmail(input.value.trim());
    if (name === 'zip') fieldValid = /^\d{5}$/.test(input.value.trim());
    if (name === 'phone') fieldValid = input.value.replace(/\D/g, '').length >= 9;
    input.classList.toggle('is-invalid', !fieldValid);
    if (!fieldValid) isValid = false;
  });
  return isValid;
}

const generateOrderId = () => `VS-${Date.now().toString(36).toUpperCase().slice(-6)}`;

/* Construye el objeto pedido con todos los datos necesarios */
function buildOrder() {
  const fields = dom.checkoutForm.elements;
  const method = getDeliveryMethod();
  const delivery = method === 'pickup'
    ? { method, store: fields.store.value, pickupDate: fields.pickupDate.value }
    : { method, address: fields.address.value.trim(), city: fields.city.value.trim(), zip: fields.zip.value.trim() };
  const payment = fields.payment.value;

  return {
    id: generateOrderId(),
    createdAt: new Date().toISOString(),
    status: payment === 'online' ? 'pending_payment' : 'reserved',
    customer: { name: fields.fullName.value.trim(), email: fields.email.value.trim(), phone: fields.phone.value.trim() },
    delivery,
    payment,
    items: state.cart.map((item) => {
      const product = getProduct(item.id);
      return { id: item.id, name: product.name.es, size: item.size, qty: item.qty, unitPrice: product.price };
    }),
    totals: getCartTotals(method)
  };
}

function saveOrder(order) {
  const orders = storage.get(CONFIG.storageKeys.orders, []);
  orders.push(order);
  storage.set(CONFIG.storageKeys.orders, orders);
}

function describeDelivery(delivery) {
  return delivery.method === 'pickup'
    ? t('co.pickupAt', { store: STORES[delivery.store], date: formatDate(delivery.pickupDate) })
    : t('co.shipTo', { address: `${delivery.address}, ${delivery.zip} ${delivery.city}` });
}

/* Ventana previa a la pasarela: muestra lo que se va a pagar */
function openPaymentWindow(order) {
  state.pendingOrder = order;
  $('#payOrderId').textContent = order.id;
  $('#payCustomer').textContent = order.customer.name;
  $('#payDelivery').textContent = describeDelivery(order.delivery);
  $('#paySubtotal').textContent = formatPrice(order.totals.subtotal);
  $('#payShipping').textContent = order.totals.shipping ? formatPrice(order.totals.shipping) : t('co.free');
  $('#payTotal').textContent = formatPrice(order.totals.total);
  Modal.open(dom.paymentModal);
}

/**
 * Punto de integración con la pasarela de pago.
 * Recibe el pedido completo (importe en order.totals.total).
 * Se emite el evento "vesta:payment-request" para conectar la pasarela real
 * y, tras el pago correcto, vaciar la cesta con clearCart().
 */
function redirectToPaymentGateway(order) {
  showToast(t('pay.redirect'));
  document.dispatchEvent(new CustomEvent('vesta:payment-request', { detail: order }));
}

/* Confirmación de reserva (pago en tienda o contra reembolso) */
function showConfirmation(order) {
  $('#confirmMessage').textContent = order.payment === 'store' ? t('ok.pickup') : t('ok.cod');
  $('#confirmOrderId').textContent = order.id;
  clearCart();
  Modal.open(dom.confirmModal);
}

function initCheckout() {
  $$('input[name="delivery"]', dom.checkoutForm).forEach((radio) => radio.addEventListener('change', updateDeliveryUI));

  dom.checkoutForm.addEventListener('input', (event) => event.target.classList.remove('is-invalid'));

  dom.checkoutForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!validateCheckout()) {
      dom.checkoutFeedback.textContent = t('form.error');
      dom.checkoutFeedback.className = 'form-feedback is-error';
      return;
    }
    const order = buildOrder();
    saveOrder(order);
    Modal.close(dom.checkoutModal);
    if (order.payment === 'online') openPaymentWindow(order);
    else showConfirmation(order);
  });

  $('#goToGatewayBtn').addEventListener('click', () => {
    if (state.pendingOrder) redirectToPaymentGateway(state.pendingOrder);
  });
}

/* ---------- 13. Formularios ---------- */
function initForms() {
  /* Contacto */
  const contactForm = $('#contactForm');
  const feedback = $('#contactFeedback');
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const { name, email, message, privacy } = contactForm.elements;
    const checks = [
      [name, name.value.trim() !== ''],
      [email, isValidEmail(email.value.trim())],
      [message, message.value.trim() !== '']
    ];
    checks.forEach(([input, valid]) => input.classList.toggle('is-invalid', !valid));
    const isValid = checks.every(([, valid]) => valid) && privacy.checked;

    feedback.textContent = isValid ? t('form.success') : t('form.error');
    feedback.className = `form-feedback ${isValid ? 'is-success' : 'is-error'}`;
    if (isValid) contactForm.reset();
  });
  contactForm.addEventListener('input', (event) => event.target.classList.remove('is-invalid'));

  /* Newsletter */
  const newsletterForm = $('#newsletterForm');
  newsletterForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const input = $('input', newsletterForm);
    if (!isValidEmail(input.value.trim())) { input.focus(); return; }
    showToast(t('toast.newsletter'));
    newsletterForm.reset();
  });

  /* Login (preparado para el sistema de acceso) */
  $('#loginForm').addEventListener('submit', (event) => {
    event.preventDefault();
    showToast(t('login.note'));
  });
  $('#registerLink').addEventListener('click', (event) => {
    event.preventDefault();
    showToast(t('login.note'));
  });
}

/* ---------- 14. Información legal y cookies ---------- */
function initInfoAndCookies() {
  document.addEventListener('click', (event) => {
    const trigger = event.target.closest('[data-info]');
    if (!trigger) return;
    const key = trigger.dataset.info;
    $('#infoTitle').textContent = t(`info.${key}.title`);
    $('#infoContent').innerHTML = t(`info.${key}.body`);
    Modal.open(dom.infoModal);
  });

  if (!storage.get(CONFIG.storageKeys.cookies, false)) {
    setTimeout(() => dom.cookieBanner.classList.add('is-visible'), 1200);
  }
  $('#acceptCookies').addEventListener('click', () => {
    storage.set(CONFIG.storageKeys.cookies, true);
    dom.cookieBanner.classList.remove('is-visible');
  });
}

/* ---------- 15. Animaciones ---------- */
function animateCounter(element) {
  const target = Number(element.dataset.count);
  const suffix = element.dataset.suffix || '';
  const duration = 1600;
  const start = performance.now();

  const step = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    element.textContent = Math.round(target * eased).toLocaleString(LOCALES[state.lang]) + suffix;
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

function initRevealAnimations() {
  const revealItems = $$('.reveal');
  const counters = $$('[data-count]');

  if (!('IntersectionObserver' in window)) {
    revealItems.forEach((el) => el.classList.add('is-visible'));
    counters.forEach(animateCounter);
    return;
  }

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  revealItems.forEach((el) => revealObserver.observe(el));

  const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      animateCounter(entry.target);
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.6 });
  counters.forEach((el) => counterObserver.observe(el));
}

/* Pausa el vídeo del hero si el usuario prefiere menos movimiento */
function initHeroVideo() {
  const video = $('.hero__video');
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) video.pause();
}

/* ---------- 16. Inicialización ---------- */
function init() {
  $('#currentYear').textContent = new Date().getFullYear();
  initTheme();
  initMenus();
  initModals();
  initProducts();
  initCart();
  initLanguage();
  initNavigation();
  initSearch();
  initCheckout();
  initForms();
  initInfoAndCookies();
  initRevealAnimations();
  initHeroVideo();
}

document.addEventListener('DOMContentLoaded', init);
