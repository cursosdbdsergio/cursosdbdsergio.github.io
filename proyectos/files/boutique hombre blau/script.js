/* ==========================================================================
   BLAU Menswear · script.js
   Funcionalidades: tema, menú móvil, búsqueda con resaltado, idiomas,
   tienda + carrito + checkout, formularios, cookies, scroll y resize.
   ========================================================================== */
(function () {
  'use strict';

  /* ------------------------------------------------------------------------
     0. Utilidades
     ------------------------------------------------------------------------ */
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
  const STORAGE = { theme: 'blau_theme', lang: 'blau_lang', cart: 'blau_cart', cookies: 'blau_cookies' };

  const formatPrice = (n) => n.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' });

  /** Muestra una notificación breve */
  let toastTimer;
  function showToast(message) {
    const toast = $('#toast');
    toast.textContent = message;
    toast.classList.add('is-visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('is-visible'), 2600);
  }

  /** Escapa HTML para inyectar texto de usuario de forma segura */
  const escapeHtml = (str) => String(str).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  /* ------------------------------------------------------------------------
     1. Sistema de idiomas (estructura preparada; textos estáticos)
     ------------------------------------------------------------------------ */
  const I18N = {
    es: {
      'topbar.address': 'C/ Colón 24, Valencia', 'topbar.hours': 'Lun–Sáb 10:00–20:30', 'logo.tag': 'menswear',
      'nav.home': 'Inicio', 'nav.collection': 'Colección', 'nav.about': 'Nosotros', 'nav.services': 'Servicios', 'nav.lookbook': 'Lookbook', 'nav.contact': 'Contacto',
      'aria.search': 'Buscar', 'aria.login': 'Acceder', 'aria.theme': 'Cambiar tema', 'aria.cart': 'Carrito', 'menu.search': 'Buscar en la página',
      'hero.eyebrow': 'Nueva temporada · Otoño / Invierno', 'hero.title': 'Elegancia masculina hecha a tu medida',
      'hero.subtitle': 'Sastrería contemporánea, prêt-à-porter seleccionado y asesoría personal en el corazón de Valencia.',
      'hero.cta1': 'Ver colección', 'hero.cta2': 'Cita de sastrería',
      'perks.1t': 'Envío gratis desde 120 €', 'perks.1d': 'Entrega en 24–72 h en Península', 'perks.2t': 'Recogida en tienda', 'perks.2d': 'Reserva online y recoge en 2 h',
      'perks.3t': 'Devoluciones 30 días', 'perks.3d': 'Sin preguntas, cambio o reembolso', 'perks.4t': 'Arreglos incluidos', 'perks.4d': 'Ajuste gratuito en sastrería y trajes',
      'shop.eyebrow': 'Tienda online', 'shop.title': 'La colección',
      'shop.lead': 'Piezas esenciales de fondo de armario con tejidos nobles y patrones actuales. Elige talla, añade al carrito y decide si lo recoges en tienda o te lo enviamos.',
      'shop.f.all': 'Todo', 'shop.f.tailoring': 'Sastrería', 'shop.f.shirts': 'Camisas', 'shop.f.knit': 'Punto', 'shop.f.outerwear': 'Abrigos', 'shop.f.shoes': 'Calzado',
      'shop.add': 'Añadir', 'shop.size': 'Talla', 'shop.new': 'Nuevo', 'shop.sale': 'Oferta', 'shop.selectSize': 'Selecciona una talla', 'shop.added': 'añadido al carrito',
      'cat.sastreria': 'Sastrería', 'cat.camisas': 'Camisas', 'cat.punto': 'Punto', 'cat.abrigos': 'Abrigos', 'cat.calzado': 'Calzado',
      'about.badge': 'desde', 'about.eyebrow': 'Nuestra historia', 'about.title': 'Una boutique pensada para el hombre que viste con intención',
      'about.p1': 'BLAU nació en 2009 en el barrio del Ensanche de Valencia con una idea sencilla: reunir en un solo espacio sastrería de autor, marcas europeas independientes y un servicio de asesoría honesto, sin prisas.',
      'about.p2': 'Trabajamos con talleres de Italia, Portugal y España, seleccionamos tejidos de temporada en pequeñas series y cuidamos cada detalle, desde el ojal hasta el envoltorio.',
      'about.s1': 'años de oficio', 'about.s2': 'marcas seleccionadas', 'about.s3': 'clientes satisfechos', 'about.cta': 'Visítanos',
      'services.eyebrow': 'Servicios', 'services.title': 'Más que una tienda', 'services.lead': 'Acompañamos cada compra con servicios pensados para que la prenda te siente como si estuviera hecha para ti.',
      'services.1t': 'Sastrería a medida', 'services.1d': 'Trajes, americanas y camisas confeccionados a partir de tus medidas. Más de 300 tejidos y entrega en 4 semanas.', 'services.1c': 'Pedir cita',
      'services.2t': 'Personal shopper', 'services.2d': 'Una hora privada con nuestro asesor para construir un fondo de armario coherente, con tu estilo y tu presupuesto.', 'services.2c': 'Reservar sesión',
      'services.3t': 'Arreglos y cuidado', 'services.3d': 'Taller propio de arreglos, limpieza de calzado y reparación de prendas para alargar la vida de lo que ya tienes.', 'services.3c': 'Consultar',
      'look.eyebrow': 'Lookbook', 'look.title': 'Inspiración de temporada', 'look.1': 'Capas y texturas', 'look.2': 'Smart casual', 'look.3': 'Sastrería urbana', 'look.4': 'El detalle del calzado', 'look.5': 'Tonos tierra', 'look.6': 'Blanco invierno',
      'contact.eyebrow': 'Contacto', 'contact.title': 'Hablemos', 'contact.lead': 'Escríbenos para pedir cita de sastrería, consultar disponibilidad o cualquier duda sobre tu pedido.',
      'contact.addr': 'Dirección', 'contact.phone': 'Teléfono', 'contact.hours': 'Horario', 'contact.hoursv': 'Lunes a sábado · 10:00–20:30',
      'form.name': 'Nombre', 'form.lastname': 'Apellidos', 'form.subject': 'Asunto', 'form.s1': 'Cita de sastrería', 'form.s2': 'Consulta sobre un pedido', 'form.s3': 'Otro', 'form.message': 'Mensaje',
      'form.privacy': 'He leído y acepto la política de privacidad.', 'form.send': 'Enviar mensaje', 'form.ok': 'Gracias. Te responderemos en menos de 24 h.', 'form.error': 'Revisa los campos marcados.',
      'footer.desc': 'Boutique de moda masculina en Valencia. Sastrería, prêt-à-porter y accesorios seleccionados.', 'footer.shop': 'Tienda', 'footer.l1': 'Colección', 'footer.l2': 'Sastrería a medida', 'footer.l3': 'Lookbook', 'footer.l4': 'Tarjeta regalo',
      'footer.help': 'Ayuda', 'footer.h1': 'Guía de tallas', 'footer.h2': 'Envíos y recogida', 'footer.h3': 'Cambios y devoluciones', 'footer.h4': 'Métodos de pago',
      'footer.legal': 'Legal', 'footer.c1': 'Política de cookies', 'footer.c2': 'Política de privacidad', 'footer.c3': 'Requisitos y condiciones de compra', 'footer.c4': 'Aviso legal',
      'footer.rights': 'Todos los derechos reservados.', 'footer.credits': 'Imágenes de muestra: Pexels (uso libre). Serán sustituidas por fotografías del cliente.',
      'search.title': 'Buscar en la página', 'search.ph': 'Camisa, sastrería, envío…', 'search.none': 'Sin resultados para', 'search.count': 'coincidencias', 'search.min': 'Escribe al menos 2 caracteres',
      'login.title': 'Acceso clientes', 'login.text': 'Accede a tu cuenta para ver pedidos, direcciones y citas de sastrería.', 'login.pass': 'Contraseña', 'login.btn': 'Entrar', 'login.pending': 'Sistema de login pendiente de integración.',
      'cart.title': 'Tu carrito', 'cart.subtotal': 'Subtotal', 'cart.checkout': 'Tramitar pedido', 'cart.clear': 'Vaciar carrito', 'cart.empty': 'Tu carrito está vacío', 'cart.emptyHint': 'Añade prendas desde la colección.',
      'cart.remove': 'Eliminar', 'cart.freeShip': 'Envío gratis conseguido. Recogida en tienda siempre gratuita.', 'cart.toFree': 'para envío gratis · Recogida en tienda gratuita', 'cart.items': 'artículos', 'cart.item': 'artículo', 'cart.cleared': 'Carrito vaciado',
      'co.step1': 'Datos', 'co.step2': 'Entrega', 'co.step3': 'Pago', 'co.step4': 'Confirmación', 'co.t1': 'Tus datos', 'co.t2': '¿Cómo quieres recibirlo?', 'co.t3': 'Método de pago',
      'co.pickup': 'Recoger en tienda', 'co.pickupd': 'C/ Colón 24, Valencia · Listo en 2 h · Gratis', 'co.ship': 'Envío a domicilio', 'co.shipd': '24–72 h · 4,95 € (gratis desde 120 €)',
      'co.address': 'Dirección', 'co.zip': 'Código postal', 'co.city': 'Ciudad', 'co.notes': 'Notas para el repartidor (opcional)',
      'co.payPickup': 'Pagar al recoger', 'co.payPickupd': 'Efectivo o tarjeta en tienda', 'co.payDelivery': 'Pagar contra entrega', 'co.payDeliveryd': 'Al repartidor · +2,00 € de gestión',
      'co.payGateway': 'Pasarela de pago', 'co.payGatewayd': 'Tarjeta, Bizum o PayPal · Pago seguro',
      'co.prev': 'Atrás', 'co.next': 'Continuar', 'co.confirm': 'Confirmar pedido', 'co.pay': 'Ir a pagar', 'co.finish': 'Cerrar', 'co.shipping': 'Envío', 'co.fee': 'Gestión contra entrega', 'co.total': 'Total', 'co.free': 'Gratis',
      'co.selectPay': 'Selecciona un método de pago', 'co.invalid': 'Completa correctamente los campos obligatorios.',
      'co.doneTitle': 'Pedido reservado', 'co.donePickup': 'Te avisaremos por email cuando esté listo para recoger en C/ Colón 24. Pagarás en tienda.',
      'co.doneDelivery': 'Prepararemos tu pedido y lo enviaremos a tu dirección. Pagarás al repartidor en el momento de la entrega.', 'co.doneCode': 'Nº de pedido',
      'co.gwTitle': 'Resumen del pago', 'co.gwText': 'Vas a realizar el pago seguro del siguiente importe a través de la pasarela de pago de BLAU Menswear.',
      'co.gwAmount': 'Importe a pagar', 'co.gwNote': 'Al pulsar «Ir a pagar» serás redirigido a la pasarela de pago segura. Tu pedido quedará reservado hasta completar el pago.', 'co.gwPending': 'Pasarela de pago pendiente de integración. Pedido reservado.',
      'cookies.text': 'Utilizamos cookies propias y de terceros para mejorar tu experiencia y analizar la navegación. Puedes aceptarlas o rechazar las no esenciales.', 'cookies.reject': 'Rechazar', 'cookies.accept': 'Aceptar'
    },
    en: {
      'topbar.address': 'Colón St. 24, Valencia', 'topbar.hours': 'Mon–Sat 10:00–20:30', 'logo.tag': 'menswear',
      'nav.home': 'Home', 'nav.collection': 'Collection', 'nav.about': 'About', 'nav.services': 'Services', 'nav.lookbook': 'Lookbook', 'nav.contact': 'Contact',
      'aria.search': 'Search', 'aria.login': 'Sign in', 'aria.theme': 'Toggle theme', 'aria.cart': 'Cart', 'menu.search': 'Search this page',
      'hero.eyebrow': 'New season · Autumn / Winter', 'hero.title': 'Menswear elegance, made to measure',
      'hero.subtitle': 'Contemporary tailoring, curated ready-to-wear and personal styling in the heart of Valencia.',
      'hero.cta1': 'View collection', 'hero.cta2': 'Book a fitting',
      'perks.1t': 'Free shipping over €120', 'perks.1d': 'Delivery in 24–72 h in mainland Spain', 'perks.2t': 'Store pickup', 'perks.2d': 'Reserve online, collect in 2 h',
      'perks.3t': '30-day returns', 'perks.3d': 'No questions, exchange or refund', 'perks.4t': 'Alterations included', 'perks.4d': 'Free adjustment on tailoring and suits',
      'shop.eyebrow': 'Online store', 'shop.title': 'The collection',
      'shop.lead': 'Wardrobe essentials in noble fabrics and modern cuts. Pick a size, add to cart and choose store pickup or home delivery.',
      'shop.f.all': 'All', 'shop.f.tailoring': 'Tailoring', 'shop.f.shirts': 'Shirts', 'shop.f.knit': 'Knitwear', 'shop.f.outerwear': 'Outerwear', 'shop.f.shoes': 'Shoes',
      'shop.add': 'Add', 'shop.size': 'Size', 'shop.new': 'New', 'shop.sale': 'Sale', 'shop.selectSize': 'Please select a size', 'shop.added': 'added to cart',
      'cat.sastreria': 'Tailoring', 'cat.camisas': 'Shirts', 'cat.punto': 'Knitwear', 'cat.abrigos': 'Outerwear', 'cat.calzado': 'Shoes',
      'about.badge': 'since', 'about.eyebrow': 'Our story', 'about.title': 'A boutique for the man who dresses with intention',
      'about.p1': 'BLAU was born in 2009 in Valencia\'s Ensanche district with a simple idea: bring together signature tailoring, independent European brands and honest, unhurried styling advice under one roof.',
      'about.p2': 'We work with workshops in Italy, Portugal and Spain, select seasonal fabrics in small runs and care for every detail, from the buttonhole to the wrapping.',
      'about.s1': 'years of craft', 'about.s2': 'curated brands', 'about.s3': 'happy clients', 'about.cta': 'Visit us',
      'services.eyebrow': 'Services', 'services.title': 'More than a store', 'services.lead': 'Every purchase comes with services designed so the garment fits as if it were made for you.',
      'services.1t': 'Made-to-measure tailoring', 'services.1d': 'Suits, jackets and shirts cut from your measurements. Over 300 fabrics and delivery in 4 weeks.', 'services.1c': 'Book appointment',
      'services.2t': 'Personal shopper', 'services.2d': 'A private hour with our stylist to build a coherent wardrobe around your style and budget.', 'services.2c': 'Book session',
      'services.3t': 'Alterations & care', 'services.3d': 'In-house alterations, shoe care and garment repair to extend the life of what you already own.', 'services.3c': 'Ask us',
      'look.eyebrow': 'Lookbook', 'look.title': 'Seasonal inspiration', 'look.1': 'Layers & textures', 'look.2': 'Smart casual', 'look.3': 'Urban tailoring', 'look.4': 'The shoe detail', 'look.5': 'Earth tones', 'look.6': 'Winter white',
      'contact.eyebrow': 'Contact', 'contact.title': 'Let\'s talk', 'contact.lead': 'Write to us to book a fitting, check availability or ask anything about your order.',
      'contact.addr': 'Address', 'contact.phone': 'Phone', 'contact.hours': 'Opening hours', 'contact.hoursv': 'Monday to Saturday · 10:00–20:30',
      'form.name': 'Name', 'form.lastname': 'Last name', 'form.subject': 'Subject', 'form.s1': 'Tailoring appointment', 'form.s2': 'Order enquiry', 'form.s3': 'Other', 'form.message': 'Message',
      'form.privacy': 'I have read and accept the privacy policy.', 'form.send': 'Send message', 'form.ok': 'Thank you. We will reply within 24 h.', 'form.error': 'Please check the highlighted fields.',
      'footer.desc': 'Menswear boutique in Valencia. Tailoring, ready-to-wear and curated accessories.', 'footer.shop': 'Shop', 'footer.l1': 'Collection', 'footer.l2': 'Made-to-measure', 'footer.l3': 'Lookbook', 'footer.l4': 'Gift card',
      'footer.help': 'Help', 'footer.h1': 'Size guide', 'footer.h2': 'Shipping & pickup', 'footer.h3': 'Exchanges & returns', 'footer.h4': 'Payment methods',
      'footer.legal': 'Legal', 'footer.c1': 'Cookie policy', 'footer.c2': 'Privacy policy', 'footer.c3': 'Terms & purchase conditions', 'footer.c4': 'Legal notice',
      'footer.rights': 'All rights reserved.', 'footer.credits': 'Sample images: Pexels (free use). To be replaced with the client\'s photos.',
      'search.title': 'Search this page', 'search.ph': 'Shirt, tailoring, shipping…', 'search.none': 'No results for', 'search.count': 'matches', 'search.min': 'Type at least 2 characters',
      'login.title': 'Customer login', 'login.text': 'Sign in to view orders, addresses and tailoring appointments.', 'login.pass': 'Password', 'login.btn': 'Sign in', 'login.pending': 'Login system pending integration.',
      'cart.title': 'Your cart', 'cart.subtotal': 'Subtotal', 'cart.checkout': 'Checkout', 'cart.clear': 'Empty cart', 'cart.empty': 'Your cart is empty', 'cart.emptyHint': 'Add garments from the collection.',
      'cart.remove': 'Remove', 'cart.freeShip': 'Free shipping unlocked. Store pickup is always free.', 'cart.toFree': 'to free shipping · Store pickup is free', 'cart.items': 'items', 'cart.item': 'item', 'cart.cleared': 'Cart emptied',
      'co.step1': 'Details', 'co.step2': 'Delivery', 'co.step3': 'Payment', 'co.step4': 'Confirmation', 'co.t1': 'Your details', 'co.t2': 'How would you like to receive it?', 'co.t3': 'Payment method',
      'co.pickup': 'Store pickup', 'co.pickupd': 'Colón St. 24, Valencia · Ready in 2 h · Free', 'co.ship': 'Home delivery', 'co.shipd': '24–72 h · €4.95 (free over €120)',
      'co.address': 'Address', 'co.zip': 'Postal code', 'co.city': 'City', 'co.notes': 'Notes for the courier (optional)',
      'co.payPickup': 'Pay at pickup', 'co.payPickupd': 'Cash or card in store', 'co.payDelivery': 'Cash on delivery', 'co.payDeliveryd': 'To the courier · +€2.00 handling',
      'co.payGateway': 'Payment gateway', 'co.payGatewayd': 'Card, Bizum or PayPal · Secure payment',
      'co.prev': 'Back', 'co.next': 'Continue', 'co.confirm': 'Confirm order', 'co.pay': 'Proceed to payment', 'co.finish': 'Close', 'co.shipping': 'Shipping', 'co.fee': 'Cash on delivery fee', 'co.total': 'Total', 'co.free': 'Free',
      'co.selectPay': 'Select a payment method', 'co.invalid': 'Please fill in the required fields correctly.',
      'co.doneTitle': 'Order reserved', 'co.donePickup': 'We will email you when it is ready for pickup at Colón St. 24. You will pay in store.',
      'co.doneDelivery': 'We will prepare your order and ship it to your address. You will pay the courier upon delivery.', 'co.doneCode': 'Order no.',
      'co.gwTitle': 'Payment summary', 'co.gwText': 'You are about to securely pay the following amount through the BLAU Menswear payment gateway.',
      'co.gwAmount': 'Amount to pay', 'co.gwNote': 'By clicking "Proceed to payment" you will be redirected to the secure gateway. Your order stays reserved until payment is complete.', 'co.gwPending': 'Payment gateway pending integration. Order reserved.',
      'cookies.text': 'We use our own and third-party cookies to improve your experience and analyse browsing. You can accept them or reject non-essential ones.', 'cookies.reject': 'Reject', 'cookies.accept': 'Accept'
    },
    va: {
      'topbar.address': 'C/ Colom 24, València', 'topbar.hours': 'Dl–Ds 10:00–20:30', 'logo.tag': 'menswear',
      'nav.home': 'Inici', 'nav.collection': 'Col·lecció', 'nav.about': 'Nosaltres', 'nav.services': 'Serveis', 'nav.lookbook': 'Lookbook', 'nav.contact': 'Contacte',
      'aria.search': 'Cercar', 'aria.login': 'Accedir', 'aria.theme': 'Canviar tema', 'aria.cart': 'Cistella', 'menu.search': 'Cercar a la pàgina',
      'hero.eyebrow': 'Nova temporada · Tardor / Hivern', 'hero.title': 'Elegància masculina feta a la teua mida',
      'hero.subtitle': 'Sastreria contemporània, prêt-à-porter seleccionat i assessoria personal al cor de València.',
      'hero.cta1': 'Veure col·lecció', 'hero.cta2': 'Cita de sastreria',
      'perks.1t': 'Enviament gratis des de 120 €', 'perks.1d': 'Lliurament en 24–72 h a la Península', 'perks.2t': 'Recollida en botiga', 'perks.2d': 'Reserva online i recull en 2 h',
      'perks.3t': 'Devolucions 30 dies', 'perks.3d': 'Sense preguntes, canvi o reembossament', 'perks.4t': 'Arranjaments inclosos', 'perks.4d': 'Ajust gratuït en sastreria i vestits',
      'shop.eyebrow': 'Botiga online', 'shop.title': 'La col·lecció',
      'shop.lead': 'Peces essencials de fons d\'armari amb teixits nobles i patrons actuals. Tria talla, afig a la cistella i decideix si ho reculls en botiga o t\'ho enviem.',
      'shop.f.all': 'Tot', 'shop.f.tailoring': 'Sastreria', 'shop.f.shirts': 'Camises', 'shop.f.knit': 'Punt', 'shop.f.outerwear': 'Abrics', 'shop.f.shoes': 'Calçat',
      'shop.add': 'Afegir', 'shop.size': 'Talla', 'shop.new': 'Nou', 'shop.sale': 'Oferta', 'shop.selectSize': 'Selecciona una talla', 'shop.added': 'afegit a la cistella',
      'cat.sastreria': 'Sastreria', 'cat.camisas': 'Camises', 'cat.punto': 'Punt', 'cat.abrigos': 'Abrics', 'cat.calzado': 'Calçat',
      'about.badge': 'des de', 'about.eyebrow': 'La nostra història', 'about.title': 'Una boutique pensada per a l\'home que vist amb intenció',
      'about.p1': 'BLAU va nàixer en 2009 al barri de l\'Eixample de València amb una idea senzilla: reunir en un sol espai sastreria d\'autor, marques europees independents i un servei d\'assessoria honest, sense presses.',
      'about.p2': 'Treballem amb tallers d\'Itàlia, Portugal i Espanya, seleccionem teixits de temporada en xicotetes sèries i cuidem cada detall, des del trau fins a l\'embolcall.',
      'about.s1': 'anys d\'ofici', 'about.s2': 'marques seleccionades', 'about.s3': 'clients satisfets', 'about.cta': 'Visita\'ns',
      'services.eyebrow': 'Serveis', 'services.title': 'Més que una botiga', 'services.lead': 'Acompanyem cada compra amb serveis pensats perquè la peça et senta com si estiguera feta per a tu.',
      'services.1t': 'Sastreria a mida', 'services.1d': 'Vestits, americanes i camises confeccionats a partir de les teues mides. Més de 300 teixits i lliurament en 4 setmanes.', 'services.1c': 'Demanar cita',
      'services.2t': 'Personal shopper', 'services.2d': 'Una hora privada amb el nostre assessor per a construir un fons d\'armari coherent, amb el teu estil i el teu pressupost.', 'services.2c': 'Reservar sessió',
      'services.3t': 'Arranjaments i cura', 'services.3d': 'Taller propi d\'arranjaments, neteja de calçat i reparació de peces per a allargar la vida del que ja tens.', 'services.3c': 'Consultar',
      'look.eyebrow': 'Lookbook', 'look.title': 'Inspiració de temporada', 'look.1': 'Capes i textures', 'look.2': 'Smart casual', 'look.3': 'Sastreria urbana', 'look.4': 'El detall del calçat', 'look.5': 'Tons terra', 'look.6': 'Blanc hivern',
      'contact.eyebrow': 'Contacte', 'contact.title': 'Parlem', 'contact.lead': 'Escriu-nos per a demanar cita de sastreria, consultar disponibilitat o qualsevol dubte sobre la teua comanda.',
      'contact.addr': 'Adreça', 'contact.phone': 'Telèfon', 'contact.hours': 'Horari', 'contact.hoursv': 'Dilluns a dissabte · 10:00–20:30',
      'form.name': 'Nom', 'form.lastname': 'Cognoms', 'form.subject': 'Assumpte', 'form.s1': 'Cita de sastreria', 'form.s2': 'Consulta sobre una comanda', 'form.s3': 'Altre', 'form.message': 'Missatge',
      'form.privacy': 'He llegit i accepte la política de privacitat.', 'form.send': 'Enviar missatge', 'form.ok': 'Gràcies. Et respondrem en menys de 24 h.', 'form.error': 'Revisa els camps marcats.',
      'footer.desc': 'Boutique de moda masculina a València. Sastreria, prêt-à-porter i accessoris seleccionats.', 'footer.shop': 'Botiga', 'footer.l1': 'Col·lecció', 'footer.l2': 'Sastreria a mida', 'footer.l3': 'Lookbook', 'footer.l4': 'Targeta regal',
      'footer.help': 'Ajuda', 'footer.h1': 'Guia de talles', 'footer.h2': 'Enviaments i recollida', 'footer.h3': 'Canvis i devolucions', 'footer.h4': 'Mètodes de pagament',
      'footer.legal': 'Legal', 'footer.c1': 'Política de cookies', 'footer.c2': 'Política de privacitat', 'footer.c3': 'Requisits i condicions de compra', 'footer.c4': 'Avís legal',
      'footer.rights': 'Tots els drets reservats.', 'footer.credits': 'Imatges de mostra: Pexels (ús lliure). Seran substituïdes per fotografies del client.',
      'search.title': 'Cercar a la pàgina', 'search.ph': 'Camisa, sastreria, enviament…', 'search.none': 'Sense resultats per a', 'search.count': 'coincidències', 'search.min': 'Escriu almenys 2 caràcters',
      'login.title': 'Accés clients', 'login.text': 'Accedeix al teu compte per a veure comandes, adreces i cites de sastreria.', 'login.pass': 'Contrasenya', 'login.btn': 'Entrar', 'login.pending': 'Sistema de login pendent d\'integració.',
      'cart.title': 'La teua cistella', 'cart.subtotal': 'Subtotal', 'cart.checkout': 'Tramitar comanda', 'cart.clear': 'Buidar cistella', 'cart.empty': 'La teua cistella està buida', 'cart.emptyHint': 'Afig peces des de la col·lecció.',
      'cart.remove': 'Eliminar', 'cart.freeShip': 'Enviament gratis aconseguit. Recollida en botiga sempre gratuïta.', 'cart.toFree': 'per a enviament gratis · Recollida en botiga gratuïta', 'cart.items': 'articles', 'cart.item': 'article', 'cart.cleared': 'Cistella buidada',
      'co.step1': 'Dades', 'co.step2': 'Lliurament', 'co.step3': 'Pagament', 'co.step4': 'Confirmació', 'co.t1': 'Les teues dades', 'co.t2': 'Com vols rebre-ho?', 'co.t3': 'Mètode de pagament',
      'co.pickup': 'Recollir en botiga', 'co.pickupd': 'C/ Colom 24, València · Llest en 2 h · Gratis', 'co.ship': 'Enviament a domicili', 'co.shipd': '24–72 h · 4,95 € (gratis des de 120 €)',
      'co.address': 'Adreça', 'co.zip': 'Codi postal', 'co.city': 'Ciutat', 'co.notes': 'Notes per al repartidor (opcional)',
      'co.payPickup': 'Pagar en recollir', 'co.payPickupd': 'Efectiu o targeta en botiga', 'co.payDelivery': 'Pagar contra lliurament', 'co.payDeliveryd': 'Al repartidor · +2,00 € de gestió',
      'co.payGateway': 'Passarel·la de pagament', 'co.payGatewayd': 'Targeta, Bizum o PayPal · Pagament segur',
      'co.prev': 'Arrere', 'co.next': 'Continuar', 'co.confirm': 'Confirmar comanda', 'co.pay': 'Anar a pagar', 'co.finish': 'Tancar', 'co.shipping': 'Enviament', 'co.fee': 'Gestió contra lliurament', 'co.total': 'Total', 'co.free': 'Gratis',
      'co.selectPay': 'Selecciona un mètode de pagament', 'co.invalid': 'Completa correctament els camps obligatoris.',
      'co.doneTitle': 'Comanda reservada', 'co.donePickup': 'T\'avisarem per email quan estiga llesta per a recollir al C/ Colom 24. Pagaràs en botiga.',
      'co.doneDelivery': 'Prepararem la teua comanda i l\'enviarem a la teua adreça. Pagaràs al repartidor en el moment del lliurament.', 'co.doneCode': 'Núm. de comanda',
      'co.gwTitle': 'Resum del pagament', 'co.gwText': 'Vas a realitzar el pagament segur del següent import a través de la passarel·la de pagament de BLAU Menswear.',
      'co.gwAmount': 'Import a pagar', 'co.gwNote': 'En prémer «Anar a pagar» seràs redirigit a la passarel·la de pagament segura. La teua comanda quedarà reservada fins a completar el pagament.', 'co.gwPending': 'Passarel·la de pagament pendent d\'integració. Comanda reservada.',
      'cookies.text': 'Utilitzem cookies pròpies i de tercers per a millorar la teua experiència i analitzar la navegació. Pots acceptar-les o rebutjar les no essencials.', 'cookies.reject': 'Rebutjar', 'cookies.accept': 'Acceptar'
    }
  };

  let currentLang = localStorage.getItem(STORAGE.lang) || 'es';
  if (!I18N[currentLang]) currentLang = 'es';

  /** Devuelve la traducción de una clave en el idioma actual */
  const t = (key) => (I18N[currentLang] && I18N[currentLang][key]) || I18N.es[key] || key;

  /** Aplica las traducciones a todos los elementos marcados con data-i18n */
  function applyLanguage(lang) {
    currentLang = lang;
    localStorage.setItem(STORAGE.lang, lang);
    document.documentElement.lang = lang === 'va' ? 'ca' : lang;

    $$('[data-i18n]').forEach((el) => { el.textContent = t(el.dataset.i18n); });
    $$('[data-i18n-placeholder]').forEach((el) => { el.placeholder = t(el.dataset.i18nPlaceholder); });
    $$('[data-i18n-aria]').forEach((el) => { el.setAttribute('aria-label', t(el.dataset.i18nAria)); });
    $$('.lang-switch__btn').forEach((btn) => btn.classList.toggle('is-active', btn.dataset.lang === lang));

    renderProducts();
    renderCart();
  }

  $$('.lang-switch__btn').forEach((btn) => btn.addEventListener('click', () => applyLanguage(btn.dataset.lang)));

  /* ------------------------------------------------------------------------
     2. Modo claro / oscuro
     ------------------------------------------------------------------------ */
  const themeToggle = $('#themeToggle');

  function applyTheme(theme) {
    document.body.classList.toggle('dark', theme === 'dark');
    localStorage.setItem(STORAGE.theme, theme);
  }

  const savedTheme = localStorage.getItem(STORAGE.theme) || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  applyTheme(savedTheme);

  themeToggle.addEventListener('click', () => {
    applyTheme(document.body.classList.contains('dark') ? 'light' : 'dark');
  });

  /* ------------------------------------------------------------------------
     3. Menú hamburguesa
     ------------------------------------------------------------------------ */
  const hamburger = $('#hamburgerBtn');
  const mobileMenu = $('#mobileMenu');

  function toggleMobileMenu(force) {
    const open = typeof force === 'boolean' ? force : !mobileMenu.classList.contains('is-open');
    mobileMenu.classList.toggle('is-open', open);
    hamburger.classList.toggle('is-open', open);
    hamburger.setAttribute('aria-expanded', String(open));
    mobileMenu.setAttribute('aria-hidden', String(!open));
    document.body.classList.toggle('no-scroll', open);
  }

  hamburger.addEventListener('click', () => toggleMobileMenu());
  mobileMenu.addEventListener('click', (e) => { if (e.target === mobileMenu) toggleMobileMenu(false); });
  $$('.mobile-menu__link').forEach((link) => link.addEventListener('click', () => toggleMobileMenu(false)));

  /* ------------------------------------------------------------------------
     4. Modales genéricos (abrir / cerrar / Escape)
     ------------------------------------------------------------------------ */
  function openOverlay(id) {
    const el = document.getElementById(id);
    el.classList.add('is-open');
    el.setAttribute('aria-hidden', 'false');
    document.body.classList.add('no-scroll');
    const focusable = el.querySelector('input, button:not(.modal__close)');
    if (focusable) setTimeout(() => focusable.focus(), 300);
  }

  function closeOverlay(id) {
    const el = document.getElementById(id);
    el.classList.remove('is-open');
    el.setAttribute('aria-hidden', 'true');
    if (!$('.modal.is-open, .drawer.is-open')) document.body.classList.remove('no-scroll');
    if (id === 'searchModal') clearHighlights();
  }

  $$('[data-close]').forEach((btn) => btn.addEventListener('click', () => closeOverlay(btn.dataset.close)));

  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    $$('.modal.is-open, .drawer.is-open').forEach((el) => closeOverlay(el.id));
    if (mobileMenu.classList.contains('is-open')) toggleMobileMenu(false);
  });

  /* ------------------------------------------------------------------------
     5. Modal de búsqueda con resaltado de coincidencias
     ------------------------------------------------------------------------ */
  const searchInput = $('#searchInput');
  const searchResults = $('#searchResults');
  const searchCount = $('#searchCount');

  function openSearch() {
    toggleMobileMenu(false);
    openOverlay('searchModal');
    searchInput.value = '';
    searchResults.innerHTML = '';
    searchCount.textContent = '';
  }

  $('#searchOpenBtn').addEventListener('click', openSearch);
  $('#mobileSearchBtn').addEventListener('click', openSearch);

  /** Elimina los <mark> previos devolviendo el texto a su estado original */
  function clearHighlights() {
    $$('mark.search-highlight').forEach((mark) => {
      const parent = mark.parentNode;
      parent.replaceChild(document.createTextNode(mark.textContent), mark);
      parent.normalize();
    });
  }

  /** Devuelve el título de la sección a la que pertenece un nodo */
  function sectionLabel(node) {
    const section = node.parentElement.closest('section');
    if (!section) return 'BLAU';
    const heading = section.querySelector('h1, h2');
    return heading ? heading.textContent.trim() : section.id;
  }

  /** Recorre los nodos de texto de <main>, resalta coincidencias y lista resultados */
  function runSearch(query) {
    clearHighlights();
    searchResults.innerHTML = '';
    const term = query.trim();

    if (term.length < 2) { searchCount.textContent = term ? t('search.min') : ''; return; }

    const walker = document.createTreeWalker(document.getElementById('main'), NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        if (!node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
        const tag = node.parentElement.tagName;
        if (['SCRIPT', 'STYLE', 'OPTION', 'TEXTAREA'].includes(tag)) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    });

    const regex = new RegExp(term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
    const textNodes = [];
    while (walker.nextNode()) textNodes.push(walker.currentNode);

    const matches = [];
    textNodes.forEach((node) => {
      const text = node.nodeValue;
      if (!regex.test(text)) return;
      regex.lastIndex = 0;

      const fragment = document.createDocumentFragment();
      let last = 0, m;
      while ((m = regex.exec(text)) !== null) {
        fragment.appendChild(document.createTextNode(text.slice(last, m.index)));
        const mark = document.createElement('mark');
        mark.className = 'search-highlight';
        mark.textContent = m[0];
        fragment.appendChild(mark);
        matches.push({ mark, label: sectionLabel(node), snippet: text.slice(Math.max(0, m.index - 40), m.index + m[0].length + 40).trim() });
        last = m.index + m[0].length;
      }
      fragment.appendChild(document.createTextNode(text.slice(last)));
      node.parentNode.replaceChild(fragment, node);
    });

    if (!matches.length) { searchCount.textContent = `${t('search.none')} «${term}»`; return; }
    searchCount.textContent = `${matches.length} ${t('search.count')}`;

    matches.slice(0, 40).forEach(({ mark, label, snippet }) => {
      const li = document.createElement('li');
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.innerHTML = `<small>${escapeHtml(label)}</small>…${escapeHtml(snippet).replace(regex, (s) => `<mark class="search-highlight">${s}</mark>`)}…`;
      btn.addEventListener('click', () => {
        // Guardamos el contenedor antes de cerrar (cerrar elimina los <mark>)
        const parent = mark.parentElement;
        closeOverlay('searchModal');
        parent.scrollIntoView({ behavior: 'smooth', block: 'center' });
        parent.style.transition = 'background .4s';
        parent.style.background = 'var(--mark)';
        setTimeout(() => { parent.style.background = ''; }, 1600);
      });
      li.appendChild(btn);
      searchResults.appendChild(li);
    });
  }

  let searchTimer;
  searchInput.addEventListener('input', () => {
    clearTimeout(searchTimer);
    searchTimer = setTimeout(() => runSearch(searchInput.value), 220);
  });

  /* ------------------------------------------------------------------------
     6. Login (placeholder para integración posterior)
     ------------------------------------------------------------------------ */
  $('#userBtn').addEventListener('click', () => openOverlay('loginModal'));
  $('#loginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const msg = $('#loginMsg');
    msg.className = 'form__msg is-ok';
    msg.textContent = t('login.pending');
  });

  /* ------------------------------------------------------------------------
     7. Catálogo de productos
     ------------------------------------------------------------------------ */
  const PRODUCTS = [
    { id: 'p1', cat: 'camisas', price: 59, oldPrice: null, tag: 'new', sizes: ['S', 'M', 'L', 'XL'], img: 'https://images.pexels.com/photos/775771/pexels-photo-775771.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=600',
      name: { es: 'Camisa Oxford blanca', en: 'White Oxford shirt', va: 'Camisa Oxford blanca' } },
    { id: 'p2', cat: 'sastreria', price: 189, oldPrice: null, tag: null, sizes: ['46', '48', '50', '52', '54'], img: 'https://images.pexels.com/photos/33800036/pexels-photo-33800036.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=600',
      name: { es: 'Americana de lana azul marino', en: 'Navy wool blazer', va: 'Americana de llana blau marí' } },
    { id: 'p3', cat: 'abrigos', price: 99, oldPrice: 129, tag: 'sale', sizes: ['S', 'M', 'L', 'XL'], img: 'https://images.pexels.com/photos/32708964/pexels-photo-32708964.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=600',
      name: { es: 'Chaqueta vaquera lavado medio', en: 'Mid-wash denim jacket', va: 'Jaqueta texana rentat mitjà' } },
    { id: 'p4', cat: 'punto', price: 79, oldPrice: null, tag: 'new', sizes: ['S', 'M', 'L', 'XL'], img: 'https://images.pexels.com/photos/9558897/pexels-photo-9558897.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=600',
      name: { es: 'Jersey de lana merino', en: 'Merino wool sweater', va: 'Jersei de llana merina' } },
    { id: 'p5', cat: 'abrigos', price: 249, oldPrice: null, tag: null, sizes: ['48', '50', '52', '54'], img: 'https://images.pexels.com/photos/18036897/pexels-photo-18036897.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=600',
      name: { es: 'Abrigo cruzado de paño', en: 'Double-breasted wool coat', va: 'Abric creuat de drap' } },
    { id: 'p6', cat: 'calzado', price: 149, oldPrice: null, tag: null, sizes: ['40', '41', '42', '43', '44', '45'], img: 'https://images.pexels.com/photos/298864/pexels-photo-298864.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=600',
      name: { es: 'Zapato Oxford de piel coñac', en: 'Cognac leather Oxford shoe', va: 'Sabata Oxford de pell conyac' } },
    { id: 'p7', cat: 'abrigos', price: 129, oldPrice: 159, tag: 'sale', sizes: ['S', 'M', 'L'], img: 'https://images.pexels.com/photos/18703881/pexels-photo-18703881.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=600',
      name: { es: 'Chaqueta sport marfil', en: 'Ivory sport jacket', va: 'Jaqueta sport ivori' } },
    { id: 'p8', cat: 'sastreria', price: 449, oldPrice: null, tag: null, sizes: ['46', '48', '50', '52', '54', '56'], img: 'https://images.pexels.com/photos/36910113/pexels-photo-36910113.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=600',
      name: { es: 'Traje gris de dos piezas', en: 'Grey two-piece suit', va: 'Vestit gris de dues peces' } }
  ];

  const productsGrid = $('#productsGrid');
  let activeFilter = 'all';
  const selectedSizes = {}; // { productId: size }

  function productName(p) { return p.name[currentLang] || p.name.es; }

  function renderProducts() {
    productsGrid.innerHTML = PRODUCTS.map((p) => `
      <article class="product reveal is-visible ${activeFilter !== 'all' && p.cat !== activeFilter ? 'is-hidden' : ''}" data-id="${p.id}" data-cat="${p.cat}">
        <div class="product__media">
          <img src="${p.img}" alt="${escapeHtml(productName(p))}" loading="lazy">
          ${p.tag ? `<span class="product__tag ${p.tag === 'sale' ? 'product__tag--sale' : ''}">${t('shop.' + p.tag)}</span>` : ''}
        </div>
        <div class="product__body">
          <span class="product__cat">${t('cat.' + p.cat)}</span>
          <h3 class="product__name">${escapeHtml(productName(p))}</h3>
          <div class="product__price">${formatPrice(p.price)}${p.oldPrice ? `<del>${formatPrice(p.oldPrice)}</del>` : ''}</div>
          <div class="sizes" aria-label="${t('shop.size')}">
            ${p.sizes.map((s) => `<button type="button" class="size ${selectedSizes[p.id] === s ? 'is-selected' : ''}" data-size="${s}">${s}</button>`).join('')}
          </div>
          <button type="button" class="btn btn--primary product__add">
            <svg viewBox="0 0 24 24"><path d="M6 7h14l-1.5 9h-11zM6 7 5 3H2"/><circle cx="9" cy="20" r="1.5"/><circle cx="17" cy="20" r="1.5"/></svg>
            ${t('shop.add')}
          </button>
        </div>
      </article>`).join('');
  }

  // Delegación de eventos: selección de talla y añadir al carrito
  productsGrid.addEventListener('click', (e) => {
    const card = e.target.closest('.product');
    if (!card) return;
    const id = card.dataset.id;

    const sizeBtn = e.target.closest('.size');
    if (sizeBtn) {
      selectedSizes[id] = sizeBtn.dataset.size;
      $$('.size', card).forEach((b) => b.classList.toggle('is-selected', b === sizeBtn));
      return;
    }

    if (e.target.closest('.product__add')) {
      if (!selectedSizes[id]) {
        showToast(t('shop.selectSize'));
        $('.sizes', card).animate([{ transform: 'translateX(0)' }, { transform: 'translateX(-5px)' }, { transform: 'translateX(5px)' }, { transform: 'translateX(0)' }], { duration: 300 });
        return;
      }
      addToCart(id, selectedSizes[id]);
    }
  });

  // Filtros de categoría
  $$('.filter').forEach((btn) => btn.addEventListener('click', () => {
    activeFilter = btn.dataset.filter;
    $$('.filter').forEach((b) => b.classList.toggle('is-active', b === btn));
    $$('.product').forEach((card) => card.classList.toggle('is-hidden', activeFilter !== 'all' && card.dataset.cat !== activeFilter));
  }));

  /* ------------------------------------------------------------------------
     8. Carrito de compra (persistente en localStorage)
     ------------------------------------------------------------------------ */
  const SHIPPING_COST = 4.95;
  const FREE_SHIPPING_FROM = 120;
  const COD_FEE = 2;

  let cart = [];
  try { cart = JSON.parse(localStorage.getItem(STORAGE.cart)) || []; } catch (_) { cart = []; }

  const saveCart = () => localStorage.setItem(STORAGE.cart, JSON.stringify(cart));
  const cartSubtotal = () => cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const cartCount = () => cart.reduce((sum, item) => sum + item.qty, 0);

  function addToCart(id, size) {
    const product = PRODUCTS.find((p) => p.id === id);
    const existing = cart.find((item) => item.id === id && item.size === size);
    if (existing) existing.qty += 1;
    else cart.push({ id, size, price: product.price, qty: 1 });
    saveCart();
    renderCart();
    showToast(`${productName(product)} (${size}) ${t('shop.added')}`);
  }

  function updateQty(index, delta) {
    cart[index].qty += delta;
    if (cart[index].qty <= 0) cart.splice(index, 1);
    saveCart();
    renderCart();
  }

  function removeItem(index) {
    cart.splice(index, 1);
    saveCart();
    renderCart();
  }

  function renderCart() {
    const badge = $('#cartBadge');
    const count = cartCount();
    badge.textContent = count;
    badge.hidden = count === 0;
    $('#cartCountLabel').textContent = count ? `(${count} ${count === 1 ? t('cart.item') : t('cart.items')})` : '';

    const list = $('#cartItems');
    const footer = $('#cartFooter');

    if (!cart.length) {
      list.innerHTML = `<div class="cart-empty">
        <svg viewBox="0 0 24 24"><path d="M6 7h14l-1.5 9h-11zM6 7 5 3H2"/><circle cx="9" cy="20" r="1.5"/><circle cx="17" cy="20" r="1.5"/></svg>
        <p><strong>${t('cart.empty')}</strong></p><p>${t('cart.emptyHint')}</p></div>`;
      footer.hidden = true;
      return;
    }

    footer.hidden = false;
    list.innerHTML = cart.map((item, i) => {
      const p = PRODUCTS.find((x) => x.id === item.id);
      return `<div class="cart-item" data-index="${i}">
        <img src="${p.img}" alt="${escapeHtml(productName(p))}">
        <div>
          <div class="cart-item__name">${escapeHtml(productName(p))}</div>
          <div class="cart-item__meta">${t('shop.size')} ${item.size} · ${formatPrice(item.price)}</div>
          <div class="qty">
            <button type="button" data-action="dec" aria-label="−">−</button>
            <span>${item.qty}</span>
            <button type="button" data-action="inc" aria-label="+">+</button>
          </div>
        </div>
        <div class="cart-item__right">
          <span class="cart-item__price">${formatPrice(item.price * item.qty)}</span>
          <button type="button" class="cart-item__remove" data-action="remove">${t('cart.remove')}</button>
        </div>
      </div>`;
    }).join('');

    const subtotal = cartSubtotal();
    $('#cartSubtotal').textContent = formatPrice(subtotal);
    $('#shippingHint').textContent = subtotal >= FREE_SHIPPING_FROM
      ? t('cart.freeShip')
      : `${formatPrice(FREE_SHIPPING_FROM - subtotal)} ${t('cart.toFree')}`;
  }

  $('#cartItems').addEventListener('click', (e) => {
    const btn = e.target.closest('[data-action]');
    if (!btn) return;
    const index = Number(btn.closest('.cart-item').dataset.index);
    if (btn.dataset.action === 'inc') updateQty(index, 1);
    if (btn.dataset.action === 'dec') updateQty(index, -1);
    if (btn.dataset.action === 'remove') removeItem(index);
  });

  $('#cartOpenBtn').addEventListener('click', () => { toggleMobileMenu(false); openOverlay('cartDrawer'); });
  $('#clearCartBtn').addEventListener('click', () => { cart = []; saveCart(); renderCart(); showToast(t('cart.cleared')); });

  /* ------------------------------------------------------------------------
     9. Checkout: datos → entrega → pago → confirmación / pasarela
     ------------------------------------------------------------------------ */
  const checkoutForm = $('#checkoutForm');
  const checkoutMsg = $('#checkoutMsg');
  const coPrev = $('#coPrev');
  const coNext = $('#coNext');
  let currentStep = 1;
  let lastOrder = null;

  const getDelivery = () => checkoutForm.delivery.value;
  const getPayment = () => (checkoutForm.querySelector('input[name="payment"]:checked') || {}).value || '';

  /** Calcula los importes del pedido según entrega y pago */
  function computeTotals() {
    const subtotal = cartSubtotal();
    const shipping = getDelivery() === 'shipping' && subtotal < FREE_SHIPPING_FROM ? SHIPPING_COST : 0;
    const fee = getPayment() === 'pay_delivery' ? COD_FEE : 0;
    return { subtotal, shipping, fee, total: subtotal + shipping + fee };
  }

  function summaryHtml() {
    const { subtotal, shipping, fee, total } = computeTotals();
    const lines = cart.map((item) => {
      const p = PRODUCTS.find((x) => x.id === item.id);
      return `<div><span>${item.qty} × ${escapeHtml(productName(p))} (${item.size})</span><span>${formatPrice(item.price * item.qty)}</span></div>`;
    }).join('');
    return `${lines}
      <div><span>${t('cart.subtotal')}</span><span>${formatPrice(subtotal)}</span></div>
      ${getDelivery() === 'shipping' ? `<div><span>${t('co.shipping')}</span><span>${shipping ? formatPrice(shipping) : t('co.free')}</span></div>` : ''}
      ${fee ? `<div><span>${t('co.fee')}</span><span>${formatPrice(fee)}</span></div>` : ''}
      <div class="is-total"><span>${t('co.total')}</span><span>${formatPrice(total)}</span></div>`;
  }

  function renderSummary() { $('#orderSummary').innerHTML = summaryHtml(); }

  /** Muestra las opciones de pago coherentes con el tipo de entrega */
  function syncPaymentOptions() {
    const pickup = getDelivery() === 'pickup';
    $('#payPickupChoice').classList.toggle('is-disabled', !pickup);
    $('#payDeliveryChoice').classList.toggle('is-disabled', pickup);
    const checked = checkoutForm.querySelector('input[name="payment"]:checked');
    if (checked && checked.closest('.choice').classList.contains('is-disabled')) checked.checked = false;
    renderSummary();
  }

  function goToStep(step) {
    currentStep = step;
    $$('.co-step').forEach((fs) => fs.classList.toggle('is-active', Number(fs.dataset.step) === step));
    $$('#checkoutSteps li').forEach((li, i) => {
      li.classList.toggle('is-active', i + 1 === step);
      li.classList.toggle('is-done', i + 1 < step);
    });
    coPrev.hidden = step === 1 || step === 4;
    $('#coNav').hidden = step === 4;
    if (step === 3) syncPaymentOptions();
    coNext.textContent = step === 3 ? (getPayment() === 'gateway' ? t('co.pay') : t('co.confirm')) : t('co.next');
    checkoutMsg.textContent = '';
    $('.modal__box--wide').scrollTop = 0;
  }

  /** Valida los campos requeridos del paso actual */
  function validateStep(step) {
    const fieldset = $(`.co-step[data-step="${step}"]`);
    let ok = true;
    $$('input', fieldset).forEach((input) => input.classList.remove('is-invalid'));

    if (step === 1) {
      $$('input', fieldset).forEach((input) => { if (!input.checkValidity()) { input.classList.add('is-invalid'); ok = false; } });
    }
    if (step === 2 && getDelivery() === 'shipping') {
      ['coAddress', 'coZip', 'coCity'].forEach((name) => {
        const input = checkoutForm[name];
        if (!input.value.trim() || (name === 'coZip' && !/^\d{5}$/.test(input.value.trim()))) { input.classList.add('is-invalid'); ok = false; }
      });
    }
    if (step === 3 && !getPayment()) { checkoutMsg.className = 'form__msg is-error'; checkoutMsg.textContent = t('co.selectPay'); return false; }
    if (!ok) { checkoutMsg.className = 'form__msg is-error'; checkoutMsg.textContent = t('co.invalid'); }
    return ok;
  }

  /** Construye el objeto de pedido que recibirá la pasarela / backend */
  function buildOrder() {
    const f = checkoutForm;
    return {
      code: 'BLAU-' + Date.now().toString(36).toUpperCase(),
      customer: { name: f.coName.value.trim(), lastname: f.coLastname.value.trim(), email: f.coEmail.value.trim(), phone: f.coPhone.value.trim() },
      delivery: getDelivery(),
      address: getDelivery() === 'shipping' ? { street: f.coAddress.value.trim(), zip: f.coZip.value.trim(), city: f.coCity.value.trim(), notes: f.coNotes.value.trim() } : null,
      payment: getPayment(),
      items: cart.map((item) => ({ id: item.id, name: productName(PRODUCTS.find((p) => p.id === item.id)), size: item.size, qty: item.qty, price: item.price })),
      totals: computeTotals(),
      createdAt: new Date().toISOString()
    };
  }

  function renderConfirmation(order) {
    const box = $('#confirmationBox');
    const summary = `<div class="order-summary">${summaryHtml()}</div>`;

    if (order.payment === 'gateway') {
      // Ventana previa a la pasarela: muestra lo que se va a pagar
      box.innerHTML = `<div class="gateway">
        <h2 class="modal__title">${t('co.gwTitle')}</h2>
        <p class="modal__text">${t('co.gwText')}</p>
        <div class="gateway__amount"><small>${t('co.gwAmount')}</small><strong>${formatPrice(order.totals.total)}</strong></div>
        <p class="confirm__code" style="justify-self:center;text-align:center">${t('co.doneCode')}: ${order.code}</p>
        ${summary}
        <div class="gateway__methods"><span>VISA</span><span>Mastercard</span><span>Bizum</span><span>PayPal</span></div>
        <p class="gateway__note">${t('co.gwNote')}</p>
        <button type="button" class="btn btn--primary btn--block" id="gatewayPayBtn">${t('co.pay')} · ${formatPrice(order.totals.total)}</button>
      </div>`;
      $('#gatewayPayBtn').addEventListener('click', () => {
        // Punto de integración: aquí se llamará a la pasarela real con el objeto `order`.
        if (typeof window.iniciarPasarelaPago === 'function') { window.iniciarPasarelaPago(order); return; }
        showToast(t('co.gwPending'));
        finishOrder();
      });
      return;
    }

    box.innerHTML = `<div class="confirm">
      <div class="confirm__icon"><svg viewBox="0 0 24 24"><path d="m5 12 5 5L20 7"/></svg></div>
      <h2>${t('co.doneTitle')}</h2>
      <p>${order.delivery === 'pickup' ? t('co.donePickup') : t('co.doneDelivery')}</p>
      <span class="confirm__code">${t('co.doneCode')}: ${order.code}</span>
      ${summary}
      <button type="button" class="btn btn--primary" id="finishOrderBtn">${t('co.finish')}</button>
    </div>`;
    $('#finishOrderBtn').addEventListener('click', finishOrder);
  }

  /** Cierra el checkout y vacía el carrito tras reservar/pagar */
  function finishOrder() {
    cart = [];
    saveCart();
    renderCart();
    closeOverlay('checkoutModal');
    checkoutForm.reset();
    $('#addressFields').hidden = true;
    goToStep(1);
  }

  $('#checkoutBtn').addEventListener('click', () => {
    if (!cart.length) return;
    closeOverlay('cartDrawer');
    goToStep(1);
    openOverlay('checkoutModal');
  });

  coNext.addEventListener('click', () => {
    if (!validateStep(currentStep)) return;
    if (currentStep < 3) { goToStep(currentStep + 1); return; }
    lastOrder = buildOrder();
    renderConfirmation(lastOrder);
    goToStep(4);
  });

  coPrev.addEventListener('click', () => { if (currentStep > 1) goToStep(currentStep - 1); });

  $$('input[name="delivery"]').forEach((radio) => radio.addEventListener('change', () => {
    $('#addressFields').hidden = getDelivery() !== 'shipping';
  }));

  $$('input[name="payment"]').forEach((radio) => radio.addEventListener('change', () => {
    renderSummary();
    coNext.textContent = getPayment() === 'gateway' ? t('co.pay') : t('co.confirm');
  }));

  checkoutForm.addEventListener('submit', (e) => { e.preventDefault(); coNext.click(); });

  /* ------------------------------------------------------------------------
     10. Formulario de contacto
     ------------------------------------------------------------------------ */
  $('#contactForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const msg = $('#contactMsg');
    let ok = true;
    $$('input, textarea', form).forEach((el) => {
      const valid = el.checkValidity();
      el.classList.toggle('is-invalid', !valid);
      if (!valid) ok = false;
    });
    msg.className = 'form__msg ' + (ok ? 'is-ok' : 'is-error');
    msg.textContent = ok ? t('form.ok') : t('form.error');
    if (ok) form.reset();
  });

  /* ------------------------------------------------------------------------
     11. Banner de cookies
     ------------------------------------------------------------------------ */
  const cookieBanner = $('#cookieBanner');
  if (!localStorage.getItem(STORAGE.cookies)) setTimeout(() => { cookieBanner.hidden = false; }, 1200);
  const setCookies = (value) => { localStorage.setItem(STORAGE.cookies, value); cookieBanner.hidden = true; };
  $('#cookieAccept').addEventListener('click', () => setCookies('accepted'));
  $('#cookieReject').addEventListener('click', () => setCookies('rejected'));
  $('#cookiesPolicyLink').addEventListener('click', (e) => { e.preventDefault(); localStorage.removeItem(STORAGE.cookies); cookieBanner.hidden = false; });

  /* ------------------------------------------------------------------------
     12. Scroll suave, sección activa, aparición y botón "arriba"
     ------------------------------------------------------------------------ */
  // Scroll suave con compensación del header fijo
  $$('a[href^="#"]').forEach((link) => link.addEventListener('click', (e) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    // Al desplazarse la barra superior se oculta, así que sólo compensamos el header
    const offset = target.id === 'inicio' ? 0 : $('#header').offsetHeight;
    window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - offset + 1, behavior: 'smooth' });
  }));

  // Aparición de elementos al entrar en pantalla
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); revealObserver.unobserve(entry.target); } });
  }, { threshold: 0.12 });
  $$('.reveal').forEach((el) => revealObserver.observe(el));

  // Enlace activo según la sección visible
  const sections = $$('main section[id]');
  const navLinks = $$('.nav__link');
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((link) => link.classList.toggle('is-active', link.getAttribute('href') === '#' + entry.target.id));
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  sections.forEach((s) => sectionObserver.observe(s));

  // Evento de scroll: header compacto y botón volver arriba
  const backTop = $('#backTop');
  let ticking = false;
  function onScroll() {
    document.body.classList.toggle('scrolled', window.scrollY > 60);
    backTop.classList.toggle('is-visible', window.scrollY > 600);
    ticking = false;
  }
  window.addEventListener('scroll', () => { if (!ticking) { requestAnimationFrame(onScroll); ticking = true; } }, { passive: true });
  backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  // Evento de resize: cerrar menú móvil al pasar a escritorio
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => { if (window.innerWidth > 1024 && mobileMenu.classList.contains('is-open')) toggleMobileMenu(false); }, 120);
  });

  /* ------------------------------------------------------------------------
     13. Inicialización
     ------------------------------------------------------------------------ */
  $('#year').textContent = new Date().getFullYear();
  applyLanguage(currentLang); // también renderiza productos y carrito
  onScroll();
})();
