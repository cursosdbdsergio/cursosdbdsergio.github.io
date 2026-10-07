/* ============================================================
   CURVA · Moda real tallas 44-72
   script.js — Interacción, carrito, i18n, búsqueda y UX
   JavaScript puro (ES6+), sin dependencias externas.
   ============================================================ */
'use strict';

/* Marca el documento como "JS activo" (controla las animaciones de aparición) */
document.documentElement.classList.add('js');

/* ------------------------------------------------------------
   0. UTILIDADES
   ------------------------------------------------------------ */
const $  = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

/** Almacén local con control de errores (modo privado, etc.) */
const Store = {
  get(key, fallback = null) {
    try { const v = localStorage.getItem(key); return v === null ? fallback : JSON.parse(v); }
    catch (e) { return fallback; }
  },
  set(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) { /* silencioso */ }
  }
};

const debounce = (fn, wait = 150) => {
  let t;
  return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), wait); };
};

/* ------------------------------------------------------------
   1. TEXTOS DE LA INTERFAZ / SISTEMA DE IDIOMAS
   ------------------------------------------------------------
   Las traducciones son manuales (sin traducción automática).
   El HTML base está en español: si falta una clave, se conserva
   el texto original del documento.                             */
const I18N = {
  /* ----- ENGLISH ----- */
  en: {
    top_phone: '+34 960 123 456',
    top_note: 'Free shipping over 79 € · Free pickup at the Central Market',
    logo_sub: 'real fashion',
    nav_home: 'Home', nav_shop: 'Collection', nav_sizes: 'Your size', nav_about: 'About us',
    nav_reviews: 'Reviews', nav_contact: 'Contact',
    search_aria: 'Search', user_aria: 'Customer area', cart_aria: 'Cart', theme_aria: 'Switch theme',
    cart_close_aria: 'Close cart', top_aria: 'Back to top', search_cta: 'Search the website',
    hero_kicker: 'Sizes 44 · 72 · Own pattern drafting',
    hero_title: 'Clothes designed<br>for your real body',
    hero_sub: 'Structure, fabrics with body and sizes that truly fit. Not “one size up”: patterns drawn from size 44.',
    hero_cta1: 'Shop the collection', hero_cta2: 'Find my size',
    stat_1: 'Size range', stat_2: 'Curvy customers', stat_3: 'Average rating', stat_4: 'Free returns',
    about_eyebrow: 'Real fashion',
    about_title: 'Clothes drafted from the first pattern for curvy bodies',
    about_lead: 'We do not scale up a small pattern: every garment is drawn on size 52 and 62 bodies and tested on real models from 44 to 72. The result is clothing that supports you instead of squeezing you.',
    f1_t: 'Curvy pattern drafting',
    f1_d: 'Own grading by bust, waist and hip. No giant shoulder pads or badly placed seams.',
    f2_t: 'Fabrics with body',
    f2_d: 'Heavy viscose, cotton knit and denim with double elastane: they hold their shape and hide what you want.',
    f3_t: '30-day home try-on',
    f3_d: 'Take it home, try it on calmly and if the size is wrong we exchange it free. In store too.',
    f4_t: 'Pick up at the market',
    f4_d: 'Order today and collect it at our stall in Valencia’s Central Market, or at Russafa and Colón markets.',
    shop_eyebrow: 'Autumn 26 collection', shop_title: 'The basics that really fit you',
    f_all: 'All', f_dress: 'Dresses', f_shirt: 'Shirting', f_knit: 'Knitwear', f_pants: 'Trousers', f_coat: 'Outerwear',
    tag_best: 'Best seller', tag_new: 'New in', tag_limited: 'Few left', quick: 'Quick view',
    p1_d: 'Heavy viscose with drape, hidden elastic waist and short sleeve.',
    p2_d: 'Light knit that does not cling, dropped shoulder and hip-covering length.',
    p3_d: 'Linen and viscose blend, inner lining and high rise that does not dig in.',
    p4_d: 'Denim with 4% elastane, waistband that stays up and curvy grading seam.',
    p5_d: 'Recycled wool, soft shoulder pad and straight cut that flatters without tightening.',
    p6_d: 'Two chunky knit pieces to wear together or separately.',
    add: 'Add to cart',
    shop_note: 'All prices include VAT. Shipping 4.95 € (free over 79 €) or free pickup at Valencia’s Central Market within 2 h.',
    size_eyebrow: 'Size guide', size_title: 'Find your CURVA size in 10 seconds',
    size_lead: 'Measure with a tape over the body, without pulling: bust at the widest point, waist at the navel and hip at the widest part.',
    label_bust: 'Bust (cm)', label_waist: 'Waist (cm)', label_hip: 'Hip (cm)', size_btn: 'Calculate my size',
    table_caption: 'Body measurement chart (cm)',
    th_size: 'Size', th_bust: 'Bust', th_waist: 'Waist', th_hip: 'Hip',
    table_note: 'Between two sizes? Choose the smaller one for a closer fit, the bigger one for a looser one.',
    del_eyebrow: 'Shipping & pickup', del_title: 'You choose how to receive your order',
    del1_t: 'Market pickup · Free',
    del1_d: 'We prepare your order in 2 hours and keep it for 7 days at stall 42 of Valencia’s Central Market. Pay when you collect it if you prefer.',
    del2_t: 'Home delivery · 4.95 €',
    del2_d: '24–72 h in mainland Spain. Free from 79 €. You can pay cash on delivery (+1.50 €).',
    del3_t: 'Secure online payment',
    del3_d: 'Card, Bizum or bank transfer through the market’s payment gateway. Encrypted data, no card numbers stored.',
    faq_title: 'Frequently asked questions',
    faq1_q: 'Are sizes the same across all garments?',
    faq1_a: 'Yes. We work with a single grading chart, so your size works for dresses, jeans and coats. Each product page states if a model is roomier.',
    faq2_q: 'Can I try them on and return for free?',
    faq2_a: 'You have 30 days. We collect at your home or you bring it to the market stall: free size exchange and refund within 48 h.',
    faq3_q: 'How does pay-on-pickup work?',
    faq3_a: 'You reserve the order without paying, and at the stall you pay by card, Bizum or cash when you receive it. We text you on WhatsApp when it is ready.',
    faq4_q: 'Do you offer styling advice?',
    faq4_a: 'Yes, free and with no appointment: message us on WhatsApp with your height and measurements and we prepare a fitting room with 3 looks.',
    rev_eyebrow: 'Verified reviews', rev_title: '4.9 out of 5 from 1,283 reviews',
    rev1: '“For the first time trousers fit my hips without going up a size. 60 is my size and I no longer hesitate.”',
    rev2: '“I ordered at 11 and by 13:00 it was at the market. I tried it on there and left with two more dresses.”',
    rev3: '“The advisor swapped a blouse over WhatsApp at no cost. Neighbourhood-shop service with a modern website.”',
    ct_eyebrow: 'Contact', ct_title: 'Size doubts? We will help you',
    ct_lead: 'We answer in under 4 hours during shop hours. You can also come and see us: the fitting room is always free.',
    ct_store: 'Central Market · Stall 42', ct_hours: 'Opening hours',
    ct_hours_v: 'Mon–Fri 8:00–14:30 & 17:00–20:30 · Sat 8:00–14:00',
    ct_phone: 'Phone & WhatsApp', ct_mail: 'Email',
    form_name: 'Name', form_email: 'Email', form_topic: 'Reason', form_msg: 'Message',
    ph_name: 'Your name', ph_msg: 'Tell me your height, usual size and what you are looking for',
    opt_size: 'Size advice', opt_order: 'Order status', opt_return: 'Exchange or return', opt_other: 'Other',
    form_privacy: 'I have read and accept the privacy policy.', form_send: 'Send message',
    form_address: 'Full address', form_zip: 'Postcode', form_city: 'City',
    foot_desc: 'Fashion store for sizes 44–72. Own pattern drafting in Valencia, fabrics with body and pickup at the Central Market.',
    foot_shop: 'Shop', foot_gift: 'Gift card', foot_help: 'Help', foot_guide: 'Size guide',
    foot_ship: 'Shipping & pickup', foot_returns: '30-day returns', foot_asessoria: 'Styling advice',
    foot_legal: 'Legal & requirements', foot_cookies: 'Cookie policy', foot_legal_note: 'Legal notice',
    foot_privacy: 'Privacy', foot_req: 'Order requirements',
    pay_cod: 'Cash on delivery', pay_store: 'Pay in store',
    foot_copy: '© 2026 CURVA Moda Real S.L. · VAT B-12345678 · Valencia. All rights reserved.',
    foot_req_tech: 'Requirements: modern browser with JavaScript and cookies enabled.',
    search_title: 'Search the website', search_ph: 'Dress, jeans, pickup…', search_btn: 'Search', close: 'Close',
    gw_title: 'Payment summary',
    gw_sub: 'You are about to pay through the market’s secure gateway. Check the amount before continuing.',
    gw_cancel: 'Back to cart', gw_pay: 'Go to payment gateway',
    cart_title: 'Your cart', cart_sub: 'Reserve your order and choose how to get it',
    step1: 'Cart', step2: 'Delivery', step3: 'Payment',
    cart_empty: 'Your cart is empty. Add a garment to get started.',
    coupon_ph: 'Code: CURVA10', coupon_apply: 'Apply',
    del_pick: 'How would you like to receive it?',
    del_pickup_t: 'Pick up at the market',
    del_pickup_d: 'Central Market · Stall 42, Valencia. Ready in 2 h. Free.',
    del_ship_t: 'Home delivery',
    del_ship_d: '24–72 h in mainland Spain. 4.95 € · free over 79 €.',
    pay_title: 'When do you want to pay?',
    pay1_t: 'Pay when I collect it',
    pay1_d: 'Reserve now and pay at the stall by card, Bizum or cash.',
    pay2_t: 'Pay on delivery',
    pay2_d: 'Cash on delivery to the courier. Handling fee 1.50 €.',
    pay3_t: 'Pay now · Market gateway',
    pay3_d: 'Card or Bizum in a secure window. Priority order.',
    done_t: 'Order reserved!', done_d: 'We have emailed you the details. See you at stall 42 of the Central Market.',
    done_ref: 'Reference', back: 'Back', checkout: 'Checkout', cart_secure: 'Protected purchase · No card details stored',
    ck_title: 'Cookies',
    ck_text: 'We use our own cookies to remember your cart, language and theme, plus anonymous statistics cookies to improve the shop.',
    ck_config: 'Configure', ck_reject: 'Reject', ck_accept: 'Accept all',
    /* Textos generados por JavaScript */
    t_added: 'Added to your cart',
    t_need_size: 'Choose a size first',
    t_coupon_ok: 'Code applied: -10%',
    t_coupon_bad: 'That code is not valid',
    t_form_ok: 'Message sent! We will reply in under 4 hours.',
    t_form_ko: 'Please check the highlighted fields.',
    t_user: 'Customer area under construction. Soon: login, orders and returns.',
    t_size: (n) => `Your CURVA size is ${n}.`,
    t_size_ko: 'Check the measurements: values between 80 and 200 cm.',
    t_hits: (n, q) => `${n} result${n === 1 ? '' : 's'} for “${q}”`,
    t_no_hits: (q) => `No results for “${q}”`,
    t_hit_of: (a, b) => `${a} of ${b}`,
    t_empty_search: 'Type something to search in the page.',
    t_clear: 'Matches highlighted. Scroll the page to see them.',
    t_deliver: 'Continue to delivery',
    t_payment: 'Continue to payment',
    t_confirm: 'Confirm reservation',
    t_again: 'Keep shopping',
    t_need_fields: 'Fill in the delivery address to continue.',
    t_need_pay: 'Choose a payment method.',
    t_subtotal: 'Subtotal', t_discount: 'Discount', t_shipping: 'Shipping', t_fee: 'Cash on delivery fee', t_total: 'Total',
    t_free: 'Free', t_coupon_line: 'Code CURVA10 (-10%)',
    t_pickup_line: 'Pickup at Central Market · Stall 42',
    t_ship_line: 'Home delivery',
    t_pick_cash: 'Pay at pickup', t_cod: 'Pay on delivery', t_gateway: 'Market payment gateway',
    t_items: (n) => `${n} item${n === 1 ? '' : 's'}`,
    t_done_pickup: 'Reservation confirmed. Pay when you collect it at the market.',
    t_done_cod: 'Order confirmed. You will pay the courier on delivery.',
    t_gateway_note: 'Order created. Complete the payment in the secure gateway to ship it.',
    t_gateway_ready: 'Gateway hook ready: CURVA.checkout(order)',
    t_order: 'Order', t_products: 'Products',
    t_gw_open: 'Review your order and open the secure payment window.',
    t_lang_done: 'Language updated',
    t_theme_light: 'Light mode', t_theme_dark: 'Dark mode',
    t_saved: 'Preferences saved. Thank you!',
    t_rejected: 'Only essential cookies will be used.',
    t_stats: 'Statistics cookies', t_marketing: 'Marketing cookies', t_save: 'Save preferences'
  },

  /* ----- VALENCIÀ ----- */
  va: {
    top_phone: '+34 960 123 456',
    top_note: 'Enviament gratis des de 79 € · Recollida gratis en el Mercat Central',
    logo_sub: 'moda real',
    nav_home: 'Inici', nav_shop: 'Col·lecció', nav_sizes: 'La teua talla', nav_about: 'Nosaltres',
    nav_reviews: 'Opinions', nav_contact: 'Contacte',
    search_aria: 'Buscar', user_aria: 'Àrea de clienta', cart_aria: 'Cistella', theme_aria: 'Canviar tema',
    cart_close_aria: 'Tancar cistella', top_aria: 'Tornar amunt', search_cta: 'Buscar en la web',
    hero_kicker: 'Talles 44 · 72 · Patronatge propi',
    hero_title: 'Roba dissenyada<br>per al teu cos real',
    hero_sub: 'Moda amb estructura, teixits amb cos i talles que de veres et queden. No “una talla més”: patrons fets des de la talla 44.',
    hero_cta1: 'Vore la col·lecció', hero_cta2: 'Trobar la meua talla',
    stat_1: 'Rang de talles', stat_2: 'Clientes curvy', stat_3: 'Valoració mitjana', stat_4: 'Devolució gratis',
    about_eyebrow: 'Moda real',
    about_title: 'Roba pensada des del primer patronatge per a cossos amb corbes',
    about_lead: 'No engreixem un patró xicotet: dibuixem cada peça sobre cossos talla 52 i 62 i la provem en models reals de 44 a 72. El resultat és roba que acompanya, no que apreta.',
    f1_t: 'Patronatge curvy',
    f1_d: 'Escalat propi per mesura de pit, cintura i maluc. Res d’espatlleres gegants ni costures mal posades.',
    f2_t: 'Teixits amb cos',
    f2_d: 'Viscosa pesada, punt d’algodó i cotó amb elastà doble: sostenen i no marquen el que no vols.',
    f3_t: 'Prova a casa 30 dies',
    f3_d: 'T’ho duus, ho proves amb calma i si no és la teua talla el canviem gratis. També en botiga.',
    f4_t: 'Recull en el mercat',
    f4_d: 'Pije hui i recull-ho en el nostre lloc del Mercat Central de València, o en els mercats de Russafa i Colón.',
    shop_eyebrow: 'Col·lecció Tardor 26', shop_title: 'El bàsics que sí que t’van bé',
    f_all: 'Tot', f_dress: 'Vestits', f_shirt: 'Camiseria', f_knit: 'Punt', f_pants: 'Pantalons', f_coat: 'Abric',
    tag_best: 'Més venut', tag_new: 'Novetat', tag_limited: 'Últimes unitats', quick: 'Vista ràpida',
    p1_d: 'Viscosa pesada amb caiguda, cintura elàstica invisible i màniga francesa.',
    p2_d: 'Punt lliger que no marca, espatlla caiguda i llarg que cobreix el maluc.',
    p3_d: 'Mescla de lli i viscosa, folre interior i tir alt que no es marca.',
    p4_d: 'Cotó amb 4 % d’elastà, cintura que no baixa i costura d’escalat curvy.',
    p5_d: 'Llana reciclada, espatllera suau i tall recte que estilitza sense apretar.',
    p6_d: 'Dues peces de punt gruixut que es porten juntes o per separat.',
    add: 'Afegir a la cistella',
    shop_note: 'Tots els preus inclouen IVA. Enviament 4,95 € (gratis des de 79 €) o recollida gratuïta al Mercat Central de València en 2 h.',
    size_eyebrow: 'Guia de talles', size_title: 'Descobreix la teua talla CURVA en 10 segons',
    size_lead: 'Mideix amb una cinta sobre el cos, sense apretar: pit en el punt més ample, cintura per l’omblic i maluc en la part més ampla.',
    label_bust: 'Pit (cm)', label_waist: 'Cintura (cm)', label_hip: 'Maluc (cm)', size_btn: 'Calcular la meua talla',
    table_caption: 'Taula de mesures corporals (cm)',
    th_size: 'Talla', th_bust: 'Pit', th_waist: 'Cintura', th_hip: 'Maluc',
    table_note: 'Entre dos talles? Si t’agrada més ajustat tria la menor; si prefers holgura, la major.',
    del_eyebrow: 'Enviament i recollida', del_title: 'Tries com rebre la teua comanda',
    del1_t: 'Recollida en el mercat · Gratis',
    del1_d: 'Preparam la teua comanda en 2 hores i la guardem 7 dies en el lloc 42 del Mercat Central de València. Pagues al recollir-la si vols.',
    del2_t: 'Enviament a domicili · 4,95 €',
    del2_d: '24–72 h en la Península. Gratis des de 79 €. Pots pagar contra reemborsament (+1,50 €).',
    del3_t: 'Pagament segur online',
    del3_d: 'Targeta, Bizum o transferència per la passarel·la del mercat. Dades xifrades i sense guardar targetes.',
    faq_title: 'Preguntes freqüents',
    faq1_q: 'Les talles són iguals en totes les peces?',
    faq1_a: 'Sí. Treballem amb una única taula d’escalat, així que la teua talla et val per a vestits, cotons i abrics. Indiquem en cada fitxa si un model és més ample.',
    faq2_q: 'Puc provar i devoldre gratis?',
    faq2_a: 'Tens 30 dies. Recollim al teu domicili o ho portes al lloc del mercat: canvi de talla gratis i devolució de l’import en 48 h.',
    faq3_q: 'Com funciona el pagament al recollir?',
    faq3_a: 'Reserves la comanda sense pagar i en el lloc pagues amb targeta, Bizum o efectiu quan la reps. T’avisem per WhatsApp quan estiga a punt.',
    faq4_q: 'Teniu assessoria d’imatge?',
    faq4_a: 'Sí, gratuïta i sense cita: escriu-nos per WhatsApp amb l’alçada i les mesures i et preparem un provador amb 3 looks.',
    rev_eyebrow: 'Opinions verificades', rev_title: '4,9 sobre 5 en 1.283 ressenyes',
    rev1: '“És la primera vegada que un pantaló m’entra sense pujar de talla pel maluc. El 60 és la meua talla i ja no dubte.”',
    rev2: '“V’a les 11 i a les 13 era al mercat. Me’l vaig provar allí mateix i me’n vaig dur dos vestits més.”',
    rev3: '“L’assessora em va canviar una blusa per WhatsApp sense cost. Atenció de botiga de barri amb web moderna.”',
    ct_eyebrow: 'Contacte', ct_title: 'Dúbdes de talla? T’ajudem',
    ct_lead: 'Contestem en menys de 4 hores en horari de botiga. També pots vindre a vore’ns: el provador sempre està lliure.',
    ct_store: 'Mercat Central · Lloc 42', ct_hours: 'Horari',
    ct_hours_v: 'Dl–Dv 8:00–14:30 i 17:00–20:30 · Ds 8:00–14:00',
    ct_phone: 'Telèfon i WhatsApp', ct_mail: 'Correu',
    form_name: 'Nom', form_email: 'Correu', form_topic: 'Motiu', form_msg: 'Missatge',
    ph_name: 'El teu nom', ph_msg: 'Contesta’m l’alçada, la talla habitual i què busques',
    opt_size: 'Assessoria de talla', opt_order: 'Estat de la meua comanda', opt_return: 'Canvi o devolució', opt_other: 'Altre',
    form_privacy: 'He llegit i accepte la política de privacitat.', form_send: 'Enviar missatge',
    form_address: 'Adreça completa', form_zip: 'Codi postal', form_city: 'Ciutat',
    foot_desc: 'Botiga de moda per a talles 44–72. Patronatge propi a València, teixits amb cos i recollida al Mercat Central.',
    foot_shop: 'Botiga', foot_gift: 'Targeta regal', foot_help: 'Ajut', foot_guide: 'Guia de talles',
    foot_ship: 'Enviaments i recollida', foot_returns: 'Devolucions 30 dies', foot_asessoria: 'Assessoria d’imatge',
    foot_legal: 'Legal i requisits', foot_cookies: 'Política de cookies', foot_legal_note: 'Avís legal',
    foot_privacy: 'Privacitat', foot_req: 'Requisits de la comanda',
    pay_cod: 'Contra reemborsament', pay_store: 'Pagament en botiga',
    foot_copy: '© 2026 CURVA Moda Real S.L. · CIF B-12345678 · València. Tots els drets reservats.',
    foot_req_tech: 'Requisits: navegador modern amb JavaScript i cookies actives.',
    search_title: 'Buscar en la web', search_ph: 'Vestit, pantaló, recollida…', search_btn: 'Buscar', close: 'Tancar',
    gw_title: 'Resum del teu pagament',
    gw_sub: 'Vas a pagar per la passarel·la segura del mercat. Comprova l’import abans de continuar.',
    gw_cancel: 'Tornar a la cistella', gw_pay: 'Anar a la passarel·la de pagament',
    cart_title: 'La teua cistella', cart_sub: 'Reserva la compra i tria com recollir-la',
    step1: 'Cistella', step2: 'Lliurament', step3: 'Pagament',
    cart_empty: 'La teua cistella està buida. Afig alguna peça per a començar.',
    coupon_ph: 'Codi: CURVA10', coupon_apply: 'Aplicar',
    del_pick: 'Com ho vols rebre?',
    del_pickup_t: 'Recollir en el mercat',
    del_pickup_d: 'Mercat Central · Lloc 42, València. Llest en 2 h. Gratis.',
    del_ship_t: 'Enviament a domicili',
    del_ship_d: '24–72 h en la Península. 4,95 € · gratis des de 79 €.',
    pay_title: 'Quan vols pagar?',
    pay1_t: 'Pagar al recollir-ho',
    pay1_d: 'Reserves ara i pagues en el lloc amb targeta, Bizum o efectiu.',
    pay2_t: 'Pagar al rebre-ho',
    pay2_d: 'Contra reemborsament al repartidor. Despeses de gestió 1,50 €.',
    pay3_t: 'Pagar ara · Passarel·la del mercat',
    pay3_d: 'Targeta o Bizum en una finestra segura. Comanda prioritària.',
    done_t: 'Comanda reservada!',
    done_d: 'T’hem enviat el detall per correu. Ens vorem en el lloc 42 del Mercat Central.',
    done_ref: 'Referència', back: 'Enrere', checkout: 'Tramitar comanda', cart_secure: 'Compra protegida · Sense dades de targeta guardades',
    ck_title: 'Cookies',
    ck_text: 'Usem cookies pròpies per a recordar la teua cistella, l’idioma i el tema, i cookies estadístiques anònimes per a millorar la botiga.',
    ck_config: 'Configurar', ck_reject: 'Rebutjar', ck_accept: 'Acceptar totes',
    t_added: 'Afegit a la cistella',
    t_need_size: 'Tria una talla abans',
    t_coupon_ok: 'Codi aplicat: -10%',
    t_coupon_bad: 'Este codi no és vàlid',
    t_form_ok: 'Missatge enviat! Contestem en menys de 4 hores.',
    t_form_ko: 'Revisa els camps marcats.',
    t_user: 'Àrea de clienta en construcció. Aviat: login, comandes i devolucions.',
    t_size: (n) => `La teua talla CURVA és la ${n}.`,
    t_size_ko: 'Revisa les mesures: valors entre 80 i 200 cm.',
    t_hits: (n, q) => `${n} resultat${n === 1 ? '' : 's'} per a “${q}”`,
    t_no_hits: (q) => `Cap resultat per a “${q}”`,
    t_hit_of: (a, b) => `${a} de ${b}`,
    t_empty_search: 'Escriu alguna cosa per a buscar en la pàgina.',
    t_clear: 'Coincidències ressaltades. Desplaça la pàgina per a vore-les.',
    t_deliver: 'Continuar al lliurament',
    t_payment: 'Continuar al pagament',
    t_confirm: 'Confirmar reserva',
    t_again: 'Seguir comprant',
    t_need_fields: 'Ompli l’adreça de lliurament per a continuar.',
    t_need_pay: 'Tria una forma de pagament.',
    t_subtotal: 'Subtotal', t_discount: 'Descompte', t_shipping: 'Enviament', t_fee: 'Despeses de reemborsament', t_total: 'Total',
    t_free: 'Gratis', t_coupon_line: 'Codi CURVA10 (-10%)',
    t_pickup_line: 'Recollida Mercat Central · Lloc 42',
    t_ship_line: 'Enviament a domicili',
    t_pick_cash: 'Pagar al recollir', t_cod: 'Pagar al rebre', t_gateway: 'Passarel·la del mercat',
    t_items: (n) => `${n} article${n === 1 ? '' : 's'}`,
    t_done_pickup: 'Reserva confirmada. Pagues al recollir-la al mercat.',
    t_done_cod: 'Comanda confirmada. Pagaràs al repartidor en el lliurament.',
    t_gateway_note: 'Comanda creada. Completa el pagament en la passarel·la segura per a enviar-la.',
    t_gateway_ready: 'Hook de passarel·la a punt: CURVA.checkout(order)',
    t_order: 'Comanda', t_products: 'Productes',
    t_gw_open: 'Revisa la teua comanda i obri la finestra segura de pagament.',
    t_lang_done: 'Idioma actualitzat',
    t_theme_light: 'Mode clar', t_theme_dark: 'Mode fosc',
    t_saved: 'Preferències guardades. Gràcies!',
    t_rejected: 'Només s’usaran cookies essencials.',
    t_stats: 'Cookies estadístiques', t_marketing: 'Cookies de màrqueting', t_save: 'Guardar preferències'
  }
};

