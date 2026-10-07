/* =============================================================
   VERDA · Boutique de moda sostenible
   JavaScript puro (ES6) — sin librerías ni dependencias
   Índice:
    1. Utilidades
    2. Diccionario de idiomas (ES / EN / VA)
    3. Catálogo de productos
    4. Tema claro / oscuro
    5. Idioma
    6. Navegación: scroll suave, header, menú móvil, to-top
    7. Modales genéricos
    8. Buscador con resaltado
    9. Tienda: render, filtros, orden, vista rápida
   10. Carrito de compra
   11. Checkout: entrega, pago, pasarela, confirmación
   12. Formularios (contacto, newsletter, login)
   13. Cookies y modal legal
   14. Animaciones de aparición y contadores
   ============================================================= */
'use strict';

/* ================= 1. UTILIDADES ================= */
const $  = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

const store = {
  get(key, fallback) {
    try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; }
    catch { return fallback; }
  },
  set(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* almacenamiento no disponible */ }
  }
};

const LOCALES = { es: 'es-ES', en: 'en-IE', va: 'ca-ES' };
let currentLang = store.get('verda_lang', 'es');

/** Formatea un número como precio en euros según el idioma activo. */
const money = n => new Intl.NumberFormat(LOCALES[currentLang] || 'es-ES',
  { style: 'currency', currency: 'EUR' }).format(n);

/** Traduce una clave del diccionario. */
const t = key => (I18N[currentLang] && I18N[currentLang][key]) || I18N.es[key] || key;

/** Genera la URL de una imagen de Pexels (sustituibles por fotos reales del cliente). */
const photo = (id, w = 675, h = 900) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=${w}&h=${h}`;

/** Muestra un aviso flotante temporal. */
function toast(message) {
  const box = $('#toasts');
  const el = document.createElement('div');
  el.className = 'toast';
  el.innerHTML = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m4 12 5 5L20 6"/></svg><span>${message}</span>`;
  box.appendChild(el);
  setTimeout(() => { el.classList.add('is-out'); setTimeout(() => el.remove(), 320); }, 2800);
}

