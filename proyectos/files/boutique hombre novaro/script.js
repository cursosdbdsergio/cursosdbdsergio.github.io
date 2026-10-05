/* ==========================================================================
   NOVARO · Boutique de moda para hombre
   script.js

   Índice
   1.  Configuración
   2.  Traducciones (es · en · va)
   3.  Catálogo de productos
   4.  Referencias al DOM y estado
   5.  Utilidades
   6.  Idioma
   7.  Tema claro / oscuro
   8.  Cabecera: scroll, menú activo y scroll suave
   9.  Menú móvil
   10. Modales (pila, foco y bloqueo de scroll)
   11. Búsqueda en la página
   12. Tienda: filtros y productos
   13. Carrito
   14. Checkout, pago y confirmación
   15. Formularios y validación
   16. Información legal, cookies y avisos
   17. Animaciones de aparición
   18. Eventos e inicialización

   Puntos de integración para el cliente (eventos personalizados en document):
   - "auth:login-request"  → se lanza al pulsar el botón de usuario.
   - "shop:payment-request" → se lanza al pulsar "Pagar" en la ventana de pago
                              online. Para conectar la pasarela: escuchar el evento,
                              llamar a event.preventDefault() y, cuando el pago sea
                              correcto, ejecutar event.detail.completePayment().
   - "shop:order-created"   → se lanza cuando un pedido queda registrado.
   - "contact:submit"       → se lanza al enviar el formulario de contacto.
   ========================================================================== */
"use strict";

/* ==========================================================================
   1. CONFIGURACIÓN
   ========================================================================== */
const STORAGE_KEYS = {
  theme: "novaro-theme",
  language: "novaro-language",
  cart: "novaro-cart",
  promo: "novaro-promo",
  cookies: "novaro-cookies",
  orders: "novaro-orders",
};

const STORE_INFO = {
  brand: "NOVARO",
  address: "Carrer de Colón, 24 · 46004 València",
};

/* Los importes se manejan en céntimos para evitar errores de redondeo */
const SHOP_CONFIG = {
  freeShippingThreshold: 10000,
  shippingCost: 495,
  maxQuantityPerItem: 10,
  pickupDaysAhead: 6,
  /* Códigos promocionales: código → porcentaje de descuento */
  promoCodes: { BIENVENIDO10: 10, OTONO15: 15 },
  /* Formas de pago permitidas según el tipo de entrega */
  paymentsByDelivery: {
    pickup: ["pickup", "online"],
    delivery: ["delivery", "online"],
  },
};

const LANGUAGES = {
  es: { locale: "es-ES", htmlLang: "es" },
  en: { locale: "en-GB", htmlLang: "en" },
  va: { locale: "ca-ES", htmlLang: "ca-ES-valencia" },
};

const UI_CONFIG = {
  scrollThreshold: 40,
  backToTopOffset: 700,
  searchMinLength: 2,
  searchDelay: 180,
  maxSearchResults: 8,
  maxHighlights: 300,
  toastDuration: 3200,
  maxToasts: 3,
};

const ONE_SIZE = "U";
const SEARCH_EXCLUDED_SELECTOR = "script, style, svg, select, option, textarea, [hidden], .search-highlight";
const FOCUSABLE_SELECTOR = 'a[href], button:not(:disabled), input:not(:disabled), select:not(:disabled), textarea:not(:disabled), [tabindex]:not([tabindex="-1"])';

/* ==========================================================================
   2. TRADUCCIONES
   Cada idioma comparte la misma estructura de claves. Los textos del HTML se
   enlazan con data-i18n, data-i18n-placeholder y data-i18n-label.
   Marcadores disponibles en cualquier texto: {brand} {year} {address}
   {freeShipping} {shippingCost}
   ========================================================================== */
