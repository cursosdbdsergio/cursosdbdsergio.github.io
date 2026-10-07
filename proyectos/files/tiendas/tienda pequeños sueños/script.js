/* ============================================================
   PEQUEÑOS SUEÑOS - ROPA INFANTIL
   JavaScript funcional desde cero
   ============================================================ */

(function () {
    'use strict';

    /* ==========================================================
       1. DATOS DE LA TIENDA
       ========================================================== */

    // Catálogo de productos
    const PRODUCTS = [
        {
            id: 1,
            name: 'Body bebé algodón orgánico',
            price: 18.90,
            oldPrice: null,
            category: 'bebe',
            badge: null,
            img: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=600&q=80'
        },
        {
            id: 2,
            name: 'Conjunto punto rosa',
            price: 34.50,
            oldPrice: 42.00,
            category: 'bebe',
            badge: 'sale',
            img: 'https://images.unsplash.com/photo-1522771930-78848d9293e8?w=600&q=80'
        },
        {
            id: 3,
            name: 'Vestido estampado floral',
            price: 29.95,
            oldPrice: null,
            category: 'nina',
            badge: 'new',
            img: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=600&q=80'
        },
        {
            id: 4,
            name: 'Camiseta dinosaurios',
            price: 15.90,
            oldPrice: null,
            category: 'nino',
            badge: null,
            img: 'https://images.unsplash.com/photo-1596870230751-ebdfce98ec42?w=600&q=80'
        },
        {
            id: 5,
            name: 'Pelele suave oso',
            price: 22.00,
            oldPrice: null,
            category: 'bebe',
            badge: null,
            img: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=600&q=80'
        },
        {
            id: 6,
            name: 'Pantalón chino mostaza',
            price: 24.90,
            oldPrice: null,
            category: 'nino',
            badge: 'new',
            img: 'https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=600&q=80'
        },
        {
            id: 7,
            name: 'Lazo pelo pack 3 uds',
            price: 9.90,
            oldPrice: 12.50,
            category: 'accesorios',
            badge: 'sale',
            img: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=600&q=80'
        },
        {
            id: 8,
            name: 'Calcetines antideslizantes',
            price: 7.50,
            oldPrice: null,
            category: 'accesorios',
            badge: null,
            img: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?w=600&q=80'
        }
    ];

    // Traducciones (ES, EN, VA)
    const TRANSLATIONS = {
        es: {
            pageTitle: 'Pequeños Sueños - Ropa Infantil',
            phone: '+34 961 234 567',
            email: 'hola@pequenosuenos.es',
            shippingText: 'Envío gratis a partir de 50€',
            navHome: 'Inicio', navCategories: 'Categorías', navProducts: 'Productos',
            navAbout: 'Nosotros', navReviews: 'Opiniones', navContact: 'Contacto',
            searchPlaceholder: 'Busca en la tienda...',
            searchBtn: 'Buscar',
            loginTab: 'Iniciar sesión', registerTab: 'Registrarse',
            emailLabel: 'Correo electrónico', passwordLabel: 'Contraseña',
            nameLabel: 'Nombre', loginBtn: 'Entrar', registerBtn: 'Crear cuenta',
            cartTitle: 'Tu carrito', cartEmpty: 'Tu carrito está vacío',
            subtotal: 'Subtotal', shipping: 'Envío', total: 'Total',
            checkoutBtn: 'Finalizar compra',
            heroBadge: '✨ Nueva colección Otoño 2026',
            heroTitle: 'Ropa con la que los peques sueñan',
            heroDesc: 'Prendas cómodas, divertidas y sostenibles para bebés, niños y niñas. Hechas con algodón orgánico y mucho amor.',
            heroCta1: 'Ver colección', heroCta2: 'Conócenos',
            scrollDown: 'Desliza para ver más',
            stat1: 'Familias felices', stat2: 'Algodón orgánico', stat3: 'Valoración media',
            categoriesLabel: 'Categorías', categoriesTitle: 'Encuentra lo que buscas',
            cat1: 'Bebé (0-2 años)', cat2: 'Niño (2-8 años)', cat3: 'Niña (2-8 años)', cat4: 'Accesorios',
            catView: 'Ver productos',
            aboutLabel: 'Sobre nosotros',
            aboutTitle: 'Ropa que cuida de tu peque y del planeta',
            aboutDesc: 'En Pequeños Sueños creemos que la ropa infantil debe ser suave, duradera y respetuosa. Todos nuestros productos se fabrican con tejidos orgánicos certificados, sin productos químicos agresivos y en talleres locales con condiciones justas.',
            aboutCta: 'Contáctanos',
            feat1t: 'Algodón 100% orgánico', feat1d: 'Certificado GOTS, sin químicos ni tóxicos',
            feat2t: 'Diseños que duran', feat2d: 'Costuras reforzadas y tejidos resistentes',
            feat3t: 'Producción local', feat3d: 'Confeccionado en talleres de Valencia',
            reviewsCount: '+1.200 opiniones',
            productsLabel: 'Nuestros favoritos', productsTitle: 'Productos destacados',
            all: 'Todos',
            f1t: 'Envío rápido', f1d: 'Entrega en 24-48h en península. Gratis a partir de 50€.',
            f2t: 'Devolución fácil', f2d: '30 días para devolver. Sin preguntas.',
            f3t: 'Pago seguro', f3d: 'Pasarela cifrada. Tus datos siempre protegidos.',
            f4t: 'Atención cercana', f4d: 'Te ayudamos por WhatsApp, email o teléfono.',
            reviewsLabel: 'Testimonios', reviewsTitle: 'Lo que dicen las familias',
            r1: '«La ropa es increíblemente suave. A mi bebé le encanta y los diseños son preciosos. Repetiré seguro.»',
            r1l: 'Madre de Daniel, 1 año',
            r2: '«Me encanta que sean de algodón orgánico. Los lavados no deforman las prendas, 10/10.»',
            r2l: 'Madre de dos',
            r3: '«La opción de recoger en el mercado es genial. El personal es super atento y amable.»',
            r3l: 'Padre de Sofía, 4 años',
            newsTitle: '¡Únete a la familia Pequeños Sueños!',
            newsDesc: 'Suscríbete y recibe un 10% de descuento en tu primera compra, además de novedades y ofertas exclusivas.',
            newsPlaceholder: 'Tu correo electrónico', newsBtn: 'Suscribirme',
            contactLabel: 'Contacto', contactTitle: '¿Tienes alguna pregunta?',
            contactDesc: 'Estamos aquí para ayudarte. Escríbenos o visítanos en nuestra tienda del Mercado Central.',
            addressFull: 'Mercado Central, Puesto 12 · 46001 Valencia',
            hours: 'L-S: 10:00 - 20:00 / Dom: cerrado',
            subjectLabel: 'Asunto', messageLabel: 'Mensaje', sendBtn: 'Enviar mensaje',
            footerDesc: 'Ropa infantil de calidad, sostenible y con mucho amor. Hecha en Valencia para los peques de la casa.',
            footerShop: 'Tienda', footerInfo: 'Información', footerContact: 'Contacto',
            cookies: 'Política de cookies', privacy: 'Política de privacidad',
            terms: 'Términos y condiciones', requirements: 'Requisitos de compra',
            copyright: '© 2026 Pequeños Sueños. Todos los derechos reservados.',
            cookieText: 'Utilizamos cookies para mejorar tu experiencia. Al continuar aceptas nuestra <a href="#">política de cookies</a>.',
            acceptCookies: 'Aceptar', rejectCookies: 'Rechazar',
            addToCart: 'Añadir al carrito',
            // Checkout
            checkoutTitle: 'Finalizar compra',
            stepDelivery: 'Entrega', stepPayment: 'Pago', stepConfirm: 'Confirmar',
            deliveryMethod: 'Método de entrega',
            pickupTitle: 'Recoger en tienda',
            pickupDesc: 'Recoge tu pedido en nuestro mercado',
            free: 'Gratis',
            shipTitle: 'Envío a domicilio',
            shipDesc: 'Entrega en 24-48 horas',
            shipPrice: '3,99 €',
            addressLabel: 'Dirección', cityLabel: 'Ciudad', postalLabel: 'Código postal',
            pickupNote: '📍 Mercado Central, Puesto 12 · Valencia · L-S 10:00-20:00',
            continueBtn: 'Continuar', backBtn: 'Volver',
            paymentMethod: 'Método de pago',
            payPickupTitle: 'Pagar al recoger', payPickupDesc: 'Paga en efectivo o tarjeta cuando recojas tu pedido',
            payDeliveryTitle: 'Pago contra reembolso', payDeliveryDesc: 'Paga al recibir el pedido en tu domicilio',
            payGatewayTitle: 'Tarjeta (Pasarela de pago)', payGatewayDesc: 'Pago seguro a través de la pasarela del mercado',
            confirmTitle: 'Resumen del pedido',
            totalToPay: 'Total a pagar:',
            confirmBtn: 'Confirmar pedido',
            gatewayTitle: 'Pasarela de pago',
            gatewayInfo: 'Serás redirigido a la pasarela de pago segura del mercado.',
            amountToPay: 'Importe:',
            cardNumberLabel: 'Número de tarjeta', cardNameLabel: 'Titular', cardExpiryLabel: 'Caducidad',
            payNowBtn: 'Pagar ahora',
            orderSuccess: '¡Pedido confirmado!',
            orderSuccessDesc: 'Gracias por tu compra. Te hemos enviado un correo con los detalles.',
            orderNumber: 'Nº pedido:', acceptBtn: 'Aceptar',
            quickAdd: 'Añadir'
        },
        en: {
            pageTitle: 'Little Dreams - Kids Clothing',
            phone: '+34 961 234 567',
            email: 'hello@pequenosuenos.es',
            shippingText: 'Free shipping over 50€',
            navHome: 'Home', navCategories: 'Categories', navProducts: 'Products',
            navAbout: 'About us', navReviews: 'Reviews', navContact: 'Contact',
            searchPlaceholder: 'Search the store...', searchBtn: 'Search',
            loginTab: 'Log in', registerTab: 'Sign up',
            emailLabel: 'Email', passwordLabel: 'Password', nameLabel: 'Name',
            loginBtn: 'Log in', registerBtn: 'Create account',
            cartTitle: 'Your cart', cartEmpty: 'Your cart is empty',
            subtotal: 'Subtotal', shipping: 'Shipping', total: 'Total',
            checkoutBtn: 'Checkout',
            heroBadge: '✨ New Autumn 2026 collection',
            heroTitle: 'Clothes kids dream about',
            heroDesc: 'Comfortable, fun and sustainable garments for babies, boys and girls. Made with organic cotton and lots of love.',
            heroCta1: 'Shop collection', heroCta2: 'About us',
            scrollDown: 'Scroll to see more',
            stat1: 'Happy families', stat2: 'Organic cotton', stat3: 'Average rating',
            categoriesLabel: 'Categories', categoriesTitle: 'Find what you need',
            cat1: 'Baby (0-2 years)', cat2: 'Boy (2-8 years)', cat3: 'Girl (2-8 years)', cat4: 'Accessories',
            catView: 'View products',
            aboutLabel: 'About us',
            aboutTitle: 'Clothes that care for your little one and the planet',
            aboutDesc: 'At Little Dreams we believe kids\' clothing should be soft, durable and respectful. All our products are made with certified organic fabrics, no harsh chemicals and in local workshops with fair conditions.',
            aboutCta: 'Contact us',
            feat1t: '100% organic cotton', feat1d: 'GOTS certified, no chemicals',
            feat2t: 'Designs that last', feat2d: 'Reinforced stitching and resistant fabrics',
            feat3t: 'Local production', feat3d: 'Made in Valencia workshops',
            reviewsCount: '+1,200 reviews',
            productsLabel: 'Our favorites', productsTitle: 'Featured products',
            all: 'All',
            f1t: 'Fast shipping', f1d: '24-48h delivery. Free over 50€.',
            f2t: 'Easy returns', f2d: '30 days to return. No questions.',
            f3t: 'Secure payment', f3d: 'Encrypted gateway. Your data protected.',
            f4t: 'Friendly support', f4d: 'We help you via WhatsApp, email or phone.',
            reviewsLabel: 'Testimonials', reviewsTitle: 'What families say',
            r1: '«The clothes are incredibly soft. My baby loves them and the designs are beautiful. Will repeat for sure.»',
            r1l: 'Mother of Daniel, 1 year',
            r2: '«I love that they are organic cotton. Washes don\'t deform the garments, 10/10.»',
            r2l: 'Mother of two',
            r3: '«The pick-up option at the market is great. The staff is super attentive and friendly.»',
            r3l: 'Father of Sofía, 4 years',
            newsTitle: 'Join the Little Dreams family!',
            newsDesc: 'Subscribe and get 10% off your first purchase, plus news and exclusive offers.',
            newsPlaceholder: 'Your email', newsBtn: 'Subscribe',
            contactLabel: 'Contact', contactTitle: 'Have any questions?',
            contactDesc: 'We are here to help. Write to us or visit our shop at the Central Market.',
            addressFull: 'Central Market, Stall 12 · 46001 Valencia',
            hours: 'Mon-Sat: 10:00 - 20:00 / Sun: closed',
            subjectLabel: 'Subject', messageLabel: 'Message', sendBtn: 'Send message',
            footerDesc: 'Quality, sustainable kids clothing made with love. Made in Valencia for the little ones.',
            footerShop: 'Shop', footerInfo: 'Information', footerContact: 'Contact',
            cookies: 'Cookie policy', privacy: 'Privacy policy',
            terms: 'Terms & conditions', requirements: 'Purchase requirements',
            copyright: '© 2026 Little Dreams. All rights reserved.',
            cookieText: 'We use cookies to improve your experience. By continuing you accept our <a href="#">cookie policy</a>.',
            acceptCookies: 'Accept', rejectCookies: 'Reject',
            addToCart: 'Add to cart',
            checkoutTitle: 'Checkout',
            stepDelivery: 'Delivery', stepPayment: 'Payment', stepConfirm: 'Confirm',
            deliveryMethod: 'Delivery method',
            pickupTitle: 'Pick up in store', pickupDesc: 'Pick up your order at our market stall', free: 'Free',
            shipTitle: 'Home delivery', shipDesc: 'Delivery in 24-48 hours', shipPrice: '€3.99',
            addressLabel: 'Address', cityLabel: 'City', postalLabel: 'Postal code',
            pickupNote: '📍 Central Market, Stall 12 · Valencia · Mon-Sat 10:00-20:00',
            continueBtn: 'Continue', backBtn: 'Back',
            paymentMethod: 'Payment method',
            payPickupTitle: 'Pay on pickup', payPickupDesc: 'Pay in cash or card when you pick up your order',
            payDeliveryTitle: 'Cash on delivery', payDeliveryDesc: 'Pay when you receive the order at home',
            payGatewayTitle: 'Card (Payment gateway)', payGatewayDesc: 'Secure payment through the market\'s gateway',
            confirmTitle: 'Order summary',
            totalToPay: 'Total to pay:',
            confirmBtn: 'Confirm order',
            gatewayTitle: 'Payment gateway',
            gatewayInfo: 'You will be redirected to the market\'s secure payment gateway.',
            amountToPay: 'Amount:',
            cardNumberLabel: 'Card number', cardNameLabel: 'Cardholder', cardExpiryLabel: 'Expiry',
            payNowBtn: 'Pay now',
            orderSuccess: 'Order confirmed!',
            orderSuccessDesc: 'Thanks for your purchase. We\'ve sent you an email with details.',
            orderNumber: 'Order n°:', acceptBtn: 'Accept',
            quickAdd: 'Add'
        },
        va: {
            pageTitle: 'Petits Somnis - Roba Infantil',
            phone: '+34 961 234 567',
            email: 'hola@pequenosuenos.es',
            shippingText: 'Enviament gratuït a partir de 50€',
            navHome: 'Inici', navCategories: 'Categories', navProducts: 'Productes',
            navAbout: 'Nosaltres', navReviews: 'Opinions', navContact: 'Contacte',
            searchPlaceholder: 'Busca a la botiga...', searchBtn: 'Buscar',
            loginTab: 'Iniciar sessió', registerTab: 'Registrar-se',
            emailLabel: 'Correu electrònic', passwordLabel: 'Contrasenya', nameLabel: 'Nom',
            loginBtn: 'Entrar', registerBtn: 'Crear compte',
            cartTitle: 'El teu carret', cartEmpty: 'El teu carret està buit',
            subtotal: 'Subtotal', shipping: 'Enviament', total: 'Total',
            checkoutBtn: 'Finalitzar compra',
            heroBadge: '✨ Nova col·lecció Tardor 2026',
            heroTitle: 'Roba amb la que els menuts somien',
            heroDesc: 'Peaces còmodes, divertides i sostenibles per a nadons, xiquets i xiquetes. Fetes amb cotó orgànic i molta estima.',
            heroCta1: 'Veure col·lecció', heroCta2: 'Coneix-nos',
            scrollDown: 'Llisca per veure més',
            stat1: 'Famílies felices', stat2: 'Cotó orgànic', stat3: 'Valoració mitjana',
            categoriesLabel: 'Categories', categoriesTitle: 'Troba el que busques',
            cat1: 'Nadó (0-2 anys)', cat2: 'Xiquet (2-8 anys)', cat3: 'Xiqueta (2-8 anys)', cat4: 'Accessoris',
            catView: 'Veure productes',
            aboutLabel: 'Sobre nosaltres',
            aboutTitle: 'Roba que cuida del teu menut i del planeta',
            aboutDesc: 'A Petits Somnis creiem que la roba infantil ha de ser suau, duradora i respectuosa. Tots els nostres productes es fabriquen amb teixits orgànics certificats, sense productes químics agressius i en tallers locals amb condicions justes.',
            aboutCta: 'Contacta\'ns',
            feat1t: 'Cotó 100% orgànic', feat1d: 'Certificat GOTS, sense químics',
            feat2t: 'Dissenys que duren', feat2d: 'Costures reforçades i teixits resistents',
            feat3t: 'Producció local', feat3d: 'Confeccionat en tallers de València',
            reviewsCount: '+1.200 opinions',
            productsLabel: 'Els nostres favorits', productsTitle: 'Productes destacats',
            all: 'Tots',
            f1t: 'Enviament ràpid', f1d: 'Lliurament en 24-48h. Gratuït a partir de 50€.',
            f2t: 'Devolució fàcil', f2d: '30 dies per tornar. Sense preguntes.',
            f3t: 'Pagament segur', f3d: 'Passarel·la xifrada. Les teues dades protegides.',
            f4t: 'Atenció propera', f4d: 'T\'ajudem per WhatsApp, email o telèfon.',
            reviewsLabel: 'Testimonis', reviewsTitle: 'El que diuen les famílies',
            r1: '«La roba és increïblement suau. Al meu nadó li encanta i els dissenys són preciosos. Repetiré segur.»',
            r1l: 'Mare de Daniel, 1 any',
            r2: '«M\'encanta que siguen de cotó orgànic. Els rentats no deformen les peces, 10/10.»',
            r2l: 'Mare de dos',
            r3: '«L\'opció de recollir al mercat és genial. El personal és super atent i amable.»',
            r3l: 'Pare de Sofía, 4 anys',
            newsTitle: 'Uneix-te a la família Petits Somnis!',
            newsDesc: 'Subscriu-te i rep un 10% de descompte en la teua primera compra, a més de novetats i ofertes exclusives.',
            newsPlaceholder: 'El teu correu electrònic', newsBtn: 'Subscriure\'m',
            contactLabel: 'Contacte', contactTitle: 'Tens alguna pregunta?',
            contactDesc: 'Estem ací per ajudar-te. Escriu-nos o visita\'ns a la nostra tenda del Mercat Central.',
            addressFull: 'Mercat Central, Lloc 12 · 46001 València',
            hours: 'Dg-Ds: 10:00 - 20:00 / Dg: tancat',
            subjectLabel: 'Assumpte', messageLabel: 'Missatge', sendBtn: 'Enviar missatge',
            footerDesc: 'Roba infantil de qualitat, sostenible i amb molta estima. Feta a València per als més menuts.',
            footerShop: 'Botiga', footerInfo: 'Informació', footerContact: 'Contacte',
            cookies: 'Política de cookies', privacy: 'Política de privacitat',
            terms: 'Termes i condicions', requirements: 'Requisits de compra',
            copyright: '© 2026 Petits Somnis. Tots els drets reservats.',
            cookieText: 'Utilitzem cookies per millorar la teua experiència. En continuar acceptes la nostra <a href="#">política de cookies</a>.',
            acceptCookies: 'Acceptar', rejectCookies: 'Rebutjar',
            addToCart: 'Afegir al carret',
            checkoutTitle: 'Finalitzar compra',
            stepDelivery: 'Lliurament', stepPayment: 'Pagament', stepConfirm: 'Confirmar',
            deliveryMethod: 'Mètode de lliurament',
            pickupTitle: 'Recollir a la botiga', pickupDesc: 'Recull la teua comanda al nostre mercat', free: 'Gratuït',
            shipTitle: 'Enviament a domicili', shipDesc: 'Lliurament en 24-48 hores', shipPrice: '3,99 €',
            addressLabel: 'Adreça', cityLabel: 'Ciutat', postalLabel: 'Codi postal',
            pickupNote: '📍 Mercat Central, Lloc 12 · València · Dl-Ds 10:00-20:00',
            continueBtn: 'Continuar', backBtn: 'Tornar',
            paymentMethod: 'Mètode de pagament',
            payPickupTitle: 'Pagar en recollir', payPickupDesc: 'Paga en efectiu o targeta quan recullis la teua comanda',
            payDeliveryTitle: 'Pagament contra reemborsament', payDeliveryDesc: 'Paga en rebre la comanda al teu domicili',
            payGatewayTitle: 'Targeta (Passarel·la de pagament)', payGatewayDesc: 'Pagament segur a través de la passarel·la del mercat',
            confirmTitle: 'Resum de la comanda',
            totalToPay: 'Total a pagar:',
            confirmBtn: 'Confirmar comanda',
            gatewayTitle: 'Passarel·la de pagament',
            gatewayInfo: 'Seràs redirigit a la passarel·la de pagament segura del mercat.',
            amountToPay: 'Import:',
            cardNumberLabel: 'Número de targeta', cardNameLabel: 'Titular', cardExpiryLabel: 'Caducitat',
            payNowBtn: 'Pagar ara',
            orderSuccess: 'Comanda confirmada!',
            orderSuccessDesc: 'Gràcies per la teua compra. T\'hem enviat un correu amb els detalls.',
            orderNumber: 'Nº comanda:', acceptBtn: 'Acceptar',
            quickAdd: 'Afegir'
        }
    };

    // Contenidos por idioma para nombres y categorías de productos (traducción básica)
    const PRODUCT_I18N = {
        es: {
            'Body bebé algodón orgánico': 'Body bebé algodón orgánico',
            'Conjunto punto rosa': 'Conjunto punt rosa',
            'Vestido estampado floral': 'Vestido estampado floral',
            'Camiseta dinosaurios': 'Camiseta dinosaurios',
            'Pelele suave oso': 'Pelele suave oso',
            'Pantalón chino mostaza': 'Pantalón chino mostaza',
            'Lazo pelo pack 3 uds': 'Lazos pelo pack 3 uds',
            'Calcetines antideslizantes': 'Calcetines antideslizantes',
            catLabels: { bebe: 'Bebé', nino: 'Niño', nina: 'Niña', accesorios: 'Accesorios' }
        }
    };

    /* ==========================================================
       2. ESTADO GLOBAL
       ========================================================== */
    const state = {
        lang: localStorage.getItem('ps_lang') || 'es',
        theme: localStorage.getItem('ps_theme') || 'light',
        cart: JSON.parse(localStorage.getItem('ps_cart') || '[]'),
        currentFilter: 'all',
        currentCheckout: {
            delivery: 'pickup',
            payment: 'pickup-pay',
            address: null
        }
    };

    /* ==========================================================
       3. UTILIDADES
       ========================================================== */
    const $ = (sel, ctx = document) => ctx.querySelector(sel);
    const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

    function formatPrice(n) {
        return n.toFixed(2).replace('.', ',') + ' €';
    }

    function __(key) {
        return (TRANSLATIONS[state.lang] && TRANSLATIONS[state.lang][key]) || TRANSLATIONS.es[key] || key;
    }

    /* ==========================================================
       4. IDIOMA
       ========================================================== */
    function applyLanguage() {
        document.documentElement.lang = state.lang;
        // Actualizar textos con data-i18n
        $$('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            const text = __(key);
            if (text) el.textContent = text;
        });
        // Placeholders
        $$('[data-i18n-placeholder]').forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            el.placeholder = __(key);
        });
        // Título
        document.title = __('pageTitle');
        // Actualizar botones de idioma
        $$('.lang-option').forEach(b => b.classList.toggle('active', b.dataset.lang === state.lang));
        $$('.mobile-lang-btn').forEach(b => b.classList.toggle('active', b.dataset.lang === state.lang));
        localStorage.setItem('ps_lang', state.lang);
        // Re-renderizar productos para cambiar etiquetas si hace falta
        renderProducts();
    }

    function initLanguage() {
        // Selector desktop
        $('#langBtn').addEventListener('click', (e) => {
            e.stopPropagation();
            $('#langDropdown').classList.toggle('open');
        });
        $$('.lang-option').forEach(btn => {
            btn.addEventListener('click', () => {
                state.lang = btn.dataset.lang;
                applyLanguage();
                $('#langDropdown').classList.remove('open');
            });
        });
        // Selector móvil
        $$('.mobile-lang-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                state.lang = btn.dataset.lang;
                applyLanguage();
            });
        });
        // Cerrar dropdown al hacer click fuera
        document.addEventListener('click', (e) => {
            if (!e.target.closest('#langSelector')) {
                $('#langDropdown').classList.remove('open');
            }
        });
        applyLanguage();
    }

    /* ==========================================================
       5. TEMA (CLARO/OSCURO)
       ========================================================== */
    function applyTheme() {
        if (state.theme === 'dark') {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
        localStorage.setItem('ps_theme', state.theme);
    }

    function initTheme() {
        // Aplicar preferencia guardada o detectar preferencia del sistema
        if (!localStorage.getItem('ps_theme')) {
            if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                state.theme = 'dark';
            }
        }
        $('#themeBtn').addEventListener('click', () => {
            state.theme = state.theme === 'dark' ? 'light' : 'dark';
            applyTheme();
        });
        applyTheme();
    }

    /* ==========================================================
       6. HEADER SCROLL / TOP BAR
       ========================================================== */
    function initHeaderScroll() {
        const header = $('#header');
        const topBar = $('#topBar');
        let lastScroll = 0;

        window.addEventListener('scroll', () => {
            const current = window.pageYOffset;
            header.classList.toggle('scrolled', current > 10);
            // Ocultar topbar al bajar, mostrar al subir
            if (current > 80 && current > lastScroll) {
                topBar.classList.add('hidden');
            } else {
                topBar.classList.remove('hidden');
            }
            lastScroll = current;
        }, { passive: true });

        // Resaltar enlace activo según sección
        const sections = $$('main section[id]');
        const navLinks = $$('.main-nav a, .mobile-menu a');

        window.addEventListener('scroll', () => {
            let currentSection = 'inicio';
            sections.forEach(sec => {
                const top = sec.offsetTop - 150;
                if (window.pageYOffset >= top) currentSection = sec.id;
            });
            navLinks.forEach(link => {
                link.classList.toggle('active', link.getAttribute('href') === '#' + currentSection);
            });
        }, { passive: true });
    }

    /* ==========================================================
       7. MENÚ HAMBURGUESA
       ========================================================== */
    function initHamburger() {
        const btn = $('#hamburgerBtn');
        const menu = $('#mobileMenu');

        btn.addEventListener('click', () => {
            btn.classList.toggle('open');
            menu.classList.toggle('open');
            btn.setAttribute('aria-expanded', btn.classList.contains('open'));
            menu.setAttribute('aria-hidden', !menu.classList.contains('open'));
            document.body.style.overflow = menu.classList.contains('open') ? 'hidden' : '';
        });

        // Botón búsqueda dentro del menú móvil
        const mobileSearch = $('#mobileSearchBtn');
        if (mobileSearch) {
            mobileSearch.addEventListener('click', () => {
                closeMobileMenu();
                setTimeout(() => $('#searchBtn').click(), 300);
            });
        }

        // Cerrar al hacer click en enlace
        $$('.mobile-menu a').forEach(link => {
            link.addEventListener('click', () => closeMobileMenu());
        });

        // Cerrar al cambiar tamaño
        window.addEventListener('resize', () => {
            if (window.innerWidth > 1024) closeMobileMenu();
        });
    }

    function closeMobileMenu() {
        $('#hamburgerBtn').classList.remove('open');
        $('#mobileMenu').classList.remove('open');
        $('#hamburgerBtn').setAttribute('aria-expanded', 'false');
        $('#mobileMenu').setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    /* ==========================================================
       8. SCROLL SUAVE
       ========================================================== */
    function initSmoothScroll() {
        $$('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const target = this.getAttribute('href');
                if (target === '#' || target.length < 2) return;
                const el = document.querySelector(target);
                if (el) {
                    e.preventDefault();
                    const top = el.getBoundingClientRect().top + window.pageYOffset - 100;
                    window.scrollTo({ top, behavior: 'smooth' });
                }
            });
        });
    }

    /* ==========================================================
       9. MODAL DE BÚSQUEDA
       ========================================================== */
    function initSearchModal() {
        const modal = $('#searchModal');
        const openBtn = $('#searchBtn');
        const closeBtn = $('#searchClose');
        const backdrop = $('#searchBackdrop');
        const input = $('#searchInput');
        const results = $('#searchResults');
        const submitBtn = $('#searchSubmit');

        function open() {
            modal.classList.add('open');
            modal.setAttribute('aria-hidden', 'false');
            setTimeout(() => input.focus(), 200);
            document.body.style.overflow = 'hidden';
        }

        function close() {
            modal.classList.remove('open');
            modal.setAttribute('aria-hidden', 'true');
            input.value = '';
            results.innerHTML = '';
            removeHighlights();
            document.body.style.overflow = '';
        }

        openBtn.addEventListener('click', open);
        closeBtn.addEventListener('click', close);
        backdrop.addEventListener('click', close);
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('open')) close();
        });

        // Buscar al escribir
        function doSearch() {
            const query = input.value.trim().toLowerCase();
            if (!query) {
                results.innerHTML = '';
                removeHighlights();
                return;
            }
            // Buscar en productos
            const matched = PRODUCTS.filter(p =>
                p.name.toLowerCase().includes(query) ||
                p.category.toLowerCase().includes(query)
            );
            // Buscar en secciones
            const sections = [
                { id: 'inicio', title: __('navHome'), type: __('navHome') },
                { id: 'categorias', title: __('navCategories'), type: __('navCategories') },
                { id: 'productos', title: __('navProducts'), type: __('navProducts') },
                { id: 'nosotros', title: __('navAbout'), type: __('navAbout') },
                { id: 'opiniones', title: __('navReviews'), type: __('navReviews') },
                { id: 'contacto', title: __('navContact'), type: __('navContact') }
            ].filter(s => s.title.toLowerCase().includes(query));

            let html = '';
            matched.forEach(p => {
                html += `<div class="search-result-item" data-target="#productos">
                    <div class="result-type">${__('navProducts')}</div>
                    <h4>${highlightMatch(p.name, query)}</h4>
                </div>`;
            });
            sections.forEach(s => {
                html += `<div class="search-result-item" data-target="#${s.id}">
                    <div class="result-type">${__('navHome')}</div>
                    <h4>${highlightMatch(s.title, query)}</h4>
                </div>`;
            });
            if (!matched.length && !sections.length) {
                html = `<p class="search-no-results">${query}: sin resultados</p>`;
            }
            results.innerHTML = html;

            // Click en resultado
            $$('.search-result-item', results).forEach(item => {
                item.addEventListener('click', () => {
                    const target = item.dataset.target;
                    close();
                    setTimeout(() => {
                        document.querySelector(target).scrollIntoView({ behavior: 'smooth' });
                    }, 300);
                });
            });
        }

        submitBtn.addEventListener('click', doSearch);
        input.addEventListener('input', doSearch);
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') doSearch();
        });
    }

    function highlightMatch(text, query) {
        const re = new RegExp('(' + query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'gi');
        return text.replace(re, '<mark>$1</mark>');
    }

    function removeHighlights() {
        $$('mark').forEach(m => {
            const parent = m.parentNode;
            parent.replaceChild(document.createTextNode(m.textContent), m);
            parent.normalize();
        });
    }

    /* ==========================================================
       10. MODAL USUARIO / LOGIN
       ========================================================== */
    function initUserModal() {
        const modal = $('#userModal');
        const openBtn = $('#userBtn');
        const closeBtn = $('#userClose');
        const backdrop = $('#userBackdrop');
        const tabs = $$('.user-tab');
        const forms = { login: $('#loginForm'), register: $('#registerForm') };

        function open() {
            modal.classList.add('open');
            document.body.style.overflow = 'hidden';
        }
        function close() {
            modal.classList.remove('open');
            document.body.style.overflow = '';
        }

        openBtn.addEventListener('click', open);
        closeBtn.addEventListener('click', close);
        backdrop.addEventListener('click', close);
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('open')) close();
        });

        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                tabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                Object.keys(forms).forEach(k => {
                    forms[k].style.display = k === tab.dataset.tab ? '' : 'none';
                });
            });
        });

        // Prevenir envío real
        Object.values(forms).forEach(f => {
            f.addEventListener('submit', (e) => {
                e.preventDefault();
                alert('✨ Funcionalidad de login preparada. Se conectará con el backend próximamente.');
            });
        });
    }

    /* ==========================================================
       11. CARRITO DE COMPRA
       ========================================================== */
    function saveCart() {
        localStorage.setItem('ps_cart', JSON.stringify(state.cart));
    }

    function addToCart(productId, size = 'M') {
        const existing = state.cart.find(i => i.id === productId && i.size === size);
        if (existing) {
            existing.qty += 1;
        } else {
            state.cart.push({ id: productId, size, qty: 1 });
        }
        saveCart();
        updateCartUI();
        // Animación al botón carrito
        const btn = $('#cartBtn');
        btn.animate([
            { transform: 'scale(1)' },
            { transform: 'scale(1.25)' },
            { transform: 'scale(1)' }
        ], { duration: 450, easing: 'ease-out' });
        const prod = PRODUCTS.find(p => p.id === productId);
        const suffix = state.lang === 'en' ? ' added to cart' : (state.lang === 'va' ? ' afegit al carret' : ' añadido al carrito');
        showToast('✓ ' + (prod ? prod.name : '') + suffix);
    }

    /* ---------- Toast de notificación ---------- */
    let toastTimer;
    function showToast(message) {
        let toast = $('.ps-toast');
        if (!toast) {
            toast = document.createElement('div');
            toast.className = 'ps-toast';
            document.body.appendChild(toast);
        }
        toast.textContent = message;
        toast.classList.add('show');
        clearTimeout(toastTimer);
        toastTimer = setTimeout(() => toast.classList.remove('show'), 2500);
    }

    function removeFromCart(productId, size) {
        state.cart = state.cart.filter(i => !(i.id === productId && i.size === size));
        saveCart();
        updateCartUI();
    }

    function updateQty(productId, size, delta) {
        const item = state.cart.find(i => i.id === productId && i.size === size);
        if (!item) return;
        item.qty += delta;
        if (item.qty < 1) {
            removeFromCart(productId, size);
            return;
        }
        saveCart();
        updateCartUI();
    }

    function cartTotals() {
        let subtotal = 0, count = 0;
        state.cart.forEach(item => {
            const prod = PRODUCTS.find(p => p.id === item.id);
            if (prod) {
                subtotal += prod.price * item.qty;
                count += item.qty;
            }
        });
        // Envío
        let shipping = 0;
        if (state.currentCheckout.delivery === 'shipping') {
            shipping = subtotal >= 50 ? 0 : 3.99;
        }
        return { subtotal, shipping, total: subtotal + shipping, count };
    }

    function updateCartUI() {
        const itemsEl = $('#cartItems');
        const emptyEl = $('#cartEmpty');
        const footerEl = $('#cartFooter');
        const countEl = $('#cartCount');
        const { subtotal, shipping, total, count } = cartTotals();

        countEl.textContent = count;
        countEl.style.display = count > 0 ? 'flex' : 'none';

        if (count === 0) {
            itemsEl.innerHTML = '';
            emptyEl.style.display = 'flex';
            footerEl.style.display = 'none';
            return;
        }

        emptyEl.style.display = 'none';
        footerEl.style.display = 'block';

        let html = '';
        state.cart.forEach(item => {
            const prod = PRODUCTS.find(p => p.id === item.id);
            if (!prod) return;
            html += `
                <div class="cart-item">
                    <img class="cart-item-img" src="${prod.img}" alt="${prod.name}">
                    <div class="cart-item-info">
                        <h4>${prod.name}</h4>
                        <div class="size">Talla: ${item.size}</div>
                        <div class="price">${formatPrice(prod.price)}</div>
                        <div class="cart-qty">
                            <button data-action="minus" data-id="${prod.id}" data-size="${item.size}">−</button>
                            <span>${item.qty}</span>
                            <button data-action="plus" data-id="${prod.id}" data-size="${item.size}">+</button>
                        </div>
                    </div>
                    <button class="cart-item-remove" data-action="remove" data-id="${prod.id}" data-size="${item.size}">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-2 14a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2L5 6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                    </button>
                </div>
            `;
        });
        itemsEl.innerHTML = html;

        $('#cartSubtotal').textContent = formatPrice(subtotal);
        $('#cartShipping').textContent = shipping === 0 ? __('free') : formatPrice(shipping);
        $('#cartTotal').textContent = formatPrice(total);

        // Eventos de botones del carrito
        $$('.cart-qty button, .cart-item-remove', itemsEl).forEach(btn => {
            btn.addEventListener('click', () => {
                const id = parseInt(btn.dataset.id);
                const size = btn.dataset.size;
                const action = btn.dataset.action;
                if (action === 'plus') updateQty(id, size, 1);
                else if (action === 'minus') updateQty(id, size, -1);
                else if (action === 'remove') removeFromCart(id, size);
            });
        });
    }

    function openCart() {
        $('#cartModal').classList.add('open');
        document.body.style.overflow = 'hidden';
    }
    function closeCart() {
        $('#cartModal').classList.remove('open');
        document.body.style.overflow = '';
    }

    function initCart() {
        $('#cartBtn').addEventListener('click', openCart);
        $('#cartClose').addEventListener('click', closeCart);
        $('#cartBackdrop').addEventListener('click', closeCart);
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && $('#cartModal').classList.contains('open')) closeCart();
        });
        updateCartUI();
    }

    /* ==========================================================
       12. CHECKOUT (ENTREGA + PAGO)
       ========================================================== */
    let currentStep = 1;

    function initCheckout() {
        const modal = $('#checkoutModal');
        const openBtn = $('#checkoutBtn');
        const closeBtn = $('#checkoutClose');
        const backdrop = $('#checkoutBackdrop');

        function open() {
            if (state.cart.length === 0) return;
            modal.classList.add('open');
            document.body.style.overflow = 'hidden';
            goToStep(1);
            updateCheckoutUI();
        }
        function close() {
            modal.classList.remove('open');
            document.body.style.overflow = '';
        }

        openBtn.addEventListener('click', open);
        closeBtn.addEventListener('click', close);
        backdrop.addEventListener('click', close);
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('open')) close();
        });

        // Opciones de entrega
        $$('input[name="delivery"]').forEach(r => {
            r.addEventListener('change', () => {
                state.currentCheckout.delivery = r.value;
                updateDeliveryForm();
                // Ajustar opciones de pago según entrega
                const pickupPay = document.querySelector('input[name="payment"][value="pickup-pay"]');
                const onDelivery = document.querySelector('input[name="payment"][value="ondelivery"]');
                if (r.value === 'pickup') {
                    // Pago contra reembolso no disponible para recogida
                    onDelivery.closest('.payment-option').style.display = 'none';
                    pickupPay.closest('.payment-option').style.display = '';
                    if (state.currentCheckout.payment === 'ondelivery') {
                        state.currentCheckout.payment = 'pickup-pay';
                        pickupPay.checked = true;
                    }
                } else {
                    // Pago al recoger no disponible para envío
                    pickupPay.closest('.payment-option').style.display = 'none';
                    onDelivery.closest('.payment-option').style.display = '';
                    if (state.currentCheckout.payment === 'pickup-pay') {
                        state.currentCheckout.payment = 'ondelivery';
                        onDelivery.checked = true;
                    }
                }
                updateCartUI();
                updateCheckoutUI();
            });
        });

        // Opciones de pago
        $$('input[name="payment"]').forEach(r => {
            r.addEventListener('change', () => {
                state.currentCheckout.payment = r.value;
            });
        });

        // Navegación
        $('#nextToPayment').addEventListener('click', () => {
            if (state.currentCheckout.delivery === 'shipping') {
                const addr = $('#inputAddress').value.trim();
                const city = $('#inputCity').value.trim();
                if (!addr || !city) {
                    alert('Por favor, completa la dirección de envío.');
                    return;
                }
                state.currentCheckout.address = {
                    address: addr,
                    city: city,
                    postal: $('#inputPostal').value,
                    name: $('#inputName').value
                };
            }
            goToStep(2);
        });

        $('#backToDelivery').addEventListener('click', () => goToStep(1));

        $('#nextToConfirm').addEventListener('click', () => {
            // Si eligió pasarela, ir a paso de pasarela en vez del resumen
            if (state.currentCheckout.payment === 'gateway') {
                const totals = cartTotals();
                $('#gatewayAmount').textContent = formatPrice(totals.total);
                goToStep('gateway');
            } else {
                renderConfirmSummary();
                goToStep(3);
            }
        });

        $('#backToPayment').addEventListener('click', () => goToStep(2));

        $('#confirmOrderBtn').addEventListener('click', () => {
            placeOrder();
        });

        $('#payNowBtn').addEventListener('click', () => {
            const num = $('#cardNumber').value.trim();
            const name = $('#cardName').value.trim();
            if (!num || !name || num.replace(/\s/g, '').length < 12) {
                alert('Por favor, introduce los datos de la tarjeta correctamente.');
                return;
            }
            placeOrder();
        });

        $('#closeSuccessBtn').addEventListener('click', () => {
            close();
            state.cart = [];
            saveCart();
            updateCartUI();
        });

        // Formato tarjeta
        $('#cardNumber').addEventListener('input', (e) => {
            let v = e.target.value.replace(/\s/g, '').replace(/\D/g, '');
            v = v.match(/.{1,4}/g)?.join(' ') || '';
            e.target.value = v;
        });
        $('#cardExpiry').addEventListener('input', (e) => {
            let v = e.target.value.replace(/\D/g, '');
            if (v.length >= 3) v = v.slice(0, 2) + '/' + v.slice(2, 4);
            e.target.value = v;
        });
        $('#cardCvv').addEventListener('input', (e) => {
            e.target.value = e.target.value.replace(/\D/g, '').slice(0, 3);
        });
    }

    function updateDeliveryForm() {
        const type = state.currentCheckout.delivery;
        $('#addressForm').style.display = type === 'shipping' ? '' : 'none';
        $('#pickupInfo').style.display = type === 'pickup' ? '' : 'none';
    }

    function goToStep(step) {
        currentStep = step;
        // Ocultar todos los paneles
        ['stepDelivery', 'stepPayment', 'stepConfirm', 'stepGateway', 'stepSuccess'].forEach(id => {
            $('#' + id).style.display = 'none';
        });
        // Mostrar panel correspondiente
        if (step === 1) $('#stepDelivery').style.display = '';
        else if (step === 2) $('#stepPayment').style.display = '';
        else if (step === 3) $('#stepConfirm').style.display = '';
        else if (step === 'gateway') $('#stepGateway').style.display = '';
        else if (step === 'success') $('#stepSuccess').style.display = '';

        // Actualizar pasos
        $$('.checkout-step').forEach(s => {
            const sNum = parseInt(s.dataset.step);
            s.classList.remove('active', 'done');
            if (step === 'gateway') {
                if (sNum <= 2) s.classList.add('done');
            } else if (step === 'success') {
                s.classList.add('done');
            } else if (sNum < step) s.classList.add('done');
            else if (sNum === step) s.classList.add('active');
        });
    }

    function renderConfirmSummary() {
        const totals = cartTotals();
        let html = '';
        state.cart.forEach(item => {
            const prod = PRODUCTS.find(p => p.id === item.id);
            if (!prod) return;
            html += `<div class="confirm-item">
                <span>${prod.name} (${item.size}) × ${item.qty}</span>
                <span>${formatPrice(prod.price * item.qty)}</span>
            </div>`;
        });
        html += `<div class="confirm-item">
            <span>${state.currentCheckout.delivery === 'pickup' ? __('pickupTitle') : __('shipTitle')}</span>
            <span>${totals.shipping === 0 ? __('free') : formatPrice(totals.shipping)}</span>
        </div>`;
        html += `<div class="confirm-item">
            <span>${$(`input[name="payment"]:checked`).closest('.payment-option')?.querySelector('strong')?.textContent || ''}</span>
            <span>—</span>
        </div>`;
        $('#confirmSummary').innerHTML = html;
        $('#confirmTotal').textContent = formatPrice(totals.total);
    }

    function updateCheckoutUI() {
        updateDeliveryForm();
        // Mantener selección de pago coherente con entrega
        // Si es envío a domicilio con pago en tienda no aplica, pero dejaremos que el usuario elija.
    }

    function placeOrder() {
        const orderNum = 'PS-' + Date.now().toString().slice(-7);
        $('#orderNumber').textContent = orderNum;
        goToStep('success');
    }

    /* ==========================================================
       13. RENDERIZADO DE PRODUCTOS
       ========================================================== */
    function renderProducts() {
        const grid = $('#productsGrid');
        const filtered = state.currentFilter === 'all'
            ? PRODUCTS
            : PRODUCTS.filter(p => p.category === state.currentFilter);

        let html = '';
        filtered.forEach(p => {
            let badgeHtml = '';
            if (p.badge === 'sale') badgeHtml = `<span class="product-badge sale">-${Math.round((1 - p.price / p.oldPrice) * 100)}%</span>`;
            else if (p.badge === 'new') badgeHtml = `<span class="product-badge new">New</span>`;
            const oldPrice = p.oldPrice ? `<span class="old">${formatPrice(p.oldPrice)}</span>` : '';
            const catLabel = ({
                bebe: 'cat1', nino: 'cat2', nina: 'cat3', accesorios: 'cat4'
            }[p.category]) || 'cat1';

            html += `
                <article class="product-card reveal" data-category="${p.category}">
                    <div class="product-img">
                        ${badgeHtml}
                        <img src="${p.img}" alt="${p.name}" loading="lazy">
                        <button class="product-quick-add" data-id="${p.id}">${__('quickAdd')}</button>
                    </div>
                    <div class="product-info">
                        <div class="product-cat" data-i18n="${catLabel}">${__(catLabel)}</div>
                        <h4>${p.name}</h4>
                        <div class="product-price">
                            <span class="current">${formatPrice(p.price)}</span>
                            ${oldPrice}
                        </div>
                    </div>
                </article>
            `;
        });
        grid.innerHTML = html;

        // Eventos "añadir"
        $$('.product-quick-add').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const id = parseInt(btn.dataset.id);
                addToCart(id, 'M'); // Talla por defecto; se podría ampliar con selector
            });
        });

        // Volver a aplicar reveal
        observeReveals();
    }

    function initProductFilters() {
        $$('.filter-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                $$('.filter-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                state.currentFilter = btn.dataset.filter;
                renderProducts();
            });
        });
    }

    /* ==========================================================
       14. ANIMACIÓN REVEAL ON SCROLL
       ========================================================== */
    let revealObserver;
    function observeReveals() {
        if (!('IntersectionObserver' in window)) {
            $$('.reveal').forEach(el => el.classList.add('visible'));
            return;
        }
        if (revealObserver) revealObserver.disconnect();
        revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
        $$('.reveal').forEach(el => revealObserver.observe(el));
    }

    /* ==========================================================
       15. COOKIES
       ========================================================== */
    function initCookies() {
        const banner = $('#cookieBanner');
        if (localStorage.getItem('ps_cookies')) return;

        setTimeout(() => banner.classList.add('show'), 1500);

        $('#acceptCookies').addEventListener('click', () => {
            localStorage.setItem('ps_cookies', 'accepted');
            banner.classList.remove('show');
        });
        $('#rejectCookies').addEventListener('click', () => {
            localStorage.setItem('ps_cookies', 'rejected');
            banner.classList.remove('show');
        });
    }

    /* ==========================================================
       16. FORMULARIOS (NEWSLETTER Y CONTACTO)
       ========================================================== */
    function initForms() {
        $('#newsletterForm').addEventListener('submit', (e) => {
            e.preventDefault();
            alert('¡Gracias por suscribirte! Te hemos enviado un correo de bienvenida con tu 10% de descuento.');
            e.target.reset();
        });
        $('#contactForm').addEventListener('submit', (e) => {
            e.preventDefault();
            alert('¡Mensaje enviado! Te responderemos en menos de 24h.');
            e.target.reset();
        });
    }

    /* ==========================================================
       17. INICIALIZACIÓN
       ========================================================== */
    function init() {
        initTheme();
        initLanguage();
        initHeaderScroll();
        initHamburger();
        initSmoothScroll();
        initSearchModal();
        initUserModal();
        initCart();
        initCheckout();
        initProductFilters();
        renderProducts();
        initCookies();
        initForms();
        observeReveals();
        updateDeliveryForm();
        // Aplicar filtro inicial de métodos de pago (recogida seleccionada por defecto)
        const onDelivery = document.querySelector('input[name="payment"][value="ondelivery"]');
        if (onDelivery && state.currentCheckout.delivery === 'pickup') {
            onDelivery.closest('.payment-option').style.display = 'none';
        }
    }

    // Lanzar cuando el DOM esté listo
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