/* ================= 2. DICCIONARIO DE IDIOMAS ================= */
const I18N = {
  es: {
    'logo.tag': 'slow fashion', 'top.location': 'Mercat de Colón · Parada 12 · València',
    'top.promo': 'Envío gratis desde 60 € · Recogida en el mercado sin coste',
    'nav.home': 'Inicio', 'nav.shop': 'Colección', 'nav.sustainability': 'Sostenibilidad',
    'nav.atelier': 'Taller', 'nav.reviews': 'Opiniones', 'nav.contact': 'Contacto',
    'btn.search': 'Buscar en la web',
    'hero.badge': 'Colección atemporal 2026', 'hero.title': 'Moda que cuida<br>la piel y el planeta',
    'hero.text': 'Prendas de edición limitada confeccionadas en València con fibras orgánicas, tintes naturales y trazabilidad completa. Menos prendas, mejor hechas.',
    'hero.cta1': 'Ver colección', 'hero.cta2': 'Nuestro impacto',
    'hero.stat1': 'Fibras certificadas', 'hero.stat2': 'Taller en València', 'hero.stat3': 'Prendas con alma', 'hero.scroll': 'Descubre',
    'sus.tag': 'Sostenibilidad real', 'sus.title': 'Transparencia en cada costura',
    'sus.text': 'No hablamos de tendencias, hablamos de materiales, personas y tiempo. Cada prenda incluye su ficha de trazabilidad: quién la hizo, dónde y con qué.',
    'sus.p1t': 'Fibras orgánicas', 'sus.p1d': 'Lino europeo, algodón GOTS, cáñamo y lana reciclada. Sin plásticos vírgenes ni tintes tóxicos.',
    'sus.p2t': 'Producción local', 'sus.p2d': 'Taller propio a 4 km de la tienda. Salarios dignos, jornadas reales y contratos estables.',
    'sus.p3t': 'Circularidad', 'sus.p3d': 'Reparamos gratis durante 3 años y recompramos tu prenda usada con un 20 % de descuento.',
    'sus.p4t': 'Cero residuo', 'sus.p4d': 'Patronaje zero-waste y embalaje compostable. Los retales se convierten en accesorios.',
    'sus.impactTitle': 'Nuestro impacto en 2025',
    'sus.m1': 'Litros de agua ahorrados por prenda', 'sus.m2': 'Menos emisiones que la media del sector',
    'sus.m3': 'Personas en nuestra cadena de valor', 'sus.m4': 'Energía renovable en el taller', 'sus.cta': 'Conoce el taller',
    'col.tag': 'Tienda online', 'col.title': 'Colección cápsula',
    'col.text': '20 piezas pensadas para durar. Elige tu talla, añade al carrito y decide si lo recoges en el mercado o te lo enviamos a casa.',
    'col.f.all': 'Todo', 'col.f.mujer': 'Mujer', 'col.f.hombre': 'Hombre', 'col.f.punto': 'Punto',
    'col.f.accesorios': 'Accesorios', 'col.f.basicos': 'Básicos', 'col.sort': 'Ordenar por',
    'col.sort.featured': 'Destacados', 'col.sort.asc': 'Precio: menor a mayor', 'col.sort.desc': 'Precio: mayor a menor',
    'col.sort.name': 'Nombre A-Z', 'col.empty': 'No hay piezas en esta categoría.',
    'atl.tag': 'Del campo a tu armario', 'atl.title': 'Así nace cada prenda',
    'atl.text': 'Un proceso lento, medido y verificable. Puedes visitar el taller cada viernes a las 17:00 con cita previa.',
    'atl.s1t': 'Materia prima', 'atl.s1d': 'Lino de Normandía y algodón orgánico andaluz, comprados a cooperativas con contrato directo.',
    'atl.s2t': 'Patronaje zero-waste', 'atl.s2d': 'Diseñamos los patrones para aprovechar el 96 % del tejido. El resto se transforma en accesorios.',
    'atl.s3t': 'Confección artesana', 'atl.s3d': 'Series cortas de 40 unidades cosidas a mano por nuestro equipo, con control de calidad pieza a pieza.',
    'atl.s4t': 'Entrega consciente', 'atl.s4d': 'Embalaje compostable y reparto en bici por València. O recógelo tú en nuestra parada del mercado.',
    'atl.note': 'Cada etiqueta lleva un código QR con el nombre de la persona que cosió tu prenda, el origen del tejido y su huella hídrica.',
    'rev.tag': 'Comunidad VERDA', 'rev.title': 'Lo que dicen quienes ya la visten',
    'rev.q1': '«El vestido Mistral es la prenda que más me pongo. Tres veranos y sigue impecable. Además recogí el pedido en el mercado en 24 h.»',
    'rev.q2': '«Me encantó ver el QR con el nombre de la costurera. Es la primera vez que sé quién hizo mi camisa.»',
    'rev.q3': '«Pagué al recoger, sin complicaciones. El jersey de lana reciclada no pica nada y abriga muchísimo.»',
    'rev.c1': 'València', 'rev.c2': 'Castelló', 'rev.c3': 'Alacant',
    'news.title': 'Club Verda', 'news.text': 'Avisos de nuevas cápsulas, talleres de reparación y un 10 % en tu primera compra.',
    'news.ph': 'tu@email.com', 'news.btn': 'Suscribirme',
    'ct.tag': 'Hablemos', 'ct.title': 'Visítanos o escríbenos',
    'ct.text': 'Estamos en el Mercat de Colón. Te asesoramos sobre tallas, arreglos y cuidados de cada tejido.',
    'ct.addrT': 'Tienda', 'ct.addrD': 'Mercat de Colón, Parada 12 · 46004 València',
    'ct.hourT': 'Horario', 'ct.hourD': 'Lun-Vie 10:00-20:30 · Sáb 10:00-14:30',
    'ct.phoneT': 'Teléfono y WhatsApp', 'ct.mailT': 'Email',
    'ct.fName': 'Nombre completo', 'ct.fEmail': 'Correo electrónico', 'ct.fSubject': 'Asunto',
    'ct.s1': 'Consulta sobre un producto', 'ct.s2': 'Arreglos y reparaciones', 'ct.s3': 'Pedidos y entregas', 'ct.s4': 'Prensa y colaboraciones',
    'ct.fMessage': 'Mensaje', 'ct.consent': 'He leído y acepto la política de privacidad y el tratamiento de mis datos.', 'ct.send': 'Enviar mensaje',
    'ft.about': 'Boutique de moda sostenible en València. Prendas de edición limitada, reparables y trazables.',
    'ft.nav': 'Navegación', 'ft.help': 'Ayuda', 'ft.shipping': 'Envíos y recogidas', 'ft.returns': 'Cambios y devoluciones',
    'ft.care': 'Cuidado de tejidos', 'ft.sizes': 'Guía de tallas', 'ft.legal': 'Legal', 'ft.cookies': 'Política de cookies',
    'ft.requirements': 'Requisitos', 'ft.privacy': 'Privacidad', 'ft.terms': 'Términos de compra', 'ft.infoT': 'Información',
    'ft.infoD': 'VERDA Slow Fashion S.L. · CIF B-00000000<br>Mercat de Colón, Parada 12 · 46004 València',
    'ft.rights': 'Todos los derechos reservados.', 'ft.made': 'Diseñado y cosido en València con energía 100 % renovable.',
    'srch.title': '¿Qué estás buscando?', 'srch.ph': 'Lino, jersey, envíos, taller…',
    'srch.hint': 'Buscamos en productos y en todo el contenido de la página; las coincidencias se resaltan automáticamente.',
    'lg.title': 'Mi cuenta', 'lg.tab1': 'Entrar', 'lg.tab2': 'Crear cuenta', 'lg.email': 'Email', 'lg.pass': 'Contraseña',
    'lg.enter': 'Entrar', 'lg.name': 'Nombre', 'lg.create': 'Crear cuenta',
    'lg.note': 'Demo visual: el sistema de login se conectará con tu backend.',
    'cart.title': 'Tu cesta', 'cart.empty': 'Tu cesta está vacía.', 'cart.emptyCta': 'Ver la colección',
    'cart.couponPh': 'Código promocional', 'cart.apply': 'Aplicar', 'cart.subtotal': 'Subtotal',
    'cart.discount': 'Descuento', 'cart.total': 'Total estimado',
    'cart.hint': 'Los gastos de envío se calculan en el siguiente paso según elijas recogida o envío.',
    'cart.checkout': 'Tramitar pedido', 'cart.clear': 'Vaciar cesta',
    'co.title': 'Finalizar pedido', 'co.st1': 'Entrega', 'co.st2': 'Pago', 'co.st3': 'Resumen',
    'co.pickT': 'Recogida en el mercado', 'co.pickD': 'Gratis · Listo en 24 h en nuestra parada del Mercat de Colón.',
    'co.free': 'Gratis', 'co.shipT': 'Envío a domicilio', 'co.shipD': '24-72 h · Reparto neutro en CO₂. Gratis a partir de 60 €.',
    'co.store': 'Punto de recogida', 'co.date': 'Día de recogida', 'co.time': 'Franja horaria',
    'co.name': 'Nombre y apellidos', 'co.phone': 'Teléfono', 'co.address': 'Dirección', 'co.city': 'Ciudad',
    'co.zip': 'Código postal', 'co.notes': 'Notas para el repartidor (opcional)',
    'co.pay1T': 'Pagar al recoger en el mercado', 'co.pay1D': 'Reservamos tu pedido 72 h. Pagas con tarjeta o efectivo al recogerlo.',
    'co.pay2T': 'Pagar al recibirlo (contra reembolso)', 'co.pay2D': 'Pagas al repartidor en la entrega. Suplemento de gestión 1,50 €.',
    'co.pay3T': 'Pagar ahora con la pasarela', 'co.pay3D': 'Tarjeta, Bizum o Apple Pay en un entorno seguro.',
    'co.payNote': 'Puedes cambiar la forma de pago mientras el pedido no esté confirmado.',
    'co.sumT': 'Tu pedido', 'co.shippingLine': 'Entrega', 'co.feeLine': 'Gestión contra reembolso', 'co.tax': 'IVA incluido',
    'co.back': 'Atrás', 'co.next': 'Continuar',
    'co.gwT': 'Pasarela de pago segura', 'co.gwD': 'Vas a ser redirigido al TPV del mercado. Importe total a pagar:',
    'co.gwOrder': 'Pedido', 'co.gwMethod': 'Método', 'co.gwCard': 'Tarjeta / Bizum',
    'co.gwNote': 'Zona reservada para integrar la pasarela de pago real (Redsys, Stripe, PayPal…). No se procesa ningún cobro en esta demo.',
    'co.gwBtn': 'Simular pago y confirmar', 'co.doneT': '¡Pedido confirmado!', 'co.doneBtn': 'Seguir explorando',
    'ck.text': 'Usamos cookies propias para el carrito y el idioma, y cookies analíticas anónimas. Puedes aceptarlas o seguir solo con las necesarias.',
    'ck.accept': 'Aceptar todas', 'ck.reject': 'Solo necesarias', 'ck.more': 'Ver política',
    /* --- cadenas usadas desde JS --- */
    'js.size': 'Talla', 'js.qty': 'Cantidad', 'js.add': 'Añadir a la cesta', 'js.quick': 'Vista rápida',
    'js.oneSize': 'Única', 'js.added': 'Añadido a la cesta', 'js.removed': 'Producto eliminado',
    'js.cartCleared': 'Cesta vaciada', 'js.pickSize': 'Elige una talla', 'js.units': 'uds.', 'js.delete': 'Eliminar',
    'js.freeShipLeft': 'Te faltan {x} para el envío gratuito', 'js.freeShipOk': '¡Enhorabuena! Tienes el envío gratis',
    'js.couponOk': 'Código aplicado correctamente', 'js.couponKo': 'Código no válido',
    'js.emptyCart': 'Añade alguna prenda antes de tramitar el pedido',
    'js.results': 'resultados', 'js.noResults': 'Sin resultados para',
    'js.products': 'Productos', 'js.sections': 'Secciones de la web',
    'js.required': 'Este campo es obligatorio', 'js.badEmail': 'Introduce un email válido',
    'js.short': 'Escribe al menos {x} caracteres', 'js.consent': 'Debes aceptar la política de privacidad',
    'js.sent': '¡Gracias! Te responderemos en menos de 24 h laborables.',
    'js.newsOk': 'Te has suscrito al Club Verda', 'js.loginDemo': 'Login de demostración: conéctalo a tu backend',
    'js.fill': 'Completa los datos obligatorios de entrega',
    'js.zip': 'Introduce un código postal válido (5 dígitos)',
    'js.edit': 'Editar', 'js.delivery': 'Entrega', 'js.payment': 'Forma de pago', 'js.contact': 'Contacto',
    'js.confirmReserve': 'Confirmar reserva', 'js.confirmOrder': 'Confirmar pedido', 'js.goGateway': 'Ir a la pasarela de pago',
    'js.doneStore': 'Hemos reservado tu pedido. Pasa a recogerlo por {store} el {date} ({time}) y paga allí mismo con tarjeta o efectivo.',
    'js.doneCod': 'Tu pedido saldrá hoy mismo. Pagarás {total} al repartidor en el momento de la entrega en {address}.',
    'js.donePaid': 'Pago simulado correctamente. Recibirás la confirmación por email con el detalle de tu pedido.',
    'js.descmujer': 'Silueta fluida y cómoda, pensada para llevarse durante años en cualquier estación.',
    'js.deschombre': 'Corte relajado y costuras reforzadas. Una pieza versátil que mejora con cada lavado.',
    'js.descpunto': 'Tejido en talleres familiares con hilatura trazable. Suave, cálido y reparable.',
    'js.descaccesorios': 'Fabricado con retales y materiales de bajo impacto. Resistente y de uso diario.',
    'js.descbasicos': 'La base del armario consciente: tacto natural, tintes sin metales pesados y durabilidad real.',
    'js.freeRepair': 'Reparación gratuita 3 años', 'js.shipInfo': 'Envío en 24-72 h o recogida gratis', 'js.traceInfo': 'Trazabilidad con QR en la etiqueta',
    'mat.linen': 'Lino orgánico', 'mat.linenWashed': 'Lino lavado a la piedra', 'mat.linenRec': 'Lino reciclado',
    'mat.cottonOrg': 'Algodón orgánico GOTS', 'mat.cottonRec': 'Algodón reciclado', 'mat.hemp': 'Cáñamo natural',
    'mat.hempCotton': 'Cáñamo y algodón', 'mat.woolRec': 'Lana reciclada', 'mat.merino': 'Lana merina certificada',
    'mat.alpaca': 'Alpaca sostenible', 'mat.woolVirgin': 'Lana virgen peninsular', 'mat.canvas': 'Lona orgánica',
    'mat.knitArt': 'Punto artesanal', 'mat.veganLeather': 'Cuero vegetal', 'mat.tencel': 'Tencel™ Lyocell',
    'tag.new': 'Nuevo', 'tag.eco': 'Edición limitada'
  },

  en: {
    'logo.tag': 'slow fashion', 'top.location': 'Mercat de Colón · Stall 12 · Valencia',
    'top.promo': 'Free shipping over €60 · Free market pick-up',
    'nav.home': 'Home', 'nav.shop': 'Collection', 'nav.sustainability': 'Sustainability',
    'nav.atelier': 'Atelier', 'nav.reviews': 'Reviews', 'nav.contact': 'Contact',
    'btn.search': 'Search the site',
    'hero.badge': 'Timeless collection 2026', 'hero.title': 'Fashion that cares<br>for skin and planet',
    'hero.text': 'Limited-edition garments made in Valencia with organic fibres, natural dyes and full traceability. Fewer clothes, better made.',
    'hero.cta1': 'Shop collection', 'hero.cta2': 'Our impact',
    'hero.stat1': 'Certified fibres', 'hero.stat2': 'Atelier in Valencia', 'hero.stat3': 'Garments with soul', 'hero.scroll': 'Discover',
    'sus.tag': 'Real sustainability', 'sus.title': 'Transparency in every stitch',
    'sus.text': 'We do not talk about trends, we talk about materials, people and time. Every garment comes with its traceability sheet: who made it, where and with what.',
    'sus.p1t': 'Organic fibres', 'sus.p1d': 'European linen, GOTS cotton, hemp and recycled wool. No virgin plastics, no toxic dyes.',
    'sus.p2t': 'Local production', 'sus.p2d': 'Our own atelier 4 km from the shop. Fair wages, real working hours and stable contracts.',
    'sus.p3t': 'Circularity', 'sus.p3d': 'Free repairs for 3 years and we buy your used garment back with a 20% discount.',
    'sus.p4t': 'Zero waste', 'sus.p4d': 'Zero-waste pattern making and compostable packaging. Offcuts become accessories.',
    'sus.impactTitle': 'Our impact in 2025',
    'sus.m1': 'Litres of water saved per garment', 'sus.m2': 'Fewer emissions than the industry average',
    'sus.m3': 'People in our value chain', 'sus.m4': 'Renewable energy at the atelier', 'sus.cta': 'Visit the atelier',
    'col.tag': 'Online shop', 'col.title': 'Capsule collection',
    'col.text': '20 pieces designed to last. Choose your size, add to cart and decide whether to pick it up at the market or have it delivered.',
    'col.f.all': 'All', 'col.f.mujer': 'Women', 'col.f.hombre': 'Men', 'col.f.punto': 'Knitwear',
    'col.f.accesorios': 'Accessories', 'col.f.basicos': 'Basics', 'col.sort': 'Sort by',
    'col.sort.featured': 'Featured', 'col.sort.asc': 'Price: low to high', 'col.sort.desc': 'Price: high to low',
    'col.sort.name': 'Name A-Z', 'col.empty': 'No pieces in this category.',
    'atl.tag': 'From field to wardrobe', 'atl.title': 'How each garment is born',
    'atl.text': 'A slow, measured and verifiable process. You can visit the atelier every Friday at 5 pm by appointment.',
    'atl.s1t': 'Raw material', 'atl.s1d': 'Linen from Normandy and Andalusian organic cotton, bought directly from cooperatives.',
    'atl.s2t': 'Zero-waste patterns', 'atl.s2d': 'We design patterns that use 96% of the fabric. The rest becomes accessories.',
    'atl.s3t': 'Artisan making', 'atl.s3d': 'Short runs of 40 units hand-sewn by our team, with piece-by-piece quality control.',
    'atl.s4t': 'Conscious delivery', 'atl.s4d': 'Compostable packaging and bike delivery across Valencia. Or pick it up at our market stall.',
    'atl.note': 'Every label carries a QR code with the name of the person who sewed your garment, the fabric origin and its water footprint.',
    'rev.tag': 'VERDA community', 'rev.title': 'What our customers say',
    'rev.q1': '"The Mistral dress is the garment I wear most. Three summers and still perfect. I also picked it up at the market within 24 h."',
    'rev.q2': '"I loved the QR code with the seamstress name. First time I know who made my shirt."',
    'rev.q3': '"I paid on pick-up, no hassle. The recycled wool jumper does not itch at all and is really warm."',
    'rev.c1': 'Valencia', 'rev.c2': 'Castelló', 'rev.c3': 'Alicante',
    'news.title': 'Verda Club', 'news.text': 'New capsule alerts, repair workshops and 10% off your first order.',
    'news.ph': 'you@email.com', 'news.btn': 'Subscribe',
    'ct.tag': "Let's talk", 'ct.title': 'Visit us or write to us',
    'ct.text': 'We are at Mercat de Colón. We advise you on sizes, alterations and fabric care.',
    'ct.addrT': 'Store', 'ct.addrD': 'Mercat de Colón, Stall 12 · 46004 Valencia',
    'ct.hourT': 'Opening hours', 'ct.hourD': 'Mon-Fri 10:00-20:30 · Sat 10:00-14:30',
    'ct.phoneT': 'Phone & WhatsApp', 'ct.mailT': 'Email',
    'ct.fName': 'Full name', 'ct.fEmail': 'Email address', 'ct.fSubject': 'Subject',
    'ct.s1': 'Product enquiry', 'ct.s2': 'Alterations and repairs', 'ct.s3': 'Orders and delivery', 'ct.s4': 'Press and partnerships',
    'ct.fMessage': 'Message', 'ct.consent': 'I have read and accept the privacy policy and the processing of my data.', 'ct.send': 'Send message',
    'ft.about': 'Sustainable fashion boutique in Valencia. Limited-edition garments, repairable and traceable.',
    'ft.nav': 'Navigation', 'ft.help': 'Help', 'ft.shipping': 'Shipping & pick-up', 'ft.returns': 'Exchanges & returns',
    'ft.care': 'Fabric care', 'ft.sizes': 'Size guide', 'ft.legal': 'Legal', 'ft.cookies': 'Cookie policy',
    'ft.requirements': 'Requirements', 'ft.privacy': 'Privacy', 'ft.terms': 'Purchase terms', 'ft.infoT': 'Information',
    'ft.infoD': 'VERDA Slow Fashion S.L. · VAT B-00000000<br>Mercat de Colón, Stall 12 · 46004 Valencia',
    'ft.rights': 'All rights reserved.', 'ft.made': 'Designed and sewn in Valencia with 100% renewable energy.',
    'srch.title': 'What are you looking for?', 'srch.ph': 'Linen, jumper, shipping, atelier…',
    'srch.hint': 'We search products and all page content; matches are highlighted automatically.',
    'lg.title': 'My account', 'lg.tab1': 'Sign in', 'lg.tab2': 'Create account', 'lg.email': 'Email', 'lg.pass': 'Password',
    'lg.enter': 'Sign in', 'lg.name': 'Name', 'lg.create': 'Create account',
    'lg.note': 'Visual demo: the login system will connect to your backend.',
    'cart.title': 'Your basket', 'cart.empty': 'Your basket is empty.', 'cart.emptyCta': 'Browse the collection',
    'cart.couponPh': 'Promo code', 'cart.apply': 'Apply', 'cart.subtotal': 'Subtotal',
    'cart.discount': 'Discount', 'cart.total': 'Estimated total',
    'cart.hint': 'Delivery costs are calculated in the next step depending on pick-up or shipping.',
    'cart.checkout': 'Checkout', 'cart.clear': 'Empty basket',
    'co.title': 'Complete your order', 'co.st1': 'Delivery', 'co.st2': 'Payment', 'co.st3': 'Summary',
    'co.pickT': 'Pick up at the market', 'co.pickD': 'Free · Ready in 24 h at our Mercat de Colón stall.',
    'co.free': 'Free', 'co.shipT': 'Home delivery', 'co.shipD': '24-72 h · CO₂ neutral delivery. Free over €60.',
    'co.store': 'Pick-up point', 'co.date': 'Pick-up day', 'co.time': 'Time slot',
    'co.name': 'Full name', 'co.phone': 'Phone', 'co.address': 'Address', 'co.city': 'City',
    'co.zip': 'Postcode', 'co.notes': 'Notes for the courier (optional)',
    'co.pay1T': 'Pay when you pick it up', 'co.pay1D': 'We hold your order for 72 h. Pay by card or cash at the stall.',
    'co.pay2T': 'Pay on delivery (cash on delivery)', 'co.pay2D': 'Pay the courier upon delivery. €1.50 handling fee.',
    'co.pay3T': 'Pay now with the payment gateway', 'co.pay3D': 'Card, Bizum or Apple Pay in a secure environment.',
    'co.payNote': 'You can change the payment method until the order is confirmed.',
    'co.sumT': 'Your order', 'co.shippingLine': 'Delivery', 'co.feeLine': 'Cash on delivery fee', 'co.tax': 'VAT included',
    'co.back': 'Back', 'co.next': 'Continue',
    'co.gwT': 'Secure payment gateway', 'co.gwD': 'You will be redirected to the market POS. Total amount to pay:',
    'co.gwOrder': 'Order', 'co.gwMethod': 'Method', 'co.gwCard': 'Card / Bizum',
    'co.gwNote': 'Area reserved to integrate the real payment gateway (Redsys, Stripe, PayPal…). No charge is processed in this demo.',
    'co.gwBtn': 'Simulate payment and confirm', 'co.doneT': 'Order confirmed!', 'co.doneBtn': 'Keep exploring',
    'ck.text': 'We use our own cookies for the cart and language, plus anonymous analytics. Accept them or continue with the essential ones only.',
    'ck.accept': 'Accept all', 'ck.reject': 'Essential only', 'ck.more': 'Read policy',
    'js.size': 'Size', 'js.qty': 'Quantity', 'js.add': 'Add to basket', 'js.quick': 'Quick view',
    'js.oneSize': 'One size', 'js.added': 'Added to basket', 'js.removed': 'Item removed',
    'js.cartCleared': 'Basket emptied', 'js.pickSize': 'Choose a size', 'js.units': 'pcs', 'js.delete': 'Remove',
    'js.freeShipLeft': '{x} away from free shipping', 'js.freeShipOk': 'Great! You got free shipping',
    'js.couponOk': 'Code applied successfully', 'js.couponKo': 'Invalid code',
    'js.emptyCart': 'Add a garment before checking out',
    'js.results': 'results', 'js.noResults': 'No results for',
    'js.products': 'Products', 'js.sections': 'Site sections',
    'js.required': 'This field is required', 'js.badEmail': 'Enter a valid email',
    'js.short': 'Write at least {x} characters', 'js.consent': 'You must accept the privacy policy',
    'js.sent': 'Thank you! We will reply within 24 working hours.',
    'js.newsOk': 'You joined the Verda Club', 'js.loginDemo': 'Demo login: connect it to your backend',
    'js.fill': 'Complete the required delivery details',
    'js.zip': 'Enter a valid postcode (5 digits)',
    'js.edit': 'Edit', 'js.delivery': 'Delivery', 'js.payment': 'Payment method', 'js.contact': 'Contact',
    'js.confirmReserve': 'Confirm reservation', 'js.confirmOrder': 'Confirm order', 'js.goGateway': 'Go to payment gateway',
    'js.doneStore': 'Your order is reserved. Pick it up at {store} on {date} ({time}) and pay there by card or cash.',
    'js.doneCod': 'Your order ships today. You will pay {total} to the courier on delivery at {address}.',
    'js.donePaid': 'Payment simulated successfully. You will receive an email with your order details.',
    'js.descmujer': 'A fluid, comfortable silhouette made to be worn for years in any season.',
    'js.deschombre': 'Relaxed cut with reinforced seams. A versatile piece that improves with every wash.',
    'js.descpunto': 'Knitted in family workshops with traceable yarn. Soft, warm and repairable.',
    'js.descaccesorios': 'Made from offcuts and low-impact materials. Sturdy and made for daily use.',
    'js.descbasicos': 'The base of a conscious wardrobe: natural touch, heavy-metal-free dyes and real durability.',
    'js.freeRepair': 'Free repairs for 3 years', 'js.shipInfo': '24-72 h delivery or free pick-up', 'js.traceInfo': 'QR traceability on the label',
    'mat.linen': 'Organic linen', 'mat.linenWashed': 'Stone-washed linen', 'mat.linenRec': 'Recycled linen',
    'mat.cottonOrg': 'GOTS organic cotton', 'mat.cottonRec': 'Recycled cotton', 'mat.hemp': 'Natural hemp',
    'mat.hempCotton': 'Hemp & cotton', 'mat.woolRec': 'Recycled wool', 'mat.merino': 'Certified merino wool',
    'mat.alpaca': 'Sustainable alpaca', 'mat.woolVirgin': 'Iberian virgin wool', 'mat.canvas': 'Organic canvas',
    'mat.knitArt': 'Artisan knit', 'mat.veganLeather': 'Vegan leather', 'mat.tencel': 'Tencel™ Lyocell',
    'tag.new': 'New', 'tag.eco': 'Limited edition'
  },

  va: {
    'logo.tag': 'slow fashion', 'top.location': 'Mercat de Colón · Parada 12 · València',
    'top.promo': 'Enviament gratis des de 60 € · Recollida al mercat sense cost',
    'nav.home': 'Inici', 'nav.shop': 'Col·lecció', 'nav.sustainability': 'Sostenibilitat',
    'nav.atelier': 'Taller', 'nav.reviews': 'Opinions', 'nav.contact': 'Contacte',
    'btn.search': 'Cercar al web',
    'hero.badge': 'Col·lecció atemporal 2026', 'hero.title': 'Moda que cuida<br>la pell i el planeta',
    'hero.text': 'Peces d\'edició limitada confeccionades a València amb fibres orgàniques, tints naturals i traçabilitat completa. Menys peces, millor fetes.',
    'hero.cta1': 'Veure col·lecció', 'hero.cta2': 'El nostre impacte',
    'hero.stat1': 'Fibres certificades', 'hero.stat2': 'Taller a València', 'hero.stat3': 'Peces amb ànima', 'hero.scroll': 'Descobreix',
    'sus.tag': 'Sostenibilitat real', 'sus.title': 'Transparència en cada costura',
    'sus.text': 'No parlem de tendències, parlem de materials, persones i temps. Cada peça inclou la seua fitxa de traçabilitat: qui la va fer, on i amb què.',
    'sus.p1t': 'Fibres orgàniques', 'sus.p1d': 'Lli europeu, cotó GOTS, cànem i llana reciclada. Sense plàstics verges ni tints tòxics.',
    'sus.p2t': 'Producció local', 'sus.p2d': 'Taller propi a 4 km de la botiga. Salaris dignes, jornades reals i contractes estables.',
    'sus.p3t': 'Circularitat', 'sus.p3d': 'Reparem gratis durant 3 anys i recomprem la teua peça usada amb un 20 % de descompte.',
    'sus.p4t': 'Zero residu', 'sus.p4d': 'Patronatge zero-waste i embalatge compostable. Les retalls es converteixen en accessoris.',
    'sus.impactTitle': 'El nostre impacte en 2025',
    'sus.m1': 'Litres d\'aigua estalviats per peça', 'sus.m2': 'Menys emissions que la mitjana del sector',
    'sus.m3': 'Persones a la nostra cadena de valor', 'sus.m4': 'Energia renovable al taller', 'sus.cta': 'Coneix el taller',
    'col.tag': 'Botiga en línia', 'col.title': 'Col·lecció càpsula',
    'col.text': '20 peces pensades per durar. Tria la talla, afig-la al carret i decideix si la reculls al mercat o te l\'enviem a casa.',
    'col.f.all': 'Tot', 'col.f.mujer': 'Dona', 'col.f.hombre': 'Home', 'col.f.punto': 'Punt',
    'col.f.accesorios': 'Accessoris', 'col.f.basicos': 'Bàsics', 'col.sort': 'Ordenar per',
    'col.sort.featured': 'Destacats', 'col.sort.asc': 'Preu: de menor a major', 'col.sort.desc': 'Preu: de major a menor',
    'col.sort.name': 'Nom A-Z', 'col.empty': 'No hi ha peces en aquesta categoria.',
    'atl.tag': 'Del camp a l\'armari', 'atl.title': 'Així naix cada peça',
    'atl.text': 'Un procés lent, mesurat i verificable. Pots visitar el taller cada divendres a les 17:00 amb cita prèvia.',
    'atl.s1t': 'Matèria primera', 'atl.s1d': 'Lli de Normandia i cotó orgànic andalús, comprats a cooperatives amb contracte directe.',
    'atl.s2t': 'Patronatge zero-waste', 'atl.s2d': 'Dissenyem els patrons per aprofitar el 96 % del teixit. La resta es transforma en accessoris.',
    'atl.s3t': 'Confecció artesana', 'atl.s3d': 'Sèries curtes de 40 unitats cosides a mà pel nostre equip, amb control de qualitat peça a peça.',
    'atl.s4t': 'Lliurament conscient', 'atl.s4d': 'Embalatge compostable i repartiment en bici per València. O recull-ho tu a la nostra parada del mercat.',
    'atl.note': 'Cada etiqueta porta un codi QR amb el nom de la persona que va cosir la teua peça, l\'origen del teixit i la seua petjada hídrica.',
    'rev.tag': 'Comunitat VERDA', 'rev.title': 'Què diuen els qui ja la vesteixen',
    'rev.q1': '«El vestit Mistral és la peça que més em pose. Tres estius i continua impecable. A més vaig recollir la comanda al mercat en 24 h.»',
    'rev.q2': '«Em va encantar veure el QR amb el nom de la cosidora. És la primera vegada que sé qui va fer la meua camisa.»',
    'rev.q3': '«Vaig pagar en recollir, sense complicacions. El jersei de llana reciclada no pica gens i abriga moltíssim.»',
    'rev.c1': 'València', 'rev.c2': 'Castelló', 'rev.c3': 'Alacant',
    'news.title': 'Club Verda', 'news.text': 'Avisos de noves càpsules, tallers de reparació i un 10 % en la teua primera compra.',
    'news.ph': 'tu@email.com', 'news.btn': 'Subscriure\'m',
    'ct.tag': 'Parlem', 'ct.title': 'Visita\'ns o escriu-nos',
    'ct.text': 'Estem al Mercat de Colón. T\'assessorem sobre talles, arranjaments i cures de cada teixit.',
    'ct.addrT': 'Botiga', 'ct.addrD': 'Mercat de Colón, Parada 12 · 46004 València',
    'ct.hourT': 'Horari', 'ct.hourD': 'Dl-Dv 10:00-20:30 · Ds 10:00-14:30',
    'ct.phoneT': 'Telèfon i WhatsApp', 'ct.mailT': 'Correu',
    'ct.fName': 'Nom complet', 'ct.fEmail': 'Correu electrònic', 'ct.fSubject': 'Assumpte',
    'ct.s1': 'Consulta sobre un producte', 'ct.s2': 'Arranjaments i reparacions', 'ct.s3': 'Comandes i lliuraments', 'ct.s4': 'Premsa i col·laboracions',
    'ct.fMessage': 'Missatge', 'ct.consent': 'He llegit i accepte la política de privacitat i el tractament de les meues dades.', 'ct.send': 'Enviar missatge',
    'ft.about': 'Boutique de moda sostenible a València. Peces d\'edició limitada, reparables i traçables.',
    'ft.nav': 'Navegació', 'ft.help': 'Ajuda', 'ft.shipping': 'Enviaments i recollides', 'ft.returns': 'Canvis i devolucions',
    'ft.care': 'Cura dels teixits', 'ft.sizes': 'Guia de talles', 'ft.legal': 'Legal', 'ft.cookies': 'Política de galetes',
    'ft.requirements': 'Requisits', 'ft.privacy': 'Privacitat', 'ft.terms': 'Termes de compra', 'ft.infoT': 'Informació',
    'ft.infoD': 'VERDA Slow Fashion S.L. · CIF B-00000000<br>Mercat de Colón, Parada 12 · 46004 València',
    'ft.rights': 'Tots els drets reservats.', 'ft.made': 'Dissenyat i cosit a València amb energia 100 % renovable.',
    'srch.title': 'Què estàs buscant?', 'srch.ph': 'Lli, jersei, enviaments, taller…',
    'srch.hint': 'Busquem en productes i en tot el contingut de la pàgina; les coincidències es ressalten automàticament.',
    'lg.title': 'El meu compte', 'lg.tab1': 'Entrar', 'lg.tab2': 'Crear compte', 'lg.email': 'Correu', 'lg.pass': 'Contrasenya',
    'lg.enter': 'Entrar', 'lg.name': 'Nom', 'lg.create': 'Crear compte',
    'lg.note': 'Demo visual: el sistema de login es connectarà amb el teu backend.',
    'cart.title': 'La teua cistella', 'cart.empty': 'La teua cistella està buida.', 'cart.emptyCta': 'Veure la col·lecció',
    'cart.couponPh': 'Codi promocional', 'cart.apply': 'Aplicar', 'cart.subtotal': 'Subtotal',
    'cart.discount': 'Descompte', 'cart.total': 'Total estimat',
    'cart.hint': 'Les despeses d\'enviament es calculen en el pas següent segons tries recollida o enviament.',
    'cart.checkout': 'Tramitar comanda', 'cart.clear': 'Buidar cistella',
    'co.title': 'Finalitzar comanda', 'co.st1': 'Lliurament', 'co.st2': 'Pagament', 'co.st3': 'Resum',
    'co.pickT': 'Recollida al mercat', 'co.pickD': 'Gratis · Preparada en 24 h a la nostra parada del Mercat de Colón.',
    'co.free': 'Gratis', 'co.shipT': 'Enviament a domicili', 'co.shipD': '24-72 h · Repartiment neutre en CO₂. Gratis a partir de 60 €.',
    'co.store': 'Punt de recollida', 'co.date': 'Dia de recollida', 'co.time': 'Franja horària',
    'co.name': 'Nom i cognoms', 'co.phone': 'Telèfon', 'co.address': 'Adreça', 'co.city': 'Ciutat',
    'co.zip': 'Codi postal', 'co.notes': 'Notes per al repartidor (opcional)',
    'co.pay1T': 'Pagar en recollir al mercat', 'co.pay1D': 'Reservem la comanda 72 h. Pagues amb targeta o efectiu en recollir-la.',
    'co.pay2T': 'Pagar en rebre-la (contra reemborsament)', 'co.pay2D': 'Pagues al repartidor en el lliurament. Suplement de gestió 1,50 €.',
    'co.pay3T': 'Pagar ara amb la passarel·la', 'co.pay3D': 'Targeta, Bizum o Apple Pay en un entorn segur.',
    'co.payNote': 'Pots canviar la forma de pagament mentre la comanda no estiga confirmada.',
    'co.sumT': 'La teua comanda', 'co.shippingLine': 'Lliurament', 'co.feeLine': 'Gestió contra reemborsament', 'co.tax': 'IVA inclòs',
    'co.back': 'Arrere', 'co.next': 'Continuar',
    'co.gwT': 'Passarel·la de pagament segura', 'co.gwD': 'Seràs redirigit al TPV del mercat. Import total a pagar:',
    'co.gwOrder': 'Comanda', 'co.gwMethod': 'Mètode', 'co.gwCard': 'Targeta / Bizum',
    'co.gwNote': 'Zona reservada per integrar la passarel·la de pagament real (Redsys, Stripe, PayPal…). No es processa cap cobrament en aquesta demo.',
    'co.gwBtn': 'Simular pagament i confirmar', 'co.doneT': 'Comanda confirmada!', 'co.doneBtn': 'Continuar explorant',
    'ck.text': 'Fem servir galetes pròpies per al carret i l\'idioma, i galetes analítiques anònimes. Pots acceptar-les o continuar només amb les necessàries.',
    'ck.accept': 'Acceptar totes', 'ck.reject': 'Només necessàries', 'ck.more': 'Veure política',
    'js.size': 'Talla', 'js.qty': 'Quantitat', 'js.add': 'Afegir a la cistella', 'js.quick': 'Vista ràpida',
    'js.oneSize': 'Única', 'js.added': 'Afegit a la cistella', 'js.removed': 'Producte eliminat',
    'js.cartCleared': 'Cistella buidada', 'js.pickSize': 'Tria una talla', 'js.units': 'uts.', 'js.delete': 'Eliminar',
    'js.freeShipLeft': 'Et falten {x} per a l\'enviament gratuït', 'js.freeShipOk': 'Enhorabona! Tens l\'enviament gratis',
    'js.couponOk': 'Codi aplicat correctament', 'js.couponKo': 'Codi no vàlid',
    'js.emptyCart': 'Afig alguna peça abans de tramitar la comanda',
    'js.results': 'resultats', 'js.noResults': 'Sense resultats per a',
    'js.products': 'Productes', 'js.sections': 'Seccions del web',
    'js.required': 'Aquest camp és obligatori', 'js.badEmail': 'Introdueix un correu vàlid',
    'js.short': 'Escriu almenys {x} caràcters', 'js.consent': 'Has d\'acceptar la política de privacitat',
    'js.sent': 'Gràcies! Et respondrem en menys de 24 h laborables.',
    'js.newsOk': 'T\'has subscrit al Club Verda', 'js.loginDemo': 'Login de demostració: connecta\'l al teu backend',
    'js.fill': 'Completa les dades obligatòries de lliurament',
    'js.zip': 'Introdueix un codi postal vàlid (5 dígits)',
    'js.edit': 'Editar', 'js.delivery': 'Lliurament', 'js.payment': 'Forma de pagament', 'js.contact': 'Contacte',
    'js.confirmReserve': 'Confirmar reserva', 'js.confirmOrder': 'Confirmar comanda', 'js.goGateway': 'Anar a la passarel·la',
    'js.doneStore': 'Hem reservat la teua comanda. Passa a recollir-la per {store} el {date} ({time}) i paga allí mateix amb targeta o efectiu.',
    'js.doneCod': 'La teua comanda eixirà hui mateix. Pagaràs {total} al repartidor en el lliurament a {address}.',
    'js.donePaid': 'Pagament simulat correctament. Rebràs la confirmació per correu amb el detall de la comanda.',
    'js.descmujer': 'Silueta fluida i còmoda, pensada per portar-se durant anys en qualsevol estació.',
    'js.deschombre': 'Tall relaxat i costures reforçades. Una peça versàtil que millora amb cada rentada.',
    'js.descpunto': 'Teixit en tallers familiars amb filatura traçable. Suau, càlid i reparable.',
    'js.descaccesorios': 'Fabricat amb retalls i materials de baix impacte. Resistent i d\'ús diari.',
    'js.descbasicos': 'La base de l\'armari conscient: tacte natural, tints sense metalls pesants i durabilitat real.',
    'js.freeRepair': 'Reparació gratuïta 3 anys', 'js.shipInfo': 'Enviament en 24-72 h o recollida gratis', 'js.traceInfo': 'Traçabilitat amb QR a l\'etiqueta',
    'mat.linen': 'Lli orgànic', 'mat.linenWashed': 'Lli rentat a la pedra', 'mat.linenRec': 'Lli reciclat',
    'mat.cottonOrg': 'Cotó orgànic GOTS', 'mat.cottonRec': 'Cotó reciclat', 'mat.hemp': 'Cànem natural',
    'mat.hempCotton': 'Cànem i cotó', 'mat.woolRec': 'Llana reciclada', 'mat.merino': 'Llana merina certificada',
    'mat.alpaca': 'Alpaca sostenible', 'mat.woolVirgin': 'Llana verge peninsular', 'mat.canvas': 'Lona orgànica',
    'mat.knitArt': 'Punt artesanal', 'mat.veganLeather': 'Cuir vegetal', 'mat.tencel': 'Tencel™ Lyocell',
    'tag.new': 'Nou', 'tag.eco': 'Edició limitada'
  }
};