const translations = {
  /* ------------------------------ ESPAÑOL ------------------------------ */
  es: {
    meta: {
      title: "NOVARO · Boutique de moda para hombre",
      description: "Moda masculina atemporal en València. Camisas, americanas, pantalones, punto, calzado y accesorios. Compra online y recoge en tienda o recíbelo en casa.",
    },
    aria: {
      skip: "Saltar al contenido", home: "NOVARO, inicio", mainNav: "Navegación principal", mobileNav: "Menú móvil",
      language: "Idioma", search: "Buscar en la página", user: "Acceder a mi cuenta",
      theme: "Cambiar modo claro u oscuro", cart: "Abrir carrito", menu: "Menú", close: "Cerrar",
      top: "Volver arriba", filters: "Filtrar por categoría",
    },
    topbar: { shipping: "Envío gratis desde {freeShipping}", hours: "Lun–Sáb · 10:00–20:30" },
    logo: { sub: "Boutique · Hombre" },
    nav: { home: "Inicio", about: "Nosotros", collections: "Colecciones", shop: "Tienda", tailoring: "Sastrería", contact: "Contacto" },
    menu: { search: "Buscar en la página", language: "Idioma" },
    hero: {
      eyebrow: "Colección Otoño · Invierno 2026",
      title: "Elegancia serena para el hombre de hoy",
      text: "Prendas atemporales, tejidos nobles y patronaje preciso. Una boutique pensada para vestir bien sin esfuerzo, en València y online.",
      ctaShop: "Ver colección", ctaTailoring: "Reservar cita", scroll: "Descubre",
    },
    benefits: {
      shipping: { title: "Envío en 24–48 h", text: "Gratis desde {freeShipping}" },
      pickup: { title: "Recogida en tienda", text: "Reserva y recoge sin coste" },
      returns: { title: "Cambios en 30 días", text: "Sin complicaciones" },
      secure: { title: "Pago seguro", text: "Tarjeta, efectivo o contra reembolso" },
    },
    about: {
      eyebrow: "Nuestra boutique",
      title: "Moda masculina con criterio, hecha para durar",
      text1: "En NOVARO seleccionamos cada prenda pensando en el hombre que quiere vestir bien sin darle demasiadas vueltas. Líneas limpias, colores sobrios y acabados que se notan con los años.",
      text2: "Trabajamos con talleres de proximidad y tejidos de origen certificado, y te acompañamos en tienda con asesoramiento de imagen y ajustes incluidos.",
      badge: "Boutique en València · desde 2011",
      f1: { title: "Tejidos nobles", text: "Lana merino, algodón egipcio y lino europeo elegidos por su tacto y durabilidad." },
      f2: { title: "Patronaje preciso", text: "Cortes limpios y proporciones equilibradas que favorecen cualquier silueta." },
      f3: { title: "Atención personal", text: "Asesoramiento de imagen en tienda y ajustes de sastrería incluidos." },
      stat1: "Años de oficio", stat2: "Clientes satisfechos", stat3: "Tejidos certificados",
    },
    collections: {
      eyebrow: "Colecciones", title: "Explora por categoría",
      text: "Desde la camisa de cada día hasta la americana para las ocasiones especiales.", explore: "Explorar",
    },
    categories: {
      all: "Todo", shirts: "Camisas", jackets: "Americanas y trajes", trousers: "Pantalones",
      knitwear: "Punto", shoes: "Calzado", accessories: "Accesorios",
    },
    shop: {
      eyebrow: "Tienda online", title: "Selección de temporada",
      text: "Compra online y recoge en tienda o recíbelo en casa. Elige la forma de pago que te resulte más cómoda.",
      sortLabel: "Ordenar por", count: "{count} productos",
    },
    sort: { featured: "Destacados", priceAsc: "Precio: de menor a mayor", priceDesc: "Precio: de mayor a menor" },
    product: {
      add: "Añadir", oneSize: "Talla única", sizeLabel: "Talla", new: "Novedad", sale: "Oferta",
      selectSize: "Selecciona una talla", added: "{name} añadido al carrito",
    },
    tailoring: {
      eyebrow: "Sastrería a medida", title: "Un traje que cuenta tu historia",
      text: "Diseñamos contigo una prenda única: tejido, corte y detalles. Nuestros sastres la elaboran y la ajustan hasta que te siente como una segunda piel.",
      s1: { title: "Cita y asesoramiento", text: "Hablamos de estilo, ocasión y presupuesto en una visita de 45 minutos." },
      s2: { title: "Toma de medidas", text: "Más de 20 medidas y más de 200 tejidos entre los que elegir." },
      s3: { title: "Prueba y entrega", text: "Primera prueba en 2 semanas y entrega con un ajuste incluido." },
      cta: "Reservar cita",
    },
    contact: {
      eyebrow: "Contacto", title: "Visítanos o escríbenos",
      text: "Estamos en el corazón de València. Pasa por la tienda o envíanos un mensaje y te responderemos en menos de 24 horas.",
      addressLabel: "Dirección", phoneLabel: "Teléfono", emailLabel: "Correo electrónico", hoursLabel: "Horario",
      hoursValue: "Lun–Sáb · 10:00–14:00 y 17:00–20:30",
    },
    form: {
      name: "Nombre y apellidos", email: "Correo electrónico", phone: "Teléfono", subject: "Motivo",
      subjectInfo: "Información general", subjectOrder: "Consulta sobre un pedido",
      subjectTailoring: "Cita de sastrería", subjectOther: "Otros", message: "Mensaje",
      privacy: "He leído y acepto el tratamiento de mis datos para responder a mi consulta.",
      send: "Enviar mensaje", success: "¡Gracias! Hemos recibido tu mensaje y te responderemos muy pronto.",
    },
    footer: {
      about: "Boutique de moda masculina en València. Prendas atemporales, sastrería a medida y compra online con recogida o envío.",
      shop: "Tienda", info: "Información", legal: "Legal",
      hoursWeek: "De lunes a sábado", hoursTimes: "10:00–14:00 · 17:00–20:30", hoursSunday: "Domingo: cerrado",
      payments: "Aceptamos tarjeta, efectivo en tienda y pago contra reembolso.",
      copyright: "© {year} {brand} Boutique. Todos los derechos reservados.",
      credit: "Imágenes de muestra: Pexels",
    },
    search: {
      title: "Buscar en la página", placeholder: "Escribe una palabra…", hint: "Escribe al menos 2 letras para buscar.",
      none: "Sin resultados para «{query}»", count: "Coincidencias: {count}", footer: "Pie de página",
      clear: "Quitar resaltado", esc: "Esc para cerrar",
    },
    cart: {
      title: "Tu carrito", empty: "Tu carrito está vacío", emptyText: "Añade alguna prenda para empezar.",
      continue: "Seguir comprando", promoLabel: "Código promocional", promoPlaceholder: "Código", promoApply: "Aplicar",
      promoApplied: "Código {code} aplicado: −{percent}%", promoInvalid: "El código no es válido", promoRemove: "Quitar",
      freeShippingLeft: "Te faltan {amount} para el envío a domicilio gratuito",
      freeShippingDone: "Tienes el envío a domicilio gratuito",
      shippingNote: "Los gastos de envío se calculan al finalizar la compra.",
      checkout: "Finalizar compra", clear: "Vaciar carrito", remove: "Eliminar",
      decrease: "Reducir cantidad", increase: "Aumentar cantidad", size: "Talla {size}",
      maxQty: "Máximo {max} unidades por artículo", cleared: "Carrito vaciado", removed: "{name} eliminado",
    },
    checkout: {
      title: "Finalizar compra", deliveryTitle: "1. Entrega",
      pickup: { title: "Recoger en tienda", text: "Reserva tu pedido y recógelo sin coste." },
      ship: { title: "Envío a domicilio", text: "24–48 h · {shippingCost} (gratis desde {freeShipping})" },
      pickupTitle: "Datos de recogida", pickupDate: "Día de recogida", pickupSlot: "Franja horaria",
      storeNote: "Te esperamos en {address}. Tu pedido estará reservado durante el día elegido.",
      addressTitle: "Dirección de envío", street: "Dirección", city: "Ciudad", postal: "Código postal", province: "Provincia",
      customerTitle: "2. Tus datos", paymentTitle: "3. Forma de pago", unavailable: "No disponible con esta entrega",
      notes: "Notas del pedido (opcional)", termsPrefix: "He leído y acepto los", termsLink: "requisitos de compra",
      summary: "Resumen del pedido", selectPlaceholder: "Selecciona…",
      submit: { pickup: "Reservar pedido", delivery: "Confirmar pedido", online: "Continuar al pago" },
    },
    pay: {
      pickup: { title: "Pagar al recoger", text: "Efectivo o tarjeta en la tienda" },
      delivery: { title: "Pagar en la entrega", text: "Paga al repartidor al recibir el pedido" },
      online: { title: "Pagar online", text: "Tarjeta mediante pasarela de pago segura" },
    },
    summary: {
      subtotal: "Subtotal", discount: "Descuento ({code})", shipping: "Envío", free: "Gratis", total: "Total",
      vat: "IVA incluido", pickupAt: "Recogida en tienda · {date} · {slot}", shipTo: "Envío a {address}",
    },
    payment: {
      title: "Pago seguro", amountLabel: "Vas a pagar", orderLabel: "Pedido", slotTitle: "Pasarela de pago",
      slotNote: "Aquí se integrará la pasarela de pago de la tienda. Modo demostración: al continuar se simulará un pago correcto.",
      pay: "Pagar {amount}", back: "Volver", secure: "Pago cifrado y seguro",
    },
    confirmation: {
      title: "¡Gracias por tu pedido!", orderLabel: "Número de pedido",
      keep: "Guarda este número para cualquier consulta.", close: "Seguir comprando",
      msg: {
        "pickup-pickup": "Pedido reservado, {name}. Te esperamos: {date}, de {slot}. Pagarás {total} en la tienda al recogerlo.",
        "pickup-online": "Pago recibido, {name}. Tu pedido te espera en tienda: {date}, de {slot}.",
        "delivery-delivery": "Pedido confirmado, {name}. Lo enviaremos a {address} en 24–48 h. Pagarás {total} al repartidor al recibirlo.",
        "delivery-online": "Pago recibido, {name}. Enviaremos tu pedido a {address} en 24–48 h.",
      },
    },
    legal: {
      understood: "Entendido",
      cookies: {
        link: "Política de cookies", title: "Política de cookies",
        paragraphs: [
          "Utilizamos cookies y tecnologías similares de carácter técnico, necesarias para recordar tu carrito, tu idioma y tu preferencia de modo claro u oscuro.",
          "Si lo aceptas, podremos usar también cookies de análisis anónimas para mejorar la web. Nunca las utilizamos para publicidad personalizada sin tu consentimiento.",
          "Puedes cambiar tu decisión borrando los datos del navegador o escribiéndonos desde el formulario de contacto.",
        ],
      },
      requirements: {
        link: "Requisitos de compra", title: "Requisitos de compra",
        paragraphs: [
          "Para comprar online debes ser mayor de 18 años y facilitar datos de contacto y entrega veraces.",
          "Los precios incluyen IVA. El envío a domicilio cuesta {shippingCost} y es gratuito en pedidos desde {freeShipping}. La recogida en tienda es siempre gratuita.",
          "Los pedidos reservados para recoger se mantienen durante el día elegido. Puedes pagar al recoger, al recibir el pedido en casa o con tarjeta mediante pasarela de pago segura.",
          "Dispones de 30 días para cambios y devoluciones con la prenda sin usar y con su etiqueta.",
        ],
      },
      shipping: {
        link: "Envíos y devoluciones", title: "Envíos y devoluciones",
        paragraphs: [
          "Enviamos a toda la península en 24–48 horas laborables mediante mensajería con seguimiento.",
          "Puedes devolver tu pedido en 30 días desde la entrega, en tienda o por mensajería, y te reembolsaremos el importe por el mismo medio de pago.",
          "Las prendas de sastrería a medida no admiten devolución, pero incluyen un ajuste gratuito.",
        ],
      },
    },
    cookies: {
      text: "Usamos cookies técnicas para recordar tu carrito, idioma y tema. Con tu permiso, también cookies de análisis anónimas.",
      accept: "Aceptar", reject: "Rechazar", more: "Más información",
    },
    toast: { login: "El acceso de clientes estará disponible muy pronto." },
    error: {
      required: "Este campo es obligatorio", email: "Introduce un correo válido", phone: "Introduce un teléfono válido",
      postal: "Introduce un código postal de 5 dígitos", terms: "Debes aceptar para continuar",
    },
  },

  /* ------------------------------ ENGLISH ------------------------------ */
  en: {
    meta: {
      title: "NOVARO · Men's fashion boutique",
      description: "Timeless menswear in València. Shirts, blazers, trousers, knitwear, footwear and accessories. Shop online and collect in store or have it delivered.",
    },
    aria: {
      skip: "Skip to content", home: "NOVARO, home", mainNav: "Main navigation", mobileNav: "Mobile menu",
      language: "Language", search: "Search the page", user: "Sign in to my account",
      theme: "Toggle light or dark mode", cart: "Open cart", menu: "Menu", close: "Close",
      top: "Back to top", filters: "Filter by category",
    },
    topbar: { shipping: "Free shipping over {freeShipping}", hours: "Mon–Sat · 10:00–20:30" },
    logo: { sub: "Boutique · Menswear" },
    nav: { home: "Home", about: "About", collections: "Collections", shop: "Shop", tailoring: "Tailoring", contact: "Contact" },
    menu: { search: "Search the page", language: "Language" },
    hero: {
      eyebrow: "Autumn · Winter 2026 collection",
      title: "Quiet elegance for the modern man",
      text: "Timeless pieces, fine fabrics and precise tailoring. A boutique made for dressing well effortlessly, in València and online.",
      ctaShop: "View collection", ctaTailoring: "Book an appointment", scroll: "Discover",
    },
    benefits: {
      shipping: { title: "Delivery in 24–48 h", text: "Free over {freeShipping}" },
      pickup: { title: "Click & collect", text: "Reserve and collect for free" },
      returns: { title: "30-day exchanges", text: "No hassle" },
      secure: { title: "Secure payment", text: "Card, cash or cash on delivery" },
    },
    about: {
      eyebrow: "Our boutique",
      title: "Menswear with judgement, made to last",
      text1: "At NOVARO we choose every piece for the man who wants to dress well without overthinking it. Clean lines, sober colours and finishes that stand the test of time.",
      text2: "We work with local workshops and certified fabrics, and we support you in store with style advice and alterations included.",
      badge: "València boutique · since 2011",
      f1: { title: "Fine fabrics", text: "Merino wool, Egyptian cotton and European linen chosen for their feel and durability." },
      f2: { title: "Precise tailoring", text: "Clean cuts and balanced proportions that flatter every silhouette." },
      f3: { title: "Personal service", text: "In-store style advice and tailoring adjustments included." },
      stat1: "Years of craft", stat2: "Happy customers", stat3: "Certified fabrics",
    },
    collections: {
      eyebrow: "Collections", title: "Explore by category",
      text: "From the everyday shirt to the blazer for special occasions.", explore: "Explore",
    },
    categories: {
      all: "All", shirts: "Shirts", jackets: "Blazers & suits", trousers: "Trousers",
      knitwear: "Knitwear", shoes: "Footwear", accessories: "Accessories",
    },
    shop: {
      eyebrow: "Online shop", title: "Seasonal selection",
      text: "Shop online and collect in store or have it delivered. Choose the payment method that suits you best.",
      sortLabel: "Sort by", count: "{count} products",
    },
    sort: { featured: "Featured", priceAsc: "Price: low to high", priceDesc: "Price: high to low" },
    product: {
      add: "Add", oneSize: "One size", sizeLabel: "Size", new: "New", sale: "Sale",
      selectSize: "Please select a size", added: "{name} added to your cart",
    },
    tailoring: {
      eyebrow: "Made-to-measure tailoring", title: "A suit that tells your story",
      text: "We design a one-of-a-kind piece with you: fabric, cut and details. Our tailors craft it and adjust it until it fits like a second skin.",
      s1: { title: "Appointment & advice", text: "We talk style, occasion and budget in a 45-minute visit." },
      s2: { title: "Measurements", text: "More than 20 measurements and over 200 fabrics to choose from." },
      s3: { title: "Fitting & delivery", text: "First fitting in 2 weeks and delivery with one adjustment included." },
      cta: "Book an appointment",
    },
    contact: {
      eyebrow: "Contact", title: "Visit us or write to us",
      text: "We are in the heart of València. Drop by the shop or send us a message and we will reply within 24 hours.",
      addressLabel: "Address", phoneLabel: "Phone", emailLabel: "Email", hoursLabel: "Opening hours",
      hoursValue: "Mon–Sat · 10:00–14:00 and 17:00–20:30",
    },
    form: {
      name: "Full name", email: "Email", phone: "Phone", subject: "Subject",
      subjectInfo: "General information", subjectOrder: "Order enquiry",
      subjectTailoring: "Tailoring appointment", subjectOther: "Other", message: "Message",
      privacy: "I have read and accept the processing of my data to answer my enquiry.",
      send: "Send message", success: "Thank you! We have received your message and will reply very soon.",
    },
    footer: {
      about: "Men's fashion boutique in València. Timeless pieces, made-to-measure tailoring and online shopping with pickup or delivery.",
      shop: "Shop", info: "Information", legal: "Legal",
      hoursWeek: "Monday to Saturday", hoursTimes: "10:00–14:00 · 17:00–20:30", hoursSunday: "Sunday: closed",
      payments: "We accept cards, cash in store and cash on delivery.",
      copyright: "© {year} {brand} Boutique. All rights reserved.",
      credit: "Sample images: Pexels",
    },
    search: {
      title: "Search the page", placeholder: "Type a word…", hint: "Type at least 2 letters to search.",
      none: "No results for “{query}”", count: "Matches: {count}", footer: "Footer",
      clear: "Remove highlight", esc: "Esc to close",
    },
    cart: {
      title: "Your cart", empty: "Your cart is empty", emptyText: "Add a piece to get started.",
      continue: "Continue shopping", promoLabel: "Promo code", promoPlaceholder: "Code", promoApply: "Apply",
      promoApplied: "Code {code} applied: −{percent}%", promoInvalid: "This code is not valid", promoRemove: "Remove",
      freeShippingLeft: "You are {amount} away from free home delivery",
      freeShippingDone: "You have free home delivery",
      shippingNote: "Shipping costs are calculated at checkout.",
      checkout: "Checkout", clear: "Empty cart", remove: "Remove",
      decrease: "Decrease quantity", increase: "Increase quantity", size: "Size {size}",
      maxQty: "Maximum {max} units per item", cleared: "Cart emptied", removed: "{name} removed",
    },
    checkout: {
      title: "Checkout", deliveryTitle: "1. Delivery",
      pickup: { title: "Collect in store", text: "Reserve your order and collect it at no cost." },
      ship: { title: "Home delivery", text: "24–48 h · {shippingCost} (free over {freeShipping})" },
      pickupTitle: "Pickup details", pickupDate: "Pickup day", pickupSlot: "Time slot",
      storeNote: "We will be waiting at {address}. Your order will be reserved for the chosen day.",
      addressTitle: "Delivery address", street: "Address", city: "City", postal: "Postcode", province: "Province",
      customerTitle: "2. Your details", paymentTitle: "3. Payment method", unavailable: "Not available with this delivery",
      notes: "Order notes (optional)", termsPrefix: "I have read and accept the", termsLink: "purchase requirements",
      summary: "Order summary", selectPlaceholder: "Select…",
      submit: { pickup: "Reserve order", delivery: "Confirm order", online: "Continue to payment" },
    },
    pay: {
      pickup: { title: "Pay on collection", text: "Cash or card in store" },
      delivery: { title: "Pay on delivery", text: "Pay the courier when you receive your order" },
      online: { title: "Pay online", text: "Card through a secure payment gateway" },
    },
    summary: {
      subtotal: "Subtotal", discount: "Discount ({code})", shipping: "Shipping", free: "Free", total: "Total",
      vat: "VAT included", pickupAt: "Store pickup · {date} · {slot}", shipTo: "Delivery to {address}",
    },
    payment: {
      title: "Secure payment", amountLabel: "You are about to pay", orderLabel: "Order", slotTitle: "Payment gateway",
      slotNote: "The shop's payment gateway will be integrated here. Demo mode: continuing will simulate a successful payment.",
      pay: "Pay {amount}", back: "Back", secure: "Encrypted and secure payment",
    },
    confirmation: {
      title: "Thank you for your order!", orderLabel: "Order number",
      keep: "Keep this number for any enquiry.", close: "Continue shopping",
      msg: {
        "pickup-pickup": "Order reserved, {name}. See you: {date}, {slot}. You will pay {total} in store when you collect it.",
        "pickup-online": "Payment received, {name}. Your order is waiting in store: {date}, {slot}.",
        "delivery-delivery": "Order confirmed, {name}. We will deliver to {address} within 24–48 h. You will pay {total} to the courier on delivery.",
        "delivery-online": "Payment received, {name}. We will send your order to {address} within 24–48 h.",
      },
    },
    legal: {
      understood: "Got it",
      cookies: {
        link: "Cookie policy", title: "Cookie policy",
        paragraphs: [
          "We use technical cookies and similar technologies that are necessary to remember your cart, your language and your light or dark mode preference.",
          "If you accept, we may also use anonymous analytics cookies to improve the website. We never use them for personalised advertising without your consent.",
          "You can change your decision by clearing your browser data or by writing to us through the contact form.",
        ],
      },
      requirements: {
        link: "Purchase requirements", title: "Purchase requirements",
        paragraphs: [
          "To shop online you must be over 18 and provide truthful contact and delivery details.",
          "Prices include VAT. Home delivery costs {shippingCost} and is free on orders over {freeShipping}. Store pickup is always free.",
          "Orders reserved for pickup are kept for the chosen day. You can pay on collection, on delivery at home, or by card through a secure payment gateway.",
          "You have 30 days for exchanges and returns, provided the item is unworn and has its tag.",
        ],
      },
      shipping: {
        link: "Shipping & returns", title: "Shipping & returns",
        paragraphs: [
          "We deliver across mainland Spain within 24–48 working hours by tracked courier.",
          "You can return your order within 30 days of delivery, in store or by courier, and we will refund the amount using the same payment method.",
          "Made-to-measure tailoring cannot be returned, but includes one free adjustment.",
        ],
      },
    },
    cookies: {
      text: "We use technical cookies to remember your cart, language and theme. With your permission, also anonymous analytics cookies.",
      accept: "Accept", reject: "Reject", more: "More information",
    },
    toast: { login: "Customer sign-in will be available very soon." },
    error: {
      required: "This field is required", email: "Enter a valid email", phone: "Enter a valid phone number",
      postal: "Enter a 5-digit postcode", terms: "You must accept to continue",
    },
  },

  /* ------------------------------ VALENCIÀ ------------------------------ */
  va: {
    meta: {
      title: "NOVARO · Boutique de moda per a home",
      description: "Moda masculina atemporal a València. Camises, americanes, pantalons, punt, calçat i accessoris. Compra en línia i arreplega a la botiga o rep-ho a casa.",
    },
    aria: {
      skip: "Saltar al contingut", home: "NOVARO, inici", mainNav: "Navegació principal", mobileNav: "Menú mòbil",
      language: "Idioma", search: "Cercar a la pàgina", user: "Accedir al meu compte",
      theme: "Canviar mode clar o fosc", cart: "Obrir la cistella", menu: "Menú", close: "Tancar",
      top: "Tornar amunt", filters: "Filtrar per categoria",
    },
    topbar: { shipping: "Enviament gratuït des de {freeShipping}", hours: "Dl–Ds · 10:00–20:30" },
    logo: { sub: "Boutique · Home" },
    nav: { home: "Inici", about: "Nosaltres", collections: "Col·leccions", shop: "Botiga", tailoring: "Sastreria", contact: "Contacte" },
    menu: { search: "Cercar a la pàgina", language: "Idioma" },
    hero: {
      eyebrow: "Col·lecció Tardor · Hivern 2026",
      title: "Elegància serena per a l'home d'avui",
      text: "Peces atemporals, teixits nobles i patronatge precís. Una boutique pensada per a vestir bé sense esforç, a València i en línia.",
      ctaShop: "Veure la col·lecció", ctaTailoring: "Reservar cita", scroll: "Descobreix",
    },
    benefits: {
      shipping: { title: "Enviament en 24–48 h", text: "Gratuït des de {freeShipping}" },
      pickup: { title: "Arreplegada a la botiga", text: "Reserva i arreplega sense cost" },
      returns: { title: "Canvis en 30 dies", text: "Sense complicacions" },
      secure: { title: "Pagament segur", text: "Targeta, efectiu o contrareembossament" },
    },
    about: {
      eyebrow: "La nostra boutique",
      title: "Moda masculina amb criteri, feta per a durar",
      text1: "A NOVARO seleccionem cada peça pensant en l'home que vol vestir bé sense donar-hi massa voltes. Línies netes, colors sobris i acabats que es noten amb els anys.",
      text2: "Treballem amb tallers de proximitat i teixits d'origen certificat, i t'acompanyem a la botiga amb assessorament d'imatge i ajustos inclosos.",
      badge: "Boutique a València · des de 2011",
      f1: { title: "Teixits nobles", text: "Llana merino, cotó egipci i lli europeu triats pel seu tacte i la seua durabilitat." },
      f2: { title: "Patronatge precís", text: "Talls nets i proporcions equilibrades que afavoreixen qualsevol silueta." },
      f3: { title: "Atenció personal", text: "Assessorament d'imatge a la botiga i ajustos de sastreria inclosos." },
      stat1: "Anys d'ofici", stat2: "Clients satisfets", stat3: "Teixits certificats",
    },
    collections: {
      eyebrow: "Col·leccions", title: "Explora per categoria",
      text: "Des de la camisa de cada dia fins a l'americana per a les ocasions especials.", explore: "Explorar",
    },
    categories: {
      all: "Tot", shirts: "Camises", jackets: "Americanes i vestits", trousers: "Pantalons",
      knitwear: "Punt", shoes: "Calçat", accessories: "Accessoris",
    },
    shop: {
      eyebrow: "Botiga en línia", title: "Selecció de temporada",
      text: "Compra en línia i arreplega a la botiga o rep-ho a casa. Tria la forma de pagament que et resulte més còmoda.",
      sortLabel: "Ordenar per", count: "{count} productes",
    },
    sort: { featured: "Destacats", priceAsc: "Preu: de menor a major", priceDesc: "Preu: de major a menor" },
    product: {
      add: "Afegir", oneSize: "Talla única", sizeLabel: "Talla", new: "Novetat", sale: "Oferta",
      selectSize: "Selecciona una talla", added: "{name} afegit a la cistella",
    },
    tailoring: {
      eyebrow: "Sastreria a mida", title: "Un vestit que conta la teua història",
      text: "Dissenyem amb tu una peça única: teixit, tall i detalls. Els nostres sastres l'elaboren i l'ajusten fins que et seu com una segona pell.",
      s1: { title: "Cita i assessorament", text: "Parlem d'estil, ocasió i pressupost en una visita de 45 minuts." },
      s2: { title: "Presa de mides", text: "Més de 20 mesures i més de 200 teixits entre els quals triar." },
      s3: { title: "Prova i lliurament", text: "Primera prova en 2 setmanes i lliurament amb un ajust inclòs." },
      cta: "Reservar cita",
    },
    contact: {
      eyebrow: "Contacte", title: "Visita'ns o escriu-nos",
      text: "Estem al cor de València. Passa per la botiga o envia'ns un missatge i et respondrem en menys de 24 hores.",
      addressLabel: "Adreça", phoneLabel: "Telèfon", emailLabel: "Correu electrònic", hoursLabel: "Horari",
      hoursValue: "Dl–Ds · 10:00–14:00 i 17:00–20:30",
    },
    form: {
      name: "Nom i cognoms", email: "Correu electrònic", phone: "Telèfon", subject: "Motiu",
      subjectInfo: "Informació general", subjectOrder: "Consulta sobre una comanda",
      subjectTailoring: "Cita de sastreria", subjectOther: "Altres", message: "Missatge",
      privacy: "He llegit i accepte el tractament de les meues dades per a respondre a la consulta.",
      send: "Enviar missatge", success: "Gràcies! Hem rebut el teu missatge i et respondrem molt prompte.",
    },
    footer: {
      about: "Boutique de moda masculina a València. Peces atemporals, sastreria a mida i compra en línia amb arreplegada o enviament.",
      shop: "Botiga", info: "Informació", legal: "Legal",
      hoursWeek: "De dilluns a dissabte", hoursTimes: "10:00–14:00 · 17:00–20:30", hoursSunday: "Diumenge: tancat",
      payments: "Acceptem targeta, efectiu a la botiga i pagament contrareembossament.",
      copyright: "© {year} {brand} Boutique. Tots els drets reservats.",
      credit: "Imatges de mostra: Pexels",
    },
    search: {
      title: "Cercar a la pàgina", placeholder: "Escriu una paraula…", hint: "Escriu almenys 2 lletres per a cercar.",
      none: "Sense resultats per a «{query}»", count: "Coincidències: {count}", footer: "Peu de pàgina",
      clear: "Llevar ressaltat", esc: "Esc per a tancar",
    },
    cart: {
      title: "La teua cistella", empty: "La cistella està buida", emptyText: "Afig alguna peça per a començar.",
      continue: "Continuar comprant", promoLabel: "Codi promocional", promoPlaceholder: "Codi", promoApply: "Aplicar",
      promoApplied: "Codi {code} aplicat: −{percent}%", promoInvalid: "El codi no és vàlid", promoRemove: "Llevar",
      freeShippingLeft: "Et falten {amount} per a l'enviament a domicili gratuït",
      freeShippingDone: "Tens l'enviament a domicili gratuït",
      shippingNote: "Les despeses d'enviament es calculen en finalitzar la compra.",
      checkout: "Finalitzar compra", clear: "Buidar cistella", remove: "Eliminar",
      decrease: "Reduir quantitat", increase: "Augmentar quantitat", size: "Talla {size}",
      maxQty: "Màxim {max} unitats per article", cleared: "Cistella buidada", removed: "{name} eliminat",
    },
    checkout: {
      title: "Finalitzar compra", deliveryTitle: "1. Lliurament",
      pickup: { title: "Arreplegar a la botiga", text: "Reserva la comanda i arreplega-la sense cost." },
      ship: { title: "Enviament a domicili", text: "24–48 h · {shippingCost} (gratuït des de {freeShipping})" },
      pickupTitle: "Dades d'arreplegada", pickupDate: "Dia d'arreplegada", pickupSlot: "Franja horària",
      storeNote: "T'esperem a {address}. La comanda estarà reservada durant el dia triat.",
      addressTitle: "Adreça d'enviament", street: "Adreça", city: "Ciutat", postal: "Codi postal", province: "Província",
      customerTitle: "2. Les teues dades", paymentTitle: "3. Forma de pagament", unavailable: "No disponible amb este lliurament",
      notes: "Notes de la comanda (opcional)", termsPrefix: "He llegit i accepte els", termsLink: "requisits de compra",
      summary: "Resum de la comanda", selectPlaceholder: "Selecciona…",
      submit: { pickup: "Reservar comanda", delivery: "Confirmar comanda", online: "Continuar al pagament" },
    },
    pay: {
      pickup: { title: "Pagar en arreplegar", text: "Efectiu o targeta a la botiga" },
      delivery: { title: "Pagar en el lliurament", text: "Paga al repartidor en rebre la comanda" },
      online: { title: "Pagar en línia", text: "Targeta mitjançant passarel·la de pagament segura" },
    },
    summary: {
      subtotal: "Subtotal", discount: "Descompte ({code})", shipping: "Enviament", free: "Gratuït", total: "Total",
      vat: "IVA inclòs", pickupAt: "Arreplegada a la botiga · {date} · {slot}", shipTo: "Enviament a {address}",
    },
    payment: {
      title: "Pagament segur", amountLabel: "Vas a pagar", orderLabel: "Comanda", slotTitle: "Passarel·la de pagament",
      slotNote: "Ací s'integrarà la passarel·la de pagament de la botiga. Mode demostració: en continuar se simularà un pagament correcte.",
      pay: "Pagar {amount}", back: "Tornar", secure: "Pagament xifrat i segur",
    },
    confirmation: {
      title: "Gràcies per la teua comanda!", orderLabel: "Número de comanda",
      keep: "Guarda este número per a qualsevol consulta.", close: "Continuar comprant",
      msg: {
        "pickup-pickup": "Comanda reservada, {name}. T'esperem: {date}, de {slot}. Pagaràs {total} a la botiga en arreplegar-la.",
        "pickup-online": "Pagament rebut, {name}. La teua comanda t'espera a la botiga: {date}, de {slot}.",
        "delivery-delivery": "Comanda confirmada, {name}. L'enviarem a {address} en 24–48 h. Pagaràs {total} al repartidor en rebre-la.",
        "delivery-online": "Pagament rebut, {name}. Enviarem la teua comanda a {address} en 24–48 h.",
      },
    },
    legal: {
      understood: "Entés",
      cookies: {
        link: "Política de galetes", title: "Política de galetes",
        paragraphs: [
          "Utilitzem galetes i tecnologies semblants de caràcter tècnic, necessàries per a recordar la teua cistella, l'idioma i la preferència de mode clar o fosc.",
          "Si ho acceptes, també podrem utilitzar galetes d'anàlisi anònimes per a millorar el web. Mai les utilitzem per a publicitat personalitzada sense el teu consentiment.",
          "Pots canviar la teua decisió esborrant les dades del navegador o escrivint-nos des del formulari de contacte.",
        ],
      },
      requirements: {
        link: "Requisits de compra", title: "Requisits de compra",
        paragraphs: [
          "Per a comprar en línia has de ser major de 18 anys i facilitar dades de contacte i lliurament veraces.",
          "Els preus inclouen IVA. L'enviament a domicili costa {shippingCost} i és gratuït en comandes des de {freeShipping}. L'arreplegada a la botiga sempre és gratuïta.",
          "Les comandes reservades per a arreplegar es mantenen durant el dia triat. Pots pagar en arreplegar, en rebre la comanda a casa o amb targeta mitjançant una passarel·la de pagament segura.",
          "Disposes de 30 dies per a canvis i devolucions amb la peça sense usar i amb l'etiqueta.",
        ],
      },
      shipping: {
        link: "Enviaments i devolucions", title: "Enviaments i devolucions",
        paragraphs: [
          "Enviem a tota la península en 24–48 hores laborables mitjançant missatgeria amb seguiment.",
          "Pots tornar la comanda en 30 dies des del lliurament, a la botiga o per missatgeria, i et reemborsarem l'import pel mateix mitjà de pagament.",
          "Les peces de sastreria a mida no admeten devolució, però inclouen un ajust gratuït.",
        ],
      },
    },
    cookies: {
      text: "Usem galetes tècniques per a recordar la teua cistella, l'idioma i el tema. Amb el teu permís, també galetes d'anàlisi anònimes.",
      accept: "Acceptar", reject: "Rebutjar", more: "Més informació",
    },
    toast: { login: "L'accés de clients estarà disponible molt prompte." },
    error: {
      required: "Este camp és obligatori", email: "Introdueix un correu vàlid", phone: "Introdueix un telèfon vàlid",
      postal: "Introdueix un codi postal de 5 dígits", terms: "Has d'acceptar per a continuar",
    },
  },
};

