/* ==========================================================================
   savia. — tienda de frescos, despensa, hogar y cuidado
   HTML + CSS + JavaScript puro. ES / EN / VAL · Modo claro y oscuro.
   ========================================================================== */

/* ---------- imágenes (Pexels) ---------- */
const img = (id, ext = "jpeg") =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.${ext}?auto=compress&cs=tinysrgb&fit=crop&w=900&h=900`;

const IMG = {
  avocado: img(4832407),
  banana: img(12436189),
  blueberries: img(33651543),
  bread: img(10640941),
  coffee: img(13741278),
  coffeeCup: img(18281417),
  containers: img(13969247),
  citronella: img(18066459),
  cleaning: img(18761051),
  eggs: img(4394258),
  freshMarket: img(15537200),
  fusilli: img(38802734),
  greenSpray: img(12997255),
  lemon: img(33504191, "png"),
  mixedFruit: img(12889634),
  mixedVegetables: img(39105767),
  onion: img(36188439),
  olive: img(28704676),
  pineapple: img(39648371),
  pastaIngredients: img(16620746),
  redApple: img(17975557),
  redChili: img(32446431),
  redContainers: img(13969208),
  soap: img(29502138),
  strawberry: img(33579054, "png"),
  tomato: img(4247701),
  skincare: img(20382236),
  skincareFlatlay: img(17307534),
  toothbrush: img(9157165),
};

/* ---------- 50 productos ---------- */
const PRODUCTS = [
  { id: 1, cat: "fresh", price: 2.49, rating: 4.9, badge: "season", img: IMG.tomato, n: { es: "Tomates en rama", en: "Vine tomatoes", val: "Tomàs de rama" }, d: { es: "500 g · cosecha local", en: "500 g · local harvest", val: "500 g · collita local" } },
  { id: 2, cat: "fresh", price: 3.79, rating: 4.8, badge: "favourite", img: IMG.strawberry, n: { es: "Fresas premium", en: "Premium strawberries", val: "Maduixes premium" }, d: { es: "250 g · dulces y jugosas", en: "250 g · sweet and juicy", val: "250 g · dolços i sucoses" } },
  { id: 3, cat: "fresh", price: 3.25, rating: 4.7, img: IMG.avocado, n: { es: "Aguacate hass", en: "Hass avocado", val: "Alvocat hass" }, d: { es: "2 unidades · en su punto", en: "2 units · perfectly ripe", val: "2 unitats · en el seu punt" } },
  { id: 4, cat: "fresh", price: 2.89, rating: 4.8, img: IMG.redApple, n: { es: "Manzana roja", en: "Red apple", val: "Poma roja" }, d: { es: "1 kg · crujiente y dulce", en: "1 kg · crisp and sweet", val: "1 kg · cruixent i dolça" } },
  { id: 5, cat: "fresh", price: 2.79, rating: 4.6, img: IMG.avocado, n: { es: "Manzana verde", en: "Green apple", val: "Poma verda" }, d: { es: "1 kg · granny smith", en: "1 kg · granny smith", val: "1 kg · granny smith" } },
  { id: 6, cat: "fresh", price: 1.99, rating: 4.9, badge: "bestPrice", img: IMG.banana, n: { es: "Plátano canario", en: "Canary banana", val: "Plàtan canari" }, d: { es: "1 kg · maduración natural", en: "1 kg · naturally ripened", val: "1 kg · maduració natural" } },
  { id: 7, cat: "fresh", price: 3.49, rating: 4.8, img: IMG.blueberries, n: { es: "Arándanos", en: "Blueberries", val: "Nabius" }, d: { es: "125 g · pequeños tesoros", en: "125 g · little treasures", val: "125 g · petits tresors" } },
  { id: 8, cat: "fresh", price: 1.69, rating: 4.7, img: IMG.lemon, n: { es: "Limón natural", en: "Fresh lemon", val: "Llimó natural" }, d: { es: "500 g · aroma intenso", en: "500 g · intense aroma", val: "500 g · aroma intens" } },
  { id: 9, cat: "fresh", price: 1.59, rating: 4.6, img: IMG.onion, n: { es: "Cebolla morada", en: "Red onion", val: "Ceba morada" }, d: { es: "500 g · sabor suave", en: "500 g · mild flavour", val: "500 g · sabor suau" } },
  { id: 10, cat: "fresh", price: 2.39, rating: 4.7, img: IMG.redChili, n: { es: "Pimiento rojo", en: "Red pepper", val: "Pebre roig" }, d: { es: "2 unidades · extra dulce", en: "2 units · extra sweet", val: "2 unitats · extra dolç" } },
  { id: 11, cat: "fresh", price: 3.19, rating: 4.8, badge: "ready", img: IMG.mixedVegetables, n: { es: "Verduras para saltear", en: "Stir-fry vegetables", val: "Verdures per a saltar" }, d: { es: "500 g · brócoli y zanahoria", en: "500 g · broccoli and carrot", val: "500 g · bròcoli i pastanaga" } },
  { id: 12, cat: "fresh", price: 3.99, rating: 4.7, img: IMG.pineapple, n: { es: "Piña dulce", en: "Sweet pineapple", val: "Pinya dolça" }, d: { es: "1 unidad · cortada a mano", en: "1 unit · hand cut", val: "1 unitat · tallada a mà" } },
  { id: 13, cat: "fresh", price: 4.49, rating: 4.9, badge: "selection", img: IMG.mixedFruit, n: { es: "Fruta de temporada", en: "Seasonal fruit", val: "Fruita de temporada" }, d: { es: "1 kg · selección del día", en: "1 kg · today's selection", val: "1 kg · selecció del dia" } },
  { id: 14, cat: "pantry", price: 1.49, rating: 4.8, badge: "essential", img: IMG.fusilli, n: { es: "Pasta fusilli", en: "Fusilli pasta", val: "Pasta fusilli" }, d: { es: "500 g · trigo duro", en: "500 g · durum wheat", val: "500 g · blat dur" } },
  { id: 15, cat: "pantry", price: 2.89, rating: 4.7, img: IMG.pastaIngredients, n: { es: "Arroz basmati", en: "Basmati rice", val: "Arròs basmati" }, d: { es: "1 kg · grano largo", en: "1 kg · long grain", val: "1 kg · gra llarg" } },
  { id: 16, cat: "pantry", price: 8.9, rating: 4.9, badge: "new", img: IMG.coffee, n: { es: "Café de especialidad", en: "Specialty coffee", val: "Café d'especialitat" }, d: { es: "250 g · tueste medio", en: "250 g · medium roast", val: "250 g · torrat mig" } },
  { id: 17, cat: "pantry", price: 6.75, rating: 4.8, img: IMG.coffeeCup, n: { es: "Café molido intenso", en: "Intense ground coffee", val: "Café mòlt intens" }, d: { es: "500 g · 100% arábica", en: "500 g · 100% arabica", val: "500 g · 100% aràbiga" } },
  { id: 18, cat: "pantry", price: 7.95, rating: 4.9, badge: "origin", img: IMG.pastaIngredients, n: { es: "Aceite de oliva virgen", en: "Extra virgin olive oil", val: "Oli d'oliva verge extra" }, d: { es: "750 ml · primera presión", en: "750 ml · first cold press", val: "750 ml · primera premsada" } },
  { id: 19, cat: "pantry", price: 2.65, rating: 4.6, img: IMG.olive, n: { es: "Aceitunas verdes", en: "Green olives", val: "Olives verdes" }, d: { es: "350 g · aliño suave", en: "350 g · mild marinade", val: "350 g · adob suau" } },
  { id: 20, cat: "pantry", price: 3.95, rating: 4.8, badge: "welfare", img: IMG.eggs, n: { es: "Huevos camperos", en: "Free-range eggs", val: "Ous de campera" }, d: { es: "12 unidades · clase A", en: "12 units · class A", val: "12 unitats · classe A" } },
  { id: 21, cat: "pantry", price: 1.35, rating: 4.6, img: IMG.pastaIngredients, n: { es: "Harina de trigo", en: "Wheat flour", val: "Farina de blat" }, d: { es: "1 kg · fuerza media", en: "1 kg · medium strength", val: "1 kg · força mitjana" } },
  { id: 22, cat: "pantry", price: 3.45, rating: 4.9, badge: "baked", img: IMG.bread, n: { es: "Pan de masa madre", en: "Sourdough bread", val: "Pa de massa mare" }, d: { es: "500 g · horneado hoy", en: "500 g · baked today", val: "500 g · fornat hui" } },
  { id: 23, cat: "pantry", price: 6.3, rating: 4.7, img: IMG.bread, n: { es: "Leche entera", en: "Whole milk", val: "Llet sencera" }, d: { es: "6 x 1 L · de pastoreo", en: "6 x 1 L · grass-fed", val: "6 x 1 L · de pastura" } },
  { id: 24, cat: "pantry", price: 2.2, rating: 4.8, img: IMG.blueberries, n: { es: "Avena integral", en: "Rolled oats", val: "Civada integral" }, d: { es: "500 g · desayuno fácil", en: "500 g · easy breakfast", val: "500 g · esmorzar fàcil" } },
  { id: 25, cat: "pantry", price: 1.95, rating: 4.7, img: IMG.tomato, n: { es: "Salsa de tomate", en: "Tomato sauce", val: "Salsa de tomàquet" }, d: { es: "350 g · receta casera", en: "350 g · homemade recipe", val: "350 g · recepta casolana" } },
  { id: 26, cat: "pantry", price: 4.85, rating: 4.8, badge: "noPalm", img: IMG.mixedFruit, n: { es: "Granola de almendra", en: "Almond granola", val: "Granola d'ametla" }, d: { es: "400 g · tostada al horno", en: "400 g · oven baked", val: "400 g · torrada al forn" } },
  { id: 27, cat: "home", price: 3.25, rating: 4.8, badge: "biodegradable", img: IMG.cleaning, n: { es: "Limpiador multiusos", en: "Multi-purpose cleaner", val: "Netejador multiusos" }, d: { es: "750 ml · aroma cítrico", en: "750 ml · citrus scent", val: "750 ml · aroma cítric" } },
  { id: 28, cat: "home", price: 2.79, rating: 4.7, img: IMG.greenSpray, n: { es: "Lavavajillas concentrado", en: "Concentrated dish soap", val: "Rentavaixella concentrat" }, d: { es: "500 ml · limón y menta", en: "500 ml · lemon and mint", val: "500 ml · llimó i menta" } },
  { id: 29, cat: "home", price: 7.49, rating: 4.6, badge: "rinse", img: IMG.cleaning, n: { es: "Detergente líquido", en: "Liquid detergent", val: "Detergent líquid" }, d: { es: "2 L · 30 lavados", en: "2 L · 30 washes", val: "2 L · 30 rentades" } },
  { id: 30, cat: "home", price: 3.6, rating: 4.8, badge: "plasticFree", img: IMG.toothbrush, n: { es: "Esponjas de fibra natural", en: "Natural fibre sponges", val: "Esponyes de fibra natural" }, d: { es: "3 unidades · sin plástico", en: "3 units · plastic free", val: "3 unitats · sense plàstic" } },
  { id: 31, cat: "home", price: 4.25, rating: 4.7, img: IMG.containers, n: { es: "Bolsas compostables", en: "Compostable bags", val: "Bosses compostables" }, d: { es: "20 unidades · cubo de 10 L", en: "20 units · 10 L bin", val: "20 unitats · cubell de 10 L" } },
  { id: 32, cat: "home", price: 4.9, rating: 4.6, img: IMG.cleaning, n: { es: "Paños de microfibra", en: "Microfibre cloths", val: "Draps de microfibra" }, d: { es: "4 unidades · multiuso", en: "4 units · multi-use", val: "4 unitats · multiusos" } },
  { id: 33, cat: "home", price: 3.15, rating: 4.7, img: IMG.containers, n: { es: "Papel de cocina", en: "Kitchen paper", val: "Paper de cuina" }, d: { es: "2 rollos · doble capa", en: "2 rolls · two-ply", val: "2 rotlles · doble capa" } },
  { id: 34, cat: "home", price: 2.49, rating: 4.5, img: IMG.redContainers, n: { es: "Servilletas recicladas", en: "Recycled napkins", val: "Napkins reciclades" }, d: { es: "50 unidades · 2 capas", en: "50 units · 2-ply", val: "50 unitats · 2 capes" } },
  { id: 35, cat: "home", price: 6.8, rating: 4.9, badge: "reusable", img: IMG.containers, n: { es: "Recipiente hermético", en: "Airtight container", val: "Recipient hermètic" }, d: { es: "1.2 L · vidrio resistente", en: "1.2 L · durable glass", val: "1.2 L · vidre resistent" } },
  { id: 36, cat: "home", price: 5.5, rating: 4.6, img: IMG.redContainers, n: { es: "Caja organizadora", en: "Storage box", val: "Capsa organitzadora" }, d: { es: "3 L · orden fácil", en: "3 L · easy order", val: "3 L · ordre fàcil" } },
  { id: 37, cat: "home", price: 5.95, rating: 4.8, badge: "naturalMaterial", img: IMG.toothbrush, n: { es: "Escobilla de bambú", en: "Bamboo brush", val: "Escobeta de bambú" }, d: { es: "1 unidad · mango natural", en: "1 unit · natural handle", val: "1 unitat · mànec natural" } },
  { id: 38, cat: "home", price: 8.5, rating: 4.7, img: IMG.citronella, n: { es: "Velas de soja cítricas", en: "Citrus soy candles", val: "Veles de soja cítriques" }, d: { es: "2 unidades · 20 h de aroma", en: "2 units · 20 h of scent", val: "2 unitats · 20 h d'aroma" } },
  { id: 39, cat: "care", price: 7.9, rating: 4.8, badge: "naturalFormula", img: IMG.skincare, n: { es: "Champú botánico", en: "Botanical shampoo", val: "Xampú botànic" }, d: { es: "400 ml · romero y limón", en: "400 ml · rosemary and lemon", val: "400 ml · romer i llimó" } },
  { id: 40, cat: "care", price: 8.2, rating: 4.7, img: IMG.skincareFlatlay, n: { es: "Acondicionador nutritivo", en: "Nourishing conditioner", val: "Condicionador nutritiu" }, d: { es: "400 ml · avena y aloe", en: "400 ml · oat and aloe", val: "400 ml · civada i alvocat" } },
  { id: 41, cat: "care", price: 5.95, rating: 4.8, img: IMG.soap, n: { es: "Gel de ducha de avena", en: "Oat shower gel", val: "Gel de dutxa de civada" }, d: { es: "500 ml · piel sensible", en: "500 ml · sensitive skin", val: "500 ml · pell sensible" } },
  { id: 42, cat: "care", price: 12.9, rating: 4.9, badge: "bestSeller", img: IMG.skincare, n: { es: "Crema hidratante facial", en: "Facial moisturiser", val: "Crema hidratant facial" }, d: { es: "50 ml · textura ligera", en: "50 ml · light texture", val: "50 ml · textura lleugera" } },
  { id: 43, cat: "care", price: 14.5, rating: 4.8, badge: "new", img: IMG.skincareFlatlay, n: { es: "Sérum de vitamina C", en: "Vitamin C serum", val: "Sèrum de vitamina C" }, d: { es: "30 ml · luminosidad", en: "30 ml · radiance", val: "30 ml · luminositat" } },
  { id: 44, cat: "care", price: 4.2, rating: 4.7, badge: "zeroWaste", img: IMG.soap, n: { es: "Jabón sólido de karité", en: "Shea butter soap", val: "Sabó sòlid de karité" }, d: { es: "100 g · sin envase plástico", en: "100 g · plastic-free pack", val: "100 g · sense envàs de plàstic" } },
  { id: 45, cat: "care", price: 4.75, rating: 4.6, img: IMG.toothbrush, n: { es: "Pasta dental de menta", en: "Mint toothpaste", val: "Pasta dental de menta" }, d: { es: "75 ml · con flúor", en: "75 ml · with fluoride", val: "75 ml · amb fluor" } },
  { id: 46, cat: "care", price: 3.9, rating: 4.8, badge: "bamboo", img: IMG.toothbrush, n: { es: "Cepillo dental de bambú", en: "Bamboo toothbrush", val: "Raspall de dents de bambú" }, d: { es: "1 unidad · cerdas suaves", en: "1 unit · soft bristles", val: "1 unitat · truges suaus" } },
  { id: 47, cat: "care", price: 6.5, rating: 4.7, img: IMG.skincareFlatlay, n: { es: "Desodorante mineral", en: "Mineral deodorant", val: "Desodorant mineral" }, d: { es: "50 ml · sin aluminio", en: "50 ml · aluminium free", val: "50 ml · sense alumini" } },
  { id: 48, cat: "care", price: 13.95, rating: 4.9, badge: "highProtection", img: IMG.skincare, n: { es: "Protector solar SPF 50", en: "Sunscreen SPF 50", val: "Protector solar SPF 50" }, d: { es: "50 ml · rostro y cuerpo", en: "50 ml · face and body", val: "50 ml · rostre i cos" } },
  { id: 49, cat: "care", price: 9.8, rating: 4.8, img: IMG.skincareFlatlay, n: { es: "Mascarilla facial de arcilla", en: "Clay face mask", val: "Màscara facial d'argila" }, d: { es: "100 ml · limpieza suave", en: "100 ml · gentle cleanse", val: "100 ml · neteja suau" } },
  { id: 50, cat: "care", price: 6.9, rating: 4.7, img: IMG.soap, n: { es: "Crema de manos de almendra", en: "Almond hand cream", val: "Crema de mans d'ametla" }, d: { es: "75 ml · absorción rápida", en: "75 ml · fast absorbing", val: "75 ml · absorció ràpida" } },
];

/* ---------- traducciones de interfaz ---------- */
const I18N = {
  es: {
    "a11y.skip": "Saltar al catálogo",
    "nav.catalog": "Catálogo",
    "nav.essence": "Nuestra esencia",
    "nav.how": "Cómo funciona",
    "search.placeholder": "Buscar productos",
    "theme.light": "Modo claro",
    "theme.dark": "Modo oscuro",
    "cart.short": "Mi cesta",
    "hero.eyebrow": "Compra con sentido",
    "hero.title": "Todo lo que tu casa necesita, en una sola cesta.",
    "hero.text": "Productos honestos, ingredientes de temporada y pequeños rituales para vivir mejor cada día.",
    "hero.cta1": "Explorar la selección",
    "hero.cta2": "Ver frescos",
    "hero.scroll": "La compra cotidiana, mejor elegida",
    "cats.eyebrow": "Compra por categoría",
    "cats.count": "productos en la selección",
    "cat.all": "Todos",
    "cat.fresh": "Frescos",
    "cat.pantry": "Despensa",
    "cat.home": "Hogar",
    "cat.care": "Cuidado",
    "cat.favs": "Favoritos",
    "cat.fresh.d": "Del mercado a tu mesa",
    "cat.pantry.d": "Los básicos que sostienen",
    "cat.home.d": "Orden que se nota",
    "cat.care.d": "Pequeños rituales diarios",
    "catalog.eyebrow": "La selección savia",
    "catalog.title": "Elige con calma.",
    "catalog.text": "50 productos escogidos para llenar tu despensa, cuidar tu casa y disfrutar lo sencillo.",
    "catalog.sort": "Ordenar por",
    "sort.featured": "Recomendados",
    "sort.asc": "Precio: menor a mayor",
    "sort.desc": "Precio: mayor a menor",
    "catalog.results": "resultados",
    "catalog.foot": "50 productos para empezar bien",
    "card.add": "Añadir",
    "card.addToCart": "Añadir a la cesta",
    "card.reduce": "Reducir cantidad",
    "card.increase": "Aumentar cantidad",
    "card.favOn": "Guardar en favoritos",
    "card.favOff": "Quitar de favoritos",
    "search.emptyTitle": "No encontramos ese producto.",
    "search.emptyText": "Prueba con otra palabra o vuelve a ver toda la selección.",
    "search.emptyCta": "Limpiar búsqueda",
    "fav.emptyTitle": "Aún no tienes favoritos.",
    "fav.emptyText": "Pulsa el corazón de un producto para guardarlo aquí.",
    "fav.emptyCta": "Ver todos",
    "essence.eyebrow": "Nuestra esencia",
    "essence.title": "Menos ruido. Más cosas buenas.",
    "essence.text": "Savia reúne marcas cercanas, fórmulas simples y alimentos que saben a lo que son. Sin vueltas, sin compras imposibles.",
    "essence.f1t": "Buena selección",
    "essence.f1d": "Solo lo que volveríamos a comprar.",
    "essence.f2t": "Más natural",
    "essence.f2d": "Ingredientes claros y menos residuos.",
    "essence.f3t": "A tu ritmo",
    "essence.f3d": "Entrega flexible, sin complicaciones.",
    "how.eyebrow": "Cómo funciona",
    "how.title": "Tres pasos y listo.",
    "how.s1t": "Elige",
    "how.s1d": "Recorre los 50 productos, filtra por categoría y guarda tus favoritos.",
    "how.s2t": "Recibe",
    "how.s2d": "Preparamos tu cesta y la llevamos en la franja horaria que prefieras.",
    "how.s3t": "Disfruta",
    "how.s3d": "Ingredientes claros, envases responsables y más tiempo para ti.",
    "footer.tagline": "Una compra más consciente empieza por elegir mejor.",
    "footer.images": "Imágenes de producto: Pexels",
    "cart.eyebrow": "Tu selección",
    "cart.title": "Mi cesta",
    "cart.close": "Cerrar cesta",
    "cart.emptyTitle": "Tu cesta está vacía",
    "cart.emptyText": "Añade algo rico para empezar tu próxima compra.",
    "cart.emptyCta": "Ver productos",
    "cart.remove": "Eliminar",
    "cart.subtotal": "Subtotal",
    "cart.total": "Total estimado",
    "cart.checkout": "Continuar con la compra",
    "cart.shipping": "Envío gratis desde 45 €",
    "toast.added": "añadido a tu cesta",
    "toast.removed": "eliminado de tu cesta",
    "toast.favOn": "guardado en favoritos",
    "toast.favOff": "quitado de favoritos",
    "toast.checkout": "El checkout estará disponible muy pronto",
    "badge.season": "De temporada",
    "badge.favourite": "Favorito",
    "badge.bestPrice": "Mejor precio",
    "badge.ready": "Listo para cocinar",
    "badge.selection": "Selección Savia",
    "badge.essential": "Imprescindible",
    "badge.new": "Nuevo",
    "badge.origin": "Origen local",
    "badge.welfare": "Bienestar animal",
    "badge.baked": "Horneado hoy",
    "badge.noPalm": "Sin aceite de palma",
    "badge.biodegradable": "Biodegradable",
    "badge.plasticFree": "Sin plástico",
    "badge.rinse": "Rinde más",
    "badge.reusable": "Reutilizable",
    "badge.naturalMaterial": "Material natural",
    "badge.naturalFormula": "Fórmula natural",
    "badge.bestSeller": "Más vendido",
    "badge.zeroWaste": "Cero residuos",
    "badge.bamboo": "Bambú",
    "badge.highProtection": "Protección alta",
  },
  en: {
    "a11y.skip": "Skip to the catalogue",
    "nav.catalog": "Catalogue",
    "nav.essence": "Our essence",
    "nav.how": "How it works",
    "search.placeholder": "Search products",
    "theme.light": "Light mode",
    "theme.dark": "Dark mode",
    "cart.short": "My basket",
    "hero.eyebrow": "Shop with purpose",
    "hero.title": "Everything your home needs, in a single basket.",
    "hero.text": "Honest products, seasonal ingredients and small rituals to live a little better every day.",
    "hero.cta1": "Explore the selection",
    "hero.cta2": "See fresh produce",
    "hero.scroll": "Everyday shopping, better chosen",
    "cats.eyebrow": "Shop by category",
    "cats.count": "products in the selection",
    "cat.all": "All",
    "cat.fresh": "Fresh",
    "cat.pantry": "Pantry",
    "cat.home": "Home",
    "cat.care": "Personal care",
    "cat.favs": "Favourites",
    "cat.fresh.d": "From the market to your table",
    "cat.pantry.d": "The basics that hold it all",
    "cat.home.d": "Order you can feel",
    "cat.care.d": "Small daily rituals",
    "catalog.eyebrow": "The savia selection",
    "catalog.title": "Choose at your own pace.",
    "catalog.text": "50 products chosen to stock your pantry, care for your home and enjoy the simple things.",
    "catalog.sort": "Sort by",
    "sort.featured": "Featured",
    "sort.asc": "Price: low to high",
    "sort.desc": "Price: high to low",
    "catalog.results": "results",
    "catalog.foot": "50 products to start well",
    "card.add": "Add",
    "card.addToCart": "Add to basket",
    "card.reduce": "Decrease quantity",
    "card.increase": "Increase quantity",
    "card.favOn": "Save to favourites",
    "card.favOff": "Remove from favourites",
    "search.emptyTitle": "We couldn't find that product.",
    "search.emptyText": "Try another word or come back to the full selection.",
    "search.emptyCta": "Clear search",
    "fav.emptyTitle": "No favourites yet.",
    "fav.emptyText": "Tap the heart on a product to keep it here.",
    "fav.emptyCta": "Show all",
    "essence.eyebrow": "Our essence",
    "essence.title": "Less noise. More good things.",
    "essence.text": "Savia brings together nearby makers, simple formulas and food that tastes like what it is. No fuss, no impossible shops.",
    "essence.f1t": "Good selection",
    "essence.f1d": "Only what we would buy again.",
    "essence.f2t": "More natural",
    "essence.f2d": "Clear ingredients and less waste.",
    "essence.f3t": "At your pace",
    "essence.f3d": "Flexible delivery, no complications.",
    "how.eyebrow": "How it works",
    "how.title": "Three steps and done.",
    "how.s1t": "Choose",
    "how.s1d": "Browse the 50 products, filter by category and save your favourites.",
    "how.s2t": "Receive",
    "how.s2d": "We prepare your basket and deliver it in the time slot you prefer.",
    "how.s3t": "Enjoy",
    "how.s3d": "Clear ingredients, responsible packaging and more time for you.",
    "footer.tagline": "A more conscious shop starts with better choices.",
    "footer.images": "Product photography: Pexels",
    "cart.eyebrow": "Your selection",
    "cart.title": "My basket",
    "cart.close": "Close basket",
    "cart.emptyTitle": "Your basket is empty",
    "cart.emptyText": "Add something tasty to start your next shop.",
    "cart.emptyCta": "Browse products",
    "cart.remove": "Remove",
    "cart.subtotal": "Subtotal",
    "cart.total": "Estimated total",
    "cart.checkout": "Continue to checkout",
    "cart.shipping": "Free delivery from €45",
    "toast.added": "added to your basket",
    "toast.removed": "removed from your basket",
    "toast.favOn": "saved to favourites",
    "toast.favOff": "removed from favourites",
    "toast.checkout": "Checkout will be available very soon",
    "badge.season": "In season",
    "badge.favourite": "Favourite",
    "badge.bestPrice": "Best price",
    "badge.ready": "Ready to cook",
    "badge.selection": "Savia pick",
    "badge.essential": "Essential",
    "badge.new": "New",
    "badge.origin": "Local origin",
    "badge.welfare": "Animal welfare",
    "badge.baked": "Baked today",
    "badge.noPalm": "No palm oil",
    "badge.biodegradable": "Biodegradable",
    "badge.plasticFree": "Plastic free",
    "badge.rinse": "Goes further",
    "badge.reusable": "Reusable",
    "badge.naturalMaterial": "Natural material",
    "badge.naturalFormula": "Natural formula",
    "badge.bestSeller": "Best seller",
    "badge.zeroWaste": "Zero waste",
    "badge.bamboo": "Bamboo",
    "badge.highProtection": "High protection",
  },
  val: {
    "a11y.skip": "Salta al catàleg",
    "nav.catalog": "Catàleg",
    "nav.essence": "La nostra essència",
    "nav.how": "Com funciona",
    "search.placeholder": "Buscar productes",
    "theme.light": "Mode clar",
    "theme.dark": "Mode fosc",
    "cart.short": "La meua cistella",
    "hero.eyebrow": "Compra amb sentit",
    "hero.title": "Tot el que la teua casa necessita, en una sola cistella.",
    "hero.text": "Productes honestos, ingredients de temporada i xicotets rituals per a viure millor cada dia.",
    "hero.cta1": "Explorar la selecció",
    "hero.cta2": "Vore frescos",
    "hero.scroll": "La compra diària, millor triada",
    "cats.eyebrow": "Compra per categoria",
    "cats.count": "productes en la selecció",
    "cat.all": "Tots",
    "cat.fresh": "Frescos",
    "cat.pantry": "Rebost",
    "cat.home": "Llar",
    "cat.care": "Cura personal",
    "cat.favs": "Favorits",
    "cat.fresh.d": "Del mercat a la teua taula",
    "cat.pantry.d": "El bàsic que ho sosté tot",
    "cat.home.d": "Ordre que es nota",
    "cat.care.d": "Xicotets rituals diaris",
    "catalog.eyebrow": "La selecció savia",
    "catalog.title": "Tria amb calma.",
    "catalog.text": "50 productes triats per a omplir el rebost, cuidar la casa i disfrutar de lo senzill.",
    "catalog.sort": "Ordenar per",
    "sort.featured": "Recomanats",
    "sort.asc": "Preu: menor a major",
    "sort.desc": "Preu: major a menor",
    "catalog.results": "resultats",
    "catalog.foot": "50 productes per a començar bé",
    "card.add": "Afegir",
    "card.addToCart": "Afegir a la cistella",
    "card.reduce": "Reduir quantitat",
    "card.increase": "Augmentar quantitat",
    "card.favOn": "Guardar en favorits",
    "card.favOff": "Traure de favorits",
    "search.emptyTitle": "No hem trobat eixe producte.",
    "search.emptyText": "Prova amb una altra paraula o torna a vore tota la selecció.",
    "search.emptyCta": "Netejar la busca",
    "fav.emptyTitle": "Encara no tens favorits.",
    "fav.emptyText": "Pulsa el cor d'un producte per a guardar-lo ací.",
    "fav.emptyCta": "Vore tots",
    "essence.eyebrow": "La nostra essència",
    "essence.title": "Menys soroll. Més coses bones.",
    "essence.text": "Savia aplega marques pròximes, fórmules senzilles i aliments que saben al que són. Sense embuts, sense compres impossibles.",
    "essence.f1t": "Bona selecció",
    "essence.f1d": "Només el que tornaríem a comprar.",
    "essence.f2t": "Més natural",
    "essence.f2d": "Ingredients clars i menys residus.",
    "essence.f3t": "Al teu ritme",
    "essence.f3d": "Lliurament flexible, sense complicacions.",
    "how.eyebrow": "Com funciona",
    "how.title": "Tres passos i llest.",
    "how.s1t": "Tria",
    "how.s1d": "Recorre els 50 productes, filtra per categoria i guarda els teus favorits.",
    "how.s2t": "Rep",
    "how.s2d": "Preparem la teua cistella i la portem en la franja que preferisques.",
    "how.s3t": "Disfruta",
    "how.s3d": "Ingredients clars, envasos responsables i més temps per a tu.",
    "footer.tagline": "Una compra més conscient comença per triar millor.",
    "footer.images": "Imatges de producte: Pexels",
    "cart.eyebrow": "La teua selecció",
    "cart.title": "La meua cistella",
    "cart.close": "Tancar cistella",
    "cart.emptyTitle": "La teua cistella està buida",
    "cart.emptyText": "Afig alguna cosa bona per a començar la pròxima compra.",
    "cart.emptyCta": "Vore productes",
    "cart.remove": "Eliminar",
    "cart.subtotal": "Subtotal",
    "cart.total": "Total estimat",
    "cart.checkout": "Continuar amb la compra",
    "cart.shipping": "Enviament gratuït des de 45 €",
    "toast.added": "afegit a la teua cistella",
    "toast.removed": "eliminat de la teua cistella",
    "toast.favOn": "guardat en favorits",
    "toast.favOff": "tret de favorits",
    "toast.checkout": "El pagament estarà disponible molt prompte",
    "badge.season": "De temporada",
    "badge.favourite": "Favorit",
    "badge.bestPrice": "Millor preu",
    "badge.ready": "Llest per a cuinar",
    "badge.selection": "Selecció Savia",
    "badge.essential": "Imprescindible",
    "badge.new": "Nou",
    "badge.origin": "Origen local",
    "badge.welfare": "Benestar animal",
    "badge.baked": "Fornat hui",
    "badge.noPalm": "Sense oli de palma",
    "badge.biodegradable": "Biodegradable",
    "badge.plasticFree": "Sense plàstic",
    "badge.rinse": "Rendeix més",
    "badge.reusable": "Reutilitzable",
    "badge.naturalMaterial": "Material natural",
    "badge.naturalFormula": "Fórmula natural",
    "badge.bestSeller": "Més venut",
    "badge.zeroWaste": "Residu zero",
    "badge.bamboo": "Bambú",
    "badge.highProtection": "Protecció alta",
  },
};

/* ---------- estado ---------- */
const LOCALES = { es: "es-ES", en: "en-GB", val: "ca-ES" };

const store = {
  read(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (e) {
      return fallback;
    }
  },
  write(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {}
  },
};

const state = {
  lang: localStorage.getItem("savia-lang") || "es",
  theme: document.documentElement.dataset.theme || "light",
  category: "all",
  sort: "featured",
  search: "",
  cart: store.read("savia-cart", {}),
  favorites: new Set(store.read("savia-favs", [])),
};

if (!I18N[state.lang]) state.lang = "es";

/* ---------- utilidades ---------- */
const t = (key) => I18N[state.lang][key] || I18N.es[key] || key;

const money = (value) =>
  new Intl.NumberFormat(LOCALES[state.lang], { style: "currency", currency: "EUR" }).format(value);

const byId = (id) => PRODUCTS.find((product) => product.id === Number(id));

const svg = {
  heart: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20.8 8.9c0 5.5-8.8 10.1-8.8 10.1S3.2 14.4 3.2 8.9A4.5 4.5 0 0 1 12 6.7a4.5 4.5 0 0 1 8.8 2.2Z"/></svg>',
  heartFill: '<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round" aria-hidden="true"><path d="M20.8 8.9c0 5.5-8.8 10.1-8.8 10.1S3.2 14.4 3.2 8.9A4.5 4.5 0 0 1 12 6.7a4.5 4.5 0 0 1 8.8 2.2Z"/></svg>',
  plus: '<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>',
  minus: '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" aria-hidden="true"><path d="M5 12h14"/></svg>',
  star: '<svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor" aria-hidden="true"><path d="m12 3 2.6 5.6 6.1.8-4.5 4.2 1.2 6-5.4-3-5.4 3 1.2-6L3.3 9.4l6.1-.8L12 3Z"/></svg>',
  check: '<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m5 12 4 4L19 6"/></svg>',
  bag: '<svg viewBox="0 0 24 24" width="27" height="27" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 8h14l-1 12H6L5 8Z"/><path d="M9 9V6a3 3 0 0 1 6 0v3"/></svg>',
};

function qtyControl(product, compact = false) {
  const quantity = state.cart[product.id] || 0;
  return `<div class="qty${compact ? " compact" : ""}">
    <button type="button" data-action="decrease" data-id="${product.id}" aria-label="${t("card.reduce")}">${svg.minus}</button>
    <span>${quantity}</span>
    <button type="button" data-action="increase" data-id="${product.id}" aria-label="${t("card.increase")}">${svg.plus}</button>
  </div>`;
}

/* ---------- render de productos ---------- */
function visibleProducts() {
  const query = state.search.trim().toLowerCase();
  const list = PRODUCTS.filter((product) => {
    const matchesCategory =
      state.category === "all" ||
      (state.category === "favs" ? state.favorites.has(product.id) : product.cat === state.category);
    const haystack = `${product.n[state.lang]} ${product.n.es} ${product.d[state.lang]} ${product.cat}`.toLowerCase();
    return matchesCategory && (!query || haystack.includes(query));
  });
  if (state.sort === "asc") return list.sort((a, b) => a.price - b.price);
  if (state.sort === "desc") return list.sort((a, b) => b.price - a.price);
  return list;
}

function renderProducts() {
  const grid = document.getElementById("productGrid");
  const empty = document.getElementById("emptyState");
  const list = visibleProducts();

  document.getElementById("resultsCount").textContent = list.length;
  empty.hidden = list.length > 0;
  grid.hidden = list.length === 0;

  const emptyTitle = empty.querySelector("h3");
  const emptyText = empty.querySelector("p");
  const emptyCta = empty.querySelector("[data-action='clear-search']");
  const isFavs = state.category === "favs" && state.favorites.size === 0;
  emptyTitle.textContent = t(isFavs ? "fav.emptyTitle" : "search.emptyTitle");
  emptyText.textContent = t(isFavs ? "fav.emptyText" : "search.emptyText");
  emptyCta.textContent = t(isFavs ? "fav.emptyCta" : "search.emptyCta");

  grid.innerHTML = list
    .map((product, index) => {
      const quantity = state.cart[product.id] || 0;
      const favourite = state.favorites.has(product.id);
      const badge = product.badge ? `<span class="badge">${t("badge." + product.badge)}</span>` : "";
      return `<article class="card" style="animation-delay:${Math.min(index * 32, 420)}ms">
        <div class="card-media">
          <img src="${product.img}" alt="${product.n[state.lang]}" loading="lazy" />
          ${badge}
          <button type="button" class="fav-btn${favourite ? " is-active" : ""}" data-action="fav" data-id="${product.id}" aria-label="${favourite ? t("card.favOff") : t("card.favOn")}">${favourite ? svg.heartFill : svg.heart}</button>
          <div class="card-quick">
            ${quantity > 0 ? qtyControl(product, true) : `<button type="button" class="quick-add" data-action="increase" data-id="${product.id}">${t("card.add")} ${svg.plus}</button>`}
          </div>
        </div>
        <div class="card-top">
          <h3 class="card-name">${product.n[state.lang]}</h3>
          <span class="card-price">${money(product.price)}</span>
        </div>
        <p class="card-detail">${product.d[state.lang]}</p>
        <div class="card-foot">
          <span class="rating">${svg.star} ${product.rating.toFixed(1)}</span>
          ${quantity > 0 ? qtyControl(product) : `<button type="button" class="card-add" data-action="increase" data-id="${product.id}">${t("card.addToCart")}</button>`}
        </div>
      </article>`;
    })
    .join("");
}

/* ---------- cesta ---------- */
function cartEntries() {
  return PRODUCTS.filter((product) => state.cart[product.id] > 0).map((product) => ({
    product,
    quantity: state.cart[product.id],
  }));
}

function renderCart() {
  const entries = cartEntries();
  const body = document.getElementById("cartItems");
  const foot = document.getElementById("cartFoot");
  const count = entries.reduce((sum, entry) => sum + entry.quantity, 0);
  const total = entries.reduce((sum, entry) => sum + entry.product.price * entry.quantity, 0);

  document.getElementById("cartCount").textContent = count;
  document.getElementById("cartCountLabel").textContent = count;

  if (entries.length === 0) {
    foot.hidden = true;
    body.innerHTML = `<div class="cart-empty">
      <span class="pill-icon">${svg.bag}</span>
      <h3>${t("cart.emptyTitle")}</h3>
      <p>${t("cart.emptyText")}</p>
      <button type="button" class="link-btn" data-action="close-cart">${t("cart.emptyCta")}</button>
    </div>`;
    return;
  }

  foot.hidden = false;
  body.innerHTML = entries
    .map(({ product, quantity }) => `<div class="cart-row">
        <img src="${product.img}" alt="${product.n[state.lang]}" />
        <div class="cart-row-main">
          <div class="cart-row-top">
            <p class="cart-row-name">${product.n[state.lang]}</p>
            <span class="cart-row-price">${money(product.price * quantity)}</span>
          </div>
          <p class="cart-row-detail">${product.d[state.lang]}</p>
          <div class="cart-row-actions">
            ${qtyControl(product)}
            <button type="button" class="remove-btn" data-action="remove" data-id="${product.id}">${t("cart.remove")}</button>
          </div>
        </div>
      </div>`)
    .join("");

  document.getElementById("cartSubtotal").textContent = money(total);
  document.getElementById("cartTotal").textContent = money(total);
}

/* ---------- textos estáticos ---------- */
function renderStatic() {
  document.documentElement.lang = state.lang === "val" ? "ca" : state.lang;

  document.querySelectorAll("[data-i18n]").forEach((node) => {
    node.textContent = t(node.dataset.i18n);
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((node) => {
    node.setAttribute("placeholder", t(node.dataset.i18nPlaceholder));
    node.setAttribute("aria-label", t(node.dataset.i18nPlaceholder));
  });
  document.querySelectorAll("[data-i18n-aria]").forEach((node) => {
    node.setAttribute("aria-label", t(node.dataset.i18nAria));
  });

  document.querySelectorAll(".lang-btn").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.lang === state.lang);
    button.setAttribute("aria-pressed", String(button.dataset.lang === state.lang));
  });

  const themeButton = document.getElementById("themeToggle");
  themeButton.setAttribute("aria-label", state.theme === "dark" ? t("theme.light") : t("theme.dark"));

  document.querySelectorAll("[data-count]").forEach((node) => {
    const key = node.dataset.count;
    node.textContent =
      key === "all"
        ? PRODUCTS.length
        : key === "favs"
          ? state.favorites.size
          : PRODUCTS.filter((product) => product.cat === key).length;
  });
  document.getElementById("totalProducts").textContent = PRODUCTS.length;

  document.querySelectorAll("#filterTabs button").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.cat === state.category);
    button.setAttribute("aria-pressed", String(button.dataset.cat === state.category));
  });
}

function renderAll() {
  renderStatic();
  renderProducts();
  renderCart();
}

/* ---------- avisos ---------- */
let toastTimer = null;
function showToast(message) {
  const toast = document.getElementById("toast");
  toast.innerHTML = `<span class="check">${svg.check}</span><span>${message}</span>`;
  toast.hidden = false;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.hidden = true;
  }, 2600);
}

function saveCart() {
  store.write("savia-cart", state.cart);
}

/* ---------- eventos ---------- */
document.addEventListener("click", (event) => {
  const trigger = event.target.closest("[data-action]");
  if (!trigger) return;

  const action = trigger.dataset.action;
  const product = trigger.dataset.id ? byId(trigger.dataset.id) : null;

  if (action === "increase" && product) {
    state.cart[product.id] = (state.cart[product.id] || 0) + 1;
    saveCart();
    renderProducts();
    renderCart();
    showToast(`${product.n[state.lang]} · ${t("toast.added")}`);
  }

  if (action === "decrease" && product) {
    const next = (state.cart[product.id] || 0) - 1;
    if (next <= 0) {
      delete state.cart[product.id];
      showToast(`${product.n[state.lang]} · ${t("toast.removed")}`);
    } else {
      state.cart[product.id] = next;
    }
    saveCart();
    renderProducts();
    renderCart();
  }

  if (action === "remove" && product) {
    delete state.cart[product.id];
    saveCart();
    renderProducts();
    renderCart();
    showToast(`${product.n[state.lang]} · ${t("toast.removed")}`);
  }

  if (action === "fav" && product) {
    const added = !state.favorites.has(product.id);
    if (added) state.favorites.add(product.id);
    else state.favorites.delete(product.id);
    store.write("savia-favs", Array.from(state.favorites));
    renderProducts();
    showToast(`${product.n[state.lang]} · ${t(added ? "toast.favOn" : "toast.favOff")}`);
  }

  if (action === "set-category") {
    state.category = trigger.dataset.cat;
    renderAll();
    document.getElementById("catalogo").scrollIntoView({ behavior: "smooth", block: "start" });
  }

  if (action === "set-lang") {
    state.lang = trigger.dataset.lang;
    localStorage.setItem("savia-lang", state.lang);
    renderAll();
  }

  if (action === "toggle-theme") {
    state.theme = state.theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = state.theme;
    localStorage.setItem("savia-theme", state.theme);
    renderStatic();
  }

  if (action === "open-cart") {
    document.getElementById("cartDrawer").hidden = false;
    document.body.style.overflow = "hidden";
  }

  if (action === "close-cart") {
    document.getElementById("cartDrawer").hidden = true;
    document.body.style.overflow = "";
  }

  if (action === "checkout") {
    showToast(t("toast.checkout"));
  }

  if (action === "clear-search") {
    state.search = "";
    state.category = "all";
    document.getElementById("searchInput").value = "";
    document.getElementById("searchInputMobile").value = "";
    renderAll();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    const drawer = document.getElementById("cartDrawer");
    if (!drawer.hidden) {
      drawer.hidden = true;
      document.body.style.overflow = "";
    }
  }
});

function onSearchInput(event) {
  state.search = event.target.value;
  const other = event.target.id === "searchInput" ? "searchInputMobile" : "searchInput";
  document.getElementById(other).value = state.search;
  renderProducts();
}

document.getElementById("searchInput").addEventListener("input", onSearchInput);
document.getElementById("searchInputMobile").addEventListener("input", onSearchInput);

document.getElementById("sortSelect").addEventListener("change", (event) => {
  state.sort = event.target.value;
  renderProducts();
});

renderAll();