/* ================= 3. CATÁLOGO DE PRODUCTOS ================= */
const SIZES_CLOTHES = ['XS', 'S', 'M', 'L', 'XL'];
const PRODUCTS = [
  { id: 1,  name: 'Vestido Mistral',   cat: 'mujer',      mat: 'linen',        price: 128, img: photo(7789139),  badge: 'new' },
  { id: 2,  name: 'Vestido Duna',      cat: 'mujer',      mat: 'cottonOrg',    price: 96,  img: photo(20620137) },
  { id: 3,  name: 'Vestido Albera',    cat: 'mujer',      mat: 'linenWashed',  price: 145, img: photo(6976616),  badge: 'eco' },
  { id: 4,  name: 'Túnica Serena',     cat: 'mujer',      mat: 'hemp',         price: 89,  old: 110, img: photo(18166180) },
  { id: 5,  name: 'Camisa Lluvia',     cat: 'hombre',     mat: 'linenRec',     price: 78,  img: photo(12955555) },
  { id: 6,  name: 'Camisa Terral',     cat: 'hombre',     mat: 'cottonOrg',    price: 72,  img: photo(31854718), badge: 'new' },
  { id: 7,  name: 'Pantalón Ribera',   cat: 'hombre',     mat: 'hempCotton',   price: 98,  img: photo(4641824) },
  { id: 8,  name: 'Chaqueta Garbí',    cat: 'hombre',     mat: 'woolRec',      price: 189, img: photo(5709631),  badge: 'eco' },
  { id: 9,  name: 'Jersey Bruma',      cat: 'punto',      mat: 'merino',       price: 132, img: photo(6694760) },
  { id: 10, name: 'Cárdigan Sendera',  cat: 'punto',      mat: 'cottonRec',    price: 118, img: photo(35009415) },
  { id: 11, name: 'Jersey Calma',      cat: 'punto',      mat: 'alpaca',       price: 156, img: photo(34334481), badge: 'new' },
  { id: 12, name: 'Chal Ventís',       cat: 'punto',      mat: 'woolVirgin',   price: 64,  img: photo(7585625) },
  { id: 13, name: 'Bolso Mare',        cat: 'accesorios', mat: 'canvas',       price: 59,  img: photo(19091739) },
  { id: 14, name: 'Tote Horta',        cat: 'accesorios', mat: 'cottonRec',    price: 32,  img: photo(24959992), badge: 'eco' },
  { id: 15, name: 'Bolso Pedra',       cat: 'accesorios', mat: 'knitArt',      price: 74,  img: photo(29234824) },
  { id: 16, name: 'Bolso Alba',        cat: 'accesorios', mat: 'veganLeather', price: 110, old: 135, img: photo(38270321) },
  { id: 17, name: 'Camiseta Arena',    cat: 'basicos',    mat: 'cottonOrg',    price: 36,  img: photo(7282433) },
  { id: 18, name: 'Top Ones',          cat: 'basicos',    mat: 'tencel',       price: 42,  img: photo(7031433) },
  { id: 19, name: 'Blusa Cel',         cat: 'basicos',    mat: 'linen',        price: 54,  img: photo(8180080), badge: 'new' },
  { id: 20, name: 'Bata Nit',          cat: 'basicos',    mat: 'cottonOrg',    price: 86,  img: photo(7901232) }
];

