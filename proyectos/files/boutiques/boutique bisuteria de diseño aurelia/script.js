/* =========================================================
   AURELIA Maison · script.js
   JavaScript puro, sin dependencias externas.
   Módulos: tema, idioma, menú móvil, navegación, búsqueda,
   tienda (20 productos), carrito y checkout.
   ========================================================= */
(function () {
  'use strict';

  /* ---------------------------------------------------------
     0. Utilidades y estado global
  --------------------------------------------------------- */
  const $  = (sel, ctx) => (ctx || document).querySelector(sel);
  const $$ = (sel, ctx) => Array.prototype.slice.call((ctx || document).querySelectorAll(sel));
  const STORE = {
    theme:   'aurelia_theme',
    lang:    'aurelia_lang',
    cart:    'aurelia_cart',
    cookies: 'aurelia_cookies'
  };

  const state = {
    lang: 'es',
    theme: 'light',
    cart: [],              // [{id, variant, qty}]
    filter: 'all',
    sort: 'featured',
    gift: false,
    delivery: 'pickup',    // pickup | ship
    payment: 'pickup',     // pickup | cod | gateway
    checkoutStep: 1,
    lastOrder: null,
    legalOpen: null
  };

  const money = n => (Math.round(n * 100) / 100).toFixed(2).replace('.', ',') + ' €';

  /* ---------------------------------------------------------
     1. Catálogo de productos (20 referencias)
  --------------------------------------------------------- */
  const PRODUCTS = [
    { id: 'aurum-lacrima', cat: 'collares', price: 189, img: 'https://images.pexels.com/photos/7407595/pexels-photo-7407595.png?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940', badge: 'new', variants: ['45 cm', '50 cm'],
      name: { es: 'Collar Aurum Lácrima', en: 'Aurum Teardrop Necklace', va: 'Collaret Aurum Llàgrima' },
      desc: { es: 'Colgante en forma de gota con circonitas talladas y cadena bañada en oro de 18k.', en: 'Teardrop pendant with cut zirconias on an 18k gold-plated chain.', va: 'Penjoll en forma de gota amb circonites tallades i cadena banyada en or de 18k.' },
      mat:  { es: 'Latón macizo · Baño de oro 18k', en: 'Solid brass · 18k gold plating', va: 'Llató macís · Bany d\u2019or 18k' } },

    { id: 'noir-velours', cat: 'collares', price: 156, img: 'https://images.pexels.com/photos/7407597/pexels-photo-7407597.png?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940', variants: ['45 cm', '50 cm'],
      name: { es: 'Collar Noir Velours', en: 'Noir Velvet Necklace', va: 'Collaret Noir Velours' },
      desc: { es: 'Gema central engastada a mano sobre terciopelo oscuro. Pieza de noche.', en: 'Hand-set central gem on dark velvet. An evening piece.', va: 'Gema central encastada a mà sobre vellut fosc. Peça de nit.' },
      mat:  { es: 'Plata 925 · Gemas sintéticas', en: '925 silver · Synthetic gems', va: 'Plata 925 · Gemes sintètiques' } },

    { id: 'perla-etoile', cat: 'collares', price: 142, img: 'https://images.pexels.com/photos/28985983/pexels-photo-28985983.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940', variants: ['40 cm', '45 cm'],
      name: { es: 'Collar Perla Étoile', en: 'Perle Étoile Necklace', va: 'Collaret Perla Étoile' },
      desc: { es: 'Colgantes de perla de agua dulce sobre eslabón fino dorado.', en: 'Freshwater pearl drops on a fine gold link chain.', va: 'Penjolls de perla d\u2019aigua dolça sobre cadena fina daurada.' },
      mat:  { es: 'Perlas cultivadas · Oro 18k', en: 'Cultured pearls · 18k gold', va: 'Perles conreades · Or 18k' } },

    { id: 'selene-esmeralda', cat: 'collares', price: 174, img: 'https://images.pexels.com/photos/21235148/pexels-photo-21235148.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940', badge: 'limited', variants: ['45 cm', '55 cm'],
      name: { es: 'Collar Selene Esmeralda', en: 'Selene Emerald Necklace', va: 'Collaret Selene Maragda' },
      desc: { es: 'Esmeralda verde sobre cadena de plata mate. Serie limitada de 30 unidades.', en: 'Green emerald on a matte silver chain. Limited series of 30.', va: 'Maragda verda sobre cadena de plata mat. Sèrie limitada de 30 unitats.' },
      mat:  { es: 'Plata 925 mate · Esmeralda', en: 'Matte 925 silver · Emerald', va: 'Plata 925 mat · Maragda' } },

    { id: 'jade-imperial', cat: 'pendientes', price: 98, img: 'https://images.pexels.com/photos/21235147/pexels-photo-21235147.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      name: { es: 'Pendientes Jade Imperial', en: 'Jade Imperial Earrings', va: 'Arracades Jade Imperial' },
      desc: { es: 'Aros con detalle de circonitas sobre base verde profundo.', en: 'Hoops with zirconia detailing on a deep green base.', va: 'Cèrcols amb detall de circonites sobre base verda profunda.' },
      mat:  { es: 'Latón dorado · Circonitas', en: 'Gold brass · Zirconias', va: 'Llató daurat · Circonites' } },

    { id: 'camee-perla', cat: 'pendientes', price: 76, img: 'https://images.pexels.com/photos/33370247/pexels-photo-33370247.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940', badge: 'new',
      name: { es: 'Pendientes Camée Perla', en: 'Camée Pearl Earrings', va: 'Arracades Camée Perla' },
      desc: { es: 'Perla barroca montada sobre disco dorado pulido a mano.', en: 'Baroque pearl set on a hand-polished gold disc.', va: 'Perla barroca muntada sobre disc daurat polit a mà.' },
      mat:  { es: 'Perla barroca · Oro 18k', en: 'Baroque pearl · 18k gold', va: 'Perla barroca · Or 18k' } },

    { id: 'aro-aura', cat: 'pendientes', price: 64, img: 'https://images.pexels.com/photos/29502436/pexels-photo-29502436.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      name: { es: 'Pendientes Aro Aura', en: 'Aura Hoop Earrings', va: 'Arracades Cèrcol Aura' },
      desc: { es: 'Aro ligero de uso diario con cierre de presión invisible.', en: 'Light everyday hoop with invisible click closure.', va: 'Cèrcol lleuger d\u2019ús diari amb tancament invisible.' },
      mat:  { es: 'Baño de oro 18k · Níquel libre', en: '18k gold plated · Nickel free', va: 'Bany d\u2019or 18k · Sense níquel' } },

    { id: 'duo-lumiere', cat: 'pendientes', price: 128, img: 'https://images.pexels.com/photos/8891955/pexels-photo-8891955.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      name: { es: 'Dúo Lumière', en: 'Lumière Duo', va: 'Duo Lumière' },
      desc: { es: 'Pendiente y colgante coordinados para un regalo completo.', en: 'Coordinated earrings and pendant, a complete gift.', va: 'Arracades i penjoll coordinats per a un regal complet.' },
      mat:  { es: 'Plata 925 · Circonitas', en: '925 silver · Zirconias', va: 'Plata 925 · Circonites' } },

    { id: 'atlas-turquesa', cat: 'anillos', price: 92, img: 'https://images.pexels.com/photos/37586699/pexels-photo-37586699.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940', variants: ['Talla 12', 'Talla 14', 'Talla 16'],
      name: { es: 'Anillo Atlas Turquesa', en: 'Atlas Turquoise Ring', va: 'Anell Atlas Turquesa' },
      desc: { es: 'Piedra turquesa natural con filigrana de plata y bronce.', en: 'Natural turquoise stone with silver and bronze filigree.', va: 'Pedra turquesa natural amb filigrana de plata i bronze.' },
      mat:  { es: 'Turquesa · Plata y bronce', en: 'Turquoise · Silver and bronze', va: 'Turquesa · Plata i bronze' } },

    { id: 'saphir-bleu', cat: 'anillos', price: 118, img: 'https://images.pexels.com/photos/32423413/pexels-photo-32423413.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940', badge: 'new', variants: ['Talla 12', 'Talla 14', 'Talla 16', 'Talla 18'],
      name: { es: 'Anillo Saphir Bleu', en: 'Saphir Bleu Ring', va: 'Anell Saphir Bleu' },
      desc: { es: 'Zafiro azul talla brillante sobre aro de plata pulida.', en: 'Brilliant-cut blue sapphire on a polished silver band.', va: 'Zafir blau talla brillant sobre aro de plata polida.' },
      mat:  { es: 'Plata 925 · Zafiro', en: '925 silver · Sapphire', va: 'Plata 925 · Zafir' } },

    { id: 'rose-diamant', cat: 'anillos', price: 136, img: 'https://images.pexels.com/photos/8891957/pexels-photo-8891957.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940', variants: ['Talla 12', 'Talla 14', 'Talla 16'],
      name: { es: 'Anillo Rose Diamant', en: 'Rose Diamant Ring', va: 'Anell Rose Diamant' },
      desc: { es: 'Mezcla de oro rosa y plata con pavé de circonitas.', en: 'Rose gold and silver mix with zirconia pavé.', va: 'Mescla d\u2019or rosat i plata amb pavé de circonites.' },
      mat:  { es: 'Oro rosa · Plata 925', en: 'Rose gold · 925 silver', va: 'Or rosat · Plata 925' } },

    { id: 'onyx-noir', cat: 'anillos', price: 105, old: 139, img: 'https://images.pexels.com/photos/3266703/pexels-photo-3266703.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940', badge: 'sale', variants: ['Talla 14', 'Talla 16', 'Talla 18'],
      name: { es: 'Anillo Onyx Noir', en: 'Onyx Noir Ring', va: 'Anell Onyx Noir' },
      desc: { es: 'Onyx negro facetado con detalle de circonitas en el aro.', en: 'Faceted black onyx with zirconia detail on the band.', va: 'Onyx negre facetat amb detall de circonites a l\u2019aro.' },
      mat:  { es: 'Plata 925 · Onyx', en: '925 silver · Onyx', va: 'Plata 925 · Onyx' } },

    { id: 'riviere-cristal', cat: 'pulseras', price: 210, img: 'https://images.pexels.com/photos/8306528/pexels-photo-8306528.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      name: { es: 'Pulsera Rivière Cristal', en: 'Rivière Crystal Bracelet', va: 'Braçalet Rivière Cristall' },
      desc: { es: 'Hilo de circonitas continuo con cierre de seguridad doble.', en: 'Continuous zirconia line with double safety clasp.', va: 'Fil de circonites continu amb tancament de seguretat doble.' },
      mat:  { es: 'Plata 925 · Circonitas', en: '925 silver · Zirconias', va: 'Plata 925 · Circonites' } },

    { id: 'rosee-doree', cat: 'pulseras', price: 89, img: 'https://images.pexels.com/photos/6716441/pexels-photo-6716441.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940', variants: ['16 cm', '18 cm'],
      name: { es: 'Pulsera Rosée Dorée', en: 'Rosée Dorée Bracelet', va: 'Braçalet Rosée Dorée' },
      desc: { es: 'Cadena fina en oro rosa y plata con eslabón ajustable.', en: 'Fine rose gold and silver chain with adjustable link.', va: 'Cadena fina en or rosat i plata amb esllavó ajustable.' },
      mat:  { es: 'Oro rosa · Plata 925', en: 'Rose gold · 925 silver', va: 'Or rosat · Plata 925' } },

    { id: 'argent-ciel', cat: 'pulseras', price: 96, img: 'https://images.pexels.com/photos/8891956/pexels-photo-8891956.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940', variants: ['17 cm', '19 cm'],
      name: { es: 'Pulsera Argent Ciel', en: 'Argent Ciel Bracelet', va: 'Braçalet Argent Ciel' },
      desc: { es: 'Plata brillante con destellos de circonita engastada.', en: 'Bright silver with set zirconia sparkle.', va: 'Plata brillant amb espurnes de circonita encastada.' },
      mat:  { es: 'Plata 925 · Circonitas', en: '925 silver · Zirconias', va: 'Plata 925 · Circonites' } },

    { id: 'cascade-etoile', cat: 'pulseras', price: 178, old: 219, img: 'https://images.pexels.com/photos/12026053/pexels-photo-12026053.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940', badge: 'sale',
      name: { es: 'Pulsera Cascade Étoile', en: 'Cascade Étoile Bracelet', va: 'Braçalet Cascade Étoile' },
      desc: { es: 'Cascada de cristales tallados sobre base de madera noble.', en: 'Cascade of cut crystals on a fine wood base.', va: 'Cascada de cristalls tallats sobre base de fusta noble.' },
      mat:  { es: 'Cristal · Plata dorada', en: 'Crystal · Gilded silver', va: 'Cristall · Plata daurada' } },

    { id: 'aurora-silver', cat: 'relojes', price: 245, img: 'https://images.pexels.com/photos/9261531/pexels-photo-9261531.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940', variants: ['Acero', 'Piel'],
      name: { es: 'Reloj Aurora Silver', en: 'Aurora Silver Watch', va: 'Rellotge Aurora Silver' },
      desc: { es: 'Caja de acero pulido, esfera nácar y movimiento de cuarzo japonés.', en: 'Polished steel case, nacre dial and Japanese quartz movement.', va: 'Caixa d\u2019acer polit, esfera de nacre i moviment de quars japonés.' },
      mat:  { es: 'Acero inoxidable · Nácar', en: 'Stainless steel · Nacre', va: 'Acer inoxidable · Nacre' } },

    { id: 'eclipse-noir', cat: 'relojes', price: 289, img: 'https://images.pexels.com/photos/16958879/pexels-photo-16958879.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940', badge: 'limited', variants: ['Acero', 'Piel'],
      name: { es: 'Reloj Eclipse Noir', en: 'Eclipse Noir Watch', va: 'Rellotge Eclipse Noir' },
      desc: { es: 'Diseño de esfera abierta con índices de circonita y correa de piel.', en: 'Open dial design with zirconia indexes and leather strap.', va: 'Disseny d\u2019esfera oberta amb índexs de circonita i corretja de pell.' },
      mat:  { es: 'Acero · Piel italiana', en: 'Steel · Italian leather', va: 'Acer · Pell italiana' } },

    { id: 'ginkgo-dore', cat: 'conjuntos', price: 168, img: 'https://images.pexels.com/photos/29503018/pexels-photo-29503018.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      name: { es: 'Conjunto Ginkgo Doré', en: 'Ginkgo Doré Set', va: 'Conjunt Ginkgo Doré' },
      desc: { es: 'Collar, pulsera y pendientes con motivo hoja de ginkgo.', en: 'Necklace, bracelet and earrings with a ginkgo leaf motif.', va: 'Collaret, braçalet i arracades amb motiu de fulla de ginkgo.' },
      mat:  { es: 'Latón dorado · Oro 18k', en: 'Gold brass · 18k gold', va: 'Llató daurat · Or 18k' } },

    { id: 'papillon-suite', cat: 'conjuntos', price: 154, img: 'https://images.pexels.com/photos/29502496/pexels-photo-29502496.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940', badge: 'new',
      name: { es: 'Conjunto Papillon', en: 'Papillon Set', va: 'Conjunt Papallona' },
      desc: { es: 'Mariposas y espirales doradas en tres piezas coordinadas.', en: 'Golden butterflies and spirals in three coordinated pieces.', va: 'Papallones i espirals daurades en tres peces coordinades.' },
      mat:  { es: 'Latón dorado · Circonitas', en: 'Gold brass · Zirconias', va: 'Llató daurat · Circonites' } }
  ];

  /* ---------------------------------------------------------
     2. Diccionario de idiomas (ES / EN / VAL)
  --------------------------------------------------------- */
  const I18N = {
    es: {
      'top.phone': '+34 960 46 21 30', 'top.email': 'hola@aurelia-maison.es',
      'top.ship': 'Envío gratis a partir de 250 € · Recogida en boutique en 2 h',
      'nav.home': 'Inicio', 'nav.collections': 'Colecciones', 'nav.craft': 'Artesanía',
      'nav.shop': 'Tienda', 'nav.lookbook': 'Lookbook', 'nav.services': 'Servicios', 'nav.contact': 'Contacto',
      'btn.search': 'Buscar', 'btn.account': 'Acceder a mi cuenta', 'btn.theme': 'Cambiar modo claro u oscuro',
      'btn.cart': 'Abrir carrito de compra', 'btn.menu': 'Abrir menú', 'btn.close': 'Cerrar',
      'md.search.t': 'Buscar en la página', 'md.search.ph': 'Buscar collares, perlas, regalo...',
      'md.search.hint': 'Escribe al menos dos letras para buscar entre nuestras piezas y secciones.',
      'lang.label': 'Idioma',
      'hero.eyebrow': 'Colección Otoño · Invierno 2026', 'hero.title': 'Bisutería de diseño',
      'hero.title2': 'para momentos inolvidables',
      'hero.text': 'Piezas únicas trabajadas a mano en nuestro taller de Valencia con baños de oro de 18 quilates, perlas de agua dulce y gemas seleccionadas.',
      'hero.cta1': 'Ver la colección', 'hero.cta2': 'Nuestro taller',
      'hero.s1': 'Años de oficio', 'hero.s2': 'Piezas al año', 'hero.s3': 'Valoración clientas', 'hero.s4': 'Garantía',
      'hero.scroll': 'Descubrir',
      'mq.1': 'Hecho a mano en Valencia', 'mq.2': 'Baño de oro 18k', 'mq.3': 'Níquel libre · Hipoalergénico',
      'mq.4': 'Envoltorio de regalo incluido', 'mq.5': 'Compra online · Recogida en boutique',
      'col.eyebrow': 'Tres universos', 'col.title': 'Colecciones de autor',
      'col.text': 'Cada colección nace de un estudio de materiales y proporciones. Piezas pensadas para combinarse entre sí y acompañarte durante años.',
      'col.link': 'Ver piezas',
      'col.1.title': 'Esencia Minimal', 'col.1.text': 'Líneas limpias y geometría discreta en oro pulido. La bisutería de cada día.',
      'col.2.title': 'Perla Atlántica', 'col.2.text': 'Perlas de agua dulce y tonos nácar inspirados en la luz del Mediterráneo.',
      'col.3.title': 'Noir Soirée', 'col.3.text': 'Piezas de declaración: onyx, circonitas talladas y cadenas en relieve.',
      'col.1.alt': 'Retrato con pendientes dorados de la colección Esencia Minimal',
      'col.2.alt': 'Detalle de collar de perlas de la colección Perla Atlántica',
      'col.3.alt': 'Retrato editorial con joyería dorada de la colección Noir Soirée',
      'craft.eyebrow': 'El taller', 'craft.title': 'Veinticinco años de oficio joyero',
      'craft.text': 'Trabajamos con talleres locales de Valencia y pequeñas fundiciones familiares. Cada pieza pasa por catorce fases: del dibujo técnico al pulido final.',
      'craft.f1': 'Diseño propio', 'craft.f1t': 'Series cortas de 20 a 40 unidades por referencia.',
      'craft.f2': 'Materiales nobles', 'craft.f2t': 'Latón macizo, baño de oro 18k, plata 925 y perlas cultivadas.',
      'craft.f3': 'Acabado a mano', 'craft.f3t': 'Pulido, engaste y cierre revisados pieza por pieza.',
      'craft.f4': 'Reparación y brillo', 'craft.f4t': 'Servicio gratuito de limpieza y ajuste durante el primer año.',
      'craft.cta': 'Explorar la tienda', 'craft.img': 'Expositor con piezas de bisutería dorada en la boutique',
      'craft.caption': 'Taller-boutique del barrio del Carmen, Valencia.',
      'shop.eyebrow': 'Boutique online', 'shop.title': 'Nuestras piezas',
      'shop.text': 'Veinte referencias disponibles para envío a domicilio o recogida en boutique. Elige cómo recibirla y cuándo pagarla.',
      'shop.filter.all': 'Todo', 'shop.filter.collares': 'Collares', 'shop.filter.pendientes': 'Pendientes',
      'shop.filter.anillos': 'Anillos', 'shop.filter.pulseras': 'Pulseras', 'shop.filter.relojes': 'Relojes',
      'shop.filter.conjuntos': 'Conjuntos',
      'shop.sort.label': 'Ordenar', 'shop.sort.featured': 'Destacados', 'shop.sort.asc': 'Precio: menor a mayor',
      'shop.sort.desc': 'Precio: mayor a menor', 'shop.sort.name': 'Nombre A-Z',
      'shop.empty': 'No hay piezas en esta categoría.',
      'shop.note': '¿Buscas una pieza a medida o un regalo de empresa? Escríbenos desde el formulario y prepararemos un presupuesto en 24 h.',
      'shop.add': 'Añadir a la cesta', 'shop.quick': 'Vista rápida', 'shop.count': 'piezas',
      'shop.badge.new': 'Novedad', 'shop.badge.sale': 'Oferta', 'shop.badge.limited': 'Edición limitada',
      'look.eyebrow': 'Lookbook', 'look.title': 'Cómo llevarlas',
      'look.text': 'Combinaciones reales fotografiadas para nuestras clientas: del look de oficina a la cena de gala.',
      'look.1': 'Aro Aura + collar Esencia', 'look.2': 'Conjunto Perla Atlántica', 'look.3': 'Pendiente Noir Soirée',
      'look.quote': '“Una buena pieza de bisutería no grita: acompaña.”', 'look.author': 'Clara Aurelia · Directora creativa',
      'look.1.alt': 'Perfil con pendientes de aro dorado', 'look.2.alt': 'Retrato con conjunto de perlas', 'look.3.alt': 'Primer plano con pendientes dorados',
      'svc.1': 'Envío 24-48 h', 'svc.1t': 'Península y Baleares. Gratuito desde 250 €.',
      'svc.2': 'Recogida en boutique', 'svc.2t': 'Reserva online y recoge en 2 h en Valencia.',
      'svc.3': 'Envoltorio de regalo', 'svc.3t': 'Estuche rígido, lazo de seda y tarjeta manuscrita.',
      'svc.4': 'Cambio y devolución', 'svc.4t': '30 días para cambiar la talla o devolver la pieza.',
      'ct.eyebrow': 'Contacto', 'ct.title': 'Hablemos de tu pieza',
      'ct.text': 'Respondemos en menos de 24 horas laborables. También puedes visitarnos con cita previa para una asesoría privada.',
      'ct.i1': 'Boutique', 'ct.i2': 'Horario', 'ct.i2t': 'Lun - Vie · 10:00 - 14:00 / 17:00 - 20:30<br>Sáb · 10:30 - 14:00',
      'ct.i3': 'Teléfono', 'ct.i4': 'Email', 'ct.form.title': 'Formulario de contacto',
      'ct.f.name': 'Nombre completo', 'ct.f.email': 'Email', 'ct.f.phone': 'Teléfono', 'ct.f.subject': 'Asunto',
      'ct.f.s1': 'Asesoría personal', 'ct.f.s2': 'Pieza a medida', 'ct.f.s3': 'Estado de mi pedido', 'ct.f.s4': 'Prensa y colaboraciones',
      'ct.f.msg': 'Mensaje', 'ct.f.priv': 'He leído y acepto la política de privacidad.', 'ct.f.send': 'Enviar mensaje',
      'ct.ok': 'Gracias. Hemos recibido tu mensaje y te contestaremos en menos de 24 h.',
      'ct.err': 'Revisa los campos marcados antes de enviar.',
      'ft.about': 'Bisutería de diseño y complementos de lujo elaborados a mano en Valencia desde 1998.',
      'ft.help.t': 'Ayuda', 'ft.help.1': 'Envíos y entregas', 'ft.help.2': 'Cambios y devoluciones',
      'ft.help.3': 'Cuidado de las piezas', 'ft.help.4': 'Guía de tallas',
      'ft.legal.t': 'Legal', 'ft.legal.1': 'Política de cookies', 'ft.legal.2': 'Requisitos y condiciones',
      'ft.legal.3': 'Política de privacidad', 'ft.legal.4': 'Formas de pago',
      'ft.boutique.t': 'Boutique', 'ft.boutique.h': 'Lun - Vie 10:00 - 20:30 · Sáb 10:30 - 14:00',
      'ft.copy': '© 2026 AURELIA Maison S.L. · Todos los derechos reservados.',
      'ft.made': 'Diseño y desarrollo propio · HTML, CSS y JavaScript puro.',
      'nl.label': 'Email para la newsletter', 'nl.ph': 'tu@email.com', 'nl.btn': 'Suscribirme',
      'nl.ok': '¡Bienvenida! Te avisaremos de cada nueva colección.', 'nl.err': 'Introduce un email válido.',
      'lg.title': 'Mi cuenta', 'lg.text': 'Accede para consultar tus pedidos, reservas y lista de deseos.',
      'lg.pass': 'Contraseña', 'lg.submit': 'Entrar', 'lg.note': 'Sistema de login preparado para conectar con tu backend.',
      'lg.ok': 'Acceso simulado correctamente. Aquí conectarás tu sistema de login.',
      'lg.err': 'Email o contraseña no válidos (mínimo 6 caracteres).',
      'crt.title': 'Cesta de compra', 'crt.step1': 'Piezas', 'crt.step2': 'Entrega y pago',
      'crt.empty': 'Tu cesta está vacía.', 'crt.emptyt': 'Descubre nuestras colecciones y añade tus piezas favoritas.',
      'crt.gift': 'Añadir envoltorio de regalo (+4,90 €)', 'crt.gift.row': 'Envoltorio de regalo',
      'crt.subtotal': 'Subtotal', 'crt.shipping': 'Gastos de envío', 'crt.total': 'Total',
      'crt.next': 'Continuar con la entrega', 'crt.clear': 'Vaciar cesta', 'crt.back': '← Volver a la cesta',
      'crt.delivery.t': '¿Cómo quieres recibirla?', 'crt.pickup': 'Recogida en boutique',
      'crt.pickupt': 'Gratuito · Lista en 2 horas · Valencia centro',
      'crt.ship': 'Envío a domicilio', 'crt.shipt': '24-48 h · 6,90 € (gratis desde 250 €)',
      'crt.payment.t': '¿Cómo prefieres pagar?', 'crt.pay.pickup': 'Pagar al recoger en boutique',
      'crt.pay.pickupt': 'Efectivo o tarjeta en el mostrador', 'crt.pay.cod': 'Pagar en la entrega',
      'crt.pay.codt': 'Contra reembolso · Suplemento 2,50 €', 'crt.pay.gw': 'Pasar por la pasarela de pago',
      'crt.pay.gwt': 'Tarjeta · Bizum · Pago seguro online',
      'crt.data.t': 'Tus datos', 'crt.f.name': 'Nombre y apellidos', 'crt.f.addr': 'Dirección',
      'crt.f.city': 'Ciudad', 'crt.f.zip': 'Código postal', 'crt.f.notes': 'Notas para el pedido',
      'crt.f.priv': 'Acepto las condiciones de venta y la política de privacidad.',
      'crt.f.date': 'Día de recogida', 'crt.f.slot': 'Franja horaria', 'crt.cod.row': 'Suplemento contra reembolso',
      'crt.confirm': 'Confirmar pedido', 'crt.free': 'Gratis', 'crt.qty': 'Cantidad', 'crt.remove': 'Quitar',
      'crt.err.fields': 'Completa los campos marcados para continuar.',
      'crt.err.zip': 'El código postal debe tener 5 dígitos.', 'crt.err.email': 'Introduce un email válido.',
      'ck.title': 'Pasarela de pago', 'ck.text': 'Importe total a pagar por tu pedido. Al continuar pasarás a la plataforma de pago seguro.',
      'ck.amount': 'Importe a pagar', 'ck.pay': 'Pagar ahora', 'ck.cancel': 'Cancelar y volver',
      'ck.note': 'Aquí se conectará tu pasarela de pago real (Stripe, Redsys, Bizum...).',
      'sc.title': '¡Pedido registrado!', 'sc.code': 'Código de reserva', 'sc.close': 'Seguir comprando',
      'sc.pickup': 'Reserva confirmada. Puedes pasar por la boutique el día y franja elegidos; pagarás al recogerla.',
      'sc.cod': 'Pedido confirmado. Abonarás el importe en efectivo al mensajero en la entrega a domicilio.',
      'sc.gw': 'Pago realizado correctamente. Recibirás el resumen por email.',
      'cb.title': 'Cookies', 'cb.text': 'Usamos cookies propias para recordar tu idioma, el modo claro/oscuro y tu cesta.',
      'cb.accept': 'Aceptar', 'cb.reject': 'Rechazar',
      'toast.added': 'Añadido a la cesta', 'toast.removed': 'Pieza eliminada', 'toast.cleared': 'Cesta vaciada',
      'toast.lang': 'Idioma cambiado', 'cart.count': 'piezas en la cesta',
      'search.pages': 'Secciones', 'search.products': 'Piezas', 'search.none': 'Sin resultados. Prueba con «collar», «perla», «reloj»...',
      'search.found': 'resultados', 'qv.material': 'Material', 'qv.ref': 'Referencia', 'qv.select': 'Elige una opción',
      'qv.add': 'Añadir a la cesta',
      'legal.cookies.t': 'Política de cookies',
      'legal.cookies.b': '<p>Este sitio utiliza exclusivamente cookies técnicas propias, necesarias para su funcionamiento.</p><h3>Cookies utilizadas</h3><p><strong>aurelia_theme</strong> · guarda tu preferencia de modo claro u oscuro.<br><strong>aurelia_lang</strong> · recuerda el idioma seleccionado (español, inglés o valenciano).<br><strong>aurelia_cart</strong> · conserva las piezas de tu cesta entre visitas.<br><strong>aurelia_cookies</strong> · almacena tu decisión sobre este aviso.</p><h3>Cómo gestionarlas</h3><p>Puedes aceptarlas o rechazarlas desde el aviso inferior y borrarlas en cualquier momento desde la configuración de tu navegador.</p>',
      'legal.terms.t': 'Requisitos y condiciones de venta',
      'legal.terms.b': '<h3>Requisitos de compra</h3><p>Los pedidos requieren nombre, email y teléfono de contacto. Para el envío a domicilio es necesaria una dirección completa en Península o Baleares.</p><h3>Entrega</h3><p>Recogida en boutique: disponible en 2 horas durante horario comercial. Envío a domicilio: 24-48 h laborables (6,90 €, gratuito desde 250 €).</p><h3>Formas de pago</h3><p>Pago al recoger en boutique, pago contra reembolso (+2,50 €) o pago online con tarjeta y Bizum a través de la pasarela segura.</p><h3>Cambios y devoluciones</h3><p>Dispones de 30 días desde la entrega. La pieza debe presentarse sin señales de uso y con su estuche original.</p>',
      'legal.privacy.t': 'Política de privacidad',
      'legal.privacy.b': '<h3>Responsable</h3><p>AURELIA Maison S.L. · Carrer dels Cavallers 84, 46003 València · hola@aurelia-maison.es.</p><h3>Fines del tratamiento</h3><p>Gestionar tus consultas, pedidos, reservas de recogida y el envío de la newsletter si te suscribes.</p><h3>Conservación y derechos</h3><p>Los datos se conservan mientras exista relación comercial o hasta que solicites su supresión. Puedes ejercer acceso, rectificación, supresión, oposición y portabilidad escribiendo a nuestra dirección de email.</p>',
      'legal.payments.t': 'Formas de pago',
      'legal.payments.b': '<h3>Pago al recoger en boutique</h3><p>Reserva online y abona la compra en efectivo o con tarjeta en el mostrador de Valencia.</p><h3>Pago contra reembolso</h3><p>Abonas el importe al mensajero en el momento de la entrega. Incluye un suplemento de 2,50 €.</p><h3>Pago online</h3><p>Tarjeta y Bizum a través de la pasarela de pago segura del comercio. El importe se muestra siempre antes de confirmar.</p>'
    },

    en: {
      'top.phone': '+34 960 46 21 30', 'top.email': 'hola@aurelia-maison.es',
      'top.ship': 'Free shipping over €250 · Boutique pickup in 2 h',
      'nav.home': 'Home', 'nav.collections': 'Collections', 'nav.craft': 'Craftsmanship',
      'nav.shop': 'Shop', 'nav.lookbook': 'Lookbook', 'nav.services': 'Services', 'nav.contact': 'Contact',
      'btn.search': 'Search', 'btn.account': 'Access my account', 'btn.theme': 'Switch light or dark mode',
      'btn.cart': 'Open shopping cart', 'btn.menu': 'Open menu', 'btn.close': 'Close',
      'md.search.t': 'Search the page', 'md.search.ph': 'Search necklaces, pearls, gift...',
      'md.search.hint': 'Type at least two letters to search our pieces and sections.',
      'lang.label': 'Language',
      'hero.eyebrow': 'Autumn · Winter 2026 Collection', 'hero.title': 'Designer jewellery',
      'hero.title2': 'for unforgettable moments',
      'hero.text': 'One-of-a-kind pieces handmade in our Valencia workshop with 18 karat gold plating, freshwater pearls and selected gems.',
      'hero.cta1': 'View the collection', 'hero.cta2': 'Our workshop',
      'hero.s1': 'Years of craft', 'hero.s2': 'Pieces a year', 'hero.s3': 'Client rating', 'hero.s4': 'Warranty',
      'hero.scroll': 'Discover',
      'mq.1': 'Handmade in Valencia', 'mq.2': '18k gold plating', 'mq.3': 'Nickel free · Hypoallergenic',
      'mq.4': 'Gift wrapping included', 'mq.5': 'Buy online · Pick up in boutique',
      'col.eyebrow': 'Three worlds', 'col.title': 'Signature collections',
      'col.text': 'Every collection starts from a study of materials and proportions. Pieces designed to mix with each other and stay with you for years.',
      'col.link': 'View pieces',
      'col.1.title': 'Esencia Minimal', 'col.1.text': 'Clean lines and discreet geometry in polished gold. Jewellery for every day.',
      'col.2.title': 'Perla Atlántica', 'col.2.text': 'Freshwater pearls and nacre tones inspired by Mediterranean light.',
      'col.3.title': 'Noir Soirée', 'col.3.text': 'Statement pieces: onyx, cut zirconias and textured chains.',
      'col.1.alt': 'Portrait with gold earrings from the Esencia Minimal collection',
      'col.2.alt': 'Detail of a pearl necklace from the Perla Atlántica collection',
      'col.3.alt': 'Editorial portrait with gold jewellery from the Noir Soirée collection',
      'craft.eyebrow': 'The workshop', 'craft.title': 'Twenty-five years of jewellery craft',
      'craft.text': 'We work with local Valencia workshops and small family foundries. Each piece goes through fourteen stages, from technical drawing to final polishing.',
      'craft.f1': 'Original design', 'craft.f1t': 'Short series of 20 to 40 units per reference.',
      'craft.f2': 'Noble materials', 'craft.f2t': 'Solid brass, 18k gold plating, 925 silver and cultured pearls.',
      'craft.f3': 'Hand finishing', 'craft.f3t': 'Polishing, setting and clasp checked piece by piece.',
      'craft.f4': 'Repair and shine', 'craft.f4t': 'Free cleaning and adjustment service during the first year.',
      'craft.cta': 'Explore the shop', 'craft.img': 'Display of gold jewellery pieces in the boutique',
      'craft.caption': 'Workshop-boutique in the Carmen district, Valencia.',
      'shop.eyebrow': 'Online boutique', 'shop.title': 'Our pieces',
      'shop.text': 'Twenty references available for home delivery or boutique pickup. Choose how to receive them and when to pay.',
      'shop.filter.all': 'All', 'shop.filter.collares': 'Necklaces', 'shop.filter.pendientes': 'Earrings',
      'shop.filter.anillos': 'Rings', 'shop.filter.pulseras': 'Bracelets', 'shop.filter.relojes': 'Watches',
      'shop.filter.conjuntos': 'Sets',
      'shop.sort.label': 'Sort', 'shop.sort.featured': 'Featured', 'shop.sort.asc': 'Price: low to high',
      'shop.sort.desc': 'Price: high to low', 'shop.sort.name': 'Name A-Z',
      'shop.empty': 'No pieces in this category.',
      'shop.note': 'Looking for a bespoke piece or a corporate gift? Write to us from the form and we will quote within 24 h.',
      'shop.add': 'Add to cart', 'shop.quick': 'Quick view', 'shop.count': 'pieces',
      'shop.badge.new': 'New', 'shop.badge.sale': 'Sale', 'shop.badge.limited': 'Limited edition',
      'look.eyebrow': 'Lookbook', 'look.title': 'How to wear them',
      'look.text': 'Real combinations photographed for our clients: from office look to gala dinner.',
      'look.1': 'Aura Hoop + Esencia necklace', 'look.2': 'Perla Atlántica set', 'look.3': 'Noir Soirée earring',
      'look.quote': '“Good jewellery never shouts: it accompanies you.”', 'look.author': 'Clara Aurelia · Creative director',
      'look.1.alt': 'Profile with gold hoop earrings', 'look.2.alt': 'Portrait with pearl set', 'look.3.alt': 'Close-up with gold earrings',
      'svc.1': '24-48 h delivery', 'svc.1t': 'Mainland and Balearics. Free over €250.',
      'svc.2': 'Boutique pickup', 'svc.2t': 'Reserve online and collect in 2 h in Valencia.',
      'svc.3': 'Gift wrapping', 'svc.3t': 'Rigid case, silk ribbon and handwritten card.',
      'svc.4': 'Exchange and returns', 'svc.4t': '30 days to change the size or return the piece.',
      'ct.eyebrow': 'Contact', 'ct.title': 'Let\u2019s talk about your piece',
      'ct.text': 'We reply within 24 working hours. You can also visit us by appointment for a private styling session.',
      'ct.i1': 'Boutique', 'ct.i2': 'Opening hours', 'ct.i2t': 'Mon - Fri · 10:00 - 14:00 / 17:00 - 20:30<br>Sat · 10:30 - 14:00',
      'ct.i3': 'Phone', 'ct.i4': 'Email', 'ct.form.title': 'Contact form',
      'ct.f.name': 'Full name', 'ct.f.email': 'Email', 'ct.f.phone': 'Phone', 'ct.f.subject': 'Subject',
      'ct.f.s1': 'Personal styling', 'ct.f.s2': 'Bespoke piece', 'ct.f.s3': 'Order status', 'ct.f.s4': 'Press and collaborations',
      'ct.f.msg': 'Message', 'ct.f.priv': 'I have read and accept the privacy policy.', 'ct.f.send': 'Send message',
      'ct.ok': 'Thank you. We have received your message and will reply within 24 h.',
      'ct.err': 'Please check the highlighted fields before sending.',
      'ft.about': 'Designer jewellery and luxury accessories handmade in Valencia since 1998.',
      'ft.help.t': 'Help', 'ft.help.1': 'Shipping and delivery', 'ft.help.2': 'Exchanges and returns',
      'ft.help.3': 'Jewellery care', 'ft.help.4': 'Size guide',
      'ft.legal.t': 'Legal', 'ft.legal.1': 'Cookie policy', 'ft.legal.2': 'Requirements and conditions',
      'ft.legal.3': 'Privacy policy', 'ft.legal.4': 'Payment methods',
      'ft.boutique.t': 'Boutique', 'ft.boutique.h': 'Mon - Fri 10:00 - 20:30 · Sat 10:30 - 14:00',
      'ft.copy': '© 2026 AURELIA Maison S.L. · All rights reserved.',
      'ft.made': 'In-house design and development · Pure HTML, CSS and JavaScript.',
      'nl.label': 'Email for the newsletter', 'nl.ph': 'you@email.com', 'nl.btn': 'Subscribe',
      'nl.ok': 'Welcome! We will let you know about every new collection.', 'nl.err': 'Please enter a valid email.',
      'lg.title': 'My account', 'lg.text': 'Sign in to check your orders, reservations and wishlist.',
      'lg.pass': 'Password', 'lg.submit': 'Sign in', 'lg.note': 'Login system ready to connect to your backend.',
      'lg.ok': 'Simulated sign in successful. Connect your login system here.',
      'lg.err': 'Invalid email or password (6 characters minimum).',
      'crt.title': 'Shopping bag', 'crt.step1': 'Pieces', 'crt.step2': 'Delivery and payment',
      'crt.empty': 'Your bag is empty.', 'crt.emptyt': 'Discover our collections and add your favourite pieces.',
      'crt.gift': 'Add gift wrapping (+€4.90)', 'crt.gift.row': 'Gift wrapping',
      'crt.subtotal': 'Subtotal', 'crt.shipping': 'Shipping costs', 'crt.total': 'Total',
      'crt.next': 'Continue to delivery', 'crt.clear': 'Empty bag', 'crt.back': '← Back to the bag',
      'crt.delivery.t': 'How would you like to receive it?', 'crt.pickup': 'Boutique pickup',
      'crt.pickupt': 'Free · Ready in 2 hours · Central Valencia',
      'crt.ship': 'Home delivery', 'crt.shipt': '24-48 h · €6.90 (free over €250)',
      'crt.payment.t': 'How would you like to pay?', 'crt.pay.pickup': 'Pay when collecting in boutique',
      'crt.pay.pickupt': 'Cash or card at the counter', 'crt.pay.cod': 'Pay on delivery',
      'crt.pay.codt': 'Cash on delivery · €2.50 surcharge', 'crt.pay.gw': 'Go to the payment gateway',
      'crt.pay.gwt': 'Card · Bizum · Secure online payment',
      'crt.data.t': 'Your details', 'crt.f.name': 'Full name', 'crt.f.addr': 'Address',
      'crt.f.city': 'City', 'crt.f.zip': 'Postcode', 'crt.f.notes': 'Order notes',
      'crt.f.priv': 'I accept the terms of sale and the privacy policy.',
      'crt.f.date': 'Pickup day', 'crt.f.slot': 'Time slot', 'crt.cod.row': 'Cash on delivery surcharge',
      'crt.confirm': 'Confirm order', 'crt.free': 'Free', 'crt.qty': 'Quantity', 'crt.remove': 'Remove',
      'crt.err.fields': 'Please complete the highlighted fields to continue.',
      'crt.err.zip': 'The postcode must have 5 digits.', 'crt.err.email': 'Please enter a valid email.',
      'ck.title': 'Payment gateway', 'ck.text': 'Total amount to pay for your order. Continue to go to the secure payment platform.',
      'ck.amount': 'Amount to pay', 'ck.pay': 'Pay now', 'ck.cancel': 'Cancel and go back',
      'ck.note': 'Your real payment gateway (Stripe, Redsys, Bizum...) will be connected here.',
      'sc.title': 'Order registered!', 'sc.code': 'Reservation code', 'sc.close': 'Keep shopping',
      'sc.pickup': 'Reservation confirmed. Come to the boutique on your chosen day and slot; you pay when collecting.',
      'sc.cod': 'Order confirmed. You will pay the courier in cash at your home delivery.',
      'sc.gw': 'Payment completed successfully. You will receive the summary by email.',
      'cb.title': 'Cookies', 'cb.text': 'We only use our own cookies to remember your language, light/dark mode and your bag.',
      'cb.accept': 'Accept', 'cb.reject': 'Reject',
      'toast.added': 'Added to the bag', 'toast.removed': 'Piece removed', 'toast.cleared': 'Bag emptied',
      'toast.lang': 'Language changed', 'cart.count': 'pieces in the bag',
      'search.pages': 'Sections', 'search.products': 'Pieces', 'search.none': 'No results. Try “necklace”, “pearl”, “watch”...',
      'search.found': 'results', 'qv.material': 'Material', 'qv.ref': 'Reference', 'qv.select': 'Choose an option',
      'qv.add': 'Add to bag',
      'legal.cookies.t': 'Cookie policy',
      'legal.cookies.b': '<p>This website uses only its own technical cookies, required for it to work.</p><h3>Cookies used</h3><p><strong>aurelia_theme</strong> · stores your light or dark mode preference.<br><strong>aurelia_lang</strong> · remembers the selected language (Spanish, English or Valencian).<br><strong>aurelia_cart</strong> · keeps the pieces in your bag between visits.<br><strong>aurelia_cookies</strong> · stores your decision about this notice.</p><h3>How to manage them</h3><p>You can accept or reject them in the notice below and delete them any time from your browser settings.</p>',
      'legal.terms.t': 'Requirements and terms of sale',
      'legal.terms.b': '<h3>Purchase requirements</h3><p>Orders require a name, email and contact phone. For home delivery a full address in Mainland Spain or the Balearics is needed.</p><h3>Delivery</h3><p>Boutique pickup: ready in 2 hours during opening hours. Home delivery: 24-48 working hours (€6.90, free over €250).</p><h3>Payment methods</h3><p>Pay at the boutique counter, cash on delivery (+€2.50) or online payment by card and Bizum through the secure gateway.</p><h3>Exchanges and returns</h3><p>You have 30 days from delivery. The piece must show no signs of wear and come in its original case.</p>',
      'legal.privacy.t': 'Privacy policy',
      'legal.privacy.b': '<h3>Data controller</h3><p>AURELIA Maison S.L. · Carrer dels Cavallers 84, 46003 València, Spain · hola@aurelia-maison.es.</p><h3>Purpose</h3><p>Managing your enquiries, orders, pickup reservations and the newsletter if you subscribe.</p><h3>Retention and rights</h3><p>Data is kept while a commercial relationship exists or until you request deletion. You may exercise access, rectification, erasure, objection and portability by writing to our email address.</p>',
      'legal.payments.t': 'Payment methods',
      'legal.payments.b': '<h3>Pay at the boutique</h3><p>Reserve online and pay in cash or by card at the Valencia counter.</p><h3>Cash on delivery</h3><p>You pay the courier when the parcel arrives. A €2.50 surcharge applies.</p><h3>Online payment</h3><p>Card and Bizum through the shop\u2019s secure payment gateway. The amount is always shown before confirming.</p>'
    },

    va: {
      'top.phone': '+34 960 46 21 30', 'top.email': 'hola@aurelia-maison.es',
      'top.ship': 'Enviament gratuït des de 250 € · Recollida en botiga en 2 h',
      'nav.home': 'Inici', 'nav.collections': 'Col·leccions', 'nav.craft': 'Artesania',
      'nav.shop': 'Botiga', 'nav.lookbook': 'Lookbook', 'nav.services': 'Serveis', 'nav.contact': 'Contacte',
      'btn.search': 'Buscar', 'btn.account': 'Accedir al meu compte', 'btn.theme': 'Canviar mode clar o fosc',
      'btn.cart': 'Obrir carret de compra', 'btn.menu': 'Obrir menú', 'btn.close': 'Tancar',
      'md.search.t': 'Buscar en la pàgina', 'md.search.ph': 'Buscar collarets, perles, regal...',
      'md.search.hint': 'Escriu almenys dues lletres per a buscar entre les nostres peces i seccions.',
      'lang.label': 'Idioma',
      'hero.eyebrow': 'Col·lecció Tardor · Hivern 2026', 'hero.title': 'Bisuteria de disseny',
      'hero.title2': 'per a moments inoblidables',
      'hero.text': 'Peces úniques treballades a mà en el nostre taller de València amb banys d\u2019or de 18 quirats, perles d\u2019aigua dolça i gemmes seleccionades.',
      'hero.cta1': 'Veure la col·lecció', 'hero.cta2': 'El nostre taller',
      'hero.s1': 'Anys d\u2019ofici', 'hero.s2': 'Peces a l\u2019any', 'hero.s3': 'Valoració clientes', 'hero.s4': 'Garantia',
      'hero.scroll': 'Descobrir',
      'mq.1': 'Fet a mà a València', 'mq.2': 'Bany d\u2019or 18k', 'mq.3': 'Sense níquel · Hipoal·lergènic',
      'mq.4': 'Embolcall de regal inclòs', 'mq.5': 'Compra online · Recollida en botiga',
      'col.eyebrow': 'Tres universos', 'col.title': 'Col·leccions d\u2019autor',
      'col.text': 'Cada col·lecció naix d\u2019un estudi de materials i proporcions. Peces pensades per a combinar-se i acompanyar-te durant anys.',
      'col.link': 'Veure peces',
      'col.1.title': 'Esencia Minimal', 'col.1.text': 'Línies netes i geometria discreta en or polit. La bisuteria de cada dia.',
      'col.2.title': 'Perla Atlàntica', 'col.2.text': 'Perles d\u2019aigua dolça i tons nacre inspirats en la llum del Mediterrani.',
      'col.3.title': 'Noir Soirée', 'col.3.text': 'Peces de declaració: onyx, circonites tallades i cadenes en relleu.',
      'col.1.alt': 'Retrat amb arracades daurades de la col·lecció Esencia Minimal',
      'col.2.alt': 'Detall de collaret de perles de la col·lecció Perla Atlàntica',
      'col.3.alt': 'Retrat editorial amb joieria daurada de la col·lecció Noir Soirée',
      'craft.eyebrow': 'El taller', 'craft.title': 'Vint-i-cinc anys d\u2019ofici joier',
      'craft.text': 'Treballem amb tallers locals de València i petites foneríes familiars. Cada peça passa per catorze fases: del dibuix tècnic al polit final.',
      'craft.f1': 'Disseny propi', 'craft.f1t': 'Sèries curtes de 20 a 40 unitats per referència.',
      'craft.f2': 'Materials nobles', 'craft.f2t': 'Llató macís, bany d\u2019or 18k, plata 925 i perles conreades.',
      'craft.f3': 'Acabat a mà', 'craft.f3t': 'Polit, encast i tancament revisats peça per peça.',
      'craft.f4': 'Reparació i brillantor', 'craft.f4t': 'Servei gratuït de neteja i ajust durant el primer any.',
      'craft.cta': 'Explorar la botiga', 'craft.img': 'Expositor amb peces de bisuteria daurada en la botiga',
      'craft.caption': 'Taller-botiga del barri del Carme, València.',
      'shop.eyebrow': 'Botiga online', 'shop.title': 'Les nostres peces',
      'shop.text': 'Vint referències disponibles per a enviament a domicili o recollida en botiga. Tria com rebre-les i quan pagar-les.',
      'shop.filter.all': 'Tot', 'shop.filter.collares': 'Collarets', 'shop.filter.pendientes': 'Arracades',
      'shop.filter.anillos': 'Anells', 'shop.filter.pulseras': 'Braçalets', 'shop.filter.relojes': 'Rellotges',
      'shop.filter.conjuntos': 'Conjunts',
      'shop.sort.label': 'Ordenar', 'shop.sort.featured': 'Destacades', 'shop.sort.asc': 'Preu: menor a major',
      'shop.sort.desc': 'Preu: major a menor', 'shop.sort.name': 'Nom A-Z',
      'shop.empty': 'No hi ha peces en esta categoria.',
      'shop.note': 'Busques una peça a mida o un regal d\u2019empresa? Escriu-nos des del formulari i prepararem un pressupost en 24 h.',
      'shop.add': 'Afegir al carret', 'shop.quick': 'Vista ràpida', 'shop.count': 'peces',
      'shop.badge.new': 'Novetat', 'shop.badge.sale': 'Oferta', 'shop.badge.limited': 'Edició limitada',
      'look.eyebrow': 'Lookbook', 'look.title': 'Com portar-les',
      'look.text': 'Combinacions reals fotografiades per a les nostres clientes: del look d\u2019oficina al sopar de gala.',
      'look.1': 'Cèrcol Aura + collaret Esencia', 'look.2': 'Conjunt Perla Atlàntica', 'look.3': 'Arracada Noir Soirée',
      'look.quote': '“Una bona peça de bisuteria no crida: t\u2019acompanya.”', 'look.author': 'Clara Aurelia · Directora creativa',
      'look.1.alt': 'Perfil amb arracades de cèrcol daurat', 'look.2.alt': 'Retrat amb conjunt de perles', 'look.3.alt': 'Primer pla amb arracades daurades',
      'svc.1': 'Enviament 24-48 h', 'svc.1t': 'Península i Balears. Gratuït des de 250 €.',
      'svc.2': 'Recollida en botiga', 'svc.2t': 'Reserva online i recull en 2 h a València.',
      'svc.3': 'Embolcall de regal', 'svc.3t': 'Estuch rígid, llaç de seda i targeta manuscrita.',
      'svc.4': 'Canvi i devolució', 'svc.4t': '30 dies per a canviar la talla o tornar la peça.',
      'ct.eyebrow': 'Contacte', 'ct.title': 'Parlem de la teua peça',
      'ct.text': 'Respondrem en menys de 24 hores laborables. També pots visitar-nos amb cita prèvia per a una assessoria privada.',
      'ct.i1': 'Botiga', 'ct.i2': 'Horari', 'ct.i2t': 'Dl - Dv · 10:00 - 14:00 / 17:00 - 20:30<br>Ds · 10:30 - 14:00',
      'ct.i3': 'Telèfon', 'ct.i4': 'Correu', 'ct.form.title': 'Formulari de contacte',
      'ct.f.name': 'Nom complet', 'ct.f.email': 'Correu electrònic', 'ct.f.phone': 'Telèfon', 'ct.f.subject': 'Assumpte',
      'ct.f.s1': 'Assessoria personal', 'ct.f.s2': 'Peça a mida', 'ct.f.s3': 'Estat del meu pedido', 'ct.f.s4': 'Premsa i col·laboracions',
      'ct.f.msg': 'Missatge', 'ct.f.priv': 'He llegit i accepte la política de privacitat.', 'ct.f.send': 'Enviar missatge',
      'ct.ok': 'Gràcies. Hem rebut el teu missatge i et contestarem en menys de 24 h.',
      'ct.err': 'Revisa els camps marcats abans d\u2019enviar.',
      'ft.about': 'Bisuteria de disseny i complements de luxe elaborats a mà a València des de 1998.',
      'ft.help.t': 'Ajuda', 'ft.help.1': 'Enviaments i lliuraments', 'ft.help.2': 'Canvis i devolucions',
      'ft.help.3': 'Cura de les peces', 'ft.help.4': 'Guia de talles',
      'ft.legal.t': 'Legal', 'ft.legal.1': 'Política de cookies', 'ft.legal.2': 'Requisits i condicions',
      'ft.legal.3': 'Política de privacitat', 'ft.legal.4': 'Formes de pagament',
      'ft.boutique.t': 'Botiga', 'ft.boutique.h': 'Dl - Dv 10:00 - 20:30 · Ds 10:30 - 14:00',
      'ft.copy': '© 2026 AURELIA Maison S.L. · Tots els drets reservats.',
      'ft.made': 'Disseny i desenvolupament propi · HTML, CSS i JavaScript pur.',
      'nl.label': 'Correu per a la newsletter', 'nl.ph': 'tu@correu.com', 'nl.btn': 'Subscriure\u2019m',
      'nl.ok': 'Benvinguda! T\u2019avisarem de cada nova col·lecció.', 'nl.err': 'Introdueix un correu vàlid.',
      'lg.title': 'El meu compte', 'lg.text': 'Accedeix per a consultar els teus pedidos, reserves i llista de desitjos.',
      'lg.pass': 'Contrasenya', 'lg.submit': 'Entrar', 'lg.note': 'Sistema de login preparat per a connectar amb el teu backend.',
      'lg.ok': 'Accés simulat correctament. Ací connectaràs el teu sistema de login.',
      'lg.err': 'Correu o contrasenya no vàlids (mínim 6 caràcters).',
      'crt.title': 'Carret de compra', 'crt.step1': 'Peces', 'crt.step2': 'Lliurament i pagament',
      'crt.empty': 'El teu carret està buit.', 'crt.emptyt': 'Descobreix les nostres col·leccions i afig les teues peces favorites.',
      'crt.gift': 'Afegir embolcall de regal (+4,90 €)', 'crt.gift.row': 'Embolcall de regal',
      'crt.subtotal': 'Subtotal', 'crt.shipping': 'Despeses d\u2019enviament', 'crt.total': 'Total',
      'crt.next': 'Continuar amb el lliurament', 'crt.clear': 'Buidar carret', 'crt.back': '← Tornar al carret',
      'crt.delivery.t': 'Com vols rebre-la?', 'crt.pickup': 'Recollida en botiga',
      'crt.pickupt': 'Gratuït · Llesta en 2 hores · València centre',
      'crt.ship': 'Enviament a domicili', 'crt.shipt': '24-48 h · 6,90 € (gratuït des de 250 €)',
      'crt.payment.t': 'Com vols pagar?', 'crt.pay.pickup': 'Pagar en recollir en botiga',
      'crt.pay.pickupt': 'Efectiu o targeta en el mostrador', 'crt.pay.cod': 'Pagar en el lliurament',
      'crt.pay.codt': 'Contra remborsament · Suplement 2,50 €', 'crt.pay.gw': 'Passar per la passarel·la de pagament',
      'crt.pay.gwt': 'Targeta · Bizum · Pagament segur online',
      'crt.data.t': 'Les teues dades', 'crt.f.name': 'Nom i cognoms', 'crt.f.addr': 'Adreça',
      'crt.f.city': 'Ciutat', 'crt.f.zip': 'Codi postal', 'crt.f.notes': 'Notes per al pedido',
      'crt.f.priv': 'Accepte les condicions de venda i la política de privacitat.',
      'crt.f.date': 'Dia de recollida', 'crt.f.slot': 'Franja horària', 'crt.cod.row': 'Suplement contra remborsament',
      'crt.confirm': 'Confirmar pedido', 'crt.free': 'Gratuït', 'crt.qty': 'Quantitat', 'crt.remove': 'Traure',
      'crt.err.fields': 'Completa els camps marcats per a continuar.',
      'crt.err.zip': 'El codi postal ha de tindre 5 dígits.', 'crt.err.email': 'Introdueix un correu vàlid.',
      'ck.title': 'Passarel·la de pagament', 'ck.text': 'Import total a pagar pel teu pedido. En continuar passaràs a la plataforma de pagament segur.',
      'ck.amount': 'Import a pagar', 'ck.pay': 'Pagar ara', 'ck.cancel': 'Cancel·lar i tornar',
      'ck.note': 'Ací es connectarà la teua passarel·la de pagament real (Stripe, Redsys, Bizum...).',
      'sc.title': '¡Pedido registrat!', 'sc.code': 'Codi de reserva', 'sc.close': 'Seguir comprant',
      'sc.pickup': 'Reserva confirmada. Pots passar per la botiga el dia i franja triats; pagaràs en recollir-la.',
      'sc.cod': 'Pedido confirmat. Pagaràs en efectiu al missatger en el lliurament a domicili.',
      'sc.gw': 'Pagament realitzat correctament. Rebràs el resum per correu.',
      'cb.title': 'Cookies', 'cb.text': 'Utilitzem només cookies pròpies per a recordar el teu idioma, el mode clar/fosc i el teu carret.',
      'cb.accept': 'Acceptar', 'cb.reject': 'Rebutjar',
      'toast.added': 'Afegit al carret', 'toast.removed': 'Peça eliminada', 'toast.cleared': 'Carret buidat',
      'toast.lang': 'Idioma canviat', 'cart.count': 'peces al carret',
      'search.pages': 'Seccions', 'search.products': 'Peces', 'search.none': 'Sense resultats. Prova amb «collaret», «perla», «rellotge»...',
      'search.found': 'resultats', 'qv.material': 'Material', 'qv.ref': 'Referència', 'qv.select': 'Tria una opció',
      'qv.add': 'Afegir al carret',
      'legal.cookies.t': 'Política de cookies',
      'legal.cookies.b': '<p>Este lloc utilitza exclusivament cookies tècniques pròpies, necessàries per al seu funcionament.</p><h3>Cookies utilitzades</h3><p><strong>aurelia_theme</strong> · guarda la teua preferència de mode clar o fosc.<br><strong>aurelia_lang</strong> · recorda l\u2019idioma seleccionat (espanyol, anglés o valencià).<br><strong>aurelia_cart</strong> · conserva les peces del teu carret entre visites.<br><strong>aurelia_cookies</strong> · guarda la teua decisió sobre este avís.</p><h3>Com gestionar-les</h3><p>Pots acceptar-les o rebutjar-les des de l\u2019avís inferior i esborrar-les en qualsevol moment des de la configuració del teu navegador.</p>',
      'legal.terms.t': 'Requisits i condicions de venda',
      'legal.terms.b': '<h3>Requisits de compra</h3><p>Els pedidos requerixen nom, correu i telèfon de contacte. Per a l\u2019enviament a domicili cal una adreça completa a Península o Balears.</p><h3>Lliurament</h3><p>Recollida en botiga: disponible en 2 hores en horari comercial. Enviament a domicili: 24-48 h laborables (6,90 €, gratuït des de 250 €).</p><h3>Formes de pagament</h3><p>Pagament en recollir en botiga, contra remborsament (+2,50 €) o pagament online amb targeta i Bizum a través de la passarel·la segura.</p><h3>Canvis i devolucions</h3><p>Disposes de 30 dies des del lliurament. La peça ha de presentar-se sense senyals d\u2019ús i amb el seu estuch original.</p>',
      'legal.privacy.t': 'Política de privacitat',
      'legal.privacy.b': '<h3>Responsable</h3><p>AURELIA Maison S.L. · Carrer dels Cavallers 84, 46003 València · hola@aurelia-maison.es.</p><h3>Fins del tractament</h3><p>Gestionar les teues consultes, pedidos, reserves de recollida i l\u2019enviament de la newsletter si t\u2019hi subscrius.</p><h3>Conservació i drets</h3><p>Les dades es conserven mentre existisca relació comercial o fins que demanes la seua supressió. Pots exercir accés, rectificació, supressió, oposició i portabilitat escrivint al nostre correu.</p>',
      'legal.payments.t': 'Formes de pagament',
      'legal.payments.b': '<h3>Pagar en recollir en botiga</h3><p>Reserva online i abona la compra en efectiu o amb targeta al mostrador de València.</p><h3>Contra remborsament</h3><p>Abones l\u2019import al missatger en el moment del lliurament. Inclou un suplement de 2,50 €.</p><h3>Pagament online</h3><p>Targeta i Bizum a través de la passarel·la de pagament segura del comerç. L\u2019import es mostra sempre abans de confirmar.</p>'
    }
  };

  const t = key => (I18N[state.lang] && I18N[state.lang][key]) || I18N.es[key] || key;

  /* ---------------------------------------------------------
     3. Tema claro / oscuro
  --------------------------------------------------------- */
  function applyTheme(theme, save) {
    state.theme = theme;
    document.body.classList.toggle('dark-mode', theme === 'dark');
    const btn = $('#themeBtn');
    if (btn) btn.setAttribute('aria-label', t('btn.theme'));
    if (save) { try { localStorage.setItem(STORE.theme, theme); } catch (e) {} }
  }
  function initTheme() {
    let saved = null;
    try { saved = localStorage.getItem(STORE.theme); } catch (e) {}
    if (saved === 'dark' || saved === 'light') { applyTheme(saved, false); return; }
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    applyTheme(prefersDark ? 'dark' : 'light', false);
  }

  /* ---------------------------------------------------------
     4. Idioma
  --------------------------------------------------------- */
  function applyLanguage(lang, save) {
    if (!I18N[lang]) lang = 'es';
    state.lang = lang;
    document.documentElement.setAttribute('lang', lang === 'va' ? 'ca' : lang);

    $$('[data-i18n]').forEach(el => { el.textContent = t(el.getAttribute('data-i18n')); });
    $$('[data-i18n-ph]').forEach(el => { el.setAttribute('placeholder', t(el.getAttribute('data-i18n-ph'))); });
    $$('[data-i18n-aria]').forEach(el => { el.setAttribute('aria-label', t(el.getAttribute('data-i18n-aria'))); });
    $$('[data-i18n-alt]').forEach(el => { el.setAttribute('alt', t(el.getAttribute('data-i18n-alt'))); });

    $$('.lang__btn').forEach(b => b.classList.toggle('is-active', b.dataset.lang === lang));

    renderProducts();
    renderCart();
    updateTotals();
    if ($('#legalModal').classList.contains('is-open') && state.legalOpen) openLegal(state.legalOpen, false);

    if (save) {
      try { localStorage.setItem(STORE.lang, lang); } catch (e) {}
      toast(t('toast.lang'));
    }
  }

  /* ---------------------------------------------------------
     5. Navegación suave, header, progreso y nav activa
  --------------------------------------------------------- */
  function headerHeight() {
    const h = $('#header');
    return h ? h.offsetHeight : 74;
  }
  function scrollToSection(hash) {
    const target = document.querySelector(hash);
    if (!target) return;
    const top = target.getBoundingClientRect().top + window.pageYOffset - (headerHeight() - 1);
    window.scrollTo({ top: top < 0 ? 0 : top, behavior: 'smooth' });
  }
  function initNavigation() {
    $$('a[href^="#"]').forEach(link => {
      link.addEventListener('click', ev => {
        const hash = link.getAttribute('href');
        if (!hash || hash === '#') { ev.preventDefault(); return; }
        const target = document.querySelector(hash);
        if (!target) return;
        ev.preventDefault();
        closeMobileMenu();
        scrollToSection(hash);
        if (link.dataset.filter) setFilter(link.dataset.filter);
        history.replaceState(null, '', hash);
      });
    });

    const header = $('#header'), topbar = $('#topbar'), progress = $('#progress');
    const navLinks = $$('.nav__link');
    const sections = navLinks.map(l => document.querySelector(l.getAttribute('href'))).filter(Boolean);

    let lastY = 0, ticking = false;
    function onScroll() {
      const y = window.pageYOffset;
      header.classList.toggle('is-scrolled', y > 40);
      topbar.classList.toggle('topbar--hidden', y > 90 && y > lastY);
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.width = (docH > 0 ? (y / docH) * 100 : 0) + '%';

      let current = sections[0];
      sections.forEach(sec => { if (sec.getBoundingClientRect().top <= headerHeight() + 90) current = sec; });
      navLinks.forEach(l => l.classList.toggle('is-active', current && l.getAttribute('href') === '#' + current.id));
      lastY = y;
      ticking = false;
    }
    window.addEventListener('scroll', () => {
      if (!ticking) { ticking = true; window.requestAnimationFrame(onScroll); }
    }, { passive: true });
    onScroll();

    // El menú móvil se cierra al redimensionar la pantalla
    let rtime;
    window.addEventListener('resize', () => {
      clearTimeout(rtime);
      rtime = setTimeout(() => { if (window.innerWidth > 820) closeMobileMenu(); }, 150);
    });
  }

  /* ---------------------------------------------------------
     6. Menú hamburguesa
  --------------------------------------------------------- */
  /* El panel se coloca justo debajo de la cabecera fija */
  function placeMobileMenu() {
    const menu = $('#mobileMenu'), header = $('#header');
    if (!menu || !header) return;
    menu.style.top = Math.round(header.getBoundingClientRect().bottom) + 'px';
  }
  function openMobileMenu() {
    const menu = $('#mobileMenu'), btn = $('#burgerBtn');
    placeMobileMenu();
    menu.classList.add('is-open');
    menu.setAttribute('aria-hidden', 'false');
    btn.setAttribute('aria-expanded', 'true');
    document.body.classList.add('menu-open', 'no-scroll');
  }
  function closeMobileMenu() {
    const menu = $('#mobileMenu'), btn = $('#burgerBtn');
    if (!menu.classList.contains('is-open')) return;
    menu.classList.remove('is-open');
    menu.setAttribute('aria-hidden', 'true');
    btn.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('menu-open', 'no-scroll');
  }
  function initMobileMenu() {
    $('#burgerBtn').addEventListener('click', () => {
      $('#mobileMenu').classList.contains('is-open') ? closeMobileMenu() : openMobileMenu();
    });
    $$('#mobileMenu a').forEach(a => a.addEventListener('click', closeMobileMenu));
    $('#mmSearchBtn').addEventListener('click', () => { closeMobileMenu(); openModal('searchModal'); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMobileMenu(); });
    window.addEventListener('scroll', () => {
      if ($('#mobileMenu').classList.contains('is-open')) placeMobileMenu();
    }, { passive: true });
  }

  /* ---------------------------------------------------------
     7. Modales genéricos
  --------------------------------------------------------- */
  function openModal(id) {
    const modal = document.getElementById(id);
    if (!modal) return;
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('no-scroll');
    if (id === 'searchModal') setTimeout(() => { const i = $('#searchInput'); if (i) i.focus(); }, 140);
  }
  function closeModal(id) {
    const modal = document.getElementById(id);
    if (!modal || !modal.classList.contains('is-open')) return;
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    if (!$$('.modal.is-open').length && !$('#cartDrawer').classList.contains('is-open')) {
      document.body.classList.remove('no-scroll');
    }
    if (id === 'searchModal') clearHighlights();
  }
  function initModals() {
    $$('[data-close]').forEach(el => {
      el.addEventListener('click', () => closeModal(el.getAttribute('data-close')));
    });
    $('#searchBtn').addEventListener('click', () => openModal('searchModal'));
    $('#accountBtn').addEventListener('click', () => openModal('loginModal'));
    document.addEventListener('keydown', e => {
      if (e.key !== 'Escape') return;
      $$('.modal.is-open').forEach(m => closeModal(m.id));
      closeDrawer();
    });
  }

  /* ---------------------------------------------------------
     8. Aparición de secciones
  --------------------------------------------------------- */
  function initReveal() {
    const items = $$('.reveal');
    if (!('IntersectionObserver' in window)) { items.forEach(i => i.classList.add('is-visible')); return; }
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add('is-visible'), i * 90);
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
    items.forEach(i => io.observe(i));
  }

  /* ---------------------------------------------------------
     9. Tienda: filtros, orden y render de productos
  --------------------------------------------------------- */
  function visibleProducts() {
    let list = PRODUCTS.filter(p => state.filter === 'all' || p.cat === state.filter);
    const lang = state.lang;
    if (state.sort === 'asc')       list = list.slice().sort((a, b) => a.price - b.price);
    else if (state.sort === 'desc') list = list.slice().sort((a, b) => b.price - a.price);
    else if (state.sort === 'name') list = list.slice().sort((a, b) => a.name[lang].localeCompare(b.name[lang]));
    return list;
  }

  function productCard(p) {
    const lang = state.lang;
    const badge = p.badge
      ? '<span class="product__badge product__badge--' + p.badge + '">' + t('shop.badge.' + p.badge) + '</span>'
      : '';
    const price = p.old
      ? '<span class="product__price"><s>' + money(p.old) + '</s>' + money(p.price) + '</span>'
      : '<span class="product__price">' + money(p.price) + '</span>';
    const variants = p.variants
      ? '<select class="product__variant" data-variant="' + p.id + '">' +
        p.variants.map(v => '<option value="' + v + '">' + v + '</option>').join('') + '</select>'
      : '';
    return '' +
      '<article class="product" data-id="' + p.id + '">' +
        '<div class="product__media">' + badge +
          '<img loading="lazy" src="' + p.img + '" alt="' + p.name[lang] + '">' +
          '<button class="product__quick" type="button" data-quick="' + p.id + '">' + t('shop.quick') + '</button>' +
        '</div>' +
        '<div class="product__body">' +
          '<span class="product__cat">' + t('shop.filter.' + p.cat) + '</span>' +
          '<h3 class="product__name">' + p.name[lang] + '</h3>' +
          '<p class="product__material">' + p.mat[lang] + '</p>' +
          variants +
          '<div class="product__foot">' + price +
            '<button class="product__add" type="button" data-add="' + p.id + '" aria-label="' + t('shop.add') + '" title="' + t('shop.add') + '">' +
              '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>' +
            '</button>' +
          '</div>' +
        '</div>' +
      '</article>';
  }

  function renderProducts() {
    const grid = $('#productGrid');
    if (!grid) return;
    const list = visibleProducts();
    grid.innerHTML = list.map(productCard).join('');
    $('#shopEmpty').hidden = list.length > 0;
    $('#shopCount').textContent = list.length + ' ' + t('shop.count');
  }

  function setFilter(cat) {
    state.filter = cat || 'all';
    $$('.chip').forEach(c => c.classList.toggle('is-active', c.dataset.cat === state.filter));
    renderProducts();
  }

  function initShop() {
    renderProducts();
    $$('.chip').forEach(chip => chip.addEventListener('click', () => setFilter(chip.dataset.cat)));
    $('#sortSelect').addEventListener('change', e => { state.sort = e.target.value; renderProducts(); });

    // Delegación de eventos del catálogo
    $('#productGrid').addEventListener('click', e => {
      const add = e.target.closest('[data-add]');
      if (add) { addToCart(add.getAttribute('data-add'), readVariant(add.getAttribute('data-add'))); return; }
      const quick = e.target.closest('[data-quick]');
      if (quick) openQuickView(quick.getAttribute('data-quick'));
    });
  }
  function readVariant(id) {
    const sel = $('[data-variant="' + id + '"]');
    return sel ? sel.value : '';
  }

  /* ---------------------------------------------------------
     10. Vista rápida de producto
  --------------------------------------------------------- */
  function openQuickView(id) {
    const p = findProduct(id);
    if (!p) return;
    const lang = state.lang;
    const variantField = p.variants
      ? '<div class="field"><label for="qvVariant">' + t('qv.select') + '</label><select id="qvVariant">' +
        p.variants.map(v => '<option value="' + v + '">' + v + '</option>').join('') + '</select></div>'
      : '';
    $('#quickBody').innerHTML =
      '<img src="' + p.img + '" alt="' + p.name[lang] + '">' +
      '<div>' +
        '<span class="product__cat">' + t('shop.filter.' + p.cat) + '</span>' +
        '<h2>' + p.name[lang] + '</h2>' +
        '<span class="price">' + money(p.price) + '</span>' +
        '<p>' + p.desc[lang] + '</p>' +
        '<dl>' +
          '<dt>' + t('qv.material') + '</dt><dd>' + p.mat[lang] + '</dd>' +
          '<dt>' + t('qv.ref') + '</dt><dd>AM-' + p.id.toUpperCase().replace(/-/g, '') + '</dd>' +
        '</dl>' +
        variantField +
        '<button class="btn btn--solid btn--full" type="button" id="qvAdd">' + t('qv.add') + '</button>' +
      '</div>';
    openModal('quickModal');
    $('#qvAdd').addEventListener('click', () => {
      const sel = $('#qvVariant');
      addToCart(p.id, sel ? sel.value : '');
      closeModal('quickModal');
    });
  }

  /* ---------------------------------------------------------
     11. Carrito: estado, render y totales
  --------------------------------------------------------- */
  const GIFT_PRICE = 4.90, SHIP_PRICE = 6.90, COD_PRICE = 2.50, FREE_SHIP_FROM = 250;

  function findProduct(id) { return PRODUCTS.find(p => p.id === id); }
  function cartItems() {
    return state.cart.map(line => {
      const p = findProduct(line.id);
      return p ? { id: line.id, variant: line.variant, qty: line.qty, product: p, lineTotal: p.price * line.qty } : null;
    }).filter(Boolean);
  }
  function cartCount() { return state.cart.reduce((n, l) => n + l.qty, 0); }
  function subtotal() { return cartItems().reduce((n, l) => n + l.lineTotal, 0); }
  function giftCost() { return state.gift && state.cart.length ? GIFT_PRICE : 0; }
  function shippingCost() {
    if (state.delivery === 'pickup' || !state.cart.length) return 0;
    return subtotal() >= FREE_SHIP_FROM ? 0 : SHIP_PRICE;
  }
  function codCost() { return state.payment === 'cod' && state.cart.length ? COD_PRICE : 0; }
  function grandTotal() { return subtotal() + giftCost() + shippingCost() + codCost(); }

  function saveCart() { try { localStorage.setItem(STORE.cart, JSON.stringify(state.cart)); } catch (e) {} }
  function loadCart() {
    try {
      const raw = localStorage.getItem(STORE.cart);
      const parsed = raw ? JSON.parse(raw) : [];
      state.cart = Array.isArray(parsed) ? parsed.filter(l => l && findProduct(l.id)) : [];
    } catch (e) { state.cart = []; }
  }

  function addToCart(id, variant) {
    const p = findProduct(id);
    if (!p) return;
    const chosen = variant || (p.variants ? p.variants[0] : '');
    const line = state.cart.find(l => l.id === id && l.variant === chosen);
    if (line) line.qty += 1;
    else state.cart.push({ id: id, variant: chosen, qty: 1 });
    saveCart(); renderCart(); updateTotals();
    toast(t('toast.added') + ' · ' + p.name[state.lang]);
  }
  function changeQty(id, variant, delta) {
    const line = state.cart.find(l => l.id === id && l.variant === variant);
    if (!line) return;
    line.qty += delta;
    if (line.qty < 1) state.cart = state.cart.filter(l => l !== line);
    saveCart(); renderCart(); updateTotals();
  }
  function removeLine(id, variant) {
    state.cart = state.cart.filter(l => !(l.id === id && l.variant === variant));
    saveCart(); renderCart(); updateTotals(); toast(t('toast.removed'));
  }
  function clearCart(showMsg) {
    state.cart = [];
    state.gift = false;
    const wrap = $('#giftWrap');
    if (wrap) wrap.checked = false;
    const status = $('#coStatus');
    if (status) status.hidden = true;
    saveCart(); renderCart(); updateTotals(); goStep(1);
    if (showMsg) toast(t('toast.cleared'));
  }

  function renderCart() {
    const list = $('#cartList');
    if (!list) return;
    const items = cartItems();
    const count = cartCount();
    const badge = $('#cartCount');
    badge.hidden = count === 0;
    badge.textContent = count;
    badge.setAttribute('aria-label', count + ' ' + t('cart.count'));

    $('#cartEmpty').hidden = items.length > 0;
    $('#cartEmptyText').hidden = items.length > 0;
    list.innerHTML = items.map(l => {
      const variant = l.variant ? '<small>' + l.variant + '</small>' : '';
      return '' +
        '<li class="cart-item">' +
          '<img src="' + l.product.img + '" alt="' + l.product.name[state.lang] + '">' +
          '<div>' +
            '<h4>' + l.product.name[state.lang] + '</h4>' + variant +
            '<small>' + money(l.product.price) + '</small>' +
          '</div>' +
          '<div class="cart-item__right">' +
            '<div class="qty" role="group" aria-label="' + t('crt.qty') + '">' +
              '<button type="button" data-dec="' + l.id + '" data-v="' + l.variant + '" aria-label="-">−</button>' +
              '<span>' + l.qty + '</span>' +
              '<button type="button" data-inc="' + l.id + '" data-v="' + l.variant + '" aria-label="+">+</button>' +
            '</div>' +
            '<span class="cart-item__price">' + money(l.lineTotal) + '</span>' +
            '<button class="cart-item__remove" type="button" data-del="' + l.id + '" data-v="' + l.variant + '">' + t('crt.remove') + '</button>' +
          '</div>' +
        '</li>';
    }).join('');

    const empty = items.length === 0;
    $('#cartExtras').hidden = empty;
    $('#toCheckout').disabled = empty;
    $('#clearCart').hidden = empty;
  }

  function updateTotals() {
    if (!$('#sumSubtotal')) return;
    const ship = shippingCost();
    const shipLabel = state.cart.length === 0
      ? '—'
      : (state.delivery === 'pickup' || ship === 0 ? t('crt.free') : money(ship));

    $('#sumSubtotal').textContent = money(subtotal());
    $('#sumShip').textContent = shipLabel;
    $('#sumTotal').textContent = money(state.cart.length ? subtotal() + giftCost() + shippingCost() : 0);

    $('#sumSubtotal2').textContent = money(subtotal());
    $('#rowWrap').hidden = !giftCost();
    $('#sumWrap').textContent = money(giftCost());
    $('#sumShip2').textContent = shipLabel;
    $('#rowCod').hidden = !codCost();
    $('#sumCod').textContent = money(codCost());
    $('#sumTotal2').textContent = money(grandTotal());
  }

  /* ---------- Drawer del carrito ---------- */
  function openDrawer() {
    $('#cartDrawer').classList.add('is-open');
    $('#cartDrawer').setAttribute('aria-hidden', 'false');
    document.body.classList.add('no-scroll');
    goStep(state.checkoutStep || 1);
    syncDeliveryPayment();
  }
  function closeDrawer() {
    const d = $('#cartDrawer');
    if (!d.classList.contains('is-open')) return;
    d.classList.remove('is-open');
    d.setAttribute('aria-hidden', 'true');
    if (!$$('.modal.is-open').length) document.body.classList.remove('no-scroll');
  }
  function goStep(step) {
    state.checkoutStep = step;
    $('#cartStep1').hidden = step !== 1;
    $('#cartStep2').hidden = step !== 2;
    $('#step1').classList.toggle('is-active', step === 1);
    $('#step2').classList.toggle('is-active', step === 2);
    const panel = $('.drawer__panel');
    if (panel) panel.scrollTop = 0;
  }

  function syncDeliveryPayment() {
    const shipMode = state.delivery === 'ship';
    const payPickup = $('input[name="payment"][value="pickup"]');
    const payCod = $('input[name="payment"][value="cod"]');
    if (!payPickup || !payCod) return;

    payPickup.disabled = shipMode;
    payCod.disabled = !shipMode;
    payPickup.closest('.option').style.opacity = shipMode ? 0.45 : 1;
    payCod.closest('.option').style.opacity = !shipMode ? 0.45 : 1;

    if (shipMode && state.payment === 'pickup') state.payment = 'gateway';
    if (!shipMode && state.payment === 'cod') state.payment = 'pickup';
    const current = $('input[name="payment"][value="' + state.payment + '"]');
    if (current) current.checked = true;

    $('#shipFields').hidden = !shipMode;
    $('#pickupFields').hidden = shipMode;
    $$('#shipFields input').forEach(i => { i.required = shipMode; });
    $('#coDate').required = !shipMode;
    updateTotals();
  }

  function initCart() {
    loadCart();
    renderCart();
    updateTotals();

    $('#cartBtn').addEventListener('click', openDrawer);
    $('#cartDrawer').addEventListener('click', e => {
      if (e.target.closest('[data-close="cartDrawer"]')) { closeDrawer(); return; }
      const inc = e.target.closest('[data-inc]');
      const dec = e.target.closest('[data-dec]');
      const del = e.target.closest('[data-del]');
      if (inc) { changeQty(inc.getAttribute('data-inc'), inc.getAttribute('data-v'), 1); return; }
      if (dec) { changeQty(dec.getAttribute('data-dec'), dec.getAttribute('data-v'), -1); return; }
      if (del) removeLine(del.getAttribute('data-del'), del.getAttribute('data-v'));
    });

    $('#toCheckout').addEventListener('click', () => { goStep(2); syncDeliveryPayment(); });
    $('#backToCart').addEventListener('click', () => goStep(1));
    $('#clearCart').addEventListener('click', () => clearCart(true));
    $('#giftWrap').addEventListener('change', e => { state.gift = e.target.checked; updateTotals(); });

    $$('input[name="delivery"]').forEach(r => r.addEventListener('change', e => {
      state.delivery = e.target.value; syncDeliveryPayment();
    }));
    $$('input[name="payment"]').forEach(r => r.addEventListener('change', e => {
      state.payment = e.target.value; updateTotals();
    }));

    // Fecha mínima de recogida: mañana
    const dateInput = $('#coDate');
    const iso = new Date(Date.now() + 86400000).toISOString().split('T')[0];
    dateInput.min = iso;
    if (!dateInput.value) dateInput.value = iso;

    $('#checkoutForm').addEventListener('submit', onSubmitOrder);
    $('#payNow').addEventListener('click', onPayNow);
    syncDeliveryPayment();
  }

  /* ---------------------------------------------------------
     12. Validación y confirmación del pedido
  --------------------------------------------------------- */
  const isEmail = v => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
  function markField(input, invalid) { input.classList.toggle('is-invalid', invalid); }

  function onSubmitOrder(e) {
    e.preventDefault();
    const status = $('#coStatus');
    const name = $('#coName'), email = $('#coEmail'), phone = $('#coPhone');
    const addr = $('#coAddr'), city = $('#coCity'), zip = $('#coZip'), date = $('#coDate');
    let ok = true, message = t('crt.err.fields');

    [name, email, phone].forEach(f => {
      markField(f, !f.value.trim());
      if (!f.value.trim()) ok = false;
    });
    if (!isEmail(email.value.trim())) { markField(email, true); ok = false; message = t('crt.err.email'); }

    if (state.delivery === 'ship') {
      [addr, city, zip].forEach(f => { markField(f, !f.value.trim()); if (!f.value.trim()) ok = false; });
      if (!/^\d{5}$/.test(zip.value.trim())) { markField(zip, true); ok = false; message = t('crt.err.zip'); }
    } else if (!date.value) {
      markField(date, true); ok = false;
    }

    if (!$('#coPriv').checked) ok = false;

    if (!ok) {
      status.className = 'form__status is-error';
      status.textContent = message;
      status.hidden = false;
      const firstBad = $('#cartStep2').querySelector('.is-invalid') || $('#coPriv');
      if (firstBad && firstBad.focus) firstBad.focus();
      return;
    }

    status.hidden = true;
    state.lastOrder = {
      code: 'AM-' + new Date().toISOString().slice(2, 10).replace(/-/g, '') + '-' +
            Math.floor(1000 + Math.random() * 9000),
      delivery: state.delivery,
      payment: state.payment,
      total: grandTotal(),
      date: date.value,
      slot: $('#coSlot').value,
      name: name.value.trim(),
      email: email.value.trim(),
      notes: $('#coNotes').value.trim()
    };

    if (state.payment === 'gateway') showPaymentWindow();
    else finishOrder(t(state.payment === 'pickup' ? 'sc.pickup' : 'sc.cod'));
  }

  function showPaymentWindow() {
    const o = state.lastOrder;
    const rows = [[t('crt.subtotal'), money(subtotal())]];
    if (giftCost()) rows.push([t('crt.gift.row'), money(giftCost())]);
    rows.push([t('crt.shipping'), state.delivery === 'pickup' ? t('crt.free') : money(shippingCost())]);
    if (codCost()) rows.push([t('crt.cod.row'), money(codCost())]);
    rows.push([t('crt.total'), money(o.total)]);

    $('#payTotal').textContent = money(o.total);
    $('#payBreakdown').innerHTML = rows.map(r => '<li><span>' + r[0] + '</span><strong>' + r[1] + '</strong></li>').join('');
    closeDrawer();
    openModal('payModal');
  }

  function onPayNow() {
    // >>> Punto de integración de la pasarela de pago real <<<
    closeModal('payModal');
    finishOrder(t('sc.gw'));
  }

  function finishOrder(message) {
    const o = state.lastOrder;
    $('#okText').textContent = message + ' · ' + o.name + ' (' + o.email + ')';
    $('#okCode').textContent = o.code;
    closeDrawer();
    openModal('okModal');
    clearCart(false);
  }

  /* ---------------------------------------------------------
     13. Búsqueda en la página + resaltado de coincidencias
  --------------------------------------------------------- */
  function clearHighlights() {
    $$('mark.hl').forEach(m => {
      const parent = m.parentNode;
      if (!parent) return;
      parent.replaceChild(document.createTextNode(m.textContent), m);
      parent.normalize();
    });
  }

  function highlightMatches(root, term) {
    clearHighlights();
    if (!root || !term || term.length < 2) return;
    const safe = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const rx = new RegExp('(' + safe + ')', 'gi');
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode: node => {
        const p = node.parentNode;
        if (!p || /^(SCRIPT|STYLE|MARK|INPUT|TEXTAREA|SELECT|OPTION)$/.test(p.nodeName)) return NodeFilter.FILTER_REJECT;
        return rx.test(node.nodeValue) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
      }
    });
    const hits = [];
    let n;
    while ((n = walker.nextNode())) hits.push(n);
    hits.slice(0, 40).forEach(node => {
      const holder = document.createElement('span');
      holder.innerHTML = node.nodeValue.replace(rx, '<mark class="hl">$1</mark>');
      node.parentNode.replaceChild(holder, node);
    });
  }

  function searchIndex() {
    const lang = state.lang;
    const products = PRODUCTS.map(p => ({
      type: 'product', id: p.id, title: p.name[lang], sub: p.mat[lang], img: p.img,
      price: money(p.price),
      hay: (p.name[lang] + ' ' + p.desc[lang] + ' ' + p.mat[lang] + ' ' + t('shop.filter.' + p.cat)).toLowerCase()
    }));
    const sections = $$('main section[id]').map(sec => {
      const head = sec.querySelector('h1, h2');
      const text = (sec.textContent || '').replace(/\s+/g, ' ').trim();
      return {
        type: 'section', id: sec.id,
        title: head ? head.textContent.trim() : sec.id,
        sub: text.slice(0, 110) + '…',
        hay: text.toLowerCase()
      };
    });
    return { products: products, sections: sections };
  }

  function runSearch(term) {
    const box = $('#searchResults');
    const q = term.trim().toLowerCase();
    clearHighlights();
    if (q.length < 2) {
      box.innerHTML = '<p class="search-hint">' + t('md.search.hint') + '</p>';
      return;
    }
    const idx = searchIndex();
    const prods = idx.products.filter(p => p.hay.indexOf(q) > -1).slice(0, 6);
    const secs = idx.sections.filter(s => s.hay.indexOf(q) > -1).slice(0, 5);

    if (!prods.length && !secs.length) {
      box.innerHTML = '<p class="search-none">' + t('search.none') + '</p>';
      return;
    }

    let html = '';
    if (secs.length) {
      html += '<p class="search-group">' + t('search.pages') + '</p>' +
        secs.map(s =>
          '<button class="search-item" type="button" data-sec="' + s.id + '" data-term="' + q + '">' +
            '<span class="search-item__txt"><strong>' + s.title + '</strong><small>' + s.sub + '</small></span>' +
          '</button>').join('');
    }
    if (prods.length) {
      html += '<p class="search-group">' + t('search.products') + '</p>' +
        prods.map(p =>
          '<button class="search-item" type="button" data-prod="' + p.id + '">' +
            '<img src="' + p.img + '" alt="">' +
            '<span class="search-item__txt"><strong>' + p.title + '</strong><small>' + p.sub + '</small></span>' +
            '<span class="price">' + p.price + '</span>' +
          '</button>').join('');
    }
    box.innerHTML = html + '<p class="search-group">' + (prods.length + secs.length) + ' ' + t('search.found') + '</p>';
  }

  function initSearch() {
    const input = $('#searchInput'), box = $('#searchResults');
    let timer;
    input.addEventListener('input', () => {
      clearTimeout(timer);
      timer = setTimeout(() => runSearch(input.value), 180);
    });
    input.addEventListener('keydown', e => { if (e.key === 'Enter') e.preventDefault(); });

    box.addEventListener('click', e => {
      const sec = e.target.closest('[data-sec]');
      const prod = e.target.closest('[data-prod]');
      if (sec) {
        const id = sec.getAttribute('data-sec');
        const term = sec.getAttribute('data-term');
        closeModal('searchModal');
        scrollToSection('#' + id);
        setTimeout(() => highlightMatches(document.getElementById(id), term), 550);
      } else if (prod) {
        closeModal('searchModal');
        openQuickView(prod.getAttribute('data-prod'));
      }
    });
  }

  /* ---------------------------------------------------------
     14. Legal, cookies, formularios y avisos
  --------------------------------------------------------- */
  function openLegal(doc, toggleModal) {
    state.legalOpen = doc;
    $('#legalTitle').textContent = t('legal.' + doc + '.t');
    $('#legalBody').innerHTML = t('legal.' + doc + '.b');
    if (toggleModal !== false) openModal('legalModal');
  }

  function toast(msg) {
    const el = $('#toast');
    el.textContent = msg;
    el.classList.add('is-visible');
    clearTimeout(el._timer);
    el._timer = setTimeout(() => el.classList.remove('is-visible'), 2600);
  }

  function initLegalAndForms() {
    $$('[data-legal]').forEach(a => a.addEventListener('click', e => {
      e.preventDefault();
      openLegal(a.getAttribute('data-legal'));
    }));

    // Formulario de contacto
    $('#contactForm').addEventListener('submit', e => {
      e.preventDefault();
      const st = $('#cfStatus');
      const ok = $('#cfName').value.trim() && isEmail($('#cfEmail').value.trim()) &&
                 $('#cfMsg').value.trim() && $('#cfPriv').checked;
      ['#cfName', '#cfEmail', '#cfMsg'].forEach(sel => {
        const f = $(sel);
        markField(f, !f.value.trim() || (sel === '#cfEmail' && !isEmail(f.value.trim())));
      });
      st.className = 'form__status ' + (ok ? 'is-ok' : 'is-error');
      st.textContent = t(ok ? 'ct.ok' : 'ct.err');
      st.hidden = false;
      if (ok) { e.target.reset(); toast(t('ct.ok')); }
    });

    // Newsletter
    $('#newsForm').addEventListener('submit', e => {
      e.preventDefault();
      const input = $('#newsEmail'), st = $('#newsStatus');
      const ok = isEmail(input.value.trim());
      st.textContent = t(ok ? 'nl.ok' : 'nl.err');
      st.hidden = false;
      if (ok) { input.value = ''; toast(t('nl.ok')); }
    });

    // Login (preparado para conectar con el backend del cliente)
    $('#loginForm').addEventListener('submit', e => {
      e.preventDefault();
      const st = $('#lgStatus');
      const ok = isEmail($('#lgEmail').value.trim()) && $('#lgPass').value.length >= 6;
      st.className = 'form__status ' + (ok ? 'is-ok' : 'is-error');
      st.textContent = t(ok ? 'lg.ok' : 'lg.err');
      st.hidden = false;
      if (ok) { e.target.reset(); setTimeout(() => closeModal('loginModal'), 1600); }
    });

    // Aviso de cookies
    const bar = $('#cookieBar');
    let stored = null;
    try { stored = localStorage.getItem(STORE.cookies); } catch (e) {}
    if (!stored) setTimeout(() => { bar.hidden = false; }, 1200);
    $('#cookieAccept').addEventListener('click', () => {
      try { localStorage.setItem(STORE.cookies, 'accepted'); } catch (e) {}
      bar.hidden = true;
    });
    $('#cookieReject').addEventListener('click', () => {
      try { localStorage.setItem(STORE.cookies, 'rejected'); } catch (e) {}
      bar.hidden = true;
    });
  }

  /* ---------------------------------------------------------
     15. Vídeo del hero (con imagen de respaldo)
  --------------------------------------------------------- */
  function initHeroVideo() {
    const video = $('#heroVideo');
    if (!video) return;
    const reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) { video.removeAttribute('autoplay'); video.pause(); return; }
    video.addEventListener('canplay', () => document.body.classList.add('has-video'));
    video.addEventListener('error', () => document.body.classList.remove('has-video'));
  }

  /* ---------------------------------------------------------
     16. Selectores de idioma y tema + arranque
  --------------------------------------------------------- */
  function initSwitchers() {
    $$('.lang__btn').forEach(btn => btn.addEventListener('click', () => applyLanguage(btn.dataset.lang, true)));
    $('#themeBtn').addEventListener('click', () => {
      applyTheme(state.theme === 'dark' ? 'light' : 'dark', true);
    });
  }

  function init() {
    let lang = null;
    try { lang = localStorage.getItem(STORE.lang); } catch (e) {}
    initTheme();
    const browser = (navigator.language || 'es').slice(0, 2);
    applyLanguage(I18N[lang] ? lang : (browser === 'en' ? 'en' : 'es'), false);

    initNavigation();
    initMobileMenu();
    initModals();
    initReveal();
    initShop();
    initCart();
    initSearch();
    initLegalAndForms();
    initHeroVideo();
    initSwitchers();

    if (window.location.hash && document.querySelector(window.location.hash)) {
      setTimeout(() => scrollToSection(window.location.hash), 200);
    }
  }

  document.addEventListener('DOMContentLoaded', init);
})();