/* ==========================================================================
   3. CATÁLOGO DE PRODUCTOS
   Precios en céntimos. "photo" es el identificador de la imagen de muestra;
   se sustituirá por las fotografías reales del cliente.
   ========================================================================== */
const CLOTHING_SIZES = ["S", "M", "L", "XL", "XXL"];
const TROUSER_SIZES = ["38", "40", "42", "44", "46"];
const SHOE_SIZES = ["40", "41", "42", "43", "44", "45"];
const BELT_SIZES = ["90", "100", "110"];

const PRODUCTS = [
  { id: "camisa-oxford", category: "shirts", price: 5990, photo: 9558723, isNew: true, sizes: CLOTHING_SIZES,
    name: { es: "Camisa Oxford azul cielo", en: "Sky blue Oxford shirt", va: "Camisa Oxford blau cel" } },
  { id: "camisa-popelin", category: "shirts", price: 4990, oldPrice: 6490, photo: 775771, sizes: CLOTHING_SIZES,
    name: { es: "Camisa de popelín blanca", en: "White poplin shirt", va: "Camisa de popelina blanca" } },
  { id: "americana-terciopelo", category: "jackets", price: 19900, photo: 31202765, isNew: true, sizes: CLOTHING_SIZES,
    name: { es: "Americana de terciopelo burdeos", en: "Burgundy velvet blazer", va: "Americana de vellut burdeus" } },
  { id: "americana-tabaco", category: "jackets", price: 17900, oldPrice: 21900, photo: 18726873, sizes: CLOTHING_SIZES,
    name: { es: "Americana de algodón color tabaco", en: "Tobacco cotton blazer", va: "Americana de cotó color tabac" } },
  { id: "pantalon-pinzas", category: "trousers", price: 7990, photo: 4443831, sizes: TROUSER_SIZES,
    name: { es: "Pantalón de pinzas gris", en: "Grey pleated trousers", va: "Pantaló de pinces gris" } },
  { id: "pantalon-chino", category: "trousers", price: 6990, photo: 27940204, sizes: TROUSER_SIZES,
    name: { es: "Pantalón chino de algodón", en: "Cotton chino trousers", va: "Pantaló chino de cotó" } },
  { id: "jersey-cuello-alto", category: "knitwear", price: 8990, photo: 20775170, isNew: true, sizes: CLOTHING_SIZES,
    name: { es: "Jersey de cuello alto gris", en: "Grey roll-neck sweater", va: "Jersei de coll alt gris" } },
  { id: "jersey-verde", category: "knitwear", price: 7490, oldPrice: 8990, photo: 9899978, sizes: CLOTHING_SIZES,
    name: { es: "Jersey de punto verde bosque", en: "Forest green knit sweater", va: "Jersei de punt verd bosc" } },
  { id: "zapatilla-blanca", category: "shoes", price: 11900, photo: 13536939, sizes: SHOE_SIZES,
    name: { es: "Zapatilla de piel blanca", en: "White leather sneakers", va: "Sabatilla de pell blanca" } },
  { id: "botin-ante", category: "shoes", price: 13900, photo: 30272899, isNew: true, sizes: SHOE_SIZES,
    name: { es: "Botín de ante marrón", en: "Brown suede boots", va: "Botí d'ant marró" } },
  { id: "cinturon-cognac", category: "accessories", price: 3990, photo: 11263089, sizes: BELT_SIZES,
    name: { es: "Cinturón de piel cognac", en: "Cognac leather belt", va: "Cinturó de pell cognac" } },
  { id: "reloj-negro", category: "accessories", price: 8900, photo: 9221906, sizes: [ONE_SIZE],
    name: { es: "Reloj analógico negro", en: "Black analogue watch", va: "Rellotge analògic negre" } },
];