/** Español: el HTML ya está en este idioma, solo textos dinámicos */
I18N.es = {
  t_added: 'Añadido a la cesta',
  t_need_size: 'Elige una talla primero',
  t_coupon_ok: 'Código aplicado: -10%',
  t_coupon_bad: 'Ese código no es válido',
  t_form_ok: '¡Mensaje enviado! Respondemos en menos de 4 horas.',
  t_form_ko: 'Revisa los campos marcados.',
  t_user: 'Área de cliente en preparación. Pronto: login, pedidos y devoluciones.',
  t_size: (n) => `Tu talla CURVA es la ${n}.`,
  t_size_ko: 'Revisa las medidas: valores entre 80 y 200 cm.',
  t_hits: (n, q) => `${n} resultado${n === 1 ? '' : 's'} para “${q}”`,
  t_no_hits: (q) => `Sin resultados para “${q}”`,
  t_hit_of: (a, b) => `${a} de ${b}`,
  t_empty_search: 'Escribe algo para buscar en la página.',
  t_clear: 'Coincidencias resaltadas. Desplázate por la página para verlas.',
  t_deliver: 'Continuar a la entrega',
  t_payment: 'Continuar al pago',
  t_confirm: 'Confirmar reserva',
  t_again: 'Seguir comprando',
  t_need_fields: 'Completa la dirección de entrega para continuar.',
  t_need_pay: 'Elige una forma de pago.',
  t_subtotal: 'Subtotal', t_discount: 'Descuento', t_shipping: 'Envío', t_fee: 'Gestión contra reembolso', t_total: 'Total',
  t_free: 'Gratis', t_coupon_line: 'Código CURVA10 (-10%)',
  t_pickup_line: 'Recogida Mercado Central · Puesto 42',
  t_ship_line: 'Envío a domicilio',
  t_pick_cash: 'Pagar al recoger', t_cod: 'Pagar al recibir', t_gateway: 'Pasarela del mercado',
  t_items: (n) => `${n} artículo${n === 1 ? '' : 's'}`,
  t_done_pickup: 'Reserva confirmada. Pagas al recogerlo en el mercado.',
  t_done_cod: 'Pedido confirmado. Pagas al repartidor en la entrega.',
  t_gateway_note: 'Pedido creado. Completa el pago en la pasarela segura para enviarlo.',
  t_gateway_ready: 'Hook de pasarela listo: CURVA.checkout(order)',
  t_order: 'Pedido', t_products: 'Productos',
  t_gw_open: 'Revisa tu pedido y abre la ventana segura de pago.',
  t_lang_done: 'Idioma actualizado',
  t_theme_light: 'Modo claro', t_theme_dark: 'Modo oscuro',
  t_saved: 'Preferencias guardadas. ¡Gracias!',
  t_rejected: 'Solo se usarán cookies esenciales.',
  t_stats: 'Cookies estadísticas', t_marketing: 'Cookies de marketing', t_save: 'Guardar preferencias'
};

