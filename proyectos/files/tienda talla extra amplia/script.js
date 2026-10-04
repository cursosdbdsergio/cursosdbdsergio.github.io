/* ═══════════════════════════════════════════════════════════════
   ÀMPLIA · Moda de tallas grandes — script.js
   JavaScript puro, sin librerías ni dependencias externas.

   Índice:
    1. Utilidades                    8. Tienda: catálogo y filtros
    2. Diccionario de idiomas        9. Vista rápida de producto
    3. Catálogo de productos        10. Carrito de compra y checkout
    4. Tema claro / oscuro          11. Pasarela de pago
    5. Idioma (ES / EN / VA)        12. Buscador con resaltado
    6. Header, scroll y reveal      13. Formularios, cookies y avisos
    7. Menú móvil                   14. Arranque
   ═══════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ══════════ 1. UTILIDADES ══════════ */
  var $ = function (sel, ctx) { return (ctx || document).querySelector(sel); };
  var $$ = function (sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); };

  /** Estado global de la aplicación */
  var state = {
    lang: localStorage.getItem('ampia_lang') || 'es',
    theme: localStorage.getItem('ampia_theme') || 'light',
    cart: JSON.parse(localStorage.getItem('ampia_cart') || '[]'),
    wishlist: JSON.parse(localStorage.getItem('ampia_wish') || '[]'),
    coupon: null,
    delivery: 'pickup',
    shipMethod: 'standard',
    payment: 'pickup',
    step: 1,
    filters: { cat: 'all', size: 'all', sort: 'featured' },
    searchTerm: '',
    review: 0,
    user: JSON.parse(localStorage.getItem('ampia_user') || 'null')
  };

  var SIZES = ['44', '46', '48', '50', '52', '54', '56', '58', '60', '62', '64', '66'];
  var FREE_SHIPPING_FROM = 60;
  var SHIP_STD = 4.95;
  var SHIP_EXP = 9.95;
  var COD_FEE = 2.50;
  var VAT = 0.21;
  var COUPONS = { 'AMPLIA10': 0.10, 'ÀMPLIA10': 0.10, 'ENVIOGRATIS': 'freeship' };
  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /** Traducción de una clave con interpolación de variables {n} */
  function t(key, vars) {
    var dict = I18N[state.lang] || I18N.es;
    var str = dict[key] !== undefined ? dict[key] : (I18N.es[key] !== undefined ? I18N.es[key] : key);
    if (vars) {
      Object.keys(vars).forEach(function (k) {
        str = str.replace(new RegExp('\\{' + k + '\\}', 'g'), vars[k]);
      });
    }
    return str;
  }

  /** Formato de moneda en euros según idioma */
  function money(n) {
    var loc = state.lang === 'en' ? 'en-GB' : 'es-ES';
    try {
      return new Intl.NumberFormat(loc, { style: 'currency', currency: 'EUR' }).format(n);
    } catch (e) {
      return n.toFixed(2).replace('.', ',') + ' €';
    }
  }

  function esc(str) {
    return String(str).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function debounce(fn, wait) {
    var timer;
    return function () {
      var args = arguments, ctx = this;
      clearTimeout(timer);
      timer = setTimeout(function () { fn.apply(ctx, args); }, wait);
    };
  }

  function save(key, value) { localStorage.setItem(key, JSON.stringify(value)); }

  /* ══════════ 2. DICCIONARIO DE IDIOMAS ══════════
     Estructura preparada para ampliar textos sin traducción automática. */
  var I18N = {
    es: {
      'logo.tag': 'moda en tallas grandes',
      'topbar.market': 'Mercado de Colón · Valencia',
      'topbar.free': 'Envío gratis desde 60 €',
      'topbar.returns': 'Cambios y devoluciones 30 días',
      'nav.home': 'Inicio', 'nav.shop': 'Colección', 'nav.about': 'Nosotras', 'nav.sizes': 'Tallas',
      'nav.lookbook': 'Lookbook', 'nav.reviews': 'Opiniones', 'nav.contact': 'Contacto',
      'action.search': 'Buscar en la página', 'action.account': 'Mi cuenta', 'action.theme': 'Cambiar modo claro u oscuro', 'action.cart': 'Abrir carrito',
      'mobile.search': 'Buscar en la página', 'mobile.lang': 'Idioma',
      'hero.eyebrow': 'Nueva colección · Tallas 44 a 66',
      'hero.title1': 'Ropa que sienta bien', 'hero.title2': 'en cada talla',
      'hero.text': 'Diseñamos y patronamos desde la talla 44 hasta la 66 sobre cuerpos reales. Nada de escalados imposibles: cada prenda se vuelve a dibujar para que caiga donde tiene que caer.',
      'hero.ctaShop': 'Ver la colección', 'hero.ctaSizes': 'Encuentra tu talla',
      'hero.stat1': 'tallas europeas', 'hero.stat2': 'clientas vestidas', 'hero.stat3': 'valoración media',
      'hero.cardTag': 'Destacado de la semana', 'hero.cardCta': 'Ver prenda', 'hero.scroll': 'Descubre',
      'about.eyebrow': 'Nuestra forma de trabajar', 'about.title': 'Moda grande, bien hecha',
      'about.lead': 'No hacemos «tallas especiales»: hacemos ropa. Solo que nuestra tabla de medidas empieza donde la de casi todas termina.',
      'about.badge': 'años vistiendo cuerpos reales',
      'about.p1t': 'Patronaje propio desde cero', 'about.p1d': 'Cada modelo se dibuja de nuevo en talla base 50 y se ajusta en probador con clientas reales antes de producirse.',
      'about.p2t': 'Tejidos que acompañan', 'about.p2d': 'Algodón peinado, viscosa fluida y elastano recuperable: caen, no se clavan y aguantan lavados.',
      'about.p3t': 'Recogida en el mercado', 'about.p3d': 'Reserva online y recoge en nuestro puesto del Mercado de Colón, con probador amplio y asesoría incluida.',
      'about.p4t': 'Cambio de talla sin drama', 'about.p4d': 'Si no aciertas con la talla, cambiamos la prenda en 30 días y pagamos nosotros la recogida.',
      'about.quote': '«Probarme un vestido aquí y que cierre bien por la espalda fue la primera vez en veinte años.»',
      'about.quoteRole': 'clienta desde 2019 · talla 54',
      'about.servicesTitle': 'Servicios en tienda y online',
      'about.s1': 'Asesoría de talla presencial y por videollamada', 'about.s2': 'Arreglos de bajo y pinzas gratuitos en prendas de fiesta',
      'about.s3': 'Reserva de prenda 48 h en el puesto del mercado', 'about.s4': 'Pedido a medida para eventos (bodas, comuniones)', 'about.s5': 'Envío a toda España en 24/72 h',
      'shop.eyebrow': 'Comprar online', 'shop.title': 'La colección',
      'shop.lead': 'Reserva para recoger en el mercado o recíbelo en tu dirección. Elige cuándo pagar.',
      'shop.sizeLabel': 'Talla', 'shop.sortLabel': 'Ordenar',
      'shop.sortFeatured': 'Destacados', 'shop.sortAsc': 'Precio: menor a mayor', 'shop.sortDesc': 'Precio: mayor a menor', 'shop.sortName': 'Nombre A–Z',
      'shop.note': '¿No encuentras tu talla o tu color? Escríbenos: fabricamos series cortas y podemos encargarla para ti.',
      'shop.all': 'Todo', 'shop.cat.dresses': 'Vestidos', 'shop.cat.blouses': 'Blusas', 'shop.cat.pants': 'Pantalones',
      'shop.cat.outerwear': 'Abrigos', 'shop.cat.knit': 'Punto',
      'shop.sizeAll': 'Todas las tallas', 'shop.results': '{n} prendas disponibles', 'shop.resultsOne': '1 prenda disponible',
      'shop.add': 'Añadir a la cesta', 'shop.quick': 'Vista rápida', 'shop.sale': 'Rebajado', 'shop.new': 'Novedad', 'shop.top': 'Top ventas',
      'shop.needSize': 'Elige tu talla antes de añadir la prenda', 'shop.added': '{name} (talla {size}) añadido a la cesta',
      'shop.wishOn': 'Guardado en favoritos', 'shop.wishOff': 'Quitado de favoritos',
      'sizes.eyebrow': 'Guía de tallas', 'sizes.title': 'Acertar a la primera',
      'sizes.lead': 'Nuestras tallas son europeas y reales. Mide contorno de pecho, cintura y cadera con una cinta métrica sobre ropa interior y compara con la tabla.',
      'sizes.tableCaption': 'Tabla de medidas por talla',
      'sizes.colSize': 'Talla', 'sizes.colChest': 'Pecho (cm)', 'sizes.colWaist': 'Cintura (cm)', 'sizes.colHip': 'Cadera (cm)', 'sizes.colEq': 'Equiv.',
      'sizes.step1t': 'Pecho', 'sizes.step1d': 'Por la parte más plena, sin apretar.',
      'sizes.step2t': 'Cintura', 'sizes.step2d': 'En el pliegue natural del torso.',
      'sizes.step3t': 'Cadera', 'sizes.step3d': 'De pie, por la parte más ancha.',
      'sizes.adviceTitle': 'Asesoría personal gratuita',
      'sizes.adviceText': '30 minutos con una estilista especializada en tallas grandes, en tienda o por videollamada. Te montamos tres looks completos con tu presupuesto.',
      'sizes.a1': 'Lunes a sábado, con cita previa', 'sizes.a2': 'Probador amplio y accesible', 'sizes.a3': 'Te guardamos las prendas 48 h',
      'sizes.adviceCta': 'Reservar cita', 'sizes.mini': 'de los pedidos online aciertan con la talla a la primera gracias a la guía.',
      'sizes.returnsTitle': 'Cambios fáciles', 'sizes.returnsText': '30 días para cambiar talla o color. Recogemos en tu casa o lo traes al mercado.',
      'look.eyebrow': 'Lookbook otoño–invierno', 'look.title': 'Vestidas de verdad',
      'look.lead': 'Fotos sin retoques de cuerpo, hechas en Valencia con clientas y amigas de la casa.',
      'look.item1': 'Abrigo + vestido de punto', 'look.item2': 'Total look de lino', 'look.item3': 'Sastre fluido dos piezas', 'look.item4': 'Invitada · vestido midi', 'look.item5': 'Negro de diario',
      'rev.eyebrow': 'Opiniones verificadas', 'rev.title': 'Lo que dicen en el probador',
      'contact.eyebrow': 'Hablemos', 'contact.title': 'Escríbenos o pásate por el mercado',
      'contact.lead': 'Respondemos en menos de 24 h laborables. También puedes reservar tu asesoría o pedir una prenda por encargo.',
      'contact.addrT': 'Tienda', 'contact.addrD': 'Mercado de Colón, puesto 27 · 46004 Valencia',
      'contact.hoursT': 'Horario', 'contact.hoursD': 'L–S 10:00–20:30 · D 11:00–14:00',
      'contact.phoneT': 'Teléfono y WhatsApp',
      'contact.formTitle': 'Formulario de contacto', 'contact.name': 'Nombre', 'contact.namePh': 'Tu nombre',
      'contact.email': 'Email', 'contact.phone': 'Teléfono', 'contact.subject': 'Motivo',
      'contact.subj1': 'Asesoría de talla', 'contact.subj2': 'Pedido por encargo', 'contact.subj3': 'Cambio o devolución', 'contact.subj4': 'Otra consulta',
      'contact.message': 'Mensaje', 'contact.messagePh': 'Cuéntanos qué necesitas…',
      'contact.privacy': 'He leído y acepto la política de privacidad.', 'contact.submit': 'Enviar mensaje',
      'contact.ok': '¡Gracias! Te respondemos en menos de 24 h laborables.',
      'footer.about': 'Tienda de moda femenina y masculina en tallas 44–66. Diseño propio, patronaje real y venta online con recogida en el Mercado de Colón de Valencia.',
      'footer.newsLabel': 'Email para el boletín', 'footer.newsPh': 'Tu email', 'footer.newsBtn': 'Apúntame',
      'footer.newsOk': 'Listo, te avisaremos de las novedades.', 'footer.newsErr': 'Introduce un email válido.',
      'footer.colShop': 'Tienda', 'footer.l1': 'Vestidos', 'footer.l2': 'Blusas y camisas', 'footer.l3': 'Pantalones',
      'footer.l4': 'Abrigos', 'footer.l5': 'Punto y camisetas', 'footer.l6': 'Novedades',
      'footer.colHelp': 'Ayuda y requisitos', 'footer.h1': 'Guía de tallas y medidas', 'footer.h2': 'Política de cookies', 'footer.h3': 'Requisitos de compra',
      'footer.h4': 'Envíos, cambios y devoluciones', 'footer.h5': 'Privacidad y aviso legal', 'footer.h6': 'Accesibilidad',
      'footer.colContact': 'Contacto', 'footer.hours': 'L–S 10:00–20:30 · D 11:00–14:00',
      'footer.rights': 'Todos los derechos reservados', 'footer.cookies': 'Política de cookies', 'footer.legal': 'Aviso legal', 'footer.privacy': 'Privacidad',
      'search.ph': 'Buscar tallas, vestidos, envíos…',
      'search.hint': 'Escribe al menos 2 letras. Buscaremos en toda la página y marcaremos las coincidencias.',
      'search.clear': 'Quitar resaltados', 'search.resultsFor': '{n} coincidencias para «{q}»',
      'search.resultsOne': '1 coincidencia para «{q}»', 'search.none': 'Sin resultados para «{q}». Prueba con «talla», «envío» o «vestido».',
      'search.hitsPill': '{n} coincidencias resaltadas en la página', 'search.marksCleared': 'Resaltados eliminados',
      'cart.title': 'Tu cesta', 'cart.step1': 'Cesta', 'cart.step2': 'Entrega', 'cart.step3': 'Pago', 'cart.step4': 'Listo',
      'cart.stepLabel1': 'Revisa tu selección', 'cart.stepLabel2': '¿Recogida o envío a casa?',
      'cart.stepLabel3': 'Elige cómo pagar', 'cart.stepLabel4': 'Pedido confirmado',
      'cart.empty': 'Tu cesta está vacía.', 'cart.emptyCta': 'Ver la colección',
      'cart.coupon': 'Código de descuento', 'cart.couponBtn': 'Aplicar',
      'cart.couponOk': 'Código {code} aplicado: {val}', 'cart.couponErr': 'Código no válido o caducado.',
      'cart.pickup': 'Recoger en el mercado', 'cart.pickupD': 'Gratis · listo en 2 h · Mercado de Colón, puesto 27',
      'cart.shipping': 'Envío a mi dirección', 'cart.shippingD': '4,95 € · gratis desde 60 € · 24/72 h',
      'cart.store': 'Punto de recogida', 'cart.pickupDate': 'Día de recogida', 'cart.pickupSlot': 'Franja horaria',
      'cart.whoPickup': 'Quién recoge', 'cart.whoPickupPh': 'Nombre de la persona',
      'cart.name': 'Nombre', 'cart.namePh': 'Nombre', 'cart.surname': 'Apellidos', 'cart.surnamePh': 'Apellidos',
      'cart.address': 'Dirección', 'cart.addressPh': 'Calle, número, piso', 'cart.zip': 'Código postal',
      'cart.city': 'Ciudad', 'cart.cityPh': 'Valencia', 'cart.province': 'Provincia', 'cart.provincePh': 'Valencia',
      'cart.phone': 'Teléfono de contacto', 'cart.shipMethod': 'Velocidad de envío',
      'cart.shipStd': 'Estándar 48/72 h — 4,95 € (gratis desde 60 €)', 'cart.shipExp': 'Exprés 24 h — 9,95 €',
      'cart.notes': 'Notas para la entrega', 'cart.notesPh': 'Portero, horario preferido…',
      'cart.payHint': 'Elige cómo y cuándo quieres pagar.',
      'cart.payPickup': 'Pagar al recoger en el mercado', 'cart.payPickupD': 'Efectivo o tarjeta en el puesto. Sin recargo.',
      'cart.payDelivery': 'Pagar cuando me lo entreguen', 'cart.payDeliveryD': 'Contra reembolso: +2,50 € de gestión.',
      'cart.payGateway': 'Pagar ahora con la pasarela del mercado', 'cart.payGatewayD': 'Se abrirá una ventana con el importe exacto antes de pagar.',
      'cart.email': 'Email para el comprobante',
      'cart.terms': 'Acepto los requisitos de compra, la política de devoluciones y la de privacidad.',
      'cart.back': 'Atrás', 'cart.continue': 'Continuar', 'cart.toPayment': 'Continuar al pago',
      'cart.confirmOrder': 'Confirmar pedido', 'cart.reserve': 'Reservar y recoger en tienda',
      'cart.keepShopping': 'Seguir comprando',
      'cart.subtotal': 'Subtotal ({n} artículos)', 'cart.discount': 'Descuento {code}', 'cart.shippingCost': 'Envío',
      'cart.surcharge': 'Gestión contra reembolso', 'cart.total': 'Total', 'cart.vatIncluded': 'IVA (21 %) incluido: {vat}',
      'cart.free': 'Gratis', 'cart.clear': 'Vaciar cesta', 'cart.cleared': 'Cesta vaciada',
      'cart.removed': 'Artículo eliminado', 'cart.remove': 'Eliminar', 'cart.size': 'Talla', 'cart.qty': 'Cantidad',
      'cart.doneTitle': '¡Pedido confirmado!', 'cart.donePickupTitle': '¡Reserva confirmada!',
      'cart.doneText': 'Te hemos enviado el comprobante a {email}.',
      'cart.orderNum': 'Número de pedido', 'cart.delivery': 'Entrega', 'cart.payment': 'Pago', 'cart.amount': 'Importe',
      'cart.pickupSummary': 'Recogida: {store} · {date} ({slot})', 'cart.shipSummary': 'Envío a {address}, {zip} {city}',
      'cart.payPickupSummary': 'Pago al recoger en tienda', 'cart.payCodSummary': 'Pago a la entrega (contra reembolso)',
      'cart.payGatewaySummary': 'Pagado online con la pasarela del mercado',
      'cart.pending': 'Pendiente de pago', 'cart.paid': 'Pagado',
      'cart.doneThanks': 'Gracias por apoyar el comercio del mercado.',
      'err.required': 'Este campo es obligatorio.', 'err.email': 'Introduce un email válido.',
      'err.zip': 'Código postal de 5 dígitos.', 'err.phone': 'Introduce un teléfono válido.',
      'err.terms': 'Debes aceptar las condiciones para continuar.', 'err.size': 'Selecciona una talla.',
      'pay.title': 'Pasarela de pago del mercado', 'pay.sub': 'Revisa el importe antes de continuar. Pago seguro cifrado.',
      'pay.total': 'Importe a pagar ahora', 'pay.card': 'Tarjeta', 'pay.cardNumber': 'Número de tarjeta', 'pay.cardExp': 'Caducidad',
      'pay.note': 'Aquí se integrará la pasarela de pago del mercado (TPV virtual). Esta pantalla muestra exactamente lo que se va a cobrar.',
      'pay.cancel': 'Cancelar', 'pay.confirm': 'Pagar ahora', 'pay.processing': 'Procesando pago…',
      'pay.success': 'Pago realizado correctamente', 'pay.items': 'Artículos', 'pay.vatRow': 'IVA incluido (21 %)',
      'auth.login': 'Entrar', 'auth.register': 'Crear cuenta', 'auth.title': 'Mi cuenta ÀMPLIA',
      'auth.sub': 'Guarda tus tallas, sigue tus pedidos y reserva cita de asesoría.',
      'auth.name': 'Nombre', 'auth.namePh': 'Nombre y apellidos', 'auth.email': 'Email', 'auth.pass': 'Contraseña',
      'auth.remember': 'Mantener la sesión iniciada', 'auth.submit': 'Entrar', 'auth.submitReg': 'Crear mi cuenta',
      'auth.note': 'Sistema de acceso preparado: conecta aquí tu backend de autenticación.',
      'auth.okLogin': 'Sesión iniciada como {email}.', 'auth.okRegister': 'Cuenta creada. Bienvenida a ÀMPLIA.',
      'auth.hello': 'Hola de nuevo, {name}',
      'cookies.title': 'Política de cookies',
      'cookies.intro': 'Usamos cookies propias y de terceros para que la tienda funcione, para medir el uso y para mostrarte contenido útil. Puedes aceptarlas todas, rechazarlas o configurarlas.',
      'cookies.nec': 'Necesarias', 'cookies.necD': 'Cesta de la compra, idioma, tema claro/oscuro y sesión. Siempre activas.',
      'cookies.pref': 'Preferencias', 'cookies.prefD': 'Recuerdan tus tallas habituales y productos favoritos.',
      'cookies.anal': 'Analíticas', 'cookies.analD': 'Estadísticas anónimas de navegación para mejorar la tienda.',
      'cookies.mkt': 'Publicitarias', 'cookies.mktD': 'Muestran campañas de productos que has visitado.',
      'cookies.reject': 'Rechazar opcionales', 'cookies.save': 'Guardar configuración', 'cookies.accept': 'Aceptar',
      'cookies.config': 'Configurar', 'cookies.saved': 'Preferencias de cookies guardadas.',
      'cookies.bannerT': 'Usamos cookies', 'cookies.bannerD': 'para que la cesta funcione y para mejorar la tienda. Puedes aceptarlas, rechazarlas o leer la política.',
      'legal.title': 'Requisitos de compra',
      'legal.h1': '1. Condiciones generales', 'legal.p1': 'Los precios incluyen IVA (21 %). El pedido se confirma al finalizar el proceso de pago o al reservarlo para recogida. Guardamos la reserva 48 horas laborables.',
      'legal.h2': '2. Envíos y plazos', 'legal.p2': 'Envío estándar 48/72 h — 4,95 € (gratis desde 60 €). Envío exprés 24 h — 9,95 €. Recogida en mercado gratuita, lista en 2 horas dentro del horario comercial.',
      'legal.h3': '3. Cambios y devoluciones', 'legal.p3': 'Dispones de 30 días naturales. El cambio de talla es gratuito: recogemos la prenda y enviamos la nueva. La devolución se abona al método de pago original en 5–7 días.',
      'legal.h4': '4. Métodos de pago', 'legal.p4': 'Puedes pagar al recoger en el mercado, en el momento de la entrega (contra reembolso, +2,50 €) o por adelantado con la pasarela de pago del mercado. En los dos primeros casos la prenda queda reservada a tu nombre.',
      'legal.h5': '5. Requisitos técnicos', 'legal.p5': 'La tienda funciona en cualquier navegador moderno, con o sin JavaScript para la lectura de contenidos. No se requieren cuentas de terceros para comprar como invitada.',
      'legal.h6': '6. Datos y privacidad', 'legal.p6': 'Tratamos tus datos para gestionar el pedido y la atención al cliente. Puedes ejercer tus derechos de acceso, rectificación y supresión escribiendo a hola@ampia.es.',
      'legal.close': 'Entendido',
      'theme.toDark': 'Modo oscuro activado', 'theme.toLight': 'Modo claro activado',
      'quick.add': 'Añadir a la cesta', 'quick.qty': 'Cantidad', 'quick.size': 'Talla',
      'quick.m1': 'Envío gratis desde 60 € o recogida gratuita en el mercado',
      'quick.m2': 'Cambio de talla gratuito durante 30 días',
      'quick.m3': 'Paga al recoger, en la entrega u online',
      'quick.colors': 'Colores disponibles', 'quick.fabric': 'Composición', 'quick.ref': 'Referencia'
    },

    en: {
      'logo.tag': 'plus size fashion',
      'topbar.market': 'Colón Market · Valencia',
      'topbar.free': 'Free shipping over €60',
      'topbar.returns': '30-day exchanges and returns',
      'nav.home': 'Home', 'nav.shop': 'Collection', 'nav.about': 'About us', 'nav.sizes': 'Sizes',
      'nav.lookbook': 'Lookbook', 'nav.reviews': 'Reviews', 'nav.contact': 'Contact',
      'action.search': 'Search this page', 'action.account': 'My account', 'action.theme': 'Switch light or dark mode', 'action.cart': 'Open cart',
      'mobile.search': 'Search this page', 'mobile.lang': 'Language',
      'hero.eyebrow': 'New collection · Sizes 44 to 66',
      'hero.title1': 'Clothes that fit', 'hero.title2': 'every single size',
      'hero.text': 'We design and draft patterns from size 44 to 66 on real bodies. No impossible grading: every garment is redrawn so it falls exactly where it should.',
      'hero.ctaShop': 'Shop the collection', 'hero.ctaSizes': 'Find your size',
      'hero.stat1': 'european sizes', 'hero.stat2': 'customers dressed', 'hero.stat3': 'average rating',
      'hero.cardTag': 'Pick of the week', 'hero.cardCta': 'View item', 'hero.scroll': 'Scroll',
      'about.eyebrow': 'How we work', 'about.title': 'Plus size fashion, properly made',
      'about.lead': 'We do not make “special sizes”: we make clothes. Our size chart simply starts where most others stop.',
      'about.badge': 'years dressing real bodies',
      'about.p1t': 'In-house pattern making', 'about.p1d': 'Every style is redrafted from a base size 50 and fitted on real customers before production.',
      'about.p2t': 'Fabrics that move with you', 'about.p2d': 'Combed cotton, fluid viscose and recovery elastane: they drape, never dig in, and survive the wash.',
      'about.p3t': 'Market pick-up', 'about.p3d': 'Order online and collect at our stall in Colón Market, with a spacious fitting room and free styling advice.',
      'about.p4t': 'Easy size exchange', 'about.p4d': 'If the size is not right, we exchange it within 30 days and we pay for the collection.',
      'about.quote': '“Trying on a dress here and having it zip up at the back was a first in twenty years.”',
      'about.quoteRole': 'customer since 2019 · size 54',
      'about.servicesTitle': 'In-store and online services',
      'about.s1': 'Size advice in person or by video call', 'about.s2': 'Free hem and dart alterations on occasion wear',
      'about.s3': '48-hour garment hold at the market stall', 'about.s4': 'Made-to-order for events (weddings, christenings)', 'about.s5': 'Shipping across Spain in 24/72 h',
      'shop.eyebrow': 'Shop online', 'shop.title': 'The collection',
      'shop.lead': 'Reserve to collect at the market or have it delivered to your address. You choose when to pay.',
      'shop.sizeLabel': 'Size', 'shop.sortLabel': 'Sort',
      'shop.sortFeatured': 'Featured', 'shop.sortAsc': 'Price: low to high', 'shop.sortDesc': 'Price: high to low', 'shop.sortName': 'Name A–Z',
      'shop.note': 'Cannot find your size or colour? Write to us: we make short runs and can order it for you.',
      'shop.all': 'All', 'shop.cat.dresses': 'Dresses', 'shop.cat.blouses': 'Blouses', 'shop.cat.pants': 'Trousers',
      'shop.cat.outerwear': 'Coats', 'shop.cat.knit': 'Knitwear',
      'shop.sizeAll': 'All sizes', 'shop.results': '{n} items available', 'shop.resultsOne': '1 item available',
      'shop.add': 'Add to cart', 'shop.quick': 'Quick view', 'shop.sale': 'Sale', 'shop.new': 'New in', 'shop.top': 'Best seller',
      'shop.needSize': 'Choose your size before adding the item', 'shop.added': '{name} (size {size}) added to cart',
      'shop.wishOn': 'Saved to favourites', 'shop.wishOff': 'Removed from favourites',
      'sizes.eyebrow': 'Size guide', 'sizes.title': 'Get it right first time',
      'sizes.lead': 'Our sizes are real European sizes. Measure bust, waist and hip with a tape over your underwear and compare with the chart.',
      'sizes.tableCaption': 'Measurements by size',
      'sizes.colSize': 'Size', 'sizes.colChest': 'Bust (cm)', 'sizes.colWaist': 'Waist (cm)', 'sizes.colHip': 'Hip (cm)', 'sizes.colEq': 'Equiv.',
      'sizes.step1t': 'Bust', 'sizes.step1d': 'Around the fullest part, not tight.',
      'sizes.step2t': 'Waist', 'sizes.step2d': 'At the natural fold of the torso.',
      'sizes.step3t': 'Hip', 'sizes.step3d': 'Standing, around the widest part.',
      'sizes.adviceTitle': 'Free personal styling',
      'sizes.adviceText': '30 minutes with a stylist specialised in plus sizes, in store or by video call. We build three full looks within your budget.',
      'sizes.a1': 'Monday to Saturday, by appointment', 'sizes.a2': 'Spacious accessible fitting room', 'sizes.a3': 'We hold your items for 48 h',
      'sizes.adviceCta': 'Book an appointment', 'sizes.mini': 'of online orders get the size right first time thanks to the guide.',
      'sizes.returnsTitle': 'Easy exchanges', 'sizes.returnsText': '30 days to change size or colour. We collect at home or you bring it to the market.',
      'look.eyebrow': 'Autumn–winter lookbook', 'look.title': 'Dressed for real',
      'look.lead': 'Unretouched photos shot in Valencia with our customers and friends of the house.',
      'look.item1': 'Coat + knit dress', 'look.item2': 'Full linen look', 'look.item3': 'Fluid two-piece suit', 'look.item4': 'Occasion · midi dress', 'look.item5': 'Everyday black',
      'rev.eyebrow': 'Verified reviews', 'rev.title': 'What they say in the fitting room',
      'contact.eyebrow': 'Let us talk', 'contact.title': 'Write to us or drop by the market',
      'contact.lead': 'We reply within 24 working hours. You can also book your styling session or order a made-to-measure garment.',
      'contact.addrT': 'Store', 'contact.addrD': 'Colón Market, stall 27 · 46004 Valencia',
      'contact.hoursT': 'Opening hours', 'contact.hoursD': 'Mon–Sat 10:00–20:30 · Sun 11:00–14:00',
      'contact.phoneT': 'Phone and WhatsApp',
      'contact.formTitle': 'Contact form', 'contact.name': 'Name', 'contact.namePh': 'Your name',
      'contact.email': 'Email', 'contact.phone': 'Phone', 'contact.subject': 'Reason',
      'contact.subj1': 'Size advice', 'contact.subj2': 'Made-to-order request', 'contact.subj3': 'Exchange or return', 'contact.subj4': 'Other question',
      'contact.message': 'Message', 'contact.messagePh': 'Tell us what you need…',
      'contact.privacy': 'I have read and accept the privacy policy.', 'contact.submit': 'Send message',
      'contact.ok': 'Thank you! We will reply within 24 working hours.',
      'footer.about': 'Womenswear and menswear store in sizes 44–66. In-house design, real pattern making and online sales with collection at Colón Market in Valencia.',
      'footer.newsLabel': 'Newsletter email', 'footer.newsPh': 'Your email', 'footer.newsBtn': 'Sign me up',
      'footer.newsOk': 'Done, we will keep you posted.', 'footer.newsErr': 'Please enter a valid email.',
      'footer.colShop': 'Shop', 'footer.l1': 'Dresses', 'footer.l2': 'Blouses and shirts', 'footer.l3': 'Trousers',
      'footer.l4': 'Coats', 'footer.l5': 'Knitwear and tees', 'footer.l6': 'New in',
      'footer.colHelp': 'Help and requirements', 'footer.h1': 'Size and measurement guide', 'footer.h2': 'Cookie policy', 'footer.h3': 'Purchase requirements',
      'footer.h4': 'Shipping, exchanges and returns', 'footer.h5': 'Privacy and legal notice', 'footer.h6': 'Accessibility',
      'footer.colContact': 'Contact', 'footer.hours': 'Mon–Sat 10:00–20:30 · Sun 11:00–14:00',
      'footer.rights': 'All rights reserved', 'footer.cookies': 'Cookie policy', 'footer.legal': 'Legal notice', 'footer.privacy': 'Privacy',
      'search.ph': 'Search sizes, dresses, shipping…',
      'search.hint': 'Type at least 2 letters. We will search the whole page and highlight every match.',
      'search.clear': 'Clear highlights', 'search.resultsFor': '{n} matches for “{q}”',
      'search.resultsOne': '1 match for “{q}”', 'search.none': 'No results for “{q}”. Try “size”, “shipping” or “dress”.',
      'search.hitsPill': '{n} matches highlighted on the page', 'search.marksCleared': 'Highlights removed',
      'cart.title': 'Your cart', 'cart.step1': 'Cart', 'cart.step2': 'Delivery', 'cart.step3': 'Payment', 'cart.step4': 'Done',
      'cart.stepLabel1': 'Review your selection', 'cart.stepLabel2': 'Collection or home delivery?',
      'cart.stepLabel3': 'Choose how to pay', 'cart.stepLabel4': 'Order confirmed',
      'cart.empty': 'Your cart is empty.', 'cart.emptyCta': 'Shop the collection',
      'cart.coupon': 'Discount code', 'cart.couponBtn': 'Apply',
      'cart.couponOk': 'Code {code} applied: {val}', 'cart.couponErr': 'Invalid or expired code.',
      'cart.pickup': 'Collect at the market', 'cart.pickupD': 'Free · ready in 2 h · Colón Market, stall 27',
      'cart.shipping': 'Deliver to my address', 'cart.shippingD': '€4.95 · free over €60 · 24/72 h',
      'cart.store': 'Collection point', 'cart.pickupDate': 'Collection day', 'cart.pickupSlot': 'Time slot',
      'cart.whoPickup': 'Collecting person', 'cart.whoPickupPh': 'Full name',
      'cart.name': 'First name', 'cart.namePh': 'First name', 'cart.surname': 'Last name', 'cart.surnamePh': 'Last name',
      'cart.address': 'Address', 'cart.addressPh': 'Street, number, floor', 'cart.zip': 'Postcode',
      'cart.city': 'City', 'cart.cityPh': 'Valencia', 'cart.province': 'Province', 'cart.provincePh': 'Valencia',
      'cart.phone': 'Contact phone', 'cart.shipMethod': 'Shipping speed',
      'cart.shipStd': 'Standard 48/72 h — €4.95 (free over €60)', 'cart.shipExp': 'Express 24 h — €9.95',
      'cart.notes': 'Delivery notes', 'cart.notesPh': 'Concierge, preferred time…',
      'cart.payHint': 'Choose how and when you want to pay.',
      'cart.payPickup': 'Pay when collecting at the market', 'cart.payPickupD': 'Cash or card at the stall. No surcharge.',
      'cart.payDelivery': 'Pay on delivery', 'cart.payDeliveryD': 'Cash on delivery: +€2.50 handling fee.',
      'cart.payGateway': 'Pay now with the market gateway', 'cart.payGatewayD': 'A window will show the exact amount before you pay.',
      'cart.email': 'Email for the receipt',
      'cart.terms': 'I accept the purchase requirements, the returns policy and the privacy policy.',
      'cart.back': 'Back', 'cart.continue': 'Continue', 'cart.toPayment': 'Continue to payment',
      'cart.confirmOrder': 'Confirm order', 'cart.reserve': 'Reserve and collect in store',
      'cart.keepShopping': 'Keep shopping',
      'cart.subtotal': 'Subtotal ({n} items)', 'cart.discount': 'Discount {code}', 'cart.shippingCost': 'Shipping',
      'cart.surcharge': 'Cash on delivery fee', 'cart.total': 'Total', 'cart.vatIncluded': 'VAT (21 %) included: {vat}',
      'cart.free': 'Free', 'cart.clear': 'Empty cart', 'cart.cleared': 'Cart emptied',
      'cart.removed': 'Item removed', 'cart.remove': 'Remove', 'cart.size': 'Size', 'cart.qty': 'Quantity',
      'cart.doneTitle': 'Order confirmed!', 'cart.donePickupTitle': 'Reservation confirmed!',
      'cart.doneText': 'We have sent the receipt to {email}.',
      'cart.orderNum': 'Order number', 'cart.delivery': 'Delivery', 'cart.payment': 'Payment', 'cart.amount': 'Amount',
      'cart.pickupSummary': 'Collection: {store} · {date} ({slot})', 'cart.shipSummary': 'Shipping to {address}, {zip} {city}',
      'cart.payPickupSummary': 'Pay on collection in store', 'cart.payCodSummary': 'Pay on delivery (cash on delivery)',
      'cart.payGatewaySummary': 'Paid online through the market gateway',
      'cart.pending': 'Payment pending', 'cart.paid': 'Paid',
      'cart.doneThanks': 'Thank you for supporting market traders.',
      'err.required': 'This field is required.', 'err.email': 'Enter a valid email.',
      'err.zip': 'Postcode must be 5 digits.', 'err.phone': 'Enter a valid phone number.',
      'err.terms': 'You must accept the terms to continue.', 'err.size': 'Please select a size.',
      'pay.title': 'Market payment gateway', 'pay.sub': 'Check the amount before continuing. Encrypted secure payment.',
      'pay.total': 'Amount to pay now', 'pay.card': 'Card', 'pay.cardNumber': 'Card number', 'pay.cardExp': 'Expiry',
      'pay.note': 'The market payment gateway (virtual POS) will be integrated here. This screen shows exactly what will be charged.',
      'pay.cancel': 'Cancel', 'pay.confirm': 'Pay now', 'pay.processing': 'Processing payment…',
      'pay.success': 'Payment completed successfully', 'pay.items': 'Items', 'pay.vatRow': 'VAT included (21 %)',
      'auth.login': 'Sign in', 'auth.register': 'Create account', 'auth.title': 'My ÀMPLIA account',
      'auth.sub': 'Save your sizes, track your orders and book a styling session.',
      'auth.name': 'Name', 'auth.namePh': 'First and last name', 'auth.email': 'Email', 'auth.pass': 'Password',
      'auth.remember': 'Keep me signed in', 'auth.submit': 'Sign in', 'auth.submitReg': 'Create my account',
      'auth.note': 'Login system ready: plug your authentication backend in here.',
      'auth.okLogin': 'Signed in as {email}.', 'auth.okRegister': 'Account created. Welcome to ÀMPLIA.',
      'auth.hello': 'Welcome back, {name}',
      'cookies.title': 'Cookie policy',
      'cookies.intro': 'We use our own and third-party cookies so the store works, to measure usage and to show you useful content. Accept all, reject them or configure them.',
      'cookies.nec': 'Necessary', 'cookies.necD': 'Cart, language, light/dark theme and session. Always on.',
      'cookies.pref': 'Preferences', 'cookies.prefD': 'They remember your usual sizes and favourite items.',
      'cookies.anal': 'Analytics', 'cookies.analD': 'Anonymous browsing statistics to improve the store.',
      'cookies.mkt': 'Advertising', 'cookies.mktD': 'They show campaigns for products you have viewed.',
      'cookies.reject': 'Reject optional', 'cookies.save': 'Save settings', 'cookies.accept': 'Accept',
      'cookies.config': 'Configure', 'cookies.saved': 'Cookie preferences saved.',
      'cookies.bannerT': 'We use cookies', 'cookies.bannerD': 'so the cart works and to improve the store. Accept, reject or read the policy.',
      'legal.title': 'Purchase requirements',
      'legal.h1': '1. General conditions', 'legal.p1': 'Prices include VAT (21 %). The order is confirmed once payment is completed or reserved for collection. We hold reservations for 48 working hours.',
      'legal.h2': '2. Shipping and lead times', 'legal.p2': 'Standard shipping 48/72 h — €4.95 (free over €60). Express 24 h — €9.95. Free market collection, ready in 2 hours during opening times.',
      'legal.h3': '3. Exchanges and returns', 'legal.p3': 'You have 30 calendar days. Size exchange is free: we collect the garment and send the new one. Refunds go back to the original payment method in 5–7 days.',
      'legal.h4': '4. Payment methods', 'legal.p4': 'You can pay on collection at the market, on delivery (cash on delivery, +€2.50) or upfront with the market payment gateway. In the first two cases the garment is reserved in your name.',
      'legal.h5': '5. Technical requirements', 'legal.p5': 'The store works on any modern browser, with or without JavaScript for reading content. No third-party account is needed to check out as a guest.',
      'legal.h6': '6. Data and privacy', 'legal.p6': 'We process your data to manage the order and customer service. You can exercise your access, rectification and deletion rights by writing to hola@ampia.es.',
      'legal.close': 'Got it',
      'theme.toDark': 'Dark mode on', 'theme.toLight': 'Light mode on',
      'quick.add': 'Add to cart', 'quick.qty': 'Quantity', 'quick.size': 'Size',
      'quick.m1': 'Free shipping over €60 or free market collection',
      'quick.m2': 'Free size exchange for 30 days',
      'quick.m3': 'Pay on collection, on delivery or online',
      'quick.colors': 'Available colours', 'quick.fabric': 'Composition', 'quick.ref': 'Reference'
    },

    va: {
      'logo.tag': 'moda en talles grans',
      'topbar.market': 'Mercat de Colom · València',
      'topbar.free': 'Enviament gratuït des de 60 €',
      'topbar.returns': 'Canvis i devolucions 30 dies',
      'nav.home': 'Inici', 'nav.shop': 'Col·lecció', 'nav.about': 'Nosaltres', 'nav.sizes': 'Talles',
      'nav.lookbook': 'Lookbook', 'nav.reviews': 'Opinions', 'nav.contact': 'Contacte',
      'action.search': 'Buscar en la pàgina', 'action.account': 'El meu compte', 'action.theme': 'Canviar mode clar o fosc', 'action.cart': 'Obrir cistella',
      'mobile.search': 'Buscar en la pàgina', 'mobile.lang': 'Idioma',
      'hero.eyebrow': 'Nova col·lecció · Talles 44 a 66',
      'hero.title1': 'Roba que senta bé', 'hero.title2': 'en cada talla',
      'hero.text': 'Dissenyem i patronem des de la talla 44 fins a la 66 sobre cossos reals. Res d’escalats impossibles: cada peça es torna a dibuixar perquè caiga on ha de caure.',
      'hero.ctaShop': 'Vore la col·lecció', 'hero.ctaSizes': 'Troba la teua talla',
      'hero.stat1': 'talles europees', 'hero.stat2': 'clientes vestides', 'hero.stat3': 'valoració mitjana',
      'hero.cardTag': 'Destacat de la setmana', 'hero.cardCta': 'Vore peça', 'hero.scroll': 'Descobrix',
      'about.eyebrow': 'La nostra forma de treballar', 'about.title': 'Moda gran, ben feta',
      'about.lead': 'No fem «talles especials»: fem roba. Només que la nostra taula de mesures comença on la de quasi totes acaba.',
      'about.badge': 'anys vestint cossos reals',
      'about.p1t': 'Patronatge propi des de zero', 'about.p1d': 'Cada model es dibuixa de nou en talla base 50 i s’ajusta en emprovador amb clientes reals abans de produir-lo.',
      'about.p2t': 'Teixits que acompanyen', 'about.p2d': 'Cotó pentinat, viscosa fluida i elastà recuperable: cauen, no es claven i aguanten llavats.',
      'about.p3t': 'Arreplegada al mercat', 'about.p3d': 'Reserva en línia i arreplega en la nostra parada del Mercat de Colom, amb emprovador ampli i assessoria inclosa.',
      'about.p4t': 'Canvi de talla sense drames', 'about.p4d': 'Si no encertes amb la talla, canviem la peça en 30 dies i paguem nosaltres la recollida.',
      'about.quote': '«Emprovar-me un vestit ací i que tanque bé per l’esquena va ser la primera vegada en vint anys.»',
      'about.quoteRole': 'clienta des de 2019 · talla 54',
      'about.servicesTitle': 'Serveis en botiga i en línia',
      'about.s1': 'Assessoria de talla presencial i per videoconferència', 'about.s2': 'Arranjaments de baix i pinces gratuïts en peces de festa',
      'about.s3': 'Reserva de peça 48 h en la parada del mercat', 'about.s4': 'Comanda a mida per a esdeveniments (bodes, comunions)', 'about.s5': 'Enviament a tot Espanya en 24/72 h',
      'shop.eyebrow': 'Comprar en línia', 'shop.title': 'La col·lecció',
      'shop.lead': 'Reserva per a arreplegar al mercat o rep-ho a la teua adreça. Tria quan pagar.',
      'shop.sizeLabel': 'Talla', 'shop.sortLabel': 'Ordenar',
      'shop.sortFeatured': 'Destacats', 'shop.sortAsc': 'Preu: de menor a major', 'shop.sortDesc': 'Preu: de major a menor', 'shop.sortName': 'Nom A–Z',
      'shop.note': 'No trobes la teua talla o el teu color? Escriu-nos: fabriquem sèries curtes i podem encarregar-la per a tu.',
      'shop.all': 'Tot', 'shop.cat.dresses': 'Vestits', 'shop.cat.blouses': 'Bruses', 'shop.cat.pants': 'Pantalons',
      'shop.cat.outerwear': 'Abrics', 'shop.cat.knit': 'Punt',
      'shop.sizeAll': 'Totes les talles', 'shop.results': '{n} peces disponibles', 'shop.resultsOne': '1 peça disponible',
      'shop.add': 'Afegir a la cistella', 'shop.quick': 'Vista ràpida', 'shop.sale': 'Rebaixat', 'shop.new': 'Novetat', 'shop.top': 'Més venut',
      'shop.needSize': 'Tria la teua talla abans d’afegir la peça', 'shop.added': '{name} (talla {size}) afegit a la cistella',
      'shop.wishOn': 'Guardat en preferits', 'shop.wishOff': 'Tret dels preferits',
      'sizes.eyebrow': 'Guia de talles', 'sizes.title': 'Encertar a la primera',
      'sizes.lead': 'Les nostres talles són europees i reals. Mesura contorn de pit, cintura i maluc amb una cinta mètrica sobre la roba interior i compara amb la taula.',
      'sizes.tableCaption': 'Taula de mesures per talla',
      'sizes.colSize': 'Talla', 'sizes.colChest': 'Pit (cm)', 'sizes.colWaist': 'Cintura (cm)', 'sizes.colHip': 'Maluc (cm)', 'sizes.colEq': 'Equiv.',
      'sizes.step1t': 'Pit', 'sizes.step1d': 'Per la part més plena, sense estrényer.',
      'sizes.step2t': 'Cintura', 'sizes.step2d': 'En el plec natural del tors.',
      'sizes.step3t': 'Maluc', 'sizes.step3d': 'Dempeus, per la part més ampla.',
      'sizes.adviceTitle': 'Assessoria personal gratuïta',
      'sizes.adviceText': '30 minuts amb una estilista especialitzada en talles grans, en botiga o per videoconferència. Et muntem tres looks complets amb el teu pressupost.',
      'sizes.a1': 'Dilluns a dissabte, amb cita prèvia', 'sizes.a2': 'Emprovador ampli i accessible', 'sizes.a3': 'Et guardem les peces 48 h',
      'sizes.adviceCta': 'Reservar cita', 'sizes.mini': 'de les comandes en línia encerten la talla a la primera gràcies a la guia.',
      'sizes.returnsTitle': 'Canvis fàcils', 'sizes.returnsText': '30 dies per a canviar talla o color. Arrepleguem a casa teua o ho portes al mercat.',
      'look.eyebrow': 'Lookbook tardor–hivern', 'look.title': 'Vestides de veritat',
      'look.lead': 'Fotografies sense retocs de cos, fetes a València amb clientes i amigues de la casa.',
      'look.item1': 'Abric + vestit de punt', 'look.item2': 'Total look de lli', 'look.item3': 'Sastre fluid dues peces', 'look.item4': 'Convidada · vestit midi', 'look.item5': 'Negre de diari',
      'rev.eyebrow': 'Opinions verificades', 'rev.title': 'El que diuen en l’emprovador',
      'contact.eyebrow': 'Parlem', 'contact.title': 'Escriu-nos o passa pel mercat',
      'contact.lead': 'Responem en menys de 24 h laborables. També pots reservar la teua assessoria o demanar una peça per encàrrec.',
      'contact.addrT': 'Botiga', 'contact.addrD': 'Mercat de Colom, parada 27 · 46004 València',
      'contact.hoursT': 'Horari', 'contact.hoursD': 'Dl–Ds 10:00–20:30 · Dg 11:00–14:00',
      'contact.phoneT': 'Telèfon i WhatsApp',
      'contact.formTitle': 'Formulari de contacte', 'contact.name': 'Nom', 'contact.namePh': 'El teu nom',
      'contact.email': 'Correu', 'contact.phone': 'Telèfon', 'contact.subject': 'Motiu',
      'contact.subj1': 'Assessoria de talla', 'contact.subj2': 'Comanda per encàrrec', 'contact.subj3': 'Canvi o devolució', 'contact.subj4': 'Una altra consulta',
      'contact.message': 'Missatge', 'contact.messagePh': 'Compta’ns què necessites…',
      'contact.privacy': 'He llegit i accepte la política de privacitat.', 'contact.submit': 'Enviar missatge',
      'contact.ok': 'Gràcies! Et responem en menys de 24 h laborables.',
      'footer.about': 'Botiga de moda femenina i masculina en talles 44–66. Disseny propi, patronatge real i venda en línia amb arreplegada al Mercat de Colom de València.',
      'footer.newsLabel': 'Correu per al butlletí', 'footer.newsPh': 'El teu correu', 'footer.newsBtn': 'Apunta’m',
      'footer.newsOk': 'Fet, t’avisarem de les novetats.', 'footer.newsErr': 'Introduïx un correu vàlid.',
      'footer.colShop': 'Botiga', 'footer.l1': 'Vestits', 'footer.l2': 'Bruses i camises', 'footer.l3': 'Pantalons',
      'footer.l4': 'Abrics', 'footer.l5': 'Punt i samarretes', 'footer.l6': 'Novetats',
      'footer.colHelp': 'Ajuda i requisits', 'footer.h1': 'Guia de talles i mesures', 'footer.h2': 'Política de cookies', 'footer.h3': 'Requisits de compra',
      'footer.h4': 'Enviaments, canvis i devolucions', 'footer.h5': 'Privacitat i avís legal', 'footer.h6': 'Accessibilitat',
      'footer.colContact': 'Contacte', 'footer.hours': 'Dl–Ds 10:00–20:30 · Dg 11:00–14:00',
      'footer.rights': 'Tots els drets reservats', 'footer.cookies': 'Política de cookies', 'footer.legal': 'Avís legal', 'footer.privacy': 'Privacitat',
      'search.ph': 'Buscar talles, vestits, enviaments…',
      'search.hint': 'Escriu almenys 2 lletres. Buscarem en tota la pàgina i marcarem les coincidències.',
      'search.clear': 'Llevar ressalts', 'search.resultsFor': '{n} coincidències per a «{q}»',
      'search.resultsOne': '1 coincidència per a «{q}»', 'search.none': 'Cap resultat per a «{q}». Prova amb «talla», «enviament» o «vestit».',
      'search.hitsPill': '{n} coincidències ressaltades en la pàgina', 'search.marksCleared': 'Ressalts eliminats',
      'cart.title': 'La teua cistella', 'cart.step1': 'Cistella', 'cart.step2': 'Entrega', 'cart.step3': 'Pagament', 'cart.step4': 'Fet',
      'cart.stepLabel1': 'Revisa la teua selecció', 'cart.stepLabel2': 'Arreplegada o enviament a casa?',
      'cart.stepLabel3': 'Tria com pagar', 'cart.stepLabel4': 'Comanda confirmada',
      'cart.empty': 'La teua cistella està buida.', 'cart.emptyCta': 'Vore la col·lecció',
      'cart.coupon': 'Codi de descompte', 'cart.couponBtn': 'Aplicar',
      'cart.couponOk': 'Codi {code} aplicat: {val}', 'cart.couponErr': 'Codi no vàlid o caducat.',
      'cart.pickup': 'Arreplegar al mercat', 'cart.pickupD': 'Gratis · llest en 2 h · Mercat de Colom, parada 27',
      'cart.shipping': 'Enviament a la meua adreça', 'cart.shippingD': '4,95 € · gratis des de 60 € · 24/72 h',
      'cart.store': 'Punt d’arreplegada', 'cart.pickupDate': 'Dia d’arreplegada', 'cart.pickupSlot': 'Franja horària',
      'cart.whoPickup': 'Qui arreplega', 'cart.whoPickupPh': 'Nom de la persona',
      'cart.name': 'Nom', 'cart.namePh': 'Nom', 'cart.surname': 'Cognoms', 'cart.surnamePh': 'Cognoms',
      'cart.address': 'Adreça', 'cart.addressPh': 'Carrer, número, pis', 'cart.zip': 'Codi postal',
      'cart.city': 'Ciutat', 'cart.cityPh': 'València', 'cart.province': 'Província', 'cart.provincePh': 'València',
      'cart.phone': 'Telèfon de contacte', 'cart.shipMethod': 'Velocitat d’enviament',
      'cart.shipStd': 'Estàndard 48/72 h — 4,95 € (gratis des de 60 €)', 'cart.shipExp': 'Exprés 24 h — 9,95 €',
      'cart.notes': 'Notes per a l’entrega', 'cart.notesPh': 'Porter, horari preferit…',
      'cart.payHint': 'Tria com i quan vols pagar.',
      'cart.payPickup': 'Pagar en arreplegar al mercat', 'cart.payPickupD': 'Efectiu o targeta en la parada. Sense recàrrec.',
      'cart.payDelivery': 'Pagar quan m’ho entreguen', 'cart.payDeliveryD': 'Contra reembossament: +2,50 € de gestió.',
      'cart.payGateway': 'Pagar ara amb la passarel·la del mercat', 'cart.payGatewayD': 'S’obrirà una finestra amb l’import exacte abans de pagar.',
      'cart.email': 'Correu per al justificant',
      'cart.terms': 'Accepte els requisits de compra, la política de devolucions i la de privacitat.',
      'cart.back': 'Arrere', 'cart.continue': 'Continuar', 'cart.toPayment': 'Continuar al pagament',
      'cart.confirmOrder': 'Confirmar comanda', 'cart.reserve': 'Reservar i arreplegar en botiga',
      'cart.keepShopping': 'Continuar comprant',
      'cart.subtotal': 'Subtotal ({n} articles)', 'cart.discount': 'Descompte {code}', 'cart.shippingCost': 'Enviament',
      'cart.surcharge': 'Gestió contra reembossament', 'cart.total': 'Total', 'cart.vatIncluded': 'IVA (21 %) inclòs: {vat}',
      'cart.free': 'Gratis', 'cart.clear': 'Buidar cistella', 'cart.cleared': 'Cistella buidada',
      'cart.removed': 'Article eliminat', 'cart.remove': 'Eliminar', 'cart.size': 'Talla', 'cart.qty': 'Quantitat',
      'cart.doneTitle': 'Comanda confirmada!', 'cart.donePickupTitle': 'Reserva confirmada!',
      'cart.doneText': 'T’hem enviat el justificant a {email}.',
      'cart.orderNum': 'Número de comanda', 'cart.delivery': 'Entrega', 'cart.payment': 'Pagament', 'cart.amount': 'Import',
      'cart.pickupSummary': 'Arreplegada: {store} · {date} ({slot})', 'cart.shipSummary': 'Enviament a {address}, {zip} {city}',
      'cart.payPickupSummary': 'Pagament en arreplegar a la botiga', 'cart.payCodSummary': 'Pagament en l’entrega (contra reembossament)',
      'cart.payGatewaySummary': 'Pagat en línia amb la passarel·la del mercat',
      'cart.pending': 'Pendent de pagament', 'cart.paid': 'Pagat',
      'cart.doneThanks': 'Gràcies per donar suport al comerç del mercat.',
      'err.required': 'Este camp és obligatori.', 'err.email': 'Introduïx un correu vàlid.',
      'err.zip': 'Codi postal de 5 dígits.', 'err.phone': 'Introduïx un telèfon vàlid.',
      'err.terms': 'Has d’acceptar les condicions per a continuar.', 'err.size': 'Selecciona una talla.',
      'pay.title': 'Passarel·la de pagament del mercat', 'pay.sub': 'Revisa l’import abans de continuar. Pagament segur xifrat.',
      'pay.total': 'Import a pagar ara', 'pay.card': 'Targeta', 'pay.cardNumber': 'Número de targeta', 'pay.cardExp': 'Caducitat',
      'pay.note': 'Ací s’integrarà la passarel·la de pagament del mercat (TPV virtual). Esta pantalla mostra exactament el que es cobrarà.',
      'pay.cancel': 'Cancel·lar', 'pay.confirm': 'Pagar ara', 'pay.processing': 'Processant el pagament…',
      'pay.success': 'Pagament realitzat correctament', 'pay.items': 'Articles', 'pay.vatRow': 'IVA inclòs (21 %)',
      'auth.login': 'Entrar', 'auth.register': 'Crear compte', 'auth.title': 'El meu compte ÀMPLIA',
      'auth.sub': 'Guarda les teues talles, seguix les comandes i reserva cita d’assessoria.',
      'auth.name': 'Nom', 'auth.namePh': 'Nom i cognoms', 'auth.email': 'Correu', 'auth.pass': 'Contrasenya',
      'auth.remember': 'Mantindre la sessió iniciada', 'auth.submit': 'Entrar', 'auth.submitReg': 'Crear el meu compte',
      'auth.note': 'Sistema d’accés preparat: connecta ací el teu backend d’autenticació.',
      'auth.okLogin': 'Sessió iniciada com a {email}.', 'auth.okRegister': 'Compte creat. Benvinguda a ÀMPLIA.',
      'auth.hello': 'Hola de nou, {name}',
      'cookies.title': 'Política de cookies',
      'cookies.intro': 'Utilitzem cookies pròpies i de tercers perquè la botiga funcione, per a mesurar l’ús i per a mostrar-te contingut útil. Pots acceptar-les totes, rebutjar-les o configurar-les.',
      'cookies.nec': 'Necessàries', 'cookies.necD': 'Cistella, idioma, tema clar/fosc i sessió. Sempre actives.',
      'cookies.pref': 'Preferències', 'cookies.prefD': 'Recorden les teues talles habituals i productes preferits.',
      'cookies.anal': 'Analítiques', 'cookies.analD': 'Estadístiques anònimes de navegació per a millorar la botiga.',
      'cookies.mkt': 'Publicitàries', 'cookies.mktD': 'Mostren campanyes de productes que has visitat.',
      'cookies.reject': 'Rebutjar opcionals', 'cookies.save': 'Guardar configuració', 'cookies.accept': 'Acceptar',
      'cookies.config': 'Configurar', 'cookies.saved': 'Preferències de cookies guardades.',
      'cookies.bannerT': 'Utilitzem cookies', 'cookies.bannerD': 'perquè la cistella funcione i per a millorar la botiga. Accepta-les, rebutja-les o llig la política.',
      'legal.title': 'Requisits de compra',
      'legal.h1': '1. Condicions generals', 'legal.p1': 'Els preus inclouen IVA (21 %). La comanda es confirma en finalitzar el procés de pagament o en reservar-lo per a arreplegada. Guardem la reserva 48 hores laborables.',
      'legal.h2': '2. Enviaments i terminis', 'legal.p2': 'Enviament estàndard 48/72 h — 4,95 € (gratis des de 60 €). Enviament exprés 24 h — 9,95 €. Arreplegada al mercat gratuïta, llesta en 2 hores dins de l’horari comercial.',
      'legal.h3': '3. Canvis i devolucions', 'legal.p3': 'Disposes de 30 dies naturals. El canvi de talla és gratuït: arrepleguem la peça i enviem la nova. La devolució s’abona al mètode de pagament original en 5–7 dies.',
      'legal.h4': '4. Mètodes de pagament', 'legal.p4': 'Pots pagar en arreplegar al mercat, en el moment de l’entrega (contra reembossament, +2,50 €) o per avançat amb la passarel·la de pagament del mercat. En els dos primers casos la peça queda reservada al teu nom.',
      'legal.h5': '5. Requisits tècnics', 'legal.p5': 'La botiga funciona en qualsevol navegador modern, amb o sense JavaScript per a la lectura de continguts. No es requerixen comptes de tercers per a comprar com a convidada.',
      'legal.h6': '6. Dades i privacitat', 'legal.p6': 'Tractem les teues dades per a gestionar la comanda i l’atenció al client. Pots exercir els drets d’accés, rectificació i supressió escrivint a hola@ampia.es.',
      'legal.close': 'Entés',
      'theme.toDark': 'Mode fosc activat', 'theme.toLight': 'Mode clar activat',
      'quick.add': 'Afegir a la cistella', 'quick.qty': 'Quantitat', 'quick.size': 'Talla',
      'quick.m1': 'Enviament gratuït des de 60 € o arreplegada gratis al mercat',
      'quick.m2': 'Canvi de talla gratuït durant 30 dies',
      'quick.m3': 'Paga en arreplegar, en l’entrega o en línia',
      'quick.colors': 'Colors disponibles', 'quick.fabric': 'Composició', 'quick.ref': 'Referència'
    }
  };

  /* ══════════ 3. CATÁLOGO DE PRODUCTOS ══════════
     Las imágenes son accesos directos a fotos libres de derechos (Pexels);
     se sustituirán por las fotos reales del cliente. */
  var IMG = 'https://images.pexels.com/photos/';
  var PRODUCTS = [
    {
      id: 'p1', cat: 'dresses', price: 59.95, oldPrice: null, badge: 'new', rank: 1,
      sizes: ['44', '46', '48', '50', '52', '54', '56', '58'],
      colors: { es: 'Burdeos · Negro', en: 'Bordeaux · Black', va: 'Ordeus · Negre' },
      fabric: { es: '96 % poliéster reciclado, 4 % elastano', en: '96 % recycled polyester, 4 % elastane', va: '96 % poliéster reciclat, 4 % elastà' },
      img: IMG + '39968710/pexels-photo-39968710.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop',
      name: { es: 'Vestido Gala', en: 'Gala Dress', va: 'Vestit Gala' },
      desc: {
        es: 'Vestido midi de fiesta con corte en la cintura real (no elástica falsa), escote en pico y manga francesa. Forro interior que no marca.',
        en: 'Midi occasion dress with a real waist seam, V-neck and elbow-length sleeve. Lining that never shows through.',
        va: 'Vestit midi de festa amb tall en la cintura real, escot en pic i mànega francesa. Folre interior que no marca.'
      }
    },
    {
      id: 'p2', cat: 'dresses', price: 74.95, oldPrice: 89.95, badge: 'sale', rank: 6,
      sizes: ['46', '48', '50', '52', '54', '56', '58', '60'],
      colors: { es: 'Blanco roto · Verde salvia', en: 'Off white · Sage green', va: 'Blanc trencat · Verd sàlvia' },
      fabric: { es: '100 % viscosa Ecovero', en: '100 % Ecovero viscose', va: '100 % viscosa Ecovero' },
      img: IMG + '31886651/pexels-photo-31886651.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop',
      name: { es: 'Vestido Midi Invitada', en: 'Midi Guest Dress', va: 'Vestit Midi Convidada' },
      desc: {
        es: 'Fluido, con caída recta y bolsillos laterales. Pensado para bodas de día y bautizos sin pasar calor.',
        en: 'Fluid, straight drape with side pockets. Made for daytime weddings without overheating.',
        va: 'Fluid, amb caiguda recta i butxaques laterals. Pensat per a bodes de dia i batejos sense passar calor.'
      }
    },
    {
      id: 'p3', cat: 'dresses', price: 45.95, oldPrice: null, badge: 'top', rank: 3,
      sizes: ['44', '46', '48', '50', '52', '54', '56', '58', '60', '62'],
      colors: { es: 'Teja · Marino', en: 'Rust · Navy', va: 'Teula · Marí' },
      fabric: { es: '60 % algodón, 40 % modal', en: '60 % cotton, 40 % modal', va: '60 % cotó, 40 % modal' },
      img: IMG + '16587042/pexels-photo-16587042.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop',
      name: { es: 'Vestido Camisero Urbano', en: 'Urban Shirt Dress', va: 'Vestit Camiser Urbà' },
      desc: {
        es: 'Botonadura completa, cinturón ancho opcional y largo por debajo de la rodilla. El fondo de armario que más vas a usar.',
        en: 'Full button front, optional wide belt and below-the-knee length. The wardrobe staple you will wear most.',
        va: 'Botonadura completa, cinturó ample opcional i llarg per davall del genoll. El fons d’armari que més vas a usar.'
      }
    },
    {
      id: 'p4', cat: 'outerwear', price: 69.95, oldPrice: null, badge: 'new', rank: 4,
      sizes: ['46', '48', '50', '52', '54', '56'],
      colors: { es: 'Gris perla · Camel', en: 'Pearl grey · Camel', va: 'Gris perla · Camel' },
      fabric: { es: '65 % poliéster, 32 % viscosa, 3 % elastano', en: '65 % polyester, 32 % viscose, 3 % elastane', va: '65 % poliéster, 32 % viscosa, 3 % elastà' },
      img: IMG + '10483321/pexels-photo-10483321.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop',
      name: { es: 'Blazer Estructurado Núria', en: 'Núria Structured Blazer', va: 'Blazer Estructurat Núria' },
      desc: {
        es: 'Hombro armado con pinzas de ajuste en la espalda y manga con hueco real para el brazo. Cierra sin tirar.',
        en: 'Structured shoulder with back darts and real sleeve room. Buttons without pulling.',
        va: 'Espatla armada amb pinces d’ajust en l’esquena i mànega amb espai real per al braç. Tanca sense estirar.'
      }
    },
    {
      id: 'p5', cat: 'outerwear', price: 99.95, oldPrice: 129.95, badge: 'sale', rank: 8,
      sizes: ['48', '50', '52', '54', '56', '58', '60', '62', '64'],
      colors: { es: 'Negro · Camel', en: 'Black · Camel', va: 'Negre · Camel' },
      fabric: { es: '70 % lana, 30 % poliamida', en: '70 % wool, 30 % polyamide', va: '70 % llana, 30 % poliamida' },
      img: IMG + '11738318/pexels-photo-11738318.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop',
      name: { es: 'Abrigo Largo Invierno', en: 'Long Winter Coat', va: 'Abric Llarg Hivern' },
      desc: {
        es: 'Largo hasta media pierna, forro térmico y abertura trasera para caminar cómoda. Bolsillos profundos.',
        en: 'Mid-calf length, thermal lining and back vent for easy walking. Deep pockets.',
        va: 'Llarg fins a mitja cama, folre tèrmic i obertura posterior per a caminar còmoda. Butxaques profundes.'
      }
    },
    {
      id: 'p6', cat: 'blouses', price: 32.95, oldPrice: null, badge: null, rank: 5,
      sizes: ['44', '46', '48', '50', '52', '54', '56', '58', '60'],
      colors: { es: 'Rosa empolvado · Crudo', en: 'Powder pink · Ecru', va: 'Rosa empolvat · Cru' },
      fabric: { es: '100 % viscosa fluida', en: '100 % fluid viscose', va: '100 % viscosa fluida' },
      img: IMG + '31556443/pexels-photo-31556443.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop',
      name: { es: 'Blusa Fluida Rosa', en: 'Pink Fluid Blouse', va: 'Brusa Fluida Rosa' },
      desc: {
        es: 'Sisa amplia sin costuras que se claven, botones ocultos y bajo redondeado para llevar por fuera.',
        en: 'Roomy armhole with no digging seams, hidden buttons and a curved hem to wear untucked.',
        va: 'Sisa ampla sense costures que es claven, botons ocults i baix arredonit per a dur per fora.'
      }
    },
    {
      id: 'p7', cat: 'blouses', price: 34.95, oldPrice: null, badge: 'new', rank: 9,
      sizes: ['46', '48', '50', '52', '54', '56', '58'],
      colors: { es: 'Floral sobre crudo', en: 'Floral on ecru', va: 'Floral sobre cru' },
      fabric: { es: '97 % algodón orgánico, 3 % elastano', en: '97 % organic cotton, 3 % elastane', va: '97 % cotó orgànic, 3 % elastà' },
      img: IMG + '31556454/pexels-photo-31556454.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop',
      name: { es: 'Blusa Floral Marta', en: 'Marta Floral Blouse', va: 'Brusa Floral Marta' },
      desc: {
        es: 'Estampado exclusivo de la casa, cuello camisero y puño ancho que no aprieta la muñeca.',
        en: 'Exclusive in-house print, shirt collar and a wide cuff that never squeezes the wrist.',
        va: 'Estampat exclusiu de la casa, coll camiser i puny ample que no estreny el canell.'
      }
    },
    {
      id: 'p8', cat: 'knit', price: 24.95, oldPrice: null, badge: 'top', rank: 2,
      sizes: ['44', '46', '48', '50', '52', '54', '56', '58', '60', '62', '64', '66'],
      colors: { es: 'Rayas marino/blanco', en: 'Navy/white stripes', va: 'Ratlles marí/blanc' },
      fabric: { es: '100 % algodón peinado 220 g', en: '100 % combed cotton 220 g', va: '100 % cotó pentinat 220 g' },
      img: IMG + '11166481/pexels-photo-11166481.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop',
      name: { es: 'Camiseta Rayas Marina', en: 'Marina Stripe Tee', va: 'Samarreta Ratlles Marina' },
      desc: {
        es: 'Punto grueso que no transparenta, cuello reforzado y todas las tallas de la 44 a la 66 siempre en stock.',
        en: 'Opaque heavy knit, reinforced neck and every size from 44 to 66 always in stock.',
        va: 'Punt gruixut que no transparenta, coll reforçat i totes les talles de la 44 a la 66 sempre en estoc.'
      }
    },
    {
      id: 'p9', cat: 'pants', price: 49.95, oldPrice: 59.95, badge: 'sale', rank: 7,
      sizes: ['44', '46', '48', '50', '52', '54', '56', '58', '60'],
      colors: { es: 'Denim medio', en: 'Mid denim', va: 'Denim mitjà' },
      fabric: { es: '92 % algodón, 6 % poliéster, 2 % elastano', en: '92 % cotton, 6 % polyester, 2 % elastane', va: '92 % cotó, 6 % poliéster, 2 % elastà' },
      img: IMG + '6770452/pexels-photo-6770452.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop',
      name: { es: 'Vaquero Recto Confort', en: 'Comfort Straight Jeans', va: 'Vaquer Recte Confort' },
      desc: {
        es: 'Tiro alto con banda elástica interior, perna recta real (no pitillo disfrazado) y largo estándar 82 cm.',
        en: 'High rise with inner elastic band, true straight leg and a standard 82 cm inseam.',
        va: 'Tir alt amb banda elàstica interior, cama recta real i llarg estàndard de 82 cm.'
      }
    },
    {
      id: 'p10', cat: 'pants', price: 44.95, oldPrice: null, badge: null, rank: 10,
      sizes: ['46', '48', '50', '52', '54', '56', '58'],
      colors: { es: 'Denim claro · Negro', en: 'Light denim · Black', va: 'Denim clar · Negre' },
      fabric: { es: '98 % algodón, 2 % elastano', en: '98 % cotton, 2 % elastane', va: '98 % cotó, 2 % elastà' },
      img: IMG + '35452272/pexels-photo-35452272.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop',
      name: { es: 'Pantalón Denim Claro', en: 'Light Denim Trousers', va: 'Pantaló Denim Clar' },
      desc: {
        es: 'Cinco bolsillos con contorno de cadera ampliado y costuras reforzadas en la entrepierna.',
        en: 'Five pockets with widened hip circumference and reinforced inner-leg seams.',
        va: 'Cinc butxaques amb contorn de maluc ampliat i costures reforçades en l’entrecuix.'
      }
    },
    {
      id: 'p11', cat: 'outerwear', price: 89.95, oldPrice: null, badge: 'top', rank: 11,
      sizes: ['48', '50', '52', '54', '56', '58', '60', '62'],
      colors: { es: 'Negro · Burdeos', en: 'Black · Bordeaux', va: 'Negre · Ordeus' },
      fabric: { es: '88 % poliéster, 12 % elastano', en: '88 % polyester, 12 % elastane', va: '88 % poliéster, 12 % elastà' },
      img: IMG + '8433517/pexels-photo-8433517.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop',
      name: { es: 'Conjunto Sastre Dos Piezas', en: 'Two-Piece Tailored Set', va: 'Conjunt Sastre Dues Peces' },
      desc: {
        es: 'Chaqueta y pantalón de pinza única con tejido elástico bidireccional. Se vende junto y por separado en tienda.',
        en: 'Jacket and single-pleat trousers in two-way stretch fabric. Sold as a set in store, pieces available separately.',
        va: 'Jaqueta i pantaló de pinça única amb teixit elàstic bidireccional. Es ven junt i per separat en botiga.'
      }
    }
  ];

  var REVIEWS = [
    {
      name: 'Rocío M.', meta: { es: 'Talla 54 · Valencia', en: 'Size 54 · Valencia', va: 'Talla 54 · València' }, stars: 5,
      img: IMG + '8433543/pexels-photo-8433543.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
      text: {
        es: 'Pedí el vestido de invitada para la boda de mi hermana dudando de la talla 54. Me llamaron para confirmarla y acertaron. Lo recogí en el mercado, probado y arreglado.',
        en: 'I ordered the guest dress for my sister’s wedding doubting size 54. They rang to confirm it and got it right. I collected it at the market, fitted and altered.',
        va: 'Vaig demanar el vestit de convidada per al casament de la meua germana dubtant de la talla 54. Em van cridar per a confirmar-la i van encertar. El vaig arreplegar al mercat, emprovat i arreglat.'
      }
    },
    {
      name: 'Amparo S.', meta: { es: 'Talla 58 · Algemesí', en: 'Size 58 · Algemesí', va: 'Talla 58 · Algemesí' }, stars: 5,
      img: IMG + '16587042/pexels-photo-16587042.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
      text: {
        es: 'Los vaqueros son los primeros que no me hacen bolsa en la rodilla. Pagué al recogerlos en la parada del mercado, sin prisas y con una atención estupenda.',
        en: 'The first jeans that do not bag at the knee. I paid when collecting them at the market stall, unhurried, with lovely service.',
        va: 'Els vaquers són els primers que no em fan bossa al genoll. Vaig pagar en arreplegar-los a la parada del mercat, sense presses i amb una atenció estupenda.'
      }
    },
    {
      name: 'Lucía P.', meta: { es: 'Talla 50 · Madrid', en: 'Size 50 · Madrid', va: 'Talla 50 · Madrid' }, stars: 4,
      img: IMG + '11166487/pexels-photo-11166487.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
      text: {
        es: 'Compré online con envío a casa y pago contra reembolso porque no me fiaba. Llegó en dos días y el blazer sienta de escándalo. Repetiré con el abrigo.',
        en: 'I bought online with home delivery and cash on delivery because I was unsure. It arrived in two days and the blazer fits beautifully. I will buy the coat next.',
        va: 'Vaig comprar en línia amb enviament a casa i pagament contra reembossament perquè no em fiava. Va arribar en dos dies i el blazer senta d’escàndol. Repetiré amb l’abric.'
      }
    },
    {
      name: 'Nuria T.', meta: { es: 'Talla 62 · Castellón', en: 'Size 62 · Castellón', va: 'Talla 62 · Castelló' }, stars: 5,
      img: IMG + '34909506/pexels-photo-34909506.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
      text: {
        es: 'Encontrar la talla 62 en stock y no por encargo ya es un lujo. La asesoría por videollamada me ahorró tres devoluciones.',
        en: 'Finding size 62 in stock rather than made to order is a luxury already. The video-call styling saved me three returns.',
        va: 'Trobar la talla 62 en estoc i no per encàrrec ja és un luxe. L’assessoria per videoconferència em va estalviar tres devolucions.'
      }
    }
  ];

  var MARQUEE = {
    es: ['Tallas 44 a 66 siempre en stock', 'Envío gratis desde 60 €', 'Recogida en el Mercado de Colón', 'Cambio de talla gratuito',
      'Paga al recoger, en la entrega u online', 'Patronaje propio', 'Asesoría personal gratis', 'Devoluciones en 30 días'],
    en: ['Sizes 44 to 66 always in stock', 'Free shipping over €60', 'Collect at Colón Market', 'Free size exchange',
      'Pay on collection, on delivery or online', 'In-house pattern making', 'Free personal styling', '30-day returns'],
    va: ['Talles 44 a 66 sempre en estoc', 'Enviament gratuït des de 60 €', 'Arreplegada al Mercat de Colom', 'Canvi de talla gratuït',
      'Paga en arreplegar, en l’entrega o en línia', 'Patronatge propi', 'Assessoria personal gratis', 'Devolucions en 30 dies']
  };

  var SEARCH_CHIPS = {
    es: ['vestidos', 'talla 54', 'envío', 'devoluciones', 'asesoría', 'pantalones', 'recogida', 'pagar'],
    en: ['dresses', 'size 54', 'shipping', 'returns', 'styling', 'trousers', 'collection', 'pay'],
    va: ['vestits', 'talla 54', 'enviament', 'devolucions', 'assessoria', 'pantalons', 'arreplegada', 'pagar']
  };

  /* ══════════ 4. TEMA CLARO / OSCURO ══════════ */
  var themeToggle = $('#themeToggle');
  var themeIcons = $('#themeIcons');

  var SVG_SUN = '<svg class="ico sun" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4.4" fill="none" stroke="currentColor" stroke-width="2"/>' +
    '<path d="M12 2v2.4M12 19.6V22M2 12h2.4M19.6 12H22M4.9 4.9l1.7 1.7M17.4 17.4l1.7 1.7M19.1 4.9l-1.7 1.7M6.6 17.4l-1.7 1.7" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';
  var SVG_MOON = '<svg class="ico moon" viewBox="0 0 24 24" aria-hidden="true"><path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5Z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg>';

  /** Pinta el icono sol/luna según el tema activo y lo guarda en localStorage */
  function applyTheme(theme, notify) {
    state.theme = theme;
    document.body.classList.toggle('theme-dark', theme === 'dark');
    localStorage.setItem('ampia_theme', theme);
    themeIcons.innerHTML = SVG_SUN + SVG_MOON;
    themeToggle.setAttribute('aria-label', t('action.theme'));
    themeToggle.setAttribute('title', theme === 'dark' ? t('theme.toLight') : t('theme.toDark'));
    var meta = $('meta[name="theme-color"]');
    if (meta) { meta.setAttribute('content', theme === 'dark' ? '#151114' : '#F3F0EC'); }
    if (notify) { toast(theme === 'dark' ? t('theme.toDark') : t('theme.toLight')); }
  }

  themeToggle.addEventListener('click', function () {
    applyTheme(state.theme === 'dark' ? 'light' : 'dark', true);
  });

  /* ══════════ 5. IDIOMA (ES / EN / VA) ══════════ */
  /** Aplica el idioma a todos los elementos con data-i18n y repinta lo dinámico */
  function applyLang(lang) {
    state.lang = lang;
    localStorage.setItem('ampia_lang', lang);
    document.documentElement.lang = lang === 'va' ? 'ca' : lang;

    $$('[data-i18n]').forEach(function (el) {
      var val = t(el.getAttribute('data-i18n'));
      if (val !== el.getAttribute('data-i18n')) { el.textContent = val; }
    });
    $$('[data-i18n-ph]').forEach(function (el) {
      el.setAttribute('placeholder', t(el.getAttribute('data-i18n-ph')));
    });
    $$('[data-i18n-aria]').forEach(function (el) {
      el.setAttribute('aria-label', t(el.getAttribute('data-i18n-aria')));
    });

    // Estado visual de los selectores de idioma
    $$('.lang-opt').forEach(function (b) { b.classList.toggle('is-active', b.dataset.lang === lang); });
    $$('.lang-pill').forEach(function (b) { b.classList.toggle('is-active', b.dataset.lang === lang); });
    $('#langCurrent').textContent = lang.toUpperCase();

    // Repintar elementos generados por JavaScript
    renderMarquee();
    renderProducts();
    renderReviews();
    renderCart();
    renderSearchChips();
    $('#authSubmit').textContent = $('#authTabRegister').classList.contains('is-active') ? t('auth.submitReg') : t('auth.submit');
    applyTheme(state.theme, false);

    // Refrescar la búsqueda activa para que los resaltados sigan en el nuevo idioma
    if (state.searchTerm && state.searchTerm.length > 1) {
      searchInput.value = state.searchTerm;
      runSearch(state.searchTerm);
    }
  }

  function bindLangButtons() {
    $$('.lang-opt, .lang-pill').forEach(function (btn) {
      btn.addEventListener('click', function () {
        applyLang(btn.dataset.lang);
        $('#langSwitch').classList.remove('is-open');
        $('#langBtn').setAttribute('aria-expanded', 'false');
      });
    });
    var langBtn = $('#langBtn');
    langBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      var open = $('#langSwitch').classList.toggle('is-open');
      langBtn.setAttribute('aria-expanded', String(open));
    });
    document.addEventListener('click', function () {
      $('#langSwitch').classList.remove('is-open');
      langBtn.setAttribute('aria-expanded', 'false');
    });
  }

  /* ══════════ 6. HEADER, SCROLL Y REVEAL ══════════ */
  var header = $('#siteHeader');
  var progressBar = $('#scrollProgressBar');
  var backToTop = $('#backToTop');
  var sections = $$('main section[id]');

  /** Desplazamiento suave a secciones teniendo en cuenta el header fijo */
  function scrollToTarget(hash) {
    var target = document.querySelector(hash);
    if (!target) { return; }
    var offset = header.offsetHeight + 16;
    var top = target.getBoundingClientRect().top + window.pageYOffset - offset;
    window.scrollTo({ top: top < 0 ? 0 : top, behavior: reducedMotion ? 'auto' : 'smooth' });
  }

  document.addEventListener('click', function (e) {
    var link = e.target.closest('a[href^="#"]');
    if (!link) { return; }
    var hash = link.getAttribute('href');
    if (hash === '#' || hash.length < 2) { return; }
    if (link.dataset.modalOpen) { return; }
    var target = document.querySelector(hash);
    if (!target) { return; }
    e.preventDefault();
    closeMobileMenu();
    scrollToTarget(hash);
    if (history.replaceState) { history.replaceState(null, '', hash); }
  });

  /** Evento de scroll: progreso, header compacto, topbar y enlace activo */
  function onScroll() {
    var y = window.pageYOffset;
    var max = document.documentElement.scrollHeight - window.innerHeight;
    progressBar.style.width = (max > 0 ? (y / max) * 100 : 0) + '%';
    header.classList.toggle('is-stuck', y > 24);
    document.body.classList.toggle('topbar-hidden', y > 220);
    var showTop = y > 620;
    backToTop.classList.toggle('is-on', showTop);
    backToTop.tabIndex = showTop ? 0 : -1;
    backToTop.setAttribute('aria-hidden', String(!showTop));

    // Scroll spy sobre la navegación principal
    var current = '';
    sections.forEach(function (sec) {
      var rect = sec.getBoundingClientRect();
      if (rect.top <= header.offsetHeight + 90 && rect.bottom > header.offsetHeight + 90) { current = sec.id; }
    });
    $$('.nav-link').forEach(function (a) {
      a.classList.toggle('is-active', a.getAttribute('href') === '#' + current);
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  backToTop.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' });
  });

  /** Aparición de secciones al hacer scroll */
  function initReveal() {
    if (!('IntersectionObserver' in window)) {
      $$('.reveal').forEach(function (el) { el.classList.add('is-visible'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    $$('.reveal').forEach(function (el, i) {
      el.dataset.delay = String(i % 4);
      io.observe(el);
    });
  }

  /* ══════════ 7. MENÚ MÓVIL ══════════ */
  var hamburger = $('#hamburgerToggle');
  var mobileMenu = $('#mobileMenu');

  /** Coloca el panel móvil justo debajo del header, esté o no compactado */
  function positionMobileMenu() {
    mobileMenu.style.top = (header.getBoundingClientRect().bottom + 12) + 'px';
  }

  function openMobileMenu() {
    mobileMenu.hidden = false;
    positionMobileMenu();
    hamburger.classList.add('is-open');
    hamburger.setAttribute('aria-expanded', 'true');
    mobileMenu.setAttribute('aria-hidden', 'false');
    document.body.classList.add('menu-open');
    requestAnimationFrame(function () { mobileMenu.classList.add('is-open'); });
  }

  function closeMobileMenu() {
    if (!mobileMenu.classList.contains('is-open')) { return; }
    mobileMenu.classList.remove('is-open');
    hamburger.classList.remove('is-open');
    hamburger.setAttribute('aria-expanded', 'false');
    mobileMenu.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('menu-open');
    setTimeout(function () { mobileMenu.hidden = true; }, reducedMotion ? 0 : 550);
  }

  hamburger.addEventListener('click', function () {
    mobileMenu.classList.contains('is-open') ? closeMobileMenu() : openMobileMenu();
  });

  // Cerrar al pulsar un enlace del menú
  $$('#mobileMenu a[href^="#"]').forEach(function (a) { a.addEventListener('click', closeMobileMenu); });

  // Cerrar al cambiar el tamaño de la pantalla (si ya no hace falta el menú móvil)
  window.addEventListener('resize', debounce(function () {
    if (window.innerWidth > 1180) { closeMobileMenu(); }
    else if (mobileMenu.classList.contains('is-open')) { positionMobileMenu(); }
  }, 140));

  // Botón de búsqueda dentro del menú móvil
  $('#mobileSearch').addEventListener('click', function () {
    closeMobileMenu();
    setTimeout(openSearchModal, 180);
  });

  // Cerrar al hacer clic fuera del panel móvil
  document.addEventListener('click', function (e) {
    if (!mobileMenu.classList.contains('is-open')) { return; }
    if (mobileMenu.contains(e.target) || header.contains(e.target)) { return; }
    closeMobileMenu();
  });

  /* ══════════ GESTIÓN GENÉRICA DE OVERLAYS ══════════ */
  var openOverlays = [];
  var lastFocused = null;

  function lockScroll() { document.body.classList.add('no-scroll'); }
  function unlockScroll() { if (!openOverlays.length) { document.body.classList.remove('no-scroll'); } }

  function openOverlay(el) {
    if (openOverlays.indexOf(el) !== -1) { return; }
    lastFocused = document.activeElement;
    el.hidden = false;
    lockScroll();
    openOverlays.push(el);
    requestAnimationFrame(function () {
      el.classList.add('is-open');
      if (el.id === 'cartDrawer') { $('#scrim').hidden = false; requestAnimationFrame(function () { $('#scrim').classList.add('is-open'); }); }
      var focusable = el.querySelector('input:not([type=hidden]), select, textarea, button');
      if (focusable && !reducedMotion) { setTimeout(function () { focusable.focus(); }, 260); }
    });
  }

  function closeOverlay(el) {
    var i = openOverlays.indexOf(el);
    if (i === -1) { return; }
    openOverlays.splice(i, 1);
    el.classList.remove('is-open');
    if (el.id === 'cartDrawer') {
      $('#scrim').classList.remove('is-open');
      setTimeout(function () { $('#scrim').hidden = true; }, 400);
    }
    setTimeout(function () {
      el.hidden = true;
      unlockScroll();
      if (lastFocused && lastFocused.focus) { lastFocused.focus(); }
    }, reducedMotion ? 0 : 420);
  }

  // Cierre con clic fuera del diálogo, botón X genérico y tecla Escape
  $$('.modal').forEach(function (modal) {
    modal.addEventListener('click', function (e) { if (e.target === modal) { closeOverlay(modal); } });
  });
  $('#scrim').addEventListener('click', function () { closeOverlay($('#cartDrawer')); });
  $$('[data-modal-close]').forEach(function (b) {
    b.addEventListener('click', function () { closeOverlay(b.closest('.modal')); });
  });
  $$('[data-modal-open]').forEach(function (b) {
    b.addEventListener('click', function (e) {
      e.preventDefault();
      var el = document.getElementById(b.dataset.modalOpen);
      if (el) { openOverlay(el); }
    });
  });
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') { return; }
    closeMobileMenu();
    $('#langSwitch').classList.remove('is-open');
    if (openOverlays.length) { closeOverlay(openOverlays[openOverlays.length - 1]); }
  });

  // Trampa de foco básica dentro del overlay activo
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Tab' || !openOverlays.length) { return; }
    var el = openOverlays[openOverlays.length - 1];
    var f = $$('a[href], button:not([disabled]), input:not([disabled]), select, textarea', el)
      .filter(function (n) { return n.offsetParent !== null; });
    if (!f.length) { return; }
    var first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  });

  /* ══════════ 8. TIENDA: CATÁLOGO Y FILTROS ══════════ */
  var grid = $('#productGrid');
  var productCount = $('#productCount');

  function productName(p) { return p.name[state.lang] || p.name.es; }
  function productDesc(p) { return p.desc[state.lang] || p.desc.es; }

  function badgeLabel(kind) { return kind ? t('shop.' + kind) : ''; }

  /** Devuelve la lista de productos filtrada y ordenada */
  function visibleProducts() {
    var list = PRODUCTS.filter(function (p) {
      var okCat = state.filters.cat === 'all' || p.cat === state.filters.cat;
      var okSize = state.filters.size === 'all' || p.sizes.indexOf(state.filters.size) !== -1;
      return okCat && okSize;
    });
    var sorters = {
      'price-asc': function (a, b) { return a.price - b.price; },
      'price-desc': function (a, b) { return b.price - a.price; },
      'name': function (a, b) { return productName(a).localeCompare(productName(b)); },
      'featured': function (a, b) { return a.rank - b.rank; }
    };
    return list.sort(sorters[state.filters.sort] || sorters.featured);
  }

  function sizeChipsHTML(p, prefix) {
    return SIZES.map(function (s) {
      var has = p.sizes.indexOf(s) !== -1;
      return '<button type="button" class="size-chip" data-size="' + s + '" data-id="' + p.id + '" data-group="' + prefix + '"' +
        (has ? '' : ' disabled aria-label="' + s + ' no disponible"') + '>' + s + '</button>';
    }).join('');
  }

  function productCardHTML(p) {
    var wished = state.wishlist.indexOf(p.id) !== -1;
    var off = p.oldPrice ? Math.round((1 - p.price / p.oldPrice) * 100) : 0;
    return '' +
      '<article class="product-card reveal" data-search-block data-id="' + p.id + '">' +
        '<div class="product-media">' +
          '<img src="' + p.img + '" alt="' + esc(productName(p)) + '" loading="lazy">' +
          (p.badge ? '<div class="product-badges"><span class="badge ' + (p.badge === 'sale' ? 'sale' : p.badge === 'new' ? 'new' : '') + '">' + badgeLabel(p.badge) + '</span></div>' : '') +
          '<button type="button" class="wish-btn' + (wished ? ' is-on' : '') + '" data-wish="' + p.id + '" aria-label="Favorito" aria-pressed="' + wished + '">' +
            '<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20s-7.5-4.6-7.5-9.4A4.1 4.1 0 0 1 12 8.2a4.1 4.1 0 0 1 7.5 2.4C19.5 15.4 12 20 12 20Z" stroke-linejoin="round"/></svg>' +
          '</button>' +
          '<button type="button" class="quick-btn" data-quickview="' + p.id + '">' + t('shop.quick') + '</button>' +
        '</div>' +
        '<div class="product-body">' +
          '<span class="product-cat">' + t('shop.cat.' + p.cat) + '</span>' +
          '<h3 class="product-name">' + esc(productName(p)) + '</h3>' +
          '<div class="product-price"><span class="now">' + money(p.price) + '</span>' +
            (p.oldPrice ? '<span class="was">' + money(p.oldPrice) + '</span><span class="off">-' + off + '%</span>' : '') +
          '</div>' +
          '<div class="size-row" data-sizes="' + p.id + '" role="group" aria-label="' + t('quick.size') + '">' + sizeChipsHTML(p, 'card') + '</div>' +
          '<div class="product-add"><button type="button" class="btn btn-outline btn-sm" data-add="' + p.id + '">' + t('shop.add') + '</button></div>' +
        '</div>' +
      '</article>';
  }

  function renderProducts() {
    var list = visibleProducts();
    grid.innerHTML = list.map(productCardHTML).join('');
    productCount.textContent = list.length === 1 ? t('shop.resultsOne') : t('shop.results', { n: list.length });

    // Mantener visibles los elementos nuevos
    var io = window.__revealObserver;
    $$('.product-card', grid).forEach(function (el) {
      if (io) { io.observe(el); } else { el.classList.add('is-visible'); }
    });
    // Volver a marcar coincidencias si hay una búsqueda activa
    if (state.searchTerm.length > 1) { highlightTerm(state.searchTerm, true); }
  }

  /** Observer global reutilizable para las tarjetas de producto */
  function initProductReveal() {
    if (!('IntersectionObserver' in window)) { return; }
    window.__revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          window.__revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -6% 0px' });
  }

  function buildShopFilters() {
    var cats = ['all', 'dresses', 'blouses', 'pants', 'outerwear', 'knit'];
    $('#categoryFilters').innerHTML = cats.map(function (c) {
      var label = c === 'all' ? t('shop.all') : t('shop.cat.' + c);
      return '<button type="button" class="chip' + (state.filters.cat === c ? ' is-active' : '') + '" data-cat="' + c + '">' + label + '</button>';
    }).join('');

    $('#sizeFilter').innerHTML = '<option value="all">' + t('shop.sizeAll') + '</option>' +
      SIZES.map(function (s) { return '<option value="' + s + '">' + t('sizes.colSize') + ' ' + s + '</option>'; }).join('');
    $('#sizeFilter').value = state.filters.size;

    $('#categoryFilters').addEventListener('click', function (e) {
      var chip = e.target.closest('[data-cat]');
      if (!chip) { return; }
      state.filters.cat = chip.dataset.cat;
      $$('#categoryFilters .chip').forEach(function (c) { c.classList.toggle('is-active', c === chip); });
      renderProducts();
    });
    $('#sizeFilter').addEventListener('change', function () {
      state.filters.size = this.value;
      renderProducts();
    });
    $('#sortFilter').addEventListener('change', function () {
      state.filters.sort = this.value;
      renderProducts();
    });
  }

  /** Selección de talla en tarjeta o vista rápida */
  function bindSizeSelection() {
    document.addEventListener('click', function (e) {
      var chip = e.target.closest('.size-chip:not([disabled])');
      if (!chip) { return; }
      var group = chip.dataset.group;
      $$('.size-chip[data-group="' + group + '"][data-id="' + chip.dataset.id + '"]').forEach(function (c) {
        c.classList.toggle('is-active', c === chip);
      });
      if (group === 'quick') { window.__quickSize = chip.dataset.size; $('#quickError').textContent = ''; }
      else { window.__cardSize = window.__cardSize || {}; window.__cardSize[chip.dataset.id] = chip.dataset.size; }
    });
  }

  /** Añadir al carrito (desde tarjeta o vista rápida) */
  function addToCart(id, size, qty) {
    var p = PRODUCTS.filter(function (x) { return x.id === id; })[0];
    if (!p) { return false; }
    if (!size) { toast(t('shop.needSize'), 'err'); return false; }
    qty = qty || 1;
    var line = state.cart.filter(function (l) { return l.id === id && l.size === size; })[0];
    if (line) { line.qty += qty; } else {
      state.cart.push({ uid: id + '-' + size + '-' + Date.now(), id: id, size: size, qty: qty });
    }
    persistCart();
    renderCart();
    bumpBadge();
    toast(t('shop.added', { name: productName(p), size: size }));
    return true;
  }

  // Delegación de eventos en la rejilla de productos
  grid.addEventListener('click', function (e) {
    var wishBtn = e.target.closest('[data-wish]');
    if (wishBtn) { toggleWish(wishBtn.dataset.wish, wishBtn); return; }
    var addBtn = e.target.closest('[data-add]');
    if (addBtn) {
      var id = addBtn.dataset.add;
      var size = (window.__cardSize && window.__cardSize[id]) || '';
      if (!size) {
        var row = $('[data-sizes="' + id + '"]', grid);
        row.animate ? row.animate([{ transform: 'translateX(0)' }, { transform: 'translateX(-6px)' }, { transform: 'translateX(6px)' }, { transform: 'translateX(0)' }], { duration: 320 }) : null;
        toast(t('shop.needSize'), 'err');
        return;
      }
      addToCart(id, size, 1);
      return;
    }
    var quickBtn = e.target.closest('[data-quickview]');
    if (quickBtn) { openQuickView(quickBtn.dataset.quickview); }
  });

  function toggleWish(id, btn) {
    var i = state.wishlist.indexOf(id);
    if (i === -1) { state.wishlist.push(id); toast(t('shop.wishOn')); }
    else { state.wishlist.splice(i, 1); toast(t('shop.wishOff')); }
    save('ampia_wish', state.wishlist);
    if (btn) {
      btn.classList.toggle('is-on', i === -1);
      btn.setAttribute('aria-pressed', String(i === -1));
    }
    $$('.product-card[data-id="' + id + '"] .wish-btn').forEach(function (b) {
      b.classList.toggle('is-on', state.wishlist.indexOf(id) !== -1);
    });
  }

  /* ══════════ 9. VISTA RÁPIDA DE PRODUCTO ══════════ */
  var quickModal = $('#quickModal');

  function openQuickView(id) {
    var p = PRODUCTS.filter(function (x) { return x.id === id; })[0];
    if (!p) { return; }
    window.__quickSize = '';
    window.__quickQty = 1;
    var off = p.oldPrice ? Math.round((1 - p.price / p.oldPrice) * 100) : 0;
    $('#quickBody').innerHTML = '' +
      '<div class="quick-grid">' +
        '<div class="quick-media"><img src="' + p.img + '" alt="' + esc(productName(p)) + '"></div>' +
        '<div class="quick-info">' +
          '<span class="product-cat">' + t('shop.cat.' + p.cat) + '</span>' +
          '<h3>' + esc(productName(p)) + '</h3>' +
          '<div class="quick-price"><span class="now">' + money(p.price) + '</span>' +
            (p.oldPrice ? '<span class="was">' + money(p.oldPrice) + '</span><span class="off">-' + off + '%</span>' : '') + '</div>' +
          '<p class="quick-desc">' + esc(productDesc(p)) + '</p>' +
          '<span class="quick-label">' + t('quick.size') + ' · ' + t('sizes.colSize') + '</span>' +
          '<div class="quick-sizes size-row">' + sizeChipsHTML(p, 'quick') + '</div>' +
          '<span class="quick-label">' + t('quick.qty') + '</span>' +
          '<div class="qty-row">' +
            '<div class="qty"><button type="button" data-q="-1" aria-label="-">−</button>' +
            '<input type="text" id="quickQtyInput" value="1" inputmode="numeric" aria-label="' + t('quick.qty') + '">' +
            '<button type="button" data-q="1" aria-label="+">+</button></div>' +
            '<button type="button" class="btn btn-primary" id="quickAdd">' + t('quick.add') + '</button>' +
          '</div>' +
          '<p class="quick-error" id="quickError"></p>' +
          '<ul class="quick-meta">' +
            '<li><svg class="ico" viewBox="0 0 24 24"><path d="M2 7h11v9H2zM13 10h4.5l3.5 3.5V16h-8z" fill="none" stroke="currentColor" stroke-width="1.8"/></svg>' + t('quick.m1') + '</li>' +
            '<li><svg class="ico" viewBox="0 0 24 24"><path d="M4 4h16v16H4z" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="m8 12 3 3 5-6" fill="none" stroke="currentColor" stroke-width="1.8"/></svg>' + t('quick.m2') + '</li>' +
            '<li><svg class="ico" viewBox="0 0 24 24"><rect x="3" y="6" width="18" height="12" rx="2" fill="none" stroke="currentColor" stroke-width="1.8"/></svg>' + t('quick.m3') + '</li>' +
            '<li><strong>' + t('quick.colors') + ':</strong>&nbsp;' + (p.colors[state.lang] || p.colors.es) + '</li>' +
            '<li><strong>' + t('quick.fabric') + ':</strong>&nbsp;' + (p.fabric[state.lang] || p.fabric.es) + '</li>' +
            '<li><strong>' + t('quick.ref') + ':</strong>&nbsp;AM-' + p.id.toUpperCase() + '</li>' +
          '</ul>' +
        '</div>' +
      '</div>';
    openOverlay(quickModal);

    $('#quickBody').querySelectorAll('[data-q]').forEach(function (b) {
      b.addEventListener('click', function () {
        var input = $('#quickQtyInput');
        window.__quickQty = Math.min(20, Math.max(1, window.__quickQty + parseInt(b.dataset.q, 10)));
        input.value = window.__quickQty;
      });
    });
    $('#quickAdd').addEventListener('click', function () {
      if (!window.__quickSize) { $('#quickError').textContent = t('err.size'); return; }
      if (addToCart(id, window.__quickSize, window.__quickQty)) {
        closeOverlay(quickModal);
        setTimeout(openCart, 260);
      }
    });
  }

  // Botón "Ver prenda" de la tarjeta del hero
  document.addEventListener('click', function (e) {
    var hv = e.target.closest('[data-quickview]');
    if (hv && !grid.contains(hv)) { openQuickView(hv.dataset.quickview); }
  });

  $('#quickClose').addEventListener('click', function () { closeOverlay(quickModal); });

  /* ══════════ 10. CARRITO DE COMPRA Y CHECKOUT ══════════ */
  var cartDrawer = $('#cartDrawer');
  var cartBadge = $('#cartBadge');

  function persistCart() { save('ampia_cart', state.cart); }
  function cartCount() { return state.cart.reduce(function (n, l) { return n + l.qty; }, 0); }
  function findProduct(id) { return PRODUCTS.filter(function (p) { return p.id === id; })[0]; }

  function bumpBadge() {
    var n = cartCount();
    cartBadge.textContent = n;
    cartBadge.classList.toggle('is-on', n > 0);
    cartBadge.classList.remove('bump');
    void cartBadge.offsetWidth;
    cartBadge.classList.add('bump');
  }

  /** Cálculo de totales: subtotal, descuento, envío, recargo e IVA */
  function totals() {
    var subtotal = state.cart.reduce(function (sum, l) {
      var p = findProduct(l.id);
      return sum + (p ? p.price * l.qty : 0);
    }, 0);
    var discount = 0;
    var freeShipCoupon = false;
    if (state.coupon) {
      var val = COUPONS[state.coupon];
      if (val === 'freeship') { freeShipCoupon = true; }
      else if (typeof val === 'number') { discount = subtotal * val; }
    }
    var net = Math.max(0, subtotal - discount);
    var shipping = 0;
    if (state.delivery === 'shipping') {
      shipping = state.shipMethod === 'express' ? SHIP_EXP : (net >= FREE_SHIPPING_FROM ? 0 : SHIP_STD);
      if (freeShipCoupon) { shipping = 0; }
    }
    var surcharge = state.payment === 'ondelivery' ? COD_FEE : 0;
    var total = net + shipping + surcharge;
    return {
      count: cartCount(), subtotal: subtotal, discount: discount, net: net,
      shipping: shipping, surcharge: surcharge, total: total,
      vat: total - total / (1 + VAT), base: total / (1 + VAT), freeShipCoupon: freeShipCoupon
    };
  }

  function cartItemHTML(line) {
    var p = findProduct(line.id);
    if (!p) { return ''; }
    return '' +
      '<div class="cart-item" data-uid="' + line.uid + '">' +
        '<img src="' + p.img + '" alt="' + esc(productName(p)) + '" loading="lazy">' +
        '<div class="cart-item-info">' +
          '<span class="cart-item-name">' + esc(productName(p)) + '</span>' +
          '<span class="cart-item-meta">' + t('shop.cat.' + p.cat) + ' · ' + t('cart.size') + ' ' + line.size + '</span>' +
          '<div class="cart-item-bottom">' +
            '<div class="qty">' +
              '<button type="button" data-dec="' + line.uid + '" aria-label="−">−</button>' +
              '<input type="text" value="' + line.qty + '" readonly aria-label="' + t('cart.qty') + '">' +
              '<button type="button" data-inc="' + line.uid + '" aria-label="+">+</button>' +
            '</div>' +
            '<button type="button" class="remove-btn" data-remove="' + line.uid + '">' + t('cart.remove') + '</button>' +
          '</div>' +
        '</div>' +
        '<div class="cart-item-right"><span class="cart-item-price">' + money(p.price * line.qty) + '</span></div>' +
      '</div>';
  }

  function summaryRowsHTML(tt, withVat) {
    var rows = '';
    rows += '<div class="summary-row"><span>' + t('cart.subtotal', { n: tt.count }) + '</span><span>' + money(tt.subtotal) + '</span></div>';
    if (tt.discount > 0) {
      rows += '<div class="summary-row discount"><span>' + t('cart.discount', { code: state.coupon }) + '</span><span>−' + money(tt.discount) + '</span></div>';
    }
    rows += '<div class="summary-row"><span>' + t('cart.shippingCost') + '</span><span>' +
      (tt.shipping === 0 ? t('cart.free') : money(tt.shipping)) + '</span></div>';
    if (tt.surcharge > 0) {
      rows += '<div class="summary-row"><span>' + t('cart.surcharge') + '</span><span>' + money(tt.surcharge) + '</span></div>';
    }
    rows += '<div class="summary-row total"><span>' + t('cart.total') + '</span><span>' + money(tt.total) + '</span></div>';
    if (withVat) {
      rows += '<div class="summary-row"><span>' + t('cart.vatIncluded', { vat: money(tt.vat) }) + '</span><span></span></div>';
    }
    return rows;
  }

  function totalsFootHTML() {
    var tt = totals();
    if (!state.cart.length) { return ''; }
    var html = '';
    html += '<div class="totals-row"><span>' + t('cart.subtotal', { n: tt.count }) + '</span><span>' + money(tt.subtotal) + '</span></div>';
    if (tt.discount > 0) {
      html += '<div class="totals-row" style="color:var(--ok)"><span>' + t('cart.discount', { code: state.coupon }) + '</span><span>−' + money(tt.discount) + '</span></div>';
    }
    if (state.delivery === 'shipping') {
      html += '<div class="totals-row' + (tt.shipping === 0 ? ' free' : '') + '"><span>' + t('cart.shippingCost') + '</span><span>' +
        (tt.shipping === 0 ? t('cart.free') : money(tt.shipping)) + '</span></div>';
    }
    if (tt.surcharge > 0) {
      html += '<div class="totals-row"><span>' + t('cart.surcharge') + '</span><span>' + money(tt.surcharge) + '</span></div>';
    }
    html += '<div class="totals-row grand"><span>' + t('cart.total') + '</span><span>' + money(tt.total) + '</span></div>';
    html += '<div class="totals-row"><span style="font-size:.76rem">' + t('cart.vatIncluded', { vat: money(tt.vat) }) + '</span><span></span></div>';
    return html;
  }

  /** Pinta el carrito completo según el paso activo */
  function renderCart() {
    var tt = totals();
    $('#cartItems').innerHTML = state.cart.map(cartItemHTML).join('') +
      (state.cart.length ? '<button type="button" class="link-btn" id="clearCart" style="margin-top:14px">' + t('cart.clear') + '</button>' : '');
    $('#cartEmpty').hidden = state.cart.length > 0;
    $('#cartTotals').innerHTML = totalsFootHTML();
    $('#summaryPayment').innerHTML = '<h4>' + t('cart.step1') + '</h4>' + summaryRowsHTML(tt, true);
    $('#cartStepLabel').textContent = t('cart.stepLabel' + state.step);
    bumpBadge();

    // Coherencia entrega/pago: el contra reembolso solo tiene sentido con envío a domicilio
    var codOption = $('input[name="payment"][value="ondelivery"]');
    if (codOption) {
      codOption.disabled = state.delivery !== 'shipping';
      if (codOption.disabled && state.payment === 'ondelivery') {
        state.payment = 'pickup';
        $('input[name="payment"][value="pickup"]').checked = true;
      }
    }

    // Estado de los pasos
    $$('#cartSteps li').forEach(function (li) {
      var n = parseInt(li.dataset.step, 10);
      li.classList.toggle('is-active', n === state.step);
      li.classList.toggle('is-done', n < state.step);
    });
    $$('.cart-panel').forEach(function (p) { p.classList.remove('is-active'); });
    var panelId = ['panelCart', 'panelDelivery', 'panelPayment', 'panelDone'][state.step - 1];
    $('#' + panelId).classList.add('is-active');

    // Botones del pie según el paso
    var back = $('#cartBack');
    var next = $('#cartNext');
    back.hidden = state.step === 1 || state.step === 4;
    if (state.step === 1) { next.textContent = t('cart.continue'); }
    if (state.step === 2) { next.textContent = t('cart.toPayment'); }
    if (state.step === 3) { next.textContent = state.payment === 'pickup' && state.delivery === 'pickup' ? t('cart.reserve') : t('cart.confirmOrder'); }
    if (state.step === 4) { next.textContent = t('cart.keepShopping'); back.hidden = true; }
    next.disabled = state.step === 1 && !state.cart.length;
  }

  function setStep(n) {
    state.step = Math.min(4, Math.max(1, n));
    renderCart();
    $('.cart-scroll').scrollTop = 0;
  }

  function openCart() {
    // Si se reabre con la cesta vacía tras confirmar, volvemos al primer paso
    if (!state.cart.length && state.step === 4) { state.step = 1; }
    renderCart();
    openOverlay(cartDrawer);
  }
  function closeCart() { closeOverlay(cartDrawer); }

  $('#cartToggle').addEventListener('click', openCart);
  $('#cartClose').addEventListener('click', closeCart);
  $('#cartBack').addEventListener('click', function () { setStep(state.step - 1); });
  $('#cartNext').addEventListener('click', function () {
    if (state.step === 1) { if (!state.cart.length) { return; } setStep(2); return; }
    if (state.step === 2) { if (validateDelivery()) { setStep(3); } return; }
    if (state.step === 3) { submitOrder(); return; }
    if (state.step === 4) {
      closeCart();
      setStep(1);
      scrollToTarget('#coleccion');
    }
  });

  // Botón "Ver la colección" con la cesta vacía
  document.addEventListener('click', function (e) {
    var b = e.target.closest('[data-close-and-scroll]');
    if (!b) { return; }
    closeCart();
    setTimeout(function () { scrollToTarget(b.dataset.closeAndScroll); }, 240);
  });

  // Cambios de cantidad, eliminación y vaciado (delegados)
  $('#cartItems').addEventListener('click', function (e) {
    var inc = e.target.closest('[data-inc]');
    var dec = e.target.closest('[data-dec]');
    var rem = e.target.closest('[data-remove]');
    if (e.target.closest('#clearCart')) {
      state.cart = []; state.coupon = null; persistCart(); renderCart(); toast(t('cart.cleared'));
      return;
    }
    var uid = inc ? inc.dataset.inc : dec ? dec.dataset.dec : rem ? rem.dataset.remove : null;
    if (!uid) { return; }
    var line = state.cart.filter(function (l) { return l.uid === uid; })[0];
    if (!line) { return; }
    if (inc) { line.qty = Math.min(20, line.qty + 1); }
    if (dec) { line.qty -= 1; }
    if (line.qty <= 0 || rem) {
      state.cart = state.cart.filter(function (l) { return l.uid !== uid; });
      if (rem) { toast(t('cart.removed')); }
    }
    persistCart();
    renderCart();
  });

  // Cupón de descuento
  $('#couponApply').addEventListener('click', function () {
    var code = $('#couponInput').value.trim().toUpperCase();
    var msg = $('#couponMsg');
    if (COUPONS[code]) {
      state.coupon = code;
      msg.className = 'coupon-msg ok';
      msg.textContent = t('cart.couponOk', { code: code, val: COUPONS[code] === 'freeship' ? t('cart.free') : '-' + (COUPONS[code] * 100) + '%' });
      toast(msg.textContent);
    } else {
      state.coupon = null;
      msg.className = 'coupon-msg err';
      msg.textContent = t('cart.couponErr');
    }
    renderCart();
  });

  // Opciones de entrega y de pago
  $$('input[name="delivery"]').forEach(function (r) {
    r.addEventListener('change', function () {
      state.delivery = r.value;
      $('#pickupBlock').hidden = state.delivery !== 'pickup';
      $('#shippingBlock').hidden = state.delivery !== 'shipping';
      // Coherencia entre entrega y método de pago
      var payPickup = $('input[name="payment"][value="pickup"]');
      var payCod = $('input[name="payment"][value="ondelivery"]');
      if (state.delivery === 'pickup') { payCod.disabled = true; if (state.payment === 'ondelivery') { payPickup.checked = true; state.payment = 'pickup'; } }
      else { payCod.disabled = false; }
      renderCart();
    });
  });
  $('#shipMethod').addEventListener('change', function () { state.shipMethod = this.value; renderCart(); });
  $$('input[name="payment"]').forEach(function (r) {
    r.addEventListener('change', function () { state.payment = r.value; renderCart(); });
  });

  /** Validación del paso de entrega con mensajes en línea */
  function setFieldError(id, msg) {
    var input = document.getElementById(id);
    if (!input) { return false; }
    var field = input.closest('.field');
    var err = $('[data-error-for="' + id + '"]');
    var bad = Boolean(msg);
    if (field) { field.classList.toggle('has-error', bad); }
    if (err) { err.textContent = msg || ''; err.classList.toggle('is-on', bad); }
    return !bad;
  }

  function validateDelivery() {
    if (state.delivery === 'pickup') {
      var who = $('#pickupName');
      if (!who.value.trim()) { who.focus(); toast(t('cart.whoPickup') + ': ' + t('err.required'), 'err'); return false; }
      return true;
    }
    var ok = true;
    var checks = [
      ['shipName', $('#shipName').value.trim() ? '' : t('err.required')],
      ['shipSurname', $('#shipSurname').value.trim() ? '' : t('err.required')],
      ['shipAddress', $('#shipAddress').value.trim() ? '' : t('err.required')],
      ['shipZip', /^\d{5}$/.test($('#shipZip').value.trim()) ? '' : t('err.zip')],
      ['shipCity', $('#shipCity').value.trim() ? '' : t('err.required')],
      ['shipPhone', /^[+0-9 ().-]{9,}$/.test($('#shipPhone').value.trim()) ? '' : t('err.phone')]
    ];
    checks.forEach(function (c) { if (!setFieldError(c[0], c[1])) { ok = false; } });
    if (!ok) { toast(t('err.required'), 'err'); }
    return ok;
  }

  /** Confirmación del pedido: si se elige pasarela, abre la ventana de pago */
  function submitOrder() {
    var email = $('#orderEmail').value.trim();
    var terms = $('#termsCheck').checked;
    var termsError = $('[data-error-for="terms"]');
    var okEmail = setFieldError('orderEmail', /^[^@\s]+@[^@\s]+\.[a-z]{2,}$/i.test(email) ? '' : t('err.email'));

    termsError.textContent = terms ? '' : t('err.terms');
    termsError.classList.toggle('is-on', !terms);

    if (!okEmail) { toast(t('err.email'), 'err'); return; }
    if (!terms) { toast(t('err.terms'), 'err'); return; }

    if (state.payment === 'gateway') { openPaymentModal(); }
    else { finishOrder(false); }
  }

  /** Construye el resumen del pedido para la confirmación */
  function buildOrder() {
    var tt = totals();
    var storeSel = $('#pickupStore');
    var deliveryText = state.delivery === 'pickup'
      ? t('cart.pickupSummary', {
          store: storeSel.options[storeSel.selectedIndex].text.split('·')[0].trim(),
          date: $('#pickupDate').value || '—',
          slot: $('#pickupSlot').value
        })
      : t('cart.shipSummary', {
          address: $('#shipAddress').value.trim(),
          zip: $('#shipZip').value.trim(),
          city: $('#shipCity').value.trim()
        });
    var paymentKey = state.payment === 'pickup' ? 'cart.payPickupSummary' : (state.payment === 'ondelivery' ? 'cart.payCodSummary' : 'cart.payGatewaySummary');
    return {
      number: 'AM-' + new Date().getFullYear() + '-' + Math.floor(1000 + Math.random() * 9000),
      email: $('#orderEmail').value.trim(),
      delivery: deliveryText,
      payment: t(paymentKey),
      status: state.payment === 'gateway' ? t('cart.paid') : t('cart.pending'),
      total: money(tt.total),
      items: state.cart.map(function (l) {
        var p = findProduct(l.id);
        return productName(p) + ' · ' + t('cart.size') + ' ' + l.size + ' × ' + l.qty;
      })
    };
  }

  function finishOrder(paid) {
    var order = buildOrder();
    if (paid) { order.status = t('cart.paid'); }
    state.lastOrder = order;
    $('#doneContent').innerHTML = '' +
      '<div class="done-badge"><svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12.5 4.5 4.5L19 7"/></svg></div>' +
      '<h4>' + (state.delivery === 'pickup' ? t('cart.donePickupTitle') : t('cart.doneTitle')) + '</h4>' +
      '<p>' + t('cart.doneText', { email: esc(order.email) }) + '</p>' +
      '<ul class="done-details">' +
        '<li><span>' + t('cart.orderNum') + '</span><strong>' + order.number + '</strong></li>' +
        order.items.map(function (i) { return '<li><span>' + t('pay.items') + '</span><strong>' + esc(i) + '</strong></li>'; }).join('') +
        '<li><span>' + t('cart.delivery') + '</span><strong>' + esc(order.delivery) + '</strong></li>' +
        '<li><span>' + t('cart.payment') + '</span><strong>' + esc(order.payment) + '</strong></li>' +
        '<li><span>' + t('cart.amount') + '</span><strong>' + order.total + ' · ' + order.status + '</strong></li>' +
      '</ul>' +
      '<p>' + t('cart.doneThanks') + '</p>';
    state.cart = [];
    state.coupon = null;
    persistCart();
    setStep(4);
    toast(t('cart.doneTitle'));
  }

  /* ══════════ 11. PASARELA DE PAGO ══════════ */
  var paymentModal = $('#paymentModal');

  function openPaymentModal() {
    var tt = totals();
    $('#payTotal').textContent = money(tt.total);
    $('#payBreakdown').innerHTML = '<ul>' +
      '<li><span>' + t('pay.items') + ' (' + tt.count + ')</span><span>' + money(tt.subtotal) + '</span></li>' +
      (tt.discount > 0 ? '<li><span>' + t('cart.discount', { code: state.coupon }) + '</span><span>−' + money(tt.discount) + '</span></li>' : '') +
      '<li><span>' + t('cart.shippingCost') + '</span><span>' + (tt.shipping === 0 ? t('cart.free') : money(tt.shipping)) + '</span></li>' +
      (tt.surcharge > 0 ? '<li><span>' + t('cart.surcharge') + '</span><span>' + money(tt.surcharge) + '</span></li>' : '') +
      '<li><span>' + t('pay.vatRow') + '</span><span>' + money(tt.vat) + '</span></li>' +
      '<li class="total"><span>' + t('pay.total') + '</span><span>' + money(tt.total) + '</span></li>' +
      '</ul>';
    openOverlay(paymentModal);
  }

  $('#paymentClose').addEventListener('click', function () { closeOverlay(paymentModal); });
  $('#payCancel').addEventListener('click', function () { closeOverlay(paymentModal); });

  $('#payConfirm').addEventListener('click', function () {
    var btn = this;
    var method = ($('input[name="paymethod"]:checked') || {}).value || 'card';
    if (method === 'card') {
      var num = $('#payCardNumber').value.replace(/\s/g, '');
      if (num.length < 12) { toast(t('pay.cardNumber') + ': ' + t('err.required'), 'err'); $('#payCardNumber').focus(); return; }
    }
    btn.disabled = true;
    btn.textContent = t('pay.processing');
    // Simulación: aquí se llamará a la pasarela real del mercado
    setTimeout(function () {
      btn.disabled = false;
      btn.textContent = t('pay.confirm');
      closeOverlay(paymentModal);
      toast(t('pay.success'));
      setTimeout(function () { finishOrder(true); }, 320);
    }, 1400);
  });

  // Formateo cómodo del número de tarjeta y de la caducidad
  $('#payCardNumber').addEventListener('input', function () {
    var v = this.value.replace(/\D/g, '').slice(0, 16);
    this.value = v.replace(/(.{4})/g, '$1 ').trim();
  });
  $('#payCardExp').addEventListener('input', function () {
    var v = this.value.replace(/\D/g, '').slice(0, 4);
    this.value = v.length > 2 ? v.slice(0, 2) + '/' + v.slice(2) : v;
  });

  /* ══════════ 12. BUSCADOR CON RESALTADO ══════════ */
  var searchModal = $('#searchModal');
  var searchInput = $('#searchInput');
  var searchResults = $('#searchResults');
  var searchCount = $('#searchCount');
  var hitsPill = null;
  var blockSeq = 0;
  var SKIP_SELECTOR = 'script, style, mark, .modal, .cart-drawer, .cookie-banner, .toast-stack, .hits-pill, .visually-hidden, .hero-media, .mobile-menu';

  function openSearchModal() {
    openOverlay(searchModal);
    setTimeout(function () { searchInput.focus(); }, 300);
  }
  $('#searchToggle').addEventListener('click', openSearchModal);
  $('#searchClose').addEventListener('click', function () { closeOverlay(searchModal); });

  /** Elimina todas las marcas <mark> creadas en la página */
  function clearHighlights() {
    $$('mark.search-hit').forEach(function (m) {
      var parent = m.parentNode;
      parent.replaceChild(document.createTextNode(m.textContent), m);
      parent.normalize();
    });
    if (hitsPill) { hitsPill.remove(); hitsPill = null; }
    state.searchTerm = '';
    searchCount.textContent = t('search.hint');
  }
  $('#searchClear').addEventListener('click', function () {
    clearHighlights();
    searchResults.innerHTML = '';
    toast(t('search.marksCleared'));
  });

  function renderSearchChips() {
    var chips = SEARCH_CHIPS[state.lang] || SEARCH_CHIPS.es;
    $('#searchChips').innerHTML = chips.map(function (c) {
      return '<button type="button" class="chip" data-chip="' + esc(c) + '">' + esc(c) + '</button>';
    }).join('');
  }
  $('#searchChips').addEventListener('click', function (e) {
    var chip = e.target.closest('[data-chip]');
    if (!chip) { return; }
    searchInput.value = chip.dataset.chip;
    runSearch(chip.dataset.chip);
  });

  /**
   * Recorre los nodos de texto de la página y envuelve las coincidencias en <mark>.
   * Devuelve la lista de coincidencias para construir el listado de resultados.
   */
  function highlightTerm(term, silent) {
    clearMarksOnly();
    var q = term.trim().toLowerCase();
    if (q.length < 2) { return []; }
    var hits = [];
    var MAX = 220;

    ['#main', '.site-footer'].forEach(function (sel) {
      var root = document.querySelector(sel);
      if (!root) { return; }
      var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
        acceptNode: function (node) {
          if (!node.nodeValue || !node.nodeValue.trim()) { return NodeFilter.FILTER_REJECT; }
          var parent = node.parentElement;
          if (!parent || parent.closest(SKIP_SELECTOR)) { return NodeFilter.FILTER_REJECT; }
          return NodeFilter.FILTER_ACCEPT;
        }
      });
      var nodes = [];
      while (walker.nextNode()) { nodes.push(walker.currentNode); }
      nodes.forEach(function (node) {
        if (hits.length >= MAX) { return; }
        var text = node.nodeValue;
        var lower = text.toLowerCase();
        var idx = lower.indexOf(q);
        if (idx === -1) { return; }
        // El bloque se calcula antes de sustituir el nodo de texto
        var blockEl = blockOf(node.parentElement);
        var frag = document.createDocumentFragment();
        var cursor = 0;
        while (idx !== -1 && hits.length < MAX) {
          frag.appendChild(document.createTextNode(text.slice(cursor, idx)));
          var mark = document.createElement('mark');
          mark.className = 'search-hit';
          mark.textContent = text.slice(idx, idx + q.length);
          frag.appendChild(mark);
          hits.push({ mark: mark, block: blockEl, snippet: snippetAround(text, idx, q.length) });
          cursor = idx + q.length;
          idx = lower.indexOf(q, cursor);
        }
        frag.appendChild(document.createTextNode(text.slice(cursor)));
        node.parentNode.replaceChild(frag, node);
      });
    });

    state.searchTerm = term;
    if (!silent) { showHitsPill(hits.length); }
    return hits;
  }

  /** Borra las marcas sin tocar el estado del buscador */
  function clearMarksOnly() {
    $$('mark.search-hit').forEach(function (m) {
      var parent = m.parentNode;
      parent.replaceChild(document.createTextNode(m.textContent), m);
      parent.normalize();
    });
    if (hitsPill) { hitsPill.remove(); hitsPill = null; }
  }

  /** Bloque de contenido (sección o tarjeta) al que pertenece una coincidencia */
  function blockOf(node) {
    return node.closest('[data-search-block]') || node.closest('section, article, footer') || document.body;
  }

  function snippetAround(text, idx, len) {
    var start = Math.max(0, idx - 48);
    var end = Math.min(text.length, idx + len + 62);
    var raw = (start > 0 ? '…' : '') + text.slice(start, end).trim() + (end < text.length ? '…' : '');
    var lower = raw.toLowerCase();
    var q = text.slice(idx, idx + len).toLowerCase();
    var pos = lower.indexOf(q);
    if (pos === -1) { return esc(raw); }
    return esc(raw.slice(0, pos)) + '<mark>' + esc(raw.slice(pos, pos + q.length)) + '</mark>' + esc(raw.slice(pos + q.length));
  }

  /** Ejecuta la búsqueda: marca en la página y lista los resultados */
  function runSearch(term) {
    var q = term.trim();
    if (q.length < 2) {
      clearMarksOnly();
      searchResults.innerHTML = '';
      searchCount.textContent = t('search.hint');
      return;
    }
    var hits = highlightTerm(q);
    if (!hits.length) {
      searchResults.innerHTML = '<li class="search-none">' + t('search.none', { q: esc(q) }) + '</li>';
      searchCount.textContent = t('search.none', { q: esc(q) });
      return;
    }

    // Agrupar coincidencias por bloque de contenido
    var groups = [];
    var map = {};
    hits.forEach(function (h) {
      var block = h.block;
      // Clave estable por bloque para agrupar coincidencias del mismo contenido
      if (!block.dataset.blockKey) { block.dataset.blockKey = 'blk' + (++blockSeq); }
      var key = block.dataset.blockKey;
      if (!map[key]) {
        var heading = block.querySelector('h1, h2, h3, .product-name');
        map[key] = { block: block, title: heading ? heading.textContent.trim() : block.className, hits: [] };
        groups.push(map[key]);
      }
      if (map[key].hits.length < 3) { map[key].hits.push(h); }
    });

    searchResults.innerHTML = groups.map(function (g, i) {
      return '<li>' + g.hits.map(function (h, j) {
        return '<button type="button" data-goto="' + i + '" data-hit="' + j + '">' +
          '<span class="r-title">' + esc(g.title).slice(0, 60) + '</span>' +
          '<span class="r-text">' + h.snippet + '</span></button>';
      }).join('') + '</li>';
    }).join('');

    searchCount.textContent = hits.length === 1 ? t('search.resultsOne', { q: esc(q) }) : t('search.resultsFor', { n: hits.length, q: esc(q) });

    searchResults.onclick = function (e) {
      var btn = e.target.closest('[data-goto]');
      if (!btn) { return; }
      var g = groups[parseInt(btn.dataset.goto, 10)];
      var hit = g.hits[parseInt(btn.dataset.hit, 10)] || g.hits[0];
      closeOverlay(searchModal);
      setTimeout(function () {
        var top = g.block.getBoundingClientRect().top + window.pageYOffset - header.offsetHeight - 30;
        window.scrollTo({ top: Math.max(0, top), behavior: reducedMotion ? 'auto' : 'smooth' });
        if (hit.mark && hit.mark.classList) {
          hit.mark.classList.add('is-flash');
          setTimeout(function () { hit.mark.classList.remove('is-flash'); }, 2300);
        }
      }, 320);
    };
  }

  /** Píldora flotante que indica cuántas coincidencias siguen resaltadas */
  function showHitsPill(n) {
    if (!n) { return; }
    var label = t('search.hitsPill', { n: n });
    if (hitsPill) { hitsPill.querySelector('span').textContent = label; return; }
    hitsPill = document.createElement('div');
    hitsPill.className = 'hits-pill';
    hitsPill.innerHTML = '<span>' + esc(label) + '</span>' +
      '<button type="button" class="link-btn" id="pillClear">' + t('search.clear') + '</button>';
    document.body.appendChild(hitsPill);
    $('#pillClear').addEventListener('click', function () {
      clearMarksOnly();
      state.searchTerm = '';
      toast(t('search.marksCleared'));
    });
  }

  searchInput.addEventListener('input', debounce(function () { runSearch(this.value); }, 260));
  searchInput.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') { e.preventDefault(); runSearch(this.value); }
  });

  // Atajo de teclado: Ctrl/Cmd + K abre el buscador
  document.addEventListener('keydown', function (e) {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); openSearchModal(); }
  });

  /* ══════════ 13. FORMULARIOS, COOKIES Y AVISOS ══════════ */
  var toastStack = $('#toastStack');

  /** Aviso flotante temporal */
  function toast(message, type) {
    var el = document.createElement('div');
    el.className = 'toast';
    el.innerHTML = '<svg class="ico" viewBox="0 0 24 24" aria-hidden="true">' +
      (type === 'err'
        ? '<circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="2"/><path d="M12 7.5v6M12 16.4v.6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>'
        : '<path d="m5 12.5 4.5 4.5L19 7" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>') +
      '</svg><span>' + esc(message) + '</span>';
    toastStack.appendChild(el);
    setTimeout(function () {
      el.classList.add('is-out');
      setTimeout(function () { el.remove(); }, 340);
    }, 3200);
  }

  /* ── Formulario de contacto ── */
  var contactForm = $('#contactForm');
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    var ok = true;
    var data = {};
    ['name', 'email', 'message'].forEach(function (n) {
      var input = contactForm.elements[n];
      var val = input.value.trim();
      var msg = '';
      if (!val) { msg = t('err.required'); }
      else if (n === 'email' && !/^[^@\s]+@[^@\s]+\.[a-z]{2,}$/i.test(val)) { msg = t('err.email'); }
      var field = input.closest('.field');
      var err = $('[data-error-for="' + n + '"]');
      field.classList.toggle('has-error', Boolean(msg));
      err.textContent = msg;
      err.classList.toggle('is-on', Boolean(msg));
      if (msg) { ok = false; }
      data[n] = val;
    });
    var privacy = contactForm.elements.privacy;
    var privErr = $('[data-error-for="privacy"]');
    privErr.textContent = privacy.checked ? '' : t('err.required');
    privErr.classList.toggle('is-on', !privacy.checked);
    if (!privacy.checked) { ok = false; }

    var okBox = $('#contactOk');
    if (!ok) {
      okBox.textContent = t('err.required');
      okBox.classList.add('is-err');
      return;
    }
    okBox.textContent = t('contact.ok');
    okBox.classList.remove('is-err');
    contactForm.reset();
    toast(t('contact.ok'));
  });

  /* ── Boletín del footer ── */
  $('#newsletterForm').addEventListener('submit', function (e) {
    e.preventDefault();
    var input = $('#newsletterEmail');
    var msg = $('#newsletterMsg');
    if (/^[^@\s]+@[^@\s]+\.[a-z]{2,}$/i.test(input.value.trim())) {
      msg.textContent = t('footer.newsOk');
      toast(t('footer.newsOk'));
      input.value = '';
    } else {
      msg.textContent = t('footer.newsErr');
      input.focus();
    }
  });

  /* ── Modal de usuario (sistema de login a implementar) ── */
  var authModal = $('#authModal');
  var authMode = 'login';

  $('#accountToggle').addEventListener('click', function () {
    if (state.user) { toast(t('auth.hello', { name: state.user.name || state.user.email })); }
    openOverlay(authModal);
  });
  $('#authClose').addEventListener('click', function () { closeOverlay(authModal); });

  function setAuthMode(mode) {
    authMode = mode;
    $('#authTabLogin').classList.toggle('is-active', mode === 'login');
    $('#authTabRegister').classList.toggle('is-active', mode === 'register');
    $('.auth-name').hidden = mode !== 'register';
    $('#authSubmit').textContent = mode === 'register' ? t('auth.submitReg') : t('auth.submit');
    $('#authTitle').textContent = t('auth.title');
    $('#authMsg').textContent = '';
  }
  $('#authTabLogin').addEventListener('click', function () { setAuthMode('login'); });
  $('#authTabRegister').addEventListener('click', function () { setAuthMode('register'); });

  $('#authForm').addEventListener('submit', function (e) {
    e.preventDefault();
    var email = this.elements.aemail.value.trim();
    var pass = this.elements.apass.value;
    var msg = $('#authMsg');
    if (!/^[^@\s]+@[^@\s]+\.[a-z]{2,}$/i.test(email)) {
      msg.textContent = t('err.email');
      msg.classList.add('is-err');
      return;
    }
    if (pass.length < 6) {
      msg.textContent = t('err.required') + ' (6+)';
      msg.classList.add('is-err');
      return;
    }
    msg.classList.remove('is-err');
    var name = authMode === 'register' ? (this.elements.aname.value.trim() || email.split('@')[0]) : email.split('@')[0];
    state.user = { email: email, name: name };
    save('ampia_user', state.user);
    msg.textContent = authMode === 'register' ? t('auth.okRegister') : t('auth.okLogin', { email: email });
    toast(msg.textContent);
    $('#accountToggle').style.color = 'var(--primary)';
    setTimeout(function () { closeOverlay(authModal); }, 1100);
  });

  /* ── Opiniones: carrusel ── */
  var reviewTrack = $('#reviewTrack');

  function reviewHTML(r) {
    var stars = '';
    for (var i = 0; i < 5; i++) {
      stars += '<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1L3.2 9.5l6.1-.9Z" fill="' +
        (i < r.stars ? 'currentColor' : 'none') + '" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/></svg>';
    }
    return '<li class="review-slide"><article class="review-card">' +
      '<img src="' + r.img + '" alt="' + esc(r.name) + '" loading="lazy">' +
      '<div><div class="stars">' + stars + '</div>' +
      '<blockquote>' + esc(r.text[state.lang] || r.text.es) + '</blockquote>' +
      '<footer><strong>' + esc(r.name) + '</strong><span>' + esc(r.meta[state.lang] || r.meta.es) + '</span></footer></div>' +
      '</article></li>';
  }

  function renderReviews() {
    reviewTrack.innerHTML = REVIEWS.map(reviewHTML).join('');
    $('#reviewDots').innerHTML = REVIEWS.map(function (r, i) {
      return '<button type="button" data-dot="' + i + '" class="' + (i === state.review ? 'is-active' : '') + '" aria-label="' + (i + 1) + '"></button>';
    }).join('');
    moveReview(state.review, true);
  }

  function moveReview(i, instant) {
    state.review = (i + REVIEWS.length) % REVIEWS.length;
    reviewTrack.style.transition = instant ? 'none' : '';
    reviewTrack.style.transform = 'translateX(-' + (state.review * 100) + '%)';
    $$('#reviewDots button').forEach(function (d, n) { d.classList.toggle('is-active', n === state.review); });
    if (instant) { requestAnimationFrame(function () { reviewTrack.style.transition = ''; }); }
  }

  $('#reviewPrev').addEventListener('click', function () { moveReview(state.review - 1); });
  $('#reviewNext').addEventListener('click', function () { moveReview(state.review + 1); });
  $('#reviewDots').addEventListener('click', function (e) {
    var dot = e.target.closest('[data-dot]');
    if (dot) { moveReview(parseInt(dot.dataset.dot, 10)); }
  });
  // Pase automático del carrusel (se detiene al interactuar)
  var reviewTimer = setInterval(function () {
    if (document.hidden) { return; }
    moveReview(state.review + 1);
  }, 7000);
  $('#reviewTrack').addEventListener('mouseenter', function () { clearInterval(reviewTimer); });

  /* ── Marquesina ── */
  function renderMarquee() {
    var items = MARQUEE[state.lang] || MARQUEE.es;
    var html = items.map(function (i) { return '<span>' + esc(i) + '</span>'; }).join('');
    $('#marqueeTrack').innerHTML = html + html; // duplicado para bucle continuo
  }

  /* ── Cookies ── */
  var cookieBanner = $('#cookieBanner');

  function initCookies() {
    if (localStorage.getItem('ampia_cookies')) { return; }
    setTimeout(function () {
      cookieBanner.hidden = false;
      requestAnimationFrame(function () { cookieBanner.classList.add('is-open'); });
    }, 1600);
  }

  function hideCookieBanner() {
    cookieBanner.classList.remove('is-open');
    setTimeout(function () { cookieBanner.hidden = true; }, 600);
  }

  function saveCookies(prefs) {
    localStorage.setItem('ampia_cookies', JSON.stringify(prefs));
    hideCookieBanner();
    closeOverlay($('#cookieModal'));
    toast(t('cookies.saved'));
  }

  $('#cookieAccept').addEventListener('click', function () {
    saveCookies({ necessary: true, preferences: true, analytics: true, marketing: true });
  });
  $('#cookieDecline').addEventListener('click', function () {
    saveCookies({ necessary: true, preferences: false, analytics: false, marketing: false });
  });
  $('#cookieReject').addEventListener('click', function () {
    saveCookies({ necessary: true, preferences: false, analytics: false, marketing: false });
  });
  $('#cookieSave').addEventListener('click', function () {
    var prefs = { necessary: true };
    $$('[data-cookie]').forEach(function (c) { prefs[c.dataset.cookie] = c.checked; });
    saveCookies(prefs);
  });

  /* ══════════ 14. ARRANQUE ══════════ */
  function init() {
    applyTheme(state.theme, false);
    $('#year').textContent = new Date().getFullYear();
    initProductReveal();
    buildShopFilters();
    bindLangButtons();
    bindSizeSelection();
    renderMarquee();
    renderProducts();
    renderReviews();
    renderSearchChips();
    renderCart();
    setAuthMode('login');
    initReveal();
    initCookies();

    // Fecha mínima de recogida: hoy
    var today = new Date().toISOString().split('T')[0];
    var dateInput = $('#pickupDate');
    dateInput.min = today;
    dateInput.value = today;

    // Usuario guardado
    if (state.user) { $('#accountToggle').style.color = 'var(--primary)'; }

    // Estado inicial de scroll y del idioma
    onScroll();
    applyLang(state.lang);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
