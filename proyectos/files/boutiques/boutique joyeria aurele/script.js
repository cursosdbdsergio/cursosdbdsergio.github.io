/* ==========================================================================
   AURÈLE · Joyería y complementos de lujo
   Lógica de la página (JavaScript puro, sin dependencias)

   Índice:
   1. Configuración              10. Tienda (filtros y productos)
   2. Traducciones (es/en/va)    11. Carrito de compra
   3. Catálogo de productos      12. Checkout (entrega y pago)
   4. Estado y utilidades        13. Pasarela de pago y confirmación
   5. Idioma                     14. Buscador con resaltado
   6. Tema claro/oscuro          15. Formularios y validación
   7. Cabecera, scroll y resize  16. Legal y cookies
   8. Menú hamburguesa           17. Aparición de secciones
   9. Overlays y avisos          18. Inicialización

   Puntos de integración para el cliente (eventos personalizados):
   - "boutique:login-request"     → se lanza al pulsar el botón de usuario.
   - "boutique:payment-request"   → se lanza al pulsar "Continuar al pago"
                                    (detail = pedido). Aquí se monta la pasarela.
   - "boutique:payment-confirmed" → escúchalo (o dispáralo) cuando el pago sea
                                    correcto para cerrar el pedido.
   ========================================================================== */

