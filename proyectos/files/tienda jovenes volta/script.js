/* ==========================================================================
   VOLTA · Ropa para jóvenes — script.js
   Todo implementado desde cero: sin librerías, sin CDN, sin dependencias.
   Índice
   1. Utilidades
   2. Sistema de idiomas
   3. Tema claro / oscuro
   4. Menú móvil y navegación
   5. Scroll suave, cabecera y secciones
   6. Búsqueda con resaltado
   7. Modales (acceso, información, pago)
   8. Catálogo y filtros
   9. Carrito de compra y checkout
   10. Formularios, cookies y avisos
   ========================================================================== */

document.documentElement.classList.add('js');

/* --------------------------------------------------------- 1. Utilidades */
const $ = (selector, ambito = document) => ambito.querySelector(selector);
const $$ = (selector, ambito = document) => Array.from(ambito.querySelectorAll(selector));

const guardar = (clave, valor) => {
  try { localStorage.setItem(clave, JSON.stringify(valor)); } catch (e) { /* almacenamiento no disponible */ }
};
const leer = (clave, defecto = null) => {
  try {
    const dato = localStorage.getItem(clave);
    return dato === null ? defecto : JSON.parse(dato);
  } catch (e) { return defecto; }
};

const euros = (cantidad) =>
  new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(cantidad);

/* Etiqueta corta para el envío sin coste */
const GRATIS = { es: 'Gratis', en: 'Free', val: 'Gratuït' };