/* ==========================================================================
   4. REFERENCIAS AL DOM Y ESTADO
   ========================================================================== */
const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));

const dom = {
  body: document.body,
  header: $("#site-header"),
  menuToggle: $("#menu-toggle"),
  mobileMenu: $("#mobile-menu"),
  scrollProgress: $("#scroll-progress"),
  backToTop: $("#back-to-top"),
  themeToggle: $("#theme-toggle"),
  themeColorMeta: $("#theme-color-meta"),
  metaDescription: $("#meta-description"),
  userButton: $("#user-button"),
  cartButton: $("#cart-button"),
  cartCount: $("#cart-count"),
  heroVideo: $("#hero-video"),

  productGrid: $("#product-grid"),
  productCount: $("#product-count"),
  sortSelect: $("#sort-select"),
  filterChips: $$("[data-filter]"),

  cartDrawer: $("#cart-drawer"),
  cartTitleCount: $("#cart-title-count"),
  cartList: $("#cart-list"),
  cartEmpty: $("#cart-empty"),
  cartFooter: $("#cart-footer"),
  cartTotals: $("#cart-totals"),
  shippingProgress: $("#shipping-progress"),
  shippingProgressText: $("#shipping-progress-text"),
  shippingProgressBar: $("#shipping-progress-bar"),
  promoForm: $("#promo-form"),
  promoInput: $("#promo-input"),
  promoMessage: $("#promo-message"),
  promoError: $("#promo-error"),
  checkoutButton: $("#checkout-button"),
  clearCartButton: $("#clear-cart-button"),

  checkoutModal: $("#checkout-modal"),
  checkoutForm: $("#checkout-form"),
  pickupDate: $("#pickup-date"),
  checkoutSummary: $("#checkout-summary"),
  checkoutSubmit: $("#checkout-submit"),

  paymentModal: $("#payment-modal"),
  paymentAmount: $("#payment-amount"),
  paymentOrderId: $("#payment-order-id"),
  paymentDelivery: $("#payment-delivery"),
  paymentSummary: $("#payment-summary"),
  paymentPayButton: $("#payment-pay-button"),
  paymentBackButton: $("#payment-back-button"),

  confirmationModal: $("#confirmation-modal"),
  confirmationMessage: $("#confirmation-message"),
  confirmationOrderId: $("#confirmation-order-id"),
  confirmationSummary: $("#confirmation-summary"),

  searchModal: $("#search-modal"),
  searchForm: $("#search-form"),
  searchInput: $("#search-input"),
  searchStatus: $("#search-status"),
  searchResults: $("#search-results"),
  searchClearButton: $("#search-clear-button"),
  clearHighlightsButton: $("#clear-highlights-button"),

  legalModal: $("#legal-modal"),
  legalTitle: $("#legal-title"),
  legalBody: $("#legal-body"),

  cookieBanner: $("#cookie-banner"),
  cookieAccept: $("#cookie-accept"),
  cookieReject: $("#cookie-reject"),

  toastRegion: $("#toast-region"),
  contactForm: $("#contact-form"),
  contactSuccess: $("#contact-success"),
  contactSubject: $("#contact-subject"),
};

const state = {
  language: "es",
  cart: [],            // [{ id, size, qty }]
  promoCode: null,
  filter: "all",
  sort: "featured",
  selectedSizes: {},   // { productId: talla elegida }
  pendingOrder: null,  // pedido a la espera del pago online
};

const navLinks = $$(".site-nav a, .mobile-menu__link");
const navSections = $$(".site-nav a").map((link) => $(link.getAttribute("href"))).filter(Boolean);

/* ==========================================================================
   5. UTILIDADES
   ========================================================================== */
function readStorage(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw === null ? fallback : JSON.parse(raw);
  } catch {
    return fallback;
  }
}

function writeStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* Almacenamiento no disponible (modo privado o restringido): se ignora */
  }
}