/** Traduce un elemento según sus atributos data-i18n / data-i18n-ph / data-i18n-aria */
function translateDOM(lang) {
  const dict = I18N[lang] || {};
  $$('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    const value = dict[key];
    if (typeof value === 'string') el.innerHTML = value;
  });
  $$('[data-i18n-ph]').forEach(el => {
    const value = dict[el.dataset.i18nPh];
    if (typeof value === 'string' && value) el.setAttribute('placeholder', value);
  });
  $$('[data-i18n-aria]').forEach(el => {
    const value = dict[el.dataset.i18nAria];
    if (typeof value === 'string') el.setAttribute('aria-label', value);
  });
}

/** Texto dinámico traducido: admite claves de texto o funciones */
function t(key, ...args) {
  const entry = (I18N[state.lang] || {})[key];
  if (typeof entry === 'function') return entry(...args);
  if (typeof entry === 'string') return entry;
  const base = I18N.es[key];
  return typeof base === 'function' ? base(...args) : (typeof base === 'string' ? base : key);
}

/* ------------------------------------------------------------
   2. ESTADO GLOBAL
   ------------------------------------------------------------ */
const SHIPPING_COST = 4.95;
const FREE_SHIPPING_FROM = 79;
const COD_FEE = 1.5;
const COUPONS = { CURVA10: { type: 'percent', value: 10, label: 't_coupon_line' } };