const movimientoReducido = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* --------------------------------------------------- 2. Sistema de idiomas */
const TEXTOS = {
  es: {
    'a11y.saltar': 'Saltar al contenido principal',
    'topbar.envio': 'Envío 24–48 h · Gratis desde 60 €',
    'topbar.horario': 'Tienda en València · Lun–Sáb 10:00–20:30',
    'logo.tagline': 'Moda joven · SS26',
    'nav.inicio': 'Inicio', 'nav.novedades': 'Novedades', 'nav.coleccion': 'Colección',
    'nav.lookbook': 'Lookbook', 'nav.sostenibilidad': 'Sostenibilidad', 'nav.contacto': 'Contacto',
    'menu.buscar': 'Buscar',
    'hero.eyebrow': 'Colección cápsula · SS26 · 42 piezas',
    'hero.t1': 'Nueva', 'hero.t2': 'temporada', 'hero.t3': 'para su actitud',
    'hero.lead': 'Ropa de 8 a 16 años que aguanta el recreo, el skate y el fin de semana. Algodón orgánico, patrones pensados para crecer y producción local en València.',
    'hero.cta1': 'Ver colección', 'hero.cta2': 'Descubrir lookbook',
    'hero.m1': 'Envío gratis desde 60 €', 'hero.m2': 'Recogida en tienda en 2 h', 'hero.m3': 'Devoluciones 30 días',
    'hero.tag': 'Desde',
    'about.kicker': 'Quiénes somos',
    'about.titulo': 'Vestir su actitud,', 'about.titulo2': 'no disfrazarla',
    'about.p1': 'Nacimos en 2014 en un taller de Russafa con una idea simple: la ropa juvenil no tenía por qué ser una versión reducida de la de adulto. Diseñamos cada prenda con patrones propios, tejidos que respiran y costuras que resisten cuatro cursos escolares.',
    'about.p2': 'Trabajamos con tres talleres de la provincia de València y con algodón orgánico certificado. Producimos en series cortas para no acumular stock y poder dedicar el margen a lo que importa: que la prenda se sienta bien y dure.',
    'about.cta': 'Ver las 42 piezas de la temporada',
    'about.pie': 'Nuestra tienda de C/ Sant Vicent Màrtir 112, València.',
    'stat.1': 'piezas en la colección SS26', 'stat.2': 'algodón orgánico certificado',
    'stat.3': 'días para cambios y devoluciones', 'stat.4': 'diseñando en València desde',
    'sizes.titulo': 'Guía de tallas', 'sizes.caption': 'Equivalencias de talla, edad y altura',
    'sizes.th1': 'Talla', 'sizes.th2': 'Edad', 'sizes.th3': 'Altura', 'sizes.th4': 'Pecho', 'sizes.th5': 'Cintura',
    'sizes.nota': 'Medidas del cuerpo, no de la prenda. Entre dos tallas, elige la mayor: todas nuestras prendas admiten un dobladillo de 3 cm.',
    'shop.kicker': 'Tienda online', 'shop.titulo': 'La colección', 'shop.titulo2': 'SS26',
    'shop.nota': 'Precios con IVA incluido. Añade al carrito y elige al finalizar: recogida en tienda o envío a casa, y cómo prefieres pagar.',
    'shop.vacio': 'No hay piezas en esta categoría todavía. Prueba con otro filtro.',
    'filter.todo': 'Todo', 'filter.nino': 'Niño', 'filter.nina': 'Niña', 'filter.unisex': 'Unisex', 'filter.accesorios': 'Accesorios',
    'look.kicker': 'Lookbook', 'look.titulo': 'Ocho looks,', 'look.titulo2': 'una misma actitud',
    'look.1': 'Ruta 96 + Cargo València', 'look.2': 'Vestido Midi Chicle', 'look.3': 'Cortavientos Reflectante',
    'look.cita': '«Diseñamos para la persona que van a ser en dos años, no solo para la que son hoy.»',
    'look.cargo': 'Dirección de diseño, VOLTA',
    'eco.kicker': 'Compromiso', 'eco.titulo': 'Menos piezas,', 'eco.titulo2': 'mejor hechas',
    'eco.p1': 'Producimos en series cortas y reponemos solo lo que se vende. Así evitamos destruir stock y podemos pagar un precio justo a los talleres que cosen nuestras prendas.',
    'eco.t1': 'Tejido responsable', 'eco.d1': 'Algodón orgánico GOTS y poliéster reciclado en cortavientos y forros.',
    'eco.t2': 'Kilómetro corto', 'eco.d2': 'Confección en tres talleres de la provincia de València, a menos de 40 km.',
    'eco.t3': 'Segunda vida', 'eco.d3': 'Trae la prenda usada y te descontamos 10 € en la siguiente compra.',
    'contact.kicker': 'Contacto', 'contact.titulo': 'Hablamos de', 'contact.titulo2': 'tu pedido',
    'contact.tienda': 'Tienda', 'contact.horario': 'Horario',
    'contact.horarioV': 'Lunes a sábado · 10:00 – 20:30<br>Domingo cerrado',
    'contact.directo': 'Atención directa', 'contact.respuesta': 'Tiempo de respuesta',
    'contact.respuestaV': 'Menos de 24 h laborables',
    'form.nombre': 'Nombre y apellidos', 'form.nombrePh': 'Ej. Lucía Ferrer',
    'form.email': 'Correo electrónico', 'form.emailPh': 'lucia@ejemplo.com',
    'form.telefono': 'Teléfono (opcional)', 'form.telPh': '+34 600 00 00 00',
    'form.asunto': 'Asunto',
    'form.op1': 'Duda sobre un pedido', 'form.op2': 'Asesoramiento de talla',
    'form.op3': 'Cambio o devolución', 'form.op4': 'Venta mayorista',
    'form.mensaje': 'Mensaje', 'form.mensajePh': 'Cuéntanos en qué podemos ayudarte',
    'form.privacidad': 'He leído y acepto la política de privacidad y el tratamiento de mis datos.',
    'form.enviar': 'Enviar mensaje', 'form.ok': '¡Gracias! Te respondemos en menos de 24 h laborables.',
    'footer.desc': 'Ropa para jovencitos y jovencitas de 8 a 16 años. Diseñada y confeccionada en València desde 2014.',
    'footer.news': 'Correo para el boletín', 'footer.newsPh': 'tu@correo.com',
    'footer.newsBtn': 'Suscribirme', 'footer.newsOk': 'Revisa tu correo para confirmar la suscripción.',
    'footer.tienda': 'Tienda', 'footer.ayuda': 'Ayuda', 'footer.contacto': 'Contacto',
    'footer.envios': 'Envíos y entregas', 'footer.devoluciones': 'Cambios y devoluciones',
    'footer.cookies': 'Política de cookies', 'footer.requisitos': 'Requisitos técnicos',
    'footer.legal': 'Aviso legal y privacidad', 'footer.copy': 'Todos los derechos reservados.',
    'cart.titulo': 'Tu carrito', 'cart.vacio': 'Tu carrito está vacío. Añade alguna pieza de la colección SS26.',
    'cart.entrega': '¿Cómo lo recibes?',
    'cart.recoger': 'Recoger en tienda', 'cart.recogerD': 'C/ Sant Vicent Màrtir 112 · listo en 2 h · gratis',
    'cart.domicilio': 'Envío a domicilio', 'cart.domicilioD': '24–48 h · gratis desde 60 €, si no 4,95 €',
    'cart.calle': 'Calle y número', 'cart.cp': 'Código postal', 'cart.ciudad': 'Ciudad',
    'cart.fecha': 'Fecha de recogida', 'cart.hora': 'Franja horaria',
    'cart.pago': '¿Cuándo prefieres pagar?',
    'cart.pago1': 'Pagar al recoger', 'cart.pago1D': 'En caja, con tarjeta, efectivo o Bizum',
    'cart.pago2': 'Pagar al recibirlo', 'cart.pago2D': 'Contra reembolso, con recargo de 1,90 €',
    'cart.pago3': 'Pagar ahora (pasarela)', 'cart.pago3D': 'Pasarela de pago del mercado · tarjeta o Bizum',
    'cart.subtotal': 'Subtotal', 'cart.envio': 'Envío', 'cart.recargo': 'Recargo',
    'cart.total': 'Total', 'cart.iva': 'IVA (21 %) incluido en todos los precios.',
    'cart.tramitar': 'Tramitar pedido',
    'cart.add': 'Añadido al carrito', 'cart.remove': 'Producto eliminado',
    'cart.elijaTalla': 'Elige una talla antes de añadir',
    'search.titulo': 'Buscar en VOLTA', 'search.ph': 'Sudadera, talla, envío…',
    'search.btn': 'Buscar', 'search.info': 'Escribe al menos 3 caracteres y pulsa Intro.',
    'search.limpiar': 'Limpiar resaltado',
    'search.resultados': (n) => `${n} coincidencia${n === 1 ? '' : 's'} resaltada${n === 1 ? '' : 's'} en la página.`,
    'search.sin': 'No hemos encontrado coincidencias. Prueba con otra palabra.',
    'login.titulo': 'Acceso de cliente', 'login.pass': 'Contraseña',
    'login.recordar': 'Recordarme', 'login.olvide': '¿Olvidaste la contraseña?',
    'login.entrar': 'Entrar', 'login.ok': 'Acceso de demostración: aquí se conectará el sistema real de autenticación.',
    'pay.titulo': 'Resumen del pedido', 'pay.total': 'Total a pagar', 'pay.metodo': 'Método elegido',
    'pay.gw': 'Estás a un paso. A continuación se abrirá la pasarela de pago del mercado para completar el importe indicado.',
    'pay.slot': 'Espacio reservado para la pasarela de pago',
    'pay.confirmar': 'Confirmar pedido', 'pay.ok': 'Pedido registrado. Recibirás la confirmación por correo en unos minutos.',
    'pay.m1': 'Pago en caja al recoger', 'pay.m2': 'Contra reembolso al recibirlo', 'pay.m3': 'Pasarela de pago del mercado',
    'pay.recogida': 'Recogida en tienda', 'pay.envio': 'Envío a domicilio',
    'cookies.texto': 'Usamos cookies propias para recordar tu tema, idioma y carrito. No compartimos datos con terceros.',
    'cookies.rechazar': 'Solo necesarias', 'cookies.aceptar': 'Aceptar',
    'cookies.ok': 'Preferencias guardadas',
    'badge.new': 'Nuevo', 'badge.sale': '-20 %', 'badge.last': 'Últimas unidades',
    'cart.addBtn': 'Añadir al carrito'
  },
  en: {
    'a11y.saltar': 'Skip to main content',
    'topbar.envio': '24–48 h shipping · Free over €60',
    'topbar.horario': 'Shop in Valencia · Mon–Sat 10:00–20:30',
    'logo.tagline': 'Young fashion · SS26',
    'nav.inicio': 'Home', 'nav.novedades': 'New in', 'nav.coleccion': 'Collection',
    'nav.lookbook': 'Lookbook', 'nav.sostenibilidad': 'Sustainability', 'nav.contacto': 'Contact',
    'menu.buscar': 'Search',
    'hero.eyebrow': 'Capsule collection · SS26 · 42 pieces',
    'hero.t1': 'New', 'hero.t2': 'season', 'hero.t3': 'for their attitude',
    'hero.lead': 'Clothing for ages 8 to 16 that survives break time, skating and the weekend. Organic cotton, patterns made to grow and local production in Valencia.',
    'hero.cta1': 'Shop the collection', 'hero.cta2': 'See the lookbook',
    'hero.m1': 'Free shipping over €60', 'hero.m2': 'Click & collect in 2 h', 'hero.m3': '30-day returns',
    'hero.tag': 'From',
    'about.kicker': 'Who we are',
    'about.titulo': 'Dress their attitude,', 'about.titulo2': 'do not disguise it',
    'about.p1': 'We started in 2014 in a Russafa workshop with a simple idea: youth clothing did not have to be a缩小 version of adult wear. We design every garment with our own patterns, breathable fabrics and seams that last four school years.',
    'about.p2': 'We work with three workshops in the province of Valencia and certified organic cotton. We produce in short runs so we never burn stock and can spend the margin on what matters: a garment that feels good and lasts.',
    'about.cta': 'See the 42 pieces of the season',
    'about.pie': 'Our shop at C/ Sant Vicent Màrtir 112, Valencia.',
    'stat.1': 'pieces in the SS26 collection', 'stat.2': 'certified organic cotton',
    'stat.3': 'days for exchanges and returns', 'stat.4': 'designing in Valencia since',
    'sizes.titulo': 'Size guide', 'sizes.caption': 'Size, age and height equivalences',
    'sizes.th1': 'Size', 'sizes.th2': 'Age', 'sizes.th3': 'Height', 'sizes.th4': 'Chest', 'sizes.th5': 'Waist',
    'sizes.nota': 'Body measurements, not garment measurements. Between two sizes, pick the larger one: every garment allows a 3 cm hem.',
    'shop.kicker': 'Online store', 'shop.titulo': 'The collection', 'shop.titulo2': 'SS26',
    'shop.nota': 'Prices include VAT. Add to the cart and choose at checkout: collect in store or home delivery, and how you prefer to pay.',
    'shop.vacio': 'No pieces in this category yet. Try another filter.',
    'filter.todo': 'All', 'filter.nino': 'Boys', 'filter.nina': 'Girls', 'filter.unisex': 'Unisex', 'filter.accesorios': 'Accessories',
    'look.kicker': 'Lookbook', 'look.titulo': 'Eight looks,', 'look.titulo2': 'one attitude',
    'look.1': 'Ruta 96 + Cargo València', 'look.2': 'Midi Chicle Dress', 'look.3': 'Reflective Windbreaker',
    'look.cita': '“We design for the person they will be in two years, not only for who they are today.”',
    'look.cargo': 'Head of design, VOLTA',
    'eco.kicker': 'Commitment', 'eco.titulo': 'Fewer pieces,', 'eco.titulo2': 'better made',
    'eco.p1': 'We produce in short runs and only restock what sells. That way we never destroy stock and we can pay a fair price to the workshops that sew our garments.',
    'eco.t1': 'Responsible fabric', 'eco.d1': 'GOTS organic cotton and recycled polyester in windbreakers and linings.',
    'eco.t2': 'Short supply chain', 'eco.d2': 'Made in three workshops in the province of Valencia, less than 40 km away.',
    'eco.t3': 'Second life', 'eco.d3': 'Bring back a used garment and get €10 off your next purchase.',
    'contact.kicker': 'Contact', 'contact.titulo': "Let's talk about", 'contact.titulo2': 'your order',
    'contact.tienda': 'Shop', 'contact.horario': 'Opening hours',
    'contact.horarioV': 'Monday to Saturday · 10:00 – 20:30<br>Closed on Sunday',
    'contact.directo': 'Direct line', 'contact.respuesta': 'Response time',
    'contact.respuestaV': 'Less than 24 working hours',
    'form.nombre': 'Full name', 'form.nombrePh': 'e.g. Lucy Ferrer',
    'form.email': 'Email address', 'form.emailPh': 'lucy@example.com',
    'form.telefono': 'Phone (optional)', 'form.telPh': '+34 600 00 00 00',
    'form.asunto': 'Subject',
    'form.op1': 'Question about an order', 'form.op2': 'Size advice',
    'form.op3': 'Exchange or return', 'form.op4': 'Wholesale',
    'form.mensaje': 'Message', 'form.mensajePh': 'Tell us how we can help',
    'form.privacidad': 'I have read and accept the privacy policy and the processing of my data.',
    'form.enviar': 'Send message', 'form.ok': 'Thank you! We reply within 24 working hours.',
    'footer.desc': 'Clothing for boys and girls aged 8 to 16. Designed and made in Valencia since 2014.',
    'footer.news': 'Newsletter email', 'footer.newsPh': 'you@email.com',
    'footer.newsBtn': 'Subscribe', 'footer.newsOk': 'Check your inbox to confirm the subscription.',
    'footer.tienda': 'Shop', 'footer.ayuda': 'Help', 'footer.contacto': 'Contact',
    'footer.envios': 'Shipping and delivery', 'footer.devoluciones': 'Exchanges and returns',
    'footer.cookies': 'Cookie policy', 'footer.requisitos': 'Technical requirements',
    'footer.legal': 'Legal notice and privacy', 'footer.copy': 'All rights reserved.',
    'cart.titulo': 'Your cart', 'cart.vacio': 'Your cart is empty. Add a piece from the SS26 collection.',
    'cart.entrega': 'How would you like to receive it?',
    'cart.recoger': 'Collect in store', 'cart.recogerD': 'C/ Sant Vicent Màrtir 112 · ready in 2 h · free',
    'cart.domicilio': 'Home delivery', 'cart.domicilioD': '24–48 h · free over €60, otherwise €4.95',
    'cart.calle': 'Street and number', 'cart.cp': 'Postcode', 'cart.ciudad': 'City',
    'cart.fecha': 'Collection date', 'cart.hora': 'Time slot',
    'cart.pago': 'When would you like to pay?',
    'cart.pago1': 'Pay when collecting', 'cart.pago1D': 'At the till: card, cash or Bizum',
    'cart.pago2': 'Pay on delivery', 'cart.pago2D': 'Cash on delivery, €1.90 surcharge',
    'cart.pago3': 'Pay now (gateway)', 'cart.pago3D': 'Market payment gateway · card or Bizum',
    'cart.subtotal': 'Subtotal', 'cart.envio': 'Shipping', 'cart.recargo': 'Surcharge',
    'cart.total': 'Total', 'cart.iva': 'VAT (21%) included in all prices.',
    'cart.tramitar': 'Go to checkout',
    'cart.add': 'Added to cart', 'cart.remove': 'Item removed',
    'cart.elijaTalla': 'Choose a size before adding',
    'search.titulo': 'Search VOLTA', 'search.ph': 'Hoodie, size, shipping…',
    'search.btn': 'Search', 'search.info': 'Type at least 3 characters and press Enter.',
    'search.limpiar': 'Clear highlights',
    'search.resultados': (n) => `${n} match${n === 1 ? '' : 'es'} highlighted on this page.`,
    'search.sin': 'No matches found. Try another word.',
    'login.titulo': 'Customer access', 'login.pass': 'Password',
    'login.recordar': 'Remember me', 'login.olvide': 'Forgot your password?',
    'login.entrar': 'Sign in', 'login.ok': 'Demo access: the real authentication system will be connected here.',
    'pay.titulo': 'Order summary', 'pay.total': 'Total to pay', 'pay.metodo': 'Selected method',
    'pay.gw': 'One step to go. The market payment gateway will now open so you can complete the amount shown.',
    'pay.slot': 'Space reserved for the payment gateway',
    'pay.confirmar': 'Confirm order', 'pay.ok': 'Order registered. You will receive the confirmation by email shortly.',
    'pay.m1': 'Payment at the till on collection', 'pay.m2': 'Cash on delivery', 'pay.m3': 'Market payment gateway',
    'pay.recogida': 'Collect in store', 'pay.envio': 'Home delivery',
    'cookies.texto': 'We use our own cookies to remember your theme, language and cart. We never share data with third parties.',
    'cookies.rechazar': 'Essential only', 'cookies.aceptar': 'Accept',
    'cookies.ok': 'Preferences saved',
    'badge.new': 'New', 'badge.sale': '-20 %', 'badge.last': 'Last sizes',
    'cart.addBtn': 'Add to cart'
  },
  val: {
    'a11y.saltar': 'Saltar al contingut principal',
    'topbar.envio': 'Enviament 24–48 h · Gratuït a partir de 60 €',
    'topbar.horario': 'Botiga a València · Dl–Ds 10:00–20:30',
    'logo.tagline': 'Moda jove · SS26',
    'nav.inicio': 'Inici', 'nav.novedades': 'Novetats', 'nav.coleccion': 'Col·lecció',
    'nav.lookbook': 'Lookbook', 'nav.sostenibilidad': 'Sostenibilitat', 'nav.contacto': 'Contacte',
    'menu.buscar': 'Buscar',
    'hero.eyebrow': 'Col·lecció càpsula · SS26 · 42 peces',
    'hero.t1': 'Nova', 'hero.t2': 'temporada', 'hero.t3': 'per a la seua actitud',
    'hero.lead': 'Roba de 8 a 16 anys que aguanta l’esplai, l’skate i el cap de setmana. Cotó orgànic, patrons pensats per a créixer i producció local a València.',
    'hero.cta1': 'Veure la col·lecció', 'hero.cta2': 'Descobrir lookbook',
    'hero.m1': 'Enviament gratuït a partir de 60 €', 'hero.m2': 'Recollida a la botiga en 2 h', 'hero.m3': 'Devolucions 30 dies',
    'hero.tag': 'Des de',
    'about.kicker': 'Qui som',
    'about.titulo': 'Vestir la seua actitud,', 'about.titulo2': 'no disfressar-la',
    'about.p1': 'Vam nàixer en 2014 en un taller de Russafa amb una idea senzilla: la roba juvenil no havia de ser una versió reduïda de la d’adult. Dissenyem cada peça amb patrons propis, teixits que respiren i costures que resisteixen quatre cursos escolars.',
    'about.p2': 'Treballem amb tres tallers de la província de València i amb cotó orgànic certificat. Produïm en sèries curtes per a no acumular estoc i poder dedicar el marge al que importa: que la peça se senta bé i dure.',
    'about.cta': 'Veure les 42 peces de la temporada',
    'about.pie': 'La nostra botiga al c/ Sant Vicent Màrtir 112, València.',
    'stat.1': 'peces en la col·lecció SS26', 'stat.2': 'cotó orgànic certificat',
    'stat.3': 'dies per a canvis i devolucions', 'stat.4': 'dissenyant a València des de',
    'sizes.titulo': 'Guia de talles', 'sizes.caption': 'Equivalències de talla, edat i altura',
    'sizes.th1': 'Talla', 'sizes.th2': 'Edat', 'sizes.th3': 'Altura', 'sizes.th4': 'Pit', 'sizes.th5': 'Cintura',
    'sizes.nota': 'Mesures del cos, no de la peça. Entre dos talles, tria la majora: totes les nostres peces admeten un doblegat de 3 cm.',
    'shop.kicker': 'Botiga en línia', 'shop.titulo': 'La col·lecció', 'shop.titulo2': 'SS26',
    'shop.nota': 'Preus amb IVA inclòs. Afig al carret i tria en finalitzar: recollida a la botiga o enviament a casa, i com preferixes pagar.',
    'shop.vacio': 'Encara no hi ha peces en esta categoria. Prova amb un altre filtre.',
    'filter.todo': 'Tot', 'filter.nino': 'Xic', 'filter.nina': 'Xica', 'filter.unisex': 'Unisex', 'filter.accesorios': 'Accessoris',
    'look.kicker': 'Lookbook', 'look.titulo': 'Vuit looks,', 'look.titulo2': 'una mateixa actitud',
    'look.1': 'Ruta 96 + Cargo València', 'look.2': 'Vestit Midi Chiclet', 'look.3': 'Paravents Reflectant',
    'look.cita': '«Dissenyem per a la persona que seran d’ací a dos anys, no només per a la que són hui.»',
    'look.cargo': 'Direcció de disseny, VOLTA',
    'eco.kicker': 'Compromís', 'eco.titulo': 'Menys peces,', 'eco.titulo2': 'millor fetes',
    'eco.p1': 'Produïm en sèries curtes i reposem només el que es ven. Així evitem destruir estoc i podem pagar un preu just als tallers que cusen les nostres peces.',
    'eco.t1': 'Teixit responsable', 'eco.d1': 'Cotó orgànic GOTS i polièster reciclat en paravents i folres.',
    'eco.t2': 'Quilòmetre curt', 'eco.d2': 'Confecció en tres tallers de la província de València, a menys de 40 km.',
    'eco.t3': 'Segona vida', 'eco.d3': 'Porta la peça usada i et descomptem 10 € en la pròxima compra.',
    'contact.kicker': 'Contacte', 'contact.titulo': 'Parlem del', 'contact.titulo2': 'teu pedido',
    'contact.tienda': 'Botiga', 'contact.horario': 'Horari',
    'contact.horarioV': 'Dilluns a dissabte · 10:00 – 20:30<br>Diumenge tancat',
    'contact.directo': 'Atenció directa', 'contact.respuesta': 'Temps de resposta',
    'contact.respuestaV': 'Menys de 24 h laborables',
    'form.nombre': 'Nom i cognoms', 'form.nombrePh': 'Ex. Lucía Ferrer',
    'form.email': 'Correu electrònic', 'form.emailPh': 'lucia@exemple.com',
    'form.telefono': 'Telèfon (opcional)', 'form.telPh': '+34 600 00 00 00',
    'form.asunto': 'Assumpte',
    'form.op1': 'Dubte sobre una comanda', 'form.op2': 'Assessorament de talla',
    'form.op3': 'Canvi o devolució', 'form.op4': 'Venda a l’engròs',
    'form.mensaje': 'Missatge', 'form.mensajePh': 'Conta’ns en què podem ajudar-te',
    'form.privacidad': 'He llegit i accepte la política de privacitat i el tractament de les meues dades.',
    'form.enviar': 'Enviar missatge', 'form.ok': 'Gràcies! Responem en menys de 24 h laborables.',
    'footer.desc': 'Roba per a xics i xiques de 8 a 16 anys. Dissenyada i confeccionada a València des de 2014.',
    'footer.news': 'Correu per al butlletí', 'footer.newsPh': 'tu@correu.com',
    'footer.newsBtn': 'Subscriure’m', 'footer.newsOk': 'Revisa el teu correu per a confirmar la subscripció.',
    'footer.tienda': 'Botiga', 'footer.ayuda': 'Ajuda', 'footer.contacto': 'Contacte',
    'footer.envios': 'Enviaments i entregues', 'footer.devoluciones': 'Canvis i devolucions',
    'footer.cookies': 'Política de galetes', 'footer.requisitos': 'Requisits tècnics',
    'footer.legal': 'Avís legal i privacitat', 'footer.copy': 'Tots els drets reservats.',
    'cart.titulo': 'El teu carret', 'cart.vacio': 'El teu carret està buit. Afig alguna peça de la col·lecció SS26.',
    'cart.entrega': 'Com la reps?',
    'cart.recoger': 'Recollir a la botiga', 'cart.recogerD': 'c/ Sant Vicent Màrtir 112 · llest en 2 h · gratuït',
    'cart.domicilio': 'Enviament a domicili', 'cart.domicilioD': '24–48 h · gratuït a partir de 60 €, si no 4,95 €',
    'cart.calle': 'Carrer i número', 'cart.cp': 'Codi postal', 'cart.ciudad': 'Ciutat',
    'cart.fecha': 'Data de recollida', 'cart.hora': 'Franja horària',
    'cart.pago': 'Quan preferixes pagar?',
    'cart.pago1': 'Pagar en recollir', 'cart.pago1D': 'A la caixa, amb targeta, efectiu o Bizum',
    'cart.pago2': 'Pagar en rebre-ho', 'cart.pago2D': 'Contra reemborsament, amb recàrrec de 1,90 €',
    'cart.pago3': 'Pagar ara (passarel·la)', 'cart.pago3D': 'Passarel·la de pagament del mercat · targeta o Bizum',
    'cart.subtotal': 'Subtotal', 'cart.envio': 'Enviament', 'cart.recargo': 'Recàrrec',
    'cart.total': 'Total', 'cart.iva': 'IVA (21 %) inclòs en tots els preus.',
    'cart.tramitar': 'Tramitar comanda',
    'cart.add': 'Afegit al carret', 'cart.remove': 'Producte eliminat',
    'cart.elijaTalla': 'Tria una talla abans d’afegir',
    'search.titulo': 'Buscar a VOLTA', 'search.ph': 'Sudadera, talla, enviament…',
    'search.btn': 'Buscar', 'search.info': 'Escriu almenys 3 caràcters i prem Intro.',
    'search.limpiar': 'Netejar ressaltat',
    'search.resultados': (n) => `${n} coincidència${n === 1 ? '' : 'ncies'} ressaltada${n === 1 ? '' : 'es'} en la pàgina.`,
    'search.sin': 'No hem trobat coincidències. Prova amb una altra paraula.',
    'login.titulo': 'Accés de client', 'login.pass': 'Contrasenya',
    'login.recordar': "Recordar-me", 'login.olvide': 'Has oblidat la contrasenya?',
    'login.entrar': 'Entrar', 'login.ok': 'Accés de demostració: ací es connectarà el sistema real d’autenticació.',
    'pay.titulo': 'Resum de la comanda', 'pay.total': 'Total a pagar', 'pay.metodo': 'Mètode triat',
    'pay.gw': 'Estàs a un pas. A continuació s’obrirà la passarel·la de pagament del mercat per a completar l’import indicat.',
    'pay.slot': 'Espai reservat per a la passarel·la de pagament',
    'pay.confirmar': 'Confirmar comanda', 'pay.ok': 'Comanda registrada. Rebràs la confirmació per correu en uns minuts.',
    'pay.m1': 'Pagament a la caixa en recollir', 'pay.m2': 'Contra reemborsament en rebre-ho', 'pay.m3': 'Passarel·la de pagament del mercat',
    'pay.recogida': 'Recollida a la botiga', 'pay.envio': 'Enviament a domicili',
    'cookies.texto': 'Fem servir galetes pròpies per a recordar el teu tema, idioma i carret. No compartim dades amb tercers.',
    'cookies.rechazar': 'Només necessàries', 'cookies.aceptar': 'Acceptar',
    'cookies.ok': 'Preferències guardades',
    'badge.new': 'Nou', 'badge.sale': '-20 %', 'badge.last': 'Últimes talles',
    'cart.addBtn': 'Afegir al carret'
  }
};