const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* Quita acentos carácter a carácter para conservar la longitud del texto */
const stripAccents = (text) => text.split("").map((char) => char.normalize("NFD")[0]).join("");
const normalizeForSearch = (text) => stripAccents(text).toLowerCase();

const truncate = (text, maxLength) => (text.length > maxLength ? `${text.slice(0, maxLength - 1)}…` : text);
const capitalize = (text) => text.charAt(0).toUpperCase() + text.slice(1);
const icon = (name) => `<svg class="icon" aria-hidden="true"><use href="#icon-${name}"/></svg>`;
const getProduct = (id) => PRODUCTS.find((product) => product.id === id);
const getProductName = (product) => product.name[state.language];
const imageUrl = (photoId, width, height) =>
  `https://images.pexels.com/photos/${photoId}/pexels-photo-${photoId}.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=${width}&h=${height}`;

const numberFormatters = new Map();

/* Formatea céntimos como moneda según el idioma activo */
function formatPrice(cents, { whole = false } = {}) {
  const { locale } = LANGUAGES[state.language];
  const cacheKey = `${locale}|${whole}`;
  if (!numberFormatters.has(cacheKey)) {
    const fractionOptions = whole ? { minimumFractionDigits: 0, maximumFractionDigits: 0 } : {};
    numberFormatters.set(cacheKey, new Intl.NumberFormat(locale, { style: "currency", currency: "EUR", ...fractionOptions }));
  }
  return numberFormatters.get(cacheKey).format(cents / 100);
}

/* ==========================================================================
   6. IDIOMA
   ========================================================================== */
function resolveKey(dictionary, path) {
  return path.split(".").reduce((node, part) => node?.[part], dictionary);
}

function getBaseParams() {
  return {
    brand: STORE_INFO.brand,
    year: new Date().getFullYear(),
    address: STORE_INFO.address,
    freeShipping: formatPrice(SHOP_CONFIG.freeShippingThreshold, { whole: true }),
    shippingCost: formatPrice(SHOP_CONFIG.shippingCost),
  };
}

/* Sustituye los marcadores {nombre} de un texto */
function interpolate(text, params = {}) {
  const values = { ...getBaseParams(), ...params };
  return text.replace(/\{(\w+)\}/g, (_, name) => values[name] ?? "");
}

/* Devuelve la traducción de una clave (con respaldo en español) */
function t(path, params = {}) {
  const value = resolveKey(translations[state.language], path) ?? resolveKey(translations.es, path);
  if (value === undefined) return path;
  return typeof value === "string" ? interpolate(value, params) : value;
}

function detectInitialLanguage() {
  const saved = readStorage(STORAGE_KEYS.language, null);
  if (typeof saved === "string" && saved in LANGUAGES) return saved;
  const browserLanguage = (navigator.language || "es").toLowerCase();
  if (browserLanguage.startsWith("ca")) return "va";
  if (browserLanguage.startsWith("en")) return "en";
  return "es";
}

/* Aplica los textos del idioma activo a todos los elementos marcados */
function applyTranslations() {
  document.documentElement.lang = LANGUAGES[state.language].htmlLang;
  document.title = t("meta.title");
  dom.metaDescription.setAttribute("content", t("meta.description"));

  $$("[data-i18n]").forEach((element) => {
    element.textContent = t(element.dataset.i18n);
  });
  $$("[data-i18n-placeholder]").forEach((element) => {
    element.setAttribute("placeholder", t(element.dataset.i18nPlaceholder));
  });
  $$("[data-i18n-label]").forEach((element) => {
    const label = t(element.dataset.i18nLabel);
    element.setAttribute("aria-label", label);
    if (element.matches("button, a")) element.setAttribute("title", label);
  });
  $$("[data-lang-option]").forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.langOption === state.language));
  });
}

/* Cambia el idioma y vuelve a pintar los contenidos dinámicos */
function setLanguage(language, { persist = true } = {}) {
  if (!(language in LANGUAGES)) return;
  clearHighlights();
  state.language = language;
  if (persist) writeStorage(STORAGE_KEYS.language, language);

  applyTranslations();
  renderProducts();
  renderCart();
  refreshPickupDates();
  syncCheckoutOptions();
  $$(".field.has-error [data-validate]").forEach(validateField);
}

/* ==========================================================================
   7. TEMA CLARO / OSCURO
   ========================================================================== */
function applyTheme(theme) {
  const isDark = theme === "dark";
  dom.body.classList.toggle("theme-dark", isDark);
  dom.body.classList.toggle("theme-light", !isDark);
  dom.themeToggle.setAttribute("aria-pressed", String(isDark));
  dom.themeColorMeta.setAttribute("content", isDark ? "#121110" : "#faf8f4");
}

function toggleTheme() {
  const nextTheme = dom.body.classList.contains("theme-dark") ? "light" : "dark";
  applyTheme(nextTheme);
  writeStorage(STORAGE_KEYS.theme, nextTheme);
}

function initTheme() {
  const savedTheme = readStorage(STORAGE_KEYS.theme, null);
  const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  applyTheme(savedTheme ?? (systemPrefersDark ? "dark" : "light"));
}

/* ==========================================================================
   8. CABECERA: SCROLL, MENÚ ACTIVO Y SCROLL SUAVE
   ========================================================================== */
let isScrollUpdateQueued = false;

/* Agrupa los eventos de scroll en un solo cálculo por fotograma */
function requestScrollUpdate() {
  if (isScrollUpdateQueued) return;
  isScrollUpdateQueued = true;
  requestAnimationFrame(() => {
    updateScrollState();
    isScrollUpdateQueued = false;
  });
}

function updateScrollState() {
  const scrollTop = window.scrollY;
  const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;

  dom.header.classList.toggle("is-scrolled", scrollTop > UI_CONFIG.scrollThreshold);
  dom.scrollProgress.style.transform = `scaleX(${scrollableHeight > 0 ? scrollTop / scrollableHeight : 0})`;
  dom.backToTop.classList.toggle("is-visible", scrollTop > UI_CONFIG.backToTopOffset);
  updateActiveNavLink(scrollTop, scrollableHeight);
}

/* Marca en el menú la sección que se está viendo */
function updateActiveNavLink(scrollTop, scrollableHeight) {
  const marker = scrollTop + dom.header.offsetHeight + window.innerHeight * 0.25;
  let currentSection = navSections[0];

  navSections.forEach((section) => {
    if (section.getBoundingClientRect().top + scrollTop <= marker) currentSection = section;
  });
  if (scrollableHeight > 0 && scrollTop >= scrollableHeight - 4) currentSection = navSections[navSections.length - 1];

  navLinks.forEach((link) => {
    const isActive = link.getAttribute("href") === `#${currentSection.id}`;
    link.classList.toggle("is-active", isActive);
    if (isActive) link.setAttribute("aria-current", "true");
    else link.removeAttribute("aria-current");
  });
}

/* Desplaza suavemente hasta una sección interna */
function scrollToHash(hash) {
  const target = hash.length > 1 ? $(hash) : null;
  if (!target) return;

  target.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth", block: "start" });
  if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
  target.focus({ preventScroll: true });
  try {
    history.pushState(null, "", hash);
  } catch {
    /* Entornos restringidos (iframes aislados): la URL no se actualiza */
  }
}

function handleAnchorClick(event, anchor) {
  const hash = anchor.getAttribute("href");
  if (hash.length < 2 || !$(hash)) return;
  event.preventDefault();
  closeMobileMenu();
  scrollToHash(hash);
}

/* ==========================================================================
   9. MENÚ MÓVIL
   ========================================================================== */
function setMobileMenu(isOpen) {
  dom.mobileMenu.classList.toggle("is-open", isOpen);
  dom.mobileMenu.setAttribute("aria-hidden", String(!isOpen));
  dom.header.classList.toggle("is-menu-open", isOpen);
  dom.menuToggle.setAttribute("aria-expanded", String(isOpen));
  syncOverlayState();
}

const isMobileMenuOpen = () => dom.mobileMenu.classList.contains("is-open");

function closeMobileMenu() {
  if (isMobileMenuOpen()) setMobileMenu(false);
}

/* ==========================================================================
   10. MODALES
   ========================================================================== */
const openModals = []; // pila de { modal, opener }

/* Bloquea el scroll de fondo y actualiza el aviso de resaltado */
function syncOverlayState() {
  dom.body.classList.toggle("no-scroll", isMobileMenuOpen() || openModals.length > 0);
  updateHighlightChip();
}

function openModal(modal, opener = document.activeElement) {
  if (!modal || openModals.some((entry) => entry.modal === modal)) return;

  closeMobileMenu();
  openModals.push({ modal, opener });
  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  modal.dispatchEvent(new CustomEvent("modal:open"));
  syncOverlayState();

  const focusTarget = $("[data-autofocus]", modal) ?? $(".modal__panel", modal);
  focusTarget.focus({ preventScroll: true });
}

function closeModal(modal) {
  const index = openModals.findIndex((entry) => entry.modal === modal);
  if (index === -1) return;

  const [{ opener }] = openModals.splice(index, 1);
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  syncOverlayState();
  if (opener && opener.isConnected) opener.focus({ preventScroll: true });
}

const isModalOpen = (modal) => openModals.some((entry) => entry.modal === modal);

/* Mantiene el foco dentro del modal superior al usar la tecla Tab */
function trapFocus(event, modal) {
  const focusable = $$(FOCUSABLE_SELECTOR, modal).filter((element) => element.getClientRects().length > 0);
  if (focusable.length === 0) return;

  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  const panel = $(".modal__panel", modal);

  if (event.shiftKey && (document.activeElement === first || document.activeElement === panel)) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
}

function handleKeydown(event) {
  if (event.key === "Escape") {
    if (openModals.length > 0) closeModal(openModals[openModals.length - 1].modal);
    else closeMobileMenu();
    return;
  }
  if (event.key === "Tab" && openModals.length > 0) {
    trapFocus(event, openModals[openModals.length - 1].modal);
  }
}

/* ==========================================================================
   11. BÚSQUEDA EN LA PÁGINA
   ========================================================================== */
const searchState = { marks: [], timer: null };

/* Recoge los nodos de texto visibles de <main> y del pie de página */
function collectSearchableTextNodes() {
  const nodes = [];
  $$("main, .site-footer").forEach((root) => {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode: (node) =>
        node.nodeValue.trim() && !node.parentElement.closest(SEARCH_EXCLUDED_SELECTOR)
          ? NodeFilter.FILTER_ACCEPT
          : NodeFilter.FILTER_REJECT,
    });
    while (walker.nextNode()) nodes.push(walker.currentNode);
  });
  return nodes;
}

/* Envuelve cada coincidencia en <mark> y devuelve la lista de marcas creadas */
function highlightQuery(query) {
  const normalizedQuery = normalizeForSearch(query);
  const marks = [];

  for (const node of collectSearchableTextNodes()) {
    if (marks.length >= UI_CONFIG.maxHighlights) break;

    const text = node.nodeValue;
    const normalizedText = normalizeForSearch(text);
    let matchIndex = normalizedText.indexOf(normalizedQuery);
    if (matchIndex === -1) continue;

    const fragment = document.createDocumentFragment();
    let cursor = 0;
    while (matchIndex !== -1) {
      fragment.append(text.slice(cursor, matchIndex));
      const mark = document.createElement("mark");
      mark.className = "search-highlight";
      mark.textContent = text.slice(matchIndex, matchIndex + normalizedQuery.length);
      fragment.append(mark);
      marks.push(mark);
      cursor = matchIndex + normalizedQuery.length;
      matchIndex = normalizedText.indexOf(normalizedQuery, cursor);
    }
    fragment.append(text.slice(cursor));
    node.replaceWith(fragment);
  }
  return marks;
}