/** Tallas disponibles según la categoría. */
const sizesOf = p => (p.cat === 'accesorios' ? [t('js.oneSize')] : SIZES_CLOTHES);

/* ================= 4. TEMA CLARO / OSCURO ================= */
const themeBtn = $('#themeBtn');

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  document.querySelector('meta[name="theme-color"]')
    .setAttribute('content', theme === 'dark' ? '#111309' : '#3f4a33');
  store.set('verda_theme', theme);
}

(function initTheme() {
  const saved = store.get('verda_theme', null);
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  applyTheme(saved || (prefersDark ? 'dark' : 'light'));
})();

themeBtn.addEventListener('click', () => {
  const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  applyTheme(next);
});

/* ================= 5. IDIOMA ================= */
const langSwitcher = $('#langSwitcher');

/** Aplica el idioma activo a todo el documento. */
function applyLang(lang) {
  currentLang = I18N[lang] ? lang : 'es';
  store.set('verda_lang', currentLang);
  document.documentElement.lang = currentLang === 'va' ? 'ca' : currentLang;

  $$('[data-i18n]').forEach(el => {
    const value = t(el.dataset.i18n);
    if (value.includes('<')) el.innerHTML = value; else el.textContent = value;
  });
  $$('[data-i18n-placeholder]').forEach(el => { el.placeholder = t(el.dataset.i18nPlaceholder); });

  $('#langCurrent').textContent = currentLang.toUpperCase();
  $$('#langMenu button').forEach(b => b.classList.toggle('is-active', b.dataset.lang === currentLang));
  $$('.mobile-menu__langs button').forEach(b => b.classList.toggle('is-active', b.dataset.lang === currentLang));

  // Contenido dinámico dependiente del idioma
  renderProducts();
  renderCart();
  if (!$('#checkoutModal').hidden) { renderCheckoutSummary(); updateNavButtons(); }
}