/* Correcciones de redacción que dependen de variables dinámicas */
TEXTOS.en['about.p1'] = 'We started in 2014 in a Russafa workshop with a simple idea: youth clothing did not have to be a smaller version of adult wear. We design every garment with our own patterns, breathable fabrics and seams that last four school years.';

let idioma = leer('volta-idioma', 'es');
if (!TEXTOS[idioma]) idioma = 'es';

const traducir = (clave) => {
  const valor = TEXTOS[idioma][clave] ?? TEXTOS.es[clave];
  return typeof valor === 'function' ? valor : valor;
};

function aplicarIdioma(nuevo) {
  if (!TEXTOS[nuevo]) nuevo = 'es';
  idioma = nuevo;
  guardar('volta-idioma', nuevo);
  document.documentElement.lang = nuevo === 'val' ? 'ca' : nuevo;

  $$('[data-i18n]').forEach((el) => {
    const valor = traducir(el.dataset.i18n);
    if (typeof valor === 'string') el.innerHTML = valor;
  });
  $$('[data-i18n-ph]').forEach((el) => {
    const valor = traducir(el.dataset.i18nPh);
    if (typeof valor === 'string') el.placeholder = valor;
  });
  $$('.lang-btn').forEach((btn) => btn.classList.toggle('is-active', btn.dataset.lang === nuevo));

  renderizarProductos();
  renderizarCarrito();
}