const state = {
  lang: Store.get('curva_lang', 'es'),
  theme: Store.get('curva_theme', null),
  items: Store.get('curva_cart', []),
  coupon: Store.get('curva_coupon', null),
  delivery: 'pickup',
  payment: 'pickup_cash',
  step: 'cart',
  order: null
};

/* ------------------------------------------------------------
   3. FORMATO DE MONEDA
   ------------------------------------------------------------ */
function localeOf(lang) {
  return lang === 'en' ? 'en-GB' : 'es-ES';
}
const money = (value) => new Intl.NumberFormat(localeOf(state.lang), {
  style: 'currency', currency: 'EUR', minimumFractionDigits: 2
}).format(value);

/* ------------------------------------------------------------
   4. TOASTS
   ------------------------------------------------------------ */
function toast(message, kind = 'ok', ms = 2800) {
  const wrap = $('#toastWrap');
  const el = document.createElement('div');
  el.className = `toast${kind === 'error' ? ' is-error' : ''}`;
  el.textContent = message;
  wrap.appendChild(el);
  setTimeout(() => {
    el.classList.add('is-out');
    setTimeout(() => el.remove(), 320);
  }, ms);
}

/* ------------------------------------------------------------
   5. TEMA CLARO / OSCURO
   ------------------------------------------------------------ */
const prefersDark = () => window.matchMedia('(prefers-color-scheme: dark)').matches;

function applyTheme(theme, announce = false) {
  const value = theme || (prefersDark() ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', value);
  state.theme = value;
  const btn = $('#themeToggle');
  if (btn) {
    btn.classList.remove('is-spinning');
    void btn.offsetWidth;              /* reinicia la animación */
    btn.classList.add('is-spinning');
  }
  Store.set('curva_theme', value);
  if (announce) toast(value === 'dark' ? t('t_theme_dark') : t('t_theme_light'));
}

function initTheme() {
  applyTheme(Store.get('curva_theme', null));
  $('#themeToggle').addEventListener('click', () => {
    applyTheme(state.theme === 'dark' ? 'light' : 'dark', true);
  });
}

/* ------------------------------------------------------------
   6. IDIOMAS
   ------------------------------------------------------------ */
function applyLang(lang, announce = false) {
  state.lang = I18N[lang] ? lang : 'es';
  document.documentElement.setAttribute('lang', state.lang === 'va' ? 'ca' : state.lang);
  translateDOM(state.lang);
  $$('.lang-btn').forEach(b => b.classList.toggle('is-active', b.dataset.lang === state.lang));
  Store.set('curva_lang', state.lang);
  renderCart();
  renderTotals();
  updateStepUI();
  if (announce) toast(t('t_lang_done'));
}

function initLang() {
  $$('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => applyLang(btn.dataset.lang, true));
  });
}