$('#langToggle').addEventListener('click', () => {
  langSwitcher.classList.toggle('is-open');
  $('#langToggle').setAttribute('aria-expanded', langSwitcher.classList.contains('is-open'));
});
document.addEventListener('click', e => {
  if (!langSwitcher.contains(e.target)) langSwitcher.classList.remove('is-open');
});
$$('#langMenu button, .mobile-menu__langs button').forEach(btn => {
  btn.addEventListener('click', () => {
    applyLang(btn.dataset.lang);
    langSwitcher.classList.remove('is-open');
    closeMobileMenu();
  });
});

/* ====== 6. NAVEGACIÓN: SCROLL SUAVE, HEADER, MENÚ MÓVIL ====== */
const header = $('#header');
const burger = $('#burgerBtn');
const mobileMenu = $('#mobileMenu');
const scrim = $('#scrim');
const toTop = $('#toTop');

function showScrim() { scrim.hidden = false; requestAnimationFrame(() => scrim.classList.add('is-visible')); }
function hideScrim() { scrim.classList.remove('is-visible'); setTimeout(() => { scrim.hidden = true; }, 320); }

function openMobileMenu() {
  mobileMenu.classList.add('is-open');
  mobileMenu.setAttribute('aria-hidden', 'false');
  burger.classList.add('is-open');
  burger.setAttribute('aria-expanded', 'true');
  document.body.classList.add('no-scroll');
  showScrim();
}
function closeMobileMenu() {
  if (!mobileMenu.classList.contains('is-open')) return;
  mobileMenu.classList.remove('is-open');
  mobileMenu.setAttribute('aria-hidden', 'true');
  burger.classList.remove('is-open');
  burger.setAttribute('aria-expanded', 'false');
  if (!$('#cartPanel').classList.contains('is-open')) {
    document.body.classList.remove('no-scroll');
    hideScrim();
  }
}
burger.addEventListener('click', () => {
  mobileMenu.classList.contains('is-open') ? closeMobileMenu() : openMobileMenu();
});
scrim.addEventListener('click', () => { closeMobileMenu(); closeCart(); });

/** Desplazamiento suave con compensación de la cabecera fija. */
function scrollToSection(selector) {
  const target = document.querySelector(selector);
  if (!target) return;
  const offset = header.offsetHeight + 14;
  const y = target.getBoundingClientRect().top + window.pageYOffset - offset;
  window.scrollTo({ top: y, behavior: 'smooth' });
}

$$('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const href = link.getAttribute('href');
    if (href.length < 2) return;
    e.preventDefault();
    closeMobileMenu();
    setTimeout(() => scrollToSection(href), mobileMenu.classList.contains('is-open') ? 300 : 0);
    history.replaceState(null, '', href);
  });
});

// Estado del header y enlace activo según el scroll (optimizado con rAF)
const sections = $$('main section[id]');
const navLinks = $$('.nav__link');
let ticking = false;

function onScroll() {
  const y = window.scrollY;
  header.classList.toggle('is-scrolled', y > 12);
  toTop.classList.toggle('is-visible', y > 600);

  let activeId = sections[0] ? sections[0].id : '';
  sections.forEach(sec => {
    if (y >= sec.offsetTop - header.offsetHeight - 80) activeId = sec.id;
  });
  navLinks.forEach(a => a.classList.toggle('is-active', a.getAttribute('href') === `#${activeId}`));
  ticking = false;
}
window.addEventListener('scroll', () => {
  if (!ticking) { ticking = true; requestAnimationFrame(onScroll); }
}, { passive: true });

toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// Cierre del menú al cambiar el tamaño de pantalla
let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    if (window.innerWidth > 980) { closeMobileMenu(); langSwitcher.classList.remove('is-open'); }
  }, 150);
});