/* Elimina el resaltado y restaura el texto original */
function clearHighlights() {
  searchState.marks.forEach((mark) => {
    const parent = mark.parentNode;
    if (!parent || !mark.isConnected) return;
    mark.replaceWith(document.createTextNode(mark.textContent));
    parent.normalize();
  });
  searchState.marks = [];
  updateHighlightChip();
}

function updateHighlightChip() {
  const visibleMarks = searchState.marks.filter((mark) => mark.isConnected).length;
  dom.clearHighlightsButton.hidden = visibleMarks === 0 || isModalOpen(dom.searchModal);
  dom.clearHighlightsButton.textContent = `${t("search.clear")} (${visibleMarks})`;
}

function getSectionLabel(mark) {
  const section = mark.closest("section[id], footer");
  if (section && section.matches("footer")) return t("search.footer");
  const navLink = section ? $(`.site-nav a[href="#${section.id}"]`) : null;
  return navLink ? navLink.textContent.trim() : t("nav.home");
}

function goToMark(mark) {
  closeModal(dom.searchModal);
  mark.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth", block: "center" });
  searchState.marks.forEach((item) => item.classList.remove("is-current"));
  mark.classList.add("is-current");
}

function createSearchResultItem(mark, container) {
  const item = document.createElement("li");
  const button = document.createElement("button");
  const section = document.createElement("span");
  const snippet = document.createElement("span");

  button.type = "button";
  button.className = "search-result";
  section.className = "search-result__section";
  section.textContent = getSectionLabel(mark);
  snippet.className = "search-result__snippet";
  snippet.textContent = truncate(container.textContent.replace(/\s+/g, " ").trim(), 90);

  button.append(section, snippet);
  button.addEventListener("click", () => goToMark(mark));
  item.append(button);
  return item;
}

function renderSearchResults(query) {
  dom.searchResults.replaceChildren();

  if (searchState.marks.length === 0) {
    dom.searchStatus.textContent = t("search.none", { query });
    return;
  }
  dom.searchStatus.textContent = t("search.count", { count: searchState.marks.length });

  const usedContainers = new Set();
  const fragment = document.createDocumentFragment();
  for (const mark of searchState.marks) {
    const container = mark.parentElement;
    if (usedContainers.has(container)) continue;
    if (usedContainers.size >= UI_CONFIG.maxSearchResults) break;
    usedContainers.add(container);
    fragment.append(createSearchResultItem(mark, container));
  }
  dom.searchResults.append(fragment);
}

function runSearch() {
  const query = dom.searchInput.value.trim();
  clearHighlights();
  dom.searchResults.replaceChildren();

  if (query.length < UI_CONFIG.searchMinLength) {
    dom.searchStatus.textContent = t("search.hint");
    return;
  }
  searchState.marks = highlightQuery(query);
  renderSearchResults(query);
}

function handleSearchInput() {
  clearTimeout(searchState.timer);
  searchState.timer = setTimeout(runSearch, UI_CONFIG.searchDelay);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  clearTimeout(searchState.timer);
  runSearch();
  if (searchState.marks.length > 0) goToMark(searchState.marks[0]);
}

function resetSearch() {
  clearTimeout(searchState.timer);
  clearHighlights();
  dom.searchInput.value = "";
  dom.searchResults.replaceChildren();
  dom.searchStatus.textContent = t("search.hint");
  dom.searchInput.focus();
}

function prepareSearchModal() {
  if (dom.searchInput.value.trim().length < UI_CONFIG.searchMinLength) {
    dom.searchStatus.textContent = t("search.hint");
  }
  dom.searchInput.select();
}

/* ==========================================================================
   12. TIENDA: FILTROS Y PRODUCTOS
   ========================================================================== */
function getVisibleProducts() {
  const products = state.filter === "all" ? [...PRODUCTS] : PRODUCTS.filter((product) => product.category === state.filter);
  if (state.sort === "priceAsc") products.sort((a, b) => a.price - b.price);
  if (state.sort === "priceDesc") products.sort((a, b) => b.price - a.price);
  return products;
}

/* Los productos de talla única la tienen seleccionada por defecto */
function getSelectedSize(product) {
  return product.sizes.length === 1 ? product.sizes[0] : state.selectedSizes[product.id];
}

const formatSize = (size) => (size === ONE_SIZE ? t("product.oneSize") : t("cart.size", { size }));

function createProductCardMarkup(product, index) {
  const name = getProductName(product);
  const selectedSize = getSelectedSize(product);
  const badges = [];
  if (product.isNew) badges.push(`<span class="badge">${t("product.new")}</span>`);
  if (product.oldPrice) {
    const discountPercent = Math.round((1 - product.price / product.oldPrice) * 100);
    badges.push(`<span class="badge badge--sale">−${discountPercent}%</span>`);
  }

  const sizeChips = product.sizes
    .map((size) => {
      const isSelected = size === selectedSize;
      const label = size === ONE_SIZE ? t("product.oneSize") : size;
      return `<button type="button" class="size-chip${isSelected ? " is-selected" : ""}" data-size="${size}" aria-pressed="${isSelected}">${label}</button>`;
    })
    .join("");

  return `
    <article class="product-card" data-product-id="${product.id}" style="--index:${index}">
      <div class="product-card__media">
        <img src="${imageUrl(product.photo, 640, 800)}" alt="${name}" width="640" height="800" loading="lazy">
        <div class="product-card__badges">${badges.join("")}</div>
      </div>
      <div class="product-card__body">
        <p class="product-card__category">${t(`categories.${product.category}`)}</p>
        <h3 class="product-card__name">${name}</h3>
        <p class="price">
          <span>${formatPrice(product.price)}</span>
          ${product.oldPrice ? `<span class="price__old">${formatPrice(product.oldPrice)}</span>` : ""}
        </p>
        <div class="size-options" role="group" aria-label="${t("product.sizeLabel")}">${sizeChips}</div>
        <button type="button" class="btn btn--primary btn--small" data-add-to-cart aria-label="${t("product.add")}: ${name}">
          ${icon("bag")}<span>${t("product.add")}</span>
        </button>
      </div>
    </article>`;
}

function renderProducts() {
  const products = getVisibleProducts();
  dom.productGrid.innerHTML = products.map(createProductCardMarkup).join("");
  dom.productCount.textContent = t("shop.count", { count: products.length });
}

function setProductFilter(filter) {
  state.filter = filter;
  dom.filterChips.forEach((chip) => {
    const isActive = chip.dataset.filter === filter;
    chip.classList.toggle("is-active", isActive);
    chip.setAttribute("aria-pressed", String(isActive));
  });
  clearHighlights();
  renderProducts();
}

function selectSize(card, product, size) {
  state.selectedSizes[product.id] = size;
  card.classList.remove("is-size-missing");
  $$(".size-chip", card).forEach((chip) => {
    const isSelected = chip.dataset.size === size;
    chip.classList.toggle("is-selected", isSelected);
    chip.setAttribute("aria-pressed", String(isSelected));
  });
}

function handleProductGridClick(event) {
  const card = event.target.closest(".product-card");
  if (!card) return;
  const product = getProduct(card.dataset.productId);

  const sizeChip = event.target.closest(".size-chip");
  if (sizeChip) {
    selectSize(card, product, sizeChip.dataset.size);
    return;
  }

  if (event.target.closest("[data-add-to-cart]")) {
    const size = getSelectedSize(product);
    if (!size) {
      /* Reinicia la animación de aviso y pide elegir talla */
      card.classList.remove("is-size-missing");
      void card.offsetWidth;
      card.classList.add("is-size-missing");
      showToast(t("product.selectSize"));
      return;
    }
    addToCart(product.id, size);
  }
}

/* ==========================================================================
   13. CARRITO
   ========================================================================== */
const getLineKey = (id, size) => `${id}|${size}`;
const findCartLine = (key) => state.cart.find((line) => getLineKey(line.id, line.size) === key);

/* Descarta del carrito guardado cualquier línea que ya no sea válida */
function sanitizeCart(rawCart) {
  if (!Array.isArray(rawCart)) return [];
  return rawCart
    .filter((line) => {
      const product = getProduct(line?.id);
      return product && product.sizes.includes(line.size) && Number.isInteger(line.qty) && line.qty > 0;
    })
    .map((line) => ({ id: line.id, size: line.size, qty: Math.min(line.qty, SHOP_CONFIG.maxQuantityPerItem) }));
}

function saveCart() {
  writeStorage(STORAGE_KEYS.cart, state.cart);
  writeStorage(STORAGE_KEYS.promo, state.promoCode);
}

function getCartLines() {
  return state.cart.map((line) => {
    const product = getProduct(line.id);
    return { product, size: line.size, qty: line.qty, lineTotal: product.price * line.qty };
  });
}

/* Líneas preparadas para mostrar en resúmenes y guardar en el pedido */
function getCartDisplayItems() {
  return getCartLines().map(({ product, size, qty, lineTotal }) => ({
    id: product.id,
    name: getProductName(product),
    size,
    qty,
    unitPrice: product.price,
    lineTotal,
    image: imageUrl(product.photo, 104, 130),
  }));
}

/* Calcula subtotal, descuento, envío y total. Sin método de entrega, el envío es null */
function calculateTotals(deliveryMethod = null) {
  const subtotal = getCartLines().reduce((sum, line) => sum + line.lineTotal, 0);
  const percent = SHOP_CONFIG.promoCodes[state.promoCode] ?? 0;
  const discount = Math.round((subtotal * percent) / 100);
  const discountedSubtotal = subtotal - discount;

  let shipping = null;
  if (deliveryMethod === "pickup") shipping = 0;
  if (deliveryMethod === "delivery") {
    shipping = discountedSubtotal >= SHOP_CONFIG.freeShippingThreshold ? 0 : SHOP_CONFIG.shippingCost;
  }

  return {
    subtotal,
    discount,
    promoCode: discount > 0 ? state.promoCode : null,
    shipping,
    total: discountedSubtotal + (shipping ?? 0),
  };
}

function createTotalsMarkup({ subtotal, discount, promoCode, shipping, total }) {
  const rows = [`<div><dt>${t("summary.subtotal")}</dt><dd>${formatPrice(subtotal)}</dd></div>`];
  if (discount > 0) {
    rows.push(`<div class="totals__discount"><dt>${t("summary.discount", { code: promoCode })}</dt><dd>−${formatPrice(discount)}</dd></div>`);
  }
  if (shipping !== null) {
    rows.push(`<div><dt>${t("summary.shipping")}</dt><dd>${shipping === 0 ? t("summary.free") : formatPrice(shipping)}</dd></div>`);
  }
  rows.push(`<div class="totals__total"><dt>${t("summary.total")}<small>${t("summary.vat")}</small></dt><dd>${formatPrice(total)}</dd></div>`);
  return `<dl class="totals">${rows.join("")}</dl>`;
}

function createOrderItemsMarkup(items) {
  const rows = items
    .map(
      (item) => `
      <li class="summary-item">
        <img src="${item.image}" alt="" width="52" height="65" loading="lazy">
        <div>
          <p class="summary-item__name">${item.name}</p>
          <p class="summary-item__meta">${formatSize(item.size)} · ×${item.qty}</p>
        </div>
        <p class="summary-item__price">${formatPrice(item.lineTotal)}</p>
      </li>`
    )
    .join("");
  return `<ul class="summary-items">${rows}</ul>`;
}