$$('.lang-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    aplicarIdioma(btn.dataset.lang);
    cerrarMenuMovil();
  });
});

/* ------------------------------------------------ 3. Tema claro / oscuro */
const btnTema = $('#btnTema');
const cuerpo = document.body;

function aplicarTema(tema) {
  const oscuro = tema === 'oscuro';
  document.documentElement.setAttribute('data-theme', oscuro ? 'dark' : 'light');
  cuerpo.classList.toggle('theme-dark', oscuro);
  cuerpo.classList.toggle('theme-light', !oscuro);
  btnTema.setAttribute('aria-pressed', String(oscuro));
  btnTema.setAttribute('title', oscuro ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro');
  guardar('volta-tema', tema);
}

aplicarTema(leer('volta-tema', document.documentElement.getAttribute('data-theme') === 'dark' ? 'oscuro' : 'claro'));

btnTema.addEventListener('click', () => {
  const actual = document.documentElement.getAttribute('data-theme') === 'dark' ? 'oscuro' : 'claro';
  aplicarTema(actual === 'oscuro' ? 'claro' : 'oscuro');
});

/* -------------------------------------- 4. Menú móvil y navegación */
const btnMenu = $('#btnMenu');
const menuMovil = $('#menuMovil');

function abrirMenuMovil() {
  menuMovil.classList.add('is-open');
  menuMovil.setAttribute('aria-hidden', 'false');
  btnMenu.classList.add('is-open');
  btnMenu.setAttribute('aria-expanded', 'true');
}
function cerrarMenuMovil() {
  menuMovil.classList.remove('is-open');
  menuMovil.setAttribute('aria-hidden', 'true');
  btnMenu.classList.remove('is-open');
  btnMenu.setAttribute('aria-expanded', 'false');
}
function alternarMenuMovil() {
  menuMovil.classList.contains('is-open') ? cerrarMenuMovil() : abrirMenuMovil();
}

btnMenu.addEventListener('click', alternarMenuMovil);

/* Cerrar el menú al cambiar a un ancho de escritorio */
let anchoPrevio = window.innerWidth;
window.addEventListener('resize', () => {
  if (Math.abs(window.innerWidth - anchoPrevio) < 60) return;
  anchoPrevio = window.innerWidth;
  if (window.innerWidth > 1180) cerrarMenuMovil();
});

/* --------------------------------- 5. Scroll suave, cabecera y secciones */
const cabecera = $('#cabecera');
const btnArriba = $('#btnArriba');
const alturaCabecera = () => cabecera.offsetHeight + 12;

$$('a[href^="#"]').forEach((enlace) => {
  enlace.addEventListener('click', (evento) => {
    const destino = enlace.getAttribute('href');
    if (!destino || destino === '#' || enlace.dataset.modal) return;
    const objetivo = document.querySelector(destino);
    if (!objetivo) return;
    evento.preventDefault();
    cerrarMenuMovil();
    const top = objetivo.getBoundingClientRect().top + window.pageYOffset - alturaCabecera();
    window.scrollTo({ top, behavior: movimientoReducido() ? 'auto' : 'smooth' });
    history.replaceState(null, '', destino);
  });
});

function alHacerScroll() {
  const y = window.pageYOffset;
  cabecera.classList.toggle('is-scrolled', y > 12);
  btnArriba.classList.toggle('is-visible', y > 620);
}
window.addEventListener('scroll', alHacerScroll, { passive: true });
alHacerScroll();

btnArriba.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: movimientoReducido() ? 'auto' : 'smooth' });
});

