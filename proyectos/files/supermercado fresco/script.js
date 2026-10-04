/* =========================================================
   Frescó — script.js
   Scroll, tema, menú, búsqueda, idiomas y formularios.
   Sin librerías externas.
   ========================================================= */

(function () {
  "use strict";

  const html = document.documentElement;
  const body = document.body;
  const chrome = document.getElementById("siteChrome");
  const hamburger = document.getElementById("hamburger");
  const mobileMenu = document.getElementById("mobileMenu");
  const themeToggle = document.getElementById("themeToggle");
  const searchModal = document.getElementById("searchModal");
  const loginModal = document.getElementById("loginModal");
  const cookiesModal = document.getElementById("cookiesModal");
  const requisitosModal = document.getElementById("requisitosModal");
  const searchForm = document.getElementById("searchForm");
  const searchInput = document.getElementById("searchInput");
  const searchMeta = document.getElementById("searchMeta");
  const searchHits = document.getElementById("searchHits");
  const cookieBanner = document.getElementById("cookieBanner");
  const yearEl = document.getElementById("year");

  const STORAGE = {
    theme: "fresco-theme",
    lang: "fresco-lang",
    cookies: "fresco-cookies",
    cart: "fresco-cart"
  };

  const DELIVERY_FEE = 2.9;
  const FREE_FROM = 25;
  const MIN_ORDER = 8;
  const STORES = {
    benimaclet: "Benimaclet — Av. de l'Horta, 128",
    ruzafa: "Ruzafa — Carrer de Cadis, 42",
    cabanyal: "El Cabanyal — Carrer de la Reina, 76",
    torrent: "Torrent — Av. Al Vedat, 90"
  };

  let cart = [];
  let checkoutStep = 1;
  let pendingOrder = null;

  /* ---------- Textos por idioma (sin traducción automática) ---------- */
  const I18N = {
    es: {
      "a11y.skip": "Saltar al contenido",
      "topbar.address": "Av. de l'Horta, 128 · València",
      "topbar.hours": "L–S 8:00–21:30 · D 9:00–14:00",
      "nav.home": "Inicio",
      "nav.products": "Productos",
      "nav.offers": "Ofertas",
      "nav.services": "Servicios",
      "nav.about": "Nosotros",
      "nav.stores": "Tiendas",
      "nav.contact": "Contacto",
      "search.open": "Abrir búsqueda",
      "login.open": "Abrir acceso de usuario",
      "theme.toggle": "Cambiar modo claro u oscuro",
      "menu.open": "Abrir menú",
      "search.button": "Buscar en la página",
      "hero.eyebrow": "Supermercado de alimentación",
      "hero.title": "Frescura de verdad, cada día en tu mesa",
      "hero.lead": "Fruta, verdura de l'Horta, pan del día, carnicería propia y despensa seleccionada. Un supermercado de barrio con alma de mercado.",
      "hero.cta": "Ver productos",
      "hero.cta2": "Ofertas de la semana",
      "hero.pill1": "Km 0",
      "hero.pill2": "Horneado diario",
      "hero.pill3": "Entrega a domicilio",
      "products.eyebrow": "Nuestros lineales",
      "products.title": "Todo lo que tu cocina necesita",
      "products.lead": "Seis secciones cuidadas, con producto de temporada y proveedores de proximidad. Elige, compara y llévate lo mejor del día.",
      "cat.produce": "Frutas y verduras",
      "cat.produceText": "Temporada valenciana, ecológico y de la huerta. Recibido cada madrugada.",
      "cat.fruit": "Fruta del día",
      "cat.fruitText": "Naranja, cítricos, bayas y tropical. Dulzor real, sin cámara de más.",
      "cat.bakery": "Panadería",
      "cat.bakeryText": "Masa madre, barra crujiente y bollería de horno propio desde las 7:00.",
      "cat.meat": "Carnicería",
      "cat.meatText": "Cortes al momento, pollo campero y elaborados de la casa.",
      "cat.dairy": "Lácteos y quesos",
      "cat.dairyText": "Leche de granja, yogures naturales y quesos de autor.",
      "cat.pantry": "Despensa",
      "cat.pantryText": "Aceite, legumbres, conservas y esenciales para cocinar sin prisa.",
      "offers.eyebrow": "Esta semana",
      "offers.title": "Ofertas que saben a ahorro",
      "offers.lead": "Precios vigentes hasta el domingo. Stock limitado en producto fresco.",
      "offers.save": "-24%",
      "offers.save2": "-18%",
      "offers.save3": "-15%",
      "offers.save4": "-12%",
      "offers.item1": "Tomate de la huerta",
      "offers.item2": "Naranja de Valencia",
      "offers.item3": "Pan de masa madre",
      "offers.item4": "Yogur natural pack 4",
      "services.eyebrow": "Te lo ponemos fácil",
      "services.title": "Servicios para tu día a día",
      "services.lead": "Compra como quieras: en tienda, desde casa o recógelo cuando te venga bien.",
      "services.s1": "Entrega a domicilio",
      "services.s1t": "Pedidos antes de las 12:00, en tu cocina esa misma tarde en Valencia y área metropolitana.",
      "services.s2": "Click & Collect",
      "services.s2t": "Reserva online y recoge en 2 horas en el mostrador de tu tienda Frescó.",
      "services.s3": "Club Frescó",
      "services.s3t": "Acumula puntos, cupones de fresco y 5% extra en productos de la huerta.",
      "services.s4": "Ecológico y km 0",
      "services.s4t": "Más de 50 productores locales. Trazabilidad clara y temporada de verdad.",
      "about.eyebrow": "Desde 1987",
      "about.title": "Un supermercado con raíces de mercado",
      "about.p1": "Nacimos como frutería de barrio en Benimaclet. Hoy somos Frescó: doce tiendas, el mismo criterio. Si no lo pondríamos en nuestra mesa, no está en el lineal.",
      "about.p2": "Trabajamos con l'Horta de València, obradores próximos y ganadería responsable. Menos plástico, más sabor, precios honestos.",
      "about.stat1": "tiendas",
      "about.stat2": "referencias",
      "about.stat3": "productores",
      "about.stat4": "años",
      "stores.eyebrow": "Cerca de ti",
      "stores.title": "Tiendas y horarios",
      "stores.lead": "Abre la más cercana. El fresco no espera: mejor pasar por la mañana.",
      "stores.h1": "L–S 8:00–21:30 · D 9:00–14:00",
      "stores.h2": "L–S 8:30–21:30 · D 9:00–14:00",
      "stores.h3": "L–S 8:00–21:00 · D 9:00–14:00",
      "stores.h4": "L–S 9:00–21:30 · D cerrado",
      "contact.eyebrow": "Hablemos",
      "contact.title": "¿Dudas, pedidos o sugerencias?",
      "contact.lead": "Atención al cliente de lunes a sábado. Si es sobre un pedido online, indica el número de albarán.",
      "contact.phone": "Teléfono",
      "contact.email": "Correo",
      "contact.hoursLabel": "Horario de atención",
      "contact.hours": "L–S 8:30–20:30",
      "form.name": "Nombre",
      "form.email": "Correo electrónico",
      "form.phone": "Teléfono",
      "form.subject": "Asunto",
      "form.subjectEmpty": "Elige una opción",
      "form.opt1": "Pedido / entrega",
      "form.opt2": "Consulta de tienda",
      "form.opt3": "Calidad de producto",
      "form.opt4": "Otro",
      "form.message": "Mensaje",
      "form.privacy": "Acepto el tratamiento de mis datos para responder a esta consulta.",
      "form.ok": "Mensaje enviado. Te responderemos en menos de 24 horas laborables.",
      "form.send": "Enviar mensaje",
      "form.error": "Revisa los campos obligatorios y el formato del correo.",
      "footer.tag": "Alimentación general con criterio de mercado. Valencia, desde 1987.",
      "footer.legal": "Información",
      "footer.cookies": "Política de cookies",
      "footer.reqs": "Requisitos",
      "footer.quality": "Compromiso de calidad",
      "footer.extra": "También te interesa",
      "footer.e1": "Alérgenos: consulta el cartel en tienda o escribe a calidad@fresco.market",
      "footer.e2": "Factura simplificada en caja. Ticket digital con Club Frescó.",
      "footer.e3": "Punto de reciclaje de aceite y pilas en todas las tiendas.",
      "footer.copy": "Todos los derechos reservados.",
      "search.title": "Buscar en la página",
      "search.placeholder": "Escribe una palabra…",
      "search.action": "Buscar",
      "search.empty": "Escribe al menos 2 caracteres.",
      "search.none": "Sin coincidencias para “{q}”.",
      "search.count": "{n} coincidencia(s) de “{q}”.",
      "login.title": "Accede a tu cuenta",
      "login.lead": "Club Frescó, pedidos y tickets digitales.",
      "login.pass": "Contraseña",
      "login.remember": "Recordarme en este dispositivo",
      "login.soon": "El acceso completo se activará con el sistema de cuentas. Tus datos no se envían.",
      "login.submit": "Entrar",
      "login.error": "Introduce un correo válido y una contraseña de al menos 6 caracteres.",
      "cookies.title": "Política de cookies",
      "cookies.body": "<p>Esta web utiliza cookies técnicas imprescindibles para recordar tu idioma, el tema claro/oscuro y tu decisión sobre este aviso. No usamos cookies de publicidad ni de redes sociales.</p><p>Puedes borrar los datos locales desde la configuración de tu navegador. Al aceptar, guardamos tu preferencia en localStorage.</p>",
      "cookies.banner": "Usamos cookies técnicas para idioma, tema y tu preferencia de aviso. Sin publicidad.",
      "cookies.more": "Más info",
      "cookies.accept": "Aceptar",
      "req.title": "Requisitos de calidad",
      "req.body": "<p>Todo producto fresco se recepciona con control de temperatura y fecha. La fruta y verdura de km 0 llega antes de las 7:00.</p><p>Carnicería y pescadería cumplen la normativa sanitaria vigente. Informamos de alérgenos en mostrador y etiquetado.</p><p>Proveedores locales auditados. Cadena de frío documentada. Aceite de oliva virgen extra con origen declarado.</p>",
      "nav.shop": "Compra",
      "cart.open": "Abrir cesta",
      "cart.openShort": "Ver cesta",
      "cart.title": "Tu cesta",
      "cart.empty": "Tu cesta está vacía. Añade producto fresco cuando quieras.",
      "cart.add": "Añadir",
      "cart.added": "Añadido a la cesta",
      "cart.remove": "Quitar",
      "cart.subtotal": "Subtotal",
      "cart.clear": "Vaciar cesta",
      "cart.checkout": "Tramitar pedido",
      "cart.min": "Pedido mínimo 8 € para reservar.",
      "cart.freeFrom": "Envío 2,90 € · gratis desde 25 €",
      "shop.eyebrow": "Compra online",
      "shop.title": "Llena la cesta a tu ritmo",
      "shop.lead": "Añade producto, reserva la recogida en tu mercado o recíbelo en casa. Pagas al recoger, al entregar o ahora, tú eliges.",
      "p.tomate": "Tomate de la huerta",
      "p.naranja": "Naranja de Valencia",
      "p.lechuga": "Lechuga romana",
      "p.pimiento": "Pimiento rojo",
      "p.pan": "Pan de masa madre",
      "p.yogur": "Yogur natural pack 4",
      "p.leche": "Leche fresca 1 L",
      "p.queso": "Queso de oveja (cuña)",
      "p.pollo": "Pollo campero",
      "p.aceite": "AOVE 1 L",
      "p.platano": "Plátano",
      "p.huevos": "Huevos camperos x12",
      "unit.kg": "€/kg",
      "unit.ud": "€/ud",
      "unit.pack": "€/pack",
      "unit.l": "€/L",
      "check.title": "Reserva tu compra",
      "check.step1": "Entrega",
      "check.step2": "Tus datos",
      "check.step3": "Pago",
      "check.fulfill": "¿Cómo quieres recibir tu compra?",
      "check.pickup": "Recoger en el mercado",
      "check.pickupHelp": "Reservamos el pedido. Lo pagas al recogerlo o ahora.",
      "check.delivery": "Enviar a mi dirección",
      "check.deliveryHelp": "Pedidos antes de las 12:00, entrega esa misma tarde.",
      "check.store": "Tienda de recogida",
      "check.date": "Fecha",
      "check.slot": "Franja horaria",
      "check.notes": "Notas para el pedido",
      "check.next": "Continuar",
      "check.back": "Volver",
      "check.payWhen": "¿Cuándo y cómo pagar?",
      "check.payPickup": "Pagar al recogerlo en tienda",
      "check.payPickupHelp": "Reservamos la compra. Abonas en caja cuando pases.",
      "check.payDelivery": "Pagar cuando me lo entreguen",
      "check.payDeliveryHelp": "Efectivo o tarjeta al recadero, en tu puerta.",
      "check.payNow": "Pagar ahora con la pasarela del mercado",
      "check.payNowHelp": "Verás el importe exacto y, a continuación, el pago online.",
      "check.street": "Calle y número",
      "check.floor": "Piso / puerta",
      "check.zip": "Código postal",
      "check.city": "Ciudad",
      "check.error1": "Elige fecha y franja horaria.",
      "check.error2": "Completa nombre, teléfono y un correo válido.",
      "check.errorAddr": "Indica calle, código postal y ciudad para el envío.",
      "check.ship": "Envío",
      "check.shipFree": "Gratis",
      "check.confirm": "Confirmar reserva",
      "check.goPay": "Ver importe y pagar",
      "pay.title": "Pago online Frescó",
      "pay.lead": "Revisa lo que vas a pagar. En el siguiente paso se conectará la pasarela del mercado.",
      "pay.amount": "Importe a pagar",
      "pay.placeholder": "Aquí se integrará la pasarela de pago del mercado. El cliente ya ha confirmado el importe.",
      "pay.gateway": "Continuar a la pasarela",
      "pay.back": "Volver al pedido",
      "pay.hook": "Punto de integración listo. Sustituye esta acción por la pasarela real.",
      "done.title": "Reserva confirmada",
      "done.close": "Cerrar",
      "done.pickup": "Pasa a recoger tu pedido. Pagarás en caja al llegar.",
      "done.delivery": "Prepararemos el envío a tu dirección. Pagarás al recibirlo.",
      "done.gateway": "Pedido registrado. El cobro se completará en la pasarela.",
      "done.code": "Código de reserva"
    },
    en: {
      "a11y.skip": "Skip to content",
      "topbar.address": "Av. de l'Horta, 128 · Valencia",
      "topbar.hours": "Mon–Sat 8:00–21:30 · Sun 9:00–14:00",
      "nav.home": "Home",
      "nav.products": "Products",
      "nav.offers": "Offers",
      "nav.services": "Services",
      "nav.about": "About",
      "nav.stores": "Stores",
      "nav.contact": "Contact",
      "search.open": "Open search",
      "login.open": "Open user login",
      "theme.toggle": "Toggle light or dark mode",
      "menu.open": "Open menu",
      "search.button": "Search this page",
      "hero.eyebrow": "Grocery supermarket",
      "hero.title": "Real freshness, on your table every day",
      "hero.lead": "Fruit, produce from l'Horta, bread baked daily, our own butcher counter and a carefully chosen pantry. A neighbourhood supermarket with a market soul.",
      "hero.cta": "Browse products",
      "hero.cta2": "This week's offers",
      "hero.pill1": "Zero-mile",
      "hero.pill2": "Baked daily",
      "hero.pill3": "Home delivery",
      "products.eyebrow": "Our aisles",
      "products.title": "Everything your kitchen needs",
      "products.lead": "Six carefully run sections, with seasonal produce and nearby suppliers. Choose, compare and take home the best of the day.",
      "cat.produce": "Fruit & vegetables",
      "cat.produceText": "Valencian season, organic and from the orchard. Delivered every dawn.",
      "cat.fruit": "Fruit of the day",
      "cat.fruitText": "Oranges, citrus, berries and tropical fruit. Real sweetness, no extra storage.",
      "cat.bakery": "Bakery",
      "cat.bakeryText": "Sourdough, crusty baguettes and pastries from our oven from 7:00.",
      "cat.meat": "Butcher",
      "cat.meatText": "Cuts to order, free-range chicken and house-made products.",
      "cat.dairy": "Dairy & cheese",
      "cat.dairyText": "Farm milk, natural yoghurts and characterful cheeses.",
      "cat.pantry": "Pantry",
      "cat.pantryText": "Oil, pulses, preserves and the essentials for unhurried cooking.",
      "offers.eyebrow": "This week",
      "offers.title": "Offers that taste like savings",
      "offers.lead": "Prices valid until Sunday. Limited stock on fresh produce.",
      "offers.save": "-24%",
      "offers.save2": "-18%",
      "offers.save3": "-15%",
      "offers.save4": "-12%",
      "offers.item1": "Orchard tomatoes",
      "offers.item2": "Valencia oranges",
      "offers.item3": "Sourdough loaf",
      "offers.item4": "Natural yoghurt pack of 4",
      "services.eyebrow": "We make it easy",
      "services.title": "Services for everyday life",
      "services.lead": "Shop your way: in store, from home, or pick it up when it suits you.",
      "services.s1": "Home delivery",
      "services.s1t": "Order before 12:00 and have it in your kitchen the same afternoon in Valencia and the metro area.",
      "services.s2": "Click & Collect",
      "services.s2t": "Reserve online and collect in 2 hours at your Frescó store counter.",
      "services.s3": "Frescó Club",
      "services.s3t": "Earn points, fresh-produce coupons and an extra 5% on orchard products.",
      "services.s4": "Organic & zero-mile",
      "services.s4t": "Over 50 local producers. Clear traceability and real seasonality.",
      "about.eyebrow": "Since 1987",
      "about.title": "A supermarket with market roots",
      "about.p1": "We started as a neighbourhood greengrocer in Benimaclet. Today we are Frescó: twelve stores, the same standard. If we wouldn't put it on our table, it isn't on the shelf.",
      "about.p2": "We work with l'Horta de València, nearby bakeries and responsible livestock farms. Less plastic, more flavour, honest prices.",
      "about.stat1": "stores",
      "about.stat2": "products",
      "about.stat3": "producers",
      "about.stat4": "years",
      "stores.eyebrow": "Near you",
      "stores.title": "Stores and opening hours",
      "stores.lead": "Open the nearest one. Fresh food won't wait: mornings are best.",
      "stores.h1": "Mon–Sat 8:00–21:30 · Sun 9:00–14:00",
      "stores.h2": "Mon–Sat 8:30–21:30 · Sun 9:00–14:00",
      "stores.h3": "Mon–Sat 8:00–21:00 · Sun 9:00–14:00",
      "stores.h4": "Mon–Sat 9:00–21:30 · Sun closed",
      "contact.eyebrow": "Let's talk",
      "contact.title": "Questions, orders or ideas?",
      "contact.lead": "Customer service Monday to Saturday. For an online order, please include the delivery note number.",
      "contact.phone": "Phone",
      "contact.email": "Email",
      "contact.hoursLabel": "Service hours",
      "contact.hours": "Mon–Sat 8:30–20:30",
      "form.name": "Name",
      "form.email": "Email",
      "form.phone": "Phone",
      "form.subject": "Subject",
      "form.subjectEmpty": "Choose an option",
      "form.opt1": "Order / delivery",
      "form.opt2": "Store enquiry",
      "form.opt3": "Product quality",
      "form.opt4": "Other",
      "form.message": "Message",
      "form.privacy": "I agree to the processing of my data to answer this enquiry.",
      "form.ok": "Message sent. We will reply within 24 working hours.",
      "form.send": "Send message",
      "form.error": "Please check the required fields and the email format.",
      "footer.tag": "Everyday groceries with a market mindset. Valencia, since 1987.",
      "footer.legal": "Information",
      "footer.cookies": "Cookie policy",
      "footer.reqs": "Requirements",
      "footer.quality": "Quality commitment",
      "footer.extra": "Also useful",
      "footer.e1": "Allergens: see the in-store poster or write to calidad@fresco.market",
      "footer.e2": "Simplified invoice at the till. Digital receipt with Frescó Club.",
      "footer.e3": "Oil and battery recycling point in every store.",
      "footer.copy": "All rights reserved.",
      "search.title": "Search this page",
      "search.placeholder": "Type a word…",
      "search.action": "Search",
      "search.empty": "Please type at least 2 characters.",
      "search.none": "No matches for “{q}”.",
      "search.count": "{n} match(es) for “{q}”.",
      "login.title": "Sign in to your account",
      "login.lead": "Frescó Club, orders and digital receipts.",
      "login.pass": "Password",
      "login.remember": "Remember me on this device",
      "login.soon": "Full access will be enabled with the accounts system. Your data is not sent.",
      "login.submit": "Sign in",
      "login.error": "Enter a valid email and a password of at least 6 characters.",
      "cookies.title": "Cookie policy",
      "cookies.body": "<p>This site uses essential technical cookies to remember your language, light/dark theme and your choice on this notice. We do not use advertising or social cookies.</p><p>You can clear local data in your browser settings. By accepting, we store your preference in localStorage.</p>",
      "cookies.banner": "We use technical cookies for language, theme and this notice. No ads.",
      "cookies.more": "More info",
      "cookies.accept": "Accept",
      "req.title": "Quality requirements",
      "req.body": "<p>All fresh produce is received with temperature and date checks. Zero-mile fruit and vegetables arrive before 7:00.</p><p>The butcher and fish counters comply with current health regulations. Allergens are shown at the counter and on labels.</p><p>Audited local suppliers. Documented cold chain. Extra virgin olive oil with declared origin.</p>",
      "nav.shop": "Shop",
      "cart.open": "Open basket",
      "cart.openShort": "View basket",
      "cart.title": "Your basket",
      "cart.empty": "Your basket is empty. Add fresh produce whenever you like.",
      "cart.add": "Add",
      "cart.added": "Added to basket",
      "cart.remove": "Remove",
      "cart.subtotal": "Subtotal",
      "cart.clear": "Empty basket",
      "cart.checkout": "Checkout",
      "cart.min": "Minimum order 8 € to reserve.",
      "cart.freeFrom": "Delivery 2.90 € · free from 25 €",
      "shop.eyebrow": "Shop online",
      "shop.title": "Fill your basket at your own pace",
      "shop.lead": "Add products, reserve pickup at your market or have them delivered. Pay on pickup, on delivery or now — your choice.",
      "p.tomate": "Orchard tomatoes",
      "p.naranja": "Valencia oranges",
      "p.lechuga": "Romaine lettuce",
      "p.pimiento": "Red pepper",
      "p.pan": "Sourdough loaf",
      "p.yogur": "Natural yoghurt pack of 4",
      "p.leche": "Fresh milk 1 L",
      "p.queso": "Sheep’s cheese (wedge)",
      "p.pollo": "Free-range chicken",
      "p.aceite": "EVOO 1 L",
      "p.platano": "Banana",
      "p.huevos": "Free-range eggs x12",
      "unit.kg": "€/kg",
      "unit.ud": "€/each",
      "unit.pack": "€/pack",
      "unit.l": "€/L",
      "check.title": "Reserve your order",
      "check.step1": "Delivery",
      "check.step2": "Your details",
      "check.step3": "Payment",
      "check.fulfill": "How would you like to receive your order?",
      "check.pickup": "Pick up at the market",
      "check.pickupHelp": "We reserve the order. Pay on collection or now.",
      "check.delivery": "Deliver to my address",
      "check.deliveryHelp": "Order before 12:00 for same-afternoon delivery.",
      "check.store": "Pickup store",
      "check.date": "Date",
      "check.slot": "Time slot",
      "check.notes": "Order notes",
      "check.next": "Continue",
      "check.back": "Back",
      "check.payWhen": "When and how would you like to pay?",
      "check.payPickup": "Pay when I pick it up",
      "check.payPickupHelp": "We reserve the shop. You pay at the till when you arrive.",
      "check.payDelivery": "Pay on delivery",
      "check.payDeliveryHelp": "Cash or card to the courier at your door.",
      "check.payNow": "Pay now via the market gateway",
      "check.payNowHelp": "You will see the exact amount, then continue to online payment.",
      "check.street": "Street and number",
      "check.floor": "Floor / door",
      "check.zip": "Postcode",
      "check.city": "City",
      "check.error1": "Please choose a date and time slot.",
      "check.error2": "Please fill in name, phone and a valid email.",
      "check.errorAddr": "Please add street, postcode and city for delivery.",
      "check.ship": "Delivery",
      "check.shipFree": "Free",
      "check.confirm": "Confirm reservation",
      "check.goPay": "See amount and pay",
      "pay.title": "Frescó online payment",
      "pay.lead": "Check what you will pay. The market payment gateway will connect in the next step.",
      "pay.amount": "Amount to pay",
      "pay.placeholder": "The market payment gateway will be integrated here. The customer has already confirmed the amount.",
      "pay.gateway": "Continue to payment gateway",
      "pay.back": "Back to the order",
      "pay.hook": "Integration point ready. Replace this action with the real gateway.",
      "done.title": "Reservation confirmed",
      "done.close": "Close",
      "done.pickup": "Come and collect your order. You will pay at the till.",
      "done.delivery": "We will prepare the delivery to your address. You will pay on receipt.",
      "done.gateway": "Order registered. Payment will be completed in the gateway.",
      "done.code": "Reservation code"
    },
    va: {
      "a11y.skip": "Saltar al contingut",
      "topbar.address": "Av. de l'Horta, 128 · València",
      "topbar.hours": "Dl–Ds 8:00–21:30 · Dg 9:00–14:00",
      "nav.home": "Inici",
      "nav.products": "Productes",
      "nav.offers": "Ofertes",
      "nav.services": "Serveis",
      "nav.about": "Nosaltres",
      "nav.stores": "Botigues",
      "nav.contact": "Contacte",
      "search.open": "Obrir cerca",
      "login.open": "Obrir accés d'usuari",
      "theme.toggle": "Canviar mode clar o fosc",
      "menu.open": "Obrir menú",
      "search.button": "Cercar a la pàgina",
      "hero.eyebrow": "Supermercat d'alimentació",
      "hero.title": "Frescor de veritat, cada dia a taula",
      "hero.lead": "Fruita, verdura de l'Horta, pa del dia, carnisseria pròpia i rebost seleccionat. Un supermercat de barri amb ànima de mercat.",
      "hero.cta": "Veure productes",
      "hero.cta2": "Ofertes de la setmana",
      "hero.pill1": "Km 0",
      "hero.pill2": "Forn diari",
      "hero.pill3": "Lliurament a domicili",
      "products.eyebrow": "Els nostres lineals",
      "products.title": "Tot el que la teua cuina necessita",
      "products.lead": "Sis seccions cuidades, amb producte de temporada i proveïdors de proximitat. Tria, compara i emporta't el millor del dia.",
      "cat.produce": "Fruites i verdures",
      "cat.produceText": "Temporada valenciana, ecològic i de l'horta. Rebut cada matinada.",
      "cat.fruit": "Fruita del dia",
      "cat.fruitText": "Taronja, cítrics, baies i tropical. Dolçor real, sense cambra de més.",
      "cat.bakery": "Fleca",
      "cat.bakeryText": "Massa mare, barra cruixent i brioixeria de forn propi des de les 7:00.",
      "cat.meat": "Carnisseria",
      "cat.meatText": "Talls al moment, pollastre camper i elaborats de la casa.",
      "cat.dairy": "Lactis i formatges",
      "cat.dairyText": "Llet de granja, iogurts naturals i formatges d'autor.",
      "cat.pantry": "Rebost",
      "cat.pantryText": "Oli, llegums, conserves i essencials per cuinar sense pressa.",
      "offers.eyebrow": "Esta setmana",
      "offers.title": "Ofertes que saben a estalvi",
      "offers.lead": "Preus vigents fins diumenge. Estoc limitat en producte fresc.",
      "offers.save": "-24%",
      "offers.save2": "-18%",
      "offers.save3": "-15%",
      "offers.save4": "-12%",
      "offers.item1": "Tomaca de l'horta",
      "offers.item2": "Taronja de València",
      "offers.item3": "Pa de massa mare",
      "offers.item4": "Iogurt natural pack 4",
      "services.eyebrow": "T'ho posem fàcil",
      "services.title": "Serveis per al dia a dia",
      "services.lead": "Compra com vulgues: a la botiga, des de casa o recull-ho quan et vaja bé.",
      "services.s1": "Lliurament a domicili",
      "services.s1t": "Comandes abans de les 12:00, a la teua cuina eixa mateixa vesprada a València i l'àrea metropolitana.",
      "services.s2": "Click & Collect",
      "services.s2t": "Reserva en línia i recull en 2 hores al taulell de la teua botiga Frescó.",
      "services.s3": "Club Frescó",
      "services.s3t": "Acumula punts, cupons de fresc i 5% extra en productes de l'horta.",
      "services.s4": "Ecològic i km 0",
      "services.s4t": "Més de 50 productors locals. Traçabilitat clara i temporada de veritat.",
      "about.eyebrow": "Des de 1987",
      "about.title": "Un supermercat amb arrels de mercat",
      "about.p1": "Vam nàixer com a fruiteria de barri a Benimaclet. Hui som Frescó: dotze botigues, el mateix criteri. Si no ho posaríem a taula, no està al lineal.",
      "about.p2": "Treballem amb l'Horta de València, obradors pròxims i ramaderia responsable. Menys plàstic, més sabor, preus honestos.",
      "about.stat1": "botigues",
      "about.stat2": "referències",
      "about.stat3": "productors",
      "about.stat4": "anys",
      "stores.eyebrow": "Prop de tu",
      "stores.title": "Botigues i horaris",
      "stores.lead": "Obri la més pròxima. El fresc no espera: millor passar pel matí.",
      "stores.h1": "Dl–Ds 8:00–21:30 · Dg 9:00–14:00",
      "stores.h2": "Dl–Ds 8:30–21:30 · Dg 9:00–14:00",
      "stores.h3": "Dl–Ds 8:00–21:00 · Dg 9:00–14:00",
      "stores.h4": "Dl–Ds 9:00–21:30 · Dg tancat",
      "contact.eyebrow": "Parlem",
      "contact.title": "Dubtes, comandes o suggeriments?",
      "contact.lead": "Atenció al client de dilluns a dissabte. Si és sobre una comanda en línia, indica el número d'albarà.",
      "contact.phone": "Telèfon",
      "contact.email": "Correu",
      "contact.hoursLabel": "Horari d'atenció",
      "contact.hours": "Dl–Ds 8:30–20:30",
      "form.name": "Nom",
      "form.email": "Correu electrònic",
      "form.phone": "Telèfon",
      "form.subject": "Assumpte",
      "form.subjectEmpty": "Tria una opció",
      "form.opt1": "Comanda / lliurament",
      "form.opt2": "Consulta de botiga",
      "form.opt3": "Qualitat de producte",
      "form.opt4": "Un altre",
      "form.message": "Missatge",
      "form.privacy": "Accepte el tractament de les meues dades per respondre a esta consulta.",
      "form.ok": "Missatge enviat. Et respondrem en menys de 24 hores laborables.",
      "form.send": "Enviar missatge",
      "form.error": "Revisa els camps obligatoris i el format del correu.",
      "footer.tag": "Alimentació general amb criteri de mercat. València, des de 1987.",
      "footer.legal": "Informació",
      "footer.cookies": "Política de galetes",
      "footer.reqs": "Requisits",
      "footer.quality": "Compromís de qualitat",
      "footer.extra": "També t'interessa",
      "footer.e1": "Al·lèrgens: consulta el cartell a botiga o escriu a calidad@fresco.market",
      "footer.e2": "Factura simplificada en caixa. Tiquet digital amb Club Frescó.",
      "footer.e3": "Punt de reciclatge d'oli i piles a totes les botigues.",
      "footer.copy": "Tots els drets reservats.",
      "search.title": "Cercar a la pàgina",
      "search.placeholder": "Escriu una paraula…",
      "search.action": "Cercar",
      "search.empty": "Escriu almenys 2 caràcters.",
      "search.none": "Sense coincidències per a “{q}”.",
      "search.count": "{n} coincidència(es) de “{q}”.",
      "login.title": "Accedix al teu compte",
      "login.lead": "Club Frescó, comandes i tiquets digitals.",
      "login.pass": "Contrasenya",
      "login.remember": "Recorda'm en este dispositiu",
      "login.soon": "L'accés complet s'activarà amb el sistema de comptes. Les teues dades no s'envien.",
      "login.submit": "Entrar",
      "login.error": "Introduïx un correu vàlid i una contrasenya d'almenys 6 caràcters.",
      "cookies.title": "Política de galetes",
      "cookies.body": "<p>Este web utilitza galetes tècniques imprescindibles per recordar l'idioma, el tema clar/fosc i la teua decisió sobre este avís. No usem galetes de publicitat ni de xarxes socials.</p><p>Pots esborrar les dades locals des de la configuració del navegador. En acceptar, guardem la preferència a localStorage.</p>",
      "cookies.banner": "Usem galetes tècniques per a idioma, tema i la teua preferència d'avís. Sense publicitat.",
      "cookies.more": "Més info",
      "cookies.accept": "Acceptar",
      "req.title": "Requisits de qualitat",
      "req.body": "<p>Tot producte fresc es recepciona amb control de temperatura i data. La fruita i verdura de km 0 arriba abans de les 7:00.</p><p>Carnisseria i peixateria complixen la normativa sanitària vigent. Informem d'al·lèrgens al taulell i a l'etiquetatge.</p><p>Proveïdors locals auditats. Cadena de fred documentada. Oli d'oliva verge extra amb origen declarat.</p>",
      "nav.shop": "Compra",
      "cart.open": "Obrir cistella",
      "cart.openShort": "Veure cistella",
      "cart.title": "La teua cistella",
      "cart.empty": "La cistella està buida. Afig producte fresc quan vulgues.",
      "cart.add": "Afegir",
      "cart.added": "Afegit a la cistella",
      "cart.remove": "Llevar",
      "cart.subtotal": "Subtotal",
      "cart.clear": "Buidar cistella",
      "cart.checkout": "Tramitar comanda",
      "cart.min": "Comanda mínima 8 € per reservar.",
      "cart.freeFrom": "Enviament 2,90 € · gratis des de 25 €",
      "shop.eyebrow": "Compra en línia",
      "shop.title": "Ompli la cistella al teu ritme",
      "shop.lead": "Afig producte, reserva la recollida al mercat o rep-ho a casa. Pagues en recollir, en lliurar o ara, tu tries.",
      "p.tomate": "Tomaca de l'horta",
      "p.naranja": "Taronja de València",
      "p.lechuga": "Enciam romà",
      "p.pimiento": "Pebrot roig",
      "p.pan": "Pa de massa mare",
      "p.yogur": "Iogurt natural pack 4",
      "p.leche": "Llet fresca 1 L",
      "p.queso": "Formatge d'ovella (unya)",
      "p.pollo": "Pollastre camper",
      "p.aceite": "AOVE 1 L",
      "p.platano": "Plàtan",
      "p.huevos": "Ous campers x12",
      "unit.kg": "€/kg",
      "unit.ud": "€/ud",
      "unit.pack": "€/pack",
      "unit.l": "€/L",
      "check.title": "Reserva la teua compra",
      "check.step1": "Entrega",
      "check.step2": "Les teues dades",
      "check.step3": "Pagament",
      "check.fulfill": "Com vols rebre la compra?",
      "check.pickup": "Recollir al mercat",
      "check.pickupHelp": "Reservem la comanda. Ho pagues en recollir-la o ara.",
      "check.delivery": "Enviar a la meua adreça",
      "check.deliveryHelp": "Comandes abans de les 12:00, lliurament eixa vesprada.",
      "check.store": "Botiga de recollida",
      "check.date": "Data",
      "check.slot": "Franja horària",
      "check.notes": "Notes per a la comanda",
      "check.next": "Continuar",
      "check.back": "Tornar",
      "check.payWhen": "Quan i com vols pagar?",
      "check.payPickup": "Pagar en recollir-la a la botiga",
      "check.payPickupHelp": "Reservem la compra. Abones en caixa quan passes.",
      "check.payDelivery": "Pagar quan m'ho entreguen",
      "check.payDeliveryHelp": "Efectiu o targeta al recader, a la porta.",
      "check.payNow": "Pagar ara amb la passarel·la del mercat",
      "check.payNowHelp": "Veuràs l'import exacte i, tot seguit, el pagament en línia.",
      "check.street": "Carrer i número",
      "check.floor": "Pis / porta",
      "check.zip": "Codi postal",
      "check.city": "Ciutat",
      "check.error1": "Tria data i franja horària.",
      "check.error2": "Completa nom, telèfon i un correu vàlid.",
      "check.errorAddr": "Indica carrer, codi postal i ciutat per a l'enviament.",
      "check.ship": "Enviament",
      "check.shipFree": "Gratis",
      "check.confirm": "Confirmar reserva",
      "check.goPay": "Veure import i pagar",
      "pay.title": "Pagament en línia Frescó",
      "pay.lead": "Revisa el que vas a pagar. En el pas següent es connectarà la passarel·la del mercat.",
      "pay.amount": "Import a pagar",
      "pay.placeholder": "Ací s'integrarà la passarel·la de pagament del mercat. El client ja ha confirmat l'import.",
      "pay.gateway": "Continuar a la passarel·la",
      "pay.back": "Tornar a la comanda",
      "pay.hook": "Punt d'integració llest. Substitueix esta acció per la passarel·la real.",
      "done.title": "Reserva confirmada",
      "done.close": "Tancar",
      "done.pickup": "Passa a recollir la comanda. Pagaràs en caixa.",
      "done.delivery": "Prepararem l'enviament a la teua adreça. Pagaràs en rebre'l.",
      "done.gateway": "Comanda registrada. El cobrament es completarà a la passarel·la.",
      "done.code": "Codi de reserva"
    }
  };

  let currentLang = "es";

  function t(key) {
    return (I18N[currentLang] && I18N[currentLang][key]) || I18N.es[key] || key;
  }

  function applyLanguage(lang) {
    if (!I18N[lang]) lang = "es";
    currentLang = lang;
    html.lang = lang === "va" ? "ca" : lang;
    localStorage.setItem(STORAGE.lang, lang);

    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      el.textContent = t(el.getAttribute("data-i18n"));
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach(function (el) {
      el.setAttribute("placeholder", t(el.getAttribute("data-i18n-placeholder")));
    });
    document.querySelectorAll("[data-i18n-aria]").forEach(function (el) {
      el.setAttribute("aria-label", t(el.getAttribute("data-i18n-aria")));
    });
    document.querySelectorAll("[data-i18n-html]").forEach(function (el) {
      el.innerHTML = t(el.getAttribute("data-i18n-html"));
    });
    document.querySelectorAll(".lang-btn").forEach(function (btn) {
      const active = btn.getAttribute("data-lang") === lang;
      btn.classList.toggle("is-active", active);
      btn.setAttribute("aria-pressed", active ? "true" : "false");
    });
    renderCart();
    syncCheckoutUi();
  }

  /* ---------- Tema claro / oscuro ---------- */
  function applyTheme(theme) {
    html.setAttribute("data-theme", theme);
    localStorage.setItem(STORAGE.theme, theme);
    const dark = theme === "dark";
    themeToggle.setAttribute("aria-pressed", dark ? "true" : "false");
  }

  function initTheme() {
    const saved = localStorage.getItem(STORAGE.theme);
    if (saved === "dark" || saved === "light") {
      applyTheme(saved);
      return;
    }
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    applyTheme(prefersDark ? "dark" : "light");
  }

  /* ---------- Menú hamburguesa ---------- */
  function openMenu() {
    mobileMenu.hidden = false;
    requestAnimationFrame(function () {
      mobileMenu.classList.add("is-open");
    });
    hamburger.classList.add("is-open");
    hamburger.setAttribute("aria-expanded", "true");
    body.classList.add("menu-open");
  }

  function closeMenu() {
    mobileMenu.classList.remove("is-open");
    hamburger.classList.remove("is-open");
    hamburger.setAttribute("aria-expanded", "false");
    body.classList.remove("menu-open");
    window.setTimeout(function () {
      if (!mobileMenu.classList.contains("is-open")) mobileMenu.hidden = true;
    }, 450);
  }

  function toggleMenu() {
    if (mobileMenu.classList.contains("is-open")) closeMenu();
    else openMenu();
  }

  /* ---------- Modales ---------- */
  const checkoutModal = document.getElementById("checkoutModal");
  const payModal = document.getElementById("payModal");
  const doneModal = document.getElementById("doneModal");
  const cartDrawer = document.getElementById("cartDrawer");

  const modalMap = {
    search: searchModal,
    login: loginModal,
    cookies: cookiesModal,
    requisitos: requisitosModal,
    checkout: checkoutModal,
    pay: payModal,
    done: doneModal
  };

  function openModal(name) {
    const modal = modalMap[name];
    if (!modal) return;
    modal.hidden = false;
    const focusable = modal.querySelector("input, button, textarea, select");
    if (focusable) focusable.focus();
    if (name === "search") {
      searchInput.value = "";
      searchMeta.textContent = "";
      searchHits.innerHTML = "";
    }
  }

  function closeModal(name) {
    const modal = name ? modalMap[name] : null;
    if (modal) {
      modal.hidden = true;
      if (name === "search") clearHighlights();
      return;
    }
    Object.keys(modalMap).forEach(function (key) {
      modalMap[key].hidden = true;
    });
    clearHighlights();
  }

  /* ---------- Búsqueda y resaltado ---------- */
  function clearHighlights() {
    document.querySelectorAll("mark.search-mark").forEach(function (mark) {
      const parent = mark.parentNode;
      parent.replaceChild(document.createTextNode(mark.textContent), mark);
      parent.normalize();
    });
  }

  function walkTextNodes(root, callback) {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode: function (node) {
        if (!node.nodeValue || !node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
        const tag = node.parentElement && node.parentElement.tagName;
        if (tag === "SCRIPT" || tag === "STYLE" || tag === "MARK") return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    });
    const nodes = [];
    let current = walker.nextNode();
    while (current) {
      nodes.push(current);
      current = walker.nextNode();
    }
    nodes.forEach(callback);
  }

  function highlightQuery(query) {
    clearHighlights();
    const q = query.trim();
    if (q.length < 2) return 0;
    const main = document.getElementById("contenido");
    const regex = new RegExp(q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "gi");
    let count = 0;
    const snippets = [];

    walkTextNodes(main, function (node) {
      const text = node.nodeValue;
      if (!regex.test(text)) {
        regex.lastIndex = 0;
        return;
      }
      regex.lastIndex = 0;
      const frag = document.createDocumentFragment();
      let last = 0;
      let match;
      while ((match = regex.exec(text))) {
        if (match.index > last) {
          frag.appendChild(document.createTextNode(text.slice(last, match.index)));
        }
        const mark = document.createElement("mark");
        mark.className = "search-mark";
        mark.textContent = match[0];
        frag.appendChild(mark);
        count += 1;
        last = match.index + match[0].length;
      }
      if (last < text.length) frag.appendChild(document.createTextNode(text.slice(last)));
      node.parentNode.replaceChild(frag, node);
    });

    document.querySelectorAll("mark.search-mark").forEach(function (mark, index) {
      if (index > 12) return;
      const heading = mark.closest("section");
      const title = heading && heading.querySelector("h1, h2, h3");
      snippets.push({
        label: (title ? title.textContent + " — " : "") + mark.parentElement.textContent.trim().slice(0, 90),
        el: mark
      });
    });

    searchHits.innerHTML = "";
    snippets.forEach(function (item) {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.textContent = item.label;
      btn.addEventListener("click", function () {
        closeModal("search");
        item.el.scrollIntoView({ behavior: "smooth", block: "center" });
      });
      searchHits.appendChild(btn);
    });

    return count;
  }

  function runSearch(event) {
    event.preventDefault();
    const q = searchInput.value.trim();
    if (q.length < 2) {
      searchMeta.textContent = t("search.empty");
      searchHits.innerHTML = "";
      return;
    }
    const n = highlightQuery(q);
    if (n === 0) {
      searchMeta.textContent = t("search.none").replace("{q}", q);
    } else {
      searchMeta.textContent = t("search.count").replace("{n}", String(n)).replace("{q}", q);
    }
  }

  /* ---------- Scroll suave y estado del nav ---------- */
  function offsetChrome() {
    return chrome ? chrome.offsetHeight : 110;
  }

  function smoothTo(hash) {
    const target = document.querySelector(hash);
    if (!target) return;
    const top = target.getBoundingClientRect().top + window.pageYOffset - offsetChrome() + 2;
    window.scrollTo({ top: top, behavior: "smooth" });
  }

  function updateActiveNav() {
    const sections = document.querySelectorAll("main section[id]");
    const scrollPos = window.scrollY + offsetChrome() + 24;
    let current = "inicio";
    sections.forEach(function (section) {
      if (section.offsetTop <= scrollPos) current = section.id;
    });
    document.querySelectorAll(".nav__link").forEach(function (link) {
      link.classList.toggle("is-active", link.getAttribute("href") === "#" + current);
    });
  }

  function onScroll() {
    if (chrome) chrome.classList.toggle("is-scrolled", window.scrollY > 12);
    updateActiveNav();
  }

  /* ---------- Aparición de bloques ---------- */
  function initReveals() {
    const nodes = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) {
      nodes.forEach(function (el) { el.classList.add("is-visible"); });
      return;
    }
    const io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    nodes.forEach(function (el) { io.observe(el); });
  }

  /* ---------- Formularios ---------- */
  function validEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  function handleContact(event) {
    event.preventDefault();
    const form = event.target;
    const error = document.getElementById("formError");
    const ok = document.getElementById("formOk");
    const nombre = form.nombre.value.trim();
    const email = form.email.value.trim();
    const asunto = form.asunto.value;
    const mensaje = form.mensaje.value.trim();
    const privacidad = form.privacidad.checked;
    ok.hidden = true;
    if (!nombre || !validEmail(email) || !asunto || !mensaje || !privacidad) {
      error.hidden = false;
      error.textContent = t("form.error");
      return;
    }
    error.hidden = true;
    ok.hidden = false;
    form.reset();
  }

  function handleLogin(event) {
    event.preventDefault();
    const err = document.getElementById("loginError");
    const ok = document.getElementById("loginOk");
    const email = document.getElementById("loginEmail").value.trim();
    const pass = document.getElementById("loginPass").value;
    ok.hidden = true;
    if (!validEmail(email) || pass.length < 6) {
      err.hidden = false;
      err.textContent = t("login.error");
      return;
    }
    err.hidden = true;
    ok.hidden = false;
  }

  /* ---------- Cookies ---------- */
  function initCookies() {
    if (localStorage.getItem(STORAGE.cookies) === "1") {
      cookieBanner.hidden = true;
      return;
    }
    //cookieBanner.hidden = false;
  }

  /* ---------- Enlaces internos ---------- */
  function onDocClick(event) {
    const closeAttr = event.target.closest("[data-close]");
    if (closeAttr) {
      closeModal(closeAttr.getAttribute("data-close"));
      return;
    }

    const addBtn = event.target.closest(".js-add");
    if (addBtn) {
      const card = addBtn.closest("[data-id]");
      if (card) addFromCard(card);
      return;
    }

    const qtyBtn = event.target.closest("[data-qty]");
    if (qtyBtn) {
      changeQty(qtyBtn.getAttribute("data-qty"), Number(qtyBtn.getAttribute("data-delta")));
      return;
    }

    const removeBtn = event.target.closest("[data-remove]");
    if (removeBtn) {
      changeQty(removeBtn.getAttribute("data-remove"), -999);
      return;
    }

    const anchor = event.target.closest('a[href^="#"]');
    if (anchor) {
      const hash = anchor.getAttribute("href");
      if (hash && hash.length > 1 && document.querySelector(hash)) {
        event.preventDefault();
        closeMenu();
        closeCart();
        closeModal();
        smoothTo(hash);
      }
    }
  }

  function onKeydown(event) {
    if (event.key === "Escape") {
      closeMenu();
      closeCart();
      closeModal();
    }
  }

  function onResize() {
    if (window.innerWidth > 1024) closeMenu();
    onScroll();
  }

  /* ---------- Carrito, reserva y pago ---------- */
  function money(n) {
    return n.toLocaleString(currentLang === "en" ? "en-GB" : "es-ES", {
      style: "currency",
      currency: "EUR"
    });
  }

  function loadCart() {
    try {
      cart = JSON.parse(localStorage.getItem(STORAGE.cart) || "[]");
      if (!Array.isArray(cart)) cart = [];
    } catch (err) {
      cart = [];
    }
  }

  function saveCart() {
    localStorage.setItem(STORAGE.cart, JSON.stringify(cart));
  }

  function cartCount() {
    return cart.reduce(function (sum, item) { return sum + item.qty; }, 0);
  }

  function cartSubtotal() {
    return cart.reduce(function (sum, item) { return sum + item.price * item.qty; }, 0);
  }

  function shipCost(fulfill) {
    if (fulfill !== "delivery") return 0;
    return cartSubtotal() >= FREE_FROM ? 0 : DELIVERY_FEE;
  }

  function showToast(msg) {
    const toast = document.getElementById("toast");
    toast.textContent = msg;
    toast.hidden = false;
    toast.classList.add("is-on");
    window.clearTimeout(showToast._t);
    showToast._t = window.setTimeout(function () {
      toast.classList.remove("is-on");
    }, 1800);
  }

  function addFromCard(card) {
    const id = card.getAttribute("data-id");
    const price = parseFloat(card.getAttribute("data-price"));
    const unit = card.getAttribute("data-unit") || "ud";
    const nameKey = card.getAttribute("data-name-key") || id;
    const img = card.getAttribute("data-img") || "";
    const found = cart.find(function (item) { return item.id === id; });
    if (found) found.qty += 1;
    else cart.push({ id: id, price: price, unit: unit, nameKey: nameKey, img: img, qty: 1 });
    saveCart();
    renderCart();
    showToast(t("cart.added"));
  }

  function changeQty(id, delta) {
    cart = cart.map(function (item) {
      if (item.id !== id) return item;
      return { id: item.id, price: item.price, unit: item.unit, nameKey: item.nameKey, img: item.img, qty: item.qty + delta };
    }).filter(function (item) { return item.qty > 0; });
    saveCart();
    renderCart();
  }

  function renderCart() {
    const list = document.getElementById("cartList");
    const badge = document.getElementById("cartBadge");
    const sub = document.getElementById("cartSubtotal");
    const hint = document.getElementById("cartHint");
    const checkoutBtn = document.getElementById("cartCheckout");
    if (!list) return;
    const count = cartCount();
    badge.hidden = count === 0;
    badge.textContent = String(count);
    sub.textContent = money(cartSubtotal());
    hint.textContent = cartSubtotal() < MIN_ORDER ? t("cart.min") : t("cart.freeFrom");
    checkoutBtn.disabled = cartSubtotal() < MIN_ORDER;
    if (!cart.length) {
      list.innerHTML = "<p class=\"cart-empty\">" + t("cart.empty") + "</p>";
      return;
    }
    list.innerHTML = cart.map(function (item) {
      return (
        "<article class=\"cart-item\" data-id=\"" + item.id + "\">" +
          "<img src=\"" + item.img + "\" alt=\"\">" +
          "<div>" +
            "<h3>" + t(item.nameKey) + "</h3>" +
            "<p>" + money(item.price) + " · " + t("unit." + item.unit) + "</p>" +
            "<div class=\"qty-box\">" +
              "<button type=\"button\" data-qty=\"" + item.id + "\" data-delta=\"-1\" aria-label=\"-\">−</button>" +
              "<span>" + item.qty + "</span>" +
              "<button type=\"button\" data-qty=\"" + item.id + "\" data-delta=\"1\" aria-label=\"+\">+</button>" +
            "</div>" +
          "</div>" +
          "<div class=\"cart-item__side\">" +
            "<strong>" + money(item.price * item.qty) + "</strong>" +
            "<button type=\"button\" class=\"cart-item__remove\" data-remove=\"" + item.id + "\">" + t("cart.remove") + "</button>" +
          "</div>" +
        "</article>"
      );
    }).join("");
  }

  function openCart() {
    cartDrawer.hidden = false;
    body.classList.add("cart-open");
    requestAnimationFrame(function () {
      cartDrawer.classList.add("is-open");
    });
    renderCart();
  }

  function closeCart() {
    cartDrawer.classList.remove("is-open");
    body.classList.remove("cart-open");
    window.setTimeout(function () {
      if (!cartDrawer.classList.contains("is-open")) cartDrawer.hidden = true;
    }, 400);
  }

  function fulfillValue() {
    const checked = document.querySelector("input[name=\"fulfill\"]:checked");
    return checked ? checked.value : "pickup";
  }

  function payValue() {
    const checked = document.querySelector("input[name=\"payMethod\"]:checked");
    return checked ? checked.value : "pickup";
  }

  function summaryHtml(fulfill) {
    const ship = shipCost(fulfill);
    const lines = cart.map(function (item) {
      return "<li><span>" + t(item.nameKey) + " × " + item.qty + "</span><span>" + money(item.price * item.qty) + "</span></li>";
    }).join("");
    const shipLabel = ship === 0 ? t("check.shipFree") : money(ship);
    return (
      "<ul>" + lines +
      "<li><span>" + t("cart.subtotal") + "</span><span>" + money(cartSubtotal()) + "</span></li>" +
      "<li><span>" + t("check.ship") + "</span><span>" + shipLabel + "</span></li>" +
      "<li class=\"is-total\"><span>" + t("cart.subtotal").replace(t("cart.subtotal"), currentLang === "en" ? "Total" : "Total") + "</span><span>" + money(cartSubtotal() + ship) + "</span></li>" +
      "</ul>"
    );
  }

  function setCheckoutStep(step) {
    checkoutStep = step;
    document.querySelectorAll(".check-pane").forEach(function (pane) {
      const n = Number(pane.getAttribute("data-pane"));
      pane.hidden = n !== step;
      pane.classList.toggle("is-active", n === step);
    });
    document.querySelectorAll("#checkoutSteps li").forEach(function (li, index) {
      li.classList.toggle("is-active", index === step - 1);
    });
    document.getElementById("checkBack").hidden = step === 1;
    const next = document.getElementById("checkNext");
    if (step < 3) next.textContent = t("check.next");
    else next.textContent = payValue() === "gateway" ? t("check.goPay") : t("check.confirm");
    if (step === 3) {
      document.getElementById("orderSummary").innerHTML = summaryHtml(fulfillValue());
    }
  }

  function syncCheckoutUi() {
    const pickup = fulfillValue() === "pickup";
    document.getElementById("pickupFields").hidden = !pickup;
    document.getElementById("deliveryFields").hidden = pickup;
    document.getElementById("payPickupOption").hidden = !pickup;
    document.getElementById("payDeliveryOption").hidden = pickup;
    const payPickup = document.querySelector("#payPickupOption input");
    const payDelivery = document.querySelector("#payDeliveryOption input");
    if (pickup) {
      if (payValue() === "ondelivery") payPickup.checked = true;
    } else if (payValue() === "pickup") {
      payDelivery.checked = true;
    }
    const next = document.getElementById("checkNext");
    if (next && checkoutStep === 3) {
      next.textContent = payValue() === "gateway" ? t("check.goPay") : t("check.confirm");
    }
    if (checkoutStep === 3) {
      const box = document.getElementById("orderSummary");
      if (box) box.innerHTML = summaryHtml(fulfillValue());
    }
  }

  function todayIso() {
    const d = new Date();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return d.getFullYear() + "-" + m + "-" + day;
  }

  function buildOrder() {
    const fulfill = fulfillValue();
    const pay = payValue();
    const ship = shipCost(fulfill);
    const total = cartSubtotal() + ship;
    const id = "FR-" + String(Date.now()).slice(-6);
    return {
      id: id,
      items: cart.map(function (item) {
        return { id: item.id, name: t(item.nameKey), qty: item.qty, price: item.price };
      }),
      subtotal: cartSubtotal(),
      shipping: ship,
      total: total,
      fulfill: fulfill,
      pay: pay,
      store: document.getElementById("pickupStore").value,
      date: document.getElementById("orderDate").value,
      slot: document.getElementById("orderSlot").value,
      customer: {
        name: document.getElementById("custName").value.trim(),
        phone: document.getElementById("custPhone").value.trim(),
        email: document.getElementById("custEmail").value.trim(),
        street: document.getElementById("custStreet").value.trim(),
        floor: document.getElementById("custFloor").value.trim(),
        zip: document.getElementById("custZip").value.trim(),
        city: document.getElementById("custCity").value.trim(),
        notes: document.getElementById("custNotes").value.trim()
      }
    };
  }

  function validateStep(step) {
    const err = document.getElementById("checkError");
    err.hidden = true;
    if (step === 1) {
      if (!document.getElementById("orderDate").value || !document.getElementById("orderSlot").value) {
        err.hidden = false;
        err.textContent = t("check.error1");
        return false;
      }
    }
    if (step === 2) {
      const name = document.getElementById("custName").value.trim();
      const phone = document.getElementById("custPhone").value.trim();
      const email = document.getElementById("custEmail").value.trim();
      if (!name || phone.length < 8 || !validEmail(email)) {
        err.hidden = false;
        err.textContent = t("check.error2");
        return false;
      }
      if (fulfillValue() === "delivery") {
        const street = document.getElementById("custStreet").value.trim();
        const zip = document.getElementById("custZip").value.trim();
        const city = document.getElementById("custCity").value.trim();
        if (!street || zip.length < 4 || !city) {
          err.hidden = false;
          err.textContent = t("check.errorAddr");
          return false;
        }
      }
    }
    return true;
  }

  function finishReservation(order) {
    pendingOrder = order;
    cart = [];
    saveCart();
    renderCart();
    closeModal("checkout");
    closeModal("pay");
    closeCart();
    const text = order.pay === "gateway"
      ? t("done.gateway")
      : (order.fulfill === "pickup" ? t("done.pickup") : t("done.delivery"));
    document.getElementById("doneText").textContent = text;
    document.getElementById("doneCode").textContent = t("done.code") + ": " + order.id;
    openModal("done");
  }

  function openPayWindow(order) {
    pendingOrder = order;
    document.getElementById("payOrderId").textContent = t("done.code") + ": " + order.id;
    document.getElementById("payBreakdown").innerHTML = summaryHtml(order.fulfill);
    document.getElementById("payTotal").textContent = money(order.total);
    closeModal("checkout");
    openModal("pay");
  }

  /* Gancho para la pasarela real: sustituye start() cuando la implementes. */
  window.FrescoPayment = {
    start: function (order) {
      const mount = document.getElementById("paymentGatewayMount");
      const box = document.getElementById("payPlaceholder");
      mount.setAttribute("data-order-id", order.id);
      mount.setAttribute("data-amount", String(order.total.toFixed(2)));
      mount.setAttribute("data-currency", "EUR");
      box.textContent = t("pay.hook") + " " + money(order.total);
    }
  };

  function openCheckout() {
    if (cartSubtotal() < MIN_ORDER) {
      showToast(t("cart.min"));
      return;
    }
    closeCart();
    checkoutStep = 1;
    document.getElementById("checkError").hidden = true;
    const dateInput = document.getElementById("orderDate");
    dateInput.min = todayIso();
    if (!dateInput.value) dateInput.value = todayIso();
    setCheckoutStep(1);
    syncCheckoutUi();
    openModal("checkout");
  }

  /* ---------- Arranque ---------- */
  function init() {
    if (yearEl) yearEl.textContent = String(new Date().getFullYear());
    initTheme();
    loadCart();
    applyLanguage(localStorage.getItem(STORAGE.lang) || "es");
    initReveals();
    initCookies();
    onScroll();

    themeToggle.addEventListener("click", function () {
      applyTheme(html.getAttribute("data-theme") === "dark" ? "light" : "dark");
    });

    hamburger.addEventListener("click", toggleMenu);

    document.getElementById("searchOpen").addEventListener("click", function () {
      openModal("search");
    });
    document.getElementById("mobileSearchBtn").addEventListener("click", function () {
      closeMenu();
      openModal("search");
    });
    document.getElementById("loginOpen").addEventListener("click", function () {
      closeMenu();
      openModal("login");
    });
    document.getElementById("cartOpen").addEventListener("click", function () {
      closeMenu();
      openCart();
    });
    document.getElementById("mobileCartBtn").addEventListener("click", function () {
      closeMenu();
      openCart();
    });
    document.getElementById("cartClose").addEventListener("click", closeCart);
    document.getElementById("cartBackdrop").addEventListener("click", closeCart);
    document.getElementById("cartClear").addEventListener("click", function () {
      cart = [];
      saveCart();
      renderCart();
    });
    document.getElementById("cartCheckout").addEventListener("click", openCheckout);
    document.getElementById("checkoutForm").addEventListener("submit", function (event) {
      event.preventDefault();
    });
    document.querySelectorAll("input[name=\"fulfill\"]").forEach(function (input) {
      input.addEventListener("change", syncCheckoutUi);
    });
    document.querySelectorAll("input[name=\"payMethod\"]").forEach(function (input) {
      input.addEventListener("change", syncCheckoutUi);
    });
    document.getElementById("checkNext").addEventListener("click", function () {
      if (!validateStep(checkoutStep)) return;
      if (checkoutStep < 3) {
        setCheckoutStep(checkoutStep + 1);
        return;
      }
      const order = buildOrder();
      if (order.pay === "gateway") openPayWindow(order);
      else finishReservation(order);
    });
    document.getElementById("checkBack").addEventListener("click", function () {
      if (checkoutStep > 1) setCheckoutStep(checkoutStep - 1);
    });
    document.getElementById("payBack").addEventListener("click", function () {
      closeModal("pay");
      openModal("checkout");
      setCheckoutStep(3);
    });
    document.getElementById("payGatewayStart").addEventListener("click", function () {
      if (!pendingOrder) pendingOrder = buildOrder();
      window.FrescoPayment.start(pendingOrder);
    });
    document.getElementById("openCookies").addEventListener("click", function () {
      openModal("cookies");
    });
    document.getElementById("openRequisitos").addEventListener("click", function () {
      openModal("requisitos");
    });
    document.getElementById("cookiesMore").addEventListener("click", function () {
      openModal("cookies");
    });
    document.getElementById("cookiesAccept").addEventListener("click", function () {
      //cookieBanner.hidden = true;
      document.getElementById("cookieBanner").hidden = true;
      localStorage.setItem(STORAGE.cookies, "1");
    });

    document.querySelectorAll(".lang-btn").forEach(function (btn) {
      btn.addEventListener("click", function () {
        applyLanguage(btn.getAttribute("data-lang"));
      });
    });

    searchForm.addEventListener("submit", runSearch);
    document.getElementById("contactForm").addEventListener("submit", handleContact);
    document.getElementById("loginForm").addEventListener("submit", handleLogin);

    document.addEventListener("click", onDocClick);
    document.addEventListener("keydown", onKeydown);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