/* ================= 7. MODALES GENÉRICOS ================= */
function openModal(id) {
  const modal = document.getElementById(id);
  modal.hidden = false;
  requestAnimationFrame(() => modal.classList.add('is-open'));
  document.body.classList.add('no-scroll');
  const focusable = modal.querySelector('input, select, button:not(.modal__close)');
  if (focusable) setTimeout(() => focusable.focus(), 120);
}
function closeModal(modal) {
  modal.classList.remove('is-open');
  setTimeout(() => { modal.hidden = true; }, 320);
  if (!$('#cartPanel').classList.contains('is-open') && !mobileMenu.classList.contains('is-open')) {
    document.body.classList.remove('no-scroll');
  }
}
$$('.modal').forEach(modal => {
  modal.addEventListener('click', e => {
    if (e.target === modal || e.target.hasAttribute('data-close')) closeModal(modal);
  });
});
document.addEventListener('keydown', e => {
  if (e.key !== 'Escape') return;
  const open = $('.modal.is-open');
  if (open) closeModal(open);
  closeMobileMenu();
  closeCart();
});

/* ================= 8. BUSCADOR CON RESALTADO ================= */
const searchModal = $('#searchModal');
const searchInput = $('#searchInput');
const searchResults = $('#searchResults');

$('#searchBtn').addEventListener('click', openSearch);
$('#mobileSearchBtn').addEventListener('click', () => { closeMobileMenu(); setTimeout(openSearch, 320); });

function openSearch() {
  clearHighlights();
  openModal('searchModal');
  searchResults.innerHTML = '';
  searchInput.value = '';
}

/** Índice de secciones de la página para la búsqueda de contenido. */
function buildSectionIndex() {
  return sections.map(sec => {
    const title = sec.querySelector('h1, h2');
    const texts = $$('p, h3', sec).slice(0, 8).map(p => p.textContent).join(' ');
    return { id: sec.id, title: title ? title.textContent.trim() : sec.id, text: texts };
  });
}

const normalize = s => s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

function runSearch(term) {
  const q = normalize(term.trim());
  searchResults.innerHTML = '';
  if (q.length < 2) return;

  const foundProducts = PRODUCTS.filter(p =>
    normalize(`${p.name} ${t('mat.' + p.mat)} ${t('col.f.' + p.cat)}`).includes(q));
  const foundSections = buildSectionIndex().filter(s => normalize(`${s.title} ${s.text}`).includes(q));

  if (!foundProducts.length && !foundSections.length) {
    searchResults.innerHTML = `<p class="search-empty">${t('js.noResults')} «${term}»</p>`;
    return;
  }

  if (foundProducts.length) {
    searchResults.insertAdjacentHTML('beforeend',
      `<p class="search-hint">${t('js.products')} · ${foundProducts.length} ${t('js.results')}</p>`);
    foundProducts.slice(0, 6).forEach(p => {
      const btn = document.createElement('button');
      btn.className = 'result';
      btn.innerHTML = `<img src="${p.img}" alt="${p.name}" loading="lazy">
        <span><strong>${p.name}</strong><span>${t('mat.' + p.mat)} · ${t('col.f.' + p.cat)}</span></span>
        <span class="result__price">${money(p.price)}</span>`;
      btn.addEventListener('click', () => {
        closeModal(searchModal);
        highlightTerm(term);
        setTimeout(() => openQuickView(p.id), 360);
      });
      searchResults.appendChild(btn);
    });
  }

  if (foundSections.length) {
    searchResults.insertAdjacentHTML('beforeend',
      `<p class="search-hint">${t('js.sections')} · ${foundSections.length} ${t('js.results')}</p>`);
    foundSections.forEach(s => {
      const btn = document.createElement('button');
      btn.className = 'result';
      btn.innerHTML = `<span class="result__ico"><svg viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h10"/></svg></span>
        <span><strong>${s.title}</strong><span>${s.text.slice(0, 110)}…</span></span>`;
      btn.addEventListener('click', () => {
        closeModal(searchModal);
        highlightTerm(term);
        setTimeout(() => scrollToSection(`#${s.id}`), 380);
      });
      searchResults.appendChild(btn);
    });
  }
}

let searchTimer;
searchInput.addEventListener('input', () => {
  clearTimeout(searchTimer);
  searchTimer = setTimeout(() => runSearch(searchInput.value), 220);
});
searchInput.addEventListener('keydown', e => {
  if (e.key === 'Enter' && searchInput.value.trim().length > 1) {
    closeModal(searchModal);
    highlightTerm(searchInput.value.trim());
    const first = PRODUCTS.find(p => normalize(p.name).includes(normalize(searchInput.value.trim())));
    setTimeout(() => scrollToSection(first ? '#coleccion' : '#inicio'), 380);
  }
});

/** Elimina los resaltados anteriores. */
function clearHighlights() {
  $$('mark.search-hit').forEach(mark => {
    const parent = mark.parentNode;
    parent.replaceChild(document.createTextNode(mark.textContent), mark);
    parent.normalize();
  });
}

/** Resalta todas las coincidencias de texto dentro del contenido principal. */
function highlightTerm(term) {
  clearHighlights();
  const q = term.trim();
  if (q.length < 2) return;
  const safe = q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const rx = new RegExp(`(${safe})`, 'gi');     // para reemplazar (global)
  const test = new RegExp(safe, 'i');           // para comprobar (sin estado lastIndex)
  const walker = document.createTreeWalker(document.querySelector('main'), NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      if (!node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
      const tag = node.parentNode.nodeName;
      if (['SCRIPT', 'STYLE', 'MARK', 'SELECT', 'OPTION'].includes(tag)) return NodeFilter.FILTER_REJECT;
      return test.test(node.nodeValue) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
    }
  });
  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);
  nodes.forEach(node => {
    const span = document.createElement('span');
    span.innerHTML = node.nodeValue.replace(rx, '<mark class="search-hit">$1</mark>');
    node.parentNode.replaceChild(span, node);
  });
  if (nodes.length) toast(`${nodes.length} ${t('js.results')}`);
}

/* ================= 9. TIENDA ================= */
const grid = $('#productGrid');
let activeFilter = 'all';
let activeSort = 'featured';

function sortProducts(list) {
  const arr = [...list];
  if (activeSort === 'price-asc') arr.sort((a, b) => a.price - b.price);
  if (activeSort === 'price-desc') arr.sort((a, b) => b.price - a.price);
  if (activeSort === 'name') arr.sort((a, b) => a.name.localeCompare(b.name));
  return arr;
}

function renderProducts() {
  const list = sortProducts(PRODUCTS.filter(p => activeFilter === 'all' || p.cat === activeFilter));
  $('#productsEmpty').hidden = list.length > 0;
  grid.innerHTML = list.map((p, i) => `
    <article class="product" style="animation-delay:${Math.min(i * 40, 400)}ms">
      <div class="product__media">
        <img src="${p.img}" alt="${p.name} — ${t('mat.' + p.mat)}" loading="lazy">
        <div class="product__tags">
          ${p.badge ? `<span class="tag tag--${p.badge}">${t('tag.' + p.badge)}</span>` : ''}
        </div>
        <div class="product__quick">
          <button class="btn btn--outline" data-quick="${p.id}">${t('js.quick')}</button>
        </div>
      </div>
      <div class="product__body">
        <span class="product__cat">${t('col.f.' + p.cat)}</span>
        <h3 class="product__name">${p.name}</h3>
        <p class="product__mat">${t('mat.' + p.mat)}</p>
        <div class="product__foot">
          <span class="product__price">${p.old ? `<s>${money(p.old)}</s>` : ''}${money(p.price)}</span>
          <button class="product__add" data-add="${p.id}" aria-label="${t('js.add')}: ${p.name}">
            <svg viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>
          </button>
        </div>
      </div>
    </article>`).join('');
}

grid.addEventListener('click', e => {
  const quick = e.target.closest('[data-quick]');
  const add = e.target.closest('[data-add]');
  if (quick) openQuickView(Number(quick.dataset.quick));
  if (add) {
    const p = PRODUCTS.find(x => x.id === Number(add.dataset.add));
    addToCart(p.id, sizesOf(p)[p.cat === 'accesorios' ? 0 : 2], 1);
  }
});

$('#filters').addEventListener('click', e => {
  const chip = e.target.closest('.chip');
  if (!chip) return;
  $$('.chip').forEach(c => c.classList.remove('is-active'));
  chip.classList.add('is-active');
  activeFilter = chip.dataset.filter;
  renderProducts();
});
$('#sortSelect').addEventListener('change', e => { activeSort = e.target.value; renderProducts(); });

/* --- Vista rápida --- */
let quickState = { id: null, size: null, qty: 1 };

function openQuickView(id) {
  const p = PRODUCTS.find(x => x.id === id);
  if (!p) return;
  const sizes = sizesOf(p);
  quickState = { id, size: sizes.length === 1 ? sizes[0] : null, qty: 1 };

  $('#quickContent').innerHTML = `
    <div class="quick__img"><img src="${p.img}" alt="${p.name}"></div>
    <div>
      <span class="quick__cat">${t('col.f.' + p.cat)}</span>
      <h3 id="quickTitle">${p.name}</h3>
      <p class="quick__desc">${t('mat.' + p.mat)}. ${t('js.desc' + p.cat)}</p>
      <p class="quick__price">${p.old ? `<s>${money(p.old)}</s> ` : ''}${money(p.price)}</p>
      <span class="quick__label">${t('js.size')}</span>
      <div class="sizes" id="quickSizes">
        ${sizes.map(s => `<button class="size${quickState.size === s ? ' is-active' : ''}" data-size="${s}">${s}</button>`).join('')}
      </div>
      <span class="quick__label">${t('js.qty')}</span>
      <div class="qty"><button data-q="-1">−</button><span id="quickQty">1</span><button data-q="1">+</button></div>
      <button class="btn btn--primary btn--block" id="quickAdd">${t('js.add')}</button>
      <ul class="quick__meta">
        <li><svg viewBox="0 0 24 24"><path d="m4 12 5 5L20 6"/></svg>${t('js.freeRepair')}</li>
        <li><svg viewBox="0 0 24 24"><path d="m4 12 5 5L20 6"/></svg>${t('js.shipInfo')}</li>
        <li><svg viewBox="0 0 24 24"><path d="m4 12 5 5L20 6"/></svg>${t('js.traceInfo')}</li>
      </ul>
    </div>`;
  openModal('quickModal');
}

$('#quickContent').addEventListener('click', e => {
  const sizeBtn = e.target.closest('[data-size]');
  const qtyBtn = e.target.closest('[data-q]');
  if (sizeBtn) {
    quickState.size = sizeBtn.dataset.size;
    $$('#quickSizes .size').forEach(b => b.classList.toggle('is-active', b === sizeBtn));
  }
  if (qtyBtn) {
    quickState.qty = Math.max(1, quickState.qty + Number(qtyBtn.dataset.q));
    $('#quickQty').textContent = quickState.qty;
  }
  if (e.target.closest('#quickAdd')) {
    if (!quickState.size) { toast(t('js.pickSize')); return; }
    addToCart(quickState.id, quickState.size, quickState.qty);
    closeModal($('#quickModal'));
  }
});

