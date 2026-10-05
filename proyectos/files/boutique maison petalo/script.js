/* =========================================================
   Maison Pétalo — Lógica de la boutique
   Scroll, tema, menú, búsqueda, i18n y carrito completo
   ========================================================= */

(function () {
  "use strict";

  const FREE_SHIPPING = 60;
  const SHIPPING_COST = 4.9;
  const STORAGE_CART = "mp-cart";
  const STORAGE_THEME = "mp-theme";
  const STORAGE_LANG = "mp-lang";
  const STORAGE_COOKIE = "mp-cookie";

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  /* ---------- Catálogo (20 prendas) ---------- */
  const PRODUCTS = [
    {
      id: 1, sku: "MP-V01", cat: "nina", type: "vestido", price: 49.9, compare: 0, stock: 8,
      sizes: ["2", "3", "4", "5", "6", "8"],
      img: "https://images.pexels.com/photos/32525220/pexels-photo-32525220.jpeg?auto=compress&cs=tinysrgb&w=900",
      name: { es: "Vestido Pétalo Rosa", en: "Pink Petal Dress", va: "Vestit Pètal Rosa" },
      desc: {
        es: "Vestido de ceremonia en crepé rosa con lazo. Forro de algodón y cierre posterior invisible.",
        en: "Ceremony dress in rose crepe with a bow. Cotton lining and hidden back zip.",
        va: "Vestit de cerimònia en crespó rosa amb llaç. Folre de cotó i cremallera posterior invisible."
      }
    },
    {
      id: 2, sku: "MP-V02", cat: "nina", type: "vestido", price: 89.9, compare: 0, stock: 5,
      sizes: ["3", "4", "5", "6", "8", "10"],
      img: "https://images.pexels.com/photos/14238124/pexels-photo-14238124.jpeg?auto=compress&cs=tinysrgb&w=900",
      name: { es: "Vestido Ceremonia Marfil", en: "Ivory Ceremony Dress", va: "Vestit Cerimònia Marfil" },
      desc: {
        es: "Tul marfil y cintura marcada. Ideal para bodas, comuniones y días que se recuerdan.",
        en: "Ivory tulle with a defined waist. Made for weddings, communions and keepsake days.",
        va: "Tul marfil i cintura marcada. Ideal per a bodes, comunions i dies que es recorden."
      }
    },
    {
      id: 3, sku: "MP-V03", cat: "nina", type: "vestido", price: 54.9, compare: 64.9, stock: 10,
      sizes: ["2", "3", "4", "5", "6"],
      img: "https://images.pexels.com/photos/20433618/pexels-photo-20433618.jpeg?auto=compress&cs=tinysrgb&w=900",
      name: { es: "Vestido Sol de Otoño", en: "Autumn Sun Dress", va: "Vestit Sol de Tardor" },
      desc: {
        es: "Algodón mostaza con vuelo suave. Bolsillos laterales y lazo ajustable.",
        en: "Mustard cotton with a gentle flare. Side pockets and an adjustable bow.",
        va: "Cotó mostassa amb vol suau. Butxaques laterals i llaç ajustable."
      }
    },
    {
      id: 4, sku: "MP-V04", cat: "nina", type: "vestido", price: 59.9, compare: 0, stock: 7,
      sizes: ["3", "4", "5", "6", "8"],
      img: "https://images.pexels.com/photos/27908186/pexels-photo-27908186.jpeg?auto=compress&cs=tinysrgb&w=900",
      name: { es: "Vestido Jardín Floral", en: "Floral Garden Dress", va: "Vestit Jardí Floral" },
      desc: {
        es: "Estampado floral sobre popelín. Corte evasé para jugar y para retrato.",
        en: "Floral print on poplin. A-line cut for playtime and portraits.",
        va: "Estampat floral sobre popelín. Tall evase per a jugar i per al retrat."
      }
    },
    {
      id: 5, sku: "MP-V05", cat: "nina", type: "vestido", price: 64.9, compare: 0, stock: 4,
      sizes: ["2", "3", "4", "5", "6", "8"],
      img: "https://images.pexels.com/photos/18607199/pexels-photo-18607199.jpeg?auto=compress&cs=tinysrgb&w=900",
      name: { es: "Vestido Princesa Amarillo", en: "Yellow Princess Dress", va: "Vestit Princesa Groc" },
      desc: {
        es: "Volantes y brillo suave. Pensado para cumpleaños y sesiones de fotos.",
        en: "Ruffles and a soft sheen. Designed for birthdays and photo sessions.",
        va: "Volants i un toc de llum. Pensat per a aniversaris i sessions de fotos."
      }
    },
    {
      id: 6, sku: "MP-A01", cat: "nino", type: "abrigo", price: 45.9, compare: 0, stock: 9,
      sizes: ["3", "4", "5", "6", "8", "10"],
      img: "https://images.pexels.com/photos/5623707/pexels-photo-5623707.jpeg?auto=compress&cs=tinysrgb&w=900",
      name: { es: "Cazadora Denim Urban", en: "Urban Denim Jacket", va: "Caçadora Dènim Urban" },
      desc: {
        es: "Denim medio con botones de recambio. Lavado suave que no endurece.",
        en: "Mid-wash denim with spare buttons. A gentle wash that stays soft.",
        va: "Dènim mitjà amb botons de recanvi. Rentat suau que no s'endureix."
      }
    },
    {
      id: 7, sku: "MP-C01", cat: "nino", type: "conjunto", price: 52.9, compare: 0, stock: 6,
      sizes: ["2", "3", "4", "5", "6", "8"],
      img: "https://images.pexels.com/photos/16396429/pexels-photo-16396429.jpeg?auto=compress&cs=tinysrgb&w=900",
      name: { es: "Look Denim Vintage", en: "Vintage Denim Look", va: "Look Dènim Vintage" },
      desc: {
        es: "Cazadora y pantalón a juego. Un look completo listo para el fin de semana.",
        en: "Matching jacket and trousers. A complete weekend-ready look.",
        va: "Caçadora i pantaló a joc. Un look complet per al cap de setmana."
      }
    },
    {
      id: 8, sku: "MP-A02", cat: "nino", type: "abrigo", price: 58.9, compare: 0, stock: 5,
      sizes: ["3", "4", "5", "6", "8"],
      img: "https://images.pexels.com/photos/14894499/pexels-photo-14894499.jpeg?auto=compress&cs=tinysrgb&w=900",
      name: { es: "Cazadora Cuero Mini", en: "Mini Leather Jacket", va: "Caçadora de Cuir Mini" },
      desc: {
        es: "Acabado en piel ecológica, forro de algodón y cremalleras suaves.",
        en: "Eco-leather finish, cotton lining and child-friendly zips.",
        va: "Acabat en pell ecològica, folre de cotó i cremalleres suaus."
      }
    },
    {
      id: 9, sku: "MP-P01", cat: "bebe", type: "punto", price: 34.9, compare: 0, stock: 12,
      sizes: ["0-3m", "3-6m", "6-12m", "12-18m"],
      img: "https://images.pexels.com/photos/4964290/pexels-photo-4964290.jpeg?auto=compress&cs=tinysrgb&w=900",
      name: { es: "Jersey Mostaza Cuna", en: "Mustard Crib Knit", va: "Jersei Mostassa Bressol" },
      desc: {
        es: "Punto de algodón mostaza. Cuello amplio para vestir sin fuss.",
        en: "Mustard cotton knit. A wide neckline for fuss-free dressing.",
        va: "Punt de cotó mostassa. Coll ample per vestir sense complicacions."
      }
    },
    {
      id: 10, sku: "MP-B01", cat: "bebe", type: "body", price: 22.9, compare: 0, stock: 15,
      sizes: ["0-3m", "3-6m", "6-12m", "12-18m", "18-24m"],
      img: "https://images.pexels.com/photos/5791347/pexels-photo-5791347.jpeg?auto=compress&cs=tinysrgb&w=900",
      name: { es: "Body Rayas Nube", en: "Cloud Stripe Bodysuit", va: "Body Ratlles Núvol" },
      desc: {
        es: "Algodón orgánico de canalé. Presiones en entrepierna y cuello.",
        en: "Organic ribbed cotton. Snaps at the crotch and neckline.",
        va: "Cotó orgànic de canalé. Botons de pressió a l'entrecuix i al coll."
      }
    },
    {
      id: 11, sku: "MP-B02", cat: "bebe", type: "pelele", price: 28.9, compare: 0, stock: 11,
      sizes: ["0-3m", "3-6m", "6-12m", "12-18m"],
      img: "https://images.pexels.com/photos/3845156/pexels-photo-3845156.jpeg?auto=compress&cs=tinysrgb&w=900",
      name: { es: "Pelele Algodón Orgánico", en: "Organic Cotton Romper", va: "Pelele de Cotó Orgànic" },
      desc: {
        es: "Pelele de lunares sobre blanco. Certificado GOTS y sin tintes agresivos.",
        en: "Polka-dot romper on white. GOTS certified, no harsh dyes.",
        va: "Pelele de lunars sobre blanc. Certificat GOTS i sense tintures agressives."
      }
    },
    {
      id: 12, sku: "MP-A03", cat: "nino", type: "abrigo", price: 68.9, compare: 79.9, stock: 6,
      sizes: ["4", "5", "6", "8", "10"],
      img: "https://images.pexels.com/photos/15234285/pexels-photo-15234285.jpeg?auto=compress&cs=tinysrgb&w=900",
      name: { es: "Abrigo Rojo Invierno", en: "Red Winter Coat", va: "Abric Roig d'Hivern" },
      desc: {
        es: "Paño rojo con capucha. Aísla del viento y aguanta el parque de invierno.",
        en: "Red wool-blend with a hood. Wind-ready for winter parks.",
        va: "Drap roig amb caputxa. Aïlla del vent i aguanta el parc d'hivern."
      }
    },
    {
      id: 13, sku: "MP-A04", cat: "nina", type: "abrigo", price: 74.9, compare: 0, stock: 4,
      sizes: ["3", "4", "5", "6", "8"],
      img: "https://images.pexels.com/photos/8087437/pexels-photo-8087437.jpeg?auto=compress&cs=tinysrgb&w=900",
      name: { es: "Parka Capucha Pelo", en: "Fur Hood Parka", va: "Parka Caputxa de Pèl" },
      desc: {
        es: "Parka mostaza con ribete de pelo sintético. Forro cálido desmontable.",
        en: "Mustard parka with faux-fur trim. Warm, removable lining.",
        va: "Parka mostassa amb ribet de pèl sintètic. Folre càlid desmuntable."
      }
    },
    {
      id: 14, sku: "MP-S01", cat: "nina", type: "sudadera", price: 36.9, compare: 0, stock: 10,
      sizes: ["2", "3", "4", "5", "6", "8"],
      img: "https://images.pexels.com/photos/14594536/pexels-photo-14594536.jpeg?auto=compress&cs=tinysrgb&w=900",
      name: { es: "Sudadera Studio Roja", en: "Red Studio Sweatshirt", va: "Dessuadora Studio Roja" },
      desc: {
        es: "Felpa peinada por dentro. Cuello redondo y puños elásticos.",
        en: "Brushed fleece inside. Crew neck and ribbed cuffs.",
        va: "Felpa pentinada per dins. Coll rodó i punys elàstics."
      }
    },
    {
      id: 15, sku: "MP-C02", cat: "nino", type: "camiseta", price: 24.9, compare: 0, stock: 14,
      sizes: ["2", "3", "4", "5", "6", "8"],
      img: "https://images.pexels.com/photos/22484333/pexels-photo-22484333.jpeg?auto=compress&cs=tinysrgb&w=900",
      name: { es: "Camiseta Rayas Marineras", en: "Breton Stripe Tee", va: "Samarreta Ratlles Marines" },
      desc: {
        es: "Punto jersey de algodón. El básico que combina con todo el armario.",
        en: "Cotton jersey knit. The staple that works with the whole wardrobe.",
        va: "Punt jersei de cotó. El bàsic que combina amb tot l'armari."
      }
    },
    {
      id: 16, sku: "MP-C03", cat: "nino", type: "conjunto", price: 39.9, compare: 0, stock: 8,
      sizes: ["3", "4", "5", "6", "8"],
      img: "https://images.pexels.com/photos/1620826/pexels-photo-1620826.jpeg?auto=compress&cs=tinysrgb&w=900",
      name: { es: "Conjunto Casual Beige", en: "Beige Casual Set", va: "Conjunt Casual Beix" },
      desc: {
        es: "Camisa y pantalón en tonos arena. Un look de domingo ya resuelto.",
        en: "Shirt and trousers in sand tones. A ready-made Sunday look.",
        va: "Camisa i pantaló en tons arena. Un look de diumenge ja resolt."
      }
    },
    {
      id: 17, sku: "MP-C04", cat: "unisex", type: "conjunto", price: 48.9, compare: 0, stock: 7,
      sizes: ["4", "5", "6", "8", "10"],
      img: "https://images.pexels.com/photos/38778561/pexels-photo-38778561.jpeg?auto=compress&cs=tinysrgb&w=900",
      name: { es: "Look Denim y Gafas", en: "Denim and Shades Look", va: "Look Dènim i Ulleres" },
      desc: {
        es: "Denim total look. Incluye gafas de sol infantiles con filtro UV.",
        en: "Full denim look. Includes kids' sunglasses with UV filter.",
        va: "Dènim total look. Inclou ulleres de sol infantils amb filtre UV."
      }
    },
    {
      id: 18, sku: "MP-A05", cat: "nino", type: "abrigo", price: 62.9, compare: 0, stock: 5,
      sizes: ["3", "4", "5", "6", "8"],
      img: "https://images.pexels.com/photos/7303182/pexels-photo-7303182.jpeg?auto=compress&cs=tinysrgb&w=900",
      name: { es: "Parka Azul y Gorro", en: "Blue Parka and Beanie", va: "Parka Blava i Barret" },
      desc: {
        es: "Parka verde agua y gorro de punto. El dúo de entretiempo.",
        en: "Sea-green parka and knit beanie. The mid-season duo.",
        va: "Parka verd aigua i barret de punt. El duet d'entretiempo."
      }
    },
    {
      id: 19, sku: "MP-P02", cat: "unisex", type: "punto", price: 38.9, compare: 0, stock: 9,
      sizes: ["2", "3", "4", "5", "6", "8"],
      img: "https://images.pexels.com/photos/14642651/pexels-photo-14642651.jpeg?auto=compress&cs=tinysrgb&w=900",
      name: { es: "Jersey Punto Crema", en: "Cream Knit Sweater", va: "Jersei de Punt Crema" },
      desc: {
        es: "Punto grueso en crudo. Holgado, cálido y fácil de combinar.",
        en: "Chunky cream knit. Relaxed, warm and easy to style.",
        va: "Punt gruixut en cru. Folgat, càlid i fàcil de combinar."
      }
    },
    {
      id: 20, sku: "MP-B03", cat: "bebe", type: "set", price: 32.9, compare: 0, stock: 13,
      sizes: ["0-3m", "3-6m", "6-12m"],
      img: "https://images.pexels.com/photos/35727373/pexels-photo-35727373.jpeg?auto=compress&cs=tinysrgb&w=900",
      name: { es: "Set Primera Puesta", en: "Newborn First Set", va: "Set Primera Posada" },
      desc: {
        es: "Body, pelele y gorro en algodón peinado. El set de bienvenida.",
        en: "Bodysuit, romper and hat in combed cotton. The welcome set.",
        va: "Body, pelele i gorro en cotó pentinat. El set de benvinguda."
      }
    }
  ];

  /* ---------- Textos de interfaz ---------- */
  const I18N = {
    es: {
      "nav.home": "Inicio",
      "nav.collection": "Colección",
      "nav.girls": "Niñas",
      "nav.boys": "Niños",
      "nav.baby": "Bebé",
      "nav.about": "Atelier",
      "nav.contact": "Contacto",
      "topbar.hours": "L–S 10:00–20:00 · D 11:00–14:00",
      "topbar.shipping": "Envío gratuito a partir de 60 €",
      "hero.eyebrow": "Nueva colección 2026",
      "hero.title": "Infancia con estilo, prendas que duran.",
      "hero.lead": "Boutique de moda infantil en el corazón de València. Piezas seleccionadas para niñas, niños y bebé: comodidad, tejidos nobles y un corte que se hereda.",
      "hero.cta": "Ver colección",
      "hero.cta2": "Conocer el atelier",
      "cat.eyebrow": "Explorar",
      "cat.title": "Tres mundos, un mismo cuidado",
      "cat.girls": "Niñas",
      "cat.girlsText": "Vestidos, punto y conjuntos con un aire de atelier.",
      "cat.boys": "Niños",
      "cat.boysText": "Denim, cazadoras y básicos con carácter.",
      "cat.baby": "Bebé",
      "cat.babyText": "Algodón orgánico, primeras puestas y suavidad.",
      "cat.view": "Ver prendas",
      "about.eyebrow": "La boutique",
      "about.title": "Un atelier pequeño para grandes comienzos",
      "about.p1": "Maison Pétalo nace en València como un espacio íntimo donde la moda infantil se elige despacio. Cada prenda pasa por nuestras manos: tejidos certificados, costuras resistentes y siluetas pensadas para jugar, celebrar y crecer.",
      "about.p2": "No seguimos tendencias ruidosas. Preferimos el lino, el punto, el denim bien cortado y los vestidos que se recuerdan en las fotografías de familia.",
      "about.li1": "Algodón orgánico y lino europeo",
      "about.li2": "Tallas de 0 meses a 10 años",
      "about.li3": "Recogida en boutique o envío 24/48 h",
      "shop.eyebrow": "Boutique online",
      "shop.title": "La colección",
      "shop.lead": "Veinte piezas seleccionadas. Elige talla, añade al carrito y decide si recoges en la boutique o te lo enviamos a casa.",
      "filter.all": "Todas",
      "filter.girls": "Niñas",
      "filter.boys": "Niños",
      "filter.baby": "Bebé",
      "filter.unisex": "Unisex",
      "val.1t": "Tejidos que respiran",
      "val.1p": "Algodón orgánico, lino y punto de merino. Pieles sensibles, días largos, lavados reales.",
      "val.2t": "Hecho para crecer",
      "val.2p": "Dobladillos generosos, botones de recambio y calidad que aguanta hermanos y primas.",
      "val.3t": "Compra a tu ritmo",
      "val.3p": "Reserva y recoge en tienda, paga al recibir o usa la pasarela segura del mercado.",
      "contact.eyebrow": "Boutique València",
      "contact.title": "Pasa a vernos o escríbenos",
      "contact.lead": "Estamos en el Ensanche. Probamos tallas, envolvemos regalos y reservamos pedidos online para recoger el mismo día.",
      "form.name": "Nombre",
      "form.email": "Email",
      "form.phone": "Teléfono",
      "form.message": "Mensaje",
      "form.send": "Enviar mensaje",
      "footer.blurb": "Boutique de moda infantil. Niñas, niños y bebé. València, 2018.",
      "footer.shop": "Tienda",
      "footer.cookies": "Política de cookies",
      "footer.terms": "Requisitos",
      "footer.shipping": "Envíos y recogida",
      "footer.hoursTitle": "Horario",
      "footer.hours": "Lunes a sábado 10:00–20:00",
      "footer.hoursSun": "Domingo 11:00–14:00",
      "footer.copy": "Todos los derechos reservados.",
      "search.btn": "Buscar en la página",
      "search.title": "Buscar en la página",
      "search.submit": "Buscar",
      "search.ph": "Vestido, bebé, denim…",
      "login.tab": "Acceder",
      "login.register": "Crear cuenta",
      "login.title": "Tu cuenta Maison Pétalo",
      "login.pass": "Contraseña",
      "login.submit": "Entrar",
      "login.note": "El sistema de acceso se conectará más adelante. Tus datos no se envían a ningún servidor.",
      "cart.title": "Tu cesta",
      "cookie.text": "Usamos cookies técnicas para recordar tu idioma, el tema y la cesta. No hacemos seguimiento publicitario.",
      "cookie.more": "Más información",
      "cookie.accept": "Aceptar"
    },
    en: {
      "nav.home": "Home",
      "nav.collection": "Collection",
      "nav.girls": "Girls",
      "nav.boys": "Boys",
      "nav.baby": "Baby",
      "nav.about": "Atelier",
      "nav.contact": "Contact",
      "topbar.hours": "Mon–Sat 10:00–20:00 · Sun 11:00–14:00",
      "topbar.shipping": "Free shipping from €60",
      "hero.eyebrow": "New 2026 collection",
      "hero.title": "Childhood with style, clothes that last.",
      "hero.lead": "A children's fashion boutique in the heart of València. Pieces for girls, boys and baby: comfort, noble fabrics and a cut that is inherited.",
      "hero.cta": "See collection",
      "hero.cta2": "Meet the atelier",
      "cat.eyebrow": "Explore",
      "cat.title": "Three worlds, the same care",
      "cat.girls": "Girls",
      "cat.girlsText": "Dresses, knits and sets with an atelier feel.",
      "cat.boys": "Boys",
      "cat.boysText": "Denim, jackets and characterful basics.",
      "cat.baby": "Baby",
      "cat.babyText": "Organic cotton, first outfits and softness.",
      "cat.view": "See pieces",
      "about.eyebrow": "The boutique",
      "about.title": "A small atelier for great beginnings",
      "about.p1": "Maison Pétalo was born in València as an intimate space where children's fashion is chosen slowly. Every piece passes through our hands: certified fabrics, sturdy seams and silhouettes made to play, celebrate and grow.",
      "about.p2": "We skip the noise. We prefer linen, knit, well-cut denim and dresses that live on in family photographs.",
      "about.li1": "Organic cotton and European linen",
      "about.li2": "Sizes from 0 months to 10 years",
      "about.li3": "Boutique pickup or 24/48 h delivery",
      "shop.eyebrow": "Online boutique",
      "shop.title": "The collection",
      "shop.lead": "Twenty selected pieces. Choose a size, add to cart and decide whether to pick up in store or have it sent home.",
      "filter.all": "All",
      "filter.girls": "Girls",
      "filter.boys": "Boys",
      "filter.baby": "Baby",
      "filter.unisex": "Unisex",
      "val.1t": "Fabrics that breathe",
      "val.1p": "Organic cotton, linen and merino knit. Sensitive skin, long days, real washes.",
      "val.2t": "Made to grow",
      "val.2p": "Generous hems, spare buttons and quality that survives siblings.",
      "val.3t": "Shop at your pace",
      "val.3p": "Reserve and collect in store, pay on delivery or use the market payment gateway.",
      "contact.eyebrow": "València boutique",
      "contact.title": "Come by or write to us",
      "contact.lead": "We are in the Eixample. We check sizes, wrap gifts and hold online orders for same-day pickup.",
      "form.name": "Name",
      "form.email": "Email",
      "form.phone": "Phone",
      "form.message": "Message",
      "form.send": "Send message",
      "footer.blurb": "Children's fashion boutique. Girls, boys and baby. València, 2018.",
      "footer.shop": "Shop",
      "footer.cookies": "Cookie policy",
      "footer.terms": "Requirements",
      "footer.shipping": "Shipping and pickup",
      "footer.hoursTitle": "Hours",
      "footer.hours": "Monday to Saturday 10:00–20:00",
      "footer.hoursSun": "Sunday 11:00–14:00",
      "footer.copy": "All rights reserved.",
      "search.btn": "Search the page",
      "search.title": "Search the page",
      "search.submit": "Search",
      "search.ph": "Dress, baby, denim…",
      "login.tab": "Sign in",
      "login.register": "Create account",
      "login.title": "Your Maison Pétalo account",
      "login.pass": "Password",
      "login.submit": "Enter",
      "login.note": "The login system will be connected later. Your data is not sent to any server.",
      "cart.title": "Your basket",
      "cookie.text": "We use technical cookies to remember your language, theme and basket. No advertising tracking.",
      "cookie.more": "More information",
      "cookie.accept": "Accept"
    },
    va: {
      "nav.home": "Inici",
      "nav.collection": "Col·lecció",
      "nav.girls": "Xiquetes",
      "nav.boys": "Xiquets",
      "nav.baby": "Bebé",
      "nav.about": "Atelier",
      "nav.contact": "Contacte",
      "topbar.hours": "Dl–Ds 10:00–20:00 · Dg 11:00–14:00",
      "topbar.shipping": "Enviament gratuït a partir de 60 €",
      "hero.eyebrow": "Nova col·lecció 2026",
      "hero.title": "Infància amb estil, peces que duren.",
      "hero.lead": "Boutique de moda infantil al cor de València. Peces triades per a xiquetes, xiquets i bebé: comoditat, teixits nobles i un tall que s'hereta.",
      "hero.cta": "Veure col·lecció",
      "hero.cta2": "Conéixer l'atelier",
      "cat.eyebrow": "Explorar",
      "cat.title": "Tres mons, una mateixa cura",
      "cat.girls": "Xiquetes",
      "cat.girlsText": "Vestits, punt i conjunts amb aire d'atelier.",
      "cat.boys": "Xiquets",
      "cat.boysText": "Dènim, caçadores i bàsics amb caràcter.",
      "cat.baby": "Bebé",
      "cat.babyText": "Cotó orgànic, primeres posades i suavitat.",
      "cat.view": "Veure peces",
      "about.eyebrow": "La boutique",
      "about.title": "Un atelier menut per a grans començaments",
      "about.p1": "Maison Pétalo naix a València com un espai íntim on la moda infantil es tria a poc a poc. Cada peça passa per les nostres mans: teixits certificats, costures resistents i siluetes pensades per a jugar, celebrar i créixer.",
      "about.p2": "No seguim tendències sorolloses. Preferim el lli, el punt, el dènim ben tallat i els vestits que es recorden en les fotografies de família.",
      "about.li1": "Cotó orgànic i lli europeu",
      "about.li2": "Talles de 0 mesos a 10 anys",
      "about.li3": "Recollida a la boutique o enviament 24/48 h",
      "shop.eyebrow": "Boutique en línia",
      "shop.title": "La col·lecció",
      "shop.lead": "Vint peces seleccionades. Tria talla, afig a la cistella i decideix si ho reculls a la boutique o t'ho enviem a casa.",
      "filter.all": "Totes",
      "filter.girls": "Xiquetes",
      "filter.boys": "Xiquets",
      "filter.baby": "Bebé",
      "filter.unisex": "Unisex",
      "val.1t": "Teixits que respiren",
      "val.1p": "Cotó orgànic, lli i punt de merí. Pells sensibles, dies llargs, rentats reals.",
      "val.2t": "Fet per a créixer",
      "val.2p": "Vivets generosos, botons de recanvi i qualitat que aguanta germans i cosines.",
      "val.3t": "Compra al teu ritme",
      "val.3p": "Reserva i recull a la botiga, paga en rebre o usa la passarel·la segura del mercat.",
      "contact.eyebrow": "Boutique València",
      "contact.title": "Passa a vore'ns o escriu-nos",
      "contact.lead": "Estem a l'Eixample. Provem talles, envoltem regals i reservem comandes en línia per a recollir el mateix dia.",
      "form.name": "Nom",
      "form.email": "Email",
      "form.phone": "Telèfon",
      "form.message": "Missatge",
      "form.send": "Enviar missatge",
      "footer.blurb": "Boutique de moda infantil. Xiquetes, xiquets i bebé. València, 2018.",
      "footer.shop": "Botiga",
      "footer.cookies": "Política de galetes",
      "footer.terms": "Requisits",
      "footer.shipping": "Enviaments i recollida",
      "footer.hoursTitle": "Horari",
      "footer.hours": "Dilluns a dissabte 10:00–20:00",
      "footer.hoursSun": "Diumenge 11:00–14:00",
      "footer.copy": "Tots els drets reservats.",
      "search.btn": "Buscar a la pàgina",
      "search.title": "Buscar a la pàgina",
      "search.submit": "Buscar",
      "search.ph": "Vestit, bebé, dènim…",
      "login.tab": "Accedir",
      "login.register": "Crear compte",
      "login.title": "El teu compte Maison Pétalo",
      "login.pass": "Contrasenya",
      "login.submit": "Entrar",
      "login.note": "El sistema d'accés es connectarà més endavant. Les teues dades no s'envien a cap servidor.",
      "cart.title": "La teua cistella",
      "cookie.text": "Fem servir galetes tècniques per a recordar l'idioma, el tema i la cistella. Sense seguiment publicitari.",
      "cookie.more": "Més informació",
      "cookie.accept": "Acceptar"
    }
  };

  const COPY = {
    es: {
      add: "Añadir",
      view: "Ver",
      size: "Talla",
      qty: "Cantidad",
      stock: "unidades",
      added: "Añadido a la cesta",
      needSize: "Elige una talla",
      empty: "Tu cesta está vacía.",
      continue: "Seguir comprando",
      checkout: "Tramitar pedido",
      clear: "Vaciar cesta",
      subtotal: "Subtotal",
      shipping: "Envío",
      free: "Gratis",
      total: "Total",
      remove: "Quitar",
      pickup: "Recoger en boutique",
      delivery: "Enviar a domicilio",
      payPickup: "Pagar al recoger",
      payDelivery: "Pagar en la entrega",
      payGateway: "Pagar con pasarela del mercado",
      step1: "Datos",
      step2: "Entrega",
      step3: "Pago",
      next: "Continuar",
      back: "Volver",
      confirm: "Confirmar reserva",
      sale: "Oferta",
      nina: "Niña",
      nino: "Niño",
      bebe: "Bebé",
      unisex: "Unisex",
      contactOk: "Mensaje listo. Te responderemos en breve.",
      loginOk: "Formulario preparado. El acceso se implementará más adelante.",
      orderOk: "Pedido reservado. Te esperamos en la boutique.",
      orderShip: "Pedido registrado. Te lo enviaremos a la dirección indicada.",
      payTitle: "Resumen de pago",
      payLead: "Revisa lo que vas a pagar. A continuación se conectará la pasarela del mercado.",
      payGo: "Continuar al pago",
      payLater: "La pasarela de pago se implementará a continuación. No se ha realizado ningún cargo.",
      cookiesTitle: "Política de cookies",
      cookiesBody: "Maison Pétalo utiliza únicamente cookies técnicas almacenadas en tu navegador: idioma, tema claro/oscuro y contenido de la cesta. No empleamos cookies de analítica ni de publicidad. Puedes borrarlas desde la configuración de tu navegador.",
      reqTitle: "Requisitos y condiciones",
      reqBody: "Para comprar online necesitas un email y un teléfono de contacto. Las tallas siguen la guía europea. Las prendas de bebé (0-24 meses) no admiten cambio si se han usado. El resto de piezas puede devolverse en 14 días en la boutique o por correo, siempre con etiquetas. La reserva para recoger se mantiene 7 días.",
      shipTitle: "Envíos y recogida",
      shipBody: "Recogida gratuita en Carrer de Colón, 28, València, en horario de boutique. Envío a península 4,90 € o gratuito a partir de 60 €, 24/48 h laborables. Puedes pagar al recoger, al recibir el pedido o a través de la pasarela del mercado.",
      address: "Dirección",
      city: "Ciudad",
      zip: "Código postal",
      date: "Fecha de recogida",
      notes: "Notas",
      method: "Método",
      gatewayNote: "Se abrirá una ventana con el importe exacto antes de pagar.",
      noResults: "Sin coincidencias.",
      results: "coincidencias",
      order: "Pedido"
    },
    en: {
      add: "Add",
      view: "View",
      size: "Size",
      qty: "Quantity",
      stock: "in stock",
      added: "Added to basket",
      needSize: "Please choose a size",
      empty: "Your basket is empty.",
      continue: "Keep shopping",
      checkout: "Checkout",
      clear: "Clear basket",
      subtotal: "Subtotal",
      shipping: "Shipping",
      free: "Free",
      total: "Total",
      remove: "Remove",
      pickup: "Collect in boutique",
      delivery: "Home delivery",
      payPickup: "Pay on pickup",
      payDelivery: "Pay on delivery",
      payGateway: "Pay with market gateway",
      step1: "Details",
      step2: "Delivery",
      step3: "Payment",
      next: "Continue",
      back: "Back",
      confirm: "Confirm reservation",
      sale: "Sale",
      nina: "Girl",
      nino: "Boy",
      bebe: "Baby",
      unisex: "Unisex",
      contactOk: "Message ready. We will reply shortly.",
      loginOk: "Form ready. Login will be implemented later.",
      orderOk: "Order reserved. We will see you at the boutique.",
      orderShip: "Order placed. We will ship it to the address provided.",
      payTitle: "Payment summary",
      payLead: "Review what you are about to pay. The market payment gateway will be connected next.",
      payGo: "Continue to payment",
      payLater: "The payment gateway will be implemented next. No charge has been made.",
      cookiesTitle: "Cookie policy",
      cookiesBody: "Maison Pétalo only uses technical cookies stored in your browser: language, light/dark theme and basket contents. We do not use analytics or advertising cookies. You can delete them in your browser settings.",
      reqTitle: "Requirements and terms",
      reqBody: "To buy online you need an email and a contact phone. Sizes follow the European guide. Baby garments (0-24 months) cannot be exchanged once used. Other pieces may be returned within 14 days in boutique or by post, with tags on. Pickup reservations are held for 7 days.",
      shipTitle: "Shipping and pickup",
      shipBody: "Free pickup at Carrer de Colón, 28, València, during boutique hours. Mainland shipping €4.90 or free from €60, 24/48 working hours. You may pay on pickup, on delivery or through the market gateway.",
      address: "Address",
      city: "City",
      zip: "Postal code",
      date: "Pickup date",
      notes: "Notes",
      method: "Method",
      gatewayNote: "A window with the exact amount will open before payment.",
      noResults: "No matches.",
      results: "matches",
      order: "Order"
    },
    va: {
      add: "Afegir",
      view: "Veure",
      size: "Talla",
      qty: "Quantitat",
      stock: "unitats",
      added: "Afegit a la cistella",
      needSize: "Tria una talla",
      empty: "La teua cistella està buida.",
      continue: "Seguir comprant",
      checkout: "Tramitar comanda",
      clear: "Buidar cistella",
      subtotal: "Subtotal",
      shipping: "Enviament",
      free: "Gratis",
      total: "Total",
      remove: "Llevar",
      pickup: "Recollir a la boutique",
      delivery: "Enviar a domicili",
      payPickup: "Pagar en recollir",
      payDelivery: "Pagar en l'entrega",
      payGateway: "Pagar amb passarel·la del mercat",
      step1: "Dades",
      step2: "Entrega",
      step3: "Pagament",
      next: "Continuar",
      back: "Tornar",
      confirm: "Confirmar reserva",
      sale: "Oferta",
      nina: "Xiqueta",
      nino: "Xiquet",
      bebe: "Bebé",
      unisex: "Unisex",
      contactOk: "Missatge llest. Et contestarem prompte.",
      loginOk: "Formulari preparat. L'accés s'implementarà més endavant.",
      orderOk: "Comanda reservada. T'esperem a la boutique.",
      orderShip: "Comanda registrada. T'ho enviarem a l'adreça indicada.",
      payTitle: "Resum de pagament",
      payLead: "Revisa el que vas a pagar. Tot seguit es connectarà la passarel·la del mercat.",
      payGo: "Continuar al pagament",
      payLater: "La passarel·la de pagament s'implementarà tot seguit. No s'ha fet cap càrrec.",
      cookiesTitle: "Política de galetes",
      cookiesBody: "Maison Pétalo només usa galetes tècniques al navegador: idioma, tema clar/fosc i contingut de la cistella. No fem servir galetes d'analítica ni de publicitat. Les pots esborrar des de la configuració del navegador.",
      reqTitle: "Requisits i condicions",
      reqBody: "Per a comprar en línia cal un email i un telèfon de contacte. Les talles seguixen la guia europea. Les peces de bebé (0-24 mesos) no admeten canvi si s'han usat. La resta es pot tornar en 14 dies a la boutique o per correu, amb etiquetes. La reserva per a recollir es manté 7 dies.",
      shipTitle: "Enviaments i recollida",
      shipBody: "Recollida gratuïta a Carrer de Colón, 28, València, en horari de boutique. Enviament a península 4,90 € o gratuït a partir de 60 €, 24/48 h laborables. Pots pagar en recollir, en rebre la comanda o amb la passarel·la del mercat.",
      address: "Adreça",
      city: "Ciutat",
      zip: "Codi postal",
      date: "Data de recollida",
      notes: "Notes",
      method: "Mètode",
      gatewayNote: "S'obrirà una finestra amb l'import exacte abans de pagar.",
      noResults: "Sense coincidències.",
      results: "coincidències",
      order: "Comanda"
    }
  };

  /* ---------- Estado ---------- */
  const state = {
    lang: localStorage.getItem(STORAGE_LANG) || "es",
    filter: "all",
    cart: loadCart(),
    checkout: {
      step: 1,
      customer: { name: "", email: "", phone: "" },
      fulfillment: "pickup",
      payment: "pickup",
      address: { street: "", city: "València", zip: "", notes: "" },
      pickupDate: ""
    }
  };

  function t(key) {
    return (I18N[state.lang] && I18N[state.lang][key]) || I18N.es[key] || key;
  }
  function c(key) {
    return (COPY[state.lang] && COPY[state.lang][key]) || COPY.es[key] || key;
  }
  function money(n) {
    return n.toLocaleString(state.lang === "en" ? "en-GB" : "es-ES", {
      style: "currency",
      currency: "EUR"
    });
  }
  function pname(p) {
    return p.name[state.lang] || p.name.es;
  }
  function pdesc(p) {
    return p.desc[state.lang] || p.desc.es;
  }

  function loadCart() {
    try {
      const raw = localStorage.getItem(STORAGE_CART);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  }
  function saveCart() {
    localStorage.setItem(STORAGE_CART, JSON.stringify(state.cart));
    updateBadge();
  }

  function toast(msg) {
    const el = $("#toast");
    el.textContent = msg;
    el.hidden = false;
    clearTimeout(toast._t);
    toast._t = setTimeout(() => { el.hidden = true; }, 2400);
  }

  function lock(on) {
    document.body.classList.toggle("is-locked", on);
  }

  /* ---------- Tema ---------- */
  function applyTheme(theme) {
    document.body.classList.toggle("dark", theme === "dark");
    localStorage.setItem(STORAGE_THEME, theme);
    const btn = $("#theme-toggle");
    btn.setAttribute("aria-label", theme === "dark" ? "Modo claro" : "Modo oscuro");
  }

  /* ---------- Idioma ---------- */
  function applyLang(lang) {
    state.lang = lang;
    localStorage.setItem(STORAGE_LANG, lang);
    document.documentElement.lang = lang === "va" ? "ca" : lang;
    $$("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (I18N[lang] && I18N[lang][key]) el.textContent = I18N[lang][key];
    });
    $$(".lang-btn").forEach((btn) => {
      btn.classList.toggle("is-active", btn.dataset.lang === lang);
    });
    const input = $("#search-input");
    if (input) input.placeholder = t("search.ph");
    renderProducts();
    renderCart();
  }

  /* ---------- Productos ---------- */
  function renderProducts() {
    const grid = $("#product-grid");
    const list = PRODUCTS.filter((p) => state.filter === "all" || p.cat === state.filter);
    grid.innerHTML = list.map((p) => `
      <article class="product-card" data-id="${p.id}">
        <div class="product-media">
          ${p.compare ? `<span class="badge">${c("sale")}</span>` : ""}
          <img src="${p.img}" alt="${pname(p)}" loading="lazy">
        </div>
        <div class="product-body">
          <span class="product-cat">${c(p.cat)}</span>
          <h3>${pname(p)}</h3>
          <div class="price">
            <b>${money(p.price)}</b>
            ${p.compare ? `<s>${money(p.compare)}</s>` : ""}
          </div>
          <div class="product-actions">
            <button type="button" class="btn btn-ghost js-open-product" data-id="${p.id}">${c("view")}</button>
            <button type="button" class="btn btn-primary js-quick-add" data-id="${p.id}">${c("add")}</button>
          </div>
        </div>
      </article>
    `).join("");
  }

  function openProduct(id) {
    const p = PRODUCTS.find((x) => x.id === id);
    if (!p) return;
    const dialog = $(".product-dialog");
    dialog.innerHTML = `
      <button type="button" class="modal-close" data-close="product" aria-label="Cerrar">×</button>
      <div class="product-detail">
        <img src="${p.img}" alt="${pname(p)}">
        <div>
          <p class="product-cat">${c(p.cat)} · ${p.sku}</p>
          <h2 id="product-title">${pname(p)}</h2>
          <div class="price"><b>${money(p.price)}</b>${p.compare ? `<s>${money(p.compare)}</s>` : ""}</div>
          <p>${pdesc(p)}</p>
          <p>${p.stock} ${c("stock")}</p>
          <p>${c("size")}</p>
          <div class="size-list" id="size-list">
            ${p.sizes.map((s, i) => `<button type="button" data-size="${s}" class="${i === 0 ? "is-active" : ""}">${s}</button>`).join("")}
          </div>
          <div class="qty-row">
            <span>${c("qty")}</span>
            <button type="button" id="qty-minus">−</button>
            <strong id="qty-val">1</strong>
            <button type="button" id="qty-plus">+</button>
          </div>
          <button type="button" class="btn btn-primary" id="add-from-modal" data-id="${p.id}">${c("add")}</button>
        </div>
      </div>
    `;
    openModal("product");
    let qty = 1;
    $("#size-list").addEventListener("click", (e) => {
      const btn = e.target.closest("button");
      if (!btn) return;
      $$("#size-list button").forEach((b) => b.classList.remove("is-active"));
      btn.classList.add("is-active");
    });
    $("#qty-minus").onclick = () => { qty = Math.max(1, qty - 1); $("#qty-val").textContent = qty; };
    $("#qty-plus").onclick = () => { qty = Math.min(p.stock, qty + 1); $("#qty-val").textContent = qty; };
    $("#add-from-modal").onclick = () => {
      const size = $(".size-list .is-active").dataset.size;
      addToCart(p.id, size, qty);
      closeModal("product");
    };
  }

  /* ---------- Carrito ---------- */
  function addToCart(id, size, qty) {
    if (!size) {
      toast(c("needSize"));
      return;
    }
    const p = PRODUCTS.find((x) => x.id === id);
    const existing = state.cart.find((i) => i.id === id && i.size === size);
    const nextQty = (existing ? existing.qty : 0) + qty;
    if (nextQty > p.stock) {
      toast(state.lang === "en" ? "Not enough stock" : "No hay suficiente stock");
      return;
    }
    if (existing) existing.qty = nextQty;
    else {
      state.cart.push({
        id: p.id, sku: p.sku, size, qty, price: p.price, img: p.img,
        name: p.name
      });
    }
    saveCart();
    toast(c("added"));
    renderCart();
  }

  function cartCount() {
    return state.cart.reduce((n, i) => n + i.qty, 0);
  }
  function cartSubtotal() {
    return state.cart.reduce((n, i) => n + i.price * i.qty, 0);
  }
  function shippingOf(fulfillment, sub) {
    if (fulfillment === "pickup") return 0;
    return sub >= FREE_SHIPPING ? 0 : SHIPPING_COST;
  }
  function updateBadge() {
    const badge = $("#cart-badge");
    const n = cartCount();
    badge.hidden = n === 0;
    badge.textContent = n;
  }

  function renderCart() {
    const body = $("#cart-body");
    const foot = $("#cart-foot");
    if (!body) return;
    if (!state.cart.length) {
      body.innerHTML = `<div class="cart-empty">${c("empty")}</div>`;
      foot.innerHTML = `<button type="button" class="btn btn-ghost" data-close="cart">${c("continue")}</button>`;
      return;
    }
    body.innerHTML = state.cart.map((item, idx) => `
      <div class="cart-item">
        <img src="${item.img}" alt="">
        <div>
          <h4>${item.name[state.lang] || item.name.es}</h4>
          <p>${c("size")} ${item.size}</p>
          <div class="qty-row">
            <button type="button" data-qty="${idx}" data-d="-1">−</button>
            <span>${item.qty}</span>
            <button type="button" data-qty="${idx}" data-d="1">+</button>
          </div>
        </div>
        <div>
          <strong>${money(item.price * item.qty)}</strong>
          <button type="button" class="text-link" data-remove="${idx}">${c("remove")}</button>
        </div>
      </div>
    `).join("");
    const sub = cartSubtotal();
    const ship = shippingOf("delivery", sub);
    foot.innerHTML = `
      <div class="totals">
        <div class="row"><span>${c("subtotal")}</span><span>${money(sub)}</span></div>
        <div class="row"><span>${c("shipping")}</span><span>${sub >= FREE_SHIPPING ? c("free") : money(SHIPPING_COST)}</span></div>
        <div class="row total"><span>${c("total")}</span><span>${money(sub + (sub >= FREE_SHIPPING ? 0 : ship))}</span></div>
      </div>
      <button type="button" class="btn btn-primary" id="go-checkout" style="width:100%">${c("checkout")}</button>
      <button type="button" class="btn btn-ghost" id="clear-cart" style="width:100%;margin-top:8px">${c("clear")}</button>
    `;
    body.onclick = (e) => {
      const rem = e.target.closest("[data-remove]");
      const q = e.target.closest("[data-qty]");
      if (rem) {
        state.cart.splice(Number(rem.dataset.remove), 1);
        saveCart();
        renderCart();
      }
      if (q) {
        const i = Number(q.dataset.qty);
        const d = Number(q.dataset.d);
        const item = state.cart[i];
        const p = PRODUCTS.find((x) => x.id === item.id);
        item.qty = Math.min(p.stock, Math.max(1, item.qty + d));
        saveCart();
        renderCart();
      }
    };
    $("#go-checkout").onclick = () => {
      closeModal("cart");
      state.checkout.step = 1;
      openModal("checkout");
      renderCheckout();
    };
    $("#clear-cart").onclick = () => {
      state.cart = [];
      saveCart();
      renderCart();
    };
  }

  /* ---------- Checkout ---------- */
  function renderCheckout() {
    const root = $("#checkout-root");
    const ch = state.checkout;
    const sub = cartSubtotal();
    const ship = shippingOf(ch.fulfillment, sub);
    const total = sub + ship;
    const steps = `
      <div class="steps">
        <span class="${ch.step === 1 ? "is-active" : ""}">1. ${c("step1")}</span>
        <span class="${ch.step === 2 ? "is-active" : ""}">2. ${c("step2")}</span>
        <span class="${ch.step === 3 ? "is-active" : ""}">3. ${c("step3")}</span>
      </div>
    `;

    if (ch.step === 1) {
      root.innerHTML = `
        ${steps}
        <h2 id="checkout-title">${c("step1")}</h2>
        <form class="checkout-form" id="step1-form">
          <label><span>${t("form.name")}</span><input name="name" required value="${ch.customer.name}"></label>
          <label><span>Email</span><input type="email" name="email" required value="${ch.customer.email}"></label>
          <label><span>${t("form.phone")}</span><input name="phone" required value="${ch.customer.phone}"></label>
          <button class="btn btn-primary" type="submit">${c("next")}</button>
        </form>
      `;
      $("#step1-form").onsubmit = (e) => {
        e.preventDefault();
        const fd = new FormData(e.target);
        ch.customer = { name: fd.get("name"), email: fd.get("email"), phone: fd.get("phone") };
        ch.step = 2;
        renderCheckout();
      };
      return;
    }

    if (ch.step === 2) {
      root.innerHTML = `
        ${steps}
        <h2 id="checkout-title">${c("step2")}</h2>
        <div class="choice-grid">
          <button type="button" class="choice ${ch.fulfillment === "pickup" ? "is-active" : ""}" data-f="pickup">
            <strong>${c("pickup")}</strong>
            <p>Carrer de Colón, 28 · ${c("free")}</p>
          </button>
          <button type="button" class="choice ${ch.fulfillment === "delivery" ? "is-active" : ""}" data-f="delivery">
            <strong>${c("delivery")}</strong>
            <p>${sub >= FREE_SHIPPING ? c("free") : money(SHIPPING_COST)}</p>
          </button>
        </div>
        <form class="checkout-form" id="step2-form"></form>
      `;
      const form = $("#step2-form");
      const paintForm = () => {
        if (ch.fulfillment === "pickup") {
          const minDate = new Date().toISOString().slice(0, 10);
          if (!ch.pickupDate) ch.pickupDate = minDate;
          form.innerHTML = `
            <label><span>${c("date")}</span><input type="date" name="date" required min="${minDate}" value="${ch.pickupDate}"></label>
            <label><span>${c("notes")}</span><textarea name="notes" rows="2">${ch.address.notes}</textarea></label>
            <div style="display:flex;gap:8px">
              <button type="button" class="btn btn-ghost" id="back-1">${c("back")}</button>
              <button class="btn btn-primary" type="submit">${c("next")}</button>
            </div>
          `;
        } else {
          form.innerHTML = `
            <label><span>${c("address")}</span><input name="street" required value="${ch.address.street}"></label>
            <label><span>${c("city")}</span><input name="city" required value="${ch.address.city}"></label>
            <label><span>${c("zip")}</span><input name="zip" required value="${ch.address.zip}"></label>
            <label><span>${c("notes")}</span><textarea name="notes" rows="2">${ch.address.notes}</textarea></label>
            <div style="display:flex;gap:8px">
              <button type="button" class="btn btn-ghost" id="back-1">${c("back")}</button>
              <button class="btn btn-primary" type="submit">${c("next")}</button>
            </div>
          `;
        }
        $("#back-1").onclick = () => { ch.step = 1; renderCheckout(); };
        form.onsubmit = (e) => {
          e.preventDefault();
          const fd = new FormData(form);
          if (ch.fulfillment === "pickup") {
            ch.pickupDate = fd.get("date");
            ch.address.notes = fd.get("notes");
            if (ch.payment === "delivery") ch.payment = "pickup";
          } else {
            ch.address = {
              street: fd.get("street"),
              city: fd.get("city"),
              zip: fd.get("zip"),
              notes: fd.get("notes")
            };
            if (ch.payment === "pickup") ch.payment = "delivery";
          }
          ch.step = 3;
          renderCheckout();
        };
      };
      paintForm();
      root.querySelector(".choice-grid").onclick = (e) => {
        const btn = e.target.closest("[data-f]");
        if (!btn) return;
        ch.fulfillment = btn.dataset.f;
        $$(".choice", root).forEach((x) => x.classList.toggle("is-active", x === btn));
        paintForm();
      };
      return;
    }

    const payPickupOk = ch.fulfillment === "pickup";
    const payDeliveryOk = ch.fulfillment === "delivery";
    root.innerHTML = `
      ${steps}
      <h2 id="checkout-title">${c("step3")}</h2>
      <div class="totals">
        <div class="row"><span>${c("subtotal")}</span><span>${money(sub)}</span></div>
        <div class="row"><span>${c("shipping")}</span><span>${ship ? money(ship) : c("free")}</span></div>
        <div class="row total"><span>${c("total")}</span><span>${money(total)}</span></div>
      </div>
      <div class="choice-grid" id="pay-choices">
        ${payPickupOk ? `<button type="button" class="choice ${ch.payment === "pickup" ? "is-active" : ""}" data-p="pickup"><strong>${c("payPickup")}</strong></button>` : ""}
        ${payDeliveryOk ? `<button type="button" class="choice ${ch.payment === "delivery" ? "is-active" : ""}" data-p="delivery"><strong>${c("payDelivery")}</strong></button>` : ""}
        <button type="button" class="choice ${ch.payment === "gateway" ? "is-active" : ""}" data-p="gateway">
          <strong>${c("payGateway")}</strong>
          <p>${c("gatewayNote")}</p>
        </button>
      </div>
      <div style="display:flex;gap:8px">
        <button type="button" class="btn btn-ghost" id="back-2">${c("back")}</button>
        <button type="button" class="btn btn-primary" id="finish">${ch.payment === "gateway" ? c("payGo") : c("confirm")}</button>
      </div>
    `;
    $("#pay-choices").onclick = (e) => {
      const btn = e.target.closest("[data-p]");
      if (!btn) return;
      ch.payment = btn.dataset.p;
      renderCheckout();
    };
    $("#back-2").onclick = () => { ch.step = 2; renderCheckout(); };
    $("#finish").onclick = () => finishOrder();
  }

  function finishOrder() {
    const ch = state.checkout;
    if (ch.payment === "gateway") {
      closeModal("checkout");
      openPayWindow();
      return;
    }
    completeOrder(ch.fulfillment === "pickup" ? c("orderOk") : c("orderShip"));
  }

  function openPayWindow() {
    const ch = state.checkout;
    const sub = cartSubtotal();
    const ship = shippingOf(ch.fulfillment, sub);
    const total = sub + ship;
    const id = "MP-" + Date.now().toString().slice(-8);
    $("#pay-root").innerHTML = `
      <p class="eyebrow">Maison Pétalo</p>
      <h2 id="pay-title">${c("payTitle")}</h2>
      <p>${c("payLead")}</p>
      <div class="pay-box">
        <p><strong>${c("order")} ${id}</strong></p>
        ${state.cart.map((i) => `<div class="row" style="display:flex;justify-content:space-between;gap:12px"><span>${i.name[state.lang] || i.name.es} · ${i.size} × ${i.qty}</span><span>${money(i.price * i.qty)}</span></div>`).join("")}
        <hr>
        <p>${c("method")}: ${ch.fulfillment === "pickup" ? c("pickup") : c("delivery")}</p>
        <p>${ch.customer.name} · ${ch.customer.email} · ${ch.customer.phone}</p>
        ${ch.fulfillment === "delivery" ? `<p>${ch.address.street}, ${ch.address.zip} ${ch.address.city}</p>` : `<p>${c("date")}: ${ch.pickupDate}</p>`}
        <div class="totals" style="margin-top:12px">
          <div class="row"><span>${c("subtotal")}</span><span>${money(sub)}</span></div>
          <div class="row"><span>${c("shipping")}</span><span>${ship ? money(ship) : c("free")}</span></div>
          <div class="row total"><span>${c("total")}</span><span>${money(total)}</span></div>
        </div>
      </div>
      <button type="button" class="btn btn-primary" id="pay-continue">${c("payGo")}</button>
      <p class="form-note" id="pay-note" hidden></p>
    `;
    openModal("pay");
    $("#pay-continue").onclick = () => {
      $("#pay-note").hidden = false;
      $("#pay-note").textContent = c("payLater");
    };
  }

  function completeOrder(msg) {
    state.cart = [];
    saveCart();
    renderCart();
    closeModal("checkout");
    closeModal("pay");
    toast(msg);
    state.checkout.step = 1;
  }

  /* ---------- Modales ---------- */
  function openModal(name) {
    const map = {
      search: "#search-modal",
      login: "#login-modal",
      product: "#product-modal",
      cart: "#cart-drawer",
      checkout: "#checkout-modal",
      pay: "#pay-modal",
      legal: "#legal-modal"
    };
    const el = $(map[name]);
    if (!el) return;
    el.hidden = false;
    lock(true);
    if (name === "search") setTimeout(() => $("#search-input").focus(), 50);
  }
  function closeModal(name) {
    const map = {
      search: "#search-modal",
      login: "#login-modal",
      product: "#product-modal",
      cart: "#cart-drawer",
      checkout: "#checkout-modal",
      pay: "#pay-modal",
      legal: "#legal-modal"
    };
    if (name === "all") {
      Object.values(map).forEach((s) => { const n = $(s); if (n) n.hidden = true; });
      clearHighlights();
      lock(false);
      return;
    }
    const el = $(map[name]);
    if (el) el.hidden = true;
    if (name === "search") clearHighlights();
    const anyOpen = $$(".modal, .drawer").some((m) => !m.hidden);
    if (!anyOpen) lock(false);
  }

  /* ---------- Búsqueda y resaltado ---------- */
  let highlightNodes = [];

  function clearHighlights() {
    highlightNodes.forEach((mark) => {
      const parent = mark.parentNode;
      if (!parent) return;
      parent.replaceChild(document.createTextNode(mark.textContent), mark);
      parent.normalize();
    });
    highlightNodes = [];
  }

  function highlightIn(root, query) {
    const q = query.trim();
    if (q.length < 2) return 0;
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        if (!node.parentElement) return NodeFilter.FILTER_REJECT;
        const tag = node.parentElement.tagName;
        if (["SCRIPT", "STYLE", "NOSCRIPT"].includes(tag)) return NodeFilter.FILTER_REJECT;
        if (node.parentElement.closest(".modal, .drawer, .cookie-banner, .topbar, .site-header, .mobile-menu")) {
          return NodeFilter.FILTER_REJECT;
        }
        return node.nodeValue.toLowerCase().includes(q.toLowerCase())
          ? NodeFilter.FILTER_ACCEPT
          : NodeFilter.FILTER_REJECT;
      }
    });
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    let count = 0;
    nodes.forEach((node) => {
      const text = node.nodeValue;
      const rx = new RegExp(q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "gi");
      const frag = document.createDocumentFragment();
      let last = 0;
      let m;
      while ((m = rx.exec(text))) {
        if (m.index > last) frag.appendChild(document.createTextNode(text.slice(last, m.index)));
        const mark = document.createElement("mark");
        mark.className = "search-highlight";
        mark.textContent = m[0];
        frag.appendChild(mark);
        highlightNodes.push(mark);
        last = m.index + m[0].length;
        count += 1;
      }
      if (last < text.length) frag.appendChild(document.createTextNode(text.slice(last)));
      node.parentNode.replaceChild(frag, node);
    });
    return count;
  }

  function runSearch(query) {
    clearHighlights();
    const q = query.trim().toLowerCase();
    const box = $("#search-results");
    const meta = $("#search-meta");
    if (q.length < 2) {
      meta.textContent = "";
      box.innerHTML = "";
      return;
    }
    const pageHits = highlightIn($("main"), q);
    const products = PRODUCTS.filter((p) => {
      const blob = [p.name.es, p.name.en, p.name.va, p.desc.es, p.sku, p.cat].join(" ").toLowerCase();
      return blob.includes(q);
    });
    meta.textContent = `${pageHits} ${c("results")}`;
    if (!products.length && !pageHits) {
      box.innerHTML = `<p>${c("noResults")}</p>`;
      return;
    }
    box.innerHTML = products.map((p) => `
      <button type="button" class="search-hit" data-id="${p.id}">
        <strong>${pname(p)}</strong> · ${money(p.price)}
      </button>
    `).join("");
    box.onclick = (e) => {
      const btn = e.target.closest("[data-id]");
      if (!btn) return;
      closeModal("search");
      openProduct(Number(btn.dataset.id));
    };
  }

  /* ---------- Menú móvil ---------- */
  function openMobile(open) {
    const menu = $("#mobile-menu");
    const btn = $("#hamburger");
    menu.hidden = !open;
    btn.classList.toggle("is-open", open);
    btn.setAttribute("aria-expanded", String(open));
    if (open) lock(true);
    else {
      const anyOpen = $$(".modal, .drawer").some((m) => !m.hidden);
      if (!anyOpen) lock(false);
    }
  }

  /* ---------- Legales ---------- */
  function openLegal(kind) {
    const title = kind === "cookies" ? c("cookiesTitle") : kind === "requisitos" ? c("reqTitle") : c("shipTitle");
    const body = kind === "cookies" ? c("cookiesBody") : kind === "requisitos" ? c("reqBody") : c("shipBody");
    $("#legal-root").innerHTML = `<h2 id="legal-title">${title}</h2><p>${body}</p>`;
    openModal("legal");
  }

  /* ---------- Eventos ---------- */
  function bind() {
    $("#year").textContent = new Date().getFullYear();

    const savedTheme = localStorage.getItem(STORAGE_THEME);
    if (savedTheme) applyTheme(savedTheme);
    else if (window.matchMedia("(prefers-color-scheme: dark)").matches) applyTheme("dark");

    applyLang(state.lang);
    updateBadge();
    renderCart();

    $("#theme-toggle").addEventListener("click", () => {
      applyTheme(document.body.classList.contains("dark") ? "light" : "dark");
    });

    $$(".lang-btn").forEach((btn) => {
      btn.addEventListener("click", () => applyLang(btn.dataset.lang));
    });

    $("#hamburger").addEventListener("click", () => {
      openMobile($("#mobile-menu").hidden);
    });
    $("#mobile-close").addEventListener("click", () => openMobile(false));
    $$(".mobile-nav a").forEach((a) => a.addEventListener("click", () => openMobile(false)));

    $("#search-open").addEventListener("click", () => openModal("search"));
    $("#mobile-search").addEventListener("click", () => {
      openMobile(false);
      openModal("search");
    });
    $("#user-open").addEventListener("click", () => openModal("login"));
    $("#cart-open").addEventListener("click", () => {
      renderCart();
      openModal("cart");
    });

    document.addEventListener("click", (e) => {
      const close = e.target.closest("[data-close]");
      if (close) closeModal(close.dataset.close);
      const legal = e.target.closest("[data-open]");
      if (legal && ["cookies", "requisitos", "envios"].includes(legal.dataset.open)) {
        openLegal(legal.dataset.open);
      }
      const filterBtn = e.target.closest("[data-filter]");
      if (filterBtn && !filterBtn.classList.contains("chip") && filterBtn.tagName !== "BUTTON") return;
      if (filterBtn && (filterBtn.classList.contains("chip") || filterBtn.classList.contains("text-link"))) {
        state.filter = filterBtn.dataset.filter;
        $$(".chip").forEach((ch) => ch.classList.toggle("is-active", ch.dataset.filter === state.filter));
        renderProducts();
        $("#coleccion").scrollIntoView({ behavior: "smooth" });
      }
    });

    $("#product-grid").addEventListener("click", (e) => {
      const open = e.target.closest(".js-open-product");
      const add = e.target.closest(".js-quick-add");
      if (open) openProduct(Number(open.dataset.id));
      if (add) openProduct(Number(add.dataset.id));
    });

    $("#search-form").addEventListener("submit", (e) => {
      e.preventDefault();
      runSearch($("#search-input").value);
    });

    $$(".main-nav a, .logo, .hero-actions a, .mobile-nav a").forEach((a) => {
      a.addEventListener("click", (e) => {
        const href = a.getAttribute("href");
        if (!href || href.charAt(0) !== "#") return;
        const target = $(href);
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });

    $("#contact-form").addEventListener("submit", (e) => {
      e.preventDefault();
      const note = $("#contact-note");
      note.hidden = false;
      note.textContent = c("contactOk");
      e.target.reset();
    });

    $$(".tab").forEach((tab) => {
      tab.addEventListener("click", () => {
        $$(".tab").forEach((tEl) => tEl.classList.remove("is-active"));
        tab.classList.add("is-active");
        const isReg = tab.dataset.tab === "register";
        const extra = $(".register-only");
        extra.hidden = !isReg;
        extra.querySelector("input").required = isReg;
      });
    });

    $("#login-form").addEventListener("submit", (e) => {
      e.preventDefault();
      toast(c("loginOk"));
      closeModal("login");
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeModal("all");
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 900) openMobile(false);
    });

    let lastY = 0;
    window.addEventListener("scroll", () => {
      const y = window.scrollY;
      $("#site-header").classList.toggle("is-scrolled", y > 8);
      $("#topbar").classList.toggle("is-hidden", y > lastY && y > 80);
      $("#to-top").classList.toggle("is-visible", y > 500);
      lastY = y;
    }, { passive: true });

    $("#to-top").addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

    if (!localStorage.getItem(STORAGE_COOKIE)) $("#cookie-banner").hidden = false;
    $("#cookie-accept").addEventListener("click", () => {
      localStorage.setItem(STORAGE_COOKIE, "1");
      $("#cookie-banner").hidden = true;
    });
  }

  bind();
})();