function createCartItemMarkup({ product, size, qty, lineTotal }) {
  const name = getProductName(product);
  return `
    <li class="cart-item" data-line-key="${getLineKey(product.id, size)}">
      <img class="cart-item__image" src="${imageUrl(product.photo, 160, 200)}" alt="" width="76" height="95" loading="lazy">
      <div>
        <p class="cart-item__name">${name}</p>
        <p class="cart-item__meta">${formatSize(size)}</p>
        <div class="quantity" role="group" aria-label="${name}">
          <button type="button" data-cart-action="decrease" aria-label="${t("cart.decrease")}" ${qty <= 1 ? "disabled" : ""}>${icon("minus")}</button>
          <span class="quantity__value" aria-live="polite">${qty}</span>
          <button type="button" data-cart-action="increase" aria-label="${t("cart.increase")}" ${qty >= SHOP_CONFIG.maxQuantityPerItem ? "disabled" : ""}>${icon("plus")}</button>
        </div>
      </div>
      <div class="cart-item__side">
        <p class="cart-item__price">${formatPrice(lineTotal)}</p>
        <button type="button" class="cart-item__remove" data-cart-action="remove" aria-label="${t("cart.remove")}: ${name}">${icon("trash")}</button>
      </div>
    </li>`;
}

function renderPromoState() {
  dom.promoError.textContent = "";
  if (!state.promoCode) {
    dom.promoMessage.textContent = "";
    return;
  }
  const percent = SHOP_CONFIG.promoCodes[state.promoCode];
  dom.promoMessage.innerHTML = `<span>${t("cart.promoApplied", { code: state.promoCode, percent })}</span>
    <button type="button" class="link-button" data-promo-remove>${t("cart.promoRemove")}</button>`;
}

function renderShippingProgress(totals) {
  const netSubtotal = totals.subtotal - totals.discount;
  const remaining = SHOP_CONFIG.freeShippingThreshold - netSubtotal;
  dom.shippingProgressText.textContent =
    remaining > 0 ? t("cart.freeShippingLeft", { amount: formatPrice(remaining) }) : t("cart.freeShippingDone");
  dom.shippingProgressBar.style.transform = `scaleX(${Math.min(1, netSubtotal / SHOP_CONFIG.freeShippingThreshold)})`;
}

/* Vuelve a pintar el carrito completo, el contador y el resumen del checkout */
function renderCart() {
  const lines = getCartLines();
  const itemCount = lines.reduce((sum, line) => sum + line.qty, 0);
  const totals = calculateTotals();
  const isEmpty = lines.length === 0;

  dom.cartCount.textContent = itemCount;
  dom.cartCount.classList.toggle("has-items", itemCount > 0);
  dom.cartButton.setAttribute("aria-label", `${t("aria.cart")} (${itemCount})`);
  dom.cartTitleCount.textContent = itemCount > 0 ? `(${itemCount})` : "";

  dom.cartEmpty.hidden = !isEmpty;
  dom.cartList.hidden = isEmpty;
  dom.cartFooter.hidden = isEmpty;
  dom.shippingProgress.hidden = isEmpty;

  dom.cartList.innerHTML = lines.map(createCartItemMarkup).join("");
  dom.cartTotals.innerHTML = createTotalsMarkup(totals);
  renderPromoState();
  renderShippingProgress(totals);
  renderCheckoutSummary();
}

function bumpCartBadge() {
  dom.cartCount.classList.remove("is-bumped");
  void dom.cartCount.offsetWidth;
  dom.cartCount.classList.add("is-bumped");
}

function addToCart(productId, size) {
  const product = getProduct(productId);
  const existingLine = findCartLine(getLineKey(productId, size));

  if (existingLine && existingLine.qty >= SHOP_CONFIG.maxQuantityPerItem) {
    showToast(t("cart.maxQty", { max: SHOP_CONFIG.maxQuantityPerItem }));
    return;
  }
  if (existingLine) existingLine.qty += 1;
  else state.cart.push({ id: productId, size, qty: 1 });

  saveCart();
  renderCart();
  bumpCartBadge();
  showToast(t("product.added", { name: getProductName(product) }));
}

function changeQuantity(lineKey, delta) {
  const line = findCartLine(lineKey);
  if (!line) return;
  line.qty = Math.min(SHOP_CONFIG.maxQuantityPerItem, Math.max(1, line.qty + delta));
  saveCart();
  renderCart();
}

function removeCartLine(lineKey) {
  const line = findCartLine(lineKey);
  if (!line) return;
  const name = getProductName(getProduct(line.id));
  state.cart = state.cart.filter((item) => item !== line);
  saveCart();
  renderCart();
  showToast(t("cart.removed", { name }));
}

function clearCart() {
  state.cart = [];
  state.promoCode = null;
  saveCart();
  renderCart();
  showToast(t("cart.cleared"));
}

function handleCartListClick(event) {
  const actionButton = event.target.closest("[data-cart-action]");
  if (!actionButton) return;

  const lineKey = actionButton.closest(".cart-item").dataset.lineKey;
  const action = actionButton.dataset.cartAction;

  if (action === "remove") {
    removeCartLine(lineKey);
    $(".modal__panel", dom.cartDrawer).focus({ preventScroll: true });
    return;
  }
  changeQuantity(lineKey, action === "increase" ? 1 : -1);
  /* El listado se vuelve a pintar: se devuelve el foco al mismo control */
  const sameButton = $(`[data-line-key="${lineKey}"] [data-cart-action="${action}"]`, dom.cartList);
  if (sameButton && !sameButton.disabled) sameButton.focus();
}

function applyPromoCode(rawCode) {
  const code = rawCode.trim().toUpperCase();
  if (!code) return;
  if (!(code in SHOP_CONFIG.promoCodes)) {
    dom.promoError.textContent = t("cart.promoInvalid");
    return;
  }
  state.promoCode = code;
  dom.promoInput.value = "";
  saveCart();
  renderCart();
}

function removePromoCode() {
  state.promoCode = null;
  saveCart();
  renderCart();
}

/* ==========================================================================
   14. CHECKOUT, PAGO Y CONFIRMACIÓN
   ========================================================================== */
const getCheckoutChoice = (name) => dom.checkoutForm.elements[name].value;

const toIsoDate = (date) =>
  [date.getFullYear(), String(date.getMonth() + 1).padStart(2, "0"), String(date.getDate()).padStart(2, "0")].join("-");

/* Genera los próximos días de recogida (la tienda cierra los domingos) */
function refreshPickupDates() {
  const previousValue = dom.pickupDate.value;
  const formatter = new Intl.DateTimeFormat(LANGUAGES[state.language].locale, { weekday: "long", day: "numeric", month: "long" });
  const options = [`<option value="">${t("checkout.selectPlaceholder")}</option>`];

  const day = new Date();
  while (options.length <= SHOP_CONFIG.pickupDaysAhead) {
    day.setDate(day.getDate() + 1);
    if (day.getDay() === 0) continue;
    options.push(`<option value="${toIsoDate(day)}">${capitalize(formatter.format(day))}</option>`);
  }
  dom.pickupDate.innerHTML = options.join("");
  dom.pickupDate.value = previousValue;
  if (dom.pickupDate.selectedIndex === -1) dom.pickupDate.selectedIndex = 0;
}

/* Muestra los campos según la entrega y limita las formas de pago permitidas */
function syncCheckoutOptions() {
  const deliveryMethod = getCheckoutChoice("delivery");

  $$("[data-delivery-group]", dom.checkoutForm).forEach((group) => {
    const isActive = group.dataset.deliveryGroup === deliveryMethod;
    group.hidden = !isActive;
    group.disabled = !isActive;
  });

  const allowedPayments = SHOP_CONFIG.paymentsByDelivery[deliveryMethod];
  $$('input[name="payment"]', dom.checkoutForm).forEach((input) => {
    const isAllowed = allowedPayments.includes(input.value);
    input.disabled = !isAllowed;
    $(".option__note", input.closest(".option")).hidden = isAllowed;
  });
  if (!allowedPayments.includes(getCheckoutChoice("payment"))) {
    $(`input[name="payment"][value="${allowedPayments[0]}"]`, dom.checkoutForm).checked = true;
  }

  dom.checkoutSubmit.textContent = t(`checkout.submit.${getCheckoutChoice("payment")}`);
  renderCheckoutSummary();
}

function renderCheckoutSummary() {
  const totals = calculateTotals(getCheckoutChoice("delivery"));
  dom.checkoutSummary.innerHTML = createOrderItemsMarkup(getCartDisplayItems()) + createTotalsMarkup(totals);
}

function openCheckout() {
  if (state.cart.length === 0) return;
  refreshPickupDates();
  syncCheckoutOptions();
  closeModal(dom.cartDrawer);
  openModal(dom.checkoutModal, dom.cartButton);
}