/* ------------------------------------------------------------
   7. HEADER, SCROLL SUAVE Y NAVEGACIÓN ACTIVA
   ------------------------------------------------------------ */
function initHeaderScroll() {
  const header = $('#siteHeader');
  const toTop = $('#toTop');

  const onScroll = () => {
    const y = window.scrollY;
    header.classList.toggle('is-scrolled', y > 12);
    toTop.classList.toggle('is-visible', y > 620);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  toTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/** Scroll suave a un selector, compensando el header fijo */
function smoothScrollTo(selector) {
  const target = selector === '#inicio' ? document.body : $(selector);
  if (!target) return;
  const offset = selector === '#inicio' ? 0 : ($('#siteHeader').offsetHeight - 2);
  const top = (selector === '#inicio' ? 0 : target.getBoundingClientRect().top + window.scrollY - offset);
  window.scrollTo({ top, behavior: 'smooth' });
}

function initSmoothLinks() {
  $$('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (ev) => {
      const id = link.getAttribute('href');
      if (!id || id === '#' || !$(id)) return;
      ev.preventDefault();
      closeMobileMenu();
      smoothScrollTo(id);
      history.replaceState(null, '', id);
    });
  });
}

/** Marca como activo el enlace del menú de la sección visible */
function initActiveNav() {
  const sections = $$('main section[id]');
  const links = $$('.nav-link');
  if (!('IntersectionObserver' in window) || !sections.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const id = `#${entry.target.id}`;
      links.forEach(l => l.classList.toggle('is-active', l.getAttribute('href') === id));
    });
  }, { rootMargin: '-45% 0px -50% 0px' });

  sections.forEach(s => observer.observe(s));
}

/* ------------------------------------------------------------
   8. MENÚ HAMBURGUESA
   ------------------------------------------------------------ */
function openMobileMenu() {
  const menu = $('#mobileMenu');
  const burger = $('#burger');
  menu.classList.add('is-open');
  menu.setAttribute('aria-hidden', 'false');
  burger.setAttribute('aria-expanded', 'true');
  burger.setAttribute('aria-label', 'Cerrar menú');
  document.body.classList.add('is-locked');
}

function closeMobileMenu() {
  const menu = $('#mobileMenu');
  const burger = $('#burger');
  if (!menu.classList.contains('is-open')) return;
  menu.classList.remove('is-open');
  menu.setAttribute('aria-hidden', 'true');
  burger.setAttribute('aria-expanded', 'false');
  burger.setAttribute('aria-label', 'Abrir menú');
  document.body.classList.remove('is-locked');
}

function initMobileMenu() {
  $('#burger').addEventListener('click', () => {
    $('#mobileMenu').classList.contains('is-open') ? closeMobileMenu() : openMobileMenu();
  });

  /* Cerrar al pulsar un enlace (y hacer scroll suave) */
  $$('.mobile-link').forEach(link => {
    link.addEventListener('click', () => closeMobileMenu());
  });

  /* Cerrar al escapar */
  document.addEventListener('keydown', (ev) => {
    if (ev.key === 'Escape') closeMobileMenu();
  });

  /* Cerrar al cambiar el tamaño de pantalla (umbral tablet/escritorio) */
  window.addEventListener('resize', debounce(() => {
    if (window.innerWidth > 1080) closeMobileMenu();
  }, 120));
}

/* ------------------------------------------------------------
   9. MODAL DE BÚSQUEDA CON RESALTADO
   ------------------------------------------------------------ */
const Search = {
  term: '',
  hits: [],
  index: -1
};

function openSearch() {
  closeMobileMenu();
  $('#searchModal').classList.add('is-open');
  $('#searchModal').setAttribute('aria-hidden', 'false');
  document.body.classList.add('is-locked');
  setTimeout(() => $('#searchInput').focus(), 60);
}

function closeSearch(keepHighlights = true) {
  const modal = $('#searchModal');
  if (!modal.classList.contains('is-open')) return;
  modal.classList.remove('is-open');
  modal.setAttribute('aria-hidden', 'true');
  if (!keepHighlights) clearHighlights();
  document.body.classList.remove('is-locked');
}

function clearHighlights() {
  $$('mark.search-hit').forEach(mark => {
    const parent = mark.parentNode;
    if (!parent) return;
    parent.replaceChild(document.createTextNode(mark.textContent), mark);
    parent.normalize();
  });
  Search.hits = [];
  Search.index = -1;
  Search.term = '';
}

function runSearch(term) {
  clearHighlights();
  const query = term.trim();
  Search.term = query;
  const status = $('#searchStatus');

  if (query.length < 2) {
    status.textContent = t('t_empty_search');
    return;
  }

  const root = $('#main');
  const safe = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  /* Regex con captura (global) para dividir y otro sin flags para comprobar,
     así evitamos el estado interno de lastIndex del regex global. */
  const splitter = new RegExp(`(${safe})`, 'gi');
  const tester = new RegExp(`^${safe}$`, 'i');

  /* Recorre los nodos de texto de <main> y envuelve las coincidencias */
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      if (!node.nodeValue || !node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
      const tag = node.parentElement ? node.parentElement.tagName : '';
      if (tag === 'SCRIPT' || tag === 'STYLE' || tag === 'MARK') return NodeFilter.FILTER_REJECT;
      if (node.parentElement.closest('input, textarea, select, button')) return NodeFilter.FILTER_REJECT;
      return new RegExp(safe, 'i').test(node.nodeValue) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
    }
  });

  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);

  nodes.forEach(node => {
    const parts = node.nodeValue.split(splitter);
    const frag = document.createDocumentFragment();
    parts.forEach(part => {
      if (tester.test(part)) {
        const mark = document.createElement('mark');
        mark.className = 'search-hit';
        mark.textContent = part;
        frag.appendChild(mark);
      } else {
        frag.appendChild(document.createTextNode(part));
      }
    });
    node.parentNode.replaceChild(frag, node);
  });

  Search.hits = $$('#main mark.search-hit');
  Search.index = -1;
  status.textContent = Search.hits.length ? t('t_hits', Search.hits.length, query) : t('t_no_hits', query);

  if (Search.hits.length) {
    goToHit(0);
    toast(t('t_clear'));
  }
}

function goToHit(index) {
  if (!Search.hits.length) return;
  Search.hits.forEach(h => h.classList.remove('is-current'));
  Search.index = (index + Search.hits.length) % Search.hits.length;
  const current = Search.hits[Search.index];
  current.classList.add('is-current');
  current.scrollIntoView({ behavior: 'smooth', block: 'center' });
  $('#searchStatus').textContent = `${t('t_hit_of', Search.index + 1, Search.hits.length)} · “${Search.term}”`;
}

function initSearch() {
  $('#searchOpen').addEventListener('click', openSearch);
  $('#searchOpenMobile').addEventListener('click', openSearch);
  $('#searchSubmit').addEventListener('click', () => runSearch($('#searchInput').value));
  $('#searchNext').addEventListener('click', () => goToHit(Search.index + 1));
  $('#searchPrev').addEventListener('click', () => goToHit(Search.index - 1));
  $('#searchClear').addEventListener('click', () => {
    $('#searchInput').value = '';
    clearHighlights();
    $('#searchStatus').textContent = '';
    $('#searchInput').focus();
  });

  $$('[data-close-search]').forEach(el => el.addEventListener('click', () => closeSearch()));

  $('#searchInput').addEventListener('keydown', (ev) => {
    if (ev.key === 'Enter') { ev.preventDefault(); runSearch(ev.target.value); }
  });

  document.addEventListener('keydown', (ev) => {
    if (ev.key === 'Escape') closeSearch();
    if ((ev.ctrlKey || ev.metaKey) && ev.key.toLowerCase() === 'k') {
      ev.preventDefault();
      openSearch();
    }
  });
}

/* ------------------------------------------------------------
   10. APARICIÓN DE SECCIONES
   ------------------------------------------------------------ */
function initReveal() {
  const items = $$('.reveal');
  if (!('IntersectionObserver' in window)) {
    items.forEach(el => el.classList.add('is-visible'));
    return;
  }
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      obs.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  items.forEach(el => observer.observe(el));
}

