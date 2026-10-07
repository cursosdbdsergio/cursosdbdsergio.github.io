/**
 * ============================================================================
 * MERCATFRESC - SUPERMERCADO & ALIMENTACIÓN GENERAL
 * JavaScript Puro (Vanilla JS) - Sin dependencias ni librerías externas
 * ============================================================================
 */

(function () {
  'use strict';

  /* --------------------------------------------------------------------------
     1. DICCIONARIO TRILINGÜE (ESPAÑOL, INGLÉS, VALENCIANO)
     -------------------------------------------------------------------------- */
  const translations = {
    es: {
      topbar_badge: "Envío Exprés",
      topbar_promo: "Envío gratis a partir de 45€ | Entregas refrigeradas en menos de 2 horas",
      topbar_schedule: "L-S: 8:00 - 21:30",
      nav_home: "Inicio",
      nav_aisles: "Pasillos",
      nav_deals: "Ofertas de la Semana",
      nav_commitment: "Compromiso Km 0",
      nav_services: "Servicios",
      nav_contact: "Contacto",
      mobile_search_placeholder: "Buscar productos o pasillos...",
      hero_pill: "100% Fresco & Alimentación Saludable",
      hero_title: "Lo mejor de la huerta y el mar, <span>directo a tu mesa</span>",
      hero_sub: "Frutas recolectadas a diario, panadería artesanal de masa madre, pescadería de lonja y carnicería de proximidad. Toda la compra del hogar con entrega exprés en 2 horas.",
      btn_explore: "Explorar Pasillos",
      btn_deals: "Ver Ofertas Semanales",
      feat_1_title: "Fresco Garantizado",
      feat_1_desc: "Si no te gusta, te lo cambiamos",
      feat_2_title: "Entrega en 2 Horas",
      feat_2_desc: "Furgones isotérmicos 100% fríos",
      feat_3_title: "Huerta & Km 0",
      feat_3_desc: "Trato directo sin intermediarios",
      feat_4_title: "Sostenibilidad",
      feat_4_desc: "Envases biodegradables y reciclaje",
      info_tag: "Calidad Certificada",
      info_title: "Por Qué Elegir MercatFresc Cada Día",
      info_desc: "No somos solo un supermercado: somos el puente honesto entre la tierra fértil de nuestros agricultores y la mesa de tu familia. Cuidamos cada producto desde su recolección.",
      info_c1_title: "Huerta de Proximidad (Km 0)",
      info_c1_text: "Tomates de huerta, cítricos valencianos y hortalizas recolectadas a primera hora. Cosecha matinal que llega a nuestras tiendas en menos de 4 horas tras salir de la mata.",
      info_c2_title: "Cadena de Frío Rigurosa",
      info_c2_text: "Monitoreo térmico digital desde los obradores hasta tu puerta. Garantizamos que pescados, carnes y lácteos jamás pierdan la temperatura óptima recomendada.",
      info_c3_title: "Horno Tradicional Diario",
      info_c3_text: "Panes artesanos con fermentaciones lentas de más de 24 horas y masa madre viva. Horneamos 3 veces al día para que siempre disfrutes de pan caliente y crujiente.",
      info_c4_title: "Lonja & Pesca Sostenible",
      info_c4_text: "Pescado salvaje capturado con artes tradicionales respetuosas. Recibimos el desembarque diario de Cullera, Castellón y Santa Pola sin intermediarios.",
      info_c5_title: "Despensa Bio & Ecológica",
      info_c5_text: "Más de 2.000 referencias con sello de agricultura ecológica europea: legumbres a granel, aceites virgen extra prensados en frío y productos sin gluten certificados.",
      info_c6_title: "Precios Claros y Honestos",
      info_c6_text: "Pagamos el precio justo a los productores de nuestra tierra mientras cuidamos el bolsillo de tu hogar con ofertas semanales reales y cheques ahorro mensuales.",
      stat_1: "Hogares que confían cada mes",
      stat_2: "Productores locales asociados",
      stat_3: "Trazabilidad y frescura probada",
      stat_4: "Tiempo medio de entrega a domicilio",
      aisles_tag: "Nuestros Pasillos",
      aisles_title: "Alimentación Fresca, Despensa y Bodega",
      aisles_desc: "Recorre nuestras secciones como si estuvieras en el mercado tradicional con la comodidad de tu pantalla.",
      cat_all: "Todos los Pasillos",
      cat_fruits: "Fruta & Huerta",
      cat_bakery: "Horno & Pan",
      cat_fish: "Pescadería",
      cat_deli: "Quesos & Gourmet",
      cat_pantry: "Despensa & Bio",
      badge_km0: "Km 0",
      badge_artisan: "Artesanal",
      badge_offer: "Super Oferta",
      badge_top: "Premio Sabor",
      badge_bio: "Certificado Bio",
      p1_cat: "Huerta de Alboraya",
      p1_name: "Tomate Rosa de Huerta Tradicional",
      p1_origin: "Cosecha de esta mañana",
      p2_cat: "Horno y Obrador",
      p2_name: "Hogaza Rústica 100% Masa Madre (800g)",
      p2_origin: "Fermentación natural de 24h",
      p3_cat: "Lonja Mediterránea",
      p3_name: "Lubina de Bahía Seleccionada",
      p3_origin: "Subasta matinal de Cullera",
      p4_cat: "Charcutería & Corte",
      p4_name: "Queso Curado al Romero de Maestrat",
      p4_origin: "Maduración mínima 9 meses",
      p5_cat: "Huerta del Xúquer",
      p5_name: "Naranjas Navelate de Mesa (Malla 3kg)",
      p5_origin: "Sin ceras ni tratamientos poscosecha",
      p6_cat: "Bollería Tradicional",
      p6_name: "Croissant Francés Puro Hojaldrado (Pack 2)",
      p6_origin: "Horneado hoy a las 7:30",
      p7_cat: "Almazara de Sierra Espadán",
      p7_name: "Aceite Virgen Extra Ecológico Serrana (500ml)",
      p7_origin: "Prensado en frío de primera cosecha",
      p8_cat: "Frutos Rojos",
      p8_name: "Fresón Dulce Seleccionado (Caja 500g)",
      p8_origin: "Madurado naturalmente al sol",
      deals_tag: "Ofertas de la Semana",
      deals_title: "El Folleto Digital de Temporada",
      deals_desc: "Cada jueves renovamos las promociones de productos frescos y básicos de despensa. Ahorra hasta un 30% sin renunciar a la máxima calidad.",
      deal1_title: "Toda la Pescadería los Martes",
      deal1_desc: "Directo de la primera subasta de la semana. Pescados blancos, azules y mariscos al corte tradicional según tu preferencia.",
      deal2_title: "Despensa Ecológica Certificada",
      deal2_desc: "Combina legumbres, arroces con Denominación de Origen Valencia, pastas integrales y conservas vegetales ecológicas.",
      deal3_title: "Bienvenida al Club Fresc",
      deal3_desc: "Regístrate en menos de un minuto y recibe un cupón directo de 10 € para tu primer pedido superior a 50 € en tienda u online.",
      services_tag: "Nuestros Servicios",
      services_title: "Compra Como Quieras, Cuando Quieras",
      services_desc: "Diseñamos soluciones modernas para que ahorres tiempo en tu día a día sin sacrificar el placer de comer sano.",
      srv1_title: "Entrega en Frío en 2 Horas",
      srv1_desc: "Pide antes de las 19:30 y te lo llevamos hoy mismo en franjas de 1 hora elegidas por ti. Garantía total de temperatura en frescos y congelados.",
      srv1_perk: "Gratis en compras superiores a 45 €",
      srv2_title: "Click & Drive / Recogida Express",
      srv2_desc: "Haz tu pedido desde la web o el móvil y pasa a recogerlo en nuestras plazas reservadas de aparcamiento. Lo cargamos en tu maletero en 5 minutos.",
      srv2_perk: "Listo en 90 minutos y sin esperas",
      srv3_title: "Club Fresc de Fidelidad",
      srv3_desc: "Acumula el 3% de todas tus compras en tu saldo personal, recibe descuentos exclusivos en tus marcas favoritas y cupones de cumpleaños.",
      srv3_perk: "100% gratuito y sin comisiones",
      contact_tag: "Contacto & Soporte",
      contact_title: "Estamos a tu Disposición",
      contact_desc: "¿Tienes dudas con tu pedido, quieres solicitar un corte especial de carnicería o eres un productor local que desea vender con nosotros? Escríbenos.",
      info_box_title: "Atención al Cliente Inmediata",
      info_box_desc: "Nuestro equipo responde con cercanía y rapidez. También puedes visitarnos en cualquiera de nuestros supermercados físicos en la Comunidad Valenciana.",
      lbl_phone: "Teléfono de Pedidos",
      lbl_email: "Correo Electrónico",
      lbl_hq: "Sede Central & Mercado",
      lbl_hours: "Horario Comercial",
      val_hours: "Lunes a Sábado: 08:00 a 21:30 (Ininterrumpido)",
      lbl_stores: "Nuestras Tiendas Físicas:",
      form_success_msg: "¡Gracias por contactar con MercatFresc! Hemos recibido tu mensaje y te responderemos en breve.",
      f_name: "Nombre completo *",
      f_phone: "Teléfono de contacto",
      f_email: "Correo electrónico *",
      f_subject: "Motivo de la consulta",
      f_msg: "Mensaje *",
      f_privacy: "He leído y acepto la política de privacidad y el tratamiento de mis datos de contacto.",
      f_pass: "Contraseña",
      f_new_pass: "Crear contraseña",
      opt_order: "Estado de mi pedido a domicilio",
      opt_store: "Consulta sobre productos o disponibilidad",
      opt_club: "Dudas con Club Fresc y puntos de ahorro",
      opt_supplier: "Soy productor / Proveedor local Km 0",
      opt_other: "Otra sugerencia o comentario",
      btn_send: "Enviar Mensaje",
      foot_bio: "Tu supermercado de cercanía con vocación mediterránea. Alimentación saludable, frutas de recolección matinal y entrega a domicilio sostenible.",
      foot_h_aisles: "Nuestros Pasillos",
      foot_h_legal: "Legal y Requisitos",
      foot_h_news: "Boletín de Ofertas",
      foot_news_sub: "Recibe en tu correo cada jueves las ofertas y los productos de temporada antes que nadie.",
      link_cookies: "Política de Cookies",
      link_terms: "Términos y Requisitos Legales",
      link_allergens: "Información de Alérgenos",
      link_cold: "Garantía de Cadena de Frío",
      link_claims: "Hojas de Reclamaciones",
      foot_copy: "© 2026 MercatFresc Supermercats S.L. Todos los derechos reservados.",
      search_placeholder: "Escribe para buscar productos, pasillos o servicios...",
      search_hint: "Escribe por ejemplo: 'tomate', 'pan', 'pescado', 'aceite', 'horario' o 'envío'.",
      tab_login: "Iniciar Sesión",
      tab_register: "Crear Cuenta",
      btn_login_submit: "Entrar a mi Cuenta",
      btn_reg_submit: "Darme de Alta Gratis",
      btn_accept_cookies: "Entendido y Aceptar",
      btn_close: "Cerrar",
      modal_cookies_title: "Política de Cookies de MercatFresc",
      modal_terms_title: "Términos, Condiciones y Requisitos",
      cart_added: "¡Producto añadido a tu cesta de la compra!",
      cart_title: "Mi Cesta",
      nav_cart: "Mi Cesta de la Compra",
      shipping_free_target: "Envío a domicilio gratis a partir de 45 €",
      cart_empty_title: "Tu cesta está vacía",
      cart_empty_desc: "Explora nuestros pasillos y añade los mejores alimentos frescos del mercado.",
      btn_apply_coupon: "Aplicar",
      lbl_subtotal: "Subtotal productos",
      lbl_discount: "Descuento cupón",
      lbl_shipping_option: "Entrega / Recogida",
      lbl_shipping_hint: "Gratis en tienda / desde 0€",
      lbl_total: "Total a pagar",
      btn_proceed_checkout: "Tramitar Compra y Reserva",
      btn_clear_cart: "Vaciar cesta",
      checkout_title: "Tramitar Pedido y Reserva",
      checkout_sub: "Selecciona si recogerás tu compra en tienda o prefieres envío a domicilio, y elige cómo deseas pagar.",
      step1_title: "¿Cómo deseas recibir tu compra?",
      opt_pickup_title: "Recogida en el Mercado (Click & Collect)",
      opt_pickup_desc: "100% Gratis. Listo en 90 min o a la hora que elijas. Opción de entrega directa al maletero.",
      badge_free: "¡Gratis!",
      opt_delivery_title: "Envío a tu Domicilio en 2h",
      opt_delivery_desc: "Furgón refrigerado con control térmico directo hasta tu puerta.",
      lbl_select_store: "Selecciona el Supermercado *",
      lbl_pickup_day: "Día de recogida *",
      lbl_pickup_slot: "Franja horaria de recogida *",
      lbl_drive_plate: "Click & Drive (Opcional: Matrícula para cargar en maletero)",
      lbl_address: "Dirección completa (Calle, número) *",
      lbl_floor: "Piso, puerta, escalera *",
      lbl_zip: "Código Postal *",
      lbl_city: "Población / Ciudad *",
      lbl_delivery_slot: "Franja de entrega en frío *",
      lbl_notes: "Instrucciones para el repartidor (Opcional)",
      step2_title: "Datos de contacto para la reserva",
      lbl_phone_mobile: "Teléfono móvil (avisos de preparación) *",
      step3_title: "¿Cómo deseas pagar?",
      pay_opt_pickup_title: "Pagar al ir a recogerlo en el mercado",
      lbl_in_store: "En Tienda",
      pay_opt_pickup_desc: "Pagarás cómodamente en la caja rápida de recogida del supermercado cuando retires tu compra, tanto en efectivo como con tarjeta de crédito/débito.",
      pay_opt_delivery_title: "Pagar cuando te lo entreguen a domicilio",
      lbl_on_delivery: "Al Repartidor",
      pay_opt_delivery_desc: "Paga al repartidor al recibir las bolsas en tu puerta. El repartidor lleva datáfono inalámbrico para tarjeta o puedes abonarlo en efectivo.",
      pay_opt_gateway_title: "Pagar por la pasarela de pago online del mercado",
      pay_opt_gateway_desc: "Se abrirá una ventana segura donde se te indicará el importe exacto a pagar antes de procesar el pago con tu tarjeta o Bizum.",
      lbl_total_order: "Importe del Pedido:",
      btn_back_to_cart: "Volver a la cesta",
      btn_confirm_reservation: "Confirmar Reserva del Pedido",
      gw_title: "Pasarela de Pago Segura | MercatFresc",
      gw_order_ref: "Referencia de Pago:",
      gw_amount_to_pay: "IMPORTE TOTAL A PAGAR",
      lbl_customer: "Cliente:",
      lbl_mode: "Modalidad:",
      gw_dev_title: "Entorno de Pasarela de Pago del Mercado",
      gw_dev_desc: "Esta interfaz está preparada para que insertes el script o endpoint oficial de tu pasarela bancaria (Redsys, Stripe, Bizum o PayPal). Puedes realizar la prueba interactiva a continuación:",
      gw_tab_card: "Tarjeta Bancaria",
      gw_tab_bizum: "Bizum Exprés",
      gw_card_number: "Número de tarjeta",
      gw_card_exp: "Caducidad",
      gw_card_cvv: "CVV / CVC",
      gw_card_holder: "Nombre del titular",
      gw_bizum_phone: "Teléfono móvil registrado en Bizum",
      gw_bizum_hint: "Recibirás una solicitud de confirmación instantánea en la app de tu banco.",
      gw_bizum_btn: "Pagar con Bizum",
      btn_cancel_payment: "Cancelar y regresar al pedido",
      succ_title: "¡Pedido Confirmado con Éxito!",
      succ_subtitle: "Hemos registrado tu reserva en MercatFresc. Ya estamos preparando los productos con el máximo cuidado y frescura.",
      succ_order_number: "Número de Pedido:",
      succ_lbl_customer: "Titular:",
      succ_lbl_phone: "Teléfono:",
      succ_lbl_mode: "Modalidad de Entrega:",
      succ_lbl_payment: "Forma de Pago:",
      succ_lbl_total: "Importe Total:",
      btn_print_receipt: "Imprimir Comprobante",
      btn_continue_shopping: "Seguir Comprando"
    },
    en: {
      topbar_badge: "Express Delivery",
      topbar_promo: "Free delivery on orders over €45 | Temperature-controlled delivery under 2 hours",
      topbar_schedule: "Mon-Sat: 8:00 AM - 9:30 PM",
      nav_home: "Home",
      nav_aisles: "Aisles",
      nav_deals: "Weekly Deals",
      nav_commitment: "Km 0 Commitment",
      nav_services: "Services",
      nav_contact: "Contact",
      mobile_search_placeholder: "Search groceries or aisles...",
      hero_pill: "100% Fresh & Healthy Food",
      hero_title: "The best of land and sea, <span>straight to your table</span>",
      hero_sub: "Daily picked produce, artisan sourdough bread, fresh morning fish and local butchery. Complete household shopping delivered in under 2 hours.",
      btn_explore: "Explore Aisles",
      btn_deals: "View Weekly Deals",
      feat_1_title: "Guaranteed Fresh",
      feat_1_desc: "Love it or we replace it instantly",
      feat_2_title: "Delivery in 2 Hours",
      feat_2_desc: "100% temperature-controlled vans",
      feat_3_title: "Local Farm & Km 0",
      feat_3_desc: "Direct partnership with growers",
      feat_4_title: "Sustainability",
      feat_4_desc: "Biodegradable bags and green packaging",
      info_tag: "Certified Quality",
      info_title: "Why Choose MercatFresc Every Day",
      info_desc: "We are more than a supermarket: we are the honest bridge between our farmers' fertile land and your family's dining table.",
      info_c1_title: "Local Farm Freshness (Km 0)",
      info_c1_text: "Vine-ripened tomatoes, Valencian citrus and leafy vegetables harvested early morning. Arriving in our market stalls in under 4 hours.",
      info_c2_title: "Strict Cold Chain",
      info_c2_text: "Digital thermal tracking from preparation to your doorstep. Ensuring seafood, meats and dairy stay at optimal freshness temperatures.",
      info_c3_title: "Daily Artisan Bakery",
      info_c3_text: "Slow 24-hour fermentation breads made with alive wild sourdough. Baked 3 times daily so you always enjoy warm, crusty bread.",
      info_c4_title: "Sustainable Daily Fish Market",
      info_c4_text: "Wild fish caught with sustainable artisanal gears. Fresh arrivals daily from Cullera, Castellón and Santa Pola docks.",
      info_c5_title: "Organic & Bio Pantry",
      info_c5_text: "Over 2,000 certified European organic items: bulk pulses, cold-pressed extra virgin olive oils and certified gluten-free foods.",
      info_c6_title: "Fair & Honest Prices",
      info_c6_text: "We pay fair rates to our local agricultural partners while keeping family budgets safe with genuine weekly savings.",
      stat_1: "Households shopping with us each month",
      stat_2: "Associated local agricultural producers",
      stat_3: "Traceability and certified freshness",
      stat_4: "Average door-to-door delivery time",
      aisles_tag: "Our Aisles",
      aisles_title: "Fresh Groceries, Pantry & Wine Cellar",
      aisles_desc: "Browse our market aisles just like in a traditional food market from the comfort of your screen.",
      cat_all: "All Aisles",
      cat_fruits: "Fruit & Veg",
      cat_bakery: "Bakery & Bread",
      cat_fish: "Seafood & Fish",
      cat_deli: "Cheese & Deli",
      cat_pantry: "Organic Pantry",
      badge_km0: "Km 0",
      badge_artisan: "Artisan",
      badge_offer: "Super Deal",
      badge_top: "Taste Award",
      badge_bio: "Organic Bio",
      p1_cat: "Alboraya Farmland",
      p1_name: "Traditional Heirloom Pink Tomato",
      p1_origin: "Harvested this morning",
      p2_cat: "Artisan Bakery",
      p2_name: "100% Sourdough Country Loaf (800g)",
      p2_origin: "Natural 24h fermentation",
      p3_cat: "Mediterranean Fish Market",
      p3_name: "Selected Wild Bay Sea Bass",
      p3_origin: "Morning dock auction at Cullera",
      p4_cat: "Charcuterie & Deli",
      p4_name: "Rosemary Cured Sheep Cheese",
      p4_origin: "Aged for at least 9 months",
      p5_cat: "Xúquer River Groves",
      p5_name: "Sweet Table Navelate Oranges (3kg)",
      p5_origin: "Unwaxed, untreated after harvest",
      p6_cat: "Traditional Pastry",
      p6_name: "Pure Butter Flaky Croissant (Pack of 2)",
      p6_origin: "Freshly baked today at 7:30 AM",
      p7_cat: "Sierra Espadán Oil Mill",
      p7_name: "Organic Serrana Extra Virgin Olive Oil (500ml)",
      p7_origin: "First cold press of harvest",
      p8_cat: "Berries & Soft Fruit",
      p8_name: "Sweet Selected Strawberries (500g punnet)",
      p8_origin: "Sun-ripened naturally on the plant",
      deals_tag: "Weekly Deals",
      deals_title: "Seasonal Digital Flyer",
      deals_desc: "Every Thursday we refresh discounts on fresh goods and kitchen essentials. Save up to 30% with uncompromising quality.",
      deal1_title: "All Fishmonger -25% on Tuesdays",
      deal1_desc: "Straight from the first fish auction of the week. Prepared and cleaned to your personal culinary preference.",
      deal2_title: "Certified Organic Pantry 3 for 2",
      deal2_desc: "Mix and match pulses, Valencia PDO rice, whole-grain pastas and organic vegetable preserves.",
      deal3_title: "Welcome €10 Voucher",
      deal3_desc: "Sign up to Club Fresc in under a minute and receive a €10 voucher for your first purchase over €50.",
      services_tag: "Our Services",
      services_title: "Shop Your Way, Whenever You Like",
      services_desc: "Modern grocery solutions designed to save you time every day without sacrificing healthy eating.",
      srv1_title: "Chilled 2-Hour Delivery",
      srv1_desc: "Order before 7:30 PM for same-day delivery in selected 1-hour slots. 100% temperature integrity guaranteed.",
      srv1_perk: "Free on orders over €45",
      srv2_title: "Click & Drive / Express Pick Up",
      srv2_desc: "Order online and pick it up at our designated drive-through parking bays. Loaded into your trunk in 5 minutes.",
      srv2_perk: "Ready in 90 minutes without queues",
      srv3_title: "Club Fresc Loyalty",
      srv3_desc: "Earn 3% back on every purchase into your personal balance, enjoy tailored discounts and birthday surprises.",
      srv3_perk: "100% free with no maintenance fees",
      contact_tag: "Contact & Support",
      contact_title: "We Are Always Here For You",
      contact_desc: "Have a question about your order, need a custom butcher cut, or are you a local grower looking to supply us? Get in touch.",
      info_box_title: "Immediate Customer Support",
      info_box_desc: "Our local support team is ready to help. You can also visit any of our physical grocery stores in the Valencian Community.",
      lbl_phone: "Customer Care Phone",
      lbl_email: "Email Support",
      lbl_hq: "Headquarters & Central Market",
      lbl_hours: "Opening Hours",
      val_hours: "Monday to Saturday: 8:00 AM - 9:30 PM",
      lbl_stores: "Our Physical Grocery Stores:",
      form_success_msg: "Thank you for reaching out to MercatFresc! We have received your inquiry and will reply shortly.",
      f_name: "Full Name *",
      f_phone: "Phone Number",
      f_email: "Email Address *",
      f_subject: "Reason for Inquiry",
      f_msg: "Your Message *",
      f_privacy: "I have read and agree to the privacy policy and processing of my contact information.",
      f_pass: "Password",
      f_new_pass: "Create Password",
      opt_order: "Status of my home delivery order",
      opt_store: "Inquiry about products or stock",
      opt_club: "Questions regarding Club Fresc rewards",
      opt_supplier: "I am a local farmer / Km 0 supplier",
      opt_other: "Other feedback or suggestions",
      btn_send: "Send Message",
      foot_bio: "Your neighborhood Mediterranean supermarket. Wholesome eating, morning farm-fresh harvests and sustainable doorstep delivery.",
      foot_h_aisles: "Our Aisles",
      foot_h_legal: "Legal & Standards",
      foot_h_news: "Weekly Offers Newsletter",
      foot_news_sub: "Get our freshest weekly offers and seasonal arrivals delivered to your inbox every Thursday.",
      link_cookies: "Cookie Policy",
      link_terms: "Terms & Legal Conditions",
      link_allergens: "Allergen Information",
      link_cold: "Cold Chain Guarantee",
      link_claims: "Official Complaints Registry",
      foot_copy: "© 2026 MercatFresc Supermercats S.L. All rights reserved.",
      search_placeholder: "Type to search products, aisles or services...",
      search_hint: "Try typing: 'tomato', 'bread', 'fish', 'oil', 'hours' or 'delivery'.",
      tab_login: "Log In",
      tab_register: "Create Account",
      btn_login_submit: "Access My Account",
      btn_reg_submit: "Sign Up For Free",
      btn_accept_cookies: "Understood & Accept",
      btn_close: "Close",
      modal_cookies_title: "MercatFresc Cookie Policy",
      modal_terms_title: "Terms, Conditions & Requirements",
      cart_added: "Item added to your grocery basket!",
      cart_title: "My Basket",
      nav_cart: "My Grocery Basket",
      shipping_free_target: "Free home delivery on orders over €45",
      cart_empty_title: "Your basket is empty",
      cart_empty_desc: "Browse our market aisles and add wholesome fresh groceries.",
      btn_apply_coupon: "Apply",
      lbl_subtotal: "Products subtotal",
      lbl_discount: "Coupon discount",
      lbl_shipping_option: "Delivery / Pickup",
      lbl_shipping_hint: "Free at store / from €0",
      lbl_total: "Total to pay",
      btn_proceed_checkout: "Proceed to Checkout & Booking",
      btn_clear_cart: "Clear basket",
      checkout_title: "Order Checkout & Booking",
      checkout_sub: "Select whether you will pick up your groceries at the market or prefer home delivery, and choose your payment method.",
      step1_title: "How would you like to receive your groceries?",
      opt_pickup_title: "Market Pickup (Click & Collect)",
      opt_pickup_desc: "100% Free. Ready in 90 min or at your chosen time slot. Direct trunk drop-off available.",
      badge_free: "Free!",
      opt_delivery_title: "Home Delivery in 2h",
      opt_delivery_desc: "Refrigerated van with temperature tracking direct to your door.",
      lbl_select_store: "Select Grocery Store *",
      lbl_pickup_day: "Pickup day *",
      lbl_pickup_slot: "Pickup time slot *",
      lbl_drive_plate: "Click & Drive (Optional: Plate number for trunk loading)",
      lbl_address: "Street Address & Number *",
      lbl_floor: "Apartment, floor, stair *",
      lbl_zip: "Postal Code *",
      lbl_city: "City / Town *",
      lbl_delivery_slot: "Chilled delivery time slot *",
      lbl_notes: "Driver Delivery Notes (Optional)",
      step2_title: "Contact Details for Booking",
      lbl_phone_mobile: "Mobile Phone (preparation alerts) *",
      step3_title: "How would you like to pay?",
      pay_opt_pickup_title: "Pay when picking up at the market",
      lbl_in_store: "In Store",
      pay_opt_pickup_desc: "You will pay conveniently at the market's express pickup counter when collecting your groceries, with cash or card.",
      pay_opt_delivery_title: "Pay upon home delivery",
      lbl_on_delivery: "To Driver",
      pay_opt_delivery_desc: "Pay the driver upon receiving your grocery bags at your door. The driver carries a wireless card terminal or you can pay in cash.",
      pay_opt_gateway_title: "Pay via the market's online payment gateway",
      pay_opt_gateway_desc: "A secure window will open indicating the exact amount to pay before processing the payment with your card or Bizum.",
      lbl_total_order: "Order Total:",
      btn_back_to_cart: "Back to Basket",
      btn_confirm_reservation: "Confirm Order Booking",
      gw_title: "Secure Payment Gateway | MercatFresc",
      gw_order_ref: "Payment Reference:",
      gw_amount_to_pay: "TOTAL AMOUNT TO PAY",
      lbl_customer: "Customer:",
      lbl_mode: "Mode:",
      gw_dev_title: "Market Payment Gateway Environment",
      gw_dev_desc: "This interface is prepared for inserting your bank gateway script or endpoint (Redsys, Stripe, Bizum, or PayPal). You can test the interactive payment below:",
      gw_tab_card: "Credit/Debit Card",
      gw_tab_bizum: "Bizum Express",
      gw_card_number: "Card number",
      gw_card_exp: "Expiry date",
      gw_card_cvv: "CVV / CVC",
      gw_card_holder: "Cardholder name",
      gw_bizum_phone: "Bizum registered mobile number",
      gw_bizum_hint: "You will receive an instant confirmation prompt in your bank's app.",
      gw_bizum_btn: "Pay with Bizum",
      btn_cancel_payment: "Cancel and return to order",
      succ_title: "Order Successfully Confirmed!",
      succ_subtitle: "We have registered your grocery booking at MercatFresc. Our team is already preparing your items with utmost freshness.",
      succ_order_number: "Order Number:",
      succ_lbl_customer: "Customer:",
      succ_lbl_phone: "Phone:",
      succ_lbl_mode: "Delivery Mode:",
      succ_lbl_payment: "Payment Method:",
      succ_lbl_total: "Total Amount:",
      btn_print_receipt: "Print Receipt",
      btn_continue_shopping: "Continue Shopping"
    },
    va: {
      topbar_badge: "Enviament Exprés",
      topbar_promo: "Enviament gratuït a partir de 45€ | Entregues refrigerades en menys de 2 hores",
      topbar_schedule: "Dilluns a Dissabte: 8:00 - 21:30",
      nav_home: "Inici",
      nav_aisles: "Passadissos",
      nav_deals: "Ofertes de la Setmana",
      nav_commitment: "Compromís Km 0",
      nav_services: "Serveis",
      nav_contact: "Contacte",
      mobile_search_placeholder: "Cercar productes o passadissos...",
      hero_pill: "100% Fresc & Alimentació Saludable",
      hero_title: "El millor de l'horta i la mar, <span>directe a la teua taula</span>",
      hero_sub: "Fruites collides cada dia, forn artesanal de massa mare, peixateria de llotja i carnisseria de proximitat. Tota la compra de casa amb entrega exprés en 2 hores.",
      btn_explore: "Explorar Passadissos",
      btn_deals: "Veure Ofertes Setmanals",
      feat_1_title: "Fresc Garantit",
      feat_1_desc: "Si no t'agrada, t'ho canviem",
      feat_2_title: "Entrega en 2 Hores",
      feat_2_desc: "Furgons isotèrmics 100% freds",
      feat_3_title: "Horta & Km 0",
      feat_3_desc: "Tracte directe sense intermediaris",
      feat_4_title: "Sostenibilitat",
      feat_4_desc: "Envasos biodegradables i reciclatge",
      info_tag: "Qualitat Certificada",
      info_title: "Per Què Triar MercatFresc Cada Dia",
      info_desc: "No som només un supermercat: som el pont honest entre la terra fèrtil dels nostres llauradors i la taula de la teua família.",
      info_c1_title: "Horta de Proximitat (Km 0)",
      info_c1_text: "Tomates d'horta, cítrics valencians i hortalisses collides de bon matí. Arriben a les nostres botigues en menys de 4 hores des de la mata.",
      info_c2_title: "Cadena de Fred Rigorosa",
      info_c2_text: "Control tèrmic digital des dels obradors fins a la teua porta. Assegurem que peixos, carns i làctics mantinguen sempre la temperatura idònia.",
      info_c3_title: "Forn Tradicional Diari",
      info_c3_text: "Pans artesans amb fermentacions lentes de més de 24 hores i massa mare viva. Enfornem 3 vegades al dia per a oferir pa calent i cruixent.",
      info_c4_title: "Llotja & Pesca Sostenible",
      info_c4_text: "Peix salvatge pescat amb arts tradicionals respectuoses. Rebem el desembarcament diari de Cullera, Castelló i Santa Pola.",
      info_c5_title: "Rebost Bio & Ecològic",
      info_c5_text: "Més de 2.000 referències amb segell d'agricultura ecològica europea: llegums a granel, olis verge extra premsats en fred i productes sense gluten.",
      info_c6_title: "Preus Clars i Honestos",
      info_c6_text: "Paguem el preu just als productors de la nostra terra mentre cuidem la teua butxaca amb promocions setmanals reals i xecs estalvi.",
      stat_1: "Famílies que confien cada mes",
      stat_2: "Productors locals associats",
      stat_3: "Traçabilitat i frescor provada",
      stat_4: "Temps mitjà d'entrega a domicili",
      aisles_tag: "Els Nostres Passadissos",
      aisles_title: "Alimentació Fresca, Rebost i Celler",
      aisles_desc: "Camina pels nostres passadissos com si estigueres al mercat tradicional des de la comoditat de la teua pantalla.",
      cat_all: "Tots els Passadissos",
      cat_fruits: "Fruita & Horta",
      cat_bakery: "Forn & Pa",
      cat_fish: "Peixateria",
      cat_deli: "Formatges & Gourmet",
      cat_pantry: "Rebost & Bio",
      badge_km0: "Km 0",
      badge_artisan: "Artesanal",
      badge_offer: "Super Oferta",
      badge_top: "Premi Sabor",
      badge_bio: "Certificat Bio",
      p1_cat: "Horta d'Alboraia",
      p1_name: "Tomata Rosa d'Horta Tradicional",
      p1_origin: "Collita d'aquest matí",
      p2_cat: "Forn i Obrador",
      p2_name: "Fogaça Rústica 100% Massa Mare (800g)",
      p2_origin: "Fermentació natural de 24h",
      p3_cat: "Llotja Mediterrània",
      p3_name: "Llobarro de Badia Seleccionat",
      p3_origin: "Subhasta matinal de Cullera",
      p4_cat: "Xarcuteria & Tall",
      p4_name: "Formatge Curat al Romero del Maestrat",
      p4_origin: "Maduració mínima 9 mesos",
      p5_cat: "Horta del Xúquer",
      p5_name: "Taronges Navelate de Taula (Malla 3kg)",
      p5_origin: "Sense ceres ni tractaments postcollita",
      p6_cat: "Pastisseria Tradicional",
      p6_name: "Croissant Francés de Mantega (Pack 2)",
      p6_origin: "Enfornat hui a les 7:30",
      p7_cat: "Almàssera de la Serra d'Espadà",
      p7_name: "Oli Verge Extra Ecològic Serrana (500ml)",
      p7_origin: "Premsat en fred de primera collita",
      p8_cat: "Fruits Rojos",
      p8_name: "Maduixot Dolç Seleccionat (Caixa 500g)",
      p8_origin: "Madurat naturalment al sol",
      deals_tag: "Ofertes de la Setmana",
      deals_title: "El Fullet Digital de Temporada",
      deals_desc: "Cada dijous renovem les promocions de frescos i bàsics de rebost. Estalvia fins a un 30% sense renunciar a la màxima qualitat.",
      deal1_title: "Tota la Peixateria -25% els Dimarts",
      deal1_desc: "Directe de la primera subhasta de la setmana. Netejat i preparat al teu gust.",
      deal2_title: "Rebost Ecològic Certificat 3 x 2",
      deal2_desc: "Combina llegums, arrossos amb Denominació d'Origen València, pastes integrals i conserves vegetals.",
      deal3_title: "Xec de Benvinguda de 10€",
      deal3_desc: "Registra't en un minut al Club Fresc i gaudeix d'un cupó de 10 € per a la teua primera compra superior a 50 €.",
      services_tag: "Els Nostres Serveis",
      services_title: "Compra Com Vulgues, Quan Vulgues",
      services_desc: "Solucions modernes perquè estalvies temps cada dia sense sacrificar el gust per menjar sa.",
      srv1_title: "Entrega en Fred en 2 Hores",
      srv1_desc: "Demana abans de les 19:30 i t'ho portem hui mateix en franges d'1 hora. Garantia total de temperatura.",
      srv1_perk: "Gratis en compres superiors a 45 €",
      srv2_title: "Click & Drive / Recollida Exprés",
      srv2_desc: "Fes la teua comanda per la web i passa a recollir-la a les places reservades de pàrquing. T'ho carreguem al maleter en 5 minuts.",
      srv2_perk: "Preparat en 90 minuts i sense cues",
      srv3_title: "Club Fresc de Fidelitat",
      srv3_desc: "Acumula el 3% de les teues compres al teu saldo, rep descomptes exclusius i cupons d'aniversari.",
      srv3_perk: "100% gratuït i sense comissions",
      contact_tag: "Contacte & Suport",
      contact_title: "Estem a la Teua Disposició",
      contact_desc: "Tens dubtes amb la comanda, vols sol·licitar un tall especial o ets un productor local que vol vendre amb nosaltres? Escriu-nos.",
      info_box_title: "Atenció al Client Immediata",
      info_box_desc: "El nostre equip respon amb rapidesa i proximitat. També pots visitar-nos a qualsevol dels nostres supermercats físics.",
      lbl_phone: "Telèfon de Comandes",
      lbl_email: "Correu Electrònic",
      lbl_hq: "Seu Central & Mercat",
      lbl_hours: "Horari Comercial",
      val_hours: "Dilluns a Dissabte: 08:00 a 21:30 (Ininterromput)",
      lbl_stores: "Les Nostres Botigues Físiques:",
      form_success_msg: "Gràcies per contactar amb MercatFresc! Hem rebut el teu missatge i et respondrem prompte.",
      f_name: "Nom complet *",
      f_phone: "Telèfon de contacte",
      f_email: "Correu electrònic *",
      f_subject: "Motiu de la consulta",
      f_msg: "Missatge *",
      f_privacy: "He llegit i accepte la política de privacitat i el tractament de les meues dades.",
      f_pass: "Contrasenya",
      f_new_pass: "Crear contrasenya",
      opt_order: "Estat de la meua comanda a domicili",
      opt_store: "Consulta sobre productes o disponibilitat",
      opt_club: "Dubtes amb el Club Fresc i saldo",
      opt_supplier: "Sóc productor / Proveïdor local Km 0",
      opt_other: "Altres suggeriments o comentaris",
      btn_send: "Enviar Missatge",
      foot_bio: "El teu supermercat de proximitat amb essència mediterrània. Alimentació saludable, fruites collides de matí i entrega a domicili sostenible.",
      foot_h_aisles: "Els Nostres Passadissos",
      foot_h_legal: "Legal i Requisits",
      foot_h_news: "Butlletí d'Ofertes",
      foot_news_sub: "Rep al teu correu cada dijous les ofertes i productes de temporada abans que ningú.",
      link_cookies: "Política de Cookies",
      link_terms: "Termes i Requisits Legals",
      link_allergens: "Informació d'Al·lèrgens",
      link_cold: "Garantia de Cadena de Fred",
      link_claims: "Fulls de Reclamacions",
      foot_copy: "© 2026 MercatFresc Supermercats S.L. Tots els drets reservats.",
      search_placeholder: "Escriu per a cercar productes, passadissos o serveis...",
      search_hint: "Escriu per exemple: 'tomata', 'pa', 'peix', 'oli', 'horari' o 'entrega'.",
      tab_login: "Iniciar Sessió",
      tab_register: "Crear Compte",
      btn_login_submit: "Entrar al meu Compte",
      btn_reg_submit: "Donar-me d'Alta Gratis",
      btn_accept_cookies: "Entés i Acceptar",
      btn_close: "Tancar",
      modal_cookies_title: "Política de Cookies de MercatFresc",
      modal_terms_title: "Termes, Condicions i Requisits",
      cart_added: "Producte afegit a la teua cistella!",
      cart_title: "La Meua Cistella",
      nav_cart: "La Meua Cistella de la Compra",
      shipping_free_target: "Enviament a domicili gratuït a partir de 45 €",
      cart_empty_title: "La teua cistella està buida",
      cart_empty_desc: "Explora els nostres passadissos i afig els millors aliments frescos del mercat.",
      btn_apply_coupon: "Aplicar",
      lbl_subtotal: "Subtotal productes",
      lbl_discount: "Descompte cupó",
      lbl_shipping_option: "Entrega / Recollida",
      lbl_shipping_hint: "Gratis a botiga / des de 0€",
      lbl_total: "Total a pagar",
      btn_proceed_checkout: "Tramitar Compra i Reserva",
      btn_clear_cart: "Buidar cistella",
      checkout_title: "Tramitar Comanda i Reserva",
      checkout_sub: "Selecciona si recolliràs la teua compra a la botiga o prefereixes enviament a domicili, i tria com vols pagar.",
      step1_title: "Com desitges rebre la teua compra?",
      opt_pickup_title: "Recollida al Mercat (Click & Collect)",
      opt_pickup_desc: "100% Gratis. Llest en 90 min o a l'hora que tries. Opció d'entrega directa al maleter.",
      badge_free: "Gratis!",
      opt_delivery_title: "Enviament al teu Domicili en 2h",
      opt_delivery_desc: "Furgó refrigerat amb control tèrmic directe fins a la teua porta.",
      lbl_select_store: "Selecciona el Supermercat *",
      lbl_pickup_day: "Dia de recollida *",
      lbl_pickup_slot: "Franja horària de recollida *",
      lbl_drive_plate: "Click & Drive (Opcional: Matrícula per a carregar al maleter)",
      lbl_address: "Adreça completa (Carrer, número) *",
      lbl_floor: "Pis, porta, escala *",
      lbl_zip: "Codi Postal *",
      lbl_city: "Població / Ciutat *",
      lbl_delivery_slot: "Franja d'entrega en fred *",
      lbl_notes: "Instruccions per al repartidor (Opcional)",
      step2_title: "Dades de contacte per a la reserva",
      lbl_phone_mobile: "Telèfon mòbil (avisos de preparació) *",
      step3_title: "Com desitges pagar?",
      pay_opt_pickup_title: "Pagar en anar a recollir-ho al mercat",
      lbl_in_store: "A Botiga",
      pay_opt_pickup_desc: "Pagaràs còmodament a la caixa ràpida de recollida del supermercat quan retires la teua compra, tant en efectiu com amb targeta.",
      pay_opt_delivery_title: "Pagar quan te l'entreguen a domicili",
      lbl_on_delivery: "Al Repartidor",
      pay_opt_delivery_desc: "Paga al repartidor en rebre les bosses a la teua porta. El repartidor porta datàfon sense fil per a targeta o pots abonar-ho en efectiu.",
      pay_opt_gateway_title: "Pagar per la passarel·la de pagament en línia del mercat",
      pay_opt_gateway_desc: "S'obrirà una finestra segura on se t'indicarà l'import exacte a pagar abans de processar el pagament amb la teua targeta o Bizum.",
      lbl_total_order: "Import de la Comanda:",
      btn_back_to_cart: "Tornar a la cistella",
      btn_confirm_reservation: "Confirmar Reserva de la Comanda",
      gw_title: "Passarel·la de Pagament Segura | MercatFresc",
      gw_order_ref: "Referència de Pagament:",
      gw_amount_to_pay: "IMPORT TOTAL A PAGAR",
      lbl_customer: "Client:",
      lbl_mode: "Modalitat:",
      gw_dev_title: "Entorn de Passarel·la de Pagament del Mercat",
      gw_dev_desc: "Aquesta interfície està preparada perquè inserisques l'script o endpoint oficial de la teua passarel·la bancària (Redsys, Stripe, Bizum o PayPal). Pots realitzar la prova interactiva a continuació:",
      gw_tab_card: "Targeta Bancària",
      gw_tab_bizum: "Bizum Exprés",
      gw_card_number: "Número de targeta",
      gw_card_exp: "Caducitat",
      gw_card_cvv: "CVV / CVC",
      gw_card_holder: "Nom del titular",
      gw_bizum_phone: "Telèfon mòbil registrat en Bizum",
      gw_bizum_hint: "Rebràs una sol·licitud de confirmació instantània en l'app del teu banc.",
      gw_bizum_btn: "Pagar amb Bizum",
      btn_cancel_payment: "Cancel·lar i tornar a la comanda",
      succ_title: "Comanda Confirmada amb Èxit!",
      succ_subtitle: "Hem registrat la teua reserva a MercatFresc. Ja estem preparant els productes amb la màxima cura i frescor.",
      succ_order_number: "Número de Comanda:",
      succ_lbl_customer: "Titular:",
      succ_lbl_phone: "Telèfon:",
      succ_lbl_mode: "Modalitat d'Entrega:",
      succ_lbl_payment: "Forma de Pagament:",
      succ_lbl_total: "Import Total:",
      btn_print_receipt: "Imprimir Comprovant",
      btn_continue_shopping: "Continuar Comprant"
    }
  };

  let currentLanguage = 'es';

  /* --------------------------------------------------------------------------
     2. GESTOR DE IDIOMAS (ES, EN, VA)
     -------------------------------------------------------------------------- */
  function applyLanguage(lang) {
    if (!translations[lang]) return;
    currentLanguage = lang;
    localStorage.setItem('mercat_lang', lang);
    document.documentElement.lang = lang;

    // Actualizar indicador de idioma desktop
    const currentLangText = document.getElementById('current-lang-text');
    if (currentLangText) {
      currentLangText.textContent = lang.toUpperCase();
    }

    // Actualizar botones activos en dropdown desktop
    document.querySelectorAll('.lang-option').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
    });

    // Actualizar botones activos en menú móvil
    document.querySelectorAll('.mobile-lang-btn').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
    });

    // Reemplazar textos con data-i18n
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (translations[lang][key]) {
        el.innerHTML = translations[lang][key];
      }
    });

    // Reemplazar placeholders con data-i18n-ph
    document.querySelectorAll('[data-i18n-ph]').forEach(el => {
      const key = el.getAttribute('data-i18n-ph');
      if (translations[lang][key]) {
        el.setAttribute('placeholder', translations[lang][key]);
      }
    });
  }

  function initLanguage() {
    const saved = localStorage.getItem('mercat_lang') || 'es';
    applyLanguage(saved);

    // Dropdown desktop toggle
    const langBtn = document.getElementById('lang-btn-desktop');
    const langDropdown = document.getElementById('lang-dropdown-desktop');

    if (langBtn && langDropdown) {
      langBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        langDropdown.classList.toggle('show');
        langBtn.setAttribute('aria-expanded', langDropdown.classList.contains('show'));
      });

      document.querySelectorAll('.lang-option').forEach(opt => {
        opt.addEventListener('click', () => {
          const lang = opt.getAttribute('data-lang');
          applyLanguage(lang);
          langDropdown.classList.remove('show');
          langBtn.setAttribute('aria-expanded', 'false');
        });
      });

      document.addEventListener('click', () => {
        langDropdown.classList.remove('show');
        langBtn.setAttribute('aria-expanded', 'false');
      });
    }

    // Botones selector móvil
    document.querySelectorAll('.mobile-lang-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const lang = btn.getAttribute('data-lang');
        applyLanguage(lang);
      });
    });
  }

  /* --------------------------------------------------------------------------
     3. MODO CLARO / OSCURO (LOCALSTORAGE & ICONOS DINÁMICOS)
     -------------------------------------------------------------------------- */
  function applyTheme(isDark) {
    const body = document.body;
    const sunIcon = document.getElementById('theme-icon-sun');
    const moonIcon = document.getElementById('theme-icon-moon');

    if (isDark) {
      body.classList.add('dark-theme');
      if (sunIcon && moonIcon) {
        sunIcon.style.display = 'block';
        moonIcon.style.display = 'none';
      }
      localStorage.setItem('mercat_theme', 'dark');
    } else {
      body.classList.remove('dark-theme');
      if (sunIcon && moonIcon) {
        sunIcon.style.display = 'none';
        moonIcon.style.display = 'block';
      }
      localStorage.setItem('mercat_theme', 'light');
    }
  }

  function initTheme() {
    const savedTheme = localStorage.getItem('mercat_theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDark = savedTheme ? (savedTheme === 'dark') : prefersDark;
    applyTheme(isDark);

    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    if (themeToggleBtn) {
      themeToggleBtn.addEventListener('click', () => {
        const currentlyDark = document.body.classList.contains('dark-theme');
        applyTheme(!currentlyDark);
        showToast(currentlyDark ? 'Modo claro activado' : 'Modo oscuro activado');
      });
    }
  }

  /* --------------------------------------------------------------------------
     4. MENÚ HAMBURGUESA MÓVIL (DESLIZANTE DESDE ARRIBA & CENTRADO)
     -------------------------------------------------------------------------- */
  function initMobileMenu() {
    const burgerBtn = document.getElementById('hamburger-toggle-btn');
    const mobilePanel = document.getElementById('mobile-panel');
    const mobileOverlay = document.getElementById('mobile-overlay');

    if (!burgerBtn || !mobilePanel || !mobileOverlay) return;

    function openMenu() {
      burgerBtn.classList.add('is-active');
      burgerBtn.setAttribute('aria-expanded', 'true');
      mobilePanel.classList.add('open');
      mobileOverlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
      burgerBtn.classList.remove('is-active');
      burgerBtn.setAttribute('aria-expanded', 'false');
      mobilePanel.classList.remove('open');
      mobileOverlay.classList.remove('open');
      document.body.style.overflow = '';
    }

    burgerBtn.addEventListener('click', () => {
      const isOpen = mobilePanel.classList.contains('open');
      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    mobileOverlay.addEventListener('click', closeMenu);

    // Cerrar al pulsar un enlace de navegación
    document.querySelectorAll('.mobile-nav-link').forEach(link => {
      link.addEventListener('click', () => {
        closeMenu();
      });
    });

    // Cerrar al redimensionar la pantalla a desktop
    window.addEventListener('resize', () => {
      if (window.innerWidth > 1024 && mobilePanel.classList.contains('open')) {
        closeMenu();
      }
    });

    // Disparador de búsqueda desde el menú móvil
    const mobileSearchTrigger = document.getElementById('mobile-search-trigger');
    if (mobileSearchTrigger) {
      mobileSearchTrigger.addEventListener('click', () => {
        closeMenu();
        openSearchModal();
      });
    }
  }

  /* --------------------------------------------------------------------------
     5. SCROLL SUAVE Y SCROLLSPY CON COMPENSACIÓN DE HEADER
     -------------------------------------------------------------------------- */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#' || targetId === '') return;
        const targetEl = document.querySelector(targetId);
        if (targetEl) {
          e.preventDefault();
          const header = document.getElementById('header');
          const headerHeight = header ? header.offsetHeight : 70;
          const targetPosition = targetEl.getBoundingClientRect().top + window.pageYOffset - headerHeight - 12;

          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });

          // Actualizar historial URL limpiamente
          history.pushState(null, null, targetId);
        }
      });
    });
  }

  function initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinksDesktop = document.querySelectorAll('.nav-desktop .nav-link');
    const navLinksMobile = document.querySelectorAll('.mobile-nav-link');
    const scrollTopBtn = document.getElementById('scroll-top-btn');

    function updateActive() {
      const scrollY = window.pageYOffset;
      const header = document.getElementById('header');
      const offset = (header ? header.offsetHeight : 70) + 60;

      // Botón volver arriba
      if (scrollTopBtn) {
        if (scrollY > 350) {
          scrollTopBtn.classList.add('show');
        } else {
          scrollTopBtn.classList.remove('show');
        }
      }

      sections.forEach(section => {
        const sectionTop = section.offsetTop - offset;
        const sectionHeight = section.offsetHeight;
        const id = section.getAttribute('id');

        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
          navLinksDesktop.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
          });
          navLinksMobile.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
          });
        }
      });
    }

    window.addEventListener('scroll', updateActive, { passive: true });
    updateActive();

    if (scrollTopBtn) {
      scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  }

  /* --------------------------------------------------------------------------
     6. MODAL DE BÚSQUEDA INTERNA Y RESALTADO DE COINCIDENCIAS
     -------------------------------------------------------------------------- */
  const searchModal = document.getElementById('search-modal');
  const searchInput = document.getElementById('search-input');
  const searchCloseBtn = document.getElementById('search-close-btn');
  const searchResultsList = document.getElementById('search-results-list');
  const searchHelper = document.getElementById('search-helper');

  // Base de datos indexable para búsqueda interna
  const searchableItems = [
    { title: "Tomate Rosa de Huerta Tradicional", category: "Fruta & Huerta", sectionId: "pasillos", keywords: "tomate huerta verdura ensalada alboraya organico" },
    { title: "Hogaza Rústica 100% Masa Madre (800g)", category: "Horno & Pan", sectionId: "pasillos", keywords: "pan hogaza masa madre cereales espelta artesano" },
    { title: "Lubina de Bahía Seleccionada", category: "Pescadería", sectionId: "pasillos", keywords: "lubina pescado lonja cullera marisco fresco" },
    { title: "Queso Curado al Romero de Maestrat", category: "Quesos & Gourmet", sectionId: "pasillos", keywords: "queso curado romero oveja charcuteria" },
    { title: "Naranjas Navelate de Mesa (Malla 3kg)", category: "Fruta & Huerta", sectionId: "pasillos", keywords: "naranjas mandarinas citricos fruta zumo xuquer" },
    { title: "Croissant Francés Puro Hojaldrado", category: "Horno & Pan", sectionId: "pasillos", keywords: "croissant bolleria dulce mantequilla desayuno" },
    { title: "Aceite Virgen Extra Ecológico Serrana (500ml)", category: "Despensa & Bio", sectionId: "pasillos", keywords: "aceite oliva virgen extra aove bio ecologico espadan" },
    { title: "Fresón Dulce Seleccionado (500g)", category: "Fruta & Huerta", sectionId: "pasillos", keywords: "fresas freson frutos rojos postre fruta" },
    { title: "Ofertas de la Semana: Folleto Digital", category: "Promociones", sectionId: "ofertas", keywords: "ofertas descuentos folleto 3x2 cupon promocion martes pescado" },
    { title: "Huerta de Proximidad & Km 0", category: "Compromiso", sectionId: "compromiso", keywords: "calidad km0 huerta agricultores sostenibilidad cadena frio" },
    { title: "Entrega a Domicilio Refrigerada en 2 Horas", category: "Servicios", sectionId: "servicios", keywords: "envio domicilio 2 horas furgon frio gratis 45" },
    { title: "Click & Drive / Recogida Express", category: "Servicios", sectionId: "servicios", keywords: "click drive car recogida tienda parking" },
    { title: "Club Fresc: Cheques y Puntos de Ahorro", category: "Fidelidad", sectionId: "servicios", keywords: "club fidelidad descuento cheques puntos 3%" },
    { title: "Contacto, Teléfono y Tiendas Físicas", category: "Atención", sectionId: "contacto", keywords: "telefono contacto horario direccion tiendas valencia alicante castellon" },
    { title: "Mi Cesta de la Compra & Reservas", category: "Cesta & Pedidos", sectionId: "pasillos", keywords: "cesta carrito compra reserva recoger tienda domicilio pasarela pago bizum tarjeta", action: "cart" },
    { title: "Pasarela de Pago Segura del Mercado", category: "Pagos & Checkout", sectionId: "pasillos", keywords: "pasarela pago tarjeta bizum pagar online datafono efectivo", action: "cart" }
  ];

  function openSearchModal() {
    if (!searchModal) return;
    searchModal.classList.add('open');
    searchModal.setAttribute('aria-hidden', 'false');
    if (searchInput) {
      searchInput.value = '';
      setTimeout(() => searchInput.focus(), 150);
    }
    renderSearchResults('');
  }

  function closeSearchModal() {
    if (!searchModal) return;
    searchModal.classList.remove('open');
    searchModal.setAttribute('aria-hidden', 'true');
    removeHighlights();
  }

  function renderSearchResults(query) {
    if (!searchResultsList || !searchHelper) return;
    const cleanQuery = query.trim().toLowerCase();

    if (!cleanQuery) {
      searchHelper.style.display = 'block';
      searchResultsList.innerHTML = '';
      return;
    }

    searchHelper.style.display = 'none';

    const matches = searchableItems.filter(item => {
      return item.title.toLowerCase().includes(cleanQuery) ||
             item.category.toLowerCase().includes(cleanQuery) ||
             item.keywords.toLowerCase().includes(cleanQuery);
    });

    if (matches.length === 0) {
      searchResultsList.innerHTML = `
        <div style="text-align: center; padding: 2rem 1rem; color: var(--text-muted);">
          <p style="font-weight: 700; margin-bottom: 0.35rem;">No se encontraron resultados para "${escapeHtml(query)}"</p>
          <p style="font-size: 0.85rem;">Prueba con otra palabra clave como "tomate", "pan", "frío", "envío" o "aceite".</p>
        </div>
      `;
      return;
    }

    searchResultsList.innerHTML = matches.map(item => {
      const highlightedTitle = highlightQuery(item.title, cleanQuery);
      return `
        <div class="search-result-item" data-target="${item.sectionId}" data-keyword="${escapeHtml(item.title)}">
          <div>
            <div class="search-result-title">${highlightedTitle}</div>
            <div style="font-size: 0.78rem; color: var(--text-muted); margin-top: 2px;">En sección: ${item.category}</div>
          </div>
          <span class="search-result-badge">Ver elemento</span>
        </div>
      `;
    }).join('');

    // Agregar evento clic a cada resultado
    searchResultsList.querySelectorAll('.search-result-item').forEach(item => {
      item.addEventListener('click', function () {
        const sectionId = this.getAttribute('data-target');
        const term = this.getAttribute('data-keyword');
        closeSearchModal();

        const targetEl = document.getElementById(sectionId);
        if (targetEl) {
          const header = document.getElementById('header');
          const headerHeight = header ? header.offsetHeight : 70;
          const pos = targetEl.getBoundingClientRect().top + window.pageYOffset - headerHeight - 15;
          window.scrollTo({ top: pos, behavior: 'smooth' });

          // Si es un producto, destacarlo y activar pestaña correspondiente si aplica
          highlightKeywordOnPage(term);
        }
      });
    });
  }

  function highlightQuery(text, query) {
    if (!query) return text;
    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    return text.replace(regex, '<mark class="search-highlight">$1</mark>');
  }

  function highlightKeywordOnPage(term) {
    // Buscar si coincide con el nombre de algún producto
    const cards = document.querySelectorAll('.product-card');
    cards.forEach(card => {
      const nameEl = card.querySelector('.product-name');
      if (nameEl && nameEl.textContent.toLowerCase().includes(term.toLowerCase())) {
        card.style.transition = 'all 0.4s ease';
        card.style.boxShadow = '0 0 0 4px var(--color-primary), 0 10px 30px rgba(0,0,0,0.2)';
        card.style.transform = 'translateY(-8px) scale(1.02)';
        setTimeout(() => {
          card.style.boxShadow = '';
          card.style.transform = '';
        }, 3200);
      }
    });
  }

  function removeHighlights() {
    document.querySelectorAll('.search-highlight').forEach(el => {
      const parent = el.parentNode;
      parent.replaceChild(document.createTextNode(el.textContent), el);
      parent.normalize();
    });
  }

  function escapeHtml(str) {
    return str.replace(/[&<>'"]/g, tag => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag] || tag));
  }

  function initSearch() {
    const searchOpenBtn = document.getElementById('search-open-btn');
    if (searchOpenBtn) {
      searchOpenBtn.addEventListener('click', openSearchModal);
    }

    if (searchCloseBtn) {
      searchCloseBtn.addEventListener('click', closeSearchModal);
    }

    if (searchModal) {
      searchModal.addEventListener('click', (e) => {
        if (e.target === searchModal) {
          closeSearchModal();
        }
      });
    }

    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        renderSearchResults(e.target.value);
      });
    }

    // Tecla ESC para cerrar cualquier modal o drawer abierto
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeSearchModal();
        closeUserModal();
        closeCookiesModal();
        closeTermsModal();
        closeCartDrawer();
        closeCheckoutModal();
        closePaymentGatewayModal();
        closeOrderSuccessModal();
      }
    });
  }

  /* --------------------------------------------------------------------------
     7. MODAL DE USUARIO / ACCESO AL SISTEMA DE LOGIN
     -------------------------------------------------------------------------- */
  const userModal = document.getElementById('user-modal');
  const userLoginBtn = document.getElementById('user-login-btn');
  const userModalClose = document.getElementById('user-modal-close');
  const tabLogin = document.getElementById('tab-login');
  const tabRegister = document.getElementById('tab-register');
  const loginForm = document.getElementById('login-form');
  const registerForm = document.getElementById('register-form');

  function openUserModal() {
    if (!userModal) return;
    userModal.classList.add('open');
    userModal.setAttribute('aria-hidden', 'false');
  }

  function closeUserModal() {
    if (!userModal) return;
    userModal.classList.remove('open');
    userModal.setAttribute('aria-hidden', 'true');
  }

  function initUserModal() {
    if (userLoginBtn) {
      userLoginBtn.addEventListener('click', openUserModal);
    }

    if (userModalClose) {
      userModalClose.addEventListener('click', closeUserModal);
    }

    if (userModal) {
      userModal.addEventListener('click', (e) => {
        if (e.target === userModal) {
          closeUserModal();
        }
      });
    }

    if (tabLogin && tabRegister && loginForm && registerForm) {
      tabLogin.addEventListener('click', () => {
        tabLogin.classList.add('active');
        tabRegister.classList.remove('active');
        loginForm.style.display = 'block';
        registerForm.style.display = 'none';
      });

      tabRegister.addEventListener('click', () => {
        tabRegister.classList.add('active');
        tabLogin.classList.remove('active');
        loginForm.style.display = 'none';
        registerForm.style.display = 'block';
      });

      loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        closeUserModal();
        showToast(`¡Bienvenido/a de nuevo! Sesión iniciada con ${email}`);
      });

      registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('reg-name').value;
        closeUserModal();
        showToast(`¡Cuenta creada con éxito! Bienvenido a MercatFresc, ${name}.`);
      });
    }
  }

  /* --------------------------------------------------------------------------
     8. MODALES DE POLÍTICA DE COOKIES Y TÉRMINOS LEGALES
     -------------------------------------------------------------------------- */
  const cookiesModal = document.getElementById('cookies-modal');
  const openCookiesBtn = document.getElementById('open-cookies-btn');
  const cookiesModalClose = document.getElementById('cookies-modal-close');
  const cookiesAcceptBtn = document.getElementById('cookies-accept-btn');

  const termsModal = document.getElementById('terms-modal');
  const openTermsBtn = document.getElementById('open-terms-btn');
  const termsModalClose = document.getElementById('terms-modal-close');
  const termsAcceptBtn = document.getElementById('terms-accept-btn');
  const openPrivacyLink = document.getElementById('open-privacy-link');
  const openAllergenBtn = document.getElementById('open-allergen-btn');
  const openColdBtn = document.getElementById('open-cold-btn');

  function openCookiesModal() {
    if (cookiesModal) {
      cookiesModal.classList.add('open');
      cookiesModal.setAttribute('aria-hidden', 'false');
    }
  }

  function closeCookiesModal() {
    if (cookiesModal) {
      cookiesModal.classList.remove('open');
      cookiesModal.setAttribute('aria-hidden', 'true');
    }
  }

  function openTermsModal() {
    if (termsModal) {
      termsModal.classList.add('open');
      termsModal.setAttribute('aria-hidden', 'false');
    }
  }

  function closeTermsModal() {
    if (termsModal) {
      termsModal.classList.remove('open');
      termsModal.setAttribute('aria-hidden', 'true');
    }
  }

  function initInfoModals() {
    if (openCookiesBtn) openCookiesBtn.addEventListener('click', openCookiesModal);
    if (cookiesModalClose) cookiesModalClose.addEventListener('click', closeCookiesModal);
    if (cookiesAcceptBtn) {
      cookiesAcceptBtn.addEventListener('click', () => {
        closeCookiesModal();
        showToast('Preferencias de cookies guardadas');
      });
    }
    if (cookiesModal) {
      cookiesModal.addEventListener('click', (e) => {
        if (e.target === cookiesModal) closeCookiesModal();
      });
    }

    if (openTermsBtn) openTermsBtn.addEventListener('click', openTermsModal);
    if (termsModalClose) termsModalClose.addEventListener('click', closeTermsModal);
    if (termsAcceptBtn) termsAcceptBtn.addEventListener('click', closeTermsModal);
    if (termsModal) {
      termsModal.addEventListener('click', (e) => {
        if (e.target === termsModal) closeTermsModal();
      });
    }

    if (openPrivacyLink) {
      openPrivacyLink.addEventListener('click', (e) => {
        e.preventDefault();
        openTermsModal();
      });
    }

    if (openAllergenBtn) {
      openAllergenBtn.addEventListener('click', () => {
        openTermsModal();
      });
    }

    if (openColdBtn) {
      openColdBtn.addEventListener('click', () => {
        const compromisoSection = document.getElementById('compromiso');
        if (compromisoSection) {
          const header = document.getElementById('header');
          const headerHeight = header ? header.offsetHeight : 70;
          const pos = compromisoSection.getBoundingClientRect().top + window.pageYOffset - headerHeight - 15;
          window.scrollTo({ top: pos, behavior: 'smooth' });
        }
      });
    }
  }

  /* --------------------------------------------------------------------------
     9. FILTRADO DE PRODUCTOS Y PASILLOS
     -------------------------------------------------------------------------- */
  function initProductFilters() {
    const filterButtons = document.querySelectorAll('.filter-tab-btn');
    const productCards = document.querySelectorAll('.product-card');

    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const category = btn.getAttribute('data-category');

        productCards.forEach(card => {
          const cardCat = card.getAttribute('data-category');
          if (category === 'todos' || cardCat === category) {
            card.style.display = 'flex';
            card.style.opacity = '0';
            card.style.transform = 'translateY(15px)';
            setTimeout(() => {
              card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            }, 50);
          } else {
            card.style.display = 'none';
          }
        });
      });
    });

    // Añadir a la cesta interactivo
    document.querySelectorAll('.add-cart-btn').forEach(btn => {
      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        const card = this.closest('.product-card');
        if (!card) return;

        const product = {
          id: card.getAttribute('data-id') || 'p_' + Math.random().toString(36).substr(2, 5),
          name: card.getAttribute('data-name') || (card.querySelector('.product-name') ? card.querySelector('.product-name').textContent.trim() : 'Alimento Fresco'),
          price: parseFloat(card.getAttribute('data-price')) || 2.50,
          unit: card.getAttribute('data-unit') || 'ud',
          img: card.getAttribute('data-img') || (card.querySelector('.product-image') ? card.querySelector('.product-image').src : '')
        };

        addToCart(product);

        // Efecto visual de pulsación en el botón
        this.style.transform = 'scale(1.25)';
        setTimeout(() => {
          this.style.transform = '';
        }, 220);
      });
    });
  }

  /* --------------------------------------------------------------------------
     10. FORMULARIO DE CONTACTO Y SUSCRIPCIÓN NEWSLETTER
     -------------------------------------------------------------------------- */
  function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    const successAlert = document.getElementById('contact-success-alert');

    if (contactForm) {
      contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const name = document.getElementById('contact-name').value.trim();
        const email = document.getElementById('contact-email').value.trim();
        const message = document.getElementById('contact-message').value.trim();
        const privacy = document.getElementById('contact-privacy').checked;

        if (!name || !email || !message || !privacy) {
          showToast('Por favor, completa todos los campos requeridos (*)');
          return;
        }

        const submitBtn = document.getElementById('submit-contact-btn');
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.style.opacity = '0.7';
          submitBtn.innerHTML = 'Enviando...';
        }

        setTimeout(() => {
          if (successAlert) {
            successAlert.style.display = 'flex';
          }
          contactForm.reset();
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.style.opacity = '1';
            submitBtn.innerHTML = `<span>${translations[currentLanguage].btn_send || 'Enviar Mensaje'}</span>`;
          }
          showToast('Mensaje enviado correctamente a MercatFresc');
        }, 700);
      });
    }

    // Formulario Newsletter Footer
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
      newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = newsletterForm.querySelector('input');
        if (input && input.value) {
          showToast(`¡Gracias! Hemos suscrito a ${input.value} al folleto semanal.`);
          newsletterForm.reset();
        }
      });
    }
  }

  /* --------------------------------------------------------------------------
     11. ANIMACIÓN DE APARICIÓN DE SECCIONES (INTERSECTION OBSERVER)
     -------------------------------------------------------------------------- */
  function initScrollAnimations() {
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            obs.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
      });

      document.querySelectorAll('.reveal-on-scroll').forEach(el => {
        observer.observe(el);
      });
    } else {
      // Fallback para navegadores antiguos
      document.querySelectorAll('.reveal-on-scroll').forEach(el => {
        el.classList.add('is-revealed');
      });
    }
  }

  /* --------------------------------------------------------------------------
     12. NOTIFICACIÓN TOAST FLOTANTE
     -------------------------------------------------------------------------- */
  let toastTimer = null;
  function showToast(message) {
    const toast = document.getElementById('toast');
    const toastMsg = document.getElementById('toast-message');
    if (!toast || !toastMsg) return;

    toastMsg.textContent = message;
    toast.classList.add('show');

    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 3800);
  }

  /* --------------------------------------------------------------------------
     13. SISTEMA INTEGRAL DEL CARRITO DE COMPRA, RESERVA Y CHECKOUT
     -------------------------------------------------------------------------- */
  const cartState = {
    items: [],
    coupon: null,
    deliveryType: 'pickup', // 'pickup' | 'delivery'
    paymentChoice: 'pay_pickup' // 'pay_pickup' | 'pay_delivery' | 'pay_gateway'
  };

  let lastOrderData = null;

  function loadCartFromStorage() {
    try {
      const stored = localStorage.getItem('mercat_cart_items');
      if (stored) {
        cartState.items = JSON.parse(stored) || [];
      }
    } catch (e) {
      cartState.items = [];
    }
  }

  function saveCart() {
    try {
      localStorage.setItem('mercat_cart_items', JSON.stringify(cartState.items));
    } catch (e) {}
  }

  function getCartTotals() {
    const subtotal = cartState.items.reduce((sum, item) => sum + (item.price * item.qty), 0);
    const count = cartState.items.reduce((sum, item) => sum + item.qty, 0);
    const discount = cartState.coupon ? (subtotal * cartState.coupon.rate) : 0;
    const shippingFee = cartState.deliveryType === 'delivery' ? (subtotal >= 45 ? 0 : 3.90) : 0;
    const total = Math.max(0, subtotal - discount + shippingFee);

    return { subtotal, count, discount, shippingFee, total };
  }

  function renderCartUI() {
    const { subtotal, count, discount, shippingFee, total } = getCartTotals();

    // Contadores en cabecera y menú móvil
    const counterBadge = document.getElementById('cart-counter');
    const mobileCounter = document.getElementById('mobile-cart-counter');
    const itemsChip = document.getElementById('cart-items-chip');

    if (counterBadge) counterBadge.textContent = count;
    if (mobileCounter) mobileCounter.textContent = `${count} art.`;
    if (itemsChip) itemsChip.textContent = `${count} items`;

    const emptyView = document.getElementById('cart-empty-view');
    const itemsList = document.getElementById('cart-items-list');
    const cartFooter = document.getElementById('cart-footer');
    const shippingBar = document.getElementById('cart-shipping-bar');

    if (count === 0) {
      if (emptyView) emptyView.style.display = 'block';
      if (itemsList) {
        itemsList.style.display = 'none';
        itemsList.innerHTML = '';
      }
      if (cartFooter) cartFooter.style.display = 'none';
      if (shippingBar) shippingBar.style.display = 'none';
    } else {
      if (emptyView) emptyView.style.display = 'none';
      if (itemsList) {
        itemsList.style.display = 'flex';
        itemsList.innerHTML = cartState.items.map(item => {
          const itemSub = (item.price * item.qty).toFixed(2);
          return `
            <div class="cart-item-card" data-id="${item.id}">
              <img src="${item.img || 'https://images.pexels.com/photos/868110/pexels-photo-868110.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=200&w=280'}" alt="${item.name}" class="cart-item-thumb" loading="lazy">
              <div class="cart-item-info">
                <div class="cart-item-name" title="${item.name}">${item.name}</div>
                <div class="cart-item-price-unit">${item.price.toFixed(2)} € / ${item.unit}</div>
                <div class="cart-item-controls">
                  <div class="cart-qty-pill">
                    <button type="button" class="cart-qty-btn btn-qty-minus" data-id="${item.id}" aria-label="Restar una unidad">-</button>
                    <span class="cart-qty-value">${item.qty}</span>
                    <button type="button" class="cart-qty-btn btn-qty-plus" data-id="${item.id}" aria-label="Añadir una unidad">+</button>
                  </div>
                  <span class="cart-item-subtotal">${itemSub} €</span>
                </div>
              </div>
              <button type="button" class="cart-item-del-btn btn-item-del" data-id="${item.id}" aria-label="Eliminar ${item.name}" title="Quitar de la cesta">
                <svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor">
                  <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
                </svg>
              </button>
            </div>
          `;
        }).join('');

        // Eventos de botones más, menos y eliminar
        itemsList.querySelectorAll('.btn-qty-minus').forEach(b => {
          b.addEventListener('click', () => changeItemQty(b.getAttribute('data-id'), -1));
        });
        itemsList.querySelectorAll('.btn-qty-plus').forEach(b => {
          b.addEventListener('click', () => changeItemQty(b.getAttribute('data-id'), 1));
        });
        itemsList.querySelectorAll('.btn-item-del').forEach(b => {
          b.addEventListener('click', () => removeItem(b.getAttribute('data-id')));
        });
      }

      if (cartFooter) cartFooter.style.display = 'block';
      if (shippingBar) shippingBar.style.display = 'block';

      // Actualizar barra de progreso de envío gratis a domicilio
      const progressFill = document.getElementById('shipping-progress-fill');
      const progressText = document.getElementById('shipping-notice-text');
      if (progressFill && progressText) {
        if (subtotal >= 45) {
          progressFill.style.width = '100%';
          progressText.innerHTML = `<span>🎉 ¡Enhorabuena! Tienes <strong>Envío a Domicilio GRATIS</strong></span>`;
        } else {
          const pct = Math.min(100, Math.round((subtotal / 45) * 100));
          const diff = (45 - subtotal).toFixed(2);
          progressFill.style.width = `${pct}%`;
          progressText.innerHTML = `<span>Te faltan <strong>${diff} €</strong> para envío gratis a domicilio</span> <span>${pct}%</span>`;
        }
      }

      // Actualizar desglose en pie del carrito
      const subtotalVal = document.getElementById('cart-subtotal-val');
      const discountLine = document.getElementById('cart-discount-line');
      const discountVal = document.getElementById('cart-discount-val');
      const deliveryCalc = document.getElementById('cart-delivery-calc');
      const totalVal = document.getElementById('cart-total-val');

      if (subtotalVal) subtotalVal.textContent = `${subtotal.toFixed(2)} €`;
      if (discountLine && discountVal) {
        if (discount > 0) {
          discountLine.style.display = 'flex';
          discountVal.textContent = `-${discount.toFixed(2)} €`;
        } else {
          discountLine.style.display = 'none';
        }
      }
      if (deliveryCalc) {
        if (cartState.deliveryType === 'delivery') {
          deliveryCalc.textContent = shippingFee === 0 ? 'Gratis (+45€)' : '3.90 €';
        } else {
          deliveryCalc.textContent = 'Gratis en tienda';
        }
      }
      if (totalVal) totalVal.textContent = `${total.toFixed(2)} €`;
    }

    // Sincronizar importe total en checkout
    const checkoutTotalDisplay = document.getElementById('checkout-total-display');
    if (checkoutTotalDisplay) {
      checkoutTotalDisplay.textContent = `${total.toFixed(2)} €`;
    }

    const deliveryFeeBadge = document.getElementById('delivery-fee-badge');
    if (deliveryFeeBadge) {
      deliveryFeeBadge.textContent = subtotal >= 45 ? '¡Gratis (+45€)!' : '3.90 €';
    }
  }

  function addToCart(product) {
    const existing = cartState.items.find(i => i.id === product.id);
    if (existing) {
      existing.qty += 1;
    } else {
      cartState.items.push({
        id: product.id,
        name: product.name,
        price: product.price,
        unit: product.unit || 'ud',
        img: product.img || '',
        qty: 1
      });
    }

    saveCart();
    renderCartUI();

    const msg = translations[currentLanguage] && translations[currentLanguage].cart_added
      ? translations[currentLanguage].cart_added
      : `¡${product.name} añadido a tu cesta!`;
    showToast(msg);
  }

  function changeItemQty(id, delta) {
    const item = cartState.items.find(i => i.id === id);
    if (!item) return;

    item.qty += delta;
    if (item.qty <= 0) {
      cartState.items = cartState.items.filter(i => i.id !== id);
    }

    saveCart();
    renderCartUI();
  }

  function removeItem(id) {
    const item = cartState.items.find(i => i.id === id);
    const itemName = item ? item.name : 'Artículo';
    cartState.items = cartState.items.filter(i => i.id !== id);

    saveCart();
    renderCartUI();
    showToast(`Eliminado: ${itemName}`);
  }

  function clearCart() {
    cartState.items = [];
    cartState.coupon = null;
    saveCart();
    renderCartUI();
    showToast('Cesta vaciada');
  }

  function openCartDrawer() {
    const drawer = document.getElementById('cart-drawer');
    const overlay = document.getElementById('cart-drawer-overlay');
    if (drawer && overlay) {
      drawer.classList.add('open');
      drawer.setAttribute('aria-hidden', 'false');
      overlay.classList.add('open');
      overlay.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      renderCartUI();
    }
  }

  function closeCartDrawer() {
    const drawer = document.getElementById('cart-drawer');
    const overlay = document.getElementById('cart-drawer-overlay');
    if (drawer && overlay) {
      drawer.classList.remove('open');
      drawer.setAttribute('aria-hidden', 'true');
      overlay.classList.remove('open');
      overlay.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  }

  function initCartDrawer() {
    loadCartFromStorage();
    renderCartUI();

    const openCartBtn = document.getElementById('cart-open-btn');
    const mobileCartTrigger = document.getElementById('mobile-cart-trigger');
    const closeCartBtn = document.getElementById('cart-close-btn');
    const overlay = document.getElementById('cart-drawer-overlay');
    const startShoppingBtn = document.getElementById('cart-start-shopping');
    const clearAllBtn = document.getElementById('cart-clear-all');
    const couponBtn = document.getElementById('cart-coupon-btn');
    const couponInput = document.getElementById('cart-coupon-input');
    const couponFeedback = document.getElementById('coupon-feedback');

    if (openCartBtn) openCartBtn.addEventListener('click', openCartDrawer);
    
    if (mobileCartTrigger) {
      mobileCartTrigger.addEventListener('click', () => {
        // Cerrar menú móvil antes
        const burgerBtn = document.getElementById('hamburger-toggle-btn');
        const mobilePanel = document.getElementById('mobile-panel');
        const mobileOverlay = document.getElementById('mobile-overlay');
        if (burgerBtn) burgerBtn.classList.remove('is-active');
        if (mobilePanel) mobilePanel.classList.remove('open');
        if (mobileOverlay) mobileOverlay.classList.remove('open');

        openCartDrawer();
      });
    }

    if (closeCartBtn) closeCartBtn.addEventListener('click', closeCartDrawer);
    if (overlay) overlay.addEventListener('click', closeCartDrawer);

    if (startShoppingBtn) {
      startShoppingBtn.addEventListener('click', () => {
        closeCartDrawer();
        const aisles = document.getElementById('pasillos');
        if (aisles) {
          const header = document.getElementById('header');
          const headerH = header ? header.offsetHeight : 70;
          window.scrollTo({
            top: aisles.getBoundingClientRect().top + window.pageYOffset - headerH - 12,
            behavior: 'smooth'
          });
        }
      });
    }

    if (clearAllBtn) {
      clearAllBtn.addEventListener('click', () => {
        if (cartState.items.length > 0) {
          clearCart();
        }
      });
    }

    if (couponBtn && couponInput) {
      couponBtn.addEventListener('click', () => {
        const code = couponInput.value.trim().toUpperCase();
        if (!code) return;

        if (code === 'FRESC10' || code === 'BIENVENIDA') {
          cartState.coupon = { code, rate: 0.10 };
          if (couponFeedback) {
            couponFeedback.className = 'coupon-feedback success';
            couponFeedback.textContent = '¡Cupón del 10% de descuento aplicado con éxito!';
          }
          renderCartUI();
          showToast('Descuento del 10% aplicado a tu cesta');
        } else {
          if (couponFeedback) {
            couponFeedback.className = 'coupon-feedback error';
            couponFeedback.textContent = 'Código no válido. Prueba con: FRESC10';
          }
        }
      });
    }

    // Botón tramitar compra y reserva
    const proceedBtn = document.getElementById('proceed-checkout-btn');
    if (proceedBtn) {
      proceedBtn.addEventListener('click', () => {
        if (cartState.items.length === 0) {
          showToast('Tu cesta está vacía. Añade productos para tramitar tu compra.');
          return;
        }
        closeCartDrawer();
        openCheckoutModal();
      });
    }
  }

  /* --------------------------------------------------------------------------
     14. SISTEMA DE CHECKOUT, RESERVAS Y ELECCIÓN DE PAGO
     -------------------------------------------------------------------------- */
  const checkoutModal = document.getElementById('checkout-modal');
  const checkoutCloseBtn = document.getElementById('checkout-close-btn');
  const checkoutCancelBtn = document.getElementById('checkout-cancel-btn');
  const checkoutForm = document.getElementById('checkout-form');

  function openCheckoutModal() {
    if (!checkoutModal) return;
    checkoutModal.classList.add('open');
    checkoutModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    // Asegurar estado sincronizado de entrega y pago
    updateDeliveryTypeUI(cartState.deliveryType || 'pickup');
    renderCartUI();
  }

  function closeCheckoutModal() {
    if (!checkoutModal) return;
    checkoutModal.classList.remove('open');
    checkoutModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function updateDeliveryTypeUI(type) {
    cartState.deliveryType = type;

    const cardPickup = document.getElementById('card-type-pickup');
    const cardDelivery = document.getElementById('card-type-delivery');
    const fieldsPickup = document.getElementById('fields-pickup');
    const fieldsDelivery = document.getElementById('fields-delivery');

    const payCardPickup = document.getElementById('pay-card-pickup');
    const payCardDelivery = document.getElementById('pay-card-delivery');
    const payCardGateway = document.getElementById('pay-card-gateway');
    const submitBtnText = document.getElementById('checkout-submit-text');

    if (type === 'pickup') {
      if (cardPickup) cardPickup.classList.add('active');
      if (cardDelivery) cardDelivery.classList.remove('active');
      if (fieldsPickup) fieldsPickup.style.display = 'block';
      if (fieldsDelivery) fieldsDelivery.style.display = 'none';

      // En recogida: habilitar pagar al recoger, deshabilitar pagar a la entrega
      if (payCardPickup) payCardPickup.style.display = 'block';
      if (payCardDelivery) payCardDelivery.style.display = 'none';

      // Si estaba en pay_delivery, reasignar a pay_pickup
      if (cartState.paymentChoice === 'pay_delivery') {
        cartState.paymentChoice = 'pay_pickup';
        const radioP = document.querySelector('input[name="payment_choice"][value="pay_pickup"]');
        if (radioP) radioP.checked = true;
      }
    } else {
      if (cardDelivery) cardDelivery.classList.add('active');
      if (cardPickup) cardPickup.classList.remove('active');
      if (fieldsDelivery) fieldsDelivery.style.display = 'block';
      if (fieldsPickup) fieldsPickup.style.display = 'none';

      // En entrega a domicilio: deshabilitar pagar en tienda, habilitar pagar al repartidor
      if (payCardPickup) payCardPickup.style.display = 'none';
      if (payCardDelivery) payCardDelivery.style.display = 'block';

      // Si estaba en pay_pickup, reasignar a pay_delivery
      if (cartState.paymentChoice === 'pay_pickup') {
        cartState.paymentChoice = 'pay_delivery';
        const radioD = document.querySelector('input[name="payment_choice"][value="pay_delivery"]');
        if (radioD) radioD.checked = true;
      }
    }

    updatePaymentChoiceUI(cartState.paymentChoice);
    renderCartUI();
  }

  function updatePaymentChoiceUI(choice) {
    cartState.paymentChoice = choice;

    const payCardPickup = document.getElementById('pay-card-pickup');
    const payCardDelivery = document.getElementById('pay-card-delivery');
    const payCardGateway = document.getElementById('pay-card-gateway');
    const submitBtnText = document.getElementById('checkout-submit-text');

    if (payCardPickup) payCardPickup.classList.toggle('active', choice === 'pay_pickup');
    if (payCardDelivery) payCardDelivery.classList.toggle('active', choice === 'pay_delivery');
    if (payCardGateway) payCardGateway.classList.toggle('active', choice === 'pay_gateway');

    if (submitBtnText) {
      if (choice === 'pay_pickup') {
        submitBtnText.textContent = 'Confirmar Reserva para Recoger en Tienda';
      } else if (choice === 'pay_delivery') {
        submitBtnText.textContent = 'Confirmar Reserva con Pago en Entrega';
      } else if (choice === 'pay_gateway') {
        submitBtnText.textContent = 'Continuar a la Pasarela de Pago Segura';
      }
    }
  }

  function initCheckoutSystem() {
    if (checkoutCloseBtn) checkoutCloseBtn.addEventListener('click', closeCheckoutModal);
    if (checkoutCancelBtn) checkoutCancelBtn.addEventListener('click', () => {
      closeCheckoutModal();
      openCartDrawer();
    });

    if (checkoutModal) {
      checkoutModal.addEventListener('click', (e) => {
        if (e.target === checkoutModal) closeCheckoutModal();
      });
    }

    // Cambio de tipo de entrega (Recogida vs Domicilio)
    document.querySelectorAll('input[name="delivery_type"]').forEach(radio => {
      radio.addEventListener('change', function () {
        updateDeliveryTypeUI(this.value);
      });
    });

    // Cambio de forma de pago
    document.querySelectorAll('input[name="payment_choice"]').forEach(radio => {
      radio.addEventListener('change', function () {
        updatePaymentChoiceUI(this.value);
      });
    });

    // Envío del formulario de Checkout
    if (checkoutForm) {
      checkoutForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const buyerName = document.getElementById('buyer-name').value.trim();
        const buyerPhone = document.getElementById('buyer-phone').value.trim();
        const buyerEmail = document.getElementById('buyer-email').value.trim();

        if (!buyerName || !buyerPhone || !buyerEmail) {
          showToast('Por favor, completa los datos de contacto para la reserva (*)');
          return;
        }

        // Si es entrega a domicilio, verificar dirección
        if (cartState.deliveryType === 'delivery') {
          const address = document.getElementById('delivery-address').value.trim();
          const city = document.getElementById('delivery-city').value.trim();
          const zip = document.getElementById('delivery-zip').value.trim();
          if (!address || !city || !zip) {
            showToast('Por favor, introduce la dirección completa para el envío a domicilio');
            return;
          }
        }

        const totals = getCartTotals();
        const orderId = '#MF-' + new Date().getFullYear() + '-' + Math.floor(1000 + Math.random() * 9000);

        lastOrderData = {
          id: orderId,
          name: buyerName,
          phone: buyerPhone,
          email: buyerEmail,
          deliveryType: cartState.deliveryType,
          paymentChoice: cartState.paymentChoice,
          total: totals.total,
          itemsCount: totals.count,
          items: [...cartState.items],
          details: {
            store: document.getElementById('pickup-store') ? document.getElementById('pickup-store').value : '',
            pickupDate: document.getElementById('pickup-date') ? document.getElementById('pickup-date').value : '',
            pickupSlot: document.getElementById('pickup-slot') ? document.getElementById('pickup-slot').value : '',
            drivePlate: document.getElementById('pickup-drive-plate') ? document.getElementById('pickup-drive-plate').value.trim() : '',
            address: document.getElementById('delivery-address') ? document.getElementById('delivery-address').value.trim() : '',
            floor: document.getElementById('delivery-floor') ? document.getElementById('delivery-floor').value.trim() : '',
            zip: document.getElementById('delivery-zip') ? document.getElementById('delivery-zip').value.trim() : '',
            city: document.getElementById('delivery-city') ? document.getElementById('delivery-city').value.trim() : '',
            deliverySlot: document.getElementById('delivery-slot') ? document.getElementById('delivery-slot').value : ''
          }
        };

        // BIFURCACIÓN DE FORMA DE PAGO:
        // Caso A y B: Pago al recoger o pago a la entrega -> Confirmación directa
        // Caso C: Pago por la pasarela de pago del mercado -> Enviar a la ventana de pasarela
        if (cartState.paymentChoice === 'pay_gateway') {
          closeCheckoutModal();
          openPaymentGatewayModal(lastOrderData);
        } else {
          closeCheckoutModal();
          showOrderSuccess(lastOrderData, false);
          clearCart();
        }
      });
    }
  }

  /* --------------------------------------------------------------------------
     15. VENTANA DE LA PASARELA DE PAGO DEL MERCADO
     "en este caso se enviara a una ventana donde se le indicara lo que va a pagar
     y despues yo implementare la pasarela de pago."
     -------------------------------------------------------------------------- */
  const gatewayModal = document.getElementById('payment-gateway-modal');
  const gatewayCloseBtn = document.getElementById('gateway-close-btn');
  const gwCancelLink = document.getElementById('gw-cancel-link');

  function openPaymentGatewayModal(order) {
    if (!gatewayModal || !order) return;

    // Actualizar datos informativos en la ventana de la pasarela
    const orderRefEl = document.getElementById('gw-order-ref');
    const amountDisplayEl = document.getElementById('gw-amount-display');
    const itemsCountEl = document.getElementById('gw-items-count-display');
    const customerNameEl = document.getElementById('gw-customer-name');
    const deliveryModeEl = document.getElementById('gw-delivery-mode');
    const payBtnLabel = document.getElementById('gw-pay-button-label');

    if (orderRefEl) orderRefEl.textContent = order.id;
    if (amountDisplayEl) amountDisplayEl.textContent = `${order.total.toFixed(2)} €`;
    if (itemsCountEl) itemsCountEl.textContent = `${order.itemsCount} productos`;
    if (customerNameEl) customerNameEl.textContent = order.name;

    if (deliveryModeEl) {
      if (order.deliveryType === 'pickup') {
        deliveryModeEl.textContent = `Recogida en tienda (${order.details.pickupSlot})`;
      } else {
        deliveryModeEl.textContent = `Envío en 2h a ${order.details.city}`;
      }
    }

    if (payBtnLabel) {
      payBtnLabel.textContent = `Pagar ${order.total.toFixed(2)} € de forma segura`;
    }

    gatewayModal.classList.add('open');
    gatewayModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closePaymentGatewayModal() {
    if (!gatewayModal) return;
    gatewayModal.classList.remove('open');
    gatewayModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function initPaymentGateway() {
    if (gatewayCloseBtn) {
      gatewayCloseBtn.addEventListener('click', () => {
        closePaymentGatewayModal();
        openCheckoutModal();
      });
    }

    if (gwCancelLink) {
      gwCancelLink.addEventListener('click', () => {
        closePaymentGatewayModal();
        openCheckoutModal();
      });
    }

    if (gatewayModal) {
      gatewayModal.addEventListener('click', (e) => {
        if (e.target === gatewayModal) {
          closePaymentGatewayModal();
          openCheckoutModal();
        }
      });
    }

    // Pestañas de método en la pasarela (Tarjeta vs Bizum)
    const tabCard = document.getElementById('gw-tab-card');
    const tabBizum = document.getElementById('gw-tab-bizum');
    const cardForm = document.getElementById('gateway-card-form');
    const bizumForm = document.getElementById('gateway-bizum-form');

    if (tabCard && tabBizum && cardForm && bizumForm) {
      tabCard.addEventListener('click', () => {
        tabCard.classList.add('active');
        tabBizum.classList.remove('active');
        cardForm.style.display = 'block';
        bizumForm.style.display = 'none';
      });

      tabBizum.addEventListener('click', () => {
        tabBizum.classList.add('active');
        tabCard.classList.remove('active');
        cardForm.style.display = 'none';
        bizumForm.style.display = 'block';
      });
    }

    // Formulario de Tarjeta Bancaria de prueba
    if (cardForm) {
      cardForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const payBtn = document.getElementById('gw-submit-pay-btn');
        if (payBtn) {
          payBtn.disabled = true;
          payBtn.style.opacity = '0.75';
          payBtn.innerHTML = `<span>Verificando con entidad bancaria...</span>`;
        }

        setTimeout(() => {
          if (payBtn) {
            payBtn.disabled = false;
            payBtn.style.opacity = '1';
            payBtn.innerHTML = `<span>Pagar ahora de forma segura</span>`;
          }
          closePaymentGatewayModal();
          if (lastOrderData) {
            showOrderSuccess(lastOrderData, true);
            clearCart();
          }
        }, 1200);
      });
    }

    // Formulario Bizum de prueba
    if (bizumForm) {
      bizumForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const bzBtn = bizumForm.querySelector('button[type="submit"]');
        if (bzBtn) {
          bzBtn.disabled = true;
          bzBtn.style.opacity = '0.75';
          bzBtn.innerHTML = `<span>Conectando con Bizum...</span>`;
        }

        setTimeout(() => {
          if (bzBtn) {
            bzBtn.disabled = false;
            bzBtn.style.opacity = '1';
            bzBtn.innerHTML = `<span>Pagar con Bizum</span>`;
          }
          closePaymentGatewayModal();
          if (lastOrderData) {
            showOrderSuccess(lastOrderData, true);
            clearCart();
          }
        }, 1200);
      });
    }
  }

  /* --------------------------------------------------------------------------
     16. MODAL DE CONFIRMACIÓN Y COMPROBANTE DE COMPRA / RESERVA
     -------------------------------------------------------------------------- */
  const successModal = document.getElementById('order-success-modal');
  const printReceiptBtn = document.getElementById('print-receipt-btn');
  const successDoneBtn = document.getElementById('success-done-btn');

  function showOrderSuccess(order, isPaidOnline) {
    if (!successModal || !order) return;

    const orderIdEl = document.getElementById('succ-order-id');
    const nameEl = document.getElementById('succ-name');
    const phoneEl = document.getElementById('succ-phone');
    const deliveryInfoEl = document.getElementById('succ-delivery-info');
    const paymentInfoEl = document.getElementById('succ-payment-info');
    const totalEl = document.getElementById('succ-total');
    const statusBadge = document.getElementById('succ-status-badge');
    const noticeText = document.getElementById('succ-notice-text');

    if (orderIdEl) orderIdEl.textContent = order.id;
    if (nameEl) nameEl.textContent = order.name;
    if (phoneEl) phoneEl.textContent = order.phone;
    if (totalEl) totalEl.textContent = `${order.total.toFixed(2)} €`;

    if (deliveryInfoEl) {
      if (order.deliveryType === 'pickup') {
        const drive = order.details.drivePlate ? ` (Vehículo: ${order.details.drivePlate})` : '';
        deliveryInfoEl.textContent = `Recogida en tienda: ${order.details.store} - ${order.details.pickupDate} (${order.details.pickupSlot})${drive}`;
      } else {
        deliveryInfoEl.textContent = `Envío refrigerado a: ${order.details.address}, ${order.details.city} (${order.details.deliverySlot})`;
      }
    }

    if (paymentInfoEl) {
      if (isPaidOnline) {
        paymentInfoEl.textContent = 'Abonado mediante Pasarela Bancaria Online (Pago Seguro Certificado)';
        if (statusBadge) statusBadge.textContent = 'Pago Completado';
        if (noticeText) noticeText.textContent = `Hemos cargado ${order.total.toFixed(2)} € en tu cuenta. Tu pedido está en preparación y recibirás un SMS cuando esté listo.`;
      } else if (order.paymentChoice === 'pay_pickup') {
        paymentInfoEl.textContent = 'Pago al recoger en el supermercado (Caja Rápida / Efectivo o Tarjeta)';
        if (statusBadge) statusBadge.textContent = 'Reserva Confirmada';
        if (noticeText) noticeText.textContent = `Tu reserva está guardada. Presenta el número de pedido ${order.id} al retirar tus productos en tienda.`;
      } else {
        paymentInfoEl.textContent = 'Pago en mano al repartidor al recibir la entrega (Datáfono o Efectivo)';
        if (statusBadge) statusBadge.textContent = 'Envío Programado';
        if (noticeText) noticeText.textContent = `El repartidor llevará el datáfono inalámbrico para tarjeta o puedes abonar los ${order.total.toFixed(2)} € en efectivo a la entrega.`;
      }
    }

    successModal.classList.add('open');
    successModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeOrderSuccessModal() {
    if (!successModal) return;
    successModal.classList.remove('open');
    successModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function initSuccessModal() {
    if (printReceiptBtn) {
      printReceiptBtn.addEventListener('click', () => {
        window.print();
      });
    }

    if (successDoneBtn) {
      successDoneBtn.addEventListener('click', () => {
        closeOrderSuccessModal();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

    if (successModal) {
      successModal.addEventListener('click', (e) => {
        if (e.target === successModal) closeOrderSuccessModal();
      });
    }
  }

  /* --------------------------------------------------------------------------
     17. INICIALIZACIÓN GLOBAL
     -------------------------------------------------------------------------- */
  document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initLanguage();
    initMobileMenu();
    initSmoothScroll();
    initScrollSpy();
    initSearch();
    initUserModal();
    initInfoModals();
    initProductFilters();
    initContactForm();
    initScrollAnimations();
    initCartDrawer();
    initCheckoutSystem();
    initPaymentGateway();
    initSuccessModal();
  });

})();