/* ================= 10. CARRITO DE COMPRA ================= */
const FREE_SHIPPING_FROM = 60;
const SHIPPING_COST = 4.90;
const COD_FEE = 1.50;
const COUPONS = { ECO10: { type: 'pct', value: 10 }, VERDA5: { type: 'fix', value: 5 } };

let cart = store.get('verda_cart', []);
let coupon = store.get('verda_coupon', null);

const cartPanel = $('#cartPanel');

function saveCart() { store.set('verda_cart', cart); }

function addToCart(id, size, qty = 1) {
  const existing = cart.find(i => i.id === id && i.size === size);
  if (existing) existing.qty += qty; else cart.push({ id, size, qty });
  saveCart();
  renderCart();
  toast(t('js.added'));
  openCart();
}
function removeFromCart(index) {
  cart.splice(index, 1);
  saveCart(); renderCart(); toast(t('js.removed'));
}
function changeQty(index, delta) {
  cart[index].qty += delta;
  if (cart[index].qty <= 0) cart.splice(index, 1);
  saveCart(); renderCart();
}

/** Calcula todos los importes del pedido. */
function totals() {
  const subtotal = cart.reduce((sum, item) => {
    const p = PRODUCTS.find(x => x.id === item.id);
    return sum + (p ? p.price * item.qty : 0);
  }, 0);
  let discount = 0;
  if (coupon && COUPONS[coupon]) {
    const c = COUPONS[coupon];
    discount = c.type === 'pct' ? subtotal * c.value / 100 : Math.min(c.value, subtotal);
  }
  const base = subtotal - discount;
  const shipping = checkoutState.delivery === 'shipping' ? (base >= FREE_SHIPPING_FROM ? 0 : SHIPPING_COST) : 0;
  const fee = checkoutState.payment === 'cod' ? COD_FEE : 0;
  return { subtotal, discount, shipping, fee, total: base + shipping + fee, units: cart.reduce((n, i) => n + i.qty, 0) };
}

function renderCart() {
  const box = $('#cartItems');
  const { subtotal, discount, units } = totals();

  // Badge
  const badge = $('#cartBadge');
  badge.textContent = units;
  badge.hidden = units === 0;

  // Estado vacío
  $('#cartEmpty').hidden = cart.length > 0;
  $('#cartFoot').hidden = cart.length === 0;
  $('#freeShipWrap').hidden = cart.length === 0;

  box.innerHTML = cart.map((item, i) => {
    const p = PRODUCTS.find(x => x.id === item.id);
    if (!p) return '';
    return `<div class="cart-item">
      <img src="${p.img}" alt="${p.name}" loading="lazy">
      <div>
        <p class="cart-item__name">${p.name}</p>
        <p class="cart-item__meta">${t('js.size')}: ${item.size} · ${t('mat.' + p.mat)}</p>
        <div class="cart-item__qty">
          <button data-dec="${i}" aria-label="-">−</button><span>${item.qty}</span><button data-inc="${i}" aria-label="+">+</button>
        </div>
      </div>
      <div class="cart-item__right">
        <span class="cart-item__price">${money(p.price * item.qty)}</span>
        <button class="cart-item__remove" data-del="${i}">${t('js.delete')}</button>
      </div>
    </div>`;
  }).join('');

  $('#sumSubtotal').textContent = money(subtotal);
  $('#rowDiscount').hidden = discount === 0;
  $('#sumDiscount').textContent = `− ${money(discount)}`;
  $('#sumTotal').textContent = money(subtotal - discount);

  // Barra de envío gratuito
  const left = Math.max(0, FREE_SHIPPING_FROM - (subtotal - discount));
  $('#freeShipMsg').textContent = left > 0
    ? t('js.freeShipLeft').replace('{x}', money(left))
    : t('js.freeShipOk');
  $('#freeShipFill').style.width = `${Math.min(100, ((subtotal - discount) / FREE_SHIPPING_FROM) * 100)}%`;
}

$('#cartItems').addEventListener('click', e => {
  const dec = e.target.closest('[data-dec]'), inc = e.target.closest('[data-inc]'), del = e.target.closest('[data-del]');
  if (dec) changeQty(Number(dec.dataset.dec), -1);
  if (inc) changeQty(Number(inc.dataset.inc), 1);
  if (del) removeFromCart(Number(del.dataset.del));
});

function openCart() {
  cartPanel.classList.add('is-open');
  cartPanel.setAttribute('aria-hidden', 'false');
  document.body.classList.add('no-scroll');
  showScrim();
}
function closeCart() {
  if (!cartPanel.classList.contains('is-open')) return;
  cartPanel.classList.remove('is-open');
  cartPanel.setAttribute('aria-hidden', 'true');
  if (!mobileMenu.classList.contains('is-open')) { document.body.classList.remove('no-scroll'); hideScrim(); }
}
$('#cartBtn').addEventListener('click', openCart);
$('#cartClose').addEventListener('click', closeCart);
$('#cartEmptyCta').addEventListener('click', () => { closeCart(); setTimeout(() => scrollToSection('#coleccion'), 260); });
$('#clearCartBtn').addEventListener('click', () => { cart = []; coupon = null; saveCart(); store.set('verda_coupon', null); renderCart(); toast(t('js.cartCleared')); });

$('#couponBtn').addEventListener('click', () => {
  const code = $('#couponInput').value.trim().toUpperCase();
  if (COUPONS[code]) { coupon = code; store.set('verda_coupon', code); toast(t('js.couponOk')); }
  else { coupon = null; store.set('verda_coupon', null); toast(t('js.couponKo')); }
  $('#couponInput').value = '';
  renderCart();
});

/* ================= 11. CHECKOUT ================= */
const checkoutModal = $('#checkoutModal');
const checkoutState = { step: 1, delivery: 'pickup', payment: 'store', order: null };

$('#checkoutBtn').addEventListener('click', () => {
  if (!cart.length) { toast(t('js.emptyCart')); return; }
  closeCart();
  checkoutState.step = 1;
  checkoutState.order = null;
  prepareDates();
  goToStep(1);
  setTimeout(() => openModal('checkoutModal'), 260);
});

/** Fecha mínima de recogida = mañana. */
function prepareDates() {
  const input = $('#coDate');
  const tomorrow = new Date(Date.now() + 86400000);
  const iso = tomorrow.toISOString().split('T')[0];
  input.min = iso;
  if (!input.value) input.value = iso;
}

/* --- Selección de entrega --- */
$$('input[name="delivery"]').forEach(radio => {
  radio.addEventListener('change', () => {
    checkoutState.delivery = radio.value;
    $$('.option-grid .option').forEach(o => o.classList.toggle('is-selected', o.contains(radio) && radio.checked));
    $('#pickupFields').hidden = radio.value !== 'pickup';
    $('#shippingFields').hidden = radio.value !== 'shipping';
    syncPaymentOptions();
    renderCheckoutSummary();
  });
});

/** Habilita solo las formas de pago compatibles con la entrega elegida. */
function syncPaymentOptions() {
  const isPickup = checkoutState.delivery === 'pickup';
  const rows = { store: $('[data-pay="store"]'), cod: $('[data-pay="cod"]'), online: $('[data-pay="online"]') };
  rows.store.classList.toggle('is-disabled', !isPickup);
  rows.cod.classList.toggle('is-disabled', isPickup);

  // Si la forma activa ya no es válida, se selecciona la predeterminada
  if ((isPickup && checkoutState.payment === 'cod') || (!isPickup && checkoutState.payment === 'store')) {
    checkoutState.payment = isPickup ? 'store' : 'online';
  }
  $$('input[name="payment"]').forEach(r => { r.checked = r.value === checkoutState.payment; });
  $$('.option--row').forEach(o => o.classList.toggle('is-selected', o.dataset.pay === checkoutState.payment));
}

$$('input[name="payment"]').forEach(radio => {
  radio.addEventListener('change', () => {
    checkoutState.payment = radio.value;
    $$('.option--row').forEach(o => o.classList.toggle('is-selected', o.dataset.pay === radio.value));
    renderCheckoutSummary();
    updateNavButtons();
  });
});

/* --- Navegación por pasos --- */
function goToStep(step) {
  checkoutState.step = step;
  $$('.co-step').forEach(s => s.classList.toggle('is-active', s.dataset.panel === String(step)));
  $$('#stepper li').forEach(li => {
    const n = Number(li.dataset.step);
    li.classList.toggle('is-active', n === step);
    li.classList.toggle('is-done', typeof step === 'number' && n < step);
  });
  $('#stepper').hidden = (step === 'gateway' || step === 'done');
  $('#checkoutAside').hidden = (step === 'done');
  $('#checkoutNav').hidden = (step === 'gateway' || step === 'done');
  if (step === 3) buildReviewBlock();
  renderCheckoutSummary();
  updateNavButtons();
}

function updateNavButtons() {
  const back = $('#coBack'), next = $('#coNext');
  back.hidden = checkoutState.step === 1;
  back.textContent = t('co.back');
  if (checkoutState.step === 3) {
    next.textContent = checkoutState.payment === 'online' ? t('js.goGateway')
      : checkoutState.payment === 'store' ? t('js.confirmReserve') : t('js.confirmOrder');
  } else {
    next.textContent = t('co.next');
  }
}