/* ------------------------------------------------------------
   11. FILTROS DE COLECCIÓN
   ------------------------------------------------------------ */
function initFilters() {
  $$('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      $$('.filter-btn').forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      const filter = btn.dataset.filter;
      $$('.product-card').forEach(card => {
        const show = filter === 'all' || card.dataset.category === filter;
        card.classList.toggle('is-hidden', !show);
      });
    });
  });
}

/* ------------------------------------------------------------
   12. PRODUCTOS
   ------------------------------------------------------------ */
/** Devuelve los datos de un producto leyendo su tarjeta del DOM */
function getProduct(id) {
  const card = $(`.product-card[data-id="${id}"]`);
  if (!card) return null;
  return {
    id,
    name: $('.product-name', card).textContent.trim(),
    price: parseFloat(card.dataset.price),
    img: card.dataset.img,
    color: card.dataset.color,
    sizes: $$('.size-chip', card).map(c => c.textContent.trim())
  };
}

function selectedSize(id) {
  const card = $(`.product-card[data-id="${id}"]`);
  const chip = card ? $('.size-chip.is-active', card) : null;
  return chip ? chip.textContent.trim() : null;
}

function initSizeChips() {
  document.addEventListener('click', (ev) => {
    const chip = ev.target.closest('.size-chip');
    if (!chip) return;
    $$('.size-chip', chip.closest('.size-row')).forEach(c => c.classList.remove('is-active'));
    chip.classList.add('is-active');
  });
}

function initAddButtons() {
  document.addEventListener('click', (ev) => {
    const btn = ev.target.closest('[data-add]');
    if (!btn) return;
    const id = btn.dataset.add;
    const size = selectedSize(id);
    if (!size) { toast(t('t_need_size'), 'error'); return; }
    addToCart(id, size, 1);
  });
}

/* ------------------------------------------------------------
   13. VISTA RÁPIDA DE PRODUCTO
   ------------------------------------------------------------ */
function openProductModal(id) {
  const p = getProduct(id);
  if (!p) return;
  const box = $('#productModalBox');
  box.innerHTML = `
    <div class="qv">
      <img class="qv-img" src="${p.img}" alt="${p.name}">
      <div class="qv-body">
        <h3 class="modal-title">${p.name}</h3>
        <p class="product-desc">${$('.product-desc', $(`.product-card[data-id="${id}"]`)).innerHTML}</p>
        <p class="product-price">${money(p.price)}</p>
        <p class="qv-meta"><span>Color</span> ${p.color}</p>
        <div class="field">
          <label>Talla</label>
          <div class="size-row" id="qvSizes">
            ${p.sizes.map(s => `<button class="size-chip" type="button">${s}</button>`).join('')}
          </div>
        </div>
        <div class="qv-actions">
          <div class="qty">
            <button type="button" data-qty="-1" aria-label="-">−</button>
            <span id="qvQty">1</span>
            <button type="button" data-qty="1" aria-label="+">+</button>
          </div>
          <button class="btn btn-primary" id="qvAdd" type="button">${t('add')}</button>
        </div>
      </div>
    </div>`;

  $('#productModal').classList.add('is-open');
  $('#productModal').setAttribute('aria-hidden', 'false');
  document.body.classList.add('is-locked');

  let qty = 1;
  $$('[data-qty]', box).forEach(b => {
    b.addEventListener('click', () => {
      qty = Math.min(10, Math.max(1, qty + parseInt(b.dataset.qty, 10)));
      $('#qvQty', box).textContent = qty;
    });
  });
  $('#qvAdd', box).addEventListener('click', () => {
    const active = $('#qvSizes .size-chip.is-active', box);
    if (!active) { toast(t('t_need_size'), 'error'); return; }
    addToCart(id, active.textContent.trim(), qty);
    closeProductModal();
  });
}

