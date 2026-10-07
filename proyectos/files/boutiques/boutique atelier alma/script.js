/* ==========================================================================
   ATELIER ALMA · script.js
   Vanilla JavaScript · sin dependencias
   1. Utilidades
   2. Catálogo de productos (20 piezas)
   3. Diccionario de idiomas (ES / EN / VAL) + contenidos legales
   4. Estado global
   5. Idioma
   6. Tema claro / oscuro
   7. Menú hamburguesa
   8. Scroll suave, progreso, nav activa, reveal
   9. Tienda: filtros, orden, render
   10. Ficha de producto (modal)
   11. Carrito de compra (drawer + persistencia)
   12. Checkout: entrega, pago, confirmación
   13. Modal de búsqueda con resaltado
   14. Login (preparado para integrar)
   15. Formularios de contacto y newsletter
   16. Cookies, toasts, arranque
   ========================================================================== */
(function () {
  'use strict';

  /* ----------------------------- 1. UTILIDADES ---------------------------- */
  const $  = (sel, ctx) => (ctx || document).querySelector(sel);
  const $$ = (sel, ctx) => Array.prototype.slice.call((ctx || document).querySelectorAll(sel));

  const STORE = {
    theme: 'alma_theme',
    lang: 'alma_lang',
    cart: 'alma_cart_v1',
    cookies: 'alma_cookies'
  };

  const readStore = (key, fallback) => {
    try { const raw = localStorage.getItem(key); return raw === null ? fallback : JSON.parse(raw); }
    catch (e) { return fallback; }
  };
  const writeStore = (key, value) => {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) { /* almacenamiento no disponible */ }
  };

  const LOCALES = { es: 'es-ES', en: 'en-GB', va: 'ca-ES' };
  const money = (value) => Number(value).toLocaleString(LOCALES[state.lang] || 'es-ES', {
    style: 'currency', currency: 'EUR', minimumFractionDigits: 2
  });
  const dateLong = (iso) => {
    if (!iso) return '';
    const d = new Date(iso + 'T12:00:00');
    return d.toLocaleDateString(LOCALES[state.lang] || 'es-ES', { day: '2-digit', month: 'long', year: 'numeric' });
  };

  const SHIPPING_COST = 12;
  const FREE_SHIPPING_FROM = 500;
  const COD_FEE = 3.5;
  const PROMOS = {
    NOVIA10: { type: 'percent', value: 10 },
    ENVIOGRATIS: { type: 'shipping', value: 0 }
  };

  /* --------------------------- 2. CATÁLOGO (20 piezas) -------------------- */
  const IMG = (id) => 'https://images.pexels.com/photos/' + id + '/pexels-photo-' + id + '.jpeg?auto=compress&cs=tinysrgb&h=900&w=675';
  const DRESS_SIZES = ['34', '36', '38', '40', '42', '44'];
  const SUIT_SIZES = ['46', '48', '50', '52', '54'];
  const ONE_SIZE = ['Única'];

  const PRODUCTS = [
    { id: 'alma', cat: 'novias', price: 2450, img: IMG(39904252), sizes: DRESS_SIZES, stock: 3, badge: 'new',
      name: { es: 'Vestido Alma', en: 'Alma gown', va: 'Vestit Alma' },
      desc: { es: 'Encaje de Chantilly sobre mikado marfil, escote barco y cola circular.', en: 'Chantilly lace over ivory mikado, bateau neckline and circular train.', va: 'Encaix de Chantilly sobre mikado vori, escut barca i cua circular.' } },
    { id: 'serena', cat: 'novias', price: 1890, img: IMG(28863325), sizes: DRESS_SIZES, stock: 5,
      name: { es: 'Vestido Serena', en: 'Serena gown', va: 'Vestit Serena' },
      desc: { es: 'Satén duchessa minimalista con espalda recta y lazada oculta.', en: 'Minimalist duchesse satin with straight back and hidden lacing.', va: 'Saten duchessa minimalista amb esquena recta i cordó ocult.' } },
    { id: 'aurora', cat: 'novias', price: 2980, img: IMG(28863326), sizes: DRESS_SIZES, stock: 2,
      name: { es: 'Vestido Aurora', en: 'Aurora gown', va: 'Vestit Aurora' },
      desc: { es: 'Princesa de falda ampolla con can-can desmontable y 4 m de cola.', en: 'Ball gown with detachable petticoat and 4 m train.', va: 'Princesa de faldilla ampolla amb can-can desmuntable i 4 m de cua.' } },
    { id: 'lucia', cat: 'novias', price: 1650, old: 1990, img: IMG(28863322), sizes: DRESS_SIZES, stock: 1, badge: 'last',
      name: { es: 'Vestido Lucía', en: 'Lucía gown', va: 'Vestit Lucía' },
      desc: { es: 'Encaje con espalda abierta y botones de nácar hasta la cintura.', en: 'Open-back lace with mother-of-pearl buttons to the waist.', va: 'Encaix amb esquena oberta i botons de nacre fins a la cintura.' } },
    { id: 'marina', cat: 'novias', price: 2150, img: IMG(29495750), sizes: DRESS_SIZES, stock: 4,
      name: { es: 'Vestido Marina', en: 'Marina gown', va: 'Vestit Marina' },
      desc: { es: 'Sirena bordada a mano con cristales y hilo de seda mate.', en: 'Hand-embroidered mermaid with crystals and matte silk thread.', va: 'Sirena brodada a mà amb cristalls i fil de seda mat.' } },
    { id: 'vera', cat: 'novias', price: 1290, img: IMG(31118294), sizes: DRESS_SIZES, stock: 6, badge: 'new',
      name: { es: 'Vestido Vera', en: 'Vera gown', va: 'Vestit Vera' },
      desc: { es: 'Crepé bohemio de líneas limpias y mangas al codo.', en: 'Bohemian crepe with clean lines and elbow sleeves.', va: 'Crepé bohemi de línies netes i mànigues al colze.' } },
    { id: 'itaca', cat: 'novias', price: 1740, img: IMG(9936328), sizes: DRESS_SIZES, stock: 3,
      name: { es: 'Vestido Ítaca', en: 'Itaca gown', va: 'Vestit Ítaca' },
      desc: { es: 'Línea A con mangas farol transparentes y lazo de raso.', en: 'A-line with sheer puff sleeves and satin sash.', va: 'Línia A amb mànigues bufes transparents i llaç de ras.' } },
    { id: 'nube', cat: 'novias', price: 1980, img: IMG(9004582), sizes: DRESS_SIZES, stock: 4,
      name: { es: 'Vestido Nube', en: 'Nube gown', va: 'Vestit Nube' },
      desc: { es: 'Vestido vintage restaurado con bordado floral de los años 50.', en: 'Restored vintage gown with 1950s floral embroidery.', va: 'Vestit vintage restaurat amb brodat floral dels anys 50.' } },
    { id: 'aveleda', cat: 'invitadas', price: 320, img: IMG(31243104), sizes: DRESS_SIZES, stock: 8,
      name: { es: 'Vestido Aveleda', en: 'Aveleda dress', va: 'Vestit Aveleda' },
      desc: { es: 'Invitada de crepé plisado con lazado en la espalda.', en: 'Guest dress in pleated crepe with back lacing.', va: 'Convidada de crepé plecat amb cordó a l\'esquena.' } },
    { id: 'kora', cat: 'invitadas', price: 340, img: IMG(35516030), sizes: DRESS_SIZES, stock: 7,
      name: { es: 'Vestido Kora', en: 'Kora dress', va: 'Vestit Kora' },
      desc: { es: 'Invitada de color terracota con volante asimétrico.', en: 'Terracotta guest dress with asymmetric ruffle.', va: 'Convidada de color terracota amb volant asimètric.' } },
    { id: 'malva', cat: 'invitadas', price: 375, img: IMG(35698089), sizes: DRESS_SIZES, stock: 5, badge: 'new',
      name: { es: 'Vestido Malva', en: 'Malva dress', va: 'Vestit Malva' },
      desc: { es: 'Encaje malva forrado en satén, ideal para ceremonia de tarde.', en: 'Mauve lace lined in satin, ideal for afternoon ceremonies.', va: 'Encaix malva folrat en saten, ideal per a cerimònia de vesprada.' } },
    { id: 'ambar', cat: 'novios', price: 690, img: IMG(9936376), sizes: SUIT_SIZES, stock: 6,
      name: { es: 'Traje Ámbar', en: 'Ámbar suit', va: 'Vestit Ámbar' },
      desc: { es: 'Traje gris príncipe de Gales, forro de viscosa y solapas de pico.', en: 'Grey prince-of-wales suit with peak lapels.', va: 'Vestit gris príncep de Gal·les amb solapes de pic.' } },
    { id: 'marino', cat: 'novios', price: 740, img: IMG(34583595), sizes: SUIT_SIZES, stock: 4,
      name: { es: 'Traje Marino', en: 'Marino suit', va: 'Vestit Marí' },
      desc: { es: 'Azul marino de lana fría con chaleco a juego.', en: 'Cool-wool navy suit with matching waistcoat.', va: 'Blau marí de llana freda amb armilla a joc.' } },
    { id: 'camel', cat: 'novios', price: 720, img: IMG(38688408), sizes: SUIT_SIZES, stock: 1, badge: 'last',
      name: { es: 'Traje Camel', en: 'Camel suit', va: 'Vestit Camel' },
      desc: { es: 'Lino mezcla algodón para ceremonias al aire libre.', en: 'Linen-cotton blend for outdoor ceremonies.', va: 'Lli mesclat amb cotó per a cerimònies a l\'aire lliure.' } },
    { id: 'petala', cat: 'accesorios', price: 180, img: IMG(17984867), sizes: ONE_SIZE, stock: 9,
      name: { es: 'Velo Pétala', en: 'Pétala veil', va: 'Velo Pétala' },
      desc: { es: 'Tul de seda de 2,5 m con borde de encaje aplicado.', en: '2.5 m silk tulle with applied lace edge.', va: 'Tul de seda de 2,5 m amb vora d\'encaix aplicat.' } },
    { id: 'brisa', cat: 'accesorios', price: 145, img: IMG(32427331), sizes: ONE_SIZE, stock: 12,
      name: { es: 'Set de joyas Brisa', en: 'Brisa jewellery set', va: 'Joc de joies Brisa' },
      desc: { es: 'Collar, pendientes y pulsera en chapado de oro de 18 k.', en: 'Necklace, earrings and bracelet in 18k gold plate.', va: 'Collaret, arracades i polsera en xapat d\'or de 18 k.' } },
    { id: 'ebano', cat: 'accesorios', price: 95, img: IMG(38273585), sizes: ONE_SIZE, stock: 10,
      name: { es: 'Guantes Ébano', en: 'Ébano gloves', va: 'Guants Èban' },
      desc: { es: 'Guantes largos de encaje elástico, look vintage años 20.', en: 'Long stretch-lace gloves, 1920s vintage look.', va: 'Guants llargs d\'encaix elàstic, estil vintage anys 20.' } },
    { id: 'diadema', cat: 'accesorios', price: 220, img: IMG(6567642), sizes: ONE_SIZE, stock: 6, badge: 'new',
      name: { es: 'Diadema Aurora Boreal', en: 'Aurora headpiece', va: 'Diadema Aurora' },
      desc: { es: 'Diadema de cristales facetados sobre alambre dorado.', en: 'Faceted-crystal headpiece on gilded wire.', va: 'Diadema de cristalls facetats sobre fil daurat.' } },
    { id: 'nieve', cat: 'calzado', price: 165, img: IMG(32427345), sizes: ['36', '37', '38', '39', '40', '41'], stock: 8,
      name: { es: 'Zapatos Nieve', en: 'Nieve heels', va: 'Sabates Neu' },
      desc: { es: 'Salón de 7 cm en piel nácar con punta redonda.', en: '7 cm pumps in mother-of-pearl leather.', va: 'Saló de 7 cm en pell nacre amb punta rodona.' } },
    { id: 'duna', cat: 'calzado', price: 120, img: IMG(31252171), sizes: ['36', '37', '38', '39', '40', '41'], stock: 11,
      name: { es: 'Planas Duna', en: 'Duna flats', va: 'Planes Duna' },
      desc: { es: 'Bailarinas de raso con lazo, perfectas para el baile.', en: 'Satin bow ballet flats, perfect for dancing.', va: 'Ballerines de ras amb llaç, perfectes per al ball.' } }
  ];

  /* -------------------- 3. DICCIONARIO DE IDIOMAS ------------------------ */
  const I18N = {
    es: {
      'brand.tagline': 'Moda nupcial',
      'topbar.note': 'Atelier en València · Cita privada sin coste',
      'topbar.shipping': 'Envío gratuito desde 500 €',
      'nav.home': 'Inicio', 'nav.atelier': 'Atelier', 'nav.collection': 'Colección',
      'nav.services': 'Servicios', 'nav.experience': 'Experiencia', 'nav.contact': 'Contacto',
      'lang.label': 'Idioma',
      'search.open': 'Buscar en la página', 'search.title': 'Buscar en la página',
      'search.highlight': 'Resaltar', 'search.clear': 'Limpiar', 'search.hint': 'Escribe al menos dos caracteres. Los resultados incluyen secciones y piezas de la colección.',
      'search.noResults': 'Sin resultados para “{q}”', 'search.section': 'Sección', 'search.piece': 'Pieza',
      'hero.eyebrow': 'Colección 2026 · Marfil & Encaje',
      'hero.title': 'El vestido que cuenta tu historia',
      'hero.subtitle': 'Vestidos de novia confeccionados a mano en nuestro atelier de Valencia. Tejidos naturales, encajes franceses y ajuste perfecto para el día en que todo empieza.',
      'hero.cta1': 'Reservar cita privada', 'hero.cta2': 'Ver la colección', 'hero.scroll': 'Descubrir',
      'hero.stat1': 'años de oficio', 'hero.stat2': 'novias vestidas', 'hero.stat3': 'hecho en València', 'hero.stat4': 'valoración media',
      'atelier.eyebrow': 'Nuestro atelier', 'atelier.title': 'Un taller, dos manos y mucho silencio',
      'atelier.text1': 'Empezamos en 2002 en un pequeño bajo del barrio del Carmen. Hoy seguimos cosiendo cada vestido a mano, con tejidos de proveedores europeos y una sola regla: que la novia se reconozca en el espejo.',
      'atelier.text2': 'Cada proceso incluye tres pruebas, asesoría de imagen y ajuste posterior al evento. Sin prisas, sin costes ocultos y con el compromiso de entregar el vestido 15 días antes de la boda.',
      'atelier.f1t': 'Patronaje a medida', 'atelier.f1d': 'Patrón exclusivo según tus medidas reales.',
      'atelier.f2t': 'Tejidos naturales', 'atelier.f2d': 'Seda, crepé, mikado y encaje de Chantilly.',
      'atelier.f3t': 'Tres pruebas incluidas', 'atelier.f3d': 'Ajustes sin límite hasta el encaje final.',
      'atelier.f4t': 'Compra online o en cita', 'atelier.f4d': 'Reserva en la boutique o recíbelo en casa.',
      'atelier.quote': '“No vendemos vestidos, acompañamos decisiones.”',
      'atelier.quoteBy': '— Carmen Ferrer, directora del atelier',
      'shop.eyebrow': 'Tienda online', 'shop.title': 'La colección',
      'shop.lead': '20 piezas listas para enviar a casa o reservar y recoger en la boutique. Todas incluyen ajuste básico gratuito.',
      'shop.empty': 'No hay piezas que coincidan con el filtro seleccionado.', 'shop.sort': 'Ordenar',
      'shop.count': '{n} piezas',
      'filter.all': 'Todo', 'filter.novias': 'Vestidos de novia', 'filter.invitadas': 'Invitadas',
      'filter.novios': 'Novios', 'filter.accesorios': 'Accesorios', 'filter.calzado': 'Calzado',
      'cat.novias': 'Vestido de novia', 'cat.invitadas': 'Invitada', 'cat.novios': 'Novio',
      'cat.accesorios': 'Accesorio', 'cat.calzado': 'Calzado',
      'sort.featured': 'Destacados', 'sort.asc': 'Precio: menor a mayor', 'sort.desc': 'Precio: mayor a menor', 'sort.name': 'Nombre A-Z',
      'badge.new': 'Novedad', 'badge.last': 'Última pieza',
      'product.add': 'Añadir al carrito', 'product.detail': 'Ver detalle', 'product.size': 'Talla',
      'product.sizeChoose': 'Elige una talla', 'product.qty': 'Cantidad', 'product.adjust': 'Ajuste básico gratuito incluido',
      'product.shipInfo': 'Envío 48-72 h · Recogida gratuita en la boutique',
      'product.stockLeft': 'Quedan {n}', 'product.added': 'Añadido al carrito', 'product.needSize': 'Selecciona primero una talla',
      'services.eyebrow': 'Servicios', 'services.title': 'Lo que incluye el proceso',
      'services.s1t': 'Asesoría de imagen', 'services.s1d': 'Sesión de 90 minutos para definir silueta, paleta y estilo. Gratuita con reserva de vestido.',
      'services.s2t': 'Confección y arreglos', 'services.s2d': 'Taller propio: bajadas, corsés, adornos, refuerzos y restauración de piezas vintage.',
      'services.s3t': 'Envío nacional', 'services.s3d': 'Entrega en 48-72 h con embalaje protector y seguro de transporte incluido.',
      'services.s4t': 'Plan de pago flexible', 'services.s4d': 'Reserva con el 30% y paga el resto al recoger, contra entrega o por pasarela.',
      'banner.eyebrow': 'Cita privada', 'banner.title': 'El atelier, solo para ti',
      'banner.text': 'Cierra la boutique una mañana, trae a quien quieras y probamos hasta diez modelos con café y música. Sin compromiso de compra.',
      'banner.cta': 'Pedir cita',
      'exp.eyebrow': 'Experiencia', 'exp.title': 'De la idea a la última puntada',
      'exp.step1t': 'Primera visita', 'exp.step1d': 'Escuchamos tu historia y probamos siluetas.',
      'exp.step2t': 'Diseño y tejidos', 'exp.step2d': 'Elegimos tejidos, encajes y acabados.',
      'exp.step3t': 'Pruebas', 'exp.step3d': 'Tres citas de ajuste hasta el encaje perfecto.',
      'exp.step4t': 'Entrega', 'exp.step4d': 'Recoges en boutique o lo recibes en casa.',
      't1.text': '“Encontré el vestido en la primera prueba y me lo ajustaron mejor que un guante.”', 't1.name': 'Marta & Lluís', 't1.meta': 'València · junio 2025',
      't2.text': '“Compré el tocado y los zapatos online y llegaron en dos días, perfectamente embalados.”', 't2.name': 'Nerea P.', 't2.meta': 'Bilbao · encargo a domicilio',
      't3.text': '“Me restauraron el vestido de mi madre y quedó como nuevo. Un trabajo exquisito.”', 't3.name': 'Sofía R.', 't3.meta': 'Castelló · restauración',
      'contact.eyebrow': 'Contacto', 'contact.title': 'Hablemos de tu boda',
      'contact.lead': 'Respondemos en menos de 24 horas laborables. Si lo prefieres, llámanos y te atendemos en español, inglés o valenciano.',
      'form.name': 'Nombre completo', 'form.email': 'Email', 'form.phone': 'Teléfono', 'form.date': 'Fecha de la boda',
      'form.topic': 'Motivo de la consulta',
      'form.topic1': 'Vestido de novia a medida', 'form.topic2': 'Invitada / invitado', 'form.topic3': 'Accesorios y calzado',
      'form.topic4': 'Restauración de pieza vintage', 'form.topic5': 'Otros',
      'form.msg': 'Mensaje', 'form.privacy': 'He leído y acepto la política de privacidad y el uso de cookies.',
      'form.send': 'Enviar consulta', 'form.ok': '¡Gracias! Hemos recibido tu mensaje, te escribimos muy pronto.',
      'form.errName': 'Introduce tu nombre.', 'form.errEmail': 'Introduce un email válido.',
      'form.errPhone': 'Introduce un teléfono válido.', 'form.errMsg': 'Escribe al menos 10 caracteres.',
      'info.visit': 'Visítanos', 'info.hours': 'Horario',
      'info.hoursTxt': 'Lunes a viernes 10:00 – 19:00<br>Sábado solo con cita · Domingo cerrado',
      'info.call': 'Llámanos', 'info.pay': 'Formas de pago',
      'info.payTxt': 'En boutique al recoger, contra reembolso en la entrega o de forma segura con la pasarela de pago online.',
      'footer.about': 'Boutique y taller de moda nupcial en Valencia desde 2002. Vestidos de novia, invitadas, novios y accesorios hechos a mano.',
      'footer.help': 'Ayuda', 'footer.help1': 'La colección', 'footer.help2': 'Servicios y arreglos',
      'footer.help3': 'Pedir cita privada', 'footer.help4': 'Guía de tallas', 'footer.help5': 'Preguntas frecuentes',
      'footer.legal': 'Legal', 'footer.cookies': 'Política de cookies', 'footer.req': 'Requisitos y condiciones',
      'footer.privacy': 'Política de privacidad', 'footer.shipping': 'Envíos y devoluciones',
      'footer.news': 'Newsletter', 'footer.newsTxt': 'Colecciones, puertas abiertas y consejos de estilo. Sin spam.',
      'footer.newsOk': '¡Suscripción confirmada!', 'footer.rights': 'Todos los derechos reservados',
      'footer.made': 'Hecho con hilo y cariño en València', 'footer.cod': 'Contra reembolso',
      'login.title': 'Mi cuenta', 'login.tabIn': 'Acceder', 'login.tabUp': 'Crear cuenta',
      'login.pass': 'Contraseña', 'login.errPass': 'Mínimo 6 caracteres.', 'login.submit': 'Entrar',
      'login.note': 'Sistema de autenticación pendiente de integración: este formulario está preparado para conectar con tu backend.',
      'cart.title': 'Tu carrito', 'cart.empty': 'Tu carrito está vacío.', 'cart.goShop': 'Ver la colección',
      'cart.apply': 'Aplicar', 'cart.checkout': 'Tramitar pedido', 'cart.clear': 'Vaciar carrito',
      'cart.tax': 'Impuestos incluidos. Ajuste básico gratuito en boutique.',
      'cart.subtotal': 'Subtotal', 'cart.discount': 'Descuento ({code})', 'cart.shipping': 'Gastos de envío',
      'cart.pickup': 'Recogida en boutique', 'cart.free': 'Gratis', 'cart.total': 'Total',
      'cart.promoOk': 'Código aplicado', 'cart.promoKo': 'Código no válido',
      'checkout.title': 'Finalizar compra', 'checkout.step1': 'Entrega', 'checkout.step2': 'Pago', 'checkout.step3': 'Confirmación',
      'checkout.howTitle': '¿Cómo quieres recibir tu pedido?',
      'checkout.pickup': 'Recoger en la boutique', 'checkout.pickupTxt': 'Carrer dels Cadissers 14, València. Listo en 48 h.',
      'checkout.shipping': 'Envío a domicilio', 'checkout.shippingTxt': '48-72 h en península. Gratis desde 500 €.',
      'checkout.pickupData': 'Datos de la reserva', 'checkout.date': 'Fecha de recogida',
      'checkout.errDate': 'Elige una fecha a partir de mañana.', 'checkout.slot': 'Franja horaria',
      'checkout.shipData': 'Dirección de envío', 'checkout.address': 'Calle y número',
      'checkout.errAddress': 'Indica la dirección de entrega.', 'checkout.zip': 'Código postal', 'checkout.errZip': 'CP de 5 dígitos.',
      'checkout.city': 'Ciudad', 'checkout.errCity': 'Indica la ciudad.', 'checkout.notes': 'Notas para el repartidor',
      'checkout.continue': 'Continuar al pago', 'checkout.payTitle': '¿Cómo prefieres pagar?',
      'checkout.payPickup': 'Pagar al recoger en la boutique', 'checkout.payPickupTxt': 'Efectivo o tarjeta cuando vengas a probarlo. Sin coste extra.',
      'checkout.payCod': 'Pagar contra entrega (+3,50 €)', 'checkout.payCodTxt': 'Abonas el pedido al mensajero, en efectivo o datáfono móvil.',
      'checkout.payGateway': 'Pagar ahora con la pasarela del mercado', 'checkout.payGatewayTxt': 'Pago seguro con tarjeta. Te mostramos el importe exacto antes de confirmar.',
      'checkout.back': 'Volver', 'checkout.review': 'Revisar pedido', 'checkout.summary': 'Resumen del pedido',
      'checkout.payNow': 'Pagar ahora', 'checkout.gatewayNote': 'Aquí se abrirá la pasarela de pago del mercado para abonar el importe indicado.',
      'checkout.gatewayPending': 'Integración de la pasarela pendiente · botón simulado',
      'checkout.confirm': 'Confirmar pedido', 'checkout.okTitle': '¡Pedido confirmado!',
      'checkout.okText': 'Te hemos enviado un email con el resumen y los siguientes pasos.',
      'checkout.ref': 'Referencia', 'checkout.modePickup': 'Recogida en boutique', 'checkout.modeShipping': 'Envío a domicilio',
      'checkout.payPickupLabel': 'Pagarás al recogerlo en la boutique', 'checkout.payCodLabel': 'Pagarás contra entrega al mensajero',
      'checkout.items': 'Piezas', 'checkout.keepShopping': 'Seguir viendo la colección',
      'cookie.title': 'Cookies', 'cookie.text': 'Usamos cookies propias para recordar tu idioma, el modo claro/oscuro y tu carrito. Puedes aceptar o seguir navegando con la configuración esencial.',
      'cookie.more': 'Más info', 'cookie.accept': 'Aceptar',
      'toast.added': 'Añadido al carrito', 'toast.removed': 'Pieza eliminada', 'toast.cleared': 'Carrito vaciado',
      'toast.lang': 'Idioma cambiado', 'toast.login': 'Login pendiente de integración', 'toast.news': 'Suscripción confirmada',
      'toast.order': 'Pedido confirmado', 'toast.step': 'Completa los datos marcados'
    },

    en: {
      'brand.tagline': 'Bridal fashion',
      'topbar.note': 'Atelier in València · Free private appointment',
      'topbar.shipping': 'Free shipping from €500',
      'nav.home': 'Home', 'nav.atelier': 'Atelier', 'nav.collection': 'Collection',
      'nav.services': 'Services', 'nav.experience': 'Experience', 'nav.contact': 'Contact',
      'lang.label': 'Language',
      'search.open': 'Search the page', 'search.title': 'Search the page',
      'search.highlight': 'Highlight', 'search.clear': 'Clear', 'search.hint': 'Type at least two characters. Results include sections and pieces from the collection.',
      'search.noResults': 'No results for “{q}”', 'search.section': 'Section', 'search.piece': 'Piece',
      'hero.eyebrow': '2026 collection · Ivory & Lace',
      'hero.title': 'The dress that tells your story',
      'hero.subtitle': 'Bridal gowns handmade in our Valencia atelier. Natural fabrics, French laces and a perfect fit for the day everything begins.',
      'hero.cta1': 'Book a private fitting', 'hero.cta2': 'View the collection', 'hero.scroll': 'Discover',
      'hero.stat1': 'years of craft', 'hero.stat2': 'brides dressed', 'hero.stat3': 'made in València', 'hero.stat4': 'average rating',
      'atelier.eyebrow': 'Our atelier', 'atelier.title': 'One workshop, two hands and plenty of silence',
      'atelier.text1': 'We started in 2002 in a tiny shop in El Carme. We still hand-sew every gown using fabrics from European suppliers and one single rule: the bride must recognise herself in the mirror.',
      'atelier.text2': 'Every process includes three fittings, image consulting and a post-event adjustment. No rush, no hidden costs, and the gown is delivered 15 days before the wedding.',
      'atelier.f1t': 'Made-to-measure patterns', 'atelier.f1d': 'An exclusive pattern based on your real measurements.',
      'atelier.f2t': 'Natural fabrics', 'atelier.f2d': 'Silk, crepe, mikado and Chantilly lace.',
      'atelier.f3t': 'Three fittings included', 'atelier.f3d': 'Unlimited adjustments until the final fit.',
      'atelier.f4t': 'Buy online or in store', 'atelier.f4d': 'Reserve in the boutique or get it delivered.',
      'atelier.quote': '“We do not sell dresses, we accompany decisions.”',
      'atelier.quoteBy': '— Carmen Ferrer, atelier director',
      'shop.eyebrow': 'Online shop', 'shop.title': 'The collection',
      'shop.lead': '20 pieces ready to ship home or to reserve and collect in the boutique. All of them include a free basic fitting.',
      'shop.empty': 'No pieces match the selected filter.', 'shop.sort': 'Sort by',
      'shop.count': '{n} pieces',
      'filter.all': 'All', 'filter.novias': 'Bridal gowns', 'filter.invitadas': 'Guests',
      'filter.novios': 'Grooms', 'filter.accesorios': 'Accessories', 'filter.calzado': 'Shoes',
      'cat.novias': 'Bridal gown', 'cat.invitadas': 'Guest dress', 'cat.novios': 'Groom suit',
      'cat.accesorios': 'Accessory', 'cat.calzado': 'Shoes',
      'sort.featured': 'Featured', 'sort.asc': 'Price: low to high', 'sort.desc': 'Price: high to low', 'sort.name': 'Name A-Z',
      'badge.new': 'New in', 'badge.last': 'Last piece',
      'product.add': 'Add to cart', 'product.detail': 'View details', 'product.size': 'Size',
      'product.sizeChoose': 'Choose a size', 'product.qty': 'Quantity', 'product.adjust': 'Free basic fitting included',
      'product.shipInfo': 'Delivery 48-72 h · Free boutique pick-up',
      'product.stockLeft': 'Only {n} left', 'product.added': 'Added to cart', 'product.needSize': 'Please select a size first',
      'services.eyebrow': 'Services', 'services.title': 'What the process includes',
      'services.s1t': 'Image consulting', 'services.s1d': 'A 90-minute session to define silhouette, palette and style. Free when you book a gown.',
      'services.s2t': 'Tailoring & alterations', 'services.s2d': 'In-house workshop: hems, corsets, appliqués, reinforcements and vintage restoration.',
      'services.s3t': 'Nationwide delivery', 'services.s3d': '48-72 h delivery with protective packaging and transport insurance included.',
      'services.s4t': 'Flexible payment plan', 'services.s4d': 'Book with 30% and pay the rest on collection, on delivery or via the gateway.',
      'banner.eyebrow': 'Private appointment', 'banner.title': 'The atelier, just for you',
      'banner.text': 'Close the boutique for one morning, bring whoever you like and we will try up to ten gowns with coffee and music. No purchase commitment.',
      'banner.cta': 'Request an appointment',
      'exp.eyebrow': 'Experience', 'exp.title': 'From the idea to the last stitch',
      'exp.step1t': 'First visit', 'exp.step1d': 'We listen to your story and try silhouettes.',
      'exp.step2t': 'Design & fabrics', 'exp.step2d': 'We choose fabrics, laces and finishes.',
      'exp.step3t': 'Fittings', 'exp.step3d': 'Three appointments until the perfect fit.',
      'exp.step4t': 'Delivery', 'exp.step4d': 'Collect in the boutique or receive it at home.',
      't1.text': '“I found the dress at the first fitting and they fitted it like a glove.”', 't1.name': 'Marta & Lluís', 't1.meta': 'València · June 2025',
      't2.text': '“I bought the headpiece and the shoes online and they arrived in two days, perfectly packed.”', 't2.name': 'Nerea P.', 't2.meta': 'Bilbao · home delivery',
      't3.text': '“They restored my mother’s gown and it looks brand new. Exquisite work.”', 't3.name': 'Sofía R.', 't3.meta': 'Castelló · restoration',
      'contact.eyebrow': 'Contact', 'contact.title': 'Let’s talk about your wedding',
      'contact.lead': 'We reply within 24 working hours. You can also call us and we will assist you in Spanish, English or Valencian.',
      'form.name': 'Full name', 'form.email': 'Email', 'form.phone': 'Phone', 'form.date': 'Wedding date',
      'form.topic': 'Reason for your enquiry',
      'form.topic1': 'Made-to-measure bridal gown', 'form.topic2': 'Guest outfit', 'form.topic3': 'Accessories and shoes',
      'form.topic4': 'Vintage piece restoration', 'form.topic5': 'Other',
      'form.msg': 'Message', 'form.privacy': 'I have read and accept the privacy policy and the use of cookies.',
      'form.send': 'Send enquiry', 'form.ok': 'Thank you! We have received your message and will reply very soon.',
      'form.errName': 'Please enter your name.', 'form.errEmail': 'Please enter a valid email.',
      'form.errPhone': 'Please enter a valid phone.', 'form.errMsg': 'Please write at least 10 characters.',
      'info.visit': 'Visit us', 'info.hours': 'Opening hours',
      'info.hoursTxt': 'Monday to Friday 10:00 – 19:00<br>Saturday by appointment · Sunday closed',
      'info.call': 'Call us', 'info.pay': 'Payment methods',
      'info.payTxt': 'In the boutique on collection, cash on delivery or securely through the online payment gateway.',
      'footer.about': 'Bridal fashion boutique and workshop in Valencia since 2002. Bridal gowns, guests, grooms and accessories made by hand.',
      'footer.help': 'Help', 'footer.help1': 'The collection', 'footer.help2': 'Services and alterations',
      'footer.help3': 'Book a private fitting', 'footer.help4': 'Size guide', 'footer.help5': 'FAQ',
      'footer.legal': 'Legal', 'footer.cookies': 'Cookie policy', 'footer.req': 'Terms & requirements',
      'footer.privacy': 'Privacy policy', 'footer.shipping': 'Shipping & returns',
      'footer.news': 'Newsletter', 'footer.newsTxt': 'Collections, open days and styling tips. No spam.',
      'footer.newsOk': 'Subscription confirmed!', 'footer.rights': 'All rights reserved',
      'footer.made': 'Made with thread and love in València', 'footer.cod': 'Cash on delivery',
      'login.title': 'My account', 'login.tabIn': 'Sign in', 'login.tabUp': 'Create account',
      'login.pass': 'Password', 'login.errPass': 'At least 6 characters.', 'login.submit': 'Sign in',
      'login.note': 'Authentication system pending integration: this form is ready to connect to your backend.',
      'cart.title': 'Your cart', 'cart.empty': 'Your cart is empty.', 'cart.goShop': 'View the collection',
      'cart.apply': 'Apply', 'cart.checkout': 'Proceed to checkout', 'cart.clear': 'Empty cart',
      'cart.tax': 'Taxes included. Free basic fitting in the boutique.',
      'cart.subtotal': 'Subtotal', 'cart.discount': 'Discount ({code})', 'cart.shipping': 'Shipping',
      'cart.pickup': 'Boutique pick-up', 'cart.free': 'Free', 'cart.total': 'Total',
      'cart.promoOk': 'Code applied', 'cart.promoKo': 'Invalid code',
      'checkout.title': 'Checkout', 'checkout.step1': 'Delivery', 'checkout.step2': 'Payment', 'checkout.step3': 'Confirmation',
      'checkout.howTitle': 'How would you like to receive your order?',
      'checkout.pickup': 'Collect in the boutique', 'checkout.pickupTxt': 'Carrer dels Cadissers 14, València. Ready in 48 h.',
      'checkout.shipping': 'Home delivery', 'checkout.shippingTxt': '48-72 h in mainland Spain. Free from €500.',
      'checkout.pickupData': 'Reservation details', 'checkout.date': 'Pick-up date',
      'checkout.errDate': 'Choose a date from tomorrow onwards.', 'checkout.slot': 'Time slot',
      'checkout.shipData': 'Shipping address', 'checkout.address': 'Street and number',
      'checkout.errAddress': 'Please enter the delivery address.', 'checkout.zip': 'Post code', 'checkout.errZip': '5-digit post code.',
      'checkout.city': 'City', 'checkout.errCity': 'Please enter the city.', 'checkout.notes': 'Notes for the courier',
      'checkout.continue': 'Continue to payment', 'checkout.payTitle': 'How would you like to pay?',
      'checkout.payPickup': 'Pay on collection in the boutique', 'checkout.payPickupTxt': 'Cash or card when you come to try it on. No extra cost.',
      'checkout.payCod': 'Cash on delivery (+€3.50)', 'checkout.payCodTxt': 'You pay the courier, in cash or with a mobile card reader.',
      'checkout.payGateway': 'Pay now with the marketplace gateway', 'checkout.payGatewayTxt': 'Secure card payment. We show you the exact amount before confirming.',
      'checkout.back': 'Back', 'checkout.review': 'Review order', 'checkout.summary': 'Order summary',
      'checkout.payNow': 'Pay now', 'checkout.gatewayNote': 'The marketplace payment gateway will open here to pay the amount shown.',
      'checkout.gatewayPending': 'Gateway integration pending · simulated button',
      'checkout.confirm': 'Confirm order', 'checkout.okTitle': 'Order confirmed!',
      'checkout.okText': 'We have emailed you the summary and the next steps.',
      'checkout.ref': 'Reference', 'checkout.modePickup': 'Boutique pick-up', 'checkout.modeShipping': 'Home delivery',
      'checkout.payPickupLabel': 'You will pay when you collect it in the boutique',
      'checkout.payCodLabel': 'You will pay the courier on delivery',
      'checkout.items': 'Items', 'checkout.keepShopping': 'Keep browsing the collection',
      'cookie.title': 'Cookies', 'cookie.text': 'We use our own cookies to remember your language, light/dark mode and your cart. You can accept or continue with the essential settings only.',
      'cookie.more': 'More info', 'cookie.accept': 'Accept',
      'toast.added': 'Added to cart', 'toast.removed': 'Item removed', 'toast.cleared': 'Cart emptied',
      'toast.lang': 'Language changed', 'toast.login': 'Login pending integration', 'toast.news': 'Subscription confirmed',
      'toast.order': 'Order confirmed', 'toast.step': 'Please complete the highlighted fields'
    },

    va: {
      'brand.tagline': 'Moda nupcial',
      'topbar.note': 'Atelier a València · Cita privada gratuïta',
      'topbar.shipping': 'Enviament gratuït des de 500 €',
      'nav.home': 'Inici', 'nav.atelier': 'Atelier', 'nav.collection': 'Col·lecció',
      'nav.services': 'Serveis', 'nav.experience': 'Experiència', 'nav.contact': 'Contacte',
      'lang.label': 'Idioma',
      'search.open': 'Buscar a la pàgina', 'search.title': 'Buscar a la pàgina',
      'search.highlight': 'Ressaltar', 'search.clear': 'Netejar', 'search.hint': 'Escriu almenys dos caràcters. Els resultats inclouen seccions i peces de la col·lecció.',
      'search.noResults': 'Sense resultats per a “{q}”', 'search.section': 'Secció', 'search.piece': 'Peça',
      'hero.eyebrow': 'Col·lecció 2026 · Vori & Encaix',
      'hero.title': 'El vestit que conta la teua història',
      'hero.subtitle': 'Vestits de núvia confeccionats a mà al nostre atelier de València. Teixits naturals, encaixos francesos i encaix perfecte per al dia en què tot comença.',
      'hero.cta1': 'Reservar cita privada', 'hero.cta2': 'Veure la col·lecció', 'hero.scroll': 'Descobrir',
      'hero.stat1': 'anys d\'ofici', 'hero.stat2': 'núvies vestides', 'hero.stat3': 'fet a València', 'hero.stat4': 'valoració mitjana',
      'atelier.eyebrow': 'El nostre atelier', 'atelier.title': 'Un taller, dos mans i molt de silenci',
      'atelier.text1': 'Vam començar l\'any 2002 en un xicotet baix del barri del Carme. Hui encara cussem cada vestit a mà, amb teixits de proveïdors europeus i una sola regla: que la núvia es reconega al mirall.',
      'atelier.text2': 'Cada procés inclou tres proves, assessorament d\'imatge i ajust posterior a l\'esdeveniment. Sense presses, sense costos ocults i amb el compromís de lliurar el vestit 15 dies abans del casament.',
      'atelier.f1t': 'Patronatge a mida', 'atelier.f1d': 'Patró exclusiu segons les teues mesures reals.',
      'atelier.f2t': 'Teixits naturals', 'atelier.f2d': 'Seda, crepé, mikado i encaix de Chantilly.',
      'atelier.f3t': 'Tres proves incloses', 'atelier.f3d': 'Ajustos sense límit fins a l\'encaix final.',
      'atelier.f4t': 'Compra online o en cita', 'atelier.f4d': 'Reserva a la boutique o rep-lo a casa.',
      'atelier.quote': '“No venem vestits, acompanyem decisions.”',
      'atelier.quoteBy': '— Carmen Ferrer, directora de l\'atelier',
      'shop.eyebrow': 'Botiga online', 'shop.title': 'La col·lecció',
      'shop.lead': '20 peces llestes per a enviar a casa o reservar i recollir a la boutique. Totes inclouen ajust bàsic gratuït.',
      'shop.empty': 'No hi ha peces que coincidisquen amb el filtre seleccionat.', 'shop.sort': 'Ordenar',
      'shop.count': '{n} peces',
      'filter.all': 'Tot', 'filter.novias': 'Vestits de núvia', 'filter.invitadas': 'Convidades',
      'filter.novios': 'Núvies i nuvis', 'filter.accesorios': 'Accessoris', 'filter.calzado': 'Calçat',
      'cat.novias': 'Vestit de núvia', 'cat.invitadas': 'Convidada', 'cat.novios': 'Vestit de nuvi',
      'cat.accesorios': 'Accessoris', 'cat.calzado': 'Calçat',
      'sort.featured': 'Destacats', 'sort.asc': 'Preu: menor a major', 'sort.desc': 'Preu: major a menor', 'sort.name': 'Nom A-Z',
      'badge.new': 'Novetat', 'badge.last': 'Última peça',
      'product.add': 'Afegir al carret', 'product.detail': 'Veure detall', 'product.size': 'Talla',
      'product.sizeChoose': 'Tria una talla', 'product.qty': 'Quantitat', 'product.adjust': 'Ajust bàsic gratuït inclòs',
      'product.shipInfo': 'Enviament 48-72 h · Recollida gratuïta a la boutique',
      'product.stockLeft': 'Queden {n}', 'product.added': 'Afegit al carret', 'product.needSize': 'Selecciona primer una talla',
      'services.eyebrow': 'Serveis', 'services.title': 'Què inclou el procés',
      'services.s1t': 'Assessorament d\'imatge', 'services.s1d': 'Sessió de 90 minuts per a definir silueta, paleta i estil. Gratuïta amb reserva de vestit.',
      'services.s2t': 'Confecció i arreglos', 'services.s2d': 'Taller propi: baixades, cotilles, adorns, reforços i restauració de peces vintage.',
      'services.s3t': 'Enviament nacional', 'services.s3d': 'Lliurament en 48-72 h amb embalatge protector i assegurança de transport inclosa.',
      'services.s4t': 'Pla de pagament flexible', 'services.s4d': 'Reserva amb el 30% i paga la resta en recollir, contra lliurament o per passarel·la.',
      'banner.eyebrow': 'Cita privada', 'banner.title': 'L\'atelier, només per a tu',
      'banner.text': 'Tanca la boutique un matí, porta qui vulgues i provem fins a deu models amb cafè i música. Sense compromís de compra.',
      'banner.cta': 'Deminar cita',
      'exp.eyebrow': 'Experiència', 'exp.title': 'De la idea a l\'última puntada',
      'exp.step1t': 'Primera visita', 'exp.step1d': 'Escoltem la teua història i provem siluetes.',
      'exp.step2t': 'Disseny i teixits', 'exp.step2d': 'Elegim teixits, encaixos i acabats.',
      'exp.step3t': 'Proves', 'exp.step3d': 'Tres cites d\'ajust fins a l\'encaix perfecte.',
      'exp.step4t': 'Lliurament', 'exp.step4d': 'Reculls a la boutique o el reps a casa.',
      't1.text': '“Vaig trobar el vestit a la primera prova i me l\'ajustaren millor que un guant.”', 't1.name': 'Marta & Lluís', 't1.meta': 'València · juny 2025',
      't2.text': '“Vaig comprar el tocado i les sabates online i arribaren en dos dies, perfectament embalats.”', 't2.name': 'Nerea P.', 't2.meta': 'Bilbao · encàrrec a domicili',
      't3.text': '“Em restauraren el vestit de la meua mare i quedà com nou. Un treball exquisit.”', 't3.name': 'Sofía R.', 't3.meta': 'Castelló · restauració',
      'contact.eyebrow': 'Contacte', 'contact.title': 'Parlem del teu casament',
      'contact.lead': 'Respondrem en menys de 24 hores laborables. Si vols, truca\'ns i t\'atendrem en valencià, castellà o anglès.',
      'form.name': 'Nom complet', 'form.email': 'Correu electrònic', 'form.phone': 'Telèfon', 'form.date': 'Data del casament',
      'form.topic': 'Motiu de la consulta',
      'form.topic1': 'Vestit de núvia a mida', 'form.topic2': 'Convidada / convidat', 'form.topic3': 'Accessoris i calçat',
      'form.topic4': 'Restauració de peça vintage', 'form.topic5': 'Altres',
      'form.msg': 'Missatge', 'form.privacy': 'He llegit i accepte la política de privacitat i l\'ús de cookies.',
      'form.send': 'Enviar consulta', 'form.ok': 'Gràcies! Hem rebut el teu missatge, t\'escrivim molt prompte.',
      'form.errName': 'Introdueix el teu nom.', 'form.errEmail': 'Introdueix un correu vàlid.',
      'form.errPhone': 'Introdueix un telèfon vàlid.', 'form.errMsg': 'Escriu almenys 10 caràcters.',
      'info.visit': 'Visita\'ns', 'info.hours': 'Horari',
      'info.hoursTxt': 'Dilluns a divendres 10:00 – 19:00<br>Dissabte només amb cita · Diumenge tancat',
      'info.call': 'Truca\'ns', 'info.pay': 'Formes de pagament',
      'info.payTxt': 'A la boutique en recollir, contra reemborsament en el lliurament o de manera segura amb la passarel·la de pagament online.',
      'footer.about': 'Boutique i taller de moda nupcial a València des de 2002. Vestits de núvia, convidades, nuvis i accessoris fets a mà.',
      'footer.help': 'Ajuda', 'footer.help1': 'La col·lecció', 'footer.help2': 'Serveis i arreglos',
      'footer.help3': 'Demanar cita privada', 'footer.help4': 'Guia de talls', 'footer.help5': 'Preguntes freqüents',
      'footer.legal': 'Legal', 'footer.cookies': 'Política de cookies', 'footer.req': 'Requisits i condicions',
      'footer.privacy': 'Política de privacitat', 'footer.shipping': 'Enviaments i devolucions',
      'footer.news': 'Butlletí', 'footer.newsTxt': 'Col·leccions, portes obertes i consells d\'estil. Sense spam.',
      'footer.newsOk': 'Subscripció confirmada!', 'footer.rights': 'Tots els drets reservats',
      'footer.made': 'Fet amb fil i afecte a València', 'footer.cod': 'Contra reemborsament',
      'login.title': 'El meu compte', 'login.tabIn': 'Accedir', 'login.tabUp': 'Crear compte',
      'login.pass': 'Contrasenya', 'login.errPass': 'Mínim 6 caràcters.', 'login.submit': 'Entrar',
      'login.note': 'Sistema d\'autenticació pendent d\'integració: aquest formulari està preparat per a connectar amb el teu backend.',
      'cart.title': 'El teu carret', 'cart.empty': 'El teu carret està buit.', 'cart.goShop': 'Veure la col·lecció',
      'cart.apply': 'Aplicar', 'cart.checkout': 'Tramitar comanda', 'cart.clear': 'Buidar carret',
      'cart.tax': 'Impostos inclosos. Ajust bàsic gratuït a la boutique.',
      'cart.subtotal': 'Subtotal', 'cart.discount': 'Descompte ({code})', 'cart.shipping': 'Despeses d\'enviament',
      'cart.pickup': 'Recollida a la boutique', 'cart.free': 'Gratuït', 'cart.total': 'Total',
      'cart.promoOk': 'Codi aplicat', 'cart.promoKo': 'Codi no vàlid',
      'checkout.title': 'Finalitzar compra', 'checkout.step1': 'Lliurament', 'checkout.step2': 'Pagament', 'checkout.step3': 'Confirmació',
      'checkout.howTitle': 'Com vols rebre la comanda?',
      'checkout.pickup': 'Recollir a la boutique', 'checkout.pickupTxt': 'Carrer dels Cadissers 14, València. Llest en 48 h.',
      'checkout.shipping': 'Enviament a domicili', 'checkout.shippingTxt': '48-72 h a la península. Gratuït des de 500 €.',
      'checkout.pickupData': 'Dades de la reserva', 'checkout.date': 'Data de recollida',
      'checkout.errDate': 'Tria una data a partir de demà.', 'checkout.slot': 'Franja horària',
      'checkout.shipData': 'Adreça d\'enviament', 'checkout.address': 'Carrer i número',
      'checkout.errAddress': 'Indica l\'adreça de lliurament.', 'checkout.zip': 'Codi postal', 'checkout.errZip': 'CP de 5 dígits.',
      'checkout.city': 'Ciutat', 'checkout.errCity': 'Indica la ciutat.', 'checkout.notes': 'Notes per al repartidor',
      'checkout.continue': 'Continuar al pagament', 'checkout.payTitle': 'Com vols pagar?',
      'checkout.payPickup': 'Pagar en recollir a la boutique', 'checkout.payPickupTxt': 'Efectiu o targeta quan vindràs a provar-ho. Sense cost extra.',
      'checkout.payCod': 'Pagar contra lliurament (+3,50 €)', 'checkout.payCodTxt': 'Pagues al missatger, en efectiu o amb datàfon mòbil.',
      'checkout.payGateway': 'Pagar ara amb la passarel·la del mercat', 'checkout.payGatewayTxt': 'Pagament segur amb targeta. Et mostrem l\'import exacte abans de confirmar.',
      'checkout.back': 'Tornar', 'checkout.review': 'Revisar comanda', 'checkout.summary': 'Resum de la comanda',
      'checkout.payNow': 'Pagar ara', 'checkout.gatewayNote': 'Ací s\'obrirà la passarel·la de pagament del mercat per a abonar l\'import indicat.',
      'checkout.gatewayPending': 'Integració de la passarel·la pendent · botó simulat',
      'checkout.confirm': 'Confirmar comanda', 'checkout.okTitle': 'Comanda confirmada!',
      'checkout.okText': 'T\'hem enviat un correu amb el resum i els passos següents.',
      'checkout.ref': 'Referència', 'checkout.modePickup': 'Recollida a la boutique', 'checkout.modeShipping': 'Enviament a domicili',
      'checkout.payPickupLabel': 'Pagaràs en recollir-lo a la boutique',
      'checkout.payCodLabel': 'Pagaràs contra lliurament al missatger',
      'checkout.items': 'Peces', 'checkout.keepShopping': 'Continuar veient la col·lecció',
      'cookie.title': 'Cookies', 'cookie.text': 'Utilitzem cookies pròpies per a recordar el teu idioma, el mode clar/fosc i el teu carret. Pots acceptar o continuar amb la configuració essencial.',
      'cookie.more': 'Més informació', 'cookie.accept': 'Acceptar',
      'toast.added': 'Afegit al carret', 'toast.removed': 'Peça eliminada', 'toast.cleared': 'Carret buidat',
      'toast.lang': 'Idioma canviat', 'toast.login': 'Login pendent d\'integració', 'toast.news': 'Subscripció confirmada',
      'toast.order': 'Comanda confirmada', 'toast.step': 'Completa les dades marcades'
    }
  };

  /* Contenidos legales e informativos (por idioma) */
  const INFO_DOCS = {
    es: {
      cookies: { t: 'Política de cookies', b: [
        ['Qué son', 'Las cookies son pequeños archivos que se guardan en tu dispositivo cuando visitas atelieralma.es. Nos permiten recordar tus preferencias y mejorar tu experiencia de compra.'],
        ['Cookies que usamos', 'Preferencias (idioma, modo claro/oscuro y carrito) son cookies técnicas necesarias. Las cookies analíticas solo se activan si las aceptas.'],
        ['Cómo gestionarlas', 'Puedes aceptarlas, rechazarlas o borrarlas desde la configuración de tu navegador en cualquier momento.'] ] },
      requisitos: { t: 'Requisitos y condiciones', b: [
        ['Condiciones de compra', 'Los precios incluyen IVA. La reserva de un vestido a medida requiere un anticipo del 30% y no es reembolsable una vez cortado el tejido.'],
        ['Plazos', 'Las piezas de stock se preparan en 48 h. La confección a medida requiere de 8 a 12 semanas. Recomendamos empezar las pruebas 5 meses antes de la boda.'],
        ['Requisitos de devolución', 'Se aceptan devoluciones de accesorios y calzado sin usar en 14 días naturales con el embalaje original. Los vestidos de novia a medida no son devolvibles.'] ] },
      privacidad: { t: 'Política de privacidad', b: [
        ['Responsable', 'Atelier Alma S.L. · CIF B-12345678 · Carrer dels Cadissers 14, 46003 València.'],
        ['Finalidad', 'Gestionar tus consultas, citas y pedidos. Nunca cedemos tus datos a terceros con fines publicitarios.'],
        ['Derechos', 'Puedes acceder, rectificar o suprimir tus datos escribiendo a hola@atelieralma.es.'] ] },
      envios: { t: 'Envíos y devoluciones', b: [
        ['Envíos', 'Península 48-72 h (12 €, gratuito desde 500 €). Baleares 3-4 días. Canarias y Ceuta bajo consulta.'],
        ['Recogida en boutique', 'Puedes reservar online y recoger en el atelier sin coste, con cita previa de 30 minutos para probártelo.'],
        ['Devoluciones', '14 días naturales en accesorios y calzado sin usar. El ajuste básico es gratuito y está incluido en todos los pedidos.'] ] },
      sizes: { t: 'Guía de tallas', b: [
        ['Vestidos de novia', 'Tallas 34 a 44 equivalentes a contorno de pecho de 80 a 100 cm. Todos los vestidos se ajustan a tu medida real.'],
        ['Trajes de novio', 'Tallas 46 a 54. Indícanos altura y contorno de pecho y te confirmamos la talla exacta.'],
        ['Calzado', 'Tallas 36 a 41. Si dudas entre dos tallas, elige la mayor: nuestros zapatos son de piel y ceden medio número.'] ] },
      faq: { t: 'Preguntas frecuentes', b: [
        ['¿Puedo comprar un vestido sin cita?', 'Sí. Los accesorios, calzado y vestidos de invitada se compran directamente online. Para vestidos de novia recomendamos cita.'],
        ['¿Puedo pagar al recoger?', 'Sí, puedes pagar en efectivo o con tarjeta en la boutique, contra entrega al mensajero o de forma segura con la pasarela online.'],
        ['¿Hacéis restauraciones?', 'Restauramos y adaptamos piezas vintage. Escríbenos con fotos y te enviamos presupuesto en 48 h.'] ] }
    },
    en: {
      cookies: { t: 'Cookie policy', b: [
        ['What they are', 'Cookies are small files stored on your device when you visit atelieralma.es. They let us remember your preferences and improve your shopping experience.'],
        ['Cookies we use', 'Preference cookies (language, light/dark mode and cart) are strictly necessary. Analytics cookies are only enabled if you accept them.'],
        ['How to manage them', 'You can accept, reject or delete them from your browser settings at any time.'] ] },
      requisitos: { t: 'Terms & requirements', b: [
        ['Purchase conditions', 'Prices include VAT. Booking a made-to-measure gown requires a 30% deposit, non-refundable once the fabric is cut.'],
        ['Timelines', 'Stock pieces are prepared within 48 h. Made-to-measure tailoring takes 8 to 12 weeks. We recommend starting fittings 5 months before the wedding.'],
        ['Return requirements', 'Unused accessories and shoes can be returned within 14 calendar days in their original packaging. Made-to-measure bridal gowns cannot be returned.'] ] },
      privacidad: { t: 'Privacy policy', b: [
        ['Data controller', 'Atelier Alma S.L. · VAT B-12345678 · Carrer dels Cadissers 14, 46003 València, Spain.'],
        ['Purpose', 'Managing your enquiries, appointments and orders. We never share your data with third parties for advertising.'],
        ['Your rights', 'You can access, rectify or delete your data by writing to hola@atelieralma.es.'] ] },
      envios: { t: 'Shipping & returns', b: [
        ['Shipping', 'Mainland Spain 48-72 h (€12, free from €500). Balearic Islands 3-4 days. Canary Islands on request.'],
        ['Boutique pick-up', 'You can reserve online and collect at the atelier at no cost, with a 30-minute fitting appointment.'],
        ['Returns', '14 calendar days for unused accessories and shoes. A basic fitting is free and included with every order.'] ] },
      sizes: { t: 'Size guide', b: [
        ['Bridal gowns', 'Sizes 34 to 44, equivalent to an 80-100 cm bust. Every gown is adjusted to your real measurements.'],
        ['Groom suits', 'Sizes 46 to 54. Tell us your height and chest measurement and we will confirm your size.'],
        ['Shoes', 'Sizes 36 to 41. If you are between two sizes, go for the larger one: our leather shoes give half a size.'] ] },
      faq: { t: 'Frequently asked questions', b: [
        ['Can I buy a gown without an appointment?', 'Yes. Accessories, shoes and guest dresses can be bought directly online. For bridal gowns we recommend an appointment.'],
        ['Can I pay on collection?', 'Yes: cash or card in the boutique, cash on delivery or securely through the online gateway.'],
        ['Do you restore pieces?', 'We restore and adapt vintage pieces. Send us photos and we will quote within 48 h.'] ] }
    },
    va: {
      cookies: { t: 'Política de cookies', b: [
        ['Què són', 'Les cookies són xicotets arxius que es guarden al teu dispositiu quan visites atelieralma.es. Ens permeten recordar les teues preferències i millorar l\'experiència de compra.'],
        ['Cookies que usem', 'Les de preferències (idioma, mode clar/fosc i carret) són cookies tècniques necessàries. Les analítiques només s\'activen si les acceptes.'],
        ['Com gestionar-les', 'Pots acceptar-les, rebutjar-les o esborrar-les des de la configuració del teu navegador en qualsevol moment.'] ] },
      requisitos: { t: 'Requisits i condicions', b: [
        ['Condicions de compra', 'Els preus inclouen IVA. La reserva d\'un vestit a mida requereix un avançament del 30% i no és reemborsable una vegada tallat el teixit.'],
        ['Terminis', 'Les peces d\'estoc es preparen en 48 h. La confecció a mida requereix de 8 a 12 setmanes. Recomanem començar les proves 5 mesos abans del casament.'],
        ['Requisits de devolució', 'S\'accepten devolucions d\'accessoris i calçat sense utilitzar en 14 dies naturals amb l\'embalatge original. Els vestits de núvia a mida no es poden retornar.'] ] },
      privacidad: { t: 'Política de privacitat', b: [
        ['Responsable', 'Atelier Alma S.L. · CIF B-12345678 · Carrer dels Cadissers 14, 46003 València.'],
        ['Finalitat', 'Gestionar les teues consultes, cites i comandes. Mai cedim les teues dades a tercers amb fins publicitaris.'],
        ['Drets', 'Pots accedir, rectificar o suprimir les teues dades escrivint a hola@atelieralma.es.'] ] },
      envios: { t: 'Enviaments i devolucions', b: [
        ['Enviaments', 'Península 48-72 h (12 €, gratuït des de 500 €). Balears 3-4 dies. Canàries i Ceuta sota consulta.'],
        ['Recollida a la boutique', 'Pots reservar online i recollir a l\'atelier sense cost, amb cita prèvia de 30 minuts per a provar-te\'l.'],
        ['Devolucions', '14 dies naturals en accessoris i calçat sense utilitzar. L\'ajust bàsic és gratuït i està inclòs en totes les comandes.'] ] },
      sizes: { t: 'Guia de talls', b: [
        ['Vestits de núvia', 'Talls 34 a 44 equivalents a contorn de pit de 80 a 100 cm. Tots els vestits s\'ajusten a la teua mesura real.'],
        ['Vestits de nuvi', 'Talls 46 a 54. Indica\'ns alçada i contorn de pit i et confirmem la talla exacta.'],
        ['Calçat', 'Talls 36 a 41. Si dubtes entre dues talls, tria la major: les nostres sabates són de pell i cedeixen mig número.'] ] },
      faq: { t: 'Preguntes freqüents', b: [
        ['Puc comprar un vestit sense cita?', 'Sí. Els accessoris, calçat i vestits de convidada es compren directament online. Per als vestits de núvia recomanem cita.'],
        ['Puc pagar en recollir?', 'Sí, en efectiu o amb targeta a la boutique, contra lliurament al missatger o de manera segura amb la passarel·la online.'],
        ['Feu restauracions?', 'Restaurem i adaptem peces vintage. Escriu-nos amb fotos i t\'enviem pressupost en 48 h.'] ] }
    }
  };

  /* ----------------------------- 4. ESTADO GLOBAL ------------------------- */
  const state = {
    lang: readStore(STORE.lang, 'es'),
    theme: readStore(STORE.theme, null),
    filter: 'all',
    sort: 'featured',
    cart: readStore(STORE.cart, []),
    promo: null,
    delivery: 'pickup',
    payment: 'gateway',
    step: 1,
    detailProduct: null,
    detailSize: null,
    detailQty: 1,
    hits: [],
    hitIndex: -1
  };
  if (!I18N[state.lang]) state.lang = 'es';

  const t = (key, vars) => {
    let str = I18N[state.lang][key];
    if (str === undefined) str = I18N.es[key];
    if (str === undefined) return key;
    if (vars) Object.keys(vars).forEach((k) => { str = str.replace(new RegExp('\\{' + k + '\\}', 'g'), vars[k]); });
    return str;
  };
  const findProduct = (id) => PRODUCTS.find((p) => p.id === id);
  /* Etiqueta del recargo contra entrega sin el importe entre paréntesis */
  const codLabel = () => t('checkout.payCod').replace(/\s*\(.+\)\s*$/, '');

  /* Placeholders de formularios por idioma (atributo data-ph) */
  const PLACEHOLDERS = {
    'search.ph':        { es: 'Vestido, velo, invitada, cita…', en: 'Gown, veil, guest, fitting…', va: 'Vestit, velo, convidada, cita…' },
    'cart.promoPh':     { es: 'Código promocional (NOVIA10)', en: 'Promo code (BRIDE10)', va: 'Codi promocional (NOVIA10)' },
    'form.namePh':      { es: 'Ana Ferrer', en: 'Ana Ferrer', va: 'Anna Ferrer' },
    'form.emailPh':     { es: 'ana@email.com', en: 'ana@email.com', va: 'ana@email.com' },
    'form.phonePh':     { es: '600 000 000', en: '600 000 000', va: '600 000 000' },
    'form.msgPh':       { es: 'Cuéntanos cómo imaginas tu día', en: 'Tell us how you picture your day', va: 'Conta\'ns com imagines el teu dia' },
    'checkout.addressPh': { es: 'Carrer Major 12, 3ºB', en: '12 High Street, Flat 3B', va: 'Carrer Major 12, 3ºB' },
    'checkout.zipPh':   { es: '46003', en: '46003', va: '46003' },
    'checkout.cityPh':  { es: 'València', en: 'València', va: 'València' },
    'checkout.notesPh': { es: 'Portal azul, 2ª planta', en: 'Blue door, 2nd floor', va: 'Portal blau, 2na planta' }
  };
  const applyPlaceholders = () => {
    $$('[data-ph]').forEach((el) => {
      const key = el.getAttribute('data-ph');
      const value = PLACEHOLDERS[key] && (PLACEHOLDERS[key][state.lang] || PLACEHOLDERS[key].es);
      if (value) el.setAttribute('placeholder', value);
    });
  };

  /* ------------------------------- 5. IDIOMA ------------------------------ */
  function applyLanguage() {
    document.documentElement.lang = state.lang === 'va' ? 'ca' : state.lang;
    $$('[data-i18n]').forEach((el) => { el.textContent = t(el.getAttribute('data-i18n')); });
    applyPlaceholders();
    $$('.lang-switch__btn').forEach((btn) => {
      btn.classList.toggle('is-active', btn.getAttribute('data-lang') === state.lang);
    });
    renderProducts();
    renderCart();
    if (state.detailProduct) openProduct(state.detailProduct.id, true);
    if (!$('#checkoutModal').hidden && state.step === 3) renderFinalStep();
    writeStore(STORE.lang, state.lang);
  }

  function setLanguage(lang) {
    if (!I18N[lang] || lang === state.lang) return;
    clearHighlights();
    state.lang = lang;
    applyLanguage();
    showToast(t('toast.lang'), 'lang');
  }

  $$('.lang-switch__btn').forEach((btn) => btn.addEventListener('click', () => setLanguage(btn.getAttribute('data-lang'))));

  /* -------------------------- 6. TEMA CLARO / OSCURO --------------------- */
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

  function applyTheme(theme) {
    const dark = theme === 'dark';
    document.body.setAttribute('data-theme', dark ? 'dark' : 'light');
    const meta = $('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', dark ? '#131110' : '#FBF8F4');
  }
  function toggleTheme() {
    const next = document.body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    writeStore(STORE.theme, next);
  }
  applyTheme(state.theme || (prefersDark ? 'dark' : 'light'));
  $('#btnTheme').addEventListener('click', toggleTheme);

  /* --------------------------- 7. MENÚ HAMBURGUESA ----------------------- */
  const mobileMenu = $('#mobileMenu');

  function openMenu() {
    mobileMenu.setAttribute('aria-hidden', 'false');
    $('#btnHamburger').setAttribute('aria-expanded', 'true');
    $('#btnHamburger').setAttribute('aria-label', 'Cerrar menú');
    document.body.classList.add('menu-open');
  }
  function closeMenu() {
    mobileMenu.setAttribute('aria-hidden', 'true');
    $('#btnHamburger').setAttribute('aria-expanded', 'false');
    $('#btnHamburger').setAttribute('aria-label', 'Abrir menú');
    document.body.classList.remove('menu-open');
  }
  const toggleMenu = () => (document.body.classList.contains('menu-open') ? closeMenu() : openMenu());

  $('#btnHamburger').addEventListener('click', toggleMenu);
  $$('.mobile-link, .mobile-menu__contact a').forEach((link) => link.addEventListener('click', closeMenu));
  $('#mobileSearchBtn').addEventListener('click', () => { closeMenu(); openModal('#searchModal'); });

  /* Cierra el menú al redimensionar la pantalla */
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => { if (window.innerWidth > 860) closeMenu(); }, 120);
  });

  /* ------------------ 8. SCROLL: suave, progreso, nav activa ------------- */
  const headerEl = $('#siteHeader');

  /* Distancia real hasta el borde inferior del header (incluye la barra superior) */
  function headerOffset() {
    const rect = headerEl.getBoundingClientRect();
    return Math.max(0, rect.bottom) + 12;
  }
  function scrollToTarget(target) {
    const el = typeof target === 'string' ? $(target) : target;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.pageYOffset - headerOffset();
    window.scrollTo({ top: top < 0 ? 0 : top, behavior: 'smooth' });
  }

  $$('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (event) => {
      const href = link.getAttribute('href');
      if (!href || href === '#' || link.hasAttribute('data-modal')) return;
      const target = $(href);
      if (!target) return;
      event.preventDefault();
      closeMenu();
      closeDrawer();
      scrollToTarget(target);
    });
  });

  const sections = $$('main section[id]');
  function updateActiveNav() {
    const pos = window.pageYOffset + headerEl.getBoundingClientRect().height + 40;
    let current = sections[0];
    sections.forEach((sec) => { if (sec.offsetTop <= pos) current = sec; });
    $$('.nav-link').forEach((a) => a.classList.toggle('is-active', a.getAttribute('href') === '#' + current.id));
  }

  function onScroll() {
    const y = window.pageYOffset;
    document.body.classList.toggle('is-scrolled', y > 60);
    $('#toTop').classList.toggle('is-visible', y > 600);
    const max = document.documentElement.scrollHeight - window.innerHeight;
    $('#scrollProgress').style.width = (max > 0 ? (y / max) * 100 : 0) + '%';
    updateActiveNav();
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  $('#toTop').addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  /* Animación de aparición de secciones */
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) { entry.target.classList.add('is-visible'); revealObserver.unobserve(entry.target); }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  $$('.reveal').forEach((el) => revealObserver.observe(el));

  /* --------------------- 9. TIENDA: filtros, orden, render --------------- */
  function visibleProducts() {
    let list = state.filter === 'all' ? PRODUCTS.slice() : PRODUCTS.filter((p) => p.cat === state.filter);
    if (state.sort === 'asc') list.sort((a, b) => a.price - b.price);
    if (state.sort === 'desc') list.sort((a, b) => b.price - a.price);
    if (state.sort === 'name') list.sort((a, b) => a.name[state.lang].localeCompare(b.name[state.lang]));
    return list;
  }

  function productCard(p, index) {
    const catLabel = t('cat.' + p.cat);
    const badge = p.badge ? '<span class="badge badge--' + p.badge + '">' + t('badge.' + p.badge) + '</span>' : '';
    const oldPrice = p.old ? '<s>' + money(p.old) + '</s>' : '';
    return '' +
      '<article class="product-card" data-id="' + p.id + '" style="animation-delay:' + Math.min(index * 40, 400) + 'ms">' +
        '<div class="card-media">' + badge +
          '<img src="' + p.img + '" alt="' + p.name[state.lang] + '" loading="lazy">' +
          '<span class="card-media__zoom">' + t('product.detail') + '</span>' +
        '</div>' +
        '<div class="card-body">' +
          '<span class="card-body__cat">' + catLabel + '</span>' +
          '<h3>' + p.name[state.lang] + '</h3>' +
          '<p class="card-body__desc">' + p.desc[state.lang] + '</p>' +
          '<div class="card-price"><strong>' + money(p.price) + '</strong>' + oldPrice +
            '<span class="stock">' + t('product.stockLeft', { n: p.stock }) + '</span></div>' +
          '<div class="card-actions">' +
            '<button class="btn btn--primary" type="button" data-add="' + p.id + '">' + t('product.add') + '</button>' +
            '<button class="btn btn--ghost" type="button" data-view="' + p.id + '">' + t('product.detail') + '</button>' +
          '</div>' +
        '</div>' +
      '</article>';
  }

  function renderProducts() {
    clearHighlights();
    const list = visibleProducts();
    $('#productGrid').innerHTML = list.map(productCard).join('');
    $('#shopEmpty').hidden = list.length > 0;
    $('#shopCount').textContent = t('shop.count', { n: list.length });
  }

  $('#filters').addEventListener('click', (event) => {
    const chip = event.target.closest('.chip');
    if (!chip) return;
    $$('.chip').forEach((c) => c.classList.remove('is-active'));
    chip.classList.add('is-active');
    state.filter = chip.getAttribute('data-filter');
    renderProducts();
  });

  $('#sortSelect').addEventListener('change', (event) => { state.sort = event.target.value; renderProducts(); });

  $('#productGrid').addEventListener('click', (event) => {
    const addBtn = event.target.closest('[data-add]');
    const viewBtn = event.target.closest('[data-view]');
    const card = event.target.closest('.product-card');
    if (addBtn) { addToCart(addBtn.getAttribute('data-add'), null, 1); return; }
    if (viewBtn || card) openProduct((viewBtn || card).getAttribute('data-id') || card.getAttribute('data-id'));
  });

  /* ------------------------ 10. FICHA DE PRODUCTO ------------------------ */
  function openProduct(id, silent) {
    const p = findProduct(id);
    if (!p) return;
    state.detailProduct = p;
    state.detailSize = p.sizes.length === 1 ? p.sizes[0] : null;
    state.detailQty = 1;
    const sizeButtons = p.sizes.map((s, i) =>
      '<button class="size-btn' + (state.detailSize === s ? ' is-active' : '') + '" type="button" data-size="' + s + '"' +
      (i === p.sizes.length - 1 && p.stock <= 2 ? ' disabled' : '') + '>' + s + '</button>').join('');

    $('#productDetail').innerHTML = '' +
      '<div class="product-detail__media"><img src="' + p.img + '" alt="' + p.name[state.lang] + '"></div>' +
      '<div class="product-detail__info">' +
        '<span class="cat">' + t('cat.' + p.cat) + '</span>' +
        '<h3 id="productTitle">' + p.name[state.lang] + '</h3>' +
        '<span class="price">' + money(p.price) + (p.old ? ' <s style="font-size:.9rem;color:var(--muted)">' + money(p.old) + '</s>' : '') + '</span>' +
        '<p>' + p.desc[state.lang] + '</p>' +
        '<p><strong>' + t('product.size') + ':</strong> <span class="js-size-label">' + (state.detailSize || t('product.sizeChoose')) + '</span></p>' +
        '<div class="sizes">' + sizeButtons + '</div>' +
        '<div class="qty">' +
          '<button type="button" data-qty="-1" aria-label="Menos">−</button>' +
          '<span class="js-qty">1</span>' +
          '<button type="button" data-qty="1" aria-label="Más">+</button>' +
        '</div>' +
        '<div class="detail-actions">' +
          '<button class="btn btn--primary" type="button" data-add-detail>' + t('product.add') + '</button>' +
        '</div>' +
        '<p class="shipping-note">' + t('product.adjust') + '<br>' + t('product.shipInfo') + '</p>' +
      '</div>';

    if (!silent) openModal('#productModal');
  }

  $('#productDetail').addEventListener('click', (event) => {
    const sizeBtn = event.target.closest('.size-btn');
    const qtyBtn = event.target.closest('[data-qty]');
    const addBtn = event.target.closest('[data-add-detail]');
    if (sizeBtn && !sizeBtn.disabled) {
      state.detailSize = sizeBtn.getAttribute('data-size');
      $$('#productDetail .size-btn').forEach((b) => b.classList.toggle('is-active', b === sizeBtn));
      $('#productDetail .js-size-label').textContent = state.detailSize;
    }
    if (qtyBtn) {
      const dir = Number(qtyBtn.getAttribute('data-qty'));
      state.detailQty = Math.min(10, Math.max(1, state.detailQty + dir));
      $('#productDetail .js-qty').textContent = state.detailQty;
    }
    if (addBtn) {
      if (!state.detailSize) { showToast(t('product.needSize'), 'warn'); return; }
      addToCart(state.detailProduct.id, state.detailSize, state.detailQty);
      closeModal('#productModal');
    }
  });

  /* ----------------------- 11. CARRITO DE COMPRA ------------------------- */
  function cartCount() { return state.cart.reduce((sum, item) => sum + item.qty, 0); }

  function totals() {
    const subtotal = state.cart.reduce((sum, item) => sum + findProduct(item.id).price * item.qty, 0);
    const promo = state.promo ? PROMOS[state.promo] : null;
    const discount = promo && promo.type === 'percent' ? subtotal * (promo.value / 100) : 0;
    const base = subtotal - discount;
    let shipping = 0;
    if (state.delivery === 'shipping') {
      shipping = base > 0 && base < FREE_SHIPPING_FROM ? SHIPPING_COST : 0;
      if (promo && promo.type === 'shipping') shipping = 0;
    }
    const codFee = state.payment === 'cod' ? COD_FEE : 0;
    return { subtotal, discount, shipping, codFee, total: base + shipping + codFee, items: cartCount() };
  }

  function saveCart() { writeStore(STORE.cart, state.cart); }

  function addToCart(id, size, qty) {
    const p = findProduct(id);
    if (!p) return;
    const chosenSize = size || (p.sizes.length === 1 ? p.sizes[0] : null);
    if (!chosenSize) { openProduct(id); showToast(t('product.needSize'), 'warn'); return; }
    const existing = state.cart.find((i) => i.id === id && i.size === chosenSize);
    if (existing) existing.qty = Math.min(10, existing.qty + qty);
    else state.cart.push({ id, size: chosenSize, qty });
    saveCart();
    renderCart();
    showToast(p.name[state.lang] + ' · ' + t('toast.added'), 'cart');
    openDrawer();
  }

  function changeQty(id, size, delta) {
    const item = state.cart.find((i) => i.id === id && i.size === size);
    if (!item) return;
    item.qty = Math.min(10, item.qty + delta);
    if (item.qty < 1) state.cart = state.cart.filter((i) => i !== item);
    saveCart(); renderCart();
  }

  function removeItem(id, size) {
    state.cart = state.cart.filter((i) => !(i.id === id && i.size === size));
    saveCart(); renderCart(); showToast(t('toast.removed'), 'cart');
  }

  function renderCart() {
    const list = $('#cartList');
    const badge = $('#cartBadge');
    const count = cartCount();
    badge.textContent = count;
    badge.hidden = count === 0;
    if (count > 0) { badge.style.animation = 'none'; void badge.offsetWidth; badge.style.animation = ''; }

    if (!state.cart.length) {
      list.innerHTML = '';
      $('#cartEmpty').hidden = false;
      $('#cartFoot').hidden = true;
      return;
    }
    $('#cartEmpty').hidden = true;
    $('#cartFoot').hidden = false;

    list.innerHTML = state.cart.map((item) => {
      const p = findProduct(item.id);
      const sizeOptions = p.sizes.map((s) =>
        '<option value="' + s + '"' + (s === item.size ? ' selected' : '') + '>' + s + '</option>').join('');
      return '<li class="cart-item">' +
        '<img src="' + p.img + '" alt="' + p.name[state.lang] + '">' +
        '<div class="cart-item__info">' +
          '<strong>' + p.name[state.lang] + '</strong>' +
          '<span class="meta">' + t('cat.' + p.cat) + ' · ' + t('product.size') +
            ' <select class="size-select" data-size-for="' + item.id + '">' + sizeOptions + '</select></span>' +
          '<span class="meta js-stock">' + t('product.stockLeft', { n: p.stock }) + '</span>' +
          '<div class="qty" style="margin-top:.45rem">' +
            '<button type="button" data-qty-item="-1" data-id="' + item.id + '" data-size="' + item.size + '" aria-label="Menos">−</button>' +
            '<span>' + item.qty + '</span>' +
            '<button type="button" data-qty-item="1" data-id="' + item.id + '" data-size="' + item.size + '" aria-label="Más">+</button>' +
          '</div>' +
        '</div>' +
        '<div class="cart-item__side">' +
          '<button class="cart-item__remove" type="button" data-remove="' + item.id + '" data-size="' + item.size + '" aria-label="Eliminar">' +
            '<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>' +
          '</button>' +
          '<span class="line-price">' + money(p.price * item.qty) + '</span>' +
        '</div>' +
      '</li>';
    }).join('');

    const tt = totals();
    const rows = [
      '<div class="row"><dt>' + t('cart.subtotal') + '</dt><dd>' + money(tt.subtotal) + '</dd></div>'
    ];
    if (tt.discount > 0) {
      rows.push('<div class="row row--discount"><dt>' + t('cart.discount', { code: state.promo }) + '</dt><dd>−' + money(tt.discount) + '</dd></div>');
    }
    rows.push('<div class="row"><dt>' + (state.delivery === 'shipping' ? t('cart.shipping') : t('cart.pickup')) + '</dt><dd>' +
      (tt.shipping === 0 ? t('cart.free') : money(tt.shipping)) + '</dd></div>');
    if (tt.codFee > 0) {
      rows.push('<div class="row"><dt>' + codLabel() + '</dt><dd>' + money(tt.codFee) + '</dd></div>');
    }
    rows.push('<div class="row row--total"><dt>' + t('cart.total') + '</dt><dd>' + money(tt.total) + '</dd></div>');
    $('#cartTotals').innerHTML = rows.join('');
    if (!$('#checkoutModal').hidden) renderPaySummary();
  }

  /* Eventos del carrito (delegación) */
  $('#cartList').addEventListener('click', (event) => {
    const qtyBtn = event.target.closest('[data-qty-item]');
    const removeBtn = event.target.closest('[data-remove]');
    if (qtyBtn) changeQty(qtyBtn.getAttribute('data-id'), qtyBtn.getAttribute('data-size'), Number(qtyBtn.getAttribute('data-qty-item')));
    if (removeBtn) removeItem(removeBtn.getAttribute('data-remove'), removeBtn.getAttribute('data-size'));
  });

  $('#cartList').addEventListener('change', (event) => {
    const select = event.target.closest('.size-select');
    if (!select) return;
    const id = select.getAttribute('data-size-for');
    const newSize = select.value;
    const item = state.cart.find((i) => i.id === id);
    const clash = state.cart.find((i) => i.id === id && i.size === newSize);
    if (clash) { clash.qty = Math.min(10, clash.qty + item.qty); state.cart = state.cart.filter((i) => i !== item); }
    else item.size = newSize;
    saveCart(); renderCart();
  });

  $('#promoBtn').addEventListener('click', () => {
    const input = $('#promoInput');
    const code = input.value.trim().toUpperCase();
    if (PROMOS[code]) {
      state.promo = code;
      showToast(code + ' · ' + t('cart.promoOk'), 'cart');
    } else {
      state.promo = null;
      showToast(t('cart.promoKo'), 'warn');
    }
    renderCart();
  });

  $('#btnClearCart').addEventListener('click', () => {
    state.cart = []; state.promo = null; saveCart(); renderCart(); showToast(t('toast.cleared'), 'cart');
  });

  $('#cartEmptyLink').addEventListener('click', closeDrawer);

  /* Drawer del carrito */
  const drawer = $('#cartDrawer');
  function openDrawer() {
    drawer.setAttribute('aria-hidden', 'false');
    drawer.classList.add('is-open');
    document.body.classList.add('is-locked');
  }
  function closeDrawer() {
    drawer.setAttribute('aria-hidden', 'true');
    drawer.classList.remove('is-open');
    if ($('.modal:not([hidden])') === null) document.body.classList.remove('is-locked');
  }
  $('#btnCart').addEventListener('click', openDrawer);
  $('#btnCloseCart').addEventListener('click', closeDrawer);
  $('#cartBackdrop').addEventListener('click', closeDrawer);

  /* --------------------- 12. CHECKOUT EN TRES PASOS ---------------------- */
  const checkoutModal = $('#checkoutModal');

  function openCheckout() {
    if (!state.cart.length) { closeDrawer(); return; }
    closeDrawer();
    state.step = 1;
    showStep(1);
    openModal('#checkoutModal');
    syncDeliveryBlocks();
    renderPaySummary();
  }
  $('#btnCheckout').addEventListener('click', openCheckout);

  function showStep(step) {
    state.step = step;
    $$('.checkout-pane').forEach((pane) => { pane.hidden = Number(pane.getAttribute('data-pane')) !== step; });
    $$('#checkoutSteps li').forEach((li) => {
      const n = Number(li.getAttribute('data-step'));
      li.classList.toggle('is-active', n === step);
      li.classList.toggle('is-done', n < step);
    });
    if (step === 2) renderPaySummary();
    if (step === 3) renderFinalStep();
    checkoutModal.querySelector('.modal__panel').scrollTop = 0;
  }

  /* Opciones de entrega disponibles */
  function syncDeliveryBlocks() {
    state.delivery = ($('input[name="delivery"]:checked') || {}).value || 'pickup';
    $('#pickupBlock').hidden = state.delivery !== 'pickup';
    $('#shippingBlock').hidden = state.delivery !== 'shipping';
    /* El pago al recoger solo tiene sentido con recogida; el contra entrega, con envío */
    $('#payPickupWrap').classList.toggle('is-disabled', state.delivery !== 'pickup');
    $('#payCodWrap').classList.toggle('is-disabled', state.delivery !== 'shipping');
    const allowed = { pickup: ['pickup', 'gateway'], shipping: ['cod', 'gateway'] }[state.delivery];
    const current = ($('input[name="payment"]:checked') || {}).value;
    if (allowed.indexOf(current) === -1) {
      const next = $('input[name="payment"][value="' + allowed[allowed.length - 1] + '"]');
      if (next) next.checked = true;
      state.payment = allowed[allowed.length - 1];
    }
    if (state.delivery === 'pickup' && current === 'pickup') state.payment = 'pickup';
    renderCart();
  }

  $$('input[name="delivery"]').forEach((radio) => radio.addEventListener('change', syncDeliveryBlocks));
  $$('input[name="payment"]').forEach((radio) => radio.addEventListener('change', () => {
    state.payment = ($('input[name="payment"]:checked') || {}).value;
    renderCart();
    renderPaySummary();
  }));

  /* Validación de campos con mensajes según data-err */
  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;
  const PHONE_RE = /^[+]?[\d\s().-]{9,}$/;
  const ZIP_RE = /^\d{5}$/;

  function markField(input, valid) {
    const field = input.closest('.field');
    if (field) field.classList.toggle('is-invalid', !valid);
    return valid;
  }
  function checkInput(input) {
    const value = input.value.trim();
    switch (input.id) {
      case 'cName': case 'pName': case 'sName': case 'lName': return markField(input, value.length >= 3);
      case 'cEmail': case 'pEmail': case 'sEmail': case 'lEmail': return markField(input, EMAIL_RE.test(value));
      case 'cPhone': case 'pPhone': case 'sPhone': return markField(input, value === '' || PHONE_RE.test(value));
      case 'pPhoneStrict': return markField(input, PHONE_RE.test(value));
      case 'cMsg': return markField(input, value.length >= 10);
      case 'sAddress': return markField(input, value.length >= 5);
      case 'sZip': return markField(input, ZIP_RE.test(value));
      case 'sCity': return markField(input, value.length >= 2);
      case 'lPass': return markField(input, value.length >= 6);
      default: return true;
    }
  }

  function validateDeliveryForm() {
    let ok = true;
    let firstBad = null;
    const ids = state.delivery === 'pickup'
      ? ['pName', 'pPhone', 'pEmail', 'pDate']
      : ['sName', 'sPhone', 'sEmail', 'sAddress', 'sZip', 'sCity'];
    ids.forEach((id) => {
      const input = $('#' + id);
      if (!input) return;
      let valid = checkInput(input);
      if (id === 'pPhone') valid = markField(input, PHONE_RE.test(input.value.trim()));
      if (id === 'pDate') {
        const chosen = new Date(input.value + 'T12:00:00');
        const tomorrow = new Date(); tomorrow.setHours(0, 0, 0, 0); tomorrow.setDate(tomorrow.getDate() + 1);
        valid = markField(input, !!input.value && chosen >= tomorrow);
      }
      if (!valid) { ok = false; if (!firstBad) firstBad = input; }
    });
    if (!ok) {
      showToast(t('toast.step'), 'warn');
      if (firstBad) firstBad.focus();
    }
    return ok;
  }

  $('#toStep2').addEventListener('click', () => { if (validateDeliveryForm()) showStep(2); });
  $('#backTo1').addEventListener('click', () => showStep(1));
  $('#toStep3').addEventListener('click', () => {
    if (!$('input[name="payment"]:checked')) { showToast(t('toast.step'), 'warn'); return; }
    state.payment = $('input[name="payment"]:checked').value;
    showStep(3);
  });

  function summaryRows() {
    const tt = totals();
    const rows = [
      ['<div class="row"><dt>' + t('checkout.items') + '</dt><dd>' + tt.items + '</dd></div>'],
      ['<div class="row"><dt>' + t('cart.subtotal') + '</dt><dd>' + money(tt.subtotal) + '</dd></div>']
    ];
    if (tt.discount > 0) rows.push('<div class="row row--discount"><dt>' + t('cart.discount', { code: state.promo }) + '</dt><dd>−' + money(tt.discount) + '</dd></div>');
    rows.push('<div class="row"><dt>' + (state.delivery === 'shipping' ? t('cart.shipping') : t('cart.pickup')) + '</dt><dd>' +
      (tt.shipping === 0 ? t('cart.free') : money(tt.shipping)) + '</dd></div>');
    if (tt.codFee > 0) rows.push('<div class="row"><dt>' + codLabel() + '</dt><dd>' + money(tt.codFee) + '</dd></div>');
    rows.push('<div class="row row--total"><dt>' + t('cart.total') + '</dt><dd>' + money(tt.total) + '</dd></div>');
    return rows.join('');
  }

  function renderPaySummary() {
    const box = $('#paySummary');
    if (!box) return;
    box.innerHTML = '<h4>' + t('checkout.summary') + '</h4><dl>' + summaryRows() + '</dl>';
  }

  function renderFinalStep() {
    const tt = totals();
    const isGateway = state.payment === 'gateway';
    const pickup = state.delivery === 'pickup';
    const deliveryLine = pickup
      ? t('checkout.modePickup') + ' · ' + dateLong($('#pDate').value) + ' · ' + $('#pSlot').value
      : t('checkout.modeShipping') + ' · ' + $('#sAddress').value + ', ' + $('#sZip').value + ' ' + $('#sCity').value;

    const payBlock = isGateway
      ? '<div class="gateway-box">' +
          '<p>' + t('checkout.gatewayNote') + '</p>' +
          '<span class="amount">' + money(tt.total) + '</span>' +
          '<button class="btn btn--primary" type="button" id="btnPayNow">' + t('checkout.payNow') + ' · ' + money(tt.total) + '</button>' +
          '<p style="font-size:.72rem;margin:.8rem 0 0;color:var(--muted)">' + t('checkout.gatewayPending') + '</p>' +
        '</div>'
      : '<p>' + (pickup ? t('checkout.payPickupLabel') : t('checkout.payCodLabel')) + ': <strong>' + money(tt.total) + '</strong></p>' +
        '<button class="btn btn--primary btn--full" type="button" id="btnConfirmOrder">' + t('checkout.confirm') + '</button>';

    $('#checkoutFinal').innerHTML = '' +
      '<div class="summary-card"><h4>' + t('checkout.summary') + '</h4><dl>' + summaryRows() + '</dl>' +
        '<p style="margin:.9rem 0 0;font-size:.86rem;color:var(--ink-soft)">' + deliveryLine + '</p></div>' +
      '<div style="margin-top:1.2rem">' + payBlock + '</div>';
  }

  /* Confirmación del pedido (limpia carrito y muestra resumen) */
  function confirmOrder() {
    const tt = totals();
    const ref = 'ALMA-' + String(Math.floor(Math.random() * 90000) + 10000);
    state.cart = []; state.promo = null; saveCart(); renderCart();
    $('#checkoutFinal').innerHTML = '' +
      '<div class="order-ok">' +
        '<span class="check-mark"><svg class="ico" style="width:30px;height:30px" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12.5 9.5 18 20 6.5" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg></span>' +
        '<h3>' + t('checkout.okTitle') + '</h3>' +
        '<p class="order-ref">' + t('checkout.ref') + ': ' + ref + '</p>' +
        '<p>' + t('checkout.okText') + '</p>' +
        '<p style="font-size:.9rem">' + (state.delivery === 'pickup' ? t('checkout.modePickup') : t('checkout.modeShipping')) +
          ' · <strong>' + money(tt.total) + '</strong></p>' +
        '<button class="btn btn--ghost" type="button" data-close-modal>' + t('checkout.keepShopping') + '</button>' +
      '</div>';
    showToast(t('toast.order') + ' ' + ref, 'cart');
  }

  $('#checkoutFinal').addEventListener('click', (event) => {
    if (event.target.closest('#btnPayNow') || event.target.closest('#btnConfirmOrder')) confirmOrder();
  });

  /* ------------------ 13. MODAL DE BÚSQUEDA CON RESALTADO --------------- */
  const searchInput = $('#searchInput');
  const searchResults = $('#searchResults');
  const hitBar = $('#hitBar');
  let highlightMarks = [];

  function buildIndex() {
    const index = [];
    $$('main section[id]').forEach((section) => {
      const heading = section.querySelector('h2, h3');
      index.push({
        type: 'section', title: heading ? heading.textContent.trim() : section.id,
        text: section.textContent.replace(/\s+/g, ' ').trim().slice(0, 400),
        target: '#' + section.id
      });
    });
    PRODUCTS.forEach((p) => {
      index.push({
        type: 'product', title: p.name[state.lang], img: p.img,
        text: t('cat.' + p.cat) + ' · ' + p.desc[state.lang] + ' · ' + money(p.price),
        target: '#coleccion', pid: p.id
      });
    });
    return index;
  }

  function runSearch() {
    const query = searchInput.value.trim().toLowerCase();
    if (query.length < 2) { searchResults.innerHTML = ''; return; }
    const index = buildIndex();
    const found = index.filter((item) =>
      item.title.toLowerCase().indexOf(query) !== -1 || item.text.toLowerCase().indexOf(query) !== -1).slice(0, 12);

    if (!found.length) {
      searchResults.innerHTML = '<p class="search-hint" style="padding:0">' + t('search.noResults', { q: searchInput.value.trim() }) + '</p>';
      return;
    }
    searchResults.innerHTML = found.map((item) => {
      const thumb = item.img ? '<img src="' + item.img + '" alt="">' :
        '<svg class="ico" style="width:20px;height:20px;color:var(--gold)" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 6h16M4 12h16M4 18h10" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';
      return '<button class="search-result" type="button" data-goto="' + item.target + '"' +
        (item.pid ? ' data-pid="' + item.pid + '"' : '') + '>' + thumb +
        '<span><strong>' + item.title + '</strong><small>' + item.text.slice(0, 110) + '…</small></span></button>';
    }).join('');
  }
  searchInput.addEventListener('input', runSearch);

  searchResults.addEventListener('click', (event) => {
    const btn = event.target.closest('.search-result');
    if (!btn) return;
    const target = $(btn.getAttribute('data-goto'));
    closeModal('#searchModal');
    if (btn.getAttribute('data-pid')) {
      state.filter = 'all';
      $$('.chip').forEach((c) => c.classList.toggle('is-active', c.getAttribute('data-filter') === 'all'));
      renderProducts();
    }
    setTimeout(() => {
      scrollToTarget(target);
      if (btn.getAttribute('data-pid')) flashCard(btn.getAttribute('data-pid'));
    }, 260);
  });

  function flashCard(pid) {
    const card = $('.product-card[data-id="' + pid + '"]');
    if (!card) return;
    card.style.outline = '2px solid var(--gold)';
    card.style.outlineOffset = '4px';
    setTimeout(() => { card.style.outline = ''; card.style.outlineOffset = ''; }, 1600);
  }

  /* Resaltado de coincidencias en el DOM con TreeWalker */
  const SKIP_TAGS = { SCRIPT: 1, STYLE: 1, NOSCRIPT: 1, TEXTAREA: 1, INPUT: 1, SELECT: 1, MARK: 1, BUTTON: 1, OPTION: 1 };

  function clearHighlights() {
    if (!highlightMarks.length) return;
    highlightMarks.forEach((mark) => {
      if (!mark.parentNode) return;
      const parent = mark.parentNode;
      while (mark.firstChild) parent.insertBefore(mark.firstChild, mark);
      parent.removeChild(mark);
      parent.normalize();
    });
    highlightMarks = [];
    state.hits = []; state.hitIndex = -1;
    hitBar.hidden = true;
  }

  function highlightMatches() {
    clearHighlights();
    const query = searchInput.value.trim();
    if (query.length < 2) return;
    const needle = query.toLowerCase();
    const root = $('#pageContent');
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode: (node) => {
        if (!node.nodeValue || !node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
        if (node.nodeValue.toLowerCase().indexOf(needle) === -1) return NodeFilter.FILTER_REJECT;
        let parent = node.parentNode;
        while (parent && parent !== root) {
          if (SKIP_TAGS[parent.tagName]) return NodeFilter.FILTER_REJECT;
          parent = parent.parentNode;
        }
        return NodeFilter.FILTER_ACCEPT;
      }
    });

    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.slice(0, 60).forEach((node) => {
      const text = node.nodeValue;
      const lower = text.toLowerCase();
      const frag = document.createDocumentFragment();
      let pos = 0, idx;
      while ((idx = lower.indexOf(needle, pos)) !== -1) {
        if (idx > pos) frag.appendChild(document.createTextNode(text.slice(pos, idx)));
        const mark = document.createElement('mark');
        mark.className = 'hl';
        mark.textContent = text.substr(idx, needle.length);
        frag.appendChild(mark);
        highlightMarks.push(mark);
        pos = idx + needle.length;
      }
      if (pos < text.length) frag.appendChild(document.createTextNode(text.slice(pos)));
      node.parentNode.replaceChild(frag, node);
    });

    state.hits = highlightMarks;
    hitBar.hidden = state.hits.length === 0;
    if (state.hits.length) {
      /* Cerramos el modal (conservando los resaltados) y navegamos al primero */
      closeModal('#searchModal', true);
      goToHit(0);
    } else {
      showToast(t('search.noResults', { q: searchInput.value.trim() }), 'warn');
    }
  }

  function goToHit(index) {
    if (!state.hits.length) return;
    state.hitIndex = (index + state.hits.length) % state.hits.length;
    highlightMarks.forEach((m) => m.classList.remove('is-current'));
    const mark = state.hits[state.hitIndex];
    mark.classList.add('is-current', 'hl--flash');
    setTimeout(() => mark.classList.remove('hl--flash'), 1300);
    const top = mark.getBoundingClientRect().top + window.pageYOffset - headerOffset() - 20;
    window.scrollTo({ top, behavior: 'smooth' });
    $('#hitBarCounter').textContent = (state.hitIndex + 1) + ' / ' + state.hits.length;
  }

  $('#btnHighlight').addEventListener('click', () => { highlightMatches(); });
  $('#hitBarClear').addEventListener('click', () => {
    clearHighlights();
    searchInput.value = '';
    searchResults.innerHTML = '';
  });
  $('#hitBarPrev').addEventListener('click', () => goToHit(state.hitIndex - 1));
  $('#hitBarNext').addEventListener('click', () => goToHit(state.hitIndex + 1));
  searchInput.addEventListener('keydown', (event) => { if (event.key === 'Enter') { event.preventDefault(); highlightMatches(); } });
  $('#btnSearch').addEventListener('click', () => {
    openModal('#searchModal');
    setTimeout(() => searchInput.focus(), 220);
  });

  /* ------------------------ 14. LOGIN (para integrar) -------------------- */
  $$('.tab').forEach((tab) => tab.addEventListener('click', () => {
    $$('.tab').forEach((x) => x.classList.toggle('is-active', x === tab));
    $('#loginForm').classList.toggle('is-signup', tab.getAttribute('data-tab') === 'signup');
    $('#loginForm').querySelector('[type="submit"]').textContent = tab.getAttribute('data-tab') === 'signup' ? t('login.tabUp') : t('login.submit');
  }));

  $('#btnLogin').addEventListener('click', () => openModal('#loginModal'));

  $('#loginForm').addEventListener('submit', (event) => {
    event.preventDefault();
    const isSignup = $('#loginForm').classList.contains('is-signup');
    const nameOk = isSignup ? checkInput($('#lName')) : true;
    const emailOk = checkInput($('#lEmail'));
    const passOk = checkInput($('#lPass'));
    if (!nameOk || !emailOk || !passOk) return;
    /* >>> Aquí se conectará el sistema de login del cliente (fetch al backend) <<< */
    closeModal('#loginModal');
    showToast(t('toast.login'), 'user');
  });

  /* ------------------- 15. CONTACTO Y NEWSLETTER ------------------------- */
  const contactForm = $('#contactForm');
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const fields = ['cName', 'cEmail', 'cPhone', 'cMsg'].map((id) => $('#' + id));
    let ok = true;
    fields.forEach((input) => { if (!checkInput(input)) ok = false; });
    const privacy = $('#cPrivacy');
    const privacyOk = privacy.checked;
    privacy.closest('.check').classList.toggle('is-invalid', !privacyOk);
    if (!ok || !privacyOk) { showToast(t('toast.step'), 'warn'); return; }
    /* Envío simulado (integrar aquí el envío real) */
    $('#formOk').hidden = false;
    contactForm.reset();
    setTimeout(() => { $('#formOk').hidden = true; }, 6000);
  });
  ['cName', 'cEmail', 'cPhone', 'cMsg', 'lEmail', 'lPass'].forEach((id) => {
    const input = $('#' + id);
    if (input) input.addEventListener('input', () => { if (input.closest('.field').classList.contains('is-invalid')) checkInput(input); });
  });

  $('#newsForm').addEventListener('submit', (event) => {
    event.preventDefault();
    const input = $('#newsEmail');
    if (!EMAIL_RE.test(input.value.trim())) { input.focus(); return; }
    $('#newsOk').hidden = false;
    input.value = '';
    showToast(t('toast.news'), 'user');
    setTimeout(() => { $('#newsOk').hidden = true; }, 5000);
  });

  /* ---------------- 16. MODALES GENÉRICOS, COOKIES, TOASTS -------------- */
  function openModal(selector) {
    const modal = $(selector);
    if (!modal) return;
    modal.hidden = false;
    document.body.classList.add('is-locked');
    const focusable = modal.querySelector('input, button:not([data-close-modal]), a');
    if (focusable) setTimeout(() => focusable.focus({ preventScroll: true }), 240);
  }
  function closeModal(selector, keepHits) {
    const modal = typeof selector === 'string' ? $(selector) : selector;
    if (!modal || modal.hidden) return;
    modal.classList.add('is-closing');
    setTimeout(() => {
      modal.hidden = true;
      modal.classList.remove('is-closing');
      if (!$('.modal:not([hidden])') && !drawer.classList.contains('is-open')) document.body.classList.remove('is-locked');
    }, 230);
    if (modal.id === 'searchModal' && !keepHits) clearHighlights();
    if (modal.id === 'productModal') state.detailProduct = null;
    if (modal.id === 'checkoutModal') showStep(1);
  }

  document.addEventListener('click', (event) => {
    const closeBtn = event.target.closest('[data-close-modal]');
    if (closeBtn) { closeModal(closeBtn.closest('.modal')); return; }
    const infoLink = event.target.closest('[data-modal]');
    if (infoLink) {
      event.preventDefault();
      const key = infoLink.getAttribute('data-modal');
      const doc = (INFO_DOCS[state.lang] || INFO_DOCS.es)[key];
      if (!doc) return;
      $('#infoTitle').textContent = doc.t;
      $('#infoBody').innerHTML = doc.b.map((block) =>
        '<h4>' + block[0] + '</h4><p>' + block[1] + '</p>').join('');
      openModal('#infoModal');
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      const openModalEl = $('.modal:not([hidden])');
      if (openModalEl) closeModal(openModalEl);
      else if (drawer.classList.contains('is-open')) closeDrawer();
      else if (document.body.classList.contains('menu-open')) closeMenu();
    }
    if (event.key === '/' && $('.modal:not([hidden])') === null &&
        document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
      event.preventDefault(); openModal('#searchModal'); setTimeout(() => searchInput.focus(), 220);
    }
  });

  /* Aviso de cookies */
  const cookieBar = $('#cookieBar');
  if (!readStore(STORE.cookies, null)) setTimeout(() => { cookieBar.hidden = false; }, 1200);
  $('#cookieAccept').addEventListener('click', () => { writeStore(STORE.cookies, true); cookieBar.hidden = true; });
  $('#cookieSettings').addEventListener('click', () => { $('[data-modal="cookies"]').click(); });

  /* Toasts */
  const ICONS = {
    cart: 'M6 7h12l-1.2 12.2a1.5 1.5 0 0 1-1.5 1.3H8.7a1.5 1.5 0 0 1-1.5-1.3L6 7z',
    user: 'M12 8a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4 21c0-4.4 3.6-7 8-7s8 2.6 8 7',
    warn: 'M12 3 2 20h20L12 3zM12 9v6M12 17.5v.5',
    lang: 'M4 5h16v14H4zM4 10h16M12 5v14'
  };
  function showToast(message, icon) {
    const area = $('#toastArea');
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = '<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="' + (ICONS[icon] || ICONS.cart) +
      '" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" stroke-linecap="round"/></svg><span>' + message + '</span>';
    area.appendChild(toast);
    setTimeout(() => { toast.classList.add('is-out'); setTimeout(() => toast.remove(), 320); }, 2600);
  }

  /* Vídeo del hero con imagen de respaldo */
  (function heroVideo() {
    const video = $('#heroVideo');
    const fallback = $('#heroFallback');
    const useFallback = () => { video.style.display = 'none'; fallback.style.display = 'block'; };
    if (!video.canPlayType || !video.canPlayType('video/mp4')) { useFallback(); return; }
    video.addEventListener('error', useFallback);
    $$('source', video).forEach((source) => source.addEventListener('error', useFallback));
    video.addEventListener('loadeddata', () => { fallback.style.display = 'none'; });
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { video.removeAttribute('autoplay'); video.pause(); }
  })();

  /* -------------------------------- ARRANQUE ------------------------------ */
  $('#year').textContent = new Date().getFullYear();
  applyLanguage();
  renderCart();
  onScroll();
})();