$('#coBack').addEventListener('click', () => { if (checkoutState.step > 1) goToStep(checkoutState.step - 1); });
$('#coNext').addEventListener('click', () => {
  if (checkoutState.step === 1) {
    if (!validateDelivery()) return;
    syncPaymentOptions();
    goToStep(2);
  } else if (checkoutState.step === 2) {
    goToStep(3);
  } else if (checkoutState.step === 3) {
    checkoutState.order = `VRD-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    if (checkoutState.payment === 'online') {
      $('#gatewayAmount').textContent = money(totals().total);
      $('#gatewayOrder').textContent = checkoutState.order;
      goToStep('gateway');
    } else {
      finishOrder(false);
    }
  }
});

$('#gatewayPay').addEventListener('click', () => finishOrder(true));

/** Valida los datos obligatorios de entrega. */
function validateDelivery() {
  const err = $('#step1Error');
  err.hidden = true;
  const need = checkoutState.delivery === 'pickup'
    ? ['#coPickName', '#coPickPhone', '#coDate']
    : ['#coName', '#coPhone', '#coAddress', '#coCity', '#coZip'];
  const missing = need.filter(sel => !$(sel).value.trim());
  if (missing.length) {
    err.textContent = t('js.fill');
    err.hidden = false;
    $(missing[0]).focus();
    return false;
  }
  if (checkoutState.delivery === 'shipping' && !/^\d{5}$/.test($('#coZip').value.trim())) {
    err.textContent = t('js.zip'); err.hidden = false; $('#coZip').focus();
    return false;
  }
  return true;
}

/** Resumen lateral del pedido (mini carrito + importes). */
function renderCheckoutSummary() {
  const { subtotal, discount, shipping, fee, total } = totals();
  $('#miniCart').innerHTML = cart.map(item => {
    const p = PRODUCTS.find(x => x.id === item.id);
    return p ? `<li><img src="${p.img}" alt="${p.name}">
      <span><strong>${p.name}</strong><span>${t('js.size')} ${item.size} · ${item.qty} ${t('js.units')}</span></span>
      <b>${money(p.price * item.qty)}</b></li>` : '';
  }).join('');
  $('#coSubtotal').textContent = money(subtotal);
  $('#coRowDiscount').hidden = discount === 0;
  $('#coDiscount').textContent = `− ${money(discount)}`;
  $('#coShipping').textContent = shipping === 0 ? t('co.free') : money(shipping);
  $('#coRowFee').hidden = fee === 0;
  $('#coFee').textContent = money(fee);
  $('#coTotal').textContent = money(total);
}

/** Bloque de revisión del paso 3. */
function buildReviewBlock() {
  const isPickup = checkoutState.delivery === 'pickup';
  const payLabels = { store: t('co.pay1T'), cod: t('co.pay2T'), online: t('co.pay3T') };
  const deliveryText = isPickup
    ? `${$('#coStore').value}<br>${$('#coDate').value} · ${$('#coTime').value}`
    : `${$('#coAddress').value}, ${$('#coZip').value} ${$('#coCity').value}`;
  const contactText = isPickup
    ? `${$('#coPickName').value} · ${$('#coPickPhone').value}`
    : `${$('#coName').value} · ${$('#coPhone').value}`;

  $('#reviewBlock').innerHTML = `
    <div class="rb"><h4>${t('js.delivery')}</h4><p>${isPickup ? t('co.pickT') : t('co.shipT')}<br>${deliveryText}</p>
      <button class="rb__edit" data-goto="1">${t('js.edit')}</button></div>
    <div class="rb"><h4>${t('js.contact')}</h4><p>${contactText}</p>
      <button class="rb__edit" data-goto="1">${t('js.edit')}</button></div>
    <div class="rb"><h4>${t('js.payment')}</h4><p>${payLabels[checkoutState.payment]}</p>
      <button class="rb__edit" data-goto="2">${t('js.edit')}</button></div>`;
}
$('#reviewBlock').addEventListener('click', e => {
  const btn = e.target.closest('[data-goto]');
  if (btn) goToStep(Number(btn.dataset.goto));
});

/** Finaliza el pedido y muestra la pantalla de confirmación. */
function finishOrder(paid) {
  const { total } = totals();
  let text;
  if (paid) text = t('js.donePaid');
  else if (checkoutState.payment === 'store') {
    text = t('js.doneStore')
      .replace('{store}', $('#coStore').value)
      .replace('{date}', $('#coDate').value)
      .replace('{time}', $('#coTime').value);
  } else {
    text = t('js.doneCod')
      .replace('{total}', money(total))
      .replace('{address}', `${$('#coAddress').value}, ${$('#coCity').value}`);
  }
  $('#doneText').textContent = text;
  $('#doneOrder').textContent = checkoutState.order;
  goToStep('done');

  // Vaciamos la cesta una vez confirmado el pedido
  cart = []; coupon = null;
  saveCart(); store.set('verda_coupon', null);
  renderCart();
}

/* ================= 12. FORMULARIOS ================= */
/** Validación sencilla y reutilizable de un campo. */
function setFieldError(input, message) {
  const field = input.closest('.field');
  if (!field) return;
  field.classList.toggle('has-error', Boolean(message));
  const small = field.querySelector('.field__error');
  if (small) small.textContent = message || '';
}

$('#contactForm').addEventListener('submit', e => {
  e.preventDefault();
  const name = $('#cfName'), email = $('#cfEmail'), msg = $('#cfMessage'), consent = $('#cfConsent');
  const out = $('#contactMsg');
  let ok = true;

  if (name.value.trim().length < 2) { setFieldError(name, t('js.short').replace('{x}', 2)); ok = false; } else setFieldError(name, '');
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.value.trim())) { setFieldError(email, t('js.badEmail')); ok = false; } else setFieldError(email, '');
  if (msg.value.trim().length < 10) { setFieldError(msg, t('js.short').replace('{x}', 10)); ok = false; } else setFieldError(msg, '');

  if (!consent.checked) { out.textContent = t('js.consent'); out.className = 'form-msg ko'; return; }
  if (!ok) { out.textContent = t('js.required'); out.className = 'form-msg ko'; return; }

  out.textContent = t('js.sent');
  out.className = 'form-msg ok';
  e.target.reset();
  toast(t('js.sent'));
});

$('#newsletterForm').addEventListener('submit', e => {
  e.preventDefault();
  const email = $('#newsEmail');
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.value.trim())) { toast(t('js.badEmail')); return; }
  email.value = '';
  toast(t('js.newsOk'));
});

// Login / registro (estructura lista para conectar con backend)
$('#userBtn').addEventListener('click', () => openModal('loginModal'));
$$('.tab').forEach(tab => {
  tab.addEventListener('click', () => {
    $$('.tab').forEach(x => x.classList.toggle('is-active', x === tab));
    $$('[data-panel="login"], [data-panel="register"]').forEach(panel => {
      if (panel.classList.contains('auth-form')) panel.hidden = panel.dataset.panel !== tab.dataset.tab;
    });
  });
});
['#loginForm', '#registerForm'].forEach(sel => {
  $(sel).addEventListener('submit', e => { e.preventDefault(); toast(t('js.loginDemo')); });
});

/* ================= 13. COOKIES Y MODAL LEGAL ================= */
const cookieBanner = $('#cookieBanner');
if (!store.get('verda_cookies', null)) setTimeout(() => { cookieBanner.hidden = false; }, 1400);
$('#cookieAccept').addEventListener('click', () => { store.set('verda_cookies', 'all'); cookieBanner.hidden = true; });
$('#cookieReject').addEventListener('click', () => { store.set('verda_cookies', 'essential'); cookieBanner.hidden = true; });

/* Textos informativos. Se redactan en español; EN/VA recurren a este contenido
   hasta que el cliente facilite sus versiones legales traducidas. */
const LEGAL = {
  cookies: ['Política de cookies', `<p>Utilizamos tres tipos de cookies:</p>
    <ul><li><strong>Necesarias:</strong> guardan tu cesta, el idioma y el modo claro/oscuro. No se pueden desactivar.</li>
    <li><strong>Analíticas:</strong> medición anónima de visitas para mejorar el catálogo.</li>
    <li><strong>Preferencias:</strong> recuerdan filtros y tallas elegidas.</li></ul>
    <p>Puedes revocar tu consentimiento en cualquier momento borrando los datos del navegador.</p>`],
  requirements: ['Requisitos', `<h4>Requisitos técnicos</h4>
    <ul><li>Navegador actualizado (Chrome, Firefox, Safari o Edge, últimas 2 versiones).</li>
    <li>JavaScript y almacenamiento local activados para el carrito y el idioma.</li>
    <li>Conexión estable para cargar imágenes y vídeo del catálogo.</li></ul>
    <h4>Requisitos de compra</h4>
    <ul><li>Ser mayor de 18 años o contar con autorización.</li>
    <li>Facilitar datos de contacto reales para la recogida o el envío.</li>
    <li>Recoger el pedido reservado en un plazo máximo de 72 horas.</li></ul>`],
  privacy: ['Privacidad', `<p>Tus datos se tratan para gestionar pedidos, reservas y consultas. No se ceden a terceros salvo a la empresa de reparto.</p>
    <ul><li>Responsable: VERDA Slow Fashion S.L.</li><li>Conservación: 5 años (obligación fiscal).</li>
    <li>Derechos: acceso, rectificación, supresión y portabilidad en hola@verda.eco.</li></ul>`],
  terms: ['Términos de compra', `<ul><li>Precios en euros con IVA incluido.</li>
    <li>Formas de pago: en tienda al recoger, contra reembolso (+1,50 €) o pasarela segura.</li>
    <li>La reserva se mantiene 72 h; después las prendas vuelven al stock.</li>
    <li>Factura disponible bajo petición en cualquier pedido.</li></ul>`],
  shipping: ['Envíos y recogidas', `<ul><li><strong>Recogida en el mercado:</strong> gratuita, lista en 24 h en la parada 12 del Mercat de Colón.</li>
    <li><strong>Envío a península:</strong> 4,90 € y gratis a partir de 60 €. Entrega en 24-72 h.</li>
    <li><strong>València ciudad:</strong> reparto en bicicleta, sin emisiones.</li>
    <li><strong>Baleares, Canarias y UE:</strong> consulta tarifa escribiendo a hola@verda.eco.</li></ul>`],
  returns: ['Cambios y devoluciones', `<ul><li>30 días naturales para cambiar o devolver con la etiqueta puesta.</li>
    <li>Cambios de talla gratuitos en tienda.</li>
    <li>Devolución del importe en un máximo de 7 días por el mismo medio de pago.</li>
    <li>Arreglos gratuitos durante 3 años desde la compra.</li></ul>`],
  care: ['Cuidado de tejidos', `<ul><li>Lavar a 30 °C con detergente neutro y programa corto.</li>
    <li>Secar a la sombra; evitar la secadora para alargar la vida de la fibra.</li>
    <li>Planchar el lino aún húmedo y la lana con vapor y paño.</li>
    <li>Lavar menos y airear más: reduce hasta un 40 % la huella de la prenda.</li></ul>`],
  sizes: ['Guía de tallas', `<ul><li>XS (34-36) · S (36-38) · M (38-40) · L (42-44) · XL (46-48).</li>
    <li>Nuestros patrones son holgados: si dudas entre dos tallas, elige la menor.</li>
    <li>Accesorios en talla única.</li>
    <li>¿Necesitas ayuda? Escríbenos y te medimos la prenda antes de enviarla.</li></ul>`]
};

document.addEventListener('click', e => {
  const btn = e.target.closest('[data-legal]');
  if (!btn) return;
  const [title, body] = LEGAL[btn.dataset.legal] || ['—', ''];
  $('#legalTitle').textContent = title;
  $('#legalBody').innerHTML = body;
  openModal('legalModal');
});

/* ========= 14. ANIMACIONES DE APARICIÓN Y CONTADORES ========= */
const revealObserver = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('is-visible');
    obs.unobserve(entry.target);
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px' });
$$('.reveal').forEach(el => revealObserver.observe(el));

/** Animación numérica de las métricas de impacto. */
const counterObserver = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = Number(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    const duration = 1400;
    const start = performance.now();
    const tick = now => {
      const progress = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(target * eased).toLocaleString(LOCALES[currentLang]) + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
    obs.unobserve(el);
  });
}, { threshold: 0.5 });
$$('[data-count]').forEach(el => counterObserver.observe(el));

/* ================= ARRANQUE ================= */
$('#year').textContent = new Date().getFullYear();
applyLang(currentLang);
syncPaymentOptions();
renderCart();
onScroll();