function closeProductModal() {
  const modal = $('#productModal');
  modal.classList.remove('is-open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('is-locked');
}

function initProductModal() {
  document.addEventListener('click', (ev) => {
    const quick = ev.target.closest('[data-quick]');
    if (quick) { openProductModal(quick.dataset.quick); return; }
    if (ev.target.closest('[data-close-product]')) closeProductModal();
  });
  document.addEventListener('keydown', (ev) => { if (ev.key === 'Escape') closeProductModal(); });
}

/* ------------------------------------------------------------
   14. CARRITO
   ------------------------------------------------------------ */
function cartCount() {
  return state.items.reduce((sum, item) => sum + item.qty, 0);
}

function cartSubtotal() {
  return state.items.reduce((sum, item) => sum + item.price * item.qty, 0);
}

function shippingCost() {
  if (state.delivery === 'pickup') return 0;
  return cartSubtotal() >= FREE_SHIPPING_FROM ? 0 : SHIPPING_COST;
}

function codFee() {
  return state.payment === 'cod' ? COD_FEE : 0;
}

function discount() {
  if (!state.coupon || !COUPONS[state.coupon]) return 0;
  const rule = COUPONS[state.coupon];
  return rule.type === 'percent' ? cartSubtotal() * rule.value / 100 : rule.value;
}

function cartTotal() {
  return Math.max(0, cartSubtotal() - discount() + shippingCost() + codFee());
}

function addToCart(id, size, qty = 1) {
  const product = getProduct(id);
  if (!product) return;
  const existing = state.items.find(i => i.id === id && i.size === size);
  if (existing) existing.qty = Math.min(10, existing.qty + qty);
  else state.items.push({ id, name: product.name, price: product.price, img: product.img, color: product.color, size, qty });

  persistCart();
  renderCart();
  bumpBadge();
  toast(`${t('t_added')} · ${product.name} (${size})`);
}

function removeFromCart(index) {
  state.items.splice(index, 1);
  persistCart();
  renderCart();
  renderTotals();
}

function changeQty(index, delta) {
  const item = state.items[index];
  if (!item) return;
  item.qty = Math.min(10, Math.max(1, item.qty + delta));
  persistCart();
  renderCart();
  renderTotals();
}

function persistCart() {
  Store.set('curva_cart', state.items);
  $('#cartBadge').textContent = cartCount();
}

function bumpBadge() {
  const badge = $('#cartBadge');
  badge.classList.remove('is-bumping');
  void badge.offsetWidth;
  badge.classList.add('is-bumping');
}

/** Pinta las líneas del carrito */
function renderCart() {
  const list = $('#cartItems');
  const empty = $('#cartEmpty');
  list.innerHTML = '';
  empty.hidden = state.items.length > 0;

  state.items.forEach((item, index) => {
    const li = document.createElement('li');
    li.className = 'cart-item';
    li.innerHTML = `
      <img src="${item.img}" alt="${item.name}">
      <div class="cart-item-info">
        <h4>${item.name}</h4>
        <small>${item.size} · ${item.color}</small>
        <div class="qty">
          <button type="button" data-minus="${index}" aria-label="−">−</button>
          <span>${item.qty}</span>
          <button type="button" data-plus="${index}" aria-label="+">+</button>
        </div>
      </div>
      <div class="cart-item-side">
        <b>${money(item.price * item.qty)}</b>
        <button class="item-remove" type="button" data-remove="${index}">×</button>
      </div>`;
    list.appendChild(li);
  });

  list.onclick = (ev) => {
    const plus = ev.target.closest('[data-plus]');
    const minus = ev.target.closest('[data-minus]');
    const remove = ev.target.closest('[data-remove]');
    if (plus) changeQty(parseInt(plus.dataset.plus, 10), 1);
    else if (minus) changeQty(parseInt(minus.dataset.minus, 10), -1);
    else if (remove) removeFromCart(parseInt(remove.dataset.remove, 10));
  };

  renderTotals();
}

/** Pinta el bloque de totales del pie del cajón */
function renderTotals() {
  const box = $('#cartTotals');
  const sub = cartSubtotal();
  const ship = shippingCost();
  const rows = [];

  rows.push(`<div class="totals-row"><span>${t('t_items', cartCount())}</span><span></span></div>`);
  rows.push(`<div class="totals-row"><span>${t('t_subtotal')}</span><strong>${money(sub)}</strong></div>`);
  if (discount() > 0) {
    rows.push(`<div class="totals-row"><span>${t(COUPONS[state.coupon].label)}</span><strong>−${money(discount())}</strong></div>`);
  }
  rows.push(`<div class="totals-row"><span>${t('t_shipping')}</span><strong>${ship === 0 ? t('t_free') : money(ship)}</strong></div>`);
  if (codFee() > 0) {
    rows.push(`<div class="totals-row"><span>${t('t_fee')}</span><strong>${money(codFee())}</strong></div>`);
  }
  rows.push(`<div class="totals-row is-total"><span>${t('t_total')}</span><strong>${money(cartTotal())}</strong></div>`);

  if (state.delivery === 'shipping') {
    const missing = Math.max(0, FREE_SHIPPING_FROM - sub);
    rows.push(`<p class="totals-note">${missing > 0
      ? `${money(missing)} → ${t('t_free')}`
      : t('t_free')}</p>`);
  }

  box.innerHTML = rows.join('');
  updateStepUI();
}

/** Ajusta textos y visibilidad según el paso del checkout */
function updateStepUI() {
  const map = { cart: 0, delivery: 1, payment: 2, done: 3 };
  const step = state.step;

  $$('.cart-step').forEach(panel => {
    panel.classList.toggle('is-active', panel.dataset.stepPanel === step);
  });
  $$('#cartSteps .step').forEach(el => {
    const i = map[el.dataset.step];
    el.classList.toggle('is-active', i === Math.min(map[step], 2));
    el.classList.toggle('is-done', i < map[step] || step === 'done');
  });

  const next = $('#cartNext');
  const back = $('#cartBack');

  if (step === 'cart') { next.textContent = t('t_deliver'); back.hidden = true; }
  else if (step === 'delivery') { next.textContent = t('t_payment'); back.hidden = false; }
  else if (step === 'payment') { next.textContent = t('t_confirm'); back.hidden = false; }
  else { next.textContent = t('t_again'); back.hidden = true; }

  next.disabled = step === 'cart' && state.items.length === 0;
}

function goToStep(step) {
  state.step = step;
  updateStepUI();
  $('.cart-body').scrollTo({ top: 0, behavior: 'smooth' });
}

/* ------------------------------------------------------------
   15. CAJÓN DEL CARRITO
   ------------------------------------------------------------ */
function openCart() {
  $('#cartDrawer').classList.add('is-open');
  $('#cartDrawer').setAttribute('aria-hidden', 'false');
  $('#drawerBackdrop').classList.add('is-open');
  document.body.classList.add('is-locked');
}

function closeCart() {
  $('#cartDrawer').classList.remove('is-open');
  $('#cartDrawer').setAttribute('aria-hidden', 'true');
  $('#drawerBackdrop').classList.remove('is-open');
  document.body.classList.remove('is-locked');
}

function initCartDrawer() {
  $('#cartOpen').addEventListener('click', openCart);
  $('#cartClose').addEventListener('click', closeCart);
  $('#drawerBackdrop').addEventListener('click', closeCart);

  $('#cartBack').addEventListener('click', () => {
    if (state.step === 'payment') goToStep('delivery');
    else if (state.step === 'delivery') goToStep('cart');
  });

  $('#cartNext').addEventListener('click', handleNextStep);

  /* Entrega */
  $$('input[name="delivery"]').forEach(input => {
    input.addEventListener('change', () => {
      state.delivery = input.value;
      $('#shippingFields').hidden = input.value !== 'shipping';
      $('#deliveryError').textContent = '';
      renderTotals();
    });
  });

  /* Pago */
  $$('input[name="payment"]').forEach(input => {
    input.addEventListener('change', () => {
      state.payment = input.value;
      $('#paymentError').textContent = '';
      renderTotals();
    });
  });

  /* Cupón */
  $('#couponApply').addEventListener('click', () => {
    const code = $('#couponInput').value.trim().toUpperCase();
    const msg = $('#couponMsg');
    if (COUPONS[code]) {
      state.coupon = code;
      Store.set('curva_coupon', code);
      msg.textContent = t('t_coupon_ok');
      msg.className = 'coupon-msg is-ok';
      renderTotals();
    } else {
      state.coupon = null;
      Store.set('curva_coupon', null);
      msg.textContent = t('t_coupon_bad');
      msg.className = 'coupon-msg is-error';
      renderTotals();
    }
  });

  document.addEventListener('keydown', (ev) => { if (ev.key === 'Escape') closeCart(); });
}

/* ------------------------------------------------------------
   16. FLUJO DE COMPRA (CHECKOUT)
   ------------------------------------------------------------ */
function validateDelivery() {
  if (state.delivery === 'pickup') return true;
  const fields = ['#sName', '#sPhone', '#sAddress', '#sZip', '#sCity'];
  const ok = fields.every(sel => $(sel).value.trim().length > 1);
  $('#deliveryError').textContent = ok ? '' : t('t_need_fields');
  return ok;
}

function buildOrder() {
  return {
    reference: `CURVA-${Date.now().toString(36).toUpperCase()}`,
    created: new Date().toISOString(),
    lang: state.lang,
    items: state.items.map(i => ({ id: i.id, name: i.name, size: i.size, color: i.color, qty: i.qty, price: i.price })),
    delivery: state.delivery,
    payment: state.payment,
    amounts: {
      subtotal: +cartSubtotal().toFixed(2),
      discount: +discount().toFixed(2),
      shipping: +shippingCost().toFixed(2),
      fee: +codFee().toFixed(2),
      total: +cartTotal().toFixed(2)
    },
    customer: state.delivery === 'shipping' ? {
      name: $('#sName').value.trim(),
      phone: $('#sPhone').value.trim(),
      address: $('#sAddress').value.trim(),
      zip: $('#sZip').value.trim(),
      city: $('#sCity').value.trim()
    } : { pickupPoint: t('t_pickup_line') }
  };
}

function finishOrder() {
  const order = buildOrder();
  state.order = order;

  const texts = {
    pickup_cash: t('t_done_pickup'),
    cod: t('t_done_cod'),
    gateway: t('t_gateway_note')
  };
  $('#doneTitle').textContent = t('done_t');
  $('#doneText').textContent = texts[state.payment];
  $('#orderRef').textContent = order.reference;

  persistCart();
  goToStep('done');
}

function handleNextStep() {
  if (state.step === 'cart') {
    if (!state.items.length) return;
    goToStep('delivery');
  } else if (state.step === 'delivery') {
    if (validateDelivery()) goToStep('payment');
  } else if (state.step === 'payment') {
    const method = $$('input[name="payment"]').find(i => i.checked);
    if (!method) { $('#paymentError').textContent = t('t_need_pay'); return; }
    state.payment = method.value;
    if (state.payment === 'gateway') openGatewayModal();
    else finishOrder();
  } else {
    /* Reinicio tras la confirmación */
    state.items = [];
    state.coupon = null;
    Store.set('curva_cart', []);
    Store.set('curva_coupon', null);
    $('#cartBadge').textContent = '0';
    $('#couponInput').value = '';
    $('#couponMsg').textContent = '';
    state.step = 'cart';
    renderCart();
    updateStepUI();
    closeCart();
  }
}

/* ------------------------------------------------------------
   17. MODAL PASARELA DE PAGO
   ------------------------------------------------------------
   Aquí se entrega al cliente el objeto `order` ya validado con el
   importe exacto. La pasarela real se conecta en CURVA.checkout(). */
function openGatewayModal() {
  const order = buildOrder();
  const a = order.amounts;
  const payLabel = { pickup_cash: t('t_pick_cash'), cod: t('t_cod'), gateway: t('t_gateway') };

  $('#gatewaySummary').innerHTML = `
    <ul class="gateway-list">
      <li><span>${t('t_order')}</span><strong>${order.reference}</strong></li>
      <li><span>${t('t_products')}</span><span>${t('t_items', cartCount())}</span></li>
      <li><span>${t('t_subtotal')}</span><span>${money(a.subtotal)}</span></li>
      ${a.discount ? `<li><span>${t('t_discount')}</span><span>−${money(a.discount)}</span></li>` : ''}
      <li><span>${t('t_shipping')}</span><span>${a.shipping === 0 ? t('t_free') : money(a.shipping)}</span></li>
      ${a.fee ? `<li><span>${t('t_fee')}</span><span>${money(a.fee)}</span></li>` : ''}
      <li><span>${t('t_pickup_line')}</span><span>${order.delivery === 'shipping' ? t('t_ship_line') : t('t_pickup_line')}</span></li>
      <li><span>${payLabel[state.payment]}</span><span>${payLabel[state.payment]}</span></li>
      <li class="is-total"><span>${t('t_total')}</span><span>${money(a.total)}</span></li>
    </ul>
    <p class="gateway-note">${t('t_gw_open')}</p>`;

  $('#gatewayModal').classList.add('is-open');
  $('#gatewayModal').setAttribute('aria-hidden', 'false');
  $('#gatewayPay').dataset.total = a.total;
}

function closeGatewayModal() {
  $('#gatewayModal').classList.remove('is-open');
  $('#gatewayModal').setAttribute('aria-hidden', 'true');
}

function initGateway() {
  $$('[data-close-gateway]').forEach(el => el.addEventListener('click', closeGatewayModal));

  $('#gatewayPay').addEventListener('click', () => {
    const order = buildOrder();
    state.order = order;
    /* PUNTO DE CONEXIÓN con la pasarela real (a implementar por el cliente).
       Si CURVA.checkout existe, se le entrega el pedido completo.        */
    if (typeof window.CURVA !== 'undefined' && typeof window.CURVA.checkout === 'function') {
      window.CURVA.checkout(order);
    } else {
      toast(`${t('t_gateway_ready')} · ${money(order.amounts.total)}`, 'ok', 4200);
    }
    finishOrder();
    closeGatewayModal();
    $('#doneText').textContent = t('t_gateway_note');
  });

  document.addEventListener('keydown', (ev) => { if (ev.key === 'Escape') closeGatewayModal(); });
}

/* ------------------------------------------------------------
   18. CALCULADORA DE TALLA
   ------------------------------------------------------------ */
const SIZE_CHART = [
  { size: 44, bust: [96, 100], waist: [80, 84],  hip: [104, 108] },
  { size: 48, bust: [101, 106], waist: [85, 90],  hip: [109, 114] },
  { size: 52, bust: [107, 112], waist: [91, 96],  hip: [115, 120] },
  { size: 56, bust: [113, 119], waist: [97, 103], hip: [121, 127] },
  { size: 60, bust: [120, 126], waist: [104, 110], hip: [128, 134] },
  { size: 64, bust: [127, 133], waist: [111, 117], hip: [135, 141] },
  { size: 68, bust: [134, 140], waist: [118, 124], hip: [142, 148] },
  { size: 72, bust: [141, 148], waist: [125, 132], hip: [149, 156] }
];

function calculateSize(bust, waist, hip) {
  let best = null;
  let bestScore = Infinity;
  SIZE_CHART.forEach(row => {
    const mid = (range, value) => (value < range[0] ? range[0] - value : value > range[1] ? value - range[1] : 0);
    const score = mid(row.bust, bust) * 1.4 + mid(row.waist, waist) + mid(row.hip, hip) * 1.2;
    if (score < bestScore) { bestScore = score; best = row; }
  });
  return best;
}

function initSizeCalc() {
  $('#sizeCalc').addEventListener('submit', (ev) => {
    ev.preventDefault();
    const bust = parseFloat($('#inBust').value);
    const waist = parseFloat($('#inWaist').value);
    const hip = parseFloat($('#inHip').value);
    const out = $('#sizeResult');
    const valid = [bust, waist, hip].every(n => Number.isFinite(n) && n > 60 && n < 220);

    if (!valid) {
      out.textContent = t('t_size_ko');
      out.style.color = 'var(--brand-700)';
      return;
    }
    const row = calculateSize(bust, waist, hip);
    out.textContent = t('t_size', row.size);
    out.style.color = 'var(--ink)';
    toast(t('t_size', row.size));
  });
}

/* ------------------------------------------------------------
   19. FORMULARIO DE CONTACTO
   ------------------------------------------------------------ */
function setError(id, message) {
  const slot = $(`[data-error="${id}"]`);
  if (slot) slot.textContent = message || '';
  $(`#${id}`).classList.toggle('has-error', Boolean(message));
}

function initContactForm() {
  const form = $('#contactForm');
  const status = $('#formStatus');

  form.addEventListener('submit', (ev) => {
    ev.preventDefault();
    let ok = true;

    const name = $('#cName');
    const email = $('#cEmail');
    const message = $('#cMsg');
    const privacy = $('#cPrivacy');

    if (name.value.trim().length < 2) { setError('cName', '·'); ok = false; } else setError('cName', '');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.value.trim())) { setError('cEmail', '·'); ok = false; } else setError('cEmail', '');
    if (message.value.trim().length < 10) { setError('cMsg', '·'); ok = false; } else setError('cMsg', '');
    if (!privacy.checked) ok = false;

    status.className = `form-status ${ok ? 'is-ok' : 'is-error'}`;
    status.textContent = ok ? t('t_form_ok') : t('t_form_ko');

    if (ok) {
      toast(t('t_form_ok'));
      form.reset();
    }
  });

  ['cName', 'cEmail', 'cMsg'].forEach(id => {
    $(`#${id}`).addEventListener('input', () => setError(id, ''));
  });
}