(() => {
  'use strict';

  /* 1. CONFIGURACIÓN ------------------------------------------------------ */
  const CONFIG = {
    storageKeys: {
      theme: 'aurele:theme',
      language: 'aurele:language',
      cart: 'aurele:cart',
      cookies: 'aurele:cookies'
    },
    defaultLanguage: 'es',
    locales: { es: 'es-ES', en: 'en-GB', va: 'ca-ES' },
    htmlLang: { es: 'es', en: 'en', va: 'ca-ES-valencia' },
    freeShippingThreshold: 500,
    shippingCost: 9.9,
    vatRate: 0.21,
    promoCodes: { BIENVENIDA10: 0.1, ORO15: 0.15 },
    pickupMaxDaysAhead: 30,
    scrollThreshold: 40,
    backToTopThreshold: 600,
    searchMinLength: 2,
    searchMaxResults: 30
  };

  /* 2. TRADUCCIONES ------------------------------------------------------- */
  /* Estructura clave → texto. Si falta una clave se usa el español.
     Para añadir un idioma: nueva entrada aquí + botón con data-lang. */
  const translations = {
    es: {
      'meta.title': 'Aurèle · Joyería y complementos de lujo',
      'a11y.skip': 'Saltar al contenido',
      'a11y.mainNav': 'Navegación principal',
      'a11y.language': 'Idioma',
      'a11y.search': 'Buscar en la página',
      'a11y.login': 'Acceder a mi cuenta',
      'a11y.cart': 'Abrir cesta de la compra',
      'a11y.menuOpen': 'Abrir menú',
      'a11y.menuClose': 'Cerrar menú',
      'a11y.close': 'Cerrar',
      'a11y.top': 'Volver arriba',
      'topbar.shipping': 'Envío gratuito desde 500 €',
      'logo.tagline': 'Joyería & complementos',
      'nav.home': 'Inicio',
      'nav.collections': 'Colecciones',
      'nav.shop': 'Tienda',
      'nav.atelier': 'Atelier',
      'nav.contact': 'Contacto',
      'mobile.search': 'Buscar en la página',
      'hero.eyebrow': 'Joyería de autor · Valencia, desde 1987',
      'hero.title': 'El arte de brillar con elegancia',
      'hero.text': 'Piezas únicas en oro, diamantes y perlas, creadas por maestros orfebres para acompañarte en los momentos que importan.',
      'hero.ctaShop': 'Descubrir la tienda',
      'hero.ctaAtelier': 'Nuestro atelier',
      'hero.badge1': 'Oro 18k certificado',
      'hero.badge2': 'Envío asegurado',
      'hero.badge3': 'Recogida en tienda',
      'collections.eyebrow': 'Colecciones',
      'collections.title': 'Cinco universos, una misma obsesión por el detalle',
      'collections.text': 'Desde solitarios atemporales hasta relojes de edición limitada. Cada colección nace en nuestro taller y se entrega con certificado de autenticidad.',
      'collections.view': 'Ver colección',
      'collections.pieces': '{n} piezas',
      'cat.all': 'Todo',
      'cat.ring': 'Anillos',
      'cat.necklace': 'Collares',
      'cat.earrings': 'Pendientes',
      'cat.watch': 'Relojes',
      'cat.set': 'Conjuntos',
      'type.ring': 'Anillo',
      'type.necklace': 'Collar',
      'type.earrings': 'Pendientes',
      'type.watch': 'Reloj',
      'type.set': 'Conjunto',
      'values.gold.title': 'Oro 18k certificado',
      'values.gold.text': 'Cada pieza lleva contraste oficial y certificado.',
      'values.diamond.title': 'Diamantes éticos',
      'values.diamond.text': 'Gemas trazables, libres de conflicto.',
      'values.warranty.title': 'Garantía 2 años',
      'values.warranty.text': 'Revisión y limpieza gratuitas en tienda.',
      'values.engraving.title': 'Grabado personal',
      'values.engraving.text': 'Añade iniciales o una fecha especial sin coste.',
      'shop.eyebrow': 'Tienda online',
      'shop.title': 'Piezas seleccionadas',
      'shop.text': 'Reserva online y recoge en nuestra boutique o recíbela en casa en un embalaje de regalo.',
      'shop.filterLabel': 'Filtrar por categoría',
      'shop.sort': 'Ordenar por',
      'shop.count': '{n} productos',
      'sort.featured': 'Destacados',
      'sort.priceAsc': 'Precio: de menor a mayor',
      'sort.priceDesc': 'Precio: de mayor a menor',
      'sort.name': 'Nombre (A-Z)',
      'product.add': 'Añadir a la cesta',
      'product.new': 'Novedad',
      'product.limited': 'Edición limitada',
      'product.lastUnits': 'Últimas {n} unidades',
      'mat.gold': 'Oro 18k',
      'mat.rosegold': 'Oro rosa 18k',
      'mat.silver': 'Plata de ley',
      'mat.pearl': 'Perlas cultivadas',
      'mat.emerald': 'Plata y esmeralda',
      'mat.diamond': 'Oro 18k y diamantes',
      'mat.steel': 'Acero y zafiro',
      'mat.leather': 'Acero y piel',
      'mat.mixed': 'Plata y oro rosa',
      'atelier.eyebrow': 'Atelier',
      'atelier.title': 'Alta joyería hecha a mano en Valencia',
      'atelier.text1': 'Desde 1987 trabajamos el oro y las gemas como lo hacían nuestros abuelos: despacio, con paciencia y sin atajos. Cada joya pasa por más de veinte manos antes de llegar a las tuyas.',
      'atelier.text2': 'Ofrecemos diseño a medida, restauración de piezas familiares y asesoramiento personalizado para regalos y compromisos.',
      'atelier.imageAlt': 'Modelo luciendo un conjunto de joyas de oro',
      'atelier.quote': '“Una joya bien hecha no se lleva: se hereda.”',
      'atelier.quoteAuthor': 'Elena Aurèle, fundadora',
      'stats.years': 'años de oficio',
      'stats.masters': 'maestros orfebres',
      'stats.pieces': 'piezas únicas creadas',
      'services.title': 'Servicios del atelier',
      'service.custom.title': 'Diseño a medida',
      'service.custom.text': 'Creamos tu joya desde un boceto.',
      'service.repair.title': 'Reparación y limpieza',
      'service.repair.text': 'Devolvemos el brillo a tus piezas.',
      'service.appraisal.title': 'Tasación',
      'service.appraisal.text': 'Valoración certificada de joyas y relojes.',
      'service.gift.title': 'Embalaje de regalo',
      'service.gift.text': 'Estuche y tarjeta manuscrita incluidos.',
      'contact.eyebrow': 'Contacto',
      'contact.title': 'Visítanos o escríbenos',
      'contact.text': 'Te atenderemos con cita previa o sin ella. Respondemos en menos de 24 horas.',
      'contact.address.label': 'Boutique',
      'contact.phone.label': 'Teléfono',
      'contact.email.label': 'Email',
      'contact.hours.label': 'Horario',
      'contact.hours.value': 'Lun–Sáb · 10:00–20:30',
      'form.name': 'Nombre y apellidos',
      'form.email': 'Correo electrónico',
      'form.phone': 'Teléfono',
      'form.subject': 'Asunto',
      'form.subject.info': 'Información sobre una pieza',
      'form.subject.custom': 'Diseño a medida',
      'form.subject.order': 'Estado de mi pedido',
      'form.subject.other': 'Otro',
      'form.message': 'Mensaje',
      'form.consent': 'Acepto el tratamiento de mis datos para responder a mi consulta.',
      'form.send': 'Enviar mensaje',
      'form.success': 'Gracias, {name}. Hemos recibido tu mensaje y te responderemos en breve.',
      'error.required': 'Este campo es obligatorio',
      'error.email': 'Introduce un correo válido',
      'error.phone': 'Introduce un teléfono válido',
      'error.postal': 'Código postal de 5 dígitos',
      'error.sunday': 'Cerramos los domingos, elige otro día',
      'error.date': 'Elige una fecha futura',
      'error.consent': 'Debes aceptar para continuar',
      'footer.about': 'Joyería y complementos de lujo. Piezas únicas hechas a mano desde 1987.',
      'footer.shop': 'Tienda',
      'footer.info': 'Información',
      'footer.info1': 'Envío gratuito desde 500 €',
      'footer.info2': 'Devoluciones en 30 días',
      'footer.info3': 'Certificado de autenticidad',
      'footer.info4': 'Recogida en tienda en 24 h',
      'footer.legal': 'Legal',
      'footer.cookies': 'Política de cookies',
      'footer.requirements': 'Requisitos de compra',
      'footer.rights': 'Todos los derechos reservados.',
      'footer.credits': 'Imágenes de muestra: Pexels. Serán sustituidas por fotografías del cliente.',
      'search.title': 'Buscar en la página',
      'search.placeholder': 'Escribe una palabra…',
      'search.hint': 'Escribe al menos 2 letras',
      'search.results': '{n} coincidencias',
      'search.none': 'Sin resultados para “{q}”',
      'search.clear': 'Quitar resaltado',
      'search.footer': 'Pie de página',
      'cart.title': 'Tu cesta',
      'cart.empty': 'Tu cesta está vacía',
      'cart.emptyText': 'Descubre nuestras piezas y añade tus favoritas.',
      'cart.continue': 'Seguir comprando',
      'cart.remove': 'Eliminar',
      'cart.increase': 'Aumentar cantidad',
      'cart.decrease': 'Disminuir cantidad',
      'cart.freeShipping.missing': 'Te faltan {amount} para el envío gratuito',
      'cart.freeShipping.done': '¡Envío gratuito conseguido!',
      'cart.promo.label': 'Código promocional',
      'cart.promo.placeholder': 'Ej. BIENVENIDA10',
      'cart.promo.apply': 'Aplicar',
      'cart.promo.applied': 'Código {code} aplicado (−{percent}%)',
      'cart.promo.invalid': 'El código no es válido',
      'cart.promo.remove': 'Quitar',
      'cart.subtotal': 'Subtotal',
      'cart.discount': 'Descuento',
      'cart.shipping': 'Envío',
      'cart.shipping.calc': 'Se calcula al elegir entrega',
      'cart.total': 'Total',
      'cart.vatIncluded': 'IVA incluido',
      'cart.checkout': 'Finalizar compra',
      'cart.clear': 'Vaciar cesta',
      'cart.added': '{name} añadido a la cesta',
      'cart.removed': '{name} eliminado de la cesta',
      'cart.cleared': 'Cesta vaciada',
      'cart.stockLimit': 'Solo quedan {n} unidades de {name}',
      'checkout.title': 'Finalizar compra',
      'checkout.step.data': '1. Tus datos',
      'checkout.step.delivery': '2. Entrega',
      'checkout.step.payment': '3. Pago',
      'delivery.pickup.title': 'Recoger en la boutique',
      'delivery.pickup.text': 'Gratis · Listo en 24 h',
      'delivery.ship.title': 'Envío a domicilio',
      'delivery.ship.text': 'Entrega asegurada en 24-48 h',
      'pickup.store': 'Boutique Aurèle · Calle Colón, 24, Valencia',
      'pickup.date': 'Día de recogida',
      'pickup.time': 'Franja horaria',
      'ship.address': 'Dirección',
      'ship.postal': 'Código postal',
      'ship.city': 'Ciudad',
      'ship.notes': 'Indicaciones para el repartidor (opcional)',
      'checkout.gift': 'Preparar como regalo (estuche y tarjeta, sin coste)',
      'payment.pickup.title': 'Pagar al recoger',
      'payment.pickup.text': 'Abonas en la boutique con tarjeta o efectivo.',
      'payment.delivery.title': 'Pagar en la entrega',
      'payment.delivery.text': 'Pagas al repartidor al recibir tu pedido.',
      'payment.online.title': 'Pagar ahora online',
      'payment.online.text': 'Tarjeta, Bizum o Apple Pay en pasarela segura.',
      'checkout.summary': 'Resumen del pedido',
      'checkout.submit.reserve': 'Confirmar reserva',
      'checkout.submit.order': 'Confirmar pedido',
      'checkout.submit.online': 'Ir al pago seguro',
      'checkout.back': 'Volver a la cesta',
      'checkout.free': 'Gratis',
      'gateway.title': 'Pasarela de pago',
      'gateway.text': 'Revisa lo que vas a pagar. Al continuar se abrirá la pasarela de pago segura.',
      'gateway.order': 'Pedido',
      'gateway.amount': 'Importe a pagar',
      'gateway.slot': 'Aquí se cargará la pasarela de pago del mercado.',
      'gateway.pay': 'Continuar al pago',
      'gateway.back': 'Volver',
      'gateway.pending': 'Pasarela de pago pendiente de integración',
      'confirm.title': '¡Gracias por tu compra!',
      'confirm.order': 'Pedido {id}',
      'confirm.pickupPay': 'Tu reserva está guardada. Te esperamos el {date} a las {time} en la boutique. Pagarás {total} al recoger.',
      'confirm.pickupPaid': 'Hemos recibido tu pago de {total}. Te esperamos el {date} a las {time} en la boutique para recoger tu pedido.',
      'confirm.shipPay': 'Enviaremos tu pedido a {address}. Pagarás {total} al recibirlo.',
      'confirm.shipPaid': 'Hemos recibido tu pago de {total}. Enviaremos tu pedido a {address}.',
      'confirm.email': 'Recibirás un resumen en {email}.',
      'confirm.close': 'Seguir explorando',
      'cookies.text': 'Usamos cookies técnicas para recordar tu cesta, idioma y tema. Puedes leer nuestra política.',
      'cookies.accept': 'Aceptar',
      'cookies.reject': 'Solo necesarias',
      'cookies.more': 'Más información',
      'theme.toLight': 'Cambiar a modo claro',
      'theme.toDark': 'Cambiar a modo oscuro',
      'login.pending': 'El acceso de clientes estará disponible próximamente',
      'legal.cookies.title': 'Política de cookies',
      'legal.cookies.body': 'Utilizamos únicamente cookies técnicas necesarias para el funcionamiento de la web: recordar el contenido de tu cesta, el idioma y el tema claro u oscuro.\nNo empleamos cookies publicitarias ni de seguimiento de terceros.\nPuedes borrar estos datos en cualquier momento desde la configuración de tu navegador.',
      'legal.requirements.title': 'Requisitos de compra',
      'legal.requirements.body': 'Para comprar debes ser mayor de 18 años.\nLas piezas se reservan 48 horas desde la confirmación del pedido.\nPara recoger en tienda es necesario presentar DNI o pasaporte y el número de pedido.\nPuedes devolver cualquier pieza sin usar en 30 días, con su estuche y certificado.\nTodas las joyas incluyen 2 años de garantía y certificado de autenticidad.\nLos precios incluyen IVA. El envío es gratuito desde 500 €.'
    },

    en: {
      'meta.title': 'Aurèle · Luxury jewellery and accessories',
      'a11y.skip': 'Skip to content',
      'a11y.mainNav': 'Main navigation',
      'a11y.language': 'Language',
      'a11y.search': 'Search the page',
      'a11y.login': 'Sign in to my account',
      'a11y.cart': 'Open shopping bag',
      'a11y.menuOpen': 'Open menu',
      'a11y.menuClose': 'Close menu',
      'a11y.close': 'Close',
      'a11y.top': 'Back to top',
      'topbar.shipping': 'Free shipping over €500',
      'logo.tagline': 'Jewellery & accessories',
      'nav.home': 'Home',
      'nav.collections': 'Collections',
      'nav.shop': 'Shop',
      'nav.atelier': 'Atelier',
      'nav.contact': 'Contact',
      'mobile.search': 'Search the page',
      'hero.eyebrow': 'Signature jewellery · Valencia, since 1987',
      'hero.title': 'The art of shining with elegance',
      'hero.text': 'Unique pieces in gold, diamonds and pearls, crafted by master goldsmiths to accompany you in the moments that matter.',
      'hero.ctaShop': 'Discover the shop',
      'hero.ctaAtelier': 'Our atelier',
      'hero.badge1': 'Certified 18k gold',
      'hero.badge2': 'Insured delivery',
      'hero.badge3': 'In-store pickup',
      'collections.eyebrow': 'Collections',
      'collections.title': 'Five universes, one obsession with detail',
      'collections.text': 'From timeless solitaires to limited-edition watches. Every collection is born in our workshop and comes with a certificate of authenticity.',
      'collections.view': 'View collection',
      'collections.pieces': '{n} pieces',
      'cat.all': 'All',
      'cat.ring': 'Rings',
      'cat.necklace': 'Necklaces',
      'cat.earrings': 'Earrings',
      'cat.watch': 'Watches',
      'cat.set': 'Sets',
      'type.ring': 'Ring',
      'type.necklace': 'Necklace',
      'type.earrings': 'Earrings',
      'type.watch': 'Watch',
      'type.set': 'Set',
      'values.gold.title': 'Certified 18k gold',
      'values.gold.text': 'Every piece carries an official hallmark and certificate.',
      'values.diamond.title': 'Ethical diamonds',
      'values.diamond.text': 'Traceable, conflict-free gemstones.',
      'values.warranty.title': '2-year warranty',
      'values.warranty.text': 'Free check-ups and cleaning in store.',
      'values.engraving.title': 'Personal engraving',
      'values.engraving.text': 'Add initials or a special date at no cost.',
      'shop.eyebrow': 'Online shop',
      'shop.title': 'Selected pieces',
      'shop.text': 'Reserve online and collect at our boutique, or have it delivered home in gift packaging.',
      'shop.filterLabel': 'Filter by category',
      'shop.sort': 'Sort by',
      'shop.count': '{n} products',
      'sort.featured': 'Featured',
      'sort.priceAsc': 'Price: low to high',
      'sort.priceDesc': 'Price: high to low',
      'sort.name': 'Name (A-Z)',
      'product.add': 'Add to bag',
      'product.new': 'New',
      'product.limited': 'Limited edition',
      'product.lastUnits': 'Last {n} units',
      'mat.gold': '18k gold',
      'mat.rosegold': '18k rose gold',
      'mat.silver': 'Sterling silver',
      'mat.pearl': 'Cultured pearls',
      'mat.emerald': 'Silver and emerald',
      'mat.diamond': '18k gold and diamonds',
      'mat.steel': 'Steel and sapphire',
      'mat.leather': 'Steel and leather',
      'mat.mixed': 'Silver and rose gold',
      'atelier.eyebrow': 'Atelier',
      'atelier.title': 'Handmade high jewellery in Valencia',
      'atelier.text1': 'Since 1987 we have worked gold and gemstones the way our grandparents did: slowly, patiently and without shortcuts. Each jewel passes through more than twenty hands before reaching yours.',
      'atelier.text2': 'We offer bespoke design, restoration of family heirlooms and personal advice for gifts and engagements.',
      'atelier.imageAlt': 'Model wearing a set of gold jewellery',
      'atelier.quote': '“A well-made jewel is not worn: it is inherited.”',
      'atelier.quoteAuthor': 'Elena Aurèle, founder',
      'stats.years': 'years of craft',
      'stats.masters': 'master goldsmiths',
      'stats.pieces': 'unique pieces created',
      'services.title': 'Atelier services',
      'service.custom.title': 'Bespoke design',
      'service.custom.text': 'We create your jewel from a sketch.',
      'service.repair.title': 'Repair and cleaning',
      'service.repair.text': 'We bring the shine back to your pieces.',
      'service.appraisal.title': 'Appraisal',
      'service.appraisal.text': 'Certified valuation of jewellery and watches.',
      'service.gift.title': 'Gift packaging',
      'service.gift.text': 'Case and handwritten card included.',
      'contact.eyebrow': 'Contact',
      'contact.title': 'Visit us or write to us',
      'contact.text': 'We will see you with or without an appointment. We reply within 24 hours.',
      'contact.address.label': 'Boutique',
      'contact.phone.label': 'Phone',
      'contact.email.label': 'Email',
      'contact.hours.label': 'Opening hours',
      'contact.hours.value': 'Mon–Sat · 10:00–20:30',
      'form.name': 'Full name',
      'form.email': 'Email address',
      'form.phone': 'Phone',
      'form.subject': 'Subject',
      'form.subject.info': 'Information about a piece',
      'form.subject.custom': 'Bespoke design',
      'form.subject.order': 'My order status',
      'form.subject.other': 'Other',
      'form.message': 'Message',
      'form.consent': 'I agree to the processing of my data to answer my enquiry.',
      'form.send': 'Send message',
      'form.success': 'Thank you, {name}. We have received your message and will reply shortly.',
      'error.required': 'This field is required',
      'error.email': 'Enter a valid email',
      'error.phone': 'Enter a valid phone number',
      'error.postal': '5-digit postal code',
      'error.sunday': 'We are closed on Sundays, please choose another day',
      'error.date': 'Choose a future date',
      'error.consent': 'You must accept to continue',
      'footer.about': 'Luxury jewellery and accessories. Unique handmade pieces since 1987.',
      'footer.shop': 'Shop',
      'footer.info': 'Information',
      'footer.info1': 'Free shipping over €500',
      'footer.info2': '30-day returns',
      'footer.info3': 'Certificate of authenticity',
      'footer.info4': 'In-store pickup within 24 h',
      'footer.legal': 'Legal',
      'footer.cookies': 'Cookie policy',
      'footer.requirements': 'Purchase requirements',
      'footer.rights': 'All rights reserved.',
      'footer.credits': 'Sample images: Pexels. They will be replaced with the client’s photographs.',
      'search.title': 'Search the page',
      'search.placeholder': 'Type a word…',
      'search.hint': 'Type at least 2 letters',
      'search.results': '{n} matches',
      'search.none': 'No results for “{q}”',
      'search.clear': 'Clear highlighting',
      'search.footer': 'Footer',
      'cart.title': 'Your bag',
      'cart.empty': 'Your bag is empty',
      'cart.emptyText': 'Discover our pieces and add your favourites.',
      'cart.continue': 'Continue shopping',
      'cart.remove': 'Remove',
      'cart.increase': 'Increase quantity',
      'cart.decrease': 'Decrease quantity',
      'cart.freeShipping.missing': 'You are {amount} away from free shipping',
      'cart.freeShipping.done': 'You have unlocked free shipping!',
      'cart.promo.label': 'Promo code',
      'cart.promo.placeholder': 'E.g. BIENVENIDA10',
      'cart.promo.apply': 'Apply',
      'cart.promo.applied': 'Code {code} applied (−{percent}%)',
      'cart.promo.invalid': 'The code is not valid',
      'cart.promo.remove': 'Remove',
      'cart.subtotal': 'Subtotal',
      'cart.discount': 'Discount',
      'cart.shipping': 'Shipping',
      'cart.shipping.calc': 'Calculated when choosing delivery',
      'cart.total': 'Total',
      'cart.vatIncluded': 'VAT included',
      'cart.checkout': 'Checkout',
      'cart.clear': 'Empty bag',
      'cart.added': '{name} added to your bag',
      'cart.removed': '{name} removed from your bag',
      'cart.cleared': 'Bag emptied',
      'cart.stockLimit': 'Only {n} units of {name} left',
      'checkout.title': 'Checkout',
      'checkout.step.data': '1. Your details',
      'checkout.step.delivery': '2. Delivery',
      'checkout.step.payment': '3. Payment',
      'delivery.pickup.title': 'Collect at the boutique',
      'delivery.pickup.text': 'Free · Ready in 24 h',
      'delivery.ship.title': 'Home delivery',
      'delivery.ship.text': 'Insured delivery in 24-48 h',
      'pickup.store': 'Aurèle Boutique · Calle Colón, 24, Valencia',
      'pickup.date': 'Pickup day',
      'pickup.time': 'Time slot',
      'ship.address': 'Address',
      'ship.postal': 'Postal code',
      'ship.city': 'City',
      'ship.notes': 'Notes for the courier (optional)',
      'checkout.gift': 'Prepare as a gift (case and card, free of charge)',
      'payment.pickup.title': 'Pay on pickup',
      'payment.pickup.text': 'You pay at the boutique by card or cash.',
      'payment.delivery.title': 'Pay on delivery',
      'payment.delivery.text': 'You pay the courier when you receive your order.',
      'payment.online.title': 'Pay now online',
      'payment.online.text': 'Card, Bizum or Apple Pay on a secure gateway.',
      'checkout.summary': 'Order summary',
      'checkout.submit.reserve': 'Confirm reservation',
      'checkout.submit.order': 'Confirm order',
      'checkout.submit.online': 'Go to secure payment',
      'checkout.back': 'Back to bag',
      'checkout.free': 'Free',
      'gateway.title': 'Payment gateway',
      'gateway.text': 'Review what you are about to pay. When you continue, the secure payment gateway will open.',
      'gateway.order': 'Order',
      'gateway.amount': 'Amount to pay',
      'gateway.slot': 'The market’s payment gateway will load here.',
      'gateway.pay': 'Continue to payment',
      'gateway.back': 'Back',
      'gateway.pending': 'Payment gateway pending integration',
      'confirm.title': 'Thank you for your purchase!',
      'confirm.order': 'Order {id}',
      'confirm.pickupPay': 'Your reservation is saved. We will see you on {date} at {time} at the boutique. You will pay {total} on pickup.',
      'confirm.pickupPaid': 'We have received your payment of {total}. We will see you on {date} at {time} at the boutique to collect your order.',
      'confirm.shipPay': 'We will send your order to {address}. You will pay {total} on delivery.',
      'confirm.shipPaid': 'We have received your payment of {total}. We will send your order to {address}.',
      'confirm.email': 'You will receive a summary at {email}.',
      'confirm.close': 'Keep exploring',
      'cookies.text': 'We use technical cookies to remember your bag, language and theme. You can read our policy.',
      'cookies.accept': 'Accept',
      'cookies.reject': 'Necessary only',
      'cookies.more': 'More information',
      'theme.toLight': 'Switch to light mode',
      'theme.toDark': 'Switch to dark mode',
      'login.pending': 'Customer sign-in will be available soon',
      'legal.cookies.title': 'Cookie policy',
      'legal.cookies.body': 'We only use technical cookies required for the website to work: remembering the contents of your bag, your language and the light or dark theme.\nWe do not use advertising or third-party tracking cookies.\nYou can delete this data at any time from your browser settings.',
      'legal.requirements.title': 'Purchase requirements',
      'legal.requirements.body': 'You must be over 18 to purchase.\nPieces are reserved for 48 hours after order confirmation.\nTo collect in store you must show ID or passport and your order number.\nYou may return any unworn piece within 30 days, with its case and certificate.\nAll jewellery includes a 2-year warranty and a certificate of authenticity.\nPrices include VAT. Shipping is free over €500.'
    },

    va: {
      'meta.title': 'Aurèle · Joieria i complements de luxe',
      'a11y.skip': 'Anar al contingut',
      'a11y.mainNav': 'Navegació principal',
      'a11y.language': 'Idioma',
      'a11y.search': 'Cercar a la pàgina',
      'a11y.login': 'Accedir al meu compte',
      'a11y.cart': 'Obrir la cistella de la compra',
      'a11y.menuOpen': 'Obrir el menú',
      'a11y.menuClose': 'Tancar el menú',
      'a11y.close': 'Tancar',
      'a11y.top': 'Tornar amunt',
      'topbar.shipping': 'Enviament gratuït des de 500 €',
      'logo.tagline': 'Joieria i complements',
      'nav.home': 'Inici',
      'nav.collections': 'Col·leccions',
      'nav.shop': 'Botiga',
      'nav.atelier': 'Atelier',
      'nav.contact': 'Contacte',
      'mobile.search': 'Cercar a la pàgina',
      'hero.eyebrow': 'Joieria d’autor · València, des de 1987',
      'hero.title': 'L’art de brillar amb elegància',
      'hero.text': 'Peces úniques d’or, diamants i perles, creades per mestres orfebres per a acompanyar-te en els moments que importen.',
      'hero.ctaShop': 'Descobrir la botiga',
      'hero.ctaAtelier': 'El nostre atelier',
      'hero.badge1': 'Or de 18 k certificat',
      'hero.badge2': 'Enviament assegurat',
      'hero.badge3': 'Recollida a la botiga',
      'collections.eyebrow': 'Col·leccions',
      'collections.title': 'Cinc universos, una mateixa obsessió pel detall',
      'collections.text': 'Des de solitaris atemporals fins a rellotges d’edició limitada. Cada col·lecció naix al nostre taller i s’entrega amb certificat d’autenticitat.',
      'collections.view': 'Veure col·lecció',
      'collections.pieces': '{n} peces',
      'cat.all': 'Tot',
      'cat.ring': 'Anells',
      'cat.necklace': 'Collarets',
      'cat.earrings': 'Arracades',
      'cat.watch': 'Rellotges',
      'cat.set': 'Conjunts',
      'type.ring': 'Anell',
      'type.necklace': 'Collaret',
      'type.earrings': 'Arracades',
      'type.watch': 'Rellotge',
      'type.set': 'Conjunt',
      'values.gold.title': 'Or de 18 k certificat',
      'values.gold.text': 'Cada peça porta contrast oficial i certificat.',
      'values.diamond.title': 'Diamants ètics',
      'values.diamond.text': 'Gemmes traçables, lliures de conflicte.',
      'values.warranty.title': 'Garantia de 2 anys',
      'values.warranty.text': 'Revisió i neteja gratuïtes a la botiga.',
      'values.engraving.title': 'Gravat personal',
      'values.engraving.text': 'Afig inicials o una data especial sense cost.',
      'shop.eyebrow': 'Botiga en línia',
      'shop.title': 'Peces seleccionades',
      'shop.text': 'Reserva en línia i recull a la nostra botiga o rep-la a casa en un embalatge de regal.',
      'shop.filterLabel': 'Filtrar per categoria',
      'shop.sort': 'Ordena per',
      'shop.count': '{n} productes',
      'sort.featured': 'Destacats',
      'sort.priceAsc': 'Preu: de menys a més',
      'sort.priceDesc': 'Preu: de més a menys',
      'sort.name': 'Nom (A-Z)',
      'product.add': 'Afegir a la cistella',
      'product.new': 'Novetat',
      'product.limited': 'Edició limitada',
      'product.lastUnits': 'Últimes {n} unitats',
      'mat.gold': 'Or de 18 k',
      'mat.rosegold': 'Or rosa de 18 k',
      'mat.silver': 'Plata de llei',
      'mat.pearl': 'Perles cultivades',
      'mat.emerald': 'Plata i maragda',
      'mat.diamond': 'Or de 18 k i diamants',
      'mat.steel': 'Acer i safir',
      'mat.leather': 'Acer i pell',
      'mat.mixed': 'Plata i or rosa',
      'atelier.eyebrow': 'Atelier',
      'atelier.title': 'Alta joieria feta a mà a València',
      'atelier.text1': 'Des de 1987 treballem l’or i les gemmes com ho feien els nostres avis: a poc a poc, amb paciència i sense dreceres. Cada joia passa per més de vint mans abans d’arribar a les teues.',
      'atelier.text2': 'Oferim disseny a mida, restauració de peces familiars i assessorament personalitzat per a regals i compromisos.',
      'atelier.imageAlt': 'Model lluint un conjunt de joies d’or',
      'atelier.quote': '«Una joia ben feta no es porta: s’hereta.»',
      'atelier.quoteAuthor': 'Elena Aurèle, fundadora',
      'stats.years': 'anys d’ofici',
      'stats.masters': 'mestres orfebres',
      'stats.pieces': 'peces úniques creades',
      'services.title': 'Serveis de l’atelier',
      'service.custom.title': 'Disseny a mida',
      'service.custom.text': 'Creem la teua joia a partir d’un esbós.',
      'service.repair.title': 'Reparació i neteja',
      'service.repair.text': 'Tornem la brillantor a les teues peces.',
      'service.appraisal.title': 'Taxació',
      'service.appraisal.text': 'Valoració certificada de joies i rellotges.',
      'service.gift.title': 'Embalatge de regal',
      'service.gift.text': 'Estoig i targeta manuscrita inclosos.',
      'contact.eyebrow': 'Contacte',
      'contact.title': 'Visita’ns o escriu-nos',
      'contact.text': 'T’atendrem amb cita prèvia o sense. Responem en menys de 24 hores.',
      'contact.address.label': 'Botiga',
      'contact.phone.label': 'Telèfon',
      'contact.email.label': 'Correu',
      'contact.hours.label': 'Horari',
      'contact.hours.value': 'Dill–Dis · 10:00–20:30',
      'form.name': 'Nom i cognoms',
      'form.email': 'Correu electrònic',
      'form.phone': 'Telèfon',
      'form.subject': 'Assumpte',
      'form.subject.info': 'Informació sobre una peça',
      'form.subject.custom': 'Disseny a mida',
      'form.subject.order': 'Estat de la meua comanda',
      'form.subject.other': 'Altres',
      'form.message': 'Missatge',
      'form.consent': 'Accepte el tractament de les meues dades per a respondre a la meua consulta.',
      'form.send': 'Enviar missatge',
      'form.success': 'Gràcies, {name}. Hem rebut el teu missatge i et respondrem aviat.',
      'error.required': 'Aquest camp és obligatori',
      'error.email': 'Introdueix un correu vàlid',
      'error.phone': 'Introdueix un telèfon vàlid',
      'error.postal': 'Codi postal de 5 dígits',
      'error.sunday': 'Tanquem els diumenges, tria un altre dia',
      'error.date': 'Tria una data futura',
      'error.consent': 'Has d’acceptar per a continuar',
      'footer.about': 'Joieria i complements de luxe. Peces úniques fetes a mà des de 1987.',
      'footer.shop': 'Botiga',
      'footer.info': 'Informació',
      'footer.info1': 'Enviament gratuït des de 500 €',
      'footer.info2': 'Devolucions en 30 dies',
      'footer.info3': 'Certificat d’autenticitat',
      'footer.info4': 'Recollida a la botiga en 24 h',
      'footer.legal': 'Legal',
      'footer.cookies': 'Política de galetes',
      'footer.requirements': 'Requisits de compra',
      'footer.rights': 'Tots els drets reservats.',
      'footer.credits': 'Imatges de mostra: Pexels. Seran substituïdes per fotografies del client.',
      'search.title': 'Cercar a la pàgina',
      'search.placeholder': 'Escriu una paraula…',
      'search.hint': 'Escriu almenys 2 lletres',
      'search.results': '{n} coincidències',
      'search.none': 'Sense resultats per a «{q}»',
      'search.clear': 'Llevar el ressaltat',
      'search.footer': 'Peu de pàgina',
      'cart.title': 'La teua cistella',
      'cart.empty': 'La teua cistella està buida',
      'cart.emptyText': 'Descobreix les nostres peces i afig-hi les teues preferides.',
      'cart.continue': 'Continuar comprant',
      'cart.remove': 'Eliminar',
      'cart.increase': 'Augmentar la quantitat',
      'cart.decrease': 'Reduir la quantitat',
      'cart.freeShipping.missing': 'Et falten {amount} per a l’enviament gratuït',
      'cart.freeShipping.done': 'Enviament gratuït aconseguit!',
      'cart.promo.label': 'Codi promocional',
      'cart.promo.placeholder': 'Ex. BIENVENIDA10',
      'cart.promo.apply': 'Aplicar',
      'cart.promo.applied': 'Codi {code} aplicat (−{percent}%)',
      'cart.promo.invalid': 'El codi no és vàlid',
      'cart.promo.remove': 'Llevar',
      'cart.subtotal': 'Subtotal',
      'cart.discount': 'Descompte',
      'cart.shipping': 'Enviament',
      'cart.shipping.calc': 'Es calcula en triar el lliurament',
      'cart.total': 'Total',
      'cart.vatIncluded': 'IVA inclòs',
      'cart.checkout': 'Finalitzar la compra',
      'cart.clear': 'Buidar la cistella',
      'cart.added': '{name} afegit a la cistella',
      'cart.removed': '{name} eliminat de la cistella',
      'cart.cleared': 'Cistella buidada',
      'cart.stockLimit': 'Només queden {n} unitats de {name}',
      'checkout.title': 'Finalitzar la compra',
      'checkout.step.data': '1. Les teues dades',
      'checkout.step.delivery': '2. Lliurament',
      'checkout.step.payment': '3. Pagament',
      'delivery.pickup.title': 'Recollir a la botiga',
      'delivery.pickup.text': 'Gratis · Preparat en 24 h',
      'delivery.ship.title': 'Enviament a domicili',
      'delivery.ship.text': 'Lliurament assegurat en 24-48 h',
      'pickup.store': 'Botiga Aurèle · Carrer Colón, 24, València',
      'pickup.date': 'Dia de recollida',
      'pickup.time': 'Franja horària',
      'ship.address': 'Adreça',
      'ship.postal': 'Codi postal',
      'ship.city': 'Ciutat',
      'ship.notes': 'Indicacions per al repartidor (opcional)',
      'checkout.gift': 'Preparar com a regal (estoig i targeta, sense cost)',
      'payment.pickup.title': 'Pagar en recollir',
      'payment.pickup.text': 'Abones a la botiga amb targeta o efectiu.',
      'payment.delivery.title': 'Pagar en el lliurament',
      'payment.delivery.text': 'Pagues al repartidor en rebre la comanda.',
      'payment.online.title': 'Pagar ara en línia',
      'payment.online.text': 'Targeta, Bizum o Apple Pay en una passarel·la segura.',
      'checkout.summary': 'Resum de la comanda',
      'checkout.submit.reserve': 'Confirmar reserva',
      'checkout.submit.order': 'Confirmar comanda',
      'checkout.submit.online': 'Anar al pagament segur',
      'checkout.back': 'Tornar a la cistella',
      'checkout.free': 'Gratis',
      'gateway.title': 'Passarel·la de pagament',
      'gateway.text': 'Revisa el que vas a pagar. En continuar s’obrirà la passarel·la de pagament segura.',
      'gateway.order': 'Comanda',
      'gateway.amount': 'Import a pagar',
      'gateway.slot': 'Ací es carregarà la passarel·la de pagament del mercat.',
      'gateway.pay': 'Continuar al pagament',
      'gateway.back': 'Tornar',
      'gateway.pending': 'Passarel·la de pagament pendent d’integració',
      'confirm.title': 'Gràcies per la teua compra!',
      'confirm.order': 'Comanda {id}',
      'confirm.pickupPay': 'La teua reserva està guardada. T’esperem el {date} a les {time} a la botiga. Pagaràs {total} en recollir-la.',
      'confirm.pickupPaid': 'Hem rebut el teu pagament de {total}. T’esperem el {date} a les {time} a la botiga per a recollir la comanda.',
      'confirm.shipPay': 'Enviarem la comanda a {address}. Pagaràs {total} en rebre-la.',
      'confirm.shipPaid': 'Hem rebut el teu pagament de {total}. Enviarem la comanda a {address}.',
      'confirm.email': 'Rebràs un resum a {email}.',
      'confirm.close': 'Continuar explorant',
      'cookies.text': 'Usem galetes tècniques per a recordar la cistella, l’idioma i el tema. Pots llegir la nostra política.',
      'cookies.accept': 'Acceptar',
      'cookies.reject': 'Només les necessàries',
      'cookies.more': 'Més informació',
      'theme.toLight': 'Canviar a mode clar',
      'theme.toDark': 'Canviar a mode fosc',
      'login.pending': 'L’accés de clients estarà disponible aviat',
      'legal.cookies.title': 'Política de galetes',
      'legal.cookies.body': 'Utilitzem únicament galetes tècniques necessàries per al funcionament del web: recordar el contingut de la cistella, l’idioma i el tema clar o fosc.\nNo emprem galetes publicitàries ni de seguiment de tercers.\nPots esborrar aquestes dades en qualsevol moment des de la configuració del navegador.',
      'legal.requirements.title': 'Requisits de compra',
      'legal.requirements.body': 'Per a comprar has de ser major de 18 anys.\nLes peces es reserven 48 hores des de la confirmació de la comanda.\nPer a recollir a la botiga cal presentar el DNI o el passaport i el número de comanda.\nPots tornar qualsevol peça sense usar en 30 dies, amb l’estoig i el certificat.\nTotes les joies inclouen 2 anys de garantia i certificat d’autenticitat.\nEls preus inclouen IVA. L’enviament és gratuït des de 500 €.'
    }
  };

  /* 3. CATÁLOGO DE PRODUCTOS --------------------------------------------- */
  /* El orden del array es el orden "Destacados". Las imágenes provienen de
     Pexels y serán sustituidas por las del cliente (solo hay que cambiar
     la propiedad "image"). */
  const products = [
    { id: 'aurora',        name: 'Aurora',          category: 'ring',      material: 'rosegold', price: 1290, stock: 4,  badge: 'new',     image: { id: 8306529,  ext: 'jpeg' } },
    { id: 'helios',        name: 'Helios',          category: 'necklace',  material: 'gold',     price: 640,  stock: 8,  badge: 'new',     image: { id: 13325937, ext: 'jpeg' } },
    { id: 'perla-clasica', name: 'Perla Clásica',   category: 'earrings',  material: 'pearl',    price: 420,  stock: 10, badge: null,      image: { id: 33370247, ext: 'jpeg' } },
    { id: 'chrono-noir',   name: 'Chrono Noir',     category: 'watch',     material: 'leather',  price: 2950, stock: 4,  badge: 'limited', image: { id: 28977357, ext: 'jpeg' } },
    { id: 'conjunto-aurele', name: 'Conjunto Aurèle', category: 'set',     material: 'pearl',    price: 3600, stock: 2,  badge: 'limited', image: { id: 6716445,  ext: 'jpeg' } },
    { id: 'celeste',       name: 'Celeste',         category: 'ring',      material: 'diamond',  price: 1850, stock: 3,  badge: null,      image: { id: 10976653, ext: 'jpeg' } },
    { id: 'perla-dorada',  name: 'Perla Dorada',    category: 'necklace',  material: 'pearl',    price: 520,  stock: 7,  badge: null,      image: { id: 28985983, ext: 'jpeg' } },
    { id: 'gran-perla',    name: 'Gran Perla',      category: 'earrings',  material: 'pearl',    price: 560,  stock: 6,  badge: null,      image: { id: 18285649, ext: 'jpeg' } },
    { id: 'argent',        name: 'Argent',          category: 'watch',     material: 'steel',    price: 3400, stock: 3,  badge: null,      image: { id: 9261531,  ext: 'jpeg' } },
    { id: 'nocturne',      name: 'Nocturne',        category: 'ring',      material: 'diamond',  price: 2400, stock: 2,  badge: 'limited', image: { id: 19703087, ext: 'jpeg' } },
    { id: 'esmeralda',     name: 'Esmeralda',       category: 'necklace',  material: 'emerald',  price: 1450, stock: 3,  badge: null,      image: { id: 21235148, ext: 'jpeg' } },
    { id: 'cascada',       name: 'Cascada',         category: 'earrings',  material: 'gold',     price: 690,  stock: 5,  badge: 'new',     image: { id: 18285658, ext: 'jpeg' } },
    { id: 'onyx',          name: 'Onyx',            category: 'watch',     material: 'steel',    price: 3150, stock: 4,  badge: 'new',     image: { id: 8839887,  ext: 'jpeg' } },
    { id: 'rosalia',       name: 'Rosalía',         category: 'ring',      material: 'rosegold', price: 980,  stock: 6,  badge: null,      image: { id: 28985981, ext: 'jpeg' } },
    { id: 'gota-de-oro',   name: 'Gota de Oro',     category: 'necklace',  material: 'diamond',  price: 2150, stock: 2,  badge: 'limited', image: { id: 7407595,  ext: 'png'  } },
    { id: 'aro-perlado',   name: 'Aro Perlado',     category: 'earrings',  material: 'pearl',    price: 380,  stock: 9,  badge: null,      image: { id: 7960025,  ext: 'jpeg' } },
    { id: 'meridian',      name: 'Meridian',        category: 'watch',     material: 'steel',    price: 2780, stock: 5,  badge: null,      image: { id: 16958879, ext: 'jpeg' } },
    { id: 'lumiere',       name: 'Lumière',         category: 'ring',      material: 'mixed',    price: 1120, stock: 5,  badge: null,      image: { id: 8891957,  ext: 'jpeg' } },
    { id: 'medallon',      name: 'Medallón',        category: 'necklace',  material: 'gold',     price: 780,  stock: 5,  badge: null,      image: { id: 7407597,  ext: 'png'  } },
    { id: 'conjunto-perla-rosa', name: 'Conjunto Perla Rosa', category: 'set', material: 'silver', price: 2900, stock: 3, badge: null,     image: { id: 6716444,  ext: 'jpeg' } }
  ];

  /* 4. ESTADO Y UTILIDADES ------------------------------------------------ */
  const state = {
    language: CONFIG.defaultLanguage,
    filter: 'all',
    sort: 'featured',
    cart: [],             // [{ id, qty }]
    promoCode: null,
    promoError: false,
    pendingOrder: null,   // pedido a la espera del pago online
    legalTopic: null
  };

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

  /* Acceso seguro a localStorage (puede fallar en modo privado) */
  const storage = {
    read(key, fallback) {
      try {
        const raw = localStorage.getItem(key);
        return raw === null ? fallback : JSON.parse(raw);
      } catch (error) {
        return fallback;
      }
    },
    write(key, value) {
      try {
        localStorage.setItem(key, JSON.stringify(value));
      } catch (error) {
        /* Sin almacenamiento disponible: la página sigue funcionando sin persistencia */
      }
    }
  };

  /* Devuelve el texto traducido sustituyendo variables {nombre} */
  function t(key, params = {}) {
    const text = translations[state.language][key] ?? translations.es[key] ?? key;
    return text.replace(/\{(\w+)\}/g, (match, name) => (name in params ? params[name] : match));
  }

  const currencyFormatters = {};
  function formatPrice(amount) {
    const locale = CONFIG.locales[state.language];
    const digits = Number.isInteger(amount) ? 0 : 2;
    const cacheKey = `${locale}-${digits}`;
    currencyFormatters[cacheKey] ??= new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: digits,
      maximumFractionDigits: digits,
      useGrouping: 'always'
    });
    return currencyFormatters[cacheKey].format(amount);
  }

  const roundMoney = (value) => Math.round(value * 100) / 100;
  const getProduct = (id) => products.find((product) => product.id === id);

  function getProductImageUrl(product, width = 700, height = 875) {
    const { id, ext } = product.image;
    return `https://images.pexels.com/photos/${id}/pexels-photo-${id}.${ext}?auto=compress&cs=tinysrgb&fit=crop&w=${width}&h=${height}`;
  }

  /* Referencias a elementos del DOM usados con frecuencia */
  const dom = {
    header: $('#site-header'),
    navbar: $('#navbar'),
    menuToggle: $('#menu-toggle'),
    mobileMenu: $('#mobile-menu'),
    themeToggle: $('#theme-toggle'),
    backToTop: $('#back-to-top'),
    productGrid: $('#product-grid'),
    shopCount: $('#shop-count'),
    sortSelect: $('#sort-select'),
    toastRegion: $('#toast-region'),
    cartCount: $('#cart-count'),
    cartDrawer: $('.drawer'),
    cartItems: $('#cart-items'),
    checkoutForm: $('#checkout-form'),
    contactForm: $('#contact-form')
  };

  /* 5. IDIOMA ------------------------------------------------------------- */
  function applyLanguage(language) {
    if (!translations[language]) return;
    state.language = language;
    storage.write(CONFIG.storageKeys.language, language);

    document.documentElement.lang = CONFIG.htmlLang[language];
    document.title = t('meta.title');

    $$('[data-i18n]').forEach((el) => { el.textContent = t(el.dataset.i18n); });
    $$('[data-i18n-placeholder]').forEach((el) => { el.placeholder = t(el.dataset.i18nPlaceholder); });
    $$('[data-i18n-aria]').forEach((el) => { el.setAttribute('aria-label', t(el.dataset.i18nAria)); });
    $$('[data-i18n-alt]').forEach((el) => { el.alt = t(el.dataset.i18nAlt); });
    $$('[data-lang]').forEach((button) => {
      button.setAttribute('aria-pressed', String(button.dataset.lang === language));
    });

    refreshDynamicLabels();
    renderCategoryCounts();
    renderProducts();
    renderCart();
    renderCheckoutSummary();
    if (state.legalTopic) renderLegal();
    resetSearch();
  }

  /* Etiquetas que dependen del estado (tema, menú) además del idioma */
  function refreshDynamicLabels() {
    const isDark = document.body.classList.contains('theme-dark');
    dom.themeToggle.setAttribute('aria-label', t(isDark ? 'theme.toLight' : 'theme.toDark'));
    const menuOpen = dom.mobileMenu.classList.contains('is-open');
    dom.menuToggle.setAttribute('aria-label', t(menuOpen ? 'a11y.menuClose' : 'a11y.menuOpen'));
  }

  function initLanguage() {
    const stored = storage.read(CONFIG.storageKeys.language, null);
    const browserCode = navigator.language?.slice(0, 2);
    const browser = browserCode === 'ca' ? 'va' : browserCode; // el catalán se muestra como valenciano
    const initial = translations[stored] ? stored : (translations[browser] ? browser : CONFIG.defaultLanguage);

    $$('[data-lang]').forEach((button) => {
      button.addEventListener('click', () => applyLanguage(button.dataset.lang));
    });
    applyLanguage(initial);
  }

  /* 6. TEMA CLARO / OSCURO ------------------------------------------------ */
  function applyTheme(theme) {
    document.body.classList.remove('theme-light', 'theme-dark');
    document.body.classList.add(`theme-${theme}`);
    storage.write(CONFIG.storageKeys.theme, theme);
    refreshDynamicLabels();
  }

  function initTheme() {
    const stored = storage.read(CONFIG.storageKeys.theme, null);
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    applyTheme(stored ?? (prefersDark ? 'dark' : 'light'));

    dom.themeToggle.addEventListener('click', () => {
      applyTheme(document.body.classList.contains('theme-dark') ? 'light' : 'dark');
    });
  }

  /* 7. CABECERA, SCROLL Y RESIZE ------------------------------------------ */
  const sections = $$('main > section[id]');
  const navLinks = $$('[data-nav-link]');
  let scrollTicking = false;
  let lastViewportWidth = window.innerWidth;

  /* Marca el enlace del menú correspondiente a la sección visible */
  function updateActiveNavLink() {
    const probe = dom.navbar.offsetHeight + window.innerHeight * 0.25;
    let currentId = sections[0].id;
    sections.forEach((section) => {
      if (section.getBoundingClientRect().top <= probe) currentId = section.id;
    });
    navLinks.forEach((link) => {
      const isActive = link.getAttribute('href') === `#${currentId}`;
      link.classList.toggle('is-active', isActive);
      if (isActive) link.setAttribute('aria-current', 'true');
      else link.removeAttribute('aria-current');
    });
  }

  function updateScrollUI() {
    const scrollY = window.scrollY;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;

    document.body.classList.toggle('is-scrolled', scrollY > CONFIG.scrollThreshold);
    dom.backToTop.classList.toggle('is-visible', scrollY > CONFIG.backToTopThreshold);
    dom.header.style.setProperty('--scroll-progress', maxScroll > 0 ? (scrollY / maxScroll).toFixed(4) : '0');
    updateActiveNavLink();
  }

  /* Throttle con requestAnimationFrame para no saturar el hilo principal */
  function onScroll() {
    if (scrollTicking) return;
    scrollTicking = true;
    window.requestAnimationFrame(() => {
      updateScrollUI();
      scrollTicking = false;
    });
  }

  function onResize() {
    // Solo si cambia el ancho (en móviles la barra del navegador dispara resize al hacer scroll)
    if (window.innerWidth === lastViewportWidth) return;
    lastViewportWidth = window.innerWidth;
    setMobileMenu(false);
    updateScrollUI();
  }

  /* Scroll suave hacia una sección compensando la cabecera fija */
  function scrollToSection(id) {
    const target = document.getElementById(id);
    if (!target) return;
    const offset = id === 'inicio' ? 0 : dom.navbar.offsetHeight;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top: Math.max(top, 0), behavior: 'smooth' });
  }

  function initScrollAndResize() {
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    dom.backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

    // Enlaces internos con scroll suave (delegación de eventos)
    document.addEventListener('click', (event) => {
      const link = event.target.closest('a[href^="#"]');
      if (!link || link.getAttribute('href') === '#') return;
      event.preventDefault();
      setMobileMenu(false);
      if (link.dataset.filterLink) setFilter(link.dataset.filterLink);
      scrollToSection(link.getAttribute('href').slice(1));
    });

    updateScrollUI();
  }

  /* 8. MENÚ HAMBURGUESA --------------------------------------------------- */
  function setMobileMenu(open) {
    dom.mobileMenu.classList.toggle('is-open', open);
    dom.menuToggle.classList.toggle('is-active', open);
    dom.menuToggle.setAttribute('aria-expanded', String(open));
    dom.mobileMenu.setAttribute('aria-hidden', String(!open));
    document.body.classList.toggle('menu-open', open);
    refreshDynamicLabels();
  }

  function initMobileMenu() {
    dom.menuToggle.addEventListener('click', () => {
      setMobileMenu(!dom.mobileMenu.classList.contains('is-open'));
    });
    // Clic fuera del panel (sobre el fondo difuminado) cierra el menú
    dom.mobileMenu.addEventListener('click', (event) => {
      if (event.target === dom.mobileMenu) setMobileMenu(false);
    });
  }

  /* 9. OVERLAYS Y AVISOS -------------------------------------------------- */
  const overlayStack = [];
  const returnFocusMap = new WeakMap();
  const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

  function openOverlay(id) {
    const overlay = document.getElementById(id);
    if (!overlay || overlay.classList.contains('is-open')) return;

    setMobileMenu(false);
    returnFocusMap.set(overlay, document.activeElement);
    overlay.classList.add('is-open');
    overlay.setAttribute('aria-hidden', 'false');
    overlayStack.push(overlay);
    document.body.classList.add('overlay-open');

    const focusTarget = $('[data-autofocus]', overlay) ?? $('.modal, .drawer', overlay);
    focusTarget?.focus({ preventScroll: true });
  }

  function closeOverlay(id) {
    const overlay = document.getElementById(id);
    if (!overlay || !overlay.classList.contains('is-open')) return;

    overlay.classList.remove('is-open');
    overlay.setAttribute('aria-hidden', 'true');
    overlayStack.splice(overlayStack.indexOf(overlay), 1);
    if (!overlayStack.length) document.body.classList.remove('overlay-open');
    returnFocusMap.get(overlay)?.focus?.({ preventScroll: true });
  }

  /* Cierra el overlay y abre otro sin devolver el foco a la página */
  function switchOverlay(fromId, toId) {
    closeOverlay(fromId);
    openOverlay(toId);
  }

  function initOverlays() {
    document.addEventListener('click', (event) => {
      const opener = event.target.closest('[data-open-overlay]');
      if (opener) {
        openOverlay(opener.dataset.openOverlay);
        return;
      }
      const closer = event.target.closest('[data-close-overlay]');
      if (closer) {
        const overlay = closer.closest('.overlay');
        if (overlay) closeOverlay(overlay.id);
        return;
      }
      // Clic sobre el fondo difuminado
      if (event.target.classList.contains('overlay')) closeOverlay(event.target.id);
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        if (overlayStack.length) closeOverlay(overlayStack[overlayStack.length - 1].id);
        else if (dom.mobileMenu.classList.contains('is-open')) setMobileMenu(false);
        return;
      }
      // Mantiene el foco dentro del overlay activo
      if (event.key === 'Tab' && overlayStack.length) {
        const overlay = overlayStack[overlayStack.length - 1];
        const focusable = $$(FOCUSABLE, overlay).filter((el) => el.offsetParent !== null);
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    });
  }

  function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    dom.toastRegion.append(toast);
    window.requestAnimationFrame(() => toast.classList.add('is-visible'));
    window.setTimeout(() => {
      toast.classList.remove('is-visible');
      window.setTimeout(() => toast.remove(), 400);
    }, 3200);
  }

  /* 10. TIENDA ------------------------------------------------------------ */
  function getVisibleProducts() {
    const list = state.filter === 'all'
      ? [...products]
      : products.filter((product) => product.category === state.filter);

    switch (state.sort) {
      case 'priceAsc': return list.sort((a, b) => a.price - b.price);
      case 'priceDesc': return list.sort((a, b) => b.price - a.price);
      case 'name': return list.sort((a, b) => a.name.localeCompare(b.name, CONFIG.locales[state.language]));
      default: return list;
    }
  }

  function createProductCardMarkup(product, index) {
    const badge = product.badge
      ? `<span class="product-card__badge product-card__badge--${product.badge}">${t(`product.${product.badge}`)}</span>`
      : '';
    const stockNote = product.stock <= 3
      ? `<p class="product-card__stock">${t('product.lastUnits', { n: product.stock })}</p>`
      : '';
    const typeLabel = t(`type.${product.category}`);

    return `
      <article class="product-card reveal" style="--reveal-delay:${(index % 4) * 80}ms">
        <div class="product-card__media">
          <img src="${getProductImageUrl(product)}" alt="${product.name} · ${typeLabel}" width="700" height="875" loading="lazy">
          ${badge}
        </div>
        <div class="product-card__body">
          <h3>${product.name}</h3>
          <p class="product-card__meta">${typeLabel} · ${t(`mat.${product.material}`)}</p>
          <p class="product-card__price">${formatPrice(product.price)}</p>
          ${stockNote}
          <button type="button" class="btn btn--ghost btn--small" data-add-to-cart="${product.id}">${t('product.add')}</button>
        </div>
      </article>`;
  }

  function renderProducts() {
    resetSearch(); // las marcas del buscador desaparecen al redibujar la cuadrícula
    const visible = getVisibleProducts();
    dom.productGrid.innerHTML = visible.map(createProductCardMarkup).join('');
    dom.shopCount.textContent = t('shop.count', { n: visible.length });

    $$('[data-filter]').forEach((chip) => {
      const isActive = chip.dataset.filter === state.filter;
      chip.classList.toggle('is-active', isActive);
      chip.setAttribute('aria-pressed', String(isActive));
    });
    dom.sortSelect.value = state.sort;
    observeRevealElements(dom.productGrid);
  }

  function renderCategoryCounts() {
    $$('[data-category-count]').forEach((el) => {
      const count = products.filter((product) => product.category === el.dataset.categoryCount).length;
      el.textContent = t('collections.pieces', { n: count });
    });
  }

  function setFilter(category) {
    state.filter = category;
    renderProducts();
  }

  function initShop() {
    $$('[data-filter]').forEach((chip) => {
      chip.addEventListener('click', () => setFilter(chip.dataset.filter));
    });
    dom.sortSelect.addEventListener('change', () => {
      state.sort = dom.sortSelect.value;
      renderProducts();
    });
    dom.productGrid.addEventListener('click', (event) => {
      const button = event.target.closest('[data-add-to-cart]');
      if (button) addToCart(button.dataset.addToCart);
    });
  }

  /* 11. CARRITO DE COMPRA ------------------------------------------------- */
  function persistCart() {
    storage.write(CONFIG.storageKeys.cart, { items: state.cart, promo: state.promoCode });
  }

  /* Recupera el carrito guardado validando productos y stock */
  function loadCart() {
    const saved = storage.read(CONFIG.storageKeys.cart, { items: [], promo: null });
    state.cart = (saved.items ?? [])
      .filter((line) => getProduct(line.id) && Number.isInteger(line.qty) && line.qty > 0)
      .map((line) => ({ id: line.id, qty: Math.min(line.qty, getProduct(line.id).stock) }));
    state.promoCode = CONFIG.promoCodes[saved.promo] ? saved.promo : null;
  }

  function addToCart(productId, quantity = 1) {
    const product = getProduct(productId);
    if (!product) return;
    const line = state.cart.find((item) => item.id === productId);
    const currentQty = line ? line.qty : 0;

    if (currentQty + quantity > product.stock) {
      showToast(t('cart.stockLimit', { n: product.stock, name: product.name }));
      return;
    }
    if (line) line.qty += quantity;
    else state.cart.push({ id: productId, qty: quantity });

    persistCart();
    renderCart();
    bumpCartBadge();
    showToast(t('cart.added', { name: product.name }));
  }

  function changeQuantity(productId, delta) {
    const line = state.cart.find((item) => item.id === productId);
    const product = getProduct(productId);
    if (!line || !product) return;

    const newQty = line.qty + delta;
    if (newQty <= 0) {
      removeFromCart(productId);
      return;
    }
    if (newQty > product.stock) {
      showToast(t('cart.stockLimit', { n: product.stock, name: product.name }));
      return;
    }
    line.qty = newQty;
    persistCart();
    renderCart();
  }

  function removeFromCart(productId) {
    const product = getProduct(productId);
    state.cart = state.cart.filter((item) => item.id !== productId);
    persistCart();
    renderCart();
    if (product) showToast(t('cart.removed', { name: product.name }));
  }

  function clearCart() {
    state.cart = [];
    state.promoCode = null;
    state.promoError = false;
    persistCart();
    renderCart();
  }

  function bumpCartBadge() {
    dom.cartCount.classList.remove('is-bumped');
    void dom.cartCount.offsetWidth; // reinicia la animación
    dom.cartCount.classList.add('is-bumped');
  }

  /* Calcula importes. El envío solo se cobra en la entrega a domicilio
     y es gratuito al superar el umbral (tras aplicar el descuento). */
  function calculateTotals(deliveryMethod = null) {
    const subtotal = roundMoney(state.cart.reduce((sum, line) => sum + getProduct(line.id).price * line.qty, 0));
    const discountRate = state.promoCode ? CONFIG.promoCodes[state.promoCode] : 0;
    const discount = roundMoney(subtotal * discountRate);
    const discounted = roundMoney(subtotal - discount);
    const chargesShipping = deliveryMethod === 'shipping' && discounted > 0 && discounted < CONFIG.freeShippingThreshold;
    const shipping = chargesShipping ? CONFIG.shippingCost : 0;
    const total = roundMoney(discounted + shipping);
    const vat = roundMoney(total - total / (1 + CONFIG.vatRate));
    const missingForFreeShipping = Math.max(0, roundMoney(CONFIG.freeShippingThreshold - discounted));
    const quantity = state.cart.reduce((sum, line) => sum + line.qty, 0);

    return { subtotal, discount, discounted, shipping, total, vat, missingForFreeShipping, quantity };
  }

  function createCartItemMarkup(line) {
    const product = getProduct(line.id);
    return `
      <li class="cart-item" data-product-id="${product.id}">
        <img src="${getProductImageUrl(product, 160, 200)}" alt="${product.name}" width="76" height="95" loading="lazy">
        <div>
          <h3>${product.name}</h3>
          <p class="cart-item__meta">${t(`type.${product.category}`)} · ${t(`mat.${product.material}`)}</p>
          <div class="quantity" role="group">
            <button type="button" data-cart-action="decrease" aria-label="${t('cart.decrease')}"><svg class="icon"><use href="#i-minus"/></svg></button>
            <span aria-live="polite">${line.qty}</span>
            <button type="button" data-cart-action="increase" aria-label="${t('cart.increase')}"><svg class="icon"><use href="#i-plus"/></svg></button>
          </div>
        </div>
        <div class="cart-item__side">
          <button type="button" class="icon-button" data-cart-action="remove" aria-label="${t('cart.remove')}"><svg class="icon"><use href="#i-trash"/></svg></button>
          <strong>${formatPrice(product.price * line.qty)}</strong>
        </div>
      </li>`;
  }

  function renderCart() {
    const totals = calculateTotals();

    // Contador de la cabecera
    dom.cartCount.textContent = totals.quantity;
    dom.cartCount.classList.toggle('has-items', totals.quantity > 0);

    // Estado vacío / con productos
    dom.cartDrawer.classList.toggle('is-empty', state.cart.length === 0);
    dom.cartItems.innerHTML = state.cart.map(createCartItemMarkup).join('');

    // Barra de progreso hacia el envío gratuito
    const progress = Math.min(100, (totals.discounted / CONFIG.freeShippingThreshold) * 100);
    $('#cart-progress-bar').style.width = `${progress}%`;
    $('#cart-progress-text').textContent = totals.missingForFreeShipping > 0
      ? t('cart.freeShipping.missing', { amount: formatPrice(totals.missingForFreeShipping) })
      : t('cart.freeShipping.done');

    // Totales
    $('#cart-subtotal').textContent = formatPrice(totals.subtotal);
    $('#cart-discount-row').hidden = totals.discount === 0;
    $('#cart-discount').textContent = `−${formatPrice(totals.discount)}`;
    $('#cart-total').textContent = formatPrice(totals.discounted);

    renderPromoStatus();
    renderCheckoutSummary();
  }

  function renderPromoStatus() {
    const message = $('#promo-message');
    message.classList.remove('is-success', 'is-error');

    if (state.promoCode) {
      const percent = Math.round(CONFIG.promoCodes[state.promoCode] * 100);
      message.textContent = t('cart.promo.applied', { code: state.promoCode, percent });
      message.classList.add('is-success');
    } else if (state.promoError) {
      message.textContent = t('cart.promo.invalid');
      message.classList.add('is-error');
    } else {
      message.textContent = '';
    }
    $('#promo-remove').hidden = !state.promoCode;
  }

  function initCart() {
    loadCart();

    dom.cartItems.addEventListener('click', (event) => {
      const button = event.target.closest('[data-cart-action]');
      if (!button) return;
      const productId = button.closest('[data-product-id]').dataset.productId;
      const action = button.dataset.cartAction;
      if (action === 'increase') changeQuantity(productId, 1);
      if (action === 'decrease') changeQuantity(productId, -1);
      if (action === 'remove') removeFromCart(productId);
    });

    $('#promo-form').addEventListener('submit', (event) => {
      event.preventDefault();
      const input = $('#promo-input');
      const code = input.value.trim().toUpperCase();
      if (!code) return;
      if (CONFIG.promoCodes[code]) {
        state.promoCode = code;
        state.promoError = false;
        input.value = '';
      } else {
        state.promoError = true;
      }
      persistCart();
      renderCart();
    });

    $('#promo-remove').addEventListener('click', () => {
      state.promoCode = null;
      state.promoError = false;
      persistCart();
      renderCart();
    });

    $('#cart-clear').addEventListener('click', () => {
      clearCart();
      showToast(t('cart.cleared'));
    });

    $('#cart-checkout').addEventListener('click', openCheckout);
  }

  /* 12. CHECKOUT ---------------------------------------------------------- */
  const checkoutFields = {
    pickup: $('#pickup-fields'),
    shipping: $('#shipping-fields'),
    date: $('#co-date')
  };

  const getSelectedDelivery = () => dom.checkoutForm.elements.delivery.value;
  const getSelectedPayment = () => dom.checkoutForm.elements.payment.value;

  /* Utilidades de fecha en hora local (sin desfase por zona horaria) */
  function toDateInputValue(date) {
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${date.getFullYear()}-${month}-${day}`;
  }

  function parseDateInput(value) {
    const [year, month, day] = value.split('-').map(Number);
    return new Date(year, month - 1, day);
  }

  function getTomorrow() {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    date.setDate(date.getDate() + 1);
    return date;
  }

  /* Rango permitido y primer día disponible (la boutique cierra los domingos) */
  function setPickupDateLimits() {
    const min = getTomorrow();
    const max = new Date(min);
    max.setDate(max.getDate() + CONFIG.pickupMaxDaysAhead);
    checkoutFields.date.min = toDateInputValue(min);
    checkoutFields.date.max = toDateInputValue(max);

    const current = checkoutFields.date.value ? parseDateInput(checkoutFields.date.value) : null;
    if (!current || current < min || current.getDay() === 0) {
      const firstOpen = new Date(min);
      if (firstOpen.getDay() === 0) firstOpen.setDate(firstOpen.getDate() + 1);
      checkoutFields.date.value = toDateInputValue(firstOpen);
    }
  }

  /* Muestra los campos del método de entrega y habilita los pagos compatibles */
  function syncDeliveryOptions() {
    const method = getSelectedDelivery();

    [['pickup', checkoutFields.pickup], ['shipping', checkoutFields.shipping]].forEach(([name, container]) => {
      const active = method === name;
      container.hidden = !active;
      $$('input, select, textarea', container).forEach((field) => { field.disabled = !active; });
    });
    // Las notas del repartidor son opcionales pero solo se envían con entrega a domicilio
    $('#co-notes').disabled = method !== 'shipping';

    const paymentRadios = $$('input[name="payment"]', dom.checkoutForm);
    paymentRadios.forEach((radio) => {
      radio.disabled = radio.dataset.delivery !== 'both' && radio.dataset.delivery !== method;
    });
    // Si el pago elegido deja de ser válido, se selecciona el primero disponible
    if (paymentRadios.find((radio) => radio.checked)?.disabled) {
      paymentRadios.find((radio) => !radio.disabled).checked = true;
    }
    renderCheckoutSummary();
  }

  function renderCheckoutSummary() {
    const totals = calculateTotals(getSelectedDelivery());

    $('#checkout-items').innerHTML = state.cart.map((line) => {
      const product = getProduct(line.id);
      return `<li><span>${product.name} × ${line.qty}</span><span>${formatPrice(product.price * line.qty)}</span></li>`;
    }).join('');

    $('#co-subtotal').textContent = formatPrice(totals.subtotal);
    $('#co-discount-row').hidden = totals.discount === 0;
    $('#co-discount').textContent = `−${formatPrice(totals.discount)}`;
    $('#co-shipping').textContent = totals.shipping === 0 ? t('checkout.free') : formatPrice(totals.shipping);
    $('#co-total').textContent = formatPrice(totals.total);
    $('#co-vat').textContent = `${t('cart.vatIncluded')}: ${formatPrice(totals.vat)}`;

    const submitLabels = {
      'pay-pickup': 'checkout.submit.reserve',
      'pay-delivery': 'checkout.submit.order',
      online: 'checkout.submit.online'
    };
    const submit = $('#checkout-submit');
    submit.textContent = t(submitLabels[getSelectedPayment()]);
    submit.disabled = state.cart.length === 0;
  }

  function openCheckout() {
    if (!state.cart.length) return;
    setPickupDateLimits();
    syncDeliveryOptions();
    switchOverlay('cart-drawer', 'checkout-modal');
  }

  /* Genera el objeto pedido con una copia de los datos actuales */
  function buildOrder() {
    const data = Object.fromEntries(new FormData(dom.checkoutForm).entries());
    const delivery = data.delivery;

    return {
      id: `AUR-${Date.now().toString(36).toUpperCase()}`,
      createdAt: new Date().toISOString(),
      customer: { name: data.name.trim(), email: data.email.trim(), phone: data.phone.trim() },
      delivery,
      payment: data.payment,
      gift: Boolean(data.gift),
      pickup: delivery === 'pickup' ? { date: data.pickupDate, time: data.pickupTime } : null,
      shippingAddress: delivery === 'shipping'
        ? { address: data.address.trim(), postal: data.postal.trim(), city: data.city.trim(), notes: (data.notes ?? '').trim() }
        : null,
      promoCode: state.promoCode,
      items: state.cart.map((line) => {
        const product = getProduct(line.id);
        return { id: product.id, name: product.name, qty: line.qty, unitPrice: product.price };
      }),
      totals: calculateTotals(delivery)
    };
  }

  function initCheckout() {
    dom.checkoutForm.addEventListener('change', (event) => {
      if (event.target.name === 'delivery') syncDeliveryOptions();
      if (event.target.name === 'payment') renderCheckoutSummary();
    });

    dom.checkoutForm.addEventListener('submit', (event) => {
      event.preventDefault();
      if (!state.cart.length || !validateForm(dom.checkoutForm)) return;

      const order = buildOrder();
      if (order.payment === 'online') {
        state.pendingOrder = order;
        openGateway(order);
      } else {
        completeOrder(order);
      }
    });

    $('#checkout-back').addEventListener('click', () => switchOverlay('checkout-modal', 'cart-drawer'));
  }

  /* 13. PASARELA DE PAGO Y CONFIRMACIÓN ----------------------------------- */
  function openGateway(order) {
    $('#gateway-order').textContent = order.id;
    $('#gateway-items').innerHTML = order.items
      .map((item) => `<li><span>${item.name} × ${item.qty}</span><span>${formatPrice(item.unitPrice * item.qty)}</span></li>`)
      .join('');
    $('#gateway-amount').textContent = formatPrice(order.totals.total);
    switchOverlay('checkout-modal', 'gateway-modal');
  }

  function formatLongDate(isoDate) {
    return new Intl.DateTimeFormat(CONFIG.locales[state.language], { dateStyle: 'full' }).format(parseDateInput(isoDate));
  }

  /* Cierra el pedido: vacía la cesta y muestra la confirmación */
  function completeOrder(order) {
    if (!order) return;
    const isPickup = order.delivery === 'pickup';
    const isPaid = order.payment === 'online';
    const messageKey = isPickup
      ? (isPaid ? 'confirm.pickupPaid' : 'confirm.pickupPay')
      : (isPaid ? 'confirm.shipPaid' : 'confirm.shipPay');
    const address = order.shippingAddress
      ? `${order.shippingAddress.address}, ${order.shippingAddress.postal} ${order.shippingAddress.city}`
      : '';

    $('#confirm-order').textContent = t('confirm.order', { id: order.id });
    $('#confirm-message').textContent = t(messageKey, {
      date: order.pickup ? formatLongDate(order.pickup.date) : '',
      time: order.pickup?.time ?? '',
      address,
      total: formatPrice(order.totals.total)
    });
    $('#confirm-email').textContent = t('confirm.email', { email: order.customer.email });

    clearCart();
    state.pendingOrder = null;
    dom.checkoutForm.reset();
    clearFormErrors(dom.checkoutForm);

    $$('.overlay.is-open').forEach((overlay) => closeOverlay(overlay.id));
    openOverlay('confirm-modal');
  }

  function initGateway() {
    $('#gateway-back').addEventListener('click', () => switchOverlay('gateway-modal', 'checkout-modal'));

    $('#gateway-pay').addEventListener('click', () => {
      document.dispatchEvent(new CustomEvent('boutique:payment-request', { detail: state.pendingOrder }));
      showToast(t('gateway.pending'));
    });

    // La pasarela real debe lanzar este evento cuando el pago se complete
    document.addEventListener('boutique:payment-confirmed', () => completeOrder(state.pendingOrder));
  }

  /* 14. BUSCADOR CON RESALTADO -------------------------------------------- */
  const searchState = { marks: [], query: '' };
  const searchElements = {
    form: $('#search-form'),
    input: $('#search-input'),
    status: $('#search-status'),
    results: $('#search-results'),
    clear: $('#search-clear')
  };

  /* Normaliza para comparar sin tildes ni mayúsculas conservando la longitud */
  function foldText(text) {
    return text.replace(/[\u00C0-\u017F]/g, (char) => char.normalize('NFD')[0]).toLowerCase();
  }

  function getSearchableTextNodes() {
    const nodes = [];
    $$('main, .site-footer').forEach((root) => {
      const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
        acceptNode: (node) => (
          node.nodeValue.trim() && !node.parentElement.closest('script, style, option, select, textarea')
            ? NodeFilter.FILTER_ACCEPT
            : NodeFilter.FILTER_REJECT
        )
      });
      while (walker.nextNode()) nodes.push(walker.currentNode);
    });
    return nodes;
  }

  function clearSearchHighlights() {
    $$('mark.search-highlight').forEach((mark) => {
      const parent = mark.parentNode;
      mark.replaceWith(document.createTextNode(mark.textContent));
      parent.normalize();
    });
    searchState.marks = [];
  }

  /* Envuelve cada coincidencia en <mark> y devuelve la lista de marcas */
  function highlightMatches(query) {
    clearSearchHighlights();
    const needle = foldText(query.trim());

    getSearchableTextNodes().forEach((node) => {
      const text = node.nodeValue;
      const folded = foldText(text);
      let index = folded.indexOf(needle);
      if (index === -1) return;

      const fragment = document.createDocumentFragment();
      let cursor = 0;
      while (index !== -1) {
        fragment.append(text.slice(cursor, index));
        const mark = document.createElement('mark');
        mark.className = 'search-highlight';
        mark.textContent = text.slice(index, index + needle.length);
        fragment.append(mark);
        cursor = index + needle.length;
        index = folded.indexOf(needle, cursor);
      }
      fragment.append(text.slice(cursor));
      node.replaceWith(fragment);
    });

    searchState.marks = $$('mark.search-highlight');
  }

  /* Un resultado por bloque de texto, con la sección y un fragmento */
  function renderSearchResults() {
    const needle = foldText(searchState.query.trim());
    const seenParents = new Set();
    const entries = [];

    searchState.marks.forEach((mark, markIndex) => {
      const parent = mark.parentElement;
      if (seenParents.has(parent)) return;
      seenParents.add(parent);
      entries.push({ mark, markIndex });
    });

    searchElements.results.replaceChildren(...entries.slice(0, CONFIG.searchMaxResults).map(({ mark, markIndex }) => {
      const parentText = mark.parentElement.textContent;
      const position = Math.max(0, foldText(parentText).indexOf(needle));
      const start = Math.max(0, position - 30);
      const end = Math.min(parentText.length, position + needle.length + 50);
      const sectionElement = mark.closest('[data-section-key]');

      const item = document.createElement('li');
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'search-result';
      button.dataset.markIndex = markIndex;

      const sectionLabel = document.createElement('span');
      sectionLabel.className = 'search-result__section';
      sectionLabel.textContent = sectionElement ? t(sectionElement.dataset.sectionKey) : '';

      const snippet = document.createElement('span');
      snippet.className = 'search-result__text';
      const before = (start > 0 ? '…' : '') + parentText.slice(start, position);
      const match = document.createElement('mark');
      match.className = 'search-highlight';
      match.textContent = parentText.slice(position, position + needle.length);
      const after = parentText.slice(position + needle.length, end) + (end < parentText.length ? '…' : '');
      snippet.append(before, match, after);

      button.append(sectionLabel, snippet);
      item.append(button);
      return item;
    }));
  }

  function updateSearchStatus() {
    const query = searchState.query.trim();
    if (!query) {
      searchElements.status.textContent = '';
    } else if (query.length < CONFIG.searchMinLength) {
      searchElements.status.textContent = t('search.hint');
    } else if (!searchState.marks.length) {
      searchElements.status.textContent = t('search.none', { q: query });
    } else {
      searchElements.status.textContent = t('search.results', { n: searchState.marks.length });
    }
    searchElements.clear.hidden = !searchState.marks.length;
  }

  function runSearch() {
    searchState.query = searchElements.input.value;
    const query = searchState.query.trim();

    if (query.length < CONFIG.searchMinLength) {
      clearSearchHighlights();
      searchElements.results.replaceChildren();
    } else {
      highlightMatches(query);
      renderSearchResults();
    }
    updateSearchStatus();
  }

  /* Vacía el buscador y elimina el resaltado de la página */
  function resetSearch() {
    searchElements.input.value = '';
    runSearch();
  }

  function goToSearchMatch(markIndex) {
    const mark = searchState.marks[markIndex];
    if (!mark) return;
    closeOverlay('search-modal');
    mark.scrollIntoView({ behavior: 'smooth', block: 'center' });
    mark.classList.remove('is-current');
    void mark.offsetWidth;
    mark.classList.add('is-current');
  }

  function initSearch() {
    let debounceTimer;
    searchElements.input.addEventListener('input', () => {
      window.clearTimeout(debounceTimer);
      debounceTimer = window.setTimeout(runSearch, 180);
    });

    // Enter salta a la primera coincidencia
    searchElements.form.addEventListener('submit', (event) => {
      event.preventDefault();
      window.clearTimeout(debounceTimer);
      runSearch();
      goToSearchMatch(0);
    });

    searchElements.results.addEventListener('click', (event) => {
      const button = event.target.closest('[data-mark-index]');
      if (button) goToSearchMatch(Number(button.dataset.markIndex));
    });

    searchElements.clear.addEventListener('click', () => {
      searchElements.input.value = '';
      runSearch();
      searchElements.input.focus();
    });
  }

  /* 15. FORMULARIOS Y VALIDACIÓN ------------------------------------------ */
  function getValidationMessage(input) {
    const value = input.value.trim();

    if (input.type === 'checkbox') return input.checked ? '' : t('error.consent');
    if (!value) return t('error.required');
    if (input.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)) return t('error.email');
    if (input.name === 'phone' && !/^\+?[\d\s-]{9,15}$/.test(value)) return t('error.phone');
    if (input.name === 'postal' && !/^\d{5}$/.test(value)) return t('error.postal');
    if (input.type === 'date') {
      const date = parseDateInput(value);
      if (date < getTomorrow()) return t('error.date');
      if (date.getDay() === 0) return t('error.sunday');
    }
    return '';
  }

  function setFieldError(input, message) {
    const field = input.closest('.field');
    if (!field) return;
    let errorElement = $('.field__error', field);

    if (message && !errorElement) {
      errorElement = document.createElement('p');
      errorElement.className = 'field__error';
      errorElement.setAttribute('role', 'alert');
      field.append(errorElement);
    }
    if (errorElement) errorElement.textContent = message;
    if (!message) errorElement?.remove();

    field.classList.toggle('has-error', Boolean(message));
    input.setAttribute('aria-invalid', String(Boolean(message)));
  }

  function validateForm(form) {
    let firstInvalid = null;
    $$('input[required], select[required], textarea[required]', form)
      .filter((input) => !input.disabled)
      .forEach((input) => {
        const message = getValidationMessage(input);
        setFieldError(input, message);
        if (message && !firstInvalid) firstInvalid = input;
      });
    firstInvalid?.focus();
    return !firstInvalid;
  }

  function clearFormErrors(form) {
    $$('input, select, textarea', form).forEach((input) => setFieldError(input, ''));
  }

  function initForms() {
    // Limpia el error de un campo en cuanto el usuario lo corrige
    [dom.checkoutForm, dom.contactForm].forEach((form) => {
      const clearOnEdit = (event) => {
        if (event.target.matches('input, select, textarea')) setFieldError(event.target, '');
      };
      form.addEventListener('input', clearOnEdit);
      form.addEventListener('change', clearOnEdit);
    });

    // Formulario de contacto (el envío real al servidor lo implementará el cliente)
    dom.contactForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const feedback = $('#contact-feedback');
      if (!validateForm(dom.contactForm)) {
        feedback.textContent = '';
        return;
      }
      const name = dom.contactForm.elements.name.value.trim();
      feedback.textContent = t('form.success', { name });
      dom.contactForm.reset();
    });

    // Botón de usuario: punto de entrada del futuro sistema de login
    $('#login-button').addEventListener('click', () => {
      document.dispatchEvent(new CustomEvent('boutique:login-request'));
      showToast(t('login.pending'));
    });
  }

  /* 16. LEGAL Y COOKIES --------------------------------------------------- */
  function renderLegal() {
    $('#legal-title').textContent = t(`legal.${state.legalTopic}.title`);
    const paragraphs = t(`legal.${state.legalTopic}.body`).split('\n').map((line) => {
      const paragraph = document.createElement('p');
      paragraph.textContent = line;
      return paragraph;
    });
    $('#legal-body').replaceChildren(...paragraphs);
  }

  function initLegalAndCookies() {
    document.addEventListener('click', (event) => {
      const trigger = event.target.closest('[data-legal]');
      if (!trigger) return;
      state.legalTopic = trigger.dataset.legal;
      renderLegal();
      openOverlay('legal-modal');
    });

    const banner = $('#cookie-banner');
    if (storage.read(CONFIG.storageKeys.cookies, null) === null) {
      window.setTimeout(() => banner.classList.add('is-visible'), 1200);
    }
    [['#cookie-accept', 'accepted'], ['#cookie-reject', 'necessary']].forEach(([selector, choice]) => {
      $(selector).addEventListener('click', () => {
        storage.write(CONFIG.storageKeys.cookies, choice);
        banner.classList.remove('is-visible');
      });
    });
  }

  /* 17. APARICIÓN DE SECCIONES -------------------------------------------- */
  let revealObserver = null;

  function observeRevealElements(root = document) {
    $$('.reveal:not(.is-visible)', root).forEach((element) => {
      if (revealObserver) revealObserver.observe(element);
      else element.classList.add('is-visible');
    });
  }

  function initReveal() {
    if ('IntersectionObserver' in window) {
      revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    }
    observeRevealElements();
  }

  /* El vídeo del hero se detiene si el usuario prefiere menos movimiento */
  function initHeroVideo() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      $('#hero-video').pause();
    }
  }

  /* 18. INICIALIZACIÓN ---------------------------------------------------- */
  function init() {
    $('#current-year').textContent = new Date().getFullYear();

    initTheme();
    initMobileMenu();
    initOverlays();
    initScrollAndResize();
    initShop();
    initCart();
    initCheckout();
    initGateway();
    initSearch();
    initForms();
    initLegalAndCookies();
    initReveal();
    initHeroVideo();
    initLanguage(); // al final: renderiza productos, carrito y textos traducidos
  }

  init();
})();