function generateOrderId() {
  const now = new Date();
  const stamp = [now.getFullYear() % 100, now.getMonth() + 1, now.getDate()]
    .map((part) => String(part).padStart(2, "0"))
    .join("");
  return `NV-${stamp}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
}

/* Construye el pedido con los datos del formulario y el carrito actual */
function buildOrder() {
  const data = new FormData(dom.checkoutForm);
  const deliveryMethod = data.get("delivery");
  const paymentMethod = data.get("payment");

  const order = {
    id: generateOrderId(),
    createdAt: new Date().toISOString(),
    language: state.language,
    items: getCartDisplayItems(),
    totals: calculateTotals(deliveryMethod),
    customer: {
      name: data.get("name").trim(),
      email: data.get("email").trim(),
      phone: data.get("phone").trim(),
    },
    delivery: { method: deliveryMethod },
    payment: { method: paymentMethod, status: "pending" },
    notes: data.get("notes").trim(),
  };

  if (deliveryMethod === "pickup") {
    order.delivery.pickup = {
      date: data.get("pickupDate"),
      dateLabel: dom.pickupDate.selectedOptions[0].textContent,
      slot: data.get("pickupSlot"),
    };
  } else {
    order.delivery.address = {
      street: data.get("street").trim(),
      city: data.get("city").trim(),
      postalCode: data.get("postalCode").trim(),
      province: data.get("province").trim(),
    };
  }
  return order;
}

const formatAddress = ({ street, postalCode, city }) => `${street}, ${postalCode} ${city}`;

function describeDelivery(order) {
  if (order.delivery.method === "pickup") {
    const { dateLabel, slot } = order.delivery.pickup;
    return t("summary.pickupAt", { date: dateLabel, slot });
  }
  return t("summary.shipTo", { address: formatAddress(order.delivery.address) });
}

function handleCheckoutSubmit(event) {
  event.preventDefault();
  if (!validateForm(dom.checkoutForm)) return;

  const order = buildOrder();
  if (order.payment.method === "online") {
    state.pendingOrder = order;
    showPaymentWindow(order);
    return;
  }
  finalizeOrder(order);
}

/* Ventana que indica lo que se va a pagar antes de pasar a la pasarela */
function showPaymentWindow(order) {
  const amount = formatPrice(order.totals.total);
  dom.paymentAmount.textContent = amount;
  dom.paymentOrderId.textContent = order.id;
  dom.paymentDelivery.textContent = describeDelivery(order);
  dom.paymentSummary.innerHTML = createOrderItemsMarkup(order.items) + createTotalsMarkup(order.totals);
  dom.paymentPayButton.textContent = t("payment.pay", { amount });

  closeModal(dom.checkoutModal);
  openModal(dom.paymentModal, dom.cartButton);
}

function handlePaymentBack() {
  closeModal(dom.paymentModal);
  openModal(dom.checkoutModal, dom.cartButton);
}

/* Lanza el evento para la pasarela. Sin pasarela conectada, se simula el pago (modo demostración) */
function handlePaymentPay() {
  const order = state.pendingOrder;
  if (!order) return;

  const paymentRequest = new CustomEvent("shop:payment-request", {
    cancelable: true,
    detail: {
      order,
      completePayment: () => {
        if (state.pendingOrder === order) finalizeOrder(order);
      },
    },
  });
  document.dispatchEvent(paymentRequest);
  if (!paymentRequest.defaultPrevented) finalizeOrder(order);
}

function saveOrder(order) {
  const previousOrders = readStorage(STORAGE_KEYS.orders, []);
  writeStorage(STORAGE_KEYS.orders, [...previousOrders, order].slice(-20));
}

function renderConfirmation(order) {
  const { delivery, payment, customer } = order;
  const params = {
    name: customer.name.split(" ")[0],
    total: formatPrice(order.totals.total),
    date: delivery.pickup?.dateLabel,
    slot: delivery.pickup?.slot,
    address: delivery.address ? formatAddress(delivery.address) : "",
  };
  dom.confirmationOrderId.textContent = order.id;
  dom.confirmationMessage.textContent = t(`confirmation.msg.${delivery.method}-${payment.method}`, params);
  dom.confirmationSummary.innerHTML = createOrderItemsMarkup(order.items) + createTotalsMarkup(order.totals);
}

/* Registra el pedido, vacía el carrito y muestra la confirmación */
function finalizeOrder(order) {
  order.payment.status = order.payment.method === "online" ? "paid" : "pending";
  state.pendingOrder = null;
  saveOrder(order);
  document.dispatchEvent(new CustomEvent("shop:order-created", { detail: { order } }));

  state.cart = [];
  state.promoCode = null;
  saveCart();

  resetForm(dom.checkoutForm);
  refreshPickupDates();
  syncCheckoutOptions();
  renderCart();
  renderConfirmation(order);

  closeModal(dom.paymentModal);
  closeModal(dom.checkoutModal);
  closeModal(dom.cartDrawer);
  openModal(dom.confirmationModal, dom.cartButton);
}

/* ==========================================================================
   15. FORMULARIOS Y VALIDACIÓN
   ========================================================================== */
const VALIDATORS = {
  required: (value) => value.trim() !== "",
  email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim()),
  phone: (value) => /^\+?[\d\s().-]{9,16}$/.test(value.trim()),
  postal: (value) => /^\d{5}$/.test(value.trim()),
  checked: (_value, input) => input.checked,
};

const ERROR_KEYS = {
  required: "error.required",
  email: "error.email",
  phone: "error.phone",
  postal: "error.postal",
  checked: "error.terms",
};

function setFieldError(input, message) {
  const field = input.closest(".field");
  field.classList.toggle("has-error", message !== "");
  $(".field__error", field).textContent = message;
  input.setAttribute("aria-invalid", String(message !== ""));
}

/* Valida un campo según sus reglas (data-validate) y devuelve si es correcto */
function validateField(input) {
  const failedRule = input.dataset.validate.split(" ").find((rule) => !VALIDATORS[rule](input.value, input));
  setFieldError(input, failedRule ? t(ERROR_KEYS[failedRule]) : "");
  return !failedRule;
}

/* Valida los campos activos del formulario y enfoca el primero incorrecto */
function validateForm(form) {
  const inputs = $$("[data-validate]", form).filter((input) => !input.matches(":disabled"));
  const invalidInputs = inputs.filter((input) => !validateField(input));
  if (invalidInputs.length > 0) invalidInputs[0].focus();
  return invalidInputs.length === 0;
}

function resetForm(form) {
  form.reset();
  $$("[data-validate]", form).forEach((input) => setFieldError(input, ""));
}

/* Revalida en vivo los campos que ya mostraban un error */
function handleLiveValidation(event) {
  const input = event.target;
  if (input.matches("[data-validate]") && input.closest(".field").classList.contains("has-error")) {
    validateField(input);
  }
}

function handleContactSubmit(event) {
  event.preventDefault();
  dom.contactSuccess.hidden = true;
  if (!validateForm(dom.contactForm)) return;

  document.dispatchEvent(new CustomEvent("contact:submit", { detail: Object.fromEntries(new FormData(dom.contactForm)) }));
  resetForm(dom.contactForm);
  dom.contactSuccess.hidden = false;
}

/* ==========================================================================
   16. INFORMACIÓN LEGAL, COOKIES Y AVISOS
   ========================================================================== */
function openLegalModal(documentKey, opener) {
  const legalDocument = t(`legal.${documentKey}`);
  dom.legalTitle.textContent = legalDocument.title;
  dom.legalBody.replaceChildren(
    ...legalDocument.paragraphs.map((text) => {
      const paragraph = document.createElement("p");
      paragraph.textContent = interpolate(text);
      return paragraph;
    })
  );
  openModal(dom.legalModal, opener);
}

function initCookieBanner() {
  if (readStorage(STORAGE_KEYS.cookies, null) !== null) return;
  setTimeout(() => dom.cookieBanner.classList.add("is-visible"), 900);
}

function saveCookieChoice(choice) {
  writeStorage(STORAGE_KEYS.cookies, choice);
  dom.cookieBanner.classList.remove("is-visible");
}

function showToast(message) {
  const toast = document.createElement("p");
  toast.className = "toast";
  toast.textContent = message;

  while (dom.toastRegion.children.length >= UI_CONFIG.maxToasts) dom.toastRegion.firstElementChild.remove();
  dom.toastRegion.append(toast);
  requestAnimationFrame(() => toast.classList.add("is-visible"));

  setTimeout(() => {
    toast.classList.remove("is-visible");
    setTimeout(() => toast.remove(), 450);
  }, UI_CONFIG.toastDuration);
}

/* El sistema de acceso lo implementará el cliente escuchando este evento */
function handleUserButtonClick() {
  document.dispatchEvent(new CustomEvent("auth:login-request"));
  showToast(t("toast.login"));
}

/* ==========================================================================
   17. ANIMACIONES DE APARICIÓN
   ========================================================================== */
/* Ejecuta una función una sola vez cuando cada elemento entra en pantalla */
function observeOnce(elements, onVisible, options) {
  if (!("IntersectionObserver" in window)) {
    elements.forEach(onVisible);
    return;
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      onVisible(entry.target);
      observer.unobserve(entry.target);
    });
  }, options);
  elements.forEach((element) => observer.observe(element));
}

function animateCounter(element) {
  const target = Number(element.dataset.countTo);
  const suffix = element.dataset.countSuffix ?? "";
  const format = (value) => `${Math.round(value).toLocaleString(LANGUAGES[state.language].locale)}${suffix}`;

  if (prefersReducedMotion()) {
    element.textContent = format(target);
    return;
  }
  const duration = 1600;
  const startTime = performance.now();
  const step = (now) => {
    const progress = Math.min((now - startTime) / duration, 1);
    element.textContent = format(target * (1 - Math.pow(1 - progress, 3)));
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

function initScrollAnimations() {
  observeOnce($$(".reveal"), (element) => element.classList.add("is-visible"), {
    threshold: 0.12,
    rootMargin: "0px 0px -5% 0px",
  });
  observeOnce($$("[data-count-to]"), animateCounter, { threshold: 0.6 });
}

/* ==========================================================================
   18. EVENTOS E INICIALIZACIÓN
   ========================================================================== */
let lastViewportWidth = window.innerWidth;

/* Al cambiar el ancho de la pantalla se cierra el menú móvil */
function handleResize() {
  if (window.innerWidth === lastViewportWidth) return;
  lastViewportWidth = window.innerWidth;
  closeMobileMenu();
  updateScrollState();
}

/* Un único listener de clic reparte las acciones declaradas con atributos data-* */
function handleDocumentClick(event) {
  const { target } = event;

  const languageButton = target.closest("[data-lang-option]");
  if (languageButton) {
    setLanguage(languageButton.dataset.langOption);
    return;
  }

  const legalButton = target.closest("[data-legal]");
  if (legalButton) {
    openLegalModal(legalButton.dataset.legal, legalButton);
    return;
  }

  const modalOpener = target.closest("[data-modal-open]");
  if (modalOpener) {
    openModal(document.getElementById(modalOpener.dataset.modalOpen), modalOpener);
    return;
  }

  const modalCloser = target.closest("[data-modal-close]");
  if (modalCloser) {
    closeModal(modalCloser.closest(".modal"));
    return;
  }
  if (target.classList.contains("modal")) {
    closeModal(target);
    return;
  }

  const categoryLink = target.closest("[data-category-link]");
  if (categoryLink) setProductFilter(categoryLink.dataset.categoryLink);

  const subjectLink = target.closest("[data-contact-subject]");
  if (subjectLink) dom.contactSubject.value = subjectLink.dataset.contactSubject;

  const anchor = target.closest('a[href^="#"]');
  if (anchor) handleAnchorClick(event, anchor);
}

function bindEvents() {
  document.addEventListener("click", handleDocumentClick);
  document.addEventListener("keydown", handleKeydown);
  window.addEventListener("scroll", requestScrollUpdate, { passive: true });
  window.addEventListener("resize", handleResize);

  /* Si una imagen externa falla, se oculta para mostrar el fondo neutro */
  document.addEventListener("error", (event) => {
    if (event.target instanceof HTMLImageElement) event.target.classList.add("is-broken");
  }, true);

  dom.menuToggle.addEventListener("click", () => setMobileMenu(!isMobileMenuOpen()));
  dom.themeToggle.addEventListener("click", toggleTheme);
  dom.userButton.addEventListener("click", handleUserButtonClick);
  dom.backToTop.addEventListener("click", () => scrollToHash("#inicio"));

  dom.searchModal.addEventListener("modal:open", prepareSearchModal);
  dom.searchInput.addEventListener("input", handleSearchInput);
  dom.searchForm.addEventListener("submit", handleSearchSubmit);
  dom.searchClearButton.addEventListener("click", resetSearch);
  dom.clearHighlightsButton.addEventListener("click", clearHighlights);

  dom.filterChips.forEach((chip) => chip.addEventListener("click", () => setProductFilter(chip.dataset.filter)));
  dom.sortSelect.addEventListener("change", () => {
    state.sort = dom.sortSelect.value;
    clearHighlights();
    renderProducts();
  });
  dom.productGrid.addEventListener("click", handleProductGridClick);

  dom.cartList.addEventListener("click", handleCartListClick);
  dom.promoForm.addEventListener("submit", (event) => {
    event.preventDefault();
    applyPromoCode(dom.promoInput.value);
  });
  dom.promoInput.addEventListener("input", () => { dom.promoError.textContent = ""; });
  dom.promoMessage.addEventListener("click", (event) => {
    if (event.target.closest("[data-promo-remove]")) removePromoCode();
  });
  dom.checkoutButton.addEventListener("click", openCheckout);
  dom.clearCartButton.addEventListener("click", clearCart);

  dom.checkoutForm.addEventListener("change", (event) => {
    if (event.target.matches('input[type="radio"]')) syncCheckoutOptions();
  });
  dom.checkoutForm.addEventListener("submit", handleCheckoutSubmit);
  dom.checkoutForm.addEventListener("input", handleLiveValidation);
  dom.checkoutForm.addEventListener("change", handleLiveValidation);
  dom.paymentBackButton.addEventListener("click", handlePaymentBack);
  dom.paymentPayButton.addEventListener("click", handlePaymentPay);

  dom.contactForm.addEventListener("submit", handleContactSubmit);
  dom.contactForm.addEventListener("input", handleLiveValidation);
  dom.contactForm.addEventListener("change", handleLiveValidation);

  dom.cookieAccept.addEventListener("click", () => saveCookieChoice("accepted"));
  dom.cookieReject.addEventListener("click", () => saveCookieChoice("rejected"));
}

function init() {
  document.documentElement.classList.add("js");

  initTheme();
  state.cart = sanitizeCart(readStorage(STORAGE_KEYS.cart, []));
  const savedPromo = readStorage(STORAGE_KEYS.promo, null);
  state.promoCode = savedPromo in SHOP_CONFIG.promoCodes ? savedPromo : null;

  bindEvents();
  setLanguage(detectInitialLanguage(), { persist: false });
  updateScrollState();
  initScrollAnimations();
  initCookieBanner();

  if (prefersReducedMotion()) dom.heroVideo.pause();
}

init();