/* ------------------------------------------------------------
   20. BOTÓN DE USUARIO (login pendiente)
   ------------------------------------------------------------ */
function initUserButton() {
  $('#userBtn').addEventListener('click', () => toast(t('t_user'), 'ok', 3600));
}

/* ------------------------------------------------------------
   21. AVISO DE COOKIES
   ------------------------------------------------------------ */
function showCookieBanner() {
  if (Store.get('curva_cookies', null)) return;
  setTimeout(() => $('#cookieBanner').classList.add('is-open'), 900);
}

function hideCookieBanner(value) {
  Store.set('curva_cookies', value);
  $('#cookieBanner').classList.remove('is-open');
}

function initCookies() {
  $('#cookieAccept').addEventListener('click', () => {
    hideCookieBanner({ essential: true, stats: true, marketing: true });
    toast(t('t_saved'));
  });
  $('#cookieReject').addEventListener('click', () => {
    hideCookieBanner({ essential: true, stats: false, marketing: false });
    toast(t('t_rejected'));
  });
  $('#cookieConfig').addEventListener('click', () => {
    const banner = $('#cookieBanner');
    if ($('.cookie-config', banner)) return;

    const box = document.createElement('div');
    box.className = 'cookie-config';
    box.style.cssText = 'flex:1 1 100%;display:grid;gap:8px;border-top:1px solid var(--line);padding-top:14px;font-size:13.5px;color:var(--ink-soft)';
    box.innerHTML = `
      <label class="check"><input type="checkbox" checked disabled><span>Cookies esenciales (cesta, idioma, tema)</span></label>
      <label class="check"><input type="checkbox" id="ckStats" checked><span>${t('t_stats')}</span></label>
      <label class="check"><input type="checkbox" id="ckMarketing"><span>${t('t_marketing')}</span></label>
      <button class="btn btn-primary btn-sm" id="ckSave" type="button">${t('t_save')}</button>`;
    banner.appendChild(box);

    $('#ckSave', box).addEventListener('click', () => {
      hideCookieBanner({ essential: true, stats: $('#ckStats', box).checked, marketing: $('#ckMarketing', box).checked });
      toast(t('t_saved'));
    });
  });

  /* Enlace "Política de cookies" del footer: vuelve a abrir el aviso */
  $$('.js-cookies').forEach(link => {
    link.addEventListener('click', (ev) => {
      ev.preventDefault();
      $('#cookieBanner').classList.add('is-open');
    });
  });
}

/* ------------------------------------------------------------
   22. INICIALIZACIÓN
   ------------------------------------------------------------ */
function init() {
  initTheme();
  initLang();
  applyLang(state.lang);

  initHeaderScroll();
  initSmoothLinks();
  initActiveNav();
  initMobileMenu();
  initSearch();
  initReveal();
  initFilters();
  initSizeChips();
  initAddButtons();
  initProductModal();

  persistCart();
  renderCart();
  initCartDrawer();
  initGateway();
  initSizeCalc();
  initContactForm();
  initUserButton();
  initCookies();
  showCookieBanner();

  /* UX: recalcular el estado del header al cambiar la orientación */
  window.addEventListener('resize', debounce(() => {
    window.dispatchEvent(new Event('scroll'));
  }, 200));
}

/* Arranque: espera al DOM si aún se está cargando el documento */
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

/* API pública mínima para la futura pasarela de pago y el login */
window.CURVA = {
  version: '1.0.0',
  checkout: null,             /* se asignará desde la pasarela real */
  getLastOrder: () => state.order,
  setLang: applyLang,
  openCart,
  openSearch
};