/* Aparición de secciones al entrar en pantalla */
const observador = new IntersectionObserver((entradas) => {
  entradas.forEach((entrada) => {
    if (!entrada.isIntersecting) return;
    entrada.target.classList.add('is-visible');
    observador.unobserve(entrada.target);
  });
}, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

function observarRevelados() {
  $$('.reveal:not(.is-visible)').forEach((el, i) => {
    el.style.transitionDelay = `${Math.min(i % 6, 5) * 70}ms`;
    observador.observe(el);
  });
}

/* Enlace activo del menú según la sección visible */
const secciones = $$('main section[id]');
const observadorSecciones = new IntersectionObserver((entradas) => {
  entradas.forEach((entrada) => {
    if (!entrada.isIntersecting) return;
    const id = entrada.target.id;
    $$('.nav-link').forEach((enlace) => {
      enlace.classList.toggle('is-current', enlace.getAttribute('href') === `#${id}`);
    });
  });
}, { threshold: 0.35 });
secciones.forEach((sec) => observadorSecciones.observe(sec));

/* ------------------------------------------ 6. Búsqueda con resaltado */
const modalBuscar = $('#modalBuscar');
const inputBuscar = $('#inputBuscar');
const searchInfo = $('#searchInfo');

function limpiarResaltado() {
  $$('mark.search-hit').forEach((marca) => {
    const padre = marca.parentNode;
    padre.replaceChild(document.createTextNode(marca.textContent), marca);
    padre.normalize();
  });
}

function buscarEnPagina(consulta) {
  limpiarResaltado();
  const texto = consulta.trim();
  if (texto.length < 3) {
    searchInfo.textContent = traducir('search.info');
    return;
  }

  const origen = $('#contenido');
  const regex = new RegExp(texto.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
  const coincidencias = [];

  const recorrido = document.createTreeWalker(origen, NodeFilter.SHOW_TEXT, {
    acceptNode(nodo) {
      if (!nodo.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
      const padre = nodo.parentElement;
      if (!padre || ['SCRIPT', 'STYLE', 'MARK', 'NOSCRIPT'].includes(padre.tagName)) {
        return NodeFilter.FILTER_REJECT;
      }
      return nodo.nodeValue.toLowerCase().includes(texto.toLowerCase())
        ? NodeFilter.FILTER_ACCEPT
        : NodeFilter.FILTER_REJECT;
    }
  });

  const nodos = [];
  while (recorrido.nextNode()) nodos.push(recorrido.currentNode);

  nodos.forEach((nodo) => {
    const contenido = nodo.nodeValue;
    const trozo = document.createDocumentFragment();
    let ultimo = 0;
    contenido.replace(regex, (coincidencia, desplazamiento) => {
      trozo.appendChild(document.createTextNode(contenido.slice(ultimo, desplazamiento)));
      const marca = document.createElement('mark');
      marca.className = 'search-hit';
      marca.textContent = coincidencia;
      trozo.appendChild(marca);
      coincidencias.push(marca);
      ultimo = desplazamiento + coincidencia.length;
      return coincidencia;
    });
    trozo.appendChild(document.createTextNode(contenido.slice(ultimo)));
    nodo.parentNode.replaceChild(trozo, nodo);
  });

  searchInfo.textContent = coincidencias.length
    ? traducir('search.resultados')(coincidencias.length)
    : traducir('search.sin');

  if (coincidencias.length) {
    const primera = coincidencias[0];
    primera.classList.add('is-current');
    const top = primera.getBoundingClientRect().top + window.pageYOffset - alturaCabecera() - 40;
    window.scrollTo({ top, behavior: movimientoReducido() ? 'auto' : 'smooth' });
    setTimeout(() => primera.classList.remove('is-current'), 2600);
  }
}

$('#formBuscar').addEventListener('submit', (evento) => {
  evento.preventDefault();
  buscarEnPagina(inputBuscar.value);
});
$('#btnLimpiarBusqueda').addEventListener('click', () => {
  limpiarResaltado();
  inputBuscar.value = '';
  searchInfo.textContent = traducir('search.info');
});
$$('.chip').forEach((chip) => {
  chip.addEventListener('click', () => {
    inputBuscar.value = chip.dataset.suggest;
    buscarEnPagina(chip.dataset.suggest);
  });
});

/* ------------------------------------------------------- 7. Modales */
let ultimoFoco = null;

function abrirModal(modal) {
  if (!modal) return;
  ultimoFoco = document.activeElement;
  modal.hidden = false;
  requestAnimationFrame(() => modal.classList.add('is-open'));
  cuerpo.classList.add('is-locked');
  const foco = modal.querySelector('input, button, select, textarea');
  if (foco) setTimeout(() => foco.focus(), 120);
}

function cerrarModal(modal) {
  if (!modal || modal.hidden) return;
  modal.classList.remove('is-open');
  const finalizar = () => {
    modal.hidden = true;
    if (!document.querySelector('.modal.is-open') && !$('#carrito').classList.contains('is-open')) {
      cuerpo.classList.remove('is-locked');
    }
    if (ultimoFoco) ultimoFoco.focus();
  };
  movimientoReducido() ? finalizar() : setTimeout(finalizar, 260);
}

document.addEventListener('click', (evento) => {
  const cierre = evento.target.closest('[data-close]');
  if (cierre) cerrarModal(cierre.closest('.modal'));
});

document.addEventListener('keydown', (evento) => {
  if (evento.key !== 'Escape') return;
  const abierto = document.querySelector('.modal.is-open');
  if (abierto) cerrarModal(abierto);
  else if ($('#carrito').classList.contains('is-open')) cerrarCarrito();
  else cerrarMenuMovil();
});

$('#btnBuscar').addEventListener('click', () => abrirModal(modalBuscar));
$('#btnBuscarMovil').addEventListener('click', () => { cerrarMenuMovil(); abrirModal(modalBuscar); });
$('#btnUsuario').addEventListener('click', () => abrirModal($('#modalLogin')));

/* Contenido informativo del pie */
const INFO = {
  cookies: {
    titulo: { es: 'Política de cookies', en: 'Cookie policy', val: 'Política de galetes' },
    html: {
      es: `<p>Este sitio utiliza cookies propias y de terceros técnicas para el funcionamiento básico.</p>
           <h3>Cookies utilizadas</h3>
           <ul>
             <li><strong>volta-tema</strong>: recuerda si prefieres el modo claro u oscuro.</li>
             <li><strong>volta-idioma</strong>: guarda el idioma seleccionado (ES, EN, VAL).</li>
             <li><strong>volta-carrito</strong>: mantiene tu carrito entre visitas.</li>
             <li><strong>volta-cookies</strong>: registra tu decisión sobre este aviso.</li>
           </ul>
           <h3>Cómo desactivarlas</h3>
           <p>Puedes borrar los datos del sitio desde la configuración de tu navegador en cualquier momento. No utilizamos cookies publicitarias ni compartimos datos con terceros.</p>`,
      en: `<p>This site uses first-party and technical third-party cookies for basic operation.</p>
           <h3>Cookies used</h3>
           <ul>
             <li><strong>volta-tema</strong>: remembers whether you prefer light or dark mode.</li>
             <li><strong>volta-idioma</strong>: stores the selected language (ES, EN, VAL).</li>
             <li><strong>volta-carrito</strong>: keeps your cart between visits.</li>
             <li><strong>volta-cookies</strong>: records your decision on this notice.</li>
           </ul>
           <h3>How to disable them</h3>
           <p>You can clear site data from your browser settings at any time. We use no advertising cookies and share no data with third parties.</p>`,
      val: `<p>Este lloc utilitza galetes pròpies i de tercers tècniques per al funcionament bàsic.</p>
           <h3>Galetes utilitzades</h3>
           <ul>
             <li><strong>volta-tema</strong>: recorda si preferixes el mode clar o fosc.</li>
             <li><strong>volta-idioma</strong>: guarda l’idioma seleccionat (ES, EN, VAL).</li>
             <li><strong>volta-carrito</strong>: manté el teu carret entre visites.</li>
             <li><strong>volta-cookies</strong>: registra la teua decisió sobre este avís.</li>
           </ul>
           <h3>Com desactivar-les</h3>
           <p>Pots esborrar les dades del lloc des de la configuració del teu navegador en qualsevol moment. No utilitzem galetes publicitàries ni compartim dades amb tercers.</p>`
    }
  },
  requisitos: {
    titulo: { es: 'Requisitos técnicos', en: 'Technical requirements', val: 'Requisits tècnics' },
    html: {
      es: `<p>La tienda funciona sin plugins ni instalaciones adicionales.</p>
           <h3>Navegadores compatibles</h3>
           <ul><li>Chrome, Edge, Firefox y Safari en sus dos últimas versiones mayores.</li>
               <li>iOS 15+ y Android 9+ en navegación móvil.</li></ul>
           <h3>Recomendaciones</h3>
           <ul><li>Conexión estable para cargar el catálogo visual.</li>
               <li>JavaScript habilitado: el carrito y los filtros lo necesitan.</li>
               <li>Resolución mínima recomendada: 360 px de ancho.</li></ul>
           <h3>Accesibilidad</h3>
           <p>Cumplimos las pautas WCAG 2.1 nivel AA: navegación por teclado, foco visible, contraste alto y respeto de la preferencia de movimiento reducido.</p>`,
      en: `<p>The store works without plugins or additional installs.</p>
           <h3>Supported browsers</h3>
           <ul><li>Chrome, Edge, Firefox and Safari in their two latest major versions.</li>
               <li>iOS 15+ and Android 9+ on mobile.</li></ul>
           <h3>Recommendations</h3>
           <ul><li>Stable connection to load the visual catalogue.</li>
               <li>JavaScript enabled: filters and cart require it.</li>
               <li>Minimum recommended resolution: 360 px wide.</li></ul>
           <h3>Accessibility</h3>
           <p>We follow WCAG 2.1 AA guidelines: keyboard navigation, visible focus, high contrast and respect for reduced motion preferences.</p>`,
      val: `<p>La botiga funciona sense complements ni instal·lacions addicionals.</p>
           <h3>Navegadors compatibles</h3>
           <ul><li>Chrome, Edge, Firefox i Safari en les dos últimes versions majors.</li>
               <li>iOS 15+ i Android 9+ en navegació mòbil.</li></ul>
           <h3>Recomanacions</h3>
           <ul><li>Connexió estable per a carregar el catàleg visual.</li>
               <li>JavaScript habilitat: el carret i els filtres el necessiten.</li>
               <li>Resolució mínima recomanada: 360 px d’ample.</li></ul>
           <h3>Accessibilitat</h3>
           <p>Complim les pautes WCAG 2.1 nivell AA: navegació per teclat, focus visible, contrast alt i respecte per la preferència de moviment reduït.</p>`
    }
  },
  legal: {
    titulo: { es: 'Aviso legal y privacidad', en: 'Legal notice and privacy', val: 'Avís legal i privacitat' },
    html: {
      es: `<p><strong>Titular:</strong> VOLTA Wear S.L. · B-98765432 · C/ Sant Vicent Màrtir 112, 46007 València.</p>
           <h3>Condiciones de compra</h3>
           <ul><li>Precios con IVA (21 %) incluido.</li>
               <li>Cambios y devoluciones durante 30 días desde la recepción.</li>
               <li>El pedido puede pagarse al recoger, contra reembolso o mediante la pasarela de pago del mercado.</li></ul>
           <h3>Protección de datos</h3>
           <p>Los datos del formulario se usan solo para responder a tu solicitud y se conservan 12 meses. Puedes ejercer tus derechos de acceso, rectificación y supresión escribiendo a hola@voltawear.es.</p>`,
      en: `<p><strong>Owner:</strong> VOLTA Wear S.L. · B-98765432 · C/ Sant Vicent Màrtir 112, 46007 Valencia.</p>
           <h3>Purchase terms</h3>
           <ul><li>Prices include VAT (21%).</li>
               <li>Exchanges and returns within 30 days of receipt.</li>
               <li>Orders can be paid on collection, on delivery or through the market payment gateway.</li></ul>
           <h3>Data protection</h3>
           <p>Form data is used only to answer your request and kept for 12 months. You may exercise your rights of access, rectification and erasure by writing to hola@voltawear.es.</p>`,
      val: `<p><strong>Titular:</strong> VOLTA Wear S.L. · B-98765432 · c/ Sant Vicent Màrtir 112, 46007 València.</p>
           <h3>Condicions de compra</h3>
           <ul><li>Preus amb IVA (21 %) inclòs.</li>
               <li>Canvis i devolucions durant 30 dies des de la recepció.</li>
               <li>La comanda pot pagar-se en recollir, contra reemborsament o mitjançant la passarel·la de pagament del mercat.</li></ul>
           <h3>Protecció de dades</h3>
           <p>Les dades del formulari s’utilitzen només per a respondre la teua sol·licitud i es conserven 12 mesos. Pots exercir els teus drets d’accés, rectificació i supressió escrivint a hola@voltawear.es.</p>`
    }
  }
};

$$('[data-modal]').forEach((enlace) => {
  enlace.addEventListener('click', (evento) => {
    evento.preventDefault();
    const info = INFO[enlace.dataset.modal];
    if (!info) return;
    $('#infoTitulo').innerHTML = info.titulo[idioma] || info.titulo.es;
    $('#infoBody').innerHTML = info.html[idioma] || info.html.es;
    abrirModal($('#modalInfo'));
  });
});

/* ------------------------------------------------- 8. Catálogo y filtros */
const PRODUCTOS = [
  {
    id: 'ruta96', categoria: 'unisex', destacado: true, precio: 49.90, precioAntes: null,
    badge: 'new', tallas: ['8', '10', '12', '14', '16'],
    imagen: 'https://images.pexels.com/photos/12555811/pexels-photo-12555811.png?auto=compress&cs=tinysrgb&w=900',
    alt: 'Sudadera de algodón colgada en un perchero',
    nombre: { es: 'Sudadera Ruta 96', en: 'Ruta 96 Hoodie', val: 'Sudadera Ruta 96' },
    desc: {
      es: 'Interior afelpado, 340 g/m², costura reforzada en hombros.',
      en: 'Brushed fleece, 340 g/m², reinforced shoulder seams.',
      val: 'Interior afelpat, 340 g/m², costura reforçada en muscles.'
    }
  },
  {
    id: 'eco-logo', categoria: 'unisex', precio: 19.90, precioAntes: null,
    badge: null, tallas: ['8', '10', '12', '14', '16'],
    imagen: 'https://images.pexels.com/photos/18257675/pexels-photo-18257675.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'Camiseta blanca de algodón en un perchero',
    nombre: { es: 'Camiseta Eco Logo', en: 'Eco Logo T-shirt', val: 'Samarreta Eco Logo' },
    desc: {
      es: 'Algodón orgánico 180 g/m², corte recto y cuello reforzado.',
      en: 'Organic cotton 180 g/m², straight cut and reinforced neck.',
      val: 'Cotó orgànic 180 g/m², tall recte i coll reforçat.'
    }
  },
  {
    id: 'cargo-valencia', categoria: 'nino', precio: 39.90, precioAntes: null,
    badge: 'new', tallas: ['8', '10', '12', '14', '16'],
    imagen: 'https://images.pexels.com/photos/8311879/pexels-photo-8311879.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'Prendas colgadas en una tienda de moda',
    nombre: { es: 'Pantalón Cargo València', en: 'València Cargo Pants', val: 'Pantaló Cargo València' },
    desc: {
      es: 'Sarga elástica, seis bolsillos y rodilla preformada.',
      en: 'Stretch twill, six pockets and pre-shaped knees.',
      val: 'Sarja elàstica, sis butxaques i genoll preformat.'
    }
  },
  {
    id: 'midi-chicle', categoria: 'nina', precio: 44.90, precioAntes: 56.00,
    badge: 'sale', tallas: ['8', '10', '12', '14'],
    imagen: 'https://images.pexels.com/photos/15625985/pexels-photo-15625985.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'Vestidos de colores en percheros de madera',
    nombre: { es: 'Vestido Midi Chicle', en: 'Chicle Midi Dress', val: 'Vestit Midi Chiclet' },
    desc: {
      es: 'Punto de algodón con caída, bolsillos laterales y forro suave.',
      en: 'Cotton knit with drape, side pockets and soft lining.',
      val: 'Punt de cotó amb caiguda, butxaques laterals i folre suau.'
    }
  },
  {
    id: 'cortavientos', categoria: 'unisex', precio: 59.90, precioAntes: null,
    badge: 'new', tallas: ['10', '12', '14', '16'],
    imagen: 'https://images.pexels.com/photos/8463179/pexels-photo-8463179.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'Chaqueta vaquera con estampado colgada en un perchero',
    nombre: { es: 'Cortavientos Reflectante', en: 'Reflective Windbreaker', val: 'Paravents Reflectant' },
    desc: {
      es: 'Poliéster reciclado, costuras selladas y detalles reflectantes.',
      en: 'Recycled polyester, taped seams and reflective details.',
      val: 'Polièster reciclat, costures segellades i detalls reflectants.'
    }
  },
  {
    id: 'falda-grafiti', categoria: 'nina', precio: 29.90, precioAntes: null,
    badge: 'last', tallas: ['8', '10', '12', '14'],
    imagen: 'https://images.pexels.com/photos/35741388/pexels-photo-35741388.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'Prendas de colores expuestas en una boutique',
    nombre: { es: 'Falda Plisada Grafiti', en: 'Graffiti Pleated Skirt', val: 'Falda Plisada Grafiti' },
    desc: {
      es: 'Plisado permanente, cintura elástica y estampado exclusivo.',
      en: 'Permanent pleats, elastic waistband and exclusive print.',
      val: 'Plecs permanents, cintura elàstica i estampat exclusiu.'
    }
  },
  {
    id: 'calcetines', categoria: 'accesorios', precio: 12.90, precioAntes: null,
    badge: null, tallas: ['Única'],
    imagen: 'https://images.pexels.com/photos/39397907/pexels-photo-39397907.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'Calcetines blancos con zapatillas de caña alta',
    nombre: { es: 'Calcetines Pack x3', en: 'Socks Pack x3', val: 'Calcetins Pack x3' },
    desc: {
      es: 'Pack de tres pares, algodón peinado y puntera reforzada.',
      en: 'Three-pair pack, combed cotton and reinforced toe.',
      val: 'Pack de tres parells, cotó cardat i puntera reforçada.'
    }
  },
  {
    id: 'mochila-city', categoria: 'accesorios', precio: 34.90, precioAntes: null,
    badge: 'new', tallas: ['Única'],
    imagen: 'https://images.pexels.com/photos/5015514/pexels-photo-5015514.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'Mochila con zapatillas encima sobre un fondo verde',
    nombre: { es: 'Mochila City 22 L', en: 'City Backpack 22 L', val: 'Motxilla City 22 L' },
    desc: {
      es: 'Compartimento acolchado para 15", forro impermeable y reflejos.',
      en: 'Padded 15" compartment, waterproof lining and reflectors.',
      val: 'Compartiment encoixinat per a 15", folre impermeable i reflexos.'
    }
  }
];

const rejilla = $('#rejillaProductos');
const estadoVacio = $('#estadoVacio');
let filtroActivo = 'todo';
const tallasElegidas = {};

function etiquetaBadge(tipo) {
  if (tipo === 'new') return { texto: traducir('badge.new'), clase: '' };
  if (tipo === 'sale') return { texto: traducir('badge.sale'), clase: 'product__badge--sale' };
  if (tipo === 'last') return { texto: traducir('badge.last'), clase: 'product__badge--last' };
  return null;
}

function renderizarProductos() {
  const lista = filtroActivo === 'todo'
    ? PRODUCTOS
    : PRODUCTOS.filter((p) => p.categoria === filtroActivo);

  estadoVacio.hidden = lista.length > 0;
  rejilla.innerHTML = '';

  lista.forEach((producto, indice) => {
    const destacado = filtroActivo === 'todo' && indice === 0;
    const badge = etiquetaBadge(producto.badge);
    const articulo = document.createElement('article');
    articulo.className = `product${destacado ? ' product--feature' : ''}`;
    articulo.dataset.id = producto.id;

    articulo.innerHTML = `
      <div class="product__media">
        <img src="${producto.imagen}" alt="${producto.alt}" loading="lazy">
        ${badge ? `<span class="product__badge ${badge.clase}">${badge.texto}</span>` : ''}
        <div class="product__price">
          ${producto.precioAntes ? `<s>${euros(producto.precioAntes)}</s>` : ''}
          ${euros(producto.precio)}
        </div>
      </div>
      <div class="product__body">
        <p class="product__cat">${traducir('filter.' + producto.categoria)}</p>
        <h3 class="product__name">${producto.nombre[idioma] || producto.nombre.es}</h3>
        <p class="product__desc">${producto.desc[idioma] || producto.desc.es}</p>
        <div class="product__sizes" role="group" aria-label="Tallas">
          ${producto.tallas.map((t) => `
            <button type="button" class="size-chip${(tallasElegidas[producto.id] || producto.tallas[0]) === t ? ' is-active' : ''}" data-size="${t}">${t}</button>
          `).join('')}
        </div>
        <div class="product__actions">
          <button type="button" class="btn btn--dark btn--small" data-add="${producto.id}">${traducir('cart.addBtn')}</button>
        </div>
      </div>`;

    rejilla.appendChild(articulo);
  });
}

/* Filtros de categoría */
$$('.filter-btn').forEach((boton) => {
  boton.addEventListener('click', () => {
    filtroActivo = boton.dataset.filter;
    $$('.filter-btn').forEach((b) => b.classList.toggle('is-active', b === boton));
    renderizarProductos();
    observarRevelados();
  });
});

/* Selección de talla y añadido al carrito (delegación de eventos) */
rejilla.addEventListener('click', (evento) => {
  const chip = evento.target.closest('.size-chip');
  if (chip) {
    const tarjeta = chip.closest('.product');
    tallasElegidas[tarjeta.dataset.id] = chip.dataset.size;
    $$('.size-chip', tarjeta).forEach((c) => c.classList.toggle('is-active', c === chip));
    return;
  }
  const add = evento.target.closest('[data-add]');
  if (add) {
    const tarjeta = add.closest('.product');
    const id = add.dataset.add;
    const talla = tallasElegidas[id] || tarjeta.querySelector('.size-chip.is-active')?.dataset.size;
    if (!talla) { mostrarToast(traducir('cart.elijaTalla')); return; }
    anadirAlCarrito(id, talla);
  }
});

/* -------------------------------------- 9. Carrito de compra y checkout */
const carritoPanel = $('#carrito');
const overlayCarrito = $('#overlayCarrito');
const listaCarrito = $('#listaCarrito');
const carritoVacio = $('#carritoVacio');
const contadorCarrito = $('#contadorCarrito');
let carrito = leer('volta-carrito', []);

function abrirCarrito() {
  overlayCarrito.hidden = false;
  requestAnimationFrame(() => overlayCarrito.classList.add('is-visible'));
  carritoPanel.classList.add('is-open');
  carritoPanel.setAttribute('aria-hidden', 'false');
  cuerpo.classList.add('is-locked');
}
function cerrarCarrito() {
  overlayCarrito.classList.remove('is-visible');
  carritoPanel.classList.remove('is-open');
  carritoPanel.setAttribute('aria-hidden', 'true');
  setTimeout(() => { overlayCarrito.hidden = true; }, 320);
  if (!document.querySelector('.modal.is-open')) cuerpo.classList.remove('is-locked');
}

$('#btnCarrito').addEventListener('click', abrirCarrito);
$('#cerrarCarrito').addEventListener('click', cerrarCarrito);
overlayCarrito.addEventListener('click', cerrarCarrito);

function anadirAlCarrito(id, talla) {
  const existente = carrito.find((linea) => linea.id === id && linea.talla === talla);
  if (existente) existente.cantidad += 1;
  else carrito.push({ id, talla, cantidad: 1 });
  guardar('volta-carrito', carrito);
  renderizarCarrito();
  contadorCarrito.classList.remove('is-bump');
  void contadorCarrito.offsetWidth;
  contadorCarrito.classList.add('is-bump');
  mostrarToast(traducir('cart.add'));
  abrirCarrito();
}

function cambiarCantidad(indice, delta) {
  carrito[indice].cantidad += delta;
  if (carrito[indice].cantidad <= 0) carrito.splice(indice, 1);
  guardar('volta-carrito', carrito);
  renderizarCarrito();
}

function eliminarLinea(indice) {
  carrito.splice(indice, 1);
  guardar('volta-carrito', carrito);
  renderizarCarrito();
  mostrarToast(traducir('cart.remove'));
}

listaCarrito.addEventListener('click', (evento) => {
  const boton = evento.target.closest('button');
  if (!boton) return;
  const indice = Number(boton.dataset.index);
  if (boton.dataset.accion === 'mas') cambiarCantidad(indice, 1);
  if (boton.dataset.accion === 'menos') cambiarCantidad(indice, -1);
  if (boton.dataset.accion === 'eliminar') eliminarLinea(indice);
});

function metodoEntrega() {
  return document.querySelector('input[name="entrega"]:checked')?.value || 'tienda';
}
function metodoPago() {
  return document.querySelector('input[name="pago"]:checked')?.value || 'recoger';
}

function calcularTotales() {
  const subtotal = carrito.reduce((suma, linea) => {
    const producto = PRODUCTOS.find((p) => p.id === linea.id);
    return suma + (producto ? producto.precio * linea.cantidad : 0);
  }, 0);

  const envio = metodoEntrega() === 'domicilio' && subtotal > 0 && subtotal < 60 ? 4.95 : 0;
  const recargo = metodoPago() === 'entrega' && subtotal > 0 ? 1.90 : 0;
  return { subtotal, envio, recargo, total: subtotal + envio + recargo };
}

function renderizarCarrito() {
  listaCarrito.innerHTML = '';
  carritoVacio.hidden = carrito.length > 0;

  carrito.forEach((linea, indice) => {
    const producto = PRODUCTOS.find((p) => p.id === linea.id);
    if (!producto) return;
    const item = document.createElement('li');
    item.className = 'cart-item';
    item.innerHTML = `
      <img src="${producto.imagen}" alt="${producto.alt}">
      <div>
        <p class="cart-item__name">${producto.nombre[idioma] || producto.nombre.es}</p>
        <p class="cart-item__meta">${traducir('sizes.th1')}: ${linea.talla} · ${euros(producto.precio)}</p>
        <div class="qty">
          <button type="button" data-accion="menos" data-index="${indice}" aria-label="Reducir cantidad">−</button>
          <span>${linea.cantidad}</span>
          <button type="button" data-accion="mas" data-index="${indice}" aria-label="Aumentar cantidad">+</button>
        </div>
      </div>
      <div style="text-align:right">
        <p class="cart-item__price">${euros(producto.precio * linea.cantidad)}</p>
        <button type="button" class="cart-item__remove" data-accion="eliminar" data-index="${indice}">✕</button>
      </div>`;
    listaCarrito.appendChild(item);
  });

  const { subtotal, envio, recargo, total } = calcularTotales();
  $('#subtotal').textContent = euros(subtotal);
  $('#costeEnvio').textContent = envio === 0 ? GRATIS[idioma] || GRATIS.es : euros(envio);
  $('#recargo').textContent = euros(recargo);
  $('#total').textContent = euros(total);

  const unidades = carrito.reduce((suma, linea) => suma + linea.cantidad, 0);
  contadorCarrito.textContent = unidades;
}

/* Opciones de entrega: mostrar u ocultar los campos correspondientes */
document.querySelectorAll('input[name="entrega"]').forEach((radio) => {
  radio.addEventListener('change', () => {
    const esDomicilio = metodoEntrega() === 'domicilio';
    $('#camposDomicilio').hidden = !esDomicilio;
    $('#camposRecogida').hidden = esDomicilio;
    renderizarCarrito();
  });
});
document.querySelectorAll('input[name="pago"]').forEach((radio) => {
  radio.addEventListener('change', renderizarCarrito);
});

/* Fecha de recogida: a partir de hoy */
const campoFecha = $('#fechaRecogida');
const hoy = new Date().toISOString().split('T')[0];
campoFecha.min = hoy;
campoFecha.value = hoy;

/* Resumen y ventana de pago */
$('#btnTramitar').addEventListener('click', () => {
  if (!carrito.length) { mostrarToast(traducir('cart.vacio')); return; }
  const { subtotal, envio, recargo, total } = calcularTotales();
  const listaPago = $('#listaPago');
  listaPago.innerHTML = carrito.map((linea) => {
    const producto = PRODUCTOS.find((p) => p.id === linea.id);
    return `<li><span>${producto.nombre[idioma] || producto.nombre.es} · ${traducir('sizes.th1')} ${linea.talla} × ${linea.cantidad}</span>
            <span>${euros(producto.precio * linea.cantidad)}</span></li>`;
  }).join('');

  $('#pagoEnvio').textContent = envio === 0 ? (GRATIS[idioma] || GRATIS.es) : euros(envio);
  $('#pagoTotal').textContent = euros(total);

  const pago = metodoPago();
  const etiquetas = {
    recoger: traducir('pay.m1'),
    entrega: traducir('pay.m2'),
    pasarela: traducir('pay.m3')
  };
  $('#payMethod').textContent = `${etiquetas[pago]} · ${pago === 'recoger' ? traducir('pay.recogida') : traducir('pay.envio')}`;
  $('#payGateway').hidden = pago !== 'pasarela';
  $('#payOk').hidden = true;

  cerrarCarrito();
  abrirModal($('#modalPago'));
});

$('#btnConfirmar').addEventListener('click', () => {
  $('#payOk').hidden = false;
  carrito = [];
  guardar('volta-carrito', carrito);
  renderizarCarrito();
  setTimeout(() => cerrarModal($('#modalPago')), 1800);
});

/* ------------------------------- 10. Formularios, cookies y avisos */
const toast = $('#toast');
let toastTemporizador = null;
function mostrarToast(texto) {
  toast.textContent = texto;
  toast.classList.add('is-visible');
  clearTimeout(toastTemporizador);
  toastTemporizador = setTimeout(() => toast.classList.remove('is-visible'), 2800);
}

const formContacto = $('#formContacto');
formContacto.addEventListener('submit', (evento) => {
  evento.preventDefault();
  const errores = {};
  const nombre = $('#nombre');
  const email = $('#email');
  const mensaje = $('#mensaje');
  const privacidad = $('#privacidad');

  if (nombre.value.trim().length < 3) errores.nombre = 'Escribe tu nombre completo.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.value.trim())) errores.email = 'Revisa el correo electrónico.';
  if (mensaje.value.trim().length < 10) errores.mensaje = 'Cuéntanos un poco más (mínimo 10 caracteres).';
  if (!privacidad.checked) errores.privacidad = 'Debes aceptar la política de privacidad.';

  $$('.field__error').forEach((nodo) => { nodo.textContent = ''; });
  $$('.is-invalid').forEach((nodo) => nodo.classList.remove('is-invalid'));

  Object.entries(errores).forEach(([campo, texto]) => {
    const aviso = document.querySelector(`[data-error-for="${campo}"]`);
    if (aviso) aviso.textContent = texto;
    const input = document.getElementById(campo);
    if (input && input.type !== 'checkbox') input.classList.add('is-invalid');
  });

  if (Object.keys(errores).length) return;

  $('#formOk').hidden = false;
  formContacto.reset();
  setTimeout(() => { $('#formOk').hidden = true; }, 6000);
});

$('#formNewsletter').addEventListener('submit', (evento) => {
  evento.preventDefault();
  $('#newsOk').hidden = false;
  evento.target.reset();
});

$('#formLogin').addEventListener('submit', (evento) => {
  evento.preventDefault();
  $('#loginOk').hidden = false;
});

/* Banner de cookies */
const avisoCookies = $('#avisoCookies');
if (!leer('volta-cookies', false)) {
  setTimeout(() => avisoCookies.classList.add('is-visible'), 1400);
  avisoCookies.hidden = false;
}
function cerrarCookies(aceptadas) {
  guardar('volta-cookies', { necesario: true, analitica: Boolean(aceptadas), fecha: Date.now() });
  avisoCookies.classList.remove('is-visible');
  setTimeout(() => { avisoCookies.hidden = true; }, 450);
  mostrarToast(traducir('cookies.ok'));
}
$('#cookiesAceptar').addEventListener('click', () => cerrarCookies(true));
$('#cookiesRechazar').addEventListener('click', () => cerrarCookies(false));

/* Año del copyright */
$('#anio').textContent = new Date().getFullYear();

/* Arranque */
aplicarIdioma(idioma);
renderizarCarrito();
observarRevelados();
